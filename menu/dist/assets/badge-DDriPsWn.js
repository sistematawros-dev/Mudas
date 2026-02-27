const n=`<section class="page">
  <div class="page-header">
    <h1>Badge</h1>
    <p class="page-desc">Os componentes de Badge são usados para transmitir informações dinâmicas, como uma contagem ou status.</p>
  </div>

  <div class="demo-section">
    <h2 class="demo-title">Componente / Badge</h2>

    <div class="demo-badge-grid">
      <!-- Linha 1: Filled -->
      <div class="demo-badge-row">
        <span class="badge badge--primary">Badge</span>
        <span class="badge badge--info">Badge</span>
        <span class="badge badge--success">Badge</span>
        <span class="badge badge--warning">Badge</span>
        <span class="badge badge--error">Badge</span>
        <span class="badge badge--dark">Badge</span>
        <span class="badge badge--light">Badge</span>
      </div>

      <!-- Linha 2: Soft -->
      <div class="demo-badge-row">
        <span class="badge badge--soft-primary">Badge</span>
        <span class="badge badge--soft-info">Badge</span>
        <span class="badge badge--soft-success">Badge</span>
        <span class="badge badge--soft-warning">Badge</span>
        <span class="badge badge--soft-error">Badge</span>
        <span class="badge badge--soft-dark">Badge</span>
      </div>

      <!-- Linha 3: Outline -->
      <div class="demo-badge-row">
        <span class="badge badge--outline-primary">Badge</span>
        <span class="badge badge--outline-info">Badge</span>
        <span class="badge badge--outline-success">Badge</span>
        <span class="badge badge--outline-warning">Badge</span>
        <span class="badge badge--outline-error">Badge</span>
        <span class="badge badge--outline-dark">Badge</span>
      </div>
    </div>
  </div>

  <!-- Exemplo Light/Dark -->
  <div class="demo-section">
    <h2 class="demo-title">Exemplo</h2>

    <div class="demo-row demo-row--example">
      <!-- Dark Mode -->
      <div class="demo-col">
        <span class="demo-label demo-label--dark">Dark Mode</span>
        <div class="demo-example-box demo-example-box--dark">
          <div class="demo-badge-stack">
            <span class="badge badge--info">
              <span class="badge-icon">
                <svg viewBox="0 0 14 14" fill="none"><path d="M11.5 4L5.5 10L2.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              Badge
            </span>

            <span class="badge badge--soft-info badge--dark-mode">
              Badge
            </span>

            <span class="badge badge--outline-info">
              Badge 2
            </span>

            <span class="badge badge--warning">
              <span class="badge-icon">
                <svg viewBox="0 0 14 14" fill="none"><path d="M11.5 4L5.5 10L2.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              Alteracoes
            </span>

            <span class="badge badge--soft-success badge--dark-mode">
              <span class="badge-icon">
                <svg viewBox="0 0 14 14" fill="none"><path d="M11.5 4L5.5 10L2.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              Completed
            </span>
          </div>
        </div>
      </div>

      <!-- Light Mode -->
      <div class="demo-col">
        <span class="demo-label">Dark Mode</span>
        <div class="demo-example-box">
          <div class="demo-badge-stack">
            <span class="badge badge--info">
              <span class="badge-icon">
                <svg viewBox="0 0 14 14" fill="none"><path d="M11.5 4L5.5 10L2.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              Badge
            </span>

            <span class="badge badge--soft-info">
              Badge
            </span>

            <span class="badge badge--outline-info">
              Badge 2
            </span>

            <span class="badge badge--warning">
              <span class="badge-icon">
                <svg viewBox="0 0 14 14" fill="none"><path d="M11.5 4L5.5 10L2.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              Alteracoes
            </span>

            <span class="badge badge--soft-success">
              <span class="badge-icon">
                <svg viewBox="0 0 14 14" fill="none"><path d="M11.5 4L5.5 10L2.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;export{n as default};
