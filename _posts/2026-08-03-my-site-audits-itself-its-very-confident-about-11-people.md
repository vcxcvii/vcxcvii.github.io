---
title: "My site audits itself. It's very confident about 11 people."
seo_title: "My site audits itself, on a sample of 11 people"
date: 2026-08-03 00:00:00 +0530
description: "An agent reads my analytics every week and files GitHub issues. It filed five. One was a duplicate of itself, and the best one told me to stop looking."
last_modified_at: 2026-08-03 00:00:00 +0530
mcp: true
tags:
  - ai
  - analytics
  - design
---

There's a small agent that reads this site's analytics every week, looks for friction, and files a GitHub issue when it finds some. Metric, hypothesis, suggested fix. A human still merges. It has never had permission to touch a line of this site.

It's filed five issues.

Four are still open. One is a duplicate of another one. And the best thing it ever produced was refusing to do its job.

I've written about [my agents breaking](/the-models-were-fine-i-was-the-bug/) before. This one didn't break. It worked exactly as designed, which turned out to be the problem.

## What it filed

All five, straight from the titles.

1. Dead clicks detected, 9.09% of sessions
2. High quickback rate, 18.18% of sessions
3. Low average scroll depth, 57.53%
4. Low average scroll depth, 57.78%
5. Traffic anomaly

Read that again and the first problem is right there in the open. Three and four are the same finding. It filed the scroll-depth issue, then filed it again 25 minutes later with the number moved by a quarter of a percentage point.

I closed one as a duplicate. That's the only issue I've closed.

## 9.09% is one guy

Look at those percentages properly.

9.09% is one in eleven. 18.18% is two in eleven.

The whole dataset was **eleven sessions**.

The agent looked at eleven visits, found dead clicks in one of them, and reported it to two decimal places.

Nothing it said was false. One session did have dead clicks. But "9.09% of sessions, threshold 5%" reads like a measurement, and what actually happened is that one person clicked something that wasn't a button.

Two decimal places on a sample of eleven isn't precision. It's the costume precision wears.

That's the failure I'd care about if I were shipping this to anyone else. Not a wrong answer. A confident one. Hand that issue to a junior marketer and they'll spend a day auditing button styles, because the number looked rigorous.

The fix is boring and I should have built it first. Put the raw count next to the rate. Don't file anything below a minimum sample size.

One in eleven is a note. 9.09% is a finding. Same fact, and only one of them makes somebody do work.

## The best thing it did was quit

Issue five is the one I'd keep.

> **Metric:** Traffic, 0 (threshold 20)
>
> **Hypothesis:** Too few human (non-bot) sessions in the window to diagnose UX. This is a distribution problem, not a friction problem. Skipping all other findings until traffic clears the floor.

It looked at the week, saw almost no real humans, and stopped.

It didn't file four more scroll-depth issues. It didn't invent hypotheses about a page nobody visited. It said, in effect, you don't have a UX problem, you have a nobody-is-here problem, and I'm not going to pretend otherwise.

That's better judgment than most reporting I've sat through. It's also better judgment than the same agent showed in issues one through four, which is the interesting bit.

The difference isn't intelligence. Somebody wrote a floor into it. There's a threshold of twenty sessions, so below twenty it stops. There's no threshold on "how many sessions before a percentage means anything," so it happily calculated one from eleven.

Every gap you don't write becomes a confident output.

## Why four are still sitting there

Honestly? I don't believe most of them.

Dead clicks on one session out of eleven doesn't tell me which element, or which page. Quickback on two sessions might be two people who found what they wanted and left, which on a personal site is a good day, not a leak. 57% scroll depth on essays that run 2,000 words is roughly what you'd expect from people reading the top and making up their minds.

Issue five is the one that's true, and it's the one I can't fix by editing a page.

So those four open issues aren't a backlog. They're a record of an agent working correctly on data too thin to hold a conclusion. Which looks identical to working correctly on good data, unless you check the denominator.

## What I actually changed

Three things, and only one of them is in the site.

**The site.** The traffic issue was right, so I stopped treating this as a UX problem and started treating it as a distribution problem. That's why there's now an [MCP server](/mcp/) and an [RSS feed](/feed/) with their own pages, and why I've been writing about what I build instead of about management.

**The agent.** Raw counts next to every rate. A minimum sample size before anything gets filed.

**Me.** The duplicate bothers me least and taught me most. It filed the same finding twice because nothing checked whether an open issue already said it. That's not an AI problem. That's the thing every alerting system in history has got wrong, and I got it wrong again because I was too busy being impressed that the thing could file issues at all.

## Steal the shape, not the agent

Read access, no write access. It files a proposal, not a change. A human merges.

Mine has never touched this site and I intend to keep it that way. The moment it can edit, all five of those issues become commits I have to review anyway, except now they've already happened.

Then go and look at your denominators.

The most dangerous thing an agent gives you isn't a hallucination. You can catch those. It's a true statement, computed from a sample too small to mean anything, formatted to two decimal places, sitting in a template that looks exactly like every correct finding you've ever read.

9.09%.

One guy.
