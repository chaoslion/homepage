<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  interface Props {
    class?: ClassValue;
    searchOptions?: Record<string, any>;
    inputClass?: ClassValue;
    panelClass?: ClassValue;
    enableHotkey?: boolean;
    enableRouter?: boolean;
  }
  const {
    class: className,
    inputClass,
    searchOptions,
    panelClass,
    enableHotkey = false,
  }: Props = $props();
</script>

<rangefind-search
  searchOptions={searchOptions ? { search: searchOptions } : undefined}
  src="/rangefind/"
  placeholder={`${enableHotkey ? 'hit / to ' : ''}grep -rn`}
  hotkey={enableHotkey}
  open-on-focus={true}
  root-class={`relative block ${className ?? ''}`.trim()}
  input-class={`input font-mono ${inputClass ?? ''}`.trim()}
  panel-class={`mt-2 p-2 bg-base-100 shadow-sm overflow-hidden overflow-y-auto max-h-[min(60vh,30rem)] ${panelClass ?? ''}`.trim()}
  empty-class="select-none bg-error rounded-sm text-error-content px-1 py-2 text-center"
  mark-class="bg-accent text-accent-content px-px py-0 rounded-sm"
  suggest-class="border-b border-base-200 list-none italic space-y-0.5 mb-2"
  suggest-item-class="rounded-sm cursor-pointer p-1 aria-selected:bg-secondary aria-selected:text-secondary-content hover:bg-secondary hover:text-secondary-content"
  list-class="list-none space-y-0.5"
  option-class="block p-1 rounded-sm cursor-pointer border-base-100 aria-selected:bg-primary aria-selected:text-primary-content hover:bg-primary hover:text-primary-content"
  option-title-class="block font-bold text-lg"
  option-snippet-class="block mt-1 text-sm opacity-75"
  option-url-class="block link mt-1 text-sm overflow-hidden text-overflow-ellipsis nowrap"
></rangefind-search>
