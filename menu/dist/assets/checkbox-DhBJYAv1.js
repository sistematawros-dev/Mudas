import{a as e}from"./checkbox-Czn0aMdg.js";/* empty css                 */function d(){const t=document.getElementById("checkbox-states"),r=[{color:"gray"},{color:"gray",checked:!0},{color:"gray",indeterminate:!0},{color:"gray",disabled:!0},{color:"gray",checked:!0,disabled:!0},{color:"gray",indeterminate:!0,disabled:!0},{},{},{},{checked:!0},{indeterminate:!0},{disabled:!0},{checked:!0,disabled:!0},{indeterminate:!0,disabled:!0},{},{},{color:"error"},{color:"error",checked:!0},{color:"error",indeterminate:!0},{color:"error",disabled:!0},{color:"error",checked:!0,disabled:!0},{color:"error",indeterminate:!0,disabled:!0},{},{}];t.innerHTML=r.filter(o=>Object.keys(o).length>0).map(o=>e.create(o)).join("");const c=document.getElementById("checkbox-with-text"),a=[{label:"Checkbox text",color:"gray"},{label:"Checkbox text",color:"gray",checked:!0},{label:"Checkbox text",color:"gray",indeterminate:!0},{label:"Checkbox text",color:"gray",disabled:!0},{label:"Checkbox text"},{label:"Checkbox text",checked:!0},{label:"Checkbox text",indeterminate:!0},{label:"Checkbox text",disabled:!0},{label:"Checkbox text",color:"error"},{label:"Checkbox text",color:"error",checked:!0},{label:"Checkbox text",color:"error",indeterminate:!0},{label:"Checkbox text",color:"error",disabled:!0}];c.innerHTML=a.map(o=>e.create(o)).join(""),document.getElementById("checkbox-sizes").innerHTML=`
    ${e.create({label:"Small",size:"sm",checked:!0})}
    ${e.create({label:"Medium",size:"md",checked:!0})}
    ${e.create({label:"Large",size:"lg",checked:!0})}
  `,document.getElementById("checkbox-colors").innerHTML=`
    ${e.create({label:"Primary",color:"primary",checked:!0})}
    ${e.create({label:"Error",color:"error",checked:!0})}
    ${e.create({label:"Success",color:"success",checked:!0})}
    ${e.create({label:"Warning",color:"warning",checked:!0})}
    ${e.create({label:"Gray",color:"gray",checked:!0})}
  `,document.getElementById("checkbox-description").innerHTML=`
    <div class="checkbox-group">
      ${e.create({label:"Checkbox",checked:!0})}
      ${e.create({label:"I agree to the terms and conditions",description:"By checking this box, you agree to our Terms of Service and Privacy Policy."})}
      ${e.create({label:"I agree to the terms and conditions",description:"By checking this box, you agree to our Terms of Service.",checked:!0})}
    </div>
  `,document.getElementById("checkbox-group-vertical").innerHTML=e.createGroup({label:"Selecione as opções",name:"options-vertical",items:[{label:"Opção 1",value:"1",checked:!0},{label:"Opção 2",value:"2"},{label:"Opção 3",value:"3"},{label:"Opção 4",value:"4",disabled:!0}]}),document.getElementById("checkbox-group-horizontal").innerHTML=e.createGroup({label:"Selecione as opções",name:"options-horizontal",horizontal:!0,items:[{label:"Opção A",value:"a",checked:!0},{label:"Opção B",value:"b",checked:!0},{label:"Opção C",value:"c"}]}),document.getElementById("checkbox-indeterminate").innerHTML=`
    <div class="checkbox-group" id="indeterminate-group">
      ${e.create({id:"parent-checkbox",label:"Selecionar todos",indeterminate:!0})}
      <div style="margin-left: var(--space-6);">
        ${e.create({name:"child-items",label:"Item 1",value:"1",checked:!0})}
        ${e.create({name:"child-items",label:"Item 2",value:"2",checked:!0})}
        ${e.create({name:"child-items",label:"Item 3",value:"3"})}
      </div>
    </div>
  `,document.getElementById("checkbox-light").innerHTML=`
    <div class="checkbox-group">
      ${e.create({label:"Unchecked"})}
      ${e.create({label:"Checked",checked:!0})}
      ${e.create({label:"I agree to the terms and conditions",description:"By checking this box, you agree to our Terms.",checked:!0})}
    </div>
  `,document.getElementById("checkbox-dark").innerHTML=`
    <div class="checkbox-group">
      ${e.create({label:"Unchecked",dark:!0})}
      ${e.create({label:"Checked",checked:!0,dark:!0})}
      ${e.create({label:"I agree to the terms and conditions",description:"By checking this box, you agree to our Terms.",checked:!0,dark:!0})}
    </div>
  `,e.init(document),l()}function l(){const t=document.getElementById("parent-checkbox"),r=document.querySelectorAll('input[name="child-items"]');!t||r.length===0||(t.addEventListener("change",()=>{r.forEach(c=>{c.checked=t.checked}),t.indeterminate=!1}),r.forEach(c=>{c.addEventListener("change",()=>{e.updateParentCheckbox(t,r)})}))}export{d as init};
