/* empty css               */function u(e={}){const{id:t=`toggle-${Date.now()}`,name:n="",label:s="",labelPosition:i="right",checked:l=!1,disabled:a=!1,color:o="primary",size:g="md",loading:r=!1,dark:d=!1,className:p=""}=e,c=["toggle"];g!=="md"&&c.push(`toggle--${g}`),o!=="primary"&&c.push(`toggle--${o}`),a&&c.push("toggle--disabled"),r&&c.push("toggle--loading"),d&&c.push("toggle--dark"),p&&c.push(p);const f=s?`
    <span class="toggle-label ${i==="left"?"toggle-label--left":""}">${s}</span>
  `:"";return`
    <label class="${c.join(" ")}">
      <input
        type="checkbox"
        class="toggle-input"
        id="${t}"
        ${n?`name="${n}"`:""}
        ${l?"checked":""}
        ${a?"disabled":""}
      />
      <span class="toggle-track">
        <span class="toggle-thumb"></span>
      </span>
      ${f}
    </label>
  `}function m(e={}){return u({...e,label:""})}function h(e={}){const{toggles:t=[],horizontal:n=!1,dark:s=!1,className:i=""}=e,l=["toggle-group"];n&&l.push("toggle-group--horizontal"),i&&l.push(i);const a=t.map((o,g)=>u({...o,id:o.id||`toggle-group-${g}`,dark:s})).join("");return`
    <div class="${l.join(" ")}">
      ${a}
    </div>
  `}function b(e=document,t=null){e.addEventListener("change",n=>{const s=n.target.closest(".toggle-input");if(!s)return;const i=s.closest(".toggle"),l=s.checked,a=s.id,o=s.name;t&&t({id:a,name:o,checked:l,element:i,input:s})})}function y(e){const t=typeof e=="string"?document.getElementById(e):e.querySelector(".toggle-input");return t?t.checked:!1}function k(e,t){const n=typeof e=="string"?document.getElementById(e):e.querySelector(".toggle-input");n&&(n.checked=t,n.dispatchEvent(new Event("change",{bubbles:!0})))}function $(e){const t=typeof e=="string"?document.getElementById(e):e.querySelector(".toggle-input");t&&(t.checked=!t.checked,t.dispatchEvent(new Event("change",{bubbles:!0})))}function E(e,t){const n=typeof e=="string"?document.getElementById(e):e.querySelector(".toggle-input");if(n){n.disabled=t;const s=n.closest(".toggle");s&&s.classList.toggle("toggle--disabled",t)}}function v(e,t){const n=typeof e=="string"?document.getElementById(e):e.querySelector(".toggle-input");if(n){const s=n.closest(".toggle");s&&(s.classList.toggle("toggle--loading",t),n.disabled=t)}}const q={create:u,createSimple:m,createGroup:h,init:b,isChecked:y,setChecked:k,toggle:$,setDisabled:E,setLoading:v};export{q as T,m as a,u as c};
