function Player(playerName){
  this.name = playerName;
  this.score = 0;
}

function PigDice(player1Name, player2Name){
  this.tempScore = 0;
  this.player1 = new Player(player1Name);
  this.player2 = new Player(player2Name);
  this.action = '';
}

PigDice.prototype.coinToss = function () {
  var toss = Math.random();
  if (toss > 0.5) {
    this.turn = 'player1';
  } else {
    this.turn = 'player2';
  }
};

PigDice.prototype.rollDice = function () {
    this.roll = Math.floor(Math.random() * 6) + 1; // (0 - 0.9999999) * 6
};

function endTurn(pigDice){
  if (pigDice.turn === 'player1'){
    pigDice.turn = 'player2';
  } else {
    pigDice.turn = 'player1';
  }
  return pigDice;
}

function playGame(pigDice){
  if (pigDice.action === 'roll') {
    pigDice.rollDice();
    if (pigDice.roll > 1) {
      pigDice.tempScore += pigDice.roll;
    } else {
      pigDice.tempScore = 0;
      pigDice = endTurn(pigDice);
    }
  }
  if ( pigDice.action === 'hold') {
    var currPlayer = pigDice.turn;
    pigDice[currPlayer].score += pigDice.tempScore;
    pigDice.tempScore = 0;
    pigDice = endTurn(pigDice);
  }
  return pigDice;
}

// FRONT END

$(function(){ // greater function
  var pigDice = {};
  var hallOfFame = [];
  $("button#play-button").click(function(){
    var player1Name = $("#player-1-name-input").val();
    var player2Name = $("#player-2-name-input").val();
    $('span#player-1-name-span').text(player1Name);
    $('span#player-2-name-span').text(player2Name);
    pigDice = new PigDice(player1Name, player2Name);
    pigDice.coinToss();
    var currPlayer = pigDice.turn;
    $('#current-player-span').text(pigDice[currPlayer].name);
    $("#gameplay-div").slideDown();
    $("#player-info-div").slideUp();
    $("#victory-div").slideUp();
  });
  $("button").click(function(){
    if ($(this).attr("id") === "roll-button") {
      pigDice.action = "roll";
    } else if ($(this).attr("id") === "hold-button"){
      pigDice.action = "hold";
    }
    pigDice = playGame(pigDice);
    $('#player-1-score-span').text(pigDice.player1.score);
    $('#player-2-score-span').text(pigDice.player2.score);
    $('#temp-score-span').text(pigDice.tempScore);
    var currPlayer = pigDice.turn;
    $('#current-player-span').text(pigDice[currPlayer].name);
    $('#current-roll-span').text(pigDice.roll);
    if (pigDice.player1.score >= 24 || pigDice.player2.score >= 24){
      if (pigDice.player1.score >= 24) {
        var winner = 'player1';
        var loser = 'player2';
      } else {
        var winner = 'player2';
        var loser = 'player1';
      }
      $("#victory-div").slideDown();
      var victoryMessage = pigDice[winner].name + " wins by " + String(pigDice[winner].score - pigDice[loser].score) + " points!";
      $("#victory-name").text(victoryMessage);
      $("#player-info-div").slideDown();
      $("#gameplay-div").slideUp();
      var hallOfFameWinner = {};
      hallOfFameWinner.name = pigDice[winner].name;
      hallOfFameWinner.score = pigDice[winner].score;
      hallOfFame.push(hallOfFameWinner);
      $("#hall-of-fame").empty();
      hallOfFame.forEach(function(winner){
        $("#hall-of-fame").append(winner.name + " " + winner.score + "<br>");
      });
    }
  });
});
