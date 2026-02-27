import './checkbox.css';

/**
 * Checkbox Component
 * Componente de checkbox com múltiplas variantes
 */

const icons = {
  check: `<svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  minus: `<svg viewBox="0 0 16 16" fill="none"><path d="M4 8H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
};

/**
 * Cria um checkbox
 */
export function create(options = {}) {
  const {
    id = `checkbox-${Math.random().toString(36).substr(2, 9)}`,
    name = '',
    value = '',
    label = '',
    description = '',
    checked = false,
    indeterminate = false,
    disabled = false,
    color = 'primary', // primary, error, success, warning, gray
    size = 'md', // sm, md, lg
    rounded = false,
    dark = false,
    className = '',
  } = options;

  const classes = ['checkbox'];

  // Size
  if (size !== 'md') classes.push(`checkbox--${size}`);

  // Color
  if (color !== 'primary') classes.push(`checkbox--${color}`);

  // Modifiers
  if (rounded) classes.push('checkbox--rounded');
  if (dark) classes.push('checkbox--dark');
  if (disabled) classes.push('checkbox--disabled');
  if (className) classes.push(className);

  const icon = indeterminate ? icons.minus : icons.check;
  const checkedAttr = checked ? 'checked' : '';
  const disabledAttr = disabled ? 'disabled' : '';
  const indeterminateAttr = indeterminate ? 'data-indeterminate="true"' : '';

  let labelHtml = '';
  if (label || description) {
    if (description) {
      labelHtml = `
        <div class="checkbox-content">
          <span class="checkbox-label">${label}</span>
          <span class="checkbox-description">${description}</span>
        </div>
      `;
    } else {
      labelHtml = `<span class="checkbox-label">${label}</span>`;
    }
  }

  return `
    <label class="${classes.join(' ')}">
      <input
        type="checkbox"
        class="checkbox-input"
        id="${id}"
        name="${name}"
        value="${value}"
        ${checkedAttr}
        ${disabledAttr}
        ${indeterminateAttr}
      />
      <span class="checkbox-box">${icon}</span>
      ${labelHtml}
    </label>
  `;
}

/**
 * Cria um grupo de checkboxes
 */
export function createGroup(options = {}) {
  const {
    name = '',
    label = '',
    items = [],
    horizontal = false,
    dark = false,
    size = 'md',
    color = 'primary',
  } = options;

  const classes = ['checkbox-group'];
  if (horizontal) classes.push('checkbox-group--horizontal');
  if (dark) classes.push('checkbox-group--dark');

  const checkboxes = items.map(item => {
    const itemOptions = typeof item === 'string'
      ? { label: item, value: item }
      : item;

    return create({
      name,
      size,
      color,
      dark,
      ...itemOptions,
    });
  }).join('');

  const labelHtml = label ? `<span class="checkbox-group-label">${label}</span>` : '';

  return `
    <div class="${classes.join(' ')}">
      ${labelHtml}
      ${checkboxes}
    </div>
  `;
}

/**
 * Inicializa checkboxes com estado indeterminate
 */
export function init(container = document) {
  const checkboxes = container.querySelectorAll('.checkbox-input[data-indeterminate="true"]');

  checkboxes.forEach(checkbox => {
    checkbox.indeterminate = true;
  });
}

/**
 * Obtém valores selecionados de um grupo
 */
export function getCheckedValues(container, name) {
  const checkboxes = container.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(checkboxes).map(cb => cb.value);
}

/**
 * Define estado de todos os checkboxes de um grupo
 */
export function setGroupState(container, name, checked) {
  const checkboxes = container.querySelectorAll(`input[name="${name}"]`);
  checkboxes.forEach(cb => {
    cb.checked = checked;
    cb.indeterminate = false;
  });
}

/**
 * Atualiza checkbox pai baseado nos filhos
 */
export function updateParentCheckbox(parentCheckbox, childCheckboxes) {
  const total = childCheckboxes.length;
  const checked = Array.from(childCheckboxes).filter(cb => cb.checked).length;

  if (checked === 0) {
    parentCheckbox.checked = false;
    parentCheckbox.indeterminate = false;
  } else if (checked === total) {
    parentCheckbox.checked = true;
    parentCheckbox.indeterminate = false;
  } else {
    parentCheckbox.checked = false;
    parentCheckbox.indeterminate = true;
  }
}

export default {
  create,
  createGroup,
  init,
  getCheckedValues,
  setGroupState,
  updateParentCheckbox,
  icons
};
