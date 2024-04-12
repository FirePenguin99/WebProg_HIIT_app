export const currentUserId = '0001';


// export function returnUserId(userId) {
//   return userId;
// }

// export function increaseUserId(value) {
//   userId += value;
// }


export const userList = [
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
  for (let i = 0; i < currentUserId.length; i++) {
    if (userList[i].id === id) {
      return i;
    }
  }
  return -1;
}

export function returnUsersWorkoutList(id) {
  return userList[findIndexWithId(id)].workouts;
}

export function returnUsersExerciseList(id) {
  return userList[findIndexWithId(id)].exercises;
}
