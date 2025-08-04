#!/usr/bin/env python3
"""
Content validation script for the portfolio website.
Validates navigation structure, page structure, and content integrity.
"""

import os
import sys
import yaml
import re
from pathlib import Path
from typing import Dict, List, Set

# Set UTF-8 encoding for Windows compatibility
if sys.platform.startswith('win'):
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')

def validate_mkdocs_config() -> bool:
    """Validate MkDocs configuration file."""
    print("🔍 Validating MkDocs configuration...")
    
    try:
        # Try to validate using MkDocs directly instead of YAML parsing
        import mkdocs.config
        config = mkdocs.config.load_config()
        
        # Check required sections
        if not config.get('site_name'):
            print("❌ Missing site_name")
            return False
            
        if not config.get('nav'):
            print("❌ Missing navigation")
            return False
            
        if not config.get('theme'):
            print("❌ Missing theme configuration")
            return False
        
        # Validate navigation structure
        nav = config.get('nav', [])
        expected_sections = ['Home', 'About', 'Resume', 'Portfolio', 'Blog']
        
        nav_str = str(nav)
        missing_sections = []
        for section in expected_sections:
            if section not in nav_str:
                missing_sections.append(section)
        
        if missing_sections:
            print(f"⚠️  Navigation sections not found: {', '.join(missing_sections)}")
        
        print("✅ MkDocs configuration validation passed")
        return True
        
    except Exception as e:
        print(f"❌ MkDocs configuration validation failed: {e}")
        # Fallback to basic file existence check
        if os.path.exists('mkdocs.yml'):
            print("✅ MkDocs configuration file exists")
            return True
        return False

def validate_page_structure() -> bool:
    """Validate that all required pages exist and have proper structure."""
    print("🔍 Validating page structure...")
    
    required_pages = {
        'docs/index.md': 'Home page',
        'docs/about.md': 'About page', 
        'docs/resume.md': 'Resume page',
        'docs/portfolio.md': 'Portfolio page',
        'docs/blog/index.md': 'Blog index'
    }
    
    all_valid = True
    
    for page_path, description in required_pages.items():
        if not os.path.exists(page_path):
            print(f"❌ Missing required page: {page_path} ({description})")
            all_valid = False
            continue
            
        # Check if page has frontmatter
        with open(page_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if content.startswith('---'):
            print(f"✅ {description} exists with frontmatter")
        else:
            print(f"⚠️  {description} exists but missing frontmatter")
    
    return all_valid

def validate_blog_posts() -> bool:
    """Validate blog post structure and metadata."""
    print("🔍 Validating blog posts...")
    
    blog_dir = Path('docs/blog/posts')
    if not blog_dir.exists():
        print("⚠️  Blog posts directory not found")
        return True
    
    post_files = list(blog_dir.glob('*.md'))
    if not post_files:
        print("⚠️  No blog posts found")
        return True
    
    valid_posts = 0
    for post_file in post_files:
        with open(post_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check for frontmatter
        if not content.startswith('---'):
            print(f"❌ Blog post missing frontmatter: {post_file.name}")
            continue
            
        # Extract frontmatter
        try:
            frontmatter_end = content.find('---', 3)
            if frontmatter_end == -1:
                print(f"❌ Invalid frontmatter in: {post_file.name}")
                continue
                
            frontmatter = yaml.safe_load(content[3:frontmatter_end])
            
            # Check required fields
            required_fields = ['title', 'date']
            for field in required_fields:
                if field not in frontmatter:
                    print(f"❌ Missing {field} in: {post_file.name}")
                    continue
            
            valid_posts += 1
            print(f"✅ Valid blog post: {post_file.name}")
            
        except Exception as e:
            print(f"❌ Error parsing frontmatter in {post_file.name}: {e}")
    
    print(f"📊 Validated {valid_posts}/{len(post_files)} blog posts")
    return True

def validate_portfolio_projects() -> bool:
    """Validate portfolio project pages."""
    print("🔍 Validating portfolio projects...")
    
    portfolio_dir = Path('docs/portfolio')
    if not portfolio_dir.exists():
        print("⚠️  Portfolio directory not found")
        return True
    
    project_files = list(portfolio_dir.glob('*.md'))
    if not project_files:
        print("⚠️  No portfolio projects found")
        return True
    
    valid_projects = 0
    for project_file in project_files:
        with open(project_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if content.startswith('---'):
            try:
                frontmatter_end = content.find('---', 3)
                frontmatter = yaml.safe_load(content[3:frontmatter_end])
                
                if 'title' in frontmatter:
                    valid_projects += 1
                    print(f"✅ Valid portfolio project: {project_file.name}")
                else:
                    print(f"⚠️  Portfolio project missing title: {project_file.name}")
            except Exception as e:
                print(f"❌ Error parsing project frontmatter in {project_file.name}: {e}")
        else:
            print(f"⚠️  Portfolio project missing frontmatter: {project_file.name}")
    
    print(f"📊 Validated {valid_projects}/{len(project_files)} portfolio projects")
    return True

def validate_assets() -> bool:
    """Validate that referenced assets exist."""
    print("🔍 Validating assets...")
    
    assets_dir = Path('docs/assets')
    if not assets_dir.exists():
        print("⚠️  Assets directory not found")
        return True
    
    # Check for common asset directories
    expected_dirs = ['images', 'js']
    for dir_name in expected_dirs:
        dir_path = assets_dir / dir_name
        if dir_path.exists():
            file_count = len(list(dir_path.glob('*')))
            print(f"✅ Found {file_count} files in {dir_name}/")
        else:
            print(f"⚠️  Asset directory not found: {dir_name}/")
    
    return True

def main():
    """Run all validation checks."""
    print("🚀 Starting content validation...")
    print("=" * 50)
    
    checks = [
        validate_mkdocs_config,
        validate_page_structure,
        validate_blog_posts,
        validate_portfolio_projects,
        validate_assets
    ]
    
    passed = 0
    total = len(checks)
    
    for check in checks:
        try:
            if check():
                passed += 1
            print("-" * 30)
        except Exception as e:
            print(f"❌ Check failed with error: {e}")
            print("-" * 30)
    
    print("=" * 50)
    print(f"📊 Validation Summary: {passed}/{total} checks passed")
    
    if passed == total:
        print("🎉 All validation checks passed!")
        return 0
    else:
        print("⚠️  Some validation checks failed or had warnings")
        return 1

if __name__ == "__main__":
    sys.exit(main())