import './pagination.css';

/**
 * Pagination Component
 */

const icons = {
  chevronLeft: `<svg viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronRight: `<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronsLeft: `<svg viewBox="0 0 16 16" fill="none"><path d="M7 4L3 8L7 12M13 4L9 8L13 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronsRight: `<svg viewBox="0 0 16 16" fill="none"><path d="M9 4L13 8L9 12M3 4L7 8L3 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Cria paginação completa
 */
export function create(options = {}) {
  const {
    currentPage = 1,
    totalPages = 10,
    totalItems = 100,
    itemsPerPage = 10,
    showEntries = true,
    showInfo = true,
    showFirstLast = false,
    entriesOptions = [10, 20, 50, 100],
    maxVisiblePages = 5,
    size = 'md', // sm, md, lg
    variant = 'default', // default, outlined, compact
    align = 'between', // start, center, end, between
    dark = false,
    className = '',
  } = options;

  const classes = ['pagination', `pagination--${align}`];
  if (size !== 'md') classes.push(`pagination--${size}`);
  if (variant !== 'default') classes.push(`pagination--${variant}`);
  if (dark) classes.push('pagination--dark');
  if (className) classes.push(className);

  // Info section
  let infoHtml = '';
  if (showEntries || showInfo) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const entriesSelect = showEntries ? `
      <div class="pagination-entries">
        <select data-pagination-entries>
          ${entriesOptions.map(n => `<option value="${n}" ${n === itemsPerPage ? 'selected' : ''}>${n} Entries</option>`).join('')}
        </select>
      </div>
    ` : '';

    const infoText = showInfo ? `
      <span class="pagination-text">
        Showing <strong>${startItem}</strong> to <strong>${endItem}</strong> of <strong>${totalItems}</strong> entries
      </span>
    ` : '';

    infoHtml = `<div class="pagination-info">${entriesSelect}${infoText}</div>`;
  }

  // Page list
  const pagesHtml = generatePageList(currentPage, totalPages, maxVisiblePages, showFirstLast);

  return `
    <nav class="${classes.join(' ')}" data-pagination data-current="${currentPage}" data-total="${totalPages}">
      ${infoHtml}
      <ul class="pagination-list">
        ${pagesHtml}
      </ul>
    </nav>
  `;
}

/**
 * Gera lista de páginas
 */
function generatePageList(current, total, maxVisible, showFirstLast) {
  let html = '';

  // First page button
  if (showFirstLast) {
    html += `
      <li class="pagination-item">
        <button class="pagination-btn pagination-btn--nav" data-page="1" ${current === 1 ? 'disabled' : ''}>
          ${icons.chevronsLeft}
        </button>
      </li>
    `;
  }

  // Previous button
  html += `
    <li class="pagination-item">
      <button class="pagination-btn pagination-btn--nav" data-page="${current - 1}" ${current === 1 ? 'disabled' : ''}>
        ${icons.chevronLeft}
      </button>
    </li>
  `;

  // Calculate visible pages
  const pages = getVisiblePages(current, total, maxVisible);

  pages.forEach((page, index) => {
    if (page === '...') {
      html += `<li class="pagination-item"><span class="pagination-ellipsis">...</span></li>`;
    } else {
      const isActive = page === current ? 'is-active' : '';
      html += `
        <li class="pagination-item">
          <button class="pagination-btn ${isActive}" data-page="${page}">${page}</button>
        </li>
      `;
    }
  });

  // Next button
  html += `
    <li class="pagination-item">
      <button class="pagination-btn pagination-btn--nav" data-page="${current + 1}" ${current === total ? 'disabled' : ''}>
        ${icons.chevronRight}
      </button>
    </li>
  `;

  // Last page button
  if (showFirstLast) {
    html += `
      <li class="pagination-item">
        <button class="pagination-btn pagination-btn--nav" data-page="${total}" ${current === total ? 'disabled' : ''}>
          ${icons.chevronsRight}
        </button>
      </li>
    `;
  }

  return html;
}

/**
 * Calcula páginas visíveis
 */
function getVisiblePages(current, total, maxVisible) {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];
  const half = Math.floor(maxVisible / 2);

  let start = Math.max(1, current - half);
  let end = Math.min(total, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  // First page
  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push('...');
  }

  // Middle pages
  for (let i = start; i <= end; i++) {
    if (i !== 1 && i !== total) {
      pages.push(i);
    }
  }

  // Last page
  if (end < total) {
    if (end < total - 1) pages.push('...');
    pages.push(total);
  }

  return pages;
}

/**
 * Cria paginação simples (apenas números)
 */
export function createSimple(options = {}) {
  const { currentPage = 1, totalPages = 10, dark = false, size = 'md' } = options;

  const classes = ['pagination', 'pagination--center'];
  if (size !== 'md') classes.push(`pagination--${size}`);
  if (dark) classes.push('pagination--dark');

  const pagesHtml = generatePageList(currentPage, totalPages, 7, false);

  return `
    <nav class="${classes.join(' ')}" data-pagination data-current="${currentPage}" data-total="${totalPages}">
      <ul class="pagination-list">${pagesHtml}</ul>
    </nav>
  `;
}

/**
 * Cria controle de dots
 */
export function createDots(options = {}) {
  const {
    currentPage = 1,
    totalPages = 5,
    size = 'md', // sm, md, lg
    dark = false,
    className = '',
  } = options;

  const classes = ['pagination-dots'];
  if (size !== 'md') classes.push(`pagination-dots--${size}`);
  if (dark) classes.push('pagination-dots--dark');
  if (className) classes.push(className);

  let dotsHtml = '';
  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === currentPage ? 'is-active' : '';
    dotsHtml += `<button class="pagination-dot ${isActive}" data-page="${i}" aria-label="Página ${i}"></button>`;
  }

  return `<div class="${classes.join(' ')}" data-pagination-dots data-current="${currentPage}">${dotsHtml}</div>`;
}

/**
 * Cria controle prev/next com texto
 */
export function createPrevNext(options = {}) {
  const {
    currentPage = 1,
    totalPages = 10,
    prevText = 'Anterior',
    nextText = 'Próximo',
    dark = false,
  } = options;

  const classes = ['pagination', 'pagination--between'];
  if (dark) classes.push('pagination--dark');

  return `
    <nav class="${classes.join(' ')}" data-pagination data-current="${currentPage}" data-total="${totalPages}">
      <button class="pagination-btn pagination-btn--nav" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>
        ${icons.chevronLeft}
        <span>${prevText}</span>
      </button>
      <span class="pagination-text">Página <strong>${currentPage}</strong> de <strong>${totalPages}</strong></span>
      <button class="pagination-btn pagination-btn--nav" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>
        <span>${nextText}</span>
        ${icons.chevronRight}
      </button>
    </nav>
  `;
}

/**
 * Inicializa paginação
 */
export function init(container = document, onChange = null) {
  // Page button clicks
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-page]');
    if (!btn || btn.disabled) return;

    const pagination = btn.closest('[data-pagination], [data-pagination-dots]');
    if (!pagination) return;

    const page = parseInt(btn.dataset.page);
    const current = parseInt(pagination.dataset.current);
    const total = parseInt(pagination.dataset.total || 999);

    if (page < 1 || page > total || page === current) return;

    if (onChange) {
      onChange({ page, previousPage: current, total });
    }
  });

  // Entries select change
  container.addEventListener('change', (e) => {
    const select = e.target.closest('[data-pagination-entries]');
    if (!select) return;

    const entries = parseInt(select.value);
    if (onChange) {
      onChange({ entriesPerPage: entries });
    }
  });
}

/**
 * Atualiza paginação
 */
export function update(container, options = {}) {
  const { currentPage, totalPages } = options;
  const pagination = container.querySelector('[data-pagination]');

  if (pagination && currentPage !== undefined) {
    pagination.dataset.current = currentPage;
    // Re-render would be needed for full update
  }
}

export default {
  create,
  createSimple,
  createDots,
  createPrevNext,
  init,
  update,
  icons
};
