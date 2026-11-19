<script lang="ts">
  import { Card } from '#/components/ui';
  import type { PostsCollectionItem } from '#/types/collections';
  import { siteConfig } from '#content';

  import Paginate from './Paginate.svelte';
  import PostsPreviewCardSingle from './PostsPreviewCardSingle.svelte';

  interface Props {
    posts: PostsCollectionItem[];
  }

  let { posts }: Props = $props();
  const series = $derived(posts[0]!.series!);

  let track: HTMLDivElement | undefined = $state();
  let active = $state(0);

  let shown = $state(0);
  let settleTimer: ReturnType<typeof setTimeout> | undefined;
  function indexAt(): number {
    return track ? Math.round(track.scrollLeft / track.clientWidth) : 0;
  }
  function settle() {
    active = indexAt();
  }
  function onScroll() {
    shown = indexAt();
    if ('onscrollend' in window) return;
    clearTimeout(settleTimer);
    settleTimer = setTimeout(settle, 120);
  }

  function slideLabel(i: number): string {
    return i === 0
      ? `Newest of ${posts.length} parts`
      : `${i} before the newest, of ${posts.length} parts`;
  }

  function goTo(i: number) {
    if (!track) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({
      left: i * track.clientWidth,
      behavior: reduce ? 'auto' : 'smooth',
    });
  }
</script>

<Card
  class={[
    'border-secondary/50 mx-auto w-full overflow-hidden',
    siteConfig.posts.previewCoverClass,
  ]}
  role="region"
  aria-roledescription="carousel"
  aria-label="{series.title}: {posts.length} parts published in a row"
>
  <div
    bind:this={track}
    onscroll={onScroll}
    onscrollend={settle}
    class="carousel flex-1 touch-manipulation overscroll-x-contain"
  >
    {#each posts as post, i (post.slug)}
      <div
        class="carousel-item w-full snap-always"
        role="group"
        aria-roledescription="slide"
        aria-label={slideLabel(i)}
        inert={i !== active}
      >
        <PostsPreviewCardSingle {post} bare />
      </div>
    {/each}
  </div>

  <div class="border-secondary/40 flex flex-col gap-1 border-t px-4 py-2">
    <span class="text-secondary text-center text-xs font-semibold select-none">
      {posts.length} parts published in a row
    </span>
    <span class="sr-only" aria-live="polite">{slideLabel(shown)}</span>
    <Paginate
      class="flex-1"
      current={shown + 1}
      total={posts.length}
      onselect={(page) => goTo(page - 1)}
    />
  </div>
</Card>
