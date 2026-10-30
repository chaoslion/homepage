<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  import type { FileTreeContent } from '#/types/components';

  import Icon from '../ui/Icon.svelte';

  interface Props extends FileTreeContent {
    class?: ClassValue;
    includeRoot?: boolean;
    forceOpen?: boolean;
  }
  const {
    class: className,
    includeRoot = false,
    forceOpen = true,
    ...fileTreeRestProps
  }: Props = $props();

  interface TreeNode {
    name: string;
    isFolder: boolean;
    children: TreeNode[];
  }

  function pathsToTreeArray(paths: string[]): TreeNode {
    const root: TreeNode = { name: '.', children: [], isFolder: true };

    for (const path of paths) {
      const forcePath = path.at(-1) === '/';
      let parts = path.split('/').filter(Boolean);
      if (forcePath) {
        parts = [...parts.slice(0, -1), `${parts.at(-1)}/`];
      }

      let node = root;
      for (const part of parts) {
        const isFolder = part.at(-1) === '/';
        let child = node.children.find((c) => c.name === part);
        if (!child) {
          child = {
            name: isFolder ? part.slice(0, -1) : part,
            children: [],
            isFolder: isFolder,
          };
          node.children.push(child);
          node.isFolder = true;
        }
        node = child;
      }
    }

    return root;
  }

  const tree = $derived(pathsToTreeArray(fileTreeRestProps.paths));
</script>

{#snippet treeChildrenFn(children: TreeNode[], depth: number)}
  {#each children as child}
    {@render treeItemFn(child, depth)}
  {/each}
{/snippet}

{#snippet treeItemFn(tree: TreeNode, depth: number)}
  {@const isFolderOpen = forceOpen || depth === 0}
  <li>
    {#if tree.isFolder && tree.children.length > 0}
      <details open={isFolderOpen}>
        <summary>
          <Icon name="mdi--folder-outline" class="size-4" />
          {tree.name}
        </summary>
        <ul>
          {@render treeChildrenFn(tree.children, depth + 1)}
        </ul>
      </details>
    {:else}
      <div>
        <Icon
          name={tree.isFolder ? 'mdi--folder-outline' : 'mdi--file-outline'}
          class="size-4"
        />
        {tree.name}
      </div>
    {/if}
  </li>
{/snippet}

<div class={['overflow-x-auto', className]}>
  <ul class="menu menu-xs bg-base-200 rounded-box w-full">
    {#if includeRoot}
      {@render treeItemFn(tree, 0)}
    {:else}
      {@render treeChildrenFn(tree.children, 0)}
    {/if}
  </ul>
</div>
