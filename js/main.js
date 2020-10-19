'use strict';

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

window.form.disableMap();
window.consts.mainPin.addEventListener(`mousedown`, onMouseDown);
window.consts.mainPin.addEventListener(`keydown`, onKeyDown);


