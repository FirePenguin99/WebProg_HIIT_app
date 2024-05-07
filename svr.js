import express from 'express';

const app = express();

app.use(express.static('pages', { extensions: ['html'] })); // every hyperlink has an invisible .html at the end

let userCount = 3;

const defaultExercises = [
  {
    name: 'Rest',
    description: 'No activity, just rest for the moment',
    difficulty: 'rest',
  },
  {
    name: 'Jog on the spot',
    description: 'Jog on the spot',
    difficulty: 'intense',
  },
  {
    name: 'Air Squats',
    description: 'Repeatedly squat with your arms out forward infront of you',
    difficulty: 'intense',
  },
  {
    name: 'Jump Squat',
    description: 'Repeatedly jump a small height and when landing, enter a deep squat',
    difficulty: 'intense',
  },
  {
    name: 'Butt Kicks',
    description: 'A run-on-the-spot motion, but bend the middair leg until the foot is close to your butt',
    difficulty: 'intense',
  },
  {
    name: 'High Knees',
    description: 'A run-on-the-spot motion, but get your middair knee as high as possible ',
    difficulty: 'intense',
  },
  {
    name: 'Burpee',
    description: 'In a rhythm, hit the group like a push up then immediately return to standing and then jump. As soon as you land hit the ground again and repeat',
    difficulty: 'intense',
  },
  {
    name: 'Tuck Jumps',
    description: 'Enter a rhythm of small bounce-like jumps, and every 3 bounces jump higher and tuck your knees in',
    difficulty: 'intense',
  },
  {
    name: 'Switch Kicks',
    description: 'Alternate kicking your legs upwards',
    difficulty: 'intense',
  },
  {
    name: 'Frog Jumps',
    description: 'Start with knees bent, squating and hands on the floor between your legs. Then do a small jump and upon landing reset to starting position and repeat',
    difficulty: 'intense',
  },
  {
    name: 'Heisman',
    description: 'Bring one knee up high and get close to touching it with your opposite elbow. Repeat with the other leg and arm then repeat the cycle',
    difficulty: 'intense',
  },
  {
    name: 'X Jumps',
    description: 'Close your body and bend your knees, then explode into a jump and spread all your limbs outwards. Then Repeat',
    difficulty: 'intense',
  },
  {
    name: 'Mountain Climbers',
    description: 'Enter a push-up position on the floor, then bring one knee towards your chest. Switch between legs and youll enter a running motion on the floor',
    difficulty: 'intense',
  },
  {
    name: 'Single Leg Squat',
    description: 'Whilst balancing on one leg, slowly squat to the ground then rise. Repeat with one leg or switch between legs',
    difficulty: 'intense',
  },
  {
    name: 'Lunge',
    description: 'Stand up straight, then take a large step forward with one foot and bend with the step until the opposite knee comes near the ground. Stand up straight again and repeat',
    difficulty: 'intense',
  },
];

const userList = [
  {
    id: '0000',
    username: 'Guest',
    daily: null,
    workouts: [
    ],
    exercises: defaultExercises,
  },
  {
    id: '0001', // this should probably use UUID
    username: 'dude',
    daily: {
      workoutName: 'Workout Sprinting', // this really should be a Unique ID that references an existing Workout inside the user's workouts array
      timeCooldown: new Date('11/21/1987 16:00:00'), // the time Date where the daily workout can be accessed again
    },
    workouts: [
      {
        name: 'Workout 1',
        seconds: 1 * 60,
        difficulty: 'medium',
        exercises: [
          {
            name: 'X Jumps',
            duration: 0.5 * 60,
            description: 'Close your body and bend your knees, then explode into a jump and spread all your limbs outwards. Then Repeat',
            difficulty: 'intense',
          },
          {
            name: 'Rest',
            duration: 0.5 * 60,
            description: 'No activity, just rest for the moment',
            difficulty: 'rest',
          },
        ],
      },
      {
        name: 'Workout Hard',
        seconds: 1 * 60,
        difficulty: 'hard',
        exercises: [
          {
            name: 'X Jumps',
            duration: 0.5 * 60,
            description: 'Close your body and bend your knees, then explode into a jump and spread all your limbs outwards. Then Repeat',
            difficulty: 'intense',
          },
          {
            name: 'Frog Jumps',
            duration: 0.5 * 60,
            description: 'Start with knees bent, squating and hands on the floor between your legs. Then do a small jump and upon landing reset to starting position and repeat',
            difficulty: 'intense',
          },
        ],
      },
      {
        name: 'Workout 3',
        seconds: 1 * 60,
        difficulty: 'medium',
        exercises: [
          {
            name: 'jumping-jacks',
            duration: 0.5 * 60,
            difficulty: 'medium',
          },
          {
            name: 'burpees',
            duration: 0.5 * 60,
            difficulty: 'hard',
          },
        ],
      },
    ],
    exercises: defaultExercises,
  },
  {
    id: '0002',
    username: 'bloke',
    daily: {
      workoutName: 'Workout 3',
      timeCooldown: new Date('04/16/2024 16:00:00'),
    },
    workouts: [
    ],
    exercises: defaultExercises,
  },
  {
    id: '0003',
    username: 'lady',
    daily: null,
    workouts: [
    ],
    exercises: defaultExercises,
  },
];


function findIndexWithId(id) {
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id === id) {
      return i;
    }
  }
  return -1;
}

function returnUsersWorkoutList(id) {
  return userList[findIndexWithId(id)].workouts;
}

function findWorkout(getString) {
  const splitGET = getString.split('-'); // string that is GET is in format 'userId-nameOfWorkout', therefore split the two

  const userId = splitGET[0];
  const workoutName = splitGET[1];

  const userWorkouts = returnUsersWorkoutList(userId); // use id to get the specific user's workouts

  for (const workout of userWorkouts) {
    if (workout.name === workoutName) {
      return workout;
    }
  }
  return null;
}

function returnUsersExerciseList(id) {
  return userList[findIndexWithId(id)].exercises;
}

function createNewUserObj(inputUsername) {
  userCount += 1;

  const newId = createNewUserId(userCount);

  userList.push({
    id: newId,
    username: inputUsername,
    daily: null,
    workouts: [],
    exercises: defaultExercises,
  });
  return newId;
}

function createNewUserId(id) {
  let idString = id + ''; // need to make id (which is int) into string

  while (idString.length < 4) {
    idString = '0' + idString;
  }
  console.log(idString);
  return idString;
}

function returnUserDailyWorkout(id) {
  return userList[findIndexWithId(id)].daily;
}

function findWorkoutObjWithWorkoutName(workoutName, workoutArray) {
  for (let i = 0; i < workoutArray.length; i++) {
    if (workoutArray[i].name === workoutName) {
      return workoutArray[i];
    }
  }
  return null;
}


// gets entire user list
function getUserList(req, res) {
  res.json(userList);
}

function addNewUser(req, res) {
  if (req.body.name) { // add .id and .exercise to POST payload body
    const id = createNewUserObj(req.body.name);

    console.log(id);
    res.json(id);
  } else {
    res.status(500).send('The sent body is empty');
  }
}


// gets all workouts owned by a user
function getUserWorkouts(req, res) {
  res.json(returnUsersWorkoutList(req.params.userid));
}

// gets one specific workout
function getUserWorkout(req, res) {
  const result = findWorkout(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send('No match for that Name.');
  }
}

// gets all exercises owned by a user
function getUserExercises(req, res) {
  res.json(returnUsersExerciseList(req.params.userid));
}

function createNewWorkout(req, res) {
  if (req.body.workout) { // add .id and .workout to POST payload body
    const userWorkouts = returnUsersWorkoutList(req.body.id);

    userWorkouts.push(req.body.workout);

    res.json(userWorkouts);
    res.end();
  } else {
    res.status(500).send('The sent body is empty');
  }
}

function createNewExercise(req, res) {
  if (req.body.exercise) { // add .id and .exercise to POST payload body
    const userExercises = returnUsersExerciseList(req.body.id);

    userExercises.unshift(req.body.exercise);
    res.json(userExercises);
    res.end();
  } else {
    res.status(500).send('The sent body is empty');
  }
}

// get user's daily workout
function getUserDailyWorkout(req, res) {
  res.json(returnUserDailyWorkout(req.params.userid));
}

// sets a user's daily workout
function setUserDailyWorkout(req, res) {
  let timeout;

  if (req.body.timeCooldown != null) {
    timeout = req.body.timeCooldown;
  } else {
    timeout = null;
  }

  userList[findIndexWithId(req.body.id)].daily = {
    workoutName: req.body.daily,
    timeCooldown: timeout,
  };

  console.log(userList[findIndexWithId(req.body.id)]);

  res.end();
}


function deleteSelectedWorkout(req, res) {
  const userWorkoutList = userList[findIndexWithId(req.body.id)].workouts;
  const index = userWorkoutList.indexOf(findWorkoutObjWithWorkoutName(req.body.workoutName, userWorkoutList));

  userList[findIndexWithId(req.body.id)].workouts.splice(index, 1);

  res.json(userList[findIndexWithId(req.body.id)].workouts);
}

app.get('/users', getUserList);

app.get('/workouts/:userid', getUserWorkouts);
app.get('/workout/:id', getUserWorkout);
app.get('/exercises/:userid', getUserExercises);
app.get('/daily/:userid', getUserDailyWorkout);

app.post('/custom_workout', express.json(), createNewWorkout);
app.post('/exercises', express.json(), createNewExercise);

app.post('/new_user', express.json(), addNewUser);
app.post('/daily', express.json(), setUserDailyWorkout);

app.post('/deleteWorkout', express.json(), deleteSelectedWorkout);


app.listen(8080);
