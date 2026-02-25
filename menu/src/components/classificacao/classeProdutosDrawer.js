import * as Drawer from '../drawer/drawer.js';
import * as Input from '../input/input.js';
import * as Checkbox from '../checkbox/checkbox.js';

const DRAWER_ID = 'classe-produtos-drawer';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeItems(items = []) {
  if (!Array.isArray(items)) return [];
  return items.map((item = {}, index) => ({
    id: String(item.id ?? `classe-produto-${index + 1}`),
    codigo: String(item.codigo ?? ''),
    tipo: String(item.tipo ?? ''),
    descricao: String(item.descricao ?? ''),
    unidade: String(item.unidade ?? ''),
  }));
}

function getFilteredItems(items = [], search = '') {
  const query = String(search || '').trim().toLowerCase();
  if (!query) return items;

  return items.filter((item = {}) => {
    const codigo = String(item.codigo || '').toLowerCase();
    const tipo = String(item.tipo || '').toLowerCase();
    const descricao = String(item.descricao || '').toLowerCase();
    const unidade = String(item.unidade || '').toLowerCase();
    return codigo.includes(query) || tipo.includes(query) || descricao.includes(query) || unidade.includes(query);
  });
}

function createTableRow(item = {}, selectedIds = new Set(), disabled = false) {
  const itemId = escapeHtml(item.id || '');
  const isChecked = selectedIds instanceof Set && selectedIds.has(item.id);
  const checkbox = Checkbox.create({
    id: `classe-produtos-item-${itemId}`,
    size: 'sm',
    checked: Boolean(isChecked),
    disabled: Boolean(disabled),
  });

  return `
    <tr>
      <td class="classe-produtos-drawer__cell-check">${checkbox}</td>
      <td>${escapeHtml(item.codigo || '-')}</td>
      <td>${escapeHtml(item.tipo || '-')}</td>
      <td>${escapeHtml(item.descricao || '-')}</td>
      <td>${escapeHtml(item.unidade || '-')}</td>
    </tr>
  `;
}

function createBody(state = {}) {
  const filteredItems = getFilteredItems(state.items, state.search);
  const disabled = Boolean(state.loading || state.saving);
  const selectedItem = (state.items || []).find((item = {}) => state.selectedIds instanceof Set && state.selectedIds.has(item.id));
  const hasSelection = state.selectedIds instanceof Set && state.selectedIds.size > 0;
  const classOptions = Array.isArray(state.classOptions) ? state.classOptions : [];
  const isChangingClass = state.view === 'change-class';
  const topSectionDisabled = disabled || isChangingClass;
  const searchField = Input.createSearch({
    id: 'classe-produtos-search',
    placeholder: 'Buscar Produto/Serviço',
    value: state.search || '',
    disabled: topSectionDisabled,
  });

  return `
    <div class="classe-produtos-drawer">
      <div class="classe-produtos-drawer__search ${topSectionDisabled ? 'is-inactive' : ''}">${searchField}</div>

      <div class="classe-produtos-drawer__table-wrap ${topSectionDisabled ? 'is-inactive' : ''}">
        <table class="classe-produtos-drawer__table">
          <thead>
            <tr>
              <th class="classe-produtos-drawer__cell-check"></th>
              <th>Código</th>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Unidade</th>
            </tr>
          </thead>
          <tbody>
            ${filteredItems.length > 0
      ? filteredItems.map((item = {}) => createTableRow(item, state.selectedIds, topSectionDisabled)).join('')
      : '<tr><td colspan="5" class="classe-produtos-drawer__empty">Nenhum item encontrado.</td></tr>'}
          </tbody>
        </table>
      </div>

      ${isChangingClass
      ? `
      <section class="classe-produtos-drawer__change-class">
        <header class="classe-produtos-drawer__change-class-header">Alterar Classe</header>
        <div class="classe-produtos-drawer__change-class-field">
          <label for="classe-produtos-change-target">Selecionar</label>
          <select id="classe-produtos-change-target" data-cpd-field="changeClassTargetId" ${disabled ? 'disabled' : ''}>
            <option value="">Selecione</option>
            ${classOptions.map((item = {}) => {
        const optionId = String(item.id || '');
        const selected = optionId === String(state.changeClassTargetId || '') ? 'selected' : '';
        return `<option value="${escapeHtml(optionId)}" ${selected}>${escapeHtml(item.nome || '-')}</option>`;
      }).join('')}
          </select>
        </div>
        <footer class="classe-produtos-drawer__change-class-actions">
          <button type="button" class="classe-produtos-drawer__change-class-cancel" data-cpd-action="cancel-change-class">Cancelar</button>
          <button type="button" class="btn btn--primary" data-cpd-action="save-change-class" ${(disabled || !state.changeClassTargetId) ? 'disabled' : ''}>Salvar</button>
        </footer>
      </section>
      `
      : `
      <div class="classe-produtos-drawer__selected">
        <div class="classe-produtos-drawer__selected-info">
          <span class="classe-produtos-drawer__selected-label">Selecionado:</span>
          <strong class="classe-produtos-drawer__selected-value">${escapeHtml(selectedItem?.descricao || '-')}</strong>
        </div>
        <button type="button" class="btn btn--outline-dark" data-cpd-action="change-class" ${(!hasSelection || disabled) ? 'disabled' : ''}>Alterar classe</button>
      </div>
      `}

      ${state.error ? `<p class="classe-produtos-drawer__error">${escapeHtml(state.error)}</p>` : ''}
    </div>
  `;
}

function createFooter(state = {}) {
  if (state.view === 'change-class') return '';
  const disabled = Boolean(state.loading || state.saving);
  return `
    <div class="classe-produtos-drawer__footer">
      <button type="button" class="btn btn--outline-dark" data-cpd-action="access-cadastro" ${disabled ? 'disabled' : ''}>Acessar cadastro</button>
      <div class="classe-produtos-drawer__footer-right">
        <button type="button" class="btn btn--outline-dark" data-cpd-action="cancel" ${disabled ? 'disabled' : ''}>Cancelar</button>
        <button type="button" class="btn btn--primary ${state.saving ? 'btn--loading' : ''}" data-cpd-action="confirm" ${disabled ? 'disabled' : ''}>Selecionar</button>
      </div>
    </div>
  `;
}

export function initClasseProdutosDrawer(options = {}) {
  const callbacks = {
    onClose: typeof options.onClose === 'function' ? options.onClose : null,
    onConfirm: typeof options.onConfirm === 'function' ? options.onConfirm : null,
    onAccessCadastro: typeof options.onAccessCadastro === 'function' ? options.onAccessCadastro : null,
    onChangeClass: typeof options.onChangeClass === 'function' ? options.onChangeClass : null,
  };

  document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();

  const drawerHtml = Drawer.create({
    id: DRAWER_ID,
    title: 'Classe',
    width: 540,
    content: '',
    footer: '',
  });
  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  const drawerControls = Drawer.init({
    id: DRAWER_ID,
    root: document,
    onClose: () => {
      state.open = false;
      state.search = '';
      state.selectedIds = new Set();
      if (callbacks.onClose) callbacks.onClose();
    },
  });

  const drawerElement = document.querySelector(`[data-drawer="${DRAWER_ID}"]`);
  if (!drawerElement) return { open: () => {}, close: () => {}, cleanup: () => {} };

  let cleanupInput = () => {};
  let state = {
    open: false,
    classeId: null,
    classeNome: '',
    loading: false,
    saving: false,
    error: '',
    search: '',
    items: [],
    selectedIds: new Set(),
    classOptions: [],
    view: 'list',
    changeClassTargetId: '',
  };

  const render = () => {
    const title = drawerElement.querySelector('.drawer__title');
    const body = drawerElement.querySelector('.drawer__body');
    const footer = drawerElement.querySelector('.drawer__footer');
    if (!title || !body || !footer) return;

    title.textContent = state.classeNome || 'Classe';
    body.innerHTML = createBody(state);
    footer.innerHTML = createFooter(state);
    footer.style.display = state.view === 'change-class' ? 'none' : '';

    cleanupInput();
    cleanupInput = Input.init(drawerElement) || (() => {});
    Checkbox.init(drawerElement);
  };

  const toggleSelection = (itemId) => {
    const next = new Set(state.selectedIds || []);
    if (next.has(itemId)) {
      next.delete(itemId);
    } else {
      next.add(itemId);
    }
    state.selectedIds = next;
  };

  const handleInput = (event) => {
    if (!(event.target instanceof Element)) return;
    const searchInput = event.target.closest('#classe-produtos-search');
    if (!(searchInput instanceof HTMLInputElement)) return;
    state.search = searchInput.value || '';
    render();
  };

  const handleChange = (event) => {
    if (!(event.target instanceof Element)) return;
    const selectField = event.target.closest('[data-cpd-field="changeClassTargetId"]');
    if (selectField instanceof HTMLSelectElement) {
      state.changeClassTargetId = selectField.value || '';
      render();
      return;
    }

    const checkbox = event.target.closest('input[type="checkbox"]');
    if (!(checkbox instanceof HTMLInputElement)) return;
    if (!checkbox.id.startsWith('classe-produtos-item-')) return;

    const itemId = checkbox.id.replace('classe-produtos-item-', '');
    toggleSelection(itemId);
    render();
  };

  const handleClick = (event) => {
    if (!(event.target instanceof Element)) return;
    const actionEl = event.target.closest('[data-cpd-action]');
    if (!actionEl) return;

    const action = actionEl.getAttribute('data-cpd-action') || '';
    if (action === 'cancel') {
      drawerControls.close();
      return;
    }

    if (action === 'access-cadastro') {
      const selectedItem = (state.items || []).find((item = {}) => state.selectedIds instanceof Set && state.selectedIds.has(item.id)) || null;
      if (callbacks.onAccessCadastro) callbacks.onAccessCadastro(selectedItem);
      return;
    }

    if (action === 'change-class') {
      state.view = 'change-class';
      state.changeClassTargetId = '';
      state.error = '';
      render();
      return;
    }

    if (action === 'cancel-change-class') {
      state.view = 'list';
      state.changeClassTargetId = '';
      state.error = '';
      render();
      return;
    }

    if (action === 'save-change-class') {
      if (!state.changeClassTargetId) return;
      if (callbacks.onChangeClass) {
        callbacks.onChangeClass({
          classeId: state.classeId || null,
          selectedIds: Array.from(state.selectedIds || []),
          targetClasseId: state.changeClassTargetId,
        });
      }
      state.view = 'list';
      state.changeClassTargetId = '';
      state.error = '';
      render();
      return;
    }

    if (action === 'confirm') {
      if (callbacks.onConfirm) callbacks.onConfirm(Array.from(state.selectedIds || []), state.classeId || null);
      drawerControls.close();
    }
  };

  drawerElement.addEventListener('input', handleInput);
  drawerElement.addEventListener('change', handleChange);
  drawerElement.addEventListener('click', handleClick);
  render();

  const open = (params = {}) => {
    state = {
      ...state,
      open: true,
      classeId: params.classeId ?? null,
      classeNome: String(params.classeNome || ''),
      loading: Boolean(params.loading),
      saving: Boolean(params.saving),
      error: params.error ? String(params.error) : '',
      search: '',
      items: normalizeItems(params.items),
      selectedIds: new Set(Array.isArray(params.initialSelectedIds) ? params.initialSelectedIds : []),
      classOptions: Array.isArray(params.classOptions) ? params.classOptions : [],
      view: 'list',
      changeClassTargetId: '',
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
    drawerControls.cleanup();
    document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
    document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();
  };

  return { open, close, cleanup };
}

export default { initClasseProdutosDrawer };
