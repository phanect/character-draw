/* eslint-env node */
"use strict";

const { join } = require("path");

module.exports = {
  root: true,
  extends: "phanective",

  env: {
    browser: true,
  },
  parserOptions: {
    project: join(__dirname, "./tsconfig.json"),
  },
};
