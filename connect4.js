"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
/* let board = document.querySelectorAll('.board'); */
let board = [];
 // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < WIDTH; y++) {
    board.push(Array.from({length: WIDTH}))
  }
}
/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" letiable from the item in HTML w/ID of "board"
  let gameBoard = document.getElementById('board');
  //tableRow var
  

  // TODO: add comment for this code
  //create top row and add id. 
  //each time the top element is clicked an id is set, coordinates are checked, and a piece is added.
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // TODO: add comment for this code
  //iterate to create and add top row to the gameboard.
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  gameBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // TODO: Create a table row element and assign to a "row" variable
    let tableRow = document.createElement('tr');
    for (let x = 0; x < WIDTH; x++) {
      // TODO: Create a table cell element and assign to a "cell" variable
      let tableCell = document.createElement('td');
      // TODO: add an id, y-x, to the above table cell element
      // you'll use this later, so make sure you use y-x
      tableCell.setAttribute('id',`${y}-${x}`);

      // TODO: append the table cell to the table row
      tableRow.append(tableCell);

    }
    // TODO: append the row to the html board
    gameBoard.append(tableRow);

  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  console.log(board);
  console.log(x);
  for (let y = HEIGHT - 1; y >= 0; y--) {
    
    let currSpot = (board[x][y]);
    if (!(currSpot)) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y+2);

  const place = document.getElementById(`${y}-${x}`);
  place.appendChild(piece);

}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return x;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[x][y] =currPlayer;
  console.log(board[x][y]);
  placeInTable(y, x);


  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(board.every(tableRow => tableRow.every(tableCell => tableCell))){
    return endGame('Tie!');
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player
    for(let cell of cells){
      let y = cell[0];
      let x = cell[1];
      if(!(y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH)){
        return false;
      }
      if(board[y][x] !== currPlayer){
        return false;
      }
    }
    return true;
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert =[[y,x],[y+1,x],[y+2,x],[y+3,x]];
      let diagDL = [[y,x][y-1,x+1],[y-2,x+2],[y-3,x+3]];
      let diagDR = [[y,x],[y+1,x-1],[y+2,x-2],[y+3,x-3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
