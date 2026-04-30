#!/bin/bash
set -e

# Create backup directory if not exists
mkdir -p /var/backups/postgres
chown postgres:postgres /var/backups/postgres

# Run original PostgreSQL entrypoint
if [ -f /usr/local/bin/docker-entrypoint.sh ]; then
    source /usr/local/bin/docker-entrypoint.sh
fi

# Wait for PostgreSQL to start
until pg_isready -U postgres; do
    echo "Waiting for PostgreSQL to start..."
    sleep 2
done

# Run additional setup scripts if needed
if [ -f /docker-entrypoint-initdb.d/00-init.sql ]; then
    echo "Initializing database with custom scripts..."
fi

# Start PostgreSQL
exec "$@"