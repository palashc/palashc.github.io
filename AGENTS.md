# AGENTS.md

Guidance for AI agents (and humans) working on this repository.

## What this is

The personal website of Palash Chauhan, served at **https://palashc.github.io**
via GitHub Pages. It is a minimal, typographic, blog-first site with a
light/dark toggle.

It was rewritten from an old Hugo/Academic build to **Astro 5 + Tailwind CSS v4**.
The previous Hugo output is preserved (unused) in [`archive/`](archive/) — do not
edit or build from it.

## Tech stack

- **Astro 5** (static site generator, output: `static`)
- **Tailwind CSS v4** via `@tailwindcss/vite` (no `tailwind.config.js`; config
  lives in CSS — see `src/styles/global.css`)
- **@tailwindcss/typography** for blog post prose
- **Shiki** for code highlighting (dual `github-light` / `github-dark` themes)
- **@astrojs/sitemap** and **@astrojs/rss** for sitemap + feed
- Fonts: Inter (loaded from Google Fonts in `BaseLayout.astro`)

## Commands

```bash
npm install        # install dependencies (Node 18+; developed on Node 22)
npm run dev        # local dev server with live reload at http://localhost:4321
npm run build      # build the static site into ./docs  (this is the CI/verification gate)
npm run preview    # serve the built ./docs locally
```

There is **no unit test suite**. "Testing" = a clean `npm run build` plus a
visual check via `npm run dev` / `npm run preview`. Treat a successful build
with no warnings as the bar for done. Also run the editor's lint/type check on
changed files.

## Repository layout

```
astro.config.mjs        # site URL, outDir: ./docs, sitemap, shiki themes
src/
  config.ts             # SINGLE SOURCE OF TRUTH for site content & flags (see below)
  content.config.ts     # blog collection schema (Zod)
  content/blog/         # blog posts (Markdown). Series = subfolders.
  layouts/
    BaseLayout.astro    # <head>, fonts, theme no-flash script, header/footer
    PostLayout.astro    # blog post wrapper (prose, series nav)
  components/
    Header.astro Footer.astro ThemeToggle.astro Experience.astro PostCard.astro
  lib/posts.ts          # blog/series helpers (sorting, series grouping, prev/next)
  pages/
    index.astro         # home: about + experience + (latest posts when enabled)
    blog/index.astro    # blog landing (series cards + standalone posts)
    blog/series/[series].astro   # series landing page
    blog/[...slug].astro         # individual post page
    rss.xml.js          # RSS feed
    404.astro
  styles/global.css     # Tailwind import + theme tokens + dark-mode variant
public/                 # static assets copied as-is: avatar.jpg, files/cv.pdf, .nojekyll
docs/                   # BUILD OUTPUT — committed and served by GitHub Pages. Do not hand-edit.
archive/                # old Hugo site, kept for reference. Unused. Do not edit/build.
```

## src/config.ts — edit content here first

Most content edits do NOT require touching components. `src/config.ts` exports:

- `BLOG_ENABLED` — feature flag. When `false`, the Blog nav tab, the home
  "Latest posts" section, and all `/blog` routes (posts, series, RSS items) are
  hidden / not generated. Set to `true` to publish the blog.
- `SITE` — title, description, author, role, org.
- `SOCIALS` — email, github, linkedin, cv (used in the footer and home page).
- `EXPERIENCE` — array of jobs. Each entry is intentionally condensed:
  `role`, `company`, optional `companyUrl`, optional `team`, `period`,
  optional `location`, and `tech` (string[] rendered as keyword chips).
  No prose/bullets by design.
- `EDUCATION` — degree + institution entries.
- `SERIES` — map of `blog-folder-slug -> { title, description }` for blog series.

## Working with the blog

The blog is currently **hidden** (`BLOG_ENABLED = false`) and contains only
placeholder "hello world" content. To publish, set `BLOG_ENABLED = true` and add
real posts.

- **A series is a folder** under `src/content/blog/<series-slug>/`. Register its
  title/description in `SERIES` in `src/config.ts` (keyed by the folder name).
- **A post** is a Markdown file. Post URLs follow the file path:
  - `src/content/blog/<slug>.md` -> `/blog/<slug>/` (standalone post)
  - `src/content/blog/<series>/<slug>.md` -> `/blog/<series>/<slug>/` (in a series)
- **Series landing pages** live at `/blog/series/<series-slug>/`.
- Order within a series is set by the optional `order:` frontmatter field
  (lower first; ties broken by date).

Post frontmatter schema (see `src/content.config.ts`):

```yaml
---
title: "Post title"            # required
description: "One-line summary" # optional; shown in lists, RSS, meta tags
date: 2026-06-01               # required
updated: 2026-06-05            # optional
order: 1                       # optional; position within a series
tags: ["hbase", "internals"]   # optional
draft: false                   # optional; drafts are excluded from build
---
```

Do not name a series folder `series` (it would collide with the
`/blog/series/...` route).

## Deployment (GitHub Pages)

- Output goes to `docs/` (set by `outDir` in `astro.config.mjs`).
- GitHub Pages is configured to serve from branch `master`, folder `/docs`.
- `public/.nojekyll` -> `docs/.nojekyll` so Pages serves Astro's `_astro/`
  asset folder (Jekyll would otherwise ignore underscore-prefixed paths).
- **Always run `npm run build` and commit the regenerated `docs/` together with
  your source changes** — the live site is whatever is in `docs/`. There is no CI
  build step; the committed `docs/` IS the deploy artifact.

## Conventions

- Keep the design minimal and typographic. Colors come from Tailwind's
  zinc palette plus the accent tokens (`--color-accent`,
  `--color-accent-dark`) defined in `src/styles/global.css`. Avoid hardcoding
  hex colors in components; prefer the existing tokens and `dark:` variants.
- Dark mode is class-based (`<html class="dark">`), toggled by
  `ThemeToggle.astro` and initialized by the inline no-flash script in
  `BaseLayout.astro`. Use `dark:` Tailwind variants for any new UI.
- Prefer editing `src/config.ts` over hardcoding content in components.
- Don't hand-edit anything in `docs/` or `archive/`.
