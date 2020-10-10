/* eslint-disable object-shorthand */
"use strict";

(function () {
  const cardTemplate = document.querySelector(`#card`).content;
  const cardElement = document.querySelector(`.map`);

  const createCard = function (ad) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector(`.popup__title`).textContent = ad.offer.title;
    card.querySelector(`.popup__text--address`).textContent = ad.offer.address;
    card.querySelector(`.popup__text--price`).textContent = ad.offer.price;
    card.querySelector(`.popup__type`).textContent = ad.offer.type;
    card.querySelector(`.popup__text--capacity`).textContent = ad.offer.rooms + ` комнаты для ` + ad.offer.guests + ` гостей`;
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ` + ad.offer.checkin + ` ` + `выезд до ` + ad.offer.checkout;
    card.querySelector(`.popup__description`).textContent = ad.offer.description;
    card.querySelector(`.popup__avatar`).src = ad.author.avatar;
    card.querySelector(`.popup__photos`).innerHTML = window.data.getPhotos(ad.offer.photos);
    return card;
  };

  const renderCards = function (ad) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 1; i++) {
      fragment.appendChild(createCard(ad[i]));
    }
    cardElement.insertBefore(fragment, cardElement.querySelector(`.map-filters__container`));
  };


  window.card = {
    renderCards: renderCards,
  };


})();


