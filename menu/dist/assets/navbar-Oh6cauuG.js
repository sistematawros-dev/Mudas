const c={menu:'<svg viewBox="0 0 24 24" fill="none"><path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none"><path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronDown:'<svg viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronLeft:'<svg viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',user:'<svg viewBox="0 0 24 24" fill="none"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',home:'<svg viewBox="0 0 24 24" fill="none"><path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',settings:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/><path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',bell:'<svg viewBox="0 0 24 24" fill="none"><path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',grid:'<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function w(a={}){const{logo:n="TAWROS",logoIcon:o="",links:s=[],activeLink:r="",showSearch:l=!0,showLogin:i=!0,loginText:t="Login",searchPlaceholder:d="",elevated:m=!1,dark:h=!1,className:u=""}=a,b=["navbar"];m&&b.push("navbar--elevated"),h&&b.push("navbar--dark"),u&&b.push(u);const g=`
    <div class="navbar-brand">
      <button class="navbar-toggle" data-navbar-toggle>
        ${c.menu}
      </button>
      <a href="#" class="navbar-logo">
        ${o?`<img src="${o}" alt="${n}" />`:""}
        <span>${n}</span>
      </a>
    </div>
  `,p=s.length>0?`
    <ul class="navbar-nav">
      ${s.map(v=>{const L=v.id===r||v.href===r,$=v.items&&v.items.length>0;return`
          <li>
            <a href="${v.href||"#"}" class="navbar-link ${L?"is-active":""}" data-navbar-link="${v.id||""}">
              <span>${v.label}</span>
              ${$?c.chevronDown:""}
            </a>
          </li>
        `}).join("")}
    </ul>
  `:"",k=l?`
    <div class="navbar-search">
      <span class="navbar-search-icon">${c.search}</span>
      <input type="text" class="navbar-search-input" placeholder="${d}" />
      <button class="navbar-search-btn" data-navbar-search-mobile>
        ${c.search}
      </button>
    </div>
  `:"",f=i?`
    <button class="btn btn--primary btn--sm">
      ${c.user}
      <span>${t}</span>
    </button>
  `:"";return`
    <nav class="${b.join(" ")}" data-navbar>
      ${g}
      ${p}
      <div class="navbar-actions">
        ${k}
        ${f}
      </div>
    </nav>
  `}function C(a={}){const{logo:n="TAWROS",logoIcon:o="",showSearch:s=!0,showLogin:r=!0,loginText:l="Login",dark:i=!1,className:t=""}=a,d=["navbar"];return i&&d.push("navbar--dark"),t&&d.push(t),`
    <nav class="${d.join(" ")}" data-navbar>
      <div class="navbar-brand">
        <button class="navbar-toggle" data-navbar-toggle>
          ${c.menu}
        </button>
        <a href="#" class="navbar-logo">
          ${o?`<img src="${o}" alt="${n}" />`:""}
          <span>${n}</span>
        </a>
      </div>
      <div class="navbar-actions">
        ${s?`<button class="navbar-search-btn">${c.search}</button>`:""}
        ${r?`
          <button class="btn btn--primary btn--sm">
            ${c.user}
            <span>${l}</span>
          </button>
        `:""}
      </div>
    </nav>
  `}function B(a={}){const{logoIcon:n="",showSearch:o=!0,showAvatar:s=!0,dark:r=!1,className:l=""}=a,i=["navbar"];return r&&i.push("navbar--dark"),l&&i.push(l),`
    <nav class="${i.join(" ")}" data-navbar>
      <div class="navbar-brand">
        <button class="navbar-toggle" data-navbar-toggle>
          ${c.menu}
        </button>
        ${n?`<a href="#" class="navbar-logo"><img src="${n}" alt="Logo" /></a>`:""}
      </div>
      <div class="navbar-actions">
        ${o?`<button class="navbar-search-btn">${c.search}</button>`:""}
        ${s?`
          <button class="btn btn--primary btn--icon btn--sm">
            ${c.user}
          </button>
        `:""}
      </div>
    </nav>
  `}function M(a={}){const{title:n="Title",showBack:o=!0,backIcon:s=c.chevronLeft,rightIcon:r=c.settings,showRightAction:l=!0,dark:i=!1,className:t=""}=a,d=["appbar"];return i&&d.push("appbar--dark"),t&&d.push(t),`
    <header class="${d.join(" ")}" data-appbar>
      <div class="appbar-left">
        ${o?`
          <button class="appbar-btn" data-appbar-back>
            ${s}
          </button>
        `:""}
      </div>
      <h1 class="appbar-title">${n}</h1>
      <div class="appbar-right">
        ${l?`
          <button class="appbar-btn" data-appbar-action>
            ${r}
          </button>
        `:""}
      </div>
    </header>
  `}function T(a={}){const{items:n=[],activeItem:o="",dark:s=!1,className:r=""}=a,l=["bottomnav"];s&&l.push("bottomnav--dark"),r&&l.push(r);const i=n.map(t=>{const d=t.id===o,h=`
      <span class="bottomnav-icon">${t.icon||c.home}</span>
      <span class="bottomnav-label">${t.label}</span>
    `;return t.badge?`
        <div class="bottomnav-item-wrapper">
          <a href="${t.href||"#"}" class="bottomnav-item ${d?"is-active":""}" data-bottomnav-item="${t.id||""}">
            ${h}
          </a>
          <span class="bottomnav-badge">${t.badge}</span>
        </div>
      `:`
      <a href="${t.href||"#"}" class="bottomnav-item ${d?"is-active":""}" data-bottomnav-item="${t.id||""}">
        ${h}
      </a>
    `}).join("");return`
    <nav class="${l.join(" ")}" data-bottomnav>
      ${i}
    </nav>
  `}function y(a=document,n={}){const{onToggle:o,onSearch:s,onBack:r,onAction:l,onNavigate:i}=n;a.addEventListener("click",t=>{t.target.closest("[data-navbar-toggle]")&&o&&o(),t.target.closest("[data-appbar-back]")&&r&&r(),t.target.closest("[data-appbar-action]")&&l&&l();const u=t.target.closest("[data-bottomnav-item]");if(u&&i){t.preventDefault();const g=u.dataset.bottomnavItem;i({id:g,element:u})}const b=t.target.closest("[data-navbar-link]");if(b&&i){const g=b.dataset.navbarLink;i({id:g,element:b})}}),a.addEventListener("keydown",t=>{t.key==="Enter"&&t.target.classList.contains("navbar-search-input")&&s&&s(t.target.value)})}function I(a,n){const o=a.querySelector("[data-bottomnav]");if(!o)return;o.querySelectorAll(".bottomnav-item").forEach(r=>{r.classList.remove("is-active")});const s=o.querySelector(`[data-bottomnav-item="${n}"]`);s&&s.classList.add("is-active")}const e={createTopNav:w,createTabletNav:C,createMobileNav:B,createAppBar:M,createBottomNav:T,init:y,setActiveBottomItem:I,icons:c};function H(){document.getElementById("navbar-desktop").innerHTML=e.createTopNav({logo:"TAWROS",links:[{id:"home",label:"Label",href:"#"},{id:"products",label:"Label",href:"#",items:[]},{id:"services",label:"Label",href:"#",items:[]},{id:"about",label:"Label",href:"#"}],activeLink:"home",showSearch:!0,showLogin:!0,loginText:"Login"}),document.getElementById("navbar-tablet").innerHTML=e.createTabletNav({logo:"TAWROS",showSearch:!0,showLogin:!0,loginText:"Login"}),document.getElementById("navbar-mobile").innerHTML=e.createMobileNav({showSearch:!0,showAvatar:!0}),document.getElementById("appbar-default").innerHTML=e.createAppBar({title:"Title",showBack:!0,showRightAction:!0}),document.getElementById("bottomnav-default").innerHTML=e.createBottomNav({items:[{id:"home",label:"Label",icon:e.icons.home},{id:"search",label:"Label",icon:e.icons.search},{id:"grid",label:"Label",icon:e.icons.grid},{id:"profile",label:"Label",icon:e.icons.user}],activeItem:"home"}),document.getElementById("bottomnav-badge").innerHTML=e.createBottomNav({items:[{id:"home2",label:"Label",icon:e.icons.home},{id:"notifications",label:"Label",icon:e.icons.bell,badge:"3"},{id:"grid2",label:"Label",icon:e.icons.grid},{id:"profile2",label:"Label",icon:e.icons.user}],activeItem:"notifications"}),document.getElementById("navbar-dark").innerHTML=e.createTopNav({logo:"TAWROS",links:[{id:"home-d",label:"Label",href:"#"},{id:"products-d",label:"Label",href:"#"},{id:"services-d",label:"Label",href:"#"}],activeLink:"home-d",showSearch:!0,showLogin:!0,loginText:"Login",dark:!0}),document.getElementById("appbar-dark").innerHTML=e.createAppBar({title:"Title",showBack:!0,showRightAction:!0,dark:!0}),document.getElementById("bottomnav-dark").innerHTML=e.createBottomNav({items:[{id:"home-d",label:"Label",icon:e.icons.home},{id:"search-d",label:"Label",icon:e.icons.search},{id:"grid-d",label:"Label",icon:e.icons.grid},{id:"profile-d",label:"Label",icon:e.icons.user}],activeItem:"home-d",dark:!0}),e.init(document,{onToggle:()=>console.log("Menu toggled"),onSearch:a=>console.log("Search:",a),onBack:()=>console.log("Back pressed"),onAction:()=>console.log("Action pressed"),onNavigate:a=>{console.log("Navigate:",a),a.element.closest("[data-bottomnav]")&&(a.element.closest("[data-bottomnav]").querySelectorAll(".bottomnav-item").forEach(o=>{o.classList.remove("is-active")}),a.element.classList.add("is-active"))}})}export{H as init};
