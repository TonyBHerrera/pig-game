'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const diceEl = document.querySelector('.dice');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Starting Conditions
const scores = [0, 0];
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Rolling dice function

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice rolling
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true,
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //  switch to next player
      switchPlayer();
    }
  }
});
// 4. Add current Score to total score
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active players score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if score is already 100
    // finish game if it is
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
