<script lang="ts">
  import type { HeadingFancyProps } from '#/types/components';

  import Heading from './Heading.svelte';

  const {
    title,
    class: className,
    id,
    tag = 'h2',
    subtitle,
  }: HeadingFancyProps = $props();
</script>

<div class={className}>
  <div class="flex items-stretch gap-3">
    <div
      aria-hidden="true"
      class="bg-accent w-2 shrink-0 rounded-xs sm:w-2.5"
    ></div>

    <div class="flex flex-col justify-center">
      <Heading {tag} {id} class="leading-tight">
        <span>{title}</span>
      </Heading>

      {#if subtitle !== undefined}
        <p
          class="text-base-content/75 mt-1 text-sm leading-none font-normal sm:text-base"
        >
          {#if subtitle.label !== undefined}
            {subtitle.title} &middot; {subtitle.label}
          {:else}
            {subtitle.title}
          {/if}
        </p>
      {/if}
    </div>
  </div>

  {#if tag !== 'h1'}
    <div
      aria-hidden="true"
      class="from-base-300 to-base-100 mt-2 h-0.5 bg-linear-to-r"
    ></div>
  {/if}
</div>
