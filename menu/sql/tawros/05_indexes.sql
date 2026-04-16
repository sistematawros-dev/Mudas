-- file: 05_indexes.sql
\connect tawros

CREATE INDEX IF NOT EXISTS idx_pe_grupo ON app.pessoas_empresas(grupo_empresarial_id);
CREATE INDEX IF NOT EXISTS idx_pe_categoria ON app.pessoas_empresas(categoria_id);
CREATE INDEX IF NOT EXISTS idx_pe_setor ON app.pessoas_empresas(setor_id);
CREATE INDEX IF NOT EXISTS idx_ps_classe ON app.produtos_servicos(classe_id);

CREATE INDEX IF NOT EXISTS gin_pe_razao_trgm ON app.pessoas_empresas USING gin (razao_social gin_trgm_ops) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS gin_ps_descricao_trgm ON app.produtos_servicos USING gin (descricao gin_trgm_ops) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ux_grupos_codigo_ativo ON app.grupos_empresariais(codigo) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_cat_pe_codigo_ativo ON app.categorias_pessoa_empresa(codigo) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_setor_codigo_ativo ON app.setores(codigo) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_ramo_codigo_ativo ON app.ramos_atividade(codigo) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_pe_codigo_ativo ON app.pessoas_empresas(codigo) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_pe_doc_ativo ON app.pessoas_empresas(cpf_cnpj) WHERE deleted_at IS NULL AND cpf_cnpj IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_pe_email_ativo ON app.pessoas_empresas(email) WHERE deleted_at IS NULL AND email IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_per_ativo ON app.pessoas_empresas_ramos(pessoa_empresa_id, ramo_id) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ux_cg_codigo_ativo ON app.classificacao_grupos(codigo) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_cc_codigo_ativo ON app.classificacao_categorias(codigo) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_cl_codigo_ativo ON app.classificacao_classes(codigo) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_um_sigla_ativo ON app.unidades_medida(sigla) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_emb_codigo_ativo ON app.embalagens(codigo) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_ps_codigo_ativo ON app.produtos_servicos(codigo) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_psm_ativo ON app.produtos_servicos_marcas(produto_servico_id, marca_id) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_psf_ativo ON app.produtos_servicos_fabricantes(produto_servico_id, fabricante_id) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ux_auth_users_email_ativo ON auth.users(email) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_auth_cred_user_ativo ON auth.user_credentials(user_id) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_auth_refresh_hash_ativo ON auth.refresh_tokens(token_hash) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_auth_reset_hash_ativo ON auth.password_reset_tokens(token_hash) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_auth_api_hash_ativo ON auth.api_keys(key_hash) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_auth_roles_codigo_ativo ON auth.roles(codigo) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_auth_perms_codigo_ativo ON auth.permissions(codigo) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_auth_rp_ativo ON auth.role_permissions(role_id, permission_id) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_auth_ur_ativo ON auth.user_roles(user_id, role_id) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ux_pe_external_ativo ON app.pessoas_empresas(external_source, external_id) WHERE deleted_at IS NULL AND external_source IS NOT NULL AND external_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_ps_external_ativo ON app.produtos_servicos(external_source, external_id) WHERE deleted_at IS NULL AND external_source IS NOT NULL AND external_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_emb_external_ativo ON app.embalagens(external_source, external_id) WHERE deleted_at IS NULL AND external_source IS NOT NULL AND external_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_auth_users_external_ativo ON auth.users(external_source, external_id) WHERE deleted_at IS NULL AND external_source IS NOT NULL AND external_id IS NOT NULL;

