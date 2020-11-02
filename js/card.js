/* eslint-disable object-shorthand */
"use strict";

const MAP_HOUSING_TYPES_TO_RU = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const pinContainer = document.querySelector(`.map__pins`);
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

const getFeautures = function (ad, card) {
  const featuresContainer = card.querySelector(`.popup__features`);
  featuresContainer.innerHTML = ``;
  const featuresFragment = createFeatures(ad);
  featuresContainer.appendChild(featuresFragment);
};

const getPhotos = function (photos) {
  const imgs = [];
  for (let i = 0; i < photos.length; i++) {
    imgs.push(`<img src="` + photos[i] + `"class="popup__photo" width="45" height = "40" alt = "Photo">`);
  }
  return imgs;
};

const disableCard = function () {
  const popup = pinContainer.querySelector(`.map__card`);
  if (popup) {
    pinContainer.removeChild(popup);
  }
};

const onCardEscPress = function () {
  if (window.util.isEscKeyCode) {
    disableCard();
  }
  document.removeEventListener(`keydown`, onCardEscPress);
};

const renderCard = function (ad) {
  const card = cardTemplate.cloneNode(true);
  if (ad.offer) {
    card.querySelector(`.popup__title`).textContent = ad.offer.title;
    card.querySelector(`.popup__text--address`).textContent = ad.offer.address;
    card.querySelector(`.popup__text--price`).textContent = ad.offer.price;
    const type = card.querySelector(`.popup__type`);
    type.textContent = MAP_HOUSING_TYPES_TO_RU[ad.offer.type];
    card.querySelector(`.popup__text--capacity`).textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + ` ` + `выезд до ` + ad.offer.checkout;
    card.querySelector(`.popup__description`).textContent = ad.offer.description;
    card.querySelector(`.popup__avatar`).src = ad.author.avatar;
    card.querySelector(`.popup__photos`).innerHTML = getPhotos(ad.offer.photos).join(``);
    getFeautures(ad, card);

    card.querySelector(`.popup__close`).addEventListener(`click`, disableCard);
    document.addEventListener(`keydown`, onCardEscPress);
  }

  return card;
};


window.card = {
  render: renderCard,
  disable: disableCard
};


