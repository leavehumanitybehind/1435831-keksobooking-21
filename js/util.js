"use strict";

(function () {

  const KeyCode = {
    ENTER: `Enter`,
    ESCAPE: `Escape`
  };

  window.util = {

    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    getRandomArrayValue(items) {
      return items[Math.floor(items.length * Math.random())];
    },

    isEscKeyCode(evt) {
      return evt.KeyCode === KeyCode.ESCAPE;
    }
  };
})();
