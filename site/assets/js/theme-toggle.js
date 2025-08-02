// Function to set the theme preference consistently across all pages
(function() {
  // Apply the theme preference as early as possible to avoid flash
  const preferredTheme = localStorage.getItem('__preferred_theme');
  if (preferredTheme) {
    document.documentElement.setAttribute('data-md-color-scheme', preferredTheme);
  }

  document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.md-header__button[data-md-component=palette]');
    
    if (toggleButton) {
      // Set up a mutation observer to detect theme changes
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.attributeName === 'data-md-color-scheme') {
            const currentTheme = document.documentElement.getAttribute('data-md-color-scheme');
            localStorage.setItem('__preferred_theme', currentTheme);
          }
        });
      });
      
      // Start observing the document for theme changes
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme']
      });
      
      // Also handle direct clicks on the toggle button
      toggleButton.addEventListener('click', function() {
        setTimeout(function() {
          const currentTheme = document.documentElement.getAttribute('data-md-color-scheme');
          localStorage.setItem('__preferred_theme', currentTheme);
        }, 100);
      });
    }
  });
})();