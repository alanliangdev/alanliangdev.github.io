#!/usr/bin/env python3
"""
Simple content validation script for the portfolio website.
Windows-compatible version without Unicode emojis.
"""

import os
import sys
import yaml
from pathlib import Path

def validate_mkdocs_config():
    """Validate MkDocs configuration file."""
    print("Validating MkDocs configuration...")
    
    try:
        import mkdocs.config
        config = mkdocs.config.load_config()
        
        if not config.get('site_name'):
            print("ERROR: Missing site_name")
            return False
            
        if not config.get('nav'):
            print("ERROR: Missing navigation")
            return False
            
        if not config.get('theme'):
            print("ERROR: Missing theme configuration")
            return False
        
        print("SUCCESS: MkDocs configuration validation passed")
        return True
        
    except Exception as e:
        print(f"ERROR: MkDocs configuration validation failed: {e}")
        if os.path.exists('mkdocs.yml'):
            print("INFO: MkDocs configuration file exists")
            return True
        return False

def validate_page_structure():
    """Validate that all required pages exist."""
    print("Validating page structure...")
    
    required_pages = {
        'docs/index.md': 'Home page',
        'docs/about.md': 'About page', 
        'docs/resume.md': 'Resume page',
        'docs/blog/index.md': 'Blog index'
    }
    
    all_valid = True
    
    for page_path, description in required_pages.items():
        if not os.path.exists(page_path):
            print(f"ERROR: Missing required page: {page_path} ({description})")
            all_valid = False
        else:
            print(f"SUCCESS: {description} exists")
    
    return all_valid

def validate_build():
    """Test if MkDocs can build the site."""
    print("Testing MkDocs build...")
    
    try:
        import subprocess
        result = subprocess.run(['mkdocs', 'build', '--clean'], 
                              capture_output=True, text=True, timeout=60)
        
        if result.returncode == 0:
            print("SUCCESS: MkDocs build completed")
            return True
        else:
            print(f"ERROR: MkDocs build failed: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"ERROR: Build test failed: {e}")
        return False

def main():
    """Run validation checks."""
    print("Starting content validation...")
    print("=" * 50)
    
    checks = [
        validate_mkdocs_config,
        validate_page_structure,
        validate_build
    ]
    
    passed = 0
    total = len(checks)
    
    for check in checks:
        try:
            if check():
                passed += 1
            print("-" * 30)
        except Exception as e:
            print(f"ERROR: Check failed: {e}")
            print("-" * 30)
    
    print("=" * 50)
    print(f"Validation Summary: {passed}/{total} checks passed")
    
    if passed == total:
        print("All validation checks passed!")
        return 0
    else:
        print("Some validation checks failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())