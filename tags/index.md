---
layout: page
title: Tags
intro: Browse posts by topic.
---
<ul class="tag-index">
{% assign sorted_tags = site.tags | sort %}
{% for pair in sorted_tags %}
  {% assign tag = pair[0] %}
  {% assign tag_slug = tag | slugify %}
  {% assign posts = pair[1] %}
  <li>
    <a class="tag-link" href="{{ '/tags/' | append: tag_slug | append: '/' | relative_url }}">#{{ tag }}</a>
    <span class="tag-count">{{ posts.size }}</span>
  </li>
{% endfor %}
</ul>
