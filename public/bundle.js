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

const isEnterKeyPress = (key) => {
  return key === KeyCode.ENTER;
};

const isEscKeyPress = (key) => {
  return key === KeyCode.ESCAPE;
};

const createErrorMessage = (message) => {
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

const getXhr = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === CODE_STATUS_OK) {
      onSuccess(xhr.response);
      return;
    }
    onError(`Статус ошибки: ` + xhr.status + ` ` + xhr.statusText);
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения. Пожалуйста обновите страницу`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс. ` + ` Пожалуйста обновите страницу`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  return xhr;
};

const upload = (onSuccess, onError, data) => {
  const xhr = getXhr(onSuccess, onError);
  xhr.open(`POST`, UrlAddress.UPLOAD);
  xhr.send(data);
};

const load = (onSuccess, onError) => {
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
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const DEBOUNCE_INTERVAL = 500;

window.debounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(() => {
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
const address = document.querySelector(`#address`);

const MainPinDefaultCoords = {
  X: 570,
  Y: 375
};

const MainPinLocation = {
  MIN_Y: 130,
  MAX_Y: 630,
  MIN_X: 0
};

const MainPinSize = {
  WIDTH: 65,
  HEIGHT: 65,
  POINT_HEIGHT: 22
};

const setDefaultPosition = () => {
  mainPin.style.left = MainPinDefaultCoords.X + `px`;
  mainPin.style.top = MainPinDefaultCoords.Y + `px`;
};

const getDefaultMainPinCoords = () => {
  const x = MainPinDefaultCoords.X + Math.floor(MainPinSize.WIDTH / 2);
  const y = MainPinDefaultCoords.Y + MainPinSize.HEIGHT;
  address.value = x + `,` + y;
};

const getMainPinCoords = () => {
  const x = mainPin.offsetLeft + Math.floor(MainPinSize.WIDTH / 2);
  const y = mainPin.offsetTop + (MainPinSize.HEIGHT + MainPinSize.POINT_HEIGHT);

  return {
    x,
    y
  };
};

const setAddress = () => {
  const mainPinCoords = getMainPinCoords();
  address.value = mainPinCoords.x + `,` + mainPinCoords.y;
};

mainPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
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


  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

window.move = {
  getCoords: getMainPinCoords,
  defaultCoords: getDefaultMainPinCoords,
  setDefaultPosition,
  address: setAddress
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
const inputs = adForm.querySelectorAll(`input`);
let roomsNumber = roomNumberSelect.value;
let capacityNumber = capacitySelect.value;
const ERROR_STYLE = `2px dashed #ff0000`;

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

const onHousingTypeChange = () => {
  priceInput.min = MIN_PRICE[housingSelect.value];
  priceInput.placeholder = MIN_PRICE[housingSelect.value];
  const minPrice = MIN_PRICE[adForm.type.value];
  adForm.price.setAttribute(`min`, minPrice);
};

const onPriceInputChange = () => {
  if (priceInput.value > MAX_PRICE) {
    priceInput.setCustomValidity(`Максимальная цена ` + MAX_PRICE);
    return;
  }
  priceInput.setCustomValidity(``);
};

const setTimeOption = (timeSelect, value) => {
  timeSelect.value = value;
};

const onTimeoutChange = (evt) => {
  setTimeOption(timeoutSelect, evt.target.value);
};

const onTimeinChange = (evt) => {
  setTimeOption(timeinSelect, evt.target.value);
};

const syncRoomsGuests = (rooms, guests) => {
  if (guests > rooms && rooms !== 100) {
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    return;
  }
  if (rooms !== 100 && guests === 0) {
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    return;
  }
  if (rooms === 100 && guests !== 0) {
    capacitySelect.setCustomValidity(VALIDITY_TEXT[rooms]);
    return;
  }
  capacitySelect.setCustomValidity(``);
};

roomNumberSelect.addEventListener(`change`, () => {
  roomsNumber = roomNumberSelect.value;
  syncRoomsGuests(roomsNumber, capacityNumber);
});

capacitySelect.addEventListener(`change`, () => {
  capacityNumber = capacitySelect.value;
  capacitySelect.setCustomValidity(``);
  syncRoomsGuests(roomsNumber, capacityNumber);
});

capacitySelect.addEventListener(`invalid`, () => {
  capacitySelect.style.border = ERROR_STYLE;
});


const addChangeListeners = () => {
  housingSelect.addEventListener(`change`, onHousingTypeChange);
  priceInput.addEventListener(`change`, onPriceInputChange);
  timeinSelect.addEventListener(`change`, onTimeoutChange);
  timeoutSelect.addEventListener(`change`, onTimeinChange);

};

const removeChangeListeners = () => {
  housingSelect.removeEventListener(`change`, onHousingTypeChange);
  priceInput.removeEventListener(`change`, onPriceInputChange);
  timeinSelect.removeEventListener(`change`, onTimeoutChange);
  timeoutSelect.removeEventListener(`change`, onTimeinChange);
};

const checkValidity = () => {
  inputs.forEach((input) => {
    adForm.checkValidity();
    input.addEventListener(`invalid`, () => {
      input.style.border = ERROR_STYLE;
    });
    input.style.border = ``;
  });
};

window.validation = {
  change: addChangeListeners,
  remove: removeChangeListeners,
  check: checkValidity
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
const PhotoSize = {
  WIDTH: 45,
  HEIGHT: 40
};

const Rooms = {
  ONE_ROOM: 1,
  FIVE_ROOMS: 5
};

const Guests = {
  ONE_GUEST: 1
};

const createFeatures = (ad) => {
  const featuresFragment = document.createDocumentFragment();
  for (let i = 0; i < ad.offer.features.length; i++) {
    const newFeature = document.createElement(`li`);
    newFeature.classList.add(`popup__feature`);
    newFeature.classList.add(`popup__feature--` + ad.offer.features[i]);
    featuresFragment.appendChild(newFeature);
  }
  return featuresFragment;
};

const insertFeauturesNodes = (ad, card) => {
  const featuresContainer = card.querySelector(`.popup__features`);
  featuresContainer.innerHTML = ``;
  const featuresFragment = createFeatures(ad);
  featuresContainer.appendChild(featuresFragment);
};

const createPhotoMarkup = (src) => {
  const photo = document.createElement(`img`);
  photo.classList.add(`popup__photo`);
  photo.src = src;
  photo.alt = `Photo`;
  photo.width = PhotoSize.WIDTH;
  photo.height = PhotoSize.HEIGHT;
  return photo;
};

const insertPhotosNodes = (photos, card) => {
  const photoContainer = card.querySelector(`.popup__photos`);
  photoContainer.innerHTML = ``;
  photos.forEach(function (photo) {
    photoContainer.appendChild(createPhotoMarkup(photo));
  });
};

const disableCard = () => {
  const card = pinsContainer.querySelector(`.map__card`);
  if (card) {
    pinsContainer.removeChild(card);
    card.removeEventListener(`click`, disableCard);
  }
};

const onCardEscPress = (evt) => {
  if (window.util.isEscKeyPress(evt.key)) {
    disableCard();
  }
  document.removeEventListener(`keydown`, onCardEscPress);
};

const renderCard = (ad) => {
  const card = cardTemplate.cloneNode(true);
  const {
    offer: {
      title,
      address,
      price,
      type,
      guests,
      rooms,
      checkin,
      checkout,
      description,
      photos,
      features
    },
    author: {
      avatar
    }
  } = ad;

  if (title) {
    card.querySelector(`.popup__title`).textContent = title;
  }

  if (address) {
    card.querySelector(`.popup__text--address`).textContent = address;
  }

  if (price) {
    card.querySelector(`.popup__text--price`).textContent = price + ` ₽/ночь`;
  }

  if (type) {
    card.querySelector(`.popup__type`).textContent = MAP_HOUSING_TYPES_TO_RU[type];
  }

  if (rooms && guests) {
    if (rooms > Rooms.ONE_ROOM && rooms < Rooms.FIVE_ROOMS && guests > Guests.ONE_GUEST) {
      card.querySelector(`.popup__text--capacity`).textContent = rooms + ` комнаты для ` + guests + ` гостей`;
    }
    if (rooms === Rooms.ONE_ROOM && guests === Guests.ONE_GUEST) {
      card.querySelector(`.popup__text--capacity`).textContent = rooms + ` комната для ` + guests + ` гостя`;
    }
    if (rooms >= Rooms.ONE_ROOM) {
      card.querySelector(`.popup__text--capacity`).textContent = rooms + ` комнат для ` + guests + ` гостей`;
    }

  }

  if (checkin && checkout) {
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ` + checkin + ` ` + `выезд до ` + checkout;
  }

  if (description) {
    card.querySelector(`.popup__description`).textContent = description;
  }

  if (avatar) {
    card.querySelector(`.popup__avatar`).src = avatar;
  }

  if (photos) {
    insertPhotosNodes(photos, card);
  }

  if (features) {
    insertFeauturesNodes(ad, card);
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


const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pinsContainer = document.querySelector(`.map__pins`);
let ads = [];
const MAX_PINS = 5;

const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

const renderPin = (ad) => {
  const {
    offer: {
      title
    },
    author: {
      avatar
    },
    location: {
      x,
      y
    }
  } = ad;
  const pinsTemplate = pinTemplate.cloneNode(true);
  pinsTemplate.querySelector(`img`).src = avatar;
  pinsTemplate.querySelector(`img`).alt = title;
  const pinX = x - (PinSize.WIDTH / 2);
  const pinY = y - PinSize.HEIGHT;
  pinsTemplate.style.left = pinX + `px`;
  pinsTemplate.style.top = pinY + `px`;
  return pinsTemplate;
};

const removePins = () => {
  const allPins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  allPins.forEach((pin) => {
    pinsContainer.removeChild(pin);
  });
};

const activatePin = (pin, ad) => {
  pin.addEventListener(`click`, () => {
    const activePin = pinsContainer.querySelector(`.map__pin--active`);

    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
      window.card.disable();
    }
    pin.classList.add(`map__pin--active`);
    pinsContainer.appendChild(window.card.render(ad));
  });
};

const renderPinElements = (offers) => {
  const fragment = document.createDocumentFragment();
  ads = offers;
  const adsNumber = ads.length > MAX_PINS ? MAX_PINS : ads.length;
  for (let i = 0; i < adsNumber; i++) {
    const pinElement = renderPin(ads[i]);
    fragment.append(pinElement);
    activatePin(pinElement, ads[i]);
  }

  pinsContainer.appendChild(fragment);
};

window.pin = {
  Size: PinSize,
  render: renderPin,
  remove: removePins,
  activate: activatePin,
  renderPinElements,
  ads,
};


})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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
  debugger;
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

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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


const resetCheckboxes = (checkboxes) => {
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  });
};

const resetForm = () => {
  adForm.reset();
  resetCheckboxes(checkedFeaturesItems);
};

const resetFilters = () => {
  mapFiltersForm.querySelectorAll(`select`).forEach((option) => {
    option.value = `any`;
    return option;
  });
  resetCheckboxes(checkedFeaturesFilters);
};

const disableFormControls = (controls) => {
  controls.forEach((control) => {
    control.setAttribute(`disabled`, `disabled`);
  });
  mapFiltersForm.setAttribute(`disabled`, `disabled`);
};

const enableControls = (controls) => {
  controls.forEach((control) => {
    control.removeAttribute(`disabled`, `disabled`);
  });
  mapFiltersForm.removeAttribute(`disabled`, `disabled`);
};

const closeErrorMessage = () => {
  main.removeChild(main.querySelector(`.error`));
  document.removeEventListener(`keydown`, onErrorEscPress);
  document.removeEventListener(`click`, closeErrorMessage);
};

const onErrorEscPress = (key) => {
  if (window.util.isEscKeyPress(key)) {
    closeErrorMessage();
  }
};

const showErrorMessage = () => {
  const message = error.cloneNode(true);
  message.querySelector(`.error`).addEventListener(`click`, closeErrorMessage);
  main.appendChild(message);
};

const onSuccessEscPress = (key) => {
  if (window.util.isEscKeyPress(key)) {
    closeSuccessMessage();
  }
};

const onErrorMessageClick = () => {
  closeSuccessMessage();
};

const onSuccessMessageClick = () => {
  closeSuccessMessage();
};

const closeSuccessMessage = () => {
  main.removeChild(main.querySelector(`.success`));
  document.removeEventListener(`keydown`, onSuccessEscPress);
  document.removeEventListener(`click`, onSuccessMessageClick);
};

const showSuccessMessage = () => {
  const message = success.cloneNode(true);
  message.querySelector(`.success`).addEventListener(`click`, onErrorMessageClick);
  main.appendChild(message);
};

const enableForm = () => {
  enableControls(fieldsets);
  enableControls(inputs);
  enableControls(adFormSelects);
  enableControls(mapFiltersSelects);
  adForm.removeAttribute(`disabled`, `disabled`);
  submitButton.removeAttribute(`disabled`, `disabled`);
  resetButton.removeAttribute(`disabled`, `disabled`);
  textArea.removeAttribute(`disabled`, `disabled`);
};

const disableForm = () => {
  disableFormControls(fieldsets);
  disableFormControls(inputs);
  disableFormControls(adFormSelects);
  disableFormControls(mapFiltersSelects);
  adForm.setAttribute(`disabled`, `disabled`);
  submitButton.setAttribute(`disabled`, `disabled`);
  resetButton.setAttribute(`disabled`, `disabled`);
  textArea.setAttribute(`disabled`, `disabled`);
};

window.form = {
  enable: enableForm,
  disable: disableForm,
  reset: resetForm,
  resetFilters,
  success: showSuccessMessage,
  error: showErrorMessage,
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

const showPicture = (fileChooser, preview) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => {
    return fileName.endsWith(fileType);
  });

  const reader = new FileReader();
  reader.addEventListener(`load`, () => {
    preview.src = reader.result;
    preview.setAttribute(`width`, `100%`);
    preview.setAttribute(`height`, `100%`);
  });

  fileChooser.setCustomValidity(``);

  if (!matches) {
    fileChooser.setCustomValidity(`Недопустимый формат изображения`);
  }
  reader.readAsDataURL(file);
};

const resetPreview = (preview) => {
  preview.src = `img/muffin-grey.svg`;
  preview.setAttribute(`width`, `40px`);
  preview.setAttribute(`height`, `44px`);
};

const resetPhotos = () => {
  resetPreview(avatarPreview);
  resetPreview(housePreview);
};


const onChangeAvatar = () => {
  showPicture(avatarFileChooser, avatarPreview);
};

const onChangeHousePhoto = () => {
  showPicture(houseFileChooser, housePreview);
};

const addListeners = () => {
  houseFileChooser.addEventListener(`change`, onChangeHousePhoto);
  avatarFileChooser.addEventListener(`change`, onChangeAvatar);
};

const removeListeners = () => {
  avatarFileChooser.removeEventListener(`change`, onChangeAvatar);
  houseFileChooser.removeEventListener(`change`, onChangeHousePhoto);
};

window.photo = {
  reset: resetPhotos,
  removeListeners,
  addListeners
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
const submitButton = adForm.querySelector(`.ad-form__submit`);

const onSuccessLoad = (data) => {
  window.pin.ads = data;
  window.pin.renderPinElements(window.pin.ads);
};

const onErrorLoad = (errorMessage) => {
  window.util.createErrorMessage(errorMessage);
};

const onResetButtonClick = (evt) => {
  evt.preventDefault();
  disableMap();
};

const activateMap = () => {
  map.classList.remove(`map--faded`);
  mapFiltersForm.classList.remove(`map__filters--disabled`);
  adForm.classList.remove(`ad-form--disabled`);
  addListeners();
  window.filter.change();
  window.form.enable();
  window.move.address(window.move.getCoords);
  window.backend.load(onSuccessLoad, onErrorLoad);
};

const disableMap = () => {
  map.classList.add(`map--faded`);
  window.form.disable();
  window.pin.remove();
  window.form.reset();
  window.form.resetFilters();
  window.card.disable();
  window.filter.remove();
  window.photo.reset();
  removeListeners();
  mainPin.addEventListener(`mousedown`, onMouseDown);
  mainPin.addEventListener(`keydown`, onKeyDown);
  mapFiltersForm.classList.add(`map__filters--disabled`);
  adForm.classList.add(`ad-form--disabled`);
  window.move.defaultCoords();
  window.move.setDefaultPosition();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  window.backend.upload(window.form.success, window.form.error, new FormData(adForm));
  disableMap();
};

const addListeners = () => {
  window.validation.change();
  window.photo.addListeners();
  adForm.addEventListener(`submit`, onFormSubmit);
  submitButton.addEventListener(`click`, window.validation.check);
  resetButton.addEventListener(`click`, onResetButtonClick);
};

const removeListeners = () => {
  window.validation.remove();
  window.photo.removeListeners();
  adForm.removeEventListener(`submit`, onFormSubmit);
  resetButton.removeEventListener(`click`, onResetButtonClick);
  submitButton.removeEventListener(`click`, window.validation.check);
};

const onMouseDown = (evt) => {
  if (evt.which === MOUSE_LEFT_CLICK) {
    activateMap();
  }
  mainPin.removeEventListener(`mousedown`, onMouseDown);
};

const onKeyDown = (evt) => {
  if (window.util.isEnterKeyPress(evt.key)) {
    activateMap();
  }
  mainPin.removeEventListener(`keydown`, onKeyDown);
};

disableMap();


})();

/******/ })()
;