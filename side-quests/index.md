---
layout: side-quests
title: Side Quests
intro: "Built with AI: projects, tools, and rabbit holes. Most started as weekend curiosity. A few became things I use every day."
mcp: true
---

<section class="projects-category">
  <h2>Work</h2>
  <p class="category-intro">Tools and systems I built for GTM Buddy's Revenue Activation practice.</p>

  <details class="project-card">
    <summary>
      <span class="project-name">GTM Buddy Marketing Skills</span>
      <span class="status-badge status-internal">Internal</span>
      <span class="project-updated">Updated May 17, 2026</span>
      <span class="expand-icon">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="3.5,4.5 6,7.5 8.5,4.5"/></svg>
      </span>
    </summary>
    <div class="project-body">
      <pre class="ascii-logo"><span class="ascii-art ascii-art-retro"> ████  █████  █   █
█        █    ██ ██
█  ██    █    █ █ █
█   █    █    █   █
 ███     █    █   █</span></pre>

      <p>I built 55+ marketing skills for <span class="tool-inline">{% include logo.html name="claude-code" %}Claude Code</span> and <span class="tool-inline">{% include logo.html name="codex" %}Codex</span>, purpose-built for GTM Buddy. Every skill reads the same shared positioning context, so every output — a competitor profile, a cold email, an SEO audit — comes out on-brand without re-briefing the agent each time.</p>

      <div class="project-section">
        <h4>How I built it</h4>
        <p>I structured these as Markdown files with YAML frontmatter. Each skill references shared context files (<code>product-marketing-context.md</code>, <code>content-governance.md</code>, <code>content-standards.md</code>, <code>keyword-universe.md</code>) that encode GTM Buddy's Revenue Activation ontology, vocabulary, and brand rules. When someone asks an agent to do marketing work, it loads the right skill automatically.</p>
        <p>I also built an auto-orchestration system — five core skills (<code>seo-audit</code>, <code>copywriting</code>, <code>schema</code>, <code>cro</code>, <code>ai-seo</code>) form a unified SEO + AEO analysis engine. Running <code>/copywriting</code> outputs a validated title tag, H1, and meta description automatically. Running <code>/seo-audit</code> applies schema fixes and CTR rewrites inline.</p>
      </div>

      <div class="project-section">
        <h4>Features</h4>
        <ul>
          <li>55+ skills across the full marketing spectrum (SEO, CRO, copy, ads, analytics, email, social, research, pricing, launch, RevOps, ASO)</li>
          <li>Shared context layer — skills read Revenue Activation ontology, content governance, keyword universe automatically</li>
          <li>Skill auto-orchestration — running one skill triggers related skills automatically</li>
          <li>Dual agent support — works in both <span class="tool-inline">{% include logo.html name="claude-code" %}Claude Code</span> and <span class="tool-inline">{% include logo.html name="codex" %}Codex</span></li>
          <li>CLI installer — single command installs all skills into either agent</li>
          <li>No-em-dash rule enforced across all copy output</li>
          <li>SEO guardrails wired into every search-facing skill</li>
        </ul>
      </div>

      <div class="project-section">
        <h4>Version history</h4>
        <ul class="version-list">
          <li><strong>2.0.0</strong> (May 17, 2026) — Upstream v2.0 sync: 17 skill renames, consolidated CRO engine, added co-marketing, directory-submissions, image, and video skills</li>
          <li><strong>1.4.0</strong> (May 4, 2026) — WebPage schema baseline, enhanced SEO audits</li>
          <li><strong>1.3.0</strong> (May 1, 2026) — Unified SEO + AEO analysis engine, auto-orchestration of copywriting with ai-seo, canonical URL table</li>
          <li><strong>1.0.0</strong> (Mar 2026) — Initial release with 30 skills</li>
        </ul>
      </div>

    </div>
  </details>

  <details class="project-card">
    <summary>
      <span class="project-name">GTM Buddy Design × Engineering</span>
      <span class="status-badge status-internal">Internal</span>
      <span class="project-updated">Updated May 17, 2026</span>
      <span class="expand-icon">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="3.5,4.5 6,7.5 8.5,4.5"/></svg>
      </span>
    </summary>
    <div class="project-body">
      <pre class="ascii-logo"><span class="ascii-art ascii-art-retro">████     █   █████
█   █    █   █
█   █  █████ ████
█   █    █   █
████     █   █████</span></pre>

      <p>I built a reusable agent workspace for building GTM Buddy web pages. Clone it, open it, and ship work that is on-brand, responsive, and production-ready — without briefing the agent each time. 37 skills across three layers: Design × Ship, Engineering, and QA.</p>

      <div class="project-section">
        <h4>How I built it</h4>
        <p>I designed it around a simple workflow: drop any URL into <span class="tool-inline">{% include logo.html name="claude-code" %}Claude Code</span>. The agent crawls the page using Playwright <span class="tool-inline">{% include logo.html name="mcp" %}MCP</span> and returns a full pass/fail report with fixes ready to paste into Webflow. It takes screenshots at 390px, 768px, 1024px, 1440px, extracts the DOM (title, H1, meta, canonical, schema, OG tags), scans copy for em dashes and category framing drift, checks accessibility, and even clicks CTAs and submits forms to verify they work.</p>
        <p>I also wired in a Figma pipeline — drop a Figma URL and the agent compares the design against <code>DESIGN.md</code> tokens before the Webflow build starts. Every ❌ blocker includes a ready-to-paste fix in GTM Buddy voice.</p>
      </div>

      <div class="project-section">
        <h4>Features</h4>
        <ul>
          <li>37 skills across 3 layers: Design × Ship (11 skills), Engineering (18 skills), QA (8 skills)</li>
          <li>Auto page audit via Playwright — screenshots at 4 breakpoints, DOM extraction, copy scan, a11y check, CTA verification</li>
          <li>Figma-to-Webflow pipeline — compares design against DESIGN.md tokens before build</li>
          <li>Every ❌ blocker includes a ready-to-paste fix in GTM Buddy voice</li>
          <li>Fast mode: skip description columns, launch landing pages in single prompts</li>
          <li>Git guardrails — conventional commit enforcement, pre-commit hooks</li>
          <li><code>/qa</code> agent — full Gate-2 audit (page-level, visual regression, copy QA, domain scanning)</li>
        </ul>
      </div>

      <div class="project-section">
        <h4>Version history</h4>
        <ul class="version-list">
          <li><strong>1.3.0</strong> (May 17, 2026) — Agentic QA layer: /qa and /figma-qa skills, Playwright <span class="tool-inline">{% include logo.html name="mcp" %}MCP</span> integration, routing rules</li>
          <li><strong>1.2.0</strong> (May 17, 2026) — DESIGN.md token system, block-char logo, repo rename from lp-design to design-engg</li>
          <li><strong>1.1.0</strong> (May 2026) — Full page audit pipeline, multi-breakpoint screenshots</li>
          <li><strong>1.0.0</strong> (Apr 2026) — Initial workspace with lp-design, copywriting, and engineering fundamentals</li>
        </ul>
      </div>

    </div>
  </details>

  <details class="project-card">
    <summary>
      <span class="project-name">GTM Skills (SDR)</span>
      <span class="status-badge status-internal">Internal</span>
      <span class="project-updated">Updated May 15, 2026</span>
      <span class="expand-icon">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="3.5,4.5 6,7.5 8.5,4.5"/></svg>
      </span>
    </summary>
    <div class="project-body">
      <pre class="ascii-logo"><span class="ascii-art ascii-art-retro">████  ████   ████
█     █   █  █   █
███   █   █  ████
  █   █   █  █  █
███   ████   █   █</span></pre>

      <p>I created 5 <span class="tool-inline">{% include logo.html name="claude-code" %}Claude Code</span> skills that give a new SDR ready-to-use outreach for any prospect, persona, or situation. Describe your prospect, mention any trigger event (funding round, layoffs, competitive tool), and the right skill fires automatically: cold call script, LinkedIn message, email sequence, or competitive displacement copy — all in GTM Buddy's Revenue Activation framing.</p>

      <div class="project-section">
        <h4>How I built it</h4>
        <p>I centralized routing through a parent skill (<code>sdr</code>) that classifies input into four types (CSV prospect list, free-form request, navigation question, direct channel request), runs trigger detection, and routes to the correct sub-skill automatically. Sub-skills never call each other — routing is centralized so the system is easy to extend.</p>
        <p>Each sub-skill loads shared references I curated: per-persona triggers and vocabulary, the Five Levers messaging framework, competitive intelligence on Highspot/Seismic/Showpad, and industry-specific ROI models. I also built a CSV prospect list mode — upload a spreadsheet and get a full outreach kit per row.</p>
      </div>

      <div class="project-section">
        <h4>Features</h4>
        <ul>
          <li>5 skills: parent router, cold call, LinkedIn DM, email sequences, competitive displacement</li>
          <li>10 email sequences (A–J) covering cold, follow-up, breakup, and trigger-based outreach</li>
          <li>6 reference files: personas, messaging, competitive intel, capacity math, playbook, industry maps</li>
          <li>CSV prospect list mode — generate full outreach kits per row automatically</li>
          <li>Trigger event detection — funding, layoffs, new hire, competitive tool, lost deal, went dark</li>
          <li>Hook-pitch-offer structure enforced on all output (no labels)</li>
          <li>300-char character count display on LinkedIn connection requests</li>
          <li>Competitive displacement for Highspot, Seismic, Showpad, Letter AI, Trumpet — including merger narrative</li>
        </ul>
      </div>

      <div class="project-section">
        <h4>Version history</h4>
        <ul class="version-list">
          <li><strong>1.1.0</strong> (May 15, 2026) — Filled playbook gaps, added SDR team onboarding docs, expanded sequences</li>
          <li><strong>1.0.0</strong> (May 7, 2026) — Initial release with full SDR skill suite and 10 sequences</li>
        </ul>
      </div>

    </div>
  </details>
</section>

<section class="projects-category">
  <h2>Personal</h2>
  <p class="category-intro">Side projects born from curiosity, necessity, or boredom.</p>

  <details class="project-card">
    <summary>
      <span class="project-name">VC's Notes</span>
      <span class="status-badge status-public">Live</span>
      <span class="project-updated">Updated May 16, 2026</span>
      <span class="expand-icon">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="3.5,4.5 6,7.5 8.5,4.5"/></svg>
      </span>
    </summary>
    <div class="project-body">
      <pre class="ascii-logo ascii-logo-vc"><span class="ascii-art ascii-art-starlight">█   █  ███
█   █ █
█   █ █
 █ █  █
  █    ███</span></pre>

      <p>This is my personal website — a <span class="tool-inline">{% include logo.html name="jekyll" %}Jekyll</span> static site built on the STARLIGHT design system with cosmic color tokens and AI-managed workflows. Hosted at <a href="https://www.varunchoraria.com" target="_blank" rel="noopener noreferrer">varunchoraria.com</a>.</p>

      <div class="project-section">
        <h4>How I built it</h4>
        <p>I built it on <span class="tool-inline">{% include logo.html name="jekyll" %}Jekyll</span> 4.3 with Ruby 3.2.2, hosted on <span class="tool-inline">{% include logo.html name="github" %}GitHub</span> Pages. Single <code>style.scss</code> stylesheet with CSS custom properties for theming. The STARLIGHT design system uses exoplanet-inspired color tokens (HD 189733b, GJ 504b, TrES-2b, Proxima b). Dark mode via <code>data-theme</code> attribute.</p>
        <p>It's AI-managed — a complete <code>DESIGN.md</code> file codifies design tokens, typography, spacing, and components. <span class="tool-inline">{% include logo.html name="claude-code" %}Claude Code</span> and <span class="tool-inline">{% include logo.html name="codex" %}Codex</span> handle the heavy lifting. I use 14 mattpocock skills for TypeScript patterns and 35 compound-engineering skills.</p>
      </div>

      <div class="project-section">
        <h4>Features</h4>
        <ul>
          <li>Light/dark mode with system preference detection</li>
          <li>Two-column blog layout with sidebar navigation</li>
          <li>Blog feed, tags, archive, about, uses-this, work, fun pages</li>
          <li>STARLIGHT design system with CSS custom properties</li>
          <li>Responsive — mobile menu, fluid typography</li>
          <li>GA4 tracking with Google Analytics</li>
          <li>Sub-800ms page loads on <span class="tool-inline">{% include logo.html name="github" %}GitHub</span> Pages</li>
        </ul>
      </div>

      <div class="project-section">
        <h4>Version history</h4>
        <ul class="version-list">
          <li><strong>May 16, 2026</strong> — Skills README screenshot, map essay update</li>
          <li><strong>Apr 25, 2026</strong> — Separators on about/uses/fun pages, Ruby version pin</li>
          <li><strong>Apr 25, 2026</strong> — Published "The Map is Blank" essay</li>
          <li><strong>Apr 2026</strong> — Career essay series (luck, management, writing), about and work pages</li>
          <li><strong>Mar 21, 2026</strong> — Site created, initial blog posts, STARLIGHT design system</li>
        </ul>
      </div>

      <p class="project-footer">
        <a href="https://github.com/vcxcvii/vcxcvii.github.io" target="_blank" rel="noopener noreferrer"><span class="tool-inline">{% include logo.html name="github" %}GitHub</span> →</a>
      </p>
    </div>
  </details>

  <details class="project-card">
    <summary>
      <span class="project-name">Lazarus Pit</span>
      <span class="status-badge status-public">Live</span>
      <span class="project-updated">Updated Jul 10, 2026</span>
      <span class="expand-icon">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="3.5,4.5 6,7.5 8.5,4.5"/></svg>
      </span>
    </summary>
    <div class="project-body">
      <pre class="ascii-logo"><span class="ascii-art ascii-art-retro">█    █   █████
█    █     █
█    █     █
█    █     █
████ ████  █</span></pre>

      <p>A self-healing UX agent for this site. It pulls session data from Microsoft Clarity, diagnoses friction (dead clicks, rage clicks, quickback rate, scroll depth, script errors), maps each finding to a suggested fix, and files a GitHub issue for me to review — no blind auto-deploys.</p>

      <div class="project-section">
        <h4>How I built it</h4>
        <p>Built in <span class="tool-inline">{% include logo.html name="claude-code" %}Claude Code</span> as a small TypeScript pipeline. A fetch step pulls Clarity's Data Export API (respecting its 10-calls/day, 3-day-lookback limits), a threshold-based extractor turns raw metrics into severity-ranked findings, a mapper translates each finding into a plain-language fix suggestion, and a final step opens a labeled, deduped GitHub issue on this repo via the <code>gh</code> CLI.</p>
        <p>Named for the DC Comics Lazarus Pit — the chemical pool that resurrects and heals. Fitting for a "self-healing" site agent, obscure enough that only the die-hards clock it.</p>
      </div>

      <div class="project-section">
        <h4>Features</h4>
        <ul>
          <li>Clarity Data Export API integration with built-in daily call budget tracking</li>
          <li>Threshold-based finding extraction across 6 UX signal metrics</li>
          <li>Finding-to-fix mapping grounded in concrete, actionable suggestions</li>
          <li>Automatic GitHub issue filing with dedup against already-open findings</li>
          <li>Human-in-the-loop by design — proposes, never auto-commits</li>
        </ul>
      </div>

      <div class="project-section">
        <h4>Version history</h4>
        <ul class="version-list">
          <li><strong>1.0.0</strong> (Jul 10, 2026) — Initial pipeline: Clarity fetch, finding extraction, component mapping, GitHub issue filing</li>
        </ul>
      </div>

      <p class="project-footer">
        <a href="https://github.com/vcxcvii/lazarus-pit" target="_blank" rel="noopener noreferrer"><span class="tool-inline">{% include logo.html name="github" %}GitHub</span> →</a>
      </p>
    </div>
  </details>
</section>
