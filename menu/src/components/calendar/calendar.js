import './calendar.css';

/**
 * Calendar Component
 */

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const icons = {
  chevronLeft: `<svg viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronRight: `<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Gera o HTML do calendário
 */
export function render(options = {}) {
  const {
    date = new Date(),
    selected = null,
    rangeStart = null,
    rangeEnd = null,
    dark = false,
    compact = false,
    showFooter = true,
  } = options;

  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  const classes = ['calendar'];
  if (dark) classes.push('calendar--dark');
  if (compact) classes.push('calendar--compact');

  const daysHtml = generateDays(year, month, { selected, rangeStart, rangeEnd, today });
  const weekdaysHtml = WEEKDAYS.map(d => `<span class="calendar-weekday">${d}</span>`).join('');

  const footerHtml = showFooter ? `
    <div class="calendar-footer">
      <button class="calendar-today-btn" type="button" data-action="today">Hoje</button>
    </div>
  ` : '';

  return `
    <div class="${classes.join(' ')}" data-calendar data-year="${year}" data-month="${month}">
      <div class="calendar-header">
        <span class="calendar-title">${MONTHS[month]} ${year}</span>
        <div class="calendar-nav">
          <button class="calendar-nav-btn" type="button" data-action="prev">${icons.chevronLeft}</button>
          <button class="calendar-nav-btn" type="button" data-action="next">${icons.chevronRight}</button>
        </div>
      </div>
      <div class="calendar-weekdays">${weekdaysHtml}</div>
      <div class="calendar-days">${daysHtml}</div>
      ${footerHtml}
    </div>
  `;
}

/**
 * Gera os dias do mês
 */
function generateDays(year, month, { selected, rangeStart, rangeEnd, today }) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // Dias do mês anterior
  const prevMonth = new Date(year, month, 0);
  const prevDays = prevMonth.getDate();

  let html = '';

  // Dias do mês anterior
  for (let i = startOffset - 1; i >= 0; i--) {
    const day = prevDays - i;
    html += `<button class="calendar-day calendar-day--other" type="button" data-day="${day}" data-month="${month - 1}">${day}</button>`;
  }

  // Dias do mês atual
  for (let day = 1; day <= daysInMonth; day++) {
    const classes = ['calendar-day'];
    const currentDate = new Date(year, month, day);

    // Today
    if (isSameDay(currentDate, today)) {
      classes.push('is-today');
    }

    // Selected
    if (selected && isSameDay(currentDate, selected)) {
      classes.push('is-selected');
    }

    // Range
    if (rangeStart && rangeEnd) {
      if (isSameDay(currentDate, rangeStart)) {
        classes.push('is-range-start');
      } else if (isSameDay(currentDate, rangeEnd)) {
        classes.push('is-range-end');
      } else if (currentDate > rangeStart && currentDate < rangeEnd) {
        classes.push('is-in-range');
      }
    }

    html += `<button class="${classes.join(' ')}" type="button" data-day="${day}" data-month="${month}">${day}</button>`;
  }

  // Dias do próximo mês
  const totalCells = 42; // 6 rows x 7 days
  const remaining = totalCells - (startOffset + daysInMonth);
  for (let day = 1; day <= remaining; day++) {
    html += `<button class="calendar-day calendar-day--other" type="button" data-day="${day}" data-month="${month + 1}">${day}</button>`;
  }

  return html;
}

/**
 * Verifica se duas datas são o mesmo dia
 */
function isSameDay(date1, date2) {
  if (!date1 || !date2) return false;
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
}

/**
 * Renderiza seletor de meses
 */
export function renderMonthPicker(options = {}) {
  const { year = new Date().getFullYear(), selected = null, dark = false } = options;

  const classes = ['calendar'];
  if (dark) classes.push('calendar--dark');

  const monthsHtml = MONTHS.map((name, index) => {
    const isSelected = selected && selected.getMonth() === index;
    const isCurrent = new Date().getMonth() === index;
    const itemClasses = ['calendar-picker-item'];
    if (isSelected) itemClasses.push('is-selected');
    else if (isCurrent) itemClasses.push('is-current');

    return `<button class="${itemClasses.join(' ')}" type="button" data-month="${index}">${name.slice(0, 3)}</button>`;
  }).join('');

  return `
    <div class="${classes.join(' ')}" data-calendar-picker="month">
      <div class="calendar-header">
        <span class="calendar-title">${year}</span>
        <div class="calendar-nav">
          <button class="calendar-nav-btn" type="button" data-action="prev">${icons.chevronLeft}</button>
          <button class="calendar-nav-btn" type="button" data-action="next">${icons.chevronRight}</button>
        </div>
      </div>
      <div class="calendar-picker">${monthsHtml}</div>
    </div>
  `;
}

/**
 * Renderiza seletor de anos
 */
export function renderYearPicker(options = {}) {
  const { startYear = new Date().getFullYear() - 4, selected = null, dark = false } = options;

  const classes = ['calendar'];
  if (dark) classes.push('calendar--dark');

  let yearsHtml = '';
  for (let i = 0; i < 12; i++) {
    const year = startYear + i;
    const isSelected = selected && selected.getFullYear() === year;
    const isCurrent = new Date().getFullYear() === year;
    const itemClasses = ['calendar-picker-item'];
    if (isSelected) itemClasses.push('is-selected');
    else if (isCurrent) itemClasses.push('is-current');

    yearsHtml += `<button class="${itemClasses.join(' ')}" type="button" data-year="${year}">${year}</button>`;
  }

  return `
    <div class="${classes.join(' ')}" data-calendar-picker="year">
      <div class="calendar-header">
        <span class="calendar-title">${startYear} - ${startYear + 11}</span>
        <div class="calendar-nav">
          <button class="calendar-nav-btn" type="button" data-action="prev">${icons.chevronLeft}</button>
          <button class="calendar-nav-btn" type="button" data-action="next">${icons.chevronRight}</button>
        </div>
      </div>
      <div class="calendar-picker">${yearsHtml}</div>
    </div>
  `;
}

/**
 * Inicializa calendários na página
 */
export function init(container = document, onChange = null) {
  const calendars = container.querySelectorAll('[data-calendar]');

  calendars.forEach(calendar => {
    calendar.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      const action = btn.dataset.action;
      const day = btn.dataset.day;
      const month = btn.dataset.month;

      if (action === 'prev' || action === 'next') {
        const currentYear = parseInt(calendar.dataset.year);
        const currentMonth = parseInt(calendar.dataset.month);
        const newDate = new Date(currentYear, currentMonth + (action === 'next' ? 1 : -1), 1);

        const newHtml = render({
          date: newDate,
          dark: calendar.classList.contains('calendar--dark'),
          compact: calendar.classList.contains('calendar--compact'),
        });

        calendar.outerHTML = newHtml;
        init(container, onChange);
      }

      if (action === 'today') {
        const today = new Date();
        const newHtml = render({
          date: today,
          selected: today,
          dark: calendar.classList.contains('calendar--dark'),
          compact: calendar.classList.contains('calendar--compact'),
        });

        calendar.outerHTML = newHtml;
        init(container, onChange);
        if (onChange) onChange(today);
      }

      if (day && month) {
        const year = parseInt(calendar.dataset.year);
        const selectedDate = new Date(year, parseInt(month), parseInt(day));

        // Remove seleção anterior
        calendar.querySelectorAll('.is-selected').forEach(el => el.classList.remove('is-selected'));

        // Adiciona nova seleção
        btn.classList.add('is-selected');

        if (onChange) onChange(selectedDate);
      }
    });
  });
}

export default { render, renderMonthPicker, renderYearPicker, init, MONTHS, WEEKDAYS };
