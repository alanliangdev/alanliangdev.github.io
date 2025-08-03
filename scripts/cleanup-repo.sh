#!/bin/bash

# Repository cleanup script
# This script removes the generated site folder from version control

set -e

echo "🧹 Cleaning up repository..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Please run this script from the repository root."
    exit 1
fi

# Remove site folder from git tracking if it exists
if [ -d "site" ]; then
    echo "📁 Removing site folder from git tracking..."
    git rm -r site/ --cached 2>/dev/null || true
    echo "✅ Site folder removed from git tracking"
else
    echo "ℹ️  Site folder not found - nothing to remove"
fi

# Check if .gitignore exists and contains site/
if [ -f ".gitignore" ]; then
    if grep -q "^site/$" .gitignore; then
        echo "✅ .gitignore already contains site/ entry"
    else
        echo "📝 Adding site/ to .gitignore..."
        echo "" >> .gitignore
        echo "# MkDocs generated site folder" >> .gitignore
        echo "site/" >> .gitignore
        echo "✅ Added site/ to .gitignore"
    fi
else
    echo "❌ .gitignore file not found. Please create one first."
    exit 1
fi

# Stage the .gitignore changes
echo "📝 Staging .gitignore changes..."
git add .gitignore

echo ""
echo "✅ Repository cleanup completed!"
echo ""
echo "Next steps:"
echo "1. Review the changes: git status"
echo "2. Commit the changes: git commit -m 'Remove site folder from version control and update .gitignore'"
echo "3. Push the changes: git push origin main"
echo ""
echo "The site folder will now be ignored by git and regenerated during deployment."