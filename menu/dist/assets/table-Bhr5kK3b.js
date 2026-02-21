/* empty css              */const p={search:'<svg viewBox="0 0 24 24" fill="none"><path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',sortAsc:'<svg viewBox="0 0 10 6" fill="none"><path d="M1 5L5 1L9 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',sortDesc:'<svg viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronLeft:'<svg viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronRight:'<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>',starEmpty:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function C(t={}){const{id:s=`table-${Date.now()}`,title:e="",subtitle:i="",columns:a=[],data:g=[],selectable:d=!1,sortable:n=!0,searchable:l=!0,pagination:c=!0,pageSize:o=10,currentPage:r=1,totalItems:f=0,variant:b="default",dark:u=!1,className:$=""}=t,m=["table-container"];u&&m.push("table-container--dark"),$&&m.push($);const w=["table"];b!=="default"&&w.push(`table--${b}`);const x=e||l?`
    <div class="table-toolbar">
      <div class="table-toolbar-left">
        ${e?`
          <div>
            <h3 class="table-title">${e}</h3>
            ${i?`<p class="table-subtitle">${i}</p>`:""}
          </div>
        `:""}
      </div>
      <div class="table-toolbar-right">
        ${l?`
          <div class="table-search">
            <span class="table-search-icon">${p.search}</span>
            <input type="text" class="table-search-input" placeholder="Pesquisar" data-table-search />
          </div>
        `:""}
      </div>
    </div>
  `:"",S=`
    <thead>
      <tr>
        ${d?'<th class="table-checkbox"><input type="checkbox" data-table-select-all /></th>':""}
        ${a.map(h=>{const v=n&&h.sortable!==!1,k=v?`
            <span class="table-sort">
              <span class="table-sort-asc">${p.sortAsc}</span>
              <span class="table-sort-desc">${p.sortDesc}</span>
            </span>
          `:"";return`
            <th
              ${v?'class="is-sortable"':""}
              data-column="${h.key}"
              ${h.width?`style="width: ${h.width}"`:""}
            >
              ${h.label}${k}
            </th>
          `}).join("")}
      </tr>
    </thead>
  `,M=`
    <tbody>
      ${g.map((h,v)=>`
        <tr data-row="${v}">
          ${d?`<td class="table-checkbox"><input type="checkbox" data-table-select="${v}" /></td>`:""}
          ${a.map(k=>`
            <td>${B(h[k.key],k,h)}</td>
          `).join("")}
        </tr>
      `).join("")}
    </tbody>
  `,L=f||g.length,y=Math.ceil(L/o),j=(r-1)*o+1,A=Math.min(r*o,L),q=c?`
    <div class="table-footer">
      <div class="table-info">
        Mostrando ${j} a ${A} de ${L} resultados
      </div>
      <div class="table-pagination">
        <button class="table-pagination-btn" data-page="prev" ${r===1?"disabled":""}>
          ${p.chevronLeft}
        </button>
        ${P(r,y)}
        <button class="table-pagination-btn" data-page="next" ${r===y?"disabled":""}>
          ${p.chevronRight}
        </button>
      </div>
    </div>
  `:"";return`
    <div class="${m.join(" ")}" data-table id="${s}">
      ${x}
      <div class="table-wrapper">
        <table class="${w.join(" ")}">
          ${S}
          ${M}
        </table>
      </div>
      ${q}
    </div>
  `}function B(t,s,e){switch(s.type||"text"){case"user":return`
        <div class="table-cell-user">
          ${e.avatar?`<img src="${e.avatar}" alt="" class="table-cell-avatar" />`:""}
          <div class="table-cell-user-info">
            <span class="table-cell-user-name">${t}</span>
            ${e.email?`<span class="table-cell-user-email">${e.email}</span>`:""}
          </div>
        </div>
      `;case"status":return`<span class="table-cell-status table-cell-status--${E(t)}">${t}</span>`;case"rating":return I(t);case"link":return`<a href="${e.href||"#"}" class="table-cell-link">${t}</a>`;case"badge":return`<span class="table-cell-status table-cell-status--neutral">${t}</span>`;case"actions":return`<div class="table-cell-actions">${t}</div>`;default:return t??"-"}}function E(t){return{ativo:"success",active:"success",online:"success",aprovado:"success",pendente:"warning",pending:"warning",aguardando:"warning",inativo:"danger",inactive:"danger",cancelado:"danger",rejected:"danger",offline:"danger"}[t?.toLowerCase()]||"neutral"}function I(t){const s=parseInt(t)||0,e=5;let i='<div class="table-cell-rating">';for(let a=1;a<=e;a++)i+=a<=s?p.star:`<span class="is-empty">${p.starEmpty}</span>`;return i+="</div>",i}function P(t,s){if(s<=1)return"";const e=[];if(s<=5)for(let a=1;a<=s;a++)e.push(a);else{e.push(1),t>3&&e.push("...");const a=Math.max(2,t-1),g=Math.min(s-1,t+1);for(let d=a;d<=g;d++)e.push(d);t<s-2&&e.push("..."),e.push(s)}return e.map(a=>a==="..."?'<span class="table-pagination-btn" style="cursor: default; border: none;">...</span>':`
      <button class="table-pagination-btn ${a===t?"is-active":""}" data-page="${a}">
        ${a}
      </button>
    `).join("")}function D(t={}){return C({...t,searchable:!1,title:""})}function H(t=document,s={}){const{onSort:e,onSearch:i,onPageChange:a,onSelect:g,onSelectAll:d}=s;t.addEventListener("click",n=>{const l=n.target.closest("th.is-sortable");if(l){const o=l.closest("[data-table]"),r=l.dataset.column,f=l.classList.contains("is-sorted-asc"),b=l.classList.contains("is-sorted-desc");o.querySelectorAll("th").forEach($=>{$.classList.remove("is-sorted-asc","is-sorted-desc")});let u="asc";f?(l.classList.add("is-sorted-desc"),u="desc"):b?u=null:l.classList.add("is-sorted-asc"),e&&e({column:r,direction:u,element:o})}const c=n.target.closest("[data-page]");if(c&&!c.disabled){const o=c.closest("[data-table]"),r=c.dataset.page;a&&a({page:r,element:o})}}),t.addEventListener("input",n=>{if(n.target.matches("[data-table-search]")){const l=n.target.closest("[data-table]"),c=n.target.value;i&&i({query:c,element:l})}}),t.addEventListener("change",n=>{if(n.target.matches("[data-table-select-all]")){const l=n.target.closest("[data-table]"),c=n.target.checked;l.querySelectorAll("[data-table-select]").forEach(o=>{o.checked=c,o.closest("tr").classList.toggle("is-selected",c)}),d&&d({checked:c,element:l})}if(n.target.matches("[data-table-select]")){const l=n.target.closest("[data-table]"),c=n.target.closest("tr"),o=n.target.dataset.tableSelect,r=n.target.checked;c.classList.toggle("is-selected",r);const f=l.querySelectorAll("[data-table-select]"),b=l.querySelectorAll("[data-table-select]:checked").length,u=l.querySelector("[data-table-select-all]");u&&(u.checked=b===f.length,u.indeterminate=b>0&&b<f.length),g&&g({rowIndex:o,checked:r,element:l})}})}function R(t){const s=[];return t.querySelectorAll("[data-table-select]:checked").forEach(e=>{s.push(parseInt(e.dataset.tableSelect))}),s}function Z(t){t.querySelectorAll("[data-table-select]").forEach(e=>{e.checked=!1,e.closest("tr").classList.remove("is-selected")});const s=t.querySelector("[data-table-select-all]");s&&(s.checked=!1,s.indeterminate=!1)}const V={create:C,createSimple:D,init:H,getSelectedRows:R,clearSelection:Z,icons:p};export{V as T,D as c};
