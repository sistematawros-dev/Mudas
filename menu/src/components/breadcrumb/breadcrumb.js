import './breadcrumb.css';

/**
 * Breadcrumb Component
 *
 * Uso:
 * <nav class="breadcrumb">
 *   <div class="breadcrumb-item">
 *     <a href="#" class="breadcrumb-link">Home</a>
 *     <span class="breadcrumb-separator">/</span>
 *   </div>
 *   <div class="breadcrumb-item is-current">
 *     <span class="breadcrumb-current">Current Page</span>
 *   </div>
 * </nav>
 */

const icons = {
  home: `<svg viewBox="0 0 16 16" fill="none"><path d="M2 6L8 1.5L14 6V13.5C14 14.0523 13.5523 14.5 13 14.5H3C2.44772 14.5 2 14.0523 2 13.5V6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 14.5V8H10V14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevron: `<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Cria um breadcrumb
 */
export function create(items, options = {}) {
  const {
    separator = '/',
    dark = false,
    size = '',
    showHomeIcon = true,
  } = options;

  const classes = ['breadcrumb'];
  if (dark) classes.push('breadcrumb--dark');
  if (size) classes.push(`breadcrumb--${size}`);

  const itemsHtml = items.map((item, index) => {
    const isLast = index === items.length - 1;
    const isFirst = index === 0;

    let iconHtml = '';
    if (isFirst && showHomeIcon) {
      iconHtml = `<span class="breadcrumb-icon">${icons.home}</span>`;
    }

    const separatorHtml = !isLast
      ? `<span class="breadcrumb-separator">${separator}</span>`
      : '';

    if (isLast) {
      return `
        <div class="breadcrumb-item is-current">
          <span class="breadcrumb-current">${item.label}</span>
        </div>
      `;
    }

    return `
      <div class="breadcrumb-item">
        <a href="${item.href || '#'}" class="breadcrumb-link">
          ${iconHtml}
          ${item.label}
        </a>
        ${separatorHtml}
      </div>
    `;
  }).join('');

  return `<nav class="${classes.join(' ')}">${itemsHtml}</nav>`;
}

export function init() {
  // Breadcrumb não precisa de inicialização JS
}

export default { create, init };
