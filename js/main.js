/* =============================================
   PAPERHOOD — main.js
   Handles: Navbar scroll, Mobile menu, FAQ
   accordion, Form validation, Scroll animations
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. STICKY NAVBAR
  ───────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });


  /* ─────────────────────────────────────────
     2. MOBILE MENU TOGGLE
  ───────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('.nav-links a');

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });


  /* ─────────────────────────────────────────
     3. SMOOTH SCROLLING for anchor links
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ─────────────────────────────────────────
     4. FAQ ACCORDION
  ───────────────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all open items
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          other.querySelector('.faq-answer').style.maxHeight = '0';
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '0';
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });


  /* ─────────────────────────────────────────
     5. CONTACT FORM VALIDATION
  ───────────────────────────────────────── */
  const form = document.getElementById('contact-form');

  if (form) {
    const fields = {
      name: {
        el: document.getElementById('name'),
        err: document.getElementById('name-error'),
        validate: (v) => v.trim().length >= 2 ? '' : 'Please enter your full name (at least 2 characters).',
      },
      email: {
        el: document.getElementById('email'),
        err: document.getElementById('email-error'),
        validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
      },
      message: {
        el: document.getElementById('message'),
        err: document.getElementById('message-error'),
        validate: (v) => v.trim().length >= 10 ? '' : 'Message must be at least 10 characters long.',
      },
    };

    function validateField(key) {
      const { el, err, validate } = fields[key];
      const error = validate(el.value);
      if (error) {
        el.classList.add('error');
        err.textContent = error;
        err.classList.add('visible');
      } else {
        el.classList.remove('error');
        err.classList.remove('visible');
      }
      return !error;
    }

    // Live validation on blur
    Object.keys(fields).forEach(key => {
      fields[key].el.addEventListener('blur', () => validateField(key));
      fields[key].el.addEventListener('input', () => {
        if (fields[key].el.classList.contains('error')) validateField(key);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const allValid = Object.keys(fields).map(k => validateField(k)).every(Boolean);

      if (allValid) {
        const successMsg = document.getElementById('form-success');
        const submitBtn = form.querySelector('button[type="submit"]');

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';

        // Simulate async send
        setTimeout(() => {
          form.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
          successMsg.classList.add('visible');
          setTimeout(() => successMsg.classList.remove('visible'), 5000);
        }, 1400);
      }
    });
  }


  /* ─────────────────────────────────────────
     6. INTERSECTION OBSERVER — Fade-in on scroll
  ───────────────────────────────────────── */
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  fadeElements.forEach(el => observer.observe(el));


  /* ─────────────────────────────────────────
     7. ANIMATED COUNTER for hero stats
  ───────────────────────────────────────── */
  function animateCounter(el, end, duration = 1600) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);
      el.textContent = current.toLocaleString() + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const statNums = document.querySelectorAll('.hero-stat-num[data-count]');
  let countersStarted = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      statNums.forEach(el => {
        animateCounter(el, parseInt(el.dataset.count), 1800);
      });
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });



  /* ─────────────────────────────────────────
     8. 3D BOOK — Open animation + Typing effect
  ───────────────────────────────────────── */

  const bookCover  = document.getElementById('bk-cover-front');
  const typedEl    = document.getElementById('bk-typed-text');
  const cursorEl   = document.getElementById('bk-cursor');

  if (bookCover && typedEl && cursorEl) {

    // Lines to type inside the book (plain text, line by line)
    const bookLines = [
      'Welcome to My Portfolio',
      'I am a Full Stack Developer',
      'Building modern web applications',
    ];

    // ── Step 1: Open the book after a short settle delay ──
    const OPEN_DELAY    = 700;   // ms before cover starts to rotate
    const OPEN_DURATION = 1500;  // matches CSS transition (1.5s)
    const TYPE_DELAY    = OPEN_DELAY + OPEN_DURATION + 200; // start typing after fully open

    setTimeout(() => {
      bookCover.classList.add('bk-open');
    }, OPEN_DELAY);

    // ── Step 2: Typing engine ──
    // Types each line one character at a time, then moves to next line.

    const TYPE_SPEED  = 55;  // ms per character
    const LINE_PAUSE  = 480; // ms pause at end of each line before starting next

    function typeLines(lines, onDone) {
      let lineIndex = 0;
      let charIndex = 0;
      let displayedText = '';

      function typeNext() {
        if (lineIndex >= lines.length) {
          // All lines done — hide cursor blink (optional)
          if (onDone) onDone();
          return;
        }

        const currentLine = lines[lineIndex];

        if (charIndex < currentLine.length) {
          // Type one character
          displayedText += currentLine[charIndex];
          typedEl.textContent = displayedText;
          charIndex++;
          requestAnimationFrame(() => setTimeout(typeNext, TYPE_SPEED));
        } else {
          // Line complete — add newline and move to next
          displayedText += '\n';
          typedEl.textContent = displayedText;
          lineIndex++;
          charIndex = 0;
          setTimeout(typeNext, LINE_PAUSE);
        }
      }

      typeNext();
    }

    // Start typing after the book has fully opened
    setTimeout(() => {
      typeLines(bookLines, () => {
        // After all lines are typed, slow-blink the cursor to signal done
        cursorEl.style.animationDuration = '1.6s';
      });
    }, TYPE_DELAY);

  }

});