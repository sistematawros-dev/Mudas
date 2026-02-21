import '../../components/card/card.css';
import * as Dropdown from '../../components/dropdown/dropdown.js';
import * as Segmented from '../../components/segmented/segmented.js';
import * as KpiCard from '../../components/kpi-card/kpi-card.js';
import * as Chart from '../../components/chart/chart.js';
import * as Tabs from '../../components/tabs/tabs.js';
import * as ListItem from '../../components/list-item/list-item.js';

let engagementApexChart = null;
let distributionApexChart = null;
let engagementResizeObserver = null;
let distributionResizeObserver = null;
let apexChartsLoader = null;

async function loadApexCharts() {
  if (!apexChartsLoader) {
    apexChartsLoader = import('apexcharts').then((module) => module.default);
  }
  return apexChartsLoader;
}

export function init() {
  disconnectDashboardChartObservers();

  // Proteção extra: remove banners fixos residuais no topo
  document.querySelectorAll('.broadcast-banner--fixed').forEach((el) => el.remove());

  initDropdown();
  initSegmented();
  initKpiCards();
  initFiltersButton();

  // Novos componentes
  initEngagementChartV2();
  initDistributionChart();
  initProductionControl();
  initGrowthChart();
  initSuggestionsList();

  // Cleanup chamado pelo router ao sair da rota
  return function cleanup() {
    if (engagementApexChart) {
      try { engagementApexChart.destroy(); } catch (_) { /* já destruído */ }
      engagementApexChart = null;
    }
    if (distributionApexChart) {
      try { distributionApexChart.destroy(); } catch (_) { /* já destruído */ }
      distributionApexChart = null;
    }
    disconnectDashboardChartObservers();
  };
}

function disconnectDashboardChartObservers() {
  if (engagementResizeObserver) {
    engagementResizeObserver.disconnect();
    engagementResizeObserver = null;
  }

  if (distributionResizeObserver) {
    distributionResizeObserver.disconnect();
    distributionResizeObserver = null;
  }
}

/**
 * Inicializa o dropdown de painéis
 */
function initDropdown() {
  const container = document.getElementById('dashboard-dropdown');
  if (!container) return;

  const dropdownHtml = Dropdown.create({
    id: 'painel-dropdown',
    trigger: 'Painel de Pedidos',
    items: [
      { label: 'Painel de Pedidos', value: 'pedidos', selected: true },
      { label: 'Painel de Produção', value: 'producao' },
      { label: 'Painel de Estoque', value: 'estoque' },
      { label: 'Painel Financeiro', value: 'financeiro' },
    ],
    size: 'sm',
  });

  container.innerHTML = dropdownHtml;

  Dropdown.init(container, ({ value }) => {
    console.log('Painel selecionado:', value);
    // Aqui você pode carregar os dados do painel selecionado
  });
}

/**
 * Inicializa o controle segmentado de período
 */
function initSegmented() {
  const container = document.getElementById('dashboard-segmented');
  if (!container) return;

  const segmentedHtml = Segmented.create({
    items: [
      { label: 'Ano', value: 'year' },
      { label: 'Mês', value: 'month' },
      { label: 'Semana', value: 'week' },
      { label: 'Dia', value: 'day' },
    ],
    activeValue: 'month',
    size: 'sm',
  });

  container.innerHTML = segmentedHtml;

  Segmented.init(container, (value) => {
    console.log('Período selecionado:', value);
    // Aqui você pode atualizar os dados baseado no período
  });
}

/**
 * Inicializa os cards de KPI
 */
function initKpiCards() {
  const container = document.getElementById('dashboard-kpi-grid');
  if (!container) return;

  const kpiData = [
    {
      title: 'Taxa de germinação',
      value: '21,42%',
      change: {
        value: 4.2,
        type: 'positive',
        label: 'em relação ao mês passado',
      },
    },
    {
      title: 'Taxa de sobrevivência',
      value: '8,92%',
      change: {
        value: -1.5,
        type: 'negative',
        label: 'em relação ao mês passado',
      },
    },
    {
      title: 'Mudas produzidas',
      value: '147',
      change: {
        value: 12.3,
        type: 'positive',
        label: 'em relação ao mês passado',
      },
    },
    {
      title: 'Custo por muda',
      value: 'R$ 0,87',
      change: {
        value: 3.8,
        type: 'positive',
        label: 'em relação ao mês passado',
      },
    },
  ];

  const cardsHtml = kpiData.map(data => KpiCard.create(data)).join('');
  container.innerHTML = cardsHtml;

  KpiCard.init(container, (card) => {
    console.log('Menu do card clicado:', card);
    // Aqui você pode abrir um menu contextual com opções:
    // - Ver detalhes
    // - Exportar
    // - Remover do painel
  });
}

/**
 * Inicializa o botão de filtros avançados
 */
function initFiltersButton() {
  const btn = document.getElementById('dashboard-filters-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    console.log('Filtros avançados clicado');
    // Aqui você pode abrir um modal ou painel lateral com filtros
  });
}

/**
 * Inicializa gráfico de engajamento da campanha
 */
function initEngagementChart() {
  const chartContainer = document.getElementById('engagement-chart');
  const dropdownContainer = document.getElementById('engagement-dropdown');
  if (!chartContainer || !dropdownContainer) return;

  // Dropdown
  const dropdownHtml = Dropdown.create({
    id: 'engagement-period-dropdown',
    trigger: 'Esta semana',
    items: [
      { label: 'Esta semana', value: 'week', selected: true },
      { label: 'Este mês', value: 'month' },
      { label: 'Este trimestre', value: 'quarter' },
      { label: 'Este ano', value: 'year' },
    ],
    size: 'sm',
  });

  dropdownContainer.innerHTML = dropdownHtml;
  Dropdown.init(dropdownContainer, ({ value }) => {
    console.log('Período de engajamento:', value);
  });

  // Dados mock
  const engagementData = [
    { label: 'Seg', value: 12.5, date: 'Segunda-feira, 20 de julho de 2025', change: 2.1 },
    { label: 'Ter', value: 11.8, date: 'Terça-feira, 21 de julho de 2025', change: -0.7 },
    { label: 'Qua', value: 9.2, date: 'Quarta-feira, 22 de julho de 2025', change: -2.6 },
    { label: 'Qui', value: 14.1, date: 'Quinta-feira, 23 de julho de 2025', change: 4.9 },
    { label: 'Sex', value: 15.8, date: 'Sexta-feira, 23 de julho de 2025', change: 0.2 },
    { label: 'Sáb', value: 13.2, date: 'Sábado, 24 de julho de 2025', change: -2.6 },
    { label: 'Dom', value: 10.5, date: 'Domingo, 25 de julho de 2025', change: -2.7 },
  ];

  // Criar gráfico
  const chartHtml = Chart.createLineChart({
    data: engagementData,
    id: 'engagement-line-chart',
    height: 280,
    color: '#F6C03C',
    fill: true,
    gradient: {
      from: 'rgba(246, 192, 60, 0.2)',
      to: 'rgba(255, 255, 255, 0)',
    },
  });

  chartContainer.innerHTML = chartHtml;

  // Tooltip customizado
  Chart.init(chartContainer, (index) => {
    const data = engagementData[index];
    const changeClass = data.change > 0 ? 'chart-tooltip-change--positive' : 'chart-tooltip-change--negative';
    const changeSymbol = data.change > 0 ? '+' : '';

    return `
      <div class="chart-tooltip-date">${data.date}</div>
      <div class="chart-tooltip-value">${data.value}%</div>
      <div class="chart-tooltip-change ${changeClass}">
        ${changeSymbol}${data.change}% em comparação com o mês passado
      </div>
    `;
  });
}

/**
 * Inicializa gráfico de distribuição por cultivo
 */
const ENGAGEMENT_PERIOD_OPTIONS_V2 = [
  { label: 'Esta semana', value: 'week' },
  { label: 'Este mês', value: 'month' },
  { label: 'Este trimestre', value: 'quarter' },
  { label: 'Este ano', value: 'year' },
];

const ENGAGEMENT_MOCK_BY_PERIOD_V2 = {
  week: {
    highlightIndex: 4,
    comparisonLabel: 'em comparação com o mês passado',
    points: [
      { dayLabel: 'Seg', value: 10, dateLabel: 'Segunda-feira, 21 de julho de 2025', change: 0.9 },
      { dayLabel: 'Ter', value: 12, dateLabel: 'Terça-feira, 22 de julho de 2025', change: 1.4 },
      { dayLabel: 'Qua', value: 9, dateLabel: 'Quarta-feira, 23 de julho de 2025', change: -1.8 },
      { dayLabel: 'Qui', value: 15, dateLabel: 'Quinta-feira, 24 de julho de 2025', change: 3.2 },
      { dayLabel: 'Sex', value: 10, dateLabel: 'Sexta-feira, 25 de julho de 2025', change: 2.0 },
      { dayLabel: 'Sáb', value: 8, dateLabel: 'Sábado, 26 de julho de 2025', change: -1.1 },
      { dayLabel: 'Dom', value: 11, dateLabel: 'Domingo, 27 de julho de 2025', change: 1.3 },
    ],
  },
  month: {
    highlightIndex: 3,
    comparisonLabel: 'em comparação com o mês passado',
    points: [
      { dayLabel: 'Semana 1', value: 8, dateLabel: 'Semana 1 de julho de 2025', change: 0.5 },
      { dayLabel: 'Semana 2', value: 11, dateLabel: 'Semana 2 de julho de 2025', change: 1.7 },
      { dayLabel: 'Semana 3', value: 9, dateLabel: 'Semana 3 de julho de 2025', change: -0.8 },
      { dayLabel: 'Semana 4', value: 12, dateLabel: 'Semana 4 de julho de 2025', change: 2.2 },
    ],
  },
  quarter: {
    highlightIndex: 1,
    comparisonLabel: 'em comparação com o trimestre passado',
    points: [
      { dayLabel: 'Abr', value: 9, dateLabel: 'Abril de 2025', change: 0.7 },
      { dayLabel: 'Mai', value: 11, dateLabel: 'Maio de 2025', change: 1.6 },
      { dayLabel: 'Jun', value: 10, dateLabel: 'Junho de 2025', change: 0.9 },
    ],
  },
  year: {
    highlightIndex: 6,
    comparisonLabel: 'em comparação com o ano passado',
    points: [
      { dayLabel: 'Jan', value: 7, dateLabel: 'Janeiro de 2025', change: 0.3 },
      { dayLabel: 'Fev', value: 8, dateLabel: 'Fevereiro de 2025', change: 0.8 },
      { dayLabel: 'Mar', value: 9, dateLabel: 'Março de 2025', change: 1.1 },
      { dayLabel: 'Abr', value: 10, dateLabel: 'Abril de 2025', change: 1.4 },
      { dayLabel: 'Mai', value: 9, dateLabel: 'Maio de 2025', change: -0.6 },
      { dayLabel: 'Jun', value: 11, dateLabel: 'Junho de 2025', change: 1.9 },
      { dayLabel: 'Jul', value: 10, dateLabel: 'Julho de 2025', change: 2.0 },
    ],
  },
};

async function fetchEngagementDataV2(period = 'week') {
  // Pronto para API real:
  // const response = await fetch(`/api/dashboard/engagement?period=${period}`);
  // return response.json();
  return ENGAGEMENT_MOCK_BY_PERIOD_V2[period] || ENGAGEMENT_MOCK_BY_PERIOD_V2.week;
}

function normalizeEngagementDataV2(payload) {
  const points = Array.isArray(payload?.points) ? payload.points : [];
  return {
    points: points.map((point) => ({
      label: point.dayLabel || point.label || '',
      value: Number(point.value) || 0,
      date: point.dateLabel || point.date || '',
      change: Number(point.change) || 0,
    })),
    highlightIndex: Number.isInteger(payload?.highlightIndex) ? payload.highlightIndex : 0,
    comparisonLabel: payload?.comparisonLabel || 'em comparação com o período anterior',
  };
}

function getEngagementTooltipContentV2(point, comparisonLabel) {
  const isPositive = point.change >= 0;
  const trendClass = isPositive ? 'engagement-tooltip-trend--positive' : 'engagement-tooltip-trend--negative';
  const trendArrow = isPositive ? '&uarr;' : '&darr;';
  const changeValue = Math.abs(point.change).toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });

  return `
    <div class="engagement-tooltip-header">
      <p class="chart-tooltip-date">${point.date}</p>
    </div>
    <div class="engagement-tooltip-body">
      <p class="chart-tooltip-value">${point.value}%</p>
      <div class="engagement-tooltip-detail">
        <span class="engagement-tooltip-trend ${trendClass}">
          <span class="engagement-tooltip-trend-icon">${trendArrow}</span>
          <span>${changeValue}%</span>
        </span>
        <span class="engagement-tooltip-context">${comparisonLabel}</span>
      </div>
    </div>
  `;
}

function getDashboardChartHeight(chartContainer, { min = 180, max = 280 } = {}) {
  const card = chartContainer?.closest('.card--dashboard');
  if (!card) return max;

  const cardStyles = window.getComputedStyle(card);
  const cardPaddingTop = parseFloat(cardStyles.paddingTop) || 0;
  const cardPaddingBottom = parseFloat(cardStyles.paddingBottom) || 0;
  const cardGap = parseFloat(cardStyles.gap || cardStyles.rowGap) || 0;

  const header = card.querySelector('.card-header');
  const headerHeight = header ? header.getBoundingClientRect().height : 0;

  const available = Math.floor(
    card.clientHeight - cardPaddingTop - cardPaddingBottom - headerHeight - cardGap
  );

  if (!Number.isFinite(available) || available <= 0) return max;
  return Math.max(min, Math.min(max, available));
}

function bindChartResizeObserver({ chartContainer, getChart, min = 200, max = 280, type }) {
  if (!chartContainer || typeof ResizeObserver === 'undefined') return;

  const disconnectCurrent = () => {
    if (type === 'engagement' && engagementResizeObserver) {
      engagementResizeObserver.disconnect();
      engagementResizeObserver = null;
    }
    if (type === 'distribution' && distributionResizeObserver) {
      distributionResizeObserver.disconnect();
      distributionResizeObserver = null;
    }
  };

  disconnectCurrent();

  const observer = new ResizeObserver(() => {
    const chart = getChart();
    if (!chart || !document.body.contains(chartContainer)) return;

    const nextHeight = getDashboardChartHeight(chartContainer, { min, max });
    try {
      chart.updateOptions({ chart: { height: nextHeight } }, false, false);
    } catch {
      // Ignora quando o chart já foi destruído durante navegação
    }
  });

  observer.observe(chartContainer);

  if (type === 'engagement') engagementResizeObserver = observer;
  if (type === 'distribution') distributionResizeObserver = observer;
}

async function renderEngagementChartV2(chartContainer, engagementModel) {
  if (engagementApexChart) {
    engagementApexChart.destroy();
    engagementApexChart = null;
  }

  if (!engagementModel.points.length) {
    chartContainer.innerHTML = '<div class="chart-empty">Sem dados</div>';
    return;
  }

  const ApexCharts = await loadApexCharts();

  const safeIndex = Math.min(Math.max(engagementModel.highlightIndex, 0), engagementModel.points.length - 1);
  const categories = engagementModel.points.map((point) => point.label);
  const seriesData = engagementModel.points.map((point) => point.value);
  const activeCategory = categories[safeIndex];
  const targetHeight = getDashboardChartHeight(chartContainer, { min: 200, max: 280 });

  const options = {
    chart: {
      type: 'area',
      height: targetHeight,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'Archivo, sans-serif',
      animations: { easing: 'easeinout', speed: 400 },
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
    },
    series: [{ name: 'Engajamento', data: seriesData }],
    colors: ['#F6C03C'],
    stroke: {
      show: false,
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    grid: {
      borderColor: 'rgba(137, 143, 143, 0.28)',
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { left: 8, right: 8, bottom: 6 },
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
      labels: {
        offsetY: -2,
        style: {
          colors: categories.map(() => '#898F8F'),
          fontSize: '14px',
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      min: 0,
      max: 16,
      tickAmount: 8,
      labels: {
        formatter: (value) => `${Math.round(value)}%`,
        style: {
          colors: '#898F8F',
          fontSize: '14px',
          fontWeight: 400,
        },
      },
    },
    tooltip: {
      enabled: true,
      custom: ({ dataPointIndex }) => {
        const idx = dataPointIndex >= 0 ? dataPointIndex : safeIndex;
        const point = engagementModel.points[idx] || engagementModel.points[safeIndex];
        return getEngagementTooltipContentV2(point, engagementModel.comparisonLabel);
      },
    },
    annotations: {
      xaxis: [
        {
          x: activeCategory,
          borderColor: '#F6C03C',
          strokeDashArray: 4,
          opacity: 0.6,
        },
      ],
    },
  };

  chartContainer.innerHTML = '';
  chartContainer.classList.add('engagement-apex-host');
  engagementApexChart = new ApexCharts(chartContainer, options);
  await engagementApexChart.render();

  requestAnimationFrame(() => {
    if (!engagementApexChart) return;
    const resizedHeight = getDashboardChartHeight(chartContainer, { min: 200, max: 280 });
    engagementApexChart.updateOptions({
      chart: { height: resizedHeight },
    }, false, false);
  });

  bindChartResizeObserver({
    chartContainer,
    getChart: () => engagementApexChart,
    min: 200,
    max: 280,
    type: 'engagement',
  });
}

function initEngagementChartV2() {
  const chartContainer = document.getElementById('engagement-chart');
  const dropdownContainer = document.getElementById('engagement-dropdown');
  if (!chartContainer || !dropdownContainer) return;

  let selectedPeriod = 'week';
  let requestVersion = 0;

  const renderPeriodDropdown = () => {
    const dropdownHtml = Dropdown.create({
      id: 'engagement-period-dropdown',
      trigger: ENGAGEMENT_PERIOD_OPTIONS_V2.find((item) => item.value === selectedPeriod)?.label || 'Esta semana',
      items: ENGAGEMENT_PERIOD_OPTIONS_V2.map((item) => ({ ...item, selected: item.value === selectedPeriod })),
      size: 'sm',
    });
    dropdownContainer.innerHTML = dropdownHtml;
  };

  const bindPeriodDropdown = () => {
    Dropdown.init(dropdownContainer, ({ value }) => {
      selectedPeriod = value;
      renderPeriodDropdown();
      bindPeriodDropdown();
      loadAndRender();
    });
  };

  const loadAndRender = async () => {
    const currentRequest = ++requestVersion;
    const payload = await fetchEngagementDataV2(selectedPeriod);
    if (currentRequest !== requestVersion) return;
    const engagementModel = normalizeEngagementDataV2(payload);
    await renderEngagementChartV2(chartContainer, engagementModel);
  };

  renderPeriodDropdown();
  bindPeriodDropdown();

  loadAndRender();
}

const DISTRIBUTION_MOCK_V2 = {
  points: [
    { label: 'Tomate', value: 700 },
    { label: 'Pimentao', value: 1200 },
    { label: 'Tomate', value: 700 },
    { label: 'Tomate', value: 900 },
    { label: 'Tomate', value: 500 },
  ],
};

async function fetchDistributionDataV2() {
  // Pronto para API real:
  // const response = await fetch('/api/dashboard/distribution-by-crop');
  // return response.json();
  return DISTRIBUTION_MOCK_V2;
}

function normalizeDistributionDataV2(payload) {
  const points = Array.isArray(payload?.points) ? payload.points : [];
  return points.map((point) => ({
    label: point.label || '',
    value: Number(point.value) || 0,
  }));
}

function formatDistributionCurrency(value) {
  return `$${Math.round(value).toLocaleString('pt-BR')}`;
}

function drawDistributionTopCaps(chartContext) {
  const root = chartContext?.el;
  if (!root) return;

  const barsGroup = root.querySelector('.apexcharts-bar-series');
  if (!barsGroup) return;

  const previousCaps = barsGroup.querySelector('#distribution-top-caps');
  if (previousCaps) previousCaps.remove();

  const bars = barsGroup.querySelectorAll('path');
  if (!bars.length) return;

  const svgNS = 'http://www.w3.org/2000/svg';
  const capsGroup = document.createElementNS(svgNS, 'g');
  capsGroup.setAttribute('id', 'distribution-top-caps');
  capsGroup.setAttribute('pointer-events', 'none');

  bars.forEach((bar) => {
    const box = bar.getBBox();
    if (!box.width || !box.height) return;

    const cap = document.createElementNS(svgNS, 'line');
    const extraWidth = 2;
    const y = box.y;

    cap.setAttribute('x1', String(box.x - extraWidth));
    cap.setAttribute('x2', String(box.x + box.width + extraWidth));
    cap.setAttribute('y1', String(y));
    cap.setAttribute('y2', String(y));
    cap.setAttribute('stroke', '#0A73B7');
    cap.setAttribute('stroke-width', '4');
    cap.setAttribute('stroke-linecap', 'round');

    capsGroup.appendChild(cap);
  });

  barsGroup.appendChild(capsGroup);
}

function scheduleDistributionTopCaps(chartContext) {
  requestAnimationFrame(() => {
    drawDistributionTopCaps(chartContext);
    setTimeout(() => drawDistributionTopCaps(chartContext), 220);
  });
}

async function renderDistributionChartV2(chartContainer, data) {
  if (distributionApexChart) {
    distributionApexChart.destroy();
    distributionApexChart = null;
  }

  if (!data.length) {
    chartContainer.innerHTML = '<div class="chart-empty">Sem dados</div>';
    return;
  }

  const ApexCharts = await loadApexCharts();

  const categories = data.map((item) => item.label);
  const seriesData = data.map((item) => item.value);
  const maxValue = Math.max(...seriesData);
  const yAxisMax = Math.max(1200, Math.ceil(maxValue / 200) * 200);
  const targetHeight = getDashboardChartHeight(chartContainer, { min: 200, max: 280 });

  const options = {
    chart: {
      type: 'bar',
      height: targetHeight,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'Archivo, sans-serif',
      animations: { easing: 'easeinout', speed: 350 },
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
      events: {
        mounted: (chartContext) => {
          scheduleDistributionTopCaps(chartContext);
        },
        updated: (chartContext) => {
          scheduleDistributionTopCaps(chartContext);
        },
        animationEnd: (chartContext) => {
          scheduleDistributionTopCaps(chartContext);
        },
      },
    },
    series: [
      {
        name: 'Distribuicao',
        data: seriesData,
      },
    ],
    colors: ['#DCE8F2'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '64%',
        borderRadius: 6,
        borderRadiusApplication: 'end',
        dataLabels: {
          position: 'top',
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        opacityFrom: 1.2,
        opacityTo: 0.04,
        stops: [0, 100],
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      formatter: (value) => formatDistributionCurrency(value),
      offsetY: 14,
      style: {
        colors: ['#0A73B7'],
        fontSize: '14px',
        fontWeight: 700,
      },
      background: {
        enabled: false,
      },
    },
    legend: { show: false },
    grid: {
      borderColor: 'rgba(137, 143, 143, 0.28)',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { left: 8, right: 8, top: 6, bottom: 0 },
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: true, color: 'rgba(137, 143, 143, 0.35)' },
      labels: {
        style: {
          colors: categories.map(() => '#676F73'),
          fontSize: '14px',
          fontWeight: 500,
        },
        offsetY: -2,
      },
    },
    yaxis: {
      min: 0,
      max: yAxisMax,
      tickAmount: yAxisMax / 200,
      labels: {
        formatter: (value) => formatDistributionCurrency(value),
        style: {
          colors: '#898F8F',
          fontSize: '14px',
          fontWeight: 400,
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => formatDistributionCurrency(value),
      },
    },
  };

  chartContainer.innerHTML = '';
  chartContainer.classList.add('distribution-apex-host');
  distributionApexChart = new ApexCharts(chartContainer, options);
  await distributionApexChart.render();

  requestAnimationFrame(() => {
    if (!distributionApexChart) return;
    const resizedHeight = getDashboardChartHeight(chartContainer, { min: 200, max: 280 });
    distributionApexChart.updateOptions({
      chart: { height: resizedHeight },
    }, false, false);
  });

  bindChartResizeObserver({
    chartContainer,
    getChart: () => distributionApexChart,
    min: 200,
    max: 280,
    type: 'distribution',
  });
}

function initDistributionChart() {
  const chartContainer = document.getElementById('distribution-chart');
  if (!chartContainer) return;

  const loadAndRender = async () => {
    const payload = await fetchDistributionDataV2();
    const distributionModel = normalizeDistributionDataV2(payload);
    await renderDistributionChartV2(chartContainer, distributionModel);
  };

  loadAndRender();
}

/**
 * Inicializa controle de produção (tabs + lista)
 */
function initProductionControl() {
  const container = document.getElementById('production-control');
  if (!container) return;

  // Dados mock para cada aba
  const statusData = [
    { label: 'Lotes ativos', value: 2340, percentage: 88, color: '#0A95D9' },
    { label: 'Transplantes', value: 320, percentage: 9, color: '#0A95D9' },
    { label: 'Perdas', value: 86, percentage: 3, color: '#0A95D9' },
    { label: 'Limpo', value: 34, percentage: 1, color: '#0A95D9' },
  ];

  const fontesData = [
    { label: 'Lotes ativos', value: 2340, percentage: 88, color: '#0A95D9' },
    { label: 'Transplantes', value: 320, percentage: 9, color: '#0A95D9' },
    { label: 'Perdas', value: 86, percentage: 3, color: '#0A95D9' },
    { label: 'Limpo', value: 34, percentage: 1, color: '#0A95D9' },
  ];

  const demograficoData = [
    { label: 'Lotes ativos', value: 2340, percentage: 88, color: '#0A95D9' },
    { label: 'Transplantes', value: 320, percentage: 9, color: '#0A95D9' },
    { label: 'Perdas', value: 86, percentage: 3, color: '#0A95D9' },
    { label: 'Limpo', value: 34, percentage: 1, color: '#0A95D9' },
  ];

  // Criar tabs com painéis
  const tabsHtml = Tabs.createWithPanels({
    id: 'production-tabs',
    variant: 'button',
    size: 'sm',
    fullWidth: true,
    activeTab: 1,
    tabs: [
      { label: 'Status', value: 'status', content: createProductionList(statusData) },
      { label: 'Fontes', value: 'fontes', content: createProductionList(fontesData) },
      { label: 'Demográfico', value: 'demografico', content: createProductionList(demograficoData) },
    ],
  });

  container.innerHTML = tabsHtml;
  Tabs.init(container);
}

/**
 * Cria lista de produção com indicadores
 */
function createProductionList(data) {
  return `
    <div class="production-list">
      ${data.map(item => `
        <div class="production-item">
          <div class="production-item-indicator" style="background: ${item.color}"></div>
          <div class="production-item-label">${item.label}</div>
          <div class="production-item-value">${item.value.toLocaleString('pt-BR')}</div>
          <div class="production-item-badge">
            <span class="production-percentage">${item.percentage}%</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Inicializa gráfico de crescimento semanal
 */
function initGrowthChart() {
  const chartContainer = document.getElementById('growth-chart');
  const dropdownContainer = document.getElementById('growth-dropdown');
  if (!chartContainer || !dropdownContainer) return;

  // Dropdown
  const dropdownHtml = Dropdown.create({
    id: 'growth-period-dropdown',
    trigger: 'Esta semana',
    items: [
      { label: 'Esta semana', value: 'week', selected: true },
      { label: 'Este mês', value: 'month' },
      { label: 'Este trimestre', value: 'quarter' },
    ],
    size: 'sm',
  });

  dropdownContainer.innerHTML = dropdownHtml;
  Dropdown.init(dropdownContainer, ({ value }) => {
    console.log('Período de crescimento:', value);
  });

  // Dados mock
  const growthData = [
    {
      label: 'Seg',
      values: [
        { label: 'Germinação', value: 1200, color: '#1E3A5F' },
        { label: 'Desenvolvimento', value: 2800, color: '#FFA500' },
        { label: 'Transplante', value: 1500, color: '#4A90E2' },
      ],
    },
    {
      label: 'Ter',
      values: [
        { label: 'Germinação', value: 2900, color: '#1E3A5F' },
        { label: 'Desenvolvimento', value: 3100, color: '#FFA500' },
        { label: 'Transplante', value: 1800, color: '#4A90E2' },
      ],
    },
    {
      label: 'Qua',
      values: [
        { label: 'Germinação', value: 3400, color: '#1E3A5F' },
        { label: 'Desenvolvimento', value: 2600, color: '#FFA500' },
        { label: 'Transplante', value: 1400, color: '#4A90E2' },
      ],
    },
    {
      label: 'Qui',
      values: [
        { label: 'Germinação', value: 3000, color: '#1E3A5F' },
        { label: 'Desenvolvimento', value: 2900, color: '#FFA500' },
        { label: 'Transplante', value: 1200, color: '#4A90E2' },
      ],
    },
    {
      label: 'Sex',
      values: [
        { label: 'Germinação', value: 3600, color: '#1E3A5F' },
        { label: 'Desenvolvimento', value: 3200, color: '#FFA500' },
        { label: 'Transplante', value: 2100, color: '#4A90E2' },
      ],
    },
    {
      label: 'Sáb',
      values: [
        { label: 'Germinação', value: 4200, color: '#1E3A5F' },
        { label: 'Desenvolvimento', value: 2400, color: '#FFA500' },
        { label: 'Transplante', value: 1800, color: '#4A90E2' },
      ],
    },
    {
      label: 'Dom',
      values: [
        { label: 'Germinação', value: 3100, color: '#1E3A5F' },
        { label: 'Desenvolvimento', value: 2800, color: '#FFA500' },
        { label: 'Transplante', value: 1500, color: '#4A90E2' },
      ],
    },
  ];

  // Criar gráfico
  const chartHtml = Chart.createStackedBarChart({
    data: growthData,
    legend: [
      { label: 'Germinação', color: '#1E3A5F' },
      { label: 'Desenvolvimento', color: '#FFA500' },
      { label: 'Transplante', color: '#4A90E2' },
    ],
    id: 'growth-stacked-chart',
    height: 240,
  });

  chartContainer.innerHTML = chartHtml;
  Chart.init(chartContainer);
}

/**
 * Inicializa lista de sugestões inteligentes
 */
function initSuggestionsList() {
  const container = document.getElementById('suggestions-list');
  if (!container) return;

  const iconSVG = `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  const suggestions = [
    {
      id: 'suggestion-1',
      icon: iconSVG,
      iconBg: 'rgba(74, 144, 226, 0.1)',
      title: 'Ver Pedidos',
      description: 'Gerenciar pedidos de produção',
      value: 'optimize-irrigation',
    },
    {
      id: 'suggestion-2',
      icon: iconSVG,
      iconBg: 'rgba(255, 165, 0, 0.1)',
      title: 'Ordens de Produção',
      description: 'Acompanhar ordens ativas',
      value: 'adjust-fertilization',
    },
    {
      id: 'suggestion-3',
      icon: iconSVG,
      iconBg: 'rgba(76, 175, 80, 0.1)',
      title: 'Board de Produção',
      description: 'Visualizar fluxo kanban',
      value: 'schedule-transplant',
    },
    {
      id: 'suggestion-4',
      icon: iconSVG,
      iconBg: 'rgba(244, 67, 54, 0.1)',
      title: 'Cadastros',
      description: 'Gerenciar pessoas e empresas',
      value: 'restock',
    },
  ];

  const listHtml = ListItem.createList(suggestions);
  container.innerHTML = listHtml;

  ListItem.init(container, (_item, value) => {
    if (value === 'schedule-transplant') {
      location.hash = '/kanban-producao';
      return;
    }
    console.log('Sugestão clicada:', value);
  });
}










