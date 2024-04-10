const timelineElem = document.querySelector('#timeline');
const timelineList = [
];

let timelinePointer = 0;
let timelineOffset = 0;

const exerciseListElem = document.querySelector('#list');
const exerciseList = [];

let displayedExerciseList = exerciseList;

let pageNumber = 0;

const timerElem = document.querySelector('#timer');
let timerValue = 0;

async function loadExercises() {
  const response = await fetch('exercises');
  let exercises;
  if (response.ok) {
    exercises = await response.json();
    // console.log(workouts);
    parseExercises(exercises);
  } else {
    exercises = ['failed to load messages :-('];
  }
}

function parseExercises(obj) {
  for (const exercise of obj) {
    exerciseList.push(exercise);
  }

  refreshList();
}

function populateExercises() {
  for (let i = 0 + (pageNumber * 8); i < (pageNumber + 1) * 8; i++) {
    const exerciseElem = document.createElement('p');
    exerciseElem.classList.add('exerciseItem');

    if (i <= displayedExerciseList.length - 1) {
      exerciseElem.textContent = displayedExerciseList[i].name;

      if (displayedExerciseList[i].difficulty === 'rest') {
        exerciseElem.classList.add('workoutEasy');
      } else {
        exerciseElem.classList.add('workoutHard');
      }

      exerciseElem.addEventListener('click', addToWorkout);
    }

    exerciseListElem.append(exerciseElem);
  }
}

function refreshList() {
  const numberOfNodes = exerciseListElem.children.length;

  // clear list
  for (let i = 0; i < numberOfNodes; i++) {
    exerciseListElem.removeChild(exerciseListElem.children[0]);
  }

  populateExercises();
}

function incrementPage() {
  if (displayedExerciseList[((pageNumber + 1) * 8)]) {
    pageNumber += 1;
    refreshList();
  }
}
function decrementPage() {
  if (pageNumber > 0) {
    pageNumber -= 1;
    refreshList();
  }
}


function populateTimeline() {
  for (let i = timelineOffset; i < timelineOffset + 4; i++) {
    const exerciseElem = document.createElement('p');
    exerciseElem.classList.add('timelineExercise');

    if (i <= timelineList.length - 1) {
      exerciseElem.textContent = timelineList[i].name;

      if (timelineList[i].difficulty === 'rest') {
        exerciseElem.classList.add('workoutEasy');
      } else {
        exerciseElem.classList.add('workoutHard');
      }
    }

    exerciseElem.addEventListener('click', selectTimeline);

    timelineElem.append(exerciseElem);
  }
}

function refreshTimeline() {
  const numberOfNodes = timelineElem.children.length;

  // clear list
  for (let i = 0; i < numberOfNodes; i++) {
    timelineElem.removeChild(timelineElem.children[0]);
  }

  populateTimeline();

  updateSelected();
}

function addToWorkout(elem) {
  let _class = '';
  if (elem.target.classList[elem.target.classList.length - 1] === 'workoutHard') {
    _class = 'intense';
  } else {
    _class = 'rest';
  }

  timelineList.splice((timelineOffset + timelinePointer + 1), 0, {
    name: elem.target.textContent,
    difficulty: _class,
  });

  // when selected position is already where the new exercise would go. therefore incrementing pointer would move selection to the right of new exercise
  if (timelineList.length - 1 !== 0) {
    timelinePointer += 1;
  }

  // scroll right when new excercise goes outside timeline view
  if (timelinePointer > 3) {
    incrementTimeline();
  }

  refreshTimeline();
}

function incrementTimeline() {
  timelineOffset += 1;
  timelinePointer += -1;
  refreshTimeline();
}
function decrementTimeline() {
  if (timelineOffset > 0) {
    timelineOffset -= 1;
    timelinePointer += 1;
    refreshTimeline();
  }
}


function selectTimeline(elem) {
  const tempArr = [];

  for (let i = 0; i < timelineElem.children.length; i++) {
    tempArr.push(timelineElem.children[i]);
  }

  const index = tempArr.indexOf(elem.target);

  timelinePointer = index;

  console.log(timelinePointer);
  updateSelected();
}

function updateSelected(offset) {
  console.log(timelinePointer);

  for (let i = 0; i < timelineElem.children.length; i++) {
    timelineElem.children[i].classList.remove('selected');
  }

  if (offset == null) { // keep this "==" not "==="
    offset = 0;
  }

  timelinePointer += offset;


  if (timelinePointer < 0 || timelinePointer > 3) { // stops errors occuring when the selected exercise is moved left or right outside of the view of 4 exercises
    return;
  }

  const selectedElem = timelineElem.children[timelinePointer];

  selectedElem.classList.add('selected');

  timerValue = (timelinePointer + timelineOffset) * 30;
  updateTimer();
}


function updateTimer() {
  let frontTimerValue = Math.floor(timerValue / 60);
  if ((frontTimerValue + '').length === 1) {
    frontTimerValue = '0' + frontTimerValue;
  }

  let backTimerValue = timerValue % 60;
  if ((backTimerValue + '').length === 1) {
    backTimerValue = '0' + backTimerValue;
  }

  timerElem.textContent = frontTimerValue + ':' + backTimerValue;
}


function deleteSelectedExercise() {
  timelineList.splice(timelineOffset + timelinePointer, 1);
  timelinePointer += -1;
  refreshTimeline();
}


function searchNameAndIntensity() {
  let nameValue = document.querySelector('#nameInput').value;
  nameValue = nameValue.toLowerCase();
  let intensityValue = document.querySelector('#intensityInput').value;
  intensityValue = intensityValue.toLowerCase();

  const searchedExerciseList = [];

  for (let i = 0; i < exerciseList.length; i++) {
    if ((exerciseList[i].difficulty).includes(intensityValue)) {
      if ((exerciseList[i].name).includes(nameValue)) {
        searchedExerciseList.push(exerciseList[i]);
      }
    }
  }

  displayedExerciseList = searchedExerciseList;

  console.log(searchedExerciseList);

  refreshList();
}


function openSubmit() {
  document.querySelector('#submitBox').classList.remove('hidden');
}
function closeSubmit() {
  document.querySelector('#submitBox').classList.add('hidden');
}

function finaliseExercise() {
  const finalExerciseList = [];
  let j = 0;

  finalExerciseList.push({
    name: timelineList[0].name,
    duration: 30,
    difficulty: timelineList[0].difficulty,
  });

  for (let i = 1; i < timelineList.length; i++) {
    if (timelineList[i].name === timelineList[i - 1].name) { // if there are multiple instances of the same exercise connected to each other,
      finalExerciseList[j].duration += 30; // merge them and 30 seconds
    } else {
      finalExerciseList.push({
        name: timelineList[i].name,
        duration: 30,
        difficulty: timelineList[i].difficulty,
      });

      j += 1;
    }
  }

  console.log(timelineList);
  console.log(finalExerciseList);

  return finalExerciseList;
}
function calculateSumDuration(arr) {
  let sumDuration = 0;
  for (let i = 0; i < arr.length; i++) {
    sumDuration += arr[i].duration;
  }

  return sumDuration;
}
function calculateDifficultyFactor(arr, sumDuration) {
  let sumDifficulty = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].difficulty === 'intense') {
      sumDifficulty += 1 * (arr[i].duration / 30);
    } else {
      sumDifficulty += 0;
    }
  }

  const difficultyFactor = (sumDifficulty / (sumDuration / 30));

  console.log(difficultyFactor);

  if (difficultyFactor > 0.25) {
    if (difficultyFactor > 0.5) {
      if (difficultyFactor >= 0.75) {
        return 'hard';
      } else { return 'medium'; }
    } else { return 'medium'; }
  } else { return 'easy'; }
}

async function submitExercise() {
  const finalName = document.querySelector('#submitName').value;
  const finalExerciseList = finaliseExercise();
  const finalLength = calculateSumDuration(finalExerciseList);
  const finalDifficulty = calculateDifficultyFactor(finalExerciseList, finalLength);

  const finalObj = {
    name: finalName,
    seconds: finalLength,
    difficulty: finalDifficulty,
    exercises: finalExerciseList,
  };

  console.log(finalObj);

  const payload = finalObj;

  const response = await fetch('custom_workout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    console.log('huzzar!');
  } else {
    console.log('failed to send message');
  }
}

loadExercises();

refreshList();
refreshTimeline();
updateSelected();

document.querySelector('#backList').addEventListener('click', decrementPage);
document.querySelector('#moreList').addEventListener('click', incrementPage);

document.querySelector('#backTimeline').addEventListener('click', decrementTimeline);
document.querySelector('#moreTimeline').addEventListener('click', incrementTimeline);

document.querySelector('#deleteButton').addEventListener('click', deleteSelectedExercise);

document.querySelector('#nameInput').addEventListener('input', searchNameAndIntensity);
document.querySelector('#intensityInput').addEventListener('input', searchNameAndIntensity);

document.querySelector('#submit').addEventListener('click', openSubmit);
document.querySelector('#submitBack').addEventListener('click', closeSubmit);

document.querySelector('#submitDone').addEventListener('click', submitExercise);
