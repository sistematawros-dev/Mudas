import * as Button from '../../../components/button/button.js';
import * as Chip from '../../../components/chip/chip.js';
import * as Drawer from '../../../components/drawer/drawer.js';
import * as FileUpload from '../../../components/file-upload/file-upload.js';
import * as Input from '../../../components/input/input.js';

const DRAWER_ID = 'patio-vehicle-entry-drawer';
const DEFAULT_FORM = {
  grupo: '',
  descricao: '',
  placa: '',
  marca: '',
  modelo: '',
  cargaMaxima: '',
  vinculoTipo: 'transportadoras',
  vinculoIds: [],
  documentoFiles: [],
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeOptions(options = []) {
  return (Array.isArray(options) ? options : []).map((item = {}, index) => ({
    id: String(item.id || `option-${index + 1}`),
    label: String(item.label || item.nome || item.name || item.id || '').trim(),
  })).filter((item) => item.id && item.label);
}

function normalizeForm(form = {}) {
  return {
    ...DEFAULT_FORM,
    ...form,
    vinculoTipo: String(form.vinculoTipo || DEFAULT_FORM.vinculoTipo),
    vinculoIds: Array.isArray(form.vinculoIds) ? form.vinculoIds.map((item) => String(item)) : [],
    documentoFiles: Array.isArray(form.documentoFiles) ? form.documentoFiles.map((item = {}) => ({
      id: String(item.id || `doc-${Date.now()}`),
      name: String(item.name || 'Documento'),
      size: Number(item.size || 0),
    })) : [],
  };
}

function getCurrentLinkOptions(state) {
  const linkType = state.form.vinculoTipo === 'motoristas' ? 'motoristas' : 'transportadoras';
  return normalizeOptions(state.lookups?.[linkType]);
}

function createTextField(config = {}, value = '') {
  return Input.create({
    id: config.id,
    label: config.label,
    value,
    placeholder: config.placeholder || '',
    required: Boolean(config.required),
    suffix: config.suffix || null,
    className: `patio-vehicle-drawer__field${config.full ? ' patio-vehicle-drawer__field--full' : ''}`,
  }).replace('<input ', `<input data-pvd-field="${config.field}" `);
}

function createSelectField(config = {}, value = '', items = []) {
  return Input.createSelect({
    id: config.id,
    label: config.label,
    value,
    placeholder: config.placeholder || 'Selecione',
    required: Boolean(config.required),
    items,
    className: `patio-vehicle-drawer__field${config.full ? ' patio-vehicle-drawer__field--full' : ''}`,
  }).replace('<select ', `<select data-pvd-field="${config.field}" `);
}

function renderUploadField(state) {
  const uploadHtml = FileUpload.create({
    id: 'patio-vehicle-document-upload',
    title: '',
    titleIcon: false,
    multiple: false,
    acceptedFormats: ['application/pdf', 'image/png', 'image/jpeg'],
    maxSize: 10 * 1024 * 1024,
    maxSizeLabel: '10MB',
    compact: true,
    className: 'patio-vehicle-drawer__upload-component',
  }).replace(
    '<div class="file-upload-list" data-upload-list></div>',
    `<div class="file-upload-list" data-upload-list>${(state.form.documentoFiles || []).map((file = {}) => FileUpload.createFileItem(file, { id: file.id, status: 'success' })).join('')}</div>`
  );

  return `
    <div class="patio-vehicle-drawer__field patio-vehicle-drawer__field--full patio-vehicle-drawer__field--upload">
      <label class="field-label">Documento do Caminhão<span class="field-label-required">*</span></label>
      ${uploadHtml}
    </div>
  `;
}

function renderLinkSelector(state) {
  const currentOptions = getCurrentLinkOptions(state);
  const selectedIds = new Set(state.form.vinculoIds || []);
  const selectedItems = currentOptions.filter((item) => selectedIds.has(item.id));

  return `
    <div class="patio-vehicle-drawer__field patio-vehicle-drawer__field--full patio-vehicle-drawer__field--links">
      <div class="patio-vehicle-drawer__links-grid">
        ${createSelectField({
          id: 'patio-vehicle-link-type',
          field: 'vinculoTipo',
          label: 'Vincular com',
          required: true,
          placeholder: 'Selecione o vínculo',
        }, state.form.vinculoTipo, [
          { value: 'transportadoras', label: 'Transportadoras' },
          { value: 'motoristas', label: 'Motoristas' },
        ])}
        <div class="patio-vehicle-drawer__selected-block">
          <span class="patio-vehicle-drawer__selected-label">Selecionados</span>
          <div class="patio-vehicle-drawer__selected-chips" data-pvd-selected-list>
            ${selectedItems.length > 0
              ? selectedItems.map((item) => Chip.createInput({ label: item.label, value: item.id, size: 'sm', className: 'patio-vehicle-drawer__selected-chip' }).replace('<button ', `<button data-pvd-remove-link="${item.id}" `)).join('')
              : '<span class="patio-vehicle-drawer__selected-empty">Nenhum vínculo selecionado.</span>'}
          </div>
        </div>
      </div>
      <div class="patio-vehicle-drawer__link-picker">
        <span class="patio-vehicle-drawer__picker-label">${state.form.vinculoTipo === 'motoristas' ? 'Motoristas disponíveis' : 'Transportadoras disponíveis'}</span>
        <div class="patio-vehicle-drawer__link-options" data-pvd-link-options>
          ${currentOptions.length > 0
            ? currentOptions.map((item) => Chip.createMultiple({
              label: item.label,
              value: item.id,
              selected: selectedIds.has(item.id),
              size: 'sm',
              className: 'patio-vehicle-drawer__link-chip',
            }).replace('<button ', `<button data-pvd-toggle-link="${item.id}" `)).join('')
            : '<span class="patio-vehicle-drawer__link-empty">Nenhuma opção disponível para o vínculo selecionado.</span>'}
        </div>
      </div>
    </div>
  `;
}

function renderBody(state) {
  return `
    <div class="patio-vehicle-drawer__content">
      <div class="patio-vehicle-drawer__form">
        ${createSelectField({ id: 'patio-vehicle-grupo', field: 'grupo', label: 'Grupo', required: true }, state.form.grupo, state.groupOptions)}
        ${createTextField({ id: 'patio-vehicle-descricao', field: 'descricao', label: 'Descrição', required: true, placeholder: 'Ex.: Cavalo mecânico 6x2' }, state.form.descricao)}
        ${createTextField({ id: 'patio-vehicle-placa', field: 'placa', label: 'Placa', required: true, placeholder: 'ABC1D23' }, state.form.placa)}
        ${createTextField({ id: 'patio-vehicle-marca', field: 'marca', label: 'Marca', required: true, placeholder: 'Volvo' }, state.form.marca)}
        ${createTextField({ id: 'patio-vehicle-modelo', field: 'modelo', label: 'Modelo', required: true, placeholder: 'FH 540' }, state.form.modelo)}
        ${createTextField({ id: 'patio-vehicle-carga', field: 'cargaMaxima', label: 'Carga Máx', required: true, placeholder: '35.000', suffix: 'Kg' }, state.form.cargaMaxima)}
        ${renderUploadField(state)}
        ${renderLinkSelector(state)}
      </div>
      <p class="patio-vehicle-drawer__error${state.error ? ' is-visible' : ''}" data-pvd-error>${escapeHtml(state.error || '')}</p>
    </div>
  `;
}

function renderFooter() {
  return `
    <div class="patio-vehicle-drawer__footer">
      <div class="patio-vehicle-drawer__footer-right">
        ${Button.create({ text: 'Cancelar', variant: 'dark', style: 'outline' }).replace('<button ', '<button type="button" data-pvd-action="cancel" ')}
        ${Button.create({ text: 'Salvar', variant: 'primary' }).replace('<button ', '<button type="button" data-pvd-action="save" ')}
      </div>
    </div>
  `;
}

function validateForm(form = {}) {
  if (!form.grupo) return 'Selecione o grupo do veículo.';
  if (!String(form.descricao || '').trim()) return 'Informe a descrição do veículo.';
  if (!String(form.placa || '').trim()) return 'Informe a placa do veículo.';
  if (!String(form.marca || '').trim()) return 'Informe a marca do veículo.';
  if (!String(form.modelo || '').trim()) return 'Informe o modelo do veículo.';
  if (!String(form.cargaMaxima || '').trim()) return 'Informe a carga máxima do veículo.';
  if (!Array.isArray(form.documentoFiles) || form.documentoFiles.length === 0) return 'Anexe o documento do caminhão.';
  if (!Array.isArray(form.vinculoIds) || form.vinculoIds.length === 0) return 'Selecione ao menos uma transportadora ou motorista.';
  return '';
}

export function initPatioVehicleDrawer(options = {}) {
  const callbacks = {
    onClose: typeof options.onClose === 'function' ? options.onClose : null,
    onSave: typeof options.onSave === 'function' ? options.onSave : null,
    onChange: typeof options.onChange === 'function' ? options.onChange : null,
  };

  document.querySelector(`[data-drawer="${DRAWER_ID}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${DRAWER_ID}"]`)?.remove();

  const drawerHtml = Drawer.create({
    id: DRAWER_ID,
    title: 'Cadastro de Veículo',
    width: 560,
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

  const drawerHeader = drawerElement.querySelector('.drawer__header');
  const drawerTitle = drawerHeader?.querySelector('.drawer__title');
  if (drawerHeader && drawerTitle && !drawerHeader.querySelector('.patio-vehicle-drawer__subtitle')) {
    drawerHeader.classList.add('patio-vehicle-drawer__header');
    drawerTitle.insertAdjacentHTML(
      'afterend',
      '<p class="patio-vehicle-drawer__subtitle">Preencha os dados do caminhão e vincule transportadoras ou motoristas.</p>'
    );
  }

  let cleanupInput = () => {};
  let state = {
    isOpen: false,
    error: '',
    groupOptions: [
      { value: 'proprio', label: 'Próprio' },
      { value: 'terceiro', label: 'Terceiro' },
    ],
    lookups: {
      transportadoras: [],
      motoristas: [],
    },
    form: normalizeForm(),
  };

  const syncExternalState = () => {
    if (callbacks.onChange) callbacks.onChange({ ...state.form, documentoFiles: [...state.form.documentoFiles] });
  };

  const render = () => {
    const title = drawerElement.querySelector('.drawer__title');
    const body = drawerElement.querySelector('.drawer__body');
    const footer = drawerElement.querySelector('.drawer__footer');
    if (!title || !body || !footer) return;

    title.textContent = 'Cadastro de Veículo';
    body.innerHTML = renderBody(state);
    footer.innerHTML = renderFooter();

    cleanupInput();
    cleanupInput = Input.init(drawerElement) || (() => {});
  };

  const updateError = (message = '') => {
    state.error = String(message || '');
    const errorEl = drawerElement.querySelector('[data-pvd-error]');
    if (!errorEl) return;
    errorEl.textContent = state.error;
    errorEl.classList.toggle('is-visible', Boolean(state.error));
  };

  const updateLinkSelector = () => {
    const field = drawerElement.querySelector('.patio-vehicle-drawer__field--links');
    if (!field) return;
    field.outerHTML = renderLinkSelector(state);
    cleanupInput();
    cleanupInput = Input.init(drawerElement) || (() => {});
  };

  FileUpload.init(drawerElement, {
    acceptedFormats: ['application/pdf', 'image/png', 'image/jpeg'],
    maxSize: 10 * 1024 * 1024,
    onSuccess: (file) => {
      const nextFile = {
        id: String(file.id || `doc-${Date.now()}`),
        name: String(file.name || 'Documento'),
        size: Number(file.size || 0),
      };
      state.form.documentoFiles = [nextFile];
      updateError('');
      syncExternalState();
    },
    onDelete: (file) => {
      const fileId = String(file?.id || '');
      state.form.documentoFiles = (state.form.documentoFiles || []).filter((item) => String(item.id || '') !== fileId);
      syncExternalState();
    },
  });

  const handleInput = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLSelectElement)) return;
    const field = target.getAttribute('data-pvd-field') || '';
    if (!field) return;

    state.form[field] = target.value || '';
    updateError('');

    if (field === 'vinculoTipo') {
      state.form.vinculoTipo = target.value === 'motoristas' ? 'motoristas' : 'transportadoras';
      state.form.vinculoIds = [];
      updateLinkSelector();
    }

    syncExternalState();
  };

  const handleClick = (event) => {
    const target = event.target.closest('[data-pvd-action], [data-pvd-toggle-link], [data-pvd-remove-link], [data-file-delete]');
    if (!target) return;

    if (target.hasAttribute('data-file-delete')) {
      const fileItem = target.closest('[data-file-item]');
      const fileId = String(fileItem?.getAttribute('data-file-id') || '');
      if (fileId) {
        state.form.documentoFiles = (state.form.documentoFiles || []).filter((item) => String(item.id || '') !== fileId);
        syncExternalState();
      }
      return;
    }

    const action = target.getAttribute('data-pvd-action') || '';
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
      if (callbacks.onSave) callbacks.onSave({ ...state.form, documentoFiles: [...state.form.documentoFiles] });
      drawerControls.close();
      return;
    }

    const toggleLinkId = target.getAttribute('data-pvd-toggle-link');
    if (toggleLinkId) {
      const current = new Set(state.form.vinculoIds || []);
      if (current.has(toggleLinkId)) current.delete(toggleLinkId);
      else current.add(toggleLinkId);
      state.form.vinculoIds = Array.from(current);
      updateError('');
      updateLinkSelector();
      syncExternalState();
      return;
    }

    const removeLinkId = target.getAttribute('data-pvd-remove-link');
    if (removeLinkId) {
      state.form.vinculoIds = (state.form.vinculoIds || []).filter((item) => String(item) !== String(removeLinkId));
      updateLinkSelector();
      syncExternalState();
    }
  };

  drawerElement.addEventListener('input', handleInput);
  drawerElement.addEventListener('change', handleInput);
  drawerElement.addEventListener('click', handleClick);

  render();

  const open = (params = {}) => {
    state = {
      ...state,
      isOpen: true,
      error: '',
      groupOptions: Array.isArray(params.groupOptions) && params.groupOptions.length > 0 ? params.groupOptions : state.groupOptions,
      lookups: {
        transportadoras: normalizeOptions(params.lookups?.transportadoras || state.lookups.transportadoras),
        motoristas: normalizeOptions(params.lookups?.motoristas || state.lookups.motoristas),
      },
      form: normalizeForm(params.form || {}),
    };
    render();
    drawerControls.open(params.triggerEl || null);
  };

  const update = (params = {}) => {
    state = {
      ...state,
      ...params,
      form: params.form ? normalizeForm(params.form) : state.form,
      groupOptions: params.groupOptions || state.groupOptions,
      lookups: params.lookups ? {
        transportadoras: normalizeOptions(params.lookups.transportadoras),
        motoristas: normalizeOptions(params.lookups.motoristas),
      } : state.lookups,
    };
    render();
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

  return { open, update, close, cleanup };
}

export default { initPatioVehicleDrawer };



