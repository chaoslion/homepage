<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  import { isAnchorStaticDownload } from '#/lib/anchor';
  import { anchorInlineIcon } from '#/lib/css';

  import Anchor from './Anchor.svelte';
  import Icon from './Icon.svelte';

  interface Props {
    anchorClass?: ClassValue;
    aria?: string;
    href: string;
    icon?: string;
    iconClass?: ClassValue;
    text: string;
  }

  const { anchorClass, aria, href, icon, text, iconClass }: Props = $props();
</script>

<Anchor {href} {aria} class={[anchorInlineIcon(), anchorClass]}>
  {text}
  <Icon
    name={icon ??
      (isAnchorStaticDownload(href)
        ? 'mdi--file-download-outline'
        : 'mdi--arrow-right')}
    class={iconClass}
  />
</Anchor>
