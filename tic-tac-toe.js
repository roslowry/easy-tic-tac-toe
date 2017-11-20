
function TicTacToe(){
  this.createGameBoard();
  this.boardPlays = {}
  this.playCount = 0;
  this.userTurn = false;
  this.marker = 'O';
  this.winner = false;
  this.availableCells = null;
  this.adjacents = {
    1: [2,4,5],
    2: [1,3,5],
    3: [2,5,6],
    4: [1,5,7],
    5: [1,2,3,4,6,7,8,9],
    6: [3,5,9],
    7: [4,5,8],
    8: [6,7,9],
    9: [5,6,8]
  }
}

TicTacToe.prototype.createGameBoard = function (){
  board.innerHTML = '<table class="board">' +
    '<tr>' +
      '<td class="game-cell" id="1"></td>' +
      '<td class="game-cell" id="2"></td>' +
      '<td class="game-cell" id="3"></td>' +
    '</tr>' +
    '<tr>' +
      '<td class="game-cell" id="4"></td>' +
      '<td class="game-cell" id="5"></td>' +
      '<td class="game-cell" id="6"></td>' +
    '</tr>' +
    '<tr>' +
      '<td class="game-cell" id="7"></td>' +
      '<td class="game-cell" id="8"></td>' +
      '<td class="game-cell" id="9"></td>' +
    '</tr>' +
  '</table>'
  this.addPlayListeners()
}

TicTacToe.prototype.toggleMarker = function () {
  this.marker = this.marker === 'X' ? 'O' : 'X';
}

TicTacToe.prototype.addPlayListeners = function () {
  var gameCells = document.getElementsByClassName('game-cell');
  var markCellBound = this.markCell.bind(this)
  Array.prototype.forEach.call(gameCells, function(gameCell){
    gameCell.addEventListener('click', markCellBound)
  })
}

TicTacToe.prototype.markCell = function (event){
  cellNo = event.target.id;
  if (!this.boardPlays[cellNo] && !this.winner) {
    this.playCount++;
    this.toggleMarker();
    event.target.innerHTML = this.marker;
    this.boardPlays[cellNo] = this.marker;
    this.updateAvalableCells();
    this.checkWinner(this.marker) ? this.announceWinner(this.marker) : this.computerTurn();
  }
}

TicTacToe.prototype.computerTurn = function(){
  this.toggleMarker();
  this.playCount++;
  var cellNo;
  var availableCells = this.availableCells;
  var adjacent = this.findAdjacentCell();
  if (!adjacent && this.playCount < 10) {
    cellNo = availableCells[Math.floor(Math.random()*availableCells.length)];
    this.boardPlays[cellNo] = this.marker;
    this.updateAvalableCells();
    document.getElementById(cellNo).innerHTML = this.marker;
  } else if (availableCells.length) {
      this.boardPlays[adjacent] = this.marker;
      this.updateAvalableCells();
      document.getElementById(adjacent).innerHTML = this.marker;
  }
  if (this.checkWinner(this.marker)) {
    this.announceWinner(this.marker)
  } else if (this.playCount >= 9) {
    document.getElementById('announce-winner').innerHTML = 'It\'s a cat\'s game!';
  }
}

TicTacToe.prototype.findAdjacentCell = function (availableCells, usedCells){
  var usedByComp = Object.keys(this.boardPlays).filter(function(cellNo){
    return this.boardPlays[cellNo] === 'O'
  }.bind(this));
  var availableCells = this.availableCells;
  var adjacents, selected;
  usedByComp.forEach(cellNo => {
    adjacents = this.adjacents[cellNo];
    adjacents.length ? adjacents.forEach(adjacentNo => {
      if (!this.boardPlays[adjacentNo]) selected = adjacentNo
    }) : null;
  })
  return selected;
}

TicTacToe.prototype.updateAvalableCells = function() {
  this.availableCells = [1,2,3,4,5,6,7,8,9].filter(function(cellNo){
    return (!this.boardPlays[cellNo])
  }.bind(this))
}

TicTacToe.prototype.checkWinner = function (marker){
  if (this.checkRows(marker) || this.checkColumns(marker) || this.checkDiagonals(marker)) return true;
  return false;
}
TicTacToe.prototype.checkWinner = function (marker){
  if (this.checkRows(marker) || this.checkColumns(marker) || this.checkDiagonals(marker)) return true;
  return false;
}

TicTacToe.prototype.checkRows = function (marker){
  for (var i = 1; i <= 9; i+= 3) {
    if ((this.boardPlays[i] === marker) && (this.boardPlays[i + 1] === marker) && (this.boardPlays[i + 2] === marker)) {
      return true;
    }
  }
  return false;
}

TicTacToe.prototype.checkColumns = function (marker){
  for (var i = 1; i <= 9; i++) {
    if ((this.boardPlays[i] === marker) && (this.boardPlays[i + 3] === marker) && (this.boardPlays[i + 6] === marker)) {
      return true
    }
  }
  return false;
}

TicTacToe.prototype.checkDiagonals = function (marker){

  if ((this.boardPlays[1] === marker) && (this.boardPlays[5] === marker) && (this.boardPlays[9] === marker)){
    return true;
  }
  if ((this.boardPlays[3] === marker) && (this.boardPlays[5] === marker) && (this.boardPlays[7] === marker)){
    return true;
  }
  return false;
}

TicTacToe.prototype.announceWinner = function(marker) {
  this.winner = true;
  document.getElementById('announce-winner').innerHTML = marker + ' wins!';
}

var board = document.getElementById('game');
var game = new TicTacToe;
