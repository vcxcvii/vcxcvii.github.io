---
title: Changelog
description: A running log of what changed on this site and why.
no_sidebar: true
---

A running log of what changed on this site and why. The goal is to be honest about the decisions behind how this site evolves.

---

### 23 June 2026

**Ask AI footer + Security hardening**

Added the "Ask AI" section that now sits above the footer on every page. Buttons link to ChatGPT, Claude, and Perplexity with a prefilled question about me, and a fourth button books time directly via Cal.com. The thinking: AI is increasingly the first place people look someone up. Meeting them there felt more useful than a contact form.

Security audit run against the OWASP Top 10 and patched airtight: extracted all inline JavaScript into external files so a real Content Security Policy (CSP) could be enforced without `unsafe-inline`, added `Referrer-Policy`, moved `webrick` to dev-only dependency, added `| escape` filters on all Liquid class attribute interpolations.

---

### 21 June 2026

**Profile and side-quests updates**

Expanded the GTM Buddy section on /about with current role and resume detail. Updated skill count to 55+, removed stale GitHub links from internal projects on /side-quests.

---

### 20 June 2026

**Two new posts + RSS feed**

Published [Who owns what?](/who-owns-what/) and [Too much parenting, too little adulting](/too-much-parenting-too-little-adulting/). Also wired up an RSS feed via `jekyll-feed` — should have been there from day one.

---

### 16 June 2026

**Fixes and a new post**

Published [Killed by Google](/killed-by-google/). Fixed mobile social icons that were misaligned. Added fallback logic so "Also Read" shows recent posts when no tag matches exist. Made tags required on all posts to prevent future indexing gaps.

---

### 12 June 2026

**New sections: /til and /api**

Added a `/til` section for short, atomic notes. Added `/api/latest.json` so my GitHub profile README can stay in sync with the latest post automatically without manual updates. Added a `notes:` prefix to the homepage stream to visually separate short notes from longer essays.

---

### 24 May 2026

**Lighthouse pass + /uses-this refresh**

Ran a full Lighthouse audit and fixed the remaining accessibility and performance failures. Updated /uses-this with tools I actually use now: CodexBar, Obsidian, Quartr, SwanAI, Podpitch, Screen Studio, Cursor, cmux.

---

### 18 May 2026

**Side-quests visual refresh**

Replaced the project logos with pixel-art wordmarks in a retro amber palette. The side-quests page was feeling flat; this gives each project a little more character without breaking the minimal overall design.

---

### 17 May 2026

**Launch infrastructure**

Set up GitHub Actions to automatically build and deploy the site to GitHub Pages on every push. Before this, deploys were manual. Also introduced the STARLIGHT design system (the custom color palette the site runs on), updated the favicon to a 4-point star, and cleaned up the repo to stop tracking build artifacts.

This was the rebuild from scratch: moved from Jekyll's default theme to a fully custom layout built around STARLIGHT.
