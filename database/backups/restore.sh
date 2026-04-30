#!/bin/bash
set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <backup_file.sql.gz>"
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Backup file not found: $BACKUP_FILE"
    exit 1
fi

echo "Restoring database from $BACKUP_FILE..."

# Drop existing connections
psql -U postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'raushni_backend';" || true

# Drop and recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS raushni_backend;"
psql -U postgres -c "CREATE DATABASE raushni_backend;"

# Restore from backup
gunzip -c "$BACKUP_FILE" | psql -U postgres -d raushni_backend

echo "Restore completed successfully"