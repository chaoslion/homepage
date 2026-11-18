<script lang="ts">
  import { Anchor } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';
  import { siteConfig } from '#content';

  import PostsPreviewCard, {
    cardCover,
    cardMeta,
    cardSummary,
    cardTags,
    cardTime,
  } from './PostsPreviewCard.svelte';

  interface Props {
    post: PostsCollectionItem;
    /** Render without the card shell, e.g. as a carousel slide. */
    bare?: boolean;
  }

  let { post, bare = false }: Props = $props();
</script>

<PostsPreviewCard
  {bare}
  class={bare ? undefined : siteConfig.posts.previewCoverClass}
>
  {#snippet image()}
    <figure class="relative [overflow-anchor:none]">
      <Anchor href={post.href} class="group block w-full">
        {@render cardCover(post)}
      </Anchor>
    </figure>
  {/snippet}

  {@render cardMeta(post)}
  {@render cardTime(post)}

  <h2 class="card-title">
    <Anchor href={post.href} class="hover:text-primary transition-colors">
      {post.title}
    </Anchor>
  </h2>

  {@render cardSummary(post)}
  {@render cardTags(post, true)}
</PostsPreviewCard>
