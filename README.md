# HIIT up2112089 - Gabriel Lewington HIIT App Submission
'npm start' starts the server.

The server listens on port 8080

All Webpages are functional on any resolution, but are primarily designed for mobile use. So please open the inspector and set the device type to any phone resolution. I used "iPhone 12 Pro" for the most of development but works on any mobile device.

**This app has sound on "workout_page.html" so please turn on sound.**

# Features include:
- Register a new user (just a name with no password or security),
    - *I have implemented it this way to avoid needless effort into security*
- Logging in to and out of user accounts
    - *Features that involve users function by using fetch to find user data from the server, then storing the current user id in sessionStorage. From then on the user id is used to GET specific user data from the server, and POST to add data to only that user's object on the server.*
- Guest Login
    - *Guest login is simply user 0, which is not displayed on the usual Log In page. Instead the Guest user can be logged into via a bespoke button.*
- Each user has a list of Workouts, which can be found in the "Start a new Workout" button in the workout menu
    - Each workout has an options button, which allows the user to Delete the Workout from their account or set it as the user's Daily Workout
    - *Delete and Set Daily simply GET/POST to the server to update the userList object*
- Clicking on one of the Workouts bring the user to a new page containing all the Workout's data
    - This page shows the user the name of the Workout, the current and next exercise as well as its descriptions and a Start and Stop button
    - Whilst workouts are playing, a ticking sound is played
    - *Workout data is fetched using the URL (window.location.hash), where after the hash in the URL is the workout's name. This name combined with the user id in sessionStorage is used to fetch from the Workout data from the server.*
- Each user has a Daily Workout
    - Upon completion of the Daily Workout, the Daily Workout is locked out to the user for 48 to 12 hours, depending on its difficulty stat (hard: 48, medium: 24, easy: 12).
    - This lock out was intended for health purposes, as whilst doing research apparently HIIT workouts strain the body enough that 24 hours is not enough time of a rest if the user was doing HIIT exercises once every day.
    - The lockout is lifted after the time is up.
    - *Using the same window.location String manipulation method as usual, but this time the URL has a "/daily" included. This tells the js to set user's Daily Workout timeout if the Workout is entirely completed*
- The user can customise a Workout. Each user is given a list of default exercises to compose a Workout with.
    - Typing in the fields above the Exercise List will filter based on exercise name (left field) and exercise difficulty (right field, options are "rest" and "intense")
    - Clicking the "Done!" button asks the user to name the Workout and submits it to user's Workout list on the server
    - Click the "+" button between the exercise list navigation allows the user to create a new Exercise, which when submitted adds it to the user's Exercise list on the server
    - Workouts have a calcualted difficulty based on the percentage of "intense" difficulty exercises make up the workout
    - *The exercise list is fetched from the server using the user's id from sessionStorage. Creating a new Exercise adds it to the user's personal exercise list on the server. Same for creating a new Workout*
- Self-made history API and history stack using sessionStorage
    - *Was made because using the built-in window.back() function in HTML didn't refresh the page and would load old data.*
- Webpage Title changes per workout and page


# Use of AI:
There was no use of AI at all.

# Improvements to Artefact since the prototype deadline
There has been massive improvements since the prototype. At the point of the prototype I had 5 git commits, but now at the end I have 66.

Navigation, functionality and style have all been dramatically improved.

# Things I wish I'd done if I had more time:
- Made a way to display a video/image tutorial of the current exercise to inform users who may not know the specific exercise
- I was intending to have a customisable Mii character for each user. It would also do exercise animations with the user
- Better desktop UI/element formatting
- Made the storing of data on the server use IDs rather than their name. Currently this results in incorrect data if there's multiple Workouts or Exercises that have the same name  Validation wasn't a huge concern of mine when developing.
- A database for persistant storage
    - this would mean guest login data would be stored locally via localStorage/sessionStorage
- Made the application one-page
- Used the bottom navigation bar for all navigation. What that means is move all the buttons from the homepage to the nav bar, and remove Back and Home
- Workout difficulty should take the length of the workout into consideration as well. A relatively easy workout for a long time is still hard.
- All of the User, Workout and Exercise data is stored on one large object variable on the server. If I had more time I'd find a way to make this less of a single point of failure. Using Databases could possible provide this.

# Final Thoughts
In last year's Application Programming, I said I was interested to learn more typical web design. But due to the mobile nature of the specification, I have managed to accidentally dodge learning to create and style a proper website once again.
However my understand of HTML requests like GET and POST has significantly improved. Last year I couldn't get POST to work and I'm glad to say that I've finally succeeded.