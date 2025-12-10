const startBtn = document.getElementById("startButton");
const resetBtn = document.getElementById("resetButton");
const stopBtn = document.getElementById("stopButton");
const watch = document.getElementById("watch");

let timer = null;
let startTime = 0;
let isRunning = false;
let elapsedTime = 0;

function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hour = Math.floor(elapsedTime / (1000 * 60 * 60));
    let min = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let sec = Math.floor((elapsedTime / 1000) % 60);
    let millSec = Math.floor((elapsedTime % 1000) / 10);

    watch.textContent = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}:${String(millSec).padStart(2, '0')}`;
}

startBtn.onclick = function () {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;

    }
};

resetBtn.onclick = function () {

    clearInterval(timer);
    timer = null;
    startTime = 0;
    elapsedTime=0;
    isRunning = false;
    watch.textContent = `00:00:00:00`;


};

stopBtn.onclick = function () {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        timer=null;
        isRunning = false;
        update();
    }
};



