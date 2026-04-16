/**
 * Login Page
 * Handles authentication form validation and submission
 */

// State
let isSubmitting = false;
let activeController = null;
let loginPhase = 'form'; // 'form' | 'filial'
let authData = null; // { token, refreshToken, user }
const API_BASE_URL = window?.TAWROS_API_URL || 'http://192.168.15.26:3000/api/v1';

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

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show field error
 */
function showFieldError(errorElement, message) {
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

/**
 * Clear field error
 */
function clearFieldError(errorElement) {
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
}

/**
 * Show form error message
 */
function showFormError(message) {
  if (loginFormError) {
    loginFormError.textContent = message;
    loginFormError.hidden = false;
  }
}

/**
 * Hide form error message
 */
function hideFormError() {
  if (loginFormError) {
    loginFormError.textContent = '';
    loginFormError.hidden = true;
  }
}

/**
 * Set loading state
 */
function setLoadingState(loading) {
  isSubmitting = loading;

  if (submitButton) {
    submitButton.disabled = loading;
    submitButton.dataset.loading = String(loading);
  }

  // Na fase 'filial' o loginInput fica sempre desabilitado
  if (loginInput) loginInput.disabled = loading || loginPhase === 'filial';
  if (loginPhase === 'form' && passwordInput) passwordInput.disabled = loading;
}

/**
 * Transforma o campo de senha em um select de filiais
 */
function showFilialSelect(filiais) {
  loginPhase = 'filial';

  // Desabilita o campo login e oculta "Esqueci minha senha"
  if (loginInput) loginInput.disabled = true;
  if (loginForgot) loginForgot.hidden = true;

  // Troca a label
  const label = passwordField?.querySelector('.login-form-label');
  if (label) label.innerHTML = 'Filial<span class="login-form-required">*</span>';

  // Substitui o wrapper de senha pelo select
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

  // Troca o botão para "Acessar"
  const submitText = submitButton?.querySelector('.login-form-submit-text');
  if (submitText) submitText.textContent = 'Acessar';
}

/**
 * Finaliza o acesso com a filial selecionada
 */
function finishAccess(filialId, filialNome, filialCodigo) {
  sessionStorage.setItem('authToken', authData.token);
  sessionStorage.setItem('refreshToken', authData.refreshToken || '');
  sessionStorage.setItem('user', JSON.stringify(authData.user || {}));
  sessionStorage.setItem('filialId', String(filialId ?? ''));
  sessionStorage.setItem('filialNome', String(filialNome ?? ''));
  sessionStorage.setItem('filialCodigo', String(filialCodigo ?? ''));
  window.location.hash = '#/dashboard';
}

/**
 * Validate form fields
 */
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

/**
 * Handle form submission
 */
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
    const filiais = Array.isArray(response.user?.filiais) ? response.user.filiais : [];

    if (filiais.length > 1) {
      // Mais de uma filial: mostrar select
      showFilialSelect(filiais);
    } else {
      // Uma filial ou nenhuma: entrar direto
      const filial = filiais[0] || null;
      finishAccess(filial?.id ?? '', filial?.nome ?? '', filial?.codigo ?? '');
    }
  } catch (error) {
    if (error?.name === 'AbortError') return;
    showFormError(error?.message || 'Erro ao fazer login. Tente novamente.');
  } finally {
    setLoadingState(false);
  }
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility() {
  if (!passwordInput) return;

  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';

  const label = isPassword ? 'Ocultar senha' : 'Mostrar senha';
  passwordToggle?.setAttribute('aria-label', label);
}

/**
 * Clear errors on input
 */
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

/**
 * Initialize
 */
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

  const inputCleanup = setupInputListeners();
  loginForm.addEventListener('submit', handleSubmit);
  passwordToggle?.addEventListener('click', togglePasswordVisibility);

  loginInput?.focus();

  return () => {
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
