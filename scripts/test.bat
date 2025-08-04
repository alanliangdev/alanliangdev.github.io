@echo off
echo Running comprehensive website tests...
echo =====================================

echo.
echo Running content validation...
python scripts\validate-content.py
if %errorlevel% neq 0 (
    echo Content validation failed!
    exit /b 1
)

echo.
echo Running build test...
mkdocs build --clean --strict
if %errorlevel% neq 0 (
    echo Build test failed!
    exit /b 1
)

echo.
echo All tests completed successfully!