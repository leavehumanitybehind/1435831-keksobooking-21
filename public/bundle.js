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
/*!****************************!*\
  !*** ./js/photo-upload.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const avatarFileChooser = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const houseFileChooser = document.querySelector(`.ad-form__upload input[type=file]`);
const housePreview = document.querySelector(`.ad-form__photo img`);

const showPicture = function (fileChooser, preview) {
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

const onPhotoChange = function () {
  showPicture(avatarFileChooser, avatarPreview);
  showPicture(houseFileChooser, housePreview);
  avatarFileChooser.removeEventListener(`change`, onPhotoChange);
  houseFileChooser.removeEventListener(`change`, onPhotoChange);
};

avatarFileChooser.addEventListener(`change`, onPhotoChange);
houseFileChooser.addEventListener(`change`, onPhotoChange);


})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
// Файл debounce.js


const DEBOUNCE_INTERVAL = 500;

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
const MAIN_PIN_MIN_Y = 130;
const MAIN_PIN_MAX_Y = 630;
const MAIN_PIN_MIN_X = 0;

const MainPin = {
  WIDTH: 65,
  HEIGHT: 65,
  DEFAULT_X: `570px`,
  DEFAULT_Y: `375px`,
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
    if (mainPinCoords.y - shift.y >= MAIN_PIN_MIN_Y && mainPinCoords.y - shift.y <= MAIN_PIN_MAX_Y) {
      mainPin.style.top = mainPin.offsetTop - shift.y + `px`;
    }

    if (mainPinCoords.x - shift.x >= MAIN_PIN_MIN_X && mainPinCoords.x - shift.x <= map.offsetWidth) {
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
  let minPrice = MinPrice[adForm.type.value];
  adForm.price.setAttribute(`min`, minPrice);
};

const setPriceLimit = function () {
  return (priceInput.value > MAX_PRICE) ? priceInput.setCustomValidity(`Максимальная цена ` + MAX_PRICE) :
    priceInput.setCustomValidity(``);
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
  return ((guests > rooms && rooms !== 100) || (rooms !== 100 && guests === 0) || (rooms === 100 && guests > 0)) ?
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]) :
    capacitySelect.setCustomValidity(``);
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

const onChangeSelect = function () {
  housingSelect.addEventListener(`change`, onHousingTypeChange);
  priceInput.addEventListener(`change`, setPriceLimit);
  timeinSelect.addEventListener(`change`, onTimeoutChange);
  timeoutSelect.addEventListener(`change`, onTimeinChange);
};

const onRemoveSelect = function () {
  housingSelect.removeEventListener(`change`, onHousingTypeChange);
  priceInput.removeEventListener(`change`, setPriceLimit);
  timeinSelect.removeEventListener(`change`, onTimeoutChange);
  timeoutSelect.removeEventListener(`change`, onTimeinChange);
};


window.validation = {
  change: onChangeSelect,
  remove: onRemoveSelect
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
const pinsContainer = document.querySelector(`.map__pins`);

const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

let activePin = false;

const disablePin = function () {
  const allPins = document.querySelectorAll(`.map__pin`);
  allPins.forEach(function (pin) {
    pin.classList.remove(`map__pin--active`);
  });
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

const removePins = function () {
  const allPins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  allPins.forEach(function (pin) {
    pinsContainer.removeChild(pin);
  });
};

window.pin = {
  size: PinSize,
  disable: disablePin,
  render: renderPins,
  activate: activatePin,
  remove: removePins

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

const disableCard = function () {
  const popup = pinsContainer.querySelector(`.map__card`);
  window.pin.disable();
  if (popup) {
    pinsContainer.removeChild(popup);
  }
};

const onCardEscPress = function (evt) {
  if (evt.code === window.util.KeyCode.ESCAPE) {
    disableCard();
  }
  document.removeEventListener(`keydown`, onCardEscPress);
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

  card.querySelector(`.popup__close`).addEventListener(`click`, disableCard);
  document.addEventListener(`keydown`, onCardEscPress);
  return card;
};


window.card = {
  render: renderCard,
  disable: disableCard
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

const HousePriceType = {
  LOW: `low`,
  MEDIUM: `medium`,
  HIGH: `high`
};

const checkFeatures = function (ad) {
  const checkedFeaturesItems = houseFeaturesSelect.querySelectorAll(`input:checked`);
  return Array.from(checkedFeaturesItems).every(function (item) {
    return ad.offer.features.includes(item.ad);
  });
};

const checkPrice = function (ad) {
  switch (housePriceSelect.value) {
    case HousePriceType.LOW:
      return (ad.offer.price < HousePrice.min);
    case HousePriceType.MEDIUM:
      return ad.offer.price >= HousePrice.min && ad.offer.price <= HousePrice.max;
    case HousePriceType.HIGH:
      return ad.offer.price > HousePrice.max;
  }
  return false;
};

const filterAd = function (ad) {
  return ((houseTypeSelect.value === Filters.type) ? true : (ad.offer.type === houseTypeSelect.value)) &&
    ((housePriceSelect.value === Filters.price) ? true : checkPrice(ad)) &&
    ((houseRoomSelect.value === Filters.room) ? true : (ad.offer.rooms === houseRoomSelect.value)) &&
    ((houseGuestSelect.value === Filters.guest) ? true : (ad.offer.guests === houseGuestSelect.value)) &&
    checkFeatures(ad);
};

const getFilteredPins = function (ads) {
  let similiars = ads.filter(filterAd);
  return similiars.slice(0, MAX_PINS);
};

const onPinClick = function (pin, ad) {
  pin.addEventListener(`click`, function (evt) {
    window.card.disable();
    if (activePin !== evt.currentTarget) {
      pinsContainer.appendChild(window.card.render(ad));
      window.pin.activate(evt.currentTarget);
    }
  });
};

const updatePins = function (ads) {
  ads = getFilteredPins(pins);
  window.pin.remove();

  const numberOfPins = ads.length > MAX_PINS ? MAX_PINS : ads.length;
  for (let i = 0; i < numberOfPins; i++) {
    const currentPin = window.pin.render(ads[i]);
    pinsContainer.appendChild(currentPin);
    onPinClick(currentPin, ads[i]);
  }
};

const onSuccessLoad = window.debounce(function (data) {
  pins = data;
  updatePins(pins);
});

const onErrorLoad = function (errorMessage) {
  window.util.createErrorMessage(errorMessage);
};


const addChangeListeners = function () {
  houseTypeSelect.addEventListener(`change`, onFilterChange);
  housePriceSelect.addEventListener(`change`, onFilterChange);
  houseRoomSelect.addEventListener(`change`, onFilterChange);
  houseGuestSelect.addEventListener(`change`, onFilterChange);
  houseFeaturesSelect.addEventListener(`change`, onFilterChange);
};

const removeChangeListeners = function () {
  houseTypeSelect.removeEventListener(`change`, onFilterChange);
  housePriceSelect.removeEventListener(`change`, onFilterChange);
  houseRoomSelect.removeEventListener(`change`, onFilterChange);
  houseGuestSelect.removeEventListener(`change`, onFilterChange);
  houseFeaturesSelect.removeEventListener(`change`, onFilterChange);
};

const onFilterChange = function () {
  window.card.disable();
  window.pin.disable();
  addChangeListeners();
  window.backend.load(onSuccessLoad, onErrorLoad);
};

window.filter = {
  remove: removeChangeListeners,
  change: onFilterChange,
  error: onErrorLoad,
  success: onSuccessLoad,
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
const mapFiltersForm = document.querySelector(`.map__filters`);
const mapFiltersSelects = mapFiltersForm.querySelectorAll(`select`);
const adFormSelects = adForm.querySelectorAll(`select`);
const fieldsets = adForm.querySelectorAll(`.fieldset`);
const inputs = adForm.querySelectorAll(`input`);
const houseFeaturesSelect = document.querySelector(`#housing-features`);
const checkedFeaturesFilters = houseFeaturesSelect.querySelectorAll(`input[type=checkbox]`);
const checkedFeaturesItems = adForm.querySelectorAll(`.feature__checkbox`);

const resetCheckbox = function (items) {
  items.forEach(function (item) {
    if (item.checked) {
      item.checked = false;
    }
    return item;
  });
};

const resetForm = function () {
  adForm.querySelectorAll(`input`).forEach(function (item) {
    item.value = ``;
    return item;
  });
  resetCheckbox(checkedFeaturesItems);
};

const resetFilters = function () {
  mapFiltersForm.querySelectorAll(`select`).forEach(function (item) {
    item.value = `any`;
    return item;
  });
  resetCheckbox(checkedFeaturesFilters);
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
  document.removeEventListener(`click`, closeErrorMessage);
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
  document.removeEventListener(`click`, closeSuccessMessage);
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
  resetFilters: resetFilters,
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
  window.form.disable();
  window.pin.remove();
  window.form.reset();
  window.form.resetFilters();
  window.move.setAddress(mainPin);
  window.filter.remove();
  removeListeners();
};


const onSubmitForm = function (evt) {
  window.backend.upload(window.form.success, window.form.error, new FormData(adForm));
  evt.preventDefault();
  disableMap();
};

const addListeners = function () {
  window.validation.change();
  adForm.addEventListener(`submit`, onSubmitForm);
};

const removeListeners = function () {
  window.validation.remove();
  adForm.removeEventListener(`submit`, onSubmitForm);
  resetButton.removeEventListener(`click`, disableMap);
};


const onMouseDown = function (evt) {
  if (evt.which === window.util.KeyCode.MOUSE_LEFT_CLICK) {
    activateMap();
  }
  mainPin.removeEventListener(`mousedown`, onMouseDown);
};

const onKeyDown = function (evt) {
  if (evt.code === window.util.KeyCode.ENTER) {
    activateMap();
  }
  mainPin.removeEventListener(`keydown`, onKeyDown);
};

disableMap();
resetButton.addEventListener(`click`, disableMap);
mainPin.addEventListener(`mousedown`, onMouseDown);
mainPin.addEventListener(`keydown`, onKeyDown);

})();

/******/ })()
;