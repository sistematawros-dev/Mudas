import * as Badge from '../../../components/badge/badge.js';
import {
  instructionStatus,
  overviewMetrics,
  upcomingAppointments,
} from './visao-geral.data.js';

let statusChart = null;
let apexChartsLoader = null;

async function loadApexCharts() {
  if (!apexChartsLoader) {
    apexChartsLoader = import('apexcharts').then((module) => module.default);
  }
  return apexChartsLoader;
}

const metricIcons = {
  truck: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 7H13V16H3V7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13 10H17L20 13V16H13V10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="7.5" cy="17.5" r="1.5" stroke="currentColor" stroke-width="2"/>
      <circle cx="16.5" cy="17.5" r="1.5" stroke="currentColor" stroke-width="2"/>
    </svg>
  `,
  document: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3H14L18 7V20C18 20.5523 17.5523 21 17 21H7C6.44772 21 6 20.5523 6 20V4C6 3.44772 6.44772 3 7 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 3V8H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 12H15M9 16H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  calendar: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 3V6M16 3V6M4 9H20M6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7C4 5.89543 4.89543 5 6 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  clock: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
      <path d="M12 7V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
};

const truckIcon = `
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 7H13V16H3V7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 10H17L20 13V16H13V10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="7.5" cy="17.5" r="1.5" stroke="currentColor" stroke-width="2"/>
    <circle cx="16.5" cy="17.5" r="1.5" stroke="currentColor" stroke-width="2"/>
  </svg>
`;

const personIcon = `
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M16 19C16 16.7909 14.2091 15 12 15C9.79086 15 8 16.7909 8 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="12" cy="9" r="3" stroke="currentColor" stroke-width="2"/>
  </svg>
`;

function renderMetrics(container) {
  if (!container) return;

  container.innerHTML = overviewMetrics.map((metric) => `
    <article class="patio-metric-card" aria-label="${metric.label}">
      <div class="patio-metric-card__body">
        <span class="patio-metric-card__label">${metric.label}</span>
        <strong class="patio-metric-card__value">${metric.value}</strong>
      </div>
      <span class="patio-metric-card__icon patio-metric-card__icon--${metric.tone}" aria-hidden="true">
        ${metricIcons[metric.icon] || ''}
      </span>
    </article>
  `).join('');
}

function renderAppointments(container) {
  if (!container) return;

  container.innerHTML = upcomingAppointments.map((appointment) => `
    <button type="button" class="patio-appointment-card" data-appointment-id="${appointment.id}">
      <span class="patio-appointment-card__main">
        <span class="patio-appointment-card__icon" aria-hidden="true">${truckIcon}</span>
        <span class="patio-appointment-card__text">
          <strong class="patio-appointment-card__code">${appointment.code}</strong>
          <span class="patio-appointment-card__person">${personIcon}<span>${appointment.person}</span></span>
        </span>
      </span>
      <span class="patio-appointment-card__meta">
        ${Badge.create({
          text: appointment.status,
          variant: appointment.statusVariant,
          style: appointment.statusStyle,
          size: 'sm',
        })}
        <span class="patio-appointment-card__date">${appointment.date}</span>
      </span>
    </button>
  `).join('');
}

function renderStatusLegend(container) {
  if (!container) return;

  container.innerHTML = instructionStatus.labels.map((label, index) => `
    <span class="patio-status-legend__item">
      <span class="patio-status-legend__dot" style="background:${instructionStatus.colors[index]}"></span>
      <span>${label}</span>
    </span>
  `).join('');
}

async function renderStatusChart(container) {
  if (!container) return;

  if (statusChart) {
    try {
      statusChart.destroy();
    } catch {
      // ignore chart teardown errors during route changes
    }
    statusChart = null;
  }

  const ApexCharts = await loadApexCharts();

  const options = {
    chart: {
      type: 'donut',
      height: 220,
      toolbar: { show: false },
      fontFamily: 'Archivo, sans-serif',
      sparkline: { enabled: true },
    },
    series: instructionStatus.series,
    labels: instructionStatus.labels,
    colors: instructionStatus.colors,
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '72%',
          labels: {
            show: true,
            name: { show: false },
            value: { show: false },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              formatter: () => String(instructionStatus.total),
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value}`,
      },
    },
  };

  container.innerHTML = '';
  statusChart = new ApexCharts(container, options);
  await statusChart.render();

  const totalLabel = container.querySelector('.apexcharts-datalabels-group .apexcharts-text.apexcharts-datalabel-label');
  const totalValue = container.querySelector('.apexcharts-datalabels-group .apexcharts-text.apexcharts-datalabel-value');
  if (totalValue) totalValue.setAttribute('class', 'patio-status-center__value');
  if (totalLabel) totalLabel.setAttribute('class', 'patio-status-center__label');
}

function setupActions(root) {
  const todayButton = root.querySelector('[data-action="today"]');
  const viewAllButton = root.querySelector('[data-action="view-all"]');
  const appointmentsList = root.querySelector('#patio-appointments-list');

  const handleTodayClick = () => {
    console.log('[controle-patio/visao-geral] filtro Hoje acionado');
  };

  const handleViewAllClick = () => {
    console.log('[controle-patio/visao-geral] ver todos os agendamentos');
  };

  const handleAppointmentClick = (event) => {
    const appointmentElement = event.target.closest('[data-appointment-id]');
    if (!appointmentElement) return;
    console.log('[controle-patio/visao-geral] abrir agendamento', appointmentElement.dataset.appointmentId);
  };

  todayButton?.addEventListener('click', handleTodayClick);
  viewAllButton?.addEventListener('click', handleViewAllClick);
  appointmentsList?.addEventListener('click', handleAppointmentClick);

  return () => {
    todayButton?.removeEventListener('click', handleTodayClick);
    viewAllButton?.removeEventListener('click', handleViewAllClick);
    appointmentsList?.removeEventListener('click', handleAppointmentClick);
  };
}

export function init() {
  const metricsContainer = document.getElementById('patio-overview-metrics');
  const appointmentsContainer = document.getElementById('patio-appointments-list');
  const statusChartContainer = document.getElementById('patio-status-chart');
  const statusLegendContainer = document.getElementById('patio-status-legend');

  renderMetrics(metricsContainer);
  renderAppointments(appointmentsContainer);
  renderStatusLegend(statusLegendContainer);
  renderStatusChart(statusChartContainer);

  const cleanupActions = setupActions(document);

  return () => {
    cleanupActions?.();
    if (statusChart) {
      try {
        statusChart.destroy();
      } catch {
        // ignore chart teardown errors during route changes
      }
      statusChart = null;
    }
  };
}
