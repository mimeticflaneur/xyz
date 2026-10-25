/* zapatera.xyz — PROTOTYPE: the hero as a terminal.
   Only runs with ?hero=terminal, so the current hero stays the default
   while the two are compared. It types `whoami` and `ls`, then hands the
   prompt to the visitor. To adopt it, drop the query check; to discard
   it, delete this file and its script tag. */
(function () {
  if (!/[?&]hero=terminal\b/.test(location.search)) return;
  var hero = document.querySelector('.hero');
  if (!hero) return;

  var root = document.documentElement;
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var T = {
    en: {
      h1: "hey! i'm <b>adrián</b>.",
      bio: [
        'madrid. real estate asset management and residential development: luxury residential, hospitality, golf. backed by international private equity.',
        'software, mostly in-house, some of it public: <a href="https://refinancialcalculator.vercel.app" target="_blank" rel="noopener">a leveraged-return calculator</a>, <a href="https://pagamenos-eight.vercel.app/" target="_blank" rel="noopener">a savings comparison tool</a>, an atlas of the spanish primary sector. <a href="mailto:adrian@zapatera.xyz">write me</a> if any of it is useful.'
      ],
      help: 'try: whoami · ls · work · writing · path · education · handbook · now · contact · clear',
      missing: 'command not found: ',
      hint: 'type a command, or click one',
      note: 'prototype — <a href="./">see the current hero</a>'
    },
    es: {
      h1: '¡hola! soy <b>adrián</b>.',
      bio: [
        'madrid. gestión de activos inmobiliarios y promoción residencial: residencial de lujo, hostelería, golf. capital de private equity internacional.',
        'software propio, parte publicado: <a href="https://refinancialcalculator.vercel.app" target="_blank" rel="noopener">calculadora de rentabilidad apalancada</a>, <a href="https://pagamenos-eight.vercel.app/" target="_blank" rel="noopener">comparador de ahorro</a>, atlas del sector primario español. <a href="mailto:adrian@zapatera.xyz">escríbeme</a> si algo te sirve.'
      ],
      help: 'prueba: whoami · ls · work · writing · path · education · handbook · now · contact · clear',
      missing: 'comando no encontrado: ',
      hint: 'escribe un comando, o pulsa uno',
      note: 'prototipo — <a href="./">ver la portada actual</a>'
    }
  };
  var places = ['work', 'writing', 'path', 'education', 'handbook', 'now', 'contact'];
  var pages = { handbook: 'pages/handbook.html', now: 'pages/now.html' };

  function t() { return T[root.lang === 'es' ? 'es' : 'en']; }

  /* ---- build: eyebrow stays, the rest becomes a terminal ---- */
  var eyebrow = hero.querySelector('.eyebrow');
  var sig = document.getElementById('sig');
  hero.querySelectorAll('h1, .bio, .hero-updated').forEach(function (n) { n.remove(); });
  hero.classList.add('is-term');

  var wrap = document.createElement('div');
  wrap.className = 'ht-wrap';
  wrap.innerHTML =
    '<div class="ht">' +
      '<div class="ht-head">adrian@zapatera.xyz</div>' +
      '<div class="ht-log" aria-live="polite"></div>' +
      '<label class="ht-input-line"><span class="ht-pr">~$</span>' +
      '<input class="ht-in" type="text" spellcheck="false" autocomplete="off" aria-label="Terminal input"></label>' +
    '</div>';
  eyebrow.after(wrap);
  if (sig) wrap.appendChild(sig);
  var note = document.createElement('p');
  note.className = 'ht-note';
  wrap.after(note);

  var log = wrap.querySelector('.ht-log');
  var input = wrap.querySelector('.ht-in');

  /* ---- output ---- */
  function line(cls, html) {
    var d = document.createElement('div');
    d.className = 'ht-line ' + (cls || '');
    if (html) d.innerHTML = html;
    log.appendChild(d);
    return d;
  }
  function prompt(cmd) {
    var d = line('ht-cmd');
    d.innerHTML = '<span class="ht-pr">~$</span> ';
    var c = document.createElement('span');
    c.textContent = cmd;
    d.appendChild(c);
    return c;
  }
  function whoami() {
    var h1 = document.createElement('h1');
    h1.className = 'ht-h1';
    h1.innerHTML = t().h1;
    log.appendChild(h1);
    t().bio.forEach(function (b) { line('ht-out', b); });
  }
  function ls() {
    var d = line('ht-ls');
    places.forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = p + '/';
      b.addEventListener('click', function () { exec(p); });
      d.appendChild(b);
    });
  }
  function go(place) {
    if (pages[place]) { location.href = pages[place]; return; }
    var target = document.getElementById(place);
    if (!target) return;
    var bar = document.querySelector('header.top');
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.pageYOffset - (bar ? bar.offsetHeight + 8 : 0),
      behavior: still ? 'auto' : 'smooth'
    });
  }

  function run(cmd) {
    cmd = cmd.trim().toLowerCase().replace(/\/$/, '');
    if (!cmd) return;
    if (cmd === 'clear') { log.innerHTML = ''; return; }
    if (cmd === 'whoami') return whoami();
    if (cmd === 'ls') return ls();
    if (cmd === 'help') return line('ht-out', t().help);
    if (places.indexOf(cmd) > -1 || /^cd /.test(cmd)) return go(cmd.replace(/^cd /, ''));
    line('ht-out', '');
    log.lastChild.textContent = t().missing + cmd;
  }
  function exec(cmd) {
    prompt(cmd);
    run(cmd);
  }

  /* ---- the opening: type two commands, then hand over ---- */
  function type(cmd, done) {
    var c = prompt('');
    if (still) { c.textContent = cmd; return done(); }
    var i = 0;
    (function tick() {
      c.textContent = cmd.slice(0, ++i);
      if (i < cmd.length) setTimeout(tick, 70 + Math.random() * 50);
      else setTimeout(done, 260);
    })();
  }
  function opening(instant) {
    log.innerHTML = '';
    note.innerHTML = t().note;
    input.placeholder = t().hint;
    if (instant) { prompt('whoami'); whoami(); prompt('ls'); ls(); return; }
    setTimeout(function () {
      type('whoami', function () {
        whoami();
        setTimeout(function () { type('ls', ls); }, still ? 0 : 500);
      });
    }, still ? 0 : 350);
  }
  opening(false);

  /* the whole window is the prompt, except what is already clickable */
  wrap.querySelector('.ht').addEventListener('click', function (e) {
    if (!e.target.closest('a, button') && !window.getSelection().toString()) input.focus();
  });

  /* the ⌘K hint would only repeat what this hero already says */
  var toast = document.getElementById('toast-hint');
  if (toast) toast.remove();

  input.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    exec(input.value);
    input.value = '';
  });

  /* main.js switches the language first; then redraw in the new one */
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { opening(true); });
  });
})();
