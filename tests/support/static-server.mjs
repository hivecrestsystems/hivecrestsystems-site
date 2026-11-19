// Minimal static file server for tests. No dependencies, so it runs the same
// on a Mac and inside the Playwright container.
//   SITE_DIR  folder to serve (default: dist)
//   PORT      port to listen on (default: 4321)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';

const root = resolve(process.env.SITE_DIR ?? 'dist');
const port = Number(process.env.PORT ?? 4321);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

async function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  const candidate = normalize(join(root, decoded));
  if (candidate !== root && !candidate.startsWith(root + sep)) return null;
  try {
    const info = await stat(candidate);
    if (info.isDirectory()) return resolveFile(join(decoded, 'index.html'));
    return candidate;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const { pathname, search } = new URL(req.url ?? '/', 'http://localhost');
  // Like Cloudflare's default HTML handling (assets.html_handling in wrangler.jsonc):
  // pages are served at clean addresses, so /privacy serves privacy.html, and
  // .html addresses redirect there (/privacy.html to /privacy, /index.html to /).
  if (pathname.endsWith('.html') && (await resolveFile(pathname))) {
    res.writeHead(307, { location: pathname.replace(/(index)?\.html$/, '') + search });
    res.end();
    return;
  }
  const file =
    (await resolveFile(pathname)) ?? (extname(pathname) ? null : await resolveFile(`${pathname}.html`));
  if (!file) {
    const notFound = await resolveFile('/404.html');
    res.writeHead(404, { 'content-type': types['.html'] });
    res.end(notFound ? await readFile(notFound) : 'Not found');
    return;
  }
  res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
  res.end(req.method === 'HEAD' ? undefined : await readFile(file));
}).listen(port, '0.0.0.0', () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}`);
});
