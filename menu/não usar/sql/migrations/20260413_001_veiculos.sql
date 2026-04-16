-- Migration: Cadastro de Veiculos (Controle de Patio)
-- Data: 2026-04-13

BEGIN;

CREATE TABLE IF NOT EXISTS app.veiculos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  grupo VARCHAR(20) NOT NULL,
  descricao VARCHAR(200) NOT NULL,
  placa VARCHAR(7) NOT NULL,
  marca VARCHAR(120) NOT NULL,
  modelo VARCHAR(120) NOT NULL,
  carga_maxima_kg NUMERIC(14,3) NOT NULL,
  vinculo_tipo VARCHAR(20) NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT true,
  external_source TEXT,
  external_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT ck_veiculos_grupo CHECK (grupo IN ('proprio','terceiro')),
  CONSTRAINT ck_veiculos_descricao_min CHECK (char_length(trim(descricao)) >= 3),
  CONSTRAINT ck_veiculos_placa_formato CHECK (placa ~* '^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$'),
  CONSTRAINT ck_veiculos_marca_min CHECK (char_length(trim(marca)) >= 2),
  CONSTRAINT ck_veiculos_modelo_min CHECK (char_length(trim(modelo)) >= 2),
  CONSTRAINT ck_veiculos_carga_maxima CHECK (carga_maxima_kg >= 0),
  CONSTRAINT ck_veiculos_vinculo_tipo CHECK (vinculo_tipo IN ('transportadoras','motoristas'))
);

CREATE TABLE IF NOT EXISTS app.veiculos_documentos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  veiculo_id BIGINT NOT NULL,
  nome_arquivo VARCHAR(255) NOT NULL,
  tamanho_bytes BIGINT NOT NULL,
  ordem INTEGER NOT NULL DEFAULT 1,
  external_source TEXT,
  external_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_vd_veiculo FOREIGN KEY (veiculo_id) REFERENCES app.veiculos(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT ck_vd_nome_min CHECK (char_length(trim(nome_arquivo)) >= 1),
  CONSTRAINT ck_vd_tamanho CHECK (tamanho_bytes >= 0),
  CONSTRAINT ck_vd_ordem CHECK (ordem >= 1)
);

CREATE TABLE IF NOT EXISTS app.veiculos_vinculos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  veiculo_id BIGINT NOT NULL,
  pessoa_empresa_id BIGINT NOT NULL,
  external_source TEXT,
  external_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_vv_veiculo FOREIGN KEY (veiculo_id) REFERENCES app.veiculos(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_vv_pessoa_empresa FOREIGN KEY (pessoa_empresa_id) REFERENCES app.pessoas_empresas(id) ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_veiculos_placa_ativo
  ON app.veiculos (placa)
  WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ux_veiculos_external_ativo
  ON app.veiculos (external_source, external_id)
  WHERE deleted_at IS NULL AND external_source IS NOT NULL AND external_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_veiculos_vinculo_tipo
  ON app.veiculos (vinculo_tipo)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_vd_veiculo_id
  ON app.veiculos_documentos (veiculo_id);

CREATE UNIQUE INDEX IF NOT EXISTS ux_vd_veiculo_ordem_ativo
  ON app.veiculos_documentos (veiculo_id, ordem)
  WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ux_vd_external_ativo
  ON app.veiculos_documentos (external_source, external_id)
  WHERE deleted_at IS NULL AND external_source IS NOT NULL AND external_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_vv_veiculo_id
  ON app.veiculos_vinculos (veiculo_id);

CREATE INDEX IF NOT EXISTS idx_vv_pessoa_empresa_id
  ON app.veiculos_vinculos (pessoa_empresa_id);

CREATE UNIQUE INDEX IF NOT EXISTS ux_vv_veiculo_pessoa_ativo
  ON app.veiculos_vinculos (veiculo_id, pessoa_empresa_id)
  WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ux_vv_external_ativo
  ON app.veiculos_vinculos (external_source, external_id)
  WHERE deleted_at IS NULL AND external_source IS NOT NULL AND external_id IS NOT NULL;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'app'
      AND p.proname = 'set_updated_at'
  ) THEN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_veiculos_set_updated_at') THEN
      EXECUTE 'CREATE TRIGGER trg_veiculos_set_updated_at BEFORE UPDATE ON app.veiculos FOR EACH ROW EXECUTE FUNCTION app.set_updated_at()';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_vd_set_updated_at') THEN
      EXECUTE 'CREATE TRIGGER trg_vd_set_updated_at BEFORE UPDATE ON app.veiculos_documentos FOR EACH ROW EXECUTE FUNCTION app.set_updated_at()';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_vv_set_updated_at') THEN
      EXECUTE 'CREATE TRIGGER trg_vv_set_updated_at BEFORE UPDATE ON app.veiculos_vinculos FOR EACH ROW EXECUTE FUNCTION app.set_updated_at()';
    END IF;
  END IF;
END $$;

COMMENT ON TABLE app.veiculos IS 'Cadastro de veiculos utilizados no modulo de controle de patio.';
COMMENT ON COLUMN app.veiculos.grupo IS 'Grupo do veiculo: proprio ou terceiro.';
COMMENT ON COLUMN app.veiculos.vinculo_tipo IS 'Define se os vinculos estao associados a transportadoras ou motoristas.';
COMMENT ON TABLE app.veiculos_documentos IS 'Metadados de documentos anexados no cadastro de veiculo.';
COMMENT ON TABLE app.veiculos_vinculos IS 'Associacoes entre veiculo e pessoas/empresas vinculadas.';

COMMIT;
