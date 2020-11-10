"use strict";

const adForm = document.querySelector(`.ad-form`);
const roomNumberSelect = document.querySelector(`#room_number`);
const capacitySelect = document.querySelector(`#capacity`);
const housingSelect = adForm.querySelector(`#type`);
const priceInput = adForm.querySelector(`#price`);
const timeinSelect = adForm.querySelector(`#timein`);
const timeoutSelect = adForm.querySelector(`#timeout`);
const inputs = adForm.querySelectorAll(`input`);
let roomsNumber = roomNumberSelect.value;
let capacityNumber = capacitySelect.value;
const ERROR_STYLE = `2px dashed #ff0000`;

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

const onHousingTypeChange = () => {
  priceInput.min = MIN_PRICE[housingSelect.value];
  priceInput.placeholder = MIN_PRICE[housingSelect.value];
  const minPrice = MIN_PRICE[adForm.type.value];
  adForm.price.setAttribute(`min`, minPrice);
};

const onPriceInputChange = () => {
  if (priceInput.value > MAX_PRICE) {
    priceInput.setCustomValidity(`Максимальная цена ` + MAX_PRICE);
    return;
  }
  priceInput.setCustomValidity(``);
};

const setTimeOption = (timeSelect, value) => {
  timeSelect.value = value;
};

const onTimeoutChange = (evt) => {
  setTimeOption(timeoutSelect, evt.target.value);
};

const onTimeinChange = (evt) => {
  setTimeOption(timeinSelect, evt.target.value);
};

const syncRoomsGuests = (rooms, guests) => {
  if (guests > rooms && rooms !== 100) {
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    return;
  }
  if (rooms !== 100 && guests === 0) {
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    return;
  }
  if (rooms === 100 && guests !== 0) {
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    return;
  }
  capacitySelect.setCustomValidity(``);
};

roomNumberSelect.addEventListener(`change`, () => {
  roomsNumber = roomNumberSelect.value;
  syncRoomsGuests(roomsNumber, capacityNumber);
});

capacitySelect.addEventListener(`change`, () => {
  capacityNumber = capacitySelect.value;
  capacitySelect.setCustomValidity(``);
  syncRoomsGuests(roomsNumber, capacityNumber);
});

capacitySelect.addEventListener(`invalid`, () => {
  capacitySelect.style.border = ERROR_STYLE;
});


const addChangeListeners = () => {
  housingSelect.addEventListener(`change`, onHousingTypeChange);
  priceInput.addEventListener(`change`, onPriceInputChange);
  timeinSelect.addEventListener(`change`, onTimeoutChange);
  timeoutSelect.addEventListener(`change`, onTimeinChange);

};

const removeChangeListeners = () => {
  housingSelect.removeEventListener(`change`, onHousingTypeChange);
  priceInput.removeEventListener(`change`, onPriceInputChange);
  timeinSelect.removeEventListener(`change`, onTimeoutChange);
  timeoutSelect.removeEventListener(`change`, onTimeinChange);
};

const checkValidity = () => {
  inputs.forEach((input) => {
    adForm.checkValidity();
    input.addEventListener(`invalid`, () => {
      input.style.border = ERROR_STYLE;
    });
    input.style.border = ``;
  });
};

window.validation = {
  change: addChangeListeners,
  remove: removeChangeListeners,
  check: checkValidity
};
