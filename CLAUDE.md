# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Static marketing site for Forstra Digital (a boutique consulting firm), plus product pages for Ledgerize (formerly branded SpendAware, briefly "monetr"). No build step, no bundler, no package manager — every page is a self-contained `.html` file with inline `<style>`/`<script>`. Edit files directly and open them in a browser to verify.

This is the **UAT** repo. It deploys to `uat.forstradigital.com` (see `CNAME`). Production is a **separate** GitHub repo, `dermawas/forstradigital`.

## Deployment

`.github/workflows/deploy-prod.yml` is manually triggered (`workflow_dispatch`) and promotes UAT to production: it clones `dermawas/forstradigital`, rsyncs this repo's contents over it (excluding `.git`, `.github`, `CNAME`), commits, and pushes. There is no automatic deploy — pushing to `main` here only updates the UAT site via GitHub Pages; production requires manually running that workflow.

## Structure

- `index.html` — main Forstra Digital site (homepage, nav, sections keyed by anchor: `#about`, `#approach`, `#services`, `#clients`, `#why`, `#contact`).
- `ledgerize.html`, `ledgerize-feedback.html`, `ledgerize-gnucash-setup.html`, `ledgerize-privacy.html` — Ledgerize product pages, linked from the main nav.
- `ledgerize-app-name.js` — single source of truth for the product name. Pages that include this script use `{APP_NAME}` in `<title>` and `data-app-name` attributes instead of hardcoding "Ledgerize", so a future rename only touches this one file.
- `Porto/` — a third-party HTML theme, kept for reference/asset extraction (`portIndex.html`, its own `readme.md`). Not wired into the live pages; treat as vendor code.
- `forstra-digital-*.png/svg`, `logo_preview*.png` — brand assets referenced by the HTML pages.

## Conventions

- Styles are inlined per-page with CSS custom properties (`--ink`, `--paper`, `--accent`, `--teal`, `--muted`, `--line`) rather than a shared stylesheet — expect near-duplicate `<style>` blocks across pages when making cross-page changes (e.g. nav/branding updates need editing each page).
- Mobile nav uses a `.nav-toggle`/`.mobile-nav-panel` pattern driven by a small inline script per page, not a shared component.
