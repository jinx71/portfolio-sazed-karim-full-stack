import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { fail } from '../utils/http.js';

export interface AuthPayload {
  sub: string;
  email: string;
}

// Augment Express's Request with the decoded user.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

const COOKIE_NAME = 'pf_token';

function readToken(req: Request): string | null {
  const fromCookie = req.cookies?.[COOKIE_NAME];
  if (fromCookie) return fromCookie;
  // Allow Bearer fallback (useful for API testing tools).
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) return header.slice(7);
  return null;
}

function verify(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;
  } catch {
    return null;
  }
}

// Hard gate: 401 unless a valid token is present.
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = readToken(req);
  if (!token) return fail(res, 'Authentication required', 401);
  const payload = verify(token);
  if (!payload) return fail(res, 'Session expired or invalid', 401);
  req.user = payload;
  next();
}

// Soft gate: attaches user if a valid token exists, otherwise continues.
export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const token = readToken(req);
  if (token) {
    const payload = verify(token);
    if (payload) req.user = payload;
  }
  next();
}

export { COOKIE_NAME };
