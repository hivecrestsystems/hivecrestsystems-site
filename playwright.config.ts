import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.PORT ?? 4321);
const SITE_DIR = process.env.SITE_DIR ?? 'dist';
const CI = !!process.env.CI;
// `npm run test:smoke` sets SMOKE=1: one quick pass in the Mac's own Google Chrome,
// no Docker, no screenshots. The full suite (`npm test`) runs everything else.
const SMOKE = process.env.SMOKE === '1';

// Behaviour and accessibility checks run in every browser project.
const checks = /checks\.spec\.ts/;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: CI || SMOKE ? 2 : '50%',
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  reporter: CI
    ? [['github'], ['list'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  // One set of screenshots, rendered in the Playwright Linux container.
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  expect: {
    // Chromium occasionally anti-aliases a single pixel differently between runs.
    // A few pixels of tolerance absorbs that without hiding real changes.
    toHaveScreenshot: { maxDiffPixels: 10 },
  },
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node tests/support/static-server.mjs',
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: !CI,
    env: { PORT: String(PORT), SITE_DIR },
  },
  projects: SMOKE
    ? [
        {
          name: 'smoke',
          testMatch: checks,
          grep: /@smoke/,
          use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        },
      ]
    : [
        { name: 'chromium', testMatch: checks, use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', testMatch: checks, use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', testMatch: checks, use: { ...devices['Desktop Safari'] } },
        { name: 'mobile-safari', testMatch: checks, use: { ...devices['iPhone 15'] } },
        { name: 'mobile-chrome', testMatch: checks, use: { ...devices['Pixel 7'] } },
        {
          name: 'visual',
          testMatch: /visual\.spec\.ts/,
          use: { ...devices['Desktop Chrome'], reducedMotion: 'reduce' },
        },
      ],
});
