document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!isExpanded));
      mobileMenu.classList.toggle("active");
    });
  }

  highlightActiveNav();

  /* ============================= */
  /* LOAD FOOTER                   */
  /* ============================= */
  fetch("footer_1.html", { cache: "no-store" })
    .then(response => response.text())
    .then(data => {
      const footerContainer = document.getElementById("footer");
      if (footerContainer) {
        footerContainer.innerHTML = data;
      }
    })
    .catch(error => console.error("Footer load error:", error));

  /* ============================= */
  /* FADE-IN SCROLL ANIMATION      */
  /* ============================= */
  const faders = document.querySelectorAll(".fade-in");

  if (faders.length > 0) {
    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  }

  document.querySelectorAll(".feature-card").forEach(card => {
    card.addEventListener("click", () => {
      const modalId = card.getAttribute("data-modal");
      const modal = modalId ? document.getElementById(modalId) : null;
      if (modal) {
        modal.classList.add("active");
      }
    });
  });

  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", () => {
      const overlay = btn.closest(".modal-overlay");
      if (overlay) {
        overlay.classList.remove("active");
      }
    });
  });

  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", e => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
      }
    });
  });
});

function highlightActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");

  navLinks.forEach(link => {
    if (link.classList.contains("btn-primary")) return;

    const linkHref = link.getAttribute("href");
    if (!linkHref) return;

    const cleanHref = linkHref.split("#")[0] || "index.html";

    if (cleanHref === currentPage) {
      link.classList.add("active");
    }

    if ((currentPage === "" || currentPage === "index.html") && cleanHref === "index.html") {
      link.classList.add("active");
    }
  });
}

/* ============================= */
/* SERVICE WORKER REGISTRATION   */
/* =============================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
      .then(function (registration) {
        console.log('Service Worker registered:', registration.scope);
      })
      .catch(function (error) {
        console.error('Service Worker registration failed:', error);
      });
  });
}
*/
