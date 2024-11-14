//nasz deck używa 2 tali kart (łącznie 104 karty)
const deck = [
    { cardValue: "A", suit: "S" }, { cardValue: "A", suit: "H" }, { cardValue: "A", suit: "D" }, { cardValue: "A", suit: "C" },
    { cardValue: "A", suit: "S" }, { cardValue: "A", suit: "H" }, { cardValue: "A", suit: "D" }, { cardValue: "A", suit: "C" },

    { cardValue: 2, suit: "S" }, { cardValue: 2, suit: "H" }, { cardValue: 2, suit: "D" }, { cardValue: 2, suit: "C" },
    { cardValue: 2, suit: "S" }, { cardValue: 2, suit: "H" }, { cardValue: 2, suit: "D" }, { cardValue: 2, suit: "C" },

    { cardValue: 3, suit: "S" }, { cardValue: 3, suit: "H" }, { cardValue: 3, suit: "D" }, { cardValue: 3, suit: "C" },
    { cardValue: 3, suit: "S" }, { cardValue: 3, suit: "H" }, { cardValue: 3, suit: "D" }, { cardValue: 3, suit: "C" },

    { cardValue: 4, suit: "S" }, { cardValue: 4, suit: "H" }, { cardValue: 4, suit: "D" }, { cardValue: 4, suit: "C" },
    { cardValue: 4, suit: "S" }, { cardValue: 4, suit: "H" }, { cardValue: 4, suit: "D" }, { cardValue: 4, suit: "C" },

    { cardValue: 5, suit: "S" }, { cardValue: 5, suit: "H" }, { cardValue: 5, suit: "D" }, { cardValue: 5, suit: "C" },
    { cardValue: 5, suit: "S" }, { cardValue: 5, suit: "H" }, { cardValue: 5, suit: "D" }, { cardValue: 5, suit: "C" },

    { cardValue: 6, suit: "S" }, { cardValue: 6, suit: "H" }, { cardValue: 6, suit: "D" }, { cardValue: 6, suit: "C" },
    { cardValue: 6, suit: "S" }, { cardValue: 6, suit: "H" }, { cardValue: 6, suit: "D" }, { cardValue: 6, suit: "C" },

    { cardValue: 7, suit: "S" }, { cardValue: 7, suit: "H" }, { cardValue: 7, suit: "D" }, { cardValue: 7, suit: "C" },
    { cardValue: 7, suit: "S" }, { cardValue: 7, suit: "H" }, { cardValue: 7, suit: "D" }, { cardValue: 7, suit: "C" },

    { cardValue: 8, suit: "S" }, { cardValue: 8, suit: "H" }, { cardValue: 8, suit: "D" }, { cardValue: 8, suit: "C" },
    { cardValue: 8, suit: "S" }, { cardValue: 8, suit: "H" }, { cardValue: 8, suit: "D" }, { cardValue: 8, suit: "C" },

    { cardValue: 9, suit: "S" }, { cardValue: 9, suit: "H" }, { cardValue: 9, suit: "D" }, { cardValue: 9, suit: "C" },
    { cardValue: 9, suit: "S" }, { cardValue: 9, suit: "H" }, { cardValue: 9, suit: "D" }, { cardValue: 9, suit: "C" },

    { cardValue: 10, suit: "S" }, { cardValue: 10, suit: "H" }, { cardValue: 10, suit: "D" }, { cardValue: 10, suit: "C" },         //10
    { cardValue: 10, suit: "S" }, { cardValue: 10, suit: "H" }, { cardValue: 10, suit: "D" }, { cardValue: 10, suit: "C" },

    { cardValue: 10, suit: "S" }, { cardValue: 10, suit: "H" }, { cardValue: 10, suit: "D" }, { cardValue: 10, suit: "C" },         //J
    { cardValue: 10, suit: "S" }, { cardValue: 10, suit: "H" }, { cardValue: 10, suit: "D" }, { cardValue: 10, suit: "C" },

    { cardValue: 10, suit: "S" }, { cardValue: 10, suit: "H" }, { cardValue: 10, suit: "D" }, { cardValue: 10, suit: "C" },         //Q
    { cardValue: 10, suit: "S" }, { cardValue: 10, suit: "H" }, { cardValue: 10, suit: "D" }, { cardValue: 10, suit: "C" },

    { cardValue: 10, suit: "S" }, { cardValue: 10, suit: "H" }, { cardValue: 10, suit: "D" }, { cardValue: 10, suit: "C" },         //K
    { cardValue: 10, suit: "S" }, { cardValue: 10, suit: "H" }, { cardValue: 10, suit: "D" }, { cardValue: 10, suit: "C" }
];

const dealersHandDisplay = document.getElementById("dealersHand");
const playersHandDisplay = document.getElementById("playersHand");
const gameResultDisplay = document.getElementById("gameResult");
const dealersCardTotalDisplay = document.getElementById("dealersCardTotal");
const playersCardTotalDisplay = document.getElementById("playersCardTotal");

let playedCards = [];
let hiddenCard;
let playersHandsValue;            
let playersAceCount;
let dealersHandsValue;           
let dealersAceCount;

function draw(target) {

    let hasDrawn = false;

    while (!hasDrawn) {

        let drawnCard = Math.floor(Math.random() * 104);

        if (!playedCards.includes(drawnCard)) {

            let cardVisual = deck[drawnCard].cardValue + deck[drawnCard].suit + " ";
            playedCards.push(drawnCard);

            switch (target) {
                case "player":

                    playersHandDisplay.innerHTML += cardVisual;

                    if (deck[drawnCard].cardValue === "A") {
                        playersAceCount++
                    } else {
                        playersHandsValue += deck[drawnCard].cardValue;
                    }

                    playersHandsValue += playersAceCount * 11;
                    

                    while (playersHandsValue > 21 && playersAceCount > 0) {
                        playersHandsValue -= 10;
                        playersAceCount--;
                    }

                    playersCardTotalDisplay.innerHTML = playersHandsValue;

                    break;

                case "dealer":

                    dealersHandDisplay.innerHTML += cardVisual;

                    if (deck[drawnCard].cardValue === "A") {
                        dealersAceCount++
                    } else {
                        dealersHandsValue += deck[drawnCard].cardValue;
                    }

                    dealersHandsValue  += dealersAceCount * 11;

                    while (dealersHandsValue > 21 && dealersAceCount > 0) {
                        dealersHandsValue -= 10;
                        dealersAceCount--;
                    }

                    dealersCardTotalDisplay.innerHTML = dealersHandsValue;

                    break;

                case "hidden":

                    hiddenCard = drawnCard;
                    dealersHandDisplay.innerHTML += "??";

                    if (deck[drawnCard].cardValue === "A") {
                        dealersAceCount++
                    } else {
                        dealersHandsValue += deck[drawnCard].cardValue;
                    }

                    dealersHandsValue += dealersAceCount * 11;

                    while (dealersHandsValue > 21 && dealersAceCount > 0) {
                        dealersHandsValue -= 10;
                        dealersAceCount--;
                    }
                    
                    break;
            }
            hasDrawn = true;
        }
    }
}

function start() {

    gameResultDisplay.innerHTML = "";
    playedCards = [];
    playersHandsValue = 0;
    playersAceCount = 0;
    playersHandDisplay.innerHTML = "";
    dealersHandsValue = 0;
    dealersAceCount = 0;
    dealersHandDisplay.innerHTML = "";
    draw("player");
    draw("dealer");
    draw("player");
    draw("hidden");

}

function hit() {
    
    if (playersHandsValue > 21) {
        return;
    } 
    draw("player");
    if (playersHandsValue == 21) {
        stand();
    }
    if (playersHandsValue > 21) {
        gameResultDisplay.innerHTML = "You Lost!";
    } 

}

function stand() {
    let hiddenCardVisual = deck[hiddenCard].cardValue + deck[hiddenCard].suit + " ";
    dealersHandDisplay.innerHTML = dealersHandDisplay.innerHTML.replace("??", hiddenCardVisual);
    dealersHandsValue += deck[hiddenCard].cardValue;

    while (dealersHandsValue < 17) {
        draw("dealer");
    }

    if (dealersHandsValue > 21) {
        gameResultDisplay.innerHTML = "You Won!";
    } else if (dealersHandsValue > playersHandsValue) {
        gameResultDisplay.innerHTML = "You Lost!";
    } else if (dealersHandsValue < playersHandsValue) {
        gameResultDisplay.innerHTML = "You Win!";
    } else {
        gameResultDisplay.innerHTML = "It's a Tie!";
    }
}
