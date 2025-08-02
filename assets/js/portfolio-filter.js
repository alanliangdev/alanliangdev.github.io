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
    
    // Add clickable card functionality
    initializeClickableCards(freshProjectCards);
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