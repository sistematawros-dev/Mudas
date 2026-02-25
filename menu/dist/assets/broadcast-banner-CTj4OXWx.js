const n=`<section class="page">
  <div class="page-header">
    <h1>Broadcast Banner</h1>
    <p class="page-desc">As mensagens de banner são exibidas para o usuário na parte superior da janela/tela.</p>
  </div>

  <div class="demo-section">
    <h2 class="demo-title">Componente / Broadcast Banner</h2>

    <div class="demo-banner-grid">
      <!-- Primary -->
      <div class="broadcast-banner broadcast-banner--primary">
        <span class="broadcast-banner-icon">
          <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 7V11M8 5V5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </span>
        <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
        <button class="broadcast-banner-close" type="button">
          <svg viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>

      <!-- Info -->
      <div class="broadcast-banner broadcast-banner--info">
        <span class="broadcast-banner-icon">
          <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 7V11M8 5V5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </span>
        <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
        <button class="broadcast-banner-close" type="button">
          <svg viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>

      <!-- Dark -->
      <div class="broadcast-banner broadcast-banner--dark">
        <span class="broadcast-banner-icon">
          <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 7V11M8 5V5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </span>
        <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
        <button class="broadcast-banner-close" type="button">
          <svg viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>

      <!-- Error -->
      <div class="broadcast-banner broadcast-banner--error">
        <span class="broadcast-banner-icon">
          <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M10 6L6 10M6 6L10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </span>
        <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
        <button class="broadcast-banner-close" type="button">
          <svg viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>

      <!-- Warning -->
      <div class="broadcast-banner broadcast-banner--warning">
        <span class="broadcast-banner-icon">
          <svg viewBox="0 0 16 16" fill="none"><path d="M8 2L14.5 13H1.5L8 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6V9M8 11V11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </span>
        <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
        <button class="broadcast-banner-close" type="button">
          <svg viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>

      <!-- Soft variants -->
      <div class="broadcast-banner broadcast-banner--soft-primary">
        <span class="broadcast-banner-icon">
          <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 7V11M8 5V5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </span>
        <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
        <button class="broadcast-banner-close" type="button">
          <svg viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>

      <div class="broadcast-banner broadcast-banner--soft-error">
        <span class="broadcast-banner-icon">
          <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M10 6L6 10M6 6L10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </span>
        <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
        <button class="broadcast-banner-close" type="button">
          <svg viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>

      <div class="broadcast-banner broadcast-banner--soft-warning">
        <span class="broadcast-banner-icon">
          <svg viewBox="0 0 16 16" fill="none"><path d="M8 2L14.5 13H1.5L8 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6V9M8 11V11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </span>
        <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
        <button class="broadcast-banner-close" type="button">
          <svg viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Exemplo Light/Dark -->
  <div class="demo-section">
    <h2 class="demo-title">Exemplo</h2>

    <div class="demo-row demo-row--example">
      <!-- Light Mode -->
      <div class="demo-col">
        <span class="demo-label">Light Mode</span>
        <div class="demo-example-box demo-example-box--stack">
          <div class="broadcast-banner broadcast-banner--soft-error" style="width: 100%;">
            <span class="broadcast-banner-icon">
              <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M10 6L6 10M6 6L10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
            <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
          </div>
          <div class="broadcast-banner broadcast-banner--soft-info" style="width: 100%;">
            <span class="broadcast-banner-icon">
              <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 7V11M8 5V5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
            <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
          </div>
          <div class="broadcast-banner broadcast-banner--soft-success" style="width: 100%;">
            <span class="broadcast-banner-icon">
              <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
          </div>
          <div class="broadcast-banner broadcast-banner--soft-warning" style="width: 100%;">
            <span class="broadcast-banner-icon">
              <svg viewBox="0 0 16 16" fill="none"><path d="M8 2L14.5 13H1.5L8 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6V9M8 11V11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
            <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
          </div>
        </div>
      </div>

      <!-- Dark Mode -->
      <div class="demo-col">
        <span class="demo-label demo-label--dark">Dark Mode</span>
        <div class="demo-example-box demo-example-box--dark demo-example-box--stack">
          <div class="broadcast-banner broadcast-banner--error" style="width: 100%;">
            <span class="broadcast-banner-icon">
              <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M10 6L6 10M6 6L10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
            <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
          </div>
          <div class="broadcast-banner broadcast-banner--info" style="width: 100%;">
            <span class="broadcast-banner-icon">
              <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 7V11M8 5V5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
            <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
          </div>
          <div class="broadcast-banner broadcast-banner--success" style="width: 100%;">
            <span class="broadcast-banner-icon">
              <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
          </div>
          <div class="broadcast-banner broadcast-banner--warning" style="width: 100%;">
            <span class="broadcast-banner-icon">
              <svg viewBox="0 0 16 16" fill="none"><path d="M8 2L14.5 13H1.5L8 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6V9M8 11V11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
            <span class="broadcast-banner-text">Banner description with <a href="#" class="broadcast-banner-link">link</a></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;export{n as default};
