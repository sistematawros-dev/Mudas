import SideNav from '../../components/sidenav/sidenav.js';

export function init() {
  // Item states
  document.getElementById('item-default').innerHTML = SideNav.createItem({
    label: 'Title',
  });

  document.getElementById('item-hover').innerHTML = SideNav.createItem({
    label: 'Title (Hover)',
  });

  document.getElementById('item-active').innerHTML = SideNav.createItem({
    label: 'Title',
    active: true,
  });

  document.getElementById('item-disabled').innerHTML = SideNav.createItem({
    label: 'Title',
    disabled: true,
  });

  document.getElementById('item-expandable').innerHTML = SideNav.createItem({
    label: 'Title',
    hasSubmenu: true,
  });

  // Simple menu
  document.getElementById('menu-simple').innerHTML = SideNav.createMenu({
    items: [
      { id: 'title1', label: 'Title' },
      { id: 'title2', label: 'Title' },
      { id: 'title3', label: 'Title', disabled: true },
      { id: 'title4', label: 'Title' },
      { id: 'title5', label: 'Title' },
      { id: 'title6', label: 'Title' },
      { id: 'title7', label: 'Title' },
      { id: 'title8', label: 'Title' },
    ],
    activeItem: 'title2',
  });

  // With submenus
  document.getElementById('sidenav-submenus').innerHTML = SideNav.create({
    title: 'Fontes and Acessórios',
    items: [
      { id: 'main', label: 'Main' },
      {
        id: 'moveis',
        label: 'Móveis',
        expanded: true,
        items: [
          { id: 'title1', label: 'Title' },
          { id: 'books', label: 'Books', items: [
            { id: 'level3-1', label: 'level 3 (Icon null)' },
            { id: 'level3-2', label: 'level 3 (Icon null)' },
          ]},
        ],
      },
      { id: 'title2', label: 'Title' },
      { id: 'title3', label: 'Title' },
      { id: 'title4', label: 'Title' },
    ],
    activeItem: 'level3-1',
  });

  // Full navigation
  document.getElementById('sidenav-full').innerHTML = SideNav.create({
    title: 'Fontes and Acessórios',
    items: [
      {
        type: 'section',
        title: 'Descobrir',
        items: [
          { id: 'main', label: 'Main', badge: '3' },
          {
            id: 'moveis',
            label: 'Móveis',
            expanded: true,
            items: [
              { id: 'sofas', label: 'Sofás' },
              { id: 'mesas', label: 'Mesas' },
              { id: 'cadeiras', label: 'Cadeiras' },
            ],
          },
        ],
      },
      { type: 'divider' },
      {
        type: 'section',
        title: 'Categorias',
        items: [
          {
            id: 'eletronicos',
            label: 'Eletrônicos',
            items: [
              { id: 'phones', label: 'Smartphones' },
              { id: 'tablets', label: 'Tablets' },
              { id: 'laptops', label: 'Laptops', items: [
                { id: 'gaming', label: 'Gaming' },
                { id: 'work', label: 'Trabalho' },
              ]},
            ],
          },
          { id: 'roupas', label: 'Roupas' },
          { id: 'livros', label: 'Livros' },
        ],
      },
    ],
    activeItem: 'sofas',
  });

  // Dark mode navigation
  document.getElementById('sidenav-dark').innerHTML = SideNav.create({
    title: 'Fontes and Acessórios',
    dark: true,
    items: [
      {
        type: 'section',
        title: 'Descobrir',
        items: [
          { id: 'main-d', label: 'Main' },
          {
            id: 'moveis-d',
            label: 'Móveis',
            expanded: true,
            items: [
              { id: 'sofas-d', label: 'Sofás' },
              { id: 'mesas-d', label: 'Mesas' },
            ],
          },
        ],
      },
      { type: 'divider' },
      {
        type: 'section',
        title: 'Categorias',
        items: [
          {
            id: 'eletronicos-d',
            label: 'Eletrônicos',
            items: [
              { id: 'phones-d', label: 'Smartphones' },
              { id: 'tablets-d', label: 'Tablets' },
              { id: 'laptops-d', label: 'Laptops', items: [
                { id: 'gaming-d', label: 'Gaming' },
                { id: 'work-d', label: 'Trabalho' },
              ]},
            ],
          },
          { id: 'roupas-d', label: 'Roupas' },
          { id: 'livros-d', label: 'Livros' },
        ],
      },
    ],
    activeItem: 'sofas-d',
  });

  // Dark item states
  document.getElementById('item-dark-default').innerHTML = SideNav.createItem({
    label: 'Title',
    dark: true,
  });

  document.getElementById('item-dark-active').innerHTML = SideNav.createItem({
    label: 'Title',
    active: true,
    dark: true,
  });

  document.getElementById('item-dark-disabled').innerHTML = SideNav.createItem({
    label: 'Title',
    disabled: true,
    dark: true,
  });

  // Initialize interactions
  SideNav.init(document, (data) => {
    console.log('SideNav item clicked:', data);
  });
}
