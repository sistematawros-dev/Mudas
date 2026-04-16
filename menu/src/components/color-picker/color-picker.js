/**
 * Color Picker Component
 * Seletor de cores para colunas do Kanban
 */

import { icon } from '../icons/icons.js';
import { generateId, cx } from '../utils/helpers.js';

const COLORS = [
  { value: 'cyan', label: 'Ciano' },
  { value: 'green', label: 'Verde' },
  { value: 'blue', label: 'Azul' },
  { value: 'indigo', label: 'Índigo' },
  { value: 'slate', label: 'Ardósia' },
  { value: 'purple', label: 'Roxo' },
  { value: 'yellow', label: 'Amarelo' },
  { value: 'pink', label: 'Rosa' },
  { value: 'red', label: 'Vermelho' },
  { value: 'orange', label: 'Laranja' },
];

/**
 * Cria um color picker
 * @param {Object} options
 * @param {string} options.id - ID único
 * @param {string} options.selected - Cor selecionada
 * @returns {string} HTML do color picker
 */
export function create(options = {}) {
  const {
    id = generateId('color-picker'),
    selected = 'gray',
  } = options;

  const colorsHtml = COLORS.map(color => `
    <button
      type="button"
      class="${cx('color-picker__option', color.value === selected && 'is-selected')}"
      data-color="${color.value}"
      aria-label="${color.label}"
      title="${color.label}"
    >
      <span class="color-picker__color color-picker__color--${color.value}"></span>
    </button>
  `).join('');

  return `
    <div class="color-picker" id="${id}" data-color-picker>
      <div class="color-picker__header">
        <h4 class="color-picker__title">Cor da Coluna</h4>
        <button type="button" class="color-picker__close" aria-label="Fechar" data-color-picker-close>
          ${icon('close', { size: 16 })}
        </button>
      </div>
      <div class="color-picker__grid">
        ${colorsHtml}
      </div>
    </div>
  `;
}

/**
 * Inicializa o color picker
 * @param {HTMLElement} container - Container do color picker
 * @param {Function} onChange - Callback quando cor muda
 */
export function init(container, onChange) {
  if (!container) return;

  const options = container.querySelectorAll('.color-picker__option');
  const closeBtn = container.querySelector('[data-color-picker-close]');

  options.forEach(option => {
    option.addEventListener('click', () => {
      const color = option.dataset.color;

      // Remove seleção anterior
      options.forEach(opt => opt.classList.remove('is-selected'));

      // Adiciona seleção na opção clicada
      option.classList.add('is-selected');

      // Chama callback
      if (onChange) {
        onChange(color);
      }

      // Mantém a janela aberta para permitir troca de cor
    });
  });

  // Evento de fechar
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      close(container);
    });
  }
}

/**
 * Abre o color picker
 * @param {HTMLElement} picker - Elemento do color picker
 */
export function open(picker) {
  if (!picker) return;
  picker.classList.add('is-open');
}

/**
 * Fecha o color picker
 * @param {HTMLElement} picker - Elemento do color picker
 */
export function close(picker) {
  if (!picker) return;
  picker.classList.remove('is-open');
}

/**
 * Toggle do color picker
 * @param {HTMLElement} picker - Elemento do color picker
 */
export function toggle(picker) {
  if (!picker) return;
  picker.classList.toggle('is-open');
}

export default {
  create,
  init,
  open,
  close,
  toggle,
};
