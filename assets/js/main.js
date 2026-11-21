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

  /** Animated counters */
  var counters = document.querySelectorAll(".counter");

  function runCounter(el) {
    var end = parseInt(el.getAttribute("data-end"), 10) || 0;
    var duration = 1200;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(progress * end);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = end;
      }
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }
})();
