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
let incorrectGuess = 5;
// getting the player scores

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
	// reset the incorrectGuess to 5
	incorrectGuess = 5;

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

nextPlayerButton.addEventListener('click', nextPlayer);

function nextPlayer() {
	createBoard();
	// increment count turns
	countTurns += 1;
	if (form.classList.contains('hidden')) {
		form.classList.remove('hidden');
		gameoverAlert.classList.add('hidden');
		clearPreviousBoard(blankSpaces);
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
	console.log(keyWord);
	// check if the word is empty
	if (keyWord !== '') {
		// to hide modal display
		modal.classList.add('hidden');
		// call function to display underscores
		handleUnderscores(keyWord);
	} else {
		console.log('error');
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
		console.log('wrong');
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
	}

	if (incorrectGuess === 0) {
		modal.classList.remove('hidden');
		gameoverAlert.classList.remove('hidden');
		form.classList.add('hidden');
		gameoverText.innerText = '';
		gameoverText.innerText = 'Game Over You Lose!';
	}
}
