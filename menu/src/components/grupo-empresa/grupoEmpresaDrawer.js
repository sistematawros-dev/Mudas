import * as Drawer from '../drawer/drawer.js';
import * as Input from '../input/input.js';
import * as Checkbox from '../checkbox/checkbox.js';

const DRAWER_ID = 'grupo-empresa-drawer';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateCodigo() {
  const raw = Date.now() % 90000;
  return String(raw + 10000);
}

function normalizeCadastros(items = []) {
  if (!Array.isArray(items)) return [];
  return items.map((item = {}, index) => ({
    id: String(item.id ?? `cad-${index + 1}`),
    nome: String(item.nome ?? ''),
    documento: item.documento ? String(item.documento) : '',
    tipo: item.tipo === 'PJ' ? 'PJ' : 'PF',
    href: item.href ? String(item.href) : '',
  }));
}

function getFilteredCadastros(linkedCadastros = [], search = '') {
  const query = String(search || '').trim().toLowerCase();
  if (!query) return linkedCadastros;

  return linkedCadastros.filter((item = {}) => {
    const nome = String(item.nome || '').toLowerCase();
    const documento = String(item.documento || '').toLowerCase();
    return nome.includes(query) || documento.includes(query);
  });
}

function getTipoLabel(tipo) {
  return tipo === 'PJ' ? 'Pessoa Jurídica' : 'Pessoa Física';
}

function createCadastrosListItem(item = {}, isChecked = false, disabled = false) {
  const itemId = escapeHtml(item.id || '');
  const checkboxHtml = Checkbox.create({
    id: `grupo-empresa-cadastro-${itemId}`,
    size: 'sm',
    checked: Boolean(isChecked),
    disabled: Boolean(disabled),
    className: 'grupo-empresa-drawer__item-checkbox',
  });

  const avatarIcon = item.tipo === 'PJ'
    ? '<svg viewBox="0 0 16 16" fill="none"><path d="M3 13.5V4.5H13V13.5M6 4.5V2.5H10V4.5M6 7H10M6 9.5H10M6 12H10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>'
    : '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="2.2" stroke="currentColor" stroke-width="1.2"/><path d="M3.5 13.5C4 10.9 5.6 9.5 8 9.5C10.4 9.5 12 10.9 12.5 13.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';

  return `
    <li class="grupo-empresa-drawer__item">
      <div class="grupo-empresa-drawer__item-left">
        ${checkboxHtml}
        <span class="grupo-empresa-drawer__item-avatar grupo-empresa-drawer__item-avatar--${item.tipo === 'PJ' ? 'pj' : 'pf'}" aria-hidden="true">${avatarIcon}</span>
        <div class="grupo-empresa-drawer__item-texts">
          <p class="grupo-empresa-drawer__item-name">${escapeHtml(item.nome || '-')}</p>
          <p class="grupo-empresa-drawer__item-meta">
            ${escapeHtml(item.documento || '-')} • ${escapeHtml(getTipoLabel(item.tipo))}
          </p>
        </div>
      </div>
      <button
        type="button"
        class="grupo-empresa-drawer__item-link"
        data-ge-action="view-cadastro"
        data-ge-cadastro-id="${itemId}"
      >
        Ver cadastro
      </button>
    </li>
  `;
}

function createDrawerBody(state = {}) {
  const mode = state.mode || 'create';
  const readOnly = mode === 'view';
  const filteredCadastros = getFilteredCadastros(state.linkedCadastros, state.search);
  const totalCadastros = Array.isArray(state.linkedCadastros) ? state.linkedCadastros.length : 0;
  const selectedCount = state.selectedIds instanceof Set ? state.selectedIds.size : 0;
  const allFilteredSelected = filteredCadastros.length > 0
    && filteredCadastros.every((item) => state.selectedIds instanceof Set && state.selectedIds.has(item.id));

  const codigoInput = Input.create({
    id: 'grupo-empresa-codigo',
    label: 'Código',
    required: true,
    value: state.form?.codigo || '',
    disabled: true,
    readonly: true,
  });

  const nomeInput = Input.create({
    id: 'grupo-empresa-nome',
    label: 'Nome do Grupo',
    required: true,
    placeholder: 'Digite o nome do grupo',
    value: state.form?.nome || '',
    disabled: readOnly || state.saving,
    readonly: readOnly,
  });

  const descricaoInput = Input.create({
    id: 'grupo-empresa-descricao',
    label: 'Descrição',
    optional: true,
    placeholder: 'Adicione uma descrição',
    value: state.form?.descricao || '',
    disabled: readOnly || state.saving,
    readonly: readOnly,
  });

  const searchInput = Input.createSearch({
    id: 'grupo-empresa-search-cadastros',
    placeholder: 'Buscar por nome ou documento...',
    value: state.search || '',
    disabled: state.loading || state.saving,
  });

  const selectAllCheckbox = Checkbox.create({
    id: 'grupo-empresa-select-all',
    size: 'sm',
    checked: allFilteredSelected,
    disabled: readOnly || state.loading || state.saving || filteredCadastros.length === 0,
    label: `Selecionar todos (${selectedCount}/${totalCadastros})`,
    className: 'grupo-empresa-drawer__select-all',
  });

  return `
    <div class="grupo-empresa-drawer" data-ge-drawer-root>
      <div class="grupo-empresa-drawer__form">
        ${codigoInput}
        ${nomeInput}
        ${descricaoInput}
      </div>

      <section class="grupo-empresa-drawer__section">
        <h3 class="grupo-empresa-drawer__section-title">Vincular Cadastros</h3>
        ${searchInput}
        <div class="grupo-empresa-drawer__select-all-row">${selectAllCheckbox}</div>

        <ul class="grupo-empresa-drawer__list" data-ge-cadastros-list>
          ${filteredCadastros.length > 0
      ? filteredCadastros.map((item) => createCadastrosListItem(
        item,
        state.selectedIds instanceof Set && state.selectedIds.has(item.id),
        readOnly || state.loading || state.saving
      )).join('')
      : '<li class="grupo-empresa-drawer__empty">Nenhum cadastro encontrado.</li>'}
        </ul>
      </section>

      ${state.error ? `<p class="grupo-empresa-drawer__error">${escapeHtml(state.error)}</p>` : ''}
    </div>
  `;
}

function createDrawerFooter(state = {}) {
  const mode = state.mode || 'create';
  const readOnly = mode === 'view';
  const saveDisabled = readOnly || state.saving || state.loading;

  return `
    <div class="grupo-empresa-drawer__footer">
      <div class="grupo-empresa-drawer__footer-left">
        ${mode === 'create'
      ? '<button type="button" class="btn btn--primary" data-ge-action="create-new-group">Criar Novo Grupo</button>'
      : ''}
      </div>
      <div class="grupo-empresa-drawer__footer-right">
        <button type="button" class="btn btn--outline-dark" data-ge-action="cancel" ${state.saving ? 'disabled' : ''}>Cancelar</button>
        <button type="button" class="btn btn--primary ${state.saving ? 'btn--loading' : ''}" data-ge-action="save" ${saveDisabled ? 'disabled' : ''}>Salvar</button>
      </div>
    </div>
  `;
}

export function initGrupoEmpresaDrawer(options = {}) {
  const callbacks = {
    onClose: typeof options.onClose === 'function' ? options.onClose : null,
    onSaved: typeof options.onSaved === 'function' ? options.onSaved : null,
    onSearchCadastros: typeof options.onSearchCadastros === 'function' ? options.onSearchCadastros : null,
    onOpenCadastro: typeof options.onOpenCadastro === 'function' ? options.onOpenCadastro : null,
    onCreateNewGroup: typeof options.onCreateNewGroup === 'function' ? options.onCreateNewGroup : null,
  };

  document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();

  const drawerHtml = Drawer.create({
    id: DRAWER_ID,
    title: 'Grupo de Empresa',
    width: 470,
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
      state.error = '';
      if (callbacks.onClose) callbacks.onClose();
    },
  });

  const drawerElement = document.querySelector(`[data-drawer="${DRAWER_ID}"]`);
  if (!drawerElement) {
    return { open: () => {}, close: () => {}, cleanup: () => {} };
  }
  const drawerHeader = drawerElement.querySelector('.drawer__header');
  const drawerTitle = drawerHeader?.querySelector('.drawer__title');
  if (drawerHeader && drawerTitle && !drawerHeader.querySelector('.grupo-empresa-drawer__subtitle')) {
    drawerHeader.classList.add('grupo-empresa-drawer__header');
    drawerTitle.insertAdjacentHTML(
      'afterend',
      '<p class="grupo-empresa-drawer__subtitle">Preencha os dados e vincule pessoas ou empresas ao grupo</p>'
    );
  }

  let cleanupInput = () => {};
  let state = {
    open: false,
    mode: 'create',
    grupoId: null,
    loading: false,
    saving: false,
    error: '',
    search: '',
    form: {
      codigo: generateCodigo(),
      nome: '',
      descricao: '',
    },
    linkedCadastros: [],
    selectedIds: new Set(),
  };

  const render = () => {
    const body = drawerElement.querySelector('.drawer__body');
    const footer = drawerElement.querySelector('.drawer__footer');
    if (!body || !footer) return;

    body.innerHTML = createDrawerBody(state);
    footer.innerHTML = createDrawerFooter(state);

    cleanupInput();
    cleanupInput = Input.init(drawerElement) || (() => {});
    Checkbox.init(drawerElement);
  };

  const handleInput = (event) => {
    if (!(event.target instanceof Element)) return;

    const target = event.target.closest('input, textarea');
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;

    if (target.id === 'grupo-empresa-search-cadastros') {
      state.search = target.value || '';
      if (callbacks.onSearchCadastros) callbacks.onSearchCadastros(state.search);
      render();
      return;
    }

    if (target.id === 'grupo-empresa-nome') {
      state.form = { ...(state.form || {}), nome: target.value || '' };
      state.error = '';
      return;
    }

    if (target.id === 'grupo-empresa-descricao') {
      state.form = { ...(state.form || {}), descricao: target.value || '' };
      return;
    }
  };

  const handleChange = (event) => {
    if (!(event.target instanceof Element)) return;

    const target = event.target.closest('input[type="checkbox"]');
    if (!(target instanceof HTMLInputElement)) return;

    const filtered = getFilteredCadastros(state.linkedCadastros, state.search);
    if (target.id === 'grupo-empresa-select-all') {
      const nextSelectedIds = new Set(state.selectedIds || []);
      if (target.checked) {
        filtered.forEach((item) => nextSelectedIds.add(item.id));
      } else {
        filtered.forEach((item) => nextSelectedIds.delete(item.id));
      }
      state.selectedIds = nextSelectedIds;
      render();
      return;
    }

    if (!target.id.startsWith('grupo-empresa-cadastro-')) return;
    const cadastroId = target.id.replace('grupo-empresa-cadastro-', '');
    const nextSelectedIds = new Set(state.selectedIds || []);
    if (target.checked) {
      nextSelectedIds.add(cadastroId);
    } else {
      nextSelectedIds.delete(cadastroId);
    }
    state.selectedIds = nextSelectedIds;
    render();
  };

  const handleClick = async (event) => {
    if (!(event.target instanceof Element)) return;

    const actionEl = event.target.closest('[data-ge-action]');
    if (!actionEl) return;

    const action = actionEl.getAttribute('data-ge-action') || '';
    if (action === 'cancel') {
      drawerControls.close();
      return;
    }

    if (action === 'create-new-group') {
      if (callbacks.onCreateNewGroup) callbacks.onCreateNewGroup();
      state.form = {
        codigo: generateCodigo(),
        nome: '',
        descricao: '',
      };
      state.selectedIds = new Set();
      state.error = '';
      render();
      return;
    }

    if (action === 'view-cadastro') {
      const cadastroId = actionEl.getAttribute('data-ge-cadastro-id') || '';
      const cadastro = (state.linkedCadastros || []).find((item) => item?.id === cadastroId);
      if (callbacks.onOpenCadastro) {
        callbacks.onOpenCadastro(cadastro || null);
        return;
      }
      const href = cadastro?.href;
      if (href) window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    if (action !== 'save' || state.mode === 'view' || state.saving) return;
    if (!state.form?.nome?.trim()) {
      state.error = 'Informe o nome do grupo.';
      render();
      return;
    }

    state.saving = true;
    state.error = '';
    render();

    try {
      const payload = {
        id: state.grupoId || null,
        codigo: state.form?.codigo || '',
        nome: state.form?.nome || '',
        descricao: state.form?.descricao || '',
        linkedCadastros: Array.from(state.selectedIds || []),
        mode: state.mode,
      };

      if (callbacks.onSaved) await callbacks.onSaved(payload);
      state.saving = false;
      drawerControls.close();
    } catch (error) {
      state.saving = false;
      state.error = 'Não foi possível salvar o grupo. Tente novamente.';
      render();
    }
  };

  drawerElement.addEventListener('input', handleInput);
  drawerElement.addEventListener('change', handleChange);
  drawerElement.addEventListener('click', handleClick);
  render();

  const open = (params = {}) => {
    const mode = params.mode === 'view' || params.mode === 'edit' ? params.mode : 'create';
    const initialData = params.initialData || {};
    const incomingLinked = normalizeCadastros(params.linkedCadastros);

    state = {
      ...state,
      open: true,
      mode,
      grupoId: params.grupoId ?? null,
      loading: Boolean(params.loading),
      saving: Boolean(params.saving),
      error: params.error ? String(params.error) : '',
      search: '',
      form: {
        codigo: initialData.codigo ? String(initialData.codigo) : (mode === 'create' ? generateCodigo() : ''),
        nome: initialData.nome ? String(initialData.nome) : '',
        descricao: initialData.descricao ? String(initialData.descricao) : '',
      },
      linkedCadastros: incomingLinked,
      selectedIds: new Set(Array.isArray(params.selectedCadastroIds) ? params.selectedCadastroIds : []),
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

export default { initGrupoEmpresaDrawer };
