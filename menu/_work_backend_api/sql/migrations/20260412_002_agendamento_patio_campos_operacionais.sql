BEGIN;

ALTER TABLE app.instrucoes
  ADD COLUMN IF NOT EXISTS data_agendamento DATE NULL,
  ADD COLUMN IF NOT EXISTS nome_motorista VARCHAR(160) NULL,
  ADD COLUMN IF NOT EXISTS placa_veiculo VARCHAR(12) NULL;

ALTER TABLE app.instrucoes
  DROP CONSTRAINT IF EXISTS ck_instrucoes_placa_formato;

ALTER TABLE app.instrucoes
  ADD CONSTRAINT ck_instrucoes_placa_formato
  CHECK (
    placa_veiculo IS NULL
    OR placa_veiculo ~* '^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$'
  );

CREATE INDEX IF NOT EXISTS idx_instrucoes_data_agendamento
  ON app.instrucoes (data_agendamento)
  WHERE deleted_at IS NULL AND data_agendamento IS NOT NULL;

COMMIT;
