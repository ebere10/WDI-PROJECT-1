$(startGame);

var computerSequence = [];
var playerSequence   = [];
var sequenceLength   = 3;
var $lis;
var $start;
var lisArray;

function startGame(){
  // Get list items from the DOM
  $lis     = $('li');
  // Convert HTMLCollection to an array
  lisArray = [].slice.call($lis);

  // Get the start button from the DOM
  $start = $('#start');

  // Generate generateComputerSequence when you click the start button
  $start.on('click', generateComputerSequence);
}


function generateComputerSequence() {
  for (var i = 0; i < sequenceLength; i++) {
    computerSequence.push(computerRandomKey());
  }
  console.log(computerSequence);
  playSequence();
}

// Computer choosing random key
function computerRandomKey() {
  return Math.floor(Math.random() * $lis.length);
}

function playAudio(index) {
  // Fetch the key value from the computerSequence
  // If the computer sequence was [5,6,7]
  // computerSequence[1] would return 6
  var key        = computerSequence[index];
  // Use that key (6) to fetch the li element from the the DOM
  // We wrap it in $() to make it a jQuery object with special methods
  var $nextKey   = $($lis[key]);
  // Get it's id, using the jQuery method .attr()
  var noteToPlay = $nextKey.attr('id');
  // Make an audio element
  var audio      = new Audio('piano_notes/' + noteToPlay + '.wav');
  // Illuminate it
  $nextKey.toggleClass('illuminated');
  // Play the sound
  audio.play();

  // When it has finished...
  $(audio).on('ended', function(){
    // Turn it off
    $nextKey.toggleClass('illuminated');
    // Add ind
    var nextIndex = index + 1;
    // Is the next greater than the total number in the computerSequence?
    if (nextIndex === computerSequence.length) {
      return getReadyToPlay();
    } else {
      playAudio(nextIndex);
    }
  });
}

function playSequence(){
  // Play the audio starting at 0 index
  playAudio(0);
}

function getReadyToPlay() {
  $lis.on('click', guessNote);
}

function guessNote() {
  var $this = $(this);
  // Find the key number of the li we just clicked on
  var guess = lisArray.indexOf(this);
  console.log('You guessed ', guess);

  // Work out how many guesses the player has had
  var numberOfGuesses = playerSequence.length;

  // Check if the player's guess is correct
  if (computerSequence[numberOfGuesses] === guess) {
    console.log('correct');
    // Illuminate the key that we clicked on
    $this.toggleClass('illuminated');
    // Create an audio element using the letter id of the note we clicked
    var audio = new Audio('piano_notes/' + $this.attr('id') + '.wav');
    // Play the audio
    audio.play();

    // When it's finished, turn it off
    $(audio).on('ended', function(){
      $this.toggleClass('illuminated');
    });

    // Add the guess to the seqence of player guesses
    playerSequence.push(guess);
    console.log(playerSequence);

    // Check if the player has the played the same number of correct keys
    if (playerSequence.length === computerSequence.length) {
      setTimeout(function() {
        // Empty the computerSequence
        computerSequence = [];
        // Empty the playerSequence
        playerSequence   = [];
        // Increase the number of sounds
        sequenceLength   = sequenceLength + 1;
        // Start again
        generateComputerSequence();
      }, 2000);
    }
  } else {
    console.log('wrong');
  }
}
