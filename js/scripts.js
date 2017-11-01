function rollDice(){
  var randomRoll = Math.floor(Math.random() * 6) + 1; // (0 - 0.9999999) * 6
  return randomRoll;
}

function Player(playerName){
  this.name = playerName;
  this.score = 0;
}

function endTurn(players){
  if (players.turn = 'player1'){
    players.turn = 'player2';
  } else {
    players.turn = 'player1';
  }
  return players;
}

function playGame(players, clickedRollOrHold){
  var currentPlayer = players.turn;
  if (clickedRollOrHold === 'roll') {
    var numberRolled = rollDice();
    if (numberRolled > 1) {
      players.tempScore += numberRolled;
    } else {
      players.tempScore = 0;
      players = endTurn(players);
    }
  }
  if (clickedRollOrHold === 'hold') {
    players[currentPlayer].score += players.tempScore;
    players.tempScore = 0;
    players = endTurn(players);
  }
  return players;
}

// FRONT END

$(function(){
  var players = {};
  var clickedRollOrHold;
  $("button#play-button").click(function(){
    players = {};
    var player1Name = $("#player-1-name-input").val();
    var player2Name = $("#player-2-name-input").val();
    $('span#player-1-name-span').text(player1Name);
    $('span#player-2-name-span').text(player2Name);
    players.player1 = new Player(player1Name);
    players.player2 = new Player(player2Name);
    players.turn = 'player1';
    players.tempScore = 0;
    $(".to-show").show();
    $(".to-hide").hide();
  });
  $("button#roll-button").click(function(){
    clickedRollOrHold = 'roll';
    players = playGame(players, clickedRollOrHold);
    $('#player-1-score-span').text(players.player1.score);
    $('#player-2-score-span').text(players.player2.score);
    $('#temp-score-span').text(players.tempScore);
  });
  $("button#hold-button").click(function(){
    clickedRollOrHold = 'hold';
    players = playGame(players, clickedRollOrHold);
  });
});
