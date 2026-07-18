/* Small, dependency-free GitHub contribution graph. */
(function () {
  "use strict";

  var section = document.querySelector("[data-gh-user]");
  if (!section) return;

  var user = section.getAttribute("data-gh-user");
  var graph = section.querySelector("[data-gh-graph]");
  var total = section.querySelector("[data-gh-total]");
  var fallback = section.querySelector("[data-gh-fallback]");
  var legend = section.querySelector("[data-gh-legend]");
  var endpoint = "https://github-contributions-api.jogruber.de/v4/" + user + "?y=last";
  var cacheKey = "github-contributions:" + user;
  var cacheTtl = 6 * 60 * 60 * 1000;
  var cell = 10;
  var gap = 3;
  var rows = 7;
  var labelHeight = 16;
  var colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var contributionData = null;
  var resizeTimer = null;

  graph.classList.add("is-loading");

  function readCache() {
    try {
      var cached = JSON.parse(localStorage.getItem(cacheKey));
      if (cached && Date.now() - cached.savedAt < cacheTtl) return cached.data;
    } catch (error) {
      return null;
    }
    return null;
  }

  function writeCache(data) {
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), data: data }));
    } catch (error) {
      /* Storage can be unavailable. Rendering still works. */
    }
  }

  function columnsForWidth(maxColumns) {
    var width = graph.clientWidth || section.clientWidth || 280;
    var fit = Math.floor((width + gap) / (cell + gap));
    return Math.max(8, Math.min(maxColumns, fit));
  }

  function contributionTotal(data, days) {
    if (data.total) {
      var year = Object.keys(data.total)[0];
      if (year && data.total[year] != null) return data.total[year];
    }
    return days.reduce(function (sum, day) { return sum + (day.count || 0); }, 0);
  }

  function render(data) {
    var days = data && data.contributions;
    if (!days || !days.length) {
      graph.classList.remove("is-loading");
      return;
    }

    var maxColumns = Math.floor(days.length / rows);
    var columns = columnsForWidth(maxColumns);
    var visibleDays = days.slice(-columns * rows);
    var width = columns * (cell + gap) - gap;
    var height = labelHeight + rows * (cell + gap) - gap;
    var namespace = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(namespace, "svg");
    var count = contributionTotal(data, days);

    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", count.toLocaleString("en-US") + " GitHub contributions in the last year");

    var previousMonth = -1;
    var lastLabelX = -Infinity;
    for (var column = 0; column < columns; column += 1) {
      var firstDay = visibleDays[column * rows];
      if (!firstDay || !firstDay.date) continue;
      var month = parseInt(firstDay.date.slice(5, 7), 10) - 1;
      var x = column * (cell + gap);
      if (month === previousMonth || x - lastLabelX < 30 || x > width - 24) continue;
      previousMonth = month;
      lastLabelX = x;
      var label = document.createElementNS(namespace, "text");
      label.setAttribute("x", String(x));
      label.setAttribute("y", "9");
      label.textContent = months[month];
      svg.appendChild(label);
    }

    visibleDays.forEach(function (day, index) {
      var level = Math.max(0, Math.min(4, Number(day.level) || 0));
      var rect = document.createElementNS(namespace, "rect");
      rect.setAttribute("x", String(Math.floor(index / rows) * (cell + gap)));
      rect.setAttribute("y", String(labelHeight + (index % rows) * (cell + gap)));
      rect.setAttribute("width", String(cell));
      rect.setAttribute("height", String(cell));
      rect.setAttribute("fill", colors[level]);
      rect.setAttribute("rx", "2");
      var title = document.createElementNS(namespace, "title");
      title.textContent = day.date + ": " + (day.count || 0) + " contribution" + ((day.count || 0) === 1 ? "" : "s");
      rect.appendChild(title);
      svg.appendChild(rect);
    });

    graph.replaceChildren(svg);
    graph.classList.remove("is-loading");
    total.textContent = count.toLocaleString("en-US") + " contributions";
    fallback.hidden = true;
    legend.hidden = false;
  }

  function setData(data) {
    contributionData = data;
    render(data);
  }

  var cached = readCache();
  if (cached) setData(cached);

  fetch(endpoint)
    .then(function (response) {
      if (!response.ok) throw new Error("GitHub contribution request failed");
      return response.json();
    })
    .then(function (data) {
      writeCache(data);
      setData(data);
    })
    .catch(function () {
      graph.classList.remove("is-loading");
      /* Keep the plain GitHub link as the no-data fallback. */
    });

  window.addEventListener("resize", function () {
    if (!contributionData) return;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () { render(contributionData); }, 120);
  });
}());
