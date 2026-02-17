const m={chevronDown:'<svg viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',users:'<svg viewBox="0 0 24 24" fill="none"><path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',settings:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function u(e={}){const{id:s=`tabs-${Date.now()}`,tabs:n=[],activeTab:t=0,variant:a="underlined",size:i="md",fullWidth:d=!1,scrollable:o=!1,dark:r=!1,className:f=""}=e,b=["tabs",`tabs--${a}`];i!=="md"&&b.push(`tabs--${i}`),r&&b.push("tabs--dark"),f&&b.push(f);const l=["tabs-list"];d&&l.push("tabs-list--fullwidth"),o&&l.push("tabs-list--scrollable");const v=n.map((c,h)=>{const g=h===t,$=c.disabled,p=["tabs-tab"];g&&p.push("is-active"),$&&p.push("is-disabled");const C=c.icon?`<span class="tabs-icon">${c.icon}</span>`:"",k=c.badge!==void 0?`<span class="tabs-badge">${c.badge}</span>`:"",w=c.hasDropdown?`<span class="tabs-chevron">${m.chevronDown}</span>`:"";return`
      <button
        class="${p.join(" ")}"
        data-tab="${h}"
        ${$?"disabled":""}
        role="tab"
        aria-selected="${g}"
      >
        ${C}
        <span>${c.label}</span>
        ${k}
        ${w}
      </button>
    `}).join("");return`
    <div class="${b.join(" ")}" data-tabs id="${s}">
      <div class="${l.join(" ")}" role="tablist">
        ${v}
      </div>
    </div>
  `}function A(e={}){const{id:s=`tabs-${Date.now()}`,tabs:n=[],activeTab:t=0,variant:a="underlined",size:i="md",fullWidth:d=!1,dark:o=!1,className:r=""}=e,f=u({id:s,tabs:n.map(l=>({label:l.label,icon:l.icon,badge:l.badge,disabled:l.disabled})),activeTab:t,variant:a,size:i,fullWidth:d,dark:o,className:r}),b=n.map((l,v)=>`
      <div
        class="tabs-panel ${v===t?"is-active":""}"
        data-panel="${v}"
        role="tabpanel"
      >
        ${l.content||""}
      </div>
    `).join("");return`
    ${f}
    <div class="tabs-content">
      ${b}
    </div>
  `}function H(e={}){return u({...e,variant:"underlined"})}function y(e={}){return u({...e,variant:"button"})}function D(e={}){return u({...e,variant:"bar",fullWidth:!0})}function E(e=document,s=null){e.addEventListener("click",n=>{const t=n.target.closest(".tabs-tab");if(!t||t.disabled)return;const a=t.closest("[data-tabs]");if(!a)return;const i=parseInt(t.dataset.tab);a.querySelectorAll(".tabs-tab").forEach((o,r)=>{o.classList.toggle("is-active",r===i),o.setAttribute("aria-selected",r===i)});const d=a.parentElement?.querySelectorAll(".tabs-panel");d&&d.forEach((o,r)=>{o.classList.toggle("is-active",r===i)}),s&&s({index:i,element:t,container:a})})}function L(e,s){e.querySelectorAll(".tabs-tab").forEach((a,i)=>{a.classList.toggle("is-active",i===s),a.setAttribute("aria-selected",i===s)});const t=e.parentElement?.querySelectorAll(".tabs-panel");t&&t.forEach((a,i)=>{a.classList.toggle("is-active",i===s)})}function T(e){const s=e.querySelector(".tabs-tab.is-active");return s?parseInt(s.dataset.tab):-1}function j(e,s,n=!0){const t=e.querySelector(`[data-tab="${s}"]`);t&&(t.disabled=n,t.classList.toggle("is-disabled",n))}function q(e,s,n){const t=e.querySelector(`[data-tab="${s}"]`);if(!t)return;let a=t.querySelector(".tabs-badge");if(n==null){a&&a.remove();return}a||(a=document.createElement("span"),a.className="tabs-badge",t.appendChild(a)),a.textContent=n}const S={create:u,createWithPanels:A,createUnderlined:H,createButton:y,createBar:D,init:E,setActiveTab:L,getActiveTab:T,setTabDisabled:j,setTabBadge:q,icons:m};export{S as T,A as c,E as i};
