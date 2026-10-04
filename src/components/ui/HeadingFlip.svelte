<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  import type { HeadingName } from '#/types/components';

  import Heading from './Heading.svelte';

  interface Props {
    tag?: HeadingName;
    title: string;
    variants: string[];
    variantsClass?: ClassValue;
  }
  const {
    tag = 'h2',
    title,
    variants,
    variantsClass = 'text-accent-content bg-accent px-2',
  }: Props = $props();
</script>

<Heading {tag}>
  <span
    >{title}
    <span class="text-rotate">
      <span>
        {#each variants as variant}
          <span class={variantsClass}>
            {variant}.
          </span>
        {/each}
      </span>
    </span></span
  >
</Heading>
