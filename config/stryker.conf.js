// This config was generated using a preset.
// Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/react.md#react
module.exports = function(config) {
  config.set({
    mutate: [
      "src/*.js",
      "!src/*.storybook.js",
      "!src/*.test.js"
    ],
    files: [
      "config/**/*.js",
      "src/*.js",
      "src/*.css",
      "!src/index.js",
      "!src/index.css"
    ],
    mutator: "javascript",
    testRunner: "jest",
    testFramework: "jest",
    reporters: ["progress", "clear-text"],
    coverageAnalysis: "off",
    jest: {
      enableFindRelatedTests: true
    }
  });
};
