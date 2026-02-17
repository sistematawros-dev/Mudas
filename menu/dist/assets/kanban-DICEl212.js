import{i as f,c as me,a as be}from"./drawer-BDW5OHfS.js";/* empty css              */import{c as $e}from"./tabs-3AqIBK_U.js";import{i as ge,b as ee,c as m,a as He}from"./input-CJxodaL9.js";import{c as qe}from"./checkbox-DFfd8jyA.js";import{c as Qe}from"./toggle-0WXiSHpn.js";import{c as ae,a as Q}from"./chip-1Or3KqV6.js";/* empty css               */import{c as re,o as ce,a as fe}from"./modal-Dp0JtUxg.js";import{i as Ve,c as Oe}from"./file-upload-D_D3qwO7.js";function we(e="id"){return typeof crypto<"u"&&crypto.randomUUID?`${e}-${crypto.randomUUID().split("-")[0]}`:`${e}-${Math.random().toString(36).substring(2,11)}`}function Ue(...e){return e.filter(Boolean).join(" ")}function Ge(e={}){const{title:a="",count:t=0,color:o="gray",id:n=we("column")}=e;return`
    <section class="kanban-column kanban-column--${o}" data-column-id="${n}" data-column-color="${o}">
      <div class="kanban-column__header">
        <div class="kanban-column__title-wrapper">
          <h3 class="kanban-column__title">${a}</h3>
          <span class="kanban-column__count">${t}</span>
        </div>
        <button class="kanban-column__settings" data-column-settings="${n}" aria-label="Configurações da coluna">
          ${f("settings",{size:20})}
        </button>
      </div>
      <div class="kanban-column__content" data-column-content="${n}">
        <!-- Cards serão inseridos aqui -->
      </div>
    </section>
  `}function We(e,a){const t=document.querySelector(`[data-column-content="${e}"]`);if(!t)return;const o=t.querySelector(".kanban-column__empty");o&&o.remove(),t.insertAdjacentHTML("beforeend",a),Ye(e)}function Ye(e){const a=document.querySelector(`[data-column-id="${e}"]`);if(!a)return;const o=a.querySelector(`[data-column-content="${e}"]`).querySelectorAll(".kanban-card").length,n=a.querySelector(".kanban-column__count");n&&(n.textContent=o)}function Je(e,a){const t=document.querySelector(`[data-column-id="${e}"]`);if(!t)return;["cyan","green","blue","indigo","slate","purple","yellow","pink","red","orange"].forEach(n=>t.classList.remove(`kanban-column--${n}`)),t.classList.add(`kanban-column--${a}`),t.dataset.columnColor=a}function Ke(e){const a=document.querySelector(`[data-column-content="${e}"]`);a&&(a.innerHTML=`
    <div class="kanban-column__empty">
      ${f("package",{size:48})}
      <p class="kanban-column__empty-text">Não há ordens de produção</p>
    </div>
  `)}const he={check:'<svg viewBox="0 0 14 14" fill="none"><path d="M11.5 4L5.5 10L2.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',x:'<svg viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',dot:'<span class="badge-dot"></span>'};function Xe(e={}){const{text:a="",variant:t="primary",style:o="filled",size:n="",icon:s="",darkMode:d=!1}=e,b=["badge"];o==="filled"?b.push(`badge--${t}`):b.push(`badge--${o}-${t}`),n&&b.push(`badge--${n}`),d&&b.push("badge--dark-mode");let h="";return s&&he[s]&&(h=s==="dot"?he[s]:`<span class="badge-icon">${he[s]}</span>`),`<span class="${b.join(" ")}">${h}${a}</span>`}function Ze(e={}){const{code:a="",subtitle:t="",badgeLabel:o="",badgeVariant:n="light",items:s=[],id:d=we("card")}=e,b=o?Xe({text:o,variant:n,size:"sm"}):"",h=s.map(v=>{if(v.type==="divider")return'<div class="kanban-card__divider"></div>';const x=v.icon||"circle";return`
      <div class="kanban-card__item">
        ${f(x,{size:16})}
        <span>${v.label||""}</span>
        ${v.value?`<span class="kanban-card__item-label">${v.value}</span>`:""}
      </div>
    `}).join("");return`
    <div class="kanban-card" data-card-id="${d}">
      <div class="kanban-card__header">
        <div class="kanban-card__title">
          <a href="#" class="kanban-card__code">${a}</a>
          ${t?`<span class="kanban-card__subtitle">${t}</span>`:""}
        </div>
        ${b}
      </div>
      <div class="kanban-card__body">
        ${h}
      </div>
    </div>
  `}const ea=[{value:"cyan",label:"Ciano"},{value:"green",label:"Verde"},{value:"blue",label:"Azul"},{value:"indigo",label:"Índigo"},{value:"slate",label:"Ardósia"},{value:"purple",label:"Roxo"},{value:"yellow",label:"Amarelo"},{value:"pink",label:"Rosa"},{value:"red",label:"Vermelho"},{value:"orange",label:"Laranja"}];function aa(e={}){const{id:a=we("color-picker"),selected:t="gray"}=e,o=ea.map(n=>`
    <button
      type="button"
      class="${Ue("color-picker__option",n.value===t&&"is-selected")}"
      data-color="${n.value}"
      aria-label="${n.label}"
      title="${n.label}"
    >
      <span class="color-picker__color color-picker__color--${n.value}"></span>
    </button>
  `).join("");return`
    <div class="color-picker" id="${a}" data-color-picker>
      <div class="color-picker__header">
        <h4 class="color-picker__title">Cor da Coluna</h4>
        <button type="button" class="color-picker__close" aria-label="Fechar" data-color-picker-close>
          ${f("close",{size:16})}
        </button>
      </div>
      <div class="color-picker__grid">
        ${o}
      </div>
    </div>
  `}function ta(e,a){if(!e)return;const t=e.querySelectorAll(".color-picker__option"),o=e.querySelector("[data-color-picker-close]");t.forEach(n=>{n.addEventListener("click",()=>{const s=n.dataset.color;t.forEach(d=>d.classList.remove("is-selected")),n.classList.add("is-selected"),a&&a(s)})}),o&&o.addEventListener("click",n=>{n.stopPropagation(),ke(e)})}function ke(e){e&&e.classList.remove("is-open")}function oa(e){e&&e.classList.toggle("is-open")}const ie={plus:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',check:'<svg viewBox="0 0 16 16" fill="none"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronRight:'<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronDown:'<svg viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',download:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 2V10M8 10L5 7M8 10L11 7M3 14H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',upload:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 10V2M8 2L5 5M8 2L11 5M3 14H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',edit:'<svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',trash:'<svg viewBox="0 0 16 16" fill="none"><path d="M3 4H13M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',close:'<svg viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',search:'<svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'};function A(e={}){const{text:a="",variant:t="primary",style:o="solid",size:n="",iconLeft:s="",iconRight:d="",iconOnly:b=!1,disabled:h=!1,loading:v=!1,block:x=!1,darkMode:T=!1,tag:L="button",href:w="",type:$="button"}=e,_=["btn"];o==="solid"?_.push(`btn--${t}`):_.push(`btn--${o}-${t}`),n&&_.push(`btn--${n}`),b&&_.push("btn--icon-only"),v&&_.push("btn--loading"),x&&_.push("btn--block"),T&&_.push("btn--dark-mode");const z=s&&ie[s]?`<span class="btn-icon">${ie[s]}</span>`:"",c=d&&ie[d]?`<span class="btn-icon">${ie[d]}</span>`:"",i=b&&s?`<span class="btn-icon">${ie[s]}</span>`:`${z}${a}${c}`,l=h?"disabled":"";return L==="a"?`<a href="${w}" class="${_.join(" ")}">${i}</a>`:`<button type="${$}" class="${_.join(" ")}" ${l}>${i}</button>`}const Me={columns:[{id:"aguardando-aprovacao",title:"Aguardando Agendamento",color:"green",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data planejada:",value:"14/01/2025"}]},{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data planejada:",value:"14/01/2025"}]}]},{id:"agendado",title:"Agendado",color:"blue",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data planejada:",value:"14/01/2025"}]}]},{id:"semeio",title:"Semeio",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]},{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"germinacao",title:"Germinação",color:"purple",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"casa-vegetacao",title:"Casa de Vegetação",color:"pink",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"aguardando-enxertia",title:"Aguardando Enxertia",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"sala-corte",title:"Sala de Corte",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"sala-fusao",title:"Sala de Fusão",color:"orange",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"adaptacao",title:"Adaptação",color:"yellow",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"expedicao",title:"Expedição",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"finalizado",title:"Finalizado",color:"green",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"cancelado",title:"Cancelado",color:"gray",cards:[]}]};function it(){const e=document.getElementById("app-header");e&&e.classList.add("header--kanban-compact-tabs");const a=na();da();const t=sa(),o=Ra(),n=ra(),s=$a(),d=La();return()=>{e&&e.classList.remove("header--kanban-compact-tabs"),typeof a=="function"&&a(),typeof t=="function"&&t(),typeof o=="function"&&o(),typeof n=="function"&&n(),typeof s=="function"&&s(),typeof d=="function"&&d()}}function na(){const e=document.getElementById("kanban-toolbar-chips"),a=["Badge","Badge","Badge"];e&&(e.innerHTML=a.map(n=>`
      <span class="kanban-chip">
        ${n}
        <svg class="kanban-chip__close" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
      </span>
    `).join(""));const t=document.getElementById("kanban-back-btn"),o=()=>{window.location.hash="#/producao"};return t&&t.addEventListener("click",o),()=>{t&&t.removeEventListener("click",o)}}function da(){const e=document.getElementById("kanban-board");e&&Me.columns.forEach(a=>{const t=Ge({id:a.id,title:a.title,color:a.color,count:a.cards.length});e.insertAdjacentHTML("beforeend",t),a.cards.length>0?a.cards.forEach((n,s)=>{const d=ia(n,a.id,s),b=Ze(d);We(a.id,b)}):Ke(a.id);const o=document.querySelector(`[data-column-id="${a.id}"]`);if(o){const n=o.querySelector(".kanban-column__header"),s=aa({id:`picker-${a.id}`,selected:a.color});n.style.position="relative",n.insertAdjacentHTML("beforeend",s)}})}function sa(){const e=[];Me.columns.forEach(t=>{const o=document.querySelector(`[data-column-settings="${t.id}"]`),n=document.getElementById(`picker-${t.id}`);if(!o||!n)return;const s=d=>{d.stopPropagation(),document.querySelectorAll("[data-color-picker]").forEach(b=>{b!==n&&ke(b)}),oa(n)};o.addEventListener("click",s),e.push({settingsBtn:o,handleSettingsClick:s}),ta(n,d=>{Je(t.id,d)})});const a=t=>{const o=t.target.closest("[data-color-picker]"),n=t.target.closest("[data-column-settings]");!o&&!n&&document.querySelectorAll("[data-color-picker]").forEach(s=>{ke(s)})};return document.addEventListener("click",a),()=>{e.forEach(({settingsBtn:t,handleSettingsClick:o})=>{t.removeEventListener("click",o)}),document.removeEventListener("click",a)}}function ia(e,a,t){return a==="aguardando-aprovacao"&&t===0?{...e,badgeLabel:"Normal",badgeVariant:"soft-info",subtitle:"",items:[{icon:"file",label:"Cód. do Cliente:",value:"001"},{icon:"user",label:"Fazenda Sol Nascente"},{type:"divider"},{icon:"calendar",label:"Data Abertura OP:",value:"14/01/2025"},{icon:"circle",label:"001 - Produto 1"},{icon:"circle",label:"Qtd:",value:"5.000"},{icon:"calendar",label:"Data Entrada:",value:"19/02/2025"},{icon:"calendar",label:"Previsão Saída:",value:"19/02/2025"}]}:{...e,badgeVariant:e.badgeVariant||"light",subtitle:e.subtitle||"TG-45678",items:la(a)}}function la(e){const a=[{icon:"user",label:"Fazenda Sol Nascente"},{type:"divider"},{icon:"calendar",label:"Pedido:",value:"14/01/2025"},{icon:"circle",label:"Tomate Cereja - Lote 123"},{icon:"circle",label:"Qtd:",value:"5.000"},{icon:"calendar",label:"Início:",value:"19/02/2025"}];return e==="semeio"&&(a[2]={icon:"calendar",label:"Data semeio:",value:"14/01/2025"},a[5]={icon:"map-pin",label:"Localização:",value:"Estufa 1"}),e==="germinacao"&&(a[2]={icon:"calendar",label:"Data semeio:",value:"14/01/2025"},a[5]={icon:"calendar",label:"Dias após semeio:",value:"14"},a.push({icon:"map-pin",label:"Localização:",value:"Estufa 1"})),a}function ra(){const e=document.getElementById("kanban-new-btn");if(!e)return()=>{};const a="kanban-new-production-drawer",t=document.querySelector(`[data-drawer="${a}"]`),o=document.querySelector(`[data-drawer-backdrop="${a}"]`);t&&t.remove(),o&&o.remove();const n=me({id:a,title:"Nova produção",width:430,content:fa(),footer:_a()});document.body.insertAdjacentHTML("beforeend",n);const s=be({id:a,root:document}),d=document.querySelector(`[data-drawer="${a}"]`);if(!d||!s)return()=>{};const b=ge(d),h=d.querySelector(".drawer__header"),v=d.querySelector(".new-production-drawer__status-wrap"),x=h?.querySelector("[data-drawer-close]");h&&v&&x&&(v.classList.add("is-in-header"),h.insertBefore(v,x));const T=d.querySelector("#new-production-origin");T&&T.setAttribute("data-drawer-autofocus","");const L="kanban-schedule-modal",w="kanban-reschedule-modal",$="kanban-tags-modal";let _=()=>{},z=null,c=pe(),i=()=>{},l=null,D=()=>{},q=null;const y=()=>{s.open(e)},r=({restoreFocus:g=!0}={})=>{S({restoreFocus:!1});const u=document.querySelector(`[data-modal="${L}"]`),C=document.querySelector(`[data-modal-backdrop="${L}"]`);!u||!C||(_(),re(L),d.classList.contains("is-open")&&(document.body.style.overflow="hidden"),u.remove(),C.remove(),g&&z&&typeof z.focus=="function"&&z.focus(),z=null)},S=({restoreFocus:g=!0}={})=>{const u=document.querySelector(`[data-modal="${w}"]`),C=document.querySelector(`[data-modal-backdrop="${w}"]`);!u||!C||(i(),re(w),(d.classList.contains("is-open")||document.querySelector(`[data-modal="${L}"]`))&&(document.body.style.overflow="hidden"),u.remove(),C.remove(),g&&l?.focus&&l.focus(),l=null)},P=({anchorEl:g=null,initialValues:u={}}={})=>{document.querySelector(`[data-modal="${w}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${w}"]`)?.remove();const C={date:u.date||ue(c.selectedDate),location:u.location||"",responsible:u.responsible||""};l=g,document.body.insertAdjacentHTML("beforeend",ba({modalId:w,values:C}));const k=document.querySelector(`[data-modal="${w}"]`),M=document.querySelector(`[data-modal-backdrop="${w}"]`);if(!k||!M)return;const V=ge(k),R=k.querySelector("#reschedule-date"),U=k.querySelector("#reschedule-location"),G=k.querySelector("#reschedule-responsible"),H=k.querySelector("[data-reschedule-error]"),K=k.querySelector("[data-modal-close]"),N=k.querySelector('[data-reschedule-action="cancel"]'),de=k.querySelector('[data-reschedule-action="confirm"]'),oe=()=>{H&&(H.hidden=!0),[R,U,G].forEach(I=>{I?.closest(".field")?.classList.remove("field--error")})},ve=()=>{oe();const I=[];return R?.value||I.push(R),U?.value?.trim()||I.push(U),G?.value?.trim()||I.push(G),I.length?(I.forEach(Re=>Re?.closest(".field")?.classList.add("field--error")),H&&(H.hidden=!1),I[0]?.focus?.(),!1):!0},te=()=>S(),se=I=>{I.target===M&&S()},W=I=>{I.key==="Escape"&&(I.preventDefault(),I.stopPropagation(),S())},Se=()=>{ve()&&(console.log("Reagendar confirmado",{data:R?.value||"",localizacao:U?.value?.trim()||"",responsavel:G?.value?.trim()||""}),S())};K?.addEventListener("click",te),N?.addEventListener("click",te),de?.addEventListener("click",Se),M.addEventListener("click",se),document.addEventListener("keydown",W,!0),[R,U,G].forEach(I=>{I?.addEventListener("input",oe)}),i=()=>{K?.removeEventListener("click",te),N?.removeEventListener("click",te),de?.removeEventListener("click",Se),M.removeEventListener("click",se),document.removeEventListener("keydown",W,!0),[R,U,G].forEach(I=>{I?.removeEventListener("input",oe)}),typeof V=="function"&&V(),i=()=>{}},ce(w),setTimeout(()=>{R?.focus&&R.focus()},120)},p=(g,u)=>{if(!g||!u)return;const C=g.querySelector("[data-schedule-period]");C&&(C.textContent=u.viewMode==="month"?Pe(u.currentDate):Fe(u.selectedDate));const k=g.querySelector("[data-schedule-calendar]");k&&(k.classList.toggle("schedule-modal__calendar--month",u.viewMode==="month"),k.classList.toggle("schedule-modal__calendar--week",u.viewMode==="week"),k.innerHTML=Ne(u)),g.querySelectorAll("[data-schedule-view]").forEach(V=>{V.classList.toggle("is-active",V.dataset.scheduleView===u.viewMode)});const M=g.querySelector("[data-schedule-day-title]");M&&(M.textContent=`Agendamentos para o dia ${u.selectedDate.getDate()}`)},j=()=>{const g=d.querySelector("#new-production-scheduling-date");g&&(g.value=ue(c.selectedDate),g.dispatchEvent(new Event("input",{bubbles:!0})))},B=g=>{const u=document.querySelector(`[data-modal="${L}"]`),C=document.querySelector(`[data-modal-backdrop="${L}"]`);u&&u.remove(),C&&C.remove(),c=pe(),z=g||null,document.body.insertAdjacentHTML("beforeend",Ie({modalId:L,state:c}));const k=document.querySelector(`[data-modal="${L}"]`),M=document.querySelector(`[data-modal-backdrop="${L}"]`);if(!k||!M)return;const V=k.querySelector("#schedule-location-select"),R=k.querySelector("[data-modal-close]"),U=()=>r(),G=N=>{N.target===M&&r()},H=N=>{N.key==="Escape"&&(document.querySelector(`[data-modal="${w}"]`)||(N.preventDefault(),N.stopPropagation(),r()))},K=N=>{const de=N.target.closest("[data-schedule-action]");if(de){const W=de.dataset.scheduleAction;if(W==="back"){r();return}if(W==="select-date"){j(),r();return}}const oe=N.target.closest("[data-schedule-view]");if(oe){c.viewMode=oe.dataset.scheduleView==="month"?"month":"week",c.viewMode==="month"&&(c.currentDate=Z(c.selectedDate)),p(k,c);return}const ve=N.target.closest("[data-schedule-nav]");if(ve){const W=ve.dataset.scheduleNav==="prev"?-1:1;c.viewMode==="month"?c.currentDate=ze(c.currentDate,W):(c.selectedDate=ne(c.selectedDate,W*7),c.currentDate=Z(c.selectedDate)),p(k,c);return}const te=N.target.closest("[data-schedule-date]");if(te){const W=xe(te.dataset.scheduleDate);if(!W)return;c.selectedDate=W,c.currentDate=Z(W),p(k,c);return}const se=N.target.closest("[data-schedule-reagendar]");se&&P({anchorEl:se,initialValues:{date:ue(c.selectedDate),location:V?.value||"",responsible:""}})};M.addEventListener("click",G),k.addEventListener("click",K),R&&R.addEventListener("click",U),document.addEventListener("keydown",H,!0),_=()=>{M.removeEventListener("click",G),k.removeEventListener("click",K),R&&R.removeEventListener("click",U),document.removeEventListener("keydown",H,!0),_=()=>{}},ce(L),p(k,c),V&&typeof V.focus=="function"&&setTimeout(()=>V.focus(),140)},F=({restoreFocus:g=!0}={})=>{const u=document.querySelector(`[data-modal="${$}"]`),C=document.querySelector(`[data-modal-backdrop="${$}"]`);!u||!C||(D(),re($),d.classList.contains("is-open")&&(document.body.style.overflow="hidden"),u.remove(),C.remove(),g&&q?.focus&&q.focus(),q=null)},O=g=>{document.querySelector(`[data-modal="${$}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${$}"]`)?.remove(),q=g||null,document.body.insertAdjacentHTML("beforeend",ha({modalId:$}));const u=document.querySelector(`[data-modal="${$}"]`),C=document.querySelector(`[data-modal-backdrop="${$}"]`);if(!u||!C)return;const k=u.querySelector("[data-new-production-tags-search]"),M=u.querySelector("[data-modal-close]"),V=()=>F(),R=H=>{H.target===C&&F()},U=H=>{H.key==="Escape"&&(H.preventDefault(),H.stopPropagation(),F())},G=H=>{const K=H.target.closest("[data-new-production-tags-action]");if(!K)return;const N=K.dataset.newProductionTagsAction;if(N==="cancel"||N==="save"){F();return}N==="remove"&&K.closest(".new-production-tags-modal__chip")?.remove()};C.addEventListener("click",R),u.addEventListener("click",G),M?.addEventListener("click",V),document.addEventListener("keydown",U,!0),D=()=>{C.removeEventListener("click",R),u.removeEventListener("click",G),M?.removeEventListener("click",V),document.removeEventListener("keydown",U,!0),D=()=>{}},ce($),k?.focus&&setTimeout(()=>k.focus(),120)},J=g=>{const u=g.target.closest("[data-new-production-action]");if(!u)return;const C=u.dataset.newProductionAction;if(C==="cancel"){F({restoreFocus:!1}),s.close();return}if(C==="consult-agenda"){B(u);return}if(C==="open-tags"){O(u);return}const k=d.querySelector("[data-new-production-form]");if(k){if(C==="clear"){ya(k);return}if(C==="save"){console.log("Salvar nova produção",Ee(k));return}if(C==="create-op"){if(!ka(k))return;console.log("Criar OP",Ee(k))}}};return e.addEventListener("click",y),d.addEventListener("click",J),()=>{r({restoreFocus:!1}),F({restoreFocus:!1}),e.removeEventListener("click",y),d.removeEventListener("click",J),typeof b=="function"&&b(),s.cleanup&&s.cleanup();const g=document.querySelector(`[data-drawer="${a}"]`),u=document.querySelector(`[data-drawer-backdrop="${a}"]`);g&&g.remove(),u&&u.remove()}}function pe(){const e=new Date(2026,0,14);return{selectedDate:e,currentDate:e,viewMode:"week"}}function Z(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function ue(e){const a=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${a}-${t}-${o}`}function xe(e){if(!e||typeof e!="string")return null;const[a,t,o]=e.split("-").map(Number);return[a,t,o].some(Number.isNaN)?null:new Date(a,t-1,o)}function ca(e,a){return!e||!a?!1:e.getFullYear()===a.getFullYear()&&e.getMonth()===a.getMonth()&&e.getDate()===a.getDate()}function Ae(e){const a=Z(e);return a.setDate(a.getDate()-a.getDay()),a}function ne(e,a){const t=Z(e);return t.setDate(t.getDate()+a),t}function ze(e,a){const t=Z(e);return t.setMonth(t.getMonth()+a),t}function Pe(e){return`${["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][e.getMonth()]} ${e.getFullYear()}`}function Fe(e){const a=Ae(e),t=ne(a,6),o=Pe(t).replace(` ${t.getFullYear()}`,"");return`${String(a.getDate()).padStart(2,"0")} - ${String(t.getDate()).padStart(2,"0")} de ${o} ${t.getFullYear()}`}function ua(e){return e.getFullYear()!==2026||e.getMonth()!==0?"":new Set([12,13,14,15,16]).has(e.getDate())?"15.000":""}function Be({date:e,selectedDate:a,currentMonth:t=null}){const o=ue(e),n=ca(e,a),s=t!==null&&e.getMonth()!==t,d=ua(e);return`
    <button type="button" class="schedule-modal__day${n?" is-selected":""}${s?" is-outside-month":""}" data-schedule-date="${o}">
      <span class="schedule-modal__day-number">${e.getDate()}</span>
      <span class="schedule-modal__day-qty">${d}</span>
    </button>
  `}function pa(e){const a=Ae(e.selectedDate);return`
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--week">${Array.from({length:7},(o,n)=>Be({date:ne(a,n),selectedDate:e.selectedDate})).join("")}</div>
  `}function va(e){const a=new Date(e.currentDate.getFullYear(),e.currentDate.getMonth(),1),t=ne(a,-a.getDay());return`
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--month">${Array.from({length:42},(n,s)=>Be({date:ne(t,s),selectedDate:e.selectedDate,currentMonth:a.getMonth()})).join("")}</div>
  `}function Ne(e){const a=e.viewMode==="month"?"schedule-modal__calendar-grid--month":"schedule-modal__calendar-grid--week",t=e.viewMode==="month"?va(e):pa(e);return`<div class="schedule-modal__calendar-grid ${a}">${t}</div>`}function Ie(e={}){const{modalId:a="kanban-schedule-modal",state:t=pe()}=e;return fe({id:a,title:"Agendamento",size:"xl",className:"schedule-modal",body:ga(t),footer:ma()})}function ga(e){return`
    <div class="schedule-modal__content">
      ${ee({id:"schedule-location-select",label:"Selecionar localização",required:!0,placeholder:"Selecionar...",items:[{label:"Estufa 1",value:"estufa-1"},{label:"Estufa 2",value:"estufa-2"}]})}

      <div class="schedule-modal__period-row">
        <span class="schedule-modal__period-text" data-schedule-period>${Fe(e.selectedDate)}</span>
        <div class="schedule-modal__period-nav">
          <button type="button" class="schedule-modal__icon-btn" data-schedule-nav="prev" aria-label="Periodo anterior">${f("chevron-left",{size:14})}</button>
          <button type="button" class="schedule-modal__icon-btn" data-schedule-nav="next" aria-label="Proximo periodo">${f("chevron-right",{size:14})}</button>
        </div>
      </div>

      <div class="schedule-modal__view-toggle">
        <button type="button" class="schedule-modal__view-btn ${e.viewMode==="month"?"is-active":""}" data-schedule-view="month">Mês</button>
        <button type="button" class="schedule-modal__view-btn ${e.viewMode==="week"?"is-active":""}" data-schedule-view="week">Semana</button>
      </div>

      <div class="schedule-modal__calendar schedule-modal__calendar--week" data-schedule-calendar>
        ${Ne(e)}
      </div>

      <div class="schedule-modal__table-header">
        <h3 class="schedule-modal__table-title" data-schedule-day-title>Agendamentos para o dia ${e.selectedDate.getDate()}</h3>
        <span class="schedule-modal__table-total">Quantidade de mudas agendadas: <strong>15.000</strong></span>
      </div>

      <div class="schedule-modal__table-wrap">
        <table class="schedule-modal__table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Ordem de Produção</th>
              <th>Cultura</th>
              <th>Quantidade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nome do cliente</td>
              <td>Ordem de produção</td>
              <td>Cultura</td>
              <td>Quantidade</td>
              <td><button type="button" class="schedule-modal__reagendar" data-schedule-reagendar data-client="Nome do cliente" data-order="Ordem de produção" data-culture="Cultura" data-quantity="Quantidade">Reagendar</button></td>
            </tr>
            <tr>
              <td>Nome do cliente</td>
              <td>Ordem de produção</td>
              <td>Cultura</td>
              <td>Quantidade</td>
              <td><button type="button" class="schedule-modal__reagendar" data-schedule-reagendar data-client="Nome do cliente" data-order="Ordem de produção" data-culture="Cultura" data-quantity="Quantidade">Reagendar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `}function ma(){return`
    <div class="schedule-modal__footer">
      ${A({text:"Voltar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-schedule-action="back"')}
      ${A({text:"Selecionar data",variant:"primary",size:"sm"}).replace("<button",'<button data-schedule-action="select-date"')}
    </div>
  `}function ba(e={}){const{modalId:a="kanban-reschedule-modal",values:t={}}=e,o=m({id:"reschedule-date",type:"date",label:"Data",required:!0,value:t.date||"",className:"reschedule-modal__date-field"}),n=m({id:"reschedule-location",label:"Localização",required:!0,placeholder:"Nome da localização",value:t.location||""}),s=m({id:"reschedule-responsible",label:"Responsável",required:!0,placeholder:"Nome do responsável",value:t.responsible||""}),d=A({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-reschedule-action="cancel"'),b=A({text:"Confirmar",variant:"primary",size:"sm"}).replace("<button",'<button data-reschedule-action="confirm"');return fe({id:a,title:"Agendamento",size:"sm",className:"reschedule-modal",body:`
      <div class="reschedule-modal__content">
        ${o}
        ${n}
        ${s}
        <span class="reschedule-modal__error" data-reschedule-error hidden>Preencha todos os campos obrigatórios.</span>
      </div>
    `,footer:`
      <div class="reschedule-modal__footer">
        ${d}
        ${b}
      </div>
    `})}function fa(){return`
    <section class="new-production-drawer">
      <div class="new-production-drawer__status-wrap">
        <span class="new-production-drawer__status">Aguardando Aprovação</span>
      </div>

      <div class="new-production-drawer__scroll">
        <form class="new-production-form" data-new-production-form novalidate>
          <section class="new-production-section">
            <h3 class="new-production-section__title">${f("file",{size:14})}Informações da Produção</h3>
            <div class="new-production-card">
              ${ee({id:"new-production-origin",label:"Origem",required:!0,value:"producao-propria",items:[{label:"Produção própria",value:"producao-propria"}]})}

              <div class="new-production-grid new-production-grid--two">
                ${m({id:"new-production-erp",label:"Código ERP",required:!0,placeholder:"Código ERP"})}
                ${m({id:"new-production-cpf-cnpj",label:"CPF/CNPJ",required:!0,placeholder:"Produção própria"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${m({id:"new-production-business-name",label:"Razão Social/Nome",required:!0,placeholder:"Classe"})}
                ${m({id:"new-production-fantasy-name",label:"Nome Fantasia/Apelido",required:!0,placeholder:"EX: MUD-1"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${m({id:"new-production-responsible",label:"Responsável",required:!0,placeholder:"Digite nome da classe"})}
                ${m({id:"new-production-class",label:"Classe",required:!0,placeholder:"EX: MUD-1"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${m({id:"new-production-product-code",label:"Cód. do Produto",required:!0,placeholder:"EX: MUD-1"})}
                ${m({id:"new-production-product",label:"Produto",required:!0,placeholder:"Nome do produto"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${m({id:"new-production-quantity",label:"Quantidade",required:!0,placeholder:"Nome do responsável"})}
                ${m({id:"new-production-location",label:"Localização",required:!0,placeholder:"Digite a localização"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${m({id:"new-production-scheduling-date",type:"date",label:"Data de Agendamento Semeio",required:!0,className:"new-production-date-field",iconRight:f("calendar",{size:16})})}
                <div class="new-production-agenda-btn-wrap">
                  ${A({text:"+ Consultar agenda",variant:"outline-dark"}).replace("<button",'<button data-new-production-action="consult-agenda"')}
                </div>
              </div>

              <div class="new-production-type">
                <div class="new-production-chip-row">
                  ${ae({label:"Enxertia",value:"enxertia",selected:!0,size:"sm"})}
                </div>
              </div>

              ${m({id:"new-production-notes",type:"textarea",label:"Observações",required:!0,rows:2})}

              <div class="new-production-tags">
                <span class="new-production-field-label">Etiqueta</span>
                <div class="new-production-chip-row new-production-chip-row--tags">
                  ${ae({label:"Normal",value:"normal",size:"sm",className:"new-production-chip--normal"})}
                  ${ae({label:"Prioritário",value:"prioritario",size:"sm",className:"new-production-chip--prioritario"})}
                  ${ae({label:"Urgente",value:"urgente",size:"sm",className:"new-production-chip--urgente"})}
                  ${ae({label:"+ Adicionar etiqueta",value:"add-tag",size:"sm"}).replace("<button",'<button data-new-production-action="open-tags"')}
                </div>
              </div>

              <div class="new-production-actions">
                <button type="button" class="new-production-clear-link" data-new-production-action="clear">Limpar campos</button>
                ${A({text:"Salvar",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-action="save"')}
              </div>
            </div>
          </section>

          <section class="new-production-section">
            <h3 class="new-production-section__title">${f("settings",{size:14})}Informações para Semeio</h3>

            <div class="new-production-subsection">
              <h4 class="new-production-subsection__title">Enxerto</h4>
              ${Ce()}
            </div>

            <div class="new-production-subsection">
              <h4 class="new-production-subsection__title">Porta-enxerto</h4>
              ${Ce()}
            </div>
          </section>
        </form>
      </div>
    </section>
  `}function ha(e={}){const{modalId:a="kanban-tags-modal"}=e,t=A({text:"Cancelar",style:"text",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-tags-action="cancel"'),o=A({text:"Salvar",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-tags-action="save"');return fe({id:a,title:"Etiquetas",size:"sm",className:"new-production-tags-modal",body:`
      <div class="new-production-tags-modal__content">
        <div class="new-production-tags-modal__search">
          <input type="text" class="new-production-tags-modal__input" placeholder="Buscar etiquetas" data-new-production-tags-search />
          <span class="new-production-tags-modal__search-icon" aria-hidden="true">${f("search",{size:14})}</span>
        </div>
        <div class="new-production-tags-modal__create">
          <input type="text" class="new-production-tags-modal__input" placeholder="Nova etiqueta" />
          <button type="button" class="new-production-tags-modal__add-btn">Adicionar ${f("arrow-right",{size:14})}</button>
        </div>
        <div class="new-production-tags-modal__group">
          <div class="new-production-tags-modal__group-title">
            <span class="new-production-tags-modal__group-icon" aria-hidden="true">${f("filter",{size:14})}</span>
            <span>Etiquetas</span>
          </div>
          <div class="new-production-tags-modal__chips">
            <div class="new-production-tags-modal__chip">
              <span class="new-production-tags-modal__dot new-production-tags-modal__dot--blue" aria-hidden="true"></span>
              <span>Em trajeto</span>
              <button type="button" class="new-production-tags-modal__chip-remove" data-new-production-tags-action="remove" aria-label="Remover etiqueta">${f("close",{size:12})}</button>
            </div>
            <div class="new-production-tags-modal__chip">
              <span class="new-production-tags-modal__dot new-production-tags-modal__dot--green" aria-hidden="true"></span>
              <span>Faturado</span>
              <button type="button" class="new-production-tags-modal__chip-remove" data-new-production-tags-action="remove" aria-label="Remover etiqueta">${f("close",{size:12})}</button>
            </div>
          </div>
        </div>
      </div>
    `,footer:`
      <div class="new-production-tags-modal__footer">
        ${t}
        ${o}
      </div>
    `})}function Ce(){return`
    <div class="new-production-table-wrap">
      <table class="new-production-table" aria-label="Informações para semeio">
        <thead>
          <tr>
            <th>Código do Produto</th>
            <th>Produto</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  `}function _a(){return`
    <div class="new-production-footer">
      ${A({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-new-production-action="cancel"')}
      ${A({text:"Criar OP",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-action="create-op"')}
    </div>
  `}function ya(e){if(!e)return;e.querySelectorAll("input, select, textarea").forEach(t=>{if(t.tagName.toLowerCase()==="select"){t.selectedIndex=0;return}if(t.type==="date"){t.value="";return}t.value=""})}function Ee(e){const a={};return e&&new FormData(e).forEach((o,n)=>{a[n]=o}),a}function ka(e){if(!e)return!1;const a=e.querySelectorAll("[required]");let t=null;return a.forEach(o=>{(o.value||"").trim()||t||(t=o)}),t?(typeof t.focus=="function"&&t.focus(),!1):!0}function $a(){const e=document.getElementById("kanban-board");if(!e)return()=>{};const a="kanban-scheduling-drawer",t=document.querySelector(`[data-drawer="${a}"]`),o=document.querySelector(`[data-drawer-backdrop="${a}"]`);t&&t.remove(),o&&o.remove();const n=me({id:a,title:"OP-2025-006",width:460,content:wa(),footer:Ea()});document.body.insertAdjacentHTML("beforeend",n);const s=be({id:a,root:document}),d=document.querySelector(`[data-drawer="${a}"]`);if(!d||!s)return()=>{};const b=ge(d),h=d.querySelector("#scheduling-tabs")?.closest("[data-tabs]"),v=h?.querySelector('.tabs-tab[data-tab="0"]');v&&v.setAttribute("data-drawer-autofocus","");const x=w=>{const $=w.target.closest(".kanban-card");if(!$||!e.contains($))return;const _=$.closest("[data-column-id]");if(!_||_.dataset.columnId!=="aguardando-aprovacao")return;w.target.closest(".kanban-card__code")&&w.preventDefault(),s.open($)},T=w=>{if(!h)return;const $=w.target.closest(".tabs-tab");if(!$||!h.contains($))return;const _=Number($.dataset.tab);if(Number.isNaN(_))return;const z=h.querySelectorAll(".tabs-tab"),c=h.parentElement?.querySelectorAll(".tabs-panel");z.forEach((i,l)=>{i.classList.toggle("is-active",l===_),i.setAttribute("aria-selected",String(l===_))}),c&&c.forEach((i,l)=>{i.classList.toggle("is-active",l===_)})},L=w=>{const $=w.target.closest("[data-scheduling-action]");if(!$)return;const _=$.dataset.schedulingAction;if(_==="cancel"){s.close();return}if(_==="consult-agenda"){console.log("Consultar agenda");return}if(_!=="schedule")return;const z=d.querySelector("#scheduling-date-input"),c=d.querySelector("#scheduling-responsible-input");console.log({dataAgendamentoSemeio:z?.value||"",responsavelColetaSemente:c?.value||""})};return e.addEventListener("click",x),h&&h.addEventListener("click",T),d.addEventListener("click",L),()=>{e.removeEventListener("click",x),h&&h.removeEventListener("click",T),d.removeEventListener("click",L),typeof b=="function"&&b(),s.cleanup&&s.cleanup();const w=document.querySelector(`[data-drawer="${a}"]`),$=document.querySelector(`[data-drawer-backdrop="${a}"]`);w&&w.remove(),$&&$.remove()}}function wa(){return`
    <section class="scheduling-drawer">
      <div class="scheduling-drawer__summary">
        <p class="scheduling-drawer__subtitle">Fazenda Sol Nascente <span aria-hidden="true">•</span> Muda de Eucalipto Clone AEC 144</p>
        <span class="scheduling-drawer__status">Aguardando Agendamento</span>
      </div>
      ${$e({id:"scheduling-tabs",variant:"underlined",fullWidth:!0,activeTab:0,tabs:[{label:"Detalhes e Planejamento",content:Sa()},{label:"Histórico",content:Ca()}]})}
    </section>
  `}function Sa(){const e=f("calendar",{size:16});return`
    <div class="scheduling-panel">
      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${f("file",{size:14})}Informações Gerais</h3>
        <div class="scheduling-info-card">
          <div class="scheduling-grid scheduling-grid--two">
            ${Y("Código ERP","43242343")}
            ${Y("CPF/CNPJ","123.456.789-00")}
            ${Y("Razão Social/Nome","Nome da razao social")}
            ${Y("Nome Fantasia/Apelido","Nome fantasia")}
            ${Y("Classe","Muda de Eucalipto Clone AEC 144")}
            ${Y("Código do Produto","43423432")}
            ${Y("Produto","Muda de Eucalipto Clone AEC 144")}
            ${Y("Quantidade","5.000")}
          </div>
        </div>
      </section>

      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${f("settings",{size:14})}Informações para Semeio</h3>
        <p class="scheduling-section__subtitle">Pé Franco</p>
        <div class="scheduling-table-wrap">
          <table class="scheduling-table" aria-label="Informações para semeio">
            <thead>
              <tr>
                <th>Código do Produto</th>
                <th>Produto</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4324342</td>
                <td>Muda de Eucalipto Clone</td>
                <td>323124324</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="scheduling-section__actions">
          ${A({text:"Gerar QR Code",variant:"outline-dark"})}
        </div>
      </section>

      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${f("calendar",{size:14})}Planejamento e Datas</h3>
        <div class="scheduling-info-card">
          <div class="scheduling-grid scheduling-grid--two">
            ${Y("Data do Pedido","15/01/2025")}
            ${Y("Data Planejada do Pedido","15/01/2025")}
          </div>
          <div class="scheduling-grid scheduling-grid--two scheduling-grid--inputs">
            ${m({id:"scheduling-date-input",type:"date",label:"Data de agendamento de Semeio",value:"2026-04-15",iconRight:e,className:"scheduling-date-field"})}
            ${m({id:"scheduling-responsible-input",label:"Responsável coleta da semente",value:"João da Silva"})}
          </div>
          <button type="button" class="scheduling-link" data-scheduling-action="consult-agenda">Consultar agenda</button>
        </div>
      </section>
    </div>
  `}function Ca(){return`
    <div class="scheduling-history">
      Sem histórico no momento
    </div>
  `}function Y(e,a){return`
    <div class="scheduling-field">
      <span class="scheduling-field__label">${e}</span>
      <span class="scheduling-field__value">${a}</span>
    </div>
  `}function Ea(){return`
    <div class="scheduling-footer">
      ${A({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-scheduling-action="cancel"')}
      ${A({text:"Agendar",variant:"primary",size:"sm"}).replace("<button",'<button data-scheduling-action="schedule"')}
    </div>
  `}function La(){const e=document.getElementById("kanban-board");if(!e)return()=>{};const a="kanban-agendado-drawer";document.querySelector(`[data-drawer="${a}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${a}"]`)?.remove();const t=me({id:a,title:"OP-2025-006",width:460,content:Da(),footer:ja()});document.body.insertAdjacentHTML("beforeend",t);const o=be({id:a,root:document}),n=document.querySelector(`[data-drawer="${a}"]`);if(!n||!o)return()=>{};const s=ge(n);Ve(n);const d="kanban-schedule-modal-agendado";let b=()=>{},h=null,v=pe();const x=n.querySelector("#agendado-tabs")?.closest("[data-tabs]"),T=x?.querySelector('.tabs-tab[data-tab="0"]');T&&T.setAttribute("data-drawer-autofocus","");const L=c=>{const i=c.target.closest(".kanban-card");if(!i||!e.contains(i))return;const l=i.closest("[data-column-id]");!l||l.dataset.columnId!=="agendado"||o.open(i)},w=c=>{if(!x)return;const i=c.target.closest(".tabs-tab");if(!i||!x.contains(i))return;const l=Number(i.dataset.tab);if(Number.isNaN(l))return;const D=x.querySelectorAll(".tabs-tab"),q=x.parentElement?.querySelectorAll(".tabs-panel");D.forEach((y,r)=>{y.classList.toggle("is-active",r===l),y.setAttribute("aria-selected",String(r===l))}),q?.forEach((y,r)=>{y.classList.toggle("is-active",r===l)})},$=c=>{const i=c.target.closest("[data-agendado-details-tab]");if(i){const r=n.querySelector("[data-agendado-details]"),S=i.dataset.agendadoDetailsTab;if(!r||!S)return;r.querySelectorAll("[data-agendado-details-tab]").forEach(P=>{const p=P===i;P.classList.toggle("is-active",p),P.setAttribute("aria-selected",String(p))}),r.querySelectorAll("[data-agendado-details-panel]").forEach(P=>{P.classList.toggle("is-active",P.dataset.agendadoDetailsPanel===S)});return}const l=c.target.closest("[data-agendado-details-toggle]");if(l){const r=l.closest("[data-agendado-details-accordion]");if(!r)return;const S=r.classList.toggle("is-collapsed");l.setAttribute("aria-expanded",String(!S));return}const D=c.target.closest("[data-agendado-cycle-tab]");if(D){const r=n.querySelector("[data-agendado-cycle]"),S=D.dataset.agendadoCycleTab;if(!r||!S)return;r.querySelectorAll("[data-agendado-cycle-tab]").forEach(P=>{const p=P===D;P.classList.toggle("is-active",p),P.setAttribute("aria-selected",String(p))}),r.querySelectorAll("[data-agendado-cycle-panel]").forEach(P=>{P.classList.toggle("is-active",P.dataset.agendadoCyclePanel===S)});return}const q=c.target.closest("[data-agendado-action]");if(!q)return;const y=q.dataset.agendadoAction;if(y==="cancel"){o.close();return}if(y==="reagendar"||y==="consult-agenda"){z(q);return}if(y==="add-lote"){console.log(`Ação: ${y}`);return}if(y==="details-qr"||y==="details-view-order"||y==="details-view-image"){console.log(`Ação: ${y}`);return}if(y==="save-lote"){console.log("Salvar lote");return}if(y==="start-semeio"){const r=n.querySelector("[data-agendado-form]"),S=r?Object.fromEntries(new FormData(r).entries()):{};console.log("Iniciar semeio",S)}};e.addEventListener("click",L),x&&x.addEventListener("click",w),n.addEventListener("click",$);const _=({restoreFocus:c=!0}={})=>{const i=document.querySelector(`[data-modal="${d}"]`),l=document.querySelector(`[data-modal-backdrop="${d}"]`);!i||!l||(b(),re(d),n.classList.contains("is-open")&&(document.body.style.overflow="hidden"),i.remove(),l.remove(),c&&h?.focus&&h.focus(),h=null)},z=c=>{document.querySelector(`[data-modal="${d}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${d}"]`)?.remove(),v=pe(),h=c||null,document.body.insertAdjacentHTML("beforeend",Ie({modalId:d,state:v}));const i=document.querySelector(`[data-modal="${d}"]`),l=document.querySelector(`[data-modal-backdrop="${d}"]`);if(!i||!l)return;const D=i.querySelector("#schedule-location-select"),q=i.querySelector("[data-modal-close]"),y=()=>_(),r=p=>{p.target===l&&_()},S=p=>{p.key==="Escape"&&(p.preventDefault(),p.stopPropagation(),_())},P=p=>{const j=p.target.closest("[data-schedule-action]");if(j){const g=j.dataset.scheduleAction;if(g==="back"){_();return}if(g==="select-date"){const u=n.querySelector("#agendado-data-encerramento");u&&(u.value=ue(v.selectedDate),u.dispatchEvent(new Event("input",{bubbles:!0}))),_();return}}const B=p.target.closest("[data-schedule-view]");if(B){v.viewMode=B.dataset.scheduleView==="month"?"month":"week",v.viewMode==="month"&&(v.currentDate=Z(v.selectedDate)),updateScheduleModalUi(i,v);return}const F=p.target.closest("[data-schedule-nav]");if(F){const g=F.dataset.scheduleNav==="prev"?-1:1;v.viewMode==="month"?v.currentDate=ze(v.currentDate,g):(v.selectedDate=ne(v.selectedDate,g*7),v.currentDate=Z(v.selectedDate)),updateScheduleModalUi(i,v);return}const O=p.target.closest("[data-schedule-date]");if(O){const g=xe(O.dataset.scheduleDate);if(!g)return;v.selectedDate=g,v.currentDate=Z(g),updateScheduleModalUi(i,v);return}p.target.closest("[data-schedule-reagendar]")&&console.log("Reagendar item de agenda")};l.addEventListener("click",r),i.addEventListener("click",P),q?.addEventListener("click",y),document.addEventListener("keydown",S,!0),b=()=>{l.removeEventListener("click",r),i.removeEventListener("click",P),q?.removeEventListener("click",y),document.removeEventListener("keydown",S,!0),b=()=>{}},ce(d),updateScheduleModalUi(i,v),D?.focus&&setTimeout(()=>D.focus(),120)};return()=>{_({restoreFocus:!1}),e.removeEventListener("click",L),x&&x.removeEventListener("click",w),n.removeEventListener("click",$),typeof s=="function"&&s(),o.cleanup&&o.cleanup(),document.querySelector(`[data-drawer="${a}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${a}"]`)?.remove()}}function Da(){const e=$e({id:"agendado-tabs",variant:"underlined",fullWidth:!0,activeTab:0,tabs:[{label:"Iniciar Semeio",content:qa()},{label:"Detalhes",content:Ma()},{label:"Ciclo",content:Fa()}]});return`
    <section class="agendado-drawer">
      <div class="agendado-drawer__summary">
        <div class="agendado-drawer__summary-top">
          <div class="agendado-drawer__summary-left">
            <span class="agendado-meta">Cód. Pedido: <strong>001</strong></span>
            <span class="agendado-meta">Cód. Cliente: <strong>22332</strong></span>
            <span class="agendado-meta"><strong>Fazenda Sol Nascente</strong></span>
          </div>
          <div class="agendado-drawer__summary-right">
            ${ae({label:"Normal",value:"normal",size:"sm",className:"agendado-chip--normal"})}
            ${ae({label:"Agendado",value:"agendado",size:"sm"})}
          </div>
        </div>
        <div class="agendado-drawer__summary-bottom">
          <div class="agendado-drawer__summary-left">
            <span class="agendado-meta">Cód. Produto: <strong>001</strong></span>
            <span class="agendado-meta"><strong>Muda de Eucalipto Clone AEC 144</strong></span>
            <span class="agendado-meta">Qtd.: <strong>3.000</strong></span>
          </div>
          <div class="agendado-drawer__summary-right">
            ${ae({label:"Enxertia",value:"enxertia",size:"sm"})}
          </div>
        </div>
      </div>
      ${e}
    </section>
  `}function qa(){const e=Oe({title:"",compact:!0,multiple:!1,maxSizeLabel:"3MB",acceptedFormats:["image/png","image/svg+xml","application/msword","application/pdf"],className:"agendado-upload"});return`
    <form class="agendado-panel" data-agendado-form>
      <section class="agendado-section">
        <div class="agendado-semeio">
          <div class="agendado-semeio__field">
            <span class="agendado-semeio__label">
              <span class="agendado-semeio__icon">${f("calendar",{size:12})}</span>
              Data de agendamento de Semeio
            </span>
            <strong>15/01/2025</strong>
          </div>
          <div class="agendado-semeio__field">
            <span>Responsável agendamento</span>
            <strong>João da Silva</strong>
          </div>
        </div>
        <div class="agendado-semeio__actions">
          ${Le()}
          ${Te()}
        </div>
      </section>

      <section class="agendado-section">
        <h3 class="agendado-title">Informações do Produto</h3>
        <div class="agendado-info-box">
          <div class="agendado-info-box__head">
            <span class="agendado-subtitle">Quantidade de Mudas</span>
            <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong></span>
          </div>
          <div class="agendado-kpis">
            ${X("Qtd. a Produzir","5.556")}
            ${X("Perda Estimada","556","+10%")}
            ${X("Qtd. solicitada","5.000")}
          </div>
        </div>
      </section>

      <section class="agendado-section">
        <h3 class="agendado-title">Informações para Semeio</h3>
        <div class="agendado-info-box">
          <div class="agendado-semeio-group">
            <div class="agendado-info-box__head">
              <span class="agendado-subtitle">Enxerto</span>
              <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong></span>
            </div>
            <div class="agendado-kpis">
              ${X("Qtd. a Semear","5.556")}
              ${X("Perda Estimada","556","+10%")}
              ${X("Qtd. Esperada","5.000")}
            </div>
          </div>
          <div class="agendado-semeio-group">
            <div class="agendado-info-box__head">
              <span class="agendado-subtitle">Porta-enxerto</span>
              <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong></span>
            </div>
            <div class="agendado-kpis">
              ${X("Qtd. a Semear","5.556")}
              ${X("Perda Estimada","556","+10%")}
              ${X("Qtd. Esperada","5.000")}
            </div>
          </div>
        </div>
      </section>

      <section class="agendado-section">
        <div class="agendado-section__header">
          <h3 class="agendado-title">Lotes de Sementes Utilizados</h3>
          ${A({text:"+ Adicionar Lote",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="add-lote"')}
        </div>
        <div class="agendado-card">
          <div class="agendado-grid agendado-grid--two">
            <div class="agendado-grid-col--full">
              ${ee({id:"agendado-tipo",label:"Tipo",name:"tipo",placeholder:"Selecione",items:[{label:"Enxerto",value:"enxerto"}]})}
            </div>
            ${m({id:"agendado-classe",label:"Classe",name:"classe",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${m({id:"agendado-cod-produto",label:"Código do Produto",name:"codigoProduto",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${m({id:"agendado-produto",label:"Produto",name:"produto",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${m({id:"agendado-unidade",label:"Unidade",name:"unidade",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${m({id:"agendado-cod-lote",label:"Código do Lote",name:"codigoLote",value:"5kg"})}
            ${m({id:"agendado-fornecedor",label:"Fornecedor",name:"fornecedor",value:"95%"})}
            ${m({id:"agendado-embalagem",label:"Embalagem",name:"embalagem",value:"Clone AEC 144"})}
            ${m({id:"agendado-quantidade",label:"Quantidade",name:"quantidade",value:"10"})}
          </div>
          <div class="agendado-upload-wrap">
            <span class="agendado-field-label">Anexa imagem do lote</span>
            ${e}
            ${Ta()}
          </div>
          ${m({id:"agendado-responsavel-coleta",label:"Responsável coleta da semente",name:"responsavelColeta",value:"João da Silva"})}
          <div class="agendado-grid agendado-grid--two">
            ${m({id:"agendado-responsavel-entrega",label:"Responsável entrega da semente",name:"responsavelEntrega",placeholder:"Nome do responsável"})}
            ${m({id:"agendado-data-hora-entrega",label:"Data/Hora de entrega da semente",name:"dataHoraEntrega",placeholder:"Nome do responsável"})}
          </div>
          <div class="agendado-card__actions">
            ${Ia()}
            ${A({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="cancel-lote"')}
            ${A({text:"Salvar",variant:"primary",size:"sm"}).replace("<button",'<button data-agendado-action="save-lote"')}
          </div>
        </div>
      </section>

      <section class="agendado-section">
        ${De("Enxerto","10.000",{collapsed:!0,showTable:!1})}
        ${De("Porta-enxerto","15.000",{collapsed:!1,showTable:!0})}
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link">Consultar localização</button>
            </div>
            ${He({id:"agendado-localizacao",required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${m({id:"agendado-data-encerramento",type:"date",label:"Data encerramento da etapa",required:!0,name:"dataEncerramento",className:"agendado-date-field",iconRight:f("calendar",{size:16})})}
          ${m({id:"agendado-responsavel",label:"Responsável",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
          <div class="agendado-consultar-wrap">
            ${A({text:"+ Consultar agenda",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="consult-agenda"')}
          </div>
        </div>
        <div class="agendado-bottom-actions">
          ${Le()}
        </div>
      </section>
    </form>
  `}function Ma(){return`
    <section class="agendado-details" data-agendado-details>
      <div class="agendado-details-subtabs" role="tablist" aria-label="Detalhes da produção">
        <button type="button" class="agendado-details-subtabs__tab is-active" role="tab" aria-selected="true" data-agendado-details-tab="info-gerais">Informações Gerais</button>
        <button type="button" class="agendado-details-subtabs__tab" role="tab" aria-selected="false" data-agendado-details-tab="producao">Produção</button>
        <button type="button" class="agendado-details-subtabs__tab" role="tab" aria-selected="false" data-agendado-details-tab="expedicao">Expedição</button>
        <button type="button" class="agendado-details-subtabs__tab" role="tab" aria-selected="false" data-agendado-details-tab="operacoes">Operações</button>
        <button type="button" class="agendado-details-subtabs__tab" role="tab" aria-selected="false" data-agendado-details-tab="historico">Histórico</button>
      </div>

      <div class="agendado-details-panel is-active" data-agendado-details-panel="info-gerais">
        <section class="agendado-section">
          <h3 class="agendado-title">Planejamento e Datas</h3>
          <div class="agendado-details-card agendado-details-card--planning">
            <div class="agendado-details-grid agendado-details-grid--three">
              ${E("Data do Pedido","15/01/2025")}
              ${E("Data Agendada do Semeio","15/01/2025")}
              ${E("Responsável agendamento","João da Silva")}
            </div>
          </div>
          <div class="agendado-details-actions">
            ${Te().replace("<button",'<button data-agendado-action="details-qr"')}
          </div>
        </section>

        <section class="agendado-section">
          <h3 class="agendado-title">Informações Gerais</h3>
          <div class="agendado-details-card">
            <div class="agendado-details-grid agendado-details-grid--three">
              ${E("Cód. do Pedido","001")}
              ${E("Referência","43242343")}
              ${E("Cód. Tawros","001")}

              ${E("Cód. do Cliente","001")}
              ${E("CPF/CNPJ","123.456.789-00")}
              ${E("Razão Social/Nome","Nome da razao social")}

              ${E("Nome Fantasia/Apelido","Nome fantasia")}
              ${E("Cidade/UF","São Paulo-SP")}
              ${E("Nome do Vendedor","Nome vendedor")}
            </div>

            <div class="agendado-details-field agendado-details-field--full">
              <span class="agendado-details-field__label">Classe</span>
              <strong class="agendado-details-field__value">Muda de Eucalipto Clone AEC 144</strong>
            </div>

            <div class="agendado-details-grid agendado-details-grid--three">
              ${E("Cód. do Produto","432243432")}
              ${E("Produto","Muda de Eucalipto Clone")}
              ${E("Quantidade","5.000")}
            </div>
          </div>

          <div class="agendado-details-accordion" data-agendado-details-accordion>
            <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
              <span class="agendado-details-accordion__icon" aria-hidden="true">${f("chevron-right",{size:12})}</span>
              <span>Observações</span>
            </button>
            <div class="agendado-details-accordion__content">
              Hoje, durante a caminhada no parque, notei que as flores estavam mais vibrantes do que nunca. O aroma doce das rosas misturava-se com o frescor do ar, criando uma atmosfera encantadora. Além disso, vi um grupo de crianças brincando e rindo, o que trouxe um sorriso ao meu rosto. Foi um momento perfeito para refletir e apreciar a beleza da natureza.
            </div>
          </div>

          <div class="agendado-details-actions">
            ${A({text:"Ver pedido",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="details-view-order"')}
          </div>
        </section>
      </div>

      <div class="agendado-details-panel" data-agendado-details-panel="producao">${xa()}</div>
      <div class="agendado-details-panel" data-agendado-details-panel="expedicao"><div class="agendado-placeholder">Em construção</div></div>
      <div class="agendado-details-panel" data-agendado-details-panel="operacoes"><div class="agendado-placeholder">Em construção</div></div>
      <div class="agendado-details-panel" data-agendado-details-panel="historico"><div class="agendado-placeholder">Em construção</div></div>
    </section>
  `}function xa(){const e=[{stockDate:"12/01/2025",responsible:"Viktor Dantas"},{stockDate:"12/01/2025",responsible:"Viktor Dantas"}],a=[{tray:"Descrição Bandeja",quantity:"1000",responsible:"Viktor Dantas"},{tray:"Descrição Bandeja",quantity:"1000",responsible:"Viktor Dantas"}],t=["Germinação","Casa de Vegetação","Sala de Corte","Sala de Fusão","Adaptação"];return`
    <section class="agendado-details-production">
      <h3 class="agendado-title">Informações da Produção</h3>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${f("chevron-right",{size:12})}</span>
          <span>Semeio</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__grid agendado-details-production__grid--two">
            ${E("Data agendada de semeio","12/01/2025")}
            ${E("Responsável do agendamento","Viktor Dantas")}
            ${E("Data de semeio","12/01/2025")}
            ${E("Responsável do semeio","Viktor Dantas")}
          </div>
          <div class="agendado-details-production__line">
            ${E("Localização","Sala de Semeio")}
          </div>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${f("chevron-right",{size:12})}</span>
          <span>Produto Final</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__grid agendado-details-production__grid--two">
            ${E("Quantidade de Produto","5.000")}
            ${E("Estimativa (+5% Germinação)","5.250")}
          </div>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${f("chevron-right",{size:12})}</span>
          <span>Sementes</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__grid agendado-details-production__grid--two">
            ${E("Quantidade de Mudas Enxerto","5.000")}
            ${E("Estimativa (+5% Germinação)","5.250")}
            ${E("Quantidade de Mudas Porta-enxerto","5.000")}
            ${E("Estimativa (+5% Germinação)","5.250")}
          </div>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${f("chevron-right",{size:12})}</span>
          <span>Informações de Lote de Sementes</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__lots">
            ${e.map(o=>Aa(o)).join("")}
          </div>
          <button type="button" class="agendado-termo-btn">
            ${f("file",{size:14})}
            <span>Termo de Retirada</span>
          </button>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${f("chevron-right",{size:12})}</span>
          <span>Informações de Insumos</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__supplies">
            ${a.map(o=>za(o)).join("")}
          </div>
        </div>
      </div>

      ${t.map(o=>Pa(o)).join("")}
    </section>
  `}function Aa(e){return`
    <article class="agendado-details-production__lot">
      <span class="agendado-details-production__lot-title">Lote de Sementes Utilizado</span>
      <span class="agendado-details-production__lot-meta">Fornecedor - Código do lote - Descrição - Qtd</span>
      <div class="agendado-details-production__grid agendado-details-production__grid--lot">
        ${E("Data de retirada do estoque",e.stockDate)}
        ${E("Responsável retirada",e.responsible)}
        <div class="agendado-details-field">
          <span class="agendado-details-field__label">Foto</span>
          <span class="agendado-details-production__photo">
            <img src="/assets/arquivo.png" alt="" aria-hidden="true" />
            <button type="button" class="agendado-details-production__link" data-agendado-action="details-view-image">Visualizar imagem</button>
          </span>
        </div>
      </div>
    </article>
  `}function za(e){return`
    <article class="agendado-details-production__supply">
      <div class="agendado-details-production__grid agendado-details-production__grid--supplies">
        ${E("Bandeja",e.tray)}
        ${E("Quantidade",e.quantity)}
        ${E("Responsável da retirada",e.responsible)}
      </div>
    </article>
  `}function Pa(e){return`
    <div class="agendado-details-accordion is-collapsed" data-agendado-details-accordion>
      <button type="button" class="agendado-details-accordion__header" aria-expanded="false" data-agendado-details-toggle>
        <span class="agendado-details-accordion__icon" aria-hidden="true">${f("chevron-right",{size:12})}</span>
        <span>${e}</span>
      </button>
      <div class="agendado-details-production__stage-caption">Detalhes</div>
      <div class="agendado-details-accordion__content agendado-details-production__content">
        <div class="agendado-placeholder">Em construção</div>
      </div>
    </div>
  `}function Fa(){const e=[{title:"Dias após o Semeio",period:"23/01/2025",days:"10 dias"},{title:"Dias na Germinação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Casa de Vegetação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Sala de Corte",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Sala de Fusão",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Adaptação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Casa de Vegetação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias em Expedição",period:"23/01/2025 - 23/01/2025",days:"15 dias"}],a=[{title:"Criação da Ordem de Produção",responsible:"André Cesairni",date:"23/01/2025"},{title:"Criação da Ordem de Produção",responsible:"André Cesairni",date:"23/01/2025",daysAfterSowing:"0 Dias"},{title:"Criação da Ordem de Produção",responsible:"André Cesairni",date:"23/01/2025"},{title:"Criação da Ordem de Produção",responsible:"André Cesairni",date:"23/01/2025",daysAfterSowing:"0 Dias"},{title:"Criação da Ordem de Produção",responsible:"André Cesairni",date:"23/01/2025",daysAfterSowing:"0 Dias"}];return`
    <section class="agendado-cycle" data-agendado-cycle>
      <div class="agendado-cycle-subtabs" role="tablist" aria-label="Ciclo da produção">
        <button type="button" class="agendado-cycle-subtabs__tab is-active" role="tab" aria-selected="true" data-agendado-cycle-tab="dias">Dias</button>
        <button type="button" class="agendado-cycle-subtabs__tab" role="tab" aria-selected="false" data-agendado-cycle-tab="linha-do-tempo">Linha do Tempo</button>
      </div>

      <div class="agendado-cycle-panel is-active" data-agendado-cycle-panel="dias">
        <div class="agendado-cycle-content">
          <section class="agendado-section">
            <h3 class="agendado-title">Dias</h3>
            <article class="agendado-cycle-forecast" aria-label="Previsão de Término">
              <h4 class="agendado-cycle-forecast__title">
                <span class="agendado-cycle-forecast__icon" aria-hidden="true">${f("clock",{size:14})}</span>
                Previsão de Término
              </h4>

              <div class="agendado-cycle-donut" role="img" aria-label="365 dias de ciclo previstos">
                <div class="agendado-cycle-donut__inner">
                  <strong>365</strong>
                  <span>Dias</span>
                </div>
              </div>

              <div class="agendado-cycle-forecast__dates">
                <div class="agendado-cycle-forecast__date">
                  <span class="agendado-cycle-forecast__date-icon" aria-hidden="true">${f("calendar",{size:14})}</span>
                  <span>Data Abertura: <strong>12/12/2026</strong></span>
                </div>
                <div class="agendado-cycle-forecast__date">
                  <span class="agendado-cycle-forecast__date-icon" aria-hidden="true">${f("calendar",{size:14})}</span>
                  <span>Previsão Término: <strong>12/12/2026</strong></span>
                </div>
              </div>
            </article>
          </section>

          <section class="agendado-section">
            <h3 class="agendado-title">Etapas do Ciclo</h3>
            <div class="agendado-cycle-steps" aria-label="Etapas do ciclo">
              ${e.map(t=>Ba(t)).join("")}
            </div>
          </section>
        </div>
      </div>

      <div class="agendado-cycle-panel" data-agendado-cycle-panel="linha-do-tempo">
        <div class="agendado-cycle-content">
          <section class="agendado-section agendado-cycle-timeline">
            <h3 class="agendado-title">Linha do Tempo</h3>
            <div class="timeline-card" aria-label="Linha do tempo do ciclo">
              ${a.map(t=>Na(t)).join("")}
            </div>
          </section>
        </div>
      </div>
    </section>
  `}function Ba(e){return`
    <article class="agendado-cycle-step">
      <div class="agendado-cycle-step__main">
        <strong class="agendado-cycle-step__title">${e.title}</strong>
        <span class="agendado-cycle-step__period">${e.period}</span>
      </div>
      <strong class="agendado-cycle-step__days">${e.days}</strong>
    </article>
  `}function Na(e){return`
    <article class="timeline-item">
      <div class="timeline-marker" aria-hidden="true">
        <span class="timeline-dot"></span>
        <span class="timeline-line"></span>
      </div>
      <div class="timeline-content">
        <strong class="timeline-title">${e.title}</strong>
        <span class="timeline-subtitle">Responsável: <strong>${e.responsible}</strong></span>
      </div>
      <div class="timeline-meta">
        <span class="timeline-date">${e.date}</span>
        ${e.daysAfterSowing?`<span class="timeline-days-label">Dias após o Semeio: <strong>${e.daysAfterSowing}</strong></span>`:""}
      </div>
    </article>
  `}function E(e,a){return`
    <div class="agendado-details-field">
      <span class="agendado-details-field__label">${e}</span>
      <strong class="agendado-details-field__value">${a}</strong>
    </div>
  `}function Le(){return`
    <button type="button" class="agendado-reagendar-btn" data-agendado-action="reagendar">
      ${f("calendar",{size:18})}
      <span>Reagendar</span>
    </button>
  `}function Te(){return`
    <button type="button" class="agendado-qr-btn">
      <img src="/assets/qrcode.png" alt="" aria-hidden="true" />
      <span>Gerar QR Code</span>
    </button>
  `}function Ia(){return`
    <button type="button" class="agendado-termo-btn">
      ${f("file",{size:14})}
      <span>Termo de Retirada</span>
    </button>
  `}function Ta(){return`
    <div class="agendado-upload-preview" aria-label="Arquivo anexado">
      <img src="/assets/arquivo.png" alt="" aria-hidden="true" class="agendado-upload-preview__thumb" />
      <div class="agendado-upload-preview__content">
        <strong class="agendado-upload-preview__name">File name.ext</strong>
        <span class="agendado-upload-preview__status">Upload complete.</span>
      </div>
      <div class="agendado-upload-preview__actions agendado-icon-actions">
        <button type="button" aria-label="Visualizar">${f("eye",{size:16})}</button>
        <button type="button" aria-label="Excluir">${f("trash",{size:16})}</button>
      </div>
    </div>
  `}function X(e,a,t=""){return`
    <div class="agendado-kpi">
      <span class="agendado-kpi__label">${e}${t?` <em>${t}</em>`:""}</span>
      <strong class="agendado-kpi__value">${a}</strong>
    </div>
  `}function De(e,a,t={}){const{collapsed:o=!1,showTable:n=!0}=t,s=o?"is-collapsed":"is-expanded",d=`agendado-cultura-${e.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`;return`
    <div class="agendado-table-group">
      <span class="agendado-subtitle">${e}</span>
      <div class="agendado-table-block ${o?"agendado-table-block--collapsed":""}">
        <div class="agendado-table-block__subheader">
          <span class="agendado-table-block__caret ${s}" aria-hidden="true">${f("chevron-right",{size:12})}</span>
          <label class="sr-only" for="${d}">Selecionar cultura</label>
          <select id="${d}" class="agendado-table-block__culture-select">
            <option value="x-y">Cultura: X - Cultivar: Y</option>
            <option value="x-z">Cultura: X - Cultivar: Z</option>
            <option value="y-a">Cultura: Y - Cultivar: A</option>
          </select>
          <span class="agendado-table-block__total">Total: ${a}</span>
        </div>
        ${n?`
        <div class="agendado-table-wrap">
          <table class="agendado-table" aria-label="${e}">
            <thead>
              <tr>
                <th>Lote</th>
                <th>Fornecedor</th>
                <th>Germinação</th>
                <th>Quantidade</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${_e()}</td></tr>
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${_e()}</td></tr>
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${_e()}</td></tr>
            </tbody>
          </table>
        </div>`:""}
      </div>
    </div>
  `}function _e(){return`
    <div class="agendado-table-actions agendado-icon-actions">
      <button type="button" aria-label="Editar">${f("edit",{size:14})}</button>
      <button type="button" aria-label="Excluir">${f("trash",{size:14})}</button>
      <button type="button" aria-label="Visualizar">${f("eye",{size:14})}</button>
    </div>
  `}function ja(){return`
    <div class="agendado-footer">
      ${A({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="cancel"')}
      ${A({text:"Iniciar Semeio",variant:"primary",size:"sm"}).replace("<button",'<button data-agendado-action="start-semeio"')}
    </div>
  `}function Ra(){const e=document.getElementById("kanban-advanced-filters-btn");if(!e)return()=>{};const a=Qa(),t="kanban-advanced-filters-drawer",o=document.querySelector(`[data-drawer="${t}"]`),n=document.querySelector(`[data-drawer-backdrop="${t}"]`);o&&o.remove(),n&&n.remove();const s=me({id:t,title:"Filtros Avançados",width:430,content:Ha(a),footer:Ya()});document.body.insertAdjacentHTML("beforeend",s);const d=be({id:t,root:document}),b=document.querySelector(`[data-drawer="${t}"]`);if(!b||!d)return()=>{};const h="kanban-save-filters-modal";let v=null,x=()=>{};const T=b.querySelector("#advanced-filters-tabs"),L=T?T.closest("[data-tabs]"):null,w=i=>{if(!L)return;const l=i.target.closest(".tabs-tab");if(!l||!L.contains(l))return;const D=Number(l.dataset.tab);if(Number.isNaN(D))return;const q=L.querySelectorAll(".tabs-tab"),y=L.parentElement?.querySelectorAll(".tabs-panel");q.forEach((r,S)=>{r.classList.toggle("is-active",S===D),r.setAttribute("aria-selected",String(S===D))}),y&&y.forEach((r,S)=>{r.classList.toggle("is-active",S===D)})},$=i=>{const l=i.target.closest("[data-saved-action]");if(l){const p=l.dataset.savedAction,j=l.closest("[data-saved-filter-item]"),B=j?j.dataset.savedFilterItem:"";if(!B)return;if(p==="edit"){a.editingId=B,le(b,a);return}if(p==="delete"){a.items=a.items.filter(F=>F.id!==B),a.editingId===B&&(a.editingId=""),a.selectedId===B&&(a.selectedId=""),le(b,a);return}if(p==="view"){a.selectedId=B,console.log("Visualizar filtro salvo",B),le(b,a);return}if(p==="cancel-edit"){a.editingId="",le(b,a);return}if(p==="save-edit"){const F=j.querySelector("[data-saved-edit-name]"),O=F?F.closest(".field"):null,J=F?F.value.trim():"";if(!J){O&&O.classList.add("field--error"),F&&F.focus();return}O&&O.classList.remove("field--error"),a.items=a.items.map(g=>g.id===B?{...g,name:J}:g),a.editingId="",le(b,a);return}}const D=i.target.closest("[data-filters-action]");if(D){const p=D.dataset.filtersAction;p==="apply"&&console.log("Aplicar filtros"),p==="clear"&&console.log("Limpar filtros"),p==="save"&&c(D);return}const q=i.target.closest('[data-action="remove"]');if(q){const p=q.closest(".chip");p&&b.contains(p)&&p.remove();return}const y=i.target.closest("[data-order-option]");if(y){const p=y.closest("[data-order-options]");if(!p)return;p.querySelectorAll("[data-order-option]").forEach(j=>{j.classList.toggle("is-active",j===y)});return}const r=i.target.closest("[data-active-filters-toggle]");if(!r)return;const S=b.querySelector(".advanced-filters-active");if(!S)return;const P=S.classList.toggle("is-collapsed");r.setAttribute("aria-expanded",String(!P))},_=()=>{d.open(e)},z=({restoreFocus:i=!0}={})=>{const l=document.querySelector(`[data-modal="${h}"]`),D=document.querySelector(`[data-modal-backdrop="${h}"]`);!l||!D||(x(),re(h),b.classList.contains("is-open")&&(document.body.style.overflow="hidden"),l.remove(),D.remove(),i&&v&&typeof v.focus=="function"&&v.focus(),v=null)},c=i=>{const l=document.querySelector(`[data-modal="${h}"]`),D=document.querySelector(`[data-modal-backdrop="${h}"]`);l&&l.remove(),D&&D.remove(),v=i||null,document.body.insertAdjacentHTML("beforeend",Ja({modalId:h}));const q=document.querySelector(`[data-modal="${h}"]`),y=document.querySelector(`[data-modal-backdrop="${h}"]`);if(!q||!y)return;const r=q.querySelector("#save-filters-name-input"),S=q.querySelector(".field"),P=q.querySelector("[data-save-filters-error]"),p=q.querySelector("[data-save-modal-cancel]"),j=q.querySelector("[data-modal-close]"),B=q.querySelector("[data-save-modal-submit]"),F=M=>{P&&(P.hidden=!M),S&&S.classList.toggle("field--error",M)},O=M=>{M.target===y&&z()},J=()=>z(),g=()=>z(),u=()=>{if(!r)return;const M=r.value.trim();if(!M){F(!0),r.focus();return}F(!1),console.log({nomeFiltro:M}),z()},C=()=>F(!1),k=M=>{M.key==="Escape"&&(M.preventDefault(),z())};y.addEventListener("click",O),p&&p.addEventListener("click",J),j&&j.addEventListener("click",g),B&&B.addEventListener("click",u),r&&r.addEventListener("input",C),document.addEventListener("keydown",k),x=()=>{y.removeEventListener("click",O),p&&p.removeEventListener("click",J),j&&j.removeEventListener("click",g),B&&B.removeEventListener("click",u),r&&r.removeEventListener("input",C),document.removeEventListener("keydown",k),x=()=>{}},ce(h),r&&typeof r.focus=="function"&&requestAnimationFrame(()=>r.focus())};return L&&L.addEventListener("click",w),b.addEventListener("click",$),e.addEventListener("click",_),()=>{z({restoreFocus:!1}),e.removeEventListener("click",_),L&&L.removeEventListener("click",w),b.removeEventListener("click",$),d.cleanup&&d.cleanup();const i=document.querySelector(`[data-drawer="${t}"]`),l=document.querySelector(`[data-drawer-backdrop="${t}"]`);i&&i.remove(),l&&l.remove()}}function Ha(e){return`<section class="advanced-filters">${$e({id:"advanced-filters-tabs",variant:"underlined",fullWidth:!0,activeTab:0,tabs:[{label:"Filtro",content:Ua()},{label:"Filtros Salvos",content:Va(e)}]})}</section>`}function Qa(){return{items:[{id:"saved-filter-1",name:"Relatório Mensal",sharing:["Vitor (Gerente)","Equipe de Vendas"]},{id:"saved-filter-2",name:"Filtro Relatório Mensal 2",sharing:["Vitor (Gerente)","Equipe de Vendas"]},{id:"saved-filter-3",name:"Relatório Mensal 33",sharing:["Vitor (Gerente)","Equipe de Vendas"]},{id:"saved-filter-4",name:"Relatório Anual",sharing:["Vitor (Gerente)","Equipe de Vendas"]}],editingId:"saved-filter-1",selectedId:""}}function Va(e){return`
    <div class="saved-filters-panel" data-saved-filters-panel>
      ${je(e)}
    </div>
  `}function le(e,a){if(!e)return;const t=e.querySelector("[data-saved-filters-panel]");t&&(t.innerHTML=je(a))}function je(e){return e.items.length?e.items.map(a=>Oa(a,e)).join(""):'<div class="advanced-filters-empty">Nenhum filtro salvo.</div>'}function Oa(e,a){const t=a.editingId===e.id,o=a.selectedId===e.id,n=e.sharing.map((s,d)=>Q({label:s,value:`${e.id}-share-${d}`,size:"sm"})).join("");return`
    <div class="saved-filter-item ${o?"is-selected":""}" data-saved-filter-item="${e.id}">
      <div class="saved-filter-item__row">
        <div class="saved-filter-item__left">
          <span class="saved-filter-item__icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M2 3H14L9 9V13L7 14V9L2 3Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="saved-filter-item__name">${e.name}</span>
        </div>
        <div class="saved-filter-item__actions">
          <button type="button" class="saved-filter-item__action" data-saved-action="edit" aria-label="Editar filtro">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button type="button" class="saved-filter-item__action saved-filter-item__action--danger" data-saved-action="delete" aria-label="Excluir filtro">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M3 4H13M6 4V3C6 2.45 6.45 2 7 2H9C9.55 2 10 2.45 10 3V4M12 4V13C12 13.55 11.55 14 11 14H5C4.45 14 4 13.55 4 13V4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button type="button" class="saved-filter-item__action" data-saved-action="view" aria-label="Visualizar filtro">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M1.5 8S4 3.5 8 3.5S14.5 8 14.5 8S12 12.5 8 12.5S1.5 8 1.5 8Z" stroke="currentColor" stroke-width="1.4"/>
              <circle cx="8" cy="8" r="1.7" stroke="currentColor" stroke-width="1.4"/>
            </svg>
          </button>
        </div>
      </div>
      ${t?`
        <div class="saved-filter-item__edit">
          ${m({id:`saved-filter-name-${e.id}`,label:"Nome do filtro",value:e.name,className:"saved-filter-item__edit-name"}).replace('class="input"','class="input" data-saved-edit-name')}
          <div class="saved-filter-item__share">
            <span class="saved-filter-item__share-label">Compartilhamento</span>
            <div class="saved-filter-item__share-control">
              <div class="saved-filter-item__share-chips">${n}</div>
              <span class="saved-filter-item__share-caret" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
          <div class="saved-filter-item__edit-actions">
            <button type="button" class="btn btn--outline-dark btn--sm" data-saved-action="cancel-edit">Cancelar</button>
            <button type="button" class="btn btn--primary btn--sm" data-saved-action="save-edit">Salvar</button>
          </div>
        </div>
      `:""}
    </div>
  `}function Ua(){const e=`
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/>
      <path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,a=ee({id:"advanced-filter-selected",label:"Filtro selecionado",required:!0,placeholder:"",value:"relatorio-mensal",items:[{label:"Relatório Mensal",value:"relatorio-mensal"}]}),t=[Q({label:"Status: 6 selecionados",value:"status-6",size:"sm",className:"advanced-filters-chip--alert"}),Q({label:"Data entre: 22/12/25 + 01/01/26",value:"data-entre",size:"sm"}),Q({label:"Código: 2233",value:"codigo",size:"sm"}),Q({label:"Cliente: A2W",value:"cliente-1",size:"sm"}),Q({label:"Cliente: A2W",value:"cliente-2",size:"sm"}),Q({label:"Cliente: A2W",value:"cliente-3",size:"sm"}),Q({label:"Cliente: A2W",value:"cliente-4",size:"sm"})].join(""),o=Qe({id:"advanced-filter-show-inactive",label:"Mostrar inativos",size:"sm"}),n=qe({id:"advanced-filter-except",label:"Exceto",checked:!1}),s=ee({id:"advanced-filter-data-type",label:"Tipo de Data",placeholder:"Selecione o tipo de data",items:[{label:"Data de pedido",value:"pedido"},{label:"Data de início",value:"inicio"}]}),d=m({id:"advanced-filter-start-date",type:"date",label:"Data inicial",placeholder:"00/00/0000",iconRight:e}),b=m({id:"advanced-filter-end-date",type:"date",label:"Data final",placeholder:"00/00/0000",iconRight:e}),h=m({id:"advanced-filter-order-code",label:"Código Pedido",placeholder:"Digite o código do pedido"}),v=m({id:"advanced-filter-tawros-code",label:"Código TAWROS",placeholder:"Digite o código"}),x=m({id:"advanced-filter-client-code",label:"Código do Cliente",placeholder:"Digite o código do cliente"}),T=m({id:"advanced-filter-cpf-cnpj",label:"CPF/CNPJ",placeholder:"Digite o nome do cliente"}),L=m({id:"advanced-filter-business-name",label:"Razão Social/Nome",placeholder:"Digite o nome da Razão Social"}),w=m({id:"advanced-filter-fantasy-name",label:"Nome Fantasia/Apelido",placeholder:"Digite o Nome Fantasia"}),$=ee({id:"advanced-filter-class",label:"Classe",placeholder:"Selecione a classe",items:[{label:"Classe A",value:"a"},{label:"Classe B",value:"b"}]}),_=m({id:"advanced-filter-product-code",label:"Código Produto",placeholder:"Digite o código do produto"}),z=ee({id:"advanced-filter-product",label:"Produto",placeholder:"Nome do produto",items:[{label:"Tomate Cereja",value:"tomate-cereja"},{label:"Tomate Italiano",value:"tomate-italiano"}]}),c=m({id:"advanced-filter-min-quantity",label:"Quantidade Mínima",placeholder:"Quantidade"}),i=m({id:"advanced-filter-max-quantity",label:"Quantidade Máxima",placeholder:"Quantidade"}),l=ye({label:"Tipo",chips:[Q({label:"Enxerto",value:"enxerto",size:"sm"}),Q({label:"Porta Enxerto",value:"porta-enxerto",size:"sm"})]}),D=ye({label:"Status",chips:[Q({label:"Bloqueado",value:"bloqueado",size:"sm"}),Q({label:"Em Produção",value:"em-producao",size:"sm"}),Q({label:"Expedição",value:"expedicao",size:"sm"})]}),q=Ga(),y=ee({id:"advanced-filter-sorting-type",label:"Tipo de ordenação",required:!0,placeholder:"Selecione",items:[{label:"Crescente",value:"asc"},{label:"Decrescente",value:"desc"}]}),r=ye({label:"Etiqueta",chips:[Q({label:"Normal",value:"normal",size:"sm"}),Q({label:"Urgente",value:"urgente",size:"sm"})]}),S=Wa();return`
    <div class="advanced-filters-panel">
      <div data-drawer-autofocus>
        ${a}
      </div>
      <div class="advanced-filters-active">
        <div class="advanced-filters-active__header">
          <span class="advanced-filters-active__label">Filtros ativos</span>
          <button type="button" class="advanced-filters-active__toggle" data-active-filters-toggle aria-expanded="true" aria-label="Recolher filtros ativos">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 10L8 6L12 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="advanced-filters-active__chips" data-active-filters>
          ${t}
        </div>
      </div>
      <div class="advanced-filters-inline">
        ${o}
        ${n}
      </div>
      <div class="advanced-filters-grid">
        ${s}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${d}
        ${b}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${h}
        ${v}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${x}
        ${T}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${L}
        ${w}
      </div>
      <div class="advanced-filters-grid">
        ${$}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${_}
        ${z}
      </div>
      <div class="advanced-filters-grid">
        ${l}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${c}
        ${i}
      </div>
      <div class="advanced-filters-grid">
        ${D}
      </div>
      <div class="advanced-filters-grid">
        ${q}
      </div>
      <div class="advanced-filters-grid">
        ${y}
      </div>
      <div class="advanced-filters-grid">
        ${r}
      </div>
      <div class="advanced-filters-grid">
        ${S}
      </div>
    </div>
  `}function ye({label:e,chips:a}){const t=a.join("");return`
    <div class="advanced-filters-chip-field">
      <span class="advanced-filters-chip-field__label">${e}</span>
      <div class="advanced-filters-chip-field__control">
        <div class="advanced-filters-chip-field__chips">${t}</div>
        <span class="advanced-filters-chip-field__caret" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    </div>
  `}function Ga(){return`
    <div class="advanced-filters-sort">
      <span class="advanced-filters-sort__label">Ordenar por</span>
      <div class="advanced-filters-sort__options" data-order-options>
        <button type="button" class="advanced-filters-sort__option is-active" data-order-option="recentes">Mais recentes</button>
        <button type="button" class="advanced-filters-sort__option" data-order-option="antigos">Mais antigos</button>
        <button type="button" class="advanced-filters-sort__option" data-order-option="maior-valor">Maior valor</button>
        <button type="button" class="advanced-filters-sort__option" data-order-option="menor-valor">Menor valor</button>
      </div>
    </div>
  `}function Wa(){return`
    <div class="advanced-filters-group">
      <div class="advanced-filters-group__header">
        <span class="advanced-filters-group__title">Agrupar por</span>
        <span class="advanced-filters-group__hint">
          <span class="advanced-filters-group__hint-dot" aria-hidden="true"></span>
          Selecione e clique arraste para ordenar
        </span>
      </div>
      <div class="advanced-filters-group__options">${[{id:"advanced-filter-group-client",label:"Cliente",checked:!0},{id:"advanced-filter-group-class",label:"Classe",checked:!1},{id:"advanced-filter-group-product",label:"Produto",checked:!1},{id:"advanced-filter-group-order",label:"Pedidos",checked:!1}].map(t=>`
    <div class="advanced-filters-group__item">
      ${qe({id:t.id,label:t.label,checked:t.checked,size:"sm"})}
      <span class="advanced-filters-group__drag" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M6 3H6.01M10 3H10.01M6 8H6.01M10 8H10.01M6 13H6.01M10 13H10.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </span>
    </div>
  `).join("")}</div>
    </div>
  `}function Ya(){const e=A({text:"Salvar Filtros",style:"outline",variant:"dark",size:"sm",type:"button"}).replace("<button ",'<button data-filters-action="save" '),a=A({text:"Limpar Filtros",style:"outline",variant:"dark",size:"sm",type:"button"}).replace("<button ",'<button data-filters-action="clear" '),t=A({text:"Aplicar Filtros",variant:"primary",size:"sm",type:"button"}).replace("<button ",'<button data-filters-action="apply" ');return`
    <div class="advanced-filters-footer">
      <div class="advanced-filters-footer__left">
        ${e}
      </div>
      <div class="advanced-filters-footer__right">
        ${a}
        ${t}
      </div>
    </div>
  `}function Ja({modalId:e}){const a=m({id:"save-filters-name-input",label:"Nome do filtro",required:!0,placeholder:"Insira um nome para filtro"}),t=A({text:"Cancelar",style:"outline",variant:"dark",type:"button"}).replace("<button ","<button data-save-modal-cancel "),o=A({text:"Salvar",variant:"primary",type:"button"}).replace("<button ","<button data-save-modal-submit ");return fe({id:e,type:"center",size:"sm",title:"Salvar Filtros",body:`
      <div class="advanced-save-modal__body">
        ${a}
        <span class="advanced-save-modal__error" data-save-filters-error hidden>Nome do filtro é obrigatório.</span>
      </div>
    `,footer:`
      <div class="advanced-save-modal__footer">
        ${t}
        ${o}
      </div>
    `,closable:!0})}export{it as init};
