import Toggle from '../../components/toggle/toggle.js';

export function init() {
  // Primary toggles
  document.getElementById('toggle-primary-on').innerHTML = Toggle.create({ checked: true });
  document.getElementById('toggle-primary-off').innerHTML = Toggle.create({ checked: false });
  document.getElementById('toggle-primary-disabled').innerHTML = Toggle.create({ checked: true, disabled: true });

  // Danger toggles
  document.getElementById('toggle-danger-on').innerHTML = Toggle.create({ color: 'danger', checked: true });
  document.getElementById('toggle-danger-off').innerHTML = Toggle.create({ color: 'danger', checked: false });
  document.getElementById('toggle-danger-disabled').innerHTML = Toggle.create({ color: 'danger', checked: true, disabled: true });

  // With label (right)
  document.getElementById('toggle-label-on').innerHTML = Toggle.create({ label: 'Toggle Text', checked: true });
  document.getElementById('toggle-label-off').innerHTML = Toggle.create({ label: 'Toggle Text', checked: false });
  document.getElementById('toggle-label-disabled').innerHTML = Toggle.create({ label: 'Toggle Text', disabled: true });

  // With label (left)
  document.getElementById('toggle-label-left-on').innerHTML = Toggle.create({ label: 'Toggle Text', labelPosition: 'left', checked: true });
  document.getElementById('toggle-label-left-off').innerHTML = Toggle.create({ label: 'Toggle Text', labelPosition: 'left', checked: false });
  document.getElementById('toggle-label-left-disabled').innerHTML = Toggle.create({ label: 'Toggle Text', labelPosition: 'left', disabled: true });

  // Danger with label
  document.getElementById('toggle-danger-label-on').innerHTML = Toggle.create({ label: 'Toggle Text', color: 'danger', checked: true });
  document.getElementById('toggle-danger-label-off').innerHTML = Toggle.create({ label: 'Toggle Text', color: 'danger', checked: false });
  document.getElementById('toggle-danger-label-disabled').innerHTML = Toggle.create({ label: 'Toggle Text', color: 'danger', disabled: true });

  // Sizes
  document.getElementById('toggle-sm').innerHTML = Toggle.create({ label: 'Small', size: 'sm', checked: true });
  document.getElementById('toggle-md').innerHTML = Toggle.create({ label: 'Medium', size: 'md', checked: true });
  document.getElementById('toggle-lg').innerHTML = Toggle.create({ label: 'Large', size: 'lg', checked: true });

  // Toggle group
  document.getElementById('toggle-group').innerHTML = Toggle.createGroup({
    toggles: [
      { label: 'Notificações por email', checked: true },
      { label: 'Notificações push', checked: true },
      { label: 'Notificações SMS', checked: false },
      { label: 'Marketing', checked: false },
    ],
  });

  // Light mode example
  document.getElementById('example-light').innerHTML = Toggle.createGroup({
    toggles: [
      { label: 'Toggle', checked: true },
      { label: 'Toggle', checked: true },
      { label: 'Toggle', checked: false },
      { label: 'Toggle', checked: false },
    ],
  });

  // Dark mode example
  document.getElementById('example-dark').innerHTML = Toggle.createGroup({
    toggles: [
      { label: 'Toggle', checked: true, dark: true },
      { label: 'Toggle', checked: true, dark: true },
      { label: 'Toggle', checked: false, dark: true },
      { label: 'Toggle', checked: false, dark: true },
    ],
    dark: true,
  });

  // Initialize interactions
  Toggle.init(document, (data) => {
    console.log('Toggle changed:', data);
  });
}
