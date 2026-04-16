-- file: 04_constraints_and_fks.sql
\connect tawros

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_pe_grupo') THEN
    ALTER TABLE app.pessoas_empresas ADD CONSTRAINT fk_pe_grupo FOREIGN KEY (grupo_empresarial_id) REFERENCES app.grupos_empresariais(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_pe_categoria') THEN
    ALTER TABLE app.pessoas_empresas ADD CONSTRAINT fk_pe_categoria FOREIGN KEY (categoria_id) REFERENCES app.categorias_pessoa_empresa(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_pe_setor') THEN
    ALTER TABLE app.pessoas_empresas ADD CONSTRAINT fk_pe_setor FOREIGN KEY (setor_id) REFERENCES app.setores(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_per_pe') THEN
    ALTER TABLE app.pessoas_empresas_ramos ADD CONSTRAINT fk_per_pe FOREIGN KEY (pessoa_empresa_id) REFERENCES app.pessoas_empresas(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_per_ramo') THEN
    ALTER TABLE app.pessoas_empresas_ramos ADD CONSTRAINT fk_per_ramo FOREIGN KEY (ramo_id) REFERENCES app.ramos_atividade(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_cc_grupo') THEN
    ALTER TABLE app.classificacao_categorias ADD CONSTRAINT fk_cc_grupo FOREIGN KEY (grupo_id) REFERENCES app.classificacao_grupos(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_cl_categ') THEN
    ALTER TABLE app.classificacao_classes ADD CONSTRAINT fk_cl_categ FOREIGN KEY (categoria_id) REFERENCES app.classificacao_categorias(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_emb_unidade') THEN
    ALTER TABLE app.embalagens ADD CONSTRAINT fk_emb_unidade FOREIGN KEY (unidade_equivalencia_id) REFERENCES app.unidades_medida(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_ps_classe') THEN
    ALTER TABLE app.produtos_servicos ADD CONSTRAINT fk_ps_classe FOREIGN KEY (classe_id) REFERENCES app.classificacao_classes(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_psm_ps') THEN
    ALTER TABLE app.produtos_servicos_marcas ADD CONSTRAINT fk_psm_ps FOREIGN KEY (produto_servico_id) REFERENCES app.produtos_servicos(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_psm_marca') THEN
    ALTER TABLE app.produtos_servicos_marcas ADD CONSTRAINT fk_psm_marca FOREIGN KEY (marca_id) REFERENCES app.marcas(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_psf_ps') THEN
    ALTER TABLE app.produtos_servicos_fabricantes ADD CONSTRAINT fk_psf_ps FOREIGN KEY (produto_servico_id) REFERENCES app.produtos_servicos(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_psf_fabricante') THEN
    ALTER TABLE app.produtos_servicos_fabricantes ADD CONSTRAINT fk_psf_fabricante FOREIGN KEY (fabricante_id) REFERENCES app.fabricantes(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_cred_user') THEN
    ALTER TABLE auth.user_credentials ADD CONSTRAINT fk_cred_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_refresh_user') THEN
    ALTER TABLE auth.refresh_tokens ADD CONSTRAINT fk_refresh_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_reset_user') THEN
    ALTER TABLE auth.password_reset_tokens ADD CONSTRAINT fk_reset_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_api_key_user') THEN
    ALTER TABLE auth.api_keys ADD CONSTRAINT fk_api_key_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_rp_role') THEN
    ALTER TABLE auth.role_permissions ADD CONSTRAINT fk_rp_role FOREIGN KEY (role_id) REFERENCES auth.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_rp_perm') THEN
    ALTER TABLE auth.role_permissions ADD CONSTRAINT fk_rp_perm FOREIGN KEY (permission_id) REFERENCES auth.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_ur_user') THEN
    ALTER TABLE auth.user_roles ADD CONSTRAINT fk_ur_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_ur_role') THEN
    ALTER TABLE auth.user_roles ADD CONSTRAINT fk_ur_role FOREIGN KEY (role_id) REFERENCES auth.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_audit_actor') THEN
    ALTER TABLE audit.events ADD CONSTRAINT fk_audit_actor FOREIGN KEY (actor_user_id) REFERENCES auth.users(id) ON UPDATE RESTRICT ON DELETE SET NULL;
  END IF;
END $$;

