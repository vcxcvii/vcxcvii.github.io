---
layout: page
title: Interview Recon
seo_title: AI interview research skill | Interview Recon
description: Build a sourced company dossier, JD-mapped talking points, sharp questions, and a grounded 90-day plan with this free AI interview research skill.
last_modified_at: 2026-07-27
intro: Walk into interviews with a sourced company dossier, JD-mapped talking points, sharper questions, and a grounded 90-day plan.
install_lede: "Install for Claude Code:"
install_command: "git clone https://github.com/vcxcvii/interview-recon.git ~/.claude/skills/interview-recon"
project: true
project_name: Interview Recon
repo: interview-recon
repo_url: https://github.com/vcxcvii/interview-recon
license: MIT
state: Public
mcp: true
application_category: BusinessApplication
application_subcategory: Interview preparation software
audience: Job candidates using AI coding agents
software_requirements: An Agent Skills-compatible AI agent. Firecrawl is optional.
feature_list:
  - Sourced company dossier
  - Job-description-mapped talking points
  - Grounded 90-day plan
  - Interview questions based on current company signals
  - Persistent research across interview rounds
faqs:
  - question: Is Interview Recon free?
    answer: Yes. Interview Recon is MIT licensed. It works with your agent's built-in web tools, so a paid scraping API is optional.
  - question: Which AI agents support Interview Recon?
    answer: It works with Claude Code, Codex, Cursor, and other agents that support the Agent Skills format.
  - question: What does Interview Recon produce?
    answer: It produces a sourced company dossier, strategy canvas, go-to-market teardown, people signals, JD-mapped talking points, a 90-day plan, and questions to ask.
  - question: Does it reuse research between interview rounds?
    answer: Yes. It loads the existing dossier, refreshes stale material, and appends notes from each round instead of starting over.
---

Open Claude Code and say, "prep me for my interview at [company]." For another Agent Skills-compatible tool, place the repository in that agent's skills directory.

Interview Recon is a free AI interview research skill for candidates using Claude Code, Codex, Cursor, or another Agent Skills-compatible agent. It turns a job description and public company sources into a reusable dossier: JD-mapped talking points, a grounded 90-day plan, credible questions, and citations you can verify before the call.

Most candidates skim a company website the night before. Real research takes days, so everyone arrives repeating the same surface-level facts. Interview Recon compresses that work into an afternoon while keeping the evidence attached. I built it during my own 2026 job hunt, when I was running several interview processes at once, losing the source behind useful facts, and repeating research before every round. The full build story, with screenshots, is in [Hunting Season for the Rest of Us](/hunting-season-for-the-rest-of-us/).

## What will I walk into the interview with?

- **Talking points tied to the job description.** Each requirement connects to company evidence and a point you can defend.
- **A 90-day plan grounded in current moves.** Hiring, product, pricing, competitors, funding, and public-market signals shape the plan.
- **Questions other candidates will not ask.** The strongest questions come from tensions in the company's own strategy, not generic interview lists.
- **Claims you can verify.** Every factual claim carries a numbered source, URL, and fetch date.
- **Research that survives the next round.** The dossier persists, refreshes stale material, and records what earlier interviewers asked.

The output is designed for use in the room, not for producing the longest possible research document.

## How does Interview Recon work?

1. **Save the job description first.** Listings disappear. Your copy becomes the spine of the research.
2. **Approve a short research plan.** The skill names its questions, sources, backend, and budget before fetching.
3. **Research the company in a fixed order.** It covers products, pricing, competitors, content, leadership, hiring, news, funding, and relevant earnings calls.
4. **Synthesize a candidate dossier.** You get a one-page brief, strategy canvas, go-to-market teardown, people signals, interview kit, and source log.

Public neighbours matter when the target company is private. Their earnings calls expose market pressures and narratives your interviewer may already be working inside.

## Do I need a paid scraping API?

No. Without a key, Interview Recon uses your agent's built-in web search and fetch. The workflow and outputs stay the same. It flags JavaScript-heavy or bot-protected pages it could not fully inspect instead of pretending the research is complete.

With a Firecrawl key, it can use faster scraping. It announces a credit budget before starting: 15 credits in quick mode or 40 in deep mode. It never exceeds that budget without asking.

## What should I not expect?

Interview Recon cannot see private company information, replace your judgment, or make you sound like someone you are not. It turns public evidence into better preparation. You still decide what is true, relevant, and worth saying.

## Latest meaningful changes

{% include project-changelog.html %}

## Questions people ask

{% include project-faqs.html %}

## Want to improve the next interview kit?

[Open an issue on GitHub]({{ page.repo_url }}) with a missing source, broken workflow, or output that did not help. For a longer conversation, [book 30 minutes](https://cal.com/varun-choraria/30min).

Interview Recon is MIT licensed. Fork it, adapt it, and keep your research. If you also need case-interview frameworks, [Master Shifu](/side-quests/master-shifu/) chains into it.
