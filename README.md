# VC's Notes

[Varun Choraria](https://www.varunchoraria.com)'s personal publication about AI, GTM, management, careers, and side quests.

Built with Jekyll. Hosted on GitHub Pages. Deliberately resembles the simple, functional personal websites of the early web.

## Design

The homepage is the archive: small circular portrait above the introduction, calendar and social icons, green GitHub activity, every essay grouped by year, then public side-project repositories. The shared footer links to the dedicated tag index. Navigation and footer are plain HTML. Links are blue and underlined. `VC` is electric blue. The site uses system fonts and no component framework.

[`DESIGN.md`](DESIGN.md) contains the complete machine-readable design and performance rules.

Hard constraints:

- No React, Tailwind, shadcn, web fonts, dark-mode framework, or client-side navigation
- No cards, pills, dropdown menus, shadows, gradients, or decorative animation
- No JavaScript on normal pages
- One small dependency-free script for the GitHub contribution graph
- Mobile navigation stays visible and wraps instead of collapsing behind a menu

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
ruby _scripts/qa.rb DESIGN.md _layouts/home.html _sass/main.scss
bundle exec jekyll build
```

The pre-push gate checks SEO, AEO, MCP indexing, design constraints, and asset budgets.

## Create an essay

Add `_posts/YYYY-MM-DD-slug.md`:

```yaml
---
title: Essay title
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
_includes/footer.html      Tags, RSS, MCP, AI, disclaimer, changelog, source
_layouts/home.html         Intro, social links, GitHub, archive, side quests
_includes/social-links.html Accessible inline social icons
_includes/repo-list.html   Public GitHub side projects
_layouts/entry.html        Essay, related essays, older/newer links
_sass/main.scss            Only design stylesheet, inlined at build
assets/js/gh-graph.js      Only homepage application JavaScript
api/                       Jekyll-generated MCP data
DESIGN.md                  Machine-readable design system
```

## Deploy

Push to `main`. GitHub Actions builds and publishes the site. QA runs before push.
