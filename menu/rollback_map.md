# rollback_map.md

## Ordem reversa recomendada para rollback
1. Reverter frontend (`patio.js`, `agendamentos.js`).
2. Reverter API (`entity-config.ts` para `resource: instrucoes`).
3. Reverter banco (migration `20260413_002_patio_fluxo_operacional.sql`).

## Dependencias entre alteracoes
- Frontend depende da API aceitar os campos (`patio_fase`, timestamps, `ordem_fila`).
- API depende do banco conter as colunas adicionadas.

## Scripts/arquivos para reverter
- `src/pages/controle-patio/patio/patio.js`
- `src/pages/controle-patio/agendamentos/agendamentos.js`
- `C:\Users\desen\OneDrive\Documentos\Projeto\BackEnd\Api\src\modules\entities\entity-config.ts`
- `C:\Users\desen\OneDrive\Documentos\Projeto\BackEnd\Api\sql\migrations\20260413_002_patio_fluxo_operacional.sql`

## Dados que podem ser impactados
- `app.instrucoes.patio_fase`
- `app.instrucoes.chegada_em`
- `app.instrucoes.chamado_em`
- `app.instrucoes.entrada_em`
- `app.instrucoes.finalizado_em`
- `app.instrucoes.ordem_fila`
- `app.instrucoes.quantidade_real`

## Cuidados antes de desfazer
- Exportar `app.instrucoes` antes de remover colunas operacionais.
- Pausar uso da tela Patio durante rollback para evitar escrita concorrente.

## Passos manuais de desfazer por camada
- DB: `ALTER TABLE app.instrucoes DROP COLUMN ...` + drop constraints/indexes de patio.
- API: retirar campos operacionais de `entity-config.ts` e rebuild/restart.
- Frontend: restaurar logica anterior de colunas/acoes em `patio.js` e payloads em `agendamentos.js`.

## RB-2026-04-14-GESTAO-AGENDA
1. Reverter frontend: restaurar [agendamentos.js](/c:/Users/desen/OneDrive/Documentos/Projeto/FrontEnd/Homologacaoinfo/src/pages/controle-patio/agendamentos/agendamentos.js), [gestao-agenda.js](/c:/Users/desen/OneDrive/Documentos/Projeto/FrontEnd/Homologacaoinfo/src/pages/controle-patio/gestao-agenda/gestao-agenda.js), [gestao-agenda.data.js](/c:/Users/desen/OneDrive/Documentos/Projeto/FrontEnd/Homologacaoinfo/src/pages/controle-patio/gestao-agenda/gestao-agenda.data.js), [gestao-agenda.html](/c:/Users/desen/OneDrive/Documentos/Projeto/FrontEnd/Homologacaoinfo/src/pages/controle-patio/gestao-agenda/gestao-agenda.html).
2. Reverter API: remover recursos adicionados em [entity-config.ts](/c:/Users/desen/OneDrive/Documentos/Projeto/FrontEnd/Homologacaoinfo/backend-api/src/modules/entities/entity-config.ts).
3. Reverter banco: executar rollback manual da migration [20260414_003_agenda_disponibilidade.sql](/c:/Users/desen/OneDrive/Documentos/Projeto/FrontEnd/Homologacaoinfo/backend-api/sql/migrations/20260414_003_agenda_disponibilidade.sql) em ordem inversa (triggers -> indexes -> FK -> tabela).
4. Dados impactados: registros em pp.agenda_disponibilidade e contadores de ocupação.
5. Cuidados: pausar operações de agendamento antes do rollback para evitar inconsistência de vagas.
