---
layout: page
title: Michealangelo
seo_title: Michealangelo | Design taste skills for AI agents
description: A free skill pack that gives Claude Code, Codex and Cursor real design judgment. Grids, colour theory, psychology, and a taste audit that blocks AI slop.
intro: Give your AI coding assistant good taste. Fourteen skills, one install command, MIT licensed.
project: true
project_name: michealangelo
repo: michealangelo
repo_url: https://github.com/vcxcvii/michealangelo
license: MIT
version: "0.2"
state: Public
mcp: true
---

Ask any coding agent to build you a landing page and you get the same thing back. A hero, three feature cards, a testimonial slider, a gradient button.

It is not a talent problem. The model is averaging its training data, and the average landing page is bad.

## What is michealangelo?

A pack of fourteen [Agent Skills](https://agentskills.io/specification.md) that teach your agent design judgment instead of design defaults. Proper grids, real colour theory, human psychology, motion that clarifies rather than decorates, and a component choice made from a live registry rather than from memory.

`design-system` is the front door. Tell it what you are building and it decides which of the other skills apply, and in what order, rather than you or the agent guessing.

The rest sit behind it. `grid-systems` sets layout, spacing and type scale before a single component is placed. `color-systems` generates palettes and checks contrast rather than copying a trend. `design-psychology` covers cognitive bias and how people actually misread interfaces. `taste-audit` is the gate that catches generic SaaS patterns before they ship. `design-observer` watches for the moments you override a suggestion and logs them, so the pack improves from use.

## Why I built it

I rebuilt this website with agents, and the first three attempts looked like every other AI-generated site on the internet.

That bothered me more than it should have. I do not write code beyond basic HTML, so I could see the problem clearly and could not fix it by hand. What I could do was write down what good looks like, precisely enough that a machine could follow it.

So the skills are mostly transcribed judgment. Müller-Brockmann on grids. Colour theory that runs a contrast check instead of vibes. A vocabulary skill that forces the difference between kerning and tracking, or affordance and signifier, because vague words create ambiguity at handoff.

I wrote about the wider argument in [How to design without AI slop](/how-to-design-without-ai-slop/).

## How do I install it?

```bash
npx github:vcxcvii/michealangelo install --target claude
```

No sign-up, no npm package to trust, no account. It copies a folder of skill files into `~/.claude/skills/`. Restart your session and they are available.

| Target | Installs to | Use for |
|---|---|---|
| `claude` (default) | `~/.claude/skills/` | Claude Code |
| `codex` | `~/.codex/skills/` | Codex |
| `agents` | `./.agents/skills/` | Any Agent-Skills-compatible agent |
| `all` | all of the above | Multiple agents at once |

You can install a subset with `--skills grid-systems,color-systems`, and `update` never silently overwrites a skill file you have hand-edited. It checks a hash from install time and reports what it skipped.

## What outcomes can I expect?

- **Output that stops looking generated.** The taste audit is the part people notice first, because it names the pattern instead of saying "make it better."
- **Decisions with reasons attached.** Layout, palette and component choices come with the rule they followed, which makes them arguable rather than mysterious.
- **Consistency across sessions.** The same brief produces the same system, because the constraints live in files rather than in a chat you closed.
- **Fewer rounds.** Most of the value is not the first draft. It is not having to say "no, not like that" four times.

What it will not do: make you a designer, or rescue a brief nobody has thought about. `grill-me` exists because half the bad output traces back to a request nobody interrogated.

## What changed recently

{% assign entries = site.data.quest_releases[page.repo] %}{% if entries and entries.size > 0 %}{% for e in entries limit: 5 %}
**{{ e.date }}** · {{ e.title }}{% if e.url %} · [view]({{ e.url }}){% endif %}
{% if e.body %}
{{ e.body }}
{% endif %}{% endfor %}
{% else %}
Nothing logged yet. The changelog refreshes itself from the repository.
{% endif %}

## Something feel wrong in the output?

That is the most useful feedback there is, and it is how the pack grows. [Book 30 minutes](https://cal.com/varun-choraria/30min) or open an issue on [the repo]({{ page.repo_url }}).

MIT licensed. Fork it, strip it down, disagree with it in public.

Related: [interview-recon](/side-quests/interview-recon/) for company research, and everything else on [side quests](/side-quests/).
