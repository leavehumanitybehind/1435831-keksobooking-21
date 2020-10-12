"use strict";
(function () {

  const VALIDITY_TEXT = {
    1: `1 комната - для 1 гостя`,
    2: ` 2 комнаты  - для 2 гостей или 1 гостя`,
    3: `3 комнаты  - для 3 гостей, 2 гостей или 1 гостя`,
    100: `100 комнат не для гостей `,
  };

  const roomNumberSelect = document.querySelector(`#room_number`);
  const capacitySelect = document.querySelector(`#capacity`);
  let roomsNumber = roomNumberSelect.value;
  let capacityNumber = capacitySelect.value;

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

  window.validity = {
    syncRoomsGuests: syncRoomsGuests

  };

})();
