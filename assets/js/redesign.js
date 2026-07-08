(function () {
  // Nav, filters, and pagination are React islands (assets/js/nav.js). This
  // script only drives progressive-enhanced accordions.

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
