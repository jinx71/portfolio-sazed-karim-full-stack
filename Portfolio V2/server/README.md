# Portfolio CMS — API (server)

Node + Express + TypeScript + Prisma + PostgreSQL. Serves the public read API and the JWT-protected admin API for the portfolio.

## Endpoints

All responses use `{ success, data, message }`.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | – | Liveness check / dyno warmup |
| POST | `/api/auth/login` | – | Sign in, sets httpOnly cookie |
| POST | `/api/auth/logout` | – | Clear the auth cookie |
| GET | `/api/auth/me` | ✓ | Current admin user |
| GET | `/api/projects` | – | All projects, ordered by track + order |
| POST | `/api/projects` | ✓ | Create a project |
| PUT | `/api/projects/:id` | ✓ | Update a project |
| DELETE | `/api/projects/:id` | ✓ | Delete a project |
| GET | `/api/posts` | optional | Published posts (drafts included when authed) |
| GET | `/api/posts/:slug` | optional | One post by slug (drafts need auth) |
| POST | `/api/posts` | ✓ | Create a post |
| PUT | `/api/posts/:id` | ✓ | Update a post |
| DELETE | `/api/posts/:id` | ✓ | Delete a post |

## Environment

Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL` — Neon **pooled** connection (PgBouncer), used at runtime.
- `DIRECT_URL` — Neon **direct** connection, used for migrations.
- `JWT_SECRET` — long random string.
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` — seeded admin account.
- `CLIENT_ORIGIN` — comma-separated allowed frontend origins for CORS (e.g. your Vercel URL).
- `PORT`, `NODE_ENV`.

## Scripts

```bash
npm run dev            # tsx watch, hot reload
npm run build          # tsc -> dist/
npm start              # node dist/index.js
npm run prisma:push    # sync schema to DB (dev)
npm run prisma:migrate # prisma migrate deploy (prod)
npm run seed           # admin + projects + sample posts
```

## Deploy to Render

1. New **Web Service** from the repo, root directory `server/`.
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. Add all env vars above. Set `NODE_ENV=production` and `CLIENT_ORIGIN` to your Vercel URL.
5. After first deploy, run once from the Render shell:
   ```bash
   npx prisma migrate deploy   # or: npm run prisma:push
   npm run seed
   ```

> Auth uses a cross-site cookie (`SameSite=None; Secure`) in production, so both client and API must be served over HTTPS — which Vercel and Render both provide by default.
