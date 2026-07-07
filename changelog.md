---
title: Changelog
description: A running log of what changed on this site and why.
intro: Every update to varunchoraria.com — what changed, what shipped, and the reasoning behind it.
mcp: true
---

A running log of what changed on this site and why. The goal is to be honest about the decisions behind how this site evolves.

---

### 7 July 2026

**Full typographic redesign, lightweight native nav, and two features cut on purpose**

The site relaunched with a new visual language: narrow single column, quiet monochrome base, small colored accents, lowercase section headers. Every page — home, about, work, blog and post pages, archive, tags, side quests, uses-this, changelog, disclaimer, fun, 404 — was rebuilt against a single tokenized stylesheet and a machine-readable `DESIGN.md` that now reflects it.

**Nav is native again** — the top nav is now plain Liquid and CSS: inline links on desktop, native `<details>` menu on mobile. No React bundle, no hydration path, no ghost dropdown. It still reads from `_data/navigation.yml`.

**MCP nudge toast: removed.** The floating "connect an AI agent" card added friction without earning its keep. Gone.

**Email subscribe: removed, not just hidden.** The plan is a Resend-API agent that emails subscribers new posts — but that needs somewhere to store subscriber emails, and this repo is public. Storing PII in it isn't an option. Parked until there's a private store for it; the half-built form came out rather than sit there implying a feature that doesn't work.

**Footer now shows a live version count** — `v{{ n }} · updated {{ date }}`, computed at build time by counting this file's own `### ` headings, linking to `/changelog/`. No hardcoded version number to forget to bump.

**Mobile pass** — nav uses a native mobile menu below 640px, the work timeline stacks its date above the title, hero/footer/section headers reflow cleanly down to 375px.

---

### 28 June 2026

**MCP server, QA agent, security cleanup, and README rewrites**

A lot happened today.

**Live MCP server — [/mcp/](/mcp/)** — The site now runs a proper [Model Context Protocol](https://modelcontextprotocol.io) server, not just a page explaining what MCP is. Any MCP-compatible AI client — Claude Code, Claude Desktop, Cursor, or Codex CLI — can connect to it with one URL and read everything on the site directly. Not from training data. From the actual live content.

Six tools are exposed: pull site info, list all posts, get any post by slug, list all pages, get any page, and search across everything. The server is hosted on Vercel and fetches from `/api/site.json` — a Jekyll-generated file that updates automatically every time new content is pushed. Add `mcp: true` to any page's frontmatter and it gets indexed on the next push. No manual steps.

The [/mcp/](/mcp/) page was redesigned from scratch. It used to require users to install a local npm bridge, generate a token, and paste it into a widget. Replaced that with a tabbed interface — pick your client, copy one snippet, done. Tabs for Claude Code, Claude Desktop, Cursor, Codex CLI, ChatGPT (with an honest note that it doesn't support MCP yet), and a generic option. Every code block has its own copy button.

The page also explains how this differs from the "Ask Claude / Ask ChatGPT" buttons elsewhere on the site. Those open a chatbot with a pre-typed query — the AI draws on training data. MCP is different: it gives your local agent live read access to the actual content here, which matters when you want recent posts or want to use my writing as real context in a workflow rather than just a chat.

**Pre-push QA agent** — A script now runs automatically before every `git push`. It checks every changed file against four criteria: SEO (title, description, character limits), AEO (word count, heading structure, tags — things that help AI agents parse and cite content correctly), design compliance (layout, intro field, date format), and MCP compliance (new pages flagged if they're not indexed). It also blocks any push that includes a CSV, SQL, .env, or other non-site file — more on why below. Errors block the push. Warnings go through but are logged.

**Security: sensitive data removed** — A HubSpot data export (`hubspot_time_to_first_meeting_last_6_months.csv`) was accidentally committed to this public repo during a Claude Code session where the file landed in the wrong directory. It contained deal names, pipeline data, and contact email addresses from GTM Buddy's CRM. The file was removed from the repo and purged from the entire git history so it no longer exists in any commit. The pre-push hook now blocks this class of mistake going forward.

**RSS feed page — [/feed/](/feed/)** — The site has had an RSS feed since June 20 but no dedicated page explaining it. Fixed that. The page covers the feed URL, how to subscribe, and a short list of RSS readers worth trying. I use [NetNewsWire](https://netnewswire.com/) — free, open-source, Mac and iOS.

**README updates** — The site's GitHub README and my GitHub profile README were both rewritten in plain English to reflect what the site actually is now: an AI-managed personal site with a live MCP server, a QA gate, and a machine-readable design system.

---

### 25 June 2026

**Analytics stack: GA4, Google Search Console, and Microsoft Clarity**

Three tracking integrations that should have been in place earlier.

**Google Analytics 4** — Standard event tracking, traffic sources, and pageviews. The main reason to have this is to see which pages people actually read, not which ones I think they read.

**Google Search Console** — Verified domain ownership with Google. This lets me see which search queries surface the site, what positions the pages rank at, and whether Google is indexing everything correctly. Useful signal for knowing if the writing is actually findable.

**Microsoft Clarity** — Session replay and heatmaps. More granular than GA4 — you can watch actual visitor sessions, see where people click, and spot where they drop off. Also added the required privacy disclosures to the footer and the disclaimer page.

---

### 23 June 2026

**Ask AI buttons, Meet with VC, light mode only, and a bunch of fixes**

A lot landed today.

**Ask an AI about me** — Added a section above the footer on every page with buttons to ask ChatGPT, Claude, or Perplexity who I am and what I write about. The question is pre-filled, so it's one click. AI is increasingly how people discover and research other people. Meeting visitors there felt more useful than a contact form.

**Meet with VC — now in the nav too** — The "Meet with VC" booking button (which links to a 30-minute Cal.com slot) is now in the top navigation on every page, on both desktop and mobile. Previously it only appeared in the Ask AI section at the bottom.

**Light mode only** — Removed the dark/light mode toggle. The site is permanently light now. Simpler, fewer things to maintain, one less decision for visitors. If you were using dark mode on this site, it just won't exist anymore.

**Accessibility: perfect score** — Google Lighthouse flags accessibility issues. Two came up: a line of text that was slightly too faint against its background (just barely below the readability threshold), and a button that said "Meet with VC" on screen but something different to screen readers. Both fixed. The site now scores 100 out of 100 for accessibility.

**Photos and file sizes** — The small circular photo used in the "Meet with VC" button was 104KB. The display size is 28 pixels wide. Resized it to under 3KB. Same quality, 37x smaller.

**Search and AI indexing** — Added a `robots.txt` file, which tells search engines how to crawl the site. It was missing entirely. Also added an `llms.txt` file — a plain-text summary of the site that AI systems can read when someone asks about me. It covers writing, work, the book, speaking, and the podcast.

**Security** — Moved all JavaScript into separate files (rather than embedded in the page), set a stricter policy on what scripts the site is allowed to run, and added a few other under-the-hood protections.

---

### 21 June 2026

**About page and side-quests update**

Filled out the GTM Buddy section on [/about](/about/) with more detail about what I actually do there. Updated the skills count. Removed dead links from a few internal projects on [/side-quests](/side-quests/) that were pointing to old GitHub repos.

---

### 20 June 2026

**Two new posts + RSS feed**

Published [Who owns what?](/who-owns-what/) and [Too much parenting, too little adulting](/too-much-parenting-too-little-adulting/). Also set up an RSS feed — the standard way for people to subscribe to a blog. Should have been there from day one.

---

### 16 June 2026

**New post + small fixes**

Published [Killed by Google](/killed-by-google/). Fixed the social icons on mobile that were sitting out of line. Made the "Also Read" section smarter — it now shows recent posts when there are no posts in the same category, instead of showing nothing.

---

### 12 June 2026

**Two new sections: /til and a live API**

Added [/til](/til/) for short notes — things I learn and want to remember, published as they happen rather than saved up for a long essay. Added a live JSON endpoint at `/api/latest.json` so my GitHub profile can automatically show the latest post without me having to update it manually.

---

### 24 May 2026

**Performance fixes + /uses-this refresh**

Ran a full site audit and fixed everything flagged. Updated [/uses-this](/uses-this/) to reflect what I actually use now: Obsidian, Cursor, Screen Studio, Quartr, and a few others that weren't there before.

---

### 18 May 2026

**Side-quests visual refresh**

The project cards on [/side-quests](/side-quests/) were feeling flat. Replaced the logos with pixel-art style wordmarks in a warm amber palette. Same information, more character.

---

### 17 May 2026

**Built from scratch and launched**

Rebuilt the site from scratch — moved from Jekyll's default theme to a fully custom design I call STARLIGHT (warm neutrals, deep blues, the same colour palette across everything). Set up automatic deploys so every change goes live as soon as it's pushed. Updated the favicon to a four-point star.

This is the version of the site that exists now.
