---
title: "9.09% of nobody"
seo_title: "What my site's UX agent got wrong about 11 visitors"
permalink: /9-09-percent-of-nobody/
redirect_from:
  - /my-site-audits-itself-its-very-confident-about-11-people/
date: 2026-08-03 00:00:00 +0530
description: "An agent reads my analytics weekly and files GitHub issues. It filed 5. The percentages looked rigorous until I worked out the denominator was 11 sessions."
last_modified_at: 2026-08-03 00:00:00 +0530
mcp: true
tags:
  - ai
  - analytics
  - design
---

There's a small agent that reads this site's analytics every week and files a GitHub issue whenever it finds friction. Metric, hypothesis, suggested fix.

A human still merges, and it has never had permission to touch a line of this site.

It has filed 5 issues so far. 4 are still open, 1 is a duplicate of another one, and the best thing it ever did was refuse to do its job.

I've written about [my agents breaking](/the-models-were-fine-i-was-the-bug/) before. This one didn't break, which turned out to be the more interesting problem.

## What it filed

All 5, straight from the issue titles:

1. Dead clicks detected, 9.09% of sessions
2. High quickback rate, 18.18% of sessions
3. Low average scroll depth, 57.53%
4. Low average scroll depth, 57.78%
5. Traffic anomaly

Read that list again and the first problem is already sitting in it. Issues 3 and 4 are the same finding.

It filed the scroll-depth issue, then filed it again 25 minutes later with the number moved by a quarter of a percentage point.

I closed 1 as a duplicate, and that is still the only issue I have closed.

## The denominator

Those percentages are worth doing the arithmetic on. 9.09% is 1 in 11, and 18.18% is 2 in 11.

The whole dataset was 11 sessions. The agent looked at 11 visits, found dead clicks in 1 of them, and reported it to 2 decimal places.

Nothing it said was false, because 1 session genuinely did have dead clicks.

But "9.09% of sessions, threshold 5%" reads like a measurement, when what actually happened is that one person clicked something that wasn't a button. 2 decimal places on a sample of 11 isn't precision. It just looks like it.

That's the failure I'd care about if I were shipping this to a client. It isn't a wrong answer, it's a confident one.

Hand that issue to a junior marketer and they'll spend a day auditing button styles, purely because the number looked rigorous.

The fix is boring and I should have built it first. Put the raw count next to the rate, and refuse to file anything below a minimum sample size.

1 in 11 is a note, 9.09% is a finding, and only one of those makes somebody do work.

## The best thing it did was quit

Issue 5 is the one I'd keep:

> **Metric:** Traffic, 0 (threshold 20)
>
> **Hypothesis:** Too few human (non-bot) sessions in the window to diagnose UX. This is a distribution problem, not a friction problem. Skipping all other findings until traffic clears the floor.

It looked at the week, saw almost no real humans, and stopped. It didn't file 4 more scroll-depth issues or invent hypotheses about a page nobody visited.

It said I didn't have a UX problem, I had a nobody-is-here problem, and then it declined to pretend otherwise.

That's better judgment than plenty of reporting I've sat through, and it's better judgment than the same agent showed 25 minutes earlier.

The difference isn't intelligence. Somebody wrote a floor into it, so there's a threshold of 20 sessions and below 20 it stops.

Nobody wrote a threshold for how many sessions a percentage needs before it means anything, so it happily calculated one from 11.

If you don't set a rule, the agent still gives you an answer. It just gives you a bad one, confidently.

## Why 4 of them are still open

Honestly, because I don't believe most of them yet.

Dead clicks on 1 session out of 11 doesn't tell me which element or which page.

Quickback on 2 sessions might be 2 people who found what they wanted and left, which on a personal site is a good outcome rather than a leak.

Scroll depth of 57% on essays that run 2,000 words is roughly what you'd expect from people who read the top and made up their minds.

Issue 5 is the one that's true, and it's the one I can't fix by editing a page.

So those 4 open issues aren't a backlog. They're a record of an agent working correctly on data too thin to hold a conclusion, which looks identical to working correctly on good data unless you check the denominator.

## What I actually changed

3 things, and only 1 of them is in the site.

The site first. The traffic issue was right, so I stopped treating this as a UX problem and started treating it as a distribution problem.

That's why there's now an [MCP server](/mcp/) and an [RSS feed](/feed/) with their own pages, and why I've been writing about what I build rather than about management.

The agent second. Raw counts next to every rate, and a minimum sample size before anything gets filed.

Me third, and this is the one that stung. The duplicate got filed because nothing checked whether an open issue already said the same thing.

That isn't an AI problem, it's the thing every alerting system in history has got wrong. I got it wrong again because I was too busy being impressed that the thing could file issues at all.

## Steal the shape, not the agent

Read access, no write access. It files a proposal rather than a change, and a human merges it.

Mine has never touched this site and I intend to keep it that way. The moment it can edit, all 5 of those issues become commits I have to review anyway, except now they've already happened.

Then go and look at your own denominators. The most dangerous thing an agent hands you isn't a hallucination, because you can catch those.

It's a true statement worked out from a sample too small to mean anything, written up to 2 decimal places, in a template that looks exactly like every correct finding you've ever read.

9.09% of my visitors hit a problem. That was one guy, and he may well have been me.
