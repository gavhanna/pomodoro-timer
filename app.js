(function(){
  let workLength = 25;
  let breakLength = 5;
  let timerPaused = true;
  let currentMins = workLength;
  let currentSecs = 0;
  let timerInterval;
  let workTimerActive = true;
  let timerActive = false;
  const startPause = document.getElementById("startPause");
  const title = document.getElementById("current-title");
  const breakTime = document.getElementById("breakTime");
  const workTime = document.getElementById("workTime");
  const breakMinus = document.getElementById("breakMinus");
  const breakPlus = document.getElementById("breakPlus");
  const minuteDisplay = document.getElementById("minutes");
  const secondDisplay = document.getElementById("seconds");
  const timerCircle = document.getElementById("timerCircle");
  const counters = document.getElementById("counters");
  const bell = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");



  breakTime.innerText = breakLength;
  workTime.innerText = workLength;
  minuteDisplay.innerText = workLength;

  breakMinus.addEventListener("click", timeChange, false);
  breakPlus.addEventListener("click", timeChange, false);
  workMinus.addEventListener("click", timeChange, false);
  workPlus.addEventListener("click", timeChange, false);
  timerCircle.addEventListener("click", startTimer, false);
  
  
  function timeChange(e) {
    if (e.target.dataset.timer === "break") {
      if (e.target.dataset.type === "decrement") {
        breakLength--;
        if (breakLength < 1) {
          breakLength = 1;
        }
      } else if (e.target.dataset.type === "increment") {
        breakLength++;
      }
      breakTime.innerText = breakLength;
    } else if (e.target.dataset.timer === "work") {
      if (e.target.dataset.type === "decrement") {
        workLength--;
        if (workLength < 1) {
          workLength = 1;
        }
      } else if (e.target.dataset.type === "increment") {
        workLength++;
      }
      workTime.innerText = workLength;
      minuteDisplay.innerText = workLength;
    }
  }

  function startTimer(e) {
    counters.style.display = "none";
    timerPaused = !timerPaused;
    startPause.style.visibility = "visible";
    if (timerPaused) {
      startPause.innerText = "Click to resume";
      timerCircle.style.background = "radial-gradient(ellipse at center, #fcfbe3 1%, #ECF802 100%)";
    } else {
      startPause.innerText = "Click to pause";
      timerCircle.style.background = "radial-gradient(ellipse at center, #fcfbe3 1%, #ff0000 100%)";
    }

    if (!timerActive) {
      if (workTimerActive) {
        timerCircle.style.background = "radial-gradient(ellipse at center, #fcfbe3 1%, #ff0000 100%)";
        currentMins = workLength;
        currentSecs = 0;
        timerInactive = false;
        title.innerText = "Work!";
        console.log("Got this far");
        timerActive = true;
        timerPaused = false;
      } else {
        timerCircle.style.background = "radial-gradient(ellipse at center, #fcfbe3 1%, #02AD0B 100%)";
        currentMins = breakLength;
        currentSecs = 0;
        title.innerText = "Break Time!"
        timerActive = true;
        timerFunc();
        timerPaused = !timerPaused;
      }
    }

    if (!timerPaused) {
      timerInterval = setInterval(timerFunc, 1000);
    } else if (timerPaused) {
      clearInterval(timerInterval);
    }

    function timerFunc() {
      if (currentSecs === 0) {
        currentSecs = 59;
        currentMins--;
      } else {
        currentSecs--;
      }
      minuteDisplay.innerText = currentMins < 10 ? "0" + currentMins : currentMins;
      secondDisplay.innerText = currentSecs < 10 ? "0" + currentSecs : currentSecs;
      console.log(currentMins, currentSecs);
      if (currentMins === 0 && currentSecs === 0) {
        clearInterval(timerInterval);
        timerActive = false;
        bell.play();
        setTimeout(() => {
          workTimerActive = !workTimerActive;
          startTimer();
        }, 1000);
      }
    }
    
    console.log(workTimerActive, timerActive);
    
  }


})();