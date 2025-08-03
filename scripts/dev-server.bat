@echo off
REM Development server script for MkDocs portfolio site (Windows)
REM This script sets up a local development environment

echo 🚀 Starting MkDocs development server...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

REM Check if pip is installed
pip --version >nul 2>&1
if errorlevel 1 (
    echo ❌ pip is not installed. Please install pip.
    pause
    exit /b 1
)

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo 📥 Installing dependencies...
pip install --upgrade pip
pip install -r requirements.txt

REM Clean any existing site folder
if exist "site" (
    echo 🧹 Cleaning existing site folder...
    rmdir /s /q site
)

REM Start development server
echo 🌐 Starting development server at http://127.0.0.1:8000
echo 📝 Press Ctrl+C to stop the server
echo.

mkdocs serve --dev-addr=127.0.0.1:8000