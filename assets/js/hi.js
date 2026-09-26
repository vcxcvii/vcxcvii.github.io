// Homepage only: swaps the build-time greeting for a random one on each
// visit, skipping the one this tab saw last. Without JavaScript, the
// build's pick of the day stays.
(function () {
  var el = document.querySelector('[data-hi]');
  if (!el) return;
  var target = el.querySelector('bdi') || el;
  var list;
  try { list = JSON.parse(el.getAttribute('data-hi')); } catch (e) { return; }
  if (!list || list.length < 2) return;
  var last = null;
  try { last = sessionStorage.getItem('hi'); } catch (e) {}
  var current = target.textContent;
  var pick;
  do {
    pick = list[Math.floor(Math.random() * list.length)];
  } while (pick === last || (pick === current && !last));
  target.textContent = pick;
  try { sessionStorage.setItem('hi', pick); } catch (e) {}
})();
