/* eslint-disable object-shorthand */
"use strict";


const resetForm = function () {
  window.consts.adForm.querySelectorAll(`input`).forEach(function (element) {
    element.value = ``;
    return element;
  });
  window.move.setAddress(window.pin.mainPin);
};

const disableFormControls = function (controls) {
  for (let i = 0; i < controls.length; i++) {
    controls[i].setAttribute(`disabled`, `disabled`);
  }
  window.consts.mapFiltersForm.setAttribute(`disabled`, `disabled`);
};

const enableControls = function (controls) {
  for (let i = 0; i < controls.length; i++) {
    controls[i].removeAttribute(`disabled`, `disabled`);
  }
  window.consts.mapFiltersForm.removeAttribute(`disabled`, `disabled`);
};

const errorMessage = function () {
  const message = window.consts.error.cloneNode(true);
  message.querySelector(`.error`).addEventListener(`click`, closeErrorMessage);
  window.consts.main.appendChild(message);
};

const closeErrorMessage = function () {
  window.consts.main.removeChild(window.consts.main.querySelector(`.error`));
  document.removeEventListener(`keydown`, onErrorEscPress);
};

const onErrorEscPress = function (evt) {
  window.util.isEscKeyCode(evt, closeErrorMessage);
};

const onSuccessEscPress = function (evt) {
  window.util.isEscKeyCode(evt, closeSuccessMessage);
};

const closeSuccessMessage = function () {
  window.consts.main.removeChild(window.consts.main.querySelector(`.success`));
  document.removeEventListener(`keydown`, onSuccessEscPress);
};

const successMessage = function () {
  const message = window.consts.success.cloneNode(true);
  message.querySelector(`.success`).addEventListener(`click`, closeSuccessMessage);
  window.consts.main.appendChild(message);
};

const removePins = function () {
  const pins = window.consts.pinsContainer.querySelectorAll(`.map__pin`);

  for (let i = 1; i < pins.length; i++) {
    window.consts.pinsContainer.removeChild(pins[i]);
  }
};

const addFormListeners = function () {
  window.consts.housingSelect.addEventListener(`change`, window.validation.onHousingTypeChange);
  window.consts.timeinSelect.addEventListener(`change`, window.validation.onTimeoutChange);
  window.consts.timeoutSelect.addEventListener(`change`, window.validation.onTimeinChange);
  window.consts.adForm.addEventListener(`submit`, submitHandler);
  window.consts.houseTypeSelect.addEventListener(`change`, window.filter.onFilterChange);
  window.consts.housePriceSelect.addEventListener(`change`, window.filter.onFilterChange);
};

const activateMap = function () {
  window.consts.map.classList.remove(`map--faded`);
  window.filter.onFilterChange();
  window.consts.mapFiltersForm.classList.remove(`map__filters--disabled`);
  window.consts.adForm.classList.remove(`ad-form--disabled`);
  addFormListeners();
  enableControls(window.consts.fieldsets);
  enableControls(window.consts.inputs);
  enableControls(window.consts.adFormSelects);
  enableControls(window.consts.mapFiltersSelects);
};

const disableMap = function () {
  window.consts.map.classList.add(`map--faded`);
  window.consts.mainPin.style.left = window.move.MainPin.DEFAULT_X;
  window.consts.mainPin.style.top = window.move.MainPin.DEFAULT_Y;
  disableFormControls(window.consts.fieldsets);
  disableFormControls(window.consts.inputs);
  disableFormControls(window.consts.adFormSelects);
  disableFormControls(window.consts.mapFiltersSelects);
  removePins();
  resetForm();
};

const submitHandler = function (evt) {
  window.backend.upload(successMessage, errorMessage, new FormData(window.consts.adForm));
  evt.preventDefault();
  disableMap();
};

window.form = {
  disableFormControls: disableFormControls,
  activateMap: activateMap,
  disableMap: disableMap,
  removePins: removePins,
};


