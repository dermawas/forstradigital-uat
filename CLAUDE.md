# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Static marketing site for Forstra Digital (a boutique consulting firm), plus product pages for Ledgerize (formerly branded SpendAware, briefly "monetr"). No build step, no bundler, no package manager — every page is a self-contained `.html` file with inline `<style>`/`<script>`. Edit files directly and open them in a browser to verify.

This is the **UAT** repo. It deploys to `uat.forstradigital.com` (see `CNAME`). Production is a **separate** GitHub repo, `dermawas/forstradigital`.

## Deployment

`.github/workflows/deploy-prod.yml` is manually triggered (`workflow_dispatch`) and promotes UAT to production: it clones `dermawas/forstradigital`, rsyncs this repo's contents over it (excluding `.git`, `.github`, `CNAME`), commits, and pushes. There is no automatic deploy — pushing to `main` here only updates the UAT site via GitHub Pages; production requires manually running that workflow.

Promote with `gh workflow run "Deploy to Production" --ref main`, then verify with `curl` against `forstradigital.com` — Pages takes ~30s and browser tab icons cache hard, so curl the markup rather than trusting a browser refresh.

The rsync uses `--delete`, so prod is **mirrored** to UAT: anything committed as deleted here is removed from production on the next promotion. Ask before committing deletions of files that are still live.

## Structure

- `index.html` — main Forstra Digital site (homepage, nav, sections keyed by anchor: `#about`, `#approach`, `#services`, `#clients`, `#why`, `#contact`).
- `ledgerize.html`, `ledgerize-feedback.html`, `ledgerize-gnucash-setup.html`, `ledgerize-privacy.html` — Ledgerize product pages, linked from the main nav.
- `ledgerize-app-name.js` — single source of truth for the product name. Pages that include this script use `{APP_NAME}` in `<title>` and `data-app-name` attributes instead of hardcoding "Ledgerize", so a future rename only touches this one file.
- `Porto/` — a third-party HTML theme, kept for reference/asset extraction (`portIndex.html`, its own `readme.md`). Not wired into the live pages; treat as vendor code.
- `forstra-digital-*.png/svg`, `logo_preview*.png` — brand assets referenced by the HTML pages.

## Conventions

- Styles are inlined per-page with CSS custom properties (`--ink`, `--paper`, `--accent`, `--teal`, `--muted`, `--line`) rather than a shared stylesheet — expect near-duplicate `<style>` blocks across pages when making cross-page changes (e.g. nav/branding updates need editing each page).
- Mobile nav uses a `.nav-toggle`/`.mobile-nav-panel` pattern driven by a small inline script per page, not a shared component.

## Brand / visual direction

The site's look is teal + navy on off-white, Playfair Display headings with DM Sans/DM Mono. **This is the preferred direction** — see the Claude Design note below before proposing a restyle.

`favicon.svg` at the repo root is the octagon "FS" mark redrawn as vector paths, filled with a `#2a8a88 → #1e6070 → #132644` gradient on a **transparent** ground. All five pages reference it with `<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>`. The root-absolute path is correct — both UAT and prod serve from a domain root.

There is no raster fallback (no 16/32/180/512 PNGs, no `apple-touch-icon`, no PWA manifest), so older Safari and PWA installs get no icon. No rasterizer is installed on the dev machine (ImageMagick/Inkscape/rsvg all absent; the `convert` on PATH is the Windows filesystem tool) — export PNGs from the design project if these are ever wanted.

`forstra-digital-icon.png`, `forstra-digital-logo.png`, and `forstra-digital-logo.svg` are committed but **not referenced by any page**. `logo_preview*.png` likewise.

## Claude Design imports

Designs arrive via the `claude_design` MCP / `DesignSync` tool (`/design-login` to auth) from projects at `claude.ai/design/p/<uuid>`. Notes from doing this:

- These handoffs say outright: **do not ship the `.dc.html` files**. They're prototypes wrapped in `<x-dc>` with `{{ }}` template holes, a React `support.js` runtime, and a `_ds_bundle.js` design system. Recreate the design as plain HTML/CSS in this repo's per-page-`<style>` convention instead.
- The "send to Claude Code" flow can drop a `design_handoff_*/` folder into the repo root. It is not tracked and can go stale against the live design — delete it rather than committing it.
- Handoff READMEs have been wrong about this site's existing state (one claimed the site's original accent was red; it has always been teal/navy). Verify claims about the current site against the actual files.

**Rejected, 2026-08-14:** a full homepage redesign from the "Forstra Digital Home" project (`b786100e-c085-4f95-a6a7-cb8d58d0906d`) — flat gridded "Modernist" style, Archivo type, blue `#1a4fd8` accent. Built, deployed to UAT, reviewed, reverted; the old design is preferred. It's recoverable at commit `ae0cc97` (`git checkout ae0cc97 -- index.html`) if the direction is ever revisited. Don't re-import it as a fresh idea.

## Notion — Leads Proposal Tracker (external tool, not part of this repo)

Forstra Digital's leads/proposal pipeline is tracked in a separate Notion page, "ForstraDigital Leads Proposal Tracker" (owned by Ferdinand, a teammate — not this repo, not the static site). Noting it here since it's Forstra Digital business tooling.

**Status (as of 2026-08-06):** Not yet connected to Claude's Notion MCP integration. `notion-fetch`, `notion-search`, and `notion-list-*` all came back empty for it under Seno's connected workspace ("Seno Space") — only a blank "Getting Started" page is visible. Likely cause: Seno has edit/view access but not full access on the page, and adding an MCP connection typically requires full access or admin rights. On hold until Ferdinand replies about connecting it.

**Guide for Ferdinand, once he's ready to connect it:**
1. Open the "ForstraDigital Leads Proposal Tracker" page/database in Notion.
2. Click **Share** (top-right), or the **•••** menu → **Connections**.
3. In the Share dialog, find **Connections** → **Add connections**.
4. Search for the Claude / Notion MCP connection. If it's not listed, it hasn't been installed workspace-wide yet — an admin adds it first via **Settings & Members → Connections**.
5. Select it to grant access.
6. Since this is a database, confirm the connection is added at the **database** level (not just a sub-page), so all rows/properties are queryable.
7. If the tracker has nested sub-pages (individual leads/proposals), use **"Add connections to pages inside"** if offered, rather than connecting each one manually.

**Once access is granted**, next step is to fetch the database schema via `notion-fetch` and review the leads/proposal pipeline structure (stage/status, lead source, proposal value, follow-up dates, owner, next action, won/lost outcome) for gaps or automation opportunities, then report findings back — no edits to the live tracker without separate confirmation, since it's shared data owned by Ferdinand.
