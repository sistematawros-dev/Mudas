import { createCadastroPessoaEmpresaMarkup } from './cadastroPessoaEmpresa.js';
import { createCadastroProdutosServicosMarkup } from './cadastroProdutosServicos.js';
import { createCadastroEmbalagensMarkup } from './cadastroEmbalagens.js';
import { createClassificacaoProdutosServicosMarkup } from './classificacaoProdutosServicos.js';
import { initGrupoEmpresaDrawer } from '../../components/grupo-empresa/grupoEmpresaDrawer.js';
import { initClasseProdutosDrawer } from '../../components/classificacao/classeProdutosDrawer.js';
import { initSelecionarClasseDrawer } from '../../components/classificacao/selecionarClasseDrawer.js';

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

  const currentHash = (window.location.hash || '').replace('#', '');
  const isProdutosServicosRoute = currentHash.startsWith('/cadastros/produtos-servicos');
  const isProdutosClassificacaoRoute = currentHash.startsWith('/cadastros/produtos-servicos/classificacao');
  let currentMode = isProdutosServicosRoute ? 'produtos-servicos' : 'pessoas-empresas';
  let saveTimeoutId = null;

  let cadastroState = {
    isOpen: false,
    activeSubTab: 'pessoas-empresas',
    tipo: 'pessoas',
    isAtivo: true,
    isComplementaresOpen: true,
    isSaving: false,
    saveError: '',
    ramoChips: ['Badge'],
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
      unidadeEquivalenciaOptions: [
        { value: 'L', label: 'Litro (L)' },
        { value: 'KG', label: 'Quilograma (Kg)' },
        { value: 'UN', label: 'Unidade (UN)' },
      ],
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
      selectedGrupoId: '03',
      selectedCategoriaId: '03.01',
      selectedClasseId: '03.01.01',
      grupos: [
        { id: '01', codigo: '01', nome: 'Insumos Agricolas' },
        { id: '02', codigo: '02', nome: 'Ferramentas' },
        { id: '03', codigo: '03', nome: 'Equipamentos' },
        { id: '04', codigo: '04', nome: 'Maquinario' },
      ],
      categorias: [
        { id: '03.01', grupoId: '03', codigo: '03.01', nome: 'Irrigacao' },
        { id: '03.02', grupoId: '03', codigo: '03.02', nome: 'Pulverizacao' },
      ],
      classes: [
        { id: '03.01.01', categoriaId: '03.01', codigo: '03.01.01', nome: 'Aspersores' },
        { id: '03.01.02', categoriaId: '03.01', codigo: '03.01.02', nome: 'Gotejadores' },
      ],
      classeProdutosItems: [
        { id: 'ps-1', codigo: 'INS-001', tipo: 'Servico', descricao: 'Inseticida POWER KILL', unidade: '01.01.01 - Inseticida' },
        { id: 'ps-2', codigo: 'INS-002', tipo: 'Servico', descricao: 'Fungicida SAFE CROP', unidade: '01.01.02 - Fungicida' },
        { id: 'ps-3', codigo: 'INS-003', tipo: 'Produto', descricao: 'Herbicida FIELD MAX', unidade: '01.01.03 - Herbicida' },
        { id: 'ps-4', codigo: 'INS-004', tipo: 'Produto', descricao: 'Adjuvante PRO MIX', unidade: '01.01.04 - Adjuvante' },
      ],
      classeProdutosSelectedByClasse: {},
    },
    isGrupoDrawerOpen: false,
    isClasseProdutosDrawerOpen: false,
    isSelecionarClasseDrawerOpen: false,
    grupoDrawerMode: 'create',
    selectedGrupoId: null,
    grupoEmpresasSearch: '',
    grupoEmpresasCadastros: [
      { id: 'cad-1', nome: 'Maria Santos', documento: '987.654.321-00', tipo: 'PF', href: '#/cadastros' },
      { id: 'cad-2', nome: 'Tech Solutions Ltda', documento: '12.345.678/0001-90', tipo: 'PJ', href: '#/cadastros' },
      { id: 'cad-3', nome: 'Comércio ABC SA', documento: '12.345.678/0001-90', tipo: 'PJ', href: '#/cadastros' },
      { id: 'cad-4', nome: 'Comércio ABC SA', documento: '12.345.678/0001-90', tipo: 'PJ', href: '#/cadastros' },
    ],
    grupoEmpresasRowsAll: [
      { codigo: '434323', nome: 'Nome do Grupo', descricao: 'Descrição da empresa' },
      { codigo: '434323', nome: 'Nome do Grupo', descricao: 'Descrição da empresa' },
    ],
    grupoEmpresasRows: [
      { codigo: '434323', nome: 'Nome do Grupo', descricao: 'Descrição da empresa' },
      { codigo: '434323', nome: 'Nome do Grupo', descricao: 'Descrição da empresa' },
    ],
    form: {
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
      email: '',
      observacoes: '',
      setor: '',
    },
  };

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

  function openCadastroPessoaEmpresa() {
    cadastroState = {
      ...cadastroState,
      isOpen: true,
      saveError: '',
      activeSubTab: cadastroState.activeSubTab || 'pessoas-empresas',
    };
    renderCadastroPessoaEmpresa();
  }

  function openCadastroProdutosServicos() {
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
    if (cadastroState.isClasseProdutosDrawerOpen) classeProdutosDrawer.close();
    if (cadastroState.isSelecionarClasseDrawerOpen) selecionarClasseDrawer.close();
    cadastroState = {
      ...cadastroState,
      isOpen: false,
      isSaving: false,
      saveError: '',
      isGrupoDrawerOpen: false,
      isClasseProdutosDrawerOpen: false,
      isSelecionarClasseDrawerOpen: false,
      isEmbalagensCadastroOpen: false,
      selectedGrupoId: null,
    };
    renderCadastroPessoaEmpresa();
  }

  function openCadastroEmbalagens() {
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
    return {
      ativo: Boolean(cadastroState.isAtivo),
      tipo: cadastroState.tipo || 'pessoas',
      ramo: Array.isArray(cadastroState.ramoChips) ? cadastroState.ramoChips : [],
      ...cadastroState.form,
    };
  }

  function validateCadastro() {
    const form = cadastroState.form || {};
    if (!form.grupo) return 'Selecione o Grupo de Empresas.';
    if (!form.categoria) return 'Selecione a Categoria.';
    if (!form.setor) return 'Selecione o Setor.';
    if (!Array.isArray(cadastroState.ramoChips) || cadastroState.ramoChips.length === 0) {
      return 'Informe ao menos um Ramo.';
    }
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
      await new Promise((resolve) => {
        saveTimeoutId = window.setTimeout(() => {
          saveTimeoutId = null;
          resolve();
        }, 900);
      });

      if (!cadastroState.isOpen) return;
      console.log('Salvar cadastro pessoa/empresa', buildCadastroPayload());
      closeCadastroPessoaEmpresa();
    } catch (error) {
      cadastroState = {
        ...cadastroState,
        isSaving: false,
        saveError: 'Não foi possível salvar o cadastro. Tente novamente.',
      };
      renderCadastroPessoaEmpresa();
      return;
    }

    cadastroState = { ...cadastroState, isSaving: false };
    renderCadastroPessoaEmpresa();
  }

  function buildCadastroProdutoServicoPayload() {
    const produtosCadastro = cadastroState.produtosCadastro || {};
    return {
      ativo: Boolean(produtosCadastro.isAtivo),
      tipo: produtosCadastro.tipo || 'produto',
      ...(produtosCadastro.form || {}),
      marca: Array.isArray(produtosCadastro.marcaChips) ? produtosCadastro.marcaChips : [],
      fabricante: Array.isArray(produtosCadastro.fabricanteChips) ? produtosCadastro.fabricanteChips : [],
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
      await new Promise((resolve) => {
        saveTimeoutId = window.setTimeout(() => {
          saveTimeoutId = null;
          resolve();
        }, 900);
      });

      if (!cadastroState.isProdutosCadastroOpen) return;
      console.log('Salvar cadastro produto/serviço', buildCadastroProdutoServicoPayload());
      closeCadastroProdutosServicos();
    } catch (error) {
      cadastroState = {
        ...cadastroState,
        produtosCadastro: {
          ...(cadastroState.produtosCadastro || {}),
          isSaving: false,
          saveError: 'Não foi possível salvar o cadastro. Tente novamente.',
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
    return {
      ativo: Boolean(embalagensCadastro.isAtivo),
      ...(embalagensCadastro.form || {}),
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
      await new Promise((resolve) => {
        saveTimeoutId = window.setTimeout(() => {
          saveTimeoutId = null;
          resolve();
        }, 900);
      });

      if (!cadastroState.isEmbalagensCadastroOpen) return;
      console.log('Salvar cadastro embalagem', buildCadastroEmbalagensPayload());
      closeCadastroEmbalagens();
    } catch (error) {
      cadastroState = {
        ...cadastroState,
        embalagensCadastro: {
          ...(cadastroState.embalagensCadastro || {}),
          isSaving: false,
          saveError: 'Não foi possível salvar o cadastro. Tente novamente.',
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

      tableBody.innerHTML = `
        <tr data-code="INS-001">
          <td>INS-001</td>
          <td>Nome da embalagem</td>
          <td>NE</td>
          <td>100</td>
          <td>L</td>
          <td class="cadastros-actions">
            <button type="button" class="cadastros-link" data-action="view">Ver
              <svg viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="1.6" stroke="currentColor" stroke-width="1.3"/></svg>
            </button>
            <button type="button" class="cadastros-link cadastros-link--edit" data-action="edit">Editar
              <svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </td>
        </tr>
        <tr data-code="INS-001">
          <td>INS-001</td>
          <td>Nome da embalagem</td>
          <td>NE</td>
          <td>100</td>
          <td>L</td>
          <td class="cadastros-actions">
            <button type="button" class="cadastros-link" data-action="view">Ver
              <svg viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="1.6" stroke="currentColor" stroke-width="1.3"/></svg>
            </button>
            <button type="button" class="cadastros-link cadastros-link--edit" data-action="edit">Editar
              <svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </td>
        </tr>
      `;
      return;
    }

    tableHead.innerHTML = `
      <tr>
        <th>Código</th>
        <th>Classe</th>
        <th>Tipo</th>
        <th>Descrição</th>
        <th>Unidade</th>
        <th>Acoes</th>
      </tr>
    `;

    tableBody.innerHTML = `
      <tr data-code="INS-001">
        <td>INS-001</td>
        <td>01.01.01 - Inseticida</td>
        <td>Serviço</td>
        <td>Inseticida POWER KILL</td>
        <td>L</td>
        <td class="cadastros-actions">
          <button type="button" class="cadastros-link" data-action="view">Ver
            <svg viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="1.6" stroke="currentColor" stroke-width="1.3"/></svg>
          </button>
          <button type="button" class="cadastros-link cadastros-link--edit" data-action="edit">Editar
            <svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </td>
      </tr>
      <tr data-code="INS-001">
        <td>INS-001</td>
        <td>01.01.01 - Inseticida</td>
        <td>Produto</td>
        <td>Inseticida POWER KILL</td>
        <td>L</td>
        <td class="cadastros-actions">
          <button type="button" class="cadastros-link" data-action="view">Ver
            <svg viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="1.6" stroke="currentColor" stroke-width="1.3"/></svg>
          </button>
          <button type="button" class="cadastros-link cadastros-link--edit" data-action="edit">Editar
            <svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </td>
      </tr>
    `;
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
    tableBody.innerHTML = originalTableBodyHtml;
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
    console.log('Filtros avançados');
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
    const fieldValue = isCheckbox ? target.checked : target.value;

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

    const createLink = event.target.closest('[data-cpe-create]');
    if (createLink && currentMode === 'pessoas-empresas') {
      const resource = createLink.getAttribute('data-cpe-create') || 'registro';
      if (resource === 'grupo' && cadastroState.activeSubTab === 'grupo-empresas' && cadastroState.isOpen) {
        openGrupoEmpresaDrawer({
          mode: 'create',
          grupoId: null,
          triggerEl: createLink,
        });
        return;
      }
      console.log(`Ação de criação (${resource}) ainda não integrada ao backend.`);
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
      console.log(`Criar novo ${resource} ainda nao integrado ao backend.`);
      return;
    }

    const classificacaoSaveButton = event.target.closest('[data-cpsc-save]');
    if (classificacaoSaveButton && currentMode === 'produtos-servicos' && cadastroState.activeProdutosSubTab === 'classificacao') {
      console.log('Salvar classificacao de produtos/servicos', buildClassificacaoPayload());
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
      console.log('Copiar cadastro produto/serviço', buildCadastroProdutoServicoPayload());
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
      console.log('Copiar cadastro embalagem', buildCadastroEmbalagensPayload());
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
      console.log('Copiar cadastro pessoa/empresa', buildCadastroPayload());
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
      const code = row?.dataset.code || '';
      console.log(`Ação: ${actionType}${code ? ` (${code})` : ''}`);
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

  window.addEventListener('header:tabchange', handleHeaderTabChange);
  if (advancedFiltersButton) advancedFiltersButton.addEventListener('click', handleAdvancedFiltersClick);
  if (badgesContainer) badgesContainer.addEventListener('click', handleBadgeClick);
  if (page) page.addEventListener('click', handlePageClick);
  if (page) page.addEventListener('change', handlePageChange);
  if (page) page.addEventListener('input', handlePageInput);

  applyMode(currentMode);

  return () => {
    cancelPendingSave();
    grupoEmpresaDrawer.cleanup();
    classeProdutosDrawer.cleanup();
    selecionarClasseDrawer.cleanup();
    if (appHeader) appHeader.classList.remove('header--kanban-compact-tabs');
    window.removeEventListener('header:tabchange', handleHeaderTabChange);
    if (advancedFiltersButton) advancedFiltersButton.removeEventListener('click', handleAdvancedFiltersClick);
    if (badgesContainer) badgesContainer.removeEventListener('click', handleBadgeClick);
    if (page) page.removeEventListener('click', handlePageClick);
    if (page) page.removeEventListener('change', handlePageChange);
    if (page) page.removeEventListener('input', handlePageInput);
  };
}

export default { init };

