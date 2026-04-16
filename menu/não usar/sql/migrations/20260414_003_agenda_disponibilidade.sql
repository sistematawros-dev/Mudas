BEGIN;

CREATE TABLE IF NOT EXISTS app.agenda_disponibilidade (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  filial_id BIGINT NOT NULL,
  data_carregamento DATE NOT NULL,
  tipo_produto VARCHAR(20) NOT NULL,
  vagas_total INTEGER NOT NULL,
  vagas_ocupadas INTEGER NOT NULL DEFAULT 0,
  limite_transportadora INTEGER NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'open',
  mensagem_bloqueio TEXT NULL,
  ativo BOOLEAN NOT NULL DEFAULT true,
  external_source TEXT NULL,
  external_id TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ NULL,
  CONSTRAINT ck_agenda_tipo_produto CHECK (tipo_produto IN ('caroco', 'pluma', 'fibrilha', 'capulho')),
  CONSTRAINT ck_agenda_vagas_total CHECK (vagas_total >= 0),
  CONSTRAINT ck_agenda_vagas_ocupadas CHECK (vagas_ocupadas >= 0),
  CONSTRAINT ck_agenda_vagas_relacao CHECK (vagas_ocupadas <= vagas_total),
  CONSTRAINT ck_agenda_limite_transportadora CHECK (limite_transportadora IS NULL OR limite_transportadora >= 0),
  CONSTRAINT ck_agenda_status CHECK (status IN ('open', 'blocked'))
);

ALTER TABLE app.agenda_disponibilidade
  ADD CONSTRAINT fk_agenda_disponibilidade_filial
    FOREIGN KEY (filial_id) REFERENCES app.filiais(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

CREATE UNIQUE INDEX IF NOT EXISTS ux_agenda_disp_filial_data_produto_ativo
  ON app.agenda_disponibilidade (filial_id, data_carregamento, tipo_produto)
  WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ux_agenda_disp_external_ativo
  ON app.agenda_disponibilidade (external_source, external_id)
  WHERE deleted_at IS NULL AND external_source IS NOT NULL AND external_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_agenda_disp_data
  ON app.agenda_disponibilidade (data_carregamento)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_agenda_disp_filial
  ON app.agenda_disponibilidade (filial_id)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_agenda_disp_status
  ON app.agenda_disponibilidade (status)
  WHERE deleted_at IS NULL;

DROP TRIGGER IF EXISTS trg_agenda_disponibilidade_updated_at ON app.agenda_disponibilidade;
CREATE TRIGGER trg_agenda_disponibilidade_updated_at
  BEFORE UPDATE ON app.agenda_disponibilidade
  FOR EACH ROW EXECUTE FUNCTION app.tg_set_updated_at();

DROP TRIGGER IF EXISTS trg_agenda_disponibilidade_audit ON app.agenda_disponibilidade;
CREATE TRIGGER trg_agenda_disponibilidade_audit
  AFTER INSERT OR UPDATE OR DELETE ON app.agenda_disponibilidade
  FOR EACH ROW EXECUTE FUNCTION audit.registrar_evento();

COMMIT;
