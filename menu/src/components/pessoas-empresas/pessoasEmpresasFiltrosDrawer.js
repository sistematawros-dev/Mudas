import * as Drawer from '../drawer/drawer.js';
import * as Input from '../input/input.js';
import * as Checkbox from '../checkbox/checkbox.js';
import * as Toggle from '../toggle/toggle.js';
import * as Chip from '../chip/chip.js';

const DRAWER_ID = 'pessoas-empresas-filtros-drawer';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeFilters(filters = {}) {
  const groupBy = filters.groupBy || {};
  return {
    showInactive: Boolean(filters.showInactive),
    except: Boolean(filters.except),
    codigo: String(filters.codigo || ''),
    nomeRazaoSocial: String(filters.nomeRazaoSocial || ''),
    tipo: String(filters.tipo || ''),
    grupo: String(filters.grupo || ''),
    cpfCnpj: String(filters.cpfCnpj || ''),
    categoria: String(filters.categoria || ''),
    setor: String(filters.setor || ''),
    cidade: String(filters.cidade || ''),
    contato: String(filters.contato || ''),
    inscricaoEstadualMunicipal: String(filters.inscricaoEstadualMunicipal || ''),
    chips: Array.isArray(filters.chips) ? filters.chips.map((item) => String(item || '').trim()).filter(Boolean) : ['Mudas', 'Badge', 'Badge'],
    orderByDirection: filters.orderByDirection === 'desc' ? 'desc' : 'asc',
    orderByType: String(filters.orderByType || ''),
    groupBy: {
      grupo: groupBy.grupo !== false,
      categoria: groupBy.categoria !== false,
      setor: groupBy.setor !== false,
      cidade: groupBy.cidade !== false,
    },
  };
}

function createFieldHtml(form = {}) {
  const codigoField = Input.create({
    id: 'pefd-codigo',
    label: 'Código',
    required: true,
    placeholder: 'Código',
    value: form.codigo || '',
  });
  const nomeRazaoField = Input.create({
    id: 'pefd-nome-razao-social',
    label: 'Nome/Razão Social',
    required: true,
    placeholder: 'Nome/Razão Social',
    value: form.nomeRazaoSocial || '',
  });
  const tipoField = Input.create({
    id: 'pefd-tipo',
    label: 'Tipo',
    required: true,
    placeholder: 'Tipo',
    value: form.tipo || '',
  });
  const grupoField = Input.create({
    id: 'pefd-grupo',
    label: 'Grupo',
    required: true,
    placeholder: 'Selecione o grupo',
    value: form.grupo || '',
  });
  const cpfCnpjField = Input.create({
    id: 'pefd-cpf-cnpj',
    label: 'CPF/CNPJ',
    required: true,
    placeholder: 'Digite o CPF/CNPJ',
    value: form.cpfCnpj || '',
  });
  const categoriaField = Input.createSelect({
    id: 'pefd-categoria',
    label: 'Categoria',
    required: true,
    placeholder: 'Selecione o grupo',
    value: form.categoria || '',
    items: [],
  });
  const setorField = Input.createSelect({
    id: 'pefd-setor',
    label: 'Setor',
    required: true,
    placeholder: 'Selecione o setor',
    value: form.setor || '',
    items: [],
  });
  const cidadeField = Input.createSelect({
    id: 'pefd-cidade',
    label: 'Cidade',
    required: true,
    placeholder: 'Selecione a cidade',
    value: form.cidade || '',
    items: [],
  });
  const contatoField = Input.createSelect({
    id: 'pefd-contato',
    label: 'Contato',
    required: true,
    placeholder: 'Selecione o contato',
    value: form.contato || '',
    items: [],
  });
  const inscricaoField = Input.create({
    id: 'pefd-inscricao',
    label: 'Inscrição Estadual ou Municipal',
    required: true,
    placeholder: 'Digite',
    value: form.inscricaoEstadualMunicipal || '',
  });

  return `
    <div class="pessoas-empresas-filtros-drawer__grid">
      ${codigoField}
      ${nomeRazaoField}
      ${tipoField}
      ${grupoField}
      ${cpfCnpjField}
      ${categoriaField}
      ${setorField}
      ${cidadeField}
      ${contatoField}
      ${inscricaoField}
    </div>
  `;
}

function createBody(state = {}) {
  const form = normalizeFilters(state.form);
  const chipsHtml = (form.chips || []).map((chip, index) => (
    `<span data-pefd-chip-index="${index}">
      ${Chip.createInput({
    label: chip,
    value: String(index),
    size: 'sm',
    className: 'pessoas-empresas-filtros-drawer__chip',
  })}
    </span>`
  )).join('');

  const toggleHtml = Toggle.create({
    id: 'pefd-show-inactive',
    label: 'Mostrar inativos',
    checked: form.showInactive,
    size: 'sm',
    className: 'pessoas-empresas-filtros-drawer__toggle',
  });

  const exceptCheckbox = Checkbox.create({
    id: 'pefd-except',
    label: 'Exceto',
    size: 'sm',
    checked: form.except,
  });

  const grupoCheckbox = Checkbox.create({
    id: 'pefd-groupby-grupo',
    label: 'Grupo',
    size: 'sm',
    checked: form.groupBy?.grupo !== false,
  });
  const categoriaCheckbox = Checkbox.create({
    id: 'pefd-groupby-categoria',
    label: 'Categoria',
    size: 'sm',
    checked: form.groupBy?.categoria !== false,
  });
  const setorCheckbox = Checkbox.create({
    id: 'pefd-groupby-setor',
    label: 'Setor',
    size: 'sm',
    checked: form.groupBy?.setor !== false,
  });
  const cidadeCheckbox = Checkbox.create({
    id: 'pefd-groupby-cidade',
    label: 'Cidade',
    size: 'sm',
    checked: form.groupBy?.cidade !== false,
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
            <button type="button" class="pessoas-empresas-filtros-drawer__order-btn ${form.orderByDirection !== 'desc' ? 'is-active' : ''}" data-pefd-order="asc">Crescente</button>
            <button type="button" class="pessoas-empresas-filtros-drawer__order-btn ${form.orderByDirection === 'desc' ? 'is-active' : ''}" data-pefd-order="desc">Decrescente</button>
          </div>
        </div>
        <div class="pessoas-empresas-filtros-drawer__order-column">
          ${Input.createSelect({
    id: 'pefd-order-type',
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
          ${setorCheckbox}
          ${cidadeCheckbox}
        </div>
      </div>
    </div>
  `;
}

function createFooter() {
  return `
    <div class="pessoas-empresas-filtros-drawer__footer">
      <button type="button" class="btn btn--outline-dark" data-pefd-action="back">Voltar</button>
      <div class="pessoas-empresas-filtros-drawer__footer-right">
        <button type="button" class="btn btn--outline-dark" data-pefd-action="clear">Limpar Filtros</button>
        <button type="button" class="btn btn--primary" data-pefd-action="apply">Aplicar Filtros</button>
      </div>
    </div>
  `;
}

export function initPessoasEmpresasFiltrosDrawer(options = {}) {
  const callbacks = {
    onClose: typeof options.onClose === 'function' ? options.onClose : null,
    onApply: typeof options.onApply === 'function' ? options.onApply : null,
    onClear: typeof options.onClear === 'function' ? options.onClear : null,
  };

  document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();

  const drawerHtml = Drawer.create({
    id: DRAWER_ID,
    title: 'Filtro',
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

    next.showInactive = getChecked('#pefd-show-inactive');
    next.except = getChecked('#pefd-except');
    next.codigo = getInputValue('#pefd-codigo');
    next.nomeRazaoSocial = getInputValue('#pefd-nome-razao-social');
    next.tipo = getInputValue('#pefd-tipo');
    next.grupo = getInputValue('#pefd-grupo');
    next.cpfCnpj = getInputValue('#pefd-cpf-cnpj');
    next.categoria = getInputValue('#pefd-categoria');
    next.setor = getInputValue('#pefd-setor');
    next.cidade = getInputValue('#pefd-cidade');
    next.contato = getInputValue('#pefd-contato');
    next.inscricaoEstadualMunicipal = getInputValue('#pefd-inscricao');
    next.orderByType = getInputValue('#pefd-order-type');
    next.groupBy = {
      grupo: getChecked('#pefd-groupby-grupo'),
      categoria: getChecked('#pefd-groupby-categoria'),
      setor: getChecked('#pefd-groupby-setor'),
      cidade: getChecked('#pefd-groupby-cidade'),
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
      const chipHost = chipRemove.closest('[data-pefd-chip-index]');
      const index = Number(chipHost?.getAttribute('data-pefd-chip-index') || '-1');
      if (index >= 0) {
        const next = normalizeFilters(state.form);
        next.chips = (next.chips || []).filter((_, chipIndex) => chipIndex !== index);
        state.form = next;
        render();
      }
      return;
    }

    const orderButton = event.target.closest('[data-pefd-order]');
    if (orderButton) {
      const order = orderButton.getAttribute('data-pefd-order') === 'desc' ? 'desc' : 'asc';
      state.form = {
        ...normalizeFilters(state.form),
        orderByDirection: order,
      };
      render();
      return;
    }

    const actionEl = event.target.closest('[data-pefd-action]');
    if (!actionEl) return;
    const action = actionEl.getAttribute('data-pefd-action') || '';

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

export default { initPessoasEmpresasFiltrosDrawer };
