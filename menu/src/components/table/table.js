import './table.css';

/**
 * Table / Data Display Component
 */

const icons = {
  search: `<svg viewBox="0 0 24 24" fill="none"><path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  sortAsc: `<svg viewBox="0 0 10 6" fill="none"><path d="M1 5L5 1L9 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  sortDesc: `<svg viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronRight: `<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>`,
  starEmpty: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/**
 * Cria tabela completa
 */
export function create(options = {}) {
  const {
    id = `table-${Date.now()}`,
    title = '',
    subtitle = '',
    columns = [],
    data = [],
    selectable = false,
    sortable = true,
    searchable = true,
    pagination = true,
    pageSize = 10,
    currentPage = 1,
    totalItems = 0,
    variant = 'default', // default, striped, bordered, compact
    dark = false,
    className = '',
  } = options;

  const containerClasses = ['table-container'];
  if (dark) containerClasses.push('table-container--dark');
  if (className) containerClasses.push(className);

  const tableClasses = ['table'];
  if (variant !== 'default') tableClasses.push(`table--${variant}`);

  // Toolbar
  const toolbarHtml = (title || searchable) ? `
    <div class="table-toolbar">
      <div class="table-toolbar-left">
        ${title ? `
          <div>
            <h3 class="table-title">${title}</h3>
            ${subtitle ? `<p class="table-subtitle">${subtitle}</p>` : ''}
          </div>
        ` : ''}
      </div>
      <div class="table-toolbar-right">
        ${searchable ? `
          <div class="table-search">
            <span class="table-search-icon">${icons.search}</span>
            <input type="text" class="table-search-input" placeholder="Pesquisar" data-table-search />
          </div>
        ` : ''}
      </div>
    </div>
  ` : '';

  // Header
  const headerHtml = `
    <thead>
      <tr>
        ${selectable ? '<th class="table-checkbox"><input type="checkbox" data-table-select-all /></th>' : ''}
        ${columns.map(col => {
          const isSortable = sortable && col.sortable !== false;
          const sortIcons = isSortable ? `
            <span class="table-sort">
              <span class="table-sort-asc">${icons.sortAsc}</span>
              <span class="table-sort-desc">${icons.sortDesc}</span>
            </span>
          ` : '';
          return `
            <th
              ${isSortable ? 'class="is-sortable"' : ''}
              data-column="${col.key}"
              ${col.width ? `style="width: ${col.width}"` : ''}
            >
              ${col.label}${sortIcons}
            </th>
          `;
        }).join('')}
      </tr>
    </thead>
  `;

  // Body
  const bodyHtml = `
    <tbody>
      ${data.map((row, rowIndex) => `
        <tr data-row="${rowIndex}">
          ${selectable ? `<td class="table-checkbox"><input type="checkbox" data-table-select="${rowIndex}" /></td>` : ''}
          ${columns.map(col => `
            <td>${renderCell(row[col.key], col, row)}</td>
          `).join('')}
        </tr>
      `).join('')}
    </tbody>
  `;

  // Footer/Pagination
  const total = totalItems || data.length;
  const totalPages = Math.ceil(total / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  const footerHtml = pagination ? `
    <div class="table-footer">
      <div class="table-info">
        Mostrando ${startItem} a ${endItem} de ${total} resultados
      </div>
      <div class="table-pagination">
        <button class="table-pagination-btn" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}>
          ${icons.chevronLeft}
        </button>
        ${generatePageButtons(currentPage, totalPages)}
        <button class="table-pagination-btn" data-page="next" ${currentPage === totalPages ? 'disabled' : ''}>
          ${icons.chevronRight}
        </button>
      </div>
    </div>
  ` : '';

  return `
    <div class="${containerClasses.join(' ')}" data-table id="${id}">
      ${toolbarHtml}
      <div class="table-wrapper">
        <table class="${tableClasses.join(' ')}">
          ${headerHtml}
          ${bodyHtml}
        </table>
      </div>
      ${footerHtml}
    </div>
  `;
}

/**
 * Renderiza célula baseado no tipo
 */
function renderCell(value, column, row) {
  const type = column.type || 'text';

  switch (type) {
    case 'user':
      return `
        <div class="table-cell-user">
          ${row.avatar ? `<img src="${row.avatar}" alt="" class="table-cell-avatar" />` : ''}
          <div class="table-cell-user-info">
            <span class="table-cell-user-name">${value}</span>
            ${row.email ? `<span class="table-cell-user-email">${row.email}</span>` : ''}
          </div>
        </div>
      `;

    case 'status':
      const statusClass = getStatusClass(value);
      return `<span class="table-cell-status table-cell-status--${statusClass}">${value}</span>`;

    case 'rating':
      return renderRating(value);

    case 'link':
      return `<a href="${row.href || '#'}" class="table-cell-link">${value}</a>`;

    case 'badge':
      return `<span class="table-cell-status table-cell-status--neutral">${value}</span>`;

    case 'actions':
      return `<div class="table-cell-actions">${value}</div>`;

    default:
      return value ?? '-';
  }
}

/**
 * Obtém classe de status
 */
function getStatusClass(status) {
  const statusMap = {
    'ativo': 'success',
    'active': 'success',
    'online': 'success',
    'aprovado': 'success',
    'pendente': 'warning',
    'pending': 'warning',
    'aguardando': 'warning',
    'inativo': 'danger',
    'inactive': 'danger',
    'cancelado': 'danger',
    'rejected': 'danger',
    'offline': 'danger',
  };
  return statusMap[status?.toLowerCase()] || 'neutral';
}

/**
 * Renderiza rating com estrelas
 */
function renderRating(value) {
  const rating = parseInt(value) || 0;
  const max = 5;
  let html = '<div class="table-cell-rating">';
  for (let i = 1; i <= max; i++) {
    html += i <= rating ? icons.star : `<span class="is-empty">${icons.starEmpty}</span>`;
  }
  html += '</div>';
  return html;
}

/**
 * Gera botões de paginação
 */
function generatePageButtons(current, total) {
  if (total <= 1) return '';

  const pages = [];
  const maxVisible = 5;

  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (current > 3) pages.push('...');

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) pages.push('...');
    pages.push(total);
  }

  return pages.map(page => {
    if (page === '...') {
      return '<span class="table-pagination-btn" style="cursor: default; border: none;">...</span>';
    }
    return `
      <button class="table-pagination-btn ${page === current ? 'is-active' : ''}" data-page="${page}">
        ${page}
      </button>
    `;
  }).join('');
}

/**
 * Cria tabela simples (sem toolbar)
 */
export function createSimple(options = {}) {
  return create({
    ...options,
    searchable: false,
    title: '',
  });
}

/**
 * Inicializa tabela
 */
export function init(container = document, callbacks = {}) {
  const { onSort, onSearch, onPageChange, onSelect, onSelectAll } = callbacks;

  // Sorting
  container.addEventListener('click', (e) => {
    const th = e.target.closest('th.is-sortable');
    if (th) {
      const table = th.closest('[data-table]');
      const column = th.dataset.column;

      // Toggle sort direction
      const wasAsc = th.classList.contains('is-sorted-asc');
      const wasDesc = th.classList.contains('is-sorted-desc');

      // Remove sort from all columns
      table.querySelectorAll('th').forEach(t => {
        t.classList.remove('is-sorted-asc', 'is-sorted-desc');
      });

      let direction = 'asc';
      if (wasAsc) {
        th.classList.add('is-sorted-desc');
        direction = 'desc';
      } else if (wasDesc) {
        // Reset to no sort
        direction = null;
      } else {
        th.classList.add('is-sorted-asc');
      }

      if (onSort) {
        onSort({ column, direction, element: table });
      }
    }

    // Pagination
    const pageBtn = e.target.closest('[data-page]');
    if (pageBtn && !pageBtn.disabled) {
      const table = pageBtn.closest('[data-table]');
      const page = pageBtn.dataset.page;

      if (onPageChange) {
        onPageChange({ page, element: table });
      }
    }
  });

  // Search
  container.addEventListener('input', (e) => {
    if (e.target.matches('[data-table-search]')) {
      const table = e.target.closest('[data-table]');
      const query = e.target.value;

      if (onSearch) {
        onSearch({ query, element: table });
      }
    }
  });

  // Select all
  container.addEventListener('change', (e) => {
    if (e.target.matches('[data-table-select-all]')) {
      const table = e.target.closest('[data-table]');
      const checked = e.target.checked;

      table.querySelectorAll('[data-table-select]').forEach(cb => {
        cb.checked = checked;
        const row = cb.closest('tr');
        row.classList.toggle('is-selected', checked);
      });

      if (onSelectAll) {
        onSelectAll({ checked, element: table });
      }
    }

    // Single select
    if (e.target.matches('[data-table-select]')) {
      const table = e.target.closest('[data-table]');
      const row = e.target.closest('tr');
      const rowIndex = e.target.dataset.tableSelect;
      const checked = e.target.checked;

      row.classList.toggle('is-selected', checked);

      // Update select all checkbox
      const allCheckboxes = table.querySelectorAll('[data-table-select]');
      const checkedCount = table.querySelectorAll('[data-table-select]:checked').length;
      const selectAll = table.querySelector('[data-table-select-all]');

      if (selectAll) {
        selectAll.checked = checkedCount === allCheckboxes.length;
        selectAll.indeterminate = checkedCount > 0 && checkedCount < allCheckboxes.length;
      }

      if (onSelect) {
        onSelect({ rowIndex, checked, element: table });
      }
    }
  });
}

/**
 * Obtém linhas selecionadas
 */
export function getSelectedRows(tableElement) {
  const selected = [];
  tableElement.querySelectorAll('[data-table-select]:checked').forEach(cb => {
    selected.push(parseInt(cb.dataset.tableSelect));
  });
  return selected;
}

/**
 * Limpa seleção
 */
export function clearSelection(tableElement) {
  tableElement.querySelectorAll('[data-table-select]').forEach(cb => {
    cb.checked = false;
    cb.closest('tr').classList.remove('is-selected');
  });

  const selectAll = tableElement.querySelector('[data-table-select-all]');
  if (selectAll) {
    selectAll.checked = false;
    selectAll.indeterminate = false;
  }
}

export default {
  create,
  createSimple,
  init,
  getSelectedRows,
  clearSelection,
  icons,
};
