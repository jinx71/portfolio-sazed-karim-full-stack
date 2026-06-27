import type { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { ok, fail } from '../utils/http.js';

const projectSchema = z.object({
  code: z.string().min(1).max(20),
  title: z.string().min(1),
  track: z.enum(['fullstack', 'aiml', 'mern']),
  status: z.enum(['shipped', 'in-progress', 'planned']),
  summary: z.string().min(1),
  stack: z.array(z.string()).default([]),
  month: z.number().int().min(1).max(12).nullable().optional(),
  repoUrl: z.string().url().nullable().optional().or(z.literal('')),
  liveUrl: z.string().url().nullable().optional().or(z.literal('')),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

// Normalise empty strings on optional URLs to null.
function clean(input: z.infer<typeof projectSchema>) {
  return {
    ...input,
    repoUrl: input.repoUrl ? input.repoUrl : null,
    liveUrl: input.liveUrl ? input.liveUrl : null,
    month: input.month ?? null,
  };
}

export async function listProjects(_req: Request, res: Response) {
  const projects = await prisma.project.findMany({
    orderBy: [{ track: 'asc' }, { order: 'asc' }, { code: 'asc' }],
  });
  return ok(res, projects, 'OK');
}

export async function createProject(req: Request, res: Response) {
  const data = clean(projectSchema.parse(req.body));
  const project = await prisma.project.create({ data });
  return ok(res, project, 'Project created', 201);
}

export async function updateProject(req: Request, res: Response) {
  const data = clean(projectSchema.parse(req.body));
  const project = await prisma.project.update({
    where: { id: req.params.id },
    data,
  });
  return ok(res, project, 'Project updated');
}

export async function deleteProject(req: Request, res: Response) {
  await prisma.project.delete({ where: { id: req.params.id } });
  return ok(res, null, 'Project deleted');
}

export async function getProject(req: Request, res: Response) {
  const project = await prisma.project.findUnique({ where: { id: req.params.id } });
  if (!project) return fail(res, 'Resource not found', 404);
  return ok(res, project, 'OK');
}
