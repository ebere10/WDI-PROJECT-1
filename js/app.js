$(startGame);

var $computerSequence = [];
var $playerGuess = [];
var $sequenceLength = 3;

var $keys = $('li');

function startGame(){

  var $start = $('#start');
  $start.on('click', randomSequence);

  //why doesn't it work when- var $keys = $(li) -is defined globally and not in the function?
  var $keys = $('li');
  $keys.on('click', function() {
    var $this = $(this);
    $this.toggleClass('illuminated');
    var audio = new Audio('piano_notes/' + $this.attr('id') + '.wav');
    audio.play();
// console.log(this, "click");
    setTimeout(function() {
      $this.toggleClass('illuminated');
    }, 500);
  });
}


function randomSequence() {
  for (var i = 0; i < $sequenceLength; i++) {
    $computerSequence.push(computerRandomKey());
  }
  playSequence();
}

function computerRandomKey() {
  return Math.ceil(Math.random() * ($keys).length);
}

function playSequence() {
//computer plays a random sequence

  playerInput();
}

function playerInput() {
  if ($playerGuess.length === $sequenceLength) {
    checkForMatch();
  }
}

function checkForMatch() {
  var $result = $playerGuess === $computerSequence;
  if ($result) {
    //computer choose another random key and push it into the computerSequence array - then playSequence again
  } else {
    //game over and reset
  }
}
