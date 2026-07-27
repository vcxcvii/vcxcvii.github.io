---
layout: page
title: Interview Recon
seo_title: Interview Recon | AI interview research skill
description: A free skill that turns Claude Code, Codex or Cursor into an interview research analyst. Company dossier, JD-mapped talking points, 90-day plan.
intro: Turn your AI coding agent into an interview research analyst. Free, MIT, and designed to work without a paid scraping API.
project: true
project_name: interview-recon
repo: interview-recon
repo_url: https://github.com/vcxcvii/interview-recon
license: MIT
state: Public
mcp: true
---

Most candidates skim the company website the night before. Then they walk in and say something the other four candidates also said.

The problem is not effort. It is that real company research takes a week, and nobody has a week.

## What is interview-recon?

It is an [Agent Skill](https://agentskills.io/specification.md) that makes your AI coding agent research a company the way a strategy consultant would, then write up what a *candidate* needs rather than what a salesperson needs.

You say "prep me for my interview at Acme." It saves the job description first, because listings vanish. It proposes a short research plan and waits for you to approve it. Then it works through a fixed spine: products and pricing, competitors, content footprint, leadership and hiring signals, news and funding, and the latest earnings calls of any public company in the same space.

That last one matters more than it sounds. Private companies do not publish numbers. Their public neighbours do, and those calls set the narrative your interviewer is living inside.

Out the other end comes a folder on your machine: a one-page brief, a strategy canvas, a go-to-market teardown, a people page, and the interview kit. Every claim carries a numbered source with a URL and a date. No "trust me" facts.

## Why I built it

I built it during my own 2026 job hunt, which is a polite way of saying I built it because I needed it.

I was running several processes at once and kept arriving at calls with research I could not remember the source of. Worse, I kept doing the same work twice, because nothing carried from round one into round two.

So the skill persists. Run it again before the next round and it loads what it already knows, refreshes only what went stale, and logs what the last round actually asked.

The full story, with screenshots, is in [Hunting Season for the Rest of Us](/hunting-season-for-the-rest-of-us/).

## Do I need a paid scraping API?

No, and this part was deliberate.

With a [Firecrawl](https://firecrawl.dev) key, the free tier refills monthly, it uses a scraping script and announces its credit budget up front. Fifteen credits in quick mode, forty in deep mode, and it never exceeds that without asking.

Without any key, it uses your agent's built-in web search and fetch. Same workflow, same outputs. It tells you which pages might be incomplete, like JavaScript-heavy pricing pages or bot-protected review sites, instead of failing quietly and pretending it looked.

Most research skills prescribe paid tools and degrade silently when you do not have them. This one announces its backend, its budget, and what is lost, every single time.

## How do I install it?

For [Claude Code](https://claude.com/claude-code):

```bash
git clone https://github.com/vcxcvii/interview-recon.git ~/.claude/skills/interview-recon
```

That is the whole install. Open Claude Code and say "prep me for my interview at [company]".

It works with any agent that supports the Agent Skills format. Point your agent's skills directory at the folder.

## What outcomes can I expect?

- **A dossier you can actually use in the room**, not a research dump. JD-mapped talking points, a 90-day plan grounded in the company's real moves, and questions to ask that no other candidate will ask.
- **Sourced claims.** Every number links to where it came from and when it was fetched, so nothing embarrasses you when the interviewer knows their own business better than the internet does.
- **Something that survives round two.** The dossier is append-only across rounds.
- **Roughly an afternoon instead of a week**, assuming you actually read what it produces.

What it will not do: see anything private, replace your judgment, or make you sound like someone you are not. It sees what is public. The rest is still your job.

## What changed recently

{% assign entries = site.data.quest_releases[page.repo] %}{% if entries and entries.size > 0 %}{% for e in entries limit: 5 %}
**{{ e.date }}** · {{ e.title }}{% if e.url %} · [view]({{ e.url }}){% endif %}
{% if e.body %}
{{ e.body }}
{% endif %}{% endfor %}
{% else %}
Nothing logged yet. The changelog refreshes itself from the repository.
{% endif %}

## Found a bug, or want it to do something else?

Tell me. [Book 30 minutes on my calendar](https://cal.com/varun-choraria/30min), or open an issue on [the repo]({{ page.repo_url }}).

It is MIT licensed. Steal it, fork it, break it, improve it. Job hunting is hard enough without paywalled prep.

If you also want case-interview frameworks, [master-shifu](/side-quests/master-shifu/) chains into this one. Everything else I have built is on [side quests](/side-quests/).
