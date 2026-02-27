import './sidenav.css';

/**
 * Side Navigation Component
 */

const icons = {
  chevronRight: `<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Cria navegação lateral completa
 */
export function create(options = {}) {
  const {
    title = '',
    items = [],
    activeItem = '',
    variant = 'default', // default, compact, bordered
    dark = false,
    className = '',
  } = options;

  const classes = ['sidenav'];
  if (variant !== 'default') classes.push(`sidenav--${variant}`);
  if (dark) classes.push('sidenav--dark');
  if (className) classes.push(className);

  const headerHtml = title ? `
    <div class="sidenav-header">
      <h2 class="sidenav-title">${title}</h2>
    </div>
  ` : '';

  const menuHtml = renderMenu(items, activeItem, dark);

  return `
    <nav class="${classes.join(' ')}" data-sidenav>
      ${headerHtml}
      <div class="sidenav-content">
        ${menuHtml}
      </div>
    </nav>
  `;
}

/**
 * Renderiza menu recursivamente
 */
function renderMenu(items, activeItem, dark, level = 0) {
  if (!items || items.length === 0) return '';

  const menuClass = level === 0 ? 'sidenav-menu' : 'sidenav-submenu';

  const itemsHtml = items.map(item => {
    if (item.type === 'section') {
      return `
        <li class="sidenav-section">
          ${item.title ? `<div class="sidenav-section-title">${item.title}</div>` : ''}
          ${renderMenu(item.items, activeItem, dark, level)}
        </li>
      `;
    }

    if (item.type === 'divider') {
      return '<li class="sidenav-divider"></li>';
    }

    const hasSubmenu = item.items && item.items.length > 0;
    const isActive = item.id === activeItem || item.href === activeItem;
    const isExpanded = hasSubmenu && (item.expanded || containsActiveItem(item.items, activeItem));

    const itemClasses = ['sidenav-item'];
    if (isExpanded) itemClasses.push('is-expanded');

    const linkClasses = ['sidenav-link'];
    if (isActive) linkClasses.push('is-active');
    if (item.disabled) linkClasses.push('is-disabled');

    const iconHtml = item.icon ? `<span class="sidenav-icon">${item.icon}</span>` : '';
    const badgeHtml = item.badge ? `<span class="sidenav-badge">${item.badge}</span>` : '';
    const arrowHtml = hasSubmenu ? `<span class="sidenav-arrow">${icons.chevronRight}</span>` : '';

    const tag = item.href && !hasSubmenu ? 'a' : 'button';
    const hrefAttr = item.href && !hasSubmenu ? `href="${item.href}"` : '';
    const dataAttrs = `data-sidenav-item="${item.id || ''}"`;

    const submenuHtml = hasSubmenu ? renderMenu(item.items, activeItem, dark, level + 1) : '';

    return `
      <li class="${itemClasses.join(' ')}">
        <${tag} class="${linkClasses.join(' ')}" ${hrefAttr} ${dataAttrs}>
          ${iconHtml}
          <span class="sidenav-text">${item.label}</span>
          ${badgeHtml}
          ${arrowHtml}
        </${tag}>
        ${submenuHtml}
      </li>
    `;
  }).join('');

  return `<ul class="${menuClass}">${itemsHtml}</ul>`;
}

/**
 * Verifica se submenu contém item ativo
 */
function containsActiveItem(items, activeItem) {
  if (!items) return false;
  return items.some(item => {
    if (item.id === activeItem || item.href === activeItem) return true;
    if (item.items) return containsActiveItem(item.items, activeItem);
    return false;
  });
}

/**
 * Cria item de navegação individual (para demo)
 */
export function createItem(options = {}) {
  const {
    label = 'Item',
    icon = '',
    badge = '',
    active = false,
    disabled = false,
    hasSubmenu = false,
    dark = false,
  } = options;

  const linkClasses = ['sidenav-link'];
  if (active) linkClasses.push('is-active');
  if (disabled) linkClasses.push('is-disabled');

  const iconHtml = icon ? `<span class="sidenav-icon">${icon}</span>` : '';
  const badgeHtml = badge ? `<span class="sidenav-badge">${badge}</span>` : '';
  const arrowHtml = hasSubmenu ? `<span class="sidenav-arrow">${icons.chevronRight}</span>` : '';

  const wrapperClass = dark ? 'sidenav-item-demo sidenav-item-demo--dark' : 'sidenav-item-demo';

  return `
    <div class="${wrapperClass}">
      <button class="${linkClasses.join(' ')}">
        ${iconHtml}
        <span class="sidenav-text">${label}</span>
        ${badgeHtml}
        ${arrowHtml}
      </button>
    </div>
  `;
}

/**
 * Cria menu simples (apenas lista)
 */
export function createMenu(options = {}) {
  const {
    items = [],
    activeItem = '',
    dark = false,
    className = '',
  } = options;

  const classes = ['sidenav-menu'];
  if (className) classes.push(className);

  const itemsHtml = items.map(item => {
    const isActive = item.id === activeItem || item.href === activeItem;
    const linkClasses = ['sidenav-link'];
    if (isActive) linkClasses.push('is-active');
    if (item.disabled) linkClasses.push('is-disabled');

    const tag = item.href ? 'a' : 'button';
    const hrefAttr = item.href ? `href="${item.href}"` : '';

    return `
      <li class="sidenav-item">
        <${tag} class="${linkClasses.join(' ')}" ${hrefAttr} data-sidenav-item="${item.id || ''}">
          <span class="sidenav-text">${item.label}</span>
        </${tag}>
      </li>
    `;
  }).join('');

  const wrapperStyle = dark ? 'background: var(--gray-900); padding: var(--space-2); border-radius: var(--radius-lg);' : '';

  return `
    <div style="${wrapperStyle}">
      <ul class="${classes.join(' ')}" ${dark ? 'style="color: var(--gray-400);"' : ''}>
        ${itemsHtml}
      </ul>
    </div>
  `;
}

/**
 * Inicializa side navigation
 */
export function init(container = document, onChange = null) {
  // Handle expandable items
  container.addEventListener('click', (e) => {
    const link = e.target.closest('.sidenav-link');
    if (!link) return;

    const item = link.closest('.sidenav-item');
    if (!item) return;

    const submenu = item.querySelector('.sidenav-submenu');

    // Toggle submenu if exists
    if (submenu) {
      e.preventDefault();
      item.classList.toggle('is-expanded');
    }

    // Callback
    if (onChange) {
      const itemId = link.dataset.sidenavItem;
      onChange({
        id: itemId,
        element: link,
        hasSubmenu: !!submenu,
        isExpanded: item.classList.contains('is-expanded'),
      });
    }
  });
}

/**
 * Define item ativo
 */
export function setActive(container, itemId) {
  // Remove active from all
  container.querySelectorAll('.sidenav-link.is-active').forEach(link => {
    link.classList.remove('is-active');
  });

  // Add active to target
  const targetLink = container.querySelector(`[data-sidenav-item="${itemId}"]`);
  if (targetLink) {
    targetLink.classList.add('is-active');

    // Expand parent submenus
    let parent = targetLink.closest('.sidenav-submenu');
    while (parent) {
      const parentItem = parent.closest('.sidenav-item');
      if (parentItem) {
        parentItem.classList.add('is-expanded');
      }
      parent = parentItem?.parentElement?.closest('.sidenav-submenu');
    }
  }
}

/**
 * Expande/colapsa item
 */
export function toggle(container, itemId, expanded = null) {
  const link = container.querySelector(`[data-sidenav-item="${itemId}"]`);
  if (!link) return;

  const item = link.closest('.sidenav-item');
  if (!item) return;

  if (expanded === null) {
    item.classList.toggle('is-expanded');
  } else if (expanded) {
    item.classList.add('is-expanded');
  } else {
    item.classList.remove('is-expanded');
  }
}

/**
 * Expande todos os itens
 */
export function expandAll(container) {
  container.querySelectorAll('.sidenav-item').forEach(item => {
    if (item.querySelector('.sidenav-submenu')) {
      item.classList.add('is-expanded');
    }
  });
}

/**
 * Colapsa todos os itens
 */
export function collapseAll(container) {
  container.querySelectorAll('.sidenav-item.is-expanded').forEach(item => {
    item.classList.remove('is-expanded');
  });
}

export default {
  create,
  createItem,
  createMenu,
  init,
  setActive,
  toggle,
  expandAll,
  collapseAll,
  icons,
};
