/* eslint-disable object-shorthand */
"use strict";

const adForm = document.querySelector(`.ad-form`);
const success = document.querySelector(`#success`).content;
const error = document.querySelector(`#error`).content;
const main = document.querySelector(`main`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const mapFiltersSelects = mapFiltersForm.querySelectorAll(`select`);
const adFormSelects = adForm.querySelectorAll(`select`);
const fieldsets = adForm.querySelectorAll(`.fieldset`);
const inputs = adForm.querySelectorAll(`input`);
const houseFeaturesSelect = document.querySelector(`#housing-features`);
const checkedFeaturesFilters = houseFeaturesSelect.querySelectorAll(`input[type=checkbox]`);
const checkedFeaturesItems = adForm.querySelectorAll(`.feature__checkbox`);
const resetButton = adForm.querySelector(`.ad-form__reset`);
const submitButton = adForm.querySelector(`.ad-form__submit`);
const textArea = adForm.querySelector(`textarea`);


const resetCheckbox = function (checkboxes) {
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  });
};

const resetForm = function () {
  adForm.querySelectorAll(`input`).forEach(function (input) {
    input.value = ``;
    return input;
  });
  adForm.reset();
  resetCheckbox(checkedFeaturesItems);
};

const resetFilters = function () {
  mapFiltersForm.querySelectorAll(`select`).forEach(function (option) {
    option.value = `any`;
    return option;
  });
  resetCheckbox(checkedFeaturesFilters);
};

const disableFormControls = function (controls) {
  controls.forEach(function (control) {
    control.setAttribute(`disabled`, `disabled`);
  });
  mapFiltersForm.setAttribute(`disabled`, `disabled`);
};

const enableControls = function (controls) {
  controls.forEach(function (control) {
    control.removeAttribute(`disabled`, `disabled`);
  });
  mapFiltersForm.removeAttribute(`disabled`, `disabled`);
};

const closeErrorMessage = function () {
  main.removeChild(main.querySelector(`.error`));
  document.removeEventListener(`keydown`, onErrorEscPress);
  document.removeEventListener(`click`, closeErrorMessage);
};

const onErrorEscPress = function (evt) {
  window.util.isEscKeyCode(evt, closeErrorMessage);
};

const showErrorMessage = function () {
  const message = error.cloneNode(true);
  message.querySelector(`.error`).addEventListener(`click`, closeErrorMessage);
  main.appendChild(message);
};

const onSuccessEscPress = function (evt) {
  window.util.isEscKeyCode(evt, closeSuccessMessage);
};

const closeSuccessMessage = function () {
  main.removeChild(main.querySelector(`.success`));
  document.removeEventListener(`keydown`, onSuccessEscPress);
  document.removeEventListener(`click`, closeSuccessMessage);
};

const showSuccessMessage = function () {
  const message = success.cloneNode(true);
  message.querySelector(`.success`).addEventListener(`click`, closeSuccessMessage);
  main.appendChild(message);
};

const enableForm = function () {
  enableControls(fieldsets);
  enableControls(inputs);
  enableControls(adFormSelects);
  enableControls(mapFiltersSelects);
  adForm.removeAttribute(`disabled`, `disabled`);
  submitButton.removeAttribute(`disabled`, `disabled`);
  resetButton.removeAttribute(`disabled`, `disabled`);
  textArea.removeAttribute(`disabled`, `disabled`);

};


const disableForm = function () {
  disableFormControls(fieldsets);
  disableFormControls(inputs);
  disableFormControls(adFormSelects);
  disableFormControls(mapFiltersSelects);
  adForm.setAttribute(`disabled`, `disabled`);
  submitButton.setAttribute(`disabled`, `disabled`);
  resetButton.setAttribute(`disabled`, `disabled`);
  textArea.setAttribute(`disabled`, `disabled`);

};

const checkValidity = function () {
  inputs.forEach(function (input) {
    if (!input.checkValidity()) {
      input.style.border = `2px dashed #ff0000`;
    } else {
      input.style.border = ``;
    }
  });
};


window.form = {
  enable: enableForm,
  disable: disableForm,
  reset: resetForm,
  resetFilters: resetFilters,
  success: showSuccessMessage,
  error: showErrorMessage,
  check: checkValidity
};


