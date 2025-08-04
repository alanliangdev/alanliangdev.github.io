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
        // Ensure buttons are keyboard accessible
        if (!button.hasAttribute('tabindex')) {
            button.setAttribute('tabindex', '0');
        }
        if (!button.hasAttribute('role')) {
            button.setAttribute('role', 'button');
        }
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const filterValue = this.getAttribute('data-filter');
            console.log('🖱️ Filter button clicked:', filterValue);
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            
            // Update current filter and apply
            currentFilter = filterValue;
            filterProjects(currentFilter, currentSearch);
        });
        
        // Add keyboard support for filter buttons
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            // Arrow key navigation between filter buttons
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextButton = filterButtons[index + 1] || filterButtons[0];
                nextButton.focus();
            }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevButton = filterButtons[index - 1] || filterButtons[filterButtons.length - 1];
                prevButton.focus();
            }
        });
        
        // Initialize ARIA attributes
        button.setAttribute('aria-pressed', button.classList.contains('active') ? 'true' : 'false');
    });
    
    // Add search functionality
    if (searchInput) {
        // Ensure search input has proper accessibility attributes
        if (!searchInput.hasAttribute('aria-label')) {
            searchInput.setAttribute('aria-label', 'Search portfolio projects');
        }
        if (!searchInput.hasAttribute('aria-describedby')) {
            searchInput.setAttribute('aria-describedby', 'search-help');
        }
        
        // Add search help text if it doesn't exist
        if (!document.getElementById('search-help')) {
            const helpText = document.createElement('div');
            helpText.id = 'search-help';
            helpText.className = 'sr-only';
            helpText.textContent = 'Type to search projects by title, description, or technology. Press Escape to clear.';
            searchInput.parentNode.appendChild(helpText);
        }
        
        searchInput.addEventListener('input', function(e) {
            currentSearch = e.target.value.trim();
            console.log('🔍 Search input:', currentSearch);
            filterProjects(currentFilter, currentSearch);
            
            // Announce search results to screen readers
            if (resultsCount) {
                const announcement = document.createElement('div');
                announcement.setAttribute('aria-live', 'polite');
                announcement.setAttribute('aria-atomic', 'true');
                announcement.className = 'sr-only';
                announcement.textContent = `Search updated. ${resultsCount.textContent} found.`;
                document.body.appendChild(announcement);
                setTimeout(() => document.body.removeChild(announcement), 1000);
            }
        });
        
        // Clear search on escape
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                currentSearch = '';
                filterProjects(currentFilter, currentSearch);
                
                // Announce clearing to screen readers
                const announcement = document.createElement('div');
                announcement.setAttribute('aria-live', 'polite');
                announcement.className = 'sr-only';
                announcement.textContent = 'Search cleared. All projects shown.';
                document.body.appendChild(announcement);
                setTimeout(() => document.body.removeChild(announcement), 1000);
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
    
    if (clickableCards.length === 0) {
        console.log('❌ No clickable cards found');
        return;
    }
    
    clickableCards.forEach((card, index) => {
        const href = card.dataset.href;
        const title = card.querySelector('.project-title')?.textContent || 'project';
        
        console.log(`🔗 Setting up card ${index + 1}: "${title}" -> ${href}`);
        
        // Remove any existing event listeners by cloning the element
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        
        // Work with the new card
        const freshCard = newCard;
        
        // Add cursor pointer and accessibility attributes
        freshCard.style.cursor = 'pointer';
        freshCard.setAttribute('tabindex', '0');
        freshCard.setAttribute('role', 'button');
        freshCard.setAttribute('aria-label', `View details for ${title}`);
        
        // Add click event listener
        freshCard.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('🖱️ Card clicked, navigating to:', href);
            if (href) {
                window.location.href = href;
            }
        });
        
        // Add keyboard navigation support
        freshCard.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                console.log('⌨️ Keyboard navigation to:', href);
                if (href) {
                    window.location.href = href;
                }
            }
            // Add arrow key navigation support
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nextCard = this.parentElement.nextElementSibling?.querySelector('.project-card.clickable-card');
                if (nextCard) {
                    nextCard.focus();
                }
            }
            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevCard = this.parentElement.previousElementSibling?.querySelector('.project-card.clickable-card');
                if (prevCard) {
                    prevCard.focus();
                }
            }
        });
        
        // Enhanced hover effects
        freshCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        freshCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Focus styles for keyboard navigation
        freshCard.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--portfolio-primary)';
            this.style.outlineOffset = '2px';
        });
        
        freshCard.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    console.log('✅ Clickable cards initialized successfully');
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

// Debug function to test card clicks manually
window.testCardClicks = function() {
    console.log('🧪 Testing card clicks...');
    const cards = document.querySelectorAll('.project-card.clickable-card[data-href]');
    console.log('Found cards:', cards.length);
    
    cards.forEach((card, index) => {
        const href = card.dataset.href;
        const title = card.querySelector('.project-title')?.textContent;
        console.log(`Card ${index + 1}: "${title}" -> ${href}`);
        console.log('Has click listener:', card.onclick !== null);
        console.log('Cursor style:', getComputedStyle(card).cursor);
    });
    
    if (cards.length > 0) {
        console.log('🖱️ Try clicking the first card...');
        cards[0].click();
    }
};