var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animate(element, classToggle, duration) {
  $(element).addClass(classToggle);
  setTimeout(function () {
    $(element).removeClass(classToggle);
  }, duration);
}

function nextSequence(level) {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence(currentLevel + 1);
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSound("wrong");
    animate("body", "game-over", 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  nextSequence(level);
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animate("#" + userChosenColour, "pressed", 100);
  checkAnswer(userClickedPattern.length - 1);
});

var level = 0;
nextSequence(level);
