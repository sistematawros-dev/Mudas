const n=`<section class="page">
  <div class="page-header">
    <h1>Button</h1>
    <p class="page-desc">Button permite ao usuário realizar ações, como enviar um arquivo, atualizar um formulário, compartilhar um documento ou ouvir um comentário.</p>
  </div>

  <!-- Solid Buttons -->
  <div class="demo-section">
    <h2 class="demo-title">Componente / Button / Button Solid</h2>
    <div class="demo-btn-grid">
      <div class="demo-btn-row">
        <button class="btn btn--primary">Label</button>
        <button class="btn btn--info">Label</button>
        <button class="btn btn--success">Label</button>
        <button class="btn btn--warning">Label</button>
        <button class="btn btn--error">Label</button>
        <button class="btn btn--dark">Label</button>
        <button class="btn btn--light">Label</button>
      </div>
      <div class="demo-btn-row">
        <button class="btn btn--primary"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
        <button class="btn btn--info"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
        <button class="btn btn--success"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
        <button class="btn btn--warning"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
        <button class="btn btn--error"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
        <button class="btn btn--dark"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
      </div>
      <div class="demo-btn-row">
        <button class="btn btn--primary">Label<span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
        <button class="btn btn--info">Label<span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
        <button class="btn btn--success">Label<span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
        <button class="btn btn--warning">Label<span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
        <button class="btn btn--error">Label<span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
        <button class="btn btn--dark">Label<span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
      </div>
      <div class="demo-btn-row">
        <button class="btn btn--primary" disabled>Label</button>
        <button class="btn btn--info" disabled>Label</button>
        <button class="btn btn--success" disabled>Label</button>
      </div>
    </div>
  </div>

  <!-- Outlined Buttons -->
  <div class="demo-section">
    <h2 class="demo-title">Componente / Button / Button Outlined</h2>
    <div class="demo-btn-grid">
      <div class="demo-btn-row">
        <button class="btn btn--outline-primary">Label</button>
        <button class="btn btn--outline-info">Label</button>
        <button class="btn btn--outline-success">Label</button>
        <button class="btn btn--outline-warning">Label</button>
        <button class="btn btn--outline-error">Label</button>
        <button class="btn btn--outline-dark">Label</button>
      </div>
      <div class="demo-btn-row">
        <button class="btn btn--outline-primary"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
        <button class="btn btn--outline-info"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
        <button class="btn btn--outline-success"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
        <button class="btn btn--outline-warning"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
        <button class="btn btn--outline-error"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
        <button class="btn btn--outline-dark"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
      </div>
      <div class="demo-btn-row">
        <button class="btn btn--outline-primary" disabled>Label</button>
        <button class="btn btn--outline-info" disabled>Label</button>
      </div>
    </div>
  </div>

  <!-- Text Buttons -->
  <div class="demo-section">
    <h2 class="demo-title">Componente / Button / Button Text</h2>
    <div class="demo-btn-grid">
      <div class="demo-btn-row">
        <button class="btn btn--text-primary">Label</button>
        <button class="btn btn--text-info">Label</button>
        <button class="btn btn--text-success">Label</button>
        <button class="btn btn--text-warning">Label</button>
        <button class="btn btn--text-error">Label</button>
        <button class="btn btn--text-dark">Label</button>
      </div>
      <div class="demo-btn-row">
        <button class="btn btn--text-primary"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
        <button class="btn btn--text-info"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
        <button class="btn btn--text-success"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
        <button class="btn btn--text-warning"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
        <button class="btn btn--text-error"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
        <button class="btn btn--text-dark"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Label</button>
      </div>
    </div>
  </div>

  <!-- Sizes -->
  <div class="demo-section">
    <h2 class="demo-title">Componente / Button / Button Sized</h2>
    <div class="demo-btn-grid">
      <div class="demo-btn-row">
        <button class="btn btn--primary btn--sm">Label</button>
        <button class="btn btn--primary">Label</button>
        <button class="btn btn--primary btn--lg">Label</button>
      </div>
      <div class="demo-btn-row">
        <button class="btn btn--outline-primary btn--sm">Label</button>
        <button class="btn btn--outline-primary">Label</button>
        <button class="btn btn--outline-primary btn--lg">Label</button>
      </div>
    </div>
  </div>

  <!-- Exemplo Light/Dark -->
  <div class="demo-section">
    <h2 class="demo-title">Exemplo</h2>
    <div class="demo-row demo-row--example">
      <div class="demo-col">
        <span class="demo-label">Light Mode</span>
        <div class="demo-example-box demo-example-box--stack">
          <div class="demo-btn-row">
            <button class="btn btn--primary">Cadastrar</button>
            <button class="btn btn--soft-primary">Desfazer</button>
            <button class="btn btn--outline-primary">Cancelar</button>
          </div>
          <div class="demo-btn-row">
            <button class="btn btn--success"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Confirmar</button>
            <button class="btn btn--error"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Deletar</button>
          </div>
          <div class="demo-btn-row">
            <button class="btn btn--text-primary">+ Go back</button>
            <button class="btn btn--text-info">+ Go back</button>
            <button class="btn btn--text-error">+ Go back</button>
          </div>
          <div class="demo-btn-row">
            <button class="btn btn--primary btn--block">Esqueci minha senha</button>
          </div>
        </div>
      </div>

      <div class="demo-col">
        <span class="demo-label demo-label--dark">Dark Mode</span>
        <div class="demo-example-box demo-example-box--dark demo-example-box--stack">
          <div class="demo-btn-row">
            <button class="btn btn--primary">Cadastrar</button>
            <button class="btn btn--info">Desfazer</button>
            <button class="btn btn--outline-info btn--dark-mode">Cancelar</button>
          </div>
          <div class="demo-btn-row">
            <button class="btn btn--success"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Confirmar</button>
            <button class="btn btn--error"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>Deletar</button>
          </div>
          <div class="demo-btn-row">
            <button class="btn btn--text-info btn--dark-mode">+ Go back</button>
            <button class="btn btn--text-info btn--dark-mode">+ Go back</button>
            <button class="btn btn--text-error btn--dark-mode">+ Go back</button>
          </div>
          <div class="demo-btn-row">
            <button class="btn btn--info btn--block">Esqueci minha senha</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Icon Only & Upload -->
  <div class="demo-section">
    <h2 class="demo-title">Icon Only & Upload</h2>
    <div class="demo-row demo-row--example">
      <div class="demo-col">
        <div class="demo-example-box">
          <div class="demo-btn-row">
            <button class="btn btn--primary btn--icon-only"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span></button>
            <button class="btn btn--outline-dark btn--icon-only"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span></button>
            <button class="btn btn--light btn--icon-only"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span></button>
          </div>
        </div>
      </div>
      <div class="demo-col">
        <div class="demo-example-box demo-example-box--dark">
          <div class="demo-btn-row">
            <button class="btn btn--info btn--icon-only"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span></button>
            <button class="btn btn--outline-info btn--icon-only btn--dark-mode"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span></button>
            <button class="btn btn--light btn--icon-only btn--dark-mode"><span class="btn-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;export{n as default};
