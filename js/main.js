/* zapatera.xyz — theme, language, motion, header state.
   Shared by every page. The theme is also applied by a tiny inline
   script in <head> so the page never paints the wrong colours first. */
(function () {
  var root = document.documentElement;

  /* ---- Theme: an explicit choice beats the OS in both directions ---- */
  var toggle = document.getElementById('theme');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var dark = getComputedStyle(root).colorScheme.indexOf('dark') > -1;
      var next = dark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---- Language ----
     Assigning innerHTML rather than textContent, so links and emphasis
     inside a translated string survive the switch. Every value comes
     from this site's own markup, never from user input. */
  var nodes = document.querySelectorAll('[data-en]');
  var langBtns = document.querySelectorAll('[data-lang]');

  function setLang(lang) {
    nodes.forEach(function (n) {
      var value = n.getAttribute('data-' + lang);
      if (value !== null) n.innerHTML = value;
    });
    langBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    root.lang = lang;
    var title = document.querySelector('meta[name="title-' + lang + '"]');
    if (title) document.title = title.content;
    var desc = document.querySelector('meta[name="desc-' + lang + '"]');
    var metaDesc = document.querySelector('meta[name="description"]');
    if (desc && metaDesc) metaDesc.content = desc.content;
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  langBtns.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

  var savedLang = null;
  try { savedLang = localStorage.getItem('lang'); } catch (e) {}
  if (savedLang && savedLang !== 'en') setLang(savedLang);

  /* ---- Scroll reveal: one pass, then the observer lets go ---- */
  var targets = document.querySelectorAll('.reveal,.stagger');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('in'); });
  }

  /* ---- Header gains a firmer rule once you have left the top ---- */
  var bar = document.querySelector('header.top');
  if (bar) {
    var ticking = false;
    function onScroll() {
      bar.classList.toggle('stuck', window.scrollY > 12);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }

  /* ---- Smooth in-page scrolling that clears the sticky header ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var offset = bar ? bar.offsetHeight + 8 : 0;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset - offset,
        behavior: 'smooth'
      });
    });
  });
})();
