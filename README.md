# VC's Notes on Jekyll + GitHub Pages

This repo is scaffolded as a custom Jekyll site with:

- a Simon Willison-inspired light theme
- a homepage that acts as the main writing feed
- standalone pages like `/about`, `/work`, `/fun`, `/disclaimer`, and `/TIL`
- blog posts in `_posts/` that publish to root-level slugs

## Run locally

```bash
bundle install
bundle exec jekyll serve
```

If you do not want Bundler yet, the global Jekyll install also works:

```bash
jekyll serve
```

## How to create content

### 1. Normal pages

Create a Markdown file in the repo root:

```text
about.md
disclaimer.md
```

Example:

```md
---
title: About
eyebrow: About
intro: A short explanation of who you are.
---
Your page content here.
```

### 2. Blog posts

Create a file in `_posts/`:

```text
_posts/2026-03-22-my-post.md
```

Example:

```md
---
title: My post
date: 2026-03-22 10:00:00 +0530
tags:
  - notes
  - web
---
Post body here.
```

These appear on the homepage and on `/blog/`.

### 3. Static pages

Edit the existing page files:

```text
about.md
work/index.md
fun/index.md
disclaimer.md
TIL/index.md
```

The homepage is `index.md`, and the blog archive is `blog/index.md`.

## GitHub Pages publish steps

1. Create a GitHub repo.
2. If you want the site at the root domain, use `yourusername.github.io`.
3. If you use a normal repo, set `baseurl: "/repo-name"` in `_config.yml`.
4. Add the remote and push:

```bash
git remote add origin git@github.com:yourusername/your-repo.git
git add .
git commit -m "Initial site scaffold"
git push -u origin main
```

5. In GitHub, open `Settings > Pages` and make sure the source is `GitHub Actions`.

## Design note

The theme is intentionally inspired by the light-theme structure of simonwillison.net: a serif site title, sans-serif body, purple accent band, and a two-column weblog layout.
