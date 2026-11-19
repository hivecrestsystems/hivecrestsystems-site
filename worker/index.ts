// Worker entry point. Static pages are served straight from dist/ (see wrangler.jsonc);
// the Worker only runs for /api/* and for addresses with no matching file.

import { handlePortfolio, type Env } from './portfolio.ts';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/portfolio') return handlePortfolio(request, env);
    if (pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ ok: false, error: 'not-found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return env.ASSETS.fetch(request);
  },
};
