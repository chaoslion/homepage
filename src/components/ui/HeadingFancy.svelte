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
  <Heading {tag} {id}>
    {title}
    {#if subtitle && preposition}
      {preposition}
      <span class="text-base-content/50">{subtitle}</span>{/if}
  </Heading>
  {#if subtitle && !preposition}
    <p class="text-base-content/50 mt-1 text-base font-normal sm:text-lg">
      {subtitle}
    </p>
  {/if}
  <div class="from-accent to-base-100 mt-1 h-1 bg-linear-to-r"></div>
</div>
