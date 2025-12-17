const display = document.getElementById('timer-display');
const minutesInput = document.getElementById('input-minutes');
const secondsInput = document.getElementById('input-seconds');
const messageInput = document.getElementById('input-message');
const loopCheckbox = document.getElementById('check-loop');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
let timerInterval = null; 
let totalSeconds = 0;    
let isPaused = false;     
function updateDisplay() {
    let m = Math.floor(totalSeconds / 60);
    let s = totalSeconds % 60;

    let mString = m.toString().padStart(2, '0');
    let sString = s.toString().padStart(2, '0');

    display.textContent = `${mString}:${sString}`;
    document.title = `${mString}:${sString} - Таймер`;
}
function tick() {
    if (totalSeconds > 0) {
        totalSeconds--;
        updateDisplay();
    } else {
        finishTimer();
    }
}
function startTimer() {
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
    }
    if (isPaused) {
        isPaused = false;
        timerInterval = setInterval(tick, 1000);

        startBtn.disabled = true;
        startBtn.textContent = "Старт";
        return;
    }
    const m = parseInt(minutesInput.value) || 0;
    const s = parseInt(secondsInput.value) || 0;
    totalSeconds = (m * 60) + s;
    if (totalSeconds <= 0) {
        alert("Будь ласка, введіть час!");
        return;
    }
    minutesInput.disabled = true;
    secondsInput.disabled = true;
    startBtn.disabled = true;
    clearInterval(timerInterval);
    updateDisplay();
    timerInterval = setInterval(tick, 1000);
}

function pauseTimer() {
    if (!timerInterval || isPaused) return; 

    clearInterval(timerInterval); 
    isPaused = true;

    startBtn.disabled = false;    
    startBtn.textContent = "Продовжити"; 
}

function stopTimer() {
    clearInterval(timerInterval); 
    timerInterval = null;
    isPaused = false;
    totalSeconds = 0;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    startBtn.disabled = false;
    startBtn.textContent = "Старт";
    let m = parseInt(minutesInput.value) || 0;
    let s = parseInt(secondsInput.value) || 0;
    let mString = m.toString().padStart(2, '0');
    let sString = s.toString().padStart(2, '0');
    display.textContent = `${mString}:${sString}`;
    document.title = "Таймер JS";
}

function finishTimer() {
    clearInterval(timerInterval);
    sendNotification();

    if (loopCheckbox.checked) {
        startTimer(); 
    } else {
        stopTimer(); 
    }
}
function sendNotification() {
    const text = messageInput.value;

    if (!("Notification" in window)) {
        alert(text);
        return;
    }

    if (Notification.permission === "granted") {
        new Notification("Таймер завершено!", {
            body: text,
            icon: "https://img.icons8.com/ios-glyphs/30/000000/time.png",
            requireInteraction: true
        });
    } else {
        alert(text);
    }
}
function checkURLParams() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('min')) minutesInput.value = params.get('min');
    if (params.has('sec')) secondsInput.value = params.get('sec');
    if (params.has('text')) messageInput.value = params.get('text');

    let m = parseInt(minutesInput.value) || 0;
    let s = parseInt(secondsInput.value) || 0;
    let mString = m.toString().padStart(2, '0');
    let sString = s.toString().padStart(2, '0');
    display.textContent = `${mString}:${sString}`;

    if (params.get('start') === 'true') {
        startTimer();
    }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
stopBtn.addEventListener('click', stopTimer);

checkURLParams();