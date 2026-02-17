import * as Badge from '../badge/badge.js';
import { icon } from '../icons/icons.js';
import { generateId } from '../utils/helpers.js';

/**
 * Kanban Card Component
 * Card para quadro Kanban
 */

/**
 * Cria um card do Kanban
 * @param {Object} options
 * @param {string} options.code - Código da OP (ex: OP-2025-006)
 * @param {string} options.badgeLabel - Label do badge (ex: Enxertia)
 * @param {string} options.badgeVariant - Variante do badge (default: neutral)
 * @param {Array} options.items - Array de itens a exibir
 * @param {string} options.id - ID único do card
 * @returns {string} HTML do card
 */
export function create(options = {}) {
  const {
    code = '',
    subtitle = '',
    badgeLabel = '',
    badgeVariant = 'light',
    items = [],
    id = generateId('card'),
  } = options;

  const badgeHtml = badgeLabel ? Badge.create({
    text: badgeLabel,
    variant: badgeVariant,
    size: 'sm',
  }) : '';

  const itemsHtml = items.map(item => {
    if (item.type === 'divider') {
      return '<div class="kanban-card__divider"></div>';
    }

    const iconName = item.icon || 'circle';
    const iconSvg = icon(iconName, { size: 16 });

    return `
      <div class="kanban-card__item">
        ${iconSvg}
        <span>${item.label || ''}</span>
        ${item.value ? `<span class="kanban-card__item-label">${item.value}</span>` : ''}
      </div>
    `;
  }).join('');

  return `
    <div class="kanban-card" data-card-id="${id}">
      <div class="kanban-card__header">
        <div class="kanban-card__title">
          <a href="#" class="kanban-card__code">${code}</a>
          ${subtitle ? `<span class="kanban-card__subtitle">${subtitle}</span>` : ''}
        </div>
        ${badgeHtml}
      </div>
      <div class="kanban-card__body">
        ${itemsHtml}
      </div>
    </div>
  `;
}

export default {
  create,
};
