(function () {
  var el = document.getElementById('mcp-nudge');
  if (!el) return;
  el.hidden = false;
  document.getElementById('mcp-nudge-close').addEventListener('click', function () {
    el.hidden = true;
  });
})();
