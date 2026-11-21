(function () {
  "use strict";

  /** Preloader and AOS */
  window.addEventListener("load", function () {
    var preloader = document.querySelector("#preloader");
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(function () { preloader.remove(); }, 400);
    }
    if (window.AOS) {
      AOS.init({ duration: 600, easing: "ease-in-out", once: true, mirror: false });
    }
  });

  /** Mobile nav toggle */
  var toggle = document.querySelector(".mobile-nav-toggle");

  function setMobileNav(open) {
    document.body.classList.toggle("mobile-nav-active", open);
    if (toggle) {
      toggle.classList.toggle("bi-list", !open);
      toggle.classList.toggle("bi-x", open);
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setMobileNav(!document.body.classList.contains("mobile-nav-active"));
    });
  }

  document.querySelectorAll("#navmenu a").forEach(function (link) {
    link.addEventListener("click", function () { setMobileNav(false); });
  });

  /** Scroll-to-top button */
  var scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      scrollTop.classList.toggle("active", window.scrollY > 100);
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);
})();
