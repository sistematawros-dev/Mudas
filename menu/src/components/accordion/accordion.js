import './accordion.css';

/**
 * Accordion Component
 *
 * Uso:
 * <div class="accordion" data-accordion>
 *   <div class="accordion-item">
 *     <button class="accordion-header">...</button>
 *     <div class="accordion-content">...</div>
 *   </div>
 * </div>
 *
 * Opções (data attributes):
 * - data-accordion="single" : apenas um item aberto por vez
 * - data-accordion="multiple" : múltiplos itens podem estar abertos
 */

export function init(container = document) {
  const accordions = container.querySelectorAll('[data-accordion]');
  accordions.forEach(setupAccordion);
}

function setupAccordion(accordion) {
  const mode = accordion.dataset.accordion || 'single';
  const headers = accordion.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('is-open');

      // Modo single: fecha outros itens
      if (mode === 'single' && !isOpen) {
        accordion.querySelectorAll('.accordion-item.is-open').forEach(openItem => {
          openItem.classList.remove('is-open');
        });
      }

      // Toggle do item atual
      item.classList.toggle('is-open');
    });
  });
}

/**
 * Cria um accordion programaticamente
 */
export function create(items, options = {}) {
  const { variant = '', mode = 'single' } = options;

  const classes = ['accordion'];
  if (variant) classes.push(`accordion--${variant}`);

  const html = `
    <div class="${classes.join(' ')}" data-accordion="${mode}">
      ${items.map((item, index) => `
        <div class="accordion-item${item.open ? ' is-open' : ''}">
          <button class="accordion-header" type="button">
            <span class="accordion-icon">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="5" width="10" height="2" rx="1" fill="currentColor"/>
                ${!item.open ? '<rect x="5" y="1" width="2" height="10" rx="1" fill="currentColor"/>' : ''}
              </svg>
            </span>
            <span class="accordion-title">${item.title}</span>
            <span class="accordion-arrow">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </span>
          </button>
          <div class="accordion-content">
            <div class="accordion-inner">
              <div class="accordion-body">
                ${item.content}
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  return html;
}

export default { init, create };
