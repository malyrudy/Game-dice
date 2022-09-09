// Common variables
let totalScore, roundScore, activePlayer, dice, playGame;

newStart();

// Nová hra
function newStart() {
    totalScore = [0,0];
    roundScore = 0;
    activePlayer = 0;
    playGame = true;

    // Reseting and deleting the dice
    document.getElementById("totalScorePlayer-0").textContent = 0;
    document.getElementById("totalScorePlayer-1").textContent = 0;
    document.getElementById("currentScore-0").textContent = 0;
    document.getElementById("currentScore-1").textContent = 0;
    // Skrytí kostky
    document.querySelector(".diceImage").style.display = "none";

    document.querySelector("#name-0").textContent = "1st Player Score"
    document.querySelector("#name-1").textContent = "2nd Player Score"

    // Getting back highlighting acitve player to 1st one and deleting the 2nd one
    document.querySelector(".totalScore0").classList.add("active");
    document.querySelector(".totalScore1").classList.remove("active");
}

document.querySelector(".rollDice").addEventListener("click", function() {
    if(playGame) {
        // 1. Generate random number between 1 & 6
        dice = Math.ceil(Math.random()*6);

        // 2. Show the right image
        let diceElement = document.querySelector(".diceImage");
        diceElement.src = "img/" + dice + ".jpg";
        diceElement.style.display = "block";

        // Nasčítáme čísla z kostky
        if(dice !== 1) {
            roundScore += dice;
            document.getElementById("currentScore-" + activePlayer).textContent = roundScore;
        } else {
            // Another player is playing
            nextPlayer();
        }
    }
});

function nextPlayer() {
    if(activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }

    roundScore = 0;

    document.getElementById("currentScore-0").textContent = 0;
    document.getElementById("currentScore-1").textContent = 0;

    document.querySelector(".diceImage").style.display = "none";

    document.querySelector(".totalScore0").classList.toggle("active");
    document.querySelector(".totalScore1").classList.toggle("active");

}

// Hold Score function
document.querySelector(".holdScore").addEventListener("click", function() {
    if(playGame) {
        // Total score is being filled by Round Score
        totalScore[activePlayer] += roundScore;

        //
        document.querySelector("#totalScorePlayer-" + activePlayer).textContent = totalScore[activePlayer];

        if(totalScore[activePlayer] >= 100) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner! Winner!"
            document.querySelector(".diceImage").style.display = "none";
            playGame = false;
        } else {
            nextPlayer();
        }
    }
});

// New Game button
document.querySelector(".newGame").addEventListener("click", newStart);

