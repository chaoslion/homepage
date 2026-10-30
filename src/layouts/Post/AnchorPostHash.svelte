<script lang="ts">
  import { AnchorText } from '#/components/ui';
  import type {
    BlogLinkInternalPostHash,
    BlogPostInternalLinkType,
  } from '#plugins-satteri';

  interface Props extends BlogLinkInternalPostHash {
    href?: string;
    label?: string;
    labelSuffix?: string;
  }
  const { href, target, type, id, label, labelSuffix }: Props = $props();

  const typeIcon: Record<BlogPostInternalLinkType, string> = {
    code: 'mdi--code-tags',
    section: 'mdi--pound',
    eqn: 'mdi--function-variant',
    fig: 'mdi--image-filter-hdr-outline',
  };

  const hrefFinal = $derived(href ? `${href}#${target}` : `#${target}`);
</script>

<AnchorText
  href={hrefFinal}
  icon={typeIcon[type]}
  anchorClass="not-prose"
  text={label ?? (labelSuffix ? `${id} (${labelSuffix})` : id)}
/>
