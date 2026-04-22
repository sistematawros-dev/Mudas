import { createCadastroPessoaEmpresaMarkup } from './cadastroPessoaEmpresa.js';
import {
  formatPhone, formatCep, formatCpfCnpj,
  isValidEmail, isValidPhone, isValidCep, isValidCpfCnpj,
  normalizeDigits,
} from '../../utils/validators.js';
import { createCadastroProdutosServicosMarkup } from './cadastroProdutosServicos.js';
import { createCadastroEmbalagensMarkup } from './cadastroEmbalagens.js';
import { createClassificacaoProdutosServicosMarkup } from './classificacaoProdutosServicos.js';
import { initGrupoEmpresaDrawer } from '../../components/grupo-empresa/grupoEmpresaDrawer.js';
import { initClasseProdutosDrawer } from '../../components/classificacao/classeProdutosDrawer.js';
import { initSelecionarClasseDrawer } from '../../components/classificacao/selecionarClasseDrawer.js';
import { initRamoDrawer } from '../../components/pessoas-empresas/ramoDrawer.js';
import { initCategoriaDrawer } from '../../components/pessoas-empresas/categoriaDrawer.js';
import { initPessoasEmpresasFiltrosDrawer } from '../../components/pessoas-empresas/pessoasEmpresasFiltrosDrawer.js';
import { initProdutosFiltrosDrawer } from '../../components/produtos-servicos/produtosFiltrosDrawer.js';
import { initProdutoServicoVerDrawer } from '../../components/produtos-servicos/produtoServicoVerDrawer.js';

export function init() {
  const appHeader = document.getElementById('app-header');
  if (appHeader) appHeader.classList.add('header--kanban-compact-tabs');

  const page = document.querySelector('.cadastros-page');
  const listHeader = document.getElementById('cadastros-list-header');
  const listCard = document.getElementById('cadastros-list-card');
  const cadastroContainer = document.getElementById('cadastro-pessoa-empresa-container');
  const filtersSection = document.querySelector('.cadastros-filters');
  const tableCard = document.querySelector('.cadastros-table-card');
  const searchInput = document.getElementById('cadastros-search-input');
  const table = document.querySelector('.cadastros-table');
  const tableHead = table?.querySelector('thead');
  const tableBody = table?.querySelector('tbody');
  const advancedFiltersButton = document.getElementById('cadastros-advanced-filters-btn');
  const badgesContainer = document.getElementById('cadastros-badges');
  const tableWrap = tableCard?.querySelector('.cadastros-table-wrap');

  const originalPlaceholder = searchInput?.getAttribute('placeholder') || '';
  const originalTableHeadHtml = tableHead?.innerHTML || '';
  const originalTableBodyHtml = tableBody?.innerHTML || '';
  const originalFiltersParent = filtersSection?.parentElement || null;
  const originalFiltersNextSibling = filtersSection?.nextElementSibling || null;
  const pessoasEmpresasStorageKey = 'TAWROS_DEMO_PESSOAS_EMPRESAS_V1';

  const currentHash = (window.location.hash || '').replace('#', '');
  const isProdutosServicosRoute = currentHash.startsWith('/cadastros/produtos-servicos');
  const isProdutosClassificacaoRoute = currentHash.startsWith('/cadastros/produtos-servicos/classificacao');
  const isGrupoEmpresasRoute = currentHash.startsWith('/cadastros/pessoas-empresas/grupo-empresa');
  const isCategoriaRoute = currentHash.startsWith('/cadastros/pessoas-empresas/categoria');
  let currentMode = isProdutosServicosRoute ? 'produtos-servicos' : 'pessoas-empresas';
  let saveTimeoutId = null;
  let editingPessoaEmpresaId = null;
  let editingProdutoServicoId = null;
  let editingEmbalagemId = null;
  const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.sistema.tawros.com.br/api/v1';
  const pendingControllers = new Set();

  let produtosServicosRows = [];
  let embalagensRows = [];
  const CATEGORIAS_PADRAO = ['Comprador', 'Vendedor/Produtor', 'Transportadora', 'Motorista'];

  function buildLookupLabel(item = {}, labelKey = 'nome') {
    return [item.codigo, item[labelKey]].filter(Boolean).join(' - ') || String(item[labelKey] || item.id || '');
  }

  function normalizeLookupOptions(rows = [], labelKey = 'nome') {
    return (Array.isArray(rows) ? rows : []).map((item = {}) => ({
      value: String(item.id || ''),
      label: buildLookupLabel(item, labelKey),
    })).filter((item) => item.value && item.label);
  }

  function normalizeManagedItems(rows = [], prefix = 'item', labelKey = 'nome') {
    return (Array.isArray(rows) ? rows : []).map((item = {}, index) => ({
      id: String(item.id || `${prefix}-${index + 1}`),
      nome: buildLookupLabel(item, labelKey),
      ativo: item.ativo !== false,
    })).filter((item) => item.id && item.nome);
  }

  function normalizeCategoriaNome(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    const parts = raw.split(' - ');
    const lastPart = parts.length > 1 ? parts[parts.length - 1] : raw;
    return String(lastPart || '').trim().toLowerCase();
  }

  function buildCategoriaDisplay(item = {}) {
    const nomeBase = String(item?.categoria ?? item?.nome ?? '').trim();
    return nomeBase || String(item?.id || '').trim();
  }

  async function ensureCategoriasPadrao(rows = []) {
    const currentRows = Array.isArray(rows) ? rows : [];
    const existing = new Set(
      currentRows
        .map((item = {}) => normalizeCategoriaNome(item?.categoria ?? item?.nome ?? ''))
        .filter(Boolean)
    );
    const missing = CATEGORIAS_PADRAO.filter((nome) => !existing.has(normalizeCategoriaNome(nome)));
    if (!missing.length) return currentRows;

    const created = [];
    for (const nome of missing) {
      try {
        const saved = await apiRequest('/categorias-pessoa-empresa', {
          method: 'POST',
          body: {
            codigo: buildCodigo('CAT'),
            nome,
            descricao: null,
            ativo: true,
          },
        });
        if (saved) created.push(saved);
      } catch (_) {
        // se já existir por unicidade ou houver outra falha, segue com o que já existe
      }
    }

    return [...currentRows, ...created];
  }

  function mergeCategoriaItems(items = []) {
    return (Array.isArray(items) ? items : []).map((item = {}, index) => ({
      id: String(item.id || `categoria-${index + 1}`),
      nome: buildCategoriaDisplay(item),
      ativo: item.ativo !== false,
    })).filter((item) => item.id && item.nome);
  }

  function buildCategoriaOptions(items = []) {
    return (Array.isArray(items) ? items : []).map((item = {}) => ({
      value: String(item.id || ''),
      label: String(item.nome || ''),
    })).filter((item) => item.value && item.label);
  }

  function createCategoriaStatePatch(items = [], currentForm = {}) {
    const categoriaItems = mergeCategoriaItems(items);
    const categoriaOptions = buildCategoriaOptions(categoriaItems);
    const selectedCategoria = String(currentForm?.categoria || '');
    const hasSelectedCategoria = categoriaOptions.some((item = {}) => String(item.value || '') === selectedCategoria);

    return {
      categoriaItems,
      categoriaOptions,
      form: hasSelectedCategoria || !selectedCategoria
        ? currentForm
        : { ...currentForm, categoria: '' },
    };
  }
  const DEFAULT_PESSOA_EMPRESA_FORM = Object.freeze({
    grupo: '',
    categoria: '',
    cnpj: '',
    razaoSocial: '',
    nomeFantasia: '',
    inscricaoEstadual: '',
    inscricaoMunicipal: '',
    produtorRural: false,
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    nomeResponsavel: '',
    celular: '',
    telefoneFixo: '',
    observacoes: '',
    setor: '',
  });

  function createDefaultPessoaEmpresaForm() {
    return { ...DEFAULT_PESSOA_EMPRESA_FORM };
  }

  let cadastroState = {
    isOpen: isGrupoEmpresasRoute,
    activeSubTab: isGrupoEmpresasRoute ? 'grupo-empresas' : 'pessoas-empresas',
    tipo: 'pessoas',
    isAtivo: true,
    isComplementaresOpen: true,
    isSaving: false,
    saveError: '',
    ramoChips: [],
    emailChips: [],
    activeProdutosSubTab: isProdutosClassificacaoRoute ? 'classificacao' : 'produtos-servicos',
    isProdutosCadastroOpen: false,
    isEmbalagensCadastroOpen: false,
    produtosCadastro: {
      isAtivo: true,
      isSaving: false,
      saveError: '',
      tipo: 'produto',
      isCadastroComplementaresOpen: true,
      isClasseComplementaresOpen: true,
      marcaChips: ['Marca'],
      fabricanteChips: ['Fabricante'],
      form: {
        classe: '',
        descricao: '',
        unidade: '',
        fornecedores: '',
        grupoEquivalencia: '',
        ncm: '',
        principioAtivo: '',
        grupoQuimico: '',
        modoAcao: '',
        registroMapa: '',
      },
    },
    embalagensCadastro: {
      isAtivo: true,
      isSaving: false,
      saveError: '',
      unidadeEquivalenciaOptions: [],
      form: {
        unidadeEquivalencia: '',
        valorConversao: '',
        descricao: '',
        sigla: '',
      },
    },
    produtosClassificacao: {
      isSaving: false,
      search: '',
      grupoView: 'list',
      grupoEditor: {
        id: null,
        posicao: '',
        nome: '',
      },
      categoriaView: 'list',
      categoriaEditor: {
        id: null,
        grupoId: '03',
        posicao: '',
        nome: '',
      },
      classeView: 'list',
      classeEditor: {
        id: null,
        categoriaId: '03.01',
        posicao: '',
        nome: '',
        produtos: true,
        servicos: true,
      },
      selectedGrupoId: '',
      selectedCategoriaId: '',
      selectedClasseId: '',
      grupos: [],
      categorias: [],
      classes: [],
      classeProdutosItems: [],
      classeProdutosSelectedByClasse: {},
    },
    isGrupoDrawerOpen: false,
    isRamoDrawerOpen: false,
    isCategoriaDrawerOpen: false,
    isClasseProdutosDrawerOpen: false,
    isSelecionarClasseDrawerOpen: false,
    grupoDrawerMode: 'create',
    selectedGrupoId: null,
    grupoEmpresasSearch: '',
    grupoEmpresasCadastros: [],
    grupoEmpresasRowsAll: [],
    grupoEmpresasRows: [],
    form: createDefaultPessoaEmpresaForm(),
    grupoOptions: [],
    categoriaOptions: [],
    categoriaItems: [],
    categoriaNomeParaId: {},
    setorOptions: [],
    ramoOptions: [],
    pessoasEmpresasFiltros: {},
    produtosFiltros: {},
    categoriaDrawerTab: 'ativos',
    ramoDrawerTab: 'ativos',
    ramoItems: [],
  };

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getAuthToken() {
    try {
      return window.sessionStorage.getItem('authToken') || '';
    } catch (_) {
      return '';
    }
  }

  function getRefreshToken() {
    try {
      return window.sessionStorage.getItem('refreshToken') || '';
    } catch (_) {
      return '';
    }
  }

  function setAuthSession({ accessToken = '', refreshToken = '' } = {}) {
    try {
      if (accessToken) window.sessionStorage.setItem('authToken', accessToken);
      if (refreshToken) window.sessionStorage.setItem('refreshToken', refreshToken);
    } catch (_) {
      // no-op
    }
  }

  async function refreshAccessToken() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return '';

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) return '';

    const data = payload?.data || {};
    const nextAccessToken = String(data.accessToken || '');
    const nextRefreshToken = String(data.refreshToken || '');
    if (nextAccessToken) {
      setAuthSession({
        accessToken: nextAccessToken,
        refreshToken: nextRefreshToken || refreshToken
      });
    }
    return nextAccessToken;
  }

  async function apiRequest(path, { method = 'GET', query, body, auth = true, retryOnUnauthorized = true } = {}) {
    const controller = new AbortController();
    pendingControllers.add(controller);

    const url = new URL(`${API_BASE_URL}${path}`);
    if (query && typeof query === 'object') {
      Object.entries(query).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return;
        url.searchParams.set(key, String(value));
      });
    }

    const headers = { Accept: 'application/json' };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (auth) {
      const token = getAuthToken();
      if (token) headers.Authorization = `Bearer ${token}`;
      const filialId = sessionStorage.getItem('filialId');
      if (filialId) headers['X-Filial-Id'] = filialId;
    }

    try {
      const response = await fetch(url.toString(), {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (auth && response.status === 401 && retryOnUnauthorized) {
          const nextToken = await refreshAccessToken();
          if (nextToken) {
            return apiRequest(path, {
              method,
              query,
              body,
              auth,
              retryOnUnauthorized: false
            });
          }
        }
        const message = payload?.message || `Erro HTTP ${response.status}`;
        const error = new Error(message);
        error.status = response.status;
        throw error;
      }
      return payload?.data ?? payload;
    } finally {
      pendingControllers.delete(controller);
    }
  }

  function buildCodigo(prefix) {
    return `${prefix}-${String(Date.now()).slice(-6)}`;
  }

  function asNumber(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }

  function resolveCategoriaId(value) {
    const direct = asNumber(value);
    if (direct) return direct;

    const raw = String(value || '').trim();
    if (!raw) return null;

    const lowerRaw = raw.toLowerCase();
    const normalizedRaw = normalizeCategoriaNome(raw);
    const categoriaNomeParaId = cadastroState?.categoriaNomeParaId || {};
    const mappedByName = asNumber(categoriaNomeParaId[normalizedRaw]);
    if (mappedByName) return mappedByName;
    const options = Array.isArray(cadastroState.categoriaOptions) ? cadastroState.categoriaOptions : [];
    const byOption = options.find((option = {}) => {
      const optionValue = String(option.value || '');
      const optionLabel = String(option.label || '');
      return optionValue === raw
        || optionLabel.toLowerCase() === lowerRaw
        || normalizeCategoriaNome(optionLabel) === normalizedRaw;
    });
    const optionId = asNumber(byOption?.value);
    if (optionId) return optionId;

    const items = Array.isArray(cadastroState.categoriaItems) ? cadastroState.categoriaItems : [];
    const byItem = items.find((item = {}) => {
      const itemId = String(item.id || '');
      const itemNome = String(item.nome || '');
      return itemId === raw
        || itemNome.toLowerCase() === lowerRaw
        || normalizeCategoriaNome(itemNome) === normalizedRaw;
    });
    return asNumber(byItem?.id);
  }

  function asCollection(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(data?.rows)) return data.rows;
    return [];
  }

  function loadPessoasEmpresasRows() {
    try {
      const raw = window.sessionStorage.getItem(pessoasEmpresasStorageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function persistPessoasEmpresasRows() {
    try {
      window.sessionStorage.setItem(pessoasEmpresasStorageKey, JSON.stringify(pessoasEmpresasRows));
    } catch (_) {
      // no-op: sessionStorage may be unavailable in some environments
    }
  }

  async function loadLookups() {
    try {
      const [
        grupos,
        categorias,
        setores,
        ramos,
        unidades
      ] = await Promise.all([
        apiRequest('/lookups/grupos-empresariais', { query: { limit: 200 } }),
        apiRequest('/lookups/categorias-pessoa-empresa', { query: { limit: 200 } }),
        apiRequest('/lookups/setores', { query: { limit: 200 } }),
        apiRequest('/lookups/ramos-atividade', { query: { limit: 200 } }),
        apiRequest('/lookups/unidades-medida', { query: { limit: 200 } })
      ]);

      const gruposRows = asCollection(grupos);
      const categoriasRowsRaw = asCollection(categorias);
      const categoriasRows = await ensureCategoriasPadrao(categoriasRowsRaw);
      const setoresRows = asCollection(setores);
      const ramosRows = asCollection(ramos);
      const unidadesRows = asCollection(unidades);

      const normalize = (rows, labelKey = 'nome') =>
        (Array.isArray(rows) ? rows : []).map((item = {}) => ({
          value: String(item.id || ''),
          label: [item.codigo, item[labelKey]].filter(Boolean).join(' - ') || String(item[labelKey] || item.id || '')
        }));

      const categoriaItemsFromApi = categoriasRows.map((item = {}, index) => ({
        id: String(item.id || `categoria-${index + 1}`),
        nome: buildCategoriaDisplay(item),
        ativo: item.ativo !== false,
      })).filter((item) => item.id && item.nome);
      const categoriaNomeParaId = categoriasRows.reduce((acc, item = {}) => {
        const id = asNumber(item.id);
        const key = normalizeCategoriaNome(item?.categoria ?? item?.nome ?? '');
        if (id && key) acc[key] = id;
        return acc;
      }, {});
      const categoriaStatePatch = createCategoriaStatePatch(categoriaItemsFromApi, cadastroState.form || {});
      const ramoOptions = normalize(ramosRows);
      cadastroState = {
        ...cadastroState,
        grupoOptions: normalize(gruposRows),
        categoriaItems: categoriaStatePatch.categoriaItems,
        categoriaOptions: categoriaStatePatch.categoriaOptions,
        categoriaNomeParaId,
        form: categoriaStatePatch.form,
        setorOptions: normalize(setoresRows),
        ramoOptions,
        ramoChips: Array.isArray(cadastroState.ramoChips) ? cadastroState.ramoChips : [],
        ramoItems: ramoOptions.map((option) => ({
          id: option.value,
          nome: option.label,
          ativo: true,
        })),
        embalagensCadastro: {
          ...(cadastroState.embalagensCadastro || {}),
          unidadeEquivalenciaOptions: normalize(unidadesRows, 'sigla')
        }
      };
    } catch (_) {
      // mantém fallback da tela
    }
  }

  async function loadPessoasEmpresasFromApi(searchValue = '') {
    try {
      const rows = await apiRequest('/pessoas-empresas', {
        query: { page: 1, limit: 200, q: searchValue || undefined }
      });
      pessoasEmpresasRows = asCollection(rows).map((item = {}) => ({
        id: String(item.id || ''),
        codigo: item.codigo || '',
        grupo: '-',
        tipo: item.tipo_cadastro === 'pessoa' ? 'PF' : 'PJ',
        documento: item.cpf_cnpj || '',
        razaoSocial: item.razao_social || '',
        nomeFantasia: item.nome_fantasia || ''
      }));
      persistPessoasEmpresasRows();
      renderPessoasEmpresasRows();
    } catch (_) {
      renderPessoasEmpresasRows();
    }
  }

  async function loadProdutosServicosFromApi(searchValue = '') {
    try {
      const rows = await apiRequest('/produtos-servicos', {
        query: { page: 1, limit: 200, q: searchValue || undefined }
      });
      produtosServicosRows = asCollection(rows);
      if (currentMode === 'produtos-servicos' && (cadastroState.activeProdutosSubTab || 'produtos-servicos') === 'produtos-servicos') {
        applyProdutosServicosTable();
      }
    } catch (_) {
      if (currentMode === 'produtos-servicos') applyProdutosServicosTable();
    }
  }

  async function loadEmbalagensFromApi(searchValue = '') {
    try {
      const rows = await apiRequest('/embalagens', {
        query: { page: 1, limit: 200, q: searchValue || undefined }
      });
      embalagensRows = asCollection(rows);
      if (currentMode === 'produtos-servicos' && (cadastroState.activeProdutosSubTab || 'produtos-servicos') === 'embalagens') {
        applyProdutosServicosTable();
      }
    } catch (_) {
      if (currentMode === 'produtos-servicos') applyProdutosServicosTable();
    }
  }

  async function loadClassificacaoFromApi() {
    try {
      const [grupos, categorias, classes] = await Promise.all([
        apiRequest('/classificacao-grupos', { query: { page: 1, limit: 200 } }),
        apiRequest('/classificacao-categorias', { query: { page: 1, limit: 500 } }),
        apiRequest('/classificacao-classes', { query: { page: 1, limit: 1000 } })
      ]);
      const grp = asCollection(grupos).map((item = {}) => ({
        id: String(item.id || ''),
        codigo: item.codigo || '',
        nome: item.nome || ''
      }));
      const cat = asCollection(categorias).map((item = {}) => ({
        id: String(item.id || ''),
        grupoId: String(item.grupo_id || ''),
        codigo: item.codigo || '',
        nome: item.nome || ''
      }));
      const cls = asCollection(classes).map((item = {}) => ({
        id: String(item.id || ''),
        categoriaId: String(item.categoria_id || ''),
        codigo: item.codigo || '',
        nome: item.nome || '',
        produtos: item.permite_produtos !== false,
        servicos: item.permite_servicos !== false
      }));
      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...(cadastroState.produtosClassificacao || {}),
          grupos: grp,
          categorias: cat,
          classes: cls,
          selectedGrupoId: grp[0]?.id || '',
          selectedCategoriaId: cat[0]?.id || '',
          selectedClasseId: cls[0]?.id || ''
        }
      };
    } catch (_) {
      // fallback local permanece
    }
  }

  function resolveSelectLabel(selectId, selectedValue) {
    const select = document.getElementById(selectId);
    if (!(select instanceof HTMLSelectElement)) return '';
    const selectedOption = Array.from(select.options || []).find((option) => option.value === selectedValue);
    return (selectedOption?.textContent || '').trim();
  }

  let pessoasEmpresasRows = loadPessoasEmpresasRows();

  function renderPessoasEmpresasRows() {
    if (!tableBody) return;
    const query = (searchInput?.value || '').trim().toLowerCase();
    const filteredRows = !query ? pessoasEmpresasRows : pessoasEmpresasRows.filter((row = {}) => {
      const values = [
        row.codigo,
        row.grupo,
        row.tipo,
        row.documento,
        row.razaoSocial,
        row.nomeFantasia,
      ];
      return values.some((value) => String(value || '').toLowerCase().includes(query));
    });

    if (filteredRows.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7">Nenhum cadastro encontrado.</td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filteredRows.map((row) => `
      <tr data-code="${escapeHtml(row.codigo || '')}" data-id="${escapeHtml(row.id || '')}">
        <td>${escapeHtml(row.codigo || '')}</td>
        <td>${escapeHtml(row.grupo || '-')}</td>
        <td>${escapeHtml(row.tipo || '')}</td>
        <td>${escapeHtml(row.documento || '')}</td>
        <td>${escapeHtml(row.razaoSocial || '')}</td>
        <td>${escapeHtml(row.nomeFantasia || '')}</td>
        <td class="cadastros-actions">
          <button type="button" class="cadastros-link" data-action="view">Ver</button>
          <button type="button" class="cadastros-link cadastros-link--edit" data-action="edit">Editar</button>
          <button type="button" class="cadastros-link cadastros-link--danger" data-action="delete">Excluir</button>
        </td>
      </tr>
    `).join('');
  }

  function cancelPendingSave() {
    if (!saveTimeoutId) return;
    window.clearTimeout(saveTimeoutId);
    saveTimeoutId = null;
  }

  const grupoEmpresaDrawer = initGrupoEmpresaDrawer({
    onClose: () => {
      cadastroState = {
        ...cadastroState,
        isGrupoDrawerOpen: false,
        selectedGrupoId: null,
      };
    },
    onSaved: async (payload = {}) => {
      const nextId = payload.id || payload.codigo || `grupo-${Date.now()}`;
      const normalizedRow = {
        codigo: payload.codigo || '',
        nome: payload.nome || '',
        descricao: payload.descricao || '',
      };
      const allRows = Array.isArray(cadastroState.grupoEmpresasRowsAll) ? cadastroState.grupoEmpresasRowsAll : [];
      const rowIndex = allRows.findIndex((row) => String(row?.id || row?.codigo || '') === String(nextId));
      const nextRowsAll = [...allRows];
      if (rowIndex >= 0) {
        nextRowsAll[rowIndex] = { ...(nextRowsAll[rowIndex] || {}), ...normalizedRow };
      } else {
        nextRowsAll.unshift(normalizedRow);
      }
      cadastroState = {
        ...cadastroState,
        grupoEmpresasRowsAll: nextRowsAll,
        grupoEmpresasRows: nextRowsAll,
        selectedGrupoId: nextId,
        isGrupoDrawerOpen: false,
      };
      renderCadastroPessoaEmpresa();
    },
    onOpenCadastro: (cadastro) => {
      if (!cadastro?.href) return;
      window.open(cadastro.href, '_blank', 'noopener,noreferrer');
    },
  });

  async function persistRamoToggle(id, ativo) {
    const persistedId = asNumber(id);
    if (!persistedId) return;
    await apiRequest(`/ramos-atividade/${persistedId}`, {
      method: 'PATCH',
      body: { ativo: Boolean(ativo) },
    });
  }

  async function persistRamoRename(id, nome, ativo = true) {
    const persistedId = asNumber(id);
    const cleanNome = String(nome || '').trim();
    if (!cleanNome) return null;

    if (persistedId) {
      return apiRequest(`/ramos-atividade/${persistedId}`, {
        method: 'PATCH',
        body: { nome: cleanNome, ativo: Boolean(ativo) },
      });
    }

    return apiRequest('/ramos-atividade', {
      method: 'POST',
      body: {
        codigo: buildCodigo('RAM'),
        nome: cleanNome,
        ativo: Boolean(ativo),
      },
    });
  }

  const ramoDrawer = initRamoDrawer({
    onClose: () => {
      cadastroState = {
        ...cadastroState,
        isRamoDrawerOpen: false,
      };
    },
    onToggleAtivo: (id, ativo) => {
      cadastroState = {
        ...cadastroState,
        ramoItems: (Array.isArray(cadastroState.ramoItems) ? cadastroState.ramoItems : []).map((item) => {
          if (String(item?.id || '') !== String(id)) return item;
          return { ...(item || {}), ativo: Boolean(ativo) };
        }),
      };
      void persistRamoToggle(id, ativo)
        .then(async () => {
          await loadLookups();
          renderCadastroPessoaEmpresa();
        })
        .catch((error) => {
          console.error('[cadastros] Falha ao atualizar status do ramo', { id, ativo, error });
        });
    },
    onRename: (id, nome) => {
      const currentItems = Array.isArray(cadastroState.ramoItems) ? cadastroState.ramoItems : [];
      const hasExisting = currentItems.some((item) => String(item?.id || '') === String(id));
      const nextItems = hasExisting
        ? currentItems.map((item) => {
          if (String(item?.id || '') !== String(id)) return item;
          return { ...(item || {}), nome: String(nome || item?.nome || '') };
        })
        : [{ id: String(id), nome: String(nome || ''), ativo: true }, ...currentItems];

      cadastroState = {
        ...cadastroState,
        ramoItems: nextItems,
      };
      void persistRamoRename(id, nome, true)
        .then(async () => {
          await loadLookups();
          renderCadastroPessoaEmpresa();
        })
        .catch((error) => {
          console.error('[cadastros] Falha ao salvar ramo', { id, nome, error });
        });
    },
  });

  async function persistCategoriaToggle(id, ativo) {
    const persistedId = asNumber(id);
    if (!persistedId) return;
    await apiRequest(`/categorias-pessoa-empresa/${persistedId}`, {
      method: 'PATCH',
      body: { ativo: Boolean(ativo) },
    });
  }

  async function persistCategoriaRename(id, nome, ativo = true) {
    const persistedId = asNumber(id);
    const cleanNome = String(nome || '').trim();
    if (!cleanNome) return null;

    if (persistedId) {
      return apiRequest(`/categorias-pessoa-empresa/${persistedId}`, {
        method: 'PATCH',
        body: { nome: cleanNome, ativo: Boolean(ativo) },
      });
    }

    return apiRequest('/categorias-pessoa-empresa', {
      method: 'POST',
      body: {
        codigo: buildCodigo('CAT'),
        nome: cleanNome,
        descricao: null,
        ativo: Boolean(ativo),
      },
    });
  }

  const categoriaDrawer = initCategoriaDrawer({
    onClose: () => {
      cadastroState = {
        ...cadastroState,
        isCategoriaDrawerOpen: false,
      };
      if ((window.location.hash || '').replace('#', '').startsWith('/cadastros/pessoas-empresas/categoria')) {
        window.location.hash = '/cadastros';
      }
    },
    onToggleAtivo: (id, ativo) => {
      const nextItems = (Array.isArray(cadastroState.categoriaItems) ? cadastroState.categoriaItems : []).map((item) => {
        if (String(item?.id || '') !== String(id)) return item;
        return { ...(item || {}), ativo: Boolean(ativo) };
      });
      const categoriaStatePatch = createCategoriaStatePatch(nextItems, cadastroState.form || {});
      cadastroState = {
        ...cadastroState,
        categoriaItems: categoriaStatePatch.categoriaItems,
        categoriaOptions: categoriaStatePatch.categoriaOptions,
        form: categoriaStatePatch.form,
      };
      void persistCategoriaToggle(id, ativo)
        .then(async () => {
          await loadLookups();
          renderCadastroPessoaEmpresa();
        })
        .catch((error) => {
          console.error('[cadastros] Falha ao atualizar status da categoria', { id, ativo, error });
        });
      renderCadastroPessoaEmpresa();
    },
    onRename: (id, nome) => {
      const currentItems = Array.isArray(cadastroState.categoriaItems) ? cadastroState.categoriaItems : [];
      const hasExisting = currentItems.some((item) => String(item?.id || '') === String(id));
      const nextItems = hasExisting
        ? currentItems.map((item) => {
          if (String(item?.id || '') !== String(id)) return item;
          return { ...(item || {}), nome: String(nome || item?.nome || '') };
        })
        : [{ id: String(id), nome: String(nome || ''), ativo: true }, ...currentItems];
      const categoriaStatePatch = createCategoriaStatePatch(nextItems, cadastroState.form || {});
      const persistedId = asNumber(id);
      const nextSelectedId = hasExisting
        ? String(cadastroState.form?.categoria || '')
        : (persistedId ? String(persistedId) : String(cadastroState.form?.categoria || ''));

      cadastroState = {
        ...cadastroState,
        categoriaItems: categoriaStatePatch.categoriaItems,
        categoriaOptions: categoriaStatePatch.categoriaOptions,
        form: {
          ...categoriaStatePatch.form,
          categoria: nextSelectedId || categoriaStatePatch.form?.categoria || '',
        },
      };
      void persistCategoriaRename(id, nome, true)
        .then(async (savedCategoria) => {
          await loadLookups();
          const savedCategoriaId = asNumber(savedCategoria?.id);
          if (savedCategoriaId) {
            cadastroState = {
              ...cadastroState,
              form: {
                ...(cadastroState.form || {}),
                categoria: String(savedCategoriaId),
              },
            };
          }
          renderCadastroPessoaEmpresa();
        })
        .catch((error) => {
          console.error('[cadastros] Falha ao salvar categoria', { id, nome, error });
        });
      renderCadastroPessoaEmpresa();
    },
  });

  const pessoasEmpresasFiltrosDrawer = initPessoasEmpresasFiltrosDrawer({
    onApply: (filters = {}) => {
      cadastroState = {
        ...cadastroState,
        pessoasEmpresasFiltros: filters || {},
      };
    },
    onClear: () => {
      cadastroState = {
        ...cadastroState,
        pessoasEmpresasFiltros: {},
      };
    },
  });

  const produtosFiltrosDrawer = initProdutosFiltrosDrawer({
    onApply: (filters = {}) => {
      cadastroState = {
        ...cadastroState,
        produtosFiltros: filters || {},
      };
    },
    onClear: () => {
      cadastroState = {
        ...cadastroState,
        produtosFiltros: {},
      };
    },
  });

  const classeProdutosDrawer = initClasseProdutosDrawer({
    onClose: () => {
      cadastroState = {
        ...cadastroState,
        isClasseProdutosDrawerOpen: false,
      };
    },
    onConfirm: (selectedIds = [], classeId = null) => {
      const classificacao = cadastroState.produtosClassificacao || {};
      const selectedMap = { ...(classificacao.classeProdutosSelectedByClasse || {}) };
      const key = String(classeId || cadastroState.produtosClassificacao?.selectedClasseId || '');
      if (key) selectedMap[key] = Array.isArray(selectedIds) ? selectedIds : [];

      cadastroState = {
        ...cadastroState,
        isClasseProdutosDrawerOpen: false,
        produtosClassificacao: {
          ...classificacao,
          classeProdutosSelectedByClasse: selectedMap,
        },
      };
    },
    onAccessCadastro: () => {
      window.location.hash = '/cadastros/produtos-servicos';
    },
    onChangeClass: ({ classeId = null, selectedIds = [], targetClasseId = '' } = {}) => {
      const classificacao = cadastroState.produtosClassificacao || {};
      const selectedMap = { ...(classificacao.classeProdutosSelectedByClasse || {}) };
      const fromKey = String(classeId || '');
      const toKey = String(targetClasseId || '');
      if (!fromKey || !toKey || fromKey === toKey) return;

      const currentFrom = Array.isArray(selectedMap[fromKey]) ? selectedMap[fromKey] : [];
      const movingIds = Array.isArray(selectedIds) ? selectedIds : [];
      const remaining = currentFrom.filter((id) => !movingIds.includes(id));
      const currentTo = Array.isArray(selectedMap[toKey]) ? selectedMap[toKey] : [];
      const mergedTo = Array.from(new Set([...currentTo, ...movingIds]));

      selectedMap[fromKey] = remaining;
      selectedMap[toKey] = mergedTo;

      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...classificacao,
          classeProdutosSelectedByClasse: selectedMap,
        },
      };
    },
  });

  const produtoServicoVerDrawer = initProdutoServicoVerDrawer({
    onClose: () => {
      cadastroState = {
        ...cadastroState,
        isProdutoServicoVerDrawerOpen: false,
      };
    },
    onEdit: (itemId) => {
      const item = getProdutoServicoViewItemById(itemId);
      if (!item) return;
      startProdutoServicoEdit(item);
    },
  });

  const selecionarClasseDrawer = initSelecionarClasseDrawer({
    onClose: () => {
      cadastroState = {
        ...cadastroState,
        isSelecionarClasseDrawerOpen: false,
      };
    },
    onSelect: ({ classeId = '', categoriaId = '', grupoId = '' } = {}) => {
      const classificacao = cadastroState.produtosClassificacao || {};
      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...classificacao,
          selectedGrupoId: grupoId || classificacao.selectedGrupoId || '',
          selectedCategoriaId: categoriaId || classificacao.selectedCategoriaId || '',
          selectedClasseId: classeId || classificacao.selectedClasseId || '',
        },
      };
      renderCadastroPessoaEmpresa();
    },
    onConfirm: (selected = {}) => {
      const selectedId = String(selected.id || '');
      const selectedCodigo = String(selected.codigo || '');
      const selectedNome = String(selected.nome || '');
      const classeLabel = [selectedCodigo, selectedNome].filter(Boolean).join(' - ');
      const classificacao = cadastroState.produtosClassificacao || {};
      cadastroState = {
        ...cadastroState,
        isSelecionarClasseDrawerOpen: false,
        produtosCadastro: {
          ...(cadastroState.produtosCadastro || {}),
          form: {
            ...((cadastroState.produtosCadastro && cadastroState.produtosCadastro.form) || {}),
            classe: classeLabel || selectedNome || '',
            classeId: selectedId,
            classeCodigo: selectedCodigo,
            classeNome: selectedNome,
          },
          saveError: '',
        },
        produtosClassificacao: {
          ...classificacao,
          selectedClasseId: selectedId || classificacao.selectedClasseId || '',
        },
      };
      renderCadastroPessoaEmpresa();
    },
    onAccessCadastro: (selected = {}) => {
      if (!selected?.id) return;
      window.location.hash = '/cadastros/produtos-servicos';
    },
  });

  function syncListingVisibility() {
    const shouldHideListing = (currentMode === 'pessoas-empresas' && cadastroState.isOpen)
      || (currentMode === 'produtos-servicos'
        && (cadastroState.isProdutosCadastroOpen
          || cadastroState.isEmbalagensCadastroOpen
          || cadastroState.activeProdutosSubTab === 'classificacao'));
    if (listHeader) listHeader.hidden = shouldHideListing;
    if (listCard) listCard.hidden = shouldHideListing;
    if (page) page.classList.toggle('cadastros-page--cadastro-open', shouldHideListing);
    const contentHeader = document.getElementById('cadastros-content-header');
    if (contentHeader && currentMode === 'produtos-servicos') contentHeader.hidden = shouldHideListing;
  }

  function renderCadastroPessoaEmpresa() {
    if (!cadastroContainer) return;

    const shouldShowPessoasCadastro = currentMode === 'pessoas-empresas' && cadastroState.isOpen;
    const shouldShowProdutosCadastro = currentMode === 'produtos-servicos' && cadastroState.isProdutosCadastroOpen;
    const shouldShowEmbalagensCadastro = currentMode === 'produtos-servicos'
      && cadastroState.activeProdutosSubTab === 'embalagens'
      && cadastroState.isEmbalagensCadastroOpen;
    const shouldShowProdutosClassificacao = currentMode === 'produtos-servicos'
      && cadastroState.activeProdutosSubTab === 'classificacao';

    if (shouldShowPessoasCadastro) {
      cadastroContainer.innerHTML = createCadastroPessoaEmpresaMarkup(cadastroState);
      cadastroContainer.hidden = false;
    } else if (shouldShowProdutosClassificacao) {
      cadastroContainer.innerHTML = createClassificacaoProdutosServicosMarkup(cadastroState.produtosClassificacao || {});
      cadastroContainer.hidden = false;
    } else if (shouldShowEmbalagensCadastro) {
      cadastroContainer.innerHTML = createCadastroEmbalagensMarkup(cadastroState.embalagensCadastro || {});
      cadastroContainer.hidden = false;
    } else if (shouldShowProdutosCadastro) {
      cadastroContainer.innerHTML = createCadastroProdutosServicosMarkup(cadastroState.produtosCadastro || {});
      cadastroContainer.hidden = false;
    } else {
      cadastroContainer.innerHTML = '';
      cadastroContainer.hidden = true;
    }

    syncListingVisibility();
    if (currentMode === 'produtos-servicos') syncProdutosServicosSubTabsInteractivity();
  }

  function openGrupoEmpresaDrawer({ mode = 'create', grupoId = null, triggerEl = null } = {}) {
    const allRows = Array.isArray(cadastroState.grupoEmpresasRowsAll) ? cadastroState.grupoEmpresasRowsAll : [];
    const selectedGroup = allRows.find((row) => String(row?.id || row?.codigo || '') === String(grupoId || ''));

    cadastroState = {
      ...cadastroState,
      isGrupoDrawerOpen: true,
      grupoDrawerMode: mode,
      selectedGrupoId: grupoId,
    };

    grupoEmpresaDrawer.open({
      mode,
      grupoId,
      triggerEl,
      initialData: {
        codigo: selectedGroup?.codigo || '',
        nome: selectedGroup?.nome || '',
        descricao: selectedGroup?.descricao || '',
      },
      linkedCadastros: Array.isArray(cadastroState.grupoEmpresasCadastros) ? cadastroState.grupoEmpresasCadastros : [],
    });
  }

  function openRamoDrawer({ triggerEl = null, initialTab = 'ativos' } = {}) {
    const nextTab = initialTab === 'inativos' ? 'inativos' : 'ativos';
    cadastroState = {
      ...cadastroState,
      isRamoDrawerOpen: true,
      ramoDrawerTab: nextTab,
    };

    ramoDrawer.open({
      triggerEl,
      initialTab: nextTab,
      items: Array.isArray(cadastroState.ramoItems) ? cadastroState.ramoItems : [],
    });
  }

  function openCategoriaDrawer({ triggerEl = null, initialTab = 'ativos' } = {}) {
    const nextTab = initialTab === 'inativos' ? 'inativos' : 'ativos';
    cadastroState = {
      ...cadastroState,
      isCategoriaDrawerOpen: true,
      categoriaDrawerTab: nextTab,
    };

    categoriaDrawer.open({
      triggerEl,
      initialTab: nextTab,
      items: Array.isArray(cadastroState.categoriaItems) ? cadastroState.categoriaItems : [],
    });
  }

  function openClasseProdutosDrawer({ classeId = null, triggerEl = null } = {}) {
    if (cadastroState.isSelecionarClasseDrawerOpen) selecionarClasseDrawer.close();
    const classificacao = cadastroState.produtosClassificacao || {};
    const classes = Array.isArray(classificacao.classes) ? classificacao.classes : [];
    const selectedClasse = classes.find((item = {}) => String(item.id || '') === String(classeId || ''));
    const selectedByClasse = classificacao.classeProdutosSelectedByClasse || {};
    const selectedIds = Array.isArray(selectedByClasse[String(classeId || '')])
      ? selectedByClasse[String(classeId || '')]
      : [];

    cadastroState = {
      ...cadastroState,
      isClasseProdutosDrawerOpen: true,
      produtosClassificacao: {
        ...classificacao,
        selectedClasseId: String(classeId || classificacao.selectedClasseId || ''),
      },
    };

    classeProdutosDrawer.open({
      classeId: classeId || null,
      classeNome: selectedClasse?.nome || 'Classe',
      triggerEl,
      items: Array.isArray(classificacao.classeProdutosItems) ? classificacao.classeProdutosItems : [],
      initialSelectedIds: selectedIds,
      classOptions: classes.map((item = {}) => ({ id: String(item.id || ''), nome: String(item.nome || '') })),
    });
  }

  function openSelecionarClasseDrawer({ triggerEl = null, mode = 'classificacao' } = {}) {
    if (cadastroState.isClasseProdutosDrawerOpen) classeProdutosDrawer.close();
    const classificacao = cadastroState.produtosClassificacao || {};
    const produtosForm = cadastroState.produtosCadastro?.form || {};
    const initialSelectedId = mode === 'cadastro'
      ? (produtosForm.classeId || classificacao.selectedClasseId || '')
      : (classificacao.selectedClasseId || '');
    cadastroState = {
      ...cadastroState,
      isSelecionarClasseDrawerOpen: true,
    };

    selecionarClasseDrawer.open({
      mode,
      triggerEl,
      subtitle: mode === 'cadastro'
        ? 'Navegue pela estrutura ou use a busca para encontrar a classe do produto'
        : '',
      initialSelectedId,
      groups: Array.isArray(classificacao.grupos) ? classificacao.grupos : [],
      categorias: Array.isArray(classificacao.categorias) ? classificacao.categorias : [],
      classes: Array.isArray(classificacao.classes) ? classificacao.classes : [],
    });
  }

  function openProdutoServicoVerDrawer({ triggerEl = null, item = null } = {}) {
    cadastroState = {
      ...cadastroState,
      isProdutoServicoVerDrawerOpen: true,
    };
    produtoServicoVerDrawer.open({
      triggerEl,
      item: item || {},
    });
  }

  function buildProdutoServicoViewItemFromRow(row) {
    if (!(row instanceof HTMLTableRowElement)) return null;
    const cells = row.querySelectorAll('td');
    if (!cells || cells.length < 5) return null;

    const codigo = String(cells[0]?.textContent || '').trim();
    const classe = String(cells[1]?.textContent || '').trim();
    const tipo = String(cells[2]?.textContent || '').trim();
    const descricao = String(cells[3]?.textContent || '').trim();
    const unidade = String(cells[4]?.textContent || '').trim();

    return {
      id: codigo || '',
      codigo: codigo || '',
      nome: descricao || '',
      tipo: tipo || '',
      classe: classe || '',
      unidade: unidade || '',
      descricao: descricao || '',
    };
  }

  function getProdutoServicoViewItemById(itemId) {
    if (!tableBody || !itemId) return null;
    const rows = tableBody.querySelectorAll('tr');
    for (const row of rows) {
      const item = buildProdutoServicoViewItemFromRow(row);
      if (String(item?.id || '') === String(itemId)) return item;
    }
    return null;
  }

  function startProdutoServicoEdit(item) {
    const normalizedItem = item || {};
    const nextTipo = String(normalizedItem.tipo || '').toLowerCase().includes('serv') ? 'servico' : 'produto';

    cadastroState = {
      ...cadastroState,
      isProdutoServicoVerDrawerOpen: false,
      isProdutosCadastroOpen: true,
      isEmbalagensCadastroOpen: false,
      produtosCadastro: {
        ...(cadastroState.produtosCadastro || {}),
        tipo: nextTipo,
        saveError: '',
        form: {
          ...((cadastroState.produtosCadastro && cadastroState.produtosCadastro.form) || {}),
          classe: normalizedItem.classe || '',
          descricao: normalizedItem.descricao || '',
          unidade: normalizedItem.unidade || '',
          fornecedores: normalizedItem.fornecedores || '',
          grupoEquivalencia: normalizedItem.grupoEquivalencia || '',
          ncm: normalizedItem.ncm || '',
          principioAtivo: normalizedItem.principioAtivo || '',
          grupoQuimico: normalizedItem.grupoQuimico || '',
          modoAcao: normalizedItem.modoAcao || '',
          registroMapa: normalizedItem.registroMapa || '',
        },
        marcaChips: Array.isArray(normalizedItem.marca) ? normalizedItem.marca : (cadastroState.produtosCadastro?.marcaChips || []),
        fabricanteChips: Array.isArray(normalizedItem.fabricante) ? normalizedItem.fabricante : (cadastroState.produtosCadastro?.fabricanteChips || []),
      },
    };
    renderCadastroPessoaEmpresa();
  }

  function startPessoaEmpresaEdit(item = {}) {
    editingPessoaEmpresaId = item.id ? String(item.id) : null;
    const mappedRamos = Array.isArray(item.ramos)
      ? item.ramos.map((ramo = {}) => String(ramo.nome || ramo.label || ramo.ramo_nome || '')).filter(Boolean)
      : [];
    cadastroState = {
      ...cadastroState,
      isOpen: true,
      isAtivo: item.ativo !== false,
      tipo: item.tipo_cadastro === 'empresa' ? 'empresas' : 'pessoas',
      saveError: '',
      ramoChips: mappedRamos.length ? mappedRamos : cadastroState.ramoChips,
      emailChips: Array.isArray(item.emails) ? item.emails.filter(Boolean) : [],
      form: {
        ...(cadastroState.form || {}),
        grupo: String(item.grupo_empresarial_id || ''),
        categoria: String(item.categoria_id || ''),
        setor: String(item.setor_id || ''),
        cnpj: item.cpf_cnpj || '',
        razaoSocial: item.razao_social || '',
        nomeFantasia: item.nome_fantasia || '',
        inscricaoEstadual: item.inscricao_estadual || '',
        inscricaoMunicipal: item.inscricao_municipal || '',
        produtorRural: Boolean(item.produtor_rural),
        cep: item.cep || '',
        logradouro: item.logradouro || '',
        numero: item.numero || '',
        complemento: item.complemento || '',
        bairro: item.bairro || '',
        cidade: item.cidade || '',
        uf: item.uf || '',
        nomeResponsavel: item.nome_responsavel || '',
        celular: item.celular || '',
        telefoneFixo: item.telefone_fixo || '',
        observacoes: item.observacoes || '',
      }
    };
    renderCadastroPessoaEmpresa();
  }

  function resolveRamoIdsFromChips() {
    const chips = Array.isArray(cadastroState.ramoChips) ? cadastroState.ramoChips : [];
    const options = Array.isArray(cadastroState.ramoOptions) ? cadastroState.ramoOptions : [];
    return chips.map((chip) => {
      const target = String(chip || '').trim().toLowerCase();
      const found = options.find((option = {}) => {
        const label = String(option.label || '').trim().toLowerCase();
        const value = String(option.value || '').trim().toLowerCase();
        return label === target || value === target;
      });
      return found?.value ? Number(found.value) : null;
    }).filter((value) => Number.isFinite(value) && value > 0);
  }

  async function createPessoaEmpresaRamoLink(pessoaEmpresaId, ramoId) {
    const bodyBase = { pessoa_empresa_id: Number(pessoaEmpresaId) };
    try {
      await apiRequest('/pessoas-empresas-ramos', {
        method: 'POST',
        body: { ...bodyBase, ramo_atividade_id: Number(ramoId) },
      });
    } catch (_) {
      await apiRequest('/pessoas-empresas-ramos', {
        method: 'POST',
        body: { ...bodyBase, ramo_id: Number(ramoId) },
      });
    }
  }

  async function syncPessoaEmpresaRamos(pessoaEmpresaId) {
    if (!pessoaEmpresaId) return;
    try {
      const current = await apiRequest('/pessoas-empresas-ramos', {
        query: { page: 1, limit: 500, pessoa_empresa_id: pessoaEmpresaId },
      });
      const currentLinks = asCollection(current);
      await Promise.all(
        currentLinks
          .map((item = {}) => String(item.id || '').trim())
          .filter(Boolean)
          .map((id) => apiRequest(`/pessoas-empresas-ramos/${id}`, { method: 'DELETE' }).catch(() => null))
      );
      const ramoIds = resolveRamoIdsFromChips();
      await Promise.all(
        ramoIds.map((ramoId) => createPessoaEmpresaRamoLink(pessoaEmpresaId, ramoId).catch(() => null))
      );
    } catch (_) {
      // no-op
    }
  }

  function startEmbalagemEdit(item = {}) {
    editingEmbalagemId = item.id ? String(item.id) : null;
    cadastroState = {
      ...cadastroState,
      isProdutosCadastroOpen: false,
      isEmbalagensCadastroOpen: true,
      embalagensCadastro: {
        ...(cadastroState.embalagensCadastro || {}),
        isAtivo: item.ativo !== false,
        saveError: '',
        form: {
          ...((cadastroState.embalagensCadastro && cadastroState.embalagensCadastro.form) || {}),
          unidadeEquivalencia: String(item.unidade_equivalencia_id || ''),
          valorConversao: String(item.valor_conversao ?? ''),
          descricao: item.descricao || '',
          sigla: item.sigla || '',
        }
      }
    };
    renderCadastroPessoaEmpresa();
  }

  function openCadastroPessoaEmpresa() {
    editingPessoaEmpresaId = null;
    cadastroState = {
      ...cadastroState,
      tipo: 'pessoas',
      isAtivo: true,
      isComplementaresOpen: true,
      isSaving: false,
      isOpen: true,
      saveError: '',
      ramoChips: [],
      emailChips: [],
      form: createDefaultPessoaEmpresaForm(),
      activeSubTab: 'pessoas-empresas',
    };
    renderCadastroPessoaEmpresa();
  }

  function openCadastroProdutosServicos() {
    editingProdutoServicoId = null;
    cadastroState = {
      ...cadastroState,
      isProdutosCadastroOpen: true,
      isEmbalagensCadastroOpen: false,
      produtosCadastro: {
        ...(cadastroState.produtosCadastro || {}),
        saveError: '',
      },
    };
    renderCadastroPessoaEmpresa();
  }

  function closeCadastroPessoaEmpresa() {
    cancelPendingSave();
    if (cadastroState.isGrupoDrawerOpen) grupoEmpresaDrawer.close();
    if (cadastroState.isRamoDrawerOpen) ramoDrawer.close();
    if (cadastroState.isClasseProdutosDrawerOpen) classeProdutosDrawer.close();
    if (cadastroState.isSelecionarClasseDrawerOpen) selecionarClasseDrawer.close();
    cadastroState = {
      ...cadastroState,
      isOpen: false,
      isSaving: false,
      saveError: '',
      isGrupoDrawerOpen: false,
      isRamoDrawerOpen: false,
      isClasseProdutosDrawerOpen: false,
      isSelecionarClasseDrawerOpen: false,
      isEmbalagensCadastroOpen: false,
      selectedGrupoId: null,
    };
    renderCadastroPessoaEmpresa();
  }

  function openCadastroEmbalagens() {
    editingEmbalagemId = null;
    cadastroState = {
      ...cadastroState,
      isProdutosCadastroOpen: false,
      isEmbalagensCadastroOpen: true,
      embalagensCadastro: {
        ...(cadastroState.embalagensCadastro || {}),
        saveError: '',
      },
    };
    renderCadastroPessoaEmpresa();
  }

  function closeCadastroProdutosServicos() {
    cancelPendingSave();
    if (cadastroState.isClasseProdutosDrawerOpen) classeProdutosDrawer.close();
    if (cadastroState.isSelecionarClasseDrawerOpen) selecionarClasseDrawer.close();
    cadastroState = {
      ...cadastroState,
      isProdutosCadastroOpen: false,
      isEmbalagensCadastroOpen: false,
      isClasseProdutosDrawerOpen: false,
      isSelecionarClasseDrawerOpen: false,
      produtosCadastro: {
        ...(cadastroState.produtosCadastro || {}),
        isSaving: false,
        saveError: '',
      },
    };
    renderCadastroPessoaEmpresa();
  }

  function closeCadastroEmbalagens() {
    cancelPendingSave();
    cadastroState = {
      ...cadastroState,
      isEmbalagensCadastroOpen: false,
      embalagensCadastro: {
        ...(cadastroState.embalagensCadastro || {}),
        isSaving: false,
        saveError: '',
      },
    };
    renderCadastroPessoaEmpresa();
  }

  function buildCadastroPayload() {
    const form = cadastroState.form || {};
    const categoriaId = resolveCategoriaId(form.categoria);
    return {
      codigo: form.codigo || buildCodigo('PE'),
      tipo_cadastro: cadastroState.tipo === 'pessoas' ? 'pessoa' : 'empresa',
      grupo_empresarial_id: asNumber(form.grupo),
      categoria_id: categoriaId,
      setor_id: asNumber(form.setor),
      cpf_cnpj: String(form.cnpj || '').trim(),
      razao_social: String(form.razaoSocial || '').trim(),
      nome_fantasia: String(form.nomeFantasia || '').trim(),
      inscricao_estadual: String(form.inscricaoEstadual || '').trim() || null,
      inscricao_municipal: String(form.inscricaoMunicipal || '').trim() || null,
      produtor_rural: Boolean(form.produtorRural),
      cep: String(form.cep || '').trim() || null,
      logradouro: String(form.logradouro || '').trim() || null,
      numero: String(form.numero || '').trim() || null,
      complemento: String(form.complemento || '').trim() || null,
      bairro: String(form.bairro || '').trim() || null,
      cidade: String(form.cidade || '').trim() || null,
      uf: String(form.uf || '').trim() || null,
      nome_responsavel: String(form.nomeResponsavel || '').trim() || null,
      celular: String(form.celular || '').trim() || null,
      telefone_fixo: String(form.telefoneFixo || '').trim() || null,
      emails: Array.isArray(cadastroState.emailChips) ? cadastroState.emailChips : [],
      observacoes: String(form.observacoes || '').trim() || null,
      ativo: Boolean(cadastroState.isAtivo),
    };
  }

  function validateCadastro() {
    const form = cadastroState.form || {};
    if (!form.categoria) return 'Selecione a Categoria.';
    if (!resolveCategoriaId(form.categoria)) return 'Selecione uma Categoria válida da lista.';
    if (form.cnpj && !isValidCpfCnpj(form.cnpj)) {
      const digits = normalizeDigits(form.cnpj);
      return digits.length <= 11 ? 'CPF inválido.' : 'CNPJ inválido.';
    }
    if (form.cep && !isValidCep(form.cep)) return 'CEP inválido. Informe 8 dígitos.';
    if (form.celular && !isValidPhone(form.celular)) return 'Celular inválido. Informe DDD + número.';
    if (form.telefoneFixo && !isValidPhone(form.telefoneFixo)) return 'Telefone fixo inválido. Informe DDD + número.';
    const invalidEmail = (cadastroState.emailChips || []).find((e) => !isValidEmail(e));
    if (invalidEmail) return `E-mail inválido: ${invalidEmail}`;
    return '';
  }

  async function saveCadastroPessoaEmpresa() {
    if (cadastroState.isSaving) return;

    const validationError = validateCadastro();
    if (validationError) {
      cadastroState = { ...cadastroState, saveError: validationError };
      renderCadastroPessoaEmpresa();
      return;
    }

    cadastroState = { ...cadastroState, isSaving: true, saveError: '' };
    renderCadastroPessoaEmpresa();

    try {
      if (!cadastroState.isOpen) return;
      const payload = buildCadastroPayload();
      if (!asNumber(payload?.categoria_id)) {
        cadastroState = {
          ...cadastroState,
          isSaving: false,
          saveError: 'Categoria inválida. Recarregue as categorias e selecione novamente.',
        };
        renderCadastroPessoaEmpresa();
        return;
      }
      const saved = editingPessoaEmpresaId
        ? await apiRequest(`/pessoas-empresas/${editingPessoaEmpresaId}`, { method: 'PUT', body: payload })
        : await apiRequest('/pessoas-empresas', { method: 'POST', body: payload });
      const savedId = String(saved?.id || editingPessoaEmpresaId || '').trim();
      if (savedId) {
        await syncPessoaEmpresaRamos(savedId);
      }
      await loadPessoasEmpresasFromApi(searchInput?.value || '');
      closeCadastroPessoaEmpresa();
    } catch (error) {
      cadastroState = {
        ...cadastroState,
        isSaving: false,
        saveError: error?.message || 'Não foi possível salvar o cadastro. Tente novamente.',
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    cadastroState = { ...cadastroState, isSaving: false };
    renderCadastroPessoaEmpresa();
  }

  function buildCadastroProdutoServicoPayload() {
    const produtosCadastro = cadastroState.produtosCadastro || {};
    const form = produtosCadastro.form || {};
    return {
      codigo: form.codigo || buildCodigo('PS'),
      classe_id: asNumber(form.classeId || cadastroState.produtosClassificacao?.selectedClasseId),
      tipo_item: produtosCadastro.tipo || 'produto',
      descricao: String(form.descricao || '').trim(),
      unidade: String(form.unidade || '').trim(),
      fornecedores: String(form.fornecedores || '').trim() || null,
      grupo_equivalencia: String(form.grupoEquivalencia || '').trim() || null,
      ncm: String(form.ncm || '').trim() || null,
      principio_ativo: String(form.principioAtivo || '').trim() || null,
      grupo_quimico: String(form.grupoQuimico || '').trim() || null,
      modo_acao: String(form.modoAcao || '').trim() || null,
      registro_mapa: String(form.registroMapa || '').trim() || null,
      ativo: Boolean(produtosCadastro.isAtivo),
    };
  }

  function buildClassificacaoPayload() {
    const classificacao = cadastroState.produtosClassificacao || {};
    return {
      selectedGrupoId: classificacao.selectedGrupoId || '',
      selectedCategoriaId: classificacao.selectedCategoriaId || '',
      selectedClasseId: classificacao.selectedClasseId || '',
      search: classificacao.search || '',
    };
  }

  function validateCadastroProdutoServico() {
    const form = cadastroState.produtosCadastro?.form || {};
    if (!form.classe) return 'Selecione a classe.';
    if (!form.descricao) return 'Informe a descrição.';
    if (!form.unidade) return 'Informe a unidade.';
    return '';
  }
  async function saveCadastroProdutosServicos() {
    const produtosCadastro = cadastroState.produtosCadastro || {};
    if (produtosCadastro.isSaving) return;

    const validationError = validateCadastroProdutoServico();
    if (validationError) {
      cadastroState = {
        ...cadastroState,
        produtosCadastro: {
          ...produtosCadastro,
          saveError: validationError,
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    cadastroState = {
      ...cadastroState,
      produtosCadastro: {
        ...produtosCadastro,
        isSaving: true,
        saveError: '',
      },
    };
    renderCadastroPessoaEmpresa();

    try {
      if (!cadastroState.isProdutosCadastroOpen) return;
      const payload = buildCadastroProdutoServicoPayload();
      if (editingProdutoServicoId) {
        await apiRequest(`/produtos-servicos/${editingProdutoServicoId}`, { method: 'PUT', body: payload });
      } else {
        await apiRequest('/produtos-servicos', { method: 'POST', body: payload });
      }
      await loadProdutosServicosFromApi(searchInput?.value || '');
      closeCadastroProdutosServicos();
    } catch (error) {
      cadastroState = {
        ...cadastroState,
        produtosCadastro: {
          ...(cadastroState.produtosCadastro || {}),
          isSaving: false,
          saveError: error?.message || 'Não foi possível salvar o cadastro. Tente novamente.',
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    cadastroState = {
      ...cadastroState,
      produtosCadastro: {
        ...(cadastroState.produtosCadastro || {}),
        isSaving: false,
      },
    };
    renderCadastroPessoaEmpresa();
  }
  function buildCadastroEmbalagensPayload() {
    const embalagensCadastro = cadastroState.embalagensCadastro || {};
    const form = embalagensCadastro.form || {};
    return {
      codigo: form.codigo || buildCodigo('EMB'),
      unidade_equivalencia_id: asNumber(form.unidadeEquivalencia),
      valor_conversao: Number(form.valorConversao || 0),
      descricao: String(form.descricao || '').trim(),
      sigla: String(form.sigla || '').trim(),
      ativo: Boolean(embalagensCadastro.isAtivo),
    };
  }

  function validateCadastroEmbalagens() {
    const form = cadastroState.embalagensCadastro?.form || {};
    if (!form.unidadeEquivalencia) return 'Selecione a unidade de equivalência.';
    if (!form.valorConversao) return 'Informe o valor de conversão.';
    if (!form.descricao) return 'Informe a descrição.';
    if (!form.sigla) return 'Informe a sigla.';
    return '';
  }

  async function saveCadastroEmbalagens() {
    const embalagensCadastro = cadastroState.embalagensCadastro || {};
    if (embalagensCadastro.isSaving) return;

    const validationError = validateCadastroEmbalagens();
    if (validationError) {
      cadastroState = {
        ...cadastroState,
        embalagensCadastro: {
          ...embalagensCadastro,
          saveError: validationError,
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    cadastroState = {
      ...cadastroState,
      embalagensCadastro: {
        ...embalagensCadastro,
        isSaving: true,
        saveError: '',
      },
    };
    renderCadastroPessoaEmpresa();

    try {
      if (!cadastroState.isEmbalagensCadastroOpen) return;
      const payload = buildCadastroEmbalagensPayload();
      if (editingEmbalagemId) {
        await apiRequest(`/embalagens/${editingEmbalagemId}`, { method: 'PUT', body: payload });
      } else {
        await apiRequest('/embalagens', { method: 'POST', body: payload });
      }
      await loadEmbalagensFromApi(searchInput?.value || '');
      closeCadastroEmbalagens();
    } catch (error) {
      cadastroState = {
        ...cadastroState,
        embalagensCadastro: {
          ...(cadastroState.embalagensCadastro || {}),
          isSaving: false,
          saveError: error?.message || 'Não foi possível salvar o cadastro. Tente novamente.',
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    cadastroState = {
      ...cadastroState,
      embalagensCadastro: {
        ...(cadastroState.embalagensCadastro || {}),
        isSaving: false,
      },
    };
    renderCadastroPessoaEmpresa();
  }

  function ensureProdutosServicosBlocks() {
    if (document.getElementById('cadastros-subtabs')) return;

    const insertTarget = (listHeader && page && listHeader.parentElement === page)
      ? listHeader
      : (cadastroContainer && page && cadastroContainer.parentElement === page)
        ? cadastroContainer
        : tableCard;

    if (!insertTarget) return;

    insertTarget.insertAdjacentHTML(
      'afterend',
      `
        <section class="cadastros-subtabs" id="cadastros-subtabs" aria-label="Navegação de Produtos e Serviços">
          <button type="button" class="cadastros-subtabs__item is-active" data-subtab="produtos-servicos">Produtos e Serviços</button>
          <button type="button" class="cadastros-subtabs__item" data-subtab="classificacao">Classificação</button>
          <button type="button" class="cadastros-subtabs__item" data-subtab="embalagens">Embalagens</button>
          <button type="button" class="cadastros-subtabs__item" data-subtab="complementares">Complementares</button>
        </section>
        <section class="cadastros-content-header" id="cadastros-content-header">
          <h3 class="cadastros-content-title">Produtos e Serviços</h3>
          <button type="button" class="btn btn--primary" id="cadastros-content-new-btn">Cadastrar</button>
        </section>
      `
    );
  }
  function ensureProdutosServicosFiltersInsideCard() {
    if (!filtersSection || !tableCard || !tableWrap) return;
    if (filtersSection.parentElement !== tableCard) {
      tableCard.insertBefore(filtersSection, tableWrap);
    }
  }

  function ensurePessoasEmpresasFiltersPosition() {
    if (!filtersSection || !originalFiltersParent) return;
    if (originalFiltersNextSibling && originalFiltersNextSibling.parentElement === originalFiltersParent) {
      originalFiltersParent.insertBefore(filtersSection, originalFiltersNextSibling);
    } else {
      originalFiltersParent.appendChild(filtersSection);
    }
  }
  function applyProdutosServicosTable() {
    if (!tableHead || !tableBody) return;
    const activeSubTab = cadastroState.activeProdutosSubTab || 'produtos-servicos';
    const query = String(searchInput?.value || '').trim().toLowerCase();

    if (activeSubTab === 'embalagens') {
      tableHead.innerHTML = `
        <tr>
          <th>Código</th>
          <th>Descrição</th>
          <th>Sigla</th>
          <th>Valor de Conversão</th>
          <th>Unidade de Equivalência</th>
          <th>Ações</th>
        </tr>
      `;

      const filteredRows = (Array.isArray(embalagensRows) ? embalagensRows : []).filter((item = {}) => {
        if (!query) return true;
        return [item.codigo, item.descricao, item.sigla]
          .some((value) => String(value || '').toLowerCase().includes(query));
      });

      if (!filteredRows.length) {
        tableBody.innerHTML = '<tr><td colspan="6">Nenhuma embalagem encontrada.</td></tr>';
        return;
      }

      tableBody.innerHTML = filteredRows.map((item = {}) => `
        <tr data-id="${escapeHtml(item.id || '')}" data-code="${escapeHtml(item.codigo || '')}">
          <td>${escapeHtml(item.codigo || '')}</td>
          <td>${escapeHtml(item.descricao || '')}</td>
          <td>${escapeHtml(item.sigla || '')}</td>
          <td>${escapeHtml(item.valor_conversao || '')}</td>
          <td>${escapeHtml(item.unidade_equivalencia_id || '')}</td>
          <td class="cadastros-actions">
            <button type="button" class="cadastros-link" data-action="view">Ver</button>
            <button type="button" class="cadastros-link cadastros-link--edit" data-action="edit">Editar</button>
          </td>
        </tr>
      `).join('');
      return;
    }

    tableHead.innerHTML = `
      <tr>
        <th>Código</th>
        <th>Classe</th>
        <th>Tipo</th>
        <th>Descrição</th>
        <th>Unidade</th>
        <th>Ações</th>
      </tr>
    `;

    const filteredRows = (Array.isArray(produtosServicosRows) ? produtosServicosRows : []).filter((item = {}) => {
      if (!query) return true;
      return [item.codigo, item.descricao, item.unidade, item.tipo_item]
        .some((value) => String(value || '').toLowerCase().includes(query));
    });

    if (!filteredRows.length) {
      tableBody.innerHTML = '<tr><td colspan="6">Nenhum produto/serviço encontrado.</td></tr>';
      return;
    }

    tableBody.innerHTML = filteredRows.map((item = {}) => `
      <tr data-id="${escapeHtml(item.id || '')}" data-code="${escapeHtml(item.codigo || '')}">
        <td>${escapeHtml(item.codigo || '')}</td>
        <td>${escapeHtml(item.classe_id || '')}</td>
        <td>${escapeHtml(item.tipo_item || '')}</td>
        <td>${escapeHtml(item.descricao || '')}</td>
        <td>${escapeHtml(item.unidade || '')}</td>
        <td class="cadastros-actions">
          <button type="button" class="cadastros-link" data-action="view">Ver</button>
          <button type="button" class="cadastros-link cadastros-link--edit" data-action="edit">Editar</button>
        </td>
      </tr>
    `).join('');
  }
  function syncProdutosServicosSubTabsInteractivity() {
    const subTabsContainer = document.getElementById('cadastros-subtabs');
    if (!subTabsContainer) return;

    const activeSubTab = cadastroState.activeProdutosSubTab || 'produtos-servicos';
    const isAnyCadastroOpen = Boolean(cadastroState.isProdutosCadastroOpen || cadastroState.isEmbalagensCadastroOpen);

    subTabsContainer.querySelectorAll('.cadastros-subtabs__item').forEach((item) => {
      const subTab = item.getAttribute('data-subtab') || '';
      const isComplementares = subTab === 'complementares';
      const shouldDisable = isComplementares || (isAnyCadastroOpen && subTab !== activeSubTab);

      item.toggleAttribute('disabled', shouldDisable);
      item.classList.toggle('is-disabled', shouldDisable);
      item.setAttribute('aria-disabled', shouldDisable ? 'true' : 'false');
    });
  }

  function syncProdutosServicosContentHeader() {
    const contentTitle = document.querySelector('#cadastros-content-header .cadastros-content-title');
    if (!contentTitle) return;
    const activeSubTab = cadastroState.activeProdutosSubTab || 'produtos-servicos';
    if (activeSubTab === 'embalagens') {
      contentTitle.textContent = 'Embalagens';
      return;
    }
    if (activeSubTab === 'complementares') {
      contentTitle.textContent = 'Complementares';
      return;
    }
    contentTitle.textContent = 'Produtos e Serviços';
  }

  function applyPessoasEmpresasTable() {
    if (!tableHead || !tableBody) return;
    tableHead.innerHTML = originalTableHeadHtml;
    renderPessoasEmpresasRows();
  }

  function setAdvancedFilterVisual(isProdutosServicos) {
    if (!advancedFiltersButton) return;
    const advancedDot = advancedFiltersButton.querySelector('.cadastros-filters__dot');
    const advancedIcon = advancedFiltersButton.querySelector('svg');

    if (advancedDot) advancedDot.style.display = isProdutosServicos ? 'none' : '';
    if (advancedIcon) advancedIcon.style.display = isProdutosServicos ? 'none' : '';
  }

  function applyMode(mode) {
    currentMode = mode === 'produtos-servicos' ? 'produtos-servicos' : 'pessoas-empresas';
    if (currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'complementares') {
      cadastroState = {
        ...cadastroState,
        activeProdutosSubTab: 'produtos-servicos',
      };
    }
    const isProdutosServicos = currentMode === 'produtos-servicos';
    if (isProdutosServicos && cadastroState.isGrupoDrawerOpen) grupoEmpresaDrawer.close();
    if (isProdutosServicos && cadastroState.isRamoDrawerOpen) ramoDrawer.close();
    if (!isProdutosServicos && cadastroState.isClasseProdutosDrawerOpen) classeProdutosDrawer.close();
    if (!isProdutosServicos && cadastroState.isSelecionarClasseDrawerOpen) selecionarClasseDrawer.close();
    if (!isProdutosServicos && (cadastroState.isProdutosCadastroOpen || cadastroState.isEmbalagensCadastroOpen)) {
      cadastroState = {
        ...cadastroState,
        isProdutosCadastroOpen: false,
        isEmbalagensCadastroOpen: false,
      };
    }

    if (!page) return;

    if (isProdutosServicos) {
      page.classList.add('cadastros-page--produtos-servicos');
      ensureProdutosServicosBlocks();

      const subTabs = document.getElementById('cadastros-subtabs');
      const contentHeader = document.getElementById('cadastros-content-header');
      if (subTabs) subTabs.hidden = false;
      if (contentHeader) contentHeader.hidden = false;
      if (subTabs) {
        const targetSubTab = cadastroState.activeProdutosSubTab || 'produtos-servicos';
        subTabs.querySelectorAll('.cadastros-subtabs__item').forEach((item) => {
          item.classList.toggle('is-active', item.getAttribute('data-subtab') === targetSubTab);
        });
      }
      syncProdutosServicosSubTabsInteractivity();

      if (searchInput) searchInput.placeholder = 'Buscar por: Razão Social, CNPJ, Cidade...';
      ensureProdutosServicosFiltersInsideCard();
      syncProdutosServicosContentHeader();
      setAdvancedFilterVisual(true);
      applyProdutosServicosTable();
      if ((cadastroState.activeProdutosSubTab || 'produtos-servicos') === 'embalagens') {
        void loadEmbalagensFromApi(searchInput?.value || '');
      } else if ((cadastroState.activeProdutosSubTab || 'produtos-servicos') === 'produtos-servicos') {
        void loadProdutosServicosFromApi(searchInput?.value || '');
      }
      renderCadastroPessoaEmpresa();
      return;
    }

    page.classList.remove('cadastros-page--produtos-servicos');

    const subTabs = document.getElementById('cadastros-subtabs');
    const contentHeader = document.getElementById('cadastros-content-header');
    if (subTabs) subTabs.hidden = true;
    if (contentHeader) contentHeader.hidden = true;

    if (searchInput) searchInput.placeholder = originalPlaceholder;
    ensurePessoasEmpresasFiltersPosition();

    setAdvancedFilterVisual(false);
    applyPessoasEmpresasTable();
    void loadPessoasEmpresasFromApi(searchInput?.value || '');
    renderCadastroPessoaEmpresa();
  }

  const handleHeaderTabChange = (event) => {
    const mode = event?.detail?.mode;
    if (mode !== 'pessoas-empresas' && mode !== 'produtos-servicos') return;
    applyMode(mode);
  };

  const handleNewClick = () => {
    if (currentMode === 'produtos-servicos') {
      if (cadastroState.activeProdutosSubTab === 'produtos-servicos') {
        openCadastroProdutosServicos();
        return;
      }
      if (cadastroState.activeProdutosSubTab === 'embalagens') {
        openCadastroEmbalagens();
      }
      return;
    }
    openCadastroPessoaEmpresa();
  };

  const handleAdvancedFiltersClick = () => {
    if (currentMode === 'pessoas-empresas') {
      pessoasEmpresasFiltrosDrawer.open({
        triggerEl: advancedFiltersButton || null,
        initialFilters: cadastroState.pessoasEmpresasFiltros || {},
      });
      return;
    }

    if (currentMode === 'produtos-servicos' && (cadastroState.activeProdutosSubTab || 'produtos-servicos') === 'produtos-servicos') {
      produtosFiltrosDrawer.open({
        triggerEl: advancedFiltersButton || null,
        initialFilters: cadastroState.produtosFiltros || {},
      });
    }
  };

  const handleBadgeClick = (event) => {
    if (!(event.target instanceof Element)) return;
    const removeButton = event.target.closest('.cadastros-badge__remove');
    if (!removeButton || !badgesContainer) return;
    const badge = removeButton.closest('.cadastros-badge');
    if (badge) badge.remove();
  };

  const handleCadastroFieldUpdate = (target) => {
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
    const fieldName = target.dataset.cpeField;
    if (!fieldName) return;

    const isCheckbox = target instanceof HTMLInputElement && target.type === 'checkbox';
    let fieldValue = isCheckbox ? target.checked : target.value;

    if (fieldName === 'categoria' && target instanceof HTMLSelectElement) {
      const selectedLabel = String(target.selectedOptions?.[0]?.textContent || '').trim();
      const resolvedCategoriaId = resolveCategoriaId(target.value) || resolveCategoriaId(selectedLabel);
      if (resolvedCategoriaId) fieldValue = String(resolvedCategoriaId);
    }

    // Aplica máscara nos campos especiais
    if (target instanceof HTMLInputElement) {
      if (fieldName === 'cnpj') {
        target.value = formatCpfCnpj(fieldValue);
        fieldValue = target.value;
      } else if (fieldName === 'cep') {
        target.value = formatCep(fieldValue);
        fieldValue = target.value;
      } else if (fieldName === 'celular' || fieldName === 'telefoneFixo') {
        target.value = formatPhone(fieldValue);
        fieldValue = target.value;
      }
    }

    cadastroState = {
      ...cadastroState,
      form: {
        ...(cadastroState.form || {}),
        [fieldName]: fieldValue,
      },
      saveError: '',
    };
  };

  const handleProdutoFieldUpdate = (target) => {
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
    const fieldName = target.dataset.cpsField;
    if (!fieldName) return;

    cadastroState = {
      ...cadastroState,
      produtosCadastro: {
        ...(cadastroState.produtosCadastro || {}),
        form: {
          ...((cadastroState.produtosCadastro && cadastroState.produtosCadastro.form) || {}),
          [fieldName]: target.value,
        },
        saveError: '',
      },
    };
  };

  const handleEmbalagemFieldUpdate = (target) => {
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
    const fieldName = target.dataset.ceField;
    if (!fieldName) return;

    cadastroState = {
      ...cadastroState,
      embalagensCadastro: {
        ...(cadastroState.embalagensCadastro || {}),
        form: {
          ...((cadastroState.embalagensCadastro && cadastroState.embalagensCadastro.form) || {}),
          [fieldName]: target.value,
        },
        saveError: '',
      },
    };
  };

  const handlePageClick = async (event) => {
    if (!(event.target instanceof Element)) return;

    const newButtonClick = event.target.closest('#cadastros-new-btn, #cadastros-content-new-btn');
    if (newButtonClick) {
      handleNewClick();
      return;
    }

    const produtosSubTabButton = event.target.closest('.cadastros-subtabs__item[data-subtab]');
    if (produtosSubTabButton && currentMode === 'produtos-servicos') {
      if (produtosSubTabButton.disabled) return;
      const nextSubTab = produtosSubTabButton.getAttribute('data-subtab') || 'produtos-servicos';
      if (nextSubTab === 'complementares') return;
      if (nextSubTab !== 'classificacao' && cadastroState.isClasseProdutosDrawerOpen) {
        classeProdutosDrawer.close();
      }
      if (nextSubTab !== 'classificacao' && cadastroState.isSelecionarClasseDrawerOpen) {
        selecionarClasseDrawer.close();
      }
      const currentClassificacao = cadastroState.produtosClassificacao || {};
      cadastroState = {
        ...cadastroState,
        activeProdutosSubTab: nextSubTab,
        isProdutosCadastroOpen: nextSubTab === 'produtos-servicos' ? cadastroState.isProdutosCadastroOpen : false,
        isEmbalagensCadastroOpen: nextSubTab === 'embalagens' ? cadastroState.isEmbalagensCadastroOpen : false,
        isClasseProdutosDrawerOpen: nextSubTab === 'classificacao' ? cadastroState.isClasseProdutosDrawerOpen : false,
        isSelecionarClasseDrawerOpen: nextSubTab === 'classificacao' ? cadastroState.isSelecionarClasseDrawerOpen : false,
        produtosClassificacao: {
          ...currentClassificacao,
          grupoView: nextSubTab === 'classificacao' ? (currentClassificacao.grupoView || 'list') : 'list',
          categoriaView: nextSubTab === 'classificacao' ? (currentClassificacao.categoriaView || 'list') : 'list',
          classeView: nextSubTab === 'classificacao' ? (currentClassificacao.classeView || 'list') : 'list',
        },
      };
      const subTabsContainer = document.getElementById('cadastros-subtabs');
      if (subTabsContainer) {
        subTabsContainer.querySelectorAll('.cadastros-subtabs__item').forEach((item) => {
          item.classList.toggle('is-active', item === produtosSubTabButton);
        });
      }
      syncProdutosServicosContentHeader();
      applyProdutosServicosTable();
      renderCadastroPessoaEmpresa();
      return;
    }

    const subTabButton = event.target.closest('[data-cpe-subtab]');
    if (subTabButton && currentMode === 'pessoas-empresas') {
      const nextSubTab = subTabButton.getAttribute('data-cpe-subtab') || 'pessoas-empresas';
      if (nextSubTab !== 'grupo-empresas' && cadastroState.isGrupoDrawerOpen) {
        grupoEmpresaDrawer.close();
      }
      cadastroState = { ...cadastroState, activeSubTab: nextSubTab };
      renderCadastroPessoaEmpresa();
      return;
    }

    const tipoButton = event.target.closest('[data-cpe-tipo]');
    if (tipoButton && currentMode === 'pessoas-empresas') {
      const nextTipo = tipoButton.getAttribute('data-cpe-tipo') || 'pessoas';
      cadastroState = { ...cadastroState, tipo: nextTipo };
      renderCadastroPessoaEmpresa();
      return;
    }

    const accordionButton = event.target.closest('[data-cpe-accordion-trigger]');
    if (accordionButton && currentMode === 'pessoas-empresas') {
      cadastroState = {
        ...cadastroState,
        isComplementaresOpen: !cadastroState.isComplementaresOpen,
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const removeRamoButton = event.target.closest('[data-cpe-remove-ramo]');
    if (removeRamoButton && currentMode === 'pessoas-empresas') {
      const chipValue = removeRamoButton.getAttribute('data-cpe-remove-ramo');
      if (!chipValue) return;
      cadastroState = {
        ...cadastroState,
        ramoChips: (cadastroState.ramoChips || []).filter((item) => item !== chipValue),
        saveError: '',
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const removeEmailButton = event.target.closest('[data-cpe-remove-email]');
    if (removeEmailButton && currentMode === 'pessoas-empresas') {
      const emailValue = removeEmailButton.getAttribute('data-cpe-remove-email');
      if (!emailValue) return;
      cadastroState = {
        ...cadastroState,
        emailChips: (cadastroState.emailChips || []).filter((item) => item !== emailValue),
        saveError: '',
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const createLink = event.target.closest('[data-cpe-create]');
    if (createLink && currentMode === 'pessoas-empresas') {
      const resource = createLink.getAttribute('data-cpe-create') || 'registro';
      if (resource === 'grupo' && cadastroState.isOpen) {
        openGrupoEmpresaDrawer({
          mode: 'create',
          grupoId: null,
          triggerEl: createLink,
        });
        return;
      }
      if (resource === 'categoria' && cadastroState.isOpen) {
        openCategoriaDrawer({
          triggerEl: createLink,
          initialTab: cadastroState.categoriaDrawerTab || 'ativos',
        });
        return;
      }
      if (resource === 'ramo' && cadastroState.isOpen) {
        openRamoDrawer({
          triggerEl: createLink,
          initialTab: cadastroState.ramoDrawerTab || 'ativos',
        });
        return;
      }
      return;
    }

    const classificacaoGrupoEditTrigger = event.target.closest('[data-cpsc-grupo-edit]');
    if (classificacaoGrupoEditTrigger && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      const grupoId = classificacaoGrupoEditTrigger.getAttribute('data-cpsc-grupo-edit') || '';
      const classificacao = cadastroState.produtosClassificacao || {};
      const grupos = Array.isArray(classificacao.grupos) ? classificacao.grupos : [];
      const selectedGrupo = grupos.find((item = {}) => String(item.id || '') === grupoId);

      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...classificacao,
          grupoView: 'editor',
          grupoEditor: {
            id: selectedGrupo?.id || null,
            posicao: selectedGrupo?.codigo || '',
            nome: selectedGrupo?.nome || '',
          },
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const tableViewAction = event.target.closest('.cadastros-link[data-action="view"]');
    if (
      tableViewAction
      && currentMode === 'produtos-servicos'
      && (cadastroState.activeProdutosSubTab || 'produtos-servicos') === 'produtos-servicos'
      && !cadastroState.isProdutosCadastroOpen
    ) {
      const row = tableViewAction.closest('tr');
      const item = buildProdutoServicoViewItemFromRow(row);
      openProdutoServicoVerDrawer({
        triggerEl: tableViewAction,
        item,
      });
      return;
    }

    const tableEditAction = event.target.closest('.cadastros-link[data-action="edit"]');
    if (
      tableEditAction
      && currentMode === 'produtos-servicos'
      && (cadastroState.activeProdutosSubTab || 'produtos-servicos') === 'produtos-servicos'
      && !cadastroState.isProdutosCadastroOpen
    ) {
      const row = tableEditAction.closest('tr');
      const item = buildProdutoServicoViewItemFromRow(row);
      if (!item) return;
      startProdutoServicoEdit(item);
      return;
    }

    const classificacaoGrupoClose = event.target.closest('[data-cpsc-grupo-editor-close], [data-cpsc-grupo-editor-cancel]');
    if (classificacaoGrupoClose && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...(cadastroState.produtosClassificacao || {}),
          grupoView: 'list',
          grupoEditor: {
            id: null,
            posicao: '',
            nome: '',
          },
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const classificacaoGrupoSave = event.target.closest('[data-cpsc-grupo-editor-save]');
    if (classificacaoGrupoSave && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      const classificacao = cadastroState.produtosClassificacao || {};
      const editor = classificacao.grupoEditor || {};
      const nome = String(editor.nome || '').trim();
      const posicao = String(editor.posicao || '').trim();
      if (!nome || !posicao) return;

      const nextId = String(editor.id || `grupo-${Date.now()}`);
      const grupos = Array.isArray(classificacao.grupos) ? classificacao.grupos : [];
      const nextGrupos = [...grupos];
      const existingIndex = nextGrupos.findIndex((item = {}) => String(item.id || '') === nextId);
      const nextItem = { id: nextId, codigo: posicao, nome };
      if (existingIndex >= 0) {
        nextGrupos[existingIndex] = { ...(nextGrupos[existingIndex] || {}), ...nextItem };
      } else {
        nextGrupos.unshift(nextItem);
      }

      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...classificacao,
          grupos: nextGrupos,
          selectedGrupoId: nextId,
          grupoView: 'list',
          grupoEditor: {
            id: null,
            posicao: '',
            nome: '',
          },
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const classificacaoCategoriaEditTrigger = event.target.closest('[data-cpsc-categoria-edit]');
    if (classificacaoCategoriaEditTrigger && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      const categoriaId = classificacaoCategoriaEditTrigger.getAttribute('data-cpsc-categoria-edit') || '';
      const classificacao = cadastroState.produtosClassificacao || {};
      const categorias = Array.isArray(classificacao.categorias) ? classificacao.categorias : [];
      const grupos = Array.isArray(classificacao.grupos) ? classificacao.grupos : [];
      const selectedCategoria = categorias.find((item = {}) => String(item.id || '') === categoriaId);
      const fallbackGrupoId = String(classificacao.selectedGrupoId || grupos[0]?.id || '');

      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...classificacao,
          categoriaView: 'editor',
          categoriaEditor: {
            id: selectedCategoria?.id || null,
            grupoId: String(selectedCategoria?.grupoId || fallbackGrupoId),
            posicao: selectedCategoria?.codigo || '',
            nome: selectedCategoria?.nome || '',
          },
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const classificacaoCategoriaClose = event.target.closest('[data-cpsc-categoria-editor-close], [data-cpsc-categoria-editor-cancel]');
    if (classificacaoCategoriaClose && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      const classificacao = cadastroState.produtosClassificacao || {};
      const grupos = Array.isArray(classificacao.grupos) ? classificacao.grupos : [];
      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...classificacao,
          categoriaView: 'list',
          categoriaEditor: {
            id: null,
            grupoId: String(classificacao.selectedGrupoId || grupos[0]?.id || ''),
            posicao: '',
            nome: '',
          },
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const classificacaoCategoriaSave = event.target.closest('[data-cpsc-categoria-editor-save]');
    if (classificacaoCategoriaSave && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      const classificacao = cadastroState.produtosClassificacao || {};
      const editor = classificacao.categoriaEditor || {};
      const grupoId = String(editor.grupoId || '').trim();
      const nome = String(editor.nome || '').trim();
      const posicao = String(editor.posicao || '').trim();
      if (!grupoId || !nome || !posicao) return;

      const nextId = String(editor.id || `${grupoId}-${Date.now()}`);
      const categorias = Array.isArray(classificacao.categorias) ? classificacao.categorias : [];
      const nextCategorias = [...categorias];
      const existingIndex = nextCategorias.findIndex((item = {}) => String(item.id || '') === nextId);
      const nextItem = { id: nextId, grupoId, codigo: posicao, nome };
      if (existingIndex >= 0) {
        nextCategorias[existingIndex] = { ...(nextCategorias[existingIndex] || {}), ...nextItem };
      } else {
        nextCategorias.unshift(nextItem);
      }

      const classes = Array.isArray(classificacao.classes) ? classificacao.classes : [];
      const firstClasse = classes.find((item = {}) => String(item.categoriaId || '') === nextId);
      const grupos = Array.isArray(classificacao.grupos) ? classificacao.grupos : [];
      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...classificacao,
          categorias: nextCategorias,
          selectedGrupoId: grupoId,
          selectedCategoriaId: nextId,
          selectedClasseId: firstClasse?.id || '',
          categoriaView: 'list',
          categoriaEditor: {
            id: null,
            grupoId: String(grupoId || grupos[0]?.id || ''),
            posicao: '',
            nome: '',
          },
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const classificacaoClasseEditTrigger = event.target.closest('[data-cpsc-classe-edit]');
    if (classificacaoClasseEditTrigger && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      const classeId = classificacaoClasseEditTrigger.getAttribute('data-cpsc-classe-edit') || '';
      const classificacao = cadastroState.produtosClassificacao || {};
      const classes = Array.isArray(classificacao.classes) ? classificacao.classes : [];
      const categorias = Array.isArray(classificacao.categorias) ? classificacao.categorias : [];
      const selectedClasse = classes.find((item = {}) => String(item.id || '') === classeId);
      const fallbackCategoriaId = String(classificacao.selectedCategoriaId || categorias[0]?.id || '');

      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...classificacao,
          classeView: 'editor',
          classeEditor: {
            id: selectedClasse?.id || null,
            categoriaId: String(selectedClasse?.categoriaId || fallbackCategoriaId),
            posicao: selectedClasse?.codigo || '',
            nome: selectedClasse?.nome || '',
            produtos: selectedClasse?.produtos !== false,
            servicos: selectedClasse?.servicos !== false,
          },
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const classificacaoClasseClose = event.target.closest('[data-cpsc-classe-editor-close], [data-cpsc-classe-editor-cancel]');
    if (classificacaoClasseClose && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      const classificacao = cadastroState.produtosClassificacao || {};
      const categorias = Array.isArray(classificacao.categorias) ? classificacao.categorias : [];
      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...classificacao,
          classeView: 'list',
          classeEditor: {
            id: null,
            categoriaId: String(classificacao.selectedCategoriaId || categorias[0]?.id || ''),
            posicao: '',
            nome: '',
            produtos: true,
            servicos: true,
          },
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const classificacaoClasseSave = event.target.closest('[data-cpsc-classe-editor-save]');
    if (classificacaoClasseSave && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      const classificacao = cadastroState.produtosClassificacao || {};
      const editor = classificacao.classeEditor || {};
      const categoriaId = String(editor.categoriaId || '').trim();
      const nome = String(editor.nome || '').trim();
      const posicao = String(editor.posicao || '').trim();
      if (!categoriaId || !nome || !posicao) return;

      const nextId = String(editor.id || `${categoriaId}-${Date.now()}`);
      const classes = Array.isArray(classificacao.classes) ? classificacao.classes : [];
      const nextClasses = [...classes];
      const existingIndex = nextClasses.findIndex((item = {}) => String(item.id || '') === nextId);
      const nextItem = {
        id: nextId,
        categoriaId,
        codigo: posicao,
        nome,
        produtos: editor.produtos !== false,
        servicos: editor.servicos !== false,
      };
      if (existingIndex >= 0) {
        nextClasses[existingIndex] = { ...(nextClasses[existingIndex] || {}), ...nextItem };
      } else {
        nextClasses.unshift(nextItem);
      }

      const categorias = Array.isArray(classificacao.categorias) ? classificacao.categorias : [];
      const categoriaAtual = categorias.find((item = {}) => String(item.id || '') === categoriaId);
      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...classificacao,
          classes: nextClasses,
          selectedGrupoId: categoriaAtual?.grupoId || classificacao.selectedGrupoId || '',
          selectedCategoriaId: categoriaId,
          selectedClasseId: nextId,
          classeView: 'list',
          classeEditor: {
            id: null,
            categoriaId: String(categoriaId || categorias[0]?.id || ''),
            posicao: '',
            nome: '',
            produtos: true,
            servicos: true,
          },
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const classificacaoClasseProdutosTrigger = event.target.closest('[data-cpsc-classe-produtos]');
    if (classificacaoClasseProdutosTrigger && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      event.preventDefault();
      const classeId = classificacaoClasseProdutosTrigger.getAttribute('data-cpsc-classe-produtos') || '';
      openClasseProdutosDrawer({
        classeId,
        triggerEl: classificacaoClasseProdutosTrigger,
      });
      return;
    }

    const classificacaoSearchMenuTrigger = event.target.closest('[data-cpsc-search-menu]');
    if (classificacaoSearchMenuTrigger && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      event.preventDefault();
      openSelecionarClasseDrawer({
        triggerEl: classificacaoSearchMenuTrigger,
      });
      return;
    }

    const classificacaoSelectButton = event.target.closest('[data-cpsc-select][data-cpsc-id]');
    if (classificacaoSelectButton && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      const selectedType = classificacaoSelectButton.getAttribute('data-cpsc-select') || '';
      const selectedId = classificacaoSelectButton.getAttribute('data-cpsc-id') || '';
      const classificacao = cadastroState.produtosClassificacao || {};

      if (selectedType === 'grupo') {
        const categorias = Array.isArray(classificacao.categorias) ? classificacao.categorias : [];
        const firstCategoria = categorias.find((item = {}) => String(item.grupoId || '') === selectedId);
        const classes = Array.isArray(classificacao.classes) ? classificacao.classes : [];
        const firstClasse = classes.find((item = {}) => String(item.categoriaId || '') === String(firstCategoria?.id || ''));

        cadastroState = {
          ...cadastroState,
          produtosClassificacao: {
            ...classificacao,
            selectedGrupoId: selectedId,
            selectedCategoriaId: firstCategoria?.id || '',
            selectedClasseId: firstClasse?.id || '',
          },
        };
        renderCadastroPessoaEmpresa();
        return;
      }

      if (selectedType === 'categoria') {
        const classes = Array.isArray(classificacao.classes) ? classificacao.classes : [];
        const firstClasse = classes.find((item = {}) => String(item.categoriaId || '') === selectedId);

        cadastroState = {
          ...cadastroState,
          produtosClassificacao: {
            ...classificacao,
            selectedCategoriaId: selectedId,
            selectedClasseId: firstClasse?.id || '',
          },
        };
        renderCadastroPessoaEmpresa();
        return;
      }

      if (selectedType === 'classe') {
        cadastroState = {
          ...cadastroState,
          produtosClassificacao: {
            ...classificacao,
            selectedClasseId: selectedId,
          },
        };
        renderCadastroPessoaEmpresa();
      }
      return;
    }

    const classificacaoNewButton = event.target.closest('[data-cpsc-new]');
    if (classificacaoNewButton && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      const resource = classificacaoNewButton.getAttribute('data-cpsc-new') || 'item';
      if (resource === 'grupo') {
        cadastroState = {
          ...cadastroState,
          produtosClassificacao: {
            ...(cadastroState.produtosClassificacao || {}),
            grupoView: 'editor',
            grupoEditor: {
              id: null,
              posicao: '',
              nome: '',
            },
          },
        };
        renderCadastroPessoaEmpresa();
        return;
      }
      if (resource === 'categoria') {
        const classificacao = cadastroState.produtosClassificacao || {};
        const grupos = Array.isArray(classificacao.grupos) ? classificacao.grupos : [];
        cadastroState = {
          ...cadastroState,
          produtosClassificacao: {
            ...classificacao,
            categoriaView: 'editor',
            categoriaEditor: {
              id: null,
              grupoId: String(classificacao.selectedGrupoId || grupos[0]?.id || ''),
              posicao: '',
              nome: '',
            },
          },
        };
        renderCadastroPessoaEmpresa();
        return;
      }
      if (resource === 'classe') {
        const classificacao = cadastroState.produtosClassificacao || {};
        const categorias = Array.isArray(classificacao.categorias) ? classificacao.categorias : [];
        cadastroState = {
          ...cadastroState,
          produtosClassificacao: {
            ...classificacao,
            classeView: 'editor',
            classeEditor: {
              id: null,
              categoriaId: String(classificacao.selectedCategoriaId || categorias[0]?.id || ''),
              posicao: '',
              nome: '',
              produtos: true,
              servicos: true,
            },
          },
        };
        renderCadastroPessoaEmpresa();
        return;
      }
      return;
    }

    const classificacaoSaveButton = event.target.closest('[data-cpsc-save]');
    if (classificacaoSaveButton && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      const classificacao = cadastroState.produtosClassificacao || {};
      try {
        if ((classificacao.grupoView || 'list') === 'editor') {
          const editor = classificacao.grupoEditor || {};
          const payload = {
            codigo: String(editor.posicao || buildCodigo('CG')),
            nome: String(editor.nome || '').trim(),
            ativo: true,
          };
          if (editor.id) {
            await apiRequest(`/classificacao-grupos/${editor.id}`, { method: 'PUT', body: payload });
          } else {
            await apiRequest('/classificacao-grupos', { method: 'POST', body: payload });
          }
        } else if ((classificacao.categoriaView || 'list') === 'editor') {
          const editor = classificacao.categoriaEditor || {};
          const payload = {
            grupo_id: asNumber(editor.grupoId),
            codigo: String(editor.posicao || buildCodigo('CC')),
            nome: String(editor.nome || '').trim(),
            ativo: true,
          };
          if (editor.id) {
            await apiRequest(`/classificacao-categorias/${editor.id}`, { method: 'PUT', body: payload });
          } else {
            await apiRequest('/classificacao-categorias', { method: 'POST', body: payload });
          }
        } else if ((classificacao.classeView || 'list') === 'editor') {
          const editor = classificacao.classeEditor || {};
          const payload = {
            categoria_id: asNumber(editor.categoriaId),
            codigo: String(editor.posicao || buildCodigo('CL')),
            nome: String(editor.nome || '').trim(),
            permite_produtos: editor.produtos !== false,
            permite_servicos: editor.servicos !== false,
            ativo: true,
          };
          if (editor.id) {
            await apiRequest(`/classificacao-classes/${editor.id}`, { method: 'PUT', body: payload });
          } else {
            await apiRequest('/classificacao-classes', { method: 'POST', body: payload });
          }
        }
        await loadClassificacaoFromApi();
      } catch (_) {
        // no-op
      }
      return;
    }

    const classificacaoCancelButton = event.target.closest('[data-cpsc-cancel]');
    if (classificacaoCancelButton && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      if (cadastroState.isClasseProdutosDrawerOpen) classeProdutosDrawer.close();
      if (cadastroState.isSelecionarClasseDrawerOpen) selecionarClasseDrawer.close();
      cadastroState = {
        ...cadastroState,
        activeProdutosSubTab: 'produtos-servicos',
      };
      const subTabsContainer = document.getElementById('cadastros-subtabs');
      if (subTabsContainer) {
        subTabsContainer.querySelectorAll('.cadastros-subtabs__item').forEach((item) => {
          const itemSubTab = item.getAttribute('data-subtab') || '';
          item.classList.toggle('is-active', itemSubTab === 'produtos-servicos');
        });
      }
      syncProdutosServicosContentHeader();
      applyProdutosServicosTable();
      renderCadastroPessoaEmpresa();
      return;
    }

    const cpsTipoButton = event.target.closest('[data-cps-tipo]');
    if (cpsTipoButton && currentMode === 'produtos-servicos' && cadastroState.isProdutosCadastroOpen) {
      const nextTipo = cpsTipoButton.getAttribute('data-cps-tipo') || 'produto';
      cadastroState = {
        ...cadastroState,
        produtosCadastro: {
          ...(cadastroState.produtosCadastro || {}),
          tipo: nextTipo,
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const cpsAccordionButton = event.target.closest('[data-cps-accordion]');
    if (cpsAccordionButton && currentMode === 'produtos-servicos' && cadastroState.isProdutosCadastroOpen) {
      const accordionId = cpsAccordionButton.getAttribute('data-cps-accordion');
      if (!accordionId) return;
      cadastroState = {
        ...cadastroState,
        produtosCadastro: {
          ...(cadastroState.produtosCadastro || {}),
          isCadastroComplementaresOpen: accordionId === 'cadastro'
            ? !(cadastroState.produtosCadastro?.isCadastroComplementaresOpen !== false)
            : cadastroState.produtosCadastro?.isCadastroComplementaresOpen !== false,
          isClasseComplementaresOpen: accordionId === 'classe'
            ? !(cadastroState.produtosCadastro?.isClasseComplementaresOpen !== false)
            : cadastroState.produtosCadastro?.isClasseComplementaresOpen !== false,
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const cpsCopyButton = event.target.closest('[data-cps-copy]');
    if (cpsCopyButton && currentMode === 'produtos-servicos' && cadastroState.isProdutosCadastroOpen) {
      editingProdutoServicoId = null;
      cadastroState = {
        ...cadastroState,
        produtosCadastro: {
          ...(cadastroState.produtosCadastro || {}),
          saveError: '',
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const cpsSelectClassButton = event.target.closest('[data-cps-select-class]');
    if (cpsSelectClassButton && currentMode === 'produtos-servicos' && cadastroState.isProdutosCadastroOpen) {
      openSelecionarClasseDrawer({
        triggerEl: cpsSelectClassButton,
        mode: 'cadastro',
      });
      return;
    }

    const cpsSaveButton = event.target.closest('[data-cps-save]');
    if (cpsSaveButton && currentMode === 'produtos-servicos' && cadastroState.isProdutosCadastroOpen) {
      await saveCadastroProdutosServicos();
      return;
    }

    const cpsCancelButton = event.target.closest('[data-cps-cancel]');
    if (cpsCancelButton && currentMode === 'produtos-servicos' && cadastroState.isProdutosCadastroOpen) {
      closeCadastroProdutosServicos();
      return;
    }

    const ceBackButton = event.target.closest('[data-ce-back]');
    if (ceBackButton && currentMode === 'produtos-servicos' && cadastroState.isEmbalagensCadastroOpen) {
      closeCadastroEmbalagens();
      return;
    }

    const ceCopyButton = event.target.closest('[data-ce-copy]');
    if (ceCopyButton && currentMode === 'produtos-servicos' && cadastroState.isEmbalagensCadastroOpen) {
      editingEmbalagemId = null;
      cadastroState = {
        ...cadastroState,
        embalagensCadastro: {
          ...(cadastroState.embalagensCadastro || {}),
          saveError: '',
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const ceSaveButton = event.target.closest('[data-ce-save]');
    if (ceSaveButton && currentMode === 'produtos-servicos' && cadastroState.isEmbalagensCadastroOpen) {
      await saveCadastroEmbalagens();
      return;
    }

    const ceCancelButton = event.target.closest('[data-ce-cancel]');
    if (ceCancelButton && currentMode === 'produtos-servicos' && cadastroState.isEmbalagensCadastroOpen) {
      closeCadastroEmbalagens();
      return;
    }

    const copyButton = event.target.closest('[data-cpe-copy]');
    if (copyButton && currentMode === 'pessoas-empresas') {
      editingPessoaEmpresaId = null;
      cadastroState = {
        ...cadastroState,
        saveError: '',
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const saveButton = event.target.closest('[data-cpe-save]');
    if (saveButton && currentMode === 'pessoas-empresas') {
      await saveCadastroPessoaEmpresa();
      return;
    }

    const cancelButton = event.target.closest('[data-cpe-cancel]');
    if (cancelButton && currentMode === 'pessoas-empresas') {
      closeCadastroPessoaEmpresa();
      return;
    }

    const actionButton = event.target.closest('[data-action]');
    if (actionButton) {
      const actionType = actionButton.dataset.action;
      if (!actionType) return;
      const row = actionButton.closest('tr');
      const rowId = String(row?.dataset.id || '');
      const grupoId = actionButton.getAttribute('data-cpe-grupo-view') || row?.getAttribute('data-grupo-id') || '';
      const isGrupoSubtabOpen = currentMode === 'pessoas-empresas'
        && cadastroState.isOpen
        && cadastroState.activeSubTab === 'grupo-empresas';
      if (isGrupoSubtabOpen && actionType === 'view') {
        openGrupoEmpresaDrawer({
          mode: 'edit',
          grupoId,
          triggerEl: actionButton,
        });
        return;
      }
      if (!rowId) return;
      const persistedRowId = asNumber(rowId);

      if (currentMode === 'pessoas-empresas') {
        if (actionType === 'edit' || actionType === 'view') {
          if (!persistedRowId) {
            await loadPessoasEmpresasFromApi(searchInput?.value || '');
            return;
          }
          try {
            const item = await apiRequest(`/pessoas-empresas/${persistedRowId}`);
            startPessoaEmpresaEdit(item || {});
          } catch (_) {
            // no-op
          }
          return;
        }
        if (actionType === 'delete') {
          if (!persistedRowId) {
            await loadPessoasEmpresasFromApi(searchInput?.value || '');
            return;
          }
          const shouldDelete = window.confirm('Confirma a exclusão deste cadastro?');
          if (!shouldDelete) return;
          try {
            await apiRequest(`/pessoas-empresas/${persistedRowId}`, { method: 'DELETE' });
            await loadPessoasEmpresasFromApi(searchInput?.value || '');
          } catch (error) {
            const errorMessage = error?.message || 'Não foi possível excluir o cadastro. Tente novamente.';
            console.error('[cadastros] Falha ao excluir pessoa/empresa', { rowId: persistedRowId, error });
            window.alert(errorMessage);
          }
          return;
        }
      }

      if (currentMode === 'produtos-servicos') {
        const activeSubTab = cadastroState.activeProdutosSubTab || 'produtos-servicos';
        if (activeSubTab === 'embalagens') {
          const item = (Array.isArray(embalagensRows) ? embalagensRows : []).find((it) => String(it?.id || '') === rowId);
          if (!item) return;
          if (actionType === 'edit' || actionType === 'view') {
            startEmbalagemEdit(item);
          }
          return;
        }

        const item = (Array.isArray(produtosServicosRows) ? produtosServicosRows : []).find((it) => String(it?.id || '') === rowId);
        if (!item) return;
        if (actionType === 'edit') {
          editingProdutoServicoId = rowId;
          startProdutoServicoEdit({
            ...item,
            tipo: item.tipo_item || '',
            classe: String(item.classe_id || ''),
            descricao: item.descricao || '',
            unidade: item.unidade || '',
            fornecedores: item.fornecedores || '',
            grupoEquivalencia: item.grupo_equivalencia || '',
            ncm: item.ncm || '',
            principioAtivo: item.principio_ativo || '',
            grupoQuimico: item.grupo_quimico || '',
            modoAcao: item.modo_acao || '',
            registroMapa: item.registro_mapa || '',
          });
          return;
        }
        if (actionType === 'view') {
          openProdutoServicoVerDrawer({
            triggerEl: actionButton,
            item: {
              ...item,
              id: String(item.id || ''),
              codigo: item.codigo || '',
              nome: item.descricao || '',
              tipo: item.tipo_item || '',
              classe: String(item.classe_id || ''),
              unidade: item.unidade || '',
              descricao: item.descricao || '',
            }
          });
        }
      }
    }
  };

  const handlePageChange = (event) => {
    if (!(event.target instanceof Element)) return;

    const classificacaoCategoriaField = event.target.closest('[data-cpsc-categoria-field]');
    if (classificacaoCategoriaField instanceof HTMLSelectElement
      && currentMode === 'produtos-servicos'
      && cadastroState.activeProdutosSubTab === 'classificacao') {
      const fieldName = classificacaoCategoriaField.getAttribute('data-cpsc-categoria-field') || '';
      if (!fieldName) return;
      const classificacao = cadastroState.produtosClassificacao || {};
      const editor = classificacao.categoriaEditor || {};
      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...classificacao,
          categoriaEditor: {
            ...editor,
            [fieldName]: classificacaoCategoriaField.value || '',
          },
        },
      };
      return;
    }

    const classificacaoClasseField = event.target.closest('[data-cpsc-classe-field]');
    if ((classificacaoClasseField instanceof HTMLInputElement || classificacaoClasseField instanceof HTMLSelectElement)
      && currentMode === 'produtos-servicos'
      && cadastroState.activeProdutosSubTab === 'classificacao') {
      const fieldName = classificacaoClasseField.getAttribute('data-cpsc-classe-field') || '';
      if (!fieldName) return;
      const classificacao = cadastroState.produtosClassificacao || {};
      const editor = classificacao.classeEditor || {};
      const fieldValue = classificacaoClasseField instanceof HTMLInputElement && classificacaoClasseField.type === 'checkbox'
        ? Boolean(classificacaoClasseField.checked)
        : (classificacaoClasseField.value || '');
      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...classificacao,
          classeEditor: {
            ...editor,
            [fieldName]: fieldValue,
          },
        },
      };
      return;
    }

    const ativoToggle = event.target.closest('#cadastro-pessoa-empresa-ativo');
    if (ativoToggle instanceof HTMLInputElement) {
      cadastroState = {
        ...cadastroState,
        isAtivo: Boolean(ativoToggle.checked),
        saveError: '',
      };
      return;
    }

    const produtoAtivoToggle = event.target.closest('#cadastro-produtos-servicos-ativo');
    if (produtoAtivoToggle instanceof HTMLInputElement) {
      cadastroState = {
        ...cadastroState,
        produtosCadastro: {
          ...(cadastroState.produtosCadastro || {}),
          isAtivo: Boolean(produtoAtivoToggle.checked),
          saveError: '',
        },
      };
      return;
    }

    handleProdutoFieldUpdate(event.target);
    handleCadastroFieldUpdate(event.target);
  };

  const handlePageInput = (event) => {
    if (!(event.target instanceof Element)) return;

    if (event.target.id === 'cadastros-search-input' && currentMode === 'pessoas-empresas') {
      void loadPessoasEmpresasFromApi(event.target.value || '');
      return;
    }
    if (event.target.id === 'cadastros-search-input' && currentMode === 'produtos-servicos') {
      const activeSubTab = cadastroState.activeProdutosSubTab || 'produtos-servicos';
      if (activeSubTab === 'embalagens') {
        void loadEmbalagensFromApi(event.target.value || '');
      } else if (activeSubTab === 'produtos-servicos') {
        void loadProdutosServicosFromApi(event.target.value || '');
      }
      return;
    }
    const grupoSearchInput = event.target.closest('[data-cpe-grupo-search]');
    if (grupoSearchInput instanceof HTMLInputElement && currentMode === 'pessoas-empresas') {
      const query = (grupoSearchInput.value || '').trim().toLowerCase();
      const allRows = Array.isArray(cadastroState.grupoEmpresasRowsAll) ? cadastroState.grupoEmpresasRowsAll : [];

      cadastroState = {
        ...cadastroState,
        grupoEmpresasSearch: query,
        grupoEmpresasRows: allRows.filter((row = {}) => {
          const codigo = String(row.codigo || '').toLowerCase();
          const nome = String(row.nome || '').toLowerCase();
          const descricao = String(row.descricao || '').toLowerCase();
          return codigo.includes(query) || nome.includes(query) || descricao.includes(query);
        }),
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const classificacaoSearchInput = event.target.closest('[data-cpsc-search]');
    if (classificacaoSearchInput instanceof HTMLInputElement && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...(cadastroState.produtosClassificacao || {}),
          search: classificacaoSearchInput.value || '',
        },
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    const classificacaoGrupoField = event.target.closest('[data-cpsc-grupo-field]');
    if (classificacaoGrupoField instanceof HTMLInputElement && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      const fieldName = classificacaoGrupoField.getAttribute('data-cpsc-grupo-field') || '';
      if (!fieldName) return;
      const classificacao = cadastroState.produtosClassificacao || {};
      const editor = classificacao.grupoEditor || {};
      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...classificacao,
          grupoEditor: {
            ...editor,
            [fieldName]: classificacaoGrupoField.value || '',
          },
        },
      };
      return;
    }

    const embalagemAtivoToggle = event.target.closest('#cadastro-embalagens-ativo');
    if (embalagemAtivoToggle instanceof HTMLInputElement) {
      cadastroState = {
        ...cadastroState,
        embalagensCadastro: {
          ...(cadastroState.embalagensCadastro || {}),
          isAtivo: Boolean(embalagemAtivoToggle.checked),
          saveError: '',
        },
      };
      return;
    }

    const classificacaoCategoriaField = event.target.closest('[data-cpsc-categoria-field]');
    if ((classificacaoCategoriaField instanceof HTMLInputElement || classificacaoCategoriaField instanceof HTMLSelectElement)
      && currentMode === 'produtos-servicos'
      && cadastroState.activeProdutosSubTab === 'classificacao') {
      const fieldName = classificacaoCategoriaField.getAttribute('data-cpsc-categoria-field') || '';
      if (!fieldName) return;
      const classificacao = cadastroState.produtosClassificacao || {};
      const editor = classificacao.categoriaEditor || {};
      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...classificacao,
          categoriaEditor: {
            ...editor,
            [fieldName]: classificacaoCategoriaField.value || '',
          },
        },
      };
      return;
    }

    const classificacaoClasseField = event.target.closest('[data-cpsc-classe-field]');
    if ((classificacaoClasseField instanceof HTMLInputElement || classificacaoClasseField instanceof HTMLSelectElement)
      && currentMode === 'produtos-servicos'
      && cadastroState.activeProdutosSubTab === 'classificacao') {
      const fieldName = classificacaoClasseField.getAttribute('data-cpsc-classe-field') || '';
      if (!fieldName) return;
      const classificacao = cadastroState.produtosClassificacao || {};
      const editor = classificacao.classeEditor || {};
      const fieldValue = classificacaoClasseField instanceof HTMLInputElement && classificacaoClasseField.type === 'checkbox'
        ? Boolean(classificacaoClasseField.checked)
        : (classificacaoClasseField.value || '');
      cadastroState = {
        ...cadastroState,
        produtosClassificacao: {
          ...classificacao,
          classeEditor: {
            ...editor,
            [fieldName]: fieldValue,
          },
        },
      };
      return;
    }

    handleEmbalagemFieldUpdate(event.target);
    handleProdutoFieldUpdate(event.target);
    handleCadastroFieldUpdate(event.target);
  };

  const handlePageKeydown = (event) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    if (!event.target.matches('[data-cpe-email-input]')) return;
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const value = event.target.value.trim();
    if (!value) return;
    if ((cadastroState.emailChips || []).includes(value)) return;
    cadastroState = {
      ...cadastroState,
      emailChips: [...(cadastroState.emailChips || []), value],
      saveError: '',
    };
    event.target.value = '';
    renderCadastroPessoaEmpresa();
    document.getElementById('cpe-email')?.focus();
  };

  window.addEventListener('header:tabchange', handleHeaderTabChange);
  if (advancedFiltersButton) advancedFiltersButton.addEventListener('click', handleAdvancedFiltersClick);
  if (badgesContainer) badgesContainer.addEventListener('click', handleBadgeClick);
  if (page) page.addEventListener('click', handlePageClick);
  if (page) page.addEventListener('change', handlePageChange);
  if (page) page.addEventListener('input', handlePageInput);
  if (page) page.addEventListener('keydown', handlePageKeydown);

  void (async () => {
    await loadLookups();
    await Promise.all([
      loadPessoasEmpresasFromApi(searchInput?.value || ''),
      loadProdutosServicosFromApi(searchInput?.value || ''),
      loadEmbalagensFromApi(searchInput?.value || ''),
      loadClassificacaoFromApi(),
    ]);
    if (isCategoriaRoute) {
      openCategoriaDrawer({ initialTab: cadastroState.categoriaDrawerTab || 'ativos' });
    }
  })();

  applyMode(currentMode);

  return () => {
    cancelPendingSave();
    pendingControllers.forEach((controller) => controller.abort());
    pendingControllers.clear();
    grupoEmpresaDrawer.cleanup();
    ramoDrawer.cleanup();
    categoriaDrawer.cleanup();
    pessoasEmpresasFiltrosDrawer.cleanup();
    produtosFiltrosDrawer.cleanup();
    produtoServicoVerDrawer.cleanup();
    classeProdutosDrawer.cleanup();
    selecionarClasseDrawer.cleanup();
    if (appHeader) appHeader.classList.remove('header--kanban-compact-tabs');
    window.removeEventListener('header:tabchange', handleHeaderTabChange);
    if (advancedFiltersButton) advancedFiltersButton.removeEventListener('click', handleAdvancedFiltersClick);
    if (badgesContainer) badgesContainer.removeEventListener('click', handleBadgeClick);
    if (page) page.removeEventListener('click', handlePageClick);
    if (page) page.removeEventListener('change', handlePageChange);
    if (page) page.removeEventListener('input', handlePageInput);
    if (page) page.removeEventListener('keydown', handlePageKeydown);
  };
}

export default { init };


























