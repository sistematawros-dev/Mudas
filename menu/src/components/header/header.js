import html from './header.html?raw';
import './header.css';

export function render(container) {
  container.innerHTML = html;
}

export function init() {
  window.addEventListener('route:change', handleRouteChange);
  const tabsElement = document.getElementById('header-tabs');
  const cleanupSettingsMenu = setupSettingsMenu();
  const cleanupUserMenu = setupUserMenu();
  const cleanupAdminPasswordModal = setupAdminPasswordModal();
  if (tabsElement) tabsElement.addEventListener('click', handleHeaderTabClick);

  const filialNomeEl = document.getElementById('header-filial-nome');
  if (filialNomeEl) {
    const filialNome = sessionStorage.getItem('filialNome') || '';
    filialNomeEl.textContent = filialNome || 'Filial';
  }

  return () => {
    window.removeEventListener('route:change', handleRouteChange);
    if (typeof cleanupSettingsMenu === 'function') cleanupSettingsMenu();
    if (typeof cleanupUserMenu === 'function') cleanupUserMenu();
    if (typeof cleanupAdminPasswordModal === 'function') cleanupAdminPasswordModal();
    if (tabsElement) tabsElement.removeEventListener('click', handleHeaderTabClick);
  };
}

function setupSettingsMenu() {
  const settingsBtn = document.getElementById('header-settings-btn');
  const settingsMenu = document.getElementById('header-settings-menu');
  if (!settingsBtn || !settingsMenu) return () => { };
  const licencasItem = settingsMenu.querySelector('[data-header-settings-action="licencas-modulos"]');
  const usuariosItem = settingsMenu.querySelector('[data-header-settings-action="usuarios-cadastro"]');
  const senhaItem = settingsMenu.querySelector('[data-header-settings-action="senha"]');

  const hasTawrosAccess = getCurrentUserTawros() === 1;
  const isAdmin = getCurrentUserIsAdmin();
  const hasSettingsAccess = hasTawrosAccess || isAdmin;

  // Revela o wrapper da engrenagem somente se o usuário tiver acesso
  // (oculto por padrão no HTML via atributo hidden)
  const settingsWrapper = document.getElementById('header-settings-wrapper');
  if (settingsWrapper instanceof HTMLElement) {
    settingsWrapper.hidden = !hasSettingsAccess;
  }

  if (licencasItem instanceof HTMLElement) {
    licencasItem.hidden = !hasTawrosAccess;
  }
  if (usuariosItem instanceof HTMLElement) {
    usuariosItem.hidden = !hasTawrosAccess;
  }
  // "Senha" aparece apenas para admin (não tawros)
  if (senhaItem instanceof HTMLElement) {
    senhaItem.hidden = !isAdmin || hasTawrosAccess;
  }

  const closeMenu = () => {
    settingsMenu.hidden = true;
    settingsBtn.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    settingsMenu.hidden = false;
    settingsBtn.setAttribute('aria-expanded', 'true');
  };

  const toggleMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isHidden = settingsMenu.hidden;
    if (isHidden) openMenu();
    else closeMenu();
  };

  const onMenuAction = (event) => {
    const actionTarget = event.target?.closest?.('[data-header-settings-action]');
    if (!actionTarget) return;
    const action = actionTarget.getAttribute('data-header-settings-action') || '';
    closeMenu();
    if (action === 'filial') {
      window.location.hash = '/cadastros/filiais';
      return;
    }
    if (action === 'licencas-modulos') {
      window.location.hash = '/cadastros/licencas-modulos';
      return;
    }
    if (action === 'usuarios-cadastro') {
      window.location.hash = '/cadastros/usuarios';
      return;
    }
    if (action === 'senha') {
      window.dispatchEvent(new CustomEvent('header:open-admin-senha-modal'));
    }
  };

  const onDocumentClick = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('#header-settings-btn') || target.closest('#header-settings-menu')) return;
    closeMenu();
  };

  const onEscape = (event) => {
    if (event.key === 'Escape') closeMenu();
  };

  settingsBtn.addEventListener('click', toggleMenu);
  settingsMenu.addEventListener('click', onMenuAction);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onEscape);

  return () => {
    settingsBtn.removeEventListener('click', toggleMenu);
    settingsMenu.removeEventListener('click', onMenuAction);
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onEscape);
  };
}

function setupUserMenu() {
  const hasTawrosAccess = getCurrentUserTawros() === 1;
  const isAdmin = getCurrentUserIsAdmin();
  const isCommonUser = !hasTawrosAccess && !isAdmin;

  const userWrapper = document.getElementById('header-user-wrapper');
  if (userWrapper instanceof HTMLElement) userWrapper.hidden = !isCommonUser;
  if (!isCommonUser) return () => { };

  const userBtn = document.getElementById('header-user-btn');
  const userModal = document.getElementById('header-user-modal');
  const currentInput = document.getElementById('hum-current');
  const newInput = document.getElementById('hum-new');
  const confirmInput = document.getElementById('hum-confirm');
  const errorEl = document.getElementById('hum-error');
  const cancelBtn = document.getElementById('hum-cancel');
  const confirmBtn = document.getElementById('hum-confirm-btn');

  if (!userBtn || !userModal) return () => { };

  const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.sistemas.tawros.com.br:3000/api/v1';

  function showError(msg) {
    if (errorEl) { errorEl.textContent = msg; errorEl.hidden = false; }
  }
  function clearError() {
    if (errorEl) { errorEl.textContent = ''; errorEl.hidden = true; }
  }
  function resetForm() {
    if (currentInput) currentInput.value = '';
    if (newInput) newInput.value = '';
    if (confirmInput) confirmInput.value = '';
    clearError();
    if (confirmBtn) { confirmBtn.disabled = false; confirmBtn.textContent = 'Confirmar'; }
  }
  function openModal() {
    resetForm();
    userModal.hidden = false;
    userBtn.setAttribute('aria-expanded', 'true');
    setTimeout(() => currentInput?.focus(), 50);
  }
  function closeModal() {
    userModal.hidden = true;
    userBtn.setAttribute('aria-expanded', 'false');
    resetForm();
  }

  const onUserBtnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    userModal.hidden ? openModal() : closeModal();
  };

  const onCancelClick = () => closeModal();

  const onConfirmClick = async () => {
    clearError();
    const currentPassword = currentInput?.value || '';
    const newPassword = newInput?.value || '';
    const confirmPassword = confirmInput?.value || '';

    if (!currentPassword) { showError('Informe a senha atual.'); return; }
    if (newPassword.length < 6) { showError('A nova senha deve ter no mínimo 6 caracteres.'); return; }
    if (newPassword !== confirmPassword) { showError('A confirmação da nova senha não confere.'); return; }

    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Aguarde...';

    try {
      const token = sessionStorage.getItem('authToken') || '';
      const res = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = payload?.message || 'Erro ao alterar senha.';
        showError(msg.includes('atual') || res.status === 401 ? 'Senha atual incorreta.' : msg);
        return;
      }
      closeModal();
      window.alert('Senha alterada com sucesso!');
    } catch {
      showError('Erro de conexão. Tente novamente.');
    } finally {
      if (confirmBtn) { confirmBtn.disabled = false; confirmBtn.textContent = 'Confirmar'; }
    }
  };

  const onDocumentClick = (e) => {
    if (!e.target?.closest?.('#header-user-wrapper')) closeModal();
  };
  const onEscape = (e) => { if (e.key === 'Escape') closeModal(); };

  userBtn.addEventListener('click', onUserBtnClick);
  cancelBtn?.addEventListener('click', onCancelClick);
  confirmBtn?.addEventListener('click', onConfirmClick);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onEscape);

  return () => {
    userBtn.removeEventListener('click', onUserBtnClick);
    cancelBtn?.removeEventListener('click', onCancelClick);
    confirmBtn?.removeEventListener('click', onConfirmClick);
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onEscape);
  };
}

function setupAdminPasswordModal() {
  const modal = document.getElementById('header-admin-senha-modal');
  const userSelect = document.getElementById('hasm-user-select');
  const newInput = document.getElementById('hasm-new');
  const confirmInput = document.getElementById('hasm-confirm');
  const errorEl = document.getElementById('hasm-error');
  const cancelBtn = document.getElementById('hasm-cancel');
  const confirmBtn = document.getElementById('hasm-confirm-btn');

  if (!modal) return () => { };

  const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.sistemas.tawros.com.br:3000/api/v1';

  function showError(msg) {
    if (errorEl) { errorEl.textContent = msg; errorEl.hidden = false; }
  }
  function clearError() {
    if (errorEl) { errorEl.textContent = ''; errorEl.hidden = true; }
  }
  function resetForm() {
    if (userSelect) userSelect.value = '';
    if (newInput) newInput.value = '';
    if (confirmInput) confirmInput.value = '';
    clearError();
    if (confirmBtn) { confirmBtn.disabled = false; confirmBtn.textContent = 'Confirmar'; }
  }

  async function loadUsers() {
    if (!userSelect) return;
    userSelect.innerHTML = '<option value="">Carregando...</option>';
    try {
      const token = sessionStorage.getItem('authToken') || '';
      const res = await fetch(`${API_BASE_URL}/auth/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const payload = await res.json().catch(() => ({}));
      const rows = Array.isArray(payload?.data) ? payload.data : [];
      userSelect.innerHTML = '<option value="">Selecione um usuário...</option>' +
        rows.map((u) => `<option value="${u.id}">${u.nome || u.email}</option>`).join('');
    } catch {
      userSelect.innerHTML = '<option value="">Erro ao carregar usuários</option>';
    }
  }

  async function openModal() {
    resetForm();
    await loadUsers();
    modal.hidden = false;
    userSelect?.focus();
  }

  function closeModal() {
    modal.hidden = true;
    resetForm();
  }

  const onOpenEvent = () => openModal();
  const onCancelClick = () => closeModal();

  const onConfirmClick = async () => {
    clearError();
    const targetUserId = Number(userSelect?.value);
    const newPassword = newInput?.value || '';
    const confirmPassword = confirmInput?.value || '';

    if (!targetUserId) { showError('Selecione um usuário.'); return; }
    if (newPassword.length < 8) { showError('A nova senha deve ter no mínimo 8 caracteres.'); return; }
    if (newPassword !== confirmPassword) { showError('A confirmação da nova senha não confere.'); return; }

    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Aguarde...';

    try {
      const token = sessionStorage.getItem('authToken') || '';
      const res = await fetch(`${API_BASE_URL}/auth/admin/set-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ targetUserId, newPassword }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        showError(payload?.message || 'Erro ao alterar senha.');
        return;
      }
      closeModal();
      window.alert('Senha alterada com sucesso!');
    } catch {
      showError('Erro de conexão. Tente novamente.');
    } finally {
      if (confirmBtn) { confirmBtn.disabled = false; confirmBtn.textContent = 'Confirmar'; }
    }
  };

  const onDocumentClick = (e) => {
    if (!e.target?.closest?.('#header-settings-wrapper')) closeModal();
  };
  const onEscape = (e) => { if (e.key === 'Escape') closeModal(); };

  window.addEventListener('header:open-admin-senha-modal', onOpenEvent);
  cancelBtn?.addEventListener('click', onCancelClick);
  confirmBtn?.addEventListener('click', onConfirmClick);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onEscape);

  return () => {
    window.removeEventListener('header:open-admin-senha-modal', onOpenEvent);
    cancelBtn?.removeEventListener('click', onCancelClick);
    confirmBtn?.removeEventListener('click', onConfirmClick);
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onEscape);
  };
}

function getCurrentUserTawros() {
  try {
    const rawUser = sessionStorage.getItem('user');
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      const fromUser = Number(parsed?.tawros ?? NaN);
      if (Number.isFinite(fromUser)) return fromUser;
    }
  } catch {
    // ignore
  }

  try {
    const token = sessionStorage.getItem('authToken') || '';
    const parts = token.split('.');
    if (parts.length < 2) return 0;
    const payload = JSON.parse(atob(parts[1]));
    const fromToken = Number(payload?.tawros ?? NaN);
    return Number.isFinite(fromToken) ? fromToken : 0;
  } catch {
    return 0;
  }
}

function getCurrentUserIsAdmin() {
  try {
    const rawUser = sessionStorage.getItem('user');
    if (!rawUser) return false;
    const parsed = JSON.parse(rawUser);
    const roles = Array.isArray(parsed?.roles) ? parsed.roles : [];
    return roles.some((r) => String(r).toLowerCase() === 'admin');
  } catch {
    return false;
  }
}

function handleRouteChange(event) {
  const { route } = event.detail;
  if (!route) return;

  updatePageTitle(route.pageTitle);
  const breadcrumbItems = route.headerBreadcrumb || route.breadcrumb;
  const tabs = Array.isArray(route.headerTabs) ? route.headerTabs : [];
  const subTabs = Array.isArray(route.headerSubTabs) ? route.headerSubTabs : [];
  const activeTab = route.headerActiveTab || '';
  const activeSubTab = route.headerActiveSubTab || '';

  updateBreadcrumb(breadcrumbItems);
  updateTabs(tabs, activeTab);
  updateSubTabs(subTabs, activeSubTab);
  setHeaderVariant((tabs.length > 0) || (subTabs.length > 0), breadcrumbItems && breadcrumbItems.length > 0);
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

function updateSubTabs(subTabs, activeSubTab) {
  const subTabsElement = document.getElementById('header-subtabs');
  if (!subTabsElement) return;

  subTabsElement.innerHTML = '';

  subTabs.forEach((tab) => {
    const item = document.createElement('a');
    item.className = 'header-subtab';
    item.href = tab.href || window.location.hash || '#/dashboard';
    item.textContent = tab.label;

    if (tab.label === activeSubTab || tab.active) {
      item.classList.add('header-subtab--active');
    }

    subTabsElement.appendChild(item);
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
    'Controle de Pátio': '#/controle-patio/visao-geral',
    'Instruções': '#/controle-patio/instrucoes',
    'Agendamentos': '#/controle-patio/agendamentos',
    'Gestão Agenda': '#/controle-patio/gestao-agenda',
    'Pátio': '#/controle-patio/patio',
    'Veículos': '#/controle-patio/veiculos',
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





