---
title: "Hunting Season 2026"
date: 2026-07-24 00:00:00 +0530
description: "Job hunting in 2026 is brutal. Here is my near-zero-cost prep system: deep research, industry primers, voice-mode mock interviews, and a rubric."
tags:
  - career
  - ai
  - product-marketing
  - frameworks
---

I'm between roles right now, interviewing for GTM and product marketing seats. So let me tell you what the 2026 job market actually feels like from the inside.

Openings are fewer. Every posting gets a thousand applicants, half of them AI-blasted. The floor got raised: AI does the junior version of most marketing jobs, so "I can execute" is no longer a pitch. The ceiling got raised too: companies expect one senior person plus agents to do what a pod of three did in 2022. Most of us sit somewhere between that new floor and new ceiling. That's the squeeze.

I [spent a decade deliberately engineering luck](https://www.varunchoraria.com/ive-been-trying-to-get-lucky-for-a-decade/), and even I'll admit this season is harsh. You can't control the market. You can control how you show up to the handful of shots you get.

Most candidates skim the company website the night before and call it prep. I've done this. You've probably done this. In 2022 you could get away with it.

Not anymore. So I built a war room. This is a field note on the whole system: the process, the tools, the prompts, what it costs (almost nothing), and the part where a stranger's kindness carried half of it. Everything here is stealable tonight, mostly free, and none of it needs you to be technical.

## Prep like an operator, not a candidate

Here's the thing about interview prep advice: it's all memorization. Company facts, STAR stories, "walk me through your resume." That's candidate behavior, and every other applicant is doing exactly that, with the same ChatGPT summary of the same website.

Operator behavior is different. When an operator enters a new market, they build a map. Who buys. Why they buy. What the rivals claim. Where the money leaks. What the earnings calls admit that the marketing site won't. Then they form a point of view and defend it.

Do this for an interview and two problems collapse into one. You prep for the round AND you genuinely learn an industry. If the process goes nowhere, the knowledge compounds anyway - I wrote about that compounding in [Killed By Google](https://www.varunchoraria.com/killed-by-google/). No prep is wasted when the prep is actual learning.

## The war room

The output is a 40-page static site sitting on my desktop. Plain HTML. No hosting, no backend, opens from a file. One hub, and for every live process: an overview with my point of view, industry primers, market analysis from earnings calls, buyer maps, rival teardowns, an objection bank with scripts, and rehearsal drills.

Screenshots below are anonymized prototypes. I'm mid-process with these companies, and publicly dissecting your potential employer is a great way to stop being mid-process. The blue callouts explain why each piece exists.

![The war room hub](/assets/images/posts/hunting-season-1-hub.png)

Don't copy the layout. Copy the question behind it: at any moment, can you answer "where does each process stand and what do I build next" in five seconds? A Notion page does the job. What matters is that prep becomes a system with state, not a panic the night before each round.

![Company overview page](/assets/images/posts/hunting-season-2-overview.png)

Three things on this page do the real work, and you can build all three in a doc:

1. **The one insight.** Not a company summary. The single thing you'd fix or build in your first 90 days, stated like you mean it. Mine for one company: they sell three separate products but the buyer doesn't want three things, so the first job is the connective narrative. That's an opinion. Opinions are what interviews reward, because [judgment is what we're all compensated for now](https://www.varunchoraria.com/maybe-going-around-circles-is-worth-it/).
2. **Five numbers you can defend.** Sourced, dated, hyperlinked. When you drop a number and they push, "that's from your CSO's December interview" ends the push.
3. **The landmine box.** Facts that changed recently and might blow up mid-conversation. In one process I found the CEO had quietly changed four months ago. The company's own about page still showed old titles. Imagine confidently referencing the wrong CEO in round one. Now imagine being the only candidate who asks a thoughtful question about the transition instead. Same fact, opposite outcomes.

## Learn the industry twice: 101, then 201

My first week of prep, I made the classic mistake: I collected vocabulary. I could say "source-to-pay" in a sentence. One follow-up question and I'd have folded. Words without the machinery underneath are worse than ignorance, because they invite the follow-up.

The fix was writing myself two primers per industry, and honestly this is the highest-leverage thing in the whole system.

**The 101** is the industry from zero, written like a story. Why does this industry exist? Who pays, and what forces them to pay? How does money actually flow? Every term arrives when the story needs it, attached to a reason.

**The 201** is what makes you sound like you've been around: the debates practitioners actually argue about, the unit economics, the 20-year history in four acts, and a day in your buyer's life.

![The 101 primer](/assets/images/posts/hunting-season-3-learn101.png)

Concrete example of the difference. Vocabulary-level prep on a procurement company: "they have an autonomous negotiation agent." The 201 version: tail spend was never a leverage problem, it's a unit-economics problem. The buyer always had the leverage over small suppliers; using it just cost more in analyst hours than it saved. AI agents collapse the cost of attention, which finally makes that leverage economic to use.

One of these answers survives cross-examination. The other one is what everyone else says.

How to build yours: ask your AI of choice to teach you the industry as a narrative with analogies, from first principles, with a "if you remember one thing" recap per section. Then a second pass: "now teach me the debates, the economics, the history, and a day in the buyer's life." Then read both out loud and mark every sentence you couldn't defend. Those marks are your actual study list.

## Receipts, not vibes

Everything in my war room carries a hyperlink and a date. Four research moves did most of the damage, all replicable:

1. **Read the earnings calls of the public companies in the space.** Private companies don't publish numbers, but their public neighbors do, and the neighbors set the narrative your interviewer lives in. Transcripts are free on Motley Fool and the companies' own IR pages. One hour with a transcript taught me the whole industry's AI revenue reporting is a definitional arms race. That insight came up in a real conversation within the week.
2. **Audit their content like you already own it.** Every site has a public sitemap (literally sitename.com/sitemap.xml). Pull it, classify the blog posts by buying intent, chart it. One company I researched publishes 3x more content than its loudest rival, and 71% of it is top-of-funnel fluff. I turned that into a chart plus a first-90-days recommendation. Nobody expects a candidate to show up with their content audit already done. That's the point.
3. **Mine the reviews, both kinds.** Product reviews (G2, Gartner Peer Insights) tell you what customers actually think versus what the homepage claims. Employee reviews tell you what you're walking into. One company in my pipeline: 2.5/5 across 550 employee reviews, "no increments after promotion" as a recurring theme. That didn't kill my interest. It set my negotiation posture. Research isn't only for answering their questions.
4. **Read everything the interviewer has published.** One hiring manager had posted her exact strategic thesis eight months before my interview. My prep mirrors her language and extends it one step. That's not flattery. That's showing alignment before you're asked to prove it.

![The sitemap audit](/assets/images/posts/hunting-season-4-competition.png)

## The tools, honestly

- **Claude Code** runs the research, through a skill I wrote called [interview-recon](https://github.com/vcxcvii/interview-recon). It's open source, more on it below. It chains into [Master Shifu](https://www.varunchoraria.com/i-now-have-my-own-master-shifu/) when a case-style question needs a framework. You don't need the skill - the spine is the value, and you can run it as prompts.
- **Firecrawl** for bulk scraping. The free tier refills monthly. Costs super less: zero.
- **Context.dev** for everything Firecrawl can't touch: LinkedIn public pages, bot-protected review sites, sitemap extraction, brand data. More on this one below, it has its own story.
- **Plain HTML** for output because it loads instantly, prints as leave-behinds, and will still open in ten years. Version one was markdown files (unreadable at volume), version two was one giant page per company (a wall). The fix was asking what job each page does for me, and giving every page exactly one job. Same lesson as [designing without AI slop](https://www.varunchoraria.com/how-to-design-without-ai-slop/): AI generates, but information architecture is still your job.

On models: use the strongest reasoning model you have for synthesis, because synthesis is where hallucination hurts most. And make it cite a URL for every claim. Not because the model is untrustworthy by default, but because you'll be repeating these facts in a room where being wrong once costs you the room.

## The sparring partner: voice-mode mocks with a rubric

If I could only keep one piece of this system, it's this one.

Reading prep is not interview prep. Interviews are spoken, adversarial, and time-boxed. My written answers were sharp. My spoken answers were 40% filler until the third rep. You don't find that out from a doc.

So before any round, I run live mocks with ChatGPT in voice mode. The setup, copy-paste and adjust:

```
You are playing my interviewer for round 2 at [company].
Here is their public writing so you can capture how they
think and what they care about: [paste posts/talks].

Rules:
- Ask one question at a time, like a real interview.
- Push back on weak answers. Don't let me ramble past 90 seconds.
- Interrupt me like a busy executive would.
- After 20 minutes, stop and grade me on: clarity of my opening
  point of view, structure under pushback, domain fluency,
  evidence discipline (did I use numbers), and the quality of
  my questions to you.
- Score each 1-10 with specific feedback, and compare against
  my last attempt: [paste last rubric].
```

Two honest notes. First, this simulates the interviewer's archetype from their public writing, not the person - what they value, what they'd push on. A revenue-minded CSO grills differently than a brand-minded CMO, and that difference is what you're practicing against. Second, do it out loud in voice mode or don't bother. The gap between your written and spoken answers is the entire finding.

![The rubric report](/assets/images/posts/hunting-season-6-rubric.png)

The rubric is what turns novelty into training. Repetition without feedback is just rehearsing your mistakes. Across three attempts my filler words dropped from 14 to 6, and the pushback score taught me something no [communication listicle](https://www.varunchoraria.com/6-pro-tips-on-communication-thats-sure-to-get-you-promoted/) ever made stick: agree with what's true in the objection before you defend. The rubric caught me not doing it. Twice.

And every question I fumble goes into an objection bank with a script, so the same punch never lands twice:

![The objection bank](/assets/images/posts/hunting-season-5-objections.png)

Build your own bank with one prompt: "here's my resume and the JD - list the 10 hardest objections an interviewer would have about me, what each objection is really assessing, and draft my answer." Then rewrite every answer in your own words, because a script you didn't write shows.

## What this costs

I know what job-search finances feel like, so here's the honest bill:

- Firecrawl: free tier. Used ~500 credits across everything.
- Context.dev: ~350 credits (story below).
- Claude Code and ChatGPT: subscriptions I already had. If you have neither, the free tiers of any frontier chat model cover the primers, the objection bank, and text-mode mocks.
- Time: three focused days for the system plus the first three companies. Each new company is now a few hours, because everything is a reusable template.

Incremental cash spent: zero.

## The world is kind

Now the part I didn't plan for.

Five days ago the founder of Context.dev, Yahia Bakour, sent me a routine check-in email. Saw you signed up, what do you think of the API. I told him the truth: I love the product, I'm building an interview research agent with it, and I can't afford a paid plan right now because I'm between roles.

He replied the next morning. He'd added 10,000 credits to my account, on the house, and bumped my rate limit. No strings. When I offered free marketing work in return, his entire ask was: if you meet someone who needs the API, send them my way.

My whole [thesis about luck](https://www.varunchoraria.com/ive-been-trying-to-get-lucky-for-a-decade/) is that it compounds on honest effort made visible. But sometimes it's simpler. Sometimes a stranger is just kind, at the exact moment kindness lands hardest. Half the research depth in this post runs on those gifted credits.

So here's me holding up my end: if you're building anything that needs clean web data - scraping, extraction, brand intelligence, sitemaps - go try [context.dev](https://context.dev). It's accurate where other tools silently fail, and it's built by someone who treats a broke job-seeker like a future customer instead of a freeloader. That's a founder worth betting on.

## If you only have one evening

The whole system took days. The 20% that carries 80%:

1. **One earnings transcript** from the biggest public company in your target's space. Free, one hour. You'll know the narrative your interviewer swims in.
2. **One written POV.** The single thing you'd fix in your first 90 days, grounded in something real you found. This alone separates you from the thousand-applicant pile.
3. **One voice-mode mock with the rubric prompt above.** Out loud. Let it humble you tonight so the interviewer can't on Thursday.

## Steal the whole thing

The research skill is open source, same as Master Shifu was, because job hunting is hard enough without paywalled prep.

<p><a href="https://github.com/vcxcvii/interview-recon" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.45em;font-weight:600"><svg height="22" width="22" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>github.com/vcxcvii/interview-recon</a></p>

```bash
git clone https://github.com/vcxcvii/interview-recon.git ~/.claude/skills/interview-recon
```

Then tell your agent "prep me for my interview at [company]". How it works under the hood, in three design decisions:

1. **It degrades on purpose.** If you have a Firecrawl key it uses it, announces a credit budget (15 quick, 40 deep), and asks before exceeding it. If you don't, it falls back to your agent's built-in web tools, same workflow, and tells you which pages might be incomplete. Most research skills prescribe paid tools and fail silently without them. Silence is the enemy.
2. **It asks before it fetches.** Step one is always a short research plan you approve: what questions this round must answer, which sources, what budget. You stay the editor, the agent stays the analyst.
3. **It remembers between rounds.** Dossiers live in plain folders on your machine. Run it again before round 2 and it loads what it knows, refreshes only what's stale, and logs what round 1 actually asked. Prep becomes a system with state, not a panic with a deadline.

When this season ends, I'll publish the recap with real screenshots and what actually worked in the rooms.

The market is harsh. The floor is higher, the ceiling is higher, and nobody is coming to lower them for us. But the same tools that raised the bar will help you clear it, mostly free, if you prep like an operator.

Happy hunting. And if this helps you land something, tell me. That's the whole point of writing it down.
