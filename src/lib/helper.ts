export function singularOrPlural(
  count: number,
  singular: string,
  plural: string,
): string {
  return count !== 1 ? plural : singular;
}

export function shuffleCollection<T>(collection: T[]): T[] {
  // shuffle via fisher-yates
  for (let i = collection.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [collection[i], collection[j]] = [collection[j], collection[i]];
  }
  return collection;
}

/**
 * Start index (0-based) of a window of `size` items out of `total`, keeping
 * `current` centred where possible and clamped at both ends.
 */
export function windowStart(
  current: number,
  total: number,
  size: number,
): number {
  return Math.max(0, Math.min(current - Math.floor(size / 2), total - size));
}
