// app source code (and specs)
- app                   # your app source code (and specs)
- index.html            # the entry point to your app
- styles.css            # the global styles for your app

// dependencies
- package.json          # the manifest of your app that states all dependencies 
- systemjs.config.js    # system.js modules configuration

// TypeScript configuration
- tsconfig.json         # TypeScript compiler configuration
- typings.json          # typings configuration (for the TS compiler)
- tslint.json           # TypeScript linting configuration

// Testing
- e2e                   # a folder with end to end tests
- karma.conf.js         # karma test runner configuration
- protractor.config.js  # protractor e2e tests configuration
- karma-test-shim.js
- wallaby.js

- .gitignore
- CHANGELOG.md
- LICENSE
- README.md
- Dockerfile
- favicon.ico

## Running the Application

1. Install `Node.js 7.x` or higher. The server uses ES2016 features so you need Node 7.x or higher!

2. Run `npm install` to install app dependencies, some app requires global flag `npm install -g`

3. Run `npm start` in a separate terminal window to build the TypeScript, watch for changes and launch the web server or run uibuild.bat for windows and uibuild.sh for linux / mac which will skip step 4

4. Go to http://localhost:8000 in your browser
