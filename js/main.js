'use strict';

const MOUSE_LEFT_CLICK = 1;
const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);
const resetButton = adForm.querySelector(`.ad-form__reset`);
const submitButton = adForm.querySelector(`.ad-form__submit`);

const onSuccessLoad = (data) => {
  window.pin.ads = data;
  window.pin.render(window.pin.ads);
};

const onErrorLoad = (errorMessage) => {
  window.util.createErrorMessage(errorMessage);
};

const onResetButtonClick = (evt) => {
  evt.preventDefault();
  disableMap();
};

const activateMap = () => {
  map.classList.remove(`map--faded`);
  mapFiltersForm.classList.remove(`map__filters--disabled`);
  adForm.classList.remove(`ad-form--disabled`);
  addListeners();
  window.filter.change();
  window.form.enable();
  window.move.address(window.move.getCoords);
  window.backend.load(onSuccessLoad, onErrorLoad);
};

const disableMap = () => {
  map.classList.add(`map--faded`);
  window.form.disable();
  window.pin.remove();
  window.form.reset();
  window.form.resetFilters();
  window.card.disable();
  window.filter.remove();
  window.photo.reset();
  removeListeners();
  mainPin.addEventListener(`mousedown`, onMouseDown);
  mainPin.addEventListener(`keydown`, onKeyDown);
  mapFiltersForm.classList.add(`map__filters--disabled`);
  adForm.classList.add(`ad-form--disabled`);
  window.move.getDefaultCoords();
  window.move.setDefaultPosition();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  window.backend.upload(window.form.success, window.form.error, new FormData(adForm));
  disableMap();
};

const addListeners = () => {
  window.validation.change();
  window.photo.addListeners();
  adForm.addEventListener(`submit`, onFormSubmit);
  submitButton.addEventListener(`click`, window.validation.onInputCheck);
  resetButton.addEventListener(`click`, onResetButtonClick);
};

const removeListeners = () => {
  window.validation.remove();
  window.photo.removeListeners();
  adForm.removeEventListener(`submit`, onFormSubmit);
  resetButton.removeEventListener(`click`, onResetButtonClick);
  submitButton.removeEventListener(`click`, window.validation.onInputCheck);
};

const onMouseDown = (evt) => {
  if (evt.which === MOUSE_LEFT_CLICK) {
    activateMap();
  }
  mainPin.removeEventListener(`mousedown`, onMouseDown);
};

const onKeyDown = (evt) => {
  if (window.util.isEnterKeyPress(evt.key)) {
    activateMap();
  }
  mainPin.removeEventListener(`keydown`, onKeyDown);
};

disableMap();

