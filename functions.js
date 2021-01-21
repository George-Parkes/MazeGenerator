function chooseRandomCell(arr) {
  let randNum = Math.floor(Math.random()*arr.length);
  return arr[randNum];
}

function checkForUnvisitedCells() {
  let x = currentCell.position.x;
  let y = currentCell.position.y;
  let unvisitedArr = [];

  if (x < rows-1) {
    if (cellGrid[y][x+1].visited == false) unvisitedArr.push(cellGrid[y][x+1].position);
  }
  if (y < cols-1) {
    if (cellGrid[y+1][x].visited == false) unvisitedArr.push(cellGrid[y+1][x].position);
  }
  if (x > 0) {
    if (cellGrid[y][x-1].visited == false) unvisitedArr.push(cellGrid[y][x-1].position);
  }
  if (y > 0) {
    if (cellGrid[y-1][x].visited == false) unvisitedArr.push(cellGrid[y-1][x].position);
  }
  return unvisitedArr;
}

function deadEndCheck(unvisitedArr) {
  if (unvisitedArr.length == 0) {
    return true;
  } else {
    return false;
  }
}

function checkForEdges() {
  if (currentCell.position.x == rows-1 || currentCell.position.x == 0 ||
      currentCell.position.y == cols-1 || currentCell.position.y == 0) {
        return true;
  } else {
    return false;
  }
}

function listEndSquares() {
  if (checkForEdges() && setFinalSquare == false &&
      currentCell.visited == false) {
    endCellsArray.push(currentCell.position);
    setFinalSquare = true;
  }
}

function setFinalCell() {
  endCellsArray.shift();
  let end = chooseRandomCell(endCellsArray);
  cellGrid[end.y][end.x].mainColor = firstCellColor;
  if (end.x == rows-1) { 
    cellGrid[end.y][end.x].eastWallColor = firstCellColor;
  } else if (end.y == cols-1) {
    cellGrid[end.y][end.x].southWallColor = firstCellColor;
  };
  if (end.x == 0) { 
    // add code for top
  } else if (end.y == 0) { 
    // add code for left
  }
  cellGrid[end.y][end.x].drawCell();
}