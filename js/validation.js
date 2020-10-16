"use strict";
(function () {

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

  const adForm = document.querySelector(`.ad-form`);
  const roomNumberSelect = document.querySelector(`#room_number`);
  const capacitySelect = document.querySelector(`#capacity`);
  let roomsNumber = roomNumberSelect.value;
  let capacityNumber = capacitySelect.value;
  const housingSelect = adForm.querySelector(`#type`);
  const priceInput = adForm.querySelector(`#price`);
  const timeinSelect = adForm.querySelector(`#timein`);
  const timeoutSelect = adForm.querySelector(`#timeout`);

  const onHousingTypeChange = function () {
    priceInput.min = MinPrice[housingSelect.value];
    priceInput.placeholder = MinPrice[housingSelect.value];
  };

  const setTimeOption = function (element, value) {
    element.value = value;
  };

  const onTimeoutChange = function (evt) {
    setTimeOption(timeoutSelect, evt.target.value);
  };

  const onTimeinChange = function (evt) {
    setTimeOption(timeinSelect, evt.target.value);
  };

  const syncRoomsGuests = function (rooms, guests) {
    if ((guests > rooms && rooms !== 100) || (rooms !== 100 && guests === 0) || (rooms === 100 && guests > 0)) {
      capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    } else {
      capacitySelect.setCustomValidity(``);
    }
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

  window.validation = {
    syncRoomsGuests: syncRoomsGuests,
    onHousingTypeChange: onHousingTypeChange,
    onTimeinChange: onTimeinChange,
    onTimeoutChange: onTimeoutChange,
    housingSelect: housingSelect,
    timeinSelect: timeinSelect,
    timeoutSelect: timeoutSelect

  };

})();
