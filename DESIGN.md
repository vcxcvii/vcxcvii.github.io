# VC's Notes design system

Machine-readable rules for `varunchoraria.com`. Every page should feel like a serious personal publication from the early web: direct, fast, readable, and useful. The structural reference is Tom Preston-Werner's personal site. Copy its restraint and information hierarchy, not its exact branding.

## Product intent

- Writing is the product. Homepage shows every essay, newest first, grouped by year.
- Site should communicate that VC means business: precise copy, exact dates, visible work, no decorative interface chrome.
- Personality comes from familiar web colors, dense chronology, direct writing, and the green GitHub graph.
- Function beats novelty. Use native HTML before JavaScript.

## Hard constraints

- No React, Tailwind, shadcn, component framework, web font, icon library, client-side router, theme framework, or build-time JavaScript.
- No cards, pills, badges, tab bars, gradients, shadows, glass effects, decorative animation, fake browser chrome, CRT effects, or nostalgia cosplay. The selected theme swatch marks itself by thickening its own border, because `_scripts/qa.rb` treats `box-shadow` as a forbidden pattern and an outline there would be indistinguishable from the focus ring.
- Three grounds: light, beige, dark. With nothing stored, `prefers-color-scheme` decides between light and dark and no attribute is written, so a reader who never touches the swatches gets exactly the behaviour the site had with two palettes. The reader already told their operating system which one they want, and the default still answers that without asking.
- The swatches are the only way to override it. A stored choice and a pre-paint inline script are both accepted now; that is the cost of letting the reader pick beige, which no operating system can tell us they want.
- Ordinary pages load `assets/js/theme.js` and nothing else of their own. Homepage adds the dependency-free GitHub graph script. A utility page may use a tiny script only when native HTML cannot provide the function.
- Never hide core content behind JavaScript, hover, filters, accordions, pagination, or animation. The changelog month browser is progressive enhancement: without JavaScript, every entry remains visible.
- Desktop navigation links remain visible. Mobile uses a native CSS hamburger toggle; links remain normal HTML and require no JavaScript.

## Page shell

- White page: `#ffffff`; dark page: `#16181a`.
- Main text: `#111111`; dark: `#e4e4e4`.
- Secondary text and dates: `#666666`, dark `#8f9398`; rules: `#dddddd`, dark `#33383d`.
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

## Dark palette

Both palettes live in `_sass/main.scss`: light in `:root`, dark in a single `@media screen and (prefers-color-scheme: dark)` block at the end of the file. Only tokens change between them, so every rule in between is written once. Four rules govern how the dark values were chosen, and any future change to them should hold all four.

- **Derive from the ramp, do not invent.** Dark link `#669aff` is step two of the tonal ramp generated from `#0057ff`, hue 220, the same hue as the mark. Light reads the dark end of that ramp, dark reads the light end. A blue that merely looks right is how a site ends up with two brands.
- **Preserve the running order, not the numbers.** Contrast against the page must fall in the same sequence in both modes: text, blockquote, link, dates, mark. Light is 18.9, 9.7, 9.4, 5.7, 5.5. Dark is 14.0, 8.6, 6.5, 5.8, 5.6. Dates were tuned to `#8f9398` specifically so links stay louder than dates, as they are in light.
- **Elevation inverts.** In light the code surface `#f7f7f7` is darker than the page. In dark it is lighter: `#212427` on `#16181a`. A code block that is darker than the page reads as a hole.
- **The ground is not grey.** `#16181a` sits ten degrees off the brand hue at 8% saturation, and the surface, rules, and secondary text hold that same 210 degree bias. A pure neutral would read as unconsidered, and pure black causes halation under near-white text.

Remaining dark values: blockquote `#b4b4b4`, selection `#3c4a1e`, side-quest primary hover `#9dbcff`, GitHub heading link `#3fb950`.

The contribution graph carries a count in colour, so its ramp must stay monotonic. Keeping the light greens on a dark ground inverts it: a one-contribution day would outshine a twenty-contribution day. Dark uses GitHub's own dark ramp, `#22262a`, `#0e4429`, `#006d32`, `#26a641`, `#39d353`, applied through `.gh-graph rect[fill="…"]` attribute selectors because `assets/js/gh-graph.js` writes fill as a presentation attribute and presentation attributes have zero specificity. The script is never edited for theming. The legend must always carry the same five values as the graph.

Beige changes only the empty cell. `#ebedf0` is a cool grey that measures 1.0 against warm paper, identical in lightness and different only in hue, so the grid read as cold holes punched in it. Beige uses `#e9e0d0`, its own surface token, which sits at 1.11 against the page, the same subtlety `#ebedf0` has on white, and stays lighter than the first green so the ramp holds. The greens are the count and carry over unchanged. The legend override targets `i:first-of-type`, not `i`: the bare selector outranks `.gh-legend i:nth-of-type(n)` and would repaint all five swatches, erasing the ramp the legend exists to explain.

`screen and` in the media query is required, not stylistic. A bare `prefers-color-scheme` query also matches print, and browsers omit backgrounds when printing, so a reader in dark mode would print near-white text onto white paper.

`light-dark()` is rejected. It is larger than the media block, and on a browser without support the declaration is invalid at computed-value time, which resolves every consuming `var()` to `unset` and leaves a page with no background, text colour, or borders. The media block degrades to plain light mode.

## Page light

- Three swatches showing the grounds themselves, light, beige and dark, right-aligned above the masthead. The control is a sample of the thing it does rather than a symbol standing in for it.
- Swatch fills are fixed hex values, not tokens. Each has to show its own ground whichever ground the page is currently on, so they must not follow the palette.
- It sits in normal flow, not fixed to the viewport. A fixed control in the top corner collides with the mobile menu button, and no gutter on a 320px screen is wide enough for three swatches.
- `assets/js/theme.js` writes the markup. Without JavaScript nothing renders, because a control that cannot do anything should not occupy a tap target. The system setting still chooses the ground in that case.
- Each swatch is a real `<button>` with a text label for assistive technology. The selected one is ringed and carries `aria-pressed`, so the state survives with the stylesheet off and never rests on colour alone.
- There is no way back to following the system once a swatch is picked. That is a known gap, not an oversight; a fourth Auto swatch is the fix if it starts to matter.
- `data-theme` on `<html>` holds the choice, mirrored into `localStorage`. Absent means the reader has not chosen and `prefers-color-scheme` decides, which is why the dark media query is guarded with `:root:not([data-theme])`.
- Dark is written once, in a Sass mixin, and included under both triggers. Beige overrides only the five ground tokens; link, mark, and accent stay the familiar web blues, because beige is a different paper stock and not a different brand.
- Beige keeps the same contrast running order as the other two, text, blockquote, link, secondary, mark: 12.8, 8.4, 8.0, 5.6, 4.7.
- It sits in the gutter beside the content column where the layout has room, and tucks into the page padding on narrow screens, outside the mobile menu button rather than over it.

## Header

- Pure HTML in `_includes/nav.html`; data comes from `_data/navigation.yml`.
- First link is electric-blue `VC`, returning home.
- Visible path links follow, in `_data/navigation.yml` order: `/about`, `/work`,
  `/consulting`, `/blog`, `/speaking`, `/side-quests`, `/days`, `/contact`.
- Eight links is the ceiling. At `720px`, the narrowest desktop width before the
  hamburger takes over, they fill the column exactly. A ninth wraps, so adding
  one means removing one. `/days` was added by removing `/uses-this`, which
  remains reachable from the footer under `About`.
- Navigation links are plain paths. No button, pill, or filled call to action,
  including for `/contact`: the header has one visual idiom and a single
  emphasised item would make every other link read as secondary.
- Keep the primary navigation internal. External profiles belong in the homepage social links.
- Header links are muted gray without underlines until hover, focus, or active state. Icon-only social links also omit underlines because they contain no visible text.
- A `1px #dddddd` rule sits below the navigation.
- No home pill, active background, or theme toggle.
- Desktop: single line where space permits.
- Mobile: `VC` and a plain hamburger occupy the first line. Opening it reveals a right-aligned white link panel over the page content, never changing document flow or pushing content down. Each link retains at least `44px` touch height. The panel uses one light bottom rule, no shadow or animation.

## Homepage

Order is fixed:

1. Header.
2. Short introduction with the prior circular portrait above the text: name, location, operating focus, writing topics.
3. Internal MCP page link, calendar link, and compact links to LinkedIn, X, GitHub, and Letterboxd.
4. GitHub contribution graph in official green.
5. Linked `Essays` heading.
6. Every essay, newest first, grouped by year.
7. Linked `Side quests` heading and featured side-quest list.
8. Footer.

The introduction is not a marketing hero. It uses the existing `168x168` `hero-photo.jpg`, cropped into a circle above the text on every viewport, never beside it. No oversized CTA, animated keyword, career timeline, side-quest cards, or AI CTA band. Social profiles are five icon-only links with accessible names, no boxes, visible text, or external-arrow marks. The calendar link also omits an external-arrow mark.

Homepage sections are separated by light `1px #dddddd` horizontal rules with generous whitespace. Rules clarify structure; they never become boxed sections.

## Side quests

- `_data/quests.yml` is the single source for both surfaces.
- A quest only carries `repo:` when a repository of that exact name exists. GitHub keeps a renamed repository's old name as a permanent redirect, so a stale value does not 404: it silently returns whichever project owns that name now. `_scripts/refresh_quests.py` compares the API's canonical `full_name` against the configured name and refuses the mismatch rather than publishing another project's releases.
- Every homepage entry marked `featured: true` must include a destination and an icon.
- GitHub projects use the GitHub mark and link directly to their repository. Website projects use the website mark and link to their canonical website.
- Every row includes one short description; the section heading links to `/side-quests/`.
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
- Homepage mobile rows use compact vertical rhythm and a narrower date column. Other archive surfaces keep `44px` tap rows.

## Tags

- `/tags/` is the only complete alphabetical tag list.
- The shared footer contains one plain `tags` link to `/tags/`; it never embeds the list.
- Each entry is a plain blue link plus a muted essay count.
- Three columns on desktop, two on tablet, one below `30rem`.
- Tag archive pages retain the same year-grouped essay list.

## Essay pages

- Header remains unchanged.
- Page begins with title, exact published date, linked author byline, optional updated date, then plain tag links.
- Prose width is no wider than `42rem`.
- Images use natural color and scale down to viewport width.
- Code blocks and tables may scroll horizontally; the page itself must never scroll horizontally.
- After prose: `Related essays`, up to three dated links selected only through existing tag relationships. Rows use the same single-line date, separator, and linked-title treatment as the homepage archive.

## Supporting pages

- `/about`, `/work`, `/consulting`, the two consulting detail pages, `/blog`, `/fun`, `/uses-this`, `/side-quests`, `/tags`, `/feed`, `/days`, and `/mcp` use the same page shell and typography.
- `/consulting` is the umbrella offer. AI marketing and product marketing pages are specialist branches of the same B2B SaaS marketing consulting practice.
- Every consulting page uses the same three engagement shapes: workshop, defined project, and ongoing consulting or fractional leadership.
- The shared provider title is `B2B SaaS Marketing Consultant`. AI is a specialist capability and delivery method, not the umbrella job title.
- `/about` contains no portrait.
- Long pages rely on headings, rules, lists, and links. Do not introduce a separate visual system.
- `/uses-this/` renders from `_data/uses.yml`. Every entry carries a name, a one-line note, a destination, and one `logo` that must exist as `_includes/logos/<logo>.svg`. A row naming several products uses `name_md`, so each product carries its own link instead of the row linking only the first.
- Each row is one `24px` monochrome mark in a fixed left gutter, then the linked name and its muted note as running prose. Rows are separated by the standard `1px #dddddd` rule. No cards, columns, grids, or icon library.
- Marks use the real brand logo wherever one stays legible at `20px`. Wordmark-only logos do not, so Samsung, Ikea, Zoom, and Slack use category glyphs instead. Apple devices use device glyphs, because one repeated Apple mark tells the reader less than a laptop, watch, and phone do. Brand paths come from Simple Icons and are normalised to `currentColor` with the title stripped.
- Unused marks are deleted rather than kept for later. `_includes/logo.html` is generated from the directory listing, so a stale file becomes a stale branch in that case statement.
- Icon marks carry no meaning on their own. Every row remains complete and readable with images or CSS disabled.
- The page emits an `ItemList` of the tools alongside its `FAQPage`, so assistants can answer tool questions without parsing the prose.
- Side quests use grouped plain rows with simple horizontal rules, not cards or disclosure widgets.
- `/changelog/` opens on the newest month and offers month-and-year, newer, and older controls. The controls require 44px targets, fit at 320px, preserve the selected month in the URL, and leave the complete chronology visible when JavaScript is unavailable.
- MCP endpoint is presented as selectable code. Avoid custom copy UI when selecting and copying text already works.

## Days

- `/days/` is a day counter over a weekly work log. `_data/days.yml` is the single source, newest week first.
- The count is days elapsed since `2026-05-17`, the launch entry in `/changelog/`. The epoch lives in the page markup as `data-days-epoch`, not in the script, so there is one place to change it.
- Both the build-time value and `assets/js/days.js` compute the count on the Asia/Kolkata calendar, matching `_config.yml`. A reader in another timezone sees the same number VC does, and the count rolls over at his midnight rather than theirs.
- Item state is `done`, `open`, or `dropped`, carried by `<del>` plus the literal words `(open)` and `(dropped)`. Never by colour, and never by the glyph alone, which is `aria-hidden`. The page reads correctly with the stylesheet off.
- Unfinished items stay visible after their week ends. The page is a record, not a highlight reel, so removing a miss is not an available edit.
- A week with no items renders its heading and `Nothing logged this week.` Gaps are never skipped or collapsed: a quiet week is the information.
- `/days/` shows the current year only. A closed year moves to `/days/<year>/`, an eight-line page whose front matter sets `days_year` and whose body is one `{% include days-year.html year=page.days_year %}`. `/days/` finds those pages by `days_year` and lists them under `Earlier years`, so adding a year needs no edit anywhere else. Ten years of weeks in one document is a page nobody reads and every visitor downloads.
- `_includes/days-year.html` renders a whole year: summary, density strip, and week list. A week belongs to the year of its Monday, so no week appears on two pages.
- The year summary counts essays, releases, and weeks logged out of weeks elapsed. The coverage ratio is the only figure that can look bad, which is why it is there. It is the same rule as keeping dropped items visible.
- The density strip is one cell per week, oldest left, each an anchor to its week further down the same page. It navigates, it never filters: nothing on the page is reachable only through it.
- Cells take opacity over `var(--color-text)`, never `currentColor` and never the GitHub ramp. They are anchors, so `currentColor` resolves to the link blue and the ramp silently becomes brand blue.
- Every cell carries its date and count twice, as a `title` for pointer users and as visually hidden text for everyone else, so strength is never the only carrier. The caption says stronger rather than darker, because opacity over ink inverts with the ground.
- Month ticks sit under the strip, each label flexed to the number of weeks its month holds, so they align without a second grid or any measurement in JavaScript. A four-step legend runs quiet to busy, then a rule closes the block before the weeks begin.
- The `Years` row sits directly above the band, so one row both labels which year the cells cover and switches between years. It renders even when it holds only the current year: an affordance that appears out of nowhere in January is worse than one that was visibly waiting.
- Density bands are 1, 2 to 3, and 4 or more. A normal week here lands one or two things; higher bands would render every week the same shade.
- Log rows reuse `.essay-row` and week headings reuse `h3`, so `/days/` adds no new visual system beyond the strip. The GitHub green ramp is not available here.
- Every logged item names something that exists publicly, or will. Not preparation, not private meetings.

## Footer

- Thin top rule, small gray text, generous space between groups.
- Six plain-language groups: `Work`, `Read`, `Free tools`, `AI`, `About`, and `Site`, plus `Ask`.
- `days` sits under `Read`, with the blog and the feed. It is a reading surface, and naming it anything other than `days` made it unfindable for the person who asked for it.
- `contact` sits under `About`, with the person, not under `Site` with the legal and meta pages.
- Desktop uses a four-column grid, with `Ask` continuing onto the second row. Mobile uses two columns, then one below `30rem`. Links stack vertically without dot separators.
- `site design` links to the readable canonical file in the public GitHub repository.
- `Ask` uses recognizable 24px brand-color SVG logos for ChatGPT, Claude, and Perplexity, each inside an accessible 44px link target. No visible text links.
- Final row sits below its own light rule: copyright and `Built with AI, supervised by a human.`
- No buttons, avatars, or callout background.

## Responsive behavior

- Primary breakpoint: `44rem`; compact breakpoint: `30rem`.
- Test at `320`, `375`, `390`, `430`, `768`, and `1440` CSS pixels.
- No horizontal page overflow at `320px`.
- Navigation toggle, expanded links, and archive links must remain readable without zoom.
- Tap targets: `44px` on mobile navigation and non-home archive rows. Homepage essay rows stay compact by design.
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

- Inline compiled CSS: hard ceiling `14,000` bytes compiled, enforced by `_scripts/qa.rb`, which compiles the sheet the same way the page inlines it. Currently `16,754`, against a ceiling raised from `14,000` when the page light shipped. The sheet ships inside every page and is never cached, so a byte here is paid on every view. Adding to it means finding the bytes first: dark mode paid for itself by collapsing 24 repeated border declarations into the `--rule` token, and the `/days/` density strip paid for itself with the `%mono` and `%muted` placeholders, which fold 7 and 16 repeats into one grouped rule each.
- `@extend` emits its grouped rule where the placeholder is defined, near the top of the sheet, so an extended selector loses the source-order position it used to hold. Anything that depended on winning by order has to win by specificity instead. `.days-item .intro-note` exists for exactly that reason.
- Homepage first-party JavaScript target: under `8KB` uncompressed; ordinary pages: `assets/js/theme.js` only, budgeted at `5,000` bytes in `_scripts/qa.rb`.
- No render-blocking external stylesheet, font, or script.
- No layout shift from navigation, fonts, or GitHub graph.
- Keep homepage DOM small despite full archive.
- Images below the fold use `loading="lazy"` and explicit dimensions.
- Analytics may load after `window.load` during idle time. Analytics must never block rendering.
- Cal.com links emit `cal_booking_clicked`; mark it as a GA4 key event for consultation intent.

## Repository architecture

- Jekyll renders all content.
- `_sass/main.scss` is the only design stylesheet and is inlined by `_includes/head.html`.
- Colour and the standard hairline are reached only through tokens: `--color-*` and `--rule`, which is `1px solid var(--color-border)` and resolves per mode at use time. A value used at exactly one site stays a literal, because in compressed CSS a token costs more than it saves until it repeats.
- `_includes/head.html` carries two `theme-color` tags, one per `prefers-color-scheme`, which is correct only while no ground is stored. Once the reader picks one, `theme.js` inserts a third with no media query ahead of them, because browsers take the first `theme-color` whose media matches and one without a query always does.
- `_includes/nav.html`, `_includes/essay-list.html`, and `_includes/footer.html` are the shared interface primitives.
- `assets/js/gh-graph.js` is the only homepage application script.
- `assets/js/theme.js` runs on every page and builds the swatches. The theme itself is applied by a separate inline snippet in `_includes/head.html`, which must run before first paint; its `sha256` is in the CSP and `_scripts/validate-posts.rb` fails the build if the two drift apart.
- `assets/js/changelog.js` runs only on `/changelog/` and progressively adds month browsing.
- `assets/js/days.js` runs only on `/days/` and recomputes the day count in the browser. Jekyll renders the number at build time, which stops being true at the next midnight, so the script is the correct value and the build-time number is the fallback.
- `_includes/logos/` is the only logo source. Do not duplicate those files under `assets/`.
- Analytics and Clarity load from the small deferred inline loader in `_includes/head.html`; standalone duplicate loader files are forbidden.
- Footer exposes the canonical `DESIGN.md` source on GitHub without adding it to the built site payload.
- Do not restore `_nav/`, `assets/js/nav.js`, `assets/css/nav.css`, `assets/js/redesign.js`, or `_includes/theme-init.js`.

## Validation

- `_scripts/validate-posts.rb` validates frontmatter, tag pages, and inline CSP hashes.
- `_scripts/qa.rb --all` validates every tracked page and post plus design invariants, dead-asset exclusions, and performance budgets. Without `--all`, it checks changed content only.
- `node --check assets/js/gh-graph.js assets/js/changelog.js assets/js/days.js assets/js/theme.js` is the dependency-free JavaScript lint gate.
- Production build must pass after validation. GitHub Actions runs all gates before deployment.

## Content rules

- First person. Direct sentences. Specific claims.
- No emojis. No em dashes; use commas, colons, parentheses, or periods.
- Display dates as `DD Mon` inside yearly archives and `Mon D, YYYY` on essay pages.
- External destinations use `↗` only where the external nature matters, primarily source links. The primary navigation remains internal.
- Every page carries an `intro`, the visible standfirst the page layout renders under the H1, and `_scripts/qa.rb` fails the build without one. It is the site's summary mechanism: the reader sees it, and it is what a machine reads when no separate `description` exists. Essays use `description` instead, which feeds both the meta tag and `BlogPosting.description`.
- Essays get no visible summary block on purpose. The titles are already outcome-first and the pieces turn on a reveal, so a standfirst restating the conclusion removes the reason to read the next paragraph.
- Search metadata uses concise, unique titles and descriptions without changing an essay's editorial headline. Duplicate archive aliases point canonically to `/blog/` and remain out of the sitemap.
- Structured data identifies Varun as the author, the site as a `WebSite`, `/about/` as a `ProfilePage`, archives as `CollectionPage`, and essays as `BlogPosting`.
- Favicon is a stable white square with electric-blue `VC`; SVG and 180px PNG use the same design.
