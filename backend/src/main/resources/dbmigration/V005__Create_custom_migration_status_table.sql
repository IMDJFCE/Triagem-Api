CREATE TABLE custom_migration_status (
    id SERIAL PRIMARY KEY,
    migrated BOOLEAN NOT NULL DEFAULT FALSE
);