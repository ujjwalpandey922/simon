let seq = [];
let userClickPattern = [];
let availableSequence = ["green", "red", "yellow", "blue"];
let level = 0;
$(document).one("keypress", function () {
  generateRandomColor();
});

$(".btn").click(function () {
  playSound(`./sounds/${this.id}.mp3`);
  userClickPattern.push(this.id);
  animatePress(this.id);
  checkAns(userClickPattern.length - 1);

  console.log(userClickPattern, seq, this);
});

function checkAns(lastIndex) {
  if (userClickPattern[lastIndex] === seq[lastIndex]) {
    console.log("Correct");
  } else {
    let audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("#level-title").text("Game Over Press Any Key to start Again ");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 50);

    $(document).one("keypress", function () {
      startOver();
    });
  }

  if (userClickPattern.length === seq.length) {
    setTimeout(function () {
      generateRandomColor();
    }, 100);
    userClickPattern = [];
  }
}
// ===============START OVER=======================================
function startOver() {
  level = 0;
  seq = [];
  userClickPattern = [];
  generateRandomColor();
}

// =================RANDOM-COLOR===================================
function generateRandomColor() {
  level++;
  let chosenRandomNumber = Math.floor(Math.random() * 4);

  let selectedCurrentColor = availableSequence[chosenRandomNumber];
  let mp3SoundSelected = "./sounds/" + selectedCurrentColor + ".mp3";

  seq.push(selectedCurrentColor);

  $("#" + selectedCurrentColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(mp3SoundSelected);

  $("#level-title").text("Level : " + level);
}
//=====================PLAY-SOUND======================
function playSound(name) {
  let audio = new Audio(name);
  audio.play();
}

//=====================Press-Animate======================
function animatePress(colorPressed) {
  $(`#${colorPressed}`).addClass("pressed");
  setTimeout(function () {
    $(`#${colorPressed}`).removeClass("pressed");
  }, 100);
}
