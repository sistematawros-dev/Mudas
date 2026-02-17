import './status.css';

/**
 * Status Component
 */

/**
 * Cria status badge (com background)
 */
export function createBadge(options = {}) {
  const {
    label = 'Label',
    color = 'neutral', // success, warning, danger, info, neutral, inverted
    size = 'md', // sm, md, lg
    showDot = true,
    outlined = false,
    dark = false,
    className = '',
  } = options;

  const classes = ['status-badge', `status-badge--${color}`];
  if (size !== 'md') classes.push(`status-badge--${size}`);
  if (outlined) classes.push('status-badge--outlined');
  if (dark) classes.push('status-badge--dark');
  if (className) classes.push(className);

  const dotHtml = showDot ? '<span class="status-dot"></span>' : '';

  return `
    <span class="${classes.join(' ')}">
      ${dotHtml}
      <span>${label}</span>
    </span>
  `;
}

/**
 * Cria status simples (apenas dot + texto)
 */
export function createSimple(options = {}) {
  const {
    label = 'Label',
    color = 'neutral', // success, warning, danger, info, neutral
    size = 'md', // sm, md, lg
    muted = false, // texto sem cor (apenas dot colorido)
    pulse = false, // animação pulsante
    dark = false,
    className = '',
  } = options;

  const classes = ['status-simple', `status-simple--${color}`];
  if (size !== 'md') classes.push(`status-simple--${size}`);
  if (muted) classes.push('status-simple--muted');
  if (dark) classes.push('status-simple--dark');
  if (className) classes.push(className);

  const dotClasses = ['status-dot'];
  if (pulse) dotClasses.push('status-dot--pulse');

  return `
    <span class="${classes.join(' ')}">
      <span class="${dotClasses.join(' ')}"></span>
      <span>${label}</span>
    </span>
  `;
}

/**
 * Cria apenas o dot
 */
export function createDot(options = {}) {
  const {
    color = 'neutral',
    size = 'md',
    pulse = false,
    dark = false,
  } = options;

  const sizeMap = {
    sm: '6px',
    md: '8px',
    lg: '10px',
  };

  const colorMap = {
    success: dark ? 'var(--success-400)' : 'var(--success)',
    warning: dark ? 'var(--warning-400)' : 'var(--warning)',
    danger: dark ? 'var(--danger-400)' : 'var(--danger)',
    info: dark ? 'var(--info-400)' : 'var(--info)',
    neutral: dark ? 'var(--gray-500)' : 'var(--gray-400)',
  };

  const classes = ['status-dot'];
  if (pulse) classes.push('status-dot--pulse');

  return `
    <span
      class="${classes.join(' ')}"
      style="width: ${sizeMap[size]}; height: ${sizeMap[size]}; background: ${colorMap[color]};"
    ></span>
  `;
}

/**
 * Presets de status comuns
 */
export const presets = {
  // Rascunho
  draft: (dark = false) => createSimple({ label: 'Rascunho', color: 'neutral', muted: true, dark }),

  // Pré-aprovação
  pre: (dark = false) => createBadge({ label: 'PRE', color: 'inverted', dark }),

  // Cancelado
  canceled: (dark = false) => createBadge({ label: 'Cancelado', color: 'danger', dark }),

  // Recusado
  rejected: (dark = false) => createBadge({ label: 'Recusado', color: 'danger', dark }),

  // Ativo
  active: (dark = false) => createBadge({ label: 'Ativo', color: 'success', dark }),

  // Suspenso
  suspended: (dark = false) => createSimple({ label: 'Suspenso', color: 'neutral', muted: true, dark }),

  // Online
  online: (dark = false) => createBadge({ label: 'Online', color: 'success', dark }),
  onlineSimple: (dark = false) => createSimple({ label: 'Online', color: 'success', pulse: true, dark }),

  // Offline
  offline: (dark = false) => createBadge({ label: 'Offline', color: 'danger', dark }),
  offlineSimple: (dark = false) => createSimple({ label: 'Offline', color: 'danger', dark }),

  // Waiting
  waiting: (dark = false) => createBadge({ label: 'Waiting', color: 'warning', dark }),
  waitingSimple: (dark = false) => createSimple({ label: 'Waiting', color: 'warning', dark }),

  // No response
  noResponse: (dark = false) => createSimple({ label: 'No response', color: 'neutral', muted: true, dark }),

  // Pending
  pending: (dark = false) => createBadge({ label: 'Pendente', color: 'warning', dark }),

  // Completed
  completed: (dark = false) => createBadge({ label: 'Concluído', color: 'success', dark }),

  // In Progress
  inProgress: (dark = false) => createBadge({ label: 'Em progresso', color: 'info', dark }),
};

/**
 * Cria grupo de status para exibição
 */
export function createGroup(items = [], options = {}) {
  const { gap = 'var(--space-2)', direction = 'row' } = options;

  const style = `display: flex; flex-direction: ${direction}; gap: ${gap}; flex-wrap: wrap;`;

  return `
    <div style="${style}">
      ${items.join('')}
    </div>
  `;
}

export default {
  createBadge,
  createSimple,
  createDot,
  createGroup,
  presets,
};
