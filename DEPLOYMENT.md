# Deployment Instructions — Sarerah Travel

## Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create `.env.local` (and in your hosting dashboard for production):

| Variable | Description |
|----------|-------------|
| `ADMIN_SECRET` | Optional. If set, `/api/leads?key=ADMIN_SECRET` is required to view leads. Use a strong random string. |
| `NEXT_PUBLIC_SITE_URL` | Your live site URL (e.g. `https://sarerahtravel.com`) for sitemap and JSON-LD. |

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel (recommended)

**Why Vercel?** Vercel is built by the Next.js team and is the best fit for this stack: zero-config deploys, global CDN, and automatic previews per branch. For this site, most pages are **statically generated** (home, packages list, destinations, about, reviews, blog, contact, FAQ), so they are served from the edge with **no cold start** — instant load worldwide. Only the first request to a dynamic route (e.g. `/api/leads` or a package/destination detail page that hasn’t been cached) may see a short serverless cold start (usually &lt;1s); the main browsing experience is static and fast.

1. Push the repo to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import the repo.
3. Framework preset: **Next.js**. Root directory: `.` (or your repo root).
4. Add environment variables: `ADMIN_SECRET`, `NEXT_PUBLIC_SITE_URL`.
5. **Deploy.** Vercel runs `npm run build` and serves the app.
6. **Analytics & Speed Insights:** In the Vercel dashboard, open your project → **Analytics** tab → enable **Web Analytics**. The app already includes `@vercel/analytics` and `@vercel/speed-insights` in the layout; data appears in production after the first deploy. Speed Insights shows Core Web Vitals (LCP, FID, CLS) per page.

## Lead storage (production)

The demo stores leads in `data/leads.json` in **development** only. In production (e.g. Vercel) the filesystem is read-only, so you must:

- **Option A — Database:** Use PostgreSQL (e.g. Vercel Postgres, Supabase, Neon) or MongoDB. Add a table/collection for leads and update `src/app/api/leads/route.ts` to insert there instead of writing to a file. Use the same shape as the `Lead` type in `src/types/index.ts`.
- **Option B — Email:** On each POST to `/api/leads`, send an email (e.g. via Resend, SendGrid) to your inbox with the lead details.
- **Option C — Google Sheets:** Use the Google Sheets API or a service like SheetDB to append a row per lead.

After implementing, keep the GET `/api/leads` for your admin page (protected with `ADMIN_SECRET`), reading from the same DB or a separate export.

## Post-deploy checklist

1. **WhatsApp number:** Replace `923001234567` everywhere with your real number (country code, no +). Search for `923001234567` and `wa.me/923001234567` in the codebase (e.g. `src/lib/whatsapp.ts`, Header, Footer, CTAs).
2. **Contact email:** Replace `hello@sarerahtravel.com` in Footer and Contact page.
3. **Sitemap & robots:** In `src/app/sitemap.ts` and `src/app/robots.ts`, set `BASE` (or use `NEXT_PUBLIC_SITE_URL`) to your real domain.
4. **Trust badges:** Edit `src/data/trust.ts` to match your real stats (e.g. review count, rating).
5. **Images:** Replace Unsplash URLs in `src/data/` with your own images (or keep for placeholder). Ensure `next.config.ts` `images.domains` includes any external image host you use.

## Admin (leads list)

- **URL:** `https://yourdomain.com/admin?key=YOUR_ADMIN_SECRET`
- Set `ADMIN_SECRET` in env and open the URL with that query param to view the list. In production, wire the admin page to your DB instead of the file.

## SEO

- Metadata and OpenGraph are set per page.
- Sitemap: `/sitemap.xml` (auto-generated).
- Robots: `/robots.txt` (allows all except `/admin` and `/api/`).
- JSON-LD: TravelAgency on the site, Product (tour) on each package page.
