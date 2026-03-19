// --- VARIABILI DEL GIOCO ---
let score = 0;
let clickPower = 1;
let autoClickBPS = 0;
let prestigeMultiplier = 1;
let epsteinTokens = 0;

let clickUpgradeCost = 10;
let autoClickerCost = 50;
let dryCost = 500;
let frozenCost = 1500;
let mysteryCost = 1000;
let prestigeThreshold = 3000;

// Variabili per i Potenziamenti (Upgrade)
let hasUpgrade1 = false; // Click x2
let hasUpgrade2 = false; // BPS x2
let hasUpgrade3 = false; // Click x3
let hasUpgrade4 = false; // BPS x3

// Permanenti (non resettano al prestige)
let hasPermanent1 = false; // +1 click
let hasPermanent2 = false; // +5 bps
let hasPermanent3 = false; // +0.5 prestige multiplier
let hasPermanent4 = false; // +10 bps
let permanentClickBonus = 0;
let permanentBpsBonus = 0;
let permanentPrestigeBonus = 0;

let wheelRotation = 0;
let isSpinning = false;

// --- COLLEGAMENTI HTML ---
const scoreDisplay = document.getElementById('score');
const effClickPowerDisplay = document.getElementById('eff-click-power');
const effBpsDisplay = document.getElementById('eff-bps');
const clickCostDisplay = document.getElementById('click-cost');
const autoCostDisplay = document.getElementById('auto-cost');
const dryCostDisplay = document.getElementById('dry-cost');
const frozenCostDisplay = document.getElementById('frozen-cost');
const mysteryCostDisplay = document.getElementById('mystery-cost');
const prestigeDisplay = document.getElementById('prestige-display');
const prestigeCostDisplay = document.getElementById('prestige-cost');

// Potenziamenti
const btnUpg1 = document.getElementById('btn-upg1');
const btnUpg2 = document.getElementById('btn-upg2');
const btnUpg3 = document.getElementById('btn-upg3');
const btnUpg4 = document.getElementById('btn-upg4');

const saveNotification = document.getElementById('save-notification');

// --- FUNZIONI MATEMATICHE DINAMICHE ---
function getEffClick() {
  let multiplier = 1;
  if (hasUpgrade1) multiplier *= 2;
  if (hasUpgrade3) multiplier *= 3;
  const effectivePrestige = prestigeMultiplier + permanentPrestigeBonus;
  return (clickPower + permanentClickBonus) * multiplier * effectivePrestige;
}

function getEffBps() {
  let multiplier = 1;
  if (hasUpgrade2) multiplier *= 2;
  if (hasUpgrade4) multiplier *= 3;
  const effectivePrestige = prestigeMultiplier + permanentPrestigeBonus;
  return (autoClickBPS + permanentBpsBonus) * multiplier * effectivePrestige;
}

// --- FUNZIONI DI SALVATAGGIO ---
function saveGame() {
  const gameSave = {
    score: score, clickPower: clickPower, autoClickBPS: autoClickBPS,
    prestigeMultiplier: prestigeMultiplier, epsteinTokens: epsteinTokens, clickUpgradeCost: clickUpgradeCost,
    autoClickerCost: autoClickerCost, dryCost: dryCost,
    frozenCost: frozenCost, mysteryCost: mysteryCost,
    prestigeThreshold: prestigeThreshold,
    hasUpg1: hasUpgrade1, hasUpg2: hasUpgrade2, hasUpg3: hasUpgrade3, hasUpg4: hasUpgrade4,
    hasPermanent1: hasPermanent1, hasPermanent2: hasPermanent2, hasPermanent3: hasPermanent3, hasPermanent4: hasPermanent4,
    permanentClickBonus: permanentClickBonus, permanentBpsBonus: permanentBpsBonus, permanentPrestigeBonus: permanentPrestigeBonus
  };
  localStorage.setItem("IlGiroSave", JSON.stringify(gameSave));
  saveNotification.style.opacity = 1;
  setTimeout(() => { saveNotification.style.opacity = 0; }, 1500);
}

function loadGame() {
  const savedGame = JSON.parse(localStorage.getItem("IlGiroSave"));
  if (savedGame !== null) {
    if (typeof savedGame.score !== "undefined") score = savedGame.score;
    if (typeof savedGame.clickPower !== "undefined") clickPower = savedGame.clickPower;
    if (typeof savedGame.autoClickBPS !== "undefined") autoClickBPS = savedGame.autoClickBPS;
    if (typeof savedGame.prestigeMultiplier !== "undefined") prestigeMultiplier = savedGame.prestigeMultiplier;
    if (typeof savedGame.clickUpgradeCost !== "undefined") clickUpgradeCost = savedGame.clickUpgradeCost;
    if (typeof savedGame.autoClickerCost !== "undefined") autoClickerCost = savedGame.autoClickerCost;
    if (typeof savedGame.dryCost !== "undefined") dryCost = savedGame.dryCost;
    if (typeof savedGame.frozenCost !== "undefined") frozenCost = savedGame.frozenCost;
    if (typeof savedGame.mysteryCost !== "undefined") mysteryCost = savedGame.mysteryCost;
    if (typeof savedGame.prestigeThreshold !== "undefined") prestigeThreshold = savedGame.prestigeThreshold;
    if (typeof savedGame.epsteinTokens !== "undefined") epsteinTokens = savedGame.epsteinTokens;
    if (typeof savedGame.hasPermanent1 !== "undefined") hasPermanent1 = savedGame.hasPermanent1;
    if (typeof savedGame.hasPermanent2 !== "undefined") hasPermanent2 = savedGame.hasPermanent2;
    if (typeof savedGame.hasPermanent3 !== "undefined") hasPermanent3 = savedGame.hasPermanent3;
    if (typeof savedGame.hasPermanent4 !== "undefined") hasPermanent4 = savedGame.hasPermanent4;
    if (typeof savedGame.permanentClickBonus !== "undefined") permanentClickBonus = savedGame.permanentClickBonus;
    if (typeof savedGame.permanentBpsBonus !== "undefined") permanentBpsBonus = savedGame.permanentBpsBonus;
    if (typeof savedGame.permanentPrestigeBonus !== "undefined") permanentPrestigeBonus = savedGame.permanentPrestigeBonus;

    if (typeof savedGame.hasUpg1 !== "undefined") hasUpgrade1 = savedGame.hasUpg1;
    if (typeof savedGame.hasUpg2 !== "undefined") hasUpgrade2 = savedGame.hasUpg2;
    if (typeof savedGame.hasUpg3 !== "undefined") hasUpgrade3 = savedGame.hasUpg3;
    if (typeof savedGame.hasUpg4 !== "undefined") hasUpgrade4 = savedGame.hasUpg4;
  }
}

function resetGame() {
  if (confirm("Vuoi cancellare TUTTI i tuoi progressi?")) {
    localStorage.removeItem("IlGiroSave"); location.reload();
  }
}

// --- FUNZIONI DEL GIOCO ---
function switchPage(pageName) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('page-' + pageName).classList.add('active');
  document.getElementById('nav-' + pageName).classList.add('active');
}

function clickCookie() { score += getEffClick(); updateDisplay(); }

function buyClickUpgrade() { if (score >= clickUpgradeCost) { score -= clickUpgradeCost; clickPower += 1; clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5); updateDisplay(); } }

function buyAutoClicker() { if (score >= autoClickerCost) { score -= autoClickerCost; autoClickBPS += 1; autoClickerCost = Math.floor(autoClickerCost * 1.5); updateDisplay(); } }

function Buydry() {
  if (score >= dryCost) {
    score -= dryCost;
    autoClickBPS += 10;
    dryCost = Math.floor(dryCost * 1.5);
    updateDisplay();
  }
}

function BuyfrozenCost() {
  if (score >= frozenCost) {
    score -= frozenCost;
    autoClickBPS += 25;
    frozenCost = Math.floor(frozenCost * 1.5);
    updateDisplay();
  }
}

function buyUpgrade(id, cost) {
  if (score >= cost) {
    if (id === 1 && !hasUpgrade1) { score -= cost; hasUpgrade1 = true; }
    if (id === 2 && !hasUpgrade2) { score -= cost; hasUpgrade2 = true; }
    if (id === 3 && !hasUpgrade3) { score -= cost; hasUpgrade3 = true; }
    if (id === 4 && !hasUpgrade4) { score -= cost; hasUpgrade4 = true; }
    updateDisplay();
    saveGame();
  }
}

function buyPermanentUpgrade(id, tokenCost) {
  if (epsteinTokens < tokenCost) return;

  if (id === 1 && !hasPermanent1) {
    epsteinTokens -= tokenCost;
    hasPermanent1 = true;
    permanentClickBonus += 2;
  }
  if (id === 2 && !hasPermanent2) {
    epsteinTokens -= tokenCost;
    hasPermanent2 = true;
    permanentBpsBonus += 15;
  }
  if (id === 3 && !hasPermanent3) {
    epsteinTokens -= tokenCost;
    hasPermanent3 = true;
    permanentPrestigeBonus += 1;
  }
  if (id === 4 && !hasPermanent4) {
    epsteinTokens -= tokenCost;
    hasPermanent4 = true;
    permanentBpsBonus += 30;
  }

  updateDisplay();
  saveGame();
}

function spinWheel() {
  if (isSpinning || score < mysteryCost) return;

  score -= mysteryCost;
  isSpinning = true;
  updateDisplay();
  saveGame();

  let wheelEl = document.getElementById('wheel');
  if (!wheelEl) {
    console.error("Ruota non trovata: id='wheel'");
    isSpinning = false;
    updateDisplay();
    return;
  }

  let roll = Math.random();
  let targetAngle; let resultCallback;

  if (roll < 0.40) {
    targetAngle = Math.floor(Math.random() * 130) + 5;
    resultCallback = () => alert("Sfortuna! Hai perso i la robba buona!😭 Stai attento agli sbirri!");
  } else if (roll < 0.75) {
    targetAngle = Math.floor(Math.random() * 110) + 150;
    let vincita = mysteryCost * 3;
    resultCallback = () => { score += vincita; alert("Vittoria! Hai triplicato la robba spesa! (+" + vincita + ") "); };
  } else if (roll < 0.95) {
    targetAngle = Math.floor(Math.random() * 60) + 275;
    resultCallback = () => { clickPower += 25; alert("Crazy! Base per click +25! 🧤"); };
  } else {
    targetAngle = Math.floor(Math.random() * 10) + 345;
    resultCallback = () => { autoClickBPS += 150; alert("🎰 JACKPOT! Produzione Base +150 W/s! 🏭✨"); };
  }

  try {
    let spins = 5;
    let currentMod = (wheelRotation % 360 + 360) % 360; // 0..359
    let targetMod = targetAngle;
    let delta = ((targetMod - currentMod + 360) % 360) + (360 * spins);
    wheelRotation += delta;

    // Force layout and then animate
    void wheelEl.offsetWidth;
    wheelEl.style.transform = `rotate(${wheelRotation}deg)`;

    setTimeout(() => {
      try {
        if (typeof resultCallback === 'function') resultCallback();
        mysteryCost = Math.floor(mysteryCost * 1.2);
      } catch (innerErr) {
        console.error('Errore in resultCallback ruota:', innerErr);
      } finally {
        isSpinning = false;
        updateDisplay();
        saveGame();
      }
    }, 4000);
  } catch (err) {
    console.error('Errore durante spinWheel:', err);
    isSpinning = false;
    updateDisplay();
    saveGame();
  }
}

function doPrestige() {
  if (score >= prestigeThreshold) {
    prestigeMultiplier += 1;
    epsteinTokens += 1;
    prestigeThreshold = Math.floor(prestigeThreshold * 3);
    score = 0; clickPower = 1; autoClickBPS = 0;
    clickUpgradeCost = 10; autoClickerCost = 50; dryCost = 500; frozenCost = 1500; mysteryCost = 1000;

    hasUpgrade1 = false; hasUpgrade2 = false; hasUpgrade3 = false; hasUpgrade4 = false;

    alert("Hai fatto Prestigio! Ora il tuo moltiplicatore è x" + prestigeMultiplier + " e hai guadagnato 1 Epstein Token! 🔷");
    updateDisplay(); saveGame(); switchPage('forno');
  }
}

function updateDisplay() {
  scoreDisplay.textContent = Math.floor(score);

  effClickPowerDisplay.textContent = getEffClick();
  effBpsDisplay.textContent = getEffBps();

  document.getElementById('click-cost').textContent = clickUpgradeCost;
  document.getElementById('auto-cost').textContent = autoClickerCost;
  document.getElementById('dry-cost').textContent = dryCost;
   document.getElementById('frozen-cost').textContent = frozenCost;
  mysteryCostDisplay.textContent = mysteryCost;
  prestigeDisplay.textContent = prestigeMultiplier;
  document.getElementById('epstein-token-display').textContent = epsteinTokens;
  prestigeCostDisplay.textContent = prestigeThreshold;

  document.getElementById('btn-click-upgrade').disabled = score < clickUpgradeCost || isSpinning;
  document.getElementById('btn-auto-click').disabled = score < autoClickerCost || isSpinning;
  document.getElementById('btn-dry').disabled = score < dryCost || isSpinning;
  document.getElementById('btn-frozen').disabled = score < frozenCost || isSpinning;
  document.getElementById('btn-mystery').disabled = score < mysteryCost || isSpinning;
  document.getElementById('btn-prestige').disabled = score < prestigeThreshold || isSpinning;

  function setUpgBtnState(btn, hasBought, cost, title) {
    if (hasBought) {
      btn.textContent = `✅ ${title} (Acquistato)`;
      btn.classList.add('bought');
      btn.disabled = true;
    } else {
      btn.textContent = `${title} - ${cost}`;
      btn.classList.remove('bought');
      btn.disabled = score < cost || isSpinning;
    }
  }

  setUpgBtnState(btnUpg1, hasUpgrade1, 2500, "🖱️ Sniffer (Click x2)");
  setUpgBtnState(btnUpg2, hasUpgrade2, 10000, "✨ Cocaina (WPS x2)");
  setUpgBtnState(btnUpg3, hasUpgrade3, 50000, "🍫 Robba buona (Click x3)");
  setUpgBtnState(btnUpg4, hasUpgrade4, 100000, "🔥 ts lit as fuck (WPS x3)");

  function setPermanentBtnState(btn, hasBought, cost, title) {
    if (hasBought) {
      btn.textContent = `✅ ${title} (Acquistato)`;
      btn.classList.add('bought');
      btn.disabled = true;
    } else {
      btn.textContent = `${title} - ${cost} Token`;
      btn.classList.remove('bought');
      btn.disabled = epsteinTokens < cost || isSpinning;
    }
  }

  setPermanentBtnState(document.getElementById('btn-perm1'), hasPermanent1, 5, "+2 Click per clic");
  setPermanentBtnState(document.getElementById('btn-perm2'), hasPermanent2, 10, "+15 g/s");
  setPermanentBtnState(document.getElementById('btn-perm3'), hasPermanent3, 15, "+1x Prestige");
  setPermanentBtnState(document.getElementById('btn-perm4'), hasPermanent4, 25, "+30 g/s");
}

// INIZIALIZZAZIONE
loadGame();
updateDisplay();

setInterval(function() {
  if (autoClickBPS > 0) {
    score += getEffBps();
    updateDisplay();
  }
}, 1000);

setInterval(function() { saveGame(); }, 5000);
