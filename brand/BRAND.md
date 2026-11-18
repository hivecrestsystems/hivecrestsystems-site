# Hivecrest Systems brand guide

Everything needed to keep Hivecrest's look consistent across the website, documents, email and social profiles.

## The logo

The mark is the **crest cell**: three honeycomb cells. The top cell is honey with a chevron (the "crest") cut out of it, and the two cells below are charcoal. The idea is strong systems built from small cells that fit together.

The primary logo is the **horizontal lockup**: the crest cell on the left and the wordmark on the right. The wordmark is `hivecrest` in lowercase with `SYSTEMS` spaced out underneath. There is no stacked version. The owner chose side-by-side only.

### Files (`brand/logos/`)

| File | Use it for |
|---|---|
| `hivecrest-logo.svg` | Primary logo on light backgrounds (white, Paper) |
| `hivecrest-logo-on-dark.svg` | Primary logo on dark backgrounds (Charcoal, Night, photos) |
| `hivecrest-logo-black.svg` | One-color jobs: fax, stamps, engraving, single-ink print |
| `hivecrest-icon.svg` | The crest cell alone on light backgrounds |
| `hivecrest-icon-on-dark.svg` | The crest cell alone on dark backgrounds |
| `hivecrest-icon-adaptive.svg` | Switches with the viewer's light or dark mode (used as the website favicon) |
| `hivecrest-icon-black.svg`, `hivecrest-icon-white.svg` | One-color icon |
| `png/hivecrest-logo@2x.png`, `@4x` | Raster logo for Word, Google Docs, email signatures and slides |
| `png/hivecrest-logo-on-dark@2x.png`, `@4x` | Raster logo for dark backgrounds |
| `png/hivecrest-icon-512.png`, `png/hivecrest-icon-on-dark-512.png` | Raster icon |
| `png/hivecrest-gmail-profile-1024.png` | Google/Gmail profile photo: icon on pure black, reads in light and dark mode |
| `png/hivecrest-app-icon-rounded-1024.png`, `png/hivecrest-app-icon-square-1024.png` | Social avatars and app icons on Charcoal |

All SVGs have the text converted to outlines, so they display correctly without the fonts installed. The chevron in every icon is a true cut-out, so it shows whatever is behind it.

### Rules

- Leave clear space around the logo at least the height of one honeycomb cell.
- Smallest sizes: the horizontal logo should be at least 120 px (1 in) wide. Below that, use the icon alone, down to 16 px.
- Don't recolor the cells. Don't stretch, rotate or outline the logo, and don't add shadows or gradients.
- Don't place the light-background logo on dark backgrounds. Use the `-on-dark` file.
- The icon's top cell is always Honey, except in the one-color versions.

## Colors

| Name | Hex | Role |
|---|---|---|
| Charcoal | `#18181B` | Primary text, bottom logo cells, buttons on light backgrounds |
| Honey | `#E39A2B` | Accent: top logo cell, primary buttons, highlights on dark backgrounds |
| Paper | `#F6F5F1` | Main light background |
| Night | `#141416` | Dark sections, hero, footer |
| Stone | `#5F5E5A` | Secondary text and labels on light backgrounds; `SYSTEMS` in the logo |

Supporting colors used on the website:

| Name | Hex | Role |
|---|---|---|
| Light text | `#EDEBE4` | Main text on Night and Charcoal; bottom logo cells on dark |
| Muted on dark | `#A3A29C` | Secondary text on dark; `SYSTEMS` in the dark logo |
| Soft text on dark | `#C9C7BF` | Body copy on dark sections |
| Body gray | `#3A3A3F` | Body copy on light sections |
| Card border | `#E2E0D8` | Card and panel borders |
| Sand | `#ECEAE3` | Alternate light section background |
| White | `#FFFFFF` | Cards and form fields |

### Contrast rules (WCAG)

- **Honey text works only on dark backgrounds.** Honey on Night is 7.8:1 and on Charcoal 7.5:1, both of which pass. Honey on Paper or white is about 2.2:1, which fails for text. On light backgrounds, use Honey only for shapes, rules and buttons with Charcoal text (Charcoal on Honey is 7.5:1).
- Charcoal on Paper is 16.2:1. Stone on Paper is 6.0:1. Light text on Night is 15.4:1. Muted on Night is 7.2:1. All of these pass.

## Typography

| Font | Weights | Use |
|---|---|---|
| **JetBrains Mono** | ExtraBold 800 | Wordmark, headlines, section titles |
| **JetBrains Mono** | Medium 500 | Labels, eyebrows (`01 / SERVICES`), data, codes |
| **Inter** | Regular 400, Medium 500, SemiBold 600 | Body text, buttons, forms, proposals, invoices |

- Both fonts are free under the SIL Open Font License. The licenses are in `brand/fonts/`.
- Downloads: [Inter](https://fonts.google.com/specimen/Inter) · [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono). Web-ready `.woff2` files for the weights in use are in `brand/fonts/`.
- Fallbacks: `Inter, system-ui, sans-serif` and `'JetBrains Mono', ui-monospace, monospace`.
- Headlines: tight letter-spacing (about -1 px at 46 px and -2 px at 76 px), line-height about 1.05–1.1.
- Eyebrow labels: JetBrains Mono 500, uppercase, letter-spacing about 2 px, 13–14 px.
- Body: Inter 16–20 px, line-height 1.6.
- In Word or Google Docs, use JetBrains Mono for headings and Inter for body text.

## Voice

- Plain, confident and specific. Say what Hivecrest builds and how it works.
- Talk about the company ("we"), not a personal founder story.
- No invented numbers, client names or results. Use a placeholder until a fact is real.
- Keep the focus on Maryland at state level. Don't mention the neighborhood.

## Design tokens

The same values are in `tokens.css` (CSS custom properties) and `tokens.json`.
