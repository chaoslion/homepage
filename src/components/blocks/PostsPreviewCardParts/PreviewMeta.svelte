<script lang="ts">
  import { Anchor, Badge } from '#/components/ui';
  import { dateString } from '#/lib/helper';
  import type { PostsCollectionItem } from '#/types/collections';

  interface Props {
    post: PostsCollectionItem;
  }

  let { post }: Props = $props();
</script>

<div class="card-actions items-center">
  <Anchor href={post.category.href}>
    <Badge
      label="Category"
      labelIcon={post.category.icon}
      text={post.category.title}
      classText="badge-primary"
    />
  </Anchor>

  {#if post.series}
    <Anchor href={post.series.href}>
      <Badge
        label="Series"
        labelIcon="mdi--layers-outline"
        text={post.series.title}
        classText="badge-secondary"
      />
    </Anchor>
  {/if}

  {#if post.isUpdated}
    <Badge
      label="Updated"
      text={dateString(post.dateFinal)}
      labelIcon="mdi--book-edit-outline"
    />
  {/if}

  {#if post.isLegacy}
    <Badge label="Language" text="DE" labelIcon="mdi--language" />
  {/if}
</div>
