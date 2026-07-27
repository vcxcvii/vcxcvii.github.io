---
layout: page
title: Michealangelo
seo_title: Design skills for AI coding agents | Michealangelo
description: Ship interfaces that stop looking AI-generated with 14 free design skills for AI coding agents, covering grids, colour, type, psychology, motion, and taste.
last_modified_at: 2026-07-27
intro: Ship interfaces that stop looking AI-generated. Give your coding agent design constraints, precise vocabulary, and a taste gate before release.
project: true
project_name: Michealangelo
repo: michealangelo
repo_url: https://github.com/vcxcvii/michealangelo
license: MIT
version: "0.2"
state: Public
mcp: true
application_category: DeveloperApplication
application_subcategory: AI interface design tools
audience: People building interfaces with AI coding agents
software_requirements: Claude Code, Codex, or another Agent Skills-compatible coding agent
feature_list:
  - Design-system routing across 14 skills
  - Grid, colour, typography, psychology, and motion guidance
  - Taste audit for generic AI interface patterns
  - Living design tokens and specifications
  - Hash-safe skill updates
faqs:
  - question: What is Michealangelo?
    answer: Michealangelo is a free pack of 14 Agent Skills that gives AI coding agents explicit rules for layout, colour, typography, psychology, motion, components, and design quality.
  - question: Which coding agents support Michealangelo?
    answer: It installs for Claude Code, Codex, and project-level Agent Skills directories used by other compatible coding agents.
  - question: Does Michealangelo generate a design system?
    answer: Yes. Its router combines relevant skills, while design-spec maintains living design tokens and a versioned specification across sessions.
  - question: Will it automatically overwrite my edited skills?
    answer: No. The updater compares file hashes from installation and reports locally edited skills instead of silently replacing them.
---

Michealangelo is a free pack of 14 design skills for AI coding agents. It gives Claude Code, Codex, and compatible agents explicit rules for layout, colour, typography, psychology, motion, components, and taste, so interface decisions come from a system instead of the average SaaS page in the model's training data.

Ask an unconstrained agent for a landing page and familiar defaults appear: centred hero, three cards, gradient button, decorative motion. Michealangelo replaces that pattern matching with constraints you can inspect and reuse.

## What improves when I use Michealangelo?

- **Output stops looking interchangeable.** `taste-audit` identifies generic AI interface patterns before they ship.
- **Design decisions come with reasons.** Grid, palette, typography, motion, and component choices point back to the rule they followed.
- **Fewer feedback rounds.** Precise constraints reduce repeated "not like that" corrections.
- **Sessions stay consistent.** `design-spec` maintains living design tokens and a versioned plan instead of leaving decisions inside an old chat.
- **Updates respect local edits.** Hash checks report changed skill files rather than silently overwriting your work.

The benefit is not a prettier first draft. It is a design process that remains arguable, repeatable, and easier to hand off.

## How does Michealangelo work?

`design-system` is the router. Tell it what you are building and it selects the relevant skills in the right order.

`grid-systems` sets layout, spacing, and type scale before components appear. `color-systems` generates palettes and checks contrast. `design-psychology` covers how people perceive and misread interfaces. `component-library` checks live registries instead of relying on model memory. `motion` adds movement only where it clarifies state. `taste-audit` runs last as the quality gate.

Supporting skills interrogate the brief, pair fonts, sharpen design vocabulary, write handoffs, and preserve design decisions across sessions.

## Why did I build it?

I rebuilt this website with agents. The first attempts looked like every other AI-generated site on the internet.

I do not write code beyond basic HTML, so I could see the problem without being able to repair every detail by hand. What I could do was describe good design precisely enough for a machine to follow: Müller-Brockmann on grids, contrast math instead of colour vibes, and exact language for differences such as kerning versus tracking or affordance versus signifier.

Michealangelo is that judgment turned into files. The wider argument is in [How to design without AI slop](/how-to-design-without-ai-slop/).

## How do I install Michealangelo?

```bash
npx github:vcxcvii/michealangelo install --target claude
```

Choose `codex`, `agents`, or `all` instead of `claude` for another target. Install only selected skills with `--skills grid-systems,color-systems`.

| Target | Installs to | Best for |
|---|---|---|
| `claude` | `~/.claude/skills/` | Claude Code |
| `codex` | `~/.codex/skills/` | Codex |
| `agents` | `./.agents/skills/` | Project-level compatible agents |
| `all` | All three locations | Multiple agents |

## What should I not expect?

Michealangelo cannot make you a designer or rescue a brief nobody has thought through. `grill-me` exists because vague audiences, goals, and constraints create vague output no design system can fully repair.

## Latest meaningful changes

{% include project-changelog.html %}

## Questions people ask

{% include project-faqs.html %}

## Found a design decision that still feels wrong?

[Open an issue on GitHub]({{ page.repo_url }}) with the brief, output, and correction you expected. That gap is useful input for the skill set. For a longer conversation, [book 30 minutes](https://cal.com/varun-choraria/30min).

Michealangelo is MIT licensed. Fork it, remove what you do not need, and disagree with it in public.
