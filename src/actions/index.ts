import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

import { ContactMailSchema } from '#/data/actions';
import { siteConfig } from '#content';

export const server = {
  getContactMail: defineAction({
    input: ContactMailSchema,
    handler: async (input) => {
      return input === 'author' ? siteConfig.mail : siteConfig.mailAlum;
    },
  }),
  getContactSocial: defineAction({
    input: z.object({}),
    handler: async (_) => {
      return siteConfig.socialLinks;
    },
  }),
};
