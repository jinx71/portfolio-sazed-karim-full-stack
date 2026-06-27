import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { fail } from '../utils/http.js';

// 404 for unmatched routes.
export function notFound(_req: Request, res: Response) {
  return fail(res, 'Resource not found', 404);
}

// Final error handler. Translates known error shapes into the envelope.
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    const message = err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ');
    return fail(res, message || 'Validation failed', 422);
  }

  // Prisma unique-constraint violation.
  if (typeof err === 'object' && err !== null && 'code' in err && (err as { code: string }).code === 'P2002') {
    return fail(res, 'A record with that unique value already exists', 409);
  }

  // Prisma record-not-found on update/delete.
  if (typeof err === 'object' && err !== null && 'code' in err && (err as { code: string }).code === 'P2025') {
    return fail(res, 'Resource not found', 404);
  }

  console.error('Unhandled error:', err);
  return fail(res, 'Internal server error', 500);
}
