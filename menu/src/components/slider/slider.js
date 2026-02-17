import './slider.css';

/**
 * Slider Component
 */

/**
 * Cria slider simples
 */
export function create(options = {}) {
  const {
    id = `slider-${Date.now()}`,
    value = 50,
    min = 0,
    max = 100,
    step = 1,
    showTooltip = true,
    showLabels = true,
    showInput = false,
    size = 'md', // sm, md, lg
    color = 'primary', // primary, success, warning, danger
    disabled = false,
    dark = false,
    className = '',
    formatValue = (v) => v,
    formatLabel = (v) => v,
  } = options;

  const percent = ((value - min) / (max - min)) * 100;

  const classes = ['slider'];
  if (size !== 'md') classes.push(`slider--${size}`);
  if (color !== 'primary') classes.push(`slider--${color}`);
  if (disabled) classes.push('slider--disabled');
  if (dark) classes.push('slider--dark');
  if (showTooltip) classes.push('slider--show-tooltip');
  if (className) classes.push(className);

  const inputHtml = showInput ? `
    <div class="slider-header">
      <input type="text" class="slider-input" value="${formatValue(value)}" data-slider-input />
    </div>
  ` : '';

  const labelsHtml = showLabels ? `
    <div class="slider-labels">
      <span>${formatLabel(min)}</span>
      <span>${formatLabel(max)}</span>
    </div>
  ` : '';

  return `
    <div class="${classes.join(' ')}" data-slider data-min="${min}" data-max="${max}" data-step="${step}" data-value="${value}" id="${id}">
      ${inputHtml}
      <div class="slider-track-container">
        <div class="slider-track" data-slider-track>
          <div class="slider-fill" style="left: 0; width: ${percent}%"></div>
          <div class="slider-thumb slider-thumb--lines" style="left: ${percent}%" data-slider-thumb>
            ${showTooltip ? `<div class="slider-tooltip">${formatValue(value)}</div>` : ''}
          </div>
        </div>
      </div>
      ${labelsHtml}
    </div>
  `;
}

/**
 * Cria slider de range (min/max)
 */
export function createRange(options = {}) {
  const {
    id = `slider-range-${Date.now()}`,
    minValue = 20,
    maxValue = 80,
    min = 0,
    max = 100,
    step = 1,
    showTooltip = true,
    showLabels = true,
    showInputs = true,
    minLabel = 'min.*',
    maxLabel = 'max.*',
    size = 'md',
    color = 'primary',
    disabled = false,
    dark = false,
    className = '',
    formatValue = (v) => v,
    formatLabel = (v) => v,
  } = options;

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  const classes = ['slider'];
  if (size !== 'md') classes.push(`slider--${size}`);
  if (color !== 'primary') classes.push(`slider--${color}`);
  if (disabled) classes.push('slider--disabled');
  if (dark) classes.push('slider--dark');
  if (className) classes.push(className);

  const inputsHtml = showInputs ? `
    <div class="slider-header">
      <div class="slider-input-group">
        <label class="slider-input-label">${minLabel}</label>
        <input type="text" class="slider-input" value="${formatValue(minValue)}" data-slider-input-min />
      </div>
      <div class="slider-input-group">
        <label class="slider-input-label">${maxLabel}</label>
        <input type="text" class="slider-input" value="${formatValue(maxValue)}" data-slider-input-max />
      </div>
    </div>
  ` : '';

  const labelsHtml = showLabels ? `
    <div class="slider-labels">
      <span>${formatLabel(min)}</span>
      <span>${formatLabel(max)}</span>
    </div>
  ` : '';

  return `
    <div class="${classes.join(' ')}" data-slider-range data-min="${min}" data-max="${max}" data-step="${step}" data-min-value="${minValue}" data-max-value="${maxValue}" id="${id}">
      ${inputsHtml}
      <div class="slider-track-container">
        <div class="slider-track" data-slider-track>
          <div class="slider-fill" style="left: ${minPercent}%; width: ${maxPercent - minPercent}%"></div>
          <div class="slider-thumb slider-thumb--lines" style="left: ${minPercent}%" data-slider-thumb="min">
            ${showTooltip ? `<div class="slider-tooltip">${formatValue(minValue)}</div>` : ''}
          </div>
          <div class="slider-thumb slider-thumb--lines" style="left: ${maxPercent}%" data-slider-thumb="max">
            ${showTooltip ? `<div class="slider-tooltip">${formatValue(maxValue)}</div>` : ''}
          </div>
        </div>
      </div>
      ${labelsHtml}
    </div>
  `;
}

/**
 * Cria slider com footer de valor total
 */
export function createWithTotal(options = {}) {
  const {
    id = `slider-total-${Date.now()}`,
    minValue = 20,
    maxValue = 80,
    min = 0,
    max = 100,
    step = 1,
    minLabel = 'min.*',
    maxLabel = 'max.*',
    totalLabel = 'Total*',
    totalValue = 'R$ 820',
    showValueDisplay = true,
    valueDisplayText = 'R$ 820',
    dark = false,
    className = '',
    formatValue = (v) => v,
    formatLabel = (v) => v,
  } = options;

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  const classes = ['slider'];
  if (dark) classes.push('slider--dark');
  if (className) classes.push(className);

  return `
    <div class="${classes.join(' ')}" data-slider-range data-min="${min}" data-max="${max}" data-step="${step}" data-min-value="${minValue}" data-max-value="${maxValue}" id="${id}">
      <div class="slider-header">
        <div class="slider-input-group">
          <label class="slider-input-label">${minLabel}</label>
          <input type="text" class="slider-input" value="${formatValue(minValue)}" data-slider-input-min />
        </div>
        <div class="slider-input-group">
          <label class="slider-input-label">${maxLabel}</label>
          <input type="text" class="slider-input" value="${formatValue(maxValue)}" data-slider-input-max />
        </div>
      </div>
      <div class="slider-track-container">
        <div class="slider-track" data-slider-track>
          <div class="slider-fill" style="left: ${minPercent}%; width: ${maxPercent - minPercent}%"></div>
          <div class="slider-thumb slider-thumb--lines" style="left: ${minPercent}%" data-slider-thumb="min">
            <div class="slider-tooltip">${formatValue(minValue)}</div>
          </div>
          <div class="slider-thumb slider-thumb--lines" style="left: ${maxPercent}%" data-slider-thumb="max">
            <div class="slider-tooltip">${formatValue(maxValue)}</div>
          </div>
        </div>
      </div>
      <div class="slider-labels">
        <span>${formatLabel(min)}</span>
        <span>${formatLabel(max)}</span>
      </div>
      <div class="slider-footer">
        ${showValueDisplay ? `<span class="slider-value-display">${valueDisplayText}</span>` : '<span></span>'}
        <div class="slider-total">
          <span class="slider-total-label">${totalLabel}</span>
          <input type="text" class="slider-total-input" value="${totalValue}" data-slider-total />
        </div>
      </div>
    </div>
  `;
}

/**
 * Inicializa sliders
 */
export function init(container = document, onChange = null) {
  const cleanupSimple = initSimpleSliders(container, onChange);
  const cleanupRange = initRangeSliders(container, onChange);

  return () => {
    if (typeof cleanupSimple === 'function') cleanupSimple();
    if (typeof cleanupRange === 'function') cleanupRange();
  };
}

/**
 * Inicializa sliders simples
 */
function initSimpleSliders(container, onChange) {
  const sliders = container.querySelectorAll('[data-slider]:not([data-slider-range])');
  const cleanups = [];

  sliders.forEach(slider => {
    const track = slider.querySelector('[data-slider-track]');
    const thumb = slider.querySelector('[data-slider-thumb]');
    const fill = slider.querySelector('.slider-fill');
    const tooltip = slider.querySelector('.slider-tooltip');
    const input = slider.querySelector('[data-slider-input]');

    if (!track || !thumb) return;

    let isDragging = false;

    const updateValue = (clientX) => {
      const rect = track.getBoundingClientRect();
      const min = parseFloat(slider.dataset.min);
      const max = parseFloat(slider.dataset.max);
      const step = parseFloat(slider.dataset.step);

      let percent = (clientX - rect.left) / rect.width;
      percent = Math.max(0, Math.min(1, percent));

      let value = min + percent * (max - min);
      value = Math.round(value / step) * step;
      value = Math.max(min, Math.min(max, value));

      const finalPercent = ((value - min) / (max - min)) * 100;

      thumb.style.left = `${finalPercent}%`;
      fill.style.width = `${finalPercent}%`;
      slider.dataset.value = value;

      if (tooltip) tooltip.textContent = value;
      if (input) input.value = value;

      if (onChange) {
        onChange({ slider, value, min, max });
      }
    };

    thumb.addEventListener('mousedown', (e) => {
      isDragging = true;
      thumb.classList.add('is-dragging');
      e.preventDefault();
    });

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      updateValue(e.clientX);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        thumb.classList.remove('is-dragging');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    track.addEventListener('click', (e) => {
      if (e.target === thumb) return;
      updateValue(e.clientX);
    });

    // Touch events
    thumb.addEventListener('touchstart', (e) => {
      isDragging = true;
      thumb.classList.add('is-dragging');
    });

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      updateValue(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        isDragging = false;
        thumb.classList.remove('is-dragging');
      }
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    cleanups.push(() => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    });
  });

  return () => cleanups.forEach(fn => fn());
}

/**
 * Inicializa sliders de range
 */
function initRangeSliders(container, onChange) {
  const sliders = container.querySelectorAll('[data-slider-range]');
  const cleanups = [];

  sliders.forEach(slider => {
    const track = slider.querySelector('[data-slider-track]');
    const thumbMin = slider.querySelector('[data-slider-thumb="min"]');
    const thumbMax = slider.querySelector('[data-slider-thumb="max"]');
    const fill = slider.querySelector('.slider-fill');
    const inputMin = slider.querySelector('[data-slider-input-min]');
    const inputMax = slider.querySelector('[data-slider-input-max]');

    if (!track || !thumbMin || !thumbMax) return;

    let activeThumb = null;

    const updateValues = (clientX) => {
      if (!activeThumb) return;

      const rect = track.getBoundingClientRect();
      const min = parseFloat(slider.dataset.min);
      const max = parseFloat(slider.dataset.max);
      const step = parseFloat(slider.dataset.step);

      let percent = (clientX - rect.left) / rect.width;
      percent = Math.max(0, Math.min(1, percent));

      let value = min + percent * (max - min);
      value = Math.round(value / step) * step;
      value = Math.max(min, Math.min(max, value));

      const isMinThumb = activeThumb === thumbMin;
      const otherValue = parseFloat(slider.dataset[isMinThumb ? 'maxValue' : 'minValue']);

      // Prevent crossing
      if (isMinThumb && value > otherValue) value = otherValue;
      if (!isMinThumb && value < otherValue) value = otherValue;

      const finalPercent = ((value - min) / (max - min)) * 100;

      activeThumb.style.left = `${finalPercent}%`;
      slider.dataset[isMinThumb ? 'minValue' : 'maxValue'] = value;

      const tooltip = activeThumb.querySelector('.slider-tooltip');
      if (tooltip) tooltip.textContent = value;

      if (isMinThumb && inputMin) inputMin.value = value;
      if (!isMinThumb && inputMax) inputMax.value = value;

      // Update fill
      const minVal = parseFloat(slider.dataset.minValue);
      const maxVal = parseFloat(slider.dataset.maxValue);
      const minPercent = ((minVal - min) / (max - min)) * 100;
      const maxPercent = ((maxVal - min) / (max - min)) * 100;
      fill.style.left = `${minPercent}%`;
      fill.style.width = `${maxPercent - minPercent}%`;

      if (onChange) {
        onChange({ slider, minValue: minVal, maxValue: maxVal, min, max });
      }
    };

    [thumbMin, thumbMax].forEach(thumb => {
      thumb.addEventListener('mousedown', (e) => {
        activeThumb = thumb;
        thumb.classList.add('is-dragging');
        e.preventDefault();
      });

      thumb.addEventListener('touchstart', (e) => {
        activeThumb = thumb;
        thumb.classList.add('is-dragging');
      });
    });

    const handleMouseMove = (e) => {
      if (!activeThumb) return;
      updateValues(e.clientX);
    };

    const handleMouseUp = () => {
      if (activeThumb) {
        activeThumb.classList.remove('is-dragging');
        activeThumb = null;
      }
    };

    const handleTouchMove = (e) => {
      if (!activeThumb) return;
      updateValues(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (activeThumb) {
        activeThumb.classList.remove('is-dragging');
        activeThumb = null;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    cleanups.push(() => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    });
  });

  return () => cleanups.forEach(fn => fn());
}

/**
 * Obtém valor de um slider
 */
export function getValue(slider) {
  if (slider.dataset.sliderRange !== undefined) {
    return {
      minValue: parseFloat(slider.dataset.minValue),
      maxValue: parseFloat(slider.dataset.maxValue),
    };
  }
  return parseFloat(slider.dataset.value);
}

/**
 * Define valor de um slider
 */
export function setValue(slider, value, maxValue = null) {
  const min = parseFloat(slider.dataset.min);
  const max = parseFloat(slider.dataset.max);

  if (slider.dataset.sliderRange !== undefined && maxValue !== null) {
    // Range slider
    const minPercent = ((value - min) / (max - min)) * 100;
    const maxPercent = ((maxValue - min) / (max - min)) * 100;

    const thumbMin = slider.querySelector('[data-slider-thumb="min"]');
    const thumbMax = slider.querySelector('[data-slider-thumb="max"]');
    const fill = slider.querySelector('.slider-fill');

    if (thumbMin) thumbMin.style.left = `${minPercent}%`;
    if (thumbMax) thumbMax.style.left = `${maxPercent}%`;
    if (fill) {
      fill.style.left = `${minPercent}%`;
      fill.style.width = `${maxPercent - minPercent}%`;
    }

    slider.dataset.minValue = value;
    slider.dataset.maxValue = maxValue;
  } else {
    // Simple slider
    const percent = ((value - min) / (max - min)) * 100;
    const thumb = slider.querySelector('[data-slider-thumb]');
    const fill = slider.querySelector('.slider-fill');

    if (thumb) thumb.style.left = `${percent}%`;
    if (fill) fill.style.width = `${percent}%`;

    slider.dataset.value = value;
  }
}

export default {
  create,
  createRange,
  createWithTotal,
  init,
  getValue,
  setValue,
};
