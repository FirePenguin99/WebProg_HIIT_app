import express from 'express';
// import * as users from './users.mjs';

const app = express();

app.use(express.static('pages', { extensions: ['html'] })); // every hyperlink has an invisible .html at the end

/*
const svrWorkouts = [
  {
    name: 'Workout Sprinting',
    seconds: 3 * 60,
    difficulty: 'medium',
    exercises: [
      {
        name: 'sprint',
        duration: 0.5 * 60,
        difficulty: 'hard',
      },
      {
        name: 'light jog',
        duration: 2 * 60,
        difficulty: 'easy',
      },
      {
        name: 'sprint',
        duration: 0.5 * 60,
        difficulty: 'hard',
      },
    ],
  },
  {
    name: 'Workout 2',
    seconds: 1 * 60,
    difficulty: 'hard',
    exercises: [
      {
        name: 'Sit-ups',
        duration: 1 * 60,
        difficulty: 'hard',
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
  {
    name: 'Workout 4',
    seconds: 1 * 60,
    difficulty: 'hard',
    exercises: [
      {
        name: 'Sit-ups',
        duration: 1 * 60,
        difficulty: 'hard',
      },
    ],
  },
  {
    name: 'Workout 5',
    seconds: 1 * 60,
    difficulty: 'hard',
    exercises: [
      {
        name: 'Sit-ups',
        duration: 1 * 60,
        difficulty: 'hard',
      },
    ],
  },
  {
    name: 'Workout 6',
    seconds: 1 * 60,
    difficulty: 'hard',
    exercises: [
      {
        name: 'Sit-ups',
        duration: 1 * 60,
        difficulty: 'hard',
      },
    ],
  },
];
*/

/*
const svrExercises = [
  {
    name: 'lunges1',
    difficulty: 'intense',
  },
  {
    name: 'lunges2',
    difficulty: 'rest',
  },
  {
    name: 'lunges3',
    difficulty: 'rest',
  },
  {
    name: 'lunges4',
    difficulty: 'intense',
  },
  {
    name: 'lunges5',
    difficulty: 'intense',
  },
  {
    name: 'lunges6',
    difficulty: 'rest',
  },
  {
    name: 'lunges7',
    difficulty: 'intense',
  },
  {
    name: 'idle rest',
    difficulty: 'rest',
  },
  {
    name: 'intense1',
    difficulty: 'intense',
  },
  {
    name: 'intense2',
    difficulty: 'intense',
  },
  {
    name: 'intense3',
    difficulty: 'intense',
  },
];
*/

// const currentWorkout = users.returnUsersWorkoutList('0001');

// const currentExercise = users.returnUsersExerciseList('0001');

const userList = [
  {
    id: '0001',
    username: 'dude',
    workouts: [
      {
        name: 'Workout Sprinting',
        seconds: 3 * 60,
        difficulty: 'medium',
        exercises: [
          {
            name: 'sprint',
            duration: 0.5 * 60,
            difficulty: 'hard',
          },
          {
            name: 'light jog',
            duration: 2 * 60,
            difficulty: 'easy',
          },
          {
            name: 'sprint',
            duration: 0.5 * 60,
            difficulty: 'hard',
          },
        ],
      },
      {
        name: 'Workout 2',
        seconds: 1 * 60,
        difficulty: 'hard',
        exercises: [
          {
            name: 'Sit-ups',
            duration: 1 * 60,
            difficulty: 'hard',
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
    exercises: [
      {
        name: 'lunges1',
        difficulty: 'intense',
      },
      {
        name: 'lunges2',
        difficulty: 'rest',
      },
      {
        name: 'lunges3',
        difficulty: 'rest',
      },
      {
        name: 'lunges4',
        difficulty: 'intense',
      },
      {
        name: 'lunges5',
        difficulty: 'intense',
      },
      {
        name: 'lunges6',
        difficulty: 'rest',
      },
      {
        name: 'lunges7',
        difficulty: 'intense',
      },
      {
        name: 'idle rest',
        difficulty: 'rest',
      },
      {
        name: 'intense1',
        difficulty: 'intense',
      },
      {
        name: 'intense2',
        difficulty: 'intense',
      },
      {
        name: 'intense3',
        difficulty: 'intense',
      },
    ],
  },
  {
    id: '0002',
    username: 'bloke',
    workouts: [

    ],
    exercises: [
      {
        name: 'lunges1',
        difficulty: 'intense',
      },
      {
        name: 'lunges2',
        difficulty: 'rest',
      },
      {
        name: 'lunges3',
        difficulty: 'rest',
      },
      {
        name: 'lunges4',
        difficulty: 'intense',
      },
      {
        name: 'lunges5',
        difficulty: 'intense',
      },
      {
        name: 'lunges6',
        difficulty: 'rest',
      },
      {
        name: 'lunges7',
        difficulty: 'intense',
      },
      {
        name: 'idle rest',
        difficulty: 'rest',
      },
      {
        name: 'intense1',
        difficulty: 'intense',
      },
      {
        name: 'intense2',
        difficulty: 'intense',
      },
      {
        name: 'intense3',
        difficulty: 'intense',
      },
    ],
  },
  {
    id: '0003',
    username: 'lady',
    workouts: [

    ],
    exercises: [
      {
        name: 'lunges1',
        difficulty: 'intense',
      },
      {
        name: 'lunges2',
        difficulty: 'rest',
      },
      {
        name: 'lunges3',
        difficulty: 'rest',
      },
      {
        name: 'lunges4',
        difficulty: 'intense',
      },
      {
        name: 'lunges5',
        difficulty: 'intense',
      },
      {
        name: 'lunges6',
        difficulty: 'rest',
      },
      {
        name: 'lunges7',
        difficulty: 'intense',
      },
      {
        name: 'idle rest',
        difficulty: 'rest',
      },
      {
        name: 'intense1',
        difficulty: 'intense',
      },
      {
        name: 'intense2',
        difficulty: 'intense',
      },
      {
        name: 'intense3',
        difficulty: 'intense',
      },
    ],
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

function returnUsersExerciseList(id) {
  return userList[findIndexWithId(id)].exercises;
}

function getUserWorkouts(req, res) {
  res.json(returnUsersWorkoutList(req.params.userid));
}


function findWorkout(getString) {
  const splitGET = getString.split('-'); // string that is GET is in format 'userId-nameOfWorkout', therefore split the two

  const userId = splitGET[0];
  const workoutName = splitGET[1];

  console.log(userId);

  const userWorkouts = returnUsersWorkoutList(userId); // use id to get the specific user's workouts

  for (const workout of userWorkouts) {
    if (workout.name === workoutName) {
      return workout;
    }
  }
  return null;
}

function getWorkout(req, res) {
  console.log(req.params.id);
  const result = findWorkout(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send('No match for that Name.');
  }
}

function sendWorkouts(req, res) {
  if (req.body.workout) { // add .id and .workout to POST payload body
    const userWorkouts = returnUsersWorkoutList(req.body.id);

    userWorkouts.push(req.body.workout);


    res.ok();
    // res.ok = true; // does not work
  } else {
    res.status(500).send('The sent body is empty');
  }
}

function getUserExercises(req, res) {
  res.json(returnUsersExerciseList(req.params.userid));
}

function sendExercises(req, res) {
  if (req.body.exercise) { // add .id and .exercise to POST payload body
    const userExercises = returnUsersExerciseList(req.body.id);

    userExercises.unshift(req.body.exercise);
    res.ok(); // this causes an error and breaks out of the response, stopping an infinite await to continue
    res.status(200);
    // res.ok = true; // does not work
  } else {
    res.status(500).send('The sent body is empty');
  }
}

function getUserList(req, res) {
  res.json(userList);
}

app.get('/users', getUserList);

app.get('/workouts/:userid', getUserWorkouts);
app.get('/workout/:id', getWorkout);
app.get('/exercises/:userid', getUserExercises);

app.post('/custom_workout', express.json(), sendWorkouts);
app.post('/exercises', express.json(), sendExercises);


app.listen(8080);
