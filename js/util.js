/* eslint-disable object-shorthand */
"use strict";

(function () {

  const KeyCode = {
    ENTER: `Enter`,
    ESCAPE: `Escape`,
    MOUSE_LEFT_CLICK: 1
  };

  const getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getRandomArrayValue = function (items) {
    return items[Math.floor(items.length * Math.random())];
  };

  const isEscKeyCode = function (evt) {
    return evt.KeyCode === KeyCode.ESCAPE;
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomArrayValue: getRandomArrayValue,
    isEscKeyCode: isEscKeyCode,
    KeyCode: KeyCode
  };

})();
