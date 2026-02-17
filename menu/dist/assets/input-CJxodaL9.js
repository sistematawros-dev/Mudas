const c={search:'<svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',close:'<svg viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',eye:'<svg viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/></svg>',eyeOff:'<svg viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M6.5 6.5a2 2 0 002.9 2.9M1 8s3-5 7-5c1 0 1.9.2 2.7.6M15 8s-1.5 2.5-4 4M11.8 5.2c1.5 1.2 2.5 2.8 2.5 2.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',chevronDown:'<svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',calendar:'<svg viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',check:'<svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function x(l={}){const{id:i=`input-${Math.random().toString(36).substr(2,9)}`,name:t="",type:s="text",label:e="",placeholder:n="",value:a="",helper:d="",error:p="",success:w="",required:g=!1,optional:m=!1,disabled:C=!1,readonly:q=!1,maxLength:o=null,showCounter:k=!1,iconLeft:f=null,iconRight:u=null,prefix:y=null,suffix:r=null,clearable:h=!1,size:E="md",dark:S=!1,floating:L=!1,rows:z=4,className:j=""}=l,v=["field"];p&&v.push("field--error"),w&&v.push("field--success"),S&&v.push("field--dark"),L&&v.push("field--floating"),j&&v.push(j);const M=["input"],B=s==="date";E!=="md"&&M.push(`input--${E}`),s==="textarea"&&M.push("input--textarea");const $=["input-wrapper"];f&&$.push("input-wrapper--icon-left"),(u||h||s==="password"||B)&&$.push("input-wrapper--icon-right"),f&&(u||h||s==="password")&&$.push("input-wrapper--icon-both"),y&&$.push("input-wrapper--has-prefix"),r&&$.push("input-wrapper--has-suffix");let A="";e&&!L&&(A=`
      <label class="field-label" for="${i}">
        ${e}
        ${g?'<span class="field-label-required">*</span>':""}
        ${m?'<span class="field-label-optional">(opcional)</span>':""}
      </label>
    `);const P=[`id="${i}"`,`name="${t||i}"`,`class="${M.join(" ")}"`,n?`placeholder="${n}"`:L?'placeholder=" "':"",a?`value="${a}"`:"",C?"disabled":"",q?"readonly":"",g?"required":"",o?`maxlength="${o}"`:""].filter(Boolean).join(" ");let H="";s==="textarea"?H=`<textarea ${P} rows="${z}">${a}</textarea>`:H=`<input type="${s==="password"?"password":s}" ${P} />`;const O=f?`<span class="input-icon input-icon--left">${f}</span>`:"";let b="";if(s==="password")b=`<button type="button" class="input-icon input-icon--right input-icon--action" data-toggle-password>${c.eye}</button>`;else if(h)b=`<button type="button" class="input-icon input-icon--right input-icon--action" data-clear-input style="display:none">${c.close}</button>`;else if(B){const D=u||c.calendar;b=`<span class="input-icon input-icon--right input-icon--action" data-open-picker data-picker-input="${i}" aria-hidden="true">${D}</span>`}else u&&(b=`<span class="input-icon input-icon--right">${u}</span>`);const N=y?`<span class="input-addon input-addon--prefix">${y}</span>`:"",R=r?`<span class="input-addon input-addon--suffix">${r}</span>`:"",V=L&&e?`
    <label class="field-label" for="${i}">
      ${e}
      ${g?'<span class="field-label-required">*</span>':""}
    </label>
  `:"";let T="";const I=p||w||d;return(I||k)&&(T=`
      <div class="field-helper">
        <span class="field-message">${I}</span>
        ${k&&o?`<span class="field-counter"><span data-char-count>${a.length}</span>/${o}</span>`:""}
      </div>
    `),`
    <div class="${v.join(" ")}">
      ${A}
      <div class="${$.join(" ")}">
        ${N}
        ${O}
        ${H}
        ${b}
        ${V}
        ${R}
      </div>
      ${T}
    </div>
  `}function F(l={}){return x({...l,type:"search",iconLeft:c.search,clearable:!0,placeholder:l.placeholder||"Pesquisar..."})}function G(l={}){return x({...l,type:"password"})}function J(l={}){return x({...l,type:"textarea"})}function K(l={}){const{id:i=`select-${Math.random().toString(36).substr(2,9)}`,name:t="",label:s="",placeholder:e="Selecione...",value:n="",items:a=[],helper:d="",error:p="",required:w=!1,disabled:g=!1,size:m="md",dark:C=!1,className:q=""}=l,o=["field"];p&&o.push("field--error"),C&&o.push("field--dark"),q&&o.push(q);const k=["input"];m!=="md"&&k.push(`input--${m}`);const f=s?`
    <label class="field-label" for="${i}">
      ${s}
      ${w?'<span class="field-label-required">*</span>':""}
    </label>
  `:"",u=a.map(r=>{const h=typeof r=="string"?r:r.value,E=typeof r=="string"?r:r.label;return`<option value="${h}" ${h===n?"selected":""}>${E}</option>`}).join(""),y=p||d?`
    <div class="field-helper">
      <span class="field-message">${p||d}</span>
    </div>
  `:"";return`
    <div class="${o.join(" ")}">
      ${f}
      <div class="input-wrapper input-wrapper--select input-wrapper--icon-right">
        <select id="${i}" name="${t||i}" class="${k.join(" ")}" ${g?"disabled":""} ${w?"required":""}>
          ${e?`<option value="" disabled ${n?"":"selected"}>${e}</option>`:""}
          ${u}
        </select>
        <span class="input-icon input-icon--right">${c.chevronDown}</span>
      </div>
      ${y}
    </div>
  `}function Q(l={}){const{suggestions:i=[],...t}=l,s=i.length>0?`
    <div class="input-suggestions" data-suggestions>
      ${i.map((n,a)=>{const d=typeof n=="string"?n:n.value,p=typeof n=="string"?n:n.label;return`<div class="input-suggestion" data-value="${d}" data-index="${a}">${p}</div>`}).join("")}
    </div>
  `:"";return x(t).replace(`</div>
    </div>`,`${s}</div>
    </div>`)}function U(l=document){const i=[];return l.querySelectorAll("[data-toggle-password]").forEach(t=>{t.addEventListener("click",()=>{const e=t.closest(".input-wrapper").querySelector("input");e.type==="password"?(e.type="text",t.innerHTML=c.eyeOff):(e.type="password",t.innerHTML=c.eye)})}),l.querySelectorAll("[data-clear-input]").forEach(t=>{const e=t.closest(".input-wrapper").querySelector("input"),n=()=>{t.style.display=e.value?"flex":"none"};e.addEventListener("input",n),n(),t.addEventListener("click",()=>{e.value="",e.focus(),n(),e.dispatchEvent(new Event("input",{bubbles:!0}))})}),l.querySelectorAll("[data-char-count]").forEach(t=>{const e=t.closest(".field").querySelector(".input");e.addEventListener("input",()=>{t.textContent=e.value.length})}),l.querySelectorAll("[data-suggestions]").forEach(t=>{const e=t.closest(".input-wrapper").querySelector("input");e.addEventListener("focus",()=>{t.classList.add("is-visible")}),e.addEventListener("blur",()=>{setTimeout(()=>{t.classList.remove("is-visible")},150)}),t.querySelectorAll(".input-suggestion").forEach(n=>{n.addEventListener("click",()=>{e.value=n.dataset.value,t.classList.remove("is-visible"),e.dispatchEvent(new Event("input",{bubbles:!0}))})})}),l.querySelectorAll("[data-open-picker]").forEach(t=>{const s=t.getAttribute("data-picker-input"),e=s?l.querySelector(`#${s}`):t.closest(".input-wrapper")?.querySelector("input");if(!e||e.type!=="date")return;const n=a=>{if(a.preventDefault(),typeof e.showPicker=="function"){e.showPicker();return}e.focus(),e.click()};t.addEventListener("click",n),i.push({btn:t,handleOpenPicker:n})}),()=>{i.forEach(({btn:t,handleOpenPicker:s})=>{t.removeEventListener("click",s)})}}const W={create:x,createSearch:F,createPassword:G,createTextarea:J,createSelect:K,createAutocomplete:Q,init:U,icons:c};export{F as a,K as b,x as c,W as d,U as i};
