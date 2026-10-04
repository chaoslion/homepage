<script lang="ts">
  import Icon from './Icon.svelte';

  interface Props {
    label: string;
  }

  const { label } = $props();
</script>

<div class="badge badge-neutral badge-sm absolute right-2 bottom-2 gap-1">
  <Icon name="mdi--zoom-in-outline" class="h-3 w-3" />
  <span>{label}</span>
</div>
