'use strict';

const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);
const resetButton = adForm.querySelector(`.ad-form__reset`);
const MOUSE_LEFT_CLICK = 1;

const clickOnResetButton = function () {
  resetButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    disableMap();
  });
};

const activateMap = function () {
  map.classList.remove(`map--faded`);
  mapFiltersForm.classList.remove(`map__filters--disabled`);
  adForm.classList.remove(`ad-form--disabled`);
  addListeners();
  window.filter.change();
  window.form.enable();
  window.move.address(window.move.getCoords);
  window.backend.load(window.filter.success, window.filter.error);
};

const disableMap = function () {
  map.classList.add(`map--faded`);
  window.form.disable();
  window.pin.remove();
  window.form.reset();
  window.form.resetFilters();
  window.card.disable();
  window.move.defaultCoords();
  window.filter.remove();
  window.photo.reset();
  removeListeners();
  clickOnResetButton();
  mainPin.addEventListener(`mousedown`, onMouseDown);
  mainPin.addEventListener(`keydown`, onKeyDown);
  mapFiltersForm.classList.add(`map__filters--disabled`);
  adForm.classList.add(`ad-form--disabled`);
};


const onFormSubmit = function (evt) {
  evt.preventDefault();
  window.backend.upload(window.form.success, window.form.error, new FormData(adForm));
  disableMap();
};

const addListeners = function () {
  window.validation.change();
  window.photo.add();
  adForm.addEventListener(`change`, window.validation.check);
  adForm.addEventListener(`submit`, onFormSubmit);


};

const removeListeners = function () {
  window.validation.remove();
  window.photo.remove();
  adForm.removeEventListener(`submit`, onFormSubmit);
  resetButton.removeEventListener(`click`, clickOnResetButton);
};


const onMouseDown = function (evt) {
  if (evt.which === MOUSE_LEFT_CLICK) {
    activateMap();
  }
  mainPin.removeEventListener(`mousedown`, onMouseDown);
};

const onKeyDown = function (evt) {
  if (window.util.isEnterKeyPress(evt.key)) {
    activateMap();
  }
  mainPin.removeEventListener(`keydown`, onKeyDown);
};

disableMap();

