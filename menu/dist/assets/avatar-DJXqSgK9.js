const a=`<section class="page">
  <div class="page-header">
    <h1>Avatar</h1>
    <p class="page-desc">O componente Avatar é normalmente usado para exibir fotos circulares de perfil do usuário.</p>
  </div>

  <div class="demo-grid">
    <!-- Avatar Single -->
    <div class="demo-section">
      <h2 class="demo-title">Componente / Avatar / Avatar Single</h2>

      <div class="demo-avatar-grid">
        <!-- Coluna de tamanhos -->
        <div class="demo-col">
          <!-- XL -->
          <span class="avatar avatar--xl">
            <img src="https://i.pravatar.cc/150?img=1" alt="User" />
          </span>
          <!-- LG -->
          <span class="avatar avatar--lg">
            <img src="https://i.pravatar.cc/150?img=1" alt="User" />
          </span>
          <!-- MD -->
          <span class="avatar avatar--md">
            <img src="https://i.pravatar.cc/150?img=1" alt="User" />
          </span>
          <!-- SM -->
          <span class="avatar avatar--sm">
            <img src="https://i.pravatar.cc/150?img=1" alt="User" />
          </span>
          <!-- XS -->
          <span class="avatar avatar--xs">
            <img src="https://i.pravatar.cc/150?img=1" alt="User" />
          </span>
        </div>

        <!-- Coluna com status -->
        <div class="demo-col">
          <span class="avatar avatar--xl">
            <img src="https://i.pravatar.cc/150?img=2" alt="User" />
            <span class="avatar-status avatar-status--online"></span>
          </span>
          <span class="avatar avatar--lg">
            <img src="https://i.pravatar.cc/150?img=2" alt="User" />
            <span class="avatar-status avatar-status--online"></span>
          </span>
          <span class="avatar avatar--md">
            <img src="https://i.pravatar.cc/150?img=2" alt="User" />
            <span class="avatar-status avatar-status--online"></span>
          </span>
          <span class="avatar avatar--sm">
            <img src="https://i.pravatar.cc/150?img=2" alt="User" />
            <span class="avatar-status avatar-status--online"></span>
          </span>
          <span class="avatar avatar--xs">
            <img src="https://i.pravatar.cc/150?img=2" alt="User" />
            <span class="avatar-status avatar-status--online"></span>
          </span>
        </div>

        <!-- Coluna com status busy -->
        <div class="demo-col">
          <span class="avatar avatar--xl">
            <img src="https://i.pravatar.cc/150?img=3" alt="User" />
            <span class="avatar-status avatar-status--busy"></span>
          </span>
          <span class="avatar avatar--lg">
            <img src="https://i.pravatar.cc/150?img=3" alt="User" />
            <span class="avatar-status avatar-status--busy"></span>
          </span>
          <span class="avatar avatar--md">
            <img src="https://i.pravatar.cc/150?img=3" alt="User" />
            <span class="avatar-status avatar-status--busy"></span>
          </span>
          <span class="avatar avatar--sm">
            <img src="https://i.pravatar.cc/150?img=3" alt="User" />
            <span class="avatar-status avatar-status--busy"></span>
          </span>
          <span class="avatar avatar--xs">
            <img src="https://i.pravatar.cc/150?img=3" alt="User" />
            <span class="avatar-status avatar-status--busy"></span>
          </span>
        </div>

        <!-- Coluna com iniciais -->
        <div class="demo-col">
          <span class="avatar avatar--xl avatar--primary">JD</span>
          <span class="avatar avatar--lg avatar--primary">JD</span>
          <span class="avatar avatar--md avatar--primary">JD</span>
          <span class="avatar avatar--sm avatar--primary">JD</span>
          <span class="avatar avatar--xs avatar--primary">JD</span>
        </div>

        <!-- Coluna info -->
        <div class="demo-col">
          <span class="avatar avatar--xl avatar--info">AB</span>
          <span class="avatar avatar--lg avatar--info">AB</span>
          <span class="avatar avatar--md avatar--info">AB</span>
          <span class="avatar avatar--sm avatar--info">AB</span>
          <span class="avatar avatar--xs avatar--info">AB</span>
        </div>
      </div>
    </div>

    <!-- Avatar Group -->
    <div class="demo-section">
      <h2 class="demo-title">Componente / Avatar / Avatar Group</h2>

      <div class="demo-avatar-groups">
        <!-- Grupo XL -->
        <div class="avatar-group">
          <span class="avatar avatar--xl">
            <img src="https://i.pravatar.cc/150?img=10" alt="User" />
          </span>
          <span class="avatar avatar--xl">
            <img src="https://i.pravatar.cc/150?img=11" alt="User" />
          </span>
          <span class="avatar avatar--xl">
            <img src="https://i.pravatar.cc/150?img=12" alt="User" />
          </span>
          <span class="avatar avatar--xl avatar--primary">JD</span>
          <span class="avatar avatar--xl avatar--info">+8</span>
        </div>

        <!-- Grupo LG -->
        <div class="avatar-group">
          <span class="avatar avatar--lg">
            <img src="https://i.pravatar.cc/150?img=10" alt="User" />
          </span>
          <span class="avatar avatar--lg">
            <img src="https://i.pravatar.cc/150?img=11" alt="User" />
          </span>
          <span class="avatar avatar--lg">
            <img src="https://i.pravatar.cc/150?img=12" alt="User" />
          </span>
          <span class="avatar avatar--lg avatar--primary">JD</span>
          <span class="avatar avatar--lg avatar--info">+8</span>
        </div>

        <!-- Grupo MD -->
        <div class="avatar-group">
          <span class="avatar avatar--md">
            <img src="https://i.pravatar.cc/150?img=10" alt="User" />
          </span>
          <span class="avatar avatar--md">
            <img src="https://i.pravatar.cc/150?img=11" alt="User" />
          </span>
          <span class="avatar avatar--md">
            <img src="https://i.pravatar.cc/150?img=12" alt="User" />
          </span>
          <span class="avatar avatar--md avatar--primary">JD</span>
          <span class="avatar avatar--md avatar--info">+8</span>
        </div>

        <!-- Grupo SM -->
        <div class="avatar-group">
          <span class="avatar avatar--sm">
            <img src="https://i.pravatar.cc/150?img=10" alt="User" />
          </span>
          <span class="avatar avatar--sm">
            <img src="https://i.pravatar.cc/150?img=11" alt="User" />
          </span>
          <span class="avatar avatar--sm">
            <img src="https://i.pravatar.cc/150?img=12" alt="User" />
          </span>
          <span class="avatar avatar--sm avatar--primary">JD</span>
          <span class="avatar avatar--sm avatar--info">+8</span>
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
        <div class="demo-example-box">
          <div class="avatar-group">
            <span class="avatar avatar--lg">
              <img src="https://i.pravatar.cc/150?img=20" alt="User" />
            </span>
            <span class="avatar avatar--lg">
              <img src="https://i.pravatar.cc/150?img=21" alt="User" />
            </span>
            <span class="avatar avatar--lg">
              <img src="https://i.pravatar.cc/150?img=22" alt="User" />
            </span>
            <span class="avatar avatar--lg avatar--primary">+5</span>
          </div>
        </div>
      </div>

      <div class="demo-col">
        <span class="demo-label demo-label--dark">Dark Mode</span>
        <div class="demo-example-box demo-example-box--dark">
          <div class="avatar-group avatar-group--dark">
            <span class="avatar avatar--lg">
              <img src="https://i.pravatar.cc/150?img=20" alt="User" />
            </span>
            <span class="avatar avatar--lg">
              <img src="https://i.pravatar.cc/150?img=21" alt="User" />
            </span>
            <span class="avatar avatar--lg">
              <img src="https://i.pravatar.cc/150?img=22" alt="User" />
            </span>
            <span class="avatar avatar--lg avatar--info">+5</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;export{a as default};
