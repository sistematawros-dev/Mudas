/* empty css                  */function o(i={}){const{items:a=[],activeValue:s=a[0]?.value,size:r="md"}=i;return a.length===0?"":`
    <div class="segmented ${r!=="md"?`segmented--${r}`:""}" role="tablist">
      ${a.map(e=>`
        <button
          type="button"
          role="tab"
          class="segmented-item ${e.value===s?"segmented-item--active":""}"
          data-value="${e.value}"
          aria-selected="${e.value===s}"
        >
          ${e.label}
        </button>
      `).join("")}
    </div>
  `}function u(i,a){if(!i)return;const s=i.querySelector(".segmented");if(!s)return;const r=s.querySelectorAll(".segmented-item");r.forEach(t=>{t.addEventListener("click",()=>{if(r.forEach(e=>{e.classList.remove("segmented-item--active"),e.setAttribute("aria-selected","false")}),t.classList.add("segmented-item--active"),t.setAttribute("aria-selected","true"),a){const e=t.getAttribute("data-value");a(e)}})}),s.addEventListener("keydown",t=>{const e=s.querySelector(".segmented-item--active"),n=Array.from(r),c=n.indexOf(e);if(t.key==="ArrowRight"||t.key==="ArrowLeft"){t.preventDefault();let l;t.key==="ArrowRight"?l=(c+1)%n.length:l=(c-1+n.length)%n.length,n[l].click(),n[l].focus()}})}export{o as c,u as i};
