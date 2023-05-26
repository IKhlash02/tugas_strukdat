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
const historyButton = document.getElementById("history-button");

class Node {
  constructor(value, children = []) {
    this.value = value;
    this.children = children;
  }
}

const tree = new Node(null, [
  new Node("g", [new Node("b", [new Node("lose", [], true)]), new Node("k", [new Node("win", [], true)])]),
  new Node("b", [new Node("g", [new Node("win", [], true)]), new Node("k", [new Node("lose", [], true)])]),
  new Node("k", [new Node("g", [new Node("lose", [], true)]), new Node("b", [new Node("win", [], true)])]),
]);

function getComputerChoices() {
  const choices = ["g", "b", "k"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function game(userChoice) {
  const computerChoice = getComputerChoices();

  const result = traverseTree(tree, userChoice, computerChoice);
  console.log(result);
  switch (result) {
    case "win":
      win(userChoice, computerChoice);
      break;
    case "lose":
      lose(userChoice, computerChoice);
      break;
    default:
      draw(userChoice, computerChoice);
      break;
  }
}

function traverseTree(node, userChoice, computerChoice) {
  if (node.children.length === 1) {
    return node.children[0].value;
  }

  var childNode;
  if (node.children.length === 3) {
    childNode = node.children.find((child) => child.value === userChoice);
  } else if (node.children.length === 2) {
    childNode = node.children.find((child) => child.value === computerChoice);
  }

  if (childNode) {
    return traverseTree(childNode, userChoice, computerChoice);
  }

  return null;
}

let gameHistory = [];

function addToHistory(userChoice, computerChoice, result) {
  gameHistory.push({
    userChoice: userChoice,
    computerChoice: computerChoice,
    result: result,
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
  if (letter == "b") return "Batu";
  if (letter == "g") return "Gunting";
  if (letter == "k") return "Kertas";
}

function win(userChoice, computerChoice) {
  userScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = "Doi milih " + convertKata(computerChoice) + ". HORE KAMU MENANG!";
  addToHistory(userChoice, computerChoice, "win");
}

function lose(userChoice, computerChoice) {
  computerScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = "Doi milih " + convertKata(computerChoice) + ". YAH KAMU KALAH :(";
  addToHistory(userChoice, computerChoice, "lose");
}

function draw(userChoice, computerChoice) {
  result_p.innerHTML = "Doi milih " + convertKata(computerChoice) + ". SERI CUYYY!";
  addToHistory(userChoice, computerChoice, "draw");
}

function reset() {
  userScore = 0;
  computerScore = 0;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = "Mulai Permainan!";
  historyList.innerHTML = "";
}

function main() {
  batu_div.addEventListener("click", function () {
    game("b");
    historyList.innerHTML = "";
  });
  kertas_div.addEventListener("click", function () {
    game("k");
    historyList.innerHTML = "";
  });
  gunting_div.addEventListener("click", function () {
    game("g");

    historyList.innerHTML = "";
  });
  resetButton.addEventListener("click", function () {
    reset();
  });
  historyButton.addEventListener("click", function () {
    displayGameHistory();
  });
}

main();
