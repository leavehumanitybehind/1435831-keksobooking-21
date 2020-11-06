"use strict";

const adForm = document.querySelector(`.ad-form`);
const roomNumberSelect = document.querySelector(`#room_number`);
const capacitySelect = document.querySelector(`#capacity`);
const housingSelect = adForm.querySelector(`#type`);
const priceInput = adForm.querySelector(`#price`);
const timeinSelect = adForm.querySelector(`#timein`);
const timeoutSelect = adForm.querySelector(`#timeout`);
let roomsNumber = roomNumberSelect.value;
let capacityNumber = capacitySelect.value;
const inputs = adForm.querySelectorAll(`input`);

const VALIDITY_TEXT = {
  1: `1 комната - для 1 гостя`,
  2: ` 2 комнаты  - для 2 гостей или 1 гостя`,
  3: `3 комнаты  - для 3 гостей, 2 гостей или 1 гостя`,
  100: `100 комнат не для гостей `,
};

const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
const MAX_PRICE = 1000000;


const onHousingTypeChange = function () {
  priceInput.min = MIN_PRICE[housingSelect.value];
  priceInput.placeholder = MIN_PRICE[housingSelect.value];
  let minPrice = MIN_PRICE[adForm.type.value];
  adForm.price.setAttribute(`min`, minPrice);
};

const onPriceInputChange = function () {
  if (priceInput.value > MAX_PRICE) {
    priceInput.setCustomValidity(`Максимальная цена ` + MAX_PRICE);
    priceInput.classList.add(`invalid`);
    return;
  }
  priceInput.setCustomValidity(``);
  priceInput.classList.remove(`invalid`);
};


const setTimeOption = function (timeSelect, value) {
  timeSelect.value = value;
};

const onTimeoutChange = function (evt) {
  setTimeOption(timeoutSelect, evt.target.value);
};

const onTimeinChange = function (evt) {
  setTimeOption(timeinSelect, evt.target.value);
};

const setErrorStyle = function (selector) {
  selector.style.border = `2px dashed #ff0000`;
};

const clearErrorStyle = function (selector) {
  selector.style.border = ``;
};

const syncRoomsGuests = function (rooms, guests) {
  if (guests > rooms && rooms !== 100) {
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    setErrorStyle(capacitySelect);
    return;
  }
  if (rooms !== 100 && guests === 0) {
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    setErrorStyle(capacitySelect);
    return;
  }
  if (rooms === 100 && guests > 0) {
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    setErrorStyle(capacitySelect);
    return;
  }
  capacitySelect.setCustomValidity(``);
  clearErrorStyle(capacitySelect);
};

roomNumberSelect.addEventListener(`change`, function () {
  roomsNumber = roomNumberSelect.value;
  syncRoomsGuests(roomsNumber, capacityNumber);
});

capacitySelect.addEventListener(`change`, function () {
  capacityNumber = capacitySelect.value;
  capacitySelect.setCustomValidity(``);
  syncRoomsGuests(roomsNumber, capacityNumber);
});

const addChangeListeners = function () {
  housingSelect.addEventListener(`change`, onHousingTypeChange);
  priceInput.addEventListener(`change`, onPriceInputChange);
  timeinSelect.addEventListener(`change`, onTimeoutChange);
  timeoutSelect.addEventListener(`change`, onTimeinChange);
};

const removeChangeListeners = function () {
  housingSelect.removeEventListener(`change`, onHousingTypeChange);
  priceInput.removeEventListener(`change`, onPriceInputChange);
  timeinSelect.removeEventListener(`change`, onTimeoutChange);
  timeoutSelect.removeEventListener(`change`, onTimeinChange);
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


window.validation = {
  change: addChangeListeners,
  remove: removeChangeListeners,
  check: checkValidity,
  setError: setErrorStyle,
  clearError: clearErrorStyle
};
