/*
 * Copy button for code blocks.
 *
 * Progressive enhancement: the markup is generated here rather than in the
 * Liquid templates, so a reader with JavaScript disabled sees exactly the code
 * block that shipped before this file existed, and no dead button.
 *
 * Loaded as a same-origin file because the site's CSP allows `script-src
 * 'self'` but would need a fresh sha256 for any inline script.
 */
(function () {
  'use strict';

  if (!navigator.clipboard || !document.querySelectorAll) return;

  var RESET_MS = 2000;

  function label(button, text, done) {
    button.textContent = text;
    button.setAttribute('data-copied', done ? 'true' : 'false');
  }

  function copy(block, button) {
    var code = block.querySelector('code');
    var text = (code || block).textContent.replace(/\n$/, '');

    navigator.clipboard.writeText(text).then(
      function () {
        label(button, 'Copied', true);
        // Announce to screen readers, which do not see a textContent swap on a
        // control they are not focused on.
        button.setAttribute('aria-label', 'Copied to clipboard');
        window.setTimeout(function () {
          label(button, 'Copy', false);
          button.setAttribute('aria-label', 'Copy code to clipboard');
        }, RESET_MS);
      },
      function () {
        label(button, 'Failed', false);
        window.setTimeout(function () {
          label(button, 'Copy', false);
        }, RESET_MS);
      }
    );
  }

  function enhance(block) {
    // `pre` inside a figure.highlight is already wrapped by Jekyll; wrapping
    // again would nest positioning contexts, so reuse whichever is outermost.
    var host = block.parentNode;
    var wrapper;

    if (host && host.classList && host.classList.contains('code-block')) {
      wrapper = host;
    } else {
      wrapper = document.createElement('div');
      wrapper.className = 'code-block';
      block.parentNode.insertBefore(wrapper, block);
      wrapper.appendChild(block);
    }

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    label(button, 'Copy', false);
    button.addEventListener('click', function () {
      copy(block, button);
    });

    wrapper.appendChild(button);
  }

  function init() {
    var blocks = document.querySelectorAll('#page-content pre');
    for (var i = 0; i < blocks.length; i++) enhance(blocks[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
