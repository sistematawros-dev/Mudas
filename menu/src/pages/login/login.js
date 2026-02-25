/**
 * Login Page
 * Handles authentication form validation and submission
 */

// State
let isSubmitting = false;

// DOM Elements (initialized in init())
let loginForm;
let loginInput;
let passwordInput;
let loginError;
let passwordError;
let loginFormError;
let submitButton;
let passwordToggle;

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
    submitButton.dataset.loading = loading;
  }

  if (loginInput) loginInput.disabled = loading;
  if (passwordInput) passwordInput.disabled = loading;
}

/**
 * Validate form fields
 */
function validateForm() {
  let isValid = true;

  // Clear previous errors
  clearFieldError(loginError);
  clearFieldError(passwordError);
  hideFormError();

  // Validate login
  const loginValue = loginInput?.value.trim() || '';
  if (!loginValue) {
    showFieldError(loginError, 'Login é obrigatório');
    isValid = false;
  } else if (!isValidEmail(loginValue)) {
    showFieldError(loginError, 'Digite um e-mail válido');
    isValid = false;
  }

  // Validate password
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

/**
 * Mock authentication
 * In production, this would call a real API
 */
async function mockAuthentication(login, password) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock validation
  // Accept any email + password with 6+ chars for demo
  if (password.length >= 6) {
    return {
      success: true,
      user: {
        email: login,
        name: 'Usuário Teste'
      },
      token: 'mock-jwt-token-' + Date.now()
    };
  }

  throw new Error('Credenciais inválidas');
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
  if (!validateForm()) {
    return;
  }

  const login = loginInput.value.trim();
  const password = passwordInput.value;

  try {
    setLoadingState(true);

    // Attempt authentication
    const response = await mockAuthentication(login, password);

    // Store auth data (in production, use secure storage)
    sessionStorage.setItem('authToken', response.token);
    sessionStorage.setItem('user', JSON.stringify(response.user));

    // Success! Navigate to main page
    console.log('✅ Login successful, redirecting...');
    
    // Navigate to dashboard after login
    window.location.hash = '#/dashboard';

  } catch (error) {
    console.error('❌ Login error:', error);
    showFormError(error.message || 'Erro ao fazer login. Tente novamente.');
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
  loginInput?.addEventListener('input', () => {
    clearFieldError(loginError);
    hideFormError();
  });

  passwordInput?.addEventListener('input', () => {
    clearFieldError(passwordError);
    hideFormError();
  });
}

/**
 * Initialize
 */
function init() {
  // Select DOM elements
  loginForm = document.getElementById('loginForm');
  loginInput = document.getElementById('loginInput');
  passwordInput = document.getElementById('passwordInput');
  loginError = document.getElementById('loginError');
  passwordError = document.getElementById('passwordError');
  loginFormError = document.getElementById('loginFormError');
  submitButton = loginForm?.querySelector('.login-form-submit');
  passwordToggle = document.querySelector('.login-form-password-toggle');

  if (!loginForm) {
    console.error('Login form not found');
    return;
  }

  // Setup event listeners
  loginForm.addEventListener('submit', handleSubmit);
  passwordToggle?.addEventListener('click', togglePasswordVisibility);
  setupInputListeners();

  // Focus first input
  loginInput?.focus();

  console.log('✅ Login page initialized');
}

export { init };
