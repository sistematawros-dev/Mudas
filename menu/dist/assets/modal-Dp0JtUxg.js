const p={close:'<svg viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',danger:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',success:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M8 12l3 3 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',info:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 16v-4M12 8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',slot:'<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/><path d="M9 9h6v6H9z" stroke="currentColor" stroke-width="2"/></svg>'};let d=[];function b(o={}){const{id:t=`modal-${Math.random().toString(36).substr(2,9)}`,type:e="center",size:n="md",title:a="",description:r="",body:i="",footer:l="",closable:c=!0,showHandle:u=!1,dark:m=!1,confirm:h=!1,confirmIcon:s=null,stickyFooter:w=!1,className:$=""}=o,f=["modal",`modal--${e}`];n!=="md"&&f.push(`modal--${n}`),m&&f.push("modal--dark"),h&&f.push("modal--confirm"),w&&f.push("modal--sticky-footer"),$&&f.push($);const C=u||e==="bottom"?'<div class="modal-handle"></div>':"";let k="";if(a||c){const y=c?`<button type="button" class="modal-close" data-modal-close>${p.close}</button>`:"";h&&s?k=`
        <div class="modal-header">
          <div class="modal-header-content">
            <div class="${`modal-icon modal-icon--${s}`}">${p[s]||p.info}</div>
            ${a?`<h2 class="modal-title">${a}</h2>`:""}
            ${r?`<p class="modal-description">${r}</p>`:""}
          </div>
          ${y}
        </div>
      `:k=`
        <div class="modal-header">
          <div class="modal-header-content">
            ${a?`<h2 class="modal-title">${a}</h2>`:""}
            ${r?`<p class="modal-description">${r}</p>`:""}
          </div>
          ${y}
        </div>
      `}const x=i?`<div class="modal-body">${i}</div>`:"",M=l?`<div class="modal-footer">${l}</div>`:"";return`
    <div class="modal-backdrop" data-modal-backdrop="${t}"></div>
    <div class="${f.join(" ")}" data-modal="${t}" role="dialog" aria-modal="true" ${a?`aria-labelledby="${t}-title"`:""}>
      ${C}
      ${k}
      ${x}
      ${M}
    </div>
  `}function B(o={}){const{title:t="Confirmar ação",description:e="Tem certeza que deseja continuar?",confirmText:n="Sim, Confirmar",cancelText:a="Voltar",confirmVariant:r="primary",icon:i="warning",onConfirm:l=null,onCancel:c=null,...u}=o,m=`
    <button type="button" class="btn btn--outline" data-modal-close>${a}</button>
    <button type="button" class="btn btn--${r}" data-modal-confirm>${n}</button>
  `;return b({...u,title:t,description:e,confirm:!0,confirmIcon:i,footer:m,size:"sm"})}function L(o={}){return b({...o,type:"bottom",showHandle:!0})}function E(o={}){const{text:t="Substitua por Componente",icon:e=p.slot}=o;return`
    <div class="modal-slot">
      <div class="modal-slot-icon">${e}</div>
      <span class="modal-slot-text">${t}</span>
    </div>
  `}function g(o){const t=document.querySelector(`[data-modal="${o}"]`),e=document.querySelector(`[data-modal-backdrop="${o}"]`);!t||!e||(document.body.style.overflow="hidden",e.classList.add("is-visible"),t.classList.add("is-visible"),d.push(o),setTimeout(()=>{const n=t.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');n&&n.focus()},100),t.dispatchEvent(new CustomEvent("modal:open",{detail:{modalId:o}})))}function v(o){const t=document.querySelector(`[data-modal="${o}"]`),e=document.querySelector(`[data-modal-backdrop="${o}"]`);!t||!e||(t.classList.remove("is-visible"),e.classList.remove("is-visible"),d=d.filter(n=>n!==o),d.length===0&&(document.body.style.overflow=""),t.dispatchEvent(new CustomEvent("modal:close",{detail:{modalId:o}})))}function S(){d.forEach(o=>v(o))}function H(o=document,t={}){const{onConfirm:e,onCancel:n,onClose:a}=t,r=l=>{const c=l.target.closest("[data-modal-close]");if(c){const s=c.closest("[data-modal]");s&&(v(s.dataset.modal),n&&n(s.dataset.modal))}const u=l.target.closest("[data-modal-confirm]");if(u){const s=u.closest("[data-modal]");s&&(e&&e(s.dataset.modal),v(s.dataset.modal))}const m=l.target.closest("[data-modal-backdrop]");if(m&&l.target===m){const s=m.dataset.modalBackdrop;v(s),a&&a(s)}const h=l.target.closest("[data-modal-open]");h&&g(h.dataset.modalOpen)},i=l=>{if(l.key==="Escape"&&d.length>0){const c=d[d.length-1];v(c),a&&a(c)}};return o.addEventListener("click",r),document.addEventListener("keydown",i),()=>{o.removeEventListener("click",r),document.removeEventListener("keydown",i)}}const z={create:b,createConfirm:B,createBottomSheet:L,createSlot:E,open:g,close:v,closeAll:S,init:H,icons:p};export{b as a,v as c,z as m,g as o};
