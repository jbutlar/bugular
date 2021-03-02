# Bug Tracker App - Built with Typescipt, React, Node and Express, and a MySQL data layer

This is an app I built to learn some React and Node. It's based off of the University of Helsinki Full stack tutorial.
https://fullstackopen.com/en/

Along with that I decided to take what I learned with .NET Core and the way it implements dependency injection and see if I could mimic it in Typescript. 
Credit to this article for setting up a container with JS/TS:
https://medium.com/@magnusjt/ioc-container-in-nodejs-e7aea8a89600

This is really just a list app as it stands right now, but it's aim is to become a ticket tracker, like a very scaled back version of Microsoft DevOps.

To run the project you will need to have node and npm installed which you can grab here: https://nodejs.org/en/

This project makes use of Node's main version 12 engine.

Once installed, make sure you are in the root directory and run **'npm install'**

Next you can run either **npm run start:dev** (recommended) or **npm run start:build**

**npm run start:dev** - this will simulate a development environment and will run the React development server (react-scripts start), which communicates with Express at localhost:4000...this should open your browser automatically, but if not navigate to localhost:3000

**npm run start:build** - this will simulate a deployed version to production by just serving the static file from the React build locally at localhost:4000. This will not open your browser automatically so you'll have to navigate over to localhost:4000

Both of these scripts will transpile TS code into JS code into the dist directory in the root.

You will need a local MySQL instance to run locally and can run the initial_create script in root/db. 

To see what's deployed visit: https://bugular.herokuapp.com/

Thanks!
