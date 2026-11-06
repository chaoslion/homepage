<script lang="ts">
  import type { GetImageResult, ImageMetadata } from 'astro';

  import { Heading, HeadingFlip, Image } from '#/components/ui';
  import Anchor from '#/components/ui/Anchor.svelte';
  import { siteConfig } from '#content';

  interface Props {
    profilePicture: GetImageResult;
  }
  const { profilePicture }: Props = $props();
</script>

<div class="hero bg-base-100 py-4">
  <div class="hero-content flex-col gap-8 lg:flex-row-reverse lg:gap-16">
    <Anchor href="/about" class="aura aura-gold duration-15000">
      <Image
        src={profilePicture}
        label="Author Picture"
        class="rounded-box aspect-square max-w-55 object-cover shadow-xl sm:max-w-xs lg:max-w-sm"
      />
    </Anchor>
    <div class="text-center lg:text-left">
      <HeadingFlip
        tag="h1"
        title="Building Things That"
        variants={siteConfig.heroTitleBuildingVariants}
      />
      <Heading tag="h2">Fixing Things That Don't.</Heading>
      <p class="py-6 text-xl">
        Welcome! I'm Alex. I spend my days writing production-grade code,
        architecting systems, and navigating the messy reality of software
        engineering. Check out <a href="/now" class="link link-primary"
          >what I'm doing now</a
        >
        or the
        <a href="/uses" class="link link-primary">tools and tech I use</a>. This
        blog is where I share practical insights, hard-learned lessons, and
        honest takes on computer science and software development.
      </p>
      <div class="flex flex-wrap items-center gap-3 max-lg:justify-center">
        <a href="/about" class="btn btn-primary btn-lg">More About Me</a>
      </div>
    </div>
  </div>
</div>
