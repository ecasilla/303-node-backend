SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'utf8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

CREATE USER todoapp_dev SUPERUSER;

CREATE SCHEMA IF NOT EXISTS todoapp;
ALTER SCHEMA todoapp OWNER to todoapp_dev;
SET search_path = todoapp;
SET default_tablespace = '';
SET default_with_oids = false;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION update_updatedAt_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE IF NOT EXISTS todos_t (
  id UUID DEFAULT todoapp.gen_random_uuid(),
  title VARCHAR(100) NOT NULL,
  description VARCHAR(100),
  completed BOOLEAN DEFAULT FALSE,
  due TIMESTAMP,
  date_completed TIMESTAMP,
  author VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
    --keys
  CONSTRAINT todo_pkey PRIMARY KEY (id)
);

DROP TRIGGER IF EXISTS update_todo_updatedAt ON todos_t;
CREATE TRIGGER update_todo_updatedAt BEFORE UPDATE ON todos_t FOR EACH ROW EXECUTE PROCEDURE update_updatedAt_column();

-- ROLLBACK
-- DROP TABLE IF EXISTS todos_t;
-- DROP TRIGGER IF EXISTS update_todo_updatedAt ON todos_t;
-- DROP SCHEMA IF EXISTS todoapp CASCADE;
-- DROP USER todoapp_dev;