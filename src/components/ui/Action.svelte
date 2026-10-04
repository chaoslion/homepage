<script lang="ts" generics="T">
  import type { ActionError } from 'astro:actions';
  import type { Snippet } from 'svelte';

  import Badge from './Badge.svelte';
  import Spinner from './Spinner.svelte';

  type Result =
    | { data: undefined; error: ActionError }
    | { data: T; error: undefined };
  interface Props {
    promise: Promise<Result>;
    actionFn: Snippet<[T]>;
  }
  const { promise, actionFn }: Props = $props();
</script>

{#await promise}
  <Spinner class="loading-xs" />
{:then { data, error }}
  {#if error}
    <Badge label={error.code} text="ERROR" labelColor="badge-error" />
  {:else}
    {@render actionFn(data)}
  {/if}
{/await}
