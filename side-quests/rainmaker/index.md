---
layout: page
title: Rainmaker
seo_title: Open-source GTM search agent ranked by distance to revenue | Rainmaker
description: An open-source search system that ranks every finding by distance to revenue, checks the live SERP before briefing anything, and keeps a permanent record of whether the fix worked. Runs with no credentials on the first pass.
last_modified_at: 2026-07-30
intro: An open-source search system that ranks every finding by distance to revenue instead of technical severity, refuses to brief a page it has not checked the SERP for, and keeps an append-only record of what shipped and what moved.
project: true
project_name: Rainmaker
repo: rainmaker
state: Private
version: "0.3"
mcp: true
application_category: DeveloperApplication
application_subcategory: Search and content operations
audience: Anyone who owns a website and needs organic search to produce revenue, from a personal blog to a site with tens of thousands of URLs
software_requirements: Node.js 22. Everything else is optional, including any AI model key.
feature_list:
  - Revenue tiering that ranks every URL by distance to money
  - Scores computed in code, identical across runs, never produced by a model
  - Live SERP verdicts that kill unwinnable targets before anything is briefed
  - Site blueprint with one intent per URL and a permutation guard
  - Publish budget bounded by the site's own demonstrated indexation rate
  - Citation graph showing which pages answer engines actually cite
  - Append-only ledger with verification windows per metric
  - Retrospectives that report what did nothing
faqs:
  - question: Is Rainmaker free and open source?
    answer: It will be. MIT licensed and public when the first release lands, with the full specification in the repository. There is no hosted service and no account. Keys stay on your machine and are used only against the API they belong to.
  - question: Do I need an AI model key to use it?
    answer: No. The measuring half is plain Node and runs with zero credentials. A model key unlocks the interview, the writing skills and the AI citation probes. Every report states which capabilities were live and what their absence weakens.
  - question: Does Rainmaker publish content or post to communities by itself?
    answer: No. It drafts, files issues, and writes diffs. Publishing, posting, outreach, redirects and deletions all need a human. Every one of those actions is externally visible and hard to reverse.
  - question: How is this different from an SEO tool?
    answer: Most tools sort findings by a severity score their vendor invented. Rainmaker sorts by whether fixing the thing can plausibly produce a customer, and then records whether it did. It also refuses to recommend work the evidence does not support, which usually means recommending less.
  - question: Does it work for sites that are not B2B SaaS?
    answer: Yes. The revenue model is a config value, and it changes the site structure the system plans for. Local services, ecommerce, marketplaces, media and consulting each get a different spine and a different permutation axis.
  - question: Why does it refuse to interview me before it has crawled my site?
    answer: Because twelve questions asked about a site nobody has looked at are the same twelve questions every consultant asks. The crawl runs first, in the background, so the interview can open with your actual numbers.
---

Rainmaker is an open-source search system with one principle.

> Every finding is ranked by distance to revenue, never by technical severity.

The specification is written and the build is underway. The repository goes public, MIT licensed, when the first release lands. This page describes what it does and how it is put together.

## What problem does it solve?

Search tools are good at finding two hundred problems and bad at telling you which one pays. They sort by a severity score the vendor invented, so a missing alt attribute on a careers page and a noindexed pricing page arrive looking roughly equivalent. Both get written into a report. Neither gets fixed.

The second problem is quieter. Almost nothing in this discipline keeps a record. A plan gets made, work gets shipped, three months pass, and nobody can say which of the eleven recommendations actually moved a number. The next plan then gets made on the same assumptions, because nothing disproved them.

Rainmaker fixes the ordering by tiering every URL by how close it sits to money, and fixes the memory by writing every observation to an append-only ledger with a verification window per metric.

## What is the job to be done?

<svg viewBox="0 0 720 300" role="img" aria-labelledby="jtbd-title" style="max-width:100%;height:auto;margin:1.5rem 0">
  <title id="jtbd-title">The job: know what to fix first and prove it was worth it, as a loop from See to Decide to Build to Spread to Prove and back to Decide</title>
  <g fill="none" stroke="#111111" stroke-width="1.5">
    <rect x="1" y="8" width="718" height="66" stroke="#dddddd"/>
    <rect x="20" y="120" width="112" height="52"/>
    <rect x="164" y="120" width="112" height="52"/>
    <rect x="308" y="120" width="112" height="52"/>
    <rect x="452" y="120" width="112" height="52"/>
    <rect x="596" y="120" width="104" height="52"/>
  </g>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="13" fill="#111111">
    <text x="24" y="30" font-size="14"><tspan fill="#666666">When</tspan> I own a site and a revenue number,</text>
    <text x="24" y="50" font-size="14"><tspan fill="#666666">I want</tspan> to know what to fix first,</text>
    <text x="24" y="68" font-size="14"><tspan fill="#666666">so I can</tspan> show a win before the quarter ends.</text>
    <text x="76" y="143" text-anchor="middle" font-size="14">See</text>
    <text x="76" y="161" text-anchor="middle" font-size="12" fill="#666666">what is true</text>
    <text x="220" y="143" text-anchor="middle" font-size="14">Decide</text>
    <text x="220" y="161" text-anchor="middle" font-size="12" fill="#666666">what is worth it</text>
    <text x="364" y="143" text-anchor="middle" font-size="14">Build</text>
    <text x="364" y="161" text-anchor="middle" font-size="12" fill="#666666">the thing</text>
    <text x="508" y="143" text-anchor="middle" font-size="14">Spread</text>
    <text x="508" y="161" text-anchor="middle" font-size="12" fill="#666666">where answers form</text>
    <text x="648" y="143" text-anchor="middle" font-size="14">Prove</text>
    <text x="648" y="161" text-anchor="middle" font-size="12" fill="#666666">what moved</text>
    <text x="434" y="252" text-anchor="middle" font-size="12" fill="#0000ee">belief updated, strategy changes</text>
  </g>
  <g stroke="#111111" stroke-width="1.5" fill="none">
    <path d="M132 146 h32"/><path d="M276 146 h32"/><path d="M420 146 h32"/><path d="M564 146 h32"/>
  </g>
  <g stroke="#0000ee" stroke-width="1.5" fill="none">
    <path d="M648 172 v56 H220 v-56"/>
  </g>
  <g fill="#111111">
    <path d="M164 146 l-8 -4 v8 z"/><path d="M308 146 l-8 -4 v8 z"/><path d="M452 146 l-8 -4 v8 z"/><path d="M596 146 l-8 -4 v8 z"/>
  </g>
  <path d="M220 172 l-4 8 h8 z" fill="#0000ee"/>
</svg>

The arrow back from Prove to Decide is the entire product. Everything else in this category stops at Build.

## How do you set it up?

Three commands, and only the first is required.

```
npx rainmaker init                 the measuring core, plain Node, no model needed
npx skills add vcxcvii/rainmaker   the 26 skills, into whichever assistant you use
npx rainmaker agent                the interactive agent, with your own key
```

The first ten minutes run in a deliberate order.

<svg viewBox="0 0 720 210" role="img" aria-labelledby="onboarding-title" style="max-width:100%;height:auto;margin:1.5rem 0">
  <title id="onboarding-title">Onboarding: eight config questions while the crawl runs in the background, then a grounded interview, then three fixes, then a cadence recommendation</title>
  <g fill="none" stroke="#111111" stroke-width="1.5">
    <rect x="1" y="20" width="150" height="54"/>
    <rect x="190" y="20" width="150" height="54"/>
    <rect x="379" y="20" width="150" height="54"/>
    <rect x="568" y="20" width="150" height="54"/>
    <rect x="190" y="122" width="339" height="52" stroke="#dddddd"/>
  </g>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" fill="#111111">
    <text x="76" y="42" text-anchor="middle" font-size="13">1. Eight questions</text>
    <text x="76" y="60" text-anchor="middle" font-size="12" fill="#666666">90 seconds, all skippable</text>
    <text x="265" y="42" text-anchor="middle" font-size="13">2. Grounded interview</text>
    <text x="265" y="60" text-anchor="middle" font-size="12" fill="#666666">12 questions, one at a time</text>
    <text x="454" y="42" text-anchor="middle" font-size="13">3. Three fixes</text>
    <text x="454" y="60" text-anchor="middle" font-size="12" fill="#666666">effort against impact</text>
    <text x="643" y="42" text-anchor="middle" font-size="13">4. Cadence</text>
    <text x="643" y="60" text-anchor="middle" font-size="12" fill="#666666">recommended, not assumed</text>
    <text x="359" y="146" text-anchor="middle" font-size="12" fill="#666666">the crawl runs here, in the background,</text>
    <text x="359" y="164" text-anchor="middle" font-size="12" fill="#666666">so question one of the interview can cite a real number</text>
  </g>
  <g stroke="#111111" stroke-width="1.5" fill="none">
    <path d="M151 47 h39"/><path d="M340 47 h39"/><path d="M529 47 h39"/>
  </g>
  <g fill="#111111">
    <path d="M190 47 l-8 -4 v8 z"/><path d="M379 47 l-8 -4 v8 z"/><path d="M568 47 l-8 -4 v8 z"/>
  </g>
  <g stroke="#dddddd" stroke-width="1.5" fill="none" stroke-dasharray="4 4">
    <path d="M76 74 v52 h114"/><path d="M265 122 v-48"/>
  </g>
</svg>

Setup asks only what cannot be measured: the site, how the business makes money, where money changes hands, average contract value, sales cycle length, one line on who buys, and up to five competitors. Every question can be skipped, and skipping degrades the output rather than blocking it.

The interview never runs first. It runs second, after the crawl, and it opens like this:

```
I looked at 214 pages before asking you anything.

78% of your pages are Tier 3. 4% are Tier 1. Your only comparison
page has no internal links pointing at it from anywhere on the site.
Your top competitor has 31 Tier 1 pages. You have 3.

First question. Your /demo page gets 1,240 impressions and 11 clicks
over 28 days, sitting at position 8.4. Who reads that page before a
deal closes, and what do they still not know when they leave it?
```

Then three fixes, not sixty, each with the file the evidence came from, the tier, the hours, and the exact next command. Then it asks how often you want it to run, and recommends a cadence from your site's shape. Under a hundred clicks a month there is no weekly signal to read, so it will tell you to run monthly and explain why.

## What does it actually do?

Twenty-six skills, five phases, one decision each. No two skills can answer the same question, and together they cover the job.

<svg viewBox="0 0 720 340" role="img" aria-labelledby="tree-title" style="max-width:100%;height:auto;margin:1.5rem 0">
  <title id="tree-title">Skill tree: five phases sitting on a shared context layer, with the deterministic core underneath</title>
  <g fill="none" stroke="#111111" stroke-width="1.5">
    <rect x="1" y="14" width="132" height="150"/>
    <rect x="148" y="14" width="132" height="150"/>
    <rect x="295" y="14" width="132" height="150"/>
    <rect x="442" y="14" width="132" height="150"/>
    <rect x="589" y="14" width="130" height="150"/>
  </g>
  <g fill="none" stroke="#111111" stroke-width="1.5">
    <rect x="1" y="204" width="718" height="52"/>
    <rect x="1" y="278" width="718" height="52" stroke="#dddddd"/>
  </g>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" fill="#111111" font-size="12">
    <text x="12" y="34" font-size="13" font-weight="bold">See</text>
    <text x="12" y="54" fill="#666666">unblock-my-money-pages</text>
    <text x="12" y="72" fill="#666666">find-my-quick-wins</text>
    <text x="12" y="90" fill="#666666">get-mentioned-by-ai</text>
    <text x="12" y="108" fill="#666666">stop-losing-visitors</text>
    <text x="12" y="126" fill="#666666">beat-my-competitors</text>

    <text x="159" y="34" font-size="13" font-weight="bold">Decide</text>
    <text x="159" y="54" fill="#666666">follow-the-money</text>
    <text x="159" y="72" fill="#666666">pick-my-battles</text>
    <text x="159" y="90" fill="#666666">can-i-actually-rank</text>
    <text x="159" y="108" fill="#666666">what-to-target-next</text>
    <text x="159" y="126" fill="#666666">map-my-site</text>

    <text x="306" y="34" font-size="13" font-weight="bold">Build</text>
    <text x="306" y="54" fill="#666666">brief-my-writer</text>
    <text x="306" y="72" fill="#666666">write-the-page</text>
    <text x="306" y="90" fill="#666666">make-it-sound-human</text>
    <text x="306" y="108" fill="#666666">make-me-quotable</text>
    <text x="306" y="126" fill="#666666">revive-old-pages</text>

    <text x="453" y="34" font-size="13" font-weight="bold">Spread</text>
    <text x="453" y="54" fill="#666666">get-cited-elsewhere</text>
    <text x="453" y="72" fill="#666666">show-up-in-communities</text>
    <text x="453" y="90" fill="#666666">spread-one-piece-everywhere</text>

    <text x="600" y="34" font-size="13" font-weight="bold">Prove</text>
    <text x="600" y="54" fill="#666666">check-before-i-publish</text>
    <text x="600" y="72" fill="#666666">show-me-progress</text>
    <text x="600" y="90" fill="#666666">what-actually-worked</text>
    <text x="600" y="108" fill="#666666">what-changed-in-search</text>
    <text x="600" y="126" fill="#666666">put-it-on-autopilot</text>

    <text x="12" y="226" font-size="13" font-weight="bold">Context layer</text>
    <text x="12" y="244" fill="#666666">context/business.md and data/strategy.json. Shared ids, verified by hash, one owner per field.</text>
    <text x="12" y="300" font-size="13" font-weight="bold">Deterministic core</text>
    <text x="12" y="318" fill="#666666">crawl, tier, score, ledger. Written in code, identical across runs, never produced by a model.</text>
  </g>
  <g stroke="#111111" stroke-width="1.5" fill="none">
    <path d="M67 164 v40"/><path d="M214 164 v40"/><path d="M361 164 v40"/><path d="M508 164 v40"/><path d="M654 164 v40"/>
  </g>
  <g stroke="#dddddd" stroke-width="1.5" fill="none">
    <path d="M361 256 v22"/>
  </g>
</svg>

The two layers below the phases are what stop twenty-six skills becoming twenty-six opinions. Every skill loads the same business context, in the same way, and each field in the strategy file has exactly one skill allowed to write it. The numbers underneath are computed in code, so two runs over unchanged input produce identical scores. No model produces or adjusts a score anywhere in the system.

## Why not just install a folder of SEO skills?

There are good individual skills in the wild, and this project studied several closely. [Sam Dunning's research pipeline](https://github.com/swan-gtm/gtm-skills/tree/main/skills/sam-dunning) is the sharpest public example of qualifying keyword candidates against the real SERP and killing most of them. [Yahav Fuchs' AEO set](https://github.com/swan-gtm/gtm-skills/tree/main/skills/yahav-fuchs) is right that an AI visibility score means nothing until you decompose it per engine and per market and read the raw answer. Both are worth your time, and Rainmaker takes the lessons.

The difference is structural.

| | A folder of skills | Rainmaker |
|---|---|---|
| Context | each skill re-derives the business from whatever it reads | one context layer, loaded identically, one owner per field |
| Numbers | the model produces the score | computed in code, identical across runs |
| Memory | the session | append-only ledger, strategy history, verification windows |
| Scope | keyword research, or AEO, or technical | your site, Google, answer engines and off-site, in one system |
| Structure | a list of pages to write | a site blueprint with one intent per URL and a publish budget |
| Ending | a plan | a record of what shipped, what moved, and what did nothing |

The last row is the one that matters. Anything can produce a plan. Very little will tell you, ninety days later, that four of the eleven things it recommended did nothing measurable, and then change its own mind about the strategy because of it.

## What makes ranking durable?

Three mechanisms, each of which tells you to do less.

**Nothing gets briefed without a SERP verdict.** Every candidate query ends up QUALIFY, CONDITIONAL or KILL after reading the live results. Beatability needs named evidence: a top-five result that does not serve the intent, a format gap, a stale set of pages, or your own measured history at that impression volume. Optimism is not evidence.

**Your publish rate is bounded by your indexation rate.** The system measures how many of your recent new pages actually got indexed and ranked, and sets a monthly budget from that. Publishing two hundred pages into a site that gets six indexed produces a hundred and ninety four pages of crawl waste and a diluted internal link graph.

**No fourth cluster opens while any existing cluster is under forty percent covered.** Three half-covered topics beat nothing. Six quarter-covered topics beat nothing at all.

## What can you ask it?

The system is meant to work at both ends of the range, from a personal site to one with tens of thousands of URLs.

A personal site or small blog:

- My site has about thirty pages and two hundred clicks a month. What is actually worth fixing?
- Which of my posts are dying, and should I refresh them or delete them?
- I write about two unrelated topics. Am I splitting my own authority?
- Do any AI assistants mention me when someone asks about my field?

A local or service business:

- I serve six suburbs. Should each one get its own page, or is that spam?
- Map the site structure for my services across the areas I cover.
- Which service pages could realistically reach the top three, and which am I wasting effort on?

Ecommerce:

- My category pages cannibalise each other. Show me which ones, and which to keep.
- Which product pages get impressions but no clicks, and is that a title problem or a ranking problem?

A mid-size B2B software company:

- We have four hundred blog posts and three comparison pages. Rebalance us.
- A competitor owns the alternatives queries. Can we take them, honestly?
- Which pages does sales actually send, and are any of them technically broken?
- Write the brief for a comparison page, but only if the SERP says we can win it.

A large site with several teams and tens of thousands of URLs:

- Rank every Tier 0 and Tier 1 page by revenue score and give me the top twenty with owners.
- How many pages can we publish a month before we exceed what this site gets indexed?
- Show me every cluster under forty percent complete before anyone opens a new one.
- Organic traffic dropped eighteen percent. Was that the core update, something we shipped, or neither? Show me the control.
- Of everything we shipped last quarter, what did nothing?

That last question is the one the system was built to answer, and the one most reporting is designed to avoid.

## What will it not do?

- Post to a community, send outreach, change live content, or delete a URL. It drafts, files issues and writes diffs. A person approves.
- Let a model compute or adjust a revenue score.
- Use third-party authority metrics anywhere in scoring.
- Buy links, exchange links, run multiple accounts to simulate independent voices, or ship doorway-page permutations.
- Claim an algorithm update caused a metric change. It reports timing consistency and shows whether unaffected pages moved too.

Every item on that list is either externally visible and hard to reverse, or a shortcut that trades a short-term signal for a long-term liability. The value of the system is that its record can be trusted, and an agent that can quietly publish is one bad inference away from destroying it.

## Bring your own keys

There is no hosted service and no account. Keys are read from your environment, used against the API they belong to, and sent nowhere else.

| Key | Unlocks |
|---|---|
| none | crawl, technical audit, tiering, scoring, site blueprint, reports |
| Google service account | Search Console and Analytics, which turns flat opportunity scoring into measured opportunity |
| Firecrawl | the default crawl provider |
| An AI model key | the interview, the writing skills, and citation probes per engine |
| PageSpeed, Clarity, SERP | higher rate limits, behavioural leak analysis, live SERP verdicts |

Everything degrades rather than fails. With zero keys you still get a full technical, structural and competitor diagnosis, and every report carries a mandatory section stating which capabilities were live and precisely what their absence weakens.
