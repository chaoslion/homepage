<script lang="ts">
  import type { HeadingFancyProps } from '#/types/components';

  import Heading from './Heading.svelte';

  const {
    title,
    class: className,
    subtitle,
    preposition,
    id,
    tag = 'h2',
  }: HeadingFancyProps = $props();
</script>

<div class={className}>
  <div class="flex items-stretch gap-3">
    <!-- Accent Bar: dynamically spans full height of title + subtitle -->
    <div
      aria-hidden="true"
      class="bg-accent w-2 shrink-0 rounded-xs sm:w-2.5"
    ></div>

    <div class="flex min-w-0 flex-col justify-center">
      <Heading {tag} {id}>
        <span>{title}</span>
        {#if preposition}
          <span class="font-normal">{preposition}</span>
        {/if}
      </Heading>

      {#if subtitle}
        <p class="text-base-content/60 mt-0.5 text-sm font-normal sm:text-base">
          {subtitle}
        </p>
      {/if}
    </div>
  </div>

  <div
    aria-hidden="true"
    class="from-base-300 to-base-100 mt-2 h-0.5 bg-linear-to-r"
  ></div>
</div>
