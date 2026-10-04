import { fileURLToPath } from 'node:url';
import string from '@poppinss/string';

import { parseAndTrackResource, trackHashProduced } from './frontmatter';
import {
  type BlogLinkResourceProps,
  type BlogPluginData,
  type BlogPostInternalLinkType,
} from './types';

class ErrorBlog extends Error {
  constructor(node: any, ctx: any, message: string) {
    const path = fileURLToPath(ctx.fileURL!);
    super(
      `[${path}:${node.position?.start.line ?? '?'}:${node.position?.start.column ?? '?'}] ${message} @ ${node.type}`,
    );
    this.name = 'ErrorBlog';
  }
}

export class ErrorBlogInvalidNode extends ErrorBlog {
  constructor(node: any, ctx: any, message: string) {
    super(node, ctx, `Invalid node: ${message}`);
    this.name = 'ErrorBlogInvalidNode';
  }
}

class ErrorBlogRequiredLabel extends ErrorBlog {
  constructor(node: any, ctx: any) {
    super(node, ctx, `Label is required.`);
    this.name = 'ErrorBlogRequiredLabel';
  }
}

class ErrorBlogRequiredAttribute extends ErrorBlog {
  constructor(node: any, ctx: any, message: string) {
    super(node, ctx, `Attribute <${message}> is required.`);
    this.name = 'ErrorBlogRequiredAttribute';
  }
}

export function generateBlogPostInternalLink(
  type: BlogPostInternalLinkType,
  id: string,
  slugify: boolean = true,
): string {
  return `${type}-${slugify ? string.slug(id, { lower: true, strict: true }).replace('_', '-') : id}`;
}

export function nodeOptionalTextLabel(
  node: any,
  fallback?: string,
): string | undefined {
  if (
    !node.children ||
    node.children.length !== 1 ||
    node.children[0].type !== 'text'
  )
    return fallback;
  return node.children[0].value.trim();
}

export function nodeExpectTextLabel(node: any, ctx: any): string {
  const label = nodeOptionalTextLabel(node);
  if (!label) throw new ErrorBlogRequiredLabel(node, ctx);
  return label;
}

function nodeOptionalAttribute(
  node: any,
  name: string,
  fallback?: string,
): string | undefined {
  return node.attributes?.[name] ?? fallback;
}

export function nodeExpectAttribute(node: any, ctx: any, name: string): string {
  const value = nodeOptionalAttribute(node, name);
  if (!value) throw new ErrorBlogRequiredAttribute(node, ctx, name);
  return value;
}

export function nodeOptionalIdAttribute(
  node: any,
  frontmatter: BlogPluginData,
  type: BlogPostInternalLinkType,
): string | undefined {
  const id = nodeOptionalAttribute(node, 'id');
  if (id) {
    const finalId = generateBlogPostInternalLink(type, id);
    trackHashProduced(frontmatter, finalId);
    return finalId;
  }
  return undefined;
}

export function nodeExpectResourceAttribute(
  node: any,
  ctx: any,
  frontmatter: BlogPluginData,
): BlogLinkResourceProps {
  const resourceHref = nodeExpectAttribute(node, ctx, 'res');
  const resource = parseAndTrackResource(node, ctx, frontmatter, resourceHref);
  if (resource === undefined) {
    throw new ErrorBlogInvalidNode(node, ctx, 'invalid resource href');
  }
  return resource;
}
