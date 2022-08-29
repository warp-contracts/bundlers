const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    video: false,
    screenshotOnRunFailure: false,
    specPattern: '../../cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
