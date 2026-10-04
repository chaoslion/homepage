<script lang="ts">
  import type { GetImageResult } from 'astro';
  import { onMount, type Snippet } from 'svelte';

  import { Grid, Image } from '#/components/ui';
  import { shufflePostsCollection } from '#/data/blog-tools';
  import type { PostsCollectionItem } from '#/types/collections';
  import { siteConfig } from '#content';

  interface Props {
    collection: PostsCollectionItem[];
    maxPosts: number;
    feature: GetImageResult;
    children: Snippet;
  }
  const { collection, maxPosts, feature, children }: Props = $props();
  let randomCollection: PostsCollectionItem[] = $state([]);

  onMount(() => {
    shufflePostsCollection(collection);
    randomCollection = collection.slice(0, maxPosts);
  });
</script>

<Grid class="items-center">
  <figure class="mt-8 flex flex-col sm:col-span-2 sm:row-span-2">
    <Image
      src={feature}
      label="Myself"
      class="rounded-box aspect-2/1 w-full object-cover"
    />
    <figcaption class="flex items-center justify-center text-center">
      <p class="p-2 text-xs font-semibold sm:text-base md:text-lg">
        {@render children()}
      </p>
    </figcaption>
  </figure>

  {#each randomCollection as post}
    <a
      href={post.href}
      class={`group mx-auto block w-full ${siteConfig.posts.previewCoverClass}`}
    >
      <Image
        src={post.cover}
        label={post.title}
        class="rounded-box aspect-2/1 w-full object-cover grayscale transition duration-250 ease-in-out group-hover:grayscale-0"
      />
    </a>
  {/each}
</Grid>
