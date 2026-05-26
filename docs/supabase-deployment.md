# Supabase deployment — HBM & Company

This guide covers local setup, Vercel production configuration, and verifying the live connection for the HBM & Company editorial platform.

## Architecture

| File | Purpose |
|------|---------|
| `lib/supabase/env.ts` | Validates public env vars; no secrets hardcoded |
| `lib/supabase/client.ts` | Browser client (Client Components, hooks) |
| `lib/supabase/server.ts` | Server client (Server Components, Route Handlers) |
| `lib/supabase/queries/articles.server.ts` | Server-side editorial queries |
| `lib/supabase/queries/articles.client.ts` | Client-side editorial queries |
| `lib/supabase/queries/briefings.server.ts` | Public newspaper + homepage briefings |
| `lib/desk/article-to-briefing.ts` | Maps Supabase articles to public briefing shapes |
| `lib/supabase/types.ts` | TypeScript types for `articles` and future tables |
| `components/supabase/SupabaseProvider.tsx` | React context for client-side Supabase access |

## Required environment variables

Both local development and Vercel production need:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (`https://<ref>.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase **anon public** key (safe for browser) |

**Do not** add the service-role key to Next.js env vars. Keep it server-only in Supabase Edge Functions or secure backend jobs.

## Local development

1. Copy the example env file:

   ```bash
   cp .env.local.example .env.local
   ```

2. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Settings → API**.

3. Paste **Project URL** and **anon public** key into `.env.local`.

4. Restart the dev server:

   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000/supabase-test](http://localhost:3000/supabase-test).

## Vercel production

1. Open [Vercel Dashboard](https://vercel.com) → your **hbmandcompany** project.

2. Go to **Settings → Environment Variables**.

3. Add both variables for **Production**, **Preview**, and **Development** (recommended so preview deploys behave like prod):

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Redeploy (or push a commit) so the new variables are baked into the build.

5. Visit `https://hbmandcompany.com/supabase-test` (or your preview URL) to confirm production connectivity.

## Verify production connection

1. Open `/supabase-test` on the deployed site.
2. **Server Component** section should load automatically — if env vars are set and RLS allows reads, you will see JSON from `articles`.
3. Click **Run client connection test** — the Client Component section should return the same data.
4. Check the browser console and Vercel function logs for `[Supabase:…]` diagnostic messages if something fails.

## Database: `articles` table

The test query selects all published articles ordered by `published_at` descending:

```sql
select *
from articles
where status = 'published'
order by published_at desc;
```

Minimum schema expected by the app:

```sql
create type article_status as enum ('draft', 'review', 'published', 'archived');

create table articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  body text,
  status article_status not null default 'draft',
  published_at timestamptz,
  author_id uuid,
  hero_image_url text,
  weight text,
  rejection_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Example RLS for public read of published articles
alter table articles enable row level security;

create policy "Public can read published articles"
  on articles for select
  using (status = 'published');

-- Desk write access (temporary until Supabase Auth in Phase 3)
-- Tighten these policies once authenticated desk users are in place.

create policy "Desk can read editorial pipeline"
  on articles for select
  to anon, authenticated
  using (status in ('draft', 'review', 'published', 'archived'));

create policy "Desk can insert articles"
  on articles for insert
  to anon, authenticated
  with check (true);

create policy "Desk can update articles"
  on articles for update
  to anon, authenticated
  using (true);
```

> **Note:** The public read policy above only exposes `published` rows to anonymous users. The desk read policy allows the editorial UI to load drafts and in-review stories. Replace anon write access with role-based policies when Supabase Auth is wired in Phase 3.

## Database: `ticker_items` table

Homepage hero live ticker headlines (editable by Editor in Chief at `/desk/newsroom/ticker`):

```sql
create table ticker_items (
  id uuid primary key default gen_random_uuid(),
  headline text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table ticker_items enable row level security;

create policy "Public can read ticker items"
  on ticker_items for select
  using (true);

create policy "Desk can manage ticker items"
  on ticker_items for all
  to anon, authenticated
  using (true)
  with check (true);
```

When `ticker_items` has rows, the homepage uses them instead of auto-generated article headlines.

Example role-based policy (future):

```sql
-- After auth: only authenticated desk users can write
create policy "Authenticated desk users can insert articles"
  on articles for insert
  to authenticated
  with check (auth.uid() is not null);
```

Adjust columns and policies to match your editorial workflow.

## Scaling for future features

This layout supports upcoming platform needs without restructuring:

- **Subscriptions / paywalls** — add `subscriptions` table; gate queries in `lib/supabase/queries/` using server client + RLS
- **Editorial workflows** — extend `articles.status`; add `revisions`, `assignments` tables
- **Media management** — Supabase Storage + `media_assets` table; upload from desk using client
- **Author systems** — `authors` profile table linked via `author_id`; auth via Supabase Auth

Wrap authenticated desk routes with `SupabaseProvider` and server-side session checks as auth is introduced.

## Regenerate TypeScript types

When your schema changes:

```bash
npx supabase gen types typescript --project-id <your-project-id> > lib/supabase/types.ts
```

## Remove the test page

Before launch, delete or protect `app/supabase-test/` — it is marked `noindex` but should not remain publicly accessible in production.
