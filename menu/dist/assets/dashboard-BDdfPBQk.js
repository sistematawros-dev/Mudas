import{_ as ae}from"./index-BliPKCam.js";/* empty css             */import{c as V,i as q}from"./dropdown-DYu9aekd.js";import{c as oe,i as ne}from"./segmented-CxRHTJbh.js";/* empty css                 *//* empty css              */import{c as ie,i as se}from"./tabs-Bc_csLdm.js";/* empty css                  *//* empty css                 *//* empty css                  *//* empty css             */function le(e={}){const{title:t="",value:a="",change:o=null,hasMenu:s=!0}=e,i=o?re(o.type):"",c=o?`kpi-card-change--${o.type}`:"";return`
    <div class="kpi-card">
      <div class="kpi-card-header">
        <h3 class="kpi-card-title">${t}</h3>
        ${s?`
          <button type="button" class="kpi-card-menu-btn" aria-label="Mais opções">
            ${ce()}
          </button>
        `:""}
      </div>

      <div class="kpi-card-value">${a}</div>

      ${o?`
        <div class="kpi-card-change ${c}">
          ${i}
          <span class="kpi-card-change-value">${de(o.value)}%</span>
          <span class="kpi-card-change-label">${o.label}</span>
        </div>
      `:""}
    </div>
  `}function re(e){return e==="positive"?`
      <svg class="kpi-card-change-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="8" fill="currentColor" fill-opacity="0.1"/>
        <path d="M8 11V5M8 5L5 8M8 5L11 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `:e==="negative"?`
      <svg class="kpi-card-change-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="8" fill="currentColor" fill-opacity="0.1"/>
        <path d="M8 5V11M8 11L11 8M8 11L5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `:""}function ce(){return`
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
    </svg>
  `}function de(e){const t=Math.abs(e);return e>0?`+${t}`:`-${t}`}function ue(e,t){if(!e)return;e.querySelectorAll(".kpi-card-menu-btn").forEach(o=>{o.addEventListener("click",s=>{s.stopPropagation();const i=o.closest(".kpi-card");t&&t(i,o)})})}function ge(e={}){const{data:t=[],legend:a=[],id:o=`chart-${Math.random().toString(36).substr(2,9)}`,height:s=280}=e;if(t.length===0)return'<div class="chart-empty">Sem dados</div>';const i={top:5,right:-20,bottom:50,left:-20},c=Math.max(...t.map(u=>u.values.reduce((m,r)=>m+r.value,0))),l=(100-i.left-i.right)/t.length,n=l*.6,p=100-i.bottom,g=p+4,A=Array.from({length:5},(u,m)=>{const r=i.top+m/4*(100-i.top-i.bottom);return`<line x1="${i.left}" y1="${r}" x2="${100-i.right}" y2="${r}" class="chart-grid-line" />`}).join(""),y=`<line x1="${i.left}" y1="${g}" x2="${100-i.right}" y2="${g}" class="chart-axis-line" />`,w=t.map((u,m)=>{const r=i.left+m*l+(l-n)/2,B=Math.max(100-i.top-i.bottom,1),M=.7;let S=p;const C=u.values.map((L,I)=>{const K=L.value/c*B,G=S-K,Z=I>0,U=I<u.values.length-1,X=I===0,f=S-(Z?M/2:0),ee=G+(U?M/2:0),O=Math.max(f-ee,.35),E=f-O,D=Math.min(1.2,n/2,O/2),T=X?D:0,te=`
        <path
          d="${`
        M ${r+T} ${f}
        L ${r+n-T} ${f}
        Q ${r+n} ${f} ${r+n} ${f-T}
        L ${r+n} ${E+D}
        Q ${r+n} ${E} ${r+n-D} ${E}
        L ${r+D} ${E}
        Q ${r} ${E} ${r} ${E+D}
        L ${r} ${f-T}
        Q ${r} ${f} ${r+T} ${f}
        Z
      `}"
          class="chart-bar-segment"
          style="fill: ${L.color}"
          data-label="${L.label}"
          data-value="${L.value}"
        />
      `;return S=G,te}).reverse().join(""),H=`<text x="${r+n/2}" y="${g+11}" class="chart-label">${u.label}</text>`;return C+H}).join(""),v=t.map((u,m)=>{const r=i.left+m*l+l/2;return`<line x1="${r}" y1="${g}" x2="${r}" y2="${g+3}" class="chart-axis-tick" />`}).join(""),k=a.length>0?`
    <div class="chart-legend">
      ${a.map(u=>`
        <div class="chart-legend-item">
          <span class="chart-legend-color" style="background: ${u.color}"></span>
          <span class="chart-legend-label">${u.label}</span>
        </div>
      `).join("")}
    </div>
  `:"";return`
    <div class="chart chart--stacked-bar" id="${o}">
      ${k}
      <svg viewBox="0 0 100 100" style="height: ${s}px;">
        ${A}
        ${y}
        ${v}
        ${w}
      </svg>
    </div>
  `}function pe(e,t,a={}){if(!e)return;e.querySelectorAll(".chart--line").forEach(i=>{const c=i.querySelectorAll(".chart-point"),d=i.querySelector(".chart-tooltip"),l=i.querySelector(".chart-tooltip-line"),n=i.querySelectorAll(".chart-label--x"),p=i.getAttribute("data-active-index"),g=p!==null&&p!==""?Number(p):null,A=a.persistentTooltip!==!1;let y=Number.isInteger(g)?g:null;if(!d)return;const w=u=>{c.forEach((m,r)=>{m.classList.toggle("is-active",r===u)}),n.forEach((m,r)=>{m.classList.toggle("chart-label--x-active",r===u)})},v=u=>{const m=c[u];if(!m)return;const r=Number(m.getAttribute("cx")),B=Number(m.getAttribute("cy")),M=i.clientWidth,S=i.clientHeight,C=r/100*M,H=B/100*S-10;if(d.style.left=`${C}px`,d.style.top=`${H}px`,d.classList.add("is-visible"),l&&(l.setAttribute("x1",String(r)),l.setAttribute("x2",String(r)),l.style.opacity="0.6"),t){const L=t(u);L&&(d.innerHTML=L)}w(u),y=u},k=()=>{d.classList.remove("is-visible"),l&&(l.style.opacity="0"),y=null,w(null)};c.forEach((u,m)=>{u.addEventListener("mouseenter",()=>{v(m)}),u.addEventListener("mouseleave",()=>{if(A&&Number.isInteger(g)){v(g);return}k()})}),i.addEventListener("mouseleave",()=>{if(A&&Number.isInteger(g)){v(g);return}k()}),Number.isInteger(g)?v(g):y!==null&&v(y)}),e.querySelectorAll(".chart-bar, .chart-bar-segment").forEach(i=>{i.addEventListener("mouseenter",()=>{i.style.opacity="0.8"}),i.addEventListener("mouseleave",()=>{i.style.opacity="1"})})}function me(e={}){const{id:t="",icon:a="",iconBg:o="var(--color-primary-soft)",title:s="",description:i="",hasAction:c=!0,actionIcon:d="chevron-right",href:l="",value:n=""}=e,p=!!l,g=p?"a":"button",A=p?`href="${l}"`:'type="button"',y=n?`data-value="${n}"`:"",w=t?`id="${t}"`:"",v=`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,u=a.includes("<svg")?a:`<img src="${a}" alt="" />`;return`
    <${g} class="list-item" ${A} ${y} ${w}>
      <div class="list-item-icon" style="background: ${o}">
        ${u}
      </div>
      <div class="list-item-content">
        <div class="list-item-title">${s}</div>
        ${i?`<div class="list-item-description">${i}</div>`:""}
      </div>
      ${c?`
        <div class="list-item-action">
          ${d==="chevron-right"?v:d}
        </div>
      `:""}
    </${g}>
  `}function he(e=[],t=""){return`
    <div class="${["list",t].filter(Boolean).join(" ")}">
      ${e.map(o=>me(o)).join("")}
    </div>
  `}function be(e,t){if(!e)return;e.querySelectorAll(".list-item").forEach(o=>{o.tagName.toLowerCase()!=="a"&&o.addEventListener("click",()=>{const s=o.dataset.value;t&&t(o,s)})})}let h=null,b=null,$=null,x=null,P=null;async function J(){return P||(P=ae(()=>import("./apexcharts-CzFgh7Xk.js"),[]).then(e=>e.default)),P}function We(){return N(),document.querySelectorAll(".broadcast-banner--fixed").forEach(e=>e.remove()),ve(),fe(),ye(),Le(),Ee(),Fe(),Me(),Be(),Ce(),function(){if(h){try{h.destroy()}catch{}h=null}if(b){try{b.destroy()}catch{}b=null}N()}}function N(){$&&($.disconnect(),$=null),x&&(x.disconnect(),x=null)}function ve(){const e=document.getElementById("dashboard-dropdown");if(!e)return;const t=V({id:"painel-dropdown",trigger:"Painel de Pedidos",items:[{label:"Painel de Pedidos",value:"pedidos",selected:!0},{label:"Painel de Produção",value:"producao"},{label:"Painel de Estoque",value:"estoque"},{label:"Painel Financeiro",value:"financeiro"}],size:"sm"});e.innerHTML=t,q(e,({value:a})=>{console.log("Painel selecionado:",a)})}function fe(){const e=document.getElementById("dashboard-segmented");if(!e)return;const t=oe({items:[{label:"Ano",value:"year"},{label:"Mês",value:"month"},{label:"Semana",value:"week"},{label:"Dia",value:"day"}],activeValue:"month",size:"sm"});e.innerHTML=t,ne(e,a=>{console.log("Período selecionado:",a)})}function ye(){const e=document.getElementById("dashboard-kpi-grid");if(!e)return;const a=[{title:"Taxa de germinação",value:"21,42%",change:{value:4.2,type:"positive",label:"em relação ao mês passado"}},{title:"Taxa de sobrevivência",value:"8,92%",change:{value:-1.5,type:"negative",label:"em relação ao mês passado"}},{title:"Mudas produzidas",value:"147",change:{value:12.3,type:"positive",label:"em relação ao mês passado"}},{title:"Custo por muda",value:"R$ 0,87",change:{value:3.8,type:"positive",label:"em relação ao mês passado"}}].map(o=>le(o)).join("");e.innerHTML=a,ue(e,o=>{console.log("Menu do card clicado:",o)})}function Le(){const e=document.getElementById("dashboard-filters-btn");e&&e.addEventListener("click",()=>{console.log("Filtros avançados clicado")})}const _=[{label:"Esta semana",value:"week"},{label:"Este mês",value:"month"},{label:"Este trimestre",value:"quarter"},{label:"Este ano",value:"year"}],W={week:{highlightIndex:4,comparisonLabel:"em comparação com o mês passado",points:[{dayLabel:"Seg",value:10,dateLabel:"Segunda-feira, 21 de julho de 2025",change:.9},{dayLabel:"Ter",value:12,dateLabel:"Terça-feira, 22 de julho de 2025",change:1.4},{dayLabel:"Qua",value:9,dateLabel:"Quarta-feira, 23 de julho de 2025",change:-1.8},{dayLabel:"Qui",value:15,dateLabel:"Quinta-feira, 24 de julho de 2025",change:3.2},{dayLabel:"Sex",value:10,dateLabel:"Sexta-feira, 25 de julho de 2025",change:2},{dayLabel:"Sáb",value:8,dateLabel:"Sábado, 26 de julho de 2025",change:-1.1},{dayLabel:"Dom",value:11,dateLabel:"Domingo, 27 de julho de 2025",change:1.3}]},month:{highlightIndex:3,comparisonLabel:"em comparação com o mês passado",points:[{dayLabel:"Semana 1",value:8,dateLabel:"Semana 1 de julho de 2025",change:.5},{dayLabel:"Semana 2",value:11,dateLabel:"Semana 2 de julho de 2025",change:1.7},{dayLabel:"Semana 3",value:9,dateLabel:"Semana 3 de julho de 2025",change:-.8},{dayLabel:"Semana 4",value:12,dateLabel:"Semana 4 de julho de 2025",change:2.2}]},quarter:{highlightIndex:1,comparisonLabel:"em comparação com o trimestre passado",points:[{dayLabel:"Abr",value:9,dateLabel:"Abril de 2025",change:.7},{dayLabel:"Mai",value:11,dateLabel:"Maio de 2025",change:1.6},{dayLabel:"Jun",value:10,dateLabel:"Junho de 2025",change:.9}]},year:{highlightIndex:6,comparisonLabel:"em comparação com o ano passado",points:[{dayLabel:"Jan",value:7,dateLabel:"Janeiro de 2025",change:.3},{dayLabel:"Fev",value:8,dateLabel:"Fevereiro de 2025",change:.8},{dayLabel:"Mar",value:9,dateLabel:"Março de 2025",change:1.1},{dayLabel:"Abr",value:10,dateLabel:"Abril de 2025",change:1.4},{dayLabel:"Mai",value:9,dateLabel:"Maio de 2025",change:-.6},{dayLabel:"Jun",value:11,dateLabel:"Junho de 2025",change:1.9},{dayLabel:"Jul",value:10,dateLabel:"Julho de 2025",change:2}]}};async function $e(e="week"){return W[e]||W.week}function xe(e){return{points:(Array.isArray(e?.points)?e.points:[]).map(a=>({label:a.dayLabel||a.label||"",value:Number(a.value)||0,date:a.dateLabel||a.date||"",change:Number(a.change)||0})),highlightIndex:Number.isInteger(e?.highlightIndex)?e.highlightIndex:0,comparisonLabel:e?.comparisonLabel||"em comparação com o período anterior"}}function Ae(e,t){const a=e.change>=0,o=a?"engagement-tooltip-trend--positive":"engagement-tooltip-trend--negative",s=a?"&uarr;":"&darr;",i=Math.abs(e.change).toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:1});return`
    <div class="engagement-tooltip-header">
      <p class="chart-tooltip-date">${e.date}</p>
    </div>
    <div class="engagement-tooltip-body">
      <p class="chart-tooltip-value">${e.value}%</p>
      <div class="engagement-tooltip-detail">
        <span class="engagement-tooltip-trend ${o}">
          <span class="engagement-tooltip-trend-icon">${s}</span>
          <span>${i}%</span>
        </span>
        <span class="engagement-tooltip-context">${t}</span>
      </div>
    </div>
  `}function F(e,{min:t=180,max:a=280}={}){const o=e?.closest(".card--dashboard");if(!o)return a;const s=window.getComputedStyle(o),i=parseFloat(s.paddingTop)||0,c=parseFloat(s.paddingBottom)||0,d=parseFloat(s.gap||s.rowGap)||0,l=o.querySelector(".card-header"),n=l?l.getBoundingClientRect().height:0,p=Math.floor(o.clientHeight-i-c-n-d);return!Number.isFinite(p)||p<=0?a:Math.max(t,Math.min(a,p))}function Y({chartContainer:e,getChart:t,min:a=200,max:o=280,type:s}){if(!e||typeof ResizeObserver>"u")return;s==="engagement"&&$&&($.disconnect(),$=null),s==="distribution"&&x&&(x.disconnect(),x=null);const c=new ResizeObserver(()=>{const d=t();if(!d||!document.body.contains(e))return;const l=F(e,{min:a,max:o});try{d.updateOptions({chart:{height:l}},!1,!1)}catch{}});c.observe(e),s==="engagement"&&($=c),s==="distribution"&&(x=c)}async function we(e,t){if(h&&(h.destroy(),h=null),!t.points.length){e.innerHTML='<div class="chart-empty">Sem dados</div>';return}const a=await J(),o=Math.min(Math.max(t.highlightIndex,0),t.points.length-1),s=t.points.map(n=>n.label),i=t.points.map(n=>n.value),c=s[o],l={chart:{type:"area",height:F(e,{min:200,max:280}),toolbar:{show:!1},zoom:{enabled:!1},fontFamily:"Archivo, sans-serif",animations:{easing:"easeinout",speed:400},redrawOnParentResize:!0,redrawOnWindowResize:!0},series:[{name:"Engajamento",data:i}],colors:["#F6C03C"],stroke:{show:!1},dataLabels:{enabled:!1},legend:{show:!1},grid:{borderColor:"rgba(137, 143, 143, 0.28)",strokeDashArray:3,xaxis:{lines:{show:!1}},yaxis:{lines:{show:!0}},padding:{left:8,right:8,bottom:6}},xaxis:{categories:s,axisBorder:{show:!1},axisTicks:{show:!1},tooltip:{enabled:!1},labels:{offsetY:-2,style:{colors:s.map(()=>"#898F8F"),fontSize:"14px",fontWeight:500}}},yaxis:{min:0,max:16,tickAmount:8,labels:{formatter:n=>`${Math.round(n)}%`,style:{colors:"#898F8F",fontSize:"14px",fontWeight:400}}},tooltip:{enabled:!0,custom:({dataPointIndex:n})=>{const p=n>=0?n:o,g=t.points[p]||t.points[o];return Ae(g,t.comparisonLabel)}},annotations:{xaxis:[{x:c,borderColor:"#F6C03C",strokeDashArray:4,opacity:.6}]}};e.innerHTML="",e.classList.add("engagement-apex-host"),h=new a(e,l),await h.render(),requestAnimationFrame(()=>{if(!h)return;const n=F(e,{min:200,max:280});h.updateOptions({chart:{height:n}},!1,!1)}),Y({chartContainer:e,getChart:()=>h,min:200,max:280,type:"engagement"})}function Ee(){const e=document.getElementById("engagement-chart"),t=document.getElementById("engagement-dropdown");if(!e||!t)return;let a="week",o=0;const s=()=>{const d=V({id:"engagement-period-dropdown",trigger:_.find(l=>l.value===a)?.label||"Esta semana",items:_.map(l=>({...l,selected:l.value===a})),size:"sm"});t.innerHTML=d},i=()=>{q(t,({value:d})=>{a=d,s(),i(),c()})},c=async()=>{const d=++o,l=await $e(a);if(d!==o)return;const n=xe(l);await we(e,n)};s(),i(),c()}const ke={points:[{label:"Tomate",value:700},{label:"Pimentao",value:1200},{label:"Tomate",value:700},{label:"Tomate",value:900},{label:"Tomate",value:500}]};async function Se(){return ke}function De(e){return(Array.isArray(e?.points)?e.points:[]).map(a=>({label:a.label||"",value:Number(a.value)||0}))}function z(e){return`$${Math.round(e).toLocaleString("pt-BR")}`}function Q(e){const t=e?.el;if(!t)return;const a=t.querySelector(".apexcharts-bar-series");if(!a)return;const o=a.querySelector("#distribution-top-caps");o&&o.remove();const s=a.querySelectorAll("path");if(!s.length)return;const i="http://www.w3.org/2000/svg",c=document.createElementNS(i,"g");c.setAttribute("id","distribution-top-caps"),c.setAttribute("pointer-events","none"),s.forEach(d=>{const l=d.getBBox();if(!l.width||!l.height)return;const n=document.createElementNS(i,"line"),p=2,g=l.y;n.setAttribute("x1",String(l.x-p)),n.setAttribute("x2",String(l.x+l.width+p)),n.setAttribute("y1",String(g)),n.setAttribute("y2",String(g)),n.setAttribute("stroke","#0A73B7"),n.setAttribute("stroke-width","4"),n.setAttribute("stroke-linecap","round"),c.appendChild(n)}),a.appendChild(c)}function j(e){requestAnimationFrame(()=>{Q(e),setTimeout(()=>Q(e),220)})}async function Te(e,t){if(b&&(b.destroy(),b=null),!t.length){e.innerHTML='<div class="chart-empty">Sem dados</div>';return}const a=await J(),o=t.map(n=>n.label),s=t.map(n=>n.value),i=Math.max(...s),c=Math.max(1200,Math.ceil(i/200)*200),l={chart:{type:"bar",height:F(e,{min:200,max:280}),toolbar:{show:!1},zoom:{enabled:!1},fontFamily:"Archivo, sans-serif",animations:{easing:"easeinout",speed:350},redrawOnParentResize:!0,redrawOnWindowResize:!0,events:{mounted:n=>{j(n)},updated:n=>{j(n)},animationEnd:n=>{j(n)}}},series:[{name:"Distribuicao",data:s}],colors:["#DCE8F2"],plotOptions:{bar:{horizontal:!1,columnWidth:"64%",borderRadius:6,borderRadiusApplication:"end",dataLabels:{position:"top"}}},fill:{type:"gradient",gradient:{shadeIntensity:0,opacityFrom:1.2,opacityTo:.04,stops:[0,100]}},stroke:{show:!1},dataLabels:{enabled:!0,formatter:n=>z(n),offsetY:14,style:{colors:["#0A73B7"],fontSize:"14px",fontWeight:700},background:{enabled:!1}},legend:{show:!1},grid:{borderColor:"rgba(137, 143, 143, 0.28)",strokeDashArray:4,xaxis:{lines:{show:!1}},yaxis:{lines:{show:!0}},padding:{left:8,right:8,top:6,bottom:0}},xaxis:{categories:o,axisBorder:{show:!1},axisTicks:{show:!0,color:"rgba(137, 143, 143, 0.35)"},labels:{style:{colors:o.map(()=>"#676F73"),fontSize:"14px",fontWeight:500},offsetY:-2}},yaxis:{min:0,max:c,tickAmount:c/200,labels:{formatter:n=>z(n),style:{colors:"#898F8F",fontSize:"14px",fontWeight:400}}},tooltip:{y:{formatter:n=>z(n)}}};e.innerHTML="",e.classList.add("distribution-apex-host"),b=new a(e,l),await b.render(),requestAnimationFrame(()=>{if(!b)return;const n=F(e,{min:200,max:280});b.updateOptions({chart:{height:n}},!1,!1)}),Y({chartContainer:e,getChart:()=>b,min:200,max:280,type:"distribution"})}function Fe(){const e=document.getElementById("distribution-chart");if(!e)return;(async()=>{const a=await Se(),o=De(a);await Te(e,o)})()}function Me(){const e=document.getElementById("production-control");if(!e)return;const t=[{label:"Lotes ativos",value:2340,percentage:88,color:"#0A95D9"},{label:"Transplantes",value:320,percentage:9,color:"#0A95D9"},{label:"Perdas",value:86,percentage:3,color:"#0A95D9"},{label:"Limpo",value:34,percentage:1,color:"#0A95D9"}],a=[{label:"Lotes ativos",value:2340,percentage:88,color:"#0A95D9"},{label:"Transplantes",value:320,percentage:9,color:"#0A95D9"},{label:"Perdas",value:86,percentage:3,color:"#0A95D9"},{label:"Limpo",value:34,percentage:1,color:"#0A95D9"}],o=[{label:"Lotes ativos",value:2340,percentage:88,color:"#0A95D9"},{label:"Transplantes",value:320,percentage:9,color:"#0A95D9"},{label:"Perdas",value:86,percentage:3,color:"#0A95D9"},{label:"Limpo",value:34,percentage:1,color:"#0A95D9"}],s=ie({id:"production-tabs",variant:"button",size:"sm",fullWidth:!0,activeTab:1,tabs:[{label:"Status",value:"status",content:R(t)},{label:"Fontes",value:"fontes",content:R(a)},{label:"Demográfico",value:"demografico",content:R(o)}]});e.innerHTML=s,se(e)}function R(e){return`
    <div class="production-list">
      ${e.map(t=>`
        <div class="production-item">
          <div class="production-item-indicator" style="background: ${t.color}"></div>
          <div class="production-item-label">${t.label}</div>
          <div class="production-item-value">${t.value.toLocaleString("pt-BR")}</div>
          <div class="production-item-badge">
            <span class="production-percentage">${t.percentage}%</span>
          </div>
        </div>
      `).join("")}
    </div>
  `}function Be(){const e=document.getElementById("growth-chart"),t=document.getElementById("growth-dropdown");if(!e||!t)return;const a=V({id:"growth-period-dropdown",trigger:"Esta semana",items:[{label:"Esta semana",value:"week",selected:!0},{label:"Este mês",value:"month"},{label:"Este trimestre",value:"quarter"}],size:"sm"});t.innerHTML=a,q(t,({value:i})=>{console.log("Período de crescimento:",i)});const s=ge({data:[{label:"Seg",values:[{label:"Germinação",value:1200,color:"#1E3A5F"},{label:"Desenvolvimento",value:2800,color:"#FFA500"},{label:"Transplante",value:1500,color:"#4A90E2"}]},{label:"Ter",values:[{label:"Germinação",value:2900,color:"#1E3A5F"},{label:"Desenvolvimento",value:3100,color:"#FFA500"},{label:"Transplante",value:1800,color:"#4A90E2"}]},{label:"Qua",values:[{label:"Germinação",value:3400,color:"#1E3A5F"},{label:"Desenvolvimento",value:2600,color:"#FFA500"},{label:"Transplante",value:1400,color:"#4A90E2"}]},{label:"Qui",values:[{label:"Germinação",value:3e3,color:"#1E3A5F"},{label:"Desenvolvimento",value:2900,color:"#FFA500"},{label:"Transplante",value:1200,color:"#4A90E2"}]},{label:"Sex",values:[{label:"Germinação",value:3600,color:"#1E3A5F"},{label:"Desenvolvimento",value:3200,color:"#FFA500"},{label:"Transplante",value:2100,color:"#4A90E2"}]},{label:"Sáb",values:[{label:"Germinação",value:4200,color:"#1E3A5F"},{label:"Desenvolvimento",value:2400,color:"#FFA500"},{label:"Transplante",value:1800,color:"#4A90E2"}]},{label:"Dom",values:[{label:"Germinação",value:3100,color:"#1E3A5F"},{label:"Desenvolvimento",value:2800,color:"#FFA500"},{label:"Transplante",value:1500,color:"#4A90E2"}]}],legend:[{label:"Germinação",color:"#1E3A5F"},{label:"Desenvolvimento",color:"#FFA500"},{label:"Transplante",color:"#4A90E2"}],id:"growth-stacked-chart",height:240});e.innerHTML=s,pe(e)}function Ce(){const e=document.getElementById("suggestions-list");if(!e)return;const t=`
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,o=he([{id:"suggestion-1",icon:t,iconBg:"rgba(74, 144, 226, 0.1)",title:"Ver Pedidos",description:"Gerenciar pedidos de produção",value:"optimize-irrigation"},{id:"suggestion-2",icon:t,iconBg:"rgba(255, 165, 0, 0.1)",title:"Ordens de Produção",description:"Acompanhar ordens ativas",value:"adjust-fertilization"},{id:"suggestion-3",icon:t,iconBg:"rgba(76, 175, 80, 0.1)",title:"Board de Produção",description:"Visualizar fluxo kanban",value:"schedule-transplant"},{id:"suggestion-4",icon:t,iconBg:"rgba(244, 67, 54, 0.1)",title:"Cadastros",description:"Gerenciar pessoas e empresas",value:"restock"}]);e.innerHTML=o,be(e,(s,i)=>{if(i==="schedule-transplant"){location.hash="/kanban-producao";return}console.log("Sugestão clicada:",i)})}export{We as init};
