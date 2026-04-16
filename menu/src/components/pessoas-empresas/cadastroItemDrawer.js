import * as Drawer from '../drawer/drawer.js';
import * as Input from '../input/input.js';
import * as Toggle from '../toggle/toggle.js';
import * as Segmented from '../segmented/segmented.js';
import * as ButtonIcon from '../button-icon/button-icon.js';

const NEW_ITEM_ID = '__new__';

const searchIcon = '<svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"></circle><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>';
const pencilIcon = '<svg viewBox="0 0 16 16" fill="none"><path d="M10.9 2.6l2.5 2.5M2.5 13.5l2.6-.5 7.8-7.8a1.1 1.1 0 000-1.6l-1.3-1.3a1.1 1.1 0 00-1.6 0L2.2 10.1l-.5 3.4z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeItems(items = [], itemIdPrefix = 'item') {
  if (!Array.isArray(items)) return [];
  return items.map((item = {}, index) => ({
    id: String(item.id ?? `${itemIdPrefix}-${index + 1}`),
    nome: String(item.nome ?? '').trim(),
    ativo: Boolean(item.ativo ?? true),
  }));
}

function getFilteredItems(items = [], tab = 'ativos', search = '', itemIdPrefix = 'item') {
  const normalized = normalizeItems(items, itemIdPrefix);
  const onlyActive = tab !== 'inativos';
  const query = String(search || '').trim().toLowerCase();

  return normalized.filter((item) => {
    if (Boolean(item.ativo) !== onlyActive) return false;
    if (!query) return true;
    return String(item.nome || '').toLowerCase().includes(query);
  });
}

function createItemRow(item = {}, state = {}, config = {}) {
  const itemId = String(item.id || '');
  const isEditing = state.editingId === itemId;
  const canEdit = state.tab !== 'inativos';
  const actionAttr = config.actionAttr || 'data-cadastro-item-action';
  const itemIdAttr = config.itemIdAttr || 'data-cadastro-item-id';
  const inlineInputAttr = config.inlineInputAttr || 'data-cadastro-item-inline-input';
  const toggleIdPrefix = config.toggleIdPrefix || 'cadastro-item-drawer-toggle-';

  const toggle = Toggle.create({
    id: `${toggleIdPrefix}${escapeHtml(itemId)}`,
    checked: Boolean(item.ativo),
    size: 'sm',
    disabled: Boolean(state.loading),
  });

  const editRow = isEditing
    ? `
      <div class="ramo-drawer__edit-row">
        <input
          type="text"
          class="ramo-drawer__inline-input"
          ${inlineInputAttr}
          ${itemIdAttr}="${escapeHtml(itemId)}"
          value="${escapeHtml(state.editingValue || '')}"
          placeholder="${escapeHtml(config.inlinePlaceholder || 'Digite o nome')}"
        />
        <div class="ramo-drawer__edit-actions">
          <button type="button" class="ramo-drawer__icon-btn ramo-drawer__icon-btn--danger" ${actionAttr}="cancel-edit" ${itemIdAttr}="${escapeHtml(itemId)}" aria-label="Cancelar edição">
            ${ButtonIcon.getIcon('trash')}
          </button>
          <button type="button" class="ramo-drawer__icon-btn ramo-drawer__icon-btn--success" ${actionAttr}="confirm-edit" ${itemIdAttr}="${escapeHtml(itemId)}" aria-label="Confirmar edição">
            ${ButtonIcon.getIcon('check')}
          </button>
        </div>
      </div>
    `
    : `
      <div class="ramo-drawer__item-main">
        ${canEdit
          ? `<button type="button" class="ramo-drawer__edit" ${actionAttr}="edit" ${itemIdAttr}="${escapeHtml(itemId)}" aria-label="${escapeHtml(config.editAriaLabel || 'Editar item')}">
              ${pencilIcon}
            </button>`
          : ''}
        <span class="ramo-drawer__item-name">${escapeHtml(item.nome || '-')}</span>
      </div>
      <div class="ramo-drawer__item-right">
        ${toggle}
      </div>
    `;

  return `
    <li class="ramo-drawer__item">
      ${editRow}
    </li>
  `;
}

function createDrawerBody(state = {}, config = {}) {
  const items = getFilteredItems(state.items, state.tab, state.search, config.itemIdPrefix);
  const syntheticNew = state.editingId === NEW_ITEM_ID
    ? [{ id: NEW_ITEM_ID, nome: '', ativo: state.tab !== 'inativos' }]
    : [];
  const renderedItems = [...syntheticNew, ...items];
  const actionAttr = config.actionAttr || 'data-cadastro-item-action';

  const search = Input.create({
    id: config.searchInputId || 'cadastro-item-drawer-search',
    type: 'search',
    placeholder: config.searchPlaceholder || 'Buscar',
    value: state.search || '',
    iconRight: searchIcon,
    clearable: false,
    className: 'ramo-drawer__search-field',
    disabled: Boolean(state.loading),
  });

  const segmented = Segmented.create({
    items: [
      { value: 'ativos', label: 'Ativos' },
      { value: 'inativos', label: 'Inativos' },
    ],
    activeValue: state.tab === 'inativos' ? 'inativos' : 'ativos',
    size: 'sm',
  });

  return `
    <div class="ramo-drawer" data-cadastro-item-drawer-root>
      ${search}

      <div class="ramo-drawer__tabs" data-cadastro-item-tabs>
        ${segmented}
      </div>

      <section class="ramo-drawer__section">
        <div class="ramo-drawer__section-header">
          <p class="ramo-drawer__section-title">Cadastrados</p>
          <button type="button" class="btn btn--primary ramo-drawer__add" ${actionAttr}="add">${escapeHtml(config.addButtonLabel || 'Adicionar +')}</button>
        </div>

        <ul class="ramo-drawer__list">
          ${renderedItems.length > 0
            ? renderedItems.map((item) => createItemRow(item, state, config)).join('')
            : `<li class="ramo-drawer__empty">${escapeHtml(config.emptyMessage || 'Nenhum item encontrado.')}</li>`}
        </ul>
      </section>

      ${state.error ? `<p class="ramo-drawer__error">${escapeHtml(state.error)}</p>` : ''}
    </div>
  `;
}

function createDrawerFooter(config = {}) {
  const actionAttr = config.actionAttr || 'data-cadastro-item-action';
  return `
    <div class="ramo-drawer__footer">
      <button type="button" class="btn btn--primary" ${actionAttr}="return">${escapeHtml(config.returnButtonLabel || 'Retornar')}</button>
    </div>
  `;
}

export function initCadastroItemDrawer(options = {}) {
  const config = {
    drawerId: options.drawerId || 'cadastro-item-drawer',
    title: options.title || 'Criar Novo Item',
    searchInputId: options.searchInputId || 'cadastro-item-drawer-search',
    searchPlaceholder: options.searchPlaceholder || 'Buscar',
    inlinePlaceholder: options.inlinePlaceholder || 'Digite o nome',
    emptyMessage: options.emptyMessage || 'Nenhum item encontrado.',
    addButtonLabel: options.addButtonLabel || 'Adicionar +',
    returnButtonLabel: options.returnButtonLabel || 'Retornar',
    editAriaLabel: options.editAriaLabel || 'Editar item',
    itemIdPrefix: options.itemIdPrefix || 'item',
    toggleIdPrefix: options.toggleIdPrefix || 'cadastro-item-drawer-toggle-',
    actionAttr: options.actionAttr || 'data-cadastro-item-action',
    itemIdAttr: options.itemIdAttr || 'data-cadastro-item-id',
    inlineInputAttr: options.inlineInputAttr || 'data-cadastro-item-inline-input',
  };

  const callbacks = {
    onClose: typeof options.onClose === 'function' ? options.onClose : null,
    onToggleAtivo: typeof options.onToggleAtivo === 'function' ? options.onToggleAtivo : null,
    onRename: typeof options.onRename === 'function' ? options.onRename : null,
  };

  document.querySelector(`[data-drawer="${config.drawerId}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${config.drawerId}"]`)?.remove();

  const drawerHtml = Drawer.create({
    id: config.drawerId,
    title: config.title,
    width: 430,
    content: '',
    footer: '',
  });
  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  let state = {
    open: false,
    loading: false,
    error: '',
    tab: options.initialTab === 'inativos' ? 'inativos' : 'ativos',
    search: '',
    items: normalizeItems(options.items ?? [], config.itemIdPrefix),
    editingId: null,
    editingValue: '',
  };

  const drawerControls = Drawer.init({
    id: config.drawerId,
    root: document,
    onClose: () => {
      state.open = false;
      state.search = '';
      state.editingId = null;
      state.editingValue = '';
      if (callbacks.onClose) callbacks.onClose();
    },
  });

  const drawerElement = document.querySelector(`[data-drawer="${config.drawerId}"]`);
  if (!drawerElement) {
    return { open: () => {}, close: () => {}, cleanup: () => {} };
  }

  let cleanupInput = () => {};

  const render = () => {
    const body = drawerElement.querySelector('.drawer__body');
    const footer = drawerElement.querySelector('.drawer__footer');
    if (!body || !footer) return;

    body.innerHTML = createDrawerBody(state, config);
    footer.innerHTML = createDrawerFooter(config);

    cleanupInput();
    cleanupInput = Input.init(drawerElement) || (() => {});

    const tabsRoot = drawerElement.querySelector('[data-cadastro-item-tabs]');
    Segmented.init(tabsRoot, (value) => {
      state.tab = value === 'inativos' ? 'inativos' : 'ativos';
      state.editingId = null;
      state.editingValue = '';
      render();
    });
  };

  const persistRename = (id) => {
    if (!id) return;
    const nextName = String(state.editingValue || '').trim();
    const prevItem = (state.items || []).find((item) => String(item.id || '') === String(id));

    if (!nextName) {
      if (id === NEW_ITEM_ID) {
        state.editingId = null;
        state.editingValue = '';
        render();
      } else {
        state.editingValue = prevItem?.nome || '';
        state.editingId = null;
        render();
      }
      return;
    }

    if (id === NEW_ITEM_ID) {
      const newItem = {
        id: `${config.itemIdPrefix}-${Date.now()}`,
        nome: nextName,
        ativo: state.tab !== 'inativos',
      };
      state.items = [newItem, ...(Array.isArray(state.items) ? state.items : [])];
      if (callbacks.onRename) callbacks.onRename(newItem.id, nextName);
      state.editingId = null;
      state.editingValue = '';
      render();
      return;
    }

    state.items = (Array.isArray(state.items) ? state.items : []).map((item) => {
      if (String(item.id || '') !== String(id)) return item;
      return { ...item, nome: nextName };
    });

    if (callbacks.onRename) callbacks.onRename(String(id), nextName);
    state.editingId = null;
    state.editingValue = '';
    render();
  };

  const handleInput = (event) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest('input');
    if (!(target instanceof HTMLInputElement)) return;

    if (target.id === config.searchInputId) {
      state.search = target.value || '';
      render();
      return;
    }

    if (target.matches(`[${config.inlineInputAttr}]`)) {
      state.editingValue = target.value || '';
    }
  };

  const handleChange = (event) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest('.toggle-input');
    if (!(target instanceof HTMLInputElement)) return;
    const toggleId = String(target.id || '');
    if (!toggleId.startsWith(config.toggleIdPrefix)) return;

    const itemId = toggleId.replace(config.toggleIdPrefix, '');
    state.items = (Array.isArray(state.items) ? state.items : []).map((item) => {
      if (String(item.id || '') !== itemId) return item;
      return { ...item, ativo: Boolean(target.checked) };
    });

    if (callbacks.onToggleAtivo) callbacks.onToggleAtivo(itemId, Boolean(target.checked));
    render();
  };

  const handleClick = (event) => {
    if (!(event.target instanceof Element)) return;
    const actionEl = event.target.closest(`[${config.actionAttr}]`);
    if (!actionEl) return;

    const action = actionEl.getAttribute(config.actionAttr) || '';

    if (action === 'return') {
      drawerControls.close();
      return;
    }

    if (action === 'add') {
      state.editingId = NEW_ITEM_ID;
      state.editingValue = '';
      render();
      return;
    }

    if (action === 'edit') {
      const itemId = actionEl.getAttribute(config.itemIdAttr) || '';
      const item = (state.items || []).find((row) => String(row.id || '') === String(itemId));
      if (!item) return;
      state.editingId = itemId;
      state.editingValue = item.nome || '';
      render();
      return;
    }

    if (action === 'confirm-edit') {
      const itemId = actionEl.getAttribute(config.itemIdAttr) || '';
      persistRename(itemId);
      return;
    }

    if (action === 'cancel-edit') {
      const itemId = actionEl.getAttribute(config.itemIdAttr) || '';
      if (itemId === NEW_ITEM_ID) {
        state.editingId = null;
        state.editingValue = '';
        render();
        return;
      }
      const prevItem = (state.items || []).find((row) => String(row.id || '') === String(itemId));
      state.editingId = null;
      state.editingValue = prevItem?.nome || '';
      render();
    }
  };

  const handleFocusOut = (event) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    if (!event.target.matches(`[${config.inlineInputAttr}]`)) return;
    const itemId = event.target.getAttribute(config.itemIdAttr) || '';
    persistRename(itemId);
  };

  const handleKeydown = (event) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    if (!event.target.matches(`[${config.inlineInputAttr}]`)) return;

    const itemId = event.target.getAttribute(config.itemIdAttr) || '';
    if (event.key === 'Enter') {
      event.preventDefault();
      persistRename(itemId);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      state.editingId = null;
      state.editingValue = '';
      render();
    }
  };

  drawerElement.addEventListener('input', handleInput);
  drawerElement.addEventListener('change', handleChange);
  drawerElement.addEventListener('click', handleClick);
  drawerElement.addEventListener('focusout', handleFocusOut);
  drawerElement.addEventListener('keydown', handleKeydown);

  render();

  const open = (params = {}) => {
    state = {
      ...state,
      open: true,
      loading: Boolean(params.loading),
      error: params.error ? String(params.error) : '',
      tab: params.initialTab === 'inativos' ? 'inativos' : (options.initialTab === 'inativos' ? 'inativos' : 'ativos'),
      search: '',
      items: normalizeItems(params.items ?? state.items ?? [], config.itemIdPrefix),
      editingId: null,
      editingValue: '',
    };

    render();
    drawerControls.open(params.triggerEl || null);
  };

  const close = () => drawerControls.close();

  const cleanup = () => {
    cleanupInput();
    drawerElement.removeEventListener('input', handleInput);
    drawerElement.removeEventListener('change', handleChange);
    drawerElement.removeEventListener('click', handleClick);
    drawerElement.removeEventListener('focusout', handleFocusOut);
    drawerElement.removeEventListener('keydown', handleKeydown);
    drawerControls.cleanup();
    document.querySelector(`[data-drawer="${config.drawerId}"]`)?.remove();
    document.querySelector(`[data-drawer-backdrop="${config.drawerId}"]`)?.remove();
  };

  return { open, close, cleanup };
}

export default { initCadastroItemDrawer };
