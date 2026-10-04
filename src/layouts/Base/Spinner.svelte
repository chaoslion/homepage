<script lang="ts">
  import { spinnerManager } from '#/data/spinner.svelte';
</script>

<div
  class:hidden={!spinnerManager.currentState}
  class="bg-base-100 fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 shadow-lg"
>
  <span class="loading loading-infinity loading-xl text-primary"></span>
</div>
