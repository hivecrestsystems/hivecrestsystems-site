// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hivecrestsystems.com',
  build: {
    // Emit privacy.html (not privacy/index.html) so existing links keep working.
    format: 'file',
  },
  // Iteration 1 ships the design hand-off exactly as delivered.
  // Minification is turned on in iteration 2.
  compressHTML: false,
  devToolbar: { enabled: false },
});
