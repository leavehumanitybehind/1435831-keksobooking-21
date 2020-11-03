'use strict';

const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);
const resetButton = adForm.querySelector(`.ad-form__reset`);
const MOUSE_LEFT_CLICK = 1;
const MAIN_PIN_DEFAULT_X = `570px`;
const MAIN_PIN_DEFAULT_Y = `375px`;


const onResetButtonClick = function () {
  resetButton.addEventListener(`click`, (evt) => {
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
};

const disableMap = function () {
  map.classList.add(`map--faded`);
  window.form.disable();
  window.pin.remove();
  window.form.reset();
  window.form.resetFilters();
  window.card.disable();
  window.move.address(window.move.getCoords);
  mainPin.style.left = MAIN_PIN_DEFAULT_X;
  mainPin.style.top = MAIN_PIN_DEFAULT_Y;
  window.filter.remove();
  window.photo.reset();
  removeListeners();
  onResetButtonClick();
  mainPin.addEventListener(`mousedown`, onMouseDown);
  mainPin.addEventListener(`keydown`, onKeyDown);
  mapFiltersForm.classList.add(`map__filters--disabled`);
  adForm.classList.add(`ad-form--disabled`);
};


const onSubmitForm = function (evt) {
  evt.preventDefault();
  window.backend.upload(window.form.success, window.form.error, new FormData(adForm));
  disableMap();
};

const addListeners = function () {
  window.validation.change();
  adForm.addEventListener(`change`, window.form.check);
  adForm.addEventListener(`submit`, onSubmitForm);


};

const removeListeners = function () {
  window.validation.remove();
  adForm.removeEventListener(`submit`, onSubmitForm);
  resetButton.removeEventListener(`click`, onResetButtonClick);
};


const onMouseDown = function (evt) {
  if (evt.which === MOUSE_LEFT_CLICK) {
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

