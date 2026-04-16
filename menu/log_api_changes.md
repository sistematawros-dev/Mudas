# log_api_changes.md

## API-001
- ID da alteracao: API-001
- data/hora: 2026-04-13 14:24:30
- camada: api
- arquivo ou objeto alterado: `C:\Users\desen\OneDrive\Documentos\Projeto\BackEnd\Api\src\modules\entities\entity-config.ts`
- tipo da alteracao: exposicao de campos no recurso `instrucoes`
- motivo: frontend precisa enviar/receber fase operacional sem criar endpoint novo.
- requisito/trecho do video: check-in/chamar/dar entrada/finalizar com estado persistido.
- antes: `patio_fase`, timestamps operacionais e `ordem_fila` nao eram campos permitidos no CRUD generico.
- depois: campos adicionados em `filterableFields`, `creatableFields` e `updatableFields` de `instrucoes`.
- impacto: `PATCH /api/v1/instrucoes/:id` passa a aceitar transicoes operacionais.
- risco: baixo; somente whitelist de campos.
- como testar: `PATCH /api/v1/instrucoes/{id}` com `{"patio_fase":"fila_patio"}`.
- como desfazer: remover esses campos do bloco `resource: 'instrucoes'`.
