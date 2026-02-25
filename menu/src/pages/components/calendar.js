import calendar from '../../components/calendar/calendar.js';

export function init() {
  // Calendário padrão
  const defaultContainer = document.getElementById('calendar-default');
  if (defaultContainer) {
    defaultContainer.innerHTML = calendar.render({ date: new Date() });
  }

  // Calendário com data selecionada
  const selectedContainer = document.getElementById('calendar-selected');
  if (selectedContainer) {
    const today = new Date();
    const selected = new Date(today.getFullYear(), today.getMonth(), 15);
    selectedContainer.innerHTML = calendar.render({
      date: today,
      selected: selected,
    });
  }

  // Calendário master
  const masterContainer = document.getElementById('calendar-master');
  if (masterContainer) {
    const today = new Date();
    const rangeStart = new Date(today.getFullYear(), today.getMonth(), 18);
    const rangeEnd = new Date(today.getFullYear(), today.getMonth(), 22);
    masterContainer.innerHTML = calendar.render({
      date: today,
      rangeStart: rangeStart,
      rangeEnd: rangeEnd,
      showFooter: true,
    });
  }

  // Month picker
  const monthsContainer = document.getElementById('calendar-months');
  if (monthsContainer) {
    monthsContainer.innerHTML = calendar.renderMonthPicker({
      year: new Date().getFullYear(),
    });
  }

  // Year picker
  const yearsContainer = document.getElementById('calendar-years');
  if (yearsContainer) {
    yearsContainer.innerHTML = calendar.renderYearPicker({
      startYear: 2020,
    });
  }

  // Light mode
  const lightContainer = document.getElementById('calendar-light');
  if (lightContainer) {
    lightContainer.innerHTML = calendar.render({
      date: new Date(),
      selected: new Date(),
    });
  }

  // Dark mode
  const darkContainer = document.getElementById('calendar-dark');
  if (darkContainer) {
    darkContainer.innerHTML = calendar.render({
      date: new Date(),
      selected: new Date(),
      dark: true,
    });
  }

  // Inicializa interatividade
  calendar.init(document, (date) => {
    console.log('Data selecionada:', date);
  });
}
