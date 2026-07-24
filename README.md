# VC's Notes

[Varun Choraria](https://www.varunchoraria.com)'s personal publication about AI, GTM, management, careers, and side quests.

Built with Jekyll. Hosted on GitHub Pages. Deliberately resembles the simple, functional personal websites of the early web.

## Design

The homepage is the archive: small circular portrait above the introduction, calendar and social icons, green GitHub activity, every essay grouped by year, then linked featured side projects with destination-appropriate icons. The shared footer links to the dedicated tag index. Navigation and footer are plain HTML; mobile navigation uses a CSS-only hamburger toggle. Text links are blue and underlined except in the header; icon-only social links have no text decoration. `VC` is electric blue. The site uses system fonts and no component framework.

[`DESIGN.md`](DESIGN.md) contains the complete machine-readable design and performance rules.

Hard constraints:

- No React, Tailwind, shadcn, web fonts, dark-mode framework, or client-side navigation
- No cards, pills, shadows, gradients, or decorative animation
- No JavaScript on normal pages
- One small dependency-free script for the GitHub contribution graph
- Mobile navigation uses a CSS-only hamburger; links remain normal HTML

## Run locally

Requires Ruby `3.2.2`.

```bash
bundle install
bundle exec jekyll serve
```

Open `http://127.0.0.1:4000/`.

## QA

```bash
ruby _scripts/validate-posts.rb
ruby -c _scripts/qa.rb
ruby -c _scripts/validate-posts.rb
node --check assets/js/gh-graph.js
ruby _scripts/qa.rb --all
bundle exec jekyll build
```

The full QA gate checks every tracked page and post for SEO, AEO, MCP indexing, design constraints, dead assets, and performance budgets. Run `ruby _scripts/qa.rb` without `--all` for changed files only.

Rendered pages include unique titles and descriptions, canonical URLs, crawl directives, RSS discovery, and JSON-LD for `Person`, `WebSite`, page type, and `BlogPosting`. Legacy archive aliases are `noindex` and canonicalize to `/blog/`.

## Create an essay

Add `_posts/YYYY-MM-DD-slug.md`:

```yaml
---
title: Essay title
seo_title: Optional shorter search title
date: 2026-07-18 00:00:00 +0530
description: One-sentence summary.
tags:
  - ai
  - strategy
---
```

## Create a page

```yaml
---
title: Page title
intro: Short introduction.
mcp: true
---
```

`mcp: true` exposes the page through the site's MCP server.

## Architecture

```text
_includes/nav.html         Pure HTML navigation
_includes/essay-list.html  Shared chronological archive
_includes/footer.html      Consulting, calendar, reading, machine, AI, and colophon links
_includes/head.html        Canonical, social, robots, RSS, and favicon metadata
_includes/seo-schema.html  Shared Person, WebSite, WebPage, and Service JSON-LD
_layouts/home.html         Intro, social links, GitHub, archive, side quests
_includes/social-links.html Accessible inline social icons
_includes/repo-list.html   Featured side projects and canonical links
_data/quests.yml           Complete side-quest directory and homepage feature flags
side-quests/index.md       Grouped directory generated from quest data
_layouts/entry.html        Essay, related essays, older/newer links
_sass/main.scss            Only design stylesheet, inlined at build
assets/js/gh-graph.js      Only homepage application JavaScript
assets/favicon.svg         White and electric-blue VC favicon source
assets/images/favicon.png  180px raster and Apple touch fallback
_includes/logos/           Only logo source
api/                       Jekyll-generated MCP data
DESIGN.md                  Machine-readable design system
```

## Deploy

Push to `main`. GitHub Actions builds and publishes the site. QA runs before push.
