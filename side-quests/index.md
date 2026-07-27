---
layout: side-quests
title: Side Quests
seo_title: Open-source AI side quests | Varun Choraria
intro: "Projects, tools, and rabbit holes. Most started as weekend curiosity. A few became things I use every day."
description: Explore open-source AI skills, interview research tools, design systems, and experiments I built to make useful work faster, clearer, and easier to repeat.
mcp: true
---

{% assign quest_groups = "Personal,Experiments,Work" | split: "," %}
{% for group in quest_groups %}
  {% assign group_quests = site.data.quests | where: "group", group %}
  <section class="projects-category" aria-labelledby="{{ group | slugify }}-quests">
    <h2 id="{{ group | slugify }}-quests">{{ group }}</h2>
    <ul class="repo-list quest-directory">
      {% for quest in group_quests %}
        <li>
          <div class="quest-heading">
            {% if quest.link %}
              {% if quest.link contains 'http' %}
                <a class="repo-link" href="{{ quest.link }}" target="_blank" rel="noopener noreferrer">
              {% else %}
                <a class="repo-link" href="{{ quest.link | relative_url }}">
              {% endif %}
                {% if quest.icon %}{% include logo.html name=quest.icon %}{% endif %}
                <span>{{ quest.name }}</span>
              </a>
            {% else %}
              <strong>{{ quest.name }}</strong>
            {% endif %}
            <span class="quest-state">{{ quest.state }}</span>
          </div>
          <p>{{ quest.description }}{% if quest.repo_url and quest.link %}{% unless quest.link contains 'http' %} <a href="{{ quest.repo_url }}" target="_blank" rel="noopener noreferrer">{{ quest.name }} source code</a>{% endunless %}{% endif %}</p>
        </li>
      {% endfor %}
    </ul>
  </section>
{% endfor %}
