import { z } from 'astro/zod';

const ContactTypes = ['author', 'alum'] as const;
export const ContactMailSchema = z.enum(ContactTypes);
