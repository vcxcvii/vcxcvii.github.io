// Homepage only: swaps the build-time quip for a random one on each visit,
// skipping the one this tab saw last. Without JavaScript, the build's pick
// of the day stays.
(function () {
  var el = document.querySelector('[data-quips]');
  if (!el) return;
  var quips;
  try { quips = JSON.parse(el.getAttribute('data-quips')); } catch (e) { return; }
  if (!quips || quips.length < 2) return;
  var last = null;
  try { last = sessionStorage.getItem('quip'); } catch (e) {}
  var pick;
  do { pick = quips[Math.floor(Math.random() * quips.length)]; } while (pick === last || pick === el.textContent && !last);
  el.textContent = pick;
  try { sessionStorage.setItem('quip', pick); } catch (e) {}
})();
