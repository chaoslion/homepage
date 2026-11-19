<script lang="ts">
  import { Anchor } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';
  import { siteConfig } from '#content';

  import PostsPreviewCard from './PostsPreviewCard.svelte';
  import {
    PreviewCover,
    PreviewMeta,
    PreviewSummary,
    PreviewTags,
    PreviewTime,
  } from './PostsPreviewCardParts';

  interface Props {
    post: PostsCollectionItem;
    bare?: boolean;
  }

  let { post, bare = false }: Props = $props();
</script>

<PostsPreviewCard
  {bare}
  class={bare ? undefined : siteConfig.posts.previewCoverClass}
>
  {#snippet image()}
    <figure class="[overflow-anchor:none]">
      <Anchor
        href={post.href}
        class="group w-full focus-visible:-outline-offset-2"
      >
        <PreviewCover {post} />
      </Anchor>
    </figure>
  {/snippet}

  <PreviewMeta {post} />
  <PreviewTime {post} />

  <h2 class="card-title">
    <Anchor href={post.href} class="hover:text-primary transition-colors">
      {post.title}
    </Anchor>
  </h2>

  <PreviewSummary {post} />
  <PreviewTags {post} limit />
</PostsPreviewCard>
