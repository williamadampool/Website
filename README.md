# Website

Personal portfolio + blog, built with [Jekyll](https://jekyllrb.com/) and deployed to GitHub Pages.

## Run it locally

```bash
bundle install
bundle exec jekyll serve --livereload
# open http://localhost:4000
```

## Make it yours

| What | Where |
|---|---|
| Name, tagline, social links | `_config.yml` |
| Home page | `index.html` |
| About / Work / Contact | `about.md`, `work.md`, `contact.md` |
| Colors & fonts | top of `assets/css/style.css` |

## Write a blog post

Create a file in `_posts/` named `YYYY-MM-DD-your-title.md`:

```markdown
---
title: "My Post Title"
tags: [azure, powershell]
---

First paragraph is the excerpt shown in the post list.

<!--more-->

The rest of your post in Markdown…
```

Commit and push — GitHub Actions rebuilds the site automatically.

## Deploy (GitHub Pages)

1. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main`. The workflow in `.github/workflows/pages.yml` builds and publishes.
3. If the site lives at `https://<user>.github.io/Website/`, the workflow sets `baseurl` for you automatically.
