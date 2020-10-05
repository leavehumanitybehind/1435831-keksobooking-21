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
    card.querySelector(`.popup__photos`).innerHTML = getPhotos(ad.offer.photos);
    return card;
  };

  window.card.renderCards = function () {
    const createCardFragment = function () {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < 1; i++) {
        fragment.appendChild(createCard(ads[i]));
      }
      return fragment;
    };
    cardElement.insertBefore(createCardFragment(), cardElement.querySelector(`.map-filters__container`));

  };


})();

