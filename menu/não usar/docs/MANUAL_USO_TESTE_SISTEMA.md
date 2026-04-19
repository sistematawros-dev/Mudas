# Manual de Uso, Homologação e Teste do Sistema TAWROS

## Sumário
1. [Visão Geral do Sistema](#1-visão-geral-do-sistema)
2. [Pré-requisitos para Teste](#2-pré-requisitos-para-teste)
3. [Como Acessar o Sistema](#3-como-acessar-o-sistema)
4. [Como Autenticar / Login](#4-como-autenticar--login)
5. [Manual de Teste Tela por Tela](#5-manual-de-teste-tela-por-tela)
6. [Como Testar as Integrações](#6-como-testar-as-integrações)
7. [Como Validar o Resultado na API](#7-como-validar-o-resultado-na-api)
8. [Como Validar o Resultado no Banco](#8-como-validar-o-resultado-no-banco)
9. [Cenários de Erro e Como Identificar](#9-cenários-de-erro-e-como-identificar)
10. [Roteiro de Homologação](#10-roteiro-de-homologação)
11. [Checklist Final de Validação](#11-checklist-final-de-validação)
12. [Tabelas e Matrizes Obrigatórias](#12-tabelas-e-matrizes-obrigatórias)

---

## 1. Visão Geral do Sistema

### Objetivo
O sistema TAWROS permite gestão de autenticação e cadastros centrais (pessoas/empresas, classificação de produtos/serviços, produtos/serviços e embalagens), com persistência no PostgreSQL por API REST.

### Módulos existentes (frontend)
- `Login`
- `Recuperar Senha`
- `Dashboard` (visual, sem persistência na API no estado atual)
- `Cadastros`:
  - Pessoas e Empresas
  - Grupo de Empresas (subaba interna)
  - Produtos e Serviços
  - Classificação
  - Embalagens

### Entidades principais (API/Banco)
- `auth.users`, `auth.user_credentials`, `auth.refresh_tokens`, `auth.password_reset_tokens`
- `app.grupos_empresariais`
- `app.categorias_pessoa_empresa`
- `app.setores`
- `app.ramos_atividade`
- `app.pessoas_empresas`
- `app.pessoas_empresas_ramos`
- `app.classificacao_grupos`
- `app.classificacao_categorias`
- `app.classificacao_classes`
- `app.produtos_servicos`
- `app.embalagens`
- `audit.events`

### Fluxo conceitual
`USUÁRIO -> FRONTEND -> API -> BANCO -> API -> FRONTEND`

Exemplo (criar pessoa/empresa):
1. Usuário preenche formulário em `#/cadastros`.
2. Frontend chama `POST /api/v1/pessoas-empresas`.
3. API valida payload e persiste em `app.pessoas_empresas`.
4. API retorna JSON com `data` + `requestId`.
5. Frontend recarrega lista e mostra o registro criado.

---

## 2. Pré-requisitos para Teste

### Serviços necessários
- Frontend rodando.
- API rodando.
- PostgreSQL rodando e acessível.
- Seeds mínimos aplicados.

### Credenciais padrão
- E-mail: `admin@tawros.local`
- Senha (ambiente atual): `Admin@123`

### Endereços padrão
- Frontend: `http://localhost:5173`
- API: `http://192.168.15.10:3000`
- Swagger: `http://192.168.15.10:3000/docs`
- OpenAPI JSON: `http://192.168.15.10:3000/openapi.json`

### Comandos úteis

#### Frontend
```powershell
cd C:\Users\desen\OneDrive\Documentos\Projeto\FrontEnd\Homologacaoinfo
npm run dev
```

#### API
```powershell
cd C:\Users\desen\OneDrive\Documentos\Projeto\FrontEnd\Homologacaoinfo\backend-api
npm run build
npm run start
```

#### Teste integrado automático (criado)
```powershell
cd C:\Users\desen\OneDrive\Documentos\Projeto\FrontEnd\Homologacaoinfo\backend-api
npm run test:integracao
```

### Como validar que os serviços estão no ar
```powershell
curl http://192.168.15.10:3000/api/v1/health
curl http://192.168.15.10:3000/api/v1/readiness
```
Esperado: HTTP `200` e `data.status = "ok"` (health).

### Acesso ao banco para conferência
```powershell
psql -h localhost -p 5432 -U postgres -d tawros
```

---

## 3. Como Acessar o Sistema

1. Abra `http://localhost:5173`.
2. A rota inicial deve ir para `#/login`.
3. Após login válido, a navegação vai para `#/dashboard`.
4. Para testar cadastros, use o menu e acesse `#/cadastros` ou `#/cadastros/produtos-servicos`.

### Como saber se autenticou corretamente
- `sessionStorage.authToken` deve existir.
- Chamadas autenticadas (`/api/v1/users`, `/api/v1/pessoas-empresas`) devem retornar `200`.
- Sem token, endpoints protegidos devem retornar `401`.

---

## 4. Como Autenticar / Login

### Fluxo
1. `POST /api/v1/auth/login` com e-mail/senha.
2. API retorna:
   - `accessToken`
   - `refreshToken`
   - dados do usuário com `roles` e `permissions`
3. Frontend grava os tokens no `sessionStorage`.

### Exemplo de login (curl)
```bash
curl -X POST "http://192.168.15.10:3000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@tawros.local\",\"password\":\"Admin@123\"}"
```

### Validação
- `status code = 200`
- `data.accessToken` preenchido
- `data.user.email = admin@tawros.local`

---

## 5. Manual de Teste Tela por Tela

## Tela: Login (`#/login`)

### 1. Finalidade da tela
Autenticar usuário para liberar acesso às rotas protegidas.

### 2. Como acessar a tela
- Acesse `#/login`.
- Não exige sessão prévia.

### 3. Elementos da tela
- Campo `loginInput` (e-mail)
- Campo `passwordInput`
- Botão submit
- Botão mostrar/ocultar senha
- Área de erro de campo e erro de formulário

### 4. Passo a passo de uso
1. Informar e-mail válido.
2. Informar senha.
3. Clicar em `Entrar`.

### 5. Cenários de teste da tela
- Login válido.
- E-mail inválido.
- Senha vazia.
- Senha menor que 6 caracteres.
- Usuário/senha inválidos.

### 6. Resultado esperado no frontend
- Sucesso: redireciona para `#/dashboard`.
- Erro: mensagem visível no formulário.

### 7. Resultado esperado na API
- Endpoint: `POST /api/v1/auth/login`
- Body: `{ email, password }`
- Sucesso: `200`
- Erro credencial: `401 INVALID_CREDENTIALS`

### 8. Resultado esperado no banco
- Atualização de `auth.refresh_tokens` (novo token hash)
- Atualização eventual de `auth.users.last_login_at`

### 9. Como conferir no banco
```sql
SELECT id, email, last_login_at
FROM auth.users
WHERE email = 'admin@tawros.local'::citext;

SELECT user_id, created_at, expires_at, revoked_at
FROM auth.refresh_tokens
ORDER BY id DESC
LIMIT 5;
```

### 10. Como identificar erro
- Frontend: mensagem "Credenciais inválidas".
- API: `401`.
- Banco: nenhum refresh token novo.

### 11. Critério de aprovação da tela
- Login válido deve gerar token e redirecionar.
- Login inválido deve bloquear acesso e exibir erro.

---

## Tela: Recuperar Senha (`#/recuperar-senha`)

### 1. Finalidade da tela
Solicitar reset de senha por e-mail, CPF ou celular.

### 2. Como acessar a tela
- A partir de `#/login`, link "recuperar senha".

### 3. Elementos da tela
- Tabs: `email`, `cpf`, `celular`
- Inputs com máscara (`cpfInput`, `celularInput`)
- Botão de envio
- Área de erro

### 4. Passo a passo de uso
1. Selecionar método (e-mail/CPF/celular).
2. Preencher valor.
3. Clicar em enviar.

### 5. Cenários de teste da tela
- E-mail válido.
- CPF inválido.
- Celular inválido.
- Nenhum campo preenchido.

### 6. Resultado esperado no frontend
- Sucesso: alerta e redireciona para login.
- Erro: mensagem no formulário.

### 7. Resultado esperado na API
- Endpoint: `POST /api/v1/auth/forgot-password`
- Body por aba:
  - `{ "email": "..." }`
  - `{ "cpf": "somente-digitos" }`
  - `{ "phone": "somente-digitos" }`

### 8. Resultado esperado no banco
- Inserção em `auth.password_reset_tokens`.

### 9. Como conferir no banco
```sql
SELECT prt.id, u.email, prt.created_at, prt.expires_at, prt.used_at
FROM auth.password_reset_tokens prt
JOIN auth.users u ON u.id = prt.user_id
ORDER BY prt.id DESC
LIMIT 10;
```

### 10. Como identificar erro
- Frontend: erro de validação local.
- API: `400 VALIDATION_ERROR` ou `404`/`400` conforme regra.
- Banco: sem token de reset criado.

### 11. Critério de aprovação da tela
- Deve enviar payload correto para o método selecionado.
- Deve retornar feedback consistente ao usuário.

---

## Tela: Cadastros - Pessoas e Empresas (`#/cadastros`)

### 1. Finalidade da tela
Listar, criar, editar, excluir e restaurar (via API) registros de pessoas/empresas.

### 2. Como acessar a tela
- Requer login.
- Acesse menu `Cadastros` ou rota `#/cadastros`.

### 3. Elementos da tela
- Busca: `cadastros-search-input`
- Tabela com ações por linha: `Ver`, `Editar`, `Excluir`
- Botão `Cadastrar`
- Formulário completo com:
  - Tipo (`pessoa`/`empresa`)
  - Grupo, Categoria, Setor, Ramo
  - Documento, razão social/nome, contato, endereço
  - Botões `Salvar cadastro`, `Cancelar`, `Copiar cadastro`
- Drawers auxiliares para grupo e ramo

### 4. Passo a passo de uso
1. Abrir `Cadastros`.
2. Confirmar listagem inicial.
3. Clicar `Cadastrar`.
4. Preencher campos obrigatórios.
5. Salvar.
6. Buscar pelo código/razão social e validar na lista.
7. Editar e salvar novamente.
8. Excluir na linha.

### 5. Cenários de teste da tela
- Listagem inicial.
- Busca (`q`) por texto.
- Criação válida.
- Edição válida.
- Exclusão.
- Validação de obrigatórios (grupo/categoria/setor/ramo).

### 6. Resultado esperado no frontend
- Lista deve atualizar após salvar/excluir.
- Erros devem aparecer em `saveError`.
- Ao editar, formulário deve abrir preenchido.

### 7. Resultado esperado na API
- Listar: `GET /api/v1/pessoas-empresas?page=1&limit=200&q=...`
- Detalhar: `GET /api/v1/pessoas-empresas/:id`
- Criar: `POST /api/v1/pessoas-empresas`
- Editar: `PUT /api/v1/pessoas-empresas/:id`
- Excluir: `DELETE /api/v1/pessoas-empresas/:id`
- Ramos vinculados:
  - `GET /api/v1/pessoas-empresas-ramos?pessoa_empresa_id=:id`
  - `DELETE /api/v1/pessoas-empresas-ramos/:id`
  - `POST /api/v1/pessoas-empresas-ramos`

### 8. Resultado esperado no banco
- Tabela principal: `app.pessoas_empresas`
- Relação de ramos: `app.pessoas_empresas_ramos`
- Exclusão lógica: `deleted_at` preenchido.

### 9. Como conferir no banco
```sql
-- Últimos cadastros
SELECT id, codigo, tipo_cadastro, cpf_cnpj, razao_social, deleted_at, created_at, updated_at
FROM app.pessoas_empresas
ORDER BY id DESC
LIMIT 20;

-- Vínculos com ramo
SELECT per.id, per.pessoa_empresa_id, pe.codigo, per.ramo_id, ra.nome, per.deleted_at
FROM app.pessoas_empresas_ramos per
JOIN app.pessoas_empresas pe ON pe.id = per.pessoa_empresa_id
JOIN app.ramos_atividade ra ON ra.id = per.ramo_id
ORDER BY per.id DESC
LIMIT 20;

-- Busca por external (se usado)
SELECT id, codigo, external_source, external_id
FROM app.pessoas_empresas
WHERE external_source IS NOT NULL OR external_id IS NOT NULL
ORDER BY id DESC;
```

### 10. Como identificar erro
- Frontend: formulário não fecha ou lista não atualiza.
- API: `400`, `409`, `422` (regra/constraint), `401` (token).
- Banco: sem persistência ou `deleted_at` inconsistente.

### 11. Critério de aprovação da tela
- CRUD completo funcional.
- Busca funcional.
- Relação de ramos persistida sem duplicidade indevida.

---

## Tela: Cadastros - Produtos e Serviços (`#/cadastros/produtos-servicos`)

### 1. Finalidade da tela
Manter cadastro de produtos/serviços com classe e dados complementares.

### 2. Como acessar a tela
- Requer login.
- Aba `Produtos e Serviços` dentro de `Cadastros`.

### 3. Elementos da tela
- Tabela de itens
- Busca
- Ações `Ver`, `Editar`
- Formulário de cadastro/edição com `classe`, `tipo_item`, `descricao`, `unidade`, etc.

### 4. Passo a passo de uso
1. Abrir aba `Produtos e Serviços`.
2. Clicar `Cadastrar`.
3. Preencher classe + descrição + unidade.
4. Salvar.
5. Editar item criado.

### 5. Cenários de teste da tela
- Listagem.
- Busca.
- Criação.
- Edição.
- Exclusão.
- Validação de classe/descrição/unidade obrigatórios.

### 6. Resultado esperado no frontend
- Novo item aparece na tabela.
- Item editado exibe dados atualizados.

### 7. Resultado esperado na API
- `GET /api/v1/produtos-servicos`
- `POST /api/v1/produtos-servicos`
- `PUT /api/v1/produtos-servicos/:id`
- `DELETE /api/v1/produtos-servicos/:id`

### 8. Resultado esperado no banco
- Persistência em `app.produtos_servicos`.

### 9. Como conferir no banco
```sql
SELECT id, codigo, classe_id, tipo_item, descricao, unidade, deleted_at, created_at, updated_at
FROM app.produtos_servicos
ORDER BY id DESC
LIMIT 20;
```

### 10. Como identificar erro
- `classe_id` inválido (FK).
- `tipo_item` fora de `produto|servico`.
- item não aparece por `deleted_at` preenchido.

### 11. Critério de aprovação da tela
- CRUD funcional e consistente entre tela/API/banco.

---

## Tela: Cadastros - Classificação (`#/cadastros/produtos-servicos` > subaba `Classificação`)

### 1. Finalidade da tela
Manter hierarquia de classificação de produtos/serviços:
`Grupo -> Categoria -> Classe`.

### 2. Como acessar a tela
- Em `Produtos e Serviços`, subaba `Classificação`.

### 3. Elementos da tela
- Listas e editores de grupo/categoria/classe.
- Botões de criar/editar/salvar/cancelar.

### 4. Passo a passo de uso
1. Abrir subaba classificação.
2. Criar ou editar grupo.
3. Criar ou editar categoria vinculada.
4. Criar ou editar classe vinculada.
5. Salvar e recarregar listagem.

### 5. Cenários de teste da tela
- Listagem de grupos/categorias/classes.
- Criação de grupo.
- Criação de categoria.
- Criação de classe.
- Edição dos três níveis.

### 6. Resultado esperado no frontend
- Hierarquia atualiza sem reload da página.

### 7. Resultado esperado na API
- `GET /api/v1/classificacao-grupos`
- `GET /api/v1/classificacao-categorias`
- `GET /api/v1/classificacao-classes`
- `POST/PUT` nos mesmos recursos

### 8. Resultado esperado no banco
- Tabelas:
  - `app.classificacao_grupos`
  - `app.classificacao_categorias`
  - `app.classificacao_classes`

### 9. Como conferir no banco
```sql
SELECT id, codigo, nome, ativo, deleted_at
FROM app.classificacao_grupos
ORDER BY id DESC;

SELECT id, grupo_id, codigo, nome, ativo, deleted_at
FROM app.classificacao_categorias
ORDER BY id DESC;

SELECT id, categoria_id, codigo, nome, permite_produtos, permite_servicos, ativo, deleted_at
FROM app.classificacao_classes
ORDER BY id DESC;
```

### 10. Como identificar erro
- Categoria sem `grupo_id`.
- Classe sem `categoria_id`.
- Erro de FK na API.

### 11. Critério de aprovação da tela
- Criação e edição em qualquer nível devem refletir na hierarquia.

---

## Tela: Cadastros - Embalagens (`#/cadastros/produtos-servicos` > subaba `Embalagens`)

### 1. Finalidade da tela
Cadastrar e manter embalagens com unidade de equivalência e fator de conversão.

### 2. Como acessar a tela
- Em `Produtos e Serviços`, subaba `Embalagens`.

### 3. Elementos da tela
- Tabela de embalagens
- Formulário com:
  - `unidade_equivalencia`
  - `valor_conversao`
  - `descricao`
  - `sigla`
- Botões salvar/cancelar/copy

### 4. Passo a passo de uso
1. Abrir aba `Embalagens`.
2. Clicar cadastrar.
3. Preencher campos obrigatórios.
4. Salvar.
5. Editar item e salvar novamente.

### 5. Cenários de teste da tela
- Listagem.
- Busca.
- Criação.
- Edição.
- Exclusão.
- Validação de obrigatórios.

### 6. Resultado esperado no frontend
- Tabela atualizada após salvar.

### 7. Resultado esperado na API
- `GET /api/v1/embalagens`
- `POST /api/v1/embalagens`
- `PUT /api/v1/embalagens/:id`
- `DELETE /api/v1/embalagens/:id`

### 8. Resultado esperado no banco
- Tabela `app.embalagens` com `valor_conversao >= 0`.

### 9. Como conferir no banco
```sql
SELECT id, codigo, unidade_equivalencia_id, valor_conversao, descricao, sigla, deleted_at
FROM app.embalagens
ORDER BY id DESC
LIMIT 20;
```

### 10. Como identificar erro
- API retornando erro de FK (`unidade_equivalencia_id` inválido).
- `valor_conversao` negativo bloqueado por check.

### 11. Critério de aprovação da tela
- CRUD completo funcionando com persistência correta.

---

## Tela: Dashboard (`#/dashboard`)

### 1. Finalidade da tela
Exibir indicadores visuais e componentes analíticos.

### 2. Como acessar a tela
- Após login.

### 3. Observação técnica
- No estado atual, usa dados mock locais e não persiste no banco.
- Não é tela de CRUD para homologação de persistência.

### 4. Critério de aprovação
- Renderização sem erro JS.
- Navegação e componentes visuais funcionando.

---

## 6. Como Testar as Integrações

## Integração 1: Login e sessão
1. Objetivo: autenticar e habilitar chamadas protegidas.
2. Origem/destino: frontend login -> `POST /auth/login` -> `auth.*`.
3. Disparo: submit do formulário de login.
4. Reflexo esperado: token no `sessionStorage`; acesso a rotas protegidas.

## Integração 2: Lookups de formulários
1. Objetivo: popular selects/chips no cadastro.
2. Origem/destino: frontend `cadastros` -> `GET /lookups/*` -> tabelas `app.*`.
3. Endpoints:
   - `/lookups/grupos-empresariais`
   - `/lookups/categorias-pessoa-empresa`
   - `/lookups/setores`
   - `/lookups/ramos-atividade`
   - `/lookups/unidades-medida`

## Integração 3: CRUD de Pessoas/Empresas
1. Disparo: salvar/editar/excluir no formulário/lista.
2. Endpoints: `/pessoas-empresas` + `/pessoas-empresas-ramos`.
3. Tabelas impactadas:
   - `app.pessoas_empresas`
   - `app.pessoas_empresas_ramos`

## Integração 4: CRUD de Produtos/Serviços
1. Endpoint: `/produtos-servicos`.
2. Tabela: `app.produtos_servicos`.

## Integração 5: CRUD de Embalagens
1. Endpoint: `/embalagens`.
2. Tabela: `app.embalagens`.

## Como validar ponta a ponta
1. Executar ação na tela.
2. Conferir Network (request/response).
3. Repetir endpoint no Swagger.
4. Validar SQL na tabela correspondente.

---

## 7. Como Validar o Resultado na API

### Swagger
1. Abrir `http://192.168.15.10:3000/docs`.
2. Fazer login pelo endpoint `/api/v1/auth/login`.
3. Copiar `accessToken`.
4. Clicar em `Authorize` e informar `Bearer <token>`.
5. Testar endpoints de listagem/CRUD.

### Postman/Insomnia
- Header padrão:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`

### Exemplos de validação API

#### Listagem
```bash
curl -H "Authorization: Bearer <TOKEN>" \
  "http://192.168.15.10:3000/api/v1/pessoas-empresas?page=1&limit=20&q=empresa"
```

#### Criação
```bash
curl -X POST "http://192.168.15.10:3000/api/v1/embalagens" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d "{\"codigo\":\"EMB-900\",\"unidade_equivalencia_id\":1,\"valor_conversao\":1.5,\"descricao\":\"Embalagem Teste\",\"sigla\":\"CX\",\"ativo\":true}"
```

#### Restore (atenção ao Content-Type)
```bash
curl -X POST "http://192.168.15.10:3000/api/v1/pessoas-empresas/10/restore" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d "{}"
```

---

## 8. Como Validar o Resultado no Banco

### Conectar
```powershell
psql -h localhost -p 5432 -U postgres -d tawros
```

### Queries padrão de conferência

```sql
-- contagem por tabela-chave
SELECT 'pessoas_empresas' tabela, count(*) FROM app.pessoas_empresas
UNION ALL
SELECT 'produtos_servicos', count(*) FROM app.produtos_servicos
UNION ALL
SELECT 'embalagens', count(*) FROM app.embalagens;

-- registros ativos (sem soft delete)
SELECT id, codigo, created_at, updated_at
FROM app.pessoas_empresas
WHERE deleted_at IS NULL
ORDER BY id DESC
LIMIT 20;

-- registros excluídos logicamente
SELECT id, codigo, deleted_at
FROM app.pessoas_empresas
WHERE deleted_at IS NOT NULL
ORDER BY deleted_at DESC
LIMIT 20;

-- validação de relacionamento
SELECT pe.id pessoa_id, pe.codigo, per.ramo_id, ra.nome ramo
FROM app.pessoas_empresas pe
LEFT JOIN app.pessoas_empresas_ramos per ON per.pessoa_empresa_id = pe.id AND per.deleted_at IS NULL
LEFT JOIN app.ramos_atividade ra ON ra.id = per.ramo_id
WHERE pe.deleted_at IS NULL
ORDER BY pe.id DESC;
```

### Auditoria
```sql
SELECT id, occurred_at, action, table_name, record_id
FROM audit.events
ORDER BY id DESC
LIMIT 50;
```

---

## 9. Cenários de Erro e Como Identificar

| Cenário | Como provocar | Resultado esperado |
|---|---|---|
| Login inválido | senha errada | `401 INVALID_CREDENTIALS`, erro no formulário |
| Token ausente | chamar `/users` sem bearer | `401 UNAUTHORIZED` |
| Campo obrigatório ausente | criar embalagem sem `sigla` | `400`/erro de validação |
| FK inválida | `classe_id` inexistente em produto | erro de constraint |
| Unicidade | duplicar `external_source+external_id` | `409 UNIQUE_VIOLATION` |
| Recurso inexistente | `GET /pessoas-empresas/999999` | `404` |
| API fora | desligar backend | frontend sem resposta / erro de conexão |
| Restore sem JSON | POST restore sem body `{}` | `415 Unsupported Media Type` |

### O que não pode acontecer
- Frontend mostrar sucesso sem persistir no banco.
- API retornar `200` com payload inconsistente.
- Registro sumir da lista sem `deleted_at` ou delete físico não esperado.

---

## 10. Roteiro de Homologação

1. Validar health/readiness da API.
2. Validar login com credencial válida.
3. Validar bloqueio com credencial inválida.
4. Validar acesso à tela `Cadastros`.
5. Validar carregamento de lookups.
6. Criar pessoa/empresa.
7. Editar pessoa/empresa.
8. Excluir pessoa/empresa.
9. Restaurar pessoa/empresa.
10. Criar/editar/excluir produto/serviço.
11. Criar/editar/excluir embalagem.
12. Criar/editar classificação (grupo/categoria/classe).
13. Confirmar auditoria no banco.
14. Executar `npm run test:integracao` e anexar relatório.

---

## 11. Checklist Final de Validação

- [ ] Login funcionando.
- [ ] Sessão/token gravados no frontend.
- [ ] Endpoints protegidos rejeitam requisição sem token.
- [ ] Listagens carregando com dados reais.
- [ ] Filtros/busca disparando query params corretos.
- [ ] Criação persistindo no banco.
- [ ] Edição persistindo no banco.
- [ ] Exclusão lógica (`deleted_at`) funcionando.
- [ ] Restauração funcionando.
- [ ] Lookups populando selects/chips.
- [ ] Mensagens de erro adequadas no frontend.
- [ ] Sem inconsistência entre frontend, API e banco.
- [ ] `npm run test:integracao` com sucesso.

---

## 12. Tabelas e Matrizes Obrigatórias

### 12.1 Tabela Resumo de Telas

| Tela | Finalidade | Principais ações | Endpoint usado | Tabela impactada |
|---|---|---|---|---|
| Login | Autenticação | Entrar | `POST /auth/login` | `auth.refresh_tokens`, `auth.users` |
| Recuperar Senha | Solicitar reset | Enviar por e-mail/CPF/celular | `POST /auth/forgot-password` | `auth.password_reset_tokens` |
| Cadastros - Pessoas/Empresas | CRUD de entidades | listar, criar, editar, excluir, restaurar | `/pessoas-empresas`, `/pessoas-empresas-ramos`, `/lookups/*` | `app.pessoas_empresas`, `app.pessoas_empresas_ramos` |
| Cadastros - Produtos/Serviços | CRUD de itens | listar, criar, editar, excluir | `/produtos-servicos` | `app.produtos_servicos` |
| Cadastros - Classificação | Manter hierarquia | criar/editar grupo-categoria-classe | `/classificacao-*` | `app.classificacao_*` |
| Cadastros - Embalagens | CRUD de embalagens | listar, criar, editar, excluir | `/embalagens`, `/lookups/unidades-medida` | `app.embalagens` |
| Dashboard | Painel visual | navegação e visualização | sem integração persistente atual | sem impacto direto |

### 12.2 Matriz de Teste Funcional

| Tela | Cenário | Ação | Resultado esperado no frontend | Resultado esperado na API | Resultado esperado no banco |
|---|---|---|---|---|---|
| Login | Sucesso | preencher e enviar | redireciona dashboard | `200` com token | refresh token criado |
| Login | Falha | senha errada | erro visível | `401` | sem novo token |
| Pessoas/Empresas | Criar | salvar cadastro | registro aparece na lista | `201`/`200` | insert em `pessoas_empresas` |
| Pessoas/Empresas | Editar | alterar e salvar | lista atualizada | `200` | update em `pessoas_empresas` |
| Pessoas/Empresas | Excluir | ação excluir | item sai da listagem ativa | `200` | `deleted_at` preenchido |
| Produtos/Serviços | Criar | salvar produto | item listado | `201`/`200` | insert em `produtos_servicos` |
| Embalagens | Editar | salvar embalagem | linha atualizada | `200` | update em `embalagens` |
| Classificação | Criar classe | salvar editor | classe visível | `201`/`200` | insert em `classificacao_classes` |

### 12.3 Matriz de Validação de CRUD

| Entidade | Criar | Consultar | Editar | Excluir | Restaurar | Como validar |
|---|---|---|---|---|---|---|
| pessoas_empresas | Sim | Sim | Sim | Sim (soft) | Sim | UI + `/pessoas-empresas` + SQL |
| pessoas_empresas_ramos | Sim | Sim | Sim | Sim (soft) | Sim | UI de ramos + SQL join |
| produtos_servicos | Sim | Sim | Sim | Sim (soft) | Sim | UI produtos + SQL |
| embalagens | Sim | Sim | Sim | Sim (soft) | Sim | UI embalagens + SQL |
| classificacao_grupos | Sim | Sim | Sim | Sim (soft) | Sim | UI classificação + SQL |
| classificacao_categorias | Sim | Sim | Sim | Sim (soft) | Sim | UI classificação + SQL |
| classificacao_classes | Sim | Sim | Sim | Sim (soft) | Sim | UI classificação + SQL |

### 12.4 Matriz de Integrações

| Integração | Origem | Destino | Ação disparadora | Endpoint | Tabela impactada | Como conferir |
|---|---|---|---|---|---|---|
| Login | Frontend Login | API Auth | Submit login | `POST /auth/login` | `auth.refresh_tokens` | Network + SQL |
| Lookups | Frontend Cadastros | API Entity | abrir tela/form | `GET /lookups/*` | tabelas domínio `app.*` | Network + resposta |
| CRUD Pessoas | Frontend Cadastros | API Entity | salvar/editar/excluir | `/pessoas-empresas` | `app.pessoas_empresas` | UI + API + SQL |
| Ramos de Pessoa | Frontend Cadastros | API Entity | salvar cadastro | `/pessoas-empresas-ramos` | `app.pessoas_empresas_ramos` | SQL join |
| CRUD Produtos | Frontend Cadastros | API Entity | salvar produto | `/produtos-servicos` | `app.produtos_servicos` | UI + SQL |
| CRUD Embalagens | Frontend Cadastros | API Entity | salvar embalagem | `/embalagens` | `app.embalagens` | UI + SQL |

---

## Observações finais de escopo

1. Este manual cobre as telas efetivamente integradas com API e banco no ciclo atual.
2. Telas com comportamento majoritariamente mock/visual (ex.: Dashboard analítico) foram documentadas como não persistentes.
3. Fluxos de produção/pedidos/agenda-eventos/controle-patio não fazem parte da validação de integração CRUD deste ciclo.
