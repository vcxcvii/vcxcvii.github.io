/* Month pagination for the changelog. Without JavaScript, every entry stays visible. */
(function () {
  "use strict";

  var browser = document.querySelector("[data-changelog-browser]");
  if (!browser) return;

  var entries = Array.prototype.slice.call(browser.querySelectorAll("[data-changelog-entry]"));
  var controls = browser.querySelector("[data-changelog-controls]");
  var select = browser.querySelector("select[data-changelog-month]");
  var newer = browser.querySelector("[data-changelog-newer]");
  var older = browser.querySelector("[data-changelog-older]");
  var status = browser.querySelector("[data-changelog-status]");
  var months = [];

  entries.forEach(function (entry) {
    var month = entry.getAttribute("data-changelog-month");
    if (month && months.indexOf(month) === -1) months.push(month);
  });
  if (!months.length) return;

  function monthLabel(month) {
    var date = new Date(month + "-01T00:00:00Z");
    return new Intl.DateTimeFormat("en", {
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    }).format(date);
  }

  months.forEach(function (month) {
    var option = document.createElement("option");
    option.value = month;
    option.textContent = monthLabel(month);
    select.appendChild(option);
  });

  function monthFromUrl() {
    var requested = new URLSearchParams(window.location.search).get("month");
    return months.indexOf(requested) > -1 ? requested : months[0];
  }

  function render(month, updateUrl) {
    var count = 0;
    entries.forEach(function (entry) {
      var visible = entry.getAttribute("data-changelog-month") === month;
      entry.hidden = !visible;
      if (visible) count += 1;
    });
    var index = months.indexOf(month);
    select.value = month;
    newer.disabled = index === 0;
    older.disabled = index === months.length - 1;
    status.textContent = count + " update" + (count === 1 ? "" : "s") + " in " + monthLabel(month);
    if (updateUrl) {
      var url = new URL(window.location.href);
      url.searchParams.set("month", month);
      window.history.pushState({ month: month }, "", url);
    }
  }

  select.addEventListener("change", function () { render(select.value, true); });
  newer.addEventListener("click", function () {
    var index = months.indexOf(select.value);
    if (index > 0) render(months[index - 1], true);
  });
  older.addEventListener("click", function () {
    var index = months.indexOf(select.value);
    if (index < months.length - 1) render(months[index + 1], true);
  });
  window.addEventListener("popstate", function () { render(monthFromUrl(), false); });

  render(monthFromUrl(), false);
  controls.hidden = false;
}());
