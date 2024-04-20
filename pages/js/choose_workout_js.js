let workoutList = [];

let pageNumber = 0;
const mainRef = document.querySelector('#main');

let optionSelectedWorkout;

async function loadUserWorkouts() {
  const response = await fetch('workouts/' + sessionStorage.getItem('userId'));
  let workouts;
  if (response.ok) {
    workouts = await response.json();

    console.log(workouts);

    parseWorkouts(workouts);
  } else {
    workouts = ['failed to load messages :-('];
  }
}

function parseWorkouts(obj) {
  for (const workout of obj) {
    workoutList.push(workout);
  }

  refreshList();
}

function refreshList() {
  const numberOfNodes = mainRef.children.length;

  // clear list
  for (let i = 3; i < numberOfNodes; i++) {
    mainRef.removeChild(mainRef.children[3]); // this is constantly 2 as the next child fills the old position of the removed child
  }

  // remake list
  for (let i = 0 + (pageNumber * 7); i < (pageNumber + 1) * 7; i++) {
    if (i <= workoutList.length - 1) {
      // create element
      const workoutElem = document.createElement('a');
      workoutElem.textContent = workoutList[i].name;
      workoutElem.href = `/workout_page.html#${workoutList[i].name}`;

      // apply correct difficulty colour
      if (workoutList[i].difficulty === 'easy') {
        workoutElem.classList.add('workoutEasy');
      } else if (workoutList[i].difficulty === 'medium') {
        workoutElem.classList.add('workoutMedium');
      } else {
        workoutElem.classList.add('workoutHard');
      }

      // create accompanying time element
      const time = document.createElement('p');
      time.classList.add('workoutTime');
      time.textContent = workoutList[i].seconds / 60;

      // create set Daily Workout button
      const settingsButton = document.createElement('p');
      settingsButton.classList.add('workoutSettings');
      settingsButton.textContent = 'Options';
      settingsButton.addEventListener('click', () => { openOptions(workoutList[i]); });

      mainRef.append(workoutElem);
      mainRef.append(time);
      mainRef.append(settingsButton);
    } else {
      // if no workouts to be displayed:
      const blank = document.createElement('p');
      blank.classList.add('workoutEmpty');
      mainRef.append(blank);

      const blank2 = document.createElement('p');
      blank2.classList.add('workoutEmpty');
      mainRef.append(blank2);

      const blank3 = document.createElement('p');
      blank3.classList.add('workoutEmpty');
      mainRef.append(blank3);
    }
  }
}

function decrementPage() {
  if (pageNumber > 0) {
    pageNumber -= 1;
    refreshList();
  }
}
function incrementPage() {
  if (workoutList[((pageNumber + 1) * 7)]) {
    pageNumber += 1;
    refreshList();
  }
}

function openOptions(_workout) {
  optionSelectedWorkout = _workout;
  document.querySelector('#settingsContainer').classList.remove('hidden');
  document.querySelector('#workoutName').textContent = '"' + optionSelectedWorkout.name + '"';
}

function closeOptions() {
  document.querySelector('#settingsContainer').classList.add('hidden');
}

async function deleteSelectedWorkout() {
  const payload = {
    id: sessionStorage.getItem('userId'),
    workoutName: optionSelectedWorkout.name,
  };

  const response = await fetch('deleteWorkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    console.log('huzzar! : ' + optionSelectedWorkout);
    workoutList = await response.json();
    refreshList();
    document.querySelector('#settingsContainer').classList.add('hidden');
  } else {
    console.log('failed to send message');
  }

  console.log(workoutList);
}

async function setDailyWorkout() {
  const payload = {
    id: sessionStorage.getItem('userId'),
    daily: optionSelectedWorkout.name,
  };

  const response = await fetch('daily', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    console.log('huzzar!');
    window.location.href = '/workout.html';
  } else {
    console.log('failed to send message');
  }
}

loadUserWorkouts();

document.querySelector('#backList').addEventListener('click', decrementPage);
document.querySelector('#moreList').addEventListener('click', incrementPage);

document.querySelector('#backButton').addEventListener('click', closeOptions);
document.querySelector('#deleteWorkoutButton').addEventListener('click', () => { deleteSelectedWorkout(); });
document.querySelector('#setDailyButton').addEventListener('click', () => { setDailyWorkout(); });
