import { icons } from './icons-library.js';

let currentFilter = 'all'; // all, outlined, filled
let currentSearch = '';

/**
 * Renders icons for a specific category and style
 */
function renderIcons(category, style) {
  const container = document.querySelector(`[data-icons="${category}-${style}"]`);
  if (!container) return;

  const categoryIcons = icons[category]?.[style];
  if (!categoryIcons) return;

  let html = '';
  Object.entries(categoryIcons).forEach(([name, svg]) => {
    // Check if matches search
    if (currentSearch && !name.toLowerCase().includes(currentSearch.toLowerCase())) {
      return;
    }

    // Check if matches filter
    if (currentFilter !== 'all' && currentFilter !== style) {
      return;
    }

    html += `
      <div class="icon-item" data-icon="${name}" data-style="${style}" data-category="${category}">
        ${svg}
        <span class="icon-item-name">${name}</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

/**
 * Renders all icons for all categories
 */
function renderAllIcons() {
  Object.keys(icons).forEach(category => {
    renderIcons(category, 'outlined');
    renderIcons(category, 'filled');
  });

  // Hide empty categories
  document.querySelectorAll('.icons-category').forEach(categoryEl => {
    const grids = categoryEl.querySelectorAll('.icons-grid');
    const hasIcons = Array.from(grids).some(grid => grid.children.length > 0);

    if (hasIcons) {
      categoryEl.classList.remove('is-hidden');
    } else {
      categoryEl.classList.add('is-hidden');
    }
  });
}

/**
 * Handles tab filtering
 */
function setupTabs() {
  const tabs = document.querySelectorAll('.icons-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active state
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      // Update filter
      currentFilter = tab.dataset.style;

      // Re-render
      renderAllIcons();
    });
  });
}

/**
 * Handles search
 */
function setupSearch() {
  const searchInput = document.getElementById('icon-search');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim();
      renderAllIcons();
    });
  }
}

/**
 * Handles icon click (copy to clipboard)
 */
function setupIconClick() {
  document.addEventListener('click', (e) => {
    const iconItem = e.target.closest('.icon-item');
    if (iconItem) {
      const iconName = iconItem.dataset.icon;

      // Copy to clipboard
      navigator.clipboard.writeText(iconName).then(() => {
        console.log('Icon name copied:', iconName);

        // Visual feedback
        iconItem.style.transform = 'scale(0.95)';
        setTimeout(() => {
          iconItem.style.transform = '';
        }, 100);

        // Could show a toast notification here
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    }
  });
}

/**
 * Initialize the icons page
 */
export function init() {
  // Render all icons
  renderAllIcons();

  // Setup interactions
  setupTabs();
  setupSearch();
  setupIconClick();

  console.log(`Icons loaded: ${Object.keys(icons).length} categories`);
}
