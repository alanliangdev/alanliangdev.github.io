#!/bin/bash

# Development server script for MkDocs portfolio site
# This script sets up a local development environment

set -e

echo "🚀 Starting MkDocs development server..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if pip is installed
if ! command -v pip &> /dev/null; then
    echo "❌ pip is not installed. Please install pip."
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Clean any existing site folder
if [ -d "site" ]; then
    echo "🧹 Cleaning existing site folder..."
    rm -rf site
fi

# Start development server
echo "🌐 Starting development server at http://127.0.0.1:8000"
echo "📝 Press Ctrl+C to stop the server"
echo ""

mkdocs serve --dev-addr=127.0.0.1:8000