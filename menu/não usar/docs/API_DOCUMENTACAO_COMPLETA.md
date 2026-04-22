# Documentação Técnica Completa da API TAWROS

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
API REST em Fastify/TypeScript para cadastros, autenticação, integrações e administração.

## 2. Tecnologias e Padrões Utilizados
- Node.js, Fastify, TypeScript strict, Kysely + PostgreSQL.
- JSON Schema + Zod, JWT, Pino, Swagger/OpenAPI.
- Rate limit, CORS, Helmet, soft delete, auditoria.

## 3. URL Base e Ambientes
- Local: `http://192.168.15.21:3000`
- Prefixo: `/api/v1`
- Swagger: `/docs`
- OpenAPI: `/openapi.json`

## 4. Autenticação e Autorização
Fluxo: login -> bearer -> refresh -> logout/revoke -> me.

## 5. Padrão de Request e Response
```json
{ "data": {}, "meta": {}, "requestId": "uuid" }
```

## 6. Padrão de Erros
```json
{ "statusCode": 401, "code": "UNAUTHORIZED", "message": "Não autenticado" }
```

## 7. Paginação, Filtros, Ordenação e Include
- `page`, `limit`, `sort`, `order`, `q`, `fields`, `include`, `withDeleted`, `externalSource`, `externalId`.

## 8. Documentação Endpoint por Endpoint

# [Admin]
## [GET] /api/v1/admin/audit

### 1. Finalidade
- Consulta de auditoria.
- Quando usar: Consulta de auditoria.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: cadastros.manage
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/admin/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/admin/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Admin]
## [GET] /api/v1/admin/errors

### 1. Finalidade
- Operação administrativa.
- Quando usar: Operação administrativa.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/admin/errors' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/admin/errors' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Admin]
## [GET] /api/v1/admin/metrics

### 1. Finalidade
- Operação administrativa.
- Quando usar: Operação administrativa.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/admin/metrics' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/admin/metrics' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Admin]
## [GET] /api/v1/admin/permissions

### 1. Finalidade
- Operação administrativa.
- Quando usar: Operação administrativa.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/admin/permissions' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/admin/permissions' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Admin]
## [GET] /api/v1/admin/sessions

### 1. Finalidade
- Operação administrativa.
- Quando usar: Operação administrativa.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/admin/sessions' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/admin/sessions' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Admin]
## [GET] /api/v1/admin/users

### 1. Finalidade
- Operação administrativa.
- Quando usar: Operação administrativa.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/admin/users' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/admin/users' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Auth]
## [POST] /api/v1/auth/change-password

### 1. Finalidade
- Troca de senha.
- Quando usar: Troca senha com validação da senha atual
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "currentPassword": "SenhaAtual123", "newPassword": "NovaSenha@123" }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/change-password' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/change-password' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Auth]
## [POST] /api/v1/auth/forgot-password

### 1. Finalidade
- Solicitação de reset de senha.
- Quando usar: Solicita reset por e-mail, CPF ou celular
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? não
- tipo de autenticação: N/A
- perfil/role/permissão necessária: N/A
- observações de segurança: Rota pública com rate limit.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "email": "usuario@dominio.com" }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/forgot-password' -H 'accept: application/json'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/forgot-password' -H 'accept: application/json'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Auth]
## [POST] /api/v1/auth/login

### 1. Finalidade
- Login e emissão de tokens.
- Quando usar: Login com e-mail e senha
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? não
- tipo de autenticação: N/A
- perfil/role/permissão necessária: N/A
- observações de segurança: Rota pública com rate limit.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Obrigatórios: email, password.
```json
{ "email": "admin@tawros.local", "password": "Admin@123" }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/login' -H 'accept: application/json'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": { "accessToken": "<jwt>", "refreshToken": "<refresh>", "user": { "id": "1", "email": "admin@tawros.local" } }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/login' -H 'accept: application/json'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Auth]
## [POST] /api/v1/auth/logout

### 1. Finalidade
- Revogação de refresh token.
- Quando usar: Revoga refresh token
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? não
- tipo de autenticação: N/A
- perfil/role/permissão necessária: N/A
- observações de segurança: Rota pública com rate limit.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "refreshToken": "<token>" }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/logout' -H 'accept: application/json'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/logout' -H 'accept: application/json'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Auth]
## [GET] /api/v1/auth/me

### 1. Finalidade
- Dados do usuário autenticado.
- Quando usar: Dados do usuario autenticado
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/me' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/me' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Auth]
## [POST] /api/v1/auth/refresh

### 1. Finalidade
- Renovação de access token.
- Quando usar: Renova access token usando refresh token
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? não
- tipo de autenticação: N/A
- perfil/role/permissão necessária: N/A
- observações de segurança: Rota pública com rate limit.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "refreshToken": "<token>" }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/refresh' -H 'accept: application/json'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/refresh' -H 'accept: application/json'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Auth]
## [POST] /api/v1/auth/reset-password

### 1. Finalidade
- Reset de senha com token.
- Quando usar: Reset de senha com token
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? não
- tipo de autenticação: N/A
- perfil/role/permissão necessária: N/A
- observações de segurança: Rota pública com rate limit.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "token": "<token-reset>", "newPassword": "SenhaNova@123" }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/reset-password' -H 'accept: application/json'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/reset-password' -H 'accept: application/json'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Auth]
## [POST] /api/v1/auth/revoke

### 1. Finalidade
- Revogação autenticada.
- Quando usar: Revoga refresh token (admin/user autenticado)
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "refreshToken": "<token>" }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/revoke' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/auth/revoke' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/categorias-pessoa-empresa

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar categorias-pessoa-empresa
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/categorias-pessoa-empresa

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar categorias-pessoa-empresa
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/categorias-pessoa-empresa/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar categorias-pessoa-empresa
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/categorias-pessoa-empresa/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar categorias-pessoa-empresa
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/categorias-pessoa-empresa/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial categorias-pessoa-empresa
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/categorias-pessoa-empresa/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir categorias-pessoa-empresa
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/categorias-pessoa-empresa/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de categorias-pessoa-empresa
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/categorias-pessoa-empresa/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de categorias-pessoa-empresa
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/categorias-pessoa-empresa/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar categorias-pessoa-empresa
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/categorias-pessoa-empresa/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote categorias-pessoa-empresa
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/categorias-pessoa-empresa/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote categorias-pessoa-empresa
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/categorias-pessoa-empresa/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote categorias-pessoa-empresa
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/categorias-pessoa-empresa/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote categorias-pessoa-empresa
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/categorias-pessoa-empresa/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar categorias-pessoa-empresa por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/categorias-pessoa-empresa/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/classificacao-categorias

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar classificacao-categorias
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/classificacao-categorias

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar classificacao-categorias
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/classificacao-categorias/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar classificacao-categorias
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/classificacao-categorias/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar classificacao-categorias
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/classificacao-categorias/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial classificacao-categorias
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/classificacao-categorias/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir classificacao-categorias
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/classificacao-categorias/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de classificacao-categorias
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/classificacao-categorias/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de classificacao-categorias
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/classificacao-categorias/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar classificacao-categorias
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/classificacao-categorias/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote classificacao-categorias
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/classificacao-categorias/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote classificacao-categorias
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/classificacao-categorias/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote classificacao-categorias
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/classificacao-categorias/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote classificacao-categorias
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/classificacao-categorias/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar classificacao-categorias por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-categorias/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/classificacao-classes

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar classificacao-classes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/classificacao-classes

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar classificacao-classes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/classificacao-classes/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar classificacao-classes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/classificacao-classes/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar classificacao-classes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/classificacao-classes/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial classificacao-classes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/classificacao-classes/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir classificacao-classes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/classificacao-classes/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de classificacao-classes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/classificacao-classes/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de classificacao-classes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/classificacao-classes/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar classificacao-classes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/classificacao-classes/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote classificacao-classes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/classificacao-classes/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote classificacao-classes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/classificacao-classes/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote classificacao-classes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/classificacao-classes/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote classificacao-classes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/classificacao-classes/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar classificacao-classes por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-classes/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/classificacao-grupos

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar classificacao-grupos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/classificacao-grupos

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar classificacao-grupos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/classificacao-grupos/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar classificacao-grupos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/classificacao-grupos/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar classificacao-grupos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/classificacao-grupos/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial classificacao-grupos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/classificacao-grupos/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir classificacao-grupos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/classificacao-grupos/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de classificacao-grupos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/classificacao-grupos/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de classificacao-grupos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/classificacao-grupos/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar classificacao-grupos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/classificacao-grupos/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote classificacao-grupos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/classificacao-grupos/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote classificacao-grupos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/classificacao-grupos/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote classificacao-grupos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/classificacao-grupos/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote classificacao-grupos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/classificacao-grupos/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar classificacao-grupos por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/classificacao-grupos/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/embalagens

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar embalagens
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/embalagens

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar embalagens
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/embalagens/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar embalagens
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/embalagens/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar embalagens
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/embalagens/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial embalagens
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/embalagens/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir embalagens
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/embalagens/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de embalagens
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/embalagens/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de embalagens
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/embalagens/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar embalagens
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/embalagens/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote embalagens
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/embalagens/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote embalagens
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/embalagens/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote embalagens
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/embalagens/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote embalagens
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/embalagens/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar embalagens por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/embalagens/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Export]
## [GET] /api/v1/export/{resource}

### 1. Finalidade
- Exportação em csv/json.
- Quando usar: Exporta entidade em CSV/JSON
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| resource | string | sim | Recurso alvo | pessoas-empresas |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| format | string | não | Formato de exportação | csv/json | csv |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/export/pessoas-empresas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/export/pessoas-empresas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/fabricantes

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/fabricantes

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/fabricantes/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/fabricantes/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/fabricantes/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/fabricantes/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/fabricantes/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/fabricantes/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/fabricantes/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/fabricantes/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/fabricantes/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/fabricantes/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/fabricantes/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/fabricantes/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar fabricantes por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/fabricantes/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/grupos-empresariais

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar grupos-empresariais
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/grupos-empresariais

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar grupos-empresariais
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/grupos-empresariais/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar grupos-empresariais
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/grupos-empresariais/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar grupos-empresariais
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/grupos-empresariais/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial grupos-empresariais
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/grupos-empresariais/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir grupos-empresariais
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/grupos-empresariais/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de grupos-empresariais
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/grupos-empresariais/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de grupos-empresariais
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/grupos-empresariais/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar grupos-empresariais
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/grupos-empresariais/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote grupos-empresariais
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/grupos-empresariais/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote grupos-empresariais
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/grupos-empresariais/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote grupos-empresariais
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/grupos-empresariais/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote grupos-empresariais
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/grupos-empresariais/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar grupos-empresariais por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/grupos-empresariais/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Infra]
## [GET] /api/v1/health

### 1. Finalidade
- Healthcheck simples da API.
- Quando usar: Healthcheck simples da API.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? não
- tipo de autenticação: N/A
- perfil/role/permissão necessária: N/A
- observações de segurança: Rota pública com rate limit.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/health' -H 'accept: application/json'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/health' -H 'accept: application/json'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Integrations]
## [GET] /api/v1/integrations/{resource}/delta

### 1. Finalidade
- Consulta delta por timestamp.
- Quando usar: Consulta delta por timestamp.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| resource | string | sim | Recurso alvo | pessoas-empresas |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| since | string | sim | Timestamp inicial | ISO 8601 | 2026-03-01T00:00:00Z |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/pessoas-empresas/delta' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/pessoas-empresas/delta' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Integrations]
## [GET] /api/v1/integrations/{resource}/pull

### 1. Finalidade
- Pull para integração.
- Quando usar: Pull para integração.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| resource | string | sim | Recurso alvo | pessoas-empresas |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/pessoas-empresas/pull' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/pessoas-empresas/pull' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Integrations]
## [POST] /api/v1/integrations/{resource}/push

### 1. Finalidade
- Push de integração.
- Quando usar: Push de integração.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| resource | string | sim | Recurso alvo | pessoas-empresas |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/pessoas-empresas/push' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/pessoas-empresas/push' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Integrations]
## [POST] /api/v1/integrations/{resource}/upsert

### 1. Finalidade
- Upsert idempotente por external ids.
- Quando usar: Upsert idempotente por external ids.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| resource | string | sim | Recurso alvo | pessoas-empresas |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/pessoas-empresas/upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/pessoas-empresas/upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Integrations]
## [GET] /api/v1/integrations/export/{resource}

### 1. Finalidade
- Exportação em csv/json.
- Quando usar: Exportação em csv/json.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| resource | string | sim | Recurso alvo | pessoas-empresas |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/export/pessoas-empresas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/export/pessoas-empresas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Integrations]
## [POST] /api/v1/integrations/import/{resource}

### 1. Finalidade
- Importação em lote.
- Quando usar: Importação em lote.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| resource | string | sim | Recurso alvo | pessoas-empresas |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/import/pessoas-empresas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/import/pessoas-empresas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Integrations]
## [GET] /api/v1/integrations/status

### 1. Finalidade
- Status das integrações.
- Quando usar: Status das integrações.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/status' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/status' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Integrations]
## [POST] /api/v1/integrations/webhooks/{event}

### 1. Finalidade
- Recepção de webhooks.
- Quando usar: Recepção de webhooks.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? não
- tipo de autenticação: N/A
- perfil/role/permissão necessária: N/A
- observações de segurança: Rota pública com rate limit.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| event | string | sim | Evento do webhook | pedido-criado |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/webhooks/pedido-criado' -H 'accept: application/json'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/integrations/webhooks/pedido-criado' -H 'accept: application/json'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Infra]
## [GET] /api/v1/liveness

### 1. Finalidade
- Liveness do processo.
- Quando usar: Liveness do processo.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? não
- tipo de autenticação: N/A
- perfil/role/permissão necessária: N/A
- observações de segurança: Rota pública com rate limit.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/liveness' -H 'accept: application/json'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/liveness' -H 'accept: application/json'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Lookups]
## [GET] /api/v1/lookups/{resource}

### 1. Finalidade
- Lookup para combos/autocomplete.
- Quando usar: Lookup simples por recurso
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| resource | string | sim | Recurso alvo | pessoas-empresas |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/lookups/pessoas-empresas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/lookups/pessoas-empresas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/marcas

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/marcas

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/marcas/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/marcas/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/marcas/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/marcas/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/marcas/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/marcas/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/marcas/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/marcas/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/marcas/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/marcas/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/marcas/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/marcas/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar marcas por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/marcas/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/permissions

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar permissions
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/permissions

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar permissions
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/permissions/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar permissions
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/permissions/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar permissions
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/permissions/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial permissions
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/permissions/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir permissions
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/permissions/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de permissions
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/permissions/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de permissions
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/permissions/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar permissions
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/permissions/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote permissions
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/permissions/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote permissions
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/permissions/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote permissions
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/permissions/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote permissions
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/permissions/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar permissions por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/permissions/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/pessoas-empresas

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar pessoas-empresas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/pessoas-empresas

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar pessoas-empresas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/pessoas-empresas/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar pessoas-empresas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/pessoas-empresas/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar pessoas-empresas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/pessoas-empresas/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial pessoas-empresas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/pessoas-empresas/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir pessoas-empresas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/pessoas-empresas/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de pessoas-empresas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/pessoas-empresas/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de pessoas-empresas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/pessoas-empresas/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar pessoas-empresas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/pessoas-empresas/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote pessoas-empresas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/pessoas-empresas/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote pessoas-empresas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/pessoas-empresas/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote pessoas-empresas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/pessoas-empresas/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote pessoas-empresas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/pessoas-empresas/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar pessoas-empresas por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/pessoas-empresas-ramos

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar pessoas-empresas-ramos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/pessoas-empresas-ramos

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar pessoas-empresas-ramos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/pessoas-empresas-ramos/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar pessoas-empresas-ramos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/pessoas-empresas-ramos/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar pessoas-empresas-ramos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/pessoas-empresas-ramos/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial pessoas-empresas-ramos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/pessoas-empresas-ramos/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir pessoas-empresas-ramos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/pessoas-empresas-ramos/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de pessoas-empresas-ramos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/pessoas-empresas-ramos/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de pessoas-empresas-ramos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/pessoas-empresas-ramos/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar pessoas-empresas-ramos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/pessoas-empresas-ramos/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote pessoas-empresas-ramos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/pessoas-empresas-ramos/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote pessoas-empresas-ramos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/pessoas-empresas-ramos/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote pessoas-empresas-ramos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/pessoas-empresas-ramos/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote pessoas-empresas-ramos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/pessoas-empresas-ramos/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar pessoas-empresas-ramos por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/pessoas-empresas-ramos/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/produtos-servicos

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar produtos-servicos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/produtos-servicos

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar produtos-servicos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/produtos-servicos/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar produtos-servicos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/produtos-servicos/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar produtos-servicos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/produtos-servicos/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial produtos-servicos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/produtos-servicos/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir produtos-servicos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/produtos-servicos/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de produtos-servicos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/produtos-servicos/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de produtos-servicos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/produtos-servicos/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar produtos-servicos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/produtos-servicos/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote produtos-servicos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/produtos-servicos/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote produtos-servicos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/produtos-servicos/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote produtos-servicos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/produtos-servicos/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote produtos-servicos
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/produtos-servicos/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar produtos-servicos por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/produtos-servicos-fabricantes

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar produtos-servicos-fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/produtos-servicos-fabricantes

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar produtos-servicos-fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/produtos-servicos-fabricantes/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar produtos-servicos-fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/produtos-servicos-fabricantes/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar produtos-servicos-fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/produtos-servicos-fabricantes/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial produtos-servicos-fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/produtos-servicos-fabricantes/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir produtos-servicos-fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/produtos-servicos-fabricantes/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de produtos-servicos-fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/produtos-servicos-fabricantes/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de produtos-servicos-fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/produtos-servicos-fabricantes/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar produtos-servicos-fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/produtos-servicos-fabricantes/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote produtos-servicos-fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/produtos-servicos-fabricantes/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote produtos-servicos-fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/produtos-servicos-fabricantes/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote produtos-servicos-fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/produtos-servicos-fabricantes/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote produtos-servicos-fabricantes
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/produtos-servicos-fabricantes/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar produtos-servicos-fabricantes por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-fabricantes/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/produtos-servicos-marcas

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar produtos-servicos-marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/produtos-servicos-marcas

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar produtos-servicos-marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/produtos-servicos-marcas/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar produtos-servicos-marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/produtos-servicos-marcas/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar produtos-servicos-marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/produtos-servicos-marcas/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial produtos-servicos-marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/produtos-servicos-marcas/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir produtos-servicos-marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/produtos-servicos-marcas/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de produtos-servicos-marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/produtos-servicos-marcas/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de produtos-servicos-marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/produtos-servicos-marcas/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar produtos-servicos-marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/produtos-servicos-marcas/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote produtos-servicos-marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/produtos-servicos-marcas/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote produtos-servicos-marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/produtos-servicos-marcas/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote produtos-servicos-marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/produtos-servicos-marcas/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote produtos-servicos-marcas
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/produtos-servicos-marcas/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar produtos-servicos-marcas por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/produtos-servicos-marcas/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/ramos-atividade

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar ramos-atividade
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/ramos-atividade

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar ramos-atividade
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/ramos-atividade/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar ramos-atividade
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/ramos-atividade/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar ramos-atividade
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/ramos-atividade/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial ramos-atividade
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/ramos-atividade/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir ramos-atividade
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/ramos-atividade/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de ramos-atividade
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/ramos-atividade/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de ramos-atividade
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/ramos-atividade/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar ramos-atividade
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/ramos-atividade/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote ramos-atividade
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/ramos-atividade/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote ramos-atividade
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/ramos-atividade/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote ramos-atividade
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/ramos-atividade/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote ramos-atividade
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/ramos-atividade/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar ramos-atividade por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/ramos-atividade/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Infra]
## [GET] /api/v1/readiness

### 1. Finalidade
- Readiness com validação de banco.
- Quando usar: Readiness com validação de banco.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? não
- tipo de autenticação: N/A
- perfil/role/permissão necessária: N/A
- observações de segurança: Rota pública com rate limit.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/readiness' -H 'accept: application/json'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/readiness' -H 'accept: application/json'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/roles

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar roles
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/roles

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar roles
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/roles/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar roles
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/roles/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar roles
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/roles/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial roles
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/roles/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir roles
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/roles/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de roles
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/roles/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de roles
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/roles/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar roles
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/roles/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote roles
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/roles/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote roles
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/roles/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote roles
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/roles/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote roles
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/roles/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar roles por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/roles/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Search]
## [GET] /api/v1/search/global

### 1. Finalidade
- Busca textual global.
- Quando usar: Busca global em entidades centrais
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| q | string | sim | Texto de busca | mínimo 2 chars | fertilizante |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/search/global' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/search/global' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/setores

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar setores
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/setores

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar setores
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/setores/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar setores
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/setores/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar setores
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/setores/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial setores
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/setores/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir setores
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/setores/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de setores
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/setores/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de setores
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/setores/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar setores
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/setores/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote setores
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/setores/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote setores
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/setores/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote setores
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/setores/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote setores
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/setores/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar setores por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/setores/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/unidades-medida

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar unidades-medida
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/unidades-medida

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar unidades-medida
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/unidades-medida/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar unidades-medida
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/unidades-medida/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar unidades-medida
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/unidades-medida/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial unidades-medida
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/unidades-medida/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir unidades-medida
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/unidades-medida/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de unidades-medida
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/unidades-medida/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de unidades-medida
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/unidades-medida/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar unidades-medida
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/unidades-medida/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote unidades-medida
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/unidades-medida/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote unidades-medida
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/unidades-medida/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote unidades-medida
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/unidades-medida/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote unidades-medida
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/unidades-medida/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar unidades-medida por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/unidades-medida/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/users

### 1. Finalidade
- Listagem paginada.
- Quando usar: Listar users
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/users' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/users' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/users

### 1. Finalidade
- Criação de registro.
- Quando usar: Criar users
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/users' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/users' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/users/{id}

### 1. Finalidade
- Consulta por id.
- Quando usar: Detalhar users
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PUT] /api/v1/users/{id}

### 1. Finalidade
- Atualização completa.
- Quando usar: Atualizar users
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PUT' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/users/{id}

### 1. Finalidade
- Atualização parcial.
- Quando usar: Atualização parcial users
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/users/{id}

### 1. Finalidade
- Exclusão lógica.
- Quando usar: Excluir users
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/1' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/users/{id}/{relation}

### 1. Finalidade
- Consulta sub-relação.
- Quando usar: Listar relação de users
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |
| relation | string | sim | Relação do recurso | ramos |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/1/ramos' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/users/{id}/audit

### 1. Finalidade
- Consulta auditoria por registro.
- Quando usar: Auditoria de users
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/1/audit' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/users/{id}/restore

### 1. Finalidade
- Restauração de soft delete.
- Quando usar: Restaurar users
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| id | string | sim | Identificador do registro | 1 |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "codigo": "COD-001", "nome": "Exemplo", "ativo": true }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/1/restore' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/users/bulk-create

### 1. Finalidade
- Criação em lote.
- Quando usar: Criação em lote users
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/bulk-create' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [DELETE] /api/v1/users/bulk-delete

### 1. Finalidade
- Exclusão em lote.
- Quando usar: Exclusão em lote users
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
{ "ids": [1,2,3] }
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'DELETE' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/bulk-delete' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [PATCH] /api/v1/users/bulk-update

### 1. Finalidade
- Atualização em lote.
- Quando usar: Atualização em lote users
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "id": 1, "data": { "nome": "Novo Nome" } } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'PATCH' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/bulk-update' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [POST] /api/v1/users/bulk-upsert

### 1. Finalidade
- Upsert em lote.
- Quando usar: Upsert em lote users
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
```json
[ { "codigo": "COD-001", "nome": "Item 1" } ]
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'POST' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/bulk-upsert' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Entidades]
## [GET] /api/v1/users/by-external

### 1. Finalidade
- Consulta por externalSource/externalId.
- Quando usar: Buscar users por external
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? sim
- tipo de autenticação: Bearer JWT
- perfil/role/permissão necessária: JWT válido
- observações de segurança: Usar Authorization: Bearer <token>.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| externalSource | string | sim | Origem externa | texto | erp |
| externalId | string | sim | ID externo | texto | A-100 |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/users/by-external' -H 'accept: application/json' -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Infra]
## [GET] /api/v1/version

### 1. Finalidade
- Versão da API.
- Quando usar: Versão da API.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? não
- tipo de autenticação: N/A
- perfil/role/permissão necessária: N/A
- observações de segurança: Rota pública com rate limit.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| page | integer | não | Página | >=1 | 1 |
| limit | integer | não | Limite por página | 1..200 | 20 |
| sort | string | não | Campo de ordenação | whitelist por recurso | id |
| order | string | não | Ordem | asc/desc | desc |
| q | string | não | Busca textual | mínimo 2 chars | acme |
| withDeleted | boolean | não | Inclui excluídos logicamente | true/false | false |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/version' -H 'accept: application/json'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'https://api.sistemas.tawros.com.br:3000/api/v1/version' -H 'accept: application/json'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

# [Infra]
## [GET] /openapi.json

### 1. Finalidade
- Contrato OpenAPI.
- Quando usar: Contrato OpenAPI.
- Fluxo/tela: frontend cadastros para entidades; técnico para auth/infra/integrations/admin.

### 2. Autenticação e permissão
- exige autenticação? não
- tipo de autenticação: N/A
- perfil/role/permissão necessária: N/A
- observações de segurança: Rota pública com rate limit.

### 3. Parâmetros de rota
| nome | tipo | obrigatório | descrição | exemplo |
|---|---|---|---|---|
| - | - | não | Sem parâmetros de rota | - |

### 4. Query params
| nome | tipo | obrigatório | descrição | valores aceitos | exemplo |
|---|---|---|---|---|---|
| - | - | não | Sem query params relevantes | - | - |

### 5. Body da requisição
- Sem body obrigatório.
```json
{}
```

### 6. Exemplo de uso
Swagger: /docs -> Try it out -> Execute.
curl:
```bash
curl -X 'GET' 'http://192.168.15.21:3000/openapi.json' -H 'accept: application/json'
```
Postman/Insomnia: método + URL + headers + body conforme seções.

### 7. Exemplo de resposta de sucesso
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }, "requestId": "<uuid>" }
```

### 8. Possíveis erros
| status code | motivo | quando acontece | exemplo de resposta de erro |
|---|---|---|---|
| 400 | Payload inválido | Campo/formato inválido | `{"statusCode":400}` |
| 401 | Não autenticado | Token ausente/inválido | `{"statusCode":401}` |
| 403 | Sem permissão | Falta de escopo | `{"statusCode":403}` |
| 404 | Não encontrado | ID/recurso inexistente | `{"statusCode":404}` |
| 409 | Conflito | Violação de unicidade | `{"statusCode":409}` |
| 422 | Regra inválida | CHECK/regra de negócio | `{"statusCode":422}` |
| 429 | Rate limit | Excesso de requisições | `{"statusCode":429}` |
| 500 | Erro interno | Falha inesperada | `{"statusCode":500}` |

### 9. Como testar manualmente
- Validar pré-requisitos (API/banco/token).
- Executar requisição e conferir status/response.
- Validar efeito no banco para operações mutáveis.

### 10. Como testar no Swagger
- Abrir /docs; autorizar Bearer quando necessário; executar.

### 11. Como testar via curl
```bash
curl -X 'GET' 'http://192.168.15.21:3000/openapi.json' -H 'accept: application/json'
```

### 12. Como testar no Postman/Insomnia
- Método, URL, headers, auth e body conforme acima.

### 13. Critérios de validação
- Status esperado, schema esperado, sem dados sensíveis indevidos.
- Persistência correta (quando aplicável).

### 14. Dependências e observações
- Pode depender de token, dados prévios e constraints do banco.
- Rate limit ativo; soft delete e auditoria onde aplicável.

## 9. Fluxos de Teste Sugeridos
1. health/readiness/liveness/version
2. auth login/me/refresh/logout
3. CRUD de entidades
4. operações em lote
5. integrações e exportações
6. admin e auditoria

## 10. Cenários de Erro e Validação
- 400, 401, 403, 404, 409, 422, 429, 500 conforme endpoint.

## 11. Roteiro de Testes Manuais
- Login, token, chamadas protegidas, validação de banco e logs.

## 12. Exemplos Prontos para Swagger / CURL / Postman
- Ver seção de cada endpoint.

## 13. Checklist Final de Validação
- [ ] Todos endpoints cobertos
- [ ] Fluxo de auth validado
- [ ] CRUD/bulk/integrações validados

## 14. Tabela Resumo Geral dos Endpoints
| módulo | método | rota | finalidade | autenticação | permissão | observação |
|---|---|---|---|---|---|---|
| Admin | GET | /api/v1/admin/audit | Consulta de auditoria. | Bearer | cadastros.manage | - |
| Admin | GET | /api/v1/admin/errors | Operação administrativa. | Bearer | JWT válido | - |
| Admin | GET | /api/v1/admin/metrics | Operação administrativa. | Bearer | JWT válido | - |
| Admin | GET | /api/v1/admin/permissions | Operação administrativa. | Bearer | JWT válido | - |
| Admin | GET | /api/v1/admin/sessions | Operação administrativa. | Bearer | JWT válido | - |
| Admin | GET | /api/v1/admin/users | Operação administrativa. | Bearer | JWT válido | - |
| Auth | POST | /api/v1/auth/change-password | Troca senha com validação da senha atual | Bearer | JWT válido | - |
| Auth | POST | /api/v1/auth/forgot-password | Solicita reset por e-mail, CPF ou celular | Público | N/A | - |
| Auth | POST | /api/v1/auth/login | Login com e-mail e senha | Público | N/A | - |
| Auth | POST | /api/v1/auth/logout | Revoga refresh token | Público | N/A | - |
| Auth | GET | /api/v1/auth/me | Dados do usuario autenticado | Bearer | JWT válido | - |
| Auth | POST | /api/v1/auth/refresh | Renova access token usando refresh token | Público | N/A | - |
| Auth | POST | /api/v1/auth/reset-password | Reset de senha com token | Público | N/A | - |
| Auth | POST | /api/v1/auth/revoke | Revoga refresh token (admin/user autenticado) | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/categorias-pessoa-empresa | Listar categorias-pessoa-empresa | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/categorias-pessoa-empresa | Criar categorias-pessoa-empresa | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/categorias-pessoa-empresa/{id} | Detalhar categorias-pessoa-empresa | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/categorias-pessoa-empresa/{id} | Atualizar categorias-pessoa-empresa | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/categorias-pessoa-empresa/{id} | Atualização parcial categorias-pessoa-empresa | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/categorias-pessoa-empresa/{id} | Excluir categorias-pessoa-empresa | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/categorias-pessoa-empresa/{id}/{relation} | Listar relação de categorias-pessoa-empresa | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/categorias-pessoa-empresa/{id}/audit | Auditoria de categorias-pessoa-empresa | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/categorias-pessoa-empresa/{id}/restore | Restaurar categorias-pessoa-empresa | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/categorias-pessoa-empresa/bulk-create | Criação em lote categorias-pessoa-empresa | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/categorias-pessoa-empresa/bulk-delete | Exclusão em lote categorias-pessoa-empresa | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/categorias-pessoa-empresa/bulk-update | Atualização em lote categorias-pessoa-empresa | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/categorias-pessoa-empresa/bulk-upsert | Upsert em lote categorias-pessoa-empresa | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/categorias-pessoa-empresa/by-external | Buscar categorias-pessoa-empresa por external | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/classificacao-categorias | Listar classificacao-categorias | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/classificacao-categorias | Criar classificacao-categorias | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/classificacao-categorias/{id} | Detalhar classificacao-categorias | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/classificacao-categorias/{id} | Atualizar classificacao-categorias | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/classificacao-categorias/{id} | Atualização parcial classificacao-categorias | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/classificacao-categorias/{id} | Excluir classificacao-categorias | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/classificacao-categorias/{id}/{relation} | Listar relação de classificacao-categorias | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/classificacao-categorias/{id}/audit | Auditoria de classificacao-categorias | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/classificacao-categorias/{id}/restore | Restaurar classificacao-categorias | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/classificacao-categorias/bulk-create | Criação em lote classificacao-categorias | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/classificacao-categorias/bulk-delete | Exclusão em lote classificacao-categorias | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/classificacao-categorias/bulk-update | Atualização em lote classificacao-categorias | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/classificacao-categorias/bulk-upsert | Upsert em lote classificacao-categorias | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/classificacao-categorias/by-external | Buscar classificacao-categorias por external | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/classificacao-classes | Listar classificacao-classes | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/classificacao-classes | Criar classificacao-classes | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/classificacao-classes/{id} | Detalhar classificacao-classes | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/classificacao-classes/{id} | Atualizar classificacao-classes | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/classificacao-classes/{id} | Atualização parcial classificacao-classes | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/classificacao-classes/{id} | Excluir classificacao-classes | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/classificacao-classes/{id}/{relation} | Listar relação de classificacao-classes | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/classificacao-classes/{id}/audit | Auditoria de classificacao-classes | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/classificacao-classes/{id}/restore | Restaurar classificacao-classes | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/classificacao-classes/bulk-create | Criação em lote classificacao-classes | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/classificacao-classes/bulk-delete | Exclusão em lote classificacao-classes | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/classificacao-classes/bulk-update | Atualização em lote classificacao-classes | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/classificacao-classes/bulk-upsert | Upsert em lote classificacao-classes | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/classificacao-classes/by-external | Buscar classificacao-classes por external | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/classificacao-grupos | Listar classificacao-grupos | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/classificacao-grupos | Criar classificacao-grupos | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/classificacao-grupos/{id} | Detalhar classificacao-grupos | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/classificacao-grupos/{id} | Atualizar classificacao-grupos | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/classificacao-grupos/{id} | Atualização parcial classificacao-grupos | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/classificacao-grupos/{id} | Excluir classificacao-grupos | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/classificacao-grupos/{id}/{relation} | Listar relação de classificacao-grupos | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/classificacao-grupos/{id}/audit | Auditoria de classificacao-grupos | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/classificacao-grupos/{id}/restore | Restaurar classificacao-grupos | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/classificacao-grupos/bulk-create | Criação em lote classificacao-grupos | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/classificacao-grupos/bulk-delete | Exclusão em lote classificacao-grupos | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/classificacao-grupos/bulk-update | Atualização em lote classificacao-grupos | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/classificacao-grupos/bulk-upsert | Upsert em lote classificacao-grupos | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/classificacao-grupos/by-external | Buscar classificacao-grupos por external | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/embalagens | Listar embalagens | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/embalagens | Criar embalagens | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/embalagens/{id} | Detalhar embalagens | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/embalagens/{id} | Atualizar embalagens | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/embalagens/{id} | Atualização parcial embalagens | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/embalagens/{id} | Excluir embalagens | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/embalagens/{id}/{relation} | Listar relação de embalagens | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/embalagens/{id}/audit | Auditoria de embalagens | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/embalagens/{id}/restore | Restaurar embalagens | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/embalagens/bulk-create | Criação em lote embalagens | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/embalagens/bulk-delete | Exclusão em lote embalagens | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/embalagens/bulk-update | Atualização em lote embalagens | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/embalagens/bulk-upsert | Upsert em lote embalagens | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/embalagens/by-external | Buscar embalagens por external | Bearer | JWT válido | - |
| Export | GET | /api/v1/export/{resource} | Exporta entidade em CSV/JSON | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/fabricantes | Listar fabricantes | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/fabricantes | Criar fabricantes | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/fabricantes/{id} | Detalhar fabricantes | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/fabricantes/{id} | Atualizar fabricantes | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/fabricantes/{id} | Atualização parcial fabricantes | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/fabricantes/{id} | Excluir fabricantes | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/fabricantes/{id}/{relation} | Listar relação de fabricantes | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/fabricantes/{id}/audit | Auditoria de fabricantes | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/fabricantes/{id}/restore | Restaurar fabricantes | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/fabricantes/bulk-create | Criação em lote fabricantes | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/fabricantes/bulk-delete | Exclusão em lote fabricantes | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/fabricantes/bulk-update | Atualização em lote fabricantes | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/fabricantes/bulk-upsert | Upsert em lote fabricantes | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/fabricantes/by-external | Buscar fabricantes por external | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/grupos-empresariais | Listar grupos-empresariais | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/grupos-empresariais | Criar grupos-empresariais | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/grupos-empresariais/{id} | Detalhar grupos-empresariais | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/grupos-empresariais/{id} | Atualizar grupos-empresariais | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/grupos-empresariais/{id} | Atualização parcial grupos-empresariais | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/grupos-empresariais/{id} | Excluir grupos-empresariais | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/grupos-empresariais/{id}/{relation} | Listar relação de grupos-empresariais | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/grupos-empresariais/{id}/audit | Auditoria de grupos-empresariais | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/grupos-empresariais/{id}/restore | Restaurar grupos-empresariais | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/grupos-empresariais/bulk-create | Criação em lote grupos-empresariais | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/grupos-empresariais/bulk-delete | Exclusão em lote grupos-empresariais | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/grupos-empresariais/bulk-update | Atualização em lote grupos-empresariais | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/grupos-empresariais/bulk-upsert | Upsert em lote grupos-empresariais | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/grupos-empresariais/by-external | Buscar grupos-empresariais por external | Bearer | JWT válido | - |
| Infra | GET | /api/v1/health | Healthcheck simples da API. | Público | N/A | - |
| Integrations | GET | /api/v1/integrations/{resource}/delta | Consulta delta por timestamp. | Bearer | JWT válido | - |
| Integrations | GET | /api/v1/integrations/{resource}/pull | Pull para integração. | Bearer | JWT válido | - |
| Integrations | POST | /api/v1/integrations/{resource}/push | Push de integração. | Bearer | JWT válido | - |
| Integrations | POST | /api/v1/integrations/{resource}/upsert | Upsert idempotente por external ids. | Bearer | JWT válido | - |
| Integrations | GET | /api/v1/integrations/export/{resource} | Exportação em csv/json. | Bearer | JWT válido | - |
| Integrations | POST | /api/v1/integrations/import/{resource} | Importação em lote. | Bearer | JWT válido | - |
| Integrations | GET | /api/v1/integrations/status | Status das integrações. | Bearer | JWT válido | - |
| Integrations | POST | /api/v1/integrations/webhooks/{event} | Recepção de webhooks. | Público | N/A | - |
| Infra | GET | /api/v1/liveness | Liveness do processo. | Público | N/A | - |
| Lookups | GET | /api/v1/lookups/{resource} | Lookup simples por recurso | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/marcas | Listar marcas | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/marcas | Criar marcas | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/marcas/{id} | Detalhar marcas | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/marcas/{id} | Atualizar marcas | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/marcas/{id} | Atualização parcial marcas | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/marcas/{id} | Excluir marcas | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/marcas/{id}/{relation} | Listar relação de marcas | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/marcas/{id}/audit | Auditoria de marcas | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/marcas/{id}/restore | Restaurar marcas | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/marcas/bulk-create | Criação em lote marcas | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/marcas/bulk-delete | Exclusão em lote marcas | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/marcas/bulk-update | Atualização em lote marcas | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/marcas/bulk-upsert | Upsert em lote marcas | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/marcas/by-external | Buscar marcas por external | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/permissions | Listar permissions | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/permissions | Criar permissions | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/permissions/{id} | Detalhar permissions | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/permissions/{id} | Atualizar permissions | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/permissions/{id} | Atualização parcial permissions | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/permissions/{id} | Excluir permissions | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/permissions/{id}/{relation} | Listar relação de permissions | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/permissions/{id}/audit | Auditoria de permissions | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/permissions/{id}/restore | Restaurar permissions | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/permissions/bulk-create | Criação em lote permissions | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/permissions/bulk-delete | Exclusão em lote permissions | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/permissions/bulk-update | Atualização em lote permissions | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/permissions/bulk-upsert | Upsert em lote permissions | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/permissions/by-external | Buscar permissions por external | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/pessoas-empresas | Listar pessoas-empresas | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/pessoas-empresas | Criar pessoas-empresas | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/pessoas-empresas/{id} | Detalhar pessoas-empresas | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/pessoas-empresas/{id} | Atualizar pessoas-empresas | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/pessoas-empresas/{id} | Atualização parcial pessoas-empresas | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/pessoas-empresas/{id} | Excluir pessoas-empresas | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/pessoas-empresas/{id}/{relation} | Listar relação de pessoas-empresas | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/pessoas-empresas/{id}/audit | Auditoria de pessoas-empresas | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/pessoas-empresas/{id}/restore | Restaurar pessoas-empresas | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/pessoas-empresas/bulk-create | Criação em lote pessoas-empresas | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/pessoas-empresas/bulk-delete | Exclusão em lote pessoas-empresas | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/pessoas-empresas/bulk-update | Atualização em lote pessoas-empresas | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/pessoas-empresas/bulk-upsert | Upsert em lote pessoas-empresas | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/pessoas-empresas/by-external | Buscar pessoas-empresas por external | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/pessoas-empresas-ramos | Listar pessoas-empresas-ramos | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/pessoas-empresas-ramos | Criar pessoas-empresas-ramos | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/pessoas-empresas-ramos/{id} | Detalhar pessoas-empresas-ramos | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/pessoas-empresas-ramos/{id} | Atualizar pessoas-empresas-ramos | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/pessoas-empresas-ramos/{id} | Atualização parcial pessoas-empresas-ramos | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/pessoas-empresas-ramos/{id} | Excluir pessoas-empresas-ramos | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/pessoas-empresas-ramos/{id}/{relation} | Listar relação de pessoas-empresas-ramos | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/pessoas-empresas-ramos/{id}/audit | Auditoria de pessoas-empresas-ramos | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/pessoas-empresas-ramos/{id}/restore | Restaurar pessoas-empresas-ramos | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/pessoas-empresas-ramos/bulk-create | Criação em lote pessoas-empresas-ramos | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/pessoas-empresas-ramos/bulk-delete | Exclusão em lote pessoas-empresas-ramos | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/pessoas-empresas-ramos/bulk-update | Atualização em lote pessoas-empresas-ramos | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/pessoas-empresas-ramos/bulk-upsert | Upsert em lote pessoas-empresas-ramos | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/pessoas-empresas-ramos/by-external | Buscar pessoas-empresas-ramos por external | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/produtos-servicos | Listar produtos-servicos | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/produtos-servicos | Criar produtos-servicos | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/produtos-servicos/{id} | Detalhar produtos-servicos | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/produtos-servicos/{id} | Atualizar produtos-servicos | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/produtos-servicos/{id} | Atualização parcial produtos-servicos | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/produtos-servicos/{id} | Excluir produtos-servicos | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/produtos-servicos/{id}/{relation} | Listar relação de produtos-servicos | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/produtos-servicos/{id}/audit | Auditoria de produtos-servicos | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/produtos-servicos/{id}/restore | Restaurar produtos-servicos | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/produtos-servicos/bulk-create | Criação em lote produtos-servicos | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/produtos-servicos/bulk-delete | Exclusão em lote produtos-servicos | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/produtos-servicos/bulk-update | Atualização em lote produtos-servicos | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/produtos-servicos/bulk-upsert | Upsert em lote produtos-servicos | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/produtos-servicos/by-external | Buscar produtos-servicos por external | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/produtos-servicos-fabricantes | Listar produtos-servicos-fabricantes | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/produtos-servicos-fabricantes | Criar produtos-servicos-fabricantes | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/produtos-servicos-fabricantes/{id} | Detalhar produtos-servicos-fabricantes | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/produtos-servicos-fabricantes/{id} | Atualizar produtos-servicos-fabricantes | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/produtos-servicos-fabricantes/{id} | Atualização parcial produtos-servicos-fabricantes | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/produtos-servicos-fabricantes/{id} | Excluir produtos-servicos-fabricantes | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/produtos-servicos-fabricantes/{id}/{relation} | Listar relação de produtos-servicos-fabricantes | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/produtos-servicos-fabricantes/{id}/audit | Auditoria de produtos-servicos-fabricantes | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/produtos-servicos-fabricantes/{id}/restore | Restaurar produtos-servicos-fabricantes | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/produtos-servicos-fabricantes/bulk-create | Criação em lote produtos-servicos-fabricantes | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/produtos-servicos-fabricantes/bulk-delete | Exclusão em lote produtos-servicos-fabricantes | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/produtos-servicos-fabricantes/bulk-update | Atualização em lote produtos-servicos-fabricantes | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/produtos-servicos-fabricantes/bulk-upsert | Upsert em lote produtos-servicos-fabricantes | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/produtos-servicos-fabricantes/by-external | Buscar produtos-servicos-fabricantes por external | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/produtos-servicos-marcas | Listar produtos-servicos-marcas | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/produtos-servicos-marcas | Criar produtos-servicos-marcas | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/produtos-servicos-marcas/{id} | Detalhar produtos-servicos-marcas | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/produtos-servicos-marcas/{id} | Atualizar produtos-servicos-marcas | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/produtos-servicos-marcas/{id} | Atualização parcial produtos-servicos-marcas | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/produtos-servicos-marcas/{id} | Excluir produtos-servicos-marcas | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/produtos-servicos-marcas/{id}/{relation} | Listar relação de produtos-servicos-marcas | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/produtos-servicos-marcas/{id}/audit | Auditoria de produtos-servicos-marcas | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/produtos-servicos-marcas/{id}/restore | Restaurar produtos-servicos-marcas | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/produtos-servicos-marcas/bulk-create | Criação em lote produtos-servicos-marcas | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/produtos-servicos-marcas/bulk-delete | Exclusão em lote produtos-servicos-marcas | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/produtos-servicos-marcas/bulk-update | Atualização em lote produtos-servicos-marcas | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/produtos-servicos-marcas/bulk-upsert | Upsert em lote produtos-servicos-marcas | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/produtos-servicos-marcas/by-external | Buscar produtos-servicos-marcas por external | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/ramos-atividade | Listar ramos-atividade | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/ramos-atividade | Criar ramos-atividade | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/ramos-atividade/{id} | Detalhar ramos-atividade | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/ramos-atividade/{id} | Atualizar ramos-atividade | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/ramos-atividade/{id} | Atualização parcial ramos-atividade | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/ramos-atividade/{id} | Excluir ramos-atividade | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/ramos-atividade/{id}/{relation} | Listar relação de ramos-atividade | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/ramos-atividade/{id}/audit | Auditoria de ramos-atividade | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/ramos-atividade/{id}/restore | Restaurar ramos-atividade | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/ramos-atividade/bulk-create | Criação em lote ramos-atividade | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/ramos-atividade/bulk-delete | Exclusão em lote ramos-atividade | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/ramos-atividade/bulk-update | Atualização em lote ramos-atividade | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/ramos-atividade/bulk-upsert | Upsert em lote ramos-atividade | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/ramos-atividade/by-external | Buscar ramos-atividade por external | Bearer | JWT válido | - |
| Infra | GET | /api/v1/readiness | Readiness com validação de banco. | Público | N/A | - |
| Entidades | GET | /api/v1/roles | Listar roles | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/roles | Criar roles | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/roles/{id} | Detalhar roles | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/roles/{id} | Atualizar roles | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/roles/{id} | Atualização parcial roles | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/roles/{id} | Excluir roles | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/roles/{id}/{relation} | Listar relação de roles | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/roles/{id}/audit | Auditoria de roles | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/roles/{id}/restore | Restaurar roles | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/roles/bulk-create | Criação em lote roles | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/roles/bulk-delete | Exclusão em lote roles | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/roles/bulk-update | Atualização em lote roles | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/roles/bulk-upsert | Upsert em lote roles | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/roles/by-external | Buscar roles por external | Bearer | JWT válido | - |
| Search | GET | /api/v1/search/global | Busca global em entidades centrais | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/setores | Listar setores | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/setores | Criar setores | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/setores/{id} | Detalhar setores | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/setores/{id} | Atualizar setores | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/setores/{id} | Atualização parcial setores | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/setores/{id} | Excluir setores | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/setores/{id}/{relation} | Listar relação de setores | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/setores/{id}/audit | Auditoria de setores | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/setores/{id}/restore | Restaurar setores | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/setores/bulk-create | Criação em lote setores | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/setores/bulk-delete | Exclusão em lote setores | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/setores/bulk-update | Atualização em lote setores | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/setores/bulk-upsert | Upsert em lote setores | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/setores/by-external | Buscar setores por external | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/unidades-medida | Listar unidades-medida | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/unidades-medida | Criar unidades-medida | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/unidades-medida/{id} | Detalhar unidades-medida | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/unidades-medida/{id} | Atualizar unidades-medida | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/unidades-medida/{id} | Atualização parcial unidades-medida | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/unidades-medida/{id} | Excluir unidades-medida | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/unidades-medida/{id}/{relation} | Listar relação de unidades-medida | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/unidades-medida/{id}/audit | Auditoria de unidades-medida | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/unidades-medida/{id}/restore | Restaurar unidades-medida | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/unidades-medida/bulk-create | Criação em lote unidades-medida | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/unidades-medida/bulk-delete | Exclusão em lote unidades-medida | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/unidades-medida/bulk-update | Atualização em lote unidades-medida | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/unidades-medida/bulk-upsert | Upsert em lote unidades-medida | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/unidades-medida/by-external | Buscar unidades-medida por external | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/users | Listar users | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/users | Criar users | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/users/{id} | Detalhar users | Bearer | JWT válido | - |
| Entidades | PUT | /api/v1/users/{id} | Atualizar users | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/users/{id} | Atualização parcial users | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/users/{id} | Excluir users | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/users/{id}/{relation} | Listar relação de users | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/users/{id}/audit | Auditoria de users | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/users/{id}/restore | Restaurar users | Bearer | JWT válido | Soft delete |
| Entidades | POST | /api/v1/users/bulk-create | Criação em lote users | Bearer | JWT válido | - |
| Entidades | DELETE | /api/v1/users/bulk-delete | Exclusão em lote users | Bearer | JWT válido | - |
| Entidades | PATCH | /api/v1/users/bulk-update | Atualização em lote users | Bearer | JWT válido | - |
| Entidades | POST | /api/v1/users/bulk-upsert | Upsert em lote users | Bearer | JWT válido | - |
| Entidades | GET | /api/v1/users/by-external | Buscar users por external | Bearer | JWT válido | - |
| Infra | GET | /api/v1/version | Versão da API. | Público | N/A | - |
| Infra | GET | /openapi.json | Contrato OpenAPI. | Público | N/A | - |

## 15. Matriz de Testes
| endpoint | cenário | entrada | resultado esperado | status code esperado |
|---|---|---|---|---|
| /api/v1/auth/login | login válido | email/senha corretos | retorna tokens | 200 |
| /api/v1/users | sem token | sem Authorization | não autenticado | 401 |
| /api/v1/users | com token | bearer válido | listagem paginada | 200 |
| /api/v1/pessoas-empresas | create | payload válido | cria registro | 201 |
| /api/v1/pessoas-empresas/{id}/restore | restore | id existente | restaura soft delete | 200 |

## 16. Ordem Recomendada de Teste
1. login
2. obter token
3. auth/me
4. listagem
5. criação
6. atualização
7. consulta por id
8. exclusão
9. restauração
10. bulk operations
11. integrações
12. admin
13. refresh/logout

