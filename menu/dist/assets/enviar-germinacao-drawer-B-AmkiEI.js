import{i as E,c as P}from"./drawer-BhhtaBzO.js";import{c as C}from"./tabs-Bc_csLdm.js";import{i as q,b as A,c as u,a as z}from"./input-BGfEK18X.js";import{c as p}from"./kanban-Jv3Gvy1m.js";import{a as S}from"./chip-Iox8iBys.js";import{i as t}from"./icons-C9wddX8K.js";/* empty css                                 *//* empty css               *//* empty css             *//* empty css              */import"./index-nkyJuKF6.js";/* empty css              */import"./checkbox-Czn0aMdg.js";/* empty css                 */import"./toggle-8KHLMbPj.js";/* empty css               *//* empty css               */import"./toast-CGbnOkVX.js";/* empty css              */import"./file-upload-BWgfDtFs.js";/* empty css                    */import"./table-Bhr5kK3b.js";/* empty css              *//* empty css             */const g="kanban-enviar-germinacao-drawer";function d(e,s,n=""){return`
    <article class="eg-stats-card">
      <span class="eg-stats-card__label">${e}</span>
      <strong class="eg-stats-card__value">${s}</strong>
      ${n?`<span class="eg-stats-card__tag">${n}</span>`:""}
    </article>
  `}function D(){return`
    <button type="button" class="btn btn--outline-dark btn--sm eg-qr-btn">
      <img src="/assets/qrcode.png" alt="" aria-hidden="true" />
      <span>Gerar QR Code</span>
    </button>
  `}function L(){return`
    <article class="eg-table-card">
      <button type="button" class="eg-table-card__header" aria-expanded="true">
        <span class="eg-table-card__icon" aria-hidden="true">${t("chevron-down",{size:14})}</span>
        <span>Bandeja 128 células</span>
      </button>
      <div class="eg-table-wrap">
        <table class="eg-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Produto</th>
              <th>Unidade</th>
              <th>Embalagem</th>
              <th>Quantidade</th>
              <th>Quantidade Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>002</td>
              <td>Bandeja 128</td>
              <td>128</td>
              <td>UN</td>
              <td>40</td>
              <td>6.144</td>
              <td>
                <div class="eg-table-actions">
                  <button type="button" class="eg-icon-btn" aria-label="Editar">${t("edit",{size:14})}</button>
                  <button type="button" class="eg-icon-btn eg-icon-btn--danger" aria-label="Excluir">${t("trash",{size:14})}</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  `}function T(){const e=[{label:"SEM-2024-001 - Lote A (Disp: 50kg)",value:"SEM-2024-001 - Lote A (Disp: 50kg)"},{label:"SEM-2024-002 - Lote A (Disp: 50kg)",value:"SEM-2024-002 - Lote A (Disp: 50kg)"}];return`
    <section class="enviar-germinacao-drawer__panel">
      <section class="eg-section eg-section--actions">
        ${D()}
      </section>

      <section class="eg-section">
        <article class="eg-quick-card">
          <div class="eg-quick-block">
            <div class="eg-quick-info">
              <span class="eg-quick-icon" aria-hidden="true">${t("home",{size:12})}</span>
              <div class="eg-quick-card__cell">
                <span class="eg-caption">Sala de Semeio</span>
                <strong>Baia 01</strong>
              </div>
            </div>
            <button type="button" class="eg-inline-link">${t("grid",{size:12})}<span>Consultar localização</span></button>
          </div>
          <div class="eg-quick-block eg-quick-block--metrics">
            <div class="eg-quick-info">
              <span class="eg-quick-icon" aria-hidden="true">${t("calendar",{size:12})}</span>
              <div class="eg-quick-card__cell">
                <span class="eg-caption">Data de Semeio</span>
                <strong>15/01/2025</strong>
              </div>
            </div>
            <div class="eg-quick-card__cell">
              <span class="eg-caption">Dias após Semeio</span>
              <strong>2 dias</strong>
            </div>
          </div>
          <div class="eg-quick-block eg-quick-block--timeline">
            <div class="eg-quick-card__timeline">
              <div class="eg-quick-card__date">
                <span class="eg-caption">Data de Entrada</span>
                <div class="eg-quick-date-row">
                  <span class="eg-quick-icon" aria-hidden="true">${t("calendar",{size:12})}</span>
                  <strong>15/01</strong>
                </div>
                <span class="eg-quick-date-sub">Quarta-feira</span>
              </div>
              <div class="eg-quick-card__days">
                <strong>2</strong>
                <span>Dias Corridos</span>
              </div>
              <div class="eg-quick-card__date eg-quick-card__date--right">
                <span class="eg-caption">Previsão de Saída</span>
                <div class="eg-quick-date-row eg-quick-date-row--right">
                  <strong>18/01</strong>
                  <span class="eg-quick-icon" aria-hidden="true">${t("calendar",{size:12})}</span>
                </div>
                <span class="eg-quick-date-sub">Segunda-feira</span>
              </div>
            </div>
            <div class="eg-progress">
              <div class="eg-progress__legend">
                <span>Progresso Atual: 66%</span>
                <span>Meta: 3 dias</span>
              </div>
              <div class="eg-progress__line"><span style="width: 66%"></span></div>
            </div>
          </div>
        </article>
      </section>

      <section class="eg-section">
        <h3 class="eg-section__title">Informações do Produto</h3>
        <article class="eg-group-card eg-group-card--product">
          <header class="eg-group-card__head">
            <span class="eg-group-card__kind">Enxerto</span>
            <span class="eg-group-card__meta">Cód. Produto: <strong>0001</strong></span>
            <span class="eg-group-card__meta">Produto: <strong>Muda de Eucalipto Clone</strong></span>
            <span class="eg-group-card__meta">Qtd. Bandejas: <strong>20 un</strong></span>
          </header>
          <div class="eg-stats-grid">
            ${d("Qtd. a Produzir","5.556")}
            ${d("Perda Estimada","556","+10%")}
            ${d("Qtd. Esperada","5.000")}
          </div>
        </article>
      </section>

      <section class="eg-section">
        <h3 class="eg-section__title">Informações para Semeio</h3>
        <article class="eg-group-card">
          <header class="eg-group-card__head">
            <span>Enxerto</span>
            <span>Cód. Produto: <strong>0001</strong></span>
            <span>Produto: <strong>Muda de Eucalipto Clone</strong></span>
            <span>Qtd. Bandejas: <strong>20 un</strong></span>
          </header>
          <div class="eg-stats-grid">
            ${d("Qtd. a Semear","5.556")}
            ${d("Perda Estimada","556","+10%")}
            ${d("Qtd. Esperada","5.000")}
          </div>
        </article>
        <article class="eg-group-card">
          <header class="eg-group-card__head">
            <span>Porta-enxerto</span>
            <span>Cód. Produto: <strong>0001</strong></span>
            <span>Produto: <strong>Muda de Eucalipto Clone</strong></span>
            <span>Qtd. Bandejas: <strong>20 un</strong></span>
          </header>
          <div class="eg-stats-grid">
            ${d("Qtd. a Semear","5.556")}
            ${d("Perda Estimada","556","+10%")}
            ${d("Qtd. Esperada","5.000")}
          </div>
        </article>
      </section>

      <section class="eg-section">
        <div class="eg-section__header">
          <h3 class="eg-section__title">Insumos</h3>
          ${p({text:"+ Adicionar Insumo",variant:"outline-dark",size:"sm"})}
        </div>
        <article class="eg-card">
          <div class="eg-grid eg-grid--two">
            ${A({id:"eg-classe",label:"Classe",name:"classe",value:e[0].value,items:e})}
            ${u({id:"eg-codigo-produto",label:"Código do Produto",name:"codigoProduto",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${u({id:"eg-produto",label:"Produto",name:"produto",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${u({id:"eg-unidade",label:"Unidade",name:"unidade",value:"SEM-2024-001 - Lote A (Disp: 50kg)"})}
            ${u({id:"eg-embalagem",label:"Embalagem",name:"embalagem",value:"Clone AEC 144"})}
            ${u({id:"eg-quantidade",label:"Quantidade",name:"quantidade",value:"AgriSeeds"})}
          </div>
          <div class="eg-card__actions">
            ${p({text:"Cancelar",variant:"outline-dark",size:"sm"})}
            ${p({text:"Salvar",variant:"primary",size:"sm"})}
          </div>
        </article>
      </section>

      <section class="eg-section">
        ${L()}
      </section>

      <section class="eg-section eg-section--footer">
        <div class="eg-grid eg-grid--two">
          <div class="eg-location-field">
            <div class="eg-location-head">
              <span class="eg-label-inline">Localização<span class="eg-required">*</span></span>
              <button type="button" class="eg-inline-link eg-inline-link--small">Consultar localização</button>
            </div>
            ${z({id:"eg-localizacao",name:"localizacao",placeholder:"Buscar",required:!0})}
          </div>
          ${u({id:"eg-data-encerramento",type:"date",label:"Data encerramento da etapa",name:"dataEncerramento",required:!0,className:"eg-date-field",iconRight:t("calendar",{size:16})})}
          ${u({id:"eg-responsavel",label:"Responsável",name:"responsavel",required:!0,placeholder:"Nome do responsável"})}
        </div>
        <div class="eg-bottom-actions">
          ${p({text:"Voltar Etapa",variant:"error",style:"outline",size:"sm"}).replace("<button",'<button data-eg-action="voltar-etapa"')}
          <div class="eg-bottom-actions__right">
            ${p({text:"Cancelar",variant:"outline-dark",size:"sm"}).replace("<button",'<button data-eg-action="cancelar"')}
            ${p({text:"Enviar para a Germinação",variant:"primary",size:"sm"}).replace("<button",'<button data-eg-action="enviar-germinacao"')}
          </div>
        </div>
      </section>
    </section>
  `}function f(e){return`<div class="enviar-germinacao-drawer__placeholder">${e}</div>`}function a(e,s){return`
    <div class="semeio-details-field">
      <span class="semeio-details-field__label">${e}</span>
      <strong class="semeio-details-field__value">${s}</strong>
    </div>
  `}function x(){return`
    <section class="semeio-details-panel">
      <section class="semeio-details-section">
        <h3 class="semeio-details-section__title">Planejamento e Datas</h3>
        <div class="semeio-details-box">
          <div class="semeio-details-grid semeio-details-grid--three">
            ${a("Data do Pedido","15/01/2025")}
            ${a("Data Agendada do Semeio","15/01/2025")}
            ${a("Responsável agendamento","João da Silva")}
          </div>
        </div>
        ${D()}
      </section>

      <section class="semeio-details-section">
        <h3 class="semeio-details-section__title">Informações Gerais</h3>
        <div class="semeio-details-box">
          <div class="semeio-details-grid semeio-details-grid--three">
            ${a("Código do Pedido","001")}
            ${a("Código ERP","43242343")}
            ${a("CPF/CNPJ","123.456.789-00")}
            ${a("Cód. Cliente","001")}
            ${a("Cód. Pedido A2W","001")}
            ${a("Cód. Pedido TAWROS","001")}
            ${a("Razão Social/Nome","Nome da razao social")}
            ${a("Nome Fantasia/Apelido","Nome fantasia")}
            ${a("Nome do Cliente","2.343")}
            ${a("Nome do Vendedor","Nome vendedor")}
            ${a("Classe","Muda de Eucalipto Clone AEC 144")}
            ${a("Cód. do Produto","43423432")}
            ${a("Quantidade","5.000")}
            ${a("Produto","Muda de Eucalipto Clone")}
          </div>
        </div>
        ${p({text:"Ver pedido",variant:"outline-dark",size:"sm"})}
      </section>
    </section>
  `}function b({title:e,content:s="",collapsed:n=!1,showCaption:i=!1}){return`
    <div class="semeio-details-accordion ${n?"is-collapsed":""}" data-semeio-details-accordion>
      <button type="button" class="semeio-details-accordion__header" aria-expanded="${String(!n)}" data-semeio-details-toggle>
        <span class="semeio-details-accordion__icon" aria-hidden="true">${t("chevron-right",{size:12})}</span>
        <span>${e}</span>
      </button>
      ${i?`<div class="semeio-details-production__stage-caption">${t("chevron-down",{size:12})}<span>Detalhes</span></div>`:""}
      <div class="semeio-details-accordion__content semeio-details-production__content">
        ${s}
      </div>
    </div>
  `}function Q(e){return`
    <article class="semeio-details-production__lot">
      <span class="semeio-details-production__lot-title">Lote de Sementes Utilizado</span>
      <span class="semeio-details-production__lot-meta">Fornecedor - Código do lote - Descrição - Qtd</span>
      <div class="semeio-details-production__grid semeio-details-production__grid--lot">
        ${a("Data de retirada do estoque",e.stockDate)}
        ${a("Responsável da retirada",e.responsible)}
        <div class="semeio-details-field">
          <span class="semeio-details-field__label">Foto</span>
          <span class="semeio-details-production__photo">
            <img src="/assets/arquivo.png" alt="" aria-hidden="true" />
            <button type="button" class="semeio-details-production__link">Visualizar imagem</button>
          </span>
        </div>
      </div>
    </article>
  `}function M(e){return`
    <article class="semeio-details-production__supply">
      <div class="semeio-details-production__grid semeio-details-production__grid--supplies">
        ${a("Bandeja",e.tray)}
        ${a("Quantidade",e.quantity)}
        ${a("Responsável da retirada",e.responsible)}
      </div>
    </article>
  `}function N(){const e=[{stockDate:"12/01/2025",responsible:"Viktor Dantas"},{stockDate:"12/01/2025",responsible:"Viktor Dantas"}],s=[{tray:"Descrição Bandeja",quantity:"1000",responsible:"Viktor Dantas"},{tray:"Descrição Bandeja",quantity:"1000",responsible:"Viktor Dantas"}],n=["Germinação","Casa de Vegetação","Sala de Corte","Sala de Fusão","Adaptação"];return`
    <section class="semeio-details-production">
      <h3 class="semeio-details-section__title">Informações da Produção</h3>

      ${b({title:"Semeio",content:`
          <div class="semeio-details-production__stage-caption semeio-details-production__stage-caption--inner">${t("chevron-up",{size:12})}<span>Detalhes</span></div>
          <div class="semeio-details-production__grid semeio-details-production__grid--two">
            ${a("Data agendada de semeio","12/01/2025")}
            ${a("Responsável do agendamento","Viktor Dantas")}
            ${a("Data de semeio","12/01/2025")}
            ${a("Responsável do semeio","Viktor Dantas")}
          </div>
          <div class="semeio-details-production__line">
            ${a("Localização","Sala de Semeio")}
          </div>
        `})}

      ${b({title:"Produto Final",content:`
          <div class="semeio-details-production__grid semeio-details-production__grid--two">
            ${a("Quantidade de Produto","5.000")}
            ${a("Estimativa (+5% Germinação)","5.250")}
          </div>
        `})}

      ${b({title:"Sementes",content:`
          <div class="semeio-details-production__grid semeio-details-production__grid--two">
            ${a("Quantidade de Mudas Enxerto","5.000")}
            ${a("Estimativa (+5% Germinação)","5.250")}
            ${a("Quantidade de Mudas Porta-enxerto","5.000")}
            ${a("Estimativa (+5% Germinação)","5.250")}
          </div>
        `})}

      ${b({title:"Informações de Lote de Sementes",content:`
          <div class="semeio-details-production__lots">
            ${e.map(i=>Q(i)).join("")}
          </div>
          <button type="button" class="semeio-termo-btn">
            ${t("file",{size:14})}
            <span>Termo de Retirada</span>
          </button>
        `})}

      ${b({title:"Informações de Insumos",content:`
          <div class="semeio-details-production__supplies">
            ${s.map(i=>M(i)).join("")}
          </div>
        `})}

      ${n.map(i=>b({title:i,content:'<div class="enviar-germinacao-drawer__placeholder">Em construção</div>',collapsed:!0,showCaption:!0})).join("")}
    </section>
  `}function I(){return C({id:"semeio-detalhes-subtabs",variant:"underlined",fullWidth:!0,activeTab:0,tabs:[{label:"Informações Gerais",content:x()},{label:"Produção",content:N()},{label:"Expedição",content:f("Expedição em construção")},{label:"Operações",content:f("Operações em construção")},{label:"Histórico",content:f("Histórico em construção")}]})}function R(e){return`
    <article class="semeio-cycle-step">
      <div class="semeio-cycle-step__main">
        <strong class="semeio-cycle-step__title">${e.title}</strong>
        <span class="semeio-cycle-step__period">${e.period}</span>
      </div>
      <strong class="semeio-cycle-step__days">${e.days}</strong>
    </article>
  `}function j(){const e=[{title:"Dias após o Semeio",period:"23/01/2025",days:"10 dias"},{title:"Dias na Germinação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Casa de Vegetação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Sala de Corte",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Sala de Fusão",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Adaptação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias na Casa de Vegetação",period:"23/01/2025 - 23/01/2025",days:"15 dias"},{title:"Dias em Expedição",period:"23/01/2025 - 23/01/2025",days:"15 dias"}];return`
    <section class="semeio-cycle-days">
      <section class="semeio-cycle-section">
        <h3 class="semeio-cycle-section__title">Dias</h3>
        <article class="semeio-cycle-card" aria-label="Previsão de Término">
          <h4 class="semeio-cycle-card__title">
            <span class="semeio-cycle-card__icon" aria-hidden="true">${t("clock",{size:14})}</span>
            Previsão de Término
          </h4>
          <div class="semeio-cycle-donut" role="img" aria-label="365 dias de ciclo previstos">
            <div class="semeio-cycle-donut__inner">
              <strong>365</strong>
              <span>Dias</span>
            </div>
          </div>
          <div class="semeio-cycle-card__dates">
            <div class="semeio-cycle-card__date">
              <span class="semeio-cycle-card__date-icon" aria-hidden="true">${t("calendar",{size:14})}</span>
              <span>Data Abertura: <strong>12/12/2026</strong></span>
            </div>
            <div class="semeio-cycle-card__date">
              <span class="semeio-cycle-card__date-icon" aria-hidden="true">${t("calendar",{size:14})}</span>
              <span>Previsão Término: <strong>12/12/2026</strong></span>
            </div>
          </div>
        </article>
      </section>

      <section class="semeio-cycle-section">
        <h3 class="semeio-cycle-section__title">Etapas do Ciclo</h3>
        <div class="semeio-cycle-steps" aria-label="Etapas do ciclo">
          ${e.map(s=>R(s)).join("")}
        </div>
      </section>
    </section>
  `}function B(e){return`
    <article class="semeio-cycle-timeline-item">
      <div class="semeio-cycle-timeline-item__marker" aria-hidden="true">
        <span class="semeio-cycle-timeline-item__dot"></span>
      </div>
      <div class="semeio-cycle-timeline-item__content">
        <strong class="semeio-cycle-timeline-item__title">${e.title}</strong>
        <span class="semeio-cycle-timeline-item__subtitle">Responsável: <strong>${e.responsible}</strong></span>
      </div>
      <div class="semeio-cycle-timeline-item__meta">
        <span class="semeio-cycle-timeline-item__date">${e.date}</span>
        ${e.daysAfterSowing?`<span class="semeio-cycle-timeline-item__days">Dias após o Semeio: <strong>${e.daysAfterSowing}</strong></span>`:""}
      </div>
    </article>
  `}function G(){return`
    <section class="semeio-cycle-timeline">
      <h3 class="semeio-cycle-section__title">Linha do Tempo</h3>
      <div class="semeio-cycle-timeline-card" aria-label="Linha do tempo do ciclo">
        ${[{title:"Criação da Ordem de Produção",responsible:"André Cesarini",date:"23/01/2025"},{title:"Criação da Ordem de Produção",responsible:"André Cesarini",date:"23/01/2025",daysAfterSowing:"0 Dias"},{title:"Criação da Ordem de Produção",responsible:"André Cesarini",date:"23/01/2025",daysAfterSowing:"0 Dias"},{title:"Criação da Ordem de Produção",responsible:"André Cesarini",date:"23/01/2025",daysAfterSowing:"0 Dias"},{title:"Criação da Ordem de Produção",responsible:"André Cesarini",date:"23/01/2025",daysAfterSowing:"0 Dias"}].map(s=>B(s)).join("")}
      </div>
    </section>
  `}function V(){return`
    <section class="semeio-cycle" data-semeio-cycle>
      ${C({id:"semeio-ciclo-subtabs",variant:"underlined",fullWidth:!0,activeTab:0,tabs:[{label:"Dias",content:j()},{label:"Linha do Tempo",content:G()}]})}
    </section>
  `}function F(){const e=C({id:"enviar-germinacao-tabs",variant:"underlined",fullWidth:!0,activeTab:0,tabs:[{label:"Enviar para Germinação",content:T()},{label:"Detalhes",content:I()},{label:"Ciclo",content:V()}]});return`
    <section class="enviar-germinacao-drawer">
      <div class="enviar-germinacao-drawer__summary">
        <div class="enviar-germinacao-drawer__summary-left">
          <span class="enviar-germinacao-drawer__meta">Cód. Pedido: <strong>001</strong></span>
          <span class="enviar-germinacao-drawer__meta">Cód. Cliente: <strong>22332</strong></span>
          <span class="enviar-germinacao-drawer__meta"><strong>Fazenda Sol Nascente</strong></span>
        </div>
      </div>
      <div class="enviar-germinacao-drawer__summary enviar-germinacao-drawer__summary--bottom">
        <div class="enviar-germinacao-drawer__summary-left">
          <span class="enviar-germinacao-drawer__meta">Cód. Produto: <strong>001</strong></span>
          <span class="enviar-germinacao-drawer__meta"><strong>Muda de Eucalipto Clone AEC 144</strong></span>
          <span class="enviar-germinacao-drawer__meta">Qtd.: <strong>3.000</strong></span>
        </div>
        <div class="enviar-germinacao-drawer__summary-right">
          ${S({label:"Enxertia",value:"enxertia",size:"sm"})}
        </div>
      </div>
      ${e}
    </section>
  `}function O(){document.querySelector(`[data-drawer="${g}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${g}"]`)?.remove();const e=P({id:g,title:"OP-2025-006",width:540,content:F(),footer:""});document.body.insertAdjacentHTML("beforeend",e)}function W(e){const s=e?.querySelector(".drawer__header");if(!s)return;s.classList.add("enviar-germinacao-drawer__header");const n=s.querySelector("[data-drawer-close]");if(!n||s.querySelector("[data-eg-header-status]"))return;const i=document.createElement("div");i.className="enviar-germinacao-drawer__header-status",i.setAttribute("data-eg-header-status","true"),i.innerHTML=`
    ${S({label:"Normal",value:"normal",size:"sm",className:"enviar-germinacao-drawer__chip--normal"})}
    ${S({label:"Agendado",value:"agendado",size:"sm"})}
  `,s.insertBefore(i,n)}function H(){O();const e=E({id:g,root:document}),s=document.querySelector(`[data-drawer="${g}"]`);if(!s||!e)return{open:()=>{},close:()=>{},cleanup:()=>{}};W(s);const i=s.querySelector("#enviar-germinacao-tabs")?.closest("[data-tabs]")?.querySelector('.tabs-tab[data-tab="0"]');i&&i.setAttribute("data-drawer-autofocus","");const w=q(s)||(()=>{}),y=(c,l)=>{const v=c.querySelectorAll(".tabs-tab"),m=c.nextElementSibling?.classList.contains("tabs-content")?c.nextElementSibling:null,h=m?Array.from(m.children).filter(r=>r.classList.contains("tabs-panel")):null;v.forEach((r,o)=>{r.classList.toggle("is-active",o===l),r.setAttribute("aria-selected",String(o===l))}),h?.forEach((r,o)=>{r.classList.toggle("is-active",o===l)})},k=c=>{const l=c.target.closest(".tabs-tab"),v=l?.closest("[data-tabs]");if(l&&v&&s.contains(v)){const o=Number(l.dataset.tab);if(!Number.isNaN(o)){y(v,o);const _=v.id==="enviar-germinacao-tabs";if(_&&o===1){const $=s.querySelector("#semeio-detalhes-subtabs");$&&y($,0)}if(_&&o===2){const $=s.querySelector("#semeio-ciclo-subtabs");$&&y($,0)}}return}const m=c.target.closest("[data-semeio-details-toggle]");if(m&&s.contains(m)){const o=m.closest("[data-semeio-details-accordion]");if(!o)return;const _=o.classList.toggle("is-collapsed");m.setAttribute("aria-expanded",String(!_));return}const h=c.target.closest("[data-eg-action]");if(!h)return;const r=h.dataset.egAction;if(r==="cancelar"||r==="voltar-etapa"){e.close();return}if(r==="enviar-germinacao"){const o=s.querySelector("form"),_=o?Object.fromEntries(new FormData(o).entries()):{};console.log("Enviar para Germinação",_),e.close()}};return s.addEventListener("click",k),{open:(c=null)=>{e.open(c)},close:()=>{e.close()},cleanup:()=>{s.removeEventListener("click",k),w(),e.cleanup?.(),document.querySelector(`[data-drawer="${g}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${g}"]`)?.remove()}}}const Ce={createEnviarGerminacaoDrawer:H};export{H as createEnviarGerminacaoDrawer,Ce as default};
