import * as Button from '../../../components/button/button.js';
import * as Drawer from '../../../components/drawer/drawer.js';
import * as Input from '../../../components/input/input.js';

const DRAWER_ID = 'patio-entry-manual-drawer';
const DEFAULT_FORM = {
  instrucao: '',
  comprador: '',
  produtor: '',
  contrato: '',
  produto: '',
  transportadora: '',
  caminhao: '',
  motorista: '',
};

function normalizeOptions(options = []) {
  return (Array.isArray(options) ? options : []).map((item = {}, index) => ({
    value: String(item.value ?? item.id ?? `option-${index + 1}`),
    label: String(item.label || item.nome || item.name || item.id || '').trim(),
  })).filter((item) => item.value && item.label);
}

function normalizeForm(form = {}) {
  return {
    ...DEFAULT_FORM,
    ...form,
  };
}

function createSelectField(config = {}, value = '', items = []) {
  return Input.createSelect({
    id: config.id,
    label: config.label,
    value,
    placeholder: config.placeholder || 'Selecione',
    required: Boolean(config.required),
    items,
    className: `patio-entry-drawer__field${config.full ? ' patio-entry-drawer__field--full' : ''}`,
  }).replace('<select ', `<select data-ped-field="${config.field}" `);
}

function renderBody(state) {
  return `
    <div class="patio-entry-drawer__content">
      <div class="patio-entry-drawer__top-note">
        <strong>Registro Avulso</strong>
        <p>Veículo registrado sem agendamento prévio. Entrará no final da fila.</p>
      </div>
      <div class="patio-entry-drawer__grid">
        ${createSelectField({ id: 'patio-entry-instrucao', field: 'instrucao', label: 'Instrução', required: true }, state.form.instrucao, normalizeOptions(state.options.instrucoes))}
        ${createSelectField({ id: 'patio-entry-comprador', field: 'comprador', label: 'Comprador', required: true }, state.form.comprador, normalizeOptions(state.options.compradores))}
        ${createSelectField({ id: 'patio-entry-produtor', field: 'produtor', label: 'Produtor', required: true }, state.form.produtor, normalizeOptions(state.options.produtores))}
        ${createSelectField({ id: 'patio-entry-contrato', field: 'contrato', label: 'Contrato', required: true }, state.form.contrato, normalizeOptions(state.options.contratos))}
        ${createSelectField({ id: 'patio-entry-produto', field: 'produto', label: 'Produto', required: true }, state.form.produto, normalizeOptions(state.options.produtos))}
        ${createSelectField({ id: 'patio-entry-transportadora', field: 'transportadora', label: 'Transportadora', required: true }, state.form.transportadora, normalizeOptions(state.options.transportadoras))}
        ${createSelectField({ id: 'patio-entry-caminhao', field: 'caminhao', label: 'Caminhão', required: true }, state.form.caminhao, normalizeOptions(state.options.caminhoes))}
        ${createSelectField({ id: 'patio-entry-motorista', field: 'motorista', label: 'Motorista', required: true }, state.form.motorista, normalizeOptions(state.options.motoristas))}
      </div>
      <p class="patio-entry-drawer__error${state.error ? ' is-visible' : ''}" data-ped-error>${String(state.error || '')}</p>
    </div>
  `;
}

function renderFooter() {
  return `
    <div class="patio-entry-drawer__footer">
      <div class="patio-entry-drawer__footer-right">
        ${Button.create({ text: 'Cancelar', variant: 'dark', style: 'outline' }).replace('<button ', '<button type="button" data-ped-action="cancel" ')}
        ${Button.create({ text: 'Confirmar Entrada', variant: 'primary' }).replace('<button ', '<button type="button" data-ped-action="save" ')}
      </div>
    </div>
  `;
}

function validateForm(form = {}) {
  if (!String(form.instrucao || '').trim()) return 'Selecione a instrução.';
  if (!String(form.comprador || '').trim()) return 'Selecione o comprador.';
  if (!String(form.produtor || '').trim()) return 'Selecione o produtor.';
  if (!String(form.contrato || '').trim()) return 'Selecione o contrato.';
  if (!String(form.produto || '').trim()) return 'Selecione o produto.';
  if (!String(form.transportadora || '').trim()) return 'Selecione a transportadora.';
  if (!String(form.caminhao || '').trim()) return 'Selecione o caminhão.';
  if (!String(form.motorista || '').trim()) return 'Selecione o motorista.';
  return '';
}

export function initPatioEntryDrawer(options = {}) {
  const callbacks = {
    onClose: typeof options.onClose === 'function' ? options.onClose : null,
    onSave: typeof options.onSave === 'function' ? options.onSave : null,
    onChange: typeof options.onChange === 'function' ? options.onChange : null,
  };

  document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();

  const drawerHtml = Drawer.create({
    id: DRAWER_ID,
    title: 'Registrar Entrada Manual',
    width: 640,
    content: '',
    footer: '',
  });
  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  const drawerControls = Drawer.init({
    id: DRAWER_ID,
    root: document,
    onClose: () => {
      if (callbacks.onClose) callbacks.onClose();
    },
  });

  const drawerElement = document.querySelector(`[data-drawer="${DRAWER_ID}"]`);
  if (!drawerElement) return { open: () => {}, close: () => {}, cleanup: () => {}, update: () => {} };

  let cleanupInput = () => {};
  let state = {
    error: '',
    form: normalizeForm(),
    options: {
      instrucoes: [],
      compradores: [],
      produtores: [],
      contratos: [],
      produtos: [],
      transportadoras: [],
      caminhoes: [],
      motoristas: [],
    },
  };

  const updateError = (message = '') => {
    state.error = String(message || '');
    const errorEl = drawerElement.querySelector('[data-ped-error]');
    if (!errorEl) return;
    errorEl.textContent = state.error;
    errorEl.classList.toggle('is-visible', Boolean(state.error));
  };

  const render = () => {
    const body = drawerElement.querySelector('.drawer__body');
    const footer = drawerElement.querySelector('.drawer__footer');
    if (!body || !footer) return;

    body.innerHTML = renderBody(state);
    footer.innerHTML = renderFooter();

    cleanupInput();
    cleanupInput = Input.init(drawerElement) || (() => {});
  };

  const handleInput = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;
    const field = target.getAttribute('data-ped-field') || '';
    if (!field) return;

    state.form[field] = target.value || '';
    updateError('');
    if (callbacks.onChange) callbacks.onChange({ ...state.form });
  };

  const handleClick = (event) => {
    const target = event.target.closest('[data-ped-action]');
    if (!target) return;

    const action = target.getAttribute('data-ped-action') || '';
    if (action === 'cancel') {
      drawerControls.close();
      return;
    }

    if (action === 'save') {
      const error = validateForm(state.form);
      if (error) {
        updateError(error);
        return;
      }
      updateError('');
      if (callbacks.onSave) callbacks.onSave({ ...state.form });
      drawerControls.close();
      return;
    }
  };

  drawerElement.addEventListener('change', handleInput);
  drawerElement.addEventListener('click', handleClick);

  render();

  const open = (params = {}) => {
    state.form = normalizeForm(params.form || {});
    state.options = {
      instrucoes: normalizeOptions(params.options?.instrucoes || []),
      compradores: normalizeOptions(params.options?.compradores || []),
      produtores: normalizeOptions(params.options?.produtores || []),
      contratos: normalizeOptions(params.options?.contratos || []),
      produtos: normalizeOptions(params.options?.produtos || []),
      transportadoras: normalizeOptions(params.options?.transportadoras || []),
      caminhoes: normalizeOptions(params.options?.caminhoes || []),
      motoristas: normalizeOptions(params.options?.motoristas || []),
    };
    render();
    drawerControls.open(params.triggerEl || null);
  };

  const close = () => drawerControls.close();

  const cleanup = () => {
    cleanupInput();
    drawerElement.removeEventListener('change', handleInput);
    drawerElement.removeEventListener('click', handleClick);
    drawerControls.cleanup();
    document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
    document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();
  };

  return { open, close, cleanup, update: (params = {}) => {
    state.form = normalizeForm(params.form || state.form);
    state.options = {
      instrucoes: normalizeOptions(params.options?.instrucoes || state.options.instrucoes),
      compradores: normalizeOptions(params.options?.compradores || state.options.compradores),
      produtores: normalizeOptions(params.options?.produtores || state.options.produtores),
      contratos: normalizeOptions(params.options?.contratos || state.options.contratos),
      produtos: normalizeOptions(params.options?.produtos || state.options.produtos),
      transportadoras: normalizeOptions(params.options?.transportadoras || state.options.transportadoras),
      caminhoes: normalizeOptions(params.options?.caminhoes || state.options.caminhoes),
      motoristas: normalizeOptions(params.options?.motoristas || state.options.motoristas),
    };
    render();
  } };
}

export default { initPatioEntryDrawer };
