import{c as le,i as ie}from"./drawer-BhhtaBzO.js";/* empty css               */const Se=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],Le=["DOMINGO","SEGUNDA","TERÇA","QUARTA","QUINTA","SEXTA","SÁBADO"],ce={"2026-01-01":"normal","2026-01-02":"normal","2026-01-03":"warning","2026-01-04":"normal","2026-01-05":"critical","2026-01-06":"warning","2026-01-07":"normal","2026-01-08":"normal","2026-01-09":"warning","2026-01-10":"critical","2026-01-11":"normal","2026-01-12":"warning","2026-01-13":"normal","2026-01-14":"normal","2026-01-15":"critical","2026-01-16":"normal","2026-01-17":"normal","2026-01-18":"warning","2026-01-19":"normal","2026-01-20":"critical","2026-01-21":"warning","2026-01-22":"normal","2026-01-23":"normal","2026-01-24":"warning","2026-01-25":"critical","2026-01-26":"normal","2026-01-27":"warning","2026-01-28":"normal","2026-01-29":"normal","2026-01-30":"critical","2026-01-31":"normal"},ue=[{id:"evt-001",date:"2026-01-17",time:"08:00",endTime:"09:00",label:"Semeio Lote A - Tomate",subtitle:"Estufa 3 - 5.000 mudas",tone:"blue",category:"producao"},{id:"evt-002",date:"2026-01-17",time:"14:00",endTime:"16:00",label:"Entrega Fazenda Sol",subtitle:"Rota Norte - Caminhão 2",tone:"orange",category:"expedicao"},{id:"evt-003",date:"2026-01-17",time:"10:00",endTime:"11:00",label:"Manutenção Irrigação",subtitle:"Setor 2",tone:"green",category:"operacoes"},{id:"evt-004",date:"2026-01-18",label:"Vistoria Fitossanitária",tone:"green",category:"operacoes"},{id:"evt-005",date:"2026-01-19",label:"Prazo Pedido #45",tone:"blue",category:"pedidos"},{id:"evt-006",date:"2026-01-22",label:"Enxertia Lote B",tone:"blue",category:"producao"}],G={blue:"producao",orange:"expedicao",green:"operacoes",gray:"pedidos"},L="agenda-eventos-new-event-drawer",A="agenda-eventos-event-details-drawer",O=8,q=17;function N(a){const d=a.getFullYear(),r=String(a.getMonth()+1).padStart(2,"0"),p=String(a.getDate()).padStart(2,"0");return`${d}-${r}-${p}`}function x(a){const[d,r,p]=a.split("-").map(Number);return new Date(d,r-1,p)}function xe(a){const d=a.getFullYear(),r=a.getMonth(),p=new Date(d,r,1).getDay(),b=new Date(d,r,1-p),M=[];for(let E=0;E<42;E+=1){const F=new Date(b);F.setDate(b.getDate()+E),M.push(F)}return M}function Te(a){const d=a.getDay(),r=new Date(a);r.setDate(a.getDate()-d);const p=[];for(let b=0;b<7;b+=1){const M=new Date(r);M.setDate(r.getDate()+b),p.push(M)}return p}function Ae(a){return a.reduce((d,r)=>(r?.date&&(d[r.date]||(d[r.date]=[]),d[r.date].push(r)),d),{})}function T(a){if(!a||!/^\d{2}:\d{2}$/.test(a))return Number.MAX_SAFE_INTEGER;const[d,r]=a.split(":").map(Number);return d*60+r}function ve(a){const d=Number.isFinite(a)?a:0,r=Math.floor(d/60),p=d%60;return`${String(r).padStart(2,"0")}:${String(p).padStart(2,"0")}`}function $(a){return String(a??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function $e(a){if(!a)return"";const[d,r,p]=a.split("-");return!d||!r||!p?"":`${p}/${r}/${d}`}function Fe(){return`
    <section class="agenda-new-event-drawer">
      <form class="agenda-new-event-drawer__form" data-new-event-form>
        <div class="agenda-new-event-drawer__field">
          <label class="agenda-new-event-drawer__label" for="agenda-new-event-title">Título da Atividade</label>
          <input id="agenda-new-event-title" name="title" type="text" class="agenda-new-event-drawer__input" data-drawer-autofocus />
        </div>

        <div class="agenda-new-event-drawer__row">
          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-new-event-date">Data</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <input id="agenda-new-event-date" name="date" type="text" class="agenda-new-event-drawer__input" placeholder="00/00/0000" />
              <span class="agenda-new-event-drawer__input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M7 3V6M17 3V6M4 9H20M6 5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-new-event-category">Categoria</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <select id="agenda-new-event-category" name="category" class="agenda-new-event-drawer__input agenda-new-event-drawer__select">
                <option value="">Selecione</option>
                <option value="producao">Produção</option>
                <option value="expedicao">Expedição</option>
                <option value="operacoes">Operações</option>
                <option value="pedidos">Pedidos</option>
              </select>
            </div>
          </div>
        </div>

        <div class="agenda-new-event-drawer__row">
          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-new-event-start-time">Hora Início</label>
            <input id="agenda-new-event-start-time" name="startTime" type="text" class="agenda-new-event-drawer__input" placeholder="00:00" />
          </div>

          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-new-event-end-time">Hora Fim</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <input id="agenda-new-event-end-time" name="endTime" type="text" class="agenda-new-event-drawer__input" placeholder="00:00" />
              <span class="agenda-new-event-drawer__input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" />
                  <path d="M12 8V12L15 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div class="agenda-new-event-drawer__field">
          <label class="agenda-new-event-drawer__label" for="agenda-new-event-details">Detalhes / Observações</label>
          <textarea id="agenda-new-event-details" name="details" class="agenda-new-event-drawer__textarea"></textarea>
        </div>
      </form>
    </section>
  `}function Ke(){return`
    <div class="agenda-new-event-drawer__footer">
      <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--danger-outline" data-new-event-action="delete">Excluir evento</button>
      <div class="agenda-new-event-drawer__footer-right">
        <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--ghost" data-new-event-action="cancel">Cancelar</button>
        <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--primary" data-new-event-action="save">Salvar</button>
      </div>
    </div>
  `}function we(a){const d=a?.category||G[a?.tone]||"producao";return`
    <section class="agenda-new-event-drawer agenda-new-event-drawer--details">
      <p class="agenda-event-details-drawer__subtitle">Visualize ou edite as informações.</p>
      <form class="agenda-new-event-drawer__form" data-event-details-form>
        <div class="agenda-new-event-drawer__field">
          <label class="agenda-new-event-drawer__label" for="agenda-event-details-title">Título da Atividade</label>
          <input id="agenda-event-details-title" name="title" type="text" class="agenda-new-event-drawer__input" value="${$(a?.label||"")}" data-drawer-autofocus />
        </div>

        <div class="agenda-new-event-drawer__row">
          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-event-details-date">Data</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <input id="agenda-event-details-date" name="date" type="text" class="agenda-new-event-drawer__input" value="${$($e(a?.date||""))}" />
              <span class="agenda-new-event-drawer__input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M7 3V6M17 3V6M4 9H20M6 5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-event-details-category">Categoria</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <select id="agenda-event-details-category" name="category" class="agenda-new-event-drawer__input agenda-new-event-drawer__select">
                <option value="producao" ${d==="producao"?"selected":""}>Produção</option>
                <option value="expedicao" ${d==="expedicao"?"selected":""}>Expedição</option>
                <option value="operacoes" ${d==="operacoes"?"selected":""}>Operações</option>
                <option value="pedidos" ${d==="pedidos"?"selected":""}>Pedidos</option>
              </select>
            </div>
          </div>
        </div>

        <div class="agenda-new-event-drawer__row">
          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-event-details-start-time">Hora Início</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <input id="agenda-event-details-start-time" name="startTime" type="text" class="agenda-new-event-drawer__input" value="${$(a?.time||"00:00")}" />
              <span class="agenda-new-event-drawer__input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" />
                  <path d="M12 8V12L15 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
          </div>

          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-event-details-end-time">Hora Fim</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <input id="agenda-event-details-end-time" name="endTime" type="text" class="agenda-new-event-drawer__input" value="/" />
              <span class="agenda-new-event-drawer__input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" />
                  <path d="M12 8V12L15 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div class="agenda-new-event-drawer__field">
          <label class="agenda-new-event-drawer__label" for="agenda-event-details-notes">Detalhes / Observações</label>
          <textarea id="agenda-event-details-notes" name="notes" class="agenda-new-event-drawer__textarea"></textarea>
        </div>
      </form>
    </section>
  `}function ge(){return`
    <div class="agenda-new-event-drawer__footer">
      <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--danger-outline" data-event-details-action="delete">Excluir evento</button>
      <div class="agenda-new-event-drawer__footer-right">
        <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--ghost" data-event-details-action="cancel">Cancelar</button>
        <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--primary" data-event-details-action="save">Salvar</button>
      </div>
    </div>
  `}function j(a){document.querySelector(`[data-drawer="${a}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${a}"]`)?.remove()}function Ie(){const a=document.getElementById("app-header"),d=document.getElementById("agenda-month-label"),r=document.getElementById("agenda-calendar-grid"),p=document.querySelector(".agenda-calendar__weekdays"),b=document.querySelector(".agenda-capacity-sidebar"),M=document.querySelector('[data-role="week-filters"]'),E=document.querySelector(".agenda-eventos-top"),F=Array.from(document.querySelectorAll('[data-action="set-view"]')),P=Array.from(document.querySelectorAll('[data-action="toggle-week-filter"]')),W=document.querySelector('[data-action="back"]'),z=document.querySelector('[data-action="today"]'),U=document.querySelector('[data-action="prev-month"]'),X=document.querySelector('[data-action="next-month"]'),V=document.querySelector('[data-action="new-event"]');let D=null,k=null,K=null,C=null,f=null,H=null;if(!d||!r||!E)return console.error("[agenda-eventos] elementos base não encontrados para inicialização"),()=>{};a&&a.classList.add("header--kanban-compact-tabs");const t={currentDate:new Date(2026,0,1),selectedDateKey:"2026-01-17",view:"month",filters:{producao:!0,expedicao:!0,operacoes:!0,pedidos:!0}},B=Ae(ue),me=ue.reduce((e,n,o)=>{const l=n.id||`evt-${o+1}`;return e[l]={...n,id:l},e},{}),pe=()=>{const e=Se[t.currentDate.getMonth()]||"";d.textContent=`${e} ${t.currentDate.getFullYear()}`},_e=()=>{F.forEach(e=>{const n=e.dataset.view===t.view;e.classList.toggle("is-active",n),e.setAttribute("aria-selected",String(n))})},ye=()=>{const e=t.view==="month",n=t.view==="week",o=t.view==="day";p?.classList.toggle("is-hidden",!e),r.classList.toggle("is-week-view",n),r.classList.toggle("is-day-view",o),M?.classList.toggle("is-hidden",!(n||o)),b?.classList.toggle("is-week-view",n||o)},fe=()=>{const e=xe(t.currentDate),n=t.currentDate.getMonth(),o=document.createDocumentFragment();e.forEach(l=>{const w=l.getMonth()!==n,i=N(l),c=document.createElement("article");c.className="agenda-calendar__cell",c.dataset.dateKey=i;const v=document.createElement("span");v.className="agenda-day",w&&v.classList.add("is-muted"),i===t.selectedDateKey&&v.classList.add("is-selected"),v.textContent=String(l.getDate()),c.appendChild(v);const m=ce[i];if(m&&!w){const u=document.createElement("div");u.className="agenda-capacity-line",u.dataset.level=m,u.innerHTML="<span></span>",c.appendChild(u)}!w&&B[i]&&B[i].forEach(u=>{const _=document.createElement("div");_.className=`agenda-event-pill agenda-event-pill--${u.tone||"blue"}`,_.dataset.eventId=u.id||"",_.title=u.label,_.textContent=u.label,c.appendChild(_)}),o.appendChild(c)}),r.replaceChildren(o)},he=()=>{const e=x(t.selectedDateKey),n=Te(e),o=document.createElement("section");o.className="agenda-week";const l=document.createElement("div");l.className="agenda-week__grid",n.forEach(w=>{const i=N(w),c=document.createElement("article");c.className="agenda-week__column",c.dataset.dayKey=i;const v=document.createElement("header");v.className="agenda-week__header",i===t.selectedDateKey&&v.classList.add("is-selected");const m=document.createElement("span");m.className="agenda-week__weekday",m.textContent=Le[w.getDay()]||"",v.appendChild(m);const u=document.createElement("strong");u.className="agenda-week__day-number",u.textContent=String(w.getDate()),v.appendChild(u);const _=ce[i];if(_){const s=document.createElement("div");s.className="agenda-week__capacity",s.dataset.level=_,s.innerHTML="<span></span>",v.appendChild(s)}c.appendChild(v);const I=document.createElement("div");I.className="agenda-week__body",(B[i]||[]).filter(s=>{const y=s.category||G[s.tone]||"pedidos";return t.filters[y]!==!1}).sort((s,y)=>T(s.time)-T(y.time)).forEach(s=>{const y=document.createElement("article");y.className=`agenda-week-event agenda-week-event--${s.tone||"gray"}`,y.dataset.eventId=s.id||"",y.innerHTML=`
          <strong>${s.time||"--:--"}</strong>
          <span>${s.label}</span>
        `,I.appendChild(y)}),c.appendChild(I),l.appendChild(c)}),o.appendChild(l),r.replaceChildren(o)},be=()=>{const e=t.selectedDateKey,n=O*60,o=q*60,l=o-n,w=q-O,i=document.createElement("section");i.className="agenda-day-timeline";const c=document.createElement("div");c.className="agenda-day-timeline__grid",c.dataset.dayKey=e;const v=document.createElement("div");v.className="agenda-day-timeline__times";const m=document.createElement("div");m.className="agenda-day-timeline__track",m.dataset.dayKey=e;const u=document.createElement("div");u.className="agenda-day-timeline__lines",u.style.gridTemplateRows=`repeat(${w}, 1fr)`;for(let g=O;g<=q;g+=1){const s=document.createElement("span");if(s.className="agenda-day-timeline__time-label",s.textContent=`${String(g).padStart(2,"0")}:00`,v.appendChild(s),g<q){const y=document.createElement("div");y.className="agenda-day-timeline__line",u.appendChild(y)}}const _=document.createElement("div");_.className="agenda-day-timeline__events",(B[e]||[]).filter(g=>{const s=g.category||G[g.tone]||"pedidos";return t.filters[s]!==!1}).sort((g,s)=>T(g.time)-T(s.time)).forEach(g=>{const s=T(g.time);if(!Number.isFinite(s)||s===Number.MAX_SAFE_INTEGER)return;const y=s+60,Y=T(g.endTime),De=Number.isFinite(Y)&&Y!==Number.MAX_SAFE_INTEGER?Y:y,oe=Math.max(De,s+30),R=Math.max(s,n),se=Math.min(oe,o);if(se<=R)return;const ke=(R-n)/l*100,Ce=(se-R)/l*100,S=document.createElement("article");S.className=`agenda-day-event agenda-day-event--${g.tone||"gray"}`,S.dataset.eventId=g.id||"",S.style.setProperty("--event-top",`${ke}%`),S.style.setProperty("--event-height",`${Math.max(Ce,8)}%`);const Me=`${ve(s)} - ${ve(oe)}`,Ne=g.subtitle?`<p>${$(g.subtitle)}</p>`:"";S.innerHTML=`
        <div class="agenda-day-event__head">
          <strong>${$(g.label||"")}</strong>
          <span>${Me}</span>
        </div>
        ${Ne}
      `,_.appendChild(S)}),m.appendChild(u),m.appendChild(_),c.appendChild(v),c.appendChild(m),i.appendChild(c),r.replaceChildren(i)},Ee=()=>{if(ye(),t.view==="month"){fe();return}if(t.view==="week"){he();return}if(t.view==="day"){be();return}},h=()=>{pe(),_e(),Ee()},Q=()=>{window.location.hash="#/kanban-producao"},Z=()=>{const e=new Date;t.currentDate=new Date(e.getFullYear(),e.getMonth(),1),t.selectedDateKey=N(e),h()},J=()=>{if(t.view==="week"){const e=x(t.selectedDateKey);e.setDate(e.getDate()-7),t.selectedDateKey=N(e),t.currentDate=new Date(e.getFullYear(),e.getMonth(),1),h();return}if(t.view==="day"){const e=x(t.selectedDateKey);e.setDate(e.getDate()-1),t.selectedDateKey=N(e),t.currentDate=new Date(e.getFullYear(),e.getMonth(),1),h();return}t.currentDate=new Date(t.currentDate.getFullYear(),t.currentDate.getMonth()-1,1),h()},ee=()=>{if(t.view==="week"){const e=x(t.selectedDateKey);e.setDate(e.getDate()+7),t.selectedDateKey=N(e),t.currentDate=new Date(e.getFullYear(),e.getMonth(),1),h();return}if(t.view==="day"){const e=x(t.selectedDateKey);e.setDate(e.getDate()+1),t.selectedDateKey=N(e),t.currentDate=new Date(e.getFullYear(),e.getMonth(),1),h();return}t.currentDate=new Date(t.currentDate.getFullYear(),t.currentDate.getMonth()+1,1),h()},te=e=>{const n=e.target.closest('[data-action="set-view"]');if(!n||!E.contains(n))return;const o=n.dataset.view;!o||t.view===o||(t.view=o,h())},ae=e=>{const n=e.target.closest('[data-action="toggle-week-filter"]');n&&(t.filters[n.value]=n.checked,t.view==="week"&&h())},ne=e=>{if(e.target.closest("[data-event-id]"))return;const n=e.target.closest("[data-date-key], [data-day-key]");if(!n||!r.contains(n))return;const o=n.dataset.dateKey||n.dataset.dayKey;if(!o||o===t.selectedDateKey)return;t.selectedDateKey=o;const l=x(o);t.currentDate=new Date(l.getFullYear(),l.getMonth(),1),h()},re=e=>{const n=e.target.closest("[data-event-id]");if(!n||!r.contains(n))return;const o=n.dataset.eventId,l=o?me[o]:null;if(l){if(C){if(f){f.querySelector(".drawer__title")?.replaceChildren(document.createTextNode("Detalhes do Evento"));const w=f.querySelector(".drawer__body"),i=f.querySelector(".drawer__footer");w&&(w.innerHTML=we(l)),i&&(i.innerHTML=ge())}}else{j(A);const w=le({id:A,title:"Detalhes do Evento",width:336,content:we(l),footer:ge()});if(document.body.insertAdjacentHTML("beforeend",w),C=ie({id:A,root:document}),f=document.querySelector(`[data-drawer="${A}"]`),f){const i=c=>{const v=c.target.closest("[data-event-details-action]");if(!v||!f.contains(v))return;const m=v.dataset.eventDetailsAction;if(m==="cancel"||m==="delete"){C?.close();return}if(m==="save"){const u=f.querySelector("[data-event-details-form]"),_=u?Object.fromEntries(new FormData(u).entries()):{};console.log("[agenda-eventos] detalhes do evento",{eventId:o,..._}),C?.close()}};f.addEventListener("click",i),H=i}}C?.open(n)}},de=()=>{if(!D){document.querySelector(`[data-drawer="${L}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${L}"]`)?.remove();const e=le({id:L,title:"Novo Evento",width:336,content:Fe(),footer:Ke()});if(document.body.insertAdjacentHTML("beforeend",e),D=ie({id:L,root:document}),k=document.querySelector(`[data-drawer="${L}"]`),k){const n=o=>{const l=o.target.closest("[data-new-event-action]");if(!l||!k.contains(l))return;const w=l.dataset.newEventAction;if(w==="cancel"||w==="delete"){D?.close();return}if(w==="save"){const i=k.querySelector("[data-new-event-form]"),c=i?Object.fromEntries(new FormData(i).entries()):{};console.log("[agenda-eventos] novo evento",c),D?.close()}};k.addEventListener("click",n),K=n}}D?.open(V||null)};return W?.addEventListener("click",Q),z?.addEventListener("click",Z),U?.addEventListener("click",J),X?.addEventListener("click",ee),V?.addEventListener("click",de),P.forEach(e=>e.addEventListener("change",ae)),r.addEventListener("click",ne),r.addEventListener("click",re),E.addEventListener("click",te),h(),()=>{a&&a.classList.remove("header--kanban-compact-tabs"),W?.removeEventListener("click",Q),z?.removeEventListener("click",Z),U?.removeEventListener("click",J),X?.removeEventListener("click",ee),V?.removeEventListener("click",de),P.forEach(e=>e.removeEventListener("change",ae)),r.removeEventListener("click",ne),r.removeEventListener("click",re),E.removeEventListener("click",te),k&&K&&k.removeEventListener("click",K),D?.cleanup&&D.cleanup(),j(L),D=null,k=null,K=null,f&&H&&f.removeEventListener("click",H),C?.cleanup&&C.cleanup(),j(A),C=null,f=null,H=null}}export{Ie as init};
