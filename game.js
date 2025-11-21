let coins = 0;
let coinsPerSecond = 0;

let upgrades = {
    "coinRate": {
        cost: 10,
        increase: 1,
        name: "Increase Coins per Click"
    },
    "autoCoinGenerator": {
        cost: 50,
        increase: 1,
        name: "Auto Coin Generator (1 Coin/sec)"
    }
};

// DOM Elements
const coinDisplay = document.getElementById("coins");
const rateDisplay = document.getElementById("coins-per-second");
const collectButton = document.getElementById("collect-button");
const buyCoinRateUpgradeButton = document.getElementById("buy-coin-rate-upgrade");
const buyAutoCoinUpgradeButton = document.getElementById("buy-auto-coin-upgrade");

// Save the game progress
function saveProgress() {
    localStorage.setItem("coins", coins);
    localStorage.setItem("coinsPerSecond", coinsPerSecond);
    localStorage.setItem("upgrades", JSON.stringify(upgrades));
}

// Load saved progress
function loadProgress() {
    if (localStorage.getItem("coins")) {
        coins = parseInt(localStorage.getItem("coins"));
        coinsPerSecond = parseInt(localStorage.getItem("coinsPerSecond"));
        upgrades = JSON.parse(localStorage.getItem("upgrades"));
    }
}

// Update the UI
function updateDisplays() {
    coinDisplay.textContent = coins;
    rateDisplay.textContent = coinsPerSecond;
    buyCoinRateUpgradeButton.textContent = `Buy ${upgrades.coinRate.name} (${upgrades.coinRate.cost} Coins)`;
    buyAutoCoinUpgradeButton.textContent = `Buy ${upgrades.autoCoinGenerator.name} (${upgrades.autoCoinGenerator.cost} Coins)`;
}

// Manual coin collection
collectButton.addEventListener("click", () => {
    coins += 1;
    updateDisplays();
    saveProgress();
});

// Buy Coin Rate Upgrade
buyCoinRateUpgradeButton.addEventListener("click", () => {
    if (coins >= upgrades.coinRate.cost) {
        coins -= upgrades.coinRate.cost;
        coinsPerSecond += upgrades.coinRate.increase;
        upgrades.coinRate.cost *= 2;
        saveProgress();
        updateDisplays();
    }
});

// Buy Auto Coin Generator
buyAutoCoinUpgradeButton.addEventListener("click", () => {
    if (coins >= upgrades.autoCoinGenerator.cost) {
        coins -= upgrades.autoCoinGenerator.cost;
        coinsPerSecond += upgrades.autoCoinGenerator.increase;
        upgrades.autoCoinGenerator.cost *= 2;
        saveProgress();
        updateDisplays();
    }
});

// Automatic coin generation loop
function generateCoins() {
    coins += coinsPerSecond;
    updateDisplays();
    saveProgress();
}

loadProgress();
setInterval(generateCoins, 1000);
updateDisplays();
