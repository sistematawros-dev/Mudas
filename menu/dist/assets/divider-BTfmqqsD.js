const i=`<div class="page">
  <div class="page-header">
    <h1>Divider</h1>
    <p class="page-desc">Um Divider é uma linha fina usada para separar ou agrupar conteúdo em listas e layouts.</p>
  </div>

  <!-- Horizontal Dividers -->
  <section class="demo-section">
    <h2 class="demo-title">Divider Horizontal</h2>
    <div class="demo-grid-2">
      <div class="demo-box">
        <span class="demo-label">Thickness: 1px</span>
        <div class="demo-divider-list" id="divider-horizontal-1px"></div>
      </div>
      <div class="demo-box">
        <span class="demo-label">Thickness: 2px</span>
        <div class="demo-divider-list" id="divider-horizontal-2px"></div>
      </div>
    </div>
  </section>

  <!-- Vertical Dividers -->
  <section class="demo-section">
    <h2 class="demo-title">Divider Vertical</h2>
    <div class="demo-grid-2">
      <div class="demo-box">
        <span class="demo-label">Thickness: 1px</span>
        <div class="demo-vertical-container" id="divider-vertical-1px"></div>
      </div>
      <div class="demo-box">
        <span class="demo-label">Thickness: 2px</span>
        <div class="demo-vertical-container" id="divider-vertical-2px"></div>
      </div>
    </div>
  </section>

  <!-- Divider Styles -->
  <section class="demo-section">
    <h2 class="demo-title">Estilos</h2>
    <div class="demo-box" style="max-width: 500px;" id="divider-styles"></div>
  </section>

  <!-- Divider with Text -->
  <section class="demo-section">
    <h2 class="demo-title">Com Texto</h2>
    <div class="demo-box" style="max-width: 500px;" id="divider-with-text"></div>
  </section>

  <!-- Light / Dark Mode -->
  <section class="demo-section">
    <h2 class="demo-title">Light / Dark Mode</h2>
    <div class="demo-grid-2">
      <div class="demo-box">
        <span class="demo-label">Light Mode</span>
        <div id="divider-light"></div>
      </div>
      <div class="demo-box demo-box--dark">
        <span class="demo-label demo-label--dark">Dark Mode</span>
        <div id="divider-dark"></div>
      </div>
    </div>
  </section>
</div>
`;export{i as default};
