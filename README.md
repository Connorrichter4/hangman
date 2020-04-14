# Hangman Game

## Project Prompt

Have a player enter a word that will be guessed during the game. The word is then hidden and represented by blank spaces. The second player then chooses letters, which are revealed if present.

## Goals:

- MVP / Bronze:
  - have one player enter in a word
  - if player enters more than one word throw error and do not start game
  - create blank spaces from players word
  - show letters available to guess
  - change background on letters already guessed
  - if correct letter is guessed replace all correct blank spaces with correct letter
  - if wrong letter is guessed begin drawing hangman
  - show guesses remaining
  - if player loses reveal chosen word
- Silver:
  - meet MVP
  - add additional option for single player
  - use dictionary api to select random word for player to guess
  - give extra points for fewer missed guesses
- Gold:
  - create a challenge mode to see how many words a player can guess correctly in a certain amount of time
  - allow players to select different hangman styles \* add help functionality if player becomes stuck

## Tech Used

- HTML5
- CSS
- JavaScript