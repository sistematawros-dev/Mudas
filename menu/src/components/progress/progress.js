import './progress.css';

/**
 * Progress Component
 */

/**
 * Cria barra de progresso
 */
export function createBar(options = {}) {
  const {
    value = 0,
    max = 100,
    label = '',
    showValue = true,
    size = 'md', // sm, md, lg
    color = 'primary', // primary, success, warning, danger, info
    striped = false,
    animated = false,
    indeterminate = false,
    dark = false,
    className = '',
  } = options;

  const percent = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));

  const classes = ['progress'];
  if (size !== 'md') classes.push(`progress--${size}`);
  if (color !== 'primary') classes.push(`progress--${color}`);
  if (striped) classes.push('progress--striped');
  if (animated) classes.push('progress--animated');
  if (indeterminate) classes.push('progress--indeterminate');
  if (dark) classes.push('progress--dark');
  if (className) classes.push(className);

  const hasHeader = label || showValue;

  let headerHtml = '';
  if (hasHeader && !indeterminate) {
    headerHtml = `
      <div class="progress-header">
        ${label ? `<span class="progress-label">${label}</span>` : ''}
        ${showValue ? `<span class="progress-value">${Math.round(percent)}%</span>` : ''}
      </div>
    `;
  } else if (label) {
    headerHtml = `
      <div class="progress-header">
        <span class="progress-label">${label}</span>
      </div>
    `;
  }

  return `
    <div class="${classes.join(' ')}" data-progress role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="${max}">
      ${headerHtml}
      <div class="progress-track">
        <div class="progress-fill" style="width: ${percent}%"></div>
      </div>
    </div>
  `;
}

/**
 * Cria círculo de progresso
 */
export function createCircle(options = {}) {
  const {
    value = 0,
    max = 100,
    size = 'md', // sm, md, lg, xl
    color = 'primary', // primary, success, warning, danger, info
    strokeWidth = 4,
    showValue = true,
    label = '',
    indeterminate = false,
    dark = false,
    className = '',
  } = options;

  const percent = indeterminate ? 25 : Math.min(100, Math.max(0, (value / max) * 100));

  // Calculate dimensions based on size
  const dimensions = {
    sm: { size: 48, stroke: 3 },
    md: { size: 72, stroke: 4 },
    lg: { size: 96, stroke: 5 },
    xl: { size: 120, stroke: 6 },
  };

  const dim = dimensions[size] || dimensions.md;
  const svgSize = dim.size;
  const stroke = strokeWidth || dim.stroke;
  const radius = (svgSize - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const classes = ['progress-circle', `progress-circle--${size}`];
  if (color !== 'primary') classes.push(`progress-circle--${color}`);
  if (indeterminate) classes.push('progress-circle--indeterminate');
  if (dark) classes.push('progress-circle--dark');
  if (className) classes.push(className);

  const contentHtml = showValue || label ? `
    <div class="progress-circle-content">
      ${showValue && !indeterminate ? `<span class="progress-circle-value">${Math.round(percent)}%</span>` : ''}
      ${label ? `<span class="progress-circle-label">${label}</span>` : ''}
    </div>
  ` : '';

  return `
    <div class="${classes.join(' ')}" data-progress-circle role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="${max}">
      <svg width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}">
        <circle
          class="progress-circle-track"
          cx="${svgSize / 2}"
          cy="${svgSize / 2}"
          r="${radius}"
          stroke-width="${stroke}"
        />
        <circle
          class="progress-circle-fill"
          cx="${svgSize / 2}"
          cy="${svgSize / 2}"
          r="${radius}"
          stroke-width="${stroke}"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${offset}"
        />
      </svg>
      ${contentHtml}
    </div>
  `;
}

/**
 * Cria grupo de barras empilhadas
 */
export function createStacked(options = {}) {
  const {
    segments = [],
    size = 'md',
    dark = false,
    className = '',
  } = options;

  const classes = ['progress'];
  if (size !== 'md') classes.push(`progress--${size}`);
  if (dark) classes.push('progress--dark');
  if (className) classes.push(className);

  const total = segments.reduce((sum, seg) => sum + (seg.value || 0), 0);

  const fills = segments.map(seg => {
    const percent = total > 0 ? (seg.value / total) * 100 : 0;
    const colorClass = seg.color ? `var(--${seg.color})` : 'var(--primary)';
    return `<div class="progress-fill" style="width: ${percent}%; background: ${colorClass}; border-radius: 0;"></div>`;
  }).join('');

  return `
    <div class="${classes.join(' ')}" data-progress-stacked>
      <div class="progress-track" style="display: flex;">
        ${fills}
      </div>
    </div>
  `;
}

/**
 * Atualiza valor da barra de progresso
 */
export function updateBar(element, value, max = 100) {
  const fill = element.querySelector('.progress-fill');
  const valueEl = element.querySelector('.progress-value');

  if (fill) {
    const percent = Math.min(100, Math.max(0, (value / max) * 100));
    fill.style.width = `${percent}%`;

    if (valueEl) {
      valueEl.textContent = `${Math.round(percent)}%`;
    }

    element.setAttribute('aria-valuenow', value);
  }
}

/**
 * Atualiza valor do círculo de progresso
 */
export function updateCircle(element, value, max = 100) {
  const fill = element.querySelector('.progress-circle-fill');
  const valueEl = element.querySelector('.progress-circle-value');

  if (fill) {
    const percent = Math.min(100, Math.max(0, (value / max) * 100));
    const radius = parseFloat(fill.getAttribute('r'));
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    fill.style.strokeDashoffset = offset;

    if (valueEl) {
      valueEl.textContent = `${Math.round(percent)}%`;
    }

    element.setAttribute('aria-valuenow', value);
  }
}

/**
 * Cria barra de progresso simples (apenas barra)
 */
export function createSimpleBar(options = {}) {
  const {
    value = 0,
    max = 100,
    color = 'primary',
    size = 'md',
    dark = false,
  } = options;

  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  const classes = ['progress'];
  if (size !== 'md') classes.push(`progress--${size}`);
  if (color !== 'primary') classes.push(`progress--${color}`);
  if (dark) classes.push('progress--dark');

  return `
    <div class="${classes.join(' ')}" data-progress>
      <div class="progress-track">
        <div class="progress-fill" style="width: ${percent}%"></div>
      </div>
    </div>
  `;
}

export default {
  createBar,
  createCircle,
  createStacked,
  createSimpleBar,
  updateBar,
  updateCircle,
};
