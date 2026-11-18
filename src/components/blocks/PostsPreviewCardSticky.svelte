<script lang="ts">
  import { Anchor } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';
  import { siteConfig } from '#content';

  import PostsPreviewCard, {
    cardCover,
    cardSummary,
    cardTime,
  } from './PostsPreviewCard.svelte';

  interface Props {
    post: PostsCollectionItem;
  }

  let { post }: Props = $props();
</script>

<Anchor
  href={post.href}
  class={['group mx-auto block w-full', siteConfig.posts.previewCoverClass]}
>
  <PostsPreviewCard>
    {#snippet image()}
      <figure class="[overflow-anchor:none]">
        {@render cardCover(post)}
      </figure>
    {/snippet}

    {@render cardTime(post)}
    <h2 class="card-title group-hover:text-primary transition-colors">
      {post.title}
    </h2>
    {@render cardSummary(post)}
  </PostsPreviewCard>
</Anchor>
