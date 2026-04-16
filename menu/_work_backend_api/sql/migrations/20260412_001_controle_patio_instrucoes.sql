BEGIN;

-- Filiais (lookup de unidade de retirada)
CREATE TABLE IF NOT EXISTS app.filiais (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  codigo VARCHAR(40) NOT NULL,
  nome VARCHAR(160) NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT true,
  external_source TEXT NULL,
  external_id TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ NULL,
  CONSTRAINT ck_filiais_codigo_min CHECK (char_length(trim(codigo)) >= 2),
  CONSTRAINT ck_filiais_nome_min CHECK (char_length(trim(nome)) >= 3)
);

-- Cabeçalho da instrução
CREATE TABLE IF NOT EXISTS app.instrucoes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  numero_instrucao VARCHAR(60) NOT NULL,
  data_emissao DATE NOT NULL,
  prazo_final_carregamento DATE NULL,
  comprador_id BIGINT NOT NULL,
  numero_contrato VARCHAR(60) NULL,
  produtor_documento VARCHAR(20) NULL,
  produtor_id BIGINT NULL,
  nome_vendedor_produtor VARCHAR(160) NULL,
  tipo_produto VARCHAR(20) NOT NULL,
  filial_id BIGINT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pendente',
  quantidade_total NUMERIC(14, 3) NOT NULL DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT true,
  external_source TEXT NULL,
  external_id TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ NULL,
  CONSTRAINT ck_instrucoes_tipo_produto CHECK (tipo_produto IN ('caroco', 'pluma', 'fibrilha', 'capulho')),
  CONSTRAINT ck_instrucoes_status CHECK (status IN ('pendente', 'aprovado', 'finalizado', 'recusado')),
  CONSTRAINT ck_instrucoes_quantidade_total CHECK (quantidade_total >= 0),
  CONSTRAINT ck_instrucoes_prazo_data CHECK (prazo_final_carregamento IS NULL OR prazo_final_carregamento >= data_emissao),
  CONSTRAINT ck_instrucoes_numero_instrucao_min CHECK (char_length(trim(numero_instrucao)) >= 2)
);

-- Itens para produtos não pluma
CREATE TABLE IF NOT EXISTS app.instrucoes_transportes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  instrucao_id BIGINT NOT NULL,
  nome_transportadora VARCHAR(160) NOT NULL,
  unidade VARCHAR(30) NOT NULL,
  quantidade NUMERIC(14, 3) NOT NULL,
  ordem INTEGER NOT NULL DEFAULT 1,
  external_source TEXT NULL,
  external_id TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ NULL,
  CONSTRAINT ck_it_quantidade CHECK (quantidade >= 0),
  CONSTRAINT ck_it_ordem CHECK (ordem >= 1),
  CONSTRAINT ck_it_nome_transportadora_min CHECK (char_length(trim(nome_transportadora)) >= 3),
  CONSTRAINT ck_it_unidade CHECK (unidade IN ('quilogramas', 'toneladas', 'arrobas', 'sacas'))
);

-- Itens para produto pluma (blocos completos/parciais)
CREATE TABLE IF NOT EXISTS app.instrucoes_blocos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  instrucao_id BIGINT NOT NULL,
  nome_transportadora VARCHAR(160) NOT NULL,
  nome_bloco VARCHAR(60) NOT NULL,
  classificacao_bloco VARCHAR(20) NOT NULL,
  modo_inclusao VARCHAR(20) NOT NULL,
  quantidade_fardos INTEGER NOT NULL DEFAULT 0,
  ordem INTEGER NOT NULL DEFAULT 1,
  external_source TEXT NULL,
  external_id TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ NULL,
  CONSTRAINT ck_ib_classificacao CHECK (classificacao_bloco IN ('Bloco Completo', 'Bloco Parcial')),
  CONSTRAINT ck_ib_modo CHECK (modo_inclusao IN ('quantity', 'bales')),
  CONSTRAINT ck_ib_qtd_fardos CHECK (quantidade_fardos >= 0),
  CONSTRAINT ck_ib_ordem CHECK (ordem >= 1),
  CONSTRAINT ck_ib_nome_bloco_min CHECK (char_length(trim(nome_bloco)) >= 1),
  CONSTRAINT ck_ib_nome_transportadora_min CHECK (char_length(trim(nome_transportadora)) >= 3)
);

-- Códigos de fardo por bloco parcial
CREATE TABLE IF NOT EXISTS app.instrucoes_fardos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  instrucao_bloco_id BIGINT NOT NULL,
  codigo_fardo VARCHAR(80) NOT NULL,
  ordem INTEGER NOT NULL DEFAULT 1,
  external_source TEXT NULL,
  external_id TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ NULL,
  CONSTRAINT ck_if_codigo_fardo_min CHECK (char_length(trim(codigo_fardo)) >= 1),
  CONSTRAINT ck_if_ordem CHECK (ordem >= 1)
);

-- Chaves estrangeiras
ALTER TABLE app.instrucoes
  ADD CONSTRAINT fk_instrucoes_comprador
    FOREIGN KEY (comprador_id) REFERENCES app.pessoas_empresas(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
  ADD CONSTRAINT fk_instrucoes_produtor
    FOREIGN KEY (produtor_id) REFERENCES app.pessoas_empresas(id) ON UPDATE RESTRICT ON DELETE SET NULL,
  ADD CONSTRAINT fk_instrucoes_filial
    FOREIGN KEY (filial_id) REFERENCES app.filiais(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE app.instrucoes_transportes
  ADD CONSTRAINT fk_it_instrucao
    FOREIGN KEY (instrucao_id) REFERENCES app.instrucoes(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE app.instrucoes_blocos
  ADD CONSTRAINT fk_ib_instrucao
    FOREIGN KEY (instrucao_id) REFERENCES app.instrucoes(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE app.instrucoes_fardos
  ADD CONSTRAINT fk_if_bloco
    FOREIGN KEY (instrucao_bloco_id) REFERENCES app.instrucoes_blocos(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Unicidade ativa (soft delete)
CREATE UNIQUE INDEX IF NOT EXISTS ux_filiais_codigo_ativo
  ON app.filiais (codigo) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_filiais_external_ativo
  ON app.filiais (external_source, external_id)
  WHERE deleted_at IS NULL AND external_source IS NOT NULL AND external_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ux_instrucoes_numero_ativo
  ON app.instrucoes (numero_instrucao) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_instrucoes_external_ativo
  ON app.instrucoes (external_source, external_id)
  WHERE deleted_at IS NULL AND external_source IS NOT NULL AND external_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ux_it_instrucao_ordem_ativo
  ON app.instrucoes_transportes (instrucao_id, ordem) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_it_external_ativo
  ON app.instrucoes_transportes (external_source, external_id)
  WHERE deleted_at IS NULL AND external_source IS NOT NULL AND external_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ux_ib_instrucao_ordem_ativo
  ON app.instrucoes_blocos (instrucao_id, ordem) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_ib_external_ativo
  ON app.instrucoes_blocos (external_source, external_id)
  WHERE deleted_at IS NULL AND external_source IS NOT NULL AND external_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ux_if_bloco_codigo_ativo
  ON app.instrucoes_fardos (instrucao_bloco_id, codigo_fardo) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ux_if_external_ativo
  ON app.instrucoes_fardos (external_source, external_id)
  WHERE deleted_at IS NULL AND external_source IS NOT NULL AND external_id IS NOT NULL;

-- Índices de busca e FK
CREATE INDEX IF NOT EXISTS idx_instrucoes_comprador ON app.instrucoes (comprador_id);
CREATE INDEX IF NOT EXISTS idx_instrucoes_produtor ON app.instrucoes (produtor_id);
CREATE INDEX IF NOT EXISTS idx_instrucoes_filial ON app.instrucoes (filial_id);
CREATE INDEX IF NOT EXISTS idx_instrucoes_status ON app.instrucoes (status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_instrucoes_tipo_produto ON app.instrucoes (tipo_produto) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_it_instrucao_id ON app.instrucoes_transportes (instrucao_id);
CREATE INDEX IF NOT EXISTS idx_ib_instrucao_id ON app.instrucoes_blocos (instrucao_id);
CREATE INDEX IF NOT EXISTS idx_if_bloco_id ON app.instrucoes_fardos (instrucao_bloco_id);

-- Triggers padrão
DROP TRIGGER IF EXISTS trg_filiais_updated_at ON app.filiais;
CREATE TRIGGER trg_filiais_updated_at
  BEFORE UPDATE ON app.filiais
  FOR EACH ROW EXECUTE FUNCTION app.tg_set_updated_at();

DROP TRIGGER IF EXISTS trg_instrucoes_updated_at ON app.instrucoes;
CREATE TRIGGER trg_instrucoes_updated_at
  BEFORE UPDATE ON app.instrucoes
  FOR EACH ROW EXECUTE FUNCTION app.tg_set_updated_at();

DROP TRIGGER IF EXISTS trg_instrucoes_transportes_updated_at ON app.instrucoes_transportes;
CREATE TRIGGER trg_instrucoes_transportes_updated_at
  BEFORE UPDATE ON app.instrucoes_transportes
  FOR EACH ROW EXECUTE FUNCTION app.tg_set_updated_at();

DROP TRIGGER IF EXISTS trg_instrucoes_blocos_updated_at ON app.instrucoes_blocos;
CREATE TRIGGER trg_instrucoes_blocos_updated_at
  BEFORE UPDATE ON app.instrucoes_blocos
  FOR EACH ROW EXECUTE FUNCTION app.tg_set_updated_at();

DROP TRIGGER IF EXISTS trg_instrucoes_fardos_updated_at ON app.instrucoes_fardos;
CREATE TRIGGER trg_instrucoes_fardos_updated_at
  BEFORE UPDATE ON app.instrucoes_fardos
  FOR EACH ROW EXECUTE FUNCTION app.tg_set_updated_at();

DROP TRIGGER IF EXISTS trg_filiais_audit ON app.filiais;
CREATE TRIGGER trg_filiais_audit
  AFTER INSERT OR UPDATE OR DELETE ON app.filiais
  FOR EACH ROW EXECUTE FUNCTION audit.registrar_evento();

DROP TRIGGER IF EXISTS trg_instrucoes_audit ON app.instrucoes;
CREATE TRIGGER trg_instrucoes_audit
  AFTER INSERT OR UPDATE OR DELETE ON app.instrucoes
  FOR EACH ROW EXECUTE FUNCTION audit.registrar_evento();

-- Seeds mínimos
INSERT INTO app.filiais (codigo, nome, ativo)
VALUES
  ('MATRIZ', 'Lucas Cotton - Matriz', true),
  ('FILIAL-01', 'Lucas Cotton - Filial 1', true),
  ('FILIAL-02', 'Lucas Cotton - Filial 2', true)
ON CONFLICT DO NOTHING;

COMMIT;
