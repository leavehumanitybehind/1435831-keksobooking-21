/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const KeyCode = {
  ENTER: `Enter`,
  ESCAPE: `Escape`,
};

const isEnterKeyPress = function (key) {
  return key === KeyCode.ENTER;
};

const isEscKeyPress = function (key) {
  return key === KeyCode.ESCAPE;
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
  isEnterKeyPress,
  isEscKeyPress,
  createErrorMessage
};


})();

(() => {
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const UrlAddress = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD: `https://21.javascript.pages.academy/keksobooking/`
};

const CODE_STATUS_OK = 200;
const TIMEOUT_IN_MS = 10000;

const getXhr = function (onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === CODE_STATUS_OK) {
      onSuccess(xhr.response);
      return;
    }
    onError(`Статус ошибки: ` + xhr.status + ` ` + xhr.statusText);
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

const upload = function (onSuccess, onError, data) {
  const xhr = getXhr(onSuccess, onError);
  xhr.open(`POST`, UrlAddress.UPLOAD);
  xhr.send(data);
};

const load = function (onSuccess, onError) {
  const xhr = getXhr(onSuccess, onError);
  xhr.open(`GET`, UrlAddress.LOAD);
  xhr.send();
};

window.backend = {
  load,
  upload
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

    const matches = FILE_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener(`load`, function () {
        preview.src = reader.result;
        preview.setAttribute(`width`, `100%`);
        preview.setAttribute(`height`, `100%`);
      });
      reader.readAsDataURL(file);
    }
  });
};

const resetPreview = function (preview) {
  preview.src = `img/muffin-grey.svg`;
  preview.setAttribute(`width`, `40px`);
  preview.setAttribute(`height`, `44px`);
};

const resetPhotos = function () {
  resetPreview(avatarPreview);
  resetPreview(housePreview);
};

const onPhotoChange = function () {
  showPicture(avatarFileChooser, avatarPreview);
  showPicture(houseFileChooser, housePreview);
  avatarFileChooser.removeEventListener(`change`, onPhotoChange);
  houseFileChooser.removeEventListener(`change`, onPhotoChange);
};

avatarFileChooser.addEventListener(`change`, onPhotoChange);
houseFileChooser.addEventListener(`change`, onPhotoChange);

window.photo = {
  reset: resetPhotos
};


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

  return function (parameters) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(null, parameters);
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
const address = document.querySelector(`#address`);
const MainPinLocation = {
  MIN_Y: 130,
  MAX_Y: 630,
  MIN_X: 0
};

const MainPinSize = {
  WIDTH: 65,
  HEIGHT: 65
};

const getMainPinCoords = function () {
  const x = mainPin.offsetLeft + Math.floor(MainPinSize.WIDTH / 2);
  const y = mainPin.offsetTop + MainPinSize.HEIGHT;

  return {
    x,
    y
  };
};

const setAddress = function () {
  const mainPinCoords = getMainPinCoords();
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

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    const mainPinCoords = getMainPinCoords();
    if (mainPinCoords.y - shift.y >= MainPinLocation.MIN_Y && mainPinCoords.y - shift.y <= MainPinLocation.MAX_Y) {
      mainPin.style.top = mainPin.offsetTop - shift.y + `px`;
    }

    if (mainPinCoords.x - shift.x >= MainPinLocation.MIN_X && mainPinCoords.x - shift.x <= map.offsetWidth) {
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
  getCoords: getMainPinCoords,
  address: setAddress,
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

const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
const MAX_PRICE = 1000000;


const onHousingTypeChange = function () {
  priceInput.min = MIN_PRICE[housingSelect.value];
  priceInput.placeholder = MIN_PRICE[housingSelect.value];
  let minPrice = MIN_PRICE[adForm.type.value];
  adForm.price.setAttribute(`min`, minPrice);
};

const onPriceInputChange = function () {
  if (priceInput.value > MAX_PRICE) {
    priceInput.setCustomValidity(`Максимальная цена ` + MAX_PRICE);
    priceInput.classList.add(`invalid`);
    return;
  }
  priceInput.setCustomValidity(``);
  priceInput.classList.remove(`invalid`);
};


const setTimeOption = function (timeSelect, value) {
  timeSelect.value = value;
};

const onTimeoutChange = function (evt) {
  setTimeOption(timeoutSelect, evt.target.value);
};

const onTimeinChange = function (evt) {
  setTimeOption(timeinSelect, evt.target.value);
};

const syncRoomsGuests = function (rooms, guests) {
  if (guests > rooms && rooms !== 100) {
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    return;
  }
  if (rooms !== 100 && guests === 0) {
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    return;
  }
  if (rooms === 100 && guests > 0) {
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    return;
  }
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

const addChangeListeners = function () {
  housingSelect.addEventListener(`change`, onHousingTypeChange);
  priceInput.addEventListener(`change`, onPriceInputChange);
  timeinSelect.addEventListener(`change`, onTimeoutChange);
  timeoutSelect.addEventListener(`change`, onTimeinChange);
};

const removeChangeListeners = function () {
  housingSelect.removeEventListener(`change`, onHousingTypeChange);
  priceInput.removeEventListener(`change`, onPriceInputChange);
  timeinSelect.removeEventListener(`change`, onTimeoutChange);
  timeoutSelect.removeEventListener(`change`, onTimeinChange);
};


window.validation = {
  change: addChangeListeners,
  remove: removeChangeListeners
};

})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const MAP_HOUSING_TYPES_TO_RU = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const pinsContainer = document.querySelector(`.map__pins`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const createFeatures = function (ad) {
  const featuresFragment = document.createDocumentFragment();
  for (let i = 0; i < ad.offer.features.length; i++) {
    const newFeature = document.createElement(`li`);
    newFeature.classList.add(`popup__feature`);
    newFeature.classList.add(`popup__feature--` + ad.offer.features[i]);
    featuresFragment.appendChild(newFeature);
  }
  return featuresFragment;
};

const getFeauturesNodes = function (ad, card) {
  const featuresContainer = card.querySelector(`.popup__features`);
  featuresContainer.innerHTML = ``;
  const featuresFragment = createFeatures(ad);
  featuresContainer.appendChild(featuresFragment);
};

const createPhotoMarkup = function (src) {
  const photo = document.createElement(`img`);
  photo.classList.add(`popup__photo`);
  photo.src = src;
  photo.alt = `Photo`;
  photo.width = `45`;
  photo.height = `40`;
  return photo;
};

const getPhotosNodes = function (photos, card) {
  const photoContainer = card.querySelector(`.popup__photos`);
  photos.forEach(function (photo) {
    photoContainer.appendChild(createPhotoMarkup(photo));
  });
};

const disableCard = function () {
  const card = pinsContainer.querySelector(`.map__card`);
  if (card) {
    pinsContainer.removeChild(card);
  }
};

const onCardEscPress = function (evt) {
  if (window.util.isEscKeyPress(evt.key)) {
    disableCard();
  }
  document.removeEventListener(`keydown`, onCardEscPress);
};

const renderCard = function (ad) {
  const card = cardTemplate.cloneNode(true);
  if (ad.offer.title) {
    card.querySelector(`.popup__title`).textContent = ad.offer.title;
  }

  if (ad.offer.address) {
    card.querySelector(`.popup__text--address`).textContent = ad.offer.address;
  }

  if (ad.offer.price) {
    card.querySelector(`.popup__text--price`).textContent = ad.offer.price + ` ₽/ночь`;
  }

  if (ad.offer.type) {
    const type = card.querySelector(`.popup__type`);
    type.textContent = MAP_HOUSING_TYPES_TO_RU[ad.offer.type];
  }

  if (ad.offer.rooms && ad.offer.guests) {
    card.querySelector(`.popup__text--capacity`).textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
  }

  if (ad.offer.checkin && ad.offer.checkout) {
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + ` ` + `выезд до ` + ad.offer.checkout;
  }

  if (ad.offer.description) {
    card.querySelector(`.popup__description`).textContent = ad.offer.description;
  }

  if (ad.author.avatar) {
    card.querySelector(`.popup__avatar`).src = ad.author.avatar;
  }

  if (ad.offer.photos) {
    getPhotosNodes(ad.offer.photos, card);
  }

  if (ad.offer.features) {
    getFeauturesNodes(ad, card);
  }

  card.querySelector(`.popup__close`).addEventListener(`click`, disableCard);
  document.addEventListener(`keydown`, onCardEscPress);
  return card;
};


window.card = {
  render: renderCard,
  disable: disableCard,
};



})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable object-shorthand */


const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pinsContainer = document.querySelector(`.map__pins`);


const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

const renderPin = function (ad) {
  const pinsTemplate = pinTemplate.cloneNode(true);
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


const activatePin = function (pin, ad) {
  pin.addEventListener(`click`, function () {
    const activePin = pinsContainer.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
      window.card.disable();
    }
    pin.classList.add(`map__pin--active`);
    pinsContainer.appendChild(window.card.render(ad));
  });

};

window.pin = {
  Size: PinSize,
  render: renderPin,
  remove: removePins,
  activate: activatePin
};


})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable object-shorthand */


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

const checkPrice = function (ad) {
  switch (housePriceSelect.value) {
    case FiltersValue.ANY:
      return true;
    case HousePriceType.LOW:
      return (ad.offer.price < HousePrice.MIN);
    case HousePriceType.MEDIUM:
      return ad.offer.price >= HousePrice.MIN && ad.offer.price <= HousePrice.MAX;
    case HousePriceType.HIGH:
      return ad.offer.price > HousePrice.MAX;
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
    checkFeatures(ad) && checkPrice(ad);
};

const getFilteredPins = function (ad) {
  let similiarAds = ad.filter(filterAd);
  return similiarAds.slice(0, MAX_PINS);
};

const updatePins = function (ads) {
  window.pin.remove();
  ads = getFilteredPins(pins);
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
  filter.addEventListener(`change`, onFilterChange);
};

const removeChangeListeners = function () {
  filter.removeEventListener(`change`, onFilterChange);

};

const onFilterChange = function () {
  addChangeListeners();
  window.card.disable();
  window.debounce(updatePins(pins));

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
const resetButton = adForm.querySelector(`.ad-form__reset`);
const submitButton = adForm.querySelector(`.ad-form__submit`);
const textArea = adForm.querySelector(`textarea`);


const resetCheckbox = function (checkboxes) {
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  });
};

const resetForm = function () {
  adForm.reset();
  resetCheckbox(checkedFeaturesItems);
};

const resetFilters = function () {
  mapFiltersForm.querySelectorAll(`select`).forEach(function (option) {
    option.value = `any`;
    return option;
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

const onErrorEscPress = function (key) {
  if (window.util.isEscKeyPress(key)) {
    closeErrorMessage();
  }
};

const showErrorMessage = function () {
  const message = error.cloneNode(true);
  message.querySelector(`.error`).addEventListener(`click`, closeErrorMessage);
  main.appendChild(message);
};

const onSuccessEscPress = function (key) {
  if (window.util.isEscKeyPress(key)) {
    closeSuccessMessage();
  }
};

const closeSuccessMessage = function () {
  main.removeChild(main.querySelector(`.success`));
  document.removeEventListener(`keydown`, onSuccessEscPress);
  document.removeEventListener(`click`, closeSuccessMessage);
};

const showSuccessMessage = function () {
  const message = success.cloneNode(true);
  message.querySelector(`.success`).addEventListener(`click`, closeSuccessMessage);
  main.appendChild(message);
};

const enableForm = function () {
  enableControls(fieldsets);
  enableControls(inputs);
  enableControls(adFormSelects);
  enableControls(mapFiltersSelects);
  adForm.removeAttribute(`disabled`, `disabled`);
  submitButton.removeAttribute(`disabled`, `disabled`);
  resetButton.removeAttribute(`disabled`, `disabled`);
  textArea.removeAttribute(`disabled`, `disabled`);

};


const disableForm = function () {
  disableFormControls(fieldsets);
  disableFormControls(inputs);
  disableFormControls(adFormSelects);
  disableFormControls(mapFiltersSelects);
  adForm.setAttribute(`disabled`, `disabled`);
  submitButton.setAttribute(`disabled`, `disabled`);
  resetButton.setAttribute(`disabled`, `disabled`);
  textArea.setAttribute(`disabled`, `disabled`);

};

const checkValidity = function () {
  inputs.forEach(function (input) {
    if (!input.checkValidity()) {
      input.style.border = `2px dashed #ff0000`;
    } else {
      input.style.border = ``;
    }
  });
};


window.form = {
  enable: enableForm,
  disable: disableForm,
  reset: resetForm,
  resetFilters: resetFilters,
  success: showSuccessMessage,
  error: showErrorMessage,
  check: checkValidity
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
const MOUSE_LEFT_CLICK = 1;
const MAIN_PIN_DEFAULT_X = `570px`;
const MAIN_PIN_DEFAULT_Y = `375px`;


const onResetButtonClick = function () {
  resetButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    disableMap();
  });
};

const activateMap = function () {
  map.classList.remove(`map--faded`);
  mapFiltersForm.classList.remove(`map__filters--disabled`);
  adForm.classList.remove(`ad-form--disabled`);
  addListeners();
  window.filter.change();
  window.form.enable();
  window.backend.load(window.filter.success, window.filter.error);
};

const disableMap = function () {
  map.classList.add(`map--faded`);
  window.form.disable();
  window.pin.remove();
  window.form.reset();
  window.form.resetFilters();
  window.card.disable();
  window.move.address(window.move.getCoords);
  mainPin.style.left = MAIN_PIN_DEFAULT_X;
  mainPin.style.top = MAIN_PIN_DEFAULT_Y;
  window.filter.remove();
  window.photo.reset();
  removeListeners();
  onResetButtonClick();
  mainPin.addEventListener(`mousedown`, onMouseDown);
  mainPin.addEventListener(`keydown`, onKeyDown);
  mapFiltersForm.classList.add(`map__filters--disabled`);
  adForm.classList.add(`ad-form--disabled`);
};


const onSubmitForm = function (evt) {
  evt.preventDefault();
  window.backend.upload(window.form.success, window.form.error, new FormData(adForm));
  disableMap();
};

const addListeners = function () {
  window.validation.change();
  adForm.addEventListener(`change`, window.form.check);
  adForm.addEventListener(`submit`, onSubmitForm);


};

const removeListeners = function () {
  window.validation.remove();
  adForm.removeEventListener(`submit`, onSubmitForm);
  resetButton.removeEventListener(`click`, onResetButtonClick);
};


const onMouseDown = function (evt) {
  if (evt.which === MOUSE_LEFT_CLICK) {
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


})();

/******/ })()
;