```
 ____ _____  _    ____  _     ___ ____ _   _ _____
/ ___|_   _|/ \  |  _ \| |   |_ _/ ___| | | |_   _|
\___ \ | | / _ \ | |_) | |    | | |  _| |_| | | |
 ___) || |/ ___ \|  _ <| |___ | | |_| |  _  | | |
|____/ |_/_/   \_\_| \_\_____|___\____|_| |_| |_|
```

# VC's Notes — A Personal Brand, Managed by AI

This is [Varun Choraria](https://varunchoraria.com)'s personal website —
a Jekyll blog about GTM, marketing, career, and other side quests.

What makes this site different? **An AI agent is my web manager.**

Every design decision, color token, and layout rule is codified in
[`DESIGN.md`](DESIGN.md) — a machine-readable design system that lets
the AI understand and maintain the visual identity with precision.
Colors aren't "that blue" — they're **Neptune**. The background isn't
"off-white" — it's **Venus**.

---

## STARLIGHT Design System

The site runs on **[STARLIGHT](DESIGN.md)** — a celestial design system
inspired by the Orion Athletics brand identity. High-contrast blues
against warm neutrals, with a peachy accent that adds humanity.

### Planet Palette

| Token  | Planet      | Hex       | Role |
|--------|-------------|-----------|------|
| Neptune | Neptune     | `#0796D7` | Primary accent, links |
| Uranus  | Uranus      | `#8DC8EF` | Dark mode links |
| Midnight | Midnight   | `#024C7B` | Deep navy, visited links |
| Venus   | Venus       | `#EDEAE5` | Warm page background |
| Terra   | Terra (Earth) | `#DCD8D2` | Surface / cards |
| Mercury | Mercury     | `#D2D3CC` | Borders, dividers |
| Mars    | Mars        | `#FFE8DE` | Blockquote highlight |
| Star    | Star        | `#E3E6EB` | Code blocks |
| Void    | Void         | `#08080C` | Text, deep space |

The full system — typography, spacing, components, light & dark mode
tokens — lives in [`DESIGN.md`](DESIGN.md), following the
[google-labs-code/design.md](https://github.com/google-labs-code/design.md)
specification. This means a coding agent can read it, understand the
visual language, and make design-accurate changes without hand-holding.

### How AI Manages This Site

1. **DESIGN.md is the source of truth.** Before touching any CSS, the AI
   reads the design system to understand colors, typography, layout rules,
   and component specs.
2. **Colors are referenced by planet name.** "Make this Neptune" maps
   directly to `#0796D7` in the design tokens.
3. **The agent validates against the system.** New colors can't be introduced
   without adding a planet token. Box-shadows are forbidden. Every change
   must pass WCAG AA contrast checks.
4. **Design discussions happen in design terms.** The human says "that
   blockquote needs more warmth" — the AI knows to pull in Mars.
5. **The system evolves in lockstep.** When the design changes,
   `DESIGN.md` gets updated first, then the CSS follows.

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

This site is hosted on **GitHub Pages** with a custom domain (varunchoraria.com).
Push to `main` and GitHub Actions handles the rest:

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

The entire visual identity flows from the CSS custom properties defined
at the top of `style.scss`. Light and dark themes are toggled via the
`data-theme` attribute on `<html>`, persisted in `localStorage`.
