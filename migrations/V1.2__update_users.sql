ALTER TABLE public.users RENAME COLUMN name TO first_name;
ALTER TABLE public.users ADD COLUMN last_name VARCHAR;
ALTER TABLE public.users ADD COLUMN picture VARCHAR;
ALTER TABLE public.users ADD COLUMN locale VARCHAR(10);
ALTER TABLE public.users ADD COLUMN external_id VARCHAR(37);

CREATE UNIQUE INDEX external_id_index ON users (external_id);
