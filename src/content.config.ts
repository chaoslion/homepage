import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { siteConfig } from '#content';

const nonEmptyString = z.string().trim().min(1);
const postsIndexFilename = 'index.mdx';

const resourceItemSchema = z
  .object({
    href: z.url(),
    label: nonEmptyString.optional(),
    forceListing: z.boolean().optional().default(false),
  })
  .strict();

export const collections = {
  'blog-posts': defineCollection({
    loader: glob({
      pattern: [
        `[0-9][0-9][0-9][0-9]/[0-9][0-9]-[0-9][0-9]-*/${postsIndexFilename}`,
      ],
      deferRender: true,
      retainBody: true,
      base: `${import.meta.env.CUSTOM_CONTENT_PATH}/blog/posts`,
      // generate id by flatten the path
      generateId: (options): string => {
        const postId: string = options.entry
          .slice(0, -postsIndexFilename.length - 1)
          .replaceAll('/', '-');
        return postId;
      },
    }),
    schema: ({ image }) =>
      z
        .object({
          title: nonEmptyString,
          summary: nonEmptyString,
          cover: z
            .preprocess(
              (val) => (typeof val === 'string' ? `assets/${val}` : val),
              image(),
            )
            .optional(),
          date: z.coerce.date().optional(),
          category: reference('blog-categories'),
          sticky: z.boolean().default(false),
          series: reference('blog-series').optional(),
          tags: z
            .array(reference('blog-tags'))
            .max(siteConfig.posts.maxTags, { message: 'too many tags' })
            .default([]),
        })
        .strict(),
  }),
  'blog-resources': defineCollection({
    loader: file(`${import.meta.env.CUSTOM_CONTENT_PATH}/blog/resources.yaml`),
    schema: resourceItemSchema,
  }),
  'blog-categories': defineCollection({
    loader: file(`${import.meta.env.CUSTOM_CONTENT_PATH}/blog/categories.yaml`),
    schema: z
      .object({
        title: nonEmptyString.optional(),
        description: nonEmptyString,
        icon: nonEmptyString,
      })
      .strict(),
  }),
  'blog-tags': defineCollection({
    loader: file(`${import.meta.env.CUSTOM_CONTENT_PATH}/blog/tags.yaml`),
    schema: z
      .object({
        title: nonEmptyString.optional(),
      })
      .strict(),
  }),
  'blog-series': defineCollection({
    loader: file(`${import.meta.env.CUSTOM_CONTENT_PATH}/blog/series.yaml`),
    schema: z
      .object({
        title: nonEmptyString.optional(),
        description: nonEmptyString,
      })
      .strict(),
  }),
  pages: defineCollection({
    loader: glob({
      base: `${import.meta.env.CUSTOM_CONTENT_PATH}/pages`,
      pattern: '*.mdx',
      retainBody: false,
    }),
    schema: () =>
      z
        .object({
          title: nonEmptyString,
          subtitle: nonEmptyString.optional(),
          date: z.coerce.date(),
        })
        .strict(),
  }),
  about: defineCollection({
    loader: glob({
      base: `${import.meta.env.CUSTOM_CONTENT_PATH}/about`,
      pattern: ['*.md'],
      retainBody: false,
    }),
    schema: () =>
      z
        .object({
          order: z.number(),
          prompt: nonEmptyString,
          context: nonEmptyString,
        })
        .strict(),
  }),
};
