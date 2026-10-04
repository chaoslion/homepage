<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    path: string;
    class?: ClassValue;
  }

  let { path, class: className }: Props = $props();
</script>

{#snippet groupFn(children: string[])}
  {#if children.length > 0}
    {@const parent = children[0]}
    {@const childrenRest = children.slice(1)}
    <li>
      {#if childrenRest.length > 0}
        <span class="menu-dropdown-show">{parent}</span>
        <ul class="menu-dropdown menu-dropdown-show">
          {@render groupFn(childrenRest)}
        </ul>
      {:else}
        {parent}
      {/if}
    </li>
  {/if}
{/snippet}

<ul class={`menu bg-base-200 rounded-box w-56 ${className ?? ''}`.trim()}>
  {@render groupFn(path.split('/'))}
</ul>
