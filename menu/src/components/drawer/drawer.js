import './drawer.css';

function getFocusableElements(container) {
  if (!container) return [];
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];
  return Array.from(container.querySelectorAll(selectors.join(',')))
    .filter((el) => el.offsetParent !== null);
}

export function create(options = {}) {
  const {
    id = `drawer-${Math.random().toString(36).slice(2, 9)}`,
    title = '',
    content = '',
    footer = '',
    side = 'right',
    width = 420,
  } = options;

  return `
    <div class="drawer-backdrop" data-drawer-backdrop="${id}" aria-hidden="true"></div>
    <aside
      class="drawer drawer--${side}"
      data-drawer="${id}"
      role="dialog"
      aria-modal="true"
      aria-labelledby="${id}-title"
      style="--drawer-width: ${width}px"
    >
      <header class="drawer__header">
        <h2 class="drawer__title" id="${id}-title" tabindex="-1" data-drawer-title>${title}</h2>
        <button type="button" class="drawer__close" data-drawer-close aria-label="Fechar">x</button>
      </header>
      <div class="drawer__body">${content}</div>
      <footer class="drawer__footer">${footer}</footer>
    </aside>
  `;
}

export function init(options = {}) {
  const {
    id,
    root = document,
    onOpen = null,
    onClose = null,
  } = options;

  if (!id) return { open: () => {}, close: () => {}, toggle: () => {}, cleanup: () => {} };

  const drawer = root.querySelector(`[data-drawer="${id}"]`);
  const backdrop = root.querySelector(`[data-drawer-backdrop="${id}"]`);
  if (!drawer || !backdrop) {
    return { open: () => {}, close: () => {}, toggle: () => {}, cleanup: () => {} };
  }

  const closeButtons = drawer.querySelectorAll('[data-drawer-close]');
  let isOpen = false;
  let previousBodyOverflow = '';
  let returnFocusElement = null;

  const focusFirst = () => {
    const autoFocus = drawer.querySelector('[data-drawer-autofocus]');
    if (autoFocus && typeof autoFocus.focus === 'function') {
      autoFocus.focus();
      return;
    }
    const focusable = getFocusableElements(drawer);
    if (focusable[0]) {
      focusable[0].focus();
      return;
    }
    const title = drawer.querySelector('[data-drawer-title]');
    if (title && typeof title.focus === 'function') title.focus();
  };

  const lockScroll = () => {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  };

  const unlockScroll = () => {
    document.body.style.overflow = previousBodyOverflow;
  };

  const open = (triggerEl = null) => {
    if (isOpen) return;
    isOpen = true;
    returnFocusElement = triggerEl || document.activeElement;
    backdrop.classList.add('is-open');
    drawer.classList.add('is-open');
    lockScroll();
    focusFirst();
    if (onOpen) onOpen();
  };

  const close = ({ restoreFocus = true } = {}) => {
    if (!isOpen) return;
    isOpen = false;
    backdrop.classList.remove('is-open');
    drawer.classList.remove('is-open');
    unlockScroll();

    if (restoreFocus && returnFocusElement && typeof returnFocusElement.focus === 'function') {
      returnFocusElement.focus();
    }
    if (onClose) onClose();
  };

  const toggle = (triggerEl = null) => {
    if (isOpen) {
      close();
    } else {
      open(triggerEl);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === backdrop) close();
  };

  const handleCloseClick = () => close();

  const handleKeydown = (e) => {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = getFocusableElements(drawer);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  backdrop.addEventListener('click', handleBackdropClick);
  closeButtons.forEach((btn) => btn.addEventListener('click', handleCloseClick));
  document.addEventListener('keydown', handleKeydown);

  const cleanup = () => {
    close({ restoreFocus: false });
    backdrop.removeEventListener('click', handleBackdropClick);
    closeButtons.forEach((btn) => btn.removeEventListener('click', handleCloseClick));
    document.removeEventListener('keydown', handleKeydown);
  };

  return { open, close, toggle, cleanup };
}

export default { create, init };
