let score = 0;
let currentQuestion = 0;
let timer;
const totalQuestions = 10;
const questionTime = 5; // Each question lasts for 5 seconds

// Generate 2 random numbers and display them on the screen
function generateRandomNumbers() {
    const num1 = Math.floor(Math.random() * 100); // Random number between 0 and 99
    const num2 = Math.floor(Math.random() * 100); // Random number between 0 and 99
    document.getElementById('number1').innerText = num1;
    document.getElementById('number2').innerText = num2;
}

// Check the user's answer
function checkRelation(operator) {
    const num1 = parseInt(document.getElementById('number1').innerText);
    const num2 = parseInt(document.getElementById('number2').innerText);

    let isCorrect = false;
    if (operator === 'greater-than' && num1 > num2) {
        isCorrect = true;
    } else if (operator === 'equal-to' && num1 === num2) {
        isCorrect = true;
    } else if (operator === 'lesser-than' && num1 < num2) {
        isCorrect = true;
    }

    if (isCorrect) {
        score++;
    }
    nextQuestion();
}

// Handle the next question
function nextQuestion() {
    clearInterval(timer);
    currentQuestion++;
    
    if (currentQuestion < totalQuestions) {
        generateRandomNumbers();
        startTimer();
    } else {
        showScore();
    }
}

// Start the timer for each question
function startTimer() {
    let timeLeft = questionTime;
    const timerElement = document.getElementById('timer');
    timerElement.innerText = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        timerElement.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

// Show the final score
function showScore() {
    localStorage.setItem('score', score);
    window.location.href = 'gameover.html';
}

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    generateRandomNumbers();
    startTimer();

    document.getElementById('greater-than').addEventListener('click', function() {
        checkRelation('greater-than');
    });
    document.getElementById('equal-to').addEventListener('click', function() {
        checkRelation('equal-to');
    });
    document.getElementById('lesser-than').addEventListener('click', function() {
        checkRelation('lesser-than');
    });
});
