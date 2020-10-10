'use strict';

(function () {

  const mainPin = document.querySelector(`.map__pin--main`);

  window.form.disableFormControls(window.form.fieldsets);
  window.form.disableFormControls(window.form.inputs);
  window.form.disableFormControls(window.form.adFormSelects);
  window.form.disableFormControls(window.form.mapFiltersSelects);
  window.form.setAddress(mainPin);

  const onMouseDown = function (evt) {
    if (evt.which === window.util.KeyCode.MOUSE_LEFT_CLICK) {
      window.form.activateMap();
      window.backend.load(window.pin.successHandler, window.pin.errorHandler);
    }
  };

  const onKeyDown = function (evt) {
    if (evt.code === window.util.KeyCode.ENTER) {
      window.form.activateMap();
      window.backend.load(window.pin.successHandler, window.pin.errorHandler);
    }
  };

  mainPin.addEventListener(`mousedown`, onMouseDown);
  mainPin.addEventListener(`keydown`, onKeyDown);



})();

