const n=`<section class="page">
  <div class="page-header">
    <h1>Accordion</h1>
    <p class="page-desc">O componente Accordion permite que o usuário mostre e oculte seções de conteúdo em uma página.</p>
  </div>

  <div class="demo-section">
    <h2 class="demo-title">Componente / Accordion</h2>

    <div class="demo-row">
      <!-- Default -->
      <div class="demo-col">
        <span class="demo-label">default</span>
        <div class="accordion accordion--bordered" data-accordion="single">
          <div class="accordion-item">
            <button class="accordion-header" type="button">
              <span class="accordion-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="5" width="10" height="2" rx="1" fill="currentColor"/>
                  <rect x="5" y="1" width="2" height="10" rx="1" fill="currentColor"/>
                </svg>
              </span>
              <span class="accordion-title">Accordion item title</span>
              <span class="accordion-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            </button>
            <div class="accordion-content">
              <div class="accordion-inner">
                <div class="accordion-body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header" type="button">
              <span class="accordion-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="5" width="10" height="2" rx="1" fill="currentColor"/>
                  <rect x="5" y="1" width="2" height="10" rx="1" fill="currentColor"/>
                </svg>
              </span>
              <span class="accordion-title">Accordion item title</span>
              <span class="accordion-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            </button>
            <div class="accordion-content">
              <div class="accordion-inner">
                <div class="accordion-body">
                  Lorem ipsum dolor sit amet.
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item is-open">
            <button class="accordion-header" type="button">
              <span class="accordion-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="5" width="10" height="2" rx="1" fill="currentColor"/>
                </svg>
              </span>
              <span class="accordion-title">Accordion item title</span>
              <span class="accordion-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            </button>
            <div class="accordion-content">
              <div class="accordion-inner">
                <div class="accordion-body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  <div class="accordion-slot">
                    <span class="accordion-slot-label">Slot</span>
                    <span class="accordion-slot-desc">Substitua por Componente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header" type="button">
              <span class="accordion-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="5" width="10" height="2" rx="1" fill="currentColor"/>
                  <rect x="5" y="1" width="2" height="10" rx="1" fill="currentColor"/>
                </svg>
              </span>
              <span class="accordion-title">Accordion item title</span>
              <span class="accordion-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            </button>
            <div class="accordion-content">
              <div class="accordion-inner">
                <div class="accordion-body">
                  Lorem ipsum dolor sit amet.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filled variant -->
      <div class="demo-col">
        <span class="demo-label">filled</span>
        <div class="accordion accordion--bordered accordion--filled" data-accordion="single">
          <div class="accordion-item">
            <button class="accordion-header" type="button">
              <span class="accordion-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="5" width="10" height="2" rx="1" fill="currentColor"/>
                  <rect x="5" y="1" width="2" height="10" rx="1" fill="currentColor"/>
                </svg>
              </span>
              <span class="accordion-title">Accordion item title</span>
              <span class="accordion-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            </button>
            <div class="accordion-content">
              <div class="accordion-inner">
                <div class="accordion-body">
                  Lorem ipsum dolor sit amet.
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item is-open">
            <button class="accordion-header" type="button">
              <span class="accordion-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="5" width="10" height="2" rx="1" fill="currentColor"/>
                </svg>
              </span>
              <span class="accordion-title">Accordion item title</span>
              <span class="accordion-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            </button>
            <div class="accordion-content">
              <div class="accordion-inner">
                <div class="accordion-body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  <div class="accordion-slot">
                    <span class="accordion-slot-label">Slot</span>
                    <span class="accordion-slot-desc">Substitua por Componente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header" type="button">
              <span class="accordion-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="5" width="10" height="2" rx="1" fill="currentColor"/>
                  <rect x="5" y="1" width="2" height="10" rx="1" fill="currentColor"/>
                </svg>
              </span>
              <span class="accordion-title">Accordion item title</span>
              <span class="accordion-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            </button>
            <div class="accordion-content">
              <div class="accordion-inner">
                <div class="accordion-body">
                  Lorem ipsum dolor sit amet.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Exemplo Light/Dark -->
  <div class="demo-section">
    <h2 class="demo-title">Exemplo</h2>

    <div class="demo-row demo-row--example">
      <div class="demo-col">
        <span class="demo-label">Light Mode</span>
        <div class="accordion accordion--bordered" data-accordion="single">
          <div class="accordion-item">
            <button class="accordion-header" type="button">
              <span class="accordion-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="5" width="10" height="2" rx="1" fill="currentColor"/>
                  <rect x="5" y="1" width="2" height="10" rx="1" fill="currentColor"/>
                </svg>
              </span>
              <span class="accordion-title">Accordion item title</span>
              <span class="accordion-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            </button>
            <div class="accordion-content">
              <div class="accordion-inner">
                <div class="accordion-body">Lorem ipsum dolor sit amet.</div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header" type="button">
              <span class="accordion-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="5" width="10" height="2" rx="1" fill="currentColor"/>
                  <rect x="5" y="1" width="2" height="10" rx="1" fill="currentColor"/>
                </svg>
              </span>
              <span class="accordion-title">Accordion item title</span>
              <span class="accordion-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            </button>
            <div class="accordion-content">
              <div class="accordion-inner">
                <div class="accordion-body">Lorem ipsum dolor sit amet.</div>
              </div>
            </div>
          </div>
          <div class="accordion-item is-open">
            <button class="accordion-header" type="button">
              <span class="accordion-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="5" width="10" height="2" rx="1" fill="currentColor"/>
                </svg>
              </span>
              <span class="accordion-title">Accordion item title</span>
              <span class="accordion-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            </button>
            <div class="accordion-content">
              <div class="accordion-inner">
                <div class="accordion-body">
                  A Tawros Labs é uma empresa que está trabalhando há 10 anos para transformar a indústria de tecnologia no mundo digital.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-col">
        <span class="demo-label demo-label--dark">Dark Mode</span>
        <div class="accordion accordion--dark" data-accordion="single">
          <div class="accordion-item">
            <button class="accordion-header" type="button">
              <span class="accordion-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="5" width="10" height="2" rx="1" fill="currentColor"/>
                  <rect x="5" y="1" width="2" height="10" rx="1" fill="currentColor"/>
                </svg>
              </span>
              <span class="accordion-title">Accordion item title</span>
              <span class="accordion-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            </button>
            <div class="accordion-content">
              <div class="accordion-inner">
                <div class="accordion-body">Lorem ipsum dolor sit amet.</div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header" type="button">
              <span class="accordion-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="5" width="10" height="2" rx="1" fill="currentColor"/>
                  <rect x="5" y="1" width="2" height="10" rx="1" fill="currentColor"/>
                </svg>
              </span>
              <span class="accordion-title">Accordion item title</span>
              <span class="accordion-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            </button>
            <div class="accordion-content">
              <div class="accordion-inner">
                <div class="accordion-body">Lorem ipsum dolor sit amet.</div>
              </div>
            </div>
          </div>
          <div class="accordion-item is-open">
            <button class="accordion-header" type="button">
              <span class="accordion-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="5" width="10" height="2" rx="1" fill="currentColor"/>
                </svg>
              </span>
              <span class="accordion-title">Accordion item title</span>
              <span class="accordion-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            </button>
            <div class="accordion-content">
              <div class="accordion-inner">
                <div class="accordion-body">
                  A Tawros Labs é uma empresa que está trabalhando há 10 anos para transformar a indústria de tecnologia no mundo digital.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;export{n as default};
