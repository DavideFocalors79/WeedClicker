// --- VARIABILI DEL GIOCO ---
let score = 0;
let clickPower = 1;
let autoClickBPS = 0;
let prestigeMultiplier = 1;

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
  return clickPower * multiplier * prestigeMultiplier;
}

function getEffBps() {
  let multiplier = 1;
  if (hasUpgrade2) multiplier *= 2;
  if (hasUpgrade4) multiplier *= 3;
  return autoClickBPS * multiplier * prestigeMultiplier;
}

// --- FUNZIONI DI SALVATAGGIO ---
function saveGame() {
  const gameSave = {
    score: score, clickPower: clickPower, autoClickBPS: autoClickBPS,
    prestigeMultiplier: prestigeMultiplier, clickUpgradeCost: clickUpgradeCost,
    autoClickerCost: autoClickerCost, dryCost: dryCost,
    frozenCost: frozenCost, mysteryCost: mysteryCost,
    prestigeThreshold: prestigeThreshold,
    hasUpg1: hasUpgrade1, hasUpg2: hasUpgrade2, hasUpg3: hasUpgrade3, hasUpg4: hasUpgrade4
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
    if (typeof savedGame.dryCost !== "undefined") factoryCost = savedGame.dryCost;
    if (typeof savedGame.frozenCost !== "undefined") factoryCost = savedGame.frozenCost;
    if (typeof savedGame.mysteryCost !== "undefined") mysteryCost = savedGame.mysteryCost;
    if (typeof savedGame.prestigeThreshold !== "undefined") prestigeThreshold = savedGame.prestigeThreshold;

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

function spinWheel() {
  if (isSpinning || score < mysteryCost) return;
  score -= mysteryCost; isSpinning = true; updateDisplay(); saveGame();

  let roll = Math.random();
  let targetAngle; let resultCallback;

  if (roll < 0.40) {
    targetAngle = Math.floor(Math.random() * 130) + 5;
    resultCallback = () => alert("Sfortuna! Hai perso i la robba buona!😭 Stai attento agli sbirri!");
  } else if (roll < 0.75) {
    targetAngle = Math.floor(Math.random() * 110) + 150; let vincita = mysteryCost * 3;
    resultCallback = () => { score += vincita; alert("Vittoria! Hai triplicato la robba spesa! (+" + vincita + ") "); };
  } else if (roll < 0.95) {
    targetAngle = Math.floor(Math.random() * 60) + 275;
    resultCallback = () => { clickPower += 25; alert("Crazy! Base per click +25! 🧤"); };
  } else {
    targetAngle = Math.floor(Math.random() * 10) + 345;
    resultCallback = () => { autoClickBPS += 150; alert("🎰 JACKPOT! Produzione Base +150 W/s! 🏭✨"); };
  }

  let spins = 5; let extraRotation = 360 - targetAngle; let currentMod = wheelRotation % 360;
  wheelRotation += (360 * spins) + (extraRotation - currentMod);
  document.getElementById('wheel').style.transform = `rotate(${wheelRotation}deg)`;

  setTimeout(() => {
    resultCallback(); mysteryCost = Math.floor(mysteryCost * 1.2);
    isSpinning = false; updateDisplay(); saveGame();
  }, 4000);
}

function doPrestige() {
  if (score >= prestigeThreshold) {
    prestigeMultiplier += 1;
    prestigeThreshold = Math.floor(prestigeThreshold * 3);
    score = 0; clickPower = 1; autoClickBPS = 0;
    clickUpgradeCost = 10; autoClickerCost = 50; dryCost = 500; frozenCost = 1500; mysteryCost = 1000;

    hasUpgrade1 = false; hasUpgrade2 = false; hasUpgrade3 = false; hasUpgrade4 = false;

    alert("Hai fatto Prestigio! Ora il tuo moltiplicatore è x" + prestigeMultiplier);
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
