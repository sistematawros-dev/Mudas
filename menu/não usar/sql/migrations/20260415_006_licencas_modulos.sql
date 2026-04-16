BEGIN;

CREATE TABLE IF NOT EXISTS app.licencas_modulos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  modulo VARCHAR(30) NOT NULL,
  quantidade_licencas INTEGER NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  external_source TEXT NULL,
  external_id TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ NULL,
  CONSTRAINT ck_licencas_modulos_modulo_valido CHECK (lower(trim(modulo)) IN ('patio', 'mudas')),
  CONSTRAINT ck_licencas_modulos_quantidade CHECK (quantidade_licencas >= 0)
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_licencas_modulos_modulo_ativo
  ON app.licencas_modulos (lower(trim(modulo)))
  WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ux_licencas_modulos_external_ativo
  ON app.licencas_modulos (external_source, external_id)
  WHERE deleted_at IS NULL
    AND external_source IS NOT NULL
    AND external_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_licencas_modulos_ativo
  ON app.licencas_modulos (ativo)
  WHERE deleted_at IS NULL;

DROP TRIGGER IF EXISTS trg_licencas_modulos_updated_at ON app.licencas_modulos;
CREATE TRIGGER trg_licencas_modulos_updated_at
BEFORE UPDATE ON app.licencas_modulos
FOR EACH ROW EXECUTE FUNCTION app.tg_set_updated_at();

DROP TRIGGER IF EXISTS trg_licencas_modulos_audit ON app.licencas_modulos;
CREATE TRIGGER trg_licencas_modulos_audit
AFTER INSERT OR UPDATE OR DELETE ON app.licencas_modulos
FOR EACH ROW EXECUTE FUNCTION audit.registrar_evento();

INSERT INTO app.licencas_modulos (modulo, quantidade_licencas, ativo)
SELECT 'patio', 0, TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM app.licencas_modulos lm
  WHERE lower(trim(lm.modulo)) = 'patio'
    AND lm.deleted_at IS NULL
);

INSERT INTO app.licencas_modulos (modulo, quantidade_licencas, ativo)
SELECT 'mudas', 0, TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM app.licencas_modulos lm
  WHERE lower(trim(lm.modulo)) = 'mudas'
    AND lm.deleted_at IS NULL
);

COMMIT;
