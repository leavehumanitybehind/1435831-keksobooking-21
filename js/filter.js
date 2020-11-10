'use strict';

const filter = document.querySelector(`.map__filters`);
const houseTypeSelect = document.querySelector(`#housing-type`);
const housePriceSelect = document.querySelector(`#housing-price`);
const houseRoomSelect = document.querySelector(`#housing-rooms`);
const houseGuestSelect = document.querySelector(`#housing-guests`);
const houseFeaturesSelect = document.querySelector(`#housing-features`);

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

const checkPrice = (ad, price) => {
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

const checkFeatures = (features) => {
  const checkedFeatures = houseFeaturesSelect.querySelectorAll(`input:checked`);
  return Array.from(checkedFeatures).every((checkbox) => {
    return features.includes(checkbox.value);
  });
};

const filterElement = (select, optionValue, ad) => {
  return select.value === FiltersValue.ANY ? true : select.value === ad[optionValue].toString();
};

const filterAd = (ad) => {
  return (filterElement(houseTypeSelect, FiltersValue.TYPE, ad.offer)) &&
    (filterElement(houseRoomSelect, FiltersValue.ROOM, ad.offer)) &&
    (filterElement(houseGuestSelect, FiltersValue.GUEST, ad.offer)) &&
    checkFeatures(ad.offer.features) && checkPrice(ad, ad.offer.price);
};

const getFilteredAds = function (ad) {
  let similiarAds = ad.filter(filterAd);
  return similiarAds;
};

const updatePins = function (offers) {
  const pins = getFilteredAds(offers);
  window.pin.renderPinElements(pins);
};

const addChangeListeners = () => {
  filter.addEventListener(`change`, onFiltersChange);
};

const removeChangeListeners = () => {
  filter.removeEventListener(`change`, onFiltersChange);
};

const onFiltersChange = window.debounce(() => {
  addChangeListeners();
  window.card.disable();
  window.pin.remove();
  updatePins(window.pin.ads);
});

window.filter = {
  remove: removeChangeListeners,
  change: addChangeListeners,
};
