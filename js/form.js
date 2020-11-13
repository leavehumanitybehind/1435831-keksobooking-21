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
const capacitySelect = document.querySelector(`#capacity`);


const resetCheckboxes = (checkboxes) => {
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  });
};

const resetForm = () => {
  adForm.reset();
  capacitySelect.style.border = ``;
  resetCheckboxes(checkedFeaturesItems);
};

const resetFilters = () => {
  mapFiltersForm.querySelectorAll(`select`).forEach((option) => {
    option.value = `any`;
    return option;
  });
  resetCheckboxes(checkedFeaturesFilters);
};

const disableFormControls = (controls) => {
  controls.forEach((control) => {
    control.setAttribute(`disabled`, `disabled`);
  });
  mapFiltersForm.setAttribute(`disabled`, `disabled`);
};

const enableControls = (controls) => {
  controls.forEach((control) => {
    control.removeAttribute(`disabled`, `disabled`);
  });
  mapFiltersForm.removeAttribute(`disabled`, `disabled`);
};

const closeErrorMessage = () => {
  main.removeChild(main.querySelector(`.error`));
  document.removeEventListener(`keydown`, onErrorEscPress);
  document.removeEventListener(`click`, closeErrorMessage);
};

const onErrorEscPress = (key) => {
  if (window.util.isEscKeyPress(key)) {
    closeErrorMessage();
  }
};

const showErrorMessage = () => {
  const message = error.cloneNode(true);
  message.querySelector(`.error`).addEventListener(`click`, onErrorMessageClick);
  main.appendChild(message);
};

const onSuccessEscPress = (key) => {
  if (window.util.isEscKeyPress(key)) {
    closeSuccessMessage();
  }
};

const onErrorMessageClick = () => {
  closeErrorMessage();
};

const onSuccessMessageClick = () => {
  closeSuccessMessage();
};

const closeSuccessMessage = () => {
  main.removeChild(main.querySelector(`.success`));
  document.removeEventListener(`keydown`, onSuccessEscPress);
  document.removeEventListener(`click`, onSuccessMessageClick);
};

const showSuccessMessage = () => {
  const message = success.cloneNode(true);
  message.querySelector(`.success`).addEventListener(`click`, onSuccessMessageClick);
  main.appendChild(message);
};

const enableForm = () => {
  enableControls(fieldsets);
  enableControls(inputs);
  enableControls(adFormSelects);
  enableControls(mapFiltersSelects);
  adForm.removeAttribute(`disabled`, `disabled`);
  submitButton.removeAttribute(`disabled`, `disabled`);
  resetButton.removeAttribute(`disabled`, `disabled`);
  textArea.removeAttribute(`disabled`, `disabled`);
};

const disableForm = () => {
  disableFormControls(fieldsets);
  disableFormControls(inputs);
  disableFormControls(adFormSelects);
  disableFormControls(mapFiltersSelects);
  adForm.setAttribute(`disabled`, `disabled`);
  submitButton.setAttribute(`disabled`, `disabled`);
  resetButton.setAttribute(`disabled`, `disabled`);
  textArea.setAttribute(`disabled`, `disabled`);
};

window.form = {
  enable: enableForm,
  disable: disableForm,
  reset: resetForm,
  resetFilters,
  success: showSuccessMessage,
  error: showErrorMessage,
};


