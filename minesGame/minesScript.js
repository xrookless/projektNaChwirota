const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
const minesInput = document.getElementById("minesInput");
const betInput = document.getElementById("betInput");
const minesLabel = document.getElementById("minesLabel");
const betBtn = document.getElementById("betBtn");
const gameInfo = document.getElementById("gameInfo");
const randomTileBtn = document.getElementById("randomTileBtn");
const cashoutBtn = document.getElementById("cashoutBtn");

let hasBet = false;
let balance = 1000;
let mines = [];

function gameStart() {
    for (i = 0; i < tiles.length; i++) {
        document.getElementById(tiles[i]).innerHTML = "";
    }
    if (betInput.value > balance || betInput.value < 0.01) {
        return;
    } 

    hasBet = true;
    balance = balance - betInput.value;
    betInput.readOnly = true;
    changeStyle("game");

    while(mines.length < minesInput.value) {
        let mineId = Math.floor(Math.random() * 25) + 1;
        if (!mines.includes(mineId)) {
            mines.push(mineId);
            console.log(mineId);
        }
    }  
}

function tileClick(tileId) {
    if (!hasBet) {
        return;
    }
    if (mines.includes(tileId)) {
        document.getElementById(tileId).innerHTML= "<img src='mine.svg'>";
        hasBet = false;
        betInput.readOnly = false;
        changeStyle()
    } else {
        document.getElementById(tileId).innerHTML = "<img src='gem.svg'>";
    }
}

function alterBalanceInput(action) {
    if (hasBet) {
        return;
    }
    switch (action) {
        case "half": 
            betInput.value = betInput.value / 2;
            break;
        case "double":
            betInput.value = betInput.value * 2;
            break;
        case "allin":
            betInput.value = balance;
            break;
    }
}

function changeStyle(style) {
    switch (style) {
        case "initial": 
            minesInput.style.display = "initial";
            minesLabel.style.display = "initial";
            betBtn.style.display = "initial";
            gameInfo.style.display = "none";
            randomTileBtn.style.display = "none";
            cashoutBtn.style.display = "none";
            break;
        case "game":
            minesInput.style.display = "none";
            minesLabel.style.display = "none";
            betBtn.style.display = "none";
            gameInfo.style.display = "initial";
            randomTileBtn.style.display = "initial";
            cashoutBtn.style.display = "initial";
    }
}
changeStyle("initial");