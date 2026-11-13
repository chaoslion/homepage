import { getCollection, type CollectionEntry } from 'astro:content';
import string from '@poppinss/string';

import type { AboutCollectionItem } from '#/types/collections';

function getAboutCollectionItem(
  i: CollectionEntry<'about'>,
): AboutCollectionItem {
  return {
    entry: i,
    id: i.id,
    prompt: i.data.prompt,
    context: i.data.context,
    slug: string.slug(i.data.context.toLowerCase()),
  };
}
export async function getAboutCollection(): Promise<AboutCollectionItem[]> {
  const collection = await getCollection('about');
  return collection
    .toSorted((l, r) => l.id.localeCompare(r.id))
    .map(getAboutCollectionItem);
}
