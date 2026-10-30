<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    class?: ClassValue;
  }
  const { class: className }: Props = $props();
</script>

<span class={['loading loading-spinner', className]}></span>
