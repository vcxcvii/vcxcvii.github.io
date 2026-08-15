---
layout: page
title: Lazarus Pit
seo_title: Lazarus Pit, a retired self-healing UX agent
description: Retired. A self-healing UX agent that read Microsoft Clarity data, diagnosed friction, and filed GitHub issues with a proposed fix. What it did, and what it taught me about diagnosing on small traffic.
last_modified_at: 2026-08-16
intro: Retired. A self-healing UX agent that read this site's Clarity sessions every week, diagnosed friction, and filed a GitHub issue with a proposed fix. A human still merged.
state: Retired
mcp: true
feature_list:
  - Weekly Clarity Data Export pull with a daily call budget
  - Threshold-based friction findings ranked by severity
  - Bot-adjusted traffic floor that suppresses noise
  - Fix suggestions mapped per metric
  - Deduplicated GitHub issues filed on the target repository
faqs:
  - question: Is Lazarus Pit still available?
    answer: No. It is retired. The repository it was built in was renamed and is now Rainmaker, so there is no Lazarus Pit to install. Its output stayed public, and every issue it filed is still on this website's public repository under the lazarus-pit label.
  - question: Did Lazarus Pit change code by itself?
    answer: No. It filed a GitHub issue containing the metric, the hypothesis, and a suggested fix. A human reviewed, edited, and merged. There was no automatic commit or deploy.
  - question: What data did Lazarus Pit read?
    answer: Only the Microsoft Clarity Data Export API for this site, which returns site-wide metrics such as dead clicks, rage clicks, quickbacks, scroll depth, and script errors. It never read session recordings.
  - question: Why did it run weekly instead of daily?
    answer: Clarity's export API allows ten calls a day and a three-day lookback. One weekly run stayed inside both limits and matched how quickly a small site accumulates enough human sessions to diagnose.
---

**Retired.** The repository this was built in was renamed and is now [Rainmaker](/side-quests/rainmaker/), so Lazarus Pit no longer exists as a separate project and there is nothing to install. This page stays up because the traffic-floor problem below is the useful part, and I would rather leave the reasoning where someone can find it than delete it.

Lazarus Pit was a self-healing UX agent for this website. Every Monday it pulled Microsoft Clarity data, compared the numbers against friction thresholds, and filed a GitHub issue naming the problem, the likely cause, and a fix worth trying.

The repository was private. Its output was not: every issue it filed is still visible in [this site's issue tracker](https://github.com/vcxcvii/vcxcvii.github.io/issues?q=label%3Alazarus-pit).

## What problem did it solve?

Analytics tools are good at telling you something is wrong and bad at making you do anything about it. Clarity records dead clicks, rage clicks, and quickbacks faithfully, then waits for a human to log in, notice, interpret, and act. On a personal site nobody logs in.

Lazarus Pit removed the logging-in step. The finding arrived where the work already happened, as an issue on the repository that renders the page.

## How did Lazarus Pit work?

Four modules ran in sequence.

1. **Fetch.** `fetch-clarity.ts` called the Clarity Data Export API for a three-day window and wrote the raw response to disk. It tracked its own daily call budget locally and refused to exceed ten calls a day.
2. **Diagnose.** `finding-extractor.ts` scored each metric against a warn threshold and a high threshold, then ranked the findings by severity.
3. **Map.** `component-mapper.ts` turned each finding into a titled suggestion: what the metric was, what it probably meant, and where to look first.
4. **Propose.** `pr-generator.ts` filed one GitHub issue per finding on the target repository, labelled `lazarus-pit`, skipping any finding whose issue was already open.

`run.ts` chained all four. A GitHub Actions workflow ran the chain every Monday at 14:00 UTC, and could also be triggered by hand.

## What counts as friction?

| Metric | Warn | High | Reading |
|---|---|---|---|
| Dead clicks | 5% of sessions | 15% | Something looks clickable and is not |
| Rage clicks | 3% | 10% | Element is unresponsive or gives no feedback |
| Quickbacks | 10% | 25% | The link promised something the page did not deliver |
| Script errors | 1% | 5% | JavaScript failing inside real sessions |
| Error clicks | 1% | 5% | A click handler is breaking |
| Scroll depth | below 60% average | below 40% | Content past the fold is not being seen |

## Why did it refuse to diagnose small traffic?

The first version filed confident findings off eleven sessions, most of them bots. On that volume a single crawler moves a percentage several points and every threshold becomes noise.

So it subtracted bot sessions from the total and checked the remainder against a floor of twenty human sessions. Below the floor it filed one finding and stopped: this is a distribution problem, not a friction problem. That single change was the difference between a tool that reports and a tool worth reading, and it is the part of this page still worth reading.

## Why did it not write the fix itself?

It could have. Filing a patch is not the hard part.

The hard part is that a site-wide metric cannot tell you which page misbehaved. Clarity's export API returns numbers for the project, not per URL, so every finding is a site-level hypothesis. Auto-committing against a hypothesis produces confident, wrong diffs that a human then has to reverse. Issues cost a review click and lose nothing.

Escalating to generated pull requests would have been worth doing once finding quality earned it. It never got there.

## Why was the repository private?

Nothing in it was secret, but nothing in it was reusable either. Thresholds were tuned to one small site, findings were site-level by necessity, and the fix templates assumed this site's components. Publishing it would have shipped a tool that mostly teaches people the wrong thresholds for their own traffic.

The parts worth copying are described on this page, which is why the page outlived the project.

## Questions people ask

{% include project-faqs.html %}

## Want to see what it caught?

Its findings outlived it: [browse the open and closed issues](https://github.com/vcxcvii/vcxcvii.github.io/issues?q=label%3Alazarus-pit) it filed against this site. If you are building something similar and want to compare thresholds, [book 30 minutes](https://cal.com/varun-choraria/30min).
