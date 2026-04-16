import Tabs from '../../components/tabs/tabs.js';

export function init() {
  // Tab underlined
  document.getElementById('tabs-underlined').innerHTML = Tabs.createUnderlined({
    tabs: [
      { label: 'Label' },
      { label: 'Label' },
      { label: 'Label' },
      { label: 'Label', disabled: true },
    ],
    activeTab: 0,
  });

  // Tab underlined with badge
  document.getElementById('tabs-underlined-badge').innerHTML = Tabs.createUnderlined({
    tabs: [
      { label: 'Label', badge: 2 },
      { label: 'Label', badge: 5 },
      { label: 'Label' },
      { label: 'Label', disabled: true },
    ],
    activeTab: 0,
  });

  // Tab button
  document.getElementById('tabs-button').innerHTML = Tabs.createButton({
    tabs: [
      { label: 'Label' },
      { label: 'Label' },
      { label: 'Label' },
      { label: 'Label', disabled: true },
    ],
    activeTab: 0,
  });

  // Tab button with badge
  document.getElementById('tabs-button-badge').innerHTML = Tabs.createButton({
    tabs: [
      { label: 'Label', badge: 2 },
      { label: 'Label' },
      { label: 'Label' },
      { label: 'Label', disabled: true },
    ],
    activeTab: 0,
  });

  // Full width
  document.getElementById('tabs-fullwidth').innerHTML = Tabs.createButton({
    tabs: [
      { label: 'Label', badge: 2 },
      { label: 'Label' },
    ],
    activeTab: 0,
    fullWidth: true,
  });

  // With icons - underlined
  document.getElementById('tabs-icons-underlined').innerHTML = Tabs.createUnderlined({
    tabs: [
      { label: 'People', icon: Tabs.icons.users, badge: 2, hasDropdown: true },
      { label: 'Settings', icon: Tabs.icons.settings },
    ],
    activeTab: 0,
  });

  // With icons - button
  document.getElementById('tabs-icons-button').innerHTML = Tabs.createButton({
    tabs: [
      { label: 'People', icon: Tabs.icons.users, badge: 2 },
      { label: 'Settings', icon: Tabs.icons.settings },
    ],
    activeTab: 0,
  });

  // States
  document.getElementById('tabs-states').innerHTML = Tabs.createUnderlined({
    tabs: [
      { label: 'Label', badge: 2, hasDropdown: true },
      { label: 'Label', badge: 3, hasDropdown: true },
      { label: 'Label', badge: 5, hasDropdown: true },
      { label: 'Label', badge: 2, disabled: true },
    ],
    activeTab: 2,
  });

  // Bottom bar
  document.getElementById('tabs-bar').innerHTML = Tabs.createBar({
    tabs: [
      { label: 'Label', icon: Tabs.icons.users },
      { label: 'Label', icon: Tabs.icons.settings },
    ],
    activeTab: 0,
  });

  // Light mode examples
  document.getElementById('example-light-1').innerHTML = Tabs.createUnderlined({
    tabs: [
      { label: 'People', icon: Tabs.icons.users, badge: 2, hasDropdown: true },
      { label: 'Settings', icon: Tabs.icons.settings },
    ],
    activeTab: 0,
  });

  document.getElementById('example-light-2').innerHTML = Tabs.createButton({
    tabs: [
      { label: 'People' },
      { label: 'Settings' },
    ],
    activeTab: 0,
  });

  document.getElementById('example-light-3').innerHTML = Tabs.createBar({
    tabs: [
      { label: 'Label', icon: Tabs.icons.users },
      { label: 'Label', icon: Tabs.icons.settings },
    ],
    activeTab: 0,
  });

  // Dark mode examples
  document.getElementById('example-dark-1').innerHTML = Tabs.createUnderlined({
    tabs: [
      { label: 'People', icon: Tabs.icons.users, badge: 2, hasDropdown: true },
      { label: 'Settings', icon: Tabs.icons.settings },
    ],
    activeTab: 0,
    dark: true,
  });

  document.getElementById('example-dark-2').innerHTML = Tabs.createButton({
    tabs: [
      { label: 'People', badge: 2 },
      { label: 'Settings' },
    ],
    activeTab: 0,
    dark: true,
  });

  document.getElementById('example-dark-3').innerHTML = Tabs.createBar({
    tabs: [
      { label: 'Label', icon: Tabs.icons.users },
      { label: 'Label', icon: Tabs.icons.settings },
    ],
    activeTab: 0,
    dark: true,
  });

  // Initialize all tabs
  Tabs.init(document, (data) => {
    console.log('Tab changed:', data);
  });
}
