-- file: 07_rls_policies.sql
\connect tawros

ALTER TABLE auth.user_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth.password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth.api_keys ENABLE ROW LEVEL SECURITY;

ALTER TABLE auth.user_credentials FORCE ROW LEVEL SECURITY;
ALTER TABLE auth.refresh_tokens FORCE ROW LEVEL SECURITY;
ALTER TABLE auth.password_reset_tokens FORCE ROW LEVEL SECURITY;
ALTER TABLE auth.api_keys FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS p_deny_user_credentials ON auth.user_credentials;
DROP POLICY IF EXISTS p_deny_refresh_tokens ON auth.refresh_tokens;
DROP POLICY IF EXISTS p_deny_reset_tokens ON auth.password_reset_tokens;
DROP POLICY IF EXISTS p_deny_api_keys ON auth.api_keys;

CREATE POLICY p_deny_user_credentials ON auth.user_credentials FOR ALL USING (false) WITH CHECK (false);
CREATE POLICY p_deny_refresh_tokens ON auth.refresh_tokens FOR ALL USING (false) WITH CHECK (false);
CREATE POLICY p_deny_reset_tokens ON auth.password_reset_tokens FOR ALL USING (false) WITH CHECK (false);
CREATE POLICY p_deny_api_keys ON auth.api_keys FOR ALL USING (false) WITH CHECK (false);

