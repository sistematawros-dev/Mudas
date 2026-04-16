-- file: 00_prereqs.sql
-- Execute conectado ao banco "postgres"
SELECT 'CREATE DATABASE tawros'
WHERE NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'tawros') \gexec

\connect tawros

CREATE SCHEMA IF NOT EXISTS app;
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS audit;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

