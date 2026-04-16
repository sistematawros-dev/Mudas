-- file: 99_smoke_tests.sql
\connect tawros

SELECT 'app.pessoas_empresas' AS tabela, count(*) AS qtd FROM app.pessoas_empresas WHERE deleted_at IS NULL
UNION ALL
SELECT 'app.produtos_servicos', count(*) FROM app.produtos_servicos WHERE deleted_at IS NULL
UNION ALL
SELECT 'app.embalagens', count(*) FROM app.embalagens WHERE deleted_at IS NULL
UNION ALL
SELECT 'auth.users', count(*) FROM auth.users WHERE deleted_at IS NULL;

DO $$
DECLARE
  v_uid BIGINT;
  v_token TEXT;
  v_hash TEXT;
BEGIN
  SELECT id INTO v_uid FROM auth.users WHERE email='admin@tawros.local'::citext LIMIT 1;
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Usuário admin não encontrado.';
  END IF;

  v_token := auth.emitir_refresh_token(v_uid, 'smoke', '127.0.0.1', interval '1 day');
  SELECT token_hash INTO v_hash FROM auth.refresh_tokens WHERE user_id=v_uid ORDER BY id DESC LIMIT 1;
  IF v_hash = v_token THEN
    RAISE EXCEPTION 'Token foi salvo em texto puro.';
  END IF;

  PERFORM auth.revogar_refresh_token(v_token);
END $$;

