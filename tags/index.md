---
layout: page
title: Tags
intro: Browse posts by topic.
page_class: tags-page
no_sidebar: true
---
<ul class="tag-index">
{% assign post_tags = site.posts | map: "tags" | join: "," %}
{% assign all_tags = post_tags | split: "," | uniq | sort %}
{% for tag in all_tags %}
  {% if tag == "" %}{% continue %}{% endif %}
  {% assign tag_slug = tag | slugify %}
  {% assign none = "" | split: "" %}
  {% assign tagged_posts = site.tags[tag] | default: none %}
  <li>
    <a class="tag-link" href="{{ '/tags/' | append: tag_slug | append: '/' | relative_url }}">#{{ tag }}</a>
    <span class="tag-count">{{ tagged_posts.size }}</span>
  </li>
{% endfor %}
</ul>
