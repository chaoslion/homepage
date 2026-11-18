<script lang="ts">
  import { Anchor, Icon } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';

  interface Props {
    prevPost: PostsCollectionItem;
    nextPost: PostsCollectionItem;
    prevPostLimit: boolean;
    nextPostLimit: boolean;
  }
  const { prevPost, nextPost, prevPostLimit, nextPostLimit }: Props = $props();
</script>

{#snippet buttonFn(title: string, icon: string, invert: boolean = false)}
  {#if invert}
    <span class="truncate">{title}</span>
    <Icon name={icon} size="sm" class="shrink-0" />
  {:else}
    <Icon name={icon} size="sm" class="shrink-0" />
    <span class="truncate">{title}</span>
  {/if}
{/snippet}

<div class="join grid grid-cols-2">
  <Anchor
    href={nextPost.href}
    class="join-item btn btn-outline inline-flex gap-1"
  >
    {@render buttonFn(
      nextPost.title,
      nextPostLimit ? 'mdi--arrow-u-right-top' : 'mdi--arrow-left-thin',
    )}
  </Anchor>
  <Anchor
    href={prevPost.href}
    class="join-item btn btn-outline inline-flex gap-1"
  >
    {@render buttonFn(
      prevPost.title,
      prevPostLimit ? 'mdi--arrow-u-left-top' : 'mdi--arrow-right-thin',
      true,
    )}
  </Anchor>
</div>
