const path = require('path');
module.exports = {
  entry: [
    "./js/consts.js",
    "./js/util.js",
    "./js/backend.js",
    "./js/move.js",
    "./js/form.js",
    "./js/pin.js",
    "./js/data.js",
    "./js/card.js",
    "./js/filter.js",
    "./js/validation.js",
  ],
output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'public'),

  iife: true
},

devtool: false
};

