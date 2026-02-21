/* empty css               */function t(l={}){const{label:d="Label",color:s="neutral",size:r="md",showDot:n=!0,outlined:i=!1,dark:u=!1,className:o=""}=l,a=["status-badge",`status-badge--${s}`];r!=="md"&&a.push(`status-badge--${r}`),i&&a.push("status-badge--outlined"),u&&a.push("status-badge--dark"),o&&a.push(o);const m=n?'<span class="status-dot"></span>':"";return`
    <span class="${a.join(" ")}">
      ${m}
      <span>${d}</span>
    </span>
  `}function c(l={}){const{label:d="Label",color:s="neutral",size:r="md",muted:n=!1,pulse:i=!1,dark:u=!1,className:o=""}=l,a=["status-simple",`status-simple--${s}`];r!=="md"&&a.push(`status-simple--${r}`),n&&a.push("status-simple--muted"),u&&a.push("status-simple--dark"),o&&a.push(o);const m=["status-dot"];return i&&m.push("status-dot--pulse"),`
    <span class="${a.join(" ")}">
      <span class="${m.join(" ")}"></span>
      <span>${d}</span>
    </span>
  `}function g(l={}){const{color:d="neutral",size:s="md",pulse:r=!1,dark:n=!1}=l,i={sm:"6px",md:"8px",lg:"10px"},u={success:n?"var(--success-400)":"var(--success)",warning:n?"var(--warning-400)":"var(--warning)",danger:n?"var(--danger-400)":"var(--danger)",info:n?"var(--info-400)":"var(--info)",neutral:n?"var(--gray-500)":"var(--gray-400)"},o=["status-dot"];return r&&o.push("status-dot--pulse"),`
    <span
      class="${o.join(" ")}"
      style="width: ${i[s]}; height: ${i[s]}; background: ${u[d]};"
    ></span>
  `}const b={draft:(l=!1)=>c({label:"Rascunho",color:"neutral",muted:!0,dark:l}),pre:(l=!1)=>t({label:"PRE",color:"inverted",dark:l}),canceled:(l=!1)=>t({label:"Cancelado",color:"danger",dark:l}),rejected:(l=!1)=>t({label:"Recusado",color:"danger",dark:l}),active:(l=!1)=>t({label:"Ativo",color:"success",dark:l}),suspended:(l=!1)=>c({label:"Suspenso",color:"neutral",muted:!0,dark:l}),online:(l=!1)=>t({label:"Online",color:"success",dark:l}),onlineSimple:(l=!1)=>c({label:"Online",color:"success",pulse:!0,dark:l}),offline:(l=!1)=>t({label:"Offline",color:"danger",dark:l}),offlineSimple:(l=!1)=>c({label:"Offline",color:"danger",dark:l}),waiting:(l=!1)=>t({label:"Waiting",color:"warning",dark:l}),waitingSimple:(l=!1)=>c({label:"Waiting",color:"warning",dark:l}),noResponse:(l=!1)=>c({label:"No response",color:"neutral",muted:!0,dark:l}),pending:(l=!1)=>t({label:"Pendente",color:"warning",dark:l}),completed:(l=!1)=>t({label:"Concluído",color:"success",dark:l}),inProgress:(l=!1)=>t({label:"Em progresso",color:"info",dark:l})};function p(l=[],d={}){const{gap:s="var(--space-2)",direction:r="row"}=d;return`
    <div style="${`display: flex; flex-direction: ${r}; gap: ${s}; flex-wrap: wrap;`}">
      ${l.join("")}
    </div>
  `}const e={createBadge:t,createSimple:c,createDot:g,createGroup:p,presets:b};function B(){document.getElementById("badge-success").innerHTML=e.createBadge({label:"Label",color:"success"}),document.getElementById("badge-warning").innerHTML=e.createBadge({label:"Label",color:"warning"}),document.getElementById("badge-danger").innerHTML=e.createBadge({label:"Label",color:"danger"}),document.getElementById("badge-neutral").innerHTML=e.createBadge({label:"Label",color:"neutral"}),document.getElementById("badge-inverted").innerHTML=e.createBadge({label:"Label",color:"inverted"}),document.getElementById("badge-info").innerHTML=e.createBadge({label:"Label",color:"info"}),document.getElementById("badge-success-sm").innerHTML=e.createBadge({label:"Label",color:"success",size:"sm"}),document.getElementById("badge-warning-sm").innerHTML=e.createBadge({label:"Label",color:"warning",size:"sm"}),document.getElementById("badge-danger-sm").innerHTML=e.createBadge({label:"Label",color:"danger",size:"sm"}),document.getElementById("badge-neutral-sm").innerHTML=e.createBadge({label:"Label",color:"neutral",size:"sm"}),document.getElementById("badge-inverted-sm").innerHTML=e.createBadge({label:"Label",color:"inverted",size:"sm"}),document.getElementById("badge-info-sm").innerHTML=e.createBadge({label:"Label",color:"info",size:"sm"}),document.getElementById("badge-success-outlined").innerHTML=e.createBadge({label:"Label",color:"success",outlined:!0}),document.getElementById("badge-warning-outlined").innerHTML=e.createBadge({label:"Label",color:"warning",outlined:!0}),document.getElementById("badge-danger-outlined").innerHTML=e.createBadge({label:"Label",color:"danger",outlined:!0}),document.getElementById("badge-neutral-outlined").innerHTML=e.createBadge({label:"Label",color:"neutral",outlined:!0}),document.getElementById("badge-inverted-outlined").innerHTML=e.createBadge({label:"Label",color:"inverted",outlined:!0}),document.getElementById("badge-info-outlined").innerHTML=e.createBadge({label:"Label",color:"info",outlined:!0}),document.getElementById("badge-success-outlined-sm").innerHTML=e.createBadge({label:"Label",color:"success",outlined:!0,size:"sm"}),document.getElementById("badge-warning-outlined-sm").innerHTML=e.createBadge({label:"Label",color:"warning",outlined:!0,size:"sm"}),document.getElementById("badge-danger-outlined-sm").innerHTML=e.createBadge({label:"Label",color:"danger",outlined:!0,size:"sm"}),document.getElementById("badge-neutral-outlined-sm").innerHTML=e.createBadge({label:"Label",color:"neutral",outlined:!0,size:"sm"}),document.getElementById("badge-inverted-outlined-sm").innerHTML=e.createBadge({label:"Label",color:"inverted",outlined:!0,size:"sm"}),document.getElementById("badge-info-outlined-sm").innerHTML=e.createBadge({label:"Label",color:"info",outlined:!0,size:"sm"}),document.getElementById("simple-success").innerHTML=e.createSimple({label:"Label",color:"success"}),document.getElementById("simple-warning").innerHTML=e.createSimple({label:"Label",color:"warning"}),document.getElementById("simple-danger").innerHTML=e.createSimple({label:"Label",color:"danger"}),document.getElementById("simple-neutral").innerHTML=e.createSimple({label:"Label",color:"neutral"}),document.getElementById("simple-inverted").innerHTML=e.createSimple({label:"Label",color:"info"}),document.getElementById("simple-info").innerHTML=e.createSimple({label:"Label",color:"info"}),document.getElementById("simple-success-sm").innerHTML=e.createSimple({label:"Label",color:"success",size:"sm"}),document.getElementById("simple-warning-sm").innerHTML=e.createSimple({label:"Label",color:"warning",size:"sm"}),document.getElementById("simple-danger-sm").innerHTML=e.createSimple({label:"Label",color:"danger",size:"sm"}),document.getElementById("simple-neutral-sm").innerHTML=e.createSimple({label:"Label",color:"neutral",size:"sm"}),document.getElementById("simple-inverted-sm").innerHTML=e.createSimple({label:"Label",color:"info",size:"sm"}),document.getElementById("simple-info-sm").innerHTML=e.createSimple({label:"Label",color:"info",size:"sm"}),document.getElementById("example-light").innerHTML=`
    <div class="example-list">
      <div class="example-item">
        ${e.createSimple({label:"Rascunho",color:"neutral",muted:!0})}
        ${e.createBadge({label:"PRE",color:"inverted"})}
      </div>
      <div class="example-item">
        ${e.createBadge({label:"Cancelado",color:"danger"})}
        ${e.createBadge({label:"Recusado",color:"danger"})}
      </div>
      <div class="example-item">
        ${e.createBadge({label:"Ativo",color:"success"})}
        ${e.createSimple({label:"Suspenso",color:"neutral",muted:!0})}
      </div>
      <div class="example-item">
        ${e.createBadge({label:"Label",color:"neutral"})}
        ${e.createBadge({label:"Label",color:"danger"})}
      </div>
      <div class="example-item">
        ${e.createBadge({label:"Online",color:"success"})}
        ${e.createBadge({label:"Waiting",color:"warning"})}
      </div>
      <div class="example-item">
        ${e.createBadge({label:"Label",color:"inverted"})}
        ${e.createSimple({label:"Online",color:"success",pulse:!0})}
      </div>
      <div class="example-item">
        ${e.createSimple({label:"Offline",color:"danger"})}
        ${e.createSimple({label:"Waiting",color:"warning"})}
      </div>
      <div class="example-item">
        ${e.createSimple({label:"No response",color:"neutral",muted:!0})}
      </div>
    </div>
  `,document.getElementById("example-dark").innerHTML=`
    <div class="example-list">
      <div class="example-item">
        ${e.createSimple({label:"Rascunho",color:"neutral",muted:!0,dark:!0})}
        ${e.createBadge({label:"PRE",color:"inverted",dark:!0})}
      </div>
      <div class="example-item">
        ${e.createBadge({label:"Cancelado",color:"danger",dark:!0})}
        ${e.createBadge({label:"Recusado",color:"danger",dark:!0})}
      </div>
      <div class="example-item">
        ${e.createBadge({label:"Ativo",color:"success",dark:!0})}
        ${e.createSimple({label:"Suspenso",color:"neutral",muted:!0,dark:!0})}
      </div>
      <div class="example-item">
        ${e.createBadge({label:"Label",color:"neutral",dark:!0})}
        ${e.createBadge({label:"Label",color:"danger",dark:!0})}
      </div>
      <div class="example-item">
        ${e.createBadge({label:"Online",color:"success",dark:!0})}
        ${e.createBadge({label:"Waiting",color:"warning",dark:!0})}
      </div>
      <div class="example-item">
        ${e.createBadge({label:"Label",color:"inverted",dark:!0})}
        ${e.createSimple({label:"Online",color:"success",pulse:!0,dark:!0})}
      </div>
      <div class="example-item">
        ${e.createSimple({label:"Offline",color:"danger",dark:!0})}
        ${e.createSimple({label:"Waiting",color:"warning",dark:!0})}
      </div>
      <div class="example-item">
        ${e.createSimple({label:"No response",color:"neutral",muted:!0,dark:!0})}
      </div>
    </div>
  `}export{B as init};
