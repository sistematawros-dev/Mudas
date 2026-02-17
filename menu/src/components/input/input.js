import './input.css';

/**
 * Input Component
 * Campo de entrada de texto com múltiplas variantes
 */

const icons = {
  search: `<svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  close: `<svg viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  eye: `<svg viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/></svg>`,
  eyeOff: `<svg viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M6.5 6.5a2 2 0 002.9 2.9M1 8s3-5 7-5c1 0 1.9.2 2.7.6M15 8s-1.5 2.5-4 4M11.8 5.2c1.5 1.2 2.5 2.8 2.5 2.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  chevronDown: `<svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  calendar: `<svg viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  check: `<svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Cria um campo de input completo
 */
export function create(options = {}) {
  const {
    id = `input-${Math.random().toString(36).substr(2, 9)}`,
    name = '',
    type = 'text', // text, password, email, number, tel, url, search, textarea
    label = '',
    placeholder = '',
    value = '',
    helper = '',
    error = '',
    success = '',
    required = false,
    optional = false,
    disabled = false,
    readonly = false,
    maxLength = null,
    showCounter = false,
    iconLeft = null,
    iconRight = null,
    prefix = null,
    suffix = null,
    clearable = false,
    size = 'md', // sm, md, lg
    dark = false,
    floating = false,
    rows = 4,
    className = '',
  } = options;

  const fieldClasses = ['field'];
  if (error) fieldClasses.push('field--error');
  if (success) fieldClasses.push('field--success');
  if (dark) fieldClasses.push('field--dark');
  if (floating) fieldClasses.push('field--floating');
  if (className) fieldClasses.push(className);

  const inputClasses = ['input'];
  const isDateInput = type === 'date';
  if (size !== 'md') inputClasses.push(`input--${size}`);
  if (type === 'textarea') inputClasses.push('input--textarea');

  const wrapperClasses = ['input-wrapper'];
  if (iconLeft) wrapperClasses.push('input-wrapper--icon-left');
  if (iconRight || clearable || type === 'password' || isDateInput) wrapperClasses.push('input-wrapper--icon-right');
  if (iconLeft && (iconRight || clearable || type === 'password')) wrapperClasses.push('input-wrapper--icon-both');
  if (prefix) wrapperClasses.push('input-wrapper--has-prefix');
  if (suffix) wrapperClasses.push('input-wrapper--has-suffix');

  // Label
  let labelHtml = '';
  if (label && !floating) {
    labelHtml = `
      <label class="field-label" for="${id}">
        ${label}
        ${required ? '<span class="field-label-required">*</span>' : ''}
        ${optional ? '<span class="field-label-optional">(opcional)</span>' : ''}
      </label>
    `;
  }

  // Input attributes
  const attrs = [
    `id="${id}"`,
    `name="${name || id}"`,
    `class="${inputClasses.join(' ')}"`,
    placeholder ? `placeholder="${placeholder}"` : (floating ? 'placeholder=" "' : ''),
    value ? `value="${value}"` : '',
    disabled ? 'disabled' : '',
    readonly ? 'readonly' : '',
    required ? 'required' : '',
    maxLength ? `maxlength="${maxLength}"` : '',
  ].filter(Boolean).join(' ');

  // Input element
  let inputHtml = '';
  if (type === 'textarea') {
    inputHtml = `<textarea ${attrs} rows="${rows}">${value}</textarea>`;
  } else {
  const inputType = type === 'password' ? 'password' : type;
    inputHtml = `<input type="${inputType}" ${attrs} />`;
  }

  // Icons
  const leftIconHtml = iconLeft ? `<span class="input-icon input-icon--left">${iconLeft}</span>` : '';

  let rightIconHtml = '';
  if (type === 'password') {
    rightIconHtml = `<button type="button" class="input-icon input-icon--right input-icon--action" data-toggle-password>${icons.eye}</button>`;
  } else if (clearable) {
    rightIconHtml = `<button type="button" class="input-icon input-icon--right input-icon--action" data-clear-input style="display:none">${icons.close}</button>`;
  } else if (isDateInput) {
    const dateIcon = iconRight || icons.calendar;
    rightIconHtml = `<span class="input-icon input-icon--right input-icon--action" data-open-picker data-picker-input="${id}" aria-hidden="true">${dateIcon}</span>`;
  } else if (iconRight) {
    rightIconHtml = `<span class="input-icon input-icon--right">${iconRight}</span>`;
  }

  // Prefix/Suffix
  const prefixHtml = prefix ? `<span class="input-addon input-addon--prefix">${prefix}</span>` : '';
  const suffixHtml = suffix ? `<span class="input-addon input-addon--suffix">${suffix}</span>` : '';

  // Floating label
  const floatingLabelHtml = floating && label ? `
    <label class="field-label" for="${id}">
      ${label}
      ${required ? '<span class="field-label-required">*</span>' : ''}
    </label>
  ` : '';

  // Helper/Error/Counter
  let helperHtml = '';
  const message = error || success || helper;
  if (message || showCounter) {
    helperHtml = `
      <div class="field-helper">
        <span class="field-message">${message}</span>
        ${showCounter && maxLength ? `<span class="field-counter"><span data-char-count>${value.length}</span>/${maxLength}</span>` : ''}
      </div>
    `;
  }

  return `
    <div class="${fieldClasses.join(' ')}">
      ${labelHtml}
      <div class="${wrapperClasses.join(' ')}">
        ${prefixHtml}
        ${leftIconHtml}
        ${inputHtml}
        ${rightIconHtml}
        ${floatingLabelHtml}
        ${suffixHtml}
      </div>
      ${helperHtml}
    </div>
  `;
}

/**
 * Cria um campo de busca
 */
export function createSearch(options = {}) {
  return create({
    ...options,
    type: 'search',
    iconLeft: icons.search,
    clearable: true,
    placeholder: options.placeholder || 'Pesquisar...',
  });
}

/**
 * Cria um campo de senha
 */
export function createPassword(options = {}) {
  return create({
    ...options,
    type: 'password',
  });
}

/**
 * Cria um campo de textarea
 */
export function createTextarea(options = {}) {
  return create({
    ...options,
    type: 'textarea',
  });
}

/**
 * Cria um select customizado
 */
export function createSelect(options = {}) {
  const {
    id = `select-${Math.random().toString(36).substr(2, 9)}`,
    name = '',
    label = '',
    placeholder = 'Selecione...',
    value = '',
    items = [],
    helper = '',
    error = '',
    required = false,
    disabled = false,
    size = 'md',
    dark = false,
    className = '',
  } = options;

  const fieldClasses = ['field'];
  if (error) fieldClasses.push('field--error');
  if (dark) fieldClasses.push('field--dark');
  if (className) fieldClasses.push(className);

  const inputClasses = ['input'];
  if (size !== 'md') inputClasses.push(`input--${size}`);

  const labelHtml = label ? `
    <label class="field-label" for="${id}">
      ${label}
      ${required ? '<span class="field-label-required">*</span>' : ''}
    </label>
  ` : '';

  const optionsHtml = items.map(item => {
    const itemValue = typeof item === 'string' ? item : item.value;
    const itemLabel = typeof item === 'string' ? item : item.label;
    const selected = itemValue === value ? 'selected' : '';
    return `<option value="${itemValue}" ${selected}>${itemLabel}</option>`;
  }).join('');

  const helperHtml = (error || helper) ? `
    <div class="field-helper">
      <span class="field-message">${error || helper}</span>
    </div>
  ` : '';

  return `
    <div class="${fieldClasses.join(' ')}">
      ${labelHtml}
      <div class="input-wrapper input-wrapper--select input-wrapper--icon-right">
        <select id="${id}" name="${name || id}" class="${inputClasses.join(' ')}" ${disabled ? 'disabled' : ''} ${required ? 'required' : ''}>
          ${placeholder ? `<option value="" disabled ${!value ? 'selected' : ''}>${placeholder}</option>` : ''}
          ${optionsHtml}
        </select>
        <span class="input-icon input-icon--right">${icons.chevronDown}</span>
      </div>
      ${helperHtml}
    </div>
  `;
}

/**
 * Cria um input com autocomplete
 */
export function createAutocomplete(options = {}) {
  const { suggestions = [], ...rest } = options;

  const suggestionsHtml = suggestions.length > 0 ? `
    <div class="input-suggestions" data-suggestions>
      ${suggestions.map((item, index) => {
        const value = typeof item === 'string' ? item : item.value;
        const label = typeof item === 'string' ? item : item.label;
        return `<div class="input-suggestion" data-value="${value}" data-index="${index}">${label}</div>`;
      }).join('')}
    </div>
  ` : '';

  // Wrap the input with suggestions
  const inputHtml = create(rest);

  return inputHtml.replace('</div>\n    </div>', `${suggestionsHtml}</div>\n    </div>`);
}

/**
 * Inicializa inputs interativos
 */
export function init(container = document) {
  const datePickerHandlers = [];

  // Toggle password visibility
  container.querySelectorAll('[data-toggle-password]').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrapper = btn.closest('.input-wrapper');
      const input = wrapper.querySelector('input');

      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = icons.eyeOff;
      } else {
        input.type = 'password';
        btn.innerHTML = icons.eye;
      }
    });
  });

  // Clear input
  container.querySelectorAll('[data-clear-input]').forEach(btn => {
    const wrapper = btn.closest('.input-wrapper');
    const input = wrapper.querySelector('input');

    // Show/hide clear button
    const updateClearButton = () => {
      btn.style.display = input.value ? 'flex' : 'none';
    };

    input.addEventListener('input', updateClearButton);
    updateClearButton();

    btn.addEventListener('click', () => {
      input.value = '';
      input.focus();
      updateClearButton();
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });

  // Character counter
  container.querySelectorAll('[data-char-count]').forEach(counter => {
    const field = counter.closest('.field');
    const input = field.querySelector('.input');

    input.addEventListener('input', () => {
      counter.textContent = input.value.length;
    });
  });

  // Autocomplete suggestions
  container.querySelectorAll('[data-suggestions]').forEach(suggestions => {
    const wrapper = suggestions.closest('.input-wrapper');
    const input = wrapper.querySelector('input');

    input.addEventListener('focus', () => {
      suggestions.classList.add('is-visible');
    });

    input.addEventListener('blur', () => {
      setTimeout(() => {
        suggestions.classList.remove('is-visible');
      }, 150);
    });

    suggestions.querySelectorAll('.input-suggestion').forEach(item => {
      item.addEventListener('click', () => {
        input.value = item.dataset.value;
        suggestions.classList.remove('is-visible');
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });
    });
  });

  container.querySelectorAll('[data-open-picker]').forEach(btn => {
    const targetId = btn.getAttribute('data-picker-input');
    const input = targetId
      ? container.querySelector(`#${targetId}`)
      : btn.closest('.input-wrapper')?.querySelector('input');

    if (!input || input.type !== 'date') return;

    const handleOpenPicker = (event) => {
      event.preventDefault();
      if (typeof input.showPicker === 'function') {
        input.showPicker();
        return;
      }
      input.focus();
      input.click();
    };

    btn.addEventListener('click', handleOpenPicker);
    datePickerHandlers.push({ btn, handleOpenPicker });
  });

  return () => {
    datePickerHandlers.forEach(({ btn, handleOpenPicker }) => {
      btn.removeEventListener('click', handleOpenPicker);
    });
  };
}

export default {
  create,
  createSearch,
  createPassword,
  createTextarea,
  createSelect,
  createAutocomplete,
  init,
  icons
};
