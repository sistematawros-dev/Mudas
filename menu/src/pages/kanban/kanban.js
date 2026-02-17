import * as KanbanColumn from '../../components/kanban-column/kanban-column.js';
import * as KanbanCard from '../../components/kanban-card/kanban-card.js';
import * as ColorPicker from '../../components/color-picker/color-picker.js';
import * as Drawer from '../../components/drawer/drawer.js';
import * as Tabs from '../../components/tabs/tabs.js';
import * as Input from '../../components/input/input.js';
import * as Checkbox from '../../components/checkbox/checkbox.js';
import * as Toggle from '../../components/toggle/toggle.js';
import * as Chip from '../../components/chip/chip.js';
import * as Button from '../../components/button/button.js';
import * as Modal from '../../components/modal/modal.js';
import * as FileUpload from '../../components/file-upload/file-upload.js';
import { icon } from '../../components/icons/icons.js';

/**
 * Dados mock do Kanban
 */
const KANBAN_DATA = {
  columns: [
    {
      id: 'aguardando-aprovacao',
      title: 'Aguardando Agendamento',
      color: 'green',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data planejada:', value: '14/01/2025' },
          ],
        },
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data planejada:', value: '14/01/2025' },
          ],
        },
      ],
    },
    {
      id: 'agendado',
      title: 'Agendado',
      color: 'blue',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data planejada:', value: '14/01/2025' },
          ],
        },
      ],
    },
    {
      id: 'semeio',
      title: 'Semeio',
      color: 'cyan',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'germinacao',
      title: 'Germinação',
      color: 'purple',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'casa-vegetacao',
      title: 'Casa de Vegetação',
      color: 'pink',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'aguardando-enxertia',
      title: 'Aguardando Enxertia',
      color: 'cyan',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'sala-corte',
      title: 'Sala de Corte',
      color: 'cyan',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'sala-fusao',
      title: 'Sala de Fusão',
      color: 'orange',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'adaptacao',
      title: 'Adaptação',
      color: 'yellow',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'expedicao',
      title: 'Expedição',
      color: 'cyan',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'finalizado',
      title: 'Finalizado',
      color: 'green',
      cards: [
        {
          code: 'OP-2025-006',
          badgeLabel: 'Enxertia',
          items: [
            { icon: 'user', label: 'Fazenda Sol Nascente' },
            { icon: 'circle', label: 'Tomate Cereja', value: 'Qtd: 5.000' },
            { type: 'divider' },
            { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' },
            { icon: 'calendar', label: 'Dias após semeio:', value: '14' },
            { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' },
          ],
        },
      ],
    },
    {
      id: 'cancelado',
      title: 'Cancelado',
      color: 'gray',
      cards: [],
    },
  ],
};

/**
 * Inicializa a página do Kanban
 */
export function init() {
  const appHeader = document.getElementById('app-header');
  if (appHeader) appHeader.classList.add('header--kanban-compact-tabs');

  const cleanupToolbar = initToolbar();
  renderKanban();
  const cleanupPickers = initColorPickers();
  const cleanupDrawer = initAdvancedFiltersDrawer();
  const cleanupNewProductionDrawer = initNewProductionDrawer();
  const cleanupSchedulingDrawer = initSchedulingDrawer();
  const cleanupAgendadoDrawer = initAgendadoDrawer();

  return () => {
    if (appHeader) appHeader.classList.remove('header--kanban-compact-tabs');
    if (typeof cleanupToolbar === 'function') cleanupToolbar();
    if (typeof cleanupPickers === 'function') cleanupPickers();
    if (typeof cleanupDrawer === 'function') cleanupDrawer();
    if (typeof cleanupNewProductionDrawer === 'function') cleanupNewProductionDrawer();
    if (typeof cleanupSchedulingDrawer === 'function') cleanupSchedulingDrawer();
    if (typeof cleanupAgendadoDrawer === 'function') cleanupAgendadoDrawer();
  };
}

function initToolbar() {
  const chipsContainer = document.getElementById('kanban-toolbar-chips');
  const chips = ['Badge', 'Badge', 'Badge'];

  if (chipsContainer) {
    chipsContainer.innerHTML = chips.map((chip) => `
      <span class="kanban-chip">
        ${chip}
        <svg class="kanban-chip__close" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
      </span>
    `).join('');
  }

  const backButton = document.getElementById('kanban-back-btn');
  const handleBackClick = () => {
    window.location.hash = '#/producao';
  };
  if (backButton) {
    backButton.addEventListener('click', handleBackClick);
  }

  return () => {
    if (backButton) backButton.removeEventListener('click', handleBackClick);
  };
}

/**
 * Renderiza o board do Kanban
 */
function renderKanban() {
  const board = document.getElementById('kanban-board');
  if (!board) return;

  // Renderiza cada coluna
  KANBAN_DATA.columns.forEach(columnData => {
    const columnHtml = KanbanColumn.create({
      id: columnData.id,
      title: columnData.title,
      color: columnData.color,
      count: columnData.cards.length,
    });

    board.insertAdjacentHTML('beforeend', columnHtml);

    // Adiciona cards ou empty state
    if (columnData.cards.length > 0) {
      columnData.cards.forEach((cardData, cardIndex) => {
        const normalizedCardData = normalizeCardData(cardData, columnData.id, cardIndex);
        const cardHtml = KanbanCard.create(normalizedCardData);
        KanbanColumn.addCard(columnData.id, cardHtml);
      });
    } else {
      KanbanColumn.showEmptyState(columnData.id);
    }

    // Adiciona color picker após cada coluna
    const column = document.querySelector(`[data-column-id="${columnData.id}"]`);
    if (column) {
      const header = column.querySelector('.kanban-column__header');
      const pickerHtml = ColorPicker.create({
        id: `picker-${columnData.id}`,
        selected: columnData.color,
      });
      header.style.position = 'relative';
      header.insertAdjacentHTML('beforeend', pickerHtml);
    }
  });
}

/**
 * Inicializa os color pickers
 */
function initColorPickers() {
  const pickerHandlers = [];

  KANBAN_DATA.columns.forEach(columnData => {
    const settingsBtn = document.querySelector(`[data-column-settings="${columnData.id}"]`);
    const picker = document.getElementById(`picker-${columnData.id}`);

    if (!settingsBtn || !picker) return;

    // Toggle do picker ao clicar no botão de settings
    const handleSettingsClick = (e) => {
      e.stopPropagation();

      // Fecha todos os outros pickers abertos
      document.querySelectorAll('[data-color-picker]').forEach(p => {
        if (p !== picker) {
          ColorPicker.close(p);
        }
      });

      ColorPicker.toggle(picker);
    };

    settingsBtn.addEventListener('click', handleSettingsClick);
    pickerHandlers.push({ settingsBtn, handleSettingsClick });

    // Inicializa o picker
    ColorPicker.init(picker, (color) => {
      KanbanColumn.changeColor(columnData.id, color);
    });
  });

  // Fecha todos os pickers ao clicar fora (evento único no document)
  const handleDocumentClick = (e) => {
    // Verifica se o clique foi fora de qualquer picker ou botão de settings
    const clickedInsidePicker = e.target.closest('[data-color-picker]');
    const clickedSettingsBtn = e.target.closest('[data-column-settings]');

    if (!clickedInsidePicker && !clickedSettingsBtn) {
      // Fecha todos os pickers abertos
      document.querySelectorAll('[data-color-picker]').forEach(picker => {
        ColorPicker.close(picker);
      });
    }
  };

  document.addEventListener('click', handleDocumentClick);

  return () => {
    pickerHandlers.forEach(({ settingsBtn, handleSettingsClick }) => {
      settingsBtn.removeEventListener('click', handleSettingsClick);
    });
    document.removeEventListener('click', handleDocumentClick);
  };
}

function normalizeCardData(cardData, columnId, cardIndex) {
  if (columnId === 'aguardando-aprovacao' && cardIndex === 0) {
    return {
      ...cardData,
      badgeLabel: 'Normal',
      badgeVariant: 'soft-info',
      subtitle: '',
      items: [
        { icon: 'file', label: 'Cód. do Cliente:', value: '001' },
        { icon: 'user', label: 'Fazenda Sol Nascente' },
        { type: 'divider' },
        { icon: 'calendar', label: 'Data Abertura OP:', value: '14/01/2025' },
        { icon: 'circle', label: '001 - Produto 1' },
        { icon: 'circle', label: 'Qtd:', value: '5.000' },
        { icon: 'calendar', label: 'Data Entrada:', value: '19/02/2025' },
        { icon: 'calendar', label: 'Previsão Saída:', value: '19/02/2025' },
      ],
    };
  }

  return {
    ...cardData,
    badgeVariant: cardData.badgeVariant || 'light',
    subtitle: cardData.subtitle || 'TG-45678',
    items: getEnxertiaItemsByColumn(columnId),
  };
}

function getEnxertiaItemsByColumn(columnId) {
  const items = [
    { icon: 'user', label: 'Fazenda Sol Nascente' },
    { type: 'divider' },
    { icon: 'calendar', label: 'Pedido:', value: '14/01/2025' },
    { icon: 'circle', label: 'Tomate Cereja - Lote 123' },
    { icon: 'circle', label: 'Qtd:', value: '5.000' },
    { icon: 'calendar', label: 'Início:', value: '19/02/2025' },
  ];

  if (columnId === 'semeio') {
    items[2] = { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' };
    items[5] = { icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' };
  }

  if (columnId === 'germinacao') {
    items[2] = { icon: 'calendar', label: 'Data semeio:', value: '14/01/2025' };
    items[5] = { icon: 'calendar', label: 'Dias após semeio:', value: '14' };
    items.push({ icon: 'map-pin', label: 'Localização:', value: 'Estufa 1' });
  }

  return items;
}

function initNewProductionDrawer() {
  const triggerButton = document.getElementById('kanban-new-btn');
  if (!triggerButton) return () => {};

  const drawerId = 'kanban-new-production-drawer';
  const existingDrawer = document.querySelector(`[data-drawer="${drawerId}"]`);
  const existingBackdrop = document.querySelector(`[data-drawer-backdrop="${drawerId}"]`);
  if (existingDrawer) existingDrawer.remove();
  if (existingBackdrop) existingBackdrop.remove();

  const drawerHtml = Drawer.create({
    id: drawerId,
    title: 'Nova produção',
    width: 430,
    content: createNewProductionDrawerContent(),
    footer: createNewProductionDrawerFooter(),
  });

  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  const drawerControls = Drawer.init({ id: drawerId, root: document });
  const drawerElement = document.querySelector(`[data-drawer="${drawerId}"]`);
  if (!drawerElement || !drawerControls) return () => {};
  const cleanupInput = Input.init(drawerElement);
  const drawerHeader = drawerElement.querySelector('.drawer__header');
  const statusWrap = drawerElement.querySelector('.new-production-drawer__status-wrap');
  const closeButton = drawerHeader?.querySelector('[data-drawer-close]');
  if (drawerHeader && statusWrap && closeButton) {
    statusWrap.classList.add('is-in-header');
    drawerHeader.insertBefore(statusWrap, closeButton);
  }

  const firstField = drawerElement.querySelector('#new-production-origin');
  if (firstField) firstField.setAttribute('data-drawer-autofocus', '');
  const scheduleModalId = 'kanban-schedule-modal';
  const rescheduleModalId = 'kanban-reschedule-modal';
  let scheduleModalCleanup = () => {};
  let scheduleModalReturnFocus = null;
  let scheduleModalState = createScheduleModalState();
  let rescheduleModalCleanup = () => {};
  let rescheduleModalReturnFocus = null;

  const handleTriggerClick = () => {
    drawerControls.open(triggerButton);
  };

  const closeScheduleModal = ({ restoreFocus = true } = {}) => {
    closeRescheduleModal({ restoreFocus: false });
    const modalElement = document.querySelector(`[data-modal="${scheduleModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${scheduleModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    scheduleModalCleanup();
    Modal.close(scheduleModalId);

    if (drawerElement.classList.contains('is-open')) {
      document.body.style.overflow = 'hidden';
    }

    modalElement.remove();
    modalBackdrop.remove();

    if (restoreFocus && scheduleModalReturnFocus && typeof scheduleModalReturnFocus.focus === 'function') {
      scheduleModalReturnFocus.focus();
    }
    scheduleModalReturnFocus = null;
  };

  const closeRescheduleModal = ({ restoreFocus = true } = {}) => {
    const modalElement = document.querySelector(`[data-modal="${rescheduleModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${rescheduleModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    rescheduleModalCleanup();
    Modal.close(rescheduleModalId);

    if (drawerElement.classList.contains('is-open') || document.querySelector(`[data-modal="${scheduleModalId}"]`)) {
      document.body.style.overflow = 'hidden';
    }

    modalElement.remove();
    modalBackdrop.remove();

    if (restoreFocus && rescheduleModalReturnFocus?.focus) {
      rescheduleModalReturnFocus.focus();
    }
    rescheduleModalReturnFocus = null;
  };

  const openRescheduleModal = ({ anchorEl = null, initialValues = {} } = {}) => {
    document.querySelector(`[data-modal="${rescheduleModalId}"]`)?.remove();
    document.querySelector(`[data-modal-backdrop="${rescheduleModalId}"]`)?.remove();

    const payload = {
      date: initialValues.date || toIsoDate(scheduleModalState.selectedDate),
      location: initialValues.location || '',
      responsible: initialValues.responsible || '',
    };

    rescheduleModalReturnFocus = anchorEl;
    document.body.insertAdjacentHTML('beforeend', createRescheduleModal({ modalId: rescheduleModalId, values: payload }));

    const modalElement = document.querySelector(`[data-modal="${rescheduleModalId}"]`);
    const backdropElement = document.querySelector(`[data-modal-backdrop="${rescheduleModalId}"]`);
    if (!modalElement || !backdropElement) return;

    const cleanupInput = Input.init(modalElement);
    const dateInput = modalElement.querySelector('#reschedule-date');
    const locationInput = modalElement.querySelector('#reschedule-location');
    const responsibleInput = modalElement.querySelector('#reschedule-responsible');
    const errorElement = modalElement.querySelector('[data-reschedule-error]');
    const closeButton = modalElement.querySelector('[data-modal-close]');
    const cancelButton = modalElement.querySelector('[data-reschedule-action="cancel"]');
    const confirmButton = modalElement.querySelector('[data-reschedule-action="confirm"]');

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

    const handleClose = () => closeRescheduleModal();
    const handleBackdrop = (event) => {
      if (event.target !== backdropElement) return;
      closeRescheduleModal();
    };
    const handleKeydown = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      closeRescheduleModal();
    };
    const handleConfirm = () => {
      if (!validate()) return;
      console.log('Reagendar confirmado', {
        data: dateInput?.value || '',
        localizacao: locationInput?.value?.trim() || '',
        responsavel: responsibleInput?.value?.trim() || '',
      });
      closeRescheduleModal();
    };

    closeButton?.addEventListener('click', handleClose);
    cancelButton?.addEventListener('click', handleClose);
    confirmButton?.addEventListener('click', handleConfirm);
    backdropElement.addEventListener('click', handleBackdrop);
    document.addEventListener('keydown', handleKeydown, true);
    [dateInput, locationInput, responsibleInput].forEach((input) => {
      input?.addEventListener('input', clearErrors);
    });

    rescheduleModalCleanup = () => {
      closeButton?.removeEventListener('click', handleClose);
      cancelButton?.removeEventListener('click', handleClose);
      confirmButton?.removeEventListener('click', handleConfirm);
      backdropElement.removeEventListener('click', handleBackdrop);
      document.removeEventListener('keydown', handleKeydown, true);
      [dateInput, locationInput, responsibleInput].forEach((input) => {
        input?.removeEventListener('input', clearErrors);
      });
      if (typeof cleanupInput === 'function') cleanupInput();
      rescheduleModalCleanup = () => {};
    };

    Modal.open(rescheduleModalId);
    setTimeout(() => {
      if (dateInput?.focus) dateInput.focus();
    }, 120);
  };

  const updateScheduleModalUi = (modalElement, state) => {
    if (!modalElement || !state) return;

    const period = modalElement.querySelector('[data-schedule-period]');
    if (period) {
      period.textContent = state.viewMode === 'month'
        ? formatMonthYear(state.currentDate)
        : formatWeekRange(state.selectedDate);
    }

    const calendarContainer = modalElement.querySelector('[data-schedule-calendar]');
    if (calendarContainer) {
      calendarContainer.classList.toggle('schedule-modal__calendar--month', state.viewMode === 'month');
      calendarContainer.classList.toggle('schedule-modal__calendar--week', state.viewMode === 'week');
      calendarContainer.innerHTML = renderScheduleCalendar(state);
    }

    modalElement.querySelectorAll('[data-schedule-view]').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.scheduleView === state.viewMode);
    });

    const title = modalElement.querySelector('[data-schedule-day-title]');
    if (title) title.textContent = `Agendamentos para o dia ${state.selectedDate.getDate()}`;
  };

  const applySelectedScheduleDate = () => {
    const dateInput = drawerElement.querySelector('#new-production-scheduling-date');
    if (!dateInput) return;
    dateInput.value = toIsoDate(scheduleModalState.selectedDate);
    dateInput.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const openScheduleModal = (returnFocusButton) => {
    const existingModal = document.querySelector(`[data-modal="${scheduleModalId}"]`);
    const existingBackdrop = document.querySelector(`[data-modal-backdrop="${scheduleModalId}"]`);
    if (existingModal) existingModal.remove();
    if (existingBackdrop) existingBackdrop.remove();

    scheduleModalState = createScheduleModalState();
    scheduleModalReturnFocus = returnFocusButton || null;

    document.body.insertAdjacentHTML('beforeend', createScheduleModal({
      modalId: scheduleModalId,
      state: scheduleModalState,
    }));

    const modalElement = document.querySelector(`[data-modal="${scheduleModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${scheduleModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    const locationSelect = modalElement.querySelector('#schedule-location-select');
    const closeButton = modalElement.querySelector('[data-modal-close]');
    const handleCloseClick = () => closeScheduleModal();

    const handleBackdropClick = (event) => {
      if (event.target !== modalBackdrop) return;
      closeScheduleModal();
    };

    const handleKeydown = (event) => {
      if (event.key !== 'Escape') return;
      if (document.querySelector(`[data-modal="${rescheduleModalId}"]`)) return;
      event.preventDefault();
      event.stopPropagation();
      closeScheduleModal();
    };

    const handleModalClick = (event) => {
      const actionButton = event.target.closest('[data-schedule-action]');
      if (actionButton) {
        const action = actionButton.dataset.scheduleAction;
        if (action === 'back') {
          closeScheduleModal();
          return;
        }
        if (action === 'select-date') {
          applySelectedScheduleDate();
          closeScheduleModal();
          return;
        }
      }

      const viewButton = event.target.closest('[data-schedule-view]');
      if (viewButton) {
        scheduleModalState.viewMode = viewButton.dataset.scheduleView === 'month' ? 'month' : 'week';
        if (scheduleModalState.viewMode === 'month') {
          scheduleModalState.currentDate = cloneDate(scheduleModalState.selectedDate);
        }
        updateScheduleModalUi(modalElement, scheduleModalState);
        return;
      }

      const navButton = event.target.closest('[data-schedule-nav]');
      if (navButton) {
        const direction = navButton.dataset.scheduleNav === 'prev' ? -1 : 1;
        if (scheduleModalState.viewMode === 'month') {
          scheduleModalState.currentDate = addMonths(scheduleModalState.currentDate, direction);
        } else {
          scheduleModalState.selectedDate = addDays(scheduleModalState.selectedDate, direction * 7);
          scheduleModalState.currentDate = cloneDate(scheduleModalState.selectedDate);
        }
        updateScheduleModalUi(modalElement, scheduleModalState);
        return;
      }

      const dayButton = event.target.closest('[data-schedule-date]');
      if (dayButton) {
        const selectedDate = parseIsoDate(dayButton.dataset.scheduleDate);
        if (!selectedDate) return;
        scheduleModalState.selectedDate = selectedDate;
        scheduleModalState.currentDate = cloneDate(selectedDate);
        updateScheduleModalUi(modalElement, scheduleModalState);
        return;
      }

      const reagendarButton = event.target.closest('[data-schedule-reagendar]');
      if (reagendarButton) {
        openRescheduleModal({
          anchorEl: reagendarButton,
          initialValues: {
            date: toIsoDate(scheduleModalState.selectedDate),
            location: locationSelect?.value || '',
            responsible: '',
          },
        });
      }
    };

    modalBackdrop.addEventListener('click', handleBackdropClick);
    modalElement.addEventListener('click', handleModalClick);
    if (closeButton) closeButton.addEventListener('click', handleCloseClick);
    document.addEventListener('keydown', handleKeydown, true);

    scheduleModalCleanup = () => {
      modalBackdrop.removeEventListener('click', handleBackdropClick);
      modalElement.removeEventListener('click', handleModalClick);
      if (closeButton) closeButton.removeEventListener('click', handleCloseClick);
      document.removeEventListener('keydown', handleKeydown, true);
      scheduleModalCleanup = () => {};
    };

    Modal.open(scheduleModalId);
    updateScheduleModalUi(modalElement, scheduleModalState);
    if (locationSelect && typeof locationSelect.focus === 'function') {
      setTimeout(() => locationSelect.focus(), 140);
    }
  };

  const handleDrawerClick = (event) => {
    const actionButton = event.target.closest('[data-new-production-action]');
    if (!actionButton) return;

    const action = actionButton.dataset.newProductionAction;
    if (action === 'cancel') {
      drawerControls.close();
      return;
    }

    if (action === 'consult-agenda') {
      openScheduleModal(actionButton);
      return;
    }

    const form = drawerElement.querySelector('[data-new-production-form]');
    if (!form) return;

    if (action === 'clear') {
      clearNewProductionForm(form);
      return;
    }

    if (action === 'save') {
      console.log('Salvar nova produção', serializeNewProductionForm(form));
      return;
    }

    if (action === 'create-op') {
      const valid = validateNewProductionForm(form);
      if (!valid) return;
      console.log('Criar OP', serializeNewProductionForm(form));
    }
  };

  triggerButton.addEventListener('click', handleTriggerClick);
  drawerElement.addEventListener('click', handleDrawerClick);

  return () => {
    closeScheduleModal({ restoreFocus: false });
    triggerButton.removeEventListener('click', handleTriggerClick);
    drawerElement.removeEventListener('click', handleDrawerClick);
    if (typeof cleanupInput === 'function') cleanupInput();
    if (drawerControls.cleanup) drawerControls.cleanup();

    const drawer = document.querySelector(`[data-drawer="${drawerId}"]`);
    const backdrop = document.querySelector(`[data-drawer-backdrop="${drawerId}"]`);
    if (drawer) drawer.remove();
    if (backdrop) backdrop.remove();
  };
}

function createScheduleModalState() {
  const baseDate = new Date(2026, 0, 14);
  return {
    selectedDate: baseDate,
    currentDate: baseDate,
    viewMode: 'week',
  };
}

function cloneDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseIsoDate(value) {
  if (!value || typeof value !== 'string') return null;
  const [year, month, day] = value.split('-').map(Number);
  if ([year, month, day].some(Number.isNaN)) return null;
  return new Date(year, month - 1, day);
}

function isSameDate(left, right) {
  if (!left || !right) return false;
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate();
}

function startOfWeek(date) {
  const result = cloneDate(date);
  result.setDate(result.getDate() - result.getDay());
  return result;
}

function addDays(date, amount) {
  const result = cloneDate(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function addMonths(date, amount) {
  const result = cloneDate(date);
  result.setMonth(result.getMonth() + amount);
  return result;
}

function formatMonthYear(date) {
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function formatWeekRange(date) {
  const start = startOfWeek(date);
  const end = addDays(start, 6);
  const monthName = formatMonthYear(end).replace(` ${end.getFullYear()}`, '');
  return `${String(start.getDate()).padStart(2, '0')} - ${String(end.getDate()).padStart(2, '0')} de ${monthName} ${end.getFullYear()}`;
}

function getScheduleDayVolume(date) {
  if (date.getFullYear() !== 2026 || date.getMonth() !== 0) return '';
  const days = new Set([12, 13, 14, 15, 16]);
  return days.has(date.getDate()) ? '15.000' : '';
}

function createScheduleDayCell({ date, selectedDate, currentMonth = null }) {
  const isoDate = toIsoDate(date);
  const isSelected = isSameDate(date, selectedDate);
  const isOutsideMonth = currentMonth !== null && date.getMonth() !== currentMonth;
  const volume = getScheduleDayVolume(date);

  return `
    <button type="button" class="schedule-modal__day${isSelected ? ' is-selected' : ''}${isOutsideMonth ? ' is-outside-month' : ''}" data-schedule-date="${isoDate}">
      <span class="schedule-modal__day-number">${date.getDate()}</span>
      <span class="schedule-modal__day-qty">${volume}</span>
    </button>
  `;
}

function renderWeekCalendar(state) {
  const weekStart = startOfWeek(state.selectedDate);
  const dayCells = Array.from({ length: 7 }, (_, index) => (
    createScheduleDayCell({
      date: addDays(weekStart, index),
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

function renderMonthCalendar(state) {
  const monthStart = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), 1);
  const gridStart = addDays(monthStart, -monthStart.getDay());
  const dayCells = Array.from({ length: 42 }, (_, index) => (
    createScheduleDayCell({
      date: addDays(gridStart, index),
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

function renderScheduleCalendar(state) {
  const modeClass = state.viewMode === 'month' ? 'schedule-modal__calendar-grid--month' : 'schedule-modal__calendar-grid--week';
  const content = state.viewMode === 'month' ? renderMonthCalendar(state) : renderWeekCalendar(state);
  return `<div class="schedule-modal__calendar-grid ${modeClass}">${content}</div>`;
}

function createScheduleModal(options = {}) {
  const { modalId = 'kanban-schedule-modal', state = createScheduleModalState() } = options;

  return Modal.create({
    id: modalId,
    title: 'Agendamento',
    size: 'xl',
    className: 'schedule-modal',
    body: createScheduleModalBody(state),
    footer: createScheduleModalFooter(),
  });
}

function createScheduleModalBody(state) {
  return `
    <div class="schedule-modal__content">
      ${Input.createSelect({
        id: 'schedule-location-select',
        label: 'Selecionar localização',
        required: true,
        placeholder: 'Selecionar...',
        items: [
          { label: 'Estufa 1', value: 'estufa-1' },
          { label: 'Estufa 2', value: 'estufa-2' },
        ],
      })}

      <div class="schedule-modal__period-row">
        <span class="schedule-modal__period-text" data-schedule-period>${formatWeekRange(state.selectedDate)}</span>
        <div class="schedule-modal__period-nav">
          <button type="button" class="schedule-modal__icon-btn" data-schedule-nav="prev" aria-label="Periodo anterior">${icon('chevron-left', { size: 14 })}</button>
          <button type="button" class="schedule-modal__icon-btn" data-schedule-nav="next" aria-label="Proximo periodo">${icon('chevron-right', { size: 14 })}</button>
        </div>
      </div>

      <div class="schedule-modal__view-toggle">
        <button type="button" class="schedule-modal__view-btn ${state.viewMode === 'month' ? 'is-active' : ''}" data-schedule-view="month">Mês</button>
        <button type="button" class="schedule-modal__view-btn ${state.viewMode === 'week' ? 'is-active' : ''}" data-schedule-view="week">Semana</button>
      </div>

      <div class="schedule-modal__calendar schedule-modal__calendar--week" data-schedule-calendar>
        ${renderScheduleCalendar(state)}
      </div>

      <div class="schedule-modal__table-header">
        <h3 class="schedule-modal__table-title" data-schedule-day-title>Agendamentos para o dia ${state.selectedDate.getDate()}</h3>
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
              <td><button type="button" class="schedule-modal__reagendar" data-schedule-reagendar data-client="Nome do cliente" data-order="Ordem de produção" data-culture="Cultura" data-quantity="Quantidade">Reagendar</button></td>
            </tr>
            <tr>
              <td>Nome do cliente</td>
              <td>Ordem de produção</td>
              <td>Cultura</td>
              <td>Quantidade</td>
              <td><button type="button" class="schedule-modal__reagendar" data-schedule-reagendar data-client="Nome do cliente" data-order="Ordem de produção" data-culture="Cultura" data-quantity="Quantidade">Reagendar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}
function createScheduleModalFooter() {
  return `
    <div class="schedule-modal__footer">
      ${Button.create({ text: 'Voltar', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-schedule-action="back"')}
      ${Button.create({ text: 'Selecionar data', variant: 'primary', size: 'sm' }).replace('<button', '<button data-schedule-action="select-date"')}
    </div>
  `;
}

function createRescheduleModal(options = {}) {
  const {
    modalId = 'kanban-reschedule-modal',
    values = {},
  } = options;

  const dateField = Input.create({
    id: 'reschedule-date',
    type: 'date',
    label: 'Data',
    required: true,
    value: values.date || '',
    className: 'reschedule-modal__date-field',
  });

  const locationField = Input.create({
    id: 'reschedule-location',
    label: 'Localização',
    required: true,
    placeholder: 'Nome da localização',
    value: values.location || '',
  });

  const responsibleField = Input.create({
    id: 'reschedule-responsible',
    label: 'Responsável',
    required: true,
    placeholder: 'Nome do responsável',
    value: values.responsible || '',
  });

  const cancelButton = Button.create({
    text: 'Cancelar',
    variant: 'outline-dark',
    size: 'sm',
  }).replace('<button', '<button data-reschedule-action="cancel"');

  const confirmButton = Button.create({
    text: 'Confirmar',
    variant: 'primary',
    size: 'sm',
  }).replace('<button', '<button data-reschedule-action="confirm"');

  return Modal.create({
    id: modalId,
    title: 'Agendamento',
    size: 'sm',
    className: 'reschedule-modal',
    body: `
      <div class="reschedule-modal__content">
        ${dateField}
        ${locationField}
        ${responsibleField}
        <span class="reschedule-modal__error" data-reschedule-error hidden>Preencha todos os campos obrigatórios.</span>
      </div>
    `,
    footer: `
      <div class="reschedule-modal__footer">
        ${cancelButton}
        ${confirmButton}
      </div>
    `,
  });
}

function createNewProductionDrawerContent() {
  return `
    <section class="new-production-drawer">
      <div class="new-production-drawer__status-wrap">
        <span class="new-production-drawer__status">Aguardando Aprovação</span>
      </div>

      <div class="new-production-drawer__scroll">
        <form class="new-production-form" data-new-production-form novalidate>
          <section class="new-production-section">
            <h3 class="new-production-section__title">${icon('file', { size: 14 })}Informações da Produção</h3>
            <div class="new-production-card">
              ${Input.createSelect({
                id: 'new-production-origin',
                label: 'Origem',
                required: true,
                value: 'producao-propria',
                items: [{ label: 'Produção própria', value: 'producao-propria' }],
              })}

              <div class="new-production-grid new-production-grid--two">
                ${Input.create({
                  id: 'new-production-erp',
                  label: 'Código ERP',
                  required: true,
                  placeholder: 'Código ERP',
                })}
                ${Input.create({
                  id: 'new-production-cpf-cnpj',
                  label: 'CPF/CNPJ',
                  required: true,
                  placeholder: 'Produção própria',
                })}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${Input.create({
                  id: 'new-production-business-name',
                  label: 'Razão Social/Nome',
                  required: true,
                  placeholder: 'Classe',
                })}
                ${Input.create({
                  id: 'new-production-fantasy-name',
                  label: 'Nome Fantasia/Apelido',
                  required: true,
                  placeholder: 'EX: MUD-1',
                })}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${Input.create({
                  id: 'new-production-responsible',
                  label: 'Responsável',
                  required: true,
                  placeholder: 'Digite nome da classe',
                })}
                ${Input.create({
                  id: 'new-production-class',
                  label: 'Classe',
                  required: true,
                  placeholder: 'EX: MUD-1',
                })}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${Input.create({
                  id: 'new-production-product-code',
                  label: 'Cód. do Produto',
                  required: true,
                  placeholder: 'EX: MUD-1',
                })}
                ${Input.create({
                  id: 'new-production-product',
                  label: 'Produto',
                  required: true,
                  placeholder: 'Nome do produto',
                })}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${Input.create({
                  id: 'new-production-quantity',
                  label: 'Quantidade',
                  required: true,
                  placeholder: 'Nome do responsável',
                })}
                ${Input.create({
                  id: 'new-production-location',
                  label: 'Localização',
                  required: true,
                  placeholder: 'Digite a localização',
                })}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${Input.create({
                  id: 'new-production-scheduling-date',
                  type: 'date',
                  label: 'Data de Agendamento Semeio',
                  required: true,
                  className: 'new-production-date-field',
                  iconRight: icon('calendar', { size: 16 }),
                })}
                <div class="new-production-agenda-btn-wrap">
                  ${Button.create({ text: '+ Consultar agenda', variant: 'outline-dark' }).replace('<button', '<button data-new-production-action="consult-agenda"')}
                </div>
              </div>

              <div class="new-production-type">
                <div class="new-production-chip-row">
                  ${Chip.createSingle({ label: 'Enxertia', value: 'enxertia', selected: true, size: 'sm' })}
                </div>
              </div>

              ${Input.create({
                id: 'new-production-notes',
                type: 'textarea',
                label: 'Observações',
                required: true,
                rows: 2,
              })}

              <div class="new-production-tags">
                <span class="new-production-field-label">Etiqueta</span>
                <div class="new-production-chip-row new-production-chip-row--tags">
                  ${Chip.createSingle({ label: 'Normal', value: 'normal', size: 'sm', className: 'new-production-chip--normal' })}
                  ${Chip.createSingle({ label: 'Prioritário', value: 'prioritario', size: 'sm', className: 'new-production-chip--prioritario' })}
                  ${Chip.createSingle({ label: 'Urgente', value: 'urgente', size: 'sm', className: 'new-production-chip--urgente' })}
                  ${Chip.createSingle({ label: '+ Adicionar etiqueta', value: 'add-tag', size: 'sm' })}
                </div>
              </div>

              <div class="new-production-actions">
                <button type="button" class="new-production-clear-link" data-new-production-action="clear">Limpar campos</button>
                ${Button.create({ text: 'Salvar', variant: 'primary', size: 'sm' }).replace('<button', '<button data-new-production-action="save"')}
              </div>
            </div>
          </section>

          <section class="new-production-section">
            <h3 class="new-production-section__title">${icon('settings', { size: 14 })}Informações para Semeio</h3>

            <div class="new-production-subsection">
              <h4 class="new-production-subsection__title">Enxerto</h4>
              ${createNewProductionSeedTable()}
            </div>

            <div class="new-production-subsection">
              <h4 class="new-production-subsection__title">Porta-enxerto</h4>
              ${createNewProductionSeedTable()}
            </div>
          </section>
        </form>
      </div>
    </section>
  `;
}

function createNewProductionSeedTable() {
  return `
    <div class="new-production-table-wrap">
      <table class="new-production-table" aria-label="Informações para semeio">
        <thead>
          <tr>
            <th>Código do Produto</th>
            <th>Produto</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function createNewProductionDrawerFooter() {
  return `
    <div class="new-production-footer">
      ${Button.create({ text: 'Cancelar', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-new-production-action="cancel"')}
      ${Button.create({ text: 'Criar OP', variant: 'primary', size: 'sm' }).replace('<button', '<button data-new-production-action="create-op"')}
    </div>
  `;
}

function clearNewProductionForm(form) {
  if (!form) return;
  const fields = form.querySelectorAll('input, select, textarea');
  fields.forEach((field) => {
    const tagName = field.tagName.toLowerCase();
    if (tagName === 'select') {
      field.selectedIndex = 0;
      return;
    }
    if (field.type === 'date') {
      field.value = '';
      return;
    }
    field.value = '';
  });
}

function serializeNewProductionForm(form) {
  const data = {};
  if (!form) return data;
  const formData = new FormData(form);
  formData.forEach((value, key) => {
    data[key] = value;
  });
  return data;
}

function validateNewProductionForm(form) {
  if (!form) return false;
  const requiredFields = form.querySelectorAll('[required]');
  let firstInvalid = null;

  requiredFields.forEach((field) => {
    const value = (field.value || '').trim();
    if (value) return;
    if (!firstInvalid) firstInvalid = field;
  });

  if (!firstInvalid) return true;
  if (typeof firstInvalid.focus === 'function') firstInvalid.focus();
  return false;
}

function initSchedulingDrawer() {
  const board = document.getElementById('kanban-board');
  if (!board) return () => {};

  const drawerId = 'kanban-scheduling-drawer';
  const existingDrawer = document.querySelector(`[data-drawer="${drawerId}"]`);
  const existingBackdrop = document.querySelector(`[data-drawer-backdrop="${drawerId}"]`);
  if (existingDrawer) existingDrawer.remove();
  if (existingBackdrop) existingBackdrop.remove();

  const drawerHtml = Drawer.create({
    id: drawerId,
    title: 'OP-2025-006',
    width: 460,
    content: createSchedulingDrawerContent(),
    footer: createSchedulingDrawerFooter(),
  });

  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  const drawerControls = Drawer.init({ id: drawerId, root: document });
  const drawerElement = document.querySelector(`[data-drawer="${drawerId}"]`);
  if (!drawerElement || !drawerControls) return () => {};
  const cleanupInput = Input.init(drawerElement);

  const tabsRoot = drawerElement.querySelector('#scheduling-tabs')?.closest('[data-tabs]');
  const autofocusTarget = tabsRoot?.querySelector('.tabs-tab[data-tab="0"]');
  if (autofocusTarget) autofocusTarget.setAttribute('data-drawer-autofocus', '');

  const handleBoardClick = (event) => {
    const card = event.target.closest('.kanban-card');
    if (!card || !board.contains(card)) return;

    const column = card.closest('[data-column-id]');
    if (!column || column.dataset.columnId !== 'aguardando-aprovacao') return;

    const cardCode = event.target.closest('.kanban-card__code');
    if (cardCode) event.preventDefault();

    drawerControls.open(card);
  };

  const handleTabsClick = (event) => {
    if (!tabsRoot) return;
    const clickedTab = event.target.closest('.tabs-tab');
    if (!clickedTab || !tabsRoot.contains(clickedTab)) return;

    const tabIndex = Number(clickedTab.dataset.tab);
    if (Number.isNaN(tabIndex)) return;

    const tabs = tabsRoot.querySelectorAll('.tabs-tab');
    const panels = tabsRoot.parentElement?.querySelectorAll('.tabs-panel');

    tabs.forEach((tab, index) => {
      tab.classList.toggle('is-active', index === tabIndex);
      tab.setAttribute('aria-selected', String(index === tabIndex));
    });

    if (!panels) return;
    panels.forEach((panel, index) => {
      panel.classList.toggle('is-active', index === tabIndex);
    });
  };

  const handleDrawerClick = (event) => {
    const actionButton = event.target.closest('[data-scheduling-action]');
    if (!actionButton) return;

    const action = actionButton.dataset.schedulingAction;
    if (action === 'cancel') {
      drawerControls.close();
      return;
    }

    if (action === 'consult-agenda') {
      console.log('Consultar agenda');
      return;
    }

    if (action !== 'schedule') return;

    const dateInput = drawerElement.querySelector('#scheduling-date-input');
    const responsibleInput = drawerElement.querySelector('#scheduling-responsible-input');

    console.log({
      dataAgendamentoSemeio: dateInput?.value || '',
      responsavelColetaSemente: responsibleInput?.value || '',
    });
  };

  board.addEventListener('click', handleBoardClick);
  if (tabsRoot) tabsRoot.addEventListener('click', handleTabsClick);
  drawerElement.addEventListener('click', handleDrawerClick);

  return () => {
    board.removeEventListener('click', handleBoardClick);
    if (tabsRoot) tabsRoot.removeEventListener('click', handleTabsClick);
    drawerElement.removeEventListener('click', handleDrawerClick);
    if (typeof cleanupInput === 'function') cleanupInput();
    if (drawerControls.cleanup) drawerControls.cleanup();

    const drawer = document.querySelector(`[data-drawer="${drawerId}"]`);
    const backdrop = document.querySelector(`[data-drawer-backdrop="${drawerId}"]`);
    if (drawer) drawer.remove();
    if (backdrop) backdrop.remove();
  };
}

function createSchedulingDrawerContent() {
  const tabs = Tabs.createWithPanels({
    id: 'scheduling-tabs',
    variant: 'underlined',
    fullWidth: true,
    activeTab: 0,
    tabs: [
      { label: 'Detalhes e Planejamento', content: createSchedulingDetailsPanel() },
      { label: 'Histórico', content: createSchedulingHistoryPanel() },
    ],
  });

  return `
    <section class="scheduling-drawer">
      <div class="scheduling-drawer__summary">
        <p class="scheduling-drawer__subtitle">Fazenda Sol Nascente <span aria-hidden="true">•</span> Muda de Eucalipto Clone AEC 144</p>
        <span class="scheduling-drawer__status">Aguardando Agendamento</span>
      </div>
      ${tabs}
    </section>
  `;
}

function createSchedulingDetailsPanel() {
  const calendarIcon = icon('calendar', { size: 16 });

  return `
    <div class="scheduling-panel">
      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${icon('file', { size: 14 })}Informações Gerais</h3>
        <div class="scheduling-info-card">
          <div class="scheduling-grid scheduling-grid--two">
            ${createSchedulingInfoField('Código ERP', '43242343')}
            ${createSchedulingInfoField('CPF/CNPJ', '123.456.789-00')}
            ${createSchedulingInfoField('Razão Social/Nome', 'Nome da razao social')}
            ${createSchedulingInfoField('Nome Fantasia/Apelido', 'Nome fantasia')}
            ${createSchedulingInfoField('Classe', 'Muda de Eucalipto Clone AEC 144')}
            ${createSchedulingInfoField('Código do Produto', '43423432')}
            ${createSchedulingInfoField('Produto', 'Muda de Eucalipto Clone AEC 144')}
            ${createSchedulingInfoField('Quantidade', '5.000')}
          </div>
        </div>
      </section>

      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${icon('settings', { size: 14 })}Informações para Semeio</h3>
        <p class="scheduling-section__subtitle">Pé Franco</p>
        <div class="scheduling-table-wrap">
          <table class="scheduling-table" aria-label="Informações para semeio">
            <thead>
              <tr>
                <th>Código do Produto</th>
                <th>Produto</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4324342</td>
                <td>Muda de Eucalipto Clone</td>
                <td>323124324</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="scheduling-section__actions">
          ${Button.create({ text: 'Gerar QR Code', variant: 'outline-dark' })}
        </div>
      </section>

      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${icon('calendar', { size: 14 })}Planejamento e Datas</h3>
        <div class="scheduling-info-card">
          <div class="scheduling-grid scheduling-grid--two">
            ${createSchedulingInfoField('Data do Pedido', '15/01/2025')}
            ${createSchedulingInfoField('Data Planejada do Pedido', '15/01/2025')}
          </div>
          <div class="scheduling-grid scheduling-grid--two scheduling-grid--inputs">
            ${Input.create({
              id: 'scheduling-date-input',
              type: 'date',
              label: 'Data de agendamento de Semeio',
              value: '2026-04-15',
              iconRight: calendarIcon,
              className: 'scheduling-date-field',
            })}
            ${Input.create({
              id: 'scheduling-responsible-input',
              label: 'Responsável coleta da semente',
              value: 'João da Silva',
            })}
          </div>
          <button type="button" class="scheduling-link" data-scheduling-action="consult-agenda">Consultar agenda</button>
        </div>
      </section>
    </div>
  `;
}

function createSchedulingHistoryPanel() {
  return `
    <div class="scheduling-history">
      Sem histórico no momento
    </div>
  `;
}

function createSchedulingInfoField(label, value) {
  return `
    <div class="scheduling-field">
      <span class="scheduling-field__label">${label}</span>
      <span class="scheduling-field__value">${value}</span>
    </div>
  `;
}

function createSchedulingDrawerFooter() {
  return `
    <div class="scheduling-footer">
      ${Button.create({ text: 'Cancelar', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-scheduling-action="cancel"')}
      ${Button.create({ text: 'Agendar', variant: 'primary', size: 'sm' }).replace('<button', '<button data-scheduling-action="schedule"')}
    </div>
  `;
}

function initAgendadoDrawer() {
  const board = document.getElementById('kanban-board');
  if (!board) return () => {};

  const drawerId = 'kanban-agendado-drawer';
  document.querySelector(`[data-drawer="${drawerId}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${drawerId}"]`)?.remove();

  const drawerHtml = Drawer.create({
    id: drawerId,
    title: 'OP-2025-006',
    width: 460,
    content: createAgendadoDrawerContent(),
    footer: createAgendadoDrawerFooter(),
  });

  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  const drawerControls = Drawer.init({ id: drawerId, root: document });
  const drawerElement = document.querySelector(`[data-drawer="${drawerId}"]`);
  if (!drawerElement || !drawerControls) return () => {};
  const cleanupInput = Input.init(drawerElement);
  FileUpload.init(drawerElement);
  const scheduleModalId = 'kanban-schedule-modal-agendado';
  let scheduleModalCleanup = () => {};
  let scheduleModalReturnFocus = null;
  let scheduleModalState = createScheduleModalState();

  const tabsRoot = drawerElement.querySelector('#agendado-tabs')?.closest('[data-tabs]');
  const autofocusTarget = tabsRoot?.querySelector('.tabs-tab[data-tab="0"]');
  if (autofocusTarget) autofocusTarget.setAttribute('data-drawer-autofocus', '');

  const handleBoardClick = (event) => {
    const card = event.target.closest('.kanban-card');
    if (!card || !board.contains(card)) return;
    const column = card.closest('[data-column-id]');
    if (!column || column.dataset.columnId !== 'agendado') return;
    drawerControls.open(card);
  };

  const handleTabsClick = (event) => {
    if (!tabsRoot) return;
    const clickedTab = event.target.closest('.tabs-tab');
    if (!clickedTab || !tabsRoot.contains(clickedTab)) return;
    const tabIndex = Number(clickedTab.dataset.tab);
    if (Number.isNaN(tabIndex)) return;

    const tabs = tabsRoot.querySelectorAll('.tabs-tab');
    const panels = tabsRoot.parentElement?.querySelectorAll('.tabs-panel');
    tabs.forEach((tab, index) => {
      tab.classList.toggle('is-active', index === tabIndex);
      tab.setAttribute('aria-selected', String(index === tabIndex));
    });
    panels?.forEach((panel, index) => {
      panel.classList.toggle('is-active', index === tabIndex);
    });
  };

  const handleDrawerClick = (event) => {
    const detailsTab = event.target.closest('[data-agendado-details-tab]');
    if (detailsTab) {
      const detailsRoot = drawerElement.querySelector('[data-agendado-details]');
      const targetPanel = detailsTab.dataset.agendadoDetailsTab;
      if (!detailsRoot || !targetPanel) return;

      detailsRoot.querySelectorAll('[data-agendado-details-tab]').forEach((tab) => {
        const isActive = tab === detailsTab;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });

      detailsRoot.querySelectorAll('[data-agendado-details-panel]').forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.agendadoDetailsPanel === targetPanel);
      });
      return;
    }

    const detailsToggle = event.target.closest('[data-agendado-details-toggle]');
    if (detailsToggle) {
      const accordion = detailsToggle.closest('[data-agendado-details-accordion]');
      if (!accordion) return;
      const isCollapsed = accordion.classList.toggle('is-collapsed');
      detailsToggle.setAttribute('aria-expanded', String(!isCollapsed));
      return;
    }

    const cycleTab = event.target.closest('[data-agendado-cycle-tab]');
    if (cycleTab) {
      const cycleRoot = drawerElement.querySelector('[data-agendado-cycle]');
      const targetPanel = cycleTab.dataset.agendadoCycleTab;
      if (!cycleRoot || !targetPanel) return;

      cycleRoot.querySelectorAll('[data-agendado-cycle-tab]').forEach((tab) => {
        const isActive = tab === cycleTab;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });

      cycleRoot.querySelectorAll('[data-agendado-cycle-panel]').forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.agendadoCyclePanel === targetPanel);
      });
      return;
    }

    const actionButton = event.target.closest('[data-agendado-action]');
    if (!actionButton) return;

    const action = actionButton.dataset.agendadoAction;
    if (action === 'cancel') {
      drawerControls.close();
      return;
    }
    if (action === 'reagendar' || action === 'consult-agenda') {
      openScheduleModal(actionButton);
      return;
    }
    if (action === 'add-lote') {
      console.log(`Ação: ${action}`);
      return;
    }
    if (action === 'details-qr' || action === 'details-view-order' || action === 'details-view-image') {
      console.log(`Ação: ${action}`);
      return;
    }
    if (action === 'save-lote') {
      console.log('Salvar lote');
      return;
    }
    if (action === 'start-semeio') {
      const form = drawerElement.querySelector('[data-agendado-form]');
      const formData = form ? Object.fromEntries(new FormData(form).entries()) : {};
      console.log('Iniciar semeio', formData);
    }
  };

  board.addEventListener('click', handleBoardClick);
  if (tabsRoot) tabsRoot.addEventListener('click', handleTabsClick);
  drawerElement.addEventListener('click', handleDrawerClick);

  const closeScheduleModal = ({ restoreFocus = true } = {}) => {
    const modalElement = document.querySelector(`[data-modal="${scheduleModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${scheduleModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    scheduleModalCleanup();
    Modal.close(scheduleModalId);

    if (drawerElement.classList.contains('is-open')) {
      document.body.style.overflow = 'hidden';
    }

    modalElement.remove();
    modalBackdrop.remove();

    if (restoreFocus && scheduleModalReturnFocus?.focus) {
      scheduleModalReturnFocus.focus();
    }
    scheduleModalReturnFocus = null;
  };

  const openScheduleModal = (returnFocusButton) => {
    document.querySelector(`[data-modal="${scheduleModalId}"]`)?.remove();
    document.querySelector(`[data-modal-backdrop="${scheduleModalId}"]`)?.remove();

    scheduleModalState = createScheduleModalState();
    scheduleModalReturnFocus = returnFocusButton || null;

    document.body.insertAdjacentHTML('beforeend', createScheduleModal({
      modalId: scheduleModalId,
      state: scheduleModalState,
    }));

    const modalElement = document.querySelector(`[data-modal="${scheduleModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${scheduleModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    const locationSelect = modalElement.querySelector('#schedule-location-select');
    const closeButton = modalElement.querySelector('[data-modal-close]');

    const handleCloseClick = () => closeScheduleModal();
    const handleBackdropClick = (evt) => {
      if (evt.target !== modalBackdrop) return;
      closeScheduleModal();
    };
    const handleKeydown = (evt) => {
      if (evt.key !== 'Escape') return;
      evt.preventDefault();
      evt.stopPropagation();
      closeScheduleModal();
    };
    const handleModalClick = (evt) => {
      const actionButton = evt.target.closest('[data-schedule-action]');
      if (actionButton) {
        const modalAction = actionButton.dataset.scheduleAction;
        if (modalAction === 'back') {
          closeScheduleModal();
          return;
        }
        if (modalAction === 'select-date') {
          const dateInput = drawerElement.querySelector('#agendado-data-encerramento');
          if (dateInput) {
            dateInput.value = toIsoDate(scheduleModalState.selectedDate);
            dateInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
          closeScheduleModal();
          return;
        }
      }

      const viewButton = evt.target.closest('[data-schedule-view]');
      if (viewButton) {
        scheduleModalState.viewMode = viewButton.dataset.scheduleView === 'month' ? 'month' : 'week';
        if (scheduleModalState.viewMode === 'month') {
          scheduleModalState.currentDate = cloneDate(scheduleModalState.selectedDate);
        }
        updateScheduleModalUi(modalElement, scheduleModalState);
        return;
      }

      const navButton = evt.target.closest('[data-schedule-nav]');
      if (navButton) {
        const direction = navButton.dataset.scheduleNav === 'prev' ? -1 : 1;
        if (scheduleModalState.viewMode === 'month') {
          scheduleModalState.currentDate = addMonths(scheduleModalState.currentDate, direction);
        } else {
          scheduleModalState.selectedDate = addDays(scheduleModalState.selectedDate, direction * 7);
          scheduleModalState.currentDate = cloneDate(scheduleModalState.selectedDate);
        }
        updateScheduleModalUi(modalElement, scheduleModalState);
        return;
      }

      const dayButton = evt.target.closest('[data-schedule-date]');
      if (dayButton) {
        const selectedDate = parseIsoDate(dayButton.dataset.scheduleDate);
        if (!selectedDate) return;
        scheduleModalState.selectedDate = selectedDate;
        scheduleModalState.currentDate = cloneDate(selectedDate);
        updateScheduleModalUi(modalElement, scheduleModalState);
        return;
      }

      const reagendarTableButton = evt.target.closest('[data-schedule-reagendar]');
      if (reagendarTableButton) {
        console.log('Reagendar item de agenda');
      }
    };

    modalBackdrop.addEventListener('click', handleBackdropClick);
    modalElement.addEventListener('click', handleModalClick);
    closeButton?.addEventListener('click', handleCloseClick);
    document.addEventListener('keydown', handleKeydown, true);

    scheduleModalCleanup = () => {
      modalBackdrop.removeEventListener('click', handleBackdropClick);
      modalElement.removeEventListener('click', handleModalClick);
      closeButton?.removeEventListener('click', handleCloseClick);
      document.removeEventListener('keydown', handleKeydown, true);
      scheduleModalCleanup = () => {};
    };

    Modal.open(scheduleModalId);
    updateScheduleModalUi(modalElement, scheduleModalState);
    if (locationSelect?.focus) {
      setTimeout(() => locationSelect.focus(), 120);
    }
  };

  return () => {
    closeScheduleModal({ restoreFocus: false });
    board.removeEventListener('click', handleBoardClick);
    if (tabsRoot) tabsRoot.removeEventListener('click', handleTabsClick);
    drawerElement.removeEventListener('click', handleDrawerClick);
    if (typeof cleanupInput === 'function') cleanupInput();
    if (drawerControls.cleanup) drawerControls.cleanup();
    document.querySelector(`[data-drawer="${drawerId}"]`)?.remove();
    document.querySelector(`[data-drawer-backdrop="${drawerId}"]`)?.remove();
  };
}

function createAgendadoDrawerContent() {
  const tabs = Tabs.createWithPanels({
    id: 'agendado-tabs',
    variant: 'underlined',
    fullWidth: true,
    activeTab: 0,
    tabs: [
      { label: 'Iniciar Semeio', content: createAgendadoIniciarSemeioPanel() },
      { label: 'Detalhes', content: createAgendadoDetalhesPanel() },
      { label: 'Ciclo', content: createAgendadoCicloPanel() },
    ],
  });

  return `
    <section class="agendado-drawer">
      <div class="agendado-drawer__summary">
        <div class="agendado-drawer__summary-top">
          <div class="agendado-drawer__summary-left">
            <span class="agendado-meta">Cód. Pedido: <strong>001</strong></span>
            <span class="agendado-meta">Cód. Cliente: <strong>22332</strong></span>
            <span class="agendado-meta"><strong>Fazenda Sol Nascente</strong></span>
          </div>
          <div class="agendado-drawer__summary-right">
            ${Chip.createSingle({ label: 'Normal', value: 'normal', size: 'sm', className: 'agendado-chip--normal' })}
            ${Chip.createSingle({ label: 'Agendado', value: 'agendado', size: 'sm' })}
          </div>
        </div>
        <div class="agendado-drawer__summary-bottom">
          <div class="agendado-drawer__summary-left">
            <span class="agendado-meta">Cód. Produto: <strong>001</strong></span>
            <span class="agendado-meta"><strong>Muda de Eucalipto Clone AEC 144</strong></span>
            <span class="agendado-meta">Qtd.: <strong>3.000</strong></span>
          </div>
          <div class="agendado-drawer__summary-right">
            ${Chip.createSingle({ label: 'Enxertia', value: 'enxertia', size: 'sm' })}
          </div>
        </div>
      </div>
      ${tabs}
    </section>
  `;
}

function createAgendadoIniciarSemeioPanel() {
  const lotesUpload = FileUpload.create({
    title: '',
    compact: true,
    multiple: false,
    maxSizeLabel: '3MB',
    acceptedFormats: ['image/png', 'image/svg+xml', 'application/msword', 'application/pdf'],
    className: 'agendado-upload',
  });

  return `
    <form class="agendado-panel" data-agendado-form>
      <section class="agendado-section">
        <div class="agendado-semeio">
          <div class="agendado-semeio__field">
            <span class="agendado-semeio__label">
              <span class="agendado-semeio__icon">${icon('calendar', { size: 12 })}</span>
              Data de agendamento de Semeio
            </span>
            <strong>15/01/2025</strong>
          </div>
          <div class="agendado-semeio__field">
            <span>Responsável agendamento</span>
            <strong>João da Silva</strong>
          </div>
        </div>
        <div class="agendado-semeio__actions">
          ${createAgendadoReagendarButton()}
          ${createAgendadoQrButton()}
        </div>
      </section>

      <section class="agendado-section">
        <h3 class="agendado-title">Informações do Produto</h3>
        <div class="agendado-info-box">
          <div class="agendado-info-box__head">
            <span class="agendado-subtitle">Quantidade de Mudas</span>
            <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong></span>
          </div>
          <div class="agendado-kpis">
            ${createAgendadoKpi('Qtd. a Produzir', '5.556')}
            ${createAgendadoKpi('Perda Estimada', '556', '+10%')}
            ${createAgendadoKpi('Qtd. solicitada', '5.000')}
          </div>
        </div>
      </section>

      <section class="agendado-section">
        <h3 class="agendado-title">Informações para Semeio</h3>
        <div class="agendado-info-box">
          <div class="agendado-semeio-group">
            <div class="agendado-info-box__head">
              <span class="agendado-subtitle">Enxerto</span>
              <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong></span>
            </div>
            <div class="agendado-kpis">
              ${createAgendadoKpi('Qtd. a Semear', '5.556')}
              ${createAgendadoKpi('Perda Estimada', '556', '+10%')}
              ${createAgendadoKpi('Qtd. Esperada', '5.000')}
            </div>
          </div>
          <div class="agendado-semeio-group">
            <div class="agendado-info-box__head">
              <span class="agendado-subtitle">Porta-enxerto</span>
              <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong></span>
            </div>
            <div class="agendado-kpis">
              ${createAgendadoKpi('Qtd. a Semear', '5.556')}
              ${createAgendadoKpi('Perda Estimada', '556', '+10%')}
              ${createAgendadoKpi('Qtd. Esperada', '5.000')}
            </div>
          </div>
        </div>
      </section>

      <section class="agendado-section">
        <div class="agendado-section__header">
          <h3 class="agendado-title">Lotes de Sementes Utilizados</h3>
          ${Button.create({ text: '+ Adicionar Lote', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-agendado-action="add-lote"')}
        </div>
        <div class="agendado-card">
          <div class="agendado-grid agendado-grid--two">
            <div class="agendado-grid-col--full">
              ${Input.createSelect({ id: 'agendado-tipo', label: 'Tipo', name: 'tipo', placeholder: 'Selecione', items: [{ label: 'Enxerto', value: 'enxerto' }] })}
            </div>
            ${Input.create({ id: 'agendado-classe', label: 'Classe', name: 'classe', value: 'SEM-2024-001 - Lote A (Disp: 50kg)' })}
            ${Input.create({ id: 'agendado-cod-produto', label: 'Código do Produto', name: 'codigoProduto', value: 'SEM-2024-001 - Lote A (Disp: 50kg)' })}
            ${Input.create({ id: 'agendado-produto', label: 'Produto', name: 'produto', value: 'SEM-2024-001 - Lote A (Disp: 50kg)' })}
            ${Input.create({ id: 'agendado-unidade', label: 'Unidade', name: 'unidade', value: 'SEM-2024-001 - Lote A (Disp: 50kg)' })}
            ${Input.create({ id: 'agendado-cod-lote', label: 'Código do Lote', name: 'codigoLote', value: '5kg' })}
            ${Input.create({ id: 'agendado-fornecedor', label: 'Fornecedor', name: 'fornecedor', value: '95%' })}
            ${Input.create({ id: 'agendado-embalagem', label: 'Embalagem', name: 'embalagem', value: 'Clone AEC 144' })}
            ${Input.create({ id: 'agendado-quantidade', label: 'Quantidade', name: 'quantidade', value: '10' })}
          </div>
          <div class="agendado-upload-wrap">
            <span class="agendado-field-label">Anexa imagem do lote</span>
            ${lotesUpload}
            ${createAgendadoUploadPreview()}
          </div>
          ${Input.create({ id: 'agendado-responsavel-coleta', label: 'Responsável coleta da semente', name: 'responsavelColeta', value: 'João da Silva' })}
          <div class="agendado-grid agendado-grid--two">
            ${Input.create({ id: 'agendado-responsavel-entrega', label: 'Responsável entrega da semente', name: 'responsavelEntrega', placeholder: 'Nome do responsável' })}
            ${Input.create({ id: 'agendado-data-hora-entrega', label: 'Data/Hora de entrega da semente', name: 'dataHoraEntrega', placeholder: 'Nome do responsável' })}
          </div>
          <div class="agendado-card__actions">
            ${createAgendadoTermoButton()}
            ${Button.create({ text: 'Cancelar', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-agendado-action="cancel-lote"')}
            ${Button.create({ text: 'Salvar', variant: 'primary', size: 'sm' }).replace('<button', '<button data-agendado-action="save-lote"')}
          </div>
        </div>
      </section>

      <section class="agendado-section">
        ${createAgendadoLoteTable('Enxerto', '10.000', { collapsed: true, showTable: false })}
        ${createAgendadoLoteTable('Porta-enxerto', '15.000', { collapsed: false, showTable: true })}
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link">Consultar localização</button>
            </div>
            ${Input.createSearch({ id: 'agendado-localizacao', required: true, name: 'localizacao', placeholder: 'Buscar' })}
          </div>
          ${Input.create({ id: 'agendado-data-encerramento', type: 'date', label: 'Data encerramento da etapa', required: true, name: 'dataEncerramento', className: 'agendado-date-field', iconRight: icon('calendar', { size: 16 }) })}
          ${Input.create({ id: 'agendado-responsavel', label: 'Responsável', required: true, name: 'responsavel', placeholder: 'Nome do responsável' })}
          <div class="agendado-consultar-wrap">
            ${Button.create({ text: '+ Consultar agenda', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-agendado-action="consult-agenda"')}
          </div>
        </div>
        <div class="agendado-bottom-actions">
          ${createAgendadoReagendarButton()}
        </div>
      </section>
    </form>
  `;
}

function createAgendadoDetalhesPanel() {
  return `
    <section class="agendado-details" data-agendado-details>
      <div class="agendado-details-subtabs" role="tablist" aria-label="Detalhes da produção">
        <button type="button" class="agendado-details-subtabs__tab is-active" role="tab" aria-selected="true" data-agendado-details-tab="info-gerais">Informações Gerais</button>
        <button type="button" class="agendado-details-subtabs__tab" role="tab" aria-selected="false" data-agendado-details-tab="producao">Produção</button>
        <button type="button" class="agendado-details-subtabs__tab" role="tab" aria-selected="false" data-agendado-details-tab="expedicao">Expedição</button>
        <button type="button" class="agendado-details-subtabs__tab" role="tab" aria-selected="false" data-agendado-details-tab="operacoes">Operações</button>
        <button type="button" class="agendado-details-subtabs__tab" role="tab" aria-selected="false" data-agendado-details-tab="historico">Histórico</button>
      </div>

      <div class="agendado-details-panel is-active" data-agendado-details-panel="info-gerais">
        <section class="agendado-section">
          <h3 class="agendado-title">Planejamento e Datas</h3>
          <div class="agendado-details-card agendado-details-card--planning">
            <div class="agendado-details-grid agendado-details-grid--three">
              ${createAgendadoDetailsField('Data do Pedido', '15/01/2025')}
              ${createAgendadoDetailsField('Data Agendada do Semeio', '15/01/2025')}
              ${createAgendadoDetailsField('Responsável agendamento', 'João da Silva')}
            </div>
          </div>
          <div class="agendado-details-actions">
            ${createAgendadoQrButton().replace('<button', '<button data-agendado-action="details-qr"')}
          </div>
        </section>

        <section class="agendado-section">
          <h3 class="agendado-title">Informações Gerais</h3>
          <div class="agendado-details-card">
            <div class="agendado-details-grid agendado-details-grid--three">
              ${createAgendadoDetailsField('Cód. do Pedido', '001')}
              ${createAgendadoDetailsField('Referência', '43242343')}
              ${createAgendadoDetailsField('Cód. Tawros', '001')}

              ${createAgendadoDetailsField('Cód. do Cliente', '001')}
              ${createAgendadoDetailsField('CPF/CNPJ', '123.456.789-00')}
              ${createAgendadoDetailsField('Razão Social/Nome', 'Nome da razao social')}

              ${createAgendadoDetailsField('Nome Fantasia/Apelido', 'Nome fantasia')}
              ${createAgendadoDetailsField('Cidade/UF', 'São Paulo-SP')}
              ${createAgendadoDetailsField('Nome do Vendedor', 'Nome vendedor')}
            </div>

            <div class="agendado-details-field agendado-details-field--full">
              <span class="agendado-details-field__label">Classe</span>
              <strong class="agendado-details-field__value">Muda de Eucalipto Clone AEC 144</strong>
            </div>

            <div class="agendado-details-grid agendado-details-grid--three">
              ${createAgendadoDetailsField('Cód. do Produto', '432243432')}
              ${createAgendadoDetailsField('Produto', 'Muda de Eucalipto Clone')}
              ${createAgendadoDetailsField('Quantidade', '5.000')}
            </div>
          </div>

          <div class="agendado-details-accordion" data-agendado-details-accordion>
            <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
              <span class="agendado-details-accordion__icon" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
              <span>Observações</span>
            </button>
            <div class="agendado-details-accordion__content">
              Hoje, durante a caminhada no parque, notei que as flores estavam mais vibrantes do que nunca. O aroma doce das rosas misturava-se com o frescor do ar, criando uma atmosfera encantadora. Além disso, vi um grupo de crianças brincando e rindo, o que trouxe um sorriso ao meu rosto. Foi um momento perfeito para refletir e apreciar a beleza da natureza.
            </div>
          </div>

          <div class="agendado-details-actions">
            ${Button.create({ text: 'Ver pedido', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-agendado-action="details-view-order"')}
          </div>
        </section>
      </div>

      <div class="agendado-details-panel" data-agendado-details-panel="producao">${createAgendadoProducaoPanel()}</div>
      <div class="agendado-details-panel" data-agendado-details-panel="expedicao"><div class="agendado-placeholder">Em construção</div></div>
      <div class="agendado-details-panel" data-agendado-details-panel="operacoes"><div class="agendado-placeholder">Em construção</div></div>
      <div class="agendado-details-panel" data-agendado-details-panel="historico"><div class="agendado-placeholder">Em construção</div></div>
    </section>
  `;
}

function createAgendadoProducaoPanel() {
  const seedLots = [
    { stockDate: '12/01/2025', responsible: 'Viktor Dantas' },
    { stockDate: '12/01/2025', responsible: 'Viktor Dantas' },
  ];
  const supplies = [
    { tray: 'Descrição Bandeja', quantity: '1000', responsible: 'Viktor Dantas' },
    { tray: 'Descrição Bandeja', quantity: '1000', responsible: 'Viktor Dantas' },
  ];
  const stages = ['Germinação', 'Casa de Vegetação', 'Sala de Corte', 'Sala de Fusão', 'Adaptação'];

  return `
    <section class="agendado-details-production">
      <h3 class="agendado-title">Informações da Produção</h3>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
          <span>Semeio</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__grid agendado-details-production__grid--two">
            ${createAgendadoDetailsField('Data agendada de semeio', '12/01/2025')}
            ${createAgendadoDetailsField('Responsável do agendamento', 'Viktor Dantas')}
            ${createAgendadoDetailsField('Data de semeio', '12/01/2025')}
            ${createAgendadoDetailsField('Responsável do semeio', 'Viktor Dantas')}
          </div>
          <div class="agendado-details-production__line">
            ${createAgendadoDetailsField('Localização', 'Sala de Semeio')}
          </div>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
          <span>Produto Final</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__grid agendado-details-production__grid--two">
            ${createAgendadoDetailsField('Quantidade de Produto', '5.000')}
            ${createAgendadoDetailsField('Estimativa (+5% Germinação)', '5.250')}
          </div>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
          <span>Sementes</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__grid agendado-details-production__grid--two">
            ${createAgendadoDetailsField('Quantidade de Mudas Enxerto', '5.000')}
            ${createAgendadoDetailsField('Estimativa (+5% Germinação)', '5.250')}
            ${createAgendadoDetailsField('Quantidade de Mudas Porta-enxerto', '5.000')}
            ${createAgendadoDetailsField('Estimativa (+5% Germinação)', '5.250')}
          </div>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
          <span>Informações de Lote de Sementes</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__lots">
            ${seedLots.map((lot) => createAgendadoSeedLotItem(lot)).join('')}
          </div>
          <button type="button" class="agendado-termo-btn">
            ${icon('file', { size: 14 })}
            <span>Termo de Retirada</span>
          </button>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
          <span>Informações de Insumos</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__supplies">
            ${supplies.map((supply) => createAgendadoSupplyItem(supply)).join('')}
          </div>
        </div>
      </div>

      ${stages.map((stage) => createAgendadoStageItem(stage)).join('')}
    </section>
  `;
}

function createAgendadoSeedLotItem(lot) {
  return `
    <article class="agendado-details-production__lot">
      <span class="agendado-details-production__lot-title">Lote de Sementes Utilizado</span>
      <span class="agendado-details-production__lot-meta">Fornecedor - Código do lote - Descrição - Qtd</span>
      <div class="agendado-details-production__grid agendado-details-production__grid--lot">
        ${createAgendadoDetailsField('Data de retirada do estoque', lot.stockDate)}
        ${createAgendadoDetailsField('Responsável retirada', lot.responsible)}
        <div class="agendado-details-field">
          <span class="agendado-details-field__label">Foto</span>
          <span class="agendado-details-production__photo">
            <img src="/assets/arquivo.png" alt="" aria-hidden="true" />
            <button type="button" class="agendado-details-production__link" data-agendado-action="details-view-image">Visualizar imagem</button>
          </span>
        </div>
      </div>
    </article>
  `;
}

function createAgendadoSupplyItem(supply) {
  return `
    <article class="agendado-details-production__supply">
      <div class="agendado-details-production__grid agendado-details-production__grid--supplies">
        ${createAgendadoDetailsField('Bandeja', supply.tray)}
        ${createAgendadoDetailsField('Quantidade', supply.quantity)}
        ${createAgendadoDetailsField('Responsável da retirada', supply.responsible)}
      </div>
    </article>
  `;
}

function createAgendadoStageItem(stage) {
  return `
    <div class="agendado-details-accordion is-collapsed" data-agendado-details-accordion>
      <button type="button" class="agendado-details-accordion__header" aria-expanded="false" data-agendado-details-toggle>
        <span class="agendado-details-accordion__icon" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
        <span>${stage}</span>
      </button>
      <div class="agendado-details-production__stage-caption">Detalhes</div>
      <div class="agendado-details-accordion__content agendado-details-production__content">
        <div class="agendado-placeholder">Em construção</div>
      </div>
    </div>
  `;
}

function createAgendadoCicloPanel() {
  const cycleSteps = [
    { title: 'Dias após o Semeio', period: '23/01/2025', days: '10 dias' },
    { title: 'Dias na Germinação', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias na Casa de Vegetação', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias na Sala de Corte', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias na Sala de Fusão', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias na Adaptação', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias na Casa de Vegetação', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
    { title: 'Dias em Expedição', period: '23/01/2025 - 23/01/2025', days: '15 dias' },
  ];
  const cycleTimeline = [
    { title: 'Criação da Ordem de Produção', responsible: 'André Cesairni', date: '23/01/2025' },
    { title: 'Criação da Ordem de Produção', responsible: 'André Cesairni', date: '23/01/2025', daysAfterSowing: '0 Dias' },
    { title: 'Criação da Ordem de Produção', responsible: 'André Cesairni', date: '23/01/2025' },
    { title: 'Criação da Ordem de Produção', responsible: 'André Cesairni', date: '23/01/2025', daysAfterSowing: '0 Dias' },
    { title: 'Criação da Ordem de Produção', responsible: 'André Cesairni', date: '23/01/2025', daysAfterSowing: '0 Dias' },
  ];

  return `
    <section class="agendado-cycle" data-agendado-cycle>
      <div class="agendado-cycle-subtabs" role="tablist" aria-label="Ciclo da produção">
        <button type="button" class="agendado-cycle-subtabs__tab is-active" role="tab" aria-selected="true" data-agendado-cycle-tab="dias">Dias</button>
        <button type="button" class="agendado-cycle-subtabs__tab" role="tab" aria-selected="false" data-agendado-cycle-tab="linha-do-tempo">Linha do Tempo</button>
      </div>

      <div class="agendado-cycle-panel is-active" data-agendado-cycle-panel="dias">
        <div class="agendado-cycle-content">
          <section class="agendado-section">
            <h3 class="agendado-title">Dias</h3>
            <article class="agendado-cycle-forecast" aria-label="Previsão de Término">
              <h4 class="agendado-cycle-forecast__title">
                <span class="agendado-cycle-forecast__icon" aria-hidden="true">${icon('clock', { size: 14 })}</span>
                Previsão de Término
              </h4>

              <div class="agendado-cycle-donut" role="img" aria-label="365 dias de ciclo previstos">
                <div class="agendado-cycle-donut__inner">
                  <strong>365</strong>
                  <span>Dias</span>
                </div>
              </div>

              <div class="agendado-cycle-forecast__dates">
                <div class="agendado-cycle-forecast__date">
                  <span class="agendado-cycle-forecast__date-icon" aria-hidden="true">${icon('calendar', { size: 14 })}</span>
                  <span>Data Abertura: <strong>12/12/2026</strong></span>
                </div>
                <div class="agendado-cycle-forecast__date">
                  <span class="agendado-cycle-forecast__date-icon" aria-hidden="true">${icon('calendar', { size: 14 })}</span>
                  <span>Previsão Término: <strong>12/12/2026</strong></span>
                </div>
              </div>
            </article>
          </section>

          <section class="agendado-section">
            <h3 class="agendado-title">Etapas do Ciclo</h3>
            <div class="agendado-cycle-steps" aria-label="Etapas do ciclo">
              ${cycleSteps.map((step) => createAgendadoCycleStep(step)).join('')}
            </div>
          </section>
        </div>
      </div>

      <div class="agendado-cycle-panel" data-agendado-cycle-panel="linha-do-tempo">
        <div class="agendado-cycle-content">
          <section class="agendado-section agendado-cycle-timeline">
            <h3 class="agendado-title">Linha do Tempo</h3>
            <div class="timeline-card" aria-label="Linha do tempo do ciclo">
              ${cycleTimeline.map((item) => createAgendadoCycleTimelineItem(item)).join('')}
            </div>
          </section>
        </div>
      </div>
    </section>
  `;
}

function createAgendadoCycleStep(step) {
  return `
    <article class="agendado-cycle-step">
      <div class="agendado-cycle-step__main">
        <strong class="agendado-cycle-step__title">${step.title}</strong>
        <span class="agendado-cycle-step__period">${step.period}</span>
      </div>
      <strong class="agendado-cycle-step__days">${step.days}</strong>
    </article>
  `;
}

function createAgendadoCycleTimelineItem(item) {
  return `
    <article class="timeline-item">
      <div class="timeline-marker" aria-hidden="true">
        <span class="timeline-dot"></span>
        <span class="timeline-line"></span>
      </div>
      <div class="timeline-content">
        <strong class="timeline-title">${item.title}</strong>
        <span class="timeline-subtitle">Responsável: <strong>${item.responsible}</strong></span>
      </div>
      <div class="timeline-meta">
        <span class="timeline-date">${item.date}</span>
        ${item.daysAfterSowing ? `<span class="timeline-days-label">Dias após o Semeio: <strong>${item.daysAfterSowing}</strong></span>` : ''}
      </div>
    </article>
  `;
}

function createAgendadoDetailsField(label, value) {
  return `
    <div class="agendado-details-field">
      <span class="agendado-details-field__label">${label}</span>
      <strong class="agendado-details-field__value">${value}</strong>
    </div>
  `;
}

function createAgendadoReagendarButton() {
  return `
    <button type="button" class="agendado-reagendar-btn" data-agendado-action="reagendar">
      ${icon('calendar', { size: 18 })}
      <span>Reagendar</span>
    </button>
  `;
}

function createAgendadoQrButton() {
  return `
    <button type="button" class="agendado-qr-btn">
      <img src="/assets/qrcode.png" alt="" aria-hidden="true" />
      <span>Gerar QR Code</span>
    </button>
  `;
}

function createAgendadoTermoButton() {
  return `
    <button type="button" class="agendado-termo-btn">
      ${icon('file', { size: 14 })}
      <span>Termo de Retirada</span>
    </button>
  `;
}

function createAgendadoUploadPreview() {
  return `
    <div class="agendado-upload-preview" aria-label="Arquivo anexado">
      <img src="/assets/arquivo.png" alt="" aria-hidden="true" class="agendado-upload-preview__thumb" />
      <div class="agendado-upload-preview__content">
        <strong class="agendado-upload-preview__name">File name.ext</strong>
        <span class="agendado-upload-preview__status">Upload complete.</span>
      </div>
      <div class="agendado-upload-preview__actions agendado-icon-actions">
        <button type="button" aria-label="Visualizar">${icon('eye', { size: 16 })}</button>
        <button type="button" aria-label="Excluir">${icon('trash', { size: 16 })}</button>
      </div>
    </div>
  `;
}

function createAgendadoKpi(label, value, tag = '') {
  return `
    <div class="agendado-kpi">
      <span class="agendado-kpi__label">${label}${tag ? ` <em>${tag}</em>` : ''}</span>
      <strong class="agendado-kpi__value">${value}</strong>
    </div>
  `;
}

function createAgendadoLoteTable(title, total, options = {}) {
  const { collapsed = false, showTable = true } = options;
  const caretClass = collapsed ? 'is-collapsed' : 'is-expanded';
  const selectId = `agendado-cultura-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return `
    <div class="agendado-table-group">
      <span class="agendado-subtitle">${title}</span>
      <div class="agendado-table-block ${collapsed ? 'agendado-table-block--collapsed' : ''}">
        <div class="agendado-table-block__subheader">
          <span class="agendado-table-block__caret ${caretClass}" aria-hidden="true">${icon('chevron-right', { size: 12 })}</span>
          <label class="sr-only" for="${selectId}">Selecionar cultura</label>
          <select id="${selectId}" class="agendado-table-block__culture-select">
            <option value="x-y">Cultura: X - Cultivar: Y</option>
            <option value="x-z">Cultura: X - Cultivar: Z</option>
            <option value="y-a">Cultura: Y - Cultivar: A</option>
          </select>
          <span class="agendado-table-block__total">Total: ${total}</span>
        </div>
        ${showTable ? `
        <div class="agendado-table-wrap">
          <table class="agendado-table" aria-label="${title}">
            <thead>
              <tr>
                <th>Lote</th>
                <th>Fornecedor</th>
                <th>Germinação</th>
                <th>Quantidade</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${createAgendadoTableActions()}</td></tr>
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${createAgendadoTableActions()}</td></tr>
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${createAgendadoTableActions()}</td></tr>
            </tbody>
          </table>
        </div>` : ''}
      </div>
    </div>
  `;
}

function createAgendadoTableActions() {
  return `
    <div class="agendado-table-actions agendado-icon-actions">
      <button type="button" aria-label="Editar">${icon('edit', { size: 14 })}</button>
      <button type="button" aria-label="Excluir">${icon('trash', { size: 14 })}</button>
      <button type="button" aria-label="Visualizar">${icon('eye', { size: 14 })}</button>
    </div>
  `;
}

function createAgendadoDrawerFooter() {
  return `
    <div class="agendado-footer">
      ${Button.create({ text: 'Cancelar', variant: 'outline-dark', size: 'sm' }).replace('<button', '<button data-agendado-action="cancel"')}
      ${Button.create({ text: 'Iniciar Semeio', variant: 'primary', size: 'sm' }).replace('<button', '<button data-agendado-action="start-semeio"')}
    </div>
  `;
}

function initAdvancedFiltersDrawer() {
  const triggerButton = document.getElementById('kanban-advanced-filters-btn');
  if (!triggerButton) return () => {};
  const savedFiltersState = createSavedFiltersState();

  const drawerId = 'kanban-advanced-filters-drawer';
  const existingDrawer = document.querySelector(`[data-drawer="${drawerId}"]`);
  const existingBackdrop = document.querySelector(`[data-drawer-backdrop="${drawerId}"]`);
  if (existingDrawer) existingDrawer.remove();
  if (existingBackdrop) existingBackdrop.remove();

  const drawerHtml = Drawer.create({
    id: drawerId,
    title: 'Filtros Avançados',
    width: 430,
    content: createAdvancedFiltersContent(savedFiltersState),
    footer: createAdvancedFiltersFooter(),
  });

  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  const drawerControls = Drawer.init({ id: drawerId, root: document });
  const drawerElement = document.querySelector(`[data-drawer="${drawerId}"]`);
  if (!drawerElement || !drawerControls) return () => {};
  const saveFiltersModalId = 'kanban-save-filters-modal';
  let saveFiltersReturnFocus = null;
  let saveFiltersModalCleanup = () => {};

  const tabsContainer = drawerElement.querySelector('#advanced-filters-tabs');
  const tabsRoot = tabsContainer ? tabsContainer.closest('[data-tabs]') : null;
  const handleTabsClick = (event) => {
    if (!tabsRoot) return;
    const clickedTab = event.target.closest('.tabs-tab');
    if (!clickedTab || !tabsRoot.contains(clickedTab)) return;

    const tabIndex = Number(clickedTab.dataset.tab);
    if (Number.isNaN(tabIndex)) return;

    const tabs = tabsRoot.querySelectorAll('.tabs-tab');
    const panels = tabsRoot.parentElement?.querySelectorAll('.tabs-panel');

    tabs.forEach((tab, index) => {
      tab.classList.toggle('is-active', index === tabIndex);
      tab.setAttribute('aria-selected', String(index === tabIndex));
    });

    if (!panels) return;
    panels.forEach((panel, index) => {
      panel.classList.toggle('is-active', index === tabIndex);
    });
  };

  const handleDrawerContentClick = (event) => {
    const savedActionButton = event.target.closest('[data-saved-action]');
    if (savedActionButton) {
      const action = savedActionButton.dataset.savedAction;
      const itemElement = savedActionButton.closest('[data-saved-filter-item]');
      const itemId = itemElement ? itemElement.dataset.savedFilterItem : '';

      if (!itemId) return;

      if (action === 'edit') {
        savedFiltersState.editingId = itemId;
        renderSavedFiltersPanel(drawerElement, savedFiltersState);
        return;
      }

      if (action === 'delete') {
        savedFiltersState.items = savedFiltersState.items.filter((item) => item.id !== itemId);
        if (savedFiltersState.editingId === itemId) savedFiltersState.editingId = '';
        if (savedFiltersState.selectedId === itemId) savedFiltersState.selectedId = '';
        renderSavedFiltersPanel(drawerElement, savedFiltersState);
        return;
      }

      if (action === 'view') {
        savedFiltersState.selectedId = itemId;
        console.log('Visualizar filtro salvo', itemId);
        renderSavedFiltersPanel(drawerElement, savedFiltersState);
        return;
      }

      if (action === 'cancel-edit') {
        savedFiltersState.editingId = '';
        renderSavedFiltersPanel(drawerElement, savedFiltersState);
        return;
      }

      if (action === 'save-edit') {
        const editNameInput = itemElement.querySelector('[data-saved-edit-name]');
        const editField = editNameInput ? editNameInput.closest('.field') : null;
        const nextName = editNameInput ? editNameInput.value.trim() : '';

        if (!nextName) {
          if (editField) editField.classList.add('field--error');
          if (editNameInput) editNameInput.focus();
          return;
        }

        if (editField) editField.classList.remove('field--error');
        savedFiltersState.items = savedFiltersState.items.map((item) => (
          item.id === itemId ? { ...item, name: nextName } : item
        ));
        savedFiltersState.editingId = '';
        renderSavedFiltersPanel(drawerElement, savedFiltersState);
        return;
      }
    }

    const target = event.target.closest('[data-filters-action]');
    if (target) {
      const action = target.dataset.filtersAction;
      if (action === 'apply') console.log('Aplicar filtros');
      if (action === 'clear') console.log('Limpar filtros');
      if (action === 'save') openSaveFiltersModal(target);
      return;
    }

    const removeButton = event.target.closest('[data-action="remove"]');
    if (removeButton) {
      const chip = removeButton.closest('.chip');
      if (chip && drawerElement.contains(chip)) chip.remove();
      return;
    }

    const sortOption = event.target.closest('[data-order-option]');
    if (sortOption) {
      const sortContainer = sortOption.closest('[data-order-options]');
      if (!sortContainer) return;

      sortContainer.querySelectorAll('[data-order-option]').forEach((button) => {
        button.classList.toggle('is-active', button === sortOption);
      });
      return;
    }

    const activeFiltersToggle = event.target.closest('[data-active-filters-toggle]');
    if (!activeFiltersToggle) return;

    const activeFiltersSection = drawerElement.querySelector('.advanced-filters-active');
    if (!activeFiltersSection) return;

    const isCollapsed = activeFiltersSection.classList.toggle('is-collapsed');
    activeFiltersToggle.setAttribute('aria-expanded', String(!isCollapsed));
  };

  const handleTriggerClick = () => {
    drawerControls.open(triggerButton);
  };

  const closeSaveFiltersModal = ({ restoreFocus = true } = {}) => {
    const modalElement = document.querySelector(`[data-modal="${saveFiltersModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${saveFiltersModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    saveFiltersModalCleanup();
    Modal.close(saveFiltersModalId);

    if (drawerElement.classList.contains('is-open')) {
      document.body.style.overflow = 'hidden';
    }

    modalElement.remove();
    modalBackdrop.remove();

    if (restoreFocus && saveFiltersReturnFocus && typeof saveFiltersReturnFocus.focus === 'function') {
      saveFiltersReturnFocus.focus();
    }
    saveFiltersReturnFocus = null;
  };

  const openSaveFiltersModal = (returnFocusButton) => {
    const existingModal = document.querySelector(`[data-modal="${saveFiltersModalId}"]`);
    const existingBackdrop = document.querySelector(`[data-modal-backdrop="${saveFiltersModalId}"]`);
    if (existingModal) existingModal.remove();
    if (existingBackdrop) existingBackdrop.remove();

    saveFiltersReturnFocus = returnFocusButton || null;
    document.body.insertAdjacentHTML('beforeend', createSaveFiltersModal({ modalId: saveFiltersModalId }));

    const modalElement = document.querySelector(`[data-modal="${saveFiltersModalId}"]`);
    const modalBackdrop = document.querySelector(`[data-modal-backdrop="${saveFiltersModalId}"]`);
    if (!modalElement || !modalBackdrop) return;

    const nameInput = modalElement.querySelector('#save-filters-name-input');
    const nameField = modalElement.querySelector('.field');
    const errorMessage = modalElement.querySelector('[data-save-filters-error]');
    const cancelButton = modalElement.querySelector('[data-save-modal-cancel]');
    const closeButton = modalElement.querySelector('[data-modal-close]');
    const saveButton = modalElement.querySelector('[data-save-modal-submit]');

    const setValidation = (hasError) => {
      if (errorMessage) {
        errorMessage.hidden = !hasError;
      }
      if (nameField) {
        nameField.classList.toggle('field--error', hasError);
      }
    };

    const handleModalClick = (event) => {
      if (event.target === modalBackdrop) {
        closeSaveFiltersModal();
      }
    };

    const handleCancelClick = () => closeSaveFiltersModal();
    const handleCloseClick = () => closeSaveFiltersModal();
    const handleSaveClick = () => {
      if (!nameInput) return;
      const nomeFiltro = nameInput.value.trim();
      if (!nomeFiltro) {
        setValidation(true);
        nameInput.focus();
        return;
      }
      setValidation(false);
      console.log({ nomeFiltro });
      closeSaveFiltersModal();
    };

    const handleInput = () => setValidation(false);
    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeSaveFiltersModal();
      }
    };

    modalBackdrop.addEventListener('click', handleModalClick);
    if (cancelButton) cancelButton.addEventListener('click', handleCancelClick);
    if (closeButton) closeButton.addEventListener('click', handleCloseClick);
    if (saveButton) saveButton.addEventListener('click', handleSaveClick);
    if (nameInput) nameInput.addEventListener('input', handleInput);
    document.addEventListener('keydown', handleKeydown);

    saveFiltersModalCleanup = () => {
      modalBackdrop.removeEventListener('click', handleModalClick);
      if (cancelButton) cancelButton.removeEventListener('click', handleCancelClick);
      if (closeButton) closeButton.removeEventListener('click', handleCloseClick);
      if (saveButton) saveButton.removeEventListener('click', handleSaveClick);
      if (nameInput) nameInput.removeEventListener('input', handleInput);
      document.removeEventListener('keydown', handleKeydown);
      saveFiltersModalCleanup = () => {};
    };

    Modal.open(saveFiltersModalId);
    if (nameInput && typeof nameInput.focus === 'function') {
      requestAnimationFrame(() => nameInput.focus());
    }
  };

  if (tabsRoot) tabsRoot.addEventListener('click', handleTabsClick);
  drawerElement.addEventListener('click', handleDrawerContentClick);
  triggerButton.addEventListener('click', handleTriggerClick);

  return () => {
    closeSaveFiltersModal({ restoreFocus: false });
    triggerButton.removeEventListener('click', handleTriggerClick);
    if (tabsRoot) tabsRoot.removeEventListener('click', handleTabsClick);
    drawerElement.removeEventListener('click', handleDrawerContentClick);
    if (drawerControls.cleanup) drawerControls.cleanup();
    const drawer = document.querySelector(`[data-drawer="${drawerId}"]`);
    const backdrop = document.querySelector(`[data-drawer-backdrop="${drawerId}"]`);
    if (drawer) drawer.remove();
    if (backdrop) backdrop.remove();
  };
}

function createAdvancedFiltersContent(savedFiltersState) {
  const tabs = Tabs.createWithPanels({
    id: 'advanced-filters-tabs',
    variant: 'underlined',
    fullWidth: true,
    activeTab: 0,
    tabs: [
      { label: 'Filtro', content: createFiltersPanel() },
      { label: 'Filtros Salvos', content: createSavedFiltersPanel(savedFiltersState) },
    ],
  });

  return `<section class="advanced-filters">${tabs}</section>`;
}

function createSavedFiltersState() {
  return {
    items: [
      { id: 'saved-filter-1', name: 'Relatório Mensal', sharing: ['Vitor (Gerente)', 'Equipe de Vendas'] },
      { id: 'saved-filter-2', name: 'Filtro Relatório Mensal 2', sharing: ['Vitor (Gerente)', 'Equipe de Vendas'] },
      { id: 'saved-filter-3', name: 'Relatório Mensal 33', sharing: ['Vitor (Gerente)', 'Equipe de Vendas'] },
      { id: 'saved-filter-4', name: 'Relatório Anual', sharing: ['Vitor (Gerente)', 'Equipe de Vendas'] },
    ],
    editingId: 'saved-filter-1',
    selectedId: '',
  };
}

function createSavedFiltersPanel(savedFiltersState) {
  return `
    <div class="saved-filters-panel" data-saved-filters-panel>
      ${createSavedFiltersList(savedFiltersState)}
    </div>
  `;
}

function renderSavedFiltersPanel(drawerElement, savedFiltersState) {
  if (!drawerElement) return;
  const panel = drawerElement.querySelector('[data-saved-filters-panel]');
  if (!panel) return;
  panel.innerHTML = createSavedFiltersList(savedFiltersState);
}

function createSavedFiltersList(savedFiltersState) {
  if (!savedFiltersState.items.length) {
    return '<div class="advanced-filters-empty">Nenhum filtro salvo.</div>';
  }

  return savedFiltersState.items.map((item) => createSavedFiltersItem(item, savedFiltersState)).join('');
}

function createSavedFiltersItem(item, savedFiltersState) {
  const isEditing = savedFiltersState.editingId === item.id;
  const isSelected = savedFiltersState.selectedId === item.id;
  const sharingChips = item.sharing.map((label, index) => (
    Chip.createInput({ label, value: `${item.id}-share-${index}`, size: 'sm' })
  )).join('');

  return `
    <div class="saved-filter-item ${isSelected ? 'is-selected' : ''}" data-saved-filter-item="${item.id}">
      <div class="saved-filter-item__row">
        <div class="saved-filter-item__left">
          <span class="saved-filter-item__icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M2 3H14L9 9V13L7 14V9L2 3Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="saved-filter-item__name">${item.name}</span>
        </div>
        <div class="saved-filter-item__actions">
          <button type="button" class="saved-filter-item__action" data-saved-action="edit" aria-label="Editar filtro">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button type="button" class="saved-filter-item__action saved-filter-item__action--danger" data-saved-action="delete" aria-label="Excluir filtro">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3 4H13M6 4V3C6 2.45 6.45 2 7 2H9C9.55 2 10 2.45 10 3V4M12 4V13C12 13.55 11.55 14 11 14H5C4.45 14 4 13.55 4 13V4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button type="button" class="saved-filter-item__action" data-saved-action="view" aria-label="Visualizar filtro">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.4"/>
              <circle cx="8" cy="8" r="1.7" stroke="currentColor" stroke-width="1.4"/>
            </svg>
          </button>
        </div>
      </div>
      ${isEditing ? `
        <div class="saved-filter-item__edit">
          ${Input.create({
            id: `saved-filter-name-${item.id}`,
            label: 'Nome do filtro',
            value: item.name,
            className: 'saved-filter-item__edit-name',
          }).replace('class="input"', 'class="input" data-saved-edit-name')}
          <div class="saved-filter-item__share">
            <span class="saved-filter-item__share-label">Compartilhamento</span>
            <div class="saved-filter-item__share-control">
              <div class="saved-filter-item__share-chips">${sharingChips}</div>
              <span class="saved-filter-item__share-caret" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
          <div class="saved-filter-item__edit-actions">
            <button type="button" class="btn btn--outline-dark btn--sm" data-saved-action="cancel-edit">Cancelar</button>
            <button type="button" class="btn btn--primary btn--sm" data-saved-action="save-edit">Salvar</button>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function createFiltersPanel() {
  const calendarIcon = `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/>
      <path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `;

  const selectedFilter = Input.createSelect({
    id: 'advanced-filter-selected',
    label: 'Filtro selecionado',
    required: true,
    placeholder: '',
    value: 'relatorio-mensal',
    items: [{ label: 'Relatório Mensal', value: 'relatorio-mensal' }],
  });

  const chips = [
    Chip.createInput({ label: 'Status: 6 selecionados', value: 'status-6', size: 'sm', className: 'advanced-filters-chip--alert' }),
    Chip.createInput({ label: 'Data entre: 22/12/25 + 01/01/26', value: 'data-entre', size: 'sm' }),
    Chip.createInput({ label: 'Código: 2233', value: 'codigo', size: 'sm' }),
    Chip.createInput({ label: 'Cliente: A2W', value: 'cliente-1', size: 'sm' }),
    Chip.createInput({ label: 'Cliente: A2W', value: 'cliente-2', size: 'sm' }),
    Chip.createInput({ label: 'Cliente: A2W', value: 'cliente-3', size: 'sm' }),
    Chip.createInput({ label: 'Cliente: A2W', value: 'cliente-4', size: 'sm' }),
  ].join('');

  const showInactiveToggle = Toggle.create({
    id: 'advanced-filter-show-inactive',
    label: 'Mostrar inativos',
    size: 'sm',
  });

  const exceptCheckbox = Checkbox.create({
    id: 'advanced-filter-except',
    label: 'Exceto',
    checked: false,
  });

  const dataType = Input.createSelect({
    id: 'advanced-filter-data-type',
    label: 'Tipo de Data',
    placeholder: 'Selecione o tipo de data',
    items: [
      { label: 'Data de pedido', value: 'pedido' },
      { label: 'Data de início', value: 'inicio' },
    ],
  });

  const initialDate = Input.create({
    id: 'advanced-filter-start-date',
    type: 'date',
    label: 'Data inicial',
    placeholder: '00/00/0000',
    iconRight: calendarIcon,
  });

  const finalDate = Input.create({
    id: 'advanced-filter-end-date',
    type: 'date',
    label: 'Data final',
    placeholder: '00/00/0000',
    iconRight: calendarIcon,
  });

  const orderCode = Input.create({
    id: 'advanced-filter-order-code',
    label: 'Código Pedido',
    placeholder: 'Digite o código do pedido',
  });

  const tawrosCode = Input.create({
    id: 'advanced-filter-tawros-code',
    label: 'Código TAWROS',
    placeholder: 'Digite o código',
  });

  const clientCode = Input.create({
    id: 'advanced-filter-client-code',
    label: 'Código do Cliente',
    placeholder: 'Digite o código do cliente',
  });

  const cpfCnpj = Input.create({
    id: 'advanced-filter-cpf-cnpj',
    label: 'CPF/CNPJ',
    placeholder: 'Digite o nome do cliente',
  });

  const businessName = Input.create({
    id: 'advanced-filter-business-name',
    label: 'Razão Social/Nome',
    placeholder: 'Digite o nome da Razão Social',
  });

  const fantasyName = Input.create({
    id: 'advanced-filter-fantasy-name',
    label: 'Nome Fantasia/Apelido',
    placeholder: 'Digite o Nome Fantasia',
  });

  const classSelect = Input.createSelect({
    id: 'advanced-filter-class',
    label: 'Classe',
    placeholder: 'Selecione a classe',
    items: [
      { label: 'Classe A', value: 'a' },
      { label: 'Classe B', value: 'b' },
    ],
  });

  const productCode = Input.create({
    id: 'advanced-filter-product-code',
    label: 'Código Produto',
    placeholder: 'Digite o código do produto',
  });

  const productSelect = Input.createSelect({
    id: 'advanced-filter-product',
    label: 'Produto',
    placeholder: 'Nome do produto',
    items: [
      { label: 'Tomate Cereja', value: 'tomate-cereja' },
      { label: 'Tomate Italiano', value: 'tomate-italiano' },
    ],
  });

  const minQuantity = Input.create({
    id: 'advanced-filter-min-quantity',
    label: 'Quantidade Mínima',
    placeholder: 'Quantidade',
  });

  const maxQuantity = Input.create({
    id: 'advanced-filter-max-quantity',
    label: 'Quantidade Máxima',
    placeholder: 'Quantidade',
  });

  const typeField = createAdvancedFiltersChipField({
    label: 'Tipo',
    chips: [
      Chip.createInput({ label: 'Enxerto', value: 'enxerto', size: 'sm' }),
      Chip.createInput({ label: 'Porta Enxerto', value: 'porta-enxerto', size: 'sm' }),
    ],
  });

  const statusField = createAdvancedFiltersChipField({
    label: 'Status',
    chips: [
      Chip.createInput({ label: 'Bloqueado', value: 'bloqueado', size: 'sm' }),
      Chip.createInput({ label: 'Em Produção', value: 'em-producao', size: 'sm' }),
      Chip.createInput({ label: 'Expedição', value: 'expedicao', size: 'sm' }),
    ],
  });

  const sortByField = createAdvancedFiltersSortField();

  const sortingType = Input.createSelect({
    id: 'advanced-filter-sorting-type',
    label: 'Tipo de ordenação',
    required: true,
    placeholder: 'Selecione',
    items: [
      { label: 'Crescente', value: 'asc' },
      { label: 'Decrescente', value: 'desc' },
    ],
  });

  const labelField = createAdvancedFiltersChipField({
    label: 'Etiqueta',
    chips: [
      Chip.createInput({ label: 'Normal', value: 'normal', size: 'sm' }),
      Chip.createInput({ label: 'Urgente', value: 'urgente', size: 'sm' }),
    ],
  });

  const groupByField = createAdvancedFiltersGroupByField();

  return `
    <div class="advanced-filters-panel">
      <div data-drawer-autofocus>
        ${selectedFilter}
      </div>
      <div class="advanced-filters-active">
        <div class="advanced-filters-active__header">
          <span class="advanced-filters-active__label">Filtros ativos</span>
          <button type="button" class="advanced-filters-active__toggle" data-active-filters-toggle aria-expanded="true" aria-label="Recolher filtros ativos">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 10L8 6L12 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="advanced-filters-active__chips" data-active-filters>
          ${chips}
        </div>
      </div>
      <div class="advanced-filters-inline">
        ${showInactiveToggle}
        ${exceptCheckbox}
      </div>
      <div class="advanced-filters-grid">
        ${dataType}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${initialDate}
        ${finalDate}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${orderCode}
        ${tawrosCode}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${clientCode}
        ${cpfCnpj}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${businessName}
        ${fantasyName}
      </div>
      <div class="advanced-filters-grid">
        ${classSelect}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${productCode}
        ${productSelect}
      </div>
      <div class="advanced-filters-grid">
        ${typeField}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${minQuantity}
        ${maxQuantity}
      </div>
      <div class="advanced-filters-grid">
        ${statusField}
      </div>
      <div class="advanced-filters-grid">
        ${sortByField}
      </div>
      <div class="advanced-filters-grid">
        ${sortingType}
      </div>
      <div class="advanced-filters-grid">
        ${labelField}
      </div>
      <div class="advanced-filters-grid">
        ${groupByField}
      </div>
    </div>
  `;
}

function createAdvancedFiltersChipField({ label, chips }) {
  const chipsHtml = chips.join('');
  return `
    <div class="advanced-filters-chip-field">
      <span class="advanced-filters-chip-field__label">${label}</span>
      <div class="advanced-filters-chip-field__control">
        <div class="advanced-filters-chip-field__chips">${chipsHtml}</div>
        <span class="advanced-filters-chip-field__caret" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    </div>
  `;
}

function createAdvancedFiltersSortField() {
  return `
    <div class="advanced-filters-sort">
      <span class="advanced-filters-sort__label">Ordenar por</span>
      <div class="advanced-filters-sort__options" data-order-options>
        <button type="button" class="advanced-filters-sort__option is-active" data-order-option="recentes">Mais recentes</button>
        <button type="button" class="advanced-filters-sort__option" data-order-option="antigos">Mais antigos</button>
        <button type="button" class="advanced-filters-sort__option" data-order-option="maior-valor">Maior valor</button>
        <button type="button" class="advanced-filters-sort__option" data-order-option="menor-valor">Menor valor</button>
      </div>
    </div>
  `;
}

function createAdvancedFiltersGroupByField() {
  const groupItems = [
    { id: 'advanced-filter-group-client', label: 'Cliente', checked: true },
    { id: 'advanced-filter-group-class', label: 'Classe', checked: false },
    { id: 'advanced-filter-group-product', label: 'Produto', checked: false },
    { id: 'advanced-filter-group-order', label: 'Pedidos', checked: false },
  ];

  const groupOptions = groupItems.map((item) => `
    <div class="advanced-filters-group__item">
      ${Checkbox.create({ id: item.id, label: item.label, checked: item.checked, size: 'sm' })}
      <span class="advanced-filters-group__drag" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M6 3H6.01M10 3H10.01M6 8H6.01M10 8H10.01M6 13H6.01M10 13H10.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </span>
    </div>
  `).join('');

  return `
    <div class="advanced-filters-group">
      <div class="advanced-filters-group__header">
        <span class="advanced-filters-group__title">Agrupar por</span>
        <span class="advanced-filters-group__hint">
          <span class="advanced-filters-group__hint-dot" aria-hidden="true"></span>
          Selecione e clique arraste para ordenar
        </span>
      </div>
      <div class="advanced-filters-group__options">${groupOptions}</div>
    </div>
  `;
}

function createAdvancedFiltersFooter() {
  const saveButton = Button.create({
    text: 'Salvar Filtros',
    style: 'outline',
    variant: 'dark',
    size: 'sm',
    type: 'button',
  }).replace('<button ', '<button data-filters-action="save" ');

  const clearButton = Button.create({
    text: 'Limpar Filtros',
    style: 'outline',
    variant: 'dark',
    size: 'sm',
    type: 'button',
  }).replace('<button ', '<button data-filters-action="clear" ');

  const applyButton = Button.create({
    text: 'Aplicar Filtros',
    variant: 'primary',
    size: 'sm',
    type: 'button',
  }).replace('<button ', '<button data-filters-action="apply" ');

  return `
    <div class="advanced-filters-footer">
      <div class="advanced-filters-footer__left">
        ${saveButton}
      </div>
      <div class="advanced-filters-footer__right">
        ${clearButton}
        ${applyButton}
      </div>
    </div>
  `;
}

function createSaveFiltersModal({ modalId }) {
  const nameField = Input.create({
    id: 'save-filters-name-input',
    label: 'Nome do filtro',
    required: true,
    placeholder: 'Insira um nome para filtro',
  });

  const cancelButton = Button.create({
    text: 'Cancelar',
    style: 'outline',
    variant: 'dark',
    type: 'button',
  }).replace('<button ', '<button data-save-modal-cancel ');

  const saveButton = Button.create({
    text: 'Salvar',
    variant: 'primary',
    type: 'button',
  }).replace('<button ', '<button data-save-modal-submit ');

  return Modal.create({
    id: modalId,
    type: 'center',
    size: 'sm',
    title: 'Salvar Filtros',
    body: `
      <div class="advanced-save-modal__body">
        ${nameField}
        <span class="advanced-save-modal__error" data-save-filters-error hidden>Nome do filtro é obrigatório.</span>
      </div>
    `,
    footer: `
      <div class="advanced-save-modal__footer">
        ${cancelButton}
        ${saveButton}
      </div>
    `,
    closable: true,
  });
}

