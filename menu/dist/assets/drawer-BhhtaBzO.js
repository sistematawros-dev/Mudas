/* empty css               */function g(a){if(!a)return[];const t=["a[href]","button:not([disabled])","textarea:not([disabled])","input:not([disabled])","select:not([disabled])",'[tabindex]:not([tabindex="-1"])'];return Array.from(a.querySelectorAll(t.join(","))).filter(s=>s.offsetParent!==null)}function q(a={}){const{id:t=`drawer-${Math.random().toString(36).slice(2,9)}`,title:s="",content:i="",footer:u="",side:o="right",width:r=540}=a;return`
    <div class="drawer-backdrop" data-drawer-backdrop="${t}" aria-hidden="true"></div>
    <aside
      class="drawer drawer--${o}"
      data-drawer="${t}"
      role="dialog"
      aria-modal="true"
      aria-labelledby="${t}-title"
      style="--drawer-width: ${r}px"
    >
      <header class="drawer__header">
        <h2 class="drawer__title" id="${t}-title" tabindex="-1" data-drawer-title>${s}</h2>
        <button type="button" class="drawer__close" data-drawer-close aria-label="Fechar">x</button>
      </header>
      <div class="drawer__body">${i}</div>
      <footer class="drawer__footer">${u}</footer>
    </aside>
  `}function F(a={}){const{id:t,root:s=document,onOpen:i=null,onClose:u=null}=a;if(!t)return{open:()=>{},close:()=>{},toggle:()=>{},cleanup:()=>{}};const o=s.querySelector(`[data-drawer="${t}"]`),r=s.querySelector(`[data-drawer-backdrop="${t}"]`);if(!o||!r)return{open:()=>{},close:()=>{},toggle:()=>{},cleanup:()=>{}};const p=o.querySelectorAll("[data-drawer-close]");let l=!1,w="",f=null;const E=()=>{const e=o.querySelector("[data-drawer-autofocus]");if(e&&typeof e.focus=="function"){e.focus();return}const n=g(o);if(n[0]){n[0].focus();return}const d=o.querySelector("[data-drawer-title]");d&&typeof d.focus=="function"&&d.focus()},$=()=>{w=document.body.style.overflow,document.body.style.overflow="hidden"},L=()=>{document.body.style.overflow=w},y=(e=null)=>{l||(l=!0,f=e||document.activeElement,r.classList.add("is-open"),o.classList.add("is-open"),$(),E(),i&&i())},c=({restoreFocus:e=!0}={})=>{l&&(l=!1,r.classList.remove("is-open"),o.classList.remove("is-open"),L(),e&&f&&typeof f.focus=="function"&&f.focus(),u&&u())},_=(e=null)=>{l?c():y(e)},b=e=>{e.target===r&&c()},v=()=>c(),h=e=>{if(l){if(e.key==="Escape"){e.preventDefault(),c();return}if(e.key==="Tab"){const n=g(o);if(n.length===0)return;const d=n[0],m=n[n.length-1],k=document.activeElement;e.shiftKey&&k===d?(e.preventDefault(),m.focus()):!e.shiftKey&&k===m&&(e.preventDefault(),d.focus())}}};return r.addEventListener("click",b),p.forEach(e=>e.addEventListener("click",v)),document.addEventListener("keydown",h),{open:y,close:c,toggle:_,cleanup:()=>{c({restoreFocus:!1}),r.removeEventListener("click",b),p.forEach(e=>e.removeEventListener("click",v)),document.removeEventListener("keydown",h)}}}export{q as c,F as i};
