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

const resetCheckbox = function (items) {
  items.forEach(function (item) {
    if (item.checked) {
      item.checked = false;
    }
    return item;
  });
};

const resetForm = function () {
  adForm.querySelectorAll(`input`).forEach(function (item) {
    item.value = ``;
    return item;
  });
  resetCheckbox(checkedFeaturesItems);
};

const resetFilters = function () {
  mapFiltersForm.querySelectorAll(`select`).forEach(function (item) {
    item.value = `any`;
    return item;
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

const errorMessage = function () {
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

const successMessage = function () {
  const message = success.cloneNode(true);
  message.querySelector(`.success`).addEventListener(`click`, closeSuccessMessage);
  main.appendChild(message);
};

const enableForm = function () {
  enableControls(fieldsets);
  enableControls(inputs);
  enableControls(adFormSelects);
  enableControls(mapFiltersSelects);
};

const disableForm = function () {
  disableFormControls(fieldsets);
  disableFormControls(inputs);
  disableFormControls(adFormSelects);
  disableFormControls(mapFiltersSelects);
};

window.form = {
  enable: enableForm,
  disable: disableForm,
  reset: resetForm,
  resetFilters: resetFilters,
  success: successMessage,
  error: errorMessage
};


