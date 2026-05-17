---
layout: side-quests
title: Side Quests
intro: "Built with AI — projects, tools, and rabbit holes. Everything here was built on Claude Code, Codex, or OpenCode. Most started as weekend curiosity. A few became things I use every day."
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
      <pre class="ascii-logo">█   █  ███  ████  █   █ █████ █████  ███  █   █  ███         ███  █   █  ███  █     █      ███ 
██ ██ █   █ █   █ █  █  █       █     █   ██  █ █   █       █   █ █  █    █   █     █     █   █
█ █ █ █   █ █   █ █ █   █       █     █   █ █ █ █           █     █ █     █   █     █     █    
█ █ █ █████ ████  ██    ████    █     █   █  ██ █ ███ █████  ███  ██      █   █     █      ███ 
█   █ █   █ █ █   █ █   █       █     █   █   █ █   █           █ █ █     █   █     █         █
█   █ █   █ █  █  █  █  █       █     █   █   █ █   █       █   █ █  █    █   █     █     █   █
█   █ █   █ █   █ █   █ █████   █    ███  █   █  ███         ███  █   █  ███  █████ █████  ███ </pre>

      <p>I built 43 marketing skills for Claude Code and Codex, purpose-built for GTM Buddy. Every skill reads the same shared positioning context, so every output — a competitor profile, a cold email, an SEO audit — comes out on-brand without re-briefing the agent each time.</p>

      <div class="project-section">
        <h4>How I built it</h4>
        <p>I structured these as Markdown files with YAML frontmatter. Each skill references shared context files (<code>product-marketing-context.md</code>, <code>content-governance.md</code>, <code>content-standards.md</code>, <code>keyword-universe.md</code>) that encode GTM Buddy's Revenue Activation ontology, vocabulary, and brand rules. When someone asks an agent to do marketing work, it loads the right skill automatically.</p>
        <p>I also built an auto-orchestration system — five core skills (<code>seo-audit</code>, <code>copywriting</code>, <code>schema</code>, <code>cro</code>, <code>ai-seo</code>) form a unified SEO + AEO analysis engine. Running <code>/copywriting</code> outputs a validated title tag, H1, and meta description automatically. Running <code>/seo-audit</code> applies schema fixes and CTR rewrites inline.</p>
      </div>

      <div class="project-section">
        <h4>Features</h4>
        <ul>
          <li>43 skills across the full marketing spectrum (SEO, CRO, copy, ads, analytics, email, social, research, pricing, launch, RevOps, ASO)</li>
          <li>Shared context layer — skills read Revenue Activation ontology, content governance, keyword universe automatically</li>
          <li>Skill auto-orchestration — running one skill triggers related skills automatically</li>
          <li>Dual agent support — works in both Claude Code and Codex</li>
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

      <p class="project-footer">
        <a href="https://github.com/GTM-Buddy-Marketing/gtm-buddy-marketing-skills" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
      </p>
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
      <pre class="ascii-logo">████  █████  ███   ███   ███  █   █       █████ █   █  ███   ███ 
█   █ █     █   █   █   █   █ ██  █       █     ██  █ █   █ █   █
█   █ █     █       █   █     █ █ █       █     █ █ █ █     █    
█   █ ████   ███    █   █ ███ █  ██ █████ ████  █  ██ █ ███ █ ███
█   █ █         █   █   █   █ █   █       █     █   █ █   █ █   █
█   █ █     █   █   █   █   █ █   █       █     █   █ █   █ █   █
████  █████  ███   ███   ███  █   █       █████ █   █  ███   ███ </pre>

      <p>I built a reusable agent workspace for building GTM Buddy web pages. Clone it, open it, and ship work that is on-brand, responsive, and production-ready — without briefing the agent each time. 37 skills across three layers: Design × Ship, Engineering, and QA.</p>

      <div class="project-section">
        <h4>How I built it</h4>
        <p>I designed it around a simple workflow: drop any URL into Claude Code. The agent crawls the page using Playwright MCP and returns a full pass/fail report with fixes ready to paste into Webflow. It takes screenshots at 390px, 768px, 1024px, 1440px, extracts the DOM (title, H1, meta, canonical, schema, OG tags), scans copy for em dashes and category framing drift, checks accessibility, and even clicks CTAs and submits forms to verify they work.</p>
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
          <li><strong>1.3.0</strong> (May 17, 2026) — Agentic QA layer: /qa and /figma-qa skills, Playwright MCP integration, routing rules</li>
          <li><strong>1.2.0</strong> (May 17, 2026) — DESIGN.md token system, block-char logo, repo rename from lp-design to design-engg</li>
          <li><strong>1.1.0</strong> (May 2026) — Full page audit pipeline, multi-breakpoint screenshots</li>
          <li><strong>1.0.0</strong> (Apr 2026) — Initial workspace with lp-design, copywriting, and engineering fundamentals</li>
        </ul>
      </div>

      <p class="project-footer">
        <a href="https://github.com/GTM-Buddy-Marketing/gtm-buddy-design-engg" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
      </p>
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
      <pre class="ascii-logo"> ███  █████ █   █        ███  █   █  ███  █     █      ███ 
█   █   █   ██ ██       █   █ █  █    █   █     █     █   █
█       █   █ █ █       █     █ █     █   █     █     █    
█ ███   █   █ █ █ █████  ███  ██      █   █     █      ███ 
█   █   █   █   █           █ █ █     █   █     █         █
█   █   █   █   █       █   █ █  █    █   █     █     █   █
 ███    █   █   █        ███  █   █  ███  █████ █████  ███ </pre>

      <p>I created 5 Claude Code skills that give a new SDR ready-to-use outreach for any prospect, persona, or situation. Describe your prospect, mention any trigger event (funding round, layoffs, competitive tool), and the right skill fires automatically: cold call script, LinkedIn message, email sequence, or competitive displacement copy — all in GTM Buddy's Revenue Activation framing.</p>

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

      <p class="project-footer">
        <a href="https://github.com/GTM-Buddy-Marketing/gtm-skills" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
      </p>
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
      <pre class="ascii-logo ascii-logo-vc">
█   █  ███  █   █  ███  █   █  ███   ███ 
█   █ █   █ █   █ █   █ █   █   █     █  
█   █ █      █ █  █     █   █   █     █  
█   █ █       █   █     █   █   █     █  
█   █ █      █ █  █     █   █   █     █  
 █ █  █   █ █   █ █   █  █ █    █     █  
  █    ███  █   █  ███    █    ███   ███ </pre>

      <p>This is my personal website — a Jekyll static site built on the STARLIGHT design system with cosmic color tokens and AI-managed workflows. Hosted at <a href="https://www.varunchoraria.com" target="_blank" rel="noopener noreferrer">varunchoraria.com</a>.</p>

      <div class="project-section">
        <h4>How I built it</h4>
        <p>I built it on Jekyll 4.3 with Ruby 3.2.2, hosted on GitHub Pages. Single <code>style.scss</code> stylesheet with CSS custom properties for theming. The STARLIGHT design system uses exoplanet-inspired color tokens (HD 189733b, GJ 504b, TrES-2b, Proxima b). Dark mode via <code>data-theme</code> attribute.</p>
        <p>It's AI-managed — a complete <code>DESIGN.md</code> file codifies design tokens, typography, spacing, and components. Claude Code and Codex handle the heavy lifting. I use 14 mattpocock skills for TypeScript patterns and 35 compound-engineering skills.</p>
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
          <li>Sub-800ms page loads on GitHub Pages</li>
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
        <a href="https://github.com/vcxcvii/vcxcvii.github.io" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
      </p>
    </div>
  </details>

  <details class="project-card">
    <summary>
      <span class="project-name">God's Eye</span>
      <span class="status-badge status-private">Private</span>
      <span class="project-updated">Updated May 17, 2026</span>
      <span class="expand-icon">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="3.5,4.5 6,7.5 8.5,4.5"/></svg>
      </span>
    </summary>
    <div class="project-body">
      <pre class="ascii-logo ascii-logo-gods">
 ███   ███  ████   ███        █████ █   █ █████
█   █ █   █ █   █ █   █       █     █   █ █    
█     █   █ █   █ █           █      █ █  █    
█ ███ █   █ █   █  ███  █████ ████    █   ████ 
█   █ █   █ █   █     █       █       █   █    
█   █ █   █ █   █ █   █       █       █   █    
 ███   ███  ████   ███        █████   █   █████</pre>

      <p>I built a Vedic astrology prediction system that cross-verifies across 16+ astrological systems before surfacing any answer. Terminal-native, personalized to one user.</p>

      <div class="project-section">
        <h4>How I built it</h4>
        <p>I wrote it in Python with Swiss Ephemeris for accurate celestial calculations. It runs entirely in the terminal with a chat-based interface. Three prediction tiers, tried in order: local LLM (Ollama + Llama 3.2) for natural language interpretation, cloud LLM (OpenAI GPT-4o) for deep synthesis, and a template engine fallback that works fully offline. No API key ever required.</p>
        <p>The architecture is modular — separate calculators for each astrological system, a unified chart engine that computes all D1-D60 divisional charts, and a prediction router that cross-verifies across systems before surfacing any answer. Every prediction is triple-checked.</p>
      </div>

      <div class="project-section">
        <h4>Features</h4>
        <ul>
          <li>16+ integrated astrological systems — Vedic, Western, Hellenistic, Chinese</li>
          <li>Triple-checked predictions — no answer surfaced without cross-system verification</li>
          <li>Three-tier intelligence: local LLM → cloud LLM → offline template engine</li>
          <li>Chat memory and slash commands — natural conversation flow</li>
          <li>ASCII chart diagrams rendered in terminal</li>
          <li>Adaptive LLM routing — auto-detects available models, falls back gracefully</li>
          <li>Defaults to current year transits — no need to specify timing</li>
          <li>Swiss Ephemeris for all celestial calculations</li>
        </ul>
      </div>

      <div class="project-section">
        <h4>Version history</h4>
        <ul class="version-list">
          <li><strong>1.4.0</strong> (May 17, 2026) — Chat memory, slash commands, ASCII chart diagrams, adaptive LLM routing</li>
          <li><strong>1.3.0</strong> (May 17, 2026) — Simplified predictor: defaults to current year/transits, human-readable dates</li>
          <li><strong>1.2.0</strong> (May 17, 2026) — Local LLM support (Ollama + Llama 3.2), all 16+ calculators wired</li>
          <li><strong>1.1.0</strong> (May 2026) — Swiss Ephemeris integration, D1-D60 divisional charts</li>
          <li><strong>1.0.0</strong> (May 2026) — Initial release with core Parashari + Western hybrid engine</li>
        </ul>
      </div>

      <p class="project-footer">
        <a href="https://github.com/vcxcvii/gods-eye" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
      </p>
    </div>
  </details>
</section>
