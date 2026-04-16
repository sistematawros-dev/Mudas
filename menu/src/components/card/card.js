import './card.css';

/**
 * Card Component
 * Componente de card com múltiplas variantes
 */

const icons = {
  arrowRight: `<svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  star: `<svg viewBox="0 0 16 16"><path d="M8 1l2.2 4.4 4.8.7-3.5 3.4.8 4.9L8 12l-4.3 2.4.8-4.9L1 6.1l4.8-.7L8 1z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M21 21l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  arrowUp: `<svg viewBox="0 0 16 16" fill="none"><path d="M8 12V4M4 7l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowDown: `<svg viewBox="0 0 16 16" fill="none"><path d="M8 4v8M4 9l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Cria um card básico
 */
export function create(options = {}) {
  const {
    title = '',
    subtitle = '',
    description = '',
    image = null,
    imageAlt = '',
    imageAspect = 'default', // default, square, wide
    avatar = null,
    icon = null,
    iconVariant = 'default', // default, primary
    price = null,
    priceLabel = '',
    priceOld = null,
    rating = null,
    ratingCount = null,
    tags = [],
    link = null,
    linkText = 'Ver mais',
    actions = [],
    footer = null,
    size = 'md', // sm, md, lg, full
    variant = 'default', // default, elevated, flat, outlined, horizontal, image-bg, search, product, profile, stat
    dark = false,
    clickable = false,
    selected = false,
    disabled = false,
    className = '',
    onClick = null,
    imageBg = null, // URL for background image
    statValue = null,
    statLabel = '',
    statChange = null,
    statChangeDirection = 'up', // up, down
  } = options;

  const classes = ['card'];

  // Size
  if (size !== 'md') classes.push(`card--${size}`);

  // Variant
  if (variant !== 'default') classes.push(`card--${variant}`);

  // Modifiers
  if (dark) classes.push('card--dark');
  if (clickable) classes.push('card--clickable');
  if (selected) classes.push('is-selected');
  if (disabled) classes.push('is-disabled');
  if (className) classes.push(className);

  let html = '';

  // Background image style
  const bgStyle = imageBg ? `style="background-image: url('${imageBg}')"` : '';

  // Image section
  if (image && variant !== 'image-bg') {
    const aspectClass = imageAspect !== 'default' ? `card-image--${imageAspect}` : '';
    html += `
      <div class="card-image ${aspectClass}">
        <img src="${image}" alt="${imageAlt}" />
        ${tags.length > 0 ? `<div class="card-image-tag">${renderTags(tags)}</div>` : ''}
      </div>
    `;
  }

  // Body
  html += `<div class="card-body">`;

  // Stat card
  if (variant === 'stat' && statValue !== null) {
    html += `
      <div class="card-stat-label">${statLabel}</div>
      <div class="card-stat-value">${statValue}</div>
      ${statChange !== null ? `
        <span class="card-stat-change card-stat-change--${statChangeDirection}">
          ${statChangeDirection === 'up' ? icons.arrowUp : icons.arrowDown}
          ${statChange}
        </span>
      ` : ''}
    `;
  } else {
    // Header (avatar/icon + title/subtitle)
    if (avatar || icon || title || subtitle) {
      const hasMedia = avatar || icon;

      if (hasMedia) {
        html += `<div class="card-header">`;

        if (avatar) {
          html += `<img src="${avatar}" alt="" class="card-avatar" />`;
        } else if (icon) {
          const iconClass = iconVariant !== 'default' ? `card-icon--${iconVariant}` : '';
          html += `<div class="card-icon ${iconClass}">${icon}</div>`;
        }

        html += `<div class="card-header-content">`;
      }

      if (title) {
        html += `<h3 class="card-title">${title}</h3>`;
      }

      if (subtitle) {
        html += `<p class="card-subtitle">${subtitle}</p>`;
      }

      if (hasMedia) {
        html += `</div></div>`;
      }
    }

    // Description
    if (description) {
      html += `<p class="card-description">${description}</p>`;
    }

    // Meta (rating, etc)
    if (rating !== null) {
      html += `
        <div class="card-meta">
          <div class="card-rating">
            <span class="card-rating-star">${icons.star}</span>
            <span class="card-rating-value">${rating}</span>
          </div>
          ${ratingCount ? `
            <span class="card-meta-dot"></span>
            <span>${ratingCount} avaliações</span>
          ` : ''}
        </div>
      `;
    }

    // Tags (if not in image)
    if (tags.length > 0 && !image) {
      html += `<div class="card-tags">${renderTags(tags)}</div>`;
    }

    // Price
    if (price !== null) {
      html += `
        <div class="card-price">
          ${priceLabel ? `<span class="card-price-label">${priceLabel}</span>` : ''}
          <span class="card-price-value">${price}</span>
          ${priceOld ? `<span class="card-price-old">${priceOld}</span>` : ''}
        </div>
      `;
    }

    // Link
    if (link) {
      html += `
        <a href="${link}" class="card-link">
          ${linkText}
          ${icons.arrowRight}
        </a>
      `;
    }

    // Actions
    if (actions.length > 0) {
      html += `<div class="card-actions">${actions.join('')}</div>`;
    }
  }

  html += `</div>`;

  // Footer
  if (footer) {
    html += `<div class="card-footer">${footer}</div>`;
  }

  const clickAttr = onClick ? `onclick="${onClick}"` : '';

  return `<div class="${classes.join(' ')}" ${bgStyle} ${clickAttr}>${html}</div>`;
}

/**
 * Renderiza tags/badges
 */
function renderTags(tags) {
  return tags.map(tag => {
    if (typeof tag === 'string') {
      return `<span class="badge badge--soft">${tag}</span>`;
    }
    const { label, variant = 'soft', color = 'gray' } = tag;
    return `<span class="badge badge--${variant} badge--${color}">${label}</span>`;
  }).join('');
}

/**
 * Cria um card de produto
 */
export function createProduct(options = {}) {
  return create({
    ...options,
    variant: 'product',
    imageAspect: 'square',
  });
}

/**
 * Cria um card de estatística
 */
export function createStat(options = {}) {
  return create({
    ...options,
    variant: 'stat',
  });
}

/**
 * Cria um card de perfil
 */
export function createProfile(options = {}) {
  return create({
    ...options,
    variant: 'profile',
  });
}

/**
 * Cria um card de busca/pesquisa
 */
export function createSearch(options = {}) {
  const { icon = icons.search, ...rest } = options;
  return create({
    ...rest,
    variant: 'search',
    icon,
  });
}

/**
 * Cria um card com imagem de fundo
 */
export function createImageBg(options = {}) {
  const { image, ...rest } = options;
  return create({
    ...rest,
    variant: 'image-bg',
    imageBg: image,
  });
}

/**
 * Cria um grid de cards
 */
export function createGrid(cards, options = {}) {
  const { columns = 3, gap = 'var(--space-4)' } = options;

  return `
    <div class="card-grid" style="display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: ${gap};">
      ${cards.join('')}
    </div>
  `;
}

/**
 * Inicializa cards interativos
 */
export function init(container = document, onSelect = null) {
  const cards = container.querySelectorAll('.card--clickable');

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Não seleciona se clicou em um botão ou link
      if (e.target.closest('button, a')) return;

      // Toggle selection
      const wasSelected = card.classList.contains('is-selected');

      // Remove seleção anterior (se single select)
      container.querySelectorAll('.card.is-selected').forEach(c => {
        c.classList.remove('is-selected');
      });

      if (!wasSelected) {
        card.classList.add('is-selected');
      }

      if (onSelect) {
        onSelect(card, !wasSelected);
      }
    });
  });
}

export default {
  create,
  createProduct,
  createStat,
  createProfile,
  createSearch,
  createImageBg,
  createGrid,
  init,
  icons
};
