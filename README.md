<pre style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono',monospace;font-weight:800;font-size:12px;line-height:1.02;background:transparent;border:none;padding:0;margin:0 0 1em 0;letter-spacing:0;">
<span style="color:#FF2A2A;">██████</span> <span style="color:#18C964;">████████</span> <span style="color:#2D8CFF;">██████</span> <span style="color:#2D8CFF;">██████</span>
<span style="color:#FF2A2A;">██████</span> <span style="color:#18C964;">████████</span> <span style="color:#2D8CFF;">██████</span> <span style="color:#2D8CFF;">██████</span>
<span style="color:#FF2A2A;">  ████</span> <span style="color:#18C964;">  ████  </span> <span style="color:#2D8CFF;"> ██████</span> <span style="color:#2D8CFF;"> ██████</span>
<span style="color:#FF2A2A;">  ████</span> <span style="color:#18C964;">████████</span> <span style="color:#2D8CFF;">██████</span> <span style="color:#2D8CFF;">██████</span>
<span style="color:#FFFFFF;">█ █ █▀▀   █▀ ▄▀   █ █ █▀▀ █▄▄</span>
<span style="color:#7A7A7A;">▀▄▀ █▄▄   ▄█ █▄   ▀▄▀ █▄▄ █▄█</span>
</pre>

# VC's Notes — A Personal Brand, Managed by AI

This is [Varun Choraria](https://varunchoraria.com)'s personal website — a Jekyll blog about GTM, marketing, career, and other side quests.

What makes this site different? **An AI agent is my web manager.**

Every design decision, color token, and layout rule is codified in [`DESIGN.md`](DESIGN.md) — a machine-readable design system that lets the AI understand and maintain the visual identity with precision. Colors aren't "that blue" — they're **HD 189733b**. The background isn't "off-white" — it's **Proxima b**.

---

## STARLIGHT Design System

The site runs on **STARLIGHT** — a celestial design system inspired by the Orion Athletics brand identity. High-contrast blues against warm neutrals, with a peachy accent that adds humanity.

### Color Palette (Exoplanet Tokens)

| Token | Exoplanet | Hex | Role |
|-------|-----------|-----|------|
| `hd189733b` | HD 189733b | `#0796D7` | Primary accent, links |
| `gj504b` | GJ 504b | `#8DC8EF` | Dark mode links |
| `tres2b` | TrES-2b | `#024C7B` | Deep navy, visited links |
| `proxima-b` | Proxima b | `#EDEAE5` | Warm page background |
| `kepler22b` | Kepler-22b | `#DCD8D2` | Surface / cards |
| `kepler186f` | Kepler-186f | `#D2D3CC` | Borders, dividers |
| `cancri55e` | 55 Cancri e | `#FFE8DE` | Blockquote highlight |
| `pegasi51b` | 51 Pegasi b | `#E3E6EB` | Code blocks |
| `void` | Void | `#08080C` | Text, deep space |

The full system — typography, spacing, components, light & dark mode tokens — lives in [`DESIGN.md`](DESIGN.md), following the google-labs-code/design.md specification. A coding agent reads this, understands the visual language, and makes design-accurate changes without hand-holding.

### How AI Manages This Site

1. **DESIGN.md is the source of truth.** Before touching any CSS, the AI reads the design system to understand colors, typography, layout rules, and component specs.
2. **Colors are referenced by exoplanet name.** "Make this HD 189733b" maps directly to `#0796D7`.
3. **The agent validates against the system.** New colors can't be introduced without adding a token. Box-shadows are forbidden. Every change must pass WCAG AA contrast checks.
4. **Design discussions happen in design terms.** The human says "that blockquote needs more warmth" — the AI knows to pull in 55 Cancri e.
5. **The system evolves in lockstep.** When the design changes, DESIGN.md gets updated first, then the CSS follows.

---

## Engineering Methodology

### Mattpocock Skills

The codebase is architected using 14 skills from the [mattpocock/skills](https://github.com/mattpocock/skills) collection — TypeScript typing patterns, testing workflows, and structured conventions that enforce consistency across agent-generated code.

### Compound Engineering

35 compound-engineering skills (via `@every-env/compound-plugin`) guide the agent through complex refactors, architecture decisions, and code quality gates — from `ce-type-variance` to `ce-branch-by-abstraction`. Every CSS variable, layout rule, and component boundary is governed by these patterns, ensuring the design system stays coherent as the site evolves.

---

## Security & Quality

### Cybersecurity

- **Dependency audit:** `bundler-audit` passes with 0 vulnerabilities
- **No hardcoded secrets:** Zero API keys, tokens, or credentials in the codebase
- **XSS/CSRF:** Jekyll's auto-escaping handles template injection vectors. All user-facing content is Markdown-sourced, never raw HTML
- **External surface:** The only third-party request is the Google Fonts (Inter) stylesheet and the GA4 analytics tag
- **HTTPS:** Enforced via GitHub Pages + custom domain with automatic TLS

### Lighthouse

| Metric | Score |
|--------|-------|
| DNS | 1ms |
| TCP | 3ms |
| SSL | 0ms (H2) |
| TTFB | 40ms |
| DOM Content Loaded | 508ms |
| Full Load | 749ms |

Zero-cost TLS, preconnected Google Fonts, compressed CSS — the site is fully static with no render-blocking JS.

---

## Run Locally

Tested with Ruby `3.2.2` (see `.ruby-version`).

```bash
rbenv local 3.2.2
bundle install
bundle exec jekyll serve
```

Without Bundler:

```bash
jekyll serve
```

---

## How to Create Content

### Pages

Create a Markdown file in the repo root:

```md
---
title: About
eyebrow: About
intro: A short explanation of who you are.
---
Your page content here.
```

### Blog Posts

Create a file in `_posts/`:

```md
---
title: My post
date: 2026-03-22 10:00:00 +0530
tags:
  - notes
  - web
---
Post body here.
```

Posts appear on the homepage and at `/{slug}/`.

### Static Pages

Existing page files:

```text
about.md
work/index.md
fun/index.md
disclaimer.md
```

---

## Deploy

Hosted on **GitHub Pages** with a custom domain (varunchoraria.com). Push to `main` and Actions handles the rest:

```bash
git add .
git commit -m "what changed"
git push
```

---

## Architecture

```
├── _config.yml          # Jekyll config (permalink: /:slug/)
├── _includes/           # head, footer, nav partials
├── _layouts/            # page, entry, default layouts
├── _posts/              # blog post markdown files
├── assets/
│   └── css/
│       └── style.scss   # Single stylesheet with CSS custom properties
├── DESIGN.md            ★ Machine-readable design system
├── about.md
├── work/
│   └── index.md
├── fun/
│   └── index.md
└── blog/
    └── index.md
```

The entire visual identity flows from the CSS custom properties at the top of `style.scss`. Light and dark themes toggle via `data-theme` on `<html>`, persisted in `localStorage`.
