#!/usr/bin/env python3
"""
Responsive Design Test Script
Tests responsive design elements and mobile optimization
"""

import os
import re
import sys
from pathlib import Path

class ResponsiveDesignTester:
    def __init__(self, css_file="docs/stylesheets/custom.css"):
        self.css_file = Path(css_file)
        self.errors = []
        self.warnings = []
        
    def load_css_content(self):
        """Load CSS file content"""
        try:
            with open(self.css_file, "r", encoding="utf-8") as f:
                return f.read()
        except Exception as e:
            self.errors.append(f"Failed to load CSS file: {e}")
            return ""
    
    def test_media_queries(self, css_content):
        """Test for responsive media queries"""
        print("Testing media queries...")
        
        # Find all media queries
        media_queries = re.findall(r'@media[^{]+{', css_content, re.IGNORECASE)
        
        if not media_queries:
            self.errors.append("No media queries found - site may not be responsive")
            return
        
        print(f"✓ Found {len(media_queries)} media queries")
        
        # Check for common breakpoints
        breakpoints = {
            'mobile': r'max-width:\s*768px',
            'tablet': r'max-width:\s*1024px',
            'desktop': r'min-width:\s*1025px'
        }
        
        for device, pattern in breakpoints.items():
            if re.search(pattern, css_content, re.IGNORECASE):
                print(f"✓ Found {device} breakpoint")
            else:
                self.warnings.append(f"No specific {device} breakpoint found")
    
    def test_flexible_layouts(self, css_content):
        """Test for flexible layout properties"""
        print("\nTesting flexible layouts...")
        
        flex_properties = [
            r'display:\s*flex',
            r'display:\s*grid',
            r'flex-wrap:\s*wrap',
            r'grid-template-columns',
            r'justify-content',
            r'align-items'
        ]
        
        for prop in flex_properties:
            if re.search(prop, css_content, re.IGNORECASE):
                print(f"✓ Found flexible layout property: {prop}")
            else:
                self.warnings.append(f"Consider using flexible layout property: {prop}")
    
    def test_responsive_typography(self, css_content):
        """Test for responsive typography"""
        print("\nTesting responsive typography...")
        
        # Check for relative units
        relative_units = [
            r'\d+(\.\d+)?rem',
            r'\d+(\.\d+)?em',
            r'\d+(\.\d+)?%',
            r'\d+(\.\d+)?vw',
            r'\d+(\.\d+)?vh'
        ]
        
        found_relative = False
        for unit in relative_units:
            if re.search(unit, css_content):
                found_relative = True
                break
        
        if found_relative:
            print("✓ Found relative units for responsive typography")
        else:
            self.warnings.append("Consider using relative units (rem, em, %) for better responsiveness")
        
        # Check for font-size adjustments in media queries
        font_adjustments = re.findall(r'@media[^}]*font-size[^}]*}', css_content, re.DOTALL | re.IGNORECASE)
        if font_adjustments:
            print(f"✓ Found {len(font_adjustments)} font-size adjustments in media queries")
        else:
            self.warnings.append("Consider adjusting font sizes for different screen sizes")
    
    def test_responsive_images(self, css_content):
        """Test for responsive image handling"""
        print("\nTesting responsive images...")
        
        image_properties = [
            r'max-width:\s*100%',
            r'width:\s*100%',
            r'height:\s*auto',
            r'object-fit',
            r'background-size:\s*cover',
            r'background-size:\s*contain'
        ]
        
        for prop in image_properties:
            if re.search(prop, css_content, re.IGNORECASE):
                print(f"✓ Found responsive image property: {prop}")
    
    def test_mobile_navigation(self, css_content):
        """Test for mobile navigation patterns"""
        print("\nTesting mobile navigation...")
        
        mobile_nav_patterns = [
            r'hamburger',
            r'menu-toggle',
            r'mobile-menu',
            r'nav.*mobile',
            r'@media.*nav.*display:\s*none',
            r'@media.*nav.*display:\s*block'
        ]
        
        found_mobile_nav = False
        for pattern in mobile_nav_patterns:
            if re.search(pattern, css_content, re.IGNORECASE):
                print(f"✓ Found mobile navigation pattern: {pattern}")
                found_mobile_nav = True
        
        if not found_mobile_nav:
            self.warnings.append("Consider implementing mobile-specific navigation patterns")
    
    def test_touch_friendly_elements(self, css_content):
        """Test for touch-friendly design elements"""
        print("\nTesting touch-friendly elements...")
        
        # Check for adequate button/link sizes
        button_patterns = [
            r'\.button.*min-height:\s*44px',
            r'\.btn.*min-height:\s*44px',
            r'a.*min-height:\s*44px',
            r'button.*padding.*\d+px'
        ]
        
        for pattern in button_patterns:
            if re.search(pattern, css_content, re.IGNORECASE):
                print(f"✓ Found touch-friendly button sizing: {pattern}")
        
        # Check for hover alternatives
        if re.search(r'@media.*hover.*none', css_content, re.IGNORECASE):
            print("✓ Found hover alternatives for touch devices")
        else:
            self.warnings.append("Consider providing alternatives to hover effects for touch devices")
    
    def test_performance_optimizations(self, css_content):
        """Test for performance-related CSS optimizations"""
        print("\nTesting performance optimizations...")
        
        # Check for will-change property
        if re.search(r'will-change', css_content, re.IGNORECASE):
            print("✓ Found will-change property for performance optimization")
        
        # Check for transform3d usage
        if re.search(r'transform3d|translateZ', css_content, re.IGNORECASE):
            print("✓ Found 3D transforms for hardware acceleration")
        
        # Check for efficient selectors (warn about complex ones)
        complex_selectors = re.findall(r'[^{]*\s+[^{]*\s+[^{]*\s+[^{]*{', css_content)
        if len(complex_selectors) > 10:
            self.warnings.append(f"Found {len(complex_selectors)} potentially complex selectors - consider simplifying")
    
    def check_html_files_for_viewport(self):
        """Check HTML files for viewport meta tag"""
        print("\nChecking for viewport meta tags...")
        
        # Check if there's a custom template with viewport
        template_files = list(Path("docs/overrides").glob("*.html")) if Path("docs/overrides").exists() else []
        
        found_viewport = False
        for template in template_files:
            try:
                with open(template, "r", encoding="utf-8") as f:
                    content = f.read()
                    if re.search(r'<meta.*viewport.*width=device-width', content, re.IGNORECASE):
                        print(f"✓ Found viewport meta tag in {template.name}")
                        found_viewport = True
            except Exception:
                pass
        
        if not found_viewport:
            print("ℹ Material theme includes viewport meta tag by default")
    
    def run_all_tests(self):
        """Run all responsive design tests"""
        print("🧪 Starting Responsive Design Tests\n")
        print("=" * 60)
        
        css_content = self.load_css_content()
        
        if not css_content:
            print("❌ Cannot proceed without CSS content")
            return False
        
        self.test_media_queries(css_content)
        self.test_flexible_layouts(css_content)
        self.test_responsive_typography(css_content)
        self.test_responsive_images(css_content)
        self.test_mobile_navigation(css_content)
        self.test_touch_friendly_elements(css_content)
        self.test_performance_optimizations(css_content)
        self.check_html_files_for_viewport()
        
        print("\n" + "=" * 60)
        print("📊 Responsive Design Test Results")
        print("=" * 60)
        
        if self.errors:
            print(f"\n❌ {len(self.errors)} Errors found:")
            for error in self.errors:
                print(f"  • {error}")
        
        if self.warnings:
            print(f"\n⚠️  {len(self.warnings)} Recommendations:")
            for warning in self.warnings:
                print(f"  • {warning}")
        
        if not self.errors and not self.warnings:
            print("\n✅ All responsive design tests passed!")
        elif not self.errors:
            print(f"\n✅ Responsive design is functional! {len(self.warnings)} recommendations for improvement.")
        else:
            print(f"\n❌ {len(self.errors)} critical responsive design issues found.")
        
        return len(self.errors) == 0

def main():
    """Main function to run responsive design tests"""
    tester = ResponsiveDesignTester()
    success = tester.run_all_tests()
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()