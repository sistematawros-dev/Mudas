import * as Badge from '../../../components/badge/badge.js';
import * as Button from '../../../components/button/button.js';
import * as Input from '../../../components/input/input.js';
import { initInstructionDetailsDrawer } from './instruction-details-drawer.js';
import { initControlePatioTabs, renderControlePatioTabs } from '../shared/controle-patio-tabs.js';
import {
  initialInstructions,
  kanbanColumns,
  scheduleFilterOptions,
} from './instrucoes.data.js';

const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.sistema.tawros.com.br/api/v1';
let activeController = null;

function getPodeNovaInstrucao() {
  try {
    const raw = sessionStorage.getItem('user');
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed?.podeNovaInstrucao);
  } catch {
    return false;
  }
}

function getPodeAprovarRejeitar() {
  try {
    const raw = sessionStorage.getItem('user');
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed?.podeAprovarRejeitar);
  } catch {
    return false;
  }
}


const calendarIcon = `
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/>
    <path d="M2 6H14M5 1V4M11 1V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
`;

const viewIcons = {
  kanban: `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2.25" y="2.25" width="4.5" height="4.5" rx="0.75" stroke="currentColor" stroke-width="1.5"/>
      <rect x="9.25" y="2.25" width="4.5" height="4.5" rx="0.75" stroke="currentColor" stroke-width="1.5"/>
      <rect x="2.25" y="9.25" width="4.5" height="4.5" rx="0.75" stroke="currentColor" stroke-width="1.5"/>
      <rect x="9.25" y="9.25" width="4.5" height="4.5" rx="0.75" stroke="currentColor" stroke-width="1.5"/>
    </svg>
  `,
  list: `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M4 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M4 12H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="2.25" cy="4" r="0.75" fill="currentColor"/>
      <circle cx="2.25" cy="8" r="0.75" fill="currentColor"/>
      <circle cx="2.25" cy="12" r="0.75" fill="currentColor"/>
    </svg>
  `,
};

const eyeIcon = `
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1.5 8C1.5 8 4 3.5 8 3.5C12 3.5 14.5 8 14.5 8C14.5 8 12 12.5 8 12.5C4 12.5 1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="8" cy="8" r="1.75" stroke="currentColor" stroke-width="1.5"/>
  </svg>
`;

const itemIcons = {
  product: `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="5.25" stroke="currentColor" stroke-width="1.5"/>
      <path d="M8 5.25V10.75M5.25 8H10.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,
  block: `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/>
      <path d="M5.5 6.25H10.5M5.5 9.25H8.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,
  producer: `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="5.25" r="2.25" stroke="currentColor" stroke-width="1.5"/>
      <path d="M3.25 13C3.25 10.6528 5.15279 8.75 7.5 8.75H8.5C10.8472 8.75 12.75 10.6528 12.75 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,
};

const statusBadgeConfig = {
  pending: { variant: 'warning', style: 'soft' },
  approved: { variant: 'success', style: 'soft' },
  finished: { variant: 'dark', style: 'soft' },
  rejected: { variant: 'error', style: 'soft' },
};

const state = {
  viewMode: 'list',
  filters: {
    search: '',
    dateField: 'schedule-date',
    dateRange: '',
  },
  instructions: initialInstructions.map((item) => ({ ...item, documents: [...(item.documents || [])] })),
};

let detailsDrawer = null;

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

function parseApiResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (payload?.data && Array.isArray(payload.data.rows)) return payload.data.rows;
  return [];
}

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) return false;

  const payload = await response.json().catch(() => ({}));
  const data = payload?.data || {};
  if (!data.accessToken) return false;

  setTokens(data.accessToken, data.refreshToken || refreshToken);
  return true;
}

async function apiRequest(path, { method = 'GET', query, body, auth = true, retryOnUnauthorized = true } = {}) {
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
  if (auth) {
    const token = getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    const filialId = sessionStorage.getItem('filialId');
    if (filialId) headers['X-Filial-Id'] = filialId;
  }

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: activeController?.signal,
  });

  if (response.status === 401 && auth && retryOnUnauthorized) {
    const refreshed = await refreshAccessToken().catch(() => false);
    if (refreshed) {
      return apiRequest(path, { method, query, body, auth, retryOnUnauthorized: false });
    }
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.message || `Falha na requisio (${response.status})`);
  }

  return payload;
}

function statusToUi(status) {
  if (status === 'pendente') return { status: 'pending', statusLabel: 'Pendente' };
  if (status === 'aprovado') return { status: 'approved', statusLabel: 'Aprovado' };
  if (status === 'finalizado') return { status: 'finished', statusLabel: 'Finalizado' };
  if (status === 'recusado') return { status: 'rejected', statusLabel: 'Recusado' };
  return { status: 'pending', statusLabel: 'Pendente' };
}

function formatDate(dateValue) {
  if (!dateValue) return '-';
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return String(dateValue);
  return parsed.toLocaleDateString('pt-BR');
}

function toKg(quantidade, unidade) {
  const u = String(unidade || '').trim().toLowerCase();
  const q = Number(quantidade || 0);
  if (u === 'toneladas') return q * 1000;
  if (u === 'arrobas') return q * 15;
  if (u === 'sacas') return q * 60;
  return q; // quilogramas ou desconhecido
}

function formatInstructionUnit(tipoProduto, unidade) {
  const produto = String(tipoProduto || '').toLowerCase();
  if (produto === 'pluma') return 'Fardos';
  const raw = String(unidade || '').trim();
  if (!raw) return 'Unidades';
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function getCurrentUserPessoaNome() {
  try {
    const raw = sessionStorage.getItem('user');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.pessoaNome || null;
  } catch { return null; }
}

function isTransportadoraUser() {
  try {
    const raw = sessionStorage.getItem('user');
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    const isAdmin = parsed?.roles?.some((r) => String(r).toLowerCase() === 'admin') ?? false;
    const isTawros = Number(parsed?.tawros ?? 0) === 1;
    return !isAdmin && !isTawros && Boolean(parsed?.podeConfigurarCarga);
  } catch { return false; }
}

function mapInstructionRow(row, lookups = {}, transportesByInstrucao = {}, blocosByInstrucao = {}) {
  const buyer = lookups.pessoas?.[String(row.comprador_id)] || '-';
  const producer = lookups.pessoas?.[String(row.produtor_id)] || row.nome_vendedor_produtor || '-';
  const branch = lookups.filiais?.[String(row.filial_id)] || '-';
  const uiStatus = statusToUi(row.status);
  const transportes = transportesByInstrucao[String(row.id)] || [];
  const blocos = blocosByInstrucao[String(row.id)] || [];
  const isPlumaRow = String(row.tipo_produto || '').toLowerCase() === 'pluma';
  const unidade = isPlumaRow ? 'Fardos' : 'Quilogramas';

  const pessoaNome = getCurrentUserPessoaNome();
  const isTransportadora = isTransportadoraUser();
  const normalizedPessoaNome = pessoaNome ? pessoaNome.toLowerCase().trim() : null;

  let quantidadeFinal;
  let transportesMapped;

  if (isPlumaRow) {
    // Para pluma: blocos agrupados por transportadora
    const mesBlocos = isTransportadora && normalizedPessoaNome
      ? blocos.filter((b) => String(b.nome_transportadora || '').toLowerCase().trim() === normalizedPessoaNome)
      : blocos;
    const qtdFardos = mesBlocos.reduce((sum, b) => sum + Math.max(0, Number(b.quantidade_fardos || 0)), 0);
    quantidadeFinal = qtdFardos || Number(row.quantidade_total || 0);

    // Agrupa por transportadora para o drawer
    const gruposTransp = {};
    (isTransportadora && normalizedPessoaNome ? mesBlocos : blocos).forEach((b) => {
      const nome = b.nome_transportadora || 'Transportadora';
      if (!gruposTransp[nome]) gruposTransp[nome] = 0;
      gruposTransp[nome] += Math.max(0, Number(b.quantidade_fardos || 0));
    });
    transportesMapped = Object.entries(gruposTransp).map(([nome, qtd]) => ({
      name: nome,
      quantidade: qtd,
      unidade: 'Fardos',
      quantityLabel: `${qtd.toLocaleString('pt-BR')} Fardos`,
    }));
  } else {
    // Para kg: filtrar por transportadora
    const meusTransportes = isTransportadora && normalizedPessoaNome
      ? transportes.filter((t) => String(t.nome_transportadora || '').toLowerCase().trim() === normalizedPessoaNome)
      : transportes;

    if (isTransportadora && normalizedPessoaNome) {
      const meuTransporte = meusTransportes[0];
      quantidadeFinal = meuTransporte ? Math.max(0, Number(meuTransporte.quantidade || 0)) : 0;
    } else {
      quantidadeFinal = meusTransportes.length
        ? meusTransportes.reduce((sum, t) => sum + toKg(t.quantidade, t.unidade), 0)
        : Number(row.quantidade_total || 0);
    }

    transportesMapped = meusTransportes.map((t) => ({
      name: t.nome_transportadora || 'Transportadora',
      quantidade: Number(t.quantidade || 0),
      unidade: formatInstructionUnit(row.tipo_produto, t.unidade),
      quantityLabel: `${Number(t.quantidade || 0).toLocaleString('pt-BR')} ${formatInstructionUnit(row.tipo_produto, t.unidade)}`,
    }));
  }

  // Saldos
  const qtdAgendada = Math.max(0, Number(row.quantidade_agendada || 0));
  const qtdCarregada = Math.max(0, Number(row.quantidade_real || 0));
  const qtdPendente = Math.max(0, quantidadeFinal - qtdAgendada - qtdCarregada);

  const saldosLabel = !isPlumaRow ? [
    `Total: ${quantidadeFinal.toLocaleString('pt-BR')} ${unidade}`,
    `Agendado: ${qtdAgendada.toLocaleString('pt-BR')}`,
    `Pendente: ${qtdPendente.toLocaleString('pt-BR')}`,
    `Carregado: ${qtdCarregada.toLocaleString('pt-BR')}`,
  ].join(' | ') : null;

  return {
    id: String(row.id),
    code: row.numero_instrucao || `INS-${row.id}`,
    secondaryCode: row.numero_contrato || '-',
    status: uiStatus.status,
    statusLabel: uiStatus.statusLabel,
    createdAt: `Criado em ${formatDate(row.created_at)}`,
    buyer,
    producer,
    product: `${String(row.tipo_produto || '-').toUpperCase()} (${quantidadeFinal.toLocaleString('pt-BR')} ${unidade})`,
    productCompact: `${String(row.tipo_produto || '-').toUpperCase()} ${quantidadeFinal.toLocaleString('pt-BR')} ${unidade}`,
    blocks: '-',
    createdAtDetailed: `Criado em ${formatDate(row.created_at)}`,
    producerDocument: row.produtor_documento || '-',
    branch,
    productName: String(row.tipo_produto || '-').toUpperCase(),
    carrier: transportesMapped.length ? transportesMapped[0].name : '-',
    quantityLabel: transportesMapped.length ? transportesMapped[0].quantityLabel : `${quantidadeFinal.toLocaleString('pt-BR')} ${unidade}`,
    transportes: transportesMapped,
    documents: [],
    qtdTotal: quantidadeFinal,
    qtdAgendada,
    qtdPendente,
    qtdCarregada,
    unidade,
    saldosLabel,
    isPlumaRow,
  };
}

function buildInstrucoesQuery() {
  // Escopo de visibilidade gerenciado pela API via resolveAllowedInstrucaoIds
  return { page: 1, limit: 200, sort: 'created_at', order: 'desc' };
}

async function loadInstructions() {
  const [instructionsRes, pessoasRes, filiaisRes, transportesRes, blocosRes] = await Promise.all([
    apiRequest('/instrucoes', { query: buildInstrucoesQuery() }),
    apiRequest('/lookups/pessoas-empresas', { query: { limit: 500 } }),
    apiRequest('/lookups/filiais', { query: { limit: 200 } }),
    apiRequest('/instrucoes-transportes', { query: { page: 1, limit: 5000 } }).catch(() => ({ data: [] })),
    apiRequest('/instrucoes-blocos', { query: { page: 1, limit: 5000 } }).catch(() => ({ data: [] })),
  ]);

  const pessoas = parseApiResponse(pessoasRes).reduce((acc, row) => {
    const nome = row?.razao_social || row?.nome_fantasia || row?.nome_responsavel || row?.cpf_cnpj || `Pessoa ${row?.id ?? ''}`;
    if (row?.id !== undefined) acc[String(row.id)] = nome;
    return acc;
  }, {});

  const filiais = parseApiResponse(filiaisRes).reduce((acc, row) => {
    if (row?.id !== undefined) acc[String(row.id)] = row?.nome || `Filial ${row?.id ?? ''}`;
    return acc;
  }, {});

  const rows = parseApiResponse(instructionsRes);
  const transportesByInstrucao = parseApiResponse(transportesRes).reduce((acc, row) => {
    const instrucaoId = String(row?.instrucao_id || '');
    if (!instrucaoId) return acc;
    if (!acc[instrucaoId]) acc[instrucaoId] = [];
    acc[instrucaoId].push(row);
    return acc;
  }, {});
  const blocosByInstrucao = parseApiResponse(blocosRes).reduce((acc, row) => {
    const instrucaoId = String(row?.instrucao_id || '');
    if (!instrucaoId) return acc;
    if (!acc[instrucaoId]) acc[instrucaoId] = [];
    acc[instrucaoId].push(row);
    return acc;
  }, {});
  state.instructions = rows.map((row) => mapInstructionRow(row, { pessoas, filiais }, transportesByInstrucao, blocosByInstrucao));
}

async function updateInstructionStatus(id, action) {
  const isMockInstruction = !/^\d+$/.test(String(id || ''));
  if (isMockInstruction) {
    state.instructions = state.instructions.map((item) => {
      if (String(item.id) !== String(id)) return item;
      let nextStatus = item.status;
      let nextLabel = item.statusLabel;
      if (action === 'approve') {
        nextStatus = 'approved';
        nextLabel = 'Aprovado';
      } else if (action === 'reject') {
        nextStatus = 'rejected';
        nextLabel = 'Recusado';
      } else if (action === 'finish') {
        nextStatus = 'finished';
        nextLabel = 'Finalizado';
      } else if (action === 'reopen') {
        nextStatus = 'pending';
        nextLabel = 'Pendente';
      }
      return { ...item, status: nextStatus, statusLabel: nextLabel };
    });
    renderInstructionsContent();
    return;
  }

  let nextStatus = null;
  if (action === 'approve') nextStatus = 'aprovado';
  if (action === 'reject') nextStatus = 'recusado';
  if (action === 'finish') nextStatus = 'finalizado';
  if (action === 'reopen') nextStatus = 'pendente';
  if (!nextStatus) return;

  await apiRequest(`/instrucoes/${id}`, { method: 'PATCH', body: { status: nextStatus } });
  await loadInstructions();
  renderInstructionsContent();
}

function renderTopActions() {
  const container = document.getElementById('patio-instructions-top-actions');
  if (!container) return;

  const viewButtons = ['kanban', 'list'].map((mode) => `
    <button
      type="button"
      class="patio-instructions__view-btn${state.viewMode === mode ? ' is-active' : ''}"
      data-view-mode="${mode}"
      aria-pressed="${String(state.viewMode === mode)}"
      aria-label="${mode === 'kanban' ? 'Visualizao kanban' : 'Visualizao em lista'}"
    >
      ${viewIcons[mode]}
    </button>
  `).join('');

  container.innerHTML = `
    <div class="patio-instructions__view-toggle" aria-label="Alternar visualizao">
      ${viewButtons}
    </div>
    ${getPodeNovaInstrucao() ? Button.create({ text: 'Nova Instrução', variant: 'primary', size: 'sm' }).replace('<button ', '<button data-action="new-instruction" ') : ''}
  `;
}

function renderFilters() {
  const container = document.getElementById('patio-instructions-filters');
  if (!container) return;

  container.innerHTML = `
    <div class="patio-instructions__filter patio-instructions__filter--search">
      ${Input.createSearch({
    id: 'instructions-search',
    placeholder: 'Buscar Comprador, Produto, Produtor',
    value: state.filters.search,
  })}
    </div>
    <div class="patio-instructions__filter patio-instructions__filter--date-field">
      ${Input.createSelect({
    id: 'instructions-date-field',
    value: state.filters.dateField,
    items: scheduleFilterOptions,
    placeholder: '',
  })}
    </div>
    <div class="patio-instructions__filter patio-instructions__filter--date-range">
      ${Input.create({
    id: 'instructions-date-range',
    placeholder: 'Data inicial ? Data final',
    value: state.filters.dateRange,
    iconRight: calendarIcon,
  })}
    </div>
  `;
}

function renderTabs() {
  const container = document.getElementById('patio-instructions-tabs');
  if (!container) return;
  renderControlePatioTabs(container, 'instructions');
}

function getVisibleInstructions() {
  const query = state.filters.search.trim().toLowerCase();
  return state.instructions.filter((item) => {
    if (!query) return true;
    return [item.code, item.secondaryCode, item.buyer, item.producer, item.product, item.productCompact, item.blocks]
      .join(' ')
      .toLowerCase()
      .includes(query);
  });
}

function getInstructionButtons(item, mode = 'list') {
  const buttons = [];

  if (isTransportadoraUser()) return buttons;

  if (item.status === 'pending' && getPodeAprovarRejeitar()) {
    buttons.push({ key: 'reject', text: 'Rejeitar', variant: 'error', style: 'outline' });
    buttons.push({ key: 'approve', text: 'Aprovar', variant: 'success', style: 'solid' });
  } else if (item.status === 'approved') {
    buttons.push({ key: 'finish', text: 'Finalizar', variant: 'error', style: 'outline' });
    buttons.push({ key: 'reopen', text: 'Reabrir', variant: 'dark', style: 'outline' });
  } else if (item.status === 'finished') {
    buttons.push({ key: 'reopen', text: 'Reabrir', variant: 'dark', style: 'outline' });
  }

  return buttons.map((button) => {
    const html = Button.create({
      text: button.text,
      variant: button.variant,
      style: button.style,
      size: 'sm',
    });

    return html.replace('<button ', `<button data-instruction-action="${button.key}" data-instruction-id="${item.id}" data-action-mode="${mode}" `);
  }).join('');
}

function renderListView(items) {
  return `
    <div class="patio-instructions__list patio-instructions__list--list">
      ${items.map((item) => {
    const badgeConfig = statusBadgeConfig[item.status] || statusBadgeConfig.pending;
    return `
          <article class="patio-instruction-card" data-instruction-id="${item.id}">
            <div class="patio-instruction-card__summary">
              <div class="patio-instruction-card__header-line">
                <h2 class="patio-instruction-card__code">${item.code}</h2>
                ${Badge.create({ text: item.statusLabel, ...badgeConfig, size: 'sm' })}
                <span class="patio-instruction-card__date">${item.createdAt}</span>
              </div>

              <dl class="patio-instruction-card__meta">
                <div class="patio-instruction-card__meta-item">
                  <dt>Comprador:</dt>
                  <dd>${item.buyer}</dd>
                </div>
                <div class="patio-instruction-card__meta-item">
                  <dt>Produtor:</dt>
                  <dd>${item.producer}</dd>
                </div>
                <div class="patio-instruction-card__meta-item patio-instruction-card__meta-item--icon">
                  <dt>${itemIcons.product}<span>Produto:</span></dt>
                  <dd>${item.product}</dd>
                </div>
                <div class="patio-instruction-card__meta-item">
                  <dt>Agendado:</dt><dd>${item.qtdAgendada.toLocaleString('pt-BR')} ${item.unidade}</dd>
                </div>
                <div class="patio-instruction-card__meta-item">
                  <dt>Pendente:</dt><dd>${item.qtdPendente.toLocaleString('pt-BR')} ${item.unidade}</dd>
                </div>
                <div class="patio-instruction-card__meta-item">
                  <dt>Carregado:</dt><dd>${item.qtdCarregada.toLocaleString('pt-BR')} ${item.unidade}</dd>
                </div>
              </dl>
            </div>

            <button type="button" class="patio-instruction-card__details" data-action="details" data-instruction-id="${item.id}">
              <span class="patio-instruction-card__details-icon">${eyeIcon}</span>
              <span>Ver Detalhes</span>
            </button>

            <div class="patio-instruction-card__actions">
              ${getInstructionButtons(item, 'list')}
            </div>
          </article>
        `;
  }).join('')}
    </div>
  `;
}

function renderKanbanCard(item) {
  const badgeConfig = statusBadgeConfig[item.status] || statusBadgeConfig.pending;
  return `
    <article class="patio-instruction-kanban-card" data-instruction-id="${item.id}">
      <div class="patio-instruction-kanban-card__topbar">
        <div>
          <h3 class="patio-instruction-kanban-card__code">${item.code}</h3>
          <div class="patio-instruction-kanban-card__secondary">${item.secondaryCode}</div>
        </div>
        <button type="button" class="patio-instruction-kanban-card__details" data-action="details" data-instruction-id="${item.id}" aria-label="Ver detalhes de ${item.code}">
          ${eyeIcon}
        </button>
      </div>

      <div class="patio-instruction-kanban-card__body">
        <div class="patio-instruction-kanban-card__line patio-instruction-kanban-card__line--producer">
          <span class="patio-instruction-kanban-card__icon">${itemIcons.producer}</span>
          <span>${item.producer}</span>
        </div>
        <div class="patio-instruction-kanban-card__line">
          <span class="patio-instruction-kanban-card__icon">${itemIcons.product}</span>
          <span>${item.productCompact}</span>
        </div>
        <div class="patio-instruction-kanban-card__line" style="font-size:0.75rem;color:var(--color-content-secondary);flex-direction:column;align-items:flex-start;gap:2px;">
          <span>Agendado: <b>${item.qtdAgendada.toLocaleString('pt-BR')}</b> | Pendente: <b>${item.qtdPendente.toLocaleString('pt-BR')}</b> | Carregado: <b>${item.qtdCarregada.toLocaleString('pt-BR')}</b> ${item.unidade}</span>
        </div>
      </div>

      <div class="patio-instruction-kanban-card__badge">
        ${Badge.create({ text: item.statusLabel, ...badgeConfig, size: 'sm' })}
      </div>

      <div class="patio-instruction-kanban-card__actions${item.status === 'finished' ? ' patio-instruction-kanban-card__actions--single' : ''}">
        ${getInstructionButtons(item, 'kanban')}
      </div>
    </article>
  `;
}

function renderKanbanView(items) {
  const itemsByStatus = kanbanColumns.map((column) => ({
    ...column,
    items: items.filter((item) => item.status === column.id),
  }));

  return `
    <div class="patio-instructions__kanban">
      ${itemsByStatus.map((column) => `
        <section class="patio-instructions-column" aria-labelledby="patio-instructions-column-${column.id}">
          <header class="patio-instructions-column__header">
            <h2 class="patio-instructions-column__title" id="patio-instructions-column-${column.id}">${column.label}</h2>
            <span class="patio-instructions-column__count">${column.items.length}</span>
          </header>
          <div class="patio-instructions-column__body">
            ${column.items.map((item) => renderKanbanCard(item)).join('')}
          </div>
        </section>
      `).join('')}
    </div>
  `;
}

function renderInstructionsContent() {
  const content = document.getElementById('patio-instructions-content');
  if (!content) return;

  const items = getVisibleInstructions();
  content.innerHTML = state.viewMode === 'kanban' ? renderKanbanView(items) : renderListView(items);
}

async function handlePageClick(event) {
  const newInstructionButton = event.target.closest('[data-action="new-instruction"]');
  if (newInstructionButton) {
    window.location.hash = '#/controle-patio/nova-instrucao';
    return;
  }

  const viewButton = event.target.closest('[data-view-mode]');
  if (viewButton) {
    state.viewMode = viewButton.dataset.viewMode;
    renderTopActions();
    renderInstructionsContent();
    return;
  }

  const instructionAction = event.target.closest('[data-instruction-action]');
  if (instructionAction) {
    const itemId = instructionAction.dataset.instructionId;
    const action = instructionAction.dataset.instructionAction;
    if (!itemId || !action) return;

    try {
      await updateInstructionStatus(itemId, action);
    } catch (error) {
      console.error('[controle-patio/instrucoes] falha ao atualizar status', { itemId, action, error });
    }
    return;
  }

  const detailsButton = event.target.closest('[data-action="details"]');
  if (detailsButton) {
    const item = state.instructions.find((instruction) => instruction.id === detailsButton.dataset.instructionId);
    if (!item || !detailsDrawer) return;
    detailsDrawer.open(item, detailsButton);
  }
}

function handleInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;

  if (target.id === 'instructions-search') {
    state.filters.search = target.value;
    renderInstructionsContent();
    return;
  }

  if (target.id === 'instructions-date-field') {
    state.filters.dateField = target.value;
    return;
  }

  if (target.id === 'instructions-date-range') {
    state.filters.dateRange = target.value;
  }
}

export function init() {
  detailsDrawer = initInstructionDetailsDrawer({
    podeAprovarRejeitar: getPodeAprovarRejeitar(),
    onPrimaryAction: async (item) => {
      try {
        await updateInstructionStatus(item.id, 'approve');
      } catch (error) {
        console.error('[controle-patio/instrucoes] falha ao aprovar via drawer', { id: item?.id, error });
      }
    },
  });

  if (activeController) activeController.abort();
  activeController = new AbortController();

  renderTopActions();
  renderFilters();
  renderTabs();
  renderInstructionsContent();

  loadInstructions()
    .then(() => {
      renderInstructionsContent();
    })
    .catch((error) => {
      console.error('[controle-patio/instrucoes] falha ao carregar instrues', error);
    });

  const page = document.querySelector('.patio-instructions-page');
  if (!page) return () => { };

  const cleanupTabs = initControlePatioTabs(page);
  page.addEventListener('click', handlePageClick);
  page.addEventListener('input', handleInput);
  page.addEventListener('change', handleInput);

  return () => {
    page.removeEventListener('click', handlePageClick);
    page.removeEventListener('input', handleInput);
    page.removeEventListener('change', handleInput);
    cleanupTabs();
    detailsDrawer?.cleanup();
    detailsDrawer = null;
    if (activeController) {
      activeController.abort();
      activeController = null;
    }
  };
}
