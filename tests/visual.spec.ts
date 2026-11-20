import { test, expect } from '@playwright/test';
import { PAGES } from './pages';

// Screenshots are only comparable when rendered in the same environment.
test.skip(
  process.platform !== 'linux',
  'Visual tests run in the Playwright container: use `npm run test:browsers`.',
);

const VIEWPORTS = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

// Every guide uses the same layout, so the first one stands in for all of them: screenshots
// of each guide would add megabytes to the repository with every wording change. The other
// checks (accessibility, phone widths, links, markup) still run on every guide.
const SCREENSHOT_PAGES = PAGES.filter((p) => !p.path.startsWith('/guides/') || p.slug === 'guide-website-cost');

for (const p of SCREENSHOT_PAGES) {
  for (const vp of VIEWPORTS) {
    test(`${p.slug} looks right on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(p.path, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(`${p.slug}-${vp.name}.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
}
