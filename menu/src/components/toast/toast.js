import './toast.css';

/**
 * Toast / Notification Component
 */

const icons = {
  success: `<svg viewBox="0 0 24 24" fill="none"><path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  error: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18C1.64 18.3 1.55 18.64 1.55 19C1.55 19.36 1.64 19.7 1.82 20C2 20.3 2.26 20.56 2.56 20.74C2.86 20.92 3.21 21.01 3.56 21H20.44C20.79 21.01 21.14 20.92 21.44 20.74C21.74 20.56 22 20.3 22.18 20C22.36 19.7 22.45 19.36 22.45 19C22.45 18.64 22.36 18.3 22.18 18L13.71 3.86C13.53 3.56 13.27 3.32 12.97 3.15C12.67 2.98 12.34 2.89 12 2.89C11.66 2.89 11.33 2.98 11.03 3.15C10.73 3.32 10.47 3.56 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 16V12M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

// Store active toasts per container
const activeToasts = new Map();

/**
 * Cria HTML de um toast
 */
export function create(options = {}) {
  const {
    id = `toast-${Date.now()}`,
    type = 'neutral', // success, error, warning, info, neutral
    variant = 'filled', // filled, outlined, soft
    title = '',
    message = '',
    action = null, // { label: 'Action', onClick: () => {} }
    closable = true,
    dark = false,
    className = '',
  } = options;

  const classes = ['toast'];
  if (type !== 'neutral') classes.push(`toast--${type}`);
  if (variant !== 'filled') classes.push(`toast--${variant}`);
  if (dark) classes.push('toast--dark');
  if (className) classes.push(className);

  const icon = icons[type] || '';

  return `
    <div class="${classes.join(' ')}" id="${id}" data-toast>
      ${icon ? `<span class="toast-icon">${icon}</span>` : ''}
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        ${message ? `<div class="toast-message">${message}</div>` : ''}
        ${action ? `<button class="toast-action" data-toast-action>${action.label}</button>` : ''}
      </div>
      ${closable ? `<button class="toast-close" data-toast-close>${icons.close}</button>` : ''}
    </div>
  `;
}

/**
 * Obtém ou cria container de toasts
 */
function getContainer(position = 'top-right') {
  const containerId = `toast-container-${position}`;
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = `toast-container toast-container--${position}`;
    document.body.appendChild(container);
  }

  return container;
}

/**
 * Exibe um toast
 */
export function show(options = {}) {
  const {
    position = 'top-right',
    duration = 5000, // 0 = sem auto-dismiss
    onClose,
    onAction,
    ...toastOptions
  } = options;

  const container = getContainer(position);
  const toastId = toastOptions.id || `toast-${Date.now()}`;
  const toastHtml = create({ ...toastOptions, id: toastId });

  // Adiciona toast ao container
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = toastHtml;
  const toastElement = tempDiv.firstElementChild;
  container.appendChild(toastElement);

  // Armazena referência
  if (!activeToasts.has(position)) {
    activeToasts.set(position, new Map());
  }
  activeToasts.get(position).set(toastId, toastElement);

  // Event listeners
  const closeBtn = toastElement.querySelector('[data-toast-close]');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      dismiss(toastId, position, onClose);
    });
  }

  const actionBtn = toastElement.querySelector('[data-toast-action]');
  if (actionBtn && onAction) {
    actionBtn.addEventListener('click', () => {
      onAction();
    });
  }

  // Auto-dismiss
  if (duration > 0) {
    setTimeout(() => {
      dismiss(toastId, position, onClose);
    }, duration);
  }

  return toastId;
}

/**
 * Fecha um toast específico
 */
export function dismiss(toastId, position = 'top-right', callback) {
  const positionToasts = activeToasts.get(position);
  if (!positionToasts) return;

  const toastElement = positionToasts.get(toastId);
  if (!toastElement) return;

  // Animação de saída
  toastElement.classList.add('is-exiting');

  setTimeout(() => {
    toastElement.remove();
    positionToasts.delete(toastId);

    // Remove container se vazio
    const container = document.getElementById(`toast-container-${position}`);
    if (container && container.children.length === 0) {
      container.remove();
    }

    if (callback) callback();
  }, 200);
}

/**
 * Fecha todos os toasts
 */
export function dismissAll(position) {
  if (position) {
    const positionToasts = activeToasts.get(position);
    if (positionToasts) {
      positionToasts.forEach((_, toastId) => {
        dismiss(toastId, position);
      });
    }
  } else {
    activeToasts.forEach((_, pos) => {
      dismissAll(pos);
    });
  }
}

/**
 * Toast de sucesso
 */
export function success(title, options = {}) {
  return show({
    type: 'success',
    title,
    ...options,
  });
}

/**
 * Toast de erro
 */
export function error(title, options = {}) {
  return show({
    type: 'error',
    title,
    ...options,
  });
}

/**
 * Toast de aviso
 */
export function warning(title, options = {}) {
  return show({
    type: 'warning',
    title,
    ...options,
  });
}

/**
 * Toast de informação
 */
export function info(title, options = {}) {
  return show({
    type: 'info',
    title,
    ...options,
  });
}

/**
 * Presets de toasts comuns
 */
export const presets = {
  saved: () => success('Alterações salvas', { message: 'Suas alterações foram salvas com sucesso.' }),
  deleted: () => success('Item excluído', { message: 'O item foi excluído permanentemente.' }),
  copied: () => success('Copiado!', { message: 'Conteúdo copiado para a área de transferência.' }),

  errorGeneric: () => error('Erro', { message: 'Ocorreu um erro. Tente novamente.' }),
  errorNetwork: () => error('Erro de conexão', { message: 'Verifique sua conexão com a internet.' }),
  errorPermission: () => error('Sem permissão', { message: 'Você não tem permissão para esta ação.' }),

  warningUnsaved: () => warning('Alterações não salvas', {
    message: 'Você tem alterações não salvas.',
    action: { label: 'Salvar agora' }
  }),

  infoUpdate: () => info('Atualização disponível', {
    message: 'Uma nova versão está disponível.',
    action: { label: 'Atualizar' }
  }),
};

export default {
  create,
  show,
  dismiss,
  dismissAll,
  success,
  error,
  warning,
  info,
  presets,
  icons,
};
