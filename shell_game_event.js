// ============================================================
//  EVENTO SHELL GAME - Limbo style key shuffle
//  Intervallo: 6-12 minuti
//  Vinci: +50% grammi | Perdi: -80% grammi
// ============================================================
(function() {

  const MIN_INTERVAL = 6  * 60 * 1000;
  const MAX_INTERVAL = 12 * 60 * 1000;

  let shellEventActive = false;

  function isAnyEventActive() { return !!window.__anyEventActive; }
  function setEventActive(val) { window.__anyEventActive = val; }

  // ── CSS ───────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* ── INTRO OVERLAY ── */
    #shell-intro-overlay {
      position:fixed; inset:0; z-index:9999;
      background:#050505;
      display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      font-family:'Courier New',monospace;
      animation:shellFadeIn 0.3s ease;
    }
    @keyframes shellFadeIn { from{opacity:0} to{opacity:1} }

    .shell-glitch-text {
      font-size:clamp(32px,10vw,90px);
      font-weight:900; letter-spacing:6px;
      color:#39ff14;
      text-shadow:0 0 20px #39ff14, 0 0 60px #39ff1466;
      animation:shellGlitch 0.6s infinite;
    }
    @keyframes shellGlitch {
      0%  { transform:translate(0,0) skew(0deg); color:#39ff14; }
      20% { transform:translate(-3px,1px) skew(-1.5deg); color:#ff39a0; }
      40% { transform:translate(2px,-2px); color:#39ff14; }
      60% { transform:translate(-1px,2px) skew(1deg); color:#39ffee; }
      80% { transform:translate(3px,-1px); color:#39ff14; }
      100%{ transform:translate(0,0); }
    }
    .shell-intro-sub {
      color:#555; font-size:14px; letter-spacing:4px;
      margin-top:12px; text-transform:uppercase;
    }
    .shell-intro-num {
      font-size:72px; font-weight:900; color:#39ff14;
      font-family:monospace;
      text-shadow:0 0 30px #39ff14;
      margin-top:20px;
    }

    /* ── GAME MODAL ── */
    #shell-modal-overlay {
      position:fixed; inset:0; z-index:10000;
      background:rgba(0,0,0,0.92);
      display:flex; align-items:center; justify-content:center;
      padding:16px; box-sizing:border-box;
      animation:shellFadeIn 0.4s ease;
    }
    #shell-modal {
      background:linear-gradient(160deg,#060f06,#000d00);
      border:2px solid #39ff14;
      border-radius:20px;
      padding:26px 22px;
      max-width:420px; width:100%;
      box-shadow:0 0 40px rgba(57,255,20,0.35), 0 0 100px rgba(57,255,20,0.1);
      text-align:center;
      animation:shellSlideUp 0.4s cubic-bezier(.17,.67,.1,1);
    }
    @keyframes shellSlideUp {
      from{transform:translateY(50px);opacity:0}
      to  {transform:translateY(0);opacity:1}
    }

    #shell-title {
      color:#39ff14; font-size:20px; font-weight:900;
      letter-spacing:3px; margin-bottom:4px;
    }
    #shell-subtitle {
      color:#1a6600; font-size:11px; letter-spacing:3px;
      margin-bottom:6px; text-transform:uppercase;
    }
    #shell-phase-label {
      color:#888; font-size:12px; letter-spacing:2px;
      min-height:18px; margin-bottom:16px;
    }
    #shell-stake {
      background:rgba(57,255,20,0.07);
      border:1px solid rgba(57,255,20,0.3);
      border-radius:8px; padding:8px 12px;
      margin-bottom:16px; font-size:13px;
    }
    #shell-stake .win-text  { color:#39ff14; font-weight:bold; }
    #shell-stake .lose-text { color:#ff3939; font-weight:bold; }

    /* KEYS GRID */
    #shell-keys-container {
      display:flex; gap:10px; justify-content:center;
      flex-wrap:wrap;
      margin-bottom:18px;
      min-height:80px; align-items:center;
    }
    .shell-key {
      width:54px; height:54px;
      background:#0a1a0a;
      border:2px solid #1a4a1a;
      border-radius:12px;
      display:flex; align-items:center; justify-content:center;
      font-size:28px; cursor:default;
      transition:all 0.15s;
      position:relative;
      user-select:none;
    }
    .shell-key.clickable {
      cursor:pointer;
    }
    .shell-key.clickable:hover {
      background:#0f2a0f;
      border-color:#39ff14;
      box-shadow:0 0 12px rgba(57,255,20,0.4);
      transform:translateY(-3px);
    }
    .shell-key.revealed-correct {
      background:rgba(57,255,20,0.2);
      border-color:#39ff14;
      box-shadow:0 0 20px rgba(57,255,20,0.7);
      animation:shellPop 0.3s ease;
    }
    .shell-key.revealed-wrong {
      background:rgba(255,57,57,0.2);
      border-color:#ff3939;
      box-shadow:0 0 20px rgba(255,57,57,0.5);
    }
    .shell-key.highlight {
      background:rgba(57,255,20,0.25);
      border-color:#39ff14;
      box-shadow:0 0 24px rgba(57,255,20,0.8);
      animation:shellPulse 0.4s ease infinite alternate;
    }
    .shell-key.shuffling {
      transition:none;
    }
    @keyframes shellPop {
      0%  {transform:scale(1)}
      50% {transform:scale(1.3)}
      100%{transform:scale(1)}
    }
    @keyframes shellPulse {
      from{box-shadow:0 0 10px rgba(57,255,20,0.5)}
      to  {box-shadow:0 0 30px rgba(57,255,20,1), 0 0 60px rgba(57,255,20,0.4)}
    }

    /* SHUFFLE TRAIL */
    .shell-key.trail {
      border-color:#39ff1466;
      background:rgba(57,255,20,0.08);
    }

    #shell-result {
      font-size:16px; font-weight:bold; min-height:22px;
      margin-bottom:12px; transition:all 0.3s;
    }
    #shell-result.win  { color:#39ff14; text-shadow:0 0 12px #39ff14; }
    #shell-result.lose { color:#ff3939; text-shadow:0 0 12px #ff3939; }

    #shell-close-btn {
      background:#39ff14; color:#000;
      border:none; border-radius:10px;
      padding:12px 30px; font-size:15px;
      font-weight:900; cursor:pointer;
      display:none; transition:all 0.2s;
      letter-spacing:1px;
    }
    #shell-close-btn:hover { background:#2ecc0f; transform:translateY(-2px); }

    /* SPEED INDICATOR */
    #shell-speed-bar {
      display:flex; gap:4px; justify-content:center;
      margin-bottom:10px;
    }
    .shell-speed-dot {
      width:8px; height:8px; border-radius:50%;
      background:#1a4a1a; transition:background 0.3s;
    }
    .shell-speed-dot.active { background:#39ff14; }
  `;
  document.head.appendChild(style);

  // ── TRIGGER ───────────────────────────────────────────────
  function triggerShellEvent() {
    if (isAnyEventActive()) {
      setTimeout(triggerShellEvent, 2 * 60 * 1000);
      return;
    }
    setEventActive(true);
    shellEventActive = true;
    showIntro();
  }

  // ── INTRO (2.5s) ──────────────────────────────────────────
  function showIntro() {
    const ov = document.createElement('div');
    ov.id = 'shell-intro-overlay';
    ov.innerHTML = `
      <div class="shell-glitch-text">SHELL GAME</div>
      <div class="shell-intro-sub">Trova la chiave giusta</div>
      <div class="shell-intro-num" id="shell-intro-cd">3</div>
    `;
    document.body.appendChild(ov);

    let cd = 3;
    const iv = setInterval(() => {
      cd--;
      const el = document.getElementById('shell-intro-cd');
      if (el) el.textContent = cd;
      if (cd <= 0) {
        clearInterval(iv);
        ov.remove();
        showGame();
      }
    }, 800);
  }

  // ── GAME ──────────────────────────────────────────────────
  const KEY_ICONS = ['🗝️','🔑','⚿','🗝','🔐','🔓','🔒','🗝️'];
  // Usiamo lo stesso emoji per tutte le chiavi nascoste, una diversa per quella corretta
  const HIDDEN_ICON = '❓';
  const CORRECT_ICON = '🗝️';

  function showGame() {
    const grammi = typeof score !== 'undefined' ? score : 0;
    const winAmt  = Math.floor(grammi * 0.5);
    const loseAmt = Math.floor(grammi * 0.8);
    const fmt = v => typeof formatNum === 'function' ? formatNum(v) : v;

    const ov = document.createElement('div');
    ov.id = 'shell-modal-overlay';
    ov.innerHTML = `
      <div id="shell-modal">
        <div id="shell-title">🗝️ SHELL GAME</div>
        <div id="shell-subtitle">— Trova la chiave —</div>
        <div id="shell-phase-label">Guarda bene...</div>
        <div id="shell-stake">
          ✅ Indovina: <span class="win-text">+${fmt(winAmt)} grammi (+50%)</span><br>
          ❌ Sbaglia: <span class="lose-text">-${fmt(loseAmt)} grammi (-80%)</span>
        </div>
        <div id="shell-speed-bar">
          <div class="shell-speed-dot" id="spd-1"></div>
          <div class="shell-speed-dot" id="spd-2"></div>
          <div class="shell-speed-dot" id="spd-3"></div>
          <div class="shell-speed-dot" id="spd-4"></div>
          <div class="shell-speed-dot" id="spd-5"></div>
        </div>
        <div id="shell-keys-container"></div>
        <div id="shell-result"></div>
        <button id="shell-close-btn" onclick="shellClose()">Continua il Giro</button>
      </div>
    `;
    document.body.appendChild(ov);

    startShellSequence(winAmt, loseAmt);
  }

  function startShellSequence(winAmt, loseAmt) {
    const NUM_KEYS = 8;
    let correctIdx = Math.floor(Math.random() * NUM_KEYS);

    // Fase 1: mostra le chiavi nascoste
    renderKeys(NUM_KEYS, correctIdx, 'hidden');

    // Fase 2: rivela quella corretta per 4s
    setTimeout(() => {
      setPhaseLabel('🟢 Questa è la chiave!');
      renderKeys(NUM_KEYS, correctIdx, 'reveal');
    }, 600);

    // Fase 3: nasconde tutto e inizia lo shuffle
    setTimeout(() => {
      setPhaseLabel('👀 Seguila...');
      renderKeys(NUM_KEYS, correctIdx, 'hidden');
      startShuffle(NUM_KEYS, correctIdx, winAmt, loseAmt);
    }, 4800);
  }

  function renderKeys(n, correctIdx, mode) {
    const container = document.getElementById('shell-keys-container');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const key = document.createElement('div');
      key.className = 'shell-key';
      key.id = `shell-key-${i}`;
      if (mode === 'reveal' && i === correctIdx) {
        key.classList.add('highlight');
        key.textContent = CORRECT_ICON;
      } else if (mode === 'hidden') {
        key.textContent = HIDDEN_ICON;
      } else if (mode === 'pick') {
        key.classList.add('clickable');
        key.textContent = HIDDEN_ICON;
      }
      container.appendChild(key);
    }
  }

  function startShuffle(n, correctIdx, winAmt, loseAmt) {
    // Costruisci array di posizioni — shuffliamo gli indici
    let positions = Array.from({length: n}, (_, i) => i); // posizione[i] = key i è in slot positions[i]
    // In realtà tracciamo dove si trova la chiave corretta
    let correctPos = correctIdx;

    // Parametri shuffle: aumenta velocità nel tempo
    const PHASES = [
      { swaps: 2,  delay: 1200 },  // lentissimo
      { swaps: 3,  delay: 900  },  // lento
      { swaps: 3,  delay: 650  },  // medio
    ];

    let phaseIdx = 0;
    let totalSwaps = PHASES.reduce((a, p) => a + p.swaps, 0);
    let swapsDone = 0;
    const speedDots = 5;

    function doPhase() {
      if (phaseIdx >= PHASES.length) {
        // Fine shuffle — chiedi al giocatore
        setPhaseLabel('🔍 Dov\'è la chiave?');
        renderPickable(n, correctPos, winAmt, loseAmt);
        return;
      }

      const phase = PHASES[phaseIdx];
      let swapsLeft = phase.swaps;

      // Aggiorna indicatore velocità
      updateSpeedDots(phaseIdx + 1);

      function doSwap() {
        if (swapsLeft <= 0) {
          phaseIdx++;
          setTimeout(doPhase, 80);
          return;
        }

        // Scegli due posizioni casuali diverse
        let a = Math.floor(Math.random() * n);
        let b;
        do { b = Math.floor(Math.random() * n); } while (b === a);

        // Aggiorna dove si trova la chiave corretta
        if (correctPos === a) correctPos = b;
        else if (correctPos === b) correctPos = a;

        // Animazione visiva swap
        animateSwap(a, b, phase.delay * 0.7, () => {});

        swapsDone++;
        swapsLeft--;
        setTimeout(doSwap, phase.delay);
      }
      doSwap();
    }

    doPhase();
  }

  function animateSwap(idxA, idxB, duration, cb) {
    const keyA = document.getElementById(`shell-key-${idxA}`);
    const keyB = document.getElementById(`shell-key-${idxB}`);
    if (!keyA || !keyB) { cb(); return; }

    const rectA = keyA.getBoundingClientRect();
    const rectB = keyB.getBoundingClientRect();
    const dx = rectB.left - rectA.left;
    const dy = rectB.top  - rectA.top;

    // Aggiunge classe trail temporanea
    keyA.classList.add('trail');
    keyB.classList.add('trail');

    // Usa CSS transform per lo swap visivo
    keyA.style.transition = `transform ${duration}ms ease`;
    keyB.style.transition = `transform ${duration}ms ease`;
    keyA.style.transform = `translate(${dx}px, ${dy}px)`;
    keyB.style.transform = `translate(${-dx}px, ${-dy}px)`;

    setTimeout(() => {
      keyA.style.transition = '';
      keyB.style.transition = '';
      keyA.style.transform = '';
      keyB.style.transform = '';
      keyA.classList.remove('trail');
      keyB.classList.remove('trail');
      cb();
    }, duration + 20);
  }

  function renderPickable(n, correctPos, winAmt, loseAmt) {
    const container = document.getElementById('shell-keys-container');
    if (!container) return;

    // Rendi tutte cliccabili
    for (let i = 0; i < n; i++) {
      const key = document.getElementById(`shell-key-${i}`);
      if (!key) continue;
      key.classList.add('clickable');
      key.style.cursor = 'pointer';

      const idx = i; // closure
      key.onclick = () => handlePick(idx, correctPos, winAmt, loseAmt, n);
    }
  }

  function handlePick(picked, correctPos, winAmt, loseAmt, n) {
    // Disabilita tutti i click
    for (let i = 0; i < n; i++) {
      const k = document.getElementById(`shell-key-${i}`);
      if (k) { k.onclick = null; k.classList.remove('clickable'); k.style.cursor = 'default'; }
    }

    // Rivela tutte le chiavi
    for (let i = 0; i < n; i++) {
      const k = document.getElementById(`shell-key-${i}`);
      if (!k) continue;
      if (i === correctPos) {
        k.classList.add('revealed-correct');
        k.textContent = CORRECT_ICON;
      } else {
        k.classList.add('revealed-wrong');
        k.textContent = '❌';
      }
    }

    const resultEl = document.getElementById('shell-result');
    const fmt = v => typeof formatNum === 'function' ? formatNum(v) : v;

    if (picked === correctPos) {
      if (typeof score !== 'undefined') score += winAmt;
      if (resultEl) {
        resultEl.textContent = `🎉 Giusto! +${fmt(winAmt)} grammi!`;
        resultEl.className = 'win';
      }
    } else {
      if (typeof score !== 'undefined') score = Math.max(0, score - loseAmt);
      if (resultEl) {
        resultEl.textContent = `💀 Sbagliato! -${fmt(loseAmt)} grammi...`;
        resultEl.className = 'lose';
      }
    }

    setPhaseLabel('');
    if (typeof updateDisplay === 'function') updateDisplay();
    if (typeof saveGame === 'function') saveGame();

    const closeBtn = document.getElementById('shell-close-btn');
    if (closeBtn) closeBtn.style.display = 'inline-block';
  }

  // ── HELPERS ───────────────────────────────────────────────
  function setPhaseLabel(text) {
    const el = document.getElementById('shell-phase-label');
    if (el) el.textContent = text;
  }

  function updateSpeedDots(active) {
    for (let i = 1; i <= 5; i++) {
      const dot = document.getElementById(`spd-${i}`);
      if (dot) dot.classList.toggle('active', i <= active);
    }
  }

  window.shellClose = function() {
    const ov = document.getElementById('shell-modal-overlay');
    if (ov) ov.remove();
    shellEventActive = false;
    setEventActive(false);
    scheduleNext();
  };

  // ── SCHEDULING ────────────────────────────────────────────
  function scheduleNext() {
    const delay = MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);
    setTimeout(triggerShellEvent, delay);
  }

  scheduleNext();
  window.triggerShellEvent = triggerShellEvent;

})();
