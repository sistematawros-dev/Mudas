/**
 * Password Recovery Page
 * Handles password recovery with email, CPF, or phone number
 */

// State
let isSubmitting = false;
let activeTab = 'email';

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

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate CPF format (basic validation)
 */
function isValidCPF(cpf) {
  const cleanCPF = cpf.replace(/\D/g, '');
  return cleanCPF.length === 11;
}

/**
 * Validate phone number format
 */
function isValidPhone(phone) {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length === 10 || cleanPhone.length === 11;
}

/**
 * Format CPF (000.000.000-00)
 */
function formatCPF(value) {
  const cleanValue = value.replace(/\D/g, '');

  if (cleanValue.length <= 3) return cleanValue;
  if (cleanValue.length <= 6) return cleanValue.replace(/(\d{3})(\d)/, '$1.$2');
  if (cleanValue.length <= 9) return cleanValue.replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3');
  return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
}

/**
 * Format phone number ((00) 00000-0000)
 */
function formatPhone(value) {
  const cleanValue = value.replace(/\D/g, '');

  if (cleanValue.length <= 2) return cleanValue;
  if (cleanValue.length <= 6) return cleanValue.replace(/(\d{2})(\d)/, '($1) $2');
  if (cleanValue.length <= 10) return cleanValue.replace(/(\d{2})(\d{4})(\d)/, '($1) $2-$3');
  return cleanValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
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
  if (recoveryFormError) {
    recoveryFormError.textContent = message;
    recoveryFormError.hidden = false;
  }
}

/**
 * Hide form error message
 */
function hideFormError() {
  if (recoveryFormError) {
    recoveryFormError.textContent = '';
    recoveryFormError.hidden = true;
  }
}

/**
 * Set loading state
 */
function setLoadingState(loading) {
  isSubmitting = loading;

  if (submitButton) {
    submitButton.disabled = loading;
    submitButton.dataset.loading = loading;
  }

  // Disable all inputs
  if (emailInput) emailInput.disabled = loading;
  if (cpfInput) cpfInput.disabled = loading;
  if (celularInput) celularInput.disabled = loading;

  // Disable tabs
  tabs?.forEach(tab => {
    tab.disabled = loading;
  });
}

/**
 * Switch tab
 */
function switchTab(tabName) {
  activeTab = tabName;

  // Update tab buttons
  tabs?.forEach(tab => {
    const isActive = tab.dataset.tab === tabName;
    tab.classList.toggle('active', isActive);
  });

  // Update tab contents
  tabContents?.forEach(content => {
    const isActive = content.dataset.content === tabName;
    content.classList.toggle('active', isActive);
  });

  // Clear errors
  clearFieldError(emailError);
  clearFieldError(cpfError);
  clearFieldError(celularError);
  hideFormError();
}

/**
 * Validate current tab
 */
function validateCurrentTab() {
  let isValid = true;

  // Clear previous errors
  clearFieldError(emailError);
  clearFieldError(cpfError);
  clearFieldError(celularError);
  hideFormError();

  switch (activeTab) {
    case 'email':
      const emailValue = emailInput?.value.trim() || '';
      if (!emailValue) {
        showFieldError(emailError, 'E-mail é obrigatório');
        isValid = false;
      } else if (!isValidEmail(emailValue)) {
        showFieldError(emailError, 'Digite um e-mail válido');
        isValid = false;
      }
      break;

    case 'cpf':
      const cpfValue = cpfInput?.value || '';
      if (!cpfValue) {
        showFieldError(cpfError, 'CPF é obrigatório');
        isValid = false;
      } else if (!isValidCPF(cpfValue)) {
        showFieldError(cpfError, 'Digite um CPF válido');
        isValid = false;
      }
      break;

    case 'celular':
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

  return isValid;
}

/**
 * Mock password recovery
 */
async function mockPasswordRecovery(method, value) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock success
  return {
    success: true,
    method,
    message: 'Instruções enviadas com sucesso!'
  };
}

/**
 * Handle form submission
 */
async function handleSubmit(event) {
  event.preventDefault();

  // Prevent double submission
  if (isSubmitting) {
    return;
  }

  // Validate
  if (!validateCurrentTab()) {
    return;
  }

  // Get value based on active tab
  let value;
  switch (activeTab) {
    case 'email':
      value = emailInput.value.trim();
      break;
    case 'cpf':
      value = cpfInput.value;
      break;
    case 'celular':
      value = celularInput.value;
      break;
  }

  try {
    setLoadingState(true);

    // Attempt password recovery
    const response = await mockPasswordRecovery(activeTab, value);

    // Success! Show success message and redirect
    console.log('✅ Recovery email sent successfully');

    // In a real app, show success message and redirect
    alert(`${response.message}\n\nVerifique ${activeTab === 'email' ? 'seu e-mail' : activeTab === 'cpf' ? 'seu e-mail cadastrado' : 'seu celular'} para continuar.`);

    // Redirect to login
    window.location.hash = '#/login';

  } catch (error) {
    console.error('❌ Recovery error:', error);
    showFormError(error.message || 'Erro ao enviar instruções. Tente novamente.');
  } finally {
    setLoadingState(false);
  }
}

/**
 * Setup tab click handlers
 */
function setupTabHandlers() {
  tabs?.forEach(tab => {
    tab.addEventListener('click', () => {
      if (!isSubmitting) {
        switchTab(tab.dataset.tab);
      }
    });
  });
}

/**
 * Setup input masks
 */
function setupInputMasks() {
  // CPF mask
  cpfInput?.addEventListener('input', (e) => {
    e.target.value = formatCPF(e.target.value);
    clearFieldError(cpfError);
    hideFormError();
  });

  // Phone mask
  celularInput?.addEventListener('input', (e) => {
    e.target.value = formatPhone(e.target.value);
    clearFieldError(celularError);
    hideFormError();
  });

  // Email clear errors
  emailInput?.addEventListener('input', () => {
    clearFieldError(emailError);
    hideFormError();
  });
}

/**
 * Initialize
 */
function init() {
  // Select DOM elements
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

  if (!recoveryForm) {
    console.error('Recovery form not found');
    return;
  }

  // Setup event listeners
  recoveryForm.addEventListener('submit', handleSubmit);
  setupTabHandlers();
  setupInputMasks();

  // Focus first input
  emailInput?.focus();

  console.log('✅ Password recovery page initialized');
}

export { init };
