<script lang="ts">
  import { Card } from '#/components/ui';
  import { windowStart } from '#/lib/helper';
  import type { PostsCollectionItem } from '#/types/collections';
  import { siteConfig } from '#content';

  import PostsPreviewCardSingle from './PostsPreviewCardSingle.svelte';

  interface Props {
    /** Latest part first, then the earlier parts of the burst. */
    posts: PostsCollectionItem[];
  }

  let { posts }: Props = $props();
  const series = $derived(posts[0]!.series!);

  let track: HTMLDivElement | undefined = $state();
  let active = $state(0);

  // `shown` follows the scroll position live and drives the counter/buttons.
  // `active` (which slides are `inert`) only settles once scrolling has
  // stopped, so slides don't flip interactivity mid-swipe.
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

  // Sliding window of position dots: at most DOTS_MAX visible, current
  // slide kept centred where possible. One dot button = size-6 = 1.5rem.
  const DOTS_MAX = 5;
  const DOT_SIZE_REM = 1.5;
  const dotsStart = $derived(windowStart(shown, posts.length, DOTS_MAX));
  const dotsWidth = $derived(
    `${Math.min(posts.length, DOTS_MAX) * DOT_SIZE_REM}rem`,
  );

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
    'border-primary/40 mx-auto h-full w-full overflow-hidden',
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
    class="carousel w-full flex-1 touch-manipulation overscroll-x-contain"
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

  <div
    class="border-primary/20 bg-primary/5 flex items-center justify-between gap-2 border-t px-4 py-2"
  >
    <button
      type="button"
      class="btn btn-circle btn-ghost btn-sm disabled:invisible"
      aria-label="Newer part"
      disabled={shown === 0}
      onclick={() => goTo(shown - 1)}
    >
      ←
    </button>
    <div class="flex flex-col items-center">
      <span class="text-primary text-xs font-semibold">
        {posts.length} parts published in a row
      </span>
      <!-- position: newest on the left, filled dot = current slide.
           Long bursts show a sliding window of dots; edge dots shrink
           to hint that there are more in that direction. -->
      <span class="overflow-hidden" style:width={dotsWidth}>
        <span
          class="flex motion-safe:transition-transform motion-safe:duration-200"
          style:transform="translateX(-{dotsStart * DOT_SIZE_REM}rem)"
        >
          {#each posts as post, i (post.slug)}
            {@const inWindow = i >= dotsStart && i < dotsStart + DOTS_MAX}
            {@const edge =
              (i === dotsStart && dotsStart > 0) ||
              (i === dotsStart + DOTS_MAX - 1 &&
                dotsStart + DOTS_MAX < posts.length)}
            <button
              type="button"
              class="group/dot flex size-6 shrink-0 cursor-pointer items-center justify-center"
              aria-label={slideLabel(i)}
              aria-current={i === shown ? 'true' : undefined}
              tabindex={inWindow ? undefined : -1}
              aria-hidden={inWindow ? undefined : 'true'}
              onclick={() => goTo(i)}
            >
              <span
                class={[
                  'border-primary group-hover/dot:bg-primary/40 size-2 rounded-full border motion-safe:transition-[background-color,scale]',
                  i === shown && 'bg-primary group-hover/dot:bg-primary',
                  !inWindow ? 'scale-0' : edge && 'scale-60',
                ]}
              ></span>
            </button>
          {/each}
        </span>
      </span>
      <span class="sr-only" aria-live="polite">{slideLabel(shown)}</span>
    </div>
    <button
      type="button"
      class="btn btn-circle btn-ghost btn-sm disabled:invisible"
      aria-label="Earlier part"
      disabled={shown === posts.length - 1}
      onclick={() => goTo(shown + 1)}
    >
      →
    </button>
  </div>
</Card>
