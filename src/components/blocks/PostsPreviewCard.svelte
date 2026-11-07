<script lang="ts">
  import {
    Anchor,
    AnchorTextInternal,
    Badge,
    Card,
    Image,
  } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';
  import { siteConfig } from '#content';

  interface Props {
    post: PostsCollectionItem;
    embed?: boolean;
  }
  let { post, embed = false }: Props = $props();
  const postTags = $derived(
    embed ? post.tags.slice(0, siteConfig.posts.previewMaxTags) : post.tags,
  );

  const badgeIconClass = 'size-4';

  function dateString(date: Date): string {
    return date.toLocaleDateString('en-US', { dateStyle: 'long' });
  }
</script>

<Card
  class={[
    'mx-auto w-full',
    embed ? siteConfig.posts.previewCoverClass : undefined,
  ]}
>
  {#if embed}
    <figure class="[overflow-anchor:none]">
      <Anchor href={post.href} class="group block w-full">
        <Image
          src={post.cover}
          label={post.title}
          class="aspect-2/1 w-full object-cover ease-in-out group-hover:scale-110 motion-safe:transition-transform motion-safe:duration-250"
        />
      </Anchor>
    </figure>
  {/if}
  <div class="card-body">
    <div class="card-actions items-center">
      <Anchor href={post.category.href}>
        <Badge
          label="Category"
          labelIcon={post.category.icon}
          labelIconClass={badgeIconClass}
          text={post.category.title}
          textColor="badge-primary"
        />
      </Anchor>
      {#if post.series}
        <Anchor href={post.series.href}>
          <Badge
            label="Series"
            labelIcon="mdi--layers-outline"
            labelIconClass={badgeIconClass}
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
          labelIconClass={badgeIconClass}
        />
      {/if}
      {#if post.isLegacy}
        <Badge
          label="Language"
          text="DE"
          labelIcon="mdi--language"
          labelIconClass={badgeIconClass}
        />
      {/if}
    </div>

    <div class="card-actions text-xs">
      <span class="mr-auto">{dateString(post.date)}</span>
      <span>{post.readingTime.text}</span>
    </div>

    {#if embed}
      <h2 class="card-title">
        <Anchor href={post.href} class="hover:text-primary transition-colors">
          {post.title}
        </Anchor>
      </h2>
    {/if}

    <div class="text-base-content/75 mt-2 text-sm">
      <p class="leading-relaxed">
        {post.summary}
      </p>

      {#if embed}
        <div class="mt-2">
          <AnchorTextInternal
            href={post.href}
            text="Read more"
            aria="Read more about {post.title}"
          />
        </div>
      {/if}
    </div>

    <div class="card-actions mt-auto pt-4">
      {#each postTags as item}
        <Anchor href={item.href} class="btn btn-xs font-mono">
          {item.title}
        </Anchor>
      {/each}
    </div>
  </div>
</Card>
