let count = 0;
let score;
let resetButton;
let resetScore;

let highScore = localStorage.getItem('highScore') || 0;

let computer = Math.floor(Math.random() * 100 + 1);


const btn = document.querySelector('.btn');
const box = document.querySelector('.box');
const submit = document.querySelector('.submit');
const userInput = document.querySelector('.userInput');
const text = document.querySelector('.text');
const footer=document.querySelector('.footer');


document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault(); 
        compute();
    }
});

submit.addEventListener('click', function(e) {
    e.preventDefault(); 
    compute();
});

function compute() {
    const userGuess = parseInt(userInput.value);
    if (isNaN(userGuess) || userGuess < 0 || userGuess > 100) {
        text.style.backgroundColor = "red";
        text.textContent = `Invalid input. Please enter a number between 0 and 100.`;
        userInput.value = ''; 
    } else {
        checkGuess(userGuess);
    }
}

function checkGuess(userGuess) {
    if (userGuess === computer) {
        text.style.backgroundColor = "lightgreen";
        text.textContent = `Congrats!! You WON. ${userGuess} is the correct number.`;
        count+=100;
        Score();
        bestScore();
        setGameOver();
    } 

    else if (userGuess < computer) {
        text.style.backgroundColor = "lightcoral";
        text.textContent = `Wrong! ${userGuess} is too low.`;
        count-=5;
    }
     else if (userGuess > computer) {
        text.style.backgroundColor = "lightcoral";
        text.textContent = `Wrong! ${userGuess} is too high.`;
        count-=5;
    }
    userInput.value = ''; 
    userInput.focus(); 
}


function setGameOver() {
    userInput.disabled = true;
    submit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    btn.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
    

    resetScore = document.createElement('button');
    resetScore.textContent = 'Reset High Score';
    btn.appendChild(resetScore);
    resetScore.addEventListener('click', resetbestScore);
    
}


function resetGame() {
    const resetParas = document.querySelectorAll('.result');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }
    resetButton.parentNode.removeChild(resetButton);
    score.parentNode.removeChild(score);
    resetScore.parentNode.removeChild(resetScore)
    userInput.disabled = false;
    submit.disabled = false;
    userInput.value = '';
    userInput.focus();
    text.textContent = ''; 
    text.style.backgroundColor = 'white';
    computer = Math.floor(Math.random() * 100 + 1);
    count = 0;
}

function bestScore() {
    if (count >highScore) {
        highScore = count;
        localStorage.setItem('highScore', highScore);
        initialHighScoreDisplay.textContent = `Best Score: ${highScore}`;
    
    }
}

function Score() {
    score = document.createElement('div');
    score.className = 'result';
    score.textContent = `score: ${count}`;
    box.appendChild(score);
}

const initialHighScoreDisplay = document.createElement('div');
initialHighScoreDisplay.className = 'bestScore';
initialHighScoreDisplay.textContent = `Best Score: ${highScore}`;
box.appendChild(initialHighScoreDisplay)


function resetbestScore(e) {
    e.preventDefault(); 
    localStorage.clear();
    initialHighScoreDisplay.textContent = "Best Score: 0";
    resetGame();

}
