/* empty css                  */function r(o=document){o.querySelectorAll("[data-accordion]").forEach(a)}function a(o){const i=o.dataset.accordion||"single";o.querySelectorAll(".accordion-header").forEach(t=>{t.addEventListener("click",()=>{const c=t.closest(".accordion-item"),e=c.classList.contains("is-open");i==="single"&&!e&&o.querySelectorAll(".accordion-item.is-open").forEach(n=>{n.classList.remove("is-open")}),c.classList.toggle("is-open")})})}function d(o,i={}){const{variant:s="",mode:t="single"}=i,c=["accordion"];return s&&c.push(`accordion--${s}`),`
    <div class="${c.join(" ")}" data-accordion="${t}">
      ${o.map((n,h)=>`
        <div class="accordion-item${n.open?" is-open":""}">
          <button class="accordion-header" type="button">
            <span class="accordion-icon">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="5" width="10" height="2" rx="1" fill="currentColor"/>
                ${n.open?"":'<rect x="5" y="1" width="2" height="10" rx="1" fill="currentColor"/>'}
              </svg>
            </span>
            <span class="accordion-title">${n.title}</span>
            <span class="accordion-arrow">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </span>
          </button>
          <div class="accordion-content">
            <div class="accordion-inner">
              <div class="accordion-body">
                ${n.content}
              </div>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `}const l={init:r,create:d};function v(){l.init()}export{v as init};
