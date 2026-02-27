/* empty css               */function R(t={}){const{id:m=`slider-${Date.now()}`,value:i=50,min:s=0,max:e=100,step:n=1,showTooltip:l=!0,showLabels:f=!0,showInput:L=!1,size:h="md",color:p="primary",disabled:r=!1,dark:E=!1,className:y="",formatValue:g=c=>c,formatLabel:$=c=>c}=t,o=(i-s)/(e-s)*100,a=["slider"];h!=="md"&&a.push(`slider--${h}`),p!=="primary"&&a.push(`slider--${p}`),r&&a.push("slider--disabled"),E&&a.push("slider--dark"),l&&a.push("slider--show-tooltip"),y&&a.push(y);const u=L?`
    <div class="slider-header">
      <input type="text" class="slider-input" value="${g(i)}" data-slider-input />
    </div>
  `:"",d=f?`
    <div class="slider-labels">
      <span>${$(s)}</span>
      <span>${$(e)}</span>
    </div>
  `:"";return`
    <div class="${a.join(" ")}" data-slider data-min="${s}" data-max="${e}" data-step="${n}" data-value="${i}" id="${m}">
      ${u}
      <div class="slider-track-container">
        <div class="slider-track" data-slider-track>
          <div class="slider-fill" style="left: 0; width: ${o}%"></div>
          <div class="slider-thumb slider-thumb--lines" style="left: ${o}%" data-slider-thumb>
            ${l?`<div class="slider-tooltip">${g(i)}</div>`:""}
          </div>
        </div>
      </div>
      ${d}
    </div>
  `}function B(t={}){const{id:m=`slider-range-${Date.now()}`,minValue:i=20,maxValue:s=80,min:e=0,max:n=100,step:l=1,showTooltip:f=!0,showLabels:L=!0,showInputs:h=!0,minLabel:p="min.*",maxLabel:r="max.*",size:E="md",color:y="primary",disabled:g=!1,dark:$=!1,className:o="",formatValue:a=V=>V,formatLabel:u=V=>V}=t,d=(i-e)/(n-e)*100,c=(s-e)/(n-e)*100,w=["slider"];E!=="md"&&w.push(`slider--${E}`),y!=="primary"&&w.push(`slider--${y}`),g&&w.push("slider--disabled"),$&&w.push("slider--dark"),o&&w.push(o);const b=h?`
    <div class="slider-header">
      <div class="slider-input-group">
        <label class="slider-input-label">${p}</label>
        <input type="text" class="slider-input" value="${a(i)}" data-slider-input-min />
      </div>
      <div class="slider-input-group">
        <label class="slider-input-label">${r}</label>
        <input type="text" class="slider-input" value="${a(s)}" data-slider-input-max />
      </div>
    </div>
  `:"",v=L?`
    <div class="slider-labels">
      <span>${u(e)}</span>
      <span>${u(n)}</span>
    </div>
  `:"";return`
    <div class="${w.join(" ")}" data-slider-range data-min="${e}" data-max="${n}" data-step="${l}" data-min-value="${i}" data-max-value="${s}" id="${m}">
      ${b}
      <div class="slider-track-container">
        <div class="slider-track" data-slider-track>
          <div class="slider-fill" style="left: ${d}%; width: ${c-d}%"></div>
          <div class="slider-thumb slider-thumb--lines" style="left: ${d}%" data-slider-thumb="min">
            ${f?`<div class="slider-tooltip">${a(i)}</div>`:""}
          </div>
          <div class="slider-thumb slider-thumb--lines" style="left: ${c}%" data-slider-thumb="max">
            ${f?`<div class="slider-tooltip">${a(s)}</div>`:""}
          </div>
        </div>
      </div>
      ${v}
    </div>
  `}function D(t={}){const{id:m=`slider-total-${Date.now()}`,minValue:i=20,maxValue:s=80,min:e=0,max:n=100,step:l=1,minLabel:f="min.*",maxLabel:L="max.*",totalLabel:h="Total*",totalValue:p="R$ 820",showValueDisplay:r=!0,valueDisplayText:E="R$ 820",dark:y=!1,className:g="",formatValue:$=c=>c,formatLabel:o=c=>c}=t,a=(i-e)/(n-e)*100,u=(s-e)/(n-e)*100,d=["slider"];return y&&d.push("slider--dark"),g&&d.push(g),`
    <div class="${d.join(" ")}" data-slider-range data-min="${e}" data-max="${n}" data-step="${l}" data-min-value="${i}" data-max-value="${s}" id="${m}">
      <div class="slider-header">
        <div class="slider-input-group">
          <label class="slider-input-label">${f}</label>
          <input type="text" class="slider-input" value="${$(i)}" data-slider-input-min />
        </div>
        <div class="slider-input-group">
          <label class="slider-input-label">${L}</label>
          <input type="text" class="slider-input" value="${$(s)}" data-slider-input-max />
        </div>
      </div>
      <div class="slider-track-container">
        <div class="slider-track" data-slider-track>
          <div class="slider-fill" style="left: ${a}%; width: ${u-a}%"></div>
          <div class="slider-thumb slider-thumb--lines" style="left: ${a}%" data-slider-thumb="min">
            <div class="slider-tooltip">${$(i)}</div>
          </div>
          <div class="slider-thumb slider-thumb--lines" style="left: ${u}%" data-slider-thumb="max">
            <div class="slider-tooltip">${$(s)}</div>
          </div>
        </div>
      </div>
      <div class="slider-labels">
        <span>${o(e)}</span>
        <span>${o(n)}</span>
      </div>
      <div class="slider-footer">
        ${r?`<span class="slider-value-display">${E}</span>`:"<span></span>"}
        <div class="slider-total">
          <span class="slider-total-label">${h}</span>
          <input type="text" class="slider-total-input" value="${p}" data-slider-total />
        </div>
      </div>
    </div>
  `}function F(t=document,m=null){const i=P(t,m),s=z(t,m);return()=>{typeof i=="function"&&i(),typeof s=="function"&&s()}}function P(t,m){const i=t.querySelectorAll("[data-slider]:not([data-slider-range])"),s=[];return i.forEach(e=>{const n=e.querySelector("[data-slider-track]"),l=e.querySelector("[data-slider-thumb]"),f=e.querySelector(".slider-fill"),L=e.querySelector(".slider-tooltip"),h=e.querySelector("[data-slider-input]");if(!n||!l)return;let p=!1;const r=o=>{const a=n.getBoundingClientRect(),u=parseFloat(e.dataset.min),d=parseFloat(e.dataset.max),c=parseFloat(e.dataset.step);let w=(o-a.left)/a.width;w=Math.max(0,Math.min(1,w));let b=u+w*(d-u);b=Math.round(b/c)*c,b=Math.max(u,Math.min(d,b));const v=(b-u)/(d-u)*100;l.style.left=`${v}%`,f.style.width=`${v}%`,e.dataset.value=b,L&&(L.textContent=b),h&&(h.value=b),m&&m({slider:e,value:b,min:u,max:d})};l.addEventListener("mousedown",o=>{p=!0,l.classList.add("is-dragging"),o.preventDefault()});const E=o=>{p&&r(o.clientX)},y=()=>{p&&(p=!1,l.classList.remove("is-dragging"))};document.addEventListener("mousemove",E),document.addEventListener("mouseup",y),n.addEventListener("click",o=>{o.target!==l&&r(o.clientX)}),l.addEventListener("touchstart",o=>{p=!0,l.classList.add("is-dragging")});const g=o=>{p&&r(o.touches[0].clientX)},$=()=>{p&&(p=!1,l.classList.remove("is-dragging"))};document.addEventListener("touchmove",g),document.addEventListener("touchend",$),s.push(()=>{document.removeEventListener("mousemove",E),document.removeEventListener("mouseup",y),document.removeEventListener("touchmove",g),document.removeEventListener("touchend",$)})}),()=>s.forEach(e=>e())}function z(t,m){const i=t.querySelectorAll("[data-slider-range]"),s=[];return i.forEach(e=>{const n=e.querySelector("[data-slider-track]"),l=e.querySelector('[data-slider-thumb="min"]'),f=e.querySelector('[data-slider-thumb="max"]'),L=e.querySelector(".slider-fill"),h=e.querySelector("[data-slider-input-min]"),p=e.querySelector("[data-slider-input-max]");if(!n||!l||!f)return;let r=null;const E=a=>{if(!r)return;const u=n.getBoundingClientRect(),d=parseFloat(e.dataset.min),c=parseFloat(e.dataset.max),w=parseFloat(e.dataset.step);let b=(a-u.left)/u.width;b=Math.max(0,Math.min(1,b));let v=d+b*(c-d);v=Math.round(v/w)*w,v=Math.max(d,Math.min(c,v));const V=r===l,M=parseFloat(e.dataset[V?"maxValue":"minValue"]);V&&v>M&&(v=M),!V&&v<M&&(v=M);const I=(v-d)/(c-d)*100;r.style.left=`${I}%`,e.dataset[V?"minValue":"maxValue"]=v;const T=r.querySelector(".slider-tooltip");T&&(T.textContent=v),V&&h&&(h.value=v),!V&&p&&(p.value=v);const S=parseFloat(e.dataset.minValue),k=parseFloat(e.dataset.maxValue),q=(S-d)/(c-d)*100,H=(k-d)/(c-d)*100;L.style.left=`${q}%`,L.style.width=`${H-q}%`,m&&m({slider:e,minValue:S,maxValue:k,min:d,max:c})};[l,f].forEach(a=>{a.addEventListener("mousedown",u=>{r=a,a.classList.add("is-dragging"),u.preventDefault()}),a.addEventListener("touchstart",u=>{r=a,a.classList.add("is-dragging")})});const y=a=>{r&&E(a.clientX)},g=()=>{r&&(r.classList.remove("is-dragging"),r=null)},$=a=>{r&&E(a.touches[0].clientX)},o=()=>{r&&(r.classList.remove("is-dragging"),r=null)};document.addEventListener("mousemove",y),document.addEventListener("mouseup",g),document.addEventListener("touchmove",$),document.addEventListener("touchend",o),s.push(()=>{document.removeEventListener("mousemove",y),document.removeEventListener("mouseup",g),document.removeEventListener("touchmove",$),document.removeEventListener("touchend",o)})}),()=>s.forEach(e=>e())}function X(t){return t.dataset.sliderRange!==void 0?{minValue:parseFloat(t.dataset.minValue),maxValue:parseFloat(t.dataset.maxValue)}:parseFloat(t.dataset.value)}function j(t,m,i=null){const s=parseFloat(t.dataset.min),e=parseFloat(t.dataset.max);if(t.dataset.sliderRange!==void 0&&i!==null){const n=(m-s)/(e-s)*100,l=(i-s)/(e-s)*100,f=t.querySelector('[data-slider-thumb="min"]'),L=t.querySelector('[data-slider-thumb="max"]'),h=t.querySelector(".slider-fill");f&&(f.style.left=`${n}%`),L&&(L.style.left=`${l}%`),h&&(h.style.left=`${n}%`,h.style.width=`${l-n}%`),t.dataset.minValue=m,t.dataset.maxValue=i}else{const n=(m-s)/(e-s)*100,l=t.querySelector("[data-slider-thumb]"),f=t.querySelector(".slider-fill");l&&(l.style.left=`${n}%`),f&&(f.style.width=`${n}%`),t.dataset.value=m}}const x={create:R,createRange:B,createWithTotal:D,init:F,getValue:X,setValue:j};function W(){document.getElementById("slider-simple").innerHTML=x.create({value:50,min:0,max:100,showLabels:!0,showTooltip:!0}),document.getElementById("slider-input").innerHTML=x.create({value:123,min:0,max:456,showLabels:!0,showTooltip:!0,showInput:!0}),document.getElementById("slider-range").innerHTML=x.createRange({minValue:25,maxValue:75,min:0,max:100,showLabels:!0,showTooltip:!0,showInputs:!1}),document.getElementById("slider-range-inputs").innerHTML=x.createRange({minValue:10,maxValue:70,min:0,max:100,showLabels:!0,showTooltip:!0,showInputs:!0,minLabel:"min.*",maxLabel:"max.*"}),document.getElementById("slider-sm").innerHTML=x.create({value:40,min:0,max:100,size:"sm",showLabels:!1}),document.getElementById("slider-md").innerHTML=x.create({value:50,min:0,max:100,size:"md",showLabels:!1}),document.getElementById("slider-lg").innerHTML=x.create({value:60,min:0,max:100,size:"lg",showLabels:!1}),document.getElementById("slider-primary").innerHTML=x.create({value:50,color:"primary",showLabels:!1}),document.getElementById("slider-success").innerHTML=x.create({value:50,color:"success",showLabels:!1}),document.getElementById("slider-warning").innerHTML=x.create({value:50,color:"warning",showLabels:!1}),document.getElementById("slider-danger").innerHTML=x.create({value:50,color:"danger",showLabels:!1}),document.getElementById("slider-total-light").innerHTML=x.createWithTotal({minValue:10,maxValue:70,min:0,max:100,minLabel:"min.*",maxLabel:"max.*",totalLabel:"Total*",totalValue:"R$ 820",showValueDisplay:!0,valueDisplayText:"R$ 820",formatValue:t=>`${t} m2`,formatLabel:t=>t===0?"0":`R$ ${t}.000`}),document.getElementById("slider-total-dark").innerHTML=x.createWithTotal({minValue:10,maxValue:70,min:0,max:100,minLabel:"Description",maxLabel:"Description",totalLabel:"Total*",totalValue:"R$ 820",showValueDisplay:!0,valueDisplayText:"R$ 820",dark:!0,formatValue:t=>`${t} m2`,formatLabel:t=>t===0?"0":`R$ ${t}.000`}),document.getElementById("slider-disabled").innerHTML=x.create({value:30,min:0,max:100,disabled:!0,showLabels:!0}),x.init(document,t=>{console.log("Slider changed:",t)})}export{W as init};
