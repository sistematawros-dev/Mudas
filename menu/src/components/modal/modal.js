/**
 * Modal / Bottom Sheet Component
 */

const icons = {
  close: `<svg viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  danger: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M8 12l3 3 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 16v-4M12 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  slot: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/><path d="M9 9h6v6H9z" stroke="currentColor" stroke-width="2"/></svg>`,
};

let activeModals = [];

/**
 * Cria um modal
 */
export function create(options = {}) {
  const {
    id = `modal-${Math.random().toString(36).substr(2, 9)}`,
    type = 'center', // center, bottom
    size = 'md', // sm, md, lg, xl, full
    title = '',
    description = '',
    body = '',
    footer = '',
    closable = true,
    showHandle = false, // for bottom sheet
    dark = false,
    confirm = false,
    confirmIcon = null, // warning, danger, success, info
    stickyFooter = false,
    className = '',
  } = options;

  const modalClasses = ['modal', `modal--${type}`];
  if (size !== 'md') modalClasses.push(`modal--${size}`);
  if (dark) modalClasses.push('modal--dark');
  if (confirm) modalClasses.push('modal--confirm');
  if (stickyFooter) modalClasses.push('modal--sticky-footer');
  if (className) modalClasses.push(className);

  // Handle (for bottom sheet)
  const handleHtml = showHandle || type === 'bottom' ? '<div class="modal-handle"></div>' : '';

  // Header
  let headerHtml = '';
  if (title || closable) {
    const closeBtn = closable ? `<button type="button" class="modal-close" data-modal-close>${icons.close}</button>` : '';

    if (confirm && confirmIcon) {
      const iconClass = `modal-icon modal-icon--${confirmIcon}`;
      headerHtml = `
        <div class="modal-header">
          <div class="modal-header-content">
            <div class="${iconClass}">${icons[confirmIcon] || icons.info}</div>
            ${title ? `<h2 class="modal-title">${title}</h2>` : ''}
            ${description ? `<p class="modal-description">${description}</p>` : ''}
          </div>
          ${closeBtn}
        </div>
      `;
    } else {
      headerHtml = `
        <div class="modal-header">
          <div class="modal-header-content">
            ${title ? `<h2 class="modal-title">${title}</h2>` : ''}
            ${description ? `<p class="modal-description">${description}</p>` : ''}
          </div>
          ${closeBtn}
        </div>
      `;
    }
  }

  // Body
  const bodyHtml = body ? `<div class="modal-body">${body}</div>` : '';

  // Footer
  const footerHtml = footer ? `<div class="modal-footer">${footer}</div>` : '';

  return `
    <div class="modal-backdrop" data-modal-backdrop="${id}"></div>
    <div class="${modalClasses.join(' ')}" data-modal="${id}" role="dialog" aria-modal="true" ${title ? `aria-labelledby="${id}-title"` : ''}>
      ${handleHtml}
      ${headerHtml}
      ${bodyHtml}
      ${footerHtml}
    </div>
  `;
}

/**
 * Cria um modal de confirmação
 */
export function createConfirm(options = {}) {
  const {
    title = 'Confirmar ação',
    description = 'Tem certeza que deseja continuar?',
    confirmText = 'Sim, Confirmar',
    cancelText = 'Voltar',
    confirmVariant = 'primary', // primary, danger
    icon = 'warning',
    onConfirm = null,
    onCancel = null,
    ...rest
  } = options;

  const footer = `
    <button type="button" class="btn btn--outline" data-modal-close>${cancelText}</button>
    <button type="button" class="btn btn--${confirmVariant}" data-modal-confirm>${confirmText}</button>
  `;

  return create({
    ...rest,
    title,
    description,
    confirm: true,
    confirmIcon: icon,
    footer,
    size: 'sm',
  });
}

/**
 * Cria um bottom sheet
 */
export function createBottomSheet(options = {}) {
  return create({
    ...options,
    type: 'bottom',
    showHandle: true,
  });
}

/**
 * Cria um slot placeholder
 */
export function createSlot(options = {}) {
  const { text = 'Substitua por Componente', icon = icons.slot } = options;

  return `
    <div class="modal-slot">
      <div class="modal-slot-icon">${icon}</div>
      <span class="modal-slot-text">${text}</span>
    </div>
  `;
}

/**
 * Abre um modal
 */
export function open(modalId) {
  const modal = document.querySelector(`[data-modal="${modalId}"]`);
  const backdrop = document.querySelector(`[data-modal-backdrop="${modalId}"]`);

  if (!modal || !backdrop) return;

  // Prevent body scroll
  document.body.style.overflow = 'hidden';

  // Show backdrop and modal
  backdrop.classList.add('is-visible');
  modal.classList.add('is-visible');

  // Track active modal
  activeModals.push(modalId);

  // Focus first focusable element
  setTimeout(() => {
    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }, 100);

  // Trigger event
  modal.dispatchEvent(new CustomEvent('modal:open', { detail: { modalId } }));
}

/**
 * Fecha um modal
 */
export function close(modalId) {
  const modal = document.querySelector(`[data-modal="${modalId}"]`);
  const backdrop = document.querySelector(`[data-modal-backdrop="${modalId}"]`);

  if (!modal || !backdrop) return;

  // Hide modal and backdrop
  modal.classList.remove('is-visible');
  backdrop.classList.remove('is-visible');

  // Remove from active modals
  activeModals = activeModals.filter(id => id !== modalId);

  // Restore body scroll if no more modals
  if (activeModals.length === 0) {
    document.body.style.overflow = '';
  }

  // Trigger event
  modal.dispatchEvent(new CustomEvent('modal:close', { detail: { modalId } }));
}

/**
 * Fecha todos os modais
 */
export function closeAll() {
  activeModals.forEach(id => close(id));
}

/**
 * Limpa a stack de modais ativos sem tentar fechar elementos do DOM.
 * Deve ser chamado pelo router antes de renderizar uma nova rota,
 * para evitar que IDs de modais de rotas anteriores bloqueiem o Escape.
 */
export function resetModalStack() {
  activeModals.length = 0;
}

/**
 * Inicializa modais
 */
export function init(container = document, callbacks = {}) {
  const { onConfirm, onCancel, onClose } = callbacks;

  const handleClick = (e) => {
    // Close button clicks
    const closeBtn = e.target.closest('[data-modal-close]');
    if (closeBtn) {
      const modal = closeBtn.closest('[data-modal]');
      if (modal) {
        close(modal.dataset.modal);
        if (onCancel) onCancel(modal.dataset.modal);
      }
    }

    // Confirm button clicks
    const confirmBtn = e.target.closest('[data-modal-confirm]');
    if (confirmBtn) {
      const modal = confirmBtn.closest('[data-modal]');
      if (modal) {
        if (onConfirm) onConfirm(modal.dataset.modal);
        close(modal.dataset.modal);
      }
    }

    // Backdrop clicks
    const backdrop = e.target.closest('[data-modal-backdrop]');
    if (backdrop && e.target === backdrop) {
      const modalId = backdrop.dataset.modalBackdrop;
      close(modalId);
      if (onClose) onClose(modalId);
    }

    // Open modal triggers
    const openTrigger = e.target.closest('[data-modal-open]');
    if (openTrigger) {
      open(openTrigger.dataset.modalOpen);
    }
  };

  // Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && activeModals.length > 0) {
      const lastModalId = activeModals[activeModals.length - 1];
      close(lastModalId);
      if (onClose) onClose(lastModalId);
    }
  };

  container.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeyDown);

  return () => {
    container.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', handleKeyDown);
  };
}

export default {
  create,
  createConfirm,
  createBottomSheet,
  createSlot,
  open,
  close,
  closeAll,
  resetModalStack,
  init,
  icons
};
