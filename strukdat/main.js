let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("com-score");
const scoreBoard_div = document.querySelector(".scoreBoard");
const result_p = document.querySelector(".result > p");
const batu_div = document.getElementById("b");
const kertas_div = document.getElementById("k");
const gunting_div = document.getElementById("g");
const resetButton = document.getElementById("reset-button");

function getComputerChoices() {
    const choices = ['g', 'b', 'k'];
    const randomNumber = (Math.floor(Math.random() * 3));
    return choices[randomNumber];
}

let gameHistory = [];

function addToHistory(userChoice, computerChoice, result) {
    gameHistory.push({
        userChoice: userChoice,
        computerChoice: computerChoice,
        result: result
    });
}

const historyList = document.getElementById("history-list");

function displayGameHistory() {
  historyList.innerHTML = "";
  gameHistory.forEach((game) => {
    const li = document.createElement("li");
    li.innerHTML = `Kamu memilih ${convertKata(game.userChoice)}, Doi memilih ${convertKata(game.computerChoice)}, Hasil: ${game.result}`;
    historyList.appendChild(li);
  });
}


function convertKata(letter) {
    if (letter == "b") return "Batu"
    if (letter == "g") return "Gunting"
    if (letter == "k") return "Kertas"
}

function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = "Doi milih " + convertKata(computerChoice) + ". HORE KAMU MENANG!"
    addToHistory(userChoice, computerChoice, "win");
}

function lose(userChoice, computerChoice) {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = "Doi milih " + convertKata(computerChoice) + ". YAH KAMU KALAH :("
    addToHistory(userChoice, computerChoice, "lose");
}

function draw(userChoice, computerChoice) {
    result_p.innerHTML = "Doi milih " + convertKata(computerChoice) + ". SERI CUYYY!"
    addToHistory(userChoice, computerChoice, "draw");
}

function reset() {
    userScore = 0;
    computerScore = 0;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = "Mulai Permainan!";
}


function game(userChoice) {
    const computerChoice = getComputerChoices();
    switch (userChoice + computerChoice) {
        case "gb":
        case "bk":
        case "kg":
            lose(userChoice, computerChoice);
            break;
        case "bg":
        case "kb":
        case "gk":
            win(userChoice, computerChoice);
            break;
        case "gg":
        case "bb":
        case "kk":
            draw(userChoice, computerChoice);
            break;
    }
}


function main() {
    batu_div.addEventListener('click', function() {
        game("b");
    })
    kertas_div.addEventListener('click', function() {
        game("k");
    })
    gunting_div.addEventListener('click', function() {
        game("g");
    })
    resetButton.addEventListener('click', function() {
        reset();
    })
    
}

main();