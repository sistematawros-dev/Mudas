import './dropdown.css';

/**
 * Dropdown Menu Component
 * Menu suspenso com lista de opções
 */

const icons = {
  chevronDown: `<svg viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  user: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M2 14c0-2.5 2.5-4 6-4s6 1.5 6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  settings: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M2.93 2.93l1.41 1.41M11.66 11.66l1.41 1.41M2.93 13.07l1.41-1.41M11.66 4.34l1.41-1.41" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  logout: `<svg viewBox="0 0 16 16" fill="none"><path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Cria um dropdown completo
 */
export function create(options = {}) {
  const {
    id = `dropdown-${Math.random().toString(36).substr(2, 9)}`,
    trigger = 'Label',
    triggerIcon = null,
    triggerVariant = 'default', // default, ghost, icon
    items = [],
    position = 'left', // left, right
    size = 'md', // sm, md, lg
    dark = false,
    className = '',
  } = options;

  const classes = ['dropdown'];
  if (dark) classes.push('dropdown--dark');
  if (className) classes.push(className);

  const triggerClasses = ['dropdown-trigger'];
  if (triggerVariant !== 'default') triggerClasses.push(`dropdown-trigger--${triggerVariant}`);

  const menuClasses = ['dropdown-menu'];
  if (position === 'right') menuClasses.push('dropdown-menu--right');
  if (size !== 'md') menuClasses.push(`dropdown-menu--${size}`);

  const triggerContent = triggerVariant === 'icon'
    ? triggerIcon || icons.chevronDown
    : `
      ${triggerIcon ? `<span class="dropdown-trigger-icon">${triggerIcon}</span>` : ''}
      <span>${trigger}</span>
      <span class="dropdown-trigger-icon">${icons.chevronDown}</span>
    `;

  const menuContent = renderItems(items);

  return `
    <div class="${classes.join(' ')}" data-dropdown id="${id}">
      <button type="button" class="${triggerClasses.join(' ')}" data-dropdown-trigger>
        ${triggerContent}
      </button>
      <div class="${menuClasses.join(' ')}" data-dropdown-menu>
        ${menuContent}
      </div>
    </div>
  `;
}

/**
 * Renderiza itens do menu
 */
function renderItems(items) {
  return items.map(item => {
    if (item.type === 'divider') {
      return '<hr class="dropdown-divider" />';
    }

    if (item.type === 'header') {
      return `<div class="dropdown-header">${item.label}</div>`;
    }

    if (item.type === 'user') {
      return `
        <div class="dropdown-user">
          <img src="${item.avatar}" alt="" class="dropdown-user-avatar" />
          <div class="dropdown-user-info">
            <span class="dropdown-user-name">${item.name}</span>
            <span class="dropdown-user-email">${item.email}</span>
          </div>
        </div>
      `;
    }

    return createItem(item);
  }).join('');
}

/**
 * Cria um item do menu
 */
export function createItem(options = {}) {
  const {
    label = '',
    description = '',
    icon = null,
    badge = null,
    shortcut = null,
    value = '',
    selected = false,
    disabled = false,
    danger = false,
    onClick = null,
  } = options;

  const classes = ['dropdown-item'];
  if (selected) classes.push('is-selected');
  if (disabled) classes.push('is-disabled');
  if (danger) classes.push('dropdown-item--danger');

  const dataAttrs = value ? `data-value="${value}"` : '';
  const clickAttr = onClick ? `onclick="${onClick}"` : '';

  let html = '';

  // Check mark (for selectable items)
  if (selected !== undefined) {
    html += `<span class="dropdown-item-check">${icons.check}</span>`;
  }

  // Icon
  if (icon) {
    html += `<span class="dropdown-item-icon">${icon}</span>`;
  }

  // Content
  html += `<span class="dropdown-item-content">`;
  html += `<span class="dropdown-item-label">${label}</span>`;
  if (description) {
    html += `<span class="dropdown-item-description">${description}</span>`;
  }
  html += `</span>`;

  // Badge
  if (badge) {
    const badgeHtml = typeof badge === 'string'
      ? `<span class="badge badge--soft badge--sm">${badge}</span>`
      : badge;
    html += `<span class="dropdown-item-badge">${badgeHtml}</span>`;
  }

  // Shortcut
  if (shortcut) {
    html += `<span class="dropdown-item-shortcut">${shortcut}</span>`;
  }

  return `<button type="button" class="${classes.join(' ')}" ${dataAttrs} ${clickAttr}>${html}</button>`;
}

/**
 * Cria um dropdown com usuário
 */
export function createUserDropdown(options = {}) {
  const {
    user = {},
    items = [],
    ...rest
  } = options;

  const userItem = {
    type: 'user',
    avatar: user.avatar || 'https://i.pravatar.cc/40',
    name: user.name || 'User',
    email: user.email || 'user@email.com',
  };

  return create({
    ...rest,
    trigger: user.name || 'Account',
    items: [userItem, ...items],
  });
}

/**
 * Inicializa dropdowns
 */
export function init(container = document, onSelect = null) {
  const dropdowns = container.querySelectorAll('[data-dropdown]');

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('[data-dropdown-trigger]');
    const menu = dropdown.querySelector('[data-dropdown-menu]');

    if (!trigger || !menu) return;

    // Toggle on trigger click
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown(dropdown);
    });

    // Handle item clicks
    menu.addEventListener('click', (e) => {
      const item = e.target.closest('.dropdown-item');
      if (!item || item.classList.contains('is-disabled')) return;

      const value = item.dataset.value;

      // Handle selection
      if (item.querySelector('.dropdown-item-check')) {
        menu.querySelectorAll('.dropdown-item').forEach(i => {
          i.classList.remove('is-selected');
        });
        item.classList.add('is-selected');
      }

      if (onSelect) {
        onSelect({ dropdown, item, value });
      }

      closeDropdown(dropdown);
    });

    // Keyboard navigation
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        openDropdown(dropdown);
        focusFirstItem(menu);
      }
    });

    menu.addEventListener('keydown', (e) => {
      const items = Array.from(menu.querySelectorAll('.dropdown-item:not(.is-disabled)'));
      const currentIndex = items.indexOf(document.activeElement);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (currentIndex < items.length - 1) {
            items[currentIndex + 1].focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (currentIndex > 0) {
            items[currentIndex - 1].focus();
          }
          break;
        case 'Escape':
          e.preventDefault();
          closeDropdown(dropdown);
          trigger.focus();
          break;
        case 'Tab':
          closeDropdown(dropdown);
          break;
      }
    });
  });

  // Close on outside click
  const handleOutsideClick = (e) => {
    if (!e.target.closest('[data-dropdown]')) {
      closeAllDropdowns();
    }
  };
  document.addEventListener('click', handleOutsideClick);

  // Close on escape
  const handleEscKey = (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
    }
  };
  document.addEventListener('keydown', handleEscKey);

  return () => {
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('keydown', handleEscKey);
  };
}

/**
 * Toggle dropdown
 */
function toggleDropdown(dropdown) {
  if (dropdown.classList.contains('is-open')) {
    closeDropdown(dropdown);
  } else {
    closeAllDropdowns();
    openDropdown(dropdown);
  }
}

/**
 * Open dropdown
 */
function openDropdown(dropdown) {
  dropdown.classList.add('is-open');
}

/**
 * Close dropdown
 */
function closeDropdown(dropdown) {
  dropdown.classList.remove('is-open');
}

/**
 * Close all dropdowns
 */
function closeAllDropdowns() {
  document.querySelectorAll('[data-dropdown].is-open').forEach(d => {
    d.classList.remove('is-open');
  });
}

/**
 * Focus first item
 */
function focusFirstItem(menu) {
  const firstItem = menu.querySelector('.dropdown-item:not(.is-disabled)');
  if (firstItem) {
    firstItem.focus();
  }
}

export default {
  create,
  createItem,
  createUserDropdown,
  init,
  icons
};
