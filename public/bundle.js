/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!**********************!*\
  !*** ./js/consts.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable object-shorthand */



const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const TIMEOUT_IN_MS = 10000;
const pinTemplate = document.querySelector(`#pin`).content;
const mapPin = pinTemplate.querySelector(`.map__pin`);
const allPins = document.querySelectorAll(`.map__pin`);
const pinsContainer = map.querySelector(`.map__pins`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const houseTypeSelect = document.querySelector(`#housing-type`);
const housePriceSelect = document.querySelector('#housing-price');
const MAX_PINS = 5;
const ADS_NUMBER = 8;
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
  mainPin: mainPin,
  map: map,
  TIMEOUT_IN_MS: TIMEOUT_IN_MS,
  pinTemplate: pinTemplate,
  mapPin: mapPin,
  allPins: allPins,
  pinsContainer: pinsContainer,
  cardTemplate: cardTemplate,
  houseTypeSelect: houseTypeSelect,
  housePriceSelect,
  MAX_PINS: MAX_PINS,
  ADS_NUMBER: ADS_NUMBER,
  mapFiltersForm: mapFiltersForm,
  mapFiltersSelects: mapFiltersSelects,
  adFormSelects: adFormSelects,
  fieldsets: fieldsets,
  inputs: inputs,
  success: success,
  error: error,
  main: main,
  adForm: adForm,
  roomNumberSelect: roomNumberSelect,
  capacitySelect: capacitySelect,
  housingSelect: housingSelect,
  priceInput: priceInput,
  timeinSelect: timeinSelect,
  timeoutSelect: timeoutSelect
};


})();

(() => {
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable object-shorthand */


const KeyCode = {
  ENTER: `Enter`,
  ESCAPE: `Escape`,
  MOUSE_LEFT_CLICK: 1
};


const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomArrayValue = function (items) {
  return items[Math.floor(items.length * Math.random())];
};

const isEscKeyCode = function (evt) {
  return evt.KeyCode === KeyCode.ESCAPE;
};

const createErrorMessage = function (message) {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin:auto; text-align: center; background-color: rgba(0,0,0, 0.4);`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.width = `100%`;
  node.style.height = `100%`;
  node.style.paddingTop = `300px`;
  node.style.fontSize = `60px`;
  node.style.fontWeight = `bold`;
  node.style.color = `white`;

  node.textContent = message;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

window.util = {
  getRandomNumber: getRandomNumber,
  getRandomArrayValue: getRandomArrayValue,
  isEscKeyCode: isEscKeyCode,
  createErrorMessage: createErrorMessage,
  KeyCode: KeyCode
};


})();

(() => {
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable object-shorthand */


const URL_ADDRESS = {
  load: `https://21.javascript.pages.academy/keksobooking/data`,
  upload: `https://21.javascript.pages.academy/keksobooking/`
};
const OK = 200;

const getXhr = function (onSuccess, onError) {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ошибки: ` + xhr.status + xhr.statusText);
    }
  });
  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = window.consts.TIMEOUT_IN_MS;

  return xhr;
};

const upload = function (onSuccess, onError, data) {
  const xhr = getXhr(onSuccess, onError);
  xhr.open(`POST`, URL_ADDRESS.upload);
  xhr.send(data);
};

const load = function (onSuccess, onError) {
  let xhr = getXhr(onSuccess, onError);
  xhr.open(`GET`, URL_ADDRESS.load);
  xhr.send();
};

window.backend = {
  load: load,
  upload: upload
};


})();

(() => {
/*!********************!*\
  !*** ./js/move.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const MainPin = {
  WIDTH: 65,
  HEIGHT: 84,
  DEFAULT_X: `570px`,
  DEFAULT_Y: `375px`,
  y: {
    MIN: 130,
    MAX: 630
  },
  x: {
    MIN: 0
  }
};

const getMainPinCoords = function () {
  let x = window.consts.mainPin.offsetLeft + Math.floor(MainPin.WIDTH / 2);
  let y = window.consts.mainPin.offsetTop + MainPin.HEIGHT;

  return {
    x,
    y
  };
};

const setAddress = function () {
  const mainPinCoords = getMainPinCoords();
  const address = document.querySelector(`#address`);
  address.value = mainPinCoords.x + `,` + mainPinCoords.y;
};

window.consts.mainPin.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    let mainPinCoords = getMainPinCoords();
    if (mainPinCoords.y - shift.y >= MainPin.y.MIN && mainPinCoords.y - shift.y <= MainPin.y.MAX) {
      window.consts.mainPin.style.top = window.consts.mainPin.offsetTop - shift.y + `px`;
    }

    if (mainPinCoords.x - shift.x >= MainPin.x.MIN && mainPinCoords.x - shift.x <= window.consts.map.offsetWidth) {
      window.consts.mainPin.style.left = window.consts.mainPin.offsetLeft - shift.x + `px`;
    }
    setAddress(mainPinCoords);
  };


  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

window.move = {
  getMainPinCoords: getMainPinCoords,
  setAddress: setAddress,
  MainPin: MainPin
};


})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable object-shorthand */


let activePin = false;

const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

const activatePin = function (pin) {
  if (activePin) {
    disablePin();
  }
  activePin = pin;
  activePin.classList.add(`map__pin--active`);
};

const disablePin = function () {
  activePin.classList.remove(`map__pin--active`);
};

const renderPins = function (ad) {
  const pinsTemplate = window.consts.mapPin.cloneNode(true);
  pinsTemplate.querySelector(`img`).src = ad.author.avatar;
  pinsTemplate.querySelector(`img`).alt = ad.offer.title;
  const pinX = ad.location.x - (PinSize.WIDTH / 2);
  const pinY = ad.location.y - PinSize.HEIGHT;
  pinsTemplate.style = `left:` + pinX + `px; top:` + pinY + `px;`;
  return pinsTemplate;
};

const onPinClick = function (pin, ad) {
  pin.addEventListener(`click`, function (evt) {
    if (activePin !== evt.currentTarget) {
      window.consts.pinsContainer.appendChild(window.card.renderCard(ad));
      activatePin(evt.currentTarget);
    }
  });
};


window.pin = {
  PinSize: PinSize,
  disablePin: disablePin,
  renderPins: renderPins,
  onPinClick: onPinClick

};


})();

(() => {
/*!********************!*\
  !*** ./js/data.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable object-shorthand */


const HOUSING_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const ROOMS = [1, 2, 3, 100];
const GUESTS = [1, 2, 3, 0];
const CHECK_INS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const Price = {
  MIN: 1000,
  MAX: 1000000
};

const getFeautures = function () {
  const feauturesCount = window.util.getRandomNumber(1, FEATURES.length);
  const features = [];
  const feature = window.util.getRandomArrayValue(FEATURES);
  for (let i = 0; i < feauturesCount; i++) {
    if (features.includes(feature)) {
      feature = window.util.getRandomArrayValue(FEATURES);
      features.push(feature);
    }
  }
  return features;
};

function getPhotos(photos) {
  const imgs = [];
  for (let i = 0; i < photos.length; i++) {
    imgs.push(`<img src="` + photos[i] + `"class="popup__photo" width="45" height = "40" alt = "Photo">`);
  }
  return imgs;
}


window.data = {
  getFeautures: getFeautures,
  getPhotos: getPhotos,
  HOUSING_TYPES: HOUSING_TYPES,
  ROOMS: ROOMS,
  GUESTS: GUESTS,
  CHECK_INS: CHECK_INS,
  PHOTOS: PHOTOS,
  Price: Price,
};

})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable object-shorthand */



const onCardEscPress = function (evt) {
  window.util.isEscKeyCode(evt, function () {
    window.consts.pinsContainer.removeChild(window.consts.pinsContainer.querySelector(`.map__card`));
  });
};

const renderCard = function (ad) {
  const card = window.consts.cardTemplate.cloneNode(true);
  card.querySelector(`.popup__title`).textContent = ad.offer.title;
  card.querySelector(`.popup__text--address`).textContent = ad.offer.address;
  card.querySelector(`.popup__text--price`).textContent = ad.offer.price;
  card.querySelector(`.popup__type`).textContent = ad.offer.type;
  card.querySelector(`.popup__text--capacity`).textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + ` ` + `выезд до ` + ad.offer.checkout;
  card.querySelector(`.popup__description`).textContent = ad.offer.description;
  card.querySelector(`.popup__avatar`).src = ad.author.avatar;
  card.querySelector(`.popup__photos`).innerHTML = window.data.getPhotos(ad.offer.photos);
  card.querySelector(`.popup__close`).addEventListener(`click`, function () {
    window.consts.pinsContainer.removeChild(window.consts.pinsContainer.querySelector(`.map__card`));
    window.pin.disablePin();
  });
  document.addEventListener(`keydown`, onCardEscPress);
  return card;
};

window.card = {
  renderCard: renderCard
};



})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable object-shorthand */


let pins = [];
const HouseType = {
  type: `any`,
  price: `any`
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
  return ((window.consts.houseTypeSelect.value === `any`) ? true : (ad.offer.type === window.consts.houseTypeSelect.value)) &&
    ((window.consts.housePriceSelect.value === `any`) ? true : checkPrice(ad));
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



})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable object-shorthand */



const resetForm = function () {
  window.consts.adForm.querySelectorAll(`input`).forEach(function (element) {
    element.value = ``;
    return element;
  });
  window.move.setAddress(window.pin.mainPin);
};

const disableFormControls = function (controls) {
  for (let i = 0; i < controls.length; i++) {
    controls[i].setAttribute(`disabled`, `disabled`);
  }
  window.consts.mapFiltersForm.setAttribute(`disabled`, `disabled`);
};

const enableControls = function (controls) {
  for (let i = 0; i < controls.length; i++) {
    controls[i].removeAttribute(`disabled`, `disabled`);
  }
  window.consts.mapFiltersForm.removeAttribute(`disabled`, `disabled`);
};

const errorMessage = function () {
  const message = window.consts.error.cloneNode(true);
  message.querySelector(`.error`).addEventListener(`click`, closeErrorMessage);
  window.consts.main.appendChild(message);
};

const closeErrorMessage = function () {
  window.consts.main.removeChild(window.consts.main.querySelector(`.error`));
  document.removeEventListener(`keydown`, onErrorEscPress);
};

const onErrorEscPress = function (evt) {
  window.util.isEscKeyCode(evt, closeErrorMessage);
};

const onSuccessEscPress = function (evt) {
  window.util.isEscKeyCode(evt, closeSuccessMessage);
};

const closeSuccessMessage = function () {
  window.consts.main.removeChild(window.consts.main.querySelector(`.success`));
  document.removeEventListener(`keydown`, onSuccessEscPress);
};

const successMessage = function () {
  const message = window.consts.success.cloneNode(true);
  message.querySelector(`.success`).addEventListener(`click`, closeSuccessMessage);
  window.consts.main.appendChild(message);
};

const removePins = function () {
  const pins = window.consts.pinsContainer.querySelectorAll(`.map__pin`);

  for (let i = 1; i < pins.length; i++) {
    window.consts.pinsContainer.removeChild(pins[i]);
  }
};

const addFormListeners = function () {
  window.consts.housingSelect.addEventListener(`change`, window.validation.onHousingTypeChange);
  window.consts.timeinSelect.addEventListener(`change`, window.validation.onTimeoutChange);
  window.consts.timeoutSelect.addEventListener(`change`, window.validation.onTimeinChange);
  window.consts.adForm.addEventListener(`submit`, submitHandler);
  window.consts.houseTypeSelect.addEventListener(`change`, window.filter.onFilterChange);
  window.consts.housePriceSelect.addEventListener(`change`, window.filter.onFilterChange);
};

const activateMap = function () {
  window.consts.map.classList.remove(`map--faded`);
  window.filter.onFilterChange();
  window.consts.mapFiltersForm.classList.remove(`map__filters--disabled`);
  window.consts.adForm.classList.remove(`ad-form--disabled`);
  addFormListeners();
  enableControls(window.consts.fieldsets);
  enableControls(window.consts.inputs);
  enableControls(window.consts.adFormSelects);
  enableControls(window.consts.mapFiltersSelects);
};

const disableMap = function () {
  window.consts.map.classList.add(`map--faded`);
  window.consts.mainPin.style.left = window.move.MainPin.DEFAULT_X;
  window.consts.mainPin.style.top = window.move.MainPin.DEFAULT_Y;
  disableFormControls(window.consts.fieldsets);
  disableFormControls(window.consts.inputs);
  disableFormControls(window.consts.adFormSelects);
  disableFormControls(window.consts.mapFiltersSelects);
  removePins();
  resetForm();
};

const submitHandler = function (evt) {
  window.backend.upload(successMessage, errorMessage, new FormData(window.consts.adForm));
  evt.preventDefault();
  disableMap();
};

window.form = {
  disableFormControls: disableFormControls,
  activateMap: activateMap,
  disableMap: disableMap,
  removePins: removePins,
};



})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const onMouseDown = function (evt) {
  if (evt.which === window.util.KeyCode.MOUSE_LEFT_CLICK) {
    window.form.activateMap();
  }
};

const onKeyDown = function (evt) {
  if (evt.code === window.util.KeyCode.ENTER) {
    window.form.activateMap();
  }
};

window.form.disableMap();
window.consts.mainPin.addEventListener(`mousedown`, onMouseDown);
window.consts.mainPin.addEventListener(`keydown`, onKeyDown);



})();

(() => {
/*!**************************!*\
  !*** ./js/validation.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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

})();

/******/ })()
;