# Database Migrations

Migrations are applied in alphabetical order by filename.

## Adding a new migration

1. Create a new SQL file with a numeric prefix: `003_my_migration.sql`
2. Write your migration (DDL, DML) with proper error handling using `IF NOT EXISTS`
3. Test the migration on a development database
4. Commit the migration file

## Running migrations

Migrations run automatically when the database container starts (files in `/docker-entrypoint-initdb.d/`).

For manual execution:
```bash
docker exec -i raushni-postgres psql -U postgres -d raushni_backend < migration.sql