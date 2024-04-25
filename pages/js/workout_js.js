let dailyWorkout;

const dailyWorkoutElem = document.querySelector('#daily_workout');

function setHeadingName() {
  document.querySelector('#headingName').textContent = 'Ready to move, ' + sessionStorage.getItem('userName');
}

async function loadDailyWorkout() {
  const response = await fetch('daily/' + sessionStorage.getItem('userId'));
  let dailyObj;
  if (response.ok) {
    dailyObj = await response.json();

    console.log(dailyObj);

    dailyWorkout = dailyObj;
    displayDailyWorkout();
  } else {
    dailyObj = ['failed to load messages :-('];
  }
}

function displayDailyWorkout() {
  if (dailyWorkout == null) {
    dailyWorkoutElem.textContent = 'No Daily Workout';
    dailyWorkoutElem.href = '';
    dailyWorkoutElem.classList.add('greyedOut');
  } else {
    const newDate = new Date(dailyWorkout.timeCooldown);

    if (newDate < Date.now()) { // when the cooldown doesn't exist or it is over
      dailyWorkoutElem.classList.remove('greyedOut');
      dailyWorkoutElem.textContent = 'Daily: ' + dailyWorkout.workoutName;
      dailyWorkoutElem.href = `/workout_page.html#${'daily/' + dailyWorkout.workoutName}`;
    } else { // when the cooldown has not yet finished
      refreshDailyTimer(newDate);
      dailyWorkoutElem.classList.add('greyedOut');
    }
  }
}

function timeIntoString(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  let strSeconds = (seconds % 60);
  let strMinutes = (minutes % 60);
  let strHours = (hours);

  if ((strSeconds + '').length === 1) {
    strSeconds = '0' + strSeconds;
  }

  if ((strMinutes + '').length === 1) {
    strMinutes = '0' + strMinutes;
  }

  if ((strHours + '').length === 1) {
    strHours = '0' + strHours;
  }

  const string = strHours + ':' + strMinutes + ':' + strSeconds;
  return string;
}

function refreshDailyTimer(time) {
  if (time < Date.now()) {
    displayDailyWorkout();
  } else {
    const timeDiff = new Date(time - Date.now());
    console.log(timeDiff.getTime());
    dailyWorkoutElem.textContent = 'Daily reset in: ' + timeIntoString(timeDiff.getTime());
    setTimeout(() => { refreshDailyTimer(time); }, 1000);
  }
}

setHeadingName();

loadDailyWorkout();
