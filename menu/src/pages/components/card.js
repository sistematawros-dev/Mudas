import card from '../../components/card/card.js';

// Imagens placeholder
const images = {
  placeholder: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
  product1: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  product2: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  product3: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
  landscape: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop',
  avatar: 'https://i.pravatar.cc/150?img=32',
  avatar2: 'https://i.pravatar.cc/150?img=12',
};

// Ícones
const icons = {
  box: `<svg viewBox="0 0 24 24" fill="none"><path d="M21 8V16a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0l-9-5-9 5m18 0l-9 5-9-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 3v18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 9l-5 5-4-4-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  dollar: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M21 21l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
};

export function init() {
  // Card Básico
  document.getElementById('card-basic').innerHTML = card.create({
    title: 'Title',
    size: 'full',
  });

  document.getElementById('card-with-description').innerHTML = card.create({
    title: 'Title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    size: 'full',
  });

  document.getElementById('card-with-link').innerHTML = card.create({
    title: 'Title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link: '#',
    linkText: 'Ver mais',
    size: 'full',
  });

  // Cards com Imagem
  document.getElementById('card-image-1').innerHTML = card.create({
    image: images.placeholder,
    title: 'Title',
    description: 'Lorem ipsum dolor sit amet.',
    size: 'full',
  });

  document.getElementById('card-image-2').innerHTML = card.create({
    image: images.product1,
    imageAspect: 'square',
    title: 'Title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link: '#',
    size: 'full',
  });

  document.getElementById('card-image-3').innerHTML = card.create({
    image: images.product2,
    imageAspect: 'square',
    title: 'Title',
    subtitle: 'Subtitle',
    price: 'R$ 1.234',
    actions: ['<button class="btn btn--primary btn--sm btn--full">Comprar</button>'],
    size: 'full',
  });

  // Cards com Image Tag
  document.getElementById('card-tag-1').innerHTML = card.create({
    image: images.product1,
    imageAspect: 'square',
    title: 'Title',
    subtitle: 'Subtitle',
    tags: [{ label: 'Novo', variant: 'filled', color: 'primary' }],
    price: 'R$ 1.234',
    size: 'full',
  });

  document.getElementById('card-tag-2').innerHTML = card.create({
    image: images.product2,
    imageAspect: 'square',
    title: 'Title',
    subtitle: 'Subtitle',
    tags: [{ label: '-20%', variant: 'filled', color: 'error' }],
    price: 'R$ 1.234',
    priceOld: 'R$ 1.542',
    size: 'full',
  });

  document.getElementById('card-tag-3').innerHTML = card.create({
    image: images.product3,
    imageAspect: 'square',
    title: 'Title',
    subtitle: 'Subtitle',
    tags: [{ label: 'Em estoque', variant: 'filled', color: 'success' }],
    price: 'R$ 1.234',
    actions: ['<button class="btn btn--primary btn--sm btn--full">Comprar</button>'],
    size: 'full',
  });

  // Card com Background Image
  document.getElementById('card-bg-1').innerHTML = card.createImageBg({
    image: images.landscape,
    title: 'Title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    size: 'full',
  });

  document.getElementById('card-bg-2').innerHTML = card.createImageBg({
    image: images.placeholder,
    title: 'Title',
    link: '#',
    linkText: 'Ver mais',
    size: 'full',
  });

  // Cards com Avatar/Icon
  document.getElementById('card-avatar-1').innerHTML = card.create({
    avatar: images.avatar,
    title: 'Team3',
    subtitle: 'empresa@email.com.br',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    size: 'full',
  });

  document.getElementById('card-avatar-2').innerHTML = card.create({
    avatar: images.avatar2,
    title: 'Team3',
    subtitle: 'Desenvolvedor',
    link: '#',
    size: 'full',
  });

  document.getElementById('card-icon-1').innerHTML = card.create({
    icon: icons.box,
    iconVariant: 'primary',
    title: 'Team3',
    subtitle: '8 membros',
    description: 'Lorem ipsum dolor sit amet.',
    size: 'full',
  });

  // Cards de Preço
  document.getElementById('card-price-1').innerHTML = card.create({
    icon: icons.dollar,
    priceLabel: 'Receita',
    price: 'R$ 1.234',
    size: 'full',
  });

  document.getElementById('card-price-2').innerHTML = card.create({
    icon: icons.chart,
    priceLabel: 'Vendas',
    price: 'R$ 1.234',
    size: 'full',
  });

  document.getElementById('card-price-3').innerHTML = card.create({
    icon: icons.dollar,
    priceLabel: 'Receita',
    price: 'R$ 1.234',
    dark: true,
    size: 'full',
  });

  document.getElementById('card-price-4').innerHTML = card.create({
    icon: icons.chart,
    priceLabel: 'Vendas',
    price: 'R$ 1.234',
    dark: true,
    size: 'full',
  });

  // Cards de Estatística
  document.getElementById('card-stat-1').innerHTML = card.createStat({
    statLabel: 'Total de Vendas',
    statValue: 'R$ 45.231',
    statChange: '+12.5%',
    statChangeDirection: 'up',
    size: 'full',
  });

  document.getElementById('card-stat-2').innerHTML = card.createStat({
    statLabel: 'Novos Usuários',
    statValue: '2.350',
    statChange: '+8.2%',
    statChangeDirection: 'up',
    size: 'full',
  });

  document.getElementById('card-stat-3').innerHTML = card.createStat({
    statLabel: 'Taxa de Conversão',
    statValue: '3.24%',
    statChange: '-2.1%',
    statChangeDirection: 'down',
    size: 'full',
  });

  document.getElementById('card-stat-4').innerHTML = card.createStat({
    statLabel: 'Pedidos',
    statValue: '1.247',
    statChange: '+5.7%',
    statChangeDirection: 'up',
    size: 'full',
  });

  // Master Search
  document.getElementById('card-search').innerHTML = card.createSearch({
    icon: icons.search,
    title: 'Title',
    description: 'Lorem ipsum dolor sit amet.',
    actions: ['<button class="btn btn--primary">Pesquisar</button>'],
    size: 'full',
  });

  // Light Mode
  document.getElementById('card-light').innerHTML = card.create({
    avatar: images.avatar,
    title: 'Team3',
    subtitle: 'empresa@email.com.br',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    size: 'full',
  });

  // Dark Mode
  document.getElementById('card-dark').innerHTML = card.create({
    avatar: images.avatar,
    title: 'Team3',
    subtitle: 'empresa@email.com.br',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dark: true,
    size: 'full',
  });

  // Cards Horizontal
  document.getElementById('card-horizontal-1').innerHTML = card.create({
    image: images.product1,
    title: 'Produto Premium',
    description: 'Lorem ipsum dolor sit amet, consectetur.',
    variant: 'horizontal',
  });

  document.getElementById('card-horizontal-2').innerHTML = card.create({
    image: images.product2,
    title: 'Fones de Ouvido',
    description: 'Lorem ipsum dolor sit amet.',
    price: 'R$ 299',
    variant: 'horizontal',
  });

  // Variantes
  document.getElementById('card-elevated').innerHTML = card.create({
    title: 'Elevated',
    description: 'Card com sombra elevada.',
    variant: 'elevated',
    size: 'full',
  });

  document.getElementById('card-outlined').innerHTML = card.create({
    title: 'Outlined',
    description: 'Card com borda e fundo transparente.',
    variant: 'outlined',
    size: 'full',
  });

  document.getElementById('card-flat').innerHTML = card.create({
    title: 'Flat',
    description: 'Card sem borda ou sombra.',
    variant: 'flat',
    size: 'full',
  });

  document.getElementById('card-clickable').innerHTML = card.create({
    title: 'Clickable',
    description: 'Card selecionável ao clicar.',
    clickable: true,
    size: 'full',
  });

  // Inicializa interatividade
  card.init(document, (cardEl, isSelected) => {
    console.log('Card selecionado:', isSelected);
  });
}
