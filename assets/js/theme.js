/* The page light: three grounds, shown as the grounds themselves.

   A swatch each for light, beige and dark. Picking one writes data-theme on
   <html> and stores it. With nothing stored, no attribute is written and the
   reader's system setting decides, exactly as the site behaved before this
   file existed.

   The markup is built here rather than in the include because a control that
   cannot do anything should not occupy a tap target. No JavaScript, no picker.
   Applying the stored choice is a separate inline snippet in the document
   head, which has to run before first paint; this file only handles picking. */
(function () {
  var mount = document.querySelector('[data-theme-picker]');
  if (!mount) return;

  // Class names are written out rather than built from the id. Concatenating
  // them hides t-light and t-beige from anything that greps the source,
  // including the unused-class check in _scripts/qa.rb.
  var THEMES = [
    // chrome is the top stop of that ground's masthead ramp, not its page
    // colour: the sticky bar is what sits under the browser chrome now.
    { id: 'light', label: 'Light', cls: 't-light', chrome: '#577dc6' },
    { id: 'beige', label: 'Beige', cls: 't-beige', chrome: '#4087af' },
    { id: 'dark', label: 'Dark', cls: 't-dark', chrome: '#395181' }
  ];
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

  var html = '<span class="visually-hidden" id="theme-picker-label">Page light</span>';
  for (var i = 0; i < THEMES.length; i++) {
    html += '<button class="theme-swatch ' + THEMES[i].cls + '" type="button"' +
      ' data-theme-set="' + THEMES[i].id + '" title="' + THEMES[i].label + '">' +
      '<span class="visually-hidden">' + THEMES[i].label + '</span></button>';
  }
  mount.innerHTML = html;
  mount.setAttribute('aria-labelledby', 'theme-picker-label');
  mount.hidden = false;

  var buttons = mount.querySelectorAll('[data-theme-set]');

  /* head.html ships two theme-color tags keyed to prefers-color-scheme, which
     is the right answer only while nothing is stored. Once a ground is chosen
     they can disagree with the page, so a tag with no media query goes in
     front of them: browsers take the first theme-color whose media matches,
     and one without a media query always matches. */
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
    for (var i = 0; i < buttons.length; i++) {
      var on = buttons[i].getAttribute('data-theme-set') === now;
      // aria-pressed rather than colour: the active swatch is also outlined,
      // but the state has to survive with the stylesheet off.
      buttons[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  mark();

  for (var j = 0; j < buttons.length; j++) {
    buttons[j].addEventListener('click', function () {
      var pick = this.getAttribute('data-theme-set');
      root.setAttribute('data-theme', pick);
      try {
        localStorage.setItem('theme', pick);
      } catch (e) {
        // Private browsing refuses writes. The choice still holds for this page.
      }
      mark();
    });
  }

  // A system change only matters while nothing is stored; once it is, the
  // reader has overruled the system and the marked swatch must not drift.
  if (window.matchMedia) {
    var query = window.matchMedia('(prefers-color-scheme: dark)');
    if (query.addEventListener) {
      query.addEventListener('change', function () {
        if (!root.getAttribute('data-theme')) mark();
      });
    }
  }
})();
