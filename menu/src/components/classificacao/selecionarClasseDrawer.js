import * as Drawer from '../drawer/drawer.js';
import * as Input from '../input/input.js';

const DRAWER_ID = 'selecionar-classe-drawer';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeGroups(groups = []) {
  if (!Array.isArray(groups)) return [];
  return groups.map((item = {}, index) => ({
    id: String(item.id ?? `grupo-${index + 1}`),
    codigo: String(item.codigo ?? ''),
    nome: String(item.nome ?? ''),
  }));
}

function normalizeCategorias(categorias = []) {
  if (!Array.isArray(categorias)) return [];
  return categorias.map((item = {}, index) => ({
    id: String(item.id ?? `categoria-${index + 1}`),
    grupoId: String(item.grupoId ?? ''),
    codigo: String(item.codigo ?? ''),
    nome: String(item.nome ?? ''),
  }));
}

function normalizeClasses(classes = []) {
  if (!Array.isArray(classes)) return [];
  return classes.map((item = {}, index) => ({
    id: String(item.id ?? `classe-${index + 1}`),
    categoriaId: String(item.categoriaId ?? ''),
    codigo: String(item.codigo ?? ''),
    nome: String(item.nome ?? ''),
  }));
}

function buildTree(groups = [], categorias = [], classes = []) {
  const normalizedGroups = normalizeGroups(groups);
  const normalizedCategorias = normalizeCategorias(categorias);
  const normalizedClasses = normalizeClasses(classes);

  return normalizedGroups.map((grupo) => {
    const grupoCategorias = normalizedCategorias
      .filter((categoria) => categoria.grupoId === grupo.id)
      .map((categoria) => ({
        ...categoria,
        classes: normalizedClasses.filter((classe) => classe.categoriaId === categoria.id),
      }));

    return {
      ...grupo,
      categorias: grupoCategorias,
    };
  });
}

function filterTree(tree = [], rawSearch = '') {
  const query = String(rawSearch || '').trim().toLowerCase();
  if (!query) return tree;

  return tree
    .map((grupo) => {
      const grupoMatch = `${grupo.codigo} ${grupo.nome}`.toLowerCase().includes(query);
      const categorias = (grupo.categorias || [])
        .map((categoria) => {
          const categoriaMatch = `${categoria.codigo} ${categoria.nome}`.toLowerCase().includes(query);
          const classes = (categoria.classes || []).filter((classe) => `${classe.codigo} ${classe.nome}`.toLowerCase().includes(query));
          if (!categoriaMatch && classes.length === 0) return null;
          return { ...categoria, classes };
        })
        .filter(Boolean);

      if (!grupoMatch && categorias.length === 0) return null;
      return {
        ...grupo,
        categorias: grupoMatch ? (grupo.categorias || []) : categorias,
      };
    })
    .filter(Boolean);
}

function classRowActions() {
  return `
    <span class="selecionar-classe-drawer__row-actions" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <svg viewBox="0 0 16 16" fill="none"><path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="1.4" stroke="currentColor" stroke-width="1.2"/></svg>
      <svg viewBox="0 0 16 16" fill="none"><path d="M3 1.8H10L13.2 5V14.2H3V1.8Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M10 1.8V5H13.2" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
    </span>
  `;
}

function findClassById(tree = [], classId = '') {
  const targetId = String(classId || '');
  if (!targetId) return null;
  for (let i = 0; i < tree.length; i += 1) {
    const grupo = tree[i] || {};
    const categorias = Array.isArray(grupo.categorias) ? grupo.categorias : [];
    for (let j = 0; j < categorias.length; j += 1) {
      const categoria = categorias[j] || {};
      const classes = Array.isArray(categoria.classes) ? categoria.classes : [];
      for (let k = 0; k < classes.length; k += 1) {
        const classe = classes[k] || {};
        if (String(classe.id || '') === targetId) {
          return {
            id: String(classe.id || ''),
            codigo: String(classe.codigo || ''),
            nome: String(classe.nome || ''),
            categoriaId: String(categoria.id || ''),
            grupoId: String(grupo.id || ''),
          };
        }
      }
    }
  }
  return null;
}

function renderTree(state = {}) {
  const filteredTree = filterTree(Array.isArray(state.tree) ? state.tree : [], state.search);
  if (!Array.isArray(filteredTree) || filteredTree.length === 0) {
    return '<p class="selecionar-classe-drawer__empty">Nenhum item encontrado.</p>';
  }

  return `
    <ul class="selecionar-classe-drawer__tree" role="tree">
      ${filteredTree.map((grupo = {}) => {
    const grupoId = String(grupo.id || '');
    const isGrupoExpanded = state.expandedGrupoIds instanceof Set ? state.expandedGrupoIds.has(grupoId) : false;
    const grupoCategorias = Array.isArray(grupo.categorias) ? grupo.categorias : [];
    return `
          <li class="selecionar-classe-drawer__node">
            <button
              type="button"
              class="selecionar-classe-drawer__row selecionar-classe-drawer__row--grupo"
              data-scd-toggle="grupo"
              data-scd-id="${escapeHtml(grupoId)}"
            >
              <span class="selecionar-classe-drawer__row-left" aria-hidden="true">
                <svg class="selecionar-classe-drawer__icon-edit" viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <svg class="selecionar-classe-drawer__icon-chevron ${isGrupoExpanded ? 'is-expanded' : ''}" viewBox="0 0 16 16" fill="none"><path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <svg class="selecionar-classe-drawer__icon-folder" viewBox="0 0 16 16" fill="none"><path d="M1.8 4.5H6.2L7.3 5.8H14.2V11.7C14.2 12.3 13.7 12.8 13.1 12.8H2.9C2.3 12.8 1.8 12.3 1.8 11.7V4.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
              </span>
              <span class="selecionar-classe-drawer__row-label">
                <span class="selecionar-classe-drawer__row-code">${escapeHtml(grupo.codigo || '-')}</span>
                <span class="selecionar-classe-drawer__row-name">${escapeHtml(grupo.nome || '-')}</span>
              </span>
            </button>

            ${isGrupoExpanded ? `
            <ul class="selecionar-classe-drawer__children">
              ${grupoCategorias.map((categoria = {}) => {
      const categoriaId = String(categoria.id || '');
      const isCategoriaExpanded = state.expandedCategoriaIds instanceof Set
        ? state.expandedCategoriaIds.has(categoriaId)
        : false;
      const categoriaClasses = Array.isArray(categoria.classes) ? categoria.classes : [];
      return `
                  <li class="selecionar-classe-drawer__node">
                    <button
                      type="button"
                      class="selecionar-classe-drawer__row selecionar-classe-drawer__row--categoria"
                      data-scd-toggle="categoria"
                      data-scd-id="${escapeHtml(categoriaId)}"
                    >
                      <span class="selecionar-classe-drawer__row-left" aria-hidden="true">
                        <svg class="selecionar-classe-drawer__icon-edit" viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <svg class="selecionar-classe-drawer__icon-chevron ${isCategoriaExpanded ? 'is-expanded' : ''}" viewBox="0 0 16 16" fill="none"><path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <svg class="selecionar-classe-drawer__icon-folder" viewBox="0 0 16 16" fill="none"><path d="M1.8 4.5H6.2L7.3 5.8H14.2V11.7C14.2 12.3 13.7 12.8 13.1 12.8H2.9C2.3 12.8 1.8 12.3 1.8 11.7V4.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
                      </span>
                      <span class="selecionar-classe-drawer__row-label">
                        <span class="selecionar-classe-drawer__row-code">${escapeHtml(categoria.codigo || '-')}</span>
                        <span class="selecionar-classe-drawer__row-name">${escapeHtml(categoria.nome || '-')}</span>
                      </span>
                    </button>

                    ${isCategoriaExpanded ? `
                    <ul class="selecionar-classe-drawer__children">
                      ${categoriaClasses.map((classe = {}) => {
        const classeId = String(classe.id || '');
        const isSelected = String(state.selectedClassId || '') === classeId;
        return `
                          <li class="selecionar-classe-drawer__node">
                            <button
                              type="button"
                              class="selecionar-classe-drawer__row selecionar-classe-drawer__row--classe ${isSelected ? 'is-selected' : ''}"
                              data-scd-select="classe"
                              data-scd-id="${escapeHtml(classeId)}"
                              data-scd-categoria-id="${escapeHtml(categoriaId)}"
                              data-scd-grupo-id="${escapeHtml(grupoId)}"
                            >
                              <span class="selecionar-classe-drawer__row-label">
                                <span class="selecionar-classe-drawer__row-code">${escapeHtml(classe.codigo || '-')}</span>
                                <span class="selecionar-classe-drawer__row-name">${escapeHtml(classe.nome || '-')}</span>
                              </span>
                              ${state.mode === 'cadastro' ? `
                                <span class="selecionar-classe-drawer__row-file" aria-hidden="true">
                                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 1.8H10L13.2 5V14.2H3V1.8Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M10 1.8V5H13.2" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
                                </span>
                              ` : classRowActions()}
                            </button>
                          </li>
                        `;
      }).join('')}
                    </ul>
                    ` : ''}
                  </li>
                `;
    }).join('')}
            </ul>
            ` : ''}
          </li>
        `;
  }).join('')}
    </ul>
  `;
}

function createBody(state = {}) {
  const search = Input.createSearch({
    id: 'selecionar-classe-search',
    placeholder: 'Buscar na estrutura...',
    value: state.search || '',
    disabled: Boolean(state.loading),
  });

  return `
    <div class="selecionar-classe-drawer">
      <div class="selecionar-classe-drawer__search">${search}</div>
      <div class="selecionar-classe-drawer__content">
        ${renderTree(state)}
      </div>
      ${state.mode === 'cadastro' ? `
        <section class="selecionar-classe-drawer__selected">
          <p class="selecionar-classe-drawer__selected-label">Selecionado:</p>
          <div class="selecionar-classe-drawer__selected-values">
            <span class="selecionar-classe-drawer__selected-code">${escapeHtml(state.selectedItem?.codigo || '-')}</span>
            <strong class="selecionar-classe-drawer__selected-name">${escapeHtml(state.selectedItem?.nome || '-')}</strong>
          </div>
        </section>
      ` : ''}
      ${state.error ? `<p class="selecionar-classe-drawer__error">${escapeHtml(state.error)}</p>` : ''}
    </div>
  `;
}

function createFooter(state = {}) {
  if (state.mode === 'cadastro') {
    const hasSelected = Boolean(state.selectedItem?.id);
    return `
      <div class="selecionar-classe-drawer__footer selecionar-classe-drawer__footer--cadastro">
        <button type="button" class="btn btn--outline-dark" data-scd-action="access-cadastro" ${hasSelected ? '' : 'disabled'}>Acessar cadastro</button>
        <div class="selecionar-classe-drawer__footer-right">
          <button type="button" class="btn btn--outline-dark" data-scd-action="cancel">Cancelar</button>
          <button type="button" class="btn btn--primary" data-scd-action="confirm" ${hasSelected ? '' : 'disabled'}>Selecionar</button>
        </div>
      </div>
    `;
  }
  return `
    <div class="selecionar-classe-drawer__footer">
      <button type="button" class="btn btn--primary" data-scd-action="back" ${state.loading ? 'disabled' : ''}>Voltar</button>
    </div>
  `;
}

export function initSelecionarClasseDrawer(options = {}) {
  const callbacks = {
    onClose: typeof options.onClose === 'function' ? options.onClose : null,
    onSelect: typeof options.onSelect === 'function' ? options.onSelect : null,
    onConfirm: typeof options.onConfirm === 'function' ? options.onConfirm : null,
    onAccessCadastro: typeof options.onAccessCadastro === 'function' ? options.onAccessCadastro : null,
  };

  document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();

  const drawerHtml = Drawer.create({
    id: DRAWER_ID,
    title: 'Selecionar Classe do Produto/Serviço',
    width: 430,
    content: '',
    footer: '',
  });
  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  let state = {
    open: false,
    mode: 'classificacao',
    loading: false,
    error: '',
    search: '',
    subtitle: '',
    tree: [],
    selectedClassId: '',
    selectedItem: null,
    expandedGrupoIds: new Set(),
    expandedCategoriaIds: new Set(),
  };

  const drawerControls = Drawer.init({
    id: DRAWER_ID,
    root: document,
    onClose: () => {
      state.open = false;
      state.search = '';
      if (callbacks.onClose) callbacks.onClose();
    },
  });

  const drawerElement = document.querySelector(`[data-drawer="${DRAWER_ID}"]`);
  if (!drawerElement) return { open: () => {}, close: () => {}, cleanup: () => {} };

  let cleanupInput = () => {};

  const ensureExpandedPath = () => {
    if (!state.selectedClassId) return;
    const selectedClassId = String(state.selectedClassId);
    const tree = Array.isArray(state.tree) ? state.tree : [];
    for (let i = 0; i < tree.length; i += 1) {
      const grupo = tree[i] || {};
      const categorias = Array.isArray(grupo.categorias) ? grupo.categorias : [];
      for (let j = 0; j < categorias.length; j += 1) {
        const categoria = categorias[j] || {};
        const classes = Array.isArray(categoria.classes) ? categoria.classes : [];
        if (classes.some((classe = {}) => String(classe.id || '') === selectedClassId)) {
          state.expandedGrupoIds.add(String(grupo.id || ''));
          state.expandedCategoriaIds.add(String(categoria.id || ''));
          return;
        }
      }
    }
  };

  const render = () => {
    const header = drawerElement.querySelector('.drawer__header');
    const title = drawerElement.querySelector('.drawer__title');
    const body = drawerElement.querySelector('.drawer__body');
    const footer = drawerElement.querySelector('.drawer__footer');
    if (!body || !footer) return;

    if (title) title.textContent = 'Selecionar Classe do Produto/Serviço';
    if (header) {
      const previousSubtitle = header.querySelector('.selecionar-classe-drawer__header-subtitle');
      if (state.subtitle) {
        if (previousSubtitle) {
          previousSubtitle.textContent = state.subtitle;
        } else if (title) {
          title.insertAdjacentHTML(
            'afterend',
            `<p class="selecionar-classe-drawer__header-subtitle">${escapeHtml(state.subtitle)}</p>`
          );
        }
      } else if (previousSubtitle) {
        previousSubtitle.remove();
      }
    }

    body.innerHTML = createBody(state);
    footer.innerHTML = createFooter(state);
    cleanupInput();
    cleanupInput = Input.init(drawerElement) || (() => {});
  };

  const handleInput = (event) => {
    if (!(event.target instanceof Element)) return;
    const searchInput = event.target.closest('#selecionar-classe-search');
    if (!(searchInput instanceof HTMLInputElement)) return;
    state.search = searchInput.value || '';
    render();
  };

  const handleClick = (event) => {
    if (!(event.target instanceof Element)) return;

    const backButton = event.target.closest('[data-scd-action="back"]');
    if (backButton) {
      drawerControls.close();
      return;
    }

    const cancelButton = event.target.closest('[data-scd-action="cancel"]');
    if (cancelButton) {
      drawerControls.close();
      return;
    }

    const accessCadastroButton = event.target.closest('[data-scd-action="access-cadastro"]');
    if (accessCadastroButton) {
      if (!state.selectedItem?.id) return;
      if (callbacks.onAccessCadastro) callbacks.onAccessCadastro(state.selectedItem);
      return;
    }

    const confirmButton = event.target.closest('[data-scd-action="confirm"]');
    if (confirmButton) {
      if (!state.selectedItem?.id) return;
      if (callbacks.onConfirm) callbacks.onConfirm(state.selectedItem);
      drawerControls.close();
      return;
    }

    const grupoToggle = event.target.closest('[data-scd-toggle="grupo"][data-scd-id]');
    if (grupoToggle) {
      const grupoId = String(grupoToggle.getAttribute('data-scd-id') || '');
      if (!grupoId) return;
      if (state.expandedGrupoIds.has(grupoId)) state.expandedGrupoIds.delete(grupoId);
      else state.expandedGrupoIds.add(grupoId);
      render();
      return;
    }

    const categoriaToggle = event.target.closest('[data-scd-toggle="categoria"][data-scd-id]');
    if (categoriaToggle) {
      const categoriaId = String(categoriaToggle.getAttribute('data-scd-id') || '');
      if (!categoriaId) return;
      if (state.expandedCategoriaIds.has(categoriaId)) state.expandedCategoriaIds.delete(categoriaId);
      else state.expandedCategoriaIds.add(categoriaId);
      render();
      return;
    }

    const classSelect = event.target.closest('[data-scd-select="classe"][data-scd-id]');
    if (classSelect) {
      const classeId = String(classSelect.getAttribute('data-scd-id') || '');
      if (!classeId) return;
      const categoriaId = String(classSelect.getAttribute('data-scd-categoria-id') || '');
      const grupoId = String(classSelect.getAttribute('data-scd-grupo-id') || '');
      state.selectedClassId = classeId;
      state.selectedItem = findClassById(state.tree, classeId) || {
        id: classeId,
        codigo: '',
        nome: '',
        categoriaId,
        grupoId,
      };
      if (state.mode !== 'cadastro' && callbacks.onSelect) {
        callbacks.onSelect({
          classeId,
          categoriaId,
          grupoId,
          codigo: state.selectedItem?.codigo || '',
          nome: state.selectedItem?.nome || '',
        });
      }
      render();
    }
  };

  drawerElement.addEventListener('input', handleInput);
  drawerElement.addEventListener('click', handleClick);
  render();

  const open = (params = {}) => {
    const tree = buildTree(params.groups, params.categorias, params.classes);
    const defaultExpandedGrupos = new Set();
    const defaultExpandedCategorias = new Set();

    const selectedClassId = String(params.initialSelectedId || '');
    if (!selectedClassId && tree[0]?.id) defaultExpandedGrupos.add(String(tree[0].id));

    const selectedItem = findClassById(tree, selectedClassId);
    state = {
      ...state,
      open: true,
      mode: params.mode === 'cadastro' ? 'cadastro' : 'classificacao',
      loading: Boolean(params.loading),
      error: params.error ? String(params.error) : '',
      search: '',
      subtitle: params.subtitle ? String(params.subtitle) : '',
      tree,
      selectedClassId,
      selectedItem,
      expandedGrupoIds: defaultExpandedGrupos,
      expandedCategoriaIds: defaultExpandedCategorias,
    };
    ensureExpandedPath();
    render();
    drawerControls.open(params.triggerEl || null);
  };

  const close = () => drawerControls.close();

  const cleanup = () => {
    cleanupInput();
    drawerElement.removeEventListener('input', handleInput);
    drawerElement.removeEventListener('click', handleClick);
    drawerControls.cleanup();
    document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
    document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();
  };

  return { open, close, cleanup };
}

export default { initSelecionarClasseDrawer };
