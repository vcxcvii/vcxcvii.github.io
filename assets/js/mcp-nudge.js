(function () {
  if (localStorage.getItem('mcp_nudge_dismissed')) return;
  var el = document.getElementById('mcp-nudge');
  if (!el) return;
  setTimeout(function () { el.hidden = false; }, 3000);
  document.getElementById('mcp-nudge-close').addEventListener('click', function () {
    el.hidden = true;
    localStorage.setItem('mcp_nudge_dismissed', '1');
  });
})();
