import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PAGES } from './pages';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

// Tests tagged @smoke also run in the quick `npm run test:smoke` check.
const SMOKE = { tag: '@smoke' };

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
    test('loads without errors', SMOKE, async ({ page }) => {
      const errors = collectErrors(page);
      const response = await page.goto(p.path, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);
      expect(errors).toEqual([]);
    });

    test('has a language, title, description, canonical URL and one h1', SMOKE, async ({ page }) => {
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

    test('meets WCAG 2.1 AA (axe)', SMOKE, async ({ page }) => {
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
      await page.goto(p.path, { waitUntil: 'networkidle' });
      const { violations } = await new AxeBuilder({ page }).withTags(['best-practice']).analyze();
      const summary = violations.map(
        (v) => `${v.id} [${v.impact}]: ${v.help} -> ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`,
      );
      expect(summary).toEqual([]);
    });

    test('every link goes somewhere real', SMOKE, async ({ page, request }) => {
      await page.goto(p.path);
      const here = new URL(page.url());
      const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href') ?? ''));
      const problems: string[] = [];

      for (const href of new Set(hrefs)) {
        if (href.startsWith('mailto:')) {
          // An address, optionally with an encoded subject line (no spaces).
          if (!/^mailto:[^@\s?]+@[^@\s?]+\.[a-z]{2,}(\?subject=[^\s&]+)?$/i.test(href)) problems.push(`bad mailto: ${href}`);
          continue;
        }
        const url = new URL(href, here);
        // Links to other sites are checked once, in "links to other sites still exist".
        if (url.origin !== here.origin) continue;
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
      test(`fits a ${width}px-wide phone without sideways scrolling`, SMOKE, async ({ page }) => {
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

// Stands in for Cloudflare Turnstile and the /api/portfolio Worker (worker/portfolio.ts,
// which has its own tests), so the form tests run offline and never send email.
async function fakeFormBackend(page: Page, reply: { status: number; delayMs?: number } = { status: 200 }) {
  const sent: Record<string, unknown>[] = [];
  await page.route('https://challenges.cloudflare.com/**', (route) =>
    route.fulfill({
      contentType: 'text/javascript',
      body: `(() => {
        let issue;
        window.turnstile = {
          render(container, options) {
            issue = () => setTimeout(() => options.callback('test-token'), 20);
            issue();
            return 'widget-1';
          },
          reset() { issue(); },
        };
        window.onHivecrestTurnstile();
      })();`,
    }),
  );
  await page.route('**/api/portfolio', async (route) => {
    sent.push(route.request().postDataJSON());
    if (reply.delayMs) await new Promise((resolve) => setTimeout(resolve, reply.delayMs));
    await route.fulfill({ status: reply.status, json: { ok: reply.status === 200 } });
  });
  return sent;
}

async function fillPortfolioForm(page: Page) {
  await page.getByLabel('Name').fill('Test Person');
  await page.getByLabel('Work email').fill('test@example.com');
  await page.getByLabel('What are you planning?').selectOption('AI or workflow automation');
  await page.getByLabel('Anything else we should know? (optional)').fill('A short note.');
}

test.describe('home page behaviour', () => {
  test('portfolio form sends the request, then thanks the visitor and can be reset', SMOKE, async ({ page }) => {
    // Long enough that the "Sending…" state is still showing once the click has finished,
    // which can take most of a second while the page scrolls the button into view.
    const sent = await fakeFormBackend(page, { status: 200, delayMs: 1500 });
    await page.goto('/');
    const form = page.locator('#portfolio-form');
    const thanks = page.locator('#pf-thanks');
    const submit = page.getByRole('button', { name: 'Send me examples' });

    await fillPortfolioForm(page);
    await submit.click();
    await expect(page.getByRole('button', { name: 'Sending…' })).toBeDisabled();

    await expect(form).toBeHidden();
    await expect(thanks).toBeVisible();
    await expect(thanks).toBeFocused();
    expect(sent).toEqual([
      {
        name: 'Test Person',
        email: 'test@example.com',
        type: 'AI or workflow automation',
        note: 'A short note.',
        website: '',
        token: 'test-token',
      },
    ]);

    await page.getByRole('button', { name: 'Send another request' }).click();
    await expect(form).toBeVisible();
    await expect(thanks).toBeHidden();
    await expect(page.getByLabel('Name')).toHaveValue('');
  });

  test('portfolio form shows an error and keeps the details when sending fails', SMOKE, async ({ page }) => {
    const sent = await fakeFormBackend(page, { status: 502 });
    await page.goto('/');
    await fillPortfolioForm(page);
    await page.getByRole('button', { name: 'Send me examples' }).click();

    const error = page.getByRole('alert');
    await expect(error).toBeVisible();
    await expect(error).toContainText("didn't send");
    await expect(error.getByRole('link', { name: 'hello@hivecrestsystems.com' })).toHaveAttribute(
      'href',
      'mailto:hello@hivecrestsystems.com',
    );
    await expect(page.locator('#pf-thanks')).toBeHidden();
    await expect(page.getByLabel('Name')).toHaveValue('Test Person');
    await expect(page.getByRole('button', { name: 'Send me examples' })).toBeEnabled();
    expect(sent).toHaveLength(1);

    // Trying again works and gets a fresh Turnstile token.
    await page.unroute('**/api/portfolio');
    const retry: Record<string, unknown>[] = [];
    await page.route('**/api/portfolio', async (route) => {
      retry.push(route.request().postDataJSON());
      await route.fulfill({ json: { ok: true } });
    });
    await page.getByRole('button', { name: 'Send me examples' }).click();
    await expect(page.locator('#pf-thanks')).toBeVisible();
    await expect(error).toBeHidden();
    expect(retry[0]?.token).toBe('test-token');
  });

  test('portfolio form will not send without a name and email', SMOKE, async ({ page }) => {
    const sent = await fakeFormBackend(page);
    await page.goto('/');
    await page.getByRole('button', { name: 'Send me examples' }).click();
    await expect(page.locator('#pf-thanks')).toBeHidden();
    await expect(page.locator('#portfolio-form')).toBeVisible();
    expect(sent).toEqual([]);
  });

  test('portfolio form spam trap is hidden from people and screen readers', async ({ page }) => {
    await page.goto('/');
    const trap = page.locator('#pf-website');
    await expect(trap).toHaveAttribute('tabindex', '-1');
    await expect(page.getByRole('textbox', { name: 'Website' })).toHaveCount(0);
    // The field sits inside a 1px wrapper that clips it out of sight.
    const box = await page.locator('.form__trap').boundingBox();
    expect(box && box.width * box.height).toBeLessThanOrEqual(1);
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

test.describe('home page header', () => {
  test('on phones, the Menu button shows and hides the main links', SMOKE, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const toggle = page.locator('#menu-toggle');
    const services = page.locator('#main-nav a[href="#services"]');

    await expect(toggle).toHaveAccessibleName('Menu');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(services).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAccessibleName('Close');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(services).toBeVisible();
    await expect(page.locator('#main-nav a[href="#contact"]')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
    await expect(services).toBeHidden();

    await toggle.click();
    await page.locator('#main-nav a[href="#work"]').click();
    await expect(page).toHaveURL(/#work$/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('the hero fills the first screen, so the next section only shows on scrolling', SMOKE, async ({ page }) => {
    // Phone, large phone, iPad Pro 11" both ways, laptop, desktop and a large monitor.
    for (const [width, height] of [[390, 844], [430, 932], [834, 1194], [1194, 834], [1280, 800], [1440, 900], [2560, 1440]]) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      const [heroBottom, servicesTop] = await page.evaluate(() => [
        document.querySelector('.hero')!.getBoundingClientRect().bottom,
        document.getElementById('services')!.getBoundingClientRect().top,
      ]);
      expect(servicesTop, `Services shows on the first screen at ${width}x${height}`).toBeGreaterThanOrEqual(height - 1);
      // Where the content fits, the hero ends exactly at the bottom of the screen.
      expect(heroBottom, `hero height at ${width}x${height}`).toBeGreaterThanOrEqual(height - 1);
    }
  });

  test('the header stays at the top while scrolling, and section links land below it', SMOKE, async ({ page }) => {
    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      const header = page.locator('.site-header');
      await page.evaluate(() => window.scrollTo(0, document.getElementById('government')!.offsetTop));
      await expect.poll(async () => (await header.boundingBox())!.y).toBe(0);
      await expect(page.locator('#menu-toggle, #main-nav a[href="#services"]').locator('visible=true')).toHaveCount(1);

      await page.evaluate(() => window.scrollTo(0, 0));
      if (width < 820) await page.locator('#menu-toggle').click();
      await page.locator('#main-nav a[href="#work"]').click();
      await expect(page).toHaveURL(/#work$/);
      const headerBottom = (await header.boundingBox())!.height;
      await expect
        .poll(async () => (await page.locator('#work .eyebrow').first().boundingBox())!.y)
        .toBeGreaterThanOrEqual(headerBottom);
    }
  });

  test('on wide screens, the links show without a Menu button', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect(page.locator('#menu-toggle')).toBeHidden();
    await expect(page.locator('#main-nav a[href="#services"]')).toBeVisible();
    await expect(page.locator('#main-nav a[href="#contact"]')).toBeVisible();
  });

  const scrollToServices = () =>
    window.scrollTo(0, document.getElementById('services')!.getBoundingClientRect().top + window.scrollY);

  test('on phones, a floating Book a call shows between the hero and the footer', SMOKE, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const cta = page.locator('#float-cta');
    await expect(cta).toBeHidden();
    await page.evaluate(scrollToServices);
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '#contact');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(cta).toBeHidden();
  });

  test('on wide screens, there is no floating Book a call', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.evaluate(scrollToServices);
    await page.waitForTimeout(300);
    await expect(page.locator('#float-cta')).toBeHidden();
  });
});

test.describe('inner pages', () => {
  for (const [path, contactId, subject] of [
    ['/privacy', 'p-contact', 'Hivecrest Systems Privacy Inquiry'],
    ['/accessibility', 'a-contact', 'Hivecrest Systems Accessibility Inquiry'],
  ]) {
    test(`${path}: the header stays at the top, with only the logo and a way home`, SMOKE, async ({ page }) => {
      await page.goto(path);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      const header = page.locator('.site-header');
      await expect.poll(async () => (await header.boundingBox())!.y).toBe(0);
      await expect(header.getByRole('link')).toHaveCount(2);
      // The button reads "Home" on phones.
      await expect(header.getByRole('link', { name: /^(Back to homepage|Home)$/ })).toBeVisible();
      // Contact is by email only: no mailing address.
      const contact = page.locator(`#${contactId}`);
      const email = contact.getByRole('link', { name: 'hello@hivecrestsystems.com' });
      await expect(email).toBeVisible();
      // The email opens with a subject line that says what it's about.
      const href = new URL((await email.getAttribute('href'))!);
      expect(href.pathname).toBe('hello@hivecrestsystems.com');
      expect(href.searchParams.get('subject')).toBe(subject);
      await expect(contact).not.toContainText(/mailing|\[ADDRESS/i);
    });
  }

  test('the header stays at the top while reading, with a button to book a consultation', SMOKE, async ({ page }) => {
    for (const [width, label] of [[390, 'Book a call'], [1280, 'Book a consultation']] as const) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/guides/small-business-website-cost');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      const header = page.locator('.site-header');
      await expect.poll(async () => (await header.boundingBox())!.y).toBe(0);
      const book = header.getByRole('link', { name: label });
      await expect(book).toBeVisible();
      await book.click();
      await expect(page).toHaveURL(/#contact$/);
      await expect(page.locator('#contact')).toBeInViewport();
    }
  });
});

test.describe('hero honeycomb placement', () => {
  // Phones get the strip, 720-1199px the side cluster, 1200px and up the original layout.
  // Includes the iPad Pro 11" (834 portrait, 1194 or 1210 landscape) and 13" (1032 portrait).
  const WIDTHS = [320, 390, 440, 640, 719, 720, 768, 820, 834, 1024, 1032, 1100, 1180, 1194, 1199, 1200, 1210, 1366, 1440];

  test('the honeycomb never sits on the hero text', SMOKE, async ({ page }) => {
    test.slow();
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 1000 });
      const layout = await page.evaluate(() => {
        const shown = (el: Element) => getComputedStyle(el).display !== 'none';
        // Boxes around each line of actual text, not the (wider) boxes of the elements.
        const textLines = (el: Element) => {
          const lines: DOMRect[] = [];
          const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
          for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            const range = document.createRange();
            range.selectNodeContents(node);
            for (const r of range.getClientRects()) if (r.width > 1) lines.push(r);
          }
          return lines;
        };
        const svg = [...document.querySelectorAll('.hero-honeycomb, .hero-strip')].filter(shown);
        const cells = svg.flatMap((s) => [...s.querySelectorAll('polygon')].map((p) => p.getBoundingClientRect()));
        const things: { name: string; boxes: DOMRect[] }[] = [
          { name: 'eyebrow', boxes: textLines(document.querySelector('.hero .eyebrow')!) },
          { name: 'headline', boxes: textLines(document.querySelector('.hero__title')!) },
          // The hidden copy of the longest phrase marks the most room the typing line takes.
          { name: 'typing line', boxes: textLines(document.querySelector('.hero__terminal-sizer')!) },
          { name: 'paragraph', boxes: textLines(document.querySelector('.hero__lede')!) },
          ...[...document.querySelectorAll('.topbar > *, .hero .button-row > *')]
            .filter(shown)
            .map((el) => ({ name: el.textContent!.trim() || el.className, boxes: [el.getBoundingClientRect()] })),
        ];
        const overlaps = (a: DOMRect, b: DOMRect) =>
          a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1;
        const honey = svg[0].querySelector('polygon[stroke="#E39A2B"]')!.getBoundingClientRect();
        const headline = textLines(document.querySelector('.hero__title')!);
        return {
          cellCount: cells.length,
          blocked: things.filter((t) => t.boxes.some((b) => cells.some((c) => overlaps(b, c)))).map((t) => t.name),
          honeyMiddle: honey.top + honey.height / 2,
          secondLine: headline.length > 1 ? { top: headline[1].top, bottom: headline[1].bottom } : null,
        };
      });

      expect(layout.cellCount, `honeycomb shown at ${width}px`).toBeGreaterThan(0);
      expect(layout.blocked, `honeycomb cells cover hero text at ${width}px`).toEqual([]);
      // Beside the two-line headline, the honey cell lines up with "built cell by cell."
      if (width >= 720 && width < 1200) {
        expect(layout.secondLine, `headline has two lines at ${width}px`).not.toBeNull();
        expect(layout.honeyMiddle, `honey cell level with the second line at ${width}px`).toBeGreaterThan(layout.secondLine!.top);
        expect(layout.honeyMiddle, `honey cell level with the second line at ${width}px`).toBeLessThan(layout.secondLine!.bottom);
      }
    }
  });
});

test.describe('hero honeycomb motion', () => {
  type Box = { x: number; y: number; width: number; height: number };
  const middle = (b: Box | null) => ({ x: b!.x + b!.width / 2, y: b!.y + b!.height / 2 });
  const near = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y) < 3;

  async function openDesktop(page: Page, reducedMotion: 'reduce' | 'no-preference') {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion });
    await page.goto('/');
    const comb = page.locator('.hero-honeycomb');
    return {
      honey: async () => middle(await comb.locator('.hc-honey').boundingBox()),
      home: middle(await comb.locator('.hc-cell--home').boundingBox()),
      // The top-left cell of the cluster.
      cell: middle(await comb.locator('.hc-cell').first().boundingBox()),
      // A point on the headline, which is not over any cell.
      text: middle(await page.locator('.hero__title-line').first().boundingBox()),
    };
  }

  test('with a mouse, the honey cell follows the pointer only over cells, then glides home', SMOKE, async ({ page, isMobile }) => {
    test.skip(isMobile, 'Phones have no mouse pointer.');
    const hero = await openDesktop(page, 'no-preference');

    await page.mouse.move(hero.text.x, hero.text.y);
    await page.waitForTimeout(300);
    expect(near(await hero.honey(), hero.home), 'stays home while the pointer is on text').toBe(true);

    await page.mouse.move(hero.cell.x, hero.cell.y);
    await expect.poll(async () => near(await hero.honey(), hero.cell), { message: 'moves to the cell under the pointer' }).toBe(true);

    await page.mouse.move(hero.text.x, hero.text.y);
    await expect.poll(async () => near(await hero.honey(), hero.home), { message: 'glides home after the pointer leaves the cells' }).toBe(true);

    // Moving out of the hero (onto the header bar above it) also sends it home.
    await page.mouse.move(hero.cell.x, hero.cell.y);
    await expect.poll(async () => near(await hero.honey(), hero.cell)).toBe(true);
    const logo = middle(await page.locator('.topbar .brand-link').boundingBox());
    await page.mouse.move(logo.x, logo.y);
    await expect.poll(async () => near(await hero.honey(), hero.home), { message: 'goes home when the pointer leaves the hero' }).toBe(true);
  });

  test('with reduced motion, the honey cell stays home', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Phones have no mouse pointer.');
    const hero = await openDesktop(page, 'reduce');
    await page.mouse.move(hero.cell.x, hero.cell.y);
    await page.waitForTimeout(800);
    expect(near(await hero.honey(), hero.home)).toBe(true);
  });

  test.describe('on touch screens', () => {
    test.skip(({ browserName }) => browserName === 'firefox', 'Playwright cannot emulate touch in Firefox.');
    test.use({ hasTouch: true });

    test('a tap on a cell moves the honey cell there, and it stays', SMOKE, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto('/');
      const strip = page.locator('.hero-strip');
      await strip.scrollIntoViewIfNeeded();
      const honey = async () => middle(await strip.locator('.hc-honey').boundingBox());
      const home = middle(await strip.locator('.hc-cell--home').boundingBox());
      // Two cells to the left of home, in the same row (cells are 48.5px apart).
      const target = { x: home.x - 97, y: home.y };

      await page.touchscreen.tap(target.x, target.y);
      await expect.poll(async () => near(await honey(), target), { message: 'moves to the tapped cell' }).toBe(true);
      await page.waitForTimeout(1200);
      expect(near(await honey(), target), 'stays on the tapped cell').toBe(true);
    });
  });
});

test.describe('search engines', () => {
  const SITE = 'https://hivecrestsystems.com';

  test('the sitemap lists every page at its clean address, and each one loads', SMOKE, async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const xml = await response.text();
    const listed = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(listed.sort()).toEqual(PAGES.map((p) => `${SITE}${p.path}`).sort());
    for (const url of listed) {
      expect(url, 'no .html addresses').not.toMatch(/\.html$/);
      expect((await request.get(url.replace(SITE, ''))).status(), url).toBe(200);
    }
  });

  test('robots.txt lets search engines in and points to the sitemap', SMOKE, async ({ request }) => {
    const text = await (await request.get('/robots.txt')).text();
    expect(text).toMatch(/^User-agent: \*$/m);
    expect(text).toMatch(/^Allow: \/$/m);
    expect(text).toMatch(/^Disallow: \/api\/$/m);
    expect(text).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  });

  async function structuredData(page: Page) {
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks).toHaveLength(1);
    return JSON.parse(blocks[0]) as { '@graph': Record<string, any>[] };
  }

  test('the homepage describes the business, its services and where it works', SMOKE, async ({ page }) => {
    await page.goto('/');
    const graph = (await structuredData(page))['@graph'];
    expect(graph.map((n) => n['@type'])).toEqual(['Organization', 'ProfessionalService', 'WebSite']);
    const business = graph[1];

    // The services offered match the service cards on the page.
    const cards = await page.locator('.service-card .item-title').allTextContents();
    expect(business.hasOfferCatalog.itemListElement.map((o: any) => o.itemOffered.name)).toEqual(cards);

    // Maryland, the I-95 corridor from Virginia Beach to New York, and remote work nationwide.
    const areas = business.areaServed.map((a: any) => a.name);
    for (const name of ['Maryland', 'Virginia Beach', 'Washington', 'Baltimore', 'Philadelphia', 'New York', 'United States']) {
      expect(areas).toContain(name);
    }
    // Contact details match the page; no street address is published.
    expect(business.email).toBe('hello@hivecrestsystems.com');
    expect(business.address).toEqual({ '@type': 'PostalAddress', addressRegion: 'MD', addressCountry: 'US' });
  });

  test('each guide is marked up as an article that matches its page', async ({ page }) => {
    test.slow(); // visits every guide
    for (const guide of PAGES.filter((p) => p.path.startsWith('/guides/'))) {
      await page.goto(guide.path);
      const [article, breadcrumbs] = (await structuredData(page))['@graph'];
      expect(article['@type']).toBe('Article');
      expect(article.headline).toBe(await page.locator('h1').textContent());
      expect(article.url).toBe(`${SITE}${guide.path}`);
      expect(new Date(article.datePublished).getTime()).not.toBeNaN();
      expect(breadcrumbs.itemListElement.map((i: any) => i.name)).toEqual(['Home', 'Guides', article.headline]);
    }
  });

  test('every source in a guide became a link', async ({ page }) => {
    test.slow(); // visits every guide
    // A [label][key] whose key has no address at the bottom of the file shows up as raw text.
    for (const guide of PAGES.filter((p) => p.path.startsWith('/guides/'))) {
      await page.goto(guide.path);
      const text = await page.locator('article').innerText();
      expect(text.match(/\]\[[^\]]*\]/g), guide.path).toBeNull();
    }
  });

  // One test per page: checking every page in one test is too slow in Safari.
  for (const p of PAGES) {
    test(`the ${p.slug} footer says where we work and links to the guides`, async ({ page }) => {
      await page.goto(p.path);
      const footer = page.locator('.footer-bar');
      await expect(footer).toContainText('© 2026 Hivecrest Systems LLC · Maryland, USA');
      await expect(footer).toContainText(
        'Based in Maryland, we work with clients across the Mid-Atlantic and remotely nationwide.',
      );
      await expect(footer.getByRole('link', { name: 'Guides' })).toHaveAttribute('href', '/guides');
    });
  }
});

test.describe('links to other sites', () => {
  // Checked in one browser only, and only "gone" answers (404, 410) count as broken:
  // many sites refuse automated visitors or are briefly down, which says nothing about
  // whether the link still points at a real page.
  // These sites answer every automated request with 404, even for pages that load fine in a
  // browser, so their links can only be checked by hand.
  const BLOCKS_AUTOMATED_CHECKS = new Set(['ftc.gov', 'www.ftc.gov']);

  test('links to other sites still exist', async ({ page, request }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Checked in one browser only.');
    test.setTimeout(480_000);
    const outside = new Map<string, string>();
    for (const p of PAGES) {
      await page.goto(p.path);
      const here = new URL(page.url());
      for (const href of await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href') ?? ''))) {
        if (!/^https?:/.test(href) || new URL(href).origin === here.origin) continue;
        if (BLOCKS_AUTOMATED_CHECKS.has(new URL(href).hostname)) continue;
        if (!outside.has(href)) outside.set(href, p.path);
      }
    }
    const gone: string[] = [];
    const links = [...outside];
    // Eight at a time: the guides cite a few hundred sources, and one at a time takes too long.
    for (let i = 0; i < links.length; i += 8) {
      await Promise.all(
        links.slice(i, i + 8).map(async ([href, from]) => {
          try {
            const res = await request.get(href, { timeout: 20_000, maxRedirects: 5 });
            if ([404, 410].includes(res.status())) gone.push(`${from}: ${href} -> HTTP ${res.status()}`);
          } catch {
            // Network trouble isn't proof the link is broken.
          }
        }),
      );
    }
    expect(gone.sort()).toEqual([]);
  });
});
