// Search-engine data: the services offered and the areas served, used for the
// structured data (JSON-LD) that tells search engines what the business does.
// Visitors don't see this; the page text only says the business is in Maryland and
// works across the Mid-Atlantic and remotely nationwide.

export const SITE_URL = 'https://hivecrestsystems.com';

/** The six services, in the site's order. The homepage cards use the same titles. */
export const SERVICES = [
  {
    title: 'Websites & web apps',
    text: 'Fast, accessible websites and web applications that are easy to find and easy to update.',
    tags: 'Redesigns · Accessibility · SEO',
  },
  {
    title: 'E-commerce & Shopify',
    text: 'Shopify stores, theme customization and custom Shopify apps that make selling simpler.',
    tags: 'Store builds · Custom apps · Integrations',
  },
  {
    title: 'Mobile & custom software',
    text: 'iOS and Android apps from one codebase, plus internal tools and dashboards for your team.',
    tags: 'React Native · Internal tools · APIs',
  },
  {
    title: 'AI & automation',
    text: 'Assistants and automated workflows that answer questions, book appointments and follow up for you.',
    tags: 'Chat assistants · Workflows · Integrations',
  },
  {
    title: 'Cloud & IT consulting',
    text: 'Cloud setup, migrations and practical technical guidance for growing teams.',
    tags: 'AWS · Azure · Microsoft 365 · Google Workspace',
  },
  {
    title: 'Care & support plans',
    text: 'Hosting, updates, monitoring and fixes on a predictable monthly plan.',
    tags: 'Hosting · Monitoring · Maintenance',
  },
] as const;

/** Major cities from Virginia Beach to New York, and the states around them. */
const CITIES: [city: string, region: string][] = [
  ['Virginia Beach', 'Virginia'],
  ['Norfolk', 'Virginia'],
  ['Richmond', 'Virginia'],
  ['Arlington', 'Virginia'],
  ['Alexandria', 'Virginia'],
  ['Washington', 'District of Columbia'],
  ['Baltimore', 'Maryland'],
  ['Annapolis', 'Maryland'],
  ['Wilmington', 'Delaware'],
  ['Philadelphia', 'Pennsylvania'],
  ['Trenton', 'New Jersey'],
  ['Newark', 'New Jersey'],
  ['New York', 'New York'],
];
const STATES = ['Maryland', 'Virginia', 'District of Columbia', 'Delaware', 'Pennsylvania', 'New Jersey', 'New York'];

export const AREA_SERVED = [
  ...STATES.map((name) => ({ '@type': 'State', name })),
  ...CITIES.map(([name, region]) => ({ '@type': 'City', name, containedInPlace: { '@type': 'State', name: region } })),
  // Remote work for clients anywhere in the country.
  { '@type': 'Country', name: 'United States' },
];

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Structured data for the homepage: the organization, the business and the website. */
export function homepageStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: 'Hivecrest Systems LLC',
        alternateName: 'Hivecrest Systems',
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/assets/icon-512.png`,
        email: 'hello@hivecrestsystems.com',
        naics: '541511',
        address: { '@type': 'PostalAddress', addressRegion: 'MD', addressCountry: 'US' },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#business`,
        name: 'Hivecrest Systems',
        description:
          'Hivecrest Systems designs, builds and supports the websites, software, cloud and automation that businesses and public agencies run on.',
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/assets/og-image.png`,
        email: 'hello@hivecrestsystems.com',
        parentOrganization: { '@id': ORGANIZATION_ID },
        address: { '@type': 'PostalAddress', addressRegion: 'MD', addressCountry: 'US' },
        areaServed: AREA_SERVED,
        knowsAbout: SERVICES.map((s) => s.title),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services',
          itemListElement: SERVICES.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, description: s.text, areaServed: AREA_SERVED },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'Hivecrest Systems',
        publisher: { '@id': ORGANIZATION_ID },
      },
    ],
  };
}
