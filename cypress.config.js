const { defineConfig } = require("cypress");


module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // Configure the proxy
      config.baseUrl = 'http://localhost:8080'; // ZAP proxy port
      return config;
    },
    baseUrl: 'http://localhost:8080', // ZAP proxy port
  },
};