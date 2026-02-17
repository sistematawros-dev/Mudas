const n=`<div class="login-container">
  <!-- Left Panel - Brand -->
  <div class="login-brand-panel">
    <div class="login-brand-content">
      <div class="login-brand-logo">
        <img src="/assets/logo-tawros-branca.png" alt="Tawros" class="login-brand-logo-img" />
      </div>
    </div>

    <div class="login-brand-footer">
      <a href="https://www.tawros.com.br" target="_blank" class="login-brand-url">
        WWW.TAWROS.COM.BR
      </a>
    </div>
  </div>

  <!-- Right Panel - Form -->
  <div class="login-form-panel">
    <div class="login-form-container">
      <!-- Logo Tawros -->
      <div class="login-form-logo">
        <img src="/assets/logo-tawros-colorida.png" alt="Tawros" class="login-form-logo-img" />
      </div>

      <!-- Heading -->
      <div class="login-form-header">
        <h1 class="login-form-title">Olá, insira seus dados para fazer login</h1>
      </div>

      <!-- Form -->
      <form id="loginForm" class="login-form" novalidate>
        <!-- Login Field -->
        <div class="login-form-field">
          <label for="loginInput" class="login-form-label">
            Login<span class="login-form-required">*</span>
          </label>
          <input
            type="text"
            id="loginInput"
            class="input"
            required
            aria-required="true"
          />
          <span id="loginError" class="login-form-error" role="alert"></span>
        </div>

        <!-- Password Field -->
        <div class="login-form-field">
          <label for="passwordInput" class="login-form-label">
            Senha<span class="login-form-required">*</span>
          </label>
          <div class="login-form-password-wrapper">
            <input
              type="password"
              id="passwordInput"
              class="input"
              required
              aria-required="true"
            />
            <button
              type="button"
              class="login-form-password-toggle"
              aria-label="Mostrar senha"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
          <span id="passwordError" class="login-form-error" role="alert"></span>
        </div>

        <!-- Forgot Password -->
        <div class="login-form-forgot">
          <a href="#/recuperar-senha" class="login-form-forgot-link">
            Esqueci minha senha
          </a>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn--solid btn--primary login-form-submit">
          <span class="login-form-submit-text">Entrar</span>
          <span class="login-form-submit-loader" hidden>Carregando...</span>
        </button>

        <!-- Error Message -->
        <div id="loginFormError" class="login-form-message" role="alert" hidden></div>
      </form>
    </div>
  </div>
</div>
`;export{n as default};
