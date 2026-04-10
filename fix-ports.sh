#!/bin/bash

echo " Fixing port conflicts..."

# Kill processes on common ports
for port in 5000 5001 3000 8000 5432 5433 6379; do
    if lsof -ti:$port > /dev/null 2>&1; then
        echo "Killing process on port $port"
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
    fi
done

# Disable AirPlay Receiver on macOS (temporarily)
if system_profiler SPSoftwareDataType | grep -q "macOS"; then
    echo "Note: If port 5000 is still in use, disable AirPlay Receiver in:"
    echo "System Settings > General > AirDrop & Handoff > AirPlay Receiver"
fi

# Stop all Docker containers
docker-compose down -v

# Clean up
docker system prune -f

echo " Ports cleaned! Starting services..."
docker-compose up --build