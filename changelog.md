---
title: Changelog
description: A running log of what changed on this site and why.
no_sidebar: true
---

A running log of what changed on this site and why. The goal is to be honest about the decisions behind how this site evolves.

---

### 28 June 2026

**MCP page and RSS feed page**

Two new utility pages.

**Connect via MCP — [/mcp/](/mcp/)** — This site now supports the [Model Context Protocol](https://github.com/jasonjmcghee/WebMCP), an open standard that lets AI agents read websites directly. If you use Claude Desktop or Cursor, you can connect your agent to this site and ask it to search or summarise anything I've written. Four tools are exposed: list all posts, get a specific post by slug, search by keyword, and pull site info. Setup takes about two minutes — instructions are on the page.

**RSS feed page — [/feed/](/feed/)** — The site has had an RSS feed since June 20 but no dedicated page explaining it. Fixed that. The page covers the feed URL, how to subscribe, and a short list of RSS readers worth trying. I use [NetNewsWire](https://netnewswire.com/) — free, open-source, Mac and iOS.

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
