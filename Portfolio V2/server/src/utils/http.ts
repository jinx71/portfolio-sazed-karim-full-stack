import type { Request, Response, NextFunction } from 'express';

// Every endpoint returns this shape for a predictable client contract.
export function ok<T>(res: Response, data: T, message = 'OK', status = 200) {
  return res.status(status).json({ success: true, data, message });
}

export function fail(res: Response, message: string, status = 400, data: unknown = null) {
  return res.status(status).json({ success: false, data, message });
}

// Wraps async route handlers so thrown errors reach the error middleware.
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
export const handler =
  (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
