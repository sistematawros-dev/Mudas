/* empty css                */const p={chevronRight:'<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function L(t={}){const{title:s="",items:i=[],activeItem:a="",variant:l="default",dark:o=!1,className:e=""}=t,d=["sidenav"];l!=="default"&&d.push(`sidenav--${l}`),o&&d.push("sidenav--dark"),e&&d.push(e);const n=s?`
    <div class="sidenav-header">
      <h2 class="sidenav-title">${s}</h2>
    </div>
  `:"",m=b(i,a,o);return`
    <nav class="${d.join(" ")}" data-sidenav>
      ${n}
      <div class="sidenav-content">
        ${m}
      </div>
    </nav>
  `}function b(t,s,i,a=0){if(!t||t.length===0)return"";const l=a===0?"sidenav-menu":"sidenav-submenu",o=t.map(e=>{if(e.type==="section")return`
        <li class="sidenav-section">
          ${e.title?`<div class="sidenav-section-title">${e.title}</div>`:""}
          ${b(e.items,s,i,a)}
        </li>
      `;if(e.type==="divider")return'<li class="sidenav-divider"></li>';const d=e.items&&e.items.length>0,n=e.id===s||e.href===s,m=d&&(e.expanded||h(e.items,s)),c=["sidenav-item"];m&&c.push("is-expanded");const u=["sidenav-link"];n&&u.push("is-active"),e.disabled&&u.push("is-disabled");const v=e.icon?`<span class="sidenav-icon">${e.icon}</span>`:"",g=e.badge?`<span class="sidenav-badge">${e.badge}</span>`:"",$=d?`<span class="sidenav-arrow">${p.chevronRight}</span>`:"",f=e.href&&!d?"a":"button",T=e.href&&!d?`href="${e.href}"`:"",k=`data-sidenav-item="${e.id||""}"`,y=d?b(e.items,s,i,a+1):"";return`
      <li class="${c.join(" ")}">
        <${f} class="${u.join(" ")}" ${T} ${k}>
          ${v}
          <span class="sidenav-text">${e.label}</span>
          ${g}
          ${$}
        </${f}>
        ${y}
      </li>
    `}).join("");return`<ul class="${l}">${o}</ul>`}function h(t,s){return t?t.some(i=>i.id===s||i.href===s?!0:i.items?h(i.items,s):!1):!1}function I(t={}){const{label:s="Item",icon:i="",badge:a="",active:l=!1,disabled:o=!1,hasSubmenu:e=!1,dark:d=!1}=t,n=["sidenav-link"];l&&n.push("is-active"),o&&n.push("is-disabled");const m=i?`<span class="sidenav-icon">${i}</span>`:"",c=a?`<span class="sidenav-badge">${a}</span>`:"",u=e?`<span class="sidenav-arrow">${p.chevronRight}</span>`:"";return`
    <div class="${d?"sidenav-item-demo sidenav-item-demo--dark":"sidenav-item-demo"}">
      <button class="${n.join(" ")}">
        ${m}
        <span class="sidenav-text">${s}</span>
        ${c}
        ${u}
      </button>
    </div>
  `}function H(t={}){const{items:s=[],activeItem:i="",dark:a=!1,className:l=""}=t,o=["sidenav-menu"];l&&o.push(l);const e=s.map(n=>{const m=n.id===i||n.href===i,c=["sidenav-link"];m&&c.push("is-active"),n.disabled&&c.push("is-disabled");const u=n.href?"a":"button",v=n.href?`href="${n.href}"`:"";return`
      <li class="sidenav-item">
        <${u} class="${c.join(" ")}" ${v} data-sidenav-item="${n.id||""}">
          <span class="sidenav-text">${n.label}</span>
        </${u}>
      </li>
    `}).join("");return`
    <div style="${a?"background: var(--gray-900); padding: var(--space-2); border-radius: var(--radius-lg);":""}">
      <ul class="${o.join(" ")}" ${a?'style="color: var(--gray-400);"':""}>
        ${e}
      </ul>
    </div>
  `}function M(t=document,s=null){t.addEventListener("click",i=>{const a=i.target.closest(".sidenav-link");if(!a)return;const l=a.closest(".sidenav-item");if(!l)return;const o=l.querySelector(".sidenav-submenu");if(o&&(i.preventDefault(),l.classList.toggle("is-expanded")),s){const e=a.dataset.sidenavItem;s({id:e,element:a,hasSubmenu:!!o,isExpanded:l.classList.contains("is-expanded")})}})}function x(t,s){t.querySelectorAll(".sidenav-link.is-active").forEach(a=>{a.classList.remove("is-active")});const i=t.querySelector(`[data-sidenav-item="${s}"]`);if(i){i.classList.add("is-active");let a=i.closest(".sidenav-submenu");for(;a;){const l=a.closest(".sidenav-item");l&&l.classList.add("is-expanded"),a=l?.parentElement?.closest(".sidenav-submenu")}}}function E(t,s,i=null){const a=t.querySelector(`[data-sidenav-item="${s}"]`);if(!a)return;const l=a.closest(".sidenav-item");l&&(i===null?l.classList.toggle("is-expanded"):i?l.classList.add("is-expanded"):l.classList.remove("is-expanded"))}function S(t){t.querySelectorAll(".sidenav-item").forEach(s=>{s.querySelector(".sidenav-submenu")&&s.classList.add("is-expanded")})}function A(t){t.querySelectorAll(".sidenav-item.is-expanded").forEach(s=>{s.classList.remove("is-expanded")})}const r={create:L,createItem:I,createMenu:H,init:M,setActive:x,toggle:E,expandAll:S,collapseAll:A,icons:p};function w(){document.getElementById("item-default").innerHTML=r.createItem({label:"Title"}),document.getElementById("item-hover").innerHTML=r.createItem({label:"Title (Hover)"}),document.getElementById("item-active").innerHTML=r.createItem({label:"Title",active:!0}),document.getElementById("item-disabled").innerHTML=r.createItem({label:"Title",disabled:!0}),document.getElementById("item-expandable").innerHTML=r.createItem({label:"Title",hasSubmenu:!0}),document.getElementById("menu-simple").innerHTML=r.createMenu({items:[{id:"title1",label:"Title"},{id:"title2",label:"Title"},{id:"title3",label:"Title",disabled:!0},{id:"title4",label:"Title"},{id:"title5",label:"Title"},{id:"title6",label:"Title"},{id:"title7",label:"Title"},{id:"title8",label:"Title"}],activeItem:"title2"}),document.getElementById("sidenav-submenus").innerHTML=r.create({title:"Fontes and Acessórios",items:[{id:"main",label:"Main"},{id:"moveis",label:"Móveis",expanded:!0,items:[{id:"title1",label:"Title"},{id:"books",label:"Books",items:[{id:"level3-1",label:"level 3 (Icon null)"},{id:"level3-2",label:"level 3 (Icon null)"}]}]},{id:"title2",label:"Title"},{id:"title3",label:"Title"},{id:"title4",label:"Title"}],activeItem:"level3-1"}),document.getElementById("sidenav-full").innerHTML=r.create({title:"Fontes and Acessórios",items:[{type:"section",title:"Descobrir",items:[{id:"main",label:"Main",badge:"3"},{id:"moveis",label:"Móveis",expanded:!0,items:[{id:"sofas",label:"Sofás"},{id:"mesas",label:"Mesas"},{id:"cadeiras",label:"Cadeiras"}]}]},{type:"divider"},{type:"section",title:"Categorias",items:[{id:"eletronicos",label:"Eletrônicos",items:[{id:"phones",label:"Smartphones"},{id:"tablets",label:"Tablets"},{id:"laptops",label:"Laptops",items:[{id:"gaming",label:"Gaming"},{id:"work",label:"Trabalho"}]}]},{id:"roupas",label:"Roupas"},{id:"livros",label:"Livros"}]}],activeItem:"sofas"}),document.getElementById("sidenav-dark").innerHTML=r.create({title:"Fontes and Acessórios",dark:!0,items:[{type:"section",title:"Descobrir",items:[{id:"main-d",label:"Main"},{id:"moveis-d",label:"Móveis",expanded:!0,items:[{id:"sofas-d",label:"Sofás"},{id:"mesas-d",label:"Mesas"}]}]},{type:"divider"},{type:"section",title:"Categorias",items:[{id:"eletronicos-d",label:"Eletrônicos",items:[{id:"phones-d",label:"Smartphones"},{id:"tablets-d",label:"Tablets"},{id:"laptops-d",label:"Laptops",items:[{id:"gaming-d",label:"Gaming"},{id:"work-d",label:"Trabalho"}]}]},{id:"roupas-d",label:"Roupas"},{id:"livros-d",label:"Livros"}]}],activeItem:"sofas-d"}),document.getElementById("item-dark-default").innerHTML=r.createItem({label:"Title",dark:!0}),document.getElementById("item-dark-active").innerHTML=r.createItem({label:"Title",active:!0,dark:!0}),document.getElementById("item-dark-disabled").innerHTML=r.createItem({label:"Title",disabled:!0,dark:!0}),r.init(document,t=>{console.log("SideNav item clicked:",t)})}export{w as init};
