# DESIGN.md

Machine-readable design system for varunchoraria.com. Every visual decision lives here. AI agents editing this site must comply; the pre-push QA gate checks against this file.

## Principles
- Typography-first, single column, quiet monochrome base with small colored accents.
- Content over chrome. No cards where a row will do. No decoration without function.
- Copy voice: first person, short sentences, direct. Strictly no emojis. Strictly no em-dashes (use commas, colons, or periods).
- Icons: official brand SVGs only (Simple Icons paths). Generic glyphs use 2px-stroke line icons (Lucide style). Never emoji-as-icon, never hand-drawn SVG art.

## Layout
- Page background: #ffffff
- Content column: max-width 640px, centered, padding 72px 24px 48px (top/side/bottom)
- Section spacing: 56px margin-bottom between sections
- Nav bar: first element on every page; starts with a circular profile-image home link, followed by compact text links in the style of shadcn `NavigationMenu`: `home`, `about`, `work`, `notes`, `fun`, then a `more` trigger for secondary links. `more` contains `side quests`, `uses this`, `disclaimer`, and `changelog`. No slash prefixes. Desktop uses a native `<details>` dropdown for `more`; mobile uses one native `menu` dropdown with all links. `_data/navigation.yml` remains the single source of truth. No React island or nav bundle in the Jekyll build.
- GitHub contributions card breaks out of the column: margin 0 -56px (desktop). Chart uses link-blue and the card scrolls horizontally when the graph is wider than the viewport.
- Sections use lowercase h2 headers ending in a colored period, e.g. `notes<span class="dot dot-notes">.</span>`
- Mobile: content column breakpoints at 640px (timeline period stacks above title instead of beside it, row text no longer forces min-width) and 480px (hero/footer/section-head stack, GitHub card becomes an inset 16px-from-viewport card with horizontal graph scrolling). Touch targets stay >= 34px.

## Typography
- UI/body font: system stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif (no webfonts)
- Mono font: system mono stack: ui-monospace, 'SF Mono', Menlo, monospace (dates, meta lines, labels, nav, footer)
- Base: 15.5px, line-height 1.65 (1.85 for intro/prose paragraphs), color #3f3f46, antialiased
- h1: 26px / 700 / letter-spacing -0.02em / #09090b
- h2 (section headers): 17px / 600 / letter-spacing -0.01em / #09090b
- Row titles: 15px / 500 (list rows) or 600 (timeline, quest names)
- Descriptions: 14px / 400 / #52525b
- Meta and dates: 12.5-13px mono / #71717a
- Links: ALL text hyperlinks are link-blue #0000ff, underlined, decoration color rgba(0,0,255,0.3), underline-offset 3px; hover decoration #0000ff. Only component-styled elements (pills, icon buttons, list rows, primary buttons) override this.

## Colors
Text:
- link: #0000ff (all text hyperlinks)
- heading: #09090b
- body: #3f3f46
- secondary: #3f3f46
- muted: #52525b
- faint: #71717a

Surfaces:
- page: #ffffff
- hover row: #fafafa
- subtle fill: #f4f4f5
- border: #e4e4e7
- hairline: #f4f4f5

Accents (section periods and interactive highlights):
- accent-default (notes, filters, timeline): #2563eb
- work: #16a34a
- side quests: #7c3aed
- ai: #db2777

Pill link variants (inline in prose; inline-flex, gap 5px, padding 2px 9px, radius 7px, weight 500, 13px icon):
- notes: bg #eff6ff, text #1d4ed8, hover bg #dbeafe
- mcp: bg #faf5ff, text #7e22ce, hover bg #f3e8ff
- calendar: bg #f0fdf4, text #15803d, hover bg #dcfce7
- neutral: bg #f4f4f5, text #09090b, hover bg #e4e4e7
Punctuation must sit flush against pills (no whitespace between the closing tag and the comma/period).

## Radius
- pills: 7px
- buttons, inputs, list rows, icon buttons: 8px
- large rows: 10px
- cards: 12px
- filter tabs and badges: 6px
- avatar: 50%

## Components
- Icon button: 34x34, 1px #e4e4e7 border, radius 8px, icon #3f3f46; hover border and icon #09090b
- Filter tab: mono 12px, min-height 30px, padding 4px 10px, radius 6px, 1px border; active bg accent + white text; inactive white + secondary text; hover subtle fill + darker border.
- Tag badge: same visual system as filter tab, mono 12px, min-height 30px, padding 4px 10px, radius 6px, 1px border, white background, secondary text.
- List row: padding 11px 12px with negative side margin so hover bg extends past text; hover bg #fafafa
- Card (contributions): padding 18px, border #e4e4e7, radius 12px; hover border #a1a1aa
- Timeline: 2px #f4f4f5 left rule; 12px dots (open: accent; closed: white with 2px #d4d4d8 border); period column 96px mono (stacks above title under 640px); accordion, one item open, chevron rotates 180deg in 0.2s
- Nav: see Layout section above (native Liquid links, desktop `more` dropdown, mobile `menu` dropdown)
- Nav avatar: 38x38 circular home link using `/assets/images/profile-home.png`; image also serves as the PNG favicon and apple touch icon.
- Footer version line: mono, `v{{ changelog entry count }} · updated {{ latest changelog date }}`, links to /changelog/. Computed live from `changelog.md`'s `### <date>` headings at build time — never hardcoded.

## Motion
- Page load: main fades up once (opacity 0 to 1, translateY 8px to 0, 0.5s ease)
- Hover/focus transitions: 0.15s; accordion and dots: 0.2s; avatar: transform 0.25s (hover rotate(-8deg) scale(1.08))
- Smooth scroll for anchors. No other animation. No scroll-jacking, no parallax.

## Content Rules
- Dates: exact, format "Jul 2, 2026" (%b %-d, %Y). Ranges use hyphens: "2019 - 2024".
- Section headers lowercase: notes. work. side quests. ai.
- Footer: mono, "© <year> Varun Choraria · built by AI, supervised by a human" + live version/updated line (see Components) + "disclaimer" and "source" links (link-blue).
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
