let interval;
let timeLeft = 0;
let timerRunning = false;
let workDuration = 25; 
let breakDuration = 5; 
let isWorkInterval = true; 

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timeDisplay = document.querySelector('.time-display');
const progressBar = document.querySelector('.progress-bar');
const workDurationInput = document.getElementById('workDuration');
const breakDurationInput = document.getElementById('breakDuration');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        interval = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    clearInterval(interval);
    timerRunning = false;
}

function resetTimer() {
    clearInterval(interval);
    timerRunning = false;
    if (isWorkInterval) {
        timeLeft = workDuration * 60;
    } else {
        timeLeft = breakDuration * 60;
    }
    updateDisplay();
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        clearInterval(interval);
        timerRunning = false;
        const audio = new Audio('C:\Users\Big O\Documents\FlexiSaf Internship\Major Project\audio\D.wav');
        audio.play();
        if (isWorkInterval) {
            timeLeft = breakDuration * 60; 
            isWorkInterval = false;
        } else {
            timeLeft = workDuration * 60; 
            isWorkInterval = true;
        }
        updateDisplay();
        startTimer(); 
    }
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    
    const totalTime = isWorkInterval ? workDuration * 60 : breakDuration * 60;
    const percentage = ((totalTime - timeLeft) / totalTime) * 100;
    progressBar.style.width = `${percentage}%`;
}


workDurationInput.addEventListener('change', () => {
    workDuration = parseInt(workDurationInput.value);
    if (!timerRunning && isWorkInterval) {
        timeLeft = workDuration * 60;
        updateDisplay();
    }
});

breakDurationInput.addEventListener('change', () => {
    breakDuration = parseInt(breakDurationInput.value);
    if (!timerRunning && !isWorkInterval) {
        timeLeft = breakDuration * 60;
        updateDisplay();
    }
});
