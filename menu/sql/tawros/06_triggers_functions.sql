-- file: 06_triggers_functions.sql
\connect tawros

CREATE OR REPLACE FUNCTION app.tg_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION auth.hash_token_sha256(p_token TEXT)
RETURNS TEXT
LANGUAGE sql
IMMUTABLE
AS $$ SELECT encode(public.digest(coalesce(p_token,''), 'sha256'), 'hex'); $$;

CREATE OR REPLACE FUNCTION auth.gerar_token_aleatorio(p_bytes INTEGER DEFAULT 32)
RETURNS TEXT
LANGUAGE sql
AS $$ SELECT encode(public.gen_random_bytes(GREATEST(p_bytes, 16)), 'hex'); $$;

CREATE OR REPLACE FUNCTION auth.definir_senha(p_user_id BIGINT, p_plain_password TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth, pg_temp
AS $$
BEGIN
  IF p_plain_password IS NULL OR char_length(p_plain_password) < 8 THEN
    RAISE EXCEPTION 'Senha deve ter no mínimo 8 caracteres';
  END IF;

  UPDATE auth.user_credentials
     SET password_hash = public.crypt(p_plain_password, public.gen_salt('bf')),
         password_updated_at = now(),
         updated_at = now(),
         deleted_at = NULL
   WHERE user_id = p_user_id AND deleted_at IS NULL;

  IF NOT FOUND THEN
    INSERT INTO auth.user_credentials (user_id, password_hash, password_updated_at)
    VALUES (p_user_id, public.crypt(p_plain_password, public.gen_salt('bf')), now());
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION auth.autenticar_usuario(p_email CITEXT, p_plain_password TEXT)
RETURNS TABLE (user_id BIGINT, nome TEXT, email CITEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth, pg_temp
AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.name::TEXT, u.email
  FROM auth.users u
  JOIN auth.user_credentials c ON c.user_id = u.id AND c.deleted_at IS NULL
   WHERE u.deleted_at IS NULL
     AND u.is_active = TRUE
     AND u.email = p_email
    AND c.password_hash = public.crypt(p_plain_password, c.password_hash);
END;
$$;

CREATE OR REPLACE FUNCTION auth.emitir_refresh_token(
  p_user_id BIGINT,
  p_user_agent TEXT DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_ttl INTERVAL DEFAULT interval '30 days'
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth, pg_temp
AS $$
DECLARE
  v_token TEXT;
BEGIN
  v_token := auth.gerar_token_aleatorio(48);
  INSERT INTO auth.refresh_tokens (user_id, token_hash, expires_at, user_agent, ip_address)
  VALUES (p_user_id, auth.hash_token_sha256(v_token), now() + p_ttl, p_user_agent, p_ip_address);
  RETURN v_token;
END;
$$;

CREATE OR REPLACE FUNCTION auth.revogar_refresh_token(p_token_plain TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth, pg_temp
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  UPDATE auth.refresh_tokens
     SET revoked_at = now(), updated_at = now()
   WHERE token_hash = auth.hash_token_sha256(p_token_plain)
     AND revoked_at IS NULL
     AND deleted_at IS NULL;
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count > 0;
END;
$$;

CREATE OR REPLACE FUNCTION auth.emitir_token_reset_senha(
  p_user_id BIGINT,
  p_ttl INTERVAL DEFAULT interval '30 minutes',
  p_ip INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth, pg_temp
AS $$
DECLARE
  v_token TEXT;
BEGIN
  v_token := auth.gerar_token_aleatorio(48);
  INSERT INTO auth.password_reset_tokens (user_id, token_hash, expires_at, requested_ip, user_agent)
  VALUES (p_user_id, auth.hash_token_sha256(v_token), now() + p_ttl, p_ip, p_user_agent);
  RETURN v_token;
END;
$$;

CREATE OR REPLACE FUNCTION auth.consumir_token_reset_senha(p_token_plain TEXT)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth, pg_temp
AS $$
DECLARE
  v_user_id BIGINT;
BEGIN
  UPDATE auth.password_reset_tokens
     SET used_at = now()
   WHERE token_hash = auth.hash_token_sha256(p_token_plain)
     AND used_at IS NULL
     AND expires_at > now()
     AND deleted_at IS NULL
  RETURNING user_id INTO v_user_id;
  RETURN v_user_id;
END;
$$;

CREATE OR REPLACE FUNCTION audit.registrar_evento()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_actor BIGINT;
  v_record_id BIGINT;
BEGIN
  BEGIN
    v_actor := NULLIF(current_setting('app.user_id', true), '')::BIGINT;
  EXCEPTION WHEN others THEN
    v_actor := NULL;
  END;

  IF TG_OP = 'INSERT' THEN
    v_record_id := NULLIF(to_jsonb(NEW)->>'id','')::BIGINT;
    INSERT INTO audit.events(actor_user_id, action, table_name, record_id, before_data, after_data, external_source)
    VALUES (v_actor, TG_OP, TG_TABLE_SCHEMA||'.'||TG_TABLE_NAME, v_record_id, NULL, to_jsonb(NEW), to_jsonb(NEW)->>'external_source');
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    v_record_id := NULLIF(to_jsonb(NEW)->>'id','')::BIGINT;
    INSERT INTO audit.events(actor_user_id, action, table_name, record_id, before_data, after_data, external_source)
    VALUES (v_actor, TG_OP, TG_TABLE_SCHEMA||'.'||TG_TABLE_NAME, v_record_id, to_jsonb(OLD), to_jsonb(NEW), coalesce(to_jsonb(NEW)->>'external_source', to_jsonb(OLD)->>'external_source'));
    RETURN NEW;
  ELSE
    v_record_id := NULLIF(to_jsonb(OLD)->>'id','')::BIGINT;
    INSERT INTO audit.events(actor_user_id, action, table_name, record_id, before_data, after_data, external_source)
    VALUES (v_actor, TG_OP, TG_TABLE_SCHEMA||'.'||TG_TABLE_NAME, v_record_id, to_jsonb(OLD), NULL, to_jsonb(OLD)->>'external_source');
    RETURN OLD;
  END IF;
END;
$$;

DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'grupos_empresariais','categorias_pessoa_empresa','setores','ramos_atividade',
    'pessoas_empresas','pessoas_empresas_ramos','classificacao_grupos','classificacao_categorias',
    'classificacao_classes','unidades_medida','embalagens','marcas','fabricantes',
    'produtos_servicos','produtos_servicos_marcas','produtos_servicos_fabricantes'
  ]
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_%I_updated_at ON app.%I', t, t);
    EXECUTE format('CREATE TRIGGER trg_%I_updated_at BEFORE UPDATE ON app.%I FOR EACH ROW EXECUTE FUNCTION app.tg_set_updated_at()', t, t);
  END LOOP;
END $$;

DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['users','user_credentials','refresh_tokens','roles','permissions','role_permissions','user_roles']
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_auth_%I_updated_at ON auth.%I', t, t);
    EXECUTE format('CREATE TRIGGER trg_auth_%I_updated_at BEFORE UPDATE ON auth.%I FOR EACH ROW EXECUTE FUNCTION app.tg_set_updated_at()', t, t);
  END LOOP;
END $$;

DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'grupos_empresariais','categorias_pessoa_empresa','setores','ramos_atividade',
    'pessoas_empresas','classificacao_grupos','classificacao_categorias','classificacao_classes',
    'unidades_medida','embalagens','produtos_servicos','marcas','fabricantes'
  ]
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_%I_audit ON app.%I', t, t);
    EXECUTE format('CREATE TRIGGER trg_%I_audit AFTER INSERT OR UPDATE OR DELETE ON app.%I FOR EACH ROW EXECUTE FUNCTION audit.registrar_evento()', t, t);
  END LOOP;
END $$;

GRANT EXECUTE ON FUNCTION auth.autenticar_usuario(CITEXT, TEXT) TO app_authenticator;
GRANT EXECUTE ON FUNCTION auth.definir_senha(BIGINT, TEXT) TO app_authenticator;
GRANT EXECUTE ON FUNCTION auth.emitir_refresh_token(BIGINT, TEXT, INET, INTERVAL) TO app_authenticator;
GRANT EXECUTE ON FUNCTION auth.revogar_refresh_token(TEXT) TO app_authenticator;
GRANT EXECUTE ON FUNCTION auth.emitir_token_reset_senha(BIGINT, INTERVAL, INET, TEXT) TO app_authenticator;
GRANT EXECUTE ON FUNCTION auth.consumir_token_reset_senha(TEXT) TO app_authenticator;
