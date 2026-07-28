---
layout: page
title: Lazarus Pit
seo_title: Self-healing UX agent for websites | Lazarus Pit
description: A self-healing UX agent that reads Microsoft Clarity session data, diagnoses friction, and files GitHub issues with a proposed fix. Private repository, public output.
last_modified_at: 2026-07-28
intro: A self-healing UX agent that reads this site's Clarity sessions every week, diagnoses friction, and files a GitHub issue with a proposed fix. A human still merges.
project: true
project_name: Lazarus Pit
repo: lazarus-pit
state: Private
version: "0.1"
mcp: true
application_category: DeveloperApplication
application_subcategory: Website UX diagnostics
audience: People who own a website and already run Microsoft Clarity
software_requirements: Node.js 22, a Microsoft Clarity project token, and the GitHub CLI with repository scope
feature_list:
  - Weekly Clarity Data Export pull with a daily call budget
  - Threshold-based friction findings ranked by severity
  - Bot-adjusted traffic floor that suppresses noise
  - Fix suggestions mapped per metric
  - Deduplicated GitHub issues filed on the target repository
faqs:
  - question: Is Lazarus Pit open source?
    answer: No. The repository is private. Its output is public, because every issue it files lands on this website's public repository under the lazarus-pit label.
  - question: Does Lazarus Pit change code by itself?
    answer: No. It files a GitHub issue containing the metric, the hypothesis, and a suggested fix. A human reviews, edits, and merges. There is no automatic commit or deploy.
  - question: What data does Lazarus Pit read?
    answer: Only the Microsoft Clarity Data Export API for this site, which returns site-wide metrics such as dead clicks, rage clicks, quickbacks, scroll depth, and script errors. It does not read session recordings.
  - question: Why does it run weekly instead of daily?
    answer: Clarity's export API allows ten calls a day and a three-day lookback. One weekly run stays inside both limits and matches how quickly a small site accumulates enough human sessions to diagnose.
---

Lazarus Pit is a self-healing UX agent for this website. Every Monday it pulls Microsoft Clarity data, compares the numbers against friction thresholds, and files a GitHub issue naming the problem, the likely cause, and a fix worth trying.

The repository is private. Its output is not: every issue it has filed is visible in [this site's issue tracker](https://github.com/vcxcvii/vcxcvii.github.io/issues?q=label%3Alazarus-pit).

## What problem does it solve?

Analytics tools are good at telling you something is wrong and bad at making you do anything about it. Clarity records dead clicks, rage clicks, and quickbacks faithfully, then waits for a human to log in, notice, interpret, and act. On a personal site nobody logs in.

Lazarus Pit removes the logging-in step. The finding arrives where the work already happens, as an issue on the repository that renders the page.

## How does Lazarus Pit work?

Four modules run in sequence.

1. **Fetch.** `fetch-clarity.ts` calls the Clarity Data Export API for a three-day window and writes the raw response to disk. It tracks its own daily call budget locally and refuses to exceed ten calls a day.
2. **Diagnose.** `finding-extractor.ts` scores each metric against a warn threshold and a high threshold, then ranks the findings by severity.
3. **Map.** `component-mapper.ts` converts each finding into a titled suggestion: what the metric was, what it probably means, and where to look first.
4. **Propose.** `pr-generator.ts` files one GitHub issue per finding on the target repository, labelled `lazarus-pit`, skipping any finding whose issue is already open.

`run.ts` chains all four. A GitHub Actions workflow runs the chain every Monday at 14:00 UTC and can also be triggered by hand.

## What counts as friction?

| Metric | Warn | High | Reading |
|---|---|---|---|
| Dead clicks | 5% of sessions | 15% | Something looks clickable and is not |
| Rage clicks | 3% | 10% | Element is unresponsive or gives no feedback |
| Quickbacks | 10% | 25% | The link promised something the page did not deliver |
| Script errors | 1% | 5% | JavaScript failing inside real sessions |
| Error clicks | 1% | 5% | A click handler is breaking |
| Scroll depth | below 60% average | below 40% | Content past the fold is not being seen |

## Why does it refuse to diagnose small traffic?

The first version filed confident findings off eleven sessions, most of them bots. On that volume a single crawler moves a percentage several points and every threshold becomes noise.

So the agent now subtracts bot sessions from the total and checks the remainder against a floor of twenty human sessions. Below the floor it files one finding and stops: this is a distribution problem, not a friction problem. That single change is the difference between a tool that reports and a tool worth reading.

## Why does it not write the fix itself?

It could. Filing a patch is not the hard part.

The hard part is that a site-wide metric cannot tell you which page misbehaved. Clarity's export API returns numbers for the project, not per URL, so every finding is a site-level hypothesis. Auto-committing against a hypothesis produces confident, wrong diffs that a human then has to reverse. Issues cost a review click and lose nothing.

Escalating to generated pull requests is worth doing once finding quality has earned it. It has not yet.

## Why is the repository private?

Nothing in it is secret, but nothing in it is reusable either. Thresholds are tuned to one small site, findings are site-level by necessity, and the fix templates assume this site's components. Publishing it would ship a tool that mostly teaches people the wrong thresholds for their own traffic.

The parts worth copying are described on this page. If that changes, so will the repository.

## Latest meaningful changes

{% include project-changelog.html %}

## Questions people ask

{% include project-faqs.html %}

## Want to see what it caught?

Its findings are public: [browse the open and closed issues](https://github.com/vcxcvii/vcxcvii.github.io/issues?q=label%3Alazarus-pit) it filed against this site. If you are building something similar and want to compare thresholds, [book 30 minutes](https://cal.com/varun-choraria/30min).
