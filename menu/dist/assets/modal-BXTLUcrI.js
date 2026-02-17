import{m as t}from"./modal-Dp0JtUxg.js";function n(){const o=document.getElementById("modal-containers");o.innerHTML+=t.create({id:"modal-default",title:"Modal title",description:"Description",body:`
      <p style="color: var(--text-secondary); margin-bottom: var(--space-4);">I agree to something</p>
      ${t.createSlot()}
    `,footer:`
      <button class="btn btn--outline" data-modal-close>Secondary action</button>
      <button class="btn btn--primary">Main action →</button>
    `}),o.innerHTML+=t.create({id:"modal-with-slot",title:"Use o Autenticador",description:"Faça o download do aplicativo de Autenticação para configurar com seu aparelho.",body:`
      <div style="text-align: center; padding: var(--space-4);">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com" alt="QR Code" style="margin: 0 auto;" />
      </div>
    `,footer:`
      <button class="btn btn--outline" data-modal-close>Voltar</button>
      <button class="btn btn--primary">Continuar</button>
    `}),o.innerHTML+=t.createConfirm({id:"modal-confirm",title:"Confirmar ação",description:"Tem certeza que deseja continuar?",confirmText:"Sim, Confirmar",cancelText:"Voltar",icon:"warning"}),o.innerHTML+=t.createConfirm({id:"modal-danger",title:"Excluir item",description:"Esta ação não pode ser desfeita. Tem certeza?",confirmText:"Excluir",cancelText:"Cancelar",confirmVariant:"danger",icon:"danger"}),o.innerHTML+=t.createConfirm({id:"modal-success",title:"Operação concluída",description:"A ação foi realizada com sucesso!",confirmText:"OK",cancelText:"Fechar",icon:"success"}),o.innerHTML+=t.createBottomSheet({id:"bottom-sheet",title:"Cadastro e Assinatura",description:"Visualize livremente o acervo de conteúdo por 15 minutos!",body:`
      ${t.createSlot({text:"Substitua por formulário"})}
      <p class="modal-helper">É o utilizador pela 1a. vez?</p>
    `,footer:`
      <button class="btn btn--outline btn--full">Visualizar Conteúdo</button>
      <button class="btn btn--text btn--full" data-modal-close>Voltar Cadastro</button>
    `}),o.innerHTML+=t.createBottomSheet({id:"bottom-filters",title:"Filtros",body:`
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        <div>
          <label style="display: block; font-size: 14px; font-weight: 500; margin-bottom: 8px;">Status</label>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn--primary btn--sm">Todos</button>
            <button class="btn btn--outline btn--sm">Ativos</button>
          </div>
        </div>
        <div>
          <label style="display: block; font-size: 14px; font-weight: 500; margin-bottom: 8px;">Prazo</label>
          <div style="display: flex; gap: 8px;">
            <span class="chip chip--single">em prazo</span>
            <span class="chip chip--single">em atraso</span>
          </div>
        </div>
        <div>
          <label style="display: block; font-size: 14px; font-weight: 500; margin-bottom: 8px;">Data</label>
          <input type="text" class="input" placeholder="DD/MM/AAAA" />
        </div>
      </div>
    `,footer:`
      <button class="btn btn--primary btn--full">Aplicar Filtros</button>
      <button class="btn btn--text btn--full" data-modal-close>Limpar Filtros</button>
    `,stickyFooter:!0}),o.innerHTML+=t.create({id:"modal-sm",title:"Small Modal",description:"Este é um modal pequeno.",size:"sm",body:'<p style="color: var(--text-secondary);">Conteúdo do modal pequeno.</p>',footer:'<button class="btn btn--primary" data-modal-close>Fechar</button>'}),o.innerHTML+=t.create({id:"modal-md",title:"Medium Modal",description:"Este é um modal de tamanho médio (padrão).",size:"md",body:'<p style="color: var(--text-secondary);">Conteúdo do modal médio.</p>',footer:'<button class="btn btn--primary" data-modal-close>Fechar</button>'}),o.innerHTML+=t.create({id:"modal-lg",title:"Large Modal",description:"Este é um modal grande.",size:"lg",body:`
      <p style="color: var(--text-secondary); margin-bottom: var(--space-4);">
        Este modal pode conter mais conteúdo devido ao seu tamanho maior.
      </p>
      ${t.createSlot()}
    `,footer:`
      <button class="btn btn--outline" data-modal-close>Cancelar</button>
      <button class="btn btn--primary">Confirmar</button>
    `}),o.innerHTML+=t.create({id:"modal-light",title:"Fique por dentro das novidades 🎉",description:"Digite seu melhor e-mail para receber nossos artigos, dicas e comunicados.",body:`
      <div style="margin-top: var(--space-3);">
        <label style="display: block; font-size: 14px; font-weight: 500; margin-bottom: 8px;">E-mail*</label>
        <input type="email" class="input" placeholder="seu@email.com" />
      </div>
    `,footer:'<button class="btn btn--primary btn--full">Assinar Newsletter</button>'}),o.innerHTML+=t.create({id:"modal-dark",title:"Fique por dentro das novidades 🎉",description:"Digite seu melhor e-mail para receber nossos artigos, dicas e comunicados.",dark:!0,body:`
      <div style="margin-top: var(--space-3);">
        <label style="display: block; font-size: 14px; font-weight: 500; margin-bottom: 8px; color: #fff;">E-mail*</label>
        <input type="email" class="input" placeholder="seu@email.com" style="background: var(--gray-700); border-color: var(--gray-600); color: #fff;" />
      </div>
    `,footer:'<button class="btn btn--primary btn--full">Assinar Newsletter</button>'}),t.init(document,{onConfirm:e=>{console.log("Confirmed:",e)},onCancel:e=>{console.log("Cancelled:",e)},onClose:e=>{console.log("Closed:",e)}})}export{n as init};
