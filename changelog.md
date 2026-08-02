---
title: Changelog
seo_title: Website changelog | Varun Choraria
description: "Visitor-relevant updates to varunchoraria.com: clearer pages, better navigation, useful tools, accessibility, search, privacy, and what each change improves."
intro: "Only changes worth noticing: what became easier to find, understand, use, or trust, and why I changed it."
mcp: true
---

{% assign latest_site_update = site.data.site_updates.updates | first %}
{% include sync-engine.html timestamp=latest_site_update.date kind="site" %}

This is not a mirror of the Git history. A renamed file is not an update. Neither is a cleaner build script, unless it changes something you can see, use, find, or trust.

The entries below keep the consequence and drop the maintenance log.

<div class="changelog-browser" data-changelog-browser>
  <nav class="changelog-controls" aria-label="Browse changelog by month" data-changelog-controls hidden>
    <button type="button" data-changelog-newer>newer</button>
    <label for="changelog-month">
      <span class="visually-hidden">Month and year</span>
      <select id="changelog-month" data-changelog-month aria-controls="changelog-entries"></select>
    </label>
    <button type="button" data-changelog-older>older</button>
  </nav>
  <p class="visually-hidden" data-changelog-status aria-live="polite"></p>
  <div id="changelog-entries">
  {% for update in site.data.site_updates.updates %}
    <article class="changelog-entry" data-changelog-entry data-changelog-month="{{ update.date | date: '%Y-%m' }}">
      <h2><time datetime="{{ update.date | date: '%Y-%m-%d' }}">{{ update.date | date: "%-d %B %Y" }}</time></h2>
      <p><strong>{{ update.title }}</strong></p>
      <p>{{ update.summary }}</p>
      <ul>
      {% for benefit in update.benefits %}
        <li><strong>{{ benefit.label }}:</strong> {{ benefit.text }}</li>
      {% endfor %}
      </ul>
    </article>
  {% endfor %}
  </div>
</div>
