
var delayMillis = 10000; //10 second

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function currentTurn() {
  if (player1.activeTurn === true) {
    return "Player 1";
  } else {
    return "Player 2";
  }
}

function Player(playerName, playerType, activeTurn, score, currentRoll) {
  this.playerName = playerName;
  this.playerType = playerType;
  this.activeTurn = activeTurn;
  this.score = score;
  this.currentRoll = currentRoll;
  this.turnScore = 0;
}

Player.prototype.roll = function() {
  if (this.activeTurn === true) {
    var roll = getRandomArbitrary(1, 7);
    if (roll > 1) {
      this.currentRoll = roll;
      this.turnScore += this.currentRoll;
      console.log(this);
    } else if (roll === 1) {
      this.currentRoll = roll;
      this.turnScore = 0;
      endTurn();
      console.log(this);
    }
  }
}

function turnSwitch() {
  if (player1.activeTurn === true) {
    player1.activeTurn = false;
  } else {
    player1.activeTurn = true;
  }

  if (player2.activeTurn === true) {
    player2.activeTurn = false;
  } else {
    player2.activeTurn = true;
  }
}

function computerTurn() {
  var timeoutID;
  var timeoutID2;
  var timeoutID3;
  function computerRoll() {
    timeoutID = window.setTimeout(slowRoll, 2000);
  }

  function computerRoll2() {
    timeoutID2 = window.setTimeout(slowRoll, 4000);
  }

  function computerEnd() {
    timeoutID3 = window.setTimeout(infoUpdate, 4000);
  }

  function infoUpdate() {
    if (player2.activeTurn === true) {
      endTurn();
    }
    $('#computing').hide();
    $('#control-buttons').slideDown();
    $('#active-player').text(currentTurn());
    $('#player2-score').text(player2.score);
  }

  function slowRoll() {
    player2.roll();
    console.log('rolled');
    $('#current-roll').text(player2.currentRoll);
    $('#turn-score').text(player2.turnScore);
  }
  $('#computing').show();
  $('#control-buttons').slideUp();
  computerRoll();
  computerRoll2();
  computerEnd();
}

function computerTurnHard() {
  var timeoutID;
  var timeoutID3;
  function computerRoll() {
    timeoutID = window.setTimeout(slowRoll, 2000);
  }

  function computerEnd() {
    timeoutID3 = window.setTimeout(infoUpdate, 4000);
  }

  function infoUpdate() {
    if (player2.activeTurn === true) {
      endTurn();
    }
    $('#computing').hide();
    $('#control-buttons').slideDown();
    $('#active-player').text(currentTurn());
    $('#player2-score').text(player2.score);
  }

  function slowRoll() {
    player2.roll();
    console.log('rolled');
    $('#current-roll').text(player2.currentRoll);
    $('#turn-score').text(player2.turnScore);
  }
  $('#computing').show();
  $('#control-buttons').slideUp();
  while (player2.turnScore < 9) {
    if (player2.currentRoll === 1) {
      break;
    }
    computerRoll();
  }
  computerEnd();
}

function endTurn() {
  console.log('end');
  player1.score += player1.turnScore;
  player1.turnScore = 0;
  player2.score += player2.turnScore;
  player2.turnScore = 0;
  turnSwitch();

  if ((player2.activeTurn === true) && (player2.playerType === "computer-hard")) {
      computerTurnHard();
  }

  if ((player2.activeTurn === true) && (player2.playerType === "computer")) {
    computerTurn();
  }

  if (player1.score >= 100) {
    $('#main').fadeOut();
    $('#player1-win').delay(1000).fadeIn();
  } else if (player2.score >= 100) {
    $('#main').fadeOut();
    $('#player2-win').delay(1000).fadeIn();
  }
}

$(function(){
  $('#active-player').text("Player 1");
  $('#current-roll').text('0');
  $('#turn-score').text('0');
  $('#player1-score').text('0');
  $('#player2-score').text('0');

  $('#human').click(function(){
    player1 = new Player("player1", "human", true, 0, 1);
    player2 = new Player("player2", "human", false, 0, 1);
    $('#splash').fadeOut();
    $('#controls').delay(1000).fadeIn();
  });

  $('#computer').click(function(){
    player1 = new Player("player1", "human", true, 0, 1);
    player2 = new Player("player2", "computer", false, 0, 1);
    $('#splash').fadeOut();
    $('#controls').delay(1000).fadeIn();
  });

  $('#computer-hard').click(function(){
    player1 = new Player("player1", "human", true, 0, 1);
    player2 = new Player("player2", "computer-hard", false, 0, 1);
    $('#splash').fadeOut();
    $('#controls').delay(1000).fadeIn();
  });

  $('button#roll').click(function() {
    if ((player1.activeTurn === true) && (player1.playerType === "human")) {
      player1.roll();
      $('#current-roll').text(player1.currentRoll);
      $('#turn-score').text(player1.turnScore);
      $('#active-player').text(currentTurn());
      $('#player1-score').text(player1.score);
    } else if ((player2.activeTurn === true) && (player2.playerType === "human")){
      player2.roll();
      $('#current-roll').text(player2.currentRoll);
      $('#turn-score').text(player2.turnScore);
      $('#active-player').text(currentTurn());
      $('#player2-score').text(player2.score);
    }
  });

  $('button#end').click(function(){
    endTurn();
    $('#active-player').text(currentTurn());
    $('#current-roll').text('');
    $('#turn-score').text('');
    $('#player1-score').text(player1.score);
    $('#player2-score').text(player2.score);
  });

  $('button.play-again').click(function(){
    location.reload();
  });

});
