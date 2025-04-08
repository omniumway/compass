#!/bin/bash

# Make script executable
chmod +x scripts/*.js

# Make this script executable
chmod +x fix-and-reload.sh

echo "=== Athlete's Compass Fix and Reload ==="
echo ""

# 1. Install gray-matter if not already installed
echo "Checking dependencies..."
if ! pnpm list | grep -q "gray-matter"; then
  echo "Installing gray-matter..."
  pnpm add gray-matter --save-dev
fi

# 2. Ensure directories exist
echo "Creating necessary directories..."
mkdir -p data static/data static/icons

# 3. Create sample data
echo "Creating sample principles data..."
node scripts/setup-sample-data.js

# 4. Generate principles from content
echo "Generating principles from content..."
node scripts/generate-principles.js

# 5. Clear Hugo cache
echo "Clearing Hugo cache..."
rm -rf resources/_gen
rm -f .hugo_build.lock

# 6. Restart Hugo server
echo "Restarting Hugo server..."
pkill -f "hugo server" || true
pnpm run dev
