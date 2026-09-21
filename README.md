# Baghdasaryan Production — Digital Event Platform

Phase 1 scaffold: public website + admin panel + CMS data model + lead
management, built against the MASTER PROMPT spec. This is a **working
starting point**, not a finished production build — see "Remaining work"
below before launch.

## Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (Postgres, Auth, Storage, Row Level Security)
- **Hosting:** Vercel (frontend) + Supabase (data)

## Architecture

- `src/app/**` — public site (`/`, `/services`, `/portfolio`, `/consultation`, …)
  and admin panel (`/admin/**`), kept in separate route trees.
- `src/app/admin/(dashboard)/**` — authenticated admin pages, behind
  `src/middleware.ts` (redirects to `/admin/login` if not signed in) *and*
  a second server-side check in `admin/(dashboard)/layout.tsx`.
- `src/app/api/leads/route.ts` — the only way a lead reaches the database.
  Validates with `zod`, rate-limits by IP, checks a honeypot field, then
  writes with the Supabase **service-role** key (server-only — never sent
  to the browser). Leads are not readable by anonymous clients (see RLS
  policies in `supabase/schema.sql`).
- `src/lib/data/*.ts` — data-access functions that read from Supabase and
  fall back to clearly-marked placeholder content (`src/lib/data/placeholders.ts`)
  when Supabase isn't configured yet, so the site is fully browsable in
  local dev with zero setup.
- `src/lib/i18n/dictionary.ts` — UI strings for Armenian (primary) and
  English. The schema (`jsonb` columns like `{ hy: "...", en: "..." }`) is
  ready for `ru`/`fr`/`es` once translations exist — add them to
  `locales` in that file and to each `jsonb` field.
- `supabase/schema.sql` — full table definitions + Row Level Security
  policies. Run this once against a new Supabase project.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase values, see below
npm run dev
```

Without any Supabase env vars set, the public site still runs using the
placeholder content in `src/lib/data/placeholders.ts` — useful for
reviewing design/layout before the backend is wired up. `/admin` requires
Supabase Auth and will not work until it's configured.

### 1. Create the Supabase project

1. Create a project at supabase.com.
2. In the SQL editor, run `supabase/schema.sql` (creates all tables, RLS
   policies, and seeds the lead-form dropdown options + default nav).
3. Copy **Project URL**, **anon public key**, and **service_role key**
   (Settings → API) into `.env.local`.

### 2. Create the first admin user

1. Supabase Dashboard → Authentication → Users → **Add user** (set an
   email + password).
2. Run in the SQL editor, using that user's UUID:
   ```sql
   insert into profiles (id, full_name, role)
   values ('<user-uuid>', 'Owner Name', 'admin');
   ```
3. Sign in at `/admin/login`.

### 3. Storage for media

Create a public Storage bucket named `media` (Supabase Dashboard →
Storage). The `media` table stores paths into this bucket; actual
image uploads from the admin UI are part of "Remaining work" below.

### 4. Environment variables

See `.env.example`. Never commit `.env.local`. `SUPABASE_SERVICE_ROLE_KEY`
must only ever be read server-side (already the case in this scaffold —
`src/lib/supabase/server.ts` `createServiceRoleClient()` is the only place
it's used, and that file is never imported from a Client Component).

## Deployment

- **Repository:** push this to a new GitHub repo.
- **Frontend:** import the repo into Vercel, set the same environment
  variables as `.env.local` in Vercel's project settings.
- **Domain:** point `baghdasaryanevents.com` at the Vercel project once
  DNS is ready; update `NEXT_PUBLIC_SITE_URL` accordingly.
- **Database:** already hosted by Supabase — no separate step.

## Content editing (no-code)

Once seeded, staff sign in at `/admin` to manage:
- **Leads** — fully built: status, notes, follow-up date, search/filter.
- **Services** — fully built: create/edit/delete, bilingual (hy/en) fields,
  inclusions list, publish/draft, sort order, cover image URL.
- **Portfolio** — fully built: create/edit/delete, event type, location,
  date, bilingual fields, featured flag, publish/draft, cover image/video URL.

Cover images are entered as a Storage URL for now (upload the file in
Supabase Dashboard → Storage → `media` bucket, paste the public URL into
the form) — a proper upload-from-admin Media Library is still on the list
below.

## Remaining work before this is production-ready

This scaffold now covers the full lead pipeline and the two highest-traffic
CMS entities (Services, Portfolio) end to end — public read, admin
create/edit/delete, RLS-secured. Still needed:

- **Testimonials, FAQ, Blog, Site Settings admin forms** — same pattern as
  `ServiceForm.tsx`/`PortfolioForm.tsx` (client component, Supabase browser
  client, create/update/delete). Copy one of those two as the template.
- **Media Library UI** (drag-and-drop upload to the `media` Storage bucket,
  responsive/WebP variants, pick-from-library instead of pasting URLs).
- **Real content**: replace everything in `src/lib/data/placeholders.ts`
  and the About/Privacy/Terms page text — none of it should reach
  production. No prices, testimonials, stats, or awards have been
  invented; all are placeholders or empty per the "no fabricated
  business facts" rule.
- **Localized routing**: URLs are currently locale-agnostic (content
  defaults to Armenian with an English fallback per field); a `[locale]`
  route segment or cookie/header-based switching is not yet wired to
  actual navigation — the language selector in `Header.tsx` is visual
  only. Needed for real `hreflang` SEO benefit.
- **Structured data**: only `LocalBusiness` JSON-LD is added (homepage).
  Add `BreadcrumbList`, `Service`, and `FAQPage` schema on their
  respective pages once content is real.
- **Analytics**: GA4/Meta Pixel scripts are not yet wired in; add them
  conditionally on `NEXT_PUBLIC_GA4_ID` / `NEXT_PUBLIC_META_PIXEL_ID`
  being set, and fire the events listed in the MASTER PROMPT (§42).
- **Anti-spam**: the leads API has a honeypot + IP rate limit; add
  Cloudflare Turnstile (env vars are already in `.env.example`) before
  the form is public.
- **Testing**: none included yet — add before launch (form submission,
  admin auth boundaries, RLS policy tests).

## Security notes

- `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security — it is only
  used server-side in `/api/leads` and must never be added to any
  `NEXT_PUBLIC_*` variable or Client Component.
- Leads have no public read/insert RLS policy at all; the only write
  path is the service-role insert in the API route, which runs its own
  validation first.
- `/admin/**` is protected in two independent places (middleware +
  layout), and Supabase RLS additionally requires a matching `profiles`
  row for any admin-only table write — a compromised frontend route
  guard alone can't expose the database.
