import './navbar.css';

/**
 * Navigation Bar Component
 */

const icons = {
  menu: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none"><path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronDown: `<svg viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/><path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none"><path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Cria Top Navbar
 */
export function createTopNav(options = {}) {
  const {
    logo = 'TAWROS',
    logoIcon = '',
    links = [],
    activeLink = '',
    showSearch = true,
    showLogin = true,
    loginText = 'Login',
    searchPlaceholder = '',
    elevated = false,
    dark = false,
    className = '',
  } = options;

  const classes = ['navbar'];
  if (elevated) classes.push('navbar--elevated');
  if (dark) classes.push('navbar--dark');
  if (className) classes.push(className);

  const logoHtml = `
    <div class="navbar-brand">
      <button class="navbar-toggle" data-navbar-toggle>
        ${icons.menu}
      </button>
      <a href="#" class="navbar-logo">
        ${logoIcon ? `<img src="${logoIcon}" alt="${logo}" />` : ''}
        <span>${logo}</span>
      </a>
    </div>
  `;

  const linksHtml = links.length > 0 ? `
    <ul class="navbar-nav">
      ${links.map(link => {
        const isActive = link.id === activeLink || link.href === activeLink;
        const hasDropdown = link.items && link.items.length > 0;
        return `
          <li>
            <a href="${link.href || '#'}" class="navbar-link ${isActive ? 'is-active' : ''}" data-navbar-link="${link.id || ''}">
              <span>${link.label}</span>
              ${hasDropdown ? icons.chevronDown : ''}
            </a>
          </li>
        `;
      }).join('')}
    </ul>
  ` : '';

  const searchHtml = showSearch ? `
    <div class="navbar-search">
      <span class="navbar-search-icon">${icons.search}</span>
      <input type="text" class="navbar-search-input" placeholder="${searchPlaceholder}" />
      <button class="navbar-search-btn" data-navbar-search-mobile>
        ${icons.search}
      </button>
    </div>
  ` : '';

  const loginHtml = showLogin ? `
    <button class="btn btn--primary btn--sm">
      ${icons.user}
      <span>${loginText}</span>
    </button>
  ` : '';

  return `
    <nav class="${classes.join(' ')}" data-navbar>
      ${logoHtml}
      ${linksHtml}
      <div class="navbar-actions">
        ${searchHtml}
        ${loginHtml}
      </div>
    </nav>
  `;
}

/**
 * Cria Navbar Tablet (simplificada)
 */
export function createTabletNav(options = {}) {
  const {
    logo = 'TAWROS',
    logoIcon = '',
    showSearch = true,
    showLogin = true,
    loginText = 'Login',
    dark = false,
    className = '',
  } = options;

  const classes = ['navbar'];
  if (dark) classes.push('navbar--dark');
  if (className) classes.push(className);

  return `
    <nav class="${classes.join(' ')}" data-navbar>
      <div class="navbar-brand">
        <button class="navbar-toggle" data-navbar-toggle>
          ${icons.menu}
        </button>
        <a href="#" class="navbar-logo">
          ${logoIcon ? `<img src="${logoIcon}" alt="${logo}" />` : ''}
          <span>${logo}</span>
        </a>
      </div>
      <div class="navbar-actions">
        ${showSearch ? `<button class="navbar-search-btn">${icons.search}</button>` : ''}
        ${showLogin ? `
          <button class="btn btn--primary btn--sm">
            ${icons.user}
            <span>${loginText}</span>
          </button>
        ` : ''}
      </div>
    </nav>
  `;
}

/**
 * Cria Navbar Mobile (mínima)
 */
export function createMobileNav(options = {}) {
  const {
    logoIcon = '',
    showSearch = true,
    showAvatar = true,
    dark = false,
    className = '',
  } = options;

  const classes = ['navbar'];
  if (dark) classes.push('navbar--dark');
  if (className) classes.push(className);

  return `
    <nav class="${classes.join(' ')}" data-navbar>
      <div class="navbar-brand">
        <button class="navbar-toggle" data-navbar-toggle>
          ${icons.menu}
        </button>
        ${logoIcon ? `<a href="#" class="navbar-logo"><img src="${logoIcon}" alt="Logo" /></a>` : ''}
      </div>
      <div class="navbar-actions">
        ${showSearch ? `<button class="navbar-search-btn">${icons.search}</button>` : ''}
        ${showAvatar ? `
          <button class="btn btn--primary btn--icon btn--sm">
            ${icons.user}
          </button>
        ` : ''}
      </div>
    </nav>
  `;
}

/**
 * Cria App Bar
 */
export function createAppBar(options = {}) {
  const {
    title = 'Title',
    showBack = true,
    backIcon = icons.chevronLeft,
    rightIcon = icons.settings,
    showRightAction = true,
    dark = false,
    className = '',
  } = options;

  const classes = ['appbar'];
  if (dark) classes.push('appbar--dark');
  if (className) classes.push(className);

  return `
    <header class="${classes.join(' ')}" data-appbar>
      <div class="appbar-left">
        ${showBack ? `
          <button class="appbar-btn" data-appbar-back>
            ${backIcon}
          </button>
        ` : ''}
      </div>
      <h1 class="appbar-title">${title}</h1>
      <div class="appbar-right">
        ${showRightAction ? `
          <button class="appbar-btn" data-appbar-action>
            ${rightIcon}
          </button>
        ` : ''}
      </div>
    </header>
  `;
}

/**
 * Cria Bottom Navbar
 */
export function createBottomNav(options = {}) {
  const {
    items = [],
    activeItem = '',
    dark = false,
    className = '',
  } = options;

  const classes = ['bottomnav'];
  if (dark) classes.push('bottomnav--dark');
  if (className) classes.push(className);

  const itemsHtml = items.map(item => {
    const isActive = item.id === activeItem;
    const icon = item.icon || icons.home;

    const itemContent = `
      <span class="bottomnav-icon">${icon}</span>
      <span class="bottomnav-label">${item.label}</span>
    `;

    if (item.badge) {
      return `
        <div class="bottomnav-item-wrapper">
          <a href="${item.href || '#'}" class="bottomnav-item ${isActive ? 'is-active' : ''}" data-bottomnav-item="${item.id || ''}">
            ${itemContent}
          </a>
          <span class="bottomnav-badge">${item.badge}</span>
        </div>
      `;
    }

    return `
      <a href="${item.href || '#'}" class="bottomnav-item ${isActive ? 'is-active' : ''}" data-bottomnav-item="${item.id || ''}">
        ${itemContent}
      </a>
    `;
  }).join('');

  return `
    <nav class="${classes.join(' ')}" data-bottomnav>
      ${itemsHtml}
    </nav>
  `;
}

/**
 * Inicializa navegação
 */
export function init(container = document, callbacks = {}) {
  const { onToggle, onSearch, onBack, onAction, onNavigate } = callbacks;

  // Toggle menu
  container.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-navbar-toggle]');
    if (toggle && onToggle) {
      onToggle();
    }

    // App bar back
    const backBtn = e.target.closest('[data-appbar-back]');
    if (backBtn && onBack) {
      onBack();
    }

    // App bar action
    const actionBtn = e.target.closest('[data-appbar-action]');
    if (actionBtn && onAction) {
      onAction();
    }

    // Bottom nav item
    const bottomItem = e.target.closest('[data-bottomnav-item]');
    if (bottomItem && onNavigate) {
      e.preventDefault();
      const itemId = bottomItem.dataset.bottomnavItem;
      onNavigate({ id: itemId, element: bottomItem });
    }

    // Navbar link
    const navLink = e.target.closest('[data-navbar-link]');
    if (navLink && onNavigate) {
      const linkId = navLink.dataset.navbarLink;
      onNavigate({ id: linkId, element: navLink });
    }
  });

  // Search input
  container.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('navbar-search-input')) {
      if (onSearch) {
        onSearch(e.target.value);
      }
    }
  });
}

/**
 * Define item ativo no bottom nav
 */
export function setActiveBottomItem(container, itemId) {
  const nav = container.querySelector('[data-bottomnav]');
  if (!nav) return;

  nav.querySelectorAll('.bottomnav-item').forEach(item => {
    item.classList.remove('is-active');
  });

  const target = nav.querySelector(`[data-bottomnav-item="${itemId}"]`);
  if (target) {
    target.classList.add('is-active');
  }
}

export default {
  createTopNav,
  createTabletNav,
  createMobileNav,
  createAppBar,
  createBottomNav,
  init,
  setActiveBottomItem,
  icons,
};
