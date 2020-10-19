/* eslint-disable object-shorthand */
'use strict';

const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const TIMEOUT_IN_MS = 10000;
const pinTemplate = document.querySelector(`#pin`).content;
const mapPin = pinTemplate.querySelector(`.map__pin`);
const allPins = document.querySelectorAll(`.map__pin`);
const pinsContainer = map.querySelector(`.map__pins`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const houseTypeSelect = document.querySelector(`#housing-type`);
const housePriceSelect = document.querySelector(`#housing-price`);
const houseRoomSelect = document.querySelector(`#housing-rooms`);
const houseGuestSelect = document.querySelector(`#housing-guests`);
const houseFeaturesSelect = document.querySelector(`#housing-features`);
const MAX_PINS = 5;
const adForm = document.querySelector(`.ad-form`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const mapFiltersSelects = mapFiltersForm.querySelectorAll(`select`);
const adFormSelects = adForm.querySelectorAll(`select`);
const fieldsets = adForm.querySelectorAll(`.fieldset`);
const inputs = adForm.querySelectorAll(`input`);
const success = document.querySelector(`#success`).content;
const error = document.querySelector(`#error`).content;
const main = document.querySelector(`main`);
const roomNumberSelect = document.querySelector(`#room_number`);
const capacitySelect = document.querySelector(`#capacity`);
const housingSelect = adForm.querySelector(`#type`);
const priceInput = adForm.querySelector(`#price`);
const timeinSelect = adForm.querySelector(`#timein`);
const timeoutSelect = adForm.querySelector(`#timeout`);

window.consts = {
  mainPin,
  map,
  TIMEOUT_IN_MS,
  pinTemplate,
  mapPin,
  allPins,
  pinsContainer,
  cardTemplate,
  houseTypeSelect,
  houseRoomSelect,
  houseGuestSelect,
  houseFeaturesSelect,
  housePriceSelect,
  MAX_PINS,
  mapFiltersForm,
  mapFiltersSelects,
  adFormSelects,
  fieldsets,
  inputs,
  success,
  error,
  main,
  adForm,
  roomNumberSelect,
  capacitySelect,
  housingSelect,
  priceInput,
  timeinSelect,
  timeoutSelect
};

