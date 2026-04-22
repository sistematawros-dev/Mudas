import * as Badge from '../../../components/badge/badge.js';

const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.sistemas.tawros.com.br:3000/api/v1';
let statusChart = null;
let apexChartsLoader = null;
let activeController = null;

async function loadApexCharts() {
  if (!apexChartsLoader) {
    apexChartsLoader = import('apexcharts').then((m) => m.default);
  }
  return apexChartsLoader;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

function getUser() {
  try { return JSON.parse(sessionStorage.getItem('user') || '{}'); } catch { return {}; }
}

function getAccessToken() { return sessionStorage.getItem('authToken') || ''; }
function getRefreshToken() { return sessionStorage.getItem('refreshToken') || ''; }

function setTokens(a, r) {
  if (a) sessionStorage.setItem('authToken', String(a));
  if (r) sessionStorage.setItem('refreshToken', String(r));
}

function parseApiResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (payload?.data && Array.isArray(payload.data.rows)) return payload.data.rows;
  return [];
}

async function refreshAccessToken() {
  const rt = getRefreshToken();
  if (!rt) return false;
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ refreshToken: rt }),
  });
  if (!res.ok) return false;
  const p = await res.json().catch(() => ({}));
  if (!p?.data?.accessToken) return false;
  setTokens(p.data.accessToken, p.data.refreshToken || rt);
  return true;
}

async function apiRequest(path, { method = 'GET', query, body, retry = true } = {}) {
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
    method, headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: activeController?.signal,
  });

  if (res.status === 401 && retry) {
    const ok = await refreshAccessToken().catch(() => false);
    if (ok) return apiRequest(path, { method, query, body, retry: false });
  }
  const p = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(p?.message || `Erro (${res.status})`);
  return p;
}

// ─── Perfil do usuário ────────────────────────────────────────────────────────

function getUserProfile() {
  const user = getUser();
  const isTawros = Number(user?.tawros ?? 0) === 1;
  const isAdmin = user?.roles?.some((r) => String(r).toLowerCase() === 'admin') ?? false;
  return {
    isTawros,
    isAdmin,
    pessoaId: user?.pessoaId || null,
    pessoaNome: String(user?.pessoaNome || '').trim(),
    podeNovaInstrucao: Boolean(user?.podeNovaInstrucao),
    podeAprovarRejeitar: Boolean(user?.podeAprovarRejeitar),
    podeConfigurarCarga: Boolean(user?.podeConfigurarCarga),
  };
}

function buildInstrucoesFilter(profile) {
  const query = { page: 1, limit: 500 };
  if (profile.isTawros || profile.isAdmin) return query;
  if (!profile.pessoaId) return query;
  if (profile.podeAprovarRejeitar && !profile.podeNovaInstrucao) {
    query['filter[produtor_id][eq]'] = profile.pessoaId;
  } else if (profile.podeNovaInstrucao && !profile.podeAprovarRejeitar) {
    query['filter[comprador_id][eq]'] = profile.pessoaId;
  }
  return query;
}

// ─── Helpers de tempo ────────────────────────────────────────────────────────

function diffMinutes(from, to) {
  if (!from || !to) return null;
  const d = new Date(to) - new Date(from);
  if (Number.isNaN(d) || d < 0) return null;
  return Math.round(d / 60000);
}

function formatMinutes(minutes) {
  if (minutes === null || minutes === undefined) return '-';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

function formatDate(value) {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('pt-BR');
}

function formatTime(value) {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

// ─── Mapeamento de fase ───────────────────────────────────────────────────────

const FASE_LABEL = {
  aguardando_futuro: 'Aguardando',
  aguardando_chegada: 'Aguardando Chegada',
  fila_patio: 'Na Fila',
  chamado: 'Chamado',
  carregando: 'Carregando',
  finalizado: 'Finalizado',
};

const FASE_BADGE = {
  aguardando_futuro: { variant: 'neutral', style: 'soft' },
  aguardando_chegada: { variant: 'warning', style: 'soft' },
  fila_patio: { variant: 'info', style: 'soft' },
  chamado: { variant: 'primary', style: 'soft' },
  carregando: { variant: 'success', style: 'soft' },
  finalizado: { variant: 'dark', style: 'soft' },
};

// ─── SVGs ────────────────────────────────────────────────────────────────────

const metricIcons = {
  truck: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 7H13V16H3V7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 10H17L20 13V16H13V10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7.5" cy="17.5" r="1.5" stroke="currentColor" stroke-width="2"/><circle cx="16.5" cy="17.5" r="1.5" stroke="currentColor" stroke-width="2"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none"><path d="M8 3V6M16 3V6M4 9H20M6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7C4 5.89543 4.89543 5 6 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  truckSmall: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 7H13V16H3V7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 10H17L20 13V16H13V10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7.5" cy="17.5" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="16.5" cy="17.5" r="1.5" stroke="currentColor" stroke-width="1.5"/></svg>`,
};

// ─── Render ───────────────────────────────────────────────────────────────────

function renderMetrics(container, data) {
  if (!container) return;
  const metrics = [
    {
      label: 'Agendados Hoje',
      value: data.agendadosHoje,
      icon: 'calendar',
      tone: 'info',
    },
    {
      label: 'Aguardando / Fila',
      value: data.aguardandoFila,
      icon: 'truck',
      tone: 'warning',
    },
    {
      label: 'Em Carregamento',
      value: data.emCarregamento,
      icon: 'truck',
      tone: 'success',
    },
    {
      label: 'Finalizados Hoje',
      value: data.finalizadosHoje,
      icon: 'check',
      tone: 'success',
    },
    {
      label: 'Tempo Médio Carregamento',
      value: formatMinutes(data.tempoMedioMinutos),
      icon: 'clock',
      tone: 'info',
    },
  ];

  container.innerHTML = metrics.map((m) => `
    <article class="patio-metric-card" aria-label="${m.label}">
      <div class="patio-metric-card__body">
        <span class="patio-metric-card__label">${m.label}</span>
        <strong class="patio-metric-card__value">${m.value}</strong>
      </div>
      <span class="patio-metric-card__icon patio-metric-card__icon--${m.tone}" aria-hidden="true">
        ${metricIcons[m.icon] || ''}
      </span>
    </article>
  `).join('');
}

function renderTruckList(container, trucks) {
  if (!container) return;

  if (!trucks.length) {
    container.innerHTML = '<p class="patio-overview__empty">Nenhum caminhão ativo no momento.</p>';
    return;
  }

  container.innerHTML = trucks.map((truck) => {
    const fase = truck.patio_fase || 'aguardando_chegada';
    const badgeCfg = FASE_BADGE[fase] || { variant: 'neutral', style: 'soft' };
    const badge = Badge.create({ text: FASE_LABEL[fase] || fase, ...badgeCfg, size: 'sm' });
    const tempoStr = truck.tempoCarregamento !== null
      ? `<span class="patio-truck-card__time">${metricIcons.clock} ${formatMinutes(truck.tempoCarregamento)}</span>`
      : '';

    return `
      <div class="patio-truck-card" aria-label="Caminhão ${truck.placa}">
        <span class="patio-truck-card__icon" aria-hidden="true">${metricIcons.truckSmall}</span>
        <div class="patio-truck-card__info">
          <strong class="patio-truck-card__code">${truck.code}</strong>
          <span class="patio-truck-card__meta">${truck.placa || '-'} &middot; ${truck.motorista || '-'}</span>
          <span class="patio-truck-card__meta">${truck.produtor} → ${truck.comprador}</span>
          ${truck.dataAgendamento ? `<span class="patio-truck-card__date">Agend: ${truck.dataAgendamento}</span>` : ''}
        </div>
        <div class="patio-truck-card__right">
          ${badge}
          ${tempoStr}
        </div>
      </div>
    `;
  }).join('');
}

function renderStatusChart(container, statusCounts, total) {
  if (!container) return;
  if (statusChart) {
    try { statusChart.destroy(); } catch { /* ignore */ }
    statusChart = null;
  }
  if (total === 0) {
    container.innerHTML = '<p style="text-align:center;color:var(--color-content-secondary);padding:var(--space-4);">Sem instrucoes</p>';
    return;
  }
  loadApexCharts().then((ApexCharts) => {
    const series = [statusCounts.pendente, statusCounts.aprovado, statusCounts.finalizado, statusCounts.recusado];
    const labels = ['Pendente', 'Aprovado', 'Finalizado', 'Recusado'];
    const colors = ['#ff9f1c', '#18a957', '#6c757d', '#d92d20'];
    container.innerHTML = '';
    statusChart = new ApexCharts(container, {
      chart: { type: 'donut', height: 220, toolbar: { show: false }, fontFamily: 'Archivo, sans-serif', sparkline: { enabled: true } },
      series, labels, colors,
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: { width: 0 },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: '72%',
            labels: {
              show: true,
              name: { show: false },
              value: { show: false },
              total: { show: true, showAlways: true, label: 'Total', formatter: () => String(total) },
            },
          },
        },
      },
      tooltip: { y: { formatter: (v) => String(v) } },
    });
    statusChart.render();
  }).catch(() => {
    container.innerHTML = `<p style="text-align:center;padding:8px;font-size:12px;">Pendente: ${statusCounts.pendente} | Aprovado: ${statusCounts.aprovado} | Finalizado: ${statusCounts.finalizado}</p>`;
  });
}

function renderStatusLegend(container, statusCounts) {
  if (!container) return;
  const items = [
    { label: `Pendente (${statusCounts.pendente})`, color: '#ff9f1c' },
    { label: `Aprovado (${statusCounts.aprovado})`, color: '#18a957' },
    { label: `Finalizado (${statusCounts.finalizado})`, color: '#6c757d' },
    { label: `Recusado (${statusCounts.recusado})`, color: '#d92d20' },
  ];
  container.innerHTML = items.map((item) => `
    <span class="patio-status-legend__item">
      <span class="patio-status-legend__dot" style="background:${item.color}"></span>
      <span>${item.label}</span>
    </span>
  `).join('');
}

// ─── Lógica de dados ──────────────────────────────────────────────────────────

function buildViewData(instrucoes, agendamentos, pessoas) {
  const today = todayIso();
  const profile = getUserProfile();

  // Para transportadora: filtrar instrucoes por nome_transportadora em agendamentos
  let instrucoesVisiveis = instrucoes;
  if (profile.podeConfigurarCarga && !profile.isTawros && !profile.isAdmin && profile.pessoaNome) {
    const norm = (v) => String(v || '').toLowerCase().trim();
    const instrucaoIdsComTransportadora = new Set(
      agendamentos
        .filter((a) => norm(a.nome_transportadora) === norm(profile.pessoaNome))
        .map((a) => String(a.instrucao_id)),
    );
    instrucoesVisiveis = instrucoes.filter((i) => instrucaoIdsComTransportadora.has(String(i.id)));
  }

  const instrucoesMap = Object.fromEntries(instrucoesVisiveis.map((i) => [String(i.id), i]));
  const agendamentosVisiveis = agendamentos.filter((a) => !a.deleted_at && instrucoesMap[String(a.instrucao_id)]);

  // Métricas
  const agendadosHoje = agendamentosVisiveis.filter((a) => {
    const d = String(a.data_agendamento || '').slice(0, 10);
    return d === today;
  }).length;

  const instrucoesAtivas = instrucoesVisiveis.filter((i) => i.patio_fase && i.patio_fase !== 'finalizado' && i.status !== 'finalizado');
  const aguardandoFila = instrucoesAtivas.filter((i) => ['aguardando_chegada', 'fila_patio', 'chamado', 'aguardando_futuro'].includes(i.patio_fase)).length;
  const emCarregamento = instrucoesAtivas.filter((i) => i.patio_fase === 'carregando').length;

  const finalizadosHoje = instrucoesVisiveis.filter((i) => {
    if (!i.finalizado_em) return false;
    return String(i.finalizado_em).slice(0, 10) === today;
  }).length;

  // Tempo médio de carregamento (chegada_em → finalizado_em) dos finalizados
  const tempos = instrucoesVisiveis
    .filter((i) => i.chegada_em && i.finalizado_em)
    .map((i) => diffMinutes(i.chegada_em, i.finalizado_em))
    .filter((t) => t !== null && t > 0);
  const tempoMedioMinutos = tempos.length > 0
    ? Math.round(tempos.reduce((s, t) => s + t, 0) / tempos.length)
    : null;

  // Status counts
  const statusCounts = { pendente: 0, aprovado: 0, finalizado: 0, recusado: 0 };
  instrucoesVisiveis.forEach((i) => {
    const s = String(i.status || 'pendente');
    if (s in statusCounts) statusCounts[s]++;
  });
  const totalInstrucoes = instrucoesVisiveis.length;

  // Lista de caminhões
  const trucks = instrucoesVisiveis
    .filter((i) => i.patio_fase || i.status === 'finalizado')
    .map((i) => {
      const tempoCarregamento = diffMinutes(i.chegada_em, i.finalizado_em);
      // busca agendamento para pegar placa/motorista se não estiver na instrucao
      const agend = agendamentosVisiveis.find((a) => String(a.instrucao_id) === String(i.id));
      return {
        id: String(i.id),
        code: i.numero_instrucao || `INS-${i.id}`,
        placa: i.placa_veiculo || agend?.placa_veiculo || '-',
        motorista: i.nome_motorista || agend?.nome_motorista || '-',
        produtor: pessoas[String(i.produtor_id)] || i.nome_vendedor_produtor || '-',
        comprador: pessoas[String(i.comprador_id)] || '-',
        patio_fase: i.patio_fase || (i.status === 'finalizado' ? 'finalizado' : 'aguardando_chegada'),
        dataAgendamento: formatDate(i.data_agendamento || agend?.data_agendamento),
        chegadaEm: i.chegada_em ? formatTime(i.chegada_em) : null,
        finalizadoEm: i.finalizado_em ? formatTime(i.finalizado_em) : null,
        tempoCarregamento,
      };
    })
    .sort((a, b) => {
      const order = { carregando: 0, chamado: 1, fila_patio: 2, aguardando_chegada: 3, aguardando_futuro: 4, finalizado: 5 };
      return (order[a.patio_fase] ?? 9) - (order[b.patio_fase] ?? 9);
    });

  return { agendadosHoje, aguardandoFila, emCarregamento, finalizadosHoje, tempoMedioMinutos, statusCounts, totalInstrucoes, trucks };
}

// ─── Carrega dados e renderiza ────────────────────────────────────────────────

async function loadAndRender() {
  const profile = getUserProfile();
  const instrucoesQuery = buildInstrucoesFilter(profile);

  const [instrucoesRes, agendamentosRes, pessoasRes] = await Promise.all([
    apiRequest('/instrucoes', { query: instrucoesQuery }),
    apiRequest('/instrucoes-agendamentos', { query: { limit: 2000 } }).catch(() => ({ data: [] })),
    apiRequest('/pessoas-empresas', { query: { limit: 500 } }).catch(() => ({ data: [] })),
  ]);

  const instrucoes = parseApiResponse(instrucoesRes);
  const agendamentos = parseApiResponse(agendamentosRes);
  const pessoas = parseApiResponse(pessoasRes).reduce((acc, row) => {
    const nome = row?.razao_social || row?.nome_fantasia || row?.nome_responsavel || `Pessoa ${row?.id}`;
    acc[String(row.id)] = nome;
    return acc;
  }, {});

  const data = buildViewData(instrucoes, agendamentos, pessoas);

  const metricsContainer = document.getElementById('patio-overview-metrics');
  const truckListContainer = document.getElementById('patio-appointments-list');
  const statusChartContainer = document.getElementById('patio-status-chart');
  const statusLegendContainer = document.getElementById('patio-status-legend');

  renderMetrics(metricsContainer, data);
  renderTruckList(truckListContainer, data.trucks);
  renderStatusChart(statusChartContainer, data.statusCounts, data.totalInstrucoes);
  renderStatusLegend(statusLegendContainer, data.statusCounts);
}

// ─── Init ─────────────────────────────────────────────────────────────────────

export function init() {
  if (activeController) activeController.abort();
  activeController = new AbortController();

  // Skeleton enquanto carrega
  const metricsContainer = document.getElementById('patio-overview-metrics');
  if (metricsContainer) {
    metricsContainer.innerHTML = Array(5).fill(
      '<article class="patio-metric-card"><div class="patio-metric-card__body"><span class="patio-metric-card__label">...</span><strong class="patio-metric-card__value">-</strong></div></article>',
    ).join('');
  }

  loadAndRender().catch((err) => {
    console.error('[controle-patio/visao-geral] falha ao carregar', err);
  });

  const todayButton = document.querySelector('[data-action="today"]');
  const handleToday = () => {
    loadAndRender().catch(() => { });
  };
  todayButton?.addEventListener('click', handleToday);

  return () => {
    todayButton?.removeEventListener('click', handleToday);
    if (statusChart) {
      try { statusChart.destroy(); } catch { /* ignore */ }
      statusChart = null;
    }
    if (activeController) { activeController.abort(); activeController = null; }
  };
}
