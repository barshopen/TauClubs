# Our code #
Our code run with ReactJS on the frontend, driven by create-react-app. 
On the backend we use Python with flask. Flask serves react's static build.

## Code Structure ##

### Front end ###
Besides create-react-app related stuff, some of our mainly used packages are react-router-dom and styled-components.
As a standard react app, we got src/index.js that injects the main component from src/App.js. Inside the Src we also got the Components and Scenarios directories, each react component should be in either.
Scenarios: every page in modal should be placed there.
|_ ClubSection: holds all scenarios and modal regarding only the single club section.
Components: All non scenarios components.
|_ Generic: holds all components that are publicly used by many other components.

## Styling ## 
We use eslint and prettier to manage the front-end styling and pep8 for the backend. See our .eslintrc.json for more details.

# Contribution #
Following v0, each commit on PR to master are squashed before merged. We usually require a CR before inserting any piece of code to master.
## Basic Rules for PR ##
The changes you push to master, should always compile and pass our linting rules.
Please have a clear and brief explanation on what is the main changes you have added in this PR. Also, if any visual changes were made, please add a screen shot of the relevant view that should have changed.
If you working on major changes, please try and devide your PR for few seperate PR that make logical sense.
