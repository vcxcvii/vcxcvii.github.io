---
title: "I let an agent audit my own site, and it filed five issues"
seo_title: "An agent audited my site and filed five issues"
date: 2026-08-03 00:00:00 +0530
description: "Lazarus Pit reads my analytics weekly and files GitHub issues. Five so far. Four still open, one a duplicate, and the best one told me to stop looking."
last_modified_at: 2026-08-03 00:00:00 +0530
mcp: true
tags:
  - ai
  - analytics
  - design
---

I built a small agent called Lazarus Pit and pointed it at this site.

The job is narrow. Once a week it reads the behavioural data from my analytics, looks for friction, and files a GitHub issue with a metric, a hypothesis, and a suggested fix. A human still merges. It has never had permission to change a line of this site.

It has filed five issues so far. Four are still open. One is a duplicate of another one. And the best thing it produced was a refusal to do its job.

I write a lot about giving agents real work, so it seems fair to show one graded on my own site rather than someone else's.

## What it filed

Here are all five, verbatim from the titles.

1. Dead clicks detected, 9.09% of sessions
2. High quickback rate, 18.18% of sessions
3. Low average scroll depth, 57.53%
4. Low average scroll depth, 57.78%
5. Traffic anomaly

Read that list again and the first problem is sitting in plain sight. Three and four are the same finding. It filed the scroll-depth issue, then filed it again 25 minutes later with the number moved by a quarter of a percentage point.

I closed one as a duplicate. That's the only issue I've closed.

## The number that should have stopped it

Look at the percentages.

9.09% is 1 in 11. 18.18% is 2 in 11.

The whole dataset was **11 sessions**. The agent looked at 11 visits, found dead clicks in one of them, and reported it to two decimal places.

Nothing it said was false. One session did have dead clicks. But "9.09% of sessions, threshold 5%" reads like a measurement, and what actually happened was that one person clicked something that wasn't a button. Two decimal places on a sample of 11 is not precision. It's the costume precision wears.

This is the failure I'd care most about if I were shipping this to someone else. Not a wrong answer, a confident one. If you handed that issue to a junior marketer, they'd spend a day auditing button styles because the number looked rigorous.

The fix is boring and I should have written it first: report the raw count next to the rate, and don't file anything below a minimum sample size. 1 in 11 is a note. 9.09% is a finding. They're the same fact and only one of them makes people do work.

## The best thing it did was refuse

Issue five is the one I'd keep.

> **Metric:** Traffic, 0 (threshold 20)
>
> **Hypothesis:** Too few human (non-bot) sessions in the window to diagnose UX. This is a distribution problem, not a friction problem. Skipping all other findings until traffic clears the floor.

It looked at the week, found almost no real human traffic, and stopped. It didn't file four more scroll-depth issues. It didn't generate hypotheses about a page nobody visited. It named the actual problem, which was that I had a traffic problem and not a UX problem, and then it declined to keep working.

That's better judgment than most reporting I've seen from people, and it's better judgment than the same agent showed in issues one through four.

The difference isn't intelligence. It's that somebody wrote a floor into it. A threshold of 20 sessions exists, so below 20 it stops. There is no threshold on "how many sessions before a percentage is meaningful," so it happily computed one from 11.

Every gap you don't write becomes a confident output.

## Why four are still open

The honest reason is that I don't believe most of them yet.

Dead clicks on 1 session out of 11 doesn't tell me which element or which page. Quickback on two sessions could be two people who found what they needed and left, which on a personal site is a good outcome, not a leak. Scroll depth of 57% on essays that run 2,000 words is roughly what you'd expect from people reading the top and deciding.

Issue five is the one that's actually true, and it's the one I can't fix by editing a page.

So the four open issues aren't a backlog. They're a record of an agent that was working correctly on data too thin to support a conclusion, which is a state that looks identical to working correctly on good data unless you check the denominator.

## What I changed

Three things, and only one of them is in the site.

**The site fix.** The traffic issue was right, so I stopped treating this as a UX problem and started treating it as a distribution problem. That's why there's now [an MCP server](/mcp/) and an [RSS feed](/feed/) with their own pages, and why I've been writing about what I actually build instead of about management.

**The agent fix.** Raw counts next to every rate, and a minimum sample size before anything gets filed. Same change, two forms.

**The habit fix.** The duplicate is the one that bothers me least and taught me most. It filed the same finding twice because nothing checked whether an open issue already said it. That's not an AI problem, it's the thing every alerting system in history has got wrong, and I got it wrong again because I was busy being impressed that the agent could file issues at all.

## What I'd tell you to copy

Not the agent. The shape.

Give it read access and no write access. Make it file a proposal, not a change. Make a human merge. Mine has never touched this site and I intend to keep it that way, because the moment it can edit, every one of the five issues above becomes a commit I have to review anyway, except now it's already happened.

Then look hard at your denominators. The most dangerous output an agent produces isn't a hallucination, because you can catch those. It's a true statement computed from a sample too small to mean anything, formatted to two decimal places, in a template that looks like every correct finding you've ever read.

9.09%. One person. Same fact, and only one of them would have cost me a day.
