import './broadcast-banner.css';

/**
 * Broadcast Banner Component
 *
 * Uso:
 * <div class="broadcast-banner broadcast-banner--primary">
 *   <span class="broadcast-banner-icon">...</span>
 *   <span class="broadcast-banner-text">Message with <a href="#" class="broadcast-banner-link">link</a></span>
 *   <button class="broadcast-banner-close">×</button>
 * </div>
 */

const icons = {
  info: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 7V11M8 5V5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  warning: `<svg viewBox="0 0 16 16" fill="none"><path d="M8 2L14.5 13H1.5L8 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6V9M8 11V11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  error: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M10 6L6 10M6 6L10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  success: `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  close: `<svg viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};

/**
 * Cria um broadcast banner
 */
export function create(options = {}) {
  const {
    text = '',
    variant = 'primary',
    link = null,
    closable = true,
    icon = 'info',
  } = options;

  const classes = ['broadcast-banner', `broadcast-banner--${variant}`];

  const iconHtml = icons[icon]
    ? `<span class="broadcast-banner-icon">${icons[icon]}</span>`
    : '';

  let textHtml = text;
  if (link) {
    textHtml = text.replace(
      link.text,
      `<a href="${link.href}" class="broadcast-banner-link">${link.text}</a>`
    );
  }

  const closeHtml = closable
    ? `<button class="broadcast-banner-close" type="button" aria-label="Fechar">${icons.close}</button>`
    : '';

  return `
    <div class="${classes.join(' ')}">
      ${iconHtml}
      <span class="broadcast-banner-text">${textHtml}</span>
      ${closeHtml}
    </div>
  `;
}

/**
 * Inicializa os banners (fecha ao clicar no X)
 */
export function init(container = document) {
  const banners = container.querySelectorAll('.broadcast-banner');

  banners.forEach(banner => {
    const closeBtn = banner.querySelector('.broadcast-banner-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => close(banner));
    }
  });
}

/**
 * Fecha um banner com animação
 */
export function close(banner) {
  banner.classList.add('broadcast-banner--closing');
  banner.addEventListener('animationend', () => {
    banner.remove();
  }, { once: true });
}

/**
 * Mostra um banner no topo da página
 */
export function show(options = {}) {
  const html = create({ ...options, closable: true });
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  const banner = wrapper.firstElementChild;

  banner.classList.add('broadcast-banner--fixed', 'broadcast-banner--animate');

  document.body.prepend(banner);
  init(banner.parentElement);

  return banner;
}

export default { create, init, close, show };
