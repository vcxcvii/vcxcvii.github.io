/* Upgrades the byline link to Google's preferred-sources flow.

   The visible control stays ours. Manual mode stops publisher.js from
   painting its 40px button. The ground is read at click time, so a theme
   change needs no rebuild. Beige uses the light popup. */
(function () {
  var link = document.querySelector(".preferred-source");
  if (!link) return;

  function ground() {
    var theme = document.documentElement.getAttribute("data-theme");
    if (theme === "dark") return "dark";
    if (theme === "light" || theme === "beige") return "light";
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  }

  (window.PREFERRED_SOURCE = window.PREFERRED_SOURCE || []).push(function (api) {
    api.init({ theme: ground(), lang: "en" });
    link.addEventListener("click", function (event) {
      event.preventDefault();
      api.init({ theme: ground(), lang: "en" });
      api.addPreferredSource();
    });
  });

  var script = document.createElement("script");
  script.async = true;
  script.setAttribute("preferred-sources-control", "manual");
  script.src = "https://news.google.com/swg/js/v1/publisher.js";
  document.head.appendChild(script);
})();
