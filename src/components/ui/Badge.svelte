<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  import { iconFlex } from '#/lib/css';

  import Icon from './Icon.svelte';

  interface Props {
    class?: ClassValue;
    label: string;
    labelIcon?: string;
    labelIconClass?: ClassValue;
    text: string;
    classLabel?: ClassValue;
    classText?: ClassValue;
  }
  let {
    label,
    text,
    labelIcon,
    class: className = 'badge-sm',
    classLabel = 'badge-neutral',
    classText = 'badge-ghost',
  }: Props = $props();
</script>

<span class="join align-middle">
  <span
    class={[
      'join-item badge',
      classLabel,
      className,
      labelIcon ? iconFlex() : undefined,
    ]}
  >
    {#if labelIcon}
      <Icon name={labelIcon} size="sm" />
    {/if}
    {label}
  </span>
  <span class={['join-item badge badge-soft', classText, className]}>
    {text}
  </span>
</span>
