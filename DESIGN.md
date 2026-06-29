---
layout: none
permalink: /design.md
version: "alpha"
name: STARLIGHT
description: A celestial design system for personal brands — bold, warm, and built for readability.

colors:
  hd189733b: "#0796D7"
  gj504b: "#8DC8EF"
  tres2b: "#024C7B"
  proxima-b: "#EDEAE5"
  kepler22b: "#DCD8D2"
  kepler186f: "#D2D3CC"
  cancri55e: "#FFE8DE"
  pegasi51b: "#E3E6EB"
  void: "#08080C"

typography:
  h1:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: 700
    lineHeight: 1.2
  h2:
    fontFamily: Inter
    fontSize: 1.3rem
    fontWeight: 700
    lineHeight: 1.25
  h3:
    fontFamily: Inter
    fontSize: 1.1rem
    fontWeight: 700
    lineHeight: 1.3
  h4:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 700
  body:
    fontFamily: Inter
    fontSize: 1rem
    lineHeight: 1.45
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    lineHeight: 1.5
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 700
    letterSpacing: 0.08em
  date:
    fontFamily: Inter
    fontSize: 0.82rem
    fontVariation: "tnum"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
    fontSize: 0.88em
  site-title:
    fontFamily: Inter
    fontSize: 1.35rem
    fontWeight: 700

rounded:
  sm: 3px
  md: 4px
  lg: 6px
  pill: 999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  section: 40px

components:
  tag-pill:
    backgroundColor: "{colors.hd189733b}"
    textColor: "{colors.void}"
    rounded: "{rounded.pill}"
    padding: "0.16rem 0.55rem"
    typography: "{typography.label}"
  tag-pill-hover:
    backgroundColor: "{colors.hd189733b}"
    textColor: "{colors.void}"
    rounded: "{rounded.pill}"
    padding: "0.16rem 0.55rem"
    typography: "{typography.label}"
    opacity: 0.85
  blockquote:
    backgroundColor: "{colors.cancri55e}"
    borderColor: "{colors.hd189733b}"
    borderWidth: 3px
    rounded: "{rounded.md}"
    padding: "0.75rem 1.25rem"
  code-inline:
    backgroundColor: "{colors.pegasi51b}"
    borderColor: "{colors.kepler186f}"
    rounded: "{rounded.sm}"
    padding: "0.15rem 0.35rem"
  code-block:
    backgroundColor: "{colors.pegasi51b}"
    borderColor: "{colors.kepler186f}"
    rounded: "{rounded.lg}"
    padding: "1rem 1.25rem"
  nav-link:
    textColor: "rgba(255, 255, 255, 0.85)"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.55rem"
  nav-link-hover:
    backgroundColor: "rgba(255, 255, 255, 0.15)"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.55rem"
  nav-link-active:
    backgroundColor: "linear-gradient({colors.hd189733b}, {colors.tres2b}, {colors.void})"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.55rem"
  header-gradient:
    backgroundColor: "linear-gradient({colors.hd189733b}, {colors.tres2b}, {colors.void})"
  site-title:
    textColor: "#FFFFFF"
    typography: "{typography.site-title}"
  site-title-hover:
    textColor: "#FFFFFF"
    typography: "{typography.site-title}"
    opacity: 0.8
---

## Overview

**Mission: Make personal brands shine like stars.**

STARLIGHT is the design system for varunchoraria.com. It marries the warmth of a personal blog with the boldness of bold blues against warm neutrals, with a peachy accent that adds humanity. The site is permanently light mode — clean, fast, no toggle overhead.

---

## Colors

Colors are named after exoplanets. Each maps to a specific role in the UI.

| Token | Exoplanet | Role | Hex |
|-------|-----------|------|-----|
| `hd189733b` | HD 189733b | Primary accent, links, interactive elements | `#0796D7` |
| `gj504b` | GJ 504b | Secondary accent (focus rings, highlights) | `#8DC8EF` |
| `tres2b` | TrES-2b | Deep navy, visited links | `#024C7B` |
| `proxima-b` | Proxima b | Page background — warm cream | `#EDEAE5` |
| `kepler22b` | Kepler-22b | Surface / card backgrounds | `#DCD8D2` |
| `kepler186f` | Kepler-186f | Borders, dividers | `#D2D3CC` |
| `cancri55e` | 55 Cancri e | Blockquote background — peachy glow | `#FFE8DE` |
| `pegasi51b` | 51 Pegasi b | Code block backgrounds | `#E3E6EB` |
| `void` | Void | Body text — deep space near-black | `#08080C` |

**Why exoplanets?** The palette orbits around HD 189733b (vibrant cyan-blue) as the gravitational center — a real exoplanet whose deep blue atmosphere inspired the brand. Proxima b warms like our nearest stellar neighbour. 55 Cancri e's glowing surface adds a subtle red-peach accent. Void replaces pure black with a near-black that feels deep without being harsh.

---

## CSS Custom Properties

```css
:root {
  --color-bg:           #edeae5;   /* proxima-b */
  --color-surface:      #dcd8d2;   /* kepler22b */
  --color-text:         #08080c;   /* void */
  --color-text-muted:   #606360;
  --color-link:         #005d9e;
  --color-link-visited: #024c7b;   /* tres2b */
  --color-border:       #d2d3cc;   /* kepler186f */
  --color-divider:      #d2d3cc;
  --color-border-dark:  #9ea09b;
  --color-code-bg:      #e3e6eb;   /* pegasi51b */
  --color-accent:       #0796d7;   /* hd189733b */
  --color-blockquote-bg:#ffe8de;   /* cancri55e */
  --gradient-start:     #0796d7;
  --gradient-mid:       #024c7b;
  --gradient-end:       #08080c;
}
```

---

## Typography

**Primary font: Inter** — clean, highly readable at all sizes. Served from Google Fonts with `opsz` axis for optical sizing.

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `h1` | 1.75rem | 700 | Page / entry titles |
| `h2` | 1.3rem | 700 | Section headings |
| `h3` | 1.1rem | 700 | Subsection headings |
| `h4` | 1rem | 700 | Minor headings |
| `body` | 1rem | 400 | Paragraph text |
| `body-sm` | 0.875rem | 400 | Sidebar, footer |
| `label` | 0.75rem | 700 + 0.08em spacing | Section labels, year markers |
| `date` | 0.82rem | 400 (tabular nums) | Post dates |
| `mono` | 0.88em | 400 | Code, pre blocks |
| `site-title` | 1.35rem | 700 | Site wordmark in header |

Body text line-height is 1.45. Prose uses 1.5 with justified alignment on desktop, left-aligned on mobile.

---

## Layout

**Page width:** 960px max, centered via auto margins.

**Gutter:** `clamp(1rem, 4vw, 1.375rem)` with safe-area-inset fallback for notched devices.

**Grid:** Two-column layout on desktop (primary + sidebar, 560px + 230px). Sidebar hides at 860px breakpoint. Single column below that.

**Section spacing:** 2.5rem between major sections, 1rem between paragraphs.

---

## Elevation & Depth

Depth comes from color contrast and the header gradient, not box-shadows. The site uses a flat aesthetic:

- **Header:** Full-width gradient strip — HD 189733b → TrES-2b → Void
- **Content:** Flush on background, separated by the header above and a border-top footer below
- **Active nav state:** Pill with gradient background matching the header

---

## Shapes

| Token | Value | Where |
|-------|-------|-------|
| `sm` | 3px | Inline code |
| `md` | 4px | Blockquote, table cells |
| `lg` | 6px | Pre / code blocks |
| `pill` | 999px | Tag pills, nav links, header action buttons |

---

## Components

### Tag Pill
Small inline chip for post categories. HD 189733b background, void text, pill-shaped. Hover: `tag-pill-hover` (0.85 opacity).

### Blockquote
Warm peach (55 Cancri e) background with a 3px HD 189733b left border. Rounded right corners.

### Code Inline / Code Block
Light grey (51 Pegasi b) background with Kepler-186f border. Inline code: 3px rounding. Blocks: 6px. Monospace font stack.

### Nav Link
White text at 85% opacity on the dark header. Hover state: `nav-link-hover` (white bg at 15% opacity, full white text). Active page: `nav-link-active` (gradient-filled pill matching the header).

### Header Action Buttons
GitHub, LinkedIn, and Meet with VC appear as pill buttons in the header. Same ghost style: white border at 22% opacity, white bg at 8%, white text.

### Site Title
"VC" in white, `site-title` typography token. Hover: `site-title-hover` (0.8 opacity).

---

## Do's and Don'ts

- **Do** use HD 189733b for all interactive elements — links, hover states, focus outlines
- **Do** use Proxima b as the default page background for a warm reading experience
- **Do** use 55 Cancri e for blockquotes — the peachy warmth contrasts with HD 189733b's cool blue
- **Don't** apply box-shadows — the design is intentionally flat
- **Don't** use pure black (`#000`) — use Void (`#08080C`) instead
- **Don't** add new colors outside the exoplanet palette without adding a CSS variable and documenting it here
- **Do** maintain WCAG AA contrast (4.5:1) for all text-on-background combinations
- **Do** refer to color tokens by exoplanet names in design discussions
