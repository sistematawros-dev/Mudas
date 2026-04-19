const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.sistema.tawros.com.br/api/v1';

const state = {
  rows: [],
  page: 1,
  limit: 20,
  total: 0,
  search: '',
  listError: '',
  loading: false,
  formOpen: false,
  saving: false,
  saveError: '',
  form: createEmptyForm(),
  lookups: { filiais: [], licencas: [] },
};

let pageRef = null;
let activeController = null;
let searchDebounce = null;

function createEmptyForm() {
  return {
    id: '',
    codigo: '',
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    senha: '',
    confirmeSenha: '',
    ativo: true,
    administrador: false,
    vincularPessoa: false,
    filialIds: [],
    licencaIds: [],
  };
}

function getAccessToken() {
  return sessionStorage.getItem('authToken') || '';
}

function getRefreshToken() {
  return sessionStorage.getItem('refreshToken') || '';
}

function setTokens(accessToken, refreshToken) {
  if (accessToken) sessionStorage.setItem('authToken', String(accessToken));
  if (refreshToken) sessionStorage.setItem('refreshToken', String(refreshToken));
}

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) return false;
  const payload = await response.json().catch(() => ({}));
  const data = payload?.data || {};
  if (!data.accessToken) return false;
  setTokens(data.accessToken, data.refreshToken || refreshToken);
  return true;
}

async function apiRequest(path, { method = 'GET', query, body, retryOnUnauthorized = true } = {}) {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (query && typeof query === 'object') {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const token = getAccessToken();
  if (token) headers.Authorization = `Bearer ${token}`;
    const filialId = sessionStorage.getItem('filialId');
    if (filialId) headers['X-Filial-Id'] = filialId;

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: activeController?.signal,
  });

  if (response.status === 401 && retryOnUnauthorized) {
    const refreshed = await refreshAccessToken().catch(() => false);
    if (refreshed) return apiRequest(path, { method, query, body, retryOnUnauthorized: false });
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.message || `Falha na requisição (${response.status})`);
  }
  return payload;
}

import { normalizeDigits, formatCpf, formatPhone, isValidEmail, isValidCpf, isValidPhone } from '../../utils/validators.js';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseRows(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.rows)) return payload.data.rows;
  return [];
}

function parseMeta(payload, fallbackTotal = 0) {
  const meta = payload?.meta || payload?.data?.meta || {};
  return {
    total: Number(meta.total ?? fallbackTotal ?? 0),
    page: Number(meta.page ?? state.page ?? 1),
    limit: Number(meta.limit ?? state.limit ?? 20),
  };
}

function mapRowToForm(row = {}) {
  return {
    id: String(row.id || ''),
    codigo: String(row.codigo || ''),
    nome: String(row.nome || ''),
    email: String(row.email || ''),
    telefone: String(row.telefone || ''),
    cpf: formatCpf(String(row.cpf || '')),
    senha: '',
    confirmeSenha: '',
    ativo: row.ativo !== false,
    administrador: row.administrador === true,
    vincularPessoa: row.vincular_pessoa === true,
    operadorPatio: row.operador_patio === true,
    filialIds: Array.isArray(row.filial_ids) ? row.filial_ids.map((v) => Number(v)) : [],
    licencaIds: Array.isArray(row.licenca_ids) ? row.licenca_ids.map((v) => Number(v)) : [],
  };
}

function toPayload(form = {}) {
  const payload = {
    nome: String(form.nome || '').trim(),
    email: String(form.email || '').trim().toLowerCase(),
    telefone: String(form.telefone || '').trim() || null,
    cpf: normalizeDigits(form.cpf) || null,
    ativo: form.ativo !== false,
    administrador: form.administrador === true,
    vincular_pessoa: form.vincularPessoa === true,
    operador_patio: form.operadorPatio === true,
    filial_ids: Array.isArray(form.filialIds) ? form.filialIds : [],
    licenca_ids: Array.isArray(form.licencaIds) ? form.licencaIds : [],
  };
  const senha = String(form.senha || '').trim();
  if (senha) payload.senha = senha;
  return payload;
}

function validateForm(form = {}) {
  if (String(form.nome || '').trim().length < 3) return 'Informe o nome com pelo menos 3 caracteres.';
  if (!isValidEmail(form.email)) return 'Informe um e-mail válido.';
  const cpfDigits = normalizeDigits(form.cpf);
  if (cpfDigits && !isValidCpf(form.cpf)) return 'CPF inválido.';
  if (form.telefone && !isValidPhone(form.telefone)) return 'Telefone inválido. Informe DDD + número.';
  const senha = String(form.senha || '').trim();
  const confirmeSenha = String(form.confirmeSenha || '').trim();
  if (!form.id) {
    if (senha.length < 6) return 'A senha deve ter no mínimo 6 caracteres.';
    if (senha !== confirmeSenha) return 'A confirmação de senha não confere.';
  } else {
    if (senha && senha.length < 6) return 'A nova senha deve ter no mínimo 6 caracteres.';
    if (senha && senha !== confirmeSenha) return 'A confirmação de senha não confere.';
  }
  return '';
}

async function loadLookups() {
  const payload = await apiRequest('/usuarios-cadastro/lookups');
  state.lookups = {
    filiais: Array.isArray(payload?.data?.filiais) ? payload.data.filiais : [],
    licencas: Array.isArray(payload?.data?.licencas) ? payload.data.licencas : [],
  };
}

function getFilialLabel(id) {
  const found = state.lookups.filiais.find((item) => Number(item?.id) === Number(id));
  if (!found) return `Filial ${id}`;
  return `${found.codigo || ''} - ${found.nome || ''}`.trim();
}

function getLicencaLabel(id) {
  const found = state.lookups.licencas.find((item) => Number(item?.id) === Number(id));
  if (!found) return `Licença ${id}`;
  const total = Number(found.quantidade_licencas || 0);
  const used = Number(found.licencas_usadas || 0);
  const disponivel = Math.max(0, total - used);
  return `${String(found.modulo || '').toUpperCase()} (${disponivel}/${total} disponível)`;
}

function createMultiSelectItems(items = [], selectedIds = [], field) {
  if (!items.length) return '<p class="cad-usuarios-empty">Nenhuma opção disponível.</p>';
  const selected = new Set((selectedIds || []).map((v) => Number(v)));
  return `
    <div class="cad-usuarios-multiselect-items">
      ${items.map((item = {}) => {
    const id = Number(item.id || 0);
    if (!id) return '';
    const checked = selected.has(id) ? 'checked' : '';
    let label;
    let isDisabled = state.saving;
    if (field === 'licenca') {
      const total = Number(item.quantidade_licencas || 0);
      const used = Number(item.licencas_usadas || 0);
      const disponivel = Math.max(0, total - used);
      label = `${String(item.modulo || '').toUpperCase()} (${disponivel}/${total} disponível)`;
      if (disponivel <= 0 && !selected.has(id)) isDisabled = true;
    } else {
      label = `${item.codigo || ''} - ${item.nome || ''}`;
    }
    const disabledAttr = isDisabled ? 'disabled' : '';
    const titleAttr = field === 'licenca' && !selected.has(id) && (() => {
      const total = Number(item.quantidade_licencas || 0);
      const used = Number(item.licencas_usadas || 0);
      return used >= total ? `title="Sem vagas disponíveis para ${String(item.modulo || '').toUpperCase()}"` : '';
    })();
    return `
          <label class="cad-usuarios-multiselect-item${isDisabled && !state.saving ? ' cad-usuarios-multiselect-item--exhausted' : ''}">
            <input type="checkbox" data-usuario-multi="${field}" value="${id}" ${checked} ${disabledAttr} ${titleAttr || ''} />
            <span>${escapeHtml(label)}</span>
          </label>
        `;
  }).join('')}
    </div>
  `;
}

function renderForm() {
  const container = pageRef?.querySelector('#cadastro-usuario-container');
  const listHeader = pageRef?.querySelector('#usuarios-list-header');
  const listCard = pageRef?.querySelector('#usuarios-list-card');
  if (!container || !listHeader || !listCard) return;

  if (!state.formOpen) {
    container.hidden = true;
    listHeader.hidden = false;
    listCard.hidden = false;
    container.innerHTML = '';
    return;
  }

  container.hidden = false;
  listHeader.hidden = true;
  listCard.hidden = true;

  const isEditing = Boolean(state.form.id);
  const title = isEditing ? 'Editar usuário' : 'Cadastro de usuário';
  const filiaisSummary = `${state.form.filialIds.length} filial(is) selecionada(s)`;
  const licencasSummary = `${state.form.licencaIds.length} licença(s) selecionada(s)`;

  container.innerHTML = `
    <section class="cad-usuarios-form-card">
      <header class="cad-usuarios-form-header">
        <h2 class="cadastros-title">${title}</h2>
      </header>

      <div class="cad-usuarios-form-grid">
        <label class="cad-usuarios-field">
          <span>Código*</span>
          <input class="cadastro-pessoa-empresa__input" id="usuario-codigo" type="text" maxlength="40" value="${escapeHtml(state.form.codigo || 'Autom\\u00E1tico')}" readonly disabled />
        </label>

        <label class="cad-usuarios-field">
          <span>Nome*</span>
          <input class="cadastro-pessoa-empresa__input" id="usuario-nome" type="text" maxlength="160" value="${escapeHtml(state.form.nome)}" ${state.saving ? 'disabled' : ''} />
        </label>

        <label class="cad-usuarios-field">
          <span>E-mail*</span>
          <input class="cadastro-pessoa-empresa__input" id="usuario-email" type="email" maxlength="200" value="${escapeHtml(state.form.email)}" ${state.saving ? 'disabled' : ''} />
        </label>

        <label class="cad-usuarios-field">
          <span>Telefone</span>
          <input class="cadastro-pessoa-empresa__input" id="usuario-telefone" type="text" maxlength="20" value="${escapeHtml(state.form.telefone)}" ${state.saving ? 'disabled' : ''} />
        </label>

        <label class="cad-usuarios-field">
          <span>CPF</span>
          <input class="cadastro-pessoa-empresa__input" id="usuario-cpf" type="text" maxlength="14" value="${escapeHtml(state.form.cpf)}" ${state.saving ? 'disabled' : ''} />
        </label>

        <label class="cad-usuarios-field">
          <span>${isEditing ? 'Nova senha (deixe em branco para não alterar)' : 'Senha*'}</span>
          <input class="cadastro-pessoa-empresa__input" id="usuario-senha" type="password" maxlength="100" value="${escapeHtml(state.form.senha)}" autocomplete="new-password" ${state.saving ? 'disabled' : ''} />
        </label>

        <label class="cad-usuarios-field">
          <span>Confirmar senha${isEditing ? '' : '*'}</span>
          <input class="cadastro-pessoa-empresa__input" id="usuario-confirme-senha" type="password" maxlength="100" value="${escapeHtml(state.form.confirmeSenha)}" autocomplete="new-password" ${state.saving ? 'disabled' : ''} />
        </label>

        <label class="cad-usuarios-field cad-usuarios-field--full">
          <span>Filiais (ativas)</span>
          <details class="cad-usuarios-multiselect">
            <summary>${escapeHtml(filiaisSummary)}</summary>
            ${createMultiSelectItems(state.lookups.filiais, state.form.filialIds, 'filial')}
          </details>
        </label>

        <label class="cad-usuarios-field cad-usuarios-field--full">
          <span>Licenças disponibilizadas</span>
          <details class="cad-usuarios-multiselect">
            <summary>${escapeHtml(licencasSummary)}</summary>
            ${createMultiSelectItems(state.lookups.licencas, state.form.licencaIds, 'licenca')}
          </details>
        </label>
      </div>

      <label class="cad-usuarios-toggle-line">
        <input id="usuario-admin" type="checkbox" ${state.form.administrador ? 'checked' : ''} ${state.saving ? 'disabled' : ''} />
        <span>Administrador</span>
      </label>

      <label class="cad-usuarios-toggle-line">
        <input id="usuario-vincular-pessoa" type="checkbox" ${state.form.vincularPessoa ? 'checked' : ''} ${state.saving ? 'disabled' : ''} />
        <span>Vincular pessoa</span>
      </label>

      <label class="cad-usuarios-toggle-line">
        <input id="usuario-operador-patio" type="checkbox" ${state.form.operadorPatio ? 'checked' : ''} ${state.saving ? 'disabled' : ''} />
        <span>Operador de pátio</span>
      </label>

      <label class="cad-usuarios-toggle-line">
        <input id="usuario-ativo" type="checkbox" ${state.form.ativo ? 'checked' : ''} ${state.saving ? 'disabled' : ''} />
        <span>Cadastro ativo</span>
      </label>

      ${state.saveError ? `<p class="cad-usuarios-error">${escapeHtml(state.saveError)}</p>` : ''}

      <footer class="cad-usuarios-actions">
        <button type="button" class="btn btn--outline-dark" id="usuario-cancel-btn" ${state.saving ? 'disabled' : ''}>Cancelar</button>
        <button type="button" class="btn btn--primary ${state.saving ? 'btn--loading' : ''}" id="usuario-save-btn" ${state.saving ? 'disabled' : ''}>Salvar cadastro</button>
      </footer>
    </section>
  `;
}

function renderTable() {
  const tbody = pageRef?.querySelector('#usuarios-table-body');
  const info = pageRef?.querySelector('#usuarios-table-info');
  const pageNumber = pageRef?.querySelector('#usuarios-page-number');
  const prevBtn = pageRef?.querySelector('#usuarios-page-prev');
  const nextBtn = pageRef?.querySelector('#usuarios-page-next');
  if (!tbody || !info || !pageNumber || !prevBtn || !nextBtn) return;

  if (state.loading) {
    tbody.innerHTML = '<tr><td colspan="6" class="cad-usuarios-empty">Carregando...</td></tr>';
    return;
  }

  if (state.listError) {
    tbody.innerHTML = `<tr><td colspan="6" class="cad-usuarios-empty">${escapeHtml(state.listError)}</td></tr>`;
  } else if (!state.rows.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="cad-usuarios-empty">Nenhum usuário encontrado.</td></tr>';
  } else {
    tbody.innerHTML = state.rows.map((row = {}) => {
      const id = Number(row.id || 0);
      const ativo = row.ativo !== false ? 'Ativo' : 'Inativo';
      const admin = row.administrador === true ? 'Sim' : 'Não';
      return `
        <tr data-id="${id}">
          <td>${escapeHtml(row.codigo || '')}</td>
          <td>${escapeHtml(row.nome || '')}</td>
          <td>${escapeHtml(row.email || '')}</td>
          <td>${escapeHtml(admin)}</td>
          <td>${escapeHtml(ativo)}</td>
          <td>
            <div class="cad-usuarios-row-actions">
              <button type="button" class="btn btn--outline-dark" data-usuario-action="edit" data-id="${id}">Editar</button>
              <button type="button" class="btn btn--outline-dark" data-usuario-action="delete" data-id="${id}">Excluir</button>
              <button type="button" class="btn btn--outline-dark" data-usuario-action="force-logout" data-id="${id}" title="Encerra a sessão ativa deste usuário">Deslogar</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  const from = state.total === 0 ? 0 : ((state.page - 1) * state.limit) + 1;
  const to = state.total === 0 ? 0 : Math.min(state.page * state.limit, state.total);
  info.textContent = `Mostrando ${from} a ${to} de ${state.total} entradas.`;
  pageNumber.textContent = String(state.page);
  const totalPages = Math.max(1, Math.ceil((state.total || 0) / (state.limit || 1)));
  prevBtn.disabled = state.page <= 1;
  nextBtn.disabled = state.page >= totalPages;
}

function renderPage() {
  renderForm();
  renderTable();
}

function closeForm() {
  state.formOpen = false;
  state.saveError = '';
  state.saving = false;
  state.form = createEmptyForm();
  renderPage();
}

function openNewForm() {
  state.formOpen = true;
  state.saveError = '';
  state.saving = false;
  state.form = createEmptyForm();
  renderPage();
}

function openEditForm(row) {
  state.formOpen = true;
  state.saveError = '';
  state.saving = false;
  state.form = mapRowToForm(row);
  renderPage();
}

async function loadRows() {
  state.loading = true;
  state.listError = '';
  renderPage();

  try {
    const payload = await apiRequest('/usuarios-cadastro', {
      query: { page: state.page, limit: state.limit, q: state.search || undefined },
    });
    const rows = parseRows(payload);
    const meta = parseMeta(payload, rows.length);
    state.rows = rows;
    state.total = meta.total;
    state.page = meta.page || state.page;
    state.limit = meta.limit || state.limit;
  } catch (error) {
    state.rows = [];
    state.total = 0;
    state.listError = error instanceof Error ? error.message : 'Falha ao carregar usuários.';
  } finally {
    state.loading = false;
    renderPage();
  }
}

function getCheckedIds(selector) {
  const nodes = pageRef?.querySelectorAll(selector) || [];
  return Array.from(nodes)
    .filter((el) => el instanceof HTMLInputElement && el.checked)
    .map((el) => Number(el.value))
    .filter((n) => Number.isFinite(n) && n > 0);
}

function bindFormFromDom() {
  const nome = pageRef?.querySelector('#usuario-nome');
  const email = pageRef?.querySelector('#usuario-email');
  const telefone = pageRef?.querySelector('#usuario-telefone');
  const cpf = pageRef?.querySelector('#usuario-cpf');
  const senha = pageRef?.querySelector('#usuario-senha');
  const confirmeSenha = pageRef?.querySelector('#usuario-confirme-senha');
  const admin = pageRef?.querySelector('#usuario-admin');
  const vincularPessoa = pageRef?.querySelector('#usuario-vincular-pessoa');
  const operadorPatio = pageRef?.querySelector('#usuario-operador-patio');
  const ativo = pageRef?.querySelector('#usuario-ativo');

  state.form = {
    ...state.form,
    nome: nome instanceof HTMLInputElement ? nome.value : state.form.nome,
    email: email instanceof HTMLInputElement ? email.value : state.form.email,
    telefone: telefone instanceof HTMLInputElement ? telefone.value : state.form.telefone,
    cpf: cpf instanceof HTMLInputElement ? formatCpf(cpf.value) : state.form.cpf,
    senha: senha instanceof HTMLInputElement ? senha.value : state.form.senha,
    confirmeSenha: confirmeSenha instanceof HTMLInputElement ? confirmeSenha.value : state.form.confirmeSenha,
    administrador: admin instanceof HTMLInputElement ? admin.checked : state.form.administrador,
    vincularPessoa: vincularPessoa instanceof HTMLInputElement ? vincularPessoa.checked : state.form.vincularPessoa,
    operadorPatio: operadorPatio instanceof HTMLInputElement ? operadorPatio.checked : state.form.operadorPatio,
    ativo: ativo instanceof HTMLInputElement ? ativo.checked : state.form.ativo,
    filialIds: getCheckedIds('input[data-usuario-multi="filial"]'),
    licencaIds: getCheckedIds('input[data-usuario-multi="licenca"]'),
  };
}

async function saveForm() {
  bindFormFromDom();
  const validationError = validateForm(state.form);
  if (validationError) {
    state.saveError = validationError;
    renderForm();
    return;
  }

  state.saving = true;
  state.saveError = '';
  renderForm();

  try {
    const payload = toPayload(state.form);
    if (state.form.id) {
      await apiRequest(`/usuarios-cadastro/${state.form.id}`, { method: 'PUT', body: payload });
    } else {
      await apiRequest('/usuarios-cadastro', { method: 'POST', body: payload });
    }
    closeForm();
    await loadRows();
  } catch (error) {
    state.saving = false;
    state.saveError = error instanceof Error ? error.message : 'Falha ao salvar usuário.';
    renderForm();
  }
}

async function forceLogoutUser(id, row) {
  if (!id) return;
  const nome = row?.nome ? escapeHtml(String(row.nome)) : `ID ${id}`;
  if (!window.confirm(`Deseja deslogar o usuário "${nome}" do sistema? A sessão será encerrada no próximo heartbeat (até 10 minutos).`)) return;
  try {
    const result = await apiRequest(`/usuarios-cadastro/${id}/force-logout`, { method: 'POST' });
    const terminated = Number(result?.data?.terminated ?? 0);
    if (terminated > 0) {
      window.alert(`Sessão do usuário "${nome}" encerrada com sucesso.`);
    } else {
      window.alert(`O usuário "${nome}" não possui sessão ativa no momento.`);
    }
  } catch (error) {
    window.alert(error instanceof Error ? error.message : 'Falha ao encerrar sessão do usuário.');
  }
}

async function removeRow(id) {
  if (!id) return;
  if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;
  try {
    await apiRequest(`/usuarios-cadastro/${id}`, { method: 'DELETE' });
    await loadRows();
  } catch (error) {
    window.alert(error instanceof Error ? error.message : 'Falha ao excluir usuário.');
  }
}

function handleClick(event) {
  const newBtn = event.target?.closest?.('#usuarios-new-btn');
  if (newBtn) {
    openNewForm();
    return;
  }

  const cancelBtn = event.target?.closest?.('#usuario-cancel-btn');
  if (cancelBtn) {
    closeForm();
    return;
  }

  const saveBtn = event.target?.closest?.('#usuario-save-btn');
  if (saveBtn) {
    void saveForm();
    return;
  }

  const prevBtn = event.target?.closest?.('#usuarios-page-prev');
  if (prevBtn && state.page > 1 && !state.loading) {
    state.page -= 1;
    void loadRows();
    return;
  }

  const nextBtn = event.target?.closest?.('#usuarios-page-next');
  if (nextBtn && !state.loading) {
    const totalPages = Math.max(1, Math.ceil((state.total || 0) / (state.limit || 1)));
    if (state.page < totalPages) {
      state.page += 1;
      void loadRows();
    }
    return;
  }

  const actionBtn = event.target?.closest?.('[data-usuario-action]');
  if (!actionBtn) return;
  const action = actionBtn.getAttribute('data-usuario-action') || '';
  const id = Number(actionBtn.getAttribute('data-id') || 0);
  const row = state.rows.find((item) => Number(item?.id) === id);

  if (action === 'edit' && row) {
    openEditForm(row);
    return;
  }
  if (action === 'delete') {
    void removeRow(id);
    return;
  }
  if (action === 'force-logout') {
    void forceLogoutUser(id, row);
  }
}

function handleInput(event) {
  const searchInput = event.target?.closest?.('#usuarios-search-input');
  if (searchInput && searchInput instanceof HTMLInputElement) {
    state.search = searchInput.value || '';
    state.page = 1;
    if (searchDebounce) window.clearTimeout(searchDebounce);
    searchDebounce = window.setTimeout(() => {
      void loadRows();
    }, 300);
    return;
  }

  const cpfInput = event.target?.closest?.('#usuario-cpf');
  if (cpfInput && cpfInput instanceof HTMLInputElement) {
    cpfInput.value = formatCpf(cpfInput.value);
  }

  const telefoneInput = event.target?.closest?.('#usuario-telefone');
  if (telefoneInput && telefoneInput instanceof HTMLInputElement) {
    telefoneInput.value = formatPhone(telefoneInput.value);
  }
}

function bindEvents() {
  pageRef?.addEventListener('click', handleClick);
  pageRef?.addEventListener('input', handleInput);
}

function unbindEvents() {
  pageRef?.removeEventListener('click', handleClick);
  pageRef?.removeEventListener('input', handleInput);
}

export function init() {
  pageRef = document.querySelector('.cad-usuarios-page');
  if (!pageRef) return () => { };

  activeController = new AbortController();
  bindEvents();
  renderPage();
  void Promise.all([loadLookups(), loadRows()]).catch((error) => {
    state.listError = error instanceof Error ? error.message : 'Falha ao carregar dados da tela.';
    renderPage();
  });

  return () => {
    unbindEvents();
    if (searchDebounce) window.clearTimeout(searchDebounce);
    if (activeController) activeController.abort();
    pageRef = null;
    activeController = null;
  };
}

