#!/bin/bash

echo "🧹 Cleaning Raushni repository..."

# Remove git history
rm -rf .git

# Create proper .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
dist/
build/
.next/
out/
.target/

# Python
__pycache__/
*.pyc
venv/
.env/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Environment
.env
.env.local
.env.production

# Large binaries
*.node
*.dll
*.exe
*.so
*.dylib

# Docker
*.pid

# Temp files
*.tmp
*.temp
EOF

# Initialize fresh repo
git init

# Add all files (respecting .gitignore)
git add .

# Verify no large files are being added
echo "Checking file sizes..."
git ls-files | xargs -I {} du -sh {} | sort -rh | head -20

# Commit
git commit -m "Initial commit: Clean Raushni platform

- Added backend (Node.js/Express)
- Added frontend (Next.js)
- Added Python document service
- Docker configuration
- Kubernetes manifests
- Terraform infrastructure"

# Add remote
git remote add origin https://github.com/owais4u/raushni.git

# Force push
echo "Pushing to GitHub..."
git push -u origin main --force

echo "Repository cleaned and pushed successfully!"