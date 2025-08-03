@echo off
REM Setup validation script (Windows)
REM This script validates that the development environment is properly configured

echo 🔍 Validating MkDocs setup...

REM Check if we're in the right directory
if not exist "mkdocs.yml" (
    echo ❌ mkdocs.yml not found. Please run this script from the repository root.
    pause
    exit /b 1
)

REM Check if .gitignore exists and contains site/
if not exist ".gitignore" (
    echo ❌ .gitignore file not found.
    pause
    exit /b 1
)

findstr /C:"site/" .gitignore >nul 2>&1
if errorlevel 1 (
    echo ❌ .gitignore does not contain 'site/' entry.
    pause
    exit /b 1
)

echo ✅ .gitignore properly configured

REM Check if requirements.txt exists
if not exist "requirements.txt" (
    echo ❌ requirements.txt not found.
    pause
    exit /b 1
)

echo ✅ requirements.txt found

REM Check if site folder is not tracked by git
git ls-files | findstr "^site/" >nul 2>&1
if not errorlevel 1 (
    echo ❌ Site folder is still being tracked by git.
    echo    Run: git rm -r site/ --cached
    pause
    exit /b 1
)

echo ✅ Site folder not tracked by git

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH.
    pause
    exit /b 1
)

echo ✅ Python is available

REM Check if virtual environment exists
if exist "venv" (
    echo ✅ Virtual environment found
    
    REM Activate virtual environment and check MkDocs
    call venv\Scripts\activate.bat
    
    mkdocs --version >nul 2>&1
    if not errorlevel 1 (
        echo ✅ MkDocs is installed in virtual environment
        
        REM Validate MkDocs configuration
        python -c "import mkdocs.config; mkdocs.config.load_config()" >nul 2>&1
        if not errorlevel 1 (
            echo ✅ MkDocs configuration is valid
        ) else (
            echo ❌ MkDocs configuration is invalid
            pause
            exit /b 1
        )
    ) else (
        echo ⚠️  MkDocs not found in virtual environment
        echo    Run: pip install -r requirements.txt
    )
    
    call deactivate
) else (
    echo ℹ️  Virtual environment not found (optional)
)

REM Check if development scripts exist
set scripts=dev-server.bat build.bat cleanup-repo.bat
for %%s in (%scripts%) do (
    if exist "scripts\%%s" (
        echo ✅ Script found: scripts\%%s
    ) else (
        echo ❌ Script missing: scripts\%%s
        pause
        exit /b 1
    )
)

REM Check GitHub Actions workflow
if exist ".github\workflows\deploy-mkdocs.yml" (
    echo ✅ GitHub Actions workflow found
) else (
    echo ❌ GitHub Actions workflow missing
    pause
    exit /b 1
)

REM Check essential files
set essential_files=docs\index.md docs\about.md docs\resume.md docs\stylesheets\custom.css docs\assets\js\portfolio-filter.js
for %%f in (%essential_files%) do (
    if exist "%%f" (
        echo ✅ Essential file found: %%f
    ) else (
        echo ❌ Essential file missing: %%f
        pause
        exit /b 1
    )
)

echo.
echo 🎉 All validations passed!
echo.
echo Your MkDocs setup is properly configured:
echo • ✅ Site folder excluded from version control
echo • ✅ Dependencies properly defined
echo • ✅ Development scripts available
echo • ✅ GitHub Actions workflow configured
echo • ✅ Essential files present
echo.
echo Next steps:
echo 1. Test dependencies: scripts\test-dependencies.bat
echo 2. Start development: scripts\dev-server.bat
echo 3. Build for production: scripts\build.bat
echo 4. Commit changes: git commit -m "Setup automated CI/CD and cleanup repository"

pause