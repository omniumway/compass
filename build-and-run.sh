#!/bin/bash

# Make scripts executable
chmod +x scripts/*.js

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Create sample data first to ensure we have something to load
echo "Creating sample data..."
node scripts/setup-sample-data.js

# Generate principles.json from content files
echo "Generating principles.json from content..."
node scripts/generate-principles.js

# Start the development server
echo "Starting development server..."
pnpm run dev
