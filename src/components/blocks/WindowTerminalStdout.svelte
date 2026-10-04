<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    line: string;
    class?: ClassValue;
    muted?: boolean;
  }

  let { line, class: className, muted = true }: Props = $props();
</script>

<div class={[{ 'opacity-75': muted }, className]}>{line}</div>
