"use strict";
(function () {
  const mapFilters = mapFiltersForm.querySelectorAll(`.map__filter`);
  const cardElement = document.querySelector(`.map`);

  const setFormAttribute = function (array, boolean) {
    array.forEach(function (element) {
      element.setAttribute(`disabled`, boolean);
    });
  };

  const deleteFormAttribute = function (array) {
    array.forEach(function (element) {
      element.removeAttribute(`disabled`, `disabled`);
    });
  };

  window.form.changeAttributeState = function () {
    if (!window.form.isActivate) {
      setFormAttribute(mapFilters, true);
      setFormAttribute(adFormElements, true);
    } else {
      deleteFormAttribute(mapFilters);
      deleteFormAttribute(adFormElements);
      cardElement.classList.remove(`map--faded`);
      mapFiltersForm.classList.remove(`map__filters--disabled`);
      adForm.classList.remove(`ad-form--disabled`);
    }
  };


  const adForm = document.querySelector(`.ad-form`);
  const adFormElements = adForm.querySelectorAll(`fieldset`);
  const mapFiltersForm = document.querySelector(`.map__filters`);
  const roomNumber = document.querySelector(`#room_number`);
  const capacity = document.querySelector(`#capacity`);
  capacity.value = roomNumber.value;
  const isActivate = false;

  const disableOptions = function () {
    for (let i = 0; i < capacity.options.length; i++) {
      capacity.options[i].setAttribute(`disabled`, `disabled`);
    }
  };

  const disableOption = function (index) {
    capacity.options[index].setAttribute(`disabled`, `disabled`);
  };

  const resetCapacity = function () {
    for (let i = 0; i < capacity.options.length; i++) {
      capacity.options[i].removeAttribute(`disabled`, `disabled`);
    }
  };

  const syncRoomsGuestsAmount = function () {
    roomNumber.addEventListener(`change`, function () {
      resetCapacity();
      if (roomNumber.value === `100`) {
        capacity.value = 0;
        disableOptions();
      } else if (roomNumber.value === `1`) {
        capacity.value = 1;
        disableOptions();
      } else if (roomNumber.value === `2`) {
        capacity.value = 2;
        disableOption(0);
        disableOption(3);
      } else if (roomNumber.value === `3`) {
        capacity.value = 3;
        disableOption(3);
      }
    });
  };

  const setAddressCoords = function (pin) {
    const addressInput = adForm.querySelector(`#address`);
    addressInput.value = pin.offsetTop + window.map.PinSize.HEIGHT + `,` + (pin.offsetLeft + (window.map.PinSize.WIDTH / 2));
    addressInput.textContent = addressInput.value;
  };

  window.form = {
    setAddress: setAddressCoords,
    syncRoomsGuests: syncRoomsGuestsAmount,
    activate: isActivate
  };

})();
