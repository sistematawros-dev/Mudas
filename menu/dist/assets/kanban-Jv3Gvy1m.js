const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/enviar-germinacao-drawer-B-AmkiEI.js","assets/drawer-BhhtaBzO.js","assets/drawer-DgoYSxAe.css","assets/tabs-Bc_csLdm.js","assets/tabs-s1TBgd84.css","assets/input-BGfEK18X.js","assets/input-CR6JfLmf.css","assets/chip-Iox8iBys.js","assets/chip-SXewrVMn.css","assets/icons-C9wddX8K.js","assets/index-nkyJuKF6.js","assets/index-QKrpXWls.css","assets/checkbox-Czn0aMdg.js","assets/checkbox-BuSHLP4E.css","assets/toggle-8KHLMbPj.js","assets/toggle-DZsEfZw8.css","assets/toast-CGbnOkVX.js","assets/toast-PmqmSduh.css","assets/file-upload-BWgfDtFs.js","assets/file-upload-DYJCPlLb.css","assets/table-Bhr5kK3b.js","assets/table-BIQ3tM8Q.css","assets/enviar-germinacao-drawer-b0Qkro_F.css","assets/badge-BJol6x-W.css","assets/button-C2QBC4-b.css"])))=>i.map(i=>d[i]);
import{c as we,o as $e,a as Pe,_ as Dt}from"./index-nkyJuKF6.js";import{i as h}from"./icons-C9wddX8K.js";/* empty css              */import{c as Ee,i as De}from"./drawer-BhhtaBzO.js";import{c as Ea}from"./tabs-Bc_csLdm.js";import{i as ye,c as D,b as le,a as fa,d as Dn}from"./input-BGfEK18X.js";import{i as qn,c as Da}from"./checkbox-Czn0aMdg.js";import{a as Rt,c as Nt}from"./toggle-8KHLMbPj.js";import{a as xe,c as pe}from"./chip-Iox8iBys.js";/* empty css               */import{s as ma,e as Pa}from"./toast-CGbnOkVX.js";import{i as Ln,c as Pn}from"./file-upload-BWgfDtFs.js";import{c as Ft}from"./table-Bhr5kK3b.js";function ja(e="id"){return typeof crypto<"u"&&crypto.randomUUID?`${e}-${crypto.randomUUID().split("-")[0]}`:`${e}-${Math.random().toString(36).substring(2,11)}`}function An(...e){return e.filter(Boolean).join(" ")}function xn(e={}){const{title:a="",count:t=0,color:n="gray",id:o=ja("column")}=e;return`
    <section class="kanban-column kanban-column--${n}" data-column-id="${o}" data-column-color="${n}">
      <div class="kanban-column__header">
        <div class="kanban-column__title-wrapper">
          <h3 class="kanban-column__title">${a}</h3>
          <span class="kanban-column__count">${t}</span>
        </div>
        <button class="kanban-column__settings" data-column-settings="${o}" aria-label="Configurações da coluna">
          ${h("settings",{size:20})}
        </button>
      </div>
      <div class="kanban-column__content" data-column-content="${o}">
        <!-- Cards serão inseridos aqui -->
      </div>
    </section>
  `}function Mn(e,a){const t=document.querySelector(`[data-column-content="${e}"]`);if(!t)return;const n=t.querySelector(".kanban-column__empty");n&&n.remove(),t.insertAdjacentHTML("beforeend",a),zn(e)}function zn(e){const a=document.querySelector(`[data-column-id="${e}"]`);if(!a)return;const n=a.querySelector(`[data-column-content="${e}"]`).querySelectorAll(".kanban-card").length,o=a.querySelector(".kanban-column__count");o&&(o.textContent=n)}function In(e,a){const t=document.querySelector(`[data-column-id="${e}"]`);if(!t)return;["cyan","green","blue","indigo","slate","purple","yellow","pink","red","orange"].forEach(o=>t.classList.remove(`kanban-column--${o}`)),t.classList.add(`kanban-column--${a}`),t.dataset.columnColor=a}function Tn(e){const a=document.querySelector(`[data-column-content="${e}"]`);a&&(a.innerHTML=`
    <div class="kanban-column__empty">
      ${h("package",{size:48})}
      <p class="kanban-column__empty-text">Não há ordens de produção</p>
    </div>
  `)}const Aa={check:'<svg viewBox="0 0 14 14" fill="none"><path d="M11.5 4L5.5 10L2.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',x:'<svg viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',dot:'<span class="badge-dot"></span>'};function Ie(e={}){const{text:a="",variant:t="primary",style:n="filled",size:o="",icon:d="",darkMode:s=!1}=e,r=["badge"];n==="filled"?r.push(`badge--${t}`):r.push(`badge--${n}-${t}`),o&&r.push(`badge--${o}`),s&&r.push("badge--dark-mode");let i="";return d&&Aa[d]&&(i=d==="dot"?Aa[d]:`<span class="badge-icon">${Aa[d]}</span>`),`<span class="${r.join(" ")}">${i}${a}</span>`}function Bn(e={}){const{code:a="",subtitle:t="",badgeLabel:n="",badgeVariant:o="light",badgeStyle:d="filled",items:s=[],id:r=ja("card")}=e,i=n?Ie({text:n,variant:o,style:d,size:"sm"}):"",v=s.map(y=>{if(y.type==="divider")return'<div class="kanban-card__divider"></div>';const c=y.icon!==null&&y.icon!==!1&&y.icon!=="",u=y.icon||"circle",E=c?h(u,{size:16}):"";return`
      <div class="kanban-card__item${y.className?` ${y.className}`:""}">
        ${E}
        <span>${y.label||""}</span>
        ${y.value?`<span class="kanban-card__item-label">${y.value}</span>`:""}
      </div>
    `}).join("");return`
    <div class="kanban-card" data-card-id="${r}">
      <div class="kanban-card__header">
        <div class="kanban-card__title">
          <a href="#" class="kanban-card__code">${a}</a>
          ${t?`<span class="kanban-card__subtitle">${t}</span>`:""}
        </div>
        ${i}
      </div>
      <div class="kanban-card__body">
        ${v}
      </div>
    </div>
  `}const Rn=[{value:"cyan",label:"Ciano"},{value:"green",label:"Verde"},{value:"blue",label:"Azul"},{value:"indigo",label:"Índigo"},{value:"slate",label:"Ardósia"},{value:"purple",label:"Roxo"},{value:"yellow",label:"Amarelo"},{value:"pink",label:"Rosa"},{value:"red",label:"Vermelho"},{value:"orange",label:"Laranja"}];function Nn(e={}){const{id:a=ja("color-picker"),selected:t="gray"}=e,n=Rn.map(o=>`
    <button
      type="button"
      class="${An("color-picker__option",o.value===t&&"is-selected")}"
      data-color="${o.value}"
      aria-label="${o.label}"
      title="${o.label}"
    >
      <span class="color-picker__color color-picker__color--${o.value}"></span>
    </button>
  `).join("");return`
    <div class="color-picker" id="${a}" data-color-picker>
      <div class="color-picker__header">
        <h4 class="color-picker__title">Cor da Coluna</h4>
        <button type="button" class="color-picker__close" aria-label="Fechar" data-color-picker-close>
          ${h("close",{size:16})}
        </button>
      </div>
      <div class="color-picker__grid">
        ${n}
      </div>
    </div>
  `}function Fn(e,a){if(!e)return;const t=e.querySelectorAll(".color-picker__option"),n=e.querySelector("[data-color-picker-close]");t.forEach(o=>{o.addEventListener("click",()=>{const d=o.dataset.color;t.forEach(s=>s.classList.remove("is-selected")),o.classList.add("is-selected"),a&&a(d)})}),n&&n.addEventListener("click",o=>{o.stopPropagation(),Ta(e)})}function Ta(e){e&&e.classList.remove("is-open")}function On(e){e&&e.classList.toggle("is-open")}const ca={plus:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',check:'<svg viewBox="0 0 16 16" fill="none"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronRight:'<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronDown:'<svg viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',download:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 2V10M8 10L5 7M8 10L11 7M3 14H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',upload:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 10V2M8 2L5 5M8 2L11 5M3 14H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',edit:'<svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',trash:'<svg viewBox="0 0 16 16" fill="none"><path d="M3 4H13M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',close:'<svg viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',search:'<svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'};function P(e={}){const{text:a="",variant:t="primary",style:n="solid",size:o="",iconLeft:d="",iconRight:s="",iconOnly:r=!1,disabled:i=!1,loading:v=!1,block:y=!1,darkMode:c=!1,tag:u="button",href:E="",type:p="button"}=e,$=["btn"];n==="solid"?$.push(`btn--${t}`):$.push(`btn--${n}-${t}`),o&&$.push(`btn--${o}`),r&&$.push("btn--icon-only"),v&&$.push("btn--loading"),y&&$.push("btn--block"),c&&$.push("btn--dark-mode");const I=d&&ca[d]?`<span class="btn-icon">${ca[d]}</span>`:"",A=s&&ca[s]?`<span class="btn-icon">${ca[s]}</span>`:"",M=r&&d?`<span class="btn-icon">${ca[d]}</span>`:`${I}${a}${A}`,T=i?"disabled":"";return u==="a"?`<a href="${E}" class="${$.join(" ")}">${M}</a>`:`<button type="${p}" class="${$.join(" ")}" ${T}>${M}</button>`}const We="kanban-link-order-modal",Vn="kanban-planning-modal",jn=[{id:"item-1",product:"Muda de Eucalipto",code:"MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",available:"1000"},{id:"item-2",product:"Muda de Eucalipto",code:"MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",available:"1000"},{id:"item-3",product:"Muda de Eucalipto",code:"MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",available:"1000"}];let Ba=()=>{},_a=null;function Qn(e=new Set){const a=[{key:"check",label:""},{key:"product",label:"Produto"},{key:"quantity",label:"Qtd. Pedido"},{key:"unitValue",label:"Valor Unitário"},{key:"totalValue",label:"Valor Total"},{key:"available",label:"Qtd. Disponível"}],t=jn.map((n,o)=>{const d=e.has(n.id)||!e.size&&o===0;return{check:Da({id:`link-order-checkbox-${n.id}`,value:n.id,checked:d,className:"link-order-modal__checkbox"}).replace('class="checkbox-input"','class="checkbox-input" data-link-order-item'),product:`
        <div class="link-order-modal__product">
          <span>${n.product}</span>
          <small>${n.code}</small>
        </div>
      `,quantity:n.quantity,unitValue:n.unitValue,totalValue:n.totalValue,available:n.available}});return Ft({id:"link-order-items-table",columns:a,data:t,variant:"compact",className:"link-order-modal__table-component"})}function Hn({selectedIds:e=new Set}={}){return Pe({id:We,title:"Vincular Pedido",size:"md",className:"link-order-modal",body:`
      <div class="link-order-modal__content">
        ${D({id:"link-order-search",label:"Vincular pedido",required:!0,placeholder:"Buscar por código, nome do pedido",iconRight:h("search",{size:14})})}

        <section class="link-order-modal__info-card">
          <h3 class="link-order-modal__section-title">${h("file",{size:12})}Informações do Pedido</h3>
          <div class="link-order-modal__info-grid">
            <div><span>Código do Pedido</span><strong>001</strong></div>
            <div><span>Código ERP</span><strong>43242343</strong></div>
            <div><span>CPF/CNPJ</span><strong>123.456.789-00</strong></div>
            <div><span>Razão Social/Nome</span><strong>Nome da razao social</strong></div>
            <div><span>Nome Fantasia/Apelido</span><strong>Nome fantasia</strong></div>
            <div><span>Nome do Vendedor</span><strong>Nome do Vendedor</strong></div>
          </div>
        </section>

        <div class="link-order-modal__table-wrap" data-link-order-table-host>
          ${Qn(e)}
        </div>
      </div>
    `,footer:`
      <div class="link-order-modal__footer">
        ${P({text:"Desvincular pedido",style:"outline",variant:"error",size:"sm"}).replace("<button ",'<button data-link-order-action="unlink" ')}
        <div class="link-order-modal__footer-right">
          ${P({text:"Voltar",style:"outline",variant:"dark",size:"sm"}).replace("<button ",'<button data-link-order-action="back" ')}
          ${P({text:"Salvar",variant:"primary",size:"sm"}).replace("<button ",'<button data-link-order-action="save" ')}
        </div>
      </div>
    `})}function Qe({restoreFocus:e=!0}={}){const a=document.querySelector(`[data-modal="${We}"]`),t=document.querySelector(`[data-modal-backdrop="${We}"]`);!a||!t||(Ba(),we(We),document.querySelector(`[data-modal="${Vn}"]`)?.classList.contains("is-visible")&&(document.body.style.overflow="hidden"),a.remove(),t.remove(),e&&_a?.focus&&_a.focus(),_a=null)}function Kn(e={}){const{anchorEl:a=null,selectedIds:t=[],onBack:n=null,onSave:o=null}=e;Qe({restoreFocus:!1});const d=new Set(Array.isArray(t)?t:[]);_a=a,document.body.insertAdjacentHTML("beforeend",Hn({selectedIds:d}));const s=document.querySelector(`[data-modal="${We}"]`),r=document.querySelector(`[data-modal-backdrop="${We}"]`);if(!s||!r)return;const i=ye(s),v=qn(s),y=s.querySelector("[data-modal-close]"),c=s.querySelector("[data-link-order-table-host]"),u=s.querySelector('[data-link-order-action="unlink"]'),E=s.querySelector('[data-link-order-action="back"]'),p=s.querySelector('[data-link-order-action="save"]'),$=s.querySelector("#link-order-search"),I=()=>{const O=c?.querySelectorAll("[data-link-order-item]")||[];return Array.from(O).filter(j=>j.checked).map(j=>j.value)},A=()=>Qe(),M=O=>{O.target===r&&Qe()},T=O=>{O.key==="Escape"&&(O.preventDefault(),O.stopPropagation(),Qe())},B=()=>{(c?.querySelectorAll("[data-link-order-item]")||[]).forEach(j=>{j.checked=!1,j.indeterminate=!1})},f=()=>{Qe({restoreFocus:!1}),typeof n=="function"&&n()},G=()=>{const O=I();typeof o=="function"&&o(O),Qe({restoreFocus:!1}),a?.focus&&a.focus()};y?.addEventListener("click",A),u?.addEventListener("click",B),E?.addEventListener("click",f),p?.addEventListener("click",G),r.addEventListener("click",M),document.addEventListener("keydown",T,!0),Ba=()=>{y?.removeEventListener("click",A),u?.removeEventListener("click",B),E?.removeEventListener("click",f),p?.removeEventListener("click",G),r.removeEventListener("click",M),document.removeEventListener("keydown",T,!0),typeof i=="function"&&i(),typeof v=="function"&&v(),Ba=()=>{}},$e(We),setTimeout(()=>{$?.focus?.()},120)}const Oe="kanban-planning-modal",Gn="kanban-link-order-modal",ze="kanban-planning-agenda-modal",Me="kanban-planning-reagenda-modal",Wn=[{value:"estoque-venda-direta",label:"Estoque (Venda Direta)"},{value:"remessa-futura",label:"Remessa Futura"},{value:"vincular-op",label:"Vincular Ordem de Produção"}],Ot=[{value:"estufa-1",label:"Sala de Semeio 1"},{value:"estufa-2",label:"Sala de Semeio 2"},{value:"estufa-3",label:"Sala de Semeio 3"}],Un=[{value:"0001",label:"0001"},{value:"0002",label:"0002"},{value:"0003",label:"0003"}];function ha(e){if(e==null)return 0;const a=String(e).replace(/[^\d]/g,"");return a&&Number.parseInt(a,10)||0}function xa(e){const a=Number.isFinite(e)?e:ha(e);return new Intl.NumberFormat("pt-BR").format(Math.max(0,a))}let Ra=()=>{},ya=null,Na=()=>{},ka=null,Fa=()=>{},wa=null;const Ma=new Map;function Jn(e=0){return{serviceType:"estoque-venda-direta",linkedItems:[],draftQuantity:"",draftLot:"",rows:[{op:"0001",seedDate:"00/00/0000",daysAfterSowing:"30 dias",quantity:"5.000"},{op:"0001",seedDate:"00/00/0000",daysAfterSowing:"30 dias",quantity:"5.000"}],futureDraftLocation:"",futureDraftResponsible:"",futureDraftQuantity:"",futureDraftDate:"",futureRows:[{plannedDate:"00/00/0000",location:"André Santos",responsible:"André Santos",quantity:"5.000"},{plannedDate:"00/00/0000",location:"André Santos",responsible:"André Santos",quantity:"5.000"}],availableQuantity:e}}function Yn(e={}){if(e.memoryKey)return String(e.memoryKey);const a=e.orderItem||{};return a.id?`planning:${a.id}`:a.product?`planning:${a.product}`:"planning:global"}function qt(e=[],a="estoque-venda-direta"){const t=a==="remessa-futura",n=t?[{key:"plannedDate",label:"Data planejada"},{key:"location",label:"Localização"},{key:"responsible",label:"Responsável"},{key:"quantity",label:"Quantidade"},{key:"actions",label:"Ações"}]:[{key:"op",label:"OP"},{key:"seedDate",label:"Data Semeio"},{key:"daysAfterSowing",label:"Dias após Semeio"},{key:"quantity",label:"Quantidade"},{key:"actions",label:"Ações"}],o=e.map((d,s)=>({...t?{plannedDate:d.plannedDate,location:d.location,responsible:d.responsible,quantity:d.quantity}:{op:d.op,seedDate:d.seedDate,daysAfterSowing:d.daysAfterSowing,quantity:d.quantity},actions:`
      <div class="planning-modal__actions">
        <button type="button" class="planning-modal__icon-btn" data-planning-row-action="edit" data-row-index="${s}" aria-label="Editar">${h("edit",{size:14})}</button>
        <button type="button" class="planning-modal__icon-btn planning-modal__icon-btn--danger" data-planning-row-action="delete" data-row-index="${s}" aria-label="Excluir">${h("trash",{size:14})}</button>
        <button type="button" class="planning-modal__icon-btn" data-planning-row-action="view" data-row-index="${s}" aria-label="Visualizar">${h("eye",{size:14})}</button>
      </div>
    `}));return Ft({id:"planning-items-table",columns:n,data:o,variant:"compact",className:"planning-modal__table-component"})}function Vt(e="estoque-venda-direta",a={}){return e==="remessa-futura"?`
    <section class="planning-modal__future-block">
      <div class="planning-modal__future-grid planning-modal__future-grid--2">
        ${le({id:"planning-future-location",label:"Localização",placeholder:"Selecione",value:a.futureDraftLocation||"",items:Ot})}
        ${D({id:"planning-future-responsible",label:"Responsável",placeholder:"Digite o responsável",value:a.futureDraftResponsible||""})}
      </div>

      <div class="planning-modal__future-grid planning-modal__future-grid--3">
        ${D({id:"planning-future-quantity",label:"Quantidade",placeholder:"Digite a quantidade",value:a.futureDraftQuantity||""})}
        ${D({id:"planning-future-date",type:"date",label:"Data planejada para semeio",required:!0,value:a.futureDraftDate||"",className:"planning-modal__date-field",iconRight:h("calendar",{size:16})})}
        <div class="planning-modal__agenda-wrap">
          <label class="planning-modal__agenda-label">&nbsp;</label>
          ${P({text:"Consultar agenda",style:"outline",variant:"dark",size:"sm",iconLeft:"plus"}).replace("<button ",'<button data-planning-action="check-agenda" ')}
        </div>
      </div>

      ${P({text:"Adicionar",style:"outline",variant:"dark",size:"sm",iconLeft:"plus"}).replace("<button ",'<button data-planning-action="add-row" ')}
    </section>

    <div class="planning-modal__table-wrap" data-planning-table-host>
      ${qt(a.futureRows||[],e)}
    </div>
  `:`
      <div class="planning-modal__link-row">
        <button type="button" class="btn btn--outline-dark btn--sm" data-planning-action="link-order">
          <span class="btn-icon">${h("file",{size:14})}</span>
          Vincular Pedido
        </button>
        <span class="planning-modal__linked-feedback" data-planning-linked-feedback hidden></span>
      </div>

      <section class="planning-modal__add-block">
        <div class="planning-modal__add-grid">
          ${D({id:"planning-quantity",label:"Quantidade",placeholder:"Digite a quantidade",value:a.draftQuantity||""})}
          ${le({id:"planning-lot",label:"Lote",placeholder:"Selecione",value:a.draftLot||"",items:Un})}
        </div>
        ${P({text:"Adicionar",style:"outline",variant:"dark",size:"sm",iconLeft:"plus"}).replace("<button ",'<button data-planning-action="add-row" ')}
      </section>

      <div class="planning-modal__table-wrap" data-planning-table-host>
        ${qt(a.rows||[],e)}
      </div>
    `}function Zn({orderItem:e={},rows:a=[]}={}){const{product:t="Muda de Eucalipto Clone - MUD-001",totalPedido:n="5000",available:o="5000",availableQuantity:d=""}=e;return Pe({id:Oe,title:"Planejamento",size:"lg",className:"planning-modal",body:`
      <div class="planning-modal__content">
        <section class="planning-modal__summary">
          <div><span>Produto</span><strong>${t}</strong></div>
          <div><span>Total Pedido</span><strong>${n}</strong></div>
          <div><span>Disponível</span><strong class="planning-modal__available">${d||o}</strong></div>
        </section>

        ${le({id:"planning-service-type",label:"Tipo de Atendimento",placeholder:"Selecione",value:"estoque-venda-direta",items:Wn})}

        <div data-planning-dynamic-content>
          ${Vt("estoque-venda-direta",{rows:a})}
        </div>
      </div>
    `,footer:`
      <div class="planning-modal__footer">
        ${P({text:"Cancelar",style:"outline",variant:"dark",size:"sm"}).replace("<button ",'<button data-planning-action="cancel" ')}
        ${P({text:"Planejar",variant:"primary",size:"sm"}).replace("<button ",'<button data-planning-action="submit" ')}
      </div>
    `})}function jt(){const e=new Date(2026,0,14);return{selectedDate:e,currentDate:e,viewMode:"week"}}function ra(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function Oa(e){const a=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${t}-${n}`}function Xn(e){if(!e||typeof e!="string")return null;const[a,t,n]=e.split("-").map(Number);return[a,t,n].some(Number.isNaN)?null:new Date(a,t-1,n)}function eo(e,a){return!e||!a?!1:e.getFullYear()===a.getFullYear()&&e.getMonth()===a.getMonth()&&e.getDate()===a.getDate()}function Qt(e){const a=ra(e);return a.setDate(a.getDate()-a.getDay()),a}function va(e,a){const t=ra(e);return t.setDate(t.getDate()+a),t}function ao(e,a){const t=ra(e);return t.setMonth(t.getMonth()+a),t}function Ht(e){return`${["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][e.getMonth()]} ${e.getFullYear()}`}function Kt(e){const a=Qt(e),t=va(a,6),n=Ht(t).replace(` ${t.getFullYear()}`,"");return`${String(a.getDate()).padStart(2,"0")} - ${String(t.getDate()).padStart(2,"0")} de ${n} ${t.getFullYear()}`}function to(e){return e.getFullYear()!==2026||e.getMonth()!==0?"":new Set([12,13,14,15,16]).has(e.getDate())?"15.000":""}function Gt({date:e,selectedDate:a,currentMonth:t=null}){const n=Oa(e),o=eo(e,a),d=t!==null&&e.getMonth()!==t,s=to(e);return`
    <button type="button" class="schedule-modal__day${o?" is-selected":""}${d?" is-outside-month":""}" data-planning-agenda-date="${n}">
      <span class="schedule-modal__day-number">${e.getDate()}</span>
      <span class="schedule-modal__day-qty">${s}</span>
    </button>
  `}function no(e){const a=Qt(e.selectedDate);return`
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--week">${Array.from({length:7},(n,o)=>Gt({date:va(a,o),selectedDate:e.selectedDate})).join("")}</div>
  `}function oo(e){const a=new Date(e.currentDate.getFullYear(),e.currentDate.getMonth(),1),t=va(a,-a.getDay());return`
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--month">${Array.from({length:42},(o,d)=>Gt({date:va(t,d),selectedDate:e.selectedDate,currentMonth:a.getMonth()})).join("")}</div>
  `}function Wt(e){const a=e.viewMode==="month"?"schedule-modal__calendar-grid--month":"schedule-modal__calendar-grid--week",t=e.viewMode==="month"?oo(e):no(e);return`<div class="schedule-modal__calendar-grid ${a}">${t}</div>`}function ro(e=jt()){return Pe({id:ze,title:"Agendamento",size:"xl",className:"schedule-modal",body:`
      <div class="schedule-modal__content">
        ${le({id:"planning-agenda-location-select",label:"Selecionar localização",required:!0,placeholder:"Selecionar...",items:[{label:"Estufa 1",value:"estufa-1"},{label:"Estufa 2",value:"estufa-2"}]})}

        <div class="schedule-modal__period-row">
          <span class="schedule-modal__period-text" data-planning-agenda-period>${Kt(e.selectedDate)}</span>
          <div class="schedule-modal__period-nav">
            <button type="button" class="schedule-modal__icon-btn" data-planning-agenda-nav="prev" aria-label="Periodo anterior">${h("chevron-left",{size:14})}</button>
            <button type="button" class="schedule-modal__icon-btn" data-planning-agenda-nav="next" aria-label="Proximo periodo">${h("chevron-right",{size:14})}</button>
          </div>
        </div>

        <div class="schedule-modal__view-toggle">
          <button type="button" class="schedule-modal__view-btn ${e.viewMode==="month"?"is-active":""}" data-planning-agenda-view="month">Mês</button>
          <button type="button" class="schedule-modal__view-btn ${e.viewMode==="week"?"is-active":""}" data-planning-agenda-view="week">Semana</button>
        </div>

        <div class="schedule-modal__calendar schedule-modal__calendar--week" data-planning-agenda-calendar>
          ${Wt(e)}
        </div>

        <div class="schedule-modal__table-header">
          <h3 class="schedule-modal__table-title" data-planning-agenda-day-title>Agendamentos para o dia ${e.selectedDate.getDate()}</h3>
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
                <td><button type="button" class="schedule-modal__reagendar" data-planning-agenda-reagendar>Reagendar</button></td>
              </tr>
              <tr>
                <td>Nome do cliente</td>
                <td>Ordem de produção</td>
                <td>Cultura</td>
                <td>Quantidade</td>
                <td><button type="button" class="schedule-modal__reagendar" data-planning-agenda-reagendar>Reagendar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,footer:`
      <div class="schedule-modal__footer">
        ${P({text:"Voltar",variant:"outline-dark",size:"sm"}).replace("<button ",'<button data-planning-agenda-action="back" ')}
        ${P({text:"Selecionar data",variant:"primary",size:"sm"}).replace("<button ",'<button data-planning-agenda-action="select-date" ')}
      </div>
    `})}function so(e={}){return Pe({id:Me,title:"Agendamento",size:"sm",className:"reschedule-modal",body:`
      <div class="reschedule-modal__content">
        ${D({id:"planning-reagenda-date",type:"date",label:"Data",required:!0,value:e.date||"",className:"reschedule-modal__date-field"})}
        ${D({id:"planning-reagenda-location",label:"Localização",required:!0,placeholder:"Nome da localização",value:e.location||""})}
        ${D({id:"planning-reagenda-responsible",label:"Responsável",required:!0,placeholder:"Nome do responsável",value:e.responsible||""})}
        <span class="reschedule-modal__error" data-planning-reagenda-error hidden>Preencha todos os campos obrigatórios.</span>
      </div>
    `,footer:`
      <div class="reschedule-modal__footer">
        ${P({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button ",'<button data-planning-reagenda-action="cancel" ')}
        ${P({text:"Confirmar",variant:"primary",size:"sm"}).replace("<button ",'<button data-planning-reagenda-action="confirm" ')}
      </div>
    `})}function Ne({restoreFocus:e=!0}={}){const a=document.querySelector(`[data-modal="${Me}"]`),t=document.querySelector(`[data-modal-backdrop="${Me}"]`);!a||!t||(Fa(),we(Me),document.querySelector(`[data-modal="${ze}"]`)?.classList.contains("is-visible")&&(document.body.style.overflow="hidden"),a.remove(),t.remove(),e&&wa?.focus&&wa.focus(),wa=null)}function He({restoreFocus:e=!0}={}){Ne({restoreFocus:!1});const a=document.querySelector(`[data-modal="${ze}"]`),t=document.querySelector(`[data-modal-backdrop="${ze}"]`);if(!a||!t)return;Na(),we(ze),document.querySelector(`[data-modal="${Oe}"]`)?.classList.contains("is-visible")&&(document.body.style.overflow="hidden"),a.remove(),t.remove(),e&&ka?.focus&&ka.focus(),ka=null}function io(e=null){He({restoreFocus:!1}),ka=e;let a=jt();document.body.insertAdjacentHTML("beforeend",ro(a));const t=document.querySelector(`[data-modal="${ze}"]`),n=document.querySelector(`[data-modal-backdrop="${ze}"]`);if(!t||!n)return;const o=t.querySelector("#planning-agenda-location-select"),d=t.querySelector("[data-modal-close]"),s=()=>{const u=t.querySelector("[data-planning-agenda-period]");u&&(u.textContent=a.viewMode==="month"?Ht(a.currentDate):Kt(a.selectedDate));const E=t.querySelector("[data-planning-agenda-calendar]");E&&(E.classList.toggle("schedule-modal__calendar--month",a.viewMode==="month"),E.classList.toggle("schedule-modal__calendar--week",a.viewMode==="week"),E.innerHTML=Wt(a)),t.querySelectorAll("[data-planning-agenda-view]").forEach($=>{$.classList.toggle("is-active",$.dataset.planningAgendaView===a.viewMode)});const p=t.querySelector("[data-planning-agenda-day-title]");p&&(p.textContent=`Agendamentos para o dia ${a.selectedDate.getDate()}`)},r=(u=null)=>{Ne({restoreFocus:!1}),wa=u,document.body.insertAdjacentHTML("beforeend",so({date:Oa(a.selectedDate),location:"",responsible:""}));const E=document.querySelector(`[data-modal="${Me}"]`),p=document.querySelector(`[data-modal-backdrop="${Me}"]`);if(!E||!p)return;const $=E.querySelector("[data-modal-close]"),I=E.querySelector("#planning-reagenda-date"),A=E.querySelector("#planning-reagenda-location"),M=E.querySelector("#planning-reagenda-responsible"),T=E.querySelector("[data-planning-reagenda-error]"),B=()=>{T&&(T.hidden=!0),[I,A,M].forEach(L=>{L?.closest(".field")?.classList.remove("field--error")})},f=()=>{B();const L=[];return I?.value||L.push(I),A?.value?.trim()||L.push(A),M?.value?.trim()||L.push(M),L.length?(L.forEach(l=>l?.closest(".field")?.classList.add("field--error")),T&&(T.hidden=!1),L[0]?.focus?.(),!1):!0},G=()=>Ne(),O=L=>{L.target===p&&Ne()},j=()=>{f()&&(ma("Reagendamento confirmado"),Ne())},U=L=>{L.key==="Escape"&&(L.preventDefault(),L.stopPropagation(),Ne())},ce=L=>{const l=L.target.closest("[data-planning-reagenda-action]");if(!l)return;const b=l.dataset.planningReagendaAction;if(b==="cancel"){Ne();return}b==="confirm"&&j()};$?.addEventListener("click",G),p.addEventListener("click",O),E.addEventListener("click",ce),document.addEventListener("keydown",U,!0),[I,A,M].forEach(L=>L?.addEventListener("input",B)),Fa=()=>{$?.removeEventListener("click",G),p.removeEventListener("click",O),E.removeEventListener("click",ce),document.removeEventListener("keydown",U,!0),[I,A,M].forEach(L=>L?.removeEventListener("input",B)),Fa=()=>{}},$e(Me)},i=()=>He(),v=u=>{u.target===n&&He()},y=u=>{u.key==="Escape"&&(document.querySelector(`[data-modal="${Me}"]`)?.classList.contains("is-visible")||(u.preventDefault(),u.stopPropagation(),He()))},c=u=>{const E=u.target.closest("[data-planning-agenda-action]");if(E){const M=E.dataset.planningAgendaAction;if(M==="back"){He();return}if(M==="select-date"){const T=document.querySelector("#planning-future-date");T&&(T.value=Oa(a.selectedDate),T.dispatchEvent(new Event("input",{bubbles:!0}))),He();return}}const p=u.target.closest("[data-planning-agenda-view]");if(p){a.viewMode=p.dataset.planningAgendaView==="month"?"month":"week",a.viewMode==="month"&&(a.currentDate=ra(a.selectedDate)),s();return}const $=u.target.closest("[data-planning-agenda-nav]");if($){const M=$.dataset.planningAgendaNav==="prev"?-1:1;a.viewMode==="month"?a.currentDate=ao(a.currentDate,M):(a.selectedDate=va(a.selectedDate,M*7),a.currentDate=ra(a.selectedDate)),s();return}const I=u.target.closest("[data-planning-agenda-date]");if(I){const M=Xn(I.dataset.planningAgendaDate);if(!M)return;a.selectedDate=M,a.currentDate=ra(M),s();return}const A=u.target.closest("[data-planning-agenda-reagendar]");if(A){r(A);return}};d?.addEventListener("click",i),n.addEventListener("click",v),t.addEventListener("click",c),document.addEventListener("keydown",y,!0),Na=()=>{Ne({restoreFocus:!1}),d?.removeEventListener("click",i),n.removeEventListener("click",v),t.removeEventListener("click",c),document.removeEventListener("keydown",y,!0),Na=()=>{}},$e(ze),s(),o?.focus&&setTimeout(()=>o.focus(),120)}function Ke({restoreFocus:e=!0}={}){He({restoreFocus:!1}),Qe({restoreFocus:!1});const a=document.querySelector(`[data-modal="${Oe}"]`),t=document.querySelector(`[data-modal-backdrop="${Oe}"]`);if(!a||!t)return;Ra(),we(Oe),document.querySelector("[data-drawer].is-open")&&(document.body.style.overflow="hidden"),a.remove(),t.remove(),e&&ya?.focus&&ya.focus(),ya=null}function lo(e={}){const{anchorEl:a=null,orderItem:t={},onAddRow:n=null}=e,o=Yn(e),d=ha(t.availableQuantity||t.available||t.totalPedido||"0");Ke({restoreFocus:!1}),ya=a;const r=Ma.get(o)||Jn(d);Ma.set(o,r),document.body.insertAdjacentHTML("beforeend",Zn({orderItem:{...t,available:xa(d)},rows:r.rows}));const i=document.querySelector(`[data-modal="${Oe}"]`),v=document.querySelector(`[data-modal-backdrop="${Oe}"]`);if(!i||!v)return;const y=i.querySelector("#planning-service-type");let c=()=>{};const u=i.querySelector("[data-modal-close]"),E=i.querySelector('[data-planning-action="cancel"]');i.querySelector('[data-planning-action="submit"]');const p=i.querySelector("[data-planning-dynamic-content]"),$=()=>{E&&(E.className=r.serviceType==="remessa-futura"?"btn btn--text-primary btn--sm":"btn btn--outline-dark btn--sm")},I=()=>{const m=i.querySelector("[data-planning-linked-feedback]");if(!m||r.serviceType!=="estoque-venda-direta")return;const S=r.linkedItems.length;m.hidden=S===0,m.textContent=S?`Pedido vinculado: ${S} item(ns) selecionado(s).`:""},A=()=>{p&&(c(),p.innerHTML=Vt(r.serviceType,r),c=ye(p)||(()=>{}),I(),$())},M=()=>{const m=i.querySelector(".planning-modal__available");m&&(m.textContent=xa(r.availableQuantity))},T=()=>{r.serviceType==="remessa-futura"?(r.futureDraftQuantity=i.querySelector("#planning-future-quantity")?.value||r.futureDraftQuantity,r.futureDraftLocation=i.querySelector("#planning-future-location")?.value||r.futureDraftLocation,r.futureDraftResponsible=i.querySelector("#planning-future-responsible")?.value||r.futureDraftResponsible,r.futureDraftDate=i.querySelector("#planning-future-date")?.value||r.futureDraftDate):(r.draftQuantity=i.querySelector("#planning-quantity")?.value||r.draftQuantity,r.draftLot=i.querySelector("#planning-lot")?.value||r.draftLot),Ma.set(o,r)},B=()=>{T(),Ke()},f=m=>{m.target===v&&(T(),Ke())},G=m=>{m.key==="Escape"&&(document.querySelector(`[data-modal="${Gn}"]`)?.classList.contains("is-visible")||document.querySelector(`[data-modal="${ze}"]`)?.classList.contains("is-visible")||document.querySelector(`[data-modal="${Me}"]`)?.classList.contains("is-visible")||(m.preventDefault(),m.stopPropagation(),T(),Ke()))},O=m=>{const S=m.target.closest("[data-planning-row-action]");if(!S)return;const k=S.dataset.planningRowAction,C=Number(S.dataset.rowIndex);if(k==="delete"&&!Number.isNaN(C)){if(r.serviceType==="remessa-futura"){const q=r.futureRows[C];r.availableQuantity+=ha(q?.quantity),r.futureRows=r.futureRows.filter((z,w)=>w!==C)}else r.rows=r.rows.filter((q,z)=>z!==C);A(),M();return}console.log(`Ação ${k} na linha`,C)},j=m=>{Kn({anchorEl:m,selectedIds:r.linkedItems,onBack:()=>{m?.focus&&m.focus()},onSave:S=>{r.linkedItems=Array.isArray(S)?S:[],I()}})},U=()=>{if(r.serviceType==="remessa-futura"){const C=i.querySelector("#planning-future-quantity"),q=i.querySelector("#planning-future-location"),z=i.querySelector("#planning-future-responsible"),w=i.querySelector("#planning-future-date"),g=C?.value||"",x=q?.value||"",N=z?.value?.trim()||"",K=w?.value||"";if(!g||!x||!N||!K){Pa("Preencha todos os campos obrigatórios.");return}const H=ha(g);if(H<=0){Pa("Informe uma quantidade válida.");return}const R=r.availableQuantity-H;if(R<0){Pa("Valor digitado maior que o disponível.");return}r.futureDraftQuantity=g,r.futureDraftLocation=x,r.futureDraftResponsible=N,r.futureDraftDate=K,r.futureRows.push({plannedDate:r.futureDraftDate,location:Ot.find(ne=>ne.value===r.futureDraftLocation)?.label||r.futureDraftLocation,responsible:r.futureDraftResponsible,quantity:xa(H)});const me=r.futureRows[r.futureRows.length-1];r.availableQuantity=R,r.futureDraftLocation="",r.futureDraftResponsible="",r.futureDraftQuantity="",r.futureDraftDate="",typeof n=="function"&&n({serviceType:r.serviceType,orderItem:t,row:me}),A(),M();return}const m=i.querySelector("#planning-quantity")?.value||"5000",S=i.querySelector("#planning-lot")?.value||"0001";r.draftQuantity=m,r.draftLot=S,r.rows.push({op:S,seedDate:"00/00/0000",daysAfterSowing:"30 dias",quantity:m});const k=r.rows[r.rows.length-1];typeof n=="function"&&n({serviceType:r.serviceType,orderItem:t,row:k}),A()},ce=()=>{io(i.querySelector('[data-planning-action="check-agenda"]'))},L=()=>{ma("Planejamento enviado",{message:"Itens enviados para expedição."}),Ke()},b=(m=>{if(!m)return()=>{};const S=q=>{const z=q.target;if(z instanceof HTMLElement){if(z.id==="planning-service-type"){const w=z.value||"estoque-venda-direta";r.serviceType=w,A();return}z.id==="planning-quantity"&&(r.draftQuantity=z.value),z.id==="planning-lot"&&(r.draftLot=z.value),z.id==="planning-future-location"&&(r.futureDraftLocation=z.value),z.id==="planning-future-quantity"&&(r.futureDraftQuantity=z.value),z.id==="planning-future-date"&&(r.futureDraftDate=z.value),z.id==="planning-future-responsible"&&z instanceof HTMLInputElement&&(r.futureDraftResponsible=z.value)}},k=q=>{const z=q.target.closest("[data-planning-action]");if(z){const w=z.dataset.planningAction;if(w==="cancel"){B();return}if(w==="submit"){L();return}if(w==="add-row"){U();return}if(w==="link-order"){j(z);return}if(w==="check-agenda"){ce();return}}O(q)},C=q=>{const z=q.target;z instanceof HTMLInputElement&&z.id==="planning-future-responsible"&&(r.futureDraftResponsible=z.value)};return m.addEventListener("change",S),m.addEventListener("click",k),m.addEventListener("input",C),()=>{m.removeEventListener("change",S),m.removeEventListener("click",k),m.removeEventListener("input",C)}})(i);u?.addEventListener("click",B),v.addEventListener("click",f),document.addEventListener("keydown",G,!0),A(),M(),y&&(y.value=r.serviceType),$(),Ra=()=>{b(),u?.removeEventListener("click",B),v.removeEventListener("click",f),document.removeEventListener("keydown",G,!0),c(),Ra=()=>{}},$e(Oe),setTimeout(()=>{y?.focus?.()},120)}const Z=Object.freeze({PRODUCAO:"producao",PEDIDOS:"pedidos"}),ke=Object.freeze({KANBAN:"kanban",LIST:"list"}),Ut=new Set(["aguardando-aprovacao","agendado","semeio","germinacao","casa-vegetacao","expedicao","finalizado","cancelado"]),Qa={columns:[{id:"aguardando-aprovacao",title:"Aguardando Agendamento",color:"green",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data planejada:",value:"14/01/2025"}]},{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data planejada:",value:"14/01/2025"}]}]},{id:"agendado",title:"Agendado",color:"blue",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data planejada:",value:"14/01/2025"}]}]},{id:"semeio",title:"Semeio",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]},{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"germinacao",title:"Germinação",color:"purple",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"aguardando-enxertia",title:"Aguardando Enxertia",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"sala-corte",title:"Sala de Corte",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"sala-fusao",title:"Sala de Fusão",color:"orange",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"adaptacao",title:"Adaptação",color:"yellow",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"casa-vegetacao",title:"Casa de Vegetação",color:"pink",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"expedicao",title:"Expedição",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"finalizado",title:"Finalizado",color:"green",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"cancelado",title:"Cancelado",color:"gray",cards:[]}]};function he(e){const a=e%2===0?"A2W-2025-001":"A2W-2025-002",t=e%2===0?"TG-45678":"TG-45679";return{code:a,subtitle:t,badgeLabel:"Faturado",badgeVariant:"success",badgeStyle:"soft",items:[{icon:"user",label:"João Silva"},{icon:null,label:"Vendedor: Maria Santos"},{type:"divider"},{icon:"calendar",label:"Pedido: 14/01/2025"},{icon:"package",label:"Muda de Eucalipto Clone AEC 144"},{icon:"circle",label:"Qtd: 5.000"},{icon:"calendar",label:"Entrega em: 19/02/2025"},{icon:"circle",label:"R$ 15.500,00",className:"kanban-card__item--price"}]}}const co={columns:[{id:"recebido",title:"Recebido",color:"green",cards:[he(0),he(1)]},{id:"aguardando-aprovacao",title:"Aguardando Aprovação",color:"gray",cards:[he(0),he(1)]},{id:"em-preparacao",title:"Em Preparação",color:"blue",cards:[he(0),he(1)]},{id:"em-producao",title:"Em Produção",color:"purple",cards:[he(0),he(1)]},{id:"em-expedicao",title:"Em Expedição",color:"cyan",cards:[he(0),he(1)]},{id:"em-transito",title:"Em Trânsito",color:"orange",cards:[he(0),he(1)]},{id:"finalizados",title:"Finalizados",color:"green",cards:[he(0),he(1)]},{id:"cancelado",title:"Cancelado",color:"gray",cards:[]}]},Lt={"A2W-2025-001":{companyName:"Agro Silva LTDA.",client:{codigo:"43242343",cpfCnpj:"123.456.789-00",razaoSocial:"Nome da razao social",nomeFantasia:"Nome fantasia",endereco:"Rua das Flores, 123 - São Paulo, SP",telefone:"(11) 98765-4321",email:"joao.silva@gmail.com",vendedor:"Maria Santos"},items:[{id:"item-1",product:"Eucalipto MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",availableQuantity:"1000",planning:[{type:"planned",amount:"3.000",date:"12/12/25",responsible:"Fazenda Boa Vista",quantity:"3.000"},{type:"canceled",amount:"1.000",date:"12/12/25",responsible:"Fazenda Boa Vista",quantity:"1.000"}]},{id:"item-2",product:"Eucalipto MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",availableQuantity:"1000",planning:[]}],summary:{orderDate:"14/01/2025",expectedDelivery:"19/02/2025",totalValue:"R$ 15.500,00",notes:"Cliente solicitou entrega pela manhã"}},"A2W-2025-002":{companyName:"Agro Campo LTDA.",client:{codigo:"992211",cpfCnpj:"987.654.321-00",razaoSocial:"Agro Campo Razão Social",nomeFantasia:"Agro Campo",endereco:"Av. Central, 450 - Campinas, SP",telefone:"(19) 99888-1111",email:"compras@agrocampo.com",vendedor:"Maria Santos"},items:[{id:"item-1",product:"Eucalipto MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",availableQuantity:"1000",planning:[{type:"planned",amount:"2.000",date:"10/01/26",responsible:"Fazenda Primavera",quantity:"2.000"}]},{id:"item-2",product:"Eucalipto MUD-002",quantity:"3.000",unitValue:"R$ 3,00",totalValue:"R$ 9.000,00",availableQuantity:"600",planning:[]}],summary:{orderDate:"16/01/2025",expectedDelivery:"21/02/2025",totalValue:"R$ 21.500,00",notes:"Priorizar entrega no período da tarde"}}},uo={"A2W-2025-001":{"item-1":[{id:"evt-1",title:"Lote pronto para entrega - OP-2025-002",date:"08/11/2025 às 14:35",description:"Lote de 5.000 mudas aprovado e liberado para expedição",badgeLabel:"Sucesso",badgeType:"sucesso",metaRole:"Responsável",metaName:"André Cesarni"},{id:"evt-2",title:"Vistoria de qualidade - OP-2025-002",date:"05/11/2025 às 10:15",description:"Vistoria realizada com aprovação. Taxa de germinação: 98%. Data estimada para enxertia atualizada.",badgeLabel:"Operação",badgeType:"operacao",metaRole:"Operador",metaName:"Ana Silva"},{id:"evt-3",title:"Mudança de localização - OP-2025-002",date:"20/10/2025 às 15:45",description:"Lote movido de Estufa 1 - Bancada A2 para Estufa 2 - Bancada C5",badgeLabel:"Movimentação",badgeType:"movimentacao",metaRole:"Responsável",metaName:"Pedro Almeida"},{id:"evt-4",title:"Semeio realizado - OP-2025-002",date:"15/10/2025 às 09:00",description:"Semeio de 5.000 mudas de Eucalipto Clone AEC 144 iniciado na Estufa 1",badgeLabel:"Produção",badgeType:"producao",metaRole:"Responsável",metaName:"André Santos"},{id:"evt-5",title:"Planejamento realizado - OP-2025-002",date:"16/01/2025 às 11:20",description:"Eucalipto Clone AEC 144. Quantidade: 3.000. Data de semeio: 15/10/2025. Previsão de entrega: 19/02/2025",badgeLabel:"Planejamento",badgeType:"planejamento",metaRole:"Responsável",metaName:"André Santos"},{id:"evt-6",title:"Item cancelado",date:"16/01/2025 às 11:20",description:"Eucalipto Clone AEC 144. Quantidade: 3.000",badgeLabel:"Cancelado",badgeType:"cancelado",metaRole:"Responsável",metaName:"André Santos"},{id:"evt-7",title:"Pedido recebido",date:"14/01/2025 às 09:15",description:"Pedido A2W-2025-001 recebido do cliente João Silva",badgeLabel:"Início",badgeType:"inicio",metaRole:"Vendedor",metaName:"Maria Santos"}],"item-2":[{id:"evt-8",title:"Planejamento realizado - OP-2025-003",date:"17/01/2025 às 08:45",description:"Quantidade: 2.000. Previsão de entrega: 22/02/2025",badgeLabel:"Planejamento",badgeType:"planejamento",metaRole:"Responsável",metaName:"André Santos"},{id:"evt-9",title:"Pedido recebido",date:"14/01/2025 às 09:15",description:"Item incluído no pedido A2W-2025-001",badgeLabel:"Início",badgeType:"inicio",metaRole:"Vendedor",metaName:"Maria Santos"}]},"A2W-2025-002":{"item-1":[{id:"evt-10",title:"Lote pronto para entrega - OP-2025-021",date:"09/11/2025 às 13:10",description:"Lote de 5.000 mudas aprovado e liberado para expedição",badgeLabel:"Sucesso",badgeType:"sucesso",metaRole:"Responsável",metaName:"Renata Prado"},{id:"evt-11",title:"Pedido recebido",date:"16/01/2025 às 10:05",description:"Pedido A2W-2025-002 recebido do cliente Agro Campo",badgeLabel:"Início",badgeType:"inicio",metaRole:"Vendedor",metaName:"Maria Santos"}],"item-2":[{id:"evt-12",title:"Item cancelado",date:"18/01/2025 às 15:42",description:"Cancelamento por indisponibilidade de lote",badgeLabel:"Cancelado",badgeType:"cancelado",metaRole:"Responsável",metaName:"Renata Prado"},{id:"evt-13",title:"Pedido recebido",date:"16/01/2025 às 10:05",description:"Item incluído no pedido A2W-2025-002",badgeLabel:"Início",badgeType:"inicio",metaRole:"Vendedor",metaName:"Maria Santos"}]}},Pt={"A2W-2025-001":{products:[{id:"prod-0001",code:"0001",name:"Muda de Tomate",label:"0001 - Muda de Tomate"},{id:"prod-0002",code:"0002",name:"Muda de Eucalipto",label:"0002 - Muda de Eucalipto"}],byProduct:{"prod-0001":{metrics:{total:5e3,planned:5e3,canceled:5e3,pending:0},plans:[{id:"plan-1",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"12/01/2025",deliveryDate:"12/01/2025",sowingDate:"23/12/2023",daysAfterSowing:"32 dias",responsible:"Viktor Dantas"},{id:"plan-2",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"cancelado",planningDate:"11/01/2025",deliveryDate:"11/01/2025",sowingDate:"22/12/2023",daysAfterSowing:"31 dias",responsible:"Viktor Dantas"},{id:"plan-3",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"10/01/2025",deliveryDate:"10/01/2025",sowingDate:"21/12/2023",daysAfterSowing:"30 dias",responsible:"Viktor Dantas"},{id:"plan-4",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"09/01/2025",deliveryDate:"09/01/2025",sowingDate:"20/12/2023",daysAfterSowing:"29 dias",responsible:"Viktor Dantas"},{id:"plan-5",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"cancelado",planningDate:"08/01/2025",deliveryDate:"08/01/2025",sowingDate:"19/12/2023",daysAfterSowing:"28 dias",responsible:"Viktor Dantas"},{id:"plan-6",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"07/01/2025",deliveryDate:"07/01/2025",sowingDate:"18/12/2023",daysAfterSowing:"27 dias",responsible:"Viktor Dantas"}]},"prod-0002":{metrics:{total:3e3,planned:2e3,canceled:500,pending:500},plans:[{id:"plan-7",op:"OP-2025-003",stage:"Semeio",product:"Muda de Eucalipto Clone MUD-002",quantity:1e3,status:"ativo",planningDate:"06/01/2025",deliveryDate:"15/02/2025",sowingDate:"17/12/2023",daysAfterSowing:"26 dias",responsible:"Viktor Dantas"},{id:"plan-8",op:"OP-2025-003",stage:"Semeio",product:"Muda de Eucalipto Clone MUD-002",quantity:1e3,status:"cancelado",planningDate:"05/01/2025",deliveryDate:"14/02/2025",sowingDate:"16/12/2023",daysAfterSowing:"25 dias",responsible:"Viktor Dantas"}]}}},"A2W-2025-002":{products:[{id:"prod-0001",code:"0001",name:"Muda de Tomate",label:"0001 - Muda de Tomate"}],byProduct:{"prod-0001":{metrics:{total:5e3,planned:5e3,canceled:5e3,pending:0},plans:[{id:"plan-9",op:"OP-2025-021",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"12/01/2025",deliveryDate:"18/02/2025",sowingDate:"23/12/2023",daysAfterSowing:"32 dias",responsible:"Viktor Dantas"},{id:"plan-10",op:"OP-2025-021",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"11/01/2025",deliveryDate:"17/02/2025",sowingDate:"22/12/2023",daysAfterSowing:"31 dias",responsible:"Viktor Dantas"}]}}}};let se=Z.PRODUCAO,Ue=Qa,Fe=ke.KANBAN,Va={showFinished:!1,showCanceled:!1},Sa={noGrafting:!1},po=7;function mo(e){const a=String(e).trim();if(/^\d{4}-\d{2}-\d{2}$/.test(a)){const[t,n,o]=a.split("-");return`${o}/${n}/${t}`}return a}function vo({details:e=null,item:a=null,planningData:t={}}={}){const n=String(po++).padStart(3,"0"),o=t?.serviceType||"",d=t?.row||{},s=o==="remessa-futura",r=e?.orderCode||t?.orderItem?.orderCode||"-",i=t?.orderItem?.product||a?.product||"-",v=d.quantity||"-",y=d.plannedDate||d.seedDate||"-",c=d.location||"-",u=d.responsible||"-",E=d.op||"-",p=String(v).startsWith("Qtd:")?String(v):`Qtd: ${v}`;return{code:`OP-${new Date().getFullYear()}-${n}`,subtitle:r,badgeLabel:"Enxertia",preserveCustomData:!0,items:[{icon:"user",label:s?u:`Lote ${E}`},{icon:"circle",label:i,value:p},{type:"divider"},{icon:"calendar",label:"Data planejada:",value:mo(y)},...s?[{icon:"map-pin",label:"Localização:",value:c}]:[]]}}function go({details:e=null,item:a=null,planningData:t={}}={}){const n=Qa.columns.find(d=>d?.id==="agendado");if(!n)return;const o=vo({details:e,item:a,planningData:t});n.cards=[o,...n.cards||[]],se===Z.PRODUCAO&&Ka()}function Jt(){window.alert("Nao foi possivel acessar a camera do dispositivo.")}function fo(){return(window.location.hash||"").replace("#","")==="/estufas/pedidos"?Z.PEDIDOS:Z.PRODUCAO}function Ha(e){return e===ke.LIST?ke.LIST:ke.KANBAN}function Yt(){return`kanban:view-mode:${se}`}function bo(){try{const e=sessionStorage.getItem(Yt());return Ha(e)}catch{return ke.KANBAN}}function _o(e){try{sessionStorage.setItem(Yt(),Ha(e))}catch{}}function ho(){return"kanban:orders:list-filters"}function yo(){try{const e=sessionStorage.getItem(ho()),a=e?JSON.parse(e):null;return{showFinished:!!a?.showFinished,showCanceled:!!a?.showCanceled}}catch{return{showFinished:!1,showCanceled:!1}}}function ue(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ko(){const e=document.getElementById("app-header"),a=document.querySelector(".kanban");se=fo(),Ue=se===Z.PEDIDOS?co:Qa,Fe=bo(),Va=yo(),e&&e.classList.add("header--kanban-compact-tabs"),a&&a.classList.toggle("kanban--pedidos",se===Z.PEDIDOS);let t=()=>{};const n=()=>{t(),Ka(),t=Fe===ke.KANBAN?Mo():()=>{}},o=wo({getViewMode:()=>Fe,setViewMode:c=>{const u=Ha(c),E=u!==Fe;Fe=u,E&&_o(u),n()}});n();const d=$o(),s=Vr(),r=se===Z.PEDIDOS?Er():()=>{},i=se===Z.PRODUCAO?Io():()=>{},v=se===Z.PRODUCAO?Go():()=>{},y=se===Z.PRODUCAO?er():()=>{};return()=>{e&&e.classList.remove("header--kanban-compact-tabs"),a&&a.classList.remove("kanban--pedidos"),typeof o=="function"&&o(),typeof d=="function"&&d(),typeof t=="function"&&t(),typeof s=="function"&&s(),typeof r=="function"&&r(),typeof i=="function"&&i(),typeof v=="function"&&v(),typeof y=="function"&&y()}}function wo({getViewMode:e=()=>ke.KANBAN,setViewMode:a=()=>{}}={}){const t=document.getElementById("kanban-toolbar-chips"),n=document.getElementById("kanban-title"),o=document.getElementById("kanban-qr-read-btn"),d=document.getElementById("kanban-new-btn"),s=document.getElementById("kanban-toolbar-visibility-filters"),r=document.getElementById("kanban-view-kanban-btn"),i=document.getElementById("kanban-view-list-btn"),v=["Badge","Badge","Badge"];t&&(t.innerHTML=v.map(M=>`
      <span class="kanban-chip">
        ${M}
        <svg class="kanban-chip__close" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
      </span>
    `).join("")),n&&(n.textContent=se===Z.PEDIDOS?"Gestão de Pedidos":"Gestão da Produção"),d&&(d.textContent=se===Z.PEDIDOS?"Novo Pedido":"Nova produção"),o&&(o.hidden=se===Z.PEDIDOS);let y=null,c=null;if(s)if(se===Z.PEDIDOS)s.innerHTML="",s.hidden=!0;else{const M=Rt({id:"kanban-no-grafting-toggle",size:"sm",checked:Sa.noGrafting}).replace('class="toggle-input"','class="toggle-input" data-production-filter="no-grafting"');s.innerHTML=`
        <label class="kanban-toolbar__visibility-item">
          <span>Sem Enxertia</span>
          ${M}
        </label>
      `,c=s.querySelector('input[data-production-filter="no-grafting"]'),y=T=>{Sa.noGrafting=!!T.target?.checked,a(e())},c?.addEventListener("change",y),s.hidden=!1}const u=()=>{const M=e()===ke.LIST;r?.classList.toggle("is-active",!M),i?.classList.toggle("is-active",M),r?.setAttribute("aria-pressed",String(!M)),i?.setAttribute("aria-pressed",String(M))};u();const E=()=>{a(ke.KANBAN),u()},p=()=>{a(ke.LIST),u()},$=M=>{M.target?.closest?.("button#kanban-qr-read-btn")&&(M.preventDefault(),M.stopPropagation(),Jt())};r?.addEventListener("click",E),i?.addEventListener("click",p),document.addEventListener("click",$,!0);const I=document.getElementById("kanban-back-btn"),A=()=>{window.location.hash=se===Z.PEDIDOS?"#/estufas/agenda-eventos":"#/producao"};return I&&I.addEventListener("click",A),()=>{I&&I.removeEventListener("click",A),r?.removeEventListener("click",E),i?.removeEventListener("click",p),document.removeEventListener("click",$,!0),c?.removeEventListener("change",y)}}function $o(){const e=document.getElementById("kanban-board");if(!e)return()=>{};let a=!1,t=!1,n=0,o=0,d=null,s=!1;const r=6,i=p=>p instanceof Element?!!p.closest('button, a, input, select, textarea, label, [role="button"]'):!1,v=()=>{!a&&!t||(e.classList.remove("is-dragging"),a=!1,t=!1,d=null)},y=p=>{p.button===0&&(e.classList.contains("kanban-board--list")||i(p.target)||(a=!0,t=!1,n=p.clientX,o=e.scrollLeft,d=p.pointerId))},c=p=>{if(!a||d!==p.pointerId)return;const $=p.clientX-n;!t&&Math.abs($)>=r&&(t=!0,e.classList.add("is-dragging")),t&&(e.scrollLeft=o-$,p.preventDefault())},u=p=>{!a||d!==p.pointerId||(t&&(s=!0),v())},E=p=>{s&&(s=!1,p.preventDefault(),p.stopPropagation())};return e.addEventListener("pointerdown",y),e.addEventListener("pointermove",c,{passive:!1}),e.addEventListener("pointerup",u),e.addEventListener("pointercancel",u),e.addEventListener("pointerleave",u),e.addEventListener("click",E,!0),()=>{v(),e.removeEventListener("pointerdown",y),e.removeEventListener("pointermove",c),e.removeEventListener("pointerup",u),e.removeEventListener("pointercancel",u),e.removeEventListener("pointerleave",u),e.removeEventListener("click",E,!0)}}function Ka(){const e=document.getElementById("kanban-board");if(e){if(e.innerHTML="",e.classList.toggle("kanban-board--list",Fe===ke.LIST),Fe===ke.LIST){Co(e);return}So(e)}}function So(e){if(!e)return;(se===Z.PRODUCAO&&Sa.noGrafting?Ue.columns.filter(t=>Ut.has(t?.id)):Ue.columns).forEach(t=>{const n=xn({id:t.id,title:t.title,color:t.color,count:t.cards.length});e.insertAdjacentHTML("beforeend",n),t.cards.length>0?t.cards.forEach((d,s)=>{const r=an(d,t.id,s),i=Bn(r);Mn(t.id,i)}):Tn(t.id);const o=document.querySelector(`[data-column-id="${t.id}"]`);if(o){const d=o.querySelector(".kanban-column__header"),s=Nn({id:`picker-${t.id}`,selected:t.color});d.style.position="relative",d.insertAdjacentHTML("beforeend",s)}})}function Co(e){const a=se===Z.PRODUCAO&&Sa.noGrafting?Ue.columns.filter(o=>Ut.has(o?.id)):Ue.columns,n=(se===Z.PEDIDOS?a.filter(o=>!(!Va.showFinished&&(o.id==="finalizados"||o.id==="finalizado")||!Va.showCanceled&&o.id==="cancelado")):a).flatMap(o=>o.cards.map((d,s)=>Eo(o,d,s)));e.innerHTML=`
    <section class="kanban-list-view ${se===Z.PEDIDOS?"kanban-list-view--orders":"kanban-list-view--production"}" data-kanban-list-view>
      <div class="kanban-list-view__rows">
        ${n.join("")}
      </div>
    </section>
  `}function Eo(e,a,t){const n=an(a,e.id,t),o=Po({columnData:e,cardData:n,mode:se});return se===Z.PEDIDOS?Do(e,o):qo(e,o)}function Zt(e){return{recebido:"light","aguardando-aprovacao":"light","em-preparacao":"info","em-producao":"warning","em-expedicao":"primary","em-transito":"primary",finalizados:"success",finalizado:"success",cancelado:"error"}[e]||"light"}function Do(e,a){return`
    <article class="kanban-list-row kanban-card" data-column-id="${ue(e.id)}" style="--list-item-accent:${ue(a.accentColor||"var(--color-primary)")}">
      <span class="kanban-list-row__column-title kanban-column__title" hidden>${ue(e.title||"")}</span>
      <div class="kanban-list-row__main">
        <div class="kanban-list-row__cell kanban-list-row__cell--title">
          <a href="#" class="kanban-card__code kanban-list-row__title" style="color:${ue(a.accentColor||"var(--color-primary)")}">${ue(a.title)}</a>
          <span class="kanban-card__subtitle">${ue(a.subtitle)}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--type">
          ${a.type?Ie({text:a.type,variant:"success",style:"soft",size:"sm"}):""}
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${h("user",{size:14})}
          <span>${ue(a.clientValue||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${h("calendar",{size:14})}
          <span>${ue(a.date1||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${h("calendar",{size:14})}
          <span>${ue(a.date2||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${h("package",{size:14})}
          <span>${ue(a.qty||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta kanban-list-row__meta--value">
          ${h("circle",{size:12})}
          <strong>${ue(a.amount||"-")}</strong>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__status-cell">
        ${Ie({text:a.status||"-",variant:Zt(e.id),style:"soft",size:"sm"})}
        </div>
      </div>
    </article>
  `}function qo(e,a){return`
    <article class="kanban-list-row kanban-card" data-column-id="${ue(e.id)}" style="--list-item-accent:${ue(a.accentColor||"var(--color-primary)")}">
      <span class="kanban-list-row__column-title kanban-column__title" hidden>${ue(e.title||"")}</span>
      <div class="kanban-list-row__main">
        <div class="kanban-list-row__cell kanban-list-row__cell--title">
          <a href="#" class="kanban-card__code kanban-list-row__title" style="color:${ue(a.accentColor||"var(--color-primary)")}">${ue(a.title)}</a>
          <span class="kanban-card__subtitle">${ue(a.subtitle)}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--type">
          ${a.type?Ie({text:a.type,variant:"light",style:"soft",size:"sm"}):""}
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${h("user",{size:14})}
          <span>${ue(a.clientLabel?`${a.clientLabel} ${a.clientValue}`.trim():a.clientValue||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${h("calendar",{size:14})}
          <span>${ue(a.date1||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${h("calendar",{size:14})}
          <span>${ue(a.date2||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${h("package",{size:14})}
          <span>${ue(a.qty||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__status-cell">
        ${Ie({text:a.status||"-",variant:Zt(e.id),style:"soft",size:"sm"})}
        </div>
      </div>
    </article>
  `}function Xt(e){const n=String(e||"").match(/[\d.]+/)?.[0]||"-";return n==="-"?"-":`${n} un`}function Lo(e){return String(e).trim()||"-"}function en(e=""){const a=String(e||"").trim().toLowerCase();return a?a.startsWith("var(")||a.startsWith("#")||a.startsWith("rgb(")||a.startsWith("rgba(")||a.startsWith("hsl(")||a.startsWith("hsla(")?e:{cyan:"rgb(6 182 212)",green:"rgb(34 197 94)",blue:"rgb(59 130 246)",indigo:"rgb(99 102 241)",slate:"rgb(100 116 139)",purple:"rgb(168 85 247)",yellow:"rgb(234 179 8)",pink:"rgb(236 72 153)",red:"rgb(239 68 68)",orange:"rgb(249 115 22)",gray:"rgb(100 116 139)"}[a]||"var(--color-primary)":"var(--color-primary)"}function Po({columnData:e,cardData:a,mode:t}){return t===Z.PEDIDOS?Ao({columnData:e,cardData:a}):xo({columnData:e,cardData:a})}function Ao({columnData:e,cardData:a}){const t=Array.isArray(a?.items)?a.items:[],n=t.filter(s=>s?.icon==="calendar"),o=t.find(s=>s?.icon==="circle"&&/^Qtd:/i.test(String(s?.label||""))),d=t.find(s=>s?.className?.includes("price"));return{title:a?.code||"-",subtitle:a?.subtitle||"-",type:a?.badgeLabel||"",clientLabel:"Cliente",clientValue:t[0]?.label||"-",date1:n[0]?.value||"-",date2:n[1]?.value||"-",qty:Xt(o?.label||o?.value||"-"),amount:Lo(d?.label||d?.value||"-"),status:e?.title||"-",accentColor:en(e?.color)}}function xo({columnData:e,cardData:a}){const t=Array.isArray(a?.items)?a.items:[],n=t.filter(r=>r?.icon==="calendar"),o=t[0]||{},d=t.find(r=>r?.icon==="circle"&&r?.label&&!r?.value)||{},s=t.find(r=>r?.icon==="circle"&&r?.value)||{};return{title:a?.code||"-",subtitle:a?.subtitle||d?.label||"-",type:a?.badgeLabel||"",clientLabel:o?.value?(o?.label||"").trim():"",clientValue:o?.value||o?.label||"-",date1:n[0]?.value||"-",date2:n[1]?.value||"-",qty:Xt(s?.value||s?.label||"-"),amount:"",status:e?.title||"-",accentColor:en(e?.color)}}function Mo(){const e=[];Ue.columns.forEach(t=>{const n=document.querySelector(`[data-column-settings="${t.id}"]`),o=document.getElementById(`picker-${t.id}`);if(!n||!o)return;const d=s=>{s.stopPropagation(),document.querySelectorAll("[data-color-picker]").forEach(r=>{r!==o&&Ta(r)}),On(o)};n.addEventListener("click",d),e.push({settingsBtn:n,handleSettingsClick:d}),Fn(o,s=>{In(t.id,s);const r=Ue.columns.find(i=>i?.id===t.id);r&&(r.color=s),Fe===ke.LIST&&Ka()})});const a=t=>{const n=t.target.closest("[data-color-picker]"),o=t.target.closest("[data-column-settings]");!n&&!o&&document.querySelectorAll("[data-color-picker]").forEach(d=>{Ta(d)})};return document.addEventListener("click",a),()=>{e.forEach(({settingsBtn:t,handleSettingsClick:n})=>{t.removeEventListener("click",n)}),document.removeEventListener("click",a)}}function an(e,a,t){return se===Z.PEDIDOS?{...e,badgeVariant:e.badgeVariant||"success",badgeStyle:e.badgeStyle||"soft",subtitle:e.subtitle||"",items:e.items||[]}:a==="aguardando-aprovacao"&&t===0?{...e,badgeLabel:"Normal",badgeVariant:"soft-info",subtitle:"",items:[{icon:"file",label:"Cód. do Cliente:",value:"001"},{icon:"user",label:"Fazenda Sol Nascente"},{type:"divider"},{icon:"calendar",label:"Data Abertura OP:",value:"14/01/2025"},{icon:"circle",label:"001 - Produto 1"},{icon:"circle",label:"Qtd:",value:"5.000"},{icon:"calendar",label:"Data Entrada:",value:"19/02/2025"},{icon:"calendar",label:"Previsão Saída:",value:"19/02/2025"}]}:e?.preserveCustomData?{...e,badgeVariant:e.badgeVariant||"light",subtitle:e.subtitle||"",items:Array.isArray(e.items)?e.items:[]}:{...e,badgeVariant:e.badgeVariant||"light",subtitle:e.subtitle||"TG-45678",items:zo(a)}}function zo(e){const a=[{icon:"user",label:"Fazenda Sol Nascente"},{type:"divider"},{icon:"calendar",label:"Pedido:",value:"14/01/2025"},{icon:"circle",label:"Tomate Cereja - Lote 123"},{icon:"circle",label:"Qtd:",value:"5.000"},{icon:"calendar",label:"Início:",value:"19/02/2025"}];return e==="semeio"&&(a[2]={icon:"calendar",label:"Data semeio:",value:"14/01/2025"},a[5]={icon:"map-pin",label:"Localização:",value:"Estufa 1"}),e==="germinacao"&&(a[2]={icon:"calendar",label:"Data semeio:",value:"14/01/2025"},a[5]={icon:"calendar",label:"Dias após semeio:",value:"14"},a.push({icon:"map-pin",label:"Localização:",value:"Estufa 1"})),a}function Io(){const e=document.getElementById("kanban-new-btn");if(!e)return()=>{};const a="kanban-new-production-drawer",t=document.querySelector(`[data-drawer="${a}"]`),n=document.querySelector(`[data-drawer-backdrop="${a}"]`);t&&t.remove(),n&&n.remove();const o=Ee({id:a,title:"Nova produção",width:540,content:Vo(),footer:Qo()});document.body.insertAdjacentHTML("beforeend",o);const d=De({id:a,root:document}),s=document.querySelector(`[data-drawer="${a}"]`);if(!s||!d)return()=>{};const r=ye(s),i=s.querySelector(".drawer__header"),v=s.querySelector(".new-production-drawer__status-wrap"),y=i?.querySelector("[data-drawer-close]");i&&v&&y&&(v.classList.add("is-in-header"),i.insertBefore(v,y));const c=s.querySelector("#new-production-origin");c&&c.setAttribute("data-drawer-autofocus","");const u="kanban-schedule-modal",E="kanban-reschedule-modal",p="kanban-tags-modal";let $=()=>{},I=null,A=Je(),M=()=>{},T=null,B=()=>{},f=null;const G=()=>{d.open(e)},O=({restoreFocus:S=!0}={})=>{j({restoreFocus:!1});const k=document.querySelector(`[data-modal="${u}"]`),C=document.querySelector(`[data-modal-backdrop="${u}"]`);!k||!C||($(),we(u),s.classList.contains("is-open")&&(document.body.style.overflow="hidden"),k.remove(),C.remove(),S&&I&&typeof I.focus=="function"&&I.focus(),I=null)},j=({restoreFocus:S=!0}={})=>{const k=document.querySelector(`[data-modal="${E}"]`),C=document.querySelector(`[data-modal-backdrop="${E}"]`);!k||!C||(M(),we(E),(s.classList.contains("is-open")||document.querySelector(`[data-modal="${u}"]`))&&(document.body.style.overflow="hidden"),k.remove(),C.remove(),S&&T?.focus&&T.focus(),T=null)},U=({anchorEl:S=null,initialValues:k={}}={})=>{document.querySelector(`[data-modal="${E}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${E}"]`)?.remove();const C={date:k.date||Ve(A.selectedDate),location:k.location||"",responsible:k.responsible||""};T=S,document.body.insertAdjacentHTML("beforeend",dn({modalId:E,values:C}));const q=document.querySelector(`[data-modal="${E}"]`),z=document.querySelector(`[data-modal-backdrop="${E}"]`);if(!q||!z)return;const w=ye(q),g=q.querySelector("#reschedule-date"),x=q.querySelector("#reschedule-location"),N=q.querySelector("#reschedule-responsible"),K=q.querySelector("[data-reschedule-error]"),H=q.querySelector("[data-modal-close]"),R=q.querySelector('[data-reschedule-action="cancel"]'),me=q.querySelector('[data-reschedule-action="confirm"]'),ne=()=>{K&&(K.hidden=!0),[g,x,N].forEach(Y=>{Y?.closest(".field")?.classList.remove("field--error")})},de=()=>{ne();const Y=[];return g?.value||Y.push(g),x?.value?.trim()||Y.push(x),N?.value?.trim()||Y.push(N),Y.length?(Y.forEach(qe=>qe?.closest(".field")?.classList.add("field--error")),K&&(K.hidden=!1),Y[0]?.focus?.(),!1):!0},be=()=>j(),Q=Y=>{Y.target===z&&j()},te=Y=>{Y.key==="Escape"&&(Y.preventDefault(),Y.stopPropagation(),j())},ve=()=>{de()&&(console.log("Reagendar confirmado",{data:g?.value||"",localizacao:x?.value?.trim()||"",responsavel:N?.value?.trim()||""}),j())};H?.addEventListener("click",be),R?.addEventListener("click",be),me?.addEventListener("click",ve),z.addEventListener("click",Q),document.addEventListener("keydown",te,!0),[g,x,N].forEach(Y=>{Y?.addEventListener("input",ne)}),M=()=>{H?.removeEventListener("click",be),R?.removeEventListener("click",be),me?.removeEventListener("click",ve),z.removeEventListener("click",Q),document.removeEventListener("keydown",te,!0),[g,x,N].forEach(Y=>{Y?.removeEventListener("input",ne)}),typeof w=="function"&&w(),M=()=>{}},$e(E),setTimeout(()=>{g?.focus&&g.focus()},120)},ce=()=>{const S=s.querySelector("#new-production-scheduling-date");S&&(S.value=Ve(A.selectedDate),S.dispatchEvent(new Event("input",{bubbles:!0})))},L=S=>{const k=document.querySelector(`[data-modal="${u}"]`),C=document.querySelector(`[data-modal-backdrop="${u}"]`);k&&k.remove(),C&&C.remove(),A=Je(),I=S||null,document.body.insertAdjacentHTML("beforeend",Ua({modalId:u,state:A}));const q=document.querySelector(`[data-modal="${u}"]`),z=document.querySelector(`[data-modal-backdrop="${u}"]`);if(!q||!z)return;const w=q.querySelector("#schedule-location-select"),g=q.querySelector("[data-modal-close]"),x=()=>O(),N=R=>{R.target===z&&O()},K=R=>{R.key==="Escape"&&(document.querySelector(`[data-modal="${E}"]`)||(R.preventDefault(),R.stopPropagation(),O()))},H=R=>{const me=R.target.closest("[data-schedule-action]");if(me){const te=me.dataset.scheduleAction;if(te==="back"){O();return}if(te==="select-date"){ce(),O();return}}const ne=R.target.closest("[data-schedule-view]");if(ne){A.viewMode=ne.dataset.scheduleView==="month"?"month":"week",A.viewMode==="month"&&(A.currentDate=Ce(A.selectedDate)),Se(q,A);return}const de=R.target.closest("[data-schedule-nav]");if(de){const te=de.dataset.scheduleNav==="prev"?-1:1;A.viewMode==="month"?A.currentDate=Wa(A.currentDate,te):(A.selectedDate=Ye(A.selectedDate,te*7),A.currentDate=Ce(A.selectedDate)),Se(q,A);return}const be=R.target.closest("[data-schedule-date]");if(be){const te=Ga(be.dataset.scheduleDate);if(!te)return;A.selectedDate=te,A.currentDate=Ce(te),Se(q,A);return}const Q=R.target.closest("[data-schedule-reagendar]");Q&&U({anchorEl:Q,initialValues:{date:Ve(A.selectedDate),location:w?.value||"",responsible:""}})};z.addEventListener("click",N),q.addEventListener("click",H),g&&g.addEventListener("click",x),document.addEventListener("keydown",K,!0),$=()=>{z.removeEventListener("click",N),q.removeEventListener("click",H),g&&g.removeEventListener("click",x),document.removeEventListener("keydown",K,!0),$=()=>{}},$e(u),Se(q,A),w&&typeof w.focus=="function"&&setTimeout(()=>w.focus(),140)},l=({restoreFocus:S=!0}={})=>{const k=document.querySelector(`[data-modal="${p}"]`),C=document.querySelector(`[data-modal-backdrop="${p}"]`);!k||!C||(B(),we(p),s.classList.contains("is-open")&&(document.body.style.overflow="hidden"),k.remove(),C.remove(),S&&f?.focus&&f.focus(),f=null)},b=S=>{document.querySelector(`[data-modal="${p}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${p}"]`)?.remove(),f=S||null,document.body.insertAdjacentHTML("beforeend",jo({modalId:p}));const k=document.querySelector(`[data-modal="${p}"]`),C=document.querySelector(`[data-modal-backdrop="${p}"]`);if(!k||!C)return;const q=k.querySelector("[data-new-production-tags-search]"),z=k.querySelector("[data-modal-close]"),w=()=>l(),g=K=>{K.target===C&&l()},x=K=>{K.key==="Escape"&&(K.preventDefault(),K.stopPropagation(),l())},N=K=>{const H=K.target.closest("[data-new-production-tags-action]");if(!H)return;const R=H.dataset.newProductionTagsAction;if(R==="cancel"||R==="save"){l();return}R==="remove"&&H.closest(".new-production-tags-modal__chip")?.remove()};C.addEventListener("click",g),k.addEventListener("click",N),z?.addEventListener("click",w),document.addEventListener("keydown",x,!0),B=()=>{C.removeEventListener("click",g),k.removeEventListener("click",N),z?.removeEventListener("click",w),document.removeEventListener("keydown",x,!0),B=()=>{}},$e(p),q?.focus&&setTimeout(()=>q.focus(),120)},m=S=>{const k=S.target.closest("[data-new-production-action]");if(!k)return;const C=k.dataset.newProductionAction;if(C==="cancel"){l({restoreFocus:!1}),d.close();return}if(C==="consult-agenda"){L(k);return}if(C==="open-tags"){b(k);return}const q=s.querySelector("[data-new-production-form]");if(q){if(C==="clear"){Ho(q);return}if(C==="save"){console.log("Salvar nova produção",xt(q));return}if(C==="create-op"){if(!Ko(q))return;console.log("Criar OP",xt(q))}}};return e.addEventListener("click",G),s.addEventListener("click",m),()=>{O({restoreFocus:!1}),l({restoreFocus:!1}),e.removeEventListener("click",G),s.removeEventListener("click",m),typeof r=="function"&&r(),d.cleanup&&d.cleanup();const S=document.querySelector(`[data-drawer="${a}"]`),k=document.querySelector(`[data-drawer-backdrop="${a}"]`);S&&S.remove(),k&&k.remove()}}function Je(){const e=new Date(2026,0,14);return{selectedDate:e,currentDate:e,viewMode:"week"}}function Ce(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function Ve(e){const a=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${t}-${n}`}function Ga(e){if(!e||typeof e!="string")return null;const[a,t,n]=e.split("-").map(Number);return[a,t,n].some(Number.isNaN)?null:new Date(a,t-1,n)}function To(e,a){return!e||!a?!1:e.getFullYear()===a.getFullYear()&&e.getMonth()===a.getMonth()&&e.getDate()===a.getDate()}function tn(e){const a=Ce(e);return a.setDate(a.getDate()-a.getDay()),a}function Ye(e,a){const t=Ce(e);return t.setDate(t.getDate()+a),t}function Wa(e,a){const t=Ce(e);return t.setMonth(t.getMonth()+a),t}function nn(e){return`${["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][e.getMonth()]} ${e.getFullYear()}`}function on(e){const a=tn(e),t=Ye(a,6),n=nn(t).replace(` ${t.getFullYear()}`,"");return`${String(a.getDate()).padStart(2,"0")} - ${String(t.getDate()).padStart(2,"0")} de ${n} ${t.getFullYear()}`}function Bo(e){return e.getFullYear()!==2026||e.getMonth()!==0?"":new Set([12,13,14,15,16]).has(e.getDate())?"15.000":""}function rn({date:e,selectedDate:a,currentMonth:t=null}){const n=Ve(e),o=To(e,a),d=t!==null&&e.getMonth()!==t,s=Bo(e);return`
    <button type="button" class="schedule-modal__day${o?" is-selected":""}${d?" is-outside-month":""}" data-schedule-date="${n}">
      <span class="schedule-modal__day-number">${e.getDate()}</span>
      <span class="schedule-modal__day-qty">${s}</span>
    </button>
  `}function Ro(e){const a=tn(e.selectedDate);return`
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--week">${Array.from({length:7},(n,o)=>rn({date:Ye(a,o),selectedDate:e.selectedDate})).join("")}</div>
  `}function No(e){const a=new Date(e.currentDate.getFullYear(),e.currentDate.getMonth(),1),t=Ye(a,-a.getDay());return`
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--month">${Array.from({length:42},(o,d)=>rn({date:Ye(t,d),selectedDate:e.selectedDate,currentMonth:a.getMonth()})).join("")}</div>
  `}function sn(e){const a=e.viewMode==="month"?"schedule-modal__calendar-grid--month":"schedule-modal__calendar-grid--week",t=e.viewMode==="month"?No(e):Ro(e);return`<div class="schedule-modal__calendar-grid ${a}">${t}</div>`}function Se(e,a){if(!e||!a)return;const t=e.querySelector("[data-schedule-period]");t&&(t.textContent=a.viewMode==="month"?nn(a.currentDate):on(a.selectedDate));const n=e.querySelector("[data-schedule-calendar]");n&&(n.classList.toggle("schedule-modal__calendar--month",a.viewMode==="month"),n.classList.toggle("schedule-modal__calendar--week",a.viewMode==="week"),n.innerHTML=sn(a)),e.querySelectorAll("[data-schedule-view]").forEach(d=>{d.classList.toggle("is-active",d.dataset.scheduleView===a.viewMode)});const o=e.querySelector("[data-schedule-day-title]");o&&(o.textContent=`Agendamentos para o dia ${a.selectedDate.getDate()}`)}function Ua(e={}){const{modalId:a="kanban-schedule-modal",state:t=Je()}=e;return Pe({id:a,title:"Agendamento",size:"xl",className:"schedule-modal",body:Fo(t),footer:Oo()})}function Fo(e){return`
    <div class="schedule-modal__content">
      ${le({id:"schedule-location-select",label:"Selecionar localização",required:!0,placeholder:"Selecionar...",items:[{label:"Estufa 1",value:"estufa-1"},{label:"Estufa 2",value:"estufa-2"}]})}

      <div class="schedule-modal__period-row">
        <span class="schedule-modal__period-text" data-schedule-period>${on(e.selectedDate)}</span>
        <div class="schedule-modal__period-nav">
          <button type="button" class="schedule-modal__icon-btn" data-schedule-nav="prev" aria-label="Periodo anterior">${h("chevron-left",{size:14})}</button>
          <button type="button" class="schedule-modal__icon-btn" data-schedule-nav="next" aria-label="Proximo periodo">${h("chevron-right",{size:14})}</button>
        </div>
      </div>

      <div class="schedule-modal__view-toggle">
        <button type="button" class="schedule-modal__view-btn ${e.viewMode==="month"?"is-active":""}" data-schedule-view="month">Mês</button>
        <button type="button" class="schedule-modal__view-btn ${e.viewMode==="week"?"is-active":""}" data-schedule-view="week">Semana</button>
      </div>

      <div class="schedule-modal__calendar schedule-modal__calendar--week" data-schedule-calendar>
        ${sn(e)}
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
  `}function Oo(){return`
    <div class="schedule-modal__footer">
      ${P({text:"Voltar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-schedule-action="back"')}
      ${P({text:"Selecionar data",variant:"primary",size:"sm"}).replace("<button",'<button data-schedule-action="select-date"')}
    </div>
  `}function dn(e={}){const{modalId:a="kanban-reschedule-modal",values:t={}}=e,n=D({id:"reschedule-date",type:"date",label:"Data",required:!0,value:t.date||"",className:"reschedule-modal__date-field"}),o=D({id:"reschedule-location",label:"Localização",required:!0,placeholder:"Nome da localização",value:t.location||""}),d=D({id:"reschedule-responsible",label:"Responsável",required:!0,placeholder:"Nome do responsável",value:t.responsible||""}),s=P({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-reschedule-action="cancel"'),r=P({text:"Confirmar",variant:"primary",size:"sm"}).replace("<button",'<button data-reschedule-action="confirm"');return Pe({id:a,title:"Agendamento",size:"sm",className:"reschedule-modal",body:`
      <div class="reschedule-modal__content">
        ${n}
        ${o}
        ${d}
        <span class="reschedule-modal__error" data-reschedule-error hidden>Preencha todos os campos obrigatórios.</span>
      </div>
    `,footer:`
      <div class="reschedule-modal__footer">
        ${s}
        ${r}
      </div>
    `})}function Vo(){return`
    <section class="new-production-drawer">
      <div class="new-production-drawer__status-wrap">
        <span class="new-production-drawer__status">Aguardando Aprovação</span>
      </div>

      <div class="new-production-drawer__scroll">
        <form class="new-production-form" data-new-production-form novalidate>
          <section class="new-production-section">
            <h3 class="new-production-section__title">${h("file",{size:14})}Informações da Produção</h3>
            <div class="new-production-card">
              ${le({id:"new-production-origin",label:"Origem",required:!0,value:"producao-propria",items:[{label:"Produção própria",value:"producao-propria"}]})}

              <div class="new-production-grid new-production-grid--two">
                ${D({id:"new-production-erp",label:"Código ERP",required:!0,placeholder:"Código ERP"})}
                ${D({id:"new-production-cpf-cnpj",label:"CPF/CNPJ",required:!0,placeholder:"Produção própria"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${D({id:"new-production-business-name",label:"Razão Social/Nome",required:!0,placeholder:"Classe"})}
                ${D({id:"new-production-fantasy-name",label:"Nome Fantasia/Apelido",required:!0,placeholder:"EX: MUD-1"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${D({id:"new-production-responsible",label:"Responsável",required:!0,placeholder:"Digite nome da classe"})}
                ${D({id:"new-production-class",label:"Classe",required:!0,placeholder:"EX: MUD-1"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${D({id:"new-production-product-code",label:"Cód. do Produto",required:!0,placeholder:"EX: MUD-1"})}
                ${D({id:"new-production-product",label:"Produto",required:!0,placeholder:"Nome do produto"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${D({id:"new-production-quantity",label:"Quantidade",required:!0,placeholder:"Nome do responsável"})}
                ${D({id:"new-production-location",label:"Localização",required:!0,placeholder:"Digite a localização"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${D({id:"new-production-scheduling-date",type:"date",label:"Data de Agendamento Semeio",required:!0,className:"new-production-date-field",iconRight:h("calendar",{size:16})})}
                <div class="new-production-agenda-btn-wrap">
                  ${P({text:"+ Consultar agenda",variant:"outline-dark"}).replace("<button",'<button data-new-production-action="consult-agenda"')}
                </div>
              </div>

              <div class="new-production-type">
                <div class="new-production-chip-row">
                  ${xe({label:"Enxertia",value:"enxertia",selected:!0,size:"sm"})}
                </div>
              </div>

              ${D({id:"new-production-notes",type:"textarea",label:"Observações",required:!0,rows:2})}

              <div class="new-production-tags">
                <span class="new-production-field-label">Etiqueta</span>
                <div class="new-production-chip-row new-production-chip-row--tags">
                  ${xe({label:"Normal",value:"normal",size:"sm",className:"new-production-chip--normal"})}
                  ${xe({label:"Prioritário",value:"prioritario",size:"sm",className:"new-production-chip--prioritario"})}
                  ${xe({label:"Urgente",value:"urgente",size:"sm",className:"new-production-chip--urgente"})}
                  ${xe({label:"+ Adicionar etiqueta",value:"add-tag",size:"sm"}).replace("<button",'<button data-new-production-action="open-tags"')}
                </div>
              </div>

              <div class="new-production-actions">
                <button type="button" class="new-production-clear-link" data-new-production-action="clear">Limpar campos</button>
                ${P({text:"Salvar",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-action="save"')}
              </div>
            </div>
          </section>

          <section class="new-production-section">
            <h3 class="new-production-section__title">${h("settings",{size:14})}Informações para Semeio</h3>

            <div class="new-production-subsection">
              <h4 class="new-production-subsection__title">Enxerto</h4>
              ${At()}
            </div>

            <div class="new-production-subsection">
              <h4 class="new-production-subsection__title">Porta-enxerto</h4>
              ${At()}
            </div>
          </section>
        </form>
      </div>
    </section>
  `}function jo(e={}){const{modalId:a="kanban-tags-modal"}=e,t=P({text:"Cancelar",style:"text",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-tags-action="cancel"'),n=P({text:"Salvar",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-tags-action="save"');return Pe({id:a,title:"Etiquetas",size:"sm",className:"new-production-tags-modal",body:`
      <div class="new-production-tags-modal__content">
        <div class="new-production-tags-modal__search">
          <input type="text" class="new-production-tags-modal__input" placeholder="Buscar etiquetas" data-new-production-tags-search />
          <span class="new-production-tags-modal__search-icon" aria-hidden="true">${h("search",{size:14})}</span>
        </div>
        <div class="new-production-tags-modal__create">
          <input type="text" class="new-production-tags-modal__input" placeholder="Nova etiqueta" />
          <button type="button" class="new-production-tags-modal__add-btn">Adicionar ${h("arrow-right",{size:14})}</button>
        </div>
        <div class="new-production-tags-modal__group">
          <div class="new-production-tags-modal__group-title">
            <span class="new-production-tags-modal__group-icon" aria-hidden="true">${h("filter",{size:14})}</span>
            <span>Etiquetas</span>
          </div>
          <div class="new-production-tags-modal__chips">
            <div class="new-production-tags-modal__chip">
              <span class="new-production-tags-modal__dot new-production-tags-modal__dot--blue" aria-hidden="true"></span>
              <span>Em trajeto</span>
              <button type="button" class="new-production-tags-modal__chip-remove" data-new-production-tags-action="remove" aria-label="Remover etiqueta">${h("close",{size:12})}</button>
            </div>
            <div class="new-production-tags-modal__chip">
              <span class="new-production-tags-modal__dot new-production-tags-modal__dot--green" aria-hidden="true"></span>
              <span>Faturado</span>
              <button type="button" class="new-production-tags-modal__chip-remove" data-new-production-tags-action="remove" aria-label="Remover etiqueta">${h("close",{size:12})}</button>
            </div>
          </div>
        </div>
      </div>
    `,footer:`
      <div class="new-production-tags-modal__footer">
        ${t}
        ${n}
      </div>
    `})}function At(){return`
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
  `}function Qo(){return`
    <div class="new-production-footer">
      ${P({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-new-production-action="cancel"')}
      ${P({text:"Criar OP",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-action="create-op"')}
    </div>
  `}function Ho(e){if(!e)return;e.querySelectorAll("input, select, textarea").forEach(t=>{if(t.tagName.toLowerCase()==="select"){t.selectedIndex=0;return}if(t.type==="date"){t.value="";return}t.value=""})}function xt(e){const a={};return e&&new FormData(e).forEach((n,o)=>{a[o]=n}),a}function Ko(e){if(!e)return!1;const a=e.querySelectorAll("[required]");let t=null;return a.forEach(n=>{(n.value||"").trim()||t||(t=n)}),t?(typeof t.focus=="function"&&t.focus(),!1):!0}function Go(){const e=document.getElementById("kanban-board");if(!e)return()=>{};const a="kanban-scheduling-drawer",t=document.querySelector(`[data-drawer="${a}"]`),n=document.querySelector(`[data-drawer-backdrop="${a}"]`);t&&t.remove(),n&&n.remove();const o=Ee({id:a,title:"OP-2025-006",width:540,content:Wo(),footer:Yo()});document.body.insertAdjacentHTML("beforeend",o);const d=De({id:a,root:document}),s=document.querySelector(`[data-drawer="${a}"]`);if(!s||!d)return()=>{};const r=ye(s),i=s.querySelector("#scheduling-tabs")?.closest("[data-tabs]"),v=i?.querySelector('.tabs-tab[data-tab="0"]');v&&v.setAttribute("data-drawer-autofocus","");const y="kanban-schedule-modal-scheduling";let c=Je(),u=()=>{},E=null;const p=({restoreFocus:T=!0}={})=>{const B=document.querySelector(`[data-modal="${y}"]`),f=document.querySelector(`[data-modal-backdrop="${y}"]`);!B||!f||(u(),we(y),s.classList.contains("is-open")&&(document.body.style.overflow="hidden"),B.remove(),f.remove(),T&&E?.focus&&E.focus(),E=null)},$=T=>{document.querySelector(`[data-modal="${y}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${y}"]`)?.remove(),c=Je(),E=T||null,document.body.insertAdjacentHTML("beforeend",Ua({modalId:y,state:c}));const B=document.querySelector(`[data-modal="${y}"]`),f=document.querySelector(`[data-modal-backdrop="${y}"]`);if(!B||!f)return;const G=B.querySelector("#schedule-location-select"),O=B.querySelector("[data-modal-close]"),j=()=>p(),U=l=>{l.target===f&&p()},ce=l=>{l.key==="Escape"&&(l.preventDefault(),l.stopPropagation(),p())},L=l=>{const b=l.target.closest("[data-schedule-action]");if(b){const C=b.dataset.scheduleAction;if(C==="back"){p();return}if(C==="select-date"){const q=s.querySelector("#scheduling-date-input");q&&(q.value=Ve(c.selectedDate),q.dispatchEvent(new Event("input",{bubbles:!0}))),p();return}}const m=l.target.closest("[data-schedule-view]");if(m){c.viewMode=m.dataset.scheduleView==="month"?"month":"week",c.viewMode==="month"&&(c.currentDate=Ce(c.selectedDate)),Se(B,c);return}const S=l.target.closest("[data-schedule-nav]");if(S){const C=S.dataset.scheduleNav==="prev"?-1:1;c.viewMode==="month"?c.currentDate=Wa(c.currentDate,C):(c.selectedDate=Ye(c.selectedDate,C*7),c.currentDate=Ce(c.selectedDate)),Se(B,c);return}const k=l.target.closest("[data-schedule-date]");if(k){const C=Ga(k.dataset.scheduleDate);if(!C)return;c.selectedDate=C,c.currentDate=Ce(C),Se(B,c)}};f.addEventListener("click",U),B.addEventListener("click",L),O?.addEventListener("click",j),document.addEventListener("keydown",ce,!0),u=()=>{f.removeEventListener("click",U),B.removeEventListener("click",L),O?.removeEventListener("click",j),document.removeEventListener("keydown",ce,!0),u=()=>{}},$e(y),Se(B,c),G?.focus&&setTimeout(()=>G.focus(),120)},I=T=>{const B=T.target.closest(".kanban-card");if(B&&e.contains(B)){const j=B.closest("[data-column-id]");if(!j||j.dataset.columnId!=="aguardando-aprovacao")return;T.target.closest(".kanban-card__code")&&T.preventDefault(),d.open(B);return}const f=T.target.closest(".kanban-column__title");if(!f||!e.contains(f))return;const G=f.closest("[data-column-id]");if(!G||G.dataset.columnId!=="aguardando-aprovacao")return;const O=Array.from(G.querySelectorAll(".kanban-card")).find(j=>j.offsetParent!==null&&!j.hasAttribute("hidden"))||G.querySelector(".kanban-card");O&&d.open(O)},A=T=>{if(!i)return;const B=T.target.closest(".tabs-tab");if(!B||!i.contains(B))return;const f=Number(B.dataset.tab);if(Number.isNaN(f))return;const G=i.querySelectorAll(".tabs-tab"),O=i.parentElement?.querySelectorAll(".tabs-panel");G.forEach((j,U)=>{j.classList.toggle("is-active",U===f),j.setAttribute("aria-selected",String(U===f))}),O&&O.forEach((j,U)=>{j.classList.toggle("is-active",U===f)})},M=T=>{const B=T.target.closest("[data-scheduling-action]");if(!B)return;const f=B.dataset.schedulingAction;if(f==="cancel"){d.close();return}if(f==="consult-agenda"){$(B);return}if(f!=="schedule")return;const G=s.querySelector("#scheduling-date-input"),O=s.querySelector("#scheduling-responsible-input");console.log({dataAgendamentoSemeio:G?.value||"",responsavelColetaSemente:O?.value||""})};return e.addEventListener("click",I),i&&i.addEventListener("click",A),s.addEventListener("click",M),()=>{p({restoreFocus:!1}),e.removeEventListener("click",I),i&&i.removeEventListener("click",A),s.removeEventListener("click",M),typeof r=="function"&&r(),d.cleanup&&d.cleanup();const T=document.querySelector(`[data-drawer="${a}"]`),B=document.querySelector(`[data-drawer-backdrop="${a}"]`);T&&T.remove(),B&&B.remove()}}function Wo(){return`
    <section class="scheduling-drawer">
      <div class="scheduling-drawer__summary">
        <p class="scheduling-drawer__subtitle">Fazenda Sol Nascente <span aria-hidden="true">•</span> Muda de Eucalipto Clone AEC 144</p>
        <span class="scheduling-drawer__status">Aguardando Agendamento</span>
      </div>
      ${Ea({id:"scheduling-tabs",variant:"underlined",fullWidth:!0,activeTab:0,tabs:[{label:"Detalhes e Planejamento",content:Uo()},{label:"Histórico",content:Jo()}]})}
    </section>
  `}function Uo(){const e=h("calendar",{size:16});return`
    <div class="scheduling-panel">
      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${h("file",{size:14})}Informações Gerais</h3>
        <div class="scheduling-info-card">
          <div class="scheduling-grid scheduling-grid--two">
            ${Le("Código ERP","43242343")}
            ${Le("CPF/CNPJ","123.456.789-00")}
            ${Le("Razão Social/Nome","Nome da razao social")}
            ${Le("Nome Fantasia/Apelido","Nome fantasia")}
            ${Le("Classe","Muda de Eucalipto Clone AEC 144")}
            ${Le("Código do Produto","43423432")}
            ${Le("Produto","Muda de Eucalipto Clone AEC 144")}
            ${Le("Quantidade","5.000")}
          </div>
        </div>
      </section>

      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${h("settings",{size:14})}Informações para Semeio</h3>
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
          ${P({text:"Gerar QR Code",variant:"outline-dark"})}
        </div>
      </section>

      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${h("calendar",{size:14})}Planejamento e Datas</h3>
        <div class="scheduling-info-card">
          <div class="scheduling-grid scheduling-grid--two">
            ${Le("Data do Pedido","15/01/2025")}
            ${Le("Data Planejada do Pedido","15/01/2025")}
          </div>
          <div class="scheduling-grid scheduling-grid--two scheduling-grid--inputs">
            ${D({id:"scheduling-date-input",type:"date",label:"Data de agendamento de Semeio",value:"2026-04-15",iconRight:e,className:"scheduling-date-field"})}
            ${D({id:"scheduling-responsible-input",label:"Responsável coleta da semente",value:"João da Silva"})}
          </div>
          <button type="button" class="scheduling-link" data-scheduling-action="consult-agenda">Consultar agenda</button>
        </div>
      </section>
    </div>
  `}function Jo(){return`
    <div class="scheduling-history">
      Sem histórico no momento
    </div>
  `}function Le(e,a){return`
    <div class="scheduling-field">
      <span class="scheduling-field__label">${e}</span>
      <span class="scheduling-field__value">${a}</span>
    </div>
  `}function Yo(){return`
    <div class="scheduling-footer">
      ${P({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-scheduling-action="cancel"')}
      ${P({text:"Agendar",variant:"primary",size:"sm"}).replace("<button",'<button data-scheduling-action="schedule"')}
    </div>
  `}function je(e,a){if(!e||Number.isNaN(a))return;const t=e.querySelectorAll(".tabs-tab"),n=e.parentElement?.querySelector(".tabs-content"),o=n?Array.from(n.children).filter(d=>d.classList.contains("tabs-panel")):null;t.forEach((d,s)=>{d.classList.toggle("is-active",s===a),d.setAttribute("aria-selected",String(s===a))}),o?.forEach((d,s)=>{d.classList.toggle("is-active",s===a)})}function Ze(){return`
    <div class="agendado-drawer__summary">
      <div class="agendado-drawer__summary-top">
        <div class="agendado-drawer__summary-left">
          <span class="agendado-meta">Cód. Pedido: <strong>001</strong></span>
          <span class="agendado-meta">Cód. Cliente: <strong>22332</strong></span>
          <span class="agendado-meta"><strong>Fazenda Sol Nascente</strong></span>
        </div>
        <div class="agendado-drawer__summary-right">
          ${xe({label:"Normal",value:"normal",size:"sm",className:"agendado-chip--normal"})}
          ${xe({label:"Agendado",value:"agendado",size:"sm"})}
        </div>
      </div>
      <div class="agendado-drawer__summary-bottom">
        <div class="agendado-drawer__summary-left">
          <span class="agendado-meta">Cód. Produto: <strong>001</strong></span>
          <span class="agendado-meta"><strong>Muda de Eucalipto Clone AEC 144</strong></span>
          <span class="agendado-meta">Qtd.: <strong>3.000</strong></span>
        </div>
        <div class="agendado-drawer__summary-right">
          ${xe({label:"Enxertia",value:"enxertia",size:"sm"})}
        </div>
      </div>
    </div>
  `}function Xe({id:e,firstTabLabel:a,firstTabContent:t}){return Ea({id:e,variant:"underlined",fullWidth:!0,activeTab:0,tabs:[{label:a,content:t},{label:"Detalhes",content:gr()},{label:"Ciclo",content:yr()}]})}function Zo(e){if(!e)return{code:"-",line1:"-",product:"-",quantity:"-",plannedDate:"-"};const a=e.querySelector(".kanban-card__code")?.textContent?.trim()||"-",t=Array.from(e.querySelectorAll(".kanban-card__item")).map(v=>{const y=Array.from(v.querySelectorAll("span")).map(c=>c.textContent?.trim()||"");return{label:y[0]||"",value:y[1]||""}}),n=t[0]?.label||"-",o=t.find(v=>/^qtd:/i.test(v.value)||/^qtd:/i.test(v.label))||t[1]||{label:"-",value:"-"},d=o.label||"-",s=o.value||o.label||"-",r=String(s).replace(/^qtd:\s*/i,"").trim()||"-",i=t.find(v=>/^data planejada:/i.test(v.label)||/^data semeio:/i.test(v.label))?.value||"-";return{code:a,line1:n,product:d,quantity:r,plannedDate:i}}function ua(e,a,t){e.querySelectorAll(".agendado-details-field").forEach(o=>{const d=o.querySelector(".agendado-details-field__label"),s=o.querySelector(".agendado-details-field__value");!d||!s||(d.textContent||"").trim()===a&&(s.textContent=t||"-")})}function Xo(e,a){if(!e||!a)return;const{code:t="-",line1:n="-",product:o="-",quantity:d="-",plannedDate:s="-"}=a,r=e.querySelector("[data-drawer-title]");r&&(r.textContent=t);const i=e.querySelectorAll(".agendado-drawer__summary-top .agendado-drawer__summary-left strong");i[0]&&(i[0].textContent=t),i[2]&&(i[2].textContent=n);const v=e.querySelectorAll(".agendado-drawer__summary-bottom .agendado-drawer__summary-left strong");v[1]&&(v[1].textContent=o),v[2]&&(v[2].textContent=d),ua(e,"CÃ³d. do Pedido",t),ua(e,"Data Agendada do Semeio",s),ua(e,"ResponsÃ¡vel agendamento",n),ua(e,"Produto",o),ua(e,"Quantidade",d);const y=e.querySelector(".agendado-details-field--full .agendado-details-field__value");y&&(y.textContent=o)}function er(){const e=document.getElementById("kanban-board");if(!e)return()=>{};const a="kanban-agendado-drawer",t="kanban-germinacao-drawer",n="kanban-casa-vegetacao-drawer",o="kanban-aguardando-enxertia-drawer",d="kanban-sala-corte-drawer",s="kanban-adaptacao-drawer",r="kanban-sala-fusao-drawer";document.querySelector(`[data-drawer="${a}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${a}"]`)?.remove(),document.querySelector(`[data-drawer="${t}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${t}"]`)?.remove(),document.querySelector(`[data-drawer="${n}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${n}"]`)?.remove(),document.querySelector(`[data-drawer="${o}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${o}"]`)?.remove(),document.querySelector(`[data-drawer="${d}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${d}"]`)?.remove(),document.querySelector(`[data-drawer="${s}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${s}"]`)?.remove(),document.querySelector(`[data-drawer="${r}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${r}"]`)?.remove();const i=Ee({id:a,title:"OP-2025-006",width:540,content:ar(),footer:Cr()});document.body.insertAdjacentHTML("beforeend",i);const v=Ee({id:t,title:"OP-2025-006",width:540,content:tr(),footer:""});document.body.insertAdjacentHTML("beforeend",v);const y=Ee({id:n,title:"OP-2025-006",width:540,content:nr(),footer:""});document.body.insertAdjacentHTML("beforeend",y);const c=Ee({id:o,title:"OP-2025-006",width:540,content:or(),footer:""});document.body.insertAdjacentHTML("beforeend",c);const u=Ee({id:d,title:"OP-2025-006",width:540,content:rr(),footer:""});document.body.insertAdjacentHTML("beforeend",u);const E=Ee({id:s,title:"OP-2025-006",width:540,content:dr(),footer:""});document.body.insertAdjacentHTML("beforeend",E);const p=Ee({id:r,title:"OP-2025-006",width:540,content:sr(),footer:""});document.body.insertAdjacentHTML("beforeend",p);const $=De({id:a,root:document}),I=document.querySelector(`[data-drawer="${a}"]`);if(!I||!$)return()=>{};const A=De({id:t,root:document}),M=document.querySelector(`[data-drawer="${t}"]`);if(!M||!A)return()=>{};const T=De({id:n,root:document}),B=document.querySelector(`[data-drawer="${n}"]`);if(!B||!T)return()=>{};const f=De({id:o,root:document}),G=document.querySelector(`[data-drawer="${o}"]`);if(!G||!f)return()=>{};const O=De({id:d,root:document}),j=document.querySelector(`[data-drawer="${d}"]`);if(!j||!O)return()=>{};const U=De({id:s,root:document}),ce=document.querySelector(`[data-drawer="${s}"]`);if(!ce||!U)return()=>{};const L=De({id:r,root:document}),l=document.querySelector(`[data-drawer="${r}"]`);if(!l||!L)return()=>{};const b=ye(I),m=ye(M),S=ye(B),k=ye(G),C=ye(j),q=ye(ce),z=ye(l);let w=null,g=null,x=null,N=null,K=!1;Ln(I);const H="kanban-schedule-modal-agendado",R="kanban-reschedule-modal-agendado";let me=()=>{},ne=()=>{},de=null,be=null,Q=Je();const te=I.querySelector("#agendado-tabs")?.closest("[data-tabs]"),ve=M.querySelector("#germinacao-tabs")?.closest("[data-tabs]"),Y=B.querySelector("#casa-vegetacao-tabs")?.closest("[data-tabs]"),qe=G.querySelector("#aguardando-enxertia-tabs")?.closest("[data-tabs]"),Te=j.querySelector("#sala-corte-tabs")?.closest("[data-tabs]"),Be=ce.querySelector("#adaptacao-tabs")?.closest("[data-tabs]"),Re=l.querySelector("#sala-fusao-tabs")?.closest("[data-tabs]"),Xa=te?.querySelector('.tabs-tab[data-tab="0"]');Xa&&Xa.setAttribute("data-drawer-autofocus","");const et=ve?.querySelector('.tabs-tab[data-tab="0"]');et&&et.setAttribute("data-drawer-autofocus","");const at=Y?.querySelector('.tabs-tab[data-tab="0"]');at&&at.setAttribute("data-drawer-autofocus","");const tt=qe?.querySelector('.tabs-tab[data-tab="0"]');tt&&tt.setAttribute("data-drawer-autofocus","");const nt=Te?.querySelector('.tabs-tab[data-tab="0"]');nt&&nt.setAttribute("data-drawer-autofocus","");const ot=Be?.querySelector('.tabs-tab[data-tab="0"]');ot&&ot.setAttribute("data-drawer-autofocus","");const rt=Re?.querySelector('.tabs-tab[data-tab="0"]');rt&&rt.setAttribute("data-drawer-autofocus","");const st=({columnId:F="",card:_=null}={})=>{if(!(!_||!F)){if(F==="agendado"){const V=Zo(_);Xo(I,V),$.open(_);return}if(F==="germinacao"){A.open(_);return}if(F==="casa-vegetacao"){T.open(_);return}if(F==="aguardando-enxertia"){f.open(_);return}if(F==="sala-corte"){O.open(_);return}if(F==="adaptacao"){U.open(_);return}if(F==="sala-fusao"){L.open(_);return}F==="semeio"&&La(_)}},Sn=F=>{if(!F)return null;const _=Array.from(F.querySelectorAll(".kanban-card"));return _.length&&(_.find(V=>V.offsetParent!==null&&!V.hasAttribute("hidden"))||_[0])||null},dt=F=>{const _=F.target.closest(".kanban-card");if(_&&e.contains(_)){F.target.closest(".kanban-card__code")&&F.preventDefault();const ee=_.closest("[data-column-id]")?.dataset.columnId;if(!ee)return;st({columnId:ee,card:_});return}const V=F.target.closest(".kanban-column__title");if(!V||!e.contains(V))return;const X=V.closest("[data-column-id]"),ie=X?.dataset.columnId;if(!ie)return;const fe=Sn(X);fe&&st({columnId:ie,card:fe})},it=F=>{if(!te)return;const _=F.target.closest(".tabs-tab");if(!_||!te.contains(_))return;const V=Number(_.dataset.tab);je(te,V)},lt=F=>{if(!ve)return;const _=F.target.closest(".tabs-tab");if(!_||!ve.contains(_))return;const V=Number(_.dataset.tab);je(ve,V)},ct=F=>{if(!Y)return;const _=F.target.closest(".tabs-tab");if(!_||!Y.contains(_))return;const V=Number(_.dataset.tab);je(Y,V)},ut=F=>{if(!qe)return;const _=F.target.closest(".tabs-tab");if(!_||!qe.contains(_))return;const V=Number(_.dataset.tab);je(qe,V)},pt=F=>{if(!Te)return;const _=F.target.closest(".tabs-tab");if(!_||!Te.contains(_))return;const V=Number(_.dataset.tab);je(Te,V)},mt=F=>{if(!Be)return;const _=F.target.closest(".tabs-tab");if(!_||!Be.contains(_))return;const V=Number(_.dataset.tab);je(Be,V)},vt=F=>{if(!Re)return;const _=F.target.closest(".tabs-tab");if(!_||!Re.contains(_))return;const V=Number(_.dataset.tab);je(Re,V)},gt=(F,_,{onOpenSemeioDrawer:V}={})=>{const X=F.target.closest("[data-agendado-details-tab]");if(X){const ae=_.querySelector("[data-agendado-details]"),W=X.dataset.agendadoDetailsTab;return!ae||!W||(ae.querySelectorAll("[data-agendado-details-tab]").forEach(ee=>{const oe=ee===X;ee.classList.toggle("is-active",oe),ee.setAttribute("aria-selected",String(oe))}),ae.querySelectorAll("[data-agendado-details-panel]").forEach(ee=>{ee.classList.toggle("is-active",ee.dataset.agendadoDetailsPanel===W)})),!0}const ie=F.target.closest("[data-agendado-details-toggle]");if(ie){if(ie.dataset.agendadoOpenGerminacao==="true")return V?.(ie),!0;const ae=ie.closest("[data-agendado-details-accordion]");if(!ae)return!0;const W=ae.classList.toggle("is-collapsed");return ie.setAttribute("aria-expanded",String(!W)),!0}const fe=F.target.closest("[data-agendado-cycle-tab]");if(fe){const ae=_.querySelector("[data-agendado-cycle]"),W=fe.dataset.agendadoCycleTab;return!ae||!W||(ae.querySelectorAll("[data-agendado-cycle-tab]").forEach(ee=>{const oe=ee===fe;ee.classList.toggle("is-active",oe),ee.setAttribute("aria-selected",String(oe))}),ae.querySelectorAll("[data-agendado-cycle-panel]").forEach(ee=>{ee.classList.toggle("is-active",ee.dataset.agendadoCyclePanel===W)})),!0}return!1},La=async F=>{try{w||(w=Dt(()=>import("./enviar-germinacao-drawer-B-AmkiEI.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24])));const _=await w;if(!g&&typeof _.createEnviarGerminacaoDrawer=="function"&&(g=_.createEnviarGerminacaoDrawer()),!g?.open)return;$.close({restoreFocus:!1}),A.close({restoreFocus:!1}),T.close({restoreFocus:!1}),f.close({restoreFocus:!1}),O.close({restoreFocus:!1}),U.close({restoreFocus:!1}),L.close({restoreFocus:!1}),g.open(F||null)}catch(_){console.error("[kanban] failed to open enviar-germinacao drawer",_)}},ft=async()=>{if(!(K||g))try{w||(w=Dt(()=>import("./enviar-germinacao-drawer-B-AmkiEI.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24])));const F=await w;if(K||g)return;typeof F.createEnviarGerminacaoDrawer=="function"&&(g=F.createEnviarGerminacaoDrawer())}catch(F){console.error("[kanban] failed to preload enviar-germinacao drawer",F)}};typeof window.requestIdleCallback=="function"?N=window.requestIdleCallback(()=>{ft()},{timeout:1200}):x=window.setTimeout(()=>{ft()},300);const bt=F=>{if(gt(F,I,{onOpenSemeioDrawer:X=>{La(X)}}))return;const _=F.target.closest("[data-agendado-action]");if(!_)return;const V=_.dataset.agendadoAction;if(V==="cancel"){$.close();return}if(V==="reagendar"||V==="consult-agenda"){St(_);return}if(V==="add-lote"){console.log(`Ação: ${V}`);return}if(V==="details-qr"||V==="details-view-order"||V==="details-view-image"){console.log(`Ação: ${V}`);return}if(V==="save-lote"){console.log("Salvar lote");return}if(V==="start-semeio"){const X=I.querySelector("[data-agendado-form]"),ie=X?Object.fromEntries(new FormData(X).entries()):{};console.log("Iniciar semeio",ie)}},ea=({stageKey:F,stageDrawerElement:_,stageDrawerControls:V})=>X=>{if(gt(X,_,{onOpenSemeioDrawer:W=>{La(W)}}))return;const ie=X.target.closest("[data-op-step-action]");if(ie&&_.contains(ie)){const W=ie.getAttribute("data-op-step-action");if(!W)return;if(W==="cancel"){V.close();return}if(W==="consult-agenda"){St(ie);return}if(W==="consult-location"||W==="quality"||W==="qr"){console.log(`Ação: ${W}`);return}if(W==="register-tray"||W==="read-qr"||W==="start-execution"||W==="add-tray"||W==="reagendar"){if(W==="read-qr"){Jt();return}console.log(`Ação: ${W}`);return}if(W==="voltar-etapa"||W==="submit-next"){const ee=_.querySelector(`[data-op-step-form="${F}"]`),oe=ee?Object.fromEntries(new FormData(ee).entries()):{};console.log(W,oe)}return}const fe=X.target.closest("[data-agendado-action]");if(!fe||!_.contains(fe))return;const ae=fe.dataset.agendadoAction;(ae==="details-qr"||ae==="details-view-order"||ae==="details-view-image")&&console.log(`Ação: ${ae}`)},_t=ea({stageKey:"germinacao",stageDrawerElement:M,stageDrawerControls:A}),ht=ea({stageKey:"casa-vegetacao",stageDrawerElement:B,stageDrawerControls:T}),yt=ea({stageKey:"aguardando-enxertia",stageDrawerElement:G,stageDrawerControls:f}),kt=ea({stageKey:"sala-corte",stageDrawerElement:j,stageDrawerControls:O}),wt=ea({stageKey:"adaptacao",stageDrawerElement:ce,stageDrawerControls:U}),$t=ea({stageKey:"sala-fusao",stageDrawerElement:l,stageDrawerControls:L});e.addEventListener("click",dt),te&&te.addEventListener("click",it),ve&&ve.addEventListener("click",lt),Y&&Y.addEventListener("click",ct),qe&&qe.addEventListener("click",ut),Te&&Te.addEventListener("click",pt),Be&&Be.addEventListener("click",mt),Re&&Re.addEventListener("click",vt),I.addEventListener("click",bt),M.addEventListener("click",_t),B.addEventListener("click",ht),G.addEventListener("click",yt),j.addEventListener("click",kt),ce.addEventListener("click",wt),l.addEventListener("click",$t);const aa=({restoreFocus:F=!0}={})=>{ta({restoreFocus:!1});const _=document.querySelector(`[data-modal="${H}"]`),V=document.querySelector(`[data-modal-backdrop="${H}"]`);!_||!V||(me(),we(H),I.classList.contains("is-open")&&(document.body.style.overflow="hidden"),_.remove(),V.remove(),F&&de?.focus&&de.focus(),de=null)},ta=({restoreFocus:F=!0}={})=>{const _=document.querySelector(`[data-modal="${R}"]`),V=document.querySelector(`[data-modal-backdrop="${R}"]`);!_||!V||(ne(),we(R),(I.classList.contains("is-open")||document.querySelector(`[data-modal="${H}"]`))&&(document.body.style.overflow="hidden"),_.remove(),V.remove(),F&&be?.focus&&be.focus(),be=null)},Cn=({anchorEl:F=null,initialValues:_={}}={})=>{document.querySelector(`[data-modal="${R}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${R}"]`)?.remove();const V={date:_.date||Ve(Q.selectedDate),location:_.location||"",responsible:_.responsible||""};be=F,document.body.insertAdjacentHTML("beforeend",dn({modalId:R,values:V}));const X=document.querySelector(`[data-modal="${R}"]`),ie=document.querySelector(`[data-modal-backdrop="${R}"]`);if(!X||!ie)return;const fe=ye(X),ae=X.querySelector("#reschedule-date"),W=X.querySelector("#reschedule-location"),ee=X.querySelector("#reschedule-responsible"),oe=X.querySelector("[data-reschedule-error]"),da=X.querySelector("[data-modal-close]"),ia=X.querySelector('[data-reschedule-action="cancel"]'),la=X.querySelector('[data-reschedule-action="confirm"]'),na=()=>{oe&&(oe.hidden=!0),[ae,W,ee].forEach(ge=>{ge?.closest(".field")?.classList.remove("field--error")})},ba=()=>{na();const ge=[];return ae?.value||ge.push(ae),W?.value?.trim()||ge.push(W),ee?.value?.trim()||ge.push(ee),ge.length?(ge.forEach(En=>En?.closest(".field")?.classList.add("field--error")),oe&&(oe.hidden=!1),ge[0]?.focus?.(),!1):!0},_e=()=>ta(),oa=ge=>{ge.target===ie&&ta()},Ct=ge=>{ge.key==="Escape"&&(ge.preventDefault(),ge.stopPropagation(),ta())},Et=()=>{ba()&&(console.log("Reagendar confirmado",{data:ae?.value||"",localizacao:W?.value?.trim()||"",responsavel:ee?.value?.trim()||""}),ta())};da?.addEventListener("click",_e),ia?.addEventListener("click",_e),la?.addEventListener("click",Et),ie.addEventListener("click",oa),document.addEventListener("keydown",Ct,!0),[ae,W,ee].forEach(ge=>{ge?.addEventListener("input",na)}),ne=()=>{da?.removeEventListener("click",_e),ia?.removeEventListener("click",_e),la?.removeEventListener("click",Et),ie.removeEventListener("click",oa),document.removeEventListener("keydown",Ct,!0),[ae,W,ee].forEach(ge=>{ge?.removeEventListener("input",na)}),typeof fe=="function"&&fe(),ne=()=>{}},$e(R),setTimeout(()=>{ae?.focus&&ae.focus()},120)},St=F=>{document.querySelector(`[data-modal="${H}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${H}"]`)?.remove(),Q=Je(),de=F||null,document.body.insertAdjacentHTML("beforeend",Ua({modalId:H,state:Q}));const _=document.querySelector(`[data-modal="${H}"]`),V=document.querySelector(`[data-modal-backdrop="${H}"]`);if(!_||!V)return;const X=_.querySelector("#schedule-location-select"),ie=_.querySelector("[data-modal-close]"),fe=()=>aa(),ae=oe=>{oe.target===V&&aa()},W=oe=>{oe.key==="Escape"&&(document.querySelector(`[data-modal="${R}"]`)||(oe.preventDefault(),oe.stopPropagation(),aa()))},ee=oe=>{const da=oe.target.closest("[data-schedule-action]");if(da){const _e=da.dataset.scheduleAction;if(_e==="back"){aa();return}if(_e==="select-date"){const oa=I.querySelector("#agendado-data-encerramento");oa&&(oa.value=Ve(Q.selectedDate),oa.dispatchEvent(new Event("input",{bubbles:!0}))),aa();return}}const ia=oe.target.closest("[data-schedule-view]");if(ia){Q.viewMode=ia.dataset.scheduleView==="month"?"month":"week",Q.viewMode==="month"&&(Q.currentDate=Ce(Q.selectedDate)),Se(_,Q);return}const la=oe.target.closest("[data-schedule-nav]");if(la){const _e=la.dataset.scheduleNav==="prev"?-1:1;Q.viewMode==="month"?Q.currentDate=Wa(Q.currentDate,_e):(Q.selectedDate=Ye(Q.selectedDate,_e*7),Q.currentDate=Ce(Q.selectedDate)),Se(_,Q);return}const na=oe.target.closest("[data-schedule-date]");if(na){const _e=Ga(na.dataset.scheduleDate);if(!_e)return;Q.selectedDate=_e,Q.currentDate=Ce(_e),Se(_,Q);return}const ba=oe.target.closest("[data-schedule-reagendar]");ba&&Cn({anchorEl:ba,initialValues:{date:Ve(Q.selectedDate),location:X?.value||"",responsible:""}})};V.addEventListener("click",ae),_.addEventListener("click",ee),ie?.addEventListener("click",fe),document.addEventListener("keydown",W,!0),me=()=>{V.removeEventListener("click",ae),_.removeEventListener("click",ee),ie?.removeEventListener("click",fe),document.removeEventListener("keydown",W,!0),me=()=>{}},$e(H),Se(_,Q),X?.focus&&setTimeout(()=>X.focus(),120)};return()=>{K=!0,x!==null&&window.clearTimeout(x),N!==null&&typeof window.cancelIdleCallback=="function"&&window.cancelIdleCallback(N),aa({restoreFocus:!1}),ta({restoreFocus:!1}),g?.cleanup?.(),g=null,w=null,e.removeEventListener("click",dt),te&&te.removeEventListener("click",it),ve&&ve.removeEventListener("click",lt),Y&&Y.removeEventListener("click",ct),qe&&qe.removeEventListener("click",ut),Te&&Te.removeEventListener("click",pt),Be&&Be.removeEventListener("click",mt),Re&&Re.removeEventListener("click",vt),I.removeEventListener("click",bt),M.removeEventListener("click",_t),B.removeEventListener("click",ht),G.removeEventListener("click",yt),j.removeEventListener("click",kt),ce.removeEventListener("click",wt),l.removeEventListener("click",$t),typeof b=="function"&&b(),typeof m=="function"&&m(),typeof S=="function"&&S(),typeof k=="function"&&k(),typeof C=="function"&&C(),typeof q=="function"&&q(),typeof z=="function"&&z(),$.cleanup&&$.cleanup(),A.cleanup&&A.cleanup(),T.cleanup&&T.cleanup(),f.cleanup&&f.cleanup(),O.cleanup&&O.cleanup(),U.cleanup&&U.cleanup(),L.cleanup&&L.cleanup(),document.querySelector(`[data-drawer="${a}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${a}"]`)?.remove(),document.querySelector(`[data-drawer="${t}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${t}"]`)?.remove(),document.querySelector(`[data-drawer="${n}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${n}"]`)?.remove(),document.querySelector(`[data-drawer="${o}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${o}"]`)?.remove(),document.querySelector(`[data-drawer="${d}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${d}"]`)?.remove(),document.querySelector(`[data-drawer="${s}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${s}"]`)?.remove(),document.querySelector(`[data-drawer="${r}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${r}"]`)?.remove()}}function ar(){const e=Xe({id:"agendado-tabs",firstTabLabel:"Iniciar Semeio",firstTabContent:vr()});return`
    <section class="agendado-drawer">
      ${Ze()}
      ${e}
    </section>
  `}function tr(){const e=Xe({id:"germinacao-tabs",firstTabLabel:"Enviar para Casa Vegetação",firstTabContent:ir()});return`
    <section class="agendado-drawer germinacao-stage-drawer">
      ${Ze()}
      ${e}
    </section>
  `}function nr(){const e=Xe({id:"casa-vegetacao-tabs",firstTabLabel:"Enviar para Expedição",firstTabContent:lr()});return`
    <section class="agendado-drawer casa-vegetacao-stage-drawer">
      ${Ze()}
      ${e}
    </section>
  `}function or(){const e=Xe({id:"aguardando-enxertia-tabs",firstTabLabel:"Enviar para Sala de Corte",firstTabContent:cr()});return`
    <section class="agendado-drawer aguardando-enxertia-stage-drawer">
      ${Ze()}
      ${e}
    </section>
  `}function rr(){const e=Xe({id:"sala-corte-tabs",firstTabLabel:"Enviar para Enxertia",firstTabContent:ur()});return`
    <section class="agendado-drawer op-drawer--corte">
      ${Ze()}
      ${e}
    </section>
  `}function sr(){const e=Xe({id:"sala-fusao-tabs",firstTabLabel:"Enviar para Adaptação",firstTabContent:pr()});return`
    <section class="agendado-drawer op-drawer--fusao">
      ${Ze()}
      ${e}
    </section>
  `}function dr(){const e=Xe({id:"adaptacao-tabs",firstTabLabel:"Enviar para Casa de Vegetação",firstTabContent:mr()});return`
    <section class="agendado-drawer op-drawer--adaptacao">
      ${Ze()}
      ${e}
    </section>
  `}function ir(){return Ja({stepKey:"germinacao",scopeClass:"op-drawer__step--germinacao",stageTitle:"Sala de Germinação",dateEndLabel:"Data encerramento da Germinação*",submitLabel:"Enviar para Estufa"})}function lr(){return Ja({stepKey:"casa-vegetacao",scopeClass:"op-drawer__step--casa-vegetacao",stageTitle:"Sala de Germinação",dateEndLabel:"Data encerramento da etapa*",submitLabel:"Enviar para Expedição",showProductInfoSection:!1,showConsultAgenda:!1,qualityTitle:"Controle de Qualidade",qualityStatus:"",qualityButtonLabel:"Iniciar Seleção",qualityClassName:"op-drawer--adaptacao__quality",quantityGroups:[{subtitle:"Produto",meta:"Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong>",kpis:[{label:"Entrada",value:"5.000"},{label:"Perda",value:"250",badge:"+5%"},{label:"Atual",value:"4.750",badge:"95%"}]}]})}function cr(){return Ja({stepKey:"aguardando-enxertia",scopeClass:"op-drawer__step--aguardando-enxertia",stageTitle:"Sala de Germinação",dateEndLabel:"Data de Início da Etapa*",submitLabel:"Iniciar Enxertia",rightDateLabel:"Data de Agendamento",rescheduleLabel:"+ Reagendar",showBackAction:!1})}function ur(){return`
    <form class="agendado-panel op-drawer__step--corte" data-op-step-form="sala-corte">
      <section class="agendado-section op-germinacao-step__actions">
        ${sa().replace("<button",'<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${h("home",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Sala de Germinação</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${h("calendar",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Data de Semeio</span>
                <strong>15/01/2025</strong>
              </div>
            </div>
            <div class="op-germinacao-step__field">
              <span class="op-germinacao-step__caption">Dias após Semeio</span>
              <strong>2 dias</strong>
            </div>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${h("calendar",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Data de Agendamento</span>
                <strong>15/01/2025</strong>
              </div>
            </div>
            <div class="op-germinacao-step__field op-step-corte__reagendar">
              <button type="button" class="agendado-inline-link" data-op-step-action="reagendar">Reagendar</button>
            </div>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--timeline">
            <div class="op-germinacao-step__timeline">
              <div class="op-germinacao-step__date">
                <span class="op-germinacao-step__caption">Data Entrada</span>
                <strong>15/01</strong>
                <span class="op-germinacao-step__caption">Quarta-feira</span>
              </div>
              <div class="op-germinacao-step__days">
                <strong>10</strong>
                <span>Dias Corridos</span>
              </div>
              <div class="op-germinacao-step__date op-germinacao-step__date--right">
                <span class="op-germinacao-step__caption">Previsão de Saída</span>
                <strong>20/01</strong>
                <span class="op-germinacao-step__caption">Segunda-feira</span>
              </div>
            </div>
            <div class="op-germinacao-step__progress">
              <div class="op-germinacao-step__progress-legend">
                <span>Progresso Atual: 60%</span>
                <span>Meta: 5 dias</span>
              </div>
              <div class="op-germinacao-step__progress-line"><span style="width: 60%"></span></div>
            </div>
          </div>
        </article>
      </section>

      <section class="agendado-section">
        <h3 class="agendado-title">Insumos</h3>
        <div class="agendado-info-box">
          <div class="agendado-info-box__head">
            <span class="agendado-subtitle">&nbsp;</span>
            <span class="agendado-info-box__meta">Qtd. Bandejas: <strong>20 un</strong> &nbsp; Capacidade: <strong>128</strong></span>
          </div>
          <div class="agendado-kpis">
            ${re("Enxerto","248")}
            ${re("Porta-enxerto","4.750")}
          </div>
        </div>
        <div class="op-step-corte__execution-toggle">
          ${P({text:"Iniciar Execução",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="start-execution"')}
        </div>
      </section>

      <section class="agendado-section op-step-corte__exec">
        <h3 class="agendado-title">Execução do Corte</h3>
        <div class="op-step-corte__exec-actions">
          <button type="button" class="agendado-inline-link" data-op-step-action="register-tray">+ Registrar Bandeja Finalizada</button>
          <button type="button" class="agendado-inline-link" data-op-step-action="read-qr">Ler QR Code</button>
        </div>
        <article class="agendado-info-box op-step-corte__exec-form">
          ${D({id:"sala-corte-data-execucao",type:"date",label:"Data de Execução*",required:!0,name:"dataExecucao",iconRight:h("calendar",{size:16})})}
          <div class="op-step-corte__grid op-step-corte__grid--three">
            ${le({id:"sala-corte-operador",label:"Operador",required:!0,placeholder:"Selecione",items:[{label:"Maria Silva",value:"maria-silva"},{label:"João Souza",value:"joao-souza"}]})}
            ${D({id:"sala-corte-bandeja-id",label:"Bandeja ID",name:"bandejaId",value:"# ID"})}
            ${D({id:"sala-corte-qtd-mudas",label:"Quantidade de Mudas",name:"quantidadeMudas",value:"0"})}
          </div>
          <div class="op-step-corte__add-action">
            ${P({text:"Adicionar",variant:"primary",size:"sm"}).replace("<button",'<button data-op-step-action="add-tray"')}
          </div>
        </article>
      </section>

      <section class="agendado-section op-step-corte__tables">
        <article class="agendado-info-box">
          <div class="op-step-corte__table-head">
            <h4 class="agendado-title">Bandejas Registradas Hoje</h4>
            <span class="agendado-info-box__meta">Total: <strong>248 mudas</strong></span>
          </div>
          <div class="op-step-corte__table-wrap">
            <table class="op-step-corte__table" aria-label="Bandejas registradas hoje">
              <thead>
                <tr><th>Bandeja</th><th>Operador</th><th>Data de Execução</th><th>Qtd</th><th></th></tr>
              </thead>
              <tbody>
                <tr><td>BDJ-001</td><td>Maria Silva</td><td>23/12/26</td><td>128</td><td>${h("trash",{size:14})}</td></tr>
                <tr><td>BDJ-002</td><td>João Souza</td><td>23/12/26</td><td>120</td><td>${h("trash",{size:14})}</td></tr>
              </tbody>
            </table>
          </div>
        </article>

        <article class="agendado-info-box">
          <div class="op-step-corte__table-head">
            <h4 class="agendado-title">Produtividade por Operador</h4>
            <span class="agendado-info-box__meta">Total: <strong>248 mudas</strong></span>
          </div>
          <div class="op-step-corte__table-wrap">
            <table class="op-step-corte__table" aria-label="Produtividade por operador">
              <thead>
                <tr><th>Operador</th><th>Qtd. Bandejas</th><th>Qtd. Mudas</th><th>% Lote</th></tr>
              </thead>
              <tbody>
                <tr><td>Maria Silva</td><td>128</td><td>128</td><td>128</td></tr>
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section class="agendado-section">
        <h3 class="agendado-title">Quantidade de Mudas Enxertadas</h3>
        <div class="agendado-info-box">
          <div class="agendado-info-box__head">
            <span class="agendado-subtitle">Produto</span>
            <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong></span>
          </div>
          <div class="agendado-kpis">
            ${re("Já Executado","248")}
            ${re("A Executar (Restante)","4.500")}
            ${re("Perdas","2")}
          </div>
        </div>
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
            </div>
            ${fa({id:"sala-corte-localizacao",required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${D({id:"sala-corte-data-encerramento",type:"date",label:"Data encerramento da etapa*",required:!0,name:"dataEncerramento",iconRight:h("calendar",{size:16})})}
          ${D({id:"sala-corte-responsavel",label:"Responsável*",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
          <div class="agendado-consultar-wrap">
            ${P({text:"+ Consultar agenda",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="consult-agenda"')}
          </div>
        </div>
      </section>

      <section class="agendado-section op-germinacao-step__bottom">
        <span aria-hidden="true"></span>
        <div class="op-germinacao-step__bottom-right">
          ${P({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="cancel"')}
          ${P({text:"Encerrar e Enviar para Fusão",variant:"primary",size:"sm"}).replace("<button",'<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `}function pr(){return`
    <form class="agendado-panel op-drawer__step--fusao" data-op-step-form="sala-fusao">
      <section class="agendado-section op-germinacao-step__actions">
        ${sa().replace("<button",'<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${h("home",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Sala de Germinação</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${h("calendar",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Data de Semeio</span>
                <strong>15/01/2025</strong>
              </div>
            </div>
            <div class="op-germinacao-step__field">
              <span class="op-germinacao-step__caption">Dias após Semeio</span>
              <strong>2 dias</strong>
            </div>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--timeline">
            <div class="op-germinacao-step__timeline">
              <div class="op-germinacao-step__date">
                <span class="op-germinacao-step__caption">Data de Entrada</span>
                <strong>15/01</strong>
                <span class="op-germinacao-step__caption">Quarta-feira</span>
              </div>
              <div class="op-germinacao-step__days">
                <strong>2</strong>
                <span>Dias Corridos</span>
              </div>
              <div class="op-germinacao-step__date op-germinacao-step__date--right">
                <span class="op-germinacao-step__caption">Previsão de Saída</span>
                <strong>18/01</strong>
                <span class="op-germinacao-step__caption">Segunda-feira</span>
              </div>
            </div>
            <div class="op-germinacao-step__progress">
              <div class="op-germinacao-step__progress-legend">
                <span>Progresso Atual: 66%</span>
                <span>Meta: 3 dias</span>
              </div>
              <div class="op-germinacao-step__progress-line"><span style="width: 66%"></span></div>
            </div>
          </div>
        </article>
      </section>

      <section class="agendado-section op-germinacao-step__quality">
        <div class="op-germinacao-step__quality-text">
          <strong>Controle de Qualidade:</strong>
          <span>Dentro do esperado</span>
        </div>
        ${P({text:"Avaliação",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="quality"')}
      </section>

      <section class="agendado-section">
        <h3 class="agendado-title">Quantidade de Mudas Semeadas</h3>
        <div class="agendado-info-box">
          <div class="agendado-semeio-group">
            <div class="agendado-info-box__head">
              <span class="agendado-subtitle">Produto</span>
              <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong></span>
            </div>
            <div class="agendado-kpis">
              ${re("Entrada","5.000")}
              ${re("Perda","250","+5%")}
              ${re("Atual","4.750","95%")}
            </div>
          </div>
        </div>
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
            </div>
            ${fa({id:"sala-fusao-localizacao",required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${D({id:"sala-fusao-data-encerramento",type:"date",label:"Data encerramento da etapa*",required:!0,name:"dataEncerramento",iconRight:h("calendar",{size:16})})}
          ${D({id:"sala-fusao-responsavel",label:"Responsável*",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
          <div class="agendado-consultar-wrap">
            ${P({text:"+ Consultar agenda",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="consult-agenda"')}
          </div>
        </div>
      </section>

      <section class="agendado-section op-germinacao-step__bottom">
        ${P({text:"Voltar Etapa",variant:"error",style:"outline",size:"sm"}).replace("<button",'<button data-op-step-action="voltar-etapa"')}
        <div class="op-germinacao-step__bottom-right">
          ${P({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="cancel"')}
          ${P({text:"Enviar para Adaptação",variant:"primary",size:"sm"}).replace("<button",'<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `}function mr(){return`
    <form class="agendado-panel op-drawer__step--adaptacao" data-op-step-form="adaptacao">
      <section class="agendado-section op-germinacao-step__actions">
        ${sa().replace("<button",'<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${h("home",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Sala de Germinação</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${h("calendar",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Data de Semeio</span>
                <strong>15/01/2025</strong>
              </div>
            </div>
            <div class="op-germinacao-step__field">
              <span class="op-germinacao-step__caption">Dias após Semeio</span>
              <strong>2 dias</strong>
            </div>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--timeline">
            <div class="op-germinacao-step__timeline">
              <div class="op-germinacao-step__date">
                <span class="op-germinacao-step__caption">Data de Entrada</span>
                <strong>15/01</strong>
                <span class="op-germinacao-step__caption">Quarta-feira</span>
              </div>
              <div class="op-germinacao-step__days">
                <strong>2</strong>
                <span>Dias Corridos</span>
              </div>
              <div class="op-germinacao-step__date op-germinacao-step__date--right">
                <span class="op-germinacao-step__caption">Previsão de Saída</span>
                <strong>18/01</strong>
                <span class="op-germinacao-step__caption">Segunda-feira</span>
              </div>
            </div>
            <div class="op-germinacao-step__progress">
              <div class="op-germinacao-step__progress-legend">
                <span>Progresso Atual: 66%</span>
                <span>Meta: 3 dias</span>
              </div>
              <div class="op-germinacao-step__progress-line"><span style="width: 66%"></span></div>
            </div>
          </div>
        </article>
      </section>

      <section class="agendado-section op-germinacao-step__quality op-drawer--adaptacao__quality">
        <div class="op-germinacao-step__quality-text">
          <strong>Controle de Qualidade</strong>
        </div>
        ${P({text:"Iniciar Seleção",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="quality"')}
      </section>

      <section class="agendado-section">
        <h3 class="agendado-title">Quantidade de Mudas Semeadas</h3>
        <div class="agendado-info-box">
          <div class="agendado-semeio-group">
            <div class="agendado-info-box__head">
              <span class="agendado-subtitle">Produto</span>
              <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong></span>
            </div>
            <div class="agendado-kpis">
              ${re("Entrada","5.000")}
              ${re("Perda","250","+5%")}
              ${re("Atual","4.750","95%")}
            </div>
          </div>
        </div>
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
            </div>
            ${fa({id:"adaptacao-localizacao",required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${D({id:"adaptacao-data-encerramento",type:"date",label:"Data encerramento da etapa*",required:!0,name:"dataEncerramento",iconRight:h("calendar",{size:16})})}
          ${D({id:"adaptacao-responsavel",label:"Responsável*",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
        </div>
      </section>

      <section class="agendado-section op-germinacao-step__bottom">
        ${P({text:"Voltar Etapa",variant:"error",style:"outline",size:"sm"}).replace("<button",'<button data-op-step-action="voltar-etapa"')}
        <div class="op-germinacao-step__bottom-right">
          ${P({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="cancel"')}
          ${P({text:"Enviar para Casa de Vegetação",variant:"primary",size:"sm"}).replace("<button",'<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `}function Ja({stepKey:e,scopeClass:a,stageTitle:t,dateEndLabel:n,submitLabel:o,rightDateLabel:d="Previsão de Saída",rescheduleLabel:s="+ Consultar agenda",showBackAction:r=!0,showProductInfoSection:i=!0,showConsultAgenda:v=!0,qualityTitle:y="Controle de Qualidade:",qualityStatus:c="Dentro do esperado",qualityButtonLabel:u="Avaliação",qualityClassName:E="",quantityGroups:p=[{subtitle:"Enxerto",meta:"Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong>",kpis:[{label:"Semeada",value:"5.000"},{label:"Perda",value:"250",badge:"+5%"},{label:"Germinada",value:"4.750",badge:"95%"}]},{subtitle:"Porta-enxerto",meta:"Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong>",kpis:[{label:"Semeada",value:"5.000"},{label:"Perda",value:"250",badge:"+5%"},{label:"Germinada",value:"4.750",badge:"95%"}]}]}){const I=(Array.isArray(p)?p:[]).map(T=>{const B=T?.subtitle||"Produto",f=T?.meta||"Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong>",O=(Array.isArray(T?.kpis)?T.kpis:[]).map(j=>re(j?.label||"",j?.value||"",j?.badge||"")).join("");return`
      <div class="agendado-semeio-group">
        <div class="agendado-info-box__head">
          <span class="agendado-subtitle">${B}</span>
          <span class="agendado-info-box__meta">${f}</span>
        </div>
        <div class="agendado-kpis">
          ${O}
        </div>
      </div>
    `}).join(""),A=i?`
      <section class="agendado-section">
        <h3 class="agendado-title">Informações do Produto</h3>
        <div class="agendado-info-box">
          <div class="agendado-info-box__head">
            <span class="agendado-subtitle">Produto</span>
            <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong></span>
          </div>
          <div class="agendado-kpis">
            ${re("Qtd. a Produzir","5.556")}
            ${re("Perda Estimada","556","+10%")}
            ${re("Qtd. solicitada","5.000")}
          </div>
        </div>
      </section>
    `:"",M=v?`
          <div class="agendado-consultar-wrap">
            ${P({text:s,variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="consult-agenda"')}
          </div>
      `:"";return`
    <form class="agendado-panel ${a}" data-op-step-form="${e}">
      <section class="agendado-section op-germinacao-step__actions">
        ${sa().replace("<button",'<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${h("home",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">${t}</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${h("calendar",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Data de Semeio</span>
                <strong>15/01/2025</strong>
              </div>
            </div>
            <div class="op-germinacao-step__field">
              <span class="op-germinacao-step__caption">Dias após Semeio</span>
              <strong>2 dias</strong>
            </div>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--timeline">
            <div class="op-germinacao-step__timeline">
              <div class="op-germinacao-step__date">
                <span class="op-germinacao-step__caption">Data de Entrada</span>
                <strong>15/01</strong>
                <span class="op-germinacao-step__caption">Quarta-feira</span>
              </div>
              <div class="op-germinacao-step__days">
                <strong>2</strong>
                <span>Dias Corridos</span>
              </div>
              <div class="op-germinacao-step__date op-germinacao-step__date--right">
                <span class="op-germinacao-step__caption">${d}</span>
                <strong>18/01</strong>
                <span class="op-germinacao-step__caption">Segunda-feira</span>
              </div>
            </div>
            <div class="op-germinacao-step__progress">
              <div class="op-germinacao-step__progress-legend">
                <span>Progresso Atual: 66%</span>
                <span>Meta: 3 dias</span>
              </div>
              <div class="op-germinacao-step__progress-line"><span style="width: 66%"></span></div>
            </div>
          </div>
        </article>
      </section>

      <section class="agendado-section op-germinacao-step__quality ${E}">
        <div class="op-germinacao-step__quality-text">
          <strong>${y}</strong>
          ${c?`<span>${c}</span>`:""}
        </div>
        ${P({text:u,variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="quality"')}
      </section>

      ${A}

      <section class="agendado-section">
        <h3 class="agendado-title">Quantidade de Mudas Semeadas</h3>
        <div class="agendado-info-box">
          ${I}
        </div>
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
            </div>
            ${fa({id:`${e}-localizacao`,required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${D({id:`${e}-data-encerramento`,type:"date",label:n,required:!0,name:"dataEncerramento",iconRight:h("calendar",{size:16})})}
          ${D({id:`${e}-responsavel`,label:"Responsável*",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
          ${M}
        </div>
      </section>
      <section class="agendado-section op-germinacao-step__bottom">
        ${r?P({text:"Voltar Etapa",variant:"error",style:"outline",size:"sm"}).replace("<button",'<button data-op-step-action="voltar-etapa"'):'<span aria-hidden="true"></span>'}
        <div class="op-germinacao-step__bottom-right">
          ${P({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="cancel"')}
          ${P({text:o,variant:"primary",size:"sm"}).replace("<button",'<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `}function vr(){const e=Pn({title:"",compact:!0,multiple:!1,maxSizeLabel:"3MB",acceptedFormats:["image/png","image/svg+xml","application/msword","application/pdf"],className:"agendado-upload"});return`
    <form class="agendado-panel" data-agendado-form>
      <section class="agendado-section">
        <div class="agendado-semeio">
          <div class="agendado-semeio__field">
            <span class="agendado-semeio__label">
              <span class="agendado-semeio__icon">${h("calendar",{size:12})}</span>
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
          ${Mt()}
          ${sa()}
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
            ${re("Qtd. a Produzir","5.556")}
            ${re("Perda Estimada","556","+10%")}
            ${re("Qtd. solicitada","5.000")}
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
              ${re("Qtd. a Semear","5.556")}
              ${re("Perda Estimada","556","+10%")}
              ${re("Qtd. Esperada","5.000")}
            </div>
          </div>
          <div class="agendado-semeio-group">
            <div class="agendado-info-box__head">
              <span class="agendado-subtitle">Porta-enxerto</span>
              <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong></span>
            </div>
            <div class="agendado-kpis">
              ${re("Qtd. a Semear","5.556")}
              ${re("Perda Estimada","556","+10%")}
              ${re("Qtd. Esperada","5.000")}
            </div>
          </div>
        </div>
      </section>

      <section class="agendado-section">
        <div class="agendado-section__header">
          <h3 class="agendado-title">Lotes de Sementes Utilizados</h3>
          ${P({text:"+ Adicionar Lote",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="add-lote"')}
        </div>
        <div class="agendado-card">
          <div class="agendado-grid agendado-grid--two">
            <div class="agendado-grid-col--full">
              ${le({id:"agendado-tipo",label:"Tipo",name:"tipo",placeholder:"Selecione",items:[{label:"Enxerto",value:"enxerto"}]})}
            </div>
            ${D({id:"agendado-classe",label:"Classe",name:"classe",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${D({id:"agendado-cod-produto",label:"Código do Produto",name:"codigoProduto",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${D({id:"agendado-produto",label:"Produto",name:"produto",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${D({id:"agendado-unidade",label:"Unidade",name:"unidade",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${D({id:"agendado-cod-lote",label:"Código do Lote",name:"codigoLote",value:"5kg"})}
            ${D({id:"agendado-fornecedor",label:"Fornecedor",name:"fornecedor",value:"95%"})}
            ${D({id:"agendado-embalagem",label:"Embalagem",name:"embalagem",value:"Clone AEC 144"})}
            ${D({id:"agendado-quantidade",label:"Quantidade",name:"quantidade",value:"10"})}
          </div>
          <div class="agendado-upload-wrap">
            <span class="agendado-field-label">Anexa imagem do lote</span>
            ${e}
            ${Sr()}
          </div>
          ${D({id:"agendado-responsavel-coleta",label:"Responsável coleta da semente",name:"responsavelColeta",value:"João da Silva"})}
          <div class="agendado-grid agendado-grid--two">
            ${D({id:"agendado-responsavel-entrega",label:"Responsável entrega da semente",name:"responsavelEntrega",placeholder:"Nome do responsável"})}
            ${D({id:"agendado-data-hora-entrega",label:"Data/Hora de entrega da semente",name:"dataHoraEntrega",placeholder:"Nome do responsável"})}
          </div>
          <div class="agendado-card__actions">
            ${$r()}
            ${P({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="cancel-lote"')}
            ${P({text:"Salvar",variant:"primary",size:"sm"}).replace("<button",'<button data-agendado-action="save-lote"')}
          </div>
        </div>
      </section>

      <section class="agendado-section">
        ${zt("Enxerto","10.000",{collapsed:!0,showTable:!1})}
        ${zt("Porta-enxerto","15.000",{collapsed:!1,showTable:!0})}
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link">Consultar localização</button>
            </div>
            ${fa({id:"agendado-localizacao",required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${D({id:"agendado-data-encerramento",type:"date",label:"Data encerramento da etapa",required:!0,name:"dataEncerramento",className:"agendado-date-field",iconRight:h("calendar",{size:16})})}
          ${D({id:"agendado-responsavel",label:"Responsável",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
          <div class="agendado-consultar-wrap">
            ${P({text:"+ Consultar agenda",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="consult-agenda"')}
          </div>
        </div>
        <div class="agendado-bottom-actions">
          ${Mt()}
        </div>
      </section>
    </form>
  `}function gr(){return`
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
              ${J("Data do Pedido","15/01/2025")}
              ${J("Data Agendada do Semeio","15/01/2025")}
              ${J("Responsável agendamento","João da Silva")}
            </div>
          </div>
          <div class="agendado-details-actions">
            ${sa().replace("<button",'<button data-agendado-action="details-qr"')}
          </div>
        </section>

        <section class="agendado-section">
          <h3 class="agendado-title">Informações Gerais</h3>
          <div class="agendado-details-card">
            <div class="agendado-details-grid agendado-details-grid--three">
              ${J("Cód. do Pedido","001")}
              ${J("Referência","43242343")}
              ${J("Cód. Tawros","001")}

              ${J("Cód. do Cliente","001")}
              ${J("CPF/CNPJ","123.456.789-00")}
              ${J("Razão Social/Nome","Nome da razao social")}

              ${J("Nome Fantasia/Apelido","Nome fantasia")}
              ${J("Cidade/UF","São Paulo-SP")}
              ${J("Nome do Vendedor","Nome vendedor")}
            </div>

            <div class="agendado-details-field agendado-details-field--full">
              <span class="agendado-details-field__label">Classe</span>
              <strong class="agendado-details-field__value">Muda de Eucalipto Clone AEC 144</strong>
            </div>

            <div class="agendado-details-grid agendado-details-grid--three">
              ${J("Cód. do Produto","432243432")}
              ${J("Produto","Muda de Eucalipto Clone")}
              ${J("Quantidade","5.000")}
            </div>
          </div>

          <div class="agendado-details-accordion" data-agendado-details-accordion>
            <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
              <span class="agendado-details-accordion__icon" aria-hidden="true">${h("chevron-right",{size:12})}</span>
              <span>Observações</span>
            </button>
            <div class="agendado-details-accordion__content">
              Hoje, durante a caminhada no parque, notei que as flores estavam mais vibrantes do que nunca. O aroma doce das rosas misturava-se com o frescor do ar, criando uma atmosfera encantadora. Além disso, vi um grupo de crianças brincando e rindo, o que trouxe um sorriso ao meu rosto. Foi um momento perfeito para refletir e apreciar a beleza da natureza.
            </div>
          </div>

          <div class="agendado-details-actions">
            ${P({text:"Ver pedido",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="details-view-order"')}
          </div>
        </section>
      </div>

      <div class="agendado-details-panel" data-agendado-details-panel="producao">${fr()}</div>
      <div class="agendado-details-panel" data-agendado-details-panel="expedicao"><div class="agendado-placeholder">Em construção</div></div>
      <div class="agendado-details-panel" data-agendado-details-panel="operacoes"><div class="agendado-placeholder">Em construção</div></div>
      <div class="agendado-details-panel" data-agendado-details-panel="historico"><div class="agendado-placeholder">Em construção</div></div>
    </section>
  `}function fr(){const e=[{stockDate:"12/01/2025",responsible:"Viktor Dantas"},{stockDate:"12/01/2025",responsible:"Viktor Dantas"}],a=[{tray:"Descrição Bandeja",quantity:"1000",responsible:"Viktor Dantas"},{tray:"Descrição Bandeja",quantity:"1000",responsible:"Viktor Dantas"}],t=["Germinação","Casa de Vegetação","Sala de Corte","Sala de Fusão","Adaptação"];return`
    <section class="agendado-details-production">
      <h3 class="agendado-title">Informações da Produção</h3>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle data-agendado-open-germinacao="true">
          <span class="agendado-details-accordion__icon" aria-hidden="true">${h("chevron-right",{size:12})}</span>
          <span>Semeio</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__grid agendado-details-production__grid--two">
            ${J("Data agendada de semeio","12/01/2025")}
            ${J("Responsável do agendamento","Viktor Dantas")}
            ${J("Data de semeio","12/01/2025")}
            ${J("Responsável do semeio","Viktor Dantas")}
          </div>
          <div class="agendado-details-production__line">
            ${J("Localização","Sala de Semeio")}
          </div>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${h("chevron-right",{size:12})}</span>
          <span>Produto Final</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__grid agendado-details-production__grid--two">
            ${J("Quantidade de Produto","5.000")}
            ${J("Estimativa (+5% Germinação)","5.250")}
          </div>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${h("chevron-right",{size:12})}</span>
          <span>Sementes</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__grid agendado-details-production__grid--two">
            ${J("Quantidade de Mudas Enxerto","5.000")}
            ${J("Estimativa (+5% Germinação)","5.250")}
            ${J("Quantidade de Mudas Porta-enxerto","5.000")}
            ${J("Estimativa (+5% Germinação)","5.250")}
          </div>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${h("chevron-right",{size:12})}</span>
          <span>Informações de Lote de Sementes</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__lots">
            ${e.map(n=>br(n)).join("")}
          </div>
          <button type="button" class="agendado-termo-btn">
            ${h("file",{size:14})}
            <span>Termo de Retirada</span>
          </button>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${h("chevron-right",{size:12})}</span>
          <span>Informações de Insumos</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__supplies">
            ${a.map(n=>_r(n)).join("")}
          </div>
        </div>
      </div>

      ${t.map(n=>hr(n)).join("")}
    </section>
  `}function br(e){return`
    <article class="agendado-details-production__lot">
      <span class="agendado-details-production__lot-title">Lote de Sementes Utilizado</span>
      <span class="agendado-details-production__lot-meta">Fornecedor - Código do lote - Descrição - Qtd</span>
      <div class="agendado-details-production__grid agendado-details-production__grid--lot">
        ${J("Data de retirada do estoque",e.stockDate)}
        ${J("Responsável retirada",e.responsible)}
        <div class="agendado-details-field">
          <span class="agendado-details-field__label">Foto</span>
          <span class="agendado-details-production__photo">
            <img src="/assets/arquivo.png" alt="" aria-hidden="true" />
            <button type="button" class="agendado-details-production__link" data-agendado-action="details-view-image">Visualizar imagem</button>
          </span>
        </div>
      </div>
    </article>
  `}function _r(e){return`
    <article class="agendado-details-production__supply">
      <div class="agendado-details-production__grid agendado-details-production__grid--supplies">
        ${J("Bandeja",e.tray)}
        ${J("Quantidade",e.quantity)}
        ${J("Responsável da retirada",e.responsible)}
      </div>
    </article>
  `}function hr(e){return`
    <div class="agendado-details-accordion is-collapsed" data-agendado-details-accordion>
      <button type="button" class="agendado-details-accordion__header" aria-expanded="false" data-agendado-details-toggle>
        <span class="agendado-details-accordion__icon" aria-hidden="true">${h("chevron-right",{size:12})}</span>
        <span>${e}</span>
      </button>
      <div class="agendado-details-production__stage-caption">Detalhes</div>
      <div class="agendado-details-accordion__content agendado-details-production__content">
        <div class="agendado-placeholder">Em construção</div>
      </div>
    </div>
  `}function yr(){const e=[{title:"Dias após o Semeio",period:"23/01/2025",days:"10 dias"},{title:"Dias na Germinação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Casa de Vegetação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Sala de Corte",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Sala de Fusão",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Adaptação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Casa de Vegetação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias em Expedição",period:"23/01/2025 - 23/01/2025",days:"15 dias"}],a=[{title:"Criação da Ordem de Produção",responsible:"André Cesairni",date:"23/01/2025"},{title:"Criação da Ordem de Produção",responsible:"André Cesairni",date:"23/01/2025",daysAfterSowing:"0 Dias"},{title:"Criação da Ordem de Produção",responsible:"André Cesairni",date:"23/01/2025"},{title:"Criação da Ordem de Produção",responsible:"André Cesairni",date:"23/01/2025",daysAfterSowing:"0 Dias"},{title:"Criação da Ordem de Produção",responsible:"André Cesairni",date:"23/01/2025",daysAfterSowing:"0 Dias"}];return`
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
                <span class="agendado-cycle-forecast__icon" aria-hidden="true">${h("clock",{size:14})}</span>
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
                  <span class="agendado-cycle-forecast__date-icon" aria-hidden="true">${h("calendar",{size:14})}</span>
                  <span>Data Abertura: <strong>12/12/2026</strong></span>
                </div>
                <div class="agendado-cycle-forecast__date">
                  <span class="agendado-cycle-forecast__date-icon" aria-hidden="true">${h("calendar",{size:14})}</span>
                  <span>Previsão Término: <strong>12/12/2026</strong></span>
                </div>
              </div>
            </article>
          </section>

          <section class="agendado-section">
            <h3 class="agendado-title">Etapas do Ciclo</h3>
            <div class="agendado-cycle-steps" aria-label="Etapas do ciclo">
              ${e.map(t=>kr(t)).join("")}
            </div>
          </section>
        </div>
      </div>

      <div class="agendado-cycle-panel" data-agendado-cycle-panel="linha-do-tempo">
        <div class="agendado-cycle-content">
          <section class="agendado-section agendado-cycle-timeline">
            <h3 class="agendado-title">Linha do Tempo</h3>
            <div class="timeline-card" aria-label="Linha do tempo do ciclo">
              ${a.map(t=>wr(t)).join("")}
            </div>
          </section>
        </div>
      </div>
    </section>
  `}function kr(e){return`
    <article class="agendado-cycle-step">
      <div class="agendado-cycle-step__main">
        <strong class="agendado-cycle-step__title">${e.title}</strong>
        <span class="agendado-cycle-step__period">${e.period}</span>
      </div>
      <strong class="agendado-cycle-step__days">${e.days}</strong>
    </article>
  `}function wr(e){return`
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
  `}function J(e,a){return`
    <div class="agendado-details-field">
      <span class="agendado-details-field__label">${e}</span>
      <strong class="agendado-details-field__value">${a}</strong>
    </div>
  `}function Mt(){return`
    <button type="button" class="agendado-reagendar-btn" data-agendado-action="reagendar">
      ${h("calendar",{size:18})}
      <span>Reagendar</span>
    </button>
  `}function sa(){return`
    <button type="button" class="agendado-qr-btn">
      <img src="/assets/qrcode.png" alt="" aria-hidden="true" />
      <span>Gerar QR Code</span>
    </button>
  `}function $r(){return`
    <button type="button" class="agendado-termo-btn">
      ${h("file",{size:14})}
      <span>Termo de Retirada</span>
    </button>
  `}function Sr(){return`
    <div class="agendado-upload-preview" aria-label="Arquivo anexado">
      <img src="/assets/arquivo.png" alt="" aria-hidden="true" class="agendado-upload-preview__thumb" />
      <div class="agendado-upload-preview__content">
        <strong class="agendado-upload-preview__name">File name.ext</strong>
        <span class="agendado-upload-preview__status">Upload complete.</span>
      </div>
      <div class="agendado-upload-preview__actions agendado-icon-actions">
        <button type="button" aria-label="Visualizar">${h("eye",{size:16})}</button>
        <button type="button" aria-label="Excluir">${h("trash",{size:16})}</button>
      </div>
    </div>
  `}function re(e,a,t=""){return`
    <div class="agendado-kpi">
      <span class="agendado-kpi__label">${e}${t?` <em>${t}</em>`:""}</span>
      <strong class="agendado-kpi__value">${a}</strong>
    </div>
  `}function zt(e,a,t={}){const{collapsed:n=!1,showTable:o=!0}=t,d=n?"is-collapsed":"is-expanded",s=`agendado-cultura-${e.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`;return`
    <div class="agendado-table-group">
      <span class="agendado-subtitle">${e}</span>
      <div class="agendado-table-block ${n?"agendado-table-block--collapsed":""}">
        <div class="agendado-table-block__subheader">
          <span class="agendado-table-block__caret ${d}" aria-hidden="true">${h("chevron-right",{size:12})}</span>
          <label class="sr-only" for="${s}">Selecionar cultura</label>
          <select id="${s}" class="agendado-table-block__culture-select">
            <option value="x-y">Cultura: X - Cultivar: Y</option>
            <option value="x-z">Cultura: X - Cultivar: Z</option>
            <option value="y-a">Cultura: Y - Cultivar: A</option>
          </select>
          <span class="agendado-table-block__total">Total: ${a}</span>
        </div>
        ${o?`
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
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${za()}</td></tr>
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${za()}</td></tr>
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${za()}</td></tr>
            </tbody>
          </table>
        </div>`:""}
      </div>
    </div>
  `}function za(){return`
    <div class="agendado-table-actions agendado-icon-actions">
      <button type="button" aria-label="Editar">${h("edit",{size:14})}</button>
      <button type="button" aria-label="Excluir">${h("trash",{size:14})}</button>
      <button type="button" aria-label="Visualizar">${h("eye",{size:14})}</button>
    </div>
  `}function Cr(){return`
    <div class="agendado-footer">
      ${P({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="cancel"')}
      ${P({text:"Iniciar Semeio",variant:"primary",size:"sm"}).replace("<button",'<button data-agendado-action="start-semeio"')}
    </div>
  `}function Er(){const e=document.getElementById("kanban-board");if(!e)return()=>{};const a="kanban-pedido-details-drawer",t=document.querySelector(`[data-drawer="${a}"]`),n=document.querySelector(`[data-drawer-backdrop="${a}"]`);t&&t.remove(),n&&n.remove(),document.body.insertAdjacentHTML("beforeend",Ee({id:a,title:"Detalhes do Pedido",width:600,content:'<section class="orders-details-drawer"></section>',footer:Bt()}));const o="kanban-replan-item-modal";let d=()=>{},s=null;const r="kanban-cancel-order-items-modal";let i=()=>{},v=null;function y({restoreFocus:l=!0}={}){const b=document.querySelector(`[data-modal="${o}"]`),m=document.querySelector(`[data-modal-backdrop="${o}"]`);!b||!m||(d(),we(o),document.querySelector(`[data-drawer="${a}"]`)?.classList.contains("is-open")&&(document.body.style.overflow="hidden"),b.remove(),m.remove(),l&&s?.focus&&s.focus(),s=null)}function c({anchorEl:l=null,orderItemId:b=""}={}){y({restoreFocus:!1}),s=l,document.body.insertAdjacentHTML("beforeend",Rr({modalId:o,orderItemId:b}));const m=document.querySelector(`[data-modal="${o}"]`),S=document.querySelector(`[data-modal-backdrop="${o}"]`);if(!m||!S)return;const k=ye(m),C=m.querySelector("[data-modal-close]"),q=m.querySelector('[data-replan-action="cancel"]'),z=m.querySelector('[data-replan-action="confirm"]'),w=m.querySelector("#replan-reason"),g=m.querySelector("#replan-op"),x=(Q,te="Campo obrigatório.")=>{const ve=m.querySelector(`[data-replan-error="${Q}"]`),Y=m.querySelector(`[data-replan-field="${Q}"] .field`);Y&&Y.classList.add("field--error"),ve&&(ve.textContent=te,ve.hidden=!1)},N=Q=>{const te=m.querySelector(`[data-replan-error="${Q}"]`),ve=m.querySelector(`[data-replan-field="${Q}"] .field`);ve&&ve.classList.remove("field--error"),te&&(te.hidden=!0)},K=()=>{N("reason"),N("op");let Q=!0;return w?.value||(x("reason"),Q=!1),g?.value||(x("op"),Q=!1),Q||(w?.value?g:w)?.focus?.(),Q},H=()=>y(),R=Q=>{Q.target===S&&y()},me=Q=>{Q.key==="Escape"&&(Q.preventDefault(),Q.stopPropagation(),y())},ne=()=>N("reason"),de=()=>N("op"),be=()=>{K()&&(ma("Replanejamento confirmado",{message:"O item foi marcado para replanejamento."}),y())};C?.addEventListener("click",H),q?.addEventListener("click",H),z?.addEventListener("click",be),S.addEventListener("click",R),document.addEventListener("keydown",me,!0),w?.addEventListener("change",ne),g?.addEventListener("change",de),d=()=>{C?.removeEventListener("click",H),q?.removeEventListener("click",H),z?.removeEventListener("click",be),S.removeEventListener("click",R),document.removeEventListener("keydown",me,!0),w?.removeEventListener("change",ne),g?.removeEventListener("change",de),typeof k=="function"&&k(),d=()=>{}},$e(o),setTimeout(()=>{w?.focus?.()},120)}function u({restoreFocus:l=!0}={}){const b=document.querySelector(`[data-modal="${r}"]`),m=document.querySelector(`[data-modal-backdrop="${r}"]`);!b||!m||(i(),we(r),document.querySelector(`[data-drawer="${a}"]`)?.classList.contains("is-open")&&(document.body.style.overflow="hidden"),b.remove(),m.remove(),l&&v?.focus&&v.focus(),v=null)}function E({anchorEl:l=null,details:b=null}={}){u({restoreFocus:!1}),v=l,document.body.insertAdjacentHTML("beforeend",Br({modalId:r,items:b?.items||[]}));const m=document.querySelector(`[data-modal="${r}"]`),S=document.querySelector(`[data-modal-backdrop="${r}"]`);if(!m||!S)return;const k=m.querySelector("[data-modal-close]"),C=m.querySelector('[data-cancel-order-items-action="cancel"]'),q=m.querySelector('[data-cancel-order-items-action="confirm"]'),z=Array.from(m.querySelectorAll("[data-cancel-order-item-checkbox]")),w=()=>z.filter(R=>R instanceof HTMLInputElement&&R.checked).map(R=>R.value),g=()=>{q&&(q.disabled=w().length===0)},x=()=>u(),N=R=>{R.target===S&&u()},K=R=>{R.key==="Escape"&&(R.preventDefault(),R.stopPropagation(),u())},H=()=>{const R=w();if(!R.length)return;const me=Array.isArray(b?.items)?b.items.filter(ne=>R.includes(String(ne?.id))):[];console.log("Cancelar itens do pedido",{orderCode:b?.orderCode||"",items:me.map(ne=>({id:ne?.id||"",product:ne?.product||"",quantity:ne?.quantity||""}))}),u()};k?.addEventListener("click",x),C?.addEventListener("click",x),q?.addEventListener("click",H),S.addEventListener("click",N),document.addEventListener("keydown",K,!0),z.forEach(R=>{R.addEventListener("change",g)}),i=()=>{k?.removeEventListener("click",x),C?.removeEventListener("click",x),q?.removeEventListener("click",H),S.removeEventListener("click",N),document.removeEventListener("keydown",K,!0),z.forEach(R=>{R.removeEventListener("change",g)}),i=()=>{}},$e(r),g(),setTimeout(()=>{z[0]?.focus?.()},120)}const p=De({id:a,root:document,onClose:()=>{y({restoreFocus:!1}),Ke({restoreFocus:!1}),u({restoreFocus:!1})}}),$=document.querySelector(`[data-drawer="${a}"]`);if(!$||!p)return()=>{};const I=$.querySelector(".drawer__header"),A=$.querySelector("[data-drawer-title]"),M=$.querySelector("[data-drawer-close]"),T=$.querySelector(".drawer__body"),B=$.querySelector(".drawer__footer");if(!T||!B)return()=>{};const f={activeTab:0,currentDetails:null,drawerRules:null,selectedHistoryProduct:"",selectedPlanningProduct:"",showCanceledPlanning:!1,expandedPlanningByProduct:{}},G=l=>{if(!I||!M)return;let b=I.querySelector("[data-orders-header-badge]");b||(b=document.createElement("span"),b.className="orders-details-drawer__header-status",b.setAttribute("data-orders-header-badge",""),I.insertBefore(b,M)),b.innerHTML=Ie({text:l.billingStatus,variant:"success",style:"soft",size:"sm"})},O=l=>{if(!l)return;const b=Ya(l);f.currentDetails=l,f.drawerRules=b,f.activeTab=0,f.selectedHistoryProduct=l.items?.[0]?.id||"",f.selectedPlanningProduct=ga(l),f.showCanceledPlanning=!1,f.expandedPlanningByProduct={},Ia(f,l),A&&(A.textContent=l.companyName),G(l),T.innerHTML=qr(l,f),B.innerHTML=Bt(l,b)},j=l=>{const b=$.querySelector("#orders-details-tabs")?.closest("[data-tabs]"),m=b?.parentElement,S=b?.querySelectorAll(".tabs-tab"),k=m?.querySelectorAll(".tabs-panel");!S||!k||(S.forEach((C,q)=>{C.classList.toggle("is-active",q===l),C.setAttribute("aria-selected",String(q===l))}),k.forEach((C,q)=>{C.classList.toggle("is-active",q===l)}))},U=l=>{const b=l.target.closest(".kanban-card");if(b&&e.contains(b)){l.target.closest(".kanban-card__code")&&l.preventDefault();const z=It(b);O(z),p.open(b);return}const m=l.target.closest(".kanban-column__title");if(!m||!e.contains(m))return;const S=m.closest("[data-column-id]");if(!S)return;const k=Array.from(S.querySelectorAll(".kanban-card")).find(q=>q.offsetParent!==null&&!q.hasAttribute("hidden"))||S.querySelector(".kanban-card");if(!k)return;const C=It(k);O(C),p.open(k)},ce=l=>{const b=l.target.closest("[data-pedido-drawer-action]");if(b){const g=b.dataset.pedidoDrawerAction;if(g==="back"){p.close();return}if(g==="cancel-total"){console.log("Cancelar pedido total",f.currentDetails?.orderCode||"");return}if(g==="approve"){ma("Pedido aprovado",{message:`Pedido ${f.currentDetails?.orderCode||""} aprovado com sucesso.`});return}if(g==="send-approval"){ma("Pedido enviado para aprovação",{message:`Pedido ${f.currentDetails?.orderCode||""} encaminhado para aprovação.`});return}if(g==="close-planning"){console.log("Encerrar Planejamento",f.currentDetails?.orderCode||"");return}if(g==="cancel-order-items"){E({anchorEl:b,details:f.currentDetails});return}}const m=l.target.closest("[data-order-item-action]");if(m){const g=m.dataset.orderItemAction,x=m.closest("[data-order-item]"),N=x?x.dataset.orderItem:"";if(g==="plan"||g==="edit"){const K=f.currentDetails?.items?.find(H=>String(H.id)===String(N));lo({anchorEl:m,memoryKey:`${f.currentDetails?.orderCode||"pedido"}:${N||"item"}`,orderItem:{id:K?.id||"",product:K?.product||"Muda de Eucalipto Clone - MUD-001",totalPedido:K?.quantity||"5000",available:K?.availableQuantity||"5000",orderCode:f.currentDetails?.orderCode||""},onAddRow:H=>{go({details:f.currentDetails,item:K,planningData:H})}});return}if(g==="replan"){c({anchorEl:m,orderItemId:N});return}console.log(`Ação ${g} no item`,N);return}const S=l.target.closest("[data-order-item-toggle]");if(S){const g=S.closest("[data-order-item]");if(!g)return;const x=g.classList.toggle("is-collapsed");S.setAttribute("aria-expanded",String(!x)),S.setAttribute("aria-label",x?"Mostrar item":"Ocultar item");return}const k=l.target.closest("[data-order-planning-toggle]");if(k){const g=k.dataset.orderPlanningToggle||"";if(!g||!f.currentDetails)return;const x=f.selectedPlanningProduct||ga(f.currentDetails);if(!x)return;const N=new Set(f.expandedPlanningByProduct[x]||[]);N.has(g)?N.delete(g):N.add(g),f.expandedPlanningByProduct[x]=Array.from(N),Tt($,f.currentDetails,f);return}const C=l.target.closest("[data-order-item-plan-toggle]");if(C){const g=C.closest("[data-order-item-plan-row]");if(!g)return;const x=g.classList.toggle("is-collapsed");C.setAttribute("aria-expanded",String(!x)),C.setAttribute("aria-label",x?"Expandir detalhes":"Recolher detalhes");return}const q=l.target.closest("[data-order-planning-action]");if(q){const g=q.dataset.orderPlanningAction,x=q.dataset.planningId||"";g==="open-op"&&console.log("Acessar OP do planejamento",x);return}const z=l.target.closest("[data-order-summary-notes-toggle]");if(z){const g=z.closest(".orders-summary-notes");if(!g)return;const x=g.classList.toggle("is-collapsed");z.setAttribute("aria-expanded",String(!x)),z.setAttribute("aria-label",x?"Expandir observações":"Recolher observações");return}const w=l.target.closest("#orders-details-tabs .tabs-tab");if(w){const g=Number(w.dataset.tab);if(Number.isNaN(g))return;f.activeTab=g,j(g)}},L=l=>{const b=l.target;if(!(!(b instanceof HTMLSelectElement)&&!(b instanceof HTMLInputElement))){if(b instanceof HTMLInputElement&&b.dataset.ordersPlanningShowCanceled==="true"){f.showCanceledPlanning=b.checked,Ia(f,f.currentDetails),Tt($,f.currentDetails,f);return}if(b instanceof HTMLSelectElement){if(b.dataset.ordersPlanningProduct==="true"){f.selectedPlanningProduct=b.value||"",Ia(f,f.currentDetails),Ir($,f.currentDetails,f);return}b.dataset.ordersHistoryProduct==="true"&&(f.selectedHistoryProduct=b.value||"",xr($,f.currentDetails,f.selectedHistoryProduct))}}};return e.addEventListener("click",U),$.addEventListener("click",ce),$.addEventListener("change",L),()=>{y({restoreFocus:!1}),Ke({restoreFocus:!1}),u({restoreFocus:!1}),e.removeEventListener("click",U),$.removeEventListener("click",ce),$.removeEventListener("change",L),p.cleanup&&p.cleanup();const l=document.querySelector(`[data-drawer="${a}"]`),b=document.querySelector(`[data-drawer-backdrop="${a}"]`);l&&l.remove(),b&&b.remove()}}function It(e){const a=e.querySelector(".kanban-card__code")?.textContent?.trim()||"",t=e.querySelector(".kanban-card__subtitle")?.textContent?.trim()||"",n=e.closest("[data-column-id]"),o=String(n?.dataset?.columnId||"").trim().toLowerCase(),d=n?.querySelector(".kanban-column__title")?.textContent?.trim()||"Recebido",s=Lt[a]||Lt["A2W-2025-001"],r=JSON.parse(JSON.stringify(s)),i=ln({columnId:o,stageStatus:d}),y=r?.planningAvailableQty!==void 0&&r?.planningAvailableQty!==null?Ca(r?.planningAvailableQty):Dr(r?.items);return{...r,orderCode:a||"A2W-2025-001",subCode:t||"TG-45678",columnId:o,stageStatus:d,statusKey:i,planningAvailableQty:y,billingStatus:"Faturado"}}function Ge(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase()}function ln({columnId:e="",stageStatus:a=""}={}){const t=Ge(e),n=Ge(a),o={recebido:"received","aguardando-aprovacao":"awaiting-approval","em-preparacao":"in-preparation","em-producao":"in-production","em-expedicao":"in-shipping","em-transito":"in-transit",finalizado:"finalized",finalizados:"finalized"};if(o[t])return o[t];const d={recebido:"received","aguardando aprovacao":"awaiting-approval","em preparacao":"in-preparation","em producao":"in-production","em expedicao":"in-shipping","em transito":"in-transit",finalizado:"finalized",finalizados:"finalized"};return d[n]?d[n]:"default"}function Ca(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e!="string")return 0;const a=e.replace(/\./g,"").replace(",",".").replace(/[^\d.-]/g,""),t=Number(a);return Number.isFinite(t)?t:0}function Dr(e=[]){return Array.isArray(e)?e.reduce((a,t)=>{const n=Ca(t?.availableQuantity),o=Array.isArray(t?.planning)?t.planning.reduce((s,r)=>{const i=Ca(r?.amount);return r?.type==="planned"||r?.type==="canceled"?s+i:s},0):0,d=Math.max(0,n-o);return a+d},0):0}function Ya(e={}){const a=e?.statusKey||ln({columnId:e?.columnId,stageStatus:e?.stageStatus}),t=Ca(e?.planningAvailableQty),n={statusKey:a,hidePlanCancelButtons:!1,hideItemPlanningRows:!1,hideFooterCancelTotal:!1,replaceFooterCancelTotal:!1,footerPrimaryAction:null};return{received:{...n,hidePlanCancelButtons:!0,hideItemPlanningRows:!0,footerPrimaryAction:{key:"send-approval",label:"Enviar para Aprovação",disabled:!1}},"awaiting-approval":{...n,hidePlanCancelButtons:!0,hideItemPlanningRows:!0,footerPrimaryAction:{key:"approve",label:"Aprovar",disabled:!1}},"in-preparation":{...n,footerPrimaryAction:{key:"close-planning",label:"Encerrar Planejamento",disabled:t>0}},"in-production":{...n,hidePlanCancelButtons:!0,replaceFooterCancelTotal:!0,footerPrimaryAction:{key:"cancel-order-items",label:"Cancelar Itens do Pedido",disabled:!1}},"in-shipping":{...n,hidePlanCancelButtons:!0,hideFooterCancelTotal:!0},"in-transit":{...n,hidePlanCancelButtons:!0,hideFooterCancelTotal:!0},finalized:{...n,hidePlanCancelButtons:!0,hideFooterCancelTotal:!0}}[a]||n}function qr(e,a){const t=a?.activeTab||0,n=a?.selectedHistoryProduct||"",o=a?.drawerRules||Ya(e),d=Ea({id:"orders-details-tabs",variant:"underlined",fullWidth:!0,activeTab:t,tabs:[{label:"Informações gerais",content:Tr(e,o)},{label:"Histórico",content:Lr(e,n)},{label:"Planejamento",content:Mr(e,a)}]});return`
    <section class="orders-details-drawer">
      <div class="orders-details-drawer__meta">
        <a href="#" class="orders-details-drawer__order-code">${e.orderCode}</a>
        <span class="orders-details-drawer__dot" aria-hidden="true">•</span>
        <span class="orders-details-drawer__subcode">${e.subCode}</span>
        <span class="orders-details-drawer__stage">${Ie({text:e.stageStatus,variant:"light",style:"soft",size:"sm"})}</span>
      </div>
      ${d}
    </section>
  `}function Lr(e,a=""){const t=(e?.items||[]).map(o=>({value:o.id,label:o.product})),n=a||t[0]?.value||"";return`
    <section class="orders-history" data-orders-history>
      <div class="orders-history__filter">
        ${le({id:`orders-history-product-${e?.orderCode||"default"}`,placeholder:"Selecione um produto",items:t,value:n,className:"orders-history__product-select"}).replace("<select ",'<select data-orders-history-product="true" ')}
      </div>
      ${cn(e,n)}
      <section class="orders-history__timeline-wrap">
        <h3 class="orders-history__title">Histórico do Pedido</h3>
        <div class="orders-history__timeline" data-orders-history-events>
          ${un(e,n)}
        </div>
      </section>
    </section>
  `}function cn(e,a=""){const t=(e?.items||[]).find(n=>n.id===a)||e?.items?.[0];return`
    <article class="orders-history__summary">
      <div class="orders-history__summary-item">
        <span class="orders-history__summary-label">Produto</span>
        <strong class="orders-history__summary-value">${t?.product||"-"}</strong>
      </div>
      <div class="orders-history__summary-item">
        <span class="orders-history__summary-label">Total Pedido:</span>
        <strong class="orders-history__summary-value">${t?.quantity||"-"}</strong>
      </div>
    </article>
  `}function Pr(e,a=""){const t=e?.orderCode||"",n=uo[t];if(!n)return[];const o=e?.items?.[0]?.id||"",d=a||o,s=n[d];if(!Array.isArray(s))return[];const r=c=>{const u=Ge(c?.title),E=Ge(c?.badgeType);return u==="pedido recebido"||E==="inicio"},i=c=>({id:`evt-awaiting-approval-${d||"default"}`,title:"Pedido aguardando aprovação",date:c?.date||"-",description:`Pedido ${t||""} aguardando aprovação do responsável.`,badgeLabel:"Operação",badgeType:"operacao",metaRole:"Responsável",metaName:"Aguardando confirmação"}),v=c=>({id:`evt-in-transit-${d||"default"}`,title:"Pedido em trânsito",date:c?.date||"-",description:`Pedido ${t||""} em trânsito para entrega.`,badgeLabel:"Operação",badgeType:"operacao",metaRole:"Responsável",metaName:"Transporte em andamento"}),y=c=>({id:`evt-finalized-${d||"default"}`,title:"Pedido finalizado",date:c?.date||"-",description:`Pedido ${t||""} finalizado com entrega concluída.`,badgeLabel:"Sucesso",badgeType:"sucesso",metaRole:"Responsável",metaName:"Entrega concluída"});if(e?.statusKey==="received")return s.filter(c=>r(c));if(e?.statusKey==="awaiting-approval"){const c=s.find(E=>r(E)),u=i(c);return c?[u,c]:[u]}if(e?.statusKey==="in-preparation"){const c=s.find($=>r($)),u=i(c),p=s.filter($=>{const I=Ge($?.title),A=Ge($?.badgeType);return I.startsWith("planejamento realizado")||A==="planejamento"||(I==="item cancelado"||A==="cancelado")||r($)}).filter($=>!r($));return u&&p.push(u),c&&p.push(c),p}if(e?.statusKey==="in-production")return s.filter(c=>!Ge(c?.title).startsWith("lote pronto para entrega"));if(e?.statusKey==="in-transit"){const c=s.find(p=>r(p)),u=s[0]||c;return[v(u),...s]}if(e?.statusKey==="finalized"){const c=s.find($=>r($)),u=s[0]||c,E=v(u);return[y(u),E,...s]}return s}function un(e,a=""){const t=Pr(e,a);return t.length?t.map(n=>Ar(n)).join(""):`
      <div class="orders-history__empty">
        Sem eventos para este produto.
      </div>
    `}function Ar(e){return`
    <article class="orders-history-item">
      <div class="orders-history-item__marker" aria-hidden="true">
        <span class="orders-history-item__dot orders-history-item__dot--${e.badgeType}"></span>
        <span class="orders-history-item__line"></span>
      </div>
      <div class="orders-history-item__content">
        <div class="orders-history-item__head">
          <strong class="orders-history-item__title">${e.title}</strong>
          <span class="orders-history-item__badge orders-history-item__badge--${e.badgeType}">
            ${Ie({text:e.badgeLabel,variant:"light",style:"soft",size:"sm"})}
          </span>
        </div>
        <span class="orders-history-item__date">${e.date}</span>
        <p class="orders-history-item__description">${e.description}</p>
        <span class="orders-history-item__meta">
          ${h("user",{size:12})}
          <span>${e.metaRole}: ${e.metaName}</span>
        </span>
      </div>
    </article>
  `}function xr(e,a,t=""){if(!e||!a)return;const n=e.querySelector("[data-orders-history]"),o=n?.querySelector(".orders-history__summary"),d=n?.querySelector("[data-orders-history-events]");!o||!d||(o.outerHTML=cn(a,t),d.innerHTML=un(a,t))}function pa(e){const a=Number(e);return Number.isFinite(a)?a.toLocaleString("pt-BR"):"0"}function qa(e){const a=e?.orderCode||"";return Pt[a]||Pt["A2W-2025-001"]}function ga(e){return qa(e)?.products?.[0]?.id||""}function pn(e,a=""){const t=qa(e);return t?.products?.find(n=>n.id===a)||t?.products?.[0]||null}function mn(e,a=""){const t=qa(e),n=pn(e,a),o=n?t?.byProduct?.[n.id]:null;return{selectedProduct:n,metrics:o?.metrics||{total:0,planned:0,canceled:0,pending:0},plans:Array.isArray(o?.plans)?o.plans:[]}}function vn(e,a="",t=!1){const{plans:n}=mn(e,a);return t?n:n.filter(o=>o.status!=="cancelado")}function Ia(e,a){if(!e||!a)return;const t=e.selectedPlanningProduct||ga(a);if(!t)return;e.selectedPlanningProduct=t;const n=vn(a,t,e.showCanceledPlanning),o=new Set(n.map(s=>s.id)),d=(e.expandedPlanningByProduct[t]||[]).filter(s=>o.has(s));if(!d.length&&n[0]){e.expandedPlanningByProduct[t]=[n[0].id];return}e.expandedPlanningByProduct[t]=d}function Mr(e,a={}){const t=qa(e),n=a?.selectedPlanningProduct||t?.products?.[0]?.id||"",o=!!a?.showCanceledPlanning,d=(t?.products||[]).map(i=>({value:i.id,label:i.label})),s=le({id:`orders-planning-product-${e?.orderCode||"default"}`,placeholder:"Selecione um produto",items:d,value:n}).replace("<select ",'<select data-orders-planning-product="true" '),r=Rt({id:`orders-planning-show-canceled-${e?.orderCode||"default"}`,checked:o,size:"sm"}).replace('class="toggle-input"','class="toggle-input" data-orders-planning-show-canceled="true"');return`
    <section class="orders-planning" data-orders-planning>
      <div class="orders-planning__filters">
        <div class="orders-planning__filters-main">
          ${s}
        </div>
        <label class="orders-planning__toggle-wrap">
          <span class="orders-planning__toggle-label">Ver Cancelados</span>
          ${r}
        </label>
      </div>
      <div class="orders-planning__selected-product" data-orders-planning-product-caption>
        ${gn(e,n)}
      </div>
      <section class="orders-planning__log">
        <h3 class="orders-planning__title">Log de Planejamento</h3>
        <p class="orders-planning__subtitle">Histórico de todas as ações de planejamento realizadas para este pedido</p>
      </section>
      <div class="orders-planning__metrics" data-orders-planning-metrics>
        ${fn(e,n)}
      </div>
      <section class="orders-planning__list-wrap" data-orders-planning-list-wrap>
        ${Za(e,a)}
      </section>
    </section>
  `}function gn(e,a=""){return`
    <span class="orders-planning__caption-label">Produto</span>
    <strong class="orders-planning__caption-value">${pn(e,a)?.label||"-"}</strong>
  `}function fn(e,a=""){const{metrics:t}=mn(e,a);return[{label:"Qtd. Total do Pedido",value:pa(t.total),tone:"default"},{label:"Qtd. Planejada",value:pa(t.planned),tone:"primary"},{label:"Qtd. Cancelada",value:pa(t.canceled),tone:"primary"},{label:"Qtd. Pendente",value:pa(t.pending),tone:"warning"}].map(o=>`
    <div class="orders-planning-metric">
      <span class="orders-planning-metric__label">${o.label}</span>
      <strong class="orders-planning-metric__value orders-planning-metric__value--${o.tone}">${o.value}</strong>
    </div>
  `).join("")}function Za(e,a={}){const t=a?.selectedPlanningProduct||ga(e),n=!!a?.showCanceledPlanning,o=vn(e,t,n),d=new Set(a?.expandedPlanningByProduct?.[t]||[]);return`
    <h3 class="orders-planning__list-title">Planejamentos Realizados (${o.length})</h3>
    <div class="orders-planning__list" data-orders-planning-list>
      ${o.length?o.map(s=>zr(s,d.has(s.id))).join(""):'<div class="orders-planning__empty">Nenhum planejamento encontrado para este filtro.</div>'}
    </div>
  `}function zr(e,a=!1){return`
    <article class="orders-planning-item ${e.status==="cancelado"?"is-canceled":""}">
      <div class="orders-planning-item__header">
        <div class="orders-planning-item__title-wrap">
          <strong class="orders-planning-item__op">${e.op}</strong>
          ${Ie({text:e.stage,variant:"light",style:"soft",size:"sm"})}
        </div>
        <strong class="orders-planning-item__quantity">${pa(e.quantity)} un.</strong>
      </div>
      <p class="orders-planning-item__product">${e.product}</p>
      <button type="button" class="orders-planning-item__toggle" data-order-planning-toggle="${e.id}" aria-expanded="${a?"true":"false"}">
        <span>Ver detalhes</span>
        ${h("chevron-down",{size:22})}
      </button>
      <div class="orders-planning-item__details ${a?"is-open":""}">
        <div class="orders-planning-item__details-grid">
          <div><span class="orders-planning-item__label">Data do Planejamento</span><strong>${e.planningDate}</strong></div>
          <div><span class="orders-planning-item__label">Previsão de Entrega</span><strong>${e.deliveryDate}</strong></div>
          <div><span class="orders-planning-item__label">Data de Semeio</span><strong>${e.sowingDate}</strong></div>
          <div><span class="orders-planning-item__label">Dias após Semeio</span><strong>${e.daysAfterSowing}</strong></div>
          <div><span class="orders-planning-item__label">Responsável</span><strong>${e.responsible}</strong></div>
          <div class="orders-planning-item__actions">
            ${P({text:"Acessar OP",variant:"ghost",size:"sm",iconRight:"external-link"}).replace("<button",`<button data-order-planning-action="open-op" data-planning-id="${e.id}"`)}
          </div>
        </div>
      </div>
    </article>
  `}function Ir(e,a,t={}){if(!e||!a)return;const n=e.querySelector("[data-orders-planning]"),o=n?.querySelector("[data-orders-planning-product-caption]"),d=n?.querySelector("[data-orders-planning-metrics]"),s=n?.querySelector("[data-orders-planning-list-wrap]");if(!o||!d||!s)return;const r=t.selectedPlanningProduct||ga(a);o.innerHTML=gn(a,r),d.innerHTML=fn(a,r),s.innerHTML=Za(a,t)}function Tt(e,a,t={}){if(!e||!a)return;const o=e.querySelector("[data-orders-planning]")?.querySelector("[data-orders-planning-list-wrap]");o&&(o.innerHTML=Za(a,t))}function Tr(e,a={}){return`
    <div class="orders-details-info">
      <section class="orders-details-section">
        <h3 class="orders-details-section__title">
          ${h("user",{size:14})}
          Informações do Cliente
        </h3>
        ${Nr(e.client)}
      </section>
      <section class="orders-details-section">
        <h3 class="orders-details-section__title">
          ${h("package",{size:14})}
          Itens do Pedido & Planejamento
        </h3>
        ${Fr(e.items,{hidePlanCancelButtons:a?.hidePlanCancelButtons,hideReplanButtons:a?.statusKey==="in-transit"||a?.statusKey==="finalized",hideItemPlanningRows:a?.hideItemPlanningRows})}
      </section>
      <section class="orders-details-section">
        <h3 class="orders-details-section__title">Resumo do Pedido</h3>
        ${Or(e.summary)}
      </section>
      <div class="orders-details-info__term-wrap">
        ${P({text:"Gerar Termo de Aceite",variant:"info",style:"soft",size:"sm",iconLeft:"download"})}
      </div>
    </div>
  `}function Br({modalId:e="kanban-cancel-order-items-modal",items:a=[]}={}){const n=(Array.isArray(a)?a:[]).map((o,d)=>{const s=String(o?.id||`item-${d+1}`),r=`cancel-order-item-${s}`,i=String(o?.product||"Item sem descrição"),v=o?.quantity?`Qtd.: ${o.quantity}`:"";return`
      <label class="cancel-order-items-modal__item" for="${r}">
        <input
          id="${r}"
          type="checkbox"
          class="cancel-order-items-modal__checkbox"
          data-cancel-order-item-checkbox
          value="${s}"
        />
        <span class="cancel-order-items-modal__item-content">
          <strong class="cancel-order-items-modal__item-title">${i}</strong>
          ${v?`<span class="cancel-order-items-modal__item-meta">${v}</span>`:""}
        </span>
      </label>
    `}).join("");return Pe({id:e,title:"Cancelar Itens do Pedido",size:"md",className:"cancel-order-items-modal",body:`
      <div class="cancel-order-items-modal__content">
        <p class="cancel-order-items-modal__description">Selecione os itens que deseja cancelar.</p>
        <div class="cancel-order-items-modal__list">
          ${n||'<p class="cancel-order-items-modal__empty">Nenhum item disponível para cancelamento.</p>'}
        </div>
      </div>
    `,footer:`
      <div class="cancel-order-items-modal__footer">
        ${P({text:"Cancelar",style:"outline",variant:"dark",size:"sm"}).replace("<button ",'<button data-cancel-order-items-action="cancel" ')}
        ${P({text:"Confirmar cancelamento",variant:"primary",size:"sm",disabled:!0}).replace("<button ",'<button data-cancel-order-items-action="confirm" ')}
      </div>
    `})}function Rr({modalId:e="kanban-replan-item-modal",orderItemId:a=""}={}){const t=[{value:"falta-insumo",label:"Falta de insumo"},{value:"erro-planejamento",label:"Erro no planejamento"},{value:"capacidade",label:"Capacidade"},{value:"cliente-alterou",label:"Cliente alterou pedido"}],n=[{value:"estoque-venda-direta",label:"Estoque (Venda Direta)"},{value:"remessa-futura",label:"Remessa Futura"},{value:"vincular-ordem-producao",label:"Vincular Ordem de Produção"}];return Pe({id:e,title:"Replanejar Item",size:"md",className:"replan-modal",body:`
      <div class="replan-modal__content" data-replan-item="${a}">
        <div class="replan-modal__info">
          <span class="replan-modal__info-icon" aria-hidden="true">${h("info",{size:14})}</span>
          <p class="replan-modal__info-text">
            Este item foi cancelado da produção anterior. Informe o motivo e vincule a uma nova Ordem de Produção se necessário.
          </p>
        </div>

        <div class="replan-modal__field-wrap" data-replan-field="reason">
          ${le({id:"replan-reason",label:"Motivo do Replanejamento",required:!0,placeholder:"Selecionar...",items:t})}
          <span class="replan-modal__error" data-replan-error="reason" hidden>Campo obrigatório.</span>
        </div>

        <div class="replan-modal__field-wrap">
          ${Dn({id:"replan-notes",label:"Observações",rows:3})}
        </div>

        <div class="replan-modal__field-wrap" data-replan-field="op">
          ${le({id:"replan-op",label:"Vincular OP (Produção Própria)",required:!0,placeholder:"Selecionar...",items:n})}
          <p class="replan-modal__hint">Apenas OPs de produção própria ativas são exibidas.</p>
          <span class="replan-modal__error" data-replan-error="op" hidden>Campo obrigatório.</span>
        </div>
      </div>
    `,footer:`
      <div class="replan-modal__footer">
        ${P({text:"Cancelar",style:"outline",variant:"dark",size:"sm"}).replace("<button ",'<button data-replan-action="cancel" ')}
        ${P({text:"Confirmar Replanejamento",variant:"primary",size:"sm"}).replace("<button ",'<button data-replan-action="confirm" ')}
      </div>
    `})}function Nr(e){return`
    <div class="orders-details-card">
      <div class="orders-details-card__grid">
        ${[{label:"Código",value:e.codigo},{label:"CPF/CNPJ",value:e.cpfCnpj},{label:"Razão Social/Nome",value:e.razaoSocial},{label:"Nome Fantasia/Apelido",value:e.nomeFantasia},{label:"Endereço",value:e.endereco,full:!0},{label:"Telefone",value:e.telefone},{label:"E-mail",value:e.email},{label:"Vendedor",value:e.vendedor,full:!0}].map(t=>`
          <div class="orders-details-field ${t.full?"orders-details-field--full":""}">
            <span class="orders-details-field__label">${t.label}</span>
            <strong class="orders-details-field__value">${t.value}</strong>
          </div>
        `).join("")}
      </div>
    </div>
  `}function Fr(e=[],a={}){const t=!!a?.hidePlanCancelButtons,n=!!a?.hideReplanButtons,o=!!a?.hideItemPlanningRows,d=`
    <div class="orders-item-table__header">
      <span class="orders-item-table__toggle-col" aria-hidden="true"></span>
      <span>Produto</span>
      <span>Qtd. Pedido</span>
      <span>Valor Unitário</span>
      <span>Valor Total</span>
      <span>Qtd. Disponível</span>
      ${t?"":'<span class="orders-item-table__actions-label" aria-hidden="true"></span>'}
    </div>
  `,s=e.map((r,i)=>{const v=!o&&Array.isArray(r.planning)&&r.planning.length>0,y=String(r.product||"").match(/^(.*)\s([A-Z]{3}-\d{3})$/),c=y?y[1]:String(r.product||""),u=y?y[2]:"",E=v?r.planning.map((p,$)=>`
      <div class="orders-item-plan-row orders-item-plan-row--${p.type}" data-order-item-plan-row="${r.id}-${p.type}-${$}">
        <div class="orders-item-plan-row__top">
          <button type="button" class="orders-item-plan-row__indicator" data-order-item-plan-toggle aria-expanded="true" aria-label="Recolher detalhes">
            ${h("chevron-down",{size:22})}
          </button>
          <div class="orders-item-plan-row__status">
            ${p.type==="planned"?`Planejado: ${p.amount}`:`Cancelado: ${p.amount}`}
          </div>
        </div>
        <div class="orders-item-plan-row__details">
          <div class="orders-item-plan-row__meta">Data: ${p.date}</div>
          <div class="orders-item-plan-row__meta">Responsável: ${p.responsible}</div>
          <div class="orders-item-plan-row__meta">Quantidade: ${p.quantity}</div>
          <div class="orders-item-plan-row__action">
            ${n?"":p.type==="planned"?P({text:"Replanejar",style:"text",variant:"dark",size:"sm",iconLeft:"edit"}).replace("<button ",'<button data-order-item-action="replan" '):p.type==="canceled"?P({text:"Replanejar",style:"text",variant:"dark",size:"sm",iconLeft:"edit"}).replace("<button ",'<button data-order-item-action="replan" '):""}
          </div>
        </div>
      </div>
    `).join(""):"";return`
      <article class="orders-item ${v&&i===0?"is-expanded":""}" data-order-item="${r.id}">
        <div class="orders-item__main">
          <button type="button" class="orders-item__toggle" data-order-item-toggle aria-expanded="true" aria-label="Ocultar item">
            ${h("chevron-down",{size:22})}
          </button>
          <span class="orders-item__product">
            <strong class="orders-item__product-name">${c}</strong>
            ${u?`<small class="orders-item__product-code">${u}</small>`:""}
          </span>
          <span class="orders-item__value">${r.quantity}</span>
          <span class="orders-item__value">${r.unitValue}</span>
          <span class="orders-item__value">${r.totalValue}</span>
          <span class="orders-item__value">${r.availableQuantity}</span>
          ${t?"":`
          <div class="orders-item__actions">
            ${P({text:"Planejar",style:"outline",variant:"info",size:"sm"}).replace("<button ",'<button data-order-item-action="plan" ')}
            ${P({text:"Cancelar",style:"outline",variant:"danger",size:"sm"}).replace("<button ",'<button data-order-item-action="cancel" ')}
          </div>
          `}
        </div>
        ${v?`
          <div class="orders-item__planning">
            ${E}
          </div>
        `:""}
      </article>
    `}).join("");return`
    <div class="orders-details-card orders-item-table ${t?"orders-item-table--no-actions":""}">
      ${d}
      ${s}
    </div>
  `}function Or(e){const a=String(e?.notes||"-").trim()||"-";return`
    <div class="orders-details-card orders-summary-card">
      <div class="orders-summary-card__item">
        ${h("calendar",{size:14})}
        <div>
          <span class="orders-details-field__label">Data do Pedido</span>
          <strong class="orders-details-field__value">${e.orderDate}</strong>
        </div>
      </div>
      <div class="orders-summary-card__item">
        ${h("calendar",{size:14})}
        <div>
          <span class="orders-details-field__label">Entrega Prevista</span>
          <strong class="orders-details-field__value">${e.expectedDelivery}</strong>
        </div>
      </div>
      <div class="orders-summary-card__item">
        ${h("circle",{size:14})}
        <div>
          <span class="orders-details-field__label">Valor Total do Pedido</span>
          <strong class="orders-summary-card__value">${e.totalValue}</strong>
        </div>
      </div>
      <div class="orders-summary-notes">
        <button type="button" class="orders-summary-notes__header" data-order-summary-notes-toggle aria-expanded="true" aria-label="Recolher observações">
          <span>Observações</span>
          ${h("chevron-up",{size:16})}
        </button>
        <div class="orders-summary-notes__box">${a}</div>
      </div>
    </div>
  `}function Bt(e=null,a=null){const t=a||Ya(e),n=t?.footerPrimaryAction||null,o=!!t?.hideFooterCancelTotal,d=!!t?.replaceFooterCancelTotal;return`
    <div class="orders-details-footer">
      <div class="orders-details-footer__left">
        ${P({text:"Voltar",style:"outline",variant:"dark",size:"sm"}).replace("<button ",'<button data-pedido-drawer-action="back" ')}
      </div>
      <div class="orders-details-footer__right">
        ${o||d?"":P({text:"Cancelar Pedido Total",style:"outline",variant:"danger",size:"sm"}).replace("<button ",'<button data-pedido-drawer-action="cancel-total" ')}
        ${n?P({text:n.label,variant:"primary",size:"sm",disabled:!!n.disabled}).replace("<button ",`<button data-pedido-drawer-action="${n.key}" `):""}
      </div>
    </div>
  `}function Vr(){const e=document.getElementById("kanban-advanced-filters-btn");if(!e)return()=>{};const a=Gr(se),t=se===Z.PEDIDOS,n=t?bn():null,o="kanban-advanced-filters-drawer",d=document.querySelector(`[data-drawer="${o}"]`),s=document.querySelector(`[data-drawer-backdrop="${o}"]`);d&&d.remove(),s&&s.remove();const r=Ee({id:o,title:"Filtros Avançados",width:540,content:jr(a,{mode:se,ordersFiltersState:n}),footer:Xr()});document.body.insertAdjacentHTML("beforeend",r);const i=De({id:o,root:document}),v=document.querySelector(`[data-drawer="${o}"]`);if(!v||!i)return()=>{};const y=v.querySelector(".advanced-filters-footer"),c="kanban-save-filters-modal";let u=null,E=()=>{},p=0;const $=v.querySelector("#advanced-filters-tabs"),I=$?$.closest("[data-tabs]"):null,A=L=>{if(!y)return;const l=t&&L===1?"saved":"filter";y.dataset.activeTab=l},M=(L,l={})=>{if(!t||!a||!L)return;const{readOnly:b=!1}=l,m=a.items.find(S=>S.id===L);m&&(a.selectedId=L,a.draftName=m.name,a.draftSharing=[...m.sharing],a.readOnly=b,Ae(v,a))},T=()=>{!t||!a.selectedId||M(a.selectedId,{readOnly:!1})},B=()=>{if(!t||!a.selectedId)return;const L=v.querySelector("[data-saved-edit-name]"),l=L?L.closest(".field"):null,b=L?L.value.trim():"";if(!b){l&&l.classList.add("field--error"),L&&typeof L.focus=="function"&&L.focus();return}l&&l.classList.remove("field--error"),a.items=a.items.map(m=>m.id===a.selectedId?{...m,name:b,sharing:[...a.draftSharing||[]]}:m),a.draftName=b,a.readOnly=!1,Ae(v,a)},f=L=>{if(!I)return;const l=L.target.closest(".tabs-tab");if(!l||!I.contains(l))return;const b=Number(l.dataset.tab);if(Number.isNaN(b))return;const m=I.querySelectorAll(".tabs-tab"),S=I.parentElement?.querySelectorAll(".tabs-panel");m.forEach((k,C)=>{k.classList.toggle("is-active",C===b),k.setAttribute("aria-selected",String(C===b))}),S&&(S.forEach((k,C)=>{k.classList.toggle("is-active",C===b)}),p=b,A(b))},G=L=>{const l=L.target.closest("[data-saved-footer-action]");if(l&&t){const w=l.dataset.savedFooterAction;w==="cancel"&&T(),w==="save"&&B();return}const b=L.target.closest("[data-saved-action]");if(b){const w=b.dataset.savedAction,g=b.closest("[data-saved-filter-item]"),x=g?g.dataset.savedFilterItem:"";if(!x)return;if(t){if(w==="edit"){M(x,{readOnly:!1});return}if(w==="delete"){if(a.items=a.items.filter(N=>N.id!==x),!a.items.length)a.selectedId="",a.draftName="",a.draftSharing=[],a.readOnly=!1;else if(a.selectedId===x){const N=a.items[0];M(N.id,{readOnly:!1});return}Ae(v,a);return}if(w==="view"){M(x,{readOnly:!0});return}if(w==="cancel-edit"){T();return}if(w==="save-edit"){B();return}}if(w==="edit"){a.editingId=x,Ae(v,a);return}if(w==="delete"){a.items=a.items.filter(N=>N.id!==x),a.editingId===x&&(a.editingId=""),a.selectedId===x&&(a.selectedId=""),Ae(v,a);return}if(w==="view"){a.selectedId=x,console.log("Visualizar filtro salvo",x),Ae(v,a);return}if(w==="cancel-edit"){a.editingId="",Ae(v,a);return}if(w==="save-edit"){const N=g.querySelector("[data-saved-edit-name]"),K=N?N.closest(".field"):null,H=N?N.value.trim():"";if(!H){K&&K.classList.add("field--error"),N&&N.focus();return}K&&K.classList.remove("field--error"),a.items=a.items.map(R=>R.id===x?{...R,name:H}:R),a.editingId="",Ae(v,a);return}}if(t){const w=L.target.closest("[data-saved-filter-select]");if(w){const x=w.closest("[data-saved-filter-item]"),N=x?x.dataset.savedFilterItem:"";if(!N)return;M(N,{readOnly:!1});return}const g=L.target.closest("[data-saved-share-remove]");if(g){const x=g.dataset.savedShareRemove;if(!x)return;a.draftSharing=(a.draftSharing||[]).filter(N=>N!==x),Ae(v,a);return}}const m=L.target.closest("[data-filters-action]");if(m){const w=m.dataset.filtersAction;if(t&&n){if(w==="apply"){const g=Kr(v,n);window.dispatchEvent(new CustomEvent("orders:filters:apply",{detail:g})),i.close();return}if(w==="clear"){Hr(v,n);return}}else w==="apply"&&console.log("Aplicar filtros"),w==="clear"&&console.log("Limpar filtros");w==="save"&&ce(m);return}const S=L.target.closest('[data-action="remove"]');if(S){const w=S.closest(".chip");if(!w||!v.contains(w))return;if(t&&n){const g=w.dataset.ordersActiveChip;if(g){n.activeFilters=n.activeFilters.filter(x=>x.id!==g),hn(v,n);return}}w.remove();return}const k=L.target.closest("[data-order-option]");if(k){const w=k.closest("[data-order-options]");if(!w)return;w.querySelectorAll("[data-order-option]").forEach(g=>{g.classList.toggle("is-active",g===k)});return}const C=L.target.closest("[data-active-filters-toggle]");if(!C)return;const q=v.querySelector(".advanced-filters-active");if(!q)return;const z=q.classList.toggle("is-collapsed");C.setAttribute("aria-expanded",String(!z))},O=L=>{if(!t||!L.target)return;const l=L.target.closest("[data-saved-edit-name]");if(!l)return;a.draftName=l.value;const b=l.closest(".field");b&&b.classList.remove("field--error")},j=()=>{i.open(e)},U=({restoreFocus:L=!0}={})=>{const l=document.querySelector(`[data-modal="${c}"]`),b=document.querySelector(`[data-modal-backdrop="${c}"]`);!l||!b||(E(),we(c),v.classList.contains("is-open")&&(document.body.style.overflow="hidden"),l.remove(),b.remove(),L&&u&&typeof u.focus=="function"&&u.focus(),u=null)},ce=L=>{const l=document.querySelector(`[data-modal="${c}"]`),b=document.querySelector(`[data-modal-backdrop="${c}"]`);l&&l.remove(),b&&b.remove(),u=L||null,document.body.insertAdjacentHTML("beforeend",es({modalId:c}));const m=document.querySelector(`[data-modal="${c}"]`),S=document.querySelector(`[data-modal-backdrop="${c}"]`);if(!m||!S)return;const k=m.querySelector("#save-filters-name-input"),C=m.querySelector(".field"),q=m.querySelector("[data-save-filters-error]"),z=m.querySelector("[data-save-modal-cancel]"),w=m.querySelector("[data-modal-close]"),g=m.querySelector("[data-save-modal-submit]"),x=de=>{q&&(q.hidden=!de),C&&C.classList.toggle("field--error",de)},N=de=>{de.target===S&&U()},K=()=>U(),H=()=>U(),R=()=>{if(!k)return;const de=k.value.trim();if(!de){x(!0),k.focus();return}x(!1),console.log({nomeFiltro:de}),U()},me=()=>x(!1),ne=de=>{de.key==="Escape"&&(de.preventDefault(),U())};S.addEventListener("click",N),z&&z.addEventListener("click",K),w&&w.addEventListener("click",H),g&&g.addEventListener("click",R),k&&k.addEventListener("input",me),document.addEventListener("keydown",ne),E=()=>{S.removeEventListener("click",N),z&&z.removeEventListener("click",K),w&&w.removeEventListener("click",H),g&&g.removeEventListener("click",R),k&&k.removeEventListener("input",me),document.removeEventListener("keydown",ne),E=()=>{}},$e(c),k&&typeof k.focus=="function"&&requestAnimationFrame(()=>k.focus())};return I&&I.addEventListener("click",f),A(p),v.addEventListener("click",G),v.addEventListener("input",O),e.addEventListener("click",j),()=>{U({restoreFocus:!1}),e.removeEventListener("click",j),I&&I.removeEventListener("click",f),v.removeEventListener("click",G),v.removeEventListener("input",O),i.cleanup&&i.cleanup();const L=document.querySelector(`[data-drawer="${o}"]`),l=document.querySelector(`[data-drawer-backdrop="${o}"]`);L&&L.remove(),l&&l.remove()}}function jr(e,a={}){const{mode:t=Z.PRODUCAO,ordersFiltersState:n=null}=a;return`<section class="advanced-filters">${Ea({id:"advanced-filters-tabs",variant:"underlined",fullWidth:!0,activeTab:0,tabs:[{label:"Filtro",content:t===Z.PEDIDOS?Qr(n):Zr()},{label:"Filtros Salvos",content:Wr(e,{mode:t})}]})}</section>`}function bn(){const e=[{id:"status",label:"Status: 6 selecionados",kind:"alert"},{id:"date-between",label:"Data entre: 22/12/25 + 01/01/26",kind:"neutral"},{id:"code",label:"Código: 2233",kind:"neutral"},{id:"client-1",label:"Cliente: A2W",kind:"muted"},{id:"client-2",label:"Cliente: A2W",kind:"muted"},{id:"client-3",label:"Cliente: A2W",kind:"muted"},{id:"client-4",label:"Cliente: A2W",kind:"muted"}];return{defaultActiveFilters:e.map(a=>({...a})),activeFilters:e.map(a=>({...a}))}}function Qr(e){const a=e||bn(),t=`
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/>
      <path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,n=le({id:"advanced-filter-selected",label:"Filtro selecionado",required:!0,placeholder:"",value:"relatorio-mensal",items:[{label:"Relatório Mensal",value:"relatorio-mensal"}]}),o=Nt({id:"advanced-filter-show-inactive",label:"Mostrar inativos",size:"sm"}),d=Da({id:"advanced-filter-except",label:"Exceto",checked:!1}),s=le({id:"advanced-filter-data-type",label:"Tipo de Data",placeholder:"Selecione o tipo de data",items:[{label:"Data de pedido",value:"pedido"},{label:"Data de entrega",value:"entrega"},{label:"Data de faturamento",value:"faturamento"}]}),r=D({id:"advanced-filter-start-date",type:"date",label:"Data inicial",placeholder:"00/00/0000",iconRight:t}),i=D({id:"advanced-filter-end-date",type:"date",label:"Data final",placeholder:"00/00/0000",iconRight:t}),v=D({id:"advanced-filter-order-code-a2w",label:"Código Pedido A2W",placeholder:"Digite o código do pedido"}),y=D({id:"advanced-filter-order-code-tawros",label:"Código Pedido TAWROS",placeholder:"Digite o código"}),c=D({id:"advanced-filter-client-code",label:"Código do Cliente",placeholder:"Digite o código do pedido"}),u=D({id:"advanced-filter-cpf-cnpj",label:"CPF/CNPJ",placeholder:"Digite o nome do cliente"}),E=D({id:"advanced-filter-business-name",label:"Razão Social/Nome",placeholder:"Digite o nome da Razão Social"}),p=D({id:"advanced-filter-fantasy-name",label:"Nome Fantasia/Apelido",placeholder:"Digite o Nome Fantasia"}),$=D({id:"advanced-filter-product-code",label:"Código Produto",placeholder:"Digite o código do produto"}),I=le({id:"advanced-filter-product",label:"Produto",placeholder:"( Nome do produto )",items:[{label:"Muda de Eucalipto Clone AEC 144",value:"muda-eucalipto-aec-144"},{label:"Muda de Eucalipto Clone AEC 224",value:"muda-eucalipto-aec-224"}]}),A=le({id:"advanced-filter-class",label:"Classe",placeholder:"Selecione a classe",items:[{label:"Classe A",value:"classe-a"},{label:"Classe B",value:"classe-b"}]}),M=D({id:"advanced-filter-min-quantity",label:"Quantidade Mínima",placeholder:"Quantidade"}),T=D({id:"advanced-filter-max-quantity",label:"Quantidade Máxima",placeholder:"Quantidade"}),B=D({id:"advanced-filter-min-value",label:"Valor Mínimo",placeholder:"R$ 00,00"}),f=D({id:"advanced-filter-max-value",label:"Valor Máximo",placeholder:"R$ 00,00"}),G=$a({id:"advanced-filter-status",label:"Status",chips:[pe({label:"Bloqueado",value:"bloqueado",size:"sm"}),pe({label:"Em Produção",value:"em-producao",size:"sm"}),pe({label:"Expedição",value:"expedicao",size:"sm"})]}),O=wn(),j=le({id:"advanced-filter-sorting-type",label:"Tipo de ordenação",required:!0,placeholder:"Selecione",items:[{label:"Crescente",value:"asc"},{label:"Decrescente",value:"desc"}]}),U=$n();return`
    <form class="advanced-filters-panel" data-orders-filters-form>
      <div data-drawer-autofocus>
        ${n}
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
          ${_n(a)}
        </div>
      </div>
      <div class="advanced-filters-inline">
        ${o}
        ${d}
      </div>
      <div class="advanced-filters-grid">
        ${s}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${r}
        ${i}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${v}
        ${y}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${c}
        ${u}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${E}
        ${p}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${$}
        ${I}
      </div>
      <div class="advanced-filters-grid">
        ${A}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${M}
        ${T}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${B}
        ${f}
      </div>
      <div class="advanced-filters-grid">
        ${G}
      </div>
      <div class="advanced-filters-grid">
        ${O}
      </div>
      <div class="advanced-filters-grid">
        ${j}
      </div>
      <div class="advanced-filters-grid">
        ${U}
      </div>
    </form>
  `}function _n(e){return(e?.activeFilters||[]).map(t=>{const n=t.kind==="alert"?"advanced-filters-chip--alert":t.kind==="muted"?"advanced-filters-chip--muted":"";return pe({label:t.label,value:t.id,size:"sm",className:n}).replace("<button ",`<button data-orders-active-chip="${t.id}" `)}).join("")}function hn(e,a){if(!e)return;const t=e.querySelector("[data-active-filters]");t&&(t.innerHTML=_n(a))}function Hr(e,a){if(!e||!a)return;const t=e.querySelector("[data-orders-filters-form]");t&&typeof t.reset=="function"&&t.reset();const n=e.querySelector("#advanced-filter-selected");n&&(n.value="relatorio-mensal");const o=e.querySelector("#advanced-filter-sorting-type");o&&(o.value=""),e.querySelectorAll("[data-order-option]").forEach(s=>{s.classList.toggle("is-active",s.dataset.orderOption==="recentes")}),a.activeFilters=a.defaultActiveFilters.map(s=>({...s})),hn(e,a)}function Kr(e,a){if(!e)return{};const t=e.querySelector("[data-orders-filters-form]"),n=t?new FormData(t):new FormData,o=i=>(n.get(i)||"").toString().trim(),d=e.querySelector("[data-order-option].is-active"),s=Array.from(e.querySelectorAll("#advanced-filter-status .chip-label")).map(i=>i.textContent?.trim()).filter(Boolean),r={cliente:!!e.querySelector("#advanced-filter-group-client:checked"),classe:!!e.querySelector("#advanced-filter-group-class:checked"),produto:!!e.querySelector("#advanced-filter-group-product:checked"),pedidos:!!e.querySelector("#advanced-filter-group-order:checked")};return{selectedFilter:o("advanced-filter-selected"),activeFilters:(a?.activeFilters||[]).map(i=>i.label),showInactive:!!e.querySelector("#advanced-filter-show-inactive:checked"),except:!!e.querySelector("#advanced-filter-except:checked"),dateType:o("advanced-filter-data-type"),startDate:o("advanced-filter-start-date"),endDate:o("advanced-filter-end-date"),orderCodeA2W:o("advanced-filter-order-code-a2w"),orderCodeTawros:o("advanced-filter-order-code-tawros"),clientCode:o("advanced-filter-client-code"),cpfCnpj:o("advanced-filter-cpf-cnpj"),businessName:o("advanced-filter-business-name"),fantasyName:o("advanced-filter-fantasy-name"),productCode:o("advanced-filter-product-code"),product:o("advanced-filter-product"),className:o("advanced-filter-class"),quantityMin:o("advanced-filter-min-quantity"),quantityMax:o("advanced-filter-max-quantity"),valueMin:o("advanced-filter-min-value"),valueMax:o("advanced-filter-max-value"),status:s,sortBy:d?.dataset.orderOption||"recentes",sortingType:o("advanced-filter-sorting-type"),groupBy:r}}function Gr(e=Z.PRODUCAO){const a=[{id:"saved-filter-1",name:"Relatório Mensal",sharing:["Vitor (Gerente)","Equipe de Vendas"]},{id:"saved-filter-2",name:"Filtro Relatório Mensal 2",sharing:["Vitor (Gerente)","Equipe de Vendas"]},{id:"saved-filter-3",name:"Relatório Mensal 33",sharing:["Vitor (Gerente)","Equipe de Vendas"]},{id:"saved-filter-4",name:"Relatório Anual",sharing:["Vitor (Gerente)","Equipe de Vendas"]}];return e===Z.PEDIDOS?{mode:e,items:a,selectedId:a[0]?.id||"",draftName:a[0]?.name||"",draftSharing:[...a[0]?.sharing||[]],readOnly:!1}:{mode:e,items:a,editingId:"saved-filter-1",selectedId:""}}function Wr(e,a={}){const{mode:t=Z.PRODUCAO}=a;return t===Z.PEDIDOS?Ur(e):`
    <div class="saved-filters-panel" data-saved-filters-panel>
      ${kn(e)}
    </div>
  `}function Ae(e,a){if(!e)return;const t=e.querySelector("[data-saved-filters-panel]");if(t){if(a?.mode===Z.PEDIDOS){t.innerHTML=yn(a);return}t.innerHTML=kn(a)}}function Ur(e){return`
    <div class="saved-filters-panel saved-filters-panel--orders" data-saved-filters-panel>
      ${yn(e)}
    </div>
  `}function yn(e){const a=e?.items?.find(s=>s.id===e.selectedId)||null,t=e?.draftName??a?.name??"",o=(e?.draftSharing??a?.sharing??[]).map((s,r)=>e?.readOnly?xe({label:s,value:`saved-sharing-${r}`,size:"sm",className:"saved-filter-edit__chip saved-filter-edit__chip--readonly"}):pe({label:s,value:`saved-sharing-${r}`,size:"sm",className:"saved-filter-edit__chip"}).replace("<button ",`<button data-saved-share-remove="${s}" `)).join("");return`
    ${!e?.items?.length?'<div class="advanced-filters-empty">Nenhum filtro salvo.</div>':`
      <section class="saved-filter-edit" data-saved-filter-item="${a?.id||""}">
        <div class="saved-filter-edit__row">
          <button type="button" class="saved-filter-item__left saved-filter-item__left--button" data-saved-filter-select>
            <span class="saved-filter-item__icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M2 3H14L9 9V13L7 14V9L2 3Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="saved-filter-item__name">${a?.name||""}</span>
          </button>
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
        <div class="saved-filter-edit__body">
          ${D({id:"orders-saved-filter-name",label:"Nome do filtro",value:t,readonly:!!e?.readOnly}).replace('class="input"','class="input" data-saved-edit-name')}
          <div class="saved-filter-item__share">
            <span class="saved-filter-item__share-label">Compartilhamento</span>
            <div class="saved-filter-item__share-control">
              <div class="saved-filter-item__share-chips">${o}</div>
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
      </section>
      <div class="saved-filters-list">
        ${e.items.map(s=>Jr(s,e)).join("")}
      </div>
    `}
  `}function Jr(e,a){return`
    <div class="saved-filter-item saved-filter-item--list ${a.selectedId===e.id?"is-selected":""}" data-saved-filter-item="${e.id}">
      <div class="saved-filter-item__row">
        <button type="button" class="saved-filter-item__left saved-filter-item__left--button" data-saved-filter-select>
          <span class="saved-filter-item__icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M2 3H14L9 9V13L7 14V9L2 3Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="saved-filter-item__name">${e.name}</span>
        </button>
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
    </div>
  `}function kn(e){return e.items.length?e.items.map(a=>Yr(a,e)).join(""):'<div class="advanced-filters-empty">Nenhum filtro salvo.</div>'}function Yr(e,a){const t=a.editingId===e.id,n=a.selectedId===e.id,o=e.sharing.map((d,s)=>pe({label:d,value:`${e.id}-share-${s}`,size:"sm"})).join("");return`
    <div class="saved-filter-item ${n?"is-selected":""}" data-saved-filter-item="${e.id}">
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
          ${D({id:`saved-filter-name-${e.id}`,label:"Nome do filtro",value:e.name,className:"saved-filter-item__edit-name"}).replace('class="input"','class="input" data-saved-edit-name')}
          <div class="saved-filter-item__share">
            <span class="saved-filter-item__share-label">Compartilhamento</span>
            <div class="saved-filter-item__share-control">
              <div class="saved-filter-item__share-chips">${o}</div>
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
  `}function Zr(){const e=`
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/>
      <path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,a=le({id:"advanced-filter-selected",label:"Filtro selecionado",required:!0,placeholder:"",value:"relatorio-mensal",items:[{label:"Relatório Mensal",value:"relatorio-mensal"}]}),t=[pe({label:"Status: 6 selecionados",value:"status-6",size:"sm",className:"advanced-filters-chip--alert"}),pe({label:"Data entre: 22/12/25 + 01/01/26",value:"data-entre",size:"sm"}),pe({label:"Código: 2233",value:"codigo",size:"sm"}),pe({label:"Cliente: A2W",value:"cliente-1",size:"sm"}),pe({label:"Cliente: A2W",value:"cliente-2",size:"sm"}),pe({label:"Cliente: A2W",value:"cliente-3",size:"sm"}),pe({label:"Cliente: A2W",value:"cliente-4",size:"sm"})].join(""),n=Nt({id:"advanced-filter-show-inactive",label:"Mostrar inativos",size:"sm"}),o=Da({id:"advanced-filter-except",label:"Exceto",checked:!1}),d=le({id:"advanced-filter-data-type",label:"Tipo de Data",placeholder:"Selecione o tipo de data",items:[{label:"Data de pedido",value:"pedido"},{label:"Data de início",value:"inicio"}]}),s=D({id:"advanced-filter-start-date",type:"date",label:"Data inicial",placeholder:"00/00/0000",iconRight:e}),r=D({id:"advanced-filter-end-date",type:"date",label:"Data final",placeholder:"00/00/0000",iconRight:e}),i=D({id:"advanced-filter-order-code",label:"Código Pedido",placeholder:"Digite o código do pedido"}),v=D({id:"advanced-filter-tawros-code",label:"Código TAWROS",placeholder:"Digite o código"}),y=D({id:"advanced-filter-client-code",label:"Código do Cliente",placeholder:"Digite o código do cliente"}),c=D({id:"advanced-filter-cpf-cnpj",label:"CPF/CNPJ",placeholder:"Digite o nome do cliente"}),u=D({id:"advanced-filter-business-name",label:"Razão Social/Nome",placeholder:"Digite o nome da Razão Social"}),E=D({id:"advanced-filter-fantasy-name",label:"Nome Fantasia/Apelido",placeholder:"Digite o Nome Fantasia"}),p=le({id:"advanced-filter-class",label:"Classe",placeholder:"Selecione a classe",items:[{label:"Classe A",value:"a"},{label:"Classe B",value:"b"}]}),$=D({id:"advanced-filter-product-code",label:"Código Produto",placeholder:"Digite o código do produto"}),I=le({id:"advanced-filter-product",label:"Produto",placeholder:"Nome do produto",items:[{label:"Tomate Cereja",value:"tomate-cereja"},{label:"Tomate Italiano",value:"tomate-italiano"}]}),A=D({id:"advanced-filter-min-quantity",label:"Quantidade Mínima",placeholder:"Quantidade"}),M=D({id:"advanced-filter-max-quantity",label:"Quantidade Máxima",placeholder:"Quantidade"}),T=$a({label:"Tipo",chips:[pe({label:"Enxerto",value:"enxerto",size:"sm"}),pe({label:"Porta Enxerto",value:"porta-enxerto",size:"sm"})]}),B=$a({label:"Status",chips:[pe({label:"Bloqueado",value:"bloqueado",size:"sm"}),pe({label:"Em Produção",value:"em-producao",size:"sm"}),pe({label:"Expedição",value:"expedicao",size:"sm"})]}),f=wn(),G=le({id:"advanced-filter-sorting-type",label:"Tipo de ordenação",required:!0,placeholder:"Selecione",items:[{label:"Crescente",value:"asc"},{label:"Decrescente",value:"desc"}]}),O=$a({label:"Etiqueta",chips:[pe({label:"Normal",value:"normal",size:"sm"}),pe({label:"Urgente",value:"urgente",size:"sm"})]}),j=$n();return`
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
        ${n}
        ${o}
      </div>
      <div class="advanced-filters-grid">
        ${d}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${s}
        ${r}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${i}
        ${v}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${y}
        ${c}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${u}
        ${E}
      </div>
      <div class="advanced-filters-grid">
        ${p}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${$}
        ${I}
      </div>
      <div class="advanced-filters-grid">
        ${T}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${A}
        ${M}
      </div>
      <div class="advanced-filters-grid">
        ${B}
      </div>
      <div class="advanced-filters-grid">
        ${f}
      </div>
      <div class="advanced-filters-grid">
        ${G}
      </div>
      <div class="advanced-filters-grid">
        ${O}
      </div>
      <div class="advanced-filters-grid">
        ${j}
      </div>
    </div>
  `}function $a({id:e="",label:a,chips:t}){const n=t.join("");return`
    <div class="advanced-filters-chip-field" ${e?`id="${e}"`:""}>
      <span class="advanced-filters-chip-field__label">${a}</span>
      <div class="advanced-filters-chip-field__control">
        <div class="advanced-filters-chip-field__chips">${n}</div>
        <span class="advanced-filters-chip-field__caret" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    </div>
  `}function wn(){return`
    <div class="advanced-filters-sort">
      <span class="advanced-filters-sort__label">Ordenar por</span>
      <div class="advanced-filters-sort__options" data-order-options>
        <button type="button" class="advanced-filters-sort__option is-active" data-order-option="recentes">Mais recentes</button>
        <button type="button" class="advanced-filters-sort__option" data-order-option="antigos">Mais antigos</button>
        <button type="button" class="advanced-filters-sort__option" data-order-option="maior-valor">Maior valor</button>
        <button type="button" class="advanced-filters-sort__option" data-order-option="menor-valor">Menor valor</button>
      </div>
    </div>
  `}function $n(){return`
    <div class="advanced-filters-group">
      <div class="advanced-filters-group__header">
        <span class="advanced-filters-group__title">Agrupar por</span>
        <span class="advanced-filters-group__hint">
          <span class="advanced-filters-group__hint-dot" aria-hidden="true"></span>
          Selecione e clique e arraste para ordenar
        </span>
      </div>
      <div class="advanced-filters-group__options">${[{id:"advanced-filter-group-client",label:"Cliente",checked:!0},{id:"advanced-filter-group-class",label:"Classe",checked:!1},{id:"advanced-filter-group-product",label:"Produto",checked:!1},{id:"advanced-filter-group-order",label:"Pedidos",checked:!1}].map(t=>`
    <div class="advanced-filters-group__item">
      ${Da({id:t.id,label:t.label,checked:t.checked,size:"sm"})}
      <span class="advanced-filters-group__drag" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M6 3H6.01M10 3H10.01M6 8H6.01M10 8H10.01M6 13H6.01M10 13H10.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </span>
    </div>
  `).join("")}</div>
    </div>
  `}function Xr(){const e=P({text:"Salvar Filtros",style:"outline",variant:"dark",size:"sm",type:"button"}).replace("<button ",'<button data-filters-action="save" '),a=P({text:"Limpar Filtros",style:"outline",variant:"dark",size:"sm",type:"button"}).replace("<button ",'<button data-filters-action="clear" '),t=P({text:"Aplicar Filtros",variant:"primary",size:"sm",type:"button"}).replace("<button ",'<button data-filters-action="apply" '),n=P({text:"Cancelar",style:"outline",variant:"dark",size:"sm",type:"button"}).replace("<button ",'<button data-saved-footer-action="cancel" '),o=P({text:"Salvar",variant:"primary",size:"sm",type:"button"}).replace("<button ",'<button data-saved-footer-action="save" ');return`
    <div class="advanced-filters-footer" data-active-tab="filter">
      <div class="advanced-filters-footer__filter-actions advanced-filters-footer__left">
        ${e}
        ${a}
        ${t}
      </div>
      <div class="advanced-filters-footer__saved-actions advanced-filters-footer__right">
        ${n}
        ${o}
      </div>
    </div>
  `}function es({modalId:e}){const a=D({id:"save-filters-name-input",label:"Nome do filtro",required:!0,placeholder:"Insira um nome para filtro"}),t=P({text:"Cancelar",style:"outline",variant:"dark",type:"button"}).replace("<button ","<button data-save-modal-cancel "),n=P({text:"Salvar",variant:"primary",type:"button"}).replace("<button ","<button data-save-modal-submit ");return Pe({id:e,type:"center",size:"sm",title:"Salvar Filtros",body:`
      <div class="advanced-save-modal__body">
        ${a}
        <span class="advanced-save-modal__error" data-save-filters-error hidden>Nome do filtro é obrigatório.</span>
      </div>
    `,footer:`
      <div class="advanced-save-modal__footer">
        ${t}
        ${n}
      </div>
    `,closable:!0})}const vs=Object.freeze(Object.defineProperty({__proto__:null,init:ko},Symbol.toStringTag,{value:"Module"}));export{P as c,vs as k};
