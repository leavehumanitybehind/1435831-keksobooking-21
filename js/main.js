'use strict';

(function () {

  const mainPin = document.querySelector(`.map__pin--main`);
  const MapSize = {
    WIDTH: 1200,
    TOP: 130,
    BOTTOM: 630
  };

  const map = document.querySelector(`.map`);

  const pinContainerClickHandler = function (evt) {
    const allPins = window.pin.pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    const cardPopups = window.card.cardTemplate.querySelectorAll(`.popup`);
    allPins.forEach(function (elem, i) {
      if (evt.target.parentElement === elem || elem === document.activeElement) {
        elem.classList.add(`map__pin--active`);
        cardPopups[i].classList.remove(`hidden`);
      }
    });
  };

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
  window.pin.mapPin.addEventListener(`click`, pinContainerClickHandler);

  window.main = {
    MapSize: MapSize,
    map: map
  };

})();

