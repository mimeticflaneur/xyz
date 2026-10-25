/* zapatera.xyz — the landing terminal.
   The home page opens as a terminal: it types `whoami`, fills in the bio
   line by line, then `ls` lists where to go. Everything it shows is
   already in the HTML, so crawlers and readers without JavaScript get the
   full text; this script only stages it. Any key or click skips to the
   end. Cmd/Ctrl+K brings you back to the prompt from anywhere. */
(function () {
  var term = document.getElementById('tl');
  if (!term) return;

  var root = document.documentElement;
  var body = term.querySelector('.tl-body');
  var menu = term.querySelector('.tl-menu');
  var other = term.querySelector('.tl-other');
  var hint = term.querySelector('.tl-hint');
  var log = term.querySelector('.tl-log');
  var live = term.querySelector('.tl-live');
  var input = term.querySelector('.tl-in');
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  var cursor = document.createElement('span');
  cursor.className = 'tl-cursor';
  cursor.setAttribute('aria-hidden', 'true');

  var T = {
    en: {
      help: 'go to:  projects · experience · writing · education · contact · handbook · now · other\n' +
        'also:   cv · whoami · ls · open <project> · lang en|es · theme · clear',
      ls: 'projects/  experience/  writing/  education/  contact/  other/',
      whoami: 'adrián zapatera — real estate finance × software, madrid.',
      open: 'open what? try: refinancial, pagasdemas, paper, github, linkedin',
      missing: 'command not found: ',
      tryHelp: '. type help',
      sudo: 'nice try.',
      cv: 'downloading Adrian_Zapatera_CV.pdf…',
      placeholder: 'type a command, or pick one above'
    },
    es: {
      help: 'ir a:    projects · experience · writing · education · contact · handbook · now · other\n' +
        'además:  cv · whoami · ls · open <proyecto> · lang en|es · theme · clear',
      ls: 'projects/  experience/  writing/  education/  contact/  other/',
      whoami: 'adrián zapatera — finanzas inmobiliarias × software, madrid.',
      open: '¿abrir qué? prueba: refinancial, pagasdemas, paper, github, linkedin',
      missing: 'comando no encontrado: ',
      tryHelp: '. escribe help',
      sudo: 'buen intento.',
      cv: 'descargando Adrian_Zapatera_CV.pdf…',
      placeholder: 'escribe un comando, o elige uno arriba'
    }
  };
  function t() { return T[root.lang === 'es' ? 'es' : 'en']; }

  var sections = ['projects', 'experience', 'writing', 'education', 'contact'];
  var aliases = { work: 'projects', path: 'experience' };
  var pages = { handbook: 'pages/handbook.html', now: 'pages/now.html' };
  var projects = {
    refinancial: 'https://refinancialcalculator.vercel.app',
    pagasdemas: 'https://pagamenos-eight.vercel.app/',
    paper: 'pages/consensus-alpha.html',
    github: 'https://github.com/mimeticflaneur',
    linkedin: 'https://linkedin.com/in/adrianzapatera'
  };

  /* ---------------- the opening ---------------- */

  var timer = null, current = null, done = false;

  function reveal(el) {
    el.classList.remove('tl-wait');
    var stage = el.closest('.tl-stage');
    if (stage) stage.classList.remove('tl-wait');
  }

  /* Types an element's own text back in, text node by text node, so links
     and emphasis inside it survive. `pace` gives the delay before each
     step; `chunk` is how many characters a step adds. */
  function typeInto(el, pace, chunk) {
    return function (next) {
      var nodes = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (walk.nextNode()) nodes.push(walk.currentNode);
      var full = nodes.map(function (n) { return n.nodeValue; });
      current = { nodes: nodes, full: full };
      nodes.forEach(function (n) { n.nodeValue = ''; });
      reveal(el);
      el.appendChild(cursor);
      var i = 0, j = 0;
      (function tick() {
        while (i < nodes.length && j >= full[i].length) { i++; j = 0; }
        if (i >= nodes.length) { current = null; return next(); }
        j += chunk;
        nodes[i].nodeValue = full[i].slice(0, j);
        timer = setTimeout(tick, pace());
      })();
    };
  }
  function wait(ms) {
    return function (next) { timer = setTimeout(next, ms); };
  }
  function show(el, ms) {
    return function (next) { reveal(el); timer = setTimeout(next, ms); };
  }
  var human = function () { return 70 + Math.random() * 70; };
  var steady = function () { return 38; };
  var quick = function () { return 9 + Math.random() * 10; };

  function finish() {
    if (done) return;
    done = true;
    clearTimeout(timer);
    if (current) current.nodes.forEach(function (n, k) { n.nodeValue = current.full[k]; });
    term.querySelectorAll('.tl-wait').forEach(function (n) { n.classList.remove('tl-wait'); });
    body.style.minHeight = '';
    live.insertBefore(cursor, input);
    term.classList.add('is-ready');
  }

  var stages = term.querySelectorAll('.tl-stage');
  var types = term.querySelectorAll('.tl-type');
  hint.hidden = false;
  live.hidden = false;
  input.placeholder = t().placeholder;

  if (still) {
    finish();
  } else {
    stages.forEach(function (n) { n.classList.add('tl-wait'); });
    /* hold the window at its final height, so it fills up instead of growing */
    body.style.minHeight = body.offsetHeight + 'px';

    var steps = [wait(450), typeInto(types[0], human, 1), wait(320),
      typeInto(term.querySelector('.tl-h1'), steady, 1), wait(260)];
    term.querySelectorAll('.tl-row').forEach(function (row) {
      /* the row (and its key) appears with the first typed character */
      steps.push(typeInto(row.querySelector('dd'), quick, 2), wait(110));
    });
    steps.push(wait(260), typeInto(types[1], human, 1), wait(240));
    menu.querySelectorAll(':scope > .tl-opt, :scope > .tl-other').forEach(function (opt) {
      opt.classList.add('tl-wait');
      steps.push(show(opt, 70));
    });
    steps.push(show(hint, 120), finish);

    (function run() {
      if (done) return;
      var step = steps.shift();
      if (step) step(run);
    })();
  }

  /* ---------------- the prompt ---------------- */

  function line(text, cls) {
    var d = document.createElement('p');
    d.className = 'tl-line' + (cls ? ' ' + cls : '');
    d.textContent = text;
    log.appendChild(d);
  }
  function echo(cmd) {
    var d = document.createElement('p');
    d.className = 'tl-line tl-cmd';
    d.innerHTML = '<span class="tl-pr" aria-hidden="true">~$</span>';
    d.appendChild(document.createTextNode(cmd));
    log.appendChild(d);
  }
  function go(id) {
    var target = document.getElementById(id);
    if (!target) return;
    var bar = document.querySelector('header.top');
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.pageYOffset - (bar ? bar.offsetHeight + 8 : 0),
      behavior: still ? 'auto' : 'smooth'
    });
  }
  function visit(url) {
    if (/^https?:/.test(url)) window.open(url, '_blank', 'noopener');
    else location.href = url;
  }

  function execute(raw) {
    var cmd = raw.trim().toLowerCase().replace(/^(cd|ls)\s+/, '').replace(/\/$/, '');
    if (!cmd) return;
    if (cmd === 'clear') { log.innerHTML = ''; return; }
    echo(raw.trim());
    cmd = aliases[cmd] || cmd;
    if (sections.indexOf(cmd) > -1) return go(cmd);
    if (pages[cmd]) return visit(pages[cmd]);
    if (cmd === 'other') {
      other.open = true;
      other.querySelector('.tl-sub .tl-opt').focus();
      return;
    }
    if (cmd === 'cv') {
      line(t().cv, 'out');
      return term.querySelector('.tl-opt[download]').click();
    }
    if (cmd === 'help') return line(t().help, 'out');
    if (cmd === 'ls') return line(t().ls, 'out');
    if (cmd === 'whoami') return line(t().whoami, 'out');
    if (cmd === 'theme') return term.querySelector('[data-theme-toggle]').click();
    if (/^sudo\b/.test(cmd)) return line(t().sudo, 'out');
    var m = /^lang (en|es)$/.exec(cmd);
    if (m) return term.querySelector('[data-lang="' + m[1] + '"]').click();
    m = /^open\s*(.*)$/.exec(cmd);
    if (m) return projects[m[1]] ? visit(projects[m[1]]) : line(t().open, 'out');
    line(t().missing + cmd + t().tryHelp, 'out');
  }

  input.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    execute(input.value);
    input.value = '';
  });

  /* ---------------- moving around ---------------- */

  /* up and down walk the menu and the prompt, like a picker */
  function stops() {
    /* entries inside a closed `other` are skipped; browsers no longer
       agree on whether they still have a layout box, so ask the details */
    var list = Array.prototype.filter.call(menu.querySelectorAll('.tl-opt'), function (n) {
      return other.open || n.parentNode === menu || n.parentNode === other;
    });
    list.push(input);
    return list;
  }
  term.addEventListener('keydown', function (e) {
    var key = e.key;
    var inSummary = document.activeElement === other.querySelector('summary');
    if (key === 'ArrowRight' && inSummary && !other.open) { other.open = true; e.preventDefault(); return; }
    if (key === 'ArrowLeft' && other.contains(document.activeElement) && other.open) {
      other.open = false;
      other.querySelector('summary').focus();
      e.preventDefault();
      return;
    }
    if (key !== 'ArrowDown' && key !== 'ArrowUp') return;
    var list = stops(), at = list.indexOf(document.activeElement);
    if (at < 0) return;
    var to = at + (key === 'ArrowDown' ? 1 : -1);
    if (to < 0 || to >= list.length) return;
    e.preventDefault();
    list[to].focus();
  });

  function landingInView() {
    return term.getBoundingClientRect().bottom > 0;
  }

  document.addEventListener('keydown', function (e) {
    /* Cmd/Ctrl+K: back to the prompt from anywhere on the page */
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      finish();
      window.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' });
      input.focus({ preventScroll: true });
      return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (!done) { finish(); return; }
    /* once it is ready, typing anywhere on the landing goes to the prompt */
    var idle = document.activeElement === document.body || document.activeElement === null;
    if (idle && e.key.length === 1 && e.key !== ' ' && landingInView()) input.focus();
  });

  term.addEventListener('pointerdown', function () { finish(); });

  /* a click on the window itself puts you at the prompt — unless you were
     selecting text, or on a touch screen, where it would raise a keyboard */
  term.addEventListener('click', function (e) {
    if (!finePointer || e.target.closest('a, button, summary, input')) return;
    if (String(window.getSelection())) return;
    input.focus({ preventScroll: true });
  });

  /* main.js swaps the language first; the opening then ends at once, in it */
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      finish();
      input.placeholder = t().placeholder;
    });
  });
})();
