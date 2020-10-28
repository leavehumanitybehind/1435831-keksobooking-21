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

const VALIDITY_TEXT = {
  1: `1 комната - для 1 гостя`,
  2: ` 2 комнаты  - для 2 гостей или 1 гостя`,
  3: `3 комнаты  - для 3 гостей, 2 гостей или 1 гостя`,
  100: `100 комнат не для гостей `,
};

let MinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
const MAX_PRICE = 1000000;

const onHousingTypeChange = function () {
  priceInput.min = MinPrice[housingSelect.value];
  priceInput.placeholder = MinPrice[housingSelect.value];
  let minPrice = MinPrice[adForm.type.value];
  adForm.price.setAttribute(`min`, minPrice);
};

const setPriceLimit = function () {
  if (priceInput.value > MAX_PRICE) {
    priceInput.setCustomValidity(`Максимальная цена ` + MAX_PRICE);
    return;
  }
  priceInput.setCustomValidity(``);
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

const syncRoomsGuests = function (rooms, guests) {
  if (guests > rooms && rooms !== 100) {
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    return;
  }
  if (rooms !== 100 && guests === 0) {
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    return;
  }
  if (rooms === 100 && guests > 0) {
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    return;
  }
  capacitySelect.setCustomValidity(``);
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

const onChangeSelect = function () {
  housingSelect.addEventListener(`change`, onHousingTypeChange);
  priceInput.addEventListener(`change`, setPriceLimit);
  timeinSelect.addEventListener(`change`, onTimeoutChange);
  timeoutSelect.addEventListener(`change`, onTimeinChange);
};

const onRemoveSelect = function () {
  housingSelect.removeEventListener(`change`, onHousingTypeChange);
  priceInput.removeEventListener(`change`, setPriceLimit);
  timeinSelect.removeEventListener(`change`, onTimeoutChange);
  timeoutSelect.removeEventListener(`change`, onTimeinChange);
};


window.validation = {
  change: onChangeSelect,
  remove: onRemoveSelect
};
