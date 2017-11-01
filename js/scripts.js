function roll(){
  var randomRoll = Math.floor(Math.random()) + 1; // (0 - 0.9999999) * 6
  return randomRoll;
}

function Player(playerName) = {
  this.name = playerName;
  this.score = 0;
}



$(function(){
  $("button#name-button").click(function(){
    var player1Name = $("#player-1-name-input").val();
    var player2Name = $("#player-2-name-input").val();
    alert(player2Name);
  });

  $("")

});
