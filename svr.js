import express from 'express';
import * as users from './users.mjs';

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

const currentWorkout = users.returnUsersWorkoutList('0001');

const currentExercise = users.returnUsersExerciseList('0001');


function findWorkout(name) {
  for (const workout of currentWorkout) {
    if (workout.name === name) {
      return workout;
    }
  }
  return null;
}

function getWorkouts(req, res) {
  res.json(currentWorkout);
}

function getWorkout(req, res) {
  const result = findWorkout(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send('No match for that Name.');
  }
}

function sendWorkouts(req, res) {
  if (req.body) {
    currentWorkout.push(req.body);
    res.ok();
  } else {
    res.status(500).send('The sent body is empty');
  }
}

function getExercises(req, res) {
  res.json(currentExercise);
}

function sendExercises(req, res) {
  if (req.body) {
    // svrExercises.push(req.body);
    currentExercise.unshift(req.body);
    res.ok(); // this causes an error and breaks out of the response, stopping an infinite await to continue
    // res.status(200);
    res.status(500);
  } else {
    res.status(500).send('The sent body is empty');
  }
}


app.get('/workouts', getWorkouts);
app.get('/workouts/:id', getWorkout);
app.get('/exercises', getExercises);

app.post('/custom_workout', express.json(), sendWorkouts);
app.post('/exercises', express.json(), sendExercises);

app.listen(8080);
