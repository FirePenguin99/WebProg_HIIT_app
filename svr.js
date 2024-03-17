import express from 'express';

const app = express();

app.use(express.static('pages'));

const svrWorkouts = [
    {
        name: "Workout Sprinting",
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
    },
    {
        name: "Workout 2",
        seconds: 1*60,
        difficulty: "hard",
        exercises: [
            {
                name: "Sit-ups",
                duration: 1*60,
                difficulty: "hard"
            }
        ]
    },
    {
        name: "Workout 3",
        seconds: 1*60,
        difficulty: "medium",
        exercises: [
            {
                name: "jumping-jacks",
                duration: 0.5*60,
                difficulty: "medium"
            },
            {
                name: "burpees",
                duration: 0.5*60,
                difficulty: "hard"
            }
        ]
    }
];

function findWorkout(name) {
    for (const workout of svrWorkouts) {
        if (workout.name === name) {
          return workout;
        }
      }
      return null;
}

function getWorkouts(req, res) {
    res.json(svrWorkouts);
}

function getWorkout(req, res) {
    const result = findWorkout(req.params.id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).send('No match for that Name.');
    }
  }

app.get('/workouts', getWorkouts);
app.get('/workouts/:id', getWorkout)



app.listen(9090);