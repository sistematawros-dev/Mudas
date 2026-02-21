/* empty css                   */const c={chevronLeft:'<svg viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronRight:'<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronsLeft:'<svg viewBox="0 0 16 16" fill="none"><path d="M7 4L3 8L7 12M13 4L9 8L13 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronsRight:'<svg viewBox="0 0 16 16" fill="none"><path d="M9 4L13 8L9 12M3 4L7 8L3 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function w(s={}){const{currentPage:t=1,totalPages:a=10,totalItems:n=100,itemsPerPage:e=10,showEntries:o=!0,showInfo:i=!0,showFirstLast:g=!1,entriesOptions:l=[10,20,50,100],maxVisiblePages:u=5,size:m="md",variant:f="default",align:$="between",dark:b=!1,className:P=""}=s,d=["pagination",`pagination--${$}`];m!=="md"&&d.push(`pagination--${m}`),f!=="default"&&d.push(`pagination--${f}`),b&&d.push("pagination--dark"),P&&d.push(P);let h="";if(o||i){const I=(t-1)*e+1,k=Math.min(t*e,n),M=o?`
      <div class="pagination-entries">
        <select data-pagination-entries>
          ${l.map(p=>`<option value="${p}" ${p===e?"selected":""}>${p} Entries</option>`).join("")}
        </select>
      </div>
    `:"",E=i?`
      <span class="pagination-text">
        Showing <strong>${I}</strong> to <strong>${k}</strong> of <strong>${n}</strong> entries
      </span>
    `:"";h=`<div class="pagination-info">${M}${E}</div>`}const L=v(t,a,u,g);return`
    <nav class="${d.join(" ")}" data-pagination data-current="${t}" data-total="${a}">
      ${h}
      <ul class="pagination-list">
        ${L}
      </ul>
    </nav>
  `}function v(s,t,a,n){let e="";return n&&(e+=`
      <li class="pagination-item">
        <button class="pagination-btn pagination-btn--nav" data-page="1" ${s===1?"disabled":""}>
          ${c.chevronsLeft}
        </button>
      </li>
    `),e+=`
    <li class="pagination-item">
      <button class="pagination-btn pagination-btn--nav" data-page="${s-1}" ${s===1?"disabled":""}>
        ${c.chevronLeft}
      </button>
    </li>
  `,T(s,t,a).forEach((i,g)=>{i==="..."?e+='<li class="pagination-item"><span class="pagination-ellipsis">...</span></li>':e+=`
        <li class="pagination-item">
          <button class="pagination-btn ${i===s?"is-active":""}" data-page="${i}">${i}</button>
        </li>
      `}),e+=`
    <li class="pagination-item">
      <button class="pagination-btn pagination-btn--nav" data-page="${s+1}" ${s===t?"disabled":""}>
        ${c.chevronRight}
      </button>
    </li>
  `,n&&(e+=`
      <li class="pagination-item">
        <button class="pagination-btn pagination-btn--nav" data-page="${t}" ${s===t?"disabled":""}>
          ${c.chevronsRight}
        </button>
      </li>
    `),e}function T(s,t,a){if(t<=a)return Array.from({length:t},(g,l)=>l+1);const n=[],e=Math.floor(a/2);let o=Math.max(1,s-e),i=Math.min(t,o+a-1);i-o<a-1&&(o=Math.max(1,i-a+1)),o>1&&(n.push(1),o>2&&n.push("..."));for(let g=o;g<=i;g++)g!==1&&g!==t&&n.push(g);return i<t&&(i<t-1&&n.push("..."),n.push(t)),n}function x(s={}){const{currentPage:t=1,totalPages:a=10,dark:n=!1,size:e="md"}=s,o=["pagination","pagination--center"];e!=="md"&&o.push(`pagination--${e}`),n&&o.push("pagination--dark");const i=v(t,a,7,!1);return`
    <nav class="${o.join(" ")}" data-pagination data-current="${t}" data-total="${a}">
      <ul class="pagination-list">${i}</ul>
    </nav>
  `}function B(s={}){const{currentPage:t=1,totalPages:a=5,size:n="md",dark:e=!1,className:o=""}=s,i=["pagination-dots"];n!=="md"&&i.push(`pagination-dots--${n}`),e&&i.push("pagination-dots--dark"),o&&i.push(o);let g="";for(let l=1;l<=a;l++)g+=`<button class="pagination-dot ${l===t?"is-active":""}" data-page="${l}" aria-label="Página ${l}"></button>`;return`<div class="${i.join(" ")}" data-pagination-dots data-current="${t}">${g}</div>`}function H(s={}){const{currentPage:t=1,totalPages:a=10,prevText:n="Anterior",nextText:e="Próximo",dark:o=!1}=s,i=["pagination","pagination--between"];return o&&i.push("pagination--dark"),`
    <nav class="${i.join(" ")}" data-pagination data-current="${t}" data-total="${a}">
      <button class="pagination-btn pagination-btn--nav" data-page="${t-1}" ${t===1?"disabled":""}>
        ${c.chevronLeft}
        <span>${n}</span>
      </button>
      <span class="pagination-text">Página <strong>${t}</strong> de <strong>${a}</strong></span>
      <button class="pagination-btn pagination-btn--nav" data-page="${t+1}" ${t===a?"disabled":""}>
        <span>${e}</span>
        ${c.chevronRight}
      </button>
    </nav>
  `}function y(s=document,t=null){s.addEventListener("click",a=>{const n=a.target.closest("[data-page]");if(!n||n.disabled)return;const e=n.closest("[data-pagination], [data-pagination-dots]");if(!e)return;const o=parseInt(n.dataset.page),i=parseInt(e.dataset.current),g=parseInt(e.dataset.total||999);o<1||o>g||o===i||t&&t({page:o,previousPage:i,total:g})}),s.addEventListener("change",a=>{const n=a.target.closest("[data-pagination-entries]");if(!n)return;const e=parseInt(n.value);t&&t({entriesPerPage:e})})}function j(s,t={}){const{currentPage:a,totalPages:n}=t,e=s.querySelector("[data-pagination]");e&&a!==void 0&&(e.dataset.current=a)}const r={create:w,createSimple:x,createDots:B,createPrevNext:H,init:y,update:j,icons:c};function A(){document.getElementById("pagination-default").innerHTML=r.create({currentPage:3,totalPages:10,totalItems:97,itemsPerPage:10,showEntries:!0,showInfo:!0}),document.getElementById("pagination-simple").innerHTML=r.createSimple({currentPage:5,totalPages:12}),document.getElementById("pagination-first-last").innerHTML=r.create({currentPage:7,totalPages:20,totalItems:200,itemsPerPage:10,showFirstLast:!0}),document.getElementById("pagination-outlined").innerHTML=r.create({currentPage:2,totalPages:8,totalItems:75,itemsPerPage:10,variant:"outlined"}),document.getElementById("pagination-compact").innerHTML=r.create({currentPage:4,totalPages:15,totalItems:150,itemsPerPage:10,variant:"compact",showEntries:!1}),document.getElementById("pagination-prev-next").innerHTML=r.createPrevNext({currentPage:3,totalPages:10,prevText:"Anterior",nextText:"Próximo"}),document.getElementById("pagination-dots").innerHTML=r.createDots({currentPage:2,totalPages:5}),document.getElementById("pagination-sm").innerHTML=r.createSimple({currentPage:2,totalPages:5,size:"sm"}),document.getElementById("pagination-md").innerHTML=r.createSimple({currentPage:2,totalPages:5,size:"md"}),document.getElementById("pagination-lg").innerHTML=r.createSimple({currentPage:2,totalPages:5,size:"lg"}),document.getElementById("pagination-dark").innerHTML=r.create({currentPage:3,totalPages:10,totalItems:97,itemsPerPage:10,dark:!0}),document.getElementById("pagination-dots-dark").innerHTML=r.createDots({currentPage:3,totalPages:5,dark:!0}),document.getElementById("pagination-start").innerHTML=r.create({currentPage:1,totalPages:5,showEntries:!1,showInfo:!1,align:"start"}),document.getElementById("pagination-center").innerHTML=r.create({currentPage:2,totalPages:5,showEntries:!1,showInfo:!1,align:"center"}),document.getElementById("pagination-end").innerHTML=r.create({currentPage:3,totalPages:5,showEntries:!1,showInfo:!1,align:"end"}),r.init(document,s=>{console.log("Pagination changed:",s)})}export{A as init};
