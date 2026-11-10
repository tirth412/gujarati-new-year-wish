// Reloads the page when newer files have been published, so old open tabs pick up new code.
(function () {
  const FILES = ['index.html', 'script.js', 'style.css', 'track.js', 'firebase-config.js', 'update.js'];
  const EVERY = 5 * 60 * 1000;

  function hash(text) {
    let h = 0;
    for (let i = 0; i < text.length; i++) h = (Math.imul(31, h) + text.charCodeAt(i)) | 0;
    return h;
  }
  async function fingerprint(cache) {
    const parts = await Promise.all(FILES.map(async (f) => {
      const r = await fetch(f, { cache });
      return hash(await r.text());
    }));
    return parts.join('-');
  }
  // Blocks a reload loop if something goes wrong.
  function canReload() {
    try {
      const last = +sessionStorage.getItem('updReload') || 0;
      if (Date.now() - last < 60000) return false;
      sessionStorage.setItem('updReload', String(Date.now()));
    } catch (e) { /* storage unavailable: reload once anyway */ }
    return true;
  }

  let running = null, pending = false;

  async function check(first) {
    try {
      if (!running) running = await fingerprint('force-cache');
      const latest = await fingerprint('reload');
      if (latest === running) return;
      // On load reload right away; otherwise wait until the tab is hidden so nobody is interrupted.
      if (first || document.hidden) { if (canReload()) location.reload(); }
      else pending = true;
    } catch (e) { /* offline: try again later */ }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (pending && canReload()) location.reload(); }
    else check(false);
  });
  setInterval(() => check(false), EVERY);
  window.addEventListener('load', () => check(true));
})();
