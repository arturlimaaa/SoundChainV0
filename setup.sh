#!/bin/bash

# soundChain Setup Script
echo "🚀 Setting up soundChain..."

# Check Node.js version
NODE_VERSION=$(node -v | sed 's/v//')
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js >= 18 required. Current version: $NODE_VERSION"
    echo "Please update Node.js and try again."
    exit 1
fi

echo "✅ Node.js version check passed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install workspace dependencies
echo "📦 Installing SDK dependencies..."
npm install --workspace=sdk

echo "📦 Installing API dependencies..."
npm install --workspace=services/api

echo "📦 Installing Web dependencies..."
npm install --workspace=apps/web

# Build SDK
echo "🔨 Building SDK..."
npm run build --workspace=sdk

echo "✅ soundChain setup complete!"
echo ""
echo "🎵 Next steps:"
echo "  1. npm run dev:web    # Start frontend (port 3000)"
echo "  2. npm run dev:api    # Start API server (port 3001)"
echo "  3. Deploy contracts with AlgoKit and paste App IDs into UI"
echo ""
echo "📚 See README.md for full documentation"
