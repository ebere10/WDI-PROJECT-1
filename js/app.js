console.log('hi');
window.onload = start;


var keys = document.getElementsByTagName('li');

function start(){

  for (var i = 0; i < keys.length; i++) {
    keys[i].addEventListener('click', function() {
      console.log(this);
    });
  }

  var startGame = document.getElementById('start');
  startGame.addEventListener('click', randomSequence);

  function randomSequence() {
    console.log(this);
  }

}
