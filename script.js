(function () {
  const $ = (id) => document.getElementById(id);
  const intro = $('intro'), wish = $('wish');
  const music = $('music');
  const canvas = $('fx'), ctx = canvas.getContext('2d');

  const MESSAGE =
    'नया साल आपके जीवन में सुख, समृद्धि और शांति लाए।\n' +
    'माँ लक्ष्मी की कृपा सदा आप और आपके परिवार पर बनी रहे।\n' +
    'हर दिन दीपक की तरह रोशन और खुशियों से भरा हो।';

  // ---------- Personalised name from ?name= ----------
  const params = new URLSearchParams(location.search);
  const name = (params.get('name') || '').trim().slice(0, 40);
  if (name) {
    $('toName').textContent = name + ' जी 🙏';
    $('nameInput').value = name;
  }

  // ---------- Canvas sizing ----------
  let W, H, dpr;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  // ---------- Petals (always falling softly) ----------
  const PETAL_COLORS = ['#ffb300', '#ff8f00', '#ffca28', '#ff6f00'];
  const petals = Array.from({ length: window.innerWidth < 600 ? 22 : 40 }, () => newPetal(true));
  function newPetal(randomY) {
    return {
      x: Math.random() * W,
      y: randomY ? Math.random() * H : -20,
      r: 4 + Math.random() * 6,
      vy: 0.5 + Math.random() * 1.1,
      sway: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI,
      color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
    };
  }

  // ---------- Fireworks ----------
  const rockets = [], sparks = [];
  let fireworks = false, lastLaunch = 0;
  const SPARK_COLORS = ['#ffd54f', '#ff8a65', '#ff4081', '#fff176', '#ffab40', '#f48fb1'];

  function launch() {
    rockets.push({
      x: W * (0.15 + Math.random() * 0.7),
      y: H,
      ty: H * (0.12 + Math.random() * 0.35),
      vy: -(7 + Math.random() * 3),
    });
  }
  function burst(x, y) {
    const color = SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0];
    const n = 48;
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n, s = 1.5 + Math.random() * 3;
      sparks.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, color });
    }
  }

  function frame(t) {
    ctx.clearRect(0, 0, W, H);

    // petals
    for (const p of petals) {
      p.y += p.vy; p.sway += 0.03; p.rot += 0.02;
      p.x += Math.sin(p.sway) * 0.6;
      if (p.y > H + 20) Object.assign(p, newPetal(false));
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.color; ctx.globalAlpha = 0.8;
      ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;

    // fireworks
    if (fireworks && t - lastLaunch > 900) { launch(); lastLaunch = t; }
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.y += r.vy; r.vy *= 0.985;
      ctx.fillStyle = '#fff'; ctx.fillRect(r.x, r.y, 2, 6);
      if (r.y <= r.ty) { burst(r.x, r.y); rockets.splice(i, 1); }
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx; s.y += s.vy; s.vy += 0.03; s.vx *= 0.985; s.life -= 0.012;
      if (s.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.globalAlpha = s.life; ctx.fillStyle = s.color;
      ctx.beginPath(); ctx.arc(s.x, s.y, 2.2, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // ---------- Typing the message ----------
  let typeTimer;
  function playWish() {
    clearInterval(typeTimer);
    const msg = $('message');
    msg.textContent = '';
    document.querySelector('.saal').classList.remove('show');
    const chars = Array.from(MESSAGE);
    let i = 0;
    typeTimer = setInterval(() => {
      msg.textContent += chars[i++];
      if (i >= chars.length) {
        clearInterval(typeTimer);
        document.querySelector('.saal').classList.add('show');
      }
    }, 55);

    fireworks = true;
    for (let k = 0; k < 3; k++) setTimeout(launch, k * 350);
  }

  // ---------- Music ----------
  let muted = false;
  function startMusic() {
    music.volume = 0.6;
    music.play().catch(() => { /* music.mp3 missing or blocked: site works silently */ });
  }
  $('muteBtn').addEventListener('click', () => {
    muted = !muted;
    music.muted = muted;
    if (!muted && music.paused) startMusic();
    $('muteBtn').textContent = muted ? '🔇 संगीत' : '🔊 संगीत';
  });

  // ---------- Flow ----------
  $('openBtn').addEventListener('click', () => {
    intro.classList.remove('active');
    wish.classList.add('active');
    window.scrollTo(0, 0);
    startMusic();
    playWish();
  });
  $('replayBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playWish();
  });
  // tap anywhere on the card to launch a firework
  document.querySelector('.card').addEventListener('click', (e) => {
    burst(e.clientX, e.clientY);
  });

  // ---------- Sharing ----------
  function shareUrl() {
    const n = $('nameInput').value.trim();
    const base = location.origin + location.pathname;
    return n ? base + '?name=' + encodeURIComponent(n) : base;
  }
  function shareText() {
    const n = $('nameInput').value.trim();
    return (n ? n + ' जी, ' : '') +
      'नूतन वर्षाभिनंदन! 🪔 आपके लिए नववर्ष की एक खास शुभकामना:\n' + shareUrl();
  }
  $('waBtn').addEventListener('click', () => {
    window.open('https://wa.me/?text=' + encodeURIComponent(shareText()), '_blank', 'noopener');
  });
  $('copyBtn').addEventListener('click', async () => {
    const note = $('copyNote');
    try {
      await navigator.clipboard.writeText(shareUrl());
      note.textContent = 'लिंक कॉपी हो गया ✅';
    } catch (e) {
      note.textContent = shareUrl();
    }
  });
})();
