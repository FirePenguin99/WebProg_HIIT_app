let currentWorkout;

let currentExerciseCount = 0;
let workoutTime = 0;
let currentExerciseTime = 0;
let timerState = "paused";

const buttonRef = document.querySelector("#startAndStop");
const exerciseRef = document.querySelector(".exercise");
const timerRef = document.querySelector("#timer");


async function loadWorkout() {
    const name = window.location.hash.substring(1);
    console.log(name);
    const response = await fetch(`workouts/${name}`);

    console.log(response);

    if (response.ok) {
        currentWorkout = await response.json();
        console.log(currentWorkout);
    } else {
        currentWorkout = { msg: 'failed to load messages :-(' };
    }
    
    document.querySelector("#exercise_name").textContent = '"' + currentWorkout.name + '"';

    updateExercise();
}

function startAndStop() {
    if (timerState == "paused") {
        timerState = "started";
        startExercise();

    } else if (timerState == "started") {
        timerState = "paused";
        stopExercise();
    }
}

function startExercise() {
    setTimeout(incrementTime, 1000);
    // nextExercise();

    buttonRef.classList.remove(buttonRef.classList[1]);

    buttonRef.textContent = "Stop";
    buttonRef.classList.add("stop");
}
function stopExercise() {
    buttonRef.classList.remove(buttonRef.classList[1]);

    buttonRef.textContent = "Resume";
    buttonRef.classList.add("start");
}


function updateExercise() {
    exerciseRef.textContent = currentWorkout.exercises[currentExerciseCount].name + " for " + currentWorkout.exercises[currentExerciseCount].duration + " seconds";

    exerciseRef.classList.remove(exerciseRef.classList[1]);

    if (currentWorkout.exercises[currentExerciseCount].difficulty == "easy") {
        exerciseRef.classList.add("workoutEasy");
    } else if (currentWorkout.exercises[currentExerciseCount].difficulty == "medium") {
        exerciseRef.classList.add("workoutMedium");
    } else {
        exerciseRef.classList.add("workoutHard");
    }
}

function nextExercise() {
    currentExerciseCount += 1;
    
    if (workoutTime == currentWorkout.seconds){
        exerciseRef.textContent = "Exercise Over!"
        exerciseRef.classList.remove(exerciseRef.classList[1]);
    } else {
        currentExerciseTime = 0;
        updateExercise();
    }

}


function incrementTime() {
    if (workoutTime >= currentWorkout.seconds) {
        return;
    }

    workoutTime +=1;
    currentExerciseTime +=1;

    console.log(currentExerciseTime);

    updateTimer();

    if (currentExerciseTime == currentWorkout.exercises[currentExerciseCount].duration) {
        nextExercise();
    }
    
    if (timerState == "started") {
        setTimeout(incrementTime, 1000);    
    }
}

function updateTimer() {
    let frontTimerValue = Math.floor(workoutTime / 60)
    if ((frontTimerValue + "").length == 1) {
        frontTimerValue = "0" + frontTimerValue;
    }

    let backTimerValue = workoutTime % 60
    if ((backTimerValue + "").length == 1) {
        backTimerValue = "0" + backTimerValue;
    }
    
    timerRef.textContent = frontTimerValue + ":" + backTimerValue
}

loadWorkout();

buttonRef.addEventListener("click", startAndStop);