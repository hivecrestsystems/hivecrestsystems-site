// sitemap.xml: every public page at its clean address, for search engines.
import { publishedGuides, guidePath } from '../data/guides';
import { SITE_URL } from '../data/seo';

export async function GET() {
  const guides = await publishedGuides();
  const pages: { path: string; lastmod?: Date }[] = [
    { path: '/' },
    { path: '/guides', lastmod: guides[0]?.data.updated ?? guides[0]?.data.published },
    ...guides.map((guide) => ({ path: guidePath(guide), lastmod: guide.data.updated ?? guide.data.published })),
    { path: '/privacy' },
    { path: '/accessibility' },
  ];
  const urls = pages
    .map(({ path, lastmod }) =>
      [
        '  <url>',
        `    <loc>${SITE_URL}${path}</loc>`,
        lastmod ? `    <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : null,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n'),
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
