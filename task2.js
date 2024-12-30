let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;

const display = document.querySelector('.display');
const lapTimesList = document.getElementById('lap-times');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

function startTimer() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTime, 100);
    running = true;
  }
}

function pauseTimer() {
  if (running) {
    clearInterval(tInterval);
    running = false;
  }
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  display.innerHTML = "00:00:00";
  lapTimesList.innerHTML = '';
  lapCount = 0;
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  display.innerHTML = (hours < 10 ? "0" + hours : hours) + ":" + 
                      (minutes < 10 ? "0" + minutes : minutes) + ":" + 
                      (seconds < 10 ? "0" + seconds : seconds);
}

function addLap() {
  if (running) {
    lapCount++;
    const lapTime = document.createElement('li');
    lapTime.textContent = display.innerHTML;
    lapTimesList.appendChild(lapTime);
  }
}

// Optional: Add lap functionality
document.addEventListener('keydown', function(event) {
  if (event.key === 'l') {
    addLap();
  }
});