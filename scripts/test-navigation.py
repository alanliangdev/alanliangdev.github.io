#!/usr/bin/env python3
"""
Navigation and Cross-Page Functionality Test Script
Tests all internal links, navigation flow, and responsive design elements
"""

import os
import re
import sys
import yaml
from pathlib import Path
from urllib.parse import urljoin, urlparse

class NavigationTester:
    def __init__(self, docs_dir="docs"):
        self.docs_dir = Path(docs_dir)
        self.errors = []
        self.warnings = []
        self.tested_links = set()
        
    def load_mkdocs_config(self):
        """Load MkDocs configuration"""
        try:
            with open("mkdocs.yml", "r", encoding="utf-8") as f:
                content = f.read()
                # Replace environment variables that cause YAML parsing issues
                content = re.sub(r'!ENV\s+\w+', '"ENV_PLACEHOLDER"', content)
                return yaml.safe_load(content)
        except Exception as e:
            self.warnings.append(f"Could not fully parse mkdocs.yml: {e}")
            return {}
    
    def get_all_markdown_files(self):
        """Get all markdown files in the docs directory"""
        md_files = []
        for file_path in self.docs_dir.rglob("*.md"):
            if file_path.is_file():
                md_files.append(file_path)
        return md_files
    
    def extract_links_from_file(self, file_path):
        """Extract all internal links from a markdown file"""
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Extract markdown links [text](url) - but exclude code blocks and template syntax
            # First, remove code blocks and template syntax to avoid false positives
            content_no_code = re.sub(r'```.*?```', '', content, flags=re.DOTALL)
            content_no_code = re.sub(r'`[^`]*`', '', content_no_code)
            content_no_code = re.sub(r'\{\{[^}]*\}\}', '', content_no_code)  # Remove Jinja2 template syntax
            
            # Extract markdown links [text](url)
            markdown_links = re.findall(r'\[([^\]]*)\]\(([^)]+)\)', content_no_code)
            
            # Extract HTML links href="url"
            html_links = re.findall(r'href=["\']([^"\']+)["\']', content_no_code)
            
            links = []
            
            # Process markdown links
            for text, url in markdown_links:
                # Skip if it looks like a Python function call or variable
                if not (url.isalpha() and len(url) < 20 and not '/' in url and not '.' in url):
                    if self.is_internal_link(url):
                        links.append({
                            'text': text,
                            'url': url,
                            'type': 'markdown',
                            'file': file_path
                        })
            
            # Process HTML links
            for url in html_links:
                if self.is_internal_link(url):
                    links.append({
                        'text': '',
                        'url': url,
                        'type': 'html',
                        'file': file_path
                    })
            
            return links
            
        except Exception as e:
            self.errors.append(f"Failed to read {file_path}: {e}")
            return []
    
    def is_internal_link(self, url):
        """Check if a link is internal (not external)"""
        # Skip external links, anchors, and special links
        if (url.startswith('http://') or 
            url.startswith('https://') or 
            url.startswith('mailto:') or
            url.startswith('#') or
            url.startswith('javascript:')):
            return False
        return True
    
    def normalize_link(self, url, source_file):
        """Normalize a link to check if the target file exists"""
        # Remove anchors
        url = url.split('#')[0]
        
        # Handle relative paths
        if url.startswith('./'):
            url = url[2:]
        elif url.startswith('../'):
            # Handle parent directory references
            source_dir = source_file.parent
            while url.startswith('../'):
                url = url[3:]
                source_dir = source_dir.parent
            url = source_dir / url
        else:
            # Relative to source file directory
            if not url.startswith('/'):
                url = source_file.parent / url
            else:
                # Absolute path from docs root
                url = self.docs_dir / url.lstrip('/')
        
        return Path(url)
    
    def check_link_target(self, link):
        """Check if a link target exists"""
        url = link['url']
        source_file = link['file']
        
        # Normalize the target path
        target_path = self.normalize_link(url, source_file)
        
        # Check if it's a markdown file without extension
        if not target_path.suffix and not target_path.exists():
            md_target = target_path.with_suffix('.md')
            if md_target.exists():
                target_path = md_target
        
        # Check if target exists
        if target_path.exists():
            return True, str(target_path)
        
        # Check if it's a directory with index.md
        if target_path.is_dir():
            index_file = target_path / 'index.md'
            if index_file.exists():
                return True, str(index_file)
        
        # Check if it's referencing a built HTML file
        if url.endswith('.html'):
            md_file = self.docs_dir / url.replace('.html', '.md')
            if md_file.exists():
                return True, str(md_file)
        
        return False, str(target_path)
    
    def test_navigation_structure(self):
        """Test the navigation structure defined in mkdocs.yml"""
        print("Testing navigation structure...")
        
        config = self.load_mkdocs_config()
        nav = config.get('nav', [])
        
        if not nav:
            self.warnings.append("No navigation structure found in mkdocs.yml")
            return
        
        def check_nav_item(item, level=0):
            if isinstance(item, dict):
                for title, path in item.items():
                    if isinstance(path, str):
                        # Check if the file exists
                        file_path = self.docs_dir / path
                        if not file_path.exists():
                            self.errors.append(f"Navigation item '{title}' points to non-existent file: {path}")
                        else:
                            print(f"{'  ' * level}✓ {title} -> {path}")
                    elif isinstance(path, list):
                        print(f"{'  ' * level}📁 {title}")
                        for sub_item in path:
                            check_nav_item(sub_item, level + 1)
            elif isinstance(item, str):
                file_path = self.docs_dir / item
                if not file_path.exists():
                    self.errors.append(f"Navigation item points to non-existent file: {item}")
                else:
                    print(f"{'  ' * level}✓ {item}")
        
        for nav_item in nav:
            check_nav_item(nav_item)
    
    def test_all_internal_links(self):
        """Test all internal links in all markdown files"""
        print("\nTesting internal links...")
        
        md_files = self.get_all_markdown_files()
        total_links = 0
        broken_links = 0
        
        for md_file in md_files:
            links = self.extract_links_from_file(md_file)
            
            for link in links:
                total_links += 1
                link_key = f"{link['file']}:{link['url']}"
                
                if link_key in self.tested_links:
                    continue
                
                self.tested_links.add(link_key)
                
                exists, target = self.check_link_target(link)
                
                if exists:
                    print(f"✓ {link['url']} -> {target}")
                else:
                    broken_links += 1
                    self.errors.append(
                        f"Broken link in {link['file']}: '{link['url']}' -> {target}"
                    )
        
        print(f"\nLink Summary: {total_links} total, {broken_links} broken")
    
    def test_cross_page_references(self):
        """Test specific cross-page references mentioned in requirements"""
        print("\nTesting cross-page references...")
        
        # Test home page links to other sections
        home_file = self.docs_dir / "index.md"
        if home_file.exists():
            with open(home_file, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Check for portfolio links
            if "portfolio/" in content:
                print("✓ Home page links to portfolio")
            else:
                self.warnings.append("Home page should link to portfolio")
            
            # Check for resume links
            if "resume" in content.lower():
                print("✓ Home page links to resume")
            else:
                self.warnings.append("Home page should link to resume")
            
            # Check for blog links
            if "blog/" in content:
                print("✓ Home page links to blog")
            else:
                self.warnings.append("Home page should link to blog")
    
    def test_responsive_design_elements(self):
        """Test for responsive design CSS classes and elements"""
        print("\nTesting responsive design elements...")
        
        css_file = Path("docs/stylesheets/custom.css")
        if css_file.exists():
            with open(css_file, "r", encoding="utf-8") as f:
                css_content = f.read()
            
            # Check for media queries
            media_queries = re.findall(r'@media[^{]+{', css_content)
            if media_queries:
                print(f"✓ Found {len(media_queries)} media queries for responsive design")
            else:
                self.warnings.append("No media queries found in custom.css")
            
            # Check for common responsive classes
            responsive_patterns = [
                r'\.mobile-',
                r'\.tablet-',
                r'\.desktop-',
                r'max-width:\s*\d+px',
                r'min-width:\s*\d+px'
            ]
            
            for pattern in responsive_patterns:
                if re.search(pattern, css_content):
                    print(f"✓ Found responsive pattern: {pattern}")
        else:
            self.warnings.append("Custom CSS file not found")
    
    def test_accessibility_elements(self):
        """Test for accessibility elements in markdown files"""
        print("\nTesting accessibility elements...")
        
        md_files = self.get_all_markdown_files()
        
        for md_file in md_files:
            with open(md_file, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Check for alt text in images
            images = re.findall(r'!\[([^\]]*)\]\([^)]+\)', content)
            for alt_text in images:
                if alt_text.strip():
                    print(f"✓ Image with alt text in {md_file.name}: '{alt_text}'")
                else:
                    self.warnings.append(f"Image without alt text in {md_file}")
            
            # Check for ARIA labels
            aria_labels = re.findall(r'aria-label=["\']([^"\']+)["\']', content)
            if aria_labels:
                print(f"✓ Found {len(aria_labels)} ARIA labels in {md_file.name}")
    
    def test_javascript_functionality(self):
        """Test for JavaScript files and functionality"""
        print("\nTesting JavaScript functionality...")
        
        js_dir = Path("docs/assets/js")
        if js_dir.exists():
            js_files = list(js_dir.glob("*.js"))
            
            for js_file in js_files:
                print(f"✓ Found JavaScript file: {js_file.name}")
                
                # Basic syntax check (very simple)
                with open(js_file, "r", encoding="utf-8") as f:
                    js_content = f.read()
                
                # Check for common patterns
                if "addEventListener" in js_content:
                    print(f"  ✓ {js_file.name} has event listeners")
                
                if "querySelector" in js_content:
                    print(f"  ✓ {js_file.name} uses DOM queries")
        else:
            self.warnings.append("No JavaScript directory found")
    
    def run_all_tests(self):
        """Run all navigation and functionality tests"""
        print("🧪 Starting Navigation and Cross-Page Functionality Tests\n")
        print("=" * 60)
        
        self.test_navigation_structure()
        self.test_all_internal_links()
        self.test_cross_page_references()
        self.test_responsive_design_elements()
        self.test_accessibility_elements()
        self.test_javascript_functionality()
        
        print("\n" + "=" * 60)
        print("📊 Test Results Summary")
        print("=" * 60)
        
        if self.errors:
            print(f"\n❌ {len(self.errors)} Errors found:")
            for error in self.errors:
                print(f"  • {error}")
        
        if self.warnings:
            print(f"\n⚠️  {len(self.warnings)} Warnings:")
            for warning in self.warnings:
                print(f"  • {warning}")
        
        if not self.errors and not self.warnings:
            print("\n✅ All tests passed! Navigation and cross-page functionality working correctly.")
        elif not self.errors:
            print(f"\n✅ All critical tests passed! {len(self.warnings)} minor warnings to address.")
        else:
            print(f"\n❌ {len(self.errors)} critical errors need to be fixed.")
        
        return len(self.errors) == 0

def main():
    """Main function to run the navigation tests"""
    tester = NavigationTester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()