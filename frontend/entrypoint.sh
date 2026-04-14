#!/bin/sh
set -e

# Check if backend is ready
echo "Waiting for backend..."
while ! nc -z backend 8000; do
  sleep 1
done
echo "Backend is ready"

# Check if CMS is ready (if enabled)
if [ "$ENABLE_CMS" = "true" ]; then
  echo "Waiting for CMS..."
  while ! nc -z strapi 1337; do
    sleep 1
  done
  echo "CMS is ready"
fi

# Start application
exec "$@"