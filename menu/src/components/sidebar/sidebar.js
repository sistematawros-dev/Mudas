import html from './sidebar.html?raw';
import './sidebar.css';

export function render(container) {
  container.innerHTML = html;
}

export function init() {
  setupToggleHandlers();
  setupSearchHandler();
  const cleanupToggle = setupSidebarToggle();
  const cleanupIntegrity = setupSidebarIntegrityLock();
  updateActiveLink();
  window.addEventListener('hashchange', updateActiveLink);

  return () => {
    window.removeEventListener('hashchange', updateActiveLink);
    if (typeof cleanupToggle === 'function') cleanupToggle();
    if (typeof cleanupIntegrity === 'function') cleanupIntegrity();
  };
}

/**
 * Setup sidebar collapse/expand functionality with localStorage persistence
 */
function setupSidebarToggle() {
  const sidebar = document.querySelector('.sidebar');
  const appShell = document.querySelector('.app-shell');
  const STORAGE_KEY = 'tawros-sidebar-collapsed';

  if (!sidebar) return;

  // Load saved state from localStorage
  const isCollapsed = localStorage.getItem(STORAGE_KEY) === 'true';

  if (isCollapsed) {
    sidebar.classList.add('sidebar--collapsed');
    if (appShell) appShell.classList.add('app-shell--sidebar-collapsed');
  } else {
    sidebar.classList.remove('sidebar--collapsed');
    if (appShell) appShell.classList.remove('app-shell--sidebar-collapsed');
  }

  // Use event delegation to handle menu toggle button click
  // This works even if the header is rendered after the sidebar
  const handleMenuToggle = (e) => {
    const menuToggleBtn = e.target.closest('.header-menu-toggle');
    if (menuToggleBtn) {
      const willBeCollapsed = !sidebar.classList.contains('sidebar--collapsed');

      // Toggle the classes
      sidebar.classList.toggle('sidebar--collapsed');
      if (appShell) appShell.classList.toggle('app-shell--sidebar-collapsed');

      // Save state to localStorage
      localStorage.setItem(STORAGE_KEY, willBeCollapsed);
    }
  };
  document.addEventListener('click', handleMenuToggle);
  return () => document.removeEventListener('click', handleMenuToggle);
}

/**
 * Toggle sidebar programmatically
 */
export function toggleSidebar() {
  const STORAGE_KEY = 'tawros-sidebar-collapsed';
  const sidebar = document.querySelector('.sidebar');
  const appShell = document.querySelector('.app-shell');

  if (sidebar) {
    const willBeCollapsed = !sidebar.classList.contains('sidebar--collapsed');
    sidebar.classList.toggle('sidebar--collapsed');
    if (appShell) appShell.classList.toggle('app-shell--sidebar-collapsed');

    // Save state to localStorage
    localStorage.setItem(STORAGE_KEY, willBeCollapsed);
  }
}

/**
 * Setup click handlers for expand/collapse functionality
 */
function setupToggleHandlers() {
  const toggleButtons = document.querySelectorAll('[data-toggle]');

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const parentItem = button.closest('.sidebar-item');
      if (!parentItem) return;
      const isExpanded = parentItem.classList.contains('sidebar-item--expanded');

      // Toggle the expanded state
      parentItem.classList.toggle('sidebar-item--expanded');

      // Update ARIA attribute for accessibility
      button.setAttribute('aria-expanded', !isExpanded);
    });
  });
}

/**
 * Setup search functionality to filter menu items
 */
function setupSearchHandler() {
  const searchInput = document.querySelector('.sidebar-search-input');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const menuItems = document.querySelectorAll('.sidebar-item');

    if (!searchTerm) {
      // Reset: show all items and collapse all
      menuItems.forEach(item => {
        item.style.display = '';
        item.classList.remove('sidebar-item--expanded');
      });
      return;
    }

    menuItems.forEach(item => {
      const link = item.querySelector('.sidebar-link');
      const text = link?.querySelector('.sidebar-text')?.textContent.toLowerCase() || '';
      const matches = text.includes(searchTerm);

      if (matches) {
        // Show matching item
        item.style.display = '';

        // Expand all parent menus to make this item visible
        let parent = item.closest('.sidebar-submenu');
        while (parent) {
          const parentItem = parent.closest('.sidebar-item');
          if (parentItem) {
            parentItem.classList.add('sidebar-item--expanded');
            parentItem.style.display = '';
          }
          parent = parentItem?.parentElement.closest('.sidebar-submenu');
        }
      } else {
        // Hide non-matching items (but parent items might be shown if children match)
        const hasVisibleChildren = item.querySelector('.sidebar-submenu .sidebar-item[style=""]');
        if (!hasVisibleChildren) {
          item.style.display = 'none';
        }
      }
    });
  });
}

/**
 * Update active link based on current route
 * Uses prefix matching: /cadastros/pessoas keeps "Cadastros" active
 */
function updateActiveLink() {
  const links = document.querySelectorAll('.sidebar-link[data-route]');
  const currentHash = window.location.hash || '#/dashboard';
  const currentPath = currentHash.replace('#', '');

  // Remove all active states first
  links.forEach(link => link.classList.remove('active'));

  // Find the best matching link (longest matching prefix)
  let bestMatch = null;
  let bestMatchLength = 0;

  links.forEach(link => {
    const route = link.getAttribute('data-route');

    if (!route) return;

    // Check if current path starts with this route
    if (currentPath === route || currentPath.startsWith(route + '/')) {
      const matchLength = route.length;
      if (matchLength > bestMatchLength) {
        bestMatch = link;
        bestMatchLength = matchLength;
      }
    }
  });

  // Apply active state to best match
  if (bestMatch) {
    bestMatch.classList.add('active');

    // Auto-expand parent menus
    let parent = bestMatch.closest('.sidebar-submenu');
    while (parent) {
      const parentItem = parent.closest('.sidebar-item');
      if (parentItem) {
        parentItem.classList.add('sidebar-item--expanded');

        const toggleButton = parentItem.querySelector('[data-toggle]');
        if (toggleButton) {
          toggleButton.setAttribute('aria-expanded', 'true');
        }
      }
      parent = parentItem?.parentElement.closest('.sidebar-submenu');
    }
  }
}

/**
 * Locks sidebar visual structure against runtime tampering.
 * Allows changes inside ".sidebar-menu" so new menu fields can be added.
 */
function setupSidebarIntegrityLock() {
  const sidebar = document.querySelector('.sidebar');
  const appShell = document.querySelector('.app-shell');
  if (!sidebar) return () => {};

  const sidebarBaseClasses = new Set(
    Array.from(sidebar.classList).filter((cls) => cls !== 'sidebar--collapsed')
  );
  const sidebarBaseStyle = sidebar.getAttribute('style') || '';

  const appShellBaseClasses = new Set(
    Array.from(appShell?.classList || []).filter((cls) => cls !== 'app-shell--sidebar-collapsed')
  );
  const appShellBaseStyle = appShell?.getAttribute('style') || '';

  const lockedSections = [
    '.sidebar-header',
    '.sidebar-search',
    '.sidebar-footer',
    '.sidebar-user',
  ];

  const sectionSnapshots = new Map();
  lockedSections.forEach((selector) => {
    const el = sidebar.querySelector(selector);
    if (!el) return;
    sectionSnapshots.set(selector, {
      className: el.className,
      style: el.getAttribute('style') || '',
    });
  });

  const isInsideMenu = (node) => {
    if (!(node instanceof Element)) return false;
    return Boolean(node.closest('.sidebar-menu'));
  };

  const restoreSidebarRoot = () => {
    const isCollapsed = sidebar.classList.contains('sidebar--collapsed');
    const nextClasses = [...sidebarBaseClasses];
    if (isCollapsed) nextClasses.push('sidebar--collapsed');

    const nextClassName = nextClasses.join(' ');
    if (sidebar.className !== nextClassName) {
      sidebar.className = nextClassName;
    }

    const currentStyle = sidebar.getAttribute('style') || '';
    if (currentStyle !== sidebarBaseStyle) {
      if (sidebarBaseStyle) sidebar.setAttribute('style', sidebarBaseStyle);
      else sidebar.removeAttribute('style');
    }
  };

  const restoreAppShellRoot = () => {
    if (!appShell) return;
    const isCollapsed = appShell.classList.contains('app-shell--sidebar-collapsed');
    const nextClasses = [...appShellBaseClasses];
    if (isCollapsed) nextClasses.push('app-shell--sidebar-collapsed');

    const nextClassName = nextClasses.join(' ');
    if (appShell.className !== nextClassName) {
      appShell.className = nextClassName;
    }

    const currentStyle = appShell.getAttribute('style') || '';
    if (currentStyle !== appShellBaseStyle) {
      if (appShellBaseStyle) appShell.setAttribute('style', appShellBaseStyle);
      else appShell.removeAttribute('style');
    }
  };

  const restoreSection = (target) => {
    if (!(target instanceof Element)) return;
    for (const [selector, snap] of sectionSnapshots.entries()) {
      const section = target.matches(selector) ? target : target.closest(selector);
      if (!section) continue;
      if (isInsideMenu(section)) continue;

      if (section.className !== snap.className) {
        section.className = snap.className;
      }
      const currentStyle = section.getAttribute('style') || '';
      if (currentStyle !== snap.style) {
        if (snap.style) section.setAttribute('style', snap.style);
        else section.removeAttribute('style');
      }
    }
  };

  let isApplying = false;
  const observer = new MutationObserver((mutations) => {
    if (isApplying) return;
    isApplying = true;

    try {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const target = mutation.target;
          if (target === sidebar) {
            restoreSidebarRoot();
            return;
          }
          if (target === appShell) {
            restoreAppShellRoot();
            return;
          }
          if (!isInsideMenu(target)) {
            restoreSection(target);
          }
          return;
        }

        if (mutation.type === 'childList') {
          const target = mutation.target;
          if (!isInsideMenu(target)) {
            restoreSidebarRoot();
            restoreAppShellRoot();
          }
        }
      });
    } finally {
      isApplying = false;
    }
  });

  observer.observe(sidebar, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['class', 'style'],
  });

  if (appShell) {
    observer.observe(appShell, {
      subtree: false,
      childList: false,
      attributes: true,
      attributeFilter: ['class', 'style'],
    });
  }

  return () => observer.disconnect();
}
