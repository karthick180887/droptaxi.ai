/* ═══════════════════════════════════════════════
   DropTaxi — Enhanced Interactions
   ═══════════════════════════════════════════════ */

/* ── Mobile Menu Toggle ── */
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open");
    menuButton.textContent = expanded ? "Menu" : "Close";
  });

  /* Close menu on outside click */
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !nav.contains(e.target) && !menuButton.contains(e.target)) {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
    }
  });
}

/* ── Mega Menu Dropdowns ── */
const megaDropdowns = document.querySelectorAll(".mega-dropdown");
const isMobile = () => window.innerWidth <= 760;
let hoverTimeout = null;

function closeAllMega(except) {
  megaDropdowns.forEach((dd) => {
    if (dd !== except) {
      dd.classList.remove("is-open");
      const trigger = dd.querySelector(".mega-trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    }
  });
}

megaDropdowns.forEach((dd) => {
  const trigger = dd.querySelector(".mega-trigger");
  if (!trigger) return;

  /* Click toggle (works on both mobile and desktop) */
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = dd.classList.contains("is-open");
    closeAllMega(dd);
    if (!isOpen) {
      dd.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    } else {
      dd.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    }
  });

  /* Desktop hover with intent */
  dd.addEventListener("mouseenter", () => {
    if (isMobile()) return;
    clearTimeout(hoverTimeout);
    closeAllMega(dd);
    dd.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  });

  dd.addEventListener("mouseleave", () => {
    if (isMobile()) return;
    hoverTimeout = setTimeout(() => {
      dd.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    }, 200);
  });
});

/* Close mega menu on outside click */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".mega-dropdown")) {
    closeAllMega();
  }
});

/* Close on Escape key */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllMega();
});

/* ── Active Nav Link ── */
const navLinks = document.querySelectorAll(".site-nav a");
const currentFile = window.location.pathname.split("/").pop() || "index.html";
navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentFile) {
    link.classList.add("active");
  }
});

/* ── Scroll Reveal with Stagger ── */
const revealItems = document.querySelectorAll("[data-reveal]");
if (revealItems.length) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    revealItems.forEach((item) => observer.observe(item));
  }
}

/* ── Header Scroll Effect ── */
const header = document.querySelector(".site-header");
if (header) {
  let lastScroll = 0;
  const onScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      header.style.background = "rgba(10, 14, 23, 0.92)";
    } else {
      header.style.background = "rgba(10, 14, 23, 0.75)";
    }
    lastScroll = scrollY;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ── Animate Stats Counter ── */
const animateCounters = () => {
  const stats = document.querySelectorAll(".stats strong");
  stats.forEach((el) => {
    const text = el.textContent.trim();
    const match = text.match(/^([\d,]+)/);
    if (!match) return;

    const target = parseInt(match[1].replace(/,/g, ""), 10);
    if (isNaN(target) || target === 0) return;

    const suffix = text.replace(match[1], "");
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(target * ease);
      el.textContent = current.toLocaleString("en-IN") + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
};

/* Trigger counter animation when stats section is visible */
const statsSection = document.querySelector(".stats");
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  statsObserver.observe(statsSection);
}

/* ── WhatsApp Quote Form ── */
const quoteForms = document.querySelectorAll("[data-quote-form]");
quoteForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const phone = (form.getAttribute("data-whatsapp") || "").replace(/\D/g, "");

    const fields = [
      ["Name", formData.get("name") || "-"],
      ["Pickup City", formData.get("pickup") || "-"],
      ["Drop City", formData.get("drop") || "-"],
      ["Travel Date", formData.get("travelDate") || "-"],
      ["Car Type", formData.get("carType") || "-"],
      ["Mobile", formData.get("phone") || "-"]
    ];

    const message = [
      "Hello DropTaxi, I need a one way taxi quote.",
      ...fields.map(([label, value]) => `${label}: ${value}`)
    ].join("\n");

    if (!phone) return;

    const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(link, "_blank", "noopener");
  });
});

/* ── Smooth FAQ Expand (height animation) ── */
document.querySelectorAll(".faq-list details").forEach((detail) => {
  const summary = detail.querySelector("summary");
  if (!summary) return;

  summary.addEventListener("click", (e) => {
    e.preventDefault();
    if (detail.open) {
      detail.style.overflow = "hidden";
      const startHeight = detail.offsetHeight;
      const summaryHeight = summary.offsetHeight;
      detail.animate(
        { height: [`${startHeight}px`, `${summaryHeight}px`] },
        { duration: 250, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
      ).onfinish = () => {
        detail.open = false;
        detail.style.overflow = "";
        detail.style.height = "";
      };
    } else {
      detail.open = true;
      const endHeight = detail.offsetHeight;
      const summaryHeight = summary.offsetHeight;
      detail.animate(
        { height: [`${summaryHeight}px`, `${endHeight}px`] },
        { duration: 300, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
      );
    }
  });
});
