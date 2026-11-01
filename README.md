# dtf: Damn These Feelings

A gag site for `damnthesefeelings.com`. Every ex is a **realm** with a portrait, a color, and a dossier, and each
is codenamed after one of Joe Goldberg's exes from *You*, with a French twist (Love Quinn reigns as **Amour**). Every post is a
**chronicle** filed under a realm: a fantasy-lore archive of the fallen kingdoms of Joe, plus live mockery of how
Joe behaves now. Astro, static output, served from a Cloudflare Worker.

```bash
npm install
npm run dev      # local dev server
npm run build    # outputs to dist/
npm run check    # build + typecheck + wrangler dry run
npm run deploy   # wrangler deploy
```

## The realms

| Codename | Drawn from (*You*) | Lore name | Era |
| --- | --- | --- | --- |
| Pierre | Candace Stone ("stone" in French) | The Stonelands | Stone Age |
| Amour | Love Quinn ("love" in French) | The Kingdom of Duskhaven | First Age |
| Belle | Marienne Bellamy ("fair" in French) | The Long Distance Provinces | Second Age |
| Fantome | Guinevere Beck ("ghost" in French, accent dropped for the URL) | The Free City of Almost | Interregnum |
| Reine | Kate Galvin ("queen" in French) | The Chess Republic | Third Age |
| Joe | Joe Goldberg | The Capital (Joe's head) | Present Day |

Only Amour was specified; the other codenames are picks that match each realm's lore. Change any of them in
`REALMS` in `src/consts.ts` (character, show, twist, tag, color). If you rename a `tag`, update the `tag:` line in
that realm's posts and rename its image to match.

## Where things live

| What | Where |
| --- | --- |
| Site name, domain, **the realms**, field notes, timeline, roadmap | `src/consts.ts` |
| Fetching/sorting/tag helpers (the only place drafts are filtered) | `src/lib/posts.ts` |
| Page shell: head/SEO/social image, nav, footer | `src/layouts/Layout.astro` |
| Homepage | `src/pages/index.astro` |
| Realm pages (`/realms/<tag>/`) and realm index | `src/pages/realms/` |
| Chronicle list and post pages (`/chronicles/`) | `src/pages/chronicles/` |
| Theme: colors, type, boot sequence | `src/styles/global.css` |
| Posts (`.md` or `.mdx`) | `src/content/blog/` |
| Realm portraits | `public/realms/` |
| Sub-blog: The Grudge Book (`/grudges/`), case files | `src/content/cases/`, `src/pages/grudges/`, `src/styles/case.css` |
| Sub-blog: Pudo Ser (`/pudo-ser/`), "could have been" | `src/content/dreams/`, `src/pages/pudo-ser/`, `src/styles/dream.css` |
| Shell shared by the sub-blogs (no link back to the main blog) | `src/layouts/SubLayout.astro` |
| Image sizes and swap steps | `docs/IMAGES.md` |
| The vault (private page): items list | `src/data/apps.ts` |
| Vault page and login | `src/pages/gate/index.astro`, `src/lib/gate.ts` |

Fonts (Fraunces, Chakra Petch, JetBrains Mono) are bundled from npm; nothing loads from a font CDN.

## Images

Each realm has a placeholder portrait in `public/realms/`. Swap in your generated art (1200 x 1500, 4:5), update
that realm's `image` and `imageAlt` in `src/consts.ts`, and it flows to the homepage cards, the realm page, and
the social share preview. Any post can also add a `heroImage` banner. Full steps: `docs/IMAGES.md`.

## The sub-blogs

Two standalone sections that do **not** cross-reference the main blog. They have their own layout, theme, and
content collection, no nav or footer links into the main site, `noindex` meta tags, and are left out of the
sitemap. The vault (`/gate/`) is the front door: its cards in `src/data/apps.ts` point at them.

**The Grudge Book** (`/grudges/`) is a crime-show format: one page per case, with a case number, defendant,
charges, a stamp for the status, and an interrogation transcript. Add a file to `src/content/cases/`:

```md
---
caseNo: "DTF-0004"
title: "The People v. Joe: Something"
defendant: "Joe"
charges:
  - "First count"
status: "Open"        # Open | Closed | Dismissed | Pending Sentencing
filed: 2026-11-02
summary: "Two sentences for the docket."
---

**Det. Holloway:** Dialogue. Bold the speaker; it renders as a label.
```

**Pudo Ser** (`/pudo-ser/`, Spanish for "could have been") is a quiet, dusk-lit room of short fragments about lives
that never happened. Add a file to `src/content/dreams/` with `title`, `version` (the one-line "the version
where..."), and `pubDate`.

**Heads up:** the sub-blog pages are only *hidden*, not password-protected. The vault lists them behind the login,
but anyone who knows `/grudges/` or `/pudo-ser/` can open them. Protecting the pages themselves needs server-side
rendering with a session check, which is a separate change.

## Adding a chronicle

Create `src/content/blog/<slug>.md`:

```md
---
title: "The Fall of Somewhere"
description: "One line for the card and RSS."
pubDate: 2026-11-01
tag: "Amour"           # must match a realm's tag in src/consts.ts
mood: "defensive"      # optional, shown on the card and post
heroImage: "/chronicles/amour-01.jpg"   # optional banner, a path under public/
heroAlt: "Describe the image"
draft: false
---
```

The post, its realm page, the RSS feed, the sitemap, and prev/next links all update automatically. A post whose
tag has no realm still gets its own page, in violet.

## The vault (private page)

`/gate/` (shown in the nav as `/vault`) is a server-rendered page behind a password. Signed out, it shows only a
login form. The list of items lives in `src/data/apps.ts`, is bundled into the Worker, and is only sent to a
signed-in browser.

**Set the secrets (required, or the vault stays sealed).** In the Cloudflare dashboard, open the Worker, then
*Settings > Variables and Secrets*, and add two values of type **Secret**:

| Name | Value |
| --- | --- |
| `GATE_PASSWORD` | the password you will type at the vault |
| `SESSION_SECRET` | a long random string, 32+ characters (for example `openssl rand -base64 48`) |

Changing `SESSION_SECRET` signs everyone out. If either is missing or too short, the vault refuses all logins.
**Local development:** copy `.dev.vars.example` to `.dev.vars` (git-ignored) and run `npm run dev`.

The vault is a launcher, not a guard for the things it links to. Add a Cloudflare rate-limiting rule for `/gate/`
so repeated wrong passwords are blocked outright.

## Deploying

`npm run deploy`. The Worker is named `dtf-blog-project` in `wrangler.json`. Point `damnthesefeelings.com` at it
in Cloudflare.
