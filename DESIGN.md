# VC's Notes design system

Machine-readable rules for `varunchoraria.com`. Every page should feel like a serious personal publication from the early web: direct, fast, readable, and useful. The structural reference is Tom Preston-Werner's personal site. Copy its restraint and information hierarchy, not its exact branding.

## Product intent

- Writing is the product. Homepage shows every essay, newest first, grouped by year.
- Site should communicate that VC means business: precise copy, exact dates, visible work, no decorative interface chrome.
- Personality comes from familiar web colors, dense chronology, direct writing, and the green GitHub graph.
- Function beats novelty. Use native HTML before JavaScript.

## Hard constraints

- No React, Tailwind, shadcn, component framework, web font, icon library, client-side router, theme framework, or build-time JavaScript. The site shipped four self-hosted, subset woff2 faces of Open Sauce One for one revision and reverted; `@font-face` is back in `FORBIDDEN_PATTERNS` in `_scripts/qa.rb`.
- No cards, pills, tab bars, shadows, glass effects, decorative animation, fake browser chrome, CRT effects, or nostalgia cosplay. Gradients are permitted on the masthead bar and nowhere else: one `linear-gradient` for the ramp and three `repeating-linear-gradient`s for the cutting-mat grid, all four on the same element; see **Masthead**. `radial-gradient` stays forbidden, and no gradient of any kind may appear inside the reading column.
- A bordered, tinted surface is permitted for one thing: code. `pre`, `code`, and the install command block read as raised because they are a different kind of content, not because a box makes a page look designed. Lists stay rules-only. Nothing else gets a border and a fill.
- Three grounds: light, beige, dark. With nothing stored, `prefers-color-scheme` decides between light and dark and no attribute is written, so a reader who never touches the swatches gets exactly the behaviour the site had with two palettes. The reader already told their operating system which one they want, and the default still answers that without asking.
- The page light is the only way to override it. A stored choice and a pre-paint inline script are both accepted now; that is the cost of letting the reader pick beige, which no operating system can tell us they want.
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
- Base typography: `16px / 1.55` using `"Helvetica Neue", helvetica, sans-serif`, which is simonwillison.net's exact body stack.
- Code typography, and nothing else: `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace`.
- No downloaded fonts. No font preload. Both stacks are already on the reader's machine, which is why the site can have two voices for free.

## Type split

**One typeface. Helvetica everywhere except code.**

- Helvetica: `h1` to `h4`, the masthead, breadcrumbs, dates, metadata, labels, prose, everything. Hierarchy is carried by size, weight and the rules between sections, not by a second face.
- **No serif, and that is a deliberate departure from the reference.** simonwillison.net is a two-face site: `georgia, serif` on `div#bighead h1`, `div.entry h2`, `div.entry h4` and `div#secondary h3`, over a Helvetica body. The masthead type here follows his exactly; the headings do not. One typeface is a rule this site keeps.
- **Open Sauce One was tried and reverted.** Four self-hosted subset faces, `39KB` of woff2, a preloaded Regular and a metric-matched `local("Arial")` fallback to hold the layout across the swap. It worked and it was not worth it: the whole apparatus existed to replace a face already sitting on every reader's machine, and it cost `900` bytes of inline `@font-face` on every uncached view. The measurements are kept here because the next person to propose a webfont should have to beat them, not rediscover them: x-height `.553` against Arial's `.519`, average lowercase advance `.607` against `.55`, and `size-adjust: 107%` with `ascent-override: 93%` / `descent-override: 22%` as the fallback that made the swap shift nothing.
- Monospace: `pre`, `code`, and the install command. Nowhere else. Code is the one content type where the character grid carries meaning: indentation, column alignment, telling an `l` from a `1`. A directory tree in a post collapses without it.
- The rule for adding mono to anything new is that question. If the content would still read correctly in a proportional face, it is not code and it does not get the mono stack.
- Headings keep `letter-spacing: -.02em`. Helvetica sets loose at heading sizes, and the tracking is what makes `1.75rem` read as a title rather than as large body copy.
- Headings carry `scroll-margin-top: 5.5rem`. The masthead is sticky, so without it every anchor link on the site lands with its heading hidden behind the bar. It moved with the bar when the bar went from `2.75rem` to `4.5rem`; the two numbers have to be changed together.
- The MCP callout is `.9rem` with `text-wrap: pretty`. It dropped to `.85rem` for the Open Sauce revision, which ran about a tenth wider and pushed the default line onto a second row with `copy-paste.` stranded under it; Helvetica fits it at `.9rem`. `pretty` stays, because the copy is per-audience via `mcp_note` in front matter and a longer note must not wrap to an orphan.
- Masthead navigation is `.8125rem` at the inherited body weight `400`, with a `1rem` gap, and the seven wayfinding labels carry no `/` prefix. The prefix was terminal vocabulary and left with the mono system. The weight came down from `700` to match simonwillison.net, which sets its entire masthead in the Helvetica Neue stack at `font-weight: normal` and declares no `letter-spacing` anywhere in the header. The bar can afford the thinner stroke because the mat ramp below took its worst contrast point from `3.39:1` to `5.27:1` under the cap band, with `6.32:1` at the top edge.
- 700 is the ceiling. Helvetica Neue and Helvetica both stop at Bold, Arial has nothing above it, and the only `900` face macOS ships in the family is Condensed Black, which renders narrow rather than heavy. Anything that needs to look heavier gets a larger size, never a larger weight.

## Color

- **One blue on the whole site, and it is the cutting mat's.** `#002f9e`, read out of `cutting-mat-50x35.svg` where it is the board colour. Normal and visited links, the accent, the `--color-mark` that carries the `❯` chevron and the command-block border: all of them are that value, underlined where they are links. There is no second blue and no decorative blue.
- **Dark lifts the same blue, it does not swap it.** `#002f9e` measures `1.6:1` against `#16181a` and is unreadable there. Holding oklch hue `262.9` and chroma `.184` and raising lightness from `.369` to `.64` gives `#4d86fa` at `5.2:1`. Same hue, same chroma, other end of one ramp. Deriving a dark blue by eye is how a site ends up with two brands.
- **The mat's guide colour is `#EDEEFD`,** and it appears only as the masthead grid, held down to `.1` and `.2` alpha. It is never text and never a border.
- **There is no `--bar-ink` token.** The bar carried one for the revision it spent pale, when the ink had to be dark. Back on the board the ink is `#fff` and a custom property read four times costs 56 bytes more than the literal.
- GitHub graph: official contribution colors `#ebedf0`, `#9be9a8`, `#40c463`, `#30a14e`, `#216e39`.
- Text never uses the GitHub palette, and green belongs to GitHub activity only: `#9be9a8` through `#216e39` mean a contribution count and nothing else.
- The masthead is the one deliberate exception, and it is blue, not green. It is the cutting mat; see **Masthead**. The greens stay reserved, so the graph is still the only thing on the page speaking in GitHub green.
- The two brand marks in the footer, Claude `#d97757` and Perplexity `#20808d`, are other people's colours identifying other people's products. They are out of scope for the one-blue rule for the same reason the GitHub greens are.
- Selection highlight: pale yellow `#fff2a8`.

## Surface layering

The page has three depths and no more: the ground, one tinted surface, and a hairline border between them. `--color-bg`, `--color-surface`, and `--rule` already carry all three, and every ground defines its own values, so a rule written once renders correctly on white, beige, and dark.

- **Do not add a second surface token.** Anything that needs to read as raised uses `--color-surface`. A sheet with a subtle tint and a slightly-less-subtle tint is a sheet nobody can maintain, and each extra token is paid on every page view.
- **Elevation inverts, and the token already knows.** `--color-surface` is darker than the page in light and beige, lighter in dark. That behaviour is defined once in the palettes; a component must never hard-code a tint of its own.
- **One radius: `.375rem`.** It applies to `pre`, to `.quest-action`, and to the side-quest directory row that tints on hover. It stays a literal rather than a token because it repeats at exactly three sites, and in compressed CSS a token costs more than it saves until it repeats more than that.
- **Borders are the hairline or nothing.** `--rule` is the only border weight on the page. A component that wants to look more important gets more space, not a heavier edge.

## Masthead

One full-bleed sticky bar, the only element on the site that spans the window. It lives outside `#wrapper` in `_layouts/default.html`, because a bar cannot span the window from inside a `46rem` centred column and navigation was never main content. Its inner div re-establishes that column at the same width and the same horizontal padding, which is what keeps the mark aligned with the first character of every heading below it.

- **Two poles.** `VC` and the seven wayfinding links on the left; `contact` and the page light on the right, pushed there by `margin-left: auto` rather than `space-between`, which would strand the links in the middle. `_data/navigation.yml` decides which pole an item belongs to with `pole: right`.
- **`VC` is white and `1.375rem`, at the inherited `400`, untracked.** Not `#002f9e`: the mark colour is the bar's own colour and would be invisible on it. It carried `700` and `-.03em` for four revisions, which pulled the two letters into one shape; the reference bar separates its mark from its links by size alone and nothing else, and so does this one now. Size is the only lever left, which is the rule the type section already states.
- **It is sticky.** The bar carries the whole navigation, the action and the page light, and on a 1500-word essay all three were otherwise a scroll away. `z-index: 30`, and `.skip-link` sits at `40` so a keyboard reader does not land behind it.
- **The ramp is the cutting mat.** `#002f9e` at the top, the board colour itself, down to `#000a81`, which is the same oklch hue and chroma at lightness `.28`. One hue, two lightnesses.
- **It went pale for one revision and came back.** `#90caf9` with the grid cut into it in `#002f9e`, on the argument that a light board shows its grid the way a real mat does. It does, and it read as a banner rather than as a masthead. If it is tried again, the numbers are: white on `#90caf9` is `1.75:1` so the ink has to invert to `#002f9e`, which measures `6.32:1` at the top stop and `4.82:1` at the bottom.
- **Every ground gets the same bar.** The dark palette defines no bar tokens at all and inherits the light ones, as beige already did. A cutting mat does not change colour when the lights in the room do, and the browser chrome in `head.html` is a single `theme-color` for the same reason.
- **Contrast is not the constraint on this ramp.** White on `#002f9e` is `11.05:1` and on `#000a81` it is `15.44:1`, against `5.27:1` at the worst point of the Primer ramp this replaced. That headroom is what lets the bar carry weight `400` text. The cap band, `33%` to `67%` of a `72px` bar at `.8125rem`, is the number to check when either stop moves.
- **Nav links are full-strength white.** They sat at `opacity: .8` for one revision, which read as a hierarchy against the mark and cost 1.3 stops: on this ramp that is `3.95:1`, under the floor. The current page is marked by its underline, which it already was.
- **The grid is the mat, and it stops at the chrome.** Three `repeating-linear-gradient` layers: a `1rem` minor grid in both directions at `--mat-line`, and a `5rem` vertical rule at `--mat-rule`, both `#EDEEFD` at `.1` and `.2`. They are written once, as `--mat-grid`, because two surfaces carry them: the bar, over the ramp, and the dropdown panel below `44rem`, over the bottom stop. The vertical rules line up across the seam because both boxes are full-bleed from `x=0`; the horizontal ones restart, which is where the bar ends. Nothing in the reading column is ever gridded, tinted, or textured, because the point of a cutting mat is that it is the surface underneath the work rather than a pattern printed on it.
- **The gap stops are `#0000`, not `transparent`.** Both are transparent black and every stop in the grid is a hard edge, so nothing interpolates between them and the shorter spelling renders identically for 18 bytes less.
- **The bar is `4.5rem`.** It was `2.75rem`, which is a single grid cell tall and reads as a stripe of pattern rather than as a board. At `4.5rem` four horizontal cells fit and the mat is legible as a mat. That is the whole argument for the height, and `scroll-margin-top` in the type rules moves with it.
- **Two stops, one linear run.** The bar had three stops with the midpoint at `30%`, which is a fast run followed by a slow one, and the change of slope where they meet is a crease. That crease is what the bar was read as. One run has no second slope to disagree with the first. Measured as the largest change in per-pixel luminance step across the `72px` bar, it falls from `19.7` on the Primer ramp to `0.7` on this one. The run travels `.087` in oklab lightness, which is deliberately short: the mat is one board colour, and the gradient exists to stop it reading as a flat rectangle, not to be a second colour.
- **Beige defines no bar tokens** and inherits the light ramp. It had its own for two revisions, warmed toward `236°` and then re-hued back, and neither survived the requirement that the bar read as GitHub blue. GitHub publishes a light scale and a dark scale and nothing between; a third would be this sheet's colour, not theirs.
- **The focus ring is white inside the bar** and `--color-link` everywhere else, because the page ring is blue on blue here.
- **Below `44rem` the bar keeps only the mark and the hamburger.** `.site-menu` stops being `display: contents` and becomes the dropdown panel, taking `--mat-grid` over the bottom stop of the ramp so it reads as the mat continuing downward. Links, `contact` and the swatches all live in it. That is the answer to the old note about a fixed control colliding with the menu button: the panel is the gutter a 320px screen does not have.
- **Browser chrome follows the bar, not the page.** `theme-color` in `_includes/head.html` and the `chrome` values in `assets/js/theme.js` are each ground's top stop.

## Install command

The command block borrows a terminal's vocabulary, not its costume. No fake window frames, no scanlines, no ASCII logos, no blinking cursors, no green-on-black.

- **A chevron before the command.** It marks the line as something you run rather than something you read. Generated with `content` on `.command-block code::before`, never typed into the Markdown, so `copy-code.js` reads `textContent` and the chevron never reaches the reader's clipboard.
- **The mark colour carries the border and the chevron.** `#002f9e`, never green: `#9be9a8` through `#216e39` belong to the GitHub contribution graph, and an interface accent inside that ramp would make the graph unreadable as a count.
- **The label above it is plain muted text.** It was an overline once, caps and tracked out at `.09em`. The block already announces itself with the mark-coloured border and the chevron; the overline was saying it a third time.
- **Sections are not numbered.** The stylesheet used to generate `01`, `02` with a CSS counter. A counter reads as a specification and these pages are essays; the rule and the space between sections do the work.

Everything here is decoration over content that already reads correctly. With CSS off, the command is still a `pre`, the headings are still headings, and nothing has lost its meaning.

## Interaction

- Hover may tint, underline, or thicken. It may never be the only way to learn something. Side-quest directory rows tint on hover; the name, state, and description are ordinary text that a keyboard, a screen reader, and a crawler all reach without it.
- `assets/js/copy-code.js` puts a copy button on every `pre` inside `#page-content`, on every page. The button is generated in JavaScript rather than in Liquid, so with scripting off the reader sees the code block that shipped before the file existed and no dead control. It reveals on hover or focus so it never covers the first line while reading.
- Selecting and copying by hand still works everywhere the button does. The button is an accelerator for the install commands, not a replacement for text.
- The only transition in the sheet is the copy button's `opacity`, and it is switched off under `prefers-reduced-motion: reduce`. Adding a second one means deleting this line first.

## Dark palette

Both palettes live in `_sass/main.scss`: light in `:root`, dark in a single `@media screen and (prefers-color-scheme: dark)` block at the end of the file. Only tokens change between them, so every rule in between is written once. Four rules govern how the dark values were chosen, and any future change to them should hold all four.

- **Derive from the ramp, do not invent.** Dark link `#4d86fa` is `#002f9e` held at oklch hue `262.9` and chroma `.184` with lightness raised to `.64`, which is where it clears `4.5:1` on `#16181a`. Light reads the dark end of that ramp, dark reads the light end. A blue that merely looks right is how a site ends up with two brands.
- **Preserve the running order, not the numbers.** Contrast against the page must fall in the same sequence in both modes: text, blockquote, link, dates, mark. Light is 18.9, 9.7, 9.4, 5.7, 5.5. Dark is 14.0, 8.6, 6.5, 5.8, 5.6. Dates were tuned to `#8f9398` specifically so links stay louder than dates, as they are in light.
- **Elevation inverts.** In light the code surface `#f7f7f7` is darker than the page. In dark it is lighter: `#212427` on `#16181a`. A code block that is darker than the page reads as a hole.
- **The ground is not grey.** `#16181a` sits ten degrees off the brand hue at 8% saturation, and the surface, rules, and secondary text hold that same 210 degree bias. A pure neutral would read as unconsidered, and pure black causes halation under near-white text.

Remaining dark values: blockquote `#b4b4b4`, selection `#3c4a1e`, side-quest primary hover `#9dbcff`, GitHub heading link `#3fb950`.

The contribution graph carries a count in colour, so its ramp must stay monotonic. Keeping the light greens on a dark ground inverts it: a one-contribution day would outshine a twenty-contribution day. Dark uses GitHub's own dark ramp, `#22262a`, `#0e4429`, `#006d32`, `#26a641`, `#39d353`, applied through `.gh-graph rect[fill="…"]` attribute selectors because `assets/js/gh-graph.js` writes fill as a presentation attribute and presentation attributes have zero specificity. The script is never edited for theming. The legend must always carry the same five values as the graph.

Beige changes only the empty cell. `#ebedf0` is a cool grey that measures 1.0 against warm paper, identical in lightness and different only in hue, so the grid read as cold holes punched in it. Beige uses `#e9e0d0`, its own surface token, which sits at 1.11 against the page, the same subtlety `#ebedf0` has on white, and stays lighter than the first green so the ramp holds. The greens are the count and carry over unchanged. The legend override targets `i:first-of-type`, not `i`: the bare selector outranks `.gh-legend i:nth-of-type(n)` and would repaint all five swatches, erasing the ramp the legend exists to explain.

`screen and` in the media query is required, not stylistic. A bare `prefers-color-scheme` query also matches print, and browsers omit backgrounds when printing, so a reader in dark mode would print near-white text onto white paper.

`light-dark()` is rejected. It is larger than the media block, and on a browser without support the declaration is invalid at computed-value time, which resolves every consuming `var()` to `unset` and leaves a page with no background, text colour, or borders. The media block degrades to plain light mode.

## Page light

- **One button, three grounds, at the right pole of the masthead past `contact`.** It cycles light, beige, dark and back, and the icon reports which is showing: an empty disc, a half-filled disc, a filled disc. Living in the bar makes it reachable at any scroll depth.
- **It was three swatches, each a sample of the ground it selected.** That is the better idea and the worse control: three tap targets in a bar that already carries seven links and an action, and at 320px they only ever read as a group rather than as three choices. One `2.75rem` target replaced `3 x 1.35rem` and the sheet lost four rules.
- **The disc fills as the page darkens,** left half first. One direction to learn, and it maps to the only thing the button does. The icon is drawn in `currentColor`, which the bar sets to white, so it needs no colour of its own on any ground.
- **Same `2.75rem` target as the menu button,** which is exactly the height of the bar, so the control does not grow it. Below `44rem` it moves into the dropdown panel with the links, because a control in the top corner collides with the mobile menu button.
- `assets/js/theme.js` writes the markup. Without JavaScript nothing renders, because a control that cannot do anything should not occupy a tap target. The system setting still chooses the ground in that case.
- **The accessible name says both halves:** what is showing and what the button will do, as `Page light: Beige. Switch to Dark.`, updated on every press. A cycling control that names only its current state leaves a screen reader guessing which way the cycle turns.
- There is no way back to following the system once a ground is picked. That is a known gap, not an oversight; a fourth Auto step in the cycle is the fix if it starts to matter.
- `data-theme` on `<html>` holds the choice, mirrored into `localStorage`. Absent means the reader has not chosen and `prefers-color-scheme` decides, which is why the dark media query is guarded with `:root:not([data-theme])`.
- Dark is written once, in a Sass mixin, and included under both triggers. Beige overrides only the five ground tokens; link, mark, and accent stay the cutting-mat blue, because beige is a different paper stock and not a different brand. Neither beige nor dark defines bar tokens.
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
- State is `Public`, `Private`, or `Retired`, enforced by `_scripts/qa.rb`. `Private` and `Retired` both mean there is no repository a visitor can open, so both may only link on-site. A `Retired` quest additionally cannot be featured on the homepage and cannot name a `repo:`, because the refresh script would resolve the name and publish another project's releases under it.
- A retired project page drops `project: true`. That flag emits `SoftwareApplication` schema carrying a version and a feature list, which asserts software a reader can obtain. The write-up stays up when the reasoning in it is still worth reading; the claim that you can install it does not.
- The row's description does not repeat the state. The label already says it.
- Directory rows tint on hover using `--color-surface`. The tint bleeds past the text column through a negative inline margin, and the rule between rows still spans the full row.
- No disclosure widgets, ASCII logos, feature inventories, or hand-maintained duplicate project markup.

### Project page order

A quest page answers "what is this and how do I get it" before it argues anything. The order is fixed:

1. Title and `intro`.
2. `.quest-actions`: the repository, npm where one exists, and the licence.
3. The install command, in a `pre`, above the fold. It comes from `install_command` in front matter, not from prose, so the five pages cannot drift apart, and it is a plain code block so `copy-code.js` gives it a copy button with no new script. `install_lede` is the one muted line above it.
4. The first line of prose is what to say to the agent once it is installed. That sentence used to sit a thousand words down the page, under an install heading, which is the reason this order exists.
5. Then the argument: what you get, how it works, what to expect and what not to.
6. `Latest meaningful changes`, then `Questions people ask`, then the closing question.

`Questions people ask` is load-bearing, not editorial. `_includes/seo-schema.html` anchors the `FAQPage` at `#questions-people-ask`; renaming the heading breaks the schema silently.

A `Retired` quest carries no `install_command`. It has nothing a reader can install, which is the same reason it drops `project: true`.

There is no separate install section. The command is in the header, so a page keeps an install-shaped heading only when it has something the command does not say: Michealangelo's target matrix, Rainmaker's Codex and npm routes. Neither repeats the command already shown above.

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
- Date uses muted gray with `tabular-nums`; title uses blue, underlined link.
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
- MCP endpoint is presented as selectable code. It gets the same copy button every other code block gets, from `assets/js/copy-code.js`; nothing on the page ships a copy control of its own.

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

- Inline compiled CSS: hard ceiling `17,700` bytes compiled, enforced by `_scripts/qa.rb`, which compiles the sheet the same way the page inlines it. The ceiling was raised from `14,000` when the page light shipped, to `17,400` for the terminal type system, and to `17,700` for the masthead bar. It went to `18,600` for the five `@font-face` blocks of the Open Sauce revision and came straight back down with them. Currently `17,649`, carrying the cutting-mat grid, a `4.5rem` bar and a one-button page light that the three swatches used to cost more than. The sheet ships inside every page and is never cached, so a byte here is paid on every view. Adding to it means finding the bytes first: dark mode paid for itself by collapsing 24 repeated border declarations into the `--rule` token, and the `/days/` density strip paid for itself with the `%mono` and `%muted` placeholders, which folded 7 and 16 repeats into one grouped rule each. `%mono` is gone: the masthead pass took mono down to `code, pre`, which is one rule, and a placeholder for a single call site costs more than it saves.
- The command-first side-quest pages paid for themselves the same way and then some, taking the sheet from `16,754` to `16,724` while adding a radius, a hover tint, and the `.command-lede` rule. Four more placeholders harvested 300 bytes: `%rule-top` and `%rule-bottom` fold 9 and 8 repeats of `border-top`/`border-bottom: var(--rule)`, `%ground` folds 4 of `background: var(--color-bg)`, and `%tabular` folds 4 of `font-variant-numeric: tabular-nums`. Deleting the `color` and `font-family` declarations on `h1, h2, h3, h4` paid the rest: headings inherit both from `html`, so the sheet was setting them twice.
- `hr` is deliberately not extended. It reads `border: 0` and then `border-top: var(--rule)`, and `@extend` emits the grouped rule near the top of the sheet, so the shorthand would win and the rule would vanish. Before folding a declaration into a placeholder, check that nothing later in its own block sets the shorthand that contains it.
- `@extend` emits its grouped rule where the placeholder is defined, near the top of the sheet, so an extended selector loses the source-order position it used to hold. Anything that depended on winning by order has to win by specificity instead. `.days-item .intro-note` exists for exactly that reason.
- Homepage first-party JavaScript target: under `8KB` uncompressed; ordinary pages: `assets/js/theme.js` only, budgeted at `5,000` bytes in `_scripts/qa.rb`.
- No render-blocking external stylesheet, font, or script.
- No layout shift from navigation, fonts, or GitHub graph. Fonts are trivially satisfied again now that nothing is downloaded: there is no swap, so there is nothing to reflow.
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
