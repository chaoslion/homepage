<script lang="ts">
  import type { TagsCollectionPosts } from '#/types/collections';

  import TaxonomyTagsCloudItem from './TaxonomyTagsCloudItem.svelte';

  interface Props {
    tags: TagsCollectionPosts[];
  }
  let { tags }: Props = $props();
</script>

<div class="flex flex-wrap items-center gap-2">
  {#each tags as tagItem}
    <TaxonomyTagsCloudItem
      tag={tagItem.tag}
      posts={tagItem.posts}
      totalTags={tags.length}
    />
  {/each}
</div>
