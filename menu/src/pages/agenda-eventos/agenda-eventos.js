import * as Drawer from '../../components/drawer/drawer.js';

const MONTH_NAMES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

const WEEKDAY_NAMES = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];

const CAPACITY_BY_DATE = {
  '2026-01-01': 'normal',
  '2026-01-02': 'normal',
  '2026-01-03': 'warning',
  '2026-01-04': 'normal',
  '2026-01-05': 'critical',
  '2026-01-06': 'warning',
  '2026-01-07': 'normal',
  '2026-01-08': 'normal',
  '2026-01-09': 'warning',
  '2026-01-10': 'critical',
  '2026-01-11': 'normal',
  '2026-01-12': 'warning',
  '2026-01-13': 'normal',
  '2026-01-14': 'normal',
  '2026-01-15': 'critical',
  '2026-01-16': 'normal',
  '2026-01-17': 'normal',
  '2026-01-18': 'warning',
  '2026-01-19': 'normal',
  '2026-01-20': 'critical',
  '2026-01-21': 'warning',
  '2026-01-22': 'normal',
  '2026-01-23': 'normal',
  '2026-01-24': 'warning',
  '2026-01-25': 'critical',
  '2026-01-26': 'normal',
  '2026-01-27': 'warning',
  '2026-01-28': 'normal',
  '2026-01-29': 'normal',
  '2026-01-30': 'critical',
  '2026-01-31': 'normal',
};

const EVENTS = [
  { id: 'evt-001', date: '2026-01-17', time: '08:00', endTime: '09:00', label: 'Semeio Lote A - Tomate', subtitle: 'Estufa 3 - 5.000 mudas', tone: 'blue', category: 'producao' },
  { id: 'evt-002', date: '2026-01-17', time: '14:00', endTime: '16:00', label: 'Entrega Fazenda Sol', subtitle: 'Rota Norte - Caminhão 2', tone: 'orange', category: 'expedicao' },
  { id: 'evt-003', date: '2026-01-17', time: '10:00', endTime: '11:00', label: 'Manutenção Irrigação', subtitle: 'Setor 2', tone: 'green', category: 'operacoes' },
  { id: 'evt-004', date: '2026-01-18', label: 'Vistoria Fitossanitária', tone: 'green', category: 'operacoes' },
  { id: 'evt-005', date: '2026-01-19', label: 'Prazo Pedido #45', tone: 'blue', category: 'pedidos' },
  { id: 'evt-006', date: '2026-01-22', label: 'Enxertia Lote B', tone: 'blue', category: 'producao' },
];

const CATEGORY_BY_TONE = {
  blue: 'producao',
  orange: 'expedicao',
  green: 'operacoes',
  gray: 'pedidos',
};

const NEW_EVENT_DRAWER_ID = 'agenda-eventos-new-event-drawer';
const EVENT_DETAILS_DRAWER_ID = 'agenda-eventos-event-details-drawer';
const DAY_VIEW_START_HOUR = 8;
const DAY_VIEW_END_HOUR = 17;

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function fromDateKey(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function buildMonthCells(referenceDate) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const firstDayWeekday = new Date(year, month, 1).getDay();
  const startDate = new Date(year, month, 1 - firstDayWeekday);
  const cells = [];

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    cells.push(date);
  }

  return cells;
}

function buildWeekCells(referenceDate) {
  const weekday = referenceDate.getDay();
  const firstDay = new Date(referenceDate);
  firstDay.setDate(referenceDate.getDate() - weekday);
  const days = [];

  for (let index = 0; index < 7; index += 1) {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + index);
    days.push(date);
  }

  return days;
}

function groupEventsByDate(events) {
  return events.reduce((accumulator, event) => {
    if (!event?.date) return accumulator;
    if (!accumulator[event.date]) accumulator[event.date] = [];
    accumulator[event.date].push(event);
    return accumulator;
  }, {});
}

function parseTimeToMinutes(value) {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) return Number.MAX_SAFE_INTEGER;
  const [hour, minute] = value.split(':').map(Number);
  return (hour * 60) + minute;
}

function formatMinutesToTime(value) {
  const minutes = Number.isFinite(value) ? value : 0;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatDateForInput(dateKey) {
  if (!dateKey) return '';
  const [year, month, day] = dateKey.split('-');
  if (!year || !month || !day) return '';
  return `${day}/${month}/${year}`;
}

function categoryLabel(category) {
  const labels = {
    producao: 'Produção',
    expedicao: 'Expedição',
    operacoes: 'Operações',
    pedidos: 'Pedidos',
  };
  return labels[category] || 'Produção';
}

function createNewEventDrawerContent() {
  return `
    <section class="agenda-new-event-drawer">
      <form class="agenda-new-event-drawer__form" data-new-event-form>
        <div class="agenda-new-event-drawer__field">
          <label class="agenda-new-event-drawer__label" for="agenda-new-event-title">Título da Atividade</label>
          <input id="agenda-new-event-title" name="title" type="text" class="agenda-new-event-drawer__input" data-drawer-autofocus />
        </div>

        <div class="agenda-new-event-drawer__row">
          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-new-event-date">Data</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <input id="agenda-new-event-date" name="date" type="text" class="agenda-new-event-drawer__input" placeholder="00/00/0000" />
              <span class="agenda-new-event-drawer__input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M7 3V6M17 3V6M4 9H20M6 5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-new-event-category">Categoria</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <select id="agenda-new-event-category" name="category" class="agenda-new-event-drawer__input agenda-new-event-drawer__select">
                <option value="">Selecione</option>
                <option value="producao">Produção</option>
                <option value="expedicao">Expedição</option>
                <option value="operacoes">Operações</option>
                <option value="pedidos">Pedidos</option>
              </select>
            </div>
          </div>
        </div>

        <div class="agenda-new-event-drawer__row">
          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-new-event-start-time">Hora Início</label>
            <input id="agenda-new-event-start-time" name="startTime" type="text" class="agenda-new-event-drawer__input" placeholder="00:00" />
          </div>

          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-new-event-end-time">Hora Fim</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <input id="agenda-new-event-end-time" name="endTime" type="text" class="agenda-new-event-drawer__input" placeholder="00:00" />
              <span class="agenda-new-event-drawer__input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" />
                  <path d="M12 8V12L15 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div class="agenda-new-event-drawer__field">
          <label class="agenda-new-event-drawer__label" for="agenda-new-event-details">Detalhes / Observações</label>
          <textarea id="agenda-new-event-details" name="details" class="agenda-new-event-drawer__textarea"></textarea>
        </div>
      </form>
    </section>
  `;
}

function createNewEventDrawerFooter() {
  return `
    <div class="agenda-new-event-drawer__footer">
      <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--danger-outline" data-new-event-action="delete">Excluir evento</button>
      <div class="agenda-new-event-drawer__footer-right">
        <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--ghost" data-new-event-action="cancel">Cancelar</button>
        <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--primary" data-new-event-action="save">Salvar</button>
      </div>
    </div>
  `;
}

function createEventDetailsDrawerContent(eventData) {
  const eventCategory = eventData?.category || CATEGORY_BY_TONE[eventData?.tone] || 'producao';

  return `
    <section class="agenda-new-event-drawer agenda-new-event-drawer--details">
      <p class="agenda-event-details-drawer__subtitle">Visualize ou edite as informações.</p>
      <form class="agenda-new-event-drawer__form" data-event-details-form>
        <div class="agenda-new-event-drawer__field">
          <label class="agenda-new-event-drawer__label" for="agenda-event-details-title">Título da Atividade</label>
          <input id="agenda-event-details-title" name="title" type="text" class="agenda-new-event-drawer__input" value="${escapeHtml(eventData?.label || '')}" data-drawer-autofocus />
        </div>

        <div class="agenda-new-event-drawer__row">
          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-event-details-date">Data</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <input id="agenda-event-details-date" name="date" type="text" class="agenda-new-event-drawer__input" value="${escapeHtml(formatDateForInput(eventData?.date || ''))}" />
              <span class="agenda-new-event-drawer__input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M7 3V6M17 3V6M4 9H20M6 5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-event-details-category">Categoria</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <select id="agenda-event-details-category" name="category" class="agenda-new-event-drawer__input agenda-new-event-drawer__select">
                <option value="producao" ${eventCategory === 'producao' ? 'selected' : ''}>Produção</option>
                <option value="expedicao" ${eventCategory === 'expedicao' ? 'selected' : ''}>Expedição</option>
                <option value="operacoes" ${eventCategory === 'operacoes' ? 'selected' : ''}>Operações</option>
                <option value="pedidos" ${eventCategory === 'pedidos' ? 'selected' : ''}>Pedidos</option>
              </select>
            </div>
          </div>
        </div>

        <div class="agenda-new-event-drawer__row">
          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-event-details-start-time">Hora Início</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <input id="agenda-event-details-start-time" name="startTime" type="text" class="agenda-new-event-drawer__input" value="${escapeHtml(eventData?.time || '00:00')}" />
              <span class="agenda-new-event-drawer__input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" />
                  <path d="M12 8V12L15 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
          </div>

          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-event-details-end-time">Hora Fim</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <input id="agenda-event-details-end-time" name="endTime" type="text" class="agenda-new-event-drawer__input" value="/" />
              <span class="agenda-new-event-drawer__input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" />
                  <path d="M12 8V12L15 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div class="agenda-new-event-drawer__field">
          <label class="agenda-new-event-drawer__label" for="agenda-event-details-notes">Detalhes / Observações</label>
          <textarea id="agenda-event-details-notes" name="notes" class="agenda-new-event-drawer__textarea"></textarea>
        </div>
      </form>
    </section>
  `;
}

function createEventDetailsDrawerFooter() {
  return `
    <div class="agenda-new-event-drawer__footer">
      <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--danger-outline" data-event-details-action="delete">Excluir evento</button>
      <div class="agenda-new-event-drawer__footer-right">
        <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--ghost" data-event-details-action="cancel">Cancelar</button>
        <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--primary" data-event-details-action="save">Salvar</button>
      </div>
    </div>
  `;
}

function removeDrawerElements(drawerId) {
  document.querySelector(`[data-drawer="${drawerId}"]`)?.remove();
  document.querySelector(`[data-drawer-backdrop="${drawerId}"]`)?.remove();
}

export function init() {
  const monthLabelElement = document.getElementById('agenda-month-label');
  const calendarGridElement = document.getElementById('agenda-calendar-grid');
  const calendarWeekdaysElement = document.querySelector('.agenda-calendar__weekdays');
  const sidebarElement = document.querySelector('.agenda-capacity-sidebar');
  const filterCardElement = document.querySelector('[data-role="week-filters"]');
  const topElement = document.querySelector('.agenda-eventos-top');
  const viewToggleButtons = Array.from(document.querySelectorAll('[data-action="set-view"]'));
  const filterInputs = Array.from(document.querySelectorAll('[data-action="toggle-week-filter"]'));
  const backButton = document.querySelector('[data-action="back"]');
  const todayButton = document.querySelector('[data-action="today"]');
  const prevMonthButton = document.querySelector('[data-action="prev-month"]');
  const nextMonthButton = document.querySelector('[data-action="next-month"]');
  const newEventButton = document.querySelector('[data-action="new-event"]');
  let newEventDrawerControls = null;
  let newEventDrawerElement = null;
  let newEventDrawerClickHandler = null;
  let eventDetailsDrawerControls = null;
  let eventDetailsDrawerElement = null;
  let eventDetailsDrawerClickHandler = null;

  if (!monthLabelElement || !calendarGridElement || !topElement) {
    console.error('[agenda-eventos] elementos base não encontrados para inicialização');
    return () => {};
  }

  const state = {
    currentDate: new Date(2026, 0, 1),
    selectedDateKey: '2026-01-17',
    view: 'month',
    filters: {
      producao: true,
      expedicao: true,
      operacoes: true,
      pedidos: true,
    },
  };

  const eventsByDate = groupEventsByDate(EVENTS);
  const eventsById = EVENTS.reduce((accumulator, event, index) => {
    const eventId = event.id || `evt-${index + 1}`;
    accumulator[eventId] = { ...event, id: eventId };
    return accumulator;
  }, {});

  const updateMonthLabel = () => {
    const monthName = MONTH_NAMES[state.currentDate.getMonth()] || '';
    monthLabelElement.textContent = `${monthName} ${state.currentDate.getFullYear()}`;
  };

  const updateViewToggle = () => {
    viewToggleButtons.forEach((button) => {
      const isActive = button.dataset.view === state.view;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', String(isActive));
    });
  };

  const updateLayoutByView = () => {
    const isMonth = state.view === 'month';
    const isWeek = state.view === 'week';
    const isDay = state.view === 'day';

    calendarWeekdaysElement?.classList.toggle('is-hidden', !isMonth);
    calendarGridElement.classList.toggle('is-week-view', isWeek);
    calendarGridElement.classList.toggle('is-day-view', isDay);
    filterCardElement?.classList.toggle('is-hidden', !(isWeek || isDay));
    sidebarElement?.classList.toggle('is-week-view', isWeek || isDay);
  };

  const renderMonthGrid = () => {
    const cells = buildMonthCells(state.currentDate);
    const visibleMonth = state.currentDate.getMonth();
    const fragment = document.createDocumentFragment();

    cells.forEach((date) => {
      const isMuted = date.getMonth() !== visibleMonth;
      const dateKey = toDateKey(date);
      const cell = document.createElement('article');
      cell.className = 'agenda-calendar__cell';
      cell.dataset.dateKey = dateKey;

      const day = document.createElement('span');
      day.className = 'agenda-day';
      if (isMuted) day.classList.add('is-muted');
      if (dateKey === state.selectedDateKey) day.classList.add('is-selected');
      day.textContent = String(date.getDate());
      cell.appendChild(day);

      const level = CAPACITY_BY_DATE[dateKey];
      if (level && !isMuted) {
        const line = document.createElement('div');
        line.className = 'agenda-capacity-line';
        line.dataset.level = level;
        line.innerHTML = '<span></span>';
        cell.appendChild(line);
      }

      if (!isMuted && eventsByDate[dateKey]) {
        eventsByDate[dateKey].forEach((event) => {
          const pill = document.createElement('div');
          pill.className = `agenda-event-pill agenda-event-pill--${event.tone || 'blue'}`;
          pill.dataset.eventId = event.id || '';
          pill.title = event.label;
          pill.textContent = event.label;
          cell.appendChild(pill);
        });
      }

      fragment.appendChild(cell);
    });

    calendarGridElement.replaceChildren(fragment);
  };

  const renderWeekGrid = () => {
    const referenceDate = fromDateKey(state.selectedDateKey);
    const weekCells = buildWeekCells(referenceDate);
    const weekContainer = document.createElement('section');
    weekContainer.className = 'agenda-week';

    const weekGrid = document.createElement('div');
    weekGrid.className = 'agenda-week__grid';

    weekCells.forEach((date) => {
      const dateKey = toDateKey(date);
      const dayColumn = document.createElement('article');
      dayColumn.className = 'agenda-week__column';
      dayColumn.dataset.dayKey = dateKey;

      const header = document.createElement('header');
      header.className = 'agenda-week__header';
      if (dateKey === state.selectedDateKey) header.classList.add('is-selected');

      const weekday = document.createElement('span');
      weekday.className = 'agenda-week__weekday';
      weekday.textContent = WEEKDAY_NAMES[date.getDay()] || '';
      header.appendChild(weekday);

      const dayNumber = document.createElement('strong');
      dayNumber.className = 'agenda-week__day-number';
      dayNumber.textContent = String(date.getDate());
      header.appendChild(dayNumber);

      const level = CAPACITY_BY_DATE[dateKey];
      if (level) {
        const capacityLine = document.createElement('div');
        capacityLine.className = 'agenda-week__capacity';
        capacityLine.dataset.level = level;
        capacityLine.innerHTML = '<span></span>';
        header.appendChild(capacityLine);
      }

      dayColumn.appendChild(header);

      const body = document.createElement('div');
      body.className = 'agenda-week__body';
      const dayEvents = (eventsByDate[dateKey] || [])
        .filter((event) => {
          const category = event.category || CATEGORY_BY_TONE[event.tone] || 'pedidos';
          return state.filters[category] !== false;
        })
        .sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time));

      dayEvents.forEach((event) => {
        const eventCard = document.createElement('article');
        eventCard.className = `agenda-week-event agenda-week-event--${event.tone || 'gray'}`;
        eventCard.dataset.eventId = event.id || '';
        eventCard.innerHTML = `
          <strong>${event.time || '--:--'}</strong>
          <span>${event.label}</span>
        `;
        body.appendChild(eventCard);
      });

      dayColumn.appendChild(body);
      weekGrid.appendChild(dayColumn);
    });

    weekContainer.appendChild(weekGrid);
    calendarGridElement.replaceChildren(weekContainer);
  };

  const renderDayGrid = () => {
    const dateKey = state.selectedDateKey;
    const startMinutes = DAY_VIEW_START_HOUR * 60;
    const endMinutes = DAY_VIEW_END_HOUR * 60;
    const totalMinutes = endMinutes - startMinutes;
    const intervals = DAY_VIEW_END_HOUR - DAY_VIEW_START_HOUR;

    const dayContainer = document.createElement('section');
    dayContainer.className = 'agenda-day-timeline';

    const timelineGrid = document.createElement('div');
    timelineGrid.className = 'agenda-day-timeline__grid';
    timelineGrid.dataset.dayKey = dateKey;

    const timesColumn = document.createElement('div');
    timesColumn.className = 'agenda-day-timeline__times';

    const track = document.createElement('div');
    track.className = 'agenda-day-timeline__track';
    track.dataset.dayKey = dateKey;

    const lines = document.createElement('div');
    lines.className = 'agenda-day-timeline__lines';
    lines.style.gridTemplateRows = `repeat(${intervals}, 1fr)`;

    for (let hour = DAY_VIEW_START_HOUR; hour <= DAY_VIEW_END_HOUR; hour += 1) {
      const timeLabel = document.createElement('span');
      timeLabel.className = 'agenda-day-timeline__time-label';
      timeLabel.textContent = `${String(hour).padStart(2, '0')}:00`;
      timesColumn.appendChild(timeLabel);

      if (hour < DAY_VIEW_END_HOUR) {
        const line = document.createElement('div');
        line.className = 'agenda-day-timeline__line';
        lines.appendChild(line);
      }
    }

    const eventsLayer = document.createElement('div');
    eventsLayer.className = 'agenda-day-timeline__events';

    const dayEvents = (eventsByDate[dateKey] || [])
      .filter((event) => {
        const category = event.category || CATEGORY_BY_TONE[event.tone] || 'pedidos';
        return state.filters[category] !== false;
      })
      .sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time));

    dayEvents.forEach((event) => {
      const start = parseTimeToMinutes(event.time);
      if (!Number.isFinite(start) || start === Number.MAX_SAFE_INTEGER) return;

      const fallbackEnd = start + 60;
      const parsedEnd = parseTimeToMinutes(event.endTime);
      const rawEnd = Number.isFinite(parsedEnd) && parsedEnd !== Number.MAX_SAFE_INTEGER ? parsedEnd : fallbackEnd;
      const end = Math.max(rawEnd, start + 30);

      const clampedStart = Math.max(start, startMinutes);
      const clampedEnd = Math.min(end, endMinutes);
      if (clampedEnd <= clampedStart) return;

      const topPercent = ((clampedStart - startMinutes) / totalMinutes) * 100;
      const heightPercent = ((clampedEnd - clampedStart) / totalMinutes) * 100;

      const eventCard = document.createElement('article');
      eventCard.className = `agenda-day-event agenda-day-event--${event.tone || 'gray'}`;
      eventCard.dataset.eventId = event.id || '';
      eventCard.style.setProperty('--event-top', `${topPercent}%`);
      eventCard.style.setProperty('--event-height', `${Math.max(heightPercent, 8)}%`);

      const eventRange = `${formatMinutesToTime(start)} - ${formatMinutesToTime(end)}`;
      const subtitle = event.subtitle ? `<p>${escapeHtml(event.subtitle)}</p>` : '';
      eventCard.innerHTML = `
        <div class="agenda-day-event__head">
          <strong>${escapeHtml(event.label || '')}</strong>
          <span>${eventRange}</span>
        </div>
        ${subtitle}
      `;

      eventsLayer.appendChild(eventCard);
    });

    track.appendChild(lines);
    track.appendChild(eventsLayer);
    timelineGrid.appendChild(timesColumn);
    timelineGrid.appendChild(track);
    dayContainer.appendChild(timelineGrid);
    calendarGridElement.replaceChildren(dayContainer);
  };

  const renderView = () => {
    updateLayoutByView();

    if (state.view === 'month') {
      renderMonthGrid();
      return;
    }

    if (state.view === 'week') {
      renderWeekGrid();
      return;
    }
    if (state.view === 'day') {
      renderDayGrid();
      return;
    }
  };

  const render = () => {
    updateMonthLabel();
    updateViewToggle();
    renderView();
  };

  const handleBackClick = () => {
    window.location.hash = '#/kanban-producao';
  };

  const handleTodayClick = () => {
    const now = new Date();
    state.currentDate = new Date(now.getFullYear(), now.getMonth(), 1);
    state.selectedDateKey = toDateKey(now);
    render();
  };

  const handlePrevMonthClick = () => {
    if (state.view === 'week') {
      const referenceDate = fromDateKey(state.selectedDateKey);
      referenceDate.setDate(referenceDate.getDate() - 7);
      state.selectedDateKey = toDateKey(referenceDate);
      state.currentDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
      render();
      return;
    }

    if (state.view === 'day') {
      const referenceDate = fromDateKey(state.selectedDateKey);
      referenceDate.setDate(referenceDate.getDate() - 1);
      state.selectedDateKey = toDateKey(referenceDate);
      state.currentDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
      render();
      return;
    }

    state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1, 1);
    render();
  };

  const handleNextMonthClick = () => {
    if (state.view === 'week') {
      const referenceDate = fromDateKey(state.selectedDateKey);
      referenceDate.setDate(referenceDate.getDate() + 7);
      state.selectedDateKey = toDateKey(referenceDate);
      state.currentDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
      render();
      return;
    }

    if (state.view === 'day') {
      const referenceDate = fromDateKey(state.selectedDateKey);
      referenceDate.setDate(referenceDate.getDate() + 1);
      state.selectedDateKey = toDateKey(referenceDate);
      state.currentDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
      render();
      return;
    }

    state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 1);
    render();
  };

  const handleTopClick = (event) => {
    const viewButton = event.target.closest('[data-action="set-view"]');
    if (!viewButton || !topElement.contains(viewButton)) return;
    const selectedView = viewButton.dataset.view;
    if (!selectedView || state.view === selectedView) return;
    state.view = selectedView;
    render();
  };

  const handleFilterChange = (event) => {
    const checkbox = event.target.closest('[data-action="toggle-week-filter"]');
    if (!checkbox) return;
    state.filters[checkbox.value] = checkbox.checked;
    if (state.view === 'week') render();
  };

  const handleCalendarClick = (event) => {
    if (event.target.closest('[data-event-id]')) return;

    const dayElement = event.target.closest('[data-date-key], [data-day-key]');
    if (!dayElement || !calendarGridElement.contains(dayElement)) return;

    const dateKey = dayElement.dataset.dateKey || dayElement.dataset.dayKey;
    if (!dateKey || dateKey === state.selectedDateKey) return;

    state.selectedDateKey = dateKey;
    const selectedDate = fromDateKey(dateKey);
    state.currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    render();
  };

  const handleEventClick = (event) => {
    const eventElement = event.target.closest('[data-event-id]');
    if (!eventElement || !calendarGridElement.contains(eventElement)) return;

    const eventId = eventElement.dataset.eventId;
    const eventData = eventId ? eventsById[eventId] : null;
    if (!eventData) return;

    if (!eventDetailsDrawerControls) {
      removeDrawerElements(EVENT_DETAILS_DRAWER_ID);

      const drawerHtml = Drawer.create({
        id: EVENT_DETAILS_DRAWER_ID,
        title: 'Detalhes do Evento',
        width: 336,
        content: createEventDetailsDrawerContent(eventData),
        footer: createEventDetailsDrawerFooter(),
      });
      document.body.insertAdjacentHTML('beforeend', drawerHtml);

      eventDetailsDrawerControls = Drawer.init({ id: EVENT_DETAILS_DRAWER_ID, root: document });
      eventDetailsDrawerElement = document.querySelector(`[data-drawer="${EVENT_DETAILS_DRAWER_ID}"]`);

      if (eventDetailsDrawerElement) {
        const handleDrawerClick = (drawerEvent) => {
          const actionButton = drawerEvent.target.closest('[data-event-details-action]');
          if (!actionButton || !eventDetailsDrawerElement.contains(actionButton)) return;
          const action = actionButton.dataset.eventDetailsAction;
          if (action === 'cancel' || action === 'delete') {
            eventDetailsDrawerControls?.close();
            return;
          }
          if (action === 'save') {
            const formElement = eventDetailsDrawerElement.querySelector('[data-event-details-form]');
            const formData = formElement ? Object.fromEntries(new FormData(formElement).entries()) : {};
            console.log('[agenda-eventos] detalhes do evento', { eventId, ...formData });
            eventDetailsDrawerControls?.close();
          }
        };

        eventDetailsDrawerElement.addEventListener('click', handleDrawerClick);
        eventDetailsDrawerClickHandler = handleDrawerClick;
      }
    } else if (eventDetailsDrawerElement) {
      eventDetailsDrawerElement.querySelector('.drawer__title')?.replaceChildren(document.createTextNode('Detalhes do Evento'));
      const bodyElement = eventDetailsDrawerElement.querySelector('.drawer__body');
      const footerElement = eventDetailsDrawerElement.querySelector('.drawer__footer');
      if (bodyElement) bodyElement.innerHTML = createEventDetailsDrawerContent(eventData);
      if (footerElement) footerElement.innerHTML = createEventDetailsDrawerFooter();
    }

    eventDetailsDrawerControls?.open(eventElement);
  };

  const handleNewEventClick = () => {
    if (!newEventDrawerControls) {
      document.querySelector(`[data-drawer="${NEW_EVENT_DRAWER_ID}"]`)?.remove();
      document.querySelector(`[data-drawer-backdrop="${NEW_EVENT_DRAWER_ID}"]`)?.remove();

      const drawerHtml = Drawer.create({
        id: NEW_EVENT_DRAWER_ID,
        title: 'Novo Evento',
        width: 336,
        content: createNewEventDrawerContent(),
        footer: createNewEventDrawerFooter(),
      });
      document.body.insertAdjacentHTML('beforeend', drawerHtml);

      newEventDrawerControls = Drawer.init({ id: NEW_EVENT_DRAWER_ID, root: document });
      newEventDrawerElement = document.querySelector(`[data-drawer="${NEW_EVENT_DRAWER_ID}"]`);

      if (newEventDrawerElement) {
        const handleDrawerClick = (event) => {
          const actionButton = event.target.closest('[data-new-event-action]');
          if (!actionButton || !newEventDrawerElement.contains(actionButton)) return;
          const action = actionButton.dataset.newEventAction;
          if (action === 'cancel' || action === 'delete') {
            newEventDrawerControls?.close();
            return;
          }
          if (action === 'save') {
            const formElement = newEventDrawerElement.querySelector('[data-new-event-form]');
            const formData = formElement ? Object.fromEntries(new FormData(formElement).entries()) : {};
            console.log('[agenda-eventos] novo evento', formData);
            newEventDrawerControls?.close();
          }
        };

        newEventDrawerElement.addEventListener('click', handleDrawerClick);
        newEventDrawerClickHandler = handleDrawerClick;
      }
    }

    newEventDrawerControls?.open(newEventButton || null);
  };

  backButton?.addEventListener('click', handleBackClick);
  todayButton?.addEventListener('click', handleTodayClick);
  prevMonthButton?.addEventListener('click', handlePrevMonthClick);
  nextMonthButton?.addEventListener('click', handleNextMonthClick);
  newEventButton?.addEventListener('click', handleNewEventClick);
  filterInputs.forEach((input) => input.addEventListener('change', handleFilterChange));
  calendarGridElement.addEventListener('click', handleCalendarClick);
  calendarGridElement.addEventListener('click', handleEventClick);
  topElement.addEventListener('click', handleTopClick);

  render();

  return () => {
    backButton?.removeEventListener('click', handleBackClick);
    todayButton?.removeEventListener('click', handleTodayClick);
    prevMonthButton?.removeEventListener('click', handlePrevMonthClick);
    nextMonthButton?.removeEventListener('click', handleNextMonthClick);
    newEventButton?.removeEventListener('click', handleNewEventClick);
    filterInputs.forEach((input) => input.removeEventListener('change', handleFilterChange));
    calendarGridElement.removeEventListener('click', handleCalendarClick);
    calendarGridElement.removeEventListener('click', handleEventClick);
    topElement.removeEventListener('click', handleTopClick);

    if (newEventDrawerElement && newEventDrawerClickHandler) {
      newEventDrawerElement.removeEventListener('click', newEventDrawerClickHandler);
    }
    if (newEventDrawerControls?.cleanup) newEventDrawerControls.cleanup();
    removeDrawerElements(NEW_EVENT_DRAWER_ID);
    newEventDrawerControls = null;
    newEventDrawerElement = null;
    newEventDrawerClickHandler = null;

    if (eventDetailsDrawerElement && eventDetailsDrawerClickHandler) {
      eventDetailsDrawerElement.removeEventListener('click', eventDetailsDrawerClickHandler);
    }
    if (eventDetailsDrawerControls?.cleanup) eventDetailsDrawerControls.cleanup();
    removeDrawerElements(EVENT_DETAILS_DRAWER_ID);
    eventDetailsDrawerControls = null;
    eventDetailsDrawerElement = null;
    eventDetailsDrawerClickHandler = null;
  };
}
