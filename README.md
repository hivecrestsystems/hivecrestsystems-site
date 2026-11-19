# Hivecrest Systems website

Source for [hivecrestsystems.com](https://hivecrestsystems.com), the website of Hivecrest Systems LLC.

The site is built with [Astro](https://astro.build) and deployed to Cloudflare from this repository.

| Environment | Branch | Address | Access |
|---|---|---|---|
| Production | `main` | hivecrestsystems.com | Public |
| Development | `dev` | dev.hivecrestsystems.com | Private (sign-in required) |
| Previews | any PR branch | link posted on the PR | Private (sign-in required) |

## Requirements

- Node.js 22.23.4 or newer (see `.node-version`)
- Docker Desktop, running, for the full browser tests
- Google Chrome, for the smoke tests and the Lighthouse checks

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start a local dev server at http://localhost:4321 with live reload |
| `npm run build` | Build the site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally, the way it will be deployed |
| `npm run test:smoke` | Quick check after small changes (about 25 seconds): build, HTML validation, and the key page, link, accessibility and form tests in Chrome. Docker not needed |
| `npm test` | Full suite before opening a pull request (about 4 minutes): build, then every check below |
| `npm run test:html` | Validate the built HTML |
| `npm run test:browsers` | Accessibility (WCAG 2.1 AA), links, behaviour and screenshot tests in Chromium, Firefox, WebKit and mobile browsers |
| `npm run test:visual` | Screenshot tests only |
| `npm run test:visual:update` | Accept intended visual changes as the new baseline screenshots |
| `npm run test:lighthouse` | Lighthouse scores for every page (reports in `.lighthouseci/reports/`) |
| `npm run test:report` | Open the last browser test report |
| `npm run branches:prune` | Show which old iteration branches would be deleted (add `-- --apply` to delete) |
| `npm run release:tag` | Tag the current production commit as the next release (`v1`, `v2`, ...) |

Browser tests run inside the official Playwright container, so screenshots look the same on a Mac and in GitHub Actions.

## Project layout

```
src/
  layouts/BaseLayout.astro   Shared <head>: title, description, social preview, icons, font preloads
  pages/index.astro          Homepage
  pages/privacy.astro        Privacy policy
  components/                Site logo, crest icon, hero honeycomb, footer bar
  styles/site.css            All site styles, built on the brand tokens
public/assets/               Favicons, social preview image, logos (copied to the site as-is)
brand/                       Brand guide, design tokens, logo files and fonts (the site's fonts are served from here)
tests/                       Browser tests and baseline screenshots
scripts/                     Test runner, branch pruning and release tagging
```

Read `brand/BRAND.md` before making any visual change.

## How changes ship

1. Create an iteration branch from `dev`, named `iter/NN-short-name` (for example `iter/02-stylesheet`).
2. Make the change. Run `npm run test:smoke` after each small change, and `npm test` (the full suite) before opening the pull request.
3. Open a pull request into `dev`. The checks run automatically, and Cloudflare posts a preview link.
4. After review and approval, merge into `dev`, then check the change on dev.hivecrestsystems.com.
5. Open a release pull request from `dev` into `main`. After review and approval, merge it to publish to hivecrestsystems.com.
6. Run `npm run release:tag` to tag the release.
7. Run `npm run branches:prune` to keep only the three most recent iteration branches.

`main` and `dev` are protected: changes reach them only through reviewed pull requests with passing checks.

## Known issues

None open. When a problem can't be fixed straight away, add a test marked with `test.fail(...)` and a note here; the test starts failing as a reminder once the problem is fixed.

---

© Hivecrest Systems LLC. All rights reserved. The Inter and JetBrains Mono fonts in `brand/fonts/` are used under the SIL Open Font License; see the license files there.
