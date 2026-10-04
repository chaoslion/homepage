<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    name: string;
    class?: ClassValue;
  }

  const { name, class: className }: Props = $props();
</script>

<span class={['iconify', name, className]} aria-hidden="true"></span>
