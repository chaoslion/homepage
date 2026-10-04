<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  import { iconFlex } from '#/lib/css';

  import Icon from './Icon.svelte';

  interface Props {
    class?: ClassValue;
    label: string;
    labelColor?: string;
    labelIcon?: string;
    labelIconClass?: ClassValue;
    text: string;
    textColor?: string;
  }
  let {
    label,
    text,
    labelColor = 'badge-ghost',
    textColor = 'badge-secondary',
    labelIcon,
    labelIconClass,
    class: className = 'badge-sm',
  }: Props = $props();
</script>

<span class="join align-middle">
  <span
    class={[
      `join-item badge ${labelColor}`,
      className,
      labelIcon ? iconFlex() : undefined,
    ]}
  >
    {#if labelIcon}
      <Icon name={labelIcon} class={labelIconClass} />
    {/if}
    {label}
  </span>
  <span class={[`join-item badge ${textColor}`, className]}>
    {text}
  </span>
</span>
