import * as Checkbox from '../../../components/checkbox/checkbox.js';
import * as Input from '../../../components/input/input.js';
import {
  createAgendamentosState,
  createCargoContract,
  createKgBlockFromApi,
  createPlumaBlockFromApi,
} from './agendamentos.data.js';
import {
  renderContractsSection,
  renderDateSection,
  renderDriverSection,
  renderTableSection,
} from './agendamentos.templates.js';
import { initControlePatioTabs, renderControlePatioTabs } from '../shared/controle-patio-tabs.js';

const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.sistemas.tawros.com.br:3000/api/v1';
const state = createAgendamentosState();
state.vehicleCatalog = [];
state.motoristaCategoryId = null;
state.transportadoraCategoryId = null;
state.transportesByInstrucao = {};
state.agendaCatalog = [];
state.instrucoesRaw = [];
state.blocosByInstrucao = {};
state.fardosByBloco = {};
state.lookupsCache = null;
const today = new Date();
state.calendarMonth = { year: today.getFullYear(), month: today.getMonth() };
let vehicleLookupTimer = null;
let driverLookupTimer = null;
let carrierLookupTimer = null;
let suppressVehicleLookupOnce = false;
let suppressDriverLookupOnce = false;
let suppressCarrierLookupOnce = false;
let cleanupTabs = null;
let cleanupInputs = null;
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


function getPodeConfigurarCarga() {
  try {
    const raw = sessionStorage.getItem('user');
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed?.podeConfigurarCarga);
  } catch {
    return false;
  }
}

function getCarrierAutoFill() {
  try {
    const raw = sessionStorage.getItem('user');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const isTawros = Number(parsed?.tawros ?? 0) === 1;
    const isAdmin = parsed?.roles?.some((r) => String(r).toLowerCase() === 'admin') ?? false;
    if (isTawros || isAdmin) return null;
    if (!parsed?.podeConfigurarCarga) return null;
    return String(parsed?.pessoaNome || '').trim() || null;
  } catch {
    return null;
  }
}

function parseNumber(input) {
  const normalized = String(input ?? '')
    .trim()
    .replace(/\./g, '')
    .replace(',', '.');
  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
}

function normalizeProduto(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
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
    throw new Error(payload?.message || `Falha na requisicao (${response.status})`);
  }
  return payload;
}

function formatDisplayDate(dateValue) {
  if (!dateValue) return '-';
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return String(dateValue);
  return parsed.toLocaleDateString('pt-BR');
}

function toApiDate(inputValue) {
  const raw = String(inputValue || '').trim();
  if (!raw) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const match = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (match) return `${match[3]}-${match[2]}-${match[1]}`;
  return null;
}

function mapLookups(pessoasRows, filiaisRows) {
  const pessoas = pessoasRows.reduce((acc, row) => {
    const nome = row?.razao_social || row?.nome_fantasia || row?.nome_responsavel || row?.cpf_cnpj || `Pessoa ${row?.id ?? ''}`;
    if (row?.id !== undefined) acc[String(row.id)] = nome;
    return acc;
  }, {});

  const filiais = filiaisRows.reduce((acc, row) => {
    if (row?.id !== undefined) acc[String(row.id)] = row?.nome || `Filial ${row?.id ?? ''}`;
    return acc;
  }, {});

  return { pessoas, filiais };
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

function buildContractDetails(instrucoes, transportesByInstrucao, blocosByInstrucao, fardosByBloco, selectedCarrier) {
  return instrucoes.reduce((acc, row) => {
    const id = String(row?.id || '');
    if (!id) return acc;
    const tipoProduto = normalizeProduto(row?.tipo_produto);
    const quantificationType = tipoProduto === 'pluma' ? 'block' : 'kg';

    let blocks = [];
    if (quantificationType === 'block') {
      const blocos = blocosByInstrucao[id] || [];
      blocks = blocos.map((bloco) => {
        const fardos = fardosByBloco[String(bloco?.id)] || [];
        return createPlumaBlockFromApi(bloco, fardos);
      });
    } else {
      const quantidadeAgendada = Math.max(0, Number(row?.quantidade_agendada || 0));
      let remaining;
      let quantidadeTotal;

      if (selectedCarrier) {
        const transportes = transportesByInstrucao[id] || [];
        const carrierTransporte = transportes.find(
          (t) => normalizeText(t?.nome_transportadora || '') === normalizeText(selectedCarrier),
        );
        quantidadeTotal = Math.max(0, Number(carrierTransporte?.quantidade || 0));
        remaining = Math.max(0, quantidadeTotal - quantidadeAgendada);
      } else {
        quantidadeTotal = Math.max(0, Number(row?.quantidade_total || 0));
        remaining = Math.max(0, quantidadeTotal - quantidadeAgendada);
      }

      blocks = [createKgBlockFromApi({
        id: `instrucao-${id}`,
        nome_transportadora: 'Carga',
        quantidade: remaining,
        unidade: 'quilogramas',
      }, 0)];
      acc[id] = { quantificationType, blocks, quantidadeTotal, quantidadeAgendada, remaining };
      return acc;
    }

    acc[id] = { quantificationType, blocks, quantidadeTotal: 0, quantidadeAgendada: 0, remaining: Infinity };
    return acc;
  }, {});
}

function mapAvailableContracts(rows, lookups, contractDetails, transportesByInstrucao, selectedCarrier) {
  return rows
    .filter((row) => {
      if (row.status !== 'aprovado') return false;
      const id = String(row.id);
      const details = contractDetails[id];

      if (details?.quantificationType === 'kg') {
        if (selectedCarrier) {
          const transportes = transportesByInstrucao[id] || [];
          const hasAllocation = transportes.some(
            (t) => normalizeText(t?.nome_transportadora || '') === normalizeText(selectedCarrier),
          );
          if (!hasAllocation) return false;
        }
        return (details.remaining ?? 0) > 0;
      }
      return !row.data_agendamento;
    })
    .map((row) => {
      const id = String(row.id);
      const produtor = lookups.pessoas[String(row.produtor_id)] || row.nome_vendedor_produtor || '-';
      const details = contractDetails[id] || { quantificationType: 'kg' };
      return {
        id,
        code: row.numero_instrucao || `INS-${row.id}`,
        subtitle: produtor,
        tipoProduto: normalizeProduto(row.tipo_produto),
        quantificationType: details.quantificationType,
      };
    });
}

const CANCELLABLE_PATIO_FASES = new Set(['aguardando_futuro', 'aguardando_chegada', 'fila_patio', '']);

function mapScheduledRows(agendamentos, instrucoesMap, lookups) {
  return agendamentos.map((agendamento) => {
    const instrucao = instrucoesMap[String(agendamento.instrucao_id)];
    if (!instrucao) return null;
    return {
      id: String(agendamento.id),
      instrucaoId: String(agendamento.instrucao_id),
      code: instrucao.numero_instrucao || `INS-${instrucao.id}`,
      producer: lookups.pessoas[String(instrucao.produtor_id)] || instrucao.nome_vendedor_produtor || '-',
      buyer: lookups.pessoas[String(instrucao.comprador_id)] || '-',
      appointmentDate: formatDisplayDate(agendamento.data_agendamento),
      branch: lookups.filiais[String(instrucao.filial_id)] || '-',
      driver: agendamento.nome_motorista || '-',
      truck: agendamento.placa_veiculo || '-',
      quantidade: Number(agendamento.quantidade || 0),
      canCancel: CANCELLABLE_PATIO_FASES.has(instrucao.patio_fase ?? '') && getPodeConfigurarCarga(),
    };
  }).filter(Boolean);
}

function matchesProductType(contract, selectedType) {
  if (!selectedType) return true;
  return normalizeProduto(contract?.tipoProduto) === normalizeProduto(selectedType);
}

function applyProductTypeFilter() {
  const selectedType = normalizeProduto(state.driverFields.find((field) => field.id === 'productType')?.value);
  state.availableContracts = state.allContracts.filter((contract) => {
    if (!matchesProductType(contract, selectedType)) return false;
    return !state.cargoContracts.some((cargo) => cargo.id === contract.id);
  });

  if (selectedType) {
    state.cargoContracts = state.cargoContracts.filter((cargo) => matchesProductType(cargo, selectedType));
  }
}

async function loadSchedulingData(page) {
  const [instrucoesRes, pessoasRes, filiaisRes, transportesRes, blocosRes, fardosRes, veiculosRes, categoriasRes, agendaRes, agendamentosRes] = await Promise.all([
    apiRequest('/instrucoes', { query: { page: 1, limit: 400, sort: 'created_at', order: 'desc' } }),
    apiRequest('/lookups/pessoas-empresas', { query: { limit: 500 } })
      .catch(() => apiRequest('/pessoas-empresas', { query: { limit: 500 } })),
    apiRequest('/lookups/filiais', { query: { limit: 200 } })
      .catch(() => apiRequest('/filiais', { query: { limit: 200 } })),
    apiRequest('/instrucoes-transportes', { query: { page: 1, limit: 5000 } }),
    apiRequest('/instrucoes-blocos', { query: { page: 1, limit: 5000 } }),
    apiRequest('/instrucoes-fardos', { query: { page: 1, limit: 10000 } }),
    apiRequest('/veiculos', { query: { page: 1, limit: 1000 } }).catch(() => ({ data: [] })),
    apiRequest('/categorias-pessoa-empresa', { query: { page: 1, limit: 500 } }).catch(() => ({ data: [] })),
    apiRequest('/agenda-disponibilidade', { query: { page: 1, limit: 5000 } }).catch(() => ({ data: [] })),
    apiRequest('/instrucoes-agendamentos', { query: { page: 1, limit: 5000 } }).catch(() => ({ data: [] })),
  ]);

  const instrucoes = parseApiResponse(instrucoesRes);
  const lookups = mapLookups(parseApiResponse(pessoasRes), parseApiResponse(filiaisRes));
  const transportesByInstrucao = mapByInstrucaoId(parseApiResponse(transportesRes));
  const blocosByInstrucao = mapByInstrucaoId(parseApiResponse(blocosRes));
  const fardosByBloco = mapFardosByBlocoId(parseApiResponse(fardosRes));
  state.vehicleCatalog = parseApiResponse(veiculosRes).map((row) => ({
    placa: String(row?.placa || '').toUpperCase(),
    descricao: String(row?.descricao || ''),
  })).filter((row) => row.placa);
  const categorias = parseApiResponse(categoriasRes);
  const motorista = categorias.find((item) => normalizeText(item?.nome).includes('motorista'));
  state.motoristaCategoryId = motorista?.id ? Number(motorista.id) : null;
  const transportadora = categorias.find((item) => normalizeText(item?.nome).includes('transportadora'));
  state.transportadoraCategoryId = transportadora?.id ? Number(transportadora.id) : null;
  state.transportesByInstrucao = transportesByInstrucao;
  state.agendaCatalog = parseApiResponse(agendaRes);

  const agendamentos = parseApiResponse(agendamentosRes).filter((a) => !a.deleted_at);
  const instrucoesMap = Object.fromEntries(instrucoes.map((i) => [String(i.id), i]));

  state.instrucoesRaw = instrucoes;
  state.blocosByInstrucao = blocosByInstrucao;
  state.fardosByBloco = fardosByBloco;
  state.lookupsCache = lookups;

  const selectedCarrier = String(state.driverFields.find((f) => f.id === 'carrierName')?.value || '').trim();
  state.contractDetails = buildContractDetails(instrucoes, transportesByInstrucao, blocosByInstrucao, fardosByBloco, selectedCarrier || null);
  state.allContracts = mapAvailableContracts(instrucoes, lookups, state.contractDetails, transportesByInstrucao, selectedCarrier || null);
  state.scheduleRows = mapScheduledRows(agendamentos, instrucoesMap, lookups);
  state.pagination.totalPages = Math.max(1, Math.ceil(Math.max(1, state.scheduleRows.length) / Math.max(1, state.pagination.itemsPerPage)));
  state.pagination.currentPage = Math.min(state.pagination.currentPage, state.pagination.totalPages);

  applyProductTypeFilter();
  renderPage(page);
}

function findAgendaDisponibilidade(dataAgendamentoIso, tipoProduto) {
  if (!dataAgendamentoIso || !tipoProduto) return null;
  const targetDate = String(dataAgendamentoIso).trim();
  const targetProduct = normalizeProduto(tipoProduto);
  return state.agendaCatalog.find((item) => (
    String(item?.data_carregamento || '').slice(0, 10) === targetDate
    && normalizeProduto(item?.tipo_produto) === targetProduct
    && normalizeText(item?.status) !== 'blocked'
  )) || null;
}

async function atualizarOcupacaoAgenda(agendaId, delta) {
  const id = Number(agendaId);
  if (!Number.isFinite(id) || id <= 0) return;
  const atual = await apiRequest(`/agenda-disponibilidade/${id}`);
  const row = atual?.data || atual;
  const vagasTotal = Number(row?.vagas_total || 0);
  const ocupadas = Number(row?.vagas_ocupadas || 0);
  const novaOcupacao = Math.max(0, Math.min(vagasTotal, ocupadas + Number(delta || 0)));
  await apiRequest(`/agenda-disponibilidade/${id}`, {
    method: 'PATCH',
    body: { vagas_ocupadas: novaOcupacao },
  });
}

async function ensureMotoristaCategoryId() {
  if (state.motoristaCategoryId) return state.motoristaCategoryId;
  try {
    const categoriasRes = await apiRequest('/categorias-pessoa-empresa', { query: { page: 1, limit: 500 } });
    const categorias = parseApiResponse(categoriasRes);
    const motorista = categorias.find((item) => normalizeText(item?.nome).includes('motorista'));
    state.motoristaCategoryId = motorista?.id ? Number(motorista.id) : null;
  } catch {
    state.motoristaCategoryId = null;
  }
  return state.motoristaCategoryId;
}

function updateVehiclePlateSuggestions(searchTerm) {
  const plateField = state.driverFields.find((field) => field.id === 'vehiclePlate');
  if (!plateField) return;

  const term = normalizeText(searchTerm);
  if (!term || term.length < 3) {
    plateField.suggestions = [];
    return;
  }

  const list = state.vehicleCatalog
    .filter((item) => normalizeText(item.placa).includes(term) || normalizeText(item.descricao).includes(term))
    .slice(0, 10)
    .map((item) => ({
      value: item.placa,
      label: `${item.placa} - ${item.descricao || 'Veiculo'}`,
    }));

  plateField.suggestions = list;
}

async function fetchVehiclePlateSuggestionsFromApi(searchTerm) {
  const plateField = state.driverFields.find((field) => field.id === 'vehiclePlate');
  if (!plateField) return;

  const term = normalizeText(searchTerm);
  if (!term || term.length < 3) {
    plateField.suggestions = [];
    return;
  }

  try {
    const payload = await apiRequest('/veiculos', {
      query: { page: 1, limit: 20, q: searchTerm },
    });

    const rows = parseApiResponse(payload).map((row) => ({
      placa: String(row?.placa || '').toUpperCase(),
      descricao: String(row?.descricao || ''),
    })).filter((row) => row.placa);

    const list = rows
      .filter((item) => normalizeText(item.placa).includes(term) || normalizeText(item.descricao).includes(term))
      .slice(0, 10)
      .map((item) => ({
        value: item.placa,
        label: `${item.placa} - ${item.descricao || 'Veiculo'}`,
      }));

    plateField.suggestions = list;
  } catch {
    // fallback local sem quebrar UX
    updateVehiclePlateSuggestions(searchTerm);
  }
}

function renderVehiclePlateSuggestionsInDom(page) {
  const plateInput = page.querySelector('#vehiclePlate');
  const wrapper = plateInput?.closest('.input-wrapper');
  if (!plateInput || !wrapper) return;

  let suggestionsContainer = wrapper.querySelector('[data-suggestions]');
  if (!suggestionsContainer) {
    suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'input-suggestions';
    suggestionsContainer.setAttribute('data-suggestions', '');
    wrapper.appendChild(suggestionsContainer);
  }

  const plateField = state.driverFields.find((field) => field.id === 'vehiclePlate');
  const suggestions = Array.isArray(plateField?.suggestions) ? plateField.suggestions : [];
  suggestionsContainer.innerHTML = suggestions
    .map((item, index) => `<div class="input-suggestion" data-action="vehicle-plate-suggestion" data-value="${item.value}" data-index="${index}">${item.label}</div>`)
    .join('');
  if (suggestions.length) suggestionsContainer.classList.add('is-visible');
  else suggestionsContainer.classList.remove('is-visible');

  suggestionsContainer.querySelectorAll('[data-action="vehicle-plate-suggestion"]').forEach((item) => {
    item.addEventListener('mousedown', (event) => {
      event.preventDefault();
      applyVehiclePlateSelection(page, item.getAttribute('data-value'));
    });
  });
}

function applyVehiclePlateSelection(page, value) {
  const plateInput = page.querySelector('#vehiclePlate');
  if (!plateInput) return;

  const selectedPlate = String(value || '').trim().toUpperCase();
  if (!selectedPlate) return;

  plateInput.value = selectedPlate;
  plateInput.dataset.confirmedValue = selectedPlate;
  const driverField = state.driverFields.find((field) => field.id === 'vehiclePlate');
  if (driverField) {
    driverField.value = selectedPlate;
    driverField.suggestions = [];
  }
  suppressVehicleLookupOnce = true;

  const suggestionsContainer = plateInput.closest('.input-wrapper')?.querySelector('[data-suggestions]');
  if (suggestionsContainer) {
    suggestionsContainer.classList.remove('is-visible');
    suggestionsContainer.innerHTML = '';
  }

  plateInput.dispatchEvent(new Event('input', { bubbles: true }));
  plateInput.dispatchEvent(new Event('change', { bubbles: true }));
}

async function fetchDriverSuggestionsFromApi(searchTerm) {
  const driverField = state.driverFields.find((field) => field.id === 'driverName');
  if (!driverField) return;

  const term = normalizeText(searchTerm);
  if (!term || term.length < 3) {
    driverField.suggestions = [];
    return;
  }

  const motoristaCategoryId = await ensureMotoristaCategoryId();
  if (!motoristaCategoryId) {
    driverField.suggestions = [];
    return;
  }

  const query = {
    q: searchTerm,
    search: searchTerm,
    limit: 50,
    'filter[categoria_id][eq]': motoristaCategoryId,
  };

  const payload = await apiRequest('/pessoas-empresas', { query });
  const rows = parseApiResponse(payload);
  const rowsFiltrados = rows.filter((row) => String(row?.categoria_id ?? '') === String(motoristaCategoryId));

  const suggestions = Array.from(new Set(rowsFiltrados
    .map((row) => String(row?.razao_social || row?.nome_fantasia || row?.nome_responsavel || '').trim())
    .filter((name) => name && normalizeText(name).includes(term))
  ))
    .slice(0, 10)
    .map((name) => ({ value: name, label: name }));

  driverField.suggestions = suggestions;
}

async function fetchCarrierSuggestionsFromApi(searchTerm) {
  const carrierField = state.driverFields.find((field) => field.id === 'carrierName');
  if (!carrierField) return;

  const term = normalizeText(searchTerm);
  if (!term || term.length < 3) {
    carrierField.suggestions = [];
    return;
  }

  const query = { q: searchTerm, search: searchTerm, limit: 50 };
  if (state.transportadoraCategoryId) {
    query['filter[categoria_id][eq]'] = state.transportadoraCategoryId;
  }

  const payload = await apiRequest('/pessoas-empresas', { query });
  const rows = parseApiResponse(payload);
  const filtered = state.transportadoraCategoryId
    ? rows.filter((row) => String(row?.categoria_id ?? '') === String(state.transportadoraCategoryId))
    : rows;

  const suggestions = Array.from(new Set(filtered
    .map((row) => String(row?.razao_social || row?.nome_fantasia || row?.nome_responsavel || '').trim())
    .filter((name) => name && normalizeText(name).includes(term))
  ))
    .slice(0, 10)
    .map((name) => ({ value: name, label: name }));

  carrierField.suggestions = suggestions;
}

function renderCarrierSuggestionsInDom(page) {
  const carrierInput = page.querySelector('#carrierName');
  const wrapper = carrierInput?.closest('.input-wrapper');
  if (!carrierInput || !wrapper) return;

  let suggestionsContainer = wrapper.querySelector('[data-suggestions]');
  if (!suggestionsContainer) {
    suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'input-suggestions';
    suggestionsContainer.setAttribute('data-suggestions', '');
    wrapper.appendChild(suggestionsContainer);
  }

  const carrierField = state.driverFields.find((field) => field.id === 'carrierName');
  const suggestions = Array.isArray(carrierField?.suggestions) ? carrierField.suggestions : [];
  suggestionsContainer.innerHTML = suggestions
    .map((item, index) => `<div class="input-suggestion" data-action="carrier-name-suggestion" data-value="${item.value}" data-index="${index}">${item.label}</div>`)
    .join('');
  if (suggestions.length) suggestionsContainer.classList.add('is-visible');
  else suggestionsContainer.classList.remove('is-visible');

  suggestionsContainer.querySelectorAll('[data-action="carrier-name-suggestion"]').forEach((item) => {
    item.addEventListener('mousedown', (event) => {
      event.preventDefault();
      applyCarrierSelection(page, item.getAttribute('data-value'));
    });
  });
}

function applyCarrierSelection(page, value) {
  const carrierInput = page.querySelector('#carrierName');
  if (!carrierInput) return;

  const selectedName = String(value || '').trim();
  carrierInput.value = selectedName;
  carrierInput.dataset.confirmedValue = selectedName;
  const carrierField = state.driverFields.find((field) => field.id === 'carrierName');
  if (carrierField) {
    carrierField.value = selectedName;
    carrierField.suggestions = [];
  }
  suppressCarrierLookupOnce = true;

  const suggestionsContainer = carrierInput.closest('.input-wrapper')?.querySelector('[data-suggestions]');
  if (suggestionsContainer) {
    suggestionsContainer.classList.remove('is-visible');
    suggestionsContainer.innerHTML = '';
  }

  recomputeContractsByCarrier(page);
}

function recomputeContractsByCarrier(page) {
  const selectedCarrier = String(state.driverFields.find((f) => f.id === 'carrierName')?.value || '').trim();
  if (!state.instrucoesRaw.length || !state.lookupsCache) {
    renderPage(page);
    return;
  }
  state.contractDetails = buildContractDetails(
    state.instrucoesRaw,
    state.transportesByInstrucao,
    state.blocosByInstrucao,
    state.fardosByBloco,
    selectedCarrier || null,
  );
  state.allContracts = mapAvailableContracts(
    state.instrucoesRaw,
    state.lookupsCache,
    state.contractDetails,
    state.transportesByInstrucao,
    selectedCarrier || null,
  );
  applyProductTypeFilter();
  renderPage(page);
}

function renderDriverSuggestionsInDom(page) {
  const driverInput = page.querySelector('#driverName');
  const wrapper = driverInput?.closest('.input-wrapper');
  if (!driverInput || !wrapper) return;

  let suggestionsContainer = wrapper.querySelector('[data-suggestions]');
  if (!suggestionsContainer) {
    suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'input-suggestions';
    suggestionsContainer.setAttribute('data-suggestions', '');
    wrapper.appendChild(suggestionsContainer);
  }

  const driverField = state.driverFields.find((field) => field.id === 'driverName');
  const suggestions = Array.isArray(driverField?.suggestions) ? driverField.suggestions : [];
  suggestionsContainer.innerHTML = suggestions
    .map((item, index) => `<div class="input-suggestion" data-action="driver-name-suggestion" data-value="${item.value}" data-index="${index}">${item.label}</div>`)
    .join('');
  if (suggestions.length) suggestionsContainer.classList.add('is-visible');
  else suggestionsContainer.classList.remove('is-visible');

  suggestionsContainer.querySelectorAll('[data-action="driver-name-suggestion"]').forEach((item) => {
    item.addEventListener('mousedown', (event) => {
      event.preventDefault();
      applyDriverSelection(page, item.getAttribute('data-value'));
    });
  });
}

function applyDriverSelection(page, value) {
  const driverInput = page.querySelector('#driverName');
  if (!driverInput) return;

  const selectedName = String(value || '').trim();
  if (!selectedName) return;

  driverInput.value = selectedName;
  driverInput.dataset.confirmedValue = selectedName;
  const driverField = state.driverFields.find((field) => field.id === 'driverName');
  if (driverField) {
    driverField.value = selectedName;
    driverField.suggestions = [];
  }
  suppressDriverLookupOnce = true;

  const suggestionsContainer = driverInput.closest('.input-wrapper')?.querySelector('[data-suggestions]');
  if (suggestionsContainer) {
    suggestionsContainer.classList.remove('is-visible');
    suggestionsContainer.innerHTML = '';
  }

  driverInput.dispatchEvent(new Event('input', { bubbles: true }));
  driverInput.dispatchEvent(new Event('change', { bubbles: true }));
}

function syncContractTotals(contract) {
  contract.totals.blocks = contract.blocks.length;
  contract.totals.bales = contract.quantificationType === 'kg'
    ? 0
    : contract.blocks.reduce((total, block) => total + block.bales.filter((item) => item.selected).length, 0);
}

function getCargoContract(contractId) {
  return state.cargoContracts.find((contract) => contract.id === contractId);
}

function getBlock(contractId, blockId) {
  return getCargoContract(contractId)?.blocks.find((block) => block.id === blockId);
}

function renderTabs() {
  const tabsContainer = document.getElementById('patio-scheduling-tabs');
  renderControlePatioTabs(tabsContainer, 'appointments');
}

function renderSections() {
  const driverContainer = document.getElementById('patio-scheduling-driver');
  const dateContainer = document.getElementById('patio-scheduling-date');
  const contractsContainer = document.getElementById('patio-scheduling-contracts');
  const tableContainer = document.getElementById('patio-scheduling-table');

  if (driverContainer) driverContainer.innerHTML = renderDriverSection(state.driverFields);
  const selectedProduct = state.driverFields.find((f) => f.id === 'productType')?.value || '';
  if (dateContainer) dateContainer.innerHTML = renderDateSection(state.appointmentDate, state.agendaCatalog, selectedProduct, state.calendarMonth);
  if (contractsContainer) contractsContainer.innerHTML = renderContractsSection(state, getPodeConfigurarCarga());
  if (tableContainer) tableContainer.innerHTML = renderTableSection(state.scheduleRows, state.pagination);
}

function hydrateInputs(page) {
  cleanupInputs?.();
  cleanupInputs = Input.init(page);
  Checkbox.init(page);
}

function renderPage(page) {
  renderTabs();
  renderSections();
  hydrateInputs(page);
  applyCarrierLock(page);
}

function applyCarrierLock(page) {
  const autoFill = getCarrierAutoFill();
  if (!autoFill) return;
  const input = page?.querySelector('#carrierName');
  if (!input) return;
  input.value = autoFill;
  input.setAttribute('readonly', '');
  input.style.background = 'var(--color-surface-secondary, #f5f5f5)';
  input.style.cursor = 'not-allowed';
  input.style.color = 'var(--color-content-secondary)';
  const carrierField = state.driverFields.find((f) => f.id === 'carrierName');
  if (carrierField) carrierField.value = autoFill;
}

function addContractToCargo(contractId, page) {
  const contractIndex = state.availableContracts.findIndex((item) => item.id === contractId);
  if (contractIndex < 0) return;

  const [contract] = state.availableContracts.splice(contractIndex, 1);
  const detail = state.contractDetails[String(contractId)] || { quantificationType: contract.quantificationType, blocks: [] };
  const detailCopy = { ...detail, blocks: detail.blocks.map((b) => ({ ...b })) };
  state.cargoContracts.push(createCargoContract(contract, detailCopy));
  renderPage(page);
}

function removeContractFromCargo(contractId, page) {
  const contractIndex = state.cargoContracts.findIndex((item) => item.id === contractId);
  if (contractIndex < 0) return;

  state.cargoContracts.splice(contractIndex, 1);
  applyProductTypeFilter();
  renderPage(page);
}

function toggleBlockExpanded(contractId, blockId, page) {
  const contract = getCargoContract(contractId);
  const block = getBlock(contractId, blockId);
  if (!contract || !block || contract.quantificationType === 'kg') return;

  block.isExpanded = !block.isExpanded;
  renderPage(page);
}

function updateBlockSelection(contractId, blockId, selected, page) {
  const contract = getCargoContract(contractId);
  const block = getBlock(contractId, blockId);
  if (!contract || !block || contract.quantificationType === 'kg') return;

  block.selected = selected;
  if (!selected) block.isExpanded = false;

  syncContractTotals(contract);
  renderPage(page);
}

function updateBlockQuantity(contractId, blockId, quantity, page) {
  const contract = getCargoContract(contractId);
  const block = getBlock(contractId, blockId);
  if (!contract || !block) return;

  if (contract.quantificationType === 'kg') {
    const value = parseNumber(quantity);
    const clamped = Math.max(0, Math.min(Number(block.max || 0), value));
    block.quantityValue = clamped ? clamped.toLocaleString('pt-BR') : '';
    renderPage(page);
    return;
  }

  const parsedValue = Number.parseInt(quantity, 10);
  if (Number.isNaN(parsedValue)) return;
  block.quantity = Math.max(0, Math.min(block.max, parsedValue));
  syncContractTotals(contract);
  renderPage(page);
}

function toggleBale(contractId, blockId, baleId, page) {
  const contract = getCargoContract(contractId);
  const block = getBlock(contractId, blockId);
  const bale = block?.bales.find((item) => item.id === baleId);
  if (!contract || !block || !bale || contract.quantificationType === 'kg') return;

  bale.selected = !bale.selected;
  syncContractTotals(contract);
  renderPage(page);
}

function updateEntries(value, page) {
  const parsedValue = Number.parseInt(value, 10);
  if (Number.isNaN(parsedValue)) return;

  state.pagination.itemsPerPage = parsedValue;
  state.pagination.currentPage = 1;
  state.pagination.totalPages = Math.max(1, Math.ceil(Math.max(1, state.scheduleRows.length) / Math.max(1, parsedValue)));
  renderPage(page);
}

function updateCurrentPage(value, page) {
  const parsedValue = Number.parseInt(value, 10);
  if (Number.isNaN(parsedValue)) return;

  state.pagination.currentPage = Math.min(state.pagination.totalPages, Math.max(1, parsedValue));
  renderPage(page);
}

function isPositiveNumber(value) {
  return Number.isFinite(value) && value > 0;
}

function toNumericId(value) {
  const parsed = Number.parseInt(String(value || ''), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

async function persistContractQuantities(contract) {
  if (!contract || normalizeProduto(contract.quantificationType) !== 'kg') return null;

  const blocks = Array.isArray(contract.blocks) ? contract.blocks : [];
  const preparedBlocks = blocks.map((block) => {
    const value = parseNumber(block?.quantityValue || 0);
    const max = Number(block?.max || 0);
    const quantity = max > 0 ? Math.max(0, Math.min(max, value)) : Math.max(0, value);
    return { block, quantity };
  });

  const total = preparedBlocks.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  if (!isPositiveNumber(total)) {
    throw new Error(`Informe a Quantidade do contrato ${contract.code || contract.id} para confirmar o agendamento.`);
  }

  const transportUpdates = preparedBlocks
    .filter((item) => isPositiveNumber(item.quantity))
    .map(({ block, quantity }) => {
      const transporteId = toNumericId(block?.id);
      if (!transporteId) return null;
      return apiRequest(`/instrucoes-transportes/${transporteId}`, {
        method: 'PATCH',
        body: { quantidade: quantity },
      });
    })
    .filter(Boolean);

  if (transportUpdates.length) {
    await Promise.all(transportUpdates);
  }

  return total;
}

async function persistScheduling(page) {
  const apiDate = toApiDate(state.appointmentDate.value);
  const carrier = String(state.driverFields.find((field) => field.id === 'carrierName')?.value || '').trim();
  const driver = String(state.driverFields.find((field) => field.id === 'driverName')?.value || '').trim();
  const truck = String(state.driverFields.find((field) => field.id === 'vehiclePlate')?.value || '').trim().toUpperCase();
  const selectedType = normalizeProduto(state.driverFields.find((field) => field.id === 'productType')?.value);

  if (!truck) throw new Error('Informe a placa do veiculo.');
  if (!driver) throw new Error('Informe o nome do motorista.');
  if (!selectedType) throw new Error('Selecione o tipo de produto.');
  if (!apiDate) throw new Error('Selecione uma data valida para o agendamento.');
  if (!state.cargoContracts.length) throw new Error('Selecione ao menos um contrato para agendar.');

  const agenda = findAgendaDisponibilidade(apiDate, selectedType);
  if (!agenda) {
    throw new Error('Não há agenda liberada para esta data e produto.');
  }

  const vagasTotal = Number(agenda?.vagas_total || 0);
  const vagasOcupadas = Number(agenda?.vagas_ocupadas || 0);
  const vagasLivres = Math.max(0, vagasTotal - vagasOcupadas);
  if (vagasLivres < state.cargoContracts.length) {
    throw new Error(`Vagas insuficientes para esta data/produto. Disponível: ${vagasLivres}.`);
  }

  const updates = state.cargoContracts
    .map(async (contract) => {
      const id = Number(contract?.id);
      if (!Number.isFinite(id) || id <= 0) return null;
      const quantidadeTotalKg = await persistContractQuantities(contract);
      const details = state.contractDetails[String(contract.id)];
      const novaQtdAgendada = Math.max(0, (details?.quantidadeAgendada ?? 0) + (quantidadeTotalKg ?? 0));

      await apiRequest('/instrucoes-agendamentos', {
        method: 'POST',
        body: {
          instrucao_id: id,
          data_agendamento: apiDate,
          nome_motorista: driver,
          placa_veiculo: truck,
          quantidade: quantidadeTotalKg ?? 0,
          ...(carrier ? { nome_transportadora: carrier } : {}),
        },
      });

      return apiRequest(`/instrucoes/${id}`, {
        method: 'PATCH',
        body: {
          ...(quantidadeTotalKg != null ? { quantidade_agendada: novaQtdAgendada } : {}),
          data_agendamento: apiDate,
          nome_motorista: driver,
          placa_veiculo: truck,
        },
      });
    })
    .filter(Boolean);

  if (!updates.length) return;
  await Promise.all(updates);
  await atualizarOcupacaoAgenda(agenda.id, state.cargoContracts.length);

  state.driverFields.forEach((field) => {
    field.value = '';
    if (Array.isArray(field.suggestions)) field.suggestions = [];
  });
  state.appointmentDate.value = '';
  state.cargoContracts = [];

  await loadSchedulingData(page);
}

async function cancelScheduling(agendamentoId, page) {
  const id = Number(agendamentoId);
  if (!Number.isFinite(id) || id <= 0) return;

  const agendamentoRes = await apiRequest(`/instrucoes-agendamentos/${id}`);
  const agendamento = agendamentoRes?.data || agendamentoRes;
  const instrucaoId = Number(agendamento?.instrucao_id);
  const quantidadeCancelada = Math.max(0, Number(agendamento?.quantidade || 0));

  await apiRequest(`/instrucoes-agendamentos/${id}`, {
    method: 'PATCH',
    body: { deleted_at: new Date().toISOString() },
  });

  if (instrucaoId > 0) {
    const instruRes = await apiRequest(`/instrucoes/${instrucaoId}`);
    const instrucao = instruRes?.data || instruRes;
    const currentAgendada = Math.max(0, Number(instrucao?.quantidade_agendada || 0));
    const novaAgendada = Math.max(0, currentAgendada - quantidadeCancelada);

    await apiRequest(`/instrucoes/${instrucaoId}`, {
      method: 'PATCH',
      body: { quantidade_agendada: novaAgendada },
    });

    const agenda = findAgendaDisponibilidade(agendamento?.data_agendamento, instrucao?.tipo_produto);
    if (agenda?.id) {
      await atualizarOcupacaoAgenda(agenda.id, -1);
    }
  }

  await loadSchedulingData(page);
}

async function handleClick(event) {
  const page = event.currentTarget;

  const carrierSuggestion = event.target.closest('[data-action="carrier-name-suggestion"]');
  if (carrierSuggestion) {
    event.preventDefault();
    applyCarrierSelection(page, carrierSuggestion.getAttribute('data-value'));
    return;
  }

  const driverSuggestion = event.target.closest('[data-action="driver-name-suggestion"]');
  if (driverSuggestion) {
    event.preventDefault();
    applyDriverSelection(page, driverSuggestion.getAttribute('data-value'));
    return;
  }

  const vehicleSuggestion = event.target.closest('[data-action="vehicle-plate-suggestion"]');
  if (vehicleSuggestion) {
    event.preventDefault();
    applyVehiclePlateSelection(page, vehicleSuggestion.getAttribute('data-value'));
    return;
  }

  const calendarDay = event.target.closest('[data-action="calendar-day"]');
  if (calendarDay) {
    if (calendarDay.classList.contains('sched-cal__cell--red')) return;
    const iso = calendarDay.getAttribute('data-date');
    if (iso) {
      state.appointmentDate.value = iso;
      renderPage(page);
    }
    return;
  }

  if (event.target.closest('[data-action="calendar-prev-month"]')) {
    let { year, month } = state.calendarMonth;
    month -= 1;
    if (month < 0) { month = 11; year -= 1; }
    state.calendarMonth = { year, month };
    renderPage(page);
    return;
  }

  if (event.target.closest('[data-action="calendar-next-month"]')) {
    let { year, month } = state.calendarMonth;
    month += 1;
    if (month > 11) { month = 0; year += 1; }
    state.calendarMonth = { year, month };
    renderPage(page);
    return;
  }

  const addContractButton = event.target.closest('[data-action="add-contract"]');
  if (addContractButton) {
    addContractToCargo(addContractButton.dataset.contractId, page);
    return;
  }

  const removeContractButton = event.target.closest('[data-action="remove-contract"]');
  if (removeContractButton) {
    removeContractFromCargo(removeContractButton.dataset.contractId, page);
    return;
  }

  const toggleBlockButton = event.target.closest('[data-action="toggle-block"]');
  if (toggleBlockButton) {
    toggleBlockExpanded(toggleBlockButton.dataset.contractId, toggleBlockButton.dataset.blockId, page);
    return;
  }

  const baleButton = event.target.closest('[data-action="toggle-bale"]');
  if (baleButton) {
    toggleBale(baleButton.dataset.contractId, baleButton.dataset.blockId, baleButton.dataset.baleId, page);
    return;
  }

  const paginationButton = event.target.closest('.patio-scheduling__table-footer [data-page]');
  if (paginationButton && !paginationButton.disabled) {
    updateCurrentPage(paginationButton.dataset.page, page);
    return;
  }

  const primaryButton = event.target.closest('[data-action="confirm-scheduling"]');
  if (primaryButton) {
    if (!getPodeConfigurarCarga()) return;
    persistScheduling(page).catch((error) => {
      console.error('[controle-patio/agendamentos] falha ao confirmar agendamento', error);
      alert(error?.message || 'Nao foi possivel confirmar o agendamento.');
    });
    return;
  }

  const tableAction = event.target.closest('[data-action="loading-order"], [data-action="cancel-scheduling"]');
  if (tableAction && tableAction.dataset.action === 'cancel-scheduling') {
    if (!getPodeConfigurarCarga()) return;
    cancelScheduling(tableAction.dataset.rowId, page).catch((error) => {
      console.error('[controle-patio/agendamentos] falha ao cancelar agendamento', error);
      alert(error?.message || 'Nao foi possivel cancelar o agendamento.');
    });
  }
}

function handleInput(event) {
  const page = event.currentTarget;
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;

  if (target.id === state.appointmentDate.id) {
    state.appointmentDate.value = target.value;
    return;
  }

  if (target.matches('[data-action="update-block-quantity"], [data-action="update-kg-quantity"]')) {
    const contractId = target.dataset.contractId;
    const blockId = target.dataset.blockId;
    const action = target.dataset.action;
    const selStart = target.selectionStart;
    const selEnd = target.selectionEnd;
    updateBlockQuantity(contractId, blockId, target.value, page);
    const newTarget = page.querySelector(`[data-action="${action}"][data-contract-id="${contractId}"][data-block-id="${blockId}"]`);
    if (newTarget) {
      newTarget.focus();
      try { newTarget.setSelectionRange(selStart, selEnd); } catch (_) { }
    }
  }

  const driverField = state.driverFields.find((field) => field.id === target.id);
  const isCarrierNameField = target.id === 'carrierName' || target.name === 'carrierName';
  const isDriverNameField = target.id === 'driverName' || target.name === 'driverName';
  const isVehiclePlateField = target.id === 'vehiclePlate' || target.name === 'vehiclePlate';

  if (event.isTrusted) {
    if (isCarrierNameField) delete target.dataset.confirmedValue;
    if (isDriverNameField) delete target.dataset.confirmedValue;
    if (isVehiclePlateField) delete target.dataset.confirmedValue;
  }

  if (isCarrierNameField) {
    if (getCarrierAutoFill()) return;
    if (driverField) driverField.value = target.value;
    if (suppressCarrierLookupOnce) {
      suppressCarrierLookupOnce = false;
      return;
    }
    if (carrierLookupTimer) clearTimeout(carrierLookupTimer);
    const typedValue = target.value;
    carrierLookupTimer = setTimeout(() => {
      fetchCarrierSuggestionsFromApi(typedValue)
        .then(() => renderCarrierSuggestionsInDom(page))
        .catch(() => renderCarrierSuggestionsInDom(page));
    }, 220);
    return;
  }

  if (isDriverNameField && !driverField) {
    if (suppressDriverLookupOnce) {
      suppressDriverLookupOnce = false;
      return;
    }
    if (driverLookupTimer) clearTimeout(driverLookupTimer);
    const typedValue = target.value;
    driverLookupTimer = setTimeout(() => {
      fetchDriverSuggestionsFromApi(typedValue)
        .then(() => renderDriverSuggestionsInDom(page))
        .catch(() => renderDriverSuggestionsInDom(page));
    }, 220);
    return;
  }

  if (isVehiclePlateField && !driverField) {
    if (suppressVehicleLookupOnce) {
      suppressVehicleLookupOnce = false;
      return;
    }
    if (vehicleLookupTimer) clearTimeout(vehicleLookupTimer);
    const typedValue = target.value;
    vehicleLookupTimer = setTimeout(() => {
      fetchVehiclePlateSuggestionsFromApi(typedValue)
        .then(() => renderVehiclePlateSuggestionsInDom(page))
        .catch(() => renderVehiclePlateSuggestionsInDom(page));
    }, 220);
    return;
  }

  if (driverField) {
    driverField.value = target.value;
    if (driverField.id === 'driverName') {
      if (suppressDriverLookupOnce) {
        suppressDriverLookupOnce = false;
        return;
      }
      if (driverLookupTimer) clearTimeout(driverLookupTimer);
      const typedValue = target.value;
      driverLookupTimer = setTimeout(() => {
        fetchDriverSuggestionsFromApi(typedValue)
          .then(() => renderDriverSuggestionsInDom(page))
          .catch(() => renderDriverSuggestionsInDom(page));
      }, 220);
      return;
    }
    if (driverField.id === 'vehiclePlate') {
      if (suppressVehicleLookupOnce) {
        suppressVehicleLookupOnce = false;
        return;
      }
      if (vehicleLookupTimer) clearTimeout(vehicleLookupTimer);
      const typedValue = target.value;
      vehicleLookupTimer = setTimeout(() => {
        fetchVehiclePlateSuggestionsFromApi(typedValue)
          .then(() => renderVehiclePlateSuggestionsInDom(page))
          .catch(() => renderVehiclePlateSuggestionsInDom(page));
      }, 220);
      return;
    }
    if (driverField.id === 'productType') {
      applyProductTypeFilter();
      renderPage(page);
    }
  }
}

function handleChange(event) {
  const page = event.currentTarget;
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;

  if (target.matches('[data-action="toggle-block-selection"]')) {
    updateBlockSelection(target.dataset.contractId, target.dataset.blockId, target.checked, page);
    return;
  }

  if (target.matches('[data-action="entries-change"]')) {
    updateEntries(target.value, page);
  }
}

export function init() {
  const page = document.querySelector('.patio-scheduling-page');
  if (!page) return () => { };

  if (activeController) activeController.abort();
  activeController = new AbortController();

  const fresh = createAgendamentosState();
  state.driverFields = fresh.driverFields;
  state.appointmentDate = fresh.appointmentDate;
  state.cargoContracts = [];
  state.availableContracts = [];

  const autoFillCarrier = getCarrierAutoFill();
  if (autoFillCarrier) {
    const carrierField = state.driverFields.find((f) => f.id === 'carrierName');
    if (carrierField) {
      carrierField.value = autoFillCarrier;
      carrierField.required = false;
    }
  }

  cleanupTabs = initControlePatioTabs(page);
  renderPage(page);

  loadSchedulingData(page).catch((error) => {
    console.error('[controle-patio/agendamentos] falha ao carregar dados', error);
  });

  page.addEventListener('click', handleClick);
  page.addEventListener('input', handleInput);
  page.addEventListener('change', handleChange);
  page.addEventListener('blur', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.id === 'vehiclePlate') {
      setTimeout(() => {
        if (target.dataset.confirmedValue === undefined || target.value !== target.dataset.confirmedValue) {
          target.value = '';
          delete target.dataset.confirmedValue;
          const field = state.driverFields.find((f) => f.id === 'vehiclePlate');
          if (field) { field.value = ''; field.suggestions = []; }
          renderVehiclePlateSuggestionsInDom(page);
        }
      }, 200);
    }
    if (target.id === 'driverName') {
      setTimeout(() => {
        if (target.dataset.confirmedValue === undefined || target.value !== target.dataset.confirmedValue) {
          target.value = '';
          delete target.dataset.confirmedValue;
          const field = state.driverFields.find((f) => f.id === 'driverName');
          if (field) { field.value = ''; field.suggestions = []; }
          renderDriverSuggestionsInDom(page);
        }
      }, 200);
    }
    if (target.id === 'carrierName') {
      if (getCarrierAutoFill()) return;
      setTimeout(() => {
        const field = state.driverFields.find((f) => f.id === 'carrierName');
        if (target.dataset.confirmedValue === undefined || target.value !== target.dataset.confirmedValue) {
          target.value = '';
          delete target.dataset.confirmedValue;
          if (field) { field.value = ''; field.suggestions = []; }
          renderCarrierSuggestionsInDom(page);
          recomputeContractsByCarrier(page);
        }
      }, 200);
    }
  }, true);

  return () => {
    page.removeEventListener('click', handleClick);
    page.removeEventListener('input', handleInput);
    page.removeEventListener('change', handleChange);
    cleanupTabs?.();
    cleanupInputs?.();
    if (vehicleLookupTimer) {
      clearTimeout(vehicleLookupTimer);
      vehicleLookupTimer = null;
    }
    if (driverLookupTimer) {
      clearTimeout(driverLookupTimer);
      driverLookupTimer = null;
    }
    if (carrierLookupTimer) {
      clearTimeout(carrierLookupTimer);
      carrierLookupTimer = null;
    }
    if (activeController) {
      activeController.abort();
      activeController = null;
    }
  };
}
