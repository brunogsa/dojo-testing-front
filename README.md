# Dojo (Kata) - Testing the Front-End

## Tools

- [React](https://reactjs.org/)
- [ESLint](https://eslint.org/)
- [Enzyme](https://airbnb.io/enzyme/)
- [Jest](https://jestjs.io/)
- [Puppeteer](https://github.com/GoogleChrome/puppeteer)
- [Storybook](https://storybook.js.org)
- [Stryker](https://stryker-mutator.io/)

## What should I do?

Open folder `mockups/` to see the images and some business logic details. <br>
We'll basically do a TODO Web App. =P

## Requirements

- Node ^6.14.0 || ^8.10.0 || >=9.10.0
- NPM >=6.4.1

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test [--watch] [--watchAll] [COMPONENT_NAME] [OTHER_FILTERS]`

Launches the test runner in the interactive watch mode.<br>
If you're using puppeteer, depending how you code your tests you may need to keep your app or storybook running, otherwise the tests might fail.

### `npm run storybook`

Launches the storybook.
Open [http://localhost:9001](http://localhost:9001) to view it in the browser.

### `npm run test-score`

Launches strykers to run your test suites against generated mutations.
