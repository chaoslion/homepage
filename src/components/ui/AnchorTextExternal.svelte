<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  import { anchorInlineIcon } from '#/lib/css';

  import Anchor from './Anchor.svelte';
  import Icon from './Icon.svelte';

  interface Props {
    href: string;
    anchorClass?: ClassValue;
    iconClass?: ClassValue;
    text: string;
  }

  const { text, iconClass, href, anchorClass }: Props = $props();
</script>

<Anchor {href} class={[anchorInlineIcon(), anchorClass]}>
  {text}
  <Icon name="mdi--arrow-up-right" class={iconClass} />
</Anchor>
