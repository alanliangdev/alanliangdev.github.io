// Blog filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize filtering system
    initializeBlogFilters();
});

function initializeBlogFilters() {
    const filterContainer = document.getElementById('blog-filters');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (!filterContainer || blogPosts.length === 0) {
        return;
    }

    // Extract all categories and tags from blog posts
    const categories = new Set();
    const tags = new Set();
    
    blogPosts.forEach(post => {
        const postCategories = post.dataset.categories ? post.dataset.categories.split(',') : [];
        const postTags = post.dataset.tags ? post.dataset.tags.split(',') : [];
        
        postCategories.forEach(cat => categories.add(cat.trim()));
        postTags.forEach(tag => tags.add(tag.trim()));
    });

    // Create filter controls
    createFilterControls(filterContainer, categories, tags);
    
    // Add event listeners for filtering
    addFilterEventListeners(blogPosts);
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

function addFilterEventListeners(blogPosts) {
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
            applyFilters(blogPosts, activeFilters);
            
            // Update post count
            updatePostCount(blogPosts);
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
        blogPosts.forEach(post => {
            post.style.display = 'block';
            post.classList.remove('filtered-out');
        });
        
        updatePostCount(blogPosts);
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

function applyFilters(blogPosts, activeFilters) {
    blogPosts.forEach(post => {
        const postCategories = post.dataset.categories ? post.dataset.categories.split(',').map(c => c.trim()) : [];
        const postTags = post.dataset.tags ? post.dataset.tags.split(',').map(t => t.trim()) : [];
        
        let showPost = true;
        
        // Check category filter
        if (activeFilters.category !== 'all') {
            showPost = showPost && postCategories.includes(activeFilters.category);
        }
        
        // Check tag filter
        if (activeFilters.tag !== 'all') {
            showPost = showPost && postTags.includes(activeFilters.tag);
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

function updatePostCount(blogPosts) {
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