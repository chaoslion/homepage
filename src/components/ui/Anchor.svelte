<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  import { parseAnchor } from '#/lib/anchor';

  export interface Props {
    href: string;
    aria?: string;
    class?: ClassValue;
    children: Snippet;
  }

  const { href, aria, class: className, children }: Props = $props();
  const anchor = $derived(parseAnchor(href));
</script>

<a href={anchor.href} class={className} aria-label={aria} {...anchor.attrs}>
  {@render children()}
</a>
