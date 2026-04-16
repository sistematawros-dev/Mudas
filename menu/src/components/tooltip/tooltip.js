import './tooltip.css';

/**
 * Tooltip Component
 */

const icons = {
  close: `<svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  slot: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Cria tooltip plain (simples)
 */
export function create(options = {}) {
  const {
    id = `tooltip-${Date.now()}`,
    content = '',
    position = 'top', // top, top-left, top-right, bottom, bottom-left, bottom-right, left, left-top, left-bottom, right, right-top, right-bottom
    variant = 'dark', // dark, light
    animation = 'fade', // fade, scale
    noArrow = false,
    className = '',
  } = options;

  const classes = ['tooltip', `tooltip--${position}`];
  if (variant === 'light') classes.push('tooltip--light');
  if (animation !== 'fade') classes.push(`tooltip--${animation}`);
  if (noArrow) classes.push('tooltip--no-arrow');
  if (className) classes.push(className);

  return `
    <div class="${classes.join(' ')}" id="${id}" role="tooltip">
      ${content}
    </div>
  `;
}

/**
 * Cria tooltip rich (com título, descrição, slot e ação)
 */
export function createRich(options = {}) {
  const {
    id = `tooltip-${Date.now()}`,
    title = '',
    description = '',
    slot = null, // { label: 'Slot', icon: '◆' } or HTML string
    action = null, // { label: 'Action', onClick: () => {} }
    closable = true,
    position = 'top',
    variant = 'dark', // dark, light
    animation = 'fade',
    noArrow = false,
    className = '',
  } = options;

  const classes = ['tooltip', 'tooltip--rich', `tooltip--${position}`];
  if (variant === 'light') classes.push('tooltip--light');
  if (animation !== 'fade') classes.push(`tooltip--${animation}`);
  if (noArrow) classes.push('tooltip--no-arrow');
  if (!slot) classes.push('tooltip--simple');
  if (className) classes.push(className);

  // Slot content
  let slotHtml = '';
  if (slot) {
    if (typeof slot === 'string') {
      slotHtml = `<div class="tooltip-slot">${slot}</div>`;
    } else {
      slotHtml = `
        <div class="tooltip-slot">
          <div class="tooltip-slot-label">
            <span class="tooltip-slot-icon">${slot.icon || '◆'}</span>
            <span>${slot.label || 'Substitua por Componente'}</span>
          </div>
        </div>
      `;
    }
  }

  return `
    <div class="${classes.join(' ')}" id="${id}" role="tooltip">
      <div class="tooltip-header">
        <span class="tooltip-title">${title}</span>
        ${closable ? `<button class="tooltip-close" data-tooltip-close>${icons.close}</button>` : ''}
      </div>
      ${description ? `
        <div class="tooltip-body">
          <p class="tooltip-description">${description}</p>
        </div>
      ` : ''}
      ${slotHtml}
      ${action ? `
        <div class="tooltip-footer">
          <button class="tooltip-action" data-tooltip-action>${action.label}</button>
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * Cria wrapper com trigger e tooltip
 */
export function createWithTrigger(options = {}) {
  const {
    trigger = '',
    tooltip = {},
    rich = false,
  } = options;

  const tooltipHtml = rich ? createRich(tooltip) : create(tooltip);

  return `
    <span class="tooltip-trigger" data-tooltip-trigger>
      ${trigger}
      ${tooltipHtml}
    </span>
  `;
}

/**
 * Mostra tooltip
 */
export function show(element) {
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }
  if (element) {
    element.classList.add('is-visible');
  }
}

/**
 * Esconde tooltip
 */
export function hide(element) {
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }
  if (element) {
    element.classList.remove('is-visible');
  }
}

/**
 * Toggle tooltip
 */
export function toggle(element) {
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }
  if (element) {
    element.classList.toggle('is-visible');
  }
}

/**
 * Inicializa tooltips
 */
export function init(container = document, callbacks = {}) {
  const { onShow, onHide, onAction, onClose } = callbacks;

  // Hover triggers
  const handleMouseEnter = (e) => {
    const trigger = e.target.closest('[data-tooltip-trigger]');
    if (trigger) {
      const tooltip = trigger.querySelector('.tooltip');
      if (tooltip && !tooltip.classList.contains('tooltip--rich')) {
        show(tooltip);
        if (onShow) onShow({ trigger, tooltip });
      }
    }
  };

  const handleMouseLeave = (e) => {
    const trigger = e.target.closest('[data-tooltip-trigger]');
    if (trigger) {
      const tooltip = trigger.querySelector('.tooltip');
      if (tooltip && !tooltip.classList.contains('tooltip--rich')) {
        hide(tooltip);
        if (onHide) onHide({ trigger, tooltip });
      }
    }
  };

  // Focus triggers
  const handleFocusIn = (e) => {
    const trigger = e.target.closest('[data-tooltip-trigger]');
    if (trigger) {
      const tooltip = trigger.querySelector('.tooltip');
      if (tooltip && !tooltip.classList.contains('tooltip--rich')) {
        show(tooltip);
        if (onShow) onShow({ trigger, tooltip });
      }
    }
  };

  const handleFocusOut = (e) => {
    const trigger = e.target.closest('[data-tooltip-trigger]');
    if (trigger) {
      const tooltip = trigger.querySelector('.tooltip');
      if (tooltip && !tooltip.classList.contains('tooltip--rich')) {
        hide(tooltip);
        if (onHide) onHide({ trigger, tooltip });
      }
    }
  };

  // Click triggers for rich tooltips
  const handleClick = (e) => {
    const trigger = e.target.closest('[data-tooltip-trigger]');
    if (trigger) {
      const tooltip = trigger.querySelector('.tooltip--rich');
      if (tooltip && !e.target.closest('.tooltip--rich')) {
        toggle(tooltip);
        if (tooltip.classList.contains('is-visible')) {
          if (onShow) onShow({ trigger, tooltip });
        } else {
          if (onHide) onHide({ trigger, tooltip });
        }
      }
    }

    // Close button
    const closeBtn = e.target.closest('[data-tooltip-close]');
    if (closeBtn) {
      const tooltip = closeBtn.closest('.tooltip');
      if (tooltip) {
        hide(tooltip);
        if (onClose) onClose({ tooltip });
        if (onHide) onHide({ tooltip });
      }
    }

    // Action button
    const actionBtn = e.target.closest('[data-tooltip-action]');
    if (actionBtn) {
      const tooltip = actionBtn.closest('.tooltip');
      if (onAction) onAction({ tooltip, button: actionBtn });
    }

    // Click outside to close rich tooltips
    if (!e.target.closest('[data-tooltip-trigger]')) {
      container.querySelectorAll('.tooltip--rich.is-visible').forEach(tooltip => {
        hide(tooltip);
        if (onHide) onHide({ tooltip });
      });
    }
  };

  // Escape key to close
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      container.querySelectorAll('.tooltip.is-visible').forEach(tooltip => {
        hide(tooltip);
        if (onHide) onHide({ tooltip });
      });
    }
  };

  container.addEventListener('mouseenter', handleMouseEnter, true);
  container.addEventListener('mouseleave', handleMouseLeave, true);
  container.addEventListener('focusin', handleFocusIn);
  container.addEventListener('focusout', handleFocusOut);
  container.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeyDown);

  return () => {
    container.removeEventListener('mouseenter', handleMouseEnter, true);
    container.removeEventListener('mouseleave', handleMouseLeave, true);
    container.removeEventListener('focusin', handleFocusIn);
    container.removeEventListener('focusout', handleFocusOut);
    container.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Cria tooltip programaticamente e anexa a um elemento
 */
export function attach(targetElement, options = {}) {
  if (typeof targetElement === 'string') {
    targetElement = document.querySelector(targetElement);
  }
  if (!targetElement) return null;

  const {
    content = '',
    position = 'top',
    variant = 'dark',
    rich = false,
    ...restOptions
  } = options;

  // Wrap target in trigger if not already
  if (!targetElement.classList.contains('tooltip-trigger')) {
    const wrapper = document.createElement('span');
    wrapper.className = 'tooltip-trigger';
    wrapper.setAttribute('data-tooltip-trigger', '');
    targetElement.parentNode.insertBefore(wrapper, targetElement);
    wrapper.appendChild(targetElement);
    targetElement = wrapper;
  }

  // Create tooltip
  const tooltipHtml = rich
    ? createRich({ position, variant, ...restOptions })
    : create({ content, position, variant, ...restOptions });

  // Remove existing tooltip
  const existingTooltip = targetElement.querySelector('.tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }

  // Add new tooltip
  targetElement.insertAdjacentHTML('beforeend', tooltipHtml);

  return targetElement.querySelector('.tooltip');
}

/**
 * Remove tooltip de um elemento
 */
export function detach(targetElement) {
  if (typeof targetElement === 'string') {
    targetElement = document.querySelector(targetElement);
  }
  if (!targetElement) return;

  const trigger = targetElement.closest('.tooltip-trigger');
  if (trigger) {
    const tooltip = trigger.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }
}

/**
 * Posições disponíveis
 */
export const positions = [
  'top',
  'top-left',
  'top-right',
  'bottom',
  'bottom-left',
  'bottom-right',
  'left',
  'left-top',
  'left-bottom',
  'right',
  'right-top',
  'right-bottom',
];

export default {
  create,
  createRich,
  createWithTrigger,
  show,
  hide,
  toggle,
  init,
  attach,
  detach,
  positions,
  icons,
};
