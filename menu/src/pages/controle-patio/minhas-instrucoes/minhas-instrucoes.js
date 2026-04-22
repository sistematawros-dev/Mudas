const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.sistemas.tawros.com.br:3000/api/v1';
let activeController = null;

const state = {
  rows: [],
  filteredRows: [],
  search: '',
  filterStatus: 'todos',
  page: 1,
  perPage: 20,
};

function getUser() {
  try { return JSON.parse(sessionStorage.getItem('user') || '{}'); } catch { return {}; }
}

function getAccessToken() { return sessionStorage.getItem('authToken') || ''; }
function getRefreshToken() { return sessionStorage.getItem('refreshToken') || ''; }

function setTokens(access, refresh) {
  if (access) sessionStorage.setItem('authToken', String(access));
  if (refresh) sessionStorage.setItem('refreshToken', String(refresh));
}

function parseApiResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (payload?.data && Array.isArray(payload.data.rows)) return payload.data.rows;
  return [];
}

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) return false;
  const payload = await res.json().catch(() => ({}));
  const data = payload?.data || {};
  if (!data.accessToken) return false;
  setTokens(data.accessToken, data.refreshToken || refreshToken);
  return true;
}

async function apiRequest(path, { method = 'GET', query, body, retryOnUnauthorized = true } = {}) {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
    });
  }
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const token = getAccessToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const filialId = sessionStorage.getItem('filialId');
  if (filialId) headers['X-Filial-Id'] = filialId;

  const res = await fetch(url.toString(), {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: activeController?.signal,
  });

  if (res.status === 401 && retryOnUnauthorized) {
    const refreshed = await refreshAccessToken().catch(() => false);
    if (refreshed) return apiRequest(path, { method, query, body, retryOnUnauthorized: false });
  }
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(payload?.message || `Erro (${res.status})`);
  return payload;
}

function formatDate(value) {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('pt-BR');
}

function normalizeText(v) {
  return String(v || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

function badgeHtml(text, cls) {
  return `<span class="minhas-instrucoes__badge minhas-instrucoes__badge--${cls}">${text}</span>`;
}

function aprovacaoBadge(status) {
  const map = {
    pendente: badgeHtml('Pendente', 'pendente'),
    aprovado: badgeHtml('Aprovado', 'aprovado'),
    recusado: badgeHtml('Recusado', 'recusado'),
  };
  return map[status] || badgeHtml(status || '-', 'pendente');
}

function statusBadge(status) {
  if (status === 'finalizado') return badgeHtml('Finalizado', 'finalizado');
  if (status === 'aprovado') return badgeHtml('Aprovado', 'aprovado');
  if (status === 'recusado') return badgeHtml('Recusado', 'recusado');
  return badgeHtml('Pendente', 'pendente');
}

function applyFilters() {
  const searchTerm = normalizeText(state.search);
  state.filteredRows = state.rows.filter((row) => {
    if (state.filterStatus !== 'todos' && row.statusAprovacao !== state.filterStatus) return false;
    if (!searchTerm) return true;
    return (
      normalizeText(row.code).includes(searchTerm)
      || normalizeText(row.produtor).includes(searchTerm)
      || normalizeText(row.driver).includes(searchTerm)
      || normalizeText(row.truck).includes(searchTerm)
    );
  });
  state.page = 1;
}

function renderTable() {
  const tbody = document.getElementById('minhas-instrucoes-tbody');
  if (!tbody) return;

  const start = (state.page - 1) * state.perPage;
  const pageRows = state.filteredRows.slice(start, start + state.perPage);

  if (!pageRows.length) {
    tbody.innerHTML = '<tr class="minhas-instrucoes__empty-row"><td colspan="11">Nenhum agendamento encontrado.</td></tr>';
    return;
  }

  tbody.innerHTML = pageRows.map((row) => `
    <tr>
      <td><span class="minhas-instrucoes__id">#${row.instrucaoId}</span></td>
      <td><span class="minhas-instrucoes__code">${row.code}</span></td>
      <td>${row.tipoProduto}</td>
      <td>${row.produtor}</td>
      <td>${row.dataAgendamento}</td>
      <td>${row.driver}</td>
      <td>${row.truck}</td>
      <td>${row.quantidade > 0 ? `${row.quantidade.toLocaleString('pt-BR')} kg` : '-'}</td>
      <td>${row.quantidadeCarregada > 0 ? `${row.quantidadeCarregada.toLocaleString('pt-BR')} kg` : '-'}</td>
      <td>${aprovacaoBadge(row.statusAprovacao)}</td>
      <td>${statusBadge(row.instrucaoStatus)}</td>
    </tr>
  `).join('');
}

function renderPagination() {
  const container = document.getElementById('minhas-instrucoes-pagination');
  if (!container) return;
  const totalPages = Math.max(1, Math.ceil(state.filteredRows.length / state.perPage));
  if (totalPages <= 1) { container.innerHTML = ''; return; }

  const prevDisabled = state.page <= 1 ? 'disabled' : '';
  const nextDisabled = state.page >= totalPages ? 'disabled' : '';
  container.innerHTML = `
    <div class="minhas-instrucoes__pag-inner">
      <button class="minhas-instrucoes__pag-btn" data-action="pag-prev" ${prevDisabled}>‹</button>
      <span class="minhas-instrucoes__pag-info">Página ${state.page} de ${totalPages}</span>
      <button class="minhas-instrucoes__pag-btn" data-action="pag-next" ${nextDisabled}>›</button>
    </div>
  `;
}

function renderFilters() {
  const container = document.getElementById('minhas-instrucoes-filters');
  if (!container) return;
  const options = [
    { value: 'todos', label: 'Todos' },
    { value: 'pendente', label: 'Pendente Aprovação' },
    { value: 'aprovado', label: 'Aprovados' },
    { value: 'recusado', label: 'Recusados' },
  ];
  container.innerHTML = options.map((opt) => `
    <button class="minhas-instrucoes__filter-btn ${state.filterStatus === opt.value ? 'minhas-instrucoes__filter-btn--active' : ''}"
      data-action="filter-status" data-value="${opt.value}">${opt.label}</button>
  `).join('');
}

function renderPage() {
  renderFilters();
  renderTable();
  renderPagination();
}

async function loadData() {
  const user = getUser();
  const pessoaNome = String(user?.pessoaNome || '').trim();

  const [agendamentosRes, instrucoesRes, pessoasRes] = await Promise.all([
    apiRequest('/instrucoes-agendamentos', { query: { limit: 2000 } }),
    apiRequest('/instrucoes', { query: { page: 1, limit: 500 } }),
    apiRequest('/pessoas-empresas', { query: { limit: 500 } }).catch(() => ({ data: [] })),
  ]);

  const agendamentos = parseApiResponse(agendamentosRes).filter((a) => !a.deleted_at);
  const instrucoes = Object.fromEntries(parseApiResponse(instrucoesRes).map((i) => [String(i.id), i]));
  const pessoas = parseApiResponse(pessoasRes).reduce((acc, row) => {
    const nome = row?.razao_social || row?.nome_fantasia || row?.nome_responsavel || `Pessoa ${row?.id}`;
    acc[String(row.id)] = nome;
    return acc;
  }, {});

  const normalizeNome = (v) => String(v || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

  const meus = pessoaNome
    ? agendamentos.filter((a) => normalizeNome(a.nome_transportadora) === normalizeNome(pessoaNome))
    : agendamentos;

  state.rows = meus.map((a) => {
    const instrucao = instrucoes[String(a.instrucao_id)] || {};
    const produtor = pessoas[String(instrucao.produtor_id)] || instrucao.nome_vendedor_produtor || '-';
    return {
      id: String(a.id),
      instrucaoId: String(a.instrucao_id),
      code: instrucao.numero_instrucao || `INS-${a.instrucao_id}`,
      tipoProduto: String(instrucao.tipo_produto || '-'),
      produtor,
      dataAgendamento: formatDate(a.data_agendamento),
      driver: String(a.nome_motorista || '-'),
      truck: String(a.placa_veiculo || '-'),
      quantidade: Math.max(0, Number(a.quantidade || 0)),
      quantidadeCarregada: Math.max(0, Number(a.quantidade_carregada || 0)),
      statusAprovacao: String(a.status_aprovacao || 'pendente'),
      instrucaoStatus: String(instrucao.status || '-'),
    };
  });

  const subtitle = document.getElementById('minhas-instrucoes-subtitle');
  if (subtitle) {
    subtitle.textContent = pessoaNome
      ? `Transportadora: ${pessoaNome} — ${state.rows.length} agendamento(s)`
      : `${state.rows.length} agendamento(s)`;
  }

  applyFilters();
  renderPage();
}

function handleClick(event) {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const action = target.dataset.action;

  if (action === 'filter-status') {
    state.filterStatus = target.dataset.value || 'todos';
    applyFilters();
    renderPage();
    return;
  }

  if (action === 'pag-prev') {
    state.page = Math.max(1, state.page - 1);
    renderTable();
    renderPagination();
    return;
  }

  if (action === 'pag-next') {
    const totalPages = Math.max(1, Math.ceil(state.filteredRows.length / state.perPage));
    state.page = Math.min(totalPages, state.page + 1);
    renderTable();
    renderPagination();
  }
}

function handleInput(event) {
  const page = event.currentTarget;
  const searchInput = page.querySelector('#minhas-instrucoes-search-input');
  if (event.target === searchInput || event.target.id === 'minhas-instrucoes-search-input') {
    state.search = event.target.value;
    applyFilters();
    renderTable();
    renderPagination();
  }
}

export function init() {
  const page = document.querySelector('.minhas-instrucoes-page');
  if (!page) return () => { };

  if (activeController) activeController.abort();
  activeController = new AbortController();

  state.rows = [];
  state.filteredRows = [];
  state.search = '';
  state.filterStatus = 'todos';
  state.page = 1;

  const searchWrap = document.getElementById('minhas-instrucoes-search');
  if (searchWrap) {
    searchWrap.innerHTML = `
      <div class="input-wrapper" style="position:relative;">
        <input id="minhas-instrucoes-search-input" class="input input--sm" type="text"
          placeholder="Buscar por instrução, produtor, motorista..." style="min-width:280px;" />
      </div>
    `;
  }

  const tbody = document.getElementById('minhas-instrucoes-tbody');
  if (tbody) tbody.innerHTML = '<tr class="minhas-instrucoes__loading-row"><td colspan="10">Carregando...</td></tr>';

  page.addEventListener('click', handleClick);
  page.addEventListener('input', handleInput);

  loadData().catch((err) => {
    console.error('[minhas-instrucoes] falha ao carregar', err);
    const tbody2 = document.getElementById('minhas-instrucoes-tbody');
    if (tbody2) tbody2.innerHTML = '<tr class="minhas-instrucoes__empty-row"><td colspan="10">Erro ao carregar dados.</td></tr>';
  });

  return () => {
    page.removeEventListener('click', handleClick);
    page.removeEventListener('input', handleInput);
    if (activeController) { activeController.abort(); activeController = null; }
  };
}
