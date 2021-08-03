// GLOBAL VARIABLES (accessible by all functions)
// ==================================================================================================

// Array of Word Options (all lowercase)
var wordsList = ["run", "walk", "bike", "throw", "drive", "sleep",
  "bake", "cook", "grow", "shake", "ride", "hide"];
// Solution will be held here.
var chosenWord = "";
// This will break the solution into individual letters to be stored in array.
var lettersInChosenWord = [];
// This will be the number of blanks we show based on the solution
var numBlanks = 0;
// Holds a mix of blank and solved letters (ex: 'n, _ _, n, _').
var blanksAndSuccesses = [];
// Holds all of the wrong guesses
var wrongGuesses = [];

// Game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;

// FUNCTIONS (These are bits of code that we will call upon to run when needed)
// =========================================================================================
function reset() {
  chosenWord = ''
  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  lettersInChosenWord = chosenWord.split("");
  numBlanks = chosenWord.length;
  blanksAndSuccesses = [];
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push('_');
  }
  var blanks = document.getElementById('word-blanks');
  blanks.textContent = blanksAndSuccesses.join(' ');
  wrongGuesses = [];
  wrongLabel = document.getElementById('wrong-guesses')
  wrongLabel.textContent = wrongGuesses;
  numGuesses = 9
  var guesses = document.getElementById('guesses-left');
  guesses.textContent = numGuesses;
  wins = document.getElementById('win-counter');
  wins.textContent = winCounter;
  losses = document.getElementById('loss-counter');
  losses.textContent = lossCounter;
}

reset()

function onPlayerGuess(event) {
  playerGuess = event.key;
  if (playerGuess.charCodeAt(0) > 122 || playerGuess.charCodeAt(0) < 97) {
    return;
  }
  if (wrongGuesses.indexOf(playerGuess) !== -1) {
    return;
  }
  if(blanksAndSuccesses.some(letter => letter === playerGuess)) {
    return;
  }
  var incorrectGuess = 0;
  for (i = 0; i < lettersInChosenWord.length; i++) {
    if (lettersInChosenWord[i] == playerGuess) {
      numBlanks--;
      blanksAndSuccesses.splice(i, 1, playerGuess);
      var blanks = document.getElementById('word-blanks');
      blanks.textContent = blanksAndSuccesses.join(' ');
    }
    else {
      incorrectGuess += 1;
    }
  }
  if (incorrectGuess == lettersInChosenWord.length) {
    wrongGuesses.push(playerGuess);
    wrongLabel = document.getElementById('wrong-guesses')
    wrongLabel.textContent = wrongGuesses;
    numGuesses -= 1;
    var guesses = document.getElementById('guesses-left');
    guesses.textContent = numGuesses;
  }
  if (numBlanks == 0) {
    winCounter += 1;
    reset()
  }
  if (numGuesses == 0) {
    lossCounter += 1;
    alert('The correct answer was ' + chosenWord)
    reset()
  }
}

document.addEventListener('keyup', onPlayerGuess, false);