// Portfolio filtering functionality
function initializePortfolioFilters() {
    console.log('🔍 Starting portfolio filter initialization...');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const searchInput = document.getElementById('filter-search');
    const resultsCount = document.getElementById('results-count');
    
    console.log('📊 Found elements:', {
        filterButtons: filterButtons.length,
        projectCards: projectCards.length,
        searchInput: !!searchInput,
        resultsCount: !!resultsCount,
        pathname: window.location.pathname
    });
    
    // Check if we're on the portfolio page and elements exist
    if (filterButtons.length === 0 || projectCards.length === 0) {
        console.log('❌ Portfolio filters not initialized - missing elements');
        return false;
    }
    
    let currentFilter = 'all';
    let currentSearch = '';
    
    // Update results count
    function updateResultsCount(count) {
        if (resultsCount) {
            const text = count === 1 ? '1 project' : `${count} projects`;
            resultsCount.textContent = text;
        }
    }
    
    // Filter function that handles both button filters and search
    function filterProjects(filterValue = currentFilter, searchTerm = currentSearch) {
        console.log('🎯 Filtering projects with:', { filterValue, searchTerm });
        let visibleCount = 0;
        
        projectCards.forEach((card, index) => {
            const technologies = card.getAttribute('data-technologies') || '';
            const title = card.querySelector('.project-title')?.textContent || '';
            const description = card.querySelector('.project-description')?.textContent || '';
            
            let shouldShow = false;
            
            // Check filter match
            if (filterValue === 'all') {
                shouldShow = true;
            } else {
                const techArray = technologies.split(',').map(tech => tech.trim());
                shouldShow = techArray.includes(filterValue);
            }
            
            // Check search match if there's a search term
            if (shouldShow && searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                const titleMatch = title.toLowerCase().includes(searchLower);
                const descMatch = description.toLowerCase().includes(searchLower);
                const techMatch = technologies.toLowerCase().includes(searchLower);
                
                shouldShow = titleMatch || descMatch || techMatch;
            }
            
            if (shouldShow) {
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.classList.remove('filtered-out');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.classList.add('filtered-out');
            }
        });
        
        updateResultsCount(visibleCount);
        console.log(`📈 Filter complete. Visible cards: ${visibleCount}/${projectCards.length}`);
    }
    
    // Add click event listeners to filter buttons
    filterButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const filterValue = this.getAttribute('data-filter');
            console.log('🖱️ Filter button clicked:', filterValue);
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update current filter and apply
            currentFilter = filterValue;
            filterProjects(currentFilter, currentSearch);
        });
    });
    
    // Add search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentSearch = e.target.value.trim();
            console.log('🔍 Search input:', currentSearch);
            filterProjects(currentFilter, currentSearch);
        });
        
        // Clear search on escape
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                currentSearch = '';
                filterProjects(currentFilter, currentSearch);
            }
        });
    }
    
    // Initialize clickable cards
    initializeClickableCards();
    
    // Initialize with all projects visible
    console.log('🚀 Initializing with all projects visible');
    filterProjects('all', '');
    
    console.log('✅ Portfolio filters initialized successfully');
    return true;
}

// Initialize clickable card functionality
function initializeClickableCards() {
    const clickableCards = document.querySelectorAll('.project-card.clickable-card[data-href]');
    console.log('🖱️ Initializing clickable cards:', clickableCards.length);
    
    clickableCards.forEach((card, index) => {
        const href = card.dataset.href;
        const title = card.querySelector('.project-title')?.textContent || 'project';
        
        console.log(`🔗 Setting up card ${index + 1}: ${title} -> ${href}`);
        
        // Add cursor pointer and accessibility attributes
        card.style.cursor = 'pointer';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details for ${title}`);
        
        // Add click event listener
        card.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Card clicked, navigating to:', href);
            if (href) {
                window.location.href = href;
            }
        });
        
        // Add keyboard navigation support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log('⌨️ Keyboard navigation to:', href);
                if (href) {
                    window.location.href = href;
                }
            }
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Focus styles for keyboard navigation
        card.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--portfolio-primary)';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    console.log('✅ Clickable cards initialized successfully');
}

function initializeClickableCards(projectCards) {
    projectCards.forEach(card => {
        // Only add click functionality if the card has the clickable-card class and data-href
        if (card.classList.contains('clickable-card') && card.dataset.href) {
            // Remove any existing click listeners
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
        }
    });
    
    // Get fresh references after cloning
    const clickableCards = document.querySelectorAll('.clickable-card[data-href]');
    
    clickableCards.forEach(card => {
        // Add cursor pointer style and accessibility attributes
        card.style.cursor = 'pointer';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details for ${card.querySelector('.project-title')?.textContent || 'project'}`);
        
        // Add click event listener
        card.addEventListener('click', function(e) {
            // Get the href from data attribute
            const href = this.dataset.href;
            console.log('Card clicked, navigating to:', href);
            if (href) {
                // Navigate to the project page
                window.location.href = href;
            }
        });
        
        // Add keyboard navigation support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const href = this.dataset.href;
                console.log('Keyboard navigation to:', href);
                if (href) {
                    window.location.href = href;
                }
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        // Add focus styles for keyboard navigation
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--md-primary-fg-color)';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Simple initialization approach
function tryInitialize() {
    if (document.querySelector('.portfolio-filters') && document.querySelector('.project-card')) {
        console.log('🎯 Elements found, initializing filters...');
        initializePortfolioFilters();
        return true;
    }
    return false;
}

// Try multiple initialization methods
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM loaded, trying to initialize...');
    if (!tryInitialize()) {
        // Try again after a short delay
        setTimeout(tryInitialize, 500);
    }
});

// Also try when window loads
window.addEventListener('load', function() {
    console.log('🌐 Window loaded, trying to initialize...');
    setTimeout(tryInitialize, 100);
});

// Immediate initialization if DOM is already ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('⚡ DOM already ready, trying immediate initialization...');
    setTimeout(tryInitialize, 100);
}

// Fallback initialization
setTimeout(function() {
    if (window.location.pathname.includes('/portfolio')) {
        console.log('🔄 Fallback initialization attempt...');
        tryInitialize();
    }
}, 1000);