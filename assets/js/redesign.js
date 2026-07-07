(function () {
  var nav = document.getElementById('site-nav');

  function closeMenus() {
    var btn = nav.querySelector('.site-menu-btn');
    var panel = nav.querySelector('.site-menu-panel');
    var more = nav.querySelector('.site-more');
    if (btn) btn.classList.remove('is-open');
    if (panel) panel.classList.remove('is-open');
    if (more) more.open = false;
  }

  nav.addEventListener('click', function (e) {
    if (e.target.closest('.site-menu-btn')) {
      e.preventDefault();
      var panel = nav.querySelector('.site-menu-panel');
      var more = nav.querySelector('.site-more');
      if (more) more.open = false;
      if (!panel) return;
      panel.classList.toggle('is-open');
      e.target.closest('.site-menu-btn').classList.toggle('is-open');
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('#site-nav')) return;
    closeMenus();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenus();
  });

  document.querySelectorAll('[data-filter-tabs]').forEach(function (tabs) {
    var section = tabs.closest('.section') || tabs.closest('.page-shell');
    var list = section ? section.querySelector('[data-filter-list]') : null;
    if (!list) return;
    var rows = list.querySelectorAll('[data-tags]');

    tabs.addEventListener('click', function (e) {
      var btn = e.target.closest('.tab');
      if (!btn) return;
      tabs.querySelectorAll('.tab').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var filter = btn.dataset.filter;
      rows.forEach(function (row) {
        var tags = row.dataset.tags ? row.dataset.tags.split(',') : [];
        var visible = filter === 'all' || tags.indexOf(filter) !== -1;
        row.hidden = !visible;
      });
    });
  });

  document.querySelectorAll('[data-accordion]').forEach(function (wrap) {
    wrap.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-accordion-trigger]');
      if (!trigger) return;
      var item = trigger.closest('.tl-item');
      var wasOpen = item.classList.contains('is-open');
      wrap.querySelectorAll('.tl-item').forEach(function (i) { i.classList.remove('is-open'); });
      if (!wasOpen) item.classList.add('is-open');
    });
  });
}());
