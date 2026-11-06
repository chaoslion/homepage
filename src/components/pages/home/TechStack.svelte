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
      {#if index > 0}
        <hr class="bg-accent" />
      {/if}

      <!-- Icons bleiben in Accent-Orange -->
      <div class="timeline-middle text-accent">
        <Icon name={item.icon} class="size-7 md:mx-2" />
      </div>

      <!-- Klassische Ausrichtung wie in deinem Original -->
      <div
        class={index % 2 === 0
          ? 'timeline-start mb-6 md:text-end'
          : 'timeline-end mb-6'}
      >
        <!-- Zurück zum lockeren Monospace Italic -->
        <span class="text-base-content/80 mb-1 block font-mono text-sm italic">
          {item.label ?? category}
        </span>

        <!-- Badges mit solidem base-200 und leichter Aufhellung/Border -->
        <div
          class="flex flex-wrap gap-1.5 {index % 2 === 0
            ? 'md:justify-end'
            : ''}"
        >
          {#each item.techs as tech}
            <span
              class="badge bg-base-100 text-base-content border-base-content/20 rounded-box border px-2.5 py-2 font-mono text-xs shadow-sm"
            >
              {tech}
            </span>
          {/each}
        </div>
      </div>

      {#if index < Object.entries(stack).length - 1}
        <hr class="bg-accent" />
      {/if}
    </li>
  {/each}
</ul>
