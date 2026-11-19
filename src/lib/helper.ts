export function singularOrPlural(
  count: number,
  singular: string,
  plural: string,
): string {
  return count !== 1 ? plural : singular;
}

export function dateString(date: Date): string {
  return date.toLocaleDateString('en-US', { dateStyle: 'long' });
}

export function shuffleCollection<T>(collection: T[]): T[] {
  // shuffle via fisher-yates
  for (let i = collection.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [collection[i], collection[j]] = [collection[j], collection[i]];
  }
  return collection;
}

export function windowStart(
  current: number,
  total: number,
  size: number,
): number {
  return Math.max(0, Math.min(current - Math.floor(size / 2), total - size));
}
