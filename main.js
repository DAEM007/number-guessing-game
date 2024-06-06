// Defining variables and references to DOM
let randomNumber = Math.floor(Math.random() * 100) + 1;
let card = document.querySelector(".card");
let guesses = document.querySelector(".guesses");
let lastResult = document.querySelector(".lastResult");
let lowOrHi = document.querySelector(".lowOrHi");

let guessField = document.querySelector(".guessField");
let guessSubmit = document.querySelector(".guessSubmit");

let guessCount = 1;
let resetButton;

// check for guesses
function checkGuess() {
  const userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = `Previous guesses: `;
  }
  guesses.textContent = `${guesses.textContent} ${userGuess}`;

  if (userGuess === randomNumber) {
    lastResult.textContent = "Congratulations, You are right!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    lowOrHi.style.backgroundColor = "white";
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "GAME OVER!!!";
    lowOrHi.textContent = "";
    lowOrHi.style.backgroundColor = "white";
    setGameOver();
  } else if (userGuess < randomNumber) {
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "Red";
    lowOrHi.textContent = "Previous guess was too Low!";
    lowOrHi.style.backgroundColor = "Yellow";
  } else if (userGuess > randomNumber) {
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "Red";
    lowOrHi.textContent = "Previous guess was too high!";
    lowOrHi.style.backgroundColor = "Yellow";
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
}

// set game over when you have either gotten it right or ran out of guesses
function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "start new game";
  resetButton.className = "start-new-game";
  card.appendChild(resetButton);
  resetButton.addEventListener("click", restartGame);
}

// restart game to start guessing again
function restartGame() {
  guessCount = 1;
  let resetParas = document.querySelectorAll(".resultParas p");

  for (let para of resetParas) {
    para.textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  lastResult.style.backgroundColor = "white";

  randomNumber = Math.floor(Math.random() * 100) + 1;
}

// listen for a click event on the submit button
guessSubmit.addEventListener("click", checkGuess);
