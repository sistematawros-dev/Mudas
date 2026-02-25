/* empty css                */function c(s={}){const{orientation:a="horizontal",thickness:r="normal",inset:n="none",insetSide:v="both",spacing:l="none",style:d="solid",color:o="default",dark:m=!1,className:t=""}=s,e=["divider"];return a==="vertical"&&e.push("divider--vertical"),r==="thick"&&e.push("divider--thick"),n!=="none"&&(v==="left"&&a==="horizontal"?e.push(`divider--inset-left-${n}`):e.push(`divider--inset-${n}`)),l!=="none"&&e.push(`divider--spacing-${l}`),d!=="solid"&&e.push(`divider--${d}`),o!=="default"&&e.push(`divider--${o}`),m&&e.push("divider--theme-dark"),t&&e.push(t),`<hr class="${e.join(" ")}" />`}function p(s={}){return c({...s,orientation:"horizontal"})}function h(s={}){return c({...s,orientation:"vertical"})}function $(s={}){const{text:a="",position:r="center",dark:n=!1,thickness:v="normal",className:l=""}=s,d=["divider-with-text"];n&&d.push("divider-with-text--dark"),l&&d.push(l);const t=`divider ${v==="thick"?"divider--thick":""} ${n?"divider--theme-dark":""}`.trim();return r==="left"?`
      <div class="${d.join(" ")}">
        <span class="divider-text">${a}</span>
        <hr class="${t}" />
      </div>
    `:r==="right"?`
      <div class="${d.join(" ")}">
        <hr class="${t}" />
        <span class="divider-text">${a}</span>
      </div>
    `:`
    <div class="${d.join(" ")}">
      <hr class="${t}" />
      <span class="divider-text">${a}</span>
      <hr class="${t}" />
    </div>
  `}const i={create:c,horizontal:p,vertical:h,withText:$};function k(){document.getElementById("divider-horizontal-1px").innerHTML=`
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: none</span>
      <div class="demo-divider-content">
        ${i.horizontal()}
      </div>
    </div>
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: 8px</span>
      <div class="demo-divider-content">
        ${i.horizontal({inset:"8"})}
      </div>
    </div>
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: 16px</span>
      <div class="demo-divider-content">
        ${i.horizontal({inset:"16"})}
      </div>
    </div>
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: 24px</span>
      <div class="demo-divider-content">
        ${i.horizontal({inset:"24"})}
      </div>
    </div>
  `,document.getElementById("divider-horizontal-2px").innerHTML=`
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: none</span>
      <div class="demo-divider-content">
        ${i.horizontal({thickness:"thick"})}
      </div>
    </div>
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: 8px</span>
      <div class="demo-divider-content">
        ${i.horizontal({thickness:"thick",inset:"8"})}
      </div>
    </div>
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: 16px</span>
      <div class="demo-divider-content">
        ${i.horizontal({thickness:"thick",inset:"16"})}
      </div>
    </div>
    <div class="demo-divider-row">
      <span class="demo-divider-label">Inset: 24px</span>
      <div class="demo-divider-content">
        ${i.horizontal({thickness:"thick",inset:"24"})}
      </div>
    </div>
  `,document.getElementById("divider-vertical-1px").innerHTML=`
    <div class="demo-vertical-item">
      <span class="demo-divider-label">none</span>
      <div class="demo-vertical-divider-wrap">
        ${i.vertical()}
      </div>
    </div>
    <div class="demo-vertical-item">
      <span class="demo-divider-label">8px</span>
      <div class="demo-vertical-divider-wrap">
        ${i.vertical({inset:"8"})}
      </div>
    </div>
    <div class="demo-vertical-item">
      <span class="demo-divider-label">16px</span>
      <div class="demo-vertical-divider-wrap">
        ${i.vertical({inset:"16"})}
      </div>
    </div>
    <div class="demo-vertical-item">
      <span class="demo-divider-label">24px</span>
      <div class="demo-vertical-divider-wrap">
        ${i.vertical({inset:"24"})}
      </div>
    </div>
  `,document.getElementById("divider-vertical-2px").innerHTML=`
    <div class="demo-vertical-item">
      <span class="demo-divider-label">none</span>
      <div class="demo-vertical-divider-wrap">
        ${i.vertical({thickness:"thick"})}
      </div>
    </div>
    <div class="demo-vertical-item">
      <span class="demo-divider-label">8px</span>
      <div class="demo-vertical-divider-wrap">
        ${i.vertical({thickness:"thick",inset:"8"})}
      </div>
    </div>
    <div class="demo-vertical-item">
      <span class="demo-divider-label">16px</span>
      <div class="demo-vertical-divider-wrap">
        ${i.vertical({thickness:"thick",inset:"16"})}
      </div>
    </div>
    <div class="demo-vertical-item">
      <span class="demo-divider-label">24px</span>
      <div class="demo-vertical-divider-wrap">
        ${i.vertical({thickness:"thick",inset:"24"})}
      </div>
    </div>
  `,document.getElementById("divider-styles").innerHTML=`
    <div class="demo-style-row">
      <div class="demo-style-item">
        <span class="demo-divider-label">Solid</span>
        <div class="demo-divider-content">
          ${i.horizontal()}
        </div>
      </div>
      <div class="demo-style-item">
        <span class="demo-divider-label">Dashed</span>
        <div class="demo-divider-content">
          ${i.horizontal({style:"dashed"})}
        </div>
      </div>
      <div class="demo-style-item">
        <span class="demo-divider-label">Dotted</span>
        <div class="demo-divider-content">
          ${i.horizontal({style:"dotted"})}
        </div>
      </div>
    </div>
  `,document.getElementById("divider-with-text").innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      ${i.withText({text:"OU",position:"center"})}
      ${i.withText({text:"Seção",position:"left"})}
      ${i.withText({text:"Fim",position:"right"})}
    </div>
  `,document.getElementById("divider-light").innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${i.horizontal()}
      ${i.horizontal({thickness:"thick"})}
      ${i.withText({text:"Seção"})}
    </div>
  `,document.getElementById("divider-dark").innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      ${i.horizontal({dark:!0})}
      ${i.horizontal({dark:!0,thickness:"thick"})}
      ${i.withText({text:"Seção",dark:!0})}
    </div>
  `}export{k as init};
