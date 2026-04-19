/**
 * Password Recovery Page
 * Handles password recovery with email, CPF, or phone number
 */

// State
let isSubmitting = false;
let activeTab = 'email';
let activeController = null;
const API_BASE_URL = window?.TAWROS_API_URL || 'https://api.tawros.com.br/api/v1';

// DOM Elements (initialized in init())
let recoveryForm;
let tabs;
let tabContents;
let emailInput;
let cpfInput;
let celularInput;
let emailError;
let cpfError;
let celularError;
let recoveryFormError;
let submitButton;

import { isValidEmail, isValidCpf, isValidPhone, formatCpf, formatPhone } from '../../utils/validators.js';

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
  if (recoveryFormError) {
    recoveryFormError.textContent = message;
    recoveryFormError.hidden = false;
  }
}

function hideFormError() {
  if (recoveryFormError) {
    recoveryFormError.textContent = '';
    recoveryFormError.hidden = true;
  }
}

function setLoadingState(loading) {
  isSubmitting = loading;

  if (submitButton) {
    submitButton.disabled = loading;
    submitButton.dataset.loading = String(loading);
  }

  if (emailInput) emailInput.disabled = loading;
  if (cpfInput) cpfInput.disabled = loading;
  if (celularInput) celularInput.disabled = loading;

  tabs?.forEach((tab) => {
    tab.disabled = loading;
  });
}

function switchTab(tabName) {
  activeTab = tabName;

  tabs?.forEach((tab) => {
    const isActive = tab.dataset.tab === tabName;
    tab.classList.toggle('active', isActive);
  });

  tabContents?.forEach((content) => {
    const isActive = content.dataset.content === tabName;
    content.classList.toggle('active', isActive);
  });

  clearFieldError(emailError);
  clearFieldError(cpfError);
  clearFieldError(celularError);
  hideFormError();
}

function validateCurrentTab() {
  let isValid = true;

  clearFieldError(emailError);
  clearFieldError(cpfError);
  clearFieldError(celularError);
  hideFormError();

  switch (activeTab) {
    case 'email': {
      const emailValue = emailInput?.value.trim() || '';
      if (!emailValue) {
        showFieldError(emailError, 'E-mail é obrigatório');
        isValid = false;
      } else if (!isValidEmail(emailValue)) {
        showFieldError(emailError, 'Digite um e-mail válido');
        isValid = false;
      }
      break;
    }

    case 'cpf': {
      const cpfValue = cpfInput?.value || '';
      if (!cpfValue) {
        showFieldError(cpfError, 'CPF é obrigatório');
        isValid = false;
      } else if (!isValidCpf(cpfValue)) {
        showFieldError(cpfError, 'Digite um CPF válido');
        isValid = false;
      }
      break;
    }

    case 'celular': {
      const celularValue = celularInput?.value || '';
      if (!celularValue) {
        showFieldError(celularError, 'Celular é obrigatório');
        isValid = false;
      } else if (!isValidPhone(celularValue)) {
        showFieldError(celularError, 'Digite um celular válido');
        isValid = false;
      }
      break;
    }

    default:
      isValid = false;
  }

  return isValid;
}

async function requestPasswordRecovery(method, value) {
  if (activeController) activeController.abort();
  activeController = new AbortController();

  const body = method === 'email'
    ? { email: value }
    : method === 'cpf'
      ? { cpf: String(value || '').replace(/\D/g, '') }
      : { phone: String(value || '').replace(/\D/g, '') };

  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body),
    signal: activeController.signal
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.message || 'Erro ao enviar instruções');
  }

  return payload?.data || { success: true, method, message: 'Instruções enviadas com sucesso!' };
}

async function handleSubmit(event) {
  event.preventDefault();

  if (isSubmitting) return;
  if (!validateCurrentTab()) return;

  let value = '';
  switch (activeTab) {
    case 'email':
      value = emailInput?.value.trim() || '';
      break;
    case 'cpf':
      value = cpfInput?.value || '';
      break;
    case 'celular':
      value = celularInput?.value || '';
      break;
    default:
      value = '';
  }

  try {
    setLoadingState(true);

    const response = await requestPasswordRecovery(activeTab, value);
    const message = response?.message || 'Instruções enviadas com sucesso!';
    alert(`${message}\n\nVerifique ${activeTab === 'email' ? 'seu e-mail' : activeTab === 'cpf' ? 'seu e-mail cadastrado' : 'seu celular'} para continuar.`);

    window.location.hash = '#/login';
  } catch (error) {
    if (error?.name === 'AbortError') return;
    showFormError(error?.message || 'Erro ao enviar instruções. Tente novamente.');
  } finally {
    setLoadingState(false);
  }
}

function setupTabHandlers() {
  const cleanups = [];
  tabs?.forEach((tab) => {
    const onClick = () => {
      if (!isSubmitting) switchTab(tab.dataset.tab);
    };
    tab.addEventListener('click', onClick);
    cleanups.push(() => tab.removeEventListener('click', onClick));
  });
  return () => {
    cleanups.forEach((fn) => fn());
  };
}

function setupInputMasks() {
  const onCpfInput = (e) => {
    e.target.value = formatCpf(e.target.value);
    clearFieldError(cpfError);
    hideFormError();
  };

  const onCelularInput = (e) => {
    e.target.value = formatPhone(e.target.value);
    clearFieldError(celularError);
    hideFormError();
  };

  const onEmailInput = () => {
    clearFieldError(emailError);
    hideFormError();
  };

  cpfInput?.addEventListener('input', onCpfInput);
  celularInput?.addEventListener('input', onCelularInput);
  emailInput?.addEventListener('input', onEmailInput);

  return () => {
    cpfInput?.removeEventListener('input', onCpfInput);
    celularInput?.removeEventListener('input', onCelularInput);
    emailInput?.removeEventListener('input', onEmailInput);
  };
}

function init() {
  recoveryForm = document.getElementById('recoveryForm');
  tabs = document.querySelectorAll('.recovery-tab');
  tabContents = document.querySelectorAll('.recovery-tab-content');
  emailInput = document.getElementById('emailInput');
  cpfInput = document.getElementById('cpfInput');
  celularInput = document.getElementById('celularInput');
  emailError = document.getElementById('emailError');
  cpfError = document.getElementById('cpfError');
  celularError = document.getElementById('celularError');
  recoveryFormError = document.getElementById('recoveryFormError');
  submitButton = recoveryForm?.querySelector('.login-form-submit');

  if (!recoveryForm) return;

  recoveryForm.addEventListener('submit', handleSubmit);
  const tabCleanup = setupTabHandlers();
  const maskCleanup = setupInputMasks();

  emailInput?.focus();

  return () => {
    if (activeController) {
      activeController.abort();
      activeController = null;
    }
    recoveryForm?.removeEventListener('submit', handleSubmit);
    if (typeof tabCleanup === 'function') tabCleanup();
    if (typeof maskCleanup === 'function') maskCleanup();
  };
}

export { init };
