<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  import type { IconSize } from '#/types/components';

  interface Props {
    name: string;
    size?: IconSize;
    class?: ClassValue;
  }

  const sizeClasses: Record<IconSize, string> = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-6',
  };

  const { name, size, class: className }: Props = $props();
</script>

<span
  class={['iconify', name, size && sizeClasses[size], className]}
  aria-hidden="true"
></span>
