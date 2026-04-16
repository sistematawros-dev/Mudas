# log_database_changes.md

## DB-001
- ID da alteracao: DB-001
- data/hora: 2026-04-13 14:24:30
- camada: db
- arquivo ou objeto alterado: `C:\Users\desen\OneDrive\Documentos\Projeto\BackEnd\Api\sql\migrations\20260413_002_patio_fluxo_operacional.sql`
- tipo da alteracao: migration incremental (ALTER TABLE + CHECK + INDEX)
- motivo: Persistir o fluxo operacional de patio (aguardando -> fila -> chamado -> carregando -> finalizado) solicitado no resumo `reuniao4.txt`.
- requisito/trecho do video: check-in, chamada, entrada, ordenacao por chegada, finalizacao.
- antes: `app.instrucoes` nao tinha campos de fase operacional.
- depois: novos campos `patio_fase`, `chegada_em`, `chamado_em`, `entrada_em`, `finalizado_em`, `ordem_fila`, `quantidade_real`.
- impacto: permite transicoes persistentes e ordenacao de fila via API.
- risco: baixo; migration aditiva e reversivel.
- como testar: `SELECT patio_fase, chegada_em, ordem_fila FROM app.instrucoes LIMIT 10;`
- como desfazer: remover colunas/constraints/indexes adicionados (ver `rollback_map.md`).

## DB-2026-04-14-AGENDA-DISP
- data/hora: 2026-04-14 21:59:49
- camada: db
- arquivo/objeto: backend-api/sql/migrations/20260414_003_agenda_disponibilidade.sql
- tipo: create table + constraints + indexes + triggers
- motivo: suportar fluxo do resumo funcional reuniao5 (liberação de vagas por data/período, bloqueio e consumo em agendamentos)
- requisito vídeo/resumo: gestão de agenda com vagas por produto e bloqueio por data
- antes: não havia entidade persistente para disponibilidade de agenda
- depois: tabela pp.agenda_disponibilidade com unicidade (filial,data,produto), status e ocupação
- impacto frontend: tela Gestão Agenda passa a salvar/consultar API real
- impacto api: novo recurso CRUD dinâmico via entity-config
- impacto banco: nova estrutura de disponibilidade e auditoria
- risco: baixo (nova tabela isolada)
- como testar: aplicar migration e consultar GET /api/v1/agenda-disponibilidade
- como desfazer: remover trigger/indexes/FK e dropar tabela pp.agenda_disponibilidade
"@;

Add-Content -Path log_api_changes.md -Value @"

## API-2026-04-14-AGENDA-DISP
- data/hora: 2026-04-14 21:59:49
- camada: api
- arquivo/objeto: backend-api/src/modules/entities/entity-config.ts
- tipo: inclusão de recursos e campos
- motivo: habilitar endpoints necessários para Controle de Pátio e Gestão Agenda
- requisito vídeo/resumo: usar agenda liberada para agendamento e bloquear/liberar datas
- antes: API sem recurso genda-disponibilidade e sem recursos iliais/instrucoes nesta cópia
- depois: recursos iliais, instrucoes, instrucoes-transportes, instrucoes-blocos, instrucoes-fardos, genda-disponibilidade
- impacto frontend: chamadas de gestão/agendamento passam a ter endpoint existente
- impacto banco: usa tabela nova pp.agenda_disponibilidade
- risco: médio (ampliação de superfície de endpoints)
- como testar: 
pm run build no backend e chamadas GET/POST/PATCH /api/v1/agenda-disponibilidade
- como desfazer: remover blocos de recursos adicionados em entity-config.ts
"@;

Add-Content -Path log_frontend_changes.md -Value @"

## FE-2026-04-14-GESTAO-AGENDA-API
- data/hora: 2026-04-14 21:59:49
- camada: frontend
- arquivo/objeto: src/pages/controle-patio/gestao-agenda/gestao-agenda.js
- tipo: refatoração de integração mock -> API
- motivo: atender fluxo real de liberar/bloquear agenda por data/período
- requisito vídeo/resumo: gestão de agenda impactando disponibilidade de agendamento
- antes: dados fixos mockados sem persistência
- depois: CRUD via /agenda-disponibilidade, navegação mensal, filtros e bloqueio com mensagem
- impacto api: depende de endpoints de agenda e instruções
- impacto banco: lê/escreve disponibilidade e ocupação
- risco: médio (mudança estrutural de fluxo da página)
- como testar: liberar vagas na tela Gestão Agenda e recarregar para conferir persistência
- como desfazer: restaurar versão anterior de gestao-agenda.js e gestao-agenda.data.js

## FE-2026-04-14-AGENDAMENTOS-VAGAS
- data/hora: 2026-04-14 21:59:49
- camada: frontend
- arquivo/objeto: src/pages/controle-patio/agendamentos/agendamentos.js
- tipo: validação de vagas + sincronização de ocupação
- motivo: impedir agendamento fora das vagas liberadas
- requisito vídeo/resumo: agendamentos devem consumir vagas liberadas na Gestão Agenda
- antes: confirmava agendamento sem validar disponibilidade da agenda
- depois: valida agenda por data/produto, bloqueio por status e incrementa/decrementa agas_ocupadas
- impacto api: usa /agenda-disponibilidade e /instrucoes
- impacto banco: atualiza ocupação da agenda
- risco: médio (erros de ocupação em concorrência)
- como testar: liberar 1 vaga e tentar agendar 2 contratos (deve bloquear)
- como desfazer: remover funções indAgendaDisponibilidade/tualizarOcupacaoAgenda e chamadas no fluxo
