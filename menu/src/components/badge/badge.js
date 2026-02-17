import './badge.css';

/**
 * Badge Component
 *
 * Uso:
 * <span class="badge badge--primary">Badge</span>
 * <span class="badge badge--soft-success">
 *   <span class="badge-dot"></span>
 *   Success
 * </span>
 */

const icons = {
  check: `<svg viewBox="0 0 14 14" fill="none"><path d="M11.5 4L5.5 10L2.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  x: `<svg viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  dot: `<span class="badge-dot"></span>`,
};

/**
 * Cria um badge
 */
export function create(options = {}) {
  const {
    text = '',
    variant = 'primary',
    style = 'filled', // filled, soft, outline
    size = '',
    icon = '', // check, x, dot
    darkMode = false,
  } = options;

  const classes = ['badge'];

  // Variante com estilo
  if (style === 'filled') {
    classes.push(`badge--${variant}`);
  } else {
    classes.push(`badge--${style}-${variant}`);
  }

  if (size) classes.push(`badge--${size}`);
  if (darkMode) classes.push('badge--dark-mode');

  let iconHtml = '';
  if (icon && icons[icon]) {
    iconHtml = icon === 'dot'
      ? icons[icon]
      : `<span class="badge-icon">${icons[icon]}</span>`;
  }

  return `<span class="${classes.join(' ')}">${iconHtml}${text}</span>`;
}

export function init() {
  // Badge não precisa de inicialização JS
}

export default { create, init };
