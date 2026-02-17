import Pagination from '../../components/pagination/pagination.js';

export function init() {
  // Default pagination with entries and info
  document.getElementById('pagination-default').innerHTML = Pagination.create({
    currentPage: 3,
    totalPages: 10,
    totalItems: 97,
    itemsPerPage: 10,
    showEntries: true,
    showInfo: true,
  });

  // Simple pagination (numbers only)
  document.getElementById('pagination-simple').innerHTML = Pagination.createSimple({
    currentPage: 5,
    totalPages: 12,
  });

  // With first/last buttons
  document.getElementById('pagination-first-last').innerHTML = Pagination.create({
    currentPage: 7,
    totalPages: 20,
    totalItems: 200,
    itemsPerPage: 10,
    showFirstLast: true,
  });

  // Outlined variant
  document.getElementById('pagination-outlined').innerHTML = Pagination.create({
    currentPage: 2,
    totalPages: 8,
    totalItems: 75,
    itemsPerPage: 10,
    variant: 'outlined',
  });

  // Compact variant
  document.getElementById('pagination-compact').innerHTML = Pagination.create({
    currentPage: 4,
    totalPages: 15,
    totalItems: 150,
    itemsPerPage: 10,
    variant: 'compact',
    showEntries: false,
  });

  // Prev/Next with text
  document.getElementById('pagination-prev-next').innerHTML = Pagination.createPrevNext({
    currentPage: 3,
    totalPages: 10,
    prevText: 'Anterior',
    nextText: 'Próximo',
  });

  // Dots pagination
  document.getElementById('pagination-dots').innerHTML = Pagination.createDots({
    currentPage: 2,
    totalPages: 5,
  });

  // Sizes
  document.getElementById('pagination-sm').innerHTML = Pagination.createSimple({
    currentPage: 2,
    totalPages: 5,
    size: 'sm',
  });

  document.getElementById('pagination-md').innerHTML = Pagination.createSimple({
    currentPage: 2,
    totalPages: 5,
    size: 'md',
  });

  document.getElementById('pagination-lg').innerHTML = Pagination.createSimple({
    currentPage: 2,
    totalPages: 5,
    size: 'lg',
  });

  // Dark mode
  document.getElementById('pagination-dark').innerHTML = Pagination.create({
    currentPage: 3,
    totalPages: 10,
    totalItems: 97,
    itemsPerPage: 10,
    dark: true,
  });

  document.getElementById('pagination-dots-dark').innerHTML = Pagination.createDots({
    currentPage: 3,
    totalPages: 5,
    dark: true,
  });

  // Alignment examples
  document.getElementById('pagination-start').innerHTML = Pagination.create({
    currentPage: 1,
    totalPages: 5,
    showEntries: false,
    showInfo: false,
    align: 'start',
  });

  document.getElementById('pagination-center').innerHTML = Pagination.create({
    currentPage: 2,
    totalPages: 5,
    showEntries: false,
    showInfo: false,
    align: 'center',
  });

  document.getElementById('pagination-end').innerHTML = Pagination.create({
    currentPage: 3,
    totalPages: 5,
    showEntries: false,
    showInfo: false,
    align: 'end',
  });

  // Initialize pagination interactions
  Pagination.init(document, (data) => {
    console.log('Pagination changed:', data);
    // In a real app, you would re-render the pagination with new page
  });
}
