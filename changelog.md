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

{% for update in site.data.site_updates.updates %}
## {{ update.date | date: "%-d %B %Y" }}

**{{ update.title }}**

{{ update.summary }}

{% for benefit in update.benefits %}
- **{{ benefit.label }}:** {{ benefit.text }}
{% endfor %}

---
{% endfor %}
