import * as Badge from '../../../components/badge/badge.js';
import * as Button from '../../../components/button/button.js';
import * as ButtonIcon from '../../../components/button-icon/button-icon.js';
import * as Checkbox from '../../../components/checkbox/checkbox.js';
import * as Chip from '../../../components/chip/chip.js';
import * as Input from '../../../components/input/input.js';
import * as Pagination from '../../../components/pagination/pagination.js';

const blockIcon = `
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2.5L12.5 5V10L8 12.5L3.5 10V5L8 2.5Z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>
    <path d="M3.5 5L8 7.5L12.5 5M8 7.5V12.5" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>
  </svg>
`;

function renderSection(number, title, content, className = '') {
  return `
    <section class="patio-scheduling__section ${className}">
      <header class="patio-scheduling__section-header">
        <span class="patio-scheduling__section-number">${number}</span>
        <h2 class="patio-scheduling__section-title">${title}</h2>
      </header>
      <div class="patio-scheduling__section-body">
        ${content}
      </div>
    </section>
  `;
}

function renderDriverField(field) {
  if (field.id === 'vehiclePlate') {
    return Input.createAutocomplete({
      id: field.id,
      label: field.label,
      value: field.value,
      required: field.required,
      size: 'sm',
      className: 'patio-scheduling__field',
      suggestions: Array.isArray(field.suggestions) ? field.suggestions : [],
      placeholder: 'Digite ao menos 3 caracteres',
    });
  }

  if (field.id === 'driverName') {
    return Input.createAutocomplete({
      id: field.id,
      label: field.label,
      value: field.value,
      required: field.required,
      size: 'sm',
      className: 'patio-scheduling__field',
      suggestions: Array.isArray(field.suggestions) ? field.suggestions : [],
      placeholder: 'Digite ao menos 3 caracteres',
    });
  }

  if (field.id === 'productType') {
    return Input.createSelect({
      id: field.id,
      label: field.label,
      value: field.value,
      required: field.required,
      size: 'sm',
      className: 'patio-scheduling__field',
      items: [
        { value: 'pluma', label: 'Pluma' },
        { value: 'caroco', label: 'Caroco' },
        { value: 'fibrilha', label: 'Fibrilha' },
        { value: 'capulho', label: 'Capulho' },
      ],
      placeholder: 'Selecione...',
    });
  }

  return Input.create({
    id: field.id,
    label: field.label,
    value: field.value,
    required: field.required,
    size: 'sm',
    className: 'patio-scheduling__field',
  });
}

function renderDateField(field) {
  return Input.create({
    id: field.id,
    label: field.label,
    type: 'date',
    value: field.value,
    required: field.required,
    size: 'sm',
    iconRight: Input.default.icons.calendar,
    className: 'patio-scheduling__field patio-scheduling__field--date',
  });
}

function renderAvailableContract(contract) {
  const addButton = ButtonIcon.create({
    icon: 'plus',
    variant: 'info',
    style: 'text',
    size: 'sm',
    shape: 'square',
  }).replace('<button ', `<button data-action="add-contract" data-contract-id="${contract.id}" aria-label="Adicionar ${contract.code}" `);

  return `
    <article class="patio-scheduling__contract-item">
      <div class="patio-scheduling__contract-text">
        <h4 class="patio-scheduling__contract-code">${contract.code}</h4>
        <p class="patio-scheduling__contract-subtitle">${contract.subtitle}</p>
      </div>
      <div class="patio-scheduling__contract-cta">
        ${addButton}
      </div>
    </article>
  `;
}

function renderKgBlockRow(contract, block) {
  return `
    <article class="patio-scheduling__block-card patio-scheduling__block-card--kg">
      <div class="patio-scheduling__block-row patio-scheduling__block-row--kg">
        <div class="patio-scheduling__block-main patio-scheduling__block-main--kg">
          <span class="patio-scheduling__block-icon">${blockIcon}</span>
          <div class="patio-scheduling__block-stack">
            <h5 class="patio-scheduling__block-title">${block.title}</h5>
            <div class="patio-scheduling__kg-badge-wrap">
              ${Badge.create({ text: block.availableKgLabel, variant: 'success', style: 'soft', size: 'sm' })}
            </div>
          </div>
        </div>

        <label class="patio-scheduling__kg-quantity-field">
          <span class="patio-scheduling__kg-quantity-label">${block.quantityLabel}</span>
          <input
            type="text"
            value="${block.quantityValue || ''}"
            class="input input--sm patio-scheduling__kg-quantity-input"
            data-action="update-kg-quantity"
            data-contract-id="${contract.id}"
            data-block-id="${block.id}"
          />
        </label>
      </div>
    </article>
  `;
}

function renderBlockBaleRow(contract, block) {
  const expandedClass = block.isExpanded ? ' is-expanded' : '';
  const toggleIcon = block.isExpanded ? ButtonIcon.getIcon('chevronUp') : ButtonIcon.getIcon('chevronDown');
  const checkbox = Checkbox.create({
    id: `block-${contract.id}-${block.id}`,
    checked: block.selected,
    size: 'sm',
    className: 'patio-scheduling__block-checkbox',
  }).replace('class="checkbox-input"', `class="checkbox-input" data-action="toggle-block-selection" data-contract-id="${contract.id}" data-block-id="${block.id}"`);

  return `
    <article class="patio-scheduling__block-card${expandedClass}">
      <div class="patio-scheduling__block-row">
        <div class="patio-scheduling__block-main">
          <span class="patio-scheduling__block-icon">${blockIcon}</span>
          <h5 class="patio-scheduling__block-title">${block.title}</h5>
        </div>

        <div class="patio-scheduling__block-controls">
          <span class="patio-scheduling__block-availability">${block.availableLabel}</span>
          <label class="patio-scheduling__quantity-wrap">
            <span class="patio-scheduling__quantity-label">${block.maxLabel}</span>
            <input
              type="number"
              min="0"
              max="${block.max}"
              value="${block.quantity}"
              class="input input--sm patio-scheduling__quantity-input"
              data-action="update-block-quantity"
              data-contract-id="${contract.id}"
              data-block-id="${block.id}"
            />
          </label>
          <button
            type="button"
            class="patio-scheduling__block-toggle"
            data-action="toggle-block"
            data-contract-id="${contract.id}"
            data-block-id="${block.id}"
            aria-label="Expandir ${block.title}"
          >
            ${toggleIcon}
          </button>
          ${checkbox}
        </div>
      </div>

      ${block.isExpanded ? `
        <div class="patio-scheduling__bales-panel">
          <div class="patio-scheduling__bales-header">
            <button
              type="button"
              class="patio-scheduling__bales-toggle"
              data-action="toggle-block"
              data-contract-id="${contract.id}"
              data-block-id="${block.id}"
            >
              ${ButtonIcon.getIcon('chevronUp')}
            </button>
            <span class="patio-scheduling__bales-title">Escolher Fardos</span>
          </div>
          <p class="patio-scheduling__bales-helper">Clique nos fardos (${block.bales.filter((item) => item.selected).length} selecionados):</p>
          <div class="patio-scheduling__bales-list">
            ${block.bales.map((bale) => {
              const chip = Chip.createSingle({
                label: bale.label,
                value: bale.id,
                selected: bale.selected,
                size: 'sm',
                className: 'patio-scheduling__bale-chip',
              });
              return chip.replace('<button ', `<button data-action="toggle-bale" data-contract-id="${contract.id}" data-block-id="${block.id}" data-bale-id="${bale.id}" `);
            }).join('')}
          </div>
        </div>
      ` : ''}
    </article>
  `;
}

function renderCargoContractBody(contract) {
  if (!Array.isArray(contract.blocks) || !contract.blocks.length) {
    return `<p class="patio-scheduling__panel-empty">Nenhum detalhe logistico disponivel para este contrato.</p>`;
  }

  if (contract.quantificationType === 'kg') {
    return contract.blocks.map((block) => renderKgBlockRow(contract, block)).join('');
  }

  return contract.blocks.map((block) => renderBlockBaleRow(contract, block)).join('');
}

function renderCargoSummary(contract) {
  if (contract.quantificationType === 'kg') return '';

  return `
    <div class="patio-scheduling__cargo-summary">
      <span><strong>Total de Blocos:</strong> ${contract.totals.blocks}</span>
      <span><strong>Total de Fardos:</strong> ${contract.totals.bales}</span>
    </div>
  `;
}

function renderCargoContract(contract) {
  const removeButton = ButtonIcon.create({
    icon: 'trash',
    variant: 'error',
    style: 'text',
    size: 'sm',
    shape: 'square',
  }).replace('<button ', `<button data-action="remove-contract" data-contract-id="${contract.id}" aria-label="Remover ${contract.code}" `);

  return `
    <article class="patio-scheduling__cargo-card patio-scheduling__cargo-card--${contract.quantificationType}">
      <header class="patio-scheduling__cargo-card-header">
        <div>
          <h4 class="patio-scheduling__cargo-code">${contract.code}</h4>
          <p class="patio-scheduling__cargo-subtitle">${contract.subtitle}</p>
          ${renderCargoSummary(contract)}
        </div>
        ${removeButton}
      </header>

      <div class="patio-scheduling__cargo-blocks">
        ${renderCargoContractBody(contract)}
      </div>
    </article>
  `;
}

export function renderDriverSection(driverFields) {
  return renderSection(
    1,
    'Dados do Motorista',
    `<div class="patio-scheduling__fields-row">${driverFields.map((field) => renderDriverField(field)).join('')}</div>`,
    'patio-scheduling__section--compact',
  );
}

const WEEKDAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS_PT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function buildAgendaMap(agendaCatalog, selectedProduct) {
  const map = {};
  if (!selectedProduct || !Array.isArray(agendaCatalog)) return map;
  const prod = String(selectedProduct).trim().toLowerCase();
  agendaCatalog.forEach((item) => {
    const itemProd = String(item?.tipo_produto || '').trim().toLowerCase();
    if (itemProd !== prod) return;
    const dateKey = String(item?.data_carregamento || '').slice(0, 10);
    if (!dateKey) return;
    const vagasTotal = Number(item?.vagas_total ?? 0);
    const vagasOcupadas = Number(item?.vagas_ocupadas ?? 0);
    const status = String(item?.status || '').toLowerCase();
    if (status === 'blocked') {
      map[dateKey] = { color: 'red', tooltip: String(item?.mensagem_bloqueio || 'Bloqueado') };
    } else if (vagasTotal > 0 && vagasOcupadas >= vagasTotal) {
      map[dateKey] = { color: 'yellow', tooltip: `${vagasOcupadas}/${vagasTotal} vagas ocupadas` };
    } else if (vagasTotal > 0) {
      map[dateKey] = { color: 'green', tooltip: `${vagasTotal - vagasOcupadas} vaga(s) disponível(is)` };
    }
  });
  return map;
}

function renderMiniCalendar(dateField, agendaCatalog, selectedProduct, calendarMonth) {
  const today = new Date();
  const year = calendarMonth?.year ?? today.getFullYear();
  const month = calendarMonth?.month ?? today.getMonth();
  const agendaMap = buildAgendaMap(agendaCatalog, selectedProduct);
  const selectedIso = String(dateField.value || '');

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay();

  const days = [];
  for (let i = 0; i < startDow; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);

  const pad = (n) => String(n).padStart(2, '0');
  const rows = [];
  for (let w = 0; w < days.length / 7; w++) {
    const cells = days.slice(w * 7, w * 7 + 7).map((d) => {
      if (!d) return '<td class="sched-cal__cell sched-cal__cell--empty"></td>';
      const iso = `${year}-${pad(month + 1)}-${pad(d)}`;
      const info = agendaMap[iso];
      const colorClass = info ? `sched-cal__cell--${info.color}` : '';
      const todayClass = (iso === `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`) ? 'sched-cal__cell--today' : '';
      const selectedClass = iso === selectedIso ? 'sched-cal__cell--selected' : '';
      const tooltip = info?.tooltip ? `title="${info.tooltip.replace(/"/g, '&quot;')}"` : '';
      return `<td class="sched-cal__cell ${colorClass} ${todayClass} ${selectedClass}" data-action="calendar-day" data-date="${iso}" ${tooltip}>${d}</td>`;
    }).join('');
    rows.push(`<tr>${cells}</tr>`);
  }

  return `
    <div class="sched-cal">
      <div class="sched-cal__header">
        <button type="button" class="sched-cal__nav" data-action="calendar-prev-month" aria-label="Mês anterior">&#8249;</button>
        <span class="sched-cal__month-label">${MONTHS_PT[month]} ${year}</span>
        <button type="button" class="sched-cal__nav" data-action="calendar-next-month" aria-label="Próximo mês">&#8250;</button>
      </div>
      <table class="sched-cal__table">
        <thead>
          <tr>${WEEKDAYS_SHORT.map((d) => `<th class="sched-cal__weekday">${d}</th>`).join('')}</tr>
        </thead>
        <tbody>${rows.join('')}</tbody>
      </table>
      ${selectedIso ? `<p class="sched-cal__selected-label">Selecionado: <strong>${selectedIso.split('-').reverse().join('/')}</strong></p>` : ''}
    </div>
    <input type="hidden" id="${dateField.id}" name="${dateField.id}" value="${selectedIso}" />
  `;
}

export function renderDateSection(dateField, agendaCatalog = [], selectedProduct = '', calendarMonth = null) {
  return renderSection(
    2,
    'Escolher Data',
    `<div class="patio-scheduling__date-field-wrap">${renderMiniCalendar(dateField, agendaCatalog, selectedProduct, calendarMonth)}</div>`,
    'patio-scheduling__section--compact patio-scheduling__section--date',
  );
}

export function renderContractsSection(state, podeConfigurarCarga = false) {
  if (!podeConfigurarCarga) {
    const content = '<p class="patio-scheduling__panel-empty">Você não tem permissão para configurar carga. Esta ação é restrita a usuários vinculados como transportadora.</p>';
    return renderSection(3, 'Selecionar Contrato e Configurar Carga', content, 'patio-scheduling__section--disabled');
  }
  const selectedProduct = state.driverFields?.find((f) => f.id === 'productType')?.value;

  if (!selectedProduct) {
    const placeholder = '<p class="patio-scheduling__panel-empty">Selecione o tipo de produto para visualizar os contratos disponíveis.</p>';
    const content = `
      <div class="patio-scheduling__contracts-grid">
        <section class="patio-scheduling__panel patio-scheduling__panel--available">
          <header class="patio-scheduling__panel-header">
            <h3 class="patio-scheduling__panel-title">1. Contratos Disponiveis</h3>
            <span class="patio-scheduling__panel-count">0</span>
          </header>
          <div class="patio-scheduling__panel-body patio-scheduling__panel-body--list">${placeholder}</div>
        </section>
        <section class="patio-scheduling__panel patio-scheduling__panel--cargo">
          <header class="patio-scheduling__panel-header">
            <h3 class="patio-scheduling__panel-title">2. Contratos na Carga</h3>
            <span class="patio-scheduling__panel-count">0</span>
          </header>
          <div class="patio-scheduling__panel-body patio-scheduling__panel-body--cargo">${placeholder}</div>
          <div class="patio-scheduling__confirm-action">
            ${Button.create({ text: 'Confirmar Agendamento', variant: 'primary', size: 'sm' }).replace('<button ', '<button data-action="confirm-scheduling" ')}
          </div>
        </section>
      </div>
    `;
    return renderSection(3, 'Selecionar Contrato e Configurar Carga', content);
  }

  const availableContent = state.availableContracts.length
    ? state.availableContracts.map((contract) => renderAvailableContract(contract)).join('')
    : '<p class="patio-scheduling__panel-empty">Nenhum contrato disponivel para o filtro atual.</p>';

  const cargoContent = state.cargoContracts.length
    ? state.cargoContracts.map((contract) => renderCargoContract(contract)).join('')
    : '<p class="patio-scheduling__panel-empty">Nenhum contrato selecionado para a carga.</p>';

  const content = `
    <div class="patio-scheduling__contracts-grid">
      <section class="patio-scheduling__panel patio-scheduling__panel--available">
        <header class="patio-scheduling__panel-header">
          <h3 class="patio-scheduling__panel-title">1. Contratos Disponiveis</h3>
          <span class="patio-scheduling__panel-count">${state.availableContracts.length}</span>
        </header>
        <div class="patio-scheduling__panel-body patio-scheduling__panel-body--list">
          ${availableContent}
        </div>
      </section>

      <section class="patio-scheduling__panel patio-scheduling__panel--cargo">
        <header class="patio-scheduling__panel-header">
          <h3 class="patio-scheduling__panel-title">2. Contratos na Carga</h3>
          <span class="patio-scheduling__panel-count">${state.cargoContracts.length}</span>
        </header>
        <div class="patio-scheduling__panel-body patio-scheduling__panel-body--cargo">
          ${cargoContent}
        </div>
        <div class="patio-scheduling__confirm-action">
          ${Button.create({ text: 'Confirmar Agendamento', variant: 'primary', size: 'sm' }).replace('<button ', '<button data-action="confirm-scheduling" ')}
        </div>
      </section>
    </div>
  `;

  return renderSection(3, 'Selecionar Contrato e Configurar Carga', content);
}

export function renderTableSection(rows, pagination) {
  const paginationHtml = Pagination.createSimple({
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    size: 'sm',
  });

  const entryOptions = pagination.entriesOptions.map((option) => `
    <option value="${option}" ${option === pagination.itemsPerPage ? 'selected' : ''}>${option} Entradas</option>
  `).join('');

  const bodyRows = rows.length
    ? rows.map((row) => `
      <tr>
        <td>${row.code}</td>
        <td>${row.producer}</td>
        <td>${row.buyer}</td>
        <td>${row.appointmentDate}</td>
        <td>${row.branch}</td>
        <td>${row.driver}</td>
        <td>${row.truck}</td>
        <td>
          <div class="patio-scheduling__table-actions">
            <button type="button" class="patio-scheduling__table-link" data-action="loading-order" data-row-id="${row.id}">Ordem de Carregamento</button>
            ${row.canCancel ? `<button type="button" class="patio-scheduling__table-link patio-scheduling__table-link--danger" data-action="cancel-scheduling" data-row-id="${row.id}">Cancelar</button>` : ''}
          </div>
        </td>
      </tr>
    `).join('')
    : '<tr><td colspan="8">Nenhum agendamento encontrado.</td></tr>';

  return `
    <section class="patio-scheduling__table-surface">
      <div class="patio-scheduling__table-wrap">
        <table class="patio-scheduling__table">
          <thead>
            <tr>
              <th>Codigo/Contrato</th>
              <th>Produtor</th>
              <th>Comprador</th>
              <th>Data agendamento</th>
              <th>Filial</th>
              <th>Motorista</th>
              <th>Caminhao</th>
              <th>Acao</th>
            </tr>
          </thead>
          <tbody>
            ${bodyRows}
          </tbody>
        </table>
      </div>

      <footer class="patio-scheduling__table-footer">
        <label class="patio-scheduling__entries-select-wrap">
          <select class="patio-scheduling__entries-select" data-action="entries-change">
            ${entryOptions}
          </select>
        </label>
        <div class="patio-scheduling__pagination-wrap">
          ${paginationHtml}
        </div>
      </footer>
    </section>
  `;
}
