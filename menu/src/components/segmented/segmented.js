import './segmented.css';

/**
 * Segmented Control Component
 * @param {Object} options - Configurações do segmented control
 * @param {Array<{value: string, label: string}>} options.items - Itens do controle
 * @param {string} options.activeValue - Valor ativo inicial
 * @param {Function} options.onChange - Callback ao mudar seleção
 * @param {string} options.size - Tamanho: 'sm' | 'md' | 'lg' (default: 'md')
 * @returns {string} HTML do segmented control
 */
export function create(options = {}) {
  const {
    items = [],
    activeValue = items[0]?.value,
    size = 'md',
  } = options;

  if (items.length === 0) {
    return '';
  }

  const sizeClass = size !== 'md' ? `segmented--${size}` : '';

  return `
    <div class="segmented ${sizeClass}" role="tablist">
      ${items.map(item => `
        <button
          type="button"
          role="tab"
          class="segmented-item ${item.value === activeValue ? 'segmented-item--active' : ''}"
          data-value="${item.value}"
          aria-selected="${item.value === activeValue}"
        >
          ${item.label}
        </button>
      `).join('')}
    </div>
  `;
}

/**
 * Inicializa interatividade do segmented control
 * @param {HTMLElement} container - Container do segmented
 * @param {Function} onChange - Callback ao mudar seleção (recebe value)
 */
export function init(container, onChange) {
  if (!container) return;

  const segmented = container.querySelector('.segmented');
  if (!segmented) return;

  const items = segmented.querySelectorAll('.segmented-item');

  items.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active de todos
      items.forEach(i => {
        i.classList.remove('segmented-item--active');
        i.setAttribute('aria-selected', 'false');
      });

      // Adiciona active no clicado
      item.classList.add('segmented-item--active');
      item.setAttribute('aria-selected', 'true');

      // Callback
      if (onChange) {
        const value = item.getAttribute('data-value');
        onChange(value);
      }
    });
  });

  // Keyboard navigation
  segmented.addEventListener('keydown', (e) => {
    const activeItem = segmented.querySelector('.segmented-item--active');
    const itemsArray = Array.from(items);
    const currentIndex = itemsArray.indexOf(activeItem);

    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      let nextIndex;

      if (e.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % itemsArray.length;
      } else {
        nextIndex = (currentIndex - 1 + itemsArray.length) % itemsArray.length;
      }

      itemsArray[nextIndex].click();
      itemsArray[nextIndex].focus();
    }
  });
}

export default { create, init };
