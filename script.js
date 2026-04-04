// --- VARIABILI DEL GIOCO ---
let score = 0;
let clickPower = 1;
let autoClickBPS = 0;
let prestigeMultiplier = 1;
let epsteinTokens = 0;
let battlePassLevel = 0;

// Blackjack variables
let bjPlayerCards = [];
let bjDealerCards = [];
let bjBet = 0;
let bjGameInProgress = false;

let clickUpgradeCost = 15;
let autoClickerCost = 100;
let dryCost = 1200;
let frozenCost = 8000;
let mysteryCost = 1000;
let prestigeThreshold = 500000;  // primo prestige richiede 500k grammi

// Variabili per i Potenziamenti (Upgrade)
let hasUpgrade1 = false; // Click x2
let hasUpgrade2 = false; // BPS x2
let hasUpgrade3 = false; // Click x3
let hasUpgrade4 = false; // BPS x3
let hasUpgrade5 = false; // Click x4
let hasUpgrade6 = false; // BPS x4
let hasUpgrade7 = false; // Click x5
let hasUpgrade8 = false; // BPS x5
let hasUpgrade9 = false; // Click x6
let hasUpgrade10 = false; // BPS x6

// Nuovi negozio base
let spacciatoreCount = 0;
let spacciatoreBaseCost = 40000;
let spacciatoreCurrentCost = 40000;
let piantagioneCount = 0;
let piantagioneBaseCost = 300000;
let piantagioneCurrentCost = 300000;
let laboratorioCount = 0;
let laboratorioBaseCost = 3000000;
let laboratorioCurrentCost = 3000000;
// Nuovi edifici
let cartelCount = 0;
let cartelBaseCost = 30_000_000;
let cartelCurrentCost = 30_000_000;
let narcosubCount = 0;
let narcosubBaseCost = 350_000_000;
let narcosubCurrentCost = 350_000_000;
let chimicaCount = 0;
let chimicaBaseCost = 5_000_000_000;
let chimicaCurrentCost = 5_000_000_000;
// Token prestige multiplier (raddoppia ad ogni prestige)
let prestigeTokenMultiplier = 1;

// Permanenti (non resettano al prestige)
let hasPermanent1 = false;
let hasPermanent2 = false;
let hasPermanent3 = false;
let hasPermanent4 = false;
let hasPermanent5 = false;
let hasPermanent6 = false;  // Click x5
let hasPermanent7 = false;  // BPS x5
let hasPermanent8 = false;  // Token/s x2
let hasPermanent9 = false;  // Click x8
let hasPermanent10 = false; // BPS x8
let hasPermanent11 = false; // BTC miner x2
let hasPermanent12 = false; // God mode tutto x2
let permanentClickMultiplier = 1;
let permanentBpsMultiplier = 1;
let permanentPrestigeMultiplier = 1;
let permanentTokensPerSecond = 1; // moltiplicatore tokens/s
let permanentBtcMultiplier = 1;   // moltiplicatore produzione BTC

let isSpinning = false;

// --- AURA PRESTIGE ---
let auraPoints = 0;
let auraPrestigeCount = 0;
let auraCostGrammi = 200_000_000_000;  // 200 miliardi, poi x50 ogni volta
let auraCostToken  = 1_000;
let auraCostBtc    = 50;
let auraBaseMultiplier = 1;

// --- NEGOZIO AURA (upgrade con Punti Aura, NON resettano mai) ---
let auraShop = {
  clickBoost:    1,   // moltiplicatore click aura shop
  bpsBoost:      1,   // moltiplicatore BPS aura shop
  btcBoost:      1,   // moltiplicatore BTC aura shop
  tokenInterval: 10,  // ogni quanti secondi produci 1 token (si abbassa)
  prestigeBonus: 0,   // token extra per ogni prestige
  startMult:     1,   // moltiplicatore che parte dall'inizio dopo aura prestige
};
// Costi in Punti Aura per ogni upgrade (aumentano)
let auraShopCosts = {
  clickBoost:    3,
  bpsBoost:      3,
  btcBoost:      5,
  tokenInterval: 8,
  prestigeBonus: 10,
  startMult:     15,
};

// --- COLLEGAMENTI HTML ---
const scoreDisplay = document.getElementById('score');
const effClickPowerDisplay = document.getElementById('eff-click-power');
const effBpsDisplay = document.getElementById('eff-bps');
const clickCostDisplay = document.getElementById('click-cost');
const autoCostDisplay = document.getElementById('auto-cost');
const dryCostDisplay = document.getElementById('dry-cost');
const frozenCostDisplay = document.getElementById('frozen-cost');
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
  if (hasUpgrade5) multiplier *= 4;
  if (hasUpgrade7) multiplier *= 5;
  if (hasUpgrade9) multiplier *= 6;
  const effectivePrestige = prestigeMultiplier * permanentPrestigeMultiplier;
  return clickPower * multiplier * effectivePrestige * permanentClickMultiplier * auraBaseMultiplier * auraShop.clickBoost;
}

function getEffBps() {
  let multiplier = 1;
  if (hasUpgrade2) multiplier *= 2;
  if (hasUpgrade4) multiplier *= 3;
  if (hasUpgrade6) multiplier *= 4;
  if (hasUpgrade8) multiplier *= 5;
  if (hasUpgrade10) multiplier *= 6;
  const effectivePrestige = prestigeMultiplier * permanentPrestigeMultiplier;
  return autoClickBPS * multiplier * effectivePrestige * permanentBpsMultiplier * auraBaseMultiplier * auraShop.bpsBoost;
}

// --- FUNZIONI DI SALVATAGGIO ---
function saveGame() {
  const gameSave = {
    score: score, clickPower: clickPower, autoClickBPS: autoClickBPS,
    prestigeMultiplier: prestigeMultiplier, epsteinTokens: epsteinTokens, battlePassLevel: battlePassLevel, clickUpgradeCost: clickUpgradeCost,
    autoClickerCost: autoClickerCost, dryCost: dryCost,
    frozenCost: frozenCost, mysteryCost: mysteryCost,
    prestigeThreshold: prestigeThreshold,
    hasUpg1: hasUpgrade1, hasUpg2: hasUpgrade2, hasUpg3: hasUpgrade3, hasUpg4: hasUpgrade4,
    hasUpg5: hasUpgrade5, hasUpg6: hasUpgrade6, hasUpg7: hasUpgrade7, hasUpg8: hasUpgrade8,
    hasUpg9: hasUpgrade9, hasUpg10: hasUpgrade10,
    hasPermanent1: hasPermanent1, hasPermanent2: hasPermanent2, hasPermanent3: hasPermanent3, hasPermanent4: hasPermanent4, hasPermanent5: hasPermanent5,
    hasPermanent6: hasPermanent6, hasPermanent7: hasPermanent7, hasPermanent8: hasPermanent8,
    hasPermanent9: hasPermanent9, hasPermanent10: hasPermanent10, hasPermanent11: hasPermanent11, hasPermanent12: hasPermanent12,
    permanentClickMultiplier: permanentClickMultiplier, permanentBpsMultiplier: permanentBpsMultiplier, permanentPrestigeMultiplier: permanentPrestigeMultiplier,
    permanentTokensPerSecond: permanentTokensPerSecond, permanentBtcMultiplier: permanentBtcMultiplier,
    spacciatoreCount: spacciatoreCount, spacciatoreCurrentCost: spacciatoreCurrentCost,
    piantagioneCount: piantagioneCount, piantagioneCurrentCost: piantagioneCurrentCost,
    laboratorioCount: laboratorioCount, laboratorioCurrentCost: laboratorioCurrentCost,
    cartelCount: cartelCount, cartelCurrentCost: cartelCurrentCost,
    narcosubCount: narcosubCount, narcosubCurrentCost: narcosubCurrentCost,
    chimicaCount: chimicaCount, chimicaCurrentCost: chimicaCurrentCost,
    prestigeTokenMultiplier: prestigeTokenMultiplier,
    btcBalance: btcBalance, btcMiners: btcMiners, btcMinerCost: btcMinerCost,
    auraPoints: auraPoints, auraPrestigeCount: auraPrestigeCount, auraBaseMultiplier: auraBaseMultiplier,
    auraCostGrammi: auraCostGrammi, auraCostToken: auraCostToken, auraCostBtc: auraCostBtc,
    auraShop: JSON.stringify(auraShop), auraShopCosts: JSON.stringify(auraShopCosts)
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
    if (typeof savedGame.battlePassLevel !== "undefined") battlePassLevel = savedGame.battlePassLevel;
    if (typeof savedGame.hasPermanent1 !== "undefined") hasPermanent1 = savedGame.hasPermanent1;
    if (typeof savedGame.hasPermanent2 !== "undefined") hasPermanent2 = savedGame.hasPermanent2;
    if (typeof savedGame.hasPermanent3 !== "undefined") hasPermanent3 = savedGame.hasPermanent3;
    if (typeof savedGame.hasPermanent4 !== "undefined") hasPermanent4 = savedGame.hasPermanent4;
    if (typeof savedGame.hasPermanent5 !== "undefined") hasPermanent5 = savedGame.hasPermanent5;
    if (typeof savedGame.permanentClickMultiplier !== "undefined") permanentClickMultiplier = savedGame.permanentClickMultiplier;
    if (typeof savedGame.permanentBpsMultiplier !== "undefined") permanentBpsMultiplier = savedGame.permanentBpsMultiplier;
    if (typeof savedGame.permanentPrestigeMultiplier !== "undefined") permanentPrestigeMultiplier = savedGame.permanentPrestigeMultiplier;

    if (typeof savedGame.hasUpg1 !== "undefined") hasUpgrade1 = savedGame.hasUpg1;
    if (typeof savedGame.hasUpg2 !== "undefined") hasUpgrade2 = savedGame.hasUpg2;
    if (typeof savedGame.hasUpg3 !== "undefined") hasUpgrade3 = savedGame.hasUpg3;
    if (typeof savedGame.hasUpg4 !== "undefined") hasUpgrade4 = savedGame.hasUpg4;
    if (typeof savedGame.hasUpg5 !== "undefined") hasUpgrade5 = savedGame.hasUpg5;
    if (typeof savedGame.hasUpg6 !== "undefined") hasUpgrade6 = savedGame.hasUpg6;
    if (typeof savedGame.hasUpg7 !== "undefined") hasUpgrade7 = savedGame.hasUpg7;
    if (typeof savedGame.hasUpg8 !== "undefined") hasUpgrade8 = savedGame.hasUpg8;
    if (typeof savedGame.hasUpg9 !== "undefined") hasUpgrade9 = savedGame.hasUpg9;
    if (typeof savedGame.hasUpg10 !== "undefined") hasUpgrade10 = savedGame.hasUpg10;
    if (typeof savedGame.hasPermanent6 !== "undefined") hasPermanent6 = savedGame.hasPermanent6;
    if (typeof savedGame.hasPermanent7 !== "undefined") hasPermanent7 = savedGame.hasPermanent7;
    if (typeof savedGame.hasPermanent8 !== "undefined") hasPermanent8 = savedGame.hasPermanent8;
    if (typeof savedGame.hasPermanent9 !== "undefined") hasPermanent9 = savedGame.hasPermanent9;
    if (typeof savedGame.hasPermanent10 !== "undefined") hasPermanent10 = savedGame.hasPermanent10;
    if (typeof savedGame.hasPermanent11 !== "undefined") hasPermanent11 = savedGame.hasPermanent11;
    if (typeof savedGame.hasPermanent12 !== "undefined") hasPermanent12 = savedGame.hasPermanent12;
    if (typeof savedGame.permanentTokensPerSecond !== "undefined") permanentTokensPerSecond = savedGame.permanentTokensPerSecond;
    if (typeof savedGame.permanentBtcMultiplier !== "undefined") permanentBtcMultiplier = savedGame.permanentBtcMultiplier;
    if (typeof savedGame.spacciatoreCount !== "undefined") spacciatoreCount = savedGame.spacciatoreCount;
    if (typeof savedGame.spacciatoreCurrentCost !== "undefined") spacciatoreCurrentCost = savedGame.spacciatoreCurrentCost;
    if (typeof savedGame.piantagioneCount !== "undefined") piantagioneCount = savedGame.piantagioneCount;
    if (typeof savedGame.piantagioneCurrentCost !== "undefined") piantagioneCurrentCost = savedGame.piantagioneCurrentCost;
    if (typeof savedGame.laboratorioCount !== "undefined") laboratorioCount = savedGame.laboratorioCount;
    if (typeof savedGame.laboratorioCurrentCost !== "undefined") laboratorioCurrentCost = savedGame.laboratorioCurrentCost;
    if (typeof savedGame.cartelCount !== "undefined") cartelCount = savedGame.cartelCount;
    if (typeof savedGame.cartelCurrentCost !== "undefined") cartelCurrentCost = savedGame.cartelCurrentCost;
    if (typeof savedGame.narcosubCount !== "undefined") narcosubCount = savedGame.narcosubCount;
    if (typeof savedGame.narcosubCurrentCost !== "undefined") narcosubCurrentCost = savedGame.narcosubCurrentCost;
    if (typeof savedGame.chimicaCount !== "undefined") chimicaCount = savedGame.chimicaCount;
    if (typeof savedGame.chimicaCurrentCost !== "undefined") chimicaCurrentCost = savedGame.chimicaCurrentCost;
    if (typeof savedGame.prestigeTokenMultiplier !== "undefined") prestigeTokenMultiplier = savedGame.prestigeTokenMultiplier;
    if (typeof savedGame.btcBalance !== "undefined") btcBalance = savedGame.btcBalance;
    if (typeof savedGame.btcMiners !== "undefined") btcMiners = savedGame.btcMiners;
    if (typeof savedGame.btcMinerCost !== "undefined") btcMinerCost = savedGame.btcMinerCost;
    if (typeof savedGame.auraPoints !== "undefined") auraPoints = savedGame.auraPoints;
    if (typeof savedGame.auraPrestigeCount !== "undefined") auraPrestigeCount = savedGame.auraPrestigeCount;
    if (typeof savedGame.auraBaseMultiplier !== "undefined") auraBaseMultiplier = savedGame.auraBaseMultiplier;
    if (typeof savedGame.auraCostGrammi !== "undefined") auraCostGrammi = savedGame.auraCostGrammi;
    if (typeof savedGame.auraCostToken !== "undefined") auraCostToken = savedGame.auraCostToken;
    if (typeof savedGame.auraCostBtc !== "undefined") auraCostBtc = savedGame.auraCostBtc;
    if (typeof savedGame.auraShop !== "undefined") {
      try { Object.assign(auraShop, JSON.parse(savedGame.auraShop)); } catch(e) {}
    }
    if (typeof savedGame.auraShopCosts !== "undefined") {
      try { Object.assign(auraShopCosts, JSON.parse(savedGame.auraShopCosts)); } catch(e) {}
    }
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

// Click upgrade: +1 click power, costo scala x1.3 (morbido)
function buyClickUpgrade() {
  if (score >= clickUpgradeCost) {
    score -= clickUpgradeCost;
    clickPower += 1;
    clickUpgradeCost = Math.floor(clickUpgradeCost * 1.3);
    updateDisplay();
  }
}

// Erba: +0.2 BPS, costo scala x1.15 — primo producer come Cursor di CC
function buyAutoClicker() {
  if (score >= autoClickerCost) {
    score -= autoClickerCost;
    autoClickBPS += 0.2;
    autoClickerCost = Math.floor(autoClickerCost * 1.15);
    updateDisplay();
  }
}

// Dry: +1 BPS, costo scala x1.15
function Buydry() {
  if (score >= dryCost) {
    score -= dryCost;
    autoClickBPS += 1;
    dryCost = Math.floor(dryCost * 1.15);
    updateDisplay();
  }
}

// Frozen: +4 BPS, costo scala x1.15
function BuyfrozenCost() {
  if (score >= frozenCost) {
    score -= frozenCost;
    autoClickBPS += 4;
    frozenCost = Math.floor(frozenCost * 1.15);
    updateDisplay();
  }
}

// THC (Spacciatore): +10 BPS, costo scala x1.12
function buySpacciatore() {
  if (score >= spacciatoreCurrentCost) {
    score -= spacciatoreCurrentCost;
    spacciatoreCount++;
    autoClickBPS += 10;
    spacciatoreCurrentCost = Math.floor(spacciatoreBaseCost * Math.pow(1.12, spacciatoreCount));
    updateDisplay();
  }
}

// Hashish (Piantagione): +40 BPS, costo scala x1.12
function buyPiantagione() {
  if (score >= piantagioneCurrentCost) {
    score -= piantagioneCurrentCost;
    piantagioneCount++;
    autoClickBPS += 40;
    piantagioneCurrentCost = Math.floor(piantagioneBaseCost * Math.pow(1.12, piantagioneCount));
    updateDisplay();
  }
}

// GHB (Laboratorio): +200 BPS, costo scala x1.12
function buyLaboratorio() {
  if (score >= laboratorioCurrentCost) {
    score -= laboratorioCurrentCost;
    laboratorioCount++;
    autoClickBPS += 200;
    laboratorioCurrentCost = Math.floor(laboratorioBaseCost * Math.pow(1.12, laboratorioCount));
    updateDisplay();
  }
}

// Cartello: +1200 BPS, costo scala x1.12
function buyCartel() {
  if (score >= cartelCurrentCost) {
    score -= cartelCurrentCost;
    cartelCount++;
    autoClickBPS += 1200;
    cartelCurrentCost = Math.floor(cartelBaseCost * Math.pow(1.12, cartelCount));
    updateDisplay();
  }
}

// Narcosub (DMT): +8000 BPS, costo scala x1.12
function buyNarcosub() {
  if (score >= narcosubCurrentCost) {
    score -= narcosubCurrentCost;
    narcosubCount++;
    autoClickBPS += 8000;
    narcosubCurrentCost = Math.floor(narcosubBaseCost * Math.pow(1.12, narcosubCount));
    updateDisplay();
  }
}

// Chimica (Fentanyl): +60000 BPS, costo scala x1.12
function buyChimica() {
  if (score >= chimicaCurrentCost) {
    score -= chimicaCurrentCost;
    chimicaCount++;
    autoClickBPS += 60000;
    chimicaCurrentCost = Math.floor(chimicaBaseCost * Math.pow(1.12, chimicaCount));
    updateDisplay();
  }
}

function buyUpgrade(id, cost) {
  if (score >= cost) {
    if (id === 1  && !hasUpgrade1)  { score -= cost; hasUpgrade1  = true; }
    if (id === 2  && !hasUpgrade2)  { score -= cost; hasUpgrade2  = true; }
    if (id === 3  && !hasUpgrade3)  { score -= cost; hasUpgrade3  = true; }
    if (id === 4  && !hasUpgrade4)  { score -= cost; hasUpgrade4  = true; }
    if (id === 5  && !hasUpgrade5)  { score -= cost; hasUpgrade5  = true; }
    if (id === 6  && !hasUpgrade6)  { score -= cost; hasUpgrade6  = true; }
    if (id === 7  && !hasUpgrade7)  { score -= cost; hasUpgrade7  = true; }
    if (id === 8  && !hasUpgrade8)  { score -= cost; hasUpgrade8  = true; }
    if (id === 9  && !hasUpgrade9)  { score -= cost; hasUpgrade9  = true; }
    if (id === 10 && !hasUpgrade10) { score -= cost; hasUpgrade10 = true; }
    updateDisplay();
    saveGame();
  }
}

function buyPermanentUpgrade(id, tokenCost) {
  if (epsteinTokens < tokenCost) return;

  if (id === 1 && !hasPermanent1) {
    epsteinTokens -= tokenCost; hasPermanent1 = true;
    permanentClickMultiplier *= 2; // x2 click (era x3, troppo forte)
  }
  if (id === 2 && !hasPermanent2) {
    epsteinTokens -= tokenCost; hasPermanent2 = true;
    permanentBpsMultiplier *= 2; // x2 bps
  }
  if (id === 3 && !hasPermanent3) {
    epsteinTokens -= tokenCost; hasPermanent3 = true;
    permanentPrestigeMultiplier *= 1.3; // x1.3 prestige (era x1.5)
  }
  if (id === 4 && !hasPermanent4) {
    epsteinTokens -= tokenCost; hasPermanent4 = true;
    permanentBpsMultiplier *= 2;
  }
  if (id === 5 && !hasPermanent5) {
    epsteinTokens -= tokenCost; hasPermanent5 = true;
    permanentClickMultiplier *= 3; // ex perm6
  }
  if (id === 6 && !hasPermanent6) {
    epsteinTokens -= tokenCost; hasPermanent6 = true;
    permanentBpsMultiplier *= 3; // ex perm7
  }
  if (id === 7 && !hasPermanent7) {
    epsteinTokens -= tokenCost; hasPermanent7 = true;
    permanentClickMultiplier *= 5; // ex perm9
  }
  if (id === 8 && !hasPermanent8) {
    epsteinTokens -= tokenCost; hasPermanent8 = true;
    permanentBpsMultiplier *= 5; // ex perm10
  }
  if (id === 9 && !hasPermanent9) {
    epsteinTokens -= tokenCost; hasPermanent9 = true;
    permanentBtcMultiplier *= 2; // ex perm11
  }
  if (id === 10 && !hasPermanent10) {
    epsteinTokens -= tokenCost; hasPermanent10 = true;
    permanentClickMultiplier *= 2; permanentBpsMultiplier *= 2; permanentBtcMultiplier *= 2; // ex perm12
  }

  updateDisplay();
  saveGame();
}

function doPrestige() {
  if (score >= prestigeThreshold) {
    prestigeMultiplier += 1;
    prestigeTokenMultiplier *= 2;  // raddoppia ad ogni prestige
    const tokensGained = Math.floor(prestigeTokenMultiplier * (1 + auraShop.prestigeBonus));
    epsteinTokens += tokensGained;
    prestigeThreshold = Math.floor(prestigeThreshold * 4);
    score = 0; clickPower = 1; autoClickBPS = 0;
    clickUpgradeCost = 15; autoClickerCost = 100; dryCost = 1200; frozenCost = 8000;

    hasUpgrade1 = false; hasUpgrade2 = false; hasUpgrade3 = false; hasUpgrade4 = false;
    hasUpgrade5 = false; hasUpgrade6 = false; hasUpgrade7 = false; hasUpgrade8 = false;
    hasUpgrade9 = false; hasUpgrade10 = false;
    spacciatoreCount = 0; spacciatoreCurrentCost = spacciatoreBaseCost;
    piantagioneCount = 0; piantagioneCurrentCost = piantagioneBaseCost;
    laboratorioCount = 0; laboratorioCurrentCost = laboratorioBaseCost;
    cartelCount = 0; cartelCurrentCost = cartelBaseCost;
    narcosubCount = 0; narcosubCurrentCost = narcosubBaseCost;
    chimicaCount = 0; chimicaCurrentCost = chimicaBaseCost;

    alert(`Prestigio x${prestigeMultiplier}! +${formatNum(tokensGained)} Token 🔷 (prossimo ×2)\nProssimo: ${formatNum(prestigeThreshold)} grammi`);
    updateDisplay(); saveGame(); switchPage('forno');
  }
}

function doAuraPrestige() {
  if (score < auraCostGrammi) { alert(`❌ Ti mancano i Grammi! Servono ${formatNum(auraCostGrammi)} grammi.`); return; }
  if (epsteinTokens < auraCostToken) { alert(`❌ Ti mancano gli Epstein Token! Servono ${formatNum(auraCostToken)} Token.`); return; }
  if (btcBalance < auraCostBtc) { alert(`❌ Ti mancano i Bitcoin! Servono ${auraCostBtc} BTC.`); return; }

  if (!confirm(`⚠️ AURA PRESTIGE ⚠️\n\nQuesta azione azzera TUTTO:\n• Grammi, click, BPS\n• Tutti gli upgrade (anche permanenti)\n• Token, BTC, Miner\n• Battle Pass\n• Moltiplicatore Prestigio\n\nIn cambio ricevi:\n• +10 Punti Aura\n• Moltiplicatore base x10 (permanente)\n\nI prossimi costi saranno:\n• Grammi: ${formatNum(auraCostGrammi * 50)}\n• Token: ${formatNum(Math.floor(auraCostToken * 1.2))}\n• BTC: ${(auraCostBtc * 1.2).toFixed(1)}\n\nSei sicuro?`)) return;

  // ── RESET COMPLETO ──
  score = 0; clickPower = 1; autoClickBPS = 0;
  clickUpgradeCost = 15; autoClickerCost = 100; dryCost = 1200; frozenCost = 8000;
  prestigeThreshold = 500000; prestigeMultiplier = 1;

  hasUpgrade1 = false; hasUpgrade2 = false; hasUpgrade3 = false; hasUpgrade4 = false;
  hasUpgrade5 = false; hasUpgrade6 = false; hasUpgrade7 = false; hasUpgrade8 = false;
  hasUpgrade9 = false; hasUpgrade10 = false;

  hasPermanent1 = false; hasPermanent2 = false; hasPermanent3 = false; hasPermanent4 = false;
  hasPermanent5 = false; hasPermanent6 = false; hasPermanent7 = false; hasPermanent8 = false;
  hasPermanent9 = false; hasPermanent10 = false; hasPermanent11 = false; hasPermanent12 = false;
  permanentClickMultiplier = 1; permanentBpsMultiplier = 1; permanentPrestigeMultiplier = 1;
  permanentTokensPerSecond = 1; permanentBtcMultiplier = 1;

  spacciatoreCount = 0; spacciatoreCurrentCost = spacciatoreBaseCost;
  piantagioneCount = 0; piantagioneCurrentCost = piantagioneBaseCost;
  laboratorioCount = 0; laboratorioCurrentCost = laboratorioBaseCost;
  cartelCount = 0; cartelCurrentCost = cartelBaseCost;
  narcosubCount = 0; narcosubCurrentCost = narcosubBaseCost;
  chimicaCount = 0; chimicaCurrentCost = chimicaBaseCost;
  prestigeTokenMultiplier = 1;

  epsteinTokens = 0; btcBalance = 0; btcMiners = 0; btcMinerCost = 1;

  // ── RESET BATTLE PASS ──
  battlePassLevel = 0;
  updateBattlePassDisplay();

  // ── SCALA I COSTI DEL PROSSIMO AURA PRESTIGE (x2 ogni volta) ──
  auraCostGrammi *= 50;
  auraCostToken   = Math.floor(auraCostToken * 1.2);
  auraCostBtc     = parseFloat((auraCostBtc * 1.2).toFixed(1));

  // ── RICOMPENSA AURA ──
  auraPrestigeCount++;
  const pointsGained = 10 + auraShop.prestigeBonus;
  auraPoints += pointsGained;
  auraBaseMultiplier *= 10;

  alert(`✨ AURA PRESTIGE COMPLETATO! ✨\n\nHai guadagnato ${pointsGained} Punti Aura!\nTotale: ${auraPoints} Punti Aura\nMoltiplicatore base: x${auraBaseMultiplier.toLocaleString()}\n\nProssimo Aura Prestige costerà:\n• ${formatNum(auraCostGrammi)} Grammi\n• ${formatNum(auraCostToken)} Token\n• ${auraCostBtc} BTC\n\nRicomincia da zero… ma 10 volte più forte!`);
  updateDisplay(); updateBtcDisplay(); updateAuraDisplay(); saveGame(); switchPage('forno');
}

// ── NEGOZIO AURA ──────────────────────────────────────────
function buyAuraUpgrade(key) {
  const cost = auraShopCosts[key];
  if (auraPoints < cost) return;
  auraPoints -= cost;

  switch(key) {
    case 'clickBoost':
      auraShop.clickBoost *= 2;
      auraShopCosts.clickBoost = Math.ceil(auraShopCosts.clickBoost * 2.5);
      break;
    case 'bpsBoost':
      auraShop.bpsBoost *= 2;
      auraShopCosts.bpsBoost = Math.ceil(auraShopCosts.bpsBoost * 2.5);
      break;
    case 'btcBoost':
      auraShop.btcBoost *= 2;
      auraShopCosts.btcBoost = Math.ceil(auraShopCosts.btcBoost * 2.5);
      break;
    case 'tokenInterval':
      auraShop.tokenInterval = Math.max(1, Math.floor(auraShop.tokenInterval * 0.6));
      auraShopCosts.tokenInterval = Math.ceil(auraShopCosts.tokenInterval * 2.5);
      break;
    case 'prestigeBonus':
      auraShop.prestigeBonus += 3;
      auraShopCosts.prestigeBonus = Math.ceil(auraShopCosts.prestigeBonus * 2);
      break;
    case 'startMult':
      auraShop.startMult *= 2;
      auraShopCosts.startMult = Math.ceil(auraShopCosts.startMult * 3);
      break;
  }

  updateDisplay();
  updateAuraDisplay();
  saveGame();
}

function updateAuraDisplay() {
  // Top bar
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  set('aura-points-display', auraPoints);
  set('aura-count-display',  auraPrestigeCount);
  set('aura-mult-display',   auraBaseMultiplier.toLocaleString());

  // Status page
  set('aura-pts-page',  auraPoints);
  set('aura-cnt-page',  auraPrestigeCount);
  set('aura-mlt-page',  'x' + auraBaseMultiplier.toLocaleString());

  // Costi prestige dinamici
  const cG = document.getElementById('aura-cost-grammi');
  if (cG) cG.textContent = formatNum(auraCostGrammi);
  const cT = document.getElementById('aura-cost-token');
  if (cT) cT.textContent = formatNum(auraCostToken);
  const cB = document.getElementById('aura-cost-btc');
  if (cB) cB.textContent = auraCostBtc;

  // Bottone prestige
  const btn = document.getElementById('btn-aura-prestige');
  if (btn) btn.disabled = !(score >= auraCostGrammi && epsteinTokens >= auraCostToken && btcBalance >= auraCostBtc);

  // Negozio Aura — aggiorna ogni bottone
  const shopDefs = [
    { key:'clickBoost',    icon:'⚡', label:'Click x2',              desc:`Attuale: x${auraShop.clickBoost}` },
    { key:'bpsBoost',      icon:'🌿', label:'BPS x2',               desc:`Attuale: x${auraShop.bpsBoost}` },
    { key:'btcBoost',      icon:'₿',  label:'BTC Mining x2',        desc:`Attuale: x${auraShop.btcBoost}` },
    { key:'tokenInterval', icon:'🔷', label:'Token più veloci',      desc:`Attuale: 1 ogni ${auraShop.tokenInterval}s` },
    { key:'prestigeBonus', icon:'✨', label:'+3 Token per Prestigio',desc:`Attuale: +${auraShop.prestigeBonus}/prestige` },
    { key:'startMult',     icon:'🚀', label:'Partenza Potenziata x2',desc:`Attuale: x${auraShop.startMult} al reset` },
  ];
  shopDefs.forEach(def => {
    const cost = auraShopCosts[def.key];
    const btnEl = document.getElementById(`aura-shop-${def.key}`);
    if (!btnEl) return;
    const canAfford = auraPoints >= cost;
    btnEl.disabled = !canAfford;
    btnEl.innerHTML = `${def.icon} ${def.label}<br><small style="font-weight:normal;opacity:0.8">${def.desc}</small><br><small style="color:#f9a825">Costo: ${cost} ✦</small>`;
  });
}

function createDeck() {
  const suits = ['♥', '♦', '♣', '♠'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
}

function getCardValue(card) {
  if (card.value === 'A') return 11;
  if (['J', 'Q', 'K'].includes(card.value)) return 10;
  return parseInt(card.value);
}

function calculateScore(cards) {
  let score = 0;
  let aces = 0;
  for (let card of cards) {
    score += getCardValue(card);
    if (card.value === 'A') aces++;
  }
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  return score;
}

function renderCards(cards, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  for (let card of cards) {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.textContent = card.value + card.suit;
    container.appendChild(cardEl);
  }
}

function startBlackjack() {
  const betAmount = parseInt(document.getElementById('bj-bet-amount').value);
  if (isNaN(betAmount) || betAmount < 1 || betAmount > epsteinTokens) {
    alert('Scommessa non valida!');
    return;
  }
  bjBet = betAmount;
  epsteinTokens -= bjBet;
  bjGameInProgress = true;
  bjPlayerCards = [];
  bjDealerCards = [];
  let deck = createDeck();
  bjPlayerCards.push(deck.pop());
  bjDealerCards.push(deck.pop());
  bjPlayerCards.push(deck.pop());
  bjDealerCards.push(deck.pop());
  renderCards(bjPlayerCards, 'player-cards');
  renderCards([bjDealerCards[0], { suit: '?', value: '?' }], 'dealer-cards');
  document.getElementById('player-score').textContent = calculateScore(bjPlayerCards);
  document.getElementById('dealer-score').textContent = '?';
  document.getElementById('btn-hit').disabled = false;
  document.getElementById('btn-stand').disabled = false;
  document.getElementById('btn-start-bj').disabled = true;
  document.getElementById('bj-result').textContent = '';
  updateDisplay();
}

function hit() {
  if (!bjGameInProgress) return;
  let deck = createDeck();
  bjPlayerCards.push(deck.pop());
  renderCards(bjPlayerCards, 'player-cards');
  const score = calculateScore(bjPlayerCards);
  document.getElementById('player-score').textContent = score;
  if (score > 21) {
    endGame('Hai perso! (Bust)');
  }
}

function stand() {
  if (!bjGameInProgress) return;
  let deck = createDeck();
  while (calculateScore(bjDealerCards) < 17) {
    bjDealerCards.push(deck.pop());
  }
  renderCards(bjDealerCards, 'dealer-cards');
  const playerScore = calculateScore(bjPlayerCards);
  const dealerScore = calculateScore(bjDealerCards);
  document.getElementById('dealer-score').textContent = dealerScore;
  if (dealerScore > 21) {
    endGame('Hai vinto! (Dealer bust)');
  } else if (playerScore > dealerScore) {
    endGame('Hai vinto!');
  } else if (playerScore < dealerScore) {
    endGame('Hai perso!');
  } else {
    endGame('Pareggio!');
  }
}

function endGame(message) {
  bjGameInProgress = false;
  document.getElementById('btn-hit').disabled = true;
  document.getElementById('btn-stand').disabled = true;
  document.getElementById('btn-start-bj').disabled = false;
  document.getElementById('bj-result').textContent = message;
  if (message.includes('Hai vinto!')) {
    epsteinTokens += bjBet * 2;
  } else if (message.includes('Pareggio!')) {
    epsteinTokens += bjBet;
  }
  // Lose: already subtracted
  updateDisplay();
}

// --- NOTAZIONE SCIENTIFICA ---
function formatNum(n) {
  if (n === undefined || n === null || isNaN(n)) return '0';
  n = Math.floor(n);
  if (n < 1_000_000) return n.toLocaleString('it-IT');
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
  const tier = Math.floor(Math.log10(Math.abs(n)) / 3);
  if (tier >= suffixes.length) {
    // vera notazione scientifica per numeri enormi
    const exp = Math.floor(Math.log10(Math.abs(n)));
    const mantissa = (n / Math.pow(10, exp)).toFixed(2);
    return `${mantissa}e${exp}`;
  }
  const scaled = n / Math.pow(10, tier * 3);
  return scaled.toFixed(2) + suffixes[tier];
}

function updateDisplay() {
  scoreDisplay.textContent = formatNum(score);

  effClickPowerDisplay.textContent = formatNum(getEffClick());
  effBpsDisplay.textContent = formatNum(getEffBps());

  // Calcola moltiplicatori globali COMPLETI (tutti i fattori)
  let clickMult = 1;
  if (hasUpgrade1) clickMult *= 2;
  if (hasUpgrade3) clickMult *= 3;
  if (hasUpgrade5) clickMult *= 4;
  if (hasUpgrade7) clickMult *= 5;
  clickMult *= prestigeMultiplier * permanentPrestigeMultiplier * permanentClickMultiplier * auraBaseMultiplier * auraShop.clickBoost;
  document.getElementById('global-click-mult').textContent = formatNum(Math.floor(clickMult));

  let bpsMult = 1;
  if (hasUpgrade2) bpsMult *= 2;
  if (hasUpgrade4) bpsMult *= 3;
  if (hasUpgrade6) bpsMult *= 4;
  if (hasUpgrade8) bpsMult *= 5;
  bpsMult *= prestigeMultiplier * permanentPrestigeMultiplier * permanentBpsMultiplier * auraBaseMultiplier * auraShop.bpsBoost;
  document.getElementById('global-bps-mult').textContent = formatNum(Math.floor(bpsMult));

  // Moltiplicatore permanente totale
  const permMult = permanentPrestigeMultiplier * permanentClickMultiplier * permanentBpsMultiplier * auraBaseMultiplier;
  const permEl = document.getElementById('perm-mult-display');
  if (permEl) permEl.textContent = formatNum(Math.floor(permMult));

  // Aura shop boost nella top bar
  const auraShopEl = document.getElementById('topbar-aura-shop');
  if (auraShopEl) auraShopEl.textContent = `Click x${auraShop.clickBoost} | BPS x${auraShop.bpsBoost} | BTC x${auraShop.btcBoost} | Token ogni ${auraShop.tokenInterval}s`;

  document.getElementById('click-cost').textContent = formatNum(clickUpgradeCost);
  document.getElementById('auto-cost').textContent = formatNum(autoClickerCost);
  document.getElementById('dry-cost').textContent = formatNum(dryCost);
  document.getElementById('frozen-cost').textContent = formatNum(frozenCost);
  document.getElementById('spacciatore-cost').textContent = formatNum(spacciatoreCurrentCost);
  document.getElementById('piantagione-cost').textContent = formatNum(piantagioneCurrentCost);
  document.getElementById('laboratorio-cost').textContent = formatNum(laboratorioCurrentCost);
  const cartelEl = document.getElementById('cartel-cost');
  if (cartelEl) cartelEl.textContent = formatNum(cartelCurrentCost);
  const narcosubEl = document.getElementById('narcosub-cost');
  if (narcosubEl) narcosubEl.textContent = formatNum(narcosubCurrentCost);
  const chimicaEl = document.getElementById('chimica-cost');
  if (chimicaEl) chimicaEl.textContent = formatNum(chimicaCurrentCost);
  prestigeDisplay.textContent = formatNum(prestigeMultiplier);
  document.getElementById('epstein-token-display').textContent = formatNum(epsteinTokens);
  document.getElementById('bj-tokens').textContent = formatNum(epsteinTokens);
  prestigeCostDisplay.textContent = formatNum(prestigeThreshold);

  // BTC topbar
  const btcTopbar = document.getElementById('btc-topbar-display');
  if (btcTopbar) btcTopbar.textContent = btcBalance.toFixed(3);

  document.getElementById('btn-click-upgrade').disabled = score < clickUpgradeCost || isSpinning;
  document.getElementById('btn-auto-click').disabled = score < autoClickerCost || isSpinning;
  document.getElementById('btn-dry').disabled = score < dryCost || isSpinning;
  document.getElementById('btn-frozen').disabled = score < frozenCost || isSpinning;
  document.getElementById('btn-spacciatore').disabled = score < spacciatoreCurrentCost || isSpinning;
  document.getElementById('btn-piantagione').disabled = score < piantagioneCurrentCost || isSpinning;
  document.getElementById('btn-laboratorio').disabled = score < laboratorioCurrentCost || isSpinning;
  const btnCartel = document.getElementById('btn-cartel');
  if (btnCartel) btnCartel.disabled = score < cartelCurrentCost || isSpinning;
  const btnNarcosub = document.getElementById('btn-narcosub');
  if (btnNarcosub) btnNarcosub.disabled = score < narcosubCurrentCost || isSpinning;
  const btnChimica = document.getElementById('btn-chimica');
  if (btnChimica) btnChimica.disabled = score < chimicaCurrentCost || isSpinning;
  document.getElementById('btn-prestige').disabled = score < prestigeThreshold || isSpinning;

  function setUpgBtnState(btn, hasBought, cost, title) {
    if (!btn) return;
    if (hasBought) {
      btn.textContent = `✅ ${title} (Acquistato)`;
      btn.classList.add('bought');
      btn.disabled = true;
    } else {
      btn.textContent = `${title} - ${formatNum(cost)}`;
      btn.classList.remove('bought');
      btn.disabled = score < cost || isSpinning;
    }
  }

  setUpgBtnState(btnUpg1,                                  hasUpgrade1,  10000000,   "🌿 Erba Premium (Click x2)");
  setUpgBtnState(btnUpg2,                                  hasUpgrade2,  50000000,   "❄️ Frozen Boost (BPS x2)");
  setUpgBtnState(btnUpg3,                                  hasUpgrade3,  250000000,  "💊 Pasticche (Click x3)");
  setUpgBtnState(btnUpg4,                                  hasUpgrade4,  500000000,  "🔥 Crack (BPS x3)");
  setUpgBtnState(document.getElementById('btn-upg5'),      hasUpgrade5,  2000000000, "🍄 Funghi (Click x4)");
  setUpgBtnState(document.getElementById('btn-upg6'),      hasUpgrade6,  5000000000, "💉 Eroina (BPS x4)");
  setUpgBtnState(document.getElementById('btn-upg7'),      hasUpgrade7,  20000000000,"🧪 Metanfetamina (Click x5)");
  setUpgBtnState(document.getElementById('btn-upg8'),      hasUpgrade8,  50000000000,"☠️ Fentanyl (BPS x5)");
  setUpgBtnState(document.getElementById('btn-upg9'),      hasUpgrade9,  200000000000,"🌀 DMT (Click x6)");
  setUpgBtnState(document.getElementById('btn-upg10'),     hasUpgrade10, 500000000000,"💀 Krokodil (BPS x6)");

  function setPermanentBtnState(btn, hasBought, cost, title) {
    if (hasBought) {
      btn.textContent = `✅ ${title} (Acquistato)`;
      btn.classList.add('bought');
      btn.disabled = true;
    } else {
      btn.textContent = `${title} - ${formatNum(cost)} Token`;
      btn.classList.remove('bought');
      btn.disabled = epsteinTokens < cost || isSpinning;
    }
  }

  setPermanentBtnState(document.getElementById('btn-perm1'), hasPermanent1, 3,   "🖱️ Click x2");
  setPermanentBtnState(document.getElementById('btn-perm2'), hasPermanent2, 3,   "🌿 BPS x2");
  setPermanentBtnState(document.getElementById('btn-perm3'), hasPermanent3, 5,   "✨ Prestigio x1.3");
  setPermanentBtnState(document.getElementById('btn-perm4'), hasPermanent4, 8,   "🌿 BPS x2 (II)");
  setPermanentBtnState(document.getElementById('btn-perm5'), hasPermanent5, 12,  "⚡ Click x3");
  setPermanentBtnState(document.getElementById('btn-perm6'), hasPermanent6, 15,  "🏭 BPS x3");
  setPermanentBtnState(document.getElementById('btn-perm7'), hasPermanent7, 25,  "🎯 Click x5");
  setPermanentBtnState(document.getElementById('btn-perm8'), hasPermanent8, 30,  "🔥 BPS x5");
  setPermanentBtnState(document.getElementById('btn-perm9'), hasPermanent9, 40,  "₿ BTC Miner x2");
  setPermanentBtnState(document.getElementById('btn-perm10'), hasPermanent10, 60, "🌌 Zanotti Sgravo Mode (Tutto x2)");

  updateAuraDisplay();
}

function upgradeBattlePass() {
  let cost = Math.ceil(5 * Math.pow(1.5, battlePassLevel));
  if (epsteinTokens >= cost && battlePassLevel < 30) {
    epsteinTokens -= cost;
    battlePassLevel++;
    // Apply reward
    if (battlePassLevel === 1) clickPower += 10;
    else if (battlePassLevel === 2) autoClickBPS += 5;
    else if (battlePassLevel === 3) permanentClickMultiplier *= 1.1;
    else if (battlePassLevel === 4) permanentBpsMultiplier *= 1.1;
    else if (battlePassLevel === 5) prestigeMultiplier *= 1.5;
    else if (battlePassLevel === 6) clickPower += 20;
    else if (battlePassLevel === 7) autoClickBPS += 10;
    else if (battlePassLevel === 8) permanentClickMultiplier *= 1.2;
    else if (battlePassLevel === 9) permanentBpsMultiplier *= 1.2;
    else if (battlePassLevel === 10) prestigeMultiplier *= 1.5;
    else if (battlePassLevel === 11) clickPower += 50;
    else if (battlePassLevel === 12) autoClickBPS += 25;
    else if (battlePassLevel === 13) permanentClickMultiplier *= 1.5;
    else if (battlePassLevel === 14) permanentBpsMultiplier *= 1.5;
    else if (battlePassLevel === 15) prestigeMultiplier *= 1.5;
    else if (battlePassLevel === 16) clickPower += 100;
    else if (battlePassLevel === 17) autoClickBPS += 50;
    else if (battlePassLevel === 18) permanentClickMultiplier *= 2.0;
    else if (battlePassLevel === 19) permanentBpsMultiplier *= 2.0;
    else if (battlePassLevel === 20) prestigeMultiplier *= 1.5;
    else if (battlePassLevel === 21) clickPower += 200;
    else if (battlePassLevel === 22) autoClickBPS += 100;
    else if (battlePassLevel === 23) permanentClickMultiplier *= 3.0;
    else if (battlePassLevel === 24) permanentBpsMultiplier *= 3.0;
    else if (battlePassLevel === 25) prestigeMultiplier *= 1.5;
    else if (battlePassLevel === 26) clickPower += 500;
    else if (battlePassLevel === 27) autoClickBPS += 250;
    else if (battlePassLevel === 28) permanentClickMultiplier *= 5.0;
    else if (battlePassLevel === 29) permanentBpsMultiplier *= 5.0;
    else if (battlePassLevel === 30) prestigeMultiplier *= 1.5;
    updateBattlePassDisplay();
    updateDisplay();
    saveGame();
  }
}

function updateBattlePassDisplay() {
  document.getElementById('bp-level').textContent = battlePassLevel;
  document.getElementById('bp-next-cost').textContent = battlePassLevel >= 30 ? 'Max' : Math.ceil(5 * Math.pow(1.5, battlePassLevel));
  let list = document.getElementById('bp-rewards-list');
  list.innerHTML = '';
  let rewards = [
    "Click Base +10",
    "BPS Base +5",
    "Moltiplicatore Click Permanente x1.1",
    "Moltiplicatore BPS Permanente x1.1",
    "Moltiplicatore Prestigio x1.5",
    "Click Base +20",
    "BPS Base +10",
    "Moltiplicatore Click Permanente x1.2",
    "Moltiplicatore BPS Permanente x1.2",
    "Moltiplicatore Prestigio x1.5",
    "Click Base +50",
    "BPS Base +25",
    "Moltiplicatore Click Permanente x1.5",
    "Moltiplicatore BPS Permanente x1.5",
    "Moltiplicatore Prestigio x1.5",
    "Click Base +100",
    "BPS Base +50",
    "Moltiplicatore Click Permanente x2.0",
    "Moltiplicatore BPS Permanente x2.0",
    "Moltiplicatore Prestigio x1.5",
    "Click Base +200",
    "BPS Base +100",
    "Moltiplicatore Click Permanente x3.0",
    "Moltiplicatore BPS Permanente x3.0",
    "Moltiplicatore Prestigio x1.5",
    "Click Base +500",
    "BPS Base +250",
    "Moltiplicatore Click Permanente x5.0",
    "Moltiplicatore BPS Permanente x5.0",
    "Moltiplicatore Prestigio x1.5"
  ];
  for (let i = 1; i <= battlePassLevel && i <= rewards.length; i++) {
    let li = document.createElement('li');
    li.textContent = `Livello ${i}: ${rewards[i-1]}`;
    list.appendChild(li);
  }
  let btn = document.getElementById('btn-upgrade-bp');
  if (battlePassLevel >= 30) {
    btn.disabled = true;
    btn.textContent = 'Max Livello Raggiunto';
  } else {
    btn.disabled = false;
    btn.textContent = 'Sblocca Livello';
  }
}

// --- BITCOIN ---
let btcBalance = 0;
let btcMiners = 0;
let btcMinerCost = 1; // in Epstein Tokens
let btcPriceMultiplier = 1.0; // current price multiplier (1x = base, can go -20x to 20x)
let btcPriceHistory = [1.0]; // last N price points for chart
const BTC_CHART_MAX_POINTS = 60;
let btcChartCtx = null;

function initBtcChart() {
  const canvas = document.getElementById('btc-chart');
  if (!canvas) return;
  btcChartCtx = canvas.getContext('2d');
}

function generateNextBtcPrice() {
  // Random walk: -2000% to +2000% means multiplier from -19 to +21
  // We clamp between 0.05 and 21 so price never goes fully negative
  const change = (Math.random() - 0.48) * 0.25; // slight upward bias
  btcPriceMultiplier = Math.max(0.05, Math.min(21, btcPriceMultiplier + change));
  btcPriceHistory.push(btcPriceMultiplier);
  if (btcPriceHistory.length > BTC_CHART_MAX_POINTS) {
    btcPriceHistory.shift();
  }
}

function drawBtcChart() {
  if (!btcChartCtx) return;
  const canvas = document.getElementById('btc-chart');
  const w = canvas.width;
  const h = canvas.height;
  const ctx = btcChartCtx;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, w, h);

  const prices = btcPriceHistory;
  if (prices.length < 2) return;

  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const range = Math.max(maxP - minP, 0.5);

  // Grid lines
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = (h - 20) * (i / 4) + 10;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Price line with gradient color based on value
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  prices.forEach((p, i) => {
    const x = (i / (BTC_CHART_MAX_POINTS - 1)) * w;
    const y = h - 10 - ((p - minP) / range) * (h - 20);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  // Color: green if price rising, red if falling
  const last = prices[prices.length - 1];
  const prev = prices[prices.length - 2] || last;
  ctx.strokeStyle = last >= prev ? '#2ecc71' : '#e74c3c';
  ctx.stroke();

  // Current price label
  const curY = h - 10 - ((last - minP) / range) * (h - 20);
  ctx.fillStyle = last >= prev ? '#2ecc71' : '#e74c3c';
  ctx.font = 'bold 12px monospace';
  ctx.fillText(last.toFixed(2) + 'x', w - 52, Math.max(18, Math.min(h - 5, curY - 5)));

  // Dot at current price
  ctx.beginPath();
  ctx.arc(w - 3, curY, 4, 0, Math.PI * 2);
  ctx.fillStyle = last >= prev ? '#2ecc71' : '#e74c3c';
  ctx.fill();
}

function buyBitcoinMiner() {
  if (epsteinTokens < btcMinerCost) return;
  epsteinTokens -= btcMinerCost;
  btcMiners++;
  btcMinerCost = Math.ceil(btcMinerCost * 2);
  updateDisplay();
  updateBtcDisplay();
  saveGame();
}

function sellBitcoin() {
  if (btcBalance <= 0) return;
  const tokens = Math.floor(btcBalance * 10 * btcPriceMultiplier);
  epsteinTokens += tokens;
  btcBalance = 0;
  updateDisplay();
  updateBtcDisplay();
  saveGame();
}

function updateBtcDisplay() {
  const el = id => document.getElementById(id);
  if (!el('btc-balance')) return;
  el('btc-balance').textContent = btcBalance.toFixed(3);
  el('btc-miners').textContent = btcMiners;
  el('btc-rate').textContent = (btcMiners * 0.001 * permanentBtcMultiplier).toFixed(3);
  el('btc-price-display').textContent = btcPriceMultiplier.toFixed(2);
  const last = btcPriceHistory[btcPriceHistory.length - 1];
  const prev = btcPriceHistory[btcPriceHistory.length - 2] || last;
  el('btc-price-arrow').textContent = last > prev ? '📈' : last < prev ? '📉' : '➡️';
  const sellValue = Math.floor(btcBalance * 10 * btcPriceMultiplier);
  el('btc-value-display').textContent = formatNum(sellValue);
  el('btc-sell-preview').textContent = formatNum(sellValue);
  el('btc-miner-cost').textContent = formatNum(btcMinerCost);
  const buyBtn = el('btn-buy-miner');
  if (buyBtn) buyBtn.disabled = epsteinTokens < btcMinerCost;
  const sellBtn = el('btn-sell-btc');
  if (sellBtn) sellBtn.disabled = btcBalance <= 0;
  drawBtcChart();
}

// --- INIZIALIZZAZIONE
loadGame();
updateDisplay();
updateBattlePassDisplay();
initBtcChart();
updateBtcDisplay();
updateAuraDisplay();

setInterval(function() {
  if (autoClickBPS > 0) {
    score += getEffBps();
    updateDisplay();
  }
}, 1000);

setInterval(function() { saveGame(); }, 5000);

// Bitcoin: mine every second
setInterval(function() {
  if (btcMiners > 0) {
    btcBalance += btcMiners * 0.001 * permanentBtcMultiplier * auraShop.btcBoost;
  }
  updateBtcDisplay();
}, 1000);

// Bitcoin: price update every 2 seconds
setInterval(function() {
  generateNextBtcPrice();
  updateBtcDisplay();
}, 2000);

// ===================== AVIATOR =====================
(function() {
  // State
  let avBet = 0.01;
  let avPhase = 'waiting'; // 'waiting' | 'flying' | 'crashed'
  let avMult = 1.0;
  let avCrashAt = 1.0;
  let avHasBet = false;
  let avCashedOut = false;
  let avCashedMult = 0;
  let avTotalWon = 0;
  let avTotalLost = 0;
  let avHistory = [];
  let avFlyInterval = null;
  let avCdInterval = null;
  let avTrail = [];
  let avProgress = 0;
  let avAnimFrame = null;
  let avCanvas = null, avCtx = null;
  let avStars = [];
  let avInitialized = false;

  function avInit() {
    if (avInitialized) return;
    avCanvas = document.getElementById('av-sky');
    if (!avCanvas) return;
    avInitialized = true;
    avCtx = avCanvas.getContext('2d');
    avResizeCanvas();
    avInitStars();
    avDrawLoop();
    avStartCountdown();
  }

  function avResizeCanvas() {
    if (!avCanvas) return;
    const area = document.getElementById('av-game-area');
    if (!area) return;
    avCanvas.width  = area.clientWidth;
    avCanvas.height = area.clientHeight;
    avCanvas.style.width  = '100%';
    avCanvas.style.height = '100%';
  }

  function avInitStars() {
    avStars = [];
    const W = avCanvas.width || 380, H = avCanvas.height || 200;
    for (let i = 0; i < 60; i++) {
      avStars.push({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.1+0.3, a: Math.random()*0.6 });
    }
  }

  function avGenerateCrash() {
    const r = Math.random();
    if (r < 0.01) return 1.0 + Math.random() * 0.05;
    const e = 0.99 / (1 - r);
    return Math.max(1.01, parseFloat(e.toFixed(2)));
  }

  function avGetPlanePos(t) {
    const W = avCanvas.width || 380, H = avCanvas.height || 200;
    const m = 28;
    return {
      x: m + (W - m*2) * t,
      y: H - m - (H - m*2) * Math.pow(t, 0.68)
    };
  }

  function avDrawLoop() {
    const W = avCanvas.width || 380, H = avCanvas.height || 200;
    const ctx = avCtx;
    ctx.clearRect(0, 0, W, H);

    // Background
    const bg = ctx.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#04040c'); bg.addColorStop(1,'#0d0d1a');
    ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);

    // Stars
    avStars.forEach(s => {
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${s.a})`; ctx.fill();
    });

    // Grid
    ctx.strokeStyle='rgba(255,255,255,0.04)'; ctx.lineWidth=1;
    for(let i=1;i<4;i++){
      ctx.beginPath();ctx.moveTo(0,H*i/4);ctx.lineTo(W,H*i/4);ctx.stroke();
      ctx.beginPath();ctx.moveTo(W*i/4,0);ctx.lineTo(W*i/4,H);ctx.stroke();
    }

    if ((avPhase==='flying'||avPhase==='crashed') && avTrail.length > 1) {
      // Trail line
      ctx.beginPath();
      ctx.moveTo(avTrail[0].x, avTrail[0].y);
      for(let i=1;i<avTrail.length;i++) ctx.lineTo(avTrail[i].x,avTrail[i].y);
      const g = ctx.createLinearGradient(avTrail[0].x,avTrail[0].y,avTrail[avTrail.length-1].x,avTrail[avTrail.length-1].y);
      const col = avPhase==='crashed' ? '230,57,70' : '0,230,118';
      g.addColorStop(0,`rgba(${col},0)`); g.addColorStop(1,`rgba(${col},0.8)`);
      ctx.strokeStyle=g; ctx.lineWidth=2.5; ctx.stroke();

      // Fill under trail
      ctx.beginPath();
      ctx.moveTo(avTrail[0].x,avTrail[0].y);
      for(let i=1;i<avTrail.length;i++) ctx.lineTo(avTrail[i].x,avTrail[i].y);
      ctx.lineTo(avTrail[avTrail.length-1].x,H);
      ctx.lineTo(avTrail[0].x,H); ctx.closePath();
      const fg = ctx.createLinearGradient(0,0,0,H);
      fg.addColorStop(0,`rgba(${col},0.07)`); fg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=fg; ctx.fill();

      // Plane
      const pp = avTrail[avTrail.length-1];
      ctx.save(); ctx.translate(pp.x,pp.y);
      if(avPhase==='crashed') { ctx.font='26px serif'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('💥',0,0); }
      else { ctx.rotate(-0.2); ctx.font='24px serif'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('✈️',0,0); }
      ctx.restore();
    }

    avAnimFrame = requestAnimationFrame(avDrawLoop);
  }

  function avStartCountdown() {
    avPhase = 'waiting';
    avMult = 1.0;
    avTrail = [];
    avCashedOut = false;
    avProgress = 0;
    avCrashAt = avGenerateCrash();

    const overlay = document.getElementById('av-countdown');
    const num = document.getElementById('av-cdnum');
    if (overlay) overlay.style.display = 'flex';
    let cd = 3;
    if (num) num.textContent = cd;
    avSetBtn('waiting');
    avUpdateMult();

    clearInterval(avCdInterval);
    avCdInterval = setInterval(() => {
      cd--;
      if (cd <= 0) {
        clearInterval(avCdInterval);
        if (overlay) overlay.style.display = 'none';
        avStartFlight();
      } else {
        if (num) num.textContent = cd;
      }
    }, 1000);
  }

  function avStartFlight() {
    avPhase = 'flying';
    avMult = 1.0;
    avProgress = 0;
    avTrail = [];
    avSetBtn('flying');
    const st = document.getElementById('av-status');
    if(st) st.textContent = 'IN VOLO...';

    const autoVal = parseFloat(document.getElementById('av-auto')?.value);

    clearInterval(avFlyInterval);
    avFlyInterval = setInterval(() => {
      avProgress = Math.min(avProgress + 0.005, 1);
      avMult += avMult * 0.02 + 0.002;
      avMult = parseFloat(avMult.toFixed(2));

      const pos = avGetPlanePos(avProgress);
      avTrail.push(pos);
      if(avTrail.length > 90) avTrail.shift();

      avUpdateMult();

      if (!avCashedOut && avHasBet && !isNaN(autoVal) && autoVal >= 1.1 && avMult >= autoVal) {
        avDoCashout();
      }

      if (avMult >= avCrashAt) avDoCrash();
    }, 50);
  }

  function avDoCrash() {
    clearInterval(avFlyInterval);
    avPhase = 'crashed';
    avUpdateMult();
    avSetBtn('crashed');
    const st = document.getElementById('av-status');
    if(st) st.textContent = `CRASHED @ ${avCrashAt.toFixed(2)}x`;

    if (avHasBet && !avCashedOut) {
      avTotalLost += avBet;
      avShowToast(`-${avBet.toFixed(3)} ₿ 💀`, true);
    }
    avAddHistory(avCrashAt);
    avHasBet = false;
    avUpdateStats();
    setTimeout(avStartCountdown, 2500);
  }

  function avDoCashout() {
    if (!avHasBet || avCashedOut || avPhase !== 'flying') return;
    avCashedOut = true;
    avCashedMult = avMult;
    const winTotal = parseFloat((avBet * avMult).toFixed(4));
    btcBalance += winTotal;  // restituisce tutta la vincita (bet già sottratta al momento della scommessa)
    avTotalWon += winTotal;
    avShowToast(`+${(winTotal - avBet).toFixed(3)} ₿ @ ${avCashedMult.toFixed(2)}x 🤑`, false);
    document.getElementById('av-mult').classList.add('av-cashed');
    avUpdateStats();
    avSetBtn('cashed');
    updateBtcDisplay();
    updateDisplay();
  }

  function avPlaceBet() {
    if (avBet <= 0 || avBet > btcBalance) {
      avShowToast('BTC insufficienti!', true); return;
    }
    btcBalance -= avBet;
    avHasBet = true;
    avCashedOut = false;
    avUpdateStats();
    updateBtcDisplay();
    updateDisplay();
  }

  function avHandleBtn() {
    if (avPhase === 'flying' && avHasBet && !avCashedOut) {
      avDoCashout();
    } else if (avPhase === 'waiting' && !avHasBet) {
      avPlaceBet();
      avSetBtn('betplaced');
    }
  }
  window.avHandleBtn = avHandleBtn;

  function avSetBtn(state) {
    const btn = document.getElementById('av-btn-main');
    if (!btn) return;
    btn.className = '';
    btn.disabled = false;
    btn.style.cursor = 'pointer';
    btn.style.opacity = '1';
    switch(state) {
      case 'waiting':
        btn.textContent = 'SCOMMETTI';
        btn.style.background = '#00e676'; btn.style.color = '#000';
        break;
      case 'betplaced':
        btn.textContent = '⏳ SCOMMESSA PIAZZATA';
        btn.style.background = '#333'; btn.style.color = '#888';
        btn.disabled = true;
        break;
      case 'flying':
        if (avHasBet && !avCashedOut) {
          btn.textContent = `💰 INCASSA (${avMult.toFixed(2)}x)`;
          btn.style.background = '#f9a825'; btn.style.color = '#000';
          btn.classList.add('av-cashout');
        } else if (!avHasBet) {
          btn.textContent = 'SCOMMETTI';
          btn.style.background = '#00e676'; btn.style.color = '#000';
        } else {
          btn.textContent = `✅ INCASSATO @ ${avCashedMult.toFixed(2)}x`;
          btn.style.background = '#333'; btn.style.color = '#888';
          btn.disabled = true;
        }
        break;
      case 'cashed':
        btn.textContent = `✅ INCASSATO @ ${avCashedMult.toFixed(2)}x`;
        btn.style.background = '#333'; btn.style.color = '#888';
        btn.disabled = true;
        break;
      case 'crashed':
        btn.textContent = '💥 CRASHED';
        btn.style.background = '#e63946'; btn.style.color = '#fff';
        btn.disabled = true;
        break;
    }
  }

  function avUpdateMult() {
    const el = document.getElementById('av-mult');
    if (!el) return;
    el.classList.remove('av-crashed','av-cashed');
    if (avPhase === 'crashed') {
      el.textContent = `${avCrashAt.toFixed(2)}x`;
      el.style.color = '#e63946';
      el.style.textShadow = '0 0 24px rgba(230,57,70,0.8)';
    } else {
      el.textContent = `${avMult.toFixed(2)}x`;
      if (avCashedOut) {
        el.style.color = '#f9a825';
        el.style.textShadow = '0 0 24px rgba(249,168,37,0.8)';
      } else {
        el.style.color = '#00e676';
        el.style.textShadow = '0 0 24px rgba(0,230,118,0.7)';
      }
    }
    // Live update cashout button text
    if (avPhase === 'flying' && avHasBet && !avCashedOut) {
      const btn = document.getElementById('av-btn-main');
      if (btn && !btn.disabled) btn.textContent = `💰 INCASSA (${avMult.toFixed(2)}x)`;
    }
  }

  function avUpdateStats() {
    const b = document.getElementById('av-stat-btc');
    const w = document.getElementById('av-stat-won');
    const l = document.getElementById('av-stat-lost');
    if(b) b.textContent = Math.max(0, btcBalance).toFixed(3);
    if(w) w.textContent = avTotalWon.toFixed(3);
    if(l) l.textContent = avTotalLost.toFixed(3);
  }

  function avAddHistory(val) {
    avHistory.unshift(val);
    if (avHistory.length > 15) avHistory.pop();
    const bar = document.getElementById('av-history');
    if (!bar) return;
    bar.innerHTML = '';
    avHistory.forEach(v => {
      const c = document.createElement('div');
      const cls = v < 1.5 ? 'av-hist-low' : v < 3 ? 'av-hist-mid' : v < 10 ? 'av-hist-high' : 'av-hist-epic';
      c.className = cls;
      c.style.cssText = 'flex-shrink:0;padding:3px 9px;border-radius:20px;font-size:11px;font-family:monospace;font-weight:700;';
      c.textContent = v.toFixed(2) + 'x';
      bar.appendChild(c);
    });
  }

  let avToastTimer;
  function avShowToast(msg, isLoss) {
    const t = document.getElementById('av-toast');
    if (!t) return;
    t.textContent = msg;
    t.style.display = 'block';
    t.style.borderColor = isLoss ? '#e63946' : '#00e676';
    t.style.color = isLoss ? '#e63946' : '#00e676';
    clearTimeout(avToastTimer);
    avToastTimer = setTimeout(() => { t.style.display = 'none'; }, 2200);
  }

  function avUpdateBetSlider() {
    const slider = document.getElementById('av-slider');
    if (!slider) return;
    const pct = parseInt(slider.value);
    avBet = Math.max(0.001, parseFloat((btcBalance * pct / 100).toFixed(3)));
    const d = document.getElementById('av-bet-display');
    if(d) d.textContent = avBet.toFixed(3) + ' ₿';
  }
  window.avUpdateBetSlider = avUpdateBetSlider;

  function avQuickBet(f) {
    avBet = f === 1 ? parseFloat(btcBalance.toFixed(3)) : Math.max(0.001, parseFloat((btcBalance * f).toFixed(3)));
    const pct = btcBalance > 0 ? Math.round(avBet / btcBalance * 100) : 0;
    const slider = document.getElementById('av-slider');
    if(slider) slider.value = pct;
    const d = document.getElementById('av-bet-display');
    if(d) d.textContent = avBet.toFixed(3) + ' ₿';
  }
  window.avQuickBet = avQuickBet;

  function avSetBet(val) {
    avBet = val;
    const pct = btcBalance > 0 ? Math.round(avBet / btcBalance * 100) : 0;
    const slider = document.getElementById('av-slider');
    if(slider) slider.value = pct;
    const d = document.getElementById('av-bet-display');
    if(d) d.textContent = avBet.toFixed(3) + ' ₿';
  }
  window.avSetBet = avSetBet;

  // Hook into switchPage to init canvas when tab is opened
  const _origSwitch = window.switchPage;
  window.switchPage = function(pageName) {
    _origSwitch(pageName);
    if (pageName === 'aviator') {
      setTimeout(() => {
        avCanvas = document.getElementById('av-sky');
        if (!avCanvas) return;
        avCtx = avCanvas.getContext('2d');
        avResizeCanvas();
        avInitStars();
        if (!avInitialized) {
          avInitialized = true;
          avDrawLoop();
          avStartCountdown();
        }
        avUpdateStats();
      }, 80);
    }
  };

  // Expose init for nav
  window.avInit = avInit;
})();

// -- FIX: Mantenere costante la distanza della produzione dalla topbar --
function updateStickyTop() {
    const topBar = document.getElementById('top-bar');
    const leftPanel = document.querySelector('.left-panel');
    if (topBar && leftPanel) {
        // Applica l'altezza calcolata della topbar + una distanza fissa confortevole (30px)
        leftPanel.style.top = (topBar.offsetHeight + 30) + 'px';
    }
}
window.addEventListener('resize', updateStickyTop);
document.addEventListener('DOMContentLoaded', updateStickyTop);
setInterval(updateStickyTop, 1000); // Check continuo per eventuali cambi dimensione (es. navbar multiriga)
