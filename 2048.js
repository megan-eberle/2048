var board;
var score = 0;
var rows = 4;
var cols = 4;

onload = function () {
  newGame();
};

function newGame() {
  //Initalize new board
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 2, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      //Creates a new <div> per tile, gives each <div> a unique id = "row-col". Ex: id = "1-2"
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();

      let num = board[r][c];
      updateTile(tile, num);

      console.log(num);
      //addTile(tile);
      document.getElementById("board").append(tile);
    }
  }
}

function updateTile(tile, num) {
  //Reset the tile's text and classList to update CSS style
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");

  //Tile is not an empty tile
  if (num > 0) {
    tile.innerText = num;
    //Gets the tile color based on tile number: t2, t4, t128, etc
    tile.classList.add("t" + num.toString());
  }
}


function addTile() {
  var openTile = false



  while (!openTile){
    var a = randomIntFromInterval(0, 3);
    var b = randomIntFromInterval(0, 3);

    if (board[a][b] == 0){
      openTile = true;
    }
  }

  var ran = randomIntFromInterval(0, 1);



  console.log("%d, %d", a, b);
  //console.log(num);

  if (board[a][b] == 0) {
    let tile = document.getElementById(a.toString() + "-" + b.toString());
    console.log("making a new tile");
    if (ran == 0){
      tile.innerText = "2";
      tile.classList.add("t2");
      board[a][b] = 2;
    }
    if (ran == 1){
      tile.innerText = "4";
      tile.classList.add("t4");
      board[a][b] = 4;
    }

  }

  //upateTile(tile, num);

}


//Get user inputs (Up, Down, Left, Right)
document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") shiftLeft();
  if (e.code == "ArrowRight") shiftRight();
  if (e.code == "ArrowUp") shiftUp();
  if (e.code == "ArrowDown") shiftDown();
});

/*
Filter Zeros to essentially "shift" past any empty cells
[0 0 2 0] -> [2]
Then add zeros back to get [2 0 0 0]
*/
function filterZeros(row) {
  return row.filter((num) => num != 0);
}

function moveRow(row) {
  row = filterZeros(row);

  //Add merge logic here
  //....

  //Add zeros back to filtered row
  // [2 2] -> [2 2 0 0]
  while (row.length < cols) {
    row.push(0);
  }

  return row;
}

function shiftLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = moveRow(row);
    board[r] = row;

    //Update row HTML
    for (let c = 0; c < cols; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
  addTile();
}

function shiftRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse(); //Reverse the row, to make it like a shift left
    row = moveRow(row);
    row.reverse(); //Reverse again to make it a shift right
    board[r] = row;

    //Update row HTML
    for (let c = 0; c < cols; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
  addTile();
}

/*Get one column, and transpose it to look like a row
[2]
[0]
[0]  -> [2 0 0 2]
[2]
Perform moveRow() and then insert back in the order of a column
*/
function shiftUp() {
  for (let c = 0; c < cols; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = moveRow(row);
    board[0][c] = row[0];
    board[1][c] = row[1];
    board[2][c] = row[2];
    board[3][c] = row[3];

    for (let r = 0; r < rows; r++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
  addTile();
}

//Same as shiftUp() but reverse the row
function shiftDown() {
  for (let c = 0; c < cols; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = moveRow(row);
    row.reverse();
    board[0][c] = row[0];
    board[1][c] = row[1];
    board[2][c] = row[2];
    board[3][c] = row[3];

    for (let r = 0; r < rows; r++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
  addTile();
}


function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
