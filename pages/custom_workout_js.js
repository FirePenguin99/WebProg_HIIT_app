const timelineElem = document.querySelector("#timeline");
const timelineList = [
];

let timelinePointer = 0;
let timelineOffset = 0;

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

let displayedExerciseList = exerciseList;

let pageNumber = 0;

const timerElem = document.querySelector("#timer");
let timerValue = 0;



function populateExercises() {
    for (let i = 0 + (pageNumber*8); i < (pageNumber+1)*8; i++) {
        const exerciseElem = document.createElement("p");
        exerciseElem.classList.add("exerciseItem");

        if (i <= displayedExerciseList.length-1) {
            exerciseElem.textContent = displayedExerciseList[i].name;
            
            if (displayedExerciseList[i].difficulty == "rest") {
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
    if (displayedExerciseList[((pageNumber+1)*8)]) {
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

        exerciseElem.addEventListener('click', selectTimeline);

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
    let _class = "";
    if (elem.target.classList[elem.target.classList.length - 1] == "workoutHard") {
        _class = "intense";
    } else {
        _class = "rest";
    }


    timelineList.splice(timelineOffset + timelinePointer + 1, 0, {
        name: elem.target.textContent,
        difficulty: _class
    })

    timelinePointer = timelinePointer + 1;

    console.log(timelineElem.children[timelinePointer]);
    console.log(timelinePointer);   

    updateSelected();

    refreshTimeline();
}

function incrementTimeline() {
    timelineOffset += 1;
    refreshTimeline();
    updateSelected(-1);
}
function decrementTimeline() {
    if (timelineOffset > 0) {
        timelineOffset -= 1;
        refreshTimeline();
        updateSelected(1);
    }
}


function selectTimeline(elem) {
    const tempArr = [];

    for (let i = 0; i < timelineElem.children.length; i++) {
        tempArr.push(timelineElem.children[i]);
    }

    let index = tempArr.indexOf(elem.target);

    timelinePointer = index;

    console.log(timelinePointer);
    updateSelected();
}

function updateSelected(offset) {
    for (let i = 0; i < timelineElem.children.length; i++) {
        timelineElem.children[i].classList.remove("selected");
    }

    if (offset == null) {
        offset = 0;
    }

    timelinePointer += offset;

    if (timelinePointer < 0 || timelinePointer > 3) { // stops errors occuring when the selected exercise is moved left or right outside of the view of 4 exercises
        return;
    }

    let selectedElem = timelineElem.children[timelinePointer];
    // console.log(selectedElem);

    selectedElem.classList.add("selected");

    timerValue = (timelinePointer + timelineOffset) * 30;
    updateTimer();
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


function deleteSelectedExercise() {
    timelineList.splice(timelineOffset + timelinePointer, 1);
    timelinePointer += -1;
    refreshTimeline();
    updateSelected();
}

function searchName() {
    nameValue = document.querySelector("#nameInput").value

    const searchedExerciseList = [];
    
    for (let i = 0; i < exerciseList.length; i++) {
        if ( (exerciseList[i].name).includes(nameValue) ) {
            searchedExerciseList.push(exerciseList[i]);
        }
    }

    displayedExerciseList = searchedExerciseList;

    console.log(searchedExerciseList);

    refreshList();
}

refreshList();
refreshTimeline();
updateSelected();

document.querySelector("#backList").addEventListener('click', decrementPage);
document.querySelector("#moreList").addEventListener('click', incrementPage);

document.querySelector("#backTimeline").addEventListener('click', decrementTimeline);
document.querySelector("#moreTimeline").addEventListener('click', incrementTimeline);

document.querySelector("#deleteButton").addEventListener('click', deleteSelectedExercise);

document.querySelector("#nameInput").addEventListener('input', searchName);