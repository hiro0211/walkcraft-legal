/* walkcraft legal pages — language toggle (JA default, persisted in localStorage). */
(function () {
  var KEY = "walkcraftLang";

  function current() {
    try {
      return localStorage.getItem(KEY) === "en" ? "en" : "ja";
    } catch (e) {
      return "ja";
    }
  }

  function apply(lang) {
    document.body.classList.remove("lang-ja", "lang-en");
    document.body.classList.add("lang-" + lang);
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "ja");
    var buttons = document.querySelectorAll(".lang-toggle button");
    for (var i = 0; i < buttons.length; i++) {
      var isActive = buttons[i].getAttribute("data-lang") === lang;
      buttons[i].classList.toggle("is-active", isActive);
      buttons[i].setAttribute("aria-pressed", isActive ? "true" : "false");
    }
  }

  function set(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply(lang);
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(current());

    var buttons = document.querySelectorAll(".lang-toggle button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        set(this.getAttribute("data-lang"));
      });
    }

    // Fill in the current year wherever requested.
    var years = document.querySelectorAll("[data-year]");
    var y = String(new Date().getFullYear());
    for (var j = 0; j < years.length; j++) years[j].textContent = y;
  });
})();
