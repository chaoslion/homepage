<script lang="ts">
  import WindowTerminalCommand from '#/components/blocks/WindowTerminalCommand.svelte';
  import { Anchor, Badge, Heading } from '#/components/ui';
  import { siteConfig } from '#content';
</script>

<div
  class="bg-neutral text-neutral-content border-b-accent border-b-4 py-0.5 font-mono"
>
  <div class="relative flex items-center justify-end max-md:hidden">
    <div class="bg-accent absolute inset-x-0 h-0.5 brightness-50"></div>
    <Anchor
      href="/changelog"
      class="transition-brightness flex gap-2 px-2 brightness-50 hover:brightness-100"
    >
      {#each Object.entries(siteConfig.build.repos) as [repo, item]}
        <Badge label={repo} text={item.release} textColor="badge-primary" />
      {/each}
    </Anchor>
  </div>

  <a href="/">
    <div
      class="terminal-line hover:terminal-line-hard flex flex-col gap-2 p-1 select-none"
    >
      <Heading tag="h2">
        ~/<span class="text-accent"
          >{siteConfig.authorName.toLowerCase()}.{siteConfig.authorSurname.toLowerCase()}</span
        >
      </Heading>
      <Heading tag="h3">
        <WindowTerminalCommand
          command={siteConfig.terminalStrings}
          muted={false}
        />
      </Heading>
    </div>
  </a>
</div>
