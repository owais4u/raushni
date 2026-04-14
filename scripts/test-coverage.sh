#!/bin/bash

# Generate coverage reports for all services
set -e

echo "📊 Generating coverage reports..."

# Backend coverage
cd backend
pytest tests/ --cov=app --cov-report=html --cov-report=xml
cd ..

# Frontend coverage
cd frontend
npm run test:coverage
cd ..

# Merge coverage reports (if using Codecov)
echo "✅ Coverage reports generated in:"
echo "  - backend/htmlcov/"
echo "  - frontend/coverage/"
echo "  - backend/coverage.xml"
echo "  - frontend/coverage/lcov.info"