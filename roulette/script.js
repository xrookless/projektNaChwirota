(function(loader) {
    document.addEventListener("DOMContentLoaded", loader[0], false);
})([function () {
    "use strict";

    function rand (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    var wrap;
    var pallete = [
        "r18", "b8", "r19", "g2", "r20", "r21", "b9", "r10",
        "g3", "r11", "b4", "r12", "b5", "r13", "b6",
        "r14", "g0", "r15", "b7", "r16", "g1", "r17"
    ];

    var bets = {
        "green": [2, 3, 0, 1],
        "red": [18, 19, 20, 21, 10, 11, 12, 13, 14, 15, 16, 17],
        "black": [8, 9, 4, 5, 6, 7]
    };

    var width = 80;
    wrap = document.querySelector('.roulette-container .wrap');

    // Funkcja do kręcenia ruletką
    function spin_promise(color, number) {
        return new Promise((resolve) => {
            if (
                (color === "green" || color === "g") && (number >= 0 && number <= 3) ||
                (color === "black" || color === "b") && (number >= 4 && number <= 9) ||
                (color === "red" || color === "r") && (number >= 10 && number <= 21)
            ) {
                let index, pixels, circles, pixelsStart;

                color = color[0];
                index = pallete.indexOf(color + "" + number);
                pixels = width * (index + 1);
                circles = 1760 * 2; //15 circles
                pixels -= 80;
                pixels = rand(pixels + 2, pixels + 79);
                pixelsStart = pixels;
                pixels += circles;
                pixels *= -1;

                
                wrap.style.backgroundPosition = ((pixels + (wrap.offsetWidth / 2)) + "") + "px";

                setTimeout(() => {
                    wrap.style.transition = "none";
                    let pos = (((pixels * -1) - circles) * -1) + (wrap.offsetWidth / 2);
                    wrap.style.backgroundPosition = String(pos) + "px";
                    setTimeout(() => {
                        wrap.style.transition = "background-position 5s";
                        resolve();
                    }, 510);

                }, 5000 + 700);
            }
        });
    }

    // Funkcja losująca kolor i numer
    function play(betType, betValue, betAmount) {
        let color;
        let r = rand(1, 1000);
        if (1 <= r && r < 30) color = "green";
        else if (30 <= r && r < 530) color = "red";
        else if (530 <= r && r < 1000) color = "black";

        let bet = bets[color][rand(0, bets[color].length)];

        // Kręcenie ruletką
        spin_promise(color, bet).then(() => {
            let win = false;

            // Sprawdzanie wyniku zakładu
            if (betType === "number" && betValue == bet) {
                win = true;
            } else if (betType === "color" && betValue === color) {
                win = true;
            } else if (betType === "parity") {
                if(betValue === "odd" && bet % 2 !== 0) win = true;
                if(betValue === "even" && bet % 2 === 0) win = true;


                win = true;
            } else if (betType === "range") {
                if (betValue === "1 to 7" && bet >= 1 && bet <= 7) win = true;
                if (betValue === "8 to 14" && bet >= 8 && bet <= 14) win = true;
                if (betValue === "14 to 21" && bet >= 14 && bet <= 21) win = true;
            }

            if (win) {
                alert(`Wygrałeś! Twoja wygrana to: ${betAmount * 2}`);
            } else {
                alert(`Przegrałeś!`);
            }
        });
    }

    //pobieranie danych z zakładu
    document.getElementById('placeBet').addEventListener('click', function() {
        var betType = document.getElementById('betType').value;
        var betValue = document.getElementById('betValue').value.trim();
        var betAmount = totalchip;

        if (isNaN(betAmount) || betAmount <= 0) {
            alert("Podaj prawidłową kwotę zakładu.");
            return;
        }

        // Sprawdzanie typu zakładu
        var isValidBet = false;
        var betResult = "";

        switch (betType) {
            case "number":
                isValidBet = bets["red"].includes(parseInt(betValue)) || bets["black"].includes(parseInt(betValue)) || bets["green"].includes(parseInt(betValue));
                betResult = `Zakład na numer: ${betValue}`;
                break;
            case "color":
                isValidBet = ["red", "black", "green"].includes(betValue);
                betResult = `Zakład na kolor: ${betValue}`;
                break;
            case "parity":
                isValidBet = ["odd", "even"].includes(betValue);
                betResult = `Zakład na parzystość: ${betValue}`;
                break;
            case "range":
                isValidBet = ["1 to 7", "8 to 14", "14 to 21"].includes(betValue);
                betResult = `Zakład na zakres: ${betValue}`;
                break;
            default:
                alert("Nieprawidłowy typ zakładu.");
                return;
        }

        if (isValidBet) {
            alert(`Postawiłeś ${betAmount} na: ${betResult}`);
            play(betType, betValue, betAmount);
        } else {
            alert("Nieprawidłowy zakład.");
        }
    });

}]);
let totalchip = 0; 
function chipTotal(value) {
    totalchip += value;  
    
}

function table(grid){
    
  
    var chip = document.createElement("button");
    chip.className = "chip";
    chip.innerHTML = `${totalchip}`
    document.getElementById(grid).appendChild(chip);


}