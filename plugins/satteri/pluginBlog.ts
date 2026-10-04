import { fileURLToPath } from 'node:url';
import { defineMdastPlugin } from 'satteri';

import { checkCodeLang, CodeBlockMetaStringSchema } from './_internal/code';
import { BlogLinkTypeMap } from './_internal/constants-link';
import {
  getFrontmatter,
  resolveResourceFromMatch,
  trackExternalLinkConsumed,
  trackHashConsumed,
  trackHashProduced,
} from './_internal/frontmatter';
import {
  ErrorBlogInvalidNode,
  generateBlogPostInternalLink,
  nodeExpectAttribute,
  nodeExpectResourceAttribute,
  nodeExpectTextLabel,
  nodeOptionalIdAttribute,
  nodeOptionalTextLabel,
} from './_internal/helper';
import { MathInlineAsciiMathPrefix, renderMathJax } from './_internal/math';
import {
  type BlogCodeBlockProps,
  type BlogLinkType,
  type BlogPostInternalLinkType,
} from './_internal/types';

function checkBlogPost(blogPath: string, ctx: any): boolean {
  return fileURLToPath(ctx.fileURL!).startsWith(blogPath);
}

export const pluginBlog = (blogPath: string, blogImagesDirectory?: string) =>
  defineMdastPlugin({
    name: 'custom-plugin-blog',
    options: { position: true },
    image(node, ctx) {
      if (!checkBlogPost(blogPath, ctx)) return;
      throw new ErrorBlogInvalidNode(node, ctx, 'image is not allowed');
    },
    heading(node, ctx) {
      if (!checkBlogPost(blogPath, ctx)) return;
      if (node.depth === 1)
        throw new ErrorBlogInvalidNode(node, ctx, 'heading h1 is not allowed');
      const frontmatter = getFrontmatter(ctx);
      const label = nodeExpectTextLabel(node, ctx);
      const headingId = generateBlogPostInternalLink('section', label);
      ctx.setProperty(node, 'data', {
        hProperties: {
          id: headingId,
        },
      });
      trackHashProduced(frontmatter, headingId);
    },
    async code(node, ctx) {
      if (!checkBlogPost(blogPath, ctx)) return;
      const frontmatter = getFrontmatter(ctx);
      const lang = checkCodeLang(node, ctx);
      const isMathBlock = lang === 'math' || lang === 'asciimath';
      const metaProps: BlogCodeBlockProps = CodeBlockMetaStringSchema.parse(
        node.meta ?? '',
      );

      const metaPropsAttributes = [];
      if (metaProps?.label) {
        metaPropsAttributes.push({
          type: 'mdxJsxAttribute' as const,
          name: 'label',
          value: metaProps.label,
        });
      }
      if (metaProps?.id) {
        trackHashProduced(frontmatter, metaProps.id);
        metaPropsAttributes.push({
          type: 'mdxJsxAttribute' as const,
          name: 'id',
          value: generateBlogPostInternalLink(
            isMathBlock ? 'eqn' : 'code',
            metaProps.id,
          ),
        });
      }

      if (isMathBlock) {
        return {
          type: 'mdxJsxFlowElement',
          name: 'CustomMathBlock',
          children: [
            {
              type: 'mdxJsxFlowElement',
              name: 'Fragment',
              attributes: [
                {
                  type: 'mdxJsxAttribute',
                  name: 'set:html',
                  value: await renderMathJax(
                    ctx,
                    node.value,
                    true,
                    lang === 'asciimath',
                  ),
                },
              ],
              children: [],
            },
          ],
          attributes: [...metaPropsAttributes],
        };
      }

      return {
        type: 'mdxJsxFlowElement',
        name: 'CustomCodeBlock',
        children: [
          {
            type: 'code',
            value: node.value,
            lang: lang,
          },
        ],
        attributes: [
          { type: 'mdxJsxAttribute', name: 'lang', value: lang },
          ...metaPropsAttributes,
        ],
      };
    },
    async math(node, ctx) {
      if (!checkBlogPost(blogPath, ctx)) return;
      throw new ErrorBlogInvalidNode(node, ctx, 'math is not allowed');
    },
    async inlineMath(node, ctx) {
      if (!checkBlogPost(blogPath, ctx)) return;
      let value = node.value.trim();
      let useAsciiMath = false;
      if (value.startsWith(MathInlineAsciiMathPrefix)) {
        value = value.slice(MathInlineAsciiMathPrefix.length);
        useAsciiMath = true;
      }
      return {
        type: 'mdxJsxTextElement',
        name: 'CustomMathInline',
        children: [
          {
            type: 'mdxJsxTextElement',
            name: 'Fragment',
            attributes: [
              {
                type: 'mdxJsxAttribute',
                name: 'set:html',
                value: await renderMathJax(ctx, value, false, useAsciiMath),
              },
            ],
            children: [],
          },
        ],
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'src',
            value: value,
          },
        ],
      };
    },
    link(node, ctx) {
      if (!checkBlogPost(blogPath, ctx)) return;
      let href = node.url;
      const frontmatter = getFrontmatter(ctx);
      for (const [linkType, linkPrefixRE] of Object.entries(
        BlogLinkTypeMap,
      ) as [BlogLinkType, RegExp][]) {
        const linkPrefixMatch = href.match(linkPrefixRE);
        if (!linkPrefixMatch) continue;
        const attributes = [];
        const label = nodeOptionalTextLabel(node);
        if (label) {
          attributes.push({
            type: 'mdxJsxAttribute' as const,
            name: 'label',
            value: label,
          });
        }
        switch (linkType) {
          case 'external': {
            trackExternalLinkConsumed(frontmatter, href, label ?? href);
            return {
              type: 'mdxJsxTextElement',
              name: 'CustomLink',
              children: [],
              attributes: [
                {
                  type: 'mdxJsxAttribute',
                  name: 'href',
                  value: href,
                },
                {
                  type: 'mdxJsxAttribute',
                  name: 'type',
                  value: linkType,
                },
                ...attributes,
              ],
            };
          }
          case 'internalHash': {
            const [_, hashTarget, hashType, hashId] = linkPrefixMatch as [
              string,
              string,
              BlogPostInternalLinkType,
              string,
            ];
            trackHashConsumed(frontmatter, hashTarget);
            return {
              type: 'mdxJsxTextElement',
              name: 'CustomLinkHash',
              children: [],
              attributes: [
                {
                  type: 'mdxJsxAttribute',
                  name: 'target',
                  value: hashTarget,
                },
                {
                  type: 'mdxJsxAttribute',
                  name: 'id',
                  value: hashId,
                },
                {
                  type: 'mdxJsxAttribute',
                  name: 'type',
                  value: hashType,
                },
                ...attributes,
              ],
            };
          }
          case 'internalResource': {
            const resourceProps = resolveResourceFromMatch(
              node,
              ctx,
              frontmatter,
              linkPrefixMatch,
              true,
            );

            return {
              type: 'mdxJsxTextElement',
              name: 'CustomLinkResource',
              children: [],
              attributes: [
                {
                  type: 'mdxJsxAttribute',
                  name: 'resourceId',
                  value: resourceProps.resourceId,
                },
                ...attributes,
              ],
            };
          }
          case 'internalWiki': {
            const [, lang, slug] = linkPrefixMatch as [
              string,
              string | undefined,
              string,
            ];
            const normalizedLang = lang?.slice(0, -1) ?? 'en';
            return {
              type: 'mdxJsxTextElement',
              name: 'CustomLink',
              children: [],
              attributes: [
                {
                  type: 'mdxJsxAttribute',
                  name: 'href',
                  value: `https://${normalizedLang}.wikipedia.org/wiki/${slug}`,
                },
                {
                  type: 'mdxJsxAttribute',
                  name: 'type',
                  value: 'external',
                },
                ...attributes,
              ],
            };
          }
          case 'internalPost': {
            const [_, postSlug, hashTarget, hashType, hashId] =
              linkPrefixMatch as [
                string,
                string,
                string | undefined,
                BlogPostInternalLinkType | undefined,
                string | undefined,
              ];
            const postAttributes = [
              {
                type: 'mdxJsxAttribute' as const,
                name: 'slug',
                value: postSlug,
              },
            ];
            if (hashTarget) {
              postAttributes.push(
                {
                  type: 'mdxJsxAttribute' as const,
                  name: 'hashTarget',
                  value: hashTarget,
                },
                {
                  type: 'mdxJsxAttribute' as const,
                  name: 'hashType',
                  value: hashType!,
                },
                {
                  type: 'mdxJsxAttribute' as const,
                  name: 'hashId',
                  value: hashId!,
                },
              );
            }
            return {
              type: 'mdxJsxTextElement',
              name: 'CustomLinkPost',
              children: [],
              attributes: [...postAttributes, ...attributes],
            };
          }
        }
      }
      throw new ErrorBlogInvalidNode(node, ctx, 'invalid link type');
    },
    leafDirective(node, ctx) {
      if (!checkBlogPost(blogPath, ctx)) return;
      const frontmatter = getFrontmatter(ctx);
      switch (node.name) {
        case 'image': {
          const src = nodeExpectAttribute(node, ctx, 'src');
          const label = nodeExpectTextLabel(node, ctx);
          const commonAttributes = [
            {
              type: 'mdxJsxAttribute' as const,
              name: 'label',
              value: label,
            },
          ];
          const id = nodeOptionalIdAttribute(node, frontmatter, 'fig');
          if (id) {
            commonAttributes.push({
              type: 'mdxJsxAttribute' as const,
              name: 'id',
              value: id,
            });
          }

          const imgNode = {
            type: 'image' as const,
            alt: label,
            url: blogImagesDirectory ? `${blogImagesDirectory}/${src}` : src,
          };
          if (node.attributes?.res) {
            const resourceProps = nodeExpectResourceAttribute(
              node,
              ctx,
              frontmatter,
            );
            return {
              type: 'mdxJsxTextElement',
              name: 'CustomImageResource',
              children: [imgNode],
              attributes: [
                {
                  type: 'mdxJsxAttribute',
                  name: 'resourceId',
                  value: resourceProps.resourceId,
                },
                ...commonAttributes,
              ],
            };
          }

          return {
            type: 'mdxJsxTextElement',
            name: 'CustomImage',
            children: [imgNode],
            attributes: [...commonAttributes],
          };
        }
      }
    },
    containerDirective(node, ctx) {
      if (!checkBlogPost(blogPath, ctx)) return;
      const frontmatter = getFrontmatter(ctx);
      switch (node.name) {
        case 'quote': {
          const resourceProps = nodeExpectResourceAttribute(
            node,
            ctx,
            frontmatter,
          );
          return {
            type: 'mdxJsxFlowElement',
            name: 'CustomQuote',
            children: node.children,
            attributes: [
              {
                type: 'mdxJsxAttribute',
                name: 'resourceId',
                value: resourceProps.resourceId,
              },
            ],
          };
        }
      }
    },
  });
