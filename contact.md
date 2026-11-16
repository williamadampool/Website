---
layout: page
title: Contact
kicker: ping
lede: Want to talk infrastructure, compare homelabs, or argue about tabs vs. spaces? Reach out.
permalink: /contact/
---

<div class="contact-grid">
  {% if site.author.email != '' %}
  <a class="card contact" href="mailto:{{ site.author.email }}"><span class="ico">✉️</span><strong>Email</strong><span>{{ site.author.email }}</span></a>
  {% endif %}
  {% if site.author.linkedin != '' %}
  <a class="card contact" href="https://www.linkedin.com/in/{{ site.author.linkedin }}"><span class="ico">💼</span><strong>LinkedIn</strong><span>Professional profile</span></a>
  {% endif %}
  <a class="card contact" href="https://github.com/{{ site.author.github }}"><span class="ico">🐙</span><strong>GitHub</strong><span>@{{ site.author.github }}</span></a>
  <a class="card contact" href="{{ '/feed.xml' | relative_url }}"><span class="ico">📡</span><strong>RSS</strong><span>Subscribe to the blog</span></a>
</div>
