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
const PLANNING_AGENDA_MODAL_ID = 'kanban-planning-agenda-modal';
const PLANNING_REAGENDA_MODAL_ID = 'kanban-planning-reagenda-modal';

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
  { value: 'estufa-1', label: 'Sala de Semeio 1' },
  { value: 'estufa-2', label: 'Sala de Semeio 2' },
  { value: 'estufa-3', label: 'Sala de Semeio 3' },
];

const LOT_OPTIONS = [
  { value: '0001', label: '0001' },
  { value: '0002', label: '0002' },
  { value: '0003', label: '0003' },
];

function parseQuantityValue(value) {
  if (value === null || value === undefined) return 0;
  const digits = String(value).replace(/[^\d]/g, '');
  if (!digits) return 0;
  return Number.parseInt(digits, 10) || 0;
}

function formatQuantityValue(value) {
  const numericValue = Number.isFinite(value) ? value : parseQuantityValue(value);
  return new Intl.NumberFormat('pt-BR').format(Math.max(0, numericValue));
}

let planningCleanup = () => {};
let planningReturnFocus = null;
let planningAgendaCleanup = () => {};
let planningAgendaReturnFocus = null;
let planningReagendaCleanup = () => {};
let planningReagendaReturnFocus = null;
const planningStateByKey = new Map();

function createDefaultPlanningState(initialAvailableQuantity = 0) {
  return {
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
    availableQuantity: initialAvailableQuantity,
  };
}

function resolvePlanningMemoryKey(options = {}) {
  if (options.memoryKey) return String(options.memoryKey);
  const orderItem = options.orderItem || {};
  if (orderItem.id) return `planning:${orderItem.id}`;
  if (orderItem.product) return `planning:${orderItem.product}`;
  return 'planning:global';
}

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
          ${Input.create({
            id: 'planning-quantity',
            label: 'Quantidade',
            placeholder: 'Digite a quantidade',
            value: state.draftQuantity || '',
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
        ${Input.create({
          id: 'planning-future-quantity',
          label: 'Quantidade',
          placeholder: 'Digite a quantidade',
          value: state.futureDraftQuantity || '',
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
    availableQuantity = '',
  } = orderItem;
  const availableValue = availableQuantity || available;

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
          <div><span>Disponível</span><strong class="planning-modal__available">${availableValue}</strong></div>
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
        ${Button.create({ text: 'Planejar', variant: 'primary', size: 'sm' }).replace('<button ', '<button data-planning-action="submit" ')}
      </div>
    `,
  });
}

function createPlanningAgendaState() {
  const baseDate = new Date(2026, 0, 14);
  return {
    selectedDate: baseDate,
    currentDate: baseDate,
    viewMode: 'week',
  };
}

function agendaCloneDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function agendaToIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function agendaParseIsoDate(value) {
  if (!value || typeof value !== 'string') return null;
  const [year, month, day] = value.split('-').map(Number);
  if ([year, month, day].some(Number.isNaN)) return null;
  return new Date(year, month - 1, day);
}

function agendaIsSameDate(left, right) {
  if (!left || !right) return false;
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate();
}

function agendaStartOfWeek(date) {
  const result = agendaCloneDate(date);
  result.setDate(result.getDate() - result.getDay());
  return result;
}

function agendaAddDays(date, amount) {
  const result = agendaCloneDate(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function agendaAddMonths(date, amount) {
  const result = agendaCloneDate(date);
  result.setMonth(result.getMonth() + amount);
  return result;
}

function agendaFormatMonthYear(date) {
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function agendaFormatWeekRange(date) {
  const start = agendaStartOfWeek(date);
  const end = agendaAddDays(start, 6);
  const monthName = agendaFormatMonthYear(end).replace(` ${end.getFullYear()}`, '');
  return `${String(start.getDate()).padStart(2, '0')} - ${String(end.getDate()).padStart(2, '0')} de ${monthName} ${end.getFullYear()}`;
}

function getPlanningAgendaDayVolume(date) {
  if (date.getFullYear() !== 2026 || date.getMonth() !== 0) return '';
  const days = new Set([12, 13, 14, 15, 16]);
  return days.has(date.getDate()) ? '15.000' : '';
}

function createPlanningAgendaDayCell({ date, selectedDate, currentMonth = null }) {
  const isoDate = agendaToIsoDate(date);
  const isSelected = agendaIsSameDate(date, selectedDate);
  const isOutsideMonth = currentMonth !== null && date.getMonth() !== currentMonth;
  const volume = getPlanningAgendaDayVolume(date);

  return `
    <button type="button" class="schedule-modal__day${isSelected ? ' is-selected' : ''}${isOutsideMonth ? ' is-outside-month' : ''}" data-planning-agenda-date="${isoDate}">
      <span class="schedule-modal__day-number">${date.getDate()}</span>
      <span class="schedule-modal__day-qty">${volume}</span>
    </button>
  `;
}

function renderPlanningAgendaWeek(state) {
  const weekStart = agendaStartOfWeek(state.selectedDate);
  const dayCells = Array.from({ length: 7 }, (_, index) => (
    createPlanningAgendaDayCell({
      date: agendaAddDays(weekStart, index),
      selectedDate: state.selectedDate,
    })
  )).join('');

  return `
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--week">${dayCells}</div>
  `;
}

function renderPlanningAgendaMonth(state) {
  const monthStart = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), 1);
  const gridStart = agendaAddDays(monthStart, -monthStart.getDay());
  const dayCells = Array.from({ length: 42 }, (_, index) => (
    createPlanningAgendaDayCell({
      date: agendaAddDays(gridStart, index),
      selectedDate: state.selectedDate,
      currentMonth: monthStart.getMonth(),
    })
  )).join('');

  return `
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--month">${dayCells}</div>
  `;
}

function renderPlanningAgendaCalendar(state) {
  const modeClass = state.viewMode === 'month' ? 'schedule-modal__calendar-grid--month' : 'schedule-modal__calendar-grid--week';
  const content = state.viewMode === 'month' ? renderPlanningAgendaMonth(state) : renderPlanningAgendaWeek(state);
  return `<div class="schedule-modal__calendar-grid ${modeClass}">${content}</div>`;
}

function createPlanningAgendaModal(state = createPlanningAgendaState()) {
  return Modal.create({
    id: PLANNING_AGENDA_MODAL_ID,
    title: 'Agendamento',
    size: 'xl',
    className: 'schedule-modal',
    body: `
      <div class="schedule-modal__content">
        ${Input.createSelect({
          id: 'planning-agenda-location-select',
          label: 'Selecionar localização',
          required: true,
          placeholder: 'Selecionar...',
          items: [
            { label: 'Estufa 1', value: 'estufa-1' },
            { label: 'Estufa 2', value: 'estufa-2' },
          ],
        })}

        <div class="schedule-modal__period-row">
          <span class="schedule-modal__period-text" data-planning-agenda-period>${agendaFormatWeekRange(state.selectedDate)}</span>
          <div class="schedule-modal__period-nav">
            <button type="button" class="schedule-modal__icon-btn" data-planning-agenda-nav="prev" aria-label="Periodo anterior">${icon('chevron-left', { size: 14 })}</button>
            <button type="button" class="schedule-modal__icon-btn" data-planning-agenda-nav="next" aria-label="Proximo periodo">${icon('chevron-right', { size: 14 })}</button>
          </div>
        </div>

        <div class="schedule-modal__view-toggle">
          <button type="button" class="schedule-modal__view-btn ${state.viewMode === 'month' ? 'is-active' : ''}" data-planning-agenda-view="month">Mês</button>
          <button type="button" class="schedule-modal__view-btn ${state.viewMode === 'week' ? 'is-active' : ''}" data-planning-agenda-view="week">Semana</button>
        </div>

        <div class="schedule-modal__calendar schedule-modal__calendar--week" data-planning-agenda-calendar>
          ${renderPlanningAgendaCalendar(state)}
        </div>

        <div class="schedule-modal__table-header">
          <h3 class="schedule-modal__table-title" data-planning-agenda-day-title>Agendamentos para o dia ${state.selectedDate.getDate()}</h3>
          <span class="schedule-modal__table-total">Quantidade de mudas agendadas: <strong>15.000</strong></span>
        </div>

        <div class="schedule-modal__table-wrap">
          <table class="schedule-modal__table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Ordem de Produção</th>
                <th>Cultura</th>
                <th>Quantidade</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nome do cliente</td>
                <td>Ordem de produção</td>
                <td>Cultura</td>
                <td>Quantidade</td>
                <td><button type="button" class="schedule-modal__reagendar" data-planning-agenda-reagendar>Reagendar</button></td>
              </tr>
              <tr>
                <td>Nome do cliente</td>
                <td>Ordem de produção</td>
                <td>Cultura</td>
                <td>Quantidade</td>
                <td><button type="button" class="schedule-modal__reagendar" data-planning-agenda-reagendar>Reagendar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    footer: `
      <div class="schedule-modal__footer">
        ${Button.create({ text: 'Voltar', variant: 'outline-dark', size: 'sm' }).replace('<button ', '<button data-planning-agenda-action="back" ')}
        ${Button.create({ text: 'Selecionar data', variant: 'primary', size: 'sm' }).replace('<button ', '<button data-planning-agenda-action="select-date" ')}
      </div>
    `,
  });
}

function createPlanningReagendaModal(values = {}) {
  return Modal.create({
    id: PLANNING_REAGENDA_MODAL_ID,
    title: 'Agendamento',
    size: 'sm',
    className: 'reschedule-modal',
    body: `
      <div class="reschedule-modal__content">
        ${Input.create({
          id: 'planning-reagenda-date',
          type: 'date',
          label: 'Data',
          required: true,
          value: values.date || '',
          className: 'reschedule-modal__date-field',
        })}
        ${Input.create({
          id: 'planning-reagenda-location',
          label: 'Localização',
          required: true,
          placeholder: 'Nome da localização',
          value: values.location || '',
        })}
        ${Input.create({
          id: 'planning-reagenda-responsible',
          label: 'Responsável',
          required: true,
          placeholder: 'Nome do responsável',
          value: values.responsible || '',
        })}
        <span class="reschedule-modal__error" data-planning-reagenda-error hidden>Preencha todos os campos obrigatórios.</span>
      </div>
    `,
    footer: `
      <div class="reschedule-modal__footer">
        ${Button.create({ text: 'Cancelar', variant: 'outline-dark', size: 'sm' }).replace('<button ', '<button data-planning-reagenda-action="cancel" ')}
        ${Button.create({ text: 'Confirmar', variant: 'primary', size: 'sm' }).replace('<button ', '<button data-planning-reagenda-action="confirm" ')}
      </div>
    `,
  });
}

function closePlanningReagendaModal({ restoreFocus = true } = {}) {
  const modalElement = document.querySelector(`[data-modal="${PLANNING_REAGENDA_MODAL_ID}"]`);
  const backdropElement = document.querySelector(`[data-modal-backdrop="${PLANNING_REAGENDA_MODAL_ID}"]`);
  if (!modalElement || !backdropElement) return;

  planningReagendaCleanup();
  Modal.close(PLANNING_REAGENDA_MODAL_ID);

  if (document.querySelector(`[data-modal="${PLANNING_AGENDA_MODAL_ID}"]`)?.classList.contains('is-visible')) {
    document.body.style.overflow = 'hidden';
  }

  modalElement.remove();
  backdropElement.remove();

  if (restoreFocus && planningReagendaReturnFocus?.focus) {
    planningReagendaReturnFocus.focus();
  }
  planningReagendaReturnFocus = null;
}

function closePlanningAgendaModal({ restoreFocus = true } = {}) {
  closePlanningReagendaModal({ restoreFocus: false });
  const modalElement = document.querySelector(`[data-modal="${PLANNING_AGENDA_MODAL_ID}"]`);
  const backdropElement = document.querySelector(`[data-modal-backdrop="${PLANNING_AGENDA_MODAL_ID}"]`);
  if (!modalElement || !backdropElement) return;

  planningAgendaCleanup();
  Modal.close(PLANNING_AGENDA_MODAL_ID);

  const hasParentModalOpen = Boolean(document.querySelector(`[data-modal="${PLANNING_MODAL_ID}"]`)?.classList.contains('is-visible'));
  if (hasParentModalOpen) {
    document.body.style.overflow = 'hidden';
  }

  modalElement.remove();
  backdropElement.remove();

  if (restoreFocus && planningAgendaReturnFocus?.focus) {
    planningAgendaReturnFocus.focus();
  }
  planningAgendaReturnFocus = null;
}

function openPlanningAgendaModal(anchorEl = null) {
  closePlanningAgendaModal({ restoreFocus: false });
  planningAgendaReturnFocus = anchorEl;
  let planningAgendaState = createPlanningAgendaState();

  document.body.insertAdjacentHTML('beforeend', createPlanningAgendaModal(planningAgendaState));

  const modalElement = document.querySelector(`[data-modal="${PLANNING_AGENDA_MODAL_ID}"]`);
  const backdropElement = document.querySelector(`[data-modal-backdrop="${PLANNING_AGENDA_MODAL_ID}"]`);
  if (!modalElement || !backdropElement) return;

  const locationSelect = modalElement.querySelector('#planning-agenda-location-select');
  const closeButton = modalElement.querySelector('[data-modal-close]');

  const updatePlanningAgendaUi = () => {
    const period = modalElement.querySelector('[data-planning-agenda-period]');
    if (period) {
      period.textContent = planningAgendaState.viewMode === 'month'
        ? agendaFormatMonthYear(planningAgendaState.currentDate)
        : agendaFormatWeekRange(planningAgendaState.selectedDate);
    }

    const calendarContainer = modalElement.querySelector('[data-planning-agenda-calendar]');
    if (calendarContainer) {
      calendarContainer.classList.toggle('schedule-modal__calendar--month', planningAgendaState.viewMode === 'month');
      calendarContainer.classList.toggle('schedule-modal__calendar--week', planningAgendaState.viewMode === 'week');
      calendarContainer.innerHTML = renderPlanningAgendaCalendar(planningAgendaState);
    }

    modalElement.querySelectorAll('[data-planning-agenda-view]').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.planningAgendaView === planningAgendaState.viewMode);
    });

    const title = modalElement.querySelector('[data-planning-agenda-day-title]');
    if (title) title.textContent = `Agendamentos para o dia ${planningAgendaState.selectedDate.getDate()}`;
  };

  const openPlanningReagendaModal = (anchorReagenda = null) => {
    closePlanningReagendaModal({ restoreFocus: false });
    planningReagendaReturnFocus = anchorReagenda;

    document.body.insertAdjacentHTML('beforeend', createPlanningReagendaModal({
      date: agendaToIsoDate(planningAgendaState.selectedDate),
      location: '',
      responsible: '',
    }));

    const reagendaModal = document.querySelector(`[data-modal="${PLANNING_REAGENDA_MODAL_ID}"]`);
    const reagendaBackdrop = document.querySelector(`[data-modal-backdrop="${PLANNING_REAGENDA_MODAL_ID}"]`);
    if (!reagendaModal || !reagendaBackdrop) return;

    const reagendaCloseButton = reagendaModal.querySelector('[data-modal-close]');
    const dateInput = reagendaModal.querySelector('#planning-reagenda-date');
    const locationInput = reagendaModal.querySelector('#planning-reagenda-location');
    const responsibleInput = reagendaModal.querySelector('#planning-reagenda-responsible');
    const errorElement = reagendaModal.querySelector('[data-planning-reagenda-error]');

    const clearErrors = () => {
      if (errorElement) errorElement.hidden = true;
      [dateInput, locationInput, responsibleInput].forEach((input) => {
        input?.closest('.field')?.classList.remove('field--error');
      });
    };

    const validate = () => {
      clearErrors();
      const invalid = [];
      if (!dateInput?.value) invalid.push(dateInput);
      if (!locationInput?.value?.trim()) invalid.push(locationInput);
      if (!responsibleInput?.value?.trim()) invalid.push(responsibleInput);
      if (!invalid.length) return true;
      invalid.forEach((input) => input?.closest('.field')?.classList.add('field--error'));
      if (errorElement) errorElement.hidden = false;
      invalid[0]?.focus?.();
      return false;
    };

    const handleCloseReagenda = () => closePlanningReagendaModal();
    const handleBackdropReagenda = (event) => {
      if (event.target !== reagendaBackdrop) return;
      closePlanningReagendaModal();
    };
    const handleConfirmReagenda = () => {
      if (!validate()) return;
      Toast.success('Reagendamento confirmado');
      closePlanningReagendaModal();
    };
    const handleKeydownReagenda = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      closePlanningReagendaModal();
    };

    const handleReagendaModalClick = (event) => {
      const actionButton = event.target.closest('[data-planning-reagenda-action]');
      if (!actionButton) return;
      const action = actionButton.dataset.planningReagendaAction;
      if (action === 'cancel') {
        closePlanningReagendaModal();
        return;
      }
      if (action === 'confirm') {
        handleConfirmReagenda();
      }
    };

    reagendaCloseButton?.addEventListener('click', handleCloseReagenda);
    reagendaBackdrop.addEventListener('click', handleBackdropReagenda);
    reagendaModal.addEventListener('click', handleReagendaModalClick);
    document.addEventListener('keydown', handleKeydownReagenda, true);
    [dateInput, locationInput, responsibleInput].forEach((input) => input?.addEventListener('input', clearErrors));

    planningReagendaCleanup = () => {
      reagendaCloseButton?.removeEventListener('click', handleCloseReagenda);
      reagendaBackdrop.removeEventListener('click', handleBackdropReagenda);
      reagendaModal.removeEventListener('click', handleReagendaModalClick);
      document.removeEventListener('keydown', handleKeydownReagenda, true);
      [dateInput, locationInput, responsibleInput].forEach((input) => input?.removeEventListener('input', clearErrors));
      planningReagendaCleanup = () => {};
    };

    Modal.open(PLANNING_REAGENDA_MODAL_ID);
  };

  const handleClose = () => closePlanningAgendaModal();
  const handleBackdrop = (event) => {
    if (event.target !== backdropElement) return;
    closePlanningAgendaModal();
  };
  const handleKeydown = (event) => {
    if (event.key !== 'Escape') return;
    if (document.querySelector(`[data-modal="${PLANNING_REAGENDA_MODAL_ID}"]`)?.classList.contains('is-visible')) return;
    event.preventDefault();
    event.stopPropagation();
    closePlanningAgendaModal();
  };
  const handleModalClick = (event) => {
    const actionButton = event.target.closest('[data-planning-agenda-action]');
    if (actionButton) {
      const action = actionButton.dataset.planningAgendaAction;
      if (action === 'back') {
        closePlanningAgendaModal();
        return;
      }
      if (action === 'select-date') {
        const planningDateInput = document.querySelector('#planning-future-date');
        if (planningDateInput) {
          planningDateInput.value = agendaToIsoDate(planningAgendaState.selectedDate);
          planningDateInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        closePlanningAgendaModal();
        return;
      }
    }

    const viewButton = event.target.closest('[data-planning-agenda-view]');
    if (viewButton) {
      planningAgendaState.viewMode = viewButton.dataset.planningAgendaView === 'month' ? 'month' : 'week';
      if (planningAgendaState.viewMode === 'month') {
        planningAgendaState.currentDate = agendaCloneDate(planningAgendaState.selectedDate);
      }
      updatePlanningAgendaUi();
      return;
    }

    const navButton = event.target.closest('[data-planning-agenda-nav]');
    if (navButton) {
      const direction = navButton.dataset.planningAgendaNav === 'prev' ? -1 : 1;
      if (planningAgendaState.viewMode === 'month') {
        planningAgendaState.currentDate = agendaAddMonths(planningAgendaState.currentDate, direction);
      } else {
        planningAgendaState.selectedDate = agendaAddDays(planningAgendaState.selectedDate, direction * 7);
        planningAgendaState.currentDate = agendaCloneDate(planningAgendaState.selectedDate);
      }
      updatePlanningAgendaUi();
      return;
    }

    const dayButton = event.target.closest('[data-planning-agenda-date]');
    if (dayButton) {
      const selectedDate = agendaParseIsoDate(dayButton.dataset.planningAgendaDate);
      if (!selectedDate) return;
      planningAgendaState.selectedDate = selectedDate;
      planningAgendaState.currentDate = agendaCloneDate(selectedDate);
      updatePlanningAgendaUi();
      return;
    }

    const reagendarButton = event.target.closest('[data-planning-agenda-reagendar]');
    if (reagendarButton) {
      openPlanningReagendaModal(reagendarButton);
      return;
    }
  };

  closeButton?.addEventListener('click', handleClose);
  backdropElement.addEventListener('click', handleBackdrop);
  modalElement.addEventListener('click', handleModalClick);
  document.addEventListener('keydown', handleKeydown, true);

  planningAgendaCleanup = () => {
    closePlanningReagendaModal({ restoreFocus: false });
    closeButton?.removeEventListener('click', handleClose);
    backdropElement.removeEventListener('click', handleBackdrop);
    modalElement.removeEventListener('click', handleModalClick);
    document.removeEventListener('keydown', handleKeydown, true);
    planningAgendaCleanup = () => {};
  };

  Modal.open(PLANNING_AGENDA_MODAL_ID);
  updatePlanningAgendaUi();
  if (locationSelect?.focus) {
    setTimeout(() => locationSelect.focus(), 120);
  }
}

export function closePlanningModal({ restoreFocus = true } = {}) {
  closePlanningAgendaModal({ restoreFocus: false });
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
    onAddRow = null,
  } = options;
  const memoryKey = resolvePlanningMemoryKey(options);
  const initialAvailableQuantity = parseQuantityValue(
    orderItem.availableQuantity || orderItem.available || orderItem.totalPedido || '0'
  );

  closePlanningModal({ restoreFocus: false });
  planningReturnFocus = anchorEl;

  const existingState = planningStateByKey.get(memoryKey);
  const state = existingState || createDefaultPlanningState(initialAvailableQuantity);
  planningStateByKey.set(memoryKey, state);

  document.body.insertAdjacentHTML('beforeend', createPlanningModal({
    orderItem: {
      ...orderItem,
      available: formatQuantityValue(initialAvailableQuantity),
    },
    rows: state.rows,
  }));

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
  const updateAvailableSummary = () => {
    const availableElement = modalElement.querySelector('.planning-modal__available');
    if (!availableElement) return;
    availableElement.textContent = formatQuantityValue(state.availableQuantity);
  };
  const persistCurrentDraftState = () => {
    if (state.serviceType === 'remessa-futura') {
      state.futureDraftQuantity = modalElement.querySelector('#planning-future-quantity')?.value || state.futureDraftQuantity;
      state.futureDraftLocation = modalElement.querySelector('#planning-future-location')?.value || state.futureDraftLocation;
      state.futureDraftResponsible = modalElement.querySelector('#planning-future-responsible')?.value || state.futureDraftResponsible;
      state.futureDraftDate = modalElement.querySelector('#planning-future-date')?.value || state.futureDraftDate;
    } else {
      state.draftQuantity = modalElement.querySelector('#planning-quantity')?.value || state.draftQuantity;
      state.draftLot = modalElement.querySelector('#planning-lot')?.value || state.draftLot;
    }
    planningStateByKey.set(memoryKey, state);
  };

  const handleClose = () => {
    persistCurrentDraftState();
    closePlanningModal();
  };
  const handleBackdrop = (event) => {
    if (event.target !== backdropElement) return;
    persistCurrentDraftState();
    closePlanningModal();
  };
  const handleKeydown = (event) => {
    if (event.key !== 'Escape') return;
    if (document.querySelector(`[data-modal="${LINK_ORDER_MODAL_ID}"]`)?.classList.contains('is-visible')) return;
    if (document.querySelector(`[data-modal="${PLANNING_AGENDA_MODAL_ID}"]`)?.classList.contains('is-visible')) return;
    if (document.querySelector(`[data-modal="${PLANNING_REAGENDA_MODAL_ID}"]`)?.classList.contains('is-visible')) return;
    event.preventDefault();
    event.stopPropagation();
    persistCurrentDraftState();
    closePlanningModal();
  };
  const handleRowsClick = (event) => {
    const actionButton = event.target.closest('[data-planning-row-action]');
    if (!actionButton) return;
    const action = actionButton.dataset.planningRowAction;
    const rowIndex = Number(actionButton.dataset.rowIndex);
    if (action === 'delete' && !Number.isNaN(rowIndex)) {
      if (state.serviceType === 'remessa-futura') {
        const removedRow = state.futureRows[rowIndex];
        state.availableQuantity += parseQuantityValue(removedRow?.quantity);
        state.futureRows = state.futureRows.filter((_, index) => index !== rowIndex);
      } else {
        state.rows = state.rows.filter((_, index) => index !== rowIndex);
      }
      renderPlanningDynamicContent();
      updateAvailableSummary();
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

      const draftQuantity = quantitySelect?.value || '';
      const draftLocation = locationSelect?.value || '';
      const draftResponsible = responsibleInput?.value?.trim() || '';
      const draftDate = dateInput?.value || '';

      if (!draftQuantity || !draftLocation || !draftResponsible || !draftDate) {
        Toast.error('Preencha todos os campos obrigatórios.');
        return;
      }

      const quantityToSchedule = parseQuantityValue(draftQuantity);
      if (quantityToSchedule <= 0) {
        Toast.error('Informe uma quantidade válida.');
        return;
      }

      const remainingQuantity = state.availableQuantity - quantityToSchedule;
      if (remainingQuantity < 0) {
        Toast.error('Valor digitado maior que o disponível.');
        return;
      }

      state.futureDraftQuantity = draftQuantity;
      state.futureDraftLocation = draftLocation;
      state.futureDraftResponsible = draftResponsible;
      state.futureDraftDate = draftDate;

      state.futureRows.push({
        plannedDate: state.futureDraftDate,
        location: LOCATION_OPTIONS.find((opt) => opt.value === state.futureDraftLocation)?.label || state.futureDraftLocation,
        responsible: state.futureDraftResponsible,
        quantity: formatQuantityValue(quantityToSchedule),
      });
      const addedFutureRow = state.futureRows[state.futureRows.length - 1];
      state.availableQuantity = remainingQuantity;
      state.futureDraftLocation = '';
      state.futureDraftResponsible = '';
      state.futureDraftQuantity = '';
      state.futureDraftDate = '';
      if (typeof onAddRow === 'function') {
        onAddRow({
          serviceType: state.serviceType,
          orderItem,
          row: addedFutureRow,
        });
      }
      renderPlanningDynamicContent();
      updateAvailableSummary();
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
    const addedStockRow = state.rows[state.rows.length - 1];
    if (typeof onAddRow === 'function') {
      onAddRow({
        serviceType: state.serviceType,
        orderItem,
        row: addedStockRow,
      });
    }
    renderPlanningDynamicContent();
  };
  const handleConsultAgenda = () => {
    openPlanningAgendaModal(modalElement.querySelector('[data-planning-action="check-agenda"]'));
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
  updateAvailableSummary();
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
