# Meet-up Event Planner for Udacity course

Project 1 of the Senior Web Developer Udacity course

### License
Since this is a student project, this repository do not have any permissive license, so you can unfortunately not copy or use any part of it.

------------------------------------------------------------------------

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

This project setup supports ES6 modules thanks to Babel.  
While you can still use `require()` and `module.exports`, we encourage you to use [`import` and `export`](http://exploringjs.com/es6/ch_modules.html) instead.

## Required Environment Variables

To run this project locally, you need to create a `.env` file in the project root and add the following required environment variables not included in the repository:

```
REACT_APP_API_KEY=<your-firebase-api-key>
REACT_APP_AUTH_DOMAIN=<your-firebase-auth-domain>
REACT_APP_DATABASE_URL=<your-firebase-database-url>
REACT_APP_STORAGE_BUCKET=<your-firebase-storage-bucket>
```

### Hosting

This static site is hosted on Firebase @ https://udacity-meet-up-event-pl-d8810.firebaseapp.com/
