import * as Drawer from '../drawer/drawer.js';
import * as Input from '../input/input.js';
import * as Checkbox from '../checkbox/checkbox.js';
import * as Toggle from '../toggle/toggle.js';
import * as Chip from '../chip/chip.js';

const DRAWER_ID = 'produtos-filtros-drawer';

function normalizeFilters(filters = {}) {
  const groupBy = filters.groupBy || {};
  return {
    showInactive: Boolean(filters.showInactive),
    except: Boolean(filters.except),
    descricaoProduto: String(filters.descricaoProduto || ''),
    codigo: String(filters.codigo || ''),
    grupo: String(filters.grupo || ''),
    classe: String(filters.classe || ''),
    categoria: String(filters.categoria || ''),
    descricao: String(filters.descricao || ''),
    chips: Array.isArray(filters.chips) ? filters.chips.map((item) => String(item || '').trim()).filter(Boolean) : ['Mudas', 'Badge', 'Badge'],
    orderByDirection: filters.orderByDirection === 'desc' ? 'desc' : 'asc',
    orderByType: String(filters.orderByType || ''),
    groupBy: {
      grupo: groupBy.grupo !== false,
      categoria: groupBy.categoria !== false,
      classe: groupBy.classe !== false,
      tipo: groupBy.tipo !== false,
    },
  };
}

function createFieldHtml(form = {}) {
  const descricaoProdutoField = Input.create({
    id: 'pfd-descricao-produto',
    label: 'Descrição do Produto',
    required: true,
    placeholder: 'Digite a descrição',
    value: form.descricaoProduto || '',
  });

  const codigoField = Input.create({
    id: 'pfd-codigo',
    label: 'Código',
    required: true,
    placeholder: 'Digite o código',
    value: form.codigo || '',
  });

  const grupoField = Input.createSelect({
    id: 'pfd-grupo',
    label: 'Grupo',
    required: true,
    placeholder: 'Selecione o grupo',
    value: form.grupo || '',
    items: [],
  });

  const classeField = Input.createSelect({
    id: 'pfd-classe',
    label: 'Classe',
    required: true,
    placeholder: 'Selecione a classe',
    value: form.classe || '',
    items: [],
  });

  const categoriaField = Input.createSelect({
    id: 'pfd-categoria',
    label: 'Categoria',
    required: true,
    placeholder: 'Selecione a categoria',
    value: form.categoria || '',
    items: [],
  });

  const descricaoField = Input.create({
    id: 'pfd-descricao',
    label: 'Descrição',
    required: true,
    placeholder: 'Digite',
    value: form.descricao || '',
  });

  return `
    <div class="pessoas-empresas-filtros-drawer__grid">
      <div class="produtos-filtros-drawer__full">${descricaoProdutoField}</div>
      ${codigoField}
      ${grupoField}
      ${classeField}
      ${categoriaField}
      <div class="produtos-filtros-drawer__full">${descricaoField}</div>
    </div>
  `;
}

function createBody(state = {}) {
  const form = normalizeFilters(state.form);
  const chipsHtml = (form.chips || []).map((chip, index) => (
    `<span data-pfd-chip-index="${index}">
      ${Chip.createInput({
    label: chip,
    value: String(index),
    size: 'sm',
    className: 'pessoas-empresas-filtros-drawer__chip',
  })}
    </span>`
  )).join('');

  const toggleHtml = Toggle.create({
    id: 'pfd-show-inactive',
    label: 'Mostrar inativos',
    checked: form.showInactive,
    size: 'sm',
    className: 'pessoas-empresas-filtros-drawer__toggle',
  });

  const exceptCheckbox = Checkbox.create({
    id: 'pfd-except',
    label: 'Exceto',
    size: 'sm',
    checked: form.except,
  });

  const grupoCheckbox = Checkbox.create({
    id: 'pfd-groupby-grupo',
    label: 'Grupo',
    size: 'sm',
    checked: form.groupBy?.grupo !== false,
  });
  const categoriaCheckbox = Checkbox.create({
    id: 'pfd-groupby-categoria',
    label: 'Categoria',
    size: 'sm',
    checked: form.groupBy?.categoria !== false,
  });
  const classeCheckbox = Checkbox.create({
    id: 'pfd-groupby-classe',
    label: 'Classe',
    size: 'sm',
    checked: form.groupBy?.classe !== false,
  });
  const tipoCheckbox = Checkbox.create({
    id: 'pfd-groupby-tipo',
    label: 'Tipo',
    size: 'sm',
    checked: form.groupBy?.tipo !== false,
  });

  return `
    <div class="pessoas-empresas-filtros-drawer">
      <div class="pessoas-empresas-filtros-drawer__top">
        ${toggleHtml}
        ${exceptCheckbox}
      </div>

      ${createFieldHtml(form)}

      <div class="pessoas-empresas-filtros-drawer__chips">
        ${chipsHtml}
      </div>

      <div class="pessoas-empresas-filtros-drawer__order">
        <div class="pessoas-empresas-filtros-drawer__order-column">
          <p class="pessoas-empresas-filtros-drawer__section-label">Ordenar por</p>
          <div class="pessoas-empresas-filtros-drawer__order-buttons">
            <button type="button" class="pessoas-empresas-filtros-drawer__order-btn ${form.orderByDirection !== 'desc' ? 'is-active' : ''}" data-pfd-order="asc">Crescente</button>
            <button type="button" class="pessoas-empresas-filtros-drawer__order-btn ${form.orderByDirection === 'desc' ? 'is-active' : ''}" data-pfd-order="desc">Decrescente</button>
          </div>
        </div>
        <div class="pessoas-empresas-filtros-drawer__order-column">
          ${Input.createSelect({
    id: 'pfd-order-type',
    label: 'Tipo de ordenação',
    required: true,
    placeholder: 'Selecione',
    value: form.orderByType || '',
    items: [],
  })}
        </div>
      </div>

      <div class="pessoas-empresas-filtros-drawer__groupby">
        <p class="pessoas-empresas-filtros-drawer__section-label">Agrupar por</p>
        <div class="pessoas-empresas-filtros-drawer__groupby-options">
          ${grupoCheckbox}
          ${categoriaCheckbox}
          ${classeCheckbox}
          ${tipoCheckbox}
        </div>
      </div>
    </div>
  `;
}

function createFooter() {
  return `
    <div class="pessoas-empresas-filtros-drawer__footer">
      <button type="button" class="btn btn--outline-dark" data-pfd-action="back">Voltar</button>
      <div class="pessoas-empresas-filtros-drawer__footer-right">
        <button type="button" class="btn btn--outline-dark" data-pfd-action="clear">Limpar Filtros</button>
        <button type="button" class="btn btn--primary" data-pfd-action="apply">Aplicar Filtros</button>
      </div>
    </div>
  `;
}

export function initProdutosFiltrosDrawer(options = {}) {
  const callbacks = {
    onClose: typeof options.onClose === 'function' ? options.onClose : null,
    onApply: typeof options.onApply === 'function' ? options.onApply : null,
    onClear: typeof options.onClear === 'function' ? options.onClear : null,
  };

  document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();

  const drawerHtml = Drawer.create({
    id: DRAWER_ID,
    title: 'Filtros de Produtos',
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
      if (callbacks.onClose) callbacks.onClose();
    },
  });

  const drawerElement = document.querySelector(`[data-drawer="${DRAWER_ID}"]`);
  if (!drawerElement) return { open: () => {}, close: () => {}, cleanup: () => {} };

  let cleanupInput = () => {};
  let state = {
    open: false,
    form: normalizeFilters(options.initialFilters || {}),
  };

  const render = () => {
    const body = drawerElement.querySelector('.drawer__body');
    const footer = drawerElement.querySelector('.drawer__footer');
    if (!body || !footer) return;
    body.innerHTML = createBody(state);
    footer.innerHTML = createFooter();
    cleanupInput();
    cleanupInput = Input.init(drawerElement) || (() => {});
  };

  const readFormFromDom = () => {
    const next = normalizeFilters(state.form);
    const getInputValue = (selector) => {
      const input = drawerElement.querySelector(selector);
      return input instanceof HTMLInputElement || input instanceof HTMLSelectElement || input instanceof HTMLTextAreaElement
        ? input.value || ''
        : '';
    };
    const getChecked = (selector) => {
      const input = drawerElement.querySelector(selector);
      return input instanceof HTMLInputElement ? Boolean(input.checked) : false;
    };

    next.showInactive = getChecked('#pfd-show-inactive');
    next.except = getChecked('#pfd-except');
    next.descricaoProduto = getInputValue('#pfd-descricao-produto');
    next.codigo = getInputValue('#pfd-codigo');
    next.grupo = getInputValue('#pfd-grupo');
    next.classe = getInputValue('#pfd-classe');
    next.categoria = getInputValue('#pfd-categoria');
    next.descricao = getInputValue('#pfd-descricao');
    next.orderByType = getInputValue('#pfd-order-type');
    next.groupBy = {
      grupo: getChecked('#pfd-groupby-grupo'),
      categoria: getChecked('#pfd-groupby-categoria'),
      classe: getChecked('#pfd-groupby-classe'),
      tipo: getChecked('#pfd-groupby-tipo'),
    };
    return next;
  };

  const handleInput = () => {
    state.form = readFormFromDom();
  };

  const handleClick = (event) => {
    if (!(event.target instanceof Element)) return;

    const chipRemove = event.target.closest('[data-action="remove"]');
    if (chipRemove) {
      const chipHost = chipRemove.closest('[data-pfd-chip-index]');
      const index = Number(chipHost?.getAttribute('data-pfd-chip-index') || '-1');
      if (index >= 0) {
        const next = normalizeFilters(state.form);
        next.chips = (next.chips || []).filter((_, chipIndex) => chipIndex !== index);
        state.form = next;
        render();
      }
      return;
    }

    const orderButton = event.target.closest('[data-pfd-order]');
    if (orderButton) {
      const order = orderButton.getAttribute('data-pfd-order') === 'desc' ? 'desc' : 'asc';
      state.form = {
        ...normalizeFilters(state.form),
        orderByDirection: order,
      };
      render();
      return;
    }

    const actionEl = event.target.closest('[data-pfd-action]');
    if (!actionEl) return;
    const action = actionEl.getAttribute('data-pfd-action') || '';

    if (action === 'back') {
      drawerControls.close();
      return;
    }

    if (action === 'clear') {
      state.form = normalizeFilters({ chips: [] });
      render();
      if (callbacks.onClear) callbacks.onClear();
      return;
    }

    if (action === 'apply') {
      state.form = readFormFromDom();
      if (callbacks.onApply) callbacks.onApply(normalizeFilters(state.form));
      drawerControls.close();
    }
  };

  drawerElement.addEventListener('input', handleInput);
  drawerElement.addEventListener('change', handleInput);
  drawerElement.addEventListener('click', handleClick);
  render();

  const open = (params = {}) => {
    state = {
      ...state,
      open: true,
      form: normalizeFilters(params.initialFilters || state.form || {}),
    };
    render();
    drawerControls.open(params.triggerEl || null);
  };

  const close = () => drawerControls.close();

  const cleanup = () => {
    cleanupInput();
    drawerElement.removeEventListener('input', handleInput);
    drawerElement.removeEventListener('change', handleInput);
    drawerElement.removeEventListener('click', handleClick);
    drawerControls.cleanup();
    document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
    document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();
  };

  return { open, close, cleanup };
}

export default { initProdutosFiltrosDrawer };
