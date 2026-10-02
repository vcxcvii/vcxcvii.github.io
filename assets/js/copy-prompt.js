/*
 * "Copy for agent" button in the Read with row on essays.
 *
 * The button ships with the `hidden` attribute and is revealed here, so a
 * reader without JavaScript or the clipboard API never sees a dead control.
 */
(function () {
  'use strict';

  var button = document.querySelector('[data-copy-prompt]');
  if (!button || !navigator.clipboard) return;

  var label = button.querySelector('span');
  var text = label.textContent;
  button.hidden = false;

  button.addEventListener('click', function () {
    navigator.clipboard.writeText(button.getAttribute('data-copy-prompt')).then(
      function () { label.textContent = 'Copied'; },
      function () { label.textContent = 'Failed'; }
    );
    window.setTimeout(function () { label.textContent = text; }, 2000);
  });
})();
