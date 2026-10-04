<script lang="ts">
  import { AnchorText, AnchorTextExternal } from '#/components/ui';
  import { isHrefExternal } from '#/lib/anchor';
  import type { ResourceCollectionItem } from '#/types/collections';

  interface Props {
    resource: ResourceCollectionItem;
    label?: string;
  }

  const { label, resource }: Props = $props();
</script>

{#if isHrefExternal(resource.href)}
  <AnchorTextExternal
    href={resource.href}
    text={label ?? resource.label}
    anchorClass="not-prose"
  />
{:else}
  <AnchorText
    href={resource.href}
    text={label ?? resource.label}
    anchorClass="not-prose"
  />
{/if}
