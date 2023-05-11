let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("com-score");
const scoreBoard_div = document.querySelector(".scoreBoard");
const result_p = document.querySelector(".result > p");
const hands_div = Array.from(document.querySelectorAll(".hand"));
const resetButton = document.getElementById("reset-button");

const choices = ['g', 'b', 'k'];

function getComputerChoices() {
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function convertKata(letter) {
    if (letter === "b") return "Batu";
    if (letter === "g") return "Gunting";
    if (letter === "k") return "Kertas";
}

function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `Doi milih ${convertKata(computerChoice)}. HORE KAMU MENANG!`;
}

function lose(userChoice, computerChoice) {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `Doi milih ${convertKata(computerChoice)}. YAH KAMU KALAH :(`;
}

function draw(userChoice, computerChoice) {
    result_p.innerHTML = `Doi milih ${convertKata(computerChoice)}. SERI CUYYY!`;
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
    hands_div.forEach(hand => hand.addEventListener('click', function() {
        game(hand.id);
    }));
    resetButton.addEventListener('click', reset);
}

main();
