import * as Badge from '../../../components/badge/badge.js';
import * as Button from '../../../components/button/button.js';
import * as ButtonIcon from '../../../components/button-icon/button-icon.js';
import * as Checkbox from '../../../components/checkbox/checkbox.js';
import * as Chip from '../../../components/chip/chip.js';
import * as Input from '../../../components/input/input.js';
import * as Modal from '../../../components/modal/modal.js';
import Toggle from '../../../components/toggle/toggle.js';
import { patioModalIds, patioQuickFilters } from './patio.data.js';

const icons = {
  clipboard: `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5.75 2.75H10.25C10.6642 2.75 11 3.08579 11 3.5V4.25H5V3.5C5 3.08579 5.33579 2.75 5.75 2.75Z" stroke="currentColor" stroke-width="1.3"/>
      <path d="M5 4.25H4.5C3.94772 4.25 3.5 4.69772 3.5 5.25V12.5C3.5 13.0523 3.94772 13.5 4.5 13.5H11.5C12.0523 13.5 12.5 13.0523 12.5 12.5V5.25C12.5 4.69772 12.0523 4.25 11.5 4.25H11" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    </svg>
  `,
  user: `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="5" r="2.5" stroke="currentColor" stroke-width="1.3"/>
      <path d="M3.25 13C3.25 10.9289 4.92893 9.25 7 9.25H9C11.0711 9.25 12.75 10.9289 12.75 13" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    </svg>
  `,
  truck: `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 4.25H9.75V10.25H2.5V4.25Z" stroke="currentColor" stroke-width="1.3"/>
      <path d="M9.75 6H12.125L13.5 7.625V10.25H9.75V6Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
      <circle cx="5" cy="11.25" r="1.25" stroke="currentColor" stroke-width="1.3"/>
      <circle cx="11.5" cy="11.25" r="1.25" stroke="currentColor" stroke-width="1.3"/>
    </svg>
  `,
  calendar: `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2.25" y="3" width="11.5" height="10.25" rx="1.5" stroke="currentColor" stroke-width="1.3"/>
      <path d="M2.25 6H13.75M5 1.75V4.25M11 1.75V4.25" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    </svg>
  `,
  cube: `
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2.25L12.75 4.75V10.75L8 13.25L3.25 10.75V4.75L8 2.25Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="M3.25 4.75L8 7.25L12.75 4.75M8 7.25V13.25" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
    </svg>
  `,
};

function renderQuickFilters(activeFilter) {
  return `
    <div class="patio-board__filters" aria-label="Filtros rápidos por produto">
      ${patioQuickFilters.map((filter) => Chip.createSingle({
        label: filter.label,
        value: filter.value,
        selected: activeFilter === filter.value,
        className: 'patio-board__filter-chip',
      }).replace('<button ', `<button data-action="set-product-filter" data-value="${filter.value}" `)).join('')}
    </div>
  `;
}

function renderHeader(state) {
  const backButton = ButtonIcon.create({
    icon: 'chevronLeft',
    variant: 'dark',
    style: 'outline',
    size: 'sm',
    shape: 'square',
  }).replace('<button ', '<button data-action="go-back" aria-label="Voltar para Controle de Pátio" ');

  const futureToggle = Toggle.create({
    id: 'patioFutureToggle',
    label: 'Ver Agendamentos Futuros',
    checked: state.showFutureAppointments,
    size: 'sm',
    className: 'patio-board__future-toggle',
  });

  return `
    <header class="patio-board__header">
      <div class="patio-board__header-main">
        <div class="patio-board__title-wrap">
          <div class="patio-board__back-button">${backButton}</div>
          <h1 class="patio-board__title">Pátio</h1>
        </div>
      </div>
      <div class="patio-board__header-actions">
        ${futureToggle}
        ${renderQuickFilters(state.activeProductFilter)}
      </div>
    </header>
  `;
}

function renderMetaRow(icon, text, className = '') {
  return `
    <div class="patio-operational-card__meta ${className}">
      <span class="patio-operational-card__meta-icon">${icon}</span>
      <span>${text}</span>
    </div>
  `;
}

function renderCardActions(item) {
  return `
    <div class="patio-operational-card__actions patio-operational-card__actions--${item.actions.length === 1 ? 'single' : 'stack'}">
      ${item.actions.map((action) => Button.create({
        text: action.label,
        variant: action.variant,
        style: action.style,
        size: 'sm',
        block: true,
      }).replace('<button ', `<button data-action="card-action" data-card-id="${item.id}" data-card-action="${action.id}" `)).join('')}
    </div>
  `;
}

function renderRegisterEntryCard() {
  return `
    <button type="button" class="patio-register-entry-card" data-action="register-entry">
      <span class="patio-register-entry-card__icon">${Button.getIcon('plus')}</span>
      <span class="patio-register-entry-card__label">Registrar entrada</span>
    </button>
  `;
}

function renderOperationalCard(item) {
  const productBadge = Badge.create({
    text: item.productLabel || item.product,
    variant: 'dark',
    style: 'soft',
    size: 'sm',
  });

  return `
    <article class="patio-operational-card patio-operational-card--${item.type}">
      <header class="patio-operational-card__header">
        <div>
          <h3 class="patio-operational-card__code">${item.code}</h3>
          <p class="patio-operational-card__secondary">${item.secondaryCode}</p>
        </div>
        <div class="patio-operational-card__badge">${productBadge}</div>
      </header>

      <div class="patio-operational-card__body">
        ${renderMetaRow(icons.user, item.driver)}
        ${item.quantity ? renderMetaRow(icons.clipboard, item.quantity) : ''}
        ${renderMetaRow(icons.truck, `Transp.: ${item.transporter}`)}
        ${item.scheduleInfo ? renderMetaRow(icons.calendar, item.scheduleInfo, item.infoTone === 'warning' ? 'patio-operational-card__meta--warning' : '') : ''}
      </div>

      ${renderCardActions(item)}
    </article>
  `;
}

function renderColumn(column) {
  const cards = column.items.filter((item) => item.type === 'card').length;
  const title = column.tone === 'future'
    ? `<span class="patio-board-column__title-dot"></span><span>${column.title}</span>`
    : `<span>${column.title}</span>`;

  return `
    <section class="patio-board-column patio-board-column--${column.id} ${column.tone ? `patio-board-column--tone-${column.tone}` : ''}" aria-label="${column.title}">
      <header class="patio-board-column__header">
        <h2 class="patio-board-column__title">${title}</h2>
        <span class="patio-board-column__count">${cards}</span>
      </header>
      <div class="patio-board-column__items">
        ${column.items.map((item) => item.type === 'entry-action' ? renderRegisterEntryCard() : renderOperationalCard(item)).join('')}
      </div>
    </section>
  `;
}

function renderLegendDot(label, tone) {
  return `
    <span class="patio-finish-modal__legend-item">
      <span class="patio-finish-modal__legend-dot patio-finish-modal__legend-dot--${tone}"></span>
      <span>${label}</span>
    </span>
  `;
}

function renderModalCheckbox(id, label, checked) {
  return Checkbox.create({
    id,
    label,
    checked,
    size: 'sm',
    className: 'patio-finish-modal__checkbox',
  });
}

function renderModalSummary(summary) {
  return `
    <div class="patio-finish-modal__summary">
      <span>${summary.plannedLabel} <strong>${summary.plannedValue}</strong></span>
      <span>${summary.loadedLabel} <strong>${summary.loadedValue}</strong></span>
    </div>
  `;
}

function renderBaleChip(rowId, baleNumber, selected) {
  return Chip.createSingle({
    label: String(baleNumber),
    value: String(baleNumber),
    selected,
    size: 'sm',
    className: 'patio-finish-modal__bale-chip',
  }).replace('<button ', `<button data-action="toggle-bale" data-row-id="${rowId}" data-bale="${baleNumber}" `);
}

function renderBalesRow(row) {
  const expandIcon = row.expanded ? 'chevronUp' : 'chevronDown';
  const statusVariant = row.status === 'EXTRA' ? 'outline' : 'soft';
  const statusColor = row.status === 'EXTRA' ? 'dark' : 'primary';

  const topLine = `
    <div class="patio-finish-modal__row-main">
      <div class="patio-finish-modal__row-left">
        ${Checkbox.create({ id: `completion-row-${row.id}`, checked: row.selected, size: 'sm', className: 'patio-finish-modal__row-checkbox' })}
        <span class="patio-finish-modal__row-icon">${icons.cube}</span>
        <div class="patio-finish-modal__row-copy">
          <div class="patio-finish-modal__row-title-wrap">
            <strong class="patio-finish-modal__row-title">${row.title}</strong>
            ${Badge.create({ text: row.status, variant: statusColor, style: statusVariant, size: 'sm' })}
            ${row.availableLabel ? Badge.create({ text: row.availableLabel, variant: 'success', style: 'soft', size: 'sm' }) : ''}
          </div>
        </div>
      </div>
      <div class="patio-finish-modal__row-right">
        ${row.rightLabel ? `<span class="patio-finish-modal__row-inline-value">${row.rightLabel}</span>` : ''}
        ${row.loadedLabel ? `<span class="patio-finish-modal__row-inline-label">${row.loadedLabel}</span>` : ''}
        ${row.loadedLabel ? Input.create({ id: `completion-loaded-${row.id}`, value: row.loadedValue, size: 'sm', className: 'patio-finish-modal__input patio-finish-modal__input--mini' }) : ''}
        <button type="button" class="patio-finish-modal__expand" data-action="toggle-row-expand" data-row-id="${row.id}" aria-label="Expandir item">
          ${ButtonIcon.getIcon(expandIcon)}
        </button>
      </div>
    </div>
  `;

  if (!row.expanded) {
    return `<div class="patio-finish-modal__row patio-finish-modal__row--compact">${topLine}</div>`;
  }

  const selectedCount = row.selectedBales.length;

  return `
    <div class="patio-finish-modal__row patio-finish-modal__row--expanded">
      ${topLine}
      <div class="patio-finish-modal__expanded-content">
        <div class="patio-finish-modal__expanded-topline">
          <span>${selectedCount} de ${row.totalBales} fardos selecionados</span>
          ${renderModalCheckbox(`completion-all-${row.id}`, 'todos', selectedCount === row.totalBales)}
        </div>
        <div class="patio-finish-modal__bales">
          ${Array.from({ length: row.totalBales }, (_, index) => index + 1).map((bale) => renderBaleChip(row.id, bale, row.selectedBales.includes(bale))).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderKgRow(item) {
  return `
    <div class="patio-finish-modal__row patio-finish-modal__row--kg">
      <div class="patio-finish-modal__row-left">
        ${Checkbox.create({ id: `completion-kg-${item.id}`, checked: item.selected, size: 'sm', className: 'patio-finish-modal__row-checkbox' })}
        <span class="patio-finish-modal__row-icon">${icons.cube}</span>
        <div class="patio-finish-modal__row-copy">
          <div class="patio-finish-modal__row-title-wrap">
            <strong class="patio-finish-modal__row-title">${item.title}</strong>
            ${Badge.create({ text: item.status, variant: 'primary', style: 'soft', size: 'sm' })}
            ${Badge.create({ text: item.availableLabel, variant: 'success', style: 'soft', size: 'sm' })}
          </div>
        </div>
      </div>
      <div class="patio-finish-modal__row-right patio-finish-modal__row-right--kg">
        <span class="patio-finish-modal__row-inline-label">${item.loadedLabel}</span>
        ${Input.create({ id: `completion-loaded-${item.id}`, value: item.loadedValue, size: 'sm', className: 'patio-finish-modal__input patio-finish-modal__input--kg' })}
      </div>
    </div>
  `;
}

function renderFinishModalControls(data) {
  if (data.quantificationType === 'kg') {
    return `
      <div class="patio-finish-modal__legend-row patio-finish-modal__legend-row--kg">
        <div class="patio-finish-modal__legend-left">
          ${renderLegendDot('Ordem de carregamento', 'order')}
          ${renderLegendDot('Carregado', 'loaded')}
          ${renderLegendDot('Disponível p/ transportadora', 'available')}
        </div>
        <div class="patio-finish-modal__legend-right">
          ${renderModalCheckbox('completion-quantity-planned', 'Quantidade prevista', data.controls.quantityPlanned)}
        </div>
      </div>
    `;
  }

  return `
    <div class="patio-finish-modal__legend-row">
      <div class="patio-finish-modal__legend-left">
        ${renderLegendDot('Ordem de carregamento', 'order')}
        ${renderLegendDot('Carregado', 'loaded')}
        ${renderLegendDot('Disponível', 'available')}
      </div>
      <div class="patio-finish-modal__legend-right">
        ${renderModalCheckbox('completion-mark-planned', 'Marcar previsto', data.controls.markPlanned)}
        ${renderModalCheckbox('completion-mark-all', 'Marcar todos', data.controls.markAll)}
      </div>
    </div>
  `;
}

function renderFinishModalBody(data) {
  return `
    <div class="patio-finish-modal__content">
      ${renderModalSummary(data.summary)}
      ${renderFinishModalControls(data)}
      <div class="patio-finish-modal__rows">
        ${data.quantificationType === 'kg'
          ? renderKgRow(data.item)
          : data.rows.map((row) => renderBalesRow(row)).join('')}
      </div>
    </div>
  `;
}

function renderFinishModal(data) {
  if (!data) return '';

  const footer = `
    <div class="patio-finish-modal__footer-actions">
      ${Button.create({ text: 'Cancelar', variant: 'dark', style: 'outline', size: 'sm' }).replace('<button ', '<button data-modal-close ')}
      ${Button.create({ text: 'Confirmar Carregamento', variant: 'primary', size: 'sm', iconRight: 'chevronRight' }).replace('<button ', '<button data-modal-confirm ')}
    </div>
  `;

  return Modal.create({
    id: patioModalIds.finishLoading,
    title: data.title,
    description: data.subtitle,
    body: renderFinishModalBody(data),
    footer,
    size: 'xl',
    className: 'patio-finish-modal',
  });
}

export function renderPatioBoard(state) {
  return `
    <div class="patio-board">
      ${renderHeader(state)}
      <section class="patio-board__content" aria-label="Quadro operacional do pátio">
        ${state.columns.map((column) => renderColumn(column)).join('')}
      </section>
      ${renderFinishModal(state.modal.data)}
    </div>
  `;
}



