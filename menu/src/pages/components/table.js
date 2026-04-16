import Table from '../../components/table/table.js';

export function init() {
  // Sample data
  const users = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'Admin', status: 'Ativo', date: '2024-01-15' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', role: 'Editor', status: 'Ativo', date: '2024-01-14' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', role: 'Viewer', status: 'Pendente', date: '2024-01-13' },
    { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', role: 'Editor', status: 'Inativo', date: '2024-01-12' },
    { id: 5, name: 'Carlos Souza', email: 'carlos@email.com', role: 'Admin', status: 'Ativo', date: '2024-01-11' },
  ];

  const usersWithAvatar = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', avatar: 'https://i.pravatar.cc/150?u=1', role: 'Admin', status: 'Ativo', rating: 5 },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', avatar: 'https://i.pravatar.cc/150?u=2', role: 'Editor', status: 'Ativo', rating: 4 },
    { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', avatar: 'https://i.pravatar.cc/150?u=3', role: 'Viewer', status: 'Pendente', rating: 3 },
    { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', avatar: 'https://i.pravatar.cc/150?u=4', role: 'Editor', status: 'Inativo', rating: 4 },
    { id: 5, name: 'Carlos Souza', email: 'carlos@email.com', avatar: 'https://i.pravatar.cc/150?u=5', role: 'Admin', status: 'Ativo', rating: 5 },
  ];

  // Basic table
  document.getElementById('table-basic').innerHTML = Table.create({
    title: 'Usuários',
    subtitle: 'Lista de todos os usuários do sistema',
    columns: [
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Função' },
      { key: 'status', label: 'Status', type: 'status' },
      { key: 'date', label: 'Data' },
    ],
    data: users,
    pagination: true,
    pageSize: 10,
    currentPage: 1,
    totalItems: users.length,
  });

  // Table with selection
  document.getElementById('table-selection').innerHTML = Table.create({
    title: 'Usuários',
    columns: [
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Função' },
      { key: 'status', label: 'Status', type: 'status' },
    ],
    data: users,
    selectable: true,
    pagination: true,
    pageSize: 10,
    currentPage: 1,
    totalItems: users.length,
  });

  // Table with different cell types
  document.getElementById('table-cells').innerHTML = Table.create({
    title: 'Usuários',
    columns: [
      { key: 'name', label: 'Usuário', type: 'user' },
      { key: 'role', label: 'Função', type: 'badge' },
      { key: 'status', label: 'Status', type: 'status' },
      { key: 'rating', label: 'Avaliação', type: 'rating' },
    ],
    data: usersWithAvatar,
    selectable: true,
    pagination: true,
    pageSize: 10,
    currentPage: 1,
    totalItems: usersWithAvatar.length,
  });

  // Striped variant
  document.getElementById('table-striped').innerHTML = Table.create({
    columns: [
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Função' },
      { key: 'status', label: 'Status', type: 'status' },
    ],
    data: users,
    variant: 'striped',
    searchable: false,
    pagination: false,
  });

  // Compact variant
  document.getElementById('table-compact').innerHTML = Table.create({
    columns: [
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Função' },
      { key: 'status', label: 'Status', type: 'status' },
    ],
    data: users,
    variant: 'compact',
    searchable: false,
    pagination: false,
  });

  // Dark mode
  document.getElementById('table-dark').innerHTML = Table.create({
    title: 'Usuários',
    columns: [
      { key: 'name', label: 'Usuário', type: 'user' },
      { key: 'role', label: 'Função', type: 'badge' },
      { key: 'status', label: 'Status', type: 'status' },
      { key: 'rating', label: 'Avaliação', type: 'rating' },
    ],
    data: usersWithAvatar,
    selectable: true,
    dark: true,
    pagination: true,
    pageSize: 10,
    currentPage: 1,
    totalItems: usersWithAvatar.length,
  });

  // Initialize table interactions
  Table.init(document, {
    onSort: (data) => {
      console.log('Sort:', data);
    },
    onSearch: (data) => {
      console.log('Search:', data);
    },
    onPageChange: (data) => {
      console.log('Page:', data);
    },
    onSelect: (data) => {
      console.log('Select:', data);
    },
    onSelectAll: (data) => {
      console.log('Select All:', data);
    },
  });
}
