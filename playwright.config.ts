import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the design-system showcase.
 *
 * The tests drive the showcase page (no backend, no network beyond the web
 * font) at each theme/mode combination and capture full-page screenshots into
 * e2e/screenshots/ for visual review of the whole system.
 *
 * Run:  npm run test:e2e
 *
 * Note: the autonomous sandbox can't run a browser (no X/graphics libs), so
 * these are authored + type-checked here and the screenshots are produced by
 * you locally or in CI (see e2e/README.md), which uploads them as artifacts.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'list',
  use: {
    baseURL: 'http://localhost:5183',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev -- --port 5183 --strictPort',
    url: 'http://localhost:5183',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
