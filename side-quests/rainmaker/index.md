---
layout: page
title: Rainmaker
seo_title: Free SEO agent for Codex and Claude Code | Rainmaker
description: Rainmaker is a free, open-source SEO and AEO agent for Codex and Claude Code. Crawl your site, rank fixes by revenue impact, and prove what worked.
last_modified_at: 2026-08-01
intro: A free, open-source SEO and AEO agent that runs inside Codex, Claude Code, and compatible coding assistants. It crawls your site, finds the three fixes closest to revenue, and remembers whether they worked.
project: true
project_name: Rainmaker
repo: rainmaker
repo_url: https://github.com/vcxcvii/rainmaker
npm_url: https://www.npmjs.com/package/@vcxcvii/rainmaker
license: MIT
state: Public
version: "0.4.0"
mcp: true
application_category: DeveloperApplication
application_subcategory: Open-source SEO and AEO agent
audience: Website owners, founders, marketers, and developers using Codex, Claude Code, or another coding assistant with project skills and command access
software_requirements: Node.js 20 or newer. A compatible coding assistant is recommended. No separate AI model key is required for the normal workflow.
feature_list:
  - Host-native Rainmaker skill triggered by run rainmaker
  - Built-in website crawler that needs no paid provider
  - Revenue tiering that ranks every URL by distance to money
  - Three recommended fixes instead of an unprioritized issue dump
  - Live SERP verdicts that reject weak content targets
  - Search Console, GA4, Clarity, and optional provider connections
  - Append-only ledger that records what shipped and what changed
  - Native Codex plugin plus Claude Code and portable project skills
faqs:
  - question: What is Rainmaker?
    answer: Rainmaker is a free, open-source SEO and AEO agent for coding assistants. It crawls your website, connects findings to how the business makes money, recommends the three most useful fixes, and records whether those fixes worked.
  - question: How do I start Rainmaker?
    answer: Install the plugin for your assistant, open it in your site project, and say run rainmaker. The skill asks for your site URL and sets everything up itself. If your assistant has no plugin support, run npx @vcxcvii/rainmaker init --site https://yoursite.com in the site project first, then say run rainmaker. Run it in the folder for the site rather than your home directory.
  - question: Do I need an OpenAI or Anthropic API key?
    answer: No for the normal workflow. The assistant you already opened conducts the conversation using its existing model session. A separate model API key is only needed for the optional standalone terminal agent and direct AI citation probes.
  - question: Why can Rainmaker not use my ChatGPT or Claude subscription from the standalone CLI?
    answer: App subscriptions do not expose their session credentials or model runtime to child command-line processes. Rainmaker avoids that problem by running the interview inside the assistant itself. The CLI only handles crawling, measurement, scoring, and memory.
  - question: Does Rainmaker use Firecrawl automatically if it finds my key?
    answer: No, and it does not quietly ignore the key either. The built-in crawler is the default. When a Firecrawl or context.dev key is present, Rainmaker reads your live credit balance, tells you what you have, and asks which crawler you want before the first crawl. The answer is saved as crawl.provider in rainmaker.config.yml and honoured afterwards, so you are asked once rather than once per crawl. A crawl projected to exceed your remaining balance is refused.
  - question: Is Rainmaker a replacement for Ahrefs, Semrush, or an experienced SEO agency?
    answer: It replaces repetitive crawling, prioritization, and measurement, not every kind of judgment. Ahrefs and Semrush remain useful data sources. An experienced operator is still better at stakeholder alignment, customer nuance, creative positioning, and decisions where the evidence is incomplete.
  - question: Will Rainmaker publish content or change my live site by itself?
    answer: No. It can draft, edit local files, and file issues. Publishing, outreach, redirects, deletions, and other externally visible actions require human approval.
---

## What is Rainmaker?

Rainmaker is a free SEO and AEO agent that works inside your coding assistant. Point it at a website and it will crawl the pages, work out which problems sit closest to revenue, and give you three things worth doing next. It keeps a permanent record, so it can later tell you what improved and what did nothing.

[View the source on GitHub]({{ page.repo_url }}) or [book 30 minutes with me](https://cal.com/varun-choraria/30min) if you want help applying it to a real site.

## What problem does it solve?

Most SEO audits produce a long list of problems. A missing alt attribute on a careers page can sit beside a noindexed pricing page. Both look urgent. Neither comes with a useful answer to the question that matters:

> Which fix is most likely to help this website make money?

Rainmaker starts there. It sorts every page into a simple revenue tier, computes scores in code, and recommends three fixes instead of sixty. Then it records what was shipped and checks the right metric after enough time has passed.

## What do I get?

- **A first audit with no paid account.** The built-in crawler works without Firecrawl, Ahrefs, Semrush, or a model API key.
- **Three prioritized fixes.** Each recommendation explains the evidence, likely impact, effort, and consequence of doing nothing.
- **A grounded interview.** Rainmaker crawls first, then asks one question at a time using facts from your site.
- **SEO and AEO in one workflow.** It covers technical problems, search demand, live SERPs, site structure, answer-engine citations, and content quality.
- **Memory across sessions.** An append-only ledger records what Rainmaker believed, what changed, what shipped, and what moved.
- **A safer agent.** Scores are deterministic. Paid providers require approval. Publishing and other hard-to-reverse actions stay human-controlled.

## How does Rainmaker work?

| Step | What happens | What you get |
|---|---|---|
| 1. Crawl | The built-in crawler reads the site before asking business questions. | A factual diagnosis, even with zero credentials. |
| 2. Understand | Your assistant asks one evidence-based question at a time about buyers, conversions, competitors, and value. | Shared business context instead of generic SEO advice. |
| 3. Prioritize | Code ranks findings by distance to revenue, opportunity, severity, confidence, and effort. | Three fixes worth considering now. |
| 4. Implement | You choose a fix. The assistant drafts the change or creates the work item. | A reviewable diff or issue, not a silent production change. |
| 5. Prove | Rainmaker checks the relevant metric after its verification window. | A record of what worked, regressed, or did nothing. |

That final step is the point. A plan becomes stale. A system that changes its mind when the evidence changes becomes more useful.

## Install Rainmaker

Install the plugin for your assistant (below), open it in your website project, and say:

```text
run rainmaker
```

That is the whole setup. The front-door skill asks for your site URL, sets the project up itself, crawls, and opens the conversation from what it found. You never drive the CLI by hand.

If your assistant has no plugin support, set the project up first and then say the same thing:

```bash
npx @vcxcvii/rainmaker init --site https://yoursite.com
```

Run that in the folder for the site, not your home directory: it writes configuration, context and skill copies into the working directory, and refuses a home directory unless you pass `--force`.

Rainmaker installs one front-door skill plus 26 decision skills. The front door resumes from the first incomplete step. It does not launch a second chatbot or ask for another model key.

### Install the native Codex plugin

```bash
codex plugin marketplace add vcxcvii/rainmaker --ref main
codex plugin add rainmaker@vcxcvii
```

Start a new Codex task in your website project and say `run rainmaker`.

### Install the Claude Code plugin

```text
/plugin marketplace add vcxcvii/rainmaker
/plugin install rainmaker@vcxcvii
```

Claude Code gets the same front-door workflow plus a session hook that notices unfinished Rainmaker work.

## Do I need API keys?

No key is required for the first useful result.

| Credential | What it adds | Required? |
|---|---|---|
| None | Built-in crawl, technical checks, revenue tiers, scoring, and reports | No |
| Google service account | Search Console opportunity data and GA4 conversion evidence | Optional |
| Clarity | Behavioural evidence such as dead clicks and rage clicks | Optional |
| Firecrawl or context.dev | Alternative crawling for sites that need it | Optional and approval-gated |
| OpenAI or Anthropic API key | Standalone terminal agent and direct citation probes | Optional |

Your Codex or Claude Code session already supplies the model for the normal workflow. The local CLI cannot borrow subscription credentials from those apps, so it does not try.

## What can I ask Rainmaker?

- “Which three fixes are closest to revenue?”
- “Our traffic fell. Was it something we shipped, a wider search change, or neither?”
- “Which pages get impressions but fail to earn clicks?”
- “Can we realistically rank for this query? Read the live results before answering.”
- “What did we ship last quarter that produced no measurable improvement?”

It works for a thirty-page personal site, an ecommerce catalogue, a local business, a B2B software company, or a site with thousands of URLs. The revenue model and conversion paths change the advice.

## How is it different from other SEO tools?

| Option | Good at | What Rainmaker adds |
|---|---|---|
| Ahrefs or Semrush | Large search, backlink, and competitor datasets | A decision layer that ranks work by business value and remembers outcomes |
| Site audit crawler | Finding technical defects | Revenue tiers, buyer context, implementation, and verification |
| Folder of SEO skills | Giving an assistant specialist prompts | One shared strategy, deterministic scoring, and one owner per decision |
| Experienced agency | Nuance, stakeholder work, creative judgment, and accountability | A transparent local system the agency or in-house team can inspect and reuse |

Rainmaker is strongest at repeatable analysis, prioritization, and memory. It is weaker where the answer lives in customer politics, company context, taste, or judgment that has not yet become evidence. That is deliberate, not hidden.

## What will Rainmaker never do quietly?

- Spend Firecrawl or another paid provider’s quota because a key exists. It asks first, shows you the balance, and remembers your answer.
- Let a model invent or adjust a revenue score.
- Publish content, post in communities, send outreach, redirect a page, or delete a URL.
- Pretend an algorithm update caused a change when the evidence only shows timing.
- Hide missing Search Console, GA4, or other evidence from the report.

## Latest meaningful changes

{% include project-changelog.html %}

## Questions people ask

{% include project-faqs.html %}

## Want the system plus human judgment?

Rainmaker handles the repeatable work. I can help with the parts that need an experienced operator: positioning, prioritization, buyer nuance, content judgment, and getting a team to act on the evidence.

[Book a 30-minute call with me](https://cal.com/varun-choraria/30min), [open an issue]({{ page.repo_url }}/issues), or fork the MIT-licensed project and make it disagree with me in public.
