-- Migration: Integridade de cadastros vinculados
-- Objetivo: impedir ALTERACAO/EXCLUSAO de registros de cadastro quando houver ligacoes posteriores.

BEGIN;

-- Endurece FKs de tabelas de vinculo para nao permitir exclusao/alteracao em cascata
ALTER TABLE app.pessoas_empresas_ramos
  DROP CONSTRAINT IF EXISTS fk_per_pe,
  ADD CONSTRAINT fk_per_pe
    FOREIGN KEY (pessoa_empresa_id)
    REFERENCES app.pessoas_empresas(id)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT;

ALTER TABLE app.produtos_servicos_fabricantes
  DROP CONSTRAINT IF EXISTS fk_psf_ps,
  ADD CONSTRAINT fk_psf_ps
    FOREIGN KEY (produto_servico_id)
    REFERENCES app.produtos_servicos(id)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT;

ALTER TABLE app.produtos_servicos_marcas
  DROP CONSTRAINT IF EXISTS fk_psm_ps,
  ADD CONSTRAINT fk_psm_ps
    FOREIGN KEY (produto_servico_id)
    REFERENCES app.produtos_servicos(id)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT;

ALTER TABLE app.veiculos_documentos
  DROP CONSTRAINT IF EXISTS fk_vd_veiculo,
  ADD CONSTRAINT fk_vd_veiculo
    FOREIGN KEY (veiculo_id)
    REFERENCES app.veiculos(id)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT;

ALTER TABLE app.veiculos_vinculos
  DROP CONSTRAINT IF EXISTS fk_vv_veiculo,
  ADD CONSTRAINT fk_vv_veiculo
    FOREIGN KEY (veiculo_id)
    REFERENCES app.veiculos(id)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT;

-- Trigger de bloqueio para alteracao/exclusao de cadastro com vinculos
CREATE OR REPLACE FUNCTION app.fn_bloquear_cadastro_vinculado()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  v_operacao TEXT := TG_OP;
BEGIN
  IF TG_TABLE_SCHEMA = 'app' AND TG_TABLE_NAME = 'pessoas_empresas' THEN
    IF EXISTS (
      SELECT 1
      FROM app.instrucoes i
      WHERE i.deleted_at IS NULL
        AND (i.comprador_id = OLD.id OR i.produtor_id = OLD.id)
    ) OR EXISTS (
      SELECT 1
      FROM app.veiculos_vinculos vv
      WHERE vv.deleted_at IS NULL
        AND vv.pessoa_empresa_id = OLD.id
    ) OR EXISTS (
      SELECT 1
      FROM app.pessoas_empresas_ramos per
      WHERE per.deleted_at IS NULL
        AND per.pessoa_empresa_id = OLD.id
    ) THEN
      RAISE EXCEPTION 'Cadastro pessoas_empresas id=% possui vinculos e nao pode ser %.',
        OLD.id, CASE WHEN v_operacao = 'DELETE' THEN 'excluido' ELSE 'alterado' END
        USING ERRCODE = '23503';
    END IF;
  ELSIF TG_TABLE_SCHEMA = 'app' AND TG_TABLE_NAME = 'filiais' THEN
    IF EXISTS (
      SELECT 1
      FROM app.instrucoes i
      WHERE i.deleted_at IS NULL
        AND i.filial_id = OLD.id
    ) OR EXISTS (
      SELECT 1
      FROM app.agenda_disponibilidade ad
      WHERE ad.deleted_at IS NULL
        AND ad.filial_id = OLD.id
    ) THEN
      RAISE EXCEPTION 'Cadastro filiais id=% possui vinculos e nao pode ser %.',
        OLD.id, CASE WHEN v_operacao = 'DELETE' THEN 'excluido' ELSE 'alterado' END
        USING ERRCODE = '23503';
    END IF;
  ELSIF TG_TABLE_SCHEMA = 'app' AND TG_TABLE_NAME = 'veiculos' THEN
    IF EXISTS (
      SELECT 1
      FROM app.veiculos_vinculos vv
      WHERE vv.deleted_at IS NULL
        AND vv.veiculo_id = OLD.id
    ) OR EXISTS (
      SELECT 1
      FROM app.veiculos_documentos vd
      WHERE vd.deleted_at IS NULL
        AND vd.veiculo_id = OLD.id
    ) THEN
      RAISE EXCEPTION 'Cadastro veiculos id=% possui vinculos e nao pode ser %.',
        OLD.id, CASE WHEN v_operacao = 'DELETE' THEN 'excluido' ELSE 'alterado' END
        USING ERRCODE = '23503';
    END IF;
  ELSIF TG_TABLE_SCHEMA = 'app' AND TG_TABLE_NAME = 'produtos_servicos' THEN
    IF EXISTS (
      SELECT 1
      FROM app.produtos_servicos_marcas psm
      WHERE psm.deleted_at IS NULL
        AND psm.produto_servico_id = OLD.id
    ) OR EXISTS (
      SELECT 1
      FROM app.produtos_servicos_fabricantes psf
      WHERE psf.deleted_at IS NULL
        AND psf.produto_servico_id = OLD.id
    ) THEN
      RAISE EXCEPTION 'Cadastro produtos_servicos id=% possui vinculos e nao pode ser %.',
        OLD.id, CASE WHEN v_operacao = 'DELETE' THEN 'excluido' ELSE 'alterado' END
        USING ERRCODE = '23503';
    END IF;
  END IF;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_bloquear_cadastro_vinculado_pe ON app.pessoas_empresas;
CREATE TRIGGER trg_bloquear_cadastro_vinculado_pe
BEFORE UPDATE OR DELETE ON app.pessoas_empresas
FOR EACH ROW
EXECUTE FUNCTION app.fn_bloquear_cadastro_vinculado();

DROP TRIGGER IF EXISTS trg_bloquear_cadastro_vinculado_filiais ON app.filiais;
CREATE TRIGGER trg_bloquear_cadastro_vinculado_filiais
BEFORE UPDATE OR DELETE ON app.filiais
FOR EACH ROW
EXECUTE FUNCTION app.fn_bloquear_cadastro_vinculado();

DROP TRIGGER IF EXISTS trg_bloquear_cadastro_vinculado_veiculos ON app.veiculos;
CREATE TRIGGER trg_bloquear_cadastro_vinculado_veiculos
BEFORE UPDATE OR DELETE ON app.veiculos
FOR EACH ROW
EXECUTE FUNCTION app.fn_bloquear_cadastro_vinculado();

DROP TRIGGER IF EXISTS trg_bloquear_cadastro_vinculado_ps ON app.produtos_servicos;
CREATE TRIGGER trg_bloquear_cadastro_vinculado_ps
BEFORE UPDATE OR DELETE ON app.produtos_servicos
FOR EACH ROW
EXECUTE FUNCTION app.fn_bloquear_cadastro_vinculado();

COMMIT;
