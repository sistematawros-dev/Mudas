import{e}from"./input-BGfEK18X.js";/* empty css              */const l={user:'<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M2 14c0-2.5 2.5-4 6-4s6 1.5 6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',mail:'<svg viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M1 4l7 5 7-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',calendar:'<svg viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M2 6h12M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',link:'<svg viewBox="0 0 16 16" fill="none"><path d="M6.5 9.5L9.5 6.5M7 11l-1.5 1.5a2.12 2.12 0 01-3-3L4 8M9 5l1.5-1.5a2.12 2.12 0 013 3L12 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'};function r(){document.getElementById("input-states").innerHTML=`
    ${e.create({label:"Label",placeholder:"Placeholder"})}
    ${e.create({label:"Label",value:"Filled value"})}
    ${e.create({label:"Label",placeholder:"Disabled",disabled:!0})}
    ${e.create({label:"Label",value:"Readonly",readonly:!0})}
  `,document.getElementById("input-sizes").innerHTML=`
    ${e.create({label:"Small",placeholder:"Placeholder",size:"sm"})}
    ${e.create({label:"Medium",placeholder:"Placeholder",size:"md"})}
    ${e.create({label:"Large",placeholder:"Placeholder",size:"lg"})}
  `,document.getElementById("input-icons").innerHTML=`
    ${e.create({label:"Left Icon",placeholder:"Digite seu nome",iconLeft:l.user})}
    ${e.create({label:"Right Icon",placeholder:"Selecione uma data",iconRight:l.calendar})}
    ${e.createSearch({label:"Search",placeholder:"Pesquisar..."})}
  `,document.getElementById("input-addons").innerHTML=`
    ${e.create({label:"Website",placeholder:"seusite",prefix:"https://"})}
    ${e.create({label:"Preço",placeholder:"0.00",prefix:"R$",suffix:"BRL"})}
  `,document.getElementById("input-validation").innerHTML=`
    <div class="form-stack">
      ${e.create({label:"Campo inválido",value:"valor inválido",error:"Este campo é obrigatório"})}
      ${e.create({label:"Campo válido",value:"valor@valido.com",success:"Email válido!"})}
    </div>
    <div class="form-stack">
      ${e.create({label:"Com Helper",placeholder:"Digite algo",helper:"Texto de ajuda opcional"})}
      ${e.create({label:"Com Contador",placeholder:"Mensagem curta",maxLength:100,showCounter:!0})}
    </div>
  `,document.getElementById("input-textarea").innerHTML=`
    ${e.createTextarea({label:"Descrição",placeholder:"Digite sua mensagem...",rows:4})}
    ${e.createTextarea({label:"Com contador",placeholder:"Digite sua bio...",maxLength:200,showCounter:!0,rows:4})}
  `,document.getElementById("input-select").innerHTML=`
    ${e.createSelect({label:"Categoria",placeholder:"Selecione...",items:[{label:"Opção 1",value:"1"},{label:"Opção 2",value:"2"},{label:"Opção 3",value:"3"}]})}
    ${e.createSelect({label:"Status",value:"2",items:[{label:"Ativo",value:"1"},{label:"Inativo",value:"2"},{label:"Pendente",value:"3"}]})}
  `,document.getElementById("input-special").innerHTML=`
    ${e.createPassword({label:"Senha",placeholder:"Digite sua senha"})}
    ${e.create({label:"Email",type:"email",placeholder:"seu@email.com",iconLeft:l.mail})}
    ${e.create({label:"URL",type:"url",placeholder:"https://exemplo.com",iconLeft:l.link})}
  `,document.getElementById("input-light").innerHTML=`
    <div class="form-stack">
      ${e.create({label:"Nome",placeholder:"Digite seu nome",required:!0})}
      ${e.create({label:"Email",type:"email",placeholder:"seu@email.com"})}
      ${e.createSelect({label:"Status",items:[{label:"Ativo",value:"active"},{label:"Inativo",value:"inactive"}]})}
      ${e.createTextarea({label:"Mensagem",placeholder:"Digite sua mensagem...",rows:3})}
    </div>
  `,document.getElementById("input-dark").innerHTML=`
    <div class="form-stack">
      ${e.create({label:"Nome",placeholder:"Digite seu nome",required:!0,dark:!0})}
      ${e.create({label:"Email",type:"email",placeholder:"seu@email.com",dark:!0})}
      ${e.createSelect({label:"Status",dark:!0,items:[{label:"Ativo",value:"active"},{label:"Inativo",value:"inactive"}]})}
      ${e.createTextarea({label:"Mensagem",placeholder:"Digite sua mensagem...",rows:3,dark:!0})}
    </div>
  `,e.init(document)}export{r as init};
