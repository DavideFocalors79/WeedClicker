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
let hasPermanent1 = false; // Click multiplier
let hasPermanent2 = false; // BPS multiplier
let hasPermanent3 = false; // Prestige multiplier
let hasPermanent4 = false; // BPS multiplier
let hasPermanent5 = false; // Token per second
let permanentClickMultiplier = 1;
let permanentBpsMultiplier = 1;
let permanentPrestigeMultiplier = 1;

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
  const effectivePrestige = prestigeMultiplier * permanentPrestigeMultiplier;
  return clickPower * multiplier * effectivePrestige * permanentClickMultiplier;
}

function getEffBps() {
  let multiplier = 1;
  if (hasUpgrade2) multiplier *= 2;
  if (hasUpgrade4) multiplier *= 3;
  const effectivePrestige = prestigeMultiplier * permanentPrestigeMultiplier;
  return autoClickBPS * multiplier * effectivePrestige * permanentBpsMultiplier;
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
    hasPermanent1: hasPermanent1, hasPermanent2: hasPermanent2, hasPermanent3: hasPermanent3, hasPermanent4: hasPermanent4, hasPermanent5: hasPermanent5,
    permanentClickMultiplier: permanentClickMultiplier, permanentBpsMultiplier: permanentBpsMultiplier, permanentPrestigeMultiplier: permanentPrestigeMultiplier
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
    permanentClickMultiplier *= 3; // x3 click
  }
  if (id === 2 && !hasPermanent2) {
    epsteinTokens -= tokenCost;
    hasPermanent2 = true;
    permanentBpsMultiplier *= 3; // x3 bps
  }
  if (id === 3 && !hasPermanent3) {
    epsteinTokens -= tokenCost;
    hasPermanent3 = true;
    permanentPrestigeMultiplier *= 1.5; // x1.5 prestige
  }
  if (id === 4 && !hasPermanent4) {
    epsteinTokens -= tokenCost;
    hasPermanent4 = true;
    permanentBpsMultiplier *= 3; // x3 bps
  }
  if (id === 5 && !hasPermanent5) {
    epsteinTokens -= tokenCost;
    hasPermanent5 = true;
    // Token per second will be handled in setInterval
  }

  updateDisplay();
  saveGame();
}

function spinWheel() {
  // Se sta già girando o non hai soldi, blocca il click
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
  let targetAngle;
  let resultCallback;

  // La ruota è un cerchio di 360 gradi. Calcoliamo in quale grado fermarla.
  if (roll < 0.40) { 
      // 40% probabilità -> Settore Rosso (Tra 0° e 144°)
      targetAngle = Math.floor(Math.random() * 130) + 5; 
      resultCallback = () => alert("Sfortuna! La ruota si è fermata sul rosso. Hai perso tutto perche i caramba sono cattivi! 😭");
  } 
  else if (roll < 0.75) { 
      // 35% probabilità -> Settore Blu (Tra 144° e 270°)
      targetAngle = Math.floor(Math.random() * 110) + 150;
      let vincita = mysteryCost * 3;
      resultCallback = () => {
          score += vincita;
          alert("Vittoria! Hai triplicato la robba spesa! (" + vincita + ")");
      };
  } 
  else if (roll < 0.95) { 
      // 20% probabilità -> Settore Verde (Tra 270° e 342°)
      targetAngle = Math.floor(Math.random() * 60) + 275;
      resultCallback = () => {
          clickPower += 25;
          alert("Crazy! Base per click +25! 🧤");
      };
  } 
  else { 
      // 5% probabilità -> Settore Oro (Tra 342° e 360°)
      targetAngle = Math.floor(Math.random() * 10) + 345;
      resultCallback = () => {
          autoClickBPS += 150;
          alert("🎰 JACKPOT! Produzione Base +150 W/s! 🏭✨");
      };
  }

  // Calcolo della rotazione fisica: 
  // Facciamo fare alla ruota 5 giri completi (360 * 5) + i gradi necessari per fermarsi al target
  let spins = 5; 
  let extraRotation = 360 - targetAngle;
  let currentMod = wheelRotation % 360;
  
  wheelRotation += (360 * spins) + (extraRotation - currentMod);
  
  // Applica l'animazione CSS
  wheelEl.style.transform = `rotate(${wheelRotation}deg)`;

  // Aspetta 4 secondi (la durata dell'animazione) prima di dare il premio e sbloccare tutto
  setTimeout(() => {
      resultCallback(); // Da il premio calcolato prima
      mysteryCost = Math.floor(mysteryCost * 1.2); 
      isSpinning = false;
      updateDisplay();
      saveGame();
  }, 4000);
}

function doPrestige() {
  if (score >= prestigeThreshold) {
    prestigeMultiplier += 1;
    epsteinTokens += 2;
    prestigeThreshold = Math.floor(prestigeThreshold * 1.5);
    score = 0; clickPower = 1; autoClickBPS = 0;
    clickUpgradeCost = 10; autoClickerCost = 50; dryCost = 500; frozenCost = 1500; mysteryCost = 1000;

    hasUpgrade1 = false; hasUpgrade2 = false; hasUpgrade3 = false; hasUpgrade4 = false;

    alert("Hai fatto Prestigio! Ora il tuo moltiplicatore è x" + prestigeMultiplier + " e hai guadagnato 1 Epstein Token! 🔷");
    updateDisplay(); saveGame(); switchPage('forno');
  }
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

function updateDisplay() {
  scoreDisplay.textContent = Math.floor(score);

  effClickPowerDisplay.textContent = Math.floor(getEffClick());
  effBpsDisplay.textContent = Math.floor(getEffBps());

  // Calcola moltiplicatori globali
  let clickMult = 1;
  if (hasUpgrade1) clickMult *= 2;
  if (hasUpgrade3) clickMult *= 3;
  clickMult *= prestigeMultiplier * permanentPrestigeMultiplier * permanentClickMultiplier;
  document.getElementById('global-click-mult').textContent = clickMult.toFixed(2);

  let bpsMult = 1;
  if (hasUpgrade2) bpsMult *= 2;
  if (hasUpgrade4) bpsMult *= 3;
  bpsMult *= prestigeMultiplier * permanentPrestigeMultiplier * permanentBpsMultiplier;
  document.getElementById('global-bps-mult').textContent = bpsMult.toFixed(2);

  document.getElementById('click-cost').textContent = clickUpgradeCost;
  document.getElementById('auto-cost').textContent = autoClickerCost;
  document.getElementById('dry-cost').textContent = dryCost;
   document.getElementById('frozen-cost').textContent = frozenCost;
  mysteryCostDisplay.textContent = mysteryCost;
  prestigeDisplay.textContent = prestigeMultiplier;
  document.getElementById('epstein-token-display').textContent = epsteinTokens;
  document.getElementById('bj-tokens').textContent = epsteinTokens;
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

  setPermanentBtnState(document.getElementById('btn-perm1'), hasPermanent1, 5, "Click x3");
  setPermanentBtnState(document.getElementById('btn-perm2'), hasPermanent2, 10, "BPS x3");
  setPermanentBtnState(document.getElementById('btn-perm3'), hasPermanent3, 15, "Prestigio x1.5");
  setPermanentBtnState(document.getElementById('btn-perm4'), hasPermanent4, 25, "BPS x3");
  setPermanentBtnState(document.getElementById('btn-perm5'), hasPermanent5, 30, "Token/s");
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

// INIZIALIZZAZIONE
loadGame();
updateDisplay();
updateBattlePassDisplay();

setInterval(function() {
  if (autoClickBPS > 0) {
    score += getEffBps();
    updateDisplay();
  }
}, 1000);

setInterval(function() {
  if (hasPermanent5) {
    epsteinTokens += 1;
    updateDisplay();
  }
}, 1000);

setInterval(function() { saveGame(); }, 5000);
