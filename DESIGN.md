# DESIGN.md

Machine-readable design system for varunchoraria.com. Every visual decision lives here. AI agents editing this site must comply; the pre-push QA gate checks against this file.

## Principles
- Typography-first, single column, quiet chrome. Strictly monochrome (zinc scale). The only hues on the site are in photographs.
- Content over chrome. No cards where a row will do. No decoration without function.
- Copy voice: first person, short sentences, direct. Strictly no emojis. Strictly no em-dashes (use commas, colons, or periods).
- Icons: official brand SVGs only (Simple Icons paths). Generic glyphs use 2px-stroke line icons (Lucide style). Never emoji-as-icon, never hand-drawn SVG art.

## Layout
- Page background: #ffffff
- Content column: max-width 640px, centered, padding 72px 24px 48px (top/side/bottom)
- Section spacing: 56px margin-bottom between sections
- Nav bar: first element on every page, INSIDE the 640px column (no negative-margin breakout). It is a React island, see Components, Nav for the full spec and build step. Starts with a circular profile-image home link (36×36), then a row of text links `home`, `about`, `work`, `notes`, `fun`, then a `more` button opening a shadcn `DropdownMenu` (click-based, closes on click-away/Escape) listing `side quests`, `uses this`, `rss`, `disclaimer`, `changelog`. Below 640px all links collapse into a single `menu` dropdown. A 36×36 theme toggle sits at the far right and persists an explicit `light` or `dark` value in localStorage. No slash prefixes. Nav links are not underlined (fill-hover / active state signals affordance). `_data/navigation.yml` is the single source of truth (injected into the mount element at Jekyll render time). `#nav-root` reserves `min-height: 48px` to prevent layout shift, with a `<noscript>` plain-link fallback.
- GitHub contributions card sits INSIDE the 640px column (margin 0 0 56px) — no breakout, no horizontal scroll at any viewport ≥320px. See Components → GitHub card.
- Sections use lowercase h2 headers ending in a faint period, e.g. `notes<span class="dot">.</span>`. One `.dot` class only (color: faint); no per-section accent classes.
- Mobile: content column breakpoints at 640px (timeline period stacks above title instead of beside it, row text no longer forces min-width) and 480px (hero/footer/section-head stack; the GitHub graph drops from 26 weeks to 16 so it still fits without scrolling). Touch targets stay >= 34px.

## Typography
- One typeface does all UI + body work: **Geist Sans**, self-hosted variable woff2 at `/assets/fonts/Geist-Variable.woff2` (`@font-face`, weights 100–900, `font-display: swap`; preloaded in head). CSP is `font-src 'self'` — never hotlink Google Fonts; it will be blocked. Stack: `"Geist", -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`.
- Mono font is **code only**: `ui-monospace, 'SF Mono', Menlo, monospace`. Used solely by `code, pre` and `.ascii-logo` (ASCII art). No UI element (dates, meta, labels, tabs, badges, footer, nav) uses mono — hierarchy is done with weight/size/color in Geist.
- Base: 15.5px, line-height 1.65 (1.85 for intro/prose paragraphs), color #3f3f46, antialiased. `text-wrap: pretty` on `p`.
- h1: 26px / 700 / letter-spacing -0.02em / #09090b. `text-wrap: balance` on h1, h2.
- h2 (section headers): 22px / 650 / letter-spacing -0.01em / #09090b
- Row titles: 15px / 500 (list rows) or 600 (timeline, quest names)
- Descriptions: 14px / 400 / #52525b
- Meta and dates: 12.5-13px sans / #71717a; where load-bearing as labels, letter-spacing 0.01em
- Links: ALL text hyperlinks are heading-black (#09090b), underlined, decoration color border-dark (#d4d4d8), underline-offset 3px; hover decoration #09090b. No `:visited` differentiation. Only component-styled elements (pills, icon buttons, list rows, primary buttons) override this.

## Colors
Strictly monochrome zinc. No hue anywhere except (reserved) semantic states if ever added later.

Text:
- link / accent: #09090b (monochrome — links and every interactive highlight)
- heading: #09090b (zinc-950)
- body: #3f3f46 (zinc-700)
- secondary: #52525b (zinc-600)
- faint: #71717a (zinc-500)

Surfaces:
- page (bg): #ffffff
- surface: #fafafa (zinc-50)
- fill: #f4f4f5 (zinc-100)
- border: #e4e4e7 (zinc-200)
- border-dark: #d4d4d8 (zinc-300)
- divider / hairline: #f4f4f5

Section periods, filter-tab active, timeline open dot: all use heading #09090b. No per-section accent hues.

Pill link (inline in prose; inline-flex, gap 5px, padding 2px 9px, radius 7px, weight 500, 13px icon). One neutral variant only:
- bg #f4f4f5, text #09090b, hover bg #e4e4e7
Punctuation must sit flush against pills (no whitespace between the closing tag and the comma/period).

Status badges (side quests): both public and private are neutral (text secondary #52525b, bg fill #f4f4f5); differentiate by label text only.

GitHub contribution graph intensity (monochrome): 0 → #f4f4f5, then #d4d4d8, #a1a1aa, #52525b, #09090b.

Dark mode is class-based on `<html data-theme="dark">`, initialized by `/assets/js/theme-init.js` before CSS. Default follows `prefers-color-scheme`; the toggle sets explicit light or dark. Explicit light uses `<html data-theme="light">` only to suppress the media fallback on dark systems; light tokens remain the `:root` defaults. Dark surfaces are zinc, never black: page #18181b, surface #1f1f23, fill #27272a, border #3f3f46, border-dark #52525b, divider #27272a. Dark text: heading/link/accent #fafafa, body #d4d4d8, secondary #a1a1aa, faint #71717a. Keep the explicit `:root[data-theme="dark"]` block and the `@media (prefers-color-scheme: dark) :root:not([data-theme])` fallback in sync.

Dark GitHub contribution graph intensity: 0 → #27272a, then #3f3f46, #71717a, #a1a1aa, #d4d4d8. The graph detects both explicit `data-theme="dark"` and system-dark fallback, and re-renders on the `themechange` event.

## Radius
- pills: 7px
- buttons, inputs, list rows, icon buttons: 8px
- large rows: 10px
- cards: 12px
- filter tabs and badges: 6px
- avatar: 50%

## Components
- Icon button: 34x34, 1px #e4e4e7 border, radius 8px, icon #3f3f46; hover border and icon #09090b
- Filter tabs: shadcn-style Tabs in the `_nav/` React island, mounted on `[data-filters-root]`. `TabsList` is one horizontal row, fill background, pill radius, no wrapping, horizontal scroll with edge fades under narrow widths. Active trigger uses page background, border, and heading text. Filtering remains client-side and syncs tag state to the URL hash; no-JS fallback is plain tag archive links.
- Pagination: same island as filters. Rendered only when the filtered listing exceeds 20 rows. State lives in `?page=N`, tag changes reset to page 1, and mobile under 480px shows Previous, current/total, Next only. No-JS renders the full list.
- Tag badge: same visual system as filter tab, sans 12px, min-height 30px, padding 4px 10px, radius 6px, 1px border, white background, secondary text.
- List row: padding 11px 12px with negative side margin so hover bg extends past text; hover bg #fafafa
- GitHub card (contributions): `<section aria-label="GitHub contributions">`, padding 18px, border #e4e4e7, radius 12px, in-column. Self-rendered by `assets/js/gh-graph.js` (not the old ghchart image). Data from `https://github-contributions-api.jogruber.de/v4/<user>?y=last` (in CSP `connect-src`; ghchart removed from `img-src`), cached 6h in localStorage. Three rows: (1) header, `@user` faint left, `“N contributions in the last year”` heading-500 right, N from the API with thousands separator; (2) inline SVG grid, last 26 weeks (16 under 480px), cell 10px / gap 3px / rx 2, theme-aware monochrome intensity by level 0–4; (3) footer, `Less ▢▢▢▢▢ More` swatch legend left, `github ↗` + `book a call ↗` text links right. Card is `hidden` in markup and only revealed on successful render, so it degrades to nothing without JS or on error (no broken frame). Re-render on `themechange`.
- Timeline: 2px #f4f4f5 left rule; 12px dots (open: #09090b; closed: white with 2px #d4d4d8 border); period column 96px (stacks above title under 640px); accordion, one item open, chevron rotates 180deg in 0.2s
- Nav (React island): source in `_nav/` (Vite + React + Tailwind v4), built to `assets/js/nav.js` (IIFE, React bundled, no externals) + `assets/css/nav.css`. GitHub Pages cannot run npm, so the built artifacts are committed and are the source of truth for the live site. Rebuild after any `_nav/` change: `cd _nav && npm install && npm run build`. `_nav/` is excluded in `_config.yml`. The `more`/`menu` dropdown is a shadcn `DropdownMenu` (Radix, click-based — chosen over `NavigationMenu` because that primitive is hover-driven and self-closes on pointer-out, which reads as broken on click/touch). Content renders WITHOUT a Portal so it stays inside `#nav-root` (scoped styles + CSP apply). Tailwind imports theme + utilities layers only (NO preflight — nav.css loads globally and a base reset would clobber the page; list chrome is reset manually inside the island). Monochrome tokens mapped into the Tailwind theme. Trigger/link: height 36px, radius 8px, text 14px/500, transparent background by default, color secondary → hover fill bg + heading text; active item fill bg + 600 weight. Dropdown: simple drop-in animation (respects prefers-reduced-motion), 8px offset. Keyboard: Tab reaches every link; the dropdown opens on Enter/Space, closes on Escape (Radix default — do not break).
- Nav avatar: 36×36 circular home link; `img` is `w-full h-full object-cover rounded-full` inside the box (no inner size mismatch — fixes prior sub-pixel misalignment) with a 1px border. Uses `/assets/images/favicon.png`, which also serves as the PNG favicon and apple touch icon.
- Hero keyword pills: inline `.pill.hero-pill` links/spans with 14px Lucide-style or brand icons, neutral fill, heading text, and 44px effective touch target via hit-area pseudo-element. `notebook` is the only idle animation, a 4s underline draw. Other keyword icons animate only on hover/focus/active. `prefers-reduced-motion: reduce` disables transforms and idle animation.
- Side-quest tool logos: `_data/tools.yml` maps tool keys to names, URLs, and logo names. `_includes/logo.html` renders inline SVG from `_includes/logos/` with `currentColor`; matching files are also self-hosted under `/assets/logos/`. Missing logos render a 16px letter fallback. Logo use is nominative and does not imply endorsement.
- Ask-AI band: `_includes/ask-ai.html`, a pre-footer CTA rendered site-wide (in `_layouts/default.html`, immediately above the footer). Copy left (`.ask-ai-headline` 17px/650, `.ask-ai-sub` secondary), a 2×2 button grid right. Four buttons: Ask ChatGPT, Ask Claude, Ask Perplexity (each a `?q=` deep link to the respective assistant, opens in new tab), and Meet with VC (cal.com booking). Brand marks are official Simple Icons paths rendered in `currentColor` — strictly monochrome, no brand hues; the only colour is the profile photo on Meet with VC. Buttons are 44px min-height, neutral surface fill, border on hover. Mobile: copy stacks above the grid at ≤640px; grid collapses to a single column at ≤400px. Buttons wrap text rather than overflow (min-width 0).
- Footer version line: sans (faint), `v{{ changelog entry count }} · updated {{ latest changelog date }}`, links to /changelog/. Computed live from `changelog.md`'s `### <date>` headings at build time — never hardcoded.

## Motion
- Page load: main fades up once (opacity 0 to 1, translateY 8px to 0, 0.5s ease)
- Hover/focus transitions: 0.15s; accordion and dots: 0.2s; avatar: transform 0.25s (hover rotate(-8deg) scale(1.08))
- Smooth scroll for anchors. No other animation. No scroll-jacking, no parallax.

## Content Rules
- Dates: exact, format "Jul 2, 2026" (%b %-d, %Y). Ranges use hyphens: "2019 - 2024".
- Section headers lowercase: notes. work. side quests. ai.
- Footer: "© <year> Varun Choraria · built by AI, supervised by a human" + live version/updated line (see Components) + "disclaimer" and "source" links (heading-black, per link rules).
- Every page includes the nav bar. The homepage includes an "ai." section describing how AI runs the site (Claude Code, pre-push QA gate, DESIGN.md, MCP server).
- External links open in new tab. In-page anchors do not.
- No MCP nudge toast, no "connect"/subscribe section. Both were removed (see changelog 7 Jul 2026) rather than left half-built.

## Parked
- **Email subscribe.** The plan is a Resend-API agent that emails subscribers the latest post. Not built: this repo is public, and subscriber emails can't be stored in it without leaking PII. Needs a private store (e.g. a Resend audience, or a database outside the repo) before the UI comes back.

## Accessibility
- All interactive elements are real <a>/<button> elements, keyboard reachable.
- Touch targets minimum 34px on desktop chrome, 44px on mobile.
- Contrast: body text >= 4.5:1 (all listed text colors on white pass).
- Images require alt text. Icon-only links require aria-label.
