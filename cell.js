class Cell {
  constructor(posY, posX) {
    this.position = { x: posX, y: posY },
    this.mainColor = mainColor,
    this.wallColor = wallColor,
    this.eastWallColor = wallColor,
    this.southWallColor = wallColor,
    this.isConnected = {
      north: false,
      east: false,
      south: false,
      west: false
    },
    this.visited = false
  }
  drawCell() {
    // Draw Cell Main (red section)
    context.beginPath();
    context.rect((
      this.position.x * cellSize) + cellBlock,
      (this.position.y * cellSize) + cellBlock,
      cellSize, cellSize);
    context.fillStyle = this.mainColor;
    context.fill();
    context.closePath();

    // Draw East Wall
    context.clearRect(
      (this.position.x * cellSize) + cellMain + cellBlock,
      (this.position.y * cellSize) + cellBlock,
      cellEastWall.width, cellEastWall.height);
    context.beginPath();
    context.rect(
      (this.position.x * cellSize) + cellMain + cellBlock,
      (this.position.y * cellSize) + cellBlock,
      cellEastWall.width, cellEastWall.height);
    if (this.isConnected.east == false) {
      context.fillStyle = this.eastWallColor;
    } else {
      context.fillStyle = mainColor;
    }
    context.fill();
    context.closePath();

    // Draw South Wall
    context.clearRect(
      (this.position.x * cellSize) + cellBlock,
      (this.position.y * cellSize) + cellBlock + cellMain,
      cellSouthWall.width, cellSouthWall.height);
    context.beginPath();
    context.rect(
      (this.position.x * cellSize) + cellBlock,
      (this.position.y * cellSize) + cellBlock + cellMain,
      cellSouthWall.width, cellSouthWall.height);
    if (this.isConnected.south == false) {
      context.fillStyle = this.southWallColor;
    } else {
      context.fillStyle = mainColor;
    }
    context.fill();
    context.closePath();

    // Draw Cell Walls
    context.beginPath();
    context.rect(
      (this.position.x * cellSize) + cellMain + cellBlock,
      (this.position.y * cellSize) + cellMain + cellBlock,
      cellWall, cellWall);
    context.fillStyle = this.wallColor;
    context.fill();
    context.closePath();
  
    // Left wall barriers
    if (this.position.x == 0) {
      context.beginPath();
      context.rect(
        (this.position.x * cellSize),
        (this.position.y * cellSize) + cellBlock,
        cellBlock, cellSize);
      context.fillStyle = this.wallColor;
      context.fill();
      context.closePath();
    }
    // top-left point
    if (this.position.y == 0 && this.position.x == 0) {
      context.beginPath();
      context.rect(
        (this.position.x * cellSize),
        (this.position.y * cellSize),
        cellBlock, cellBlock);
      context.fillStyle = this.wallColor;
      context.fill();
      context.closePath();
    }
    // Top wall barriers
    if (this.position.y == 0) {
      context.beginPath();
      context.rect(
        (this.position.x * cellSize) + cellBlock,
        (this.position.y * cellSize),
        cellSize, cellBlock);
      context.fillStyle = this.wallColor;
      context.fill();
      context.closePath();
    }  
  }
  firstCell() {
    if (stack.length == 0) {
      this.visited = true;
      stack.push(cellGrid[this.position.y][this.position.x])
      this.mainColor = firstCellColor;
    }
  }
  move(unvisitedArr) {
    let moveTo = chooseRandomCell(unvisitedArr);
    let dx = moveTo.x - this.position.x;
    let dy = moveTo.y - this.position.y;
    if (dx == 1)  this.isConnected.east = true;
    if (dy == 1)  this.isConnected.south = true;
    if (dx == -1) cellGrid[this.position.y][this.position.x-1].isConnected.east = true;
    if (dy == -1) cellGrid[this.position.y-1][this.position.x].isConnected.south = true;
    this.drawCell();
    stack.push(cellGrid[moveTo.y][moveTo.x]);
  }
}