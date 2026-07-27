---
layout: page
title: Master Shifu
seo_title: Master Shifu | Consulting frameworks for AI agents
description: Free skill pack turning 32 consulting case frameworks from 19 MBA casebooks into commands your AI agent can run. Profitability, market entry, pricing, M&A.
intro: Thirty-two consulting frameworks, extracted from nineteen MBA casebooks, as commands your agent can actually run.
project: true
project_name: master-shifu
repo: master-shifu
repo_url: https://github.com/vcxcvii/master-shifu
license: MIT
state: Public
mcp: true
---

Ask an AI to solve a business problem and it will answer immediately. That is the problem. It skips straight to a recommendation without isolating the cause, and confident output with no structure underneath is worse than no output.

Consultants solve this with frameworks. The frameworks are not secret. They are just badly distributed, sitting in casebooks nobody reads twice.

## What is master-shifu?

A pack of consulting case frameworks turned into [Agent Skills](https://agentskills.io/specification.md). Profitability, market entry, pricing, M&A, cost reduction, industry analysis, and twenty-six more. Each one is a command your agent can run.

`/master-shifu` is the router. You describe a problem, it works out which frameworks fit, and chains them.

Before it analyses anything it grills you. What data do you have? What is the trend? What is the evidence? Then it runs the analysis through five lenses, customer, competition, financial, operations and market, and only then does it produce a recommendation you can argue with.

## Why I built it

I spent years being told to be "more strategic" without anyone defining it. The honest answer, when I finally found it, was unglamorous: strategy is mostly structured decomposition, and structured decomposition is learnable.

So I read nineteen casebooks and pulled out what actually repeated. Thirty-two frameworks survived. Turning them into skills was the only way to make sure I used them under pressure instead of reaching for whatever I remembered.

The related essay is ["You're not strategic enough", said Manager](/youre-not-strategic-enough-said-manager/), and the build story is in [I now have my own Master Shifu](/i-now-have-my-own-master-shifu/).

## How do I install it?

```bash
curl -fsSL https://raw.githubusercontent.com/vcxcvii/master-shifu/main/install.sh | bash
```

Or with npx:

```bash
npx skills add vcxcvii/master-shifu
```

Works with Claude Code, Codex, Cursor, Windsurf, or anything else supporting the Agent Skills spec. Then describe a problem: "our SaaS margins are down 12 percent this quarter."

## What outcomes can I expect?

- **A cause, not a guess.** The framework isolates where the problem actually sits before proposing anything.
- **Questions before answers.** The grill phase catches the missing data that would have made the analysis wrong.
- **Case-interview practice that behaves like a real interviewer.** It chains with [interview-recon](/side-quests/interview-recon/) for company-specific case shapes.
- **A structure you can defend in a room**, which matters more than being right on the first pass.

What it will not do: know your business, replace judgment, or rescue a decision you have already made and want justified.

## What changed recently

{% assign entries = site.data.quest_releases[page.repo] %}{% if entries and entries.size > 0 %}{% for e in entries limit: 5 %}
**{{ e.date }}** · {{ e.title }}{% if e.url %} · [view]({{ e.url }}){% endif %}
{% if e.body %}
{{ e.body }}
{% endif %}{% endfor %}
{% else %}
Nothing logged yet. The changelog refreshes itself from the repository.
{% endif %}

## Used it on a real problem?

I want to hear where it broke. [Book 30 minutes](https://cal.com/varun-choraria/30min) or open an issue on [the repo]({{ page.repo_url }}).

MIT licensed. The frameworks were never mine to gatekeep.

Related: [interview-recon](/side-quests/interview-recon/), [michealangelo](/side-quests/michealangelo/), and the rest on [side quests](/side-quests/).
