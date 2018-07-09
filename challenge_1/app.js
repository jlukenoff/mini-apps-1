var matrix = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]
var players = ['X', 'O'];
var currentPlayer = 0;
var checkWin = function(row, col) {
  var winningString = players[currentPlayer].repeat(3);
  var colString = matrix[0][col] + matrix[1][col] + matrix[2][col];
  var diagString = matrix[0][0] + matrix[1][1] + matrix[2][2];

  if (matrix[row].join('') === winningString || colString === winningString || diagString === winningString) {
    alert('Player ' + players[currentPlayer] + ' wins!');
  } 
} 
var handleClick = function(event) {
  var row = Number(event.target.id[0]);
  var col = Number(event.target.id[1]);
  var player = players[currentPlayer];
  var node = event.target;
  var newNode = document.createElement('h1');
  var text = document.createTextNode(players[currentPlayer]);
  if (matrix[row][col] !== 0) {
    return;
  }
  matrix[row][col] = player;
  newNode.appendChild(text);
  node.appendChild(newNode);
  checkWin(row, col);
  currentPlayer = currentPlayer === 0 ? 1 : 0;
}

var spaces = document.getElementsByClassName('col');
for (var i = 0; i < spaces.length; i++) {
  spaces[i].onclick = handleClick;
}


