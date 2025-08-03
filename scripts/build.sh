#!/bin/bash

# Build script for MkDocs portfolio site
# This script builds the site for production deployment

set -e

echo "🏗️  Building MkDocs site for production..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    echo "🔧 Activating virtual environment..."
    source venv/bin/activate
fi

# Install dependencies
echo "📥 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Clean any existing site folder
if [ -d "site" ]; then
    echo "🧹 Cleaning existing site folder..."
    rm -rf site
fi

# Validate configuration
echo "✅ Validating MkDocs configuration..."
mkdocs config

# Build the site
echo "🔨 Building site..."
mkdocs build --verbose --clean

# Check if build was successful
if [ -d "site" ] && [ -f "site/index.html" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Site built in: $(pwd)/site"
    echo "📊 Site size: $(du -sh site | cut -f1)"
    echo ""
    echo "🚀 To serve locally: python -m http.server 8000 --directory site"
    echo "🌐 Then visit: http://localhost:8000"
else
    echo "❌ Build failed! Site folder or index.html not found."
    exit 1
fi