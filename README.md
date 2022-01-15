## Introduction

This is traditional hangman game implemented with Node.js and React.js. When starting the game, you have 10 guesses. Program randomly picks up word to guess from existing list of words. Each letter guess costs you 1 hitpoint. When you reach 0 - you are eliminated and can start over.
If you want to add new words, simply go to Hangman directory to app.js and add more string elements to "words" array.
You can guess letters in word by either typing letter in an input field and pressing "Guess" or pressing letter's keys in virtual keyboard.

## How to launch

1. Clone the repository
2. Install node if you do not have it already(I was using 16.13.2 version)
3. In the Hangman directory run "npm install" to install all required dependencies for back-end
4. In the Hangman directory run "node app.js" to start back-end server on localhost:9000
5. In the client directory run "npm install" to install required dependencies for front-end
6. In the client directory run "npm start" to start front-end server on localhost:3000
7. Go to locahost:3000 and start playing!
