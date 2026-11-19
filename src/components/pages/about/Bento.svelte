<script lang="ts">
  import type { GetImageResult } from 'astro';
  import { onMount, type Snippet } from 'svelte';

  import { Anchor, Grid, Icon, Image } from '#/components/ui';
  import { shuffleCollection } from '#/lib/helper';
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

  function shuffleCollectionSlice() {
    randomCollection = shuffleCollection([...collection]).slice(0, maxPosts);
  }

  onMount(() => {
    shuffleCollectionSlice();
  });
</script>

<Grid class="mt-8">
  <figure class="flex flex-col sm:col-span-2 sm:row-span-2 lg:row-span-3">
    <Image
      src={feature}
      label="Myself"
      class="rounded-box ring-base-content/10 aspect-4/3 w-full object-cover ring-1 lg:aspect-auto lg:min-h-0 lg:grow lg:basis-0"
    />
    <figcaption class="flex items-center justify-center gap-2 text-center">
      <p class="p-2 text-xs font-semibold sm:text-base md:text-lg">
        {@render children()}
      </p>
      <button
        type="button"
        class="btn btn-ghost btn-circle btn-sm"
        aria-label="Shuffle posts"
        onclick={shuffleCollectionSlice}
      >
        <Icon name="mdi--reload" size="md" />
      </button>
    </figcaption>
  </figure>

  {#each randomCollection as post}
    <Anchor
      href={post.href}
      class={[
        'group rounded-box ring-base-content/10 relative mx-auto block w-full overflow-hidden ring-1',
        siteConfig.posts.previewCoverClass,
      ]}
    >
      <Image
        src={post.cover}
        label={post.title}
        class="aspect-2/1 w-full object-cover transition duration-250 ease-in-out group-hover:grayscale-0 pointer-fine:grayscale"
      />
      <span
        class="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/95 via-black/75 to-transparent px-3 pt-16 pb-3 text-sm leading-snug font-semibold text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.8)]"
      >
        {post.title}
      </span>
    </Anchor>
  {/each}
</Grid>
