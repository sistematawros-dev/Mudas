import * as Modal from '../../../components/modal/modal.js';
import * as Input from '../../../components/input/input.js';
import * as Button from '../../../components/button/button.js';
import * as Checkbox from '../../../components/checkbox/checkbox.js';
import * as Table from '../../../components/table/table.js';
import { icon } from '../../../components/icons/icons.js';
import './vincular-pedido-modal.css';

const LINK_ORDER_MODAL_ID = 'kanban-link-order-modal';
const PLANNING_MODAL_ID = 'kanban-planning-modal';

const LINK_ORDER_ITEMS = [
  { id: 'item-1', product: 'Muda de Eucalipto', code: 'MUD-001', quantity: '5.000', unitValue: 'R$ 2,50', totalValue: 'R$ 12.500,00', available: '1000' },
  { id: 'item-2', product: 'Muda de Eucalipto', code: 'MUD-001', quantity: '5.000', unitValue: 'R$ 2,50', totalValue: 'R$ 12.500,00', available: '1000' },
  { id: 'item-3', product: 'Muda de Eucalipto', code: 'MUD-001', quantity: '5.000', unitValue: 'R$ 2,50', totalValue: 'R$ 12.500,00', available: '1000' },
];

let linkOrderCleanup = () => {};
let linkOrderReturnFocus = null;

function createLinkOrderTable(selectedIds = new Set()) {
  const columns = [
    { key: 'check', label: '' },
    { key: 'product', label: 'Produto' },
    { key: 'quantity', label: 'Qtd. Pedido' },
    { key: 'unitValue', label: 'Valor Unitário' },
    { key: 'totalValue', label: 'Valor Total' },
    { key: 'available', label: 'Qtd. Disponível' },
  ];

  const data = LINK_ORDER_ITEMS.map((item, index) => {
    const checked = selectedIds.has(item.id) || (!selectedIds.size && index === 0);
    return {
      check: Checkbox.create({
        id: `link-order-checkbox-${item.id}`,
        value: item.id,
        checked,
        className: 'link-order-modal__checkbox',
      }).replace('class="checkbox-input"', 'class="checkbox-input" data-link-order-item'),
      product: `
        <div class="link-order-modal__product">
          <span>${item.product}</span>
          <small>${item.code}</small>
        </div>
      `,
      quantity: item.quantity,
      unitValue: item.unitValue,
      totalValue: item.totalValue,
      available: item.available,
    };
  });

  return Table.createSimple({
    id: 'link-order-items-table',
    columns,
    data,
    variant: 'compact',
    className: 'link-order-modal__table-component',
  });
}

function createLinkOrderModal({ selectedIds = new Set() } = {}) {
  return Modal.create({
    id: LINK_ORDER_MODAL_ID,
    title: 'Vincular Pedido',
    size: 'md',
    className: 'link-order-modal',
    body: `
      <div class="link-order-modal__content">
        ${Input.create({
          id: 'link-order-search',
          label: 'Vincular pedido',
          required: true,
          placeholder: 'Buscar por código, nome do pedido',
          iconRight: icon('search', { size: 14 }),
        })}

        <section class="link-order-modal__info-card">
          <h3 class="link-order-modal__section-title">${icon('file', { size: 12 })}Informações do Pedido</h3>
          <div class="link-order-modal__info-grid">
            <div><span>Código do Pedido</span><strong>001</strong></div>
            <div><span>Código ERP</span><strong>43242343</strong></div>
            <div><span>CPF/CNPJ</span><strong>123.456.789-00</strong></div>
            <div><span>Razão Social/Nome</span><strong>Nome da razao social</strong></div>
            <div><span>Nome Fantasia/Apelido</span><strong>Nome fantasia</strong></div>
            <div><span>Nome do Vendedor</span><strong>Nome do Vendedor</strong></div>
          </div>
        </section>

        <div class="link-order-modal__table-wrap" data-link-order-table-host>
          ${createLinkOrderTable(selectedIds)}
        </div>
      </div>
    `,
    footer: `
      <div class="link-order-modal__footer">
        ${Button.create({ text: 'Desvincular pedido', style: 'outline', variant: 'error', size: 'sm' }).replace('<button ', '<button data-link-order-action="unlink" ')}
        <div class="link-order-modal__footer-right">
          ${Button.create({ text: 'Voltar', style: 'outline', variant: 'dark', size: 'sm' }).replace('<button ', '<button data-link-order-action="back" ')}
          ${Button.create({ text: 'Salvar', variant: 'primary', size: 'sm' }).replace('<button ', '<button data-link-order-action="save" ')}
        </div>
      </div>
    `,
  });
}

export function closeLinkOrderModal({ restoreFocus = true } = {}) {
  const modalElement = document.querySelector(`[data-modal="${LINK_ORDER_MODAL_ID}"]`);
  const backdropElement = document.querySelector(`[data-modal-backdrop="${LINK_ORDER_MODAL_ID}"]`);
  if (!modalElement || !backdropElement) return;

  linkOrderCleanup();
  Modal.close(LINK_ORDER_MODAL_ID);

  if (document.querySelector(`[data-modal="${PLANNING_MODAL_ID}"]`)?.classList.contains('is-visible')) {
    document.body.style.overflow = 'hidden';
  }

  modalElement.remove();
  backdropElement.remove();

  if (restoreFocus && linkOrderReturnFocus?.focus) {
    linkOrderReturnFocus.focus();
  }
  linkOrderReturnFocus = null;
}

export function openLinkOrderModal(options = {}) {
  const {
    anchorEl = null,
    selectedIds = [],
    onBack = null,
    onSave = null,
  } = options;

  closeLinkOrderModal({ restoreFocus: false });

  const selectedSet = new Set(Array.isArray(selectedIds) ? selectedIds : []);
  linkOrderReturnFocus = anchorEl;

  document.body.insertAdjacentHTML('beforeend', createLinkOrderModal({ selectedIds: selectedSet }));

  const modalElement = document.querySelector(`[data-modal="${LINK_ORDER_MODAL_ID}"]`);
  const backdropElement = document.querySelector(`[data-modal-backdrop="${LINK_ORDER_MODAL_ID}"]`);
  if (!modalElement || !backdropElement) return;

  const cleanupInput = Input.init(modalElement);
  const cleanupCheckbox = Checkbox.init(modalElement);
  const closeButton = modalElement.querySelector('[data-modal-close]');
  const tableHost = modalElement.querySelector('[data-link-order-table-host]');
  const unlinkButton = modalElement.querySelector('[data-link-order-action="unlink"]');
  const backButton = modalElement.querySelector('[data-link-order-action="back"]');
  const saveButton = modalElement.querySelector('[data-link-order-action="save"]');
  const searchInput = modalElement.querySelector('#link-order-search');

  const getSelected = () => {
    const checkboxes = tableHost?.querySelectorAll('[data-link-order-item]') || [];
    return Array.from(checkboxes)
      .filter((input) => input.checked)
      .map((input) => input.value);
  };

  const handleClose = () => closeLinkOrderModal();
  const handleBackdrop = (event) => {
    if (event.target !== backdropElement) return;
    closeLinkOrderModal();
  };
  const handleKeydown = (event) => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    closeLinkOrderModal();
  };
  const handleUnlink = () => {
    const checkboxes = tableHost?.querySelectorAll('[data-link-order-item]') || [];
    checkboxes.forEach((input) => {
      input.checked = false;
      input.indeterminate = false;
    });
  };
  const handleBack = () => {
    closeLinkOrderModal({ restoreFocus: false });
    if (typeof onBack === 'function') onBack();
  };
  const handleSave = () => {
    const selected = getSelected();
    if (typeof onSave === 'function') onSave(selected);
    closeLinkOrderModal({ restoreFocus: false });
    if (anchorEl?.focus) anchorEl.focus();
  };

  closeButton?.addEventListener('click', handleClose);
  unlinkButton?.addEventListener('click', handleUnlink);
  backButton?.addEventListener('click', handleBack);
  saveButton?.addEventListener('click', handleSave);
  backdropElement.addEventListener('click', handleBackdrop);
  document.addEventListener('keydown', handleKeydown, true);

  linkOrderCleanup = () => {
    closeButton?.removeEventListener('click', handleClose);
    unlinkButton?.removeEventListener('click', handleUnlink);
    backButton?.removeEventListener('click', handleBack);
    saveButton?.removeEventListener('click', handleSave);
    backdropElement.removeEventListener('click', handleBackdrop);
    document.removeEventListener('keydown', handleKeydown, true);
    if (typeof cleanupInput === 'function') cleanupInput();
    if (typeof cleanupCheckbox === 'function') cleanupCheckbox();
    linkOrderCleanup = () => {};
  };

  Modal.open(LINK_ORDER_MODAL_ID);
  setTimeout(() => {
    searchInput?.focus?.();
  }, 120);
}

export default {
  openLinkOrderModal,
  closeLinkOrderModal,
};
