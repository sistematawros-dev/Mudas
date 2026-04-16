import './tabs.css';

/**
 * Tabs Component
 */

const icons = {
  chevronDown: `<svg viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none"><path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Cria tabs
 */
export function create(options = {}) {
  const {
    id = `tabs-${Date.now()}`,
    tabs = [],
    activeTab = 0,
    variant = 'underlined', // underlined, button, bar
    size = 'md', // sm, md, lg
    fullWidth = false,
    scrollable = false,
    dark = false,
    className = '',
  } = options;

  const classes = ['tabs', `tabs--${variant}`];
  if (size !== 'md') classes.push(`tabs--${size}`);
  if (dark) classes.push('tabs--dark');
  if (className) classes.push(className);

  const listClasses = ['tabs-list'];
  if (fullWidth) listClasses.push('tabs-list--fullwidth');
  if (scrollable) listClasses.push('tabs-list--scrollable');

  const tabsHtml = tabs.map((tab, index) => {
    const isActive = index === activeTab;
    const isDisabled = tab.disabled;

    const tabClasses = ['tabs-tab'];
    if (isActive) tabClasses.push('is-active');
    if (isDisabled) tabClasses.push('is-disabled');

    const iconHtml = tab.icon ? `<span class="tabs-icon">${tab.icon}</span>` : '';
    const badgeHtml = tab.badge !== undefined ? `<span class="tabs-badge">${tab.badge}</span>` : '';
    const chevronHtml = tab.hasDropdown ? `<span class="tabs-chevron">${icons.chevronDown}</span>` : '';

    return `
      <button
        class="${tabClasses.join(' ')}"
        data-tab="${index}"
        ${isDisabled ? 'disabled' : ''}
        role="tab"
        aria-selected="${isActive}"
      >
        ${iconHtml}
        <span>${tab.label}</span>
        ${badgeHtml}
        ${chevronHtml}
      </button>
    `;
  }).join('');

  return `
    <div class="${classes.join(' ')}" data-tabs id="${id}">
      <div class="${listClasses.join(' ')}" role="tablist">
        ${tabsHtml}
      </div>
    </div>
  `;
}

/**
 * Cria tabs com painéis de conteúdo
 */
export function createWithPanels(options = {}) {
  const {
    id = `tabs-${Date.now()}`,
    tabs = [],
    activeTab = 0,
    variant = 'underlined',
    size = 'md',
    fullWidth = false,
    dark = false,
    className = '',
  } = options;

  const tabsListHtml = create({
    id,
    tabs: tabs.map(t => ({ label: t.label, icon: t.icon, badge: t.badge, disabled: t.disabled })),
    activeTab,
    variant,
    size,
    fullWidth,
    dark,
    className,
  });

  const panelsHtml = tabs.map((tab, index) => {
    const isActive = index === activeTab;
    return `
      <div
        class="tabs-panel ${isActive ? 'is-active' : ''}"
        data-panel="${index}"
        role="tabpanel"
      >
        ${tab.content || ''}
      </div>
    `;
  }).join('');

  return `
    ${tabsListHtml}
    <div class="tabs-content">
      ${panelsHtml}
    </div>
  `;
}

/**
 * Cria tabs underlined
 */
export function createUnderlined(options = {}) {
  return create({ ...options, variant: 'underlined' });
}

/**
 * Cria tabs button/pill
 */
export function createButton(options = {}) {
  return create({ ...options, variant: 'button' });
}

/**
 * Cria tabs para bottom bar
 */
export function createBar(options = {}) {
  return create({ ...options, variant: 'bar', fullWidth: true });
}

/**
 * Inicializa tabs
 */
export function init(container = document, onChange = null) {
  container.addEventListener('click', (e) => {
    const tab = e.target.closest('.tabs-tab');
    if (!tab || tab.disabled) return;

    const tabsContainer = tab.closest('[data-tabs]');
    if (!tabsContainer) return;

    const tabIndex = parseInt(tab.dataset.tab);

    // Update active tab
    tabsContainer.querySelectorAll('.tabs-tab').forEach((t, i) => {
      t.classList.toggle('is-active', i === tabIndex);
      t.setAttribute('aria-selected', i === tabIndex);
    });

    // Update panels if exist
    const panels = tabsContainer.parentElement?.querySelectorAll('.tabs-panel');
    if (panels) {
      panels.forEach((panel, i) => {
        panel.classList.toggle('is-active', i === tabIndex);
      });
    }

    if (onChange) {
      const tabData = {
        index: tabIndex,
        element: tab,
        container: tabsContainer,
      };
      onChange(tabData);
    }
  });
}

/**
 * Define tab ativa
 */
export function setActiveTab(tabsContainer, tabIndex) {
  const tabs = tabsContainer.querySelectorAll('.tabs-tab');

  tabs.forEach((tab, i) => {
    tab.classList.toggle('is-active', i === tabIndex);
    tab.setAttribute('aria-selected', i === tabIndex);
  });

  // Update panels
  const panels = tabsContainer.parentElement?.querySelectorAll('.tabs-panel');
  if (panels) {
    panels.forEach((panel, i) => {
      panel.classList.toggle('is-active', i === tabIndex);
    });
  }
}

/**
 * Obtém tab ativa
 */
export function getActiveTab(tabsContainer) {
  const activeTab = tabsContainer.querySelector('.tabs-tab.is-active');
  return activeTab ? parseInt(activeTab.dataset.tab) : -1;
}

/**
 * Desabilita tab
 */
export function setTabDisabled(tabsContainer, tabIndex, disabled = true) {
  const tab = tabsContainer.querySelector(`[data-tab="${tabIndex}"]`);
  if (tab) {
    tab.disabled = disabled;
    tab.classList.toggle('is-disabled', disabled);
  }
}

/**
 * Atualiza badge de uma tab
 */
export function setTabBadge(tabsContainer, tabIndex, badge) {
  const tab = tabsContainer.querySelector(`[data-tab="${tabIndex}"]`);
  if (!tab) return;

  let badgeEl = tab.querySelector('.tabs-badge');

  if (badge === null || badge === undefined) {
    if (badgeEl) badgeEl.remove();
    return;
  }

  if (!badgeEl) {
    badgeEl = document.createElement('span');
    badgeEl.className = 'tabs-badge';
    tab.appendChild(badgeEl);
  }

  badgeEl.textContent = badge;
}

export default {
  create,
  createWithPanels,
  createUnderlined,
  createButton,
  createBar,
  init,
  setActiveTab,
  getActiveTab,
  setTabDisabled,
  setTabBadge,
  icons,
};
