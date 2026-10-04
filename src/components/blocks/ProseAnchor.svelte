<script lang="ts">
  import type { Snippet } from 'svelte';

  import { Anchor } from '#/components/ui';

  interface Props {
    href: string;
    children: Snippet;
  }
  const { href, children }: Props = $props();
</script>

<Anchor {href} class="not-prose link link-underline">
  {@render children()}
</Anchor>
