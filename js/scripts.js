function rollDice(){
  var randomRoll = Math.floor(Math.random()) + 1; // (0 - 0.9999999) * 6
  return randomRoll;
}

function roll(){

}

function Player(playerName){
  this.name = playerName;
  this.score = 0;
}

function endTurn(turn){
  if (turn = 0){
    turn = 1;
  } else {
    turn = 0;
  }
  return turn;
}

function playGame(players, clickedRollOrHold){
  var currentPlayer = players.turn;
  if (clickedRollOrHold === 'roll') {
    var numberRolled = rollDice();
    if (numberRolled > 1) {
      players[currentPlayer].score += numberRolled;
    } else {
      tempScore = 0;
      endTurn(turn);
    }
  } else {

  }
  var keepPlaying = true;
  while (keepPlaying){
    players.forEach(function(player){
      if (player.score >= 100) {
        keepPlaying = false;
        alert(player.name + ' Wins!');
      }
    });
  }
}

$(function(){
  var players;
  var clickedRollOrHold;
  $("button#name-button").click(function(){
    players = {};
    var player1Name = $("#player-1-name-input").val();
    var player2Name = $("#player-2-name-input").val();
    players.player1 = new Player(player1Name);
    players.player2 = new Player(player2Name);
    players.turn = 'player1';
    console.log(players);
  });
  $("button#start-game-button").click(function(){
    // $("").hide() // hide upper area
    // show lower game area
  });
  $("button#roll-button").click(function(){
    clickedRollOrHold = 'roll';
    playGame(players, clickedRollOrHold);
  });
  $("button#hold-button").click(function(){
    clickedRollOrHold = 'hold';
    playGame(players, clickedRollOrHold);
  });
});
