/* eslint-disable object-shorthand */
"use strict";
(function () {

  const adForm = document.querySelector(`.ad-form`);
  const mapFiltersForm = document.querySelector(`.map__filters`);
  const mapFiltersSelects = mapFiltersForm.querySelectorAll(`select`);
  const adFormSelects = adForm.querySelectorAll(`select`);
  const fieldsets = adForm.querySelectorAll(`.fieldset`);
  const inputs = adForm.querySelectorAll(`input`);
  const success = document.querySelector(`#success`).content;
  const error = document.querySelector(`#error`).content;
  const main = document.querySelector(`main`);

  const resetForm = function () {
    adForm.querySelectorAll(`input`).forEach((element) => element.value = ``);
    window.move.setAddress(window.pin.mainPin);
  };

  const disableFormControls = function (controls) {
    for (let i = 0; i < controls.length; i++) {
      controls[i].setAttribute(`disabled`, `disabled`);
    }
    mapFiltersForm.setAttribute(`disabled`, `disabled`);
  };

  const enableControls = function (controls) {
    for (let i = 0; i < controls.length; i++) {
      controls[i].removeAttribute(`disabled`, `disabled`);
    }
    mapFiltersForm.removeAttribute(`disabled`, `disabled`);
  };

  const errorMessage = function () {
    const message = error.cloneNode(true);
    message.querySelector(`.success`).addEventListener(`click`, closeErrorMessage);
    main.appendChild(message);
  };

  const closeErrorMessage = function () {
    main.removeChild(main.querySelector(`.error`));
    document.removeEventListener(`keydown`, onErrorEscPress);
  };

  const onErrorEscPress = function (evt) {
    window.util.isEscKeyCode(evt, closeErrorMessage);
  };

  const onSuccessEscPress = function (evt) {
    window.util.isEscKeyCode(evt, closeSuccessMessage);
  };

  const closeSuccessMessage = function () {
    main.removeChild(main.querySelector(`.success`));
    document.removeEventListener(`keydown`, onSuccessEscPress);
  };

  const successMessage = function () {
    const message = success.cloneNode(true);
    message.querySelector(`.success`).addEventListener(`click`, closeSuccessMessage);
    main.appendChild(message);
  };

  const addFormListeners = function () {
    window.validation.housingSelect.addEventListener(`change`, window.validation.onHousingTypeChange);
    window.validation.timeinSelect.addEventListener(`change`, window.validation.onTimeoutChange);
    window.validation.timeoutSelect.addEventListener(`change`, window.validation.onTimeinChange);
    adForm.addEventListener(`submit`, submitHandler);
  };

  const activateMap = function () {
    window.move.map.classList.remove(`map--faded`);
    window.backend.load(window.pin.successHandler, window.pin.errorHandler);
    mapFiltersForm.classList.remove(`map__filters--disabled`);
    adForm.classList.remove(`ad-form--disabled`);
    addFormListeners();
    enableControls(fieldsets);
    enableControls(inputs);
    enableControls(adFormSelects);
    enableControls(mapFiltersSelects);
  };

  const disableMap = function () {
    window.move.map.classList.add(`map--faded`);
    window.move.mainPin.style.left = window.move.MainPin.DEFAULT_X;
    window.move.mainPin.style.top = window.move.MainPin.DEFAULT_Y;
    disableFormControls(fieldsets);
    disableFormControls(inputs);
    disableFormControls(adFormSelects);
    disableFormControls(mapFiltersSelects);
    window.pin.removePins();
    resetForm();
  };

  const submitHandler = function (evt) {
    window.backend.upload(successMessage, errorMessage, new FormData(adForm));
    evt.preventDefault();
    disableMap();
  };

  window.form = {
    disableFormControls: disableFormControls,
    activateMap: activateMap,
    disableMap: disableMap,
    fieldsets: fieldsets,
    inputs: inputs,
    adFormSelects: adFormSelects,
    mapFiltersSelects: mapFiltersSelects
  };

})();
