const workoutList = [];

let pageNumber = 0;
const mainRef = document.querySelector("#main");

async function loadWorkouts() {
    const response = await fetch('workouts');
    let workouts;
  if (response.ok) {
    workouts = await response.json();
    // console.log(workouts);
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

    //clear list
    for (let i = 2; i < numberOfNodes; i++) {
        mainRef.removeChild(mainRef.children[2]); // this is constantly 2 as the next child fills the old position of the removed child
    }

    //remake list
    for (let i = 0 + (pageNumber*7); i < (pageNumber+1)*7; i++) {
        if (i <= workoutList.length-1) {
            // console.log("added workout " + i);
            const workoutElem = document.createElement("p");
            workoutElem.textContent = workoutList[i].name;

            if (workoutList[i].difficulty == "easy") {
                workoutElem.classList.add("workoutEasy");
            } else if (workoutList[i].difficulty == "medium") {
                workoutElem.classList.add("workoutMedium");
            } else {
                workoutElem.classList.add("workoutHard");
            }

            const open = document.createElement('a');
            open.textContent = 'open';
            open.href = `/workout_page.html#${workoutList[i].name}`;
            // open.href = "/workout_page";
            workoutElem.append(open);
            
            let time = document.createElement("p");
            time.classList.add("workoutTime");
            time.textContent = workoutList[i].seconds/60;

            mainRef.append(workoutElem);
            mainRef.append(time);
        }
        else {
            // console.log("added blank " + i);
            const blank = document.createElement("p");
            blank.classList.add("workoutEmpty");
            mainRef.append(blank);

            const blank2 = document.createElement("p");
            blank2.classList.add("workoutEmpty");
            mainRef.append(blank2);
        }
    }
}

function decrementPage() {
    if (pageNumber > 0) {
        pageNumber -=1;
        refreshList();
    }
}
function incrementPage() {
    if (workoutList[(pageNumber*7) + 1]) {
        pageNumber +=1;
        refreshList();
    }
}


loadWorkouts();

document.querySelector("#backList").addEventListener('click', decrementPage);
document.querySelector("#moreList").addEventListener('click', incrementPage);