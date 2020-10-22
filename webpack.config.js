const path = require('path');
module.exports = {
  entry: [
    "./js/util.js",
    "./js/backend.js",
    "./js/avatar.js",
    "./js/debounce.js",
    "./js/move.js",
    "./js/validation.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/filter.js",
    "./js/form.js",
    "./js/main.js",

  ],
output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'public'),

  iife: true
},

devtool: false
};

