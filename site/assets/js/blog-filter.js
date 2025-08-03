// Blog filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing blog filters');
    initializeBlogFilters();
});

// Additional initialization for GitHub Pages
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBlogFilters);
} else {
    // DOM is already loaded
    console.log('DOM already loaded, initializing blog filters immediately');
    initializeBlogFilters();
}

// Fallback initialization
setTimeout(function() {
    if ((window.location.pathname.includes('/blog/') || window.location.pathname.endsWith('/blog/index.html')) && 
        document.getElementById('blog-filters')) {
        console.log('Blog filters fallback initialization');
        initializeBlogFilters();
    }
}, 1000);

function initializeBlogFilters() {
    const filterContainer = document.getElementById('blog-filters');
    
    // Check if we're on the blog index page
    if (!filterContainer || !window.location.pathname.includes('/blog/')) {
        return;
    }

    // For MkDocs Material blog, we need to extract categories and tags from the page content
    const blogPosts = document.querySelectorAll('.md-blog-post, article.md-content__inner, .md-typeset article');
    
    if (blogPosts.length === 0) {
        // If no blog posts found, try to get them from blog post links
        const blogLinks = document.querySelectorAll('a[href*="/blog/"]');
        if (blogLinks.length === 0) {
            return;
        }
    }

    // Extract categories and tags from the current page or predefined lists
    const categories = new Set(['AWS', 'Kubernetes', 'DevOps', 'Cloud', 'Platform Engineering', 'Cost Optimization', 'GitOps', 'CI/CD', 'ArgoCD']);
    const tags = new Set(['kubernetes', 'aws', 'cost', 'optimization', 'finops', 'cloud-economics', 'gitops', 'argocd', 'deployment', 'automation', 'scaling', 'enterprise', 'platform', 'multi-tenancy', 'governance', 'lessons-learned', 'best-practices', 'managed-services']);

    // Create filter controls
    createFilterControls(filterContainer, categories, tags);
    
    // Add event listeners for filtering
    addFilterEventListeners();
}

function createFilterControls(container, categories, tags) {
    const filterHTML = `
        <div class="blog-filter-section">
            <h3>Filter Posts</h3>
            
            <div class="filter-group">
                <h4>Categories</h4>
                <div class="filter-buttons" id="category-filters">
                    <button class="filter-btn active" data-filter="all" data-type="category">All</button>
                    ${Array.from(categories).map(cat => 
                        `<button class="filter-btn" data-filter="${cat}" data-type="category">${cat}</button>`
                    ).join('')}
                </div>
            </div>
            
            <div class="filter-group">
                <h4>Tags</h4>
                <div class="filter-buttons" id="tag-filters">
                    <button class="filter-btn active" data-filter="all" data-type="tag">All</button>
                    ${Array.from(tags).map(tag => 
                        `<button class="filter-btn" data-filter="${tag}" data-type="tag">${tag}</button>`
                    ).join('')}
                </div>
            </div>
            
            <div class="filter-actions">
                <button id="clear-filters" class="clear-btn">Clear All Filters</button>
            </div>
        </div>
    `;
    
    container.innerHTML = filterHTML;
}

function addFilterEventListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clearButton = document.getElementById('clear-filters');
    
    let activeFilters = {
        category: 'all',
        tag: 'all'
    };
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.dataset.type;
            const filterValue = this.dataset.filter;
            
            // Update active filters
            activeFilters[filterType] = filterValue;
            
            // Update button states
            updateButtonStates(filterType, filterValue);
            
            // Apply filters
            applyFilters(activeFilters);
            
            // Update post count
            updatePostCount();
        });
    });
    
    clearButton.addEventListener('click', function() {
        activeFilters = { category: 'all', tag: 'all' };
        
        // Reset all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === 'all') {
                btn.classList.add('active');
            }
        });
        
        // Show all posts
        const blogPosts = getBlogPosts();
        blogPosts.forEach(post => {
            post.style.display = 'block';
            post.classList.remove('filtered-out');
        });
        
        updatePostCount();
    });
}

function updateButtonStates(filterType, filterValue) {
    const typeButtons = document.querySelectorAll(`[data-type="${filterType}"]`);
    
    typeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filterValue) {
            btn.classList.add('active');
        }
    });
}

function getBlogPosts() {
    // Get blog post elements from MkDocs Material blog structure
    return document.querySelectorAll('.md-blog-post, .md-typeset article, a[href*="/blog/20"]');
}

function applyFilters(activeFilters) {
    const blogPosts = getBlogPosts();
    
    blogPosts.forEach(post => {
        let showPost = true;
        
        // Get post content for filtering
        const postText = post.textContent.toLowerCase();
        const postHref = post.href || '';
        
        // Check category filter
        if (activeFilters.category !== 'all') {
            const categoryMatch = postText.includes(activeFilters.category.toLowerCase()) ||
                                postHref.includes(activeFilters.category.toLowerCase().replace(/\s+/g, '-'));
            showPost = showPost && categoryMatch;
        }
        
        // Check tag filter
        if (activeFilters.tag !== 'all') {
            const tagMatch = postText.includes(activeFilters.tag.toLowerCase()) ||
                           postHref.includes(activeFilters.tag.toLowerCase());
            showPost = showPost && tagMatch;
        }
        
        // Show/hide post with animation
        if (showPost) {
            post.style.display = 'block';
            post.classList.remove('filtered-out');
            setTimeout(() => post.classList.add('fade-in'), 10);
        } else {
            post.classList.add('filtered-out');
            setTimeout(() => {
                if (post.classList.contains('filtered-out')) {
                    post.style.display = 'none';
                }
            }, 300);
        }
    });
}

function updatePostCount() {
    const blogPosts = getBlogPosts();
    const visiblePosts = Array.from(blogPosts).filter(post => 
        post.style.display !== 'none' && !post.classList.contains('filtered-out')
    );
    
    let countElement = document.getElementById('post-count');
    if (!countElement) {
        countElement = document.createElement('div');
        countElement.id = 'post-count';
        countElement.className = 'post-count';
        
        const filterContainer = document.getElementById('blog-filters');
        if (filterContainer) {
            filterContainer.appendChild(countElement);
        }
    }
    
    const totalPosts = blogPosts.length;
    const visibleCount = visiblePosts.length;
    
    countElement.textContent = `Showing ${visibleCount} of ${totalPosts} posts`;
}

// Search functionality enhancement
function enhanceBlogSearch() {
    const searchInput = document.querySelector('.md-search__input');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (!searchInput || blogPosts.length === 0) {
        return;
    }
    
    // Add custom search behavior for blog posts
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length < 2) {
            blogPosts.forEach(post => {
                post.style.display = 'block';
                post.classList.remove('search-filtered');
            });
            return;
        }
        
        blogPosts.forEach(post => {
            const title = post.querySelector('h2, h3')?.textContent.toLowerCase() || '';
            const content = post.textContent.toLowerCase();
            const categories = post.dataset.categories?.toLowerCase() || '';
            const tags = post.dataset.tags?.toLowerCase() || '';
            
            const matches = title.includes(searchTerm) || 
                          content.includes(searchTerm) || 
                          categories.includes(searchTerm) || 
                          tags.includes(searchTerm);
            
            if (matches) {
                post.style.display = 'block';
                post.classList.remove('search-filtered');
            } else {
                post.classList.add('search-filtered');
                post.style.display = 'none';
            }
        });
    });
}

// Initialize search enhancement when DOM is ready
document.addEventListener('DOMContentLoaded', enhanceBlogSearch);