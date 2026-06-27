# Portfolio + CMS — Md. Sazed Ul Karim

A colourful, animated developer portfolio with an integrated blog and a custom CMS to maintain it — built as a full-stack monorepo. The public site showcases three project tracks (Full-Stack, AI/ML, MERN), each colour-coded, with live demo and repository links. Content is managed through a protected admin panel rather than by editing code.

**Live site:** _[add Vercel URL]_ · **API:** _[add Render URL]_

![Screenshot placeholder](./docs/screenshot.png)

## Why this architecture

A portfolio that asks recruiters to judge your full-stack ability should itself be a full-stack app. So instead of a static site with hard-coded data, this is:

- **`client/`** — React 18 + TypeScript + Vite + Tailwind + Framer Motion. The public portfolio, blog, and the `/admin` CMS UI. Deploys to **Vercel**.
- **`server/`** — Node + Express + TypeScript + Prisma + PostgreSQL. A public read API plus a JWT-protected admin API. Deploys to **Render**, database on **Neon**.

Editing a project or writing a blog post in the admin panel updates the live site immediately — no redeploy, no code change.

## Highlights

- **Three colour-coded tracks** — indigo (Full-Stack), teal (AI/ML), pink (MERN); colour encodes the track, not just decoration.
- **Animated, accessible** — gradient mesh background, orchestrated load and scroll reveals, animated track tabs; all respect `prefers-reduced-motion` and keyboard focus.
- **Integrated blog** — Markdown posts authored in the CMS, rendered with `react-markdown` + GFM, with a live preview in the editor.
- **Custom CMS** — cookie-based JWT auth (no tokens in `localStorage`), full CRUD for projects and posts, draft/publish workflow.
- **Consistent API contract** — every endpoint returns `{ success, data, message }`.

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router, react-markdown |
| Backend | Node.js, Express, TypeScript, Prisma, Zod |
| Database | PostgreSQL (Neon) |
| Auth | JWT (httpOnly cookie), bcrypt |
| Hosting | Vercel (client) · Render (server) · Neon (db) |

## Local Setup

You need Node 18+ and a PostgreSQL database (a free Neon project works well).

```bash
# 1. Backend
cd server
cp .env.example .env          # fill in DATABASE_URL, DIRECT_URL, JWT_SECRET, ADMIN_*
npm install
npm run prisma:push           # create tables
npm run seed                  # admin user + 32 projects + sample posts
npm run dev                   # API on http://localhost:4000

# 2. Frontend (new terminal)
cd client
cp .env.example .env          # VITE_API_URL=http://localhost:4000
npm install
npm run dev                   # site on http://localhost:5173
```

Sign in to the CMS at `http://localhost:5173/admin` using the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `server/.env`.

## Deployment

See [`server/README.md`](./server/README.md) and [`client/README.md`](./client/README.md) for per-service steps. In short:

1. **Neon** — create a project; copy the pooled and direct connection strings.
2. **Render** — deploy `server/` as a Web Service; set env vars; run `prisma migrate deploy` + `seed`.
3. **Vercel** — deploy `client/`; set `VITE_API_URL` to the Render URL; set the server's `CLIENT_ORIGIN` to the Vercel URL.

> **Note on cold starts:** Render's free tier sleeps after inactivity, so the first request can take ~30s. The UI shows a friendly loading state. To keep it warm, ping `/api/health` on a schedule (e.g. a free uptime monitor) or upgrade the dyno.

## Maintaining content

Everything visible on the site is editable from `/admin`:

- **Projects** — add the real **live URL** and **repo URL** to each, flip status (planned → in progress → shipped), mark featured, reorder. The 10 MERN entries are seeded as editable placeholders — fill them in as you ship.
- **Posts** — write in Markdown with live preview, tag, pick a cover accent, save as draft or publish.

---

**Md. Sazed Ul Karim** · [github.com/jinx71](https://github.com/jinx71) · [linkedin.com/in/sazed-ul-karim](https://linkedin.com/in/sazed-ul-karim)
