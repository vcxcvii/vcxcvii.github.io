---
name: STARLIGHT
description: A celestial design system for personal brands — bold, warm, and built for readability across light and dark space.

colors:
  neptune: "#0796D7"
  uranus: "#8DC8EF"
  midnight: "#024C7B"
  venus: "#EDEAE5"
  terra: "#DCD8D2"
  mercury: "#D2D3CC"
  mars: "#FFE8DE"
  star: "#E3E6EB"
  void: "#08080C"
  void-dark: "#0F1A24"
  neptune-dark: "#0796D7"
  uranus-dark: "#8DC8EF"

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
    fontVariant: tabular-nums
  mono:
    fontFamily: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace
    fontSize: 0.88em

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
    backgroundColor: "{colors.neptune}"
    textColor: "{colors.neptune-dark-text}"
    rounded: "{rounded.pill}"
    padding: "0.16rem 0.55rem"
    fontSize: 0.75rem
    hoverOpacity: 0.85
  tag-pill-dark:
    backgroundColor: "{colors.neptune}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "0.16rem 0.55rem"
    fontSize: 0.75rem
  blockquote:
    backgroundColor: "{colors.mars}"
    borderColor: "{colors.neptune}"
    borderWidth: 3px
    rounded: "{rounded.md}"
    padding: "0.75rem 1.25rem"
  blockquote-dark:
    backgroundColor: "rgba(2, 76, 123, 0.25)"
    borderColor: "{colors.uranus-dark}"
    borderWidth: 3px
    padding: "0.75rem 1.25rem"
  code-inline:
    backgroundColor: "{colors.star}"
    borderColor: "{colors.mercury}"
    rounded: "{rounded.sm}"
    padding: "0.15rem 0.35rem"
  code-block:
    backgroundColor: "{colors.star}"
    borderColor: "{colors.mercury}"
    rounded: "{rounded.lg}"
    padding: "1rem 1.25rem"
  nav-link:
    textColor: "rgba(255, 255, 255, 0.85)"
    hoverBackground: "rgba(255, 255, 255, 0.15)"
    hoverTextColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.55rem"
  nav-link-active:
    backgroundGradientStart: "{colors.neptune}"
    backgroundGradientMid: "{colors.midnight}"
    backgroundGradientEnd: "{colors.void}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.55rem"
  nav-link-active-dark:
    backgroundGradientStart: "{colors.neptune}"
    backgroundGradientMid: "{colors.midnight}"
    backgroundGradientEnd: "{colors.void-dark}"
    textColor: "#FFFFFF"
  header-gradient:
    gradientStart: "{colors.neptune}"
    gradientMid: "{colors.midnight}"
    gradientEnd: "{colors.void}"
  header-gradient-dark:
    gradientStart: "{colors.neptune}"
    gradientMid: "{colors.midnight}"
    gradientEnd: "{colors.void-dark}"
  theme-toggle:
    backgroundColor: "rgba(255, 255, 255, 0.08)"
    borderColor: "rgba(255, 255, 255, 0.22)"
    rounded: "{rounded.pill}"
    textColor: "#FFFFFF"
    size: "1.9rem"
  site-title:
    textColor: "#FFFFFF"
    fontWeight: 700
    fontSize: 1.35rem
    hoverOpacity: 0.8
---

## Overview

**Mission: Make personal brands shine like stars.**

STARLIGHT is a design system for Varun Choraria's personal site (varunchoraria.com). It marries the warmth of a personal blog with the boldness of the Orion Athletics brand identity — high-contrast blues against warm neutrals, with a peachy accent that adds humanity.

The system supports light and dark modes via CSS custom properties on `html[data-theme="dark"]`. Light is the default; dark is opt-in via localStorage.

---

## Colors

Colors are named after celestial bodies. Each maps to a specific role in the UI.

### Light Mode

| Token | Planet | Role | Hex |
|-------|--------|------|-----|
| `neptune` | Neptune | Primary accent, links, interactive elements | `#0796D7` |
| `uranus` | Uranus | Secondary accent (dark mode links) | `#8DC8EF` |
| `midnight` | Midnight / deep space | Visited links, header gradient mid-point | `#024C7B` |
| `venus` | Venus | Page background — warm cream, softer than white | `#EDEAE5` |
| `terra` | Terra (Earth) | Surface / card backgrounds | `#DCD8D2` |
| `mercury` | Mercury | Borders, dividers | `#D2D3CC` |
| `mars` | Mars | Blockquote background — warm peach highlight | `#FFE8DE` |
| `star` | Star | Code block backgrounds | `#E3E6EB` |
| `void` | Void / outer space | Body text, dark mode foundation | `#08080C` |

**Why planets?** The palette orbits around Neptune (a vibrant cyan-blue) as the gravitational center. Venus provides warmth like its cloudy atmosphere. Mars adds a subtle red-peach accent for highlights. Void replaces pure black with a near-black that feels deep without being harsh.

### Dark Mode

Dark mode inverts the void: the background is `void-dark` (`#0F1A24`) — a dark navy that carries more depth than pure black. Text becomes `venus` (warm cream). Links switch to `uranus` (Sky Blue) for readability against the dark. Blockquotes use a navy-tinted overlay instead of Mars.

| Token | Role | Light | Dark |
|-------|------|-------|------|
| `--color-bg` | Background | Venus `#EDEAE5` | Void-dark `#0F1A24` |
| `--color-surface` | Surface | Terra `#DCD8D2` | `#16232E` |
| `--color-text` | Body text | Void `#08080C` | `#E0E7ED` |
| `--color-link` | Links | Neptune `#0796D7` | Uranus `#8DC8EF` |
| `--color-accent` | Accents | Neptune `#0796D7` | Uranus `#8DC8EF` |
| `--color-blockquote-bg` | Blockquote bg | Mars `#FFE8DE` | `rgba(2, 76, 123, 0.25)` |

---

## Typography

**Primary font: Inter** — clean, highly readable at all sizes, with excellent hinting for screens. Served from Google Fonts with `opsz` axis for optical sizing.

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `h1` | 1.75rem (29.75px) | 700 | Page / entry titles |
| `h2` | 1.3rem (22.1px) | 700 | Section headings |
| `h3` | 1.1rem (18.7px) | 700 | Subsection headings |
| `h4` | 1rem (17px) | 700 | Minor headings |
| `body` | 1rem (17px) | 400 | Paragraph text |
| `body-sm` | 0.875rem | 400 | Sidebar, footer |
| `label` | 0.75rem | 700 + 0.08em spacing | Section labels, year markers |
| `date` | 0.82rem | 400 (tabular nums) | Post dates, archive dates |
| `mono` | 0.88em | 400 | Code, pre blocks |

Body text line-height is 1.45. Prose (entries) uses 1.5 with justified alignment on desktop, left-aligned on mobile.

---

## Layout

**Page width:** 960px max, centered via auto margins.

**Gutter:** `clamp(1rem, 4vw, 1.375rem)` with safe-area-inset fallback for notched devices.

**Grid:** Two-column layout on desktop (primary + sidebar, 560px + 230px). Sidebar hides at 860px breakpoint. Single column below that.

**Sections spacing:**
- Between major sections: 2.5rem (40px)
- Between paragraphs: 1rem (17px)
- Between list items: 0.3rem (5px)

---

## Elevation & Depth

Depth comes from color contrast and the header gradient, not from box-shadows. The site uses a flat aesthetic with a single elevation layer:

- **Header:** Full-width gradient strip — Neptune → Midnight → Void
- **Content:** Flush on background, separated by the header above and a border-top footer below
- **Active nav state:** Pill with gradient background (same as header) on light mode

---

## Shapes

| Token | Value | Where |
|-------|-------|-------|
| `sm` | 3px | Inline code, border corners |
| `md` | 4px | Blockquote, table cells |
| `lg` | 6px | Pre blocks, code blocks |
| `pill` | 999px | Tag pills, nav links, theme toggle |

Blockquote has an asymmetrical shape: rounded right corners (`4px`) with a sharp left edge where the 3px accent border sits.

---

## Components

### Tag Pill
Small inline chip identifying post categories. Neptune background, white text, pill-shaped. On hover: 0.85 opacity.

### Blockquote
Warm peach (Mars) background with a 3px Neptune left border. Rounded right corners. Used for emphasis and pull quotes. Dark mode switches to a navy-tinted overlay with Uranus border.

### Code Inline / Code Block
Light grey (Star) background with Mercury border. Inline code gets 3px rounding; blocks get 6px. Monospace font stack with `SFMono-Regular` as preferred.

### Nav Link
White text at 85% opacity on the dark header. On hover: white bg at 15% opacity with full white text. Active page: gradient-filled pill matching the header.

### Theme Toggle
Round button in the header. Sun/moon icon swap. Wraps in a row variant for the mobile menu.

### Site Title
"VC's Notes" in white, 1.35rem, bold. Includes a small terminal-mark SVG icon. On hover: fades to 80% opacity.

---

## Do's and Don'ts

- **Do** use Neptune for all interactive elements — links, hover states, focus outlines
- **Do** use Venus as the default page background for a warm reading experience
- **Do** use Mars for blockquotes — the peachy warmth contrasts nicely with Neptune's cool blue
- **Don't** apply box-shadows — the design is intentionally flat
- **Don't** use pure black (`#000`) — use Void (`#08080C`) or Void-dark (`#0F1A24`) instead
- **Don't** add new colors outside the planet palette without adding a corresponding CSS variable and documenting it here
- **Do** maintain WCAG AA contrast (4.5:1) for all text-on-background combinations
- **Do** refer to color tokens by their planet names in design discussions ("make this Neptune" not "make this #0796D7")
