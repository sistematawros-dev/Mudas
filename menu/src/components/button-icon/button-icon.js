import './button-icon.css';

/**
 * Button Icon Component
 * Botões apenas com ícones
 */

const icons = {
  plus: `<svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  minus: `<svg viewBox="0 0 16 16" fill="none"><path d="M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  close: `<svg viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  check: `<svg viewBox="0 0 16 16" fill="none"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  edit: `<svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  trash: `<svg viewBox="0 0 16 16" fill="none"><path d="M3 4H13M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  chevronDown: `<svg viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronUp: `<svg viewBox="0 0 16 16" fill="none"><path d="M4 10L8 6L12 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronRight: `<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  menu: `<svg viewBox="0 0 16 16" fill="none"><path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  moreVertical: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3" r="1" fill="currentColor"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="8" cy="13" r="1" fill="currentColor"/></svg>`,
  moreHorizontal: `<svg viewBox="0 0 16 16" fill="none"><circle cx="3" cy="8" r="1" fill="currentColor"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="13" cy="8" r="1" fill="currentColor"/></svg>`,
  settings: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 1V3M8 13V15M1 8H3M13 8H15M2.93 2.93L4.34 4.34M11.66 11.66L13.07 13.07M2.93 13.07L4.34 11.66M11.66 4.34L13.07 2.93" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  user: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M2 14C2 11.2386 4.23858 9 7 9H9C11.7614 9 14 11.2386 14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  heart: `<svg viewBox="0 0 16 16" fill="none"><path d="M8 14L2.5 8.5C1.11929 7.11929 1.11929 4.88071 2.5 3.5C3.88071 2.11929 6.11929 2.11929 7.5 3.5L8 4L8.5 3.5C9.88071 2.11929 12.1193 2.11929 13.5 3.5C14.8807 4.88071 14.8807 7.11929 13.5 8.5L8 14Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  star: `<svg viewBox="0 0 16 16" fill="none"><path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  copy: `<svg viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M11 5V3C11 2.44772 10.5523 2 10 2H3C2.44772 2 2 2.44772 2 3V10C2 10.5523 2.44772 11 3 11H5" stroke="currentColor" stroke-width="1.5"/></svg>`,
  download: `<svg viewBox="0 0 16 16" fill="none"><path d="M8 2V10M8 10L5 7M8 10L11 7M3 14H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  upload: `<svg viewBox="0 0 16 16" fill="none"><path d="M8 10V2M8 2L5 5M8 2L11 5M3 14H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Cria um botão com ícone
 */
export function create(options = {}) {
  const {
    icon = 'plus',
    variant = 'primary',
    style = 'solid', // solid, outline, text
    size = 'md',
    shape = '', // rounded, square
    disabled = false,
    darkMode = false,
  } = options;

  const classes = ['btn-icon-only', `btn-icon-only--${size}`];

  // Variante com estilo
  if (style === 'solid') {
    classes.push(`btn-icon-only--${variant}`);
  } else {
    classes.push(`btn-icon-only--${style}-${variant}`);
  }

  if (shape) classes.push(`btn-icon-only--${shape}`);
  if (darkMode) classes.push('btn-icon-only--dark-mode');

  const iconSvg = icons[icon] || icons.plus;
  const disabledAttr = disabled ? 'disabled' : '';

  return `<button type="button" class="${classes.join(' ')}" ${disabledAttr}>${iconSvg}</button>`;
}

/**
 * Retorna o SVG de um ícone
 */
export function getIcon(name) {
  return icons[name] || '';
}

/**
 * Lista de ícones disponíveis
 */
export function getIconNames() {
  return Object.keys(icons);
}

export function init() {
  // Não precisa de inicialização
}

export default { create, getIcon, getIconNames, init };
