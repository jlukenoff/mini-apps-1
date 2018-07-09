var matrix = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]
var players = ['X', 'O'];
var curr = 0;

var checkWin = function(row, col) {
  var winningString = players[curr].repeat(3);
  var colString = matrix[0][col] + matrix[1][col] + matrix[2][col];
  var diagString = matrix[0][0] + matrix[1][1] + matrix[2][2];
  var revDiagString = matrix[0][2] + matrix[1][1] + matrix[2][0];
  if (matrix[row].join('') === winningString || colString === winningString || diagString === winningString || revDiagString === winningString) {
    console.log('winner');
    /*  var winnerString = document.createElement('h1').innerHtml()
    var scoreboard = document.getElementById('score').appendChild() */
    var winner = document.getElementById(players[curr].toLowerCase() + '-tally');
    winner.innerHTML = winner.innerHTML.slice(0, winner.innerHTML.length - 1) + (+winner.innerHTML[winner.innerHTML.length - 1] + 1).toString();
    return true;
  } 
  if (matrix.join('').search('0') === -1) {
    alert('Its a tie!');
  }
  return false;
} 

var handleClick = function(event) {
  var row = Number(event.target.id[0]);
  var col = Number(event.target.id[1]);
  var player = players[curr];
  var node = event.target;
  if (matrix[row][col] !== 0) {
    return;
  }
  matrix[row][col] = player;
  node.innerHTML = '<h1 class="piece">' + player + '</h1>';
  if (checkWin(row, col)) {
    return;
  };
  curr = curr === 0 ? 1 : 0;
}

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

}


