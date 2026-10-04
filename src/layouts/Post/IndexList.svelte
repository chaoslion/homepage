<script lang="ts">
  import { transformerStyleToClass } from '@shikijs/transformers';

  import WindowTerminal from '#/components/blocks/WindowTerminal.svelte';
  import WindowTerminalCommand from '#/components/blocks/WindowTerminalCommand.svelte';
  import WindowTerminalStdout from '#/components/blocks/WindowTerminalStdout.svelte';
  import { Anchor } from '#/components/ui';
  import { anchorTerminal } from '#/lib/css';
  import type { TreeLinkItem } from '#/types/components';

  interface Props {
    postId: string;
    headingLinks: TreeLinkItem[];
    headingLinksAdditional: TreeLinkItem[];
  }

  const { postId, headingLinks, headingLinksAdditional }: Props = $props();

  const treeDepthPrefixSizing = 2;
  const treeDepthPrefixLast = `└${'─'.repeat(treeDepthPrefixSizing)}`;
  const treeDepthPrefixMiddle = `├${'─'.repeat(treeDepthPrefixSizing)}`;
  const treeDepthPrefixMiddleStart = `│${'\u00A0'.repeat(treeDepthPrefixSizing)}`;

  function treeNodePrefixContent(depth: number, isLast: boolean) {
    const treePrefix = isLast ? treeDepthPrefixLast : treeDepthPrefixMiddle;
    const prefix =
      depth > 0 ? `${treeDepthPrefixMiddleStart}${treePrefix}` : treePrefix;
    return prefix;
  }
</script>

{#snippet treeListingFn(items: TreeLinkItem[], name?: string)}
  {#if name}
    <WindowTerminalStdout line={name} />
  {/if}
  <ul class="flex flex-col">
    {#each items as item, index}
      <li>
        <Anchor href={item.link.href} class={anchorTerminal()}>
          <span class="opacity-25"
            >{treeNodePrefixContent(
              item.depth,
              index >= items.length - 1,
            )}</span
          >
          {item.link.label}
        </Anchor>
      </li>
    {/each}
  </ul>
{/snippet}

<WindowTerminal title="On This Page">
  <WindowTerminalCommand command={`tree -L2 .`} />
  {@render treeListingFn(headingLinks, postId)}
  {#if headingLinksAdditional}
    <div class="divider divider-accent">Appendix</div>
    <ul class="flex flex-col">
      {#each headingLinksAdditional as item}
        <li>
          <Anchor href={item.link.href} class={anchorTerminal()}>
            {item.link.label}
          </Anchor>
        </li>
      {/each}
    </ul>
  {/if}
</WindowTerminal>
