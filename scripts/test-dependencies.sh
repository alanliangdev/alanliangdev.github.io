#!/bin/bash

# Test dependencies script
# This script tests if all dependencies can be installed successfully

set -e

echo "🧪 Testing dependency installation..."

# Create a temporary virtual environment for testing
TEMP_VENV="temp_test_venv"

if [ -d "$TEMP_VENV" ]; then
    rm -rf "$TEMP_VENV"
fi

echo "📦 Creating temporary virtual environment..."
python3 -m venv "$TEMP_VENV"

# Activate virtual environment
source "$TEMP_VENV/bin/activate"

echo "⬇️  Installing dependencies..."
pip install --upgrade pip

# Test if requirements.txt can be installed
if pip install -r requirements.txt; then
    echo "✅ All dependencies installed successfully!"
    
    # Test if MkDocs can run
    if mkdocs --version; then
        echo "✅ MkDocs is working correctly!"
    else
        echo "❌ MkDocs installation failed"
        exit 1
    fi
    
    # Test if configuration is valid
    if mkdocs config > /dev/null 2>&1; then
        echo "✅ MkDocs configuration is valid!"
    else
        echo "❌ MkDocs configuration is invalid"
        exit 1
    fi
    
else
    echo "❌ Dependency installation failed!"
    exit 1
fi

# Cleanup
deactivate
rm -rf "$TEMP_VENV"

echo ""
echo "🎉 All dependency tests passed!"
echo "✅ requirements.txt is working correctly"