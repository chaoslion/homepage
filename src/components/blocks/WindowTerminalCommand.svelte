<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  import { typedTerminalLine } from '#/lib/attachments';

  interface Props {
    command: string | string[];
    class?: ClassValue;
    textClass?: ClassValue;
    muted?: boolean;
  }

  let { command, class: className, textClass, muted = true }: Props = $props();
</script>

<div class={['inline-flex gap-2', { 'opacity-50': muted }, className]}>
  <span class="text-success select-none">$</span>
  {#if Array.isArray(command)}
    <span class={textClass} {@attach typedTerminalLine(command)}></span>
  {:else}
    <span class={textClass}>{command}</span>
  {/if}
</div>
