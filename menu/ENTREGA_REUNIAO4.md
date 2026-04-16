# ENTREGA_REUNIAO4.md

## 1) AUDITORIA DOS VIDEOS

### Telas/fluxos visiveis
- Tela `Patio` em formato kanban por fases operacionais.
- Origem dos cards: `Agendamentos` (instrucoes agendadas).
- Fluxo principal: `Aguardando Chegada` -> `Fila de Patio` -> `Carregando` -> `Finalizados`.
- Fluxos adicionais: `Postergar para amanha`, `Ver agendamentos futuros`, `Check-in hoje` (item futuro), `Registrar entrada`.
- Filtro por tipo de produto no patio (`todos`, `pluma`, `caroco`, `fibrilha`, `capulho`).

### Necessidades funcionais inferidas
- Persistir fase operacional por instrucao (nao apenas `status aprovado/finalizado`).
- Registrar timestamp de chegada/chamada/entrada/finalizacao.
- Ordenar fila por ordem de chegada.
- Permitir postergar e mover agendamento futuro para hoje.
- Modal de finalizacao deve carregar base de dados de blocos/fardos/quantidades.

### Entidades envolvidas
- `app.instrucoes`
- `app.instrucoes_transportes`
- `app.instrucoes_blocos`
- `app.instrucoes_fardos`
- `app.pessoas_empresas`
- `app.filiais`

### Regras de negocio inferidas
- Finalizacao pode divergir do previsto (ex.: kg carregado > previsto da viagem), sem ultrapassar saldo total da instrucao.
- Fardos ja carregados nao podem reaparecer para nova expedicao da mesma instrucao.
- Filtro de produto e filtro de futuro devem atuar sobre o quadro operacional.

### Inconsistencias visiveis no estado anterior
- Patio nao persistia fases intermediarias (`fila/chamado/carregando`).
- Acoes de card nao cobriam transicoes do resumo (check-in/chamar/dar entrada completos).
- Ordenacao de fila por chegada nao estava materializada no banco.

## 2) AUDITORIA DO BANCO

### Schemas
- `app`, `auth`, `audit` (+ schemas de sistema PostgreSQL).

### Tabelas principais do escopo
- `app.instrucoes`, `app.instrucoes_transportes`, `app.instrucoes_blocos`, `app.instrucoes_fardos`.
- `app.pessoas_empresas`, `app.filiais`, `app.veiculos`.

### Integridade existente (resumo)
- PK/FK presentes em `instrucoes*`.
- CHECKs de produto, status, quantidade, placa, datas.
- Indices por FK e campos de consulta.

### Lacuna estrutural encontrada
- Ausencia de colunas de fase operacional do patio em `app.instrucoes`.

### Ajuste aplicado
- Migration `20260413_002_patio_fluxo_operacional.sql` adicionando:
  - `patio_fase`, `chegada_em`, `chamado_em`, `entrada_em`, `finalizado_em`, `ordem_fila`, `quantidade_real`.
  - CHECKs e indices para fase/ordenacao/chegada.

## 3) AUDITORIA DA API

### Modulos/rotas observados
- API generica por recurso em `src/modules/entities/entity-config.ts` + `entity-routes.ts`.
- Recursos existentes para patio: `instrucoes`, `instrucoes-transportes`, `instrucoes-blocos`, `instrucoes-fardos`, `filiais`, `pessoas-empresas`.

### Lacuna da API encontrada
- `resource: instrucoes` nao aceitava os novos campos operacionais no whitelist de update/create/filter.

### Ajuste aplicado
- Inclusao de `patio_fase`, timestamps operacionais, `ordem_fila`, `quantidade_real` no bloco `resource: 'instrucoes'`.

## 4) AUDITORIA DO FRONTEND

### Telas/arquivos relacionados
- `src/pages/controle-patio/patio/patio.js`
- `src/pages/controle-patio/agendamentos/agendamentos.js`
- `src/pages/controle-patio/patio/patio.templates.js`

### Pontos de integracao parcial encontrados
- Fluxo de patio baseado majoritariamente em `status` e `data_agendamento`.
- Sem persistencia completa de fases intermediarias operacionais.

### Ajustes aplicados
- `patio.js`: transicoes persistidas por fase e timestamps.
- `agendamentos.js`: confirmacao/cancelamento sincroniza campos operacionais do patio.

## 5) MAPEAMENTO (video -> tela -> endpoint -> tabela -> arquivo .js)

- `Check-in`
  - Tela: `Patio`
  - Endpoint: `PATCH /api/v1/instrucoes/{id}`
  - Tabela: `app.instrucoes`
  - JS: `src/pages/controle-patio/patio/patio.js`
  - Ajuste: combinado (db/api/frontend)

- `Chamar` e `Dar entrada`
  - Tela: `Patio`
  - Endpoint: `PATCH /api/v1/instrucoes/{id}`
  - Tabela: `app.instrucoes`
  - JS: `src/pages/controle-patio/patio/patio.js`
  - Ajuste: combinado

- `Finalizar carregamento`
  - Tela: `Patio`
  - Endpoints: `PATCH /api/v1/instrucoes/{id}`, leitura de `instrucoes*`
  - Tabelas: `app.instrucoes`, `app.instrucoes_blocos`, `app.instrucoes_fardos`, `app.instrucoes_transportes`
  - JS: `src/pages/controle-patio/patio/patio.js`
  - Ajuste: frontend + db/api para campos operacionais

- `Postergar` e `Check-in Hoje` (futuros)
  - Tela: `Patio`
  - Endpoint: `PATCH /api/v1/instrucoes/{id}`
  - Tabela: `app.instrucoes`
  - JS: `src/pages/controle-patio/patio/patio.js`
  - Ajuste: frontend

- `Confirmar/Cancelar agendamento`
  - Tela: `Agendamentos`
  - Endpoint: `PATCH /api/v1/instrucoes/{id}`
  - Tabela: `app.instrucoes`
  - JS: `src/pages/controle-patio/agendamentos/agendamentos.js`
  - Ajuste: frontend

## 6) PLANO DE ALTERACAO MINIMA

1. Adicionar somente colunas operacionais faltantes em `app.instrucoes`.
2. Expor esses campos no recurso generico `instrucoes` da API.
3. Ajustar logica da tela `Patio` para transicoes reais do resumo.
4. Ajustar payload de `Agendamentos` para reset coerente das fases.
5. Validar typecheck/build e smoke de PATCH nos campos novos.

## 7) MIGRATIONS SQL NECESSARIAS

- Arquivo: `C:\Users\desen\OneDrive\Documentos\Projeto\BackEnd\Api\sql\migrations\20260413_002_patio_fluxo_operacional.sql`
- Aplicada em: banco `tawros`.
- Objetivo: fase operacional persistente + ordenacao da fila + quantidade real.

## 8) PATCHES DA API (diff unificado)

```diff
*** Update File: C:\Users\desen\OneDrive\Documentos\Projeto\BackEnd\Api\src\modules\entities\entity-config.ts
@@ resource: 'instrucoes'
-      'status',
-      'quantidade_total',
+      'status',
+      'patio_fase',
+      'chegada_em',
+      'chamado_em',
+      'entrada_em',
+      'finalizado_em',
+      'ordem_fila',
+      'quantidade_total',
+      'quantidade_real',
```

## 9) PATCHES DO FRONTEND (diff unificado)

```diff
*** Update File: src/pages/controle-patio/patio/patio.js
@@
+function normalizeProduto(value) { ... }
+function buildCompletionModal(row, detail = {}) { ... }
@@
-if (action === 'card-action' && cardId && cardAction === 'postpone') {
+if (action === 'card-action' && cardId && cardAction === 'check-in') { ... }
+if (action === 'card-action' && cardId && cardAction === 'check-in-today') { ... }
+if (action === 'card-action' && cardId && cardAction === 'call') { ... }
+if (action === 'card-action' && cardId && cardAction === 'entry') { ... }
+if (action === 'card-action' && cardId && cardAction === 'postpone') { ... }
```

```diff
*** Update File: src/pages/controle-patio/agendamentos/agendamentos.js
@@ persistScheduling
-        status: 'aprovado',
+        status: 'aprovado',
+        patio_fase: 'aguardando_chegada',
+        chegada_em: null,
+        chamado_em: null,
+        entrada_em: null,
+        finalizado_em: null,
+        ordem_fila: null,
```

## 10) LOGS DE ALTERACAO

- `log_database_changes.md`
- `log_api_changes.md`
- `log_frontend_changes.md`

## 11) ROLLBACK MAP

- `rollback_map.md`

## 12) CHECKLIST DE TESTE

### Frontend
- [ ] Abrir tela Patio e visualizar colunas corretas.
- [ ] Fazer `Fazer Check-in` em card aguardando.
- [ ] Fazer `Chamar` e depois `Dar entrada`.
- [ ] Finalizar carregamento e conferir movimento para `Finalizados`.
- [ ] Testar `Postergar` e `Ver Agendamentos Futuros`.
- [ ] Testar filtro por produto em todas as colunas.

### API
- [x] `PATCH /api/v1/instrucoes/{id}` aceita `patio_fase`.
- [x] `PATCH` aceita `chegada_em` e `ordem_fila`.
- [x] `GET /api/v1/health` ativo apos restart.

### Banco
- [x] Novas colunas existem em `app.instrucoes`.
- [x] CHECK de `patio_fase` criado.
- [x] Indices de patio criados.

### Logs
- [x] `log_database_changes.md` criado.
- [x] `log_api_changes.md` criado.
- [x] `log_frontend_changes.md` criado.
- [x] `rollback_map.md` criado.

## Observacao de escopo pendente (proximo incremento)
- Consumo definitivo de saldo de fardos/quantidade entre viagens sucessivas da mesma instrucao (regra de abatimento total) ainda precisa de modelagem complementar.
- `Registrar entrada` ainda abre drawer e nao persiste uma nova instrucao operacional completa por falta de campos de negocio no fluxo atual da tela.
