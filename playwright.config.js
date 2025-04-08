const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  webServer: {
    command: 'hugo server -D',
    port: 1313,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:1313',
    screenshot: 'only-on-failure',
  },
  reporter: 'html',
});
