---
layout: page
title: Tags
intro: Browse posts by topic.
page_class: tags-page
---
<div class="rows">
{% assign post_tags = site.posts | map: "tags" | join: "," %}
{% assign all_tags = post_tags | split: "," | uniq | sort %}
{% for tag in all_tags %}
  {% if tag == "" %}{% continue %}{% endif %}
  {% assign tag_slug = tag | slugify %}
  {% assign none = "" | split: "" %}
  {% assign tagged_posts = site.tags[tag] | default: none %}
  <a class="row" href="{{ '/tags/' | append: tag_slug | append: '/' | relative_url }}">
    <span class="row-title">#{{ tag }}</span>
    <span class="row-date">{{ tagged_posts.size }}</span>
  </a>
{% endfor %}
</div>
