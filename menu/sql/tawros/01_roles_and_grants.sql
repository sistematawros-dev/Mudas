-- file: 01_roles_and_grants.sql
\connect tawros

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_owner') THEN CREATE ROLE app_owner NOLOGIN; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_authenticator') THEN CREATE ROLE app_authenticator NOLOGIN; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_rw') THEN CREATE ROLE app_rw NOLOGIN; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_ro') THEN CREATE ROLE app_ro NOLOGIN; END IF;
END $$;

ALTER SCHEMA app OWNER TO app_owner;
ALTER SCHEMA auth OWNER TO app_owner;
ALTER SCHEMA audit OWNER TO app_owner;

REVOKE ALL ON SCHEMA app, auth, audit FROM PUBLIC;
GRANT USAGE ON SCHEMA app TO app_rw, app_ro;
GRANT USAGE ON SCHEMA auth TO app_authenticator, app_rw;
GRANT USAGE ON SCHEMA audit TO app_rw, app_ro;

