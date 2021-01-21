var canvas = document.getElementById("maze");
var context = canvas.getContext("2d");

let currentCell;
const cellSize = 21; // divisible by 3
const cellBlock = cellSize/3;

const cellMain = (cellSize/3)*2;
let cellEastWall = { height: cellMain, width: cellBlock };
let cellSouthWall = { height: cellBlock, width: cellMain };
let cellWall = cellBlock;
let mainColor = "red";
let wallColor = "black";
let firstCellColor = "green";
const cols = 20;
const rows = 30;

// <--- CREATE GRID ---
let cellGrid = new Array(cols);

for (let i = 0; i < cellGrid.length; i++) {
  cellGrid[i] = new Array(rows);
  for (let j = 0; j < rows; j++) {
    cellGrid[i][j] = new Cell(i, j);
  }
}

// <--- INITIALISATION ---
let i = 0; let j = 0;
let stack = [];
cellGrid[j][i].firstCell();
let endCellsArray = [];
let setFinalSquare = false;

// <--- RUN THE MAZE ---
while (stack.length > 0) {
  currentCell = stack[stack.length-1];
  let unvisitedCellsArr = checkForUnvisitedCells();

  if (deadEndCheck(unvisitedCellsArr) == true) {
    listEndSquares(); // Capture potential end squares
    currentCell.visited = true;
    stack.pop();
  } else {
    currentCell.visited = true;
    currentCell.move(unvisitedCellsArr);
    setFinalSquare = false;
  };
  currentCell.drawCell();
}

// Color the final cell
setFinalCell();