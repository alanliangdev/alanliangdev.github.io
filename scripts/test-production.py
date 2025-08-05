#!/usr/bin/env python3
"""
Production Site Testing Script
Comprehensive testing for production deployment readiness
"""

import os
import re
import sys
import json
import time
import subprocess
from pathlib import Path
from urllib.parse import urljoin, urlparse

class ProductionTester:
    def __init__(self, site_dir="site"):
        self.site_dir = Path(site_dir)
        self.errors = []
        self.warnings = []
        self.performance_issues = []
        
    def test_build_process(self):
        """Test the MkDocs build process"""
        print("Testing build process...")
        
        try:
            # Clean build
            result = subprocess.run(
                ["mkdocs", "build", "--strict", "--clean"],
                capture_output=True,
                text=True,
                timeout=60
            )
            
            if result.returncode == 0:
                print("✓ Build process completed successfully")
                if result.stderr:
                    print(f"  Build warnings: {result.stderr}")
            else:
                self.errors.append(f"Build failed: {result.stderr}")
                return False
                
        except subprocess.TimeoutExpired:
            self.errors.append("Build process timed out after 60 seconds")
            return False
        except Exception as e:
            self.errors.append(f"Build process error: {e}")
            return False
            
        return True
    
    def test_generated_files(self):
        """Test that all expected files are generated"""
        print("\nTesting generated files...")
        
        if not self.site_dir.exists():
            self.errors.append(f"Site directory {self.site_dir} does not exist")
            return False
        
        # Check for essential files (accounting for use_directory_urls: false)
        essential_files = [
            "index.html",
            "about.html",
            "resume.html",
            "portfolio/index.html",
            "blog/index.html",
            "sitemap.xml",
            "robots.txt"
        ]
        
        for file_path in essential_files:
            full_path = self.site_dir / file_path
            if full_path.exists():
                print(f"✓ Found {file_path}")
            else:
                self.errors.append(f"Missing essential file: {file_path}")
        
        # Check for assets
        assets_dir = self.site_dir / "assets"
        if assets_dir.exists():
            print("✓ Assets directory exists")
            
            # Check for CSS and JS files
            css_files = list(assets_dir.glob("**/*.css"))
            js_files = list(assets_dir.glob("**/*.js"))
            
            if css_files:
                print(f"✓ Found {len(css_files)} CSS files")
            else:
                self.warnings.append("No CSS files found in assets")
                
            if js_files:
                print(f"✓ Found {len(js_files)} JavaScript files")
            else:
                self.warnings.append("No JavaScript files found in assets")
        else:
            self.warnings.append("Assets directory not found")
    
    def test_html_validity(self):
        """Test HTML validity and structure"""
        print("\nTesting HTML validity...")
        
        html_files = list(self.site_dir.glob("**/*.html"))
        
        for html_file in html_files[:10]:  # Test first 10 files to avoid overwhelming output
            # Skip template files
            if html_file.name == "main.html" or "overrides" in str(html_file):
                continue
                
            try:
                with open(html_file, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Basic HTML structure checks
                if not re.search(r'<!doctype html>|<!DOCTYPE html>', content, re.IGNORECASE):
                    self.warnings.append(f"Missing DOCTYPE in {html_file.name}")
                
                if not re.search(r'<html[^>]*>', content, re.IGNORECASE):
                    self.errors.append(f"Missing HTML tag in {html_file.name}")
                
                if not re.search(r'<head[^>]*>', content, re.IGNORECASE):
                    self.errors.append(f"Missing HEAD tag in {html_file.name}")
                
                if not re.search(r'<body[^>]*>', content, re.IGNORECASE):
                    self.errors.append(f"Missing BODY tag in {html_file.name}")
                
                # Check for meta viewport
                if not re.search(r'<meta[^>]*viewport[^>]*>', content, re.IGNORECASE):
                    self.warnings.append(f"Missing viewport meta tag in {html_file.name}")
                
                # Check for title tag
                if not re.search(r'<title>[^<]+</title>', content, re.IGNORECASE):
                    self.warnings.append(f"Missing or empty title tag in {html_file.name}")
                
                print(f"✓ Basic HTML structure valid for {html_file.name}")
                
            except Exception as e:
                self.errors.append(f"Error reading {html_file}: {e}")
    
    def test_internal_links(self):
        """Test internal links in generated HTML"""
        print("\nTesting internal links in generated HTML...")
        
        html_files = list(self.site_dir.glob("**/*.html"))
        broken_links = 0
        total_links = 0
        
        for html_file in html_files:
            # Skip template files
            if html_file.name == "main.html" or "overrides" in str(html_file):
                continue
                
            try:
                with open(html_file, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Find all href attributes
                links = re.findall(r'href=["\']([^"\']+)["\']', content)
                
                for link in links:
                    # Skip external links and anchors
                    if (link.startswith('http') or 
                        link.startswith('mailto:') or 
                        link.startswith('#') or
                        link.startswith('javascript:')):
                        continue
                    
                    total_links += 1
                    
                    # Resolve relative links
                    if link.startswith('/'):
                        target_path = self.site_dir / link.lstrip('/')
                    else:
                        target_path = html_file.parent / link
                    
                    # Handle different URL structures
                    if target_path.is_dir():
                        target_path = target_path / "index.html"
                    elif not target_path.suffix:
                        # Try both directory/index.html and file.html patterns
                        dir_path = target_path / "index.html"
                        html_path = target_path.with_suffix('.html')
                        
                        if dir_path.exists():
                            target_path = dir_path
                        elif html_path.exists():
                            target_path = html_path
                        else:
                            target_path = target_path / "index.html"  # Default for error reporting
                    
                    if not target_path.exists():
                        broken_links += 1
                        self.errors.append(f"Broken link in {html_file.name}: {link}")
                        
            except Exception as e:
                self.warnings.append(f"Error checking links in {html_file}: {e}")
        
        if broken_links == 0:
            print(f"✓ All {total_links} internal links are valid")
        else:
            print(f"❌ Found {broken_links} broken links out of {total_links} total")
    
    def test_performance_metrics(self):
        """Test performance-related metrics"""
        print("\nTesting performance metrics...")
        
        # Check file sizes
        large_files = []
        total_size = 0
        
        for file_path in self.site_dir.rglob("*"):
            if file_path.is_file():
                size = file_path.stat().st_size
                total_size += size
                
                # Flag large files
                if size > 1024 * 1024:  # 1MB
                    large_files.append((file_path.name, size))
        
        print(f"✓ Total site size: {total_size / (1024*1024):.2f} MB")
        
        if large_files:
            print("⚠️  Large files found:")
            for filename, size in large_files:
                print(f"  • {filename}: {size / (1024*1024):.2f} MB")
                self.performance_issues.append(f"Large file: {filename} ({size / (1024*1024):.2f} MB)")
        
        # Check for minified CSS/JS
        css_files = list(self.site_dir.glob("**/*.css"))
        js_files = list(self.site_dir.glob("**/*.js"))
        
        unminified_css = 0
        unminified_js = 0
        
        for css_file in css_files:
            try:
                with open(css_file, "r", encoding="utf-8") as f:
                    content = f.read()
                    # Simple check for minification (no newlines in large files)
                    if len(content) > 1000 and content.count('\n') > len(content) / 100:
                        unminified_css += 1
            except Exception:
                pass
        
        for js_file in js_files:
            try:
                with open(js_file, "r", encoding="utf-8") as f:
                    content = f.read()
                    if len(content) > 1000 and content.count('\n') > len(content) / 100:
                        unminified_js += 1
            except Exception:
                pass
        
        if unminified_css > 0:
            self.performance_issues.append(f"{unminified_css} CSS files appear unminified")
        
        if unminified_js > 0:
            self.performance_issues.append(f"{unminified_js} JavaScript files appear unminified")
    
    def test_seo_optimization(self):
        """Test SEO optimization elements"""
        print("\nTesting SEO optimization...")
        
        html_files = list(self.site_dir.glob("**/*.html"))
        
        for html_file in html_files[:5]:  # Test first 5 files
            # Skip template files
            if html_file.name == "main.html" or "overrides" in str(html_file):
                continue
                
            try:
                with open(html_file, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Check for meta description
                if re.search(r'<meta[^>]*name=["\']description["\'][^>]*>', content, re.IGNORECASE):
                    print(f"✓ Meta description found in {html_file.name}")
                else:
                    self.warnings.append(f"Missing meta description in {html_file.name}")
                
                # Check for Open Graph tags
                og_tags = re.findall(r'<meta[^>]*property=["\']og:[^"\']+["\'][^>]*>', content, re.IGNORECASE)
                if og_tags:
                    print(f"✓ Found {len(og_tags)} Open Graph tags in {html_file.name}")
                else:
                    self.warnings.append(f"No Open Graph tags in {html_file.name}")
                
                # Check for structured data
                if re.search(r'application/ld\+json', content, re.IGNORECASE):
                    print(f"✓ Structured data found in {html_file.name}")
                
                # Check for proper heading hierarchy
                headings = re.findall(r'<h([1-6])[^>]*>', content, re.IGNORECASE)
                if headings:
                    h1_count = headings.count('1')
                    if h1_count == 1:
                        print(f"✓ Proper H1 usage in {html_file.name}")
                    elif h1_count > 1:
                        self.warnings.append(f"Multiple H1 tags in {html_file.name}")
                    elif h1_count == 0:
                        self.warnings.append(f"No H1 tag in {html_file.name}")
                        
            except Exception as e:
                self.warnings.append(f"Error checking SEO in {html_file}: {e}")
    
    def test_accessibility(self):
        """Test accessibility features"""
        print("\nTesting accessibility features...")
        
        html_files = list(self.site_dir.glob("**/*.html"))
        
        for html_file in html_files[:5]:  # Test first 5 files
            # Skip template files
            if html_file.name == "main.html" or "overrides" in str(html_file):
                continue
                
            try:
                with open(html_file, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Check for alt attributes on images
                images = re.findall(r'<img[^>]*>', content, re.IGNORECASE)
                images_without_alt = 0
                
                for img in images:
                    if not re.search(r'alt=["\'][^"\']*["\']', img, re.IGNORECASE):
                        images_without_alt += 1
                
                if images_without_alt > 0:
                    self.warnings.append(f"{images_without_alt} images without alt text in {html_file.name}")
                elif images:
                    print(f"✓ All {len(images)} images have alt text in {html_file.name}")
                
                # Check for ARIA labels
                aria_labels = re.findall(r'aria-label=["\'][^"\']+["\']', content, re.IGNORECASE)
                if aria_labels:
                    print(f"✓ Found {len(aria_labels)} ARIA labels in {html_file.name}")
                
                # Check for skip links
                if re.search(r'skip.*content|skip.*main', content, re.IGNORECASE):
                    print(f"✓ Skip links found in {html_file.name}")
                
            except Exception as e:
                self.warnings.append(f"Error checking accessibility in {html_file}: {e}")
    
    def test_security_headers(self):
        """Test for security-related meta tags and headers"""
        print("\nTesting security features...")
        
        html_files = list(self.site_dir.glob("**/*.html"))
        
        for html_file in html_files[:3]:  # Test first 3 files
            # Skip template files
            if html_file.name == "main.html" or "overrides" in str(html_file):
                continue
                
            try:
                with open(html_file, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Check for CSP meta tag
                if re.search(r'<meta[^>]*http-equiv=["\']Content-Security-Policy["\']', content, re.IGNORECASE):
                    print(f"✓ CSP meta tag found in {html_file.name}")
                
                # Check for X-Frame-Options
                if re.search(r'<meta[^>]*http-equiv=["\']X-Frame-Options["\']', content, re.IGNORECASE):
                    print(f"✓ X-Frame-Options found in {html_file.name}")
                
                # Check for external links with proper rel attributes
                external_links = re.findall(r'<a[^>]*href=["\']https?://[^"\']*["\'][^>]*>', content, re.IGNORECASE)
                unsafe_external_links = 0
                
                for link in external_links:
                    if not re.search(r'rel=["\'][^"\']*noopener[^"\']*["\']', link, re.IGNORECASE):
                        unsafe_external_links += 1
                
                if unsafe_external_links > 0:
                    self.warnings.append(f"{unsafe_external_links} external links without noopener in {html_file.name}")
                elif external_links:
                    print(f"✓ All {len(external_links)} external links have proper rel attributes in {html_file.name}")
                    
            except Exception as e:
                self.warnings.append(f"Error checking security in {html_file}: {e}")
    
    def test_robots_and_sitemap(self):
        """Test robots.txt and sitemap.xml"""
        print("\nTesting robots.txt and sitemap...")
        
        # Check robots.txt
        robots_file = self.site_dir / "robots.txt"
        if robots_file.exists():
            try:
                with open(robots_file, "r", encoding="utf-8") as f:
                    robots_content = f.read()
                
                if "Sitemap:" in robots_content:
                    print("✓ robots.txt contains sitemap reference")
                else:
                    self.warnings.append("robots.txt should reference sitemap")
                
                print("✓ robots.txt exists")
            except Exception as e:
                self.warnings.append(f"Error reading robots.txt: {e}")
        else:
            self.warnings.append("robots.txt not found")
        
        # Check sitemap.xml
        sitemap_file = self.site_dir / "sitemap.xml"
        if sitemap_file.exists():
            try:
                with open(sitemap_file, "r", encoding="utf-8") as f:
                    sitemap_content = f.read()
                
                # Count URLs in sitemap
                urls = re.findall(r'<loc>([^<]+)</loc>', sitemap_content)
                print(f"✓ sitemap.xml contains {len(urls)} URLs")
                
                # Check for proper XML structure
                if re.search(r'<urlset[^>]*xmlns', sitemap_content):
                    print("✓ sitemap.xml has proper XML namespace")
                else:
                    self.warnings.append("sitemap.xml missing proper XML namespace")
                    
            except Exception as e:
                self.warnings.append(f"Error reading sitemap.xml: {e}")
        else:
            self.warnings.append("sitemap.xml not found")
    
    def run_all_tests(self):
        """Run all production readiness tests"""
        print("🧪 Starting Production Readiness Tests\n")
        print("=" * 60)
        
        # Build the site first
        if not self.test_build_process():
            print("❌ Build failed - cannot continue with other tests")
            return False
        
        self.test_generated_files()
        self.test_html_validity()
        self.test_internal_links()
        self.test_performance_metrics()
        self.test_seo_optimization()
        self.test_accessibility()
        self.test_security_headers()
        self.test_robots_and_sitemap()
        
        print("\n" + "=" * 60)
        print("📊 Production Readiness Test Results")
        print("=" * 60)
        
        if self.errors:
            print(f"\n❌ {len(self.errors)} Critical Errors:")
            for error in self.errors:
                print(f"  • {error}")
        
        if self.warnings:
            print(f"\n⚠️  {len(self.warnings)} Warnings:")
            for warning in self.warnings:
                print(f"  • {warning}")
        
        if self.performance_issues:
            print(f"\n🚀 {len(self.performance_issues)} Performance Recommendations:")
            for issue in self.performance_issues:
                print(f"  • {issue}")
        
        if not self.errors and not self.warnings and not self.performance_issues:
            print("\n✅ Site is production ready! All tests passed.")
        elif not self.errors:
            total_issues = len(self.warnings) + len(self.performance_issues)
            print(f"\n✅ Site is production ready! {total_issues} minor optimizations available.")
        else:
            print(f"\n❌ {len(self.errors)} critical issues must be fixed before production deployment.")
        
        return len(self.errors) == 0

def main():
    """Main function to run production tests"""
    tester = ProductionTester()
    success = tester.run_all_tests()
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()