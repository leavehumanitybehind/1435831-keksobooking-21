/* eslint-disable object-shorthand */
"use strict";

(function () {

  const PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  const pinTemplate = document.querySelector(`#pin`).content;
  const mapPin = pinTemplate.querySelector(`.map__pin`);
  const pinsContainer = document.querySelector(`.map`).querySelector(`.map__pins`);

  const createPin = function (ad) {
    const pinsTemplate = mapPin.cloneNode(true);
    const pinX = ad.location.x - (PinSize.WIDTH / 2);
    const pinY = ad.location.y - PinSize.HEIGHT;
    pinsTemplate.style = `left:` + pinX + `px; top:` + pinY + `px;`;
    pinsTemplate.querySelector(`img`).src = ad.author.avatar;
    pinsTemplate.querySelector(`img`).alt = ad.offer.title;

    return pinsTemplate;
  };

  const createPinFragment = function (ads) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < ads.length; i++) {
      fragment.appendChild(createPin(ads[i]));
    }
    return fragment;
  };

  const renderPins = function () {
    pinsContainer.appendChild(createPinFragment(window.card.ads));
  };


  window.pin = {
    renderPins: renderPins,
    PinSize: PinSize
  };

})();
