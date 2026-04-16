/**
 * Kanban Column Component
 * Coluna do quadro Kanban
 */

import { icon } from '../icons/icons.js';
import { generateId } from '../utils/helpers.js';

/**
 * Cria uma coluna do Kanban
 * @param {Object} options
 * @param {string} options.title - Título da coluna
 * @param {number} options.count - Número de cards na coluna
 * @param {string} options.color - Cor da coluna (green, blue, cyan, purple, orange, yellow, pink, gray)
 * @param {string} options.id - ID único da coluna
 * @returns {string} HTML da coluna
 */
export function create(options = {}) {
  const {
    title = '',
    count = 0,
    color = 'gray',
    id = generateId('column'),
  } = options;

  return `
    <section class="kanban-column kanban-column--${color}" data-column-id="${id}" data-column-color="${color}">
      <div class="kanban-column__header">
        <div class="kanban-column__title-wrapper">
          <h3 class="kanban-column__title">${title}</h3>
          <span class="kanban-column__count">${count}</span>
        </div>
        <button class="kanban-column__settings" data-column-settings="${id}" aria-label="Configurações da coluna">
          ${icon('settings', { size: 20 })}
        </button>
      </div>
      <div class="kanban-column__content" data-column-content="${id}">
        <!-- Cards serão inseridos aqui -->
      </div>
    </section>
  `;
}

/**
 * Adiciona card a uma coluna
 * @param {string} columnId - ID da coluna
 * @param {string} cardHtml - HTML do card
 */
export function addCard(columnId, cardHtml) {
  const content = document.querySelector(`[data-column-content="${columnId}"]`);
  if (!content) return;

  // Remove empty state se existir
  const emptyState = content.querySelector('.kanban-column__empty');
  if (emptyState) {
    emptyState.remove();
  }

  content.insertAdjacentHTML('beforeend', cardHtml);
  updateCount(columnId);
}

/**
 * Atualiza a contagem de cards na coluna
 * @param {string} columnId - ID da coluna
 */
export function updateCount(columnId) {
  const column = document.querySelector(`[data-column-id="${columnId}"]`);
  if (!column) return;

  const content = column.querySelector(`[data-column-content="${columnId}"]`);
  const count = content.querySelectorAll('.kanban-card').length;
  const countElement = column.querySelector('.kanban-column__count');

  if (countElement) {
    countElement.textContent = count;
  }
}

/**
 * Muda a cor da coluna
 * @param {string} columnId - ID da coluna
 * @param {string} color - Nova cor (cyan, green, blue, indigo, slate, purple, yellow, pink, red, orange)
 */
export function changeColor(columnId, color) {
  const column = document.querySelector(`[data-column-id="${columnId}"]`);
  if (!column) return;

  // Remove todas as classes de cor
  const colors = ['cyan', 'green', 'blue', 'indigo', 'slate', 'purple', 'yellow', 'pink', 'red', 'orange'];
  colors.forEach(c => column.classList.remove(`kanban-column--${c}`));

  // Adiciona nova cor
  column.classList.add(`kanban-column--${color}`);
  column.dataset.columnColor = color;
}

/**
 * Mostra empty state quando não há cards
 * @param {string} columnId - ID da coluna
 */
export function showEmptyState(columnId) {
  const content = document.querySelector(`[data-column-content="${columnId}"]`);
  if (!content) return;

  content.innerHTML = `
    <div class="kanban-column__empty">
      ${icon('package', { size: 48 })}
      <p class="kanban-column__empty-text">Não há ordens de produção</p>
    </div>
  `;
}

export default {
  create,
  addCard,
  updateCount,
  changeColor,
  showEmptyState,
};
