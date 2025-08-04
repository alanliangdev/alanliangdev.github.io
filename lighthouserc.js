module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:8000/',
        'http://localhost:8000/about/',
        'http://localhost:8000/resume/',
        'http://localhost:8000/portfolio/',
        'http://localhost:8000/blog/'
      ],
      startServerCommand: 'mkdocs serve --dev-addr=localhost:8000',
      startServerReadyPattern: 'Serving on',
      startServerReadyTimeout: 30000,
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        'categories:pwa': 'off'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};