// Lighthouse CI: scores every built page (mobile settings, median of 3 runs).
// Reports are written to .lighthouseci/reports (open the .html files to read them).
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      numberOfRuns: 3,
    },
    assert: {
      assertMatrix: [
        {
          matchingUrlPattern: '.*',
          assertions: {
            'categories:performance': ['error', { minScore: 0.9, aggregationMethod: 'median-run' }],
            'categories:accessibility': ['error', { minScore: 1 }],
            'categories:best-practices': ['error', { minScore: 0.95 }],
            'categories:seo': ['error', { minScore: 0.95 }],
          },
        },
      ],
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci/reports',
    },
  },
};
