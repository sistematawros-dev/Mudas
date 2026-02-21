/* empty css                 */function b(l={}){const{value:s=0,max:c=100,label:r="",showValue:a=!0,size:t="md",color:o="primary",striped:n=!1,animated:i=!1,indeterminate:m=!1,dark:p=!1,className:v=""}=l,y=m?0:Math.min(100,Math.max(0,s/c*100)),d=["progress"];t!=="md"&&d.push(`progress--${t}`),o!=="primary"&&d.push(`progress--${o}`),n&&d.push("progress--striped"),i&&d.push("progress--animated"),m&&d.push("progress--indeterminate"),p&&d.push("progress--dark"),v&&d.push(v);const u=r||a;let g="";return u&&!m?g=`
      <div class="progress-header">
        ${r?`<span class="progress-label">${r}</span>`:""}
        ${a?`<span class="progress-value">${Math.round(y)}%</span>`:""}
      </div>
    `:r&&(g=`
      <div class="progress-header">
        <span class="progress-label">${r}</span>
      </div>
    `),`
    <div class="${d.join(" ")}" data-progress role="progressbar" aria-valuenow="${s}" aria-valuemin="0" aria-valuemax="${c}">
      ${g}
      <div class="progress-track">
        <div class="progress-fill" style="width: ${y}%"></div>
      </div>
    </div>
  `}function I(l={}){const{value:s=0,max:c=100,size:r="md",color:a="primary",strokeWidth:t=4,showValue:o=!0,label:n="",indeterminate:i=!1,dark:m=!1,className:p=""}=l,v=i?25:Math.min(100,Math.max(0,s/c*100)),y={sm:{size:48,stroke:3},md:{size:72,stroke:4},lg:{size:96,stroke:5},xl:{size:120,stroke:6}},d=y[r]||y.md,u=d.size,g=t||d.stroke,f=(u-g)/2,M=2*Math.PI*f,h=M-v/100*M,B=["progress-circle",`progress-circle--${r}`];a!=="primary"&&B.push(`progress-circle--${a}`),i&&B.push("progress-circle--indeterminate"),m&&B.push("progress-circle--dark"),p&&B.push(p);const $=o||n?`
    <div class="progress-circle-content">
      ${o&&!i?`<span class="progress-circle-value">${Math.round(v)}%</span>`:""}
      ${n?`<span class="progress-circle-label">${n}</span>`:""}
    </div>
  `:"";return`
    <div class="${B.join(" ")}" data-progress-circle role="progressbar" aria-valuenow="${s}" aria-valuemin="0" aria-valuemax="${c}">
      <svg width="${u}" height="${u}" viewBox="0 0 ${u} ${u}">
        <circle
          class="progress-circle-track"
          cx="${u/2}"
          cy="${u/2}"
          r="${f}"
          stroke-width="${g}"
        />
        <circle
          class="progress-circle-fill"
          cx="${u/2}"
          cy="${u/2}"
          r="${f}"
          stroke-width="${g}"
          stroke-dasharray="${M}"
          stroke-dashoffset="${h}"
        />
      </svg>
      ${$}
    </div>
  `}function H(l={}){const{segments:s=[],size:c="md",dark:r=!1,className:a=""}=l,t=["progress"];c!=="md"&&t.push(`progress--${c}`),r&&t.push("progress--dark"),a&&t.push(a);const o=s.reduce((i,m)=>i+(m.value||0),0),n=s.map(i=>{const m=o>0?i.value/o*100:0,p=i.color?`var(--${i.color})`:"var(--primary)";return`<div class="progress-fill" style="width: ${m}%; background: ${p}; border-radius: 0;"></div>`}).join("");return`
    <div class="${t.join(" ")}" data-progress-stacked>
      <div class="progress-track" style="display: flex;">
        ${n}
      </div>
    </div>
  `}function E(l,s,c=100){const r=l.querySelector(".progress-fill"),a=l.querySelector(".progress-value");if(r){const t=Math.min(100,Math.max(0,s/c*100));r.style.width=`${t}%`,a&&(a.textContent=`${Math.round(t)}%`),l.setAttribute("aria-valuenow",s)}}function L(l,s,c=100){const r=l.querySelector(".progress-circle-fill"),a=l.querySelector(".progress-circle-value");if(r){const t=Math.min(100,Math.max(0,s/c*100)),o=parseFloat(r.getAttribute("r")),n=2*Math.PI*o,i=n-t/100*n;r.style.strokeDashoffset=i,a&&(a.textContent=`${Math.round(t)}%`),l.setAttribute("aria-valuenow",s)}}function T(l={}){const{value:s=0,max:c=100,color:r="primary",size:a="md",dark:t=!1}=l,o=Math.min(100,Math.max(0,s/c*100)),n=["progress"];return a!=="md"&&n.push(`progress--${a}`),r!=="primary"&&n.push(`progress--${r}`),t&&n.push("progress--dark"),`
    <div class="${n.join(" ")}" data-progress>
      <div class="progress-track">
        <div class="progress-fill" style="width: ${o}%"></div>
      </div>
    </div>
  `}const e={createBar:b,createCircle:I,createStacked:H,createSimpleBar:T,updateBar:E,updateCircle:L};function C(){document.getElementById("progress-bar-0").innerHTML=e.createBar({value:0,showValue:!0}),document.getElementById("progress-bar-25").innerHTML=e.createBar({value:25,showValue:!0}),document.getElementById("progress-bar-50").innerHTML=e.createBar({value:50,showValue:!0}),document.getElementById("progress-bar-75").innerHTML=e.createBar({value:75,showValue:!0}),document.getElementById("progress-bar-100").innerHTML=e.createBar({value:100,showValue:!0}),document.getElementById("progress-label-1").innerHTML=e.createBar({value:50,label:"Progresso do Upload",showValue:!0}),document.getElementById("progress-label-2").innerHTML=e.createBar({value:90,label:"Instalação",showValue:!0}),document.getElementById("circle-0").innerHTML=e.createCircle({value:0}),document.getElementById("circle-10").innerHTML=e.createCircle({value:10}),document.getElementById("circle-20").innerHTML=e.createCircle({value:20}),document.getElementById("circle-30").innerHTML=e.createCircle({value:30}),document.getElementById("circle-40").innerHTML=e.createCircle({value:40}),document.getElementById("circle-50").innerHTML=e.createCircle({value:50}),document.getElementById("circle-60").innerHTML=e.createCircle({value:60}),document.getElementById("circle-70").innerHTML=e.createCircle({value:70}),document.getElementById("circle-80").innerHTML=e.createCircle({value:80}),document.getElementById("circle-90").innerHTML=e.createCircle({value:90}),document.getElementById("circle-100").innerHTML=e.createCircle({value:100}),document.getElementById("circle-sm").innerHTML=e.createCircle({value:65,size:"sm"}),document.getElementById("circle-md").innerHTML=e.createCircle({value:65,size:"md"}),document.getElementById("circle-lg").innerHTML=e.createCircle({value:65,size:"lg"}),document.getElementById("circle-xl").innerHTML=e.createCircle({value:65,size:"xl"}),document.getElementById("bar-sm").innerHTML=e.createBar({value:60,size:"sm",label:"Small"}),document.getElementById("bar-md").innerHTML=e.createBar({value:60,size:"md",label:"Medium"}),document.getElementById("bar-lg").innerHTML=e.createBar({value:60,size:"lg",label:"Large"}),document.getElementById("bar-primary").innerHTML=e.createBar({value:60,color:"primary",label:"Primary"}),document.getElementById("bar-success").innerHTML=e.createBar({value:60,color:"success",label:"Success"}),document.getElementById("bar-warning").innerHTML=e.createBar({value:60,color:"warning",label:"Warning"}),document.getElementById("bar-danger").innerHTML=e.createBar({value:60,color:"danger",label:"Danger"}),document.getElementById("bar-info").innerHTML=e.createBar({value:60,color:"info",label:"Info"}),document.getElementById("circle-primary").innerHTML=e.createCircle({value:65,color:"primary"}),document.getElementById("circle-success").innerHTML=e.createCircle({value:65,color:"success"}),document.getElementById("circle-warning").innerHTML=e.createCircle({value:65,color:"warning"}),document.getElementById("circle-danger").innerHTML=e.createCircle({value:65,color:"danger"}),document.getElementById("circle-info").innerHTML=e.createCircle({value:65,color:"info"}),document.getElementById("bar-striped").innerHTML=e.createBar({value:70,striped:!0,label:"Striped"}),document.getElementById("bar-animated").innerHTML=e.createBar({value:70,striped:!0,animated:!0,label:"Animated"}),document.getElementById("bar-indeterminate").innerHTML=e.createBar({indeterminate:!0,label:"Carregando..."}),document.getElementById("circle-indeterminate").innerHTML=e.createCircle({indeterminate:!0}),document.getElementById("bar-dark-1").innerHTML=e.createBar({value:50,label:"Upload",dark:!0}),document.getElementById("bar-dark-2").innerHTML=e.createBar({value:90,label:"Download",dark:!0}),document.getElementById("circle-dark-1").innerHTML=e.createCircle({value:50,dark:!0}),document.getElementById("circle-dark-2").innerHTML=e.createCircle({value:90,dark:!0})}export{C as init};
