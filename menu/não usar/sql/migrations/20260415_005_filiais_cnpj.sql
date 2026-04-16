BEGIN;

ALTER TABLE app.filiais
  ADD COLUMN IF NOT EXISTS cnpj VARCHAR(18);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
      FROM pg_constraint
     WHERE conname = 'ck_filiais_cnpj_formato'
       AND conrelid = 'app.filiais'::regclass
  ) THEN
    ALTER TABLE app.filiais
      ADD CONSTRAINT ck_filiais_cnpj_formato
      CHECK (
        cnpj IS NULL
        OR length(regexp_replace(cnpj, '\D', '', 'g')) = 14
      );
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS ux_filiais_cnpj_ativo
  ON app.filiais (regexp_replace(cnpj, '\D', '', 'g'))
  WHERE deleted_at IS NULL
    AND cnpj IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_filiais_cnpj
  ON app.filiais (cnpj)
  WHERE deleted_at IS NULL;

COMMIT;
