[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Do you even run?: Run Tracking Application

This is a full stack application that connects a React based front end application with a Django/PostgresQL back end database.  The application allows you to create a User, sign in, sign out, and change passwords for a account security.  Once you have an account, you can start building a running history.  You can add run activity with the details of date, duration, location, comments, and rate of perceived exertion.  The data provided will calculate your average speed and pace for each run and store that in the DB as well.

On your profile page, you will see all of your running history, and more advanced statistical analysis of your runs.  These include maximum values (time, distance, pace, speed), total values (time, distance), and average values (time, distance, pace, speed).  There are also graphs that provide you information over time for average speed per run and distance ran per run.

From the profile page, you can click to view/edit/delete individual runs.  This brings you to a form page that presents the information as a placeholder/value of each category.  You have the option to submit your edit, delete your run, or to return back to the profile without making any changes.

Throughout the page, you can see running images that were randomly generated from a collection that I created on Unplash using a call to their API.  In addition, random quotes can be seen throughout to improve the user's experience.

## Planning Story

The planning process began with the back end.  The first step was to ensure that all authentications were working properly.  This was done using curl-scripts for each individual feature.  Once signed in, a token is generated and allows for full user functionality.  Monitoring of built in django functions allowed for reassurance that the process was working.  After being able to sign in, I was able to move on to run creation and functions.  First, a focus was placed on creation and the model of each run.  All necessary fields were established and checked for appropriate data fields.  Date would receive a date field, time in total seconds for a number field (so that calculations can be made easier), RPE in a number field, speed in a number field, and the rest in character fields.  This created challenges on the front end since the user needs to be presented with data that is consistent in society, as well as easy to input/calculate.  This will be discussed later.

The next step was to address index, show, update, and delete functionality.  Since the user can input runs at any date, the order that it presents could be skewed based on the creation date, as opposed to the run date.  For this reason, the index function sorts based on the date of the run, not the creation date/id of the run.  I decided to reverse sort by date, so that the index on the UI front would present in descending order, with the most recent run on top.

The show, update, and delete functionality were pretty benign in set up on the back end side.  Where the confusion started was when jumping into the front end.  The issue revolved around the manipulation of data.  To get the user data to present in a friendly way (time in HH:MM:SS and the date in MM/DD/YYYY), multiple change handlers had to be used with different funcitons tied to them.  In addition, the time change handler also had to trigger calculations for pace and speed.  This caused multiple conversions to have to be made.  When a get request was made from the back-end, a front-end calculation was made from total seconds to HH:MM:SS.  I chose to do this on the front-end because of the comfort of JS vs. Python at the time of creation of this app.  For the date, I originally chose to use the DatePicker add on with MomentJS, until I realized the built in for React Bootstrap was more friendly to develop.  I originally had conversions of the Date object to the proper format for storage in Django/PostgresQL, but this was cleared up with the change to the bootsrap/react datepicker.  These were problems faced in the create and update features, which took a most of my time to problem solve.

The index/profile page are my favorite accomplishments of this app.  The way that I wanted to make this app different was through the calculations, statistical analysis, and graphical representation that the user is provided.  All calculations were made on the index, following the get request. These include maximum values (time, distance, pace, speed), total values (time, distance), and average values (time, distance, pace, speed).  There are also graphs that provide you information over time for average speed per run and distance ran per run. I decided to present these on the left pane of the profile page, while the index is presented on the right.  I chose to make the index scrollable independent of the stats, so that you can compare any run to your overall stats and personal bests.  The graph feature was my biggest stretch goal for this version and biggest accomplishment.  In order to  implement a graph, I did a lot of research to determine compatability with React and what I was trying to accomplish.  I settled on the Material Design Bootstrap React framework.  This served as a challenge.  I used information that I knew about altering the state inside of render (through copying into a new object) and sending through to the component as a prop.  The run information is gathered from the get request that occurs in the profile componenbt and is sent to the graph and distancegraph components as props.  Calculations are made to reverse the data that is sent through to an ascending date order and  arrays were made for date, average speed/run, and distance/run.  The date array was sent as a prop to label (x a-xis) and the other two arrays as y axis data for their respective graphs.  Figuring this puzzle out was a truly fun and rewarding part of the process.

For styling the page, I decided to implement a random image API call to unsplash.  I only wanted running photos to be presented, but a general query to the API produced more than just humans running.  I decided to create a collection on unsplash and generate a random image get request on that collection.  This worked pretty seemlessly.  I am waiting for approval for production status so that I have unlimited calls, but for now 50/hr can be made to unsplash.  One last feature that I thought would improve the user experience was the addition of quotes.  I first looked at options online for API calls, but then decided to customize my own quotes.  I did this in an array, and called a randomizing function on that array.  The quotes show up on the landing page as well as the home page.

## Technologies Used
    1. React
    2. html
    3. JavaScript
    4. jsx
    5. Bootstrap/React-Bootstrap
    6. Python
    7. Django
    8. MDN
    9. axios
    10. Passport JS
    11. MomentJS
    12. Bcrypt
    13. CSS/Sass
    14. Material Design Bootstrap React
    15. SQL/PostgresQL

## User Stories
    1.  As a user, I would like to sign up on a secure account.
    2.  As a user, I would like to sign in to a secure account.
    3.  As a user, I would like to change my password.
    4.  As a user, I would like to create a new run.
    5.  As a user, I would like to edit a run.
    6.  As a user, I would like to delete a run.
    7.  As a user, I would like to view all of my runs.
    8.  As a user, I would like to view my running statistics, including total runs, total distance, and pace (average, fastest).
    9.  As a user, I would like to see a graph or chart of my progress over time.

## Unsolved Problems/Future Versions
  Unsolved:  API calls to Unsplash and data conversion moved to back-end.
  Version 2: Search and filter Runs, increased statistical analysis
  Version 3: View other peoples runs/profiles, Shoe tracker
  Version 4: Interact with other users, Calendar view

## Links
[Deployed Frontend](https://robrichardsdpt.github.io/running-app/) <br>
[Deployed Backend](https://running-back-end.herokuapp.com/) <br>
[Frontend Github Repository](https://github.com/robrichardsdpt/running-app)<br>
[Backend Github Repository](https://github.com/robrichardsdpt/running-back-end)

## Installation
    1.  Fork and clone this repository.
    2.  Create a new branch, training, for your work.
    3.  Checkout to the training branch.
    4.  Install dependencies with npm install.
    5.  Open the repository in Atom with atom .

## Wireframe
![wireframe](https://i.imgur.com/IfbBBV4.jpg)

## Screenshots
![HomeScreenshot](https://i.imgur.com/ukl6eBz.jpg)
![CreateScreenshot](https://i.imgur.com/IK5M94S.png)
![ProfileScreenshot](https://i.imgur.com/C02eHZ4.png)
![EditScreenshot](https://i.imgur.com/O1cMo2u.png)
