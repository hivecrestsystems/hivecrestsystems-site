// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hivecrestsystems.com',
  build: {
    // Emit privacy.html (not privacy/index.html) so existing links keep working.
    format: 'file',
  },
  // Collapse whitespace in the HTML output. CSS and JS are minified by the build.
  compressHTML: true,
  devToolbar: { enabled: false },
});
