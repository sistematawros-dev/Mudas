import './chip.css';

/**
 * Chip Component
 * Componente para seleções, filtros e tags
 */

const icons = {
  check: `<svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  close: `<svg viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};

/**
 * Cria um chip
 */
export function create(options = {}) {
  const {
    label = '',
    value = '',
    type = 'single', // single, multiple, input, filter
    selected = false,
    disabled = false,
    removable = false,
    icon = null,
    avatar = null,
    color = 'primary', // primary, success, error, warning
    size = 'md', // sm, md, lg
    dark = false,
    className = '',
    onClick = null,
    onRemove = null,
  } = options;

  const classes = ['chip', `chip--${type}`];

  // Size
  if (size !== 'md') classes.push(`chip--${size}`);

  // Color
  if (color !== 'primary') classes.push(`chip--${color}`);

  // Modifiers
  if (dark) classes.push('chip--dark');
  if (selected) classes.push('is-selected');
  if (disabled) classes.push('is-disabled');
  if (className) classes.push(className);

  let html = '';

  // Multiple choice checkbox
  if (type === 'multiple') {
    html += `<span class="chip-checkbox">${icons.check}</span>`;
  }

  // Icon
  if (icon) {
    html += `<span class="chip-icon">${icon}</span>`;
  }

  // Avatar
  if (avatar) {
    html += `<img src="${avatar}" alt="" class="chip-avatar" />`;
  }

  // Label
  html += `<span class="chip-label">${label}</span>`;

  // Close button (for input chips)
  if (removable || type === 'input') {
    html += `<span class="chip-close" data-action="remove">${icons.close}</span>`;
  }

  const dataAttrs = `data-value="${value}" data-selected="${selected}"`;
  const clickAttr = onClick ? `onclick="${onClick}"` : '';

  return `<button type="button" class="${classes.join(' ')}" ${dataAttrs} ${clickAttr}>${html}</button>`;
}

/**
 * Cria um chip de múltipla escolha
 */
export function createMultiple(options = {}) {
  return create({ ...options, type: 'multiple' });
}

/**
 * Cria um chip de escolha única
 */
export function createSingle(options = {}) {
  return create({ ...options, type: 'single' });
}

/**
 * Cria um chip de input (tag)
 */
export function createInput(options = {}) {
  return create({ ...options, type: 'input', removable: true });
}

/**
 * Cria um chip de filtro
 */
export function createFilter(options = {}) {
  return create({ ...options, type: 'filter' });
}

/**
 * Cria um grupo de chips
 */
export function createGroup(options = {}) {
  const {
    items = [],
    type = 'single', // single, multiple
    name = '',
    vertical = false,
    dark = false,
    size = 'md',
    className = '',
  } = options;

  const classes = ['chip-group'];
  if (vertical) classes.push('chip-group--vertical');
  if (className) classes.push(className);

  const chips = items.map(item => {
    const itemOptions = typeof item === 'string'
      ? { label: item, value: item }
      : item;

    return create({
      type,
      size,
      dark,
      ...itemOptions,
    });
  }).join('');

  return `<div class="${classes.join(' ')}" data-chip-group data-type="${type}" data-name="${name}">${chips}</div>`;
}

/**
 * Cria um campo de input com chips
 */
export function createInputField(options = {}) {
  const {
    chips = [],
    placeholder = 'Digite...',
    dark = false,
    name = '',
  } = options;

  const classes = ['chip-input-field'];
  if (dark) classes.push('chip-input-field--dark');

  const chipsHtml = chips.map(chip => {
    const chipOptions = typeof chip === 'string'
      ? { label: chip, value: chip }
      : chip;

    return createInput({ ...chipOptions, dark, size: 'sm' });
  }).join('');

  return `
    <div class="${classes.join(' ')}" data-chip-input data-name="${name}">
      ${chipsHtml}
      <input type="text" placeholder="${placeholder}" />
    </div>
  `;
}

/**
 * Inicializa chips interativos
 */
export function init(container = document, onChange = null) {
  // Handle chip clicks
  container.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip || chip.classList.contains('is-disabled')) return;

    // Handle remove button
    if (e.target.closest('[data-action="remove"]')) {
      handleRemove(chip, container, onChange);
      return;
    }

    // Handle selection
    const group = chip.closest('[data-chip-group]');
    if (group) {
      const type = group.dataset.type;
      handleGroupSelection(chip, group, type, onChange);
    } else {
      handleChipToggle(chip, onChange);
    }
  });

  // Handle chip input field
  const inputFields = container.querySelectorAll('[data-chip-input]');
  inputFields.forEach(field => {
    const input = field.querySelector('input');
    if (!input) return;

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        e.preventDefault();
        addChipToField(field, input.value.trim(), onChange);
        input.value = '';
      }

      if (e.key === 'Backspace' && !input.value) {
        const chips = field.querySelectorAll('.chip');
        const lastChip = chips[chips.length - 1];
        if (lastChip) {
          handleRemove(lastChip, container, onChange);
        }
      }
    });
  });
}

/**
 * Manipula seleção em grupo
 */
function handleGroupSelection(chip, group, type, onChange) {
  if (type === 'single') {
    // Single selection - deselect others
    group.querySelectorAll('.chip').forEach(c => {
      c.classList.remove('is-selected');
      c.dataset.selected = 'false';
    });
    chip.classList.add('is-selected');
    chip.dataset.selected = 'true';
  } else {
    // Multiple selection - toggle
    const isSelected = chip.classList.toggle('is-selected');
    chip.dataset.selected = isSelected.toString();
  }

  if (onChange) {
    const selectedChips = Array.from(group.querySelectorAll('.chip.is-selected'));
    const values = selectedChips.map(c => c.dataset.value);
    onChange({ type: 'select', values, group });
  }
}

/**
 * Toggle chip individual
 */
function handleChipToggle(chip, onChange) {
  const isSelected = chip.classList.toggle('is-selected');
  chip.dataset.selected = isSelected.toString();

  if (onChange) {
    onChange({ type: 'toggle', value: chip.dataset.value, selected: isSelected, chip });
  }
}

/**
 * Remove chip
 */
function handleRemove(chip, container, onChange) {
  const value = chip.dataset.value;
  chip.remove();

  if (onChange) {
    onChange({ type: 'remove', value, container });
  }
}

/**
 * Adiciona chip ao campo de input
 */
function addChipToField(field, value, onChange) {
  const input = field.querySelector('input');
  const isDark = field.classList.contains('chip-input-field--dark');

  const chipHtml = createInput({ label: value, value, dark: isDark, size: 'sm' });

  // Insert before input
  input.insertAdjacentHTML('beforebegin', chipHtml);

  if (onChange) {
    onChange({ type: 'add', value, field });
  }
}

/**
 * Obtém valores selecionados de um grupo
 */
export function getSelectedValues(group) {
  const chips = group.querySelectorAll('.chip.is-selected');
  return Array.from(chips).map(c => c.dataset.value);
}

/**
 * Define valores selecionados em um grupo
 */
export function setSelectedValues(group, values) {
  group.querySelectorAll('.chip').forEach(chip => {
    const isSelected = values.includes(chip.dataset.value);
    chip.classList.toggle('is-selected', isSelected);
    chip.dataset.selected = isSelected.toString();
  });
}

export default {
  create,
  createMultiple,
  createSingle,
  createInput,
  createFilter,
  createGroup,
  createInputField,
  init,
  getSelectedValues,
  setSelectedValues,
  icons
};
