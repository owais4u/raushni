#!/bin/bash
set -e

# Wait for PostgreSQL
echo "Waiting for PostgreSQL..."
while ! nc -z postgres 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

# Wait for Redis
echo "Waiting for Redis..."
while ! nc -z redis 6379; do
  sleep 0.1
done
echo "Redis started"

# Run database migrations
echo "Running database migrations..."
alembic upgrade head

# Seed initial data if needed
if [ "$SEED_DATABASE" = "true" ]; then
    echo "Seeding database..."
    python scripts/seed_data.py
fi

# Start application
exec "$@"