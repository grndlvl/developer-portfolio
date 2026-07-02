import { defineConfig, devices } from '@playwright/test';

/**
 * Accessibility testing Playwright configuration.
 *
 * Runs axe-core WCAG 2.2 AA audits across desktop and mobile viewports.
 * Customize TODO markers before first run.
 */

// Environment-aware base URL detection
// Supports: Lando, DDEV, CI (BUILD_DOMAIN), and fallback
function getBaseUrl(): string {
  if (process.env.BASE_URL) return process.env.BASE_URL;
  if (process.env.BUILD_DOMAIN) return `https://${process.env.BUILD_DOMAIN}`;
  // http://localhost:3000: Replace with your local dev URL
  // e.g., 'https://mysite.lndo.site' or 'https://mysite.ddev.site'
  return 'http://localhost:3000';
}

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html', { open: 'never', outputFolder: 'test-results/a11y-report' }],
    ['list'],
  ],
  use: {
    baseURL: getBaseUrl(),
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: 'Mobile',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 320, height: 568 },
      },
    },
  ],
  outputDir: 'test-results/a11y-output',
});
