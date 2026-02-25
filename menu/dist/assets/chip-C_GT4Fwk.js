import{b as e}from"./chip-Iox8iBys.js";/* empty css             */function r(){document.getElementById("chip-multiple").innerHTML=`
    ${e.createMultiple({label:"Label"})}
    ${e.createMultiple({label:"Label",selected:!0})}
    ${e.createMultiple({label:"Label"})}
    ${e.createMultiple({label:"Label",selected:!0})}
    ${e.createMultiple({label:"Label"})}
    ${e.createMultiple({label:"Label",selected:!0})}
    ${e.createMultiple({label:"Label"})}
    ${e.createMultiple({label:"Label",selected:!0})}
    ${e.createMultiple({label:"Label",disabled:!0})}
    ${e.createMultiple({label:"Label",selected:!0,disabled:!0})}
    ${e.createMultiple({label:"Label",disabled:!0})}
    ${e.createMultiple({label:"Label",selected:!0,disabled:!0})}
  `,document.getElementById("chip-single").innerHTML=`
    ${e.createSingle({label:"Label"})}
    ${e.createSingle({label:"Label",selected:!0})}
    ${e.createSingle({label:"Label"})}
    ${e.createSingle({label:"Label",selected:!0})}
    ${e.createSingle({label:"Label"})}
    ${e.createSingle({label:"Label",selected:!0})}
    ${e.createSingle({label:"Label"})}
    ${e.createSingle({label:"Label",selected:!0})}
    ${e.createSingle({label:"Label",disabled:!0})}
    ${e.createSingle({label:"Label",selected:!0,disabled:!0})}
    ${e.createSingle({label:"Label",disabled:!0})}
    ${e.createSingle({label:"Label",selected:!0,disabled:!0})}
  `,document.getElementById("chip-input").innerHTML=`
    ${e.createInput({label:"Label"})}
    ${e.createInput({label:"Label",avatar:"https://i.pravatar.cc/40?img=1"})}
    ${e.createInput({label:"Label"})}
    ${e.createInput({label:"Label",avatar:"https://i.pravatar.cc/40?img=2"})}
    ${e.createInput({label:"Label"})}
    ${e.createInput({label:"Label",avatar:"https://i.pravatar.cc/40?img=3"})}
    ${e.createInput({label:"Label"})}
    ${e.createInput({label:"Label",avatar:"https://i.pravatar.cc/40?img=4"})}
    ${e.createInput({label:"Label",disabled:!0})}
    ${e.createInput({label:"Label",disabled:!0})}
    ${e.createInput({label:"Label",disabled:!0})}
    ${e.createInput({label:"Label",disabled:!0})}
  `,document.getElementById("chip-sizes").innerHTML=`
    ${e.create({label:"Small",size:"sm",selected:!0})}
    ${e.create({label:"Medium",size:"md",selected:!0})}
    ${e.create({label:"Large",size:"lg",selected:!0})}
  `,document.getElementById("chip-colors").innerHTML=`
    ${e.create({label:"Primary",color:"primary",selected:!0})}
    ${e.create({label:"Success",color:"success",selected:!0})}
    ${e.create({label:"Error",color:"error",selected:!0})}
    ${e.create({label:"Warning",color:"warning",selected:!0})}
  `,document.getElementById("chip-group-single").innerHTML=e.createGroup({type:"single",name:"category",items:[{label:"Indiana",value:"indiana"},{label:"North Carolina",value:"nc",selected:!0},{label:"Nevada",value:"nevada"},{label:"Dallas",value:"dallas"},{label:"Colorado",value:"colorado"}]}),document.getElementById("chip-group-multiple").innerHTML=e.createGroup({type:"multiple",name:"filters",items:[{label:"Frontend",value:"frontend",selected:!0},{label:"Backend",value:"backend",selected:!0},{label:"Design",value:"design"},{label:"DevOps",value:"devops"}]}),document.getElementById("chip-field-light").innerHTML=`
    <label style="display: block; font-size: 14px; font-weight: 500; margin-bottom: 8px;">Label*</label>
    ${e.createInputField({chips:["Maria","Susan","Alex"],placeholder:"Add tag..."})}
  `,document.getElementById("chip-field-dark").innerHTML=`
    <label style="display: block; font-size: 14px; font-weight: 500; margin-bottom: 8px; color: #fff;">Label*</label>
    ${e.createInputField({chips:["Maria","Susan","Alex"],placeholder:"Add tag...",dark:!0})}
  `,document.getElementById("chip-filter-light").innerHTML=e.createGroup({type:"single",name:"state-filter",items:[{label:"Indiana",value:"indiana"},{label:"North Carolina",value:"nc",selected:!0},{label:"Nevada",value:"nevada"},{label:"Dallas",value:"dallas"},{label:"Colorado",value:"colorado"}]}),document.getElementById("chip-filter-dark").innerHTML=e.createGroup({type:"single",name:"state-filter-dark",dark:!0,items:[{label:"Indiana",value:"indiana"},{label:"North Carolina",value:"nc",selected:!0},{label:"Nevada",value:"nevada"},{label:"Dallas",value:"dallas"},{label:"Colorado",value:"colorado"}]}),document.getElementById("chip-light").innerHTML=`
    <div class="chip-group" style="margin-bottom: 16px;">
      ${e.createMultiple({label:"Option 1"})}
      ${e.createMultiple({label:"Option 2",selected:!0})}
      ${e.createMultiple({label:"Option 3"})}
    </div>
    <div class="chip-group">
      ${e.createSingle({label:"Indiana",value:"indiana"})}
      ${e.createSingle({label:"hovered",value:"hovered"})}
      ${e.createSingle({label:"Nevada",value:"nevada"})}
      ${e.createSingle({label:"selected",value:"selected",selected:!0})}
      ${e.createSingle({label:"Colorado",value:"colorado"})}
    </div>
  `,document.getElementById("chip-dark").innerHTML=`
    <div class="chip-group" style="margin-bottom: 16px;">
      ${e.createMultiple({label:"Option 1",dark:!0})}
      ${e.createMultiple({label:"Option 2",selected:!0,dark:!0})}
      ${e.createMultiple({label:"Option 3",dark:!0})}
    </div>
    <div class="chip-group">
      ${e.createSingle({label:"Indiana",value:"indiana",dark:!0})}
      ${e.createSingle({label:"hovered",value:"hovered",dark:!0})}
      ${e.createSingle({label:"Nevada",value:"nevada",dark:!0})}
      ${e.createSingle({label:"selected",value:"selected",selected:!0,dark:!0})}
      ${e.createSingle({label:"Colorado",value:"colorado",dark:!0})}
    </div>
  `,e.init(document,l=>{console.log("Chip event:",l)})}export{r as init};
