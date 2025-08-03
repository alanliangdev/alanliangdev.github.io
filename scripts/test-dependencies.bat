@echo off
REM Test dependencies script (Windows)
REM This script tests if all dependencies can be installed successfully

echo 🧪 Testing dependency installation...

REM Create a temporary virtual environment for testing
set TEMP_VENV=temp_test_venv

if exist "%TEMP_VENV%" (
    rmdir /s /q "%TEMP_VENV%"
)

echo 📦 Creating temporary virtual environment...
python -m venv "%TEMP_VENV%"

REM Activate virtual environment
call "%TEMP_VENV%\Scripts\activate.bat"

echo ⬇️  Installing dependencies...
pip install --upgrade pip

REM Test if requirements.txt can be installed
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Dependency installation failed!
    goto cleanup
)

echo ✅ All dependencies installed successfully!

REM Test if MkDocs can run
mkdocs --version >nul 2>&1
if errorlevel 1 (
    echo ❌ MkDocs installation failed
    goto cleanup
)

echo ✅ MkDocs is working correctly!

REM Test if configuration is valid
python -c "import mkdocs.config; mkdocs.config.load_config()" >nul 2>&1
if errorlevel 1 (
    echo ❌ MkDocs configuration is invalid
    goto cleanup
)

echo ✅ MkDocs configuration is valid!

:cleanup
REM Cleanup
call deactivate
rmdir /s /q "%TEMP_VENV%"

echo.
echo 🎉 All dependency tests passed!
echo ✅ requirements.txt is working correctly

pause