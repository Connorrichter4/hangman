// getting the blank space and letter space div
const blankSpaces = document.querySelector('.blank-spaces');
const letterSpaces = document.querySelector('.letter-spaces');
// getting the word entered by user
const inputWord = document.querySelector('.player-input');
const submitButton = document.querySelector('.submit-button');
const modal = document.querySelector('.modal');

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

// loop through letters array and create divs for all of them
for (let i = 0; i < letters.length; i++) {
	const divElement = document.createElement('div');
	divElement.innerText = letters[i];
	divElement.classList.add('letter-button');
	divElement.setAttribute('id', letters[i]);
	letterSpaces.appendChild(divElement);
}

// functionality for letter buttons
letterSpaces.addEventListener('click', handleLetterSelection);

function handleLetterSelection() {
	letterSelected = event.target.id;
	if (event.target.classList.contains('letter-button')) {
		console.log(`letter selected: ${letterSelected}`);
		checkLetter(letterSelected);
	}
}

//add event listener to submit button
submitButton.addEventListener('click', handleUserInput);

function handleUserInput() {
	event.preventDefault();
	// save user input value as a const
	const word = inputWord.value;
	// check if the word is empty
	if (word !== '') {
		// to hide modal display
		modal.classList.add('hidden');
		// call function to display underscores
		handleUnderscores(word);
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
		divElement.setAttribute('id', wordArr[i].toUpperCase());
		blankSpaces.appendChild(divElement);
	}
}

function checkLetter(letter) {
	const guessLetter = Array.from(document.querySelectorAll('.unknown-letter'));
	guessLetter.some((guess) => {
		if(guess.id === letter){
            guess.innerText = letter;
        }
	});
}
