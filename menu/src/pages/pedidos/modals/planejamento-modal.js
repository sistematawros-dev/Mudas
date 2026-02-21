import * as Modal from '../../../components/modal/modal.js';
import * as Input from '../../../components/input/input.js';
import * as Button from '../../../components/button/button.js';
import * as Toast from '../../../components/toast/toast.js';
import * as Table from '../../../components/table/table.js';
import { icon } from '../../../components/icons/icons.js';
import { openLinkOrderModal, closeLinkOrderModal } from './vincular-pedido-modal.js';
import './planejamento-modal.css';

const PLANNING_MODAL_ID = 'kanban-planning-modal';
const LINK_ORDER_MODAL_ID = 'kanban-link-order-modal';

const SERVICE_TYPE_OPTIONS = [
  { value: 'estoque-venda-direta', label: 'Estoque (Venda Direta)' },
  { value: 'remessa-futura', label: 'Remessa Futura' },
  { value: 'vincular-op', label: 'Vincular Ordem de Produção' },
];

const QUANTITY_OPTIONS = [
  { value: '5000', label: '5000' },
  { value: '3000', label: '3000' },
  { value: '1000', label: '1000' },
];

const LOCATION_OPTIONS = [
  { value: 'estufa-1', label: 'Estufa 1' },
  { value: 'estufa-2', label: 'Estufa 2' },
  { value: 'estufa-3', label: 'Estufa 3' },
];

const LOT_OPTIONS = [
  { value: '0001', label: '0001' },
  { value: '0002', label: '0002' },
  { value: '0003', label: '0003' },
];

let planningCleanup = () => {};
let planningReturnFocus = null;

function createPlanningTable(rows = [], type = 'estoque-venda-direta') {
  const isFuture = type === 'remessa-futura';
  const columns = isFuture
    ? [
      { key: 'plannedDate', label: 'Data planejada' },
      { key: 'location', label: 'Localização' },
      { key: 'responsible', label: 'Responsável' },
      { key: 'quantity', label: 'Quantidade' },
      { key: 'actions', label: 'Ações' },
    ]
    : [
      { key: 'op', label: 'OP' },
      { key: 'seedDate', label: 'Data Semeio' },
      { key: 'daysAfterSowing', label: 'Dias após Semeio' },
      { key: 'quantity', label: 'Quantidade' },
      { key: 'actions', label: 'Ações' },
    ];

  const data = rows.map((row, index) => ({
    ...(isFuture
      ? {
        plannedDate: row.plannedDate,
        location: row.location,
        responsible: row.responsible,
        quantity: row.quantity,
      }
      : {
        op: row.op,
        seedDate: row.seedDate,
        daysAfterSowing: row.daysAfterSowing,
        quantity: row.quantity,
      }),
    actions: `
      <div class="planning-modal__actions">
        <button type="button" class="planning-modal__icon-btn" data-planning-row-action="edit" data-row-index="${index}" aria-label="Editar">${icon('edit', { size: 14 })}</button>
        <button type="button" class="planning-modal__icon-btn planning-modal__icon-btn--danger" data-planning-row-action="delete" data-row-index="${index}" aria-label="Excluir">${icon('trash', { size: 14 })}</button>
        <button type="button" class="planning-modal__icon-btn" data-planning-row-action="view" data-row-index="${index}" aria-label="Visualizar">${icon('eye', { size: 14 })}</button>
      </div>
    `,
  }));

  return Table.createSimple({
    id: 'planning-items-table',
    columns,
    data,
    variant: 'compact',
    className: 'planning-modal__table-component',
  });
}

function renderPlanningContent(type = 'estoque-venda-direta', state = {}) {
  const isFuture = type === 'remessa-futura';

  if (!isFuture) {
    return `
      <div class="planning-modal__link-row">
        <button type="button" class="btn btn--outline-dark btn--sm" data-planning-action="link-order">
          <span class="btn-icon">${icon('file', { size: 14 })}</span>
          Vincular Pedido
        </button>
        <span class="planning-modal__linked-feedback" data-planning-linked-feedback hidden></span>
      </div>

      <section class="planning-modal__add-block">
        <div class="planning-modal__add-grid">
          ${Input.createSelect({
            id: 'planning-quantity',
            label: 'Quantidade',
            placeholder: 'Selecione',
            value: state.draftQuantity || '',
            items: QUANTITY_OPTIONS,
          })}
          ${Input.createSelect({
            id: 'planning-lot',
            label: 'Lote',
            placeholder: 'Selecione',
            value: state.draftLot || '',
            items: LOT_OPTIONS,
          })}
        </div>
        ${Button.create({ text: 'Adicionar', style: 'outline', variant: 'dark', size: 'sm', iconLeft: 'plus' }).replace('<button ', '<button data-planning-action="add-row" ')}
      </section>

      <div class="planning-modal__table-wrap" data-planning-table-host>
        ${createPlanningTable(state.rows || [], type)}
      </div>
    `;
  }

  return `
    <section class="planning-modal__future-block">
      <div class="planning-modal__future-grid planning-modal__future-grid--2">
        ${Input.createSelect({
          id: 'planning-future-location',
          label: 'Localização',
          placeholder: 'Selecione',
          value: state.futureDraftLocation || '',
          items: LOCATION_OPTIONS,
        })}
        ${Input.create({
          id: 'planning-future-responsible',
          label: 'Responsável',
          placeholder: 'Digite o responsável',
          value: state.futureDraftResponsible || '',
        })}
      </div>

      <div class="planning-modal__future-grid planning-modal__future-grid--3">
        ${Input.createSelect({
          id: 'planning-future-quantity',
          label: 'Quantidade',
          placeholder: 'Selecione',
          value: state.futureDraftQuantity || '',
          items: QUANTITY_OPTIONS,
        })}
        ${Input.create({
          id: 'planning-future-date',
          type: 'date',
          label: 'Data planejada para semeio',
          required: true,
          value: state.futureDraftDate || '',
          className: 'planning-modal__date-field',
          iconRight: icon('calendar', { size: 16 }),
        })}
        <div class="planning-modal__agenda-wrap">
          <label class="planning-modal__agenda-label">&nbsp;</label>
          ${Button.create({ text: 'Consultar agenda', style: 'outline', variant: 'dark', size: 'sm', iconLeft: 'plus' }).replace('<button ', '<button data-planning-action="check-agenda" ')}
        </div>
      </div>

      ${Button.create({ text: 'Adicionar', style: 'outline', variant: 'dark', size: 'sm', iconLeft: 'plus' }).replace('<button ', '<button data-planning-action="add-row" ')}
    </section>

    <div class="planning-modal__table-wrap" data-planning-table-host>
      ${createPlanningTable(state.futureRows || [], type)}
    </div>
  `;
}

function createPlanningModal({ orderItem = {}, rows = [] } = {}) {
  const {
    product = 'Muda de Eucalipto Clone - MUD-001',
    totalPedido = '5000',
    available = '5000',
  } = orderItem;

  return Modal.create({
    id: PLANNING_MODAL_ID,
    title: 'Planejamento',
    size: 'lg',
    className: 'planning-modal',
    body: `
      <div class="planning-modal__content">
        <section class="planning-modal__summary">
          <div><span>Produto</span><strong>${product}</strong></div>
          <div><span>Total Pedido</span><strong>${totalPedido}</strong></div>
          <div><span>Disponível</span><strong class="planning-modal__available">${available}</strong></div>
        </section>

        ${Input.createSelect({
          id: 'planning-service-type',
          label: 'Tipo de Atendimento',
          placeholder: 'Selecione',
          value: 'estoque-venda-direta',
          items: SERVICE_TYPE_OPTIONS,
        })}

        <div data-planning-dynamic-content>
          ${renderPlanningContent('estoque-venda-direta', { rows })}
        </div>
      </div>
    `,
    footer: `
      <div class="planning-modal__footer">
        ${Button.create({ text: 'Cancelar', style: 'outline', variant: 'dark', size: 'sm' }).replace('<button ', '<button data-planning-action="cancel" ')}
        ${Button.create({ text: 'Enviar para Expedição', variant: 'primary', size: 'sm' }).replace('<button ', '<button data-planning-action="submit" ')}
      </div>
    `,
  });
}

export function closePlanningModal({ restoreFocus = true } = {}) {
  closeLinkOrderModal({ restoreFocus: false });

  const modalElement = document.querySelector(`[data-modal="${PLANNING_MODAL_ID}"]`);
  const backdropElement = document.querySelector(`[data-modal-backdrop="${PLANNING_MODAL_ID}"]`);
  if (!modalElement || !backdropElement) return;

  planningCleanup();
  Modal.close(PLANNING_MODAL_ID);

  const hasDrawerOpen = Boolean(document.querySelector('[data-drawer].is-open'));
  if (hasDrawerOpen) {
    document.body.style.overflow = 'hidden';
  }

  modalElement.remove();
  backdropElement.remove();

  if (restoreFocus && planningReturnFocus?.focus) {
    planningReturnFocus.focus();
  }
  planningReturnFocus = null;
}

export function openPlanningModal(options = {}) {
  const {
    anchorEl = null,
    orderItem = {},
  } = options;

  closePlanningModal({ restoreFocus: false });
  planningReturnFocus = anchorEl;

  const state = {
    serviceType: 'estoque-venda-direta',
    linkedItems: [],
    draftQuantity: '',
    draftLot: '',
    rows: [
      { op: '0001', seedDate: '00/00/0000', daysAfterSowing: '30 dias', quantity: '5.000' },
      { op: '0001', seedDate: '00/00/0000', daysAfterSowing: '30 dias', quantity: '5.000' },
    ],
    futureDraftLocation: '',
    futureDraftResponsible: '',
    futureDraftQuantity: '',
    futureDraftDate: '',
    futureRows: [
      { plannedDate: '00/00/0000', location: 'André Santos', responsible: 'André Santos', quantity: '5.000' },
      { plannedDate: '00/00/0000', location: 'André Santos', responsible: 'André Santos', quantity: '5.000' },
    ],
  };

  document.body.insertAdjacentHTML('beforeend', createPlanningModal({ orderItem, rows: state.rows }));

  const modalElement = document.querySelector(`[data-modal="${PLANNING_MODAL_ID}"]`);
  const backdropElement = document.querySelector(`[data-modal-backdrop="${PLANNING_MODAL_ID}"]`);
  if (!modalElement || !backdropElement) return;

  const serviceTypeSelect = modalElement.querySelector('#planning-service-type');
  let dynamicInputCleanup = () => {};
  const closeButton = modalElement.querySelector('[data-modal-close]');
  const cancelButton = modalElement.querySelector('[data-planning-action="cancel"]');
  const submitButton = modalElement.querySelector('[data-planning-action="submit"]');
  const dynamicContainer = modalElement.querySelector('[data-planning-dynamic-content]');

  const setCancelButtonStyle = () => {
    if (!cancelButton) return;
    cancelButton.className = state.serviceType === 'remessa-futura'
      ? 'btn btn--text-primary btn--sm'
      : 'btn btn--outline-dark btn--sm';
  };

  const renderLinkedFeedback = () => {
    const linkedFeedback = modalElement.querySelector('[data-planning-linked-feedback]');
    if (!linkedFeedback || state.serviceType !== 'estoque-venda-direta') return;
    const count = state.linkedItems.length;
    linkedFeedback.hidden = count === 0;
    linkedFeedback.textContent = count ? `Pedido vinculado: ${count} item(ns) selecionado(s).` : '';
  };

  const renderPlanningDynamicContent = () => {
    if (!dynamicContainer) return;
    dynamicInputCleanup();
    dynamicContainer.innerHTML = renderPlanningContent(state.serviceType, state);
    dynamicInputCleanup = Input.init(dynamicContainer) || (() => {});
    renderLinkedFeedback();
    setCancelButtonStyle();
  };

  const handleClose = () => closePlanningModal();
  const handleBackdrop = (event) => {
    if (event.target !== backdropElement) return;
    closePlanningModal();
  };
  const handleKeydown = (event) => {
    if (event.key !== 'Escape') return;
    if (document.querySelector(`[data-modal="${LINK_ORDER_MODAL_ID}"]`)?.classList.contains('is-visible')) return;
    event.preventDefault();
    event.stopPropagation();
    closePlanningModal();
  };
  const handleRowsClick = (event) => {
    const actionButton = event.target.closest('[data-planning-row-action]');
    if (!actionButton) return;
    const action = actionButton.dataset.planningRowAction;
    const rowIndex = Number(actionButton.dataset.rowIndex);
    if (action === 'delete' && !Number.isNaN(rowIndex)) {
      if (state.serviceType === 'remessa-futura') {
        state.futureRows = state.futureRows.filter((_, index) => index !== rowIndex);
      } else {
        state.rows = state.rows.filter((_, index) => index !== rowIndex);
      }
      renderPlanningDynamicContent();
      return;
    }
    console.log(`Ação ${action} na linha`, rowIndex);
  };
  const handleOpenLinkOrder = (linkButton) => {
    openLinkOrderModal({
      anchorEl: linkButton,
      selectedIds: state.linkedItems,
      onBack: () => {
        if (linkButton?.focus) linkButton.focus();
      },
      onSave: (selected) => {
        state.linkedItems = Array.isArray(selected) ? selected : [];
        renderLinkedFeedback();
      },
    });
  };
  const handleAddRow = () => {
    if (state.serviceType === 'remessa-futura') {
      const quantitySelect = modalElement.querySelector('#planning-future-quantity');
      const locationSelect = modalElement.querySelector('#planning-future-location');
      const responsibleInput = modalElement.querySelector('#planning-future-responsible');
      const dateInput = modalElement.querySelector('#planning-future-date');

      state.futureDraftQuantity = quantitySelect?.value || state.futureDraftQuantity;
      state.futureDraftLocation = locationSelect?.value || state.futureDraftLocation;
      state.futureDraftResponsible = responsibleInput?.value || state.futureDraftResponsible;
      state.futureDraftDate = dateInput?.value || state.futureDraftDate;

      state.futureRows.push({
        plannedDate: state.futureDraftDate || '00/00/0000',
        location: state.futureDraftLocation ? (LOCATION_OPTIONS.find((opt) => opt.value === state.futureDraftLocation)?.label || state.futureDraftLocation) : 'André Santos',
        responsible: state.futureDraftResponsible || 'André Santos',
        quantity: state.futureDraftQuantity || '5.000',
      });
      renderPlanningDynamicContent();
      return;
    }

    const quantityValue = modalElement.querySelector('#planning-quantity')?.value || '5000';
    const lotValue = modalElement.querySelector('#planning-lot')?.value || '0001';
    state.draftQuantity = quantityValue;
    state.draftLot = lotValue;
    state.rows.push({
      op: lotValue,
      seedDate: '00/00/0000',
      daysAfterSowing: '30 dias',
      quantity: quantityValue,
    });
    renderPlanningDynamicContent();
  };
  const handleConsultAgenda = () => {
    console.log('Consultar agenda (stub)');
  };
  const handleSubmit = () => {
    Toast.success('Planejamento enviado', {
      message: 'Itens enviados para expedição.',
    });
    closePlanningModal();
  };

  const bindPlanningEvents = (rootEl) => {
    if (!rootEl) return () => {};

    const handleChange = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      if (target.id === 'planning-service-type') {
        const value = target.value || 'estoque-venda-direta';
        state.serviceType = value;
        renderPlanningDynamicContent();
        return;
      }

      if (target.id === 'planning-quantity') state.draftQuantity = target.value;
      if (target.id === 'planning-lot') state.draftLot = target.value;
      if (target.id === 'planning-future-location') state.futureDraftLocation = target.value;
      if (target.id === 'planning-future-quantity') state.futureDraftQuantity = target.value;
      if (target.id === 'planning-future-date') state.futureDraftDate = target.value;
      if (target.id === 'planning-future-responsible' && target instanceof HTMLInputElement) {
        state.futureDraftResponsible = target.value;
      }
    };

    const handleClick = (event) => {
      const actionButton = event.target.closest('[data-planning-action]');
      if (actionButton) {
        const action = actionButton.dataset.planningAction;
        if (action === 'cancel') {
          handleClose();
          return;
        }
        if (action === 'submit') {
          handleSubmit();
          return;
        }
        if (action === 'add-row') {
          handleAddRow();
          return;
        }
        if (action === 'link-order') {
          handleOpenLinkOrder(actionButton);
          return;
        }
        if (action === 'check-agenda') {
          handleConsultAgenda();
          return;
        }
      }

      handleRowsClick(event);
    };

    const handleInput = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      if (target.id === 'planning-future-responsible') {
        state.futureDraftResponsible = target.value;
      }
    };

    rootEl.addEventListener('change', handleChange);
    rootEl.addEventListener('click', handleClick);
    rootEl.addEventListener('input', handleInput);

    return () => {
      rootEl.removeEventListener('change', handleChange);
      rootEl.removeEventListener('click', handleClick);
      rootEl.removeEventListener('input', handleInput);
    };
  };

  const unbindPlanningEvents = bindPlanningEvents(modalElement);
  closeButton?.addEventListener('click', handleClose);
  backdropElement.addEventListener('click', handleBackdrop);
  document.addEventListener('keydown', handleKeydown, true);
  renderPlanningDynamicContent();
  if (serviceTypeSelect) {
    serviceTypeSelect.value = state.serviceType;
  }
  setCancelButtonStyle();

  planningCleanup = () => {
    unbindPlanningEvents();
    closeButton?.removeEventListener('click', handleClose);
    backdropElement.removeEventListener('click', handleBackdrop);
    document.removeEventListener('keydown', handleKeydown, true);
    dynamicInputCleanup();
    planningCleanup = () => {};
  };

  Modal.open(PLANNING_MODAL_ID);
  setTimeout(() => {
    serviceTypeSelect?.focus?.();
  }, 120);
}

export default {
  openPlanningModal,
  closePlanningModal,
};
