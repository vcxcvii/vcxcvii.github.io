/* Keeps the /days/ counter honest between deploys.
   Jekyll renders the count at build time, which is only correct until the next
   midnight. This recomputes it in the clock the log is kept in, Asia/Kolkata,
   so a reader in another timezone sees the same number VC does, and a tab left
   open overnight rolls over on its own. */
(function () {
  var el = document.querySelector('[data-days-count]');
  if (!el) return;

  var epoch = el.getAttribute('data-days-epoch');
  if (!epoch) return;

  // en-CA gives YYYY-MM-DD, so the calendar date in Kolkata can be compared to
  // the epoch as plain strings without parsing anything in the local zone.
  var fmt;
  try {
    fmt = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (e) {
    return; // No Intl support: the build-time number stays, and it is close.
  }

  function utcMidnight(ymd) {
    var p = ymd.split('-');
    return Date.UTC(+p[0], p[1] - 1, +p[2]);
  }

  function render() {
    var today = utcMidnight(fmt.format(new Date()));
    var days = Math.floor((today - utcMidnight(epoch)) / 86400000);
    if (days >= 0) el.textContent = days;
    return days;
  }

  render();

  // One timer, aimed at the next Kolkata midnight plus a second of slack.
  // IST has no daylight saving, so the offset never moves under it.
  var now = new Date();
  var ist = new Date(now.getTime() + 19800000); // UTC+5:30
  var msLeft = 86400000 - (ist.getTime() % 86400000) + 1000;
  setTimeout(function () {
    render();
    setInterval(render, 86400000);
  }, msLeft);
})();
