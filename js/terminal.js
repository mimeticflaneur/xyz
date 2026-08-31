/* zapatera.xyz — terminal easter egg. Cmd/Ctrl+K to open, Esc to close.
   This is the only copy: the markup lives in the page, the behaviour here. */
(function () {
  var overlay = document.getElementById('term-overlay');
  var body = document.getElementById('term-body');
  var input = document.getElementById('term-in');
  if (!overlay || !body || !input) return;

  var commands = {
    help: function () {
      return 'Available commands:\n' +
        '  whoami    — about me\n' +
        '  ls        — list sections\n' +
        '  work      — what I have built\n' +
        '  open <x>  — open a project (pagamenos, refinancial, now, github)\n' +
        '  clear     — clear the terminal\n' +
        '  exit      — close the terminal';
    },
    whoami: function () {
      return 'Adrián Zapatera\n' +
        'Real estate finance · asset management\n' +
        'Building tools with LLMs.\n' +
        'Madrid, Spain.';
    },
    ls: function () {
      return 'work/  path/  education/  contact/  now/';
    },
    work: function () {
      return 'RE Investment Analyzer    live          refinancialcalculator.vercel.app\n' +
        'pagamenos.es              live          pagamenos.es\n' +
        'Atlas Agropecuario        in progress   access on request\n' +
        'Consensus Alpha           paper         available on request';
    }
  };

  var targets = {
    pagamenos: 'https://pagamenos-eight.vercel.app/',
    refinancial: 'https://refinancialcalculator.vercel.app',
    github: 'https://github.com/mimeticflaneur',
    now: 'pages/now.html'
  };

  function print(text) {
    if (!text) return;
    var line = document.createElement('div');
    line.className = 'term-line';
    var out = document.createElement('span');
    out.className = 'out';
    out.textContent = text;
    line.appendChild(out);
    body.insertBefore(line, body.lastElementChild);
    body.scrollTop = body.scrollHeight;
  }

  function echo(command) {
    var line = document.createElement('div');
    line.className = 'term-line';
    var prompt = document.createElement('span');
    prompt.className = 'pr';
    prompt.textContent = '~$';
    line.appendChild(prompt);
    line.appendChild(document.createTextNode(' ' + command));
    body.insertBefore(line, body.lastElementChild);
  }

  function close() {
    overlay.classList.remove('open');
  }

  function run(raw) {
    var command = raw.trim().toLowerCase();
    if (command === 'clear') {
      while (body.children.length > 1) body.removeChild(body.firstChild);
      return;
    }
    if (command === 'exit') return close();
    if (command.indexOf('open ') === 0) {
      var name = command.slice(5).trim();
      if (targets[name]) {
        window.open(targets[name], '_blank', 'noopener');
        print('Opening ' + name + '…');
      } else {
        print('Unknown: ' + name + '. Try: pagamenos, refinancial, now, github');
      }
      return;
    }
    if (commands[command]) return print(commands[command]());
    print('command not found: ' + command + '. Type help for commands.');
  }

  document.addEventListener('keydown', function (e) {
    var typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
    if ((e.ctrlKey || e.metaKey) && e.key === 'k' && !overlay.classList.contains('open') && !typing) {
      e.preventDefault();
      overlay.classList.add('open');
      setTimeout(function () { input.focus(); }, 80);
    }
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });

  input.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var value = input.value;
    if (!value.trim()) return;
    echo(value);
    run(value);
    input.value = '';
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  /* Hint, once per visitor, and only where a keyboard shortcut makes sense */
  if (window.innerWidth > 768) {
    var seen = null;
    try { seen = localStorage.getItem('toast-seen'); } catch (e) {}
    if (!seen) {
      setTimeout(function () {
        var toast = document.getElementById('toast-hint');
        if (!toast) return;
        toast.classList.add('show');
        setTimeout(function () {
          toast.classList.remove('show');
          try { localStorage.setItem('toast-seen', '1'); } catch (e) {}
        }, 4000);
      }, 4000);
    }
  }
})();
