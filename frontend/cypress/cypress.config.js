const { defineConfig } = require('cypress');


module.exports = {
  e2e: {
    // Configuration for e2e tests
    screenshotOnRunFailure: true, // Capture screenshots on test failure
    video: true, // Record videos of the test runs
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: 'mochawesome', // Reporter for generating detailed reports
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportFilename: 'report',
    overwrite: false,
    html: true,
    json: true
  }
};


