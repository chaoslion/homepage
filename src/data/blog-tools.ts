import type { PostsCollectionItem } from '#/types/collections';

export function shufflePostsCollection(collection: PostsCollectionItem[]) {
  // shuffle via fisher-yates
  for (let i = collection.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [collection[i], collection[j]] = [collection[j], collection[i]];
  }
}
