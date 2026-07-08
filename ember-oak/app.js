/* Ember & Oak — shared site behavior (no dependencies) */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  var scrim = document.querySelector(".nav-scrim");
  var closeBtn = document.querySelector(".nav-close");

  function setNav(open) {
    if (!links) return;
    links.classList.toggle("open", open);
    if (scrim) scrim.classList.toggle("show", open);
    document.body.classList.toggle("nav-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      var first = links.querySelector("a, button");
      if (first) first.focus();
    } else if (toggle) {
      toggle.focus();
    }
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      setNav(!links.classList.contains("open"));
    });
    if (scrim) scrim.addEventListener("click", function () { setNav(false); });
    if (closeBtn) closeBtn.addEventListener("click", function () { setNav(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) setNav(false);
    });
  }

  /* ---------- Toast ---------- */
  var toastEl = null;
  var toastTimer = null;
  function showToast(message) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      toastEl.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span></span>';
      document.body.appendChild(toastEl);
    }
    toastEl.querySelector("span").textContent = message;
    // restart transition
    toastEl.classList.remove("show");
    void toastEl.offsetWidth;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 3500);
  }

  /* ---------- Cart (count persisted in localStorage) ---------- */
  var CART_KEY = "ember-oak-cart-count";
  var countEl = document.querySelector(".cart-count");

  function getCount() {
    var n = parseInt(localStorage.getItem(CART_KEY) || "0", 10);
    return isNaN(n) || n < 0 ? 0 : n;
  }
  function renderCount() {
    if (!countEl) return;
    var n = getCount();
    countEl.textContent = String(n);
    countEl.style.display = n > 0 ? "grid" : "none";
  }
  renderCount();

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-add-to-cart]");
    if (!btn) return;
    e.preventDefault();
    localStorage.setItem(CART_KEY, String(getCount() + 1));
    renderCount();
    showToast((btn.getAttribute("data-add-to-cart") || "Item") + " added to your bag");
  });

  var cartBtn = document.querySelector(".cart-btn");
  if (cartBtn) {
    cartBtn.addEventListener("click", function () {
      var n = getCount();
      showToast(n === 0 ? "Your bag is empty — add some coffee!" : "You have " + n + " item" + (n === 1 ? "" : "s") + " in your bag");
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("in-view"); });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Accordion (FAQ) ---------- */
  document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var expanded = trigger.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      trigger.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });

  /* ---------- Shop: filter + sort ---------- */
  var productGrid = document.querySelector("[data-product-grid]");
  if (productGrid) {
    var cards = Array.prototype.slice.call(productGrid.querySelectorAll("[data-category]"));
    var chips = document.querySelectorAll(".chip[data-filter]");
    var sortSelect = document.querySelector("[data-sort]");
    var resultCount = document.querySelector("[data-result-count]");
    var activeFilter = "all";

    function apply() {
      var shown = 0;
      cards.forEach(function (card) {
        var show = activeFilter === "all" || card.getAttribute("data-category") === activeFilter;
        card.style.display = show ? "" : "none";
        if (show) shown++;
      });
      if (resultCount) {
        resultCount.textContent = "Showing " + shown + " of " + cards.length + " products";
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        activeFilter = chip.getAttribute("data-filter");
        apply();
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        var dir = sortSelect.value;
        var sorted = cards.slice().sort(function (a, b) {
          var pa = parseFloat(a.getAttribute("data-price")) || 0;
          var pb = parseFloat(b.getAttribute("data-price")) || 0;
          if (dir === "price-asc") return pa - pb;
          if (dir === "price-desc") return pb - pa;
          return 0; // featured = original order
        });
        if (dir === "featured") sorted = cards.slice();
        sorted.forEach(function (card) { productGrid.appendChild(card); });
      });
    }

    apply();
  }

  /* ---------- Forms: inline validation ---------- */
  function validators(field) {
    var input = field.querySelector(".input, .select, .textarea");
    if (!input) return null;
    var errors = [];
    var value = (input.value || "").trim();
    var label = (field.querySelector("label") ? field.querySelector("label").textContent : "This field")
      .replace("*", "").trim();

    if (input.hasAttribute("required") && !value) {
      errors.push(label + " is required.");
    } else if (value && input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors.push("Enter a valid email address, e.g. you@example.com.");
    } else if (value && input.hasAttribute("minlength") && value.length < parseInt(input.getAttribute("minlength"), 10)) {
      errors.push(label + " must be at least " + input.getAttribute("minlength") + " characters.");
    }
    return { input: input, errors: errors };
  }

  function renderFieldState(field, result) {
    var errEl = field.querySelector(".field-error");
    var hasError = result.errors.length > 0;
    field.classList.toggle("invalid", hasError);
    result.input.setAttribute("aria-invalid", String(hasError));
    if (errEl) errEl.textContent = hasError ? result.errors[0] : "";
    return !hasError;
  }

  document.querySelectorAll("form[data-validate]").forEach(function (form) {
    var fields = Array.prototype.slice.call(form.querySelectorAll(".field"));

    fields.forEach(function (field) {
      var input = field.querySelector(".input, .select, .textarea");
      if (!input) return;
      input.addEventListener("blur", function () {
        var result = validators(field);
        if (result) renderFieldState(field, result);
      });
      input.addEventListener("input", function () {
        if (field.classList.contains("invalid")) {
          var result = validators(field);
          if (result) renderFieldState(field, result);
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstInvalid = null;
      fields.forEach(function (field) {
        var result = validators(field);
        if (result && !renderFieldState(field, result) && !firstInvalid) {
          firstInvalid = result.input;
        }
      });
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      var submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        var original = submitBtn.textContent;
        submitBtn.textContent = "Sending…";
        setTimeout(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = original;
          form.reset();
          var success = form.querySelector(".form-success");
          if (success) {
            success.hidden = false;
            success.focus && success.focus();
          }
          showToast(form.getAttribute("data-success-message") || "Thanks — we'll be in touch soon!");
        }, 900);
      }
    });
  });

  /* ---------- Newsletter (simple) ---------- */
  document.querySelectorAll("form[data-newsletter]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var value = input ? input.value.trim() : "";
      if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        showToast("Please enter a valid email address.");
        if (input) input.focus();
        return;
      }
      form.reset();
      showToast("Welcome to the roastery list — first dispatch is on its way!");
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
