/* empty css             */const f={external:'<svg viewBox="0 0 12 12" fill="none"><path d="M3.5 1.5h7v7M10 2L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',arrowRight:'<svg viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function a(n={}){const{label:l="Label",href:d="#",target:s="_self",variant:i="brand",size:u="md",external:r=!1,icon:m=null,iconPosition:x="right",underline:k="hover",disabled:p=!1,dark:g=!1,inline:L=!1,className:b="",onClick:v=null}=n,t=["link",`link--${i}`];u!=="md"&&t.push(`link--${u}`),k==="none"&&t.push("link--no-underline"),k==="always"&&t.push("link--underline"),g&&t.push("link--dark"),p&&t.push("is-disabled"),L&&t.push("link--inline"),b&&t.push(b);const h=r?"_blank":s,z=r?'rel="noopener noreferrer"':"",c=r?f.external:m,$=c?`<span class="link-icon">${c}</span>`:"",B=v?`onclick="${v}"`:"";let o="";return x==="left"&&c?o=`${$}<span>${l}</span>`:c?o=`<span>${l}</span>${$}`:o=l,`<a href="${d}" target="${h}" ${z} class="${t.join(" ")}" ${B}>${o}</a>`}function E(n={}){return a({...n,external:!0})}function I(n={}){return a({...n,variant:"brand"})}function M(n={}){return a({...n,variant:"neutral"})}function y(n={}){return a({...n,variant:"inverted"})}function H(n={}){const{links:l=[],vertical:d=!1,className:s=""}=n,i=["link-group"];d&&i.push("link-group--vertical"),s&&i.push(s);const u=l.map(r=>a(typeof r=="string"?{label:r,href:"#"}:r)).join("");return`<div class="${i.join(" ")}">${u}</div>`}const e={create:a,createExternal:E,createBrand:I,createNeutral:M,createInverted:y,createGroup:H,icons:f};function T(){document.getElementById("link-brand").innerHTML=`
    ${e.create({label:"Label",variant:"brand",external:!0,size:"sm"})}
    ${e.create({label:"Label",variant:"brand",external:!0,size:"md"})}
    ${e.create({label:"Label",variant:"brand",external:!0,size:"lg"})}
  `,document.getElementById("link-neutral").innerHTML=`
    ${e.create({label:"Label",variant:"neutral",external:!0,size:"sm"})}
    ${e.create({label:"Label",variant:"neutral",external:!0,size:"md"})}
    ${e.create({label:"Label",variant:"neutral",external:!0,size:"lg"})}
  `,document.getElementById("link-inverted").innerHTML=`
    <div class="demo-grid-states">
      ${e.create({label:"Label",variant:"inverted",external:!0,size:"sm"})}
      ${e.create({label:"Label",variant:"inverted",external:!0,size:"md"})}
      ${e.create({label:"Label",variant:"inverted",external:!0,size:"lg"})}
    </div>
  `,document.getElementById("link-sizes").innerHTML=`
    ${e.create({label:"Small",size:"sm",external:!0})}
    ${e.create({label:"Medium",size:"md",external:!0})}
    ${e.create({label:"Large",size:"lg",external:!0})}
  `,document.getElementById("link-external").innerHTML=`
    ${e.createExternal({label:"External Link",variant:"brand"})}
    ${e.createExternal({label:"External Link",variant:"neutral"})}
    ${e.create({label:"Internal Link",variant:"brand"})}
  `,document.getElementById("link-light").innerHTML=`
    <div class="link-group">
      ${e.createNeutral({label:"Link Neutral",external:!0})}
      ${e.createBrand({label:"LinkDefault",external:!0})}
    </div>
  `,document.getElementById("link-dark").innerHTML=`
    <div class="link-group">
      ${e.createNeutral({label:"Link Neutral",external:!0,dark:!0})}
      ${e.createBrand({label:"LinkDefault",external:!0,dark:!0})}
      ${e.createInverted({label:"Link Inverted",external:!0})}
    </div>
  `}export{T as init};
