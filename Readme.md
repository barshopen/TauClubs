# Our code #
Our code run with ReactJS on the frontend, driven by create-react-app. 
On the backend we use Python with flask. Flask serves react's static build.

## Code Structure ##

### Front end ###
Besides create-react-app related packages, some of our mainly used packages are react-router-dom and styled-components.

As a standard react app, we got src/index.js that injects the main component from src/App.js. Inside the Src we also got the Components and Scenarios directories, each react component should be in either.
Scenarios: every page in modal should be placed there.
|_ ClubSection: holds all scenarios and modal regarding only the single club section.
Components: All non scenarios components.
|_ Generic: holds all components that are publicly used by many other components.

## Styling ## 
We use eslint and prettier to manage the front-end styling and pep8 for the backend. See our .eslintrc.json for more details.

## Graphical Design ##
Up untill now we used pure CSS as a solution an approach to resolve our design needs. We consider moving to material-UI design system to resolve mobile comaptability and many other issues that came up while workinע on v0.001(milestone 1)

# Contribution #
Following v0.001, each commit on PR to master are squashed before merged. We usually require a CR before inserting any piece of code to master.

## Basic Rules for PR ##
The changes you push to master, should always compile and pass our linting rules.
Please have a clear and brief explanation on what is the main changes you have added in this PR. Also, if any visual changes were made, please add a screen shot of the relevant view that should have changed.
If you working on major changes, please try and devide your PR for few seperate PR that make logical sense.

## Running env ##
1. Install at least python 3.9.4. If you own a 64-bit machine please use the 64-bit Python for better preformence.
2. Install at least node 12.18.13
3. At the root dir, run: `python -m venv .env`
4. Install recomended extensions Go to extensions(Ctrl+Shift+X on Windows), on the search type `@recommended` under workspace recommendations click on the ☁️ button the install all the recommended extensions.
5. Python virtual envirnoment should be activated when you start a new terminal. You should see a green `(.env)` at the begining of your terminal prompt. (If you don't please let us know :) ). Restart the terminal.
6. Run `pip install -r requirements.txt` (when env is activated). This should install all requirements.
7. Run the following commands:
```
cd frontend
yarn install
yarn start
```
8. go to frontend. copy .env_example file into .env file. Read the .env file and complete the missing parts if needed.
9. hit `ctrl+shift+p` and type `keyboard shortcuts(json)`. This should give you only one option. Upon clicking on this option you'll find yourself in a "keybindings.json" file add the following:
```
    {
        "key": "ctrl+alt+d",
        "command": "workbench.action.debug.selectandstart"
    }
```
you can change `ctrl+alt+d` to any keyboard shortcut you like. If you do, just make sure you do not overlap any other existing keyboard shortcut.
10. After this, the app should be up and running. your keyboard shortcut will ask you to choose if you want to debug Frontend, Server or both. Choose your option and happy hacking.
