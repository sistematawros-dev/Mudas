import json
from pathlib import Path

root = Path.cwd()
openapi_path = root / 'backend-api' / 'openapi.snapshot.json'
if not openapi_path.exists():
    raise SystemExit('openapi.snapshot.json não encontrado')

spec = json.loads(openapi_path.read_text(encoding='utf-8'))
paths = spec.get('paths', {})

public_routes = {
    'GET /api/v1/health',
    'GET /api/v1/liveness',
    'GET /api/v1/readiness',
    'GET /api/v1/version',
    'GET /openapi.json',
    'POST /api/v1/auth/login',
    'POST /api/v1/auth/refresh',
    'POST /api/v1/auth/logout',
    'POST /api/v1/auth/forgot-password',
    'POST /api/v1/auth/reset-password',
    'POST /api/v1/integrations/webhooks/{event}',
}


def module_of(p: str) -> str:
    if p.startswith('/api/v1/auth/'):
        return 'Auth'
    if p.startswith('/api/v1/admin/'):
        return 'Admin'
    if p.startswith('/api/v1/integrations/'):
        return 'Integrations'
    if p.startswith('/api/v1/lookups/'):
        return 'Lookups'
    if p.startswith('/api/v1/export/'):
        return 'Export'
    if p.startswith('/api/v1/search/'):
        return 'Search'
    if p.startswith('/api/v1/health') or p.startswith('/api/v1/readiness') or p.startswith('/api/v1/liveness') or p.startswith('/api/v1/version') or p.startswith('/openapi.json'):
        return 'Infra'
    return 'Entidades'


def purpose(method: str, p: str) -> str:
    m = method.upper()
    if p == '/api/v1/health':
        return 'Healthcheck simples para disponibilidade da API.'
    if p == '/api/v1/readiness':
        return 'Readiness com validação de conectividade do banco.'
    if p == '/api/v1/liveness':
        return 'Liveness do processo para orquestração.'
    if p == '/api/v1/version':
        return 'Retorna versão da API em execução.'
    if p == '/openapi.json':
        return 'Retorna contrato OpenAPI para tooling e integração.'
    if '/auth/login' in p:
        return 'Autentica usuário e retorna access/refresh token.'
    if '/auth/refresh' in p:
        return 'Rotaciona refresh token e retorna novo access token.'
    if '/auth/logout' in p:
        return 'Revoga refresh token para encerrar sessão.'
    if '/auth/revoke' in p:
        return 'Revoga refresh token por rota autenticada.'
    if '/auth/me' in p:
        return 'Retorna dados do usuário autenticado.'
    if '/auth/change-password' in p:
        return 'Troca senha do usuário autenticado.'
    if '/auth/forgot-password' in p:
        return 'Solicita token de recuperação de senha.'
    if '/auth/reset-password' in p:
        return 'Reseta senha com token válido.'
    if '/search/global' in p:
        return 'Busca textual global em entidades centrais.'
    if '/lookups/' in p:
        return 'Lookup para dropdown/autocomplete.'
    if '/export/' in p:
        return 'Exportação de recurso em csv/json.'
    if '/integrations/status' in p:
        return 'Status de integrações.'
    if '/integrations/webhooks/' in p:
        return 'Recebimento de webhook externo.'
    if '/integrations/' in p and '/pull' in p:
        return 'Extração de dados para sincronização externa.'
    if '/integrations/' in p and '/push' in p:
        return 'Inserção de dados recebidos de sistema externo.'
    if '/integrations/' in p and '/upsert' in p:
        return 'Upsert idempotente por external_source/external_id.'
    if '/integrations/' in p and '/delta' in p:
        return 'Consulta alterações desde timestamp informado.'
    if '/integrations/import/' in p:
        return 'Importação em lote de registros.'
    if '/integrations/export/' in p:
        return 'Exportação de registros para integração.'
    if '/admin/audit' in p:
        return 'Consulta trilha de auditoria.'
    if '/admin/errors' in p:
        return 'Placeholder para integração com APM.'
    if '/admin/metrics' in p:
        return 'Métrica básica operacional.'
    if '/admin/permissions' in p:
        return 'Lista permissões cadastradas.'
    if '/admin/sessions' in p:
        return 'Lista sessões (refresh tokens).' 
    if '/admin/users' in p:
        return 'Lista usuários administrativos.'
    if p.endswith('/by-external'):
        return 'Consulta por externalSource/externalId.'
    if p.endswith('/bulk-create'):
        return 'Criação em lote.'
    if p.endswith('/bulk-upsert'):
        return 'Upsert em lote.'
    if p.endswith('/bulk-update'):
        return 'Atualização em lote.'
    if p.endswith('/bulk-delete'):
        return 'Exclusão em lote.'
    if p.endswith('/restore'):
        return 'Restauração de soft delete.'
    if p.endswith('/audit'):
        return 'Consulta auditoria por registro.'
    if '{relation}' in p:
        return 'Consulta sub-relação por id.'
    if m == 'GET' and p.count('/') == 3 and p.startswith('/api/v1/'):
        return 'Listagem paginada com filtros e ordenação.'
    if m == 'GET' and '{id}' in p:
        return 'Consulta detalhada por identificador.'
    if m == 'POST' and p.count('/') == 3 and p.startswith('/api/v1/'):
        return 'Criação de registro.'
    if m == 'PUT':
        return 'Atualização completa de registro.'
    if m == 'PATCH':
        return 'Atualização parcial de registro.'
    if m == 'DELETE' and '{id}' in p:
        return 'Exclusão lógica (soft delete).'
    return 'Operação conforme contrato OpenAPI.'


def auth_info(method: str, p: str):
    key = f"{method.upper()} {p}"
    if key in public_routes:
        return ('não', 'N/A', 'N/A', 'Rota pública; proteger contra abuso com rate limit.')
    perm = 'JWT válido'
    if '/admin/audit' in p:
        perm = 'Permissão cadastros.manage'
    return ('sim', 'Bearer JWT', perm, 'Enviar token somente no header Authorization.')


def route_params(p: str) -> str:
    names = []
    s = p
    while '{' in s and '}' in s:
        a = s.index('{')
        b = s.index('}', a)
        names.append(s[a+1:b])
        s = s[b+1:]
    if not names:
        return "| nome | tipo | obrigatório | descrição | exemplo |\n|---|---|---|---|---|\n| - | - | não | Sem parâmetros de rota. | - |"
    rows = []
    for n in names:
        ex = '123' if n == 'id' else ('pessoas-empresas' if n == 'resource' else ('ramos' if n == 'relation' else 'evento-x'))
        rows.append(f"| {n} | string | sim | Parâmetro de rota. | {ex} |")
    return "| nome | tipo | obrigatório | descrição | exemplo |\n|---|---|---|---|---|\n" + "\n".join(rows)


def query_params(method: str, p: str) -> str:
    items = []
    if p.startswith('/api/v1/') and p.count('/') == 3 and '{' not in p and method == 'get':
        items.extend([
            ('page', 'integer', 'não', 'Página', '>=1', '1'),
            ('limit', 'integer', 'não', 'Tamanho da página', '1..200', '20'),
            ('sort', 'string', 'não', 'Campo de ordenação permitido', 'conforme recurso', 'id'),
            ('order', 'string', 'não', 'Direção', 'asc|desc', 'desc'),
            ('q', 'string', 'não', 'Busca textual', 'mín. 2 chars', 'acme'),
            ('fields', 'string', 'não', 'Seleção de colunas', 'csv', 'id,nome'),
            ('include', 'string', 'não', 'Inclusão de relações', 'csv', 'ramos'),
            ('withDeleted', 'boolean', 'não', 'Inclui excluídos logicamente', 'true|false', 'false'),
            ('externalSource', 'string', 'não', 'Filtro integração', 'texto', 'erp'),
            ('externalId', 'string', 'não', 'Filtro integração', 'texto', 'A-100'),
        ])
    if p.endswith('/by-external'):
        items.extend([
            ('externalSource', 'string', 'sim', 'Origem externa', 'texto', 'erp'),
            ('externalId', 'string', 'sim', 'ID externo', 'texto', 'A-100'),
        ])
    if '/search/global' in p:
        items.append(('q', 'string', 'sim', 'Texto de busca', 'mín. 2 chars', 'fertilizante'))
    if '/export/{resource}' in p:
        items.append(('format', 'string', 'não', 'Formato exportação', 'csv|json', 'csv'))
    if '/integrations/{resource}/delta' in p:
        items.append(('since', 'string', 'sim', 'Timestamp inicial', 'ISO 8601', '2026-03-01T00:00:00Z'))

    if not items:
        return "| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |\n|---|---|---|---|---|---|\n| - | - | não | Sem query params relevantes. | - | - |"
    rows = [f"| {a} | {b} | {c} | {d} | {e} | {f} |" for a,b,c,d,e,f in items]
    return "| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |\n|---|---|---|---|---|---|\n" + "\n".join(rows)


def body_guide(method: str, p: str) -> str:
    if method == 'get' or (method == 'delete' and not p.endswith('/bulk-delete')):
        return "- Não possui body obrigatório para esta operação.\n\nExemplo JSON completo:\n```json\n{}\n```\n\nExemplo JSON mínimo válido:\n```json\n{}\n```"
    if '/auth/login' in p:
        return "- Obrigatórios: `email`, `password` (mínimo 6).\n\nExemplo JSON completo:\n```json\n{\n  \"email\": \"admin@tawros.local\",\n  \"password\": \"Admin@123\"\n}\n```\n\nExemplo JSON mínimo válido:\n```json\n{\n  \"email\": \"admin@tawros.local\",\n  \"password\": \"Admin@123\"\n}\n```"
    if '/auth/refresh' in p or '/auth/logout' in p or '/auth/revoke' in p:
        return "- Obrigatório: `refreshToken`.\n\n```json\n{ \"refreshToken\": \"<token>\" }\n```"
    if '/auth/change-password' in p:
        return "- Obrigatórios: `currentPassword`, `newPassword` (mínimo 8).\n\n```json\n{\n  \"currentPassword\": \"SenhaAtual123\",\n  \"newPassword\": \"NovaSenha@123\"\n}\n```"
    if '/auth/forgot-password' in p:
        return "- Enviar ao menos um: `email` ou `cpf` ou `phone`.\n\n```json\n{ \"email\": \"usuario@dominio.com\" }\n```"
    if '/auth/reset-password' in p:
        return "- Obrigatórios: `token`, `newPassword` (mínimo 8).\n\n```json\n{\n  \"token\": \"<token-reset>\",\n  \"newPassword\": \"SenhaNova@123\"\n}\n```"
    if p.endswith('/bulk-create') or p.endswith('/bulk-upsert') or '/integrations/import/' in p:
        return "- Body é array de objetos.\n\nExemplo JSON completo:\n```json\n[\n  { \"codigo\": \"COD-001\", \"nome\": \"Item 1\", \"ativo\": true },\n  { \"codigo\": \"COD-002\", \"nome\": \"Item 2\", \"ativo\": true }\n]\n```\n\nExemplo JSON mínimo válido:\n```json\n[{}]\n```"
    if p.endswith('/bulk-update'):
        return "- Body: array `{ id, data }`.\n\n```json\n[\n  { \"id\": 1, \"data\": { \"nome\": \"Novo Nome\" } }\n]\n```"
    if p.endswith('/bulk-delete'):
        return "- Body obrigatório: `ids`.\n\n```json\n{ \"ids\": [1,2,3] }\n```"
    if '/integrations/webhooks/' in p:
        return "- Payload livre conforme evento de integração.\n\n```json\n{ \"eventId\": \"evt-1\", \"payload\": { \"foo\": \"bar\" } }\n```"
    if '/integrations/' in p and ('/push' in p or '/upsert' in p):
        return "- Body objeto único do recurso.\n- Para upsert: `external_source` e `external_id` obrigatórios.\n\n```json\n{\n  \"external_source\": \"erp\",\n  \"external_id\": \"A-100\",\n  \"codigo\": \"COD-10\",\n  \"nome\": \"Registro Externo\"\n}\n```"
    return "- Body JSON conforme campos permitidos do recurso.\n- Regras de banco aplicáveis: NOT NULL, UNIQUE, CHECK, FK.\n\nExemplo JSON completo:\n```json\n{\n  \"codigo\": \"COD-001\",\n  \"nome\": \"Exemplo\",\n  \"descricao\": \"Registro de exemplo\",\n  \"ativo\": true,\n  \"external_source\": \"erp\",\n  \"external_id\": \"123\"\n}\n```\n\nExemplo JSON mínimo válido:\n```json\n{\n  \"codigo\": \"COD-001\",\n  \"nome\": \"Exemplo\"\n}\n```"


def curl_example(method: str, p: str, auth_required: str) -> str:
    route = p.replace('{id}', '1').replace('{resource}', 'pessoas-empresas').replace('{relation}', 'ramos').replace('{event}', 'pedido-criado')
    lines = [
        f"curl -X '{method.upper()}' \\",
        f"  'http://192.168.15.10:3000{route}' \\",
        "  -H 'accept: application/json' \\",
    ]
    if auth_required == 'sim':
        lines.append("  -H 'Authorization: Bearer <ACCESS_TOKEN>' \\")
    if method != 'get':
        lines.append("  -H 'Content-Type: application/json' \\")
    if method != 'get' and not (method == 'delete' and not p.endswith('/bulk-delete')):
        lines.append("  -d '{\"codigo\":\"COD-001\",\"nome\":\"Exemplo\"}'")
    else:
        lines[-1] = lines[-1].rstrip(' \\')
    return "```bash\n" + "\n".join(lines) + "\n```"


def postman_guide(method: str, p: str, auth_required: str) -> str:
    lines = [
        f"- Método: `{method.upper()}`",
        f"- URL: `http://192.168.15.10:3000{p}`",
        "- Headers: `accept: application/json`" + (" e `Content-Type: application/json`" if method != 'get' else ""),
        f"- Auth: {'Bearer Token' if auth_required == 'sim' else 'Sem auth'}",
        "- Body: JSON conforme seção anterior",
        "- Testes esperados: validar status code, tempo de resposta e schema",
    ]
    return "\n".join(lines)


def status_table(p: str) -> str:
    if p in {'/api/v1/health', '/api/v1/liveness', '/api/v1/version'}:
        return "| status code | motivo | quando acontece | exemplo de resposta de erro |\n|---|---|---|---|\n| 500 | Erro interno | Falha inesperada | `{\"statusCode\":500,\"code\":\"INTERNAL_ERROR\"}` |"
    rows = [
        ('400', 'Payload/parâmetro inválido', 'Campos inválidos, filtros não permitidos', '{"statusCode":400,"code":"BAD_REQUEST"}'),
        ('401', 'Não autenticado', 'Falta/erro no bearer token', '{"statusCode":401,"code":"UNAUTHORIZED"}'),
        ('403', 'Sem permissão', 'Usuário sem escopo/permissão', '{"statusCode":403,"code":"FORBIDDEN"}'),
        ('404', 'Não encontrado', 'ID/recurso inexistente', '{"statusCode":404,"code":"NOT_FOUND"}'),
        ('409', 'Conflito de unicidade', 'Violação UNIQUE/chave externa', '{"statusCode":409,"code":"CONFLICT"}'),
        ('422', 'Entidade inválida', 'Check/rule violation', '{"statusCode":422,"code":"UNPROCESSABLE_ENTITY"}'),
        ('429', 'Rate limit', 'Excesso de requisições', '{"statusCode":429,"code":"TOO_MANY_REQUESTS"}'),
        ('500', 'Erro interno', 'Falha inesperada', '{"statusCode":500,"code":"INTERNAL_ERROR"}'),
    ]
    body = "\n".join([f"| {a} | {b} | {c} | `{d}` |" for a,b,c,d in rows])
    return "| status code | motivo | quando acontece | exemplo de resposta de erro |\n|---|---|---|---|\n" + body


endpoint_rows = []
endpoint_blocks = []
method_order = ['get', 'post', 'put', 'patch', 'delete']

for p in sorted(paths.keys()):
    path_item = paths[p]
    methods = [m for m in method_order if m in path_item]
    for method in methods:
        mod = module_of(p)
        aut = auth_info(method, p)
        summary = path_item[method].get('summary') or purpose(method, p)
        endpoint_rows.append(
            f"| {mod} | {method.upper()} | {p} | {summary} | {'Bearer' if aut[0]=='sim' else 'Público'} | {aut[2]} | {'Soft delete' if p.endswith('/restore') else '-'} |"
        )

        route = p.replace('{id}', '1').replace('{resource}', 'pessoas-empresas').replace('{relation}', 'ramos').replace('{event}', 'pedido-criado')
        success = """```json
{
  "data": {},
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1
  },
  "requestId": "<uuid>"
}
```"""
        if p == '/api/v1/auth/login':
            success = """```json
{
  "data": {
    "accessToken": "<jwt>",
    "refreshToken": "<refresh>",
    "user": {
      "id": "1",
      "email": "admin@tawros.local",
      "name": "Administrador",
      "roles": ["ADMIN"],
      "permissions": ["cadastros.manage", "produtos.manage"]
    }
  },
  "requestId": "<uuid>"
}
```"""

        endpoint_blocks.append(f"""
# [{mod}]
## [{method.upper()}] {p}

### 1. Finalidade
- {purpose(method, p)}
- Quando usar: {summary}.
- Fluxo/tela: {'Cadastros do frontend (Pessoas/Empresas, Produtos/Serviços, Classificação, Embalagens).' if mod=='Entidades' else 'Fluxo técnico interno/integração.'}

### 2. Autenticação e permissão
- exige autenticação? {aut[0]}
- tipo de autenticação: {aut[1]}
- perfil/role/permissão necessária: {aut[2]}
- observações de segurança: {aut[3]}

### 3. Parâmetros de rota
{route_params(p)}

### 4. Query params
{query_params(method, p)}

### 5. Body da requisição
{body_guide(method, p)}

### 6. Exemplo de uso
Swagger:
- Abrir `/docs`, localizar rota e clicar em `Try it out`.
- Preencher parâmetros e body conforme necessário.

curl:
{curl_example(method, p, aut[0])}

Postman/Insomnia:
{postman_guide(method, p, aut[0])}

fetch/axios (frontend):
```ts
const res = await fetch('http://192.168.15.10:3000{route}', {{
  method: '{method.upper()}',
  headers: {{
    'Accept': 'application/json',{"\n    'Authorization': 'Bearer <ACCESS_TOKEN>'," if aut[0]=='sim' else ''}{"\n    'Content-Type': 'application/json'" if method != 'get' else ''}
  }}
}})
```

### 7. Exemplo de resposta de sucesso
{success}

Campos da resposta:
- `data`: payload principal.
- `meta`: paginação/contagem quando aplicável.
- `requestId`: correlação para logs.

### 8. Possíveis erros
{status_table(p)}

### 9. Como testar manualmente
- Pré-requisitos: API no ar e banco disponível.
- Se rota protegida: obter token via login.
- Executar requisição e validar status + estrutura de resposta.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir `http://192.168.15.10:3000/docs`.
- Se necessário, clicar em **Authorize** e informar `Bearer <token>`.
- Executar endpoint e validar retorno.

### 11. Como testar via curl
{curl_example(method, p, aut[0])}

### 12. Como testar no Postman/Insomnia
{postman_guide(method, p, aut[0])}

### 13. Critérios de validação
- Status code esperado para o cenário.
- Estrutura de resposta correta (`data`, `meta`, `requestId`).
- Sem vazamento de dados sensíveis.
- Efeito esperado persistido no banco (quando aplicável).

### 14. Dependências e observações
- Dependências: token válido (quando protegido), FK/UNIQUE/check conforme banco.
- Limitações: rate limit ativo e validação estrita de payload.
- Recursos de domínio usam soft delete e podem possuir auditoria por registro.
""")

header = """# Documentação Técnica Completa da API TAWROS

## Sumário
1. Visão Geral da API
2. Tecnologias e Padrões Utilizados
3. URL Base e Ambientes
4. Autenticação e Autorização
5. Padrão de Request e Response
6. Padrão de Erros
7. Paginação, Filtros, Ordenação e Include
8. Documentação Endpoint por Endpoint
9. Fluxos de Teste Sugeridos
10. Cenários de Erro e Validação
11. Roteiro de Testes Manuais
12. Exemplos Prontos para Swagger / CURL / Postman
13. Checklist Final de Validação
14. Tabela Resumo Geral dos Endpoints
15. Matriz de Testes
16. Ordem Recomendada de Teste

## 1. Visão Geral da API
API REST em Fastify/TypeScript para operações de cadastros, autenticação, integrações e administração.

## 2. Tecnologias e Padrões Utilizados
- Node.js, Fastify, TypeScript strict, Kysely + PostgreSQL.
- JSON Schema + Zod, JWT, Pino, Swagger/OpenAPI.
- Rate limit, CORS, Helmet, soft delete, auditoria.

## 3. URL Base e Ambientes
- Local: `http://192.168.15.10:3000`
- Prefixo funcional: `/api/v1`
- Swagger: `/docs`
- OpenAPI: `/openapi.json`

## 4. Autenticação e Autorização
### Fluxo obrigatório
1. `POST /api/v1/auth/login`
2. Usar `Authorization: Bearer <accessToken>`
3. `POST /api/v1/auth/refresh` para renovação
4. `POST /api/v1/auth/logout` para encerrar sessão
5. `GET /api/v1/auth/me` para contexto do usuário
6. `POST /api/v1/auth/forgot-password` e `POST /api/v1/auth/reset-password` para recuperação

## 5. Padrão de Request e Response
```json
{
  "data": {},
  "meta": {},
  "requestId": "uuid"
}
```

## 6. Padrão de Erros
```json
{
  "statusCode": 401,
  "code": "UNAUTHORIZED",
  "error": "Unauthorized",
  "message": "Não autenticado"
}
```

## 7. Paginação, Filtros, Ordenação e Include
- `page`, `limit`, `sort`, `order`, `q`, `fields`, `include`, `withDeleted`, `externalSource`, `externalId`.
- Filtros compostos: parser central com whitelist de campos por recurso.

Exemplos:
```bash
curl "http://192.168.15.10:3000/api/v1/pessoas-empresas?page=1&limit=20&sort=id&order=desc&q=acme"
```
```bash
curl "http://192.168.15.10:3000/api/v1/produtos-servicos?withDeleted=false&externalSource=erp&externalId=A-100"
```

## 8. Documentação Endpoint por Endpoint
"""

footer = f"""
## 9. Fluxos de Teste Sugeridos
1. Infra: health/liveness/readiness/version.
2. Auth: login -> me -> refresh -> logout.
3. Entidades: list -> create -> get by id -> update -> delete -> restore.
4. Bulk: bulk-create -> bulk-update -> bulk-delete.
5. Integrações: push/upsert -> delta -> export/import.
6. Admin: users/sessions/permissions/audit.

## 10. Cenários de Erro e Validação
- 400 payload inválido
- 401 token inválido/ausente
- 403 sem permissão
- 404 recurso inexistente
- 409 conflito de unicidade
- 422 regra de domínio
- 429 rate limit
- 500 erro interno

## 11. Roteiro de Testes Manuais
- Obter token no login.
- Testar rota protegida sem token (esperar 401).
- Testar rota protegida com token (esperar 200/201).
- Validar efeitos no banco e logs (`requestId`).

## 12. Exemplos Prontos para Swagger / CURL / Postman
- Swagger: usar `/docs`, botão Authorize, executar Try it out.
- CURL: usar exemplos por endpoint.
- Postman/Insomnia: importar `openapi.json` e configurar `baseUrl`.

## 13. Checklist Final de Validação
- [ ] Todos os endpoints listados no OpenAPI documentados.
- [ ] Fluxo de autenticação validado.
- [ ] Operações de CRUD/Bulk/Integração validadas.
- [ ] Códigos de erro esperados cobertos.
- [ ] Segurança e observabilidade validadas.

## 14. Tabela Resumo Geral dos Endpoints
| módulo | método | rota | finalidade | autenticação | permissão | observação |
|---|---|---|---|---|---|---|
{chr(10).join(endpoint_rows)}

## 15. Matriz de Testes
| endpoint | cenário | entrada | resultado esperado | status code esperado |
|---|---|---|---|---|
| /api/v1/auth/login | login válido | email/senha corretos | retorna access+refresh | 200 |
| /api/v1/auth/login | login inválido | senha incorreta | credenciais inválidas | 401 |
| /api/v1/users | sem token | sem Authorization | não autenticado | 401 |
| /api/v1/users | com token | bearer válido | listagem paginada | 200 |
| /api/v1/pessoas-empresas | criar válido | payload mínimo | registro criado | 201 |
| /api/v1/pessoas-empresas/{{id}} | delete+restore | id existente | soft delete e restore | 200 |
| /api/v1/integrations/{{resource}}/upsert | upsert externo | external_source + external_id | idempotência | 200 |
| /api/v1/admin/audit | sem permissão | token sem scope | acesso negado | 403 |
| /api/v1/readiness | banco indisponível | simulação queda DB | ready=false | 503 |

## 16. Ordem Recomendada de Teste
1. login
2. obter token
3. auth/me
4. listagem de entidades
5. criação
6. edição
7. consulta por id
8. exclusão
9. restauração
10. bulk operations
11. integrações
12. exportação
13. endpoints admin
14. refresh/logout
"""

out = root / 'backend-api' / 'docs' / 'API_DOCUMENTACAO_COMPLETA.md'
out.write_text(header + "\n".join(endpoint_blocks) + footer, encoding='utf-8')
print(f'Gerado: {out}')
print(f'Total de endpoints documentados: {len(endpoint_rows)}')
