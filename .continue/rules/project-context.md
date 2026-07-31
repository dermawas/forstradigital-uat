---
name: Forstra Digital UAT site context
description: What this repo is and how it's structured
alwaysApply: true
---

This repo (`forstradigital-uat`) is the UAT/staging build of the Forstra Digital marketing site, deployed via GitHub Pages to `uat.forstradigital.com` (see `CNAME`).

- Plain static HTML/CSS/JS — no build step, no bundler, no package manager. Edit the `.html` files directly.
- `index.html` — main site homepage and nav.
- `ledgerize*.html` — pages for the Ledgerize product (formerly branded "SpendAware"; renamed across pages and URLs).
- `Porto/` — a third-party HTML theme/template used for shared assets (CSS/JS/fonts/images). Treat it as vendor code, not something to refactor unless asked.
- `forstra-digital-*.png/svg`, `logo_preview*.png` — brand assets referenced across pages.
- No test suite or CI build to run; changes are verified by opening the HTML in a browser.
- Git remote: `dermawas/forstradigital-uat` on GitHub, default branch `main`.
