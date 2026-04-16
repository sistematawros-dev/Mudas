import * as Badge from '../../../components/badge/badge.js';
import * as Button from '../../../components/button/button.js';
import * as ButtonIcon from '../../../components/button-icon/button-icon.js';
import * as Input from '../../../components/input/input.js';
import * as Modal from '../../../components/modal/modal.js';
import * as Progress from '../../../components/progress/progress.js';
import * as Segmented from '../../../components/segmented/segmented.js';
import {
  filterProductOptions,
  gestaoAgendaModalIds,
  modeOptions,
  productOptions,
  statusOptions,
} from './gestao-agenda.data.js';

const calendarIcon = `
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2.25" y="3" width="11.5" height="10.75" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
    <path d="M2.25 6H13.75M5 1.75V4.25M11 1.75V4.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
`;

const gridIcon = `
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="4.5" height="4.5" rx="0.75" stroke="currentColor" stroke-width="1.5"/>
    <rect x="9.5" y="2" width="4.5" height="4.5" rx="0.75" stroke="currentColor" stroke-width="1.5"/>
    <rect x="2" y="9.5" width="4.5" height="4.5" rx="0.75" stroke="currentColor" stroke-width="1.5"/>
    <rect x="9.5" y="9.5" width="4.5" height="4.5" rx="0.75" stroke="currentColor" stroke-width="1.5"/>
  </svg>
`;

function renderTextField(field, className) {
  return Input.create({
    id: field.id,
    label: field.label,
    value: field.value,
    placeholder: field.placeholder,
    required: field.required,
    size: 'sm',
    className,
  });
}

function renderDateField(field, className) {
  const classes = [className, 'patio-date-field', 'patio-date-field--plain'].filter(Boolean).join(' ');
  return Input.create({
    id: field.id,
    label: field.label,
    type: 'date',
    value: field.value,
    placeholder: field.placeholder,
    required: field.required,
    size: 'sm',
    className: classes,
  });
}

function renderSelectField(field, items, className) {
  return Input.createSelect({
    id: field.id,
    label: field.label,
    value: field.value,
    placeholder: field.placeholder,
    items,
    required: field.required,
    size: 'sm',
    className,
  });
}

function renderToolbarModeButton(iconMarkup, view, isActive, ariaLabel) {
  const classes = [
    'btn-icon-only',
    'btn-icon-only--sm',
    isActive ? 'btn-icon-only--info' : 'btn-icon-only--outline-dark',
    'btn-icon-only--square',
    'patio-schedule-management__mode-button',
  ].join(' ');

  return `
    <button
      type="button"
      class="${classes}"
      data-action="set-view"
      data-view="${view}"
      aria-label="${ariaLabel}"
    >
      ${iconMarkup}
    </button>
  `;
}

function renderLegend() {
  return `
    <div class="patio-schedule-management__legend" aria-label="Legenda de status da agenda">
      <span class="patio-schedule-management__legend-item">
        <span class="patio-schedule-management__legend-dot patio-schedule-management__legend-dot--open"></span>
        <span>Aberto</span>
      </span>
      <span class="patio-schedule-management__legend-item">
        <span class="patio-schedule-management__legend-dot patio-schedule-management__legend-dot--blocked"></span>
        <span>Bloqueado</span>
      </span>
    </div>
  `;
}

function renderConfirmationFooter(confirmLabel) {
  const backButton = Button.create({
    text: 'Voltar',
    variant: 'secondary',
    style: 'outline',
    size: 'sm',
  }).replace('<button ', '<button data-modal-close ');

  const confirmButton = Button.create({
    text: confirmLabel,
    variant: 'error',
    size: 'sm',
    iconRight: 'chevronRight',
  }).replace('<button ', '<button data-modal-confirm ');

  return `
    <div class="patio-schedule-management__modal-actions">
      ${backButton}
      ${confirmButton}
    </div>
  `;
}

function renderActionModal({ id, title, description, body = '', confirmLabel, className = '' }) {
  return Modal.create({
    id,
    title,
    description,
    body,
    footer: renderConfirmationFooter(confirmLabel),
    size: 'md',
    className: `patio-schedule-management__modal ${className}`.trim(),
  });
}

function renderBlockModal(selectedCard, blockReason) {
  const description = selectedCard
    ? `Deseja bloquear agenda do dia ${selectedCard.dateLabel.toLowerCase()}?`
    : 'Deseja bloquear a agenda selecionada?';

  const textarea = Input.createTextarea({
    id: 'gestaoAgendaBlockReason',
    label: 'Mensagem do Sistema (Opcional)*',
    value: blockReason,
    placeholder: 'Ex: Manutenção na balança 1',
    rows: 4,
    size: 'sm',
    className: 'patio-schedule-management__modal-field patio-schedule-management__modal-field--textarea',
  });

  return renderActionModal({
    id: gestaoAgendaModalIds.block,
    title: 'Bloquear Agenda',
    description,
    body: textarea,
    confirmLabel: 'Sim, bloquear',
    className: 'patio-schedule-management__modal--block',
  });
}

function renderCancelModal(selectedCard) {
  const description = selectedCard
    ? `Deseja cancelar o agendamento ${selectedCard.dateLabel.toLowerCase()} (${selectedCard.product})?`
    : 'Deseja cancelar o agendamento selecionado?';

  return renderActionModal({
    id: gestaoAgendaModalIds.cancel,
    title: 'Cancelar agendamento',
    description,
    confirmLabel: 'Sim, cancelar',
    className: 'patio-schedule-management__modal--cancel',
  });
}

function renderModals(selectedCard, blockReason) {
  return `
    <div class="patio-schedule-management__modals" aria-hidden="true">
      ${renderBlockModal(selectedCard, blockReason)}
      ${renderCancelModal(selectedCard)}
    </div>
  `;
}

function renderAgendaCard(card) {
  const isBlocked = card.status === 'blocked';
  const available = Math.max(card.capacity - card.occupied, 0);
  const primaryActionLabel = isBlocked ? 'Desbloquear' : 'Bloquear';
  const primaryAction = isBlocked ? 'unblock-card' : 'open-block-modal';
  const progressColor = isBlocked ? 'danger' : 'primary';
  const percent = card.capacity > 0 ? (card.occupied / card.capacity) * 100 : 0;
  const progress = Progress.createSimpleBar({
    value: percent,
    max: 100,
    color: progressColor,
    size: 'sm',
  });

  const primaryButton = Button.create({
    text: primaryActionLabel,
    variant: 'error',
    style: 'outline',
    size: 'sm',
    iconLeft: 'trash',
  }).replace('<button ', `<button data-action="${primaryAction}" data-card-id="${card.id}" `);

  const cancelButton = Button.create({
    text: 'Cancelar',
    variant: 'secondary',
    style: 'outline',
    size: 'sm',
    iconLeft: 'close',
  }).replace('<button ', `<button data-action="open-cancel-modal" data-card-id="${card.id}" `);

  return `
    <article class="patio-schedule-card patio-schedule-card--${card.status}">
      ${isBlocked && card.note ? `<div class="patio-schedule-card__note">${card.note}</div>` : ''}
      <div class="patio-schedule-card__body">
        <header class="patio-schedule-card__header">
          <div class="patio-schedule-card__date-wrap">
            <span class="patio-schedule-card__calendar">${calendarIcon}</span>
            <div>
              <h3 class="patio-schedule-card__date">${card.dateLabel}</h3>
              <p class="patio-schedule-card__weekday">${card.weekdayLabel}</p>
            </div>
          </div>
          <div class="patio-schedule-card__badge-wrap">
            ${Badge.create({ text: card.product, variant: 'neutral', style: 'soft', size: 'sm' })}
          </div>
        </header>

        <section class="patio-schedule-card__occupancy">
          <div class="patio-schedule-card__occupancy-head">
            <span>Ocupação</span>
            <strong>${card.occupied} / ${card.capacity}</strong>
          </div>
          <div class="patio-schedule-card__progress-wrap">${progress}</div>
          <p class="patio-schedule-card__availability patio-schedule-card__availability--${card.status}">${isBlocked ? card.freeLabel : `${available} livres`}</p>
        </section>

        <footer class="patio-schedule-card__actions">
          ${primaryButton}
          ${cancelButton}
        </footer>
      </div>
    </article>
  `;
}

function renderAgendaGrid(cards) {
  const cardsByDate = cards.reduce((acc, card) => {
    const key = String(card?.dateIso || card?.dateLabel || 'sem-data');
    if (!acc[key]) acc[key] = [];
    acc[key].push(card);
    return acc;
  }, {});

  const sortedDateKeys = Object.keys(cardsByDate).sort((a, b) => String(a).localeCompare(String(b)));

  return `
    <div class="patio-schedule-management__cards-grid">
      ${sortedDateKeys.map((dateKey) => {
        const dateCards = cardsByDate[dateKey] || [];
        const columnTitle = String(dateCards[0]?.dateLabel || dateKey);
        return `
          <section class="patio-schedule-management__cards-column" data-date="${dateKey}">
            <header class="patio-schedule-management__cards-column-header">${columnTitle}</header>
            <div class="patio-schedule-management__cards-column-list">
              ${dateCards.map((card) => renderAgendaCard(card)).join('')}
            </div>
          </section>
        `;
      }).join('')}
    </div>
  `;
}

function renderCalendarItem(item) {
  return `
    <span class="patio-schedule-calendar__item patio-schedule-calendar__item--${item.status}">
      <span class="patio-schedule-calendar__item-dot patio-schedule-calendar__item-dot--${item.status}"></span>
      <span class="patio-schedule-calendar__item-text">${item.product}</span>
    </span>
  `;
}

function renderCalendarDay(day) {
  return `
    <div class="patio-schedule-calendar__cell" data-day="${day.key}">
      <div class="patio-schedule-calendar__day-number">${day.dayNumber}</div>
      <div class="patio-schedule-calendar__items">
        ${day.items.map((item) => renderCalendarItem(item)).join('')}
      </div>
    </div>
  `;
}

function renderCalendarView(calendar) {
  return `
    <section class="patio-schedule-calendar" aria-label="Calendário de disponibilidade da agenda">
      <div class="patio-schedule-calendar__weekdays">
        ${calendar.weekdays.map((weekday) => `<div class="patio-schedule-calendar__weekday">${weekday}</div>`).join('')}
      </div>
      <div class="patio-schedule-calendar__body">
        ${calendar.weeks.map((week) => `
          <div class="patio-schedule-calendar__week">
            ${week.map((day) => renderCalendarDay(day)).join('')}
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderAgendaContent(state) {
  if (state.filters.view === 'calendar') {
    return renderCalendarView(state.calendar);
  }

  return renderAgendaGrid(state.cards);
}

function renderFormFields(state) {
  const isPeriodMode = state.mode === 'period';
  const firstRowFields = isPeriodMode
    ? `
      ${renderDateField(state.form.loadingDate, 'patio-schedule-management__field')}
      ${renderDateField(state.form.endDate, 'patio-schedule-management__field')}
      ${renderSelectField(state.form.productType, productOptions, 'patio-schedule-management__field')}
    `
    : `
      ${renderDateField(state.form.loadingDate, 'patio-schedule-management__field')}
      ${renderSelectField(state.form.productType, productOptions, 'patio-schedule-management__field')}
    `;

  const firstRowClass = isPeriodMode
    ? 'patio-schedule-management__form-row patio-schedule-management__form-row--period'
    : 'patio-schedule-management__form-row patio-schedule-management__form-row--single';

  return `
    <div class="${firstRowClass}">
      ${firstRowFields}
    </div>
    <div class="patio-schedule-management__form-row patio-schedule-management__form-row--actions">
      ${renderTextField(state.form.totalSlots, 'patio-schedule-management__field')}
      <div class="patio-schedule-management__actions-row">
        ${renderTextField(state.form.carrierLimit, 'patio-schedule-management__field patio-schedule-management__field--limit')}
        <div class="patio-schedule-management__submit-wrap">
          ${Button.create({ text: 'Liberar Vagas', variant: 'primary', size: 'sm' }).replace('<button ', '<button data-action="release-slots" ')}
        </div>
      </div>
    </div>
  `;
}

export function renderGestaoAgenda(state) {
  const segmented = Segmented.create({
    items: modeOptions,
    activeValue: state.mode,
    size: 'sm',
  });

  const selectedCard = state.allCards.find((card) => card.id === state.modal.selectedCardId) || null;
  const gridButton = renderToolbarModeButton(gridIcon, 'grid', state.filters.view === 'grid', 'Visualização em grade');
  const calendarButton = renderToolbarModeButton(calendarIcon, 'calendar', state.filters.view === 'calendar', 'Visualização em calendário');

  return `
    <section class="patio-schedule-management__card">
      <header class="patio-schedule-management__card-header">
        <div>
          <h2 class="patio-schedule-management__card-title">Liberar Agenda</h2>
          <p class="patio-schedule-management__card-subtitle">Configure novos períodos e limites de capacidade.</p>
        </div>
      </header>

      <div class="patio-schedule-management__mode" id="patio-schedule-management-mode">
        ${segmented}
      </div>

      <div class="patio-schedule-management__form-grid">
        ${renderFormFields(state)}
      </div>

      <section class="patio-schedule-management__agenda-panel">
        <header class="patio-schedule-management__agenda-header">
          <div>
            <h3 class="patio-schedule-management__agenda-title">Agenda Disponível</h3>
            ${renderLegend()}
          </div>

          <div class="patio-schedule-management__toolbar">
            <div class="patio-schedule-management__view-toggle">
              ${gridButton}
              ${calendarButton}
            </div>
            <div class="patio-schedule-management__toolbar-filters">
              ${Input.createSelect({ id: 'agendaStatusFilter', value: state.filters.status, items: statusOptions, size: 'sm', className: 'patio-schedule-management__toolbar-select' })}
              ${Input.createSelect({ id: 'agendaProductFilter', value: state.filters.product, items: filterProductOptions, size: 'sm', className: 'patio-schedule-management__toolbar-select' })}
            </div>
            <div class="patio-schedule-management__nav-buttons">
              ${ButtonIcon.create({ icon: 'chevronLeft', variant: 'secondary', style: 'outline', size: 'sm', shape: 'square' }).replace('<button ', '<button data-action="prev-range" aria-label="Período anterior" ')}
              ${ButtonIcon.create({ icon: 'chevronRight', variant: 'info', style: 'outline', size: 'sm', shape: 'square' }).replace('<button ', '<button data-action="next-range" aria-label="Próximo período" ')}
            </div>
          </div>
        </header>

        ${renderAgendaContent(state)}
      </section>
    </section>
    ${renderModals(selectedCard, state.modal.blockReason)}
  `;
}
