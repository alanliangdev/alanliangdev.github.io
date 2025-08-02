// Portfolio filtering functionality
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Check if we're on the portfolio page and elements exist
    if (filterButtons.length === 0 || projectCards.length === 0) {
        console.log('Portfolio filters not initialized - missing elements:', {
            filterButtons: filterButtons.length,
            projectCards: projectCards.length,
            pathname: window.location.pathname
        });
        return;
    }
    
    console.log('Initializing portfolio filters:', {
        filterButtons: filterButtons.length,
        projectCards: projectCards.length
    });
    
    // Remove any existing event listeners to prevent duplicates
    filterButtons.forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });
    
    // Get fresh references after cloning
    const freshFilterButtons = document.querySelectorAll('.filter-btn');
    const freshProjectCards = document.querySelectorAll('.project-card');
    
    // Add click event listeners to filter buttons
    freshFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            freshFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filterValue, freshProjectCards);
        });
    });
    
    function filterProjects(filterValue, cards) {
        cards.forEach(card => {
            if (filterValue === 'all') {
                // Show all projects
                card.style.display = 'flex';
                card.classList.remove('filtered-out');
            } else {
                // Check if project has the selected technology
                const technologies = card.getAttribute('data-technologies');
                if (technologies && technologies.includes(filterValue)) {
                    card.style.display = 'flex';
                    card.classList.remove('filtered-out');
                } else {
                    card.style.display = 'none';
                    card.classList.add('filtered-out');
                }
            }
        });
        
        // Add animation class for smooth transitions
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (portfolioGrid) {
            portfolioGrid.classList.add('filtering');
            setTimeout(() => {
                portfolioGrid.classList.remove('filtering');
            }, 300);
        }
    }
    
    // Initialize with all projects visible
    filterProjects('all', freshProjectCards);
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', initializePortfolioFilters);

// Also initialize when page is fully loaded (for MkDocs Material navigation)
window.addEventListener('load', function() {
    setTimeout(initializePortfolioFilters, 100);
});

// Handle MkDocs Material instant navigation
function handleInstantNavigation() {
    // Check if we're on the portfolio page
    if (window.location.pathname.includes('/portfolio') || 
        document.querySelector('.portfolio-filters')) {
        setTimeout(initializePortfolioFilters, 100);
    }
}

// Initialize when navigating with MkDocs Material instant loading
document.addEventListener('DOMContentLoaded', function() {
    // Initial check
    handleInstantNavigation();
    
    // Watch for navigation changes in MkDocs Material
    const observer = new MutationObserver(function(mutations) {
        let shouldReinit = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if portfolio content was added
                for (let node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.querySelector && 
                            (node.querySelector('.portfolio-filters') || 
                             node.classList.contains('portfolio-filters') ||
                             node.querySelector('.project-card'))) {
                            shouldReinit = true;
                            break;
                        }
                    }
                }
            }
        });
        
        if (shouldReinit) {
            setTimeout(initializePortfolioFilters, 200);
        }
    });
    
    // Start observing
    const contentArea = document.querySelector('.md-content') || document.body;
    if (contentArea) {
        observer.observe(contentArea, {
            childList: true,
            subtree: true
        });
    }
});

// Also handle browser navigation events
window.addEventListener('popstate', handleInstantNavigation);
window.addEventListener('hashchange', handleInstantNavigation);

// Fallback initialization - run after a delay to catch any missed cases
setTimeout(function() {
    if (window.location.pathname.includes('/portfolio') && 
        document.querySelector('.portfolio-filters') &&
        !document.querySelector('.filter-btn.active')) {
        console.log('Portfolio filters fallback initialization');
        initializePortfolioFilters();
    }
}, 1000);