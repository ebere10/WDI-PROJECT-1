$(startGame);

var computerSequence = [];
var playerSequence   = [];
var sequenceLength   = 2;
var $lis;
var $start;
var lisArray;

function startGame(){
  $lis     = $('li');
  lisArray = [].slice.call($lis);

  $start = $('#start');

  $start.on('click', generateComputerSequence);
}


function generateComputerSequence() {
  for (var i = 0; i < sequenceLength; i++) {
    computerSequence.push(computerRandomKey());
  }
  playSequence();
}

function computerRandomKey() {
  return Math.floor(Math.random() * $lis.length);
}

function playAudio(index) {
  var key        = computerSequence[index];
  var $nextKey   = $($lis[key]);
  var noteToPlay = $nextKey.attr('id');
  var audio      = new Audio('piano_notes/' + noteToPlay + '.wav');
  $nextKey.toggleClass('illuminated');
  audio.play();

  $(audio).on('ended', function(){
    $nextKey.toggleClass('illuminated');
    var nextIndex = index + 1;
    if (nextIndex === computerSequence.length) {
      return getReadyToPlay();
    } else {
      playAudio(nextIndex);
    }
  });
}

function playSequence(){
  playAudio(0);
}

function getReadyToPlay() {
  $lis.on('click', guessNote);
}

function guessNote() {
  var $this = $(this);
  var guess = lisArray.indexOf(this);
  playerSequence.push(guess);

  var numberOfGuesses = playerSequence.length;
  if (computerSequence[(numberOfGuesses - 1)] === guess) {
    console.log('correct');
    $this.toggleClass('illuminated');
    var audio = new Audio('piano_notes/' + $this.attr('id') + '.wav');
    audio.play();

    $(audio).on('ended', function(){
      $this.toggleClass('illuminated');
    });

    if (playerSequence.length === computerSequence.length) {
      computerSequence = [];
      playerSequence   = [];
      $lis.off('click');
      setTimeout(function() {
        sequenceLength   = sequenceLength + 1;
        generateComputerSequence();
      }, 2000);
    }
  } else {
    alert('WRONG! Start again!');
    computerSequence = [];
    playerSequence   = [];
    sequenceLength   = 2;
    $lis.off('click');
    setTimeout(function() {
      generateComputerSequence();
    }, 2000);
  }
}
