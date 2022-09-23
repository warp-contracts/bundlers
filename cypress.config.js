const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'dtz6tr',
  e2e: {
    supportFile: false,
    video: false,
    screenshotOnRunFailure: false,
    specPattern: './cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    defaultCommandTimeout: 10000,
  },
});
