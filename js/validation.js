"use strict";

let roomsNumber = window.consts.roomNumberSelect.value;
let capacityNumber = window.consts.capacitySelect.value;

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

const onHousingTypeChange = function () {
  window.consts.priceInput.min = MinPrice[window.consts.housingSelect.value];
  window.consts.priceInput.placeholder = MinPrice[window.consts.housingSelect.value];
};

const setTimeOption = function (element, value) {
  element.value = value;
};

const onTimeoutChange = function (evt) {
  setTimeOption(window.consts.timeoutSelect, evt.target.value);
};

const onTimeinChange = function (evt) {
  setTimeOption(window.consts.timeinSelect, evt.target.value);
};

const syncRoomsGuests = function (rooms, guests) {
  if ((guests > rooms && rooms !== 100) || (rooms !== 100 && guests === 0) || (rooms === 100 && guests > 0)) {
    window.consts.capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
  } else {
    window.consts.capacitySelect.setCustomValidity(``);
  }
};

window.consts.roomNumberSelect.addEventListener(`change`, function () {
  roomsNumber = window.consts.roomNumberSelect.value;
  syncRoomsGuests(roomsNumber, capacityNumber);
});

window.consts.capacitySelect.addEventListener(`change`, function () {
  capacityNumber = window.consts.capacitySelect.value;
  window.consts.capacitySelect.setCustomValidity(``);
  syncRoomsGuests(roomsNumber, capacityNumber);
});

window.validation = {
  syncRoomsGuests: syncRoomsGuests,
  onHousingTypeChange: onHousingTypeChange,
  onTimeinChange: onTimeinChange,
  onTimeoutChange: onTimeoutChange
};
