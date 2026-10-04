<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  import { headingClasses } from '#/lib/css';
  import type { HeadingName } from '#/types/components';

  interface Props {
    tag: HeadingName;
    id?: string;
    class?: ClassValue;
    children: Snippet;
  }

  const { tag, children, id, class: className }: Props = $props();
</script>

<svelte:element this={tag} class={[headingClasses[tag], className]} {id}>
  {@render children()}
</svelte:element>
