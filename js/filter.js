/* eslint-disable object-shorthand */
'use strict';

let pins = [];
const Filters = {
  type: `any`,
  price: `any`,
  room: `any`,
  guest: `any`
};

const HousePrice = {
  min: 10000,
  max: 50000
};

const checkPrice = function (ad) {
  switch (window.consts.housePriceSelect.value) {
    case `low`:
      return (ad.offer.price < HousePrice.min);
    case `middle`:
      return ad.offer.price >= HousePrice.min && ad.offer.price <= HousePrice.max;
    case `high`:
      return ad.offer.price > HousePrice.max;
  }
  return false;
};

const filterAd = function (ad) {
  return ((window.consts.houseTypeSelect.value === Filters.type) ? true : (ad.offer.type === window.consts.houseTypeSelect.value)) &&
    ((window.consts.housePriceSelect.value === Filters.price) ? true : checkPrice(ad)) &&
    ((window.consts.houseRoomSelect.value === Filters.room) ? true : (ad.offer.rooms === window.consts.houseRoomSelect.value)) &&
    ((window.consts.houseGuestSelect.value === Filters.guest) ? true : (ad.offer.guests === window.consts.houseGuestSelect.value));
};

const getFilteredPins = function (ads) {
  let similiars = ads.filter(filterAd);
  return similiars.slice(0, window.consts.MAX_PINS);
};

const updatePins = function (ads) {
  ads = getFilteredPins(pins);
  window.form.removePins();

  const takeNumber = ads.length > window.consts.MAX_PINS ? window.consts.MAX_PINS : ads.length;
  for (let k = 0; k < takeNumber; k++) {
    const currentPin = window.pin.renderPins(ads[k]);
    window.consts.pinsContainer.appendChild(currentPin);
    window.pin.onPinClick(currentPin, ads[k]);
  }
};

const successHandler = function (ads) {
  pins = ads;
  updatePins(pins);
};

const errorHandler = function (errorMessage) {
  window.util.createErrorMessage(errorMessage);
};

const onFilterChange = function () {
  const card = window.consts.pinsContainer.querySelector(`.map__card`);
  if (card) {
    window.consts.pinsContainer.removeChild(card);
  }
  window.backend.load(successHandler, errorHandler);
};

window.filter = {
  onFilterChange: onFilterChange,
  errorHandler: errorHandler,
  successHandler: successHandler
};


