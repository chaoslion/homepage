<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import type { ClassValue } from 'svelte/elements';
  import { type Player } from 'asciinema-player';

  interface Props {
    src: string;
    class: ClassValue;
  }
  const { src, class: className }: Props = $props();
  let container: HTMLDivElement;
  let player: Player | null = null;
  onMount(async () => {
    const { create } = await import('asciinema-player');
    if (player) {
      return;
    }
    player = create(src, container, {
      autoPlay: false,
      keystrokeOverlay: true,
      preload: true,
    });
  });

  onDestroy(() => {
    if (player) {
      player.dispose();
      player = null;
    }
  });
</script>

<div bind:this={container} class={className}></div>
