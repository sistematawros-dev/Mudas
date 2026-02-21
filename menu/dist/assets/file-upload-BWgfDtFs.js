/* empty css                    */const u={upload:'<svg viewBox="0 0 24 24" fill="none"><path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',file:'<svg viewBox="0 0 24 24" fill="none"><path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 2V9H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',check:'<svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',warning:'<svg viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18C1.64 18.3 1.55 18.64 1.55 19C1.55 19.36 1.64 19.7 1.82 20C2 20.3 2.26 20.56 2.56 20.74C2.86 20.92 3.21 21.01 3.56 21H20.44C20.79 21.01 21.14 20.92 21.44 20.74C21.74 20.56 22 20.3 22.18 20C22.36 19.7 22.45 19.36 22.45 19C22.45 18.64 22.36 18.3 22.18 18L13.71 3.86C13.53 3.56 13.27 3.32 12.97 3.15C12.67 2.98 12.34 2.89 12 2.89C11.66 2.89 11.33 2.98 11.03 3.15C10.73 3.32 10.47 3.56 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',close:'<svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',refresh:'<svg viewBox="0 0 24 24" fill="none"><path d="M1 4V10H7M23 20V14H17M20.49 9C19.9828 7.56678 19.1209 6.28536 17.9845 5.27538C16.8482 4.26539 15.4745 3.55996 13.9917 3.22433C12.5089 2.8887 10.9652 2.93434 9.50481 3.35677C8.04437 3.77921 6.71475 4.56477 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4352 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1113 10.0083 20.7757C8.52547 20.44 7.1518 19.7346 6.01547 18.7246C4.87913 17.7146 4.01717 16.4332 3.51 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',trash:'<svg viewBox="0 0 24 24" fill="none"><path d="M3 6H5H21M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',components:'<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function B(a){if(a===0)return"0 Bytes";const l=1024,n=["Bytes","KB","MB","GB"],r=Math.floor(Math.log(a)/Math.log(l));return Math.round(a/Math.pow(l,r)*100)/100+" "+n[r]}function j(){return`file-${Date.now()}-${Math.random().toString(36).substr(2,9)}`}function S(a={}){const{id:l=`file-upload-${Date.now()}`,title:n="Componentes / File Upload",titleIcon:r=!0,acceptedFormats:d=["image/png","image/jpeg","application/pdf",".doc",".docx"],maxSize:C=5*1024*1024,maxSizeLabel:p="5MB",multiple:f=!0,dark:h=!1,compact:k=!1,className:v=""}=a,m=["file-upload"];h&&m.push("file-upload--dark"),k&&m.push("file-upload--compact"),v&&m.push(v);const w=d.join(","),M=d.map(y=>y.replace("image/","").replace("application/","").toUpperCase()).slice(0,4).join(", ");return`
    <div class="${m.join(" ")}" id="${l}" data-file-upload>
      ${n?`
        <div class="file-upload-header">
          ${r?`<span class="file-upload-header-icon">${u.components}</span>`:""}
          <span class="file-upload-title">${n}</span>
        </div>
      `:""}

      <div class="file-upload-error" data-upload-error style="display: none;">
        <div class="file-upload-error-content">
          <span class="file-upload-error-icon">${u.warning}</span>
          <span class="file-upload-error-text" data-error-text></span>
        </div>
        <button class="file-upload-error-close" data-error-close>
          ${u.close}
        </button>
      </div>

      <div class="file-upload-zone" data-upload-zone>
        <span class="file-upload-zone-icon">${u.upload}</span>
        <span class="file-upload-zone-text">Clique para fazer upload</span>
        <span class="file-upload-zone-subtext">ou arraste e solte os arquivos aqui</span>
        <span class="file-upload-zone-hint">${M} (max. ${p})</span>
        <input
          type="file"
          class="file-upload-input"
          data-upload-input
          accept="${w}"
          ${f?"multiple":""}
        />
      </div>

      <div class="file-upload-list" data-upload-list></div>
    </div>
  `}function L(a,l={}){const{id:n=a.id||j(),status:r="pending",progress:d=0,error:C=null}=l,p=["file-item"];r==="error"&&p.push("file-item--error"),r==="success"&&p.push("file-item--success"),r==="uploading"&&p.push("file-item--uploading");let f="";return r==="success"?f=`
      <span class="file-item-status file-item-status--success">
        <span class="file-item-status-icon">${u.check}</span>
        <span>Upload completo</span>
      </span>
    `:r==="error"?f=`
      <span class="file-item-status file-item-status--error">
        <span class="file-item-status-icon">${u.error}</span>
        <span>${C||"Erro no upload"}</span>
      </span>
    `:r==="uploading"&&(f=`<span>${d}% de upload</span>`),`
    <div class="${p.join(" ")}" data-file-item data-file-id="${n}">
      <div class="file-item-icon">
        ${u.file}
      </div>
      <div class="file-item-content">
        <div class="file-item-name">${a.name}</div>
        <div class="file-item-meta">
          <span class="file-item-size">${B(a.size)}</span>
          ${f}
        </div>
        ${r==="uploading"?`
          <div class="file-item-progress">
            <div class="file-item-progress-bar">
              <div class="file-item-progress-fill" style="width: ${d}%"></div>
            </div>
          </div>
        `:""}
      </div>
      <div class="file-item-actions">
        ${r==="error"?`
          <button class="file-item-action file-item-action--retry" data-file-retry title="Tentar novamente">
            ${u.refresh}
          </button>
        `:""}
        <button class="file-item-action file-item-action--delete" data-file-delete title="Remover">
          ${u.trash}
        </button>
      </div>
    </div>
  `}function V(a=document,l={}){const{onUpload:n,onProgress:r,onSuccess:d,onError:C,onDelete:p,onValidate:f,maxSize:h=5*1024*1024,acceptedFormats:k=[]}=l,v=new Map;a.addEventListener("dragover",e=>{const t=e.target.closest("[data-upload-zone]");t&&(e.preventDefault(),t.classList.add("is-dragover"))}),a.addEventListener("dragleave",e=>{const t=e.target.closest("[data-upload-zone]");t&&!t.contains(e.relatedTarget)&&t.classList.remove("is-dragover")}),a.addEventListener("drop",e=>{const t=e.target.closest("[data-upload-zone]");if(t){e.preventDefault(),t.classList.remove("is-dragover");const s=t.closest("[data-file-upload]"),o=Array.from(e.dataTransfer.files);m(s,o)}}),a.addEventListener("change",e=>{const t=e.target.closest("[data-upload-input]");if(t){const s=t.closest("[data-file-upload]"),o=Array.from(t.files);m(s,o),t.value=""}}),a.addEventListener("click",e=>{const t=e.target.closest("[data-file-delete]");if(t){const i=t.closest("[data-file-item]"),c=i.dataset.fileId,g=v.get(c);p&&p(g),v.delete(c),i.remove()}const s=e.target.closest("[data-file-retry]");if(s){const i=s.closest("[data-file-item]"),c=i.dataset.fileId,g=v.get(c);if(g){const $=i.closest("[data-file-upload]");M($,g,c)}}const o=e.target.closest("[data-error-close]");if(o){const i=o.closest("[data-upload-error]");i&&(i.style.display="none")}});function m(e,t){const s=e.querySelector("[data-upload-list]");t.forEach(o=>{const i=w(o);if(!i.valid){H(e,i.error);return}if(f){const $=f(o);if(!$.valid){H(e,$.error);return}}const c=j();o.id=c,v.set(c,o);const g=L(o,{id:c,status:"uploading",progress:0});s.insertAdjacentHTML("beforeend",g),M(e,o,c)})}function w(e){return h&&e.size>h?{valid:!1,error:`O arquivo "${e.name}" excede o tamanho máximo permitido.`}:k.length>0&&!k.some(s=>s.startsWith(".")?e.name.toLowerCase().endsWith(s.toLowerCase()):e.type===s)?{valid:!1,error:"O formato do arquivo não é suportado."}:{valid:!0}}function M(e,t,s){const o=e.querySelector(`[data-file-id="${s}"]`);n?n(t,{onProgress:i=>{z(o,i),r&&r(t,i)},onSuccess:()=>{x(o,"success"),d&&d(t)},onError:i=>{x(o,"error",i),C&&C(t,i)}}):y(o,t)}function y(e,t){let s=0;const o=setInterval(()=>{s+=Math.random()*30,s>=100&&(s=100,clearInterval(o),setTimeout(()=>{x(e,"success"),d&&d(t)},300)),z(e,Math.floor(s))},500)}function z(e,t){const s=e.querySelector(".file-item-progress-fill"),o=e.querySelector(".file-item-meta span:last-child");s&&(s.style.width=`${t}%`),o&&(o.textContent=`${t}% de upload`)}function x(e,t,s=null){const o=v.get(e.dataset.fileId);if(!o)return;const i=L(o,{id:o.id,status:t,progress:100,error:s});e.outerHTML=i}function H(e,t){const s=e.querySelector("[data-upload-error]"),o=s.querySelector("[data-error-text]");o.textContent=t,s.style.display="flex",setTimeout(()=>{s.style.display="none"},5e3)}}function I(a){typeof a=="string"&&(a=document.querySelector(a));const l=a.querySelectorAll("[data-file-item]");return Array.from(l).map(n=>({id:n.dataset.fileId,element:n}))}const E={create:S,createFileItem:L,init:V,getFiles:I,icons:u,formatFileSize:B};export{E as F,S as c,V as i};
