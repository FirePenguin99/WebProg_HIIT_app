const currentWorkout = {
    name: "Workout 2",
    seconds: 3*60,
    difficulty: "medium",
    exercises: [
        {
            name: "sprint",
            duration: 0.5*60,
            difficulty: "hard"
        },
        {
            name: "light jog",
            duration: 2*60,
            difficulty: "easy"
        },
        {
            name: "sprint",
            duration: 0.5*60,
            difficulty: "hard"
        }
    ]
}

let currentExerciseCount = 0;
let workoutTime = 0;
let currentExerciseTime = 0;
let timerState = "paused";

const buttonRef = document.querySelector("#startAndStop");
const exerciseRef = document.querySelector(".exercise");
const timerRef = document.querySelector("#timer");

document.querySelector("#exercise_name").textContent = '"' + currentWorkout.name + '"';


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
    exerciseRef.textContent = currentWorkout.exercises[currentExerciseCount].name;

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

updateExercise();
buttonRef.addEventListener("click", startAndStop);