/* empty css                 */const M=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],w=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],m={chevronLeft:'<svg viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',chevronRight:'<svg viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function D(n={}){const{date:t=new Date,selected:u=null,rangeStart:a=null,rangeEnd:l=null,dark:o=!1,compact:r=!1,showFooter:e=!0}=n,c=t.getFullYear(),s=t.getMonth(),d=new Date,p=["calendar"];o&&p.push("calendar--dark"),r&&p.push("calendar--compact");const v=L(c,s,{selected:u,rangeStart:a,rangeEnd:l,today:d}),k=M.map(i=>`<span class="calendar-weekday">${i}</span>`).join(""),g=e?`
    <div class="calendar-footer">
      <button class="calendar-today-btn" type="button" data-action="today">Hoje</button>
    </div>
  `:"";return`
    <div class="${p.join(" ")}" data-calendar data-year="${c}" data-month="${s}">
      <div class="calendar-header">
        <span class="calendar-title">${w[s]} ${c}</span>
        <div class="calendar-nav">
          <button class="calendar-nav-btn" type="button" data-action="prev">${m.chevronLeft}</button>
          <button class="calendar-nav-btn" type="button" data-action="next">${m.chevronRight}</button>
        </div>
      </div>
      <div class="calendar-weekdays">${k}</div>
      <div class="calendar-days">${v}</div>
      ${g}
    </div>
  `}function L(n,t,{selected:u,rangeStart:a,rangeEnd:l,today:o}){const r=new Date(n,t,1),e=new Date(n,t+1,0),c=r.getDay(),s=e.getDate(),p=new Date(n,t,0).getDate();let v="";for(let i=c-1;i>=0;i--){const y=p-i;v+=`<button class="calendar-day calendar-day--other" type="button" data-day="${y}" data-month="${t-1}">${y}</button>`}for(let i=1;i<=s;i++){const y=["calendar-day"],h=new Date(n,t,i);b(h,o)&&y.push("is-today"),u&&b(h,u)&&y.push("is-selected"),a&&l&&(b(h,a)?y.push("is-range-start"):b(h,l)?y.push("is-range-end"):h>a&&h<l&&y.push("is-in-range")),v+=`<button class="${y.join(" ")}" type="button" data-day="${i}" data-month="${t}">${i}</button>`}const g=42-(c+s);for(let i=1;i<=g;i++)v+=`<button class="calendar-day calendar-day--other" type="button" data-day="${i}" data-month="${t+1}">${i}</button>`;return v}function b(n,t){return!n||!t?!1:n.getDate()===t.getDate()&&n.getMonth()===t.getMonth()&&n.getFullYear()===t.getFullYear()}function H(n={}){const{year:t=new Date().getFullYear(),selected:u=null,dark:a=!1}=n,l=["calendar"];a&&l.push("calendar--dark");const o=w.map((r,e)=>{const c=u&&u.getMonth()===e,s=new Date().getMonth()===e,d=["calendar-picker-item"];return c?d.push("is-selected"):s&&d.push("is-current"),`<button class="${d.join(" ")}" type="button" data-month="${e}">${r.slice(0,3)}</button>`}).join("");return`
    <div class="${l.join(" ")}" data-calendar-picker="month">
      <div class="calendar-header">
        <span class="calendar-title">${t}</span>
        <div class="calendar-nav">
          <button class="calendar-nav-btn" type="button" data-action="prev">${m.chevronLeft}</button>
          <button class="calendar-nav-btn" type="button" data-action="next">${m.chevronRight}</button>
        </div>
      </div>
      <div class="calendar-picker">${o}</div>
    </div>
  `}function Y(n={}){const{startYear:t=new Date().getFullYear()-4,selected:u=null,dark:a=!1}=n,l=["calendar"];a&&l.push("calendar--dark");let o="";for(let r=0;r<12;r++){const e=t+r,c=u&&u.getFullYear()===e,s=new Date().getFullYear()===e,d=["calendar-picker-item"];c?d.push("is-selected"):s&&d.push("is-current"),o+=`<button class="${d.join(" ")}" type="button" data-year="${e}">${e}</button>`}return`
    <div class="${l.join(" ")}" data-calendar-picker="year">
      <div class="calendar-header">
        <span class="calendar-title">${t} - ${t+11}</span>
        <div class="calendar-nav">
          <button class="calendar-nav-btn" type="button" data-action="prev">${m.chevronLeft}</button>
          <button class="calendar-nav-btn" type="button" data-action="next">${m.chevronRight}</button>
        </div>
      </div>
      <div class="calendar-picker">${o}</div>
    </div>
  `}function $(n=document,t=null){n.querySelectorAll("[data-calendar]").forEach(a=>{a.addEventListener("click",l=>{const o=l.target.closest("button");if(!o)return;const r=o.dataset.action,e=o.dataset.day,c=o.dataset.month;if(r==="prev"||r==="next"){const s=parseInt(a.dataset.year),d=parseInt(a.dataset.month),p=new Date(s,d+(r==="next"?1:-1),1),v=D({date:p,dark:a.classList.contains("calendar--dark"),compact:a.classList.contains("calendar--compact")});a.outerHTML=v,$(n,t)}if(r==="today"){const s=new Date,d=D({date:s,selected:s,dark:a.classList.contains("calendar--dark"),compact:a.classList.contains("calendar--compact")});a.outerHTML=d,$(n,t),t&&t(s)}if(e&&c){const s=parseInt(a.dataset.year),d=new Date(s,parseInt(c),parseInt(e));a.querySelectorAll(".is-selected").forEach(p=>p.classList.remove("is-selected")),o.classList.add("is-selected"),t&&t(d)}})})}const f={render:D,renderMonthPicker:H,renderYearPicker:Y,init:$,MONTHS:w,WEEKDAYS:M};function E(){const n=document.getElementById("calendar-default");n&&(n.innerHTML=f.render({date:new Date}));const t=document.getElementById("calendar-selected");if(t){const e=new Date,c=new Date(e.getFullYear(),e.getMonth(),15);t.innerHTML=f.render({date:e,selected:c})}const u=document.getElementById("calendar-master");if(u){const e=new Date,c=new Date(e.getFullYear(),e.getMonth(),18),s=new Date(e.getFullYear(),e.getMonth(),22);u.innerHTML=f.render({date:e,rangeStart:c,rangeEnd:s,showFooter:!0})}const a=document.getElementById("calendar-months");a&&(a.innerHTML=f.renderMonthPicker({year:new Date().getFullYear()}));const l=document.getElementById("calendar-years");l&&(l.innerHTML=f.renderYearPicker({startYear:2020}));const o=document.getElementById("calendar-light");o&&(o.innerHTML=f.render({date:new Date,selected:new Date}));const r=document.getElementById("calendar-dark");r&&(r.innerHTML=f.render({date:new Date,selected:new Date,dark:!0})),f.init(document,e=>{console.log("Data selecionada:",e)})}export{E as init};
