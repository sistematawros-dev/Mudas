import './button.css';

/**
 * Button Component
 *
 * Uso:
 * <button class="btn btn--primary">Label</button>
 * <button class="btn btn--outline-info btn--sm">Label</button>
 * <a href="#" class="btn btn--text-success">Link</a>
 */

const icons = {
  plus: `<svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  check: `<svg viewBox="0 0 16 16" fill="none"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronRight: `<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronDown: `<svg viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  download: `<svg viewBox="0 0 16 16" fill="none"><path d="M8 2V10M8 10L5 7M8 10L11 7M3 14H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  upload: `<svg viewBox="0 0 16 16" fill="none"><path d="M8 10V2M8 2L5 5M8 2L11 5M3 14H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  edit: `<svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  trash: `<svg viewBox="0 0 16 16" fill="none"><path d="M3 4H13M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  close: `<svg viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  search: `<svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};

/**
 * Cria um botão
 */
export function create(options = {}) {
  const {
    text = '',
    variant = 'primary',
    style = 'solid', // solid, outline, text, soft
    size = '',
    iconLeft = '',
    iconRight = '',
    iconOnly = false,
    disabled = false,
    loading = false,
    block = false,
    darkMode = false,
    tag = 'button',
    href = '',
    type = 'button',
  } = options;

  const classes = ['btn'];

  // Variante com estilo
  if (style === 'solid') {
    classes.push(`btn--${variant}`);
  } else {
    classes.push(`btn--${style}-${variant}`);
  }

  if (size) classes.push(`btn--${size}`);
  if (iconOnly) classes.push('btn--icon-only');
  if (loading) classes.push('btn--loading');
  if (block) classes.push('btn--block');
  if (darkMode) classes.push('btn--dark-mode');

  const leftIconHtml = iconLeft && icons[iconLeft]
    ? `<span class="btn-icon">${icons[iconLeft]}</span>`
    : '';

  const rightIconHtml = iconRight && icons[iconRight]
    ? `<span class="btn-icon">${icons[iconRight]}</span>`
    : '';

  const content = iconOnly && iconLeft
    ? `<span class="btn-icon">${icons[iconLeft]}</span>`
    : `${leftIconHtml}${text}${rightIconHtml}`;

  const disabledAttr = disabled ? 'disabled' : '';

  if (tag === 'a') {
    return `<a href="${href}" class="${classes.join(' ')}">${content}</a>`;
  }

  return `<button type="${type}" class="${classes.join(' ')}" ${disabledAttr}>${content}</button>`;
}

/**
 * Retorna o HTML de um ícone
 */
export function getIcon(name) {
  return icons[name] || '';
}

export function init() {
  // Button não precisa de inicialização JS
}

export default { create, getIcon, init };
