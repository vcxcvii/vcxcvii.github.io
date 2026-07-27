---
layout: page
title: Master Shifu
seo_title: Consulting frameworks for AI agents | Master Shifu
description: Find root causes before recommendations with 32 free consulting frameworks for AI agents, covering profitability, pricing, market entry, M&A, and more.
last_modified_at: 2026-07-27
intro: Find the cause before proposing the fix. Give your AI agent 32 consulting frameworks, a question-first workflow, and recommendations you can defend.
project: true
project_name: Master Shifu
repo: master-shifu
repo_url: https://github.com/vcxcvii/master-shifu
license: MIT
state: Public
mcp: true
application_category: BusinessApplication
application_subcategory: Business analysis software
audience: Operators, consultants, founders, and case-interview candidates
software_requirements: An Agent Skills-compatible AI agent
feature_list:
  - Root-cause analysis before recommendations
  - 32 consulting frameworks from 19 MBA casebooks
  - Question-first diagnostic workflow
  - Five-lens business analysis
  - Framework routing and chaining
faqs:
  - question: What is Master Shifu?
    answer: Master Shifu is a free pack of 32 consulting frameworks converted into Agent Skills for structured business analysis and case-interview practice.
  - question: Which business problems can it analyse?
    answer: It covers profitability, pricing, market entry, M&A, cost reduction, industry analysis, growth, operations, and other common strategy problems.
  - question: Does Master Shifu choose the framework for me?
    answer: Yes. The master-shifu router matches the problem to suitable frameworks, asks for missing evidence, and chains multiple frameworks when needed.
  - question: Can it replace a consultant or operator?
    answer: No. It structures evidence and reasoning. It cannot know private context, validate weak inputs, or replace accountable human judgment.
---

Master Shifu is a free pack of 32 consulting frameworks for AI agents. Describe a business problem and its router chooses the right frameworks, asks for missing evidence, analyses the problem through five business lenses, and produces a recommendation you can inspect, challenge, and defend.

Most AI answers fail before the writing starts. The agent accepts the first framing, skips root-cause analysis, and produces a polished recommendation for the wrong problem. Master Shifu makes the reasoning happen before the answer.

## What changes when I use Master Shifu?

- **You get a cause, not a guess.** Profitability, pricing, market entry, M&A, cost reduction, and other frameworks isolate where the problem sits.
- **Missing evidence becomes visible.** The question-first grill exposes assumptions, absent trends, and weak data before analysis begins.
- **Recommendations have a structure.** Customer, competition, financial, operations, and market lenses make the conclusion easier to audit.
- **You can defend the work in a room.** The output shows how the answer was reached, not only what the answer is.
- **Case practice behaves more like an interview.** The agent asks, waits, tests, and routes instead of immediately revealing a model answer.

Better structure does not guarantee the right decision. It gives you something concrete to disagree with before the decision becomes expensive.

## How does Master Shifu work?

`/master-shifu` is the router. You describe the situation in plain language. It identifies useful frameworks, explains the order, and asks for the evidence each framework needs.

The pack covers 32 recurring business problem shapes extracted from 19 MBA casebooks. Frameworks can run alone or chain together. A margin decline might begin with profitability, move into cost structure, and end with pricing. A market-entry question may need industry analysis before the entry framework is useful.

## Why did I build it?

I spent years being told to be "more strategic" without anyone defining what that meant. The useful answer was unglamorous: strategy is mostly structured decomposition, and structured decomposition can be learned.

I read 19 casebooks and kept the frameworks that repeatedly helped separate symptoms from causes. Turning them into Agent Skills made them available under pressure, when memory usually reaches for the most familiar framework instead of the right one.

The related essay is ["You're not strategic enough", said Manager](/youre-not-strategic-enough-said-manager/). The build story is in [I now have my own Master Shifu](/i-now-have-my-own-master-shifu/).

## How do I install Master Shifu?

```bash
curl -fsSL https://raw.githubusercontent.com/vcxcvii/master-shifu/main/install.sh | bash
```

Or:

```bash
npx skills add vcxcvii/master-shifu
```

It works with Claude Code, Codex, Cursor, Windsurf, and other tools supporting the Agent Skills format. Then describe the problem: "our SaaS margins fell 12 percent this quarter."

## What should I not expect?

Master Shifu cannot know your business, repair missing data, or rescue a conclusion you already chose and want justified. A framework is a lens, not evidence. You remain responsible for the inputs and the decision.

## Latest meaningful changes

{% include project-changelog.html %}

## Questions people ask

{% include project-faqs.html %}

## Used it on a real problem?

[Open an issue on GitHub]({{ page.repo_url }}) with the problem shape, chosen framework, and where the reasoning broke. For a longer conversation, [book 30 minutes](https://cal.com/varun-choraria/30min).

Master Shifu is MIT licensed. Pair it with [Interview Recon](/side-quests/interview-recon/) when a company-specific interview needs both research and case frameworks.
