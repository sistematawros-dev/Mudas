const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/enviar-germinacao-drawer-BdxPZ2ZC.js","assets/drawer-DOh9nE41.js","assets/drawer-WUrFf_kj.css","assets/tabs-Bc_csLdm.js","assets/tabs-s1TBgd84.css","assets/input-BGfEK18X.js","assets/input-CR6JfLmf.css","assets/chip-Iox8iBys.js","assets/chip-SXewrVMn.css","assets/icons-C9wddX8K.js","assets/index-DyEPu6mm.js","assets/index-QKrpXWls.css","assets/checkbox-Czn0aMdg.js","assets/checkbox-BuSHLP4E.css","assets/toggle-8KHLMbPj.js","assets/toggle-DZsEfZw8.css","assets/toast-CUAdd3wL.js","assets/toast-PmqmSduh.css","assets/file-upload-BWgfDtFs.js","assets/file-upload-DYJCPlLb.css","assets/table-Bhr5kK3b.js","assets/table-BIQ3tM8Q.css","assets/enviar-germinacao-drawer-QhulgHXT.css","assets/badge-BJol6x-W.css","assets/button-C2QBC4-b.css"])))=>i.map(i=>d[i]);
import{c as Ae,o as xe,a as Fe,_ as Ga}from"./index-DyEPu6mm.js";import{i as l}from"./icons-C9wddX8K.js";/* empty css              */import{c as ye,i as ke}from"./drawer-DOh9nE41.js";import{c as oa}from"./tabs-Bc_csLdm.js";import{i as fe,c as v,b as se,a as Ye,d as Rt}from"./input-BGfEK18X.js";import{i as Vt,c as sa}from"./checkbox-Czn0aMdg.js";import{a as Xe,c as ot}from"./toggle-8KHLMbPj.js";import{a as Ee,c as re}from"./chip-Iox8iBys.js";/* empty css               */import{s as st}from"./toast-CUAdd3wL.js";import{i as jt,c as Ht}from"./file-upload-BWgfDtFs.js";import{c as it}from"./table-Bhr5kK3b.js";function ma(e="id"){return typeof crypto<"u"&&crypto.randomUUID?`${e}-${crypto.randomUUID().split("-")[0]}`:`${e}-${Math.random().toString(36).substring(2,11)}`}function Qt(...e){return e.filter(Boolean).join(" ")}function Gt(e={}){const{title:a="",count:t=0,color:n="gray",id:o=ma("column")}=e;return`
    <section class="kanban-column kanban-column--${n}" data-column-id="${o}" data-column-color="${n}">
      <div class="kanban-column__header">
        <div class="kanban-column__title-wrapper">
          <h3 class="kanban-column__title">${a}</h3>
          <span class="kanban-column__count">${t}</span>
        </div>
        <button class="kanban-column__settings" data-column-settings="${o}" aria-label="Configurações da coluna">
          ${l("settings",{size:20})}
        </button>
      </div>
      <div class="kanban-column__content" data-column-content="${o}">
        <!-- Cards serão inseridos aqui -->
      </div>
    </section>
  `}function Ut(e,a){const t=document.querySelector(`[data-column-content="${e}"]`);if(!t)return;const n=t.querySelector(".kanban-column__empty");n&&n.remove(),t.insertAdjacentHTML("beforeend",a),Wt(e)}function Wt(e){const a=document.querySelector(`[data-column-id="${e}"]`);if(!a)return;const n=a.querySelector(`[data-column-content="${e}"]`).querySelectorAll(".kanban-card").length,o=a.querySelector(".kanban-column__count");o&&(o.textContent=n)}function Kt(e,a){const t=document.querySelector(`[data-column-id="${e}"]`);if(!t)return;["cyan","green","blue","indigo","slate","purple","yellow","pink","red","orange"].forEach(o=>t.classList.remove(`kanban-column--${o}`)),t.classList.add(`kanban-column--${a}`),t.dataset.columnColor=a}function Jt(e){const a=document.querySelector(`[data-column-content="${e}"]`);a&&(a.innerHTML=`
    <div class="kanban-column__empty">
      ${l("package",{size:48})}
      <p class="kanban-column__empty-text">Não há ordens de produção</p>
    </div>
  `)}const la={check:'<svg viewBox="0 0 14 14" fill="none"><path d="M11.5 4L5.5 10L2.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',x:'<svg viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',dot:'<span class="badge-dot"></span>'};function Le(e={}){const{text:a="",variant:t="primary",style:n="filled",size:o="",icon:i="",darkMode:s=!1}=e,d=["badge"];n==="filled"?d.push(`badge--${t}`):d.push(`badge--${n}-${t}`),o&&d.push(`badge--${o}`),s&&d.push("badge--dark-mode");let b="";return i&&la[i]&&(b=i==="dot"?la[i]:`<span class="badge-icon">${la[i]}</span>`),`<span class="${d.join(" ")}">${b}${a}</span>`}function Yt(e={}){const{code:a="",subtitle:t="",badgeLabel:n="",badgeVariant:o="light",badgeStyle:i="filled",items:s=[],id:d=ma("card")}=e,b=n?Le({text:n,variant:o,style:i,size:"sm"}):"",y=s.map(k=>{if(k.type==="divider")return'<div class="kanban-card__divider"></div>';const x=k.icon!==null&&k.icon!==!1&&k.icon!=="",L=k.icon||"circle",E=x?l(L,{size:16}):"";return`
      <div class="kanban-card__item${k.className?` ${k.className}`:""}">
        ${E}
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
        ${b}
      </div>
      <div class="kanban-card__body">
        ${y}
      </div>
    </div>
  `}const Zt=[{value:"cyan",label:"Ciano"},{value:"green",label:"Verde"},{value:"blue",label:"Azul"},{value:"indigo",label:"Índigo"},{value:"slate",label:"Ardósia"},{value:"purple",label:"Roxo"},{value:"yellow",label:"Amarelo"},{value:"pink",label:"Rosa"},{value:"red",label:"Vermelho"},{value:"orange",label:"Laranja"}];function Xt(e={}){const{id:a=ma("color-picker"),selected:t="gray"}=e,n=Zt.map(o=>`
    <button
      type="button"
      class="${Qt("color-picker__option",o.value===t&&"is-selected")}"
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
          ${l("close",{size:16})}
        </button>
      </div>
      <div class="color-picker__grid">
        ${n}
      </div>
    </div>
  `}function en(e,a){if(!e)return;const t=e.querySelectorAll(".color-picker__option"),n=e.querySelector("[data-color-picker-close]");t.forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.color;t.forEach(s=>s.classList.remove("is-selected")),o.classList.add("is-selected"),a&&a(i)})}),n&&n.addEventListener("click",o=>{o.stopPropagation(),pa(e)})}function pa(e){e&&e.classList.remove("is-open")}function an(e){e&&e.classList.toggle("is-open")}const Ge={plus:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',check:'<svg viewBox="0 0 16 16" fill="none"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronRight:'<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronDown:'<svg viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',download:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 2V10M8 10L5 7M8 10L11 7M3 14H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',upload:'<svg viewBox="0 0 16 16" fill="none"><path d="M8 10V2M8 2L5 5M8 2L11 5M3 14H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',edit:'<svg viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',trash:'<svg viewBox="0 0 16 16" fill="none"><path d="M3 4H13M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',close:'<svg viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',search:'<svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'};function h(e={}){const{text:a="",variant:t="primary",style:n="solid",size:o="",iconLeft:i="",iconRight:s="",iconOnly:d=!1,disabled:b=!1,loading:y=!1,block:k=!1,darkMode:x=!1,tag:L="button",href:E="",type:g="button"}=e,q=["btn"];n==="solid"?q.push(`btn--${t}`):q.push(`btn--${n}-${t}`),o&&q.push(`btn--${o}`),d&&q.push("btn--icon-only"),y&&q.push("btn--loading"),k&&q.push("btn--block"),x&&q.push("btn--dark-mode");const c=i&&Ge[i]?`<span class="btn-icon">${Ge[i]}</span>`:"",P=s&&Ge[s]?`<span class="btn-icon">${Ge[s]}</span>`:"",B=d&&i?`<span class="btn-icon">${Ge[i]}</span>`:`${c}${a}${P}`,T=b?"disabled":"";return L==="a"?`<a href="${E}" class="${q.join(" ")}">${B}</a>`:`<button type="${g}" class="${q.join(" ")}" ${T}>${B}</button>`}const Te="kanban-link-order-modal",tn="kanban-planning-modal",nn=[{id:"item-1",product:"Muda de Eucalipto",code:"MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",available:"1000"},{id:"item-2",product:"Muda de Eucalipto",code:"MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",available:"1000"},{id:"item-3",product:"Muda de Eucalipto",code:"MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",available:"1000"}];let va=()=>{},ea=null;function on(e=new Set){const a=[{key:"check",label:""},{key:"product",label:"Produto"},{key:"quantity",label:"Qtd. Pedido"},{key:"unitValue",label:"Valor Unitário"},{key:"totalValue",label:"Valor Total"},{key:"available",label:"Qtd. Disponível"}],t=nn.map((n,o)=>{const i=e.has(n.id)||!e.size&&o===0;return{check:sa({id:`link-order-checkbox-${n.id}`,value:n.id,checked:i,className:"link-order-modal__checkbox"}).replace('class="checkbox-input"','class="checkbox-input" data-link-order-item'),product:`
        <div class="link-order-modal__product">
          <span>${n.product}</span>
          <small>${n.code}</small>
        </div>
      `,quantity:n.quantity,unitValue:n.unitValue,totalValue:n.totalValue,available:n.available}});return it({id:"link-order-items-table",columns:a,data:t,variant:"compact",className:"link-order-modal__table-component"})}function sn({selectedIds:e=new Set}={}){return Fe({id:Te,title:"Vincular Pedido",size:"md",className:"link-order-modal",body:`
      <div class="link-order-modal__content">
        ${v({id:"link-order-search",label:"Vincular pedido",required:!0,placeholder:"Buscar por código, nome do pedido",iconRight:l("search",{size:14})})}

        <section class="link-order-modal__info-card">
          <h3 class="link-order-modal__section-title">${l("file",{size:12})}Informações do Pedido</h3>
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
          ${on(e)}
        </div>
      </div>
    `,footer:`
      <div class="link-order-modal__footer">
        ${h({text:"Desvincular pedido",style:"outline",variant:"error",size:"sm"}).replace("<button ",'<button data-link-order-action="unlink" ')}
        <div class="link-order-modal__footer-right">
          ${h({text:"Voltar",style:"outline",variant:"dark",size:"sm"}).replace("<button ",'<button data-link-order-action="back" ')}
          ${h({text:"Salvar",variant:"primary",size:"sm"}).replace("<button ",'<button data-link-order-action="save" ')}
        </div>
      </div>
    `})}function Me({restoreFocus:e=!0}={}){const a=document.querySelector(`[data-modal="${Te}"]`),t=document.querySelector(`[data-modal-backdrop="${Te}"]`);!a||!t||(va(),Ae(Te),document.querySelector(`[data-modal="${tn}"]`)?.classList.contains("is-visible")&&(document.body.style.overflow="hidden"),a.remove(),t.remove(),e&&ea?.focus&&ea.focus(),ea=null)}function dn(e={}){const{anchorEl:a=null,selectedIds:t=[],onBack:n=null,onSave:o=null}=e;Me({restoreFocus:!1});const i=new Set(Array.isArray(t)?t:[]);ea=a,document.body.insertAdjacentHTML("beforeend",sn({selectedIds:i}));const s=document.querySelector(`[data-modal="${Te}"]`),d=document.querySelector(`[data-modal-backdrop="${Te}"]`);if(!s||!d)return;const b=fe(s),y=Vt(s),k=s.querySelector("[data-modal-close]"),x=s.querySelector("[data-link-order-table-host]"),L=s.querySelector('[data-link-order-action="unlink"]'),E=s.querySelector('[data-link-order-action="back"]'),g=s.querySelector('[data-link-order-action="save"]'),q=s.querySelector("#link-order-search"),c=()=>{const p=x?.querySelectorAll("[data-link-order-item]")||[];return Array.from(p).filter(r=>r.checked).map(r=>r.value)},P=()=>Me(),B=p=>{p.target===d&&Me()},T=p=>{p.key==="Escape"&&(p.preventDefault(),p.stopPropagation(),Me())},K=()=>{(x?.querySelectorAll("[data-link-order-item]")||[]).forEach(r=>{r.checked=!1,r.indeterminate=!1})},F=()=>{Me({restoreFocus:!1}),typeof n=="function"&&n()},X=()=>{const p=c();typeof o=="function"&&o(p),Me({restoreFocus:!1}),a?.focus&&a.focus()};k?.addEventListener("click",P),L?.addEventListener("click",K),E?.addEventListener("click",F),g?.addEventListener("click",X),d.addEventListener("click",B),document.addEventListener("keydown",T,!0),va=()=>{k?.removeEventListener("click",P),L?.removeEventListener("click",K),E?.removeEventListener("click",F),g?.removeEventListener("click",X),d.removeEventListener("click",B),document.removeEventListener("keydown",T,!0),typeof b=="function"&&b(),typeof y=="function"&&y(),va=()=>{}},xe(Te),setTimeout(()=>{q?.focus?.()},120)}const Be="kanban-planning-modal",rn="kanban-link-order-modal",ln=[{value:"estoque-venda-direta",label:"Estoque (Venda Direta)"},{value:"remessa-futura",label:"Remessa Futura"},{value:"vincular-op",label:"Vincular Ordem de Produção"}],Ua=[{value:"5000",label:"5000"},{value:"3000",label:"3000"},{value:"1000",label:"1000"}],dt=[{value:"estufa-1",label:"Estufa 1"},{value:"estufa-2",label:"Estufa 2"},{value:"estufa-3",label:"Estufa 3"}],cn=[{value:"0001",label:"0001"},{value:"0002",label:"0002"},{value:"0003",label:"0003"}];let ga=()=>{},aa=null;function Wa(e=[],a="estoque-venda-direta"){const t=a==="remessa-futura",n=t?[{key:"plannedDate",label:"Data planejada"},{key:"location",label:"Localização"},{key:"responsible",label:"Responsável"},{key:"quantity",label:"Quantidade"},{key:"actions",label:"Ações"}]:[{key:"op",label:"OP"},{key:"seedDate",label:"Data Semeio"},{key:"daysAfterSowing",label:"Dias após Semeio"},{key:"quantity",label:"Quantidade"},{key:"actions",label:"Ações"}],o=e.map((i,s)=>({...t?{plannedDate:i.plannedDate,location:i.location,responsible:i.responsible,quantity:i.quantity}:{op:i.op,seedDate:i.seedDate,daysAfterSowing:i.daysAfterSowing,quantity:i.quantity},actions:`
      <div class="planning-modal__actions">
        <button type="button" class="planning-modal__icon-btn" data-planning-row-action="edit" data-row-index="${s}" aria-label="Editar">${l("edit",{size:14})}</button>
        <button type="button" class="planning-modal__icon-btn planning-modal__icon-btn--danger" data-planning-row-action="delete" data-row-index="${s}" aria-label="Excluir">${l("trash",{size:14})}</button>
        <button type="button" class="planning-modal__icon-btn" data-planning-row-action="view" data-row-index="${s}" aria-label="Visualizar">${l("eye",{size:14})}</button>
      </div>
    `}));return it({id:"planning-items-table",columns:n,data:o,variant:"compact",className:"planning-modal__table-component"})}function rt(e="estoque-venda-direta",a={}){return e==="remessa-futura"?`
    <section class="planning-modal__future-block">
      <div class="planning-modal__future-grid planning-modal__future-grid--2">
        ${se({id:"planning-future-location",label:"Localização",placeholder:"Selecione",value:a.futureDraftLocation||"",items:dt})}
        ${v({id:"planning-future-responsible",label:"Responsável",placeholder:"Digite o responsável",value:a.futureDraftResponsible||""})}
      </div>

      <div class="planning-modal__future-grid planning-modal__future-grid--3">
        ${se({id:"planning-future-quantity",label:"Quantidade",placeholder:"Selecione",value:a.futureDraftQuantity||"",items:Ua})}
        ${v({id:"planning-future-date",type:"date",label:"Data planejada para semeio",required:!0,value:a.futureDraftDate||"",className:"planning-modal__date-field",iconRight:l("calendar",{size:16})})}
        <div class="planning-modal__agenda-wrap">
          <label class="planning-modal__agenda-label">&nbsp;</label>
          ${h({text:"Consultar agenda",style:"outline",variant:"dark",size:"sm",iconLeft:"plus"}).replace("<button ",'<button data-planning-action="check-agenda" ')}
        </div>
      </div>

      ${h({text:"Adicionar",style:"outline",variant:"dark",size:"sm",iconLeft:"plus"}).replace("<button ",'<button data-planning-action="add-row" ')}
    </section>

    <div class="planning-modal__table-wrap" data-planning-table-host>
      ${Wa(a.futureRows||[],e)}
    </div>
  `:`
      <div class="planning-modal__link-row">
        <button type="button" class="btn btn--outline-dark btn--sm" data-planning-action="link-order">
          <span class="btn-icon">${l("file",{size:14})}</span>
          Vincular Pedido
        </button>
        <span class="planning-modal__linked-feedback" data-planning-linked-feedback hidden></span>
      </div>

      <section class="planning-modal__add-block">
        <div class="planning-modal__add-grid">
          ${se({id:"planning-quantity",label:"Quantidade",placeholder:"Selecione",value:a.draftQuantity||"",items:Ua})}
          ${se({id:"planning-lot",label:"Lote",placeholder:"Selecione",value:a.draftLot||"",items:cn})}
        </div>
        ${h({text:"Adicionar",style:"outline",variant:"dark",size:"sm",iconLeft:"plus"}).replace("<button ",'<button data-planning-action="add-row" ')}
      </section>

      <div class="planning-modal__table-wrap" data-planning-table-host>
        ${Wa(a.rows||[],e)}
      </div>
    `}function un({orderItem:e={},rows:a=[]}={}){const{product:t="Muda de Eucalipto Clone - MUD-001",totalPedido:n="5000",available:o="5000"}=e;return Fe({id:Be,title:"Planejamento",size:"lg",className:"planning-modal",body:`
      <div class="planning-modal__content">
        <section class="planning-modal__summary">
          <div><span>Produto</span><strong>${t}</strong></div>
          <div><span>Total Pedido</span><strong>${n}</strong></div>
          <div><span>Disponível</span><strong class="planning-modal__available">${o}</strong></div>
        </section>

        ${se({id:"planning-service-type",label:"Tipo de Atendimento",placeholder:"Selecione",value:"estoque-venda-direta",items:ln})}

        <div data-planning-dynamic-content>
          ${rt("estoque-venda-direta",{rows:a})}
        </div>
      </div>
    `,footer:`
      <div class="planning-modal__footer">
        ${h({text:"Cancelar",style:"outline",variant:"dark",size:"sm"}).replace("<button ",'<button data-planning-action="cancel" ')}
        ${h({text:"Enviar para Expedição",variant:"primary",size:"sm"}).replace("<button ",'<button data-planning-action="submit" ')}
      </div>
    `})}function Ie({restoreFocus:e=!0}={}){Me({restoreFocus:!1});const a=document.querySelector(`[data-modal="${Be}"]`),t=document.querySelector(`[data-modal-backdrop="${Be}"]`);if(!a||!t)return;ga(),Ae(Be),document.querySelector("[data-drawer].is-open")&&(document.body.style.overflow="hidden"),a.remove(),t.remove(),e&&aa?.focus&&aa.focus(),aa=null}function pn(e={}){const{anchorEl:a=null,orderItem:t={}}=e;Ie({restoreFocus:!1}),aa=a;const n={serviceType:"estoque-venda-direta",linkedItems:[],draftQuantity:"",draftLot:"",rows:[{op:"0001",seedDate:"00/00/0000",daysAfterSowing:"30 dias",quantity:"5.000"},{op:"0001",seedDate:"00/00/0000",daysAfterSowing:"30 dias",quantity:"5.000"}],futureDraftLocation:"",futureDraftResponsible:"",futureDraftQuantity:"",futureDraftDate:"",futureRows:[{plannedDate:"00/00/0000",location:"André Santos",responsible:"André Santos",quantity:"5.000"},{plannedDate:"00/00/0000",location:"André Santos",responsible:"André Santos",quantity:"5.000"}]};document.body.insertAdjacentHTML("beforeend",un({orderItem:t,rows:n.rows}));const o=document.querySelector(`[data-modal="${Be}"]`),i=document.querySelector(`[data-modal-backdrop="${Be}"]`);if(!o||!i)return;const s=o.querySelector("#planning-service-type");let d=()=>{};const b=o.querySelector("[data-modal-close]"),y=o.querySelector('[data-planning-action="cancel"]');o.querySelector('[data-planning-action="submit"]');const k=o.querySelector("[data-planning-dynamic-content]"),x=()=>{y&&(y.className=n.serviceType==="remessa-futura"?"btn btn--text-primary btn--sm":"btn btn--outline-dark btn--sm")},L=()=>{const r=o.querySelector("[data-planning-linked-feedback]");if(!r||n.serviceType!=="estoque-venda-direta")return;const D=n.linkedItems.length;r.hidden=D===0,r.textContent=D?`Pedido vinculado: ${D} item(ns) selecionado(s).`:""},E=()=>{k&&(d(),k.innerHTML=rt(n.serviceType,n),d=fe(k)||(()=>{}),L(),x())},g=()=>Ie(),q=r=>{r.target===i&&Ie()},c=r=>{r.key==="Escape"&&(document.querySelector(`[data-modal="${rn}"]`)?.classList.contains("is-visible")||(r.preventDefault(),r.stopPropagation(),Ie()))},P=r=>{const D=r.target.closest("[data-planning-row-action]");if(!D)return;const H=D.dataset.planningRowAction,w=Number(D.dataset.rowIndex);if(H==="delete"&&!Number.isNaN(w)){n.serviceType==="remessa-futura"?n.futureRows=n.futureRows.filter(($,u)=>u!==w):n.rows=n.rows.filter(($,u)=>u!==w),E();return}console.log(`Ação ${H} na linha`,w)},B=r=>{dn({anchorEl:r,selectedIds:n.linkedItems,onBack:()=>{r?.focus&&r.focus()},onSave:D=>{n.linkedItems=Array.isArray(D)?D:[],L()}})},T=()=>{if(n.serviceType==="remessa-futura"){const H=o.querySelector("#planning-future-quantity"),w=o.querySelector("#planning-future-location"),$=o.querySelector("#planning-future-responsible"),u=o.querySelector("#planning-future-date");n.futureDraftQuantity=H?.value||n.futureDraftQuantity,n.futureDraftLocation=w?.value||n.futureDraftLocation,n.futureDraftResponsible=$?.value||n.futureDraftResponsible,n.futureDraftDate=u?.value||n.futureDraftDate,n.futureRows.push({plannedDate:n.futureDraftDate||"00/00/0000",location:n.futureDraftLocation?dt.find(S=>S.value===n.futureDraftLocation)?.label||n.futureDraftLocation:"André Santos",responsible:n.futureDraftResponsible||"André Santos",quantity:n.futureDraftQuantity||"5.000"}),E();return}const r=o.querySelector("#planning-quantity")?.value||"5000",D=o.querySelector("#planning-lot")?.value||"0001";n.draftQuantity=r,n.draftLot=D,n.rows.push({op:D,seedDate:"00/00/0000",daysAfterSowing:"30 dias",quantity:r}),E()},K=()=>{console.log("Consultar agenda (stub)")},F=()=>{st("Planejamento enviado",{message:"Itens enviados para expedição."}),Ie()},p=(r=>{if(!r)return()=>{};const D=$=>{const u=$.target;if(u instanceof HTMLElement){if(u.id==="planning-service-type"){const S=u.value||"estoque-venda-direta";n.serviceType=S,E();return}u.id==="planning-quantity"&&(n.draftQuantity=u.value),u.id==="planning-lot"&&(n.draftLot=u.value),u.id==="planning-future-location"&&(n.futureDraftLocation=u.value),u.id==="planning-future-quantity"&&(n.futureDraftQuantity=u.value),u.id==="planning-future-date"&&(n.futureDraftDate=u.value),u.id==="planning-future-responsible"&&u instanceof HTMLInputElement&&(n.futureDraftResponsible=u.value)}},H=$=>{const u=$.target.closest("[data-planning-action]");if(u){const S=u.dataset.planningAction;if(S==="cancel"){g();return}if(S==="submit"){F();return}if(S==="add-row"){T();return}if(S==="link-order"){B(u);return}if(S==="check-agenda"){K();return}}P($)},w=$=>{const u=$.target;u instanceof HTMLInputElement&&u.id==="planning-future-responsible"&&(n.futureDraftResponsible=u.value)};return r.addEventListener("change",D),r.addEventListener("click",H),r.addEventListener("input",w),()=>{r.removeEventListener("change",D),r.removeEventListener("click",H),r.removeEventListener("input",w)}})(o);b?.addEventListener("click",g),i.addEventListener("click",q),document.addEventListener("keydown",c,!0),E(),s&&(s.value=n.serviceType),x(),ga=()=>{p(),b?.removeEventListener("click",g),i.removeEventListener("click",q),document.removeEventListener("keydown",c,!0),d(),ga=()=>{}},xe(Be),setTimeout(()=>{s?.focus?.()},120)}const Z=Object.freeze({PRODUCAO:"producao",PEDIDOS:"pedidos"}),_e=Object.freeze({KANBAN:"kanban",LIST:"list"}),lt=new Set(["aguardando-aprovacao","agendado","semeio","germinacao","casa-vegetacao","expedicao","finalizado","cancelado"]),ct={columns:[{id:"aguardando-aprovacao",title:"Aguardando Agendamento",color:"green",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data planejada:",value:"14/01/2025"}]},{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data planejada:",value:"14/01/2025"}]}]},{id:"agendado",title:"Agendado",color:"blue",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data planejada:",value:"14/01/2025"}]}]},{id:"semeio",title:"Semeio",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]},{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"germinacao",title:"Germinação",color:"purple",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"aguardando-enxertia",title:"Aguardando Enxertia",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"sala-corte",title:"Sala de Corte",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"sala-fusao",title:"Sala de Fusão",color:"orange",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"adaptacao",title:"Adaptação",color:"yellow",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"casa-vegetacao",title:"Casa de Vegetação",color:"pink",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"expedicao",title:"Expedição",color:"cyan",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"finalizado",title:"Finalizado",color:"green",cards:[{code:"OP-2025-006",badgeLabel:"Enxertia",items:[{icon:"user",label:"Fazenda Sol Nascente"},{icon:"circle",label:"Tomate Cereja",value:"Qtd: 5.000"},{type:"divider"},{icon:"calendar",label:"Data semeio:",value:"14/01/2025"},{icon:"calendar",label:"Dias após semeio:",value:"14"},{icon:"map-pin",label:"Localização:",value:"Estufa 1"}]}]},{id:"cancelado",title:"Cancelado",color:"gray",cards:[]}]};function me(e){const a=e%2===0?"A2W-2025-001":"A2W-2025-002",t=e%2===0?"TG-45678":"TG-45679";return{code:a,subtitle:t,badgeLabel:"Faturado",badgeVariant:"success",badgeStyle:"soft",items:[{icon:"user",label:"João Silva"},{icon:null,label:"Vendedor: Maria Santos"},{type:"divider"},{icon:"calendar",label:"Pedido: 14/01/2025"},{icon:"package",label:"Muda de Eucalipto Clone AEC 144"},{icon:"circle",label:"Qtd: 5.000"},{icon:"calendar",label:"Entrega em: 19/02/2025"},{icon:"circle",label:"R$ 15.500,00",className:"kanban-card__item--price"}]}}const vn={columns:[{id:"recebido",title:"Recebido",color:"green",cards:[me(0),me(1)]},{id:"aguardando-aprovacao",title:"Aguardando Aprovação",color:"gray",cards:[me(0),me(1)]},{id:"em-preparacao",title:"Em Preparação",color:"blue",cards:[me(0),me(1)]},{id:"em-producao",title:"Em Produção",color:"purple",cards:[me(0),me(1)]},{id:"em-expedicao",title:"Em Expedição",color:"cyan",cards:[me(0),me(1)]},{id:"em-transito",title:"Em Trânsito",color:"orange",cards:[me(0),me(1)]},{id:"finalizados",title:"Finalizados",color:"green",cards:[me(0),me(1)]},{id:"cancelado",title:"Cancelado",color:"gray",cards:[]}]},Ka={"A2W-2025-001":{companyName:"Agro Silva LTDA.",client:{codigo:"43242343",cpfCnpj:"123.456.789-00",razaoSocial:"Nome da razao social",nomeFantasia:"Nome fantasia",endereco:"Rua das Flores, 123 - São Paulo, SP",telefone:"(11) 98765-4321",email:"joao.silva@gmail.com",vendedor:"Maria Santos"},items:[{id:"item-1",product:"Muda de Eucalipto MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",availableQuantity:"1000",planning:[{type:"planned",amount:"3.000",date:"12/12/25",responsible:"Fazenda Boa Vista",quantity:"3.000"},{type:"canceled",amount:"1.000",date:"12/12/25",responsible:"Fazenda Boa Vista",quantity:"1.000"}]},{id:"item-2",product:"Muda de Eucalipto MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",availableQuantity:"1000",planning:[]}],summary:{orderDate:"14/01/2025",expectedDelivery:"19/02/2025",totalValue:"R$ 15.500,00",notes:"Cliente solicitou entrega pela manhã"}},"A2W-2025-002":{companyName:"Agro Campo LTDA.",client:{codigo:"992211",cpfCnpj:"987.654.321-00",razaoSocial:"Agro Campo Razão Social",nomeFantasia:"Agro Campo",endereco:"Av. Central, 450 - Campinas, SP",telefone:"(19) 99888-1111",email:"compras@agrocampo.com",vendedor:"Maria Santos"},items:[{id:"item-1",product:"Muda de Eucalipto MUD-001",quantity:"5.000",unitValue:"R$ 2,50",totalValue:"R$ 12.500,00",availableQuantity:"1000",planning:[{type:"planned",amount:"2.000",date:"10/01/26",responsible:"Fazenda Primavera",quantity:"2.000"}]},{id:"item-2",product:"Muda de Eucalipto MUD-002",quantity:"3.000",unitValue:"R$ 3,00",totalValue:"R$ 9.000,00",availableQuantity:"600",planning:[]}],summary:{orderDate:"16/01/2025",expectedDelivery:"21/02/2025",totalValue:"R$ 21.500,00",notes:"Priorizar entrega no período da tarde"}}},gn={"A2W-2025-001":{"item-1":[{id:"evt-1",title:"Lote pronto para entrega - OP-2025-002",date:"08/11/2025 às 14:35",description:"Lote de 5.000 mudas aprovado e liberado para expedição",badgeLabel:"Sucesso",badgeType:"sucesso",metaRole:"Responsável",metaName:"André Cesarni"},{id:"evt-2",title:"Vistoria de qualidade - OP-2025-002",date:"05/11/2025 às 10:15",description:"Vistoria realizada com aprovação. Taxa de germinação: 98%. Data estimada para enxertia atualizada.",badgeLabel:"Operação",badgeType:"operacao",metaRole:"Operador",metaName:"Ana Silva"},{id:"evt-3",title:"Mudança de localização - OP-2025-002",date:"20/10/2025 às 15:45",description:"Lote movido de Estufa 1 - Bancada A2 para Estufa 2 - Bancada C5",badgeLabel:"Movimentação",badgeType:"movimentacao",metaRole:"Responsável",metaName:"Pedro Almeida"},{id:"evt-4",title:"Semeio realizado - OP-2025-002",date:"15/10/2025 às 09:00",description:"Semeio de 5.000 mudas de Eucalipto Clone AEC 144 iniciado na Estufa 1",badgeLabel:"Produção",badgeType:"producao",metaRole:"Responsável",metaName:"André Santos"},{id:"evt-5",title:"Planejamento realizado - OP-2025-002",date:"16/01/2025 às 11:20",description:"Eucalipto Clone AEC 144. Quantidade: 3.000. Data de semeio: 15/10/2025. Previsão de entrega: 19/02/2025",badgeLabel:"Planejamento",badgeType:"planejamento",metaRole:"Responsável",metaName:"André Santos"},{id:"evt-6",title:"Item cancelado",date:"16/01/2025 às 11:20",description:"Eucalipto Clone AEC 144. Quantidade: 3.000",badgeLabel:"Cancelado",badgeType:"cancelado",metaRole:"Responsável",metaName:"André Santos"},{id:"evt-7",title:"Pedido recebido",date:"14/01/2025 às 09:15",description:"Pedido A2W-2025-001 recebido do cliente João Silva",badgeLabel:"Início",badgeType:"inicio",metaRole:"Vendedor",metaName:"Maria Santos"}],"item-2":[{id:"evt-8",title:"Planejamento realizado - OP-2025-003",date:"17/01/2025 às 08:45",description:"Quantidade: 2.000. Previsão de entrega: 22/02/2025",badgeLabel:"Planejamento",badgeType:"planejamento",metaRole:"Responsável",metaName:"André Santos"},{id:"evt-9",title:"Pedido recebido",date:"14/01/2025 às 09:15",description:"Item incluído no pedido A2W-2025-001",badgeLabel:"Início",badgeType:"inicio",metaRole:"Vendedor",metaName:"Maria Santos"}]},"A2W-2025-002":{"item-1":[{id:"evt-10",title:"Lote pronto para entrega - OP-2025-021",date:"09/11/2025 às 13:10",description:"Lote de 5.000 mudas aprovado e liberado para expedição",badgeLabel:"Sucesso",badgeType:"sucesso",metaRole:"Responsável",metaName:"Renata Prado"},{id:"evt-11",title:"Pedido recebido",date:"16/01/2025 às 10:05",description:"Pedido A2W-2025-002 recebido do cliente Agro Campo",badgeLabel:"Início",badgeType:"inicio",metaRole:"Vendedor",metaName:"Maria Santos"}],"item-2":[{id:"evt-12",title:"Item cancelado",date:"18/01/2025 às 15:42",description:"Cancelamento por indisponibilidade de lote",badgeLabel:"Cancelado",badgeType:"cancelado",metaRole:"Responsável",metaName:"Renata Prado"},{id:"evt-13",title:"Pedido recebido",date:"16/01/2025 às 10:05",description:"Item incluído no pedido A2W-2025-002",badgeLabel:"Início",badgeType:"inicio",metaRole:"Vendedor",metaName:"Maria Santos"}]}},Ja={"A2W-2025-001":{products:[{id:"prod-0001",code:"0001",name:"Muda de Tomate",label:"0001 - Muda de Tomate"},{id:"prod-0002",code:"0002",name:"Muda de Eucalipto",label:"0002 - Muda de Eucalipto"}],byProduct:{"prod-0001":{metrics:{total:5e3,planned:5e3,canceled:5e3,pending:0},plans:[{id:"plan-1",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"12/01/2025",deliveryDate:"12/01/2025",sowingDate:"23/12/2023",daysAfterSowing:"32 dias",responsible:"Viktor Dantas"},{id:"plan-2",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"cancelado",planningDate:"11/01/2025",deliveryDate:"11/01/2025",sowingDate:"22/12/2023",daysAfterSowing:"31 dias",responsible:"Viktor Dantas"},{id:"plan-3",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"10/01/2025",deliveryDate:"10/01/2025",sowingDate:"21/12/2023",daysAfterSowing:"30 dias",responsible:"Viktor Dantas"},{id:"plan-4",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"09/01/2025",deliveryDate:"09/01/2025",sowingDate:"20/12/2023",daysAfterSowing:"29 dias",responsible:"Viktor Dantas"},{id:"plan-5",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"cancelado",planningDate:"08/01/2025",deliveryDate:"08/01/2025",sowingDate:"19/12/2023",daysAfterSowing:"28 dias",responsible:"Viktor Dantas"},{id:"plan-6",op:"OP-2025-002",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"07/01/2025",deliveryDate:"07/01/2025",sowingDate:"18/12/2023",daysAfterSowing:"27 dias",responsible:"Viktor Dantas"}]},"prod-0002":{metrics:{total:3e3,planned:2e3,canceled:500,pending:500},plans:[{id:"plan-7",op:"OP-2025-003",stage:"Semeio",product:"Muda de Eucalipto Clone MUD-002",quantity:1e3,status:"ativo",planningDate:"06/01/2025",deliveryDate:"15/02/2025",sowingDate:"17/12/2023",daysAfterSowing:"26 dias",responsible:"Viktor Dantas"},{id:"plan-8",op:"OP-2025-003",stage:"Semeio",product:"Muda de Eucalipto Clone MUD-002",quantity:1e3,status:"cancelado",planningDate:"05/01/2025",deliveryDate:"14/02/2025",sowingDate:"16/12/2023",daysAfterSowing:"25 dias",responsible:"Viktor Dantas"}]}}},"A2W-2025-002":{products:[{id:"prod-0001",code:"0001",name:"Muda de Tomate",label:"0001 - Muda de Tomate"}],byProduct:{"prod-0001":{metrics:{total:5e3,planned:5e3,canceled:5e3,pending:0},plans:[{id:"plan-9",op:"OP-2025-021",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"12/01/2025",deliveryDate:"18/02/2025",sowingDate:"23/12/2023",daysAfterSowing:"32 dias",responsible:"Viktor Dantas"},{id:"plan-10",op:"OP-2025-021",stage:"Semeio",product:"Muda de Eucalipto Clone AEC 144",quantity:500,status:"ativo",planningDate:"11/01/2025",deliveryDate:"17/02/2025",sowingDate:"22/12/2023",daysAfterSowing:"31 dias",responsible:"Viktor Dantas"}]}}}};let oe=Z.PRODUCAO,Ne=ct,qe=_e.KANBAN,Pe={showFinished:!1,showCanceled:!1},na={noGrafting:!1};function mn(){return(window.location.hash||"").replace("#","")==="/estufas/pedidos"?Z.PEDIDOS:Z.PRODUCAO}function ba(e){return e===_e.LIST?_e.LIST:_e.KANBAN}function ut(){return`kanban:view-mode:${oe}`}function bn(){try{const e=sessionStorage.getItem(ut());return ba(e)}catch{return _e.KANBAN}}function fn(e){try{sessionStorage.setItem(ut(),ba(e))}catch{}}function pt(){return"kanban:orders:list-filters"}function _n(){try{const e=sessionStorage.getItem(pt()),a=e?JSON.parse(e):null;return{showFinished:!!a?.showFinished,showCanceled:!!a?.showCanceled}}catch{return{showFinished:!1,showCanceled:!1}}}function Ya(){try{sessionStorage.setItem(pt(),JSON.stringify(Pe))}catch{}}function de(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function hn(){const e=document.getElementById("app-header"),a=document.querySelector(".kanban");oe=mn(),Ne=oe===Z.PEDIDOS?vn:ct,qe=bn(),Pe=_n(),e&&e.classList.add("header--kanban-compact-tabs"),a&&a.classList.toggle("kanban--pedidos",oe===Z.PEDIDOS);let t=()=>{};const n=()=>{t(),vt(),t=qe===_e.KANBAN?An():()=>{}},o=yn({getViewMode:()=>qe,setViewMode:x=>{const L=ba(x),E=L!==qe;qe=L,E&&fn(L),n()}});n();const i=kn(),s=Fo(),d=oe===Z.PEDIDOS?So():()=>{},b=oe===Z.PRODUCAO?zn():()=>{},y=oe===Z.PRODUCAO?Gn():()=>{},k=oe===Z.PRODUCAO?Yn():()=>{};return()=>{e&&e.classList.remove("header--kanban-compact-tabs"),a&&a.classList.remove("kanban--pedidos"),typeof o=="function"&&o(),typeof i=="function"&&i(),typeof t=="function"&&t(),typeof s=="function"&&s(),typeof d=="function"&&d(),typeof b=="function"&&b(),typeof y=="function"&&y(),typeof k=="function"&&k()}}function yn({getViewMode:e=()=>_e.KANBAN,setViewMode:a=()=>{}}={}){const t=document.getElementById("kanban-toolbar-chips"),n=document.getElementById("kanban-title"),o=document.getElementById("kanban-qr-read-btn"),i=document.getElementById("kanban-new-btn"),s=document.getElementById("kanban-toolbar-visibility-filters"),d=document.getElementById("kanban-view-kanban-btn"),b=document.getElementById("kanban-view-list-btn"),y=["Badge","Badge","Badge"];t&&(t.innerHTML=y.map(F=>`
      <span class="kanban-chip">
        ${F}
        <svg class="kanban-chip__close" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
      </span>
    `).join("")),n&&(n.textContent=oe===Z.PEDIDOS?"Gestão de Pedidos":"Gestão da Produção"),i&&(i.textContent=oe===Z.PEDIDOS?"Novo Pedido":"Nova produção"),o&&(o.hidden=oe===Z.PEDIDOS);let k=null,x=null,L=null,E=null,g=null,q=null;if(s)if(oe===Z.PEDIDOS){const F=Xe({id:"kanban-show-finished-toggle",size:"sm",checked:Pe.showFinished}).replace('class="toggle-input"','class="toggle-input" data-list-filter="finished"'),X=Xe({id:"kanban-show-canceled-toggle",size:"sm",checked:Pe.showCanceled}).replace('class="toggle-input"','class="toggle-input" data-list-filter="canceled"');s.innerHTML=`
        <label class="kanban-toolbar__visibility-item">
          <span>Mostrar Finalizados</span>
          ${F}
        </label>
        <label class="kanban-toolbar__visibility-item">
          <span>Mostrar Cancelados</span>
          ${X}
        </label>
      `,L=s.querySelector('input[data-list-filter="finished"]'),E=s.querySelector('input[data-list-filter="canceled"]'),k=p=>{Pe.showFinished=!!p.target?.checked,Ya(),a(e())},x=p=>{Pe.showCanceled=!!p.target?.checked,Ya(),a(e())},L?.addEventListener("change",k),E?.addEventListener("change",x),s.hidden=!1}else{const F=Xe({id:"kanban-no-grafting-toggle",size:"sm",checked:na.noGrafting}).replace('class="toggle-input"','class="toggle-input" data-production-filter="no-grafting"');s.innerHTML=`
        <label class="kanban-toolbar__visibility-item">
          <span>Sem Enxertia</span>
          ${F}
        </label>
      `,q=s.querySelector('input[data-production-filter="no-grafting"]'),g=X=>{na.noGrafting=!!X.target?.checked,a(e())},q?.addEventListener("change",g),s.hidden=!1}const c=()=>{const F=e()===_e.LIST;d?.classList.toggle("is-active",!F),b?.classList.toggle("is-active",F),d?.setAttribute("aria-pressed",String(!F)),b?.setAttribute("aria-pressed",String(F))};c();const P=()=>{a(_e.KANBAN),c()},B=()=>{a(_e.LIST),c()};d?.addEventListener("click",P),b?.addEventListener("click",B);const T=document.getElementById("kanban-back-btn"),K=()=>{window.location.hash=oe===Z.PEDIDOS?"#/estufas/agenda-eventos":"#/producao"};return T&&T.addEventListener("click",K),()=>{T&&T.removeEventListener("click",K),d?.removeEventListener("click",P),b?.removeEventListener("click",B),L?.removeEventListener("change",k),E?.removeEventListener("change",x),q?.removeEventListener("change",g)}}function kn(){const e=document.getElementById("kanban-board");if(!e)return()=>{};let a=!1,t=!1,n=0,o=0,i=null,s=!1;const d=6,b=g=>g instanceof Element?!!g.closest('button, a, input, select, textarea, label, [role="button"]'):!1,y=()=>{!a&&!t||(e.classList.remove("is-dragging"),a=!1,t=!1,i=null)},k=g=>{g.button===0&&(e.classList.contains("kanban-board--list")||b(g.target)||(a=!0,t=!1,n=g.clientX,o=e.scrollLeft,i=g.pointerId))},x=g=>{if(!a||i!==g.pointerId)return;const q=g.clientX-n;!t&&Math.abs(q)>=d&&(t=!0,e.classList.add("is-dragging")),t&&(e.scrollLeft=o-q,g.preventDefault())},L=g=>{!a||i!==g.pointerId||(t&&(s=!0),y())},E=g=>{s&&(s=!1,g.preventDefault(),g.stopPropagation())};return e.addEventListener("pointerdown",k),e.addEventListener("pointermove",x,{passive:!1}),e.addEventListener("pointerup",L),e.addEventListener("pointercancel",L),e.addEventListener("pointerleave",L),e.addEventListener("click",E,!0),()=>{y(),e.removeEventListener("pointerdown",k),e.removeEventListener("pointermove",x),e.removeEventListener("pointerup",L),e.removeEventListener("pointercancel",L),e.removeEventListener("pointerleave",L),e.removeEventListener("click",E,!0)}}function vt(){const e=document.getElementById("kanban-board");if(e){if(e.innerHTML="",e.classList.toggle("kanban-board--list",qe===_e.LIST),qe===_e.LIST){$n(e);return}wn(e)}}function wn(e){if(!e)return;(oe===Z.PRODUCAO&&na.noGrafting?Ne.columns.filter(t=>lt.has(t?.id)):Ne.columns).forEach(t=>{const n=Gt({id:t.id,title:t.title,color:t.color,count:t.cards.length});e.insertAdjacentHTML("beforeend",n),t.cards.length>0?t.cards.forEach((i,s)=>{const d=ft(i,t.id,s),b=Yt(d);Ut(t.id,b)}):Jt(t.id);const o=document.querySelector(`[data-column-id="${t.id}"]`);if(o){const i=o.querySelector(".kanban-column__header"),s=Xt({id:`picker-${t.id}`,selected:t.color});i.style.position="relative",i.insertAdjacentHTML("beforeend",s)}})}function $n(e){const a=oe===Z.PRODUCAO&&na.noGrafting?Ne.columns.filter(o=>lt.has(o?.id)):Ne.columns,n=(oe===Z.PEDIDOS?a.filter(o=>!(!Pe.showFinished&&(o.id==="finalizados"||o.id==="finalizado")||!Pe.showCanceled&&o.id==="cancelado")):a).flatMap(o=>o.cards.map((i,s)=>Sn(o,i,s)));e.innerHTML=`
    <section class="kanban-list-view ${oe===Z.PEDIDOS?"kanban-list-view--orders":"kanban-list-view--production"}" data-kanban-list-view>
      <div class="kanban-list-view__rows">
        ${n.join("")}
      </div>
    </section>
  `}function Sn(e,a,t){const n=ft(a,e.id,t),o=Ln({columnData:e,cardData:n,mode:oe});return oe===Z.PEDIDOS?Cn(e,o):En(e,o)}function gt(e){return{recebido:"light","aguardando-aprovacao":"light","em-preparacao":"info","em-producao":"warning","em-expedicao":"primary","em-transito":"primary",finalizados:"success",finalizado:"success",cancelado:"error"}[e]||"light"}function Cn(e,a){return`
    <article class="kanban-list-row kanban-card" data-column-id="${de(e.id)}" style="--list-item-accent:${de(a.accentColor||"var(--color-primary)")}">
      <span class="kanban-list-row__column-title kanban-column__title" hidden>${de(e.title||"")}</span>
      <div class="kanban-list-row__main">
        <div class="kanban-list-row__cell kanban-list-row__cell--title">
          <a href="#" class="kanban-card__code kanban-list-row__title" style="color:${de(a.accentColor||"var(--color-primary)")}">${de(a.title)}</a>
          <span class="kanban-card__subtitle">${de(a.subtitle)}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--type">
          ${a.type?Le({text:a.type,variant:"success",style:"soft",size:"sm"}):""}
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${l("user",{size:14})}
          <span>${de(a.clientValue||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${l("calendar",{size:14})}
          <span>${de(a.date1||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${l("calendar",{size:14})}
          <span>${de(a.date2||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${l("package",{size:14})}
          <span>${de(a.qty||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta kanban-list-row__meta--value">
          ${l("circle",{size:12})}
          <strong>${de(a.amount||"-")}</strong>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__status-cell">
        ${Le({text:a.status||"-",variant:gt(e.id),style:"soft",size:"sm"})}
        </div>
      </div>
    </article>
  `}function En(e,a){return`
    <article class="kanban-list-row kanban-card" data-column-id="${de(e.id)}" style="--list-item-accent:${de(a.accentColor||"var(--color-primary)")}">
      <span class="kanban-list-row__column-title kanban-column__title" hidden>${de(e.title||"")}</span>
      <div class="kanban-list-row__main">
        <div class="kanban-list-row__cell kanban-list-row__cell--title">
          <a href="#" class="kanban-card__code kanban-list-row__title" style="color:${de(a.accentColor||"var(--color-primary)")}">${de(a.title)}</a>
          <span class="kanban-card__subtitle">${de(a.subtitle)}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--type">
          ${a.type?Le({text:a.type,variant:"light",style:"soft",size:"sm"}):""}
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${l("user",{size:14})}
          <span>${de(a.clientLabel?`${a.clientLabel} ${a.clientValue}`.trim():a.clientValue||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${l("calendar",{size:14})}
          <span>${de(a.date1||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${l("calendar",{size:14})}
          <span>${de(a.date2||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__cell--meta kanban-list-row__meta">
          ${l("package",{size:14})}
          <span>${de(a.qty||"-")}</span>
        </div>
        <div class="kanban-list-row__cell kanban-list-row__status-cell">
        ${Le({text:a.status||"-",variant:gt(e.id),style:"soft",size:"sm"})}
        </div>
      </div>
    </article>
  `}function mt(e){const n=String(e||"").match(/[\d.]+/)?.[0]||"-";return n==="-"?"-":`${n} un`}function Dn(e){return String(e).trim()||"-"}function bt(e=""){const a=String(e||"").trim().toLowerCase();return a?a.startsWith("var(")||a.startsWith("#")||a.startsWith("rgb(")||a.startsWith("rgba(")||a.startsWith("hsl(")||a.startsWith("hsla(")?e:{cyan:"rgb(6 182 212)",green:"rgb(34 197 94)",blue:"rgb(59 130 246)",indigo:"rgb(99 102 241)",slate:"rgb(100 116 139)",purple:"rgb(168 85 247)",yellow:"rgb(234 179 8)",pink:"rgb(236 72 153)",red:"rgb(239 68 68)",orange:"rgb(249 115 22)",gray:"rgb(100 116 139)"}[a]||"var(--color-primary)":"var(--color-primary)"}function Ln({columnData:e,cardData:a,mode:t}){return t===Z.PEDIDOS?qn({columnData:e,cardData:a}):Pn({columnData:e,cardData:a})}function qn({columnData:e,cardData:a}){const t=Array.isArray(a?.items)?a.items:[],n=t.filter(s=>s?.icon==="calendar"),o=t.find(s=>s?.icon==="circle"&&/^Qtd:/i.test(String(s?.label||""))),i=t.find(s=>s?.className?.includes("price"));return{title:a?.code||"-",subtitle:a?.subtitle||"-",type:a?.badgeLabel||"",clientLabel:"Cliente",clientValue:t[0]?.label||"-",date1:n[0]?.value||"-",date2:n[1]?.value||"-",qty:mt(o?.label||o?.value||"-"),amount:Dn(i?.label||i?.value||"-"),status:e?.title||"-",accentColor:bt(e?.color)}}function Pn({columnData:e,cardData:a}){const t=Array.isArray(a?.items)?a.items:[],n=t.filter(d=>d?.icon==="calendar"),o=t[0]||{},i=t.find(d=>d?.icon==="circle"&&d?.label&&!d?.value)||{},s=t.find(d=>d?.icon==="circle"&&d?.value)||{};return{title:a?.code||"-",subtitle:a?.subtitle||i?.label||"-",type:a?.badgeLabel||"",clientLabel:o?.value?(o?.label||"").trim():"",clientValue:o?.value||o?.label||"-",date1:n[0]?.value||"-",date2:n[1]?.value||"-",qty:mt(s?.value||s?.label||"-"),amount:"",status:e?.title||"-",accentColor:bt(e?.color)}}function An(){const e=[];Ne.columns.forEach(t=>{const n=document.querySelector(`[data-column-settings="${t.id}"]`),o=document.getElementById(`picker-${t.id}`);if(!n||!o)return;const i=s=>{s.stopPropagation(),document.querySelectorAll("[data-color-picker]").forEach(d=>{d!==o&&pa(d)}),an(o)};n.addEventListener("click",i),e.push({settingsBtn:n,handleSettingsClick:i}),en(o,s=>{Kt(t.id,s);const d=Ne.columns.find(b=>b?.id===t.id);d&&(d.color=s),qe===_e.LIST&&vt()})});const a=t=>{const n=t.target.closest("[data-color-picker]"),o=t.target.closest("[data-column-settings]");!n&&!o&&document.querySelectorAll("[data-color-picker]").forEach(i=>{pa(i)})};return document.addEventListener("click",a),()=>{e.forEach(({settingsBtn:t,handleSettingsClick:n})=>{t.removeEventListener("click",n)}),document.removeEventListener("click",a)}}function ft(e,a,t){return oe===Z.PEDIDOS?{...e,badgeVariant:e.badgeVariant||"success",badgeStyle:e.badgeStyle||"soft",subtitle:e.subtitle||"",items:e.items||[]}:a==="aguardando-aprovacao"&&t===0?{...e,badgeLabel:"Normal",badgeVariant:"soft-info",subtitle:"",items:[{icon:"file",label:"Cód. do Cliente:",value:"001"},{icon:"user",label:"Fazenda Sol Nascente"},{type:"divider"},{icon:"calendar",label:"Data Abertura OP:",value:"14/01/2025"},{icon:"circle",label:"001 - Produto 1"},{icon:"circle",label:"Qtd:",value:"5.000"},{icon:"calendar",label:"Data Entrada:",value:"19/02/2025"},{icon:"calendar",label:"Previsão Saída:",value:"19/02/2025"}]}:{...e,badgeVariant:e.badgeVariant||"light",subtitle:e.subtitle||"TG-45678",items:xn(a)}}function xn(e){const a=[{icon:"user",label:"Fazenda Sol Nascente"},{type:"divider"},{icon:"calendar",label:"Pedido:",value:"14/01/2025"},{icon:"circle",label:"Tomate Cereja - Lote 123"},{icon:"circle",label:"Qtd:",value:"5.000"},{icon:"calendar",label:"Início:",value:"19/02/2025"}];return e==="semeio"&&(a[2]={icon:"calendar",label:"Data semeio:",value:"14/01/2025"},a[5]={icon:"map-pin",label:"Localização:",value:"Estufa 1"}),e==="germinacao"&&(a[2]={icon:"calendar",label:"Data semeio:",value:"14/01/2025"},a[5]={icon:"calendar",label:"Dias após semeio:",value:"14"},a.push({icon:"map-pin",label:"Localização:",value:"Estufa 1"})),a}function zn(){const e=document.getElementById("kanban-new-btn");if(!e)return()=>{};const a="kanban-new-production-drawer",t=document.querySelector(`[data-drawer="${a}"]`),n=document.querySelector(`[data-drawer-backdrop="${a}"]`);t&&t.remove(),n&&n.remove();const o=ye({id:a,title:"Nova produção",width:540,content:Rn(),footer:jn()});document.body.insertAdjacentHTML("beforeend",o);const i=ke({id:a,root:document}),s=document.querySelector(`[data-drawer="${a}"]`);if(!s||!i)return()=>{};const d=fe(s),b=s.querySelector(".drawer__header"),y=s.querySelector(".new-production-drawer__status-wrap"),k=b?.querySelector("[data-drawer-close]");b&&y&&k&&(y.classList.add("is-in-header"),b.insertBefore(y,k));const x=s.querySelector("#new-production-origin");x&&x.setAttribute("data-drawer-autofocus","");const L="kanban-schedule-modal",E="kanban-reschedule-modal",g="kanban-tags-modal";let q=()=>{},c=null,P=Ke(),B=()=>{},T=null,K=()=>{},F=null;const X=()=>{i.open(e)},p=({restoreFocus:_=!0}={})=>{r({restoreFocus:!1});const C=document.querySelector(`[data-modal="${L}"]`),I=document.querySelector(`[data-modal-backdrop="${L}"]`);!C||!I||(q(),Ae(L),s.classList.contains("is-open")&&(document.body.style.overflow="hidden"),C.remove(),I.remove(),_&&c&&typeof c.focus=="function"&&c.focus(),c=null)},r=({restoreFocus:_=!0}={})=>{const C=document.querySelector(`[data-modal="${E}"]`),I=document.querySelector(`[data-modal-backdrop="${E}"]`);!C||!I||(B(),Ae(E),(s.classList.contains("is-open")||document.querySelector(`[data-modal="${L}"]`))&&(document.body.style.overflow="hidden"),C.remove(),I.remove(),_&&T?.focus&&T.focus(),T=null)},D=({anchorEl:_=null,initialValues:C={}}={})=>{document.querySelector(`[data-modal="${E}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${E}"]`)?.remove();const I={date:C.date||We(P.selectedDate),location:C.location||"",responsible:C.responsible||""};T=_,document.body.insertAdjacentHTML("beforeend",On({modalId:E,values:I}));const M=document.querySelector(`[data-modal="${E}"]`),f=document.querySelector(`[data-modal-backdrop="${E}"]`);if(!M||!f)return;const z=fe(M),A=M.querySelector("#reschedule-date"),N=M.querySelector("#reschedule-location"),ee=M.querySelector("#reschedule-responsible"),G=M.querySelector("[data-reschedule-error]"),R=M.querySelector("[data-modal-close]"),U=M.querySelector('[data-reschedule-action="cancel"]'),j=M.querySelector('[data-reschedule-action="confirm"]'),J=()=>{G&&(G.hidden=!0),[A,N,ee].forEach(ae=>{ae?.closest(".field")?.classList.remove("field--error")})},be=()=>{J();const ae=[];return A?.value||ae.push(A),N?.value?.trim()||ae.push(N),ee?.value?.trim()||ae.push(ee),ae.length?(ae.forEach(Ze=>Ze?.closest(".field")?.classList.add("field--error")),G&&(G.hidden=!1),ae[0]?.focus?.(),!1):!0},pe=()=>r(),ge=ae=>{ae.target===f&&r()},ie=ae=>{ae.key==="Escape"&&(ae.preventDefault(),ae.stopPropagation(),r())},he=()=>{be()&&(console.log("Reagendar confirmado",{data:A?.value||"",localizacao:N?.value?.trim()||"",responsavel:ee?.value?.trim()||""}),r())};R?.addEventListener("click",pe),U?.addEventListener("click",pe),j?.addEventListener("click",he),f.addEventListener("click",ge),document.addEventListener("keydown",ie,!0),[A,N,ee].forEach(ae=>{ae?.addEventListener("input",J)}),B=()=>{R?.removeEventListener("click",pe),U?.removeEventListener("click",pe),j?.removeEventListener("click",he),f.removeEventListener("click",ge),document.removeEventListener("keydown",ie,!0),[A,N,ee].forEach(ae=>{ae?.removeEventListener("input",J)}),typeof z=="function"&&z(),B=()=>{}},xe(E),setTimeout(()=>{A?.focus&&A.focus()},120)},H=(_,C)=>{if(!_||!C)return;const I=_.querySelector("[data-schedule-period]");I&&(I.textContent=C.viewMode==="month"?kt(C.currentDate):wt(C.selectedDate));const M=_.querySelector("[data-schedule-calendar]");M&&(M.classList.toggle("schedule-modal__calendar--month",C.viewMode==="month"),M.classList.toggle("schedule-modal__calendar--week",C.viewMode==="week"),M.innerHTML=St(C)),_.querySelectorAll("[data-schedule-view]").forEach(z=>{z.classList.toggle("is-active",z.dataset.scheduleView===C.viewMode)});const f=_.querySelector("[data-schedule-day-title]");f&&(f.textContent=`Agendamentos para o dia ${C.selectedDate.getDate()}`)},w=()=>{const _=s.querySelector("#new-production-scheduling-date");_&&(_.value=We(P.selectedDate),_.dispatchEvent(new Event("input",{bubbles:!0})))},$=_=>{const C=document.querySelector(`[data-modal="${L}"]`),I=document.querySelector(`[data-modal-backdrop="${L}"]`);C&&C.remove(),I&&I.remove(),P=Ke(),c=_||null,document.body.insertAdjacentHTML("beforeend",Ct({modalId:L,state:P}));const M=document.querySelector(`[data-modal="${L}"]`),f=document.querySelector(`[data-modal-backdrop="${L}"]`);if(!M||!f)return;const z=M.querySelector("#schedule-location-select"),A=M.querySelector("[data-modal-close]"),N=()=>p(),ee=U=>{U.target===f&&p()},G=U=>{U.key==="Escape"&&(document.querySelector(`[data-modal="${E}"]`)||(U.preventDefault(),U.stopPropagation(),p()))},R=U=>{const j=U.target.closest("[data-schedule-action]");if(j){const ie=j.dataset.scheduleAction;if(ie==="back"){p();return}if(ie==="select-date"){w(),p();return}}const J=U.target.closest("[data-schedule-view]");if(J){P.viewMode=J.dataset.scheduleView==="month"?"month":"week",P.viewMode==="month"&&(P.currentDate=De(P.selectedDate)),H(M,P);return}const be=U.target.closest("[data-schedule-nav]");if(be){const ie=be.dataset.scheduleNav==="prev"?-1:1;P.viewMode==="month"?P.currentDate=yt(P.currentDate,ie):(P.selectedDate=He(P.selectedDate,ie*7),P.currentDate=De(P.selectedDate)),H(M,P);return}const pe=U.target.closest("[data-schedule-date]");if(pe){const ie=_t(pe.dataset.scheduleDate);if(!ie)return;P.selectedDate=ie,P.currentDate=De(ie),H(M,P);return}const ge=U.target.closest("[data-schedule-reagendar]");ge&&D({anchorEl:ge,initialValues:{date:We(P.selectedDate),location:z?.value||"",responsible:""}})};f.addEventListener("click",ee),M.addEventListener("click",R),A&&A.addEventListener("click",N),document.addEventListener("keydown",G,!0),q=()=>{f.removeEventListener("click",ee),M.removeEventListener("click",R),A&&A.removeEventListener("click",N),document.removeEventListener("keydown",G,!0),q=()=>{}},xe(L),H(M,P),z&&typeof z.focus=="function"&&setTimeout(()=>z.focus(),140)},u=({restoreFocus:_=!0}={})=>{const C=document.querySelector(`[data-modal="${g}"]`),I=document.querySelector(`[data-modal-backdrop="${g}"]`);!C||!I||(K(),Ae(g),s.classList.contains("is-open")&&(document.body.style.overflow="hidden"),C.remove(),I.remove(),_&&F?.focus&&F.focus(),F=null)},S=_=>{document.querySelector(`[data-modal="${g}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${g}"]`)?.remove(),F=_||null,document.body.insertAdjacentHTML("beforeend",Vn({modalId:g}));const C=document.querySelector(`[data-modal="${g}"]`),I=document.querySelector(`[data-modal-backdrop="${g}"]`);if(!C||!I)return;const M=C.querySelector("[data-new-production-tags-search]"),f=C.querySelector("[data-modal-close]"),z=()=>u(),A=G=>{G.target===I&&u()},N=G=>{G.key==="Escape"&&(G.preventDefault(),G.stopPropagation(),u())},ee=G=>{const R=G.target.closest("[data-new-production-tags-action]");if(!R)return;const U=R.dataset.newProductionTagsAction;if(U==="cancel"||U==="save"){u();return}U==="remove"&&R.closest(".new-production-tags-modal__chip")?.remove()};I.addEventListener("click",A),C.addEventListener("click",ee),f?.addEventListener("click",z),document.addEventListener("keydown",N,!0),K=()=>{I.removeEventListener("click",A),C.removeEventListener("click",ee),f?.removeEventListener("click",z),document.removeEventListener("keydown",N,!0),K=()=>{}},xe(g),M?.focus&&setTimeout(()=>M.focus(),120)},Q=_=>{const C=_.target.closest("[data-new-production-action]");if(!C)return;const I=C.dataset.newProductionAction;if(I==="cancel"){u({restoreFocus:!1}),i.close();return}if(I==="consult-agenda"){$(C);return}if(I==="open-tags"){S(C);return}const M=s.querySelector("[data-new-production-form]");if(M){if(I==="clear"){Hn(M);return}if(I==="save"){console.log("Salvar nova produção",Xa(M));return}if(I==="create-op"){if(!Qn(M))return;console.log("Criar OP",Xa(M))}}};return e.addEventListener("click",X),s.addEventListener("click",Q),()=>{p({restoreFocus:!1}),u({restoreFocus:!1}),e.removeEventListener("click",X),s.removeEventListener("click",Q),typeof d=="function"&&d(),i.cleanup&&i.cleanup();const _=document.querySelector(`[data-drawer="${a}"]`),C=document.querySelector(`[data-drawer-backdrop="${a}"]`);_&&_.remove(),C&&C.remove()}}function Ke(){const e=new Date(2026,0,14);return{selectedDate:e,currentDate:e,viewMode:"week"}}function De(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function We(e){const a=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${t}-${n}`}function _t(e){if(!e||typeof e!="string")return null;const[a,t,n]=e.split("-").map(Number);return[a,t,n].some(Number.isNaN)?null:new Date(a,t-1,n)}function Mn(e,a){return!e||!a?!1:e.getFullYear()===a.getFullYear()&&e.getMonth()===a.getMonth()&&e.getDate()===a.getDate()}function ht(e){const a=De(e);return a.setDate(a.getDate()-a.getDay()),a}function He(e,a){const t=De(e);return t.setDate(t.getDate()+a),t}function yt(e,a){const t=De(e);return t.setMonth(t.getMonth()+a),t}function kt(e){return`${["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][e.getMonth()]} ${e.getFullYear()}`}function wt(e){const a=ht(e),t=He(a,6),n=kt(t).replace(` ${t.getFullYear()}`,"");return`${String(a.getDate()).padStart(2,"0")} - ${String(t.getDate()).padStart(2,"0")} de ${n} ${t.getFullYear()}`}function In(e){return e.getFullYear()!==2026||e.getMonth()!==0?"":new Set([12,13,14,15,16]).has(e.getDate())?"15.000":""}function $t({date:e,selectedDate:a,currentMonth:t=null}){const n=We(e),o=Mn(e,a),i=t!==null&&e.getMonth()!==t,s=In(e);return`
    <button type="button" class="schedule-modal__day${o?" is-selected":""}${i?" is-outside-month":""}" data-schedule-date="${n}">
      <span class="schedule-modal__day-number">${e.getDate()}</span>
      <span class="schedule-modal__day-qty">${s}</span>
    </button>
  `}function Tn(e){const a=ht(e.selectedDate);return`
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--week">${Array.from({length:7},(n,o)=>$t({date:He(a,o),selectedDate:e.selectedDate})).join("")}</div>
  `}function Bn(e){const a=new Date(e.currentDate.getFullYear(),e.currentDate.getMonth(),1),t=He(a,-a.getDay());return`
    <div class="schedule-modal__weekdays">
      <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
    </div>
    <div class="schedule-modal__days schedule-modal__days--month">${Array.from({length:42},(o,i)=>$t({date:He(t,i),selectedDate:e.selectedDate,currentMonth:a.getMonth()})).join("")}</div>
  `}function St(e){const a=e.viewMode==="month"?"schedule-modal__calendar-grid--month":"schedule-modal__calendar-grid--week",t=e.viewMode==="month"?Bn(e):Tn(e);return`<div class="schedule-modal__calendar-grid ${a}">${t}</div>`}function Ct(e={}){const{modalId:a="kanban-schedule-modal",state:t=Ke()}=e;return Fe({id:a,title:"Agendamento",size:"xl",className:"schedule-modal",body:Nn(t),footer:Fn()})}function Nn(e){return`
    <div class="schedule-modal__content">
      ${se({id:"schedule-location-select",label:"Selecionar localização",required:!0,placeholder:"Selecionar...",items:[{label:"Estufa 1",value:"estufa-1"},{label:"Estufa 2",value:"estufa-2"}]})}

      <div class="schedule-modal__period-row">
        <span class="schedule-modal__period-text" data-schedule-period>${wt(e.selectedDate)}</span>
        <div class="schedule-modal__period-nav">
          <button type="button" class="schedule-modal__icon-btn" data-schedule-nav="prev" aria-label="Periodo anterior">${l("chevron-left",{size:14})}</button>
          <button type="button" class="schedule-modal__icon-btn" data-schedule-nav="next" aria-label="Proximo periodo">${l("chevron-right",{size:14})}</button>
        </div>
      </div>

      <div class="schedule-modal__view-toggle">
        <button type="button" class="schedule-modal__view-btn ${e.viewMode==="month"?"is-active":""}" data-schedule-view="month">Mês</button>
        <button type="button" class="schedule-modal__view-btn ${e.viewMode==="week"?"is-active":""}" data-schedule-view="week">Semana</button>
      </div>

      <div class="schedule-modal__calendar schedule-modal__calendar--week" data-schedule-calendar>
        ${St(e)}
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
  `}function Fn(){return`
    <div class="schedule-modal__footer">
      ${h({text:"Voltar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-schedule-action="back"')}
      ${h({text:"Selecionar data",variant:"primary",size:"sm"}).replace("<button",'<button data-schedule-action="select-date"')}
    </div>
  `}function On(e={}){const{modalId:a="kanban-reschedule-modal",values:t={}}=e,n=v({id:"reschedule-date",type:"date",label:"Data",required:!0,value:t.date||"",className:"reschedule-modal__date-field"}),o=v({id:"reschedule-location",label:"Localização",required:!0,placeholder:"Nome da localização",value:t.location||""}),i=v({id:"reschedule-responsible",label:"Responsável",required:!0,placeholder:"Nome do responsável",value:t.responsible||""}),s=h({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-reschedule-action="cancel"'),d=h({text:"Confirmar",variant:"primary",size:"sm"}).replace("<button",'<button data-reschedule-action="confirm"');return Fe({id:a,title:"Agendamento",size:"sm",className:"reschedule-modal",body:`
      <div class="reschedule-modal__content">
        ${n}
        ${o}
        ${i}
        <span class="reschedule-modal__error" data-reschedule-error hidden>Preencha todos os campos obrigatórios.</span>
      </div>
    `,footer:`
      <div class="reschedule-modal__footer">
        ${s}
        ${d}
      </div>
    `})}function Rn(){return`
    <section class="new-production-drawer">
      <div class="new-production-drawer__status-wrap">
        <span class="new-production-drawer__status">Aguardando Aprovação</span>
      </div>

      <div class="new-production-drawer__scroll">
        <form class="new-production-form" data-new-production-form novalidate>
          <section class="new-production-section">
            <h3 class="new-production-section__title">${l("file",{size:14})}Informações da Produção</h3>
            <div class="new-production-card">
              ${se({id:"new-production-origin",label:"Origem",required:!0,value:"producao-propria",items:[{label:"Produção própria",value:"producao-propria"}]})}

              <div class="new-production-grid new-production-grid--two">
                ${v({id:"new-production-erp",label:"Código ERP",required:!0,placeholder:"Código ERP"})}
                ${v({id:"new-production-cpf-cnpj",label:"CPF/CNPJ",required:!0,placeholder:"Produção própria"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${v({id:"new-production-business-name",label:"Razão Social/Nome",required:!0,placeholder:"Classe"})}
                ${v({id:"new-production-fantasy-name",label:"Nome Fantasia/Apelido",required:!0,placeholder:"EX: MUD-1"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${v({id:"new-production-responsible",label:"Responsável",required:!0,placeholder:"Digite nome da classe"})}
                ${v({id:"new-production-class",label:"Classe",required:!0,placeholder:"EX: MUD-1"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${v({id:"new-production-product-code",label:"Cód. do Produto",required:!0,placeholder:"EX: MUD-1"})}
                ${v({id:"new-production-product",label:"Produto",required:!0,placeholder:"Nome do produto"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${v({id:"new-production-quantity",label:"Quantidade",required:!0,placeholder:"Nome do responsável"})}
                ${v({id:"new-production-location",label:"Localização",required:!0,placeholder:"Digite a localização"})}
              </div>

              <div class="new-production-grid new-production-grid--two">
                ${v({id:"new-production-scheduling-date",type:"date",label:"Data de Agendamento Semeio",required:!0,className:"new-production-date-field",iconRight:l("calendar",{size:16})})}
                <div class="new-production-agenda-btn-wrap">
                  ${h({text:"+ Consultar agenda",variant:"outline-dark"}).replace("<button",'<button data-new-production-action="consult-agenda"')}
                </div>
              </div>

              <div class="new-production-type">
                <div class="new-production-chip-row">
                  ${Ee({label:"Enxertia",value:"enxertia",selected:!0,size:"sm"})}
                </div>
              </div>

              ${v({id:"new-production-notes",type:"textarea",label:"Observações",required:!0,rows:2})}

              <div class="new-production-tags">
                <span class="new-production-field-label">Etiqueta</span>
                <div class="new-production-chip-row new-production-chip-row--tags">
                  ${Ee({label:"Normal",value:"normal",size:"sm",className:"new-production-chip--normal"})}
                  ${Ee({label:"Prioritário",value:"prioritario",size:"sm",className:"new-production-chip--prioritario"})}
                  ${Ee({label:"Urgente",value:"urgente",size:"sm",className:"new-production-chip--urgente"})}
                  ${Ee({label:"+ Adicionar etiqueta",value:"add-tag",size:"sm"}).replace("<button",'<button data-new-production-action="open-tags"')}
                </div>
              </div>

              <div class="new-production-actions">
                <button type="button" class="new-production-clear-link" data-new-production-action="clear">Limpar campos</button>
                ${h({text:"Salvar",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-action="save"')}
              </div>
            </div>
          </section>

          <section class="new-production-section">
            <h3 class="new-production-section__title">${l("settings",{size:14})}Informações para Semeio</h3>

            <div class="new-production-subsection">
              <h4 class="new-production-subsection__title">Enxerto</h4>
              ${Za()}
            </div>

            <div class="new-production-subsection">
              <h4 class="new-production-subsection__title">Porta-enxerto</h4>
              ${Za()}
            </div>
          </section>
        </form>
      </div>
    </section>
  `}function Vn(e={}){const{modalId:a="kanban-tags-modal"}=e,t=h({text:"Cancelar",style:"text",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-tags-action="cancel"'),n=h({text:"Salvar",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-tags-action="save"');return Fe({id:a,title:"Etiquetas",size:"sm",className:"new-production-tags-modal",body:`
      <div class="new-production-tags-modal__content">
        <div class="new-production-tags-modal__search">
          <input type="text" class="new-production-tags-modal__input" placeholder="Buscar etiquetas" data-new-production-tags-search />
          <span class="new-production-tags-modal__search-icon" aria-hidden="true">${l("search",{size:14})}</span>
        </div>
        <div class="new-production-tags-modal__create">
          <input type="text" class="new-production-tags-modal__input" placeholder="Nova etiqueta" />
          <button type="button" class="new-production-tags-modal__add-btn">Adicionar ${l("arrow-right",{size:14})}</button>
        </div>
        <div class="new-production-tags-modal__group">
          <div class="new-production-tags-modal__group-title">
            <span class="new-production-tags-modal__group-icon" aria-hidden="true">${l("filter",{size:14})}</span>
            <span>Etiquetas</span>
          </div>
          <div class="new-production-tags-modal__chips">
            <div class="new-production-tags-modal__chip">
              <span class="new-production-tags-modal__dot new-production-tags-modal__dot--blue" aria-hidden="true"></span>
              <span>Em trajeto</span>
              <button type="button" class="new-production-tags-modal__chip-remove" data-new-production-tags-action="remove" aria-label="Remover etiqueta">${l("close",{size:12})}</button>
            </div>
            <div class="new-production-tags-modal__chip">
              <span class="new-production-tags-modal__dot new-production-tags-modal__dot--green" aria-hidden="true"></span>
              <span>Faturado</span>
              <button type="button" class="new-production-tags-modal__chip-remove" data-new-production-tags-action="remove" aria-label="Remover etiqueta">${l("close",{size:12})}</button>
            </div>
          </div>
        </div>
      </div>
    `,footer:`
      <div class="new-production-tags-modal__footer">
        ${t}
        ${n}
      </div>
    `})}function Za(){return`
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
  `}function jn(){return`
    <div class="new-production-footer">
      ${h({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-new-production-action="cancel"')}
      ${h({text:"Criar OP",variant:"primary",size:"sm"}).replace("<button",'<button data-new-production-action="create-op"')}
    </div>
  `}function Hn(e){if(!e)return;e.querySelectorAll("input, select, textarea").forEach(t=>{if(t.tagName.toLowerCase()==="select"){t.selectedIndex=0;return}if(t.type==="date"){t.value="";return}t.value=""})}function Xa(e){const a={};return e&&new FormData(e).forEach((n,o)=>{a[o]=n}),a}function Qn(e){if(!e)return!1;const a=e.querySelectorAll("[required]");let t=null;return a.forEach(n=>{(n.value||"").trim()||t||(t=n)}),t?(typeof t.focus=="function"&&t.focus(),!1):!0}function Gn(){const e=document.getElementById("kanban-board");if(!e)return()=>{};const a="kanban-scheduling-drawer",t=document.querySelector(`[data-drawer="${a}"]`),n=document.querySelector(`[data-drawer-backdrop="${a}"]`);t&&t.remove(),n&&n.remove();const o=ye({id:a,title:"OP-2025-006",width:540,content:Un(),footer:Jn()});document.body.insertAdjacentHTML("beforeend",o);const i=ke({id:a,root:document}),s=document.querySelector(`[data-drawer="${a}"]`);if(!s||!i)return()=>{};const d=fe(s),b=s.querySelector("#scheduling-tabs")?.closest("[data-tabs]"),y=b?.querySelector('.tabs-tab[data-tab="0"]');y&&y.setAttribute("data-drawer-autofocus","");const k=E=>{const g=E.target.closest(".kanban-card");if(!g||!e.contains(g))return;const q=g.closest("[data-column-id]");if(!q||q.dataset.columnId!=="aguardando-aprovacao")return;E.target.closest(".kanban-card__code")&&E.preventDefault(),i.open(g)},x=E=>{if(!b)return;const g=E.target.closest(".tabs-tab");if(!g||!b.contains(g))return;const q=Number(g.dataset.tab);if(Number.isNaN(q))return;const c=b.querySelectorAll(".tabs-tab"),P=b.parentElement?.querySelectorAll(".tabs-panel");c.forEach((B,T)=>{B.classList.toggle("is-active",T===q),B.setAttribute("aria-selected",String(T===q))}),P&&P.forEach((B,T)=>{B.classList.toggle("is-active",T===q)})},L=E=>{const g=E.target.closest("[data-scheduling-action]");if(!g)return;const q=g.dataset.schedulingAction;if(q==="cancel"){i.close();return}if(q==="consult-agenda"){console.log("Consultar agenda");return}if(q!=="schedule")return;const c=s.querySelector("#scheduling-date-input"),P=s.querySelector("#scheduling-responsible-input");console.log({dataAgendamentoSemeio:c?.value||"",responsavelColetaSemente:P?.value||""})};return e.addEventListener("click",k),b&&b.addEventListener("click",x),s.addEventListener("click",L),()=>{e.removeEventListener("click",k),b&&b.removeEventListener("click",x),s.removeEventListener("click",L),typeof d=="function"&&d(),i.cleanup&&i.cleanup();const E=document.querySelector(`[data-drawer="${a}"]`),g=document.querySelector(`[data-drawer-backdrop="${a}"]`);E&&E.remove(),g&&g.remove()}}function Un(){return`
    <section class="scheduling-drawer">
      <div class="scheduling-drawer__summary">
        <p class="scheduling-drawer__subtitle">Fazenda Sol Nascente <span aria-hidden="true">•</span> Muda de Eucalipto Clone AEC 144</p>
        <span class="scheduling-drawer__status">Aguardando Agendamento</span>
      </div>
      ${oa({id:"scheduling-tabs",variant:"underlined",fullWidth:!0,activeTab:0,tabs:[{label:"Detalhes e Planejamento",content:Wn()},{label:"Histórico",content:Kn()}]})}
    </section>
  `}function Wn(){const e=l("calendar",{size:16});return`
    <div class="scheduling-panel">
      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${l("file",{size:14})}Informações Gerais</h3>
        <div class="scheduling-info-card">
          <div class="scheduling-grid scheduling-grid--two">
            ${$e("Código ERP","43242343")}
            ${$e("CPF/CNPJ","123.456.789-00")}
            ${$e("Razão Social/Nome","Nome da razao social")}
            ${$e("Nome Fantasia/Apelido","Nome fantasia")}
            ${$e("Classe","Muda de Eucalipto Clone AEC 144")}
            ${$e("Código do Produto","43423432")}
            ${$e("Produto","Muda de Eucalipto Clone AEC 144")}
            ${$e("Quantidade","5.000")}
          </div>
        </div>
      </section>

      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${l("settings",{size:14})}Informações para Semeio</h3>
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
          ${h({text:"Gerar QR Code",variant:"outline-dark"})}
        </div>
      </section>

      <section class="scheduling-section">
        <h3 class="scheduling-section__title">${l("calendar",{size:14})}Planejamento e Datas</h3>
        <div class="scheduling-info-card">
          <div class="scheduling-grid scheduling-grid--two">
            ${$e("Data do Pedido","15/01/2025")}
            ${$e("Data Planejada do Pedido","15/01/2025")}
          </div>
          <div class="scheduling-grid scheduling-grid--two scheduling-grid--inputs">
            ${v({id:"scheduling-date-input",type:"date",label:"Data de agendamento de Semeio",value:"2026-04-15",iconRight:e,className:"scheduling-date-field"})}
            ${v({id:"scheduling-responsible-input",label:"Responsável coleta da semente",value:"João da Silva"})}
          </div>
          <button type="button" class="scheduling-link" data-scheduling-action="consult-agenda">Consultar agenda</button>
        </div>
      </section>
    </div>
  `}function Kn(){return`
    <div class="scheduling-history">
      Sem histórico no momento
    </div>
  `}function $e(e,a){return`
    <div class="scheduling-field">
      <span class="scheduling-field__label">${e}</span>
      <span class="scheduling-field__value">${a}</span>
    </div>
  `}function Jn(){return`
    <div class="scheduling-footer">
      ${h({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-scheduling-action="cancel"')}
      ${h({text:"Agendar",variant:"primary",size:"sm"}).replace("<button",'<button data-scheduling-action="schedule"')}
    </div>
  `}function ze(e,a){if(!e||Number.isNaN(a))return;const t=e.querySelectorAll(".tabs-tab"),n=e.parentElement?.querySelector(".tabs-content"),o=n?Array.from(n.children).filter(i=>i.classList.contains("tabs-panel")):null;t.forEach((i,s)=>{i.classList.toggle("is-active",s===a),i.setAttribute("aria-selected",String(s===a))}),o?.forEach((i,s)=>{i.classList.toggle("is-active",s===a)})}function Oe(){return`
    <div class="agendado-drawer__summary">
      <div class="agendado-drawer__summary-top">
        <div class="agendado-drawer__summary-left">
          <span class="agendado-meta">Cód. Pedido: <strong>001</strong></span>
          <span class="agendado-meta">Cód. Cliente: <strong>22332</strong></span>
          <span class="agendado-meta"><strong>Fazenda Sol Nascente</strong></span>
        </div>
        <div class="agendado-drawer__summary-right">
          ${Ee({label:"Normal",value:"normal",size:"sm",className:"agendado-chip--normal"})}
          ${Ee({label:"Agendado",value:"agendado",size:"sm"})}
        </div>
      </div>
      <div class="agendado-drawer__summary-bottom">
        <div class="agendado-drawer__summary-left">
          <span class="agendado-meta">Cód. Produto: <strong>001</strong></span>
          <span class="agendado-meta"><strong>Muda de Eucalipto Clone AEC 144</strong></span>
          <span class="agendado-meta">Qtd.: <strong>3.000</strong></span>
        </div>
        <div class="agendado-drawer__summary-right">
          ${Ee({label:"Enxertia",value:"enxertia",size:"sm"})}
        </div>
      </div>
    </div>
  `}function Re({id:e,firstTabLabel:a,firstTabContent:t}){return oa({id:e,variant:"underlined",fullWidth:!0,activeTab:0,tabs:[{label:a,content:t},{label:"Detalhes",content:vo()},{label:"Ciclo",content:_o()}]})}function Yn(){const e=document.getElementById("kanban-board");if(!e)return()=>{};const a="kanban-agendado-drawer",t="kanban-germinacao-drawer",n="kanban-casa-vegetacao-drawer",o="kanban-aguardando-enxertia-drawer",i="kanban-sala-corte-drawer",s="kanban-adaptacao-drawer",d="kanban-sala-fusao-drawer";document.querySelector(`[data-drawer="${a}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${a}"]`)?.remove(),document.querySelector(`[data-drawer="${t}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${t}"]`)?.remove(),document.querySelector(`[data-drawer="${n}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${n}"]`)?.remove(),document.querySelector(`[data-drawer="${o}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${o}"]`)?.remove(),document.querySelector(`[data-drawer="${i}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${i}"]`)?.remove(),document.querySelector(`[data-drawer="${s}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${s}"]`)?.remove(),document.querySelector(`[data-drawer="${d}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${d}"]`)?.remove();const b=ye({id:a,title:"OP-2025-006",width:540,content:Zn(),footer:$o()});document.body.insertAdjacentHTML("beforeend",b);const y=ye({id:t,title:"OP-2025-006",width:540,content:Xn(),footer:""});document.body.insertAdjacentHTML("beforeend",y);const k=ye({id:n,title:"OP-2025-006",width:540,content:eo(),footer:""});document.body.insertAdjacentHTML("beforeend",k);const x=ye({id:o,title:"OP-2025-006",width:540,content:ao(),footer:""});document.body.insertAdjacentHTML("beforeend",x);const L=ye({id:i,title:"OP-2025-006",width:540,content:to(),footer:""});document.body.insertAdjacentHTML("beforeend",L);const E=ye({id:s,title:"OP-2025-006",width:540,content:oo(),footer:""});document.body.insertAdjacentHTML("beforeend",E);const g=ye({id:d,title:"OP-2025-006",width:540,content:no(),footer:""});document.body.insertAdjacentHTML("beforeend",g);const q=ke({id:a,root:document}),c=document.querySelector(`[data-drawer="${a}"]`);if(!c||!q)return()=>{};const P=ke({id:t,root:document}),B=document.querySelector(`[data-drawer="${t}"]`);if(!B||!P)return()=>{};const T=ke({id:n,root:document}),K=document.querySelector(`[data-drawer="${n}"]`);if(!K||!T)return()=>{};const F=ke({id:o,root:document}),X=document.querySelector(`[data-drawer="${o}"]`);if(!X||!F)return()=>{};const p=ke({id:i,root:document}),r=document.querySelector(`[data-drawer="${i}"]`);if(!r||!p)return()=>{};const D=ke({id:s,root:document}),H=document.querySelector(`[data-drawer="${s}"]`);if(!H||!D)return()=>{};const w=ke({id:d,root:document}),$=document.querySelector(`[data-drawer="${d}"]`);if(!$||!w)return()=>{};const u=fe(c),S=fe(B),Q=fe(K),_=fe(X),C=fe(r),I=fe(H),M=fe($);let f=null,z=null,A=null,N=null,ee=!1;jt(c);const G="kanban-schedule-modal-agendado";let R=()=>{},U=null,j=Ke();const J=c.querySelector("#agendado-tabs")?.closest("[data-tabs]"),be=B.querySelector("#germinacao-tabs")?.closest("[data-tabs]"),pe=K.querySelector("#casa-vegetacao-tabs")?.closest("[data-tabs]"),ge=X.querySelector("#aguardando-enxertia-tabs")?.closest("[data-tabs]"),ie=r.querySelector("#sala-corte-tabs")?.closest("[data-tabs]"),he=H.querySelector("#adaptacao-tabs")?.closest("[data-tabs]"),ae=$.querySelector("#sala-fusao-tabs")?.closest("[data-tabs]"),Ze=J?.querySelector('.tabs-tab[data-tab="0"]');Ze&&Ze.setAttribute("data-drawer-autofocus","");const ha=be?.querySelector('.tabs-tab[data-tab="0"]');ha&&ha.setAttribute("data-drawer-autofocus","");const ya=pe?.querySelector('.tabs-tab[data-tab="0"]');ya&&ya.setAttribute("data-drawer-autofocus","");const ka=ge?.querySelector('.tabs-tab[data-tab="0"]');ka&&ka.setAttribute("data-drawer-autofocus","");const wa=ie?.querySelector('.tabs-tab[data-tab="0"]');wa&&wa.setAttribute("data-drawer-autofocus","");const $a=he?.querySelector('.tabs-tab[data-tab="0"]');$a&&$a.setAttribute("data-drawer-autofocus","");const Sa=ae?.querySelector('.tabs-tab[data-tab="0"]');Sa&&Sa.setAttribute("data-drawer-autofocus","");const Ca=V=>{const m=V.target.closest(".kanban-card");if(!m||!e.contains(m))return;V.target.closest(".kanban-card__code")&&V.preventDefault();const te=m.closest("[data-column-id]")?.dataset.columnId;if(te){if(te==="agendado"){q.open(m);return}if(te==="germinacao"){P.open(m);return}if(te==="casa-vegetacao"){T.open(m);return}if(te==="aguardando-enxertia"){F.open(m);return}if(te==="sala-corte"){p.open(m);return}if(te==="adaptacao"){D.open(m);return}if(te==="sala-fusao"){w.open(m);return}te==="semeio"&&da(m)}},Ea=V=>{if(!J)return;const m=V.target.closest(".tabs-tab");if(!m||!J.contains(m))return;const O=Number(m.dataset.tab);ze(J,O)},Da=V=>{if(!be)return;const m=V.target.closest(".tabs-tab");if(!m||!be.contains(m))return;const O=Number(m.dataset.tab);ze(be,O)},La=V=>{if(!pe)return;const m=V.target.closest(".tabs-tab");if(!m||!pe.contains(m))return;const O=Number(m.dataset.tab);ze(pe,O)},qa=V=>{if(!ge)return;const m=V.target.closest(".tabs-tab");if(!m||!ge.contains(m))return;const O=Number(m.dataset.tab);ze(ge,O)},Pa=V=>{if(!ie)return;const m=V.target.closest(".tabs-tab");if(!m||!ie.contains(m))return;const O=Number(m.dataset.tab);ze(ie,O)},Aa=V=>{if(!he)return;const m=V.target.closest(".tabs-tab");if(!m||!he.contains(m))return;const O=Number(m.dataset.tab);ze(he,O)},xa=V=>{if(!ae)return;const m=V.target.closest(".tabs-tab");if(!m||!ae.contains(m))return;const O=Number(m.dataset.tab);ze(ae,O)},za=(V,m,{onOpenSemeioDrawer:O}={})=>{const ve=V.target.closest("[data-agendado-details-tab]");if(ve){const ue=m.querySelector("[data-agendado-details]"),Y=ve.dataset.agendadoDetailsTab;return!ue||!Y||(ue.querySelectorAll("[data-agendado-details-tab]").forEach(le=>{const ce=le===ve;le.classList.toggle("is-active",ce),le.setAttribute("aria-selected",String(ce))}),ue.querySelectorAll("[data-agendado-details-panel]").forEach(le=>{le.classList.toggle("is-active",le.dataset.agendadoDetailsPanel===Y)})),!0}const te=V.target.closest("[data-agendado-details-toggle]");if(te){if(te.dataset.agendadoOpenGerminacao==="true")return O?.(te),!0;const ue=te.closest("[data-agendado-details-accordion]");if(!ue)return!0;const Y=ue.classList.toggle("is-collapsed");return te.setAttribute("aria-expanded",String(!Y)),!0}const we=V.target.closest("[data-agendado-cycle-tab]");if(we){const ue=m.querySelector("[data-agendado-cycle]"),Y=we.dataset.agendadoCycleTab;return!ue||!Y||(ue.querySelectorAll("[data-agendado-cycle-tab]").forEach(le=>{const ce=le===we;le.classList.toggle("is-active",ce),le.setAttribute("aria-selected",String(ce))}),ue.querySelectorAll("[data-agendado-cycle-panel]").forEach(le=>{le.classList.toggle("is-active",le.dataset.agendadoCyclePanel===Y)})),!0}return!1},da=async V=>{try{f||(f=Ga(()=>import("./enviar-germinacao-drawer-BdxPZ2ZC.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24])));const m=await f;if(!z&&typeof m.createEnviarGerminacaoDrawer=="function"&&(z=m.createEnviarGerminacaoDrawer()),!z?.open)return;q.close({restoreFocus:!1}),P.close({restoreFocus:!1}),T.close({restoreFocus:!1}),F.close({restoreFocus:!1}),p.close({restoreFocus:!1}),D.close({restoreFocus:!1}),w.close({restoreFocus:!1}),z.open(V||null)}catch(m){console.error("[kanban] failed to open enviar-germinacao drawer",m)}},Ma=async()=>{if(!(ee||z))try{f||(f=Ga(()=>import("./enviar-germinacao-drawer-BdxPZ2ZC.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24])));const V=await f;if(ee||z)return;typeof V.createEnviarGerminacaoDrawer=="function"&&(z=V.createEnviarGerminacaoDrawer())}catch(V){console.error("[kanban] failed to preload enviar-germinacao drawer",V)}};typeof window.requestIdleCallback=="function"?N=window.requestIdleCallback(()=>{Ma()},{timeout:1200}):A=window.setTimeout(()=>{Ma()},300);const Ia=V=>{if(za(V,c,{onOpenSemeioDrawer:ve=>{da(ve)}}))return;const m=V.target.closest("[data-agendado-action]");if(!m)return;const O=m.dataset.agendadoAction;if(O==="cancel"){q.close();return}if(O==="reagendar"||O==="consult-agenda"){Ot(m);return}if(O==="add-lote"){console.log(`Ação: ${O}`);return}if(O==="details-qr"||O==="details-view-order"||O==="details-view-image"){console.log(`Ação: ${O}`);return}if(O==="save-lote"){console.log("Salvar lote");return}if(O==="start-semeio"){const ve=c.querySelector("[data-agendado-form]"),te=ve?Object.fromEntries(new FormData(ve).entries()):{};console.log("Iniciar semeio",te)}},Ve=({stageKey:V,stageDrawerElement:m,stageDrawerControls:O})=>ve=>{if(za(ve,m,{onOpenSemeioDrawer:Y=>{da(Y)}}))return;const te=ve.target.closest("[data-op-step-action]");if(te&&m.contains(te)){const Y=te.getAttribute("data-op-step-action");if(!Y)return;if(Y==="cancel"){O.close();return}if(Y==="consult-agenda"||Y==="consult-location"||Y==="quality"||Y==="qr"){console.log(`Ação: ${Y}`);return}if(Y==="register-tray"||Y==="read-qr"||Y==="start-execution"||Y==="add-tray"||Y==="reagendar"){console.log(`Ação: ${Y}`);return}if(Y==="voltar-etapa"||Y==="submit-next"){const le=m.querySelector(`[data-op-step-form="${V}"]`),ce=le?Object.fromEntries(new FormData(le).entries()):{};console.log(Y,ce)}return}const we=ve.target.closest("[data-agendado-action]");if(!we||!m.contains(we))return;const ue=we.dataset.agendadoAction;(ue==="details-qr"||ue==="details-view-order"||ue==="details-view-image")&&console.log(`Ação: ${ue}`)},Ta=Ve({stageKey:"germinacao",stageDrawerElement:B,stageDrawerControls:P}),Ba=Ve({stageKey:"casa-vegetacao",stageDrawerElement:K,stageDrawerControls:T}),Na=Ve({stageKey:"aguardando-enxertia",stageDrawerElement:X,stageDrawerControls:F}),Fa=Ve({stageKey:"sala-corte",stageDrawerElement:r,stageDrawerControls:p}),Oa=Ve({stageKey:"adaptacao",stageDrawerElement:H,stageDrawerControls:D}),Ra=Ve({stageKey:"sala-fusao",stageDrawerElement:$,stageDrawerControls:w});e.addEventListener("click",Ca),J&&J.addEventListener("click",Ea),be&&be.addEventListener("click",Da),pe&&pe.addEventListener("click",La),ge&&ge.addEventListener("click",qa),ie&&ie.addEventListener("click",Pa),he&&he.addEventListener("click",Aa),ae&&ae.addEventListener("click",xa),c.addEventListener("click",Ia),B.addEventListener("click",Ta),K.addEventListener("click",Ba),X.addEventListener("click",Na),r.addEventListener("click",Fa),H.addEventListener("click",Oa),$.addEventListener("click",Ra);const je=({restoreFocus:V=!0}={})=>{const m=document.querySelector(`[data-modal="${G}"]`),O=document.querySelector(`[data-modal-backdrop="${G}"]`);!m||!O||(R(),Ae(G),c.classList.contains("is-open")&&(document.body.style.overflow="hidden"),m.remove(),O.remove(),V&&U?.focus&&U.focus(),U=null)},Ot=V=>{document.querySelector(`[data-modal="${G}"]`)?.remove(),document.querySelector(`[data-modal-backdrop="${G}"]`)?.remove(),j=Ke(),U=V||null,document.body.insertAdjacentHTML("beforeend",Ct({modalId:G,state:j}));const m=document.querySelector(`[data-modal="${G}"]`),O=document.querySelector(`[data-modal-backdrop="${G}"]`);if(!m||!O)return;const ve=m.querySelector("#schedule-location-select"),te=m.querySelector("[data-modal-close]"),we=()=>je(),ue=ce=>{ce.target===O&&je()},Y=ce=>{ce.key==="Escape"&&(ce.preventDefault(),ce.stopPropagation(),je())},le=ce=>{const Va=ce.target.closest("[data-schedule-action]");if(Va){const Se=Va.dataset.scheduleAction;if(Se==="back"){je();return}if(Se==="select-date"){const ra=c.querySelector("#agendado-data-encerramento");ra&&(ra.value=We(j.selectedDate),ra.dispatchEvent(new Event("input",{bubbles:!0}))),je();return}}const ja=ce.target.closest("[data-schedule-view]");if(ja){j.viewMode=ja.dataset.scheduleView==="month"?"month":"week",j.viewMode==="month"&&(j.currentDate=De(j.selectedDate)),updateScheduleModalUi(m,j);return}const Ha=ce.target.closest("[data-schedule-nav]");if(Ha){const Se=Ha.dataset.scheduleNav==="prev"?-1:1;j.viewMode==="month"?j.currentDate=yt(j.currentDate,Se):(j.selectedDate=He(j.selectedDate,Se*7),j.currentDate=De(j.selectedDate)),updateScheduleModalUi(m,j);return}const Qa=ce.target.closest("[data-schedule-date]");if(Qa){const Se=_t(Qa.dataset.scheduleDate);if(!Se)return;j.selectedDate=Se,j.currentDate=De(Se),updateScheduleModalUi(m,j);return}ce.target.closest("[data-schedule-reagendar]")&&console.log("Reagendar item de agenda")};O.addEventListener("click",ue),m.addEventListener("click",le),te?.addEventListener("click",we),document.addEventListener("keydown",Y,!0),R=()=>{O.removeEventListener("click",ue),m.removeEventListener("click",le),te?.removeEventListener("click",we),document.removeEventListener("keydown",Y,!0),R=()=>{}},xe(G),updateScheduleModalUi(m,j),ve?.focus&&setTimeout(()=>ve.focus(),120)};return()=>{ee=!0,A!==null&&window.clearTimeout(A),N!==null&&typeof window.cancelIdleCallback=="function"&&window.cancelIdleCallback(N),je({restoreFocus:!1}),z?.cleanup?.(),z=null,f=null,e.removeEventListener("click",Ca),J&&J.removeEventListener("click",Ea),be&&be.removeEventListener("click",Da),pe&&pe.removeEventListener("click",La),ge&&ge.removeEventListener("click",qa),ie&&ie.removeEventListener("click",Pa),he&&he.removeEventListener("click",Aa),ae&&ae.removeEventListener("click",xa),c.removeEventListener("click",Ia),B.removeEventListener("click",Ta),K.removeEventListener("click",Ba),X.removeEventListener("click",Na),r.removeEventListener("click",Fa),H.removeEventListener("click",Oa),$.removeEventListener("click",Ra),typeof u=="function"&&u(),typeof S=="function"&&S(),typeof Q=="function"&&Q(),typeof _=="function"&&_(),typeof C=="function"&&C(),typeof I=="function"&&I(),typeof M=="function"&&M(),q.cleanup&&q.cleanup(),P.cleanup&&P.cleanup(),T.cleanup&&T.cleanup(),F.cleanup&&F.cleanup(),p.cleanup&&p.cleanup(),D.cleanup&&D.cleanup(),w.cleanup&&w.cleanup(),document.querySelector(`[data-drawer="${a}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${a}"]`)?.remove(),document.querySelector(`[data-drawer="${t}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${t}"]`)?.remove(),document.querySelector(`[data-drawer="${n}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${n}"]`)?.remove(),document.querySelector(`[data-drawer="${o}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${o}"]`)?.remove(),document.querySelector(`[data-drawer="${i}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${i}"]`)?.remove(),document.querySelector(`[data-drawer="${s}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${s}"]`)?.remove(),document.querySelector(`[data-drawer="${d}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${d}"]`)?.remove()}}function Zn(){const e=Re({id:"agendado-tabs",firstTabLabel:"Iniciar Semeio",firstTabContent:po()});return`
    <section class="agendado-drawer">
      ${Oe()}
      ${e}
    </section>
  `}function Xn(){const e=Re({id:"germinacao-tabs",firstTabLabel:"Enviar para Casa Vegetação",firstTabContent:so()});return`
    <section class="agendado-drawer germinacao-stage-drawer">
      ${Oe()}
      ${e}
    </section>
  `}function eo(){const e=Re({id:"casa-vegetacao-tabs",firstTabLabel:"Enviar para Expedição",firstTabContent:io()});return`
    <section class="agendado-drawer casa-vegetacao-stage-drawer">
      ${Oe()}
      ${e}
    </section>
  `}function ao(){const e=Re({id:"aguardando-enxertia-tabs",firstTabLabel:"Enviar para Sala de Corte",firstTabContent:ro()});return`
    <section class="agendado-drawer aguardando-enxertia-stage-drawer">
      ${Oe()}
      ${e}
    </section>
  `}function to(){const e=Re({id:"sala-corte-tabs",firstTabLabel:"Enviar para Enxertia",firstTabContent:lo()});return`
    <section class="agendado-drawer op-drawer--corte">
      ${Oe()}
      ${e}
    </section>
  `}function no(){const e=Re({id:"sala-fusao-tabs",firstTabLabel:"Enviar para Adaptação",firstTabContent:co()});return`
    <section class="agendado-drawer op-drawer--fusao">
      ${Oe()}
      ${e}
    </section>
  `}function oo(){const e=Re({id:"adaptacao-tabs",firstTabLabel:"Enviar para Casa de Vegetação",firstTabContent:uo()});return`
    <section class="agendado-drawer op-drawer--adaptacao">
      ${Oe()}
      ${e}
    </section>
  `}function so(){return fa({stepKey:"germinacao",scopeClass:"op-drawer__step--germinacao",stageTitle:"Sala de Germinação",dateEndLabel:"Data encerramento da Germinação*",submitLabel:"Enviar para Estufa"})}function io(){return fa({stepKey:"casa-vegetacao",scopeClass:"op-drawer__step--casa-vegetacao",stageTitle:"Sala de Germinação",dateEndLabel:"Data encerramento da etapa*",submitLabel:"Enviar para Expedição",showProductInfoSection:!1,showConsultAgenda:!1,qualityTitle:"Controle de Qualidade",qualityStatus:"",qualityButtonLabel:"Iniciar Seleção",qualityClassName:"op-drawer--adaptacao__quality",quantityGroups:[{subtitle:"Produto",meta:"Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong>",kpis:[{label:"Entrada",value:"5.000"},{label:"Perda",value:"250",badge:"+5%"},{label:"Atual",value:"4.750",badge:"95%"}]}]})}function ro(){return fa({stepKey:"aguardando-enxertia",scopeClass:"op-drawer__step--aguardando-enxertia",stageTitle:"Sala de Germinação",dateEndLabel:"Data de Início da Etapa*",submitLabel:"Iniciar Enxertia",rightDateLabel:"Data de Agendamento",rescheduleLabel:"+ Reagendar",showBackAction:!1})}function lo(){return`
    <form class="agendado-panel op-drawer__step--corte" data-op-step-form="sala-corte">
      <section class="agendado-section op-germinacao-step__actions">
        ${Qe().replace("<button",'<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${l("home",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Sala de Germinação</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${l("calendar",{size:12})}</span>
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
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${l("calendar",{size:12})}</span>
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
            ${ne("Enxerto","248")}
            ${ne("Porta-enxerto","4.750")}
          </div>
        </div>
        <div class="op-step-corte__execution-toggle">
          ${h({text:"Iniciar Execução",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="start-execution"')}
        </div>
      </section>

      <section class="agendado-section op-step-corte__exec">
        <h3 class="agendado-title">Execução do Corte</h3>
        <div class="op-step-corte__exec-actions">
          <button type="button" class="agendado-inline-link" data-op-step-action="register-tray">+ Registrar Bandeja Finalizada</button>
          <button type="button" class="agendado-inline-link" data-op-step-action="read-qr">Ler QR Code</button>
        </div>
        <article class="agendado-info-box op-step-corte__exec-form">
          ${v({id:"sala-corte-data-execucao",type:"date",label:"Data de Execução*",required:!0,name:"dataExecucao",iconRight:l("calendar",{size:16})})}
          <div class="op-step-corte__grid op-step-corte__grid--three">
            ${se({id:"sala-corte-operador",label:"Operador",required:!0,placeholder:"Selecione",items:[{label:"Maria Silva",value:"maria-silva"},{label:"João Souza",value:"joao-souza"}]})}
            ${v({id:"sala-corte-bandeja-id",label:"Bandeja ID",name:"bandejaId",value:"# ID"})}
            ${v({id:"sala-corte-qtd-mudas",label:"Quantidade de Mudas",name:"quantidadeMudas",value:"0"})}
          </div>
          <div class="op-step-corte__add-action">
            ${h({text:"Adicionar",variant:"primary",size:"sm"}).replace("<button",'<button data-op-step-action="add-tray"')}
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
                <tr><td>BDJ-001</td><td>Maria Silva</td><td>23/12/26</td><td>128</td><td>${l("trash",{size:14})}</td></tr>
                <tr><td>BDJ-002</td><td>João Souza</td><td>23/12/26</td><td>120</td><td>${l("trash",{size:14})}</td></tr>
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
            ${ne("Já Executado","248")}
            ${ne("A Executar (Restante)","4.500")}
            ${ne("Perdas","2")}
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
            ${Ye({id:"sala-corte-localizacao",required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${v({id:"sala-corte-data-encerramento",type:"date",label:"Data encerramento da etapa*",required:!0,name:"dataEncerramento",iconRight:l("calendar",{size:16})})}
          ${v({id:"sala-corte-responsavel",label:"Responsável*",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
          <div class="agendado-consultar-wrap">
            ${h({text:"+ Consultar agenda",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="consult-agenda"')}
          </div>
        </div>
      </section>

      <section class="agendado-section op-germinacao-step__bottom">
        <span aria-hidden="true"></span>
        <div class="op-germinacao-step__bottom-right">
          ${h({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="cancel"')}
          ${h({text:"Encerrar e Enviar para Fusão",variant:"primary",size:"sm"}).replace("<button",'<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `}function co(){return`
    <form class="agendado-panel op-drawer__step--fusao" data-op-step-form="sala-fusao">
      <section class="agendado-section op-germinacao-step__actions">
        ${Qe().replace("<button",'<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${l("home",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Sala de Germinação</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${l("calendar",{size:12})}</span>
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
        ${h({text:"Avaliação",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="quality"')}
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
              ${ne("Entrada","5.000")}
              ${ne("Perda","250","+5%")}
              ${ne("Atual","4.750","95%")}
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
            ${Ye({id:"sala-fusao-localizacao",required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${v({id:"sala-fusao-data-encerramento",type:"date",label:"Data encerramento da etapa*",required:!0,name:"dataEncerramento",iconRight:l("calendar",{size:16})})}
          ${v({id:"sala-fusao-responsavel",label:"Responsável*",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
          <div class="agendado-consultar-wrap">
            ${h({text:"+ Consultar agenda",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="consult-agenda"')}
          </div>
        </div>
      </section>

      <section class="agendado-section op-germinacao-step__bottom">
        ${h({text:"Voltar Etapa",variant:"error",style:"outline",size:"sm"}).replace("<button",'<button data-op-step-action="voltar-etapa"')}
        <div class="op-germinacao-step__bottom-right">
          ${h({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="cancel"')}
          ${h({text:"Enviar para Adaptação",variant:"primary",size:"sm"}).replace("<button",'<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `}function uo(){return`
    <form class="agendado-panel op-drawer__step--adaptacao" data-op-step-form="adaptacao">
      <section class="agendado-section op-germinacao-step__actions">
        ${Qe().replace("<button",'<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${l("home",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">Sala de Germinação</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${l("calendar",{size:12})}</span>
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
        ${h({text:"Iniciar Seleção",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="quality"')}
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
              ${ne("Entrada","5.000")}
              ${ne("Perda","250","+5%")}
              ${ne("Atual","4.750","95%")}
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
            ${Ye({id:"adaptacao-localizacao",required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${v({id:"adaptacao-data-encerramento",type:"date",label:"Data encerramento da etapa*",required:!0,name:"dataEncerramento",iconRight:l("calendar",{size:16})})}
          ${v({id:"adaptacao-responsavel",label:"Responsável*",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
        </div>
      </section>

      <section class="agendado-section op-germinacao-step__bottom">
        ${h({text:"Voltar Etapa",variant:"error",style:"outline",size:"sm"}).replace("<button",'<button data-op-step-action="voltar-etapa"')}
        <div class="op-germinacao-step__bottom-right">
          ${h({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="cancel"')}
          ${h({text:"Enviar para Casa de Vegetação",variant:"primary",size:"sm"}).replace("<button",'<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `}function fa({stepKey:e,scopeClass:a,stageTitle:t,dateEndLabel:n,submitLabel:o,rightDateLabel:i="Previsão de Saída",rescheduleLabel:s="+ Consultar agenda",showBackAction:d=!0,showProductInfoSection:b=!0,showConsultAgenda:y=!0,qualityTitle:k="Controle de Qualidade:",qualityStatus:x="Dentro do esperado",qualityButtonLabel:L="Avaliação",qualityClassName:E="",quantityGroups:g=[{subtitle:"Enxerto",meta:"Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong>",kpis:[{label:"Semeada",value:"5.000"},{label:"Perda",value:"250",badge:"+5%"},{label:"Germinada",value:"4.750",badge:"95%"}]},{subtitle:"Porta-enxerto",meta:"Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong> &nbsp; Qtd. Bandejas: <strong>20 un</strong>",kpis:[{label:"Semeada",value:"5.000"},{label:"Perda",value:"250",badge:"+5%"},{label:"Germinada",value:"4.750",badge:"95%"}]}]}){const c=(Array.isArray(g)?g:[]).map(T=>{const K=T?.subtitle||"Produto",F=T?.meta||"Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong>",p=(Array.isArray(T?.kpis)?T.kpis:[]).map(r=>ne(r?.label||"",r?.value||"",r?.badge||"")).join("");return`
      <div class="agendado-semeio-group">
        <div class="agendado-info-box__head">
          <span class="agendado-subtitle">${K}</span>
          <span class="agendado-info-box__meta">${F}</span>
        </div>
        <div class="agendado-kpis">
          ${p}
        </div>
      </div>
    `}).join(""),P=b?`
      <section class="agendado-section">
        <h3 class="agendado-title">Informações do Produto</h3>
        <div class="agendado-info-box">
          <div class="agendado-info-box__head">
            <span class="agendado-subtitle">Produto</span>
            <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong></span>
          </div>
          <div class="agendado-kpis">
            ${ne("Qtd. a Produzir","5.556")}
            ${ne("Perda Estimada","556","+10%")}
            ${ne("Qtd. solicitada","5.000")}
          </div>
        </div>
      </section>
    `:"",B=y?`
          <div class="agendado-consultar-wrap">
            ${h({text:s,variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="consult-agenda"')}
          </div>
      `:"";return`
    <form class="agendado-panel ${a}" data-op-step-form="${e}">
      <section class="agendado-section op-germinacao-step__actions">
        ${Qe().replace("<button",'<button data-op-step-action="qr"')}
      </section>

      <section class="agendado-section">
        <article class="op-germinacao-step__quick">
          <div class="op-germinacao-step__quick-row">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${l("home",{size:12})}</span>
              <div class="op-germinacao-step__field">
                <span class="op-germinacao-step__caption">${t}</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
          </div>
          <div class="op-germinacao-step__quick-row op-germinacao-step__quick-row--two">
            <div class="op-germinacao-step__quick-info">
              <span class="op-germinacao-step__quick-icon" aria-hidden="true">${l("calendar",{size:12})}</span>
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
                <span class="op-germinacao-step__caption">${i}</span>
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
          <strong>${k}</strong>
          ${x?`<span>${x}</span>`:""}
        </div>
        ${h({text:L,variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="quality"')}
      </section>

      ${P}

      <section class="agendado-section">
        <h3 class="agendado-title">Quantidade de Mudas Semeadas</h3>
        <div class="agendado-info-box">
          ${c}
        </div>
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link" data-op-step-action="consult-location">Consultar localização</button>
            </div>
            ${Ye({id:`${e}-localizacao`,required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${v({id:`${e}-data-encerramento`,type:"date",label:n,required:!0,name:"dataEncerramento",iconRight:l("calendar",{size:16})})}
          ${v({id:`${e}-responsavel`,label:"Responsável*",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
          ${B}
        </div>
      </section>
      <section class="agendado-section op-germinacao-step__bottom">
        ${d?h({text:"Voltar Etapa",variant:"error",style:"outline",size:"sm"}).replace("<button",'<button data-op-step-action="voltar-etapa"'):'<span aria-hidden="true"></span>'}
        <div class="op-germinacao-step__bottom-right">
          ${h({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-op-step-action="cancel"')}
          ${h({text:o,variant:"primary",size:"sm"}).replace("<button",'<button data-op-step-action="submit-next"')}
        </div>
      </section>
    </form>
  `}function po(){const e=Ht({title:"",compact:!0,multiple:!1,maxSizeLabel:"3MB",acceptedFormats:["image/png","image/svg+xml","application/msword","application/pdf"],className:"agendado-upload"});return`
    <form class="agendado-panel" data-agendado-form>
      <section class="agendado-section">
        <div class="agendado-semeio">
          <div class="agendado-semeio__field">
            <span class="agendado-semeio__label">
              <span class="agendado-semeio__icon">${l("calendar",{size:12})}</span>
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
          ${et()}
          ${Qe()}
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
            ${ne("Qtd. a Produzir","5.556")}
            ${ne("Perda Estimada","556","+10%")}
            ${ne("Qtd. solicitada","5.000")}
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
              ${ne("Qtd. a Semear","5.556")}
              ${ne("Perda Estimada","556","+10%")}
              ${ne("Qtd. Esperada","5.000")}
            </div>
          </div>
          <div class="agendado-semeio-group">
            <div class="agendado-info-box__head">
              <span class="agendado-subtitle">Porta-enxerto</span>
              <span class="agendado-info-box__meta">Cód. Produto: <strong>0001</strong> &nbsp; Produto: <strong>Muda de Eucalipto Clone</strong></span>
            </div>
            <div class="agendado-kpis">
              ${ne("Qtd. a Semear","5.556")}
              ${ne("Perda Estimada","556","+10%")}
              ${ne("Qtd. Esperada","5.000")}
            </div>
          </div>
        </div>
      </section>

      <section class="agendado-section">
        <div class="agendado-section__header">
          <h3 class="agendado-title">Lotes de Sementes Utilizados</h3>
          ${h({text:"+ Adicionar Lote",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="add-lote"')}
        </div>
        <div class="agendado-card">
          <div class="agendado-grid agendado-grid--two">
            <div class="agendado-grid-col--full">
              ${se({id:"agendado-tipo",label:"Tipo",name:"tipo",placeholder:"Selecione",items:[{label:"Enxerto",value:"enxerto"}]})}
            </div>
            ${v({id:"agendado-classe",label:"Classe",name:"classe",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${v({id:"agendado-cod-produto",label:"Código do Produto",name:"codigoProduto",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${v({id:"agendado-produto",label:"Produto",name:"produto",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${v({id:"agendado-unidade",label:"Unidade",name:"unidade",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${v({id:"agendado-cod-lote",label:"Código do Lote",name:"codigoLote",value:"5kg"})}
            ${v({id:"agendado-fornecedor",label:"Fornecedor",name:"fornecedor",value:"95%"})}
            ${v({id:"agendado-embalagem",label:"Embalagem",name:"embalagem",value:"Clone AEC 144"})}
            ${v({id:"agendado-quantidade",label:"Quantidade",name:"quantidade",value:"10"})}
          </div>
          <div class="agendado-upload-wrap">
            <span class="agendado-field-label">Anexa imagem do lote</span>
            ${e}
            ${wo()}
          </div>
          ${v({id:"agendado-responsavel-coleta",label:"Responsável coleta da semente",name:"responsavelColeta",value:"João da Silva"})}
          <div class="agendado-grid agendado-grid--two">
            ${v({id:"agendado-responsavel-entrega",label:"Responsável entrega da semente",name:"responsavelEntrega",placeholder:"Nome do responsável"})}
            ${v({id:"agendado-data-hora-entrega",label:"Data/Hora de entrega da semente",name:"dataHoraEntrega",placeholder:"Nome do responsável"})}
          </div>
          <div class="agendado-card__actions">
            ${ko()}
            ${h({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="cancel-lote"')}
            ${h({text:"Salvar",variant:"primary",size:"sm"}).replace("<button",'<button data-agendado-action="save-lote"')}
          </div>
        </div>
      </section>

      <section class="agendado-section">
        ${at("Enxerto","10.000",{collapsed:!0,showTable:!1})}
        ${at("Porta-enxerto","15.000",{collapsed:!1,showTable:!0})}
      </section>

      <section class="agendado-section">
        <div class="agendado-grid agendado-grid--two">
          <div class="agendado-location-field">
            <div class="agendado-location-head">
              <span class="agendado-inline-label">Localização<span class="agendado-required">*</span></span>
              <button type="button" class="agendado-inline-link">Consultar localização</button>
            </div>
            ${Ye({id:"agendado-localizacao",required:!0,name:"localizacao",placeholder:"Buscar"})}
          </div>
          ${v({id:"agendado-data-encerramento",type:"date",label:"Data encerramento da etapa",required:!0,name:"dataEncerramento",className:"agendado-date-field",iconRight:l("calendar",{size:16})})}
          ${v({id:"agendado-responsavel",label:"Responsável",required:!0,name:"responsavel",placeholder:"Nome do responsável"})}
          <div class="agendado-consultar-wrap">
            ${h({text:"+ Consultar agenda",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="consult-agenda"')}
          </div>
        </div>
        <div class="agendado-bottom-actions">
          ${et()}
        </div>
      </section>
    </form>
  `}function vo(){return`
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
              ${W("Data do Pedido","15/01/2025")}
              ${W("Data Agendada do Semeio","15/01/2025")}
              ${W("Responsável agendamento","João da Silva")}
            </div>
          </div>
          <div class="agendado-details-actions">
            ${Qe().replace("<button",'<button data-agendado-action="details-qr"')}
          </div>
        </section>

        <section class="agendado-section">
          <h3 class="agendado-title">Informações Gerais</h3>
          <div class="agendado-details-card">
            <div class="agendado-details-grid agendado-details-grid--three">
              ${W("Cód. do Pedido","001")}
              ${W("Referência","43242343")}
              ${W("Cód. Tawros","001")}

              ${W("Cód. do Cliente","001")}
              ${W("CPF/CNPJ","123.456.789-00")}
              ${W("Razão Social/Nome","Nome da razao social")}

              ${W("Nome Fantasia/Apelido","Nome fantasia")}
              ${W("Cidade/UF","São Paulo-SP")}
              ${W("Nome do Vendedor","Nome vendedor")}
            </div>

            <div class="agendado-details-field agendado-details-field--full">
              <span class="agendado-details-field__label">Classe</span>
              <strong class="agendado-details-field__value">Muda de Eucalipto Clone AEC 144</strong>
            </div>

            <div class="agendado-details-grid agendado-details-grid--three">
              ${W("Cód. do Produto","432243432")}
              ${W("Produto","Muda de Eucalipto Clone")}
              ${W("Quantidade","5.000")}
            </div>
          </div>

          <div class="agendado-details-accordion" data-agendado-details-accordion>
            <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
              <span class="agendado-details-accordion__icon" aria-hidden="true">${l("chevron-right",{size:12})}</span>
              <span>Observações</span>
            </button>
            <div class="agendado-details-accordion__content">
              Hoje, durante a caminhada no parque, notei que as flores estavam mais vibrantes do que nunca. O aroma doce das rosas misturava-se com o frescor do ar, criando uma atmosfera encantadora. Além disso, vi um grupo de crianças brincando e rindo, o que trouxe um sorriso ao meu rosto. Foi um momento perfeito para refletir e apreciar a beleza da natureza.
            </div>
          </div>

          <div class="agendado-details-actions">
            ${h({text:"Ver pedido",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="details-view-order"')}
          </div>
        </section>
      </div>

      <div class="agendado-details-panel" data-agendado-details-panel="producao">${go()}</div>
      <div class="agendado-details-panel" data-agendado-details-panel="expedicao"><div class="agendado-placeholder">Em construção</div></div>
      <div class="agendado-details-panel" data-agendado-details-panel="operacoes"><div class="agendado-placeholder">Em construção</div></div>
      <div class="agendado-details-panel" data-agendado-details-panel="historico"><div class="agendado-placeholder">Em construção</div></div>
    </section>
  `}function go(){const e=[{stockDate:"12/01/2025",responsible:"Viktor Dantas"},{stockDate:"12/01/2025",responsible:"Viktor Dantas"}],a=[{tray:"Descrição Bandeja",quantity:"1000",responsible:"Viktor Dantas"},{tray:"Descrição Bandeja",quantity:"1000",responsible:"Viktor Dantas"}],t=["Germinação","Casa de Vegetação","Sala de Corte","Sala de Fusão","Adaptação"];return`
    <section class="agendado-details-production">
      <h3 class="agendado-title">Informações da Produção</h3>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle data-agendado-open-germinacao="true">
          <span class="agendado-details-accordion__icon" aria-hidden="true">${l("chevron-right",{size:12})}</span>
          <span>Semeio</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__grid agendado-details-production__grid--two">
            ${W("Data agendada de semeio","12/01/2025")}
            ${W("Responsável do agendamento","Viktor Dantas")}
            ${W("Data de semeio","12/01/2025")}
            ${W("Responsável do semeio","Viktor Dantas")}
          </div>
          <div class="agendado-details-production__line">
            ${W("Localização","Sala de Semeio")}
          </div>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${l("chevron-right",{size:12})}</span>
          <span>Produto Final</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__grid agendado-details-production__grid--two">
            ${W("Quantidade de Produto","5.000")}
            ${W("Estimativa (+5% Germinação)","5.250")}
          </div>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${l("chevron-right",{size:12})}</span>
          <span>Sementes</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__grid agendado-details-production__grid--two">
            ${W("Quantidade de Mudas Enxerto","5.000")}
            ${W("Estimativa (+5% Germinação)","5.250")}
            ${W("Quantidade de Mudas Porta-enxerto","5.000")}
            ${W("Estimativa (+5% Germinação)","5.250")}
          </div>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${l("chevron-right",{size:12})}</span>
          <span>Informações de Lote de Sementes</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__lots">
            ${e.map(n=>mo(n)).join("")}
          </div>
          <button type="button" class="agendado-termo-btn">
            ${l("file",{size:14})}
            <span>Termo de Retirada</span>
          </button>
        </div>
      </div>

      <div class="agendado-details-accordion" data-agendado-details-accordion>
        <button type="button" class="agendado-details-accordion__header" aria-expanded="true" data-agendado-details-toggle>
          <span class="agendado-details-accordion__icon" aria-hidden="true">${l("chevron-right",{size:12})}</span>
          <span>Informações de Insumos</span>
        </button>
        <div class="agendado-details-accordion__content agendado-details-production__content">
          <div class="agendado-details-production__supplies">
            ${a.map(n=>bo(n)).join("")}
          </div>
        </div>
      </div>

      ${t.map(n=>fo(n)).join("")}
    </section>
  `}function mo(e){return`
    <article class="agendado-details-production__lot">
      <span class="agendado-details-production__lot-title">Lote de Sementes Utilizado</span>
      <span class="agendado-details-production__lot-meta">Fornecedor - Código do lote - Descrição - Qtd</span>
      <div class="agendado-details-production__grid agendado-details-production__grid--lot">
        ${W("Data de retirada do estoque",e.stockDate)}
        ${W("Responsável retirada",e.responsible)}
        <div class="agendado-details-field">
          <span class="agendado-details-field__label">Foto</span>
          <span class="agendado-details-production__photo">
            <img src="/assets/arquivo.png" alt="" aria-hidden="true" />
            <button type="button" class="agendado-details-production__link" data-agendado-action="details-view-image">Visualizar imagem</button>
          </span>
        </div>
      </div>
    </article>
  `}function bo(e){return`
    <article class="agendado-details-production__supply">
      <div class="agendado-details-production__grid agendado-details-production__grid--supplies">
        ${W("Bandeja",e.tray)}
        ${W("Quantidade",e.quantity)}
        ${W("Responsável da retirada",e.responsible)}
      </div>
    </article>
  `}function fo(e){return`
    <div class="agendado-details-accordion is-collapsed" data-agendado-details-accordion>
      <button type="button" class="agendado-details-accordion__header" aria-expanded="false" data-agendado-details-toggle>
        <span class="agendado-details-accordion__icon" aria-hidden="true">${l("chevron-right",{size:12})}</span>
        <span>${e}</span>
      </button>
      <div class="agendado-details-production__stage-caption">Detalhes</div>
      <div class="agendado-details-accordion__content agendado-details-production__content">
        <div class="agendado-placeholder">Em construção</div>
      </div>
    </div>
  `}function _o(){const e=[{title:"Dias após o Semeio",period:"23/01/2025",days:"10 dias"},{title:"Dias na Germinação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Casa de Vegetação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Sala de Corte",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Sala de Fusão",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Adaptação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Casa de Vegetação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias em Expedição",period:"23/01/2025 - 23/01/2025",days:"15 dias"}],a=[{title:"Criação da Ordem de Produção",responsible:"André Cesairni",date:"23/01/2025"},{title:"Criação da Ordem de Produção",responsible:"André Cesairni",date:"23/01/2025",daysAfterSowing:"0 Dias"},{title:"Criação da Ordem de Produção",responsible:"André Cesairni",date:"23/01/2025"},{title:"Criação da Ordem de Produção",responsible:"André Cesairni",date:"23/01/2025",daysAfterSowing:"0 Dias"},{title:"Criação da Ordem de Produção",responsible:"André Cesairni",date:"23/01/2025",daysAfterSowing:"0 Dias"}];return`
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
                <span class="agendado-cycle-forecast__icon" aria-hidden="true">${l("clock",{size:14})}</span>
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
                  <span class="agendado-cycle-forecast__date-icon" aria-hidden="true">${l("calendar",{size:14})}</span>
                  <span>Data Abertura: <strong>12/12/2026</strong></span>
                </div>
                <div class="agendado-cycle-forecast__date">
                  <span class="agendado-cycle-forecast__date-icon" aria-hidden="true">${l("calendar",{size:14})}</span>
                  <span>Previsão Término: <strong>12/12/2026</strong></span>
                </div>
              </div>
            </article>
          </section>

          <section class="agendado-section">
            <h3 class="agendado-title">Etapas do Ciclo</h3>
            <div class="agendado-cycle-steps" aria-label="Etapas do ciclo">
              ${e.map(t=>ho(t)).join("")}
            </div>
          </section>
        </div>
      </div>

      <div class="agendado-cycle-panel" data-agendado-cycle-panel="linha-do-tempo">
        <div class="agendado-cycle-content">
          <section class="agendado-section agendado-cycle-timeline">
            <h3 class="agendado-title">Linha do Tempo</h3>
            <div class="timeline-card" aria-label="Linha do tempo do ciclo">
              ${a.map(t=>yo(t)).join("")}
            </div>
          </section>
        </div>
      </div>
    </section>
  `}function ho(e){return`
    <article class="agendado-cycle-step">
      <div class="agendado-cycle-step__main">
        <strong class="agendado-cycle-step__title">${e.title}</strong>
        <span class="agendado-cycle-step__period">${e.period}</span>
      </div>
      <strong class="agendado-cycle-step__days">${e.days}</strong>
    </article>
  `}function yo(e){return`
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
  `}function W(e,a){return`
    <div class="agendado-details-field">
      <span class="agendado-details-field__label">${e}</span>
      <strong class="agendado-details-field__value">${a}</strong>
    </div>
  `}function et(){return`
    <button type="button" class="agendado-reagendar-btn" data-agendado-action="reagendar">
      ${l("calendar",{size:18})}
      <span>Reagendar</span>
    </button>
  `}function Qe(){return`
    <button type="button" class="agendado-qr-btn">
      <img src="/assets/qrcode.png" alt="" aria-hidden="true" />
      <span>Gerar QR Code</span>
    </button>
  `}function ko(){return`
    <button type="button" class="agendado-termo-btn">
      ${l("file",{size:14})}
      <span>Termo de Retirada</span>
    </button>
  `}function wo(){return`
    <div class="agendado-upload-preview" aria-label="Arquivo anexado">
      <img src="/assets/arquivo.png" alt="" aria-hidden="true" class="agendado-upload-preview__thumb" />
      <div class="agendado-upload-preview__content">
        <strong class="agendado-upload-preview__name">File name.ext</strong>
        <span class="agendado-upload-preview__status">Upload complete.</span>
      </div>
      <div class="agendado-upload-preview__actions agendado-icon-actions">
        <button type="button" aria-label="Visualizar">${l("eye",{size:16})}</button>
        <button type="button" aria-label="Excluir">${l("trash",{size:16})}</button>
      </div>
    </div>
  `}function ne(e,a,t=""){return`
    <div class="agendado-kpi">
      <span class="agendado-kpi__label">${e}${t?` <em>${t}</em>`:""}</span>
      <strong class="agendado-kpi__value">${a}</strong>
    </div>
  `}function at(e,a,t={}){const{collapsed:n=!1,showTable:o=!0}=t,i=n?"is-collapsed":"is-expanded",s=`agendado-cultura-${e.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`;return`
    <div class="agendado-table-group">
      <span class="agendado-subtitle">${e}</span>
      <div class="agendado-table-block ${n?"agendado-table-block--collapsed":""}">
        <div class="agendado-table-block__subheader">
          <span class="agendado-table-block__caret ${i}" aria-hidden="true">${l("chevron-right",{size:12})}</span>
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
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${ca()}</td></tr>
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${ca()}</td></tr>
              <tr><td>0001</td><td>AgroSeeds</td><td>95%</td><td>5.000</td><td>${ca()}</td></tr>
            </tbody>
          </table>
        </div>`:""}
      </div>
    </div>
  `}function ca(){return`
    <div class="agendado-table-actions agendado-icon-actions">
      <button type="button" aria-label="Editar">${l("edit",{size:14})}</button>
      <button type="button" aria-label="Excluir">${l("trash",{size:14})}</button>
      <button type="button" aria-label="Visualizar">${l("eye",{size:14})}</button>
    </div>
  `}function $o(){return`
    <div class="agendado-footer">
      ${h({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-agendado-action="cancel"')}
      ${h({text:"Iniciar Semeio",variant:"primary",size:"sm"}).replace("<button",'<button data-agendado-action="start-semeio"')}
    </div>
  `}function So(){const e=document.getElementById("kanban-board");if(!e)return()=>{};const a="kanban-pedido-details-drawer",t=document.querySelector(`[data-drawer="${a}"]`),n=document.querySelector(`[data-drawer-backdrop="${a}"]`);t&&t.remove(),n&&n.remove(),document.body.insertAdjacentHTML("beforeend",ye({id:a,title:"Detalhes do Pedido",width:540,content:'<section class="orders-details-drawer"></section>',footer:nt()}));const o="kanban-replan-item-modal";let i=()=>{},s=null;function d({restoreFocus:p=!0}={}){const r=document.querySelector(`[data-modal="${o}"]`),D=document.querySelector(`[data-modal-backdrop="${o}"]`);!r||!D||(i(),Ae(o),document.querySelector(`[data-drawer="${a}"]`)?.classList.contains("is-open")&&(document.body.style.overflow="hidden"),r.remove(),D.remove(),p&&s?.focus&&s.focus(),s=null)}function b({anchorEl:p=null,orderItemId:r=""}={}){d({restoreFocus:!1}),s=p,document.body.insertAdjacentHTML("beforeend",Io({modalId:o,orderItemId:r}));const D=document.querySelector(`[data-modal="${o}"]`),H=document.querySelector(`[data-modal-backdrop="${o}"]`);if(!D||!H)return;const w=fe(D),$=D.querySelector("[data-modal-close]"),u=D.querySelector('[data-replan-action="cancel"]'),S=D.querySelector('[data-replan-action="confirm"]'),Q=D.querySelector("#replan-reason"),_=D.querySelector("#replan-op"),C=(R,U="Campo obrigatório.")=>{const j=D.querySelector(`[data-replan-error="${R}"]`),J=D.querySelector(`[data-replan-field="${R}"] .field`);J&&J.classList.add("field--error"),j&&(j.textContent=U,j.hidden=!1)},I=R=>{const U=D.querySelector(`[data-replan-error="${R}"]`),j=D.querySelector(`[data-replan-field="${R}"] .field`);j&&j.classList.remove("field--error"),U&&(U.hidden=!0)},M=()=>{I("reason"),I("op");let R=!0;return Q?.value||(C("reason"),R=!1),_?.value||(C("op"),R=!1),R||(Q?.value?_:Q)?.focus?.(),R},f=()=>d(),z=R=>{R.target===H&&d()},A=R=>{R.key==="Escape"&&(R.preventDefault(),R.stopPropagation(),d())},N=()=>I("reason"),ee=()=>I("op"),G=()=>{M()&&(st("Replanejamento confirmado",{message:"O item foi marcado para replanejamento."}),d())};$?.addEventListener("click",f),u?.addEventListener("click",f),S?.addEventListener("click",G),H.addEventListener("click",z),document.addEventListener("keydown",A,!0),Q?.addEventListener("change",N),_?.addEventListener("change",ee),i=()=>{$?.removeEventListener("click",f),u?.removeEventListener("click",f),S?.removeEventListener("click",G),H.removeEventListener("click",z),document.removeEventListener("keydown",A,!0),Q?.removeEventListener("change",N),_?.removeEventListener("change",ee),typeof w=="function"&&w(),i=()=>{}},xe(o),setTimeout(()=>{Q?.focus?.()},120)}const y=ke({id:a,root:document,onClose:()=>{d({restoreFocus:!1}),Ie({restoreFocus:!1})}}),k=document.querySelector(`[data-drawer="${a}"]`);if(!k||!y)return()=>{};const x=k.querySelector(".drawer__header"),L=k.querySelector("[data-drawer-title]"),E=k.querySelector("[data-drawer-close]"),g=k.querySelector(".drawer__body"),q=k.querySelector(".drawer__footer");if(!g||!q)return()=>{};const c={activeTab:0,currentDetails:null,selectedHistoryProduct:"",selectedPlanningProduct:"",showCanceledPlanning:!1,expandedPlanningByProduct:{}},P=p=>{if(!x||!E)return;let r=x.querySelector("[data-orders-header-badge]");r||(r=document.createElement("span"),r.className="orders-details-drawer__header-status",r.setAttribute("data-orders-header-badge",""),x.insertBefore(r,E)),r.innerHTML=Le({text:p.billingStatus,variant:"success",style:"soft",size:"sm"})},B=p=>{p&&(c.currentDetails=p,c.activeTab=0,c.selectedHistoryProduct=p.items?.[0]?.id||"",c.selectedPlanningProduct=Je(p),c.showCanceledPlanning=!1,c.expandedPlanningByProduct={},ua(c,p),L&&(L.textContent=p.companyName),P(p),g.innerHTML=Eo(p,c),q.innerHTML=nt())},T=p=>{const r=k.querySelector("#orders-details-tabs")?.closest("[data-tabs]"),D=r?.parentElement,H=r?.querySelectorAll(".tabs-tab"),w=D?.querySelectorAll(".tabs-panel");!H||!w||(H.forEach(($,u)=>{$.classList.toggle("is-active",u===p),$.setAttribute("aria-selected",String(u===p))}),w.forEach(($,u)=>{$.classList.toggle("is-active",u===p)}))},K=p=>{const r=p.target.closest(".kanban-card");if(!r||!e.contains(r))return;p.target.closest(".kanban-card__code")&&p.preventDefault();const H=Co(r);B(H),y.open(r)},F=p=>{const r=p.target.closest("[data-pedido-drawer-action]");if(r){const S=r.dataset.pedidoDrawerAction;if(S==="back"){y.close();return}if(S==="cancel-total"){console.log("Cancelar pedido total",c.currentDetails?.orderCode||"");return}}const D=p.target.closest("[data-order-item-action]");if(D){const S=D.dataset.orderItemAction,Q=D.closest("[data-order-item]"),_=Q?Q.dataset.orderItem:"";if(S==="plan"){const C=c.currentDetails?.items?.find(I=>String(I.id)===String(_));pn({anchorEl:D,orderItem:{product:C?.product||"Muda de Eucalipto Clone - MUD-001",totalPedido:C?.quantity||"5000",available:C?.availableQuantity||"5000"}});return}if(S==="replan"){b({anchorEl:D,orderItemId:_});return}console.log(`Ação ${S} no item`,_);return}const H=p.target.closest("[data-order-item-toggle]");if(H){const S=H.closest("[data-order-item]");if(!S)return;S.classList.toggle("is-expanded");return}const w=p.target.closest("[data-order-planning-toggle]");if(w){const S=w.dataset.orderPlanningToggle||"";if(!S||!c.currentDetails)return;const Q=c.selectedPlanningProduct||Je(c.currentDetails);if(!Q)return;const _=new Set(c.expandedPlanningByProduct[Q]||[]);_.has(S)?_.delete(S):_.add(S),c.expandedPlanningByProduct[Q]=Array.from(_),tt(k,c.currentDetails,c);return}const $=p.target.closest("[data-order-planning-action]");if($){const S=$.dataset.orderPlanningAction,Q=$.dataset.planningId||"";S==="open-op"&&console.log("Acessar OP do planejamento",Q);return}const u=p.target.closest("#orders-details-tabs .tabs-tab");if(u){const S=Number(u.dataset.tab);if(Number.isNaN(S))return;c.activeTab=S,T(S)}},X=p=>{const r=p.target;if(!(!(r instanceof HTMLSelectElement)&&!(r instanceof HTMLInputElement))){if(r instanceof HTMLInputElement&&r.dataset.ordersPlanningShowCanceled==="true"){c.showCanceledPlanning=r.checked,ua(c,c.currentDetails),tt(k,c.currentDetails,c);return}if(r instanceof HTMLSelectElement){if(r.dataset.ordersPlanningProduct==="true"){c.selectedPlanningProduct=r.value||"",ua(c,c.currentDetails),zo(k,c.currentDetails,c);return}r.dataset.ordersHistoryProduct==="true"&&(c.selectedHistoryProduct=r.value||"",Po(k,c.currentDetails,c.selectedHistoryProduct))}}};return e.addEventListener("click",K),k.addEventListener("click",F),k.addEventListener("change",X),()=>{d({restoreFocus:!1}),Ie({restoreFocus:!1}),e.removeEventListener("click",K),k.removeEventListener("click",F),k.removeEventListener("change",X),y.cleanup&&y.cleanup();const p=document.querySelector(`[data-drawer="${a}"]`),r=document.querySelector(`[data-drawer-backdrop="${a}"]`);p&&p.remove(),r&&r.remove()}}function Co(e){const a=e.querySelector(".kanban-card__code")?.textContent?.trim()||"",t=e.querySelector(".kanban-card__subtitle")?.textContent?.trim()||"",o=e.closest("[data-column-id]")?.querySelector(".kanban-column__title")?.textContent?.trim()||"Recebido",i=Ka[a]||Ka["A2W-2025-001"];return{...JSON.parse(JSON.stringify(i)),orderCode:a||"A2W-2025-001",subCode:t||"TG-45678",stageStatus:o,billingStatus:"Faturado"}}function Eo(e,a){const t=a?.activeTab||0,n=a?.selectedHistoryProduct||"",o=oa({id:"orders-details-tabs",variant:"underlined",fullWidth:!0,activeTab:t,tabs:[{label:"Informações gerais",content:Mo(e)},{label:"Histórico",content:Do(e,n)},{label:"Planejamento",content:Ao(e,a)}]});return`
    <section class="orders-details-drawer">
      <div class="orders-details-drawer__meta">
        <a href="#" class="orders-details-drawer__order-code">${e.orderCode}</a>
        <span class="orders-details-drawer__dot" aria-hidden="true">•</span>
        <span class="orders-details-drawer__subcode">${e.subCode}</span>
        <span class="orders-details-drawer__stage">${Le({text:e.stageStatus,variant:"light",style:"soft",size:"sm"})}</span>
      </div>
      ${o}
    </section>
  `}function Do(e,a=""){const t=(e?.items||[]).map(o=>({value:o.id,label:o.product})),n=a||t[0]?.value||"";return`
    <section class="orders-history" data-orders-history>
      <div class="orders-history__filter">
        ${se({id:`orders-history-product-${e?.orderCode||"default"}`,placeholder:"Selecione um produto",items:t,value:n,className:"orders-history__product-select"}).replace("<select ",'<select data-orders-history-product="true" ')}
      </div>
      ${Et(e,n)}
      <section class="orders-history__timeline-wrap">
        <h3 class="orders-history__title">Histórico do Pedido</h3>
        <div class="orders-history__timeline" data-orders-history-events>
          ${Dt(e,n)}
        </div>
      </section>
    </section>
  `}function Et(e,a=""){const t=(e?.items||[]).find(n=>n.id===a)||e?.items?.[0];return`
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
  `}function Lo(e,a=""){const t=e?.orderCode||"",n=gn[t];if(!n)return[];const o=e?.items?.[0]?.id||"",s=n[a||o];return Array.isArray(s)?s:[]}function Dt(e,a=""){const t=Lo(e,a);return t.length?t.map(n=>qo(n)).join(""):`
      <div class="orders-history__empty">
        Sem eventos para este produto.
      </div>
    `}function qo(e){return`
    <article class="orders-history-item">
      <div class="orders-history-item__marker" aria-hidden="true">
        <span class="orders-history-item__dot orders-history-item__dot--${e.badgeType}"></span>
        <span class="orders-history-item__line"></span>
      </div>
      <div class="orders-history-item__content">
        <div class="orders-history-item__head">
          <strong class="orders-history-item__title">${e.title}</strong>
          <span class="orders-history-item__badge orders-history-item__badge--${e.badgeType}">
            ${Le({text:e.badgeLabel,variant:"light",style:"soft",size:"sm"})}
          </span>
        </div>
        <span class="orders-history-item__date">${e.date}</span>
        <p class="orders-history-item__description">${e.description}</p>
        <span class="orders-history-item__meta">
          ${l("user",{size:12})}
          <span>${e.metaRole}: ${e.metaName}</span>
        </span>
      </div>
    </article>
  `}function Po(e,a,t=""){if(!e||!a)return;const n=e.querySelector("[data-orders-history]"),o=n?.querySelector(".orders-history__summary"),i=n?.querySelector("[data-orders-history-events]");!o||!i||(o.outerHTML=Et(a,t),i.innerHTML=Dt(a,t))}function Ue(e){const a=Number(e);return Number.isFinite(a)?a.toLocaleString("pt-BR"):"0"}function ia(e){const a=e?.orderCode||"";return Ja[a]||Ja["A2W-2025-001"]}function Je(e){return ia(e)?.products?.[0]?.id||""}function Lt(e,a=""){const t=ia(e);return t?.products?.find(n=>n.id===a)||t?.products?.[0]||null}function qt(e,a=""){const t=ia(e),n=Lt(e,a),o=n?t?.byProduct?.[n.id]:null;return{selectedProduct:n,metrics:o?.metrics||{total:0,planned:0,canceled:0,pending:0},plans:Array.isArray(o?.plans)?o.plans:[]}}function Pt(e,a="",t=!1){const{plans:n}=qt(e,a);return t?n:n.filter(o=>o.status!=="cancelado")}function ua(e,a){if(!e||!a)return;const t=e.selectedPlanningProduct||Je(a);if(!t)return;e.selectedPlanningProduct=t;const n=Pt(a,t,e.showCanceledPlanning),o=new Set(n.map(s=>s.id)),i=(e.expandedPlanningByProduct[t]||[]).filter(s=>o.has(s));if(!i.length&&n[0]){e.expandedPlanningByProduct[t]=[n[0].id];return}e.expandedPlanningByProduct[t]=i}function Ao(e,a={}){const t=ia(e),n=a?.selectedPlanningProduct||t?.products?.[0]?.id||"",o=!!a?.showCanceledPlanning,i=(t?.products||[]).map(b=>({value:b.id,label:b.label})),s=se({id:`orders-planning-product-${e?.orderCode||"default"}`,placeholder:"Selecione um produto",items:i,value:n}).replace("<select ",'<select data-orders-planning-product="true" '),d=Xe({id:`orders-planning-show-canceled-${e?.orderCode||"default"}`,checked:o,size:"sm"}).replace('class="toggle-input"','class="toggle-input" data-orders-planning-show-canceled="true"');return`
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
        ${At(e,n)}
      </div>
      <section class="orders-planning__log">
        <h3 class="orders-planning__title">Log de Planejamento</h3>
        <p class="orders-planning__subtitle">Histórico de todas as ações de planejamento realizadas para este pedido</p>
      </section>
      <div class="orders-planning__metrics" data-orders-planning-metrics>
        ${xt(e,n)}
      </div>
      <section class="orders-planning__list-wrap" data-orders-planning-list-wrap>
        ${_a(e,a)}
      </section>
    </section>
  `}function At(e,a=""){return`
    <span class="orders-planning__caption-label">Produto</span>
    <strong class="orders-planning__caption-value">${Lt(e,a)?.label||"-"}</strong>
  `}function xt(e,a=""){const{metrics:t}=qt(e,a);return[{label:"Quantidade Total do Pedido",value:Ue(t.total),tone:"default"},{label:"Quantidade Planejada",value:Ue(t.planned),tone:"primary"},{label:"Quantidade Cancelada",value:Ue(t.canceled),tone:"primary"},{label:"Quantidade Pendente",value:Ue(t.pending),tone:"warning"}].map(o=>`
    <div class="orders-planning-metric">
      <span class="orders-planning-metric__label">${o.label}</span>
      <strong class="orders-planning-metric__value orders-planning-metric__value--${o.tone}">${o.value}</strong>
    </div>
  `).join("")}function _a(e,a={}){const t=a?.selectedPlanningProduct||Je(e),n=!!a?.showCanceledPlanning,o=Pt(e,t,n),i=new Set(a?.expandedPlanningByProduct?.[t]||[]);return`
    <h3 class="orders-planning__list-title">Planejamentos Realizados (${o.length})</h3>
    <div class="orders-planning__list" data-orders-planning-list>
      ${o.length?o.map(s=>xo(s,i.has(s.id))).join(""):'<div class="orders-planning__empty">Nenhum planejamento encontrado para este filtro.</div>'}
    </div>
  `}function xo(e,a=!1){return`
    <article class="orders-planning-item ${e.status==="cancelado"?"is-canceled":""}">
      <div class="orders-planning-item__header">
        <div class="orders-planning-item__title-wrap">
          <strong class="orders-planning-item__op">${e.op}</strong>
          ${Le({text:e.stage,variant:"light",style:"soft",size:"sm"})}
        </div>
        <strong class="orders-planning-item__quantity">${Ue(e.quantity)} un.</strong>
      </div>
      <p class="orders-planning-item__product">${e.product}</p>
      <button type="button" class="orders-planning-item__toggle" data-order-planning-toggle="${e.id}" aria-expanded="${a?"true":"false"}">
        <span>Ver detalhes</span>
        ${l("chevron-down",{size:14})}
      </button>
      <div class="orders-planning-item__details ${a?"is-open":""}">
        <div class="orders-planning-item__details-grid">
          <div><span class="orders-planning-item__label">Data do Planejamento</span><strong>${e.planningDate}</strong></div>
          <div><span class="orders-planning-item__label">Previsão de Entrega</span><strong>${e.deliveryDate}</strong></div>
          <div><span class="orders-planning-item__label">Data de Semeio</span><strong>${e.sowingDate}</strong></div>
          <div><span class="orders-planning-item__label">Dias após Semeio</span><strong>${e.daysAfterSowing}</strong></div>
          <div><span class="orders-planning-item__label">Responsável</span><strong>${e.responsible}</strong></div>
          <div class="orders-planning-item__actions">
            ${h({text:"Acessar OP",variant:"ghost",size:"sm",iconRight:"external-link"}).replace("<button",`<button data-order-planning-action="open-op" data-planning-id="${e.id}"`)}
          </div>
        </div>
      </div>
    </article>
  `}function zo(e,a,t={}){if(!e||!a)return;const n=e.querySelector("[data-orders-planning]"),o=n?.querySelector("[data-orders-planning-product-caption]"),i=n?.querySelector("[data-orders-planning-metrics]"),s=n?.querySelector("[data-orders-planning-list-wrap]");if(!o||!i||!s)return;const d=t.selectedPlanningProduct||Je(a);o.innerHTML=At(a,d),i.innerHTML=xt(a,d),s.innerHTML=_a(a,t)}function tt(e,a,t={}){if(!e||!a)return;const o=e.querySelector("[data-orders-planning]")?.querySelector("[data-orders-planning-list-wrap]");o&&(o.innerHTML=_a(a,t))}function Mo(e){return`
    <div class="orders-details-info">
      <section class="orders-details-section">
        <h3 class="orders-details-section__title">
          ${l("user",{size:14})}
          Informações do Cliente
        </h3>
        ${To(e.client)}
      </section>
      <section class="orders-details-section">
        <h3 class="orders-details-section__title">
          ${l("package",{size:14})}
          Itens do Pedido & Planejamento
        </h3>
        ${Bo(e.items)}
      </section>
      <section class="orders-details-section">
        <h3 class="orders-details-section__title">Resumo do Pedido</h3>
        ${No(e.summary)}
      </section>
      <div class="orders-details-info__term-wrap">
        ${h({text:"Gerar Termo de Aceite",variant:"info",style:"soft",size:"sm",iconLeft:"download"})}
      </div>
    </div>
  `}function Io({modalId:e="kanban-replan-item-modal",orderItemId:a=""}={}){const t=[{value:"falta-insumo",label:"Falta de insumo"},{value:"erro-planejamento",label:"Erro no planejamento"},{value:"capacidade",label:"Capacidade"},{value:"cliente-alterou",label:"Cliente alterou pedido"}],n=[{value:"estoque-venda-direta",label:"Estoque (Venda Direta)"},{value:"remessa-futura",label:"Remessa Futura"},{value:"vincular-ordem-producao",label:"Vincular Ordem de Produção"}];return Fe({id:e,title:"Replanejar Item",size:"md",className:"replan-modal",body:`
      <div class="replan-modal__content" data-replan-item="${a}">
        <div class="replan-modal__info">
          <span class="replan-modal__info-icon" aria-hidden="true">${l("info",{size:14})}</span>
          <p class="replan-modal__info-text">
            Este item foi cancelado da produção anterior. Informe o motivo e vincule a uma nova Ordem de Produção se necessário.
          </p>
        </div>

        <div class="replan-modal__field-wrap" data-replan-field="reason">
          ${se({id:"replan-reason",label:"Motivo do Replanejamento",required:!0,placeholder:"Selecionar...",items:t})}
          <span class="replan-modal__error" data-replan-error="reason" hidden>Campo obrigatório.</span>
        </div>

        <div class="replan-modal__field-wrap">
          ${Rt({id:"replan-notes",label:"Observações",rows:3})}
        </div>

        <div class="replan-modal__field-wrap" data-replan-field="op">
          ${se({id:"replan-op",label:"Vincular OP (Produção Própria)",required:!0,placeholder:"Selecionar...",items:n})}
          <p class="replan-modal__hint">Apenas OPs de produção própria ativas são exibidas.</p>
          <span class="replan-modal__error" data-replan-error="op" hidden>Campo obrigatório.</span>
        </div>
      </div>
    `,footer:`
      <div class="replan-modal__footer">
        ${h({text:"Cancelar",style:"outline",variant:"dark",size:"sm"}).replace("<button ",'<button data-replan-action="cancel" ')}
        ${h({text:"Confirmar Replanejamento",variant:"primary",size:"sm"}).replace("<button ",'<button data-replan-action="confirm" ')}
      </div>
    `})}function To(e){return`
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
  `}function Bo(e=[]){const a=`
    <div class="orders-item-table__header">
      <span>Produto</span>
      <span>Qtd. Pedido</span>
      <span>Valor Unitário</span>
      <span>Valor Total</span>
      <span>Qtd. Disponível</span>
      <span class="orders-item-table__actions-label">Ações</span>
    </div>
  `,t=e.map((n,o)=>{const i=Array.isArray(n.planning)&&n.planning.length>0,s=i?n.planning.map(d=>`
      <div class="orders-item-plan-row orders-item-plan-row--${d.type}">
        <div class="orders-item-plan-row__status">
          ${d.type==="planned"?`Planejado: ${d.amount}`:`Cancelado: ${d.amount}`}
        </div>
        <div class="orders-item-plan-row__meta">Data: ${d.date}</div>
        <div class="orders-item-plan-row__meta">Responsável: ${d.responsible}</div>
        <div class="orders-item-plan-row__meta">Quantidade: ${d.quantity}</div>
      </div>
    `).join(""):"";return`
      <article class="orders-item ${i&&o===0?"is-expanded":""}" data-order-item="${n.id}">
        <div class="orders-item__main">
          <button type="button" class="orders-item__toggle" data-order-item-toggle aria-label="Expandir item">
            ${l("chevron-down",{size:14})}
          </button>
          <span>${n.product}</span>
          <span>${n.quantity}</span>
          <span>${n.unitValue}</span>
          <span>${n.totalValue}</span>
          <span>${n.availableQuantity}</span>
          <div class="orders-item__actions">
            ${h({text:"Planejar",style:"outline",variant:"info",size:"sm"}).replace("<button ",'<button data-order-item-action="plan" ')}
            ${h({text:"Cancelar",style:"outline",variant:"danger",size:"sm"}).replace("<button ",'<button data-order-item-action="cancel" ')}
          </div>
        </div>
        ${i?`
          <div class="orders-item__planning">
            ${s}
            ${n.planning.some(d=>d.type==="canceled")?`
              <div class="orders-item__replan-wrap">
                ${h({text:"Replanejar",style:"text",variant:"dark",size:"sm",iconLeft:"edit"}).replace("<button ",'<button data-order-item-action="replan" ')}
              </div>
            `:""}
          </div>
        `:""}
      </article>
    `}).join("");return`
    <div class="orders-details-card orders-item-table">
      ${a}
      ${t}
    </div>
  `}function No(e){return`
    <div class="orders-details-card orders-summary-card">
      <div class="orders-summary-card__item">
        ${l("calendar",{size:14})}
        <div>
          <span class="orders-details-field__label">Data do Pedido</span>
          <strong class="orders-details-field__value">${e.orderDate}</strong>
        </div>
      </div>
      <div class="orders-summary-card__item">
        ${l("calendar",{size:14})}
        <div>
          <span class="orders-details-field__label">Entrega Prevista</span>
          <strong class="orders-details-field__value">${e.expectedDelivery}</strong>
        </div>
      </div>
      <div class="orders-summary-card__item">
        ${l("circle",{size:14})}
        <div>
          <span class="orders-details-field__label">Valor Total do Pedido</span>
          <strong class="orders-summary-card__value">${e.totalValue}</strong>
        </div>
      </div>
      <div class="orders-summary-card__item">
        ${l("file",{size:14})}
        <div>
          <span class="orders-details-field__label">Observação do Pedido</span>
          <strong class="orders-details-field__value">${e.notes}</strong>
        </div>
      </div>
    </div>
  `}function nt(){return`
    <div class="orders-details-footer">
      <div class="orders-details-footer__left">
        ${h({text:"Voltar",style:"outline",variant:"dark",size:"sm"}).replace("<button ",'<button data-pedido-drawer-action="back" ')}
      </div>
      <div class="orders-details-footer__right">
        ${h({text:"Cancelar Pedido Total",style:"outline",variant:"danger",size:"sm"}).replace("<button ",'<button data-pedido-drawer-action="cancel-total" ')}
      </div>
    </div>
  `}function Fo(){const e=document.getElementById("kanban-advanced-filters-btn");if(!e)return()=>{};const a=Ho(oe),t=oe===Z.PEDIDOS,n=t?zt():null,o="kanban-advanced-filters-drawer",i=document.querySelector(`[data-drawer="${o}"]`),s=document.querySelector(`[data-drawer-backdrop="${o}"]`);i&&i.remove(),s&&s.remove();const d=ye({id:o,title:"Filtros Avançados",width:540,content:Oo(a,{mode:oe,ordersFiltersState:n}),footer:Jo()});document.body.insertAdjacentHTML("beforeend",d);const b=ke({id:o,root:document}),y=document.querySelector(`[data-drawer="${o}"]`);if(!y||!b)return()=>{};const k=y.querySelector(".advanced-filters-footer"),x="kanban-save-filters-modal";let L=null,E=()=>{},g=0;const q=y.querySelector("#advanced-filters-tabs"),c=q?q.closest("[data-tabs]"):null,P=w=>{if(!k)return;const $=t&&w===1?"saved":"filter";k.dataset.activeTab=$},B=(w,$={})=>{if(!t||!a||!w)return;const{readOnly:u=!1}=$,S=a.items.find(Q=>Q.id===w);S&&(a.selectedId=w,a.draftName=S.name,a.draftSharing=[...S.sharing],a.readOnly=u,Ce(y,a))},T=()=>{!t||!a.selectedId||B(a.selectedId,{readOnly:!1})},K=()=>{if(!t||!a.selectedId)return;const w=y.querySelector("[data-saved-edit-name]"),$=w?w.closest(".field"):null,u=w?w.value.trim():"";if(!u){$&&$.classList.add("field--error"),w&&typeof w.focus=="function"&&w.focus();return}$&&$.classList.remove("field--error"),a.items=a.items.map(S=>S.id===a.selectedId?{...S,name:u,sharing:[...a.draftSharing||[]]}:S),a.draftName=u,a.readOnly=!1,Ce(y,a)},F=w=>{if(!c)return;const $=w.target.closest(".tabs-tab");if(!$||!c.contains($))return;const u=Number($.dataset.tab);if(Number.isNaN(u))return;const S=c.querySelectorAll(".tabs-tab"),Q=c.parentElement?.querySelectorAll(".tabs-panel");S.forEach((_,C)=>{_.classList.toggle("is-active",C===u),_.setAttribute("aria-selected",String(C===u))}),Q&&(Q.forEach((_,C)=>{_.classList.toggle("is-active",C===u)}),g=u,P(u))},X=w=>{const $=w.target.closest("[data-saved-footer-action]");if($&&t){const f=$.dataset.savedFooterAction;f==="cancel"&&T(),f==="save"&&K();return}const u=w.target.closest("[data-saved-action]");if(u){const f=u.dataset.savedAction,z=u.closest("[data-saved-filter-item]"),A=z?z.dataset.savedFilterItem:"";if(!A)return;if(t){if(f==="edit"){B(A,{readOnly:!1});return}if(f==="delete"){if(a.items=a.items.filter(N=>N.id!==A),!a.items.length)a.selectedId="",a.draftName="",a.draftSharing=[],a.readOnly=!1;else if(a.selectedId===A){const N=a.items[0];B(N.id,{readOnly:!1});return}Ce(y,a);return}if(f==="view"){B(A,{readOnly:!0});return}if(f==="cancel-edit"){T();return}if(f==="save-edit"){K();return}}if(f==="edit"){a.editingId=A,Ce(y,a);return}if(f==="delete"){a.items=a.items.filter(N=>N.id!==A),a.editingId===A&&(a.editingId=""),a.selectedId===A&&(a.selectedId=""),Ce(y,a);return}if(f==="view"){a.selectedId=A,console.log("Visualizar filtro salvo",A),Ce(y,a);return}if(f==="cancel-edit"){a.editingId="",Ce(y,a);return}if(f==="save-edit"){const N=z.querySelector("[data-saved-edit-name]"),ee=N?N.closest(".field"):null,G=N?N.value.trim():"";if(!G){ee&&ee.classList.add("field--error"),N&&N.focus();return}ee&&ee.classList.remove("field--error"),a.items=a.items.map(R=>R.id===A?{...R,name:G}:R),a.editingId="",Ce(y,a);return}}if(t){const f=w.target.closest("[data-saved-filter-select]");if(f){const A=f.closest("[data-saved-filter-item]"),N=A?A.dataset.savedFilterItem:"";if(!N)return;B(N,{readOnly:!1});return}const z=w.target.closest("[data-saved-share-remove]");if(z){const A=z.dataset.savedShareRemove;if(!A)return;a.draftSharing=(a.draftSharing||[]).filter(N=>N!==A),Ce(y,a);return}}const S=w.target.closest("[data-filters-action]");if(S){const f=S.dataset.filtersAction;if(t&&n){if(f==="apply"){const z=jo(y,n);window.dispatchEvent(new CustomEvent("orders:filters:apply",{detail:z})),b.close();return}if(f==="clear"){Vo(y,n);return}}else f==="apply"&&console.log("Aplicar filtros"),f==="clear"&&console.log("Limpar filtros");f==="save"&&H(S);return}const Q=w.target.closest('[data-action="remove"]');if(Q){const f=Q.closest(".chip");if(!f||!y.contains(f))return;if(t&&n){const z=f.dataset.ordersActiveChip;if(z){n.activeFilters=n.activeFilters.filter(A=>A.id!==z),It(y,n);return}}f.remove();return}const _=w.target.closest("[data-order-option]");if(_){const f=_.closest("[data-order-options]");if(!f)return;f.querySelectorAll("[data-order-option]").forEach(z=>{z.classList.toggle("is-active",z===_)});return}const C=w.target.closest("[data-active-filters-toggle]");if(!C)return;const I=y.querySelector(".advanced-filters-active");if(!I)return;const M=I.classList.toggle("is-collapsed");C.setAttribute("aria-expanded",String(!M))},p=w=>{if(!t||!w.target)return;const $=w.target.closest("[data-saved-edit-name]");if(!$)return;a.draftName=$.value;const u=$.closest(".field");u&&u.classList.remove("field--error")},r=()=>{b.open(e)},D=({restoreFocus:w=!0}={})=>{const $=document.querySelector(`[data-modal="${x}"]`),u=document.querySelector(`[data-modal-backdrop="${x}"]`);!$||!u||(E(),Ae(x),y.classList.contains("is-open")&&(document.body.style.overflow="hidden"),$.remove(),u.remove(),w&&L&&typeof L.focus=="function"&&L.focus(),L=null)},H=w=>{const $=document.querySelector(`[data-modal="${x}"]`),u=document.querySelector(`[data-modal-backdrop="${x}"]`);$&&$.remove(),u&&u.remove(),L=w||null,document.body.insertAdjacentHTML("beforeend",Yo({modalId:x}));const S=document.querySelector(`[data-modal="${x}"]`),Q=document.querySelector(`[data-modal-backdrop="${x}"]`);if(!S||!Q)return;const _=S.querySelector("#save-filters-name-input"),C=S.querySelector(".field"),I=S.querySelector("[data-save-filters-error]"),M=S.querySelector("[data-save-modal-cancel]"),f=S.querySelector("[data-modal-close]"),z=S.querySelector("[data-save-modal-submit]"),A=J=>{I&&(I.hidden=!J),C&&C.classList.toggle("field--error",J)},N=J=>{J.target===Q&&D()},ee=()=>D(),G=()=>D(),R=()=>{if(!_)return;const J=_.value.trim();if(!J){A(!0),_.focus();return}A(!1),console.log({nomeFiltro:J}),D()},U=()=>A(!1),j=J=>{J.key==="Escape"&&(J.preventDefault(),D())};Q.addEventListener("click",N),M&&M.addEventListener("click",ee),f&&f.addEventListener("click",G),z&&z.addEventListener("click",R),_&&_.addEventListener("input",U),document.addEventListener("keydown",j),E=()=>{Q.removeEventListener("click",N),M&&M.removeEventListener("click",ee),f&&f.removeEventListener("click",G),z&&z.removeEventListener("click",R),_&&_.removeEventListener("input",U),document.removeEventListener("keydown",j),E=()=>{}},xe(x),_&&typeof _.focus=="function"&&requestAnimationFrame(()=>_.focus())};return c&&c.addEventListener("click",F),P(g),y.addEventListener("click",X),y.addEventListener("input",p),e.addEventListener("click",r),()=>{D({restoreFocus:!1}),e.removeEventListener("click",r),c&&c.removeEventListener("click",F),y.removeEventListener("click",X),y.removeEventListener("input",p),b.cleanup&&b.cleanup();const w=document.querySelector(`[data-drawer="${o}"]`),$=document.querySelector(`[data-drawer-backdrop="${o}"]`);w&&w.remove(),$&&$.remove()}}function Oo(e,a={}){const{mode:t=Z.PRODUCAO,ordersFiltersState:n=null}=a;return`<section class="advanced-filters">${oa({id:"advanced-filters-tabs",variant:"underlined",fullWidth:!0,activeTab:0,tabs:[{label:"Filtro",content:t===Z.PEDIDOS?Ro(n):Ko()},{label:"Filtros Salvos",content:Qo(e,{mode:t})}]})}</section>`}function zt(){const e=[{id:"status",label:"Status: 6 selecionados",kind:"alert"},{id:"date-between",label:"Data entre: 22/12/25 + 01/01/26",kind:"neutral"},{id:"code",label:"Código: 2233",kind:"neutral"},{id:"client-1",label:"Cliente: A2W",kind:"muted"},{id:"client-2",label:"Cliente: A2W",kind:"muted"},{id:"client-3",label:"Cliente: A2W",kind:"muted"},{id:"client-4",label:"Cliente: A2W",kind:"muted"}];return{defaultActiveFilters:e.map(a=>({...a})),activeFilters:e.map(a=>({...a}))}}function Ro(e){const a=e||zt(),t=`
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/>
      <path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,n=se({id:"advanced-filter-selected",label:"Filtro selecionado",required:!0,placeholder:"",value:"relatorio-mensal",items:[{label:"Relatório Mensal",value:"relatorio-mensal"}]}),o=ot({id:"advanced-filter-show-inactive",label:"Mostrar inativos",size:"sm"}),i=sa({id:"advanced-filter-except",label:"Exceto",checked:!1}),s=se({id:"advanced-filter-data-type",label:"Tipo de Data",placeholder:"Selecione o tipo de data",items:[{label:"Data de pedido",value:"pedido"},{label:"Data de entrega",value:"entrega"},{label:"Data de faturamento",value:"faturamento"}]}),d=v({id:"advanced-filter-start-date",type:"date",label:"Data inicial",placeholder:"00/00/0000",iconRight:t}),b=v({id:"advanced-filter-end-date",type:"date",label:"Data final",placeholder:"00/00/0000",iconRight:t}),y=v({id:"advanced-filter-order-code-a2w",label:"Código Pedido A2W",placeholder:"Digite o código do pedido"}),k=v({id:"advanced-filter-order-code-tawros",label:"Código Pedido TAWROS",placeholder:"Digite o código"}),x=v({id:"advanced-filter-client-code",label:"Código do Cliente",placeholder:"Digite o código do pedido"}),L=v({id:"advanced-filter-cpf-cnpj",label:"CPF/CNPJ",placeholder:"Digite o nome do cliente"}),E=v({id:"advanced-filter-business-name",label:"Razão Social/Nome",placeholder:"Digite o nome da Razão Social"}),g=v({id:"advanced-filter-fantasy-name",label:"Nome Fantasia/Apelido",placeholder:"Digite o Nome Fantasia"}),q=v({id:"advanced-filter-product-code",label:"Código Produto",placeholder:"Digite o código do produto"}),c=se({id:"advanced-filter-product",label:"Produto",placeholder:"( Nome do produto )",items:[{label:"Muda de Eucalipto Clone AEC 144",value:"muda-eucalipto-aec-144"},{label:"Muda de Eucalipto Clone AEC 224",value:"muda-eucalipto-aec-224"}]}),P=se({id:"advanced-filter-class",label:"Classe",placeholder:"Selecione a classe",items:[{label:"Classe A",value:"classe-a"},{label:"Classe B",value:"classe-b"}]}),B=v({id:"advanced-filter-min-quantity",label:"Quantidade Mínima",placeholder:"Quantidade"}),T=v({id:"advanced-filter-max-quantity",label:"Quantidade Máxima",placeholder:"Quantidade"}),K=v({id:"advanced-filter-min-value",label:"Valor Mínimo",placeholder:"R$ 00,00"}),F=v({id:"advanced-filter-max-value",label:"Valor Máximo",placeholder:"R$ 00,00"}),X=ta({id:"advanced-filter-status",label:"Status",chips:[re({label:"Bloqueado",value:"bloqueado",size:"sm"}),re({label:"Em Produção",value:"em-producao",size:"sm"}),re({label:"Expedição",value:"expedicao",size:"sm"})]}),p=Nt(),r=se({id:"advanced-filter-sorting-type",label:"Tipo de ordenação",required:!0,placeholder:"Selecione",items:[{label:"Crescente",value:"asc"},{label:"Decrescente",value:"desc"}]}),D=Ft();return`
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
          ${Mt(a)}
        </div>
      </div>
      <div class="advanced-filters-inline">
        ${o}
        ${i}
      </div>
      <div class="advanced-filters-grid">
        ${s}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${d}
        ${b}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${y}
        ${k}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${x}
        ${L}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${E}
        ${g}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${q}
        ${c}
      </div>
      <div class="advanced-filters-grid">
        ${P}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${B}
        ${T}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${K}
        ${F}
      </div>
      <div class="advanced-filters-grid">
        ${X}
      </div>
      <div class="advanced-filters-grid">
        ${p}
      </div>
      <div class="advanced-filters-grid">
        ${r}
      </div>
      <div class="advanced-filters-grid">
        ${D}
      </div>
    </form>
  `}function Mt(e){return(e?.activeFilters||[]).map(t=>{const n=t.kind==="alert"?"advanced-filters-chip--alert":t.kind==="muted"?"advanced-filters-chip--muted":"";return re({label:t.label,value:t.id,size:"sm",className:n}).replace("<button ",`<button data-orders-active-chip="${t.id}" `)}).join("")}function It(e,a){if(!e)return;const t=e.querySelector("[data-active-filters]");t&&(t.innerHTML=Mt(a))}function Vo(e,a){if(!e||!a)return;const t=e.querySelector("[data-orders-filters-form]");t&&typeof t.reset=="function"&&t.reset();const n=e.querySelector("#advanced-filter-selected");n&&(n.value="relatorio-mensal");const o=e.querySelector("#advanced-filter-sorting-type");o&&(o.value=""),e.querySelectorAll("[data-order-option]").forEach(s=>{s.classList.toggle("is-active",s.dataset.orderOption==="recentes")}),a.activeFilters=a.defaultActiveFilters.map(s=>({...s})),It(e,a)}function jo(e,a){if(!e)return{};const t=e.querySelector("[data-orders-filters-form]"),n=t?new FormData(t):new FormData,o=b=>(n.get(b)||"").toString().trim(),i=e.querySelector("[data-order-option].is-active"),s=Array.from(e.querySelectorAll("#advanced-filter-status .chip-label")).map(b=>b.textContent?.trim()).filter(Boolean),d={cliente:!!e.querySelector("#advanced-filter-group-client:checked"),classe:!!e.querySelector("#advanced-filter-group-class:checked"),produto:!!e.querySelector("#advanced-filter-group-product:checked"),pedidos:!!e.querySelector("#advanced-filter-group-order:checked")};return{selectedFilter:o("advanced-filter-selected"),activeFilters:(a?.activeFilters||[]).map(b=>b.label),showInactive:!!e.querySelector("#advanced-filter-show-inactive:checked"),except:!!e.querySelector("#advanced-filter-except:checked"),dateType:o("advanced-filter-data-type"),startDate:o("advanced-filter-start-date"),endDate:o("advanced-filter-end-date"),orderCodeA2W:o("advanced-filter-order-code-a2w"),orderCodeTawros:o("advanced-filter-order-code-tawros"),clientCode:o("advanced-filter-client-code"),cpfCnpj:o("advanced-filter-cpf-cnpj"),businessName:o("advanced-filter-business-name"),fantasyName:o("advanced-filter-fantasy-name"),productCode:o("advanced-filter-product-code"),product:o("advanced-filter-product"),className:o("advanced-filter-class"),quantityMin:o("advanced-filter-min-quantity"),quantityMax:o("advanced-filter-max-quantity"),valueMin:o("advanced-filter-min-value"),valueMax:o("advanced-filter-max-value"),status:s,sortBy:i?.dataset.orderOption||"recentes",sortingType:o("advanced-filter-sorting-type"),groupBy:d}}function Ho(e=Z.PRODUCAO){const a=[{id:"saved-filter-1",name:"Relatório Mensal",sharing:["Vitor (Gerente)","Equipe de Vendas"]},{id:"saved-filter-2",name:"Filtro Relatório Mensal 2",sharing:["Vitor (Gerente)","Equipe de Vendas"]},{id:"saved-filter-3",name:"Relatório Mensal 33",sharing:["Vitor (Gerente)","Equipe de Vendas"]},{id:"saved-filter-4",name:"Relatório Anual",sharing:["Vitor (Gerente)","Equipe de Vendas"]}];return e===Z.PEDIDOS?{mode:e,items:a,selectedId:a[0]?.id||"",draftName:a[0]?.name||"",draftSharing:[...a[0]?.sharing||[]],readOnly:!1}:{mode:e,items:a,editingId:"saved-filter-1",selectedId:""}}function Qo(e,a={}){const{mode:t=Z.PRODUCAO}=a;return t===Z.PEDIDOS?Go(e):`
    <div class="saved-filters-panel" data-saved-filters-panel>
      ${Bt(e)}
    </div>
  `}function Ce(e,a){if(!e)return;const t=e.querySelector("[data-saved-filters-panel]");if(t){if(a?.mode===Z.PEDIDOS){t.innerHTML=Tt(a);return}t.innerHTML=Bt(a)}}function Go(e){return`
    <div class="saved-filters-panel saved-filters-panel--orders" data-saved-filters-panel>
      ${Tt(e)}
    </div>
  `}function Tt(e){const a=e?.items?.find(s=>s.id===e.selectedId)||null,t=e?.draftName??a?.name??"",o=(e?.draftSharing??a?.sharing??[]).map((s,d)=>e?.readOnly?Ee({label:s,value:`saved-sharing-${d}`,size:"sm",className:"saved-filter-edit__chip saved-filter-edit__chip--readonly"}):re({label:s,value:`saved-sharing-${d}`,size:"sm",className:"saved-filter-edit__chip"}).replace("<button ",`<button data-saved-share-remove="${s}" `)).join("");return`
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
          ${v({id:"orders-saved-filter-name",label:"Nome do filtro",value:t,readonly:!!e?.readOnly}).replace('class="input"','class="input" data-saved-edit-name')}
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
        ${e.items.map(s=>Uo(s,e)).join("")}
      </div>
    `}
  `}function Uo(e,a){return`
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
  `}function Bt(e){return e.items.length?e.items.map(a=>Wo(a,e)).join(""):'<div class="advanced-filters-empty">Nenhum filtro salvo.</div>'}function Wo(e,a){const t=a.editingId===e.id,n=a.selectedId===e.id,o=e.sharing.map((i,s)=>re({label:i,value:`${e.id}-share-${s}`,size:"sm"})).join("");return`
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
          ${v({id:`saved-filter-name-${e.id}`,label:"Nome do filtro",value:e.name,className:"saved-filter-item__edit-name"}).replace('class="input"','class="input" data-saved-edit-name')}
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
  `}function Ko(){const e=`
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/>
      <path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,a=se({id:"advanced-filter-selected",label:"Filtro selecionado",required:!0,placeholder:"",value:"relatorio-mensal",items:[{label:"Relatório Mensal",value:"relatorio-mensal"}]}),t=[re({label:"Status: 6 selecionados",value:"status-6",size:"sm",className:"advanced-filters-chip--alert"}),re({label:"Data entre: 22/12/25 + 01/01/26",value:"data-entre",size:"sm"}),re({label:"Código: 2233",value:"codigo",size:"sm"}),re({label:"Cliente: A2W",value:"cliente-1",size:"sm"}),re({label:"Cliente: A2W",value:"cliente-2",size:"sm"}),re({label:"Cliente: A2W",value:"cliente-3",size:"sm"}),re({label:"Cliente: A2W",value:"cliente-4",size:"sm"})].join(""),n=ot({id:"advanced-filter-show-inactive",label:"Mostrar inativos",size:"sm"}),o=sa({id:"advanced-filter-except",label:"Exceto",checked:!1}),i=se({id:"advanced-filter-data-type",label:"Tipo de Data",placeholder:"Selecione o tipo de data",items:[{label:"Data de pedido",value:"pedido"},{label:"Data de início",value:"inicio"}]}),s=v({id:"advanced-filter-start-date",type:"date",label:"Data inicial",placeholder:"00/00/0000",iconRight:e}),d=v({id:"advanced-filter-end-date",type:"date",label:"Data final",placeholder:"00/00/0000",iconRight:e}),b=v({id:"advanced-filter-order-code",label:"Código Pedido",placeholder:"Digite o código do pedido"}),y=v({id:"advanced-filter-tawros-code",label:"Código TAWROS",placeholder:"Digite o código"}),k=v({id:"advanced-filter-client-code",label:"Código do Cliente",placeholder:"Digite o código do cliente"}),x=v({id:"advanced-filter-cpf-cnpj",label:"CPF/CNPJ",placeholder:"Digite o nome do cliente"}),L=v({id:"advanced-filter-business-name",label:"Razão Social/Nome",placeholder:"Digite o nome da Razão Social"}),E=v({id:"advanced-filter-fantasy-name",label:"Nome Fantasia/Apelido",placeholder:"Digite o Nome Fantasia"}),g=se({id:"advanced-filter-class",label:"Classe",placeholder:"Selecione a classe",items:[{label:"Classe A",value:"a"},{label:"Classe B",value:"b"}]}),q=v({id:"advanced-filter-product-code",label:"Código Produto",placeholder:"Digite o código do produto"}),c=se({id:"advanced-filter-product",label:"Produto",placeholder:"Nome do produto",items:[{label:"Tomate Cereja",value:"tomate-cereja"},{label:"Tomate Italiano",value:"tomate-italiano"}]}),P=v({id:"advanced-filter-min-quantity",label:"Quantidade Mínima",placeholder:"Quantidade"}),B=v({id:"advanced-filter-max-quantity",label:"Quantidade Máxima",placeholder:"Quantidade"}),T=ta({label:"Tipo",chips:[re({label:"Enxerto",value:"enxerto",size:"sm"}),re({label:"Porta Enxerto",value:"porta-enxerto",size:"sm"})]}),K=ta({label:"Status",chips:[re({label:"Bloqueado",value:"bloqueado",size:"sm"}),re({label:"Em Produção",value:"em-producao",size:"sm"}),re({label:"Expedição",value:"expedicao",size:"sm"})]}),F=Nt(),X=se({id:"advanced-filter-sorting-type",label:"Tipo de ordenação",required:!0,placeholder:"Selecione",items:[{label:"Crescente",value:"asc"},{label:"Decrescente",value:"desc"}]}),p=ta({label:"Etiqueta",chips:[re({label:"Normal",value:"normal",size:"sm"}),re({label:"Urgente",value:"urgente",size:"sm"})]}),r=Ft();return`
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
        ${i}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${s}
        ${d}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${b}
        ${y}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${k}
        ${x}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${L}
        ${E}
      </div>
      <div class="advanced-filters-grid">
        ${g}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${q}
        ${c}
      </div>
      <div class="advanced-filters-grid">
        ${T}
      </div>
      <div class="advanced-filters-grid advanced-filters-grid--two-cols">
        ${P}
        ${B}
      </div>
      <div class="advanced-filters-grid">
        ${K}
      </div>
      <div class="advanced-filters-grid">
        ${F}
      </div>
      <div class="advanced-filters-grid">
        ${X}
      </div>
      <div class="advanced-filters-grid">
        ${p}
      </div>
      <div class="advanced-filters-grid">
        ${r}
      </div>
    </div>
  `}function ta({id:e="",label:a,chips:t}){const n=t.join("");return`
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
  `}function Nt(){return`
    <div class="advanced-filters-sort">
      <span class="advanced-filters-sort__label">Ordenar por</span>
      <div class="advanced-filters-sort__options" data-order-options>
        <button type="button" class="advanced-filters-sort__option is-active" data-order-option="recentes">Mais recentes</button>
        <button type="button" class="advanced-filters-sort__option" data-order-option="antigos">Mais antigos</button>
        <button type="button" class="advanced-filters-sort__option" data-order-option="maior-valor">Maior valor</button>
        <button type="button" class="advanced-filters-sort__option" data-order-option="menor-valor">Menor valor</button>
      </div>
    </div>
  `}function Ft(){return`
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
      ${sa({id:t.id,label:t.label,checked:t.checked,size:"sm"})}
      <span class="advanced-filters-group__drag" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M6 3H6.01M10 3H10.01M6 8H6.01M10 8H10.01M6 13H6.01M10 13H10.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </span>
    </div>
  `).join("")}</div>
    </div>
  `}function Jo(){const e=h({text:"Salvar Filtros",style:"outline",variant:"dark",size:"sm",type:"button"}).replace("<button ",'<button data-filters-action="save" '),a=h({text:"Limpar Filtros",style:"outline",variant:"dark",size:"sm",type:"button"}).replace("<button ",'<button data-filters-action="clear" '),t=h({text:"Aplicar Filtros",variant:"primary",size:"sm",type:"button"}).replace("<button ",'<button data-filters-action="apply" '),n=h({text:"Cancelar",style:"outline",variant:"dark",size:"sm",type:"button"}).replace("<button ",'<button data-saved-footer-action="cancel" '),o=h({text:"Salvar",variant:"primary",size:"sm",type:"button"}).replace("<button ",'<button data-saved-footer-action="save" ');return`
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
  `}function Yo({modalId:e}){const a=v({id:"save-filters-name-input",label:"Nome do filtro",required:!0,placeholder:"Insira um nome para filtro"}),t=h({text:"Cancelar",style:"outline",variant:"dark",type:"button"}).replace("<button ","<button data-save-modal-cancel "),n=h({text:"Salvar",variant:"primary",type:"button"}).replace("<button ","<button data-save-modal-submit ");return Fe({id:e,type:"center",size:"sm",title:"Salvar Filtros",body:`
      <div class="advanced-save-modal__body">
        ${a}
        <span class="advanced-save-modal__error" data-save-filters-error hidden>Nome do filtro é obrigatório.</span>
      </div>
    `,footer:`
      <div class="advanced-save-modal__footer">
        ${t}
        ${n}
      </div>
    `,closable:!0})}const ps=Object.freeze(Object.defineProperty({__proto__:null,init:hn},Symbol.toStringTag,{value:"Module"}));export{h as c,ps as k};
