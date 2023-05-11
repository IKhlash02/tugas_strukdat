var choices = ["gunting", "batu", "kertas"];
var player1Score = 0;
var player2Score = 0;
var round = 0;

var roundText = document.getElementById("round");
var player1Text = document.getElementById("player1");
var player2Text = document.getElementById("player2");
var resultText = document.getElementById("result");

var guntingButton = document.getElementById("gunting");
var batuButton = document.getElementById("batu");
var kertasButton = document.getElementById("kertas");
var resetButton = document.getElementById("reset");

guntingButton.addEventListener("click", function() {
    playRound("gunting");
});

batuButton.addEventListener("click", function() {
    playRound("batu");
});

kertasButton.addEventListener("click", function() {
    playRound("kertas");
});

resetButton.addEventListener("click", function() {
    resetGame();
});

function playRound(player1Choice) {
    round++;
    var player2Choice = choices[Math.floor(Math.random() * choices.length)];
    var winner = findWinner(player1Choice, player2Choice, choices);

    roundText.textContent = "Putaran ke-" + round;
    player1Text.textContent = "Pemain 1: " + player1Choice;
    player2Text.textContent = "Pemain 2: " + player2Choice;

    if (winner == 1) {
        player1Score++;
        resultText.textContent = "Pemain 1 menang!";
    } else if (winner == 2) {
        player2Score++;
        resultText.textContent = "Pemain 2 menang!";
    } else {
        resultText.textContent = "Seri!";
    }

    if (round == 3) {
        endGame();
    }
}

function findWinner(choice1, choice2, choices) {
    var index1 = choices.indexOf(choice1);
    var index2 = choices.indexOf(choice2);

    if (index1 == index2) {
        return 0;
    } else if ((index1 == 0 && index2 == 1) || (index1 == 1 && index2 == 2) || (index1 == 2 && index2 == 0)) {
        return 2;
    } else {
        return 1;
    }
}

function endGame() {
    if (player1Score > player2Score) {
        resultText.textContent = "Pemain 1 menang dengan skor " + player1Score + " - " + player2Score;
    } else if (player2Score > player1Score) {
        resultText.textContent = "Pemain 2 menang dengan skor " + player2Score + " - " + player1Score;
    } else {
        resultText.textContent = "Permainan berakhir seri dengan skor " + player1Score + " - " + player2Score;
    }

    // Menonaktifkan tombol gunting, batu, dan kertas
    guntingButton.disabled = true;
    batuButton.disabled = true;
    kertasButton.disabled = true;
}

function resetGame() {
    player1Score = 0;
    player2Score = 0;
    round = 0;
    roundText.textContent = "Putaran ke-0";
    player1Text.textContent = "Pemain 1: ";
    player2Text.textContent = "Pemain 2: ";
    resultText.textContent = "Hasil";
}
