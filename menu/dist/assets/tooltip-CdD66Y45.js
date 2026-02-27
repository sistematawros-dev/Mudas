/* empty css                */const y={close:'<svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',slot:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function L(t={}){const{id:c=`tooltip-${Date.now()}`,content:l="",position:i="top",variant:a="dark",animation:d="fade",noArrow:g=!1,className:e=""}=t,r=["tooltip",`tooltip--${i}`];return a==="light"&&r.push("tooltip--light"),d!=="fade"&&r.push(`tooltip--${d}`),g&&r.push("tooltip--no-arrow"),e&&r.push(e),`
    <div class="${r.join(" ")}" id="${c}" role="tooltip">
      ${l}
    </div>
  `}function $(t={}){const{id:c=`tooltip-${Date.now()}`,title:l="",description:i="",slot:a=null,action:d=null,closable:g=!0,position:e="top",variant:r="dark",animation:u="fade",noArrow:v=!1,className:h=""}=t,n=["tooltip","tooltip--rich",`tooltip--${e}`];r==="light"&&n.push("tooltip--light"),u!=="fade"&&n.push(`tooltip--${u}`),v&&n.push("tooltip--no-arrow"),a||n.push("tooltip--simple"),h&&n.push(h);let o="";return a&&(typeof a=="string"?o=`<div class="tooltip-slot">${a}</div>`:o=`
        <div class="tooltip-slot">
          <div class="tooltip-slot-label">
            <span class="tooltip-slot-icon">${a.icon||"◆"}</span>
            <span>${a.label||"Substitua por Componente"}</span>
          </div>
        </div>
      `),`
    <div class="${n.join(" ")}" id="${c}" role="tooltip">
      <div class="tooltip-header">
        <span class="tooltip-title">${l}</span>
        ${g?`<button class="tooltip-close" data-tooltip-close>${y.close}</button>`:""}
      </div>
      ${i?`
        <div class="tooltip-body">
          <p class="tooltip-description">${i}</p>
        </div>
      `:""}
      ${o}
      ${d?`
        <div class="tooltip-footer">
          <button class="tooltip-action" data-tooltip-action>${d.label}</button>
        </div>
      `:""}
    </div>
  `}function k(t={}){const{trigger:c="",tooltip:l={},rich:i=!1}=t,a=i?$(l):L(l);return`
    <span class="tooltip-trigger" data-tooltip-trigger>
      ${c}
      ${a}
    </span>
  `}function w(t){typeof t=="string"&&(t=document.querySelector(t)),t&&t.classList.add("is-visible")}function m(t){typeof t=="string"&&(t=document.querySelector(t)),t&&t.classList.remove("is-visible")}function T(t){typeof t=="string"&&(t=document.querySelector(t)),t&&t.classList.toggle("is-visible")}function S(t=document,c={}){const{onShow:l,onHide:i,onAction:a,onClose:d}=c,g=n=>{const o=n.target.closest("[data-tooltip-trigger]");if(o){const s=o.querySelector(".tooltip");s&&!s.classList.contains("tooltip--rich")&&(w(s),l&&l({trigger:o,tooltip:s}))}},e=n=>{const o=n.target.closest("[data-tooltip-trigger]");if(o){const s=o.querySelector(".tooltip");s&&!s.classList.contains("tooltip--rich")&&(m(s),i&&i({trigger:o,tooltip:s}))}},r=n=>{const o=n.target.closest("[data-tooltip-trigger]");if(o){const s=o.querySelector(".tooltip");s&&!s.classList.contains("tooltip--rich")&&(w(s),l&&l({trigger:o,tooltip:s}))}},u=n=>{const o=n.target.closest("[data-tooltip-trigger]");if(o){const s=o.querySelector(".tooltip");s&&!s.classList.contains("tooltip--rich")&&(m(s),i&&i({trigger:o,tooltip:s}))}},v=n=>{const o=n.target.closest("[data-tooltip-trigger]");if(o){const p=o.querySelector(".tooltip--rich");p&&!n.target.closest(".tooltip--rich")&&(T(p),p.classList.contains("is-visible")?l&&l({trigger:o,tooltip:p}):i&&i({trigger:o,tooltip:p}))}const s=n.target.closest("[data-tooltip-close]");if(s){const p=s.closest(".tooltip");p&&(m(p),d&&d({tooltip:p}),i&&i({tooltip:p}))}const b=n.target.closest("[data-tooltip-action]");if(b){const p=b.closest(".tooltip");a&&a({tooltip:p,button:b})}n.target.closest("[data-tooltip-trigger]")||t.querySelectorAll(".tooltip--rich.is-visible").forEach(p=>{m(p),i&&i({tooltip:p})})},h=n=>{n.key==="Escape"&&t.querySelectorAll(".tooltip.is-visible").forEach(o=>{m(o),i&&i({tooltip:o})})};return t.addEventListener("mouseenter",g,!0),t.addEventListener("mouseleave",e,!0),t.addEventListener("focusin",r),t.addEventListener("focusout",u),t.addEventListener("click",v),document.addEventListener("keydown",h),()=>{t.removeEventListener("mouseenter",g,!0),t.removeEventListener("mouseleave",e,!0),t.removeEventListener("focusin",r),t.removeEventListener("focusout",u),t.removeEventListener("click",v),document.removeEventListener("keydown",h)}}function C(t,c={}){if(typeof t=="string"&&(t=document.querySelector(t)),!t)return null;const{content:l="",position:i="top",variant:a="dark",rich:d=!1,...g}=c;if(!t.classList.contains("tooltip-trigger")){const u=document.createElement("span");u.className="tooltip-trigger",u.setAttribute("data-tooltip-trigger",""),t.parentNode.insertBefore(u,t),u.appendChild(t),t=u}const e=d?$({position:i,variant:a,...g}):L({content:l,position:i,variant:a,...g}),r=t.querySelector(".tooltip");return r&&r.remove(),t.insertAdjacentHTML("beforeend",e),t.querySelector(".tooltip")}function q(t){if(typeof t=="string"&&(t=document.querySelector(t)),!t)return;const c=t.closest(".tooltip-trigger");if(c){const l=c.querySelector(".tooltip");l&&l.remove()}}const B=["top","top-left","top-right","bottom","bottom-left","bottom-right","left","left-top","left-bottom","right","right-top","right-bottom"],f={create:L,createRich:$,createWithTrigger:k,show:w,hide:m,toggle:T,init:S,attach:C,detach:q,positions:B,icons:y};function M(){const t=document.getElementById("tooltip-plain-light");t&&(t.innerHTML=f.create({content:"Description lorem ipsum dolor.",variant:"light"}));const c=document.getElementById("tooltip-plain-dark");c&&(c.innerHTML=f.create({content:"Description lorem ipsum dolor.",variant:"dark"}));const l=document.getElementById("tooltip-rich-light");l&&(l.innerHTML=`
      <div class="demo-rich-wrapper">
        ${f.createRich({title:"Title lorem ipsum",description:"Description lorem ipsum dolor.",slot:{icon:"◆ Slot",label:"Substitua por Componente"},action:{label:"Action"},variant:"light"})}
      </div>
    `);const i=document.getElementById("tooltip-rich-dark");i&&(i.innerHTML=`
      <div class="demo-rich-wrapper">
        ${f.createRich({title:"Title lorem ipsum",description:"Description lorem ipsum dolor.",slot:{icon:"◆ Slot",label:"Substitua por Componente"},action:{label:"Action"},variant:"dark"})}
      </div>
    `);const a=document.getElementById("positions-light");if(a){const e=[{name:"top left",arrow:"↖"},{name:"right top",arrow:"↗"},{name:"bottom right",arrow:"↘"},{name:"left top",arrow:"↙"},{name:"top center",arrow:"↑"},{name:"right center",arrow:"→"},{name:"bottom center",arrow:"↓"},{name:"left center",arrow:"←"},{name:"top right",arrow:"↗"},{name:"right bottom",arrow:"↘"},{name:"bottom left",arrow:"↙"},{name:"left bottom",arrow:"↖"}];a.innerHTML=e.map(r=>`
      <div class="demo-position-item">
        <span class="demo-position-arrow">${r.arrow}</span>
        <span>${r.name}</span>
      </div>
    `).join("")}const d=document.getElementById("positions-dark");if(d){const e=[{name:"top left",arrow:"↖"},{name:"right top",arrow:"↗"},{name:"bottom right",arrow:"↘"},{name:"left top",arrow:"↙"},{name:"top center",arrow:"↑"},{name:"right center",arrow:"→"},{name:"bottom center",arrow:"↓"},{name:"left center",arrow:"←"},{name:"top right",arrow:"↗"},{name:"right bottom",arrow:"↘"},{name:"bottom left",arrow:"↙"},{name:"left bottom",arrow:"↖"}];d.innerHTML=e.map(r=>`
      <div class="demo-position-item">
        <span class="demo-position-arrow">${r.arrow}</span>
        <span>${r.name}</span>
      </div>
    `).join("")}const g=document.getElementById("interactive-demo");if(g){const e=[{position:"top",label:"Top"},{position:"top-left",label:"Top Left"},{position:"top-right",label:"Top Right"},{position:"bottom",label:"Bottom"},{position:"bottom-left",label:"Bottom Left"},{position:"bottom-right",label:"Bottom Right"},{position:"left",label:"Left"},{position:"right",label:"Right"}];g.innerHTML=e.map(r=>`
      ${f.createWithTrigger({trigger:`<button class="demo-trigger">${r.label}</button>`,tooltip:{content:`Tooltip ${r.label}`,position:r.position,variant:"dark"}})}
    `).join(""),g.innerHTML+=`
      ${f.createWithTrigger({trigger:'<button class="demo-trigger">Rich Light</button>',rich:!0,tooltip:{title:"Rich Tooltip",description:"Este é um tooltip com conteúdo rico.",action:{label:"Saiba mais"},position:"bottom",variant:"light"}})}
      ${f.createWithTrigger({trigger:'<button class="demo-trigger">Rich Dark</button>',rich:!0,tooltip:{title:"Rich Tooltip",description:"Este é um tooltip com conteúdo rico.",slot:{icon:"◆",label:"Slot"},action:{label:"Action"},position:"bottom",variant:"dark"}})}
      ${f.createWithTrigger({trigger:'<button class="demo-trigger">Simple Rich</button>',rich:!0,tooltip:{title:"Título",description:"Descrição do tooltip sem slot.",action:{label:"Ver mais"},position:"top",variant:"dark"}})}
      ${f.createWithTrigger({trigger:'<button class="demo-trigger">Light Tooltip</button>',tooltip:{content:"Light variant tooltip",position:"top",variant:"light"}})}
    `}f.init(document,{onShow:e=>{console.log("Tooltip shown:",e)},onHide:e=>{console.log("Tooltip hidden:",e)},onAction:e=>{console.log("Tooltip action clicked:",e)},onClose:e=>{console.log("Tooltip closed:",e)}})}export{M as init};
