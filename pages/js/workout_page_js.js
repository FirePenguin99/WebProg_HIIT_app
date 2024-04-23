let currentWorkout;

let currentExerciseCount = 0;
let workoutTime = 0;
let currentExerciseTime = 0;
let timerState = 'paused';

const buttonRef = document.querySelector('#startAndStop');
const exerciseRef = document.querySelector('#exercise');
const timerRef = document.querySelector('#timer');
const progressBarRef = document.querySelector('#progressBar');
const upNextRef = document.querySelector('#nextExercise');

async function loadWorkout() {
  const name = window.location.hash.substring(1);
  console.log(name);

  const currentUserId = sessionStorage.getItem('userId');

  const response = await fetch('workout/' + currentUserId + '-' + name);

  console.log(response);

  if (response.ok) {
    currentWorkout = await response.json();
    console.log(currentWorkout);
  } else {
    currentWorkout = { msg: 'failed to load messages :-(' };
  }

  document.querySelector('#exercise_name').textContent = '"' + currentWorkout.name + '"';
  document.title = 'Workout: ' + currentWorkout.name;

  updateExercise();
  updateUpNextExercise();
}

function startAndStop() {
  if (timerState === 'paused') {
    timerState = 'started';
    startExercise();
  } else if (timerState === 'started') {
    timerState = 'paused';
    stopExercise();
  }
}

function startExercise() {
  setTimeout(incrementTime, 1000);

  buttonRef.classList.remove(buttonRef.classList[1]);

  buttonRef.textContent = 'Stop';
  buttonRef.classList.add('stop');
}
function stopExercise() {
  buttonRef.classList.remove(buttonRef.classList[1]);

  buttonRef.textContent = 'Resume';
  buttonRef.classList.add('start');
}


function updateExercise() {
  exerciseRef.textContent = currentWorkout.exercises[currentExerciseCount].name + ' for ' + currentWorkout.exercises[currentExerciseCount].duration + ' seconds';

  document.querySelector('#description').textContent = currentWorkout.exercises[currentExerciseCount].description;
  console.log(currentWorkout.exercises[currentExerciseCount].description);

  exerciseRef.classList.remove(exerciseRef.classList[0]);

  if (currentWorkout.exercises[currentExerciseCount].difficulty === 'rest') {
    exerciseRef.classList.add('workoutEasy');
  } else if (currentWorkout.exercises[currentExerciseCount].difficulty === 'intense') {
    exerciseRef.classList.add('workoutHard');
  } else {
    exerciseRef.classList.add('workoutNone');
  }

  updateTimer();
}

function nextExercise() {
  currentExerciseCount += 1;

  if (workoutTime === currentWorkout.seconds) {
    exerciseRef.textContent = 'Exercise Over!';
    exerciseRef.classList.remove(exerciseRef.classList[1]);
  } else {
    currentExerciseTime = 0;
    updateExercise();
    updateUpNextExercise();
  }
}
function updateUpNextExercise() {
  if (!currentWorkout.exercises[currentExerciseCount + 1]) {
    upNextRef.textContent = 'None';
    upNextRef.classList.add('workoutNone');
  } else {
    upNextRef.textContent = currentWorkout.exercises[currentExerciseCount + 1].name + ' for ' + currentWorkout.exercises[currentExerciseCount + 1].duration + ' seconds';

    upNextRef.classList.remove(upNextRef.classList[0]);

    if (currentWorkout.exercises[currentExerciseCount + 1].difficulty === 'rest') {
      upNextRef.classList.add('workoutEasy');
    } else {
      upNextRef.classList.add('workoutHard');
    }
  }
}

function incrementTime() {
  if (workoutTime >= currentWorkout.seconds) {
    return;
  }

  workoutTime += 1;
  currentExerciseTime += 1;

  console.log(currentExerciseTime);

  updateTimer();
  updateProgressBar();

  if (currentExerciseTime === currentWorkout.exercises[currentExerciseCount].duration) {
    nextExercise();
  }

  if (timerState === 'started') {
    setTimeout(incrementTime, 1000);
  }
}

function secondsIntoMinuteFormat(seconds) {
  let frontTimerValue = Math.floor(seconds / 60);
  if ((frontTimerValue + '').length === 1) {
    frontTimerValue = '0' + frontTimerValue;
  }

  let backTimerValue = seconds % 60;
  if ((backTimerValue + '').length === 1) {
    backTimerValue = '0' + backTimerValue;
  }

  return frontTimerValue + ':' + backTimerValue;
}

function updateTimer() {
  timerRef.textContent = secondsIntoMinuteFormat(workoutTime) + '/' + secondsIntoMinuteFormat(currentWorkout.seconds);
}

function updateProgressBar() {
  const percentOfCurrentExercise = currentExerciseTime / currentWorkout.exercises[currentExerciseCount].duration * 100;
  progressBarRef.style.width = percentOfCurrentExercise + '%';
}

loadWorkout();

buttonRef.addEventListener('click', startAndStop);
