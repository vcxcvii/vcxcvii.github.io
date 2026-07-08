/* GitHub contributions card — self-rendered, monochrome, in-column.
 * Fetches per-day counts from the jogruber contributions API, caches for 6h
 * in localStorage, and draws an inline SVG grid. The card is [hidden] in
 * markup and only revealed on a successful render, so it degrades to nothing
 * without JS or on any error. */
(function () {
  "use strict";

  var CARD = document.querySelector(".gh-card[data-gh-user]");
  if (!CARD) return;

  var USER = CARD.getAttribute("data-gh-user");
  var GRAPH = CARD.querySelector("[data-gh-graph]");
  var TOTAL = CARD.querySelector("[data-gh-total]");
  var API = "https://github-contributions-api.jogruber.de/v4/" + USER + "?y=last";
  var CACHE_KEY = "gh:" + USER;
  var CACHE_TTL = 6 * 60 * 60 * 1000; // 6h

  var CELL = 10, GAP = 3, ROWS = 7;
  var LIGHT_PALETTE = ["#f4f4f5", "#d4d4d8", "#a1a1aa", "#52525b", "#09090b"];
  var DARK_PALETTE = ["#27272a", "#3f3f46", "#71717a", "#a1a1aa", "#d4d4d8"];

  function palette() {
    var explicit = document.documentElement.getAttribute("data-theme");
    var dark = explicit === "dark" ||
      (!explicit && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    return dark
      ? DARK_PALETTE
      : LIGHT_PALETTE;
  }

  function renderLegend() {
    var swatches = CARD.querySelectorAll(".gh-swatches i");
    var colors = palette();
    for (var i = 0; i < swatches.length; i++) {
      swatches[i].style.background = colors[i];
    }
  }

  function readCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (!obj || (Date.now() - obj.t) > CACHE_TTL) return null;
      return obj.d;
    } catch (e) { return null; }
  }

  function writeCache(data) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d: data })); }
    catch (e) { /* private mode / quota — ignore */ }
  }

  function colsForWidth() {
    var w = GRAPH.clientWidth || CARD.clientWidth || 320;
    // 26 weeks (half year) normally; drop to 16 on narrow screens
    if (w < 480) return 16;
    var fit = Math.floor((w + GAP) / (CELL + GAP));
    return Math.max(8, Math.min(26, fit));
  }

  function render(data) {
    var days = (data && data.contributions) || [];
    if (!days.length) return false;

    var total = 0;
    for (var i = 0; i < days.length; i++) total += (days[i].count || 0);
    if (data.total) {
      var t = typeof data.total === "number"
        ? data.total
        : (data.total.lastYear != null ? data.total.lastYear : null);
      if (t != null) total = t;
    }

    var cols = colsForWidth();
    var window = days.slice(-cols * ROWS);
    var colors = palette();

    var w = cols * (CELL + GAP) - GAP;
    var h = ROWS * (CELL + GAP) - GAP;
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(w));
    svg.setAttribute("height", String(h));
    svg.setAttribute("viewBox", "0 0 " + w + " " + h);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", total.toLocaleString("en-US") + " GitHub contributions in the last year");

    for (var k = 0; k < window.length; k++) {
      var d = window[k];
      var col = Math.floor(k / ROWS);
      var row = k % ROWS;
      var lvl = typeof d.level === "number" ? d.level : (d.count > 0 ? 1 : 0);
      if (lvl < 0) lvl = 0; if (lvl > 4) lvl = 4;
      var rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", String(col * (CELL + GAP)));
      rect.setAttribute("y", String(row * (CELL + GAP)));
      rect.setAttribute("width", String(CELL));
      rect.setAttribute("height", String(CELL));
      rect.setAttribute("rx", "2");
      rect.setAttribute("fill", colors[lvl]);
      svg.appendChild(rect);
    }

    GRAPH.textContent = "";
    GRAPH.appendChild(svg);
    TOTAL.textContent = total.toLocaleString("en-US") +
      " contribution" + (total === 1 ? "" : "s") + " in the last year";
    renderLegend();
    CARD.hidden = false;
    return true;
  }

  var current = null;
  function draw(data) { current = data; render(data); }

  // debounced re-render on resize (column width changes cols)
  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () { if (current) render(current); }, 150);
  });
  window.addEventListener("themechange", function () {
    if (current) render(current);
    else renderLegend();
  });

  var cached = readCache();
  if (cached) draw(cached);

  fetch(API, { headers: { Accept: "application/json" } })
    .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
    .then(function (data) {
      if (render(data)) { current = data; writeCache(data); }
    })
    .catch(function () { /* keep cached render, or stay hidden */ });
})();
