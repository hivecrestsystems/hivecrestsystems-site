// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { tableLabels } from './scripts/markdown-table-labels.mjs';

export default defineConfig({
  site: 'https://hivecrestsystems.com',
  build: {
    // Emit privacy.html (not privacy/index.html) so existing links keep working.
    format: 'file',
  },
  // Collapse whitespace in the HTML output. CSS and JS are minified by the build.
  compressHTML: true,
  devToolbar: { enabled: false },
  // Guide tables become labelled cards on phones; see scripts/markdown-table-labels.mjs.
  markdown: { processor: satteri({ hastPlugins: [tableLabels] }) },
});
