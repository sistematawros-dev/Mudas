import './kpi-card.css';

/**
 * KPI Card Component
 * @param {Object} options - Configurações do card
 * @param {string} options.title - Título do KPI
 * @param {string} options.value - Valor principal
 * @param {Object} options.change - Variação do indicador
 * @param {number} options.change.value - Valor da variação (ex: 4.2)
 * @param {string} options.change.type - Tipo: 'positive' | 'negative' | 'neutral'
 * @param {string} options.change.label - Label da variação (ex: "em relação ao mês passado")
 * @param {boolean} options.hasMenu - Se deve mostrar menu "..." (default: true)
 * @returns {string} HTML do kpi card
 */
export function create(options = {}) {
  const {
    title = '',
    value = '',
    change = null,
    hasMenu = true,
  } = options;

  const changeIcon = change ? getChangeIcon(change.type) : '';
  const changeClass = change ? `kpi-card-change--${change.type}` : '';

  return `
    <div class="kpi-card">
      <div class="kpi-card-header">
        <h3 class="kpi-card-title">${title}</h3>
        ${hasMenu ? `
          <button type="button" class="kpi-card-menu-btn" aria-label="Mais opções">
            ${getMenuIcon()}
          </button>
        ` : ''}
      </div>

      <div class="kpi-card-value">${value}</div>

      ${change ? `
        <div class="kpi-card-change ${changeClass}">
          ${changeIcon}
          <span class="kpi-card-change-value">${formatChangeValue(change.value)}%</span>
          <span class="kpi-card-change-label">${change.label}</span>
        </div>
      ` : ''}
    </div>
  `;
}

function getChangeIcon(type) {
  if (type === 'positive') {
    return `
      <svg class="kpi-card-change-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="8" fill="currentColor" fill-opacity="0.1"/>
        <path d="M8 11V5M8 5L5 8M8 5L11 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  } else if (type === 'negative') {
    return `
      <svg class="kpi-card-change-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="8" fill="currentColor" fill-opacity="0.1"/>
        <path d="M8 5V11M8 11L11 8M8 11L5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }
  return '';
}

function getMenuIcon() {
  return `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
    </svg>
  `;
}

function formatChangeValue(value) {
  const absValue = Math.abs(value);
  return value > 0 ? `+${absValue}` : `-${absValue}`;
}

/**
 * Inicializa interatividade dos cards KPI
 * @param {HTMLElement} container - Container dos cards
 * @param {Function} onMenuClick - Callback ao clicar no menu (recebe card element)
 */
export function init(container, onMenuClick) {
  if (!container) return;

  const menuButtons = container.querySelectorAll('.kpi-card-menu-btn');

  menuButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.kpi-card');

      if (onMenuClick) {
        onMenuClick(card, btn);
      }
    });
  });
}

export default { create, init };
