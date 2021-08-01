// answer = Store a solution, string, as a global variable
//correctGuesses = string of correct letters and dashes
//Array that shows guessed letters

//hangMan(letter) function
    // takes users guess 
    // checks the solution word for indexOf guessed letter 
    // changes the letter in correct guess string
    // pushes 
    //Takes in a letter

    //Loops over the solution string 

    //If a letter in the solution string matches the input letter, return the index


    //Else, prompts new letter

 //Print board function

    //take the index(es) returned from correct letter(s) function

    //find the letters of the solution string at the index(es) 

    //create new string with a space for each letter in the solution string

    //fill those letters and dashes into the new string

    //console.log()

    //update the hangman variable

//detect win function

    //takes in both hangman (guess) and the solution

    // compares them

    //if the strings are the same = you win

    //when the length of the guessed letters array = 6, YOU LOSE
    //Hangman function(guessedLetter)
    //correct letter function(guessedLetter)
    //print board(indexOfCorrectlyGuessedLetter)
    // detect win(solutionString, guessedString)
'use strict';

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let board = {
    solution: '',
    hiddenWord: '',
    letters: [],
    guesses: 6
}

const resetBoard = () =>{
    let reset = {
        solution: '',
        word: '',
        letters: [],
        guesses: 6,
    }
    return board = reset
}

const createWord = (word) => {
    let chosenWord = word.trim().toUpperCase()
    let alphabet = /^[A-Z]*$/g
    if(!chosenWord.match(alphabet) || chosenWord.length < 3){
        console.log('chosenword:',chosenWord)
        return false
    }
    let splitword = chosenWord.split('').join(' ')
    board.solution = splitword
    board.hiddenWord = splitword.replaceAll(/[A-Z]/g ,'_')
}

const isLegal = (letter) =>{
    let alphabet = /[A-Z]/g
    if( letter.match(alphabet) && letter.length == 1 && !board.letters.includes(letter)){
        return true
    }
    else{
         console.log('\n Try again') 
    }
}


const hangMan = (guess) => {
    let letter = guess.trim().toUpperCase()
    let wordArray = board.hiddenWord.split('')

    if(isLegal(letter)){
        for(let i = 0; i < board.solution.length; i ++) {
            if(board.solution[i] == letter){
                wordArray[i] = letter
            }
        }
        
    if(!board.solution.includes(letter)){
        board.guesses -=1
    }    
        board.letters.push(letter)
        board.hiddenWord = wordArray.join('')
    }
}

const winOrLose = () =>{
    // Win
    if(board.hiddenWord == board.solution){
        printBoard()
        console.log('You got it!')
        return true
    }
    // Lose
    else if(!board.guesses){
        printBoard()
        console.log('Sorry, you lost.')
        return true
    }
}

const printBoard = () => {
        console.log('\n')
        console.log('Secret Word:', board.hiddenWord)
        console.log('Letter guesses so far:', board.letters.join(' '))
        console.log('Wrong guesses remaining:', board.guesses)
}

const startGame = () =>{
    return new Promise((resolve) => {
        console.log("player 1 choose word:")
        rl.question('word:', (word) => {
            createWord(word)
            console.log('\n','\n','\n','\n','\n','\n','\n','\n','\n','\n','\n','\n') 
            if(createWord(word) == false){
                resetBoard()
                console.log('Please choose another word. hint: Create a word with letters a-z. Use 3 or more letters with no spaces')
                return gameOn()
            }
            resolve();
        });  
    });
}

const player2Turn = () => {
    return new Promise((resolve) => {
        printBoard();
        console.log('Player 2 Choose Letter:')
        rl.question('Letter:', (guess) => {
            hangMan(guess);
            if(winOrLose()){
                resetBoard()
                return gameOn()
            }
            player2Turn()
        
            resolve()
        });
    });
}

const gameOn = async () => {
    await startGame()
    await player2Turn()

}

gameOn();
    

