import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { ok, fail } from '../utils/http.js';
import { COOKIE_NAME } from '../middleware/auth.js';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

function cookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd, // HTTPS only in production
    sameSite: isProd ? ('none' as const) : ('lax' as const), // cross-site (Vercel ↔ Render) needs 'none'
    maxAge: SEVEN_DAYS,
    path: '/',
  };
}

export async function login(req: Request, res: Response) {
  const { email, password } = loginSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email } });
  // Identical message for unknown email vs wrong password (no account enumeration).
  const invalid = () => fail(res, 'Invalid email or password', 401);
  if (!user) return invalid();

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return invalid();

  const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });

  res.cookie(COOKIE_NAME, token, cookieOptions());
  return ok(res, { id: user.id, email: user.email, name: user.name }, 'Signed in');
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions(), maxAge: undefined });
  return ok(res, null, 'Signed out');
}

export async function me(req: Request, res: Response) {
  if (!req.user) return fail(res, 'Not authenticated', 401);
  const user = await prisma.user.findUnique({
    where: { id: req.user.sub },
    select: { id: true, email: true, name: true },
  });
  if (!user) return fail(res, 'Not authenticated', 401);
  return ok(res, user, 'OK');
}
