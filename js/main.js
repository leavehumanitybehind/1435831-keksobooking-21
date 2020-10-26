'use strict';

const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);
const resetButton = adForm.querySelector(`.ad-form__reset`);


const activateMap = function () {
  map.classList.remove(`map--faded`);
  mapFiltersForm.classList.remove(`map__filters--disabled`);
  adForm.classList.remove(`ad-form--disabled`);
  addListeners();
  window.filter.change();
  window.form.enable();
};

const disableMap = function () {
  map.classList.add(`map--faded`);
  window.form.disable();
  window.pin.remove();
  window.form.reset();
  window.form.resetFilters();
  window.move.setAddress(mainPin);
  window.filter.remove();
  removeListeners();
};


const onSubmitForm = function (evt) {
  window.backend.upload(window.form.success, window.form.error, new FormData(adForm));
  evt.preventDefault();
  disableMap();
};

const addListeners = function () {
  window.validation.change();
  adForm.addEventListener(`submit`, onSubmitForm);
};

const removeListeners = function () {
  window.validation.remove();
  adForm.removeEventListener(`submit`, onSubmitForm);
  resetButton.removeEventListener(`click`, disableMap);
};


const onMouseDown = function (evt) {
  if (evt.which === window.util.KeyCode.MOUSE_LEFT_CLICK) {
    activateMap();
  }
  mainPin.removeEventListener(`mousedown`, onMouseDown);
};

const onKeyDown = function (evt) {
  if (evt.code === window.util.KeyCode.ENTER) {
    activateMap();
  }
  mainPin.removeEventListener(`keydown`, onKeyDown);
};

disableMap();
resetButton.addEventListener(`click`, disableMap);
mainPin.addEventListener(`mousedown`, onMouseDown);
mainPin.addEventListener(`keydown`, onKeyDown);
