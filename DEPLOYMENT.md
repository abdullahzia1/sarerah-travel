# Deployment Instructions — Sarerah Travel

## Architecture

Content (destinations, packages, itineraries, images, leads) lives in **Supabase** (Postgres + Storage). Public pages read it via the anon key (Row Level Security restricts that key to `SELECT` on content tables and `INSERT` on leads). The `/admin` area lets you manage content and is gated by a single hardcoded username/password (MVP-level auth, see below). Reviews and the homepage rating are pulled live from the **Google Places API** — not stored in the database.

## Prerequisites

- Node.js 18+
- npm
- A free [Supabase](https://supabase.com) project

## One-time Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run `supabase/migrations/0001_init.sql` — creates all tables, RLS policies, and the `trip-images` storage bucket.
3. In **Project Settings → API**, copy the Project URL, `anon` public key, and `service_role` key into `.env.local` (see below).
4. Run the one-time content seed: `npm run seed`. This loads the site's original destinations/packages/itineraries/images into your new database.

## Environment variables

Create `.env.local` (and set the same in your hosting dashboard for production):

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key. Safe to expose; RLS restricts what it can do. |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server-only.** Bypasses RLS. Used by admin Server Actions and the upload route. Never expose to the browser. |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Single admin account for `/admin/login`. Use a strong password. |
| `ADMIN_SESSION_SECRET` | Random 32+ char string signing the admin session cookie (`openssl rand -hex 32`). |
| `NEXT_PUBLIC_SITE_URL` | Your live site URL, used for sitemap and JSON-LD. |
| `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACES_PLACE_ID` | Optional. Powers the Reviews page and homepage rating via the Google Places API. Site works without it (reviews section just doesn't render). |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin is at [http://localhost:3000/admin](http://localhost:3000/admin/login).

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel (recommended)

1. Push the repo to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import the repo.
3. Framework preset: **Next.js**.
4. Add all the environment variables listed above.
5. **Deploy.**
6. **Analytics & Speed Insights:** In the Vercel dashboard → your project → **Analytics** tab → enable **Web Analytics**. Already wired into the layout.

Content pages render dynamically (server-rendered per request against Supabase) rather than statically, since content can change at any time via the admin. This keeps every page instantly consistent with the latest edits — no manual revalidation needed — at the cost of a small serverless render on each request instead of edge-cached HTML. For a site this size that's the right trade-off; if traffic grows, individual routes can opt into ISR (`export const revalidate = N`) later.

## Admin

- **URL:** `https://yourdomain.com/admin/login`
- Log in with `ADMIN_USERNAME` / `ADMIN_PASSWORD`. Manage destinations, packages (itinerary, images, featured flag), site settings (WhatsApp number, contact email, trust badges), and view/delete leads.
- This is an MVP auth scheme: one shared account, no per-user roles or audit log. Upgrade to Supabase Auth (or similar) if you need multiple admin users later.

## Images

Admin forms accept either a pasted URL or a direct upload (stored in the Supabase `trip-images` bucket, publicly readable). Existing Unsplash placeholder URLs keep working as-is.

## Google Reviews

Google's Places API returns at most 5 "most relevant" reviews per business (chosen by Google, not filterable) and requires a Google Cloud project with billing enabled. Set `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACES_PLACE_ID` to enable; without them the Reviews page and homepage rating badge simply don't render.

## Leads

Submitted via the contact form, homepage lead form, and itinerary request form — all POST to `/api/leads`, which inserts into the `leads` table (RLS allows public insert only; reading/deleting requires the admin panel).

## SEO

- Metadata and OpenGraph are set per page.
- Sitemap: `/sitemap.xml` (auto-generated from live destinations/packages).
- Robots: `/robots.txt` (allows all except `/admin` and `/api/`).
- JSON-LD: TravelAgency on the site, Product (tour) on each package page.
