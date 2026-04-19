import { initPatioVehicleDrawer } from '../patio/vehicle-drawer.js';
import {
  createVehicleFormFromRecord,
  createVehicleRecordFromForm,
  createVehiclesState,
} from './veiculos.data.js';
import { renderVehiclesPage } from './veiculos.templates.js';

const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.tawros.com.br/api/v1';
const state = createVehiclesState();
let vehicleDrawer = null;
let activeController = null;

function getVehicleById(vehicleId) {
  return state.vehicles.find((vehicle) => String(vehicle.id) === String(vehicleId)) || null;
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
      if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, String(value));
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
  if (!response.ok) throw new Error(payload?.message || `Falha na requisicao (${response.status})`);
  return payload;
}

function renderPage(page) {
  const primaryAction = page.querySelector('#patio-vehicles-primary-action');
  const list = page.querySelector('#patio-vehicles-list');
  if (!primaryAction || !list) return;

  const view = renderVehiclesPage(state);
  primaryAction.innerHTML = view.actionButton;
  list.innerHTML = view.listContent;
}

function normalizePessoaLabel(row) {
  return row?.razao_social || row?.nome_fantasia || row?.nome_responsavel || row?.cpf_cnpj || `Pessoa ${row?.id ?? ''}`;
}

function normalizeCategoriaNome(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function detectCategoriaIds(categorias = []) {
  let transportadoraId = null;
  let motoristaId = null;

  categorias.forEach((row) => {
    const nome = normalizeCategoriaNome(row?.nome);
    if (!transportadoraId && nome.includes('transport')) transportadoraId = row.id;
    if (!motoristaId && nome.includes('motorist')) motoristaId = row.id;
  });

  return { transportadoraId, motoristaId };
}

function buildDrawerLookups(pessoas = [], categoriaIds = {}) {
  const transportadoras = [];
  const motoristas = [];

  pessoas.forEach((row) => {
    const label = normalizePessoaLabel(row);
    const item = { id: String(row.id), label };
    const categoriaId = String(row?.categoria_id || '');
    if (categoriaIds.transportadoraId && categoriaId === String(categoriaIds.transportadoraId)) transportadoras.push(item);
    if (categoriaIds.motoristaId && categoriaId === String(categoriaIds.motoristaId)) motoristas.push(item);
  });

  state.drawer.lookups = { transportadoras, motoristas };
}

function buildVehicleList(veiculos = [], vinculos = [], documentos = []) {
  const vinculosByVeiculo = vinculos.reduce((acc, row) => {
    const key = String(row?.veiculo_id || '');
    if (!key) return acc;
    if (!acc[key]) acc[key] = [];
    acc[key].push(String(row.pessoa_empresa_id));
    return acc;
  }, {});

  const documentosByVeiculo = documentos.reduce((acc, row) => {
    const key = String(row?.veiculo_id || '');
    if (!key) return acc;
    if (!acc[key]) acc[key] = [];
    acc[key].push({
      id: String(row.id),
      name: String(row.nome_arquivo || 'Documento'),
      size: Number(row.tamanho_bytes || 0),
    });
    return acc;
  }, {});

  return veiculos.map((row) => ({
    id: String(row.id),
    grupo: row.grupo,
    descricao: row.descricao,
    placa: row.placa,
    marca: row.marca,
    modelo: row.modelo,
    cargaMaxima: Number(row.carga_maxima_kg || 0).toLocaleString('pt-BR', { maximumFractionDigits: 3 }),
    cargaMaximaKg: Number(row.carga_maxima_kg || 0),
    vinculoTipo: row.vinculo_tipo === 'motoristas' ? 'motoristas' : 'transportadoras',
    vinculoIds: vinculosByVeiculo[String(row.id)] || [],
    documentoFiles: documentosByVeiculo[String(row.id)] || [],
  }));
}

async function loadVehicles(page) {
  const [veiculosRes, vinculosRes, documentosRes, pessoasRes, categoriasRes] = await Promise.all([
    apiRequest('/veiculos', { query: { page: 1, limit: 500, sort: 'created_at', order: 'desc' } }),
    apiRequest('/veiculos-vinculos', { query: { page: 1, limit: 5000 } }),
    apiRequest('/veiculos-documentos', { query: { page: 1, limit: 5000 } }),
    apiRequest('/pessoas-empresas', { query: { page: 1, limit: 1000 } }),
    apiRequest('/categorias-pessoa-empresa', { query: { page: 1, limit: 200 } }),
  ]);

  const categoriaIds = detectCategoriaIds(parseApiResponse(categoriasRes));
  buildDrawerLookups(parseApiResponse(pessoasRes), categoriaIds);
  state.vehicles = buildVehicleList(
    parseApiResponse(veiculosRes),
    parseApiResponse(vinculosRes),
    parseApiResponse(documentosRes),
  );

  renderPage(page);
}

function openDrawer(params = {}) {
  state.editingVehicleId = params.vehicleId || null;
  state.drawer.form = params.form || createVehicleFormFromRecord(getVehicleById(state.editingVehicleId));

  vehicleDrawer?.open({
    triggerEl: params.triggerEl || null,
    form: state.drawer.form,
    groupOptions: state.drawer.groupOptions,
    lookups: state.drawer.lookups,
  });
}

async function replaceVehicleChildren(vehicleId, payload) {
  const [currentVinculosRes, currentDocsRes] = await Promise.all([
    apiRequest('/veiculos-vinculos', { query: { page: 1, limit: 500, veiculo_id: vehicleId } }),
    apiRequest('/veiculos-documentos', { query: { page: 1, limit: 500, veiculo_id: vehicleId } }),
  ]);

  const currentVinculos = parseApiResponse(currentVinculosRes);
  const currentDocs = parseApiResponse(currentDocsRes);

  for (const row of currentVinculos) {
    await apiRequest(`/veiculos-vinculos/${row.id}`, { method: 'DELETE' });
  }

  for (const row of currentDocs) {
    await apiRequest(`/veiculos-documentos/${row.id}`, { method: 'DELETE' });
  }

  if (Array.isArray(payload.vinculoIds) && payload.vinculoIds.length) {
    await apiRequest('/veiculos-vinculos/bulk-create', {
      method: 'POST',
      body: payload.vinculoIds.map((id) => ({
        veiculo_id: Number(vehicleId),
        pessoa_empresa_id: Number(id),
      })),
    });
  }

  if (Array.isArray(payload.documentoFiles) && payload.documentoFiles.length) {
    const file = payload.documentoFiles[0];
    await apiRequest('/veiculos-documentos', {
      method: 'POST',
      body: {
        veiculo_id: Number(vehicleId),
        nome_arquivo: String(file.name || 'documento-veiculo.pdf'),
        tamanho_bytes: Number(file.size || 0),
        ordem: 1,
      },
    });
  }
}

async function handleSave(form) {
  const payload = createVehicleRecordFromForm(form, state.editingVehicleId);
  const baseData = {
    grupo: payload.grupo,
    descricao: payload.descricao,
    placa: payload.placa,
    marca: payload.marca,
    modelo: payload.modelo,
    carga_maxima_kg: payload.cargaMaximaKg,
    vinculo_tipo: payload.vinculoTipo,
    ativo: true,
  };

  let vehicleId = state.editingVehicleId;
  if (vehicleId) {
    await apiRequest(`/veiculos/${vehicleId}`, { method: 'PATCH', body: baseData });
  } else {
    const created = await apiRequest('/veiculos', { method: 'POST', body: baseData });
    vehicleId = String(created?.data?.id || '');
  }

  if (!vehicleId) throw new Error('Nao foi possivel identificar o veiculo salvo.');
  await replaceVehicleChildren(vehicleId, payload);
  state.editingVehicleId = null;

  const page = document.querySelector('.patio-vehicles-page');
  if (page) await loadVehicles(page);
}

function handleClick(event) {
  const trigger = event.target.closest('[data-action]');
  if (!trigger) return;

  if (trigger.dataset.action === 'new-vehicle') {
    openDrawer({
      triggerEl: trigger,
      form: createVehicleFormFromRecord(null),
    });
    return;
  }

  if (trigger.dataset.action === 'edit-vehicle') {
    openDrawer({
      triggerEl: trigger,
      vehicleId: trigger.dataset.vehicleId,
      form: createVehicleFormFromRecord(getVehicleById(trigger.dataset.vehicleId)),
    });
  }
}

export function init() {
  const page = document.querySelector('.patio-vehicles-page');
  if (!page) return () => { };

  if (activeController) activeController.abort();
  activeController = new AbortController();

  vehicleDrawer?.cleanup?.();
  vehicleDrawer = initPatioVehicleDrawer({
    onSave: (form) => {
      handleSave(form).catch((error) => {
        console.error('[controle-patio/veiculos] falha ao salvar veiculo', error);
        alert(error?.message || 'Nao foi possivel salvar o veiculo.');
      });
    },
    onClose: () => {
      state.editingVehicleId = null;
    },
  });

  renderPage(page);
  loadVehicles(page).catch((error) => {
    console.error('[controle-patio/veiculos] falha ao carregar veiculos', error);
  });

  page.addEventListener('click', handleClick);

  return () => {
    page.removeEventListener('click', handleClick);
    vehicleDrawer?.cleanup?.();
    vehicleDrawer = null;
    if (activeController) {
      activeController.abort();
      activeController = null;
    }
  };
}

export default { init };
