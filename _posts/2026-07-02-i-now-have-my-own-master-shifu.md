---
title: "I now have my own Master Shifu"
date: 2026-07-02 00:00:00 +0530
description: I turned 32 consulting frameworks from 19 MBA casebooks into AI commands and named the whole thing after Master Shifu. Every agent needs a teacher.
tags:
  - ai
  - frameworks
  - strategy
---

I've been collecting consulting casebooks for about a decade. Kellogg, Wharton, Ross, Darden, IIM (A, B, C, I, L), MDI, Drucker, McKinsey, Victor Cheng, Crack the Case — 19 books in total, some of them 300+ pages.

They teach you how to think about business problems. Profitability, market entry, pricing, M&A, operations — each framework is a lens. A structured way to decompose something messy into something solvable.

For years they sat in my iCloud collecting dust. I'd pull one out before a big work presentation or to prep for a strategy conversation, but the friction of *finding the right framework, remembering the steps, applying it correctly under pressure* meant I mostly just winged it.

Like most people do.

Last month, I fed every single book to Claude and turned each framework into a `/command`. Named the whole thing **Master Shifu** — because every AI agent needs a cranky old panda who forces it to think before it acts.

---

## Why frameworks fail in practice

Here's the thing about frameworks: they're not the problem. The problem is how we use them.

Walk into any meeting where someone says "let's run a SWOT analysis" and watch what happens. People brainstorm strengths for five minutes, skip weaknesses because it feels negative, make up a couple threats, and call it a day. The framework was present. The rigor was absent.

I've done this. You've done this. We've all done this.

A framework is only as good as the discipline with which it's applied. And discipline is scarce. Especially when you're in a room with six other people, the clock is ticking, and the CEO is looking at you expectantly.

That's where the idea started. Not "let's build an AI that knows frameworks" — there's a million of those. But *"let's build an AI that doesn't skip steps."*

---

## The five phases

The flow is simple but the difference is in the order.

When you tell Master Shifu a problem — say, "my SaaS margins are shrinking and I'm thinking about entering Brazil" — it doesn't jump to conclusions. It runs five phases:

**1. Grilling.** Round after round of clarifying questions. "What data do you have? How do you define margin? Is revenue growing or flat? What's your current unit economics? Do you have any competitors in Brazil already?" It's annoying on purpose. Most problems fall apart in the first five minutes if you ask the right questions.

**2. Five lenses.** Before picking a framework, it looks at the problem from five angles: customer, competition, financial, operational, and market. Each lens can auto-populate with real data via web scraping. The competition lens will check if your competitor changed pricing last week. The financial lens can pull SEC filings. The market lens scrapes industry news.

**3. Framework match.** Based on the enriched context, it selects 1-3 frameworks. Not a random guess — pattern-matched against the problem language and the lens outputs. It might return profitability + industry analysis + pricing. Or market entry + Porter's Five Forces + break-even. Depends on what the problem actually needs.

**4. Apply.** Each framework runs end-to-end. Step by step. It doesn't skip the unattractive quadrant of Porter's Five Forces. It doesn't forget to calculate contribution margin in a break-even analysis. It applies the same rigor every time.

**5. Synthesize.** The outputs from multiple frameworks are merged into a coherent recommendation. If profitability analysis pinpoints the problem as volume decline in Europe, and industry analysis flags a new entrant with lower pricing, the synthesis connects those dots explicitly.

I've caught myself reading the output and thinking *"huh, I wouldn't have made that connection."* That's the whole point. I'm not outsourcing my thinking — I'm using the AI to catch the gaps in it.

---

## 32 frameworks

Currently there are 32. The heavy hitters:

- `/profitability` — P = R - C, segmented by product/channel/region
- `/market-entry` — attractiveness → feasibility → competitive response
- `/pricing` — cost-based, competitor-based, value-based with elasticity
- `/industry-analysis` — Porter's Five Forces, soup to nuts
- `/m-and-a-fit` — synergies, one-way exploitation, integration risk
- `/issue-tree` — MECE decomposition, hypothesis driven
- `/growth-strategy` — Ansoff Matrix, the whole grid
- `/bcg-matrix` — stars, cash cows, question marks, dogs

Plus the less glamorous ones that matter more than people admit: due diligence, non-profit strategy, capacity expansion, outsourcing decisions, supply-demand analysis.

Because the real world isn't a case interview. Sometimes you need to figure out whether to build a second factory in Vietnam. That's a capacity expansion problem, not a profitability problem, and the tool should know the difference.

---

## The meta-skill twist

There's a skill called `task-observer` that watches every session and logs what the agent got wrong.

At the end of a heavy session, I just ask *"Any observations?"* and it surfaces things like:

> "You ran the profitability framework but didn't segment by channel. The issue tree would have caught this. Update the profitability skill to cross-reference issue tree for root cause isolation?"

Or:

> "The market entry analysis used outdated competitor data. Schedule the competition monitor to refresh weekly."

Meta, I know. But it's the closest thing I've built to a self-improving system. Every session makes the next one better.

---

## The deeper point

I've been thinking a lot about what happens when your AI is no longer a question-answer machine but an actual extension of how you reason about problems.

The ceiling isn't on the framework side — anyone can google "Porter's Five Forces" and get a template. The ceiling is on the application side. Running it without bias, without skipping the hard parts, without rushing to confirm what you already believe.

That's what Master Shifu does for me. Not because the AI is smart — because the structure is enforced. The scaffolding holds.

---

It's open source, MIT licensed. Because structured thinking shouldn't be paywalled.

```bash
curl -fsSL https://raw.githubusercontent.com/vcxcvii/master-shifu/main/install.sh | bash
```

Or on my GitHub: [github.com/vcxcvii/master-shifu](https://github.com/vcxcvii/master-shifu)

If you're a consultant, founder, PM, or just someone who wants their AI to think in frameworks instead of vibes — it's yours. Steal it, fork it, break it, improve it. That's what open source is for.

## Also read

- [Maybe going around CIRCLES is worth it](/maybe-going-around-circles-is-worth-it/) 26 Jun 2026
- [Killed By Google](/killed-by-google/) 16 Jun 2026
- [Team values I value](/team-values-i-value/) 25 Apr 2026
