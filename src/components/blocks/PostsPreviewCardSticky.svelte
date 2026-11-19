<script lang="ts">
  import { Anchor } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';
  import { siteConfig } from '#content';

  import PostsPreviewCard from './PostsPreviewCard.svelte';
  import {
    PreviewCover,
    PreviewSummary,
    PreviewTime,
  } from './PostsPreviewCardParts';

  interface Props {
    post: PostsCollectionItem;
  }

  let { post }: Props = $props();
</script>

<Anchor
  href={post.href}
  class={['group mx-auto w-full', siteConfig.posts.previewCoverClass]}
>
  <PostsPreviewCard>
    {#snippet image()}
      <figure class="[overflow-anchor:none]">
        <PreviewCover {post} />
      </figure>
    {/snippet}

    <PreviewTime {post} />
    <h2 class="card-title group-hover:text-primary transition-colors">
      {post.title}
    </h2>
    <PreviewSummary {post} />
  </PostsPreviewCard>
</Anchor>
