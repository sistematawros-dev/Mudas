const p={check:'<svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',minus:'<svg viewBox="0 0 16 16" fill="none"><path d="M4 8H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'};function m(e={}){const{id:s=`checkbox-${Math.random().toString(36).substr(2,9)}`,name:c="",value:n="",label:t="",description:a="",checked:h=!1,indeterminate:r=!1,disabled:i=!1,color:d="primary",size:u="md",rounded:l=!1,dark:f=!1,className:b=""}=e,o=["checkbox"];u!=="md"&&o.push(`checkbox--${u}`),d!=="primary"&&o.push(`checkbox--${d}`),l&&o.push("checkbox--rounded"),f&&o.push("checkbox--dark"),i&&o.push("checkbox--disabled"),b&&o.push(b);const x=r?p.minus:p.check,$=h?"checked":"",v=i?"disabled":"",g=r?'data-indeterminate="true"':"";let k="";return(t||a)&&(a?k=`
        <div class="checkbox-content">
          <span class="checkbox-label">${t}</span>
          <span class="checkbox-description">${a}</span>
        </div>
      `:k=`<span class="checkbox-label">${t}</span>`),`
    <label class="${o.join(" ")}">
      <input
        type="checkbox"
        class="checkbox-input"
        id="${s}"
        name="${c}"
        value="${n}"
        ${$}
        ${v}
        ${g}
      />
      <span class="checkbox-box">${x}</span>
      ${k}
    </label>
  `}function y(e={}){const{name:s="",label:c="",items:n=[],horizontal:t=!1,dark:a=!1,size:h="md",color:r="primary"}=e,i=["checkbox-group"];t&&i.push("checkbox-group--horizontal"),a&&i.push("checkbox-group--dark");const d=n.map(l=>m({name:s,size:h,color:r,dark:a,...typeof l=="string"?{label:l,value:l}:l})).join(""),u=c?`<span class="checkbox-group-label">${c}</span>`:"";return`
    <div class="${i.join(" ")}">
      ${u}
      ${d}
    </div>
  `}function A(e=document){e.querySelectorAll('.checkbox-input[data-indeterminate="true"]').forEach(c=>{c.indeterminate=!0})}function S(e,s){const c=e.querySelectorAll(`input[name="${s}"]:checked`);return Array.from(c).map(n=>n.value)}function j(e,s,c){e.querySelectorAll(`input[name="${s}"]`).forEach(t=>{t.checked=c,t.indeterminate=!1})}function w(e,s){const c=s.length,n=Array.from(s).filter(t=>t.checked).length;n===0?(e.checked=!1,e.indeterminate=!1):n===c?(e.checked=!0,e.indeterminate=!1):(e.checked=!1,e.indeterminate=!0)}const z={create:m,createGroup:y,init:A,getCheckedValues:S,setGroupState:j,updateParentCheckbox:w,icons:p};export{z as a,m as c,A as i};
