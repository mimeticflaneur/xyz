/* zapatera.xyz — generative signature.
   A small figure beside the name, redrawn on every visit: a dot field
   in the manner of the atlas, crossed by one cashflow J-curve. Each
   drawing comes from a 16-bit seed, shown under it; ?sig=<hex> brings a
   particular one back. Click to draw another. */
(function () {
  var host = document.getElementById('sig');
  if (!host) return;

  var NS = 'http://www.w3.org/2000/svg';
  var SIZE = 120, N = 9, STEP = 12, PAD = 12;

  /* mulberry32: tiny, fast, and the same sequence on every device */
  function rng(seed) {
    return function () {
      seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function el(name, attrs) {
    var node = document.createElementNS(NS, name);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  /* Catmull-Rom through the points, as cubic Béziers */
  function smooth(pts) {
    var d = 'M' + pts[0][0] + ' ' + pts[0][1];
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      d += ' C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ' ' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) +
        ', ' + (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ' ' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) +
        ', ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
    }
    return d;
  }

  function draw(seed) {
    var r = rng(seed);
    var svg = el('svg', { viewBox: '0 0 ' + SIZE + ' ' + SIZE, 'aria-hidden': 'true' });

    /* the field: three soft hotspots plus a little grain */
    var spots = [];
    for (var s = 0; s < 3; s++) spots.push([r(), r(), 0.03 + r() * 0.07]);
    for (var y = 0; y < N; y++) {
      for (var x = 0; x < N; x++) {
        var u = x / (N - 1), v = y / (N - 1), f = 0;
        spots.forEach(function (h) {
          f += Math.exp(-((u - h[0]) * (u - h[0]) + (v - h[1]) * (v - h[1])) / h[2]);
        });
        f = Math.min(1, f * 0.8 + r() * 0.2);
        var level = f < 0.3 ? 0 : f < 0.55 ? 1 : f < 0.8 ? 2 : 3;
        var dot = el('circle', {
          cx: PAD + x * STEP, cy: PAD + y * STEP, r: 2.4, 'class': 'm' + level
        });
        dot.style.animationDelay = ((x + y) * 22) + 'ms';
        svg.appendChild(dot);
      }
    }

    /* the curve: equity goes in, then cash comes back — a J, never the same one */
    var pts = [], yv = 70 + r() * 18, dip = 10 + r() * 16;
    for (var i = 0; i < N; i++) {
      if (i === 1) yv += dip;
      else if (i > 1) yv -= 4 + r() * 14 - (r() < 0.2 ? 10 : 0);
      yv = Math.max(PAD, Math.min(SIZE - PAD, yv));
      pts.push([PAD + i * STEP, yv]);
    }
    var path = el('path', { d: smooth(pts), 'class': 'sig-curve' });
    svg.appendChild(path);
    var end = pts[pts.length - 1];
    svg.appendChild(el('circle', { cx: end[0], cy: end[1], r: 3.6, 'class': 'sig-end' }));

    host.querySelector('.sig-art').replaceChildren(svg);
    var len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.getBoundingClientRect(); /* commit the start state before animating */
    path.style.strokeDashoffset = 0;

    var hex = ('000' + seed.toString(16)).slice(-4);
    host.querySelector('.sig-seed').textContent = 'sig #' + hex;
  }

  var match = /[?&]sig=([0-9a-f]{1,4})\b/i.exec(location.search);
  var seed = match ? parseInt(match[1], 16) : Math.floor(Math.random() * 65536);
  draw(seed);

  host.addEventListener('click', function () {
    draw(Math.floor(Math.random() * 65536));
  });
})();
