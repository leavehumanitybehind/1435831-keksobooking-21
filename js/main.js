/* eslint-disable object-shorthand */
'use strict';

(function () {

  const mainPin = document.querySelector(`.map__pin--main`);
  window.form.disableMap();

  const onMouseDown = function (evt) {
    if (evt.which === window.util.KeyCode.MOUSE_LEFT_CLICK) {
      window.form.activateMap();
    }
  };

  const onKeyDown = function (evt) {
    if (evt.code === window.util.KeyCode.ENTER) {
      window.form.activateMap();
    }
  };

  mainPin.addEventListener(`mousedown`, onMouseDown);
  mainPin.addEventListener(`keydown`, onKeyDown);

})();

