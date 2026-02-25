const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/enviar-germinacao-drawer-DFtuyUvM.js","assets/drawer-BhhtaBzO.js","assets/drawer-DgoYSxAe.css","assets/tabs-Bc_csLdm.js","assets/tabs-s1TBgd84.css","assets/input-BGfEK18X.js","assets/input-CR6JfLmf.css","assets/chip-Iox8iBys.js","assets/chip-SXewrVMn.css","assets/icons-C9wddX8K.js","assets/index-BliPKCam.js","assets/index-QKrpXWls.css","assets/checkbox-Czn0aMdg.js","assets/checkbox-BuSHLP4E.css","assets/toggle-8KHLMbPj.js","assets/toggle-DZsEfZw8.css","assets/toast-CGbnOkVX.js","assets/toast-PmqmSduh.css","assets/file-upload-BWgfDtFs.js","assets/file-upload-DYJCPlLb.css","assets/table-Bhr5kK3b.js","assets/table-BIQ3tM8Q.css","assets/enviar-germinacao-drawer-b0Qkro_F.css","assets/badge-BJol6x-W.css","assets/button-C2QBC4-b.css"])))=>i.map(i=>d[i]);
import{c as we,o as $e,a as Pe,_ as Et}from"./index-BliPKCam.js";import{i as _}from"./icons-C9wddX8K.js";/* empty css              */import{c as Ee,i as De}from"./drawer-BhhtaBzO.js";import{c as Ca}from"./tabs-Bc_csLdm.js";import{i as ye,c as S,b as le,a as ga,d as Dn}from"./input-BGfEK18X.js";import{i as qn,c as Ea}from"./checkbox-Czn0aMdg.js";import{a as Nt,c as Ft}from"./toggle-8KHLMbPj.js";import{a as xe,c as pe}from"./chip-Iox8iBys.js";/* empty css               */import{s as pa,e as La}from"./toast-CGbnOkVX.js";import{i as Ln,c as Pn}from"./file-upload-BWgfDtFs.js";import{c as Rt}from"./table-Bhr5kK3b.js";function Va(e="id"){return typeof crypto<"u"&&crypto.randomUUID?`${e}-${crypto.randomUUID().split("-")[0]}`:`${e}-${Math.random().toString(36).substring(2,11)}`}function An(...e){return e.filter(Boolean).join(" ")}function xn(e={}){const{title:a="",count:t=0,color:n="gray",id:o=Va("column")}=e;return`
    <section class="kanban-column kanban-column--${n}" data-column-id="${o}" data-column-color="${n}">
      <div class="kanban-column__header">
        <div class="kanban-column__title-wrapper">
          <h3 class="kanban-column__title">${a}</h3>
          <span class="kanban-column__count">${t}</span>
        </div>
        <button class="kanban-column__settings" data-column-settings="${o}" aria-label="Configurações da coluna">
          ${_("settings",{size:20})}
        </button>
      </div>
      <div class="kanban-column__content" data-column-content="${o}">
        <!-- Cards serão inseridos aqui -->
      </div>
    </section>
  `}function Mn(e,a){const t=document.querySelector(`[data-column-content="${e}"]`);if(!t)return;const n=t.querySelector(".kanban-column__empty");n&&n.remove(),t.insertAdjacentHTML("beforeend",a),zn(e)}function zn(e){const a=document.querySelector(`[data-column-id="${e}"]`);if(!a)return;const n=a.querySelector(`[data-column-content="${e}"]`).querySelectorAll(".kanban-card").length,o=a.querySelector(".kanban-column__count");o&&(o.textContent=n)}function In(e,a){const t=document.querySelector(`[data-column-id="${e}"]`);if(!t)return;["cyan","green","blue","indigo","slate","purple","yellow","pink","red","orange"].forEach(o=>t.classList.remove(`kanban-column--${o}`)),t.classList.add(`kanban-column--${a}`),t.dataset.columnColor=a}function Tn(e){const a=document.querySelector(`[data-column-content="${e}"]`);a&&(a.innerHTML=`
    <div class="kanban-column__empty">
      ${_("package",{size:48})}
      <p class="kanban-column__empty-text">Não há ordens de produção</p>
    </div>
  `)}const Pa={check:'<svg viewBox="0 0 14 14" fill="none"><path d="M11.5 4L5.5 10L2.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',x:'<svg viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',dot:'<span class="badge-dot"></span>'};function Ie(e={}){const{text:a="",variant:t="primary",style:n="filled",size:o="",icon:r="",darkMode:s=!1}=e,d=["badge"];n==="filled"?d.push(`badge--${t}`):d.push(`badge--${n}-${t}`),o&&d.push(`badge--${o}`),s&&d.push("badge--dark-mode");let i="";return r&&Pa[r]&&(i=r==="dot"?Pa[r]:`<span class="badge-icon">${Pa[r]}</span>`),`<span class="${d.join(" ")}">${i}${a}</span>`}function Bn(e={}){const{code:a="",subtitle:t="",badgeLabel:n="",badgeVariant:o="light",badgeStyle:r="filled",items:s=[],id:d=Va("card")}=e,i=n?Ie({text:n,variant:o,style:r,size:"sm"}):"",u=s.map(k=>{if(k.type==="divider")return'<div class="kanban-card__divider"></div>';const C=k.icon!==null&&k.icon!==!1&&k.icon!=="",p=k.icon||"circle",x=C?_(p,{size:16}):"";return`
      <div class="kanban-card__item${k.className?` ${k.className}`:""}">
        ${x}
        <span>${k.label||""}</span>
        ${k.value?`<span class="kanban-card__item-label">${k.value}</span>`:""}
      </div>
    `}).join("");return`
    <div class="kanban-card" data-card-id="${d}">
      <div class="kanban-card__header">
        <div class="kanban-card__title">
          <a href="#" class="kanban-card__code">${a}</a>
          ${t?`<span class="kanban-card__subtitle">${t}</span>`:""}
        </div>
        ${i}
      </div>
      <div class="kanban-card__body">
        ${u}
      </div>
    </div>
  `}const Nn=[{value:"cyan",label:"Ciano"},{value:"green",label:"Verde"},{value:"blue",label:"Azul"},{value:"indigo",label:"Índigo"},{value:"slate",label:"Ardósia"},{value:"purple",label:"Roxo"},{value:"yellow",label:"Amarelo"},{value:"pink",label:"Rosa"},{value:"red",label:"Vermelho"},{value:"orange",label:"Laranja"}];function Fn(e={}){const{id:a=Va("color-picker"),selected:t="gray"}=e,n=Nn.map(o=>`
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
          ${_("close",{size:16})}
        </button>
      </div>
      <div class="color-picker__grid">
        ${n}
      </div>
    </div>
  `}function Rn(e,a){if(!e)return;const t=e.querySelectorAll(".color-picker__option"),n=e.querySelector("[data-color-picker-close]");t.forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.color;t.forEach(s=>s.classList.remove("is-selected")),o.classList.add("is-selected"),a&&a(r)})}),n&&n.addEventListener("click",o=>{o.stopPropagation(),Ia(e)})}function Ia(e){e&&e.classList.remove("is-open")}function On(e){e&&e.classList.toggle("is-open")}const la={plus:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',check:'<svg viewBox="0 0 16 16" fill="none"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronRight:'<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronDown:'<svg viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',download:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 2V10M8 10L5 7M8 10L11 7M3 14H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',upload:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 10V2M8 2L5 5M8 2L11 5M3 14H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',edit:'<svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',trash:'<svg viewBox="0 0 16 16" fill="none"><path d="M3 4H13M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',close:'<svg viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',search:'<svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'};function q(e={}){const{text:a="",variant:t="primary",style:n="solid",size:o="",iconLeft:r="",iconRight:s="",iconOnly:d=!1,disabled:i=!1,loading:u=!1,block:k=!1,darkMode:C=!1,tag:p="button",href:x="",type:y="button"}=e,M=["btn"];n==="solid"?M.push(`btn--${t}`):M.push(`btn--${n}-${t}`),o&&M.push(`btn--${o}`),d&&M.push("btn--icon-only"),u&&M.push("btn--loading"),k&&M.push("btn--block"),C&&M.push("btn--dark-mode");const T=r&&la[r]?`<span class="btn-icon">${la[r]}</span>`:"",P=s&&la[s]?`<span class="btn-icon">${la[s]}</span>`:"",A=d&&r?`<span class="btn-icon">${la[r]}</span>`:`${T}${a}${P}`,z=i?"disabled":"";return p==="a"?`<a href="${x}" class="${M.join(" ")}">${A}</a>`:`<button type="${y}" class="${M.join(" ")}" ${z}>${A}</button>`}const Ke="kanban-link-order-modal",Vn="kanban-planning-modal",jn=[{id:"item-1",product:"Muda de Eucalipto",code:"MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",available:"1000"},{id:"item-2",product:"Muda de Eucalipto",code:"MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",available:"1000"},{id:"item-3",product:"Muda de Eucalipto",code:"MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",available:"1000"}];let Ta=()=>{},ba=null;function Qn(e=new Set){const a=[{key:"check",label:""},{key:"product",label:"Produto"},{key:"quantity",label:"Qtd. Pedido"},{key:"unitValue",label:"Valor Unitário"},{key:"totalValue",label:"Valor Total"},{key:"available",label:"Qtd. Disponível"}],t=jn.map((n,o)=>{const r=e.has(n.id)||!e.size&&o===0;return{check:Ea({id:`link-order-checkbox-${n.id}`,value:n.id,checked:r,className:"link-order-modal__checkbox"}).replace('class="checkbox-input"','class="checkbox-input" data-link-order-item'),product:`
        <div class="link-order-modal__product">
          <span>${n.product}</span>
          <small>${n.code}</small>
        </div>
      `,quantity:n.quantity,unitValue:n.unitValue,totalValue:n.totalValue,available:n.available}});return Rt({id:"link-order-items-table",columns:a,data:t,variant:"compact",className:"link-order-modal__table-component"})}function Hn({selectedIds:e=new Set}={}){return Pe({id:Ke,title:"Vincular Pedido",size:"md",className:"link-order-modal",body:`
      <div class="link-order-modal__content">
        ${S({id:"link-order-search",label:"Vincular pedido",required:!0,placeholder:"Buscar por código, nome do pedido",iconRight:_("search",{size:14})})}

        <section class="link-order-modal__info-card">
          <h3 class="link-order-modal__section-title">${_("file",{size:12})}Informações do Pedido</h3>
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
        ${q({text:"Desvincular pedido",style:"outline",variant:"error",size:"sm"}).replace("<button ",'<button data-link-order-action="unlink" ')}
        <div class="link-order-modal__footer-right">
          ${q({text:"Voltar",style:"outline",variant:"dark",size:"sm"}).replace("<button ",'<button data-link-order-action="back" ')}
          ${q({text:"Salvar",variant:"primary",size:"sm"}).replace("<button ",'<button data-link-order-action="save" ')}
        </div>
      </div>
    `})}function Qe({restoreFocus:e=!0}={}){const a=document.querySelector(`[data-modal="${Ke}"]`),t=document.querySelector(`[data-modal-backdrop="${Ke}"]`);!a||!t||(Ta(),we(Ke),document.querySelector(`[data-modal="${Vn}"]`)?.classList.contains("is-visible")&&(document.body.style.overflow="hidden"),a.remove(),t.remove(),e&&ba?.focus&&ba.focus(),ba=null)}function Gn(e={}){const{anchorEl:a=null,selectedIds:t=[],onBack:n=null,onSave:o=null}=e;Qe({restoreFocus:!1});const r=new Set(Array.isArray(t)?t:[]);ba=a,document.body.insertAdjacentHTML("beforeend",Hn({selectedIds:r}));const s=document.querySelector(`[data-modal="${Ke}"]`),d=document.querySelector(`[data-modal-backdrop="${Ke}"]`);if(!s||!d)return;const i=ye(s),u=qn(s),k=s.querySelector("[data-modal-close]"),C=s.querySelector("[data-link-order-table-host]"),p=s.querySelector('[data-link-order-action="unlink"]'),x=s.querySelector('[data-link-order-action="back"]'),y=s.querySelector('[data-link-order-action="save"]'),M=s.querySelector("#link-order-search"),T=()=>{const R=C?.querySelectorAll("[data-link-order-item]")||[];return Array.from(R).filter(j=>j.checked).map(j=>j.value)},P=()=>Qe(),A=R=>{R.target===d&&Qe()},z=R=>{R.key==="Escape"&&(R.preventDefault(),R.stopPropagation(),Qe())},I=()=>{(C?.querySelectorAll("[data-link-order-item]")||[]).forEach(j=>{j.checked=!1,j.indeterminate=!1})},m=()=>{Qe({restoreFocus:!1}),typeof n=="function"&&n()},H=()=>{const R=T();typeof o=="function"&&o(R),Qe({restoreFocus:!1}),a?.focus&&a.focus()};k?.addEventListener("click",P),p?.addEventListener("click",I),x?.addEventListener("click",m),y?.addEventListener("click",H),d.addEventListener("click",A),document.addEventListener("keydown",z,!0),Ta=()=>{k?.removeEventListener("click",P),p?.removeEventListener("click",I),x?.removeEventListener("click",m),y?.removeEventListener("click",H),d.removeEventListener("click",A),document.removeEventListener("keydown",z,!0),typeof i=="function"&&i(),typeof u=="function"&&u(),Ta=()=>{}},$e(Ke),setTimeout(()=>{M?.focus?.()},120)}const Oe="kanban-planning-modal",Kn="kanban-link-order-modal",ze="kanban-planning-agenda-modal",Me="kanban-planning-reagenda-modal",Wn=[{value:"estoque-venda-direta",label:"Estoque (Venda Direta)"},{value:"remessa-futura",label:"Remessa Futura"},{value:"vincular-op",label:"Vincular Ordem de Produção"}],Ot=[{value:"estufa-1",label:"Sala de Semeio 1"},{value:"estufa-2",label:"Sala de Semeio 2"},{value:"estufa-3",label:"Sala de Semeio 3"}],Un=[{value:"0001",label:"0001"},{value:"0002",label:"0002"},{value:"0003",label:"0003"}];function _a(e){if(e==null)return 0;const a=String(e).replace(/[^\d]/g,"");return a&&Number.parseInt(a,10)||0}function Aa(e){const a=Number.isFinite(e)?e:_a(e);return new Intl.NumberFormat("pt-BR").format(Math.max(0,a))}let Ba=()=>{},ha=null,Na=()=>{},ya=null,Fa=()=>{},ka=null;const xa=new Map;function Jn(e=0){return{serviceType:"estoque-venda-direta",linkedItems:[],draftQuantity:"",draftLot:"",rows:[{op:"0001",seedDate:"00/00/0000",daysAfterSowing:"30 dias",quantity:"5.000"},{op:"0001",seedDate:"00/00/0000",daysAfterSowing:"30 dias",quantity:"5.000"}],futureDraftLocation:"",futureDraftResponsible:"",futureDraftQuantity:"",futureDraftDate:"",futureRows:[{plannedDate:"00/00/0000",location:"André Santos",responsible:"André Santos",quantity:"5.000"},{plannedDate:"00/00/0000",location:"André Santos",responsible:"André Santos",quantity:"5.000"}],availableQuantity:e}}function Yn(e={}){if(e.memoryKey)return String(e.memoryKey);const a=e.orderItem||{};return a.id?`planning:${a.id}`:a.product?`planning:${a.product}`:"planning:global"}function Dt(e=[],a="estoque-venda-direta"){const t=a==="remessa-futura",n=t?[{key:"plannedDate",label:"Data planejada"},{key:"location",label:"Localização"},{key:"responsible",label:"Responsável"},{key:"quantity",label:"Quantidade"},{key:"actions",label:"Ações"}]:[{key:"op",label:"OP"},{key:"seedDate",label:"Data Semeio"},{key:"daysAfterSowing",label:"Dias após Semeio"},{key:"quantity",label:"Quantidade"},{key:"actions",label:"Ações"}],o=e.map((r,s)=>({...t?{plannedDate:r.plannedDate,location:r.location,responsible:r.responsible,quantity:r.quantity}:{op:r.op,seedDate:r.seedDate,daysAfterSowing:r.daysAfterSowing,quantity:r.quantity},actions:`
      <div class="planning-modal__actions">
        <button type="button" class="planning-modal__icon-btn" data-planning-row-action="edit" data-row-index="${s}" aria-label="Editar">${_("edit",{size:14})}</button>
        <button type="button" class="planning-modal__icon-btn planning-modal__icon-btn--danger" data-planning-row-action="delete" data-row-index="${s}" aria-label="Excluir">${_("trash",{size:14})}</button>
        <button type="button" class="planning-modal__icon-btn" data-planning-row-action="view" data-row-index="${s}" aria-label="Visualizar">${_("eye",{size:14})}</button>
      </div>
    `}));return Rt({id:"planning-items-table",columns:n,data:o,variant:"compact",className:"planning-modal__table-component"})}function Vt(e="estoque-venda-direta",a={}){return e==="remessa-futura"?`
    <section class="planning-modal__future-block">
      <div class="planning-modal__future-grid planning-modal__future-grid--2">
        ${le({id:"planning-future-location",label:"Localização",placeholder:"Selecione",value:a.futureDraftLocation||"",items:Ot})}
        ${S({id:"planning-future-responsible",label:"Responsável",placeholder:"Digite o responsável",value:a.futureDraftResponsible||""})}
      </div>

      <div class="planning-modal__future-grid planning-modal__future-grid--3">
        ${S({id:"planning-future-quantity",label:"Quantidade",placeholder:"Digite a quantidade",value:a.futureDraftQuantity||""})}
        ${S({id:"planning-future-date",type:"date",label:"Data planejada para semeio",required:!0,value:a.futureDraftDate||"",className:"planning-modal__date-field",iconRight:_("calendar",{size:16})})}
        <div class="planning-modal__agenda-wrap">
          <label class="planning-modal__agenda-label">&nbsp;</label>
          ${q({text:"Consultar agenda",style:"outline",variant:"dark",size:"sm",iconLeft:"plus"}).replace("<button ",'<button data-planning-action="check-agenda" ')}
        </div>
      </div>

      ${q({text:"Adicionar",style:"outline",variant:"dark",size:"sm",iconLeft:"plus"}).replace("<button ",'<button data-planning-action="add-row" ')}
    </section>

    <div class="planning-modal__table-wrap" data-planning-table-host>
      ${Dt(a.futureRows||[],e)}
    </div>
  `:`
      <div class="planning-modal__link-row">
        <button type="button" class="btn btn--outline-dark btn--sm" data-planning-action="link-order">
          <span class="btn-icon">${_("file",{size:14})}</span>
          Vincular Pedido
        </button>
        <span class="planning-modal__linked-feedback" data-planning-linked-feedback hidden></span>
      </div>

      <section class="planning-modal__add-block">
        <div class="planning-modal__add-grid">
          ${S({id:"planning-quantity",label:"Quantidade",placeholder:"Digite a quantidade",value:a.draftQuantity||""})}
          ${le({id:"planning-lot",label:"Lote",placeholder:"Selecione",value:a.draftLot||"",items:Un})}
        </div>
        ${q({text:"Adicionar",style:"outline",variant:"dark",size:"sm",iconLeft:"plus"}).replace("<button ",'<button data-planning-action="add-row" ')}
      </section>

      <div class="planning-modal__table-wrap" data-planning-table-host>
        ${Dt(a.rows||[],e)}
      </div>
    `}function Zn({orderItem:e={},rows:a=[]}={}){const{product:t="Muda de Eucalipto Clone - MUD-001",totalPedido:n="5000",available:o="5000",availableQuantity:r=""}=e;return Pe({id:Oe,title:"Planejamento",size:"lg",className:"planning-modal",body:`
      <div class="planning-modal__content">
        <section class="planning-modal__summary">
          <div><span>Produto</span><strong>${t}</strong></div>
          <div><span>Total Pedido</span><strong>${n}</strong></div>
          <div><span>Disponível</span><strong class="planning-modal__available">${r||o}</strong></div>
        </section>

        ${le({id:"planning-service-type",label:"Tipo de Atendimento",placeholder:"Selecione",value:"estoque-venda-direta",items:Wn})}

        <div data-planning-dynamic-content>
          ${Vt("estoque-venda-direta",{rows:a})}
        </div>
      </div>
    `,footer:`
      <div class="planning-modal__footer">
        ${q({text:"Cancelar",style:"outline",variant:"dark",size:"sm"}).replace("<button ",'<button data-planning-action="cancel" ')}
        ${q({text:"Planejar",variant:"primary",size:"sm"}).replace("<button ",'<button data-planning-action="submit" ')}
      </div>
    `})}function jt(){const e=new Date(2026,0,14);return{selectedDate:e,currentDate:e,viewMode:"week"}}function oa(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function Ra(e){const a=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${t}-${n}`}function Xn(e){if(!e||typeof e!="string")return null;const[a,t,n]=e.split("-").map(Number);return[a,t,n].some(Number.isNaN)?null:new Date(a,t-1,n)}function eo(e,a){return!e||!a?!1:e.getFullYear()===a.getFullYear()&&e.getMonth()===a.getMonth()&&e.getDate()===a.getDate()}function Qt(e){const a=oa(e);return a.setDate(a.getDate()-a.getDay()),a}function ma(e,a){const t=oa(e);return t.setDate(t.getDate()+a),t}function ao(e,a){const t=oa(e);return t.setMonth(t.getMonth()+a),t}function Ht(e){return`${["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][e.getMonth()]} ${e.getFullYear()}`}function Gt(e){const a=Qt(e),t=ma(a,6),n=Ht(t).replace(` ${t.getFullYear()}`,"");return`${String(a.getDate()).padStart(2,"0")} - ${String(t.getDate()).padStart(2,"0")} de ${n} ${t.getFullYear()}`}function to(e){return e.getFullYear()!==2026||e.getMonth()!==0?"":new Set([12,13,14,15,16]).has(e.getDate())?"15.000":""}function Kt({date:e,selectedDate:a,currentMonth:t=null}){const n=Ra(e),o=eo(e,a),r=t!==null&&e.getMonth()!==t,s=to(e);return`
    <button type="button" class="schedule-modal__day${o?" is-selected":""}${r?" is-outside-month":""}" data-planning-agenda-date="${n}">
      <span class="schedule-modal__day-number">${e.getDate()}</span>
      <span class="schedule-modal__day-qty">${s}</span>
    </button>
  `}function no(e){const a=Qt(e.selectedDate);return`
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--week">${Array.from({length:7},(n,o)=>Kt({date:ma(a,o),selectedDate:e.selectedDate})).join("")}</div>
  `}function oo(e){const a=new Date(e.currentDate.getFullYear(),e.currentDate.getMonth(),1),t=ma(a,-a.getDay());return`
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--month">${Array.from({length:42},(o,r)=>Kt({date:ma(t,r),selectedDate:e.selectedDate,currentMonth:a.getMonth()})).join("")}</div>
  `}function Wt(e){const a=e.viewMode==="month"?"schedule-modal__calendar-grid--month":"schedule-modal__calendar-grid--week",t=e.viewMode==="month"?oo(e):no(e);return`<div class="schedule-modal__calendar-grid ${a}">${t}</div>`}function ro(e=jt()){return Pe({id:ze,title:"Agendamento",size:"xl",className:"schedule-modal",body:`
      <div class="schedule-modal__content">
        ${le({id:"planning-agenda-location-select",label:"Selecionar localização",required:!0,placeholder:"Selecionar...",items:[{label:"Estufa 1",value:"estufa-1"},{label:"Estufa 2",value:"estufa-2"}]})}

        <div class="schedule-modal__period-row">
          <span class="schedule-modal__period-text" data-planning-agenda-period>${Gt(e.selectedDate)}</span>
          <div class="schedule-modal__period-nav">
            <button type="button" class="schedule-modal__icon-btn" data-planning-agenda-nav="prev" aria-label="Periodo anterior">${_("chevron-left",{size:14})}</button>
            <button type="button" class="schedule-modal__icon-btn" data-planning-agenda-nav="next" aria-label="Proximo periodo">${_("chevron-right",{size:14})}</button>
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
        ${q({text:"Voltar",variant:"outline-dark",size:"sm"}).replace("<button ",'<button data-planning-agenda-action="back" ')}
        ${q({text:"Selecionar data",variant:"primary",size:"sm"}).replace("<button ",'<button data-planning-agenda-action="select-date" ')}
      </div>
    `})}function so(e={}){return Pe({id:Me,title:"Agendamento",size:"sm",className:"reschedule-modal",body:`
      <div class="reschedule-modal__content">
        ${S({id:"planning-reagenda-date",type:"date",label:"Data",required:!0,value:e.date||"",className:"reschedule-modal__date-field"})}
        ${S({id:"planning-reagenda-location",label:"Localização",required:!0,placeholder:"Nome da localização",value:e.location||""})}
        ${S({id:"planning-reagenda-responsible",label:"Responsável",required:!0,placeholder:"Nome do responsável",value:e.responsible||""})}
        <span class="reschedule-modal__error" data-planning-reagenda-error hidden>Preencha todos os campos obrigatórios.</span>
      </div>
    `,footer:`
      <div class="reschedule-modal__footer">
        ${q({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button ",'<button data-planning-reagenda-action="cancel" ')}
        ${q({text:"Confirmar",variant:"primary",size:"sm"}).replace("<button ",'<button data-planning-reagenda-action="confirm" ')}
      </div>
    `})}function Fe({restoreFocus:e=!0}={}){const a=document.querySelector(`[data-modal="${Me}"]`),t=document.querySelector(`[data-modal-backdrop="${Me}"]`);!a||!t||(Fa(),we(Me),document.querySelector(`[data-modal="${ze}"]`)?.classList.contains("is-visible")&&(document.body.style.overflow="hidden"),a.remove(),t.remove(),e&&ka?.focus&&ka.focus(),ka=null)}function He({restoreFocus:e=!0}={}){Fe({restoreFocus:!1});const a=document.querySelector(`[data-modal="${ze}"]`),t=document.querySelector(`[data-modal-backdrop="${ze}"]`);if(!a||!t)return;Na(),we(ze),document.querySelector(`[data-modal="${Oe}"]`)?.classList.contains("is-visible")&&(document.body.style.overflow="hidden"),a.remove(),t.remove(),e&&ya?.focus&&ya.focus(),ya=null}function io(e=null){He({restoreFocus:!1}),ya=e;let a=jt();document.body.insertAdjacentHTML("beforeend",ro(a));const t=document.querySelector(`[data-modal="${ze}"]`),n=document.querySelector(`[data-modal-backdrop="${ze}"]`);if(!t||!n)return;const o=t.querySelector("#planning-agenda-location-select"),r=t.querySelector("[data-modal-close]"),s=()=>{const p=t.querySelector("[data-planning-agenda-period]");p&&(p.textContent=a.viewMode==="month"?Ht(a.currentDate):Gt(a.selectedDate));const x=t.querySelector("[data-planning-agenda-calendar]");x&&(x.classList.toggle("schedule-modal__calendar--month",a.viewMode==="month"),x.classList.toggle("schedule-modal__calendar--week",a.viewMode==="week"),x.innerHTML=Wt(a)),t.querySelectorAll("[data-planning-agenda-view]").forEach(M=>{M.classList.toggle("is-active",M.dataset.planningAgendaView===a.viewMode)});const y=t.querySelector("[data-planning-agenda-day-title]");y&&(y.textContent=`Agendamentos para o dia ${a.selectedDate.getDate()}`)},d=(p=null)=>{Fe({restoreFocus:!1}),ka=p,document.body.insertAdjacentHTML("beforeend",so({date:Ra(a.selectedDate),location:"",responsible:""}));const x=document.querySelector(`[data-modal="${Me}"]`),y=document.querySelector(`[data-modal-backdrop="${Me}"]`);if(!x||!y)return;const M=x.querySelector("[data-modal-close]"),T=x.querySelector("#planning-reagenda-date"),P=x.querySelector("#planning-reagenda-location"),A=x.querySelector("#planning-reagenda-responsible"),z=x.querySelector("[data-planning-reagenda-error]"),I=()=>{z&&(z.hidden=!0),[T,P,A].forEach(D=>{D?.closest(".field")?.classList.remove("field--error")})},m=()=>{I();const D=[];return T?.value||D.push(T),P?.value?.trim()||D.push(P),A?.value?.trim()||D.push(A),D.length?(D.forEach(l=>l?.closest(".field")?.classList.add("field--error")),z&&(z.hidden=!1),D[0]?.focus?.(),!1):!0},H=()=>Fe(),R=D=>{D.target===y&&Fe()},j=()=>{m()&&(pa("Reagendamento confirmado"),Fe())},U=D=>{D.key==="Escape"&&(D.preventDefault(),D.stopPropagation(),Fe())},ce=D=>{const l=D.target.closest("[data-planning-reagenda-action]");if(!l)return;const g=l.dataset.planningReagendaAction;if(g==="cancel"){Fe();return}g==="confirm"&&j()};M?.addEventListener("click",H),y.addEventListener("click",R),x.addEventListener("click",ce),document.addEventListener("keydown",U,!0),[T,P,A].forEach(D=>D?.addEventListener("input",I)),Fa=()=>{M?.removeEventListener("click",H),y.removeEventListener("click",R),x.removeEventListener("click",ce),document.removeEventListener("keydown",U,!0),[T,P,A].forEach(D=>D?.removeEventListener("input",I)),Fa=()=>{}},$e(Me)},i=()=>He(),u=p=>{p.target===n&&He()},k=p=>{p.key==="Escape"&&(document.querySelector(`[data-modal="${Me}"]`)?.classList.contains("is-visible")||(p.preventDefault(),p.stopPropagation(),He()))},C=p=>{const x=p.target.closest("[data-planning-agenda-action]");if(x){const A=x.dataset.planningAgendaAction;if(A==="back"){He();return}if(A==="select-date"){const z=document.querySelector("#planning-future-date");z&&(z.value=Ra(a.selectedDate),z.dispatchEvent(new Event("input",{bubbles:!0}))),He();return}}const y=p.target.closest("[data-planning-agenda-view]");if(y){a.viewMode=y.dataset.planningAgendaView==="month"?"month":"week",a.viewMode==="month"&&(a.currentDate=oa(a.selectedDate)),s();return}const M=p.target.closest("[data-planning-agenda-nav]");if(M){const A=M.dataset.planningAgendaNav==="prev"?-1:1;a.viewMode==="month"?a.currentDate=ao(a.currentDate,A):(a.selectedDate=ma(a.selectedDate,A*7),a.currentDate=oa(a.selectedDate)),s();return}const T=p.target.closest("[data-planning-agenda-date]");if(T){const A=Xn(T.dataset.planningAgendaDate);if(!A)return;a.selectedDate=A,a.currentDate=oa(A),s();return}const P=p.target.closest("[data-planning-agenda-reagendar]");if(P){d(P);return}};r?.addEventListener("click",i),n.addEventListener("click",u),t.addEventListener("click",C),document.addEventListener("keydown",k,!0),Na=()=>{Fe({restoreFocus:!1}),r?.removeEventListener("click",i),n.removeEventListener("click",u),t.removeEventListener("click",C),document.removeEventListener("keydown",k,!0),Na=()=>{}},$e(ze),s(),o?.focus&&setTimeout(()=>o.focus(),120)}function Ge({restoreFocus:e=!0}={}){He({restoreFocus:!1}),Qe({restoreFocus:!1});const a=document.querySelector(`[data-modal="${Oe}"]`),t=document.querySelector(`[data-modal-backdrop="${Oe}"]`);if(!a||!t)return;Ba(),we(Oe),document.querySelector("[data-drawer].is-open")&&(document.body.style.overflow="hidden"),a.remove(),t.remove(),e&&ha?.focus&&ha.focus(),ha=null}function lo(e={}){const{anchorEl:a=null,orderItem:t={},onAddRow:n=null}=e,o=Yn(e),r=_a(t.availableQuantity||t.available||t.totalPedido||"0");Ge({restoreFocus:!1}),ha=a;const d=xa.get(o)||Jn(r);xa.set(o,d),document.body.insertAdjacentHTML("beforeend",Zn({orderItem:{...t,available:Aa(r)},rows:d.rows}));const i=document.querySelector(`[data-modal="${Oe}"]`),u=document.querySelector(`[data-modal-backdrop="${Oe}"]`);if(!i||!u)return;const k=i.querySelector("#planning-service-type");let C=()=>{};const p=i.querySelector("[data-modal-close]"),x=i.querySelector('[data-planning-action="cancel"]');i.querySelector('[data-planning-action="submit"]');const y=i.querySelector("[data-planning-dynamic-content]"),M=()=>{x&&(x.className=d.serviceType==="remessa-futura"?"btn btn--text-primary btn--sm":"btn btn--outline-dark btn--sm")},T=()=>{const c=i.querySelector("[data-planning-linked-feedback]");if(!c||d.serviceType!=="estoque-venda-direta")return;const $=d.linkedItems.length;c.hidden=$===0,c.textContent=$?`Pedido vinculado: ${$} item(ns) selecionado(s).`:""},P=()=>{y&&(C(),y.innerHTML=Vt(d.serviceType,d),C=ye(y)||(()=>{}),T(),M())},A=()=>{const c=i.querySelector(".planning-modal__available");c&&(c.textContent=Aa(d.availableQuantity))},z=()=>{d.serviceType==="remessa-futura"?(d.futureDraftQuantity=i.querySelector("#planning-future-quantity")?.value||d.futureDraftQuantity,d.futureDraftLocation=i.querySelector("#planning-future-location")?.value||d.futureDraftLocation,d.futureDraftResponsible=i.querySelector("#planning-future-responsible")?.value||d.futureDraftResponsible,d.futureDraftDate=i.querySelector("#planning-future-date")?.value||d.futureDraftDate):(d.draftQuantity=i.querySelector("#planning-quantity")?.value||d.draftQuantity,d.draftLot=i.querySelector("#planning-lot")?.value||d.draftLot),xa.set(o,d)},I=()=>{z(),Ge()},m=c=>{c.target===u&&(z(),Ge())},H=c=>{c.key==="Escape"&&(document.querySelector(`[data-modal="${Kn}"]`)?.classList.contains("is-visible")||document.querySelector(`[data-modal="${ze}"]`)?.classList.contains("is-visible")||document.querySelector(`[data-modal="${Me}"]`)?.classList.contains("is-visible")||(c.preventDefault(),c.stopPropagation(),z(),Ge()))},R=c=>{const $=c.target.closest("[data-planning-row-action]");if(!$)return;const h=$.dataset.planningRowAction,w=Number($.dataset.rowIndex);if(h==="delete"&&!Number.isNaN(w)){if(d.serviceType==="remessa-futura"){const E=d.futureRows[w];d.availableQuantity+=_a(E?.quantity),d.futureRows=d.futureRows.filter((v,f)=>f!==w)}else d.rows=d.rows.filter((E,v)=>v!==w);P(),A();return}console.log(`Ação ${h} na linha`,w)},j=c=>{Gn({anchorEl:c,selectedIds:d.linkedItems,onBack:()=>{c?.focus&&c.focus()},onSave:$=>{d.linkedItems=Array.isArray($)?$:[],T()}})},U=()=>{if(d.serviceType==="remessa-futura"){const w=i.querySelector("#planning-future-quantity"),E=i.querySelector("#planning-future-location"),v=i.querySelector("#planning-future-responsible"),f=i.querySelector("#planning-future-date"),L=w?.value||"",N=E?.value||"",O=v?.value?.trim()||"",W=f?.value||"";if(!L||!N||!O||!W){La("Preencha todos os campos obrigatórios.");return}const G=_a(L);if(G<=0){La("Informe uma quantidade válida.");return}const B=d.availableQuantity-G;if(B<0){La("Valor digitado maior que o disponível.");return}d.futureDraftQuantity=L,d.futureDraftLocation=N,d.futureDraftResponsible=O,d.futureDraftDate=W,d.futureRows.push({plannedDate:d.futureDraftDate,location:Ot.find(ne=>ne.value===d.futureDraftLocation)?.label||d.futureDraftLocation,responsible:d.futureDraftResponsible,quantity:Aa(G)});const me=d.futureRows[d.futureRows.length-1];d.availableQuantity=B,d.futureDraftLocation="",d.futureDraftResponsible="",d.futureDraftQuantity="",d.futureDraftDate="",typeof n=="function"&&n({serviceType:d.serviceType,orderItem:t,row:me}),P(),A();return}const c=i.querySelector("#planning-quantity")?.value||"5000",$=i.querySelector("#planning-lot")?.value||"0001";d.draftQuantity=c,d.draftLot=$,d.rows.push({op:$,seedDate:"00/00/0000",daysAfterSowing:"30 dias",quantity:c});const h=d.rows[d.rows.length-1];typeof n=="function"&&n({serviceType:d.serviceType,orderItem:t,row:h}),P()},ce=()=>{io(i.querySelector('[data-planning-action="check-agenda"]'))},D=()=>{pa("Planejamento enviado",{message:"Itens enviados para expedição."}),Ge()},g=(c=>{if(!c)return()=>{};const $=E=>{const v=E.target;if(v instanceof HTMLElement){if(v.id==="planning-service-type"){const f=v.value||"estoque-venda-direta";d.serviceType=f,P();return}v.id==="planning-quantity"&&(d.draftQuantity=v.value),v.id==="planning-lot"&&(d.draftLot=v.value),v.id==="planning-future-location"&&(d.futureDraftLocation=v.value),v.id==="planning-future-quantity"&&(d.futureDraftQuantity=v.value),v.id==="planning-future-date"&&(d.futureDraftDate=v.value),v.id==="planning-future-responsible"&&v instanceof HTMLInputElement&&(d.futureDraftResponsible=v.value)}},h=E=>{const v=E.target.closest("[data-planning-action]");if(v){const f=v.dataset.planningAction;if(f==="cancel"){I();return}if(f==="submit"){D();return}if(f==="add-row"){U();return}if(f==="link-order"){j(v);return}if(f==="check-agenda"){ce();return}}R(E)},w=E=>{const v=E.target;v instanceof HTMLInputElement&&v.id==="planning-future-responsible"&&(d.futureDraftResponsible=v.value)};return c.addEventListener("change",$),c.addEventListener("click",h),c.addEventListener("input",w),()=>{c.removeEventListener("change",$),c.removeEventListener("click",h),c.removeEventListener("input",w)}})(i);p?.addEventListener("click",I),u.addEventListener("click",m),document.addEventListener("keydown",H,!0),P(),A(),k&&(k.value=d.serviceType),M(),Ba=()=>{g(),p?.removeEventListener("click",I),u.removeEventListener("click",m),document.removeEventListener("keydown",H,!0),C(),Ba=()=>{}},$e(Oe),setTimeout(()=>{k?.focus?.()},120)}const Z=Object.freeze({PRODUCAO:"producao",PEDIDOS:"pedidos"}),ke=Object.freeze({KANBAN:"kanban",LIST:"list"}),Ut=new Set(["aguardando-aprovacao","agendado","semeio","germinacao","casa-vegetacao","expedicao","finalizado","cancelado"]),ja={columns:[{id:"aguardando-aprovacao",title:"Aguardando Agendamento",color:"green",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data planejada:",value:"14/01/2025"}]},{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data planejada:",value:"14/01/2025"}]}]},{id:"agendado",title:"Agendado",color:"blue",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data planejada:",value:"14/01/2025"}]}]},{id:"semeio",title:"Semeio",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]},{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"germinacao",title:"Germinação",color:"purple",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"aguardando-enxertia",title:"Aguardando Enxertia",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"sala-corte",title:"Sala de Corte",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"sala-fusao",title:"Sala de Fusão",color:"orange",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"adaptacao",title:"Adaptação",color:"yellow",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"casa-vegetacao",title:"Casa de Vegetação",color:"pink",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"expedicao",title:"Expedição",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"finalizado",title:"Finalizado",color:"green",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"cancelado",title:"Cancelado",color:"gray",cards:[]}]};function he(e){const a=e%2===0?"A2W-2025-001":"A2W-2025-002",t=e%2===0?"TG-45678":"TG-45679";return{code:a,subtitle:t,badgeLabel:"Faturado",badgeVariant:"success",badgeStyle:"soft",items:[{icon:"user",label:"João Silva"},{icon:null,label:"Vendedor: Maria Santos"},{type:"divider"},{icon:"calendar",label:"Pedido: 14/01/2025"},{icon:"package",label:"Muda de Eucalipto Clone AEC 144"},{icon:"circle",label:"Qtd: 5.000"},{icon:"calendar",label:"Entrega em: 19/02/2025"},{icon:"circle",label:"R$ 15.500,00",className:"kanban-card__item--price"}]}}const co={columns:[{id:"recebido",title:"Recebido",color:"green",cards:[he(0),he(1)]},{id:"aguardando-aprovacao",title:"Aguardando Aprovação",color:"gray",cards:[he(0),he(1)]},{id:"em-preparacao",title:"Em Preparação",color:"blue",cards:[he(0),he(1)]},{id:"em-producao",title:"Em Produção",color:"purple",cards:[he(0),he(1)]},{id:"em-expedicao",title:"Em Expedição",color:"cyan",cards:[he(0),he(1)]},{id:"em-transito",title:"Em Trânsito",color:"orange",cards:[he(0),he(1)]},{id:"finalizados",title:"Finalizados",color:"green",cards:[he(0),he(1)]},{id:"cancelado",title:"Cancelado",color:"gray",cards:[]}]},qt={"A2W-2025-001":{companyName:"Agro Silva LTDA.",client:{codigo:"43242343",cpfCnpj:"123.456.789-00",razaoSocial:"Nome da razao social",nomeFantasia:"Nome fantasia",endereco:"Rua das Flores, 123 - São Paulo, SP",telefone:"(11) 98765-4321",email:"joao.silva@gmail.com",vendedor:"Maria Santos"},items:[{id:"item-1",product:"Eucalipto MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",availableQuantity:"1000",planning:[{type:"planned",amount:"3.000",date:"12/12/25",responsible:"Fazenda Boa Vista",quantity:"3.000"},{type:"canceled",amount:"1.000",date:"12/12/25",responsible:"Fazenda Boa Vista",quantity:"1.000"}]},{id:"item-2",product:"Eucalipto MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",availableQuantity:"1000",planning:[]}],summary:{orderDate:"14/01/2025",expectedDelivery:"19/02/2025",totalValue:"R$ 15.500,00",notes:"Cliente solicitou entrega pela manhã"}},"A2W-2025-002":{companyName:"Agro Campo LTDA.",client:{codigo:"992211",cpfCnpj:"987.654.321-00",razaoSocial:"Agro Campo Razão Social",nomeFantasia:"Agro Campo",endereco:"Av. Central, 450 - Campinas, SP",telefone:"(19) 99888-1111",email:"compras@agrocampo.com",vendedor:"Maria Santos"},items:[{id:"item-1",product:"Eucalipto MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",availableQuantity:"1000",planning:[{type:"planned",amount:"2.000",date:"10/01/26",responsible:"Fazenda Primavera",quantity:"2.000"}]},{id:"item-2",product:"Eucalipto MUD-002",quantity:"3.000",unitValue:"R$ 3,00",totalValue:"R$ 9.000,00",availableQuantity:"600",planning:[]}],summary:{orderDate:"16/01/2025",expectedDelivery:"21/02/2025",totalValue:"R$ 21.500,00",notes:"Priorizar entrega no período da tarde"}}},uo={"A2W-2025-001":{"item-1":[{id:"evt-1",title:"Lote pronto para entrega - OP-2025-002",date:"08/11/2025 às 14:35",description:"Lote de 5.000 mudas aprovado e liberado para expedição",badgeLabel:"Sucesso",badgeType:"sucesso",metaRole:"Responsável",metaName:"André Cesarni"},{id:"evt-2",title:"Vistoria de qualidade - OP-2025-002",date:"05/11/2025 às 10:15",description:"Vistoria realizada com aprovação. Taxa de germinação: 98%. Data estimada para enxertia atualizada.",badgeLabel:"Operação",badgeType:"operacao",metaRole:"Operador",metaName:"Ana Silva"},{id:"evt-3",title:"Mudança de localização - OP-2025-002",date:"20/10/2025 às 15:45",description:"Lote movido de Estufa 1 - Bancada A2 para Estufa 2 - Bancada C5",badgeLabel:"Movimentação",badgeType:"movimentacao",metaRole:"Responsável",metaName:"Pedro Almeida"},{id:"evt-4",title:"Semeio realizado - OP-2025-002",date:"15/10/2025 às 09:00",description:"Semeio de 5.000 mudas de Eucalipto Clone AEC 144 iniciado na Estufa 1",badgeLabel:"Produção",badgeType:"producao",metaRole:"Responsável",metaName:"André Santos"},{id:"evt-5",title:"Planejamento realizado - OP-2025-002",date:"16/01/2025 às 11:20",description:"Eucalipto Clone AEC 144. Quantidade: 3.000. Data de semeio: 15/10/2025. Previsão de entrega: 19/02/2025",badgeLabel:"Planejamento",badgeType:"planejamento",metaRole:"Responsável",metaName:"André Santos"},{id:"evt-6",title:"Item cancelado",date:"16/01/2025 às 11:20",description:"Eucalipto Clone AEC 144. Quantidade: 3.000",badgeLabel:"Cancelado",badgeType:"cancelado",metaRole:"Responsável",metaName:"André Santos"},{id:"evt-7",title:"Pedido recebido",date:"14/01/2025 às 09:15",description:"Pedido A2W-2025-001 recebido do cliente João Silva",badgeLabel:"Início",badgeType:"inicio",metaRole:"Vendedor",metaName:"Maria Santos"}],"item-2":[{id:"evt-8",title:"Planejamento realizado - OP-2025-003",date:"17/01/2025 às 08:45",description:"Quantidade: 2.000. Previsão de entrega: 22/02/2025",badgeLabel:"Planejamento",badgeType:"planejamento",metaRole:"Responsável",metaName:"André Santos"},{id:"evt-9",title:"Pedido recebido",date:"14/01/2025 às 09:15",description:"Item incluído no pedido A2W-2025-001",badgeLabel:"Início",badgeType:"inicio",metaRole:"Vendedor",metaName:"Maria Santos"}]},"A2W-2025-002":{"item-1":[{id:"evt-10",title:"Lote pronto para entrega - OP-2025-021",date:"09/11/2025 às 13:10",description:"Lote de 5.000 mudas aprovado e liberado para expedição",badgeLabel:"Sucesso",badgeType:"sucesso",metaRole:"Responsável",metaName:"Renata Prado"},{id:"evt-11",title:"Pedido recebido",date:"16/01/2025 às 10:05",description:"Pedido A2W-2025-002 recebido do cliente Agro Campo",badgeLabel:"Início",badgeType:"inicio",metaRole:"Vendedor",metaName:"Maria Santos"}],"item-2":[{id:"evt-12",title:"Item cancelado",date:"18/01/2025 às 15:42",description:"Cancelamento por indisponibilidade de lote",badgeLabel:"Cancelado",badgeType:"cancelado",metaRole:"Responsável",metaName:"Renata Prado"},{id:"evt-13",title:"Pedido recebido",date:"16/01/2025 às 10:05",description:"Item incluído no pedido A2W-2025-002",badgeLabel:"Início",badgeType:"inicio",metaRole:"Vendedor",metaName:"Maria Santos"}]}},Lt={"A2W-2025-001":{products:[{id:"prod-0001",code:"0001",name:"Muda de Tomate",label:"0001 - Muda de Tomate"},{id:"prod-0002",code:"0002",name:"Muda de Eucalipto",label:"0002 - Muda de Eucalipto"}],byProduct:{"prod-0001":{metrics:{total:5e3,planned:5e3,canceled:5e3,pending:0},plans:[{id:"plan-1",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"12/01/2025",deliveryDate:"12/01/2025",sowingDate:"23/12/2023",daysAfterSowing:"32 dias",responsible:"Viktor Dantas"},{id:"plan-2",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"cancelado",planningDate:"11/01/2025",deliveryDate:"11/01/2025",sowingDate:"22/12/2023",daysAfterSowing:"31 dias",responsible:"Viktor Dantas"},{id:"plan-3",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"10/01/2025",deliveryDate:"10/01/2025",sowingDate:"21/12/2023",daysAfterSowing:"30 dias",responsible:"Viktor Dantas"},{id:"plan-4",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"09/01/2025",deliveryDate:"09/01/2025",sowingDate:"20/12/2023",daysAfterSowing:"29 dias",responsible:"Viktor Dantas"},{id:"plan-5",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"cancelado",planningDate:"08/01/2025",deliveryDate:"08/01/2025",sowingDate:"19/12/2023",daysAfterSowing:"28 dias",responsible:"Viktor Dantas"},{id:"plan-6",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"07/01/2025",deliveryDate:"07/01/2025",sowingDate:"18/12/2023",daysAfterSowing:"27 dias",responsible:"Viktor Dantas"}]},"prod-0002":{metrics:{total:3e3,planned:2e3,canceled:500,pending:500},plans:[{id:"plan-7",op:"OP-2025-003",stage:"Semeio",product:"Muda de Eucalipto Clone MUD-002",quantity:1e3,status:"ativo",planningDate:"06/01/2025",deliveryDate:"15/02/2025",sowingDate:"17/12/2023",daysAfterSowing:"26 dias",responsible:"Viktor Dantas"},{id:"plan-8",op:"OP-2025-003",stage:"Semeio",product:"Muda de Eucalipto Clone MUD-002",quantity:1e3,status:"cancelado",planningDate:"05/01/2025",deliveryDate:"14/02/2025",sowingDate:"16/12/2023",daysAfterSowing:"25 dias",responsible:"Viktor Dantas"}]}}},"A2W-2025-002":{products:[{id:"prod-0001",code:"0001",name:"Muda de Tomate",label:"0001 - Muda de Tomate"}],byProduct:{"prod-0001":{metrics:{total:5e3,planned:5e3,canceled:5e3,pending:0},plans:[{id:"plan-9",op:"OP-2025-021",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"12/01/2025",deliveryDate:"18/02/2025",sowingDate:"23/12/2023",daysAfterSowing:"32 dias",responsible:"Viktor Dantas"},{id:"plan-10",op:"OP-2025-021",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"11/01/2025",deliveryDate:"17/02/2025",sowingDate:"22/12/2023",daysAfterSowing:"31 dias",responsible:"Viktor Dantas"}]}}}};let se=Z.PRODUCAO,We=ja,Re=ke.KANBAN,Oa={showFinished:!1,showCanceled:!1},$a={noGrafting:!1},po=7;function mo(e){const a=String(e).trim();if(/^\d{4}-\d{2}-\d{2}$/.test(a)){const[t,n,o]=a.split("-");return`${o}/${n}/${t}`}return a}function vo({details:e=null,item:a=null,planningData:t={}}={}){const n=String(po++).padStart(3,"0"),o=t?.serviceType||"",r=t?.row||{},s=o==="remessa-futura",d=e?.orderCode||t?.orderItem?.orderCode||"-",i=t?.orderItem?.product||a?.product||"-",u=r.quantity||"-",k=r.plannedDate||r.seedDate||"-",C=r.location||"-",p=r.responsible||"-",x=r.op||"-",y=String(u).startsWith("Qtd:")?String(u):`Qtd: ${u}`;return{code:`OP-${new Date().getFullYear()}-${n}`,subtitle:d,badgeLabel:"Enxertia",preserveCustomData:!0,items:[{icon:"user",label:s?p:`Lote ${x}`},{icon:"circle",label:i,value:y},{type:"divider"},{icon:"calendar",label:"Data planejada:",value:mo(k)},...s?[{icon:"map-pin",label:"Localização:",value:C}]:[]]}}function go({details:e=null,item:a=null,planningData:t={}}={}){const n=ja.columns.find(r=>r?.id==="agendado");if(!n)return;const o=vo({details:e,item:a,planningData:t});n.cards=[o,...n.cards||[]],se===Z.PRODUCAO&&Ha()}function Jt(){window.alert("Nao foi possivel acessar a camera do dispositivo.")}function fo(){return(window.location.hash||"").replace("#","")==="/estufas/pedidos"?Z.PEDIDOS:Z.PRODUCAO}function Qa(e){return e===ke.LIST?ke.LIST:ke.KANBAN}function Yt(){return`kanban:view-mode:${se}`}function bo(){try{const e=sessionStorage.getItem(Yt());return Qa(e)}catch{return ke.KANBAN}}function _o(e){try{sessionStorage.setItem(Yt(),Qa(e))}catch{}}function ho(){return"kanban:orders:list-filters"}function yo(){try{const e=sessionStorage.getItem(ho()),a=e?JSON.parse(e):null;return{showFinished:!!a?.showFinished,showCanceled:!!a?.showCanceled}}catch{return{showFinished:!1,showCanceled:!1}}}function ue(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ko(){const e=document.getElementById("app-header"),a=document.querySelector(".kanban");se=fo(),We=se===Z.PEDIDOS?co:ja,Re=bo(),Oa=yo(),e&&e.classList.add("header--kanban-compact-tabs"),a&&a.classList.toggle("kanban--pedidos",se===Z.PEDIDOS);let t=()=>{};const n=()=>{t(),Ha(),t=Re===ke.KANBAN?Mo():()=>{}},o=wo({getViewMode:()=>Re,setViewMode:C=>{const p=Qa(C),x=p!==Re;Re=p,x&&_o(p),n()}});n();const r=$o(),s=Vr(),d=se===Z.PEDIDOS?Er():()=>{},i=se===Z.PRODUCAO?Io():()=>{},u=se===Z.PRODUCAO?Ko():()=>{},k=se===Z.PRODUCAO?er():()=>{};return()=>{e&&e.classList.remove("header--kanban-compact-tabs"),a&&a.classList.remove("kanban--pedidos"),typeof o=="function"&&o(),typeof r=="function"&&r(),typeof t=="function"&&t(),typeof s=="function"&&s(),typeof d=="function"&&d(),typeof i=="function"&&i(),typeof u=="function"&&u(),typeof k=="function"&&k()}}function wo({getViewMode:e=()=>ke.KANBAN,setViewMode:a=()=>{}}={}){const t=document.getElementById("kanban-toolbar-chips"),n=document.getElementById("kanban-title"),o=document.getElementById("kanban-qr-read-btn"),r=document.getElementById("kanban-new-btn"),s=document.getElementById("kanban-toolbar-visibility-filters"),d=document.getElementById("kanban-view-kanban-btn"),i=document.getElementById("kanban-view-list-btn"),u=["Badge","Badge","Badge"];t&&(t.innerHTML=u.map(A=>`
      <span class="kanban-chip">
        ${A}
        <svg class="kanban-chip__close" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
      </span>
    `).join("")),n&&(n.textContent=se===Z.PEDIDOS?"Gestão de Pedidos":"Gestão da Produção"),r&&(r.textContent=se===Z.PEDIDOS?"Novo Pedido":"Nova produção"),o&&(o.hidden=se===Z.PEDIDOS);let k=null,C=null;if(s)if(se===Z.PEDIDOS)s.innerHTML="",s.hidden=!0;else{const A=Nt({id:"kanban-no-grafting-toggle",size:"sm",checked:$a.noGrafting}).replace('class="toggle-input"','class="toggle-input" data-production-filter="no-grafting"');s.innerHTML=`
        <label class="kanban-toolbar__visibility-item">
          <span>Sem Enxertia</span>
          ${A}
        </label>
      `,C=s.querySelector('input[data-production-filter="no-grafting"]'),k=z=>{$a.noGrafting=!!z.target?.checked,a(e())},C?.addEventListener("change",k),s.hidden=!1}const p=()=>{const A=e()===ke.LIST;d?.classList.toggle("is-active",!A),i?.classList.toggle("is-active",A),d?.setAttribute("aria-pressed",String(!A)),i?.setAttribute("aria-pressed",String(A))};p();const x=()=>{a(ke.KANBAN),p()},y=()=>{a(ke.LIST),p()},M=A=>{A.target?.closest?.("button#kanban-qr-read-btn")&&(A.preventDefault(),A.stopPropagation(),Jt())};d?.addEventListener("click",x),i?.addEventListener("click",y),document.addEventListener("click",M,!0);const T=document.getElementById("kanban-back-btn"),P=()=>{window.location.hash=se===Z.PEDIDOS?"#/estufas/agenda-eventos":"#/producao"};return T&&T.addEventListener("click",P),()=>{T&&T.removeEventListener("click",P),d?.removeEventListener("click",x),i?.removeEventListener("click",y),document.removeEventListener("click",M,!0),C?.removeEventListener("change",k)}}function $o(){const e=document.getElementById("kanban-board");if(!e)return()=>{};let a=!1,t=!1,n=0,o=0,r=null,s=!1;const d=6,i=y=>y instanceof Element?!!y.closest('button, a, input, select, textarea, label, [role="button"]'):!1,u=()=>{!a&&!t||(e.classList.remove("is-dragging"),a=!1,t=!1,r=null)},k=y=>{y.button===0&&(e.classList.contains("kanban-board--list")||i(y.target)||(a=!0,t=!1,n=y.clientX,o=e.scrollLeft,r=y.pointerId))},C=y=>{if(!a||r!==y.pointerId)return;const M=y.clientX-n;!t&&Math.abs(M)>=d&&(t=!0,e.classList.add("is-dragging")),t&&(e.scrollLeft=o-M,y.preventDefault())},p=y=>{!a||r!==y.pointerId||(t&&(s=!0),u())},x=y=>{s&&(s=!1,y.preventDefault(),y.stopPropagation())};return e.addEventListener("pointerdown",k),e.addEventListener("pointermove",C,{passive:!1}),e.addEventListener("pointerup",p),e.addEventListener("pointercancel",p),e.addEventListener("pointerleave",p),e.addEventListener("click",x,!0),()=>{u(),e.removeEventListener("pointerdown",k),e.removeEventListener("pointermove",C),e.removeEventListener("pointerup",p),e.removeEventListener("pointercancel",p),e.removeEventListener("pointerleave",p),e.removeEventListener("click",x,!0)}}function Ha(){const e=document.getElementById("kanban-board");if(e){if(e.innerHTML="",e.classList.toggle("kanban-board--list",Re===ke.LIST),Re===ke.LIST){Co(e);return}So(e)}}function So(e){if(!e)return;(se===Z.PRODUCAO&&$a.noGrafting?We.columns.filter(t=>Ut.has(t?.id)):We.columns).forEach(t=>{const n=xn({id:t.id,title:t.title,color:t.color,count:t.cards.length});e.insertAdjacentHTML("beforeend",n),t.cards.length>0?t.cards.forEach((r,s)=>{const d=an(r,t.id,s),i=Bn(d);Mn(t.id,i)}):Tn(t.id);const o=document.querySelector(`[data-column-id="${t.id}"]`);if(o){const r=o.querySelector(".kanban-column__header"),s=Fn({id:`picker-${t.id}`,selected:t.color});r.style.position="relative",r.insertAdjacentHTML("beforeend",s)}})}function Co(e){const a=se===Z.PRODUCAO&&$a.noGrafting?We.columns.filter(o=>Ut.has(o?.id)):We.columns,n=(se===Z.PEDIDOS?a.filter(o=>!(!Oa.showFinished&&(o.id==="finalizados"||o.id==="finalizado")||!Oa.showCanceled&&o.id==="cancelado")):a).flatMap(o=>o.cards.map((r,s)=>Eo(o,r,s)));e.innerHTML=`
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
          ${_("user",{size:14})}
          <span>${ue(a.clientValue||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${_("calendar",{size:14})}
          <span>${ue(a.date1||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${_("calendar",{size:14})}
          <span>${ue(a.date2||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${_("package",{size:14})}
          <span>${ue(a.qty||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta kanban-list-row__meta--value">
          ${_("circle",{size:12})}
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
          ${_("user",{size:14})}
          <span>${ue(a.clientLabel?`${a.clientLabel} ${a.clientValue}`.trim():a.clientValue||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${_("calendar",{size:14})}
          <span>${ue(a.date1||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${_("calendar",{size:14})}
          <span>${ue(a.date2||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${_("package",{size:14})}
          <span>${ue(a.qty||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__status-cell">
        ${Ie({text:a.status||"-",variant:Zt(e.id),style:"soft",size:"sm"})}
        </div>
      </div>
    </article>
  `}function Xt(e){const n=String(e||"").match(/[\d.]+/)?.[0]||"-";return n==="-"?"-":`${n} un`}function Lo(e){return String(e).trim()||"-"}function en(e=""){const a=String(e||"").trim().toLowerCase();return a?a.startsWith("var(")||a.startsWith("#")||a.startsWith("rgb(")||a.startsWith("rgba(")||a.startsWith("hsl(")||a.startsWith("hsla(")?e:{cyan:"rgb(6 182 212)",green:"rgb(34 197 94)",blue:"rgb(59 130 246)",indigo:"rgb(99 102 241)",slate:"rgb(100 116 139)",purple:"rgb(168 85 247)",yellow:"rgb(234 179 8)",pink:"rgb(236 72 153)",red:"rgb(239 68 68)",orange:"rgb(249 115 22)",gray:"rgb(100 116 139)"}[a]||"var(--color-primary)":"var(--color-primary)"}function Po({columnData:e,cardData:a,mode:t}){return t===Z.PEDIDOS?Ao({columnData:e,cardData:a}):xo({columnData:e,cardData:a})}function Ao({columnData:e,cardData:a}){const t=Array.isArray(a?.items)?a.items:[],n=t.filter(s=>s?.icon==="calendar"),o=t.find(s=>s?.icon==="circle"&&/^Qtd:/i.test(String(s?.label||""))),r=t.find(s=>s?.className?.includes("price"));return{title:a?.code||"-",subtitle:a?.subtitle||"-",type:a?.badgeLabel||"",clientLabel:"Cliente",clientValue:t[0]?.label||"-",date1:n[0]?.value||"-",date2:n[1]?.value||"-",qty:Xt(o?.label||o?.value||"-"),amount:Lo(r?.label||r?.value||"-"),status:e?.title||"-",accentColor:en(e?.color)}}function xo({columnData:e,cardData:a}){const t=Array.isArray(a?.items)?a.items:[],n=t.filter(d=>d?.icon==="calendar"),o=t[0]||{},r=t.find(d=>d?.icon==="circle"&&d?.label&&!d?.value)||{},s=t.find(d=>d?.icon==="circle"&&d?.value)||{};return{title:a?.code||"-",subtitle:a?.subtitle||r?.label||"-",type:a?.badgeLabel||"",clientLabel:o?.value?(o?.label||"").trim():"",clientValue:o?.value||o?.label||"-",date1:n[0]?.value||"-",date2:n[1]?.value||"-",qty:Xt(s?.value||s?.label||"-"),amount:"",status:e?.title||"-",accentColor:en(e?.color)}}function Mo(){const e=[];We.columns.forEach(t=>{const n=document.querySelector(`[data-column-settings="${t.id}"]`),o=document.getElementById(`picker-${t.id}`);if(!n||!o)return;const r=s=>{s.stopPropagation(),document.querySelectorAll("[data-color-picker]").forEach(d=>{d!==o&&Ia(d)}),On(o)};n.addEventListener("click",r),e.push({settingsBtn:n,handleSettingsClick:r}),Rn(o,s=>{In(t.id,s);const d=We.columns.find(i=>i?.id===t.id);d&&(d.color=s),Re===ke.LIST&&Ha()})});const a=t=>{const n=t.target.closest("[data-color-picker]"),o=t.target.closest("[data-column-settings]");!n&&!o&&document.querySelectorAll("[data-color-picker]").forEach(r=>{Ia(r)})};return document.addEventListener("click",a),()=>{e.forEach(({settingsBtn:t,handleSettingsClick:n})=>{t.removeEventListener("click",n)}),document.removeEventListener("click",a)}}function an(e,a,t){return se===Z.PEDIDOS?{...e,badgeVariant:e.badgeVariant||"success",badgeStyle:e.badgeStyle||"soft",subtitle:e.subtitle||"",items:e.items||[]}:a==="aguardando-aprovacao"&&t===0?{...e,badgeLabel:"Normal",badgeVariant:"soft-info",subtitle:"",items:[{icon:"file",label:"Cód. do Cliente:",value:"001"},{icon:"user",label:"Fazenda Sol Nascente"},{type:"divider"},{icon:"calendar",label:"Data Abertura OP:",value:"14/01/2025"},{icon:"circle",label:"001 - Produto 1"},{icon:"circle",label:"Qtd:",value:"5.000"},{icon:"calendar",label:"Data Entrada:",value:"19/02/2025"},{icon:"calendar",label:"Previsão Saída:",value:"19/02/2025"}]}:e?.preserveCustomData?{...e,badgeVariant:e.badgeVariant||"light",subtitle:e.subtitle||"",items:Array.isArray(e.items)?e.items:[]}:{...e,badgeVariant:e.badgeVariant||"light",subtitle:e.subtitle||"TG-45678",items:zo(a)}}function zo(e){const a=[{icon:"user",label:"Fazenda Sol Nascente"},{type:"divider"},{icon:"calendar",label:"Pedido:",value:"14/01/2025"},{icon:"circle",label:"Tomate Cereja - Lote 123"},{icon:"circle",label:"Qtd:",value:"5.000"},{icon:"calendar",label:"Início:",value:"19/02/2025"}];return e==="semeio"&&(a[2]={icon:"calendar",label:"Data semeio:",value:"14/01/2025"},a[5]={icon:"map-pin",label:"Localização:",value:"Estufa 1"}),e==="germinacao"&&(a[2]={icon:"calendar",label:"Data semeio:",value:"14/01/2025"},a[5]={icon:"calendar",label:"Dias após semeio:",value:"14"},a.push({icon:"map-pin",label:"Localização:",value:"Estufa 1"})),a}function Io(){const e=document.getElementById("kanban-new-btn");if(!e)return()=>{};const a="kanban-new-production-drawer",t=document.querySelector(`[data-drawer="${a}"]`),n=document.querySelector(`[data-drawer-backdrop="${a}"]`);t&&t.remove(),n&&n.remove();const o=Ee({id:a,title:"Nova produção",width:540,content:Vo(),footer:Qo()});document.body.insertAdjacentHTML("beforeend",o);const r=De({id:a,root:document}),s=document.querySelector(`[data-drawer="${a}"]`);if(!s||!r)return()=>{};const d=ye(s),i=s.querySelector(".drawer__header"),u=s.querySelector(".new-production-drawer__status-wrap"),k=i?.querySelector("[data-drawer-close]");i&&u&&k&&(u.classList.add("is-in-header"),i.insertBefore(u,k));const C=s.querySelector("#new-production-origin");C&&C.setAttribute("data-drawer-autofocus","");const p="kanban-schedule-modal",x="kanban-reschedule-modal",y="kanban-tags-modal";let M=()=>{},T=null,P=Ue(),A=()=>{},z=null,I=()=>{},m=null;const H=()=>{r.open(e)},R=({restoreFocus:$=!0}={})=>{j({restoreFocus:!1});const h=document.querySelector(`[data-modal="${p}"]`),w=document.querySelector(`[data-modal-backdrop="${p}"]`);!h||!w||(M(),we(p),s.classList.contains("is-open")&&(document.body.style.overflow="hidden"),h.remove(),w.remove(),$&&T&&typeof T.focus=="function"&&T.focus(),T=null)},j=({restoreFocus:$=!0}={})=>{const h=document.querySelector(`[data-modal="${x}"]`),w=document.querySelector(`[data-modal-backdrop="${x}"]`);!h||!w||(A(),we(x),(s.classList.contains("is-open")||document.querySelector(`[data-modal="${p}"]`))&&(document.body.style.overflow="hidden"),h.remove(),w.remove(),$&&z?.focus&&z.focus(),z=null)},U=({anchorEl:$=null,initialValues:h={}}={})=>{document.querySelector(`[data-modal="${x}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${x}"]`)?.remove();const w={date:h.date||Ve(P.selectedDate),location:h.location||"",responsible:h.responsible||""};z=$,document.body.insertAdjacentHTML("beforeend",dn({modalId:x,values:w}));const E=document.querySelector(`[data-modal="${x}"]`),v=document.querySelector(`[data-modal-backdrop="${x}"]`);if(!E||!v)return;const f=ye(E),L=E.querySelector("#reschedule-date"),N=E.querySelector("#reschedule-location"),O=E.querySelector("#reschedule-responsible"),W=E.querySelector("[data-reschedule-error]"),G=E.querySelector("[data-modal-close]"),B=E.querySelector('[data-reschedule-action="cancel"]'),me=E.querySelector('[data-reschedule-action="confirm"]'),ne=()=>{W&&(W.hidden=!0),[L,N,O].forEach(Y=>{Y?.closest(".field")?.classList.remove("field--error")})},de=()=>{ne();const Y=[];return L?.value||Y.push(L),N?.value?.trim()||Y.push(N),O?.value?.trim()||Y.push(O),Y.length?(Y.forEach(qe=>qe?.closest(".field")?.classList.add("field--error")),W&&(W.hidden=!1),Y[0]?.focus?.(),!1):!0},be=()=>j(),Q=Y=>{Y.target===v&&j()},te=Y=>{Y.key==="Escape"&&(Y.preventDefault(),Y.stopPropagation(),j())},ve=()=>{de()&&(console.log("Reagendar confirmado",{data:L?.value||"",localizacao:N?.value?.trim()||"",responsavel:O?.value?.trim()||""}),j())};G?.addEventListener("click",be),B?.addEventListener("click",be),me?.addEventListener("click",ve),v.addEventListener("click",Q),document.addEventListener("keydown",te,!0),[L,N,O].forEach(Y=>{Y?.addEventListener("input",ne)}),A=()=>{G?.removeEventListener("click",be),B?.removeEventListener("click",be),me?.removeEventListener("click",ve),v.removeEventListener("click",Q),document.removeEventListener("keydown",te,!0),[L,N,O].forEach(Y=>{Y?.removeEventListener("input",ne)}),typeof f=="function"&&f(),A=()=>{}},$e(x),setTimeout(()=>{L?.focus&&L.focus()},120)},ce=()=>{const $=s.querySelector("#new-production-scheduling-date");$&&($.value=Ve(P.selectedDate),$.dispatchEvent(new Event("input",{bubbles:!0})))},D=$=>{const h=document.querySelector(`[data-modal="${p}"]`),w=document.querySelector(`[data-modal-backdrop="${p}"]`);h&&h.remove(),w&&w.remove(),P=Ue(),T=$||null,document.body.insertAdjacentHTML("beforeend",Wa({modalId:p,state:P}));const E=document.querySelector(`[data-modal="${p}"]`),v=document.querySelector(`[data-modal-backdrop="${p}"]`);if(!E||!v)return;const f=E.querySelector("#schedule-location-select"),L=E.querySelector("[data-modal-close]"),N=()=>R(),O=B=>{B.target===v&&R()},W=B=>{B.key==="Escape"&&(document.querySelector(`[data-modal="${x}"]`)||(B.preventDefault(),B.stopPropagation(),R()))},G=B=>{const me=B.target.closest("[data-schedule-action]");if(me){const te=me.dataset.scheduleAction;if(te==="back"){R();return}if(te==="select-date"){ce(),R();return}}const ne=B.target.closest("[data-schedule-view]");if(ne){P.viewMode=ne.dataset.scheduleView==="month"?"month":"week",P.viewMode==="month"&&(P.currentDate=Ce(P.selectedDate)),Se(E,P);return}const de=B.target.closest("[data-schedule-nav]");if(de){const te=de.dataset.scheduleNav==="prev"?-1:1;P.viewMode==="month"?P.currentDate=Ka(P.currentDate,te):(P.selectedDate=Je(P.selectedDate,te*7),P.currentDate=Ce(P.selectedDate)),Se(E,P);return}const be=B.target.closest("[data-schedule-date]");if(be){const te=Ga(be.dataset.scheduleDate);if(!te)return;P.selectedDate=te,P.currentDate=Ce(te),Se(E,P);return}const Q=B.target.closest("[data-schedule-reagendar]");Q&&U({anchorEl:Q,initialValues:{date:Ve(P.selectedDate),location:f?.value||"",responsible:""}})};v.addEventListener("click",O),E.addEventListener("click",G),L&&L.addEventListener("click",N),document.addEventListener("keydown",W,!0),M=()=>{v.removeEventListener("click",O),E.removeEventListener("click",G),L&&L.removeEventListener("click",N),document.removeEventListener("keydown",W,!0),M=()=>{}},$e(p),Se(E,P),f&&typeof f.focus=="function"&&setTimeout(()=>f.focus(),140)},l=({restoreFocus:$=!0}={})=>{const h=document.querySelector(`[data-modal="${y}"]`),w=document.querySelector(`[data-modal-backdrop="${y}"]`);!h||!w||(I(),we(y),s.classList.contains("is-open")&&(document.body.style.overflow="hidden"),h.remove(),w.remove(),$&&m?.focus&&m.focus(),m=null)},g=$=>{document.querySelector(`[data-modal="${y}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${y}"]`)?.remove(),m=$||null,document.body.insertAdjacentHTML("beforeend",jo({modalId:y}));const h=document.querySelector(`[data-modal="${y}"]`),w=document.querySelector(`[data-modal-backdrop="${y}"]`);if(!h||!w)return;const E=h.querySelector("[data-new-production-tags-search]"),v=h.querySelector("[data-modal-close]"),f=()=>l(),L=W=>{W.target===w&&l()},N=W=>{W.key==="Escape"&&(W.preventDefault(),W.stopPropagation(),l())},O=W=>{const G=W.target.closest("[data-new-production-tags-action]");if(!G)return;const B=G.dataset.newProductionTagsAction;if(B==="cancel"||B==="save"){l();return}B==="remove"&&G.closest(".new-production-tags-modal__chip")?.remove()};w.addEventListener("click",L),h.addEventListener("click",O),v?.addEventListener("click",f),document.addEventListener("keydown",N,!0),I=()=>{w.removeEventListener("click",L),h.removeEventListener("click",O),v?.removeEventListener("click",f),document.removeEventListener("keydown",N,!0),I=()=>{}},$e(y),E?.focus&&setTimeout(()=>E.focus(),120)},c=$=>{const h=$.target.closest("[data-new-production-action]");if(!h)return;const w=h.dataset.newProductionAction;if(w==="cancel"){l({restoreFocus:!1}),r.close();return}if(w==="consult-agenda"){D(h);return}if(w==="open-tags"){g(h);return}const E=s.querySelector("[data-new-production-form]");if(E){if(w==="clear"){Ho(E);return}if(w==="save"){console.log("Salvar nova produção",At(E));return}if(w==="create-op"){if(!Go(E))return;console.log("Criar OP",At(E))}}};return e.addEventListener("click",H),s.addEventListener("click",c),()=>{R({restoreFocus:!1}),l({restoreFocus:!1}),e.removeEventListener("click",H),s.removeEventListener("click",c),typeof d=="function"&&d(),r.cleanup&&r.cleanup();const $=document.querySelector(`[data-drawer="${a}"]`),h=document.querySelector(`[data-drawer-backdrop="${a}"]`);$&&$.remove(),h&&h.remove()}}function Ue(){const e=new Date(2026,0,14);return{selectedDate:e,currentDate:e,viewMode:"week"}}function Ce(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function Ve(e){const a=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${t}-${n}`}function Ga(e){if(!e||typeof e!="string")return null;const[a,t,n]=e.split("-").map(Number);return[a,t,n].some(Number.isNaN)?null:new Date(a,t-1,n)}function To(e,a){return!e||!a?!1:e.getFullYear()===a.getFullYear()&&e.getMonth()===a.getMonth()&&e.getDate()===a.getDate()}function tn(e){const a=Ce(e);return a.setDate(a.getDate()-a.getDay()),a}function Je(e,a){const t=Ce(e);return t.setDate(t.getDate()+a),t}function Ka(e,a){const t=Ce(e);return t.setMonth(t.getMonth()+a),t}function nn(e){return`${["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][e.getMonth()]} ${e.getFullYear()}`}function on(e){const a=tn(e),t=Je(a,6),n=nn(t).replace(` ${t.getFullYear()}`,"");return`${String(a.getDate()).padStart(2,"0")} - ${String(t.getDate()).padStart(2,"0")} de ${n} ${t.getFullYear()}`}function Bo(e){return e.getFullYear()!==2026||e.getMonth()!==0?"":new Set([12,13,14,15,16]).has(e.getDate())?"15.000":""}function rn({date:e,selectedDate:a,currentMonth:t=null}){const n=Ve(e),o=To(e,a),r=t!==null&&e.getMonth()!==t,s=Bo(e);return`
    <button type="button" class="schedule-modal__day${o?" is-selected":""}${r?" is-outside-month":""}" data-schedule-date="${n}">
      <span class="schedule-modal__day-number">${e.getDate()}</span>
      <span class="schedule-modal__day-qty">${s}</span>
    </button>
  `}function No(e){const a=tn(e.selectedDate);return`
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--week">${Array.from({length:7},(n,o)=>rn({date:Je(a,o),selectedDate:e.selectedDate})).join("")}</div>
  `}function Fo(e){const a=new Date(e.currentDate.getFullYear(),e.currentDate.getMonth(),1),t=Je(a,-a.getDay());return`
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--month">${Array.from({length:42},(o,r)=>rn({date:Je(t,r),selectedDate:e.selectedDate,currentMonth:a.getMonth()})).join("")}</div>
  `}function sn(e){const a=e.viewMode==="month"?"schedule-modal__calendar-grid--month":"schedule-modal__calendar-grid--week",t=e.viewMode==="month"?Fo(e):No(e);return`<div class="schedule-modal__calendar-grid ${a}">${t}</div>`}function Se(e,a){if(!e||!a)return;const t=e.querySelector("[data-schedule-period]");t&&(t.textContent=a.viewMode==="month"?nn(a.currentDate):on(a.selectedDate));const n=e.querySelector("[data-schedule-calendar]");n&&(n.classList.toggle("schedule-modal__calendar--month",a.viewMode==="month"),n.classList.toggle("schedule-modal__calendar--week",a.viewMode==="week"),n.innerHTML=sn(a)),e.querySelectorAll("[data-schedule-view]").forEach(r=>{r.classList.toggle("is-active",r.dataset.scheduleView===a.viewMode)});const o=e.querySelector("[data-schedule-day-title]");o&&(o.textContent=`Agendamentos para o dia ${a.selectedDate.getDate()}`)}function Wa(e={}){const{modalId:a="kanban-schedule-modal",state:t=Ue()}=e;return Pe({id:a,title:"Agendamento",size:"xl",className:"schedule-modal",body:Ro(t),footer:Oo()})}function Ro(e){return`
    <div class="schedule-modal__content">
      ${le({id:"schedule-location-select",label:"Selecionar localização",required:!0,placeholder:"Selecionar...",items:[{label:"Estufa 1",value:"estufa-1"},{label:"Estufa 2",value:"estufa-2"}]})}

      <div class="schedule-modal__period-row">
        <span class="schedule-modal__period-text" data-schedule-period>${on(e.selectedDate)}</span>
        <div class="schedule-modal__period-nav">
          <button type="button" class="schedule-modal__icon-btn" data-schedule-nav="prev" aria-label="Periodo anterior">${_("chevron-left",{size:14})}</button>
          <button type="button" class="schedule-modal__icon-btn" data-schedule-nav="next" aria-label="Proximo periodo">${_("chevron-right",{size:14})}</button>
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
      ${q({text:"Voltar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-schedule-action="back"')}
      ${q({text:"Selecionar data",variant:"primary",size:"sm"}).replace("<button",'<button data-schedule-action="select-date"')}
    </div>
  `}function dn(e={}){const{modalId:a="kanban-reschedule-modal",values:t={}}=e,n=S({id:"reschedule-date",type:"date",label:"Data",required:!0,value:t.date||"",className:"reschedule-modal__date-field"}),o=S({id:"reschedule-location",label:"Localização",required:!0,placeholder:"Nome da localização",value:t.location||""}),r=S({id:"reschedule-responsible",label:"Responsável",required:!0,placeholder:"Nome do responsável",value:t.responsible||""}),s=q({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-reschedule-action="cancel"'),d=q({text:"Confirmar",variant:"primary",size:"sm"}).replace("<button",'<button data-reschedule-action="confirm"');return Pe({id:a,title:"Agendamento",size:"sm",className:"reschedule-modal",body:`
      <div class="reschedule-modal__content">
        ${n}
        ${o}
        ${r}
        <span class="reschedule-modal__error" data-reschedule-error hidden>Preencha todos os campos obrigatórios.</span>
      </div>
    `,footer:`
      <div class="reschedule-modal__footer">
        ${s}
        ${d}
      </div>
    `})}function Vo(){return`
    <section class="new-production-drawer">
      <div class="new-production-drawer__status-wrap">
        <span class="new-production-drawer__status">Aguardando Aprovação</span>
      </div>

      <div class="new-production-drawer__scroll">
        <form class="new-production-form" data-new-production-form novalidate>
          <section class="new-production-section">
            <h3 class="new-production-section__title">${_("file",{size:14})}Informações da Produção</h3>
            <div class="new-production-card">
              ${le({id:"new-production-origin",label:"Origem",required:!0,value:"producao-propria",items:[{label:"Produção própria",value:"producao-propria"}]})}

              <div class="new-production-grid new-production-grid--two">
                ${S({id:"new-production-erp",label:"Código ERP",required:!0,placeholder:"Código ERP"})}
                ${S({id:"new-production-cpf-cnpj",label:"CPF/CNPJ",required:!0,placeholder:"Produção própria"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${S({id:"new-production-business-name",label:"Razão Social/Nome",required:!0,placeholder:"Classe"})}
                ${S({id:"new-production-fantasy-name",label:"Nome Fantasia/Apelido",required:!0,placeholder:"EX: MUD-1"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${S({id:"new-production-responsible",label:"Responsável",required:!0,placeholder:"Digite nome da classe"})}
                ${S({id:"new-production-class",label:"Classe",required:!0,placeholder:"EX: MUD-1"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${S({id:"new-production-product-code",label:"Cód. do Produto",required:!0,placeholder:"EX: MUD-1"})}
                ${S({id:"new-production-product",label:"Produto",required:!0,placeholder:"Nome do produto"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${S({id:"new-production-quantity",label:"Quantidade",required:!0,placeholder:"Nome do responsável"})}
                ${S({id:"new-production-location",label:"Localização",required:!0,placeholder:"Digite a localização"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${S({id:"new-production-scheduling-date",type:"date",label:"Data de Agendamento Semeio",required:!0,className:"new-production-date-field",iconRight:_("calendar",{size:16})})}
                <div class="new-production-agenda-btn-wrap">
                  ${q({text:"+ Consultar agenda",variant:"outline-dark"}).replace("<button",'<button data-new-production-action="consult-agenda"')}
                </div>
              </div>

              <div class="new-production-type">
                <div class="new-production-chip-row">
                  ${xe({label:"Enxertia",value:"enxertia",selected:!0,size:"sm"})}
                </div>
              </div>

              ${S({id:"new-production-notes",type:"textarea",label:"Observações",required:!0,rows:2})}

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
                ${q({text:"Salvar",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-action="save"')}
              </div>
            </div>
          </section>

          <section class="new-production-section">
            <h3 class="new-production-section__title">${_("settings",{size:14})}Informações para Semeio</h3>

            <div class="new-production-subsection">
              <h4 class="new-production-subsection__title">Enxerto</h4>
              ${Pt()}
            </div>

            <div class="new-production-subsection">
              <h4 class="new-production-subsection__title">Porta-enxerto</h4>
              ${Pt()}
            </div>
          </section>
        </form>
      </div>
    </section>
  `}function jo(e={}){const{modalId:a="kanban-tags-modal"}=e,t=q({text:"Cancelar",style:"text",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-tags-action="cancel"'),n=q({text:"Salvar",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-tags-action="save"');return Pe({id:a,title:"Etiquetas",size:"sm",className:"new-production-tags-modal",body:`
      <div class="new-production-tags-modal__content">
        <div class="new-production-tags-modal__search">
          <input type="text" class="new-production-tags-modal__input" placeholder="Buscar etiquetas" data-new-production-tags-search />
          <span class="new-production-tags-modal__search-icon" aria-hidden="true">${_("search",{size:14})}</span>
        </div>
        <div class="new-production-tags-modal__create">
          <input type="text" class="new-production-tags-modal__input" placeholder="Nova etiqueta" />
          <button type="button" class="new-production-tags-modal__add-btn">Adicionar ${_("arrow-right",{size:14})}</button>
        </div>
        <div class="new-production-tags-modal__group">
          <div class="new-production-tags-modal__group-title">
            <span class="new-production-tags-modal__group-icon" aria-hidden="true">${_("filter",{size:14})}</span>
            <span>Etiquetas</span>
          </div>
          <div class="new-production-tags-modal__chips">
            <div class="new-production-tags-modal__chip">
              <span class="new-production-tags-modal__dot new-production-tags-modal__dot--blue" aria-hidden="true"></span>
              <span>Em trajeto</span>
              <button type="button" class="new-production-tags-modal__chip-remove" data-new-production-tags-action="remove" aria-label="Remover etiqueta">${_("close",{size:12})}</button>
            </div>
            <div class="new-production-tags-modal__chip">
              <span class="new-production-tags-modal__dot new-production-tags-modal__dot--green" aria-hidden="true"></span>
              <span>Faturado</span>
              <button type="button" class="new-production-tags-modal__chip-remove" data-new-production-tags-action="remove" aria-label="Remover etiqueta">${_("close",{size:12})}</button>
            </div>
          </div>
        </div>
      </div>
    `,footer:`
      <div class="new-production-tags-modal__footer">
        ${t}
        ${n}
      </div>
    `})}function Pt(){return`
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
      ${q({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-new-production-action="cancel"')}
      ${q({text:"Criar OP",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-action="create-op"')}
    </div>
  `}function Ho(e){if(!e)return;e.querySelectorAll("input, select, textarea").forEach(t=>{if(t.tagName.toLowerCase()==="select"){t.selectedIndex=0;return}if(t.type==="date"){t.value="";return}t.value=""})}function At(e){const a={};return e&&new FormData(e).forEach((n,o)=>{a[o]=n}),a}function Go(e){if(!e)return!1;const a=e.querySelectorAll("[required]");let t=null;return a.forEach(n=>{(n.value||"").trim()||t||(t=n)}),t?(typeof t.focus=="function"&&t.focus(),!1):!0}function Ko(){const e=document.getElementById("kanban-board");if(!e)return()=>{};const a="kanban-scheduling-drawer",t=document.querySelector(`[data-drawer="${a}"]`),n=document.querySelector(`[data-drawer-backdrop="${a}"]`);t&&t.remove(),n&&n.remove();const o=Ee({id:a,title:"OP-2025-006",width:540,content:Wo(),footer:Yo()});document.body.insertAdjacentHTML("beforeend",o);const r=De({id:a,root:document}),s=document.querySelector(`[data-drawer="${a}"]`);if(!s||!r)return()=>{};const d=ye(s),i=s.querySelector("#scheduling-tabs")?.closest("[data-tabs]"),u=i?.querySelector('.tabs-tab[data-tab="0"]');u&&u.setAttribute("data-drawer-autofocus","");const k="kanban-schedule-modal-scheduling";let C=Ue(),p=()=>{},x=null;const y=({restoreFocus:z=!0}={})=>{const I=document.querySelector(`[data-modal="${k}"]`),m=document.querySelector(`[data-modal-backdrop="${k}"]`);!I||!m||(p(),we(k),s.classList.contains("is-open")&&(document.body.style.overflow="hidden"),I.remove(),m.remove(),z&&x?.focus&&x.focus(),x=null)},M=z=>{document.querySelector(`[data-modal="${k}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${k}"]`)?.remove(),C=Ue(),x=z||null,document.body.insertAdjacentHTML("beforeend",Wa({modalId:k,state:C}));const I=document.querySelector(`[data-modal="${k}"]`),m=document.querySelector(`[data-modal-backdrop="${k}"]`);if(!I||!m)return;const H=I.querySelector("#schedule-location-select"),R=I.querySelector("[data-modal-close]"),j=()=>y(),U=l=>{l.target===m&&y()},ce=l=>{l.key==="Escape"&&(l.preventDefault(),l.stopPropagation(),y())},D=l=>{const g=l.target.closest("[data-schedule-action]");if(g){const w=g.dataset.scheduleAction;if(w==="back"){y();return}if(w==="select-date"){const E=s.querySelector("#scheduling-date-input");E&&(E.value=Ve(C.selectedDate),E.dispatchEvent(new Event("input",{bubbles:!0}))),y();return}}const c=l.target.closest("[data-schedule-view]");if(c){C.viewMode=c.dataset.scheduleView==="month"?"month":"week",C.viewMode==="month"&&(C.currentDate=Ce(C.selectedDate)),Se(I,C);return}const $=l.target.closest("[data-schedule-nav]");if($){const w=$.dataset.scheduleNav==="prev"?-1:1;C.viewMode==="month"?C.currentDate=Ka(C.currentDate,w):(C.selectedDate=Je(C.selectedDate,w*7),C.currentDate=Ce(C.selectedDate)),Se(I,C);return}const h=l.target.closest("[data-schedule-date]");if(h){const w=Ga(h.dataset.scheduleDate);if(!w)return;C.selectedDate=w,C.currentDate=Ce(w),Se(I,C)}};m.addEventListener("click",U),I.addEventListener("click",D),R?.addEventListener("click",j),document.addEventListener("keydown",ce,!0),p=()=>{m.removeEventListener("click",U),I.removeEventListener("click",D),R?.removeEventListener("click",j),document.removeEventListener("keydown",ce,!0),p=()=>{}},$e(k),Se(I,C),H?.focus&&setTimeout(()=>H.focus(),120)},T=z=>{const I=z.target.closest(".kanban-card");if(I&&e.contains(I)){const j=I.closest("[data-column-id]");if(!j||j.dataset.columnId!=="aguardando-aprovacao")return;z.target.closest(".kanban-card__code")&&z.preventDefault(),r.open(I);return}const m=z.target.closest(".kanban-column__title");if(!m||!e.contains(m))return;const H=m.closest("[data-column-id]");if(!H||H.dataset.columnId!=="aguardando-aprovacao")return;const R=Array.from(H.querySelectorAll(".kanban-card")).find(j=>j.offsetParent!==null&&!j.hasAttribute("hidden"))||H.querySelector(".kanban-card");R&&r.open(R)},P=z=>{if(!i)return;const I=z.target.closest(".tabs-tab");if(!I||!i.contains(I))return;const m=Number(I.dataset.tab);if(Number.isNaN(m))return;const H=i.querySelectorAll(".tabs-tab"),R=i.parentElement?.querySelectorAll(".tabs-panel");H.forEach((j,U)=>{j.classList.toggle("is-active",U===m),j.setAttribute("aria-selected",String(U===m))}),R&&R.forEach((j,U)=>{j.classList.toggle("is-active",U===m)})},A=z=>{const I=z.target.closest("[data-scheduling-action]");if(!I)return;const m=I.dataset.schedulingAction;if(m==="cancel"){r.close();return}if(m==="consult-agenda"){M(I);return}if(m!=="schedule")return;const H=s.querySelector("#scheduling-date-input"),R=s.querySelector("#scheduling-responsible-input");console.log({dataAgendamentoSemeio:H?.value||"",responsavelColetaSemente:R?.value||""})};return e.addEventListener("click",T),i&&i.addEventListener("click",P),s.addEventListener("click",A),()=>{y({restoreFocus:!1}),e.removeEventListener("click",T),i&&i.removeEventListener("click",P),s.removeEventListener("click",A),typeof d=="function"&&d(),r.cleanup&&r.cleanup();const z=document.querySelector(`[data-drawer="${a}"]`),I=document.querySelector(`[data-drawer-backdrop="${a}"]`);z&&z.remove(),I&&I.remove()}}function Wo(){return`
    <section class="scheduling-drawer">
      <div class="scheduling-drawer__summary">
        <p class="scheduling-drawer__subtitle">Fazenda Sol Nascente <span aria-hidden="true">•</span> Muda de Eucalipto Clone AEC 144</p>
        <span class="scheduling-drawer__status">Aguardando Agendamento</span>
      </div>
      ${Ca({id:"scheduling-tabs",variant:"underlined",fullWidth:!0,activeTab:0,tabs:[{label:"Detalhes e Planejamento",content:Uo()},{label:"Histórico",content:Jo()}]})}
    </section>
  `}function Uo(){const e=_("calendar",{size:16});return`
    <div class="scheduling-panel">
      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${_("file",{size:14})}Informações Gerais</h3>
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
        <h3 class="scheduling-section__title">${_("settings",{size:14})}Informações para Semeio</h3>
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
          ${q({text:"Gerar QR Code",variant:"outline-dark"})}
        </div>
      </section>

      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${_("calendar",{size:14})}Planejamento e Datas</h3>
        <div class="scheduling-info-card">
          <div class="scheduling-grid scheduling-grid--two">
            ${Le("Data do Pedido","15/01/2025")}
            ${Le("Data Planejada do Pedido","15/01/2025")}
          </div>
          <div class="scheduling-grid scheduling-grid--two scheduling-grid--inputs">
            ${S({id:"scheduling-date-input",type:"date",label:"Data de agendamento de Semeio",value:"2026-04-15",iconRight:e,className:"scheduling-date-field"})}
            ${S({id:"scheduling-responsible-input",label:"Responsável coleta da semente",value:"João da Silva"})}
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
      ${q({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-scheduling-action="cancel"')}
      ${q({text:"Agendar",variant:"primary",size:"sm"}).replace("<button",'<button data-scheduling-action="schedule"')}
    </div>
  `}function je(e,a){if(!e||Number.isNaN(a))return;const t=e.querySelectorAll(".tabs-tab"),n=e.parentElement?.querySelector(".tabs-content"),o=n?Array.from(n.children).filter(r=>r.classList.contains("tabs-panel")):null;t.forEach((r,s)=>{r.classList.toggle("is-active",s===a),r.setAttribute("aria-selected",String(s===a))}),o?.forEach((r,s)=>{r.classList.toggle("is-active",s===a)})}function Ye(){return`
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
  `}function Ze({id:e,firstTabLabel:a,firstTabContent:t}){return Ca({id:e,variant:"underlined",fullWidth:!0,activeTab:0,tabs:[{label:a,content:t},{label:"Detalhes",content:gr()},{label:"Ciclo",content:yr()}]})}function Zo(e){if(!e)return{code:"-",line1:"-",product:"-",quantity:"-",plannedDate:"-"};const a=e.querySelector(".kanban-card__code")?.textContent?.trim()||"-",t=Array.from(e.querySelectorAll(".kanban-card__item")).map(u=>{const k=Array.from(u.querySelectorAll("span")).map(C=>C.textContent?.trim()||"");return{label:k[0]||"",value:k[1]||""}}),n=t[0]?.label||"-",o=t.find(u=>/^qtd:/i.test(u.value)||/^qtd:/i.test(u.label))||t[1]||{label:"-",value:"-"},r=o.label||"-",s=o.value||o.label||"-",d=String(s).replace(/^qtd:\s*/i,"").trim()||"-",i=t.find(u=>/^data planejada:/i.test(u.label)||/^data semeio:/i.test(u.label))?.value||"-";return{code:a,line1:n,product:r,quantity:d,plannedDate:i}}function ca(e,a,t){e.querySelectorAll(".agendado-details-field").forEach(o=>{const r=o.querySelector(".agendado-details-field__label"),s=o.querySelector(".agendado-details-field__value");!r||!s||(r.textContent||"").trim()===a&&(s.textContent=t||"-")})}function Xo(e,a){if(!e||!a)return;const{code:t="-",line1:n="-",product:o="-",quantity:r="-",plannedDate:s="-"}=a,d=e.querySelector("[data-drawer-title]");d&&(d.textContent=t);const i=e.querySelectorAll(".agendado-drawer__summary-top .agendado-drawer__summary-left strong");i[0]&&(i[0].textContent=t),i[2]&&(i[2].textContent=n);const u=e.querySelectorAll(".agendado-drawer__summary-bottom .agendado-drawer__summary-left strong");u[1]&&(u[1].textContent=o),u[2]&&(u[2].textContent=r),ca(e,"CÃ³d. do Pedido",t),ca(e,"Data Agendada do Semeio",s),ca(e,"ResponsÃ¡vel agendamento",n),ca(e,"Produto",o),ca(e,"Quantidade",r);const k=e.querySelector(".agendado-details-field--full .agendado-details-field__value");k&&(k.textContent=o)}function er(){const e=document.getElementById("kanban-board");if(!e)return()=>{};const a="kanban-agendado-drawer",t="kanban-germinacao-drawer",n="kanban-casa-vegetacao-drawer",o="kanban-aguardando-enxertia-drawer",r="kanban-sala-corte-drawer",s="kanban-adaptacao-drawer",d="kanban-sala-fusao-drawer";document.querySelector(`[data-drawer="${a}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${a}"]`)?.remove(),document.querySelector(`[data-drawer="${t}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${t}"]`)?.remove(),document.querySelector(`[data-drawer="${n}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${n}"]`)?.remove(),document.querySelector(`[data-drawer="${o}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${o}"]`)?.remove(),document.querySelector(`[data-drawer="${r}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${r}"]`)?.remove(),document.querySelector(`[data-drawer="${s}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${s}"]`)?.remove(),document.querySelector(`[data-drawer="${d}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${d}"]`)?.remove();const i=Ee({id:a,title:"OP-2025-006",width:540,content:ar(),footer:Cr()});document.body.insertAdjacentHTML("beforeend",i);const u=Ee({id:t,title:"OP-2025-006",width:540,content:tr(),footer:""});document.body.insertAdjacentHTML("beforeend",u);const k=Ee({id:n,title:"OP-2025-006",width:540,content:nr(),footer:""});document.body.insertAdjacentHTML("beforeend",k);const C=Ee({id:o,title:"OP-2025-006",width:540,content:or(),footer:""});document.body.insertAdjacentHTML("beforeend",C);const p=Ee({id:r,title:"OP-2025-006",width:540,content:rr(),footer:""});document.body.insertAdjacentHTML("beforeend",p);const x=Ee({id:s,title:"OP-2025-006",width:540,content:dr(),footer:""});document.body.insertAdjacentHTML("beforeend",x);const y=Ee({id:d,title:"OP-2025-006",width:540,content:sr(),footer:""});document.body.insertAdjacentHTML("beforeend",y);const M=De({id:a,root:document}),T=document.querySelector(`[data-drawer="${a}"]`);if(!T||!M)return()=>{};const P=De({id:t,root:document}),A=document.querySelector(`[data-drawer="${t}"]`);if(!A||!P)return()=>{};const z=De({id:n,root:document}),I=document.querySelector(`[data-drawer="${n}"]`);if(!I||!z)return()=>{};const m=De({id:o,root:document}),H=document.querySelector(`[data-drawer="${o}"]`);if(!H||!m)return()=>{};const R=De({id:r,root:document}),j=document.querySelector(`[data-drawer="${r}"]`);if(!j||!R)return()=>{};const U=De({id:s,root:document}),ce=document.querySelector(`[data-drawer="${s}"]`);if(!ce||!U)return()=>{};const D=De({id:d,root:document}),l=document.querySelector(`[data-drawer="${d}"]`);if(!l||!D)return()=>{};const g=ye(T),c=ye(A),$=ye(I),h=ye(H),w=ye(j),E=ye(ce),v=ye(l);let f=null,L=null,N=null,O=null,W=!1;Ln(T);const G="kanban-schedule-modal-agendado",B="kanban-reschedule-modal-agendado";let me=()=>{},ne=()=>{},de=null,be=null,Q=Ue();const te=T.querySelector("#agendado-tabs")?.closest("[data-tabs]"),ve=A.querySelector("#germinacao-tabs")?.closest("[data-tabs]"),Y=I.querySelector("#casa-vegetacao-tabs")?.closest("[data-tabs]"),qe=H.querySelector("#aguardando-enxertia-tabs")?.closest("[data-tabs]"),Te=j.querySelector("#sala-corte-tabs")?.closest("[data-tabs]"),Be=ce.querySelector("#adaptacao-tabs")?.closest("[data-tabs]"),Ne=l.querySelector("#sala-fusao-tabs")?.closest("[data-tabs]"),Za=te?.querySelector('.tabs-tab[data-tab="0"]');Za&&Za.setAttribute("data-drawer-autofocus","");const Xa=ve?.querySelector('.tabs-tab[data-tab="0"]');Xa&&Xa.setAttribute("data-drawer-autofocus","");const et=Y?.querySelector('.tabs-tab[data-tab="0"]');et&&et.setAttribute("data-drawer-autofocus","");const at=qe?.querySelector('.tabs-tab[data-tab="0"]');at&&at.setAttribute("data-drawer-autofocus","");const tt=Te?.querySelector('.tabs-tab[data-tab="0"]');tt&&tt.setAttribute("data-drawer-autofocus","");const nt=Be?.querySelector('.tabs-tab[data-tab="0"]');nt&&nt.setAttribute("data-drawer-autofocus","");const ot=Ne?.querySelector('.tabs-tab[data-tab="0"]');ot&&ot.setAttribute("data-drawer-autofocus","");const rt=({columnId:F="",card:b=null}={})=>{if(!(!b||!F)){if(F==="agendado"){const V=Zo(b);Xo(T,V),M.open(b);return}if(F==="germinacao"){P.open(b);return}if(F==="casa-vegetacao"){z.open(b);return}if(F==="aguardando-enxertia"){m.open(b);return}if(F==="sala-corte"){R.open(b);return}if(F==="adaptacao"){U.open(b);return}if(F==="sala-fusao"){D.open(b);return}F==="semeio"&&qa(b)}},Sn=F=>{if(!F)return null;const b=Array.from(F.querySelectorAll(".kanban-card"));return b.length&&(b.find(V=>V.offsetParent!==null&&!V.hasAttribute("hidden"))||b[0])||null},st=F=>{const b=F.target.closest(".kanban-card");if(b&&e.contains(b)){F.target.closest(".kanban-card__code")&&F.preventDefault();const ee=b.closest("[data-column-id]")?.dataset.columnId;if(!ee)return;rt({columnId:ee,card:b});return}const V=F.target.closest(".kanban-column__title");if(!V||!e.contains(V))return;const X=V.closest("[data-column-id]"),ie=X?.dataset.columnId;if(!ie)return;const fe=Sn(X);fe&&rt({columnId:ie,card:fe})},dt=F=>{if(!te)return;const b=F.target.closest(".tabs-tab");if(!b||!te.contains(b))return;const V=Number(b.dataset.tab);je(te,V)},it=F=>{if(!ve)return;const b=F.target.closest(".tabs-tab");if(!b||!ve.contains(b))return;const V=Number(b.dataset.tab);je(ve,V)},lt=F=>{if(!Y)return;const b=F.target.closest(".tabs-tab");if(!b||!Y.contains(b))return;const V=Number(b.dataset.tab);je(Y,V)},ct=F=>{if(!qe)return;const b=F.target.closest(".tabs-tab");if(!b||!qe.contains(b))return;const V=Number(b.dataset.tab);je(qe,V)},ut=F=>{if(!Te)return;const b=F.target.closest(".tabs-tab");if(!b||!Te.contains(b))return;const V=Number(b.dataset.tab);je(Te,V)},pt=F=>{if(!Be)return;const b=F.target.closest(".tabs-tab");if(!b||!Be.contains(b))return;const V=Number(b.dataset.tab);je(Be,V)},mt=F=>{if(!Ne)return;const b=F.target.closest(".tabs-tab");if(!b||!Ne.contains(b))return;const V=Number(b.dataset.tab);je(Ne,V)},vt=(F,b,{onOpenSemeioDrawer:V}={})=>{const X=F.target.closest("[data-agendado-details-tab]");if(X){const ae=b.querySelector("[data-agendado-details]"),K=X.dataset.agendadoDetailsTab;return!ae||!K||(ae.querySelectorAll("[data-agendado-details-tab]").forEach(ee=>{const oe=ee===X;ee.classList.toggle("is-active",oe),ee.setAttribute("aria-selected",String(oe))}),ae.querySelectorAll("[data-agendado-details-panel]").forEach(ee=>{ee.classList.toggle("is-active",ee.dataset.agendadoDetailsPanel===K)})),!0}const ie=F.target.closest("[data-agendado-details-toggle]");if(ie){if(ie.dataset.agendadoOpenGerminacao==="true")return V?.(ie),!0;const ae=ie.closest("[data-agendado-details-accordion]");if(!ae)return!0;const K=ae.classList.toggle("is-collapsed");return ie.setAttribute("aria-expanded",String(!K)),!0}const fe=F.target.closest("[data-agendado-cycle-tab]");if(fe){const ae=b.querySelector("[data-agendado-cycle]"),K=fe.dataset.agendadoCycleTab;return!ae||!K||(ae.querySelectorAll("[data-agendado-cycle-tab]").forEach(ee=>{const oe=ee===fe;ee.classList.toggle("is-active",oe),ee.setAttribute("aria-selected",String(oe))}),ae.querySelectorAll("[data-agendado-cycle-panel]").forEach(ee=>{ee.classList.toggle("is-active",ee.dataset.agendadoCyclePanel===K)})),!0}return!1},qa=async F=>{try{f||(f=Et(()=>import("./enviar-germinacao-drawer-DFtuyUvM.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24])));const b=await f;if(!L&&typeof b.createEnviarGerminacaoDrawer=="function"&&(L=b.createEnviarGerminacaoDrawer()),!L?.open)return;M.close({restoreFocus:!1}),P.close({restoreFocus:!1}),z.close({restoreFocus:!1}),m.close({restoreFocus:!1}),R.close({restoreFocus:!1}),U.close({restoreFocus:!1}),D.close({restoreFocus:!1}),L.open(F||null)}catch(b){console.error("[kanban] failed to open enviar-germinacao drawer",b)}},gt=async()=>{if(!(W||L))try{f||(f=Et(()=>import("./enviar-germinacao-drawer-DFtuyUvM.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24])));const F=await f;if(W||L)return;typeof F.createEnviarGerminacaoDrawer=="function"&&(L=F.createEnviarGerminacaoDrawer())}catch(F){console.error("[kanban] failed to preload enviar-germinacao drawer",F)}};typeof window.requestIdleCallback=="function"?O=window.requestIdleCallback(()=>{gt()},{timeout:1200}):N=window.setTimeout(()=>{gt()},300);const ft=F=>{if(vt(F,T,{onOpenSemeioDrawer:X=>{qa(X)}}))return;const b=F.target.closest("[data-agendado-action]");if(!b)return;const V=b.dataset.agendadoAction;if(V==="cancel"){M.close();return}if(V==="reagendar"||V==="consult-agenda"){$t(b);return}if(V==="add-lote"){console.log(`Ação: ${V}`);return}if(V==="details-qr"||V==="details-view-order"||V==="details-view-image"){console.log(`Ação: ${V}`);return}if(V==="save-lote"){console.log("Salvar lote");return}if(V==="start-semeio"){const X=T.querySelector("[data-agendado-form]"),ie=X?Object.fromEntries(new FormData(X).entries()):{};console.log("Iniciar semeio",ie)}},Xe=({stageKey:F,stageDrawerElement:b,stageDrawerControls:V})=>X=>{if(vt(X,b,{onOpenSemeioDrawer:K=>{qa(K)}}))return;const ie=X.target.closest("[data-op-step-action]");if(ie&&b.contains(ie)){const K=ie.getAttribute("data-op-step-action");if(!K)return;if(K==="cancel"){V.close();return}if(K==="consult-agenda"){$t(ie);return}if(K==="consult-location"||K==="quality"||K==="qr"){console.log(`Ação: ${K}`);return}if(K==="register-tray"||K==="read-qr"||K==="start-execution"||K==="add-tray"||K==="reagendar"){if(K==="read-qr"){Jt();return}console.log(`Ação: ${K}`);return}if(K==="voltar-etapa"||K==="submit-next"){const ee=b.querySelector(`[data-op-step-form="${F}"]`),oe=ee?Object.fromEntries(new FormData(ee).entries()):{};console.log(K,oe)}return}const fe=X.target.closest("[data-agendado-action]");if(!fe||!b.contains(fe))return;const ae=fe.dataset.agendadoAction;(ae==="details-qr"||ae==="details-view-order"||ae==="details-view-image")&&console.log(`Ação: ${ae}`)},bt=Xe({stageKey:"germinacao",stageDrawerElement:A,stageDrawerControls:P}),_t=Xe({stageKey:"casa-vegetacao",stageDrawerElement:I,stageDrawerControls:z}),ht=Xe({stageKey:"aguardando-enxertia",stageDrawerElement:H,stageDrawerControls:m}),yt=Xe({stageKey:"sala-corte",stageDrawerElement:j,stageDrawerControls:R}),kt=Xe({stageKey:"adaptacao",stageDrawerElement:ce,stageDrawerControls:U}),wt=Xe({stageKey:"sala-fusao",stageDrawerElement:l,stageDrawerControls:D});e.addEventListener("click",st),te&&te.addEventListener("click",dt),ve&&ve.addEventListener("click",it),Y&&Y.addEventListener("click",lt),qe&&qe.addEventListener("click",ct),Te&&Te.addEventListener("click",ut),Be&&Be.addEventListener("click",pt),Ne&&Ne.addEventListener("click",mt),T.addEventListener("click",ft),A.addEventListener("click",bt),I.addEventListener("click",_t),H.addEventListener("click",ht),j.addEventListener("click",yt),ce.addEventListener("click",kt),l.addEventListener("click",wt);const ea=({restoreFocus:F=!0}={})=>{aa({restoreFocus:!1});const b=document.querySelector(`[data-modal="${G}"]`),V=document.querySelector(`[data-modal-backdrop="${G}"]`);!b||!V||(me(),we(G),T.classList.contains("is-open")&&(document.body.style.overflow="hidden"),b.remove(),V.remove(),F&&de?.focus&&de.focus(),de=null)},aa=({restoreFocus:F=!0}={})=>{const b=document.querySelector(`[data-modal="${B}"]`),V=document.querySelector(`[data-modal-backdrop="${B}"]`);!b||!V||(ne(),we(B),(T.classList.contains("is-open")||document.querySelector(`[data-modal="${G}"]`))&&(document.body.style.overflow="hidden"),b.remove(),V.remove(),F&&be?.focus&&be.focus(),be=null)},Cn=({anchorEl:F=null,initialValues:b={}}={})=>{document.querySelector(`[data-modal="${B}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${B}"]`)?.remove();const V={date:b.date||Ve(Q.selectedDate),location:b.location||"",responsible:b.responsible||""};be=F,document.body.insertAdjacentHTML("beforeend",dn({modalId:B,values:V}));const X=document.querySelector(`[data-modal="${B}"]`),ie=document.querySelector(`[data-modal-backdrop="${B}"]`);if(!X||!ie)return;const fe=ye(X),ae=X.querySelector("#reschedule-date"),K=X.querySelector("#reschedule-location"),ee=X.querySelector("#reschedule-responsible"),oe=X.querySelector("[data-reschedule-error]"),sa=X.querySelector("[data-modal-close]"),da=X.querySelector('[data-reschedule-action="cancel"]'),ia=X.querySelector('[data-reschedule-action="confirm"]'),ta=()=>{oe&&(oe.hidden=!0),[ae,K,ee].forEach(ge=>{ge?.closest(".field")?.classList.remove("field--error")})},fa=()=>{ta();const ge=[];return ae?.value||ge.push(ae),K?.value?.trim()||ge.push(K),ee?.value?.trim()||ge.push(ee),ge.length?(ge.forEach(En=>En?.closest(".field")?.classList.add("field--error")),oe&&(oe.hidden=!1),ge[0]?.focus?.(),!1):!0},_e=()=>aa(),na=ge=>{ge.target===ie&&aa()},St=ge=>{ge.key==="Escape"&&(ge.preventDefault(),ge.stopPropagation(),aa())},Ct=()=>{fa()&&(console.log("Reagendar confirmado",{data:ae?.value||"",localizacao:K?.value?.trim()||"",responsavel:ee?.value?.trim()||""}),aa())};sa?.addEventListener("click",_e),da?.addEventListener("click",_e),ia?.addEventListener("click",Ct),ie.addEventListener("click",na),document.addEventListener("keydown",St,!0),[ae,K,ee].forEach(ge=>{ge?.addEventListener("input",ta)}),ne=()=>{sa?.removeEventListener("click",_e),da?.removeEventListener("click",_e),ia?.removeEventListener("click",Ct),ie.removeEventListener("click",na),document.removeEventListener("keydown",St,!0),[ae,K,ee].forEach(ge=>{ge?.removeEventListener("input",ta)}),typeof fe=="function"&&fe(),ne=()=>{}},$e(B),setTimeout(()=>{ae?.focus&&ae.focus()},120)},$t=F=>{document.querySelector(`[data-modal="${G}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${G}"]`)?.remove(),Q=Ue(),de=F||null,document.body.insertAdjacentHTML("beforeend",Wa({modalId:G,state:Q}));const b=document.querySelector(`[data-modal="${G}"]`),V=document.querySelector(`[data-modal-backdrop="${G}"]`);if(!b||!V)return;const X=b.querySelector("#schedule-location-select"),ie=b.querySelector("[data-modal-close]"),fe=()=>ea(),ae=oe=>{oe.target===V&&ea()},K=oe=>{oe.key==="Escape"&&(document.querySelector(`[data-modal="${B}"]`)||(oe.preventDefault(),oe.stopPropagation(),ea()))},ee=oe=>{const sa=oe.target.closest("[data-schedule-action]");if(sa){const _e=sa.dataset.scheduleAction;if(_e==="back"){ea();return}if(_e==="select-date"){const na=T.querySelector("#agendado-data-encerramento");na&&(na.value=Ve(Q.selectedDate),na.dispatchEvent(new Event("input",{bubbles:!0}))),ea();return}}const da=oe.target.closest("[data-schedule-view]");if(da){Q.viewMode=da.dataset.scheduleView==="month"?"month":"week",Q.viewMode==="month"&&(Q.currentDate=Ce(Q.selectedDate)),Se(b,Q);return}const ia=oe.target.closest("[data-schedule-nav]");if(ia){const _e=ia.dataset.scheduleNav==="prev"?-1:1;Q.viewMode==="month"?Q.currentDate=Ka(Q.currentDate,_e):(Q.selectedDate=Je(Q.selectedDate,_e*7),Q.currentDate=Ce(Q.selectedDate)),Se(b,Q);return}const ta=oe.target.closest("[data-schedule-date]");if(ta){const _e=Ga(ta.dataset.scheduleDate);if(!_e)return;Q.selectedDate=_e,Q.currentDate=Ce(_e),Se(b,Q);return}const fa=oe.target.closest("[data-schedule-reagendar]");fa&&Cn({anchorEl:fa,initialValues:{date:Ve(Q.selectedDate),location:X?.value||"",responsible:""}})};V.addEventListener("click",ae),b.addEventListener("click",ee),ie?.addEventListener("click",fe),document.addEventListener("keydown",K,!0),me=()=>{V.removeEventListener("click",ae),b.removeEventListener("click",ee),ie?.removeEventListener("click",fe),document.removeEventListener("keydown",K,!0),me=()=>{}},$e(G),Se(b,Q),X?.focus&&setTimeout(()=>X.focus(),120)};return()=>{W=!0,N!==null&&window.clearTimeout(N),O!==null&&typeof window.cancelIdleCallback=="function"&&window.cancelIdleCallback(O),ea({restoreFocus:!1}),aa({restoreFocus:!1}),L?.cleanup?.(),L=null,f=null,e.removeEventListener("click",st),te&&te.removeEventListener("click",dt),ve&&ve.removeEventListener("click",it),Y&&Y.removeEventListener("click",lt),qe&&qe.removeEventListener("click",ct),Te&&Te.removeEventListener("click",ut),Be&&Be.removeEventListener("click",pt),Ne&&Ne.removeEventListener("click",mt),T.removeEventListener("click",ft),A.removeEventListener("click",bt),I.removeEventListener("click",_t),H.removeEventListener("click",ht),j.removeEventListener("click",yt),ce.removeEventListener("click",kt),l.removeEventListener("click",wt),typeof g=="function"&&g(),typeof c=="function"&&c(),typeof $=="function"&&$(),typeof h=="function"&&h(),typeof w=="function"&&w(),typeof E=="function"&&E(),typeof v=="function"&&v(),M.cleanup&&M.cleanup(),P.cleanup&&P.cleanup(),z.cleanup&&z.cleanup(),m.cleanup&&m.cleanup(),R.cleanup&&R.cleanup(),U.cleanup&&U.cleanup(),D.cleanup&&D.cleanup(),document.querySelector(`[data-drawer="${a}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${a}"]`)?.remove(),document.querySelector(`[data-drawer="${t}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${t}"]`)?.remove(),document.querySelector(`[data-drawer="${n}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${n}"]`)?.remove(),document.querySelector(`[data-drawer="${o}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${o}"]`)?.remove(),document.querySelector(`[data-drawer="${r}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${r}"]`)?.remove(),document.querySelector(`[data-drawer="${s}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${s}"]`)?.remove(),document.querySelector(`[data-drawer="${d}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${d}"]`)?.remove()}}function ar(){const e=Ze({id:"agendado-tabs",firstTabLabel:"Iniciar Semeio",firstTabContent:vr()});return`
    <section class="agendado-drawer">
      ${Ye()}
      ${e}
    </section>
  `}function tr(){const e=Ze({id:"germinacao-tabs",firstTabLabel:"Enviar para Casa Vegetação",firstTabContent:ir()});return`
    <section class="agendado-drawer germinacao-stage-drawer">
      ${Ye()}
      ${e}
    </section>
  `}function nr(){const e=Ze({id:"casa-vegetacao-tabs",firstTabLabel:"Enviar para Expedição",firstTabContent:lr()});return`
    <section class="agendado-drawer casa-vegetacao-stage-drawer">
      ${Ye()}
      ${e}
    </section>
  `}function or(){const e=Ze({id:"aguardando-enxertia-tabs",firstTabLabel:"Enviar para Sala de Corte",firstTabContent:cr()});return`
    <section class="agendado-drawer aguardando-enxertia-stage-drawer">
      ${Ye()}
      ${e}
    </section>
  `}function rr(){const e=Ze({id:"sala-corte-tabs",firstTabLabel:"Enviar para Enxertia",firstTabContent:ur()});return`
    <section class="agendado-drawer op-drawer--corte">
      ${Ye()}
      ${e}
    </section>
  `}function sr(){const e=Ze({id:"sala-fusao-tabs",firstTabLabel:"Enviar para Adaptação",firstTabContent:pr()});return`
    <section class="agendado-drawer op-drawer--fusao">
      ${Ye()}
      ${e}
    </section>
  `}function dr(){const e=Ze({id:"adaptacao-tabs",firstTabLabel:"Enviar para Casa de Vegetação",firstTabContent:mr()});return`
    <section class="agendado-drawer op-drawer--adaptacao">
      ${Ye()}
      ${e}
    </section>
  `}function ir(){return Ua({stepKey:"germinacao",scopeClass:"op-drawer__step--germinacao",stageTitle:"Sala de Germinação",dateEndLabel:"Data encerramento da Germinação*",submitLabel:"Enviar para Estufa"})}function lr(){return Ua({stepKey:"casa-vegetacao",scopeClass:"op-drawer__step--casa-vegetacao",stageTitle:"Sala de Germinação",dateEndLabel:"Data encerramento da etapa*",submitLabel:"Enviar para Expedição",showProductInfoSection:!1,showConsultAgenda:!1,qualityTitle:"Controle de Qualidade",qualityStatus:"",qualityButtonLabel:"Iniciar Seleção",qualityClassName:"op-drawer--adaptacao__quality",quantityGroups:[{subtitle:"Produto",meta:"Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong>",kpis:[{label:"Entrada",value:"5.000"},{label:"Perda",value:"250",badge:"+5%"},{label:"Atual",value:"4.750",badge:"95%"}]}]})}function cr(){return Ua({stepKey:"aguardando-enxertia",scopeClass:"op-drawer__step--aguardando-enxertia",stageTitle:"Sala de Germinação",dateEndLabel:"Data de Início da Etapa*",submitLabel:"Iniciar Enxertia",rightDateLabel:"Data de Agendamento",rescheduleLabel:"+ Reagendar",showBackAction:!1})}function ur(){return`
    <form class="agendado-panel op-drawer__step--corte" data-op-step-form="sala-corte">
      <section class="agendado-section op-germinacao-step__actions">
        ${ra().replace("<button",'<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${_("home",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Sala de Germinação</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${_("calendar",{size:12})}</span>
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
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${_("calendar",{size:12})}</span>
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
          ${q({text:"Iniciar Execução",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="start-execution"')}
        </div>
      </section>

      <section class="agendado-section op-step-corte__exec">
        <h3 class="agendado-title">Execução do Corte</h3>
        <div class="op-step-corte__exec-actions">
          <button type="button" class="agendado-inline-link" data-op-step-action="register-tray">+ Registrar Bandeja Finalizada</button>
          <button type="button" class="agendado-inline-link" data-op-step-action="read-qr">Ler QR Code</button>
        </div>
        <article class="agendado-info-box op-step-corte__exec-form">
          ${S({id:"sala-corte-data-execucao",type:"date",label:"Data de Execução*",required:!0,name:"dataExecucao",iconRight:_("calendar",{size:16})})}
          <div class="op-step-corte__grid op-step-corte__grid--three">
            ${le({id:"sala-corte-operador",label:"Operador",required:!0,placeholder:"Selecione",items:[{label:"Maria Silva",value:"maria-silva"},{label:"João Souza",value:"joao-souza"}]})}
            ${S({id:"sala-corte-bandeja-id",label:"Bandeja ID",name:"bandejaId",value:"# ID"})}
            ${S({id:"sala-corte-qtd-mudas",label:"Quantidade de Mudas",name:"quantidadeMudas",value:"0"})}
          </div>
          <div class="op-step-corte__add-action">
            ${q({text:"Adicionar",variant:"primary",size:"sm"}).replace("<button",'<button data-op-step-action="add-tray"')}
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
                <tr><td>BDJ-001</td><td>Maria Silva</td><td>23/12/26</td><td>128</td><td>${_("trash",{size:14})}</td></tr>
                <tr><td>BDJ-002</td><td>João Souza</td><td>23/12/26</td><td>120</td><td>${_("trash",{size:14})}</td></tr>
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
            ${ga({id:"sala-corte-localizacao",required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${S({id:"sala-corte-data-encerramento",type:"date",label:"Data encerramento da etapa*",required:!0,name:"dataEncerramento",iconRight:_("calendar",{size:16})})}
          ${S({id:"sala-corte-responsavel",label:"Responsável*",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
          <div class="agendado-consultar-wrap">
            ${q({text:"+ Consultar agenda",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="consult-agenda"')}
          </div>
        </div>
      </section>

      <section class="agendado-section op-germinacao-step__bottom">
        <span aria-hidden="true"></span>
        <div class="op-germinacao-step__bottom-right">
          ${q({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="cancel"')}
          ${q({text:"Encerrar e Enviar para Fusão",variant:"primary",size:"sm"}).replace("<button",'<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `}function pr(){return`
    <form class="agendado-panel op-drawer__step--fusao" data-op-step-form="sala-fusao">
      <section class="agendado-section op-germinacao-step__actions">
        ${ra().replace("<button",'<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${_("home",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Sala de Germinação</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${_("calendar",{size:12})}</span>
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
        ${q({text:"Avaliação",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="quality"')}
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
            ${ga({id:"sala-fusao-localizacao",required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${S({id:"sala-fusao-data-encerramento",type:"date",label:"Data encerramento da etapa*",required:!0,name:"dataEncerramento",iconRight:_("calendar",{size:16})})}
          ${S({id:"sala-fusao-responsavel",label:"Responsável*",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
          <div class="agendado-consultar-wrap">
            ${q({text:"+ Consultar agenda",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="consult-agenda"')}
          </div>
        </div>
      </section>

      <section class="agendado-section op-germinacao-step__bottom">
        ${q({text:"Voltar Etapa",variant:"error",style:"outline",size:"sm"}).replace("<button",'<button data-op-step-action="voltar-etapa"')}
        <div class="op-germinacao-step__bottom-right">
          ${q({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="cancel"')}
          ${q({text:"Enviar para Adaptação",variant:"primary",size:"sm"}).replace("<button",'<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `}function mr(){return`
    <form class="agendado-panel op-drawer__step--adaptacao" data-op-step-form="adaptacao">
      <section class="agendado-section op-germinacao-step__actions">
        ${ra().replace("<button",'<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${_("home",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Sala de Germinação</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${_("calendar",{size:12})}</span>
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
        ${q({text:"Iniciar Seleção",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="quality"')}
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
            ${ga({id:"adaptacao-localizacao",required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${S({id:"adaptacao-data-encerramento",type:"date",label:"Data encerramento da etapa*",required:!0,name:"dataEncerramento",iconRight:_("calendar",{size:16})})}
          ${S({id:"adaptacao-responsavel",label:"Responsável*",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
        </div>
      </section>

      <section class="agendado-section op-germinacao-step__bottom">
        ${q({text:"Voltar Etapa",variant:"error",style:"outline",size:"sm"}).replace("<button",'<button data-op-step-action="voltar-etapa"')}
        <div class="op-germinacao-step__bottom-right">
          ${q({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="cancel"')}
          ${q({text:"Enviar para Casa de Vegetação",variant:"primary",size:"sm"}).replace("<button",'<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `}function Ua({stepKey:e,scopeClass:a,stageTitle:t,dateEndLabel:n,submitLabel:o,rightDateLabel:r="Previsão de Saída",rescheduleLabel:s="+ Consultar agenda",showBackAction:d=!0,showProductInfoSection:i=!0,showConsultAgenda:u=!0,qualityTitle:k="Controle de Qualidade:",qualityStatus:C="Dentro do esperado",qualityButtonLabel:p="Avaliação",qualityClassName:x="",quantityGroups:y=[{subtitle:"Enxerto",meta:"Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong>",kpis:[{label:"Semeada",value:"5.000"},{label:"Perda",value:"250",badge:"+5%"},{label:"Germinada",value:"4.750",badge:"95%"}]},{subtitle:"Porta-enxerto",meta:"Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong>",kpis:[{label:"Semeada",value:"5.000"},{label:"Perda",value:"250",badge:"+5%"},{label:"Germinada",value:"4.750",badge:"95%"}]}]}){const T=(Array.isArray(y)?y:[]).map(z=>{const I=z?.subtitle||"Produto",m=z?.meta||"Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong>",R=(Array.isArray(z?.kpis)?z.kpis:[]).map(j=>re(j?.label||"",j?.value||"",j?.badge||"")).join("");return`
      <div class="agendado-semeio-group">
        <div class="agendado-info-box__head">
          <span class="agendado-subtitle">${I}</span>
          <span class="agendado-info-box__meta">${m}</span>
        </div>
        <div class="agendado-kpis">
          ${R}
        </div>
      </div>
    `}).join(""),P=i?`
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
    `:"",A=u?`
          <div class="agendado-consultar-wrap">
            ${q({text:s,variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="consult-agenda"')}
          </div>
      `:"";return`
    <form class="agendado-panel ${a}" data-op-step-form="${e}">
      <section class="agendado-section op-germinacao-step__actions">
        ${ra().replace("<button",'<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${_("home",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">${t}</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${_("calendar",{size:12})}</span>
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
                <span class="op-germinacao-step__caption">${r}</span>
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

      <section class="agendado-section op-germinacao-step__quality ${x}">
        <div class="op-germinacao-step__quality-text">
          <strong>${k}</strong>
          ${C?`<span>${C}</span>`:""}
        </div>
        ${q({text:p,variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="quality"')}
      </section>

      ${P}

      <section class="agendado-section">
        <h3 class="agendado-title">Quantidade de Mudas Semeadas</h3>
        <div class="agendado-info-box">
          ${T}
        </div>
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
            </div>
            ${ga({id:`${e}-localizacao`,required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${S({id:`${e}-data-encerramento`,type:"date",label:n,required:!0,name:"dataEncerramento",iconRight:_("calendar",{size:16})})}
          ${S({id:`${e}-responsavel`,label:"Responsável*",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
          ${A}
        </div>
      </section>
      <section class="agendado-section op-germinacao-step__bottom">
        ${d?q({text:"Voltar Etapa",variant:"error",style:"outline",size:"sm"}).replace("<button",'<button data-op-step-action="voltar-etapa"'):'<span aria-hidden="true"></span>'}
        <div class="op-germinacao-step__bottom-right">
          ${q({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="cancel"')}
          ${q({text:o,variant:"primary",size:"sm"}).replace("<button",'<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `}function vr(){const e=Pn({title:"",compact:!0,multiple:!1,maxSizeLabel:"3MB",acceptedFormats:["image/png","image/svg+xml","application/msword","application/pdf"],className:"agendado-upload"});return`
    <form class="agendado-panel" data-agendado-form>
      <section class="agendado-section">
        <div class="agendado-semeio">
          <div class="agendado-semeio__field">
            <span class="agendado-semeio__label">
              <span class="agendado-semeio__icon">${_("calendar",{size:12})}</span>
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
          ${xt()}
          ${ra()}
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
          ${q({text:"+ Adicionar Lote",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="add-lote"')}
        </div>
        <div class="agendado-card">
          <div class="agendado-grid agendado-grid--two">
            <div class="agendado-grid-col--full">
              ${le({id:"agendado-tipo",label:"Tipo",name:"tipo",placeholder:"Selecione",items:[{label:"Enxerto",value:"enxerto"}]})}
            </div>
            ${S({id:"agendado-classe",label:"Classe",name:"classe",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${S({id:"agendado-cod-produto",label:"Código do Produto",name:"codigoProduto",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${S({id:"agendado-produto",label:"Produto",name:"produto",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${S({id:"agendado-unidade",label:"Unidade",name:"unidade",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${S({id:"agendado-cod-lote",label:"Código do Lote",name:"codigoLote",value:"5kg"})}
            ${S({id:"agendado-fornecedor",label:"Fornecedor",name:"fornecedor",value:"95%"})}
            ${S({id:"agendado-embalagem",label:"Embalagem",name:"embalagem",value:"Clone AEC 144"})}
            ${S({id:"agendado-quantidade",label:"Quantidade",name:"quantidade",value:"10"})}
          </div>
          <div class="agendado-upload-wrap">
            <span class="agendado-field-label">Anexa imagem do lote</span>
            ${e}
            ${Sr()}
          </div>
          ${S({id:"agendado-responsavel-coleta",label:"Responsável coleta da semente",name:"responsavelColeta",value:"João da Silva"})}
          <div class="agendado-grid agendado-grid--two">
            ${S({id:"agendado-responsavel-entrega",label:"Responsável entrega da semente",name:"responsavelEntrega",placeholder:"Nome do responsável"})}
            ${S({id:"agendado-data-hora-entrega",label:"Data/Hora de entrega da semente",name:"dataHoraEntrega",placeholder:"Nome do responsável"})}
          </div>
          <div class="agendado-card__actions">
            ${$r()}
            ${q({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="cancel-lote"')}
            ${q({text:"Salvar",variant:"primary",size:"sm"}).replace("<button",'<button data-agendado-action="save-lote"')}
          </div>
        </div>
      </section>

      <section class="agendado-section">
        ${Mt("Enxerto","10.000",{collapsed:!0,showTable:!1})}
        ${Mt("Porta-enxerto","15.000",{collapsed:!1,showTable:!0})}
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link">Consultar localização</button>
            </div>
            ${ga({id:"agendado-localizacao",required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${S({id:"agendado-data-encerramento",type:"date",label:"Data encerramento da etapa",required:!0,name:"dataEncerramento",className:"agendado-date-field",iconRight:_("calendar",{size:16})})}
          ${S({id:"agendado-responsavel",label:"Responsável",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
          <div class="agendado-consultar-wrap">
            ${q({text:"+ Consultar agenda",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="consult-agenda"')}
          </div>
        </div>
        <div class="agendado-bottom-actions">
          ${xt()}
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
            ${ra().replace("<button",'<button data-agendado-action="details-qr"')}
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
              <span class="agendado-details-accordion__icon" aria-hidden="true">${_("chevron-right",{size:12})}</span>
              <span>Observações</span>
            </button>
            <div class="agendado-details-accordion__content">
              Hoje, durante a caminhada no parque, notei que as flores estavam mais vibrantes do que nunca. O aroma doce das rosas misturava-se com o frescor do ar, criando uma atmosfera encantadora. Além disso, vi um grupo de crianças brincando e rindo, o que trouxe um sorriso ao meu rosto. Foi um momento perfeito para refletir e apreciar a beleza da natureza.
            </div>
          </div>

          <div class="agendado-details-actions">
            ${q({text:"Ver pedido",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="details-view-order"')}
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
          <span class="agendado-details-accordion__icon" aria-hidden="true">${_("chevron-right",{size:12})}</span>
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
          <span class="agendado-details-accordion__icon" aria-hidden="true">${_("chevron-right",{size:12})}</span>
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
          <span class="agendado-details-accordion__icon" aria-hidden="true">${_("chevron-right",{size:12})}</span>
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
          <span class="agendado-details-accordion__icon" aria-hidden="true">${_("chevron-right",{size:12})}</span>
          <span>Informações de Lote de Sementes</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__lots">
            ${e.map(n=>br(n)).join("")}
          </div>
          <button type="button" class="agendado-termo-btn">
            ${_("file",{size:14})}
            <span>Termo de Retirada</span>
          </button>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${_("chevron-right",{size:12})}</span>
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
        <span class="agendado-details-accordion__icon" aria-hidden="true">${_("chevron-right",{size:12})}</span>
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
                <span class="agendado-cycle-forecast__icon" aria-hidden="true">${_("clock",{size:14})}</span>
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
                  <span class="agendado-cycle-forecast__date-icon" aria-hidden="true">${_("calendar",{size:14})}</span>
                  <span>Data Abertura: <strong>12/12/2026</strong></span>
                </div>
                <div class="agendado-cycle-forecast__date">
                  <span class="agendado-cycle-forecast__date-icon" aria-hidden="true">${_("calendar",{size:14})}</span>
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
  `}function xt(){return`
    <button type="button" class="agendado-reagendar-btn" data-agendado-action="reagendar">
      ${_("calendar",{size:18})}
      <span>Reagendar</span>
    </button>
  `}function ra(){return`
    <button type="button" class="agendado-qr-btn">
      <img src="/assets/qrcode.png" alt="" aria-hidden="true" />
      <span>Gerar QR Code</span>
    </button>
  `}function $r(){return`
    <button type="button" class="agendado-termo-btn">
      ${_("file",{size:14})}
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
        <button type="button" aria-label="Visualizar">${_("eye",{size:16})}</button>
        <button type="button" aria-label="Excluir">${_("trash",{size:16})}</button>
      </div>
    </div>
  `}function re(e,a,t=""){return`
    <div class="agendado-kpi">
      <span class="agendado-kpi__label">${e}${t?` <em>${t}</em>`:""}</span>
      <strong class="agendado-kpi__value">${a}</strong>
    </div>
  `}function Mt(e,a,t={}){const{collapsed:n=!1,showTable:o=!0}=t,r=n?"is-collapsed":"is-expanded",s=`agendado-cultura-${e.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`;return`
    <div class="agendado-table-group">
      <span class="agendado-subtitle">${e}</span>
      <div class="agendado-table-block ${n?"agendado-table-block--collapsed":""}">
        <div class="agendado-table-block__subheader">
          <span class="agendado-table-block__caret ${r}" aria-hidden="true">${_("chevron-right",{size:12})}</span>
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
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${Ma()}</td></tr>
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${Ma()}</td></tr>
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${Ma()}</td></tr>
            </tbody>
          </table>
        </div>`:""}
      </div>
    </div>
  `}function Ma(){return`
    <div class="agendado-table-actions agendado-icon-actions">
      <button type="button" aria-label="Editar">${_("edit",{size:14})}</button>
      <button type="button" aria-label="Excluir">${_("trash",{size:14})}</button>
      <button type="button" aria-label="Visualizar">${_("eye",{size:14})}</button>
    </div>
  `}function Cr(){return`
    <div class="agendado-footer">
      ${q({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="cancel"')}
      ${q({text:"Iniciar Semeio",variant:"primary",size:"sm"}).replace("<button",'<button data-agendado-action="start-semeio"')}
    </div>
  `}function Er(){const e=document.getElementById("kanban-board");if(!e)return()=>{};const a="kanban-pedido-details-drawer",t=document.querySelector(`[data-drawer="${a}"]`),n=document.querySelector(`[data-drawer-backdrop="${a}"]`);t&&t.remove(),n&&n.remove(),document.body.insertAdjacentHTML("beforeend",Ee({id:a,title:"Detalhes do Pedido",width:600,content:'<section class="orders-details-drawer"></section>',footer:Bt()}));const o="kanban-replan-item-modal";let r=()=>{},s=null;const d="kanban-cancel-order-items-modal";let i=()=>{},u=null;function k({restoreFocus:l=!0}={}){const g=document.querySelector(`[data-modal="${o}"]`),c=document.querySelector(`[data-modal-backdrop="${o}"]`);!g||!c||(r(),we(o),document.querySelector(`[data-drawer="${a}"]`)?.classList.contains("is-open")&&(document.body.style.overflow="hidden"),g.remove(),c.remove(),l&&s?.focus&&s.focus(),s=null)}function C({anchorEl:l=null,orderItemId:g=""}={}){k({restoreFocus:!1}),s=l,document.body.insertAdjacentHTML("beforeend",Nr({modalId:o,orderItemId:g}));const c=document.querySelector(`[data-modal="${o}"]`),$=document.querySelector(`[data-modal-backdrop="${o}"]`);if(!c||!$)return;const h=ye(c),w=c.querySelector("[data-modal-close]"),E=c.querySelector('[data-replan-action="cancel"]'),v=c.querySelector('[data-replan-action="confirm"]'),f=c.querySelector("#replan-reason"),L=c.querySelector("#replan-op"),N=(Q,te="Campo obrigatório.")=>{const ve=c.querySelector(`[data-replan-error="${Q}"]`),Y=c.querySelector(`[data-replan-field="${Q}"] .field`);Y&&Y.classList.add("field--error"),ve&&(ve.textContent=te,ve.hidden=!1)},O=Q=>{const te=c.querySelector(`[data-replan-error="${Q}"]`),ve=c.querySelector(`[data-replan-field="${Q}"] .field`);ve&&ve.classList.remove("field--error"),te&&(te.hidden=!0)},W=()=>{O("reason"),O("op");let Q=!0;return f?.value||(N("reason"),Q=!1),L?.value||(N("op"),Q=!1),Q||(f?.value?L:f)?.focus?.(),Q},G=()=>k(),B=Q=>{Q.target===$&&k()},me=Q=>{Q.key==="Escape"&&(Q.preventDefault(),Q.stopPropagation(),k())},ne=()=>O("reason"),de=()=>O("op"),be=()=>{W()&&(pa("Replanejamento confirmado",{message:"O item foi marcado para replanejamento."}),k())};w?.addEventListener("click",G),E?.addEventListener("click",G),v?.addEventListener("click",be),$.addEventListener("click",B),document.addEventListener("keydown",me,!0),f?.addEventListener("change",ne),L?.addEventListener("change",de),r=()=>{w?.removeEventListener("click",G),E?.removeEventListener("click",G),v?.removeEventListener("click",be),$.removeEventListener("click",B),document.removeEventListener("keydown",me,!0),f?.removeEventListener("change",ne),L?.removeEventListener("change",de),typeof h=="function"&&h(),r=()=>{}},$e(o),setTimeout(()=>{f?.focus?.()},120)}function p({restoreFocus:l=!0}={}){const g=document.querySelector(`[data-modal="${d}"]`),c=document.querySelector(`[data-modal-backdrop="${d}"]`);!g||!c||(i(),we(d),document.querySelector(`[data-drawer="${a}"]`)?.classList.contains("is-open")&&(document.body.style.overflow="hidden"),g.remove(),c.remove(),l&&u?.focus&&u.focus(),u=null)}function x({anchorEl:l=null,details:g=null}={}){p({restoreFocus:!1}),u=l,document.body.insertAdjacentHTML("beforeend",Br({modalId:d,items:g?.items||[]}));const c=document.querySelector(`[data-modal="${d}"]`),$=document.querySelector(`[data-modal-backdrop="${d}"]`);if(!c||!$)return;const h=c.querySelector("[data-modal-close]"),w=c.querySelector('[data-cancel-order-items-action="cancel"]'),E=c.querySelector('[data-cancel-order-items-action="confirm"]'),v=Array.from(c.querySelectorAll("[data-cancel-order-item-checkbox]")),f=()=>v.filter(B=>B instanceof HTMLInputElement&&B.checked).map(B=>B.value),L=()=>{E&&(E.disabled=f().length===0)},N=()=>p(),O=B=>{B.target===$&&p()},W=B=>{B.key==="Escape"&&(B.preventDefault(),B.stopPropagation(),p())},G=()=>{const B=f();if(!B.length)return;const me=Array.isArray(g?.items)?g.items.filter(ne=>B.includes(String(ne?.id))):[];console.log("Cancelar itens do pedido",{orderCode:g?.orderCode||"",items:me.map(ne=>({id:ne?.id||"",product:ne?.product||"",quantity:ne?.quantity||""}))}),p()};h?.addEventListener("click",N),w?.addEventListener("click",N),E?.addEventListener("click",G),$.addEventListener("click",O),document.addEventListener("keydown",W,!0),v.forEach(B=>{B.addEventListener("change",L)}),i=()=>{h?.removeEventListener("click",N),w?.removeEventListener("click",N),E?.removeEventListener("click",G),$.removeEventListener("click",O),document.removeEventListener("keydown",W,!0),v.forEach(B=>{B.removeEventListener("change",L)}),i=()=>{}},$e(d),L(),setTimeout(()=>{v[0]?.focus?.()},120)}const y=De({id:a,root:document,onClose:()=>{k({restoreFocus:!1}),Ge({restoreFocus:!1}),p({restoreFocus:!1})}}),M=document.querySelector(`[data-drawer="${a}"]`);if(!M||!y)return()=>{};const T=M.querySelector(".drawer__header"),P=M.querySelector("[data-drawer-title]"),A=M.querySelector("[data-drawer-close]"),z=M.querySelector(".drawer__body"),I=M.querySelector(".drawer__footer");if(!z||!I)return()=>{};const m={activeTab:0,currentDetails:null,drawerRules:null,selectedHistoryProduct:"",selectedPlanningProduct:"",showCanceledPlanning:!1,expandedPlanningByProduct:{}},H=l=>{if(!T||!A)return;let g=T.querySelector("[data-orders-header-badge]");g||(g=document.createElement("span"),g.className="orders-details-drawer__header-status",g.setAttribute("data-orders-header-badge",""),T.insertBefore(g,A)),g.innerHTML=Ie({text:l.billingStatus,variant:"success",style:"soft",size:"sm"})},R=l=>{if(!l)return;const g=Ja(l);m.currentDetails=l,m.drawerRules=g,m.activeTab=0,m.selectedHistoryProduct=l.items?.[0]?.id||"",m.selectedPlanningProduct=va(l),m.showCanceledPlanning=!1,m.expandedPlanningByProduct={},za(m,l),P&&(P.textContent=l.companyName),H(l),z.innerHTML=qr(l,m),I.innerHTML=Bt(l,g)},j=l=>{const g=M.querySelector("#orders-details-tabs")?.closest("[data-tabs]"),c=g?.parentElement,$=g?.querySelectorAll(".tabs-tab"),h=c?.querySelectorAll(".tabs-panel");!$||!h||($.forEach((w,E)=>{w.classList.toggle("is-active",E===l),w.setAttribute("aria-selected",String(E===l))}),h.forEach((w,E)=>{w.classList.toggle("is-active",E===l)}))},U=l=>{const g=l.target.closest(".kanban-card");if(g&&e.contains(g)){l.target.closest(".kanban-card__code")&&l.preventDefault();const v=zt(g);R(v),y.open(g);return}const c=l.target.closest(".kanban-column__title");if(!c||!e.contains(c))return;const $=c.closest("[data-column-id]");if(!$)return;const h=Array.from($.querySelectorAll(".kanban-card")).find(E=>E.offsetParent!==null&&!E.hasAttribute("hidden"))||$.querySelector(".kanban-card");if(!h)return;const w=zt(h);R(w),y.open(h)},ce=l=>{const g=l.target.closest("[data-pedido-drawer-action]");if(g){const v=g.dataset.pedidoDrawerAction;if(v==="back"){y.close();return}if(v==="cancel-total"){console.log("Cancelar pedido total",m.currentDetails?.orderCode||"");return}if(v==="approve"){pa("Pedido aprovado",{message:`Pedido ${m.currentDetails?.orderCode||""} aprovado com sucesso.`});return}if(v==="send-approval"){pa("Pedido enviado para aprovação",{message:`Pedido ${m.currentDetails?.orderCode||""} encaminhado para aprovação.`});return}if(v==="close-planning"){console.log("Encerrar Planejamento",m.currentDetails?.orderCode||"");return}if(v==="cancel-order-items"){x({anchorEl:g,details:m.currentDetails});return}}const c=l.target.closest("[data-order-item-action]");if(c){const v=c.dataset.orderItemAction,f=c.closest("[data-order-item]"),L=f?f.dataset.orderItem:"";if(v==="plan"){const N=m.currentDetails?.items?.find(O=>String(O.id)===String(L));lo({anchorEl:c,memoryKey:`${m.currentDetails?.orderCode||"pedido"}:${L||"item"}`,orderItem:{id:N?.id||"",product:N?.product||"Muda de Eucalipto Clone - MUD-001",totalPedido:N?.quantity||"5000",available:N?.availableQuantity||"5000",orderCode:m.currentDetails?.orderCode||""},onAddRow:O=>{go({details:m.currentDetails,item:N,planningData:O})}});return}if(v==="replan"){C({anchorEl:c,orderItemId:L});return}console.log(`Ação ${v} no item`,L);return}const $=l.target.closest("[data-order-item-toggle]");if($){const v=$.closest("[data-order-item]");if(!v)return;v.classList.toggle("is-expanded");return}const h=l.target.closest("[data-order-planning-toggle]");if(h){const v=h.dataset.orderPlanningToggle||"";if(!v||!m.currentDetails)return;const f=m.selectedPlanningProduct||va(m.currentDetails);if(!f)return;const L=new Set(m.expandedPlanningByProduct[f]||[]);L.has(v)?L.delete(v):L.add(v),m.expandedPlanningByProduct[f]=Array.from(L),Tt(M,m.currentDetails,m);return}const w=l.target.closest("[data-order-planning-action]");if(w){const v=w.dataset.orderPlanningAction,f=w.dataset.planningId||"";v==="open-op"&&console.log("Acessar OP do planejamento",f);return}const E=l.target.closest("#orders-details-tabs .tabs-tab");if(E){const v=Number(E.dataset.tab);if(Number.isNaN(v))return;m.activeTab=v,j(v)}},D=l=>{const g=l.target;if(!(!(g instanceof HTMLSelectElement)&&!(g instanceof HTMLInputElement))){if(g instanceof HTMLInputElement&&g.dataset.ordersPlanningShowCanceled==="true"){m.showCanceledPlanning=g.checked,za(m,m.currentDetails),Tt(M,m.currentDetails,m);return}if(g instanceof HTMLSelectElement){if(g.dataset.ordersPlanningProduct==="true"){m.selectedPlanningProduct=g.value||"",za(m,m.currentDetails),Ir(M,m.currentDetails,m);return}g.dataset.ordersHistoryProduct==="true"&&(m.selectedHistoryProduct=g.value||"",xr(M,m.currentDetails,m.selectedHistoryProduct))}}};return e.addEventListener("click",U),M.addEventListener("click",ce),M.addEventListener("change",D),()=>{k({restoreFocus:!1}),Ge({restoreFocus:!1}),p({restoreFocus:!1}),e.removeEventListener("click",U),M.removeEventListener("click",ce),M.removeEventListener("change",D),y.cleanup&&y.cleanup();const l=document.querySelector(`[data-drawer="${a}"]`),g=document.querySelector(`[data-drawer-backdrop="${a}"]`);l&&l.remove(),g&&g.remove()}}function zt(e){const a=e.querySelector(".kanban-card__code")?.textContent?.trim()||"",t=e.querySelector(".kanban-card__subtitle")?.textContent?.trim()||"",n=e.closest("[data-column-id]"),o=String(n?.dataset?.columnId||"").trim().toLowerCase(),r=n?.querySelector(".kanban-column__title")?.textContent?.trim()||"Recebido",s=qt[a]||qt["A2W-2025-001"],d=JSON.parse(JSON.stringify(s)),i=ln({columnId:o,stageStatus:r}),k=d?.planningAvailableQty!==void 0&&d?.planningAvailableQty!==null?Sa(d?.planningAvailableQty):Dr(d?.items);return{...d,orderCode:a||"A2W-2025-001",subCode:t||"TG-45678",columnId:o,stageStatus:r,statusKey:i,planningAvailableQty:k,billingStatus:"Faturado"}}function It(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase()}function ln({columnId:e="",stageStatus:a=""}={}){const t=It(e),n=It(a),o={recebido:"received","aguardando-aprovacao":"awaiting-approval","em-preparacao":"in-preparation","em-producao":"in-production","em-expedicao":"in-shipping","em-transito":"in-transit",finalizado:"finalized",finalizados:"finalized"};if(o[t])return o[t];const r={recebido:"received","aguardando aprovacao":"awaiting-approval","em preparacao":"in-preparation","em producao":"in-production","em expedicao":"in-shipping","em transito":"in-transit",finalizado:"finalized",finalizados:"finalized"};return r[n]?r[n]:"default"}function Sa(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e!="string")return 0;const a=e.replace(/\./g,"").replace(",",".").replace(/[^\d.-]/g,""),t=Number(a);return Number.isFinite(t)?t:0}function Dr(e=[]){return Array.isArray(e)?e.reduce((a,t)=>{const n=Sa(t?.availableQuantity),o=Array.isArray(t?.planning)?t.planning.reduce((s,d)=>{const i=Sa(d?.amount);return d?.type==="planned"||d?.type==="canceled"?s+i:s},0):0,r=Math.max(0,n-o);return a+r},0):0}function Ja(e={}){const a=e?.statusKey||ln({columnId:e?.columnId,stageStatus:e?.stageStatus}),t=Sa(e?.planningAvailableQty),n={statusKey:a,hidePlanCancelButtons:!1,hideFooterCancelTotal:!1,replaceFooterCancelTotal:!1,footerPrimaryAction:null};return{received:{...n,hidePlanCancelButtons:!0,footerPrimaryAction:{key:"send-approval",label:"Enviar para Aprovação",disabled:!1}},"awaiting-approval":{...n,hidePlanCancelButtons:!0,footerPrimaryAction:{key:"approve",label:"Aprovar",disabled:!1}},"in-preparation":{...n,footerPrimaryAction:{key:"close-planning",label:"Encerrar Planejamento",disabled:t>0}},"in-production":{...n,hidePlanCancelButtons:!0,replaceFooterCancelTotal:!0,footerPrimaryAction:{key:"cancel-order-items",label:"Cancelar Itens do Pedido",disabled:!1}},"in-shipping":{...n,hidePlanCancelButtons:!0,hideFooterCancelTotal:!0},"in-transit":{...n,hidePlanCancelButtons:!0,hideFooterCancelTotal:!0},finalized:{...n,hidePlanCancelButtons:!0,hideFooterCancelTotal:!0}}[a]||n}function qr(e,a){const t=a?.activeTab||0,n=a?.selectedHistoryProduct||"",o=a?.drawerRules||Ja(e),r=Ca({id:"orders-details-tabs",variant:"underlined",fullWidth:!0,activeTab:t,tabs:[{label:"Informações gerais",content:Tr(e,o)},{label:"Histórico",content:Lr(e,n)},{label:"Planejamento",content:Mr(e,a)}]});return`
    <section class="orders-details-drawer">
      <div class="orders-details-drawer__meta">
        <a href="#" class="orders-details-drawer__order-code">${e.orderCode}</a>
        <span class="orders-details-drawer__dot" aria-hidden="true">•</span>
        <span class="orders-details-drawer__subcode">${e.subCode}</span>
        <span class="orders-details-drawer__stage">${Ie({text:e.stageStatus,variant:"light",style:"soft",size:"sm"})}</span>
      </div>
      ${r}
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
  `}function Pr(e,a=""){const t=e?.orderCode||"",n=uo[t];if(!n)return[];const o=e?.items?.[0]?.id||"",s=n[a||o];return Array.isArray(s)?s:[]}function un(e,a=""){const t=Pr(e,a);return t.length?t.map(n=>Ar(n)).join(""):`
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
          ${_("user",{size:12})}
          <span>${e.metaRole}: ${e.metaName}</span>
        </span>
      </div>
    </article>
  `}function xr(e,a,t=""){if(!e||!a)return;const n=e.querySelector("[data-orders-history]"),o=n?.querySelector(".orders-history__summary"),r=n?.querySelector("[data-orders-history-events]");!o||!r||(o.outerHTML=cn(a,t),r.innerHTML=un(a,t))}function ua(e){const a=Number(e);return Number.isFinite(a)?a.toLocaleString("pt-BR"):"0"}function Da(e){const a=e?.orderCode||"";return Lt[a]||Lt["A2W-2025-001"]}function va(e){return Da(e)?.products?.[0]?.id||""}function pn(e,a=""){const t=Da(e);return t?.products?.find(n=>n.id===a)||t?.products?.[0]||null}function mn(e,a=""){const t=Da(e),n=pn(e,a),o=n?t?.byProduct?.[n.id]:null;return{selectedProduct:n,metrics:o?.metrics||{total:0,planned:0,canceled:0,pending:0},plans:Array.isArray(o?.plans)?o.plans:[]}}function vn(e,a="",t=!1){const{plans:n}=mn(e,a);return t?n:n.filter(o=>o.status!=="cancelado")}function za(e,a){if(!e||!a)return;const t=e.selectedPlanningProduct||va(a);if(!t)return;e.selectedPlanningProduct=t;const n=vn(a,t,e.showCanceledPlanning),o=new Set(n.map(s=>s.id)),r=(e.expandedPlanningByProduct[t]||[]).filter(s=>o.has(s));if(!r.length&&n[0]){e.expandedPlanningByProduct[t]=[n[0].id];return}e.expandedPlanningByProduct[t]=r}function Mr(e,a={}){const t=Da(e),n=a?.selectedPlanningProduct||t?.products?.[0]?.id||"",o=!!a?.showCanceledPlanning,r=(t?.products||[]).map(i=>({value:i.id,label:i.label})),s=le({id:`orders-planning-product-${e?.orderCode||"default"}`,placeholder:"Selecione um produto",items:r,value:n}).replace("<select ",'<select data-orders-planning-product="true" '),d=Nt({id:`orders-planning-show-canceled-${e?.orderCode||"default"}`,checked:o,size:"sm"}).replace('class="toggle-input"','class="toggle-input" data-orders-planning-show-canceled="true"');return`
    <section class="orders-planning" data-orders-planning>
      <div class="orders-planning__filters">
        <div class="orders-planning__filters-main">
          ${s}
        </div>
        <label class="orders-planning__toggle-wrap">
          <span class="orders-planning__toggle-label">Ver Cancelados</span>
          ${d}
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
        ${Ya(e,a)}
      </section>
    </section>
  `}function gn(e,a=""){return`
    <span class="orders-planning__caption-label">Produto</span>
    <strong class="orders-planning__caption-value">${pn(e,a)?.label||"-"}</strong>
  `}function fn(e,a=""){const{metrics:t}=mn(e,a);return[{label:"Qtd. Total do Pedido",value:ua(t.total),tone:"default"},{label:"Qtd. Planejada",value:ua(t.planned),tone:"primary"},{label:"Qtd. Cancelada",value:ua(t.canceled),tone:"primary"},{label:"Qtd. Pendente",value:ua(t.pending),tone:"warning"}].map(o=>`
    <div class="orders-planning-metric">
      <span class="orders-planning-metric__label">${o.label}</span>
      <strong class="orders-planning-metric__value orders-planning-metric__value--${o.tone}">${o.value}</strong>
    </div>
  `).join("")}function Ya(e,a={}){const t=a?.selectedPlanningProduct||va(e),n=!!a?.showCanceledPlanning,o=vn(e,t,n),r=new Set(a?.expandedPlanningByProduct?.[t]||[]);return`
    <h3 class="orders-planning__list-title">Planejamentos Realizados (${o.length})</h3>
    <div class="orders-planning__list" data-orders-planning-list>
      ${o.length?o.map(s=>zr(s,r.has(s.id))).join(""):'<div class="orders-planning__empty">Nenhum planejamento encontrado para este filtro.</div>'}
    </div>
  `}function zr(e,a=!1){return`
    <article class="orders-planning-item ${e.status==="cancelado"?"is-canceled":""}">
      <div class="orders-planning-item__header">
        <div class="orders-planning-item__title-wrap">
          <strong class="orders-planning-item__op">${e.op}</strong>
          ${Ie({text:e.stage,variant:"light",style:"soft",size:"sm"})}
        </div>
        <strong class="orders-planning-item__quantity">${ua(e.quantity)} un.</strong>
      </div>
      <p class="orders-planning-item__product">${e.product}</p>
      <button type="button" class="orders-planning-item__toggle" data-order-planning-toggle="${e.id}" aria-expanded="${a?"true":"false"}">
        <span>Ver detalhes</span>
        ${_("chevron-down",{size:14})}
      </button>
      <div class="orders-planning-item__details ${a?"is-open":""}">
        <div class="orders-planning-item__details-grid">
          <div><span class="orders-planning-item__label">Data do Planejamento</span><strong>${e.planningDate}</strong></div>
          <div><span class="orders-planning-item__label">Previsão de Entrega</span><strong>${e.deliveryDate}</strong></div>
          <div><span class="orders-planning-item__label">Data de Semeio</span><strong>${e.sowingDate}</strong></div>
          <div><span class="orders-planning-item__label">Dias após Semeio</span><strong>${e.daysAfterSowing}</strong></div>
          <div><span class="orders-planning-item__label">Responsável</span><strong>${e.responsible}</strong></div>
          <div class="orders-planning-item__actions">
            ${q({text:"Acessar OP",variant:"ghost",size:"sm",iconRight:"external-link"}).replace("<button",`<button data-order-planning-action="open-op" data-planning-id="${e.id}"`)}
          </div>
        </div>
      </div>
    </article>
  `}function Ir(e,a,t={}){if(!e||!a)return;const n=e.querySelector("[data-orders-planning]"),o=n?.querySelector("[data-orders-planning-product-caption]"),r=n?.querySelector("[data-orders-planning-metrics]"),s=n?.querySelector("[data-orders-planning-list-wrap]");if(!o||!r||!s)return;const d=t.selectedPlanningProduct||va(a);o.innerHTML=gn(a,d),r.innerHTML=fn(a,d),s.innerHTML=Ya(a,t)}function Tt(e,a,t={}){if(!e||!a)return;const o=e.querySelector("[data-orders-planning]")?.querySelector("[data-orders-planning-list-wrap]");o&&(o.innerHTML=Ya(a,t))}function Tr(e,a={}){return`
    <div class="orders-details-info">
      <section class="orders-details-section">
        <h3 class="orders-details-section__title">
          ${_("user",{size:14})}
          Informações do Cliente
        </h3>
        ${Fr(e.client)}
      </section>
      <section class="orders-details-section">
        <h3 class="orders-details-section__title">
          ${_("package",{size:14})}
          Itens do Pedido & Planejamento
        </h3>
        ${Rr(e.items,{hidePlanCancelButtons:a?.hidePlanCancelButtons})}
      </section>
      <section class="orders-details-section">
        <h3 class="orders-details-section__title">Resumo do Pedido</h3>
        ${Or(e.summary)}
      </section>
      <div class="orders-details-info__term-wrap">
        ${q({text:"Gerar Termo de Aceite",variant:"info",style:"soft",size:"sm",iconLeft:"download"})}
      </div>
    </div>
  `}function Br({modalId:e="kanban-cancel-order-items-modal",items:a=[]}={}){const n=(Array.isArray(a)?a:[]).map((o,r)=>{const s=String(o?.id||`item-${r+1}`),d=`cancel-order-item-${s}`,i=String(o?.product||"Item sem descrição"),u=o?.quantity?`Qtd.: ${o.quantity}`:"";return`
      <label class="cancel-order-items-modal__item" for="${d}">
        <input
          id="${d}"
          type="checkbox"
          class="cancel-order-items-modal__checkbox"
          data-cancel-order-item-checkbox
          value="${s}"
        />
        <span class="cancel-order-items-modal__item-content">
          <strong class="cancel-order-items-modal__item-title">${i}</strong>
          ${u?`<span class="cancel-order-items-modal__item-meta">${u}</span>`:""}
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
        ${q({text:"Cancelar",style:"outline",variant:"dark",size:"sm"}).replace("<button ",'<button data-cancel-order-items-action="cancel" ')}
        ${q({text:"Confirmar cancelamento",variant:"primary",size:"sm",disabled:!0}).replace("<button ",'<button data-cancel-order-items-action="confirm" ')}
      </div>
    `})}function Nr({modalId:e="kanban-replan-item-modal",orderItemId:a=""}={}){const t=[{value:"falta-insumo",label:"Falta de insumo"},{value:"erro-planejamento",label:"Erro no planejamento"},{value:"capacidade",label:"Capacidade"},{value:"cliente-alterou",label:"Cliente alterou pedido"}],n=[{value:"estoque-venda-direta",label:"Estoque (Venda Direta)"},{value:"remessa-futura",label:"Remessa Futura"},{value:"vincular-ordem-producao",label:"Vincular Ordem de Produção"}];return Pe({id:e,title:"Replanejar Item",size:"md",className:"replan-modal",body:`
      <div class="replan-modal__content" data-replan-item="${a}">
        <div class="replan-modal__info">
          <span class="replan-modal__info-icon" aria-hidden="true">${_("info",{size:14})}</span>
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
        ${q({text:"Cancelar",style:"outline",variant:"dark",size:"sm"}).replace("<button ",'<button data-replan-action="cancel" ')}
        ${q({text:"Confirmar Replanejamento",variant:"primary",size:"sm"}).replace("<button ",'<button data-replan-action="confirm" ')}
      </div>
    `})}function Fr(e){return`
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
  `}function Rr(e=[],a={}){const t=!!a?.hidePlanCancelButtons,n=`
    <div class="orders-item-table__header">
      <span class="orders-item-table__toggle-col" aria-hidden="true"></span>
      <span>Produto</span>
      <span>Qtd. Pedido</span>
      <span>Valor Unitário</span>
      <span>Valor Total</span>
      <span>Qtd. Disponível</span>
      ${t?"":'<span class="orders-item-table__actions-label" aria-hidden="true"></span>'}
    </div>
  `,o=e.map((r,s)=>{const d=Array.isArray(r.planning)&&r.planning.length>0,i=String(r.product||"").match(/^(.*)\s([A-Z]{3}-\d{3})$/),u=i?i[1]:String(r.product||""),k=i?i[2]:"",C=d?r.planning.map(p=>`
      <div class="orders-item-plan-row orders-item-plan-row--${p.type}">
        <span class="orders-item-plan-row__indicator" aria-hidden="true">${_("chevron-up",{size:14})}</span>
        <div class="orders-item-plan-row__status">
          ${p.type==="planned"?`Planejado: ${p.amount}`:`Cancelado: ${p.amount}`}
        </div>
        <div class="orders-item-plan-row__meta">Data: ${p.date}</div>
        <div class="orders-item-plan-row__meta">Responsável: ${p.responsible}</div>
        <div class="orders-item-plan-row__meta">Quantidade: ${p.quantity}</div>
        <div class="orders-item-plan-row__action">
          ${p.type==="canceled"?q({text:"Replanejar",style:"text",variant:"dark",size:"sm",iconLeft:"edit"}).replace("<button ",'<button data-order-item-action="replan" '):""}
        </div>
      </div>
    `).join(""):"";return`
      <article class="orders-item ${d&&s===0?"is-expanded":""}" data-order-item="${r.id}">
        <div class="orders-item__main">
          <button type="button" class="orders-item__toggle" data-order-item-toggle aria-label="Expandir item">
            ${_("chevron-down",{size:14})}
          </button>
          <span class="orders-item__product">
            <strong class="orders-item__product-name">${u}</strong>
            ${k?`<small class="orders-item__product-code">${k}</small>`:""}
          </span>
          <span class="orders-item__value">${r.quantity}</span>
          <span class="orders-item__value">${r.unitValue}</span>
          <span class="orders-item__value">${r.totalValue}</span>
          <span class="orders-item__value">${r.availableQuantity}</span>
          ${t?"":`
          <div class="orders-item__actions">
            ${q({text:"Planejar",style:"outline",variant:"info",size:"sm"}).replace("<button ",'<button data-order-item-action="plan" ')}
            ${q({text:"Cancelar",style:"outline",variant:"danger",size:"sm"}).replace("<button ",'<button data-order-item-action="cancel" ')}
          </div>
          `}
        </div>
        ${d?`
          <div class="orders-item__planning">
            ${C}
          </div>
        `:""}
      </article>
    `}).join("");return`
    <div class="orders-details-card orders-item-table ${t?"orders-item-table--no-actions":""}">
      ${n}
      ${o}
    </div>
  `}function Or(e){return`
    <div class="orders-details-card orders-summary-card">
      <div class="orders-summary-card__item">
        ${_("calendar",{size:14})}
        <div>
          <span class="orders-details-field__label">Data do Pedido</span>
          <strong class="orders-details-field__value">${e.orderDate}</strong>
        </div>
      </div>
      <div class="orders-summary-card__item">
        ${_("calendar",{size:14})}
        <div>
          <span class="orders-details-field__label">Entrega Prevista</span>
          <strong class="orders-details-field__value">${e.expectedDelivery}</strong>
        </div>
      </div>
      <div class="orders-summary-card__item">
        ${_("circle",{size:14})}
        <div>
          <span class="orders-details-field__label">Valor Total do Pedido</span>
          <strong class="orders-summary-card__value">${e.totalValue}</strong>
        </div>
      </div>
      <div class="orders-summary-card__item">
        ${_("file",{size:14})}
        <div>
          <span class="orders-details-field__label">Observação do Pedido</span>
          <strong class="orders-details-field__value">${e.notes}</strong>
        </div>
      </div>
    </div>
  `}function Bt(e=null,a=null){const t=a||Ja(e),n=t?.footerPrimaryAction||null,o=!!t?.hideFooterCancelTotal,r=!!t?.replaceFooterCancelTotal;return`
    <div class="orders-details-footer">
      <div class="orders-details-footer__left">
        ${q({text:"Voltar",style:"outline",variant:"dark",size:"sm"}).replace("<button ",'<button data-pedido-drawer-action="back" ')}
      </div>
      <div class="orders-details-footer__right">
        ${o||r?"":q({text:"Cancelar Pedido Total",style:"outline",variant:"danger",size:"sm"}).replace("<button ",'<button data-pedido-drawer-action="cancel-total" ')}
        ${n?q({text:n.label,variant:"primary",size:"sm",disabled:!!n.disabled}).replace("<button ",`<button data-pedido-drawer-action="${n.key}" `):""}
      </div>
    </div>
  `}function Vr(){const e=document.getElementById("kanban-advanced-filters-btn");if(!e)return()=>{};const a=Kr(se),t=se===Z.PEDIDOS,n=t?bn():null,o="kanban-advanced-filters-drawer",r=document.querySelector(`[data-drawer="${o}"]`),s=document.querySelector(`[data-drawer-backdrop="${o}"]`);r&&r.remove(),s&&s.remove();const d=Ee({id:o,title:"Filtros Avançados",width:540,content:jr(a,{mode:se,ordersFiltersState:n}),footer:Xr()});document.body.insertAdjacentHTML("beforeend",d);const i=De({id:o,root:document}),u=document.querySelector(`[data-drawer="${o}"]`);if(!u||!i)return()=>{};const k=u.querySelector(".advanced-filters-footer"),C="kanban-save-filters-modal";let p=null,x=()=>{},y=0;const M=u.querySelector("#advanced-filters-tabs"),T=M?M.closest("[data-tabs]"):null,P=D=>{if(!k)return;const l=t&&D===1?"saved":"filter";k.dataset.activeTab=l},A=(D,l={})=>{if(!t||!a||!D)return;const{readOnly:g=!1}=l,c=a.items.find($=>$.id===D);c&&(a.selectedId=D,a.draftName=c.name,a.draftSharing=[...c.sharing],a.readOnly=g,Ae(u,a))},z=()=>{!t||!a.selectedId||A(a.selectedId,{readOnly:!1})},I=()=>{if(!t||!a.selectedId)return;const D=u.querySelector("[data-saved-edit-name]"),l=D?D.closest(".field"):null,g=D?D.value.trim():"";if(!g){l&&l.classList.add("field--error"),D&&typeof D.focus=="function"&&D.focus();return}l&&l.classList.remove("field--error"),a.items=a.items.map(c=>c.id===a.selectedId?{...c,name:g,sharing:[...a.draftSharing||[]]}:c),a.draftName=g,a.readOnly=!1,Ae(u,a)},m=D=>{if(!T)return;const l=D.target.closest(".tabs-tab");if(!l||!T.contains(l))return;const g=Number(l.dataset.tab);if(Number.isNaN(g))return;const c=T.querySelectorAll(".tabs-tab"),$=T.parentElement?.querySelectorAll(".tabs-panel");c.forEach((h,w)=>{h.classList.toggle("is-active",w===g),h.setAttribute("aria-selected",String(w===g))}),$&&($.forEach((h,w)=>{h.classList.toggle("is-active",w===g)}),y=g,P(g))},H=D=>{const l=D.target.closest("[data-saved-footer-action]");if(l&&t){const f=l.dataset.savedFooterAction;f==="cancel"&&z(),f==="save"&&I();return}const g=D.target.closest("[data-saved-action]");if(g){const f=g.dataset.savedAction,L=g.closest("[data-saved-filter-item]"),N=L?L.dataset.savedFilterItem:"";if(!N)return;if(t){if(f==="edit"){A(N,{readOnly:!1});return}if(f==="delete"){if(a.items=a.items.filter(O=>O.id!==N),!a.items.length)a.selectedId="",a.draftName="",a.draftSharing=[],a.readOnly=!1;else if(a.selectedId===N){const O=a.items[0];A(O.id,{readOnly:!1});return}Ae(u,a);return}if(f==="view"){A(N,{readOnly:!0});return}if(f==="cancel-edit"){z();return}if(f==="save-edit"){I();return}}if(f==="edit"){a.editingId=N,Ae(u,a);return}if(f==="delete"){a.items=a.items.filter(O=>O.id!==N),a.editingId===N&&(a.editingId=""),a.selectedId===N&&(a.selectedId=""),Ae(u,a);return}if(f==="view"){a.selectedId=N,console.log("Visualizar filtro salvo",N),Ae(u,a);return}if(f==="cancel-edit"){a.editingId="",Ae(u,a);return}if(f==="save-edit"){const O=L.querySelector("[data-saved-edit-name]"),W=O?O.closest(".field"):null,G=O?O.value.trim():"";if(!G){W&&W.classList.add("field--error"),O&&O.focus();return}W&&W.classList.remove("field--error"),a.items=a.items.map(B=>B.id===N?{...B,name:G}:B),a.editingId="",Ae(u,a);return}}if(t){const f=D.target.closest("[data-saved-filter-select]");if(f){const N=f.closest("[data-saved-filter-item]"),O=N?N.dataset.savedFilterItem:"";if(!O)return;A(O,{readOnly:!1});return}const L=D.target.closest("[data-saved-share-remove]");if(L){const N=L.dataset.savedShareRemove;if(!N)return;a.draftSharing=(a.draftSharing||[]).filter(O=>O!==N),Ae(u,a);return}}const c=D.target.closest("[data-filters-action]");if(c){const f=c.dataset.filtersAction;if(t&&n){if(f==="apply"){const L=Gr(u,n);window.dispatchEvent(new CustomEvent("orders:filters:apply",{detail:L})),i.close();return}if(f==="clear"){Hr(u,n);return}}else f==="apply"&&console.log("Aplicar filtros"),f==="clear"&&console.log("Limpar filtros");f==="save"&&ce(c);return}const $=D.target.closest('[data-action="remove"]');if($){const f=$.closest(".chip");if(!f||!u.contains(f))return;if(t&&n){const L=f.dataset.ordersActiveChip;if(L){n.activeFilters=n.activeFilters.filter(N=>N.id!==L),hn(u,n);return}}f.remove();return}const h=D.target.closest("[data-order-option]");if(h){const f=h.closest("[data-order-options]");if(!f)return;f.querySelectorAll("[data-order-option]").forEach(L=>{L.classList.toggle("is-active",L===h)});return}const w=D.target.closest("[data-active-filters-toggle]");if(!w)return;const E=u.querySelector(".advanced-filters-active");if(!E)return;const v=E.classList.toggle("is-collapsed");w.setAttribute("aria-expanded",String(!v))},R=D=>{if(!t||!D.target)return;const l=D.target.closest("[data-saved-edit-name]");if(!l)return;a.draftName=l.value;const g=l.closest(".field");g&&g.classList.remove("field--error")},j=()=>{i.open(e)},U=({restoreFocus:D=!0}={})=>{const l=document.querySelector(`[data-modal="${C}"]`),g=document.querySelector(`[data-modal-backdrop="${C}"]`);!l||!g||(x(),we(C),u.classList.contains("is-open")&&(document.body.style.overflow="hidden"),l.remove(),g.remove(),D&&p&&typeof p.focus=="function"&&p.focus(),p=null)},ce=D=>{const l=document.querySelector(`[data-modal="${C}"]`),g=document.querySelector(`[data-modal-backdrop="${C}"]`);l&&l.remove(),g&&g.remove(),p=D||null,document.body.insertAdjacentHTML("beforeend",es({modalId:C}));const c=document.querySelector(`[data-modal="${C}"]`),$=document.querySelector(`[data-modal-backdrop="${C}"]`);if(!c||!$)return;const h=c.querySelector("#save-filters-name-input"),w=c.querySelector(".field"),E=c.querySelector("[data-save-filters-error]"),v=c.querySelector("[data-save-modal-cancel]"),f=c.querySelector("[data-modal-close]"),L=c.querySelector("[data-save-modal-submit]"),N=de=>{E&&(E.hidden=!de),w&&w.classList.toggle("field--error",de)},O=de=>{de.target===$&&U()},W=()=>U(),G=()=>U(),B=()=>{if(!h)return;const de=h.value.trim();if(!de){N(!0),h.focus();return}N(!1),console.log({nomeFiltro:de}),U()},me=()=>N(!1),ne=de=>{de.key==="Escape"&&(de.preventDefault(),U())};$.addEventListener("click",O),v&&v.addEventListener("click",W),f&&f.addEventListener("click",G),L&&L.addEventListener("click",B),h&&h.addEventListener("input",me),document.addEventListener("keydown",ne),x=()=>{$.removeEventListener("click",O),v&&v.removeEventListener("click",W),f&&f.removeEventListener("click",G),L&&L.removeEventListener("click",B),h&&h.removeEventListener("input",me),document.removeEventListener("keydown",ne),x=()=>{}},$e(C),h&&typeof h.focus=="function"&&requestAnimationFrame(()=>h.focus())};return T&&T.addEventListener("click",m),P(y),u.addEventListener("click",H),u.addEventListener("input",R),e.addEventListener("click",j),()=>{U({restoreFocus:!1}),e.removeEventListener("click",j),T&&T.removeEventListener("click",m),u.removeEventListener("click",H),u.removeEventListener("input",R),i.cleanup&&i.cleanup();const D=document.querySelector(`[data-drawer="${o}"]`),l=document.querySelector(`[data-drawer-backdrop="${o}"]`);D&&D.remove(),l&&l.remove()}}function jr(e,a={}){const{mode:t=Z.PRODUCAO,ordersFiltersState:n=null}=a;return`<section class="advanced-filters">${Ca({id:"advanced-filters-tabs",variant:"underlined",fullWidth:!0,activeTab:0,tabs:[{label:"Filtro",content:t===Z.PEDIDOS?Qr(n):Zr()},{label:"Filtros Salvos",content:Wr(e,{mode:t})}]})}</section>`}function bn(){const e=[{id:"status",label:"Status: 6 selecionados",kind:"alert"},{id:"date-between",label:"Data entre: 22/12/25 + 01/01/26",kind:"neutral"},{id:"code",label:"Código: 2233",kind:"neutral"},{id:"client-1",label:"Cliente: A2W",kind:"muted"},{id:"client-2",label:"Cliente: A2W",kind:"muted"},{id:"client-3",label:"Cliente: A2W",kind:"muted"},{id:"client-4",label:"Cliente: A2W",kind:"muted"}];return{defaultActiveFilters:e.map(a=>({...a})),activeFilters:e.map(a=>({...a}))}}function Qr(e){const a=e||bn(),t=`
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/>
      <path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,n=le({id:"advanced-filter-selected",label:"Filtro selecionado",required:!0,placeholder:"",value:"relatorio-mensal",items:[{label:"Relatório Mensal",value:"relatorio-mensal"}]}),o=Ft({id:"advanced-filter-show-inactive",label:"Mostrar inativos",size:"sm"}),r=Ea({id:"advanced-filter-except",label:"Exceto",checked:!1}),s=le({id:"advanced-filter-data-type",label:"Tipo de Data",placeholder:"Selecione o tipo de data",items:[{label:"Data de pedido",value:"pedido"},{label:"Data de entrega",value:"entrega"},{label:"Data de faturamento",value:"faturamento"}]}),d=S({id:"advanced-filter-start-date",type:"date",label:"Data inicial",placeholder:"00/00/0000",iconRight:t}),i=S({id:"advanced-filter-end-date",type:"date",label:"Data final",placeholder:"00/00/0000",iconRight:t}),u=S({id:"advanced-filter-order-code-a2w",label:"Código Pedido A2W",placeholder:"Digite o código do pedido"}),k=S({id:"advanced-filter-order-code-tawros",label:"Código Pedido TAWROS",placeholder:"Digite o código"}),C=S({id:"advanced-filter-client-code",label:"Código do Cliente",placeholder:"Digite o código do pedido"}),p=S({id:"advanced-filter-cpf-cnpj",label:"CPF/CNPJ",placeholder:"Digite o nome do cliente"}),x=S({id:"advanced-filter-business-name",label:"Razão Social/Nome",placeholder:"Digite o nome da Razão Social"}),y=S({id:"advanced-filter-fantasy-name",label:"Nome Fantasia/Apelido",placeholder:"Digite o Nome Fantasia"}),M=S({id:"advanced-filter-product-code",label:"Código Produto",placeholder:"Digite o código do produto"}),T=le({id:"advanced-filter-product",label:"Produto",placeholder:"( Nome do produto )",items:[{label:"Muda de Eucalipto Clone AEC 144",value:"muda-eucalipto-aec-144"},{label:"Muda de Eucalipto Clone AEC 224",value:"muda-eucalipto-aec-224"}]}),P=le({id:"advanced-filter-class",label:"Classe",placeholder:"Selecione a classe",items:[{label:"Classe A",value:"classe-a"},{label:"Classe B",value:"classe-b"}]}),A=S({id:"advanced-filter-min-quantity",label:"Quantidade Mínima",placeholder:"Quantidade"}),z=S({id:"advanced-filter-max-quantity",label:"Quantidade Máxima",placeholder:"Quantidade"}),I=S({id:"advanced-filter-min-value",label:"Valor Mínimo",placeholder:"R$ 00,00"}),m=S({id:"advanced-filter-max-value",label:"Valor Máximo",placeholder:"R$ 00,00"}),H=wa({id:"advanced-filter-status",label:"Status",chips:[pe({label:"Bloqueado",value:"bloqueado",size:"sm"}),pe({label:"Em Produção",value:"em-producao",size:"sm"}),pe({label:"Expedição",value:"expedicao",size:"sm"})]}),R=wn(),j=le({id:"advanced-filter-sorting-type",label:"Tipo de ordenação",required:!0,placeholder:"Selecione",items:[{label:"Crescente",value:"asc"},{label:"Decrescente",value:"desc"}]}),U=$n();return`
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
        ${r}
      </div>
      <div class="advanced-filters-grid">
        ${s}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${d}
        ${i}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${u}
        ${k}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${C}
        ${p}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${x}
        ${y}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${M}
        ${T}
      </div>
      <div class="advanced-filters-grid">
        ${P}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${A}
        ${z}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${I}
        ${m}
      </div>
      <div class="advanced-filters-grid">
        ${H}
      </div>
      <div class="advanced-filters-grid">
        ${R}
      </div>
      <div class="advanced-filters-grid">
        ${j}
      </div>
      <div class="advanced-filters-grid">
        ${U}
      </div>
    </form>
  `}function _n(e){return(e?.activeFilters||[]).map(t=>{const n=t.kind==="alert"?"advanced-filters-chip--alert":t.kind==="muted"?"advanced-filters-chip--muted":"";return pe({label:t.label,value:t.id,size:"sm",className:n}).replace("<button ",`<button data-orders-active-chip="${t.id}" `)}).join("")}function hn(e,a){if(!e)return;const t=e.querySelector("[data-active-filters]");t&&(t.innerHTML=_n(a))}function Hr(e,a){if(!e||!a)return;const t=e.querySelector("[data-orders-filters-form]");t&&typeof t.reset=="function"&&t.reset();const n=e.querySelector("#advanced-filter-selected");n&&(n.value="relatorio-mensal");const o=e.querySelector("#advanced-filter-sorting-type");o&&(o.value=""),e.querySelectorAll("[data-order-option]").forEach(s=>{s.classList.toggle("is-active",s.dataset.orderOption==="recentes")}),a.activeFilters=a.defaultActiveFilters.map(s=>({...s})),hn(e,a)}function Gr(e,a){if(!e)return{};const t=e.querySelector("[data-orders-filters-form]"),n=t?new FormData(t):new FormData,o=i=>(n.get(i)||"").toString().trim(),r=e.querySelector("[data-order-option].is-active"),s=Array.from(e.querySelectorAll("#advanced-filter-status .chip-label")).map(i=>i.textContent?.trim()).filter(Boolean),d={cliente:!!e.querySelector("#advanced-filter-group-client:checked"),classe:!!e.querySelector("#advanced-filter-group-class:checked"),produto:!!e.querySelector("#advanced-filter-group-product:checked"),pedidos:!!e.querySelector("#advanced-filter-group-order:checked")};return{selectedFilter:o("advanced-filter-selected"),activeFilters:(a?.activeFilters||[]).map(i=>i.label),showInactive:!!e.querySelector("#advanced-filter-show-inactive:checked"),except:!!e.querySelector("#advanced-filter-except:checked"),dateType:o("advanced-filter-data-type"),startDate:o("advanced-filter-start-date"),endDate:o("advanced-filter-end-date"),orderCodeA2W:o("advanced-filter-order-code-a2w"),orderCodeTawros:o("advanced-filter-order-code-tawros"),clientCode:o("advanced-filter-client-code"),cpfCnpj:o("advanced-filter-cpf-cnpj"),businessName:o("advanced-filter-business-name"),fantasyName:o("advanced-filter-fantasy-name"),productCode:o("advanced-filter-product-code"),product:o("advanced-filter-product"),className:o("advanced-filter-class"),quantityMin:o("advanced-filter-min-quantity"),quantityMax:o("advanced-filter-max-quantity"),valueMin:o("advanced-filter-min-value"),valueMax:o("advanced-filter-max-value"),status:s,sortBy:r?.dataset.orderOption||"recentes",sortingType:o("advanced-filter-sorting-type"),groupBy:d}}function Kr(e=Z.PRODUCAO){const a=[{id:"saved-filter-1",name:"Relatório Mensal",sharing:["Vitor (Gerente)","Equipe de Vendas"]},{id:"saved-filter-2",name:"Filtro Relatório Mensal 2",sharing:["Vitor (Gerente)","Equipe de Vendas"]},{id:"saved-filter-3",name:"Relatório Mensal 33",sharing:["Vitor (Gerente)","Equipe de Vendas"]},{id:"saved-filter-4",name:"Relatório Anual",sharing:["Vitor (Gerente)","Equipe de Vendas"]}];return e===Z.PEDIDOS?{mode:e,items:a,selectedId:a[0]?.id||"",draftName:a[0]?.name||"",draftSharing:[...a[0]?.sharing||[]],readOnly:!1}:{mode:e,items:a,editingId:"saved-filter-1",selectedId:""}}function Wr(e,a={}){const{mode:t=Z.PRODUCAO}=a;return t===Z.PEDIDOS?Ur(e):`
    <div class="saved-filters-panel" data-saved-filters-panel>
      ${kn(e)}
    </div>
  `}function Ae(e,a){if(!e)return;const t=e.querySelector("[data-saved-filters-panel]");if(t){if(a?.mode===Z.PEDIDOS){t.innerHTML=yn(a);return}t.innerHTML=kn(a)}}function Ur(e){return`
    <div class="saved-filters-panel saved-filters-panel--orders" data-saved-filters-panel>
      ${yn(e)}
    </div>
  `}function yn(e){const a=e?.items?.find(s=>s.id===e.selectedId)||null,t=e?.draftName??a?.name??"",o=(e?.draftSharing??a?.sharing??[]).map((s,d)=>e?.readOnly?xe({label:s,value:`saved-sharing-${d}`,size:"sm",className:"saved-filter-edit__chip saved-filter-edit__chip--readonly"}):pe({label:s,value:`saved-sharing-${d}`,size:"sm",className:"saved-filter-edit__chip"}).replace("<button ",`<button data-saved-share-remove="${s}" `)).join("");return`
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
          ${S({id:"orders-saved-filter-name",label:"Nome do filtro",value:t,readonly:!!e?.readOnly}).replace('class="input"','class="input" data-saved-edit-name')}
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
  `}function kn(e){return e.items.length?e.items.map(a=>Yr(a,e)).join(""):'<div class="advanced-filters-empty">Nenhum filtro salvo.</div>'}function Yr(e,a){const t=a.editingId===e.id,n=a.selectedId===e.id,o=e.sharing.map((r,s)=>pe({label:r,value:`${e.id}-share-${s}`,size:"sm"})).join("");return`
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
          ${S({id:`saved-filter-name-${e.id}`,label:"Nome do filtro",value:e.name,className:"saved-filter-item__edit-name"}).replace('class="input"','class="input" data-saved-edit-name')}
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
  `,a=le({id:"advanced-filter-selected",label:"Filtro selecionado",required:!0,placeholder:"",value:"relatorio-mensal",items:[{label:"Relatório Mensal",value:"relatorio-mensal"}]}),t=[pe({label:"Status: 6 selecionados",value:"status-6",size:"sm",className:"advanced-filters-chip--alert"}),pe({label:"Data entre: 22/12/25 + 01/01/26",value:"data-entre",size:"sm"}),pe({label:"Código: 2233",value:"codigo",size:"sm"}),pe({label:"Cliente: A2W",value:"cliente-1",size:"sm"}),pe({label:"Cliente: A2W",value:"cliente-2",size:"sm"}),pe({label:"Cliente: A2W",value:"cliente-3",size:"sm"}),pe({label:"Cliente: A2W",value:"cliente-4",size:"sm"})].join(""),n=Ft({id:"advanced-filter-show-inactive",label:"Mostrar inativos",size:"sm"}),o=Ea({id:"advanced-filter-except",label:"Exceto",checked:!1}),r=le({id:"advanced-filter-data-type",label:"Tipo de Data",placeholder:"Selecione o tipo de data",items:[{label:"Data de pedido",value:"pedido"},{label:"Data de início",value:"inicio"}]}),s=S({id:"advanced-filter-start-date",type:"date",label:"Data inicial",placeholder:"00/00/0000",iconRight:e}),d=S({id:"advanced-filter-end-date",type:"date",label:"Data final",placeholder:"00/00/0000",iconRight:e}),i=S({id:"advanced-filter-order-code",label:"Código Pedido",placeholder:"Digite o código do pedido"}),u=S({id:"advanced-filter-tawros-code",label:"Código TAWROS",placeholder:"Digite o código"}),k=S({id:"advanced-filter-client-code",label:"Código do Cliente",placeholder:"Digite o código do cliente"}),C=S({id:"advanced-filter-cpf-cnpj",label:"CPF/CNPJ",placeholder:"Digite o nome do cliente"}),p=S({id:"advanced-filter-business-name",label:"Razão Social/Nome",placeholder:"Digite o nome da Razão Social"}),x=S({id:"advanced-filter-fantasy-name",label:"Nome Fantasia/Apelido",placeholder:"Digite o Nome Fantasia"}),y=le({id:"advanced-filter-class",label:"Classe",placeholder:"Selecione a classe",items:[{label:"Classe A",value:"a"},{label:"Classe B",value:"b"}]}),M=S({id:"advanced-filter-product-code",label:"Código Produto",placeholder:"Digite o código do produto"}),T=le({id:"advanced-filter-product",label:"Produto",placeholder:"Nome do produto",items:[{label:"Tomate Cereja",value:"tomate-cereja"},{label:"Tomate Italiano",value:"tomate-italiano"}]}),P=S({id:"advanced-filter-min-quantity",label:"Quantidade Mínima",placeholder:"Quantidade"}),A=S({id:"advanced-filter-max-quantity",label:"Quantidade Máxima",placeholder:"Quantidade"}),z=wa({label:"Tipo",chips:[pe({label:"Enxerto",value:"enxerto",size:"sm"}),pe({label:"Porta Enxerto",value:"porta-enxerto",size:"sm"})]}),I=wa({label:"Status",chips:[pe({label:"Bloqueado",value:"bloqueado",size:"sm"}),pe({label:"Em Produção",value:"em-producao",size:"sm"}),pe({label:"Expedição",value:"expedicao",size:"sm"})]}),m=wn(),H=le({id:"advanced-filter-sorting-type",label:"Tipo de ordenação",required:!0,placeholder:"Selecione",items:[{label:"Crescente",value:"asc"},{label:"Decrescente",value:"desc"}]}),R=wa({label:"Etiqueta",chips:[pe({label:"Normal",value:"normal",size:"sm"}),pe({label:"Urgente",value:"urgente",size:"sm"})]}),j=$n();return`
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
        ${r}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${s}
        ${d}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${i}
        ${u}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${k}
        ${C}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${p}
        ${x}
      </div>
      <div class="advanced-filters-grid">
        ${y}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${M}
        ${T}
      </div>
      <div class="advanced-filters-grid">
        ${z}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${P}
        ${A}
      </div>
      <div class="advanced-filters-grid">
        ${I}
      </div>
      <div class="advanced-filters-grid">
        ${m}
      </div>
      <div class="advanced-filters-grid">
        ${H}
      </div>
      <div class="advanced-filters-grid">
        ${R}
      </div>
      <div class="advanced-filters-grid">
        ${j}
      </div>
    </div>
  `}function wa({id:e="",label:a,chips:t}){const n=t.join("");return`
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
      ${Ea({id:t.id,label:t.label,checked:t.checked,size:"sm"})}
      <span class="advanced-filters-group__drag" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M6 3H6.01M10 3H10.01M6 8H6.01M10 8H10.01M6 13H6.01M10 13H10.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </span>
    </div>
  `).join("")}</div>
    </div>
  `}function Xr(){const e=q({text:"Salvar Filtros",style:"outline",variant:"dark",size:"sm",type:"button"}).replace("<button ",'<button data-filters-action="save" '),a=q({text:"Limpar Filtros",style:"outline",variant:"dark",size:"sm",type:"button"}).replace("<button ",'<button data-filters-action="clear" '),t=q({text:"Aplicar Filtros",variant:"primary",size:"sm",type:"button"}).replace("<button ",'<button data-filters-action="apply" '),n=q({text:"Cancelar",style:"outline",variant:"dark",size:"sm",type:"button"}).replace("<button ",'<button data-saved-footer-action="cancel" '),o=q({text:"Salvar",variant:"primary",size:"sm",type:"button"}).replace("<button ",'<button data-saved-footer-action="save" ');return`
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
  `}function es({modalId:e}){const a=S({id:"save-filters-name-input",label:"Nome do filtro",required:!0,placeholder:"Insira um nome para filtro"}),t=q({text:"Cancelar",style:"outline",variant:"dark",type:"button"}).replace("<button ","<button data-save-modal-cancel "),n=q({text:"Salvar",variant:"primary",type:"button"}).replace("<button ","<button data-save-modal-submit ");return Pe({id:e,type:"center",size:"sm",title:"Salvar Filtros",body:`
      <div class="advanced-save-modal__body">
        ${a}
        <span class="advanced-save-modal__error" data-save-filters-error hidden>Nome do filtro é obrigatório.</span>
      </div>
    `,footer:`
      <div class="advanced-save-modal__footer">
        ${t}
        ${n}
      </div>
    `,closable:!0})}const vs=Object.freeze(Object.defineProperty({__proto__:null,init:ko},Symbol.toStringTag,{value:"Module"}));export{q as c,vs as k};
