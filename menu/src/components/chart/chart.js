import './chart.css';

/**
 * Chart Component
 * Gráficos simples usando SVG: line, bar, stacked-bar
 */

/**
 * Cria gráfico de linha
 * @param {Object} options
 * @param {Array} options.data - [{ label, value }]
 * @param {string} options.id - ID único
 * @param {number} options.height - Altura em px (default: 240)
 * @param {boolean} options.showGrid - Mostrar grid (default: true)
 * @param {boolean} options.showTooltip - Mostrar tooltip (default: true)
 * @param {string} options.color - Cor da linha (default: var(--color-primary))
 * @param {boolean} options.fill - Preencher área sob a linha (default: false)
 * @param {Object} options.gradient - Gradiente para fill { from, to } (default: null)
 */
export function createLineChart(options = {}) {
  const {
    data = [],
    id = `chart-${Math.random().toString(36).substr(2, 9)}`,
    height = 240,
    showGrid = true,
    showTooltip = true,
    color = 'var(--color-primary)',
    fill = false,
    gradient = null,
    activeIndex = null,
    yAxisMax = 16,
    yAxisMin = 0,
    yAxisStep = 2,
  } = options;

  if (data.length === 0) return '<div class="chart-empty">Sem dados</div>';

  const width = 100; // percentual
  const padding = { top: 15, right: 0, bottom: 35, left: 22 };

  // Escala fixa para o gráfico de engajamento (0% a 16%)
  const maxScale = yAxisMax;
  const minScale = yAxisMin;
  const yAxisRange = Math.max(maxScale - minScale, 1);

  // Calcular pontos baseado na escala fixa de 0-16%
  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1 || 1)) * (100 - padding.left - padding.right);
    const y = padding.top + (1 - (d.value - minScale) / yAxisRange) * (100 - padding.top - padding.bottom);
    return { x, y, ...d };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // Path da área preenchida (se fill estiver habilitado)
  let areaPathD = '';
  let gradientDef = '';

  if (fill) {
    const bottomY = 100 - padding.bottom;
    const firstX = points[0].x;
    const lastX = points[points.length - 1].x;

    areaPathD = `M ${firstX} ${bottomY} ${pathD} L ${lastX} ${bottomY} Z`;

    // Definir gradiente
    const gradientId = `gradient-${id}`;
    const gradientFrom = gradient?.from || 'rgba(246, 192, 60, 0.2)';
    const gradientTo = gradient?.to || 'rgba(255, 255, 255, 0)';

    gradientDef = `
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${gradientFrom}" />
          <stop offset="100%" style="stop-color:${gradientTo}" />
        </linearGradient>
      </defs>
    `;
  }

  // Grid horizontal com labels do eixo Y (0% a 16% de 2% em 2%)
  const totalTicks = Math.max(Math.floor((yAxisMax - yAxisMin) / yAxisStep) + 1, 2);
  const gridLines = showGrid ? Array.from({ length: totalTicks }, (_, i) => {
    const y = padding.top + (i / (totalTicks - 1)) * (100 - padding.top - padding.bottom);
    const value = yAxisMax - (i * yAxisStep);
    return `
      <line x1="${padding.left}" y1="${y}" x2="${100 - padding.right}" y2="${y}" class="chart-grid-line" />
      <text x="${padding.left - 2}" y="${y}" class="chart-label chart-label--y">${value}%</text>
    `;
  }).join('') : '';

  // Labels do eixo X
  const xLabels = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1 || 1)) * (100 - padding.left - padding.right);
    const activeClass = i === activeIndex ? ' chart-label--x-active' : '';
    return `<text x="${x}" y="${100 - padding.bottom + 20}" class="chart-label chart-label--x${activeClass}" data-index="${i}">${d.label}</text>`;
  }).join('');

  // Pontos clicáveis
  const circlePoints = points.map((p, i) => `
    <circle
      cx="${p.x}"
      cy="${p.y}"
      r="3"
      class="chart-point${i === activeIndex ? ' is-active' : ''}"
      style="color: ${color}"
      data-index="${i}"
    />
  `).join('');

  const activePoint = activeIndex !== null && points[activeIndex] ? points[activeIndex] : null;
  const activeTooltipLineOpacity = activePoint ? '0.6' : '0';
  const activeTooltipLineX = activePoint ? activePoint.x : 0;

  return `
    <div class="chart chart--line" id="${id}" data-chart-type="line" data-active-index="${activeIndex ?? ''}">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style="height: ${height}px;">
        ${gradientDef}
        ${gridLines}
        ${fill ? `<path d="${areaPathD}" fill="url(#gradient-${id})" />` : ''}
        <path d="${pathD}" class="chart-line" style="stroke: ${color}" />
      </svg>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position: absolute; top: 0; left: 0; width: 100%; height: ${height}px; pointer-events: none;">
        ${xLabels}
        <line class="chart-tooltip-line" x1="${activeTooltipLineX}" y1="${padding.top}" x2="${activeTooltipLineX}" y2="${100 - padding.bottom}" style="opacity: ${activeTooltipLineOpacity};" />
        <g style="pointer-events: all;">
          ${circlePoints}
        </g>
      </svg>
      ${showTooltip ? `<div class="chart-tooltip" id="${id}-tooltip"></div>` : ''}
    </div>
  `;
}

/**
 * Cria gráfico de barras verticais
 * @param {Object} options
 * @param {Array} options.data - [{ label, value }]
 * @param {string} options.id - ID único
 * @param {number} options.height - Altura em px (default: 300)
 * @param {boolean} options.showGrid - Mostrar grid (default: true)
 * @param {boolean} options.showValues - Mostrar valores em cima (default: true)
 * @param {string} options.color - Cor das barras (default: var(--color-primary))
 */
export function createBarChart(options = {}) {
  const {
    data = [],
    id = `chart-${Math.random().toString(36).substr(2, 9)}`,
    height = 300,
    showGrid = true,
    showValues = true,
    color = 'var(--color-primary)',
  } = options;

  if (data.length === 0) return '<div class="chart-empty">Sem dados</div>';

  const padding = { top: 40, right: 0, bottom: 50, left: 20 };
  const max = Math.max(...data.map(d => d.value));
  const barWidth = (100 - padding.left - padding.right) / data.length * 0.6;
  const spacing = (100 - padding.left - padding.right) / data.length;

  // Grid horizontal
  const gridLines = showGrid ? Array.from({ length: 5 }, (_, i) => {
    const y = padding.top + (i / 4) * (100 - padding.top - padding.bottom);
    const value = Math.round(max * (1 - i / 4));
    return `
      <line x1="${padding.left}" y1="${y}" x2="${100 - padding.right}" y2="${y}" class="chart-grid-line" />
      <text x="${padding.left - 5}" y="${y}" class="chart-label chart-label--y">${value}</text>
    `;
  }).join('') : '';

  // Barras
  const bars = data.map((d, i) => {
    const x = padding.left + i * spacing + (spacing - barWidth) / 2;
    const barHeight = (d.value / max) * (100 - padding.top - padding.bottom);
    const y = 100 - padding.bottom - barHeight;

    return `
      <rect
        x="${x}"
        y="${y}"
        width="${barWidth}"
        height="${barHeight}"
        class="chart-bar"
        style="fill: ${color}"
        data-value="${d.value}"
      />
      ${showValues ? `<text x="${x + barWidth / 2}" y="${y - 5}" class="chart-value">${d.value}</text>` : ''}
      <text x="${x + barWidth / 2}" y="${100 - padding.bottom + 15}" class="chart-label">${d.label}</text>
    `;
  }).join('');

  const baseline = `<line x1="${padding.left}" y1="${stackBottom}" x2="${100 - padding.right}" y2="${stackBottom}" class="chart-axis-line" />`;

  return `
    <div class="chart chart--bar" id="${id}">
      <svg viewBox="0 0 100 100" style="height: ${height}px;">
        ${gridLines}
        ${baseline}
        ${bars}
      </svg>
    </div>
  `;
}

/**
 * Cria gráfico de barras empilhadas
 * @param {Object} options
 * @param {Array} options.data - [{ label, values: [{ label, value, color }] }]
 * @param {Array} options.legend - [{ label, color }]
 * @param {string} options.id - ID único
 * @param {number} options.height - Altura em px (default: 280)
 */
export function createStackedBarChart(options = {}) {
  const {
    data = [],
    legend = [],
    id = `chart-${Math.random().toString(36).substr(2, 9)}`,
    height = 280,
  } = options;

  if (data.length === 0) return '<div class="chart-empty">Sem dados</div>';

  const padding = { top: 5, right: -20, bottom: 50, left: -20 };

  // Calcular máximo total
  const maxTotal = Math.max(...data.map(d =>
    d.values.reduce((sum, v) => sum + v.value, 0)
  ));

  const plotWidth = 100 - padding.left - padding.right;
  const spacing = plotWidth / data.length;
  const barWidth = spacing * 0.6;
  const stackBottom = 100 - padding.bottom;
  const axisY = stackBottom + 4;

  // Grid horizontal
  const gridLines = Array.from({ length: 5 }, (_, i) => {
    const y = padding.top + (i / 4) * (100 - padding.top - padding.bottom);
    return `<line x1="${padding.left}" y1="${y}" x2="${100 - padding.right}" y2="${y}" class="chart-grid-line" />`;
  }).join('');
  const baseline = `<line x1="${padding.left}" y1="${axisY}" x2="${100 - padding.right}" y2="${axisY}" class="chart-axis-line" />`;

  // Barras empilhadas
  const bars = data.map((d, i) => {
    const x = padding.left + i * spacing + (spacing - barWidth) / 2;
    const stackHeight = Math.max(100 - padding.top - padding.bottom, 1);
    const segmentGap = 0.7;
    let currentY = stackBottom;

    const segments = d.values.map((v, segmentIndex) => {
      const rawHeight = (v.value / maxTotal) * stackHeight;
      const rawTop = currentY - rawHeight;
      const hasBelow = segmentIndex > 0;
      const hasAbove = segmentIndex < d.values.length - 1;
      const isBottomSegment = segmentIndex === 0;

      const drawBottom = currentY - (hasBelow ? segmentGap / 2 : 0);
      const drawTop = rawTop + (hasAbove ? segmentGap / 2 : 0);
      const segmentHeight = Math.max(drawBottom - drawTop, 0.35);
      const y = drawBottom - segmentHeight;
      const radius = Math.min(1.2, barWidth / 2, segmentHeight / 2);
      const bottomRadius = isBottomSegment ? radius : 0;
      const segmentPath = `
        M ${x + bottomRadius} ${drawBottom}
        L ${x + barWidth - bottomRadius} ${drawBottom}
        Q ${x + barWidth} ${drawBottom} ${x + barWidth} ${drawBottom - bottomRadius}
        L ${x + barWidth} ${y + radius}
        Q ${x + barWidth} ${y} ${x + barWidth - radius} ${y}
        L ${x + radius} ${y}
        Q ${x} ${y} ${x} ${y + radius}
        L ${x} ${drawBottom - bottomRadius}
        Q ${x} ${drawBottom} ${x + bottomRadius} ${drawBottom}
        Z
      `;
      const rect = `
        <path
          d="${segmentPath}"
          class="chart-bar-segment"
          style="fill: ${v.color}"
          data-label="${v.label}"
          data-value="${v.value}"
        />
      `;
      currentY = rawTop;
      return rect;
    }).reverse().join('');

    const label = `<text x="${x + barWidth / 2}" y="${axisY + 11}" class="chart-label">${d.label}</text>`;

    return segments + label;
  }).join('');

  const ticks = data.map((_, i) => {
    const x = padding.left + i * spacing + (spacing / 2);
    return `<line x1="${x}" y1="${axisY}" x2="${x}" y2="${axisY + 3}" class="chart-axis-tick" />`;
  }).join('');

  // Legenda
  const legendHTML = legend.length > 0 ? `
    <div class="chart-legend">
      ${legend.map(l => `
        <div class="chart-legend-item">
          <span class="chart-legend-color" style="background: ${l.color}"></span>
          <span class="chart-legend-label">${l.label}</span>
        </div>
      `).join('')}
    </div>
  ` : '';

  return `
    <div class="chart chart--stacked-bar" id="${id}">
      ${legendHTML}
      <svg viewBox="0 0 100 100" style="height: ${height}px;">
        ${gridLines}
        ${baseline}
        ${ticks}
        ${bars}
      </svg>
    </div>
  `;
}

/**
 * Inicializa interatividade dos gráficos
 * @param {HTMLElement} container
 * @param {Function} onDataPoint - Callback ao clicar em ponto (recebe data, index)
 */
export function init(container, onDataPoint, options = {}) {
  if (!container) return;

  // Tooltip para line chart
  const lineCharts = container.querySelectorAll('.chart--line');
  lineCharts.forEach(chart => {
    const points = chart.querySelectorAll('.chart-point');
    const tooltip = chart.querySelector('.chart-tooltip');
    const tooltipLine = chart.querySelector('.chart-tooltip-line');
    const xLabels = chart.querySelectorAll('.chart-label--x');
    const defaultIndexAttr = chart.getAttribute('data-active-index');
    const defaultIndex = defaultIndexAttr !== null && defaultIndexAttr !== '' ? Number(defaultIndexAttr) : null;
    const persistentTooltip = options.persistentTooltip !== false;
    let currentIndex = Number.isInteger(defaultIndex) ? defaultIndex : null;

    if (!tooltip) return;

    const updateActiveStyles = (index) => {
      points.forEach((point, pointIndex) => {
        point.classList.toggle('is-active', pointIndex === index);
      });

      xLabels.forEach((label, labelIndex) => {
        label.classList.toggle('chart-label--x-active', labelIndex === index);
      });
    };

    const showPoint = (index) => {
      const point = points[index];
      if (!point) return;

      const cx = Number(point.getAttribute('cx'));
      const cy = Number(point.getAttribute('cy'));
      const chartWidth = chart.clientWidth;
      const chartHeight = chart.clientHeight;
      const left = (cx / 100) * chartWidth;
      const top = (cy / 100) * chartHeight - 10;

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      tooltip.classList.add('is-visible');

      if (tooltipLine) {
        tooltipLine.setAttribute('x1', String(cx));
        tooltipLine.setAttribute('x2', String(cx));
        tooltipLine.style.opacity = '0.6';
      }

      if (onDataPoint) {
        const content = onDataPoint(index);
        if (content) tooltip.innerHTML = content;
      }

      updateActiveStyles(index);
      currentIndex = index;
    };

    const hidePoint = () => {
      tooltip.classList.remove('is-visible');
      if (tooltipLine) {
        tooltipLine.style.opacity = '0';
      }
      currentIndex = null;
      updateActiveStyles(null);
    };

    points.forEach((point, index) => {
      point.addEventListener('mouseenter', () => {
        showPoint(index);
      });

      point.addEventListener('mouseleave', () => {
        if (persistentTooltip && Number.isInteger(defaultIndex)) {
          showPoint(defaultIndex);
          return;
        }
        hidePoint();
      });
    });

    chart.addEventListener('mouseleave', () => {
      if (persistentTooltip && Number.isInteger(defaultIndex)) {
        showPoint(defaultIndex);
        return;
      }
      hidePoint();
    });

    if (Number.isInteger(defaultIndex)) {
      showPoint(defaultIndex);
    } else if (currentIndex !== null) {
      showPoint(currentIndex);
    }
  });

  // Hover para barras
  const bars = container.querySelectorAll('.chart-bar, .chart-bar-segment');
  bars.forEach(bar => {
    bar.addEventListener('mouseenter', () => {
      bar.style.opacity = '0.8';
    });
    bar.addEventListener('mouseleave', () => {
      bar.style.opacity = '1';
    });
  });
}

export default {
  createLineChart,
  createBarChart,
  createStackedBarChart,
  init,
};
