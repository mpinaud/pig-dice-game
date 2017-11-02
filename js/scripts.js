function coinToss(pigDice){
  var toss = Math.random();
  if (toss > 0.5) {
    pigDice.turn = 'player1';
  } else {
    pigDice.turn = 'player2';
  }
  return pigDice;
}

function rollDice(pigDice){
  pigDice.roll = Math.floor(Math.random() * 6) + 1; // (0 - 0.9999999) * 6
  return pigDice;
}

function Player(playerName){
  this.name = playerName;
  this.score = 0;
}

function endTurn(pigDice){
  if (pigDice.turn === 'player1'){
    pigDice.turn = 'player2';
  } else {
    pigDice.turn = 'player1';
  }
  return pigDice;
}

function playGame(pigDice){
  if ( pigDice.action === 'roll') {
    pigDice = rollDice(pigDice);
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
    console.log(pigDice);
    console.log(pigDice[currPlayer].score);
  }
  return pigDice;
}

// FRONT END

$(function(){
  var pigDice = {};
  $("button#play-button").click(function(){
    pigDice = {};
    var player1Name = $("#player-1-name-input").val();
    var player2Name = $("#player-2-name-input").val();
    $('span#player-1-name-span').text(player1Name);
    $('span#player-2-name-span').text(player2Name);
    pigDice.player1 = new Player(player1Name); // new is a command that creates a new oject from Player Constructor
    pigDice.player2 = new Player(player2Name);
    pigDice.roll = 0;
    pigDice.tempScore = 0;
    coinToss(pigDice);
    var currPlayer = pigDice.turn;
    $('#current-player-span').text(pigDice[currPlayer].name);
    $("#gameplay-div").show();
    $("#player-info-div").hide();
    $("#victory-div").hide();
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
    if (pigDice.player1.score >= 10){
      $("#victory-div").show();
      var victoryMessage = pigDice.player1.name + " by " + String(pigDice.player1.score - pigDice.player2.score) + " points!";
      $("#victory-name").text(victoryMessage);
      $("#player-info-div").show();
      $("#gameplay-div").hide();
    } else if (pigDice.player2.score >= 10){
      $("#victory-div").show();
      var victoryMessage = pigDice.player2.name + " by " + String(pigDice.player2.score - pigDice.player1.score) + " points!";
      $("#victory-name").text(victoryMessage);
      $("#player-info-div").show();
      $("#gameplay-div").hide();
    }
  });
});
