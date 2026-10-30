<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  import { iconFlex } from '#/lib/css';

  import Icon from './Icon.svelte';

  interface Props {
    figureId?: string;
    class?: ClassValue;
    captionClass?: ClassValue;
    caption?: string;
    captionResource?: Snippet;
    captionIcon?: string;
    children: Snippet;
  }
  let {
    children,
    captionClass,
    caption,
    captionResource,
    class: className,
    figureId,
    captionIcon,
  }: Props = $props();
</script>

<figure id={figureId} class={className}>
  {@render children()}
  {#if caption || captionResource}
    <figcaption
      class={[
        'text-base-content/75 flex flex-col gap-2 text-sm font-light',
        captionClass,
      ]}
    >
      {#if caption}
        <span class={iconFlex()}>
          <Icon
            name={captionIcon ?? 'mdi--information-outline'}
            class="size-4"
          />
          {caption}
        </span>
      {/if}
      {#if captionResource}
        <span class={iconFlex()}>
          <Icon name={captionIcon ?? 'mdi--link-variant'} class="size-4" />
          <cite>
            {@render captionResource()}
          </cite>
        </span>
      {/if}
    </figcaption>
  {/if}
</figure>
