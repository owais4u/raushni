#!/bin/bash

echo " Installing dependencies..."

# Install dependencies
npm install

# Install additional TypeScript types
npm install --save-dev @types/node @types/react @types/react-dom

# Create necessary directories
mkdir -p app/components/Layout
mkdir -p app/dashboard
mkdir -p public/assets
mkdir -p types
mkdir -p utils
mkdir -p hooks
mkdir -p services
mkdir -p contexts

echo " Setup complete!"
echo " Run 'npm run dev' to start the development server"