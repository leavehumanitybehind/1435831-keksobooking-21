"use strict";

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
  photo.src = `${src}`;
  photo.alt = `Photo`;
  photo.width = `45`;
  photo.height = `40`;
  return photo;
};

const getPhotosNodes = function (photos, card) {
  const photoContainer = card.querySelector(`.popup__photos`);
  photoContainer.innerHTML = ``;
  photos.forEach(function (photo) {
    photoContainer.appendChild(createPhotoMarkup(photo));
  });
};

const disableCard = function () {
  const card = pinsContainer.querySelector(`.map__card`);
  if (card) {
    pinsContainer.removeChild(card);
    card.removeEventListener(`click`, disableCard);
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


