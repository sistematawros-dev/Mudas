/* empty css               */const h=`<div class="header" id="app-header">
  <div class="header-top">
    <div class="header-left">
      <button class="header-menu-toggle" aria-label="Alternar menu">
        <img src="/assets/menu-icon.png" alt="Menu" width="24" height="24">
      </button>
      <div class="header-context">
        <h1 class="header-title" id="page-title">Painel</h1>
        <nav class="header-breadcrumb" id="breadcrumb" aria-label="Breadcrumb"></nav>
      </div>
    </div>

    <!-- Right Section -->
    <div class="header-right">
      <!-- Filial Dropdown -->
      <div class="header-dropdown">
        <button class="header-dropdown-btn">
          <span>Filial Fazenda XYZ</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Notifications -->
      <button class="header-icon-btn" aria-label="Notificações">
        <img src="/assets/notification-bell.png" alt="Notificações" width="18" height="18">
      </button>

      <!-- Settings -->
      <button class="header-icon-btn" aria-label="Configurações">
        <img src="/assets/settings-gear.png" alt="Configurações" width="18" height="18">
      </button>

      <!-- Ajuda Dropdown -->
      <div class="header-dropdown">
        <button class="header-dropdown-btn">
          <span>Ajuda</span>
          <img src="/assets/help-icon.png" alt="" width="14" height="14">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <nav class="header-tabs" id="header-tabs" aria-label="Navegação de produção"></nav>
  <nav class="header-subtabs" id="header-subtabs" aria-label="Navegação secundária"></nav>
</div>
`;function w(n){n.innerHTML=h}function E(){window.addEventListener("route:change",i);const n=document.getElementById("header-tabs");return n&&n.addEventListener("click",c),()=>{window.removeEventListener("route:change",i),n&&n.removeEventListener("click",c)}}function i(n){const{route:e}=n.detail;if(!e)return;u(e.pageTitle);const a=e.headerBreadcrumb||e.breadcrumb,t=Array.isArray(e.headerTabs)?e.headerTabs:[],r=Array.isArray(e.headerSubTabs)?e.headerSubTabs:[],d=e.headerActiveTab||"",o=e.headerActiveSubTab||"";b(a),m(t,d),p(r,o),g(t.length>0||r.length>0,a&&a.length>0)}function u(n){const e=document.getElementById("page-title");e&&n&&(e.textContent=n)}function b(n){const e=document.getElementById("breadcrumb");e&&(e.innerHTML="",!(!n||n.length===0)&&n.forEach((a,t)=>{const r=t===n.length-1,d=t===0;if(t>0){const s=document.createElement("span");s.className="header-breadcrumb__separator",s.innerHTML=`
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `,e.appendChild(s)}if(r){const s=document.createElement("span");s.className="header-breadcrumb__item header-breadcrumb__item--current",s.innerHTML=`${d?l():""}<span>${a}</span>`,e.appendChild(s);return}const o=document.createElement("a");o.className="header-breadcrumb__item",o.innerHTML=`${d?l():""}<span>${a}</span>`,o.href=v(a),e.appendChild(o)}))}function m(n,e){const a=document.getElementById("header-tabs");a&&(a.innerHTML="",n.forEach(t=>{const r=document.createElement("a");r.className="header-tab",r.href=t.mode?"#":t.href||window.location.hash||"#/dashboard",t.mode&&(r.dataset.mode=t.mode),r.textContent=t.label,(t.label===e||t.active)&&r.classList.add("header-tab--active"),a.appendChild(r)}))}function p(n,e){const a=document.getElementById("header-subtabs");a&&(a.innerHTML="",n.forEach(t=>{const r=document.createElement("a");r.className="header-subtab",r.href=t.href||window.location.hash||"#/dashboard",r.textContent=t.label,(t.label===e||t.active)&&r.classList.add("header-subtab--active"),a.appendChild(r)}))}function c(n){const e=n.target.closest(".header-tab");if(!e)return;const a=e.dataset.mode;if(!a)return;n.preventDefault();const t=e.parentElement;t&&t.querySelectorAll(".header-tab").forEach(r=>r.classList.remove("header-tab--active")),e.classList.add("header-tab--active"),window.dispatchEvent(new CustomEvent("header:tabchange",{detail:{mode:a,label:e.textContent?.trim()||""}}))}function g(n,e=!1){const a=document.getElementById("app-header"),t=document.getElementById("page-title");a&&(a.classList.toggle("header--contextual",n),t&&(t.style.display=e?"none":"block"))}function v(n){return{Painel:"#/dashboard",Cadastros:"#/cadastros",Pedidos:"#/pedidos",Estufas:"#/kanban-producao",Produção:"#/producao","Kanban de Produção":"#/kanban-producao",Componentes:"#/components/accordion",Ícones:"#/icons"}[n]||"#/dashboard"}function l(){return`
    <svg class="header-breadcrumb__home" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 11.5L12 4L21 11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.75 10.75V19H17.25V10.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `}export{E as init,w as render};
