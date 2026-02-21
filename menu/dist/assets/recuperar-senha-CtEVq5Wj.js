const n=`<div class="login-container">
  <!-- Left Panel - Brand (Reusa mesmo estilo do login) -->
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

      <!-- Header -->
      <div class="recovery-header">
        <h1 class="recovery-title">Recuperação de senha</h1>
        <p class="recovery-subtitle">Escolha como deseja recuperar sua senha. Enviaremos instruções para o método selecionado.</p>
      </div>

      <!-- Tabs -->
      <div class="recovery-tabs">
        <button type="button" class="recovery-tab active" data-tab="email">
          E-mail
        </button>
        <button type="button" class="recovery-tab" data-tab="cpf">
          CPF
        </button>
        <button type="button" class="recovery-tab" data-tab="celular">
          Celular
        </button>
      </div>

      <!-- Form -->
      <form id="recoveryForm" class="recovery-form" novalidate>
        <!-- Tab Content: Email -->
        <div class="recovery-tab-content active" data-content="email">
          <div class="login-form-field">
            <label for="emailInput" class="login-form-label">
              Digite seu e-mail<span class="login-form-required">*</span>
            </label>
            <input
              type="email"
              id="emailInput"
              class="input"
              placeholder="seu@email.com"
              required
              aria-required="true"
            />
            <span id="emailError" class="login-form-error" role="alert"></span>
            <span class="recovery-helper">Enviaremos um link de recuperação para este e-mail</span>
          </div>
        </div>

        <!-- Tab Content: CPF -->
        <div class="recovery-tab-content" data-content="cpf">
          <div class="login-form-field">
            <label for="cpfInput" class="login-form-label">
              Digite seu CPF<span class="login-form-required">*</span>
            </label>
            <input
              type="text"
              id="cpfInput"
              class="input"
              placeholder="000.000.000-00"
              maxlength="14"
              required
              aria-required="true"
            />
            <span id="cpfError" class="login-form-error" role="alert"></span>
            <span class="recovery-helper">Enviaremos instruções para o e-mail cadastrado com este CPF</span>
          </div>
        </div>

        <!-- Tab Content: Celular -->
        <div class="recovery-tab-content" data-content="celular">
          <div class="login-form-field">
            <label for="celularInput" class="login-form-label">
              Digite seu celular<span class="login-form-required">*</span>
            </label>
            <input
              type="tel"
              id="celularInput"
              class="input"
              placeholder="(00) 00000-0000"
              maxlength="15"
              required
              aria-required="true"
            />
            <span id="celularError" class="login-form-error" role="alert"></span>
            <span class="recovery-helper">Enviaremos um código de recuperação via SMS</span>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn--solid btn--primary login-form-submit">
          <span class="login-form-submit-text">Enviar instruções</span>
          <span class="login-form-submit-loader" hidden>Enviando...</span>
        </button>

        <!-- Error Message -->
        <div id="recoveryFormError" class="login-form-message" role="alert" hidden></div>

        <!-- Back to Login -->
        <div class="recovery-back">
          <a href="#/login" class="recovery-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Voltar para o login
          </a>
        </div>
      </form>
    </div>
  </div>
</div>
`;export{n as default};
