/* The page light.

   Three grounds, pulled through in order: light, beige, dark. With nothing
   stored, the reader's system setting decides and no attribute is written, so
   the CSS behaves exactly as it did before this file existed. The first pull
   is what commits a choice.

   The markup is built here rather than in the include because a control that
   cannot do anything should not occupy a tap target. No JavaScript, no cord.
   The theme itself is applied by a separate inline snippet in the document
   head, which has to run before first paint; this file only handles pulling. */
(function () {
  var mount = document.querySelector('[data-lamp]');
  if (!mount) return;

  var ORDER = ['light', 'beige', 'dark'];
  var NAMES = { light: 'light', beige: 'beige', dark: 'dark' };
  var root = document.documentElement;

  function current() {
    var set = root.getAttribute('data-theme');
    if (set && ORDER.indexOf(set) !== -1) return set;
    // Nothing chosen yet, so report what the system is actually showing.
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  mount.innerHTML =
    '<svg class="lamp-shade" viewBox="0 0 40 26" width="34" height="22" aria-hidden="true" focusable="false">' +
      '<path d="M20 0v4" />' +
      '<path d="M6 20 20 4l14 16z" />' +
      '<circle class="lamp-bulb" cx="20" cy="21" r="3" />' +
    '</svg>' +
    '<button class="lamp-cord" type="button">' +
      '<span class="lamp-line" aria-hidden="true"></span>' +
      '<span class="lamp-bead" aria-hidden="true"></span>' +
      '<span class="visually-hidden" data-lamp-label></span>' +
    '</button>';

  mount.hidden = false;

  var button = mount.querySelector('.lamp-cord');
  var label = mount.querySelector('[data-lamp-label]');

  function describe() {
    var now = current();
    var next = ORDER[(ORDER.indexOf(now) + 1) % ORDER.length];
    var text = 'Page light: ' + NAMES[now] + '. Pull for ' + NAMES[next] + '.';
    label.textContent = text;
    button.setAttribute('title', text);
  }

  describe();

  button.addEventListener('click', function () {
    var next = ORDER[(ORDER.indexOf(current()) + 1) % ORDER.length];
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      // Private browsing refuses writes. The choice still holds for this page.
    }
    describe();

    // Restart the swing even if the reader pulls again mid-animation.
    mount.classList.remove('pulled');
    void mount.offsetWidth;
    mount.classList.add('pulled');
  });

  mount.addEventListener('animationend', function (event) {
    if (event.animationName === 'lamp-pull') mount.classList.remove('pulled');
  });

  // A system change only matters while nothing is stored; once it is, the
  // reader has overruled the system and the label must not drift.
  if (window.matchMedia) {
    var query = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function () {
      if (!root.getAttribute('data-theme')) describe();
    };
    if (query.addEventListener) query.addEventListener('change', onChange);
  }
})();
