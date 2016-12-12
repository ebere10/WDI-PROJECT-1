$(startGame);

var $computerSequence = [];
var $playerGuess = [];
var $sequenceLength = 3;
var $keys;

function startGame(){
  $keys = $('li');

  var $start = $('#start');
  $start.on('click', randomSequence);

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

function computerRandomKey() { //computer choosing random key
  var $keys = $('li');
  return Math.ceil(Math.random() * ($keys).length);
}



function playSequence(){
  var $keys = $('li');
  var i = 0;
  var interval = setInterval(function(){
    console.log($computerSequence[i]);
    $($keys[$computerSequence[i]]).toggleClass('illuminated');
    var noteToPlay = $keys[$computerSequence[i]].getAttribute('id');
    var audio = new Audio('piano_notes/' + noteToPlay + '.wav');
    audio.play();
    setTimeout(function() {
      $($keys[$computerSequence[i]]).toggleClass('illuminated');
    }, 500);

    i++;
    if(i === $computerSequence.length) {
      clearInterval(interval);
    }
  }, 500);
}


function playerInput() { //player clicks keys

  if ($playerGuess.length === $computerSequence.length) {
    checkForMatch();
  }
}

function checkForMatch() {
  var $result = $playerGuess.reverse() === $computerSequence;
  if ($result) {
    //computer chooses another random key and pushes it into the computerSequence array - then playSequence function again maybe... or something...
  } else {
    //game over and reset
  }
}
