# VC's Notes design system

Machine-readable rules for `varunchoraria.com`. Every page should feel like a serious personal publication from the early web: direct, fast, readable, and useful. The structural reference is Tom Preston-Werner's personal site. Copy its restraint and information hierarchy, not its exact branding.

## Product intent

- Writing is the product. Homepage shows every essay, newest first, grouped by year.
- Site should communicate that VC means business: precise copy, exact dates, visible work, no decorative interface chrome.
- Personality comes from familiar web colors, dense chronology, direct writing, and the green GitHub graph.
- Function beats novelty. Use native HTML before JavaScript.

## Hard constraints

- No React, Tailwind, shadcn, component framework, web font, icon library, client-side router, theme system, or build-time JavaScript.
- No cards, pills, badges, tab bars, dropdown navigation, gradients, shadows, glass effects, decorative animation, fake browser chrome, CRT effects, or nostalgia cosplay.
- No dark-mode toggle. One light reading theme.
- No JavaScript on ordinary pages. Homepage may load the dependency-free GitHub graph script. A utility page may use a tiny script only when native HTML cannot provide the function.
- Never hide core content behind JavaScript, hover, filters, accordions, pagination, or animation.
- All navigation links remain visible on mobile. Let them wrap; never replace them with a hamburger.

## Page shell

- White page: `#ffffff`.
- Main text: `#111111`.
- Secondary text and dates: `#666666`; rules: `#dddddd`.
- Content width: `46rem`, centered.
- Desktop padding: `3rem 1.25rem 2rem`.
- Mobile padding: `1.5rem 1.25rem 2rem`.
- Base typography: `16px / 1.55` using `"Helvetica Neue", Helvetica, Arial, sans-serif`.
- Dates and code: `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace`.
- No downloaded fonts. No font preload.

## Color

- Normal and visited links: browser blue `#0000ee`, underlined.
- `VC` masthead mark: electric blue `#0057ff`.
- GitHub graph: official contribution colors `#ebedf0`, `#9be9a8`, `#40c463`, `#30a14e`, `#216e39`.
- Text never uses the GitHub palette. Green belongs to GitHub activity only.
- Selection highlight: pale yellow `#fff2a8`.

## Header

- Pure HTML in `_includes/nav.html`; data comes from `_data/navigation.yml`.
- First link is electric-blue `VC`, returning home.
- Visible path links follow: `/about`, `/work`, `/blog`, `/side-quests`, `/fun`, `/uses`.
- `github ↗` is the final external link.
- Header links are muted gray without underlines until hover, focus, or active state. Icon-only social links also omit underlines because they contain no visible text.
- A `1px #dddddd` rule sits below the navigation.
- No home pill, active background, icon button, dropdown, or theme toggle.
- Desktop: single line where space permits.
- Mobile: `VC` occupies the first line; path links wrap below with at least `44px` touch height.

## Homepage

Order is fixed:

1. Header.
2. Short introduction with the prior circular portrait above the text: name, location, operating focus, writing topics.
3. Internal MCP page link, calendar link, and compact links to LinkedIn, X, GitHub, and Letterboxd.
4. GitHub contribution graph in official green.
5. Linked `Essays` heading.
6. Every essay, newest first, grouped by year.
7. Linked `Side quests` heading and public GitHub repository list.
8. Footer.

The introduction is not a marketing hero. It uses the existing `168x168` `hero-photo.jpg`, cropped into a circle above the text on every viewport, never beside it. No oversized CTA, animated keyword, career timeline, side-quest cards, or AI CTA band. Social profiles are four icon-only links with accessible names, no boxes, visible text, or external-arrow marks.

Homepage sections are separated by light `1px #dddddd` horizontal rules with generous whitespace. Rules clarify structure; they never become boxed sections.

## Side quests

- `_data/quests.yml` is the single source for both surfaces.
- Homepage preview shows only entries marked `featured: true` with GitHub links.
- Each row contains a small inline GitHub mark, linked repository name, and one short description.
- Repository links open GitHub directly; the section heading links to `/side-quests/`.
- Plain rows with light rules only. No cards, badges, language bars, star counts, or API request.
- `/side-quests/` renders every entry, grouped as Personal, Experiments, and Work.
- Directory rows contain name, state, and short description. Link and icon appear only when a destination exists.
- No disclosure widgets, ASCII logos, feature inventories, or hand-maintained duplicate project markup.

## GitHub activity

- Plain section, never a card.
- `GitHub` heading links to `github.com/vcxcvii`; contribution count sits opposite it on wide screens.
- `assets/js/gh-graph.js` fetches the last year from `github-contributions-api.jogruber.de`, caches for six hours, and draws inline SVG.
- Desktop shows up to the full year. Narrow screens show the most recent weeks that fit without horizontal scrolling.
- Month labels remain visible when they fit.
- Failed requests leave a normal text link. Page never shows a broken or empty framed widget.
- Resize redraw is debounced. Script has no dependencies.

## Essay archive

- Shared markup lives in `_includes/essay-list.html`.
- Group heading: four-digit year.
- Each row: `DD Mon » linked title`.
- Date uses monospace and muted gray; title uses blue, underlined link.
- No excerpts, filters, tag pills, search, cards, pagination, or `View all` on homepage.
- Mobile rows use at least `44px` height and a narrower date column.

## Tags

- `/tags/` is the only complete alphabetical tag list.
- The shared footer contains one plain `tags` link to `/tags/`; it never embeds the list.
- Each entry is a plain blue link plus a muted essay count.
- Three columns on desktop, two on tablet, one below `30rem`.
- Tag archive pages retain the same year-grouped essay list.

## Essay pages

- Header remains unchanged.
- Page begins with title, exact published date, optional updated date, then plain tag links.
- Prose width is no wider than `42rem`.
- Images use natural color and scale down to viewport width.
- Code blocks and tables may scroll horizontally; the page itself must never scroll horizontally.
- After prose: `Related essays`, up to three dated links selected only through existing tag relationships.

## Supporting pages

- `/about`, `/work`, `/blog`, `/fun`, `/uses-this`, `/side-quests`, `/tags`, `/feed`, and `/mcp` use the same page shell and typography.
- `/about` contains no portrait.
- Long pages rely on headings, rules, lists, and links. Do not introduce a separate visual system.
- Side quests use grouped plain rows with simple horizontal rules, not cards or disclosure widgets.
- MCP endpoint is presented as selectable code. Avoid custom copy UI when selecting and copying text already works.

## Footer

- Thin top rule, small gray text.
- First row: `rss · mcp page · llms.txt · tags · disclaimer · changelog · design.md · source`.
- `design.md` links to the readable canonical file in the public GitHub repository.
- Second row: plain text links for ChatGPT, Claude, and Perplexity.
- Final row: copyright and `Built with AI, supervised by a human.`
- No logos, buttons, avatars, grids, or callout background.

## Responsive behavior

- Primary breakpoint: `44rem`; compact breakpoint: `30rem`.
- Test at `320`, `375`, `390`, `430`, `768`, and `1440` CSS pixels.
- No horizontal page overflow at `320px`.
- Navigation and archive links must remain readable without zoom.
- Tap targets: `44px` on mobile navigation and essay rows.
- GitHub graph fits available width; never force horizontal scrolling.
- Two-column utility content collapses to one column below `30rem`.

## Accessibility

- Semantic landmarks: one `<main>`, primary `<nav>`, `<article>` for content, `<section>` with headings, `<footer>`.
- First focusable element is a skip link targeting `#page-content`.
- One `<h1>` per page. Heading levels never skip for visual reasons.
- All dates use `<time datetime="…">`.
- Keyboard focus uses a visible `2px` blue outline.
- External links include `rel="noopener noreferrer"` when opening a new tab.
- Images require useful alt text; decorative images use empty alt text.
- Color is never the only carrier of meaning.
- Essential information never depends on hover.

## Performance budgets

- Inline compiled CSS target: under `12KB` compressed.
- Homepage first-party JavaScript target: under `8KB` uncompressed; ordinary pages: `0KB` first-party application JavaScript.
- No render-blocking external stylesheet, font, or script.
- No layout shift from navigation, fonts, or GitHub graph.
- Keep homepage DOM small despite full archive.
- Images below the fold use `loading="lazy"` and explicit dimensions.
- Analytics may load after `window.load` during idle time. Analytics must never block rendering.

## Repository architecture

- Jekyll renders all content.
- `_sass/main.scss` is the only design stylesheet and is inlined by `_includes/head.html`.
- `_includes/nav.html`, `_includes/essay-list.html`, and `_includes/footer.html` are the shared interface primitives.
- `assets/js/gh-graph.js` is the only homepage application script.
- `_includes/logos/` is the only logo source. Do not duplicate those files under `assets/`.
- Analytics and Clarity load from the small deferred inline loader in `_includes/head.html`; standalone duplicate loader files are forbidden.
- Footer exposes the canonical `DESIGN.md` source on GitHub without adding it to the built site payload.
- Do not restore `_nav/`, `assets/js/nav.js`, `assets/css/nav.css`, `assets/js/redesign.js`, or `_includes/theme-init.js`.

## Validation

- `_scripts/validate-posts.rb` validates frontmatter, tag pages, and inline CSP hashes.
- `_scripts/qa.rb` validates content, design invariants, dead-asset exclusions, and performance budgets.
- `node --check assets/js/gh-graph.js` is the dependency-free JavaScript lint gate.
- Production build must pass after validation. GitHub Actions runs all gates before deployment.

## Content rules

- First person. Direct sentences. Specific claims.
- No emojis. No em dashes; use commas, colons, parentheses, or periods.
- Display dates as `DD Mon` inside yearly archives and `Mon D, YYYY` on essay pages.
- External destinations use `↗` only where the external nature matters, primarily navigation and source links.
