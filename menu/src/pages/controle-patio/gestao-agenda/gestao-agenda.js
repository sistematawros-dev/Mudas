import * as Input from '../../../components/input/input.js';
import * as Modal from '../../../components/modal/modal.js';
import * as Segmented from '../../../components/segmented/segmented.js';
import { createGestaoAgendaState, gestaoAgendaModalIds } from './gestao-agenda.data.js';
import { renderGestaoAgenda } from './gestao-agenda.templates.js';

const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.sistema.tawros.com.br/api/v1';
const state = createGestaoAgendaState();
let cleanupInputs = null;
let cleanupModal = null;
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

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function normalizeProduto(value) {
  return normalizeText(value);
}

function produtoLabel(value) {
  const key = normalizeProduto(value);
  const labels = {
    caroco: 'Caroço',
    pluma: 'Pluma',
    fibrilha: 'Fibrilha',
    capulho: 'Capulho',
  };
  return labels[key] || String(value || '-');
}

function parseInteger(value) {
  const parsed = Number.parseInt(String(value || '').trim(), 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toIsoDate(inputValue) {
  const raw = String(inputValue || '').trim();
  if (!raw) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const ddmmyyyy = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (ddmmyyyy) return `${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`;
  return null;
}

function normalizeDateKey(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const dateOnlyMatch = raw.match(/^(\d{4}-\d{2}-\d{2})/);
  if (dateOnlyMatch) return dateOnlyMatch[1];
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
}

function formatDateLabel(isoDate) {
  const raw = String(isoDate || '').trim();
  if (!raw) return '';

  let date = null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    date = new Date(`${raw}T12:00:00`);
  } else {
    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) date = parsed;
  }

  if (!date || Number.isNaN(date.getTime())) return raw;
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatWeekdayLabel(isoDate) {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return '-';
  const raw = date.toLocaleDateString('pt-BR', { weekday: 'long' });
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function monthLabel(date) {
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}

function setCurrentRangeLabel() {
  state.filters.currentRangeLabel = monthLabel(state.filters.currentMonthDate);
}

function buildCalendar(cards) {
  const monthDate = new Date(state.filters.currentMonthDate);
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const lastDay = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
  const firstWeekDay = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const days = [];

  for (let i = 0; i < firstWeekDay; i += 1) {
    days.push({ key: `empty-start-${i}`, dayNumber: '', items: [] });
  }

  const byDate = cards.reduce((acc, card) => {
    const key = String(card.dateIso || '');
    if (!key) return acc;
    if (!acc[key]) acc[key] = [];
    acc[key].push(card);
    return acc;
  }, {});

  for (let day = 1; day <= totalDays; day += 1) {
    const iso = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const items = (byDate[iso] || []).map((card) => ({
      id: `calendar-${card.id}`,
      product: card.product,
      productValue: card.productValue,
      status: card.status,
    }));
    days.push({ key: iso, dayNumber: day, items });
  }

  const trailing = (7 - (days.length % 7)) % 7;
  for (let i = 0; i < trailing; i += 1) {
    days.push({ key: `empty-end-${i}`, dayNumber: '', items: [] });
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  state.calendar = {
    weekdays: [...state.calendar.weekdays],
    weeks,
  };
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
    if (refreshed) return apiRequest(path, { method, query, body, auth, retryOnUnauthorized: false });
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.message || `Falha na requisição (${response.status})`);
  return payload;
}

function isRouteNotFoundError(error) {
  const message = String(error?.message || '');
  return message.includes('Route ') && message.includes(' not found');
}

function resolveAgendaFallbackPath(path, method) {
  const normalizedPath = String(path || '').trim();
  const normalizedMethod = String(method || 'GET').trim().toUpperCase();
  if (normalizedPath === '/agenda-disponibilidade' && normalizedMethod === 'GET') {
    return ['/integrations/agenda-disponibilidade/pull', '/integrations/agenda_disponibilidade/pull'];
  }
  if (normalizedPath === '/agenda-disponibilidade' && normalizedMethod === 'POST') {
    return ['/integrations/agenda-disponibilidade/push', '/integrations/agenda_disponibilidade/push'];
  }
  return [];
}

async function apiRequestAgenda(path, options = {}) {
  try {
    return await apiRequest(path, options);
  } catch (error) {
    if (!isRouteNotFoundError(error)) throw error;
    const fallbackPaths = resolveAgendaFallbackPath(path, options.method || 'GET');
    if (!Array.isArray(fallbackPaths) || !fallbackPaths.length) throw error;
    for (const fallbackPath of fallbackPaths) {
      const fallbackMethod = String(fallbackPath).endsWith('/pull') ? 'GET' : 'POST';
      try {
        return await apiRequest(fallbackPath, {
          ...options,
          method: fallbackMethod,
        });
      } catch (fallbackError) {
        if (!isRouteNotFoundError(fallbackError)) throw fallbackError;
      }
    }
    throw error;
  }
}

function matchesFilters(status, productValue) {
  const matchesStatus = !state.filters.status || status === state.filters.status;
  const matchesProduct = !state.filters.product || productValue === state.filters.product;
  return matchesStatus && matchesProduct;
}

function getVisibleCards() {
  return state.cards.filter((card) => matchesFilters(card.status, card.productValue));
}

function getVisibleCalendar() {
  return {
    weekdays: [...state.calendar.weekdays],
    weeks: state.calendar.weeks.map((week) => week.map((day) => ({
      ...day,
      items: day.items.filter((item) => matchesFilters(item.status, item.productValue)),
    }))),
  };
}

function getCard(cardId) {
  return state.cards.find((card) => String(card.id) === String(cardId)) || null;
}

function resetModalState() {
  state.modal.selectedCardId = null;
  state.modal.blockReason = '';
}

function getOperadorPatio() {
  try {
    const raw = sessionStorage.getItem('user');
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed?.operadorPatio);
  } catch {
    return false;
  }
}

function getUserFiliais() {
  try {
    const raw = sessionStorage.getItem('user');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.filiais) ? parsed.filiais : [];
  } catch {
    return [];
  }
}

function getLoggedFilialId() {
  const id = Number(sessionStorage.getItem('filialId') || '');
  return Number.isFinite(id) && id > 0 ? id : null;
}

function resolveFilialIdFromRows(filiaisRows) {
  if (!Array.isArray(filiaisRows) || !filiaisRows.length) return null;
  const first = filiaisRows.find((row) => row?.ativo !== false) || filiaisRows[0];
  const parsed = Number(first?.id);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function mapCards(rows, occupancyMap = {}) {
  return rows.map((row) => {
    const dateIso = normalizeDateKey(row?.data_carregamento);
    const produto = normalizeProduto(row?.tipo_produto);
    const capacity = Math.max(0, Number(row?.vagas_total || 0));
    const occupied = Math.max(0, Number(row?.vagas_ocupadas || 0));
    const blocked = normalizeText(row?.status) === 'blocked';
    const free = Math.max(capacity - occupied, 0);
    return {
      id: String(row?.id || ''),
      dateIso,
      dateLabel: formatDateLabel(dateIso),
      weekdayLabel: formatWeekdayLabel(dateIso),
      product: produtoLabel(produto),
      productValue: produto,
      status: blocked ? 'blocked' : 'open',
      occupied,
      capacity,
      freeLabel: blocked ? 'Esgotado' : `${free} livres`,
      note: blocked ? String(row?.mensagem_bloqueio || '').trim() : '',
    };
  });
}

function buildOccupancyMap(instrucoesRows) {
  return instrucoesRows.reduce((acc, row) => {
    const status = normalizeText(row?.status);
    if (status !== 'aprovado' && status !== 'pendente') return acc;
    const dateIso = normalizeDateKey(row?.data_agendamento);
    const product = normalizeProduto(row?.tipo_produto);
    if (!dateIso || !product) return acc;
    const key = `${dateIso}|${product}`;
    acc[key] = Number(acc[key] || 0) + 1;
    return acc;
  }, {});
}

async function loadData(page) {
  const filialId = state.selectedFilialId;
  const agendaQuery = { page: 1, limit: 5000 };
  const instrucoesQuery = { page: 1, limit: 5000 };
  if (filialId) {
    agendaQuery['filter[filial_id][eq]'] = filialId;
    instrucoesQuery['filter[filial_id][eq]'] = filialId;
  }

  const [agendaRes, instrucoesRes] = await Promise.all([
    apiRequestAgenda('/agenda-disponibilidade', { query: agendaQuery }).catch(() => ({ data: [] })),
    apiRequest('/instrucoes', { query: instrucoesQuery }).catch(() => ({ data: [] })),
  ]);

  const agendaRows = parseApiResponse(agendaRes);
  const occupancy = buildOccupancyMap(parseApiResponse(instrucoesRes));
  state.cards = mapCards(agendaRows, occupancy);
  state.allCards = state.cards.map((card) => ({ ...card }));

  if (!state.cards.length) {
    setCurrentRangeLabel();
    buildCalendar([]);
  } else {
    const firstDate = state.cards
      .map((card) => card.dateIso)
      .filter(Boolean)
      .sort()[0];
    if (firstDate) state.filters.currentMonthDate = new Date(`${firstDate}T12:00:00`);
    setCurrentRangeLabel();
    buildCalendar(state.cards);
  }

  renderPage(page);
}

function getDateRangeFromForm() {
  const startIso = toIsoDate(state.form.loadingDate.value);
  if (!startIso) throw new Error('Informe uma Data de Carregamento válida.');

  if (state.mode !== 'period') return [startIso];

  const endIso = toIsoDate(state.form.endDate.value);
  if (!endIso) throw new Error('Informe a Data Final para o período.');
  if (endIso < startIso) throw new Error('A Data Final deve ser maior ou igual à Data de Carregamento.');

  const dates = [];
  let current = new Date(`${startIso}T12:00:00`);
  const end = new Date(`${endIso}T12:00:00`);
  while (current <= end) {
    const iso = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
    dates.push(iso);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

async function releaseSlots(page) {
  const filialId = Number(state.selectedFilialId || 0);
  if (!Number.isFinite(filialId) || filialId <= 0) throw new Error('Selecione uma empresa para liberar vagas.');

  const tipoProduto = normalizeProduto(state.form.productType.value);
  if (!tipoProduto) throw new Error('Selecione o Tipo de Produto.');

  const vagasTotal = parseInteger(state.form.totalSlots.value);
  if (!Number.isFinite(vagasTotal) || vagasTotal < 0) throw new Error('Informe o Total de Vagas.');

  const limiteTransportadoraRaw = String(state.form.carrierLimit.value || '').trim();
  const limiteTransportadora = limiteTransportadoraRaw ? parseInteger(limiteTransportadoraRaw) : null;

  const dates = getDateRangeFromForm();

  await Promise.all(dates.map(async (dateIso) => {
    const existing = await apiRequestAgenda('/agenda-disponibilidade', {
      query: {
        page: 1,
        limit: 1,
        'filter[filial_id][eq]': filialId,
        'filter[data_carregamento][eq]': dateIso,
        'filter[tipo_produto][eq]': tipoProduto,
      },
    }).catch(() => ({ data: [] }));
    const matches = parseApiResponse(existing).filter((item) =>
      Number(item?.filial_id) === filialId
      && normalizeDateKey(item?.data_carregamento) === dateIso
      && normalizeProduto(item?.tipo_produto) === tipoProduto
    );

    if (matches.length > 1) {
      throw new Error(`Já existe mais de um card para ${dateIso} (${tipoProduto}). Remova duplicidades antes de liberar novas vagas.`);
    }

    const row = matches[0];
    const payload = {
      filial_id: filialId,
      data_carregamento: dateIso,
      tipo_produto: tipoProduto,
      vagas_total: vagasTotal,
      limite_transportadora: limiteTransportadora,
      status: normalizeText(row?.status) === 'blocked' ? 'blocked' : 'open',
      mensagem_bloqueio: row?.mensagem_bloqueio || null,
      ativo: true,
    };
    if (row?.id) {
      await apiRequest(`/agenda-disponibilidade/${row.id}`, { method: 'PATCH', body: payload });
    } else {
      await apiRequestAgenda('/agenda-disponibilidade', { method: 'POST', body: payload });
    }
  }));

  state.form.totalSlots.value = '';
  state.form.carrierLimit.value = '';
  if (state.mode === 'single-date') state.form.loadingDate.value = '';
  if (state.mode === 'period') {
    state.form.loadingDate.value = '';
    state.form.endDate.value = '';
  }
  await loadData(page);
}

function renderPage(page) {
  const root = page.querySelector('#patio-schedule-management-root');
  if (!root) return;

  root.innerHTML = renderGestaoAgenda({
    ...state,
    allCards: state.cards,
    cards: getVisibleCards(),
    calendar: getVisibleCalendar(),
    operadorPatio: getOperadorPatio(),
  });

  cleanupInputs?.();
  cleanupInputs = Input.init(page);

  cleanupModal?.();
  cleanupModal = Modal.init(page, {
    onConfirm: handleModalConfirm,
    onCancel: handleModalDismiss,
    onClose: handleModalDismiss,
  });

  const segmentedContainer = root.querySelector('#patio-schedule-management-mode');
  Segmented.init(segmentedContainer, (value) => {
    state.mode = value;
    renderPage(page);
  });
}

function openModal(page, modalId, cardId) {
  state.modal.selectedCardId = cardId;
  if (modalId === gestaoAgendaModalIds.block) state.modal.blockReason = '';
  renderPage(page);
  Modal.open(modalId);
}

async function unblockCard(cardId, page) {
  const card = getCard(cardId);
  if (!card) return;
  await apiRequest(`/agenda-disponibilidade/${card.id}`, {
    method: 'PATCH',
    body: { status: 'open', mensagem_bloqueio: null },
  });
  await loadData(page);
}

async function confirmBlockCard(page) {
  const card = getCard(state.modal.selectedCardId);
  if (!card) return;
  await apiRequest(`/agenda-disponibilidade/${card.id}`, {
    method: 'PATCH',
    body: {
      status: 'blocked',
      mensagem_bloqueio: state.modal.blockReason.trim() || 'Agenda bloqueada temporariamente.',
    },
  });
  resetModalState();
  await loadData(page);
}

async function confirmCancelCard(page) {
  const card = getCard(state.modal.selectedCardId);
  if (!card) return;
  if (card.occupied > 0) {
    window.alert('Não é possível excluir uma agenda que possui vagas ocupadas.');
    return;
  }
  if (card.status === 'blocked') {
    window.alert('Não é possível excluir uma agenda bloqueada.');
    return;
  }
  const shouldDelete = window.confirm('Confirma a exclusão deste card de agenda?');
  if (!shouldDelete) return;
  await apiRequest(`/agenda-disponibilidade/${card.id}`, { method: 'DELETE' });
  resetModalState();
  await loadData(page);
}

async function handleModalConfirm(modalId) {
  const page = document.querySelector('.patio-schedule-management-page');
  if (!page) return;
  if (modalId === gestaoAgendaModalIds.block) await confirmBlockCard(page);
  if (modalId === gestaoAgendaModalIds.cancel) await confirmCancelCard(page);
}

function handleModalDismiss() {
  resetModalState();
}

function shiftCurrentMonth(delta) {
  const date = new Date(state.filters.currentMonthDate);
  date.setMonth(date.getMonth() + delta);
  state.filters.currentMonthDate = date;
  setCurrentRangeLabel();
  buildCalendar(state.cards);
}

const WRITE_ACTIONS = new Set([
  'open-block-inline', 'confirm-block-inline', 'unblock-card', 'release-slots',
  'open-cancel-modal', 'confirm-cancel',
]);

function handleClick(event) {
  const page = event.currentTarget;
  const button = event.target.closest('[data-action]');
  if (!button) return;

  const { action, cardId, view } = button.dataset;

  if (WRITE_ACTIONS.has(action) && !getOperadorPatio()) {
    alert('Você não tem permissão para modificar a gestão de agenda. Apenas operadores de pátio, administradores ou usuários tawros podem realizar alterações.');
    return;
  }

  if (action === 'open-block-inline' && cardId) {
    state.blockingCardId = cardId;
    state.blockingReason = '';
    renderPage(page);
    return;
  }
  if (action === 'cancel-block-inline') {
    state.blockingCardId = null;
    state.blockingReason = '';
    renderPage(page);
    return;
  }
  if (action === 'confirm-block-inline' && cardId) {
    const card = getCard(cardId);
    if (!card) return;
    apiRequest(`/agenda-disponibilidade/${card.id}`, {
      method: 'PATCH',
      body: {
        status: 'blocked',
        mensagem_bloqueio: state.blockingReason.trim() || 'Agenda bloqueada temporariamente.',
      },
    }).then(() => {
      state.blockingCardId = null;
      state.blockingReason = '';
      loadData(page).catch((error) => alert(error?.message || 'Falha ao bloquear agenda.'));
    }).catch((error) => alert(error?.message || 'Falha ao bloquear agenda.'));
    return;
  }
  if (action === 'open-cancel-modal' && cardId) {
    openModal(page, gestaoAgendaModalIds.cancel, cardId);
    return;
  }
  if (action === 'unblock-card' && cardId) {
    unblockCard(cardId, page).catch((error) => alert(error?.message || 'Falha ao desbloquear agenda.'));
    return;
  }
  if (action === 'set-view' && view) {
    state.filters.view = view;
    renderPage(page);
    return;
  }
  if (action === 'release-slots') {
    releaseSlots(page).catch((error) => alert(error?.message || 'Falha ao liberar vagas.'));
    return;
  }
  if (action === 'prev-range') {
    shiftCurrentMonth(-1);
    renderPage(page);
    return;
  }
  if (action === 'next-range') {
    shiftCurrentMonth(1);
    renderPage(page);
  }
}

function handleInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) return;

  if (target.id === state.form.loadingDate.id) state.form.loadingDate.value = target.value;
  if (target.id === state.form.endDate.id) state.form.endDate.value = target.value;
  if (target.id === state.form.productType.id) state.form.productType.value = target.value;
  if (target.id === state.form.totalSlots.id) state.form.totalSlots.value = target.value;
  if (target.id === state.form.carrierLimit.id) state.form.carrierLimit.value = target.value;
  if (target.id === 'agendaStatusFilter') state.filters.status = target.value;
  if (target.id === 'agendaProductFilter') state.filters.product = target.value;
  if (target.id === 'gestaoAgendaBlockReason') state.modal.blockReason = target.value;
  if (target.dataset.action === 'block-reason-input') state.blockingReason = target.value;
}

function handleChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;
  if (target.id === 'agendaStatusFilter' || target.id === 'agendaProductFilter') {
    renderPage(event.currentTarget);
  }
  if (target.id === 'gestaoAgendaFilialSelect') {
    const page = event.currentTarget;
    state.selectedFilialId = Number(target.value) || null;
    state.filters.currentMonthDate = new Date();
    state.cards = [];
    state.allCards = [];
    loadData(page).catch((error) => alert(error?.message || 'Falha ao carregar dados da empresa.'));
  }
}

export function init() {
  const page = document.querySelector('.patio-schedule-management-page');
  if (!page) return () => { };

  if (activeController) activeController.abort();
  activeController = new AbortController();

  const userFiliais = getUserFiliais();
  state.filiais = userFiliais;
  const loggedFilialId = getLoggedFilialId();
  const validIds = new Set(userFiliais.map((f) => f.id));
  if (loggedFilialId && validIds.has(loggedFilialId)) {
    state.selectedFilialId = loggedFilialId;
  } else if (userFiliais.length > 0 && !validIds.has(state.selectedFilialId)) {
    state.selectedFilialId = Number(userFiliais[0].id) || null;
  }

  setCurrentRangeLabel();
  renderPage(page);
  loadData(page).catch((error) => {
    console.error('[controle-patio/gestao-agenda] falha ao carregar dados', error);
  });

  page.addEventListener('click', handleClick);
  page.addEventListener('input', handleInput);
  page.addEventListener('change', handleChange);

  return () => {
    page.removeEventListener('click', handleClick);
    page.removeEventListener('input', handleInput);
    page.removeEventListener('change', handleChange);
    cleanupInputs?.();
    cleanupInputs = null;
    cleanupModal?.();
    cleanupModal = null;
    if (activeController) {
      activeController.abort();
      activeController = null;
    }
    Modal.closeAll();
    Modal.resetModalStack();
  };
}
