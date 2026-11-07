<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  import { anchorInline } from '#/lib/css';

  import Anchor from './Anchor.svelte';

  interface Props {
    anchorClass?: ClassValue;
    aria?: string;
    href: string;
    text: string;
  }

  const { anchorClass, aria, href, text }: Props = $props();
</script>

<Anchor {href} {aria} class={[anchorInline(), anchorClass]}>
  {text}
</Anchor>
