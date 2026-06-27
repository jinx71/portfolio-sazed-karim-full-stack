import type { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { ok, fail, slugify } from '../utils/http.js';

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()).default([]),
  accent: z.string().default('indigo'),
  published: z.boolean().default(false),
});

// Public list returns published only; an authenticated admin sees everything.
export async function listPosts(req: Request, res: Response) {
  const isAdmin = Boolean(req.user);
  const posts = await prisma.post.findMany({
    where: isAdmin ? {} : { published: true },
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    select: isAdmin
      ? undefined
      : {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          tags: true,
          accent: true,
          publishedAt: true,
          published: true,
        },
  });
  return ok(res, posts, 'OK');
}

export async function getPostBySlug(req: Request, res: Response) {
  const post = await prisma.post.findUnique({ where: { slug: req.params.slug } });
  if (!post) return fail(res, 'Resource not found', 404);
  // Drafts are only visible to an authenticated admin.
  if (!post.published && !req.user) return fail(res, 'Resource not found', 404);
  return ok(res, post, 'OK');
}

export async function createPost(req: Request, res: Response) {
  const input = postSchema.parse(req.body);
  const slug = slugify(input.slug || input.title);
  const post = await prisma.post.create({
    data: {
      ...input,
      slug,
      publishedAt: input.published ? new Date() : null,
    },
  });
  return ok(res, post, 'Post created', 201);
}

export async function updatePost(req: Request, res: Response) {
  const input = postSchema.parse(req.body);
  const slug = slugify(input.slug || input.title);

  const existing = await prisma.post.findUnique({ where: { id: req.params.id } });
  if (!existing) return fail(res, 'Resource not found', 404);

  // Set publishedAt the first time a post is published; keep it stable afterwards.
  let publishedAt = existing.publishedAt;
  if (input.published && !existing.published) publishedAt = new Date();
  if (!input.published) publishedAt = null;

  const post = await prisma.post.update({
    where: { id: req.params.id },
    data: { ...input, slug, publishedAt },
  });
  return ok(res, post, 'Post updated');
}

export async function deletePost(req: Request, res: Response) {
  await prisma.post.delete({ where: { id: req.params.id } });
  return ok(res, null, 'Post deleted');
}
