/* ----Board State------ */
var matrix = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]
var players = ['X', 'O'];
var playerNames = ['Player X', 'Player O'];
var curr = 0;
var gameOver = false;

/* ------Checks for win after click---------- */
var checkWin = function(row, col) {
  /* model */
  var winningString = players[curr].repeat(3);
  var colString = matrix[0][col] + matrix[1][col] + matrix[2][col];
  var diagString = matrix[0][0] + matrix[1][1] + matrix[2][2];
  var revDiagString = matrix[0][2] + matrix[1][1] + matrix[2][0];
  if (matrix[row].join('') === winningString || colString === winningString || diagString === winningString || revDiagString === winningString) {
    /* view */
    var winnerNode = document.createElement('h1');
    winnerNode.innerHTML = playerNames[curr] + ' wins!';
    winnerNode.setAttribute('id', 'game-over');
    var score = document.getElementById('score');
    score.appendChild(winnerNode);
    setTimeout(function() {
      score.removeChild(winnerNode);
    }, 3000);
    var winner = document.getElementById(players[curr].toLowerCase());
    winner.innerHTML = +winner.innerHTML + 1;
    /* model */
    gameOver = true;
    return true;
  } 
  if (matrix.join('').search('0') === -1) {
    /* view */
    var winnerNode = document.createElement('h1');
    winnerNode.innerHTML = 'It\'s a tie!';
    winnerNode.setAttribute('id', 'game-over');
    var score = document.getElementById('score');
    score.appendChild(winnerNode);
    setTimeout(function() {
      score.removeChild(winnerNode);
    }, 3000);
  }
  return false;
} 

/* -------User Input Handlers-------- */
var handleClick = function(event) {
  if (gameOver) {
    /* view */
    var winnerNode = document.createElement('h1');
    winnerNode.innerHTML = 'Game over!';
    winnerNode.setAttribute('id', 'game-over');
    var score = document.getElementById('score');
    score.appendChild(winnerNode);
    setTimeout(function() {
      score.removeChild(winnerNode);
    }, 3000);
    return;
  }
  /* model */
  var row = Number(event.target.id[0]);
  var col = Number(event.target.id[1]);
  if (row !== 0 && row !== 1 && row !== 2) {
    return;
  }
  var player = players[curr];
  matrix[row][col] = player;

  /* view */
  var node = event.target;
  node.innerHTML = '<h1 class="piece">' + player + '</h1>';

  /* model */
  if (checkWin(row, col)) {
    return;
  };
  curr = curr === 0 ? 1 : 0;
};

var handleNameChange = function(e) {
  /* controller */
  if (e.which !== 1 && e.which !== 13) {
    return;
  }
  var which = document.getElementById('player-select').value.toLowerCase();
  if (which === 'x') {
    playerNames[0] = document.getElementById('player-name').value;
    document.getElementById('x-name').innerHTML = playerNames[0];
  } else if (which === 'o') {
    playerNames[1] = document.getElementById('player-name').value;
    document.getElementById('o-name').innerHTML = playerNames[1];
  } else if (which){
    var error = document.createElement('p');
    error.innerHTML = 'Please select a player';
    error.style.color = 'red';
    var input = document.getElementById('name-input');
    input.appendChild(error);
    setTimeout(function() {
      input.removeChild(error);
    }, 3000);
  }
  document.getElementById('player-name').value = '';

};


/*----- Attach Handlers -----*/
var spaces = document.getElementsByClassName('col');
for (var i = 0; i < spaces.length; i++) {
  spaces[i].onclick = handleClick;
}

document.getElementById('new-game').onclick = function() {
  for (let i = 0; i < spaces.length; i++) {
    spaces[i].innerHTML = '';
  };
  matrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  gameOver = false;
}

document.getElementById('submit-name').onclick = handleNameChange;
document.getElementById('player-name').addEventListener('keypress', handleNameChange);


