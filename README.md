<pre style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono',monospace;font-weight:900;font-size:20px;line-height:.86;background:#050505;border:none;padding:16px 18px;margin:0 0 1em 0;width:max-content;max-width:100%;overflow:auto;letter-spacing:0;">
<span style="color:#0796D7;text-shadow:3px 3px 0 #FFE8DE,6px 6px 0 #024C7B;">█   █  ███</span>
<span style="color:#168ED0;text-shadow:3px 3px 0 #FFE8DE,6px 6px 0 #024C7B;">█   █ █   </span>
<span style="color:#2B86C2;text-shadow:3px 3px 0 #FFE8DE,6px 6px 0 #024C7B;">█   █ █   </span>
<span style="color:#0B74B1;text-shadow:3px 3px 0 #FFE8DE,6px 6px 0 #024C7B;"> █ █  █   </span>
<span style="color:#024C7B;text-shadow:3px 3px 0 #FFE8DE,6px 6px 0 #024C7B;">  █    ███</span>
</pre>

# VC's Notes

[Varun Choraria](https://varunchoraria.com)'s personal website — a Jekyll blog about B2B marketing, GTM strategy, management, career, and side quests.

Built and maintained almost entirely with AI. Not as a gimmick — as a genuine test of what it looks like when a personal site is run like a product, with an AI agent doing the engineering work.

---

## What AI does on this site

### 1. Manages the codebase (Claude Code)
Claude Code is the primary web manager. It writes HTML, CSS, and Ruby. It adds pages, fixes bugs, and ships features based on plain-English instructions. Every change goes through a QA gate before it goes live.

### 2. Reads a machine-readable design system (DESIGN.md)
Before touching any CSS, the AI reads [`DESIGN.md`](DESIGN.md) — a file that codifies every design decision: colors, typography, spacing, components. Colors have names (HD 189733b = `#0796D7`). Layouts have rules. The AI validates against this system before making any visual change, which means the design stays consistent without hand-holding.

### 3. QA checks before every push
A pre-push hook runs `_scripts/qa.rb` automatically whenever content is pushed. It checks every changed file for:
- **SEO** — title and description present, within character limits
- **AEO** — content length, heading structure, tags (helps AI agents parse and cite the content)
- **Design compliance** — valid layout, intro field, date format
- **MCP compliance** — new pages flagged if they're missing `mcp: true` (see below)
- **Dangerous files** — blocks CSV, SQL, .env, and other non-site files from being accidentally committed

Errors block the push. Warnings are informational.

### 4. Exposes the site as an MCP server
The site runs a live [MCP (Model Context Protocol)](https://varunchoraria.com/mcp/) server at [`varunchoraria-mcpvercelapp.vercel.app`](https://varunchoraria-mcpvercelapp.vercel.app). Any MCP-compatible AI client — Claude Code, Claude Desktop, Cursor, Codex CLI — can connect to it and read the site content directly.

Six tools are exposed:
- `get_site_info` — bio, role, topics, contact
- `list_posts` — all posts with titles, dates, tags
- `get_post` — full text of any post by slug
- `list_pages` — all indexed pages
- `get_page` — full content of About, Work, Uses This, etc.
- `search` — keyword search across everything

The server fetches from `/api/site.json` — a Jekyll-generated file that auto-updates on every push. Add `mcp: true` to any page's frontmatter and it gets indexed automatically.

### 5. Browser-side MCP widget (WebMCP)
A floating widget on every page (bottom right) lets users connect their local AI agent to the site via [WebMCP](https://github.com/jasonjmcghee/WebMCP) — a browser-based bridge. Useful for in-browser sessions with Claude Desktop.

### 6. Side quests built with AI
The [/side-quests](https://varunchoraria.com/side-quests/) page lists tools and projects built using Claude Code, Codex, and OpenCode — GTM dashboards, design pipelines, internal tools. Most started as weekend experiments.

---

## Design system (STARLIGHT)

The site runs on STARLIGHT — a celestial design system with exoplanet-inspired color tokens.

| Token | Exoplanet | Hex | Role |
|-------|-----------|-----|------|
| `hd189733b` | HD 189733b | `#0796D7` | Accent, links |
| `gj504b` | GJ 504b | `#8DC8EF` | Dark mode links |
| `tres2b` | TrES-2b | `#024C7B` | Deep navy, visited |
| `proxima-b` | Proxima b | `#EDEAE5` | Page background |
| `kepler22b` | Kepler-22b | `#DCD8D2` | Surface / cards |
| `kepler186f` | Kepler-186f | `#D2D3CC` | Borders |
| `cancri55e` | 55 Cancri e | `#FFE8DE` | Blockquote highlight |
| `pegasi51b` | 51 Pegasi b | `#E3E6EB` | Code blocks |
| `void` | Void | `#08080C` | Text |

Full spec — typography, spacing, components, light/dark tokens — lives in [`DESIGN.md`](DESIGN.md).

---

## Run locally

Requires Ruby `3.2.2` (see `.ruby-version`).

```bash
bundle install
bundle exec jekyll serve
```

### Nav island (React)

The top nav is a shadcn `NavigationMenu` React island. Source lives in `_nav/` (Vite + React + Tailwind v4); GitHub Pages can't run npm, so the built artifacts (`assets/js/nav.js`, `assets/css/nav.css`) are committed. After changing anything in `_nav/`, rebuild:

```bash
cd _nav
npm install   # first time
npm run build # emits ../assets/js/nav.js + ../assets/css/nav.css
```

Nav links come from `_data/navigation.yml` (injected at Jekyll render time) — add an entry there and it appears in the built nav with no code change.

---

## Create content

### Blog post

Create a file in `_posts/` named `YYYY-MM-DD-slug.md`:

```yaml
---
title: Post title
date: 2026-06-28 00:00:00 +0530
description: One sentence summary for SEO.
tags:
  - gtm
  - career
---
Post content here.
```

### Page

Create a Markdown file in the repo root or a subdirectory:

```yaml
---
title: Page title
intro: Short intro shown in the page header.
mcp: true
---
Page content here.
```

Add `mcp: true` to expose the page to AI agents via the MCP server.

---

## Deploy

Push to `main`. GitHub Actions handles the rest.

```bash
git add .
git commit -m "what changed"
git push
```

The pre-push hook runs QA automatically. Fix any errors before the push goes through.

---

## Security

- No API keys, tokens, or credentials in the codebase
- Pre-push hook blocks accidental commits of CSV, SQL, .env, and similar files
- Jekyll auto-escaping handles XSS. All content is Markdown-sourced
- HTTPS enforced via GitHub Pages + automatic TLS

---

## Architecture

```
├── _config.yml          # Jekyll config
├── _includes/           # head, footer, nav partials
├── _layouts/            # page, home, default layouts
├── _posts/              # blog post markdown files
├── _scripts/
│   └── qa.rb            ★ Pre-push QA agent
├── api/
│   ├── posts.json       # All posts as JSON (for MCP)
│   └── site.json        # All posts + pages as JSON (for MCP)
├── assets/css/
│   └── style.scss       # Single stylesheet, CSS custom properties
├── mcp/
│   └── index.html       # MCP connection page
├── DESIGN.md            ★ Machine-readable design system
└── [about, work, fun, uses-this, side-quests, changelog].md
```
