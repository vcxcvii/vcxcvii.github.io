---
title: "Hunting Season for the Rest of Us"
date: 2026-07-24 00:00:00 +0530
redirect_from:
  - /hunting-season-2026/
description: "Job hunting in 2026 is brutal. Here is the war room I built to prep for it: the folder structure, the research moves, voice-mode mocks with a rubric, and what the whole thing cost."
tags:
  - career
  - ai
  - product-marketing
  - frameworks
---

About a week into prepping for one of these companies, I could drop the category's favourite piece of jargon into a sentence without flinching. Felt good about it too.

Then I tried explaining to myself why anyone would buy it, and I got about eleven seconds in before I ran out of road.

That's the thing nobody warns you about with interview prep. You can accumulate a fairly convincing vocabulary in a weekend, and vocabulary is worse than knowing nothing, because knowing nothing makes you ask questions and vocabulary makes you confident. Confidence invites the follow-up. The follow-up is where you die.

I'm between roles right now, interviewing for GTM and product marketing seats, so I have been finding this out repeatedly and in real time. The market is not helping. Every posting gets a thousand applicants, half of them AI-blasted. AI now does the junior version of most marketing jobs, so "I can execute" stopped being a pitch somewhere around last year. Meanwhile companies expect one senior person plus a few agents to cover what a pod of three covered in 2022. Floor went up, ceiling went up, and most of us are standing in the gap between them wondering which way to jump.

I [spent a decade deliberately engineering luck](https://www.varunchoraria.com/ive-been-trying-to-get-lucky-for-a-decade/) and even I'll admit this season is harsh. You can't do anything about the market. You can do quite a lot about how you show up to the four or five shots you get.

So after that little incident I stopped prepping and spent three days building a thing instead. This is what it is, how it's put together, and what it cost, which was nothing.

## What I actually built

It's a static site. Forty HTML pages sitting in a folder on my desktop, no hosting, no build step, no backend. I open `index.html` and the whole war room is there.

Screenshots below are anonymized prototypes. I'm mid-process with these companies and publicly dissecting your potential employer is an excellent way to stop being mid-process. The blue callouts are notes on why each piece exists.

<a href="/assets/images/posts/hunting-season-1-hub@2x.png"><img src="/assets/images/posts/hunting-season-1-hub.png" alt="The war room hub"></a>

Here's the folder, roughly:

```
interview-dossiers/
  <company>/raw/<date>/     scraped pages, archived by fetch date
  research/                 sitemaps, rival homepages, brand data
  research/rivals/<rival>/  one folder per competitor, shared
  site/                     the 40 pages
    index.html              hub
    <company>/              10 pages, one per company
    rivals/                 8 competitor teardowns, shared
    kb/                     link out to the learning base
    assets/style.css        one stylesheet for everything
```

Two things in there took me two bad versions to arrive at, and they're the only structural ideas in the whole system I'd defend.

**The rivals folder is shared.** Three of the companies I'm talking to compete with overlapping sets of vendors. In version one I researched each competitor separately inside each company's folder, which meant writing the same teardown of the same vendor twice with slightly different adjectives. Now a rival gets researched once, lives in one place, and gets linked from every company that needs it. This is the single reason a new company now takes a few hours instead of a day.

**Learning is separate from research.** There's a second folder, `gtm-kb`, that has nothing to do with any specific company. Four disciplines in it: ABM, content marketing, SEO plus AI search, and interview craft. Each one is an issue tree, then branch docs, then a self-test. The last question on every self-test is an applied artifact that has to land in an actual company dossier, so studying and prepping feed each other instead of competing for the same evening.

That split came from noticing that company research goes stale in weeks and industry understanding doesn't. Mixing them meant throwing away good learning every time a process died.

The version history, since the failures are more useful than the final state:

**v1 was markdown files.** Which is what the research skill still outputs, and it's correct for the machine. It is unreadable for a human at volume. I had maybe sixty files and no way to answer "what do I know about this company" without opening nine of them.

**v2 was one giant HTML page per company.** Everything on one scroll. Solved the file-hunting problem and created a worse one, which is that a 4,000-word page is a wall and you don't read walls the night before a round. You skim them and feel prepared, which is the exact failure mode I was trying to fix.

**v3 asked a different question.** Not "how do I organize this information" but "what job does this page do for me, and when." That produced ten pages per company, each named for its job: overview, 101, 201, strategy and people, market, buyers, competition, fit and objections, drills, sources. I open `drills` the morning of. I open `fit` when I'm nervous. I never open all ten at once, which is the point.

Same lesson as [designing without AI slop](https://www.varunchoraria.com/how-to-design-without-ai-slop/). The model will generate all of this happily. Deciding what belongs on which page is still your job and it is most of the work.

<a href="/assets/images/posts/hunting-season-2-overview@2x.png"><img src="/assets/images/posts/hunting-season-2-overview.png" alt="Company overview page"></a>

Three things on the overview page do the real work, and you can build all three in a Google Doc in an hour. The rest of the site is convenience.

**The one insight.** Not a summary of the company. The single thing you'd fix or build in your first 90 days, stated like you actually believe it. Mine for one company: they sell several products as separate things and the buyer doesn't want several things, so the first job is the connective narrative. That's an opinion, and opinions are what these conversations are secretly testing, because [judgment is what we're all paid for now](https://www.varunchoraria.com/maybe-going-around-circles-is-worth-it/).

**Five numbers you can defend.** Sourced, dated, hyperlinked. When you drop a number and someone leans in, "that's from your own exec's interview last December" ends it.

**The landmine box.** Facts that changed recently and could detonate mid-conversation. In one process I found the CEO had quietly changed a few months earlier. The company's own about page still had the old titles on it. Picture confidently referencing the wrong CEO in round one. Now picture being the only candidate in the pile who asks a good question about the transition.

### The primers, which are the highest-leverage part

Two per industry, and this is the direct fix for the eleven-seconds problem up top.

The **101** is the industry from zero, written as a story. Why does this thing exist, who pays for it, what forces them to pay, how does the money actually move. Every term shows up when the story needs it and arrives attached to a reason, which is the only way I've found to make terms stick.

The **201** is what makes you sound like you've been in the room before: the debates practitioners genuinely argue about, the unit economics, twenty years of history compressed into four acts, and a day in the life of the person who signs the cheque.

<a href="/assets/images/posts/hunting-season-3-learn101@2x.png"><img src="/assets/images/posts/hunting-season-3-learn101.png" alt="The 101 primer"></a>

Here's the difference in practice. Vocabulary-level prep gets you: "they've shipped an autonomous agent for the part of the workflow humans always did by hand." The 201 version gets you: that was never a capability problem, it was a unit-economics problem. The buyer always had the upper hand in those transactions. Actually using it cost more in analyst hours than it saved, so for about thirty years nobody bothered. Agents collapse the cost of paying attention, which is what finally makes the leverage worth exercising.

I can hold a ten minute conversation on the second one. The first one is a sentence I could have gotten from the homepage.

To build them: ask whichever model you use to teach you the industry as a narrative, from first principles, with analogies, and a "if you remember one thing" line per section. Then a second pass for the debates, the economics, the history, the buyer's day. Then read both out loud and mark every sentence you couldn't defend if someone pushed. Those marks are your study list. Mine was embarrassingly long the first time.

### The tools

Claude Code does the research, through a skill I wrote called [interview-recon](https://github.com/vcxcvii/interview-recon). It chains into [Master Shifu](https://www.varunchoraria.com/i-now-have-my-own-master-shifu/) when something case-shaped comes up and needs a framework. Firecrawl handles bulk scraping on the free tier. Context.dev covers what Firecrawl can't reach, which is LinkedIn public pages, bot-protected review sites, sitemaps, brand data. That one has its own story and it's at the bottom.

Plain HTML for output because it opens instantly, prints as a leave-behind, and will still work in ten years when whatever note-taking app I'd otherwise have used has been acquired and shut down.

One rule about models: use the strongest reasoning model you have for the synthesis step and make it cite a URL for every claim. Not out of distrust exactly. It's that you'll be repeating these facts out loud in a room where being wrong once costs you the room.

The skill is open source, same as Master Shifu, because job hunting is hard enough without paywalled prep.

<p><a href="https://github.com/vcxcvii/interview-recon" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:.45em;font-weight:600"><svg height="22" width="22" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>github.com/vcxcvii/interview-recon</a></p>

```bash
git clone https://github.com/vcxcvii/interview-recon.git ~/.claude/skills/interview-recon
```

Then say "prep me for my interview at [company]". Three design decisions in it worth stealing even if you never install it. It announces its backend and its credit budget up front and asks before blowing past it, because most research skills prescribe paid tools and then quietly degrade when you don't have them. It shows you a research plan before it fetches anything, so you stay the editor. And it appends rather than overwrites, so round two loads what round one learned and refreshes only what went stale.

## The four moves that did the damage

Everything in the war room carries a hyperlink and a date. Four research moves produced most of what's actually in there.

**Read the earnings calls of the public companies in the space.** Private companies don't publish numbers. Their public neighbours do, and those neighbours set the narrative your interviewer is swimming in whether they know it or not. Transcripts are free on Motley Fool and on company IR pages. One hour with one transcript taught me that the whole industry's AI revenue reporting is a definitional arms race, everyone counting slightly different things and daring each other to object. That came up in a real conversation within the week.

**Audit their content like you already own it.** Every site has a public sitemap at `sitename.com/sitemap.xml`. Pull it, classify the posts by buying intent, chart the result. One company I looked at publishes several times more content than its loudest rival and roughly 70% of it is top-of-funnel fluff. That became a chart and a first-90-days recommendation. Nobody expects a candidate to walk in with the content audit already done, which is exactly why it works.

<a href="/assets/images/posts/hunting-season-4-competition@2x.png"><img src="/assets/images/posts/hunting-season-4-competition.png" alt="The sitemap audit"></a>

**Mine both kinds of reviews.** G2 and Gartner Peer Insights tell you what customers think versus what the homepage claims. Employee review sites tell you what you're walking into. One company in my pipeline sits under 3 out of 5 across several hundred employee reviews, with the same complaint about pay after promotion showing up over and over. That didn't kill my interest in the role. It set my posture for the conversation about money, which is research doing a job that has nothing to do with answering their questions.

**Read everything the interviewer has published.** One hiring manager had posted their strategic thesis months before I ever spoke to them. My prep borrowed their language and pushed it one step further than they had taken it. That isn't flattery, it's arriving already aligned instead of spending the first twenty minutes establishing that you might be.

## The part I'd keep if I could only keep one

Reading prep is not interview prep. Interviews are spoken, adversarial and on a clock, and none of those things are true of a document.

My written answers were sharp. My spoken answers were about 40% filler until the third rep. There is no way to discover that by reading.

So before every round I run live mocks with ChatGPT in voice mode. Copy this and adjust:

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

Two honest caveats. This simulates the archetype, not the person. You're practising against what someone with that job and those published opinions tends to value and push on, and a revenue-minded CSO does push differently than a brand-minded CMO. And you have to do it out loud. In voice mode. The entire finding is the gap between how good your answer looks written down and how it sounds coming out of your face.

<a href="/assets/images/posts/hunting-season-6-rubric@2x.png"><img src="/assets/images/posts/hunting-season-6-rubric.png" alt="The rubric report"></a>

The rubric is what turns this from a novelty into training, because reps without feedback are just rehearsing your mistakes with extra steps. Across three attempts my filler words went from 14 to 6. More useful than that, the pushback score taught me something no [communication listicle](https://www.varunchoraria.com/6-pro-tips-on-communication-thats-sure-to-get-you-promoted/) ever managed to make stick: agree with whatever is true in the objection before you start defending. The rubric caught me skipping that. Twice.

Every question I fumble goes into an objection bank with a written answer, so the same punch doesn't land twice.

<a href="/assets/images/posts/hunting-season-5-objections@2x.png"><img src="/assets/images/posts/hunting-season-5-objections.png" alt="The objection bank"></a>

Build yours with one prompt: "here's my resume and the JD, list the 10 hardest objections an interviewer would have about me, what each one is really assessing, and draft my answer." Then rewrite every answer in your own words, because a script you didn't write is audible from space.

If you only have one evening, do these three: one earnings transcript from the biggest public company in your target's space, one written point of view about the first thing you'd fix, and one voice mock with the rubric above. Let it humble you tonight so the interviewer doesn't get to on Thursday.

The bill for all of it, since I know what job-search finances feel like: Firecrawl free tier, about 500 credits. Context.dev, about 350 credits. Claude Code and ChatGPT were subscriptions I already had, and if you have neither, the free tier of any frontier model covers the primers, the objection bank and text-mode mocks. Three focused days for the system and the first three companies. Incremental cash spent, zero.

## The world is kind

Now the part I didn't plan for and can't take any credit for.

Five days ago Yahia Bakour, who founded Context.dev, sent me one of those routine founder check-in emails. Saw you signed up, how's the API treating you. I told him the truth, which was that I loved the product, I was building an interview research agent on top of it, and I couldn't afford a paid plan right now because I'm between roles.

He replied the next morning. He'd dropped 10,000 credits into my account, on the house, and bumped my rate limit. No strings, no call, no "let's find a way to work together." When I offered to do some free marketing work in return, his entire ask was that if I ever meet someone who needs the API, send them his way.

My whole [thesis about luck](https://www.varunchoraria.com/ive-been-trying-to-get-lucky-for-a-decade/) is that it compounds on honest effort made visible, and I still believe that. But sometimes it's much simpler than the thesis. Sometimes a stranger is just kind, at the exact moment when kindness lands hardest. Half the research depth in this post runs on credits I was given by someone with no reason to give them.

So, holding up my end. If you're building anything that needs clean web data, scraping, extraction, brand intelligence, sitemaps, go and try [context.dev](https://context.dev). It's accurate in the places where other tools fail silently, and it's built by someone who treats a broke job-seeker like a future customer rather than a freeloader. That's a founder worth betting on.

When this season ends I'll publish the recap: real screenshots, and an honest account of what actually worked once I was in the rooms. The rest of what I build in public lives on [side quests](/side-quests/), and if you'd rather hire this thinking than copy it, [here's how I work](/consulting/).

The market is harsh and nobody is coming to make it less harsh. But the same tools that raised the bar will get you over it, mostly for free, if you prep like an operator instead of a candidate.

Happy hunting. If any of this helps you land something, tell me. That's the whole reason for writing it down.
