/* =========================================================
   REform — Interactions (v2)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  highlightCurrentNav();
  initDropdowns();
  initCarousels();
  initAlternatives();
  initLCA();
  initHairDryerDownload();
  initToast();
});

function highlightCurrentNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  const map = { "": "index.html" };
  const current = map[path] || path;
  document.querySelectorAll(".nav__link").forEach(a => {
    const href = a.getAttribute("href");
    if (!href) return;
    // strip hash for matching
    const hrefPath = href.split("#")[0];
    if (hrefPath === current || (current === "index.html" && hrefPath === "index.html")) {
      // only mark page-anchor links as current if the path matches AND no hash
      if (!href.includes("#")) a.classList.add("is-current");
    }
  });
}

/* Files page dropdowns */
function initDropdowns() {
  document.querySelectorAll(".dropdown").forEach(dd => {
    const head = dd.querySelector(".dropdown__head");
    if (!head) return;
    head.addEventListener("click", () => {
      const wasOpen = dd.classList.contains("is-open");
      document.querySelectorAll(".dropdown.is-open").forEach(o => o.classList.remove("is-open"));
      if (!wasOpen) dd.classList.add("is-open");
    });
  });
}

/* Home page "Why is this alternative better?" dropdowns
   These are independent (multiple can be open) so users can compare. */
function initAlternatives() {
  document.querySelectorAll(".alt").forEach(a => {
    const head = a.querySelector(".alt__head");
    if (!head) return;
    head.addEventListener("click", () => {
      a.classList.toggle("is-open");
    });
  });
}

/* LCA dropdown + chart bar animation on open */
function initLCA() {
  document.querySelectorAll(".lca").forEach(l => {
    const head = l.querySelector(".lca__head");
    if (!head) return;
    head.addEventListener("click", () => {
      const wasOpen = l.classList.contains("is-open");
      l.classList.toggle("is-open");
      if (!wasOpen) animateLCABars(l);
    });
  });
}

function animateLCABars(scope) {
  scope.querySelectorAll(".lca-chart__bar-fill").forEach(fill => {
    const target = fill.getAttribute("data-pct");
    if (!target) return;
    fill.style.width = "0%";
    requestAnimationFrame(() => {
      setTimeout(() => { fill.style.width = target + "%"; }, 200);
    });
  });
}

/* Carousel arrows */
function initCarousels() {
  document.querySelectorAll(".carousel-group").forEach(group => {
    const carousel = group.querySelector(".carousel");
    const prev = group.querySelector('[data-dir="prev"]');
    const next = group.querySelector('[data-dir="next"]');
    if (!carousel) return;
    const step = () => {
      const card = carousel.querySelector(".video-card");
      const gap = parseInt(getComputedStyle(carousel).gap) || 16;
      return card ? card.offsetWidth + gap : 320;
    };
    prev?.addEventListener("click", () => carousel.scrollBy({ left: -step() * 2, behavior: "smooth" }));
    next?.addEventListener("click", () => carousel.scrollBy({ left:  step() * 2, behavior: "smooth" }));
  });
}

/* Hair dryer download */
function initHairDryerDownload() {
  document.querySelectorAll("[data-download]").forEach(el => {
    el.addEventListener("click", (e) => {
      const target = el.getAttribute("data-download");
      if (target === "hairdryer") {
        showToast("Hair Dryer guide downloading…");
        const a = document.createElement("a");
        a.href = "assets/files/REform_HairDryer_Guide.pdf";
        a.download = "REform_HairDryer_Guide.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        e.preventDefault();
        showToast("Coming soon — only the Hair Dryer guide is available right now.");
      }
    });
  });
}

function initToast() {
  if (!document.querySelector(".toast")) {
    const t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    document.body.appendChild(t);
  }
}

function showToast(msg) {
  const t = document.querySelector(".toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("is-show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove("is-show"), 2400);
}
