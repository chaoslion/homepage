<script lang="ts">
  import type { TagsCollectionItem } from '#/types/collections';

  interface Props {
    tag: TagsCollectionItem;
    posts: number;
    totalTags: number;
  }
  let { tag, posts, totalTags }: Props = $props();

  const postsRatio = $derived(posts / totalTags);
  const btnClass = $derived(
    postsRatio >= 0.8
      ? 'btn btn-xl'
      : postsRatio >= 0.6
        ? 'btn btn-lg'
        : postsRatio >= 0.4
          ? ''
          : postsRatio >= 0.2
            ? 'btn btn-sm'
            : 'btn btn-xs',
  );
  const postsLabel = $derived(posts > 99 ? '99+' : posts);
</script>

<a
  href={tag.href}
  class={[
    'btn inline-flex gap-1 font-mono',
    btnClass,
    postsRatio <= 0.05
      ? 'opacity-50'
      : postsRatio <= 0.1
        ? 'opacity-75'
        : undefined,
  ]}
>
  {tag.title}
  <span class="text-primary">{postsLabel}</span>
</a>
