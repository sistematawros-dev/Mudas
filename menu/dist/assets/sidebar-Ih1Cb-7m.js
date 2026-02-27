/* empty css                */const v=`\uFEFF<nav class="sidebar" aria-label="Menu principal">
  <!-- Header -->
  <div class="sidebar-header">
    <img src="/assets/logo-tawros.png" alt="Tawros" class="sidebar-logo sidebar-logo--full" />
    <img src="/assets/logo-colapsada.png" alt="Tawros" class="sidebar-logo sidebar-logo--icon" />
  </div>

  <!-- Search -->
  <div class="sidebar-search">
    <input type="text" class="sidebar-search-input" placeholder="Buscar" aria-label="Buscar no menu" />
    <svg class="sidebar-search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </div>

  <!-- Menu -->
  <ul class="sidebar-menu" role="list">
    <!-- Search icon (collapsed only) -->
    <li class="sidebar-item sidebar-item--search-collapsed">
      <button class="sidebar-link" aria-label="Buscar">
        <img src="/assets/lupa.png" alt="" class="sidebar-search-icon-collapsed" />
      </button>
    </li>

    <!-- Painel/Dashboard -->
    <li class="sidebar-item">
      <a href="#/dashboard" class="sidebar-link" data-route="/dashboard">
        <svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        <span class="sidebar-text">Painel</span>
      </a>
    </li>

    <!-- Cadastros -->
    <li class="sidebar-item sidebar-item--has-submenu">
      <button class="sidebar-link" data-toggle="cadastros" data-route="/cadastros" aria-expanded="false">
        <img src="/assets/cadastros.png" alt="" class="sidebar-icon" />
        <span class="sidebar-text">Cadastros</span>
        <svg class="sidebar-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
      <ul class="sidebar-submenu" data-submenu="cadastros" role="list">
        <!-- Pessoas e Empresas -->
        <li class="sidebar-item sidebar-item--has-submenu">
          <button class="sidebar-link sidebar-link--sub" data-toggle="pessoas-empresas"
            data-route="/cadastros" aria-expanded="false">
            <span class="sidebar-text">Pessoas e Empresas</span>
            <svg class="sidebar-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <ul class="sidebar-submenu sidebar-submenu--nested" data-submenu="pessoas-empresas" role="list">
            <li class="sidebar-item">
              <a href="#/cadastros" class="sidebar-link sidebar-link--nested"
                data-route="/cadastros">
                <span class="sidebar-text">Pessoas e Empresas</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a href="#/cadastros/pessoas-empresas/grupo-empresa" class="sidebar-link sidebar-link--nested"
                data-route="/cadastros/pessoas-empresas/grupo-empresa">
                <span class="sidebar-text">Grupo de Empresa</span>
              </a>
            </li>
            <li class="sidebar-item">
              <button type="button" class="sidebar-link sidebar-link--nested is-disabled" aria-disabled="true" disabled>
                <span class="sidebar-text">Categoria</span>
              </button>
            </li>
            <li class="sidebar-item">
              <button type="button" class="sidebar-link sidebar-link--nested is-disabled" aria-disabled="true" disabled>
                <span class="sidebar-text">Setor</span>
              </button>
            </li>
            <li class="sidebar-item">
              <button type="button" class="sidebar-link sidebar-link--nested is-disabled" aria-disabled="true" disabled>
                <span class="sidebar-text">Ramo</span>
              </button>
            </li>
          </ul>
        </li>

        <!-- Produtos e Serviços -->
        <li class="sidebar-item sidebar-item--has-submenu">
          <button class="sidebar-link sidebar-link--sub" data-toggle="produtos-servicos"
            data-route="/cadastros/produtos-servicos" aria-expanded="false">
            <span class="sidebar-text">Produtos e Serviços</span>
            <svg class="sidebar-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <ul class="sidebar-submenu sidebar-submenu--nested" data-submenu="produtos-servicos" role="list">            <li class="sidebar-item">
              <a href="#/cadastros/produtos-servicos" class="sidebar-link sidebar-link--nested"
                data-route="/cadastros/produtos-servicos">
                <span class="sidebar-text">Produtos e Serviços</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a href="#/cadastros/produtos-servicos/classificacao" class="sidebar-link sidebar-link--nested"
                data-route="/cadastros/produtos-servicos/classificacao">
                <span class="sidebar-text">Classificação</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a href="#/cadastros/produtos-servicos/unidades-medida" class="sidebar-link sidebar-link--nested"
                data-route="/cadastros/produtos-servicos/unidades-medida">
                <span class="sidebar-text">Unidades de Medida</span>
              </a>
            </li>
            <li class="sidebar-item">
              <button type="button" class="sidebar-link sidebar-link--nested is-disabled" aria-disabled="true" disabled>
                <span class="sidebar-text">Complementares</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </li>

    <!-- BI e Relatórios -->
    <li class="sidebar-item">
      <button type="button" class="sidebar-link is-disabled" aria-disabled="true" disabled>
        <img src="/assets/power-bi.png" alt="" class="sidebar-icon" />
        <span class="sidebar-text">BI e Relatórios</span>
      </button>
    </li>

    <!-- Estufas -->
    <li class="sidebar-item sidebar-item--has-submenu">
      <button class="sidebar-link" data-toggle="estufas" data-route="/estufas" aria-expanded="false">
        <img src="/assets/estufas-icon.png" alt="" class="sidebar-icon" />
        <span class="sidebar-text">Estufas</span>
        <svg class="sidebar-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
      <ul class="sidebar-submenu" data-submenu="estufas" role="list">
        <li class="sidebar-item">
          <a href="#/estufas/ler-qrcode" class="sidebar-link sidebar-link--sub" data-route="/estufas/ler-qrcode">
            <span class="sidebar-text">Ler QR Code</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#/estufas/agenda-eventos" class="sidebar-link sidebar-link--sub"
            data-route="/estufas/agenda-eventos">
            <span class="sidebar-text">Agenda</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#/estufas/pedidos" class="sidebar-link sidebar-link--sub" data-route="/estufas/pedidos">
            <span class="sidebar-text">Pedidos</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#/kanban-producao" class="sidebar-link sidebar-link--sub" data-route="/kanban-producao">
            <span class="sidebar-text">Produção</span>
          </a>
        </li>
        <li class="sidebar-item">
          <button type="button" class="sidebar-link sidebar-link--sub is-disabled" aria-disabled="true" disabled>
            <span class="sidebar-text">Expedição</span>
          </button>
        </li>
        <li class="sidebar-item">
          <button type="button" class="sidebar-link sidebar-link--sub is-disabled" aria-disabled="true" disabled>
            <span class="sidebar-text">Operações</span>
          </button>
        </li>
        <li class="sidebar-item">
          <button type="button" class="sidebar-link sidebar-link--sub is-disabled" aria-disabled="true" disabled>
            <span class="sidebar-text">Custos</span>
          </button>
        </li>
      </ul>
    </li>

    <!-- Controle de Pátio - TEMPORARIAMENTE OCULTO -->
    <!--
    <li class="sidebar-item sidebar-item--has-submenu">
      <button class="sidebar-link" data-toggle="controle-patio" data-route="/controle-patio" aria-expanded="false">
        <svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 17H5C4.46957 17 3.96086 16.7893 3.58579 16.4142C3.21071 16.0391 3 15.5304 3 15V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H15M9 21L12 17L15 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="sidebar-text">Controle de Pátio</span>
        <svg class="sidebar-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <ul class="sidebar-submenu" data-submenu="controle-patio" role="list">
        <li class="sidebar-item">
          <a href="#/controle-patio/visao-geral" class="sidebar-link sidebar-link--sub" data-route="/controle-patio/visao-geral">
            <span class="sidebar-text">Visão Geral</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#/controle-patio/nova-instrucao" class="sidebar-link sidebar-link--sub" data-route="/controle-patio/nova-instrucao">
            <span class="sidebar-text">Nova Instrução</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#/controle-patio/minhas-instrucoes" class="sidebar-link sidebar-link--sub" data-route="/controle-patio/minhas-instrucoes">
            <span class="sidebar-text">Minhas Instruções</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#/controle-patio/aprovacoes" class="sidebar-link sidebar-link--sub" data-route="/controle-patio/aprovacoes">
            <span class="sidebar-text">Aprovações</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#/controle-patio/gestao-agenda" class="sidebar-link sidebar-link--sub" data-route="/controle-patio/gestao-agenda">
            <span class="sidebar-text">Gestão Agenda</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#/controle-patio/agendamentos" class="sidebar-link sidebar-link--sub" data-route="/controle-patio/agendamentos">
            <span class="sidebar-text">Agendamentos</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a href="#/controle-patio/patio" class="sidebar-link sidebar-link--sub" data-route="/controle-patio/patio">
            <span class="sidebar-text">Pátio</span>
          </a>
        </li>
      </ul>
    </li>
    -->
  </ul>

  <!-- User Profile -->
  <div class="sidebar-footer">
    <div class="sidebar-user">
      <div class="sidebar-user-avatar">
        <img src="https://ui-avatars.com/api/?name=Andre+Santos&background=0D8ABC&color=fff" alt="Andre Santos" />
      </div>
      <div class="sidebar-user-info">
        <div class="sidebar-user-name">Andre Santos</div>
        <div class="sidebar-user-email">andresantos@gmail.com</div>
      </div>
      <button class="sidebar-user-toggle" aria-label="Menu do usuário">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            fill="currentColor" />
          <path
            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
            fill="currentColor" />
          <path
            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
            fill="currentColor" />
        </svg>
      </button>
    </div>
  </div>
</nav>
`;function M(e){e.innerHTML=v}function B(){x(),S();const e=y(),s=C(),a=L(),n=w();return h(),window.addEventListener("hashchange",h),()=>{window.removeEventListener("hashchange",h),typeof e=="function"&&e(),typeof s=="function"&&s(),typeof a=="function"&&a(),typeof n=="function"&&n()}}function C(){const e=s=>{s.target?.closest?.('.sidebar-link.is-disabled, .sidebar-link[aria-disabled="true"]')&&(s.preventDefault(),s.stopPropagation())};return document.addEventListener("click",e),()=>document.removeEventListener("click",e)}function y(){const e=s=>{s.target?.closest?.('.sidebar-link[data-route="/estufas/ler-qrcode"]')&&(s.preventDefault(),s.stopPropagation(),window.alert("Nao foi possivel acessar a camera do dispositivo."))};return document.addEventListener("click",e),()=>document.removeEventListener("click",e)}function L(){const e=document.querySelector(".sidebar"),s=document.querySelector(".app-shell"),a="tawros-sidebar-collapsed";if(!e)return;localStorage.getItem(a)==="true"?(e.classList.add("sidebar--collapsed"),s&&s.classList.add("app-shell--sidebar-collapsed")):(e.classList.remove("sidebar--collapsed"),s&&s.classList.remove("app-shell--sidebar-collapsed"));const o=r=>{if(r.target.closest(".header-menu-toggle")){const u=!e.classList.contains("sidebar--collapsed");e.classList.toggle("sidebar--collapsed"),s&&s.classList.toggle("app-shell--sidebar-collapsed"),localStorage.setItem(a,u)}};return document.addEventListener("click",o),()=>document.removeEventListener("click",o)}function q(){const e="tawros-sidebar-collapsed",s=document.querySelector(".sidebar"),a=document.querySelector(".app-shell");if(s){const n=!s.classList.contains("sidebar--collapsed");s.classList.toggle("sidebar--collapsed"),a&&a.classList.toggle("app-shell--sidebar-collapsed"),localStorage.setItem(e,n)}}function x(){document.querySelectorAll("[data-toggle]").forEach(s=>{s.addEventListener("click",()=>{const a=s.closest(".sidebar-item");if(!a)return;const n=a.classList.contains("sidebar-item--expanded");a.classList.toggle("sidebar-item--expanded"),s.setAttribute("aria-expanded",!n)})})}function S(){const e=document.querySelector(".sidebar-search-input");e&&e.addEventListener("input",s=>{const a=s.target.value.toLowerCase().trim(),n=document.querySelectorAll(".sidebar-item");if(!a){n.forEach(o=>{o.style.display="",o.classList.remove("sidebar-item--expanded")});return}n.forEach(o=>{if((o.querySelector(".sidebar-link")?.querySelector(".sidebar-text")?.textContent.toLowerCase()||"").includes(a)){o.style.display="";let c=o.closest(".sidebar-submenu");for(;c;){const p=c.closest(".sidebar-item");p&&(p.classList.add("sidebar-item--expanded"),p.style.display=""),c=p?.parentElement.closest(".sidebar-submenu")}}else o.querySelector('.sidebar-submenu .sidebar-item[style=""]')||(o.style.display="none")})})}function h(){const e=document.querySelectorAll(".sidebar-link[data-route]"),a=(window.location.hash||"#/dashboard").replace("#","");e.forEach(r=>r.classList.remove("active"));let n=null,o=0;if(e.forEach(r=>{const d=r.getAttribute("data-route"),u=r.classList.contains("is-disabled")||r.getAttribute("aria-disabled")==="true";if(!(!d||u)&&(a===d||a.startsWith(d+"/"))){const c=d.length;c>o&&(n=r,o=c)}}),n){n.classList.add("active");let r=n.closest(".sidebar-submenu");for(;r;){const d=r.closest(".sidebar-item");if(d){d.classList.add("sidebar-item--expanded");const u=d.querySelector("[data-toggle]");u&&u.setAttribute("aria-expanded","true")}r=d?.parentElement.closest(".sidebar-submenu")}}}function w(){const e=document.querySelector(".sidebar"),s=document.querySelector(".app-shell");if(!e)return()=>{};const a=new Set(Array.from(e.classList).filter(t=>t!=="sidebar--collapsed")),n=e.getAttribute("style")||"",o=new Set(Array.from(s?.classList||[]).filter(t=>t!=="app-shell--sidebar-collapsed")),r=s?.getAttribute("style")||"",d=[".sidebar-header",".sidebar-search",".sidebar-footer",".sidebar-user"],u=new Map;d.forEach(t=>{const l=e.querySelector(t);l&&u.set(t,{className:l.className,style:l.getAttribute("style")||""})});const c=t=>t instanceof Element?!!t.closest(".sidebar-menu"):!1,p=()=>{const t=e.classList.contains("sidebar--collapsed"),l=[...a];t&&l.push("sidebar--collapsed");const i=l.join(" ");e.className!==i&&(e.className=i),(e.getAttribute("style")||"")!==n&&(n?e.setAttribute("style",n):e.removeAttribute("style"))},g=()=>{if(!s)return;const t=s.classList.contains("app-shell--sidebar-collapsed"),l=[...o];t&&l.push("app-shell--sidebar-collapsed");const i=l.join(" ");s.className!==i&&(s.className=i),(s.getAttribute("style")||"")!==r&&(r?s.setAttribute("style",r):s.removeAttribute("style"))},k=t=>{if(t instanceof Element)for(const[l,i]of u.entries()){const b=t.matches(l)?t:t.closest(l);if(!b||c(b))continue;b.className!==i.className&&(b.className=i.className),(b.getAttribute("style")||"")!==i.style&&(i.style?b.setAttribute("style",i.style):b.removeAttribute("style"))}};let m=!1;const f=new MutationObserver(t=>{if(!m){m=!0;try{t.forEach(l=>{if(l.type==="attributes"){const i=l.target;if(i===e){p();return}if(i===s){g();return}c(i)||k(i);return}if(l.type==="childList"){const i=l.target;c(i)||(p(),g())}})}finally{m=!1}}});return f.observe(e,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["class","style"]}),s&&f.observe(s,{subtree:!1,childList:!1,attributes:!0,attributeFilter:["class","style"]}),()=>f.disconnect()}export{B as init,M as render,q as toggleSidebar};
