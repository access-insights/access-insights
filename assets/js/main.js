"use strict";

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

const NEWS_EVENTS = [];

const menuButton = $("#menu-toggle");
const siteNav = $("#site-nav");
const navLinks = siteNav ? $$("a", siteNav) : [];
const mobileQuery = window.matchMedia("(max-width: 1050px)");

function isMobileMenu() {
  return mobileQuery.matches;
}

function setMenuState(isOpen, restoreFocus = false) {
  if (!menuButton || !siteNav) return;

  menuButton.setAttribute("aria-expanded", String(isOpen));
  siteNav.classList.toggle("open", isOpen);

  if (isMobileMenu()) {
    siteNav.setAttribute("aria-hidden", String(!isOpen));
    if (isOpen) siteNav.removeAttribute("inert");
    else siteNav.setAttribute("inert", "");
  } else {
    siteNav.removeAttribute("aria-hidden");
    siteNav.removeAttribute("inert");
  }

  if (restoreFocus) menuButton.focus();
}

function syncMenuMode() {
  if (!menuButton || !siteNav) return;
  if (isMobileMenu()) {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(isOpen);
  } else {
    setMenuState(false);
    siteNav.classList.remove("open");
  }
}

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
    if (!isOpen && navLinks[0]) navLinks[0].focus();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isMobileMenu()) setMenuState(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    if (!isOpen || !isMobileMenu()) return;

    if (event.key === "Escape") {
      event.preventDefault();
      setMenuState(false, true);
      return;
    }

    if (event.key === "Tab" && navLinks.length) {
      const first = navLinks[0];
      const last = navLinks[navLinks.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  document.addEventListener("click", (event) => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    if (!isOpen || !isMobileMenu()) return;
    if (siteNav.contains(event.target) || menuButton.contains(event.target)) return;
    setMenuState(false);
  });

  if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", syncMenuMode);
  else mobileQuery.addListener(syncMenuMode);
  syncMenuMode();
}

const skipLink = $(".skip-link");
const main = $("#main-content");

if (skipLink && main) {
  skipLink.addEventListener("click", () => {
    if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
    window.setTimeout(() => main.focus({ preventScroll: true }), 0);
  });
}

function renderNewsEvents() {
  const region = $("[data-news-events]");
  const list = $("[data-news-events-list]", region || document);
  if (!region || !list) return;

  const activeItems = NEWS_EVENTS.filter((item) => item && item.active !== false);
  const heroLayout = region.closest(".hero-layout");

  if (!activeItems.length) {
    region.hidden = true;
    if (heroLayout) heroLayout.classList.remove("has-news");
    list.replaceChildren();
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "news-list";

  activeItems.forEach((item) => {
    const article = document.createElement("article");
    article.className = "news-item";

    if (item.date) {
      const time = document.createElement("time");
      if (item.datetime) time.dateTime = item.datetime;
      time.textContent = item.date;
      article.append(time);
    }

    const heading = document.createElement("h3");
    heading.textContent = item.title;
    article.append(heading);

    if (item.description) {
      const description = document.createElement("p");
      description.textContent = item.description;
      article.append(description);
    }

    if (item.href && item.linkLabel) {
      const link = document.createElement("a");
      link.className = "card-link";
      link.href = item.href;
      link.textContent = item.linkLabel;
      article.append(link);
    }

    wrapper.append(article);
  });

  list.replaceChildren(wrapper);
  region.hidden = false;
  if (heroLayout) heroLayout.classList.add("has-news");
}

renderNewsEvents();

const form = $("#contact-form");

if (form) {
  const status = $("#form-status");
  const success = $("#form-success");
  const submitError = $("#form-error");
  const submitButton = $(".btn-submit", form);
  const controls = $$("input, select, textarea, button", form).filter((control) => control.name !== "bot-field");
  const defaultButtonText = submitButton ? submitButton.textContent : "";

  function announce(message) {
    if (!status) return;
    status.textContent = "";
    window.requestAnimationFrame(() => {
      status.textContent = message;
    });
  }

  function errorElementFor(control) {
    const describedBy = control.getAttribute("aria-describedby");
    if (!describedBy) return null;
    return document.getElementById(describedBy.split(/\s+/)[0]);
  }

  function validateControl(control) {
    const value = control.value.trim();
    let valid = true;

    if (control.required && !value) valid = false;
    if (valid && control.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) valid = false;

    const error = errorElementFor(control);
    control.toggleAttribute("aria-invalid", !valid);
    if (error) error.hidden = valid;
    return valid;
  }

  function setSubmitting(isSubmitting) {
    form.setAttribute("aria-busy", String(isSubmitting));
    controls.forEach((control) => {
      control.disabled = isSubmitting;
    });
    if (submitButton) {
      submitButton.setAttribute("aria-busy", String(isSubmitting));
      submitButton.textContent = isSubmitting ? "Sending..." : defaultButtonText;
    }
  }

  $$("input, select, textarea", form).forEach((control) => {
    control.addEventListener("blur", () => {
      if (control.value.trim() || control.getAttribute("aria-invalid") === "true") validateControl(control);
    });
    control.addEventListener("input", () => {
      if (control.getAttribute("aria-invalid") === "true") validateControl(control);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (success) success.hidden = true;
    if (submitError) submitError.hidden = true;
    announce("");

    const requiredControls = $$("[required]", form);
    const firstInvalid = requiredControls.find((control) => !validateControl(control));

    if (firstInvalid) {
      announce("Please fix the highlighted fields and try again.");
      firstInvalid.focus();
      return;
    }

    const payload = new URLSearchParams(new FormData(form)).toString();
    setSubmitting(true);
    announce("Sending your message.");

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload
    })
      .then((response) => {
        if (!response.ok) throw new Error("Submission failed");
        form.hidden = true;
        if (success) {
          success.hidden = false;
          success.focus();
        }
        announce("Message sent successfully.");
      })
      .catch(() => {
        if (submitError) {
          submitError.hidden = false;
          submitError.focus();
        }
        announce("Message failed to send. Please try again.");
      })
      .finally(() => setSubmitting(false));
  });
}
