# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing website for **Equal Path** (equalpath.ai) — an AI consulting/training business. No build system, no framework, no tests. Pure HTML/CSS/vanilla JS served directly.

## Local Development

Open `index.html` in a browser, or serve locally:

```bash
python -m http.server 8000   # then visit http://localhost:8000
# or: npx http-server
```

There is no build step, no linter config, and no test suite. Verify changes by loading the page in a browser and exercising the affected UI (navigation, contact form, FAQ accordion, mobile menu).

## Deployment

Auto-deploys to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml` (uploads the repo root as-is). Custom domain `equalpath.ai` is set in `CNAME`. Do not modify `CNAME` unless intentionally changing the domain.

## Architecture

- **`index.html`** — main site, single-page with anchor sections (`#about`, `#services`, `#benefits`, `#contact`). Contains inline JSON-LD structured data (schema.org `ProfessionalService`) and GA4 snippet (ID `G-DS2JZBL8N7`). SEO meta tags, OG tags, and the structured data all reference `equalpath.ai` — keep them consistent when editing.
- **`styles.css`** — all styles, single file. Design tokens are CSS custom properties on `:root` (`--primary-color`, `--secondary-color`, `--accent-color`, etc.). Change brand colors there, not inline.
- **`script.js`** — all JS, single file. Sections are delimited by `// ===` comment banners: mobile menu, navbar scroll effect, smooth scroll, IntersectionObserver fade-ins, active-link highlighting, EmailJS contact form, lazy images, FAQ accordion, analytics event tracking.
- **`macdonald-electric.html`** — standalone separate-project page (has `noindex`, excluded from `sitemap.xml`). Self-contained (own inline CSS/JS); does **not** share `styles.css`/`script.js` with the main site. Edit independently.
- **`sitemap.xml` / `robots.txt`** — update `sitemap.xml` `lastmod` dates when meaningfully changing page content. Only the homepage and its anchor sections are indexed.

## Contact form (EmailJS)

The contact form submits via EmailJS — credentials live in `script.js` in the `EMAILJS_CONFIG` object (`PUBLIC_KEY`, `SERVICE_ID`, `TEMPLATE_ID`). The EmailJS public key is intentionally client-side. Template variables sent: `name`, `email`, `role`, `interest`, `message` — if you rename form fields in `index.html`, update both the `templateParams` object in `script.js` and the template in the EmailJS dashboard. See `EMAILJS_SETUP.md` for full dashboard setup.

## Content/SEO notes

- The structured data in `index.html` declares services, pricing range, and area served — treat it as part of the content, not boilerplate. Keep it aligned with the visible copy.
- When adding a new section to `index.html`, give it an `id`, wire up the nav link in the header, and add a `<url>` entry to `sitemap.xml`.
