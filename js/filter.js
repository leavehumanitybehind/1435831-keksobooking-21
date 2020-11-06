/* eslint-disable object-shorthand */
'use strict';

const filter = document.querySelector(`.map__filters`);
const pinsContainer = document.querySelector(`.map__pins`);
const houseTypeSelect = document.querySelector(`#housing-type`);
const housePriceSelect = document.querySelector(`#housing-price`);
const houseRoomSelect = document.querySelector(`#housing-rooms`);
const houseGuestSelect = document.querySelector(`#housing-guests`);
const houseFeaturesSelect = document.querySelector(`#housing-features`);
const MAX_PINS = 5;

let pins = [];

const FiltersValue = {
  ANY: `any`,
  TYPE: `type`,
  PRICE: `price`,
  ROOM: `rooms`,
  GUEST: `guests`
};

const HousePrice = {
  MIN: 10000,
  MAX: 50000
};

const HousePriceType = {
  LOW: `low`,
  MEDIUM: `middle`,
  HIGH: `high`
};

const checkPrice = function (ad, price) {
  switch (housePriceSelect.value) {
    case FiltersValue.ANY:
      return true;
    case HousePriceType.LOW:
      return (price < HousePrice.MIN);
    case HousePriceType.MEDIUM:
      return price >= HousePrice.MIN && price <= HousePrice.MAX;
    case HousePriceType.HIGH:
      return price > HousePrice.MAX;
  }
  return false;
};

const checkFeatures = function (ad) {
  const checkedFeatures = houseFeaturesSelect.querySelectorAll(`input:checked`);
  return Array.from(checkedFeatures).every(function (checkbox) {
    return ad.offer.features.includes(checkbox.value);
  });
};

const filterElement = function (select, optionValue, ad) {
  return select.value === FiltersValue.ANY ? true : select.value === ad.offer[optionValue].toString();
};

const filterAd = function (ad) {
  return (filterElement(houseTypeSelect, FiltersValue.TYPE, ad)) &&
    (filterElement(houseRoomSelect, FiltersValue.ROOM, ad)) &&
    (filterElement(houseGuestSelect, FiltersValue.GUEST, ad)) &&
    checkFeatures(ad) && checkPrice(ad, ad.offer.price);
};

const getFilteredAds = function (ad) {
  let similiarAds = ad.filter(filterAd);
  return similiarAds.slice(0, MAX_PINS);
};

const updatePins = function (ads) {
  ads = getFilteredAds(pins);
  const numbersOfPins = ads.length > MAX_PINS ? MAX_PINS : ads.length;
  for (let i = 0; i < numbersOfPins; i++) {
    const currentPin = window.pin.render(ads[i]);
    pinsContainer.appendChild(currentPin);
    window.pin.activate(currentPin, ads[i]);
  }
};

const onSuccessLoad = function (data) {
  pins = data;
  updatePins(pins);
};

const onErrorLoad = function (errorMessage) {
  window.util.createErrorMessage(errorMessage);
};


const addChangeListeners = function () {
  filter.addEventListener(`change`, enableFilters);
};

const removeChangeListeners = function () {
  filter.removeEventListener(`change`, enableFilters);

};

const enableFilters = function () {
  addChangeListeners();
  window.card.disable();
  window.pin.remove();
  window.debounce(updatePins(pins));
};


window.filter = {
  remove: removeChangeListeners,
  change: addChangeListeners,
  error: onErrorLoad,
  success: onSuccessLoad,
};


