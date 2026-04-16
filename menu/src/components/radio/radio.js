import './radio.css';

/**
 * Radio Button Component
 */

/**
 * Cria radio button individual
 */
export function create(options = {}) {
  const {
    id = `radio-${Date.now()}`,
    name = 'radio-group',
    value = '',
    label = '',
    description = '',
    checked = false,
    disabled = false,
    error = false,
    size = 'md', // sm, md, lg
    dark = false,
    className = '',
  } = options;

  const classes = ['radio'];
  if (size !== 'md') classes.push(`radio--${size}`);
  if (disabled) classes.push('radio--disabled');
  if (error) classes.push('radio--error');
  if (dark) classes.push('radio--dark');
  if (className) classes.push(className);

  const hasContent = label || description;

  const contentHtml = hasContent ? `
    <div class="radio-content">
      ${label ? `<span class="radio-label">${label}</span>` : ''}
      ${description ? `<span class="radio-description">${description}</span>` : ''}
    </div>
  ` : '';

  return `
    <label class="${classes.join(' ')}">
      <input
        type="radio"
        class="radio-input"
        id="${id}"
        name="${name}"
        value="${value}"
        ${checked ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
      />
      <span class="radio-circle"></span>
      ${contentHtml}
    </label>
  `;
}

/**
 * Cria grupo de radio buttons
 */
export function createGroup(options = {}) {
  const {
    name = 'radio-group',
    label = '',
    options: radioOptions = [],
    value = '',
    horizontal = false,
    size = 'md',
    error = '',
    dark = false,
    className = '',
  } = options;

  const groupClasses = ['radio-group'];
  if (horizontal) groupClasses.push('radio-group--horizontal');
  if (className) groupClasses.push(className);

  const radiosHtml = radioOptions.map((opt, index) => {
    const radioId = `${name}-${index}`;
    const isChecked = opt.value === value || (value === '' && opt.checked);

    return create({
      id: radioId,
      name,
      value: opt.value || '',
      label: opt.label || '',
      description: opt.description || '',
      checked: isChecked,
      disabled: opt.disabled || false,
      error: !!error,
      size,
      dark,
    });
  }).join('');

  const labelHtml = label ? `<div class="radio-group-label">${label}</div>` : '';
  const errorHtml = error ? `<div class="radio-group-error">${error}</div>` : '';

  return `
    <div class="${groupClasses.join(' ')}" data-radio-group="${name}">
      ${labelHtml}
      ${radiosHtml}
      ${errorHtml}
    </div>
  `;
}

/**
 * Cria radio card (variante boxed)
 */
export function createCard(options = {}) {
  const {
    id = `radio-card-${Date.now()}`,
    name = 'radio-card-group',
    value = '',
    label = '',
    description = '',
    checked = false,
    disabled = false,
    dark = false,
    className = '',
  } = options;

  const classes = ['radio-card'];
  if (checked) classes.push('is-selected');
  if (disabled) classes.push('radio-card--disabled');
  if (dark) classes.push('radio-card--dark');
  if (className) classes.push(className);

  return `
    <label class="${classes.join(' ')}" data-radio-card>
      <input
        type="radio"
        class="radio-input"
        id="${id}"
        name="${name}"
        value="${value}"
        ${checked ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
      />
      <span class="radio-circle"></span>
      <div class="radio-content">
        ${label ? `<span class="radio-label">${label}</span>` : ''}
        ${description ? `<span class="radio-description">${description}</span>` : ''}
      </div>
    </label>
  `;
}

/**
 * Cria grupo de radio cards
 */
export function createCardGroup(options = {}) {
  const {
    name = 'radio-card-group',
    options: cardOptions = [],
    value = '',
    dark = false,
    className = '',
  } = options;

  const cardsHtml = cardOptions.map((opt, index) => {
    const cardId = `${name}-${index}`;
    const isChecked = opt.value === value || (value === '' && opt.checked);

    return createCard({
      id: cardId,
      name,
      value: opt.value || '',
      label: opt.label || '',
      description: opt.description || '',
      checked: isChecked,
      disabled: opt.disabled || false,
      dark,
    });
  }).join('');

  const groupClasses = ['radio-group'];
  if (className) groupClasses.push(className);

  return `
    <div class="${groupClasses.join(' ')}" data-radio-card-group="${name}">
      ${cardsHtml}
    </div>
  `;
}

/**
 * Inicializa radio buttons
 */
export function init(container = document, onChange = null) {
  // Handle radio changes
  container.addEventListener('change', (e) => {
    const radio = e.target.closest('.radio-input');
    if (!radio) return;

    const name = radio.name;
    const value = radio.value;

    // Update card selection state
    const cardLabel = radio.closest('[data-radio-card]');
    if (cardLabel) {
      // Remove selection from siblings
      const group = cardLabel.closest('[data-radio-card-group]');
      if (group) {
        group.querySelectorAll('[data-radio-card]').forEach(card => {
          card.classList.remove('is-selected');
        });
      }
      cardLabel.classList.add('is-selected');
    }

    if (onChange) {
      onChange({ name, value, element: radio });
    }
  });
}

/**
 * Obtém valor selecionado de um grupo
 */
export function getValue(container, name) {
  const checked = container.querySelector(`input[name="${name}"]:checked`);
  return checked ? checked.value : null;
}

/**
 * Define valor de um grupo
 */
export function setValue(container, name, value) {
  const radio = container.querySelector(`input[name="${name}"][value="${value}"]`);
  if (radio) {
    radio.checked = true;

    // Update card state if applicable
    const cardLabel = radio.closest('[data-radio-card]');
    if (cardLabel) {
      const group = cardLabel.closest('[data-radio-card-group]');
      if (group) {
        group.querySelectorAll('[data-radio-card]').forEach(card => {
          card.classList.remove('is-selected');
        });
      }
      cardLabel.classList.add('is-selected');
    }
  }
}

export default {
  create,
  createGroup,
  createCard,
  createCardGroup,
  init,
  getValue,
  setValue,
};
