#!/bin/sh
set -eu

TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/postgres}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_USER="${DB_USER:-postgres}"
DB_LIST="${DB_LIST:-raushni_backend raushni_cms}"

mkdir -p "$BACKUP_DIR"

for DB in $DB_LIST; do
  FILE="$BACKUP_DIR/${DB}_${TIMESTAMP}.sql.gz"
  echo "[backup] dumping $DB -> $FILE"
  pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB" | gzip > "$FILE"
done

echo "[backup] done"
