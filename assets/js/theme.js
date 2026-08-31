/* The page light: one control, three grounds.

   It was three swatches, three tap targets in a bar that already has to fit
   seven links and an action at 320px. One button cycles light, beige, dark and
   back, and the icon reports which is showing: an empty disc, a half disc, a
   filled disc. That reads as a brightness control everywhere, and it survives
   at 20px where three coloured circles only ever read as a group.

   Picking writes data-theme on <html> and stores it. With nothing stored the
   system setting decides, as it did before this file existed. The markup is
   built here because a control that cannot do anything should not occupy a tap
   target. Applying a stored choice is a separate inline snippet in the head,
   which has to run before first paint; this file only picks. */
(function () {
  var mount = document.querySelector('[data-theme-picker]');
  if (!mount) return;

  // The order is the cycle, light to dark and back: one direction to learn.
  var THEMES = [
    { id: 'light', label: 'Light' },
    { id: 'beige', label: 'Beige' },
    { id: 'dark', label: 'Dark' }
  ];

  // The mat is the masthead on every ground, so the chrome is one colour: the
  // top stop of the bar's ramp.
  var CHROME = '#002f9e';

  // One disc, three fills. The half is the right half, so the control fills
  // up as the page darkens.
  var ICON = {
    light: '<circle cx="12" cy="12" r="8"/>',
    beige: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none"/>',
    dark: '<circle cx="12" cy="12" r="8" fill="currentColor"/>'
  };

  var root = document.documentElement;

  function current() {
    var set = root.getAttribute('data-theme');
    for (var i = 0; i < THEMES.length; i++) {
      if (THEMES[i].id === set) return set;
    }
    // Nothing chosen yet, so report what the system is actually showing.
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function next(id) {
    for (var i = 0; i < THEMES.length; i++) {
      if (THEMES[i].id === id) return THEMES[(i + 1) % THEMES.length];
    }
    return THEMES[0];
  }

  function labelFor(id) {
    for (var i = 0; i < THEMES.length; i++) {
      if (THEMES[i].id === id) return THEMES[i].label;
    }
    return id;
  }

  mount.innerHTML = '<button class="theme-toggle" type="button">' +
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"' +
    ' fill="none" stroke="currentColor" stroke-width="2"></svg>' +
    '<span class="visually-hidden"></span></button>';
  mount.hidden = false;

  var button = mount.querySelector('.theme-toggle');
  var icon = button.querySelector('svg');
  var text = button.querySelector('.visually-hidden');

  /* head.html ships theme-color tags keyed to prefers-color-scheme, right
     only while nothing is stored. Once a ground is chosen they can disagree
     with the page, so a tag with no media query goes in front: browsers take
     the first theme-color whose media matches, and one without always does. */
  function paintChrome(theme) {
    if (!root.getAttribute('data-theme')) return;
    var colour = '';
    for (var i = 0; i < THEMES.length; i++) {
      if (THEMES[i].id === theme) colour = THEMES[i].chrome;
    }
    if (!colour) return;
    var tag = document.querySelector('meta[name="theme-color"][data-theme-chrome]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'theme-color');
      tag.setAttribute('data-theme-chrome', '');
      var first = document.querySelector('meta[name="theme-color"]');
      if (first && first.parentNode) first.parentNode.insertBefore(tag, first);
      else document.head.appendChild(tag);
    }
    tag.setAttribute('content', colour);
  }

  function mark() {
    var now = current();
    paintChrome(now);
    icon.innerHTML = ICON[now];
    // The name says both halves, what is showing and what the button does. A
    // control that names only its state leaves a reader guessing the cycle.
    var name = 'Page light: ' + labelFor(now) + '. Switch to ' + next(now).label + '.';
    button.setAttribute('aria-label', name);
    button.setAttribute('title', name);
    text.textContent = name;
  }

  mark();

  button.addEventListener('click', function () {
    var pick = next(current()).id;
    root.setAttribute('data-theme', pick);
    try {
      localStorage.setItem('theme', pick);
    } catch (e) {
      // Private browsing refuses writes. The choice still holds for this page.
    }
    mark();
  });

  // A system change only matters while nothing is stored; once it is, the
  // reader has overruled the system and the icon must not drift.
  if (window.matchMedia) {
    var query = window.matchMedia('(prefers-color-scheme: dark)');
    if (query.addEventListener) {
      query.addEventListener('change', function () {
        if (!root.getAttribute('data-theme')) mark();
      });
    }
  }
})();
