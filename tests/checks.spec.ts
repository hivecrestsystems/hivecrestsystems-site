import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PAGES } from './pages';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`console: ${m.text()}`);
  });
  return errors;
}

for (const p of PAGES) {
  test.describe(`${p.slug} page`, () => {
    test('loads without errors', async ({ page }) => {
      const errors = collectErrors(page);
      const response = await page.goto(p.path, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);
      expect(errors).toEqual([]);
    });

    test('has a language, title, description, canonical URL and one h1', async ({ page }) => {
      await page.goto(p.path);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page).toHaveTitle(p.title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        new URL(p.path, 'https://hivecrestsystems.com').href,
      );
      await expect(page.locator('h1')).toHaveCount(1);
    });

    test('meets WCAG 2.1 AA (axe)', async ({ page }) => {
      // A full axe scan is slow in Firefox when many browsers run at once.
      test.slow();
      await page.goto(p.path, { waitUntil: 'networkidle' });
      const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
      const summary = violations.map(
        (v) => `${v.id} [${v.impact}]: ${v.help} -> ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`,
      );
      expect(summary).toEqual([]);
    });

    test('follows accessibility best practices (axe)', async ({ page }) => {
      test.slow();
      // KNOWN ISSUE (iteration 1): the homepage has no <main> landmark, so axe
      // reports "landmark-one-main" and "region". Iteration 2 adds <main>. Once it
      // does, this test passes and Playwright flags it, so delete this line then.
      test.fail(p.slug === 'home', 'Known issue: homepage has no <main> landmark');
      await page.goto(p.path, { waitUntil: 'networkidle' });
      const { violations } = await new AxeBuilder({ page }).withTags(['best-practice']).analyze();
      const summary = violations.map(
        (v) => `${v.id} [${v.impact}]: ${v.help} -> ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`,
      );
      expect(summary).toEqual([]);
    });

    test('every link goes somewhere real', async ({ page, request }) => {
      await page.goto(p.path);
      const here = new URL(page.url());
      const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href') ?? ''));
      const problems: string[] = [];

      for (const href of new Set(hrefs)) {
        if (href.startsWith('mailto:')) {
          if (!/^mailto:[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(href)) problems.push(`bad mailto: ${href}`);
          continue;
        }
        const url = new URL(href, here);
        if (url.origin !== here.origin) {
          const res = await request.get(url.href);
          if (res.status() >= 400) problems.push(`${href} -> HTTP ${res.status()}`);
          continue;
        }
        let html: string | null = null;
        if (url.pathname !== here.pathname) {
          const res = await request.get(url.pathname);
          if (res.status() !== 200) {
            problems.push(`${href} -> HTTP ${res.status()}`);
            continue;
          }
          html = await res.text();
        }
        // "#top" always scrolls to the top of the page, even without a matching id.
        const id = decodeURIComponent(url.hash.slice(1));
        if (!id || id === 'top') continue;
        const found = html
          ? html.includes(`id="${id}"`)
          : (await page.locator(`[id="${id}"]`).count()) > 0;
        if (!found) problems.push(`${href} -> no element with id "${id}"`);
      }
      expect(problems).toEqual([]);
    });

    test('fits the screen without sideways scrolling', async ({ page }) => {
      await page.goto(p.path, { waitUntil: 'networkidle' });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    for (const width of [360, 320]) {
      test(`fits a ${width}px-wide phone without sideways scrolling`, async ({ page }) => {
        // KNOWN ISSUE (iteration 1): at 320px the service cards (300px minimum
        // width) and the hello@ email button overflow the homepage by 12-20px.
        // WCAG 2.1 AA (1.4.10 Reflow) requires 320px to fit. Fixed in iteration 2.
        test.fail(p.slug === 'home' && width === 320, 'Known issue: homepage overflows at 320px');
        await page.setViewportSize({ width, height: 800 });
        await page.goto(p.path, { waitUntil: 'networkidle' });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `page is ${overflow}px wider than a ${width}px screen`).toBeLessThanOrEqual(0);
      });
    }
  });
}

test.describe('home page behaviour', () => {
  test('portfolio form shows the thank-you message and can be reset', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('#portfolio-form');
    const thanks = page.locator('#pf-thanks');

    await page.getByLabel('Name').fill('Test Person');
    await page.getByLabel('Work email').fill('test@example.com');
    await page.getByLabel('What are you planning?').selectOption('AI or workflow automation');
    await page.getByRole('button', { name: 'Send me examples' }).click();

    await expect(form).toBeHidden();
    await expect(thanks).toBeVisible();
    await expect(thanks).toBeFocused();

    await page.getByRole('button', { name: 'Send another request' }).click();
    await expect(form).toBeVisible();
    await expect(thanks).toBeHidden();
    await expect(page.getByLabel('Name')).toHaveValue('');
  });

  test('portfolio form will not send without a name and email', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Send me examples' }).click();
    await expect(page.locator('#pf-thanks')).toBeHidden();
    await expect(page.locator('#portfolio-form')).toBeVisible();
  });

  test('hero typing line animates', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    const typed = page.locator('#typed');
    await expect(typed).toHaveText('websites that sell.');
    // The first phrase holds for about 2 seconds, then starts deleting.
    await expect(typed).not.toHaveText('websites that sell.', { timeout: 10_000 });
  });

  test('hero typing line stays still with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForTimeout(3500);
    await expect(page.locator('#typed')).toHaveText('websites that sell.');
  });
});
