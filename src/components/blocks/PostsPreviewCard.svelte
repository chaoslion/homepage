<script lang="ts" module>
  import { Anchor, Badge, Card, Image } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';
  import { siteConfig } from '#content';

  // Shared building blocks for the preview card variants
  // (Single, Sticky, Header). Each takes the post as a parameter.
  export { cardCover, cardMeta, cardSummary, cardTags, cardTime };

  function dateString(date: Date): string {
    return date.toLocaleDateString('en-US', { dateStyle: 'long' });
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    class?: ClassValue;
    /** Render without the card shell, e.g. inside another card. */
    bare?: boolean;
    image?: Snippet;
    children: Snippet;
  }

  let { class: className, bare = false, image, children }: Props = $props();
</script>

{#snippet cardTime(post: PostsCollectionItem)}
  <div class="card-actions text-xs">
    <span class="mr-auto">{dateString(post.date)}</span>
    <span>{post.readingTime.text}</span>
  </div>
{/snippet}

{#snippet cardMeta(post: PostsCollectionItem)}
  <div class="card-actions items-center">
    <Anchor href={post.category.href}>
      <Badge
        label="Category"
        labelIcon={post.category.icon}
        text={post.category.title}
        textColor="badge-primary"
      />
    </Anchor>

    {#if post.series}
      <Anchor href={post.series.href}>
        <Badge
          label="Series"
          labelIcon="mdi--layers-outline"
          text={post.series.title}
          textColor="badge-primary"
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
{/snippet}

{#snippet cardTags(post: PostsCollectionItem, limit: boolean)}
  {@const tags = limit
    ? post.tags.slice(0, siteConfig.posts.previewMaxTags)
    : post.tags}
  <div class="card-actions mt-auto pt-4">
    {#each tags as item}
      <Anchor href={item.href} class="btn btn-xs font-mono">
        {item.title}
      </Anchor>
    {/each}
  </div>
{/snippet}

{#snippet cardCover(post: PostsCollectionItem)}
  <Image
    src={post.cover}
    label={post.title}
    class="aspect-2/1 w-full object-cover ease-in-out group-hover:scale-110 motion-safe:transition-transform motion-safe:duration-250"
  />
{/snippet}

{#snippet cardSummary(post: PostsCollectionItem)}
  <p class="text-base-content/75 mt-2 text-sm leading-relaxed">
    {post.summary}
  </p>
{/snippet}

{#snippet content()}
  {@render image?.()}
  <div class="card-body">
    {@render children()}
  </div>
{/snippet}

{#if bare}
  <div class={['card h-full w-full', className]}>
    {@render content()}
  </div>
{:else}
  <Card class={['mx-auto h-full w-full', className]}>
    {@render content()}
  </Card>
{/if}
