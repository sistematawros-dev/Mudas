import{c as le,i as se}from"./drawer-DOh9nE41.js";/* empty css               */const Ne=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],Se=["DOMINGO","SEGUNDA","TERÇA","QUARTA","QUINTA","SEXTA","SÁBADO"],ie={"2026-01-01":"normal","2026-01-02":"normal","2026-01-03":"warning","2026-01-04":"normal","2026-01-05":"critical","2026-01-06":"warning","2026-01-07":"normal","2026-01-08":"normal","2026-01-09":"warning","2026-01-10":"critical","2026-01-11":"normal","2026-01-12":"warning","2026-01-13":"normal","2026-01-14":"normal","2026-01-15":"critical","2026-01-16":"normal","2026-01-17":"normal","2026-01-18":"warning","2026-01-19":"normal","2026-01-20":"critical","2026-01-21":"warning","2026-01-22":"normal","2026-01-23":"normal","2026-01-24":"warning","2026-01-25":"critical","2026-01-26":"normal","2026-01-27":"warning","2026-01-28":"normal","2026-01-29":"normal","2026-01-30":"critical","2026-01-31":"normal"},ce=[{id:"evt-001",date:"2026-01-17",time:"08:00",endTime:"09:00",label:"Semeio Lote A - Tomate",subtitle:"Estufa 3 - 5.000 mudas",tone:"blue",category:"producao"},{id:"evt-002",date:"2026-01-17",time:"14:00",endTime:"16:00",label:"Entrega Fazenda Sol",subtitle:"Rota Norte - Caminhão 2",tone:"orange",category:"expedicao"},{id:"evt-003",date:"2026-01-17",time:"10:00",endTime:"11:00",label:"Manutenção Irrigação",subtitle:"Setor 2",tone:"green",category:"operacoes"},{id:"evt-004",date:"2026-01-18",label:"Vistoria Fitossanitária",tone:"green",category:"operacoes"},{id:"evt-005",date:"2026-01-19",label:"Prazo Pedido #45",tone:"blue",category:"pedidos"},{id:"evt-006",date:"2026-01-22",label:"Enxertia Lote B",tone:"blue",category:"producao"}],G={blue:"producao",orange:"expedicao",green:"operacoes",gray:"pedidos"},S="agenda-eventos-new-event-drawer",$="agenda-eventos-event-details-drawer",O=8,q=17;function M(n){const a=n.getFullYear(),l=String(n.getMonth()+1).padStart(2,"0"),p=String(n.getDate()).padStart(2,"0");return`${a}-${l}-${p}`}function L(n){const[a,l,p]=n.split("-").map(Number);return new Date(a,l-1,p)}function Le(n){const a=n.getFullYear(),l=n.getMonth(),p=new Date(a,l,1).getDay(),E=new Date(a,l,1-p),b=[];for(let T=0;T<42;T+=1){const A=new Date(E);A.setDate(E.getDate()+T),b.push(A)}return b}function xe(n){const a=n.getDay(),l=new Date(n);l.setDate(n.getDate()-a);const p=[];for(let E=0;E<7;E+=1){const b=new Date(l);b.setDate(l.getDate()+E),p.push(b)}return p}function Te(n){return n.reduce((a,l)=>(l?.date&&(a[l.date]||(a[l.date]=[]),a[l.date].push(l)),a),{})}function x(n){if(!n||!/^\d{2}:\d{2}$/.test(n))return Number.MAX_SAFE_INTEGER;const[a,l]=n.split(":").map(Number);return a*60+l}function ue(n){const a=Number.isFinite(n)?n:0,l=Math.floor(a/60),p=a%60;return`${String(l).padStart(2,"0")}:${String(p).padStart(2,"0")}`}function F(n){return String(n??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ae(n){if(!n)return"";const[a,l,p]=n.split("-");return!a||!l||!p?"":`${p}/${l}/${a}`}function $e(){return`
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
  `}function Fe(){return`
    <div class="agenda-new-event-drawer__footer">
      <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--danger-outline" data-new-event-action="delete">Excluir evento</button>
      <div class="agenda-new-event-drawer__footer-right">
        <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--ghost" data-new-event-action="cancel">Cancelar</button>
        <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--primary" data-new-event-action="save">Salvar</button>
      </div>
    </div>
  `}function ve(n){const a=n?.category||G[n?.tone]||"producao";return`
    <section class="agenda-new-event-drawer agenda-new-event-drawer--details">
      <p class="agenda-event-details-drawer__subtitle">Visualize ou edite as informações.</p>
      <form class="agenda-new-event-drawer__form" data-event-details-form>
        <div class="agenda-new-event-drawer__field">
          <label class="agenda-new-event-drawer__label" for="agenda-event-details-title">Título da Atividade</label>
          <input id="agenda-event-details-title" name="title" type="text" class="agenda-new-event-drawer__input" value="${F(n?.label||"")}" data-drawer-autofocus />
        </div>

        <div class="agenda-new-event-drawer__row">
          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-event-details-date">Data</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <input id="agenda-event-details-date" name="date" type="text" class="agenda-new-event-drawer__input" value="${F(Ae(n?.date||""))}" />
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
                <option value="producao" ${a==="producao"?"selected":""}>Produção</option>
                <option value="expedicao" ${a==="expedicao"?"selected":""}>Expedição</option>
                <option value="operacoes" ${a==="operacoes"?"selected":""}>Operações</option>
                <option value="pedidos" ${a==="pedidos"?"selected":""}>Pedidos</option>
              </select>
            </div>
          </div>
        </div>

        <div class="agenda-new-event-drawer__row">
          <div class="agenda-new-event-drawer__field">
            <label class="agenda-new-event-drawer__label" for="agenda-event-details-start-time">Hora Início</label>
            <div class="agenda-new-event-drawer__input-wrap">
              <input id="agenda-event-details-start-time" name="startTime" type="text" class="agenda-new-event-drawer__input" value="${F(n?.time||"00:00")}" />
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
  `}function we(){return`
    <div class="agenda-new-event-drawer__footer">
      <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--danger-outline" data-event-details-action="delete">Excluir evento</button>
      <div class="agenda-new-event-drawer__footer-right">
        <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--ghost" data-event-details-action="cancel">Cancelar</button>
        <button type="button" class="agenda-new-event-drawer__btn agenda-new-event-drawer__btn--primary" data-event-details-action="save">Salvar</button>
      </div>
    </div>
  `}function j(n){document.querySelector(`[data-drawer="${n}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${n}"]`)?.remove()}function Be(){const n=document.getElementById("agenda-month-label"),a=document.getElementById("agenda-calendar-grid"),l=document.querySelector(".agenda-calendar__weekdays"),p=document.querySelector(".agenda-capacity-sidebar"),E=document.querySelector('[data-role="week-filters"]'),b=document.querySelector(".agenda-eventos-top"),T=Array.from(document.querySelectorAll('[data-action="set-view"]')),A=Array.from(document.querySelectorAll('[data-action="toggle-week-filter"]')),P=document.querySelector('[data-action="back"]'),W=document.querySelector('[data-action="today"]'),z=document.querySelector('[data-action="prev-month"]'),U=document.querySelector('[data-action="next-month"]'),V=document.querySelector('[data-action="new-event"]');let D=null,k=null,K=null,C=null,f=null,H=null;if(!n||!a||!b)return console.error("[agenda-eventos] elementos base não encontrados para inicialização"),()=>{};const t={currentDate:new Date(2026,0,1),selectedDateKey:"2026-01-17",view:"month",filters:{producao:!0,expedicao:!0,operacoes:!0,pedidos:!0}},B=Te(ce),ge=ce.reduce((e,r,d)=>{const s=r.id||`evt-${d+1}`;return e[s]={...r,id:s},e},{}),me=()=>{const e=Ne[t.currentDate.getMonth()]||"";n.textContent=`${e} ${t.currentDate.getFullYear()}`},pe=()=>{T.forEach(e=>{const r=e.dataset.view===t.view;e.classList.toggle("is-active",r),e.setAttribute("aria-selected",String(r))})},_e=()=>{const e=t.view==="month",r=t.view==="week",d=t.view==="day";l?.classList.toggle("is-hidden",!e),a.classList.toggle("is-week-view",r),a.classList.toggle("is-day-view",d),E?.classList.toggle("is-hidden",!(r||d)),p?.classList.toggle("is-week-view",r||d)},ye=()=>{const e=Le(t.currentDate),r=t.currentDate.getMonth(),d=document.createDocumentFragment();e.forEach(s=>{const w=s.getMonth()!==r,i=M(s),c=document.createElement("article");c.className="agenda-calendar__cell",c.dataset.dateKey=i;const v=document.createElement("span");v.className="agenda-day",w&&v.classList.add("is-muted"),i===t.selectedDateKey&&v.classList.add("is-selected"),v.textContent=String(s.getDate()),c.appendChild(v);const m=ie[i];if(m&&!w){const u=document.createElement("div");u.className="agenda-capacity-line",u.dataset.level=m,u.innerHTML="<span></span>",c.appendChild(u)}!w&&B[i]&&B[i].forEach(u=>{const _=document.createElement("div");_.className=`agenda-event-pill agenda-event-pill--${u.tone||"blue"}`,_.dataset.eventId=u.id||"",_.title=u.label,_.textContent=u.label,c.appendChild(_)}),d.appendChild(c)}),a.replaceChildren(d)},fe=()=>{const e=L(t.selectedDateKey),r=xe(e),d=document.createElement("section");d.className="agenda-week";const s=document.createElement("div");s.className="agenda-week__grid",r.forEach(w=>{const i=M(w),c=document.createElement("article");c.className="agenda-week__column",c.dataset.dayKey=i;const v=document.createElement("header");v.className="agenda-week__header",i===t.selectedDateKey&&v.classList.add("is-selected");const m=document.createElement("span");m.className="agenda-week__weekday",m.textContent=Se[w.getDay()]||"",v.appendChild(m);const u=document.createElement("strong");u.className="agenda-week__day-number",u.textContent=String(w.getDate()),v.appendChild(u);const _=ie[i];if(_){const o=document.createElement("div");o.className="agenda-week__capacity",o.dataset.level=_,o.innerHTML="<span></span>",v.appendChild(o)}c.appendChild(v);const I=document.createElement("div");I.className="agenda-week__body",(B[i]||[]).filter(o=>{const y=o.category||G[o.tone]||"pedidos";return t.filters[y]!==!1}).sort((o,y)=>x(o.time)-x(y.time)).forEach(o=>{const y=document.createElement("article");y.className=`agenda-week-event agenda-week-event--${o.tone||"gray"}`,y.dataset.eventId=o.id||"",y.innerHTML=`
          <strong>${o.time||"--:--"}</strong>
          <span>${o.label}</span>
        `,I.appendChild(y)}),c.appendChild(I),s.appendChild(c)}),d.appendChild(s),a.replaceChildren(d)},he=()=>{const e=t.selectedDateKey,r=O*60,d=q*60,s=d-r,w=q-O,i=document.createElement("section");i.className="agenda-day-timeline";const c=document.createElement("div");c.className="agenda-day-timeline__grid",c.dataset.dayKey=e;const v=document.createElement("div");v.className="agenda-day-timeline__times";const m=document.createElement("div");m.className="agenda-day-timeline__track",m.dataset.dayKey=e;const u=document.createElement("div");u.className="agenda-day-timeline__lines",u.style.gridTemplateRows=`repeat(${w}, 1fr)`;for(let g=O;g<=q;g+=1){const o=document.createElement("span");if(o.className="agenda-day-timeline__time-label",o.textContent=`${String(g).padStart(2,"0")}:00`,v.appendChild(o),g<q){const y=document.createElement("div");y.className="agenda-day-timeline__line",u.appendChild(y)}}const _=document.createElement("div");_.className="agenda-day-timeline__events",(B[e]||[]).filter(g=>{const o=g.category||G[g.tone]||"pedidos";return t.filters[o]!==!1}).sort((g,o)=>x(g.time)-x(o.time)).forEach(g=>{const o=x(g.time);if(!Number.isFinite(o)||o===Number.MAX_SAFE_INTEGER)return;const y=o+60,Y=x(g.endTime),Ee=Number.isFinite(Y)&&Y!==Number.MAX_SAFE_INTEGER?Y:y,de=Math.max(Ee,o+30),R=Math.max(o,r),oe=Math.min(de,d);if(oe<=R)return;const De=(R-r)/s*100,ke=(oe-R)/s*100,N=document.createElement("article");N.className=`agenda-day-event agenda-day-event--${g.tone||"gray"}`,N.dataset.eventId=g.id||"",N.style.setProperty("--event-top",`${De}%`),N.style.setProperty("--event-height",`${Math.max(ke,8)}%`);const Ce=`${ue(o)} - ${ue(de)}`,Me=g.subtitle?`<p>${F(g.subtitle)}</p>`:"";N.innerHTML=`
        <div class="agenda-day-event__head">
          <strong>${F(g.label||"")}</strong>
          <span>${Ce}</span>
        </div>
        ${Me}
      `,_.appendChild(N)}),m.appendChild(u),m.appendChild(_),c.appendChild(v),c.appendChild(m),i.appendChild(c),a.replaceChildren(i)},be=()=>{if(_e(),t.view==="month"){ye();return}if(t.view==="week"){fe();return}if(t.view==="day"){he();return}},h=()=>{me(),pe(),be()},X=()=>{window.location.hash="#/kanban-producao"},Q=()=>{const e=new Date;t.currentDate=new Date(e.getFullYear(),e.getMonth(),1),t.selectedDateKey=M(e),h()},Z=()=>{if(t.view==="week"){const e=L(t.selectedDateKey);e.setDate(e.getDate()-7),t.selectedDateKey=M(e),t.currentDate=new Date(e.getFullYear(),e.getMonth(),1),h();return}if(t.view==="day"){const e=L(t.selectedDateKey);e.setDate(e.getDate()-1),t.selectedDateKey=M(e),t.currentDate=new Date(e.getFullYear(),e.getMonth(),1),h();return}t.currentDate=new Date(t.currentDate.getFullYear(),t.currentDate.getMonth()-1,1),h()},J=()=>{if(t.view==="week"){const e=L(t.selectedDateKey);e.setDate(e.getDate()+7),t.selectedDateKey=M(e),t.currentDate=new Date(e.getFullYear(),e.getMonth(),1),h();return}if(t.view==="day"){const e=L(t.selectedDateKey);e.setDate(e.getDate()+1),t.selectedDateKey=M(e),t.currentDate=new Date(e.getFullYear(),e.getMonth(),1),h();return}t.currentDate=new Date(t.currentDate.getFullYear(),t.currentDate.getMonth()+1,1),h()},ee=e=>{const r=e.target.closest('[data-action="set-view"]');if(!r||!b.contains(r))return;const d=r.dataset.view;!d||t.view===d||(t.view=d,h())},te=e=>{const r=e.target.closest('[data-action="toggle-week-filter"]');r&&(t.filters[r.value]=r.checked,t.view==="week"&&h())},ae=e=>{if(e.target.closest("[data-event-id]"))return;const r=e.target.closest("[data-date-key], [data-day-key]");if(!r||!a.contains(r))return;const d=r.dataset.dateKey||r.dataset.dayKey;if(!d||d===t.selectedDateKey)return;t.selectedDateKey=d;const s=L(d);t.currentDate=new Date(s.getFullYear(),s.getMonth(),1),h()},ne=e=>{const r=e.target.closest("[data-event-id]");if(!r||!a.contains(r))return;const d=r.dataset.eventId,s=d?ge[d]:null;if(s){if(C){if(f){f.querySelector(".drawer__title")?.replaceChildren(document.createTextNode("Detalhes do Evento"));const w=f.querySelector(".drawer__body"),i=f.querySelector(".drawer__footer");w&&(w.innerHTML=ve(s)),i&&(i.innerHTML=we())}}else{j($);const w=le({id:$,title:"Detalhes do Evento",width:336,content:ve(s),footer:we()});if(document.body.insertAdjacentHTML("beforeend",w),C=se({id:$,root:document}),f=document.querySelector(`[data-drawer="${$}"]`),f){const i=c=>{const v=c.target.closest("[data-event-details-action]");if(!v||!f.contains(v))return;const m=v.dataset.eventDetailsAction;if(m==="cancel"||m==="delete"){C?.close();return}if(m==="save"){const u=f.querySelector("[data-event-details-form]"),_=u?Object.fromEntries(new FormData(u).entries()):{};console.log("[agenda-eventos] detalhes do evento",{eventId:d,..._}),C?.close()}};f.addEventListener("click",i),H=i}}C?.open(r)}},re=()=>{if(!D){document.querySelector(`[data-drawer="${S}"]`)?.remove(),document.querySelector(`[data-drawer-backdrop="${S}"]`)?.remove();const e=le({id:S,title:"Novo Evento",width:336,content:$e(),footer:Fe()});if(document.body.insertAdjacentHTML("beforeend",e),D=se({id:S,root:document}),k=document.querySelector(`[data-drawer="${S}"]`),k){const r=d=>{const s=d.target.closest("[data-new-event-action]");if(!s||!k.contains(s))return;const w=s.dataset.newEventAction;if(w==="cancel"||w==="delete"){D?.close();return}if(w==="save"){const i=k.querySelector("[data-new-event-form]"),c=i?Object.fromEntries(new FormData(i).entries()):{};console.log("[agenda-eventos] novo evento",c),D?.close()}};k.addEventListener("click",r),K=r}}D?.open(V||null)};return P?.addEventListener("click",X),W?.addEventListener("click",Q),z?.addEventListener("click",Z),U?.addEventListener("click",J),V?.addEventListener("click",re),A.forEach(e=>e.addEventListener("change",te)),a.addEventListener("click",ae),a.addEventListener("click",ne),b.addEventListener("click",ee),h(),()=>{P?.removeEventListener("click",X),W?.removeEventListener("click",Q),z?.removeEventListener("click",Z),U?.removeEventListener("click",J),V?.removeEventListener("click",re),A.forEach(e=>e.removeEventListener("change",te)),a.removeEventListener("click",ae),a.removeEventListener("click",ne),b.removeEventListener("click",ee),k&&K&&k.removeEventListener("click",K),D?.cleanup&&D.cleanup(),j(S),D=null,k=null,K=null,f&&H&&f.removeEventListener("click",H),C?.cleanup&&C.cleanup(),j($),C=null,f=null,H=null}}export{Be as init};
