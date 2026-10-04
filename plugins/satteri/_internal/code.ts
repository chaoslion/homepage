import { z } from "astro/zod";

import { type BlogCodeBlockProps } from "./types";

export function checkCodeLang(
  node: any,
  ctx: any,
  fallback: string = "plaintext",
): string {
  const lang = node.lang || fallback;
  ctx.setProperty(node, "lang", lang);
  return lang;
}

const KeyValueTokenRegEx = /([a-zA-Z_][\w-]*)="([^"]*)"/g;
const KeyValueOnlyLineRegEx = /^(\s*[a-zA-Z_][\w-]*="[^"]*")*\s*$/;

const CodeBlockMetaSchema = z
  .object({
    id: z.string().min(1).optional(),
    label: z.string().min(1).optional(),
  })
  .strict();

export const CodeBlockMetaStringSchema = z
  .string()
  .transform((value, ctx) => {
    if (!KeyValueOnlyLineRegEx.test(value)) {
      ctx.addIssue({
        code: "custom",
        message: `Meta string must only contain key="value" pairs: "${value}"`,
      });
      return z.NEVER;
    }
    const pairs: Record<string, string> = {};
    for (const [, key, val] of value.matchAll(KeyValueTokenRegEx)) {
      pairs[key] = val;
    }
    return pairs;
  })
  .pipe(CodeBlockMetaSchema)
  .transform(
    (value): BlogCodeBlockProps => ({
      id: value.id,
      label: value.label,
    }),
  );
