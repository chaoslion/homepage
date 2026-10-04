<script lang="ts">
  import { AnchorText, Badge, Card, Icon, Image } from '#/components/ui';
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
  class={`mx-auto w-full ${embed ? siteConfig.posts.previewCoverClass : ''}`.trim()}
>
  {#if embed}
    <figure class="[overflow-anchor:none]">
      <a href={post.href} class="group block w-full">
        <Image
          src={post.cover}
          label={post.title}
          class="aspect-2/1 w-full object-cover transition-transform duration-250 ease-in-out group-hover:scale-110"
        />
      </a>
    </figure>
  {/if}
  <div class="card-body">
    <div class="card-actions items-center">
      <a href={post.category.href}>
        <Badge
          label="Category"
          labelIcon="mdi--shape-outline"
          labelIconClass={badgeIconClass}
          text={post.category.title}
          textColor="badge-primary"
        />
      </a>
      {#if post.series}
        <a href={post.series.href}>
          <Badge
            label="Series"
            labelIcon="mdi--layers-outline"
            labelIconClass={badgeIconClass}
            text={post.series.title}
            textColor="badge-primary"
          />
        </a>
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
      <h2 class="card-title">{post.title}</h2>
    {/if}

    <div class="border-accent border-l-2 py-2 pl-2">
      <p>
        {post.summary}
        {#if embed}
          <AnchorText
            href={post.href}
            text="Read more"
            aria="Read more about {post.title}"
          />
        {/if}
      </p>
    </div>

    <div class="card-actions">
      {#each postTags as item}
        <a href={item.href} class="btn btn-xs font-mono">
          {item.title}
        </a>
      {/each}
    </div>
  </div>
</Card>
