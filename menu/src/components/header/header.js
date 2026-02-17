import html from './header.html?raw';
import './header.css';

export function render(container) {
  container.innerHTML = html;
}

export function init() {
  window.addEventListener('route:change', handleRouteChange);
  const tabsElement = document.getElementById('header-tabs');
  if (tabsElement) tabsElement.addEventListener('click', handleHeaderTabClick);

  return () => {
    window.removeEventListener('route:change', handleRouteChange);
  };
}

function handleRouteChange(event) {
  const { route } = event.detail;
  if (!route) return;

  updatePageTitle(route.pageTitle);
  const breadcrumbItems = route.headerBreadcrumb || route.breadcrumb;
  const tabs = Array.isArray(route.headerTabs) ? route.headerTabs : [];
  const activeTab = route.headerActiveTab || '';

  updateBreadcrumb(breadcrumbItems);
  updateTabs(tabs, activeTab);
  setHeaderVariant(tabs.length > 0, breadcrumbItems && breadcrumbItems.length > 0);
}

function updatePageTitle(pageTitle) {
  const titleElement = document.getElementById('page-title');
  if (titleElement && pageTitle) titleElement.textContent = pageTitle;
}

function updateBreadcrumb(breadcrumbItems) {
  const breadcrumbElement = document.getElementById('breadcrumb');
  if (!breadcrumbElement) return;

  breadcrumbElement.innerHTML = '';
  if (!breadcrumbItems || breadcrumbItems.length === 0) return;

  breadcrumbItems.forEach((item, index) => {
    const isLast = index === breadcrumbItems.length - 1;
    const isFirst = index === 0;

    if (index > 0) {
      const separator = document.createElement('span');
      separator.className = 'header-breadcrumb__separator';
      separator.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      breadcrumbElement.appendChild(separator);
    }

    if (isLast) {
      const span = document.createElement('span');
      span.className = 'header-breadcrumb__item header-breadcrumb__item--current';
      span.innerHTML = `${isFirst ? getHomeIcon() : ''}<span>${item}</span>`;
      breadcrumbElement.appendChild(span);
      return;
    }

    const link = document.createElement('a');
    link.className = 'header-breadcrumb__item';
    link.innerHTML = `${isFirst ? getHomeIcon() : ''}<span>${item}</span>`;
    link.href = getBreadcrumbLink(item);
    breadcrumbElement.appendChild(link);
  });
}

function updateTabs(tabs, activeTab) {
  const tabsElement = document.getElementById('header-tabs');
  if (!tabsElement) return;

  tabsElement.innerHTML = '';

  tabs.forEach((tab) => {
    const item = document.createElement('a');
    item.className = 'header-tab';
    item.href = tab.mode ? '#' : (tab.href || window.location.hash || '#/dashboard');
    if (tab.mode) item.dataset.mode = tab.mode;
    item.textContent = tab.label;

    if (tab.label === activeTab || tab.active) {
      item.classList.add('header-tab--active');
    }

    tabsElement.appendChild(item);
  });
}

function handleHeaderTabClick(event) {
  const tabElement = event.target.closest('.header-tab');
  if (!tabElement) return;

  const mode = tabElement.dataset.mode;
  if (!mode) return;

  event.preventDefault();
  const tabsContainer = tabElement.parentElement;
  if (tabsContainer) {
    tabsContainer.querySelectorAll('.header-tab').forEach((tab) => tab.classList.remove('header-tab--active'));
  }
  tabElement.classList.add('header-tab--active');

  window.dispatchEvent(new CustomEvent('header:tabchange', {
    detail: {
      mode,
      label: tabElement.textContent?.trim() || '',
    },
  }));
}

function setHeaderVariant(isContextual, hasBreadcrumb = false) {
  const headerElement = document.getElementById('app-header');
  const titleElement = document.getElementById('page-title');
  if (!headerElement) return;

  headerElement.classList.toggle('header--contextual', isContextual);
  if (titleElement) titleElement.style.display = hasBreadcrumb ? 'none' : 'block';
}

function getBreadcrumbLink(item) {
  const breadcrumbRoutes = {
    Painel: '#/dashboard',
    Cadastros: '#/cadastros',
    Pedidos: '#/pedidos',
    Estufas: '#/kanban-producao',
    Produção: '#/producao',
    'Kanban de Produção': '#/kanban-producao',
    Componentes: '#/components/accordion',
    Ícones: '#/icons',
  };

  return breadcrumbRoutes[item] || '#/dashboard';
}

function getHomeIcon() {
  return `
    <svg class="header-breadcrumb__home" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 11.5L12 4L21 11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.75 10.75V19H17.25V10.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}
