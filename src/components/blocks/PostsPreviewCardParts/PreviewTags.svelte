<script lang="ts">
  import { Anchor } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';
  import { siteConfig } from '#content';

  interface Props {
    post: PostsCollectionItem;
    limit?: boolean;
  }

  let { post, limit = false }: Props = $props();
  const tags = $derived(
    limit ? post.tags.slice(0, siteConfig.posts.previewMaxTags) : post.tags,
  );
</script>

<div class="card-actions pt-4">
  {#each tags as item}
    <Anchor href={item.href} class="btn btn-xs font-mono">
      {item.title}
    </Anchor>
  {/each}
</div>
