import * as Checkbox from '../../../components/checkbox/checkbox.js';
import * as Input from '../../../components/input/input.js';
import * as Modal from '../../../components/modal/modal.js';
import { createPatioState, createPatioEntryForm, patioModalIds } from './patio.data.js';
import { renderPatioBoard } from './patio.templates.js';
import { initPatioEntryDrawer } from './entry-drawer.js';

const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.sistema.tawros.com.br/api/v1';
const state = createPatioState();
let cleanupInputs = null;
let cleanupModal = null;
let entryDrawer = null;
let activeController = null;

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

function formatApiDate(value) {
  const iso = toDateOnlyIso(value);
  if (!iso) return '-';
  const [year, month, day] = iso.split('-');
  if (!year || !month || !day) return String(value || '-');
  return `${day}/${month}/${year}`;
}

function formatApiTime(value) {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function toDateOnlyIso(value) {
  if (!value) return '';
  const raw = String(value).trim();
  if (!raw) return '';
  const br = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (br) return `${br[3]}-${br[2]}-${br[1]}`;
  const direct = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (direct) return `${direct[1]}-${direct[2]}-${direct[3]}`;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return '';
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(parsed);
  const year = parts.find((part) => part.type === 'year')?.value || '';
  const month = parts.find((part) => part.type === 'month')?.value || '';
  const day = parts.find((part) => part.type === 'day')?.value || '';
  if (!year || !month || !day) return '';
  return `${year}-${month}-${day}`;
}

function getLocalTodayIso() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const year = parts.find((part) => part.type === 'year')?.value || '';
  const month = parts.find((part) => part.type === 'month')?.value || '';
  const day = parts.find((part) => part.type === 'day')?.value || '';
  if (!year || !month || !day) return '';
  return `${year}-${month}-${day}`;
}

function normalizeProduto(value) {
  return String(value || '').trim().toLowerCase();
}

function formatUnidadePtBr(value) {
  const normalized = normalizeProduto(value);
  if (!normalized) return 'Quilogramas';
  if (normalized === 'kg' || normalized === 'kilo' || normalized === 'kilos' || normalized === 'quilograma' || normalized === 'quilogramas') {
    return 'Quilogramas';
  }
  if (normalized === 'fardo' || normalized === 'fardos') return 'Fardos';
  if (normalized === 'tonelada' || normalized === 'toneladas' || normalized === 't') return 'Toneladas';
  return String(value).trim();
}

function mapByInstrucaoId(rows) {
  return rows.reduce((acc, row) => {
    const instrucaoId = String(row?.instrucao_id || '');
    if (!instrucaoId) return acc;
    if (!acc[instrucaoId]) acc[instrucaoId] = [];
    acc[instrucaoId].push(row);
    return acc;
  }, {});
}

function mapFardosByBlocoId(rows) {
  return rows.reduce((acc, row) => {
    const blocoId = String(row?.instrucao_bloco_id || '');
    if (!blocoId) return acc;
    if (!acc[blocoId]) acc[blocoId] = [];
    acc[blocoId].push(row);
    return acc;
  }, {});
}

function buildCompletionModal(row, detail = {}) {
  const tipoProduto = normalizeProduto(row?.tipo_produto);
  const transportes = Array.isArray(detail.transportes) ? detail.transportes : [];
  const plannedTotalFromTransportes = transportes.reduce((sum, item) => {
    const value = Number(item?.quantidade || 0);
    return sum + (Number.isFinite(value) ? value : 0);
  }, 0);
  const plannedTotal = plannedTotalFromTransportes > 0
    ? plannedTotalFromTransportes
    : Number(row?.quantidade_total || 0);
  const unidadeKg = formatUnidadePtBr(
    transportes.find((item) => String(item?.unidade || '').trim())?.unidade || 'quilogramas',
  );

  if (tipoProduto !== 'pluma') {
    return {
      title: 'Finalizar Carregamento',
      subtitle: `${row?.numero_instrucao || `INS-${row?.id}`}  ${row?.nome_vendedor_produtor || '-'}`,
      quantificationType: 'kg',
      summary: {
        plannedLabel: 'Previsto:',
        plannedValue: `${plannedTotal.toLocaleString('pt-BR')} ${unidadeKg}`,
        loadedLabel: 'Carregado:',
        loadedValue: `${Number(row?.quantidade_real || plannedTotal || 0).toLocaleString('pt-BR')} ${unidadeKg}`,
      },
      controls: { quantityPlanned: false },
      item: {
        id: `item-${row?.id}`,
        title: tipoProduto ? tipoProduto.toUpperCase() : 'CARGA',
        status: 'NA ORDEM',
        availableLabel: `${plannedTotal.toLocaleString('pt-BR')} ${unidadeKg}`,
        selected: true,
        loadedLabel: 'Carregado',
        loadedValue: `${Number(row?.quantidade_real || plannedTotal || 0).toLocaleString('pt-BR')} ${unidadeKg}`,
      },
    };
  }

  const blocos = Array.isArray(detail.blocos) ? detail.blocos : [];
  const rows = blocos.map((bloco, index) => {
    const totalBales = Math.max(
      Number(bloco?.quantidade_fardos || 0),
      Number(bloco?.fardos?.length || 0),
      0,
    );
    return {
      id: String(bloco?.id || `bloco-${index + 1}`),
      title: String(bloco?.nome_bloco || `Bloco ${index + 1}`),
      status: 'NA ORDEM',
      availableLabel: `${totalBales} Fardos`,
      selected: true,
      expanded: false,
      rightLabel: `${totalBales} fardos`,
      totalBales,
      selectedBales: Array.from({ length: totalBales }, (_, idx) => idx + 1),
    };
  });

  const loadedBales = rows.reduce((sum, item) => sum + Number(item.totalBales || 0), 0);
  return {
    title: 'Finalizar Carregamento',
    subtitle: `${row?.numero_instrucao || `INS-${row?.id}`}  ${row?.nome_vendedor_produtor || '-'}`,
    quantificationType: 'bales',
    summary: {
      plannedLabel: 'Previsto:',
      plannedValue: `${plannedTotal.toLocaleString('pt-BR')} fardos`,
      loadedLabel: 'Carregado:',
      loadedValue: `${Number(loadedBales || plannedTotal || 0).toLocaleString('pt-BR')} fardos`,
    },
    controls: { markPlanned: false, markAll: false },
    rows,
  };
}

function getCardById(cardId) {
  for (const column of state.columns) {
    const found = column.items.find((item) => item.id === cardId);
    if (found) return found;
  }
  return null;
}

function shouldShowItem(item) {
  const matchesProduct = state.activeProductFilter === 'all'
    || normalizeProduto(item.product) === normalizeProduto(state.activeProductFilter);
  const matchesFuture = state.showFutureAppointments || !item.isFuture;
  return matchesProduct && matchesFuture;
}

function getVisibleColumns() {
  return state.columns
    .filter((column) => !column.toggleControlled || state.showFutureAppointments)
    .map((column) => ({
      ...column,
      items: column.items.filter((item) => item.type !== 'card' || shouldShowItem(item)),
    }));
}

function renderPage(page, options = {}) {
  const { keepModalOpen = false } = options;
  const root = page.querySelector('#patio-board-root');
  if (!root) return;

  root.innerHTML = renderPatioBoard({
    ...state,
    columns: getVisibleColumns(),
  });

  cleanupInputs?.();
  cleanupInputs = Input.init(page);
  Checkbox.init(page);

  cleanupModal?.();
  cleanupModal = Modal.init(page, {
    onConfirm: handleModalConfirm,
    onCancel: handleModalDismiss,
    onClose: handleModalDismiss,
  });

  if (keepModalOpen && state.modal.data) {
    Modal.open(patioModalIds.finishLoading);
  }
}

function openFinishModal(page, cardId) {
  const card = getCardById(cardId);
  if (!card?.completionModal) return;

  state.modal.selectedCardId = cardId;
  state.modal.data = JSON.parse(JSON.stringify(card.completionModal));
  renderPage(page, { keepModalOpen: true });
}

function openEntryDrawer(triggerEl = null) {
  state.entryDrawer.isOpen = true;
  state.entryDrawer.form = createPatioEntryForm();
  entryDrawer?.open({
    triggerEl,
    form: state.entryDrawer.form,
    options: state.entryDrawer.lookups,
  });
}

function closeEntryDrawer() {
  state.entryDrawer.isOpen = false;
  entryDrawer?.close();
}

function resetModalState() {
  state.modal.selectedCardId = null;
  state.modal.data = null;
  state.modal.postponeCardId = null;
}

function toggleBale(rowId, baleNumber, page) {
  if (!state.modal.data || state.modal.data.quantificationType !== 'bales') return;
  const row = state.modal.data.rows.find((item) => item.id === rowId);
  if (!row) return;

  const bale = Number(baleNumber);
  const index = row.selectedBales.indexOf(bale);
  if (index >= 0) {
    row.selectedBales.splice(index, 1);
  } else {
    row.selectedBales.push(bale);
    row.selectedBales.sort((a, b) => a - b);
  }

  renderPage(page, { keepModalOpen: true });
}

function toggleExpandedRow(rowId, page) {
  if (!state.modal.data || state.modal.data.quantificationType !== 'bales') return;
  const row = state.modal.data.rows.find((item) => item.id === rowId);
  if (!row) return;

  row.expanded = !row.expanded;
  renderPage(page, { keepModalOpen: true });
}

function mapColumns(rows, lookups) {
  const future = [];
  const waiting = [];
  const queue = [
    {
      id: 'queue-register',
      type: 'entry-action',
      label: 'Registrar entrada',
    },
  ];
  const loading = [];
  const finished = [];

  const todayIso = getLocalTodayIso();
  const nextFutureDateIso = rows
    .map((row) => ({ ...row, _agendamento_iso: toDateOnlyIso(row?.data_agendamento) }))
    .filter((row) => row?.status !== 'recusado' && row?._agendamento_iso && row._agendamento_iso > todayIso)
    .map((row) => String(row._agendamento_iso))
    .sort((a, b) => a.localeCompare(b))[0] || null;

  rows.forEach((row) => {
    if (row.status === 'recusado') return;
    const instructionId = String(row.id);
    const producer = lookups.pessoas[String(row.produtor_id)] || row.nome_vendedor_produtor || '-';
    const buyer = lookups.pessoas[String(row.comprador_id)] || '-';
    const produto = normalizeProduto(row.tipo_produto);
    const product = produto === 'caroco' ? 'Caroco' : produto === 'fibrilha' ? 'Fibrilha' : produto === 'capulho' ? 'Capulho' : 'Pluma';
    const agendamentoIso = toDateOnlyIso(row.data_agendamento);
    const isFuture = Boolean(agendamentoIso && agendamentoIso > todayIso);
    const scheduleInfo = row.data_agendamento
      ? `Agendado: ${formatApiDate(row.data_agendamento)}`
      : 'Sem data de agendamento';
    const patioFase = String(row.patio_fase || (row.status === 'finalizado' ? 'finalizado' : 'aguardando_chegada'));

    const baseCard = {
      id: `instrucao-${instructionId}`,
      type: 'card',
      product,
      productLabel: product,
      code: row.numero_instrucao || `INS-${instructionId}`,
      secondaryCode: row.numero_contrato || '-',
      driver: row.nome_motorista || '-',
      transporter: buyer,
      quantity: row._completionModal?.summary?.plannedValue
        || `${Number(row.quantidade_total || 0).toLocaleString('pt-BR')} Fardos`,
      scheduleInfo,
      isFuture,
      completionModal: row._completionModal || buildCompletionModal(row),
    };

    if (row.status === 'finalizado' || patioFase === 'finalizado') {
      finished.push({
        ...baseCard,
        scheduleInfo: row.finalizado_em ? `Finalizado as ${formatApiTime(row.finalizado_em)}` : 'Finalizado',
        actions: [{ id: 'details', label: 'Ver detalhes', variant: 'dark', style: 'outline' }],
      });
      return;
    }

    if (isFuture && patioFase === 'aguardando_chegada' && nextFutureDateIso && agendamentoIso === nextFutureDateIso) {
      future.push({
        ...baseCard,
        actions: [
          { id: 'check-in-today', label: 'Check-in Hoje', variant: 'dark', style: 'solid' },
        ],
      });
      return;
    }

    if (patioFase === 'fila_patio' || patioFase === 'chamado') {
      queue.push({
        ...baseCard,
        scheduleInfo: row.chegada_em
          ? `Chegou as ${formatApiTime(row.chegada_em)}${row.ordem_fila ? ` - #${row.ordem_fila}` : ''}`
          : scheduleInfo,
        infoTone: 'warning',
        actions: patioFase === 'chamado'
          ? [{ id: 'entry', label: 'Dar entrada', variant: 'warning', style: 'solid' }]
          : [{ id: 'call', label: 'Chamar', variant: 'warning', style: 'solid' }],
      });
      return;
    }

    if (patioFase === 'carregando') {
      loading.push({
        ...baseCard,
        actions: [
          { id: 'finish', label: 'Finalizar', variant: 'primary', style: 'solid' },
        ],
      });
      return;
    }

    if (!agendamentoIso || agendamentoIso !== todayIso) return;

    waiting.push({
      ...baseCard,
      actions: [
        { id: 'check-in', label: 'Fazer Check-in', variant: 'primary', style: 'solid' },
        { id: 'postpone', label: 'Postergar', variant: 'dark', style: 'outline' },
      ],
    });
  });

  queue.splice(1, queue.length - 1, ...queue.slice(1).sort((a, b) => {
    const aOrder = Number(String(a.scheduleInfo || '').match(/#(\d+)/)?.[1] || 0);
    const bOrder = Number(String(b.scheduleInfo || '').match(/#(\d+)/)?.[1] || 0);
    if (aOrder && bOrder) return aOrder - bOrder;
    return String(a.code || '').localeCompare(String(b.code || ''));
  }));

  return [
    { id: 'future', title: 'Aguardando (Futuro)', tone: 'future', toggleControlled: true, items: future },
    { id: 'waiting', title: 'Aguardando Chegada', items: waiting },
    { id: 'queue', title: 'Fila de Pátio', items: queue },
    { id: 'loading', title: 'Carregando', items: loading },
    { id: 'finished', title: 'Finalizados', items: finished },
  ];
}

async function loadPatioData(page) {
  const [instrucoesRes, pessoasRes, transportesRes, blocosRes, fardosRes] = await Promise.all([
    apiRequest('/instrucoes', { query: { page: 1, limit: 400, sort: 'created_at', order: 'desc' } }),
    apiRequest('/lookups/pessoas-empresas', { query: { limit: 500 } }),
    apiRequest('/instrucoes-transportes', { query: { page: 1, limit: 5000 } }).catch(() => ({ data: [] })),
    apiRequest('/instrucoes-blocos', { query: { page: 1, limit: 5000 } }).catch(() => ({ data: [] })),
    apiRequest('/instrucoes-fardos', { query: { page: 1, limit: 10000 } }).catch(() => ({ data: [] })),
  ]);

  const pessoas = parseApiResponse(pessoasRes).reduce((acc, row) => {
    const nome = row?.razao_social || row?.nome_fantasia || row?.nome_responsavel || row?.cpf_cnpj || `Pessoa ${row?.id ?? ''}`;
    if (row?.id !== undefined) acc[String(row.id)] = nome;
    return acc;
  }, {});

  const blocosByInstrucao = mapByInstrucaoId(parseApiResponse(blocosRes));
  const fardosByBloco = mapFardosByBlocoId(parseApiResponse(fardosRes));
  const transportesByInstrucao = mapByInstrucaoId(parseApiResponse(transportesRes));

  const rows = parseApiResponse(instrucoesRes).map((row = {}) => ({
    ...row,
    _completionModal: buildCompletionModal(row, {
      transportes: transportesByInstrucao[String(row.id)] || [],
      blocos: (blocosByInstrucao[String(row.id)] || []).map((item) => ({
        ...item,
        fardos: fardosByBloco[String(item?.id)] || [],
      })),
    }),
  }));
  state.columns = mapColumns(rows, { pessoas });
  renderPage(page);
}

async function getNextQueueOrder() {
  const response = await apiRequest('/instrucoes', { query: { page: 1, limit: 400 } });
  const rows = parseApiResponse(response);
  const maxOrder = rows.reduce((max, row) => {
    const phase = String(row?.patio_fase || '');
    if (phase !== 'fila_patio' && phase !== 'chamado') return max;
    const ordem = Number(row?.ordem_fila || 0);
    if (!Number.isFinite(ordem)) return max;
    return Math.max(max, ordem);
  }, 0);
  return maxOrder + 1;
}

async function patchInstructionFromCard(cardId, payload, page) {
  const instructionId = Number(String(cardId || '').replace('instrucao-', ''));
  if (!Number.isFinite(instructionId) || instructionId <= 0) return;
  await apiRequest(`/instrucoes/${instructionId}`, { method: 'PATCH', body: payload });
  await loadPatioData(page);
}

function handleModalConfirm(modalId) {
  if (modalId === patioModalIds.postpone) {
    const cardId = state.modal.postponeCardId;
    const dateInput = document.getElementById('postponeDate');
    const selectedDate = dateInput?.value?.trim();
    const page = document.querySelector('.patio-board-page');
    resetModalState();
    if (!cardId || !selectedDate || !page) return;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (selectedDate < tomorrow.toISOString().slice(0, 10)) {
      alert('A data deve ser posterior à data atual.');
      return;
    }
    patchInstructionFromCard(cardId, {
      data_agendamento: selectedDate,
      patio_fase: 'aguardando_chegada',
      chegada_em: null,
      chamado_em: null,
      entrada_em: null,
      ordem_fila: null,
    }, page).catch((error) => {
      console.error('[controle-patio/patio] falha ao postergar', error);
    });
    return;
  }

  if (modalId !== patioModalIds.finishLoading) return;
  const selectedCardId = state.modal.selectedCardId;
  const modalData = state.modal.data;
  resetModalState();
  const page = document.querySelector('.patio-board-page');
  if (!page) return;

  const quantidadeReal = modalData?.quantificationType === 'kg'
    ? Number.parseFloat(String(modalData?.item?.loadedValue || '').replace(/\./g, '').replace(',', '.'))
    : null;

  patchInstructionFromCard(selectedCardId, {
    status: 'finalizado',
    patio_fase: 'finalizado',
    finalizado_em: new Date().toISOString(),
    ordem_fila: null,
    quantidade_real: Number.isFinite(quantidadeReal) ? quantidadeReal : undefined,
  }, page)
    .catch((error) => {
      console.error('[controle-patio/patio] falha ao finalizar carregamento', error);
      renderPage(page);
    });
}

function handleModalDismiss(modalId) {
  if (modalId && modalId !== patioModalIds.finishLoading && modalId !== patioModalIds.postpone) return;
  resetModalState();

  const page = document.querySelector('.patio-board-page');
  if (page) renderPage(page);
}

async function handleClick(event) {
  const page = event.currentTarget;
  const trigger = event.target.closest('[data-action]');
  if (!trigger) return;

  const { action, value, cardId, cardAction, rowId, bale } = trigger.dataset;

  if (action === 'go-back') {
    window.location.hash = '#/controle-patio/visao-geral';
    return;
  }

  if (action === 'set-product-filter' && value) {
    state.activeProductFilter = value;
    renderPage(page, { keepModalOpen: Boolean(state.modal.data) });
    return;
  }

  if (action === 'register-entry') {
    openEntryDrawer(trigger);
    return;
  }

  if (action === 'toggle-bale' && rowId && bale) {
    toggleBale(rowId, bale, page);
    return;
  }

  if (action === 'toggle-row-expand' && rowId) {
    toggleExpandedRow(rowId, page);
    return;
  }

  if (action === 'card-action' && cardId) {
    const actionValue = String(cardAction || '').trim().toLowerCase();
    const actionLabel = String(trigger.textContent || '').trim().toLowerCase();
    const mustOpenFinishModal = actionValue === 'finish'
      || actionValue === 'edit'
      || actionValue === 'finalizar'
      || actionValue === 'finalize'
      || actionLabel.includes('finalizar');
    if (mustOpenFinishModal) {
      openFinishModal(page, cardId);
      return;
    }
  }

  if (action === 'card-action' && cardId && cardAction === 'check-in') {
    getNextQueueOrder()
      .then((nextOrder) => patchInstructionFromCard(cardId, {
        patio_fase: 'fila_patio',
        chegada_em: new Date().toISOString(),
        ordem_fila: nextOrder,
      }, page))
      .catch((error) => console.error('[controle-patio/patio] falha ao fazer check-in', error));
    return;
  }

  if (action === 'card-action' && cardId && cardAction === 'check-in-today') {
    const todayIso = new Date().toISOString().slice(0, 10);
    getNextQueueOrder()
      .then((nextOrder) => patchInstructionFromCard(cardId, {
        data_agendamento: todayIso,
        patio_fase: 'fila_patio',
        chegada_em: new Date().toISOString(),
        ordem_fila: nextOrder,
      }, page))
      .catch((error) => console.error('[controle-patio/patio] falha ao fazer check-in de futuro', error));
    return;
  }

  if (action === 'card-action' && cardId && cardAction === 'call') {
    patchInstructionFromCard(cardId, {
      patio_fase: 'chamado',
      chamado_em: new Date().toISOString(),
    }, page).catch((error) => {
      console.error('[controle-patio/patio] falha ao chamar caminhão', error);
    });
    return;
  }

  if (action === 'card-action' && cardId && cardAction === 'entry') {
    patchInstructionFromCard(cardId, {
      patio_fase: 'carregando',
      entrada_em: new Date().toISOString(),
    }, page).catch((error) => {
      console.error('[controle-patio/patio] falha ao dar entrada', error);
    });
    return;
  }

  if (action === 'card-action' && cardId && cardAction === 'postpone') {
    state.modal.postponeCardId = cardId;
    renderPage(page, { keepModalOpen: true });
    Modal.open(patioModalIds.postpone);
    return;
  }

  if (action === 'card-action' && cardId && cardAction === 'details') {
    return;
  }
}

function handleInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLSelectElement)) return;

  if (target instanceof HTMLInputElement && target.id === 'patioFutureToggle') {
    state.showFutureAppointments = target.checked;
    renderPage(event.currentTarget, { keepModalOpen: Boolean(state.modal.data) });
    return;
  }

  if (!(target instanceof HTMLInputElement)) return;
  if (!state.modal.data) return;

  if (target.id === 'completion-mark-planned' && state.modal.data.quantificationType === 'bales') {
    state.modal.data.controls.markPlanned = target.checked;
    return;
  }

  if (target.id === 'completion-mark-all' && state.modal.data.quantificationType === 'bales') {
    state.modal.data.controls.markAll = target.checked;
    state.modal.data.rows.forEach((row) => {
      row.selected = target.checked;
      if (row.totalBales) {
        row.selectedBales = target.checked ? Array.from({ length: row.totalBales }, (_, index) => index + 1) : [];
      }
    });
    renderPage(event.currentTarget, { keepModalOpen: true });
    return;
  }

  if (target.id === 'completion-quantity-planned' && state.modal.data.quantificationType === 'kg') {
    state.modal.data.controls.quantityPlanned = target.checked;
    return;
  }

  if (target.id.startsWith('completion-row-') && state.modal.data.quantificationType === 'bales') {
    const rowId = target.id.replace('completion-row-', '');
    const row = state.modal.data.rows.find((item) => item.id === rowId);
    if (!row) return;
    row.selected = target.checked;
    renderPage(event.currentTarget, { keepModalOpen: true });
    return;
  }

  if (target.id.startsWith('completion-all-') && state.modal.data.quantificationType === 'bales') {
    const rowId = target.id.replace('completion-all-', '');
    const row = state.modal.data.rows.find((item) => item.id === rowId);
    if (!row || !row.totalBales) return;
    row.selectedBales = target.checked ? Array.from({ length: row.totalBales }, (_, index) => index + 1) : [];
    renderPage(event.currentTarget, { keepModalOpen: true });
    return;
  }

  if (target.id.startsWith('completion-kg-') && state.modal.data.quantificationType === 'kg') {
    state.modal.data.item.selected = target.checked;
    return;
  }

  if (target.id.startsWith('completion-loaded-')) {
    const itemId = target.id.replace('completion-loaded-', '');
    if (state.modal.data.quantificationType === 'kg' && state.modal.data.item.id === itemId) {
      state.modal.data.item.loadedValue = target.value;
      state.modal.data.summary.loadedValue = target.value;
      return;
    }

    const row = state.modal.data.rows?.find((item) => item.id === itemId);
    if (row) {
      row.loadedValue = target.value;
    }
  }
}

export function init() {
  const page = document.querySelector('.patio-board-page');
  if (!page) return () => { };

  if (activeController) activeController.abort();
  activeController = new AbortController();

  entryDrawer = initPatioEntryDrawer({
    onClose: () => {
      state.entryDrawer.isOpen = false;
    },
    onSave: (form) => {
      state.entryDrawer.form = {
        ...state.entryDrawer.form,
        ...form,
      };
      closeEntryDrawer();
    },
  });

  renderPage(page);

  loadPatioData(page).catch((error) => {
    console.error('[controle-patio/patio] falha ao carregar dados', error);
  });

  page.addEventListener('click', handleClick);
  page.addEventListener('input', handleInput);
  page.addEventListener('change', handleInput);

  return () => {
    page.removeEventListener('click', handleClick);
    page.removeEventListener('input', handleInput);
    page.removeEventListener('change', handleInput);
    cleanupInputs?.();
    cleanupInputs = null;
    cleanupModal?.();
    cleanupModal = null;
    entryDrawer?.cleanup?.();
    entryDrawer = null;
    Modal.closeAll();
    Modal.resetModalStack();
    if (activeController) {
      activeController.abort();
      activeController = null;
    }
  };
}
