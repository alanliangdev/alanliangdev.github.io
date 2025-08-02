// Portfolio filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filterValue);
        });
    });
    
    function filterProjects(filterValue) {
        projectCards.forEach(card => {
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
    filterProjects('all');
});