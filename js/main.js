/* Match One Medical - Main JS */
(function () {
  'use strict';

  /* --- Mobile Nav --- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const overlay   = document.querySelector('.nav-overlay');

  function closeNav() {
    hamburger && hamburger.classList.remove('active');
    navLinks  && navLinks.classList.remove('open');
    overlay   && overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      if (overlay) overlay.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  if (overlay) overlay.addEventListener('click', closeNav);

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  /* --- Header shadow on scroll --- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Accordion --- */
  document.querySelectorAll('.accordion-header').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = this.parentElement;
      var wasActive = item.classList.contains('active');
      item.parentElement.querySelectorAll('.accordion-item').forEach(function (sib) {
        sib.classList.remove('active');
      });
      if (!wasActive) item.classList.add('active');
    });
  });

  /* --- Scroll Reveal --- */
  var reveals = document.querySelectorAll('.card, .product-card, .stat-item, .two-col-text, .two-col-img, .timeline-item, .trust-badge, .stats-bar, .blog-card');
  if ('IntersectionObserver' in window && reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el, i) {
      el.classList.add('reveal-ready');
      el.style.transitionDelay = (i % 4) * 0.08 + 's';
      observer.observe(el);
    });
  }

  /* --- Animated stat counters --- */
  function animateCounter(el, target, suffix) {
    var duration = 1800;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  var statNumbers = document.querySelectorAll('.stat-number');
  if ('IntersectionObserver' in window && statNumbers.length) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var text = el.textContent.trim();
          var match = text.match(/^([\d,]+)(.*)$/);
          if (match) {
            var num = parseInt(match[1].replace(/,/g, ''), 10);
            var suffix = match[2] || '';
            animateCounter(el, num, suffix);
          }
          statObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) {
      statObserver.observe(el);
    });
  }
})();
