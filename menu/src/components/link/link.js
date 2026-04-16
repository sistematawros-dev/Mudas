import './link.css';

/**
 * Link Component
 * Componente de hiperlink estilizado
 */

const icons = {
  external: `<svg viewBox="0 0 12 12" fill="none"><path d="M3.5 1.5h7v7M10 2L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowRight: `<svg viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Cria um link
 */
export function create(options = {}) {
  const {
    label = 'Label',
    href = '#',
    target = '_self',
    variant = 'brand', // brand, neutral, inverted
    size = 'md', // sm, md, lg
    external = false,
    icon = null, // custom icon
    iconPosition = 'right', // left, right
    underline = 'hover', // hover, always, none
    disabled = false,
    dark = false,
    inline = false,
    className = '',
    onClick = null,
  } = options;

  const classes = ['link', `link--${variant}`];

  // Size
  if (size !== 'md') classes.push(`link--${size}`);

  // Underline
  if (underline === 'none') classes.push('link--no-underline');
  if (underline === 'always') classes.push('link--underline');

  // Modifiers
  if (dark) classes.push('link--dark');
  if (disabled) classes.push('is-disabled');
  if (inline) classes.push('link--inline');
  if (className) classes.push(className);

  // External link settings
  const targetAttr = external ? '_blank' : target;
  const relAttr = external ? 'rel="noopener noreferrer"' : '';

  // Icon
  const linkIcon = external ? icons.external : icon;
  const iconHtml = linkIcon ? `<span class="link-icon">${linkIcon}</span>` : '';

  // Click handler
  const clickAttr = onClick ? `onclick="${onClick}"` : '';

  // Build HTML
  let html = '';
  if (iconPosition === 'left' && linkIcon) {
    html = `${iconHtml}<span>${label}</span>`;
  } else if (linkIcon) {
    html = `<span>${label}</span>${iconHtml}`;
  } else {
    html = label;
  }

  return `<a href="${href}" target="${targetAttr}" ${relAttr} class="${classes.join(' ')}" ${clickAttr}>${html}</a>`;
}

/**
 * Cria um link externo
 */
export function createExternal(options = {}) {
  return create({
    ...options,
    external: true,
  });
}

/**
 * Cria um link brand (primário)
 */
export function createBrand(options = {}) {
  return create({
    ...options,
    variant: 'brand',
  });
}

/**
 * Cria um link neutral
 */
export function createNeutral(options = {}) {
  return create({
    ...options,
    variant: 'neutral',
  });
}

/**
 * Cria um link invertido (para fundos escuros)
 */
export function createInverted(options = {}) {
  return create({
    ...options,
    variant: 'inverted',
  });
}

/**
 * Cria um grupo de links
 */
export function createGroup(options = {}) {
  const {
    links = [],
    vertical = false,
    className = '',
  } = options;

  const classes = ['link-group'];
  if (vertical) classes.push('link-group--vertical');
  if (className) classes.push(className);

  const linksHtml = links.map(link => {
    if (typeof link === 'string') {
      return create({ label: link, href: '#' });
    }
    return create(link);
  }).join('');

  return `<div class="${classes.join(' ')}">${linksHtml}</div>`;
}

export default {
  create,
  createExternal,
  createBrand,
  createNeutral,
  createInverted,
  createGroup,
  icons
};
