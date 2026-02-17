function g(t={}){const{id:a=`radio-${Date.now()}`,name:o="radio-group",value:r="",label:d="",description:l="",checked:n=!1,disabled:i=!1,error:c=!1,size:u="md",dark:s=!1,className:b=""}=t,m=["radio"];u!=="md"&&m.push(`radio--${u}`),i&&m.push("radio--disabled"),c&&m.push("radio--error"),s&&m.push("radio--dark"),b&&m.push(b);const p=d||l?`
    <div class="radio-content">
      ${d?`<span class="radio-label">${d}</span>`:""}
      ${l?`<span class="radio-description">${l}</span>`:""}
    </div>
  `:"";return`
    <label class="${m.join(" ")}">
      <input
        type="radio"
        class="radio-input"
        id="${a}"
        name="${o}"
        value="${r}"
        ${n?"checked":""}
        ${i?"disabled":""}
      />
      <span class="radio-circle"></span>
      ${p}
    </label>
  `}function $(t={}){const{name:a="radio-group",label:o="",options:r=[],value:d="",horizontal:l=!1,size:n="md",error:i="",dark:c=!1,className:u=""}=t,s=["radio-group"];l&&s.push("radio-group--horizontal"),u&&s.push(u);const b=r.map((p,k)=>{const f=`${a}-${k}`,T=p.value===d||d===""&&p.checked;return g({id:f,name:a,value:p.value||"",label:p.label||"",description:p.description||"",checked:T,disabled:p.disabled||!1,error:!!i,size:n,dark:c})}).join(""),m=o?`<div class="radio-group-label">${o}</div>`:"",v=i?`<div class="radio-group-error">${i}</div>`:"";return`
    <div class="${s.join(" ")}" data-radio-group="${a}">
      ${m}
      ${b}
      ${v}
    </div>
  `}function h(t={}){const{id:a=`radio-card-${Date.now()}`,name:o="radio-card-group",value:r="",label:d="",description:l="",checked:n=!1,disabled:i=!1,dark:c=!1,className:u=""}=t,s=["radio-card"];return n&&s.push("is-selected"),i&&s.push("radio-card--disabled"),c&&s.push("radio-card--dark"),u&&s.push(u),`
    <label class="${s.join(" ")}" data-radio-card>
      <input
        type="radio"
        class="radio-input"
        id="${a}"
        name="${o}"
        value="${r}"
        ${n?"checked":""}
        ${i?"disabled":""}
      />
      <span class="radio-circle"></span>
      <div class="radio-content">
        ${d?`<span class="radio-label">${d}</span>`:""}
        ${l?`<span class="radio-description">${l}</span>`:""}
      </div>
    </label>
  `}function L(t={}){const{name:a="radio-card-group",options:o=[],value:r="",dark:d=!1,className:l=""}=t,n=o.map((c,u)=>{const s=`${a}-${u}`,b=c.value===r||r===""&&c.checked;return h({id:s,name:a,value:c.value||"",label:c.label||"",description:c.description||"",checked:b,disabled:c.disabled||!1,dark:d})}).join(""),i=["radio-group"];return l&&i.push(l),`
    <div class="${i.join(" ")}" data-radio-card-group="${a}">
      ${n}
    </div>
  `}function y(t=document,a=null){t.addEventListener("change",o=>{const r=o.target.closest(".radio-input");if(!r)return;const d=r.name,l=r.value,n=r.closest("[data-radio-card]");if(n){const i=n.closest("[data-radio-card-group]");i&&i.querySelectorAll("[data-radio-card]").forEach(c=>{c.classList.remove("is-selected")}),n.classList.add("is-selected")}a&&a({name:d,value:l,element:r})})}function E(t,a){const o=t.querySelector(`input[name="${a}"]:checked`);return o?o.value:null}function H(t,a,o){const r=t.querySelector(`input[name="${a}"][value="${o}"]`);if(r){r.checked=!0;const d=r.closest("[data-radio-card]");if(d){const l=d.closest("[data-radio-card-group]");l&&l.querySelectorAll("[data-radio-card]").forEach(n=>{n.classList.remove("is-selected")}),d.classList.add("is-selected")}}}const e={create:g,createGroup:$,createCard:h,createCardGroup:L,init:y,getValue:E,setValue:H};function I(){document.getElementById("radio-basic-1").innerHTML=e.create({name:"basic",value:"1",checked:!0}),document.getElementById("radio-basic-2").innerHTML=e.create({name:"basic",value:"2"}),document.getElementById("radio-basic-3").innerHTML=e.create({name:"basic",value:"3"}),document.getElementById("radio-default").innerHTML=e.create({name:"states",value:"default",label:"Default"}),document.getElementById("radio-checked").innerHTML=e.create({name:"states",value:"checked",label:"Checked",checked:!0}),document.getElementById("radio-disabled").innerHTML=e.create({name:"states-disabled",value:"disabled",label:"Disabled",disabled:!0}),document.getElementById("radio-disabled-checked").innerHTML=e.create({name:"states-disabled-checked",value:"disabled-checked",label:"Disabled Checked",disabled:!0,checked:!0}),document.getElementById("radio-error").innerHTML=e.create({name:"states-error",value:"error",label:"Error",error:!0}),document.getElementById("radio-label-1").innerHTML=e.create({name:"labels",value:"1",label:"Radio One Text",checked:!0}),document.getElementById("radio-label-2").innerHTML=e.create({name:"labels",value:"2",label:"Radio Two Text"}),document.getElementById("radio-label-3").innerHTML=e.create({name:"labels",value:"3",label:"Radio Three Text"}),document.getElementById("radio-label-4").innerHTML=e.create({name:"labels",value:"4",label:"Radio Four Text"}),document.getElementById("radio-desc-1").innerHTML=e.create({name:"description",value:"1",label:"Radio One Text",description:"Radio btn text",checked:!0}),document.getElementById("radio-desc-2").innerHTML=e.create({name:"description",value:"2",label:"Radio Two Text",description:"Radio btn text"}),document.getElementById("radio-desc-3").innerHTML=e.create({name:"description",value:"3",label:"Radio Three Text",description:"Radio btn text"}),document.getElementById("radio-sm").innerHTML=e.create({name:"sizes",value:"sm",label:"Small",size:"sm",checked:!0}),document.getElementById("radio-md").innerHTML=e.create({name:"sizes",value:"md",label:"Medium",size:"md"}),document.getElementById("radio-lg").innerHTML=e.create({name:"sizes",value:"lg",label:"Large",size:"lg"}),document.getElementById("radio-group-vertical").innerHTML=e.createGroup({name:"group-vertical",label:"Selecione uma opção",value:"option2",options:[{value:"option1",label:"Opção 1"},{value:"option2",label:"Opção 2"},{value:"option3",label:"Opção 3"},{value:"option4",label:"Opção 4",disabled:!0}]}),document.getElementById("radio-group-horizontal").innerHTML=e.createGroup({name:"group-horizontal",label:"Selecione o tamanho",value:"md",horizontal:!0,options:[{value:"sm",label:"Pequeno"},{value:"md",label:"Médio"},{value:"lg",label:"Grande"}]}),document.getElementById("radio-group-error").innerHTML=e.createGroup({name:"group-error",label:"Selecione uma opção",error:"Este campo é obrigatório",options:[{value:"option1",label:"Opção 1"},{value:"option2",label:"Opção 2"},{value:"option3",label:"Opção 3"}]}),document.getElementById("radio-dark-1").innerHTML=e.create({name:"dark",value:"1",label:"Radio One Text",dark:!0}),document.getElementById("radio-dark-2").innerHTML=e.create({name:"dark",value:"2",label:"Radio Two Text",dark:!0,checked:!0}),document.getElementById("radio-dark-3").innerHTML=e.create({name:"dark",value:"3",label:"Radio Three Text",dark:!0}),document.getElementById("radio-dark-4").innerHTML=e.create({name:"dark",value:"4",label:"Radio Disabled",dark:!0,disabled:!0}),document.getElementById("radio-dark-5").innerHTML=e.create({name:"dark-error",value:"5",label:"Radio Error",dark:!0,error:!0}),e.init(document,t=>{console.log("Radio changed:",t)})}export{I as init};
