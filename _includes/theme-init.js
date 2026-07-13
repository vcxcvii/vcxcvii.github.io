(function () {
  "use strict";

  var DARK = "#18181b";
  var LIGHT = "#ffffff";

  function storedTheme() {
    try {
      var value = localStorage.getItem("theme");
      return value === "dark" || value === "light" ? value : null;
    } catch (e) {
      return null;
    }
  }

  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyThemeMeta(theme, explicit) {
    var light = document.querySelector('meta[name="theme-color"][data-theme-light]');
    var dark = document.querySelector('meta[name="theme-color"][data-theme-dark]');
    if (!light || !dark) return;

    light.setAttribute("content", LIGHT);
    dark.setAttribute("content", DARK);
    if (explicit === "dark") {
      light.setAttribute("media", "not all");
      dark.setAttribute("media", "all");
    } else if (explicit === "light") {
      light.setAttribute("media", "all");
      dark.setAttribute("media", "not all");
    } else {
      light.setAttribute("media", "(prefers-color-scheme: light)");
      dark.setAttribute("media", "(prefers-color-scheme: dark)");
    }
  }

  var explicit = storedTheme();
  var theme = explicit || systemTheme();
  if (explicit === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }

  window.__vcTheme = {
    get: function () { return explicit || systemTheme(); },
    explicit: function () { return explicit; },
    set: function (next) {
      explicit = next === "dark" || next === "light" ? next : null;
      try {
        if (explicit) localStorage.setItem("theme", explicit);
        else localStorage.removeItem("theme");
      } catch (e) {
        /* ignore storage failures */
      }
      var active = explicit || systemTheme();
      if (explicit === "light") document.documentElement.setAttribute("data-theme", "light");
      else if (active === "dark") document.documentElement.setAttribute("data-theme", "dark");
      else document.documentElement.removeAttribute("data-theme");
      applyThemeMeta(active, explicit);
      window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: active } }));
    },
    syncMeta: function () { applyThemeMeta(explicit || systemTheme(), explicit); }
  };

  // Non-blocking stylesheets: links ship as media="print" and flip here,
  // because CSP (no 'unsafe-inline') blocks the usual onload= attribute swap.
  function flipAsyncCss() {
    var links = document.querySelectorAll('link[data-async-css]');
    for (var i = 0; i < links.length; i++) links[i].media = "all";
  }

  function onReady() {
    window.__vcTheme.syncMeta();
    flipAsyncCss();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }

  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onSystemChange = function () {
      if (!explicit) window.__vcTheme.set(null);
    };
    if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }
}());
