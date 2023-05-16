var userPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0

$(document).keydown(nextSequence);

function nextSequence() {
  userPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100, function() {
    var audio = new Audio("sounds/" + randomColor + ".mp3");
    audio.play();
  });
}

$(".btn").click(function(event) {
  var userChosenColor = this.id;
  userPattern.push(userChosenColor);
  playSound(this.id);
  animatePress(this.id);
  var lastIndex = userPattern.length - 1;
  checkAnswer(lastIndex);
});

function playSound(name) {
  var buttonPress = new Audio("sounds/" + name + ".mp3");
  buttonPress.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");

  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userPattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userPattern = [];
}
