#!/usr/bin/env python3
"""
Site Optimization Script
Applies final optimizations for production deployment
"""

import os
import re
import sys
from pathlib import Path

class SiteOptimizer:
    def __init__(self, docs_dir="docs"):
        self.docs_dir = Path(docs_dir)
        self.optimizations_applied = []
        
    def add_noopener_to_external_links(self):
        """Add rel='noopener noreferrer' to external links"""
        print("Adding noopener to external links...")
        
        md_files = list(self.docs_dir.glob("**/*.md"))
        
        for md_file in md_files:
            try:
                with open(md_file, "r", encoding="utf-8") as f:
                    content = f.read()
                
                original_content = content
                
                # Find external links without noopener
                external_links = re.findall(
                    r'<a[^>]*href=["\']https?://[^"\']*["\'][^>]*>',
                    content,
                    re.IGNORECASE
                )
                
                for link in external_links:
                    if 'rel=' not in link.lower():
                        # Add rel="noopener noreferrer"
                        new_link = link.replace('>', ' rel="noopener noreferrer">')
                        content = content.replace(link, new_link)
                    elif 'noopener' not in link.lower():
                        # Add noopener to existing rel attribute
                        rel_match = re.search(r'rel=["\']([^"\']*)["\']', link, re.IGNORECASE)
                        if rel_match:
                            old_rel = rel_match.group(1)
                            new_rel = f"{old_rel} noopener noreferrer".strip()
                            new_link = link.replace(rel_match.group(0), f'rel="{new_rel}"')
                            content = content.replace(link, new_link)
                
                if content != original_content:
                    with open(md_file, "w", encoding="utf-8") as f:
                        f.write(content)
                    self.optimizations_applied.append(f"Added noopener to external links in {md_file.name}")
                    
            except Exception as e:
                print(f"Error processing {md_file}: {e}")
    
    def optimize_images(self):
        """Check and suggest image optimizations"""
        print("Checking image optimization...")
        
        image_dir = self.docs_dir / "assets" / "images"
        if not image_dir.exists():
            print("No images directory found")
            return
        
        image_files = list(image_dir.glob("*"))
        large_images = []
        
        for img_file in image_files:
            if img_file.is_file():
                size = img_file.stat().st_size
                if size > 500 * 1024:  # 500KB
                    large_images.append((img_file.name, size))
        
        if large_images:
            print("Large images found (consider optimization):")
            for name, size in large_images:
                print(f"  • {name}: {size / 1024:.1f} KB")
        else:
            print("✓ All images are reasonably sized")
    
    def check_css_optimization(self):
        """Check CSS optimization opportunities"""
        print("Checking CSS optimization...")
        
        css_file = self.docs_dir / "stylesheets" / "custom.css"
        if not css_file.exists():
            print("No custom CSS file found")
            return
        
        try:
            with open(css_file, "r", encoding="utf-8") as f:
                css_content = f.read()
            
            # Check for unused CSS (basic check)
            lines = css_content.split('\n')
            comment_lines = sum(1 for line in lines if line.strip().startswith('/*') or line.strip().startswith('*'))
            empty_lines = sum(1 for line in lines if not line.strip())
            
            total_lines = len(lines)
            content_lines = total_lines - comment_lines - empty_lines
            
            print(f"CSS file stats:")
            print(f"  • Total lines: {total_lines}")
            print(f"  • Content lines: {content_lines}")
            print(f"  • Comment/empty lines: {comment_lines + empty_lines}")
            
            # Check file size
            size = css_file.stat().st_size
            print(f"  • File size: {size / 1024:.1f} KB")
            
            if size > 100 * 1024:  # 100KB
                print("  ⚠️  Consider minifying CSS for production")
            else:
                print("  ✓ CSS file size is reasonable")
                
        except Exception as e:
            print(f"Error analyzing CSS: {e}")
    
    def validate_meta_tags(self):
        """Validate and suggest meta tag improvements"""
        print("Validating meta tags...")
        
        md_files = list(self.docs_dir.glob("**/*.md"))
        
        for md_file in md_files:
            try:
                with open(md_file, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Check for frontmatter
                if content.startswith('---'):
                    frontmatter_end = content.find('---', 3)
                    if frontmatter_end > 0:
                        frontmatter = content[3:frontmatter_end]
                        
                        # Check for essential meta tags
                        has_title = 'title:' in frontmatter
                        has_description = 'description:' in frontmatter
                        has_keywords = 'keywords:' in frontmatter
                        
                        missing_meta = []
                        if not has_title:
                            missing_meta.append('title')
                        if not has_description:
                            missing_meta.append('description')
                        if not has_keywords:
                            missing_meta.append('keywords')
                        
                        if missing_meta:
                            print(f"  ⚠️  {md_file.name} missing: {', '.join(missing_meta)}")
                        else:
                            print(f"  ✓ {md_file.name} has complete meta tags")
                            
            except Exception as e:
                print(f"Error checking meta tags in {md_file}: {e}")
    
    def check_performance_best_practices(self):
        """Check for performance best practices"""
        print("Checking performance best practices...")
        
        # Check for lazy loading images
        md_files = list(self.docs_dir.glob("**/*.md"))
        images_without_lazy = 0
        
        for md_file in md_files:
            try:
                with open(md_file, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Find HTML img tags
                img_tags = re.findall(r'<img[^>]*>', content, re.IGNORECASE)
                for img in img_tags:
                    if 'loading=' not in img.lower():
                        images_without_lazy += 1
                        
            except Exception:
                pass
        
        if images_without_lazy > 0:
            print(f"  ⚠️  {images_without_lazy} images could benefit from lazy loading")
        else:
            print("  ✓ Image loading optimization looks good")
        
        # Check JavaScript files
        js_dir = self.docs_dir / "assets" / "js"
        if js_dir.exists():
            js_files = list(js_dir.glob("*.js"))
            print(f"  • Found {len(js_files)} JavaScript files")
            
            large_js = []
            for js_file in js_files:
                size = js_file.stat().st_size
                if size > 50 * 1024:  # 50KB
                    large_js.append((js_file.name, size))
            
            if large_js:
                print("  ⚠️  Large JavaScript files found:")
                for name, size in large_js:
                    print(f"    • {name}: {size / 1024:.1f} KB")
            else:
                print("  ✓ JavaScript file sizes are reasonable")
    
    def generate_optimization_report(self):
        """Generate a final optimization report"""
        print("\n" + "=" * 60)
        print("📊 Site Optimization Report")
        print("=" * 60)
        
        if self.optimizations_applied:
            print(f"\n✅ Applied {len(self.optimizations_applied)} optimizations:")
            for opt in self.optimizations_applied:
                print(f"  • {opt}")
        else:
            print("\n✅ No automatic optimizations were needed")
        
        print("\n🚀 Additional Recommendations:")
        print("  • Consider implementing a CDN for static assets")
        print("  • Enable gzip compression on the web server")
        print("  • Consider implementing service worker for offline functionality")
        print("  • Monitor Core Web Vitals with Google PageSpeed Insights")
        print("  • Set up performance monitoring with tools like Lighthouse CI")
        
        print("\n🔒 Security Recommendations:")
        print("  • Implement Content Security Policy (CSP) headers")
        print("  • Enable HTTPS-only with HSTS headers")
        print("  • Consider implementing Subresource Integrity (SRI) for external resources")
        
        print("\n📈 SEO Recommendations:")
        print("  • Submit sitemap to Google Search Console")
        print("  • Implement structured data for rich snippets")
        print("  • Monitor search performance and optimize based on data")
        
        return True
    
    def run_all_optimizations(self):
        """Run all optimization checks and improvements"""
        print("🚀 Starting Site Optimization\n")
        print("=" * 60)
        
        self.add_noopener_to_external_links()
        self.optimize_images()
        self.check_css_optimization()
        self.validate_meta_tags()
        self.check_performance_best_practices()
        
        return self.generate_optimization_report()

def main():
    """Main function to run site optimizations"""
    optimizer = SiteOptimizer()
    success = optimizer.run_all_optimizations()
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()