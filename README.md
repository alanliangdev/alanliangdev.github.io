# Alan Liang's Personal Website

This is my personal website built with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) and hosted on GitHub Pages.

## Features

- 🎨 Responsive design that works on all devices
- 🌓 Dark/light mode toggle with system preference detection
- 📝 Blog with categories, tags, and search functionality
- 💼 Portfolio showcase with interactive filtering
- 🎯 Custom styling with enhanced animations and micro-interactions
- ⚡ Optimized for performance and accessibility
- 🔍 Full-text search capabilities
- 📱 Mobile-first responsive design

## Quick Start

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
scripts\dev-server.bat
```

**Linux/macOS:**
```bash
chmod +x scripts/dev-server.sh
./scripts/dev-server.sh
```

### Option 2: Manual Setup

1. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/macOS
   source venv/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start development server:**
   ```bash
   mkdocs serve
   ```

4. **Open your browser to:** http://127.0.0.1:8000

## Project Structure

```
.
├── docs/                     # 📁 Source content and assets
│   ├── assets/               # 🎨 Static assets
│   │   ├── images/           # 🖼️ Image files
│   │   │   ├── blog/         # Blog post images
│   │   │   └── ...           # Portfolio and other images
│   │   ├── js/               # 📜 JavaScript files
│   │   │   ├── portfolio-filter.js
│   │   │   ├── blog-filter.js
│   │   │   └── theme-toggle.js
│   │   └── favicon.svg       # Site favicon
│   ├── blog/                 # 📝 Blog content
│   │   ├── posts/            # Individual blog posts
│   │   ├── .authors.yml      # Author information
│   │   └── index.md          # Blog landing page
│   ├── portfolio/            # 💼 Portfolio projects
│   │   ├── index.md          # Portfolio landing page
│   │   └── *.md              # Individual project pages
│   ├── stylesheets/          # 🎨 CSS stylesheets
│   │   └── custom.css        # Enhanced custom styles
│   ├── about.md              # About page
│   ├── index.md              # 🏠 Home page
│   ├── resume.md             # 📄 Resume page
│   └── 404.md                # 404 error page
├── .github/                  # ⚙️ GitHub configuration
│   └── workflows/            # GitHub Actions workflows
│       └── deploy-mkdocs.yml # 🚀 Automated deployment
├── scripts/                  # 🔧 Development scripts
│   ├── dev-server.sh         # Linux/macOS dev server
│   ├── dev-server.bat        # Windows dev server
│   ├── build.sh              # Linux/macOS build script
│   └── build.bat             # Windows build script
├── .kiro/                    # 🤖 Kiro AI specifications
├── requirements.txt          # 📦 Python dependencies
├── mkdocs.yml                # ⚙️ MkDocs configuration
├── .gitignore                # 🚫 Git ignore rules
└── README.md                 # 📖 This documentation
```

> **Note:** The `site/` folder is automatically generated during build and should not be committed to version control.

## Building for Production

### Automated Build

**Windows:**
```bash
scripts\build.bat
```

**Linux/macOS:**
```bash
chmod +x scripts/build.sh
./scripts/build.sh
```

### Manual Build

```bash
# Activate virtual environment
source venv/bin/activate  # Linux/macOS
# or
venv\Scripts\activate     # Windows

# Build the site
mkdocs build --clean
```

The built site will be in the `site/` directory.

## Deployment

### Automatic Deployment (GitHub Pages)

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch using GitHub Actions. The workflow:

1. ✅ **Validates** the MkDocs configuration
2. 🏗️ **Builds** the site using `mkdocs build`
3. 🧪 **Tests** the build on pull requests
4. 🚀 **Deploys** to GitHub Pages on main branch pushes

### Manual Deployment

If you need to deploy manually:

```bash
mkdocs gh-deploy --force
```

## Development Workflow

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Start development server:**
   ```bash
   ./scripts/dev-server.sh  # or dev-server.bat on Windows
   ```

3. **Make your changes** and test locally

4. **Build and test:**
   ```bash
   ./scripts/build.sh  # or build.bat on Windows
   ```

5. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add your feature"
   git push origin feature/your-feature-name
   ```

6. **Create a pull request** - The CI will automatically test your changes

## Customization

### Content Updates
- **Home page:** Edit `docs/index.md`
- **About page:** Edit `docs/about.md`
- **Resume:** Edit `docs/resume.md`
- **Blog posts:** Add new `.md` files in `docs/blog/posts/`
- **Portfolio projects:** Add new `.md` files in `docs/portfolio/`

### Styling
- **Custom CSS:** Modify `docs/stylesheets/custom.css`
- **Theme colors:** Update the color variables in the CSS file
- **Layout:** Modify templates in the theme (advanced)

### Configuration
- **Site settings:** Edit `mkdocs.yml`
- **Navigation:** Update the `nav` section in `mkdocs.yml`
- **Plugins:** Add/remove plugins in `mkdocs.yml` and `requirements.txt`

### Adding New Features
- **JavaScript:** Add files to `docs/assets/js/`
- **Images:** Add files to `docs/assets/images/`
- **Fonts:** Update the theme configuration in `mkdocs.yml`

## Troubleshooting

### Common Issues

**Build fails with missing dependencies:**
```bash
pip install -r requirements.txt
```

**Site not updating locally:**
```bash
# Clear the site folder and rebuild
rm -rf site/  # Linux/macOS
rmdir /s site  # Windows
mkdocs build
```

**GitHub Pages not updating:**
- Check the Actions tab in your GitHub repository
- Ensure the workflow completed successfully
- GitHub Pages may take a few minutes to update

### Getting Help

- 📖 [MkDocs Documentation](https://www.mkdocs.org/)
- 🎨 [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- 🐛 [Report Issues](https://github.com/alanliangdev/alanliangdev.github.io/issues)

## License

This project is licensed under the MIT License - see the LICENSE file for details.