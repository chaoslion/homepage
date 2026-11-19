<script lang="ts">
  import { navigate } from 'astro:transitions/client';
  import type { ClassValue } from 'svelte/elements';

  import { Icon } from '#/components/ui';
  import { windowStart } from '#/lib/helper';
  import { siteConfig } from '#content';

  interface Props {
    current: number;
    total: number;
    href?: string;
    onselect?: (page: number) => void;
    class?: ClassValue;
    variant?: ClassValue;
  }
  let {
    current,
    total,
    href,
    onselect,
    class: className,
    variant = 'btn-soft btn-secondary',
  }: Props = $props();

  const pagesMax = siteConfig.posts.paginateMaxPages;
  const pagesStart = $derived(windowStart(current - 1, total, pagesMax));

  function selectPage(page: number) {
    if (page === current) return;
    if (onselect) {
      onselect(page);
    } else if (href !== undefined) {
      navigate(page === 1 ? href : `${href}/${page}`);
    }
  }
</script>

{#snippet paginateButton(
  index: number,
  target: number,
  label: string,
  disabled: boolean,
  iconName?: string,
)}
  {@const isCurrent = iconName === undefined && target === current}
  <button
    type="button"
    class={[
      'join-item btn @max-lg:btn-sm',
      isCurrent ? 'btn-secondary' : variant,
      className,
    ]}
    aria-label={label}
    aria-current={isCurrent ? 'page' : undefined}
    onclick={() => selectPage(target)}
    {disabled}
  >
    {#if iconName !== undefined}
      <Icon name={iconName} class="size-5 @max-lg:size-4" />
    {:else}
      {index}
    {/if}</button
  >
{/snippet}

{#snippet first()}
  {@render paginateButton(
    -1,
    1,
    'First page',
    current === 1,
    'mdi--chevron-double-left',
  )}
{/snippet}

{#snippet previous()}
  {@render paginateButton(
    -1,
    current - 1,
    'Previous page',
    current === 1,
    'mdi--chevron-left',
  )}
{/snippet}

{#snippet next()}
  {@render paginateButton(
    -1,
    current + 1,
    'Next page',
    current === total,
    'mdi--chevron-right',
  )}
{/snippet}

{#snippet last()}
  {@render paginateButton(
    -1,
    total,
    'Last page',
    current === total,
    'mdi--chevron-double-right',
  )}
{/snippet}

{#snippet pageNumbers()}
  {#each { length: Math.min(pagesMax, total) } as _, index}
    {@const page = pagesStart + index + 1}
    {@render paginateButton(page, page, `Page ${page}`, false)}
  {/each}
{/snippet}

<div class="@container flex justify-center">
  <div class="join w-full justify-center @lg:hidden">
    {@render previous()}
    {@render pageNumbers()}
    {@render next()}
  </div>

  <div class="join hidden w-full justify-center @lg:flex @3xl:hidden">
    {@render first()}
    {@render previous()}
    {@render pageNumbers()}
    {@render next()}
    {@render last()}
  </div>

  <div class="hidden items-center gap-2 @3xl:flex">
    <div class="join">
      {@render first()}
      {@render previous()}
    </div>

    <div class="join">
      {@render pageNumbers()}
    </div>

    <div class="join">
      {@render next()}
      {@render last()}
    </div>
  </div>
</div>
