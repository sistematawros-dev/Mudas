-- file: 08_seed_minimal.sql
\connect tawros

INSERT INTO app.grupos_empresariais (codigo, nome, descricao, ativo)
SELECT 'GRP-001', 'Grupo Padrão', 'Grupo inicial', TRUE
WHERE NOT EXISTS (SELECT 1 FROM app.grupos_empresariais WHERE codigo='GRP-001' AND deleted_at IS NULL);

INSERT INTO app.categorias_pessoa_empresa (codigo, nome, descricao, ativo)
SELECT 'CAT-001', 'Categoria Padrão', 'Categoria inicial', TRUE
WHERE NOT EXISTS (SELECT 1 FROM app.categorias_pessoa_empresa WHERE codigo='CAT-001' AND deleted_at IS NULL);

INSERT INTO app.setores (codigo, nome, descricao, ativo)
SELECT 'SET-001', 'Comercial', 'Setor comercial', TRUE
WHERE NOT EXISTS (SELECT 1 FROM app.setores WHERE codigo='SET-001' AND deleted_at IS NULL);

INSERT INTO app.ramos_atividade (codigo, nome, ativo)
SELECT 'RAM-001', 'Agronegócio', TRUE
WHERE NOT EXISTS (SELECT 1 FROM app.ramos_atividade WHERE codigo='RAM-001' AND deleted_at IS NULL);

INSERT INTO app.unidades_medida (codigo, sigla, descricao, ativo)
SELECT 'UM-L', 'L', 'Litro', TRUE
WHERE NOT EXISTS (SELECT 1 FROM app.unidades_medida WHERE sigla='L' AND deleted_at IS NULL);

INSERT INTO app.unidades_medida (codigo, sigla, descricao, ativo)
SELECT 'UM-KG', 'KG', 'Quilograma', TRUE
WHERE NOT EXISTS (SELECT 1 FROM app.unidades_medida WHERE sigla='KG' AND deleted_at IS NULL);

INSERT INTO app.unidades_medida (codigo, sigla, descricao, ativo)
SELECT 'UM-UN', 'UN', 'Unidade', TRUE
WHERE NOT EXISTS (SELECT 1 FROM app.unidades_medida WHERE sigla='UN' AND deleted_at IS NULL);

INSERT INTO app.classificacao_grupos (codigo, nome, ativo)
SELECT '03', 'Equipamentos', TRUE
WHERE NOT EXISTS (SELECT 1 FROM app.classificacao_grupos WHERE codigo='03' AND deleted_at IS NULL);

INSERT INTO app.classificacao_categorias (grupo_id, codigo, nome, ativo)
SELECT g.id, '03.01', 'Irrigação', TRUE
FROM app.classificacao_grupos g
WHERE g.codigo='03' AND g.deleted_at IS NULL
  AND NOT EXISTS (SELECT 1 FROM app.classificacao_categorias WHERE codigo='03.01' AND deleted_at IS NULL);

INSERT INTO app.classificacao_classes (categoria_id, codigo, nome, permite_produtos, permite_servicos, ativo)
SELECT c.id, '03.01.01', 'Aspersores', TRUE, TRUE, TRUE
FROM app.classificacao_categorias c
WHERE c.codigo='03.01' AND c.deleted_at IS NULL
  AND NOT EXISTS (SELECT 1 FROM app.classificacao_classes WHERE codigo='03.01.01' AND deleted_at IS NULL);

INSERT INTO auth.users (email, phone, cpf, name, is_active)
SELECT 'admin@tawros.local', '11999990000', '12345678901', 'Administrador', TRUE
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email='admin@tawros.local'::citext AND deleted_at IS NULL);

SELECT auth.definir_senha(id, 'Trocar@123')
FROM auth.users
WHERE email='admin@tawros.local'::citext AND deleted_at IS NULL;

INSERT INTO auth.roles (codigo, nome, descricao, ativo)
SELECT 'ADMIN', 'Administrador', 'Acesso total', TRUE
WHERE NOT EXISTS (SELECT 1 FROM auth.roles WHERE codigo='ADMIN' AND deleted_at IS NULL);

INSERT INTO auth.permissions (codigo, nome, descricao)
SELECT 'cadastros.manage', 'Gerenciar Cadastros', 'CRUD de cadastros'
WHERE NOT EXISTS (SELECT 1 FROM auth.permissions WHERE codigo='cadastros.manage' AND deleted_at IS NULL);

INSERT INTO auth.permissions (codigo, nome, descricao)
SELECT 'produtos.manage', 'Gerenciar Produtos', 'CRUD de produtos e serviços'
WHERE NOT EXISTS (SELECT 1 FROM auth.permissions WHERE codigo='produtos.manage' AND deleted_at IS NULL);

INSERT INTO auth.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM auth.roles r
JOIN auth.permissions p ON p.codigo IN ('cadastros.manage','produtos.manage')
WHERE r.codigo='ADMIN'
AND NOT EXISTS (
  SELECT 1 FROM auth.role_permissions rp
  WHERE rp.role_id=r.id AND rp.permission_id=p.id AND rp.deleted_at IS NULL
);

INSERT INTO auth.user_roles (user_id, role_id)
SELECT u.id, r.id
FROM auth.users u
JOIN auth.roles r ON r.codigo='ADMIN'
WHERE u.email='admin@tawros.local'::citext
AND NOT EXISTS (
  SELECT 1 FROM auth.user_roles ur
  WHERE ur.user_id=u.id AND ur.role_id=r.id AND ur.deleted_at IS NULL
);

