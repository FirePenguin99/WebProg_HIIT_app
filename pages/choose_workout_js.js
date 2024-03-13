const workoutList = [];

function init(){
    const workout1 = {
        name: "Workout1",
        seconds: 5*60,
        difficulty: "hard"
    }
    const workout2 = {
        name: "Workout2",
        seconds: 8*60,
        difficulty: "medium"
    }
    const workout3 = {
        name: "Workout3",
        seconds: 12*60,
        difficulty: "easy"
    }
    const workout4 = {
        name: "Workout4",
        seconds: 15*60,
        difficulty: "hard"
    }
    const workout5 = {
        name: "Workout5",
        seconds: 10*60,
        difficulty: "medium"
    }
    const workout6 = {
        name: "bruh",
        seconds: 100*60,
        difficulty: "hard"
    }


    workoutList.push(workout1);
    workoutList.push(workout2);
    workoutList.push(workout3);
    workoutList.push(workout4);
    workoutList.push(workout5);
    workoutList.push(workout6);

    const mainRef = document.querySelector("#main");

    for (let i = 0; i < 7; i++) {
        if (i <= workoutList.length-1) {
            console.log("added workout " + i);
            const workout = document.createElement("p");
            workout.textContent = workoutList[i].name;

            if (workoutList[i].difficulty == "easy") {
                workout.classList.add("workoutEasy");
            } else if (workoutList[i].difficulty == "medium") {
                workout.classList.add("workoutMedium");
            } else {
                workout.classList.add("workoutHard");
            }
            
            let time = document.createElement("p");
            time.classList.add("workoutTime");
            time.textContent = workoutList[i].seconds/60;

            mainRef.append(workout);
            mainRef.append(time);
        }
        else {
            console.log("added blank " + i);
            const blank = document.createElement("p");
            blank.classList.add("workoutEmpty");
            mainRef.append(blank);

            const blank2 = document.createElement("p");
            blank2.classList.add("workoutEmpty");
            mainRef.append(blank2);
        }
    }
}

init();