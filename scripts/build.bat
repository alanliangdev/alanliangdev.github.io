@echo off
REM Build script for MkDocs portfolio site (Windows)
REM This script builds the site for production deployment

echo 🏗️  Building MkDocs site for production...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

REM Activate virtual environment if it exists
if exist "venv" (
    echo 🔧 Activating virtual environment...
    call venv\Scripts\activate.bat
)

REM Install dependencies
echo 📥 Installing dependencies...
pip install --upgrade pip
pip install -r requirements.txt

REM Clean any existing site folder
if exist "site" (
    echo 🧹 Cleaning existing site folder...
    rmdir /s /q site
)

REM Validate configuration
echo ✅ Validating MkDocs configuration...
mkdocs config

REM Build the site
echo 🔨 Building site...
mkdocs build --verbose --clean

REM Check if build was successful
if exist "site\index.html" (
    echo ✅ Build completed successfully!
    echo 📁 Site built in: %cd%\site
    echo.
    echo 🚀 To serve locally: python -m http.server 8000 --directory site
    echo 🌐 Then visit: http://localhost:8000
) else (
    echo ❌ Build failed! Site folder or index.html not found.
    pause
    exit /b 1
)

pause