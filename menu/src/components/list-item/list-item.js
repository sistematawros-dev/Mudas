import './list-item.css';

/**
 * List Item Component
 * Item de lista com ícone, título, descrição e ação
 */

/**
 * Cria um item de lista
 * @param {Object} options
 * @param {string} options.id - ID do item
 * @param {string} options.icon - Ícone (SVG ou imagem URL)
 * @param {string} options.iconBg - Cor de fundo do ícone (default: var(--color-primary-soft))
 * @param {string} options.title - Título do item
 * @param {string} options.description - Descrição do item
 * @param {boolean} options.hasAction - Mostrar seta de ação (default: true)
 * @param {string} options.actionIcon - Ícone da ação (default: chevron-right)
 * @param {string} options.href - Link (se for <a>, senão será <button>)
 * @param {string} options.value - Valor associado ao item
 */
export function create(options = {}) {
  const {
    id = '',
    icon = '',
    iconBg = 'var(--color-primary-soft)',
    title = '',
    description = '',
    hasAction = true,
    actionIcon = 'chevron-right',
    href = '',
    value = '',
  } = options;

  const isLink = !!href;
  const tag = isLink ? 'a' : 'button';
  const attrs = isLink ? `href="${href}"` : 'type="button"';
  const dataAttrs = value ? `data-value="${value}"` : '';
  const idAttr = id ? `id="${id}"` : '';

  const chevronIcon = `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  // Detectar se icon é SVG ou URL de imagem
  const isIconSVG = icon.includes('<svg');
  const iconHTML = isIconSVG
    ? icon
    : `<img src="${icon}" alt="" />`;

  return `
    <${tag} class="list-item" ${attrs} ${dataAttrs} ${idAttr}>
      <div class="list-item-icon" style="background: ${iconBg}">
        ${iconHTML}
      </div>
      <div class="list-item-content">
        <div class="list-item-title">${title}</div>
        ${description ? `<div class="list-item-description">${description}</div>` : ''}
      </div>
      ${hasAction ? `
        <div class="list-item-action">
          ${actionIcon === 'chevron-right' ? chevronIcon : actionIcon}
        </div>
      ` : ''}
    </${tag}>
  `;
}

/**
 * Cria uma lista de items
 * @param {Array} items - Array de options para create()
 * @param {string} className - Classe CSS adicional
 */
export function createList(items = [], className = '') {
  const classes = ['list', className].filter(Boolean).join(' ');

  return `
    <div class="${classes}">
      ${items.map(item => create(item)).join('')}
    </div>
  `;
}

/**
 * Inicializa interatividade dos list-items
 * @param {HTMLElement} container
 * @param {Function} onClick - Callback ao clicar (recebe item element, value)
 */
export function init(container, onClick) {
  if (!container) return;

  const items = container.querySelectorAll('.list-item');

  items.forEach(item => {
    // Se já for um link, não precisa adicionar listener
    if (item.tagName.toLowerCase() === 'a') return;

    item.addEventListener('click', () => {
      const value = item.dataset.value;

      if (onClick) {
        onClick(item, value);
      }
    });
  });
}

export default {
  create,
  createList,
  init,
};
