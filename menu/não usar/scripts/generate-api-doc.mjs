import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const openapiPath = path.join(root, 'backend-api', 'openapi.snapshot.json');
if (!fs.existsSync(openapiPath)) {
  console.error('Arquivo openapi.snapshot.json não encontrado. Gere com GET /openapi.json antes.');
  process.exit(1);
}

const spec = JSON.parse(fs.readFileSync(openapiPath, 'utf8'));
const paths = spec.paths || {};

const publicRoutes = new Set([
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
  'POST /api/v1/integrations/webhooks/{event}'
]);

function moduleOf(p) {
  if (p.startsWith('/api/v1/auth/')) return 'Auth';
  if (p.startsWith('/api/v1/admin/')) return 'Admin';
  if (p.startsWith('/api/v1/integrations/')) return 'Integrations';
  if (p.startsWith('/api/v1/lookups/')) return 'Lookups';
  if (p.startsWith('/api/v1/export/')) return 'Export';
  if (p.startsWith('/api/v1/search/')) return 'Search';
  if (p.startsWith('/api/v1/health') || p.startsWith('/api/v1/readiness') || p.startsWith('/api/v1/liveness') || p.startsWith('/api/v1/version') || p.startsWith('/openapi.json')) return 'Infra';
  return 'Entidades';
}

function purpose(method, p) {
  const m = method.toUpperCase();
  if (p === '/api/v1/health') return 'Healthcheck simples para disponibilidade da API.';
  if (p === '/api/v1/readiness') return 'Readiness real com validação de conectividade com banco.';
  if (p === '/api/v1/liveness') return 'Liveness de processo para orquestradores.';
  if (p === '/api/v1/version') return 'Versão atual da API em execução.';
  if (p === '/openapi.json') return 'Contrato OpenAPI da API para ferramentas e automação.';
  if (p.includes('/auth/login')) return 'Autentica usuário e emite access token + refresh token.';
  if (p.includes('/auth/refresh')) return 'Rotaciona refresh token e emite novo access token.';
  if (p.includes('/auth/logout')) return 'Revoga refresh token informado (encerramento de sessão).';
  if (p.includes('/auth/revoke')) return 'Revoga refresh token com usuário autenticado.';
  if (p.includes('/auth/me')) return 'Retorna dados do usuário autenticado e suas permissões.';
  if (p.includes('/auth/change-password')) return 'Troca senha exigindo senha atual válida.';
  if (p.includes('/auth/forgot-password')) return 'Gera token de reset por e-mail/cpf/telefone.';
  if (p.includes('/auth/reset-password')) return 'Consome token de reset e define nova senha.';
  if (p.includes('/search/global')) return 'Busca textual global em pessoas/empresas e produtos/serviços.';
  if (p.includes('/lookups/')) return 'Lookup curto para dropdown/autocomplete no frontend.';
  if (p.includes('/export/')) return 'Exporta dados de um recurso em CSV/JSON.';
  if (p.includes('/integrations/status')) return 'Status operacional de integrações.';
  if (p.includes('/integrations/webhooks/')) return 'Recebe webhooks externos e responde 202.';
  if (p.includes('/integrations/') && p.includes('/pull')) return 'Extrai lote de dados para sincronização externa.';
  if (p.includes('/integrations/') && p.includes('/push')) return 'Insere registro enviado por sistema externo.';
  if (p.includes('/integrations/') && p.includes('/upsert')) return 'Upsert por external_source/external_id para integração idempotente.';
  if (p.includes('/integrations/') && p.includes('/delta')) return 'Retorna alterações desde um instante (since).';
  if (p.includes('/integrations/import/')) return 'Importa lote de registros em massa.';
  if (p.includes('/integrations/export/')) return 'Exporta lote para integração com withDeleted opcional.';
  if (p.includes('/admin/audit')) return 'Consulta trilha de auditoria funcional (audit.events).';
  if (p.includes('/admin/errors')) return 'Endpoint placeholder para central de erros/APM.';
  if (p.includes('/admin/metrics')) return 'Métrica básica de tamanho de banco.';
  if (p.includes('/admin/permissions')) return 'Lista permissões cadastradas em auth.permissions.';
  if (p.includes('/admin/sessions')) return 'Lista sessões/refresh tokens para operação e suporte.';
  if (p.includes('/admin/users')) return 'Lista usuários administrativos do auth.users.';
  if (p.endsWith('/by-external')) return 'Consulta por externalSource/externalId (integração).';
  if (p.endsWith('/bulk-create')) return 'Criação em lote (array de payloads).';
  if (p.endsWith('/bulk-upsert')) return 'Upsert em lote conforme regras do serviço.';
  if (p.endsWith('/bulk-update')) return 'Atualização em lote por id + data.';
  if (p.endsWith('/bulk-delete')) return 'Exclusão lógica em lote por ids.';
  if (p.endsWith('/restore')) return 'Restauração de item em soft delete.';
  if (p.endsWith('/audit')) return 'Consulta auditoria por registro (quando habilitada).';
  if (p.includes('{relation}')) return 'Consulta sub-relação de um registro principal.';
  if (m === 'GET' && p.match(/\/api\/v1\/[^/]+$/)) return 'Listagem paginada com filtros e ordenação.';
  if (m === 'GET' && p.includes('{id}')) return 'Consulta detalhada por identificador.';
  if (m === 'POST' && p.match(/\/api\/v1\/[^/]+$/)) return 'Criação de registro.';
  if (m === 'PUT') return 'Atualização completa do registro.';
  if (m === 'PATCH') return 'Atualização parcial do registro.';
  if (m === 'DELETE' && p.includes('{id}')) return 'Exclusão lógica (soft delete).';
  return 'Operação de API conforme contrato OpenAPI.';
}

function authInfo(method, p) {
  const key = `${method.toUpperCase()} ${p}`;
  if (publicRoutes.has(key)) {
    if (p.includes('/auth/login') || p.includes('/auth/refresh') || p.includes('/auth/logout') || p.includes('/auth/forgot-password') || p.includes('/auth/reset-password')) {
      return ['Não (público)', 'N/A', 'N/A', 'Aplicar rate limit e monitoramento de tentativas.'];
    }
    return ['Não (público)', 'N/A', 'N/A', 'Endpoint de infra/diagnóstico sem segredo sensível no retorno.'];
  }

  let permission = 'Token JWT válido';
  if (p.includes('/admin/audit')) permission = 'Permissão `cadastros.manage`';
  return ['Sim', 'Bearer JWT', permission, 'Não enviar token em query string; usar cabeçalho Authorization.'];
}

function routeParams(p) {
  const matches = [...p.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
  if (!matches.length) return '| nome | tipo | obrigatório | descrição | exemplo |\n|---|---|---|---|---|\n| - | - | não | Sem parâmetros de rota. | - |';
  const rows = matches.map((n) => `| ${n} | string | sim | Parâmetro de rota. | ${n === 'id' ? '123' : n === 'resource' ? 'pessoas-empresas' : 'ramos'} |`).join('\n');
  return `| nome | tipo | obrigatório | descrição | exemplo |\n|---|---|---|---|---|\n${rows}`;
}

function queryParams(method, p) {
  const items = [];
  if (p.match(/^\/api\/v1\/[a-z0-9-]+$/) && method === 'get') {
    items.push(['page', 'integer', 'não', 'Página', '>=1', '1']);
    items.push(['limit', 'integer', 'não', 'Tamanho da página', '1..200', '20']);
    items.push(['sort', 'string', 'não', 'Campo permitido para ordenação', 'conforme recurso', 'id']);
    items.push(['order', 'string', 'não', 'Direção de ordenação', 'asc|desc', 'desc']);
    items.push(['q', 'string', 'não', 'Busca textual simples', 'mín. 2 chars', 'acme']);
    items.push(['withDeleted', 'boolean', 'não', 'Inclui soft deleted', 'true|false', 'false']);
    items.push(['fields', 'string', 'não', 'Seleção de colunas', 'csv', 'id,nome']);
    items.push(['include', 'string', 'não', 'Include de relações', 'csv', 'ramos']);
    items.push(['externalSource', 'string', 'não', 'Filtro integração', 'texto', 'erp']);
    items.push(['externalId', 'string', 'não', 'Filtro integração', 'texto', '123']);
  }
  if (p.endsWith('/by-external')) {
    items.push(['externalSource', 'string', 'sim', 'Origem externa', 'texto', 'erp']);
    items.push(['externalId', 'string', 'sim', 'ID externo', 'texto', 'A-100']);
  }
  if (p.includes('/search/global')) items.push(['q', 'string', 'sim', 'Texto de busca', 'mín. 2 chars', 'fertilizante']);
  if (p.includes('/export/{resource}')) items.push(['format', 'string', 'não', 'Formato de exportação', 'csv|json', 'csv']);
  if (p.includes('/integrations/{resource}/delta')) items.push(['since', 'string', 'sim', 'Timestamp ISO para delta', 'ISO 8601', '2026-03-01T00:00:00Z']);

  if (!items.length) return '| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |\n|---|---|---|---|---|---|\n| - | - | não | Sem query params relevantes. | - | - |';
  const rows = items.map((i) => `| ${i[0]} | ${i[1]} | ${i[2]} | ${i[3]} | ${i[4]} | ${i[5]} |`).join('\n');
  return `| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |\n|---|---|---|---|---|---|\n${rows}`;
}

function bodyGuide(method, p) {
  if (method === 'get' || (method === 'delete' && !p.endsWith('/bulk-delete'))) {
    return '- Não possui body obrigatório para esta operação.\n\nExemplo JSON completo:\n```json\n{}\n```\n\nExemplo JSON mínimo válido:\n```json\n{}\n```';
  }
  if (p.includes('/auth/login')) return '- Obrigatórios: `email`, `password`.\n- `password` mínimo 6 chars.\n\nExemplo JSON completo:\n```json\n{\n  "email": "admin@tawros.local",\n  "password": "Admin@123"\n}\n```\n\nExemplo JSON mínimo válido:\n```json\n{\n  "email": "admin@tawros.local",\n  "password": "Admin@123"\n}\n```';
  if (p.includes('/auth/refresh') || p.includes('/auth/logout') || p.includes('/auth/revoke')) return '- Obrigatório: `refreshToken` (string).\n\nExemplo JSON:\n```json\n{ "refreshToken": "<token>" }\n```';
  if (p.includes('/auth/change-password')) return '- Obrigatórios: `currentPassword`, `newPassword` (mín. 8 para nova).\n\nExemplo JSON:\n```json\n{\n  "currentPassword": "SenhaAtual123",\n  "newPassword": "NovaSenha@123"\n}\n```';
  if (p.includes('/auth/forgot-password')) return '- Enviar ao menos um: `email` ou `cpf` ou `phone`.\n\nExemplo JSON:\n```json\n{ "email": "usuario@dominio.com" }\n```';
  if (p.includes('/auth/reset-password')) return '- Obrigatórios: `token`, `newPassword` (mín. 8).\n\nExemplo JSON:\n```json\n{\n  "token": "<token-reset>",\n  "newPassword": "SenhaNova@123"\n}\n```';
  if (p.endsWith('/bulk-create') || p.endsWith('/bulk-upsert') || p.includes('/integrations/import/')) return '- Body é array de objetos.\n\nExemplo JSON completo:\n```json\n[\n  { "codigo": "COD-001", "nome": "Item 1", "ativo": true },\n  { "codigo": "COD-002", "nome": "Item 2", "ativo": true }\n]\n```\n\nExemplo JSON mínimo válido:\n```json\n[{}]\n```';
  if (p.endsWith('/bulk-update')) return '- Body: array com objetos `{ id, data }`.\n\nExemplo:\n```json\n[\n  { "id": 1, "data": { "nome": "Novo Nome" } }\n]\n```';
  if (p.endsWith('/bulk-delete')) return '- Body obrigatório: `{ "ids": [1,2,3] }`.\n\nExemplo:\n```json\n{ "ids": [1, 2, 3] }\n```';
  if (p.includes('/integrations/webhooks/')) return '- Payload livre conforme evento do integrador.\n\nExemplo:\n```json\n{ "eventId": "evt-1", "payload": { "foo": "bar" } }\n```';
  if (p.includes('/integrations/') && (p.includes('/push') || p.includes('/upsert'))) return '- Body objeto único do recurso alvo.\n- Para `upsert`, exigir `external_source` e `external_id`.\n\nExemplo:\n```json\n{\n  "external_source": "erp",\n  "external_id": "A-100",\n  "codigo": "COD-10",\n  "nome": "Registro Externo"\n}\n```';
  return '- Body JSON conforme campos permitidos do recurso.\n- Restrições de schema/DB: NOT NULL, UNIQUE, CHECK e FKs.\n\nExemplo JSON completo:\n```json\n{\n  "codigo": "COD-001",\n  "nome": "Exemplo",\n  "descricao": "Registro de exemplo",\n  "ativo": true,\n  "external_source": "erp",\n  "external_id": "123"\n}\n```\n\nExemplo JSON mínimo válido:\n```json\n{\n  "codigo": "COD-001",\n  "nome": "Exemplo"\n}\n```';
}

function curlExample(method, p, auth) {
  const m = method.toUpperCase();
  const tokenHeader = auth === 'Sim' ? '  -H "Authorization: Bearer <ACCESS_TOKEN>" \\\n' : '';
  const ct = m !== 'GET' ? '  -H "Content-Type: application/json" \\\n' : '';
  let body = '';
  if (m !== 'GET' && !(m === 'DELETE' && !p.endsWith('/bulk-delete'))) body = "  -d '{\"codigo\":\"COD-001\",\"nome\":\"Exemplo\"}'";
  return `\`\`\`bash\ncurl -X '${m}' \\\n  'http://192.168.15.21:3000${p.replace('{id}', '1').replace('{resource}', 'pessoas-empresas').replace('{relation}', 'ramos').replace('{event}', 'pedido-criado')}' \\\n  -H 'accept: application/json' \\\n${tokenHeader}${ct}${body}\n\`\`\``;
}

function postmanGuide(method, p, auth) {
  const headerLine = method === 'get'
    ? '- Headers: `accept: application/json`'
    : '- Headers: `accept: application/json` e `Content-Type: application/json`';
  return [
    `- Método: \`${method.toUpperCase()}\``,
    `- URL: \`http://192.168.15.21:3000${p}\``,
    headerLine,
    `- Auth: ${auth === 'Sim' ? 'Bearer Token' : 'Sem auth'}`,
    '- Body: JSON conforme seção anterior',
    '- Testes esperados: validar status code, tempo de resposta e schema.'
  ].join('\n');
}

function statusTable(p) {
  const rows = [
    ['400', 'Payload/parâmetro inválido', 'Campos inválidos, filtros não permitidos', '{"statusCode":400,"code":"BAD_REQUEST"}'],
    ['401', 'Não autenticado', 'Falta/erro no bearer token', '{"statusCode":401,"code":"UNAUTHORIZED"}'],
    ['403', 'Sem permissão', 'Usuário sem escopo/permissão', '{"statusCode":403,"code":"FORBIDDEN"}'],
    ['404', 'Não encontrado', 'ID/recurso inexistente', '{"statusCode":404,"code":"NOT_FOUND"}'],
    ['409', 'Conflito de unicidade', 'Violação UNIQUE/external key', '{"statusCode":409,"code":"CONFLICT"}'],
    ['422', 'Entidade inválida', 'Regra de negócio/check constraint', '{"statusCode":422,"code":"UNPROCESSABLE_ENTITY"}'],
    ['429', 'Rate limit excedido', 'Muitas requisições', '{"statusCode":429,"code":"TOO_MANY_REQUESTS"}'],
    ['500', 'Erro interno', 'Falha inesperada', '{"statusCode":500,"code":"INTERNAL_ERROR"}']
  ];

  if (p === '/api/v1/health' || p === '/api/v1/liveness' || p === '/api/v1/version') {
    return `| status code | motivo | quando acontece | exemplo de resposta de erro |\n|---|---|---|---|\n| 500 | Erro interno | Falha inesperada no processo | {"statusCode":500,"code":"INTERNAL_ERROR"} |`;
  }

  const body = rows.map((r) => `| ${r[0]} | ${r[1]} | ${r[2]} | \`${r[3]}\` |`).join('\n');
  return `| status code | motivo | quando acontece | exemplo de resposta de erro |\n|---|---|---|---|\n${body}`;
}

const endpointRows = [];
const endpointBlocks = [];

const sortedPaths = Object.keys(paths).sort();
for (const p of sortedPaths) {
  const obj = paths[p] || {};
  const methods = Object.keys(obj).filter((k) => ['get', 'post', 'put', 'patch', 'delete'].includes(k)).sort((a, b) => {
    const order = ['get', 'post', 'put', 'patch', 'delete'];
    return order.indexOf(a) - order.indexOf(b);
  });

  for (const method of methods) {
    const mod = moduleOf(p);
    const auth = authInfo(method, p);
    const summary = obj[method]?.summary || purpose(method, p);
    const routePurpose = purpose(method, p);
    const m = method.toUpperCase();
    endpointRows.push(`| ${mod} | ${m} | ${p} | ${summary} | ${auth[0] === 'Sim' ? 'Bearer' : 'Público'} | ${auth[2]} | ${p.includes('/{id}/restore') ? 'Soft delete' : '-'} |`);

    const successExample = p === '/api/v1/auth/login'
      ? `\`\`\`json\n{\n  "data": {\n    "accessToken": "<jwt>",\n    "refreshToken": "<refresh>",\n    "user": {\n      "id": "1",\n      "email": "admin@tawros.local",\n      "name": "Administrador",\n      "roles": ["ADMIN"],\n      "permissions": ["cadastros.manage", "produtos.manage"]\n    }\n  },\n  "requestId": "<uuid>"\n}\n\`\`\``
      : `\`\`\`json\n{\n  "data": {},\n  "meta": {\n    "page": 1,\n    "limit": 20,\n    "total": 1,\n    "totalPages": 1\n  },\n  "requestId": "<uuid>"\n}\n\`\`\``;

    const relationHint = p.includes('{relation}')
      ? '- Depende de relação válida configurada no recurso (ex.: `ramos`, `marcas`, `fabricantes`).'
      : '- Sem dependência especial além do token e parâmetros válidos.';

    endpointBlocks.push(`
# [${mod}]
## [${m}] ${p}

### 1. Finalidade
- ${routePurpose}
- Quando usar: ${summary}.
- Fluxo/tela: ${mod === 'Entidades' ? 'Cadastros (Pessoas/Empresas, Produtos/Serviços, Classificação, Embalagens).' : mod === 'Auth' ? 'Login, recuperação e gestão de sessão.' : mod === 'Infra' ? 'Operação/monitoramento da aplicação.' : 'Operação administrativa/integrações.'}

### 2. Autenticação e permissão
- exige autenticação? ${auth[0]}
- tipo de autenticação: ${auth[1]}
- perfil/role/permissão necessária: ${auth[2]}
- observações de segurança: ${auth[3]}

### 3. Parâmetros de rota
${routeParams(p)}

### 4. Query params
${queryParams(method, p)}

### 5. Body da requisição
${bodyGuide(method, p)}

### 6. Exemplo de uso
Swagger:
- Abrir `/ docs`, localizar rota e clicar em `Try it out`.
- Preencher parâmetros, body e executar.

curl:
${curlExample(method, p, auth[0])}

Postman/Insomnia:
${postmanGuide(method, p, auth[0])}

fetch/axios (frontend):
\`\`\`ts
const res = await fetch('http://192.168.15.21:3000${p.replace('{id}', '1').replace('{resource}', 'pessoas-empresas').replace('{relation}', 'ramos').replace('{event}', 'pedido-criado')}', {
  method: '${m}',
  headers: {
    'Accept': 'application/json',
    ${auth[0] === 'Sim' ? "'Authorization': 'Bearer <ACCESS_TOKEN>'," : ''}
    ${method !== 'get' ? "'Content-Type': 'application/json'" : ''}
  }
});
\`\`\`

### 7. Exemplo de resposta de sucesso
${successExample}

Campos da resposta:
- `data`: payload principal.
- `meta`: paginação/contagem quando aplicável.
- `requestId`: correlação para logs e troubleshooting.

### 8. Possíveis erros
${statusTable(p)}

### 9. Como testar manualmente
- Pré-requisitos: API no ar, banco disponível e (se protegido) token válido.
- Ordem: autenticar (quando necessário) -> executar endpoint -> validar retorno.
- Validar no banco: conferir insert/update/delete em tabelas correspondentes e `updated_at`.
- Observar: `requestId`, status code, tempo de resposta e consistência dos campos.

### 10. Como testar no Swagger
- Abrir `http://192.168.15.21:3000/docs`.
      - Se rota autenticada, usar botão ** Authorize ** com`Bearer <accessToken>`.
- Executar com payload de exemplo e conferir status + response body.

### 11. Como testar via curl
${ curlExample(method, p, auth[0])
  }

### 12. Como testar no Postman / Insomnia
${ postmanGuide(method, p, auth[0]) }

### 13. Critérios de validação
    - Status code esperado para cenário de sucesso.
- `data` com estrutura correta e sem campos sensíveis indevidos.
- Efeito em banco coerente com operação(incluindo soft delete/restauração).
- Logs com `requestId` e sem vazamento de segredo.

### 14. Dependências e observações
${ relationHint }
  - Rate limit global ativo(`@fastify/rate-limit`).
- Soft delete disponível nas entidades com`deleted_at`.
- Auditoria disponível em recursos com`auditEnabled=true`.
`);
  }
}

const content = `# Documentação Técnica Completa da API TAWROS

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
API REST desenvolvida em Node.js + Fastify + TypeScript para atender frontend, integração externa e operações administrativas.

## 2. Tecnologias e Padrões Utilizados
    - Fastify, TypeScript strict, Kysely + pg, JWT, JSON Schema + Zod.
- OpenAPI / Swagger(`/docs` e`/openapi.json`).
- Logs estruturados(Pino), rate limit, helmet, CORS.
- Soft delete, auditoria e integração por`external_source/external_id`.

## 3. URL Base e Ambientes
    - Base local: `http://192.168.15.21:3000`
      - Prefixo funcional: `/api/v1`
        - Docs: `/docs`
          - Contrato: `/openapi.json`

## 4. Autenticação e Autorização
### 4.1 Fluxo de autenticação(obrigatório)
  1. `POST /api/v1/auth/login` -> recebe`accessToken` + `refreshToken`.
2. Usar `Authorization: Bearer <accessToken>` nas rotas protegidas.
3. Quando access expirar, chamar`POST /api/v1/auth/refresh` com`refreshToken`.
4. Para encerrar sessão, `POST /api/v1/auth/logout`.
5. Para revogação explícita autenticada, `POST /api/v1/auth/revoke`.
6. Para perfil corrente, `GET /api/v1/auth/me`.
7. Fluxo de senha: `forgot-password` -> `reset-password`.

### 4.2 Permissões
    - Rota com controle explícito: `GET /api/v1/admin/audit` exige`cadastros.manage`.
- Demais rotas protegidas exigem JWT válido; autorização fina pode ser ampliada por política.

## 5. Padrão de Request e Response
Resposta padrão:
  \`\`\`json
{
  "data": {},
  "meta": {},
  "links": {},
  "error": null,
  "details": null,
  "requestId": "uuid"
}
\`\`\`

## 6. Padrão de Erros
Formato padrão de erro Fastify:
\`\`\`json
{
  "statusCode": 401,
  "code": "UNAUTHORIZED",
  "error": "Unauthorized",
  "message": "Não autenticado"
}
\`\`\`

## 7. Paginação, Filtros, Ordenação e Include
### 7.1 Padrão suportado
- `page`, `limit`, `sort`, `order`, `q`, `fields`, `include`, `withDeleted`, `externalSource`, `externalId`.
- Filtros compostos via parser central (`filter - parser`) para campos permitidos por recurso.

### 7.2 Exemplos
\`\`\`bash
curl "https://api.sistema.tawros.com.br/api/v1/pessoas-empresas?page=1&limit=20&sort=id&order=desc&q=acme"
\`\`\`
\`\`\`bash
curl "https://api.sistema.tawros.com.br/api/v1/produtos-servicos?withDeleted=false&externalSource=erp&externalId=A-100"
\`\`\`

## 8. Documentação Endpoint por Endpoint
${endpointBlocks.join('\n')}

## 9. Fluxos de Teste Sugeridos
1. Infra: health/liveness/readiness/version.
2. Auth: login -> me -> refresh -> logout.
3. Cadastros: list -> create -> get by id -> patch -> delete -> restore.
4. Bulk: bulk-create -> bulk-update -> bulk-delete.
5. Integração: push/upsert -> delta -> export.
6. Admin: users/sessions/permissions/audit.

## 10. Cenários de Erro e Validação
- Token ausente/inválido (401).
- Sem permissão (403).
- FK inválida (400/422).
- Violação de unicidade (409).
- Limite de taxa (429).
- Banco indisponível (readiness 503).

## 11. Roteiro de Testes Manuais
- Preparar usuário admin seed.
- Capturar token via login.
- Validar rotas protegidas com e sem token.
- Validar efeitos no banco após CRUD/bulk.
- Validar logs com `requestId`.

## 12. Exemplos Prontos para Swagger / CURL / Postman
- Swagger: usar `/ docs`, botão **Authorize** e executar `Try it out`.
- CURL: usar exemplos por endpoint acima.
- Postman: importar `openapi.json` e configurar variável `{ { baseUrl } } `.

## 13. Checklist Final de Validação
- [ ] Todos endpoints do OpenAPI cobertos no documento.
- [ ] Fluxo de autenticação validado ponta a ponta.
- [ ] CRUD + bulk + restore validados.
- [ ] Integrações e exportações validadas.
- [ ] Auditoria e permissões verificadas.
- [ ] Erros esperados documentados e reproduzíveis.

## 14. Tabela Resumo Geral dos Endpoints
| módulo | método | rota | finalidade | autenticação | permissão | observação |
|---|---|---|---|---|---|---|
${endpointRows.join('\n')}

## 15. Matriz de Testes
| endpoint | cenário | entrada | resultado esperado | status code esperado |
|---|---|---|---|---|
| /api/v1/auth/login | Login válido | email+senha corretos | Retorna access/refresh token | 200 |
| /api/v1/auth/login | Login inválido | senha errada | Retorna erro de credencial | 401 |
| /api/v1/users | Sem token | header ausente | Não autenticado | 401 |
| /api/v1/users | Com token | Authorization Bearer | Lista paginada de usuários | 200 |
| /api/v1/pessoas-empresas | Criar válido | payload mínimo válido | Registro criado | 201 |
| /api/v1/pessoas-empresas/{id} | Deletar e restaurar | id existente | Soft delete e restore funcionam | 200 |
| /api/v1/integrations/{resource}/upsert | Upsert externo | external_source + external_id | Cria/atualiza idempotente | 200 |
| /api/v1/admin/audit | Sem permissão | token sem scope | Acesso negado | 403 |
| /api/v1/readiness | Banco fora | indisponibilidade DB | ready=false | 503 |

## 16. Ordem Recomendada de Teste
1. `POST / api / v1 / auth / login`
2. `GET / api / v1 / auth / me`
3. `GET / api / v1 / users`
4. `GET / api / v1 / pessoas - empresas`
5. `POST / api / v1 / pessoas - empresas`
6. `PATCH / api / v1 / pessoas - empresas / { id }`
7. `GET / api / v1 / pessoas - empresas / { id }`
8. `DELETE / api / v1 / pessoas - empresas / { id }`
9. `POST / api / v1 / pessoas - empresas / { id } / restore`
10. `POST / api / v1 / pessoas - empresas / bulk - create`
11. `PATCH / api / v1 / pessoas - empresas / bulk - update`
12. `DELETE / api / v1 / pessoas - empresas / bulk - delete `
13. `GET / api / v1 / search / global ? q =...`
14. `GET / api / v1 /export/{resource}?format=csv`
  15. `POST /api/v1/integrations/{resource}/upsert`
  16. `GET /api/v1/admin/audit`
  17. `POST /api/v1/auth/refresh`
  18. `POST /api/v1/auth/logout`
`;

const out = path.join(root, 'backend-api', 'docs', 'API_DOCUMENTACAO_COMPLETA.md');
fs.writeFileSync(out, content, 'utf8');
console.log(`Gerado: ${ out } `);
console.log(`Total de endpoints documentados: ${ endpointRows.length } `);
