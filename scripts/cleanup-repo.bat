@echo off
REM Repository cleanup script (Windows)
REM This script removes the generated site folder from version control

echo 🧹 Cleaning up repository...

REM Check if we're in a git repository
if not exist ".git" (
    echo ❌ Not in a git repository. Please run this script from the repository root.
    pause
    exit /b 1
)

REM Remove site folder from git tracking if it exists
if exist "site" (
    echo 📁 Removing site folder from git tracking...
    git rm -r site/ --cached >nul 2>&1
    echo ✅ Site folder removed from git tracking
) else (
    echo ℹ️  Site folder not found - nothing to remove
)

REM Check if .gitignore exists and contains site/
if exist ".gitignore" (
    findstr /C:"site/" .gitignore >nul 2>&1
    if errorlevel 1 (
        echo 📝 Adding site/ to .gitignore...
        echo. >> .gitignore
        echo # MkDocs generated site folder >> .gitignore
        echo site/ >> .gitignore
        echo ✅ Added site/ to .gitignore
    ) else (
        echo ✅ .gitignore already contains site/ entry
    )
) else (
    echo ❌ .gitignore file not found. Please create one first.
    pause
    exit /b 1
)

REM Stage the .gitignore changes
echo 📝 Staging .gitignore changes...
git add .gitignore

echo.
echo ✅ Repository cleanup completed!
echo.
echo Next steps:
echo 1. Review the changes: git status
echo 2. Commit the changes: git commit -m "Remove site folder from version control and update .gitignore"
echo 3. Push the changes: git push origin main
echo.
echo The site folder will now be ignored by git and regenerated during deployment.

pause