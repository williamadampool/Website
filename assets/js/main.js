(function () {
  // Theme toggle
  var root = document.documentElement;
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var current = root.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Mobile nav
  var navBtn = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (navBtn && nav) navBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    navBtn.setAttribute('aria-expanded', open);
  });

  // Blog search + tag filter
  var list = document.getElementById('posts');
  if (!list) return;
  var items = Array.prototype.slice.call(list.querySelectorAll('.post-item'));
  var search = document.getElementById('post-search');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.tag-filter .tag'));
  var empty = document.getElementById('no-results');
  var activeTag = (location.hash || '').replace('#', '');

  function apply() {
    var q = (search.value || '').trim().toLowerCase();
    var shown = 0;
    items.forEach(function (el) {
      var okTag = !activeTag || (' ' + el.dataset.tags).indexOf(' ' + activeTag + ' ') !== -1;
      var okText = !q || el.dataset.text.indexOf(q) !== -1;
      el.hidden = !(okTag && okText);
      if (!el.hidden) shown++;
    });
    buttons.forEach(function (b) { b.classList.toggle('active', b.dataset.tag === activeTag); });
    empty.hidden = shown > 0;
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      activeTag = b.dataset.tag;
      history.replaceState(null, '', activeTag ? '#' + activeTag : location.pathname);
      apply();
    });
  });
  search.addEventListener('input', apply);
  window.addEventListener('hashchange', function () { activeTag = location.hash.replace('#', ''); apply(); });
  apply();
})();
