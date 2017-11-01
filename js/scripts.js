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

function endTurn(players){
  if (endTurn = 0){
    endTurn = 1;
  } else {
    endTurn = 0;
  }
}

function playGame(players){
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
  $("button#name-button").click(function(){
    players = [];
    var player1Name = $("#player-1-name-input").val();
    var player2Name = $("#player-2-name-input").val();
    players.push(new Player(player1Name));
    players.push(new Player(player2Name));
    console.log(players);
  });
  $("button#start-game-button").click(function(){
    // $("").hide() // hide upper area
    playGame(players);
  });

  $("")

});
