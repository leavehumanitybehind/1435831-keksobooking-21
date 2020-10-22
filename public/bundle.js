/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
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
const CODE_STATUS_OK = 200;
const TIMEOUT_IN_MS = 10000;

const getXhr = function (onSuccess, onError) {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === CODE_STATUS_OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ошибки: ` + xhr.status + ` ` + xhr.statusText);
    }
  });
  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения. Пожалуйста обновите страницу`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс. ` + ` Пожалуйста обновите страницу`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  return xhr;
};

const onUpload = function (onSuccess, onError, data) {
  const xhr = getXhr(onSuccess, onError);
  xhr.open(`POST`, URL_ADDRESS.upload);
  xhr.send(data);
};

const onLoad = function (onSuccess, onError) {
  let xhr = getXhr(onSuccess, onError);
  xhr.open(`GET`, URL_ADDRESS.load);
  xhr.send();
};

window.backend = {
  load: onLoad,
  upload: onUpload
};


})();

(() => {
/*!**********************!*\
  !*** ./js/avatar.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const fileChooser = document.querySelector(`.ad-form__field input[type=file]`);
const preview = document.querySelector(`.ad-form-header__preview img`);

const showPicture = function () {
  fileChooser.addEventListener(`change`, function () {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener(`load`, function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
};

const onAvatarChange = function () {
  showPicture(fileChooser, preview);
};


fileChooser.addEventListener(`change`, onAvatarChange);


})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
// Файл debounce.js


const DEBOUNCE_INTERVAL = 300;

window.debounce = function (cb) {
  let lastTimeout = null;

  return function (...parameters) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};


})();

(() => {
/*!********************!*\
  !*** ./js/move.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);

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
  let x = mainPin.offsetLeft + Math.floor(MainPin.WIDTH / 2);
  let y = mainPin.offsetTop + MainPin.HEIGHT;

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

mainPin.addEventListener(`mousedown`, function (evt) {
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
      mainPin.style.top = mainPin.offsetTop - shift.y + `px`;
    }

    if (mainPinCoords.x - shift.x >= MainPin.x.MIN && mainPinCoords.x - shift.x <= map.offsetWidth) {
      mainPin.style.left = mainPin.offsetLeft - shift.x + `px`;
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
/*!**************************!*\
  !*** ./js/validation.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const adForm = document.querySelector(`.ad-form`);
const roomNumberSelect = document.querySelector(`#room_number`);
const capacitySelect = document.querySelector(`#capacity`);
const housingSelect = adForm.querySelector(`#type`);
const priceInput = adForm.querySelector(`#price`);
const timeinSelect = adForm.querySelector(`#timein`);
const timeoutSelect = adForm.querySelector(`#timeout`);
let roomsNumber = roomNumberSelect.value;
let capacityNumber = capacitySelect.value;

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
const MAX_PRICE = 1000000;

const onHousingTypeChange = function () {
  priceInput.min = MinPrice[housingSelect.value];
  priceInput.placeholder = MinPrice[housingSelect.value];
};

const setPriceLimit = function () {
  if (priceInput.value > MAX_PRICE) {
    priceInput.setCustomValidity('Максимальная цена ' + MAX_PRICE);
  }
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

const changeSelectHandler = function () {
  housingSelect.addEventListener(`change`, onHousingTypeChange);
  priceInput.addEventListener(`change`, setPriceLimit);
  timeinSelect.addEventListener(`change`, onTimeoutChange);
  timeoutSelect.addEventListener(`change`, onTimeinChange);
};


window.validation = {
  change: changeSelectHandler
};

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable object-shorthand */


const pinTemplate = document.querySelector(`#pin`).content;
const mapPin = pinTemplate.querySelector(`.map__pin`);

const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

let activePin = false;

const disablePin = function () {
  activePin.classList.remove(`map__pin--active`);
};

const activatePin = function (pin) {
  if (activePin) {
    disablePin();
  }
  activePin = pin;
  activePin.classList.add(`map__pin--active`);
};

const renderPins = function (ad) {
  const pinsTemplate = mapPin.cloneNode(true);
  pinsTemplate.querySelector(`img`).src = ad.author.avatar;
  pinsTemplate.querySelector(`img`).alt = ad.offer.title;
  const pinX = ad.location.x - (PinSize.WIDTH / 2);
  const pinY = ad.location.y - PinSize.HEIGHT;
  pinsTemplate.style = `left:` + pinX + `px; top:` + pinY + `px;`;
  return pinsTemplate;
};


window.pin = {
  size: PinSize,
  disable: disablePin,
  render: renderPins,
  activate: activatePin

};


})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable object-shorthand */


const HOUSING_TYPES = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const pinsContainer = document.querySelector(`.map__pins`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const onCardEscPress = function (evt) {
  window.util.isEscKeyCode(evt, function () {
    pinsContainer.removeChild(pinsContainer.querySelector(`.map__card`));
  });
};

const getFeautures = function (ad, card) {
  const features = card.querySelector(`.popup__features`);
  features.innerHTML = ``;
  const fragmentFeatures = document.createDocumentFragment();
  for (let i = 0; i < ad.offer.features.length; i++) {
    const newFeature = document.createElement(`li`);
    newFeature.classList.add(`popup__feature`);
    newFeature.classList.add(`popup__feature--` + ad.offer.features[i]);
    fragmentFeatures.appendChild(newFeature);
  }
  features.appendChild(fragmentFeatures);
};

const getPhotos = function (photos) {
  const imgs = [];
  for (let i = 0; i < photos.length; i++) {
    imgs.push(`<img src="` + photos[i] + `"class="popup__photo" width="45" height = "40" alt = "Photo">`);
  }
  return imgs;
};

const renderCard = function (ad) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector(`.popup__title`).textContent = ad.offer.title;
  card.querySelector(`.popup__text--address`).textContent = ad.offer.address;
  card.querySelector(`.popup__text--price`).textContent = ad.offer.price;
  const type = card.querySelector(`.popup__type`);
  switch (ad.offer.type) {
    case `palace`:
      type.textContent = HOUSING_TYPES.palace;
      break;
    case `flat`:
      type.textContent = HOUSING_TYPES.flat;
      break;
    case `house`:
      type.textContent = HOUSING_TYPES.house;
      break;
    case `bungalow`:
      type.textContent = HOUSING_TYPES.bungalow;
      break;
  }

  card.querySelector(`.popup__text--capacity`).textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + ` ` + `выезд до ` + ad.offer.checkout;
  card.querySelector(`.popup__description`).textContent = ad.offer.description;
  card.querySelector(`.popup__avatar`).src = ad.author.avatar;
  card.querySelector(`.popup__photos`).innerHTML = getPhotos(ad.offer.photos);
  getFeautures(ad, card);
  card.querySelector(`.popup__close`).addEventListener(`click`, function () {
    pinsContainer.removeChild(pinsContainer.querySelector(`.map__card`));
    window.pin.disable();
  });
  document.addEventListener(`keydown`, onCardEscPress);
  return card;
};

window.card = {
  render: renderCard
};



})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable object-shorthand */


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

const successHandler = window.debounce(function (data) {
  pins = data;
  updatePins(pins);
});

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



})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable object-shorthand */


const adForm = document.querySelector(`.ad-form`);
const success = document.querySelector(`#success`).content;
const error = document.querySelector(`#error`).content;
const main = document.querySelector(`main`);
const mainPin = document.querySelector(`.map__pin--main`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const mapFiltersSelects = mapFiltersForm.querySelectorAll(`select`);
const adFormSelects = adForm.querySelectorAll(`select`);
const fieldsets = adForm.querySelectorAll(`.fieldset`);
const inputs = adForm.querySelectorAll(`input`);

const resetForm = function () {
  adForm.querySelectorAll(`input`).forEach(function (element) {
    element.value = ``;
    return element;
  });
  window.move.setAddress(mainPin);
};

const disableFormControls = function (controls) {
  controls.forEach(function (control) {
    control.setAttribute(`disabled`, `disabled`);
  });
  mapFiltersForm.setAttribute(`disabled`, `disabled`);
};

const enableControls = function (controls) {
  controls.forEach(function (control) {
    control.removeAttribute(`disabled`, `disabled`);
  });
  mapFiltersForm.removeAttribute(`disabled`, `disabled`);
};

const closeErrorMessage = function () {
  main.removeChild(main.querySelector(`.error`));
  document.removeEventListener(`keydown`, onErrorEscPress);
};

const onErrorEscPress = function (evt) {
  window.util.isEscKeyCode(evt, closeErrorMessage);
};

const errorMessage = function () {
  const message = error.cloneNode(true);
  message.querySelector(`.error`).addEventListener(`click`, closeErrorMessage);
  main.appendChild(message);
};

const onSuccessEscPress = function (evt) {
  window.util.isEscKeyCode(evt, closeSuccessMessage);
};

const closeSuccessMessage = function () {
  main.removeChild(main.querySelector(`.success`));
  document.removeEventListener(`keydown`, onSuccessEscPress);
};

const successMessage = function () {
  const message = success.cloneNode(true);
  message.querySelector(`.success`).addEventListener(`click`, closeSuccessMessage);
  main.appendChild(message);
};

const enableForm = function () {
  enableControls(fieldsets);
  enableControls(inputs);
  enableControls(adFormSelects);
  enableControls(mapFiltersSelects);
};

const disableForm = function () {
  disableFormControls(fieldsets);
  disableFormControls(inputs);
  disableFormControls(adFormSelects);
  disableFormControls(mapFiltersSelects);
};

window.form = {
  enable: enableForm,
  disable: disableForm,
  reset: resetForm,
  success: successMessage,
  error: errorMessage
};



})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);
const resetButton = adForm.querySelector(`.ad-form__reset`);


const activateMap = function () {
  map.classList.remove(`map--faded`);
  mapFiltersForm.classList.remove(`map__filters--disabled`);
  adForm.classList.remove(`ad-form--disabled`);
  addListeners();
  window.filter.change();
  window.form.enable();
};

const disableMap = function () {
  map.classList.add(`map--faded`);
  mainPin.style.left = window.move.MainPin.DEFAULT_X;
  mainPin.style.top = window.move.MainPin.DEFAULT_Y;
  window.form.disable();
  window.filter.removePins();
  window.form.reset();
};

resetButton.addEventListener(`click`, disableMap);

const submitHandler = function (evt) {
  window.backend.upload(window.form.success, window.form.error, new FormData(adForm));
  evt.preventDefault();
  disableMap();
};

const addListeners = function () {
  window.validation.change();
  adForm.addEventListener(`submit`, submitHandler);
};

const onMouseDown = function (evt) {
  if (evt.which === window.util.KeyCode.MOUSE_LEFT_CLICK) {
    activateMap();
  }
};

const onKeyDown = function (evt) {
  if (evt.code === window.util.KeyCode.ENTER) {
    activateMap();
  }
};

disableMap();
mainPin.addEventListener(`mousedown`, onMouseDown);
mainPin.addEventListener(`keydown`, onKeyDown);

})();

/******/ })()
;