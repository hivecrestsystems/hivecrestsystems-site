// Every page on the site. Add new pages here so all checks cover them, including each
// published guide (src/content/guides/).
export const PAGES = [
  { slug: 'home', path: '/', title: 'Hivecrest Systems | Software, web, cloud and IT consulting' },
  { slug: 'privacy', path: '/privacy', title: 'Privacy policy | Hivecrest Systems' },
  { slug: 'accessibility', path: '/accessibility', title: 'Accessibility statement | Hivecrest Systems' },
  { slug: 'guides', path: '/guides', title: 'Guides | Hivecrest Systems' },
  {
    slug: 'guide-website-cost',
    path: '/guides/small-business-website-cost',
    title: 'What does a small business website really cost in 2026?',
  },
  {
    slug: 'guide-shopify-cost',
    path: '/guides/shopify-store-cost',
    title: 'What does a Shopify store cost in 2026? | Hivecrest Systems',
  },
  {
    slug: 'guide-app-cost',
    path: '/guides/app-development-cost',
    title: 'What does it cost to build an app in 2026? | Hivecrest Systems',
  },
  {
    slug: 'guide-ai-automation',
    path: '/guides/ai-automation-small-business',
    title: 'Where AI and automation actually help a small business',
  },
  {
    slug: 'guide-workspace-vs-365',
    path: '/guides/google-workspace-vs-microsoft-365',
    title: 'Google Workspace vs Microsoft 365 for a small business',
  },
  {
    slug: 'guide-accessibility',
    path: '/guides/website-accessibility-ada',
    title: 'Website accessibility (ADA) for small businesses and local governments',
  },
  {
    slug: 'guide-maryland-tax',
    path: '/guides/maryland-tax-on-it-services',
    title: "Maryland's 3% tax on IT and software services, explained",
  },
  {
    slug: 'guide-government-buying',
    path: '/guides/how-government-buys-it-services',
    title: 'How agencies and prime contractors buy from small IT firms',
  },
] as const;
