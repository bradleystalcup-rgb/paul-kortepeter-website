# Paul Kortepeter — Author Website

A small author site with a built-in blog CMS. Public pages (home, about, blog)
are server-rendered; a password-protected `/admin` area lets Paul log in and
write, edit, or delete blog posts without touching code.

**Stack:** [Hono](https://hono.dev) (a Node.js-friendly web framework that
also runs natively on Cloudflare Workers) + [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
for hosting + [D1](https://developers.cloudflare.com/d1/) (Cloudflare's
SQLite database) for storing posts. No build step, no framework lock-in —
it's plain JavaScript throughout.

## Prerequisites

You'll need these installed once, on whatever machine you use to develop or
deploy from:

- **Node.js 20+** — [nodejs.org](https://nodejs.org). Everything here (npm,
  Wrangler, the seed script) runs on Node.
- **A Cloudflare account** (free tier is enough) — [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

Once Node is installed:

```bash
npm install
npm install -g wrangler   # or just use `npx wrangler ...` below
wrangler login            # opens a browser to connect your Cloudflare account
```

## First-time setup

### 1. Create the D1 database

```bash
wrangler d1 create paul-kortepeter-db
```

This prints a `database_id`. Copy it into [wrangler.toml](wrangler.toml),
replacing `REPLACE_WITH_D1_DATABASE_ID`.

### 2. Run the schema migration

```bash
npm run db:migrate:local    # for local dev
npm run db:migrate:remote   # for the real, deployed database
```

### 3. Seed the starter blog posts (optional but recommended)

The `seed/posts/*.md` files contain seven posts adapted from the essays and
FAQ in "Website blogs" — the progymnasmata, boys and writing, AI and
composition, narration, the Writing & Rhetoric FAQ, and two personal essays
(one previously published in *The American Spectator*). Load them with:

```bash
npm run db:seed:local
npm run db:seed:remote
```

If you edit the markdown files in `seed/posts/`, regenerate `seed/seed.sql`
with `npm run build:seed` before re-running the seed commands.

### 4. Set the admin password and session secret

Pick a password and hash it:

```bash
npm run hash-password -- "your-new-password"
```

This prints something like `a1b2c3...:d4e5f6...` — that whole string is the
hash, not the password itself.

For **local development**, copy `.dev.vars.example` to `.dev.vars` and fill
in:

```
ADMIN_USERNAME=paul
ADMIN_PASSWORD_HASH=<paste the hash from above>
SESSION_SECRET=<any long random string>
```

`.dev.vars` is gitignored — never commit it.

For the **deployed** site, set the same two secrets on the Cloudflare Pages
project (the username is already set as a plain `[vars]` entry in
`wrangler.toml`):

```bash
wrangler pages secret put ADMIN_PASSWORD_HASH
wrangler pages secret put SESSION_SECRET
```

## Running locally

```bash
npm run dev
```

Opens the site at `http://localhost:8788` (Wrangler's default Pages dev
port), backed by a local SQLite copy of D1. Log in at `/admin/login`.

## Deploying

The easiest path is to connect this GitHub repo to Cloudflare Pages so every
push auto-deploys:

1. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect
   to Git**, and pick this repo.
2. Build settings: no build command needed, output directory `public`.
3. Under **Settings → Functions → D1 database bindings**, bind `DB` to
   `paul-kortepeter-db`.
4. Under **Settings → Environment variables**, add `ADMIN_USERNAME` (plain)
   and `ADMIN_PASSWORD_HASH` / `SESSION_SECRET` (encrypted).

From then on, `git push` deploys automatically. You can also deploy by hand
with `npm run deploy`.

## Project layout

```
functions/[[path]].js   Cloudflare Pages Functions entry point (routes to src/app.js)
src/app.js              All routes: public pages, admin auth, admin CRUD
src/db.js               D1 queries for the posts table
src/crypto.js           Password hashing + signed session cookies (Web Crypto)
src/markdown.js         Markdown → HTML rendering for post bodies
src/templates/          HTML templates (plain template-literal functions)
public/                 Static assets: styles.css, images/
migrations/0001_init.sql   D1 schema
seed/posts/*.md         Starter blog post content (source of truth)
seed/build-seed.mjs     Regenerates seed/seed.sql from the markdown files
scripts/hash-password.mjs   CLI to hash a new admin password
```

## Notes on content and images

- All essays in `seed/posts/` came from the docx/pdf files in the
  "Website blogs" folder. A couple of lines in "Freak Street" (originally
  titled "Hollywood Is a Horrifying Hellscape") were trimmed for the web
  republication (a needlessly graphic aside) — check against the original
  PDF if you want the verbatim text.
- Posts are split into two independent sections — `blog` (the general
  essays, at `/blog`) and `faq` (the Writing & Rhetoric FAQ posts, at
  `/writing-rhetoric-faq`) — set per post via the "Section" dropdown in
  the admin editor. Each section has its own listing page and post URLs.
- Only a handful of images from "Website Images" were copied into
  `public/images/` (the ones actually used as post covers or the homepage
  hero). The rest of that folder wasn't copied into the repo — add more via
  the admin editor's "cover image path" field once you've dropped a file into
  `public/images/`.
- Cover images default to being cropped from the top when they don't fit
  the card's aspect ratio. If a specific image is cropping badly (e.g. a
  portrait's face getting cut off), set "Cover image focus" in the editor
  to something like `top`, `center`, `bottom`, or a precise `30% 70%` — it
  maps directly to CSS `background-position` for that one image.
- Cover images are set by typing a path (e.g. `/images/foo.jpg`) in the
  editor — there's no upload button yet. For a "very simple" CMS this keeps
  things easy to reason about; if you outgrow it, Cloudflare R2 is the
  natural next step for real image uploads.
