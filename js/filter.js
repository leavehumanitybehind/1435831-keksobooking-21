/* eslint-disable object-shorthand */
'use strict';

const pinsContainer = document.querySelector(`.map__pins`);
const houseTypeSelect = document.querySelector(`#housing-type`);
const housePriceSelect = document.querySelector(`#housing-price`);
const houseRoomSelect = document.querySelector(`#housing-rooms`);
const houseGuestSelect = document.querySelector(`#housing-guests`);
const houseFeaturesSelect = document.querySelector(`#housing-features`);
const card = pinsContainer.querySelector(`.map__card`);
const MAX_PINS = 5;
let pins = [];
let activePin = false;

const Filters = {
  type: `any`,
  price: `any`,
  room: `any`,
  guest: `any`,
  features: []
};

const HousePrice = {
  min: 10000,
  max: 50000
};


const filtrationByFeatures = function (item) {
  const checkedFeaturesItems = houseFeaturesSelect.querySelectorAll(`input:checked`);
  return Array.from(checkedFeaturesItems).every(function (element) {
    return item.offer.features.includes(element.value);
  });
};


const checkPrice = function (ad) {
  switch (housePriceSelect.value) {
    case `low`:
      return (ad.offer.price < HousePrice.min);
    case `medium`:
      return ad.offer.price >= HousePrice.min && ad.offer.price <= HousePrice.max;
    case `high`:
      return ad.offer.price > HousePrice.max;
  }
  return false;
};

const filterAd = function (ad) {
  return ((houseTypeSelect.value === Filters.type) ? true : (ad.offer.type === houseTypeSelect.value)) &&
    ((housePriceSelect.value === Filters.price) ? true : checkPrice(ad)) &&
    ((houseRoomSelect.value === Filters.room) ? true : (ad.offer.rooms === parseInt(houseRoomSelect.value, 10))) &&
    ((houseGuestSelect.value === Filters.guest) ? true : (ad.offer.guests === parseInt(houseGuestSelect.value, 10))) &&
    filtrationByFeatures(ad);
};

const getFilteredPins = function (ads) {
  let similiars = ads.filter(filterAd);
  return similiars.slice(0, MAX_PINS);
};


const onPinClick = function (pin, ad) {
  pin.addEventListener(`click`, function (evt) {
    if (activePin !== evt.currentTarget) {
      pinsContainer.appendChild(window.card.render(ad));
      window.pin.activate(evt.currentTarget);
    }
  });
};

const removePins = function () {
  const allPins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  allPins.forEach(function (pin) {
    pinsContainer.removeChild(pin);
  });
};

const updatePins = function (ads) {
  ads = getFilteredPins(pins);
  removePins();

  const numberOfPins = ads.length > MAX_PINS ? MAX_PINS : ads.length;
  for (let k = 0; k < numberOfPins; k++) {
    const currentPin = window.pin.render(ads[k]);
    pinsContainer.appendChild(currentPin);
    onPinClick(currentPin, ads[k]);
  }
};

const successHandler = function (data) {
  pins = data;
  updatePins(pins);
};

const errorHandler = function (errorMessage) {
  window.util.createErrorMessage(errorMessage);
};

const changeFilterHandler = function () {
  houseTypeSelect.addEventListener(`change`, onFilterChange);
  housePriceSelect.addEventListener(`change`, onFilterChange);
  houseRoomSelect.addEventListener(`change`, onFilterChange);
  houseGuestSelect.addEventListener(`change`, onFilterChange);
  houseFeaturesSelect.addEventListener(`change`, onFilterChange);
};

const onFilterChange = function () {
  if (card) {
    pinsContainer.removeChild(card);
  }
  changeFilterHandler();
  window.backend.load(successHandler, errorHandler);
};


window.filter = {
  change: onFilterChange,
  error: errorHandler,
  success: successHandler,
  removePins: removePins
};


