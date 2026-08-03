---
title: Uses This
seo_title: Tools and gear I use | Varun Choraria
intro: A running list of the hardware, software, and everyday gear I rely on.
description: The hardware, software, AI tools, books, and everyday gear I actually use, including what earns its place and what has not lived up to the hype.
permalink: /uses-this/
page_class: uses-page
mcp: true
uses_list: true
faqs:
  - question: What does a one-person AI marketing stack actually cost to run?
    answer: Less than most teams assume. The working set is Claude and Codex in the terminal, Cursor for longer coding sessions, Obsidian for everything written, Figma for design, and Google Analytics and Search Console for measurement. No CRM, no sales engagement platform, no agency retainer. The expensive parts of a GTM stack are the ones that exist to coordinate people.
  - question: Which AI tools do you use, and what do you use each one for?
    answer: Claude and Codex from the terminal for most work, because I would rather pipe a model into real files than paste into a browser tab. Cursor when I want a full IDE alongside those agents. OpenCode as a backup when I hit rate limits, running Ollama, Qwen, and MiniMax. CodexBar in the menu bar to watch usage. Perplexity for quick research. MCPs and skills tie them to real data.
  - question: Do you still use the tools from your last role?
    answer: No, and I list them separately for that reason. HubSpot, SwanAI, Clay, Apollo, KitAI, Semrush, Podpitch, Webflow, Base44, and Veed were the daily drivers when I led marketing at GTM Buddy. I can run any of them again on day one, but I am not paying for them this month, and a uses page that pretends otherwise is not worth reading.
  - question: What do you write and take notes in?
    answer: Obsidian, daily, for 5+ years, synced through iCloud. Plain Markdown files on disk, which means the notes stay mine, stay diffable, and stay readable by any AI tool I point at them. The same reason this website is Jekyll and not a CMS.
  - question: What runs varunchoraria.com?
    answer: Jekyll, hosted free on GitHub Pages, with an MCP server at /mcp/ so AI assistants can read the site directly rather than scraping it. Google Analytics and Search Console handle measurement. There is no build pipeline, no framework, and no JavaScript on this page.
  - question: What laptop do you use?
    answer: A 13-inch MacBook Air with the M2 chip, 8 GB of RAM, and 256 GB of storage. It handles a full day of terminal agents, Figma, and calls in 2026. I had a 24 GB M4 for work and it throttled on long Zoom calls, so the constraint was never the memory.
---
Inspired by [Uses This](https://usesthis.com/), this page documents the tools and software I use to get things done. Last reviewed {{ site.time | date: "%B %-d, %Y" }}.

Everything I still pay for earns its place or gets cut. I run a one-person marketing stack on an 8 GB MacBook Air: terminal agents, Markdown files, and tools I can own or swap out in an afternoon. The GTM stack further down is a separate list, because knowing a tool and being subscribed to it this month are different claims.

{% for section in site.data.uses %}
<h2 id="{{ section.id }}">{{ section.title }}</h2>
{% if section.note %}
{{ section.note }}
{% endif %}

<ul class="uses-list">
{%- for item in section.items %}
  <li class="uses-item">
    <span class="uses-mark">{% include logo.html logo=item.logo label=item.name %}</span>
    <span class="uses-body"><strong class="uses-name">{% if item.name_md %}{{ item.name_md | markdownify | remove: '<p>' | remove: '</p>' | strip }}{% elsif item.url %}<a href="{{ item.url }}">{{ item.name }}</a>{% else %}{{ item.name }}{% endif %}</strong><span class="uses-note">: {{ item.note | markdownify | remove: '<p>' | remove: '</p>' | strip }}</span></span>
  </li>
{%- endfor %}
</ul>
{% unless forloop.last %}<hr>{% endunless %}
{% endfor %}
<hr>

This is also the stack I run client work on. If you want it pointed at your pipeline, [here is how I consult]({{ '/consulting/' | relative_url }}).

## Questions people ask

{% include project-faqs.html %}
