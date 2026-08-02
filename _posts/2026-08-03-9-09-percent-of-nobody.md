---
title: "11 sessions are not a UX audit"
seo_title: "What my AI UX agent got wrong about 11 sessions"
permalink: /11-sessions-are-not-a-ux-audit/
redirect_from:
  - /9-09-percent-of-nobody/
  - /my-site-audits-itself-its-very-confident-about-11-people/
date: 2026-08-03 00:00:00 +0530
description: "My UX agent turned 1 dead-click session into a 9.09% finding. The arithmetic was right. The data could not support the work it recommended."
last_modified_at: 2026-08-03 00:00:00 +0530
mcp: true
tags:
  - ai
  - analytics
  - design
---

I built a small agent called Lazarus Pit because I knew I was not going to remember to open Microsoft Clarity every Monday.

Its job is narrow. It reads the site's project-wide Clarity export, compares the metrics against a few thresholds, and files a GitHub issue with a hypothesis and a suggested fix. It can propose work. It cannot change the site.

The first live run was on July 10. It had 11 sessions to work with and filed these 3 issues:

1. Dead clicks detected, 9.09% of sessions
2. High quickback rate, 18.18% of sessions
3. Low average scroll depth, 57.53%

I ran it again 25 minutes later. Scroll depth had moved to 57.78%, so it filed the same issue again with a different number in the title. That was the first bug.

## The arithmetic was right

9.09% of 11 sessions is 1 session. 18.18% is 2 sessions.

Those are sessions, not people. One person can create more than one session, and the project-wide export does not tell the agent which page or element produced the dead click.

The dead-click issue still recommended auditing anything styled like a link or button. The quickback issue recommended comparing link copy with destination pages. Both suggestions are reasonable things to inspect. Neither follows from the data the agent had.

That distinction matters. The agent had found a signal. It wrote up a diagnosis.

The percentage made the jump easy to miss. `1 of 11 sessions` sounds like something to watch. `9.09% of sessions, threshold 5%` sounds like work has already been justified. It had not.

## I fixed the rules, then ran it again

The duplicate was easy. I had used the live metric value inside the issue title, then used that title to check whether an issue already existed. `57.53%` and `57.78%` looked like different findings to the code. I removed the number from the deduplication key that day.

The denominator needed a separate rule. On July 13, I added a floor of 20 human sessions. Bot sessions get subtracted first. Below that floor, the agent skips every UX finding.

The next run had 0 human sessions. It filed one issue:

> **Metric:** Traffic, 0 (threshold 20)
>
> **Hypothesis:** Too few human (non-bot) sessions in the window to diagnose UX. This is a distribution problem, not a friction problem. Skipping all other findings until traffic clears the floor.

This was useful. Not because the agent had developed judgment between runs, but because I had finally written down when it should stop.

The floor is still blunt. 20 sessions do not suddenly make every percentage meaningful. They only prevent the worst version of this mistake.

## What still needs fixing

Every rate should show its count and denominator. `1/11 sessions (9.09%)`, not `9.09%` alone.

A site-wide metric should stay a site-wide observation. Without a page, element, or session recording, the agent cannot support a specific page fix.

One weak window should create a note, not a task. I have not decided how many repeat runs should turn that note into work.

I still like the shape of the system. Analytics gets read. Findings arrive where the site work already happens. Nothing edits itself before I have looked at it.

But the first run did not find a UX problem. It found a problem in my agent: I had taught it when a number crossed a threshold, but not when the underlying data was too weak to deserve a recommendation.
