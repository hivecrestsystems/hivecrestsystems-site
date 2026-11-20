// Content collections. Each guide is a Markdown file in src/content/guides/; its file
// name (without .md) is its address: src/content/guides/website-cost.md -> /guides/website-cost
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    /** Headline, also the page title. Keep it close to what people search for. */
    title: z.string().max(90),
    /** One or two sentences for search results and link previews (about 150 characters). */
    description: z.string().min(50).max(170),
    /** Who the guide is for, shown above the title (for example "SMALL BUSINESS WEBSITES"). */
    eyebrow: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** Position among guides published on the same day, lowest first. */
    order: z.number().int().default(0),
    /** The box after the guide: "project" asks about a project; "government" points to the government section. */
    cta: z.enum(['project', 'government']).default('project'),
    /** Drafts are left out of the site and the sitemap. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { guides };
