let workoutTimeline = [];
let pageNumber = 0;

let timelinePointer = 0;
let timelineOffset = 0;

const timelineElem = document.querySelector("#timeline");
const timelineList = [
    {
        name: "lunges1",
        difficulty: "intense"
    },
    {
        name: "lunges2",
        difficulty: "rest"
    },
    {
        name: "lunges2",
        difficulty: "rest"
    }
];

const exerciseListElem = document.querySelector("#list");
const exerciseList = [
    {
        name: "lunges1",
        difficulty: "intense"
    },
    {
        name: "lunges2",
        difficulty: "rest"
    },
    {
        name: "lunges3",
        difficulty: "rest"
    },
    {
        name: "lunges4",
        difficulty: "intense"
    },
    {
        name: "lunges5",
        difficulty: "intense"
    },
    {
        name: "lunges6",
        difficulty: "rest"
    },
    {
        name: "lunges7",
        difficulty: "intense"
    },
    {
        name: "idle rest",
        difficulty: "rest"
    },
    {
        name: "intense1",
        difficulty: "intense"
    },
    {
        name: "intense2",
        difficulty: "intense"
    },
    {
        name: "intense3",
        difficulty: "intense"
    }
]

const timerElem = document.querySelector("#timer");
let timerValue = 0;



function populateExercises() {
    for (let i = 0 + (pageNumber*8); i < (pageNumber+1)*8; i++) {
        const exerciseElem = document.createElement("p");
        exerciseElem.classList.add("exerciseItem");

        if (i <= exerciseList.length-1) {
            exerciseElem.textContent = exerciseList[i].name;
            
            if (exerciseList[i].difficulty == "rest") {
                exerciseElem.classList.add("workoutEasy");
            } else {
                exerciseElem.classList.add("workoutHard");
            }

            exerciseElem.addEventListener('click', addToWorkout);
        }

        exerciseListElem.append(exerciseElem);
    }
}

function refreshList() {
    const numberOfNodes = exerciseListElem.children.length;

    //clear list
    for (let i = 0; i < numberOfNodes; i++) {
        exerciseListElem.removeChild(exerciseListElem.children[0]);
    }

    populateExercises();
}

function incrementPage() {
    if (exerciseList[((pageNumber+1)*8)]) {
        pageNumber +=1;
        refreshList();
    }
}
function decrementPage() {
    if (pageNumber > 0) {
        pageNumber -=1;
        refreshList();
    }
}


function populateTimeline() {
    for (let i = timelineOffset; i < timelineOffset + 4; i++) {
        const exerciseElem = document.createElement("p");
        exerciseElem.classList.add("timelineExercise");

        if (i <= timelineList.length-1) {
            exerciseElem.textContent = timelineList[i].name;
            
            if (timelineList[i].difficulty == "rest") {
                exerciseElem.classList.add("workoutEasy");
            } else {
                exerciseElem.classList.add("workoutHard");
            }
        }

        timelineElem.append(exerciseElem);
    }
}

function refreshTimeline() {
    const numberOfNodes = timelineElem.children.length;

    //clear list
    for (let i = 0; i < numberOfNodes; i++) {
        timelineElem.removeChild(timelineElem.children[0]);
    }

    populateTimeline();
}

function addToWorkout(elem) {
    console.log(elem.target.classList[elem.target.classList.length - 1]);
    
    let _class = "";
    if (elem.target.classList[elem.target.classList.length - 1] == "workoutHard") {
        _class = "intense";
    } else {
        _class = "rest";
    }

    timelineList.push({
        name: elem.target.textContent,
        difficulty: _class
    })

    refreshTimeline();
}

function incrementTimeline() {
    timelineOffset += 1;
    refreshTimeline();
}
function decrementTimeline() {
    if (timelineOffset > 0) {
        timelineOffset -= 1;
        refreshTimeline();
    }
}



function updateTimer() {
    let frontTimerValue = Math.floor(timerValue / 60)
    if ((frontTimerValue + "").length == 1) {
        frontTimerValue = "0" + frontTimerValue;
    }

    let backTimerValue = timerValue % 60
    if ((backTimerValue + "").length == 1) {
        backTimerValue = "0" + backTimerValue;
    }
    
    timerElem.textContent = frontTimerValue + ":" + backTimerValue
}

refreshList();
refreshTimeline();

document.querySelector("#backList").addEventListener('click', decrementPage);
document.querySelector("#moreList").addEventListener('click', incrementPage);

document.querySelector("#backTimeline").addEventListener('click', decrementTimeline);
document.querySelector("#moreTimeline").addEventListener('click', incrementTimeline);