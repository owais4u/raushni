#!/bin/bash

echo "🧹 Cleaning up Docker environment..."

# Stop all containers
docker-compose down -v

# Remove all stopped containers
docker container prune -f

# Remove all unused networks
docker network prune -f

# Check and kill processes using required ports
for port in 5432 5433 6379 5000 8000 3000; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "Port $port is in use. Attempting to free it..."
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
    fi
done

# Stop local PostgreSQL if running
brew services stop postgresql 2>/dev/null || true

# Clean Docker cache
docker system prune -f

echo "✅ Cleanup complete! Starting services..."

# Start services
docker-compose up --build