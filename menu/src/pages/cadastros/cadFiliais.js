const API_BASE_URL = window?.TAWROS_API_URL || 'http://192.168.15.26:3000/api/v1';

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
};

let pageRef = null;
let activeController = null;
let searchDebounce = null;

function createEmptyForm() {
  return {
    id: '',
    codigo: '',
    nome: '',
    cnpj: '',
    ativo: true,
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

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: activeController?.signal,
  });

  if (response.status === 401 && retryOnUnauthorized) {
    const refreshed = await refreshAccessToken().catch(() => false);
    if (refreshed) {
      return apiRequest(path, { method, query, body, retryOnUnauthorized: false });
    }
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.message || `Falha na requisição (${response.status})`);
  }
  return payload;
}

function parseRows(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.rows)) return payload.data.rows;
  return [];
}

function parseMeta(payload, fallbackTotal = 0) {
  const meta = payload?.meta || payload?.data?.meta || {};
  const total = Number(meta.total ?? fallbackTotal ?? 0);
  const page = Number(meta.page ?? state.page ?? 1);
  const limit = Number(meta.limit ?? state.limit ?? 20);
  return { total, page, limit };
}

import { normalizeDigits, formatCnpj, isValidCnpj } from '../../utils/validators.js';

function mapRowToForm(row = {}) {
  return {
    id: String(row.id || ''),
    codigo: String(row.codigo || ''),
    nome: String(row.nome || ''),
    cnpj: formatCnpj(String(row.cnpj || '')),
    ativo: row.ativo !== false,
  };
}

function toPayload(form = {}) {
  return {
    codigo: String(form.codigo || '').trim(),
    nome: String(form.nome || '').trim(),
    cnpj: normalizeDigits(form.cnpj),
    ativo: form.ativo !== false,
  };
}

function validateForm(form = {}) {
  if (String(form.codigo || '').trim().length < 2) return 'Informe um código com pelo menos 2 caracteres.';
  if (String(form.nome || '').trim().length < 3) return 'Informe um nome com pelo menos 3 caracteres.';
  if (!normalizeDigits(form.cnpj)) return 'Informe o CNPJ da filial.';
  if (!isValidCnpj(form.cnpj)) return 'Informe um CNPJ válido.';
  return '';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderForm() {
  const container = pageRef?.querySelector('#cadastro-filial-container');
  const listHeader = pageRef?.querySelector('#filiais-list-header');
  const listCard = pageRef?.querySelector('#filiais-list-card');
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
  const title = isEditing ? 'Editar filial' : 'Cadastro de filial';

  container.innerHTML = `
    <section class="cad-filiais-form-card">
      <header class="cad-filiais-form-header">
        <h2 class="cadastros-title">${title}</h2>
      </header>

      <div class="cad-filiais-form-grid">
        <label class="cad-filiais-field">
          <span>Código*</span>
          <input class="cadastro-pessoa-empresa__input" id="filial-codigo" type="text" maxlength="40" value="${escapeHtml(state.form.codigo)}" ${state.saving ? 'disabled' : ''} />
        </label>

        <label class="cad-filiais-field">
          <span>Nome*</span>
          <input class="cadastro-pessoa-empresa__input" id="filial-nome" type="text" maxlength="160" value="${escapeHtml(state.form.nome)}" ${state.saving ? 'disabled' : ''} />
        </label>

        <label class="cad-filiais-field">
          <span>CNPJ*</span>
          <input class="cadastro-pessoa-empresa__input" id="filial-cnpj" type="text" maxlength="18" value="${escapeHtml(state.form.cnpj)}" ${state.saving ? 'disabled' : ''} />
        </label>
      </div>

      <label class="cad-filiais-toggle">
        <input id="filial-ativo" type="checkbox" ${state.form.ativo ? 'checked' : ''} ${state.saving ? 'disabled' : ''} />
        <span>Cadastro ativo</span>
      </label>

      ${state.saveError ? `<p class="cad-filiais-error">${escapeHtml(state.saveError)}</p>` : ''}

      <footer class="cad-filiais-actions">
        <button type="button" class="btn btn--outline-dark" id="filial-cancel-btn" ${state.saving ? 'disabled' : ''}>Cancelar</button>
        <button type="button" class="btn btn--primary ${state.saving ? 'btn--loading' : ''}" id="filial-save-btn" ${state.saving ? 'disabled' : ''}>Salvar cadastro</button>
      </footer>
    </section>
  `;
}

function renderTable() {
  const tbody = pageRef?.querySelector('#filiais-table-body');
  const info = pageRef?.querySelector('#filiais-table-info');
  const pageNumber = pageRef?.querySelector('#filiais-page-number');
  const prevBtn = pageRef?.querySelector('#filiais-page-prev');
  const nextBtn = pageRef?.querySelector('#filiais-page-next');
  if (!tbody || !info || !pageNumber || !prevBtn || !nextBtn) return;

  if (state.loading) {
    tbody.innerHTML = `<tr><td colspan="5" class="cad-filiais-empty">Carregando...</td></tr>`;
    return;
  }

  if (state.listError) {
    tbody.innerHTML = `<tr><td colspan="5" class="cad-filiais-empty">${escapeHtml(state.listError)}</td></tr>`;
  } else if (!state.rows.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="cad-filiais-empty">Nenhuma filial encontrada.</td></tr>';
  } else {
    tbody.innerHTML = state.rows
      .map((row) => {
        const id = escapeHtml(row.id || '');
        const status = row.ativo === false ? 'Inativo' : 'Ativo';
        return `
          <tr data-id="${id}">
            <td>${escapeHtml(row.codigo || '')}</td>
            <td>${escapeHtml(row.nome || '')}</td>
            <td>${escapeHtml(formatCnpj(row.cnpj || ''))}</td>
            <td>${escapeHtml(status)}</td>
            <td>
              <div class="cad-filiais-row-actions">
                <button type="button" class="btn btn--outline-dark" data-filial-action="edit" data-id="${id}">Editar</button>
                <button type="button" class="btn btn--outline-dark" data-filial-action="delete" data-id="${id}">Excluir</button>
              </div>
            </td>
          </tr>
        `;
      })
      .join('');
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
    const payload = await apiRequest('/filiais', {
      query: {
        page: state.page,
        limit: state.limit,
        sort: 'nome',
        order: 'asc',
        q: state.search || undefined,
      },
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
    state.listError = error instanceof Error ? error.message : 'Falha ao carregar filiais.';
  } finally {
    state.loading = false;
    renderPage();
  }
}

function bindFormFromDom() {
  const codigo = pageRef?.querySelector('#filial-codigo');
  const nome = pageRef?.querySelector('#filial-nome');
  const cnpj = pageRef?.querySelector('#filial-cnpj');
  const ativo = pageRef?.querySelector('#filial-ativo');

  state.form = {
    ...state.form,
    codigo: codigo instanceof HTMLInputElement ? codigo.value : state.form.codigo,
    nome: nome instanceof HTMLInputElement ? nome.value : state.form.nome,
    cnpj: cnpj instanceof HTMLInputElement ? formatCnpj(cnpj.value) : state.form.cnpj,
    ativo: ativo instanceof HTMLInputElement ? ativo.checked : state.form.ativo,
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
      await apiRequest(`/filiais/${state.form.id}`, { method: 'PUT', body: payload });
    } else {
      await apiRequest('/filiais', { method: 'POST', body: payload });
    }
    closeForm();
    await loadRows();
  } catch (error) {
    state.saving = false;
    state.saveError = error instanceof Error ? error.message : 'Falha ao salvar filial.';
    renderForm();
  }
}

async function removeRow(id) {
  if (!id) return;
  const confirmed = window.confirm('Tem certeza que deseja excluir esta filial?');
  if (!confirmed) return;

  try {
    await apiRequest(`/filiais/${id}`, { method: 'DELETE' });
    await loadRows();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Falha ao excluir filial.';
    window.alert(message);
  }
}

function handleClick(event) {
  const newBtn = event.target?.closest?.('#filiais-new-btn');
  if (newBtn) {
    openNewForm();
    return;
  }

  const cancelBtn = event.target?.closest?.('#filial-cancel-btn');
  if (cancelBtn) {
    closeForm();
    return;
  }

  const saveBtn = event.target?.closest?.('#filial-save-btn');
  if (saveBtn) {
    void saveForm();
    return;
  }

  const prevBtn = event.target?.closest?.('#filiais-page-prev');
  if (prevBtn && state.page > 1 && !state.loading) {
    state.page -= 1;
    void loadRows();
    return;
  }

  const nextBtn = event.target?.closest?.('#filiais-page-next');
  if (nextBtn && !state.loading) {
    const totalPages = Math.max(1, Math.ceil((state.total || 0) / (state.limit || 1)));
    if (state.page < totalPages) {
      state.page += 1;
      void loadRows();
    }
    return;
  }

  const actionBtn = event.target?.closest?.('[data-filial-action]');
  if (!actionBtn) return;
  const action = actionBtn.getAttribute('data-filial-action') || '';
  const id = actionBtn.getAttribute('data-id') || '';
  const row = state.rows.find((item) => String(item?.id || '') === String(id));

  if (action === 'edit' && row) {
    openEditForm(row);
    return;
  }

  if (action === 'delete') {
    void removeRow(id);
  }
}

function handleInput(event) {
  const searchInput = event.target?.closest?.('#filiais-search-input');
  if (searchInput && searchInput instanceof HTMLInputElement) {
    const nextSearch = searchInput.value || '';
    state.search = nextSearch;
    state.page = 1;

    if (searchDebounce) window.clearTimeout(searchDebounce);
    searchDebounce = window.setTimeout(() => {
      void loadRows();
    }, 300);
    return;
  }

  const cnpjInput = event.target?.closest?.('#filial-cnpj');
  if (cnpjInput && cnpjInput instanceof HTMLInputElement) {
    cnpjInput.value = formatCnpj(cnpjInput.value);
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
  pageRef = document.querySelector('.cad-filiais-page');
  if (!pageRef) return () => { };

  activeController = new AbortController();
  bindEvents();
  renderPage();
  void loadRows();

  return () => {
    unbindEvents();
    if (searchDebounce) window.clearTimeout(searchDebounce);
    if (activeController) activeController.abort();
    pageRef = null;
    activeController = null;
  };
}
