const o=`<div class="page">
  <div class="page-header">
    <h1>Modal / Bottom Sheet</h1>
    <p class="page-desc">O componente modal fornece uma base para a criação de popovers, formulários suspensos, tutoriais ou qualquer outro conteúdo acima da superfície principal da UI.</p>
  </div>

  <!-- Triggers -->
  <section class="demo-section">
    <h2 class="demo-title">Modal Padrão</h2>
    <div class="demo-row">
      <button class="btn btn--primary" data-modal-open="modal-default">Abrir Modal</button>
      <button class="btn btn--outline" data-modal-open="modal-with-slot">Modal com Slot</button>
    </div>
  </section>

  <!-- Confirmation Modals -->
  <section class="demo-section">
    <h2 class="demo-title">Modais de Confirmação</h2>
    <div class="demo-row">
      <button class="btn btn--outline" data-modal-open="modal-confirm">Confirmar Ação</button>
      <button class="btn btn--outline" data-modal-open="modal-danger">Ação Destrutiva</button>
      <button class="btn btn--outline" data-modal-open="modal-success">Sucesso</button>
    </div>
  </section>

  <!-- Bottom Sheets -->
  <section class="demo-section">
    <h2 class="demo-title">Bottom Sheets</h2>
    <div class="demo-row">
      <button class="btn btn--outline" data-modal-open="bottom-sheet">Bottom Sheet</button>
      <button class="btn btn--outline" data-modal-open="bottom-filters">Filtros</button>
    </div>
  </section>

  <!-- Sizes -->
  <section class="demo-section">
    <h2 class="demo-title">Tamanhos</h2>
    <div class="demo-row">
      <button class="btn btn--outline" data-modal-open="modal-sm">Small</button>
      <button class="btn btn--outline" data-modal-open="modal-md">Medium</button>
      <button class="btn btn--outline" data-modal-open="modal-lg">Large</button>
    </div>
  </section>

  <!-- Light / Dark Mode -->
  <section class="demo-section">
    <h2 class="demo-title">Light / Dark Mode</h2>
    <div class="demo-row">
      <button class="btn btn--outline" data-modal-open="modal-light">Light Modal</button>
      <button class="btn btn--primary" data-modal-open="modal-dark">Dark Modal</button>
    </div>
  </section>

  <!-- Modal Containers -->
  <div id="modal-containers"></div>
</div>
`;export{o as default};
