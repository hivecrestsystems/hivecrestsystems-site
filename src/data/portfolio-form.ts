// Shared by the homepage form (src/pages/index.astro) and the Worker that receives it
// (worker/portfolio.ts), so the choices offered and the choices accepted always match.

/** The "What are you planning?" options. */
export const PROJECT_TYPES = [
  'A new website or redesign',
  'An online store or Shopify app',
  'A mobile app or custom software',
  'AI or workflow automation',
  'Cloud or IT consulting',
  'Something else',
] as const;

/** Turnstile action name. The Worker only accepts tokens issued for this action. */
export const TURNSTILE_ACTION = 'portfolio';

/**
 * Public Turnstile site key (safe to publish). Its secret key lives only in the
 * Worker's TURNSTILE_SECRET_KEY secret. Override with PUBLIC_TURNSTILE_SITE_KEY at
 * build time, for example Cloudflare's always-pass test key for local `wrangler dev`.
 */
export const TURNSTILE_SITE_KEY: string =
  import.meta.env?.PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAGID6HWywHloj5jW';
