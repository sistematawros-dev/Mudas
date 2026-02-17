const p={search:'<svg viewBox="0 0 24 24" fill="none"><path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',sortAsc:'<svg viewBox="0 0 10 6" fill="none"><path d="M1 5L5 1L9 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',sortDesc:'<svg viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronLeft:'<svg viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronRight:'<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>',starEmpty:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function w(e={}){const{id:a=`table-${Date.now()}`,title:t="",subtitle:c="",columns:s=[],data:g=[],selectable:d=!1,sortable:n=!0,searchable:l=!0,pagination:o=!0,pageSize:r=10,currentPage:i=1,totalItems:v=0,variant:b="default",dark:u=!1,className:f=""}=e,$=["table-container"];u&&$.push("table-container--dark"),f&&$.push(f);const S=["table"];b!=="default"&&S.push(`table--${b}`);const C=t||l?`
    <div class="table-toolbar">
      <div class="table-toolbar-left">
        ${t?`
          <div>
            <h3 class="table-title">${t}</h3>
            ${c?`<p class="table-subtitle">${c}</p>`:""}
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
  `:"",M=`
    <thead>
      <tr>
        ${d?'<th class="table-checkbox"><input type="checkbox" data-table-select-all /></th>':""}
        ${s.map(m=>{const k=n&&m.sortable!==!1,y=k?`
            <span class="table-sort">
              <span class="table-sort-asc">${p.sortAsc}</span>
              <span class="table-sort-desc">${p.sortDesc}</span>
            </span>
          `:"";return`
            <th
              ${k?'class="is-sortable"':""}
              data-column="${m.key}"
              ${m.width?`style="width: ${m.width}"`:""}
            >
              ${m.label}${y}
            </th>
          `}).join("")}
      </tr>
    </thead>
  `,E=`
    <tbody>
      ${g.map((m,k)=>`
        <tr data-row="${k}">
          ${d?`<td class="table-checkbox"><input type="checkbox" data-table-select="${k}" /></td>`:""}
          ${s.map(y=>`
            <td>${B(m[y.key],y,m)}</td>
          `).join("")}
        </tr>
      `).join("")}
    </tbody>
  `,L=v||g.length,A=Math.ceil(L/r),x=(i-1)*r+1,I=Math.min(i*r,L),j=o?`
    <div class="table-footer">
      <div class="table-info">
        Mostrando ${x} a ${I} de ${L} resultados
      </div>
      <div class="table-pagination">
        <button class="table-pagination-btn" data-page="prev" ${i===1?"disabled":""}>
          ${p.chevronLeft}
        </button>
        ${H(i,A)}
        <button class="table-pagination-btn" data-page="next" ${i===A?"disabled":""}>
          ${p.chevronRight}
        </button>
      </div>
    </div>
  `:"";return`
    <div class="${$.join(" ")}" data-table id="${a}">
      ${C}
      <div class="table-wrapper">
        <table class="${S.join(" ")}">
          ${M}
          ${E}
        </table>
      </div>
      ${j}
    </div>
  `}function B(e,a,t){switch(a.type||"text"){case"user":return`
        <div class="table-cell-user">
          ${t.avatar?`<img src="${t.avatar}" alt="" class="table-cell-avatar" />`:""}
          <div class="table-cell-user-info">
            <span class="table-cell-user-name">${e}</span>
            ${t.email?`<span class="table-cell-user-email">${t.email}</span>`:""}
          </div>
        </div>
      `;case"status":return`<span class="table-cell-status table-cell-status--${P(e)}">${e}</span>`;case"rating":return q(e);case"link":return`<a href="${t.href||"#"}" class="table-cell-link">${e}</a>`;case"badge":return`<span class="table-cell-status table-cell-status--neutral">${e}</span>`;case"actions":return`<div class="table-cell-actions">${e}</div>`;default:return e??"-"}}function P(e){return{ativo:"success",active:"success",online:"success",aprovado:"success",pendente:"warning",pending:"warning",aguardando:"warning",inativo:"danger",inactive:"danger",cancelado:"danger",rejected:"danger",offline:"danger"}[e?.toLowerCase()]||"neutral"}function q(e){const a=parseInt(e)||0,t=5;let c='<div class="table-cell-rating">';for(let s=1;s<=t;s++)c+=s<=a?p.star:`<span class="is-empty">${p.starEmpty}</span>`;return c+="</div>",c}function H(e,a){if(a<=1)return"";const t=[];if(a<=5)for(let s=1;s<=a;s++)t.push(s);else{t.push(1),e>3&&t.push("...");const s=Math.max(2,e-1),g=Math.min(a-1,e+1);for(let d=s;d<=g;d++)t.push(d);e<a-2&&t.push("..."),t.push(a)}return t.map(s=>s==="..."?'<span class="table-pagination-btn" style="cursor: default; border: none;">...</span>':`
      <button class="table-pagination-btn ${s===e?"is-active":""}" data-page="${s}">
        ${s}
      </button>
    `).join("")}function z(e={}){return w({...e,searchable:!1,title:""})}function T(e=document,a={}){const{onSort:t,onSearch:c,onPageChange:s,onSelect:g,onSelectAll:d}=a;e.addEventListener("click",n=>{const l=n.target.closest("th.is-sortable");if(l){const r=l.closest("[data-table]"),i=l.dataset.column,v=l.classList.contains("is-sorted-asc"),b=l.classList.contains("is-sorted-desc");r.querySelectorAll("th").forEach(f=>{f.classList.remove("is-sorted-asc","is-sorted-desc")});let u="asc";v?(l.classList.add("is-sorted-desc"),u="desc"):b?u=null:l.classList.add("is-sorted-asc"),t&&t({column:i,direction:u,element:r})}const o=n.target.closest("[data-page]");if(o&&!o.disabled){const r=o.closest("[data-table]"),i=o.dataset.page;s&&s({page:i,element:r})}}),e.addEventListener("input",n=>{if(n.target.matches("[data-table-search]")){const l=n.target.closest("[data-table]"),o=n.target.value;c&&c({query:o,element:l})}}),e.addEventListener("change",n=>{if(n.target.matches("[data-table-select-all]")){const l=n.target.closest("[data-table]"),o=n.target.checked;l.querySelectorAll("[data-table-select]").forEach(r=>{r.checked=o,r.closest("tr").classList.toggle("is-selected",o)}),d&&d({checked:o,element:l})}if(n.target.matches("[data-table-select]")){const l=n.target.closest("[data-table]"),o=n.target.closest("tr"),r=n.target.dataset.tableSelect,i=n.target.checked;o.classList.toggle("is-selected",i);const v=l.querySelectorAll("[data-table-select]"),b=l.querySelectorAll("[data-table-select]:checked").length,u=l.querySelector("[data-table-select-all]");u&&(u.checked=b===v.length,u.indeterminate=b>0&&b<v.length),g&&g({rowIndex:r,checked:i,element:l})}})}function F(e){const a=[];return e.querySelectorAll("[data-table-select]:checked").forEach(t=>{a.push(parseInt(t.dataset.tableSelect))}),a}function U(e){e.querySelectorAll("[data-table-select]").forEach(t=>{t.checked=!1,t.closest("tr").classList.remove("is-selected")});const a=e.querySelector("[data-table-select-all]");a&&(a.checked=!1,a.indeterminate=!1)}const h={create:w,createSimple:z,init:T,getSelectedRows:F,clearSelection:U,icons:p};function D(){const e=[{id:1,name:"João Silva",email:"joao@email.com",role:"Admin",status:"Ativo",date:"2024-01-15"},{id:2,name:"Maria Santos",email:"maria@email.com",role:"Editor",status:"Ativo",date:"2024-01-14"},{id:3,name:"Pedro Costa",email:"pedro@email.com",role:"Viewer",status:"Pendente",date:"2024-01-13"},{id:4,name:"Ana Oliveira",email:"ana@email.com",role:"Editor",status:"Inativo",date:"2024-01-12"},{id:5,name:"Carlos Souza",email:"carlos@email.com",role:"Admin",status:"Ativo",date:"2024-01-11"}],a=[{id:1,name:"João Silva",email:"joao@email.com",avatar:"https://i.pravatar.cc/150?u=1",role:"Admin",status:"Ativo",rating:5},{id:2,name:"Maria Santos",email:"maria@email.com",avatar:"https://i.pravatar.cc/150?u=2",role:"Editor",status:"Ativo",rating:4},{id:3,name:"Pedro Costa",email:"pedro@email.com",avatar:"https://i.pravatar.cc/150?u=3",role:"Viewer",status:"Pendente",rating:3},{id:4,name:"Ana Oliveira",email:"ana@email.com",avatar:"https://i.pravatar.cc/150?u=4",role:"Editor",status:"Inativo",rating:4},{id:5,name:"Carlos Souza",email:"carlos@email.com",avatar:"https://i.pravatar.cc/150?u=5",role:"Admin",status:"Ativo",rating:5}];document.getElementById("table-basic").innerHTML=h.create({title:"Usuários",subtitle:"Lista de todos os usuários do sistema",columns:[{key:"name",label:"Nome"},{key:"email",label:"Email"},{key:"role",label:"Função"},{key:"status",label:"Status",type:"status"},{key:"date",label:"Data"}],data:e,pagination:!0,pageSize:10,currentPage:1,totalItems:e.length}),document.getElementById("table-selection").innerHTML=h.create({title:"Usuários",columns:[{key:"name",label:"Nome"},{key:"email",label:"Email"},{key:"role",label:"Função"},{key:"status",label:"Status",type:"status"}],data:e,selectable:!0,pagination:!0,pageSize:10,currentPage:1,totalItems:e.length}),document.getElementById("table-cells").innerHTML=h.create({title:"Usuários",columns:[{key:"name",label:"Usuário",type:"user"},{key:"role",label:"Função",type:"badge"},{key:"status",label:"Status",type:"status"},{key:"rating",label:"Avaliação",type:"rating"}],data:a,selectable:!0,pagination:!0,pageSize:10,currentPage:1,totalItems:a.length}),document.getElementById("table-striped").innerHTML=h.create({columns:[{key:"name",label:"Nome"},{key:"email",label:"Email"},{key:"role",label:"Função"},{key:"status",label:"Status",type:"status"}],data:e,variant:"striped",searchable:!1,pagination:!1}),document.getElementById("table-compact").innerHTML=h.create({columns:[{key:"name",label:"Nome"},{key:"email",label:"Email"},{key:"role",label:"Função"},{key:"status",label:"Status",type:"status"}],data:e,variant:"compact",searchable:!1,pagination:!1}),document.getElementById("table-dark").innerHTML=h.create({title:"Usuários",columns:[{key:"name",label:"Usuário",type:"user"},{key:"role",label:"Função",type:"badge"},{key:"status",label:"Status",type:"status"},{key:"rating",label:"Avaliação",type:"rating"}],data:a,selectable:!0,dark:!0,pagination:!0,pageSize:10,currentPage:1,totalItems:a.length}),h.init(document,{onSort:t=>{console.log("Sort:",t)},onSearch:t=>{console.log("Search:",t)},onPageChange:t=>{console.log("Page:",t)},onSelect:t=>{console.log("Select:",t)},onSelectAll:t=>{console.log("Select All:",t)}})}export{D as init};
