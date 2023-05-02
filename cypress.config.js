const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://allo.ua',
    viewportHeight: 1080,
    viewportWidth: 1320,
    setupNodeEvents(on, config) {
    },
  },
});
