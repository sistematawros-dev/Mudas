const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.sistemas.tawros.com.br:3000/api/v1';
let activeController = null;

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS_PT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const state = {
  rows: [],
  filteredRows: [],
  search: '',
  filterStatus: 'pendente',
  page: 1,
  perPage: 20,
  calYear: new Date().getFullYear(),
  calMonth: new Date().getMonth(),
};

function getUser() {
  try { return JSON.parse(sessionStorage.getItem('user') || '{}'); } catch { return {}; }
}

function getPodeAprovarRejeitar() {
  const user = getUser();
  return Boolean(user?.podeAprovarRejeitar);
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
  return `<span class="aprovacoes__badge aprovacoes__badge--${cls}">${text}</span>`;
}

function statusBadge(status) {
  if (status === 'aprovado') return badgeHtml('Aprovado', 'aprovado');
  if (status === 'recusado') return badgeHtml('Recusado', 'recusado');
  return badgeHtml('Pendente', 'pendente');
}

function buildDayMap() {
  const map = {};
  state.rows.forEach((row) => {
    if (!row.dataAgendamentoRaw) return;
    const d = new Date(row.dataAgendamentoRaw);
    if (Number.isNaN(d.getTime())) return;
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (!map[key]) map[key] = { pendente: 0, aprovado: 0, recusado: 0 };
    map[key][row.statusAprovacao] = (map[key][row.statusAprovacao] || 0) + 1;
  });
  return map;
}

function renderCalendar() {
  const titleEl = document.getElementById('aprovacoes-cal-title');
  const gridEl = document.getElementById('aprovacoes-calendar-grid');
  if (!titleEl || !gridEl) return;

  const { calYear: year, calMonth: month } = state;
  titleEl.textContent = `${MONTHS_PT[month]} ${year}`;

  const dayMap = buildDayMap();
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let html = WEEKDAYS.map((w) => `<div class="aprovacoes__cal-weekday">${w}</div>`).join('');

  for (let i = 0; i < firstDay; i++) {
    html += '<div class="aprovacoes__cal-day aprovacoes__cal-day--empty"></div>';
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${month}-${d}`;
    const counts = dayMap[key];
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const hasEvents = Boolean(counts);
    let cls = 'aprovacoes__cal-day';
    if (isToday) cls += ' aprovacoes__cal-day--today';
    if (hasEvents) cls += ' aprovacoes__cal-day--has-events';

    let dots = '';
    if (counts) {
      ['pendente', 'aprovado', 'recusado'].forEach((s) => {
        const n = Math.min(counts[s] || 0, 5);
        for (let j = 0; j < n; j++) dots += `<span class="aprovacoes__cal-dot aprovacoes__cal-dot--${s}" title="${counts[s]} ${s}(s)"></span>`;
      });
    }

    html += `
      <div class="${cls}">
        <span class="aprovacoes__cal-day-number">${d}</span>
        ${dots ? `<div class="aprovacoes__cal-dots">${dots}</div>` : ''}
      </div>
    `;
  }

  gridEl.innerHTML = html;
}

function applyFilters() {
  const searchTerm = normalizeText(state.search);
  state.filteredRows = state.rows.filter((row) => {
    if (state.filterStatus !== 'todos' && row.statusAprovacao !== state.filterStatus) return false;
    if (!searchTerm) return true;
    return (
      normalizeText(row.code).includes(searchTerm)
      || normalizeText(row.transportadora).includes(searchTerm)
      || normalizeText(row.driver).includes(searchTerm)
      || normalizeText(row.truck).includes(searchTerm)
    );
  });
  state.page = 1;
}

function renderTable() {
  const tbody = document.getElementById('aprovacoes-tbody');
  if (!tbody) return;

  const start = (state.page - 1) * state.perPage;
  const pageRows = state.filteredRows.slice(start, start + state.perPage);
  const podeAprovar = getPodeAprovarRejeitar();

  if (!pageRows.length) {
    tbody.innerHTML = '<tr class="aprovacoes__empty-row"><td colspan="9">Nenhum agendamento encontrado.</td></tr>';
    return;
  }

  tbody.innerHTML = pageRows.map((row) => {
    const isPendente = row.statusAprovacao === 'pendente';
    const approveDisabled = !podeAprovar || !isPendente ? 'disabled' : '';
    const rejectDisabled = !podeAprovar || !isPendente ? 'disabled' : '';
    return `
      <tr>
        <td><span class="aprovacoes__code">${row.code}</span></td>
        <td>${row.tipoProduto}</td>
        <td>${row.transportadora}</td>
        <td>${row.driver}</td>
        <td>${row.truck}</td>
        <td>${row.dataAgendamento}</td>
        <td>${row.quantidade > 0 ? `${row.quantidade.toLocaleString('pt-BR')} kg` : '-'}</td>
        <td>${statusBadge(row.statusAprovacao)}</td>
        <td>
          <div class="aprovacoes__actions-cell">
            <button class="aprovacoes__btn aprovacoes__btn--approve" data-action="approve" data-id="${row.id}" ${approveDisabled}>
              Aprovar
            </button>
            <button class="aprovacoes__btn aprovacoes__btn--reject" data-action="reject" data-id="${row.id}" ${rejectDisabled}>
              Recusar
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderPagination() {
  const container = document.getElementById('aprovacoes-pagination');
  if (!container) return;
  const totalPages = Math.max(1, Math.ceil(state.filteredRows.length / state.perPage));
  if (totalPages <= 1) { container.innerHTML = ''; return; }

  container.innerHTML = `
    <div class="aprovacoes__pag-inner">
      <button class="aprovacoes__pag-btn" data-action="pag-prev" ${state.page <= 1 ? 'disabled' : ''}>‹</button>
      <span class="aprovacoes__pag-info">Página ${state.page} de ${totalPages}</span>
      <button class="aprovacoes__pag-btn" data-action="pag-next" ${state.page >= totalPages ? 'disabled' : ''}>›</button>
    </div>
  `;
}

function renderFilters() {
  const container = document.getElementById('aprovacoes-filters');
  if (!container) return;
  const options = [
    { value: 'pendente', label: 'Pendentes' },
    { value: 'aprovado', label: 'Aprovados' },
    { value: 'recusado', label: 'Recusados' },
    { value: 'todos', label: 'Todos' },
  ];
  container.innerHTML = options.map((opt) => `
    <button class="aprovacoes__filter-btn ${state.filterStatus === opt.value ? 'aprovacoes__filter-btn--active' : ''}"
      data-action="filter-status" data-value="${opt.value}">${opt.label}</button>
  `).join('');
}

function updateSubtitle() {
  const subtitle = document.getElementById('aprovacoes-subtitle');
  if (!subtitle) return;
  const pendentes = state.rows.filter((r) => r.statusAprovacao === 'pendente').length;
  subtitle.textContent = `${pendentes} pendente(s) de aprovação — ${state.rows.length} total`;
}

function renderPage() {
  renderCalendar();
  renderFilters();
  renderTable();
  renderPagination();
  updateSubtitle();
}

async function loadData() {
  const [agendamentosRes, instrucoesRes] = await Promise.all([
    apiRequest('/instrucoes-agendamentos', { query: { limit: 2000 } }),
    apiRequest('/instrucoes', { query: { page: 1, limit: 500 } }),
  ]);

  const agendamentos = parseApiResponse(agendamentosRes).filter((a) => !a.deleted_at);
  const instrucoes = Object.fromEntries(parseApiResponse(instrucoesRes).map((i) => [String(i.id), i]));

  state.rows = agendamentos
    .filter((a) => {
      const instrucao = instrucoes[String(a.instrucao_id)];
      return instrucao && instrucao.status === 'aprovado';
    })
    .map((a) => {
      const instrucao = instrucoes[String(a.instrucao_id)] || {};
      return {
        id: String(a.id),
        instrucaoId: a.instrucao_id,
        code: instrucao.numero_instrucao || `INS-${a.instrucao_id}`,
        tipoProduto: String(instrucao.tipo_produto || '-'),
        transportadora: String(a.nome_transportadora || '-'),
        driver: String(a.nome_motorista || '-'),
        truck: String(a.placa_veiculo || '-'),
        dataAgendamento: formatDate(a.data_agendamento),
        dataAgendamentoRaw: a.data_agendamento || null,
        quantidade: Math.max(0, Number(a.quantidade || 0)),
        statusAprovacao: String(a.status_aprovacao || 'pendente'),
      };
    });

  applyFilters();
  renderPage();
}

async function handleAprovar(id) {
  if (!getPodeAprovarRejeitar()) return;
  const res = await apiRequest(`/instrucoes-agendamentos/${id}`, {
    method: 'PATCH',
    body: { status_aprovacao: 'aprovado' },
  });
  const agendamento = res?.data || res;
  const instrucaoId = agendamento?.instrucao_id || state.rows.find((r) => r.id === id)?.instrucaoId;
  if (instrucaoId) {
    await apiRequest(`/instrucoes/${instrucaoId}`, {
      method: 'PATCH',
      body: {
        patio_fase: 'aguardando_chegada',
        chegada_em: null,
        chamado_em: null,
        entrada_em: null,
        finalizado_em: null,
        ordem_fila: null,
      },
    }).catch((err) => console.warn('[aprovacoes] falha ao atualizar patio_fase', err));
  }
  const row = state.rows.find((r) => r.id === id);
  if (row) row.statusAprovacao = 'aprovado';
  applyFilters();
  renderPage();
}

async function handleRecusar(id) {
  if (!getPodeAprovarRejeitar()) return;
  await apiRequest(`/instrucoes-agendamentos/${id}`, {
    method: 'PATCH',
    body: { status_aprovacao: 'recusado' },
  });
  const row = state.rows.find((r) => r.id === id);
  if (row) row.statusAprovacao = 'recusado';
  applyFilters();
  renderPage();
}

function handleClick(event) {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const action = target.dataset.action;
  const id = target.dataset.id;

  if (action === 'cal-prev') {
    if (state.calMonth === 0) { state.calMonth = 11; state.calYear -= 1; }
    else state.calMonth -= 1;
    renderCalendar();
    return;
  }

  if (action === 'cal-next') {
    if (state.calMonth === 11) { state.calMonth = 0; state.calYear += 1; }
    else state.calMonth += 1;
    renderCalendar();
    return;
  }

  if (action === 'filter-status') {
    state.filterStatus = target.dataset.value || 'pendente';
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
    return;
  }

  if (action === 'approve' && id) {
    target.disabled = true;
    handleAprovar(id).catch((err) => {
      console.error('[aprovacoes] falha ao aprovar', err);
      alert(err?.message || 'Não foi possível aprovar.');
      target.disabled = false;
    });
    return;
  }

  if (action === 'reject' && id) {
    if (!confirm('Confirma recusar este agendamento?')) return;
    target.disabled = true;
    handleRecusar(id).catch((err) => {
      console.error('[aprovacoes] falha ao recusar', err);
      alert(err?.message || 'Não foi possível recusar.');
      target.disabled = false;
    });
  }
}

function handleInput(event) {
  if (event.target.id === 'aprovacoes-search-input') {
    state.search = event.target.value;
    applyFilters();
    renderTable();
    renderPagination();
  }
}

export function init() {
  const page = document.querySelector('.aprovacoes-page');
  if (!page) return () => { };

  if (activeController) activeController.abort();
  activeController = new AbortController();

  const now = new Date();
  state.rows = [];
  state.filteredRows = [];
  state.search = '';
  state.filterStatus = 'pendente';
  state.page = 1;
  state.calYear = now.getFullYear();
  state.calMonth = now.getMonth();

  const searchWrap = document.getElementById('aprovacoes-search');
  if (searchWrap) {
    searchWrap.innerHTML = `
      <div class="input-wrapper">
        <input id="aprovacoes-search-input" class="input input--sm" type="text"
          placeholder="Buscar por instrução, transportadora..." style="min-width:280px;" />
      </div>
    `;
  }

  const tbody = document.getElementById('aprovacoes-tbody');
  if (tbody) tbody.innerHTML = '<tr class="aprovacoes__loading-row"><td colspan="9">Carregando...</td></tr>';

  page.addEventListener('click', handleClick);
  page.addEventListener('input', handleInput);

  loadData().catch((err) => {
    console.error('[aprovacoes] falha ao carregar', err);
    const tbody2 = document.getElementById('aprovacoes-tbody');
    if (tbody2) tbody2.innerHTML = '<tr class="aprovacoes__empty-row"><td colspan="9">Erro ao carregar dados.</td></tr>';
  });

  return () => {
    page.removeEventListener('click', handleClick);
    page.removeEventListener('input', handleInput);
    if (activeController) { activeController.abort(); activeController = null; }
  };
}
