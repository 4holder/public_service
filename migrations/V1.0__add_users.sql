CREATE TABLE IF NOT EXISTS public.users(
    id                    VARCHAR(37) NOT NULL,
    name                  VARCHAR NOT NULL,
    username              VARCHAR NOT NULL,
    email                 VARCHAR NOT NULL,
    active                BOOLEAN NOT NULL default false,
    created_at            timestamptz DEFAULT NOW() NOT NULL,
    modified_at           timestamptz DEFAULT NOW() NOT NULL,
    PRIMARY KEY (id)
);