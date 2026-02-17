import dropdown from '../../components/dropdown/dropdown.js';

// Icons
const icons = {
  user: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M2 14c0-2.5 2.5-4 6-4s6 1.5 6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  settings: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M2.93 2.93l1.41 1.41M11.66 11.66l1.41 1.41M2.93 13.07l1.41-1.41M11.66 4.34l1.41-1.41" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  logout: `<svg viewBox="0 0 16 16" fill="none"><path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  edit: `<svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5l2 2M2 14l1-4 9-9 2 2-9 9-3 1z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  copy: `<svg viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M11 5V3a1 1 0 00-1-1H3a1 1 0 00-1 1v7a1 1 0 001 1h2" stroke="currentColor" stroke-width="1.5"/></svg>`,
  trash: `<svg viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M13 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  download: `<svg viewBox="0 0 16 16" fill="none"><path d="M8 2v8M4 7l4 4 4-4M2 14h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  star: `<svg viewBox="0 0 16 16" fill="none"><path d="M8 1l2.2 4.4 4.8.7-3.5 3.4.8 4.9L8 12l-4.3 2.4.8-4.9L1 6.1l4.8-.7L8 1z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
};

export function init() {
  // Basic Dropdown
  document.getElementById('dropdown-basic').innerHTML = dropdown.create({
    trigger: 'Label',
    items: [
      { label: 'Dropdown item' },
      { label: 'Dropdown item' },
      { label: 'Dropdown item' },
      { label: 'Dropdown item' },
    ],
  });

  // With Icons
  document.getElementById('dropdown-icons').innerHTML = dropdown.create({
    trigger: 'Actions',
    items: [
      { label: 'Edit', icon: icons.edit },
      { label: 'Duplicate', icon: icons.copy },
      { label: 'Download', icon: icons.download },
      { type: 'divider' },
      { label: 'Delete', icon: icons.trash, danger: true },
    ],
  });

  // With Headers & Dividers
  document.getElementById('dropdown-headers').innerHTML = dropdown.create({
    trigger: 'Menu',
    items: [
      { type: 'header', label: 'Actions' },
      { label: 'Dropdown item' },
      { label: 'Dropdown item' },
      { label: 'Dropdown item' },
      { type: 'divider' },
      { type: 'header', label: 'Danger' },
      { label: 'Dropdown item' },
      { label: 'Dropdown item' },
      { type: 'divider' },
      { type: 'header', label: 'Heading' },
      { label: 'Dropdown item' },
      { label: 'Dropdown item' },
      { label: 'Dropdown item' },
      { label: 'Dropdown item' },
    ],
  });

  // With Selection
  document.getElementById('dropdown-selection').innerHTML = dropdown.create({
    trigger: 'Select option',
    items: [
      { label: 'Dropdown item', value: '1', selected: false },
      { label: 'Dropdown item', value: '2', selected: true },
      { label: 'Dropdown item', value: '3', selected: false },
      { label: 'Dropdown item', value: '4', selected: false },
    ],
  });

  // With Badges & Shortcuts
  document.getElementById('dropdown-badges').innerHTML = dropdown.create({
    trigger: 'Options',
    items: [
      { label: 'Dropdown item', shortcut: '⌘N' },
      { label: 'Dropdown item', shortcut: '⌘K' },
      { label: 'Dropdown item', badge: 'New' },
      { label: 'Dropdown item', badge: 'Pro' },
    ],
  });

  // User Account Dropdown
  document.getElementById('dropdown-account').innerHTML = `
    ${dropdown.create({
      trigger: 'Account',
      items: [
        {
          type: 'user',
          avatar: 'https://i.pravatar.cc/40?img=32',
          name: 'João Silva',
          email: 'joao@tawrostaiba.com',
        },
        { type: 'divider' },
        { label: 'Profile', icon: icons.user },
        { label: 'Settings', icon: icons.settings },
        { label: 'Upgrade Account', badge: '<span class="badge badge--filled badge--primary badge--sm">PRO</span>' },
        { type: 'divider' },
        { label: 'Sign out', icon: icons.logout },
      ],
    })}
  `;

  // States - Light
  document.getElementById('dropdown-states-light').innerHTML = dropdown.create({
    trigger: 'States',
    items: [
      { label: 'Newsletter' },
      { label: 'Purchases', selected: true },
      { label: 'Downloads' },
      { label: 'Team Account', disabled: true },
    ],
  });

  // States - Dark
  document.getElementById('dropdown-states-dark').innerHTML = dropdown.create({
    trigger: 'States',
    dark: true,
    items: [
      { label: 'Newsletter' },
      { label: 'Purchases', selected: true },
      { label: 'Downloads' },
      { label: 'Team Account', disabled: true },
    ],
  });

  // Light Mode
  document.getElementById('dropdown-light').innerHTML = dropdown.create({
    trigger: 'Account',
    items: [
      {
        type: 'user',
        avatar: 'https://i.pravatar.cc/40?img=12',
        name: 'Maria Santos',
        email: 'maria@tawrostaiba.com',
      },
      { type: 'divider' },
      { label: 'Profile', icon: icons.user },
      { label: 'Settings', icon: icons.settings },
      { label: 'Upgrade Account', badge: '<span class="badge badge--filled badge--primary badge--sm">PRO</span>' },
      { type: 'divider' },
      { label: 'Sign out', icon: icons.logout },
    ],
  });

  // Dark Mode
  document.getElementById('dropdown-dark').innerHTML = dropdown.create({
    trigger: 'Account',
    dark: true,
    items: [
      {
        type: 'user',
        avatar: 'https://i.pravatar.cc/40?img=12',
        name: 'Maria Santos',
        email: 'maria@tawrostaiba.com',
      },
      { type: 'divider' },
      { label: 'Profile', icon: icons.user },
      { label: 'Settings', icon: icons.settings },
      { label: 'Upgrade Account', badge: '<span class="badge badge--filled badge--primary badge--sm">PRO</span>' },
      { type: 'divider' },
      { label: 'Sign out', icon: icons.logout },
    ],
  });

  // Initialize all dropdowns
  dropdown.init(document, (event) => {
    console.log('Dropdown event:', event);
  });
}
