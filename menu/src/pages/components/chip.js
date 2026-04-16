import chip from '../../components/chip/chip.js';

export function init() {
  // Multiple Choice Chip States
  document.getElementById('chip-multiple').innerHTML = `
    ${chip.createMultiple({ label: 'Label' })}
    ${chip.createMultiple({ label: 'Label', selected: true })}
    ${chip.createMultiple({ label: 'Label' })}
    ${chip.createMultiple({ label: 'Label', selected: true })}
    ${chip.createMultiple({ label: 'Label' })}
    ${chip.createMultiple({ label: 'Label', selected: true })}
    ${chip.createMultiple({ label: 'Label' })}
    ${chip.createMultiple({ label: 'Label', selected: true })}
    ${chip.createMultiple({ label: 'Label', disabled: true })}
    ${chip.createMultiple({ label: 'Label', selected: true, disabled: true })}
    ${chip.createMultiple({ label: 'Label', disabled: true })}
    ${chip.createMultiple({ label: 'Label', selected: true, disabled: true })}
  `;

  // Single Choice Chip States
  document.getElementById('chip-single').innerHTML = `
    ${chip.createSingle({ label: 'Label' })}
    ${chip.createSingle({ label: 'Label', selected: true })}
    ${chip.createSingle({ label: 'Label' })}
    ${chip.createSingle({ label: 'Label', selected: true })}
    ${chip.createSingle({ label: 'Label' })}
    ${chip.createSingle({ label: 'Label', selected: true })}
    ${chip.createSingle({ label: 'Label' })}
    ${chip.createSingle({ label: 'Label', selected: true })}
    ${chip.createSingle({ label: 'Label', disabled: true })}
    ${chip.createSingle({ label: 'Label', selected: true, disabled: true })}
    ${chip.createSingle({ label: 'Label', disabled: true })}
    ${chip.createSingle({ label: 'Label', selected: true, disabled: true })}
  `;

  // Input Chip States
  document.getElementById('chip-input').innerHTML = `
    ${chip.createInput({ label: 'Label' })}
    ${chip.createInput({ label: 'Label', avatar: 'https://i.pravatar.cc/40?img=1' })}
    ${chip.createInput({ label: 'Label' })}
    ${chip.createInput({ label: 'Label', avatar: 'https://i.pravatar.cc/40?img=2' })}
    ${chip.createInput({ label: 'Label' })}
    ${chip.createInput({ label: 'Label', avatar: 'https://i.pravatar.cc/40?img=3' })}
    ${chip.createInput({ label: 'Label' })}
    ${chip.createInput({ label: 'Label', avatar: 'https://i.pravatar.cc/40?img=4' })}
    ${chip.createInput({ label: 'Label', disabled: true })}
    ${chip.createInput({ label: 'Label', disabled: true })}
    ${chip.createInput({ label: 'Label', disabled: true })}
    ${chip.createInput({ label: 'Label', disabled: true })}
  `;

  // Sizes
  document.getElementById('chip-sizes').innerHTML = `
    ${chip.create({ label: 'Small', size: 'sm', selected: true })}
    ${chip.create({ label: 'Medium', size: 'md', selected: true })}
    ${chip.create({ label: 'Large', size: 'lg', selected: true })}
  `;

  // Colors
  document.getElementById('chip-colors').innerHTML = `
    ${chip.create({ label: 'Primary', color: 'primary', selected: true })}
    ${chip.create({ label: 'Success', color: 'success', selected: true })}
    ${chip.create({ label: 'Error', color: 'error', selected: true })}
    ${chip.create({ label: 'Warning', color: 'warning', selected: true })}
  `;

  // Chip Group Single
  document.getElementById('chip-group-single').innerHTML = chip.createGroup({
    type: 'single',
    name: 'category',
    items: [
      { label: 'Indiana', value: 'indiana' },
      { label: 'North Carolina', value: 'nc', selected: true },
      { label: 'Nevada', value: 'nevada' },
      { label: 'Dallas', value: 'dallas' },
      { label: 'Colorado', value: 'colorado' },
    ],
  });

  // Chip Group Multiple
  document.getElementById('chip-group-multiple').innerHTML = chip.createGroup({
    type: 'multiple',
    name: 'filters',
    items: [
      { label: 'Frontend', value: 'frontend', selected: true },
      { label: 'Backend', value: 'backend', selected: true },
      { label: 'Design', value: 'design' },
      { label: 'DevOps', value: 'devops' },
    ],
  });

  // Chip Input Field Light
  document.getElementById('chip-field-light').innerHTML = `
    <label style="display: block; font-size: 14px; font-weight: 500; margin-bottom: 8px;">Label*</label>
    ${chip.createInputField({
      chips: ['Maria', 'Susan', 'Alex'],
      placeholder: 'Add tag...',
    })}
  `;

  // Chip Input Field Dark
  document.getElementById('chip-field-dark').innerHTML = `
    <label style="display: block; font-size: 14px; font-weight: 500; margin-bottom: 8px; color: #fff;">Label*</label>
    ${chip.createInputField({
      chips: ['Maria', 'Susan', 'Alex'],
      placeholder: 'Add tag...',
      dark: true,
    })}
  `;

  // Filter Chips Light
  document.getElementById('chip-filter-light').innerHTML = chip.createGroup({
    type: 'single',
    name: 'state-filter',
    items: [
      { label: 'Indiana', value: 'indiana' },
      { label: 'North Carolina', value: 'nc', selected: true },
      { label: 'Nevada', value: 'nevada' },
      { label: 'Dallas', value: 'dallas' },
      { label: 'Colorado', value: 'colorado' },
    ],
  });

  // Filter Chips Dark
  document.getElementById('chip-filter-dark').innerHTML = chip.createGroup({
    type: 'single',
    name: 'state-filter-dark',
    dark: true,
    items: [
      { label: 'Indiana', value: 'indiana' },
      { label: 'North Carolina', value: 'nc', selected: true },
      { label: 'Nevada', value: 'nevada' },
      { label: 'Dallas', value: 'dallas' },
      { label: 'Colorado', value: 'colorado' },
    ],
  });

  // Light Mode Example
  document.getElementById('chip-light').innerHTML = `
    <div class="chip-group" style="margin-bottom: 16px;">
      ${chip.createMultiple({ label: 'Option 1' })}
      ${chip.createMultiple({ label: 'Option 2', selected: true })}
      ${chip.createMultiple({ label: 'Option 3' })}
    </div>
    <div class="chip-group">
      ${chip.createSingle({ label: 'Indiana', value: 'indiana' })}
      ${chip.createSingle({ label: 'hovered', value: 'hovered' })}
      ${chip.createSingle({ label: 'Nevada', value: 'nevada' })}
      ${chip.createSingle({ label: 'selected', value: 'selected', selected: true })}
      ${chip.createSingle({ label: 'Colorado', value: 'colorado' })}
    </div>
  `;

  // Dark Mode Example
  document.getElementById('chip-dark').innerHTML = `
    <div class="chip-group" style="margin-bottom: 16px;">
      ${chip.createMultiple({ label: 'Option 1', dark: true })}
      ${chip.createMultiple({ label: 'Option 2', selected: true, dark: true })}
      ${chip.createMultiple({ label: 'Option 3', dark: true })}
    </div>
    <div class="chip-group">
      ${chip.createSingle({ label: 'Indiana', value: 'indiana', dark: true })}
      ${chip.createSingle({ label: 'hovered', value: 'hovered', dark: true })}
      ${chip.createSingle({ label: 'Nevada', value: 'nevada', dark: true })}
      ${chip.createSingle({ label: 'selected', value: 'selected', selected: true, dark: true })}
      ${chip.createSingle({ label: 'Colorado', value: 'colorado', dark: true })}
    </div>
  `;

  // Initialize interactivity
  chip.init(document, (event) => {
    console.log('Chip event:', event);
  });
}
