// Enhanced blog search functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeBlogSearch();
});

function initializeBlogSearch() {
    const blogContainer = document.querySelector('.md-content');
    const isBlogPage = window.location.pathname.includes('/blog/');
    
    if (!isBlogPage || !blogContainer) {
        return;
    }
    
    // Create enhanced search box for blog
    createBlogSearchBox();
    
    // Enhance existing search functionality
    enhanceGlobalSearch();
    
    // Add search result highlighting
    addSearchHighlighting();
}

function createBlogSearchBox() {
    const blogFilters = document.getElementById('blog-filters');
    if (!blogFilters) {
        return;
    }
    
    const searchHTML = `
        <div class="blog-search-enhancement">
            <input 
                type="text" 
                id="blog-search-input" 
                class="blog-search-box" 
                placeholder="Search blog posts by title, content, categories, or tags..."
                autocomplete="off"
            >
            <i class="fas fa-search search-icon"></i>
        </div>
    `;
    
    // Insert search box before filters
    blogFilters.insertAdjacentHTML('beforebegin', searchHTML);
    
    // Add search functionality
    const searchInput = document.getElementById('blog-search-input');
    const blogPosts = document.querySelectorAll('.md-blog-post, .md-typeset article, a[href*="/blog/20"]');
    
    if (searchInput && blogPosts.length > 0) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performBlogSearch(this.value, blogPosts);
            }, 300);
        });
        
        // Clear search on escape
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                performBlogSearch('', blogPosts);
                this.blur();
            }
        });
    }
}

function performBlogSearch(searchTerm, blogPosts) {
    const term = searchTerm.toLowerCase().trim();
    let visibleCount = 0;
    
    blogPosts.forEach(post => {
        if (term.length < 2) {
            // Show all posts if search term is too short
            showPost(post);
            visibleCount++;
            return;
        }
        
        const title = getPostTitle(post);
        const content = getPostContent(post);
        const categories = getPostCategories(post);
        const tags = getPostTags(post);
        const author = getPostAuthor(post);
        const description = getPostDescription(post);
        
        const searchableText = [title, content, categories, tags, author, description]
            .join(' ')
            .toLowerCase();
        
        if (searchableText.includes(term)) {
            showPost(post);
            highlightSearchTerm(post, term);
            visibleCount++;
        } else {
            hidePost(post);
        }
    });
    
    updateSearchResultCount(visibleCount, blogPosts.length, searchTerm);
}

function getPostTitle(post) {
    const titleElement = post.querySelector('h1, h2, h3, .blog-card-title, .featured-project-title');
    return titleElement ? titleElement.textContent : '';
}

function getPostContent(post) {
    // Get text content but exclude title and metadata
    const clone = post.cloneNode(true);
    const titleElements = clone.querySelectorAll('h1, h2, h3, .blog-card-title, .blog-post-meta');
    titleElements.forEach(el => el.remove());
    return clone.textContent || '';
}

function getPostCategories(post) {
    return post.dataset.categories || 
           post.getAttribute('data-categories') || 
           Array.from(post.querySelectorAll('.blog-category')).map(el => el.textContent).join(' ') ||
           '';
}

function getPostTags(post) {
    return post.dataset.tags || 
           post.getAttribute('data-tags') || 
           Array.from(post.querySelectorAll('.blog-tag')).map(el => el.textContent).join(' ') ||
           '';
}

function getPostAuthor(post) {
    const authorElement = post.querySelector('.blog-author, [data-author]');
    return authorElement ? (authorElement.textContent || authorElement.dataset.author || '') : '';
}

function getPostDescription(post) {
    const descElement = post.querySelector('.blog-card-description, .featured-project-description, .blog-excerpt');
    return descElement ? descElement.textContent : '';
}

function showPost(post) {
    post.style.display = 'block';
    post.classList.remove('search-filtered', 'search-hidden');
    post.classList.add('search-visible');
}

function hidePost(post) {
    post.classList.add('search-filtered', 'search-hidden');
    post.classList.remove('search-visible');
    setTimeout(() => {
        if (post.classList.contains('search-hidden')) {
            post.style.display = 'none';
        }
    }, 300);
}

function highlightSearchTerm(post, term) {
    if (!term || term.length < 2) {
        removeHighlights(post);
        return;
    }
    
    const walker = document.createTreeWalker(
        post,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                // Skip script and style elements
                const parent = node.parentElement;
                if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (node.textContent.toLowerCase().includes(term)) {
            textNodes.push(node);
        }
    }
    
    textNodes.forEach(textNode => {
        const parent = textNode.parentElement;
        if (parent && !parent.classList.contains('search-highlight')) {
            const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
            const highlightedText = textNode.textContent.replace(regex, '<mark class="search-highlight">$1</mark>');
            
            if (highlightedText !== textNode.textContent) {
                const wrapper = document.createElement('span');
                wrapper.innerHTML = highlightedText;
                parent.replaceChild(wrapper, textNode);
            }
        }
    });
}

function removeHighlights(post) {
    const highlights = post.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentElement;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateSearchResultCount(visibleCount, totalCount, searchTerm) {
    let countElement = document.getElementById('search-result-count');
    
    if (!countElement) {
        countElement = document.createElement('div');
        countElement.id = 'search-result-count';
        countElement.className = 'search-result-count';
        
        const searchBox = document.querySelector('.blog-search-enhancement');
        if (searchBox) {
            searchBox.appendChild(countElement);
        }
    }
    
    if (searchTerm && searchTerm.length >= 2) {
        countElement.textContent = `Found ${visibleCount} of ${totalCount} posts matching "${searchTerm}"`;
        countElement.style.display = 'block';
    } else {
        countElement.style.display = 'none';
    }
}

function enhanceGlobalSearch() {
    // Enhance the global MkDocs search for better blog post indexing
    const globalSearchInput = document.querySelector('.md-search__input');
    
    if (globalSearchInput) {
        // Add blog-specific search enhancements
        globalSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // If we're on a blog page, also trigger local search
            if (window.location.pathname.includes('/blog/')) {
                const blogSearchInput = document.getElementById('blog-search-input');
                if (blogSearchInput && blogSearchInput.value !== this.value) {
                    blogSearchInput.value = this.value;
                    const blogPosts = document.querySelectorAll('.md-blog-post, .md-typeset article, a[href*="/blog/20"]');
                    performBlogSearch(this.value, blogPosts);
                }
            }
        });
    }
}

function addSearchHighlighting() {
    // Add CSS for search highlighting if not already present
    if (!document.getElementById('search-highlight-styles')) {
        const style = document.createElement('style');
        style.id = 'search-highlight-styles';
        style.textContent = `
            .search-highlight {
                background-color: var(--md-accent-fg-color--transparent);
                color: var(--md-accent-fg-color);
                padding: 0.1em 0.2em;
                border-radius: 3px;
                font-weight: 600;
            }
            
            .search-result-count {
                margin-top: 0.5rem;
                font-size: 0.9rem;
                color: var(--md-default-fg-color--light);
                font-style: italic;
                text-align: center;
            }
            
            .search-visible {
                animation: searchFadeIn 0.3s ease-out;
            }
            
            .search-hidden {
                opacity: 0;
                transform: scale(0.98);
                transition: all 0.3s ease;
            }
            
            @keyframes searchFadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Enhanced search box focus styles */
            .blog-search-box:focus {
                outline: none;
                border-color: var(--md-primary-fg-color);
                box-shadow: 0 0 0 3px var(--md-primary-fg-color--transparent);
            }
            
            /* Search loading state */
            .blog-search-enhancement.searching .search-icon::before {
                content: "\\f110";
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Export functions for potential external use
window.blogSearch = {
    performBlogSearch,
    highlightSearchTerm,
    removeHighlights
};