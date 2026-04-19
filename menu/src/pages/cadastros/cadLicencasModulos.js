const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.tawros.com.br/api/v1';

const state = {
  rows: [],
  modulos: [],
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
    modulo: '',
    quantidadeLicencas: '0',
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

function parseErrorMessage(payload, status) {
  const base = payload?.message || payload?.error || `Falha na requisição (${status})`;
  const detail = payload?.details?.message || payload?.details?.detail;
  if (!detail) return base;
  return `${base}: ${detail}`;
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
    if (refreshed) {
      return apiRequest(path, { method, query, body, retryOnUnauthorized: false });
    }
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(parseErrorMessage(payload, response.status));
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

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toInteger(value) {
  const parsed = Number.parseInt(String(value ?? '').trim(), 10);
  return Number.isFinite(parsed) ? parsed : NaN;
}

function normalizeModulo(value) {
  return String(value || '').trim().toLowerCase();
}

function moduloLabel(value) {
  const normalized = normalizeModulo(value);
  const found = state.modulos.find((item) => item.value === normalized);
  return found?.label || (value ? value.charAt(0).toUpperCase() + value.slice(1) : '-');
}

function mapRowToForm(row = {}) {
  return {
    id: String(row.id || ''),
    modulo: normalizeModulo(row.modulo),
    quantidadeLicencas: String(Number(row.quantidade_licencas ?? 0)),
    ativo: row.ativo !== false,
  };
}

function toPayload(form = {}) {
  return {
    modulo: normalizeModulo(form.modulo),
    quantidade_licencas: toInteger(form.quantidadeLicencas),
    ativo: form.ativo !== false,
  };
}

function validateForm(form = {}) {
  const modulo = normalizeModulo(form.modulo);
  if (!modulo || !state.modulos.some((item) => item.value === modulo)) return 'Selecione um módulo válido.';
  const quantidade = toInteger(form.quantidadeLicencas);
  if (!Number.isFinite(quantidade) || quantidade < 0) return 'Informe uma quantidade de licenças válida (0 ou maior).';
  return '';
}

function createModuloOptions(selected) {
  const selectedNormalized = normalizeModulo(selected);
  return state.modulos
    .map((item) => `<option value="${escapeHtml(item.value)}" ${item.value === selectedNormalized ? 'selected' : ''}>${escapeHtml(item.label)}</option>`)
    .join('');
}

function renderForm() {
  const container = pageRef?.querySelector('#cadastro-licenca-container');
  const listHeader = pageRef?.querySelector('#licencas-list-header');
  const listCard = pageRef?.querySelector('#licencas-list-card');
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
  const title = isEditing ? 'Editar licença por módulo' : 'Cadastro de licença por módulo';

  container.innerHTML = `
    <section class="cad-licencas-form-card">
      <header class="cad-licencas-form-header">
        <h2 class="cadastros-title">${title}</h2>
      </header>

      <div class="cad-licencas-form-grid">
        <label class="cad-licencas-field">
          <span>Módulo*</span>
          <select class="cadastro-pessoa-empresa__input" id="licenca-modulo" ${state.saving ? 'disabled' : ''}>
            <option value="">Selecione</option>
            ${createModuloOptions(state.form.modulo)}
          </select>
        </label>

        <label class="cad-licencas-field">
          <span>Quantidade de licenças*</span>
          <input class="cadastro-pessoa-empresa__input" id="licenca-quantidade" type="number" min="0" step="1" value="${escapeHtml(state.form.quantidadeLicencas)}" ${state.saving ? 'disabled' : ''} />
        </label>
      </div>

      <label class="cad-licencas-toggle">
        <input id="licenca-ativo" type="checkbox" ${state.form.ativo ? 'checked' : ''} ${state.saving ? 'disabled' : ''} />
        <span>Cadastro ativo</span>
      </label>

      ${state.saveError ? `<p class="cad-licencas-error">${escapeHtml(state.saveError)}</p>` : ''}

      <footer class="cad-licencas-actions">
        <button type="button" class="btn btn--outline-dark" id="licenca-cancel-btn" ${state.saving ? 'disabled' : ''}>Cancelar</button>
        <button type="button" class="btn btn--primary ${state.saving ? 'btn--loading' : ''}" id="licenca-save-btn" ${state.saving ? 'disabled' : ''}>Salvar cadastro</button>
      </footer>
    </section>
  `;
}

function renderTable() {
  const tbody = pageRef?.querySelector('#licencas-table-body');
  const info = pageRef?.querySelector('#licencas-table-info');
  const pageNumber = pageRef?.querySelector('#licencas-page-number');
  const prevBtn = pageRef?.querySelector('#licencas-page-prev');
  const nextBtn = pageRef?.querySelector('#licencas-page-next');
  if (!tbody || !info || !pageNumber || !prevBtn || !nextBtn) return;

  if (state.loading) {
    tbody.innerHTML = '<tr><td colspan="4" class="cad-licencas-empty">Carregando...</td></tr>';
    return;
  }

  if (state.listError) {
    tbody.innerHTML = `<tr><td colspan="4" class="cad-licencas-empty">${escapeHtml(state.listError)}</td></tr>`;
  } else if (!state.rows.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="cad-licencas-empty">Nenhum cadastro encontrado.</td></tr>';
  } else {
    tbody.innerHTML = state.rows
      .map((row) => {
        const id = escapeHtml(row.id || '');
        const status = row.ativo === false ? 'Inativo' : 'Ativo';
        const quantidade = Number(row.quantidade_licencas ?? 0);
        return `
          <tr data-id="${id}">
            <td>${escapeHtml(moduloLabel(row.modulo))}</td>
            <td>${escapeHtml(String(quantidade))}</td>
            <td>${escapeHtml(status)}</td>
            <td>
              <div class="cad-licencas-row-actions">
                <button type="button" class="btn btn--outline-dark" data-licenca-action="edit" data-id="${id}">Editar</button>
                <button type="button" class="btn btn--outline-dark" data-licenca-action="delete" data-id="${id}">Excluir</button>
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

async function loadModulos() {
  try {
    const payload = await apiRequest('/licencas-modulos/modulos-disponiveis');
    const data = Array.isArray(payload?.data) ? payload.data : [];
    state.modulos = data;
  } catch {
    state.modulos = [];
  }
}

async function loadRows() {
  state.loading = true;
  state.listError = '';
  renderPage();

  try {
    const payload = await apiRequest('/licencas-modulos', {
      query: {
        page: state.page,
        limit: state.limit,
        sort: 'modulo',
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
    state.listError = error instanceof Error ? error.message : 'Falha ao carregar licenças.';
  } finally {
    state.loading = false;
    renderPage();
  }
}

function bindFormFromDom() {
  const modulo = pageRef?.querySelector('#licenca-modulo');
  const quantidade = pageRef?.querySelector('#licenca-quantidade');
  const ativo = pageRef?.querySelector('#licenca-ativo');

  state.form = {
    ...state.form,
    modulo: modulo instanceof HTMLSelectElement ? modulo.value : state.form.modulo,
    quantidadeLicencas: quantidade instanceof HTMLInputElement ? quantidade.value : state.form.quantidadeLicencas,
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
      await apiRequest(`/licencas-modulos/${state.form.id}`, { method: 'PUT', body: payload });
    } else {
      await apiRequest('/licencas-modulos', { method: 'POST', body: payload });
    }
    closeForm();
    await loadRows();
  } catch (error) {
    state.saving = false;
    state.saveError = error instanceof Error ? error.message : 'Falha ao salvar licença.';
    renderForm();
  }
}

async function removeRow(id) {
  if (!id) return;
  const confirmed = window.confirm('Tem certeza que deseja excluir este cadastro de licença?');
  if (!confirmed) return;

  try {
    await apiRequest(`/licencas-modulos/${id}`, { method: 'DELETE' });
    await loadRows();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Falha ao excluir licença.';
    window.alert(message);
  }
}

function handleClick(event) {
  const newBtn = event.target?.closest?.('#licencas-new-btn');
  if (newBtn) {
    openNewForm();
    return;
  }

  const cancelBtn = event.target?.closest?.('#licenca-cancel-btn');
  if (cancelBtn) {
    closeForm();
    return;
  }

  const saveBtn = event.target?.closest?.('#licenca-save-btn');
  if (saveBtn) {
    void saveForm();
    return;
  }

  const prevBtn = event.target?.closest?.('#licencas-page-prev');
  if (prevBtn && state.page > 1 && !state.loading) {
    state.page -= 1;
    void loadRows();
    return;
  }

  const nextBtn = event.target?.closest?.('#licencas-page-next');
  if (nextBtn && !state.loading) {
    const totalPages = Math.max(1, Math.ceil((state.total || 0) / (state.limit || 1)));
    if (state.page < totalPages) {
      state.page += 1;
      void loadRows();
    }
    return;
  }

  const actionBtn = event.target?.closest?.('[data-licenca-action]');
  if (!actionBtn) return;
  const action = actionBtn.getAttribute('data-licenca-action') || '';
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
  const searchInput = event.target?.closest?.('#licencas-search-input');
  if (searchInput && searchInput instanceof HTMLInputElement) {
    state.search = searchInput.value || '';
    state.page = 1;
    if (searchDebounce) window.clearTimeout(searchDebounce);
    searchDebounce = window.setTimeout(() => {
      void loadRows();
    }, 300);
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
  pageRef = document.querySelector('.cad-licencas-modulos-page');
  if (!pageRef) return () => { };

  activeController = new AbortController();
  bindEvents();
  renderPage();
  void Promise.all([loadModulos(), loadRows()]);

  return () => {
    unbindEvents();
    if (searchDebounce) window.clearTimeout(searchDebounce);
    if (activeController) activeController.abort();
    pageRef = null;
    activeController = null;
  };
}
