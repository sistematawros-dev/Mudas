import * as Button from '../../../components/button/button.js';
import * as ButtonIcon from '../../../components/button-icon/button-icon.js';
import * as FileUpload from '../../../components/file-upload/file-upload.js';
import * as Input from '../../../components/input/input.js';
import * as Modal from '../../../components/modal/modal.js';
import * as Radio from '../../../components/radio/radio.js';
import * as Toggle from '../../../components/toggle/toggle.js';
import {
  contractFieldOptions,
  initialFormValues,
  initialPlumaBlocks,
  initialPlumaCarriers,
  initialStandardLogisticsItems,
} from './nova-instrucao.data.js';

const truckIcon = `
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 7H13V16H3V7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 10H17L20 13V16H13V10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="7.5" cy="17.5" r="1.5" stroke="currentColor" stroke-width="2"/>
    <circle cx="16.5" cy="17.5" r="1.5" stroke="currentColor" stroke-width="2"/>
  </svg>
`;

const blockIcon = `
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="6" y="6" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="1.8"/>
    <path d="M9 10H15M9 13.5H13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>
`;

const closeIcon = Button.getIcon('close');
const PLUMA_EDIT_MODAL_ID = 'patio-pluma-edit-modal';
const STANDARD_EDIT_MODAL_ID = 'patio-standard-edit-modal';
const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.sistema.tawros.com.br/api/v1';
let activeController = null;
let cleanupInput = null;
let cleanupStandardEditModal = () => { };
let cleanupStandardEditModalInput = null;
let standardEditModalReturnFocus = null;
let standardEditModalState = null;
let cleanupPlumaEditModal = () => { };
let cleanupPlumaEditModalInput = null;
let plumaEditModalReturnFocus = null;
let plumaEditModalState = null;
let buyerSearchTimeoutId = null;
let buyerAutocompleteAbortController = null;
let buyerOptionsCache = [];
let sellerOptionsCache = [];
let sellerSearchTimeoutId = null;
let sellerAutocompleteAbortController = null;
let carrierSearchTimeoutId = null;
let carrierAutocompleteAbortController = null;
let compradorCategoriaIds = new Set();
let producerDocSearchTimeoutId = null;
let producerDocAutocompleteAbortController = null;
let producerDocOptionsCache = [];
let vendedorProdutorCategoriaIds = new Set();
let transportadoraCategoriaIds = new Set();
let isSavingInstruction = false;

const state = {
  formValues: { ...initialFormValues },
  standardLogisticsItems: initialStandardLogisticsItems.map((item) => ({ ...item })),
  editingLogisticsId: null,
  plumaBlocks: initialPlumaBlocks.map((block) => ({
    ...block,
    bales: [...(block.bales || [])],
    draftBales: [...(block.draftBales || block.bales || [])],
    baleInputValue: block.baleInputValue || '',
  })),
  plumaCarriers: initialPlumaCarriers.map((carrier) => ({
    ...carrier,
    blocks: carrier.blocks.map((block) => ({ ...block, detailCodes: [...(block.detailCodes || [])] })),
  })),
};

function getAccessToken() {
  return sessionStorage.getItem('authToken') || '';
}

function getRefreshToken() {
  return sessionStorage.getItem('refreshToken') || '';
}

function setTokens(accessToken, refreshToken) {
  if (accessToken) sessionStorage.setItem('authToken', String(accessToken));
  if (refreshToken) sessionStorage.setItem('refreshToken', String(refreshToken));
}

function parseApiResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (payload?.data && Array.isArray(payload.data.rows)) return payload.data.rows;
  return [];
}

function toPessoaOption(item = {}) {
  return {
    value: String(item.id),
    label: item?.razao_social || item?.nome_fantasia || item?.nome_responsavel || item?.cpf_cnpj || `Pessoa ${item.id}`,
    categoriaId: String(item?.categoria_id || ''),
  };
}

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) return false;
  const payload = await response.json().catch(() => ({}));
  const data = payload?.data || {};
  if (!data.accessToken) return false;

  setTokens(data.accessToken, data.refreshToken || refreshToken);
  return true;
}

async function apiRequest(path, { method = 'GET', query, body, auth = true, retryOnUnauthorized = true } = {}) {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (query && typeof query === 'object') {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    const filialId = sessionStorage.getItem('filialId');
    if (filialId) headers['X-Filial-Id'] = filialId;
  }

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: activeController?.signal,
  });

  if (response.status === 401 && auth && retryOnUnauthorized) {
    const refreshed = await refreshAccessToken().catch(() => false);
    if (refreshed) {
      return apiRequest(path, { method, query, body, auth, retryOnUnauthorized: false });
    }
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.message || `Falha na requisição (${response.status})`);
  }

  return payload;
}

function isPlumaProduct() {
  return state.formValues.productType === 'pluma';
}

function formatBales(value) {
  return `${Number(value || 0)} Fardos`;
}

function createInstructionAction(kind, icon, dataAttr, dataValue) {
  const config = kind === 'delete'
    ? { icon, variant: 'error', style: 'outline', size: 'sm', shape: 'square' }
    : kind === 'toggle'
      ? { icon, variant: 'dark', style: 'text', size: 'sm' }
      : { icon, variant: 'dark', style: 'outline', size: 'sm', shape: 'square' };

  return `<span class="patio-instruction-action patio-instruction-action--${kind}" ${dataAttr}="${dataValue}">${ButtonIcon.create(config)}</span>`;
}


function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `item-${Date.now()}`;
}

function getCarrierLabel(value) {
  const match = contractFieldOptions.carriers.find((item) => item.value === value);
  return match?.label || value || 'Nome da transportadora';
}

function getUnitLabel(value) {
  const match = contractFieldOptions.units.find((item) => item.value === value);
  return match?.label || value || 'Unidade';
}

function createActionButtons() {
  const cancelBtn = Button.create({ text: 'Cancelar', variant: 'dark', style: 'outline' })
    .replace('<button ', '<button data-action="cancelar-instrucao" ');
  const saveBtn = Button.create({ text: 'Salvar Instrução', variant: 'primary' })
    .replace('<button ', '<button data-action="salvar-instrucao" ');
  return `
    ${cancelBtn}
    ${saveBtn}
  `;
}
function renderHeaderActions() {
  const topActions = document.getElementById('patio-instruction-top-actions');
  const footerActions = document.getElementById('patio-instruction-footer-actions');

  if (topActions) topActions.innerHTML = createActionButtons();
  if (footerActions) footerActions.innerHTML = createActionButtons();
}

function renderContractFields() {
  const container = document.getElementById('patio-contract-fields');
  if (!container) return;

  const fields = [];

  fields.push(
    Input.create({
      id: 'instructionNumber',
      label: 'Número da Instrução',
      required: true,
      placeholder: 'Digite o número da instrução',
      value: state.formValues.instructionNumber,
      className: 'patio-contract-field patio-contract-field--full',
    }),
  );

  fields.push(
    Input.create({ id: 'issueDate', type: 'date', label: 'Data de Emissão', required: true, value: state.formValues.issueDate, className: 'patio-date-field patio-date-field--plain' }),
    Input.create({ id: 'loadingDeadline', type: 'date', label: 'Prazo Final Carregamento', value: state.formValues.loadingDeadline, className: 'patio-date-field patio-date-field--plain' }),
    Input.createAutocomplete({ id: 'buyer', label: 'Comprador', required: true, placeholder: 'Selecione ou digite...', value: state.formValues.buyer, suggestions: contractFieldOptions.buyers }),
    Input.create({ id: 'contractNumber', label: 'Número do Contrato', placeholder: 'Ex: CTR-2024-999', value: state.formValues.contractNumber }),
    Input.create({ id: 'producerDocument', label: 'CPF/CNPJ Produtor', placeholder: '000.000.000/0000-00', value: state.formValues.producerDocument }),
    Input.createAutocomplete({ id: 'sellerName', label: 'Nome do Vendedor / Produtor', placeholder: 'Selecione ou digite...', value: state.formValues.sellerName, suggestions: contractFieldOptions.sellers }),
    Input.createSelect({ id: 'productType', label: 'Tipo de Produto', required: true, placeholder: 'Selecione...', value: state.formValues.productType, items: contractFieldOptions.productTypes }),
    Input.createSelect({ id: 'branch', label: 'Unidade de Retirada (Filial)', required: true, placeholder: 'Selecione...', value: state.formValues.branch, items: contractFieldOptions.branches }),
  );

  container.innerHTML = fields.join('');
}

function renderStandardLogisticsFields() {
  const container = document.getElementById('patio-logistics-fields');
  const chips = document.getElementById('patio-blocks-chips');
  const actions = document.getElementById('patio-logistics-actions');
  if (!container || !chips || !actions) return;

  container.classList.remove('patio-logistics-builder__grid--pluma');

  container.innerHTML = [
    Input.createAutocomplete({ id: 'carrierName', label: 'Transportadora Responsável', placeholder: 'Nome da Transportadora', value: state.formValues.carrierName, suggestions: contractFieldOptions.carriers }),
    Input.createSelect({ id: 'unit', label: 'Unidade', value: state.formValues.unit, items: contractFieldOptions.units }),
    Input.create({ id: 'quantity', label: 'Quantidade', type: 'number', placeholder: '0', value: state.formValues.quantity, suffix: getUnitLabel(state.formValues.unit) }),
  ].join('');

  chips.innerHTML = '';

  const actionLabel = state.editingLogisticsId ? 'Atualizar Item' : 'Adicionar  Lista';
  const actionName = state.editingLogisticsId ? 'atualizar-item-logistica' : 'adicionar-item-logistica';
  actions.innerHTML = Button.create({
    text: actionLabel,
    variant: 'dark',
    style: 'outline',
    iconLeft: 'plus',
  }).replace('<button ', `<button data-action="${actionName}" `);
}

function renderStandardLogisticsList() {
  const container = document.getElementById('patio-logistics-list');
  if (!container) return;

  if (!state.standardLogisticsItems.length) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = state.standardLogisticsItems.map((item) => `
    <article class="patio-logistics-item" data-logistics-id="${item.id}">
      <div class="patio-logistics-item__main">
        <span class="patio-logistics-item__icon" aria-hidden="true">${truckIcon}</span>
        <div class="patio-logistics-item__text">
          <h3 class="patio-logistics-item__title">${item.carrierName}</h3>
          <div class="patio-logistics-item__summary">${getUnitLabel(item.unit)} • ${Number(item.quantity || 0).toLocaleString('pt-BR')}</div>
        </div>
      </div>
      <div class="patio-logistics-item__actions">
        ${createInstructionAction('edit', 'edit', 'data-edit-logistics', item.id)}
        ${createInstructionAction('delete', 'trash', 'data-delete-logistics', item.id)}
      </div>
    </article>
  `).join('');
}

function createStandardEditModalBody() {
  if (!standardEditModalState) return '';

  const carrierField = Input.create({
    id: 'standard-edit-carrier-name',
    label: 'Transportadora Responsável',
    value: standardEditModalState.carrierName,
    placeholder: 'Nome da Transportadora',
    className: 'patio-standard-edit-modal__field',
  });

  if (standardEditModalState.mode === 'pluma-carrier') {
    return `
      <div class="patio-standard-edit-modal__content patio-standard-edit-modal__content--carrier-only">
        ${carrierField}
      </div>
    `;
  }

  return `
    <div class="patio-standard-edit-modal__content">
      ${carrierField}
      ${Input.createSelect({
    id: 'standard-edit-unit',
    label: 'Unidade',
    value: standardEditModalState.unit,
    items: contractFieldOptions.units,
    className: 'patio-standard-edit-modal__field',
  })}
      ${Input.create({
    id: 'standard-edit-quantity',
    label: 'Quantidade',
    type: 'number',
    value: standardEditModalState.quantity,
    placeholder: '0',
    className: 'patio-standard-edit-modal__field',
  })}
    </div>
  `;
}

function createStandardEditModalFooter() {
  return `
    ${Button.create({ text: 'Cancelar', variant: 'dark', style: 'outline', size: 'sm' }).replace('<button ', '<button data-standard-modal-action="cancel" ')}
    ${Button.create({ text: 'Salvar', variant: 'primary', size: 'sm' }).replace('<button ', '<button data-standard-modal-action="save" ')}
  `;
}

function closeStandardEditModal({ restoreFocus = true } = {}) {
  const modalElement = document.querySelector(`[data-modal="${STANDARD_EDIT_MODAL_ID}"]`);
  const backdropElement = document.querySelector(`[data-modal-backdrop="${STANDARD_EDIT_MODAL_ID}"]`);
  if (!modalElement || !backdropElement) return;

  cleanupStandardEditModal();
  cleanupStandardEditModalInput?.();
  cleanupStandardEditModalInput = null;
  Modal.close(STANDARD_EDIT_MODAL_ID);
  modalElement.remove();
  backdropElement.remove();

  if (restoreFocus && standardEditModalReturnFocus?.focus) {
    standardEditModalReturnFocus.focus();
  }

  standardEditModalReturnFocus = null;
  standardEditModalState = null;
}

function saveStandardEditModal() {
  if (!standardEditModalState) return;

  const nextCarrierName = String(standardEditModalState.carrierName || '').trim();
  if (!nextCarrierName) return;

  if (standardEditModalState.mode === 'pluma-carrier') {
    state.plumaCarriers = state.plumaCarriers.map((carrier) => carrier.id === standardEditModalState.id
      ? { ...carrier, carrierName: nextCarrierName }
      : carrier);
    renderPlumaCarriers();
    closeStandardEditModal();
    return;
  }

  const nextUnit = standardEditModalState.unit || 'quilogramas';
  const nextQuantity = Number(standardEditModalState.quantity || 0);

  state.standardLogisticsItems = state.standardLogisticsItems.map((item) => item.id === standardEditModalState.id
    ? { ...item, carrierName: nextCarrierName, unit: nextUnit, quantity: nextQuantity }
    : item);

  renderStandardLogisticsList();
  closeStandardEditModal();
}

function openStandardEditModal({ itemId, anchorEl, mode = 'standard-logistics' }) {
  const existingModal = document.querySelector(`[data-modal="${STANDARD_EDIT_MODAL_ID}"]`);
  if (existingModal) {
    closeStandardEditModal({ restoreFocus: false });
  }

  if (mode === 'pluma-carrier') {
    const carrier = state.plumaCarriers.find((entry) => entry.id === itemId);
    if (!carrier) return;

    standardEditModalState = {
      mode,
      id: carrier.id,
      carrierName: carrier.carrierName,
      blocks: '',
      baleQuantity: '',
    };
  } else {
    const item = state.standardLogisticsItems.find((entry) => entry.id === itemId);
    if (!item) return;

    standardEditModalState = {
      mode,
      id: item.id,
      carrierName: item.carrierName,
      unit: item.unit || 'quilogramas',
      quantity: String(item.quantity ?? ''),
    };
  }

  standardEditModalReturnFocus = anchorEl;

  document.body.insertAdjacentHTML('beforeend', Modal.create({
    id: STANDARD_EDIT_MODAL_ID,
    title: 'Editar',
    size: 'sm',
    className: 'patio-standard-edit-modal',
    body: createStandardEditModalBody(),
    footer: createStandardEditModalFooter(),
  }));

  const modalElement = document.querySelector(`[data-modal="${STANDARD_EDIT_MODAL_ID}"]`);
  const backdropElement = document.querySelector(`[data-modal-backdrop="${STANDARD_EDIT_MODAL_ID}"]`);
  if (!modalElement || !backdropElement) return;

  cleanupStandardEditModalInput?.();
  cleanupStandardEditModalInput = Input.init(modalElement);

  const handleClick = (event) => {
    const cancelButton = event.target.closest('[data-standard-modal-action="cancel"]');
    const saveButton = event.target.closest('[data-standard-modal-action="save"]');
    const closeButton = event.target.closest('[data-modal-close]');

    if (cancelButton || closeButton) {
      closeStandardEditModal();
      return;
    }

    if (saveButton) {
      saveStandardEditModal();
    }
  };

  const handleInput = (event) => {
    if (!standardEditModalState) return;
    if (event.target.id === 'standard-edit-carrier-name') {
      standardEditModalState.carrierName = event.target.value;
    }
    if (event.target.id === 'standard-edit-quantity') {
      standardEditModalState.quantity = event.target.value;
    }
  };

  const handleModalChange = (event) => {
    if (!standardEditModalState) return;
    if (event.target.id === 'standard-edit-unit') {
      standardEditModalState.unit = event.target.value;
    }
  };

  const handleBackdrop = (event) => {
    if (event.target === backdropElement) {
      closeStandardEditModal();
    }
  };

  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      closeStandardEditModal();
      return;
    }

    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault();
      saveStandardEditModal();
    }
  };

  modalElement.addEventListener('click', handleClick);
  modalElement.addEventListener('input', handleInput);
  modalElement.addEventListener('change', handleModalChange);
  backdropElement.addEventListener('click', handleBackdrop);
  document.addEventListener('keydown', handleKeydown, true);

  cleanupStandardEditModal = () => {
    modalElement.removeEventListener('click', handleClick);
    modalElement.removeEventListener('input', handleInput);
    modalElement.removeEventListener('change', handleModalChange);
    backdropElement.removeEventListener('click', handleBackdrop);
    document.removeEventListener('keydown', handleKeydown, true);
    cleanupStandardEditModal = () => { };
  };

  Modal.open(STANDARD_EDIT_MODAL_ID);
  setTimeout(() => {
    modalElement.querySelector('[data-modal-close]')?.focus?.();
  }, 120);
}
function createPlumaClassificationPill(label, active, dataAttr = '') {
  return `<span class="patio-pluma-pill ${active ? 'is-active' : ''}" ${dataAttr}>${label}</span>`;
}

function renderPlumaBalesField(block) {
  return `
    <div class="patio-pluma-block__bales-field">
      <label class="field-label" for="pluma-block-bales-${block.id}">Fardos</label>
      <div class="patio-pluma-bales-input" data-pluma-bales-wrapper="${block.id}">
        <div class="patio-pluma-bales-input__chips">
          ${block.draftBales.map((item) => `
            <span class="patio-pluma-bales-chip">
              <span>${item}</span>
              <button type="button" class="patio-pluma-bales-chip__remove" data-pluma-remove-bale="${block.id}:${item}" aria-label="Remover fardo ${item}">${closeIcon}</button>
            </span>
          `).join('')}
          <input id="pluma-block-bales-${block.id}" class="patio-pluma-bales-input__control" type="text" value="${block.baleInputValue || ''}" placeholder="" data-pluma-bales-input="${block.id}" />
        </div>
      </div>
      <span class="patio-pluma-bales-input__hint">Aperte Enter para adicionar os fardos</span>
    </div>
  `;
}

function renderPlumaBlockField(block) {
  if (block.draftInclusionMode === 'bales') {
    return renderPlumaBalesField(block);
  }

  return `
    <div class="patio-pluma-block__quantity">
      ${Input.create({
    id: `pluma-block-quantity-${block.id}`,
    label: 'Quantidade',
    type: 'number',
    value: block.draftQuantity,
    placeholder: '0',
  })}
    </div>
  `;
}

function renderPlumaModalBalesField() {
  if (!plumaEditModalState) return '';

  return `
    <div class="patio-pluma-edit-modal__field patio-pluma-edit-modal__field--bales">
      <label class="field-label" for="pluma-edit-bales-input">Fardos</label>
      <div class="patio-pluma-bales-input patio-pluma-bales-input--modal" data-pluma-modal-bales-wrapper>
        <div class="patio-pluma-bales-input__chips">
          ${plumaEditModalState.bales.map((item) => `
            <span class="patio-pluma-bales-chip">
              <span>${item}</span>
              <button type="button" class="patio-pluma-bales-chip__remove" data-pluma-modal-remove-bale="${item}" aria-label="Remover fardo ${item}">${closeIcon}</button>
            </span>
          `).join('')}
          <input id="pluma-edit-bales-input" class="patio-pluma-bales-input__control" type="text" value="${plumaEditModalState.baleInputValue || ''}" data-pluma-modal-bales-input placeholder="" />
        </div>
      </div>
      <span class="patio-pluma-bales-input__hint">Aperte Enter para adicionar os fardos</span>
    </div>
  `;
}

function renderPlumaEditModalField() {
  if (!plumaEditModalState) return '';

  if (plumaEditModalState.isPartial && plumaEditModalState.inclusionMode === 'bales') {
    return renderPlumaModalBalesField();
  }

  return Input.create({
    id: 'pluma-edit-quantity',
    label: 'Quantidade',
    type: 'number',
    value: plumaEditModalState.quantity,
    placeholder: '0',
    disabled: !plumaEditModalState.isPartial,
    className: plumaEditModalState.isPartial
      ? 'patio-pluma-edit-modal__field'
      : 'patio-pluma-edit-modal__field patio-pluma-edit-modal__field--disabled',
  });
}
function createPlumaEditModalState(carrierId, blockId) {
  const carrier = state.plumaCarriers.find((item) => item.id === carrierId);
  const carrierBlock = carrier?.blocks.find((item) => item.id === blockId);
  if (!carrier || !carrierBlock) return null;

  return {
    carrierId,
    blockId,
    blockName: carrierBlock.blockName,
    isPartial: carrierBlock.classification === 'Bloco Parcial',
    inclusionMode: carrierBlock.detailCodes?.length ? 'bales' : 'quantity',
    quantity: String(carrierBlock.baleQuantity ?? ''),
    bales: [...(carrierBlock.detailCodes || [])],
    baleInputValue: '',
  };
}

function createPlumaEditModalBody() {
  if (!plumaEditModalState) return '';

  const partialToggle = Toggle.create({
    id: 'pluma-edit-partial-toggle',
    label: 'Bloco Parcial',
    checked: plumaEditModalState.isPartial,
    size: 'sm',
    className: 'patio-pluma-edit-modal__toggle',
  }).replace('class="toggle-input"', 'class="toggle-input" data-pluma-modal-partial');

  return `
    <div class="patio-pluma-edit-modal__content">
      ${Input.create({
    id: 'pluma-edit-block-name',
    label: 'Bloco',
    value: plumaEditModalState.blockName,
    className: 'patio-pluma-edit-modal__field',
  })}
      <div class="patio-pluma-edit-modal__toggle-row">
        ${partialToggle}
      </div>
      ${plumaEditModalState.isPartial ? `
        <div class="patio-pluma-edit-modal__radios">
          ${Radio.createGroup({
    name: 'pluma-edit-mode',
    options: [
      { value: 'quantity', label: 'Incluir à Quantidade' },
      { value: 'bales', label: 'Incluir Fardos' },
    ],
    value: plumaEditModalState.inclusionMode,
    horizontal: true,
    className: 'patio-pluma-radio-group patio-pluma-edit-modal__radio-group',
  })}
        </div>
      ` : ''}
      <div data-pluma-modal-field-host>
        ${renderPlumaEditModalField()}
      </div>
    </div>
  `;
}

function createPlumaEditModalFooter() {
  return `
    ${Button.create({ text: 'Cancelar', variant: 'dark', style: 'outline', size: 'sm' }).replace('<button ', '<button data-pluma-modal-action="cancel" ')}
    ${Button.create({ text: 'Salvar', variant: 'primary', size: 'sm' }).replace('<button ', '<button data-pluma-modal-action="save" ')}
  `;
}

function syncPlumaEditModalLayout(modalElement) {
  if (!modalElement) return;
  modalElement.classList.toggle('patio-pluma-edit-modal--wide', Boolean(plumaEditModalState?.isPartial && plumaEditModalState?.inclusionMode === 'bales'));
}

function rerenderPlumaEditModalBody() {
  const modalElement = document.querySelector(`[data-modal="${PLUMA_EDIT_MODAL_ID}"]`);
  if (!modalElement || !plumaEditModalState) return;

  const bodyElement = modalElement.querySelector('.modal-body');
  if (!bodyElement) return;

  bodyElement.innerHTML = createPlumaEditModalBody();
  cleanupPlumaEditModalInput?.();
  cleanupPlumaEditModalInput = Input.init(modalElement);
  syncPlumaEditModalLayout(modalElement);
}

function closePlumaEditModal({ restoreFocus = true } = {}) {
  const modalElement = document.querySelector(`[data-modal="${PLUMA_EDIT_MODAL_ID}"]`);
  const backdropElement = document.querySelector(`[data-modal-backdrop="${PLUMA_EDIT_MODAL_ID}"]`);
  if (!modalElement || !backdropElement) return;

  cleanupPlumaEditModal();
  cleanupPlumaEditModalInput?.();
  cleanupPlumaEditModalInput = null;
  Modal.close(PLUMA_EDIT_MODAL_ID);
  modalElement.remove();
  backdropElement.remove();

  if (restoreFocus && plumaEditModalReturnFocus?.focus) {
    plumaEditModalReturnFocus.focus();
  }

  plumaEditModalReturnFocus = null;
  plumaEditModalState = null;
}

function syncPlumaBlockFromCarrierRow(previousRow, updatedRow, inclusionMode, bales) {
  const normalizedPreviousName = String(previousRow.blockName || '').trim().toLowerCase();
  const candidate = state.plumaBlocks.find((item) => (
    String(item.name || '').trim().toLowerCase() === normalizedPreviousName
    && Number(item.baleQuantity || 0) === Number(previousRow.baleQuantity || 0)
    && item.classification === previousRow.classification
  )) || state.plumaBlocks.find((item) => String(item.name || '').trim().toLowerCase() === normalizedPreviousName);

  if (!candidate) return;

  candidate.name = updatedRow.blockName;
  candidate.baleQuantity = updatedRow.baleQuantity;
  candidate.classification = updatedRow.classification;
  candidate.inclusionMode = inclusionMode;
  candidate.draftInclusionMode = inclusionMode;
  candidate.bales = [...bales];
  candidate.draftBales = [...bales];
  candidate.baleInputValue = '';
  candidate.draftQuantity = String(updatedRow.baleQuantity ?? '');
}

function savePlumaEditModal() {
  if (!plumaEditModalState) return;

  const carrier = state.plumaCarriers.find((item) => item.id === plumaEditModalState.carrierId);
  const carrierBlock = carrier?.blocks.find((item) => item.id === plumaEditModalState.blockId);
  if (!carrier || !carrierBlock) return;

  const previousRow = {
    blockName: carrierBlock.blockName,
    baleQuantity: carrierBlock.baleQuantity,
    classification: carrierBlock.classification,
  };

  const nextBlockName = (plumaEditModalState.blockName || '').trim() || carrierBlock.blockName;
  const nextIsPartial = Boolean(plumaEditModalState.isPartial);
  const nextMode = nextIsPartial ? plumaEditModalState.inclusionMode : 'quantity';
  const nextBales = nextMode === 'bales'
    ? plumaEditModalState.bales.map((item) => item.trim()).filter(Boolean)
    : [];
  const nextQuantity = nextMode === 'bales'
    ? nextBales.length
    : Number(plumaEditModalState.quantity || 0);

  carrierBlock.blockName = nextBlockName;
  carrierBlock.baleQuantity = nextQuantity;
  carrierBlock.classification = nextIsPartial ? 'Bloco Parcial' : 'Bloco Completo';

  if (nextBales.length) {
    carrierBlock.detailCodes = [...nextBales];
    carrierBlock.isExpanded = true;
  } else {
    delete carrierBlock.detailCodes;
    delete carrierBlock.isExpanded;
  }

  carrier.totalBales = carrier.blocks.reduce((sum, item) => sum + Number(item.baleQuantity || 0), 0);

  syncPlumaBlockFromCarrierRow(previousRow, carrierBlock, nextMode, nextBales);

  renderPlumaBlocks();
  renderPlumaCarriers();
  updateHydratedFields();
  closePlumaEditModal();
}

function openPlumaEditModal({ carrierId, blockId, anchorEl = null } = {}) {
  closePlumaEditModal({ restoreFocus: false });

  plumaEditModalState = createPlumaEditModalState(carrierId, blockId);
  if (!plumaEditModalState) return;

  plumaEditModalReturnFocus = anchorEl;

  document.body.insertAdjacentHTML('beforeend', Modal.create({
    id: PLUMA_EDIT_MODAL_ID,
    title: 'Editar',
    size: 'sm',
    className: `patio-pluma-edit-modal ${plumaEditModalState.isPartial && plumaEditModalState.inclusionMode === 'bales' ? 'patio-pluma-edit-modal--wide' : ''}`,
    body: createPlumaEditModalBody(),
    footer: createPlumaEditModalFooter(),
  }));

  const modalElement = document.querySelector(`[data-modal="${PLUMA_EDIT_MODAL_ID}"]`);
  const backdropElement = document.querySelector(`[data-modal-backdrop="${PLUMA_EDIT_MODAL_ID}"]`);
  if (!modalElement || !backdropElement) return;

  cleanupPlumaEditModalInput?.();
  cleanupPlumaEditModalInput = Input.init(modalElement);
  syncPlumaEditModalLayout(modalElement);

  const handleClick = (event) => {
    const cancelButton = event.target.closest('[data-pluma-modal-action="cancel"]');
    const saveButton = event.target.closest('[data-pluma-modal-action="save"]');
    const closeButton = event.target.closest('[data-modal-close]');
    const removeBaleButton = event.target.closest('[data-pluma-modal-remove-bale]');

    if (cancelButton || closeButton) {
      closePlumaEditModal();
      return;
    }

    if (saveButton) {
      savePlumaEditModal();
      return;
    }

    if (removeBaleButton) {
      plumaEditModalState.bales = plumaEditModalState.bales.filter((item) => item !== removeBaleButton.dataset.plumaModalRemoveBale);
      rerenderPlumaEditModalBody();
    }
  };

  const handleBackdrop = (event) => {
    if (event.target !== backdropElement) return;
    closePlumaEditModal();
  };

  const handleChange = (event) => {
    if (event.target.matches('[data-pluma-modal-partial]')) {
      plumaEditModalState.isPartial = Boolean(event.target.checked);
      if (!plumaEditModalState.isPartial) {
        plumaEditModalState.inclusionMode = 'quantity';
      }
      rerenderPlumaEditModalBody();
      return;
    }

    if (event.target.name === 'pluma-edit-mode') {
      plumaEditModalState.inclusionMode = event.target.value;
      rerenderPlumaEditModalBody();
      return;
    }
  };

  const handleInput = (event) => {
    if (event.target.id === 'pluma-edit-block-name') {
      plumaEditModalState.blockName = event.target.value;
      return;
    }

    if (event.target.id === 'pluma-edit-quantity') {
      plumaEditModalState.quantity = event.target.value;
      return;
    }

    if (event.target.matches('[data-pluma-modal-bales-input]')) {
      plumaEditModalState.baleInputValue = event.target.value;
    }
  };

  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      closePlumaEditModal();
      return;
    }

    if (event.key === 'Enter' && event.target.matches('[data-pluma-modal-bales-input]')) {
      event.preventDefault();
      const nextValue = event.target.value.trim();
      if (!nextValue) return;
      if (!plumaEditModalState.bales.includes(nextValue)) {
        plumaEditModalState.bales.push(nextValue);
      }
      plumaEditModalState.baleInputValue = '';
      rerenderPlumaEditModalBody();
    }
  };

  modalElement.addEventListener('click', handleClick);
  modalElement.addEventListener('change', handleChange);
  modalElement.addEventListener('input', handleInput);
  backdropElement.addEventListener('click', handleBackdrop);
  document.addEventListener('keydown', handleKeydown, true);

  cleanupPlumaEditModal = () => {
    modalElement.removeEventListener('click', handleClick);
    modalElement.removeEventListener('change', handleChange);
    modalElement.removeEventListener('input', handleInput);
    backdropElement.removeEventListener('click', handleBackdrop);
    document.removeEventListener('keydown', handleKeydown, true);
    cleanupPlumaEditModal = () => { };
  };

  Modal.open(PLUMA_EDIT_MODAL_ID);
  setTimeout(() => {
    modalElement.querySelector('[data-modal-close]')?.focus?.();
  }, 120);
}
function renderPlumaBlocks() {
  const container = document.getElementById('patio-blocks-chips');
  if (!container) return;

  const totalBales = state.plumaBlocks.reduce((sum, block) => sum + Number(block.baleQuantity || 0), 0);

  container.innerHTML = `
    <div class="patio-pluma-blocks">
      <div class="patio-pluma-section-header patio-pluma-section-header--spaced">
        <h3 class="patio-pluma-section-title">Blocos</h3>
        <span class="patio-pluma-section-meta">${formatBales(totalBales)}</span>
      </div>
      <div class="patio-pluma-block-list">
        ${state.plumaBlocks.map((block) => `
          <article class="patio-pluma-block-card ${block.isOpen ? 'is-open' : ''}" data-pluma-block-id="${block.id}">
            <button type="button" class="patio-pluma-block-card__header" data-pluma-block-toggle="${block.id}" aria-expanded="${String(block.isOpen)}">
              <span class="patio-pluma-block__brand" aria-hidden="true">${blockIcon}</span>
              <span class="patio-pluma-block-card__main">
                <span class="patio-pluma-block__title">${block.name}</span>
                <span class="patio-pluma-block__meta">${block.baleQuantity} fardos</span>
              </span>
              <span class="patio-pluma-block__badges">
                ${createPlumaClassificationPill('Bloco Completo', block.classification === 'Bloco Completo', `data-pluma-set-classification="${block.id}:complete"`)}
                ${createPlumaClassificationPill('Bloco Parcial', block.classification === 'Bloco Parcial', `data-pluma-set-classification="${block.id}:partial"`)}
              </span>
              <span class="patio-pluma-block-card__chevron" aria-hidden="true">${ButtonIcon.getIcon(block.isOpen ? 'chevronUp' : 'chevronDown')}</span>
            </button>
            ${block.isOpen ? `
              <div class="patio-pluma-block-card__body">
                ${block.classification === 'Bloco Parcial' ? `
                  <div class="patio-pluma-block__radios">
                    ${Radio.createGroup({
    name: `pluma-block-mode-${block.id}`,
    options: [
      { value: 'quantity', label: 'Incluir à Quantidade' },
      { value: 'bales', label: 'Incluir Fardos' },
    ],
    value: block.draftInclusionMode,
    horizontal: true,
    className: 'patio-pluma-radio-group',
  })}
                  </div>
                  ${renderPlumaBlockField(block)}
                ` : ''}
                ${block.classification === 'Bloco Parcial' ? `
                <div class="patio-pluma-block__actions">
                  <span data-pluma-save-block="${block.id}">${Button.create({ text: 'Salvar', variant: 'primary', size: 'sm' })}</span>
                  <span data-pluma-cancel-block="${block.id}">${Button.create({ text: 'Cancelar', variant: 'dark', style: 'outline', size: 'sm' })}</span>
                </div>
                ` : ''}
              </div>
            ` : ''}
          </article>
        `).join('')}
      </div>
      ${state.plumaBlocks.length ? `
        <div class="patio-pluma-blocks__footer">
          <button type="button" class="patio-pluma-transfer-btn" data-pluma-transfer-to-carrier>
            <span class="patio-pluma-transfer-btn__icon">+</span>
            <span class="patio-pluma-transfer-btn__text">Adicionar à Lista</span>
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

function renderPlumaCarrierRows(carrier) {
  return carrier.blocks.map((block) => {
    const toggleAction = block.detailCodes?.length
      ? createInstructionAction('toggle', block.isExpanded ? 'chevronUp' : 'chevronDown', 'data-pluma-toggle-row', `${carrier.id}:${block.id}`)
      : '<span class="patio-instruction-action patio-instruction-action--toggle patio-instruction-action--empty" aria-hidden="true"></span>';

    return `
      <tr>
        <td>${block.blockName}</td>
        <td>${block.baleQuantity}</td>
        <td>${block.classification}</td>
        <td>
          <div class="patio-pluma-table__row-actions">
            ${createInstructionAction('edit', 'edit', 'data-pluma-edit-row', `${carrier.id}:${block.id}`)}
            ${createInstructionAction('delete', 'trash', 'data-pluma-delete-row', `${carrier.id}:${block.id}`)}
            ${toggleAction}
          </div>
        </td>
      </tr>
      ${block.detailCodes?.length && block.isExpanded ? `
        <tr class="patio-pluma-table__detail-row">
          <td colspan="4">
            <div class="patio-pluma-table__detail-chips">
              ${block.detailCodes.map((code) => `<span class="patio-pluma-table__detail-chip">${code}</span>`).join('')}
            </div>
          </td>
        </tr>
      ` : ''}
    `;
  }).join('');
}

function renderPlumaCarriers() {
  const container = document.getElementById('patio-logistics-list');
  if (!container) return;

  if (!state.plumaCarriers.length) {
    container.innerHTML = '';
    container.classList.add('is-empty');
    return;
  }

  container.classList.remove('is-empty');
  container.innerHTML = state.plumaCarriers.map((carrier) => `
    <article class="patio-pluma-carrier" data-pluma-carrier-id="${carrier.id}">
      <header class="patio-pluma-carrier__header">
        <div class="patio-pluma-carrier__identity">
          <h3 class="patio-pluma-carrier__title">${carrier.carrierName}</h3>
          <p class="patio-pluma-carrier__subtitle">${formatBales(carrier.totalBales)}</p>
        </div>
        <div class="patio-pluma-carrier__actions">
          ${createInstructionAction('edit', 'edit', 'data-pluma-edit-carrier', carrier.id)}
          ${createInstructionAction('delete', 'trash', 'data-pluma-delete-carrier', carrier.id)}
          ${createInstructionAction('toggle', carrier.isExpanded ? 'chevronUp' : 'chevronDown', 'data-pluma-toggle-carrier', carrier.id)}
        </div>
      </header>
      ${carrier.isExpanded ? `
        <div class="patio-pluma-carrier__body">
          <div class="patio-pluma-table-wrapper">
            <table class="patio-pluma-table">
              <thead>
                <tr>
                  <th>Bloco</th>
                  <th>Quantidade de Fardos</th>
                  <th>Classificação</th>
                  <th class="patio-pluma-table__actions" aria-label="Ações"></th>
                </tr>
              </thead>
              <tbody>
                ${renderPlumaCarrierRows(carrier)}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}
    </article>
  `).join('');
}

function renderPlumaLogisticsFields() {
  const container = document.getElementById('patio-logistics-fields');
  const actions = document.getElementById('patio-logistics-actions');
  if (!container || !actions) return;

  container.classList.add('patio-logistics-builder__grid--pluma');

  container.innerHTML = `
    <div class="patio-pluma-builder">
      <div class="patio-pluma-builder__row patio-pluma-builder__row--full">
        ${Input.createAutocomplete({ id: 'carrierName', label: 'Transportadora Responsável', placeholder: 'Nome da Transportadora', value: state.formValues.carrierName, suggestions: contractFieldOptions.carriers })}
      </div>
      <div class="patio-pluma-builder__row patio-pluma-builder__row--full">
        <div class="patio-pluma-builder__field">
          ${Input.create({
    id: 'blockInput',
    label: 'Blocos (Tecle Enter para adicionar)',
    placeholder: 'Ex: B1, B2...',
    value: state.formValues.blockInput,
  })}
        </div>
      </div>
      <div class="patio-pluma-builder__actions-row">
        <div class="patio-pluma-builder__button-wrap">
          <span data-pluma-add-block>${Button.create({ text: 'Adicionar', variant: 'primary' })}</span>
        </div>
      </div>
    </div>
  `;

  actions.innerHTML = '';
  renderPlumaBlocks();
  renderPlumaCarriers();
}

function renderLogisticsSection() {
  if (isPlumaProduct()) {
    renderPlumaLogisticsFields();
    return;
  }

  renderStandardLogisticsFields();
  renderStandardLogisticsList();
}

function renderUpload() {
  const container = document.getElementById('patio-document-upload');
  if (!container) return;

  container.innerHTML = FileUpload.create({
    id: 'patio-documentation-upload',
    title: '',
    titleIcon: false,
    acceptedFormats: ['application/pdf', 'image/jpeg', 'image/png'],
    maxSize: 5 * 1024 * 1024,
    maxSizeLabel: '5MB',
    multiple: true,
  });

  const upload = container.querySelector('[data-file-upload]');
  const zoneText = upload?.querySelector('.file-upload-zone-text');
  const zoneHint = upload?.querySelector('.file-upload-zone-hint');

  if (zoneText) zoneText.textContent = 'Clique para fazer upload de arquivos';
  if (zoneHint) zoneHint.textContent = 'PDF, JPG ou PNG (Máx 5MB)';
}

function updateHydratedFields() {
  cleanupInput?.();
  cleanupInput = Input.init(document);
  bindFormSync();
}

function rerenderForProductTypeChange() {
  renderContractFields();
  renderLogisticsSection();
  updateHydratedFields();
  bindCarrierAutocompleteSearch();
}

function readFormValues() {
  const fields = ['instructionNumber', 'issueDate', 'loadingDeadline', 'buyer', 'contractNumber', 'producerDocument', 'sellerName', 'productType', 'branch', 'carrierName', 'blockInput', 'unit', 'quantity'];
  fields.forEach((field) => {
    const element = document.getElementById(field);
    if (element) state.formValues[field] = element.value;
  });
}

function clearStandardLogisticsBuilder() {
  state.formValues.carrierName = '';
  state.formValues.unit = 'quilogramas';
  state.formValues.quantity = '0';
  state.editingLogisticsId = null;
  renderStandardLogisticsFields();
  updateHydratedFields();
}


function addPlumaBlocks(rawValue) {
  const DEFAULT_BALE_QUANTITY = 150;
  const blocks = rawValue
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  blocks.forEach((name) => {
    const blockId = `block-${slugify(name)}-${Date.now()}`;
    state.plumaBlocks.unshift({
      id: blockId,
      name,
      baleQuantity: DEFAULT_BALE_QUANTITY,
      classification: 'Bloco Completo',
      inclusionMode: 'quantity',
      draftQuantity: String(DEFAULT_BALE_QUANTITY),
      draftInclusionMode: 'quantity',
      isOpen: true,
    });

  });
}

function handleBlockInputKeydown(event) {
  if (event.key !== 'Enter') return;
  event.preventDefault();

  const value = event.currentTarget.value.trim();
  if (!value) return;

  if (isPlumaProduct()) {
    addPlumaBlocks(value);
    state.formValues.blockInput = '';
    renderPlumaLogisticsFields();
    updateHydratedFields();
    setTimeout(() => {
      const blockInput = document.getElementById('blockInput');
      if (blockInput) blockInput.focus();
    }, 0);
  }
}

function bindFormSync() {
  document.querySelectorAll('#patio-contract-fields .input, #patio-contract-fields select, #patio-logistics-fields .input, #patio-logistics-fields select').forEach((field) => {
    if (field.dataset.boundSync === 'true') return;
    field.dataset.boundSync = 'true';

    field.addEventListener('input', () => {
      state.formValues[field.id] = field.value;
      if (field.id === 'buyer') {
        const selectedLabel = String(field.dataset.selectedBuyerLabel || '');
        const selectedId = String(field.dataset.selectedBuyerId || '');
        if (selectedLabel && field.value === selectedLabel && selectedId) {
          state.formValues.buyerId = selectedId;
        } else {
          state.formValues.buyerId = '';
          delete field.dataset.selectedBuyerId;
          delete field.dataset.selectedBuyerLabel;
        }
      }
      if (field.id === 'producerDocument') {
        const selectedDoc = String(field.dataset.selectedProducerDoc || '');
        const selectedId = String(field.dataset.selectedProducerId || '');
        if (selectedDoc && field.value === selectedDoc && selectedId) {
          state.formValues.sellerId = selectedId;
        } else {
          state.formValues.sellerId = '';
          delete field.dataset.selectedProducerId;
          delete field.dataset.selectedProducerDoc;
        }
      }
      if (field.id === 'sellerName') {
        const selectedLabel = String(field.dataset.selectedSellerLabel || '');
        const selectedId = String(field.dataset.selectedSellerId || '');
        if (selectedLabel && field.value === selectedLabel && selectedId) {
          state.formValues.sellerId = selectedId;
        } else {
          state.formValues.sellerId = '';
          delete field.dataset.selectedSellerId;
          delete field.dataset.selectedSellerLabel;
        }
      }
      if (field.id === 'carrierName') {
        const selectedLabel = String(field.dataset.selectedCarrierLabel || '');
        const selectedId = String(field.dataset.selectedCarrierId || '');
        if (selectedLabel && field.value === selectedLabel && selectedId) {
          state.formValues.carrierId = selectedId;
        } else {
          state.formValues.carrierId = '';
          delete field.dataset.selectedCarrierId;
          delete field.dataset.selectedCarrierLabel;
        }
      }
    });
    field.addEventListener('change', () => {
      state.formValues[field.id] = field.value;
      if (field.id === 'buyer') {
        const selectedLabel = String(field.dataset.selectedBuyerLabel || '');
        const selectedId = String(field.dataset.selectedBuyerId || '');
        if (selectedLabel && field.value === selectedLabel && selectedId) {
          state.formValues.buyerId = selectedId;
        } else {
          state.formValues.buyerId = '';
          delete field.dataset.selectedBuyerId;
          delete field.dataset.selectedBuyerLabel;
        }
      }
      if (field.id === 'producerDocument') {
        const selectedDoc = String(field.dataset.selectedProducerDoc || '');
        const selectedId = String(field.dataset.selectedProducerId || '');
        if (selectedDoc && field.value === selectedDoc && selectedId) {
          state.formValues.sellerId = selectedId;
        } else {
          state.formValues.sellerId = '';
          delete field.dataset.selectedProducerId;
          delete field.dataset.selectedProducerDoc;
        }
      }
      if (field.id === 'sellerName') {
        const selectedLabel = String(field.dataset.selectedSellerLabel || '');
        const selectedId = String(field.dataset.selectedSellerId || '');
        if (selectedLabel && field.value === selectedLabel && selectedId) {
          state.formValues.sellerId = selectedId;
        } else {
          state.formValues.sellerId = '';
          delete field.dataset.selectedSellerId;
          delete field.dataset.selectedSellerLabel;
        }
      }
      if (field.id === 'carrierName') {
        const selectedLabel = String(field.dataset.selectedCarrierLabel || '');
        const selectedId = String(field.dataset.selectedCarrierId || '');
        if (selectedLabel && field.value === selectedLabel && selectedId) {
          state.formValues.carrierId = selectedId;
        } else {
          state.formValues.carrierId = '';
          delete field.dataset.selectedCarrierId;
          delete field.dataset.selectedCarrierLabel;
        }
      }
      if (field.id === 'productType') {
        rerenderForProductTypeChange();
      } else if (field.id === 'unit' && !isPlumaProduct()) {
        renderStandardLogisticsFields();
        updateHydratedFields();
      }
    });
  });

  bindBuyerAutocompleteSearch();
  bindProducerDocumentAutocompleteSearch();
  bindSellerNameAutocompleteSearch();
  bindCarrierAutocompleteSearch();

  const producerDocumentField = document.getElementById('producerDocument');
  if (producerDocumentField && producerDocumentField.dataset.boundLookup !== 'true') {
    producerDocumentField.dataset.boundLookup = 'true';
    producerDocumentField.addEventListener('change', async () => {
      const doc = String(producerDocumentField.value || '').trim();
      if (!doc) {
        state.formValues.sellerId = '';
        return;
      }
      try {
        const response = await apiRequest('/pessoas-empresas', {
          query: {
            'filter[cpf_cnpj][eq]': doc,
            limit: 1,
            categoria_id: Array.from(vendedorProdutorCategoriaIds)[0] || undefined,
          },
        });
        let rows = parseApiResponse(response);
        if (vendedorProdutorCategoriaIds.size) {
          rows = rows.filter((item = {}) => vendedorProdutorCategoriaIds.has(String(item?.categoria_id || '')));
        }
        const person = rows[0];
        if (!person) return;
        const personId = String(person.id);
        const personName = person?.razao_social || person?.nome_fantasia || person?.nome_responsavel || doc;
        producerDocumentField.dataset.selectedProducerId = personId;
        producerDocumentField.dataset.selectedProducerDoc = doc;
        state.formValues.sellerName = personName;
        state.formValues.sellerId = personId;
        const sellerField = document.getElementById('sellerName');
        if (sellerField) {
          sellerField.value = personName;
          sellerField.dataset.selectedSellerId = personId;
          sellerField.dataset.selectedSellerLabel = personName;
        }
      } catch (error) {
        console.error('[controle-patio/nova-instrucao] falha ao localizar produtor por documento', error);
      }
    });
  }

  document.querySelectorAll('[id^="pluma-block-quantity-"]').forEach((field) => {
    if (field.dataset.boundSync === 'true') return;
    field.dataset.boundSync = 'true';

    field.addEventListener('input', () => {
      const blockId = field.id.replace('pluma-block-quantity-', '');
      const block = state.plumaBlocks.find((item) => item.id === blockId);
      if (!block) return;
      block.draftQuantity = field.value;
    });
  });

  document.querySelectorAll('input[name^="pluma-block-mode-"]').forEach((field) => {
    if (field.dataset.boundSync === 'true') return;
    field.dataset.boundSync = 'true';

    field.addEventListener('change', () => {
      const blockId = field.name.replace('pluma-block-mode-', '');
      const block = state.plumaBlocks.find((item) => item.id === blockId);
      if (!block) return;
      block.draftInclusionMode = field.value;
      if (field.value === 'bales') {
        block.draftQuantity = String(Array.isArray(block.draftBales) ? block.draftBales.length : 0);
      }
      renderPlumaBlocks();
      updateHydratedFields();
    });
  });

  document.querySelectorAll('[data-pluma-bales-input]').forEach((field) => {
    if (field.dataset.boundSync === 'true') return;
    field.dataset.boundSync = 'true';

    field.addEventListener('input', () => {
      const block = state.plumaBlocks.find((item) => item.id === field.dataset.plumaBalesInput);
      if (!block) return;
      block.baleInputValue = field.value;
    });

    field.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      const block = state.plumaBlocks.find((item) => item.id === field.dataset.plumaBalesInput);
      if (!block) return;
      const nextValue = field.value.trim();
      if (!nextValue) return;
      if (!block.draftBales.includes(nextValue)) {
        block.draftBales.push(nextValue);
      }
      block.draftQuantity = String(block.draftBales.length);
      block.baleInputValue = '';
      const blockId = block.id;
      renderPlumaBlocks();
      updateHydratedFields();
      setTimeout(() => {
        const newField = document.querySelector(`[data-pluma-bales-input="${blockId}"]`);
        if (newField) newField.focus();
      }, 0);
    });
  });

  const blockInput = document.getElementById('blockInput');
  if (blockInput && blockInput.dataset.boundKeydown !== 'true') {
    blockInput.dataset.boundKeydown = 'true';
    blockInput.addEventListener('keydown', handleBlockInputKeydown);
  }
}

function handleAddStandardLogistics() {
  readFormValues();

  const carrierName = state.formValues.carrierName.trim();
  if (!carrierName) return;

  const unit = state.formValues.unit || 'quilogramas';
  const quantity = Number(state.formValues.quantity || 0);
  const nextItem = {
    id: state.editingLogisticsId || `log-${Date.now()}`,
    carrierName,
    unit,
    quantity,
  };

  if (state.editingLogisticsId) {
    state.standardLogisticsItems = state.standardLogisticsItems.map((item) => item.id === state.editingLogisticsId ? nextItem : item);
  } else {
    state.standardLogisticsItems = [nextItem, ...state.standardLogisticsItems];
  }

  renderStandardLogisticsList();
  clearStandardLogisticsBuilder();
}

function handleSavePlumaBlock(blockId) {
  const block = state.plumaBlocks.find((item) => item.id === blockId);
  if (!block) return;

  const nextBales = block.draftInclusionMode === 'bales'
    ? block.draftBales.map((item) => item.trim()).filter(Boolean)
    : [];
  const quantityFieldEl = document.getElementById(`pluma-block-quantity-${blockId}`);
  const draftQty = quantityFieldEl ? quantityFieldEl.value : block.draftQuantity;
  block.draftQuantity = String(draftQty ?? '');
  const nextQuantity = block.draftInclusionMode === 'bales'
    ? nextBales.length
    : Number(block.draftQuantity || 0);

  block.baleQuantity = nextQuantity;
  block.inclusionMode = block.draftInclusionMode;
  block.bales = [...nextBales];
  block.draftBales = [...nextBales];
  block.baleInputValue = '';
  const isDefaultQuantity = block.draftInclusionMode !== 'bales' && nextQuantity === 150;
  block.classification = block.draftInclusionMode === 'bales' || !isDefaultQuantity
    ? 'Bloco Parcial'
    : 'Bloco Completo';
  block.isOpen = false;

  renderPlumaBlocks();
  updateHydratedFields();
}

function handleCancelPlumaBlock(blockId) {
  const block = state.plumaBlocks.find((item) => item.id === blockId);
  if (!block) return;

  block.draftQuantity = String(block.baleQuantity);
  block.draftInclusionMode = block.inclusionMode;
  block.draftBales = [...(block.bales || [])];
  block.baleInputValue = '';
  block.isOpen = false;
  renderPlumaBlocks();
  updateHydratedFields();
}

function handleTransferBlocksToCarrier() {
  if (!state.plumaBlocks.length) return;

  const carrierLabel = String(state.formValues.carrierName || '').trim();
  if (!carrierLabel) return;

  let carrier = state.plumaCarriers.find((item) => item.carrierName === carrierLabel);
  if (!carrier) {
    carrier = {
      id: `carrier-${slugify(carrierLabel)}-${Date.now()}`,
      carrierName: carrierLabel,
      totalBales: 0,
      isExpanded: true,
      blocks: [],
    };
    state.plumaCarriers.unshift(carrier);
  }

  state.plumaBlocks.forEach((block) => {
    const transferredBlock = {
      id: `carrier-row-${slugify(block.name)}-${Date.now()}`,
      blockName: block.name,
      baleQuantity: Number(block.baleQuantity || 0),
      classification: block.classification,
    };

    if (block.inclusionMode === 'bales' && block.bales?.length) {
      transferredBlock.detailCodes = [...block.bales];
      transferredBlock.isExpanded = true;
    }

    carrier.blocks.unshift(transferredBlock);
  });

  carrier.totalBales = carrier.blocks.reduce((sum, item) => sum + Number(item.baleQuantity || 0), 0);

  state.plumaBlocks = [];
  state.formValues.blockInput = '';

  renderPlumaBlocks();
  renderPlumaCarriers();
  updateHydratedFields();
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function findOptionByText(options, value) {
  const normalized = normalizeText(value);
  if (!normalized) return null;
  return options.find((option) => normalizeText(option.label) === normalized || normalizeText(option.value) === normalized) || null;
}

function isCompradorCategoria(item = {}) {
  const nome = normalizeText(item?.nome || item?.categoria || '');
  return nome === 'comprador';
}

function isVendedorProdutorCategoria(item = {}) {
  const nome = normalizeText(item?.nome || item?.categoria || '');
  return nome === 'vendedor/produtor' || nome === 'vendedor produtor';
}

function isTransportadoraCategoria(item = {}) {
  const nome = normalizeText(item?.nome || item?.categoria || '');
  return nome === 'transportadora' || nome.includes('transportadora');
}

function buyerOptionsFromRows(rows = []) {
  if (!compradorCategoriaIds.size) return [];
  return rows
    .map((item = {}) => toPessoaOption(item))
    .filter((option) => compradorCategoriaIds.has(option.categoriaId))
    .filter((option) => String(option.value || '').trim() && String(option.label || '').trim())
    .map(({ value, label }) => ({ id: value, value: label, label }));
}

function carrierOptionsFromRows(rows = []) {
  if (!transportadoraCategoriaIds.size) return [];
  return rows
    .filter((item = {}) => transportadoraCategoriaIds.has(String(item?.categoria_id || '')))
    .map((item = {}) => {
      const id = String(item?.id || '').trim();
      const nome = String(item?.razao_social || item?.nome_fantasia || item?.nome_responsavel || '').trim();
      return { id, value: nome, label: nome };
    })
    .filter((item) => item.id && item.value);
}

function updateBuyerSuggestions(options = []) {
  const buyerInput = document.getElementById('buyer');
  if (!(buyerInput instanceof HTMLInputElement)) return;
  const wrapper = buyerInput.closest('.input-wrapper');
  if (!wrapper) return;

  let suggestions = wrapper.querySelector('[data-suggestions]');
  if (!suggestions) {
    suggestions = document.createElement('div');
    suggestions.className = 'input-suggestions';
    suggestions.setAttribute('data-suggestions', '');
    wrapper.appendChild(suggestions);
  }

  const normalizedOptions = (Array.isArray(options) ? options : []).slice(0, 50);
  suggestions.innerHTML = normalizedOptions.map((item, index) => (
    `<div class="input-suggestion" data-id="${String(item.id || '')}" data-value="${String(item.value || '')}" data-index="${index}">${String(item.label || '')}</div>`
  )).join('');

  if (!normalizedOptions.length) {
    suggestions.classList.remove('is-visible');
    return;
  }

  const applySelection = (item) => {
    const selectedId = String(item.getAttribute('data-id') || '').trim();
    const selectedLabel = String(item.getAttribute('data-value') || '').trim();
    if (!selectedLabel) return;

    buyerInput.value = selectedLabel;
    buyerInput.dataset.selectedBuyerId = selectedId;
    buyerInput.dataset.selectedBuyerLabel = selectedLabel;
    buyerInput.dataset.skipBuyerSearch = 'true';
    buyerInput.dataset.confirmedValue = selectedLabel;
    state.formValues.buyer = selectedLabel;
    state.formValues.buyerId = selectedId;
    suggestions.classList.remove('is-visible');
    buyerInput.dispatchEvent(new Event('input', { bubbles: true }));
    buyerInput.dispatchEvent(new Event('change', { bubbles: true }));
  };

  suggestions.querySelectorAll('.input-suggestion').forEach((item) => {
    item.addEventListener('mousedown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      applySelection(item);
    });
    item.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      applySelection(item);
    });
  });
}

async function searchCompradores(query = '') {
  const typed = String(query || '').trim();
  if (typed.length < 3) return [];
  if (!compradorCategoriaIds.size) return [];

  const firstCategoriaCompradorId = Array.from(compradorCategoriaIds)[0];
  const queryParams = {
    q: typed,
    limit: 50,
  };
  if (firstCategoriaCompradorId) {
    queryParams['filter[categoria_id][eq]'] = firstCategoriaCompradorId;
  }

  const result = await apiRequest('/pessoas-empresas', {
    query: queryParams,
  });

  let rows = parseApiResponse(result);
  rows = rows.filter((item = {}) => compradorCategoriaIds.has(String(item?.categoria_id || '')));
  const filtered = buyerOptionsFromRows(rows)
    .filter((item) => normalizeText(item.label).includes(normalizeText(typed)));
  if (filtered.length) return filtered;

  return [];
}

function bindBuyerAutocompleteSearch() {
  const buyerField = document.getElementById('buyer');
  if (!(buyerField instanceof HTMLInputElement)) return;
  if (buyerField.dataset.boundBuyerSearch === 'true') return;
  buyerField.dataset.boundBuyerSearch = 'true';

  const triggerSearch = () => {
    if (buyerField.dataset.skipBuyerSearch === 'true') {
      delete buyerField.dataset.skipBuyerSearch;
      return;
    }
    if (buyerSearchTimeoutId) window.clearTimeout(buyerSearchTimeoutId);
    buyerSearchTimeoutId = window.setTimeout(async () => {
      try {
        const typed = String(buyerField.value || '').trim();
        if (typed.length < 3) {
          updateBuyerSuggestions([]);
          return;
        }
        if (buyerAutocompleteAbortController) buyerAutocompleteAbortController.abort();
        buyerAutocompleteAbortController = new AbortController();
        const options = await searchCompradores(buyerField.value || '');
        updateBuyerSuggestions(options);
        const wrapper = buyerField.closest('.input-wrapper');
        const suggestions = wrapper?.querySelector('[data-suggestions]');
        if (Array.isArray(options) && options.length > 0) suggestions?.classList.add('is-visible');
        else suggestions?.classList.remove('is-visible');
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error('[controle-patio/nova-instrucao] falha ao buscar compradores', error);
        }
      }
    }, 250);
  };

  buyerField.addEventListener('focus', triggerSearch);
  buyerField.addEventListener('input', (event) => { if (event.isTrusted) delete buyerField.dataset.confirmedValue; triggerSearch(); });
  buyerField.addEventListener('blur', () => {
    setTimeout(() => {
      if (buyerField.dataset.confirmedValue === undefined || buyerField.value !== buyerField.dataset.confirmedValue) {
        buyerField.value = '';
        state.formValues.buyer = '';
        state.formValues.buyerId = '';
        delete buyerField.dataset.selectedBuyerId;
        delete buyerField.dataset.selectedBuyerLabel;
        delete buyerField.dataset.confirmedValue;
        updateBuyerSuggestions([]);
      }
    }, 200);
  });
}

function updateCarrierSuggestions(options = []) {
  const carrierInput = document.getElementById('carrierName');
  if (!(carrierInput instanceof HTMLInputElement)) return;
  const wrapper = carrierInput.closest('.input-wrapper');
  if (!wrapper) return;

  let suggestions = wrapper.querySelector('[data-suggestions]');
  if (!suggestions) {
    suggestions = document.createElement('div');
    suggestions.className = 'input-suggestions';
    suggestions.setAttribute('data-suggestions', '');
    wrapper.appendChild(suggestions);
  }

  const normalizedOptions = (Array.isArray(options) ? options : []).slice(0, 50);
  suggestions.innerHTML = normalizedOptions.map((item, index) => (
    `<div class="input-suggestion" data-id="${String(item.id || '')}" data-value="${String(item.value || '')}" data-index="${index}">${String(item.label || '')}</div>`
  )).join('');

  if (!normalizedOptions.length) {
    suggestions.classList.remove('is-visible');
    return;
  }

  suggestions.querySelectorAll('.input-suggestion').forEach((item) => {
    item.addEventListener('click', () => {
      const selectedId = String(item.getAttribute('data-id') || '').trim();
      const selectedLabel = String(item.getAttribute('data-value') || '').trim();
      carrierInput.value = selectedLabel;
      carrierInput.dataset.selectedCarrierId = selectedId;
      carrierInput.dataset.selectedCarrierLabel = selectedLabel;
      carrierInput.dataset.skipCarrierSearch = 'true';
      carrierInput.dataset.confirmedValue = selectedLabel;
      state.formValues.carrierName = selectedLabel;
      state.formValues.carrierId = selectedId;
      suggestions.classList.remove('is-visible');
      carrierInput.dispatchEvent(new Event('input', { bubbles: true }));
      carrierInput.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
}

async function searchTransportadoras(query = '') {
  const typed = String(query || '').trim();
  if (typed.length < 3) return [];

  const firstCategoriaTransportadoraId = Array.from(transportadoraCategoriaIds)[0];
  const result = await apiRequest('/pessoas-empresas', {
    query: {
      q: typed,
      limit: 50,
      categoria_id: firstCategoriaTransportadoraId || undefined,
    },
  });
  let rows = parseApiResponse(result);
  if (transportadoraCategoriaIds.size) {
    rows = rows.filter((item = {}) => transportadoraCategoriaIds.has(String(item?.categoria_id || '')));
  }
  return carrierOptionsFromRows(rows);
}

function bindCarrierAutocompleteSearch() {
  const carrierField = document.getElementById('carrierName');
  if (!(carrierField instanceof HTMLInputElement)) return;
  if (carrierField.dataset.boundCarrierSearch === 'true') return;
  carrierField.dataset.boundCarrierSearch = 'true';

  const triggerSearch = () => {
    if (carrierField.dataset.skipCarrierSearch === 'true') {
      delete carrierField.dataset.skipCarrierSearch;
      return;
    }
    if (carrierSearchTimeoutId) window.clearTimeout(carrierSearchTimeoutId);
    carrierSearchTimeoutId = window.setTimeout(async () => {
      try {
        const typed = String(carrierField.value || '').trim();
        if (typed.length < 3) {
          updateCarrierSuggestions([]);
          return;
        }
        if (carrierAutocompleteAbortController) carrierAutocompleteAbortController.abort();
        carrierAutocompleteAbortController = new AbortController();
        const options = await searchTransportadoras(typed);
        updateCarrierSuggestions(options);
        const wrapper = carrierField.closest('.input-wrapper');
        const suggestions = wrapper?.querySelector('[data-suggestions]');
        if (Array.isArray(options) && options.length > 0) suggestions?.classList.add('is-visible');
        else suggestions?.classList.remove('is-visible');
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error('[controle-patio/nova-instrucao] falha ao buscar transportadoras', error);
        }
      }
    }, 250);
  };

  carrierField.addEventListener('focus', triggerSearch);
  carrierField.addEventListener('input', (event) => { if (event.isTrusted) delete carrierField.dataset.confirmedValue; triggerSearch(); });
  carrierField.addEventListener('blur', () => {
    setTimeout(() => {
      if (carrierField.dataset.confirmedValue === undefined || carrierField.value !== carrierField.dataset.confirmedValue) {
        carrierField.value = '';
        state.formValues.carrierName = '';
        state.formValues.carrierId = '';
        delete carrierField.dataset.selectedCarrierId;
        delete carrierField.dataset.selectedCarrierLabel;
        delete carrierField.dataset.confirmedValue;
        updateCarrierSuggestions([]);
      }
    }, 200);
  });
}

function producerDocOptionsFromRows(rows = []) {
  if (!vendedorProdutorCategoriaIds.size) return [];
  return rows
    .filter((item = {}) => vendedorProdutorCategoriaIds.has(String(item?.categoria_id || '')))
    .map((item = {}) => {
      const id = String(item?.id || '').trim();
      const documento = String(item?.cpf_cnpj || '').trim();
      const nome = String(item?.razao_social || item?.nome_fantasia || item?.nome_responsavel || '').trim();
      const label = documento ? `${documento} - ${nome}` : nome;
      return { id, value: documento || nome, label, nome };
    })
    .filter((item) => item.id && item.value);
}

function sellerNameOptionsFromRows(rows = []) {
  if (!vendedorProdutorCategoriaIds.size) return [];
  return rows
    .filter((item = {}) => vendedorProdutorCategoriaIds.has(String(item?.categoria_id || '')))
    .map((item = {}) => {
      const id = String(item?.id || '').trim();
      const documento = String(item?.cpf_cnpj || '').trim();
      const nome = String(item?.razao_social || item?.nome_fantasia || item?.nome_responsavel || '').trim();
      const label = documento ? `${nome} - ${documento}` : nome;
      return { id, value: nome, label, nome, documento };
    })
    .filter((item) => item.id && item.value);
}

function updateProducerDocumentSuggestions(options = []) {
  const producerInput = document.getElementById('producerDocument');
  if (!(producerInput instanceof HTMLInputElement)) return;
  const wrapper = producerInput.closest('.input-wrapper');
  if (!wrapper) return;

  let suggestions = wrapper.querySelector('[data-suggestions]');
  if (!suggestions) {
    suggestions = document.createElement('div');
    suggestions.className = 'input-suggestions';
    suggestions.setAttribute('data-suggestions', '');
    wrapper.appendChild(suggestions);
  }

  const normalizedOptions = (Array.isArray(options) ? options : []).slice(0, 50);
  suggestions.innerHTML = normalizedOptions.map((item, index) => (
    `<div class="input-suggestion" data-id="${String(item.id || '')}" data-value="${String(item.value || '')}" data-nome="${String(item.nome || '')}" data-index="${index}">${String(item.label || '')}</div>`
  )).join('');

  if (!normalizedOptions.length) {
    suggestions.classList.remove('is-visible');
    return;
  }

  const applySelection = (item) => {
    const selectedId = String(item.getAttribute('data-id') || '').trim();
    const selectedDoc = String(item.getAttribute('data-value') || '').trim();
    const selectedNome = String(item.getAttribute('data-nome') || '').trim();
    if (!selectedDoc) return;

    producerInput.value = selectedDoc;
    producerInput.dataset.selectedProducerId = selectedId;
    producerInput.dataset.selectedProducerDoc = selectedDoc;
    producerInput.dataset.skipProducerSearch = 'true';
    producerInput.dataset.confirmedValue = selectedDoc;

    state.formValues.producerDocument = selectedDoc;
    state.formValues.sellerId = selectedId;
    if (selectedNome) {
      state.formValues.sellerName = selectedNome;
      const sellerField = document.getElementById('sellerName');
      if (sellerField) {
        sellerField.value = selectedNome;
        sellerField.dataset.selectedSellerId = selectedId;
        sellerField.dataset.selectedSellerLabel = selectedNome;
      }
    }

    suggestions.classList.remove('is-visible');
    producerInput.dispatchEvent(new Event('input', { bubbles: true }));
    producerInput.dispatchEvent(new Event('change', { bubbles: true }));
  };

  suggestions.querySelectorAll('.input-suggestion').forEach((item) => {
    item.addEventListener('mousedown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      applySelection(item);
    });
    item.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      applySelection(item);
    });
  });
}

function updateSellerNameSuggestions(options = []) {
  const sellerInput = document.getElementById('sellerName');
  if (!(sellerInput instanceof HTMLInputElement)) return;
  const wrapper = sellerInput.closest('.input-wrapper');
  if (!wrapper) return;

  let suggestions = wrapper.querySelector('[data-suggestions]');
  if (!suggestions) {
    suggestions = document.createElement('div');
    suggestions.className = 'input-suggestions';
    suggestions.setAttribute('data-suggestions', '');
    wrapper.appendChild(suggestions);
  }

  const normalizedOptions = (Array.isArray(options) ? options : []).slice(0, 50);
  suggestions.innerHTML = normalizedOptions.map((item, index) => (
    `<div class="input-suggestion" data-id="${String(item.id || '')}" data-value="${String(item.value || '')}" data-doc="${String(item.documento || '')}" data-index="${index}">${String(item.label || '')}</div>`
  )).join('');

  if (!normalizedOptions.length) {
    suggestions.classList.remove('is-visible');
    return;
  }

  const applySelection = (item) => {
    const selectedId = String(item.getAttribute('data-id') || '').trim();
    const selectedNome = String(item.getAttribute('data-value') || '').trim();
    const selectedDoc = String(item.getAttribute('data-doc') || '').trim();
    if (!selectedNome) return;

    sellerInput.value = selectedNome;
    sellerInput.dataset.selectedSellerId = selectedId;
    sellerInput.dataset.selectedSellerLabel = selectedNome;
    sellerInput.dataset.skipSellerSearch = 'true';
    sellerInput.dataset.confirmedValue = selectedNome;

    state.formValues.sellerName = selectedNome;
    state.formValues.sellerId = selectedId;

    if (selectedDoc) {
      state.formValues.producerDocument = selectedDoc;
      const producerField = document.getElementById('producerDocument');
      if (producerField) {
        producerField.value = selectedDoc;
        producerField.dataset.selectedProducerId = selectedId;
        producerField.dataset.selectedProducerDoc = selectedDoc;
        producerField.dataset.skipProducerSearch = 'true';
      }
    }

    suggestions.classList.remove('is-visible');
    sellerInput.dispatchEvent(new Event('input', { bubbles: true }));
    sellerInput.dispatchEvent(new Event('change', { bubbles: true }));
  };

  suggestions.querySelectorAll('.input-suggestion').forEach((item) => {
    item.addEventListener('mousedown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      applySelection(item);
    });
    item.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      applySelection(item);
    });
  });
}

async function searchProdutoresPorDocumento(query = '') {
  const typed = String(query || '').trim();
  if (typed.length < 3) return [];
  if (!vendedorProdutorCategoriaIds.size) return [];

  const firstCategoriaId = Array.from(vendedorProdutorCategoriaIds)[0];
  const queryParams = {
    q: typed,
    search: typed,
    limit: 50,
  };
  if (firstCategoriaId) {
    queryParams['filter[categoria_id][eq]'] = firstCategoriaId;
  }
  const result = await apiRequest('/pessoas-empresas', { query: queryParams });
  let rows = parseApiResponse(result);
  if (vendedorProdutorCategoriaIds.size) {
    rows = rows.filter((item = {}) => vendedorProdutorCategoriaIds.has(String(item?.categoria_id || '')));
  }
  return producerDocOptionsFromRows(rows);
}

async function searchVendedoresProdutoresPorNome(query = '') {
  const typed = String(query || '').trim();
  if (typed.length < 3) return [];

  const firstCategoriaId = Array.from(vendedorProdutorCategoriaIds)[0];
  const result = await apiRequest('/pessoas-empresas', {
    query: {
      q: typed,
      limit: 50,
      categoria_id: firstCategoriaId || undefined,
    },
  });
  let rows = parseApiResponse(result);
  if (vendedorProdutorCategoriaIds.size) {
    rows = rows.filter((item = {}) => vendedorProdutorCategoriaIds.has(String(item?.categoria_id || '')));
  }
  return sellerNameOptionsFromRows(rows);
}

function bindProducerDocumentAutocompleteSearch() {
  const producerField = document.getElementById('producerDocument');
  if (!(producerField instanceof HTMLInputElement)) return;
  if (producerField.dataset.boundProducerSearch === 'true') return;
  producerField.dataset.boundProducerSearch = 'true';

  const triggerSearch = () => {
    if (producerField.dataset.skipProducerSearch === 'true') {
      delete producerField.dataset.skipProducerSearch;
      return;
    }
    if (producerDocSearchTimeoutId) window.clearTimeout(producerDocSearchTimeoutId);
    producerDocSearchTimeoutId = window.setTimeout(async () => {
      try {
        const typed = String(producerField.value || '').trim();
        if (typed.length < 3) {
          updateProducerDocumentSuggestions([]);
          return;
        }
        if (producerDocAutocompleteAbortController) producerDocAutocompleteAbortController.abort();
        producerDocAutocompleteAbortController = new AbortController();
        const options = await searchProdutoresPorDocumento(typed);
        updateProducerDocumentSuggestions(options);
        const wrapper = producerField.closest('.input-wrapper');
        const suggestions = wrapper?.querySelector('[data-suggestions]');
        if (Array.isArray(options) && options.length > 0) suggestions?.classList.add('is-visible');
        else suggestions?.classList.remove('is-visible');
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error('[controle-patio/nova-instrucao] falha ao buscar produtores por documento', error);
        }
      }
    }, 250);
  };

  producerField.addEventListener('focus', triggerSearch);
  producerField.addEventListener('input', (event) => { if (event.isTrusted) delete producerField.dataset.confirmedValue; triggerSearch(); });
  producerField.addEventListener('blur', () => {
    setTimeout(() => {
      if (producerField.dataset.confirmedValue === undefined || producerField.value !== producerField.dataset.confirmedValue) {
        producerField.value = '';
        state.formValues.producerDocument = '';
        delete producerField.dataset.selectedProducerId;
        delete producerField.dataset.selectedProducerDoc;
        delete producerField.dataset.confirmedValue;
        updateProducerDocumentSuggestions([]);
      }
    }, 200);
  });
}

function bindSellerNameAutocompleteSearch() {
  const sellerField = document.getElementById('sellerName');
  if (!(sellerField instanceof HTMLInputElement)) return;
  if (sellerField.dataset.boundSellerSearch === 'true') return;
  sellerField.dataset.boundSellerSearch = 'true';

  const triggerSearch = () => {
    if (sellerField.dataset.skipSellerSearch === 'true') {
      delete sellerField.dataset.skipSellerSearch;
      return;
    }
    if (sellerSearchTimeoutId) window.clearTimeout(sellerSearchTimeoutId);
    sellerSearchTimeoutId = window.setTimeout(async () => {
      try {
        const typed = String(sellerField.value || '').trim();
        if (typed.length < 3) {
          updateSellerNameSuggestions([]);
          return;
        }
        if (sellerAutocompleteAbortController) sellerAutocompleteAbortController.abort();
        sellerAutocompleteAbortController = new AbortController();
        const options = await searchVendedoresProdutoresPorNome(typed);
        updateSellerNameSuggestions(options);
        const wrapper = sellerField.closest('.input-wrapper');
        const suggestions = wrapper?.querySelector('[data-suggestions]');
        if (Array.isArray(options) && options.length > 0) suggestions?.classList.add('is-visible');
        else suggestions?.classList.remove('is-visible');
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error('[controle-patio/nova-instrucao] falha ao buscar vendedores/produtores por nome', error);
        }
      }
    }, 250);
  };

  sellerField.addEventListener('focus', triggerSearch);
  sellerField.addEventListener('input', (event) => { if (event.isTrusted) delete sellerField.dataset.confirmedValue; triggerSearch(); });
  sellerField.addEventListener('blur', () => {
    setTimeout(() => {
      if (sellerField.dataset.confirmedValue === undefined || sellerField.value !== sellerField.dataset.confirmedValue) {
        sellerField.value = '';
        state.formValues.sellerName = '';
        state.formValues.sellerId = '';
        delete sellerField.dataset.selectedSellerId;
        delete sellerField.dataset.selectedSellerLabel;
        delete sellerField.dataset.confirmedValue;
        updateSellerNameSuggestions([]);
      }
    }, 200);
  });
}

async function loadDynamicLookups() {
  const [categoriasSettled, pessoasSettled, filiaisSettled] = await Promise.allSettled([
    apiRequest('/categorias-pessoa-empresa', { query: { limit: 200 } }),
    apiRequest('/pessoas-empresas', { query: { limit: 500 } }),
    apiRequest('/lookups/filiais', { query: { limit: 200 } })
      .catch(() => apiRequest('/filiais', { query: { limit: 200 } })),
  ]);

  const categorias = categoriasSettled.status === 'fulfilled'
    ? parseApiResponse(categoriasSettled.value)
    : [];
  compradorCategoriaIds = new Set(
    categorias
      .filter((item = {}) => isCompradorCategoria(item))
      .map((item = {}) => String(item.id || ''))
      .filter(Boolean),
  );
  vendedorProdutorCategoriaIds = new Set(
    categorias
      .filter((item = {}) => isVendedorProdutorCategoria(item))
      .map((item = {}) => String(item.id || ''))
      .filter(Boolean),
  );
  transportadoraCategoriaIds = new Set(
    categorias
      .filter((item = {}) => isTransportadoraCategoria(item))
      .map((item = {}) => String(item.id || ''))
      .filter(Boolean),
  );

  const pessoas = pessoasSettled.status === 'fulfilled'
    ? parseApiResponse(pessoasSettled.value)
    : [];
  const compradorOptions = buyerOptionsFromRows(pessoas);
  const vendedorProdutorOptions = sellerNameOptionsFromRows(pessoas);
  const transportadoraOptions = carrierOptionsFromRows(pessoas);
  const produtorOptions = producerDocOptionsFromRows(pessoas);
  buyerOptionsCache = [...compradorOptions];
  sellerOptionsCache = vendedorProdutorOptions
    .map(({ id, nome }) => ({ id, value: nome, label: nome }))
    .filter((item) => item.id && item.value);
  producerDocOptionsCache = [...produtorOptions];

  contractFieldOptions.buyers.splice(0, contractFieldOptions.buyers.length, ...buyerOptionsCache);
  contractFieldOptions.sellers.splice(0, contractFieldOptions.sellers.length, ...sellerOptionsCache);
  if (transportadoraOptions.length) {
    contractFieldOptions.carriers.splice(0, contractFieldOptions.carriers.length, ...transportadoraOptions);
  }

  const filiaisBase = filiaisSettled.status === 'fulfilled'
    ? parseApiResponse(filiaisSettled.value)
    : [];
  const filiais = filiaisBase.map((item) => ({
    value: String(item.id),
    label: item?.nome || `Filial ${item.id}`,
  }));
  if (filiais.length) {
    contractFieldOptions.branches.splice(0, contractFieldOptions.branches.length, ...filiais);
    state.formValues.branch = filiais[0].value;
  }
}

async function resolvePessoaId(value, { onlyCompradores = false } = {}) {
  if (onlyCompradores && /^\\d+$/.test(String(state.formValues?.buyerId || ''))) {
    return Number(state.formValues.buyerId);
  }
  if (!onlyCompradores && /^\\d+$/.test(String(state.formValues?.sellerId || ''))) {
    return Number(state.formValues.sellerId);
  }
  if (!value) return null;
  if (/^\\d+$/.test(String(value))) return Number(value);
  const sourceOptions = onlyCompradores ? contractFieldOptions.buyers : [...contractFieldOptions.sellers, ...contractFieldOptions.buyers];
  const match = findOptionByText(sourceOptions, value);
  if (match?.id && /^\\d+$/.test(String(match.id))) return Number(match.id);
  if (match?.value && /^\\d+$/.test(String(match.value))) return Number(match.value);

  const result = await apiRequest('/pessoas-empresas', {
    query: {
      q: String(value),
      limit: 20,
      categoria_id: onlyCompradores ? Array.from(compradorCategoriaIds)[0] || undefined : undefined,
    },
  });
  let rows = parseApiResponse(result);
  if (onlyCompradores && compradorCategoriaIds.size) {
    rows = rows.filter((item = {}) => compradorCategoriaIds.has(String(item?.categoria_id || '')));
  }
  return rows[0]?.id ? Number(rows[0].id) : null;
}

function resolveFilialId() {
  const id = Number(sessionStorage.getItem('filialId'));
  return Number.isFinite(id) && id > 0 ? id : null;
}

function computeQuantidadeTotal() {
  if (!isPlumaProduct()) {
    return state.standardLogisticsItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  }
  return state.plumaCarriers.reduce(
    (sum, carrier) => sum + carrier.blocks.reduce((internal, block) => internal + Number(block.baleQuantity || 0), 0),
    0,
  );
}

async function persistInstruction() {
  readFormValues();

  if (!state.formValues.productType) throw new Error('Tipo de Produto é obrigatório. Selecione um tipo antes de salvar.');
  if (!state.formValues.branch) throw new Error('Unidade de Retirada (Filial) é obrigatória. Selecione uma filial antes de salvar.');

  const compradorId = await resolvePessoaId(state.formValues.buyer, { onlyCompradores: true });
  if (!compradorId) throw new Error('Comprador inválido. Selecione um comprador cadastrado.');

  const produtorId = await resolvePessoaId(state.formValues.sellerName);
  const filialId = resolveFilialId();
  if (!filialId || !Number.isFinite(filialId) || filialId <= 0) throw new Error('Filial inválida. Faça login novamente para continuar.');

  const quantidadeTotal = computeQuantidadeTotal();
  const instructionPayload = {
    numero_instrucao: state.formValues.instructionNumber || `INS-${Date.now()}`,
    data_emissao: state.formValues.issueDate || new Date().toISOString().slice(0, 10),
    prazo_final_carregamento: state.formValues.loadingDeadline || null,
    comprador_id: compradorId,
    numero_contrato: state.formValues.contractNumber || null,
    produtor_documento: state.formValues.producerDocument || null,
    produtor_id: produtorId,
    nome_vendedor_produtor: state.formValues.sellerName || null,
    tipo_produto: state.formValues.productType,
    filial_id: filialId,
    status: 'pendente',
    quantidade_total: quantidadeTotal,
    ativo: true,
  };

  // Verificar se já existe instrução ativa com o mesmo número (órfã de tentativa anterior)
  let instructionId;
  const existingRes = await apiRequest('/instrucoes', {
    query: { 'filter[numero_instrucao][eq]': instructionPayload.numero_instrucao, limit: 1 },
  }).catch(() => null);
  const orphanId = Number(existingRes?.data?.[0]?.id ?? 0);

  if (orphanId) {
    const [blocosRes, transportesRes] = await Promise.all([
      apiRequest('/instrucoes-blocos', { query: { 'filter[instrucao_id][eq]': orphanId, limit: 1 } }).catch(() => null),
      apiRequest('/instrucoes-transportes', { query: { 'filter[instrucao_id][eq]': orphanId, limit: 1 } }).catch(() => null),
    ]);
    const hasBlocos = (blocosRes?.data?.length ?? 0) > 0;
    const hasTransportes = (transportesRes?.data?.length ?? 0) > 0;
    if (hasBlocos || hasTransportes) {
      throw new Error(`Já existe uma instrução ativa com o número "${instructionPayload.numero_instrucao}". Use um número diferente.`);
    }
    // Instrução órfã sem blocos/transportes — atualizar e reutilizar
    await apiRequest(`/instrucoes/${orphanId}`, { method: 'PATCH', body: instructionPayload });
    instructionId = orphanId;
  } else {
    const created = await apiRequest('/instrucoes', { method: 'POST', body: instructionPayload });
    instructionId = Number(created?.data?.id);
    if (!instructionId) throw new Error('Falha ao criar instrução.');
  }

  try {
    if (!isPlumaProduct()) {
      const transportes = state.standardLogisticsItems.map((item, index) => ({
        instrucao_id: instructionId,
        nome_transportadora: item.carrierName,
        unidade: item.unit || 'quilogramas',
        quantidade: Number(item.quantity || 0),
        ordem: index + 1,
      }));
      if (transportes.length) {
        await apiRequest('/instrucoes-transportes/bulk-create', { method: 'POST', body: transportes });
      }
      return;
    }

    let blocoOrdem = 0;
    for (const carrier of state.plumaCarriers) {
      for (let index = 0; index < carrier.blocks.length; index += 1) {
        blocoOrdem += 1;
        const block = carrier.blocks[index];
        const blockPayload = {
          instrucao_id: instructionId,
          nome_transportadora: carrier.carrierName,
          nome_bloco: block.blockName,
          classificacao_bloco: block.classification,
          modo_inclusao: Array.isArray(block.detailCodes) && block.detailCodes.length ? 'bales' : 'quantity',
          quantidade_fardos: Number(block.baleQuantity || 0),
          ordem: blocoOrdem,
        };
        const createdBlock = await apiRequest('/instrucoes-blocos', { method: 'POST', body: blockPayload });
        const blockId = Number(createdBlock?.data?.id);
        const detailCodes = Array.isArray(block.detailCodes) ? block.detailCodes : [];
        if (blockId && detailCodes.length) {
          const fardos = detailCodes.map((code, idx) => ({
            instrucao_bloco_id: blockId,
            codigo_fardo: String(code),
            ordem: idx + 1,
          }));
          await apiRequest('/instrucoes-fardos/bulk-create', { method: 'POST', body: fardos });
        }
      }
    }
  } catch (err) {
    try {
      await apiRequest(`/instrucoes/${instructionId}`, { method: 'DELETE' });
    } catch (_) { /* ignora falha no rollback */ }
    throw err;
  }
}

function navigateToInstructions() {
  const target = '#/controle-patio/instrucoes';
  if (window.location.hash !== target) {
    window.location.hash = target;
    return;
  }
  window.dispatchEvent(new Event('hashchange'));
}

async function handleSaveInstruction() {
  if (isSavingInstruction) return;
  isSavingInstruction = true;
  try {
    await persistInstruction();
    navigateToInstructions();
  } catch (error) {
    console.error('[controle-patio/nova-instrucao] falha ao salvar instrução', error);
    const message = error?.message || 'Falha ao salvar instrução.';
    window.alert(message);
  } finally {
    isSavingInstruction = false;
  }
}
function handleInteraction(event) {
  const saveButtonByAction = event.target.closest('[data-action="salvar-instrucao"]');
  if (saveButtonByAction) {
    void handleSaveInstruction();
    return;
  }

  const plumaModeRadio = event.target.closest('input[name^="pluma-block-mode-"]');
  const plumaModeLabel = event.target.closest('.radio');
  const setPlumaClassificationButton = event.target.closest('[data-pluma-set-classification]');
  const togglePlumaBlockButton = event.target.closest('[data-pluma-block-toggle]');
  const editButton = event.target.closest('[data-edit-logistics]');
  const deleteButton = event.target.closest('[data-delete-logistics]');
  const addPlumaBlockButton = event.target.closest('[data-pluma-add-block]');
  const savePlumaBlockButton = event.target.closest('[data-pluma-save-block]');
  const cancelPlumaBlockButton = event.target.closest('[data-pluma-cancel-block]');
  const editPlumaCarrierButton = event.target.closest('[data-pluma-edit-carrier]');
  const deletePlumaCarrierButton = event.target.closest('[data-pluma-delete-carrier]');
  const togglePlumaCarrierButton = event.target.closest('[data-pluma-toggle-carrier]');
  const editPlumaRowButton = event.target.closest('[data-pluma-edit-row]');
  const deletePlumaRowButton = event.target.closest('[data-pluma-delete-row]');
  const togglePlumaRowButton = event.target.closest('[data-pluma-toggle-row]');
  const removePlumaBaleButton = event.target.closest('[data-pluma-remove-bale]');

  if (plumaModeRadio || plumaModeLabel) {
    const radioInput = plumaModeRadio || plumaModeLabel?.querySelector('input[name^="pluma-block-mode-"]');
    if (radioInput) {
      radioInput.checked = true;
      const blockId = String(radioInput.name || '').replace('pluma-block-mode-', '');
      const block = state.plumaBlocks.find((item) => item.id === blockId);
      if (!block) return;

      block.classification = 'Bloco Parcial';
      block.draftInclusionMode = radioInput.value;
      if (radioInput.value === 'bales') {
        block.draftBales = Array.isArray(block.draftBales) ? block.draftBales : [];
        block.draftQuantity = String(Array.isArray(block.draftBales) ? block.draftBales.length : 0);
      }

      renderPlumaBlocks();
      updateHydratedFields();
      return;
    }
  }

  if (setPlumaClassificationButton) {
    const [blockId, mode] = String(setPlumaClassificationButton.dataset.plumaSetClassification || '').split(':');
    const block = state.plumaBlocks.find((item) => item.id === blockId);
    if (!block) return;

    const isPartial = mode === 'partial';
    block.inclusionMode = 'quantity';
    block.draftInclusionMode = 'quantity';
    block.isOpen = true;
    if (!isPartial) {
      const currentQty = Number(block.draftQuantity || block.baleQuantity || 150) || 150;
      if (currentQty !== 150) {
        const standardize = window.confirm('A quantidade atual é diferente de 150. Deseja padronizar para 150 fardos?');
        if (standardize) {
          block.bales = [];
          block.draftBales = [];
          block.baleInputValue = '';
          block.draftQuantity = '150';
          block.baleQuantity = 150;
          block.classification = 'Bloco Completo';
        } else {
          block.classification = 'Bloco Parcial';
        }
      } else {
        block.bales = [];
        block.draftBales = [];
        block.baleInputValue = '';
        block.draftQuantity = '150';
        block.baleQuantity = 150;
        block.classification = 'Bloco Completo';
      }
    } else {
      block.classification = 'Bloco Parcial';
    }

    renderPlumaBlocks();
    updateHydratedFields();
    return;
  }

  if (togglePlumaBlockButton) {
    const block = state.plumaBlocks.find((item) => item.id === togglePlumaBlockButton.dataset.plumaBlockToggle);
    if (!block) return;
    block.isOpen = !block.isOpen;
    renderPlumaBlocks();
    updateHydratedFields();
    return;
  }

  if (removePlumaBaleButton) {
    const [blockId, baleValue] = removePlumaBaleButton.dataset.plumaRemoveBale.split(':');
    const block = state.plumaBlocks.find((item) => item.id === blockId);
    if (!block) return;
    block.draftBales = block.draftBales.filter((item) => item !== baleValue);
    block.draftQuantity = String(block.draftBales.length);
    renderPlumaBlocks();
    updateHydratedFields();
    return;
  }

  if (addPlumaBlockButton) {
    readFormValues();
    if (!state.formValues.blockInput.trim()) return;
    addPlumaBlocks(state.formValues.blockInput);
    state.formValues.blockInput = '';
    renderPlumaLogisticsFields();
    updateHydratedFields();
    return;
  }

  if (savePlumaBlockButton) {
    handleSavePlumaBlock(savePlumaBlockButton.dataset.plumaSaveBlock);
    return;
  }

  if (cancelPlumaBlockButton) {
    handleCancelPlumaBlock(cancelPlumaBlockButton.dataset.plumaCancelBlock);
    return;
  }

  if (deleteButton) {
    const shouldDelete = window.confirm('Confirma a exclusão deste item logístico?');
    if (!shouldDelete) return;
    state.standardLogisticsItems = state.standardLogisticsItems.filter((item) => item.id !== deleteButton.dataset.deleteLogistics);
    renderStandardLogisticsList();
    return;
  }

  if (editButton) {
    openStandardEditModal({ itemId: editButton.dataset.editLogistics, anchorEl: editButton, mode: 'standard-logistics' });
    return;
  }

  if (togglePlumaCarrierButton) {
    const carrier = state.plumaCarriers.find((item) => item.id === togglePlumaCarrierButton.dataset.plumaToggleCarrier);
    if (!carrier) return;
    carrier.isExpanded = !carrier.isExpanded;
    renderPlumaCarriers();
    return;
  }

  if (deletePlumaCarrierButton) {
    const shouldDelete = window.confirm('Confirma a exclusão desta transportadora?');
    if (!shouldDelete) return;
    state.plumaCarriers = state.plumaCarriers.filter((item) => item.id !== deletePlumaCarrierButton.dataset.plumaDeleteCarrier);
    renderPlumaCarriers();
    return;
  }

  if (editPlumaCarrierButton) {
    openStandardEditModal({ itemId: editPlumaCarrierButton.dataset.plumaEditCarrier, anchorEl: editPlumaCarrierButton, mode: 'pluma-carrier' });
    return;
  }

  const transferButton = event.target.closest('[data-pluma-transfer-to-carrier]');
  if (transferButton) {
    handleTransferBlocksToCarrier();
    return;
  }

  if (togglePlumaRowButton) {
    const [carrierId, blockId] = togglePlumaRowButton.dataset.plumaToggleRow.split(':');
    const carrier = state.plumaCarriers.find((item) => item.id === carrierId);
    const block = carrier?.blocks.find((item) => item.id === blockId);
    if (!block) return;
    block.isExpanded = !block.isExpanded;
    renderPlumaCarriers();
    return;
  }

  if (deletePlumaRowButton) {
    const shouldDelete = window.confirm('Confirma a exclusão deste bloco?');
    if (!shouldDelete) return;
    const [carrierId, blockId] = deletePlumaRowButton.dataset.plumaDeleteRow.split(':');
    const carrier = state.plumaCarriers.find((item) => item.id === carrierId);
    if (!carrier) return;
    carrier.blocks = carrier.blocks.filter((item) => item.id !== blockId);
    carrier.totalBales = carrier.blocks.reduce((sum, item) => sum + Number(item.baleQuantity || 0), 0);
    renderPlumaCarriers();
    return;
  }

  if (editPlumaRowButton) {
    const [carrierId, blockId] = editPlumaRowButton.dataset.plumaEditRow.split(':');
    openPlumaEditModal({ carrierId, blockId, anchorEl: editPlumaRowButton });
    return;
  }

  const pageButton = event.target.closest('.btn');
  if (!pageButton) return;

  const action = pageButton.getAttribute('data-action');
  const label = pageButton.textContent.trim();
  if (action === 'cancelar-instrucao' || label === 'Cancelar') {
    window.history.back();
    return;
  }

  if (action === 'salvar-instrucao' || label === 'Salvar Instruo') {
    void handleSaveInstruction();
    return;
  }

  if (
    action === 'adicionar-item-logistica'
    || action === 'atualizar-item-logistica'
    || label === 'Adicionar  Lista'
    || label === 'Atualizar Item'
  ) {
    handleAddStandardLogistics();
  }
}

export function init() {
  if (activeController) activeController.abort();
  activeController = new AbortController();

  // Reset module-level caches and flags
  buyerOptionsCache = [];
  sellerOptionsCache = [];
  producerDocOptionsCache = [];
  isSavingInstruction = false;
  standardEditModalState = null;
  plumaEditModalState = null;

  state.formValues = { ...initialFormValues };
  state.standardLogisticsItems = initialStandardLogisticsItems.map((item) => ({ ...item }));
  state.editingLogisticsId = null;
  state.plumaBlocks = initialPlumaBlocks.map((block) => ({
    ...block,
    bales: [...(block.bales || [])],
    draftBales: [...(block.draftBales || block.bales || [])],
    baleInputValue: block.baleInputValue || '',
  }));
  state.plumaCarriers = initialPlumaCarriers.map((carrier) => ({
    ...carrier,
    blocks: carrier.blocks.map((block) => ({ ...block, detailCodes: [...(block.detailCodes || [])] })),
  }));

  renderHeaderActions();
  renderContractFields();
  renderLogisticsSection();
  renderUpload();

  loadDynamicLookups()
    .then(() => {
      renderContractFields();
      updateHydratedFields();
    })
    .catch((error) => {
      console.error('[controle-patio/nova-instrucao] falha ao carregar lookups', error);
    });

  updateHydratedFields();
  FileUpload.init(document, {
    acceptedFormats: ['application/pdf', 'image/jpeg', 'image/png'],
    maxSize: 5 * 1024 * 1024,
  });

  document.addEventListener('click', handleInteraction);

  return () => {
    if (buyerSearchTimeoutId) {
      window.clearTimeout(buyerSearchTimeoutId);
      buyerSearchTimeoutId = null;
    }
    if (buyerAutocompleteAbortController) {
      buyerAutocompleteAbortController.abort();
      buyerAutocompleteAbortController = null;
    }
    if (producerDocSearchTimeoutId) {
      window.clearTimeout(producerDocSearchTimeoutId);
      producerDocSearchTimeoutId = null;
    }
    if (producerDocAutocompleteAbortController) {
      producerDocAutocompleteAbortController.abort();
      producerDocAutocompleteAbortController = null;
    }
    if (sellerSearchTimeoutId) {
      window.clearTimeout(sellerSearchTimeoutId);
      sellerSearchTimeoutId = null;
    }
    if (sellerAutocompleteAbortController) {
      sellerAutocompleteAbortController.abort();
      sellerAutocompleteAbortController = null;
    }
    if (carrierSearchTimeoutId) {
      window.clearTimeout(carrierSearchTimeoutId);
      carrierSearchTimeoutId = null;
    }
    if (carrierAutocompleteAbortController) {
      carrierAutocompleteAbortController.abort();
      carrierAutocompleteAbortController = null;
    }
    cleanupInput?.();
    closePlumaEditModal({ restoreFocus: false });
    if (activeController) {
      activeController.abort();
      activeController = null;
    }
    document.removeEventListener('click', handleInteraction);
  };
}
