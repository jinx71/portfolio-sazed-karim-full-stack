# Portfolio CMS — Web (client)

React 18 + TypeScript + Vite + Tailwind + Framer Motion. The public portfolio, blog, and the `/admin` CMS interface.

## Routes

- `/` — portfolio (hero, about, projects by track, skills, experience, contact)
- `/blog` — published posts
- `/blog/:slug` — a post
- `/admin/login` — CMS sign in
- `/admin` — CMS dashboard (protected)

## Environment

```bash
cp .env.example .env
# VITE_API_URL=http://localhost:4000   (or your Render URL in production)
```

`VITE_*` vars are inlined at **build time**, so set `VITE_API_URL` on Vercel before the build runs and redeploy after changing it.

## Scripts

```bash
npm run dev        # Vite dev server (http://localhost:5173)
npm run build      # tsc + vite build -> dist/
npm run preview    # preview the production build
```

## Deploy to Vercel

1. Import the repo, set the project root to `client/`.
2. Framework preset: **Vite** (auto-detected). Build: `npm run build`, output: `dist`.
3. Add `VITE_API_URL` = your Render API URL (no trailing slash).
4. `vercel.json` already rewrites all routes to `index.html` so client-side routing (e.g. `/blog/...`) works on refresh.
5. After deploy, set the API's `CLIENT_ORIGIN` to this Vercel URL so CORS + cookies work.

## Notes

- Customise your contact email in `src/components/Contact.tsx`.
- Colours/tracks live in `src/lib/types.ts` (`trackTheme`). Skills and experience are in their respective components; everything else (projects, posts) comes from the API and is edited in the CMS.
