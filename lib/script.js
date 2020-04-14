// getting the blank space and letter space div
const blankSpaces = document.querySelector('.blank-spaces');
const letterSpaces = document.querySelector('.letter-spaces');
// getting the word entered by user
const inputWord = document.querySelector('.player-input');
let keyWord = '';
const submitButton = document.querySelector('.submit-button');

// getting modal, form, and winner classes from document
const modal = document.querySelector('.modal');
const form = document.querySelector('.enter-word-form');
const gameoverAlert = document.querySelector('.gameover-alert');
const gameoverText = document.querySelector('.gameover-text');
// determine which players turn it is
let countTurns = 0;
const playerTurn = document.querySelector('.player-turn');
const nextPlayerButton = document.querySelector('.next-player');
// create a count for incorrect guesses
let incorrectGuess = 6;
const guessRemaining = document.querySelector('.guess-remaining');
// getting image from document
const manImage = document.querySelector('.hangman-image');
// getting reset button from document
const resetButton = document.querySelector('.reset-button');
// getting the player scores
const playerScore = Array.from(document.querySelectorAll('.score'));
// create an array of letters
const letters = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];

//function to create board and reset board
function createBoard() {
	// clear previous board and saved word
	clearPreviousBoard(letterSpaces);
	clearPreviousBoard(guessRemaining);
	// reset image to blank board
	manImage.setAttribute('src', `images/hangman7.png`);
	// reset the incorrectGuess to 6
	incorrectGuess = 6;
	// create guesses remaining
	for (let i = 0; i < incorrectGuess; i++) {
		const divElement = document.createElement('div');
		divElement.classList.add('show-circle');
		divElement.setAttribute('id', [i + 1]);
		guessRemaining.appendChild(divElement);
	}

	// loop through letters array and create divs for all of them
	for (let i = 0; i < letters.length; i++) {
		const divElement = document.createElement('div');
		divElement.innerText = letters[i];
		divElement.classList.add('letter-button');
		divElement.setAttribute('id', letters[i]);
		letterSpaces.appendChild(divElement);
	}
}

function clearPreviousBoard(target) {
	let divElement = target.firstElementChild;
	while (divElement) {
		target.removeChild(divElement);
		divElement = target.firstElementChild;
	}
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
	clearPreviousBoard(blankSpaces);
	clearPreviousBoard(guessRemaining);
	countTurns = 0;
	playerScore.forEach((element) => (element.innerText = '00'));
	form.classList.remove('hidden');
	gameoverAlert.classList.add('hidden');
	playerTurn.innerText = 'Player One Enter Word';
}

nextPlayerButton.addEventListener('click', nextPlayer);

function nextPlayer() {
	createBoard();
	clearPreviousBoard(blankSpaces);
	clearPreviousBoard(guessRemaining);

	// increment count turns
	countTurns += 1;
	if (form.classList.contains('hidden')) {
		form.classList.remove('hidden');
		gameoverAlert.classList.add('hidden');
	}
	if (countTurns % 2 === 0) {
		playerTurn.innerText = 'Player One Enter Word';
	} else {
		playerTurn.innerText = 'Player Two Enter Word';
	}
}

// functionality for letter buttons
letterSpaces.addEventListener('click', handleLetterSelection);

function handleLetterSelection() {
	letterSelected = event.target;
	if (letterSelected.classList.contains('letter-button')) {
		checkLetter(letterSelected.id);
		// to hide guessed letters
		letterSelected.classList.add('hidden');
	}
}

//add event listener to submit button
submitButton.addEventListener('click', handleUserInput);

function handleUserInput() {
	event.preventDefault();
	// to create and reset board
	createBoard();
	// save user input value as a const
	keyWord = inputWord.value.toUpperCase();
	// check if keyWord has a space or contains a number
	const word = keyWord.split('');
	const goodWord = word.some((letter) => {
		return letter === ' ' || !isNaN(letter);
	});
	// check if the word is empty
	if (keyWord !== '' && goodWord === false) {
		// to hide modal display
		modal.classList.add('hidden');
		// call function to display underscores
		handleUnderscores(keyWord);
	} else {
		alert('Enter one word with no spaces and no numbers');
	}
}

function handleUnderscores(word) {
	//splitting each letter to form an array
	const wordArr = word.split('');
	// creating underscores for each of the letters
	for (let i = 0; i < wordArr.length; i++) {
		const divElement = document.createElement('div');
		divElement.classList.add('unknown-letter');
		divElement.setAttribute('id', wordArr[i]);
		blankSpaces.appendChild(divElement);
	}
}

function checkLetter(letter) {
	const guessLetter = Array.from(document.querySelectorAll('.unknown-letter'));
	guessLetter.some((guess) => {
		if (guess.id === letter) {
			guess.innerText = letter;
		}
	});

	// if letter does not match any letter in the word then count down from incorrectGuess
	if (keyWord.indexOf(letter) === -1) {
		let wrong = Array.from(document.querySelectorAll('.show-circle'));
		wrong[incorrectGuess - 1].classList.remove('show-circle');
		wrong[incorrectGuess - 1].classList.add('hide-circle');
		manImage.setAttribute('src', `images/hangman${incorrectGuess}.png`);
		incorrectGuess -= 1;
	}

	// checking if every letter has been guessed
	const checkArr = [];
	guessLetter.forEach((guess) => {
		checkArr.push(guess.innerText);
	});

	if (checkArr.join('') === keyWord) {
		modal.classList.remove('hidden');
		gameoverAlert.classList.remove('hidden');
		form.classList.add('hidden');
		gameoverText.innerText = '';
		gameoverText.innerText = 'Game Over You Win!';
		changeScore();
	}

	if (incorrectGuess === 0) {
		modal.classList.remove('hidden');
		gameoverAlert.classList.remove('hidden');
		form.classList.add('hidden');
		gameoverText.innerText = '';
		gameoverText.innerText = 'Game Over You Lose!';
	}
}

function changeScore() {
	let playerOneScore = parseInt(playerScore[0].innerText);
	let playerTwoScore = parseInt(playerScore[1].innerText);

	if (countTurns % 2 === 1) {
		playerOneScore += 5;
		playerScore[0].innerText = `${playerOneScore}`;
	} else {
		playerTwoScore += 5;
		playerScore[1].innerText = `${playerTwoScore}`;
	}
}
