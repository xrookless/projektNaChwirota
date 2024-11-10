//nasz deck używa 2 tali kart (łącznie 104 karty)
const deck = [
    {cardValue: "A", suit: "S"}, {cardValue: "A", suit: "H"}, {cardValue: "A", suit: "D"}, {cardValue: "A", suit: "C"},
    {cardValue: "A", suit: "S"}, {cardValue: "A", suit: "H"}, {cardValue: "A", suit: "D"}, {cardValue: "A", suit: "C"},

    {cardValue: 2, suit: "S"}, {cardValue: 2, suit: "H"}, {cardValue: 2, suit: "D"}, {cardValue: 2, suit: "C"},
    {cardValue: 2, suit: "S"}, {cardValue: 2, suit: "H"}, {cardValue: 2, suit: "D"}, {cardValue: 2, suit: "C"},

    {cardValue: 3, suit: "S"}, {cardValue: 3, suit: "H"}, {cardValue: 3, suit: "D"}, {cardValue: 3, suit: "C"},
    {cardValue: 3, suit: "S"}, {cardValue: 3, suit: "H"}, {cardValue: 3, suit: "D"}, {cardValue: 3, suit: "C"},

    {cardValue: 4, suit: "S"}, {cardValue: 4, suit: "H"}, {cardValue: 4, suit: "D"}, {cardValue: 4, suit: "C"},
    {cardValue: 4, suit: "S"}, {cardValue: 4, suit: "H"}, {cardValue: 4, suit: "D"}, {cardValue: 4, suit: "C"},

    {cardValue: 5, suit: "S"}, {cardValue: 5, suit: "H"}, {cardValue: 5, suit: "D"}, {cardValue: 5, suit: "C"},
    {cardValue: 5, suit: "S"}, {cardValue: 5, suit: "H"}, {cardValue: 5, suit: "D"}, {cardValue: 5, suit: "C"},

    {cardValue: 6, suit: "S"}, {cardValue: 6, suit: "H"}, {cardValue: 6, suit: "D"}, {cardValue: 6, suit: "C"},
    {cardValue: 6, suit: "S"}, {cardValue: 6, suit: "H"}, {cardValue: 6, suit: "D"}, {cardValue: 6, suit: "C"},

    {cardValue: 7, suit: "S"}, {cardValue: 7, suit: "H"}, {cardValue: 7, suit: "D"}, {cardValue: 7, suit: "C"},
    {cardValue: 7, suit: "S"}, {cardValue: 7, suit: "H"}, {cardValue: 7, suit: "D"}, {cardValue: 7, suit: "C"},

    {cardValue: 8, suit: "S"}, {cardValue: 8, suit: "H"}, {cardValue: 8, suit: "D"}, {cardValue: 8, suit: "C"},
    {cardValue: 8, suit: "S"}, {cardValue: 8, suit: "H"}, {cardValue: 8, suit: "D"}, {cardValue: 8, suit: "C"},

    {cardValue: 9, suit: "S"}, {cardValue: 9, suit: "H"}, {cardValue: 9, suit: "D"}, {cardValue: 9, suit: "C"},
    {cardValue: 9, suit: "S"}, {cardValue: 9, suit: "H"}, {cardValue: 9, suit: "D"}, {cardValue: 9, suit: "C"},

    {cardValue: 10, suit: "S"}, {cardValue: 10, suit: "H"}, {cardValue: 10, suit: "D"}, {cardValue: 10, suit: "C"},         //10
    {cardValue: 10, suit: "S"}, {cardValue: 10, suit: "H"}, {cardValue: 10, suit: "D"}, {cardValue: 10, suit: "C"},

    {cardValue: 10, suit: "S"}, {cardValue: 10, suit: "H"}, {cardValue: 10, suit: "D"}, {cardValue: 10, suit: "C"},         //J
    {cardValue: 10, suit: "S"}, {cardValue: 10, suit: "H"}, {cardValue: 10, suit: "D"}, {cardValue: 10, suit: "C"},

    {cardValue: 10, suit: "S"}, {cardValue: 10, suit: "H"}, {cardValue: 10, suit: "D"}, {cardValue: 10, suit: "C"},         //Q
    {cardValue: 10, suit: "S"}, {cardValue: 10, suit: "H"}, {cardValue: 10, suit: "D"}, {cardValue: 10, suit: "C"},

    {cardValue: 10, suit: "S"}, {cardValue: 10, suit: "H"}, {cardValue: 10, suit: "D"}, {cardValue: 10, suit: "C"},         //K
    {cardValue: 10, suit: "S"}, {cardValue: 10, suit: "H"}, {cardValue: 10, suit: "D"}, {cardValue: 10, suit: "C"}
];

const dealersHandDisplay = document.getElementById("dealersHand");
const playersHandDisplay = document.getElementById("playersHand");

let dealersHand = [];
let playersHand = [];
let playedCards = [];
let dealersTurn;
let hiddenCard;
let playersHandsValue;
let dealersHandsValue;

function draw(target) {

    let hasDrawn = false;

    while (!hasDrawn) {

        let drawnCard = Math.floor(Math.random() * 104);
        console.log(drawnCard);

        if (!playedCards.includes(drawnCard)) {

            let cardVisual = deck[drawnCard].cardValue + deck[drawnCard].suit + " ";
            playedCards.push(drawnCard);

            switch (target) {
                case "player": 
                    console.log(`player ${cardVisual}`)
                    playersHand.push(drawnCard);
                    playersHandDisplay.innerHTML += cardVisual;
                    playersHandsValue = playersHandsValue + deck[drawnCard].cardValue;
                    break;
                case "dealer":
                    console.log(`dealer ${cardVisual}`)
                    dealersHand.push(drawnCard);
                    dealersHandDisplay.innerHTML += cardVisual;
                    dealersHandsValue = dealersHandsValue + deck[drawnCard].cardValue;
                    break;
                case "hidden":
                    console.log(`hidden ${cardVisual}`)
                    dealersHand.push(drawnCard);
                    hiddenCard = drawnCard;
                    dealersHandDisplay.innerHTML += "??";
                    break;
            }
            hasDrawn = true;
        }
    }
}

function start() {

    playedCards = [];
    playersHand = [];
    playersHandsValue = 0;
    playersHandDisplay.innerHTML = "";
    dealersHand = [];
    dealersHandsValue = 0;
    dealersHandDisplay.innerHTML = "";
    dealersTurn = false;
    draw("player");
    draw("dealer");
    draw("player");
    draw("hidden");

}

function checkForBust(target) {
    switch (target) {
        case "player":
            if (playersHandsValue > 21) {
                alert("you lost")
            }
            break;
        case "dealer":
            if (dealersHandsValue > 21) {
                alert("you won")
            }
    }
}

function hit() {

    draw("player");
    checkForBust("player");

}

