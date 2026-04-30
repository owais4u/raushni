#!/bin/sh
set -eu

: "${PGHOST:=localhost}"
: "${PGPORT:=5432}"
: "${PGUSER:=postgres}"
: "${PGDATABASE:=postgres}"

export PGPASSWORD="${PGPASSWORD:-}"

echo "[db-test] running schema tests"
psql -v ON_ERROR_STOP=1 -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -f /app/tests/test_schema.sql

echo "[db-test] running data tests"
psql -v ON_ERROR_STOP=1 -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -f /app/tests/test_data.sql

echo "[db-test] all tests passed"
