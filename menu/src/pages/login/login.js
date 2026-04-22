import { startSession, initSessionManager, generateSessionKey } from '../../app/session.js';

// State
let isSubmitting = false;
let activeController = null;
let loginPhase = 'form'; // 'form' | 'filial'
let authData = null; // { token, refreshToken, user }
const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.sistemas.tawros.com.br:3000/api/v1';

// DOM Elements (initialized in init())
let loginForm;
let loginInput;
let passwordInput;
let passwordField;
let loginError;
let passwordError;
let loginFormError;
let submitButton;
let passwordToggle;
let loginForgot;

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFieldError(errorElement, message) {
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

function clearFieldError(errorElement) {
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
}

function showFormError(message) {
  if (loginFormError) {
    loginFormError.textContent = message;
    loginFormError.hidden = false;
  }
}

function hideFormError() {
  if (loginFormError) {
    loginFormError.textContent = '';
    loginFormError.innerHTML = '';
    loginFormError.hidden = true;
  }
}

function setLoadingState(loading) {
  isSubmitting = loading;

  if (submitButton) {
    submitButton.disabled = loading;
    submitButton.dataset.loading = String(loading);
  }

  if (loginInput) loginInput.disabled = loading || loginPhase === 'filial';
  if (loginPhase === 'form' && passwordInput) passwordInput.disabled = loading;
}

function showFilialSelect(filiais) {
  loginPhase = 'filial';

  if (loginInput) loginInput.disabled = true;
  if (loginForgot) loginForgot.hidden = true;

  const label = passwordField?.querySelector('.login-form-label');
  if (label) label.innerHTML = 'Filial<span class="login-form-required">*</span>';

  const wrapper = passwordField?.querySelector('.login-form-password-wrapper');
  if (wrapper) {
    const select = document.createElement('select');
    select.id = 'filialSelect';
    select.className = 'login-form-filial-select';
    select.setAttribute('aria-label', 'Selecione a filial');

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Selecione uma filial...';
    select.appendChild(defaultOption);

    filiais.forEach((filial) => {
      const opt = document.createElement('option');
      opt.value = String(filial.id);
      opt.dataset.codigo = filial.codigo;
      opt.textContent = `${filial.codigo} - ${filial.nome}`;
      select.appendChild(opt);
    });

    wrapper.replaceWith(select);
  }

  const submitText = submitButton?.querySelector('.login-form-submit-text');
  if (submitText) submitText.textContent = 'Acessar';
}

function finishAccess(filialId, filialNome, filialCodigo) {
  sessionStorage.setItem('authToken', authData.token);
  sessionStorage.setItem('refreshToken', authData.refreshToken || '');
  sessionStorage.setItem('user', JSON.stringify(authData.user || {}));
  sessionStorage.setItem('filialId', String(filialId ?? ''));
  sessionStorage.setItem('filialNome', String(filialNome ?? ''));
  sessionStorage.setItem('filialCodigo', String(filialCodigo ?? ''));
  initSessionManager();
  window.location.hash = '#/dashboard';
}

function proceedToFilialOrDashboard() {
  const filiais = Array.isArray(authData.user?.filiais) ? authData.user.filiais : [];
  if (filiais.length > 1) {
    showFilialSelect(filiais);
  } else {
    const filial = filiais[0] || null;
    finishAccess(filial?.id ?? '', filial?.nome ?? '', filial?.codigo ?? '');
  }
}

function showAlreadyActiveWarning(count) {
  if (!loginFormError) return;

  const plural = count > 1 ? `${count} sessões ativas` : 'uma sessão ativa';
  loginFormError.innerHTML = `
    <span>Este usuário já possui ${plural} em outro dispositivo ou aba.</span>
    <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
      <button type="button" id="loginForceYes" style="padding:6px 14px;background:#0066cc;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;">Sim, desconectar e entrar</button>
      <button type="button" id="loginForceNo" style="padding:6px 14px;background:transparent;color:inherit;border:1px solid currentColor;border-radius:6px;cursor:pointer;font-size:13px;">Cancelar</button>
    </div>
  `;
  loginFormError.hidden = false;

  document.getElementById('loginForceYes')?.addEventListener('click', async () => {
    hideFormError();
    setLoadingState(true);
    try {
      await startSession(authData.token, true);
      proceedToFilialOrDashboard();
    } catch (err) {
      showFormError(err?.message || 'Erro ao forçar desconexão. Tente novamente.');
    } finally {
      setLoadingState(false);
    }
  });

  document.getElementById('loginForceNo')?.addEventListener('click', () => {
    hideFormError();
    authData = null;
  });
}

function validateForm() {
  let isValid = true;

  clearFieldError(loginError);
  clearFieldError(passwordError);
  hideFormError();

  const loginValue = loginInput?.value.trim() || '';
  if (!loginValue) {
    showFieldError(loginError, 'Login é obrigatório');
    isValid = false;
  } else if (!isValidEmail(loginValue)) {
    showFieldError(loginError, 'Digite um e-mail válido');
    isValid = false;
  }

  const passwordValue = passwordInput?.value || '';
  if (!passwordValue) {
    showFieldError(passwordError, 'Senha é obrigatória');
    isValid = false;
  } else if (passwordValue.length < 6) {
    showFieldError(passwordError, 'Senha deve ter no mínimo 6 caracteres');
    isValid = false;
  }

  return isValid;
}

async function authenticate(login, password) {
  if (activeController) activeController.abort();
  activeController = new AbortController();

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ email: login, password }),
    signal: activeController.signal
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.message || 'Credenciais inválidas');
  }

  const data = payload?.data || {};
  return {
    token: String(data.accessToken || ''),
    refreshToken: String(data.refreshToken || ''),
    user: data.user || null
  };
}

async function handleSubmit(event) {
  event.preventDefault();

  if (isSubmitting) return;

  // --- Fase 2: seleção de filial ---
  if (loginPhase === 'filial') {
    const select = document.getElementById('filialSelect');
    const filialId = select?.value || '';
    if (!filialId) {
      showFormError('Selecione uma filial para continuar.');
      return;
    }
    const selectedOpt = select.options[select.selectedIndex];
    const filialNome = selectedOpt?.textContent || '';
    const filialCodigo = selectedOpt?.dataset?.codigo || '';
    hideFormError();
    finishAccess(filialId, filialNome, filialCodigo);
    return;
  }

  // --- Fase 1: autenticação ---
  if (!validateForm()) return;

  const login = loginInput?.value.trim() || '';
  const password = passwordInput?.value || '';

  try {
    setLoadingState(true);

    const response = await authenticate(login, password);
    if (!response?.token) {
      throw new Error('Resposta de autenticação inválida');
    }

    authData = response;

    // Verifica sessão ativa antes de prosseguir
    const sessionResult = await startSession(response.token, false);

    if (sessionResult.status === 'already_active') {
      showAlreadyActiveWarning(sessionResult.count || 1);
      return;
    }

    proceedToFilialOrDashboard();
  } catch (error) {
    if (error?.name === 'AbortError') return;
    showFormError(error?.message || 'Erro ao fazer login. Tente novamente.');
  } finally {
    setLoadingState(false);
  }
}

function togglePasswordVisibility() {
  if (!passwordInput) return;

  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';

  const label = isPassword ? 'Ocultar senha' : 'Mostrar senha';
  passwordToggle?.setAttribute('aria-label', label);
}

function setupInputListeners() {
  const onLoginInput = () => {
    clearFieldError(loginError);
    hideFormError();
  };

  const onPasswordInput = () => {
    clearFieldError(passwordError);
    hideFormError();
  };

  loginInput?.addEventListener('input', onLoginInput);
  passwordInput?.addEventListener('input', onPasswordInput);

  return () => {
    loginInput?.removeEventListener('input', onLoginInput);
    passwordInput?.removeEventListener('input', onPasswordInput);
  };
}

function blockLoginBackNavigation() {
  // Substitui a entrada atual e empurra uma entrada extra para "absorver" o back
  history.replaceState({ page: 'login' }, '', window.location.href);
  history.pushState({ page: 'login' }, '', window.location.href);

  const handlePopState = () => {
    // Sempre que o usuário tentar voltar, reempurra o estado de login
    history.pushState({ page: 'login' }, '', window.location.href);
  };

  window.addEventListener('popstate', handlePopState);
  return () => window.removeEventListener('popstate', handlePopState);
}

function init() {
  loginForm = document.getElementById('loginForm');
  loginInput = document.getElementById('loginInput');
  passwordInput = document.getElementById('passwordInput');
  passwordField = passwordInput?.closest('.login-form-field') || null;
  loginError = document.getElementById('loginError');
  passwordError = document.getElementById('passwordError');
  loginFormError = document.getElementById('loginFormError');
  submitButton = loginForm?.querySelector('.login-form-submit');
  passwordToggle = document.querySelector('.login-form-password-toggle');
  loginForgot = document.getElementById('loginForgot');
  loginPhase = 'form';
  authData = null;

  if (!loginForm) return;

  const cleanupBackBlock = blockLoginBackNavigation();
  const inputCleanup = setupInputListeners();
  loginForm.addEventListener('submit', handleSubmit);
  passwordToggle?.addEventListener('click', togglePasswordVisibility);

  loginInput?.focus();

  return () => {
    cleanupBackBlock();
    if (activeController) {
      activeController.abort();
      activeController = null;
    }
    loginForm?.removeEventListener('submit', handleSubmit);
    passwordToggle?.removeEventListener('click', togglePasswordVisibility);
    if (typeof inputCleanup === 'function') inputCleanup();
  };
}

export { init };
