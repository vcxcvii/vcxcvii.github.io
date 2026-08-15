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
    { id: 'light', label: 'Light', cls: 't-light' },
    { id: 'beige', label: 'Beige', cls: 't-beige' },
    { id: 'dark', label: 'Dark', cls: 't-dark' }
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

  function mark() {
    var now = current();
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
