import './toggle.css';

/**
 * Toggle (Switch) Component
 */

/**
 * Cria toggle switch
 */
export function create(options = {}) {
  const {
    id = `toggle-${Date.now()}`,
    name = '',
    label = '',
    labelPosition = 'right', // left, right
    checked = false,
    disabled = false,
    color = 'primary', // primary, danger, success
    size = 'md', // sm, md, lg
    loading = false,
    dark = false,
    className = '',
  } = options;

  const classes = ['toggle'];
  if (size !== 'md') classes.push(`toggle--${size}`);
  if (color !== 'primary') classes.push(`toggle--${color}`);
  if (disabled) classes.push('toggle--disabled');
  if (loading) classes.push('toggle--loading');
  if (dark) classes.push('toggle--dark');
  if (className) classes.push(className);

  const labelHtml = label ? `
    <span class="toggle-label ${labelPosition === 'left' ? 'toggle-label--left' : ''}">${label}</span>
  ` : '';

  return `
    <label class="${classes.join(' ')}">
      <input
        type="checkbox"
        class="toggle-input"
        id="${id}"
        ${name ? `name="${name}"` : ''}
        ${checked ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
      />
      <span class="toggle-track">
        <span class="toggle-thumb"></span>
      </span>
      ${labelHtml}
    </label>
  `;
}

/**
 * Cria toggle apenas (sem label)
 */
export function createSimple(options = {}) {
  return create({
    ...options,
    label: '',
  });
}

/**
 * Cria grupo de toggles
 */
export function createGroup(options = {}) {
  const {
    toggles = [],
    horizontal = false,
    dark = false,
    className = '',
  } = options;

  const groupClasses = ['toggle-group'];
  if (horizontal) groupClasses.push('toggle-group--horizontal');
  if (className) groupClasses.push(className);

  const togglesHtml = toggles.map((toggle, index) => {
    return create({
      ...toggle,
      id: toggle.id || `toggle-group-${index}`,
      dark,
    });
  }).join('');

  return `
    <div class="${groupClasses.join(' ')}">
      ${togglesHtml}
    </div>
  `;
}

/**
 * Inicializa toggles
 */
export function init(container = document, onChange = null) {
  container.addEventListener('change', (e) => {
    const input = e.target.closest('.toggle-input');
    if (!input) return;

    const toggle = input.closest('.toggle');
    const checked = input.checked;
    const id = input.id;
    const name = input.name;

    if (onChange) {
      onChange({
        id,
        name,
        checked,
        element: toggle,
        input,
      });
    }
  });
}

/**
 * Obtém estado do toggle
 */
export function isChecked(toggleOrId) {
  const element = typeof toggleOrId === 'string'
    ? document.getElementById(toggleOrId)
    : toggleOrId.querySelector('.toggle-input');

  return element ? element.checked : false;
}

/**
 * Define estado do toggle
 */
export function setChecked(toggleOrId, checked) {
  const element = typeof toggleOrId === 'string'
    ? document.getElementById(toggleOrId)
    : toggleOrId.querySelector('.toggle-input');

  if (element) {
    element.checked = checked;
    // Dispatch change event
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

/**
 * Alterna estado do toggle
 */
export function toggle(toggleOrId) {
  const element = typeof toggleOrId === 'string'
    ? document.getElementById(toggleOrId)
    : toggleOrId.querySelector('.toggle-input');

  if (element) {
    element.checked = !element.checked;
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

/**
 * Desabilita toggle
 */
export function setDisabled(toggleOrId, disabled) {
  const input = typeof toggleOrId === 'string'
    ? document.getElementById(toggleOrId)
    : toggleOrId.querySelector('.toggle-input');

  if (input) {
    input.disabled = disabled;
    const toggle = input.closest('.toggle');
    if (toggle) {
      toggle.classList.toggle('toggle--disabled', disabled);
    }
  }
}

/**
 * Define loading state
 */
export function setLoading(toggleOrId, loading) {
  const input = typeof toggleOrId === 'string'
    ? document.getElementById(toggleOrId)
    : toggleOrId.querySelector('.toggle-input');

  if (input) {
    const toggle = input.closest('.toggle');
    if (toggle) {
      toggle.classList.toggle('toggle--loading', loading);
      input.disabled = loading;
    }
  }
}

export default {
  create,
  createSimple,
  createGroup,
  init,
  isChecked,
  setChecked,
  toggle,
  setDisabled,
  setLoading,
};
