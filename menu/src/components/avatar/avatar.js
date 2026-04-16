import './avatar.css';

/**
 * Avatar Component
 *
 * Uso:
 * <span class="avatar avatar--md">
 *   <img src="..." alt="User" />
 *   <span class="avatar-status avatar-status--online"></span>
 * </span>
 *
 * Ou com iniciais:
 * <span class="avatar avatar--md avatar--primary">JD</span>
 */

/**
 * Cria um avatar
 */
export function create(options = {}) {
  const {
    src,
    alt = '',
    initials = '',
    size = 'md',
    status,
    variant = '',
  } = options;

  const classes = ['avatar', `avatar--${size}`];
  if (variant) classes.push(`avatar--${variant}`);

  let content = '';
  if (src) {
    content = `<img src="${src}" alt="${alt}" />`;
  } else if (initials) {
    content = initials.toUpperCase().slice(0, 2);
  }

  let statusHtml = '';
  if (status) {
    statusHtml = `<span class="avatar-status avatar-status--${status}"></span>`;
  }

  return `<span class="${classes.join(' ')}">${content}${statusHtml}</span>`;
}

/**
 * Cria um grupo de avatares empilhados
 */
export function createGroup(avatars, options = {}) {
  const { max = 5, size = 'md', dark = false } = options;

  const visibleAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  const groupClasses = ['avatar-group'];
  if (dark) groupClasses.push('avatar-group--dark');

  let html = visibleAvatars.map(avatar => create({ ...avatar, size })).join('');

  if (remaining > 0) {
    html += `<span class="avatar avatar--${size} avatar--counter">+${remaining}</span>`;
  }

  return `<div class="${groupClasses.join(' ')}">${html}</div>`;
}

/**
 * Extrai iniciais de um nome
 */
export function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function init() {
  // Componente não precisa de inicialização JS
}

export default { create, createGroup, getInitials, init };
