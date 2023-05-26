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
  switch (result) {
    case "win":
      win(userChoice, computerChoice);
      break;
    case "lose":
      lose(userChoice, computerChoice);
      break;
    case "draw":
      draw(userChoice, computerChoice);
      break;
  }
}

function traverseTree(node, userChoice, computerChoice) {
  if (node.children.length === 0) {
    return node.value;
  }

  const childNode = node.children.find((child) => child.value === userChoice);
  if (childNode) {
    return traverseTree(childNode, userChoice, computerChoice);
  }

  return null;
}
