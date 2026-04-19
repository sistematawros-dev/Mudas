$spec = Get-Content backend-api\openapi.snapshot.json -Raw | ConvertFrom-Json
$paths = $spec.paths.PSObject.Properties | Sort-Object Name

$public = @(
  'GET /api/v1/health','GET /api/v1/liveness','GET /api/v1/readiness','GET /api/v1/version','GET /openapi.json',
  'POST /api/v1/auth/login','POST /api/v1/auth/refresh','POST /api/v1/auth/logout','POST /api/v1/auth/forgot-password','POST /api/v1/auth/reset-password','POST /api/v1/integrations/webhooks/{event}'
)

function Get-Module([string]$p){
  if($p -like '/api/v1/auth/*'){ return 'Auth' }
  if($p -like '/api/v1/admin/*'){ return 'Admin' }
  if($p -like '/api/v1/integrations/*'){ return 'Integrations' }
  if($p -like '/api/v1/lookups/*'){ return 'Lookups' }
  if($p -like '/api/v1/export/*'){ return 'Export' }
  if($p -like '/api/v1/search/*'){ return 'Search' }
  if($p -in @('/api/v1/health','/api/v1/readiness','/api/v1/liveness','/api/v1/version','/openapi.json')){ return 'Infra' }
  return 'Entidades'
}

function Get-Purpose([string]$m,[string]$p){
  if($p -eq '/api/v1/health'){ return 'Healthcheck simples da API.' }
  if($p -eq '/api/v1/readiness'){ return 'Readiness com validação de banco.' }
  if($p -eq '/api/v1/liveness'){ return 'Liveness do processo.' }
  if($p -eq '/api/v1/version'){ return 'Versão da API.' }
  if($p -eq '/openapi.json'){ return 'Contrato OpenAPI.' }
  if($p -like '*/auth/login'){ return 'Login e emissão de tokens.' }
  if($p -like '*/auth/refresh'){ return 'Renovação de access token.' }
  if($p -like '*/auth/logout'){ return 'Revogação de refresh token.' }
  if($p -like '*/auth/revoke'){ return 'Revogação autenticada.' }
  if($p -like '*/auth/me'){ return 'Dados do usuário autenticado.' }
  if($p -like '*/auth/change-password'){ return 'Troca de senha.' }
  if($p -like '*/auth/forgot-password'){ return 'Solicitação de reset de senha.' }
  if($p -like '*/auth/reset-password'){ return 'Reset de senha com token.' }
  if($p -like '*/search/global'){ return 'Busca textual global.' }
  if($p -like '*/lookups/*'){ return 'Lookup para combos/autocomplete.' }
  if($p -like '*/export/*'){ return 'Exportação em csv/json.' }
  if($p -like '*/integrations/*/pull'){ return 'Pull para integração.' }
  if($p -like '*/integrations/*/push'){ return 'Push de integração.' }
  if($p -like '*/integrations/*/upsert'){ return 'Upsert idempotente por external ids.' }
  if($p -like '*/integrations/*/delta'){ return 'Consulta delta por timestamp.' }
  if($p -like '*/integrations/import/*'){ return 'Importação em lote.' }
  if($p -like '*/integrations/export/*'){ return 'Exportação para integração.' }
  if($p -like '*/integrations/status'){ return 'Status das integrações.' }
  if($p -like '*/integrations/webhooks/*'){ return 'Recepção de webhooks.' }
  if($p -like '*/admin/audit'){ return 'Consulta de auditoria.' }
  if($p -like '*/admin/*'){ return 'Operação administrativa.' }
  if($p -like '*/by-external'){ return 'Consulta por externalSource/externalId.' }
  if($p -like '*/bulk-create'){ return 'Criação em lote.' }
  if($p -like '*/bulk-upsert'){ return 'Upsert em lote.' }
  if($p -like '*/bulk-update'){ return 'Atualização em lote.' }
  if($p -like '*/bulk-delete'){ return 'Exclusão em lote.' }
  if($p -like '*/restore'){ return 'Restauração de soft delete.' }
  if($p -like '*/audit'){ return 'Consulta auditoria por registro.' }
  if($p -like '*{relation}*'){ return 'Consulta sub-relação.' }
  if($m -eq 'GET' -and $p -match '^/api/v1/[^/]+$'){ return 'Listagem paginada.' }
  if($m -eq 'GET' -and $p -match '{id}'){ return 'Consulta por id.' }
  if($m -eq 'POST' -and $p -match '^/api/v1/[^/]+$'){ return 'Criação de registro.' }
  if($m -eq 'PUT'){ return 'Atualização completa.' }
  if($m -eq 'PATCH'){ return 'Atualização parcial.' }
  if($m -eq 'DELETE' -and $p -match '{id}'){ return 'Exclusão lógica.' }
  return 'Operação conforme contrato OpenAPI.'
}

function Auth-Info([string]$m,[string]$p){
  $k = "$m $p"
  if($public -contains $k){ return @{req='não'; typ='N/A'; perm='N/A'; obs='Rota pública com rate limit.'} }
  $perm = if($p -eq '/api/v1/admin/audit'){'cadastros.manage'}else{'JWT válido'}
  return @{req='sim'; typ='Bearer JWT'; perm=$perm; obs='Usar Authorization: Bearer <token>.'}
}

$sb = [System.Text.StringBuilder]::new()
$null = $sb.AppendLine('# Documentação Técnica Completa da API TAWROS')
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## Sumário')
$null = $sb.AppendLine('1. Visão Geral da API')
$null = $sb.AppendLine('2. Tecnologias e Padrões Utilizados')
$null = $sb.AppendLine('3. URL Base e Ambientes')
$null = $sb.AppendLine('4. Autenticação e Autorização')
$null = $sb.AppendLine('5. Padrão de Request e Response')
$null = $sb.AppendLine('6. Padrão de Erros')
$null = $sb.AppendLine('7. Paginação, Filtros, Ordenação e Include')
$null = $sb.AppendLine('8. Documentação Endpoint por Endpoint')
$null = $sb.AppendLine('9. Fluxos de Teste Sugeridos')
$null = $sb.AppendLine('10. Cenários de Erro e Validação')
$null = $sb.AppendLine('11. Roteiro de Testes Manuais')
$null = $sb.AppendLine('12. Exemplos Prontos para Swagger / CURL / Postman')
$null = $sb.AppendLine('13. Checklist Final de Validação')
$null = $sb.AppendLine('14. Tabela Resumo Geral dos Endpoints')
$null = $sb.AppendLine('15. Matriz de Testes')
$null = $sb.AppendLine('16. Ordem Recomendada de Teste')
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 1. Visão Geral da API')
$null = $sb.AppendLine('API REST em Fastify/TypeScript para cadastros, autenticação, integrações e administração.')
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 2. Tecnologias e Padrões Utilizados')
$null = $sb.AppendLine('- Node.js, Fastify, TypeScript strict, Kysely + PostgreSQL.')
$null = $sb.AppendLine('- JSON Schema + Zod, JWT, Pino, Swagger/OpenAPI.')
$null = $sb.AppendLine('- Rate limit, CORS, Helmet, soft delete, auditoria.')
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 3. URL Base e Ambientes')
$null = $sb.AppendLine('- Local: `http://192.168.15.10:3000`')
$null = $sb.AppendLine('- Prefixo: `/api/v1`')
$null = $sb.AppendLine('- Swagger: `/docs`')
$null = $sb.AppendLine('- OpenAPI: `/openapi.json`')
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 4. Autenticação e Autorização')
$null = $sb.AppendLine('Fluxo: login -> bearer -> refresh -> logout/revoke -> me.')
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 5. Padrão de Request e Response')
$null = $sb.AppendLine('```json')
$null = $sb.AppendLine('{ "data": {}, "meta": {}, "requestId": "uuid" }')
$null = $sb.AppendLine('```')
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 6. Padrão de Erros')
$null = $sb.AppendLine('```json')
$null = $sb.AppendLine('{ "statusCode": 401, "code": "UNAUTHORIZED", "message": "Não autenticado" }')
$null = $sb.AppendLine('```')
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 7. Paginação, Filtros, Ordenação e Include')
$null = $sb.AppendLine('- `page`, `limit`, `sort`, `order`, `q`, `fields`, `include`, `withDeleted`, `externalSource`, `externalId`.')
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 8. Documentação Endpoint por Endpoint')

$summaryRows = New-Object System.Collections.Generic.List[string]
$summaryRows.Add('| módulo | método | rota | finalidade | autenticação | permissão | observação |')
$summaryRows.Add('|---|---|---|---|---|---|---|')

$methodOrder = @('get','post','put','patch','delete')
foreach($pitem in $paths){
  $p = $pitem.Name
  foreach($mk in $methodOrder){
    $mobj = $pitem.Value.$mk
    if($null -eq $mobj){ continue }
    $m = $mk.ToUpper()
    $mod = Get-Module $p
    $purpose = Get-Purpose $m $p
    $auth = Auth-Info $m $p
    $summary = if($mobj.summary){ [string]$mobj.summary } else { $purpose }
    $summaryRows.Add("| $mod | $m | $p | $summary | " + ($(if($auth.req -eq 'sim'){'Bearer'}else{'Público'})) + " | $($auth.perm) | " + ($(if($p -like '*/restore'){'Soft delete'}else{'-'})) + ' |')

    $r = $p.Replace('{id}','1').Replace('{resource}','pessoas-empresas').Replace('{relation}','ramos').Replace('{event}','pedido-criado')

    $null = $sb.AppendLine('')
    $null = $sb.AppendLine("# [$mod]")
    $null = $sb.AppendLine("## [$m] $p")
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine('### 1. Finalidade')
    $null = $sb.AppendLine("- $purpose")
    $null = $sb.AppendLine("- Quando usar: $summary")
    $null = $sb.AppendLine('- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.')
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine('### 2. Autenticação e permissão')
    $null = $sb.AppendLine("- exige autenticação? $($auth.req)")
    $null = $sb.AppendLine("- tipo de autenticação: $($auth.typ)")
    $null = $sb.AppendLine("- perfil/role/permissão necessária: $($auth.perm)")
    $null = $sb.AppendLine("- observações de segurança: $($auth.obs)")
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine('### 3. Parâmetros de rota')
    $null = $sb.AppendLine('| nome | tipo | obrigatório | descrição | exemplo |')
    $null = $sb.AppendLine('|---|---|---|---|---|')
    if($p -match '{'){ 
      if($p -match '{id}'){ $null = $sb.AppendLine('| id | string | sim | Identificador do registro | 1 |') }
      if($p -match '{resource}'){ $null = $sb.AppendLine('| resource | string | sim | Recurso alvo | pessoas-empresas |') }
      if($p -match '{relation}'){ $null = $sb.AppendLine('| relation | string | sim | Relação do recurso | ramos |') }
      if($p -match '{event}'){ $null = $sb.AppendLine('| event | string | sim | Evento do webhook | pedido-criado |') }
    } else {
      $null = $sb.AppendLine('| - | - | não | Sem parâmetros de rota | - |')
    }
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine('### 4. Query params')
    $null = $sb.AppendLine('| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |')
    $null = $sb.AppendLine('|---|---|---|---|---|---|')
    if($p -match '^/api/v1/[^/]+$' -and $m -eq 'GET'){
      $null = $sb.AppendLine('| page | integer | não | Página | >=1 | 1 |')
      $null = $sb.AppendLine('| limit | integer | não | Limite por página | 1..200 | 20 |')
      $null = $sb.AppendLine('| sort | string | não | Campo de ordenação | whitelist por recurso | id |')
      $null = $sb.AppendLine('| order | string | não | Ordem | asc/desc | desc |')
      $null = $sb.AppendLine('| q | string | não | Busca textual | mínimo 2 chars | acme |')
      $null = $sb.AppendLine('| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |')
    } elseif($p -like '*/by-external'){
      $null = $sb.AppendLine('| externalSource | string | sim | Origem externa | texto | erp |')
      $null = $sb.AppendLine('| externalId | string | sim | ID externo | texto | A-100 |')
    } elseif($p -like '*/search/global'){
      $null = $sb.AppendLine('| q | string | sim | Texto de busca | mínimo 2 chars | fertilizante |')
    } elseif($p -like '/api/v1/export/*'){
      $null = $sb.AppendLine('| format | string | não | Formato de exportação | csv/json | csv |')
    } elseif($p -like '/api/v1/integrations/*/delta'){
      $null = $sb.AppendLine('| since | string | sim | Timestamp inicial | ISO 8601 | 2026-03-01T00:00:00Z |')
    } else {
      $null = $sb.AppendLine('| - | - | não | Sem query params relevantes | - | - |')
    }
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine('### 5. Body da requisição')
    if($m -eq 'GET' -or ($m -eq 'DELETE' -and $p -notlike '*/bulk-delete')){
      $null = $sb.AppendLine('- Sem body obrigatório.')
      $null = $sb.AppendLine('```json')
      $null = $sb.AppendLine('{}')
      $null = $sb.AppendLine('```')
    } elseif($p -like '*/auth/login'){
      $null = $sb.AppendLine('- Obrigatórios: email, password.')
      $null = $sb.AppendLine('```json')
      $null = $sb.AppendLine('{ "email": "admin@tawros.local", "password": "Admin@123" }')
      $null = $sb.AppendLine('```')
    } elseif($p -like '*/auth/refresh' -or $p -like '*/auth/logout' -or $p -like '*/auth/revoke'){
      $null = $sb.AppendLine('```json')
      $null = $sb.AppendLine('{ "refreshToken": "<token>" }')
      $null = $sb.AppendLine('```')
    } elseif($p -like '*/auth/change-password'){
      $null = $sb.AppendLine('```json')
      $null = $sb.AppendLine('{ "currentPassword": "SenhaAtual123", "newPassword": "NovaSenha@123" }')
      $null = $sb.AppendLine('```')
    } elseif($p -like '*/auth/forgot-password'){
      $null = $sb.AppendLine('```json')
      $null = $sb.AppendLine('{ "email": "usuario@dominio.com" }')
      $null = $sb.AppendLine('```')
    } elseif($p -like '*/auth/reset-password'){
      $null = $sb.AppendLine('```json')
      $null = $sb.AppendLine('{ "token": "<token-reset>", "newPassword": "SenhaNova@123" }')
      $null = $sb.AppendLine('```')
    } elseif($p -like '*/bulk-create' -or $p -like '*/bulk-upsert' -or $p -like '/api/v1/integrations/import/*'){
      $null = $sb.AppendLine('```json')
      $null = $sb.AppendLine('[ { "codigo": "COD-001", "nome": "Item 1" } ]')
      $null = $sb.AppendLine('```')
    } elseif($p -like '*/bulk-update'){
      $null = $sb.AppendLine('```json')
      $null = $sb.AppendLine('[ { "id": 1, "data": { "nome": "Novo Nome" } } ]')
      $null = $sb.AppendLine('```')
    } elseif($p -like '*/bulk-delete'){
      $null = $sb.AppendLine('```json')
      $null = $sb.AppendLine('{ "ids": [1,2,3] }')
      $null = $sb.AppendLine('```')
    } else {
      $null = $sb.AppendLine('```json')
      $null = $sb.AppendLine('{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }')
      $null = $sb.AppendLine('```')
    }
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine('### 6. Exemplo de uso')
    $null = $sb.AppendLine('Swagger: /docs -> Try it out -> Execute.')
    $null = $sb.AppendLine('curl:')
    $null = $sb.AppendLine('```bash')
    $null = $sb.AppendLine("curl -X '$m' 'http://192.168.15.10:3000$r' -H 'accept: application/json'" + ($(if($auth.req -eq 'sim'){" -H 'Authorization: Bearer <ACCESS_TOKEN>'"}else{''})))
    $null = $sb.AppendLine('```')
    $null = $sb.AppendLine('Postman/Insomnia: método + URL + headers + body conforme seções.')
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine('### 7. Exemplo de resposta de sucesso')
    $null = $sb.AppendLine('```json')
    if($p -eq '/api/v1/auth/login'){
      $null = $sb.AppendLine('{ "data": { "accessToken": "<jwt>", "refreshToken": "<refresh>", "user": { "id": "1", "email": "admin@tawros.local" } }, "requestId": "<uuid>" }')
    } else {
      $null = $sb.AppendLine('{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }')
    }
    $null = $sb.AppendLine('```')
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine('### 8. Possíveis erros')
    $null = $sb.AppendLine('| status code | motivo | quando acontece | exemplo de resposta de erro |')
    $null = $sb.AppendLine('|---|---|---|---|')
    $null = $sb.AppendLine('| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |')
    $null = $sb.AppendLine('| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |')
    $null = $sb.AppendLine('| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |')
    $null = $sb.AppendLine('| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |')
    $null = $sb.AppendLine('| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |')
    $null = $sb.AppendLine('| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |')
    $null = $sb.AppendLine('| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |')
    $null = $sb.AppendLine('| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |')
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine('### 9. Como testar manualmente')
    $null = $sb.AppendLine('- Validar pré-requisitos (API/banco/token).')
    $null = $sb.AppendLine('- Executar requisição e conferir status/response.')
    $null = $sb.AppendLine('- Validar efeito no banco para operações mutáveis.')
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine('### 10. Como testar no Swagger')
    $null = $sb.AppendLine('- Abrir /docs; autorizar Bearer quando necessário; executar.')
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine('### 11. Como testar via curl')
    $null = $sb.AppendLine('```bash')
    $null = $sb.AppendLine("curl -X '$m' 'http://192.168.15.10:3000$r' -H 'accept: application/json'" + ($(if($auth.req -eq 'sim'){" -H 'Authorization: Bearer <ACCESS_TOKEN>'"}else{''})))
    $null = $sb.AppendLine('```')
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine('### 12. Como testar no Postman/Insomnia')
    $null = $sb.AppendLine('- Método, URL, headers, auth e body conforme acima.')
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine('### 13. Critérios de validação')
    $null = $sb.AppendLine('- Status esperado, schema esperado, sem dados sensíveis indevidos.')
    $null = $sb.AppendLine('- Persistência correta (quando aplicável).')
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine('### 14. Dependências e observações')
    $null = $sb.AppendLine('- Pode depender de token, dados prévios e constraints do banco.')
    $null = $sb.AppendLine('- Rate limit ativo; soft delete e auditoria onde aplicável.')
  }
}

$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 9. Fluxos de Teste Sugeridos')
$null = $sb.AppendLine('1. health/readiness/liveness/version')
$null = $sb.AppendLine('2. auth login/me/refresh/logout')
$null = $sb.AppendLine('3. CRUD de entidades')
$null = $sb.AppendLine('4. operações em lote')
$null = $sb.AppendLine('5. integrações e exportações')
$null = $sb.AppendLine('6. admin e auditoria')
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 10. Cenários de Erro e Validação')
$null = $sb.AppendLine('- 400, 401, 403, 404, 409, 422, 429, 500 conforme endpoint.')
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 11. Roteiro de Testes Manuais')
$null = $sb.AppendLine('- Login, token, chamadas protegidas, validação de banco e logs.')
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 12. Exemplos Prontos para Swagger / CURL / Postman')
$null = $sb.AppendLine('- Ver seção de cada endpoint.')
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 13. Checklist Final de Validação')
$null = $sb.AppendLine('- [ ] Todos endpoints cobertos')
$null = $sb.AppendLine('- [ ] Fluxo de auth validado')
$null = $sb.AppendLine('- [ ] CRUD/bulk/integrações validados')
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 14. Tabela Resumo Geral dos Endpoints')
foreach($r in $summaryRows){ $null = $sb.AppendLine($r) }
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 15. Matriz de Testes')
$null = $sb.AppendLine('| endpoint | cenário | entrada | resultado esperado | status code esperado |')
$null = $sb.AppendLine('|---|---|---|---|---|')
$null = $sb.AppendLine('| /api/v1/auth/login | login válido | email/senha corretos | retorna tokens | 200 |')
$null = $sb.AppendLine('| /api/v1/users | sem token | sem Authorization | não autenticado | 401 |')
$null = $sb.AppendLine('| /api/v1/users | com token | bearer válido | listagem paginada | 200 |')
$null = $sb.AppendLine('| /api/v1/pessoas-empresas | create | payload válido | cria registro | 201 |')
$null = $sb.AppendLine('| /api/v1/pessoas-empresas/{id}/restore | restore | id existente | restaura soft delete | 200 |')
$null = $sb.AppendLine('')
$null = $sb.AppendLine('## 16. Ordem Recomendada de Teste')
$null = $sb.AppendLine('1. login')
$null = $sb.AppendLine('2. obter token')
$null = $sb.AppendLine('3. auth/me')
$null = $sb.AppendLine('4. listagem')
$null = $sb.AppendLine('5. criação')
$null = $sb.AppendLine('6. atualização')
$null = $sb.AppendLine('7. consulta por id')
$null = $sb.AppendLine('8. exclusão')
$null = $sb.AppendLine('9. restauração')
$null = $sb.AppendLine('10. bulk operations')
$null = $sb.AppendLine('11. integrações')
$null = $sb.AppendLine('12. admin')
$null = $sb.AppendLine('13. refresh/logout')

$out = 'backend-api\docs\API_DOCUMENTACAO_COMPLETA.md'
Set-Content -Path $out -Value $sb.ToString() -Encoding UTF8
Write-Output "Gerado: $out"
Write-Output "Total linhas: $((Get-Content $out).Count)"
