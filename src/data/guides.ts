// Helpers for the guides: which ones are published, how dates and reading time read.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Guide = CollectionEntry<'guides'>;

/** Published guides, newest first; guides from the same day follow their `order`. */
export async function publishedGuides(): Promise<Guide[]> {
  const guides: Guide[] = await getCollection('guides', ({ data }: Guide) => !data.draft);
  return guides.sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime() || a.data.order - b.data.order,
  );
}

export const guidePath = (guide: Guide) => `/guides/${guide.id}`;

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

/** Reading time at about 230 words a minute. */
export const readingMinutes = (guide: Guide) =>
  Math.max(1, Math.round((guide.body ?? '').split(/\s+/).filter(Boolean).length / 230));
