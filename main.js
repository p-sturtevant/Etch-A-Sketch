import "./style.css";

let grid = document.querySelector(".grid");
let gridSize = 16;
let squareSize = 0;
let defaultColor = "#FFF";
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const fillSquares = (e) => {
  if (!mouseDown) return;
  e.target.classList.add("filled");
  e.target.style.backgroundColor = defaultColor;
};

//handles creation of grid and filling in the squares
const createGrid = (gridSize) => {
  //clears the board if already exists
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  //creates the cells
  for (let i = 0; i < gridSize * gridSize; i++) {
    squareSize = grid.clientWidth / gridSize - 2;
    let square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    grid.appendChild(square);
    square.addEventListener("mousedown", fillSquares);
    square.addEventListener("mouseover", fillSquares);
  }
};

createGrid(gridSize);

//button logic

const btn = document.querySelectorAll(".btn");
console.log(btn);
const handleButton = (e) => {
  //clears the board
  if (e.target.matches(".clear")) {
    let board = document.querySelectorAll(".filled");
    for (let i = 0; i < board.length; i++) {
      board[i].classList.remove("filled");
      board[i].style.backgroundColor = "inherit";
    }
  } else if (e.target.matches(".resize")) {
    let newSize = prompt("Change grid size");
    if (newSize === null) {
      return;
    } else if (newSize > 50) {
      alert("Please choose a size between 1 and 50");
      return;
    } else {
      gridSize = newSize;
    }
    createGrid(gridSize);
  } else {
    defaultColor = document.querySelector(".color-change").value;
  }
};

btn.forEach((node) => {
  node.addEventListener("click", handleButton);
});
