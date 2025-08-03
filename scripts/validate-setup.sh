#!/bin/bash

# Setup validation script
# This script validates that the development environment is properly configured

set -e

echo "🔍 Validating MkDocs setup..."

# Check if we're in the right directory
if [ ! -f "mkdocs.yml" ]; then
    echo "❌ mkdocs.yml not found. Please run this script from the repository root."
    exit 1
fi

# Check if .gitignore exists and contains site/
if [ ! -f ".gitignore" ]; then
    echo "❌ .gitignore file not found."
    exit 1
fi

if ! grep -q "^site/$" .gitignore; then
    echo "❌ .gitignore does not contain 'site/' entry."
    exit 1
fi

echo "✅ .gitignore properly configured"

# Check if requirements.txt exists
if [ ! -f "requirements.txt" ]; then
    echo "❌ requirements.txt not found."
    exit 1
fi

echo "✅ requirements.txt found"

# Check if site folder is not tracked by git
if git ls-files | grep -q "^site/"; then
    echo "❌ Site folder is still being tracked by git."
    echo "   Run: git rm -r site/ --cached"
    exit 1
fi

echo "✅ Site folder not tracked by git"

# Check if Python is available
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ Python is not installed or not in PATH."
    exit 1
fi

echo "✅ Python is available"

# Check if virtual environment exists
if [ -d "venv" ]; then
    echo "✅ Virtual environment found"
    
    # Activate virtual environment and check MkDocs
    source venv/bin/activate
    
    if command -v mkdocs &> /dev/null; then
        echo "✅ MkDocs is installed in virtual environment"
        
        # Validate MkDocs configuration
        if mkdocs config > /dev/null 2>&1; then
            echo "✅ MkDocs configuration is valid"
        else
            echo "❌ MkDocs configuration is invalid"
            exit 1
        fi
    else
        echo "⚠️  MkDocs not found in virtual environment"
        echo "   Run: pip install -r requirements.txt"
    fi
    
    deactivate
else
    echo "ℹ️  Virtual environment not found (optional)"
fi

# Check if development scripts exist and are executable
scripts=("dev-server.sh" "build.sh" "cleanup-repo.sh")
for script in "${scripts[@]}"; do
    if [ -f "scripts/$script" ]; then
        echo "✅ Script found: scripts/$script"
    else
        echo "❌ Script missing: scripts/$script"
        exit 1
    fi
done

# Check GitHub Actions workflow
if [ -f ".github/workflows/deploy-mkdocs.yml" ]; then
    echo "✅ GitHub Actions workflow found"
else
    echo "❌ GitHub Actions workflow missing"
    exit 1
fi

# Check essential directories and files
essential_files=(
    "docs/index.md"
    "docs/about.md"
    "docs/resume.md"
    "docs/stylesheets/custom.css"
    "docs/assets/js/portfolio-filter.js"
)

for file in "${essential_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ Essential file found: $file"
    else
        echo "❌ Essential file missing: $file"
        exit 1
    fi
done

echo ""
echo "🎉 All validations passed!"
echo ""
echo "Your MkDocs setup is properly configured:"
echo "• ✅ Site folder excluded from version control"
echo "• ✅ Dependencies properly defined"
echo "• ✅ Development scripts available"
echo "• ✅ GitHub Actions workflow configured"
echo "• ✅ Essential files present"
echo ""
echo "Next steps:"
echo "1. Start development: ./scripts/dev-server.sh"
echo "2. Build for production: ./scripts/build.sh"
echo "3. Commit changes: git commit -m 'Setup automated CI/CD and cleanup repository'"