import checkbox from '../../components/checkbox/checkbox.js';

export function init() {
  // Checkbox States (without label)
  const statesContainer = document.getElementById('checkbox-states');
  const states = [
    // Row 1: Default (gray)
    { color: 'gray' },
    { color: 'gray', checked: true },
    { color: 'gray', indeterminate: true },
    { color: 'gray', disabled: true },
    // Row 2: Default checked disabled
    { color: 'gray', checked: true, disabled: true },
    { color: 'gray', indeterminate: true, disabled: true },
    {},
    {},
    // Row 3: Primary
    {},
    { checked: true },
    { indeterminate: true },
    { disabled: true },
    // Row 4: Primary disabled
    { checked: true, disabled: true },
    { indeterminate: true, disabled: true },
    {},
    {},
    // Row 5: Error
    { color: 'error' },
    { color: 'error', checked: true },
    { color: 'error', indeterminate: true },
    { color: 'error', disabled: true },
    // Row 6: Error disabled
    { color: 'error', checked: true, disabled: true },
    { color: 'error', indeterminate: true, disabled: true },
    {},
    {},
  ];

  statesContainer.innerHTML = states
    .filter(s => Object.keys(s).length > 0)
    .map(s => checkbox.create(s))
    .join('');

  // Checkbox with Text
  const textContainer = document.getElementById('checkbox-with-text');
  const withTextStates = [
    // Row 1: Gray
    { label: 'Checkbox text', color: 'gray' },
    { label: 'Checkbox text', color: 'gray', checked: true },
    { label: 'Checkbox text', color: 'gray', indeterminate: true },
    { label: 'Checkbox text', color: 'gray', disabled: true },
    // Row 2: Primary
    { label: 'Checkbox text' },
    { label: 'Checkbox text', checked: true },
    { label: 'Checkbox text', indeterminate: true },
    { label: 'Checkbox text', disabled: true },
    // Row 3: Error
    { label: 'Checkbox text', color: 'error' },
    { label: 'Checkbox text', color: 'error', checked: true },
    { label: 'Checkbox text', color: 'error', indeterminate: true },
    { label: 'Checkbox text', color: 'error', disabled: true },
  ];

  textContainer.innerHTML = withTextStates.map(s => checkbox.create(s)).join('');

  // Sizes
  document.getElementById('checkbox-sizes').innerHTML = `
    ${checkbox.create({ label: 'Small', size: 'sm', checked: true })}
    ${checkbox.create({ label: 'Medium', size: 'md', checked: true })}
    ${checkbox.create({ label: 'Large', size: 'lg', checked: true })}
  `;

  // Colors
  document.getElementById('checkbox-colors').innerHTML = `
    ${checkbox.create({ label: 'Primary', color: 'primary', checked: true })}
    ${checkbox.create({ label: 'Error', color: 'error', checked: true })}
    ${checkbox.create({ label: 'Success', color: 'success', checked: true })}
    ${checkbox.create({ label: 'Warning', color: 'warning', checked: true })}
    ${checkbox.create({ label: 'Gray', color: 'gray', checked: true })}
  `;

  // With Description
  document.getElementById('checkbox-description').innerHTML = `
    <div class="checkbox-group">
      ${checkbox.create({
        label: 'Checkbox',
        checked: true,
      })}
      ${checkbox.create({
        label: 'I agree to the terms and conditions',
        description: 'By checking this box, you agree to our Terms of Service and Privacy Policy.',
      })}
      ${checkbox.create({
        label: 'I agree to the terms and conditions',
        description: 'By checking this box, you agree to our Terms of Service.',
        checked: true,
      })}
    </div>
  `;

  // Checkbox Group Vertical
  document.getElementById('checkbox-group-vertical').innerHTML = checkbox.createGroup({
    label: 'Selecione as opções',
    name: 'options-vertical',
    items: [
      { label: 'Opção 1', value: '1', checked: true },
      { label: 'Opção 2', value: '2' },
      { label: 'Opção 3', value: '3' },
      { label: 'Opção 4', value: '4', disabled: true },
    ],
  });

  // Checkbox Group Horizontal
  document.getElementById('checkbox-group-horizontal').innerHTML = checkbox.createGroup({
    label: 'Selecione as opções',
    name: 'options-horizontal',
    horizontal: true,
    items: [
      { label: 'Opção A', value: 'a', checked: true },
      { label: 'Opção B', value: 'b', checked: true },
      { label: 'Opção C', value: 'c' },
    ],
  });

  // Indeterminate
  document.getElementById('checkbox-indeterminate').innerHTML = `
    <div class="checkbox-group" id="indeterminate-group">
      ${checkbox.create({
        id: 'parent-checkbox',
        label: 'Selecionar todos',
        indeterminate: true,
      })}
      <div style="margin-left: var(--space-6);">
        ${checkbox.create({
          name: 'child-items',
          label: 'Item 1',
          value: '1',
          checked: true,
        })}
        ${checkbox.create({
          name: 'child-items',
          label: 'Item 2',
          value: '2',
          checked: true,
        })}
        ${checkbox.create({
          name: 'child-items',
          label: 'Item 3',
          value: '3',
        })}
      </div>
    </div>
  `;

  // Light Mode
  document.getElementById('checkbox-light').innerHTML = `
    <div class="checkbox-group">
      ${checkbox.create({ label: 'Unchecked' })}
      ${checkbox.create({ label: 'Checked', checked: true })}
      ${checkbox.create({ label: 'I agree to the terms and conditions', description: 'By checking this box, you agree to our Terms.', checked: true })}
    </div>
  `;

  // Dark Mode
  document.getElementById('checkbox-dark').innerHTML = `
    <div class="checkbox-group">
      ${checkbox.create({ label: 'Unchecked', dark: true })}
      ${checkbox.create({ label: 'Checked', checked: true, dark: true })}
      ${checkbox.create({ label: 'I agree to the terms and conditions', description: 'By checking this box, you agree to our Terms.', checked: true, dark: true })}
    </div>
  `;

  // Initialize indeterminate states
  checkbox.init(document);

  // Setup indeterminate interaction
  setupIndeterminateDemo();
}

function setupIndeterminateDemo() {
  const parentCheckbox = document.getElementById('parent-checkbox');
  const childCheckboxes = document.querySelectorAll('input[name="child-items"]');

  if (!parentCheckbox || childCheckboxes.length === 0) return;

  // Parent click handler
  parentCheckbox.addEventListener('change', () => {
    childCheckboxes.forEach(cb => {
      cb.checked = parentCheckbox.checked;
    });
    parentCheckbox.indeterminate = false;
  });

  // Child click handlers
  childCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      checkbox.updateParentCheckbox(parentCheckbox, childCheckboxes);
    });
  });
}
