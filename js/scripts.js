var player1 = new Player("player1", true, 0, 1);
var player2 = new Player("player2", false, 0, 1);

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Player(playerName, activeTurn, score, currentRoll) {
  this.playerName = playerName;
  this.activeTurn = activeTurn;
  this.score = score;
  this.currentRoll = currentRoll;
  this.turnScore = 0;
}

Player.prototype.roll = function() {
  var roll = 1;
  if (this.activeTurn = true) {
    roll = getRandomArbitrary(1, 7);
    if (roll > 1) {
      this.currentRoll = roll;
      console.log('successful roll');
      this.turnScore += this.currentRoll;
      console.log(this);
    } else if (roll === 1) {
      this.turnScore = 0;
      this.score += 1;
      endTurn();
      console.log('end');
      console.log(this);
    }
  } else {
    console.log("not your turn");
  }
}

function endTurn() {
  this.score += this.turnScore;
  if (player1.activeTurn = true) {
    player1.activeTurn = false;
  } else {
    player1.activeTurn = true;
  }

  if (player2.activeTurn = true) {
    player2.activeTurn = false;
  } else {
    player2.activeTurn = true;
  }
}

$(function(){
  // var player1 = new Player(true, 0, 0);
  // var player2 = new Player(false, 0, 0);
  /*player1.roll();
  player1.roll();
  player1.roll();
  player1.roll();
  player1.roll();
  player1.roll();
  player1.roll();
  player1.roll();
  player2.roll();
  player2.roll();
  player2.roll();
  player2.roll();
  player2.roll();
  player2.roll();
  player2.roll();
  player2.roll();
  player2.roll();
  */
});