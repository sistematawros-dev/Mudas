import Navbar from '../../components/navbar/navbar.js';

export function init() {
  // Desktop navbar
  document.getElementById('navbar-desktop').innerHTML = Navbar.createTopNav({
    logo: 'TAWROS',
    links: [
      { id: 'home', label: 'Label', href: '#' },
      { id: 'products', label: 'Label', href: '#', items: [] },
      { id: 'services', label: 'Label', href: '#', items: [] },
      { id: 'about', label: 'Label', href: '#' },
    ],
    activeLink: 'home',
    showSearch: true,
    showLogin: true,
    loginText: 'Login',
  });

  // Tablet navbar
  document.getElementById('navbar-tablet').innerHTML = Navbar.createTabletNav({
    logo: 'TAWROS',
    showSearch: true,
    showLogin: true,
    loginText: 'Login',
  });

  // Mobile navbar
  document.getElementById('navbar-mobile').innerHTML = Navbar.createMobileNav({
    showSearch: true,
    showAvatar: true,
  });

  // App bar
  document.getElementById('appbar-default').innerHTML = Navbar.createAppBar({
    title: 'Title',
    showBack: true,
    showRightAction: true,
  });

  // Bottom navbar
  document.getElementById('bottomnav-default').innerHTML = Navbar.createBottomNav({
    items: [
      { id: 'home', label: 'Label', icon: Navbar.icons.home },
      { id: 'search', label: 'Label', icon: Navbar.icons.search },
      { id: 'grid', label: 'Label', icon: Navbar.icons.grid },
      { id: 'profile', label: 'Label', icon: Navbar.icons.user },
    ],
    activeItem: 'home',
  });

  // Bottom navbar with badge
  document.getElementById('bottomnav-badge').innerHTML = Navbar.createBottomNav({
    items: [
      { id: 'home2', label: 'Label', icon: Navbar.icons.home },
      { id: 'notifications', label: 'Label', icon: Navbar.icons.bell, badge: '3' },
      { id: 'grid2', label: 'Label', icon: Navbar.icons.grid },
      { id: 'profile2', label: 'Label', icon: Navbar.icons.user },
    ],
    activeItem: 'notifications',
  });

  // Dark mode navbar
  document.getElementById('navbar-dark').innerHTML = Navbar.createTopNav({
    logo: 'TAWROS',
    links: [
      { id: 'home-d', label: 'Label', href: '#' },
      { id: 'products-d', label: 'Label', href: '#' },
      { id: 'services-d', label: 'Label', href: '#' },
    ],
    activeLink: 'home-d',
    showSearch: true,
    showLogin: true,
    loginText: 'Login',
    dark: true,
  });

  // Dark app bar
  document.getElementById('appbar-dark').innerHTML = Navbar.createAppBar({
    title: 'Title',
    showBack: true,
    showRightAction: true,
    dark: true,
  });

  // Dark bottom navbar
  document.getElementById('bottomnav-dark').innerHTML = Navbar.createBottomNav({
    items: [
      { id: 'home-d', label: 'Label', icon: Navbar.icons.home },
      { id: 'search-d', label: 'Label', icon: Navbar.icons.search },
      { id: 'grid-d', label: 'Label', icon: Navbar.icons.grid },
      { id: 'profile-d', label: 'Label', icon: Navbar.icons.user },
    ],
    activeItem: 'home-d',
    dark: true,
  });

  // Initialize interactions
  Navbar.init(document, {
    onToggle: () => console.log('Menu toggled'),
    onSearch: (query) => console.log('Search:', query),
    onBack: () => console.log('Back pressed'),
    onAction: () => console.log('Action pressed'),
    onNavigate: (data) => {
      console.log('Navigate:', data);
      // Update active state
      if (data.element.closest('[data-bottomnav]')) {
        const nav = data.element.closest('[data-bottomnav]');
        nav.querySelectorAll('.bottomnav-item').forEach(item => {
          item.classList.remove('is-active');
        });
        data.element.classList.add('is-active');
      }
    },
  });
}
