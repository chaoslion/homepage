<script lang="ts">
  import type { Snippet } from 'svelte';

  import Window from '#/components/blocks/Window.svelte';
  import { Icon } from '#/components/ui';
  import { iconFlex } from '#/lib/css';
  import type { CodeBlockAttribution } from '#/types/components';
  import type { BlogCodeBlockProps } from '#plugins-satteri';

  interface Props extends BlogCodeBlockProps {
    language: string;
    languageExt: string;
    languageEntrypoint: string;
    attributionAuthor: string;
    attributionSource: string;
    children: Snippet;
  }

  const {
    id,
    label,
    language,
    languageExt,
    languageEntrypoint,
    attributionAuthor,
    attributionSource,
    children,
  }: Props = $props();
  let codeBody: HTMLDivElement;
  let copied = $state(false);

  function prepareText(content: string): string {
    const attribution: CodeBlockAttribution = {
      author: attributionAuthor,
      source: attributionSource,
    };
    return (
      Object.entries(attribution)
        .toSorted()
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n') +
      '\n' +
      content
    );
  }

  async function handleCopy(event: ClipboardEvent) {
    // if (!event.clipboardData) return;
    // const selection = window.getSelection()?.toString() ?? '';
    // event.preventDefault();
    // event.clipboardData.setData('text/plain', prepareText(selection));
  }

  async function copyToClipboard() {
    if (copied || !codeBody.textContent) {
      return;
    }
    await navigator.clipboard.writeText(prepareText(codeBody.textContent));
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
  const finalLabel = $derived(label ?? 'Code');
</script>

<figure>
  <Window {id} class="not-prose">
    {#snippet title()}
      <div class="custom-font-title flex items-center gap-2 p-2 text-lg">
        <span class="mr-auto min-w-0 overflow-x-auto whitespace-nowrap">{finalLabel}</span>
        <button
          class={['btn btn-secondary btn-xs', iconFlex()]}
          disabled={copied}
          onclick={copyToClipboard}
        >
          <Icon
            name={copied ? 'mdi--check' : 'mdi--content-copy'}
            class="size-4"
          />
          {copied ? 'Copied' : 'Copy'}
        </button>
        <div class="badge badge-ghost">{language}</div>
      </div>
    {/snippet}
    <div bind:this={codeBody} oncopy={handleCopy}>
      {@render children()}
    </div>
  </Window>
</figure>
