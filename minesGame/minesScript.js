const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
const minesInput = document.getElementById("minesInput");
const betInput = document.getElementById("betInput");

let balance = 1000;
let mines = [];

function gameStart() {
    if (betInput.value > balance) {
        return;
    }

    while(mines.length < minesInput.value) {
        let mineId = Math.floor(Math.random() * 25) + 1;
        if (!mines.includes(mineId)) {
            mines.push(mineId);
            console.log(mineId);
        }
    }
}

function tileClick(tileId) {
    if (mines.includes(tileId)) {
        alert("you lost");
    } else {
        document.getElementById(tileId).innerHTML = "gem";
    }
}

function alterBalanceInput(action) {
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