<script lang="ts">
  import { Icon } from '#/components/ui';
  import type { TechCategoryItem } from '#/types/site';

  interface Props {
    stack: Record<string, TechCategoryItem>;
  }
  const { stack }: Props = $props();
</script>

<ul
  class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
>
  {#each Object.entries(stack) as [category, item], index}
    <li>
      {#if index > 0}<hr class="bg-accent" />{/if}
      <div class="timeline-middle">
        <Icon name={item.icon} class="size-8 md:mx-1" />
      </div>
      <div
        class={index % 2 === 0
          ? 'timeline-start mb-5 md:text-end'
          : 'timeline-end md:mb-5'}
      >
        <span class="font-mono italic">{item.label ?? category}</span>
        <div class="flex flex-wrap gap-1.5">
          {#each item.techs as tech}
            <span class="badge badge-ghost rounded-box font-mono">{tech}</span>
          {/each}
        </div>
      </div>
      {#if index < Object.entries(stack).length - 1}<hr
          class="bg-accent"
        />{/if}
    </li>
  {/each}
</ul>
